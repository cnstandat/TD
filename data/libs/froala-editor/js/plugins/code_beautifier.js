/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.FE.PLUGINS.codeBeautifier = function () {
        function a(a, c) {
            function d(a) { return a.replace(/^\s+/g, "") }
            function e(a) { return a.replace(/\s+$/g, "") }
            function g() {
                return this.pos = 0, this.token = "", this.current_mode = "CONTENT", this.tags = { parent: "parent1", parentcount: 1, parent1: "" },
                this.tag_type = "", this.token_text = this.last_token = this.last_text = this.token_type = "", this.newlines = 0, this.indent_content = i, this.Utils = {
                    whitespace: "\n\r\t ".split(""),
                    single_token: "br,input,link,meta,source,!doctype,basefont,base,area,hr,wbr,param,img,isindex,embed".split(","),
                    extra_liners: u, in_array: function (a, b) {
                        for (var c = 0; c < b.length; c++)
                            if (a == b[c]) return !0; return !1
                    }
                },
                this.is_whitespace = function (a) {
                    for (var b = 0; b < a.length; a++)
                        if (!this.Utils.in_array(a.charAt(b),
                        this.Utils.whitespace)) return !1; return !0
                },
                this.traverse_whitespace = function () {
                    var a = "";
                    if (a = this.input.charAt(this.pos),
                    this.Utils.in_array(a, this.Utils.whitespace)) {
                        for (this.newlines = 0; this.Utils.in_array(a, this.Utils.whitespace) ;
                        ) o && "\n" == a && this.newlines <= p && (this.newlines += 1),
                        this.pos++, a = this.input.charAt(this.pos);
                        return !0
                    }
                    return !1
                },
                this.space_or_wrap = function (a) {
                    this.line_char_count >= this.wrap_line_length ? (this.print_newline(!1, a),
                    this.print_indentation(a)) : (this.line_char_count++, a.push(" "))
                },
                this.get_content = function () {
                    for (var a = "", b = []; "<" != this.input.charAt(this.pos) ;
                    ) {
                        if (this.pos >= this.input.length) return b.length ? b.join("") : ["", "TK_EOF"];
                        if (this.traverse_whitespace()) this.space_or_wrap(b);
                        else {
                            if (q) {
                                var c = this.input.substr(this.pos, 3);

                                if ("{{#" == c || "{{/" == c) break;
                                if ("{{!" == c) return [this.get_tag(),
                                "TK_TAG_HANDLEBARS_COMMENT"];
                                if ("{{" == this.input.substr(this.pos, 2) && "{{else}}" == this.get_tag(!0)) break
                            }
                            a = this.input.charAt(this.pos),
                            this.pos++, this.line_char_count++, b.push(a)
                        }
                    }
                    return b.length ? b.join("") : ""
                },
                this.get_contents_to = function (a) {
                    if (this.pos == this.input.length) return ["", "TK_EOF"]; var b = "", c = new RegExp("</" + a + "\\s*>", "igm");
                    c.lastIndex = this.pos; var d = c.exec(this.input),
                    e = d ? d.index : this.input.length; return this.pos < e && (b = this.input.substring(this.pos, e),
                    this.pos = e),
                    b
                },
                this.record_tag = function (a) {
                    this.tags[a + "count"] ? (this.tags[a + "count"]++, this.tags[a + this.tags[a + "count"]] = this.indent_level) : (this.tags[a + "count"] = 1, this.tags[a + this.tags[a + "count"]] = this.indent_level),
                    this.tags[a + this.tags[a + "count"] + "parent"] = this.tags.parent, this.tags.parent = a + this.tags[a + "count"]
                },
                this.retrieve_tag = function (a) {
                    if (this.tags[a + "count"]) {
                        for (var b = this.tags.parent; b && a + this.tags[a + "count"] != b;) b = this.tags[b + "parent"]; b && (this.indent_level = this.tags[a + this.tags[a + "count"]], this.tags.parent = this.tags[b + "parent"]),
                        delete this.tags[a + this.tags[a + "count"] + "parent"], delete this.tags[a + this.tags[a + "count"]], 1 == this.tags[a + "count"] ? delete this.tags[a + "count"] : this.tags[a + "count"]--
                    }
                },
                this.indent_to_tag = function (a) {
                    if (this.tags[a + "count"]) { for (var b = this.tags.parent; b && a + this.tags[a + "count"] != b;) b = this.tags[b + "parent"]; b && (this.indent_level = this.tags[a + this.tags[a + "count"]]) }
                },
                this.get_tag = function (a) {
                    var b, c, d = "", e = [], f = "", g = !1, h = !0, i = this.pos, j = this.line_char_count; a = void 0 !== a && a; do {
                        if (this.pos >= this.input.length) return a && (this.pos = i, this.line_char_count = j),
                        e.length ? e.join("") : ["", "TK_EOF"];
                        if (d = this.input.charAt(this.pos),
                        this.pos++, this.Utils.in_array(d, this.Utils.whitespace)) g = !0; else {
                            if ("'" != d && '"' != d || (d += this.get_unformatted(d),
                            g = !0),
                            "=" == d && (g = !1),
                            e.length && "=" != e[e.length - 1] && ">" != d && g) {
                                if (this.space_or_wrap(e),
                                g = !1, !h && "force" == r && "/" != d) {
                                    this.print_newline(!0, e),
                                    this.print_indentation(e);
                                    for (var l = 0; l < s; l++) e.push(k)
                                }
                                for (var m = 0; m < e.length; m++)
                                    if (" " == e[m]) { h = !1; break }
                            }

                            if (q && "<" == c && d + this.input.charAt(this.pos) == "{{" && (d += this.get_unformatted("}}"),
                            e.length && " " != e[e.length - 1] && "<" != e[e.length - 1] && (d = " " + d),
                            g = !0),
                            "<" != d || c || (b = this.pos - 1, c = "<"),
                            q && !c && e.length >= 2 && "{" == e[e.length - 1] && "{" == e[e.length - 2] && (b = "#" == d || "/" == d || "!" == d ? this.pos - 3 : this.pos - 2, c = "{"),
                            this.line_char_count++, e.push(d),
                            e[1] && ("!" == e[1] || "?" == e[1] || "%" == e[1])) { e = [this.get_comment(b)]; break }

                            if (q && e[1] && "{" == e[1] && e[2] && "!" == e[2]) { e = [this.get_comment(b)]; break }

                            if (q && "{" == c && e.length > 2 && "}" == e[e.length - 2] && "}" == e[e.length - 1]) break
                        }
                    }
                    while (">" != d);
                    var o, p, t = e.join("");
                    o = -1 != t.indexOf(" ") ? t.indexOf(" ") : "{" == t[0] ? t.indexOf("}") : t.indexOf(">"),
                    p = "<" != t[0] && q ? "#" == t[2] ? 3 : 2 : 1; var u = t.substring(p, o).toLowerCase();
                    return "/" == t.charAt(t.length - 2) || this.Utils.in_array(u, this.Utils.single_token) ? a || (this.tag_type = "SINGLE") : q && "{" == t[0] && "else" == u ? a || (this.indent_to_tag("if"),
                    this.tag_type = "HANDLEBARS_ELSE", this.indent_content = !0, this.traverse_whitespace()) : this.is_unformatted(u, n) ? (f = this.get_unformatted("</" + u + ">", t),
                    e.push(f),
                    this.pos - 1, this.tag_type = "SINGLE") : "script" == u && (-1 == t.search("type") || t.search("type") > -1 && t.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/) > -1) ? a || (this.record_tag(u),
                    this.tag_type = "SCRIPT") : "style" == u && (-1 == t.search("type") || t.search("type") > -1 && t.search("text/css") > -1) ? a || (this.record_tag(u),
                    this.tag_type = "STYLE") : "!" == u.charAt(0) ? a || (this.tag_type = "SINGLE", this.traverse_whitespace()) : a || ("/" == u.charAt(0) ? (this.retrieve_tag(u.substring(1)),
                    this.tag_type = "END") : (this.record_tag(u),
                    "html" != u.toLowerCase() && (this.indent_content = !0),
                    this.tag_type = "START"),
                    this.traverse_whitespace() && this.space_or_wrap(e),
                    this.Utils.in_array(u, this.Utils.extra_liners) && (this.print_newline(!1, this.output),
                    this.output.length && "\n" != this.output[this.output.length - 2] && this.print_newline(!0, this.output))),
                    a && (this.pos = i, this.line_char_count = j),
                    e.join("")
                },
                this.get_comment = function (a) {
                    var b = "", c = ">", d = !1; this.pos = a; var e = this.input.charAt(this.pos);
                    for (this.pos++; this.pos <= this.input.length && (b += e, b[b.length - 1] != c[c.length - 1] || -1 == b.indexOf(c)) ;
                    ) !d && b.length < 10 && (0 === b.indexOf("<![if") ? (c = "<![endif]>", d = !0) : 0 === b.indexOf("<![cdata[") ? (c = "]]>", d = !0) : 0 === b.indexOf("<![") ? (c = "]>", d = !0) : 0 === b.indexOf("\x3c!--") ? (c = "--\x3e", d = !0) : 0 === b.indexOf("{{!") ? (c = "}}", d = !0) : 0 === b.indexOf("<?") ? (c = "?>", d = !0) : 0 === b.indexOf("<%") && (c = "%>", d = !0)),
                    e = this.input.charAt(this.pos),
                    this.pos++; return b
                },
                this.get_unformatted = function (a, b) {
                    if (b && -1 != b.toLowerCase().indexOf(a)) return ""; var c = "", d = "", e = 0, f = !0; do {
                        if (this.pos >= this.input.length) return d;
                        if (c = this.input.charAt(this.pos),
                        this.pos++, this.Utils.in_array(c, this.Utils.whitespace)) {
                            if (!f) { this.line_char_count--; continue }

                            if ("\n" == c || "\r" == c) { d += "\n", this.line_char_count = 0; continue }
                        }
                        d += c, this.line_char_count++, f = !0, q && "{" == c && d.length && "{" == d[d.length - 2] && (d += this.get_unformatted("}}"),
                        e = d.length)
                    }
                    while (-1 == d.toLowerCase().indexOf(a, e));
                    return d
                },
                this.get_token = function () {
                    var a;
                    if ("TK_TAG_SCRIPT" == this.last_token || "TK_TAG_STYLE" == this.last_token) {
                        var b = this.last_token.substr(7);
                        return a = this.get_contents_to(b),
                        "string" != typeof a ? a : [a, "TK_" + b]
                    }

                    if ("CONTENT" == this.current_mode) return a = this.get_content(),
                    "string" != typeof a ? a : [a, "TK_CONTENT"];
                    if ("TAG" == this.current_mode) {
                        if ("string" != typeof (a = this.get_tag())) return a; return [a, "TK_TAG_" + this.tag_type]
                    }
                },
                this.get_full_indent = function (a) { return a = this.indent_level + a || 0, a < 1 ? "" : new Array(a + 1).join(this.indent_string) },
                this.is_unformatted = function (a, b) {
                    if (!this.Utils.in_array(a, b)) return !1;
                    if ("a" != a.toLowerCase() || !this.Utils.in_array("a", b)) return !0; var c = this.get_tag(!0),
                    d = (c || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);
                    return !(d && !this.Utils.in_array(d, b))
                },
                this.printer = function (a, b, c, f, g) {
                    this.input = a || "", this.output = [], this.indent_character = b, this.indent_string = "", this.indent_size = c, this.brace_style = g, this.indent_level = 0, this.wrap_line_length = f, this.line_char_count = 0; for (var h = 0; h < this.indent_size; h++) this.indent_string += this.indent_character; this.print_newline = function (a, b) {
                        this.line_char_count = 0, b && b.length && (a || "\n" != b[b.length - 1]) && ("\n" != b[b.length - 1] && (b[b.length - 1] = e(b[b.length - 1])),
                        b.push("\n"))
                    },
                    this.print_indentation = function (a) {
                        for (var b = 0; b < this.indent_level; b++) a.push(this.indent_string),
                        this.line_char_count += this.indent_string.length
                    },
                    this.print_token = function (a) {
                        this.is_whitespace(a) && !this.output.length || ((a || "" !== a) && this.output.length && "\n" == this.output[this.output.length - 1] && (this.print_indentation(this.output),
                        a = d(a)),
                        this.print_token_raw(a))
                    },
                    this.print_token_raw = function (a) {
                        this.newlines > 0 && (a = e(a)),
                        a && "" !== a && (a.length > 1 && "\n" == a[a.length - 1] ? (this.output.push(a.slice(0, -1)),
                        this.print_newline(!1, this.output)) : this.output.push(a));
                        for (var b = 0; b < this.newlines; b++) this.print_newline(b > 0, this.output);
                        this.newlines = 0
                    },
                    this.indent = function () { this.indent_level++ },
                    this.unindent = function () { this.indent_level > 0 && this.indent_level-- }
                },
                this
            }
            var h, i, j, k, l, m, n, o, p, q, r, s, t, u; for (c = c || {},
            void 0 !== c.wrap_line_length && 0 !== parseInt(c.wrap_line_length, 10) || void 0 === c.max_char || 0 === parseInt(c.max_char, 10) || (c.wrap_line_length = c.max_char),
            i = void 0 !== c.indent_inner_html && c.indent_inner_html, j = void 0 === c.indent_size ? 4 : parseInt(c.indent_size, 10),
            k = void 0 === c.indent_char ? " " : c.indent_char, m = void 0 === c.brace_style ? "collapse" : c.brace_style, l = 0 === parseInt(c.wrap_line_length, 10) ? 32786 : parseInt(c.wrap_line_length || 250, 10),
            n = c.unformatted || ["a", "span", "img", "bdo", "em", "strong", "dfn", "code", "samp", "kbd", "var", "cite", "abbr", "acronym", "q", "sub", "sup", "tt", "i", "b", "big", "small", "u", "s", "strike", "font", "ins", "del", "address", "pre"], o = void 0 === c.preserve_newlines || c.preserve_newlines, p = o ? isNaN(parseInt(c.max_preserve_newlines, 10)) ? 32786 : parseInt(c.max_preserve_newlines, 10) : 0, q = void 0 !== c.indent_handlebars && c.indent_handlebars, r = void 0 === c.wrap_attributes ? "auto" : c.wrap_attributes, s = void 0 === c.wrap_attributes_indent_size ? j : parseInt(c.wrap_attributes_indent_size, 10) || j, t = void 0 !== c.end_with_newline && c.end_with_newline, u = Array.isArray(c.extra_liners) ? c.extra_liners.concat() : "string" == typeof c.extra_liners ? c.extra_liners.split(",") : "head,body,/html".split(","),
            c.indent_with_tabs && (k = "\t", j = 1),
            h = new g, h.printer(a, k, j, l, m) ;
            ;) {
                var v = h.get_token();

                if (h.token_text = v[0], h.token_type = v[1], "TK_EOF" == h.token_type) break; switch (h.token_type) {
                    case "TK_TAG_START": h.print_newline(!1, h.output),
                    h.print_token(h.token_text),
                    h.indent_content && (h.indent(),
                    h.indent_content = !1),
                    h.current_mode = "CONTENT"; break; case "TK_TAG_STYLE": case "TK_TAG_SCRIPT": h.print_newline(!1, h.output),
                    h.print_token(h.token_text),
                    h.current_mode = "CONTENT"; break; case "TK_TAG_END":
                        if ("TK_CONTENT" == h.last_token && "" === h.last_text) {
                            var w = h.token_text.match(/\w+/)[0], x = null; h.output.length && (x = h.output[h.output.length - 1].match(/(?:<|{{#)\s*(\w+)/)),
                            (null == x || x[1] != w && !h.Utils.in_array(x[1], n)) && h.print_newline(!1, h.output)
                        }
                        h.print_token(h.token_text),
                        h.current_mode = "CONTENT"; break; case "TK_TAG_SINGLE": var y = h.token_text.match(/^\s*<([a-z-]+)/i);
                            y && h.Utils.in_array(y[1], n) || h.print_newline(!1, h.output),
                            h.print_token(h.token_text),
                            h.current_mode = "CONTENT"; break; case "TK_TAG_HANDLEBARS_ELSE": h.print_token(h.token_text),
                            h.indent_content && (h.indent(),
                            h.indent_content = !1),
                            h.current_mode = "CONTENT"; break; case "TK_TAG_HANDLEBARS_COMMENT": case "TK_CONTENT": h.print_token(h.token_text),
                            h.current_mode = "TAG"; break; case "TK_STYLE": case "TK_SCRIPT":
                                if ("" !== h.token_text) {
                                    h.print_newline(!1, h.output);
                                    var z, A = h.token_text, B = 1; "TK_SCRIPT" == h.token_type ? z = "function" == typeof f && f : "TK_STYLE" == h.token_type && (z = "function" == typeof b && b),
                                    "keep" == c.indent_scripts ? B = 0 : "separate" == c.indent_scripts && (B = -h.indent_level);
                                    var C = h.get_full_indent(B);

                                    if (z) A = z(A.replace(/^\s*/, C),
                                    c);
                                    else {
                                        var D = A.match(/^\s*/)[0], E = D.match(/[^\n\r]*$/)[0].split(h.indent_string).length - 1, F = h.get_full_indent(B - E);
                                        A = A.replace(/^\s*/, C).replace(/\r\n|\r|\n/g, "\n" + F).replace(/\s+$/, "")
                                    }
                                    A && (h.print_token_raw(A),
                                    h.print_newline(!0, h.output))
                                }
                                h.current_mode = "TAG"; break; default: "" !== h.token_text && h.print_token(h.token_text)
                }
                h.last_token = h.token_type, h.last_text = h.token_text
            }
            var G = h.output.join("").replace(/[\r\n\t ]+$/, "");
            return t && (G += "\n"),
            G
        }
        function b(a, b) {
            function c() { return (v = a.charAt(++x)) || "" }
            function d(b) {
                var d = "", e = x; return b && g(),
                d = a.charAt(x + 1) || "", x = e - 1, c(),
                d
            }
            function e(b) {
                for (var d = x; c() ;
                )
                    if ("\\" === v) c();
                    else {
                        if (-1 !== b.indexOf(v)) break;
                        if ("\n" === v) break
                    }
                return a.substring(d, x + 1)
            }
            function f(a) {
                var b = x, d = e(a);
                return x = b - 1, c(),
                d
            }
            function g() {
                for (var a = ""; w.test(d()) ;
                ) c(),
                a += v; return a
            }
            function h() {
                var a = ""; for (v && w.test(v) && (a = v) ;
                w.test(c()) ;
                ) a += v; return a
            }
            function i(b) {
                var e = x; for (b = "/" === d(),
                c() ;
                c() ;
                ) {
                    if (!b && "*" === v && "/" === d()) {
                        c();
                        break
                    }

                    if (b && "\n" === v) return a.substring(e, x)
                }
                return a.substring(e, x) + v
            }
            function j(b) { return a.substring(x - b.length, x).toLowerCase() === b }
            function k() {
                for (var b = 0, c = x + 1; c < a.length; c++) {
                    var d = a.charAt(c);

                    if ("{" === d) return !0;
                    if ("(" === d) b += 1; else
                        if (")" === d) {
                            if (0 == b) return !1; b -= 1
                        }
                        else
                            if (";" === d || "}" === d) return !1
                }
                return !1
            }
            function l() { B++, z += A }
            function m() { B--, z = z.slice(0, -p) }
            var n = { "@page": !0, "@font-face": !0, "@keyframes": !0, "@media": !0, "@supports": !0, "@document": !0 },
            o = { "@media": !0, "@supports": !0, "@document": !0 };
            b = b || {},
            a = a || "", a = a.replace(/\r\n|[\r\u2028\u2029]/g, "\n");
            var p = b.indent_size || 4, q = b.indent_char || " ", r = void 0 === b.selector_separator_newline || b.selector_separator_newline, s = void 0 !== b.end_with_newline && b.end_with_newline, t = void 0 === b.newline_between_rules || b.newline_between_rules, u = b.eol ? b.eol : "\n"; "string" == typeof p && (p = parseInt(p, 10)),
            b.indent_with_tabs && (q = "\t", p = 1),
            u = u.replace(/\\r/, "\r").replace(/\\n/, "\n");
            var v, w = /^\s+$/, x = -1, y = 0, z = a.match(/^[\t ]*/)[0], A = new Array(p + 1).join(q),
            B = 0, C = 0, D = {};
            D["{"] = function (a) {
                D.singleSpace(),
                E.push(a),
                D.newLine()
            },
            D["}"] = function (a) {
                D.newLine(),
                E.push(a),
                D.newLine()
            },
            D._lastCharWhitespace = function () { return w.test(E[E.length - 1]) },
            D.newLine = function (a) {
                E.length && (a || "\n" === E[E.length - 1] || D.trim(),
                E.push("\n"),
                z && E.push(z))
            },
            D.singleSpace = function () { E.length && !D._lastCharWhitespace() && E.push(" ") },
            D.preserveSingleSpace = function () { L && D.singleSpace() },
            D.trim = function () {
                for (; D._lastCharWhitespace() ;
                ) E.pop()
            };
            for (var E = [], F = !1, G = !1, H = !1, I = "", J = ""; ;) {
                var K = h(),
                L = "" !== K, M = -1 !== K.indexOf("\n");

                if (J = I, I = v, !v) break;
                if ("/" === v && "*" === d()) {
                    var N = 0 === B; (M || N) && D.newLine(),
                    E.push(i()),
                    D.newLine(),
                    N && D.newLine(!0)
                }
                else
                    if ("/" === v && "/" === d()) M || "{" === J || D.trim(),
                    D.singleSpace(),
                    E.push(i()),
                    D.newLine();
                    else
                        if ("@" === v) {
                            D.preserveSingleSpace(),
                            E.push(v);
                            var O = f(": ,;{}()[]/='\"");
                            O.match(/[ :]$/) && (c(),
                            O = e(": ").replace(/\s$/, ""),
                            E.push(O),
                            D.singleSpace()),
                            O = O.replace(/\s$/, ""),
                            O in n && (C += 1, O in o && (H = !0))
                        }
                        else "#" === v && "{" === d() ? (D.preserveSingleSpace(),
                        E.push(e("}"))) : "{" === v ? "}" === d(!0) ? (g(),
                        c(),
                        D.singleSpace(),
                        E.push("{}"),
                        D.newLine(),
                        t && 0 === B && D.newLine(!0)) : (l(),
                        D["{"](v),
                        H ? (H = !1, F = B > C) : F = B >= C) : "}" === v ? (m(),
                        D["}"](v),
                        F = !1, G = !1, C && C--, t && 0 === B && D.newLine(!0)) : ":" === v ? (g(),
                        !F && !H || j("&") || k() ? ":" === d() ? (c(),
                        E.push("::")) : E.push(":") : (G = !0, E.push(":"),
                        D.singleSpace())) : '"' === v || "'" === v ? (D.preserveSingleSpace(),
                        E.push(e(v))) : ";" === v ? (G = !1, E.push(v),
                        D.newLine()) : "(" === v ? j("url") ? (E.push(v),
                        g(),
                        c() && (")" !== v && '"' !== v && "'" !== v ? E.push(e(")")) : x--)) : (y++, D.preserveSingleSpace(),
                        E.push(v),
                        g()) : ")" === v ? (E.push(v),
                        y--) : "," === v ? (E.push(v),
                        g(),
                        r && !G && y < 1 ? D.newLine() : D.singleSpace()) : "]" === v ? E.push(v) : "[" === v ? (D.preserveSingleSpace(),
                        E.push(v)) : "=" === v ? (g(),
                        v = "=", E.push(v)) : (D.preserveSingleSpace(),
                        E.push(v))
            }
            var P = ""; return z && (P += z),
            P += E.join("").replace(/[\r\n\t ]+$/, ""),
            s && (P += "\n"),
            "\n" != u && (P = P.replace(/[\n]/g, u)),
            P
        }
        function c(a, b) {
            for (var c = 0; c < b.length; c += 1)
                if (b[c] === a) return !0; return !1
        }
        function d(a) { return a.replace(/^\s+|\s+$/g, "") }
        function e(a) { return a.replace(/^\s+/g, "") }
        function f(a, b) { return new g(a, b).beautify() }
        function g(a, b) {
            function f(a, b) {
                var c = 0; return a && (c = a.indentation_level, !R.just_added_newline() && a.line_indent_level > c && (c = a.line_indent_level)),
                {
                    mode: b, parent: a, last_text: a ? a.last_text : "", last_word: a ? a.last_word : "", declaration_statement: !1, declaration_assignment: !1, multiline_frame: !1, if_block: !1, else_block: !1, do_block: !1, do_while: !1, in_case_statement: !1, in_case: !1, case_body: !1, indentation_level: c, line_indent_level: a ? a.line_indent_level : c, start_line_index: R.get_line_number(),
                    ternary_depth: 0
                }
            }
            function g(a) {
                var b = a.newlines;
                if (ba.keep_array_indentation && t(Y.mode)) for (c = 0; c < b; c += 1) n(c > 0);
                else
                    if (ba.max_preserve_newlines && b > ba.max_preserve_newlines && (b = ba.max_preserve_newlines),
                    ba.preserve_newlines && a.newlines > 1) {
                        n();
                        for (var c = 1; c < b; c += 1) n(!0)
                    }
                U = a, aa[U.type]()
            }
            function h(a) {
                a = a.replace(/\x0d/g, "");
                for (var b = [], c = a.indexOf("\n") ;
                -1 !== c;) b.push(a.substring(0, c)),
                a = a.substring(c + 1),
                c = a.indexOf("\n");
                return a.length && b.push(a),
                b
            }
            function m(a) {
                if (a = void 0 !== a && a, !R.just_added_newline())
                    if (ba.preserve_newlines && U.wanted_newline || a) n(!1, !0);
                    else
                        if (ba.wrap_line_length) {
                            var b = R.current_line.get_character_count() + U.text.length + (R.space_before_token ? 1 : 0);
                            b >= ba.wrap_line_length && n(!1, !0)
                        }
            }
            function n(a, b) {
                if (!b && ";" !== Y.last_text && "," !== Y.last_text && "=" !== Y.last_text && "TK_OPERATOR" !== V) for (; Y.mode === l.Statement && !Y.if_block && !Y.do_block;) v();
                R.add_new_line(a) && (Y.multiline_frame = !0)
            }
            function o() {
                R.just_added_newline() && (ba.keep_array_indentation && t(Y.mode) && U.wanted_newline ? (R.current_line.push(U.whitespace_before),
                R.space_before_token = !1) : R.set_indent(Y.indentation_level) && (Y.line_indent_level = Y.indentation_level))
            }
            function p(a) {
                if (R.raw) return void R.add_raw_token(U);
                ba.comma_first && "TK_COMMA" === V && R.just_added_newline() && "," === R.previous_line.last() && (R.previous_line.pop(),
                o(),
                R.add_token(","),
                R.space_before_token = !0),
                a = a || U.text, o(),
                R.add_token(a)
            }
            function q() { Y.indentation_level += 1 }
            function r() { Y.indentation_level > 0 && (!Y.parent || Y.indentation_level > Y.parent.indentation_level) && (Y.indentation_level -= 1) }
            function s(a) {
                Y ? ($.push(Y),
                Z = Y) : Z = f(null, a),
                Y = f(Z, a)
            }
            function t(a) { return a === l.ArrayLiteral }
            function u(a) { return c(a, [l.Expression, l.ForInitializer, l.Conditional]) }
            function v() {
                $.length > 0 && (Z = Y, Y = $.pop(),
                Z.mode === l.Statement && R.remove_redundant_indentation(Z))
            }
            function w() { return Y.parent.mode === l.ObjectLiteral && Y.mode === l.Statement && (":" === Y.last_text && 0 === Y.ternary_depth || "TK_RESERVED" === V && c(Y.last_text, ["get", "set"])) }
            function x() {
                return !!("TK_RESERVED" === V && c(Y.last_text, ["var", "let", "const"]) && "TK_WORD" === U.type || "TK_RESERVED" === V && "do" === Y.last_text || "TK_RESERVED" === V && "return" === Y.last_text && !U.wanted_newline || "TK_RESERVED" === V && "else" === Y.last_text && ("TK_RESERVED" !== U.type || "if" !== U.text) || "TK_END_EXPR" === V && (Z.mode === l.ForInitializer || Z.mode === l.Conditional) || "TK_WORD" === V && Y.mode === l.BlockStatement && !Y.in_case && "--" !== U.text && "++" !== U.text && "function" !== W && "TK_WORD" !== U.type && "TK_RESERVED" !== U.type || Y.mode === l.ObjectLiteral && (":" === Y.last_text && 0 === Y.ternary_depth || "TK_RESERVED" === V && c(Y.last_text, ["get", "set"]))) && (s(l.Statement),
                q(),
                "TK_RESERVED" === V && c(Y.last_text, ["var", "let", "const"]) && "TK_WORD" === U.type && (Y.declaration_statement = !0),
                w() || m("TK_RESERVED" === U.type && c(U.text, ["do", "for", "if", "while"])),
                !0)
            }
            function y(a, b) {
                for (var c = 0; c < a.length; c++) {
                    if (d(a[c]).charAt(0) !== b) return !1
                }
                return !0
            }
            function z(a, b) {
                for (var c, d = 0, e = a.length; d < e; d++)
                    if ((c = a[d]) && 0 !== c.indexOf(b)) return !1; return !0
            }
            function A(a) { return c(a, ["case", "return", "do", "if", "throw", "else"]) }
            function B(a) {
                var b = S + (a || 0);
                return b < 0 || b >= ca.length ? null : ca[b]
            }
            function C() {
                x();
                var a = l.Expression;
                if ("[" === U.text) {
                    if ("TK_WORD" === V || ")" === Y.last_text) return "TK_RESERVED" === V && c(Y.last_text, T.line_starters) && (R.space_before_token = !0),
                    s(a),
                    p(),
                    q(),
                    void (ba.space_in_paren && (R.space_before_token = !0));
                    a = l.ArrayLiteral, t(Y.mode) && ("[" !== Y.last_text && ("," !== Y.last_text || "]" !== W && "}" !== W) || ba.keep_array_indentation || n())
                }
                else "TK_RESERVED" === V && "for" === Y.last_text ? a = l.ForInitializer : "TK_RESERVED" === V && c(Y.last_text, ["if", "while"]) && (a = l.Conditional);
                ";" === Y.last_text || "TK_START_BLOCK" === V ? n() : "TK_END_EXPR" === V || "TK_START_EXPR" === V || "TK_END_BLOCK" === V || "." === Y.last_text ? m(U.wanted_newline) : "TK_RESERVED" === V && "(" === U.text || "TK_WORD" === V || "TK_OPERATOR" === V ? "TK_RESERVED" === V && ("function" === Y.last_word || "typeof" === Y.last_word) || "*" === Y.last_text && "function" === W ? ba.space_after_anon_function && (R.space_before_token = !0) : "TK_RESERVED" !== V || !c(Y.last_text, T.line_starters) && "catch" !== Y.last_text || ba.space_before_conditional && (R.space_before_token = !0) : R.space_before_token = !0, "(" === U.text && "TK_RESERVED" === V && "await" === Y.last_word && (R.space_before_token = !0),
                "(" === U.text && ("TK_EQUALS" !== V && "TK_OPERATOR" !== V || w() || m()),
                s(a),
                p(),
                ba.space_in_paren && (R.space_before_token = !0),
                q()
            }
            function D() {
                for (; Y.mode === l.Statement;) v();
                Y.multiline_frame && m("]" === U.text && t(Y.mode) && !ba.keep_array_indentation),
                ba.space_in_paren && ("TK_START_EXPR" !== V || ba.space_in_empty_paren ? R.space_before_token = !0 : (R.trim(),
                R.space_before_token = !1)),
                "]" === U.text && ba.keep_array_indentation ? (p(),
                v()) : (v(),
                p()),
                R.remove_redundant_indentation(Z),
                Y.do_while && Z.mode === l.Conditional && (Z.mode = l.Expression, Y.do_block = !1, Y.do_while = !1)
            }
            function E() {
                var a = B(1),
                b = B(2);
                s(b && (":" === b.text && c(a.type, ["TK_STRING", "TK_WORD", "TK_RESERVED"]) || c(a.text, ["get", "set"]) && c(b.type, ["TK_WORD", "TK_RESERVED"])) ? c(W, ["class", "interface"]) ? l.BlockStatement : l.ObjectLiteral : l.BlockStatement);
                var d = !a.comments_before.length && "}" === a.text, e = d && "function" === Y.last_word && "TK_END_EXPR" === V; "expand" === ba.brace_style || "none" === ba.brace_style && U.wanted_newline ? "TK_OPERATOR" !== V && (e || "TK_EQUALS" === V || "TK_RESERVED" === V && A(Y.last_text) && "else" !== Y.last_text) ? R.space_before_token = !0 : n(!1, !0) : "TK_OPERATOR" !== V && "TK_START_EXPR" !== V ? "TK_START_BLOCK" === V ? n() : R.space_before_token = !0 : t(Z.mode) && "," === Y.last_text && ("}" === W ? R.space_before_token = !0 : n()),
                p(),
                q()
            }
            function F() {
                for (; Y.mode === l.Statement;) v();
                var a = "TK_START_BLOCK" === V; "expand" === ba.brace_style ? a || n() : a || (t(Y.mode) && ba.keep_array_indentation ? (ba.keep_array_indentation = !1, n(),
                ba.keep_array_indentation = !0) : n()),
                v(),
                p()
            }
            function G() {
                if ("TK_RESERVED" === U.type && Y.mode !== l.ObjectLiteral && c(U.text, ["set", "get"]) && (U.type = "TK_WORD"),
                "TK_RESERVED" === U.type && Y.mode === l.ObjectLiteral) { ":" == B(1).text && (U.type = "TK_WORD") }

                if (x() || !U.wanted_newline || u(Y.mode) || "TK_OPERATOR" === V && "--" !== Y.last_text && "++" !== Y.last_text || "TK_EQUALS" === V || !ba.preserve_newlines && "TK_RESERVED" === V && c(Y.last_text, ["var", "let", "const", "set", "get"]) || n(),
                Y.do_block && !Y.do_while) {
                    if ("TK_RESERVED" === U.type && "while" === U.text) return R.space_before_token = !0, p(),
                    R.space_before_token = !0, void (Y.do_while = !0);
                    n(),
                    Y.do_block = !1
                }

                if (Y.if_block)
                    if (Y.else_block || "TK_RESERVED" !== U.type || "else" !== U.text) {
                        for (; Y.mode === l.Statement;) v();
                        Y.if_block = !1, Y.else_block = !1
                    }
                    else Y.else_block = !0;
                if ("TK_RESERVED" === U.type && ("case" === U.text || "default" === U.text && Y.in_case_statement)) return n(),
                (Y.case_body || ba.jslint_happy) && (r(),
                Y.case_body = !1),
                p(),
                Y.in_case = !0, void (Y.in_case_statement = !0);

                if ("TK_RESERVED" === U.type && "function" === U.text && ((c(Y.last_text, ["}", ";"]) || R.just_added_newline() && !c(Y.last_text, ["[", "{", ":", "=", ","])) && (R.just_added_blankline() || U.comments_before.length || (n(),
                n(!0))),
                "TK_RESERVED" === V || "TK_WORD" === V ? "TK_RESERVED" === V && c(Y.last_text, ["get", "set", "new", "return", "export", "async"]) ? R.space_before_token = !0 : "TK_RESERVED" === V && "default" === Y.last_text && "export" === W ? R.space_before_token = !0 : n() : "TK_OPERATOR" === V || "=" === Y.last_text ? R.space_before_token = !0 : (Y.multiline_frame || !u(Y.mode) && !t(Y.mode)) && n()),
                "TK_COMMA" !== V && "TK_START_EXPR" !== V && "TK_EQUALS" !== V && "TK_OPERATOR" !== V || w() || m(),
                "TK_RESERVED" === U.type && c(U.text, ["function", "get", "set"])) return p(),
                void (Y.last_word = U.text);

                if (_ = "NONE", "TK_END_BLOCK" === V ? "TK_RESERVED" === U.type && c(U.text, ["else", "catch", "finally"]) ? "expand" === ba.brace_style || "end-expand" === ba.brace_style || "none" === ba.brace_style && U.wanted_newline ? _ = "NEWLINE" : (_ = "SPACE", R.space_before_token = !0) : _ = "NEWLINE" : "TK_SEMICOLON" === V && Y.mode === l.BlockStatement ? _ = "NEWLINE" : "TK_SEMICOLON" === V && u(Y.mode) ? _ = "SPACE" : "TK_STRING" === V ? _ = "NEWLINE" : "TK_RESERVED" === V || "TK_WORD" === V || "*" === Y.last_text && "function" === W ? _ = "SPACE" : "TK_START_BLOCK" === V ? _ = "NEWLINE" : "TK_END_EXPR" === V && (R.space_before_token = !0, _ = "NEWLINE"),
                "TK_RESERVED" === U.type && c(U.text, T.line_starters) && ")" !== Y.last_text && (_ = "else" === Y.last_text || "export" === Y.last_text ? "SPACE" : "NEWLINE"),
                "TK_RESERVED" === U.type && c(U.text, ["else", "catch", "finally"]))
                    if ("TK_END_BLOCK" !== V || "expand" === ba.brace_style || "end-expand" === ba.brace_style || "none" === ba.brace_style && U.wanted_newline) n();
                    else {
                        R.trim(!0);
                        var a = R.current_line; "}" !== a.last() && n(),
                        R.space_before_token = !0
                    }
                else "NEWLINE" === _ ? "TK_RESERVED" === V && A(Y.last_text) ? R.space_before_token = !0 : "TK_END_EXPR" !== V ? "TK_START_EXPR" === V && "TK_RESERVED" === U.type && c(U.text, ["var", "let", "const"]) || ":" === Y.last_text || ("TK_RESERVED" === U.type && "if" === U.text && "else" === Y.last_text ? R.space_before_token = !0 : n()) : "TK_RESERVED" === U.type && c(U.text, T.line_starters) && ")" !== Y.last_text && n() : Y.multiline_frame && t(Y.mode) && "," === Y.last_text && "}" === W ? n() : "SPACE" === _ && (R.space_before_token = !0);
                p(),
                Y.last_word = U.text, "TK_RESERVED" === U.type && "do" === U.text && (Y.do_block = !0),
                "TK_RESERVED" === U.type && "if" === U.text && (Y.if_block = !0)
            }
            function H() {
                for (x() && (R.space_before_token = !1) ;
                Y.mode === l.Statement && !Y.if_block && !Y.do_block;) v();
                p()
            }
            function I() {
                x() ? R.space_before_token = !0 : "TK_RESERVED" === V || "TK_WORD" === V ? R.space_before_token = !0 : "TK_COMMA" === V || "TK_START_EXPR" === V || "TK_EQUALS" === V || "TK_OPERATOR" === V ? w() || m() : n(),
                p()
            }
            function J() {
                x(),
                Y.declaration_statement && (Y.declaration_assignment = !0),
                R.space_before_token = !0, p(),
                R.space_before_token = !0
            }
            function K() {
                if (Y.declaration_statement) return u(Y.parent.mode) && (Y.declaration_assignment = !1),
                p(),
                void (Y.declaration_assignment ? (Y.declaration_assignment = !1, n(!1, !0)) : (R.space_before_token = !0, ba.comma_first && m()));
                p(),
                Y.mode === l.ObjectLiteral || Y.mode === l.Statement && Y.parent.mode === l.ObjectLiteral ? (Y.mode === l.Statement && v(),
                n()) : (R.space_before_token = !0, ba.comma_first && m())
            }
            function L() {
                if (x(),
                "TK_RESERVED" === V && A(Y.last_text)) return R.space_before_token = !0, void p();

                if ("*" === U.text && "TK_DOT" === V) return void p();

                if (":" === U.text && Y.in_case) return Y.case_body = !0, q(),
                p(),
                n(),
                void (Y.in_case = !1);

                if ("::" === U.text) return void p();
                "TK_OPERATOR" === V && m();
                var a = !0, b = !0; c(U.text, ["--", "++", "!", "~"]) || c(U.text, ["-", "+"]) && (c(V, ["TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS", "TK_OPERATOR"]) || c(Y.last_text, T.line_starters) || "," === Y.last_text) ? (a = !1, b = !1, !U.wanted_newline || "--" !== U.text && "++" !== U.text || n(!1, !0),
                ";" === Y.last_text && u(Y.mode) && (a = !0),
                "TK_RESERVED" === V ? a = !0 : "TK_END_EXPR" === V ? a = !("]" === Y.last_text && ("--" === U.text || "++" === U.text)) : "TK_OPERATOR" === V && (a = c(U.text, ["--", "-", "++", "+"]) && c(Y.last_text, ["--", "-", "++", "+"]),
                c(U.text, ["+", "-"]) && c(Y.last_text, ["--", "++"]) && (b = !0)),
                Y.mode !== l.BlockStatement && Y.mode !== l.Statement || "{" !== Y.last_text && ";" !== Y.last_text || n()) : ":" === U.text ? 0 === Y.ternary_depth ? a = !1 : Y.ternary_depth -= 1 : "?" === U.text ? Y.ternary_depth += 1 : "*" === U.text && "TK_RESERVED" === V && "function" === Y.last_text && (a = !1, b = !1),
                R.space_before_token = R.space_before_token || a, p(),
                R.space_before_token = b
            }
            function M() {
                if (R.raw) return R.add_raw_token(U),
                void (U.directives && "end" === U.directives.preserve && (ba.test_output_raw || (R.raw = !1)));

                if (U.directives) return n(!1, !0),
                p(),
                "start" === U.directives.preserve && (R.raw = !0),
                void n(!1, !0);

                if (!k.newline.test(U.text) && !U.wanted_newline) return R.space_before_token = !0, p(),
                void (R.space_before_token = !0);
                var a, b = h(U.text),
                c = !1, d = !1, f = U.whitespace_before, g = f.length; for (n(!1, !0),
                b.length > 1 && (y(b.slice(1),
                "*") ? c = !0 : z(b.slice(1),
                f) && (d = !0)),
                p(b[0]),
                a = 1; a < b.length; a++) n(!1, !0),
                c ? p(" " + e(b[a])) : d && b[a].length > g ? p(b[a].substring(g)) : R.add_token(b[a]);
                n(!1, !0)
            }
            function N() {
                U.wanted_newline ? n(!1, !0) : R.trim(!0),
                R.space_before_token = !0, p(),
                n(!1, !0)
            }
            function O() {
                x(),
                "TK_RESERVED" === V && A(Y.last_text) ? R.space_before_token = !0 : m(")" === Y.last_text && ba.break_chained_methods),
                p()
            }
            function P() {
                p(),
                "\n" === U.text[U.text.length - 1] && n()
            }
            function Q() { for (; Y.mode === l.Statement;) v() }
            var R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca = [], da = ""; for (aa = { TK_START_EXPR: C, TK_END_EXPR: D, TK_START_BLOCK: E, TK_END_BLOCK: F, TK_WORD: G, TK_RESERVED: G, TK_SEMICOLON: H, TK_STRING: I, TK_EQUALS: J, TK_OPERATOR: L, TK_COMMA: K, TK_BLOCK_COMMENT: M, TK_COMMENT: N, TK_DOT: O, TK_UNKNOWN: P, TK_EOF: Q },
            b = b || {},
            ba = {},
            void 0 !== b.braces_on_own_line && (ba.brace_style = b.braces_on_own_line ? "expand" : "collapse"),
            ba.brace_style = b.brace_style ? b.brace_style : ba.brace_style ? ba.brace_style : "collapse", "expand-strict" === ba.brace_style && (ba.brace_style = "expand"),
            ba.indent_size = b.indent_size ? parseInt(b.indent_size, 10) : 4, ba.indent_char = b.indent_char ? b.indent_char : " ", ba.eol = b.eol ? b.eol : "\n", ba.preserve_newlines = void 0 === b.preserve_newlines || b.preserve_newlines, ba.break_chained_methods = void 0 !== b.break_chained_methods && b.break_chained_methods, ba.max_preserve_newlines = void 0 === b.max_preserve_newlines ? 0 : parseInt(b.max_preserve_newlines, 10),
            ba.space_in_paren = void 0 !== b.space_in_paren && b.space_in_paren, ba.space_in_empty_paren = void 0 !== b.space_in_empty_paren && b.space_in_empty_paren, ba.jslint_happy = void 0 !== b.jslint_happy && b.jslint_happy, ba.space_after_anon_function = void 0 !== b.space_after_anon_function && b.space_after_anon_function, ba.keep_array_indentation = void 0 !== b.keep_array_indentation && b.keep_array_indentation, ba.space_before_conditional = void 0 === b.space_before_conditional || b.space_before_conditional, ba.unescape_strings = void 0 !== b.unescape_strings && b.unescape_strings, ba.wrap_line_length = void 0 === b.wrap_line_length ? 0 : parseInt(b.wrap_line_length, 10),
            ba.e4x = void 0 !== b.e4x && b.e4x, ba.end_with_newline = void 0 !== b.end_with_newline && b.end_with_newline, ba.comma_first = void 0 !== b.comma_first && b.comma_first, ba.test_output_raw = void 0 !== b.test_output_raw && b.test_output_raw, ba.jslint_happy && (ba.space_after_anon_function = !0),
            b.indent_with_tabs && (ba.indent_char = "\t", ba.indent_size = 1),
            ba.eol = ba.eol.replace(/\\r/, "\r").replace(/\\n/, "\n"),
            X = ""; ba.indent_size > 0;) X += ba.indent_char, ba.indent_size -= 1; var ea = 0;
            if (a && a.length) {
                for (; " " === a.charAt(ea) || "\t" === a.charAt(ea) ;
                ) da += a.charAt(ea),
                ea += 1; a = a.substring(ea)
            }
            V = "TK_START_BLOCK", W = "", R = new i(X, da),
            R.raw = ba.test_output_raw, $ = [], s(l.BlockStatement),
            this.beautify = function () {
                var b, c; for (T = new j(a, ba, X),
                ca = T.tokenize(),
                S = 0; b = B() ;
                ) {
                    for (var d = 0; d < b.comments_before.length; d++) g(b.comments_before[d]);
                    g(b),
                    W = Y.last_text, V = b.type, Y.last_text = b.text, S += 1
                }
                return c = R.get_code(),
                ba.end_with_newline && (c += "\n"),
                "\n" != ba.eol && (c = c.replace(/[\n]/g, ba.eol)),
                c
            }
        }
        function h(a) {
            var b = 0, c = -1, d = [], e = !0; this.set_indent = function (d) { b = a.baseIndentLength + d * a.indent_length, c = d },
            this.get_character_count = function () { return b },
            this.is_empty = function () { return e },
            this.last = function () { return this._empty ? null : d[d.length - 1] },
            this.push = function (a) {
                d.push(a),
                b += a.length, e = !1
            },
            this.pop = function () {
                var a = null; return e || (a = d.pop(),
                b -= a.length, e = 0 === d.length),
                a
            },
            this.remove_indent = function () { c > 0 && (c -= 1, b -= a.indent_length) },
            this.trim = function () {
                for (; " " === this.last() ;
                ) {
                    d.pop();
                    b -= 1
                }
                e = 0 === d.length
            },
            this.toString = function () {
                var b = ""; return this._empty || (c >= 0 && (b = a.indent_cache[c]),
                b += d.join("")),
                b
            }
        }
        function i(a, b) {
            b = b || "", this.indent_cache = [b], this.baseIndentLength = b.length, this.indent_length = a.length, this.raw = !1; var c = []; this.baseIndentString = b, this.indent_string = a, this.previous_line = null, this.current_line = null, this.space_before_token = !1, this.add_outputline = function () {
                this.previous_line = this.current_line, this.current_line = new h(this),
                c.push(this.current_line)
            },
            this.add_outputline(),
            this.get_line_number = function () { return c.length },
            this.add_new_line = function (a) {
                return (1 !== this.get_line_number() || !this.just_added_newline()) && (!(!a && this.just_added_newline()) && (this.raw || this.add_outputline(),
                !0))
            },
            this.get_code = function () { return c.join("\n").replace(/[\r\n\t ]+$/, "") },
            this.set_indent = function (a) {
                if (c.length > 1) {
                    for (; a >= this.indent_cache.length;) this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
                    return this.current_line.set_indent(a),
                    !0
                }
                return this.current_line.set_indent(0),
                !1
            },
            this.add_raw_token = function (a) {
                for (var b = 0; b < a.newlines; b++) this.add_outputline();
                this.current_line.push(a.whitespace_before),
                this.current_line.push(a.text),
                this.space_before_token = !1
            },
            this.add_token = function (a) {
                this.add_space_before_token(),

                this.current_line.push(a)
            },
            this.add_space_before_token = function () {
                this.space_before_token && !this.just_added_newline() && this.current_line.push(" "),
                this.space_before_token = !1
            },
            this.remove_redundant_indentation = function (a) {
                if (!a.multiline_frame && a.mode !== l.ForInitializer && a.mode !== l.Conditional) for (var b = a.start_line_index, d = c.length; b < d;) c[b].remove_indent(),
                b++
            },
            this.trim = function (d) {
                for (d = void 0 !== d && d, this.current_line.trim(a, b) ;
                d && c.length > 1 && this.current_line.is_empty() ;
                ) c.pop(),
                this.current_line = c[c.length - 1], this.current_line.trim();
                this.previous_line = c.length > 1 ? c[c.length - 2] : null
            },
            this.just_added_newline = function () { return this.current_line.is_empty() },
            this.just_added_blankline = function () {
                if (this.just_added_newline()) {
                    if (1 === c.length) return !0; return c[c.length - 2].is_empty()
                }
                return !1
            }
        }
        function j(a, b, e) {
            function f(a) {
                if (!a.match(y)) return null; var b = {};
                z.lastIndex = 0; for (var c = z.exec(a) ;
                c;) b[c[1]] = c[2], c = z.exec(a);
                return b
            }
            function g() {
                var e, g = [];
                if (p = 0, q = "", t >= u) return ["", "TK_EOF"]; var y; y = s.length ? s[s.length - 1] : new m("TK_START_BLOCK", "{");
                var z = a.charAt(t);
                for (t += 1; c(z, i) ;
                ) {
                    if (k.newline.test(z) ? "\n" === z && "\r" === a.charAt(t - 2) || (p += 1, g = []) : g.push(z),
                    t >= u) return ["", "TK_EOF"]; z = a.charAt(t),
                    t += 1
                }

                if (g.length && (q = g.join("")),
                j.test(z)) {
                    var C = !0, D = !0, E = j; for ("0" === z && t < u && /[Xxo]/.test(a.charAt(t)) ? (C = !1, D = !1, z += a.charAt(t),
                    t += 1, E = /[o]/.test(a.charAt(t)) ? l : n) : (z = "", t -= 1) ;
                    t < u && E.test(a.charAt(t)) ;
                    ) z += a.charAt(t),
                    t += 1, C && t < u && "." === a.charAt(t) && (z += a.charAt(t),
                    t += 1, C = !1),
                    D && t < u && /[Ee]/.test(a.charAt(t)) && (z += a.charAt(t),
                    t += 1, t < u && /[+-]/.test(a.charAt(t)) && (z += a.charAt(t),
                    t += 1),
                    D = !1, C = !1);
                    return [z, "TK_WORD"]
                }

                if (k.isIdentifierStart(a.charCodeAt(t - 1))) {
                    if (t < u) for (; k.isIdentifierChar(a.charCodeAt(t)) && (z += a.charAt(t),
                    (t += 1) !== u) ;
                    );
                    return "TK_DOT" === y.type || "TK_RESERVED" === y.type && c(y.text, ["set", "get"]) || !c(z, v) ? [z, "TK_WORD"] : "in" === z ? [z, "TK_OPERATOR"] : [z, "TK_RESERVED"]
                }

                if ("(" === z || "[" === z) return [z, "TK_START_EXPR"];
                if (")" === z || "]" === z) return [z, "TK_END_EXPR"];
                if ("{" === z) return [z, "TK_START_BLOCK"];
                if ("}" === z) return [z, "TK_END_BLOCK"];
                if (";" === z) return [z, "TK_SEMICOLON"];
                if ("/" === z) {
                    var F = "";
                    if ("*" === a.charAt(t)) {
                        t += 1, w.lastIndex = t; var G = w.exec(a);
                        F = "/*" + G[0], t += G[0].length; var H = f(F);
                        return H && "start" === H.ignore && (A.lastIndex = t, G = A.exec(a),
                        F += G[0], t += G[0].length),
                        F = F.replace(k.lineBreak, "\n"),
                        [F, "TK_BLOCK_COMMENT", H]
                    }

                    if ("/" === a.charAt(t)) {
                        t += 1, x.lastIndex = t; var G = x.exec(a);
                        return F = "//" + G[0], t += G[0].length, [F, "TK_COMMENT"]
                    }
                }

                if ("`" === z || "'" === z || '"' === z || ("/" === z || b.e4x && "<" === z && a.slice(t - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/)) && ("TK_RESERVED" === y.type && c(y.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || "TK_END_EXPR" === y.type && ")" === y.text && y.parent && "TK_RESERVED" === y.parent.type && c(y.parent.text, ["if", "while", "for"]) || c(y.type, ["TK_COMMENT", "TK_START_EXPR", "TK_START_BLOCK", "TK_END_BLOCK", "TK_OPERATOR", "TK_EQUALS", "TK_EOF", "TK_SEMICOLON", "TK_COMMA"]))) {
                    var I = z, J = !1, K = !1;
                    if (e = z, "/" === I) for (var L = !1; t < u && (J || L || a.charAt(t) !== I) && !k.newline.test(a.charAt(t)) ;
                    ) e += a.charAt(t),
                    J ? J = !1 : (J = "\\" === a.charAt(t),
                    "[" === a.charAt(t) ? L = !0 : "]" === a.charAt(t) && (L = !1)),
                    t += 1; else
                        if (b.e4x && "<" === I) {
                            var M = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g, N = a.slice(t - 1),
                            O = M.exec(N);

                            if (O && 0 === O.index) {
                                for (var P = O[2], Q = 0; O;) {
                                    var R = !!O[1], S = O[2], T = !!O[O.length - 1] || "![CDATA[" === S.slice(0, 8);

                                    if (S !== P || T || (R ? --Q : ++Q),
                                    Q <= 0) break; O = M.exec(N)
                                }
                                var U = O ? O.index + O[0].length : N.length; return N = N.slice(0, U),
                                t += U - 1, N = N.replace(k.lineBreak, "\n"),
                                [N, "TK_STRING"]
                            }
                        }
                        else for (; t < u && (J || a.charAt(t) !== I && ("`" === I || !k.newline.test(a.charAt(t)))) ;
                        ) (J || "`" === I) && k.newline.test(a.charAt(t)) ? ("\r" === a.charAt(t) && "\n" === a.charAt(t + 1) && (t += 1),
                        e += "\n") : e += a.charAt(t),
                        J ? ("x" !== a.charAt(t) && "u" !== a.charAt(t) || (K = !0),
                        J = !1) : J = "\\" === a.charAt(t),
                        t += 1;
                    if (K && b.unescape_strings && (e = h(e)),
                    t < u && a.charAt(t) === I && (e += I, t += 1, "/" === I)) for (; t < u && k.isIdentifierStart(a.charCodeAt(t)) ;
                    ) e += a.charAt(t),
                    t += 1; return [e, "TK_STRING"]
                }

                if ("#" === z) {
                    if (0 === s.length && "!" === a.charAt(t)) {
                        for (e = z; t < u && "\n" !== z;) z = a.charAt(t),
                        e += z, t += 1; return [d(e) + "\n", "TK_UNKNOWN"]
                    }
                    var V = "#";
                    if (t < u && j.test(a.charAt(t))) {
                        do {
                            z = a.charAt(t),
                            V += z, t += 1
                        }
                        while (t < u && "#" !== z && "=" !== z);
                        return "#" === z || ("[" === a.charAt(t) && "]" === a.charAt(t + 1) ? (V += "[]", t += 2) : "{" === a.charAt(t) && "}" === a.charAt(t + 1) && (V += "{}", t += 2)),
                        [V, "TK_WORD"]
                    }
                }

                if ("<" === z && ("?" === a.charAt(t) || "%" === a.charAt(t))) {
                    B.lastIndex = t - 1; var W = B.exec(a);

                    if (W) return z = W[0], t += z.length - 1, z = z.replace(k.lineBreak, "\n"),
                    [z, "TK_STRING"]
                }

                if ("<" === z && "\x3c!--" === a.substring(t - 1, t + 3)) {
                    for (t += 3, z = "\x3c!--"; !k.newline.test(a.charAt(t)) && t < u;) z += a.charAt(t),
                    t++; return r = !0, [z, "TK_COMMENT"]
                }

                if ("-" === z && r && "--\x3e" === a.substring(t - 1, t + 2)) return r = !1, t += 2, ["--\x3e", "TK_COMMENT"];
                if ("." === z) return [z, "TK_DOT"];
                if (c(z, o)) {
                    for (; t < u && c(z + a.charAt(t),
                    o) && (z += a.charAt(t),
                    !((t += 1) >= u)) ;
                    );
                    return "," === z ? [z, "TK_COMMA"] : "=" === z ? [z, "TK_EQUALS"] : [z, "TK_OPERATOR"]
                }
                return [z, "TK_UNKNOWN"]
            }
            function h(a) {
                for (var b, c = !1, d = "", e = 0, f = "", g = 0; c || e < a.length;)
                    if (b = a.charAt(e),
                    e++, c) {
                        if (c = !1, "x" === b) f = a.substr(e, 2),
                        e += 2; else {
                            if ("u" !== b) { d += "\\" + b; continue }
                            f = a.substr(e, 4),
                            e += 4
                        }

                        if (!f.match(/^[0123456789abcdefABCDEF]+$/)) return a;
                        if ((g = parseInt(f, 16)) >= 0 && g < 32) { d += "x" === b ? "\\x" + f : "\\u" + f; continue }

                        if (34 === g || 39 === g || 92 === g) d += "\\" + String.fromCharCode(g);
                        else {
                            if ("x" === b && g > 126 && g <= 255) return a; d += String.fromCharCode(g)
                        }
                    }
                    else "\\" === b ? c = !0 : d += b; return d
            }
            var i = "\n\r\t ".split(""),
            j = /[0-9]/, l = /[01234567]/, n = /[0123456789abcdefABCDEF]/, o = "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>".split(" ");
            this.line_starters = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");
            var p, q, r, s, t, u, v = this.line_starters.concat(["do", "in", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await"]),
            w = /([\s\S]*?)((?:\*\/)|$)/g, x = /([^\n\r\u2028\u2029]*)/g, y = /\/\* beautify( \w+[:]\w+)+ \*\//g, z = / (\w+)[:](\w+)/g, A = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g, B = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g; this.tokenize = function () {
                u = a.length, t = 0, r = !1, s = []; for (var b, c, d, e = null, f = [], h = []; !c || "TK_EOF" !== c.type;) {
                    for (d = g(),
                    b = new m(d[1], d[0], p, q) ;
                    "TK_COMMENT" === b.type || "TK_BLOCK_COMMENT" === b.type || "TK_UNKNOWN" === b.type;) "TK_BLOCK_COMMENT" === b.type && (b.directives = d[2]),
                    h.push(b),
                    d = g(),
                    b = new m(d[1], d[0], p, q);
                    h.length && (b.comments_before = h, h = []),
                    "TK_START_BLOCK" === b.type || "TK_START_EXPR" === b.type ? (b.parent = c, f.push(e),
                    e = b) : ("TK_END_BLOCK" === b.type || "TK_END_EXPR" === b.type) && e && ("]" === b.text && "[" === e.text || ")" === b.text && "(" === e.text || "}" === b.text && "{" === e.text) && (b.parent = e.parent, e = f.pop()),
                    s.push(b),
                    c = b
                }
                return s
            }
        }
        var k = {};
        !function (a) {
            var b = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc", c = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f", d = new RegExp("[" + b + "]"),
            e = new RegExp("[" + b + c + "]");
            a.newline = /[\n\r\u2028\u2029]/, a.lineBreak = new RegExp("\r\n|" + a.newline.source),
            a.allLineBreaks = new RegExp(a.lineBreak.source, "g"),
            a.isIdentifierStart = function (a) { return a < 65 ? 36 === a || 64 === a : a < 91 || (a < 97 ? 95 === a : a < 123 || a >= 170 && d.test(String.fromCharCode(a))) },
            a.isIdentifierChar = function (a) { return a < 48 ? 36 === a : a < 58 || !(a < 65) && (a < 91 || (a < 97 ? 95 === a : a < 123 || a >= 170 && e.test(String.fromCharCode(a)))) }
        }(k);
        var l = { BlockStatement: "BlockStatement", Statement: "Statement", ObjectLiteral: "ObjectLiteral", ArrayLiteral: "ArrayLiteral", ForInitializer: "ForInitializer", Conditional: "Conditional", Expression: "Expression" },
        m = function (a, b, c, d, e, f) { this.type = a, this.text = b, this.comments_before = [], this.newlines = c || 0, this.wanted_newline = c > 0, this.whitespace_before = d || "", this.parent = null, this.directives = null };
        return { run: a }
    }
});
