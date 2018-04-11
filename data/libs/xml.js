!function (t) { "object" == typeof exports && "object" == typeof module ? t(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], t) : t(CodeMirror) }(function (t) {
    "use strict"; t.defineMode("xml", function (e, n) {
        function r(t, e) {
            function n(n) { return e.tokenize = n, n(t, e) }
            var r = t.next();

            if ("<" == r) return t.eat("!") ? t.eat("[") ? t.match("CDATA[") ? n(i("atom", "]]>")) : null : t.match("-") ? n(i("comment", "->")) : t.match("DOCTYPE", !0, !0) ? (t.eatWhile(/[\w\._\-]/),
            n(l(1))) : null : t.eat("?") ? (t.eatWhile(/[\w\._\-]/),
            e.tokenize = i("meta", "?>"),
            "meta") : (z = t.eat("/") ? "closeTagBlog" : "openTagBlog", e.tokenize = o, "tag bracket");

            if ("&" == r) {
                var a; return a = t.eat("#") ? t.eat("x") ? t.eatWhile(/[a-fA-F\d]/) && t.eat(";") : t.eatWhile(/[\d]/) && t.eat(";") : t.eatWhile(/[\w\.\-:]/) && t.eat(";"),
                a ? "atom" : "error"
            }
            return t.eatWhile(/[^&<]/),
            null
        }
        function o(t, e) {
            var n = t.next();

            if (">" == n || "/" == n && t.eat(">")) return e.tokenize = r, z = ">" == n ? "endTagBlog" : "selfcloseTagBlog", "tag bracket";
            if ("=" == n) return z = "equals", null;
            if ("<" == n) {
                e.tokenize = r, e.state = f, e.tagName = e.tagStart = null; var o = e.tokenize(t, e);
                return o ? o + " tag error" : "tag error"
            }
            return /[\'\"]/.test(n) ? (e.tokenize = a(n),
            e.stringStartCol = t.column(),
            e.tokenize(t, e)) : (t.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),
            "word")
        }
        function a(t) {
            var e = function (e, n) {
                for (; !e.eol() ;
                )
                    if (e.next() == t) { n.tokenize = o; break }
                return "string"
            };
            return e.isInAttribute = !0, e
        }
        function i(t, e) {
            return function (n, o) {
                for (; !n.eol() ;
                ) {
                    if (n.match(e)) { o.tokenize = r; break }
                    n.next()
                }
                return t
            }
        }
        function l(t) {
            return function (e, n) {
                for (var o; null != (o = e.next()) ;
                ) {
                    if ("<" == o) return n.tokenize = l(t + 1),
                    n.tokenize(e, n);

                    if (">" == o) {
                        if (1 == t) { n.tokenize = r; break }
                        return n.tokenize = l(t - 1),
                        n.tokenize(e, n)
                    }
                }
                return "meta"
            }
        }
        function u(t, e, n) { this.prev = t.context, this.tagName = e, this.indent = t.indented, this.startOfLine = n, (T.doNotIndent.hasOwnProperty(e) || t.context && t.context.noIndent) && (this.noIndent = !0) }
        function d(t) { t.context && (t.context = t.context.prev) }
        function c(t, e) {
            for (var n; ;) {
                if (!t.context) return;
                if (n = t.context.tagName, !T.contextGrabbers.hasOwnProperty(n) || !T.contextGrabbers[n].hasOwnProperty(e)) return; d(t)
            }
        }
        function f(t, e, n) {
            return "openTagBlog" == t ? (n.tagStart = e.column(),
            s) : "closeTagBlog" == t ? m : f
        }
        function s(t, e, n) {
            return "word" == t ? (n.tagName = e.current(),
            N = "tag", h) : (N = "error", s)
        }
        function m(t, e, n) {
            if ("word" == t) {
                var r = e.current();
                return n.context && n.context.tagName != r && T.implicitlyClosed.hasOwnProperty(n.context.tagName) && d(n),
                n.context && n.context.tagName == r ? (N = "tag", g) : (N = "tag error", p)
            }
            return N = "error", p
        }
        function g(t, e, n) {
            return "endTagBlog" != t ? (N = "error", g) : (d(n),
            f)
        }
        function p(t, e, n) { return N = "error", g(t, e, n) }
        function h(t, e, n) {
            if ("word" == t) return N = "attribute", x;
            if ("endTagBlog" == t || "selfcloseTagBlog" == t) {
                var r = n.tagName, o = n.tagStart; return n.tagName = n.tagStart = null, "selfcloseTagBlog" == t || T.autoSelfClosers.hasOwnProperty(r) ? c(n, r) : (c(n, r),
                n.context = new u(n, r, o == n.indented)),
                f
            }
            return N = "error", h
        }
        function x(t, e, n) {
            return "equals" == t ? b : (T.allowMissing || (N = "error"),
            h(t, e, n))
        }
        function b(t, e, n) { return "string" == t ? k : "word" == t && T.allowUnquoted ? (N = "string", h) : (N = "error", h(t, e, n)) }
        function k(t, e, n) { return "string" == t ? k : h(t, e, n) }
        var w = e.indentUnit, v = n.multilineTagBlogIndentFactor || 1, y = n.multilineTagBlogIndentPastTagBlog; null == y && (y = !0);
        var z, N, T = n.htmlMode ? {
            autoSelfClosers: { area: !0, base: !0, br: !0, col: !0, command: !0, embed: !0, frame: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0, menuitem: !0 },
            implicitlyClosed: { dd: !0, li: !0, optgroup: !0, option: !0, p: !0, rp: !0, rt: !0, tbody: !0, td: !0, tfoot: !0, th: !0, tr: !0 },
            contextGrabbers: {
                dd: { dd: !0, dt: !0 },
                dt: { dd: !0, dt: !0 },
                li: { li: !0 },
                option: { option: !0, optgroup: !0 },
                optgroup: { optgroup: !0 },
                p: { address: !0, article: !0, aside: !0, blockquote: !0, dir: !0, div: !0, dl: !0, fieldset: !0, footer: !0, form: !0, h1: !0, h2: !0, h3: !0, h4: !0, h5: !0, h6: !0, header: !0, hgroup: !0, hr: !0, menu: !0, nav: !0, ol: !0, p: !0, pre: !0, section: !0, table: !0, ul: !0 },
                rp: { rp: !0, rt: !0 },
                rt: { rp: !0, rt: !0 },
                tbody: { tbody: !0, tfoot: !0 },
                td: { td: !0, th: !0 },
                tfoot: { tbody: !0 },
                th: { td: !0, th: !0 },
                thead: { tbody: !0, tfoot: !0 },
                tr: { tr: !0 }
            },
            doNotIndent: { pre: !0 },
            allowUnquoted: !0, allowMissing: !0, caseFold: !0
        } : {
            autoSelfClosers: {},
            implicitlyClosed: {},
            contextGrabbers: {},
            doNotIndent: {},
            allowUnquoted: !1, allowMissing: !1, caseFold: !1
        },
        C = n.alignCDATA; return {
            startState: function () { return { tokenize: r, state: f, indented: 0, tagName: null, tagStart: null, context: null } },
            token: function (t, e) {
                if (!e.tagName && t.sol() && (e.indented = t.indentation()),
                t.eatSpace()) return null; z = null; var n = e.tokenize(t, e);
                return (n || z) && "comment" != n && (N = null, e.state = e.state(z || n, t, e),
                N && (n = "error" == N ? n + " error" : N)),
                n
            },
            indent: function (e, n, a) {
                var i = e.context;
                if (e.tokenize.isInAttribute) return e.tagStart == e.indented ? e.stringStartCol + 1 : e.indented + w;
                if (i && i.noIndent) return t.Pass;
                if (e.tokenize != o && e.tokenize != r) return a ? a.match(/^(\s*)/)[0].length : 0;
                if (e.tagName) return y ? e.tagStart + e.tagName.length + 2 : e.tagStart + w * v;
                if (C && /<!\[CDATA\[/.test(n)) return 0; var l = n && /^<(\/)?([\w_:\.-]*)/.exec(n);

                if (l && l[1]) for (; i;) {
                    if (i.tagName == l[2]) { i = i.prev; break }

                    if (!T.implicitlyClosed.hasOwnProperty(i.tagName)) break; i = i.prev
                }
                else
                    if (l) for (; i;) {
                        var u = T.contextGrabbers[i.tagName];
                        if (!u || !u.hasOwnProperty(l[2])) break; i = i.prev
                    }
                for (; i && !i.startOfLine;) i = i.prev; return i ? i.indent + w : 0
            },
            electricInput: /<\/[\s\w:]+>$/, blockCommentStart: "<!-", blockCommentEnd: "->", configuration: n.htmlMode ? "html" : "xml", helperType: n.htmlMode ? "html" : "xml"
        }
    }),
    t.defineMIME("text/xml", "xml"),
    t.defineMIME("application/xml", "xml"),
    t.mimeModes.hasOwnProperty("text/html") || t.defineMIME("text/html", { name: "xml", htmlMode: !0 })
});

