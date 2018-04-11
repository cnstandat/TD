/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { lineBreakerTags: ["table", "hr", "form", "dl", "span.fr-video", ".fr-embedly"], lineBreakerOffset: 15, lineBreakerHorizontalOffset: 10 }),
    a.FE.PLUGINS.lineBreaker = function (b) {
        function c(a, c) {
            var d, e, f, g, h, i, j, k;
            if (null == a) g = c.parent(),
            h = g.offset().top, j = c.offset().top, d = j - Math.min((j - h) / 2, b.opts.lineBreakerOffset),
            f = g.outerWidth(),
            e = g.offset().left; else
                if (null == c) g = a.parent(),
                i = g.offset().top + g.outerHeight(),
                k = a.offset().top + a.outerHeight(),
                d = k + Math.min((i - k) / 2, b.opts.lineBreakerOffset),
                f = g.outerWidth(),
                e = g.offset().left; else {
                    g = a.parent();
                    var l = a.offset().top + a.height(),
                    m = c.offset().top;
                    if (l > m) return !1; d = (l + m) / 2, f = g.outerWidth(),
                    e = g.offset().left
                }
            b.opts.iframe && (e += b.$iframe.offset().left - b.helpers.scrollLeft(),
            d += b.$iframe.offset().top - b.helpers.scrollTop()),
            b.$box.append(q),
            q.css("top", d - b.win.pageYOffset),
            q.css("left", e - b.win.pageXOffset),
            q.css("width", f),
            q.data("tag1", a),
            q.data("tag2", c),
            q.addClass("fr-visible").data("instance", b)
        }
        function d(a, d) {
            var f, g, h = a.offset().top, i = a.offset().top + a.outerHeight();

            if (Math.abs(i - d) <= b.opts.lineBreakerOffset || Math.abs(d - h) <= b.opts.lineBreakerOffset)
                if (Math.abs(i - d) < Math.abs(d - h)) {
                    g = a.get(0);
                    for (var j = g.nextSibling; j && j.nodeType == Node.TEXT_NODE && 0 === j.textContent.length;) j = j.nextSibling;
                    if (!j) return c(a, null),
                    !0;
                    if (f = e(j)) return c(a, f),
                    !0
                }
                else {
                    if (g = a.get(0),
                    !g.previousSibling) return c(null, a),
                    !0;
                    if (f = e(g.previousSibling)) return c(f, a),
                    !0
                }
            q.removeClass("fr-visible").removeData("instance")
        }
        function e(c) {
            if (c) {
                var d = a(c);

                if (0 === b.$el.find(d).length) return null;
                if (c.nodeType != Node.TEXT_NODE && d.is(b.opts.lineBreakerTags.join(","))) return d;
                if (d.parents(b.opts.lineBreakerTags.join(",")).length > 0) return c = d.parents(b.opts.lineBreakerTags.join(",")).get(0),
                0 !== b.$el.find(c).length && a(c).is(b.opts.lineBreakerTags.join(",")) ? a(c) : null
            }
            return null
        }
        function f(c, d) {
            var e = b.doc.elementFromPoint(c, d);
            return e && !a(e).closest(".fr-line-breaker").length && !b.node.isElement(e) && e != b.$wp.get(0) && a(e).closest(b.$wp).length ? e : null
        }
        function g(a, c, d) {
            for (var e = d, g = null; e <= b.opts.lineBreakerOffset && !g;) g = f(a, c - e),
            g || (g = f(a, c + e)),
            e += d; return g
        }
        function h(a, c, d) {
            for (var e = null; !e && a > b.$box.offset().left && a < b.$box.offset().left + b.$box.outerWidth() ;
            ) e = f(a, c),
            e || (e = g(a, c, 5)),
            "left" == d ? a -= b.opts.lineBreakerHorizontalOffset : a += b.opts.lineBreakerHorizontalOffset; return e
        }
        function i(a) {
            s = null; var c = null, f = null, i = b.doc.elementFromPoint(a.pageX - b.win.pageXOffset, a.pageY - b.win.pageYOffset);
            i && ("HTML" == i.tagName || "BODY" == i.tagName || b.node.isElement(i) || (i.getAttribute("class") || "").indexOf("fr-line-breaker") >= 0) ? (f = g(a.pageX - b.win.pageXOffset, a.pageY - b.win.pageYOffset, 1),
            f || (f = h(a.pageX - b.win.pageXOffset - b.opts.lineBreakerHorizontalOffset, a.pageY - b.win.pageYOffset, "left")),
            f || (f = h(a.pageX - b.win.pageXOffset + b.opts.lineBreakerHorizontalOffset, a.pageY - b.win.pageYOffset, "right")),
            c = e(f)) : c = e(i),
            c ? d(c, a.pageY) : b.core.sameInstance(q) && q.removeClass("fr-visible").removeData("instance")
        }
        function j(a) {
            return !(q.hasClass("fr-visible") && !b.core.sameInstance(q)) && (b.popups.areVisible() || b.el.querySelector(".fr-selected-cell") ? (q.removeClass("fr-visible"),
            !0) : void (!1 !== r || b.edit.isDisabled() || (s && clearTimeout(s),
            s = setTimeout(i, 30, a))))
        }
        function k() {
            s && clearTimeout(s),
            q.hasClass("fr-visible") && q.removeClass("fr-visible").removeData("instance")
        }
        function l() { r = !0, k() }
        function m() { r = !1 }
        function n(c) {
            if (!b.core.sameInstance(q)) return !0; c.preventDefault(),
            q.removeClass("fr-visible").removeData("instance");
            var d = q.data("tag1"),
            e = q.data("tag2"),
            f = b.html.defaultTag();
            null == d ? f && "TD" != e.parent().get(0).tagName && 0 === e.parents(f).length ? e.before("<" + f + ">" + a.FE.MARKERS + "<br></" + f + ">") : e.before(a.FE.MARKERS + "<br>") : f && "TD" != d.parent().get(0).tagName && 0 === d.parents(f).length ? d.after("<" + f + ">" + a.FE.MARKERS + "<br></" + f + ">") : d.after(a.FE.MARKERS + "<br>"),
            b.selection.restore()
        }
        function o() {
            b.shared.$line_breaker || (b.shared.$line_breaker = a('<div class="fr-line-breaker"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + b.language.translate("Break") + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="21" y="11" width="2" height="8"/><rect x="14" y="17" width="7" height="2"/><path d="M14.000,14.000 L14.000,22.013 L9.000,18.031 L14.000,14.000 Z"/></svg></a></div>')),
            q = b.shared.$line_breaker, b.events.on("shared.destroy", function () {
                q.html("").removeData().remove(),
                q = null
            },
            !0),
            b.events.on("destroy", function () {
                q.removeData("instance").removeClass("fr-visible").appendTo("body:first"),
                clearTimeout(s)
            },
            !0),
            b.events.$on(q, "mousemove", function (a) { a.stopPropagation() },
            !0),
            b.events.$on(q, "mousedown", "a", function (a) { a.stopPropagation() },
            !0),
            b.events.$on(q, "click", "a", n, !0)
        }
        function p() {
            if (!b.$wp) return !1; o(),
            r = !1, b.events.$on(b.$win, "mousemove", j),
            b.events.$on(a(b.win),
            "scroll", k),
            b.events.on("popups.show.table.edit", k),
            b.events.on("commands.after", k),
            b.events.$on(a(b.win),
            "mousedown", l),
            b.events.$on(a(b.win),
            "mouseup", m)
        }
        var q, r, s; return { _init: p }
    }
});
