"use strict";

let greedyFAS = require("./greedy-fas");
let uniqueId = require("./util").uniqueId;

module.exports = {
  run: run,
  undo: undo
};

function run(g) {
  let fas = (g.graph().acyclicer === "greedy"
    ? greedyFAS(g, weightFn(g))
    : dfsFAS(g));
  fas.forEach(e => {
    let label = g.edge(e);
    g.removeEdge(e);
    label.forwardName = e.name;
    label.reversed = true;
    g.setEdge(e.w, e.v, label, uniqueId("rev"));
  });

  function weightFn(g) {
    return e => {
      return g.edge(e).weight;
    };
  }
}

function dfsFAS(g) {
  let fas = [];
  let stack = {};
  let visited = {};

  function dfs(startV) {
    let callStack = [[startV, 0]];
    while (callStack.length > 0) {
      let [v, idx] = callStack[callStack.length - 1];
      if (idx === 0) {
        if (Object.hasOwn(visited, v)) {
          callStack.pop();
          continue;
        }
        visited[v] = true;
        stack[v] = true;
      }
      let edges = g.outEdges(v);
      if (idx < edges.length) {
        callStack[callStack.length - 1][1] = idx + 1;
        let e = edges[idx];
        if (Object.hasOwn(stack, e.w)) {
          fas.push(e);
        } else {
          callStack.push([e.w, 0]);
        }
      } else {
        delete stack[v];
        callStack.pop();
      }
    }
  }

  g.nodes().forEach(dfs);
  return fas;
}

function undo(g) {
  g.edges().forEach(e => {
    let label = g.edge(e);
    if (label.reversed) {
      g.removeEdge(e);

      let forwardName = label.forwardName;
      delete label.reversed;
      delete label.forwardName;
      g.setEdge(e.w, e.v, label, forwardName);
    }
  });
}
