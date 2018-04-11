/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.FE.PLUGINS.lists = function (b) {
        function c(a) { return '<span class="fr-open-' + a.toLowerCase() + '"></span>' }
        function d(a) { return '<span class="fr-close-' + a.toLowerCase() + '"></span>' }
        function e(b, c) {
            for (var d = [], e = 0; e < b.length; e++) { var f = b[e].parentNode; "LI" == b[e].tagName && f.tagName != c && d.indexOf(f) < 0 && d.push(f) }
            for (e = d.length - 1; e >= 0; e--) {
                var g = a(d[e]);
                g.replaceWith("<" + c.toLowerCase() + ">" + g.html() + "</" + c.toLowerCase() + ">")
            }
        }
        function f(c, d) {
            e(c, d);
            var f, g = b.html.defaultTag(),
            h = null; c.length && (f = "rtl" == b.opts.direction || "rtl" == a(c[0]).css("direction") ? "margin-right" : "margin-left");
            for (var i = 0; i < c.length; i++)
                if ("LI" != c[i].tagName) {
                    var j = b.helpers.getPX(a(c[i]).css(f)) || 0; c[i].style.marginLeft = null, null === h && (h = j);
                    var k = h > 0 ? "<" + d + ' style="' + f + ": " + h + 'px;">' : "<" + d + ">", l = "</" + d + ">"; for (j -= h; j / b.opts.indentMargin > 0;) k += "<" + d + ">", l += l, j -= b.opts.indentMargin; g && c[i].tagName.toLowerCase() == g ? a(c[i]).replaceWith(k + "<li" + b.node.attributes(c[i]) + ">" + a(c[i]).html() + "</li>" + l) : a(c[i]).wrap(k + "<li></li>" + l)
                }
            b.clean.lists()
        }
        function g(e) {
            var f, g; for (f = e.length - 1; f >= 0; f--) for (g = f - 1; g >= 0; g--)
                if (a(e[g]).find(e[f]).length || e[g] == e[f]) {
                    e.splice(f, 1);
                    break
                }
            var h = []; for (f = 0; f < e.length; f++) {
                var i = a(e[f]),
                j = e[f].parentNode, k = i.attr("class");

                if (i.before(d(j.tagName)),
                "LI" == j.parentNode.tagName) i.before(d("LI")),
                i.after(c("LI"));
                else {
                    var l = ""; k && (l += ' class="' + k + '"');
                    var m = "rtl" == b.opts.direction || "rtl" == i.css("direction") ? "margin-right" : "margin-left"; b.helpers.getPX(a(j).css(m)) && (l += ' style="' + m + ":" + b.helpers.getPX(a(j).css(m)) + 'px;"'),
                    l && i.wrapInner("<" + b.html.defaultTag() + l + "></" + b.html.defaultTag() + ">"),
                    b.node.isEmpty(i.get(0),
                    !0) || 0 !== i.find(b.html.blockTagsQuery()).length || i.append("<br>"),
                    i.append(c("LI")),
                    i.prepend(d("LI"))
                }
                i.after(c(j.tagName)),
                "LI" == j.parentNode.tagName && (j = j.parentNode.parentNode),
                h.indexOf(j) < 0 && h.push(j)
            }
            for (f = 0; f < h.length; f++) {
                var n = a(h[f]),
                o = n.html();
                o = o.replace(/<span class="fr-close-([a-z]*)"><\/span>/g, "</$1>"),
                o = o.replace(/<span class="fr-open-([a-z]*)"><\/span>/g, "<$1>"),
                n.replaceWith(b.node.openTagString(n.get(0)) + o + b.node.closeTagString(n.get(0)))
            }
            b.$el.find("li:empty").remove(),
            b.$el.find("ul:empty, ol:empty").remove(),
            b.clean.lists(),
            b.html.wrap()
        }
        function h(a, b) {
            for (var c = !0, d = 0; d < a.length; d++) {
                if ("LI" != a[d].tagName) return !1; a[d].parentNode.tagName != b && (c = !1)
            }
            return c
        }
        function i(a) {
            b.selection.save(),
            b.html.wrap(!0, !0, !0, !0),
            b.selection.restore();
            for (var c = b.selection.blocks(),
            d = 0; d < c.length; d++) "LI" != c[d].tagName && "LI" == c[d].parentNode.tagName && (c[d] = c[d].parentNode);
            b.selection.save(),
            h(c, a) ? g(c) : f(c, a),
            b.html.unwrap(),
            b.selection.restore()
        }
        function j(c, d) {
            var e = a(b.selection.element());

            if (e.get(0) != b.el) {
                var f = e.get(0);
                f = "LI" != f.tagName && f.firstElementChild && "LI" != f.firstElementChild.tagName ? e.parents("li").get(0) : "LI" == f.tagName || f.firstElementChild ? f.firstElementChild && "LI" == f.firstElementChild.tagName ? e.get(0).firstChild : e.get(0) : e.parents("li").get(0),
                f && f.parentNode.tagName == d && b.el.contains(f.parentNode) && c.addClass("fr-active")
            }
        }
        function k(c) {
            b.selection.save();
            for (var d = 0; d < c.length; d++) {
                var e = c[d].previousSibling;
                if (e) {
                    var f = a(c[d]).find("> ul, > ol").last().get(0);

                    if (f) {
                        for (var g = a("<li>").prependTo(a(f)),
                        h = b.node.contents(c[d])[0]; h && !b.node.isList(h) ;
                        ) {
                            var i = h.nextSibling; g.append(h),
                            h = i
                        }
                        a(e).append(a(f)),
                        a(c[d]).remove()
                    }
                    else {
                        var j = a(e).find("> ul, > ol").last().get(0);

                        if (j) a(j).append(a(c[d]));
                        else {
                            var k = a("<" + c[d].parentNode.tagName + ">");
                            a(e).append(k),
                            k.append(a(c[d]))
                        }
                    }
                }
            }
            b.clean.lists(),
            b.selection.restore()
        }
        function l(a) {
            b.selection.save(),
            g(a),
            b.selection.restore()
        }
        function m(a) {
            if ("indent" == a || "outdent" == a) {
                for (var c = !1, d = b.selection.blocks(),
                e = [], f = 0; f < d.length; f++) "LI" == d[f].tagName ? (c = !0, e.push(d[f])) : "LI" == d[f].parentNode.tagName && (c = !0, e.push(d[f].parentNode));
                c && ("indent" == a ? k(e) : l(e))
            }
        }
        function n() {
            b.events.on("commands.after", m),
            b.events.on("keydown", function (c) {
                if (c.which == a.FE.KEYCODE.TAB) {
                    for (var d = b.selection.blocks(),
                    e = [], f = 0; f < d.length; f++) "LI" == d[f].tagName ? e.push(d[f]) : "LI" == d[f].parentNode.tagName && e.push(d[f].parentNode);

                    if (e.length > 1 || e.length && (b.selection.info(e[0]).atStart || b.node.isEmpty(e[0]))) return c.preventDefault(),
                    c.stopPropagation(),
                    c.shiftKey ? l(e) : k(e),
                    !1
                }
            },
            !0)
        }
        return { _init: n, format: i, refresh: j }
    },
    a.FE.RegisterCommand("formatUL", {
        title: "Unordered List", refresh: function (a) { this.lists.refresh(a, "UL") },
        callback: function () { this.lists.format("UL") },
        plugin: "lists"
    }),
    a.FE.RegisterCommand("formatOL", {
        title: "Ordered List", refresh: function (a) { this.lists.refresh(a, "OL") },
        callback: function () { this.lists.format("OL") },
        plugin: "lists"
    }),
    a.FE.DefineIcon("formatUL", { NAME: "list-ul" }),
    a.FE.DefineIcon("formatOL", { NAME: "list-ol" })
});
