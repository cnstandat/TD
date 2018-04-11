/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { wordDeniedTags: [], wordDeniedAttrs: [], wordAllowedStyleProps: ["font-family", "font-size", "background", "color", "width", "text-align", "vertical-align", "background-color", "padding", "margin", "height", "margin-top", "margin-left", "margin-right", "margin-bottom", "text-decoration", "font-weight", "font-style"], wordPasteModal: !0 }),
    a.FE.PLUGINS.wordPaste = function (b) {
        function c() {
            b.events.on("paste.wordPaste", function (a) {
                return A = a, b.opts.wordPasteModal ? e() : g(!0),
                !1
            })
        }
        function d() { var a = '<div class="fr-word-paste-modal" style="padding: 20px 20px 10px 20px;">'; return a += '<p style="text-align: left;">' + b.language.translate("The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?") + "</p>", a += '<div style="text-align: right; margin-top: 50px;"><button class="fr-remove-word fr-command">' + b.language.translate("Clean") + '</button> <button class="fr-keep-word fr-command">' + b.language.translate("Keep") + "</button></div>", a += "</div>" }
        function e() {
            if (!z) {
                var c = '<h4><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.95 73.23" style="height: 25px; vertical-align: text-bottom; margin-right: 5px; display: inline-block"><defs><style>.a{fill:#2a5699;}.b{fill:#fff;}</style></defs><path class="a" d="M615.15,827.22h5.09V834c9.11.05,18.21-.09,27.32.05a2.93,2.93,0,0,1,3.29,3.25c.14,16.77,0,33.56.09,50.33-.09,1.72.17,3.63-.83,5.15-1.24.89-2.85.78-4.3.84-8.52,0-17,0-25.56,0v6.81h-5.32c-13-2.37-26-4.54-38.94-6.81q0-29.8,0-59.59c13.05-2.28,26.11-4.5,39.17-6.83Z" transform="translate(-575.97 -827.22)"/><path class="b" d="M620.24,836.59h28.1v54.49h-28.1v-6.81h22.14v-3.41H620.24v-4.26h22.14V873.2H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24V846h22.14v-3.41H620.24Zm-26.67,15c1.62-.09,3.24-.16,4.85-.25,1.13,5.75,2.29,11.49,3.52,17.21,1-5.91,2-11.8,3.06-17.7,1.7-.06,3.41-.15,5.1-.26-1.92,8.25-3.61,16.57-5.71,24.77-1.42.74-3.55,0-5.24.09-1.13-5.64-2.45-11.24-3.47-16.9-1,5.5-2.29,10.95-3.43,16.42q-2.45-.13-4.92-.3c-1.41-7.49-3.07-14.93-4.39-22.44l4.38-.18c.88,5.42,1.87,10.82,2.64,16.25,1.2-5.57,2.43-11.14,3.62-16.71Z" transform="translate(-575.97 -827.22)"/></svg> ' + b.language.translate("Word Paste Detected") + "</h4>", e = d(),
                f = b.modals.create(B, c, e),
                g = f.$body; z = f.$modal, f.$modal.addClass("fr-middle"),
                b.events.bindClick(g, "button.fr-remove-word", function () { (z.data("instance") || b).wordPaste.clean() }),
                b.events.bindClick(g, "button.fr-keep-word", function () { (z.data("instance") || b).wordPaste.clean(!0) }),
                b.events.$on(a(b.o_win),
                "resize", function () { b.modals.resize(B) })
            }
            b.modals.show(B),
            b.modals.resize(B)
        }
        function f() { b.modals.hide(B) }
        function g(a) {
            var c = b.opts.wordAllowedStyleProps; a || (b.opts.wordAllowedStyleProps = []),
            A = A.replace(/^\n*/g, "").replace(/^ /g, ""),
            0 === A.indexOf("<colgroup>") && (A = "<table>" + A + "</table>"),
            A = y(A, b.paste.getRtfClipboard()),
            A = b.paste.removeEmptyTags(A),
            f(),
            b.paste.clean(A, !0, !0),
            b.opts.wordAllowedStyleProps = c
        }
        function h(a) { a.parentNode && a.parentNode.removeChild(a) }
        function i(a, b) {
            if (b(a)) for (var c = a.firstChild; c;) {
                var d = c, e = c.previousSibling; c = c.nextSibling, i(d, b),
                d.previousSibling || d.nextSibling || d.parentNode || !c || e == c.previousSibling || !c.parentNode ? d.previousSibling || d.nextSibling || d.parentNode || !c || c.previousSibling || c.nextSibling || c.parentNode || (e ? c = e.nextSibling ? e.nextSibling.nextSibling : null : a.firstChild && (c = a.firstChild.nextSibling)) : c = e ? e.nextSibling : a.firstChild
            }
        }
        function j(a) {
            if (!a.getAttribute("style") || !/mso-list:[\s]*l/gi.test(a.getAttribute("style").replace(/\n/gi, ""))) return !1; try {
                if (!a.querySelector('[style="mso-list:Ignore"]')) return !1
            }
            catch (b) { return !1 }
            return !0
        }
        function k(a) { return a.getAttribute("style").replace(/\n/gi, "").replace(/.*level([0-9]+?).*/gi, "$1") }
        function l(a, b) {
            var c = a.cloneNode(!0);

            if (c.firstElementChild && "A" == c.firstElementChild.tagName && (c = c.firstElementChild),
            -1 != ["H1", "H2", "H3", "H4", "H5", "H6"].indexOf(a.tagName)) {
                var d = document.createElement(a.tagName.toLowerCase());
                d.setAttribute("style", a.getAttribute("style")),
                d.innerHTML = c.innerHTML, c.innerHTML = d.outerHTML
            }
            i(c, function (a) {
                return a.nodeType == Node.ELEMENT_NODE && ("mso-list:Ignore" == a.getAttribute("style") && a.parentNode.removeChild(a),
                v(a, b)),
                !0
            });
            var e = c.innerHTML; return e = e.replace(/<!--[\s\S]*?-->/gi, "")
        }
        function m(a, b) {
            var c = /[0-9a-zA-Z]./gi, d = !1; a.firstElementChild && a.firstElementChild.firstElementChild && a.firstElementChild.firstElementChild.firstChild && !(d = d || c.test(a.firstElementChild.firstElementChild.firstChild.data || "")) && a.firstElementChild.firstElementChild.firstElementChild && a.firstElementChild.firstElementChild.firstElementChild.firstChild && (d = d || c.test(a.firstElementChild.firstElementChild.firstElementChild.firstChild.data || ""));
            var e = d ? "ol" : "ul", f = k(a),
            g = "<" + e + "><li>" + l(a, b),
            i = a.nextElementSibling, n = a.parentNode; for (h(a),
            a = null; i && j(i) ;
            ) {
                var o = i.previousElementSibling, p = k(i);

                if (p > f) g += m(i, b).outerHTML; else {
                    if (p < f) break; g += "</li><li>" + l(i, b)
                }

                if (f = p, i.previousElementSibling || i.nextElementSibling || i.parentNode) {
                    var q = i; i = i.nextElementSibling, h(q),
                    q = null
                }
                else i = o ? o.nextElementSibling : n.firstElementChild
            }
            g += "</li></" + e + ">"; var r = document.createElement("div");
            return r.innerHTML = g, r.firstElementChild
        }
        function n(a, b) {
            for (var c = document.createElement(b),
            d = 0; d < a.attributes.length; d++) { var e = a.attributes[d].name; c.setAttribute(e, a.getAttribute(e)) }
            return c.innerHTML = a.innerHTML, a.parentNode.replaceChild(c, a),
            c
        }
        function o(c, d) {
            b.node.clearAttributes(c);
            for (var e = c.firstElementChild, f = 0, g = !1, i = null; e;) {
                e.firstElementChild && -1 != e.firstElementChild.tagName.indexOf("W:") && (e.innerHTML = e.firstElementChild.innerHTML),
                i = e.getAttribute("width"),
                i || g || (g = !0),
                f += parseInt(i, 10),
                (!e.firstChild || e.firstChild && e.firstChild.data == a.FE.UNICODE_NBSP) && (e.firstChild && h(e.firstChild),
                e.innerHTML = "<br>");
                for (var k = e.firstElementChild, l = 1 == e.children.length; k;) "P" != k.tagName || j(k) || l && p(k),
                k = k.nextElementSibling;
                if (d) {
                    var m = e.getAttribute("class");

                    if (m) {
                        m = q(m);
                        var n = m.match(/xl[0-9]+/gi);

                        if (n) { var o = n[0], s = "." + o; d[s] && r(e, d[s]) }
                    }
                    d.td && r(e, d.td)
                }
                var t = e.getAttribute("style");
                t && (t = q(t)) && ";" != t.slice(-1) && (t += ";");
                var u = e.getAttribute("valign");

                if (!u && t) {
                    var v = t.match(/vertical-align:.+?[; "]{1,1}/gi);
                    v && (u = v[v.length - 1].replace(/vertical-align:(.+?)[; "]{1,1}/gi, "$1"))
                }
                var w = null;
                if (t) {
                    var x = t.match(/text-align:.+?[; "]{1,1}/gi);
                    x && (w = x[x.length - 1].replace(/text-align:(.+?)[; "]{1,1}/gi, "$1")),
                    "general" == w && (w = null)
                }
                var y = null;
                if (t) {
                    var z = t.match(/background:.+?[; "]{1,1}/gi);
                    z && (y = z[z.length - 1].replace(/background:(.+?)[; "]{1,1}/gi, "$1"))
                }
                var A = e.getAttribute("colspan"),
                B = e.getAttribute("rowspan");
                A && e.setAttribute("colspan", A),
                B && e.setAttribute("rowspan", B),
                u && (e.style["vertical-align"] = u),
                w && (e.style["text-align"] = w),
                y && (e.style["background-color"] = y),
                i && e.setAttribute("width", i),
                e = e.nextElementSibling
            }
            for (e = c.firstElementChild; e;) i = e.getAttribute("width"),
            g ? e.removeAttribute("width") : e.setAttribute("width", 100 * parseInt(i, 10) / f + "%"),
            e = e.nextElementSibling
        }
        function p(a) {
            var b = a.parentNode, c = a.getAttribute("align");
            c && (b && "TD" == b.tagName ? (b.setAttribute("style", b.getAttribute("style") + "text-align:" + c + ";"),
            a.removeAttribute("align")) : (a.style["text-align"] = c, a.removeAttribute("align")))
        }
        function q(a) { return a.replace(/\n|\r|\n\r|&quot;/g, "") }
        function r(a, b, c) {
            if (b) {
                var d = a.getAttribute("style");
                d && ";" != d.slice(-1) && (d += ";"),
                b && ";" != b.slice(-1) && (b += ";"),
                b = b.replace(/\n/gi, "");
                var e = null; e = c ? (d || "") + b : b + (d || ""),
                a.setAttribute("style", e)
            }
        }
        function s(a) {
            var b = a.getAttribute("style");

            if (b) {
                b = q(b),
                b && ";" != b.slice(-1) && (b += ";");
                var c = b.match(/(^|\S+?):.+?;{1,1}/gi);

                if (c) {
                    for (var d = {},
                    e = 0; e < c.length; e++) {
                        var f = c[e], g = f.split(":");
                        2 == g.length && ("text-align" == g[0] && "SPAN" == a.tagName || (d[g[0]] = g[1]))
                    }
                    var h = ""; for (var i in d)
                        if (d.hasOwnProperty(i)) {
                            if ("font-size" == i && "pt;" == d[i].slice(-3)) {
                                var j = null; try {
                                    j = parseFloat(d[i].slice(0, -3),
                                    10)
                                }
                                catch (k) { }
                                j && (j = Math.round(1.33 * j),
                                d[i] = j + "px;")
                            }
                            h += i + ":" + d[i]
                        }
                    h && a.setAttribute("style", h)
                }
            }
        }
        function t(a) {
            for (var b = a.match(/[0-9a-f]{2}/gi),
            c = [], d = 0; d < b.length; d++) c.push(String.fromCharCode(parseInt(b[d], 16)));
            var e = c.join("");
            return btoa(e)
        }
        function u(b, c) {
            if (c) {
                var d;
                if ("IMG" == b.tagName) {
                    var e = b.getAttribute("src");

                    if (!e || -1 == e.indexOf("file://")) return; d = C[b.getAttribute("v:shapes")]
                }
                else d = b.parentNode.getAttribute("o:spid");

                if (d) {
                    var f = "hplid" + d.substring(8),
                    g = c.split(f);

                    if (!g || 2 == g.length) {
                        var h = g[1].split("bliptag");

                        if (!(h && h.length < 2)) {
                            var i = null;
                            if (-1 != h[0].indexOf("pngblip") ? i = "image/png" : -1 != h[0].indexOf("jpegblip") && (i = "image/jpeg"),
                            i) {
                                var j = h[1].split("}");

                                if (!(j && j.length < 2)) {
                                    var k;
                                    if (j.length > 2 && -1 != j[0].indexOf("blipuid")) k = j[1].split(" ");
                                    else {
                                        if ((k = j[0].split(" ")) && k.length < 2) return; k.shift()
                                    }
                                    var l = k.join(""),
                                    m = t(l),
                                    n = "data:" + i + ";base64," + m; "IMG" === b.tagName ? (b.src = n, b.setAttribute("data-fr-image-pasted", !0)) : a(b.parentNode).before('<img data-fr-image-pasted="true" src="' + n + '" style="' + b.parentNode.getAttribute("style") + '">').remove()
                                }
                            }
                        }
                    }
                }
            }
        }
        function v(b, c) {
            var d = b.tagName, e = d.toLowerCase();

            if (b.firstElementChild && ("I" == b.firstElementChild.tagName ? n(b.firstElementChild, "em") : "B" == b.firstElementChild.tagName && n(b.firstElementChild, "strong")),
            -1 != ["SCRIPT", "APPLET", "EMBED", "NOFRAMES", "NOSCRIPT"].indexOf(d)) return h(b),
            !1; "O:P" == d && "&nbsp;" == b.innerHTML && (b.innerHTML = a.FE.INVISIBLE_SPACE);
            var f = -1, g = ["META", "LINK", "XML", "ST1:", "O:", "W:", "FONT"]; for (f = 0; f < g.length; f++)
                if (-1 != d.indexOf(g[f])) return b.innerHTML ? (b.outerHTML = b.innerHTML, h(b),
                !1) : (h(b),
                !1);

            if ("TD" != d) {
                var i = b.getAttribute("class");

                if (c && i) {
                    i = q(i);
                    var j = i.split(" ");
                    for (f = 0; f < j.length; f++) {
                        var k = j[f], l = [], m = "." + k; l.push(m),
                        m = e + m, l.push(m);
                        for (var s = 0; s < l.length; s++) c[l[s]] && r(b, c[l[s]])
                    }
                    b.removeAttribute("class")
                }
                c && c[e] && r(b, c[e])
            }

            if (-1 != ["P", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"].indexOf(d)) {
                var t = b.getAttribute("class");

                if (t && (c && c[d.toLowerCase() + "." + t] && r(b, c[d.toLowerCase() + "." + t]),
                -1 != t.toLowerCase().indexOf("mso"))) {
                    var u = q(t);
                    u = u.replace(/[0-9a-z-_]*mso[0-9a-z-_]*/gi, ""),
                    u ? b.setAttribute("class", u) : b.removeAttribute("class")
                }
                var v = b.getAttribute("style");

                if (v) {
                    var w = v.match(/text-align:.+?[; "]{1,1}/gi);
                    w && w[w.length - 1].replace(/(text-align:.+?[; "]{1,1})/gi, "$1")
                }
                p(b)
            }

            if ("TR" == d && o(b, c),
            "A" == d && !b.attributes.getNamedItem("href") && b.innerHTML && (b.outerHTML = b.innerHTML),
            "TD" != d && "TH" != d || b.innerHTML || (b.innerHTML = "<br>"),
            "TABLE" == d && (b.style.width = "100%"),
            b.getAttribute("lang") && b.removeAttribute("lang"),
            b.getAttribute("style") && -1 != b.getAttribute("style").toLowerCase().indexOf("mso")) {
                var x = q(b.getAttribute("style"));
                x = x.replace(/[0-9a-z-_]*mso[0-9a-z-_]*:.+?(;{1,1}|$)/gi, ""),
                x ? b.setAttribute("style", x) : b.removeAttribute("style")
            }
            return !0
        }
        function w(a) {
            var b = {},
            c = a.getElementsByTagName("style");

            if (c.length) {
                var d = c[0], e = d.innerHTML.match(/[\S ]+\s+{[\s\S]+?}/gi);

                if (e) for (var f = 0; f < e.length; f++) {
                    var g = e[f], h = g.replace(/([\S ]+\s+){[\s\S]+?}/gi, "$1"),
                    i = g.replace(/[\S ]+\s+{([\s\S]+?)}/gi, "$1");
                    h = h.replace(/^[\s]|[\s]$/gm, ""),
                    i = i.replace(/^[\s]|[\s]$/gm, ""),
                    h = h.replace(/\n|\r|\n\r/g, ""),
                    i = i.replace(/\n|\r|\n\r/g, "");
                    for (var j = h.split(", "),
                    k = 0; k < j.length; k++) b[j[k]] = i
                }
            }
            return b
        }
        function x(a) {
            for (var b = a.split("v:shape"),
            c = 1; c < b.length; c++) {
                var d = b[c], e = d.split(' id="')[1];
                if (e && e.length > 1) { e = e.split('"')[0]; var f = d.split(' o:spid="')[1]; f && f.length > 1 && (f = f.split('"')[0], C[e] = f) }
            }
        }
        function y(c, d) {
            c = c.replace(/[.\s\S\w\W<>]*(<html[^>]*>[.\s\S\w\W<>]*<\/html>)[.\s\S\w\W<>]*/gi, "$1"),
            x(c);
            var e = new DOMParser, f = e.parseFromString(c, "text/html"),
            g = f.head, k = f.body, l = w(g);
            i(k, function (b) {
                if (b.nodeType == Node.TEXT_NODE && /\n|\u00a0/.test(b.data)) {
                    if (!/\S/.test(b.data)) return b.data == a.FE.UNICODE_NBSP ? (b.data = "\u200b", !0) : (h(b),
                    !1);
                    b.data = b.data.replace(/\n/gi, " ")
                }
                return !0
            }),
            i(k, function (a) {
                return a.nodeType != Node.ELEMENT_NODE || "V:IMAGEDATA" != a.tagName && "IMG" != a.tagName || u(a, d),
                !0
            }),
            i(k, function (a) {
                if (a.nodeType == Node.TEXT_NODE) return a.data = a.data.replace(/<br>(\n|\r)/gi, "<br>"),
                !1;
                if (a.nodeType == Node.ELEMENT_NODE) {
                    if (j(a)) {
                        var b = a.parentNode, c = a.previousSibling, d = m(a, l),
                        e = null; return e = c ? c.nextSibling : b.firstChild, e ? b.insertBefore(d, e) : b.appendChild(d),
                        !1
                    }
                    return v(a, l)
                }
                return a.nodeType != Node.COMMENT_NODE || (h(a),
                !1)
            }),
            i(k, function (a) {
                if (a.nodeType == Node.ELEMENT_NODE) {
                    var b = a.tagName;
                    if (!a.innerHTML && -1 == ["BR", "IMG"].indexOf(b)) {
                        for (var c = a.parentNode; c && (h(a),
                        a = c, !a.innerHTML) ;
                        ) c = a.parentNode; return !1
                    }
                    s(a)
                }
                return !0
            });
            var n = k.outerHTML, o = b.opts.htmlAllowedStyleProps; return b.opts.htmlAllowedStyleProps = b.opts.wordAllowedStyleProps, n = b.clean.html(n, b.opts.wordDeniedTags, b.opts.wordDeniedAttrs, !1),
            b.opts.htmlAllowedStyleProps = o, n
        }
        var z, A, B = "word_paste", C = {};
        return { _init: c, clean: g }
    }
});
