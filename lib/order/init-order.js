"use strict";

let util = require("../util");

module.exports = initOrder;

/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
 */
function initOrder(g) {
  let visited = {};
  let simpleNodes = g.nodes().filter(v => !g.children(v).length);
  let simpleNodesRanks = simpleNodes.map(v => g.node(v).rank);
  let maxRank = util.applyWithChunking(Math.max, simpleNodesRanks);
  let layers = util.range(maxRank + 1).map(() => []);

  function dfs(startV) {
    let stack = [startV];
    while (stack.length > 0) {
      let v = stack.pop();
      if (visited[v]) continue;
      visited[v] = true;
      let node = g.node(v);
      layers[node.rank].push(v);
      let succs = g.successors(v);
      for (let i = succs.length - 1; i >= 0; i--) {
        stack.push(succs[i]);
      }
    }
  }

  let orderedVs = simpleNodes.sort((a, b) => g.node(a).rank - g.node(b).rank);
  orderedVs.forEach(dfs);

  return layers;
}
