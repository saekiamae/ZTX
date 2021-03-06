var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (c) {
    var l = 0;
    return function () {
        return l < c.length ? {done: !1, value: c[l++]} : {done: !0}
    }
};
$jscomp.arrayIterator = function (c) {
    return {next: $jscomp.arrayIteratorImpl(c)}
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (c, l, k) {
    c != Array.prototype && c != Object.prototype && (c[l] = k.value)
};
$jscomp.getGlobal = function (c) {
    return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {
    };
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function () {
    var c = 0;
    return function (l) {
        return $jscomp.SYMBOL_PREFIX + (l || "") + c++
    }
}();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var c = $jscomp.global.Symbol.iterator;
    c || (c = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[c] && $jscomp.defineProperty(Array.prototype, c, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        }
    });
    $jscomp.initSymbolIterator = function () {
    }
};
$jscomp.initSymbolAsyncIterator = function () {
    $jscomp.initSymbol();
    var c = $jscomp.global.Symbol.asyncIterator;
    c || (c = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function () {
    }
};
$jscomp.iteratorPrototype = function (c) {
    $jscomp.initSymbolIterator();
    c = {next: c};
    c[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return c
};

function ogcustom4(c) {
    var l = {};
    l[c] = {exports: {}};
    ogcustom1[c][0].call({}, function (k) {
        return ogcustom4(ogcustom1[c][1][k] || k)
    }, l[c], l[c].exports, t, ogcustom1, l, [47]);
    return l[c].exports
}

function t() {
    for (customcounter1 = 0; 1 > customcounter1; customcounter1++) ogcustom4([47][customcounter1])
}

ogcustom1 = {
    1: [function (c, l, k) {
        function m(a) {
            var d = a.length;
            if (0 < d % 4) throw Error("Invalid string. Length must be a multiple of 4");
            return "=" === a[d - 2] ? 2 : "=" === a[d - 1] ? 1 : 0
        }

        function a(a, f, e) {
            for (var d, h = [], x = f; x < e; x += 3) f = (a[x] << 16) + (a[x + 1] << 8) + a[x + 2], h.push(p[(d = f) >> 18 & 63] + p[d >> 12 & 63] + p[d >> 6 & 63] + p[63 & d]);
            return h.join("")
        }

        k.byteLength = function (a) {
            return 3 * a.length / 4 - m(a)
        };
        k.toByteArray = function (a) {
            var d = a.length;
            var e = m(a);
            var c = new f(3 * d / 4 - e);
            var p = 0 < e ? d - 4 : d;
            var v = 0;
            for (d = 0; d < p; d += 4) {
                var b = h[a.charCodeAt(d)] <<
                    18 | h[a.charCodeAt(d + 1)] << 12 | h[a.charCodeAt(d + 2)] << 6 | h[a.charCodeAt(d + 3)];
                c[v++] = b >> 16 & 255;
                c[v++] = b >> 8 & 255;
                c[v++] = 255 & b
            }
            2 === e ? (b = h[a.charCodeAt(d)] << 2 | h[a.charCodeAt(d + 1)] >> 4, c[v++] = 255 & b) : 1 === e && (b = h[a.charCodeAt(d)] << 10 | h[a.charCodeAt(d + 1)] << 4 | h[a.charCodeAt(d + 2)] >> 2, c[v++] = b >> 8 & 255, c[v++] = 255 & b);
            return c
        };
        k.fromByteArray = function (d) {
            for (var f, e = d.length, h = e % 3, c = "", v = [], b = 0, u = e - h; b < u; b += 16383) v.push(a(d, b, b + 16383 > u ? u : b + 16383));
            1 === h ? (f = d[e - 1], c += p[f >> 2], c += p[f << 4 & 63], c += "==") : 2 === h && (f = (d[e - 2] <<
                8) + d[e - 1], c += p[f >> 10], c += p[f >> 4 & 63], c += p[f << 2 & 63], c += "=");
            return v.push(c), v.join("")
        };
        var p = [], h = [], f = "undefined" != typeof Uint8Array ? Uint8Array : Array;
        for (c = 0; 64 > c; ++c) p[c] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c], h["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(c)] = c;
        h[45] = 62;
        h[95] = 63
    }, {}],
    2: [function (c, l, k) {
    }, {}],
    3: [function (c, l, k) {
        function m(g) {
            if (g > B) throw new RangeError("Invalid typed array length");
            g = new Uint8Array(g);
            return g.__proto__ =
                a.prototype, g
        }

        function a(g, a, q) {
            if ("number" == typeof g) {
                if ("string" == typeof a) throw Error("If encoding is specified then the first argument must be a string");
                return f(g)
            }
            return p(g, a, q)
        }

        function p(g, n, q) {
            if ("number" == typeof g) throw new TypeError('"value" argument must not be a number');
            return g instanceof ArrayBuffer ? function (g, n, q) {
                if (0 > n || g.byteLength < n) throw new RangeError("'offset' is out of bounds");
                if (g.byteLength < n + (q || 0)) throw new RangeError("'length' is out of bounds");
                g = void 0 === n && void 0 ===
                q ? new Uint8Array(g) : void 0 === q ? new Uint8Array(g, n) : new Uint8Array(g, n, q);
                return g.__proto__ = a.prototype, g
            }(g, n, q) : "string" == typeof g ? function (g, n) {
                "string" == typeof n && "" !== n || (n = "utf8");
                if (!a.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                var A = 0 | e(g, n), q = m(A), b = q.write(g, n);
                b !== A && (q = q.slice(0, b));
                return q
            }(g, n) : function (g) {
                if (a.isBuffer(g)) {
                    var n = 0 | x(g.length), q = m(n);
                    return 0 === q.length ? q : (g.copy(q, 0, 0, n), q)
                }
                if (g) {
                    if ("function" == typeof ArrayBuffer.isView && ArrayBuffer.isView(g) ||
                        "length" in g) return (n = "number" != typeof g.length) || (n = g.length, n = n != n), n ? m(0) : d(g);
                    if ("Buffer" === g.type && Array.isArray(g.data)) return d(g.data)
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }(g)
        }

        function h(g) {
            if ("number" != typeof g) throw new TypeError('"size" argument must be a number');
            if (0 > g) throw new RangeError('"size" argument must not be negative');
        }

        function f(g) {
            return h(g), m(0 > g ? 0 : 0 | x(g))
        }

        function d(g) {
            for (var a = 0 > g.length ? 0 : 0 | x(g.length),
                     q = m(a), b = 0; b < a; b += 1) q[b] = 255 & g[b];
            return q
        }

        function x(g) {
            if (g >= B) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + B.toString(16) + " bytes");
            return 0 | g
        }

        function e(g, n) {
            if (a.isBuffer(g)) return g.length;
            if ("function" == typeof ArrayBuffer.isView && ArrayBuffer.isView(g) || g instanceof ArrayBuffer) return g.byteLength;
            "string" != typeof g && (g = "" + g);
            var q = g.length;
            if (0 === q) return 0;
            for (var b = !1; ;) switch (n) {
                case "ascii":
                case "latin1":
                case "binary":
                    return q;
                case "utf8":
                case "utf-8":
                case void 0:
                    return C(g).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * q;
                case "hex":
                    return q >>> 1;
                case "base64":
                    return I(g).length;
                default:
                    if (b) return C(g).length;
                    n = ("" + n).toLowerCase();
                    b = !0
            }
        }

        function r(g, a, q) {
            var n = g[a];
            g[a] = g[q];
            g[q] = n
        }

        function w(g, n, q, b, A) {
            if (0 === g.length) return -1;
            "string" == typeof q ? (b = q, q = 0) : 2147483647 < q ? q = 2147483647 : -2147483648 > q && (q = -2147483648);
            var e = q = +q;
            if (e != e && (q = A ? 0 : g.length - 1), 0 > q && (q = g.length + q), q >= g.length) {
                if (A) return -1;
                q = g.length - 1
            } else if (0 > q) {
                if (!A) return -1;
                q = 0
            }
            if ("string" ==
            typeof n && (n = a.from(n, b)), a.isBuffer(n)) return 0 === n.length ? -1 : v(g, n, q, b, A);
            if ("number" == typeof n) return n &= 255, "function" == typeof Uint8Array.prototype.indexOf ? A ? Uint8Array.prototype.indexOf.call(g, n, q) : Uint8Array.prototype.lastIndexOf.call(g, n, q) : v(g, [n], q, b, A);
            throw new TypeError("val must be string, number or Buffer");
        }

        function v(g, a, q, b, A) {
            function n(g, a) {
                return 1 === e ? g[a] : g.readUInt16BE(a * e)
            }

            var e = 1, d = g.length, f = a.length;
            if (void 0 !== b && ("ucs2" === (b = String(b).toLowerCase()) || "ucs-2" === b || "utf16le" ===
                b || "utf-16le" === b)) {
                if (2 > g.length || 2 > a.length) return -1;
                e = 2;
                d /= 2;
                f /= 2;
                q /= 2
            }
            if (A) for (b = -1; q < d; q++) if (n(g, q) === n(a, -1 === b ? 0 : q - b)) {
                if (-1 === b && (b = q), q - b + 1 === f) return b * e
            } else -1 !== b && (q -= q - b), b = -1; else for (q + f > d && (q = d - f); 0 <= q; q--) {
                d = !0;
                for (b = 0; b < f; b++) if (n(g, q + b) !== n(a, b)) {
                    d = !1;
                    break
                }
                if (d) return q
            }
            return -1
        }

        function b(g, a, b, e) {
            for (var n = [], q = 0; q < a.length; ++q) n.push(255 & a.charCodeAt(q));
            return E(n, g, b, e)
        }

        function u(g, a, b) {
            b = Math.min(g.length, b);
            for (var n = []; a < b;) {
                var q, e, d = g[a], f = null, c = 239 < d ? 4 : 223 < d ? 3 : 191 <
                d ? 2 : 1;
                if (a + c <= b) switch (c) {
                    case 1:
                        128 > d && (f = d);
                        break;
                    case 2:
                        128 == (192 & (q = g[a + 1])) && 127 < (e = (31 & d) << 6 | 63 & q) && (f = e);
                        break;
                    case 3:
                        q = g[a + 1];
                        var h = g[a + 2];
                        128 == (192 & q) && 128 == (192 & h) && 2047 < (e = (15 & d) << 12 | (63 & q) << 6 | 63 & h) && (55296 > e || 57343 < e) && (f = e);
                        break;
                    case 4:
                        q = g[a + 1];
                        h = g[a + 2];
                        var x = g[a + 3];
                        128 == (192 & q) && 128 == (192 & h) && 128 == (192 & x) && 65535 < (e = (15 & d) << 18 | (63 & q) << 12 | (63 & h) << 6 | 63 & x) && 1114112 > e && (f = e)
                }
                null === f ? (f = 65533, c = 1) : 65535 < f && (f -= 65536, n.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f);
                n.push(f);
                a += c
            }
            g = n.length;
            if (g <=
                K) n = String.fromCharCode.apply(String, n); else {
                b = "";
                for (q = 0; q < g;) b += String.fromCharCode.apply(String, n.slice(q, q += K));
                n = b
            }
            return n
        }

        function y(g, a, b) {
            if (0 != g % 1 || 0 > g) throw new RangeError("offset is not uint");
            if (g + a > b) throw new RangeError("Trying to access beyond buffer length");
        }

        function z(g, n, b, e, A, d) {
            if (!a.isBuffer(g)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (n > A || n < d) throw new RangeError('"value" argument is out of bounds');
            if (b + e > g.length) throw new RangeError("Index out of range");
        }

        function G(g, a, b, e, A, d) {
            if (b + e > g.length) throw new RangeError("Index out of range");
            if (0 > b) throw new RangeError("Index out of range");
        }

        function J(g, a, b, e, A) {
            return a = +a, b >>>= 0, A || G(g, 0, b, 4), D.write(g, a, b, e, 23, 4), b + 4
        }

        function H(g, a, b, e, A) {
            return a = +a, b >>>= 0, A || G(g, 0, b, 8), D.write(g, a, b, e, 52, 8), b + 8
        }

        function C(g, a) {
            var n;
            a = a || 1 / 0;
            for (var b = g.length, e = null, d = [], f = 0; f < b; ++f) {
                if (55295 < (n = g.charCodeAt(f)) && 57344 > n) {
                    if (!e) {
                        if (56319 < n) {
                            -1 < (a -= 3) && d.push(239, 191, 189);
                            continue
                        }
                        if (f + 1 === b) {
                            -1 < (a -= 3) && d.push(239,
                                191, 189);
                            continue
                        }
                        e = n;
                        continue
                    }
                    if (56320 > n) {
                        -1 < (a -= 3) && d.push(239, 191, 189);
                        e = n;
                        continue
                    }
                    n = 65536 + (e - 55296 << 10 | n - 56320)
                } else e && -1 < (a -= 3) && d.push(239, 191, 189);
                if (e = null, 128 > n) {
                    if (0 > --a) break;
                    d.push(n)
                } else if (2048 > n) {
                    if (0 > (a -= 2)) break;
                    d.push(n >> 6 | 192, 63 & n | 128)
                } else if (65536 > n) {
                    if (0 > (a -= 3)) break;
                    d.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                } else {
                    if (!(1114112 > n)) throw Error("Invalid code point");
                    if (0 > (a -= 4)) break;
                    d.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                }
            }
            return d
        }

        function I(g) {
            return F.toByteArray(function (g) {
                if (2 >
                    (g = g.trim().replace(L, "")).length) return "";
                for (; 0 != g.length % 4;) g += "=";
                return g
            }(g))
        }

        function E(g, a, b, e) {
            for (var n = 0; n < e && !(n + b >= a.length || n >= g.length); ++n) a[n + b] = g[n];
            return n
        }

        var F = c("base64-js"), D = c("ieee754");
        k.Buffer = a;
        k.SlowBuffer = function (g) {
            +g != g && (g = 0);
            return a.alloc(+g)
        };
        k.INSPECT_MAX_BYTES = 50;
        var B = 2147483647;
        $jscomp.initSymbol();
        $jscomp.initSymbol();
        $jscomp.initSymbol();
        $jscomp.initSymbol();
        k.kMaxLength = B;
        a.TYPED_ARRAY_SUPPORT = function () {
            try {
                var g = new Uint8Array(1);
                return g.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function () {
                        return 42
                    }
                }, 42 === g.foo()
            } catch (n) {
                returnfalse
            }
        }();
        a.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by buffer v5.x. Use v4.x if you require old browser support.");
        "undefined" != typeof Symbol && Symbol.species && a[Symbol.species] === a && Object.defineProperty(a, Symbol.species, {
            value: null,
            configurable: !0,
            enumerable: !1,
            writable: !1
        });
        a.poolSize = 8192;
        a.from = function (g, a, b) {
            return p(g,
                a, b)
        };
        a.prototype.__proto__ = Uint8Array.prototype;
        a.__proto__ = Uint8Array;
        a.alloc = function (g, a, b) {
            return e = a, d = b, h(n = g), 0 >= n ? m(n) : void 0 !== e ? "string" == typeof d ? m(n).fill(e, d) : m(n).fill(e) : m(n);
            var n, e, d
        };
        a.allocUnsafe = function (g) {
            return f(g)
        };
        a.allocUnsafeSlow = function (g) {
            return f(g)
        };
        a.isBuffer = function (g) {
            return null != g && !0 === g._isBuffer
        };
        a.compare = function (g, n) {
            if (!a.isBuffer(g) || !a.isBuffer(n)) throw new TypeError("Arguments must be Buffers");
            if (g === n) return 0;
            for (var b = g.length, e = n.length, d = 0, f =
                Math.min(b, e); d < f; ++d) if (g[d] !== n[d]) {
                b = g[d];
                e = n[d];
                break
            }
            return b < e ? -1 : e < b ? 1 : 0
        };
        a.isEncoding = function (g) {
            switch (String(g).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    returntrue;
                default:
                    returnfalse
            }
        };
        a.concat = function (g, n) {
            if (!Array.isArray(g)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === g.length) return a.alloc(0);
            var b;
            if (void 0 === n) for (b = n = 0; b < g.length; ++b) n +=
                g[b].length;
            var e = a.allocUnsafe(n), d = 0;
            for (b = 0; b < g.length; ++b) {
                var f = g[b];
                if (!a.isBuffer(f)) throw new TypeError('"list" argument must be an Array of Buffers');
                f.copy(e, d);
                d += f.length
            }
            return e
        };
        a.byteLength = e;
        a.prototype._isBuffer = !0;
        a.prototype.swap16 = function () {
            var g = this.length;
            if (0 != g % 2) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var a = 0; a < g; a += 2) r(this, a, a + 1);
            return this
        };
        a.prototype.swap32 = function () {
            var g = this.length;
            if (0 != g % 4) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var a = 0; a < g; a += 4) r(this, a, a + 3), r(this, a + 1, a + 2);
            return this
        };
        a.prototype.swap64 = function () {
            var g = this.length;
            if (0 != g % 8) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var a = 0; a < g; a += 8) r(this, a, a + 7), r(this, a + 1, a + 6), r(this, a + 2, a + 5), r(this, a + 3, a + 4);
            return this
        };
        a.prototype.toString = function () {
            var g = this.length;
            return 0 === g ? "" : 0 === arguments.length ? u(this, 0, g) : function (g, a, b) {
                var n = !1;
                if (((void 0 === a || 0 > a) && (a = 0), a > this.length) || ((void 0 === b || b > this.length) && (b = this.length), 0 >=
                b) || (b >>>= 0) <= (a >>>= 0)) return "";
                for (g || (g = "utf8"); ;) switch (g) {
                    case "hex":
                        g = a;
                        a = b;
                        b = this.length;
                        (!g || 0 > g) && (g = 0);
                        (!a || 0 > a || a > b) && (a = b);
                        n = "";
                        for (b = g; b < a; ++b) g = n, n = this[b], n = 16 > n ? "0" + n.toString(16) : n.toString(16), n = g + n;
                        return n;
                    case "utf8":
                    case "utf-8":
                        return u(this, a, b);
                    case "ascii":
                        g = "";
                        for (b = Math.min(this.length, b); a < b; ++a) g += String.fromCharCode(127 & this[a]);
                        return g;
                    case "latin1":
                    case "binary":
                        g = "";
                        for (b = Math.min(this.length, b); a < b; ++a) g += String.fromCharCode(this[a]);
                        return g;
                    case "base64":
                        return 0 ===
                        a && b === this.length ? F.fromByteArray(this) : F.fromByteArray(this.slice(a, b));
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        a = this.slice(a, b);
                        b = "";
                        for (g = 0; g < a.length; g += 2) b += String.fromCharCode(a[g] + 256 * a[g + 1]);
                        return b;
                    default:
                        if (n) throw new TypeError("Unknown encoding: " + g);
                        g = (g + "").toLowerCase();
                        n = !0
                }
            }.apply(this, arguments)
        };
        a.prototype.equals = function (g) {
            if (!a.isBuffer(g)) throw new TypeError("Argument must be a Buffer");
            return this === g || 0 === a.compare(this, g)
        };
        a.prototype.inspect = function () {
            var g =
                "", a = k.INSPECT_MAX_BYTES;
            return 0 < this.length && (g = this.toString("hex", 0, a).match(/.{2}/g).join(" "), this.length > a && (g += " ... ")), "<Buffer " + g + ">"
        };
        a.prototype.compare = function (g, b, e, d, A) {
            if (!a.isBuffer(g)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === b && (b = 0), void 0 === e && (e = g ? g.length : 0), void 0 === d && (d = 0), void 0 === A && (A = this.length), 0 > b || e > g.length || 0 > d || A > this.length) throw new RangeError("out of range index");
            if (d >= A && b >= e) return 0;
            if (d >= A) return -1;
            if (b >= e) return 1;
            if (this === g) return 0;
            var n = (A >>>= 0) - (d >>>= 0), f = (e >>>= 0) - (b >>>= 0), q = Math.min(n, f);
            d = this.slice(d, A);
            g = g.slice(b, e);
            for (b = 0; b < q; ++b) if (d[b] !== g[b]) {
                n = d[b];
                f = g[b];
                break
            }
            return n < f ? -1 : f < n ? 1 : 0
        };
        a.prototype.includes = function (a, b, e) {
            return -1 !== this.indexOf(a, b, e)
        };
        a.prototype.indexOf = function (a, b, e) {
            return w(this, a, b, e, !0)
        };
        a.prototype.lastIndexOf = function (a, b, e) {
            return w(this, a, b, e, !1)
        };
        a.prototype.write = function (a, n, e, d) {
            if (void 0 === n) d = "utf8", e = this.length, n = 0; else if (void 0 === e && "string" == typeof n) d = n, e = this.length, n = 0;
            else {
                if (!isFinite(n)) throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                n >>>= 0;
                isFinite(e) ? (e >>>= 0, void 0 === d && (d = "utf8")) : (d = e, e = void 0)
            }
            var g = this.length - n;
            if ((void 0 === e || e > g) && (e = g), 0 < a.length && (0 > e || 0 > n) || n > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            d || (d = "utf8");
            var f, q, c;
            for (g = !1; ;) switch (d) {
                case "hex":
                    n = Number(n) || 0;
                    d = this.length - n;
                    e ? (e = Number(e)) > d && (e = d) : e = d;
                    d = a.length;
                    if (0 != d % 2) throw new TypeError("Invalid hex string");
                    e > d / 2 && (e = d / 2);
                    for (d = 0; d < e; ++d) {
                        var h = parseInt(a.substr(2 * d, 2), 16);
                        if (h != h) break;
                        this[n + d] = h
                    }
                    return d;
                case "utf8":
                case "utf-8":
                    return q = n, c = e, E(C(a, this.length - q), this, q, c);
                case "ascii":
                    return b(this, a, n, e);
                case "latin1":
                case "binary":
                    return b(this, a, n, e);
                case "base64":
                    return h = n, f = e, E(I(a), this, h, f);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    d = a;
                    h = this.length - n;
                    f = [];
                    for (q = 0; q < d.length && !(0 > (h -= 2)); ++q) c = d.charCodeAt(q), a = c >> 8, c %= 256, f.push(c), f.push(a);
                    return E(f, this, n, e);
                default:
                    if (g) throw new TypeError("Unknown encoding: " +
                        d);
                    d = ("" + d).toLowerCase();
                    g = !0
            }
        };
        a.prototype.toJSON = function () {
            return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
        };
        var K = 4096;
        a.prototype.slice = function (g, b) {
            var e = this.length;
            0 > (g = ~~g) ? 0 > (g += e) && (g = 0) : g > e && (g = e);
            0 > (b = void 0 === b ? e : ~~b) ? 0 > (b += e) && (b = 0) : b > e && (b = e);
            b < g && (b = g);
            e = this.subarray(g, b);
            return e.__proto__ = a.prototype, e
        };
        a.prototype.readUIntLE = function (a, b, e) {
            a >>>= 0;
            b >>>= 0;
            e || y(a, b, this.length);
            e = this[a];
            for (var g = 1, d = 0; ++d < b && (g *= 256);) e += this[a + d] * g;
            return e
        };
        a.prototype.readUIntBE =
            function (a, b, e) {
                a >>>= 0;
                b >>>= 0;
                e || y(a, b, this.length);
                e = this[a + --b];
                for (var g = 1; 0 < b && (g *= 256);) e += this[a + --b] * g;
                return e
            };
        a.prototype.readUInt8 = function (a, b) {
            return a >>>= 0, b || y(a, 1, this.length), this[a]
        };
        a.prototype.readUInt16LE = function (a, b) {
            return a >>>= 0, b || y(a, 2, this.length), this[a] | this[a + 1] << 8
        };
        a.prototype.readUInt16BE = function (a, b) {
            return a >>>= 0, b || y(a, 2, this.length), this[a] << 8 | this[a + 1]
        };
        a.prototype.readUInt32LE = function (a, b) {
            return a >>>= 0, b || y(a, 4, this.length), (this[a] | this[a + 1] << 8 | this[a + 2] <<
                16) + 16777216 * this[a + 3]
        };
        a.prototype.readUInt32BE = function (a, b) {
            return a >>>= 0, b || y(a, 4, this.length), 16777216 * this[a] + (this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3])
        };
        a.prototype.readIntLE = function (a, b, e) {
            a >>>= 0;
            b >>>= 0;
            e || y(a, b, this.length);
            e = this[a];
            for (var g = 1, d = 0; ++d < b && (g *= 256);) e += this[a + d] * g;
            return e >= 128 * g && (e -= Math.pow(2, 8 * b)), e
        };
        a.prototype.readIntBE = function (a, b, e) {
            a >>>= 0;
            b >>>= 0;
            e || y(a, b, this.length);
            e = b;
            for (var g = 1, d = this[a + --e]; 0 < e && (g *= 256);) d += this[a + --e] * g;
            return d >= 128 * g && (d -= Math.pow(2, 8 * b)),
                d
        };
        a.prototype.readInt8 = function (a, b) {
            return a >>>= 0, b || y(a, 1, this.length), 128 & this[a] ? -1 * (255 - this[a] + 1) : this[a]
        };
        a.prototype.readInt16LE = function (a, b) {
            a >>>= 0;
            b || y(a, 2, this.length);
            var g = this[a] | this[a + 1] << 8;
            return 32768 & g ? 4294901760 | g : g
        };
        a.prototype.readInt16BE = function (a, b) {
            a >>>= 0;
            b || y(a, 2, this.length);
            var g = this[a + 1] | this[a] << 8;
            return 32768 & g ? 4294901760 | g : g
        };
        a.prototype.readInt32LE = function (a, b) {
            return a >>>= 0, b || y(a, 4, this.length), this[a] | this[a + 1] << 8 | this[a + 2] << 16 | this[a + 3] << 24
        };
        a.prototype.readInt32BE =
            function (a, b) {
                return a >>>= 0, b || y(a, 4, this.length), this[a] << 24 | this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3]
            };
        a.prototype.readFloatLE = function (a, b) {
            return a >>>= 0, b || y(a, 4, this.length), D.read(this, a, !0, 23, 4)
        };
        a.prototype.readFloatBE = function (a, b) {
            return a >>>= 0, b || y(a, 4, this.length), D.read(this, a, !1, 23, 4)
        };
        a.prototype.readDoubleLE = function (a, b) {
            return a >>>= 0, b || y(a, 8, this.length), D.read(this, a, !0, 52, 8)
        };
        a.prototype.readDoubleBE = function (a, b) {
            return a >>>= 0, b || y(a, 8, this.length), D.read(this, a, !1, 52, 8)
        };
        a.prototype.writeUIntLE =
            function (a, b, e, d) {
                (a = +a, b >>>= 0, e >>>= 0, d) || z(this, a, b, e, Math.pow(2, 8 * e) - 1, 0);
                d = 1;
                var g = 0;
                for (this[b] = 255 & a; ++g < e && (d *= 256);) this[b + g] = a / d & 255;
                return b + e
            };
        a.prototype.writeUIntBE = function (a, b, e, d) {
            (a = +a, b >>>= 0, e >>>= 0, d) || z(this, a, b, e, Math.pow(2, 8 * e) - 1, 0);
            d = e - 1;
            var g = 1;
            for (this[b + d] = 255 & a; 0 <= --d && (g *= 256);) this[b + d] = a / g & 255;
            return b + e
        };
        a.prototype.writeUInt8 = function (a, b, e) {
            return a = +a, b >>>= 0, e || z(this, a, b, 1, 255, 0), this[b] = 255 & a, b + 1
        };
        a.prototype.writeUInt16LE = function (a, b, e) {
            return a = +a, b >>>= 0, e || z(this,
                a, b, 2, 65535, 0), this[b] = 255 & a, this[b + 1] = a >>> 8, b + 2
        };
        a.prototype.writeUInt16BE = function (a, b, e) {
            return a = +a, b >>>= 0, e || z(this, a, b, 2, 65535, 0), this[b] = a >>> 8, this[b + 1] = 255 & a, b + 2
        };
        a.prototype.writeUInt32LE = function (a, b, e) {
            return a = +a, b >>>= 0, e || z(this, a, b, 4, 4294967295, 0), this[b + 3] = a >>> 24, this[b + 2] = a >>> 16, this[b + 1] = a >>> 8, this[b] = 255 & a, b + 4
        };
        a.prototype.writeUInt32BE = function (a, b, e) {
            return a = +a, b >>>= 0, e || z(this, a, b, 4, 4294967295, 0), this[b] = a >>> 24, this[b + 1] = a >>> 16, this[b + 2] = a >>> 8, this[b + 3] = 255 & a, b + 4
        };
        a.prototype.writeIntLE =
            function (a, b, e, d) {
                (a = +a, b >>>= 0, d) || (d = Math.pow(2, 8 * e - 1), z(this, a, b, e, d - 1, -d));
                d = 0;
                var g = 1, f = 0;
                for (this[b] = 255 & a; ++d < e && (g *= 256);) 0 > a && 0 === f && 0 !== this[b + d - 1] && (f = 1), this[b + d] = (a / g >> 0) - f & 255;
                return b + e
            };
        a.prototype.writeIntBE = function (a, b, e, d) {
            (a = +a, b >>>= 0, d) || (d = Math.pow(2, 8 * e - 1), z(this, a, b, e, d - 1, -d));
            d = e - 1;
            var g = 1, f = 0;
            for (this[b + d] = 255 & a; 0 <= --d && (g *= 256);) 0 > a && 0 === f && 0 !== this[b + d + 1] && (f = 1), this[b + d] = (a / g >> 0) - f & 255;
            return b + e
        };
        a.prototype.writeInt8 = function (a, b, e) {
            return a = +a, b >>>= 0, e || z(this, a, b,
                1, 127, -128), 0 > a && (a = 255 + a + 1), this[b] = 255 & a, b + 1
        };
        a.prototype.writeInt16LE = function (a, b, e) {
            return a = +a, b >>>= 0, e || z(this, a, b, 2, 32767, -32768), this[b] = 255 & a, this[b + 1] = a >>> 8, b + 2
        };
        a.prototype.writeInt16BE = function (a, b, e) {
            return a = +a, b >>>= 0, e || z(this, a, b, 2, 32767, -32768), this[b] = a >>> 8, this[b + 1] = 255 & a, b + 2
        };
        a.prototype.writeInt32LE = function (a, b, e) {
            return a = +a, b >>>= 0, e || z(this, a, b, 4, 2147483647, -2147483648), this[b] = 255 & a, this[b + 1] = a >>> 8, this[b + 2] = a >>> 16, this[b + 3] = a >>> 24, b + 4
        };
        a.prototype.writeInt32BE = function (a,
                                             b, e) {
            return a = +a, b >>>= 0, e || z(this, a, b, 4, 2147483647, -2147483648), 0 > a && (a = 4294967295 + a + 1), this[b] = a >>> 24, this[b + 1] = a >>> 16, this[b + 2] = a >>> 8, this[b + 3] = 255 & a, b + 4
        };
        a.prototype.writeFloatLE = function (a, b, e) {
            return J(this, a, b, !0, e)
        };
        a.prototype.writeFloatBE = function (a, b, e) {
            return J(this, a, b, !1, e)
        };
        a.prototype.writeDoubleLE = function (a, b, e) {
            return H(this, a, b, !0, e)
        };
        a.prototype.writeDoubleBE = function (a, b, e) {
            return H(this, a, b, !1, e)
        };
        a.prototype.copy = function (a, b, e, d) {
            if ((e || (e = 0), d || 0 === d || (d = this.length), b >= a.length &&
            (b = a.length), b || (b = 0), 0 < d && d < e && (d = e), d === e) || 0 === a.length || 0 === this.length) return 0;
            if (0 > b) throw new RangeError("targetStart out of bounds");
            if (0 > e || e >= this.length) throw new RangeError("sourceStart out of bounds");
            if (0 > d) throw new RangeError("sourceEnd out of bounds");
            d > this.length && (d = this.length);
            a.length - b < d - e && (d = a.length - b + e);
            var g = d - e;
            if (this === a && e < b && b < d) for (d = g - 1; 0 <= d; --d) a[d + b] = this[d + e]; else if (1E3 > g) for (d = 0; d < g; ++d) a[d + b] = this[d + e]; else Uint8Array.prototype.set.call(a, this.subarray(e,
                e + g), b);
            return g
        };
        a.prototype.fill = function (b, e, d, f) {
            if ("string" == typeof b) {
                if ("string" == typeof e ? (f = e, e = 0, d = this.length) : "string" == typeof d && (f = d, d = this.length), 1 === b.length) {
                    var g = b.charCodeAt(0);
                    256 > g && (b = g)
                }
                if (void 0 !== f && "string" != typeof f) throw new TypeError("encoding must be a string");
                if ("string" == typeof f && !a.isEncoding(f)) throw new TypeError("Unknown encoding: " + f);
            } else "number" == typeof b && (b &= 255);
            if (0 > e || this.length < e || this.length < d) throw new RangeError("Out of range index");
            if (d <= e) return this;
            if (e >>>= 0, d = void 0 === d ? this.length : d >>> 0, b || (b = 0), "number" == typeof b) for (f = e; f < d; ++f) this[f] = b; else for (b = a.isBuffer(b) ? b : new a(b, f), g = b.length, f = 0; f < d - e; ++f) this[f + e] = b[f % g];
            return this
        };
        var L = /[^+\/0-9A-Za-z-_]/g
    }, {"base64-js": 1, ieee754: 9}],
    4: [function (c, l, k) {
        (function (c) {
            k.isArray = function (a) {
                return Array.isArray ? Array.isArray(a) : "[object Array]" === Object.prototype.toString.call(a)
            };
            k.isBoolean = function (a) {
                return "boolean" == typeof a
            };
            k.isNull = function (a) {
                return null === a
            };
            k.isNullOrUndefined = function (a) {
                return null ==
                    a
            };
            k.isNumber = function (a) {
                return "number" == typeof a
            };
            k.isString = function (a) {
                return "string" == typeof a
            };
            k.isSymbol = function (a) {
                return "symbol" == typeof a
            };
            k.isUndefined = function (a) {
                return void 0 === a
            };
            k.isRegExp = function (a) {
                return "[object RegExp]" === Object.prototype.toString.call(a)
            };
            k.isObject = function (a) {
                return "object" == typeof a && null !== a
            };
            k.isDate = function (a) {
                return "[object Date]" === Object.prototype.toString.call(a)
            };
            k.isError = function (a) {
                return "[object Error]" === Object.prototype.toString.call(a) || a instanceof
                    Error
            };
            k.isFunction = function (a) {
                return "function" == typeof a
            };
            k.isPrimitive = function (a) {
                return null === a || "boolean" == typeof a || "number" == typeof a || "string" == typeof a || "symbol" == typeof a || void 0 === a
            };
            k.isBuffer = c.isBuffer
        }).call(this, {isBuffer: c("../../is-buffer/index.js")})
    }, {"../../is-buffer/index.js": 11}],
    5: [function (c, l, k) {
        k.UINT32 = c("./lib/uint32");
        k.UINT64 = c("./lib/uint64")
    }, {"./lib/uint32": 6, "./lib/uint64": 7}],
    6: [function (c, l, k) {
        !function (c) {
            function a(d, c) {
                return this instanceof a ? (this._low =
                    0, this._high = 0, this.remainder = null, void 0 === c ? h.call(this, d) : "string" == typeof d ? f.call(this, d, c) : void p.call(this, d, c)) : new a(d, c)
            }

            function p(a, f) {
                return this._low = 0 | a, this._high = 0 | f, this
            }

            function h(a) {
                return this._low = 65535 & a, this._high = a >>> 16, this
            }

            function f(a, f) {
                var e = parseInt(a, f || 10);
                return this._low = 65535 & e, this._high = e >>> 16, this
            }

            a(Math.pow(36, 5));
            a(Math.pow(16, 7));
            a(Math.pow(10, 9));
            a(Math.pow(2, 30));
            a(36);
            a(16);
            a(10);
            a(2);
            a.prototype.fromBits = p;
            a.prototype.fromNumber = h;
            a.prototype.fromString =
                f;
            a.prototype.toNumber = function () {
                return 65536 * this._high + this._low
            };
            a.prototype.toString = function (a) {
                return this.toNumber().toString(a || 10)
            };
            a.prototype.add = function (a) {
                var d = this._low + a._low, e = d >>> 16;
                return e += this._high + a._high, this._low = 65535 & d, this._high = 65535 & e, this
            };
            a.prototype.subtract = function (a) {
                return this.add(a.clone().negate())
            };
            a.prototype.multiply = function (a) {
                var d, e, f = this._high, c = this._low, h = a._high;
                a = a._low;
                return d = (e = c * a) >>> 16, d += f * a, d &= 65535, d += c * h, this._low = 65535 & e, this._high =
                    65535 & d, this
            };
            a.prototype.div = function (d) {
                if (0 == d._low && 0 == d._high) throw Error("division by zero");
                if (0 == d._high && 1 == d._low) return this.remainder = new a(0), this;
                if (d.gt(this)) return this.remainder = this.clone(), this._low = 0, this._high = 0, this;
                if (this.eq(d)) return this.remainder = new a(0), this._low = 1, this._high = 0, this;
                d = d.clone();
                for (var f = -1; !this.lt(d);) d.shiftLeft(1, !0), f++;
                this.remainder = this.clone();
                for (this._high = this._low = 0; 0 <= f; f--) d.shiftRight(1), this.remainder.lt(d) || (this.remainder.subtract(d),
                    16 <= f ? this._high |= 1 << f - 16 : this._low |= 1 << f);
                return this
            };
            a.prototype.negate = function () {
                var a = 1 + (65535 & ~this._low);
                return this._low = 65535 & a, this._high = ~this._high + (a >>> 16) & 65535, this
            };
            a.prototype.equals = a.prototype.eq = function (a) {
                return this._low == a._low && this._high == a._high
            };
            a.prototype.greaterThan = a.prototype.gt = function (a) {
                return this._high > a._high || !(this._high < a._high) && this._low > a._low
            };
            a.prototype.lessThan = a.prototype.lt = function (a) {
                return this._high < a._high || !(this._high > a._high) && this._low <
                    a._low
            };
            a.prototype.or = function (a) {
                return this._low |= a._low, this._high |= a._high, this
            };
            a.prototype.and = function (a) {
                return this._low &= a._low, this._high &= a._high, this
            };
            a.prototype.not = function () {
                return this._low = 65535 & ~this._low, this._high = 65535 & ~this._high, this
            };
            a.prototype.xor = function (a) {
                return this._low ^= a._low, this._high ^= a._high, this
            };
            a.prototype.shiftRight = a.prototype.shiftr = function (a) {
                return 16 < a ? (this._low = this._high >> a - 16, this._high = 0) : 16 == a ? (this._low = this._high, this._high = 0) : (this._low =
                    this._low >> a | this._high << 16 - a & 65535, this._high >>= a), this
            };
            a.prototype.shiftLeft = a.prototype.shiftl = function (a, f) {
                return 16 < a ? (this._high = this._low << a - 16, this._low = 0, f || (this._high &= 65535)) : 16 == a ? (this._high = this._low, this._low = 0) : (this._high = this._high << a | this._low >> 16 - a, this._low = this._low << a & 65535, f || (this._high &= 65535)), this
            };
            a.prototype.rotateLeft = a.prototype.rotl = function (a) {
                var d = this._high << 16 | this._low;
                return d = d << a | d >>> 32 - a, this._low = 65535 & d, this._high = d >>> 16, this
            };
            a.prototype.rotateRight =
                a.prototype.rotr = function (a) {
                    var d = this._high << 16 | this._low;
                    return d = d >>> a | d << 32 - a, this._low = 65535 & d, this._high = d >>> 16, this
                };
            a.prototype.clone = function () {
                return new a(this._low, this._high)
            };
            "undefined" != typeof define && define.amd ? define([], function () {
                return a
            }) : void 0 !== l && l.exports ? l.exports = a : c.UINT32 = a
        }(this)
    }, {}],
    7: [function (c, l, k) {
        !function (c) {
            function a(e, d, c, v) {
                return this instanceof a ? (this.remainder = null, "string" == typeof e ? f.call(this, e, d) : void 0 === d ? h.call(this, e) : void p.apply(this, arguments)) :
                    new a(e, d, c, v)
            }

            function p(a, d, f, c) {
                return void 0 === f ? (this._a00 = 65535 & a, this._a16 = a >>> 16, this._a32 = 65535 & d, this._a48 = d >>> 16, this) : (this._a00 = 0 | a, this._a16 = 0 | d, this._a32 = 0 | f, this._a48 = 0 | c, this)
            }

            function h(a) {
                return this._a00 = 65535 & a, this._a16 = a >>> 16, this._a32 = 0, this._a48 = 0, this
            }

            function f(e, f) {
                f = f || 10;
                this._a48 = this._a32 = this._a16 = this._a00 = 0;
                for (var c = d[f] || new a(Math.pow(f, 5)), h = 0, b = e.length; h < b; h += 5) {
                    var p = Math.min(5, b - h), x = parseInt(e.slice(h, h + p), f);
                    this.multiply(5 > p ? new a(Math.pow(f, p)) : c).add(new a(x))
                }
                return this
            }

            var d = {16: a(Math.pow(16, 5)), 10: a(Math.pow(10, 5)), 2: a(Math.pow(2, 5))},
                x = {16: a(16), 10: a(10), 2: a(2)};
            a.prototype.fromBits = p;
            a.prototype.fromNumber = h;
            a.prototype.fromString = f;
            a.prototype.toNumber = function () {
                return 65536 * this._a16 + this._a00
            };
            a.prototype.toString = function (e) {
                var d = x[e = e || 10] || new a(e);
                if (!this.gt(d)) return this.toNumber().toString(e);
                for (var f = this.clone(), c = Array(64), b = 63; 0 <= b && (f.div(d), c[b] = f.remainder.toNumber().toString(e), f.gt(d)); b--) ;
                return c[b - 1] = f.toNumber().toString(e), c.join("")
            };
            a.prototype.add = function (a) {
                var e = this._a00 + a._a00, d = e >>> 16, f = (d += this._a16 + a._a16) >>> 16,
                    b = (f += this._a32 + a._a32) >>> 16;
                return b += this._a48 + a._a48, this._a00 = 65535 & e, this._a16 = 65535 & d, this._a32 = 65535 & f, this._a48 = 65535 & b, this
            };
            a.prototype.subtract = function (a) {
                return this.add(a.clone().negate())
            };
            a.prototype.multiply = function (a) {
                var e = this._a00, d = this._a16, f = this._a32, b = this._a48, c = a._a00, h = a._a16, p = a._a32,
                    x = e * c, k = x >>> 16, m = (k += e * h) >>> 16;
                k &= 65535;
                m += (k += d * c) >>> 16;
                var l = (m += e * p) >>> 16;
                return m &= 65535, l +=
                    (m += d * h) >>> 16, m &= 65535, l += (m += f * c) >>> 16, l += e * a._a48, l &= 65535, l += d * p, l &= 65535, l += f * h, l &= 65535, l += b * c, this._a00 = 65535 & x, this._a16 = 65535 & k, this._a32 = 65535 & m, this._a48 = 65535 & l, this
            };
            a.prototype.div = function (e) {
                if (0 == e._a16 && 0 == e._a32 && 0 == e._a48) {
                    if (0 == e._a00) throw Error("division by zero");
                    if (1 == e._a00) return this.remainder = new a(0), this
                }
                if (e.gt(this)) return this.remainder = this.clone(), this._a00 = 0, this._a16 = 0, this._a32 = 0, this._a48 = 0, this;
                if (this.eq(e)) return this.remainder = new a(0), this._a00 = 1, this._a16 =
                    0, this._a32 = 0, this._a48 = 0, this;
                e = e.clone();
                for (var d = -1; !this.lt(e);) e.shiftLeft(1, !0), d++;
                this.remainder = this.clone();
                for (this._a48 = this._a32 = this._a16 = this._a00 = 0; 0 <= d; d--) e.shiftRight(1), this.remainder.lt(e) || (this.remainder.subtract(e), 48 <= d ? this._a48 |= 1 << d - 48 : 32 <= d ? this._a32 |= 1 << d - 32 : 16 <= d ? this._a16 |= 1 << d - 16 : this._a00 |= 1 << d);
                return this
            };
            a.prototype.negate = function () {
                var a = 1 + (65535 & ~this._a00);
                return this._a00 = 65535 & a, a = (65535 & ~this._a16) + (a >>> 16), this._a16 = 65535 & a, a = (65535 & ~this._a32) + (a >>>
                    16), this._a32 = 65535 & a, this._a48 = ~this._a48 + (a >>> 16) & 65535, this
            };
            a.prototype.equals = a.prototype.eq = function (a) {
                return this._a48 == a._a48 && this._a00 == a._a00 && this._a32 == a._a32 && this._a16 == a._a16
            };
            a.prototype.greaterThan = a.prototype.gt = function (a) {
                return this._a48 > a._a48 || !(this._a48 < a._a48) && (this._a32 > a._a32 || !(this._a32 < a._a32) && (this._a16 > a._a16 || !(this._a16 < a._a16) && this._a00 > a._a00))
            };
            a.prototype.lessThan = a.prototype.lt = function (a) {
                return this._a48 < a._a48 || !(this._a48 > a._a48) && (this._a32 < a._a32 ||
                    !(this._a32 > a._a32) && (this._a16 < a._a16 || !(this._a16 > a._a16) && this._a00 < a._a00))
            };
            a.prototype.or = function (a) {
                return this._a00 |= a._a00, this._a16 |= a._a16, this._a32 |= a._a32, this._a48 |= a._a48, this
            };
            a.prototype.and = function (a) {
                return this._a00 &= a._a00, this._a16 &= a._a16, this._a32 &= a._a32, this._a48 &= a._a48, this
            };
            a.prototype.xor = function (a) {
                return this._a00 ^= a._a00, this._a16 ^= a._a16, this._a32 ^= a._a32, this._a48 ^= a._a48, this
            };
            a.prototype.not = function () {
                return this._a00 = 65535 & ~this._a00, this._a16 = 65535 & ~this._a16,
                    this._a32 = 65535 & ~this._a32, this._a48 = 65535 & ~this._a48, this
            };
            a.prototype.shiftRight = a.prototype.shiftr = function (a) {
                return 48 <= (a %= 64) ? (this._a00 = this._a48 >> a - 48, this._a16 = 0, this._a32 = 0, this._a48 = 0) : 32 <= a ? (a -= 32, this._a00 = 65535 & (this._a32 >> a | this._a48 << 16 - a), this._a16 = this._a48 >> a & 65535, this._a32 = 0, this._a48 = 0) : 16 <= a ? (a -= 16, this._a00 = 65535 & (this._a16 >> a | this._a32 << 16 - a), this._a16 = 65535 & (this._a32 >> a | this._a48 << 16 - a), this._a32 = this._a48 >> a & 65535, this._a48 = 0) : (this._a00 = 65535 & (this._a00 >> a | this._a16 <<
                    16 - a), this._a16 = 65535 & (this._a16 >> a | this._a32 << 16 - a), this._a32 = 65535 & (this._a32 >> a | this._a48 << 16 - a), this._a48 = this._a48 >> a & 65535), this
            };
            a.prototype.shiftLeft = a.prototype.shiftl = function (a, d) {
                return 48 <= (a %= 64) ? (this._a48 = this._a00 << a - 48, this._a32 = 0, this._a16 = 0, this._a00 = 0) : 32 <= a ? (a -= 32, this._a48 = this._a16 << a | this._a00 >> 16 - a, this._a32 = this._a00 << a & 65535, this._a16 = 0, this._a00 = 0) : 16 <= a ? (a -= 16, this._a48 = this._a32 << a | this._a16 >> 16 - a, this._a32 = 65535 & (this._a16 << a | this._a00 >> 16 - a), this._a16 = this._a00 << a &
                    65535, this._a00 = 0) : (this._a48 = this._a48 << a | this._a32 >> 16 - a, this._a32 = 65535 & (this._a32 << a | this._a16 >> 16 - a), this._a16 = 65535 & (this._a16 << a | this._a00 >> 16 - a), this._a00 = this._a00 << a & 65535), d || (this._a48 &= 65535), this
            };
            a.prototype.rotateLeft = a.prototype.rotl = function (a) {
                if (0 == (a %= 64)) return this;
                if (32 <= a) {
                    var d = this._a00;
                    if (this._a00 = this._a32, this._a32 = d, d = this._a48, this._a48 = this._a16, this._a16 = d, 32 == a) return this;
                    a -= 32
                }
                var e = this._a48 << 16 | this._a32, f = this._a16 << 16 | this._a00;
                d = e << a | f >>> 32 - a;
                a = f << a | e >>>
                    32 - a;
                return this._a00 = 65535 & a, this._a16 = a >>> 16, this._a32 = 65535 & d, this._a48 = d >>> 16, this
            };
            a.prototype.rotateRight = a.prototype.rotr = function (a) {
                if (0 == (a %= 64)) return this;
                if (32 <= a) {
                    var d = this._a00;
                    if (this._a00 = this._a32, this._a32 = d, d = this._a48, this._a48 = this._a16, this._a16 = d, 32 == a) return this;
                    a -= 32
                }
                var e = this._a48 << 16 | this._a32, f = this._a16 << 16 | this._a00;
                d = e >>> a | f << 32 - a;
                a = f >>> a | e << 32 - a;
                return this._a00 = 65535 & a, this._a16 = a >>> 16, this._a32 = 65535 & d, this._a48 = d >>> 16, this
            };
            a.prototype.clone = function () {
                return new a(this._a00,
                    this._a16, this._a32, this._a48)
            };
            "undefined" != typeof define && define.amd ? define([], function () {
                return a
            }) : void 0 !== l && l.exports ? l.exports = a : c.UINT64 = a
        }(this)
    }, {}],
    8: [function (c, l, k) {
        function m() {
            this._events = this._events || {};
            this._maxListeners = this._maxListeners || void 0
        }

        function a(a) {
            return "function" == typeof a
        }

        function p(a) {
            return "object" == typeof a && null !== a
        }

        l.exports = m;
        m.EventEmitter = m;
        m.prototype._events = void 0;
        m.prototype._maxListeners = void 0;
        m.defaultMaxListeners = 10;
        m.prototype.setMaxListeners = function (a) {
            if ("number" !=
                typeof a || 0 > a || isNaN(a)) throw TypeError("n must be a positive number");
            return this._maxListeners = a, this
        };
        m.prototype.emit = function (c) {
            var f, d, h;
            if (this._events || (this._events = {}), "error" === c && (!this._events.error || p(this._events.error) && !this._events.error.length)) {
                if ((f = arguments[1]) instanceof Error) throw f;
                var e = Error('Uncaught, unspecified "error" event. (' + f + ")");
                throw e.context = f, e;
            }
            if (void 0 === (e = this._events[c])) returnfalse;
            if (a(e)) switch (arguments.length) {
                case 1:
                    e.call(this);
                    break;
                case 2:
                    e.call(this,
                        arguments[1]);
                    break;
                case 3:
                    e.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    f = Array.prototype.slice.call(arguments, 1), e.apply(this, f)
            } else if (p(e)) for (f = Array.prototype.slice.call(arguments, 1), e = (h = e.slice()).length, d = 0; d < e; d++) h[d].apply(this, f);
            returntrue
        };
        m.prototype.addListener = function (c, f) {
            var d;
            if (!a(f)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", c, a(f.listener) ? f.listener : f), this._events[c] ? p(this._events[c]) ?
                this._events[c].push(f) : this._events[c] = [this._events[c], f] : this._events[c] = f, p(this._events[c]) && !this._events[c].warned && (d = void 0 === this._maxListeners ? m.defaultMaxListeners : this._maxListeners) && 0 < d && this._events[c].length > d && (this._events[c].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[c].length), "function" == typeof console.trace && console.trace()), this
        };
        m.prototype.on = m.prototype.addListener;
        m.prototype.once = function (c, f) {
            function d() {
                this.removeListener(c, d);
                h || (h = !0, f.apply(this, arguments))
            }

            if (!a(f)) throw TypeError("listener must be a function");
            var h = !1;
            return d.listener = f, this.on(c, d), this
        };
        m.prototype.removeListener = function (c, f) {
            var d, h, e;
            if (!a(f)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[c]) return this;
            if (e = (d = this._events[c]).length, h = -1, d === f || a(d.listener) && d.listener === f) delete this._events[c], this._events.removeListener && this.emit("removeListener",
                c, f); else if (p(d)) {
                for (; 0 < e--;) if (d[e] === f || d[e].listener && d[e].listener === f) {
                    h = e;
                    break
                }
                if (0 > h) return this;
                1 === d.length ? (d.length = 0, delete this._events[c]) : d.splice(h, 1);
                this._events.removeListener && this.emit("removeListener", c, f)
            }
            return this
        };
        m.prototype.removeAllListeners = function (c) {
            var f;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[c] && delete this._events[c], this;
            if (0 === arguments.length) {
                for (f in this._events) "removeListener" !==
                f && this.removeAllListeners(f);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (a(f = this._events[c])) this.removeListener(c, f); else if (f) for (; f.length;) this.removeListener(c, f[f.length - 1]);
            return delete this._events[c], this
        };
        m.prototype.listeners = function (c) {
            return this._events && this._events[c] ? a(this._events[c]) ? [this._events[c]] : this._events[c].slice() : []
        };
        m.prototype.listenerCount = function (c) {
            if (this._events) {
                c = this._events[c];
                if (a(c)) return 1;
                if (c) return c.length
            }
            return 0
        };
        m.listenerCount = function (a, f) {
            return a.listenerCount(f)
        }
    }, {}],
    9: [function (c, l, k) {
        k.read = function (c, a, p, h, f) {
            var d = 8 * f - h - 1;
            var k = (1 << d) - 1, e = k >> 1, m = -7;
            f = p ? f - 1 : 0;
            var l = p ? -1 : 1, v = c[a + f];
            f += l;
            p = v & (1 << -m) - 1;
            v >>= -m;
            for (m += d; 0 < m; p = 256 * p + c[a + f], f += l, m -= 8) ;
            d = p & (1 << -m) - 1;
            p >>= -m;
            for (m += h; 0 < m; d = 256 * d + c[a + f], f += l, m -= 8) ;
            if (0 === p) p = 1 - e; else {
                if (p === k) return d ? NaN : 1 / 0 * (v ? -1 : 1);
                d += Math.pow(2, h);
                p -= e
            }
            return (v ? -1 : 1) * d * Math.pow(2, p - h)
        };
        k.write = function (c, a, p, h, f, d) {
            var m, e, k, l = 8 * d - f - 1, v = (1 << l) - 1, b = v >> 1, u = 23 === f ? Math.pow(2,
                -24) - Math.pow(2, -77) : 0;
            d = h ? 0 : d - 1;
            h = h ? 1 : -1;
            var y = 0 > a || 0 === a && 0 > 1 / a ? 1 : 0;
            a = Math.abs(a);
            for (isNaN(a) || a === 1 / 0 ? (e = isNaN(a) ? 1 : 0, m = v) : (m = Math.floor(Math.log(a) / Math.LN2), 1 > a * (k = Math.pow(2, -m)) && (m--, k *= 2), 2 <= (a += 1 <= m + b ? u / k : u * Math.pow(2, 1 - b)) * k && (m++, k /= 2), m + b >= v ? (e = 0, m = v) : 1 <= m + b ? (e = (a * k - 1) * Math.pow(2, f), m += b) : (e = a * Math.pow(2, b - 1) * Math.pow(2, f), m = 0)); 8 <= f; c[p + d] = 255 & e, d += h, e /= 256, f -= 8) ;
            m = m << f | e;
            for (l += f; 0 < l; c[p + d] = 255 & m, d += h, m /= 256, l -= 8) ;
            c[p + d - h] |= 128 * y
        }
    }, {}],
    10: [function (c, l, k) {
        "function" == typeof Object.create ?
            l.exports = function (c, a) {
                c.super_ = a;
                c.prototype = Object.create(a.prototype, {
                    constructor: {
                        value: c,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : l.exports = function (c, a) {
                c.super_ = a;
                var p = function () {
                };
                p.prototype = a.prototype;
                c.prototype = new p;
                c.prototype.constructor = c
            }
    }, {}],
    11: [function (c, l, k) {
        function m(a) {
            return !!a.constructor && "function" == typeof a.constructor.isBuffer && a.constructor.isBuffer(a)
        }

        l.exports = function (a) {
            return null != a && (m(a) || "function" == typeof (c = a).readFloatLE && "function" == typeof c.slice &&
                m(c.slice(0, 0)) || !!a._isBuffer);
            var c
        }
    }, {}],
    12: [function (c, l, k) {
        var m = {}.toString;
        l.exports = Array.isArray || function (a) {
            return "[object Array]" == m.call(a)
        }
    }, {}],
    13: [function (c, l, k) {
        function m(a, c, h, f, d, m) {
            var e = d;
            m -= d;
            d = 0;
            if (2113929216 <= a.length) throw Error("input too large");
            if (12 < a.length) {
                var p = k.compressBound(a.length);
                if (m < p) throw Error("output too small: " + m + " < " + p);
                m = 67;
                for (p = a.length - 12; h + 4 < p;) {
                    var l = a[h + 1] << 8 | a[h], v = a[h + 3] << 8 | a[h + 2],
                        b = Math.imul(l | v << 16, 2654435761) >>> 16, u = f[b] - 1;
                    if (f[b] = h +
                        1, 0 > u || 0 < h - u >>> 16 || (a[u + 3] << 8 | a[u + 2]) != v || (a[u + 1] << 8 | a[u]) != l) h += m++ >> 6; else {
                        m = 67;
                        l = h - d;
                        v = h - u;
                        u += 4;
                        for (b = h += 4; h < p && a[h] == a[u];) h++, u++;
                        u = 15 > (b = h - b) ? b : 15;
                        if (15 <= l) {
                            c[e++] = 240 + u;
                            for (u = l - 15; 254 < u; u -= 255) c[e++] = 255;
                            c[e++] = u
                        } else c[e++] = (l << 4) + u;
                        for (u = 0; u < l; u++) c[e++] = a[d + u];
                        if (c[e++] = v, c[e++] = v >> 8, 15 <= b) {
                            for (b -= 15; 255 <= b;) b -= 255, c[e++] = 255;
                            c[e++] = b
                        }
                        d = h
                    }
                }
            }
            if (0 == d) return 0;
            if (15 <= (l = a.length - d)) {
                c[e++] = 240;
                for (h = l - 15; 254 < h; h -= 255) c[e++] = 255;
                c[e++] = h
            } else c[e++] = l << 4;
            for (h = d; h < a.length;) c[e++] = a[h++];
            return e
        }

        c("cuint").UINT32;
        Math.imul || (Math.imul = function (a, c) {
            var h = 65535 & a, f = 65535 & c;
            return h * f + ((a >>> 16) * f + h * (c >>> 16) << 16) | 0
        });
        k.uncompress = function (a, c, h, f) {
            var d = h = h || 0;
            h = f || a.length - h;
            for (f = 0; d < h;) {
                var p = a[d++], e = p >> 4;
                if (0 < e) {
                    for (var m = e + 240; 255 === m;) e += m = a[d++];
                    for (m = d + e; d < m;) c[f++] = a[d++];
                    if (d === h) break
                }
                e = a[d++] | a[d++] << 8;
                if (0 === e || e > f) return -(d - 2);
                p &= 15;
                for (m = p + 240; 255 === m;) p += m = a[d++];
                e = f - e;
                for (m = f + p + 4; f < m;) c[f++] = c[e++]
            }
            return f
        };
        k.compressBound = function (a) {
            return 2113929216 < a ? 0 : a + a / 255 + 16 | 0
        };
        k.compress =
            function (a, c, h, f) {
                for (var d = Array(65536), p = 0; 65536 > p; p++) d[p] = 0;
                return m(a, c, 0, d, h || 0, f || c.length)
            };
        k.compressHC = k.compress;
        k.compressDependent = m
    }, {cuint: 5}],
    14: [function (c, l, k) {
        (function (m) {
            var a = c("./decoder_stream");
            k.LZ4_uncompress = function (c, h) {
                var f = [], d = new a(h);
                return d.on("data", function (a) {
                    f.push(a)
                }), d.end(c), m.concat(f)
            }
        }).call(this, c("buffer").Buffer)
    }, {"./decoder_stream": 15, buffer: 3}],
    15: [function (c, l, k) {
        (function (m) {
            function a(d) {
                if (!(this instanceof a)) return new a(d);
                p.call(this,
                    d);
                this.options = d || {};
                this.binding = this.options.useJS ? e : k;
                this.buffer = null;
                this.pos = 0;
                this.descriptor = null;
                this.state = r.MAGIC;
                this.notEnoughData = !1;
                this.descriptorStart = 0;
                this.currentStreamChecksum = this.dictId = this.streamSize = null;
                this.skippableSize = this.dataBlockSize = 0
            }

            var p = c("stream").Transform, h = c("util").inherits, f = c("./static"), d = f.utils, k = d.bindings,
                e = c("./binding"), r = f.STATES, w = f.SIZES;
            h(a, p);
            a.prototype._transform = function (a, b, d) {
                if (0 < this.skippableSize) {
                    if (this.skippableSize -= a.length, 0 <
                    this.skippableSize) return void d();
                    a = a.slice(-this.skippableSize);
                    this.skippableSize = 0;
                    this.state = r.MAGIC
                }
                this.buffer = this.buffer ? m.concat([this.buffer, a], this.buffer.length + a.length) : a;
                this._main(d)
            };
            a.prototype.emit_Error = function (a) {
                this.emit("error", Error(a + " @" + this.pos))
            };
            a.prototype.check_Size = function (a) {
                var b = this.buffer.length - this.pos;
                return 0 >= b || b < a ? (this.notEnoughData && this.emit_Error("Unexpected end of LZ4 stream"), !0) : (this.pos += a, !1)
            };
            a.prototype.read_MagicNumber = function () {
                var a =
                    this.pos;
                if (this.check_Size(w.MAGIC)) returntrue;
                var b = d.readInt32LE(this.buffer, a);
                if ((4294967280 & b) !== f.MAGICNUMBER_SKIPPABLE) return b !== f.MAGICNUMBER ? (this.pos = a, this.emit_Error("Invalid magic number: " + b.toString(16).toUpperCase()), !0) : void (this.state = r.DESCRIPTOR);
                this.state = r.SKIP_SIZE
            };
            a.prototype.read_SkippableSize = function () {
                var a = this.pos;
                if (this.check_Size(w.SKIP_SIZE)) returntrue;
                this.state = r.SKIP_DATA;
                this.skippableSize = d.readInt32LE(this.buffer, a)
            };
            a.prototype.read_Descriptor = function () {
                var a =
                    this.pos;
                if (this.check_Size(w.DESCRIPTOR)) returntrue;
                this.descriptorStart = a;
                var b = this.buffer[a], d = b >> 6;
                if (d !== f.VERSION) return this.pos = a, this.emit_Error("Invalid version: " + d + " != " + f.VERSION), !0;
                if (b >> 1 & 1) return this.pos = a, this.emit_Error("Reserved bit set"), !0;
                d = this.buffer[a + 1] >> 4 & 7;
                var e = f.blockMaxSizes[d];
                if (null === e) return this.pos = a, this.emit_Error("Invalid block max size: " + d), !0;
                this.descriptor = {
                    blockIndependence: !!(b >> 5 & 1),
                    blockChecksum: !!(b >> 4 & 1),
                    blockMaxSize: e,
                    streamSize: !!(b >> 3 & 1),
                    streamChecksum: !!(b >>
                        2 & 1),
                    dict: !!(1 & b),
                    dictId: 0
                };
                this.state = r.SIZE
            };
            a.prototype.read_Size = function () {
                if (this.descriptor.streamSize) {
                    var a = this.pos;
                    if (this.check_Size(w.SIZE)) returntrue;
                    this.streamSize = this.buffer.slice(a, a + 8)
                }
                this.state = r.DICTID
            };
            a.prototype.read_DictId = function () {
                if (this.descriptor.dictId) {
                    var a = this.pos;
                    if (this.check_Size(w.DICTID)) returntrue;
                    this.dictId = d.readInt32LE(this.buffer, a)
                }
                this.state = r.DESCRIPTOR_CHECKSUM
            };
            a.prototype.read_DescriptorChecksum = function () {
                var a = this.pos;
                if (this.check_Size(w.DESCRIPTOR_CHECKSUM)) returntrue;
                var b = this.buffer[a];
                if (d.descriptorChecksum(this.buffer.slice(this.descriptorStart, a)) !== b) return this.pos = a, this.emit_Error("Invalid stream descriptor checksum"), !0;
                this.state = r.DATABLOCK_SIZE
            };
            a.prototype.read_DataBlockSize = function () {
                var a = this.pos;
                if (this.check_Size(w.DATABLOCK_SIZE)) returntrue;
                a = d.readInt32LE(this.buffer, a);
                a !== f.EOS ? (this.dataBlockSize = a, this.state = r.DATABLOCK_DATA) : this.state = r.EOS
            };
            a.prototype.read_DataBlockData = function () {
                var a = this.pos, b = this.dataBlockSize;
                if (2147483648 &
                b && (b &= 2147483647), this.check_Size(b)) returntrue;
                this.dataBlock = this.buffer.slice(a, a + b);
                this.state = r.DATABLOCK_CHECKSUM
            };
            a.prototype.read_DataBlockChecksum = function () {
                var a = this.pos;
                if (this.descriptor.blockChecksum) {
                    if (this.check_Size(w.DATABLOCK_CHECKSUM)) returntrue;
                    var b = d.readInt32LE(this.buffer, this.pos - 4);
                    if (d.blockChecksum(this.dataBlock) !== b) return this.pos = a, this.emit_Error("Invalid block checksum"), !0
                }
                this.state = r.DATABLOCK_UNCOMPRESS
            };
            a.prototype.uncompress_DataBlock = function () {
                if (2147483648 &
                    this.dataBlockSize) var a = this.dataBlock; else {
                    a = new m(this.descriptor.blockMaxSize);
                    var b = this.binding.uncompress(this.dataBlock, a);
                    if (0 > b) return this.emit_Error("Invalid data block: " + -b), !0;
                    b < this.descriptor.blockMaxSize && (a = a.slice(0, b))
                }
                this.dataBlock = null;
                this.push(a);
                this.descriptor.streamChecksum && (this.currentStreamChecksum = d.streamChecksum(a, this.currentStreamChecksum));
                this.state = r.DATABLOCK_SIZE
            };
            a.prototype.read_EOS = function () {
                if (this.descriptor.streamChecksum) {
                    var a = this.pos;
                    if (this.check_Size(w.EOS)) returntrue;
                    var b = d.readInt32LE(this.buffer, a);
                    if (b !== d.streamChecksum(null, this.currentStreamChecksum)) return this.pos = a, this.emit_Error("Invalid stream checksum: " + b.toString(16).toUpperCase()), !0
                }
                this.state = r.MAGIC
            };
            a.prototype._flush = function (a) {
                this.notEnoughData = !0;
                this._main(a)
            };
            a.prototype._main = function (a) {
                for (var b, d = this.pos; !b && this.pos < this.buffer.length;) this.state === r.MAGIC && (b = this.read_MagicNumber()), this.state === r.SKIP_SIZE && (b = this.read_SkippableSize()), this.state === r.DESCRIPTOR && (b = this.read_Descriptor()),
                this.state === r.SIZE && (b = this.read_Size()), this.state === r.DICTID && (b = this.read_DictId()), this.state === r.DESCRIPTOR_CHECKSUM && (b = this.read_DescriptorChecksum()), this.state === r.DATABLOCK_SIZE && (b = this.read_DataBlockSize()), this.state === r.DATABLOCK_DATA && (b = this.read_DataBlockData()), this.state === r.DATABLOCK_CHECKSUM && (b = this.read_DataBlockChecksum()), this.state === r.DATABLOCK_UNCOMPRESS && (b = this.uncompress_DataBlock()), this.state === r.EOS && (b = this.read_EOS());
                this.pos > d && (this.buffer = this.buffer.slice(this.pos),
                    this.pos = 0);
                a()
            };
            l.exports = a
        }).call(this, c("buffer").Buffer)
    }, {"./binding": 13, "./static": 19, buffer: 3, stream: 37, util: 42}],
    16: [function (c, l, k) {
        (function (m) {
            var a = c("./encoder_stream");
            k.LZ4_compress = function (c, h) {
                var f = [], d = new a(h);
                return d.on("data", function (a) {
                    f.push(a)
                }), d.end(c), m.concat(f)
            }
        }).call(this, c("buffer").Buffer)
    }, {"./encoder_stream": 17, buffer: 3}],
    17: [function (c, l, k) {
        (function (m) {
            function a(b) {
                if (!(this instanceof a)) return new a(b);
                p.call(this, b);
                var d = b || v;
                d !== v && Object.keys(v).forEach(function (a) {
                    d.hasOwnProperty(a) ||
                    (d[a] = v[a])
                });
                this.options = d;
                this.binding = this.options.useJS ? e : k;
                this.compress = d.highCompression ? this.binding.compressHC : this.binding.compress;
                b = 0 | f.VERSION << 6;
                b |= (1 & d.blockIndependence) << 5;
                b |= (1 & d.blockChecksum) << 4;
                b |= (1 & d.streamSize) << 3;
                b |= (1 & d.streamChecksum) << 2;
                b |= 1 & d.dict;
                var c = f.blockMaxSizes.indexOf(d.blockMaxSize);
                if (0 > c) throw Error("Invalid blockMaxSize: " + d.blockMaxSize);
                this.descriptor = {flg: b, bd: (7 & c) << 4};
                this.buffer = [];
                this.length = 0;
                this.first = !0;
                this.checksum = null
            }

            var p = c("stream").Transform,
                h = c("util").inherits, f = c("./static"), d = f.utils, k = d.bindings, e = c("./binding"),
                r = f.STATES, w = f.SIZES, v = {
                    blockIndependence: !0,
                    blockChecksum: !1,
                    blockMaxSize: 4194304,
                    streamSize: !1,
                    streamChecksum: !0,
                    dict: !1,
                    dictId: 0,
                    highCompression: !1
                };
            h(a, p);
            a.prototype.headerSize = function () {
                return w.MAGIC + 1 + 1 + (this.options.streamSize ? w.DESCRIPTOR : 0) + (this.options.dict ? w.DICTID : 0) + 1
            };
            a.prototype.header = function () {
                var a = this.headerSize();
                a = new m(a);
                this.state = r.MAGIC;
                a.writeInt32LE(f.MAGICNUMBER, 0, !0);
                this.state = r.DESCRIPTOR;
                var e = a.slice(w.MAGIC, a.length - 1);
                e.writeUInt8(this.descriptor.flg, 0, !0);
                e.writeUInt8(this.descriptor.bd, 1, !0);
                var c = 2;
                return this.state = r.SIZE, this.options.streamSize && (e.writeInt32LE(0, c, !0), e.writeInt32LE(this.size, c + 4, !0), c += w.SIZE), this.state = r.DICTID, this.options.dict && (e.writeInt32LE(this.dictId, c, !0), c += w.DICTID), this.state = r.DESCRIPTOR_CHECKSUM, a.writeUInt8(d.descriptorChecksum(e), w.MAGIC + c, !1), a
            };
            a.prototype.update_Checksum = function (a) {
                this.state = r.CHECKSUM_UPDATE;
                this.options.streamChecksum &&
                (this.checksum = d.streamChecksum(a, this.checksum))
            };
            a.prototype.compress_DataBlock = function (a) {
                this.state = r.DATABLOCK_COMPRESS;
                var b = this.options.blockChecksum ? w.DATABLOCK_CHECKSUM : 0, e = this.binding.compressBound(a.length),
                    c = new m(w.DATABLOCK_SIZE + e + b);
                e = c.slice(w.DATABLOCK_SIZE, w.DATABLOCK_SIZE + e);
                var f = this.compress(a, e);
                (this.state = r.DATABLOCK_SIZE, 0 < f && f <= this.options.blockMaxSize ? (c.writeUInt32LE(f, 0, !0), c = c.slice(0, w.DATABLOCK_SIZE + f + b)) : (c.writeInt32LE(2147483648 | a.length, 0, !0), c = c.slice(0, w.DATABLOCK_SIZE +
                    a.length + b), a.copy(c, w.DATABLOCK_SIZE)), this.state = r.DATABLOCK_CHECKSUM, this.options.blockChecksum) && c.slice(-b).writeInt32LE(d.blockChecksum(e), 0, !0);
                return this.update_Checksum(a), this.size += a.length, c
            };
            a.prototype._transform = function (a, d, e) {
                a && (this.buffer.push(a), this.length += a.length);
                this.first && (this.push(this.header()), this.first = !1);
                a = this.options.blockMaxSize;
                if (this.length < a) return e();
                d = m.concat(this.buffer, this.length);
                for (var b = 0, c = d.length; c >= a; c -= a, b += a) this.push(this.compress_DataBlock(d.slice(b,
                    b + a)));
                0 < c ? (this.buffer = [d.slice(b)], this.length = this.buffer[0].length) : (this.buffer = [], this.length = 0);
                e()
            };
            a.prototype._flush = function (a) {
                if (this.first && (this.push(this.header()), this.first = !1), 0 < this.length) {
                    var b = m.concat(this.buffer, this.length);
                    this.buffer = [];
                    this.length = 0;
                    b = this.compress_DataBlock(b);
                    this.push(b)
                }
                this.options.streamChecksum ? (this.state = r.CHECKSUM, (b = new m(w.EOS + w.CHECKSUM)).writeInt32LE(d.streamChecksum(null, this.checksum), w.EOS, !0)) : b = new m(w.EOS);
                this.state = r.EOS;
                b.writeInt32LE(f.EOS,
                    0, !0);
                this.push(b);
                a()
            };
            l.exports = a
        }).call(this, c("buffer").Buffer)
    }, {"./binding": 13, "./static": 19, buffer: 3, stream: 37, util: 42}],
    18: [function (c, l, k) {
        l.exports = c("./static");
        l.exports.version = "0.5.1";
        l.exports.createDecoderStream = c("./decoder_stream");
        l.exports.decode = c("./decoder").LZ4_uncompress;
        l.exports.createEncoderStream = c("./encoder_stream");
        l.exports.encode = c("./encoder").LZ4_compress;
        c = l.exports.utils.bindings;
        l.exports.decodeBlock = c.uncompress;
        l.exports.encodeBound = c.compressBound;
        l.exports.encodeBlock =
            c.compress;
        l.exports.encodeBlockHC = c.compressHC
    }, {"./decoder": 14, "./decoder_stream": 15, "./encoder": 16, "./encoder_stream": 17, "./static": 19}],
    19: [function (c, l, k) {
        l = c("buffer").Buffer;
        k.MAGICNUMBER = 407708164;
        k.MAGICNUMBER_BUFFER = new l(4);
        k.MAGICNUMBER_BUFFER.writeUInt32LE(k.MAGICNUMBER, 0, !1);
        k.EOS = 0;
        k.EOS_BUFFER = new l(4);
        k.EOS_BUFFER.writeUInt32LE(k.EOS, 0, !1);
        k.VERSION = 1;
        k.MAGICNUMBER_SKIPPABLE = 407710288;
        k.blockMaxSizes = [null, null, null, null, 65536, 262144, 1048576, 4194304];
        k.extension = ".lz4";
        k.STATES = {
            MAGIC: 0,
            DESCRIPTOR: 1,
            SIZE: 2,
            DICTID: 3,
            DESCRIPTOR_CHECKSUM: 4,
            DATABLOCK_SIZE: 5,
            DATABLOCK_DATA: 6,
            DATABLOCK_CHECKSUM: 7,
            DATABLOCK_UNCOMPRESS: 8,
            DATABLOCK_COMPRESS: 9,
            CHECKSUM: 10,
            CHECKSUM_UPDATE: 11,
            EOS: 90,
            SKIP_SIZE: 101,
            SKIP_DATA: 102
        };
        k.SIZES = {
            MAGIC: 4,
            DESCRIPTOR: 2,
            SIZE: 8,
            DICTID: 4,
            DESCRIPTOR_CHECKSUM: 1,
            DATABLOCK_SIZE: 4,
            DATABLOCK_CHECKSUM: 4,
            CHECKSUM: 4,
            EOS: 4,
            SKIP_SIZE: 4
        };
        k.utils = c("./utils")
    }, {"./utils": 20, buffer: 3}],
    20: [function (c, l, k) {
        var m = c("xxhashjs");
        k.descriptorChecksum = function (a) {
            return m(a, 0).toNumber() >> 8 &
                255
        };
        k.blockChecksum = function (a) {
            return m(a, 0).toNumber()
        };
        k.streamChecksum = function (a, c) {
            return null === a ? c.digest().toNumber() : (null === c && (c = m(0)), c.update(a))
        };
        k.readInt32LE = function (a, c) {
            return a[c] | a[c + 1] << 8 | a[c + 2] << 16 | a[c + 3] << 24
        };
        k.bindings = c("./binding")
    }, {"./binding": 13, xxhashjs: 46}],
    21: [function (c, l, k) {
        (function (c) {
            !c.version || 0 === c.version.indexOf("v0.") || 0 === c.version.indexOf("v1.") && 0 !== c.version.indexOf("v1.8.") ? l.exports = function (a, m, h, f) {
                if ("function" != typeof a) throw new TypeError('"callback" argument must be a function');
                var d = arguments.length;
                switch (d) {
                    case 0:
                    case 1:
                        return c.nextTick(a);
                    case 2:
                        return c.nextTick(function () {
                            a.call(null, m)
                        });
                    case 3:
                        return c.nextTick(function () {
                            a.call(null, m, h)
                        });
                    case 4:
                        return c.nextTick(function () {
                            a.call(null, m, h, f)
                        });
                    default:
                        var k = Array(d - 1);
                        for (d = 0; d < k.length;) k[d++] = arguments[d];
                        return c.nextTick(function () {
                            a.apply(null, k)
                        })
                }
            } : l.exports = c.nextTick
        }).call(this, c("_process"))
    }, {_process: 22}],
    22: [function (c, l, k) {
        function m() {
            throw Error("setTimeout has not been defined");
        }

        function a() {
            throw Error("clearTimeout has not been defined");
        }

        function p(a) {
            if (e === setTimeout) return setTimeout(a, 0);
            if ((e === m || !e) && setTimeout) return e = setTimeout, setTimeout(a, 0);
            try {
                return e(a, 0)
            } catch (z) {
                try {
                    return e.call(null, a, 0)
                } catch (G) {
                    return e.call(this, a, 0)
                }
            }
        }

        function h() {
            b && w && (b = !1, w.length ? v = w.concat(v) : u = -1, v.length && f())
        }

        function f() {
            if (!b) {
                var d = p(h);
                b = !0;
                for (var e = v.length; e;) {
                    w = v;
                    for (v = []; ++u < e;) w && w[u].run();
                    u = -1;
                    e = v.length
                }
                w = null;
                b = !1;
                (function (b) {
                    if (r === clearTimeout) return clearTimeout(b);
                    if ((r === a || !r) && clearTimeout) return r = clearTimeout,
                        clearTimeout(b);
                    try {
                        r(b)
                    } catch (J) {
                        try {
                            return r.call(null, b)
                        } catch (H) {
                            return r.call(this, b)
                        }
                    }
                })(d)
            }
        }

        function d(a, b) {
            this.fun = a;
            this.array = b
        }

        function x() {
        }

        c = l.exports = {};
        try {
            var e = "function" == typeof setTimeout ? setTimeout : m
        } catch (y) {
            e = m
        }
        try {
            var r = "function" == typeof clearTimeout ? clearTimeout : a
        } catch (y) {
            r = a
        }
        !0;
        var w, v = [], b = !1, u = -1;
        c.nextTick = function (a) {
            var e = Array(arguments.length - 1);
            if (1 < arguments.length) for (var c = 1; c < arguments.length; c++) e[c - 1] = arguments[c];
            v.push(new d(a, e));
            1 !== v.length || b || p(f)
        };
        d.prototype.run = function () {
            this.fun.apply(null, this.array)
        };
        c.title = "browser";
        c.browser = !0;
        c.env = {};
        c.argv = [];
        c.version = "";
        c.versions = {};
        c.on = x;
        c.addListener = x;
        c.once = x;
        c.off = x;
        c.removeListener = x;
        c.removeAllListeners = x;
        c.emit = x;
        c.prependListener = x;
        c.prependOnceListener = x;
        c.listeners = function (a) {
            return []
        };
        c.binding = function (a) {
            throw Error("process.binding is not supported");
        };
        c.cwd = function () {
            return "/"
        };
        c.chdir = function (a) {
            throw Error("process.chdir is not supported");
        };
        c.umask = function () {
            return 0
        }
    },
        {}],
    23: [function (c, l, k) {
        l.exports = c("./lib/_stream_duplex.js")
    }, {"./lib/_stream_duplex.js": 24}],
    24: [function (c, l, k) {
        function m(c) {
            if (!(this instanceof m)) return new m(c);
            f.call(this, c);
            d.call(this, c);
            c && !1 === c.readable && (this.readable = !1);
            c && !1 === c.writable && (this.writable = !1);
            this.allowHalfOpen = !0;
            c && !1 === c.allowHalfOpen && (this.allowHalfOpen = !1);
            this.once("end", a)
        }

        function a() {
            this.allowHalfOpen || this._writableState.ended || h(p, this)
        }

        function p(a) {
            a.end()
        }

        var h = c("process-nextick-args");
        k = Object.keys ||
            function (a) {
                var d = [], c;
                for (c in a) d.push(c);
                return d
            };
        l.exports = m;
        l = c("core-util-is");
        l.inherits = c("inherits");
        var f = c("./_stream_readable"), d = c("./_stream_writable");
        l.inherits(m, f);
        c = k(d.prototype);
        for (l = 0; l < c.length; l++) k = c[l], m.prototype[k] || (m.prototype[k] = d.prototype[k]);
        Object.defineProperty(m.prototype, "destroyed", {
            get: function () {
                return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed
            }, set: function (a) {
                void 0 !== this._readableState &&
                void 0 !== this._writableState && (this._readableState.destroyed = a, this._writableState.destroyed = a)
            }
        });
        m.prototype._destroy = function (a, d) {
            this.push(null);
            this.end();
            h(d, a)
        }
    }, {
        "./_stream_readable": 26,
        "./_stream_writable": 28,
        "core-util-is": 4,
        inherits: 10,
        "process-nextick-args": 21
    }],
    25: [function (c, l, k) {
        function m(c) {
            if (!(this instanceof m)) return new m(c);
            a.call(this, c)
        }

        l.exports = m;
        var a = c("./_stream_transform");
        l = c("core-util-is");
        l.inherits = c("inherits");
        l.inherits(m, a);
        m.prototype._transform = function (a,
                                           c, f) {
            f(null, a)
        }
    }, {"./_stream_transform": 27, "core-util-is": 4, inherits: 10}],
    26: [function (c, l, k) {
        (function (m, a) {
            function k(a, b) {
                I = I || c("./_stream_duplex");
                a = a || {};
                this.objectMode = !!a.objectMode;
                b instanceof I && (this.objectMode = this.objectMode || !!a.readableObjectMode);
                var d = a.highWaterMark, e = this.objectMode ? 16 : 16384;
                this.highWaterMark = d || 0 === d ? d : e;
                this.highWaterMark = Math.floor(this.highWaterMark);
                this.buffer = new q;
                this.length = 0;
                this.pipes = null;
                this.pipesCount = 0;
                this.flowing = null;
                this.reading = this.endEmitted =
                    this.ended = !1;
                this.sync = !0;
                this.destroyed = this.resumeScheduled = this.readableListening = this.emittedReadable = this.needReadable = !1;
                this.defaultEncoding = a.defaultEncoding || "utf8";
                this.awaitDrain = 0;
                this.readingMore = !1;
                this.encoding = this.decoder = null;
                a.encoding && (n || (n = c("string_decoder/").StringDecoder), this.decoder = new n(a.encoding), this.encoding = a.encoding)
            }

            function h(a) {
                if (I = I || c("./_stream_duplex"), !(this instanceof h)) return new h(a);
                this._readableState = new k(a, this);
                this.readable = !0;
                a && ("function" ==
                typeof a.read && (this._read = a.read), "function" == typeof a.destroy && (this._destroy = a.destroy));
                F.call(this)
            }

            function f(a, b, c, g, f) {
                var A, n, h = a._readableState;
                null === b ? (h.reading = !1, function (a, b) {
                    if (!b.ended) {
                        if (b.decoder) {
                            var d = b.decoder.end();
                            d && d.length && (b.buffer.push(d), b.length += b.objectMode ? 1 : d.length)
                        }
                        b.ended = !0;
                        e(a)
                    }
                }(a, h)) : (f || (A = function (a, b) {
                    var d;
                    var c = b;
                    D.isBuffer(c) || c instanceof B || "string" == typeof b || void 0 === b || a.objectMode || (d = new TypeError("Invalid non-string/buffer chunk"));
                    return d
                }(h,
                    b)), A ? a.emit("error", A) : h.objectMode || b && 0 < b.length ? ("string" == typeof b || h.objectMode || Object.getPrototypeOf(b) === D.prototype || (n = b, b = D.from(n)), g ? h.endEmitted ? a.emit("error", Error("stream.unshift() after end event")) : d(a, h, b, !0) : h.ended ? a.emit("error", Error("stream.push() after EOF")) : (h.reading = !1, h.decoder && !c ? (b = h.decoder.write(b), h.objectMode || 0 !== b.length ? d(a, h, b, !1) : w(a, h)) : d(a, h, b, !1))) : g || (h.reading = !1));
                return !h.ended && (h.needReadable || h.length < h.highWaterMark || 0 === h.length)
            }

            function d(a,
                       b, d, c) {
                b.flowing && 0 === b.length && !b.sync ? (a.emit("data", d), a.read(0)) : (b.length += b.objectMode ? 1 : d.length, c ? b.buffer.unshift(d) : b.buffer.push(d), b.needReadable && e(a));
                w(a, b)
            }

            function x(a, b) {
                return 0 >= a || 0 === b.length && b.ended ? 0 : b.objectMode ? 1 : a != a ? b.flowing && b.length ? b.buffer.head.data.length : b.length : (a > b.highWaterMark && (b.highWaterMark = (8388608 <= (d = a) ? d = 8388608 : (d--, d |= d >>> 1, d |= d >>> 2, d |= d >>> 4, d |= d >>> 8, d |= d >>> 16, d++), d)), a <= b.length ? a : b.ended ? b.length : (b.needReadable = !0, 0));
                var d
            }

            function e(a) {
                var b =
                    a._readableState;
                b.needReadable = !1;
                b.emittedReadable || (g("emitReadable", b.flowing), b.emittedReadable = !0, b.sync ? C(r, a) : r(a))
            }

            function r(a) {
                g("emit readable");
                a.emit("readable");
                y(a)
            }

            function w(a, b) {
                b.readingMore || (b.readingMore = !0, C(v, a, b))
            }

            function v(a, b) {
                for (var d = b.length; !b.reading && !b.flowing && !b.ended && b.length < b.highWaterMark && (g("maybeReadMore read 0"), a.read(0), d !== b.length);) d = b.length;
                b.readingMore = !1
            }

            function b(a) {
                g("readable nexttick read 0");
                a.read(0)
            }

            function u(a, b) {
                b.reading || (g("resume read 0"),
                    a.read(0));
                b.resumeScheduled = !1;
                b.awaitDrain = 0;
                a.emit("resume");
                y(a);
                b.flowing && !b.reading && a.read(0)
            }

            function y(a) {
                var b = a._readableState;
                for (g("flow", b.flowing); b.flowing && null !== a.read();) ;
            }

            function z(a, b) {
                return 0 === b.length ? null : (b.objectMode ? d = b.buffer.shift() : !a || a >= b.length ? (d = b.decoder ? b.buffer.join("") : 1 === b.buffer.length ? b.buffer.head.data : b.buffer.concat(b.length), b.buffer.clear()) : d = function (a, b, d) {
                    var c;
                    a < b.head.data.length ? (c = b.head.data.slice(0, a), b.head.data = b.head.data.slice(a)) :
                        c = a === b.head.data.length ? b.shift() : d ? function (a, b) {
                            var d = b.head, c = 1, e = d.data;
                            for (a -= e.length; d = d.next;) {
                                var g = d.data, f = a > g.length ? g.length : a;
                                if (f === g.length ? e += g : e += g.slice(0, a), 0 === (a -= f)) {
                                    f === g.length ? (++c, d.next ? b.head = d.next : b.head = b.tail = null) : (b.head = d, d.data = g.slice(f));
                                    break
                                }
                                ++c
                            }
                            return b.length -= c, e
                        }(a, b) : function (a, b) {
                            var d = D.allocUnsafe(a), c = b.head, e = 1;
                            c.data.copy(d);
                            for (a -= c.data.length; c = c.next;) {
                                var g = c.data, f = a > g.length ? g.length : a;
                                if (g.copy(d, d.length - a, 0, f), 0 === (a -= f)) {
                                    f === g.length ?
                                        (++e, c.next ? b.head = c.next : b.head = b.tail = null) : (b.head = c, c.data = g.slice(f));
                                    break
                                }
                                ++e
                            }
                            return b.length -= e, d
                        }(a, b);
                    return c
                }(a, b.buffer, b.decoder), d);
                var d
            }

            function G(a) {
                var b = a._readableState;
                if (0 < b.length) throw Error('"endReadable()" called on non-empty stream');
                b.endEmitted || (b.ended = !0, C(J, b, a))
            }

            function J(a, b) {
                a.endEmitted || 0 !== a.length || (a.endEmitted = !0, b.readable = !1, b.emit("end"))
            }

            function H(a, b) {
                for (var d = 0, c = a.length; d < c; d++) if (a[d] === b) return d;
                return -1
            }

            var C = c("process-nextick-args");
            l.exports =
                h;
            var I, E = c("isarray");
            h.ReadableState = k;
            c("events").EventEmitter;
            var F = c("./internal/streams/stream"), D = c("safe-buffer").Buffer, B = a.Uint8Array || function () {
            }, K = c("core-util-is");
            K.inherits = c("inherits");
            var L = c("util"), g = void 0;
            g = L && L.debuglog ? L.debuglog("stream") : function () {
            };
            var n, q = c("./internal/streams/BufferList");
            L = c("./internal/streams/destroy");
            K.inherits(h, F);
            var M = ["error", "close", "destroy", "pause", "resume"];
            Object.defineProperty(h.prototype, "destroyed", {
                get: function () {
                    return void 0 !== this._readableState &&
                        this._readableState.destroyed
                }, set: function (a) {
                    this._readableState && (this._readableState.destroyed = a)
                }
            });
            h.prototype.destroy = L.destroy;
            h.prototype._undestroy = L.undestroy;
            h.prototype._destroy = function (a, b) {
                this.push(null);
                b(a)
            };
            h.prototype.push = function (a, b) {
                var d, c = this._readableState;
                return c.objectMode ? d = !0 : "string" == typeof a && ((b = b || c.defaultEncoding) !== c.encoding && (a = D.from(a, b), b = ""), d = !0), f(this, a, b, !1, d)
            };
            h.prototype.unshift = function (a) {
                return f(this, a, null, !0, !1)
            };
            h.prototype.isPaused = function () {
                returnfalse ===
                this._readableState.flowing
            };
            h.prototype.setEncoding = function (a) {
                return n || (n = c("string_decoder/").StringDecoder), this._readableState.decoder = new n(a), this._readableState.encoding = a, this
            };
            h.prototype.read = function (a) {
                g("read", a);
                a = parseInt(a, 10);
                var b = this._readableState, d = a;
                if (0 !== a && (b.emittedReadable = !1), 0 === a && b.needReadable && (b.length >= b.highWaterMark || b.ended)) return g("read: emitReadable", b.length, b.ended), 0 === b.length && b.ended ? G(this) : e(this), null;
                if (0 === (a = x(a, b)) && b.ended) return 0 === b.length &&
                G(this), null;
                var c, f = b.needReadable;
                return g("need readable", f), (0 === b.length || b.length - a < b.highWaterMark) && g("length less than watermark", f = !0), b.ended || b.reading ? g("reading or ended", !1) : f && (g("do read"), b.reading = !0, b.sync = !0, 0 === b.length && (b.needReadable = !0), this._read(b.highWaterMark), b.sync = !1, b.reading || (a = x(d, b))), null === (c = 0 < a ? z(a, b) : null) ? (b.needReadable = !0, a = 0) : b.length -= a, 0 === b.length && (b.ended || (b.needReadable = !0), d !== a && b.ended && G(this)), null !== c && this.emit("data", c), c
            };
            h.prototype._read =
                function (a) {
                    this.emit("error", Error("_read() is not implemented"))
                };
            h.prototype.pipe = function (a, b) {
                function d(b, m) {
                    g("onunpipe");
                    b === k && m && !1 === m.hasUnpiped && (m.hasUnpiped = !0, g("cleanup"), a.removeListener("close", h), a.removeListener("finish", n), a.removeListener("drain", q), a.removeListener("error", f), a.removeListener("unpipe", d), k.removeListener("end", c), k.removeListener("end", B), k.removeListener("data", e), D = !0, !p.awaitDrain || a._writableState && !a._writableState.needDrain || q())
                }

                function c() {
                    g("onend");
                    a.end()
                }

                function e(b) {
                    g("ondata");
                    u = !1;
                    !1 !== a.write(b) || u || ((1 === p.pipesCount && p.pipes === a || 1 < p.pipesCount && -1 !== H(p.pipes, a)) && !D && (g("false write response, pause", k._readableState.awaitDrain), k._readableState.awaitDrain++, u = !0), k.pause())
                }

                function f(b) {
                    g("onerror", b);
                    B();
                    a.removeListener("error", f);
                    0 === a.listeners("error").length && a.emit("error", b)
                }

                function h() {
                    a.removeListener("finish", n);
                    B()
                }

                function n() {
                    g("onfinish");
                    a.removeListener("close", h);
                    B()
                }

                function B() {
                    g("unpipe");
                    k.unpipe(a)
                }

                var k =
                    this, p = this._readableState;
                switch (p.pipesCount) {
                    case 0:
                        p.pipes = a;
                        break;
                    case 1:
                        p.pipes = [p.pipes, a];
                        break;
                    default:
                        p.pipes.push(a)
                }
                p.pipesCount += 1;
                g("pipe count=%d opts=%j", p.pipesCount, b);
                var l = b && !1 === b.end || a === m.stdout || a === m.stderr ? B : c;
                p.endEmitted ? C(l) : k.once("end", l);
                a.on("unpipe", d);
                var K, q = (K = k, function () {
                    var a = K._readableState;
                    g("pipeOnDrain", a.awaitDrain);
                    a.awaitDrain && a.awaitDrain--;
                    0 === a.awaitDrain && K.listeners("data").length && (a.flowing = !0, y(K))
                });
                a.on("drain", q);
                var D = !1, u = !1;
                return k.on("data",
                    e), function (a, b, d) {
                    if ("function" == typeof a.prependListener) return a.prependListener(b, d);
                    a._events && a._events[b] ? E(a._events[b]) ? a._events[b].unshift(d) : a._events[b] = [d, a._events[b]] : a.on(b, d)
                }(a, "error", f), a.once("close", h), a.once("finish", n), a.emit("pipe", k), p.flowing || (g("pipe resume"), k.resume()), a
            };
            h.prototype.unpipe = function (a) {
                var b = this._readableState, d = {hasUnpiped: !1};
                if (0 === b.pipesCount) return this;
                if (1 === b.pipesCount) return a && a !== b.pipes ? this : (a || (a = b.pipes), b.pipes = null, b.pipesCount =
                    0, b.flowing = !1, a && a.emit("unpipe", this, d), this);
                if (!a) {
                    a = b.pipes;
                    var c = b.pipesCount;
                    b.pipes = null;
                    b.pipesCount = 0;
                    b.flowing = !1;
                    for (b = 0; b < c; b++) a[b].emit("unpipe", this, d);
                    return this
                }
                c = H(b.pipes, a);
                return -1 === c ? this : (b.pipes.splice(c, 1), --b.pipesCount, 1 === b.pipesCount && (b.pipes = b.pipes[0]), a.emit("unpipe", this, d), this)
            };
            h.prototype.on = function (a, d) {
                var c = F.prototype.on.call(this, a, d);
                if ("data" === a) !1 !== this._readableState.flowing && this.resume(); else if ("readable" === a) {
                    var g = this._readableState;
                    g.endEmitted ||
                    g.readableListening || (g.readableListening = g.needReadable = !0, g.emittedReadable = !1, g.reading ? g.length && e(this) : C(b, this))
                }
                return c
            };
            h.prototype.addListener = h.prototype.on;
            h.prototype.resume = function () {
                var a = this._readableState;
                return a.flowing || (g("resume"), a.flowing = !0, a.resumeScheduled || (a.resumeScheduled = !0, C(u, this, a))), this
            };
            h.prototype.pause = function () {
                return g("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (g("pause"), this._readableState.flowing = !1, this.emit("pause")),
                    this
            };
            h.prototype.wrap = function (a) {
                var b = this._readableState, d = !1, c = this, e;
                for (e in a.on("end", function () {
                    if (g("wrapped end"), b.decoder && !b.ended) {
                        var a = b.decoder.end();
                        a && a.length && c.push(a)
                    }
                    c.push(null)
                }), a.on("data", function (e) {
                    (g("wrapped data"), b.decoder && (e = b.decoder.write(e)), b.objectMode && null == e) || (b.objectMode || e && e.length) && (c.push(e) || (d = !0, a.pause()))
                }), a) void 0 === this[e] && "function" == typeof a[e] && (this[e] = function (b) {
                    return function () {
                        return a[b].apply(a, arguments)
                    }
                }(e));
                for (e = 0; e < M.length; e++) a.on(M[e],
                    c.emit.bind(c, M[e]));
                return c._read = function (b) {
                    g("wrapped _read", b);
                    d && (d = !1, a.resume())
                }, c
            };
            h._fromList = z
        }).call(this, c("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./_stream_duplex": 24,
        "./internal/streams/BufferList": 29,
        "./internal/streams/destroy": 30,
        "./internal/streams/stream": 31,
        _process: 22,
        "core-util-is": 4,
        events: 8,
        inherits: 10,
        isarray: 12,
        "process-nextick-args": 21,
        "safe-buffer": 36,
        "string_decoder/": 38,
        util: 2
    }],
    27: [function (c,
                   l, k) {
        function m(a) {
            this.afterTransform = function (d, c) {
                var e = a._transformState;
                e.transforming = !1;
                var f = e.writecb;
                f ? (e.writechunk = null, e.writecb = null, null != c && a.push(c), f(d), e = a._readableState, e.reading = !1, (e.needReadable || e.length < e.highWaterMark) && a._read(e.highWaterMark), e = void 0) : e = a.emit("error", Error("write callback called multiple times"));
                return e
            };
            this.transforming = this.needTransform = !1;
            this.writeencoding = this.writechunk = this.writecb = null
        }

        function a(c) {
            if (!(this instanceof a)) return new a(c);
            h.call(this, c);
            this._transformState = new m(this);
            var d = this;
            this._readableState.needReadable = !0;
            this._readableState.sync = !1;
            c && ("function" == typeof c.transform && (this._transform = c.transform), "function" == typeof c.flush && (this._flush = c.flush));
            this.once("prefinish", function () {
                "function" == typeof this._flush ? this._flush(function (a, c) {
                    p(d, a, c)
                }) : p(d)
            })
        }

        function p(a, d, c) {
            if (d) return a.emit("error", d);
            null != c && a.push(c);
            d = a._transformState;
            if (a._writableState.length) throw Error("Calling transform done when ws.length != 0");
            if (d.transforming) throw Error("Calling transform done when still transforming");
            return a.push(null)
        }

        l.exports = a;
        var h = c("./_stream_duplex");
        l = c("core-util-is");
        l.inherits = c("inherits");
        l.inherits(a, h);
        a.prototype.push = function (a, d) {
            return this._transformState.needTransform = !1, h.prototype.push.call(this, a, d)
        };
        a.prototype._transform = function (a, d, c) {
            throw Error("_transform() is not implemented");
        };
        a.prototype._write = function (a, d, c) {
            var e = this._transformState;
            (e.writecb = c, e.writechunk = a, e.writeencoding =
                d, e.transforming) || (a = this._readableState, (e.needTransform || a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark))
        };
        a.prototype._read = function (a) {
            a = this._transformState;
            null !== a.writechunk && a.writecb && !a.transforming ? (a.transforming = !0, this._transform(a.writechunk, a.writeencoding, a.afterTransform)) : a.needTransform = !0
        };
        a.prototype._destroy = function (a, d) {
            var c = this;
            h.prototype._destroy.call(this, a, function (a) {
                d(a);
                c.emit("close")
            })
        }
    }, {"./_stream_duplex": 24, "core-util-is": 4, inherits: 10}],
    28: [function (c, l, k) {
        (function (k, a) {
            function m(a) {
                var b = this;
                this.entry = this.next = null;
                this.finish = function () {
                    var d = b.entry;
                    for (b.entry = null; d;) {
                        var c = d.callback;
                        a.pendingcb--;
                        c(void 0);
                        d = d.next
                    }
                    a.corkedRequestsFree ? a.corkedRequestsFree.next = b : a.corkedRequestsFree = b;
                    !0
                }
            }

            function h() {
            }

            function f(a, d) {
                y = y || c("./_stream_duplex");
                a = a || {};
                this.objectMode = !!a.objectMode;
                d instanceof y && (this.objectMode = this.objectMode || !!a.writableObjectMode);
                var f = a.highWaterMark, h = this.objectMode ? 16 : 16384;
                this.highWaterMark =
                    f || 0 === f ? f : h;
                this.highWaterMark = Math.floor(this.highWaterMark);
                this.destroyed = this.finished = this.ended = this.ending = this.needDrain = this.finalCalled = !1;
                this.decodeStrings = !1 !== a.decodeStrings;
                this.defaultEncoding = a.defaultEncoding || "utf8";
                this.length = 0;
                this.writing = !1;
                this.corked = 0;
                this.sync = !0;
                this.bufferProcessing = !1;
                this.onwrite = function (a) {
                    var c = d._writableState, g = c.sync, f = c.writecb;
                    (h = c, h.writing = !1, h.writecb = null, h.length -= h.writelen, h.writelen = 0, a) ? (h = d, --c.pendingcb, g ? (u(f, a), u(b, h, c), h._writableState.errorEmitted =
                        true, h.emit("error", a)) : (f(a), h._writableState.errorEmitted = !0, h.emit("error", a), b(h, c))) : ((h = w(c)) || c.corked || c.bufferProcessing || !c.bufferedRequest || r(d, c), g ? z(e, d, c, h, f) : e(d, c, h, f));
                    var h;
                    !0
                };
                this.writecb = null;
                this.writelen = 0;
                this.lastBufferedRequest = this.bufferedRequest = null;
                this.pendingcb = 0;
                this.errorEmitted = this.prefinished = !1;
                this.bufferedRequestCount = 0;
                this.corkedRequestsFree = new m(this)
            }

            function d(a) {
                if (y = y || c("./_stream_duplex"), !(E.call(d, this) || this instanceof y)) return new d(a);
                this._writableState =
                    new f(a, this);
                this.writable = !0;
                a && ("function" == typeof a.write && (this._write = a.write), "function" == typeof a.writev && (this._writev = a.writev), "function" == typeof a.destroy && (this._destroy = a.destroy), "function" == typeof a["final"] && (this._final = a["final"]));
                H.call(this)
            }

            function x(a, b, d, c, e, f, h) {
                b.writelen = c;
                b.writecb = h;
                b.writing = !0;
                b.sync = !0;
                d ? a._writev(e, b.onwrite) : a._write(e, f, b.onwrite);
                b.sync = !1
            }

            function e(a, d, c, e) {
                c || 0 === d.length && d.needDrain && (d.needDrain = !1, a.emit("drain"));
                d.pendingcb--;
                e();
                b(a,
                    d)
            }

            function r(a, b) {
                b.bufferProcessing = !0;
                var d = b.bufferedRequest;
                if (a._writev && d && d.next) {
                    var c = Array(b.bufferedRequestCount), e = b.corkedRequestsFree;
                    e.entry = d;
                    for (var f = 0, h = !0; d;) c[f] = d, d.isBuf || (h = !1), d = d.next, f += 1;
                    c.allBuffers = h;
                    x(a, b, !0, b.length, c, "", e.finish);
                    b.pendingcb++;
                    b.lastBufferedRequest = null;
                    e.next ? (b.corkedRequestsFree = e.next, e.next = null) : b.corkedRequestsFree = new m(b)
                } else {
                    for (; d && (c = d.chunk, x(a, b, !1, b.objectMode ? 1 : c.length, c, d.encoding, d.callback), d = d.next, !b.writing);) ;
                    null === d && (b.lastBufferedRequest =
                        null)
                }
                b.bufferedRequestCount = 0;
                b.bufferedRequest = d;
                b.bufferProcessing = !1
            }

            function w(a) {
                return a.ending && 0 === a.length && null === a.bufferedRequest && !a.finished && !a.writing
            }

            function v(a, d) {
                a._final(function (c) {
                    d.pendingcb--;
                    c && a.emit("error", c);
                    d.prefinished = !0;
                    a.emit("prefinish");
                    b(a, d)
                })
            }

            function b(a, b) {
                var d = w(b);
                return d && (b.prefinished || b.finalCalled || ("function" == typeof a._final ? (b.pendingcb++, b.finalCalled = !0, u(v, a, b)) : (b.prefinished = !0, a.emit("prefinish"))), 0 === b.pendingcb && (b.finished = !0, a.emit("finish"))),
                    d
            }

            var u = c("process-nextick-args");
            l.exports = d;
            var y, z = !k.browser && -1 < ["v0.10", "v0.9."].indexOf(k.version.slice(0, 5)) ? setImmediate : u;
            d.WritableState = f;
            var G = c("core-util-is");
            G.inherits = c("inherits");
            var J = {deprecate: c("util-deprecate")}, H = c("./internal/streams/stream"), C = c("safe-buffer").Buffer,
                I = a.Uint8Array || function () {
                }, E, F = c("./internal/streams/destroy");
            $jscomp.initSymbol();
            $jscomp.initSymbol();
            $jscomp.initSymbol();
            $jscomp.initSymbol();
            $jscomp.initSymbol();
            G.inherits(d, H);
            f.prototype.getBuffer =
                function () {
                    for (var a = this.bufferedRequest, b = []; a;) b.push(a), a = a.next;
                    return b
                };
            (function () {
                try {
                    Object.defineProperty(f.prototype, "buffer", {
                        get: J.deprecate(function () {
                            return this.getBuffer()
                        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                    })
                } catch (D) {
                }
            })();
            "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (E = Function.prototype[Symbol.hasInstance], Object.defineProperty(d, Symbol.hasInstance, {
                value: function (a) {
                    return !!E.call(this,
                        a) || a && a._writableState instanceof f
                }
            })) : E = function (a) {
                return a instanceof this
            };
            d.prototype.pipe = function () {
                this.emit("error", Error("Cannot pipe, not readable"))
            };
            d.prototype.write = function (a, b, d) {
                var c, e, f, k, m, p;
                var l = this._writableState;
                var B = !1, z = (c = a, (C.isBuffer(c) || c instanceof I) && !l.objectMode);
                z && !C.isBuffer(a) && (e = a, a = C.from(e));
                "function" == typeof b && (d = b, b = null);
                z ? b = "buffer" : b || (b = l.defaultEncoding);
                "function" != typeof d && (d = h);
                if (l.ended) l = d, d = Error("write after end"), this.emit("error",
                    d), u(l, d); else if (z || (k = d, m = !0, p = !1, null === (f = a) ? p = new TypeError("May not write null values to stream") : "string" == typeof f || void 0 === f || l.objectMode || (p = new TypeError("Invalid non-string/buffer chunk")), p && (this.emit("error", p), u(k, p), m = !1), m)) l.pendingcb++, B = z, B || (c = a, l.objectMode || !1 === l.decodeStrings || "string" != typeof c || (c = C.from(c, b)), a !== c && (B = !0, b = "buffer", a = c)), e = l.objectMode ? 1 : a.length, l.length += e, (c = l.length < l.highWaterMark) || (l.needDrain = !0), l.writing || l.corked ? (e = l.lastBufferedRequest,
                    l.lastBufferedRequest = {
                        chunk: a,
                        encoding: b,
                        isBuf: B,
                        callback: d,
                        next: null
                    }, e ? e.next = l.lastBufferedRequest : l.bufferedRequest = l.lastBufferedRequest, l.bufferedRequestCount += 1) : x(this, l, !1, e, a, b, d), B = c;
                return B
            };
            d.prototype.cork = function () {
                this._writableState.corked++
            };
            d.prototype.uncork = function () {
                var a = this._writableState;
                a.corked && (a.corked--, a.writing || a.corked || a.finished || a.bufferProcessing || !a.bufferedRequest || r(this, a))
            };
            d.prototype.setDefaultEncoding = function (a) {
                if ("string" == typeof a && (a = a.toLowerCase()),
                    !(-1 < "hex utf8 utf-8 ascii binary base64 ucs2 ucs-2 utf16le utf-16le raw".split(" ").indexOf((a + "").toLowerCase()))) throw new TypeError("Unknown encoding: " + a);
                return this._writableState.defaultEncoding = a, this
            };
            d.prototype._write = function (a, b, d) {
                d(Error("_write() is not implemented"))
            };
            d.prototype._writev = null;
            d.prototype.end = function (a, d, c) {
                var e = this._writableState;
                "function" == typeof a ? (c = a, a = null, d = null) : "function" == typeof d && (c = d, d = null);
                null != a && this.write(a, d);
                e.corked && (e.corked = 1, this.uncork());
                e.ending || e.finished || (a = c, e.ending = !0, b(this, e), a && (e.finished ? u(a) : this.once("finish", a)), e.ended = !0, this.writable = !1)
            };
            Object.defineProperty(d.prototype, "destroyed", {
                get: function () {
                    return void 0 !== this._writableState && this._writableState.destroyed
                }, set: function (a) {
                    this._writableState && (this._writableState.destroyed = a)
                }
            });
            d.prototype.destroy = F.destroy;
            d.prototype._undestroy = F.undestroy;
            d.prototype._destroy = function (a, b) {
                this.end();
                b(a)
            }
        }).call(this, c("_process"), "undefined" != typeof global ? global :
            "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./_stream_duplex": 24,
        "./internal/streams/destroy": 30,
        "./internal/streams/stream": 31,
        _process: 22,
        "core-util-is": 4,
        inherits: 10,
        "process-nextick-args": 21,
        "safe-buffer": 36,
        "util-deprecate": 39
    }],
    29: [function (c, l, k) {
        var m = c("safe-buffer").Buffer;
        l.exports = function () {
            function a() {
                if (!(this instanceof a)) throw new TypeError("Cannot call a class as a function");
                !0;
                this.tail = this.head = null;
                this.length = 0
            }

            return a.prototype.push = function (a) {
                a =
                    {data: a, next: null};
                0 < this.length ? this.tail.next = a : this.head = a;
                this.tail = a;
                ++this.length
            }, a.prototype.unshift = function (a) {
                a = {data: a, next: this.head};
                0 === this.length && (this.tail = a);
                this.head = a;
                ++this.length
            }, a.prototype.shift = function () {
                if (0 !== this.length) {
                    var a = this.head.data;
                    return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, a
                }
            }, a.prototype.clear = function () {
                this.head = this.tail = null;
                this.length = 0
            }, a.prototype.join = function (a) {
                if (0 === this.length) return "";
                for (var c =
                    this.head, f = "" + c.data; c = c.next;) f += a + c.data;
                return f
            }, a.prototype.concat = function (a) {
                if (0 === this.length) return m.alloc(0);
                if (1 === this.length) return this.head.data;
                for (var c, f, d = m.allocUnsafe(a >>> 0), k = this.head, e = 0; k;) a = k.data, c = d, f = e, a.copy(c, f), e += k.data.length, k = k.next;
                return d
            }, a
        }()
    }, {"safe-buffer": 36}],
    30: [function (c, l, k) {
        function m(a, c) {
            a.emit("error", c)
        }

        var a = c("process-nextick-args");
        l.exports = {
            destroy: function (c, h) {
                var f = this, d = this._writableState && this._writableState.destroyed;
                this._readableState &&
                this._readableState.destroyed || d ? h ? h(c) : !c || this._writableState && this._writableState.errorEmitted || a(m, this, c) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(c || null, function (d) {
                    !h && d ? (a(m, f, d), f._writableState && (f._writableState.errorEmitted = !0)) : h && h(d)
                }))
            }, undestroy: function () {
                this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted =
                    false);
                this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
            }
        }
    }, {"process-nextick-args": 21}],
    31: [function (c, l, k) {
        l.exports = c("events").EventEmitter
    }, {events: 8}],
    32: [function (c, l, k) {
        l.exports = c("./readable").PassThrough
    }, {"./readable": 33}],
    33: [function (c, l, k) {
        (k = l.exports = c("./lib/_stream_readable.js")).Stream = k;
        k.Readable = k;
        k.Writable = c("./lib/_stream_writable.js");
        k.Duplex =
            c("./lib/_stream_duplex.js");
        k.Transform = c("./lib/_stream_transform.js");
        k.PassThrough = c("./lib/_stream_passthrough.js")
    }, {
        "./lib/_stream_duplex.js": 24,
        "./lib/_stream_passthrough.js": 25,
        "./lib/_stream_readable.js": 26,
        "./lib/_stream_transform.js": 27,
        "./lib/_stream_writable.js": 28
    }],
    34: [function (c, l, k) {
        l.exports = c("./readable").Transform
    }, {"./readable": 33}],
    35: [function (c, l, k) {
        l.exports = c("./lib/_stream_writable.js")
    }, {"./lib/_stream_writable.js": 28}],
    36: [function (c, l, k) {
        function m(a, d) {
            for (var c in a) d[c] =
                a[c]
        }

        function a(a, d, c) {
            return h(a, d, c)
        }

        var p = c("buffer"), h = p.Buffer;
        h.from && h.alloc && h.allocUnsafe && h.allocUnsafeSlow ? l.exports = p : (m(p, k), k.Buffer = a);
        m(h, a);
        a.from = function (a, d, c) {
            if ("number" == typeof a) throw new TypeError("Argument must not be a number");
            return h(a, d, c)
        };
        a.alloc = function (a, d, c) {
            if ("number" != typeof a) throw new TypeError("Argument must be a number");
            a = h(a);
            return void 0 !== d ? "string" == typeof c ? a.fill(d, c) : a.fill(d) : a.fill(0), a
        };
        a.allocUnsafe = function (a) {
            if ("number" != typeof a) throw new TypeError("Argument must be a number");
            return h(a)
        };
        a.allocUnsafeSlow = function (a) {
            if ("number" != typeof a) throw new TypeError("Argument must be a number");
            return p.SlowBuffer(a)
        }
    }, {buffer: 3}],
    37: [function (c, l, k) {
        function m() {
            a.call(this)
        }

        l.exports = m;
        var a = c("events").EventEmitter;
        c("inherits")(m, a);
        m.Readable = c("readable-stream/readable.js");
        m.Writable = c("readable-stream/writable.js");
        m.Duplex = c("readable-stream/duplex.js");
        m.Transform = c("readable-stream/transform.js");
        m.PassThrough = c("readable-stream/passthrough.js");
        m.Stream = m;
        m.prototype.pipe =
            function (c, h) {
                function f(a) {
                    c.writable && !1 === c.write(a) && p.pause && p.pause()
                }

                function d() {
                    p.readable && p.resume && p.resume()
                }

                function k() {
                    b || (b = !0, c.end())
                }

                function e() {
                    b || (b = !0, "function" == typeof c.destroy && c.destroy())
                }

                function m(b) {
                    if (l(), 0 === a.listenerCount(this, "error")) throw b;
                }

                function l() {
                    p.removeListener("data", f);
                    c.removeListener("drain", d);
                    p.removeListener("end", k);
                    p.removeListener("close", e);
                    p.removeListener("error", m);
                    c.removeListener("error", m);
                    p.removeListener("end", l);
                    p.removeListener("close",
                        l);
                    c.removeListener("close", l)
                }

                var p = this;
                p.on("data", f);
                c.on("drain", d);
                c._isStdio || h && !1 === h.end || (p.on("end", k), p.on("close", e));
                var b = !1;
                return p.on("error", m), c.on("error", m), p.on("end", l), p.on("close", l), c.on("close", l), c.emit("pipe", p), c
            }
    }, {
        events: 8,
        inherits: 10,
        "readable-stream/duplex.js": 23,
        "readable-stream/passthrough.js": 32,
        "readable-stream/readable.js": 33,
        "readable-stream/transform.js": 34,
        "readable-stream/writable.js": 35
    }],
    38: [function (c, l, k) {
        function m(a) {
            switch (this.encoding = function (a) {
                var b =
                    function (a) {
                        if (!a) return "utf8";
                        for (var b; ;) switch (a) {
                            case "utf8":
                            case "utf-8":
                                return "utf8";
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return "utf16le";
                            case "latin1":
                            case "binary":
                                return "latin1";
                            case "base64":
                            case "ascii":
                            case "hex":
                                return a;
                            default:
                                if (b) return;
                                a = ("" + a).toLowerCase();
                                b = !0
                        }
                    }(a);
                if ("string" != typeof b && (w.isEncoding === v || !v(a))) throw Error("Unknown encoding: " + a);
                return b || a
            }(a), this.encoding) {
                case "utf16le":
                    this.text = h;
                    this.end = f;
                    a = 4;
                    break;
                case "utf8":
                    this.fillLast = p;
                    a = 4;
                    break;
                case "base64":
                    this.text = d;
                    this.end = x;
                    a = 3;
                    break;
                default:
                    return this.write = e, void (this.end = r)
            }
            this.lastTotal = this.lastNeed = 0;
            this.lastChar = w.allocUnsafe(a)
        }

        function a(a) {
            return 127 >= a ? 0 : 6 == a >> 5 ? 2 : 14 == a >> 4 ? 3 : 30 == a >> 3 ? 4 : -1
        }

        function p(a) {
            var b = this.lastTotal - this.lastNeed;
            a:if (128 != (192 & a[0])) var d = (this.lastNeed = 0, "\ufffd".repeat(b)); else {
                if (1 < this.lastNeed && 1 < a.length) {
                    if (128 != (192 & a[1])) {
                        d = (this.lastNeed = 1, "\ufffd".repeat(b + 1));
                        break a
                    }
                    if (2 < this.lastNeed && 2 < a.length && 128 != (192 & a[2])) {
                        d = (this.lastNeed =
                            2, "\ufffd".repeat(b + 2));
                        break a
                    }
                }
                d = void 0
            }
            return void 0 !== d ? d : this.lastNeed <= a.length ? (a.copy(this.lastChar, b, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (a.copy(this.lastChar, b, 0, a.length), void (this.lastNeed -= a.length))
        }

        function h(a, d) {
            if (0 == (a.length - d) % 2) {
                var b = a.toString("utf16le", d);
                if (b) {
                    var c = b.charCodeAt(b.length - 1);
                    if (55296 <= c && 56319 >= c) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = a[a.length - 2], this.lastChar[1] = a[a.length - 1], b.slice(0, -1)
                }
                return b
            }
            return this.lastNeed =
                1, this.lastTotal = 2, this.lastChar[0] = a[a.length - 1], a.toString("utf16le", d, a.length - 1)
        }

        function f(a) {
            a = a && a.length ? this.write(a) : "";
            return this.lastNeed ? a + this.lastChar.toString("utf16le", 0, this.lastTotal - this.lastNeed) : a
        }

        function d(a, d) {
            var b = (a.length - d) % 3;
            return 0 === b ? a.toString("base64", d) : (this.lastNeed = 3 - b, this.lastTotal = 3, 1 === b ? this.lastChar[0] = a[a.length - 1] : (this.lastChar[0] = a[a.length - 2], this.lastChar[1] = a[a.length - 1]), a.toString("base64", d, a.length - b))
        }

        function x(a) {
            a = a && a.length ? this.write(a) :
                "";
            return this.lastNeed ? a + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : a
        }

        function e(a) {
            return a.toString(this.encoding)
        }

        function r(a) {
            return a && a.length ? this.write(a) : ""
        }

        var w = c("safe-buffer").Buffer, v = w.isEncoding || function (a) {
            switch ((a = "" + a) && a.toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                case "raw":
                    returntrue;
                default:
                    returnfalse
            }
        };
        k.StringDecoder = m;
        m.prototype.write = function (a) {
            if (0 === a.length) return "";
            var b;
            if (this.lastNeed) {
                if (void 0 === (b = this.fillLast(a))) return "";
                var d = this.lastNeed;
                this.lastNeed = 0
            } else d = 0;
            return d < a.length ? b ? b + this.text(a, d) : this.text(a, d) : b || ""
        };
        m.prototype.end = function (a) {
            a = a && a.length ? this.write(a) : "";
            return this.lastNeed ? a + "\ufffd".repeat(this.lastTotal - this.lastNeed) : a
        };
        m.prototype.text = function (b, d) {
            var c = b.length - 1;
            if (c < d) c = 0; else {
                var e = a(b[c]);
                c = 0 <= e ? (0 < e && (this.lastNeed = e - 1), e) : --c < d ? 0 : 0 <= (e = a(b[c])) ? (0 < e && (this.lastNeed = e - 2), e) : --c < d ? 0 : 0 <= (e = a(b[c])) ? (0 < e && (2 ===
                e ? e = 0 : this.lastNeed = e - 3), e) : 0
            }
            if (!this.lastNeed) return b.toString("utf8", d);
            this.lastTotal = c;
            e = b.length - (c - this.lastNeed);
            return b.copy(this.lastChar, 0, e), b.toString("utf8", d, e)
        };
        m.prototype.fillLast = function (a) {
            if (this.lastNeed <= a.length) return a.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
            a.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, a.length);
            this.lastNeed -= a.length
        }
    }, {"safe-buffer": 36}],
    39: [function (c, l, k) {
        (function (c) {
            function a(a) {
                try {
                    if (!c.localStorage) returnfalse
                } catch (h) {
                    returnfalse
                }
                a =
                    c.localStorage[a];
                return null != a && "true" === String(a).toLowerCase()
            }

            l.exports = function (c, h) {
                if (a("noDeprecation")) return c;
                var f = !1;
                return function () {
                    if (!f) {
                        if (a("throwDeprecation")) throw Error(h);
                        a("traceDeprecation") ? console.trace(h) : console.warn(h);
                        f = !0
                    }
                    return c.apply(this, arguments)
                }
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    40: [function (c, l, k) {
        arguments[4][10][0].apply(k, arguments)
    }, {dup: 10}],
    41: [function (c, l, k) {
        l.exports =
            function (c) {
                return c && "object" == typeof c && "function" == typeof c.copy && "function" == typeof c.fill && "function" == typeof c.readUInt8
            }
    }, {}],
    42: [function (c, l, k) {
        (function (l, a) {
            function m(a, b) {
                var c = {seen: [], stylize: f};
                return 3 <= arguments.length && (c.depth = arguments[2]), 4 <= arguments.length && (c.colors = arguments[3]), w(b) ? c.showHidden = b : b && k._extend(c, b), u(c.showHidden) && (c.showHidden = !1), u(c.depth) && (c.depth = 2), u(c.colors) && (c.colors = !1), u(c.customInspect) && (c.customInspect = !0), c.colors && (c.stylize = h), d(c, a,
                    c.depth)
            }

            function h(a, b) {
                var d = m.styles[b];
                return d ? "\u001b[" + m.colors[d][0] + "m" + a + "\u001b[" + m.colors[d][1] + "m" : a
            }

            function f(a, b) {
                return a
            }

            function d(a, c, f) {
                if (a.customInspect && c && H(c.inspect) && c.inspect !== k.inspect && (!c.constructor || c.constructor.prototype !== c)) {
                    var g = c.inspect(f, a);
                    return b(g) || (g = d(a, g, f)), g
                }
                var h = function (a, d) {
                    if (u(d)) return a.stylize("undefined", "undefined");
                    if (b(d)) {
                        var c = "" + JSON.stringify(d).replace(/^"|"$/g, "").replace(/'/g, "'").replace(/\\"/g, '"');
                        return a.stylize(c, "string")
                    }
                    if (v(d)) return a.stylize("" +
                        d, "number");
                    if (w(d)) return a.stylize("" + d, "boolean");
                    if (null === d) return a.stylize("null", "null")
                }(a, c);
                if (h) return h;
                var l;
                h = Object.keys(c);
                var m = (l = {}, h.forEach(function (a, b) {
                    l[a] = !0
                }), l);
                if (a.showHidden && (h = Object.getOwnPropertyNames(c)), J(c) && (0 <= h.indexOf("message") || 0 <= h.indexOf("description"))) return x(c);
                if (0 === h.length) {
                    if (H(c)) return a.stylize("[Function" + (c.name ? ": " + c.name : "") + "]", "special");
                    if (y(c)) return a.stylize(RegExp.prototype.toString.call(c), "regexp");
                    if (G(c)) return a.stylize(Date.prototype.toString.call(c),
                        "date");
                    if (J(c)) return x(c)
                }
                var p = "", B = !1, z = ["{", "}"];
                (r(c) && (B = !0, z = ["[", "]"]), H(c)) && (p = " [Function" + (c.name ? ": " + c.name : "") + "]");
                return y(c) && (p = " " + RegExp.prototype.toString.call(c)), G(c) && (p = " " + Date.prototype.toUTCString.call(c)), J(c) && (p = " " + x(c)), 0 !== h.length || B && 0 != c.length ? 0 > f ? y(c) ? a.stylize(RegExp.prototype.toString.call(c), "regexp") : a.stylize("[Object]", "special") : (a.seen.push(c), g = B ? function (a, b, d, c, g) {
                    for (var f = [], h = 0, k = b.length; h < k; ++h) Object.prototype.hasOwnProperty.call(b, String(h)) ?
                        f.push(e(a, b, d, c, String(h), !0)) : f.push("");
                    return g.forEach(function (g) {
                        g.match(/^\d+$/) || f.push(e(a, b, d, c, g, !0))
                    }), f
                }(a, c, f, m, h) : h.map(function (b) {
                    return e(a, c, f, m, b, B)
                }), a.seen.pop(), function (a, b, d) {
                    return 60 < a.reduce(function (a, b) {
                        return 0, 0 <= b.indexOf("") && 0, a + b.replace(/\u001b\[\d\d?m/g, "").length + 1
                    }, 0) ? d[0] + ("" === b ? "" : b + "") + " " + a.join(",") + " " + d[1] : d[0] + b + " " + a.join(", ") + " " + d[1]
                }(g, p, z)) : z[0] + p + z[1]
            }

            function x(a) {
                return "[" + Error.prototype.toString.call(a) + "]"
            }

            function e(a, b, c, e, f, h) {
                var g,
                    k, l;
                if ((l = Object.getOwnPropertyDescriptor(b, f) || {value: b[f]}).get ? k = l.set ? a.stylize("[Getter/Setter]", "special") : a.stylize("[Getter]", "special") : l.set && (k = a.stylize("[Setter]", "special")), Object.prototype.hasOwnProperty.call(e, f) || (g = "[" + f + "]"), k || (0 > a.seen.indexOf(l.value) ? -1 < (k = null === c ? d(a, l.value, null) : d(a, l.value, c - 1)).indexOf("") && (k = h ? k.split("").map(function (a) {
                    return "  " + a
                }).join("").substr(2) : "" + k.split("").map(function (a) {
                    return "   " + a
                }).join("")) : k = a.stylize("[Circular]", "special")), u(g)) {
                    if (h &&
                        f.match(/^\d+$/)) return k;
                    (g = JSON.stringify("" + f)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (g = g.substr(1, g.length - 2), g = a.stylize(g, "name")) : (g = g.replace(/'/g, "'").replace(/\\"/g, '"').replace(/(^"|"$)/g, ""), g = a.stylize(g, "string"))
                }
                return g + ": " + k
            }

            function r(a) {
                return Array.isArray(a)
            }

            function w(a) {
                return "boolean" == typeof a
            }

            function v(a) {
                return "number" == typeof a
            }

            function b(a) {
                return "string" == typeof a
            }

            function u(a) {
                return void 0 === a
            }

            function y(a) {
                return z(a) && "[object RegExp]" === Object.prototype.toString.call(a)
            }

            function z(a) {
                return "object" == typeof a && null !== a
            }

            function G(a) {
                return z(a) && "[object Date]" === Object.prototype.toString.call(a)
            }

            function J(a) {
                return z(a) && ("[object Error]" === Object.prototype.toString.call(a) || a instanceof Error)
            }

            function H(a) {
                return "function" == typeof a
            }

            function C(a) {
                return 10 > a ? "0" + a.toString(10) : a.toString(10)
            }

            var I = /%[sdj%]/g;
            k.format = function (a) {
                if (!b(a)) {
                    for (var d = [], c = 0; c < arguments.length; c++) d.push(m(arguments[c]));
                    return d.join(" ")
                }
                c = 1;
                var e = arguments, f = e.length;
                d = String(a).replace(I,
                    function (a) {
                        if ("%%" === a) return "%";
                        if (c >= f) return a;
                        switch (a) {
                            case "%s":
                                return String(e[c++]);
                            case "%d":
                                return Number(e[c++]);
                            case "%j":
                                try {
                                    return JSON.stringify(e[c++])
                                } catch (A) {
                                    return "[Circular]"
                                }
                            default:
                                return a
                        }
                    });
                for (var h = e[c]; c < f; h = e[++c]) null !== h && z(h) ? d += " " + m(h) : d += " " + h;
                return d
            };
            k.deprecate = function (b, d) {
                if (u(a.process)) return function () {
                    return k.deprecate(b, d).apply(this, arguments)
                };
                if (!0 === l.noDeprecation) return b;
                var c = !1;
                return function () {
                    if (!c) {
                        if (l.throwDeprecation) throw Error(d);
                        l.traceDeprecation ? console.trace(d) : console.error(d);
                        c = !0
                    }
                    return b.apply(this, arguments)
                }
            };
            var E, F = {};
            k.debuglog = function (a) {
                if (u(E) && (E = l.env.NODE_DEBUG || ""), a = a.toUpperCase(), !F[a]) if ((new RegExp("\b" + a + "\b", "i")).test(E)) {
                    var b = l.pid;
                    F[a] = function () {
                        var d = k.format.apply(k, arguments);
                        console.error("%s %d: %s", a, b, d)
                    }
                } else F[a] = function () {
                };
                return F[a]
            };
            k.inspect = m;
            m.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
            };
            m.styles = {
                special: "cyan",
                number: "yellow",
                "boolean": "yellow",
                undefined: "grey",
                "null": "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            };
            k.isArray = r;
            k.isBoolean = w;
            k.isNull = function (a) {
                return null === a
            };
            k.isNullOrUndefined = function (a) {
                return null == a
            };
            k.isNumber = v;
            k.isString = b;
            k.isSymbol = function (a) {
                return "symbol" == typeof a
            };
            k.isUndefined = u;
            k.isRegExp = y;
            k.isObject = z;
            k.isDate = G;
            k.isError = J;
            k.isFunction = H;
            k.isPrimitive = function (a) {
                return null === a ||
                    "boolean" == typeof a || "number" == typeof a || "string" == typeof a || "symbol" == typeof a || void 0 === a
            };
            k.isBuffer = c("./support/isBuffer");
            var D = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
            k.log = function () {
                var a, b;
                console.log("%s - %s", (a = new Date, b = [C(a.getHours()), C(a.getMinutes()), C(a.getSeconds())].join(":"), [a.getDate(), D[a.getMonth()], b].join(" ")), k.format.apply(k, arguments))
            };
            k.inherits = c("inherits");
            k._extend = function (a, b) {
                if (!b || !z(b)) return a;
                for (var d = Object.keys(b), c = d.length; c--;) a[d[c]] =
                    b[d[c]];
                return a
            }
        }).call(this, c("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {"./support/isBuffer": 41, _process: 22, inherits: 40}],
    43: [function (c, l, k) {
        arguments[4][5][0].apply(k, arguments)
    }, {"./lib/uint32": 44, "./lib/uint64": 45, dup: 5}],
    44: [function (c, l, k) {
        arguments[4][6][0].apply(k, arguments)
    }, {dup: 6}],
    45: [function (c, l, k) {
        arguments[4][7][0].apply(k, arguments)
    }, {dup: 7}],
    46: [function (c, l, k) {
        (function (k) {
            !function (a) {
                function m() {
                    return 2 ==
                    arguments.length ? (new m(arguments[1])).update(arguments[0]).digest() : this instanceof m ? void h.call(this, arguments[0]) : new m(arguments[0])
                }

                function h(a) {
                    return this.seed = a instanceof f ? a.clone() : f(a), this.v1 = this.seed.clone().add(v), this.v2 = this.seed.clone().add(x), this.v3 = this.seed.clone(), this.v4 = this.seed.clone().subtract(d), this.total_len = 0, this.memsize = 0, this.memory = null, this
                }

                var f = c("cuint").UINT32;
                f.prototype.xxh_update = function (a, c) {
                    var b, e = x._low, f = x._high;
                    var h = (b = a * e) >>> 16;
                    h = h + c * e & 65535;
                    h += a * f;
                    var k = this._low + (65535 & b);
                    h = (k >>> 16) + (this._high + (65535 & h)) << 16 | 65535 & k;
                    f = (h = h << 13 | h >>> 19) >>> 16;
                    h = (b = (k = 65535 & h) * (e = d._low)) >>> 16;
                    h += f * e;
                    h &= 65535;
                    h += k * d._high;
                    this._low = 65535 & b;
                    this._high = 65535 & h
                };
                var d = f("2654435761"), x = f("2246822519"), e = f("3266489917"), r = f("668265263"),
                    w = f("374761393"), v = d.clone().add(x);
                m.prototype.init = h;
                m.prototype.update = function (a) {
                    var b = "string" == typeof a;
                    if (b) {
                        var d = [];
                        b = 0;
                        for (var c = a.length; b < c; b++) {
                            var e = a.charCodeAt(b);
                            128 > e ? d.push(e) : 2048 > e ? d.push(192 | e >> 6, 128 |
                                63 & e) : 55296 > e || 57344 <= e ? d.push(224 | e >> 12, 128 | e >> 6 & 63, 128 | 63 & e) : (b++, e = 65536 + ((1023 & e) << 10 | 1023 & a.charCodeAt(b)), d.push(240 | e >> 18, 128 | e >> 12 & 63, 128 | e >> 6 & 63, 128 | 63 & e))
                        }
                        a = new Uint8Array(d);
                        b = !1;
                        d = !0
                    }
                    "undefined" != typeof ArrayBuffer && a instanceof ArrayBuffer && (d = !0, a = new Uint8Array(a));
                    c = 0;
                    var f = a.length;
                    e = c + f;
                    if (0 == f) return this;
                    if (this.total_len += f, 0 == this.memsize && (this.memory = b ? "" : d ? new Uint8Array(16) : new k(16)), 16 > this.memsize + f) return b ? this.memory += a : d ? this.memory.set(a.subarray(0, f), this.memsize) :
                        a.copy(this.memory, this.memsize, 0, f), this.memsize += f, this;
                    0 < this.memsize && (b ? this.memory += a.slice(0, 16 - this.memsize) : d ? this.memory.set(a.subarray(0, 16 - this.memsize), this.memsize) : a.copy(this.memory, this.memsize, 0, 16 - this.memsize), f = 0, b ? (this.v1.xxh_update(this.memory.charCodeAt(f + 1) << 8 | this.memory.charCodeAt(f), this.memory.charCodeAt(f + 3) << 8 | this.memory.charCodeAt(f + 2)), f += 4, this.v2.xxh_update(this.memory.charCodeAt(f + 1) << 8 | this.memory.charCodeAt(f), this.memory.charCodeAt(f + 3) << 8 | this.memory.charCodeAt(f +
                        2)), f += 4, this.v3.xxh_update(this.memory.charCodeAt(f + 1) << 8 | this.memory.charCodeAt(f), this.memory.charCodeAt(f + 3) << 8 | this.memory.charCodeAt(f + 2)), f += 4, this.v4.xxh_update(this.memory.charCodeAt(f + 1) << 8 | this.memory.charCodeAt(f), this.memory.charCodeAt(f + 3) << 8 | this.memory.charCodeAt(f + 2))) : (this.v1.xxh_update(this.memory[f + 1] << 8 | this.memory[f], this.memory[f + 3] << 8 | this.memory[f + 2]), f += 4, this.v2.xxh_update(this.memory[f + 1] << 8 | this.memory[f], this.memory[f + 3] << 8 | this.memory[f + 2]), f += 4, this.v3.xxh_update(this.memory[f +
                    1] << 8 | this.memory[f], this.memory[f + 3] << 8 | this.memory[f + 2]), f += 4, this.v4.xxh_update(this.memory[f + 1] << 8 | this.memory[f], this.memory[f + 3] << 8 | this.memory[f + 2])), c += 16 - this.memsize, this.memsize = 0, b && (this.memory = ""));
                    if (c <= e - 16) {
                        f = e - 16;
                        do b ? (this.v1.xxh_update(a.charCodeAt(c + 1) << 8 | a.charCodeAt(c), a.charCodeAt(c + 3) << 8 | a.charCodeAt(c + 2)), c += 4, this.v2.xxh_update(a.charCodeAt(c + 1) << 8 | a.charCodeAt(c), a.charCodeAt(c + 3) << 8 | a.charCodeAt(c + 2)), c += 4, this.v3.xxh_update(a.charCodeAt(c + 1) << 8 | a.charCodeAt(c), a.charCodeAt(c +
                            3) << 8 | a.charCodeAt(c + 2)), c += 4, this.v4.xxh_update(a.charCodeAt(c + 1) << 8 | a.charCodeAt(c), a.charCodeAt(c + 3) << 8 | a.charCodeAt(c + 2))) : (this.v1.xxh_update(a[c + 1] << 8 | a[c], a[c + 3] << 8 | a[c + 2]), c += 4, this.v2.xxh_update(a[c + 1] << 8 | a[c], a[c + 3] << 8 | a[c + 2]), c += 4, this.v3.xxh_update(a[c + 1] << 8 | a[c], a[c + 3] << 8 | a[c + 2]), c += 4, this.v4.xxh_update(a[c + 1] << 8 | a[c], a[c + 3] << 8 | a[c + 2])), c += 4; while (c <= f)
                    }
                    return c < e && (b ? this.memory += a.slice(c) : d ? this.memory.set(a.subarray(c, e), this.memsize) : a.copy(this.memory, this.memsize, c, e), this.memsize =
                        e - c), this
                };
                m.prototype.digest = function () {
                    var a, c, h = this.memory, k = "string" == typeof h, l = 0, m = this.memsize, p = new f;
                    for ((a = 16 <= this.total_len ? this.v1.rotl(1).add(this.v2.rotl(7).add(this.v3.rotl(12).add(this.v4.rotl(18)))) : this.seed.add(w)).add(p.fromNumber(this.total_len)); l <= m - 4;) k ? p.fromBits(h.charCodeAt(l + 1) << 8 | h.charCodeAt(l), h.charCodeAt(l + 3) << 8 | h.charCodeAt(l + 2)) : p.fromBits(h[l + 1] << 8 | h[l], h[l + 3] << 8 | h[l + 2]), a.add(p.multiply(e)).rotl(17).multiply(r), l += 4;
                    for (; l < m;) p.fromBits(k ? h.charCodeAt(l++) : h[l++],
                        0), a.add(p.multiply(w)).rotl(11).multiply(d);
                    return c = a.clone().shiftRight(15), a.xor(c).multiply(x), c = a.clone().shiftRight(13), a.xor(c).multiply(e), c = a.clone().shiftRight(16), a.xor(c), this.init(this.seed), a
                };
                "undefined" != typeof define && define.amd ? define([], function () {
                    return m
                }) : void 0 !== l && l.exports ? l.exports = m : a.XXH = m
            }(this)
        }).call(this, c("buffer").Buffer)
    }, {buffer: 3, cuint: 43}],
    47: [thelegendmodproject, {buffer: 3, lz4: 18}]
};
t();
