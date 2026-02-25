let util = require("./util");

module.exports = {
  run,
  cleanup,
};

/*
 * A nesting graph creates dummy nodes for the tops and bottoms of subgraphs,
 * adds appropriate edges to ensure that all cluster nodes are placed between
 * these boundaries, and ensures that the graph is connected.
 *
 * In addition we ensure, through the use of the minlen property, that nodes
 * and subgraph border nodes to not end up on the same rank.
 *
 * Preconditions:
 *
 *    1. Input graph is a DAG
 *    2. Nodes in the input graph has a minlen attribute
 *
 * Postconditions:
 *
 *    1. Input graph is connected.
 *    2. Dummy nodes are added for the tops and bottoms of subgraphs.
 *    3. The minlen attribute for nodes is adjusted to ensure nodes do not
 *       get placed on the same rank as subgraph border nodes.
 *
 * The nesting graph idea comes from Sander, "Layout of Compound Directed
 * Graphs."
 */
function run(g) {
  let root = util.addDummyNode(g, "root", {}, "_root");
  let depths = treeDepths(g);
  let depthsArr = Object.values(depths);
  let height = util.applyWithChunking(Math.max, depthsArr) - 1; // Note: depths is an Object not an array
  let nodeSep = 2 * height + 1;

  g.graph().nestingRoot = root;

  // Multiply minlen by nodeSep to align nodes on non-border ranks.
  g.edges().forEach(e => g.edge(e).minlen *= nodeSep);

  // Calculate a weight that is sufficient to keep subgraphs vertically compact
  let weight = sumWeights(g) + 1;

  // Create border nodes and link them up
  g.children().forEach(child => dfs(g, root, nodeSep, weight, height, depths, child));

  // Save the multiplier for node layers for later removal of empty border
  // layers.
  g.graph().nodeRankFactor = nodeSep;
}

function dfs(g, root, nodeSep, weight, height, depths, startV) {
  // Iterative post-order traversal of the compound hierarchy
  // We need post-order because parent processing depends on children having borderTop/borderBottom set
  let stack = [[startV, false]];
  while (stack.length > 0) {
    let frame = stack[stack.length - 1];
    let [v, childrenPushed] = frame;
    let children = g.children(v);

    if (!children.length) {
      // Leaf node
      stack.pop();
      if (v !== root) {
        g.setEdge(root, v, { weight: 0, minlen: nodeSep });
      }
      continue;
    }

    if (!childrenPushed) {
      frame[1] = true;
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push([children[i], false]);
      }
      continue;
    }

    // Post-order: all children have been processed
    stack.pop();

    let top = util.addBorderNode(g, "_bt");
    let bottom = util.addBorderNode(g, "_bb");
    let label = g.node(v);

    g.setParent(top, v);
    label.borderTop = top;
    g.setParent(bottom, v);
    label.borderBottom = bottom;

    children.forEach(child => {
      let childNode = g.node(child);
      let childTop = childNode.borderTop ? childNode.borderTop : child;
      let childBottom = childNode.borderBottom ? childNode.borderBottom : child;
      let thisWeight = childNode.borderTop ? weight : 2 * weight;
      let minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;

      g.setEdge(top, childTop, {
        weight: thisWeight,
        minlen: minlen,
        nestingEdge: true
      });

      g.setEdge(childBottom, bottom, {
        weight: thisWeight,
        minlen: minlen,
        nestingEdge: true
      });
    });

    if (!g.parent(v)) {
      g.setEdge(root, top, { weight: 0, minlen: height + depths[v] });
    }
  }
}

function treeDepths(g) {
  var depths = {};
  let stack = [];
  g.children().forEach(v => stack.push([v, 1]));
  while (stack.length > 0) {
    let [v, depth] = stack.pop();
    var children = g.children(v);
    if (children && children.length) {
      children.forEach(child => stack.push([child, depth + 1]));
    }
    depths[v] = depth;
  }
  return depths;
}

function sumWeights(g) {
  return g.edges().reduce((acc, e) => acc + g.edge(e).weight, 0);
}

function cleanup(g) {
  var graphLabel = g.graph();
  g.removeNode(graphLabel.nestingRoot);
  delete graphLabel.nestingRoot;
  g.edges().forEach(e => {
    var edge = g.edge(e);
    if (edge.nestingEdge) {
      g.removeEdge(e);
    }
  });
}
