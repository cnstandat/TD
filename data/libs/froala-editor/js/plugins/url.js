/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.FE.URLRegEx = "(^| |\\u00A0)(" + a.FE.LinkRegEx + "|([a-z0-9+-_.]{1,}@[a-z0-9+-_.]{1,}))$", a.FE.PLUGINS.url = function (b) {
        function c(c, d, e) {
            for (var f = ""; e.length && "." == e[e.length - 1];) f += ".", e = e.substring(0, e.length - 1);
            var g = e;
            if (b.opts.linkConvertEmailAddress) { a.FE.MAIL_REGEX.test(g) && !/^mailto:.*/i.test(g) && (g = "mailto:" + g) }
            return /^((http|https|ftp|ftps|mailto|tel|sms|notes|data)\:)/i.test(g) || (g = "//" + g),
            (d || "") + "<a" + (b.opts.linkAlwaysBlank ? ' target="_blank"' : "") + (j ? ' rel="' + j + '"' : "") + ' href="' + g + '">' + e.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</a>" + f
        }
        function d() { return new RegExp(a.FE.URLRegEx, "gi") }
        function e(a) {
            return b.opts.linkAlwaysNoFollow && (j = "nofollow"),
            b.opts.linkAlwaysBlank && (j ? j += " noopener noreferrer" : j = "noopener noreferrer"),
            a.replace(d(),
            c)
        }
        function f(a) { return !!a && ("A" === a.tagName || !(!a.parentNode || a.parentNode == b.el) && f(a.parentNode)) }
        function g(a) {
            var b = a.split(" ");
            return b[b.length - 1]
        }
        function h() {
            var c = b.selection.ranges(0),
            h = c.startContainer;
            if (!h || h.nodeType !== Node.TEXT_NODE) return !1;
            if (f(h)) return !1;
            if (d().test(g(h.textContent))) a(h).before(e(h.textContent)),
            h.parentNode.removeChild(h);
            else
                if (h.previousSibling && "A" === h.previousSibling.tagName) {
                    var i = h.previousSibling.innerText + h.textContent; d().test(g(i)) && (a(h.previousSibling).replaceWith(e(i)),
                    h.parentNode.removeChild(h))
                }
        }
        function i() {
            b.events.on("paste.afterCleanup", function (c) {
                var d = b.doc.createElement("div");
                d.innerHTML = c; for (var f = b.doc.createTreeWalker(d, NodeFilter.SHOW_TEXT, b.node.filter(function (b) { return new RegExp(a.FE.URLRegEx, "gi").test(b.textContent) }),
                !1) ;
                f.nextNode() ;
                ) { var g = f.currentNode; a(g).after(e(g.textContent)).remove() }
                return d.innerHTML
            }),
            b.events.on("keydown", function (c) { var d = c.which; !b.selection.isCollapsed() || d != a.FE.KEYCODE.ENTER && d != a.FE.KEYCODE.SPACE && d != a.FE.KEYCODE.PERIOD || h() },
            !0)
        }
        var j = null; return { _init: i }
    }
});
