var dagre = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/@dagrejs/graphlib/dist/graphlib.cjs.js
  var require_graphlib_cjs = __commonJS({
    "node_modules/@dagrejs/graphlib/dist/graphlib.cjs.js"(exports, module) {
      var me = Object.defineProperty;
      var Oe = (s, e, r) => e in s ? me(s, e, { enumerable: true, configurable: true, writable: true, value: r }) : s[e] = r;
      var c = (s, e) => () => (e || s((e = { exports: {} }).exports, e), e.exports);
      var l = (s, e, r) => Oe(s, typeof e != "symbol" ? e + "" : e, r);
      var b = c((dr, T) => {
        "use strict";
        var ye = "\0", v = "\0", D = "", O = class {
          constructor(e) {
            l(this, "_isDirected", true);
            l(this, "_isMultigraph", false);
            l(this, "_isCompound", false);
            l(this, "_label");
            l(this, "_defaultNodeLabelFn", () => {
            });
            l(this, "_defaultEdgeLabelFn", () => {
            });
            l(this, "_nodes", {});
            l(this, "_in", {});
            l(this, "_preds", {});
            l(this, "_out", {});
            l(this, "_sucs", {});
            l(this, "_edgeObjs", {});
            l(this, "_edgeLabels", {});
            l(this, "_nodeCount", 0);
            l(this, "_edgeCount", 0);
            l(this, "_parent");
            l(this, "_children");
            e && (this._isDirected = Object.hasOwn(e, "directed") ? e.directed : true, this._isMultigraph = Object.hasOwn(e, "multigraph") ? e.multigraph : false, this._isCompound = Object.hasOwn(e, "compound") ? e.compound : false), this._isCompound && (this._parent = {}, this._children = {}, this._children[v] = {});
          }
          isDirected() {
            return this._isDirected;
          }
          isMultigraph() {
            return this._isMultigraph;
          }
          isCompound() {
            return this._isCompound;
          }
          setGraph(e) {
            return this._label = e, this;
          }
          graph() {
            return this._label;
          }
          setDefaultNodeLabel(e) {
            return this._defaultNodeLabelFn = e, typeof e != "function" && (this._defaultNodeLabelFn = () => e), this;
          }
          nodeCount() {
            return this._nodeCount;
          }
          nodes() {
            return Object.keys(this._nodes);
          }
          sources() {
            var e = this;
            return this.nodes().filter((r) => Object.keys(e._in[r]).length === 0);
          }
          sinks() {
            var e = this;
            return this.nodes().filter((r) => Object.keys(e._out[r]).length === 0);
          }
          setNodes(e, r) {
            var t = arguments, i = this;
            return e.forEach(function(n) {
              t.length > 1 ? i.setNode(n, r) : i.setNode(n);
            }), this;
          }
          setNode(e, r) {
            return Object.hasOwn(this._nodes, e) ? (arguments.length > 1 && (this._nodes[e] = r), this) : (this._nodes[e] = arguments.length > 1 ? r : this._defaultNodeLabelFn(e), this._isCompound && (this._parent[e] = v, this._children[e] = {}, this._children[v][e] = true), this._in[e] = {}, this._preds[e] = {}, this._out[e] = {}, this._sucs[e] = {}, ++this._nodeCount, this);
          }
          node(e) {
            return this._nodes[e];
          }
          hasNode(e) {
            return Object.hasOwn(this._nodes, e);
          }
          removeNode(e) {
            var r = this;
            if (Object.hasOwn(this._nodes, e)) {
              var t = (i) => r.removeEdge(r._edgeObjs[i]);
              delete this._nodes[e], this._isCompound && (this._removeFromParentsChildList(e), delete this._parent[e], this.children(e).forEach(function(i) {
                r.setParent(i);
              }), delete this._children[e]), Object.keys(this._in[e]).forEach(t), delete this._in[e], delete this._preds[e], Object.keys(this._out[e]).forEach(t), delete this._out[e], delete this._sucs[e], --this._nodeCount;
            }
            return this;
          }
          setParent(e, r) {
            if (!this._isCompound) throw new Error("Cannot set parent in a non-compound graph");
            if (r === void 0) r = v;
            else {
              r += "";
              for (var t = r; t !== void 0; t = this.parent(t)) if (t === e) throw new Error("Setting " + r + " as parent of " + e + " would create a cycle");
              this.setNode(r);
            }
            return this.setNode(e), this._removeFromParentsChildList(e), this._parent[e] = r, this._children[r][e] = true, this;
          }
          _removeFromParentsChildList(e) {
            delete this._children[this._parent[e]][e];
          }
          parent(e) {
            if (this._isCompound) {
              var r = this._parent[e];
              if (r !== v) return r;
            }
          }
          children(e = v) {
            if (this._isCompound) {
              var r = this._children[e];
              if (r) return Object.keys(r);
            } else {
              if (e === v) return this.nodes();
              if (this.hasNode(e)) return [];
            }
          }
          predecessors(e) {
            var r = this._preds[e];
            if (r) return Object.keys(r);
          }
          successors(e) {
            var r = this._sucs[e];
            if (r) return Object.keys(r);
          }
          neighbors(e) {
            var r = this.predecessors(e);
            if (r) {
              let i = new Set(r);
              for (var t of this.successors(e)) i.add(t);
              return Array.from(i.values());
            }
          }
          isLeaf(e) {
            var r;
            return this.isDirected() ? r = this.successors(e) : r = this.neighbors(e), r.length === 0;
          }
          filterNodes(e) {
            var r = new this.constructor({ directed: this._isDirected, multigraph: this._isMultigraph, compound: this._isCompound });
            r.setGraph(this.graph());
            var t = this;
            Object.entries(this._nodes).forEach(function([a, o]) {
              e(a) && r.setNode(a, o);
            }), Object.values(this._edgeObjs).forEach(function(a) {
              r.hasNode(a.v) && r.hasNode(a.w) && r.setEdge(a, t.edge(a));
            });
            var i = {};
            function n(a) {
              var o = t.parent(a);
              return o === void 0 || r.hasNode(o) ? (i[a] = o, o) : o in i ? i[o] : n(o);
            }
            return this._isCompound && r.nodes().forEach((a) => r.setParent(a, n(a))), r;
          }
          setDefaultEdgeLabel(e) {
            return this._defaultEdgeLabelFn = e, typeof e != "function" && (this._defaultEdgeLabelFn = () => e), this;
          }
          edgeCount() {
            return this._edgeCount;
          }
          edges() {
            return Object.values(this._edgeObjs);
          }
          setPath(e, r) {
            var t = this, i = arguments;
            return e.reduce(function(n, a) {
              return i.length > 1 ? t.setEdge(n, a, r) : t.setEdge(n, a), a;
            }), this;
          }
          setEdge() {
            var e, r, t, i, n = false, a = arguments[0];
            typeof a == "object" && a !== null && "v" in a ? (e = a.v, r = a.w, t = a.name, arguments.length === 2 && (i = arguments[1], n = true)) : (e = a, r = arguments[1], t = arguments[3], arguments.length > 2 && (i = arguments[2], n = true)), e = "" + e, r = "" + r, t !== void 0 && (t = "" + t);
            var o = g(this._isDirected, e, r, t);
            if (Object.hasOwn(this._edgeLabels, o)) return n && (this._edgeLabels[o] = i), this;
            if (t !== void 0 && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
            this.setNode(e), this.setNode(r), this._edgeLabels[o] = n ? i : this._defaultEdgeLabelFn(e, r, t);
            var h = Ne(this._isDirected, e, r, t);
            return e = h.v, r = h.w, Object.freeze(h), this._edgeObjs[o] = h, L(this._preds[r], e), L(this._sucs[e], r), this._in[r][o] = h, this._out[e][o] = h, this._edgeCount++, this;
          }
          edge(e, r, t) {
            var i = arguments.length === 1 ? m(this._isDirected, arguments[0]) : g(this._isDirected, e, r, t);
            return this._edgeLabels[i];
          }
          edgeAsObj() {
            let e = this.edge(...arguments);
            return typeof e != "object" ? { label: e } : e;
          }
          hasEdge(e, r, t) {
            var i = arguments.length === 1 ? m(this._isDirected, arguments[0]) : g(this._isDirected, e, r, t);
            return Object.hasOwn(this._edgeLabels, i);
          }
          removeEdge(e, r, t) {
            var i = arguments.length === 1 ? m(this._isDirected, arguments[0]) : g(this._isDirected, e, r, t), n = this._edgeObjs[i];
            return n && (e = n.v, r = n.w, delete this._edgeLabels[i], delete this._edgeObjs[i], F(this._preds[r], e), F(this._sucs[e], r), delete this._in[r][i], delete this._out[e][i], this._edgeCount--), this;
          }
          inEdges(e, r) {
            return this.isDirected() ? this.filterEdges(this._in[e], e, r) : this.nodeEdges(e, r);
          }
          outEdges(e, r) {
            return this.isDirected() ? this.filterEdges(this._out[e], e, r) : this.nodeEdges(e, r);
          }
          nodeEdges(e, r) {
            if (e in this._nodes) return this.filterEdges({ ...this._in[e], ...this._out[e] }, e, r);
          }
          filterEdges(e, r, t) {
            if (e) {
              var i = Object.values(e);
              return t ? i.filter(function(n) {
                return n.v === r && n.w === t || n.v === t && n.w === r;
              }) : i;
            }
          }
        };
        function L(s, e) {
          s[e] ? s[e]++ : s[e] = 1;
        }
        function F(s, e) {
          --s[e] || delete s[e];
        }
        function g(s, e, r, t) {
          var i = "" + e, n = "" + r;
          if (!s && i > n) {
            var a = i;
            i = n, n = a;
          }
          return i + D + n + D + (t === void 0 ? ye : t);
        }
        function Ne(s, e, r, t) {
          var i = "" + e, n = "" + r;
          if (!s && i > n) {
            var a = i;
            i = n, n = a;
          }
          var o = { v: i, w: n };
          return t && (o.name = t), o;
        }
        function m(s, e) {
          return g(s, e.v, e.w, e.name);
        }
        T.exports = O;
      });
      var P = c((cr, A) => {
        A.exports = "3.0.4";
      });
      var S = c((lr, M) => {
        M.exports = { Graph: b(), version: P() };
      });
      var U = c((_r, G) => {
        var je = b();
        G.exports = { write: Ie, read: Ce };
        function Ie(s) {
          var e = { options: { directed: s.isDirected(), multigraph: s.isMultigraph(), compound: s.isCompound() }, nodes: ke(s), edges: xe(s) };
          return s.graph() !== void 0 && (e.value = structuredClone(s.graph())), e;
        }
        function ke(s) {
          return s.nodes().map(function(e) {
            var r = s.node(e), t = s.parent(e), i = { v: e };
            return r !== void 0 && (i.value = r), t !== void 0 && (i.parent = t), i;
          });
        }
        function xe(s) {
          return s.edges().map(function(e) {
            var r = s.edge(e), t = { v: e.v, w: e.w };
            return e.name !== void 0 && (t.name = e.name), r !== void 0 && (t.value = r), t;
          });
        }
        function Ce(s) {
          var e = new je(s.options).setGraph(s.value);
          return s.nodes.forEach(function(r) {
            e.setNode(r.v, r.value), r.parent && e.setParent(r.v, r.parent);
          }), s.edges.forEach(function(r) {
            e.setEdge({ v: r.v, w: r.w, name: r.name }, r.value);
          }), e;
        }
      });
      var y = c((pr, W) => {
        W.exports = De;
        var qe = () => 1;
        function De(s, e, r, t) {
          return Le(s, String(e), r || qe, t || function(i) {
            return s.outEdges(i);
          });
        }
        function Le(s, e, r, t) {
          var i = {}, n = true, a = 0, o = s.nodes(), h = function(f) {
            var p = r(f);
            i[f.v].distance + p < i[f.w].distance && (i[f.w] = { distance: i[f.v].distance + p, predecessor: f.v }, n = true);
          }, u = function() {
            o.forEach(function(f) {
              t(f).forEach(function(p) {
                var q = p.v === f ? p.v : p.w, we = q === p.v ? p.w : p.v;
                h({ v: q, w: we });
              });
            });
          };
          o.forEach(function(f) {
            var p = f === e ? 0 : Number.POSITIVE_INFINITY;
            i[f] = { distance: p };
          });
          for (var d = o.length, _ = 1; _ < d && (n = false, a++, u(), !!n); _++) ;
          if (a === d - 1 && (n = false, u(), n)) throw new Error("The graph contains a negative weight cycle");
          return i;
        }
      });
      var z = c((vr, Y) => {
        Y.exports = Fe;
        function Fe(s) {
          var e = {}, r = [], t;
          function i(n) {
            Object.hasOwn(e, n) || (e[n] = true, t.push(n), s.successors(n).forEach(i), s.predecessors(n).forEach(i));
          }
          return s.nodes().forEach(function(n) {
            t = [], i(n), t.length && r.push(t);
          }), r;
        }
      });
      var j = c((gr, V) => {
        var N = class {
          constructor() {
            l(this, "_arr", []);
            l(this, "_keyIndices", {});
          }
          size() {
            return this._arr.length;
          }
          keys() {
            return this._arr.map(function(e) {
              return e.key;
            });
          }
          has(e) {
            return Object.hasOwn(this._keyIndices, e);
          }
          priority(e) {
            var r = this._keyIndices[e];
            if (r !== void 0) return this._arr[r].priority;
          }
          min() {
            if (this.size() === 0) throw new Error("Queue underflow");
            return this._arr[0].key;
          }
          add(e, r) {
            var t = this._keyIndices;
            if (e = String(e), !Object.hasOwn(t, e)) {
              var i = this._arr, n = i.length;
              return t[e] = n, i.push({ key: e, priority: r }), this._decrease(n), true;
            }
            return false;
          }
          removeMin() {
            this._swap(0, this._arr.length - 1);
            var e = this._arr.pop();
            return delete this._keyIndices[e.key], this._heapify(0), e.key;
          }
          decrease(e, r) {
            var t = this._keyIndices[e];
            if (r > this._arr[t].priority) throw new Error("New priority is greater than current priority. Key: " + e + " Old: " + this._arr[t].priority + " New: " + r);
            this._arr[t].priority = r, this._decrease(t);
          }
          _heapify(e) {
            var r = this._arr, t = 2 * e, i = t + 1, n = e;
            t < r.length && (n = r[t].priority < r[n].priority ? t : n, i < r.length && (n = r[i].priority < r[n].priority ? i : n), n !== e && (this._swap(e, n), this._heapify(n)));
          }
          _decrease(e) {
            for (var r = this._arr, t = r[e].priority, i; e !== 0 && (i = e >> 1, !(r[i].priority < t)); ) this._swap(e, i), e = i;
          }
          _swap(e, r) {
            var t = this._arr, i = this._keyIndices, n = t[e], a = t[r];
            t[e] = a, t[r] = n, i[a.key] = e, i[n.key] = r;
          }
        };
        V.exports = N;
      });
      var w = c((br, H) => {
        var Te = j();
        H.exports = Pe;
        var Ae = () => 1;
        function Pe(s, e, r, t) {
          var i = function(n) {
            return s.outEdges(n);
          };
          return Me(s, String(e), r || Ae, t || i);
        }
        function Me(s, e, r, t) {
          var i = {}, n = new Te(), a, o, h = function(u) {
            var d = u.v !== a ? u.v : u.w, _ = i[d], f = r(u), p = o.distance + f;
            if (f < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + u + " Weight: " + f);
            p < _.distance && (_.distance = p, _.predecessor = a, n.decrease(d, p));
          };
          for (s.nodes().forEach(function(u) {
            var d = u === e ? 0 : Number.POSITIVE_INFINITY;
            i[u] = { distance: d }, n.add(u, d);
          }); n.size() > 0 && (a = n.removeMin(), o = i[a], o.distance !== Number.POSITIVE_INFINITY); ) t(a).forEach(h);
          return i;
        }
      });
      var R = c((wr, K) => {
        var Se = w();
        K.exports = Ge;
        function Ge(s, e, r) {
          return s.nodes().reduce(function(t, i) {
            return t[i] = Se(s, i, e, r), t;
          }, {});
        }
      });
      var Q = c((mr, B) => {
        B.exports = Ue;
        function Ue(s, e, r) {
          if (s[e].predecessor !== void 0) throw new Error("Invalid source vertex");
          if (s[r].predecessor === void 0 && r !== e) throw new Error("Invalid destination vertex");
          return { weight: s[r].distance, path: We(s, e, r) };
        }
        function We(s, e, r) {
          for (var t = [], i = r; i !== e; ) t.push(i), i = s[i].predecessor;
          return t.push(e), t.reverse();
        }
      });
      var I = c((Or, J) => {
        J.exports = Ye;
        function Ye(s) {
          var e = 0, r = [], t = {}, i = [];
          function n(a) {
            var o = t[a] = { onStack: true, lowlink: e, index: e++ };
            if (r.push(a), s.successors(a).forEach(function(d) {
              Object.hasOwn(t, d) ? t[d].onStack && (o.lowlink = Math.min(o.lowlink, t[d].index)) : (n(d), o.lowlink = Math.min(o.lowlink, t[d].lowlink));
            }), o.lowlink === o.index) {
              var h = [], u;
              do
                u = r.pop(), t[u].onStack = false, h.push(u);
              while (a !== u);
              i.push(h);
            }
          }
          return s.nodes().forEach(function(a) {
            Object.hasOwn(t, a) || n(a);
          }), i;
        }
      });
      var Z = c((yr, X) => {
        var ze = I();
        X.exports = Ve;
        function Ve(s) {
          return ze(s).filter(function(e) {
            return e.length > 1 || e.length === 1 && s.hasEdge(e[0], e[0]);
          });
        }
      });
      var ee = c((Nr, $) => {
        $.exports = Ke;
        var He = () => 1;
        function Ke(s, e, r) {
          return Re(s, e || He, r || function(t) {
            return s.outEdges(t);
          });
        }
        function Re(s, e, r) {
          var t = {}, i = s.nodes();
          return i.forEach(function(n) {
            t[n] = {}, t[n][n] = { distance: 0 }, i.forEach(function(a) {
              n !== a && (t[n][a] = { distance: Number.POSITIVE_INFINITY });
            }), r(n).forEach(function(a) {
              var o = a.v === n ? a.w : a.v, h = e(a);
              t[n][o] = { distance: h, predecessor: n };
            });
          }), i.forEach(function(n) {
            var a = t[n];
            i.forEach(function(o) {
              var h = t[o];
              i.forEach(function(u) {
                var d = h[n], _ = a[u], f = h[u], p = d.distance + _.distance;
                p < f.distance && (f.distance = p, f.predecessor = _.predecessor);
              });
            });
          }), t;
        }
      });
      var k = c((jr, te) => {
        function re(s) {
          var e = {}, r = {}, t = [];
          function i(n) {
            if (Object.hasOwn(r, n)) throw new E();
            Object.hasOwn(e, n) || (r[n] = true, e[n] = true, s.predecessors(n).forEach(i), delete r[n], t.push(n));
          }
          if (s.sinks().forEach(i), Object.keys(e).length !== s.nodeCount()) throw new E();
          return t;
        }
        var E = class extends Error {
          constructor() {
            super(...arguments);
          }
        };
        te.exports = re;
        re.CycleException = E;
      });
      var ne = c((Ir, se) => {
        var ie = k();
        se.exports = Be;
        function Be(s) {
          try {
            ie(s);
          } catch (e) {
            if (e instanceof ie.CycleException) return false;
            throw e;
          }
          return true;
        }
      });
      var x = c((kr, ae) => {
        ae.exports = Qe;
        function Qe(s, e, r, t, i) {
          Array.isArray(e) || (e = [e]);
          var n = (s.isDirected() ? s.successors : s.neighbors).bind(s), a = {};
          return e.forEach(function(o) {
            if (!s.hasNode(o)) throw new Error("Graph does not have node: " + o);
            i = Je(s, o, r === "post", a, n, t, i);
          }), i;
        }
        function Je(s, e, r, t, i, n, a) {
          if (Object.hasOwn(t, e)) return a;
          var o = i(e), h = [{ v: e, nb: o, childIdx: 0 }];
          for (t[e] = true, r || (a = n(a, e)); h.length > 0; ) {
            for (var u = h[h.length - 1], d = false; u.childIdx < u.nb.length; ) {
              var _ = u.nb[u.childIdx++];
              if (!Object.hasOwn(t, _)) {
                t[_] = true, r || (a = n(a, _));
                var f = i(_);
                h.push({ v: _, nb: f, childIdx: 0 }), d = true;
                break;
              }
            }
            d || (r && (a = n(a, u.v)), h.pop());
          }
          return a;
        }
      });
      var C = c((xr, oe) => {
        var Xe = x();
        oe.exports = Ze;
        function Ze(s, e, r) {
          return Xe(s, e, r, function(t, i) {
            return t.push(i), t;
          }, []);
        }
      });
      var he = c((Cr, ue) => {
        var $e = C();
        ue.exports = er;
        function er(s, e) {
          return $e(s, e, "post");
        }
      });
      var fe = c((qr, de) => {
        var rr = C();
        de.exports = tr;
        function tr(s, e) {
          return rr(s, e, "pre");
        }
      });
      var le = c((Dr, ce) => {
        var ir = b(), sr = j();
        ce.exports = nr;
        function nr(s, e) {
          var r = new ir(), t = {}, i = new sr(), n;
          function a(h) {
            var u = h.v === n ? h.w : h.v, d = i.priority(u);
            if (d !== void 0) {
              var _ = e(h);
              _ < d && (t[u] = n, i.decrease(u, _));
            }
          }
          if (s.nodeCount() === 0) return r;
          s.nodes().forEach(function(h) {
            i.add(h, Number.POSITIVE_INFINITY), r.setNode(h);
          }), i.decrease(s.nodes()[0], 0);
          for (var o = false; i.size() > 0; ) {
            if (n = i.removeMin(), Object.hasOwn(t, n)) r.setEdge(n, t[n]);
            else {
              if (o) throw new Error("Input graph is not connected: " + s);
              o = true;
            }
            s.nodeEdges(n).forEach(a);
          }
          return r;
        }
      });
      var ve = c((Lr, pe) => {
        var _e = w(), ar = y();
        pe.exports = or;
        function or(s, e, r, t) {
          return ur(s, e, r, t || function(i) {
            return s.outEdges(i);
          });
        }
        function ur(s, e, r, t) {
          if (r === void 0) return _e(s, e, r, t);
          for (var i = false, n = s.nodes(), a = 0; a < n.length; a++) {
            for (var o = t(n[a]), h = 0; h < o.length; h++) {
              var u = o[h], d = u.v === n[a] ? u.v : u.w, _ = d === u.v ? u.w : u.v;
              r({ v: d, w: _ }) < 0 && (i = true);
            }
            if (i) return ar(s, e, r, t);
          }
          return _e(s, e, r, t);
        }
      });
      var Ee = c((Fr, ge) => {
        ge.exports = { bellmanFord: y(), components: z(), dijkstra: w(), dijkstraAll: R(), extractPath: Q(), findCycles: Z(), floydWarshall: ee(), isAcyclic: ne(), postorder: he(), preorder: fe(), prim: le(), shortestPaths: ve(), reduce: x(), tarjan: I(), topsort: k() };
      });
      var be = S();
      module.exports = { Graph: be.Graph, json: U(), alg: Ee(), version: be.version };
    }
  });

  // lib/data/list.js
  var require_list = __commonJS({
    "lib/data/list.js"(exports, module) {
      var List = class {
        constructor() {
          let sentinel = {};
          sentinel._next = sentinel._prev = sentinel;
          this._sentinel = sentinel;
        }
        dequeue() {
          let sentinel = this._sentinel;
          let entry = sentinel._prev;
          if (entry !== sentinel) {
            unlink(entry);
            return entry;
          }
        }
        enqueue(entry) {
          let sentinel = this._sentinel;
          if (entry._prev && entry._next) {
            unlink(entry);
          }
          entry._next = sentinel._next;
          sentinel._next._prev = entry;
          sentinel._next = entry;
          entry._prev = sentinel;
        }
        toString() {
          let strs = [];
          let sentinel = this._sentinel;
          let curr = sentinel._prev;
          while (curr !== sentinel) {
            strs.push(JSON.stringify(curr, filterOutLinks));
            curr = curr._prev;
          }
          return "[" + strs.join(", ") + "]";
        }
      };
      function unlink(entry) {
        entry._prev._next = entry._next;
        entry._next._prev = entry._prev;
        delete entry._next;
        delete entry._prev;
      }
      function filterOutLinks(k, v) {
        if (k !== "_next" && k !== "_prev") {
          return v;
        }
      }
      module.exports = List;
    }
  });

  // lib/greedy-fas.js
  var require_greedy_fas = __commonJS({
    "lib/greedy-fas.js"(exports, module) {
      var Graph = require_graphlib_cjs().Graph;
      var List = require_list();
      module.exports = greedyFAS;
      var DEFAULT_WEIGHT_FN = () => 1;
      function greedyFAS(g, weightFn) {
        if (g.nodeCount() <= 1) {
          return [];
        }
        let state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
        let results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);
        return results.flatMap((e) => g.outEdges(e.v, e.w));
      }
      function doGreedyFAS(g, buckets, zeroIdx) {
        let results = [];
        let sources = buckets[buckets.length - 1];
        let sinks = buckets[0];
        let entry;
        while (g.nodeCount()) {
          while (entry = sinks.dequeue()) {
            removeNode(g, buckets, zeroIdx, entry);
          }
          while (entry = sources.dequeue()) {
            removeNode(g, buckets, zeroIdx, entry);
          }
          if (g.nodeCount()) {
            for (let i = buckets.length - 2; i > 0; --i) {
              entry = buckets[i].dequeue();
              if (entry) {
                results = results.concat(removeNode(g, buckets, zeroIdx, entry, true));
                break;
              }
            }
          }
        }
        return results;
      }
      function removeNode(g, buckets, zeroIdx, entry, collectPredecessors) {
        let results = collectPredecessors ? [] : void 0;
        g.inEdges(entry.v).forEach((edge) => {
          let weight = g.edge(edge);
          let uEntry = g.node(edge.v);
          if (collectPredecessors) {
            results.push({ v: edge.v, w: edge.w });
          }
          uEntry.out -= weight;
          assignBucket(buckets, zeroIdx, uEntry);
        });
        g.outEdges(entry.v).forEach((edge) => {
          let weight = g.edge(edge);
          let w = edge.w;
          let wEntry = g.node(w);
          wEntry["in"] -= weight;
          assignBucket(buckets, zeroIdx, wEntry);
        });
        g.removeNode(entry.v);
        return results;
      }
      function buildState(g, weightFn) {
        let fasGraph = new Graph();
        let maxIn = 0;
        let maxOut = 0;
        g.nodes().forEach((v) => {
          fasGraph.setNode(v, { v, "in": 0, out: 0 });
        });
        g.edges().forEach((e) => {
          let prevWeight = fasGraph.edge(e.v, e.w) || 0;
          let weight = weightFn(e);
          let edgeWeight = prevWeight + weight;
          fasGraph.setEdge(e.v, e.w, edgeWeight);
          maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight);
          maxIn = Math.max(maxIn, fasGraph.node(e.w)["in"] += weight);
        });
        let buckets = range(maxOut + maxIn + 3).map(() => new List());
        let zeroIdx = maxIn + 1;
        fasGraph.nodes().forEach((v) => {
          assignBucket(buckets, zeroIdx, fasGraph.node(v));
        });
        return { graph: fasGraph, buckets, zeroIdx };
      }
      function assignBucket(buckets, zeroIdx, entry) {
        if (!entry.out) {
          buckets[0].enqueue(entry);
        } else if (!entry["in"]) {
          buckets[buckets.length - 1].enqueue(entry);
        } else {
          buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
        }
      }
      function range(limit) {
        const range2 = [];
        for (let i = 0; i < limit; i++) {
          range2.push(i);
        }
        return range2;
      }
    }
  });

  // lib/util.js
  var require_util = __commonJS({
    "lib/util.js"(exports, module) {
      "use strict";
      var Graph = require_graphlib_cjs().Graph;
      module.exports = {
        addBorderNode,
        addDummyNode,
        applyWithChunking,
        asNonCompoundGraph,
        buildLayerMatrix,
        intersectRect,
        mapValues,
        maxRank,
        normalizeRanks,
        notime,
        partition,
        pick,
        predecessorWeights,
        range,
        removeEmptyRanks,
        simplify,
        successorWeights,
        time,
        uniqueId,
        zipObject
      };
      function addDummyNode(g, type, attrs, name) {
        var v = name;
        while (g.hasNode(v)) {
          v = uniqueId(name);
        }
        attrs.dummy = type;
        g.setNode(v, attrs);
        return v;
      }
      function simplify(g) {
        let simplified = new Graph().setGraph(g.graph());
        g.nodes().forEach((v) => simplified.setNode(v, g.node(v)));
        g.edges().forEach((e) => {
          let simpleLabel = simplified.edge(e.v, e.w) || { weight: 0, minlen: 1 };
          let label = g.edge(e);
          simplified.setEdge(e.v, e.w, {
            weight: simpleLabel.weight + label.weight,
            minlen: Math.max(simpleLabel.minlen, label.minlen)
          });
        });
        return simplified;
      }
      function asNonCompoundGraph(g) {
        let simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
        g.nodes().forEach((v) => {
          if (!g.children(v).length) {
            simplified.setNode(v, g.node(v));
          }
        });
        g.edges().forEach((e) => {
          simplified.setEdge(e, g.edge(e));
        });
        return simplified;
      }
      function successorWeights(g) {
        let weightMap = g.nodes().map((v) => {
          let sucs = {};
          g.outEdges(v).forEach((e) => {
            sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight;
          });
          return sucs;
        });
        return zipObject(g.nodes(), weightMap);
      }
      function predecessorWeights(g) {
        let weightMap = g.nodes().map((v) => {
          let preds = {};
          g.inEdges(v).forEach((e) => {
            preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
          });
          return preds;
        });
        return zipObject(g.nodes(), weightMap);
      }
      function intersectRect(rect, point) {
        let x = rect.x;
        let y = rect.y;
        let dx = point.x - x;
        let dy = point.y - y;
        let w = rect.width / 2;
        let h = rect.height / 2;
        if (!dx && !dy) {
          throw new Error("Not possible to find intersection inside of the rectangle");
        }
        let sx, sy;
        if (Math.abs(dy) * w > Math.abs(dx) * h) {
          if (dy < 0) {
            h = -h;
          }
          sx = h * dx / dy;
          sy = h;
        } else {
          if (dx < 0) {
            w = -w;
          }
          sx = w;
          sy = w * dy / dx;
        }
        return { x: x + sx, y: y + sy };
      }
      function buildLayerMatrix(g) {
        let layering = range(maxRank(g) + 1).map(() => []);
        g.nodes().forEach((v) => {
          let node = g.node(v);
          let rank = node.rank;
          if (rank !== void 0) {
            layering[rank][node.order] = v;
          }
        });
        return layering;
      }
      function normalizeRanks(g) {
        let nodeRanks = g.nodes().map((v) => {
          let rank = g.node(v).rank;
          if (rank === void 0) {
            return Number.MAX_VALUE;
          }
          return rank;
        });
        let min = applyWithChunking(Math.min, nodeRanks);
        g.nodes().forEach((v) => {
          let node = g.node(v);
          if (Object.hasOwn(node, "rank")) {
            node.rank -= min;
          }
        });
      }
      function removeEmptyRanks(g) {
        let nodeRanks = g.nodes().map((v) => g.node(v).rank).filter((rank) => rank !== void 0);
        let offset = applyWithChunking(Math.min, nodeRanks);
        let layers = [];
        g.nodes().forEach((v) => {
          let rank = g.node(v).rank - offset;
          if (!layers[rank]) {
            layers[rank] = [];
          }
          layers[rank].push(v);
        });
        let delta = 0;
        let nodeRankFactor = g.graph().nodeRankFactor;
        Array.from(layers).forEach((vs, i) => {
          if (vs === void 0 && i % nodeRankFactor !== 0) {
            --delta;
          } else if (vs !== void 0 && delta) {
            vs.forEach((v) => g.node(v).rank += delta);
          }
        });
      }
      function addBorderNode(g, prefix, rank, order) {
        let node = {
          width: 0,
          height: 0
        };
        if (arguments.length >= 4) {
          node.rank = rank;
          node.order = order;
        }
        return addDummyNode(g, "border", node, prefix);
      }
      function applyWithChunking(fn, argsArray) {
        if (argsArray.length === 0) return fn();
        let result = argsArray[0];
        for (let i = 1; i < argsArray.length; i++) {
          result = fn(result, argsArray[i]);
        }
        return result;
      }
      function maxRank(g) {
        const nodes = g.nodes();
        const nodeRanks = nodes.map((v) => {
          let rank = g.node(v).rank;
          if (rank === void 0) {
            return Number.MIN_VALUE;
          }
          return rank;
        });
        return applyWithChunking(Math.max, nodeRanks);
      }
      function partition(collection, fn) {
        let result = { lhs: [], rhs: [] };
        collection.forEach((value) => {
          if (fn(value)) {
            result.lhs.push(value);
          } else {
            result.rhs.push(value);
          }
        });
        return result;
      }
      function time(name, fn) {
        let start = Date.now();
        try {
          return fn();
        } finally {
          console.log(name + " time: " + (Date.now() - start) + "ms");
        }
      }
      function notime(name, fn) {
        return fn();
      }
      var idCounter = 0;
      function uniqueId(prefix) {
        var id = ++idCounter;
        return prefix + ("" + id);
      }
      function range(start, limit, step = 1) {
        if (limit == null) {
          limit = start;
          start = 0;
        }
        let endCon = (i) => i < limit;
        if (step < 0) {
          endCon = (i) => limit < i;
        }
        const range2 = [];
        for (let i = start; endCon(i); i += step) {
          range2.push(i);
        }
        return range2;
      }
      function pick(source, keys) {
        const dest = {};
        for (const key of keys) {
          if (source[key] !== void 0) {
            dest[key] = source[key];
          }
        }
        return dest;
      }
      function mapValues(obj, funcOrProp) {
        let func = funcOrProp;
        if (typeof funcOrProp === "string") {
          func = (val) => val[funcOrProp];
        }
        return Object.entries(obj).reduce((acc, [k, v]) => {
          acc[k] = func(v, k);
          return acc;
        }, {});
      }
      function zipObject(props, values) {
        return props.reduce((acc, key, i) => {
          acc[key] = values[i];
          return acc;
        }, {});
      }
    }
  });

  // lib/acyclic.js
  var require_acyclic = __commonJS({
    "lib/acyclic.js"(exports, module) {
      "use strict";
      var greedyFAS = require_greedy_fas();
      var uniqueId = require_util().uniqueId;
      module.exports = {
        run,
        undo
      };
      function run(g) {
        let fas = g.graph().acyclicer === "greedy" ? greedyFAS(g, weightFn(g)) : dfsFAS(g);
        fas.forEach((e) => {
          let label = g.edge(e);
          g.removeEdge(e);
          label.forwardName = e.name;
          label.reversed = true;
          g.setEdge(e.w, e.v, label, uniqueId("rev"));
        });
        function weightFn(g2) {
          return (e) => {
            return g2.edge(e).weight;
          };
        }
      }
      function dfsFAS(g) {
        let fas = [];
        let stack = {};
        let visited = {};
        function dfs(v) {
          if (Object.hasOwn(visited, v)) {
            return;
          }
          visited[v] = true;
          stack[v] = true;
          g.outEdges(v).forEach((e) => {
            if (Object.hasOwn(stack, e.w)) {
              fas.push(e);
            } else {
              dfs(e.w);
            }
          });
          delete stack[v];
        }
        g.nodes().forEach(dfs);
        return fas;
      }
      function undo(g) {
        g.edges().forEach((e) => {
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
    }
  });

  // lib/normalize.js
  var require_normalize = __commonJS({
    "lib/normalize.js"(exports, module) {
      "use strict";
      var util = require_util();
      module.exports = {
        run,
        undo
      };
      function run(g) {
        g.graph().dummyChains = [];
        g.edges().forEach((edge) => normalizeEdge(g, edge));
      }
      function normalizeEdge(g, e) {
        let v = e.v;
        let vRank = g.node(v).rank;
        let w = e.w;
        let wRank = g.node(w).rank;
        let name = e.name;
        let edgeLabel = g.edge(e);
        let labelRank = edgeLabel.labelRank;
        if (wRank === vRank + 1) return;
        g.removeEdge(e);
        let dummy, attrs, i;
        for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
          edgeLabel.points = [];
          attrs = {
            width: 0,
            height: 0,
            edgeLabel,
            edgeObj: e,
            rank: vRank
          };
          dummy = util.addDummyNode(g, "edge", attrs, "_d");
          if (vRank === labelRank) {
            attrs.width = edgeLabel.width;
            attrs.height = edgeLabel.height;
            attrs.dummy = "edge-label";
            attrs.labelpos = edgeLabel.labelpos;
          }
          g.setEdge(v, dummy, { weight: edgeLabel.weight }, name);
          if (i === 0) {
            g.graph().dummyChains.push(dummy);
          }
          v = dummy;
        }
        g.setEdge(v, w, { weight: edgeLabel.weight }, name);
      }
      function undo(g) {
        g.graph().dummyChains.forEach((v) => {
          let node = g.node(v);
          let origLabel = node.edgeLabel;
          let w;
          g.setEdge(node.edgeObj, origLabel);
          while (node.dummy) {
            w = g.successors(v)[0];
            g.removeNode(v);
            origLabel.points.push({ x: node.x, y: node.y });
            if (node.dummy === "edge-label") {
              origLabel.x = node.x;
              origLabel.y = node.y;
              origLabel.width = node.width;
              origLabel.height = node.height;
            }
            v = w;
            node = g.node(v);
          }
        });
      }
    }
  });

  // lib/rank/util.js
  var require_util2 = __commonJS({
    "lib/rank/util.js"(exports, module) {
      "use strict";
      var { applyWithChunking } = require_util();
      module.exports = {
        longestPath,
        slack
      };
      function longestPath(g) {
        var visited = {};
        function dfs(v) {
          var label = g.node(v);
          if (Object.hasOwn(visited, v)) {
            return label.rank;
          }
          visited[v] = true;
          let outEdgesMinLens = g.outEdges(v).map((e) => {
            if (e == null) {
              return Number.POSITIVE_INFINITY;
            }
            return dfs(e.w) - g.edge(e).minlen;
          });
          var rank = applyWithChunking(Math.min, outEdgesMinLens);
          if (rank === Number.POSITIVE_INFINITY) {
            rank = 0;
          }
          return label.rank = rank;
        }
        g.sources().forEach(dfs);
      }
      function slack(g, e) {
        return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
      }
    }
  });

  // lib/rank/feasible-tree.js
  var require_feasible_tree = __commonJS({
    "lib/rank/feasible-tree.js"(exports, module) {
      "use strict";
      var Graph = require_graphlib_cjs().Graph;
      var slack = require_util2().slack;
      module.exports = feasibleTree;
      function feasibleTree(g) {
        var t = new Graph({ directed: false });
        var start = g.nodes()[0];
        var size = g.nodeCount();
        t.setNode(start, {});
        var edge, delta;
        while (tightTree(t, g) < size) {
          edge = findMinSlackEdge(t, g);
          delta = t.hasNode(edge.v) ? slack(g, edge) : -slack(g, edge);
          shiftRanks(t, g, delta);
        }
        return t;
      }
      function tightTree(t, g) {
        function dfs(v) {
          g.nodeEdges(v).forEach((e) => {
            var edgeV = e.v, w = v === edgeV ? e.w : edgeV;
            if (!t.hasNode(w) && !slack(g, e)) {
              t.setNode(w, {});
              t.setEdge(v, w, {});
              dfs(w);
            }
          });
        }
        t.nodes().forEach(dfs);
        return t.nodeCount();
      }
      function findMinSlackEdge(t, g) {
        const edges = g.edges();
        return edges.reduce((acc, edge) => {
          let edgeSlack = Number.POSITIVE_INFINITY;
          if (t.hasNode(edge.v) !== t.hasNode(edge.w)) {
            edgeSlack = slack(g, edge);
          }
          if (edgeSlack < acc[0]) {
            return [edgeSlack, edge];
          }
          return acc;
        }, [Number.POSITIVE_INFINITY, null])[1];
      }
      function shiftRanks(t, g, delta) {
        t.nodes().forEach((v) => g.node(v).rank += delta);
      }
    }
  });

  // lib/rank/network-simplex.js
  var require_network_simplex = __commonJS({
    "lib/rank/network-simplex.js"(exports, module) {
      "use strict";
      var feasibleTree = require_feasible_tree();
      var slack = require_util2().slack;
      var initRank = require_util2().longestPath;
      var preorder = require_graphlib_cjs().alg.preorder;
      var postorder = require_graphlib_cjs().alg.postorder;
      var simplify = require_util().simplify;
      module.exports = networkSimplex;
      networkSimplex.initLowLimValues = initLowLimValues;
      networkSimplex.initCutValues = initCutValues;
      networkSimplex.calcCutValue = calcCutValue;
      networkSimplex.leaveEdge = leaveEdge;
      networkSimplex.enterEdge = enterEdge;
      networkSimplex.exchangeEdges = exchangeEdges;
      function networkSimplex(g) {
        g = simplify(g);
        initRank(g);
        var t = feasibleTree(g);
        initLowLimValues(t);
        initCutValues(t, g);
        var e, f;
        while (e = leaveEdge(t)) {
          f = enterEdge(t, g, e);
          exchangeEdges(t, g, e, f);
        }
      }
      function initCutValues(t, g) {
        var vs = postorder(t, t.nodes());
        vs = vs.slice(0, vs.length - 1);
        vs.forEach((v) => assignCutValue(t, g, v));
      }
      function assignCutValue(t, g, child) {
        var childLab = t.node(child);
        var parent = childLab.parent;
        t.edge(child, parent).cutvalue = calcCutValue(t, g, child);
      }
      function calcCutValue(t, g, child) {
        var childLab = t.node(child);
        var parent = childLab.parent;
        var childIsTail = true;
        var graphEdge = g.edge(child, parent);
        var cutValue = 0;
        if (!graphEdge) {
          childIsTail = false;
          graphEdge = g.edge(parent, child);
        }
        cutValue = graphEdge.weight;
        g.nodeEdges(child).forEach((e) => {
          var isOutEdge = e.v === child, other = isOutEdge ? e.w : e.v;
          if (other !== parent) {
            var pointsToHead = isOutEdge === childIsTail, otherWeight = g.edge(e).weight;
            cutValue += pointsToHead ? otherWeight : -otherWeight;
            if (isTreeEdge(t, child, other)) {
              var otherCutValue = t.edge(child, other).cutvalue;
              cutValue += pointsToHead ? -otherCutValue : otherCutValue;
            }
          }
        });
        return cutValue;
      }
      function initLowLimValues(tree, root) {
        if (arguments.length < 2) {
          root = tree.nodes()[0];
        }
        dfsAssignLowLim(tree, {}, 1, root);
      }
      function dfsAssignLowLim(tree, visited, nextLim, v, parent) {
        var low = nextLim;
        var label = tree.node(v);
        visited[v] = true;
        tree.neighbors(v).forEach((w) => {
          if (!Object.hasOwn(visited, w)) {
            nextLim = dfsAssignLowLim(tree, visited, nextLim, w, v);
          }
        });
        label.low = low;
        label.lim = nextLim++;
        if (parent) {
          label.parent = parent;
        } else {
          delete label.parent;
        }
        return nextLim;
      }
      function leaveEdge(tree) {
        return tree.edges().find((e) => tree.edge(e).cutvalue < 0);
      }
      function enterEdge(t, g, edge) {
        var v = edge.v;
        var w = edge.w;
        if (!g.hasEdge(v, w)) {
          v = edge.w;
          w = edge.v;
        }
        var vLabel = t.node(v);
        var wLabel = t.node(w);
        var tailLabel = vLabel;
        var flip = false;
        if (vLabel.lim > wLabel.lim) {
          tailLabel = wLabel;
          flip = true;
        }
        var candidates = g.edges().filter((edge2) => {
          return flip === isDescendant(t, t.node(edge2.v), tailLabel) && flip !== isDescendant(t, t.node(edge2.w), tailLabel);
        });
        return candidates.reduce((acc, edge2) => {
          if (slack(g, edge2) < slack(g, acc)) {
            return edge2;
          }
          return acc;
        });
      }
      function exchangeEdges(t, g, e, f) {
        var v = e.v;
        var w = e.w;
        t.removeEdge(v, w);
        t.setEdge(f.v, f.w, {});
        initLowLimValues(t);
        initCutValues(t, g);
        updateRanks(t, g);
      }
      function updateRanks(t, g) {
        var root = t.nodes().find((v) => !g.node(v).parent);
        var vs = preorder(t, root);
        vs = vs.slice(1);
        vs.forEach((v) => {
          var parent = t.node(v).parent, edge = g.edge(v, parent), flipped = false;
          if (!edge) {
            edge = g.edge(parent, v);
            flipped = true;
          }
          g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
        });
      }
      function isTreeEdge(tree, u, v) {
        return tree.hasEdge(u, v);
      }
      function isDescendant(tree, vLabel, rootLabel) {
        return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim;
      }
    }
  });

  // lib/rank/index.js
  var require_rank = __commonJS({
    "lib/rank/index.js"(exports, module) {
      "use strict";
      var rankUtil = require_util2();
      var longestPath = rankUtil.longestPath;
      var feasibleTree = require_feasible_tree();
      var networkSimplex = require_network_simplex();
      module.exports = rank;
      function rank(g) {
        var ranker = g.graph().ranker;
        if (ranker instanceof Function) {
          return ranker(g);
        }
        switch (g.graph().ranker) {
          case "network-simplex":
            networkSimplexRanker(g);
            break;
          case "tight-tree":
            tightTreeRanker(g);
            break;
          case "longest-path":
            longestPathRanker(g);
            break;
          case "none":
            break;
          default:
            networkSimplexRanker(g);
        }
      }
      var longestPathRanker = longestPath;
      function tightTreeRanker(g) {
        longestPath(g);
        feasibleTree(g);
      }
      function networkSimplexRanker(g) {
        networkSimplex(g);
      }
    }
  });

  // lib/parent-dummy-chains.js
  var require_parent_dummy_chains = __commonJS({
    "lib/parent-dummy-chains.js"(exports, module) {
      module.exports = parentDummyChains;
      function parentDummyChains(g) {
        let postorderNums = postorder(g);
        g.graph().dummyChains.forEach((v) => {
          let node = g.node(v);
          let edgeObj = node.edgeObj;
          let pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w);
          let path = pathData.path;
          let lca = pathData.lca;
          let pathIdx = 0;
          let pathV = path[pathIdx];
          let ascending = true;
          while (v !== edgeObj.w) {
            node = g.node(v);
            if (ascending) {
              while ((pathV = path[pathIdx]) !== lca && g.node(pathV).maxRank < node.rank) {
                pathIdx++;
              }
              if (pathV === lca) {
                ascending = false;
              }
            }
            if (!ascending) {
              while (pathIdx < path.length - 1 && g.node(pathV = path[pathIdx + 1]).minRank <= node.rank) {
                pathIdx++;
              }
              pathV = path[pathIdx];
            }
            g.setParent(v, pathV);
            v = g.successors(v)[0];
          }
        });
      }
      function findPath(g, postorderNums, v, w) {
        let vPath = [];
        let wPath = [];
        let low = Math.min(postorderNums[v].low, postorderNums[w].low);
        let lim = Math.max(postorderNums[v].lim, postorderNums[w].lim);
        let parent;
        let lca;
        parent = v;
        do {
          parent = g.parent(parent);
          vPath.push(parent);
        } while (parent && (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
        lca = parent;
        parent = w;
        while ((parent = g.parent(parent)) !== lca) {
          wPath.push(parent);
        }
        return { path: vPath.concat(wPath.reverse()), lca };
      }
      function postorder(g) {
        let result = {};
        let lim = 0;
        function dfs(v) {
          let low = lim;
          g.children(v).forEach(dfs);
          result[v] = { low, lim: lim++ };
        }
        g.children().forEach(dfs);
        return result;
      }
    }
  });

  // lib/nesting-graph.js
  var require_nesting_graph = __commonJS({
    "lib/nesting-graph.js"(exports, module) {
      var util = require_util();
      module.exports = {
        run,
        cleanup
      };
      function run(g) {
        let root = util.addDummyNode(g, "root", {}, "_root");
        let depths = treeDepths(g);
        let depthsArr = Object.values(depths);
        let height = util.applyWithChunking(Math.max, depthsArr) - 1;
        let nodeSep = 2 * height + 1;
        g.graph().nestingRoot = root;
        g.edges().forEach((e) => g.edge(e).minlen *= nodeSep);
        let weight = sumWeights(g) + 1;
        g.children().forEach((child) => dfs(g, root, nodeSep, weight, height, depths, child));
        g.graph().nodeRankFactor = nodeSep;
      }
      function dfs(g, root, nodeSep, weight, height, depths, v) {
        let children = g.children(v);
        if (!children.length) {
          if (v !== root) {
            g.setEdge(root, v, { weight: 0, minlen: nodeSep });
          }
          return;
        }
        let top = util.addBorderNode(g, "_bt");
        let bottom = util.addBorderNode(g, "_bb");
        let label = g.node(v);
        g.setParent(top, v);
        label.borderTop = top;
        g.setParent(bottom, v);
        label.borderBottom = bottom;
        children.forEach((child) => {
          dfs(g, root, nodeSep, weight, height, depths, child);
          let childNode = g.node(child);
          let childTop = childNode.borderTop ? childNode.borderTop : child;
          let childBottom = childNode.borderBottom ? childNode.borderBottom : child;
          let thisWeight = childNode.borderTop ? weight : 2 * weight;
          let minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;
          g.setEdge(top, childTop, {
            weight: thisWeight,
            minlen,
            nestingEdge: true
          });
          g.setEdge(childBottom, bottom, {
            weight: thisWeight,
            minlen,
            nestingEdge: true
          });
        });
        if (!g.parent(v)) {
          g.setEdge(root, top, { weight: 0, minlen: height + depths[v] });
        }
      }
      function treeDepths(g) {
        var depths = {};
        function dfs2(v, depth) {
          var children = g.children(v);
          if (children && children.length) {
            children.forEach((child) => dfs2(child, depth + 1));
          }
          depths[v] = depth;
        }
        g.children().forEach((v) => dfs2(v, 1));
        return depths;
      }
      function sumWeights(g) {
        return g.edges().reduce((acc, e) => acc + g.edge(e).weight, 0);
      }
      function cleanup(g) {
        var graphLabel = g.graph();
        g.removeNode(graphLabel.nestingRoot);
        delete graphLabel.nestingRoot;
        g.edges().forEach((e) => {
          var edge = g.edge(e);
          if (edge.nestingEdge) {
            g.removeEdge(e);
          }
        });
      }
    }
  });

  // lib/add-border-segments.js
  var require_add_border_segments = __commonJS({
    "lib/add-border-segments.js"(exports, module) {
      var util = require_util();
      module.exports = addBorderSegments;
      function addBorderSegments(g) {
        function dfs(v) {
          let children = g.children(v);
          let node = g.node(v);
          if (children.length) {
            children.forEach(dfs);
          }
          if (Object.hasOwn(node, "minRank")) {
            node.borderLeft = [];
            node.borderRight = [];
            for (let rank = node.minRank, maxRank = node.maxRank + 1; rank < maxRank; ++rank) {
              addBorderNode(g, "borderLeft", "_bl", v, node, rank);
              addBorderNode(g, "borderRight", "_br", v, node, rank);
            }
          }
        }
        g.children().forEach(dfs);
      }
      function addBorderNode(g, prop, prefix, sg, sgNode, rank) {
        let label = { width: 0, height: 0, rank, borderType: prop };
        let prev = sgNode[prop][rank - 1];
        let curr = util.addDummyNode(g, "border", label, prefix);
        sgNode[prop][rank] = curr;
        g.setParent(curr, sg);
        if (prev) {
          g.setEdge(prev, curr, { weight: 1 });
        }
      }
    }
  });

  // lib/coordinate-system.js
  var require_coordinate_system = __commonJS({
    "lib/coordinate-system.js"(exports, module) {
      "use strict";
      module.exports = {
        adjust,
        undo
      };
      function adjust(g) {
        let rankDir = g.graph().rankdir.toLowerCase();
        if (rankDir === "lr" || rankDir === "rl") {
          swapWidthHeight(g);
        }
      }
      function undo(g) {
        let rankDir = g.graph().rankdir.toLowerCase();
        if (rankDir === "bt" || rankDir === "rl") {
          reverseY(g);
        }
        if (rankDir === "lr" || rankDir === "rl") {
          swapXY(g);
          swapWidthHeight(g);
        }
      }
      function swapWidthHeight(g) {
        g.nodes().forEach((v) => swapWidthHeightOne(g.node(v)));
        g.edges().forEach((e) => swapWidthHeightOne(g.edge(e)));
      }
      function swapWidthHeightOne(attrs) {
        let w = attrs.width;
        attrs.width = attrs.height;
        attrs.height = w;
      }
      function reverseY(g) {
        g.nodes().forEach((v) => reverseYOne(g.node(v)));
        g.edges().forEach((e) => {
          let edge = g.edge(e);
          edge.points.forEach(reverseYOne);
          if (Object.hasOwn(edge, "y")) {
            reverseYOne(edge);
          }
        });
      }
      function reverseYOne(attrs) {
        attrs.y = -attrs.y;
      }
      function swapXY(g) {
        g.nodes().forEach((v) => swapXYOne(g.node(v)));
        g.edges().forEach((e) => {
          let edge = g.edge(e);
          edge.points.forEach(swapXYOne);
          if (Object.hasOwn(edge, "x")) {
            swapXYOne(edge);
          }
        });
      }
      function swapXYOne(attrs) {
        let x = attrs.x;
        attrs.x = attrs.y;
        attrs.y = x;
      }
    }
  });

  // lib/order/init-order.js
  var require_init_order = __commonJS({
    "lib/order/init-order.js"(exports, module) {
      "use strict";
      var util = require_util();
      module.exports = initOrder;
      function initOrder(g) {
        let visited = {};
        let simpleNodes = g.nodes().filter((v) => !g.children(v).length);
        let simpleNodesRanks = simpleNodes.map((v) => g.node(v).rank);
        let maxRank = util.applyWithChunking(Math.max, simpleNodesRanks);
        let layers = util.range(maxRank + 1).map(() => []);
        function dfs(v) {
          if (visited[v]) return;
          visited[v] = true;
          let node = g.node(v);
          layers[node.rank].push(v);
          g.successors(v).forEach(dfs);
        }
        let orderedVs = simpleNodes.sort((a, b) => g.node(a).rank - g.node(b).rank);
        orderedVs.forEach(dfs);
        return layers;
      }
    }
  });

  // lib/order/cross-count.js
  var require_cross_count = __commonJS({
    "lib/order/cross-count.js"(exports, module) {
      "use strict";
      var zipObject = require_util().zipObject;
      module.exports = crossCount;
      function crossCount(g, layering) {
        let cc = 0;
        for (let i = 1; i < layering.length; ++i) {
          cc += twoLayerCrossCount(g, layering[i - 1], layering[i]);
        }
        return cc;
      }
      function twoLayerCrossCount(g, northLayer, southLayer) {
        let southPos = zipObject(southLayer, southLayer.map((v, i) => i));
        let southEntries = northLayer.flatMap((v) => {
          return g.outEdges(v).map((e) => {
            return { pos: southPos[e.w], weight: g.edge(e).weight };
          }).sort((a, b) => a.pos - b.pos);
        });
        let firstIndex = 1;
        while (firstIndex < southLayer.length) firstIndex <<= 1;
        let treeSize = 2 * firstIndex - 1;
        firstIndex -= 1;
        let tree = new Array(treeSize).fill(0);
        let cc = 0;
        southEntries.forEach((entry) => {
          let index = entry.pos + firstIndex;
          tree[index] += entry.weight;
          let weightSum = 0;
          while (index > 0) {
            if (index % 2) {
              weightSum += tree[index + 1];
            }
            index = index - 1 >> 1;
            tree[index] += entry.weight;
          }
          cc += entry.weight * weightSum;
        });
        return cc;
      }
    }
  });

  // lib/order/barycenter.js
  var require_barycenter = __commonJS({
    "lib/order/barycenter.js"(exports, module) {
      module.exports = barycenter;
      function barycenter(g, movable = []) {
        return movable.map((v) => {
          let inV = g.inEdges(v);
          if (!inV.length) {
            return { v };
          } else {
            let result = inV.reduce((acc, e) => {
              let edge = g.edge(e), nodeU = g.node(e.v);
              return {
                sum: acc.sum + edge.weight * nodeU.order,
                weight: acc.weight + edge.weight
              };
            }, { sum: 0, weight: 0 });
            return {
              v,
              barycenter: result.sum / result.weight,
              weight: result.weight
            };
          }
        });
      }
    }
  });

  // lib/order/resolve-conflicts.js
  var require_resolve_conflicts = __commonJS({
    "lib/order/resolve-conflicts.js"(exports, module) {
      "use strict";
      var util = require_util();
      module.exports = resolveConflicts;
      function resolveConflicts(entries, cg) {
        let mappedEntries = {};
        entries.forEach((entry, i) => {
          let tmp = mappedEntries[entry.v] = {
            indegree: 0,
            "in": [],
            out: [],
            vs: [entry.v],
            i
          };
          if (entry.barycenter !== void 0) {
            tmp.barycenter = entry.barycenter;
            tmp.weight = entry.weight;
          }
        });
        cg.edges().forEach((e) => {
          let entryV = mappedEntries[e.v];
          let entryW = mappedEntries[e.w];
          if (entryV !== void 0 && entryW !== void 0) {
            entryW.indegree++;
            entryV.out.push(mappedEntries[e.w]);
          }
        });
        let sourceSet = Object.values(mappedEntries).filter((entry) => !entry.indegree);
        return doResolveConflicts(sourceSet);
      }
      function doResolveConflicts(sourceSet) {
        let entries = [];
        function handleIn(vEntry) {
          return (uEntry) => {
            if (uEntry.merged) {
              return;
            }
            if (uEntry.barycenter === void 0 || vEntry.barycenter === void 0 || uEntry.barycenter >= vEntry.barycenter) {
              mergeEntries(vEntry, uEntry);
            }
          };
        }
        function handleOut(vEntry) {
          return (wEntry) => {
            wEntry["in"].push(vEntry);
            if (--wEntry.indegree === 0) {
              sourceSet.push(wEntry);
            }
          };
        }
        while (sourceSet.length) {
          let entry = sourceSet.pop();
          entries.push(entry);
          entry["in"].reverse().forEach(handleIn(entry));
          entry.out.forEach(handleOut(entry));
        }
        return entries.filter((entry) => !entry.merged).map((entry) => {
          return util.pick(entry, ["vs", "i", "barycenter", "weight"]);
        });
      }
      function mergeEntries(target, source) {
        let sum = 0;
        let weight = 0;
        if (target.weight) {
          sum += target.barycenter * target.weight;
          weight += target.weight;
        }
        if (source.weight) {
          sum += source.barycenter * source.weight;
          weight += source.weight;
        }
        target.vs = source.vs.concat(target.vs);
        target.barycenter = sum / weight;
        target.weight = weight;
        target.i = Math.min(source.i, target.i);
        source.merged = true;
      }
    }
  });

  // lib/order/sort.js
  var require_sort = __commonJS({
    "lib/order/sort.js"(exports, module) {
      var util = require_util();
      module.exports = sort;
      function sort(entries, biasRight) {
        let parts = util.partition(entries, (entry) => {
          return Object.hasOwn(entry, "barycenter");
        });
        let sortable = parts.lhs, unsortable = parts.rhs.sort((a, b) => b.i - a.i), vs = [], sum = 0, weight = 0, vsIndex = 0;
        sortable.sort(compareWithBias(!!biasRight));
        vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
        sortable.forEach((entry) => {
          vsIndex += entry.vs.length;
          vs.push(entry.vs);
          sum += entry.barycenter * entry.weight;
          weight += entry.weight;
          vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
        });
        let result = { vs: vs.flat(true) };
        if (weight) {
          result.barycenter = sum / weight;
          result.weight = weight;
        }
        return result;
      }
      function consumeUnsortable(vs, unsortable, index) {
        let last;
        while (unsortable.length && (last = unsortable[unsortable.length - 1]).i <= index) {
          unsortable.pop();
          vs.push(last.vs);
          index++;
        }
        return index;
      }
      function compareWithBias(bias) {
        return (entryV, entryW) => {
          if (entryV.barycenter < entryW.barycenter) {
            return -1;
          } else if (entryV.barycenter > entryW.barycenter) {
            return 1;
          }
          return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
        };
      }
    }
  });

  // lib/order/sort-subgraph.js
  var require_sort_subgraph = __commonJS({
    "lib/order/sort-subgraph.js"(exports, module) {
      var barycenter = require_barycenter();
      var resolveConflicts = require_resolve_conflicts();
      var sort = require_sort();
      module.exports = sortSubgraph;
      function sortSubgraph(g, v, cg, biasRight) {
        let movable = g.children(v);
        let node = g.node(v);
        let bl = node ? node.borderLeft : void 0;
        let br = node ? node.borderRight : void 0;
        let subgraphs = {};
        if (bl) {
          movable = movable.filter((w) => w !== bl && w !== br);
        }
        let barycenters = barycenter(g, movable);
        barycenters.forEach((entry) => {
          if (g.children(entry.v).length) {
            let subgraphResult = sortSubgraph(g, entry.v, cg, biasRight);
            subgraphs[entry.v] = subgraphResult;
            if (Object.hasOwn(subgraphResult, "barycenter")) {
              mergeBarycenters(entry, subgraphResult);
            }
          }
        });
        let entries = resolveConflicts(barycenters, cg);
        expandSubgraphs(entries, subgraphs);
        let result = sort(entries, biasRight);
        if (bl) {
          result.vs = [bl, result.vs, br].flat(true);
          if (g.predecessors(bl).length) {
            let blPred = g.node(g.predecessors(bl)[0]), brPred = g.node(g.predecessors(br)[0]);
            if (!Object.hasOwn(result, "barycenter")) {
              result.barycenter = 0;
              result.weight = 0;
            }
            result.barycenter = (result.barycenter * result.weight + blPred.order + brPred.order) / (result.weight + 2);
            result.weight += 2;
          }
        }
        return result;
      }
      function expandSubgraphs(entries, subgraphs) {
        entries.forEach((entry) => {
          entry.vs = entry.vs.flatMap((v) => {
            if (subgraphs[v]) {
              return subgraphs[v].vs;
            }
            return v;
          });
        });
      }
      function mergeBarycenters(target, other) {
        if (target.barycenter !== void 0) {
          target.barycenter = (target.barycenter * target.weight + other.barycenter * other.weight) / (target.weight + other.weight);
          target.weight += other.weight;
        } else {
          target.barycenter = other.barycenter;
          target.weight = other.weight;
        }
      }
    }
  });

  // lib/order/build-layer-graph.js
  var require_build_layer_graph = __commonJS({
    "lib/order/build-layer-graph.js"(exports, module) {
      var Graph = require_graphlib_cjs().Graph;
      var util = require_util();
      module.exports = buildLayerGraph;
      function buildLayerGraph(g, rank, relationship, nodesWithRank) {
        if (!nodesWithRank) {
          nodesWithRank = g.nodes();
        }
        let root = createRootNode(g), result = new Graph({ compound: true }).setGraph({ root }).setDefaultNodeLabel((v) => g.node(v));
        nodesWithRank.forEach((v) => {
          let node = g.node(v), parent = g.parent(v);
          if (node.rank === rank || node.minRank <= rank && rank <= node.maxRank) {
            result.setNode(v);
            result.setParent(v, parent || root);
            g[relationship](v).forEach((e) => {
              let u = e.v === v ? e.w : e.v, edge = result.edge(u, v), weight = edge !== void 0 ? edge.weight : 0;
              result.setEdge(u, v, { weight: g.edge(e).weight + weight });
            });
            if (Object.hasOwn(node, "minRank")) {
              result.setNode(v, {
                borderLeft: node.borderLeft[rank],
                borderRight: node.borderRight[rank]
              });
            }
          }
        });
        return result;
      }
      function createRootNode(g) {
        var v;
        while (g.hasNode(v = util.uniqueId("_root"))) ;
        return v;
      }
    }
  });

  // lib/order/add-subgraph-constraints.js
  var require_add_subgraph_constraints = __commonJS({
    "lib/order/add-subgraph-constraints.js"(exports, module) {
      module.exports = addSubgraphConstraints;
      function addSubgraphConstraints(g, cg, vs) {
        let prev = {}, rootPrev;
        vs.forEach((v) => {
          let child = g.parent(v), parent, prevChild;
          while (child) {
            parent = g.parent(child);
            if (parent) {
              prevChild = prev[parent];
              prev[parent] = child;
            } else {
              prevChild = rootPrev;
              rootPrev = child;
            }
            if (prevChild && prevChild !== child) {
              cg.setEdge(prevChild, child);
              return;
            }
            child = parent;
          }
        });
      }
    }
  });

  // lib/order/index.js
  var require_order = __commonJS({
    "lib/order/index.js"(exports, module) {
      "use strict";
      var initOrder = require_init_order();
      var crossCount = require_cross_count();
      var sortSubgraph = require_sort_subgraph();
      var buildLayerGraph = require_build_layer_graph();
      var addSubgraphConstraints = require_add_subgraph_constraints();
      var Graph = require_graphlib_cjs().Graph;
      var util = require_util();
      module.exports = order;
      function order(g, opts = {}) {
        if (typeof opts.customOrder === "function") {
          opts.customOrder(g, order);
          return;
        }
        let maxRank = util.maxRank(g), downLayerGraphs = buildLayerGraphs(g, util.range(1, maxRank + 1), "inEdges"), upLayerGraphs = buildLayerGraphs(g, util.range(maxRank - 1, -1, -1), "outEdges");
        let layering = initOrder(g);
        assignOrder(g, layering);
        if (opts.disableOptimalOrderHeuristic) {
          return;
        }
        let bestCC = Number.POSITIVE_INFINITY, best;
        const constraints = opts.constraints || [];
        for (let i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
          sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2, constraints);
          layering = util.buildLayerMatrix(g);
          let cc = crossCount(g, layering);
          if (cc < bestCC) {
            lastBest = 0;
            best = Object.assign({}, layering);
            bestCC = cc;
          } else if (cc === bestCC) {
            best = structuredClone(layering);
          }
        }
        assignOrder(g, best);
      }
      function buildLayerGraphs(g, ranks, relationship) {
        const nodesByRank = /* @__PURE__ */ new Map();
        const addNodeToRank = (rank, node) => {
          if (!nodesByRank.has(rank)) {
            nodesByRank.set(rank, []);
          }
          nodesByRank.get(rank).push(node);
        };
        for (const v of g.nodes()) {
          const node = g.node(v);
          if (typeof node.rank === "number") {
            addNodeToRank(node.rank, v);
          }
          if (typeof node.minRank === "number" && typeof node.maxRank === "number") {
            for (let r = node.minRank; r <= node.maxRank; r++) {
              if (r !== node.rank) {
                addNodeToRank(r, v);
              }
            }
          }
        }
        return ranks.map(function(rank) {
          return buildLayerGraph(g, rank, relationship, nodesByRank.get(rank) || []);
        });
      }
      function sweepLayerGraphs(layerGraphs, biasRight, constraints) {
        let cg = new Graph();
        layerGraphs.forEach(function(lg) {
          constraints.forEach((con) => cg.setEdge(con.left, con.right));
          let root = lg.graph().root;
          let sorted = sortSubgraph(lg, root, cg, biasRight);
          sorted.vs.forEach((v, i) => lg.node(v).order = i);
          addSubgraphConstraints(lg, cg, sorted.vs);
        });
      }
      function assignOrder(g, layering) {
        Object.values(layering).forEach((layer) => layer.forEach((v, i) => g.node(v).order = i));
      }
    }
  });

  // lib/position/bk.js
  var require_bk = __commonJS({
    "lib/position/bk.js"(exports, module) {
      "use strict";
      var Graph = require_graphlib_cjs().Graph;
      var util = require_util();
      module.exports = {
        positionX,
        findType1Conflicts,
        findType2Conflicts,
        addConflict,
        hasConflict,
        verticalAlignment,
        horizontalCompaction,
        alignCoordinates,
        findSmallestWidthAlignment,
        balance
      };
      function findType1Conflicts(g, layering) {
        let conflicts = {};
        function visitLayer(prevLayer, layer) {
          let k0 = 0, scanPos = 0, prevLayerLength = prevLayer.length, lastNode = layer[layer.length - 1];
          layer.forEach((v, i) => {
            let w = findOtherInnerSegmentNode(g, v), k1 = w ? g.node(w).order : prevLayerLength;
            if (w || v === lastNode) {
              layer.slice(scanPos, i + 1).forEach((scanNode) => {
                g.predecessors(scanNode).forEach((u) => {
                  let uLabel = g.node(u), uPos = uLabel.order;
                  if ((uPos < k0 || k1 < uPos) && !(uLabel.dummy && g.node(scanNode).dummy)) {
                    addConflict(conflicts, u, scanNode);
                  }
                });
              });
              scanPos = i + 1;
              k0 = k1;
            }
          });
          return layer;
        }
        layering.length && layering.reduce(visitLayer);
        return conflicts;
      }
      function findType2Conflicts(g, layering) {
        let conflicts = {};
        function scan(south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
          let v;
          util.range(southPos, southEnd).forEach((i) => {
            v = south[i];
            if (g.node(v).dummy) {
              g.predecessors(v).forEach((u) => {
                let uNode = g.node(u);
                if (uNode.dummy && (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) {
                  addConflict(conflicts, u, v);
                }
              });
            }
          });
        }
        function visitLayer(north, south) {
          let prevNorthPos = -1, nextNorthPos, southPos = 0;
          south.forEach((v, southLookahead) => {
            if (g.node(v).dummy === "border") {
              let predecessors = g.predecessors(v);
              if (predecessors.length) {
                nextNorthPos = g.node(predecessors[0]).order;
                scan(south, southPos, southLookahead, prevNorthPos, nextNorthPos);
                southPos = southLookahead;
                prevNorthPos = nextNorthPos;
              }
            }
            scan(south, southPos, south.length, nextNorthPos, north.length);
          });
          return south;
        }
        layering.length && layering.reduce(visitLayer);
        return conflicts;
      }
      function findOtherInnerSegmentNode(g, v) {
        if (g.node(v).dummy) {
          return g.predecessors(v).find((u) => g.node(u).dummy);
        }
      }
      function addConflict(conflicts, v, w) {
        if (v > w) {
          let tmp = v;
          v = w;
          w = tmp;
        }
        let conflictsV = conflicts[v];
        if (!conflictsV) {
          conflicts[v] = conflictsV = {};
        }
        conflictsV[w] = true;
      }
      function hasConflict(conflicts, v, w) {
        if (v > w) {
          let tmp = v;
          v = w;
          w = tmp;
        }
        return !!conflicts[v] && Object.hasOwn(conflicts[v], w);
      }
      function verticalAlignment(g, layering, conflicts, neighborFn) {
        let root = {}, align = {}, pos = {};
        layering.forEach((layer) => {
          layer.forEach((v, order) => {
            root[v] = v;
            align[v] = v;
            pos[v] = order;
          });
        });
        layering.forEach((layer) => {
          let prevIdx = -1;
          layer.forEach((v) => {
            let ws = neighborFn(v);
            if (ws.length) {
              ws = ws.sort((a, b) => pos[a] - pos[b]);
              let mp = (ws.length - 1) / 2;
              for (let i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
                let w = ws[i];
                if (align[v] === v && prevIdx < pos[w] && !hasConflict(conflicts, v, w)) {
                  align[w] = v;
                  align[v] = root[v] = root[w];
                  prevIdx = pos[w];
                }
              }
            }
          });
        });
        return { root, align };
      }
      function horizontalCompaction(g, layering, root, align, reverseSep) {
        let xs = {}, blockG = buildBlockGraph(g, layering, root, reverseSep), borderType = reverseSep ? "borderLeft" : "borderRight";
        function iterate(setXsFunc, nextNodesFunc) {
          const stack = blockG.nodes().slice();
          const visited = {};
          let elem = stack.pop();
          while (elem) {
            if (visited[elem]) {
              setXsFunc(elem);
            } else {
              visited[elem] = true;
              stack.push(elem);
              for (const nextElem of nextNodesFunc(elem)) {
                stack.push(nextElem);
              }
            }
            elem = stack.pop();
          }
        }
        function pass1(elem) {
          xs[elem] = blockG.inEdges(elem).reduce((acc, e) => {
            return Math.max(acc, xs[e.v] + blockG.edge(e));
          }, 0);
        }
        function pass2(elem) {
          let min = blockG.outEdges(elem).reduce((acc, e) => {
            return Math.min(acc, xs[e.w] - blockG.edge(e));
          }, Number.POSITIVE_INFINITY);
          let node = g.node(elem);
          if (min !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
            xs[elem] = Math.max(xs[elem], min);
          }
        }
        iterate(pass1, blockG.predecessors.bind(blockG));
        iterate(pass2, blockG.successors.bind(blockG));
        Object.keys(align).forEach((v) => xs[v] = xs[root[v]]);
        return xs;
      }
      function buildBlockGraph(g, layering, root, reverseSep) {
        let blockGraph = new Graph(), graphLabel = g.graph(), sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);
        layering.forEach((layer) => {
          let u;
          layer.forEach((v) => {
            let vRoot = root[v];
            blockGraph.setNode(vRoot);
            if (u) {
              var uRoot = root[u], prevMax = blockGraph.edge(uRoot, vRoot);
              blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
            }
            u = v;
          });
        });
        return blockGraph;
      }
      function findSmallestWidthAlignment(g, xss) {
        return Object.values(xss).reduce((currentMinAndXs, xs) => {
          let max = Number.NEGATIVE_INFINITY;
          let min = Number.POSITIVE_INFINITY;
          Object.entries(xs).forEach(([v, x]) => {
            let halfWidth = width(g, v) / 2;
            max = Math.max(x + halfWidth, max);
            min = Math.min(x - halfWidth, min);
          });
          const newMin = max - min;
          if (newMin < currentMinAndXs[0]) {
            currentMinAndXs = [newMin, xs];
          }
          return currentMinAndXs;
        }, [Number.POSITIVE_INFINITY, null])[1];
      }
      function alignCoordinates(xss, alignTo) {
        let alignToVals = Object.values(alignTo), alignToMin = util.applyWithChunking(Math.min, alignToVals), alignToMax = util.applyWithChunking(Math.max, alignToVals);
        ["u", "d"].forEach((vert) => {
          ["l", "r"].forEach((horiz) => {
            let alignment = vert + horiz, xs = xss[alignment];
            if (xs === alignTo) return;
            let xsVals = Object.values(xs);
            let delta = alignToMin - util.applyWithChunking(Math.min, xsVals);
            if (horiz !== "l") {
              delta = alignToMax - util.applyWithChunking(Math.max, xsVals);
            }
            if (delta) {
              xss[alignment] = util.mapValues(xs, (x) => x + delta);
            }
          });
        });
      }
      function balance(xss, align) {
        return util.mapValues(xss.ul, (num, v) => {
          if (align) {
            return xss[align.toLowerCase()][v];
          } else {
            let xs = Object.values(xss).map((xs2) => xs2[v]).sort((a, b) => a - b);
            return (xs[1] + xs[2]) / 2;
          }
        });
      }
      function positionX(g) {
        let layering = util.buildLayerMatrix(g);
        let conflicts = Object.assign(
          findType1Conflicts(g, layering),
          findType2Conflicts(g, layering)
        );
        let xss = {};
        let adjustedLayering;
        ["u", "d"].forEach((vert) => {
          adjustedLayering = vert === "u" ? layering : Object.values(layering).reverse();
          ["l", "r"].forEach((horiz) => {
            if (horiz === "r") {
              adjustedLayering = adjustedLayering.map((inner) => {
                return Object.values(inner).reverse();
              });
            }
            let neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
            let align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn);
            let xs = horizontalCompaction(
              g,
              adjustedLayering,
              align.root,
              align.align,
              horiz === "r"
            );
            if (horiz === "r") {
              xs = util.mapValues(xs, (x) => -x);
            }
            xss[vert + horiz] = xs;
          });
        });
        let smallestWidth = findSmallestWidthAlignment(g, xss);
        alignCoordinates(xss, smallestWidth);
        return balance(xss, g.graph().align);
      }
      function sep(nodeSep, edgeSep, reverseSep) {
        return (g, v, w) => {
          let vLabel = g.node(v);
          let wLabel = g.node(w);
          let sum = 0;
          let delta;
          sum += vLabel.width / 2;
          if (Object.hasOwn(vLabel, "labelpos")) {
            switch (vLabel.labelpos.toLowerCase()) {
              case "l":
                delta = -vLabel.width / 2;
                break;
              case "r":
                delta = vLabel.width / 2;
                break;
            }
          }
          if (delta) {
            sum += reverseSep ? delta : -delta;
          }
          delta = 0;
          sum += (vLabel.dummy ? edgeSep : nodeSep) / 2;
          sum += (wLabel.dummy ? edgeSep : nodeSep) / 2;
          sum += wLabel.width / 2;
          if (Object.hasOwn(wLabel, "labelpos")) {
            switch (wLabel.labelpos.toLowerCase()) {
              case "l":
                delta = wLabel.width / 2;
                break;
              case "r":
                delta = -wLabel.width / 2;
                break;
            }
          }
          if (delta) {
            sum += reverseSep ? delta : -delta;
          }
          delta = 0;
          return sum;
        };
      }
      function width(g, v) {
        return g.node(v).width;
      }
    }
  });

  // lib/position/index.js
  var require_position = __commonJS({
    "lib/position/index.js"(exports, module) {
      "use strict";
      var util = require_util();
      var positionX = require_bk().positionX;
      module.exports = position;
      function position(g) {
        g = util.asNonCompoundGraph(g);
        positionY(g);
        Object.entries(positionX(g)).forEach(([v, x]) => g.node(v).x = x);
      }
      function positionY(g) {
        let layering = util.buildLayerMatrix(g);
        let rankSep = g.graph().ranksep;
        let rankAlign = g.graph().rankalign;
        let prevY = 0;
        layering.forEach((layer) => {
          const maxHeight = layer.reduce((acc, v) => {
            const height = g.node(v).height;
            if (acc > height) {
              return acc;
            } else {
              return height;
            }
          }, 0);
          layer.forEach((v) => {
            let node = g.node(v);
            if (rankAlign === "top") {
              node.y = prevY + node.height / 2;
            } else if (rankAlign === "bottom") {
              node.y = prevY + maxHeight - node.height / 2;
            } else {
              node.y = prevY + maxHeight / 2;
            }
          });
          prevY += maxHeight + rankSep;
        });
      }
    }
  });

  // lib/layout.js
  var require_layout = __commonJS({
    "lib/layout.js"(exports, module) {
      "use strict";
      var acyclic = require_acyclic();
      var normalize = require_normalize();
      var rank = require_rank();
      var normalizeRanks = require_util().normalizeRanks;
      var parentDummyChains = require_parent_dummy_chains();
      var removeEmptyRanks = require_util().removeEmptyRanks;
      var nestingGraph = require_nesting_graph();
      var addBorderSegments = require_add_border_segments();
      var coordinateSystem = require_coordinate_system();
      var order = require_order();
      var position = require_position();
      var util = require_util();
      var Graph = require_graphlib_cjs().Graph;
      module.exports = layout;
      function layout(g, opts = {}) {
        const time = opts.debugTiming ? util.time : util.notime;
        return time("layout", () => {
          let layoutGraph = time("  buildLayoutGraph", () => buildLayoutGraph(g));
          time("  runLayout", () => runLayout(layoutGraph, time, opts));
          time("  updateInputGraph", () => updateInputGraph(g, layoutGraph));
          return layoutGraph;
        });
      }
      function runLayout(g, time, opts) {
        time("    makeSpaceForEdgeLabels", () => makeSpaceForEdgeLabels(g));
        time("    removeSelfEdges", () => removeSelfEdges(g));
        time("    acyclic", () => acyclic.run(g));
        time("    nestingGraph.run", () => nestingGraph.run(g));
        time("    rank", () => rank(util.asNonCompoundGraph(g)));
        time("    injectEdgeLabelProxies", () => injectEdgeLabelProxies(g));
        time("    removeEmptyRanks", () => removeEmptyRanks(g));
        time("    nestingGraph.cleanup", () => nestingGraph.cleanup(g));
        time("    normalizeRanks", () => normalizeRanks(g));
        time("    assignRankMinMax", () => assignRankMinMax(g));
        time("    removeEdgeLabelProxies", () => removeEdgeLabelProxies(g));
        time("    normalize.run", () => normalize.run(g));
        time("    parentDummyChains", () => parentDummyChains(g));
        time("    addBorderSegments", () => addBorderSegments(g));
        time("    order", () => order(g, opts));
        time("    insertSelfEdges", () => insertSelfEdges(g));
        time("    adjustCoordinateSystem", () => coordinateSystem.adjust(g));
        time("    position", () => position(g));
        time("    positionSelfEdges", () => positionSelfEdges(g));
        time("    removeBorderNodes", () => removeBorderNodes(g));
        time("    normalize.undo", () => normalize.undo(g));
        time("    fixupEdgeLabelCoords", () => fixupEdgeLabelCoords(g));
        time("    undoCoordinateSystem", () => coordinateSystem.undo(g));
        time("    translateGraph", () => translateGraph(g));
        time("    assignNodeIntersects", () => assignNodeIntersects(g));
        time("    reversePoints", () => reversePointsForReversedEdges(g));
        time("    acyclic.undo", () => acyclic.undo(g));
      }
      function updateInputGraph(inputGraph, layoutGraph) {
        inputGraph.nodes().forEach((v) => {
          let inputLabel = inputGraph.node(v);
          let layoutLabel = layoutGraph.node(v);
          if (inputLabel) {
            inputLabel.x = layoutLabel.x;
            inputLabel.y = layoutLabel.y;
            inputLabel.order = layoutLabel.order;
            inputLabel.rank = layoutLabel.rank;
            if (layoutGraph.children(v).length) {
              inputLabel.width = layoutLabel.width;
              inputLabel.height = layoutLabel.height;
            }
          }
        });
        inputGraph.edges().forEach((e) => {
          let inputLabel = inputGraph.edge(e);
          let layoutLabel = layoutGraph.edge(e);
          inputLabel.points = layoutLabel.points;
          if (Object.hasOwn(layoutLabel, "x")) {
            inputLabel.x = layoutLabel.x;
            inputLabel.y = layoutLabel.y;
          }
        });
        inputGraph.graph().width = layoutGraph.graph().width;
        inputGraph.graph().height = layoutGraph.graph().height;
      }
      var graphNumAttrs = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"];
      var graphDefaults = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb", rankalign: "center" };
      var graphAttrs = ["acyclicer", "ranker", "rankdir", "align", "rankalign"];
      var nodeNumAttrs = ["width", "height", "rank"];
      var nodeDefaults = { width: 0, height: 0 };
      var edgeNumAttrs = ["minlen", "weight", "width", "height", "labeloffset"];
      var edgeDefaults = {
        minlen: 1,
        weight: 1,
        width: 0,
        height: 0,
        labeloffset: 10,
        labelpos: "r"
      };
      var edgeAttrs = ["labelpos"];
      function buildLayoutGraph(inputGraph) {
        let g = new Graph({ multigraph: true, compound: true });
        let graph = canonicalize(inputGraph.graph());
        g.setGraph(Object.assign(
          {},
          graphDefaults,
          selectNumberAttrs(graph, graphNumAttrs),
          util.pick(graph, graphAttrs)
        ));
        inputGraph.nodes().forEach((v) => {
          let node = canonicalize(inputGraph.node(v));
          const newNode = selectNumberAttrs(node, nodeNumAttrs);
          Object.keys(nodeDefaults).forEach((k) => {
            if (newNode[k] === void 0) {
              newNode[k] = nodeDefaults[k];
            }
          });
          g.setNode(v, newNode);
          g.setParent(v, inputGraph.parent(v));
        });
        inputGraph.edges().forEach((e) => {
          let edge = canonicalize(inputGraph.edge(e));
          g.setEdge(e, Object.assign(
            {},
            edgeDefaults,
            selectNumberAttrs(edge, edgeNumAttrs),
            util.pick(edge, edgeAttrs)
          ));
        });
        return g;
      }
      function makeSpaceForEdgeLabels(g) {
        let graph = g.graph();
        graph.ranksep /= 2;
        g.edges().forEach((e) => {
          let edge = g.edge(e);
          edge.minlen *= 2;
          if (edge.labelpos.toLowerCase() !== "c") {
            if (graph.rankdir === "TB" || graph.rankdir === "BT") {
              edge.width += edge.labeloffset;
            } else {
              edge.height += edge.labeloffset;
            }
          }
        });
      }
      function injectEdgeLabelProxies(g) {
        g.edges().forEach((e) => {
          let edge = g.edge(e);
          if (edge.width && edge.height) {
            let v = g.node(e.v);
            let w = g.node(e.w);
            let label = { rank: (w.rank - v.rank) / 2 + v.rank, e };
            util.addDummyNode(g, "edge-proxy", label, "_ep");
          }
        });
      }
      function assignRankMinMax(g) {
        let maxRank = 0;
        g.nodes().forEach((v) => {
          let node = g.node(v);
          if (node.borderTop) {
            node.minRank = g.node(node.borderTop).rank;
            node.maxRank = g.node(node.borderBottom).rank;
            maxRank = Math.max(maxRank, node.maxRank);
          }
        });
        g.graph().maxRank = maxRank;
      }
      function removeEdgeLabelProxies(g) {
        g.nodes().forEach((v) => {
          let node = g.node(v);
          if (node.dummy === "edge-proxy") {
            g.edge(node.e).labelRank = node.rank;
            g.removeNode(v);
          }
        });
      }
      function translateGraph(g) {
        let minX = Number.POSITIVE_INFINITY;
        let maxX = 0;
        let minY = Number.POSITIVE_INFINITY;
        let maxY = 0;
        let graphLabel = g.graph();
        let marginX = graphLabel.marginx || 0;
        let marginY = graphLabel.marginy || 0;
        function getExtremes(attrs) {
          let x = attrs.x;
          let y = attrs.y;
          let w = attrs.width;
          let h = attrs.height;
          minX = Math.min(minX, x - w / 2);
          maxX = Math.max(maxX, x + w / 2);
          minY = Math.min(minY, y - h / 2);
          maxY = Math.max(maxY, y + h / 2);
        }
        g.nodes().forEach((v) => getExtremes(g.node(v)));
        g.edges().forEach((e) => {
          let edge = g.edge(e);
          if (Object.hasOwn(edge, "x")) {
            getExtremes(edge);
          }
        });
        minX -= marginX;
        minY -= marginY;
        g.nodes().forEach((v) => {
          let node = g.node(v);
          node.x -= minX;
          node.y -= minY;
        });
        g.edges().forEach((e) => {
          let edge = g.edge(e);
          edge.points.forEach((p) => {
            p.x -= minX;
            p.y -= minY;
          });
          if (Object.hasOwn(edge, "x")) {
            edge.x -= minX;
          }
          if (Object.hasOwn(edge, "y")) {
            edge.y -= minY;
          }
        });
        graphLabel.width = maxX - minX + marginX;
        graphLabel.height = maxY - minY + marginY;
      }
      function assignNodeIntersects(g) {
        g.edges().forEach((e) => {
          let edge = g.edge(e);
          let nodeV = g.node(e.v);
          let nodeW = g.node(e.w);
          let p1, p2;
          if (!edge.points) {
            edge.points = [];
            p1 = nodeW;
            p2 = nodeV;
          } else {
            p1 = edge.points[0];
            p2 = edge.points[edge.points.length - 1];
          }
          edge.points.unshift(util.intersectRect(nodeV, p1));
          edge.points.push(util.intersectRect(nodeW, p2));
        });
      }
      function fixupEdgeLabelCoords(g) {
        g.edges().forEach((e) => {
          let edge = g.edge(e);
          if (Object.hasOwn(edge, "x")) {
            if (edge.labelpos === "l" || edge.labelpos === "r") {
              edge.width -= edge.labeloffset;
            }
            switch (edge.labelpos) {
              case "l":
                edge.x -= edge.width / 2 + edge.labeloffset;
                break;
              case "r":
                edge.x += edge.width / 2 + edge.labeloffset;
                break;
            }
          }
        });
      }
      function reversePointsForReversedEdges(g) {
        g.edges().forEach((e) => {
          let edge = g.edge(e);
          if (edge.reversed) {
            edge.points.reverse();
          }
        });
      }
      function removeBorderNodes(g) {
        g.nodes().forEach((v) => {
          if (g.children(v).length) {
            let node = g.node(v);
            let t = g.node(node.borderTop);
            let b = g.node(node.borderBottom);
            let l = g.node(node.borderLeft[node.borderLeft.length - 1]);
            let r = g.node(node.borderRight[node.borderRight.length - 1]);
            node.width = Math.abs(r.x - l.x);
            node.height = Math.abs(b.y - t.y);
            node.x = l.x + node.width / 2;
            node.y = t.y + node.height / 2;
          }
        });
        g.nodes().forEach((v) => {
          if (g.node(v).dummy === "border") {
            g.removeNode(v);
          }
        });
      }
      function removeSelfEdges(g) {
        g.edges().forEach((e) => {
          if (e.v === e.w) {
            var node = g.node(e.v);
            if (!node.selfEdges) {
              node.selfEdges = [];
            }
            node.selfEdges.push({ e, label: g.edge(e) });
            g.removeEdge(e);
          }
        });
      }
      function insertSelfEdges(g) {
        var layers = util.buildLayerMatrix(g);
        layers.forEach((layer) => {
          var orderShift = 0;
          layer.forEach((v, i) => {
            var node = g.node(v);
            node.order = i + orderShift;
            (node.selfEdges || []).forEach((selfEdge) => {
              util.addDummyNode(g, "selfedge", {
                width: selfEdge.label.width,
                height: selfEdge.label.height,
                rank: node.rank,
                order: i + ++orderShift,
                e: selfEdge.e,
                label: selfEdge.label
              }, "_se");
            });
            delete node.selfEdges;
          });
        });
      }
      function positionSelfEdges(g) {
        g.nodes().forEach((v) => {
          var node = g.node(v);
          if (node.dummy === "selfedge") {
            var selfNode = g.node(node.e.v);
            var x = selfNode.x + selfNode.width / 2;
            var y = selfNode.y;
            var dx = node.x - x;
            var dy = selfNode.height / 2;
            g.setEdge(node.e, node.label);
            g.removeNode(v);
            node.label.points = [
              { x: x + 2 * dx / 3, y: y - dy },
              { x: x + 5 * dx / 6, y: y - dy },
              { x: x + dx, y },
              { x: x + 5 * dx / 6, y: y + dy },
              { x: x + 2 * dx / 3, y: y + dy }
            ];
            node.label.x = node.x;
            node.label.y = node.y;
          }
        });
      }
      function selectNumberAttrs(obj, attrs) {
        return util.mapValues(util.pick(obj, attrs), Number);
      }
      function canonicalize(attrs) {
        var newAttrs = {};
        if (attrs) {
          Object.entries(attrs).forEach(([k, v]) => {
            if (typeof k === "string") {
              k = k.toLowerCase();
            }
            newAttrs[k] = v;
          });
        }
        return newAttrs;
      }
    }
  });

  // lib/debug.js
  var require_debug = __commonJS({
    "lib/debug.js"(exports, module) {
      var util = require_util();
      var Graph = require_graphlib_cjs().Graph;
      module.exports = {
        debugOrdering
      };
      function debugOrdering(g) {
        let layerMatrix = util.buildLayerMatrix(g);
        let h = new Graph({ compound: true, multigraph: true }).setGraph({});
        g.nodes().forEach((v) => {
          h.setNode(v, { label: v });
          h.setParent(v, "layer" + g.node(v).rank);
        });
        g.edges().forEach((e) => h.setEdge(e.v, e.w, {}, e.name));
        layerMatrix.forEach((layer, i) => {
          let layerV = "layer" + i;
          h.setNode(layerV, { rank: "same" });
          layer.reduce((u, v) => {
            h.setEdge(u, v, { style: "invis" });
            return v;
          });
        });
        return h;
      }
    }
  });

  // lib/version.js
  var require_version = __commonJS({
    "lib/version.js"(exports, module) {
      module.exports = "2.0.5-pre";
    }
  });

  // index.js
  var require_index = __commonJS({
    "index.js"(exports, module) {
      module.exports = {
        graphlib: require_graphlib_cjs(),
        layout: require_layout(),
        debug: require_debug(),
        util: {
          time: require_util().time,
          notime: require_util().notime
        },
        version: require_version()
      };
    }
  });
  return require_index();
})();
/*! For license information please see dagre.js.LEGAL.txt */
//# sourceMappingURL=dagre.js.map
