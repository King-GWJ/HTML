!function (n) {
    var e = {};

    function t(r) {
        if (e[r]) return e[r].exports;
        var o = e[r] = {i: r, l: !1, exports: {}};
        return n[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }

    t.m = n, t.c = e, t.d = function (n, e, r) {
        t.o(n, e) || Object.defineProperty(n, e, {enumerable: !0, get: r})
    }, t.r = function (n) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(n, "__esModule", {value: !0})
    }, t.t = function (n, e) {
        if (1 & e && (n = t(n)), 8 & e) return n;
        if (4 & e && "object" == typeof n && n && n.__esModule) return n;
        var r = Object.create(null);
        if (t.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: n
        }), 2 & e && "string" != typeof n) for (var o in n) t.d(r, o, function (e) {
            return n[e]
        }.bind(null, o));
        return r
    }, t.n = function (n) {
        var e = n && n.__esModule ? function () {
            return n.default
        } : function () {
            return n
        };
        return t.d(e, "a", e), e
    }, t.o = function (n, e) {
        return Object.prototype.hasOwnProperty.call(n, e)
    }, t.p = "", t(t.s = 93)
}([function (n, e, t) {
    "use strict";
    var r = t(10), o = t(18);
    r({target: "RegExp", proto: !0, forced: /./.exec !== o}, {exec: o})
}, function (n, e) {
    n.exports = function (n) {
        try {
            return !!n()
        } catch (n) {
            return !0
        }
    }
}, function (n, e, t) {
    (function (e) {
        var t = function (n) {
            return n && n.Math == Math && n
        };
        n.exports = t("object" == typeof globalThis && globalThis) || t("object" == typeof window && window) || t("object" == typeof self && self) || t("object" == typeof e && e) || Function("return this")()
    }).call(this, t(58))
}, function (n, e, t) {
    var r = t(34), o = t(15), i = t(84);
    r || o(Object.prototype, "toString", i, {unsafe: !0})
}, function (n, e, t) {
    var r = t(6);
    n.exports = function (n) {
        if (!r(n)) throw TypeError(String(n) + " is not an object");
        return n
    }
}, function (n, e, t) {
    var r = t(2), o = t(41), i = t(9), a = t(42), c = t(51), u = t(73), s = o("wks"), f = r.Symbol,
        l = u ? f : f && f.withoutSetter || a;
    n.exports = function (n) {
        return i(s, n) || (c && i(f, n) ? s[n] = f[n] : s[n] = l("Symbol." + n)), s[n]
    }
}, function (n, e) {
    n.exports = function (n) {
        return "object" == typeof n ? null !== n : "function" == typeof n
    }
}, function (n, e, t) {
    var r = t(1);
    n.exports = !r((function () {
        return 7 != Object.defineProperty({}, 1, {
            get: function () {
                return 7
            }
        })[1]
    }))
}, function (n, e) {
    n.exports = function (n) {
        if (null == n) throw TypeError("Can't call method on " + n);
        return n
    }
}, function (n, e) {
    var t = {}.hasOwnProperty;
    n.exports = function (n, e) {
        return t.call(n, e)
    }
}, function (n, e, t) {
    var r = t(2), o = t(36).f, i = t(11), a = t(15), c = t(27), u = t(64), s = t(48);
    n.exports = function (n, e) {
        var t, f, l, p, v, d = n.target, g = n.global, h = n.stat;
        if (t = g ? r : h ? r[d] || c(d, {}) : (r[d] || {}).prototype) for (f in e) {
            if (p = e[f], l = n.noTargetGet ? (v = o(t, f)) && v.value : t[f], !s(g ? f : d + (h ? "." : "#") + f, n.forced) && void 0 !== l) {
                if (typeof p == typeof l) continue;
                u(p, l)
            }
            (n.sham || l && l.sham) && i(p, "sham", !0), a(t, f, p, n)
        }
    }
}, function (n, e, t) {
    var r = t(7), o = t(14), i = t(24);
    n.exports = r ? function (n, e, t) {
        return o.f(n, e, i(1, t))
    } : function (n, e, t) {
        return n[e] = t, n
    }
}, function (n, e, t) {
    var r = t(17), o = Math.min;
    n.exports = function (n) {
        return n > 0 ? o(r(n), 9007199254740991) : 0
    }
}, function (n, e) {
    var t = {}.toString;
    n.exports = function (n) {
        return t.call(n).slice(8, -1)
    }
}, function (n, e, t) {
    var r = t(7), o = t(37), i = t(4), a = t(26), c = Object.defineProperty;
    e.f = r ? c : function (n, e, t) {
        if (i(n), e = a(e, !0), i(t), o) try {
            return c(n, e, t)
        } catch (n) {
        }
        if ("get" in t || "set" in t) throw TypeError("Accessors not supported");
        return "value" in t && (n[e] = t.value), n
    }
}, function (n, e, t) {
    var r = t(2), o = t(11), i = t(9), a = t(27), c = t(38), u = t(40), s = u.get, f = u.enforce,
        l = String(String).split("String");
    (n.exports = function (n, e, t, c) {
        var u = !!c && !!c.unsafe, s = !!c && !!c.enumerable, p = !!c && !!c.noTargetGet;
        "function" == typeof t && ("string" != typeof e || i(t, "name") || o(t, "name", e), f(t).source = l.join("string" == typeof e ? e : "")), n !== r ? (u ? !p && n[e] && (s = !0) : delete n[e], s ? n[e] = t : o(n, e, t)) : s ? n[e] = t : a(e, t)
    })(Function.prototype, "toString", (function () {
        return "function" == typeof this && s(this).source || c(this)
    }))
}, function (n, e, t) {
    var r = t(25), o = t(8);
    n.exports = function (n) {
        return r(o(n))
    }
}, function (n, e) {
    var t = Math.ceil, r = Math.floor;
    n.exports = function (n) {
        return isNaN(n = +n) ? 0 : (n > 0 ? r : t)(n)
    }
}, function (n, e, t) {
    "use strict";
    var r, o, i = t(30), a = t(52), c = RegExp.prototype.exec, u = String.prototype.replace, s = c,
        f = (r = /a/, o = /b*/g, c.call(r, "a"), c.call(o, "a"), 0 !== r.lastIndex || 0 !== o.lastIndex),
        l = a.UNSUPPORTED_Y || a.BROKEN_CARET, p = void 0 !== /()??/.exec("")[1];
    (f || p || l) && (s = function (n) {
        var e, t, r, o, a = this, s = l && a.sticky, v = i.call(a), d = a.source, g = 0, h = n;
        return s && (-1 === (v = v.replace("y", "")).indexOf("g") && (v += "g"), h = String(n).slice(a.lastIndex), a.lastIndex > 0 && (!a.multiline || a.multiline && "\n" !== n[a.lastIndex - 1]) && (d = "(?: " + d + ")", h = " " + h, g++), t = new RegExp("^(?:" + d + ")", v)), p && (t = new RegExp("^" + d + "$(?!\\s)", v)), f && (e = a.lastIndex), r = c.call(s ? t : a, h), s ? r ? (r.input = r.input.slice(g), r[0] = r[0].slice(g), r.index = a.lastIndex, a.lastIndex += r[0].length) : a.lastIndex = 0 : f && r && (a.lastIndex = a.global ? r.index + r[0].length : e), p && r && r.length > 1 && u.call(r[0], t, (function () {
            for (o = 1; o < arguments.length - 2; o++) void 0 === arguments[o] && (r[o] = void 0)
        })), r
    }), n.exports = s
}, function (n, e, t) {
    "use strict";
    t(0);
    var r = t(15), o = t(1), i = t(5), a = t(18), c = t(11), u = i("species"), s = !o((function () {
            var n = /./;
            return n.exec = function () {
                var n = [];
                return n.groups = {a: "7"}, n
            }, "7" !== "".replace(n, "$<a>")
        })), f = "$0" === "a".replace(/./, "$0"), l = i("replace"), p = !!/./[l] && "" === /./[l]("a", "$0"),
        v = !o((function () {
            var n = /(?:)/, e = n.exec;
            n.exec = function () {
                return e.apply(this, arguments)
            };
            var t = "ab".split(n);
            return 2 !== t.length || "a" !== t[0] || "b" !== t[1]
        }));
    n.exports = function (n, e, t, l) {
        var d = i(n), g = !o((function () {
            var e = {};
            return e[d] = function () {
                return 7
            }, 7 != ""[n](e)
        })), h = g && !o((function () {
            var e = !1, t = /a/;
            return "split" === n && ((t = {}).constructor = {}, t.constructor[u] = function () {
                return t
            }, t.flags = "", t[d] = /./[d]), t.exec = function () {
                return e = !0, null
            }, t[d](""), !e
        }));
        if (!g || !h || "replace" === n && (!s || !f || p) || "split" === n && !v) {
            var m = /./[d], y = t(d, ""[n], (function (n, e, t, r, o) {
                return e.exec === a ? g && !o ? {done: !0, value: m.call(e, t, r)} : {
                    done: !0,
                    value: n.call(t, e, r)
                } : {done: !1}
            }), {REPLACE_KEEPS_$0: f, REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: p}), x = y[0], w = y[1];
            r(String.prototype, n, x), r(RegExp.prototype, d, 2 == e ? function (n, e) {
                return w.call(n, this, e)
            } : function (n) {
                return w.call(n, this)
            })
        }
        l && c(RegExp.prototype[d], "sham", !0)
    }
}, function (n, e, t) {
    var r = t(13), o = t(18);
    n.exports = function (n, e) {
        var t = n.exec;
        if ("function" == typeof t) {
            var i = t.call(n, e);
            if ("object" != typeof i) throw TypeError("RegExp exec method returned something other than an Object or null");
            return i
        }
        if ("RegExp" !== r(n)) throw TypeError("RegExp#exec called on incompatible receiver");
        return o.call(n, e)
    }
}, function (n, e, t) {
    var r = t(8);
    n.exports = function (n) {
        return Object(r(n))
    }
}, function (n, e, t) {
    var r = t(10), o = t(21), i = t(83);
    r({
        target: "Object", stat: !0, forced: t(1)((function () {
            i(1)
        }))
    }, {
        keys: function (n) {
            return i(o(n))
        }
    })
}, function (n, e, t) {
    "use strict";
    var r = t(10), o = t(46).indexOf, i = t(29), a = t(49), c = [].indexOf, u = !!c && 1 / [1].indexOf(1, -0) < 0,
        s = i("indexOf"), f = a("indexOf", {ACCESSORS: !0, 1: 0});
    r({target: "Array", proto: !0, forced: u || !s || !f}, {
        indexOf: function (n) {
            return u ? c.apply(this, arguments) || 0 : o(this, n, arguments.length > 1 ? arguments[1] : void 0)
        }
    })
}, function (n, e) {
    n.exports = function (n, e) {
        return {enumerable: !(1 & n), configurable: !(2 & n), writable: !(4 & n), value: e}
    }
}, function (n, e, t) {
    var r = t(1), o = t(13), i = "".split;
    n.exports = r((function () {
        return !Object("z").propertyIsEnumerable(0)
    })) ? function (n) {
        return "String" == o(n) ? i.call(n, "") : Object(n)
    } : Object
}, function (n, e, t) {
    var r = t(6);
    n.exports = function (n, e) {
        if (!r(n)) return n;
        var t, o;
        if (e && "function" == typeof (t = n.toString) && !r(o = t.call(n))) return o;
        if ("function" == typeof (t = n.valueOf) && !r(o = t.call(n))) return o;
        if (!e && "function" == typeof (t = n.toString) && !r(o = t.call(n))) return o;
        throw TypeError("Can't convert object to primitive value")
    }
}, function (n, e, t) {
    var r = t(2), o = t(11);
    n.exports = function (n, e) {
        try {
            o(r, n, e)
        } catch (t) {
            r[n] = e
        }
        return e
    }
}, function (n, e, t) {
    var r = t(66), o = t(2), i = function (n) {
        return "function" == typeof n ? n : void 0
    };
    n.exports = function (n, e) {
        return arguments.length < 2 ? i(r[n]) || i(o[n]) : r[n] && r[n][e] || o[n] && o[n][e]
    }
}, function (n, e, t) {
    "use strict";
    var r = t(1);
    n.exports = function (n, e) {
        var t = [][n];
        return !!t && r((function () {
            t.call(null, e || function () {
                throw 1
            }, 1)
        }))
    }
}, function (n, e, t) {
    "use strict";
    var r = t(4);
    n.exports = function () {
        var n = r(this), e = "";
        return n.global && (e += "g"), n.ignoreCase && (e += "i"), n.multiline && (e += "m"), n.dotAll && (e += "s"), n.unicode && (e += "u"), n.sticky && (e += "y"), e
    }
}, function (n, e, t) {
    "use strict";
    var r = t(15), o = t(4), i = t(1), a = t(30), c = RegExp.prototype, u = c.toString, s = i((function () {
        return "/a/b" != u.call({source: "a", flags: "b"})
    })), f = "toString" != u.name;
    (s || f) && r(RegExp.prototype, "toString", (function () {
        var n = o(this), e = String(n.source), t = n.flags;
        return "/" + e + "/" + String(void 0 === t && n instanceof RegExp && !("flags" in c) ? a.call(n) : t)
    }), {unsafe: !0})
}, function (n, e, t) {
    "use strict";
    var r = t(76).charAt;
    n.exports = function (n, e, t) {
        return e + (t ? r(n, e).length : 1)
    }
}, function (n, e, t) {
    "use strict";
    var r = t(10), o = t(54);
    r({target: "Array", proto: !0, forced: [].forEach != o}, {forEach: o})
}, function (n, e, t) {
    var r = {};
    r[t(5)("toStringTag")] = "z", n.exports = "[object z]" === String(r)
}, function (n, e, t) {
    var r = t(2), o = t(88), i = t(54), a = t(11);
    for (var c in o) {
        var u = r[c], s = u && u.prototype;
        if (s && s.forEach !== i) try {
            a(s, "forEach", i)
        } catch (n) {
            s.forEach = i
        }
    }
}, function (n, e, t) {
    var r = t(7), o = t(59), i = t(24), a = t(16), c = t(26), u = t(9), s = t(37), f = Object.getOwnPropertyDescriptor;
    e.f = r ? f : function (n, e) {
        if (n = a(n), e = c(e, !0), s) try {
            return f(n, e)
        } catch (n) {
        }
        if (u(n, e)) return i(!o.f.call(n, e), n[e])
    }
}, function (n, e, t) {
    var r = t(7), o = t(1), i = t(60);
    n.exports = !r && !o((function () {
        return 7 != Object.defineProperty(i("div"), "a", {
            get: function () {
                return 7
            }
        }).a
    }))
}, function (n, e, t) {
    var r = t(39), o = Function.toString;
    "function" != typeof r.inspectSource && (r.inspectSource = function (n) {
        return o.call(n)
    }), n.exports = r.inspectSource
}, function (n, e, t) {
    var r = t(2), o = t(27), i = r["__core-js_shared__"] || o("__core-js_shared__", {});
    n.exports = i
}, function (n, e, t) {
    var r, o, i, a = t(61), c = t(2), u = t(6), s = t(11), f = t(9), l = t(62), p = t(43), v = c.WeakMap;
    if (a) {
        var d = new v, g = d.get, h = d.has, m = d.set;
        r = function (n, e) {
            return m.call(d, n, e), e
        }, o = function (n) {
            return g.call(d, n) || {}
        }, i = function (n) {
            return h.call(d, n)
        }
    } else {
        var y = l("state");
        p[y] = !0, r = function (n, e) {
            return s(n, y, e), e
        }, o = function (n) {
            return f(n, y) ? n[y] : {}
        }, i = function (n) {
            return f(n, y)
        }
    }
    n.exports = {
        set: r, get: o, has: i, enforce: function (n) {
            return i(n) ? o(n) : r(n, {})
        }, getterFor: function (n) {
            return function (e) {
                var t;
                if (!u(e) || (t = o(e)).type !== n) throw TypeError("Incompatible receiver, " + n + " required");
                return t
            }
        }
    }
}, function (n, e, t) {
    var r = t(63), o = t(39);
    (n.exports = function (n, e) {
        return o[n] || (o[n] = void 0 !== e ? e : {})
    })("versions", []).push({
        version: "3.6.5",
        mode: r ? "pure" : "global",
        copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
    })
}, function (n, e) {
    var t = 0, r = Math.random();
    n.exports = function (n) {
        return "Symbol(" + String(void 0 === n ? "" : n) + ")_" + (++t + r).toString(36)
    }
}, function (n, e) {
    n.exports = {}
}, function (n, e, t) {
    var r = t(45), o = t(47).concat("length", "prototype");
    e.f = Object.getOwnPropertyNames || function (n) {
        return r(n, o)
    }
}, function (n, e, t) {
    var r = t(9), o = t(16), i = t(46).indexOf, a = t(43);
    n.exports = function (n, e) {
        var t, c = o(n), u = 0, s = [];
        for (t in c) !r(a, t) && r(c, t) && s.push(t);
        for (; e.length > u;) r(c, t = e[u++]) && (~i(s, t) || s.push(t));
        return s
    }
}, function (n, e, t) {
    var r = t(16), o = t(12), i = t(67), a = function (n) {
        return function (e, t, a) {
            var c, u = r(e), s = o(u.length), f = i(a, s);
            if (n && t != t) {
                for (; s > f;) if ((c = u[f++]) != c) return !0
            } else for (; s > f; f++) if ((n || f in u) && u[f] === t) return n || f || 0;
            return !n && -1
        }
    };
    n.exports = {includes: a(!0), indexOf: a(!1)}
}, function (n, e) {
    n.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
}, function (n, e, t) {
    var r = t(1), o = /#|\.prototype\./, i = function (n, e) {
        var t = c[a(n)];
        return t == s || t != u && ("function" == typeof e ? r(e) : !!e)
    }, a = i.normalize = function (n) {
        return String(n).replace(o, ".").toLowerCase()
    }, c = i.data = {}, u = i.NATIVE = "N", s = i.POLYFILL = "P";
    n.exports = i
}, function (n, e, t) {
    var r = t(7), o = t(1), i = t(9), a = Object.defineProperty, c = {}, u = function (n) {
        throw n
    };
    n.exports = function (n, e) {
        if (i(c, n)) return c[n];
        e || (e = {});
        var t = [][n], s = !!i(e, "ACCESSORS") && e.ACCESSORS, f = i(e, 0) ? e[0] : u, l = i(e, 1) ? e[1] : void 0;
        return c[n] = !!t && !o((function () {
            if (s && !r) return !0;
            var n = {length: -1};
            s ? a(n, 1, {enumerable: !0, get: u}) : n[1] = 1, t.call(n, f, l)
        }))
    }
}, function (n, e, t) {
    var r = t(6), o = t(13), i = t(5)("match");
    n.exports = function (n) {
        var e;
        return r(n) && (void 0 !== (e = n[i]) ? !!e : "RegExp" == o(n))
    }
}, function (n, e, t) {
    var r = t(1);
    n.exports = !!Object.getOwnPropertySymbols && !r((function () {
        return !String(Symbol())
    }))
}, function (n, e, t) {
    "use strict";
    var r = t(1);

    function o(n, e) {
        return RegExp(n, e)
    }

    e.UNSUPPORTED_Y = r((function () {
        var n = o("a", "y");
        return n.lastIndex = 2, null != n.exec("abcd")
    })), e.BROKEN_CARET = r((function () {
        var n = o("^r", "gy");
        return n.lastIndex = 2, null != n.exec("str")
    }))
}, function (n, e) {
    n.exports = function (n) {
        if ("function" != typeof n) throw TypeError(String(n) + " is not a function");
        return n
    }
}, function (n, e, t) {
    "use strict";
    var r = t(80).forEach, o = t(29), i = t(49), a = o("forEach"), c = i("forEach");
    n.exports = a && c ? [].forEach : function (n) {
        return r(this, n, arguments.length > 1 ? arguments[1] : void 0)
    }
}, function (n, e, t) {
    var r = t(6), o = t(56), i = t(5)("species");
    n.exports = function (n, e) {
        var t;
        return o(n) && ("function" != typeof (t = n.constructor) || t !== Array && !o(t.prototype) ? r(t) && null === (t = t[i]) && (t = void 0) : t = void 0), new (void 0 === t ? Array : t)(0 === e ? 0 : e)
    }
}, function (n, e, t) {
    var r = t(13);
    n.exports = Array.isArray || function (n) {
        return "Array" == r(n)
    }
}, function (n, e, t) {
    var r, o, i = t(2), a = t(92), c = i.process, u = c && c.versions, s = u && u.v8;
    s ? o = (r = s.split("."))[0] + r[1] : a && (!(r = a.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = a.match(/Chrome\/(\d+)/)) && (o = r[1]), n.exports = o && +o
}, function (n, e) {
    var t;
    t = function () {
        return this
    }();
    try {
        t = t || new Function("return this")()
    } catch (n) {
        "object" == typeof window && (t = window)
    }
    n.exports = t
}, function (n, e, t) {
    "use strict";
    var r = {}.propertyIsEnumerable, o = Object.getOwnPropertyDescriptor, i = o && !r.call({1: 2}, 1);
    e.f = i ? function (n) {
        var e = o(this, n);
        return !!e && e.enumerable
    } : r
}, function (n, e, t) {
    var r = t(2), o = t(6), i = r.document, a = o(i) && o(i.createElement);
    n.exports = function (n) {
        return a ? i.createElement(n) : {}
    }
}, function (n, e, t) {
    var r = t(2), o = t(38), i = r.WeakMap;
    n.exports = "function" == typeof i && /native code/.test(o(i))
}, function (n, e, t) {
    var r = t(41), o = t(42), i = r("keys");
    n.exports = function (n) {
        return i[n] || (i[n] = o(n))
    }
}, function (n, e) {
    n.exports = !1
}, function (n, e, t) {
    var r = t(9), o = t(65), i = t(36), a = t(14);
    n.exports = function (n, e) {
        for (var t = o(e), c = a.f, u = i.f, s = 0; s < t.length; s++) {
            var f = t[s];
            r(n, f) || c(n, f, u(e, f))
        }
    }
}, function (n, e, t) {
    var r = t(28), o = t(44), i = t(68), a = t(4);
    n.exports = r("Reflect", "ownKeys") || function (n) {
        var e = o.f(a(n)), t = i.f;
        return t ? e.concat(t(n)) : e
    }
}, function (n, e, t) {
    var r = t(2);
    n.exports = r
}, function (n, e, t) {
    var r = t(17), o = Math.max, i = Math.min;
    n.exports = function (n, e) {
        var t = r(n);
        return t < 0 ? o(t + e, 0) : i(t, e)
    }
}, function (n, e) {
    e.f = Object.getOwnPropertySymbols
}, function (n, e, t) {
    var r = t(7), o = t(2), i = t(48), a = t(70), c = t(14).f, u = t(44).f, s = t(50), f = t(30), l = t(52), p = t(15),
        v = t(1), d = t(40).set, g = t(74), h = t(5)("match"), m = o.RegExp, y = m.prototype, x = /a/g, w = /a/g,
        S = new m(x) !== x, b = l.UNSUPPORTED_Y;
    if (r && i("RegExp", !S || b || v((function () {
        return w[h] = !1, m(x) != x || m(w) == w || "/a/i" != m(x, "i")
    })))) {
        for (var E = function (n, e) {
            var t, r = this instanceof E, o = s(n), i = void 0 === e;
            if (!r && o && n.constructor === E && i) return n;
            S ? o && !i && (n = n.source) : n instanceof E && (i && (e = f.call(n)), n = n.source), b && (t = !!e && e.indexOf("y") > -1) && (e = e.replace(/y/g, ""));
            var c = a(S ? new m(n, e) : m(n, e), r ? this : y, E);
            return b && t && d(c, {sticky: t}), c
        }, O = function (n) {
            n in E || c(E, n, {
                configurable: !0, get: function () {
                    return m[n]
                }, set: function (e) {
                    m[n] = e
                }
            })
        }, I = u(m), k = 0; I.length > k;) O(I[k++]);
        y.constructor = E, E.prototype = y, p(o, "RegExp", E)
    }
    g("RegExp")
}, function (n, e, t) {
    var r = t(6), o = t(71);
    n.exports = function (n, e, t) {
        var i, a;
        return o && "function" == typeof (i = e.constructor) && i !== t && r(a = i.prototype) && a !== t.prototype && o(n, a), n
    }
}, function (n, e, t) {
    var r = t(4), o = t(72);
    n.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
        var n, e = !1, t = {};
        try {
            (n = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(t, []), e = t instanceof Array
        } catch (n) {
        }
        return function (t, i) {
            return r(t), o(i), e ? n.call(t, i) : t.__proto__ = i, t
        }
    }() : void 0)
}, function (n, e, t) {
    var r = t(6);
    n.exports = function (n) {
        if (!r(n) && null !== n) throw TypeError("Can't set " + String(n) + " as a prototype");
        return n
    }
}, function (n, e, t) {
    var r = t(51);
    n.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator
}, function (n, e, t) {
    "use strict";
    var r = t(28), o = t(14), i = t(5), a = t(7), c = i("species");
    n.exports = function (n) {
        var e = r(n), t = o.f;
        a && e && !e[c] && t(e, c, {
            configurable: !0, get: function () {
                return this
            }
        })
    }
}, function (n, e, t) {
    "use strict";
    var r = t(19), o = t(4), i = t(12), a = t(8), c = t(32), u = t(20);
    r("match", 1, (function (n, e, t) {
        return [function (e) {
            var t = a(this), r = null == e ? void 0 : e[n];
            return void 0 !== r ? r.call(e, t) : new RegExp(e)[n](String(t))
        }, function (n) {
            var r = t(e, n, this);
            if (r.done) return r.value;
            var a = o(n), s = String(this);
            if (!a.global) return u(a, s);
            var f = a.unicode;
            a.lastIndex = 0;
            for (var l, p = [], v = 0; null !== (l = u(a, s));) {
                var d = String(l[0]);
                p[v] = d, "" === d && (a.lastIndex = c(s, i(a.lastIndex), f)), v++
            }
            return 0 === v ? null : p
        }]
    }))
}, function (n, e, t) {
    var r = t(17), o = t(8), i = function (n) {
        return function (e, t) {
            var i, a, c = String(o(e)), u = r(t), s = c.length;
            return u < 0 || u >= s ? n ? "" : void 0 : (i = c.charCodeAt(u)) < 55296 || i > 56319 || u + 1 === s || (a = c.charCodeAt(u + 1)) < 56320 || a > 57343 ? n ? c.charAt(u) : i : n ? c.slice(u, u + 2) : a - 56320 + (i - 55296 << 10) + 65536
        }
    };
    n.exports = {codeAt: i(!1), charAt: i(!0)}
}, function (n, e, t) {
    "use strict";
    var r = t(19), o = t(4), i = t(21), a = t(12), c = t(17), u = t(8), s = t(32), f = t(20), l = Math.max,
        p = Math.min, v = Math.floor, d = /\$([$&'`]|\d\d?|<[^>]*>)/g, g = /\$([$&'`]|\d\d?)/g;
    r("replace", 2, (function (n, e, t, r) {
        var h = r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE, m = r.REPLACE_KEEPS_$0, y = h ? "$" : "$0";
        return [function (t, r) {
            var o = u(this), i = null == t ? void 0 : t[n];
            return void 0 !== i ? i.call(t, o, r) : e.call(String(o), t, r)
        }, function (n, r) {
            if (!h && m || "string" == typeof r && -1 === r.indexOf(y)) {
                var i = t(e, n, this, r);
                if (i.done) return i.value
            }
            var u = o(n), v = String(this), d = "function" == typeof r;
            d || (r = String(r));
            var g = u.global;
            if (g) {
                var w = u.unicode;
                u.lastIndex = 0
            }
            for (var S = []; ;) {
                var b = f(u, v);
                if (null === b) break;
                if (S.push(b), !g) break;
                "" === String(b[0]) && (u.lastIndex = s(v, a(u.lastIndex), w))
            }
            for (var E, O = "", I = 0, k = 0; k < S.length; k++) {
                b = S[k];
                for (var P = String(b[0]), A = l(p(c(b.index), v.length), 0), T = [], C = 1; C < b.length; C++) T.push(void 0 === (E = b[C]) ? E : String(E));
                var N = b.groups;
                if (d) {
                    var M = [P].concat(T, A, v);
                    void 0 !== N && M.push(N);
                    var j = String(r.apply(void 0, M))
                } else j = x(P, v, A, T, N, r);
                A >= I && (O += v.slice(I, A) + j, I = A + P.length)
            }
            return O + v.slice(I)
        }];

        function x(n, t, r, o, a, c) {
            var u = r + n.length, s = o.length, f = g;
            return void 0 !== a && (a = i(a), f = d), e.call(c, f, (function (e, i) {
                var c;
                switch (i.charAt(0)) {
                    case"$":
                        return "$";
                    case"&":
                        return n;
                    case"`":
                        return t.slice(0, r);
                    case"'":
                        return t.slice(u);
                    case"<":
                        c = a[i.slice(1, -1)];
                        break;
                    default:
                        var f = +i;
                        if (0 === f) return e;
                        if (f > s) {
                            var l = v(f / 10);
                            return 0 === l ? e : l <= s ? void 0 === o[l - 1] ? i.charAt(1) : o[l - 1] + i.charAt(1) : e
                        }
                        c = o[f - 1]
                }
                return void 0 === c ? "" : c
            }))
        }
    }))
}, function (n, e, t) {
    "use strict";
    var r = t(19), o = t(50), i = t(4), a = t(8), c = t(79), u = t(32), s = t(12), f = t(20), l = t(18), p = t(1),
        v = [].push, d = Math.min, g = !p((function () {
            return !RegExp(4294967295, "y")
        }));
    r("split", 2, (function (n, e, t) {
        var r;
        return r = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function (n, t) {
            var r = String(a(this)), i = void 0 === t ? 4294967295 : t >>> 0;
            if (0 === i) return [];
            if (void 0 === n) return [r];
            if (!o(n)) return e.call(r, n, i);
            for (var c, u, s, f = [], p = (n.ignoreCase ? "i" : "") + (n.multiline ? "m" : "") + (n.unicode ? "u" : "") + (n.sticky ? "y" : ""), d = 0, g = new RegExp(n.source, p + "g"); (c = l.call(g, r)) && !((u = g.lastIndex) > d && (f.push(r.slice(d, c.index)), c.length > 1 && c.index < r.length && v.apply(f, c.slice(1)), s = c[0].length, d = u, f.length >= i));) g.lastIndex === c.index && g.lastIndex++;
            return d === r.length ? !s && g.test("") || f.push("") : f.push(r.slice(d)), f.length > i ? f.slice(0, i) : f
        } : "0".split(void 0, 0).length ? function (n, t) {
            return void 0 === n && 0 === t ? [] : e.call(this, n, t)
        } : e, [function (e, t) {
            var o = a(this), i = null == e ? void 0 : e[n];
            return void 0 !== i ? i.call(e, o, t) : r.call(String(o), e, t)
        }, function (n, o) {
            var a = t(r, n, this, o, r !== e);
            if (a.done) return a.value;
            var l = i(n), p = String(this), v = c(l, RegExp), h = l.unicode,
                m = (l.ignoreCase ? "i" : "") + (l.multiline ? "m" : "") + (l.unicode ? "u" : "") + (g ? "y" : "g"),
                y = new v(g ? l : "^(?:" + l.source + ")", m), x = void 0 === o ? 4294967295 : o >>> 0;
            if (0 === x) return [];
            if (0 === p.length) return null === f(y, p) ? [p] : [];
            for (var w = 0, S = 0, b = []; S < p.length;) {
                y.lastIndex = g ? S : 0;
                var E, O = f(y, g ? p : p.slice(S));
                if (null === O || (E = d(s(y.lastIndex + (g ? 0 : S)), p.length)) === w) S = u(p, S, h); else {
                    if (b.push(p.slice(w, S)), b.length === x) return b;
                    for (var I = 1; I <= O.length - 1; I++) if (b.push(O[I]), b.length === x) return b;
                    S = w = E
                }
            }
            return b.push(p.slice(w)), b
        }]
    }), !g)
}, function (n, e, t) {
    var r = t(4), o = t(53), i = t(5)("species");
    n.exports = function (n, e) {
        var t, a = r(n).constructor;
        return void 0 === a || null == (t = r(a)[i]) ? e : o(t)
    }
}, function (n, e, t) {
    var r = t(81), o = t(25), i = t(21), a = t(12), c = t(55), u = [].push, s = function (n) {
        var e = 1 == n, t = 2 == n, s = 3 == n, f = 4 == n, l = 6 == n, p = 5 == n || l;
        return function (v, d, g, h) {
            for (var m, y, x = i(v), w = o(x), S = r(d, g, 3), b = a(w.length), E = 0, O = h || c, I = e ? O(v, b) : t ? O(v, 0) : void 0; b > E; E++) if ((p || E in w) && (y = S(m = w[E], E, x), n)) if (e) I[E] = y; else if (y) switch (n) {
                case 3:
                    return !0;
                case 5:
                    return m;
                case 6:
                    return E;
                case 2:
                    u.call(I, m)
            } else if (f) return !1;
            return l ? -1 : s || f ? f : I
        }
    };
    n.exports = {forEach: s(0), map: s(1), filter: s(2), some: s(3), every: s(4), find: s(5), findIndex: s(6)}
}, function (n, e, t) {
    var r = t(53);
    n.exports = function (n, e, t) {
        if (r(n), void 0 === e) return n;
        switch (t) {
            case 0:
                return function () {
                    return n.call(e)
                };
            case 1:
                return function (t) {
                    return n.call(e, t)
                };
            case 2:
                return function (t, r) {
                    return n.call(e, t, r)
                };
            case 3:
                return function (t, r, o) {
                    return n.call(e, t, r, o)
                }
        }
        return function () {
            return n.apply(e, arguments)
        }
    }
}, function (n, e, t) {
    "use strict";
    var r = t(10), o = t(25), i = t(16), a = t(29), c = [].join, u = o != Object, s = a("join", ",");
    r({target: "Array", proto: !0, forced: u || !s}, {
        join: function (n) {
            return c.call(i(this), void 0 === n ? "," : n)
        }
    })
}, function (n, e, t) {
    var r = t(45), o = t(47);
    n.exports = Object.keys || function (n) {
        return r(n, o)
    }
}, function (n, e, t) {
    "use strict";
    var r = t(34), o = t(85);
    n.exports = r ? {}.toString : function () {
        return "[object " + o(this) + "]"
    }
}, function (n, e, t) {
    var r = t(34), o = t(13), i = t(5)("toStringTag"), a = "Arguments" == o(function () {
        return arguments
    }());
    n.exports = r ? o : function (n) {
        var e, t, r;
        return void 0 === n ? "Undefined" : null === n ? "Null" : "string" == typeof (t = function (n, e) {
            try {
                return n[e]
            } catch (n) {
            }
        }(e = Object(n), i)) ? t : a ? o(e) : "Object" == (r = o(e)) && "function" == typeof e.callee ? "Arguments" : r
    }
}, function (n, e, t) {
    "use strict";
    var r = t(19), o = t(4), i = t(8), a = t(87), c = t(20);
    r("search", 1, (function (n, e, t) {
        return [function (e) {
            var t = i(this), r = null == e ? void 0 : e[n];
            return void 0 !== r ? r.call(e, t) : new RegExp(e)[n](String(t))
        }, function (n) {
            var r = t(e, n, this);
            if (r.done) return r.value;
            var i = o(n), u = String(this), s = i.lastIndex;
            a(s, 0) || (i.lastIndex = 0);
            var f = c(i, u);
            return a(i.lastIndex, s) || (i.lastIndex = s), null === f ? -1 : f.index
        }]
    }))
}, function (n, e) {
    n.exports = Object.is || function (n, e) {
        return n === e ? 0 !== n || 1 / n == 1 / e : n != n && e != e
    }
}, function (n, e) {
    n.exports = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
    }
}, function (n, e, t) {
    "use strict";
    var r = t(10), o = t(1), i = t(56), a = t(6), c = t(21), u = t(12), s = t(90), f = t(55), l = t(91), p = t(5),
        v = t(57), d = p("isConcatSpreadable"), g = v >= 51 || !o((function () {
            var n = [];
            return n[d] = !1, n.concat()[0] !== n
        })), h = l("concat"), m = function (n) {
            if (!a(n)) return !1;
            var e = n[d];
            return void 0 !== e ? !!e : i(n)
        };
    r({target: "Array", proto: !0, forced: !g || !h}, {
        concat: function (n) {
            var e, t, r, o, i, a = c(this), l = f(a, 0), p = 0;
            for (e = -1, r = arguments.length; e < r; e++) if (m(i = -1 === e ? a : arguments[e])) {
                if (p + (o = u(i.length)) > 9007199254740991) throw TypeError("Maximum allowed index exceeded");
                for (t = 0; t < o; t++, p++) t in i && s(l, p, i[t])
            } else {
                if (p >= 9007199254740991) throw TypeError("Maximum allowed index exceeded");
                s(l, p++, i)
            }
            return l.length = p, l
        }
    })
}, function (n, e, t) {
    "use strict";
    var r = t(26), o = t(14), i = t(24);
    n.exports = function (n, e, t) {
        var a = r(e);
        a in n ? o.f(n, a, i(0, t)) : n[a] = t
    }
}, function (n, e, t) {
    var r = t(1), o = t(5), i = t(57), a = o("species");
    n.exports = function (n) {
        return i >= 51 || !r((function () {
            var e = [];
            return (e.constructor = {})[a] = function () {
                return {foo: 1}
            }, 1 !== e[n](Boolean).foo
        }))
    }
}, function (n, e, t) {
    var r = t(28);
    n.exports = r("navigator", "userAgent") || ""
}, function (n, e, t) {
    "use strict";

    function r(n, e, t) {
        return e in n ? Object.defineProperty(n, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : n[e] = t, n
    }

    function o(n, e) {
        var t = Object.keys(n);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(n);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable
            }))), t.push.apply(t, r)
        }
        return t
    }

    function i(n) {
        for (var e = 1; e < arguments.length; e++) {
            var t = null != arguments[e] ? arguments[e] : {};
            e % 2 ? o(Object(t), !0).forEach((function (e) {
                r(n, e, t[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : o(Object(t)).forEach((function (e) {
                Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(t, e))
            }))
        }
        return n
    }

    t.r(e), t.d(e, "ms", (function () {
        return w
    }));
    t(23), t(69), t(0), t(31), t(75), t(77), t(78);
    var a = {
        isInApp: function () {
            return navigator.userAgent.indexOf("unicom") > -1
        }, isIOS: function () {
            var n = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            return n
        }, isAndroid: function () {
            var n = navigator.userAgent, e = n.indexOf("Android") > -1 || n.indexOf("Adr") > -1;
            return e
        }, appVersion: function () {
            var n = window.navigator.userAgent.match(/unicom{version:([^},]+)+/);
            if (n && n.length > 1) {
                var e = n[1];
                return e.split("@")[1]
            }
            return this.getCookieFromDocument("c_version").split("@")[1]
        }, getCookieFromDocument: function (n) {
            var e, t = new RegExp("(^| )" + n + "=([^;]*)(;|$)");
            if (e = document.cookie.match(t)) return unescape(e[2]);
            var r = document.URL;
            r = (r = r.substring(r.indexOf("?"))).replace(/#\//gi, "&").replace(/\?/gi, "&"), t = new RegExp("/".concat(n, "=([^&]+)($|[^&])/"));
            var o = r.match(t);
            return o ? unescape(o[2]) : null
        }
    }, c = (t(33), t(82), t(22), t(3), t(86), t(35), t(89), window.MsJSBridge = {
        MsUniqueId: 1, callbacks: {}, eventListenerStorage: {}, exec: function (n, e, t, r, o) {
            if (a.isInApp()) {
                !0 !== o && (o = !1);
                var i = "MsJSBridge-exec-接收参数：action:".concat(n, ",parameter:").concat(JSON.stringify(e), ",success:").concat(t, ",fail:").concat(r);
                console.debug(i);
                var u = {action: n, parameter: e, isKeepAlive: o}, s = {};
                if ("function" == typeof t && (s.success = t), "function" == typeof r && (s.fail = r), Object.keys(s).length) {
                    var f = c.getUniqueId();
                    c.callbacks[f] = s, u.callbackId = f
                }
                var l = JSON.stringify(u);
                a.isAndroid() ? AndroidMsJSBridge.exec(l) : a.isIOS() && window.webkit.messageHandlers.MsJSBridge.postMessage(l)
            } else r("端外不支持" + n + "方法调用！")
        }, execSync: function (n, e) {
            if (!n) return console.debug("调用同步方法传入的action为空"), null;
            var t = {action: n, parameter: e || ""}, r = JSON.stringify(t), o = "";
            if (!a.isInApp()) return "端外不支持（" + n + "）方法调用";
            if (o = a.isAndroid() ? AndroidMsJSBridge.execSync(r) : window.prompt(r, "MsJSBridge")) try {
                var i = decodeURIComponent(atob(o));
                return JSON.parse(i).data
            } catch (n) {
                console.error("MsJSBridge-receiveEventActionFromNative-报错：" + n)
            }
        }, callbackFromNative: function (n) {
            try {
                var e = decodeURIComponent(atob(n)), t = JSON.parse(e), r = c.callbacks[t.callbackId], o = t.parameter,
                    i = t.isKeepAlive;
                "success" == o.status && r.success ? r.success(o.data, i) : "fail" == o.status && r.fail && (i = !1, r.fail(o.data, i)), i || delete c.callbacks[t.callbackId]
            } catch (n) {
                console.error("MsJSBridge-callbackFromNative-报错：" + n)
            }
        }, addEventListener: function (n, e) {
            var t = this.eventListenerStorage[n];
            t || (t = {}, this.eventListenerStorage[n] = t), t[this.getUniqueId()] = e
        }, removeEventListener: function (n, e) {
            e || delete this.eventListenerStorage[n];
            var t = this.eventListenerStorage[n];
            t && delete t[n]
        }, receiveEventActionFromNative: function (n) {
            try {
                var e = decodeURIComponent(atob(n)), t = JSON.parse(e), r = t.action, o = t.parameter || "",
                    i = this.eventListenerStorage[r];
                if (!i) return;
                for (var a in i) {
                    var c = i[a];
                    c && c(o)
                }
            } catch (n) {
                console.error("MsJSBridge-receiveEventActionFromNative-报错：" + n)
            }
        }, getUniqueId: function () {
            return c.MsUniqueId++, "MsJSBridge_" + c.MsUniqueId.toString() + "_" + (new Date).getTime()
        }
    }), u = c;
    var s = [], f = [];

    function l(n, e) {
        return a.isInApp() ? new Promise((function (t, r) {
            u.exec(e, n, (function (n) {
                t(n)
            }), (function (n) {
                var e = new Error;
                e.data = JSON.parse(n), r(e)
            }))
        })) : new Promise((function (n, e) {
            var t = new Error;
            t.data = "端外暂不支持跳转方法调用。", e(t)
        }))
    }

    function p(n, e) {
        return new Promise((function (t, r) {
            u.exec(e, n, (function (n) {
                t(n)
            }), (function (n) {
                var e = new Error;
                e.data = JSON.parse(n), r(e)
            }))
        }))
    }

    var v = 0;

    function d() {
        setTimeout((function () {
            if (a.isInApp()) {
                var n = document.getElementsByTagName("html")[0].offsetHeight;
                if (n == v) return;
                v = n, u.exec("ListenWebViewHeight", {height: n})
            }
        }), 50)
    }

    var g = Document.title;
    window.clientGetJsTitle = function () {
        return g
    };
    var h = {
        setBounces: function (n) {
            a.isIOS() && u.exec("webViewAction", {bounces: n})
        }, setTitle: function (n) {
            g = n
        }
    };

    function m(n, e) {
        for (var t = 0; t < e.length; t++) {
            var r = e[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r)
        }
    }

    var y = function () {
        function n(e) {
            !function (n, e) {
                if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, n), this.initAttribute(e)
        }

        var e, t, r;
        return e = n, (t = [{
            key: "initAttribute", value: function (n) {
                this.mainTitle = n.mainTitle, this.pkgName = n.pkgName, this.downloadUrl = n.downloadUrl, this.totalLength = n.totalLength, this.readableTotalLength = n.readableTotalLength, this.totalOffset = n.totalOffset, this.readableTotalOffset = n.readableTotalOffset, this.speed = n.speed, this.taskStatus = n.taskStatus, this.errorMsg = n.errorMsg, this.remark = null
            }
        }, {
            key: "onTaskStart", value: function () {
            }
        }, {
            key: "onTaskEnd", value: function () {
            }
        }, {
            key: "onProgressUpdate", value: function () {
            }
        }, {
            key: "onError", value: function () {
            }
        }, {
            key: "startDownload", value: function () {
                var n = this;
                if (console.log("》》》开始下载", this), a.isInApp()) u.exec("gameDownloadTaskExecution", {
                    type: "startDownload",
                    originData: this
                }, (function (e) {
                    var t = e.data;
                    n.initAttribute(t), "taskStart" == e.action ? n.onTaskStart() : "progressUpdate" == e.action ? n.onProgressUpdate() : "taskEnd" == e.action && n.onTaskEnd()
                }), (function (e) {
                    var t = new Error;
                    t.data = e, n.onError(t)
                }), !0); else {
                    var e = new Error;
                    e.data = "端外不支持游戏分发接口调用", this.onError(e)
                }
            }
        }, {
            key: "stopDownload", value: function () {
                var n = this;
                return a.isInApp() ? (console.log("》》》停止下载", this), new Promise((function (e, t) {
                    u.exec("gameDownloadTaskExecution", {type: "stopDownload", originData: n}, (function () {
                        e()
                    }), (function (n) {
                        var e = new Error;
                        e.data = n, t(e)
                    }))
                }))) : new Promise((function (n, e) {
                    var t = new Error;
                    t.data = "端外不支持游戏分发接口调用", e(t)
                }))
            }
        }, {
            key: "delete", value: function () {
                var n = this;
                return a.isInApp() ? (console.log("》》》删除下载任务和文件", this), new Promise((function (e, t) {
                    u.exec("gameDownloadTaskExecution", {type: "delete", originData: n}, (function () {
                        e()
                    }), (function (n) {
                        var e = new Error;
                        e.data = n, t(e)
                    }))
                }))) : new Promise((function (n, e) {
                    var t = new Error;
                    t.data = "端外不支持游戏分发接口调用", e(t)
                }))
            }
        }, {
            key: "installGame", value: function (n) {
                var e = this;
                return a.isInApp ? new Promise((function (t, r) {
                    u.exec("gameDownloadTaskExecution", {
                        type: "installGame",
                        autoDeletePkg: n,
                        originData: e
                    }, (function () {
                        t()
                    }), (function (n) {
                        var e = new Error;
                        e.data = n, r(e)
                    }))
                })) : new Promise((function (n, e) {
                    var t = new Error;
                    t.data = "端外不支持游戏分发接口调用", e(t)
                }))
            }
        }, {
            key: "openGame", value: function () {
                var n = this;
                return a.isInApp ? new Promise((function (e, t) {
                    u.exec("gameDownloadTaskExecution", {type: "openGame", originData: n}, (function () {
                        e()
                    }), (function (n) {
                        var e = new Error;
                        e.data = n, t(e)
                    }))
                })) : new Promise((function (n, e) {
                    var t = new Error;
                    t.data = "端外不支持游戏分发接口调用", e(t)
                }))
            }
        }, {
            key: "isInstalled", value: function () {
                return !!a.isInApp && u.execSync("gameDownloadTaskExecution", {type: "isInstalled", originData: this})
            }
        }]) && m(e.prototype, t), r && m(e, r), n
    }();

    function x() {
        var n = this;
        this.resolve = null, this.reject = null, this.endBlock = null, this.successData = null, this.failData = null, this.isKeep = !0, this.then = function (e) {
            return n.resolve = e, n.successData && setTimeout((function () {
                n.resolve(n.successData)
            }), 0), n
        }, this.catch = function (e) {
            return n.reject = e, n.failData && setTimeout((function () {
                n.reject(n.failData)
            }), 0), n
        }, this.finally = function (e) {
            return n.endBlock = e, 0 == n.isKeep && setTimeout((function () {
                n.endBlock()
            }), 0), n
        }
    }

    var w = i(i({}, a), {}, {
        shake: function (n, e, t) {
            if (a.isInApp()) u.exec("shake", n, (function (n) {
                e(n)
            }), (function (n) {
                var e = new Error;
                e.data = n, t(e)
            }), !0); else {
                var r = new Error;
                r.data = "端外不支持调用shake方法", t(r)
            }
        }, request: function (n) {
            if (a.isInApp()) return new Promise((function (e, t) {
                u.exec("request", n, (function (n) {
                    e(n)
                }), (function (n) {
                    var e = new Error;
                    try {
                        e.data = JSON.parse(n)
                    } catch (t) {
                        console.log(t), e.data = n
                    }
                    t(e)
                }))
            }));
            var e = n.url, t = n.method, r = n.header, o = {};
            if ("post" == t) {
                var i = {};
                r && r["content-type"] && -1 != r["content-type"].indexOf("application/json") ? n.data && (i = JSON.stringify(i)) : n.data && (i = n.data), o = {
                    body: i,
                    cache: "no-cache",
                    credentials: "include",
                    headers: r,
                    method: "post",
                    mode: "cors"
                }
            } else {
                if (n.data) {
                    var c = [];
                    Object.keys(n.data).forEach((function (e) {
                        return c.push(e + "=" + n.data[e])
                    })), -1 === e.search(/\?/) ? e += "?" + c.join("&") : e += "&" + c.join("&")
                }
                o = {cache: "no-cache", credentials: "include", headers: r, method: "get", mode: "cors"}
            }
            return new Promise((function (n, t) {
                fetch(e, o).then((function (e) {
                    "200" == e.status && e.ok ? e.text().then((function (e) {
                        n(e)
                    })).catch((function (n) {
                        t(n)
                    })) : t(new Error(e.toString()))
                })).catch((function (n) {
                    t(n)
                }))
            }))
        }, getClientInfo: function () {
            return a.isInApp() ? new Promise((function (n, e) {
                if (a.appVersion() >= 8) u.exec("getClientInfo", {}, (function (e) {
                    n(e)
                }), (function (n) {
                    var t = new Error;
                    t.data = n, e(t)
                })); else if (s.push(n), f.push(e), window.setClientInfo = function (n) {
                    n.appVersion = n.clientVersion, n.iosPushToken = n.deviceId;
                    var e = n.deviceBrand;
                    n.deviceBrand = "iphone" == e ? "apple" : e, n.devicedId = n.deviceCode, n.isLogin = n.isLoginOn, n.ywCode = n.yw_code, n.provinceCode_2 = n.locateProvinceCode, n.cityCode_2 = n.locateCityCode;
                    var t = n.cookies;
                    if (t instanceof Array) for (var r = 0; r < t.length; r++) {
                        var o = t[r], i = Object.keys(o)[0];
                        if ("ecs_token" == i) {
                            n.ecs_token = o[i];
                            break
                        }
                    }
                    n ? s.forEach((function (e) {
                        e(n)
                    })) : f.forEach((function (n) {
                        n(null)
                    })), s = [], f = []
                }, a.isIOS()) {
                    var t = {type: "getClientInfo"};
                    setTimeout((function () {
                        window.location = encodeURI("clientAction=" + JSON.stringify(t))
                    }), 50)
                } else UnicomJSBrige.isAndroid() && window.setClientInfo(window.js_invoke.getClientInfoByJS())
            })) : new Promise((function (n, e) {
                var t = new Error;
                t.data = "端外暂不支持getClientInfo、getClientInfoSync方法。", e(t)
            }))
        }, isLoginSync: function () {
            return u.execSync("isLogin")
        }, isLogin: function () {
            return u.execSync("isLogin")
        }, onLogin: function () {
            return new Promise((function (n, e) {
                u.exec("onLogin", {}, (function (e) {
                    n(e)
                }), (function (n) {
                    var t = new Error;
                    try {
                        t.data = JSON.parse(n)
                    } catch (e) {
                        t.data = n
                    }
                    e(t)
                }))
            }))
        }, getClientInfoSync: function () {
            return u.execSync("getClientInfo")
        }, navigateTo: function (n) {
            var e = n.isNeedLogin;
            if (!0 !== e && (e = !1), !0 !== n.navigationBarHidden && (n.navigationBarHidden = !1), a.isInApp()) return l(n, "navigateTo");
            console.debug("端外界面跳转假如涉及到参数传递会拼接到url后面,同时不再做登陆判断");
            var t = n.params, r = n.target, o = "";
            if (t) for (var i in Object.keys(t)) {
                o = o + "&" + i + "=" + t[i]
            }
            -1 !== r.indexOf("?") ? r += o : r = r + "?" + o, window.location.href = r
        }, navigateGoBack: function (n) {
            return l(n, "navigateGoBack")
        }, navigateClose: function () {
            if (a.isInApp()) {
                var n = {type: "close"};
                a.isIOS() ? window.location = encodeURI("clientAction=" + JSON.stringify(n)) : window.js_invoke.interact(JSON.stringify(n))
            } else console.debug("端外不支持关闭方法调用！")
        }, navigateParams: function () {
            return l({}, "navigateParams")
        }, navigateBackParams: function () {
            var n = getMock("navigateBackParams");
            return n || l({}, "navigateBackParams")
        }, setStorage: function (n, e) {
            var t = {key: n, value: e};
            return a.isInApp() ? p(t, "setStorage") : new Promise((function (e) {
                window.localStorage.setItem(n, JSON.stringify(t)), e({key: n})
            }))
        }, getStorage: function (n) {
            return a.isInApp() ? p({key: n}, "getStorage") : new Promise((function (e) {
                var t = window.localStorage.getItem(n), r = JSON.parse(t);
                e(r ? r.value : "")
            }))
        }, getStorageAll: function (n) {
            return a.isInApp() ? p({keys: n}, "getStorageAll") : new Promise((function (e) {
                var t = {};
                n.forEach((function (n) {
                    var e = window.localStorage.getItem(n), r = JSON.parse(e);
                    t[n] = r ? r.value : ""
                })), e(t)
            }))
        }, deleteStorage: function (n) {
            return a.isInApp() ? p({key: n}, "deleteStorage") : new Promise((function (e) {
                window.localStorage.removeItem(n), e({key: n})
            }))
        }, deleteStorageAll: function (n) {
            return a.isInApp() ? p({keys: n}, "deleteStorageAll") : new Promise((function (e) {
                n.forEach((function (n) {
                    window.localStorage.removeItem(n)
                })), e(n)
            }))
        }, voiceRecognitionStart: function (n, e) {
            if (!a.isInApp()) return new Promise((function (n, e) {
                var t = new Error;
                t.data = "端外暂不支持语音识别方法调用", e(t)
            }));
            u.exec("voiceRecognition", {type: "start"}, (function (e) {
                n(e)
            }), (function (n) {
                var t = new Error;
                t.data = n, e(t)
            }), !0)
        }, voiceRecognitionEnd: function () {
            u.exec("voiceRecognition", {type: "end"})
        }, voiceRecognitionCancel: function () {
            u.exec("voiceRecognition", {type: "cancel"})
        }, getLocationInfo: function () {
            return a.isInApp() ? new Promise((function (n, e) {
                u.exec("getLocationInfo", {}, (function (e) {
                    n(e)
                }), (function (n) {
                    var t = new Error;
                    t.data = n, e(t)
                }))
            })) : new Promise((function (n, e) {
                var t = new Error;
                t.data = "端外暂不支持getLocationInfo方法。", e(t)
            }))
        }, onPageHidden: function (n) {
            u.addEventListener("onPageHidden", n)
        }, onPageShow: function (n) {
            u.addEventListener("onPageShow", n)
        }, onPageScrollToEnd: function (n, e) {
            a.isInApp() && !e ? u.addEventListener("pageScrollToEnd", n) : window.addEventListener("scroll", (function () {
                Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - function () {
                    var n = 0;
                    document.documentElement && document.documentElement.scrollTop ? n = document.documentElement.scrollTop : document.body && (n = document.body.scrollTop);
                    return n
                }() - function () {
                    var n = 0;
                    n = document.body.clientHeight && document.documentElement.clientHeight ? Math.min(document.body.clientHeight, document.documentElement.clientHeight) : Math.max(document.body.clientHeight, document.documentElement.clientHeight);
                    return n
                }() < 20 && n()
            }))
        }, onNetworkStatusChanged: function (n) {
            u.addEventListener("onNetworkStatusChanged", n)
        }, openSystemSetting: function () {
            u.exec("openSystemSetting")
        }, saveBase64Image: function (n) {
            var e = {type: "saveBase64Image", msg: n};
            setTimeout((function () {
                a.isIOS() ? alert("ios未实现该功能，请用其他方式保存图片。") : window.js_invoke.interact(JSON.stringify(e))
            }), 0)
        }, webView: h, getAllNavMenu: function () {
            return a.isInApp() ? new Promise((function (n, e) {
                u.exec("clientNavMenu", {type: "getAllNavMenu"}, (function (e) {
                    n(e)
                }), (function (n) {
                    var t = new Error;
                    t.data = JSON.parse(n), e(t)
                }))
            })) : new Promise((function (n, e) {
                var t = new Error;
                t.data = "端外暂不支持getAllNavMenu方法。", e(t)
            }))
        }, getChangYongNavMenu: function () {
            return a.isInApp() ? new Promise((function (n, e) {
                u.exec("clientNavMenu", {type: "getChangYongNavMenu"}, (function (e) {
                    n(e)
                }), (function (n) {
                    var t = new Error;
                    t.data = JSON.parse(n), e(t)
                }))
            })) : new Promise((function (n, e) {
                var t = new Error;
                t.data = "端外暂不支持getChangYongNavMenu方法。", e(t)
            }))
        }, getHomeCustomNavMenu: function () {
            return a.isInApp() ? new Promise((function (n, e) {
                u.exec("clientNavMenu", {type: "getHomeCustomNavMenu"}, (function (e) {
                    n(e)
                }), (function (n) {
                    var t = new Error;
                    t.data = JSON.parse(n), e(t)
                }))
            })) : new Promise((function (n, e) {
                var t = new Error;
                t.data = "端外暂不支持getHomeCustomNavMenu方法。", e(t)
            }))
        }, updateHomeCustomNavMenu: function (n) {
            return a.isInApp() ? new Promise((function (e, t) {
                u.exec("clientNavMenu", {type: "updateHomeCustomNavMenu", value: n}, (function (n) {
                    e(n)
                }), (function (n) {
                    var e = new Error;
                    e.data = JSON.parse(n), t(e)
                }))
            })) : new Promise((function (n, e) {
                var t = new Error;
                t.data = "端外暂不支持updateHomeCustomNavMenu方法。", e(t)
            }))
        }, getLanguageJson: function () {
            return a.isInApp() ? new Promise((function (n, e) {
                u.exec("clientNavMenu", {type: "getLanguageJson"}, (function (e) {
                    n(e)
                }), (function (n) {
                    var t = new Error;
                    t.data = JSON.parse(n), e(t)
                }))
            })) : new Promise((function (n, e) {
                var t = new Error;
                t.data = "端外暂不支持getLanguageJson方法。", e(t)
            }))
        }, showMsg: function (n) {
            if (a.isInApp()) return new Promise((function (e, t) {
                u.exec("alert", n, (function () {
                    e()
                }), (function () {
                    t()
                }))
            }));
            alert("端外模拟弹窗：" + n.msg)
        }, toast: function (n, e) {
            e || (e = 2e3), n || (n = "");
            var t = {msg: n, time: e};
            if (a.isInApp()) return new Promise((function (e, r) {
                n ? u.exec("toast", t, (function (n) {
                    e(n)
                }), (function (n) {
                    var e = new Error;
                    e.data = JSON.parse(n), r(e)
                })) : r()
            }));
            alert("端外模拟Toast：" + n)
        }, sentBodyHeightToNative: function () {
            window.sentBodyHeightToNativeOn = !0;
            var n = document.getElementsByTagName("html")[0];
            new MutationObserver(d).observe(n, {attributes: !0, childList: !0, subtree: !0}), d()
        }, getGameDownloadTask: function (n) {
            if (a.isInApp()) {
                var e = u.execSync("getGameDownloadTask", n), t = new y(e);
                return "RUNNING" == t.taskStatus && t.startDownload(), t
            }
            var r = new Error;
            return r.data = "端外不支持游戏分发接口调用", r
        }, GameDownloadTask: y, getNetworkType: function () {
            return function (n) {
                var e = n.mnc, t = "";
                switch (e) {
                    case 0:
                        t = "ChinaMobile";
                        break;
                    case 1:
                        t = "ChinaUnicom";
                        break;
                    case 2:
                        t = "ChinaMobile";
                        break;
                    case 3:
                        t = "ChinaTelecom";
                        break;
                    case 4:
                        t = "ChinaMobile";
                        break;
                    case 5:
                        t = "ChinaTelecom";
                        break;
                    case 6:
                        t = "ChinaUnicom";
                        break;
                    case 7:
                    case 8:
                        t = "ChinaMobile";
                        break;
                    case 9:
                    case 10:
                        t = "ChinaUnicom";
                        break;
                    case 11:
                    case 12:
                        t = "ChinaTelecom";
                        break;
                    case 13:
                        t = "ChinaMobile";
                        break;
                    default:
                        t = ""
                }
                return n.carrier = t, n
            }(u.execSync("getNetworkType"))
        }, ping: function (n) {
            if (!a.isInApp()) return new Promise((function (n, e) {
                var t = new Error;
                t.data = "端外暂不支持ping方法。", e(t)
            }));
            u.exec("ping", {host: n}, (function (n) {
                resolve(n)
            }), (function (n) {
                var e = new Error;
                e.data = n, reject(e)
            }))
        }, checkSystemPermission: function (n) {
            return a.isInApp() ? new Promise((function (e, t) {
                u.exec("systemPermission", {type: "checkSystemPermission", permission: n}, (function (n) {
                    e(n)
                }), (function (n) {
                    var e = new Error;
                    e.data = n, t(e)
                }))
            })) : new Promise((function (n, e) {
                var t = new Error;
                t.data = "端外暂不支持checkSystemPermission方法。", e(t)
            }))
        }, exec: function (n, e) {
            if (a.isInApp()) return new Promise((function (t, r) {
                u.exec(n, e, (function (n) {
                    t(n)
                }), (function (n) {
                    var e = new Error;
                    e.data = n, r(e)
                }), !1)
            }));
            alert("端外不支持方法：" + n)
        }, execSync: function (n, e) {
            return a.isInApp() ? u.execSync(n, e) : (alert("端外不支持方法：" + n), null)
        }, execKeep: function (n, e) {
            var t = new x;
            return u.exec(n, e, (function (n, e) {
                t.successData = n || "", t.resolve && t.resolve(n), 0 == e && t.endBlock && t.endBlock()
            }), (function (n, e) {
                var r = new Error;
                r.data = n, t.failData = r, t.reject && t.reject(r), 0 == e && t.endBlock && t.endBlock()
            }), !0), t
        }, execKeepSendMsg: function (n, e) {
            u.exec(n, e, null, null, !0)
        }, pageFontModel: function () {
            if (a.appVersion() >= 8.03) {
                var n = u.execSync("fontSizeModel");
                if ("string" == typeof n) return n
            }
            return "0"
        }, getLanguageInfo: function () {
            return a.isInApp() && a.appVersion() > 8.0603 ? u.execSync("getLanguageInfo") : ""
        }, addEventListener: function (n, e) {
            u.addEventListener(n, e)
        }
    });
    window.ms = w
}]);