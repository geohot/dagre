let util = require("./util");

module.exports = addBorderSegments;

function addBorderSegments(g) {
  // Iterative post-order traversal (children before parents)
  let stack = [];
  g.children().forEach(v => stack.push([v, false]));
  while (stack.length > 0) {
    let frame = stack[stack.length - 1];
    let [v, childrenPushed] = frame;
    let children = g.children(v);
    if (children.length && !childrenPushed) {
      frame[1] = true;
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push([children[i], false]);
      }
      continue;
    }
    stack.pop();
    let node = g.node(v);
    if (Object.hasOwn(node, "minRank")) {
      node.borderLeft = [];
      node.borderRight = [];
      for (let rank = node.minRank, maxRank = node.maxRank + 1;
        rank < maxRank;
        ++rank) {
        addBorderNode(g, "borderLeft", "_bl", v, node, rank);
        addBorderNode(g, "borderRight", "_br", v, node, rank);
      }
    }
  }
}

function addBorderNode(g, prop, prefix, sg, sgNode, rank) {
  let label = { width: 0, height: 0, rank: rank, borderType: prop };
  let prev = sgNode[prop][rank - 1];
  let curr = util.addDummyNode(g, "border", label, prefix);
  sgNode[prop][rank] = curr;
  g.setParent(curr, sg);
  if (prev) {
    g.setEdge(prev, curr, { weight: 1 });
  }
}
