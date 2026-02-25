"use strict";

const { applyWithChunking } = require("../util");

module.exports = {
  longestPath: longestPath,
  slack: slack
};

/*
 * Initializes ranks for the input graph using the longest path algorithm. This
 * algorithm scales well and is fast in practice, it yields rather poor
 * solutions. Nodes are pushed to the lowest layer possible, leaving the bottom
 * ranks wide and leaving edges longer than necessary. However, due to its
 * speed, this algorithm is good for getting an initial ranking that can be fed
 * into other algorithms.
 *
 * This algorithm does not normalize layers because it will be used by other
 * algorithms in most cases. If using this algorithm directly, be sure to
 * run normalize at the end.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG.
 *    2. Input graph node labels can be assigned properties.
 *
 * Post-conditions:
 *
 *    1. Each node will be assign an (unnormalized) "rank" property.
 */
function longestPath(g) {
  var visited = {};

  function dfs(startV) {
    // Iterative post-order DFS: we need to compute children before parents
    let callStack = [[startV, false]];
    while (callStack.length > 0) {
      let [v, processed] = callStack[callStack.length - 1];
      if (Object.hasOwn(visited, v)) {
        callStack.pop();
        continue;
      }
      if (!processed) {
        callStack[callStack.length - 1][1] = true;
        let outEdges = g.outEdges(v);
        for (let i = outEdges.length - 1; i >= 0; i--) {
          let e = outEdges[i];
          if (e != null && !Object.hasOwn(visited, e.w)) {
            callStack.push([e.w, false]);
          }
        }
      } else {
        callStack.pop();
        visited[v] = true;
        var label = g.node(v);

        let outEdgesMinLens = g.outEdges(v).map(e => {
          if (e == null) {
            return Number.POSITIVE_INFINITY;
          }
          return g.node(e.w).rank - g.edge(e).minlen;
        });

        var rank = applyWithChunking(Math.min, outEdgesMinLens);

        if (rank === Number.POSITIVE_INFINITY) {
          rank = 0;
        }

        label.rank = rank;
      }
    }
  }

  g.sources().forEach(dfs);
}

/*
 * Returns the amount of slack for the given edge. The slack is defined as the
 * difference between the length of the edge and its minimum length.
 */
function slack(g, e) {
  return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
}
