/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { charCounterMax: -1, charCounterCount: !0 }),
    a.FE.PLUGINS.charCounter = function (b) {
        function c() { return b.el.textContent.length }
        function d(d) {
            if (b.opts.charCounterMax < 0) return !0;
            if (c() < b.opts.charCounterMax) return !0; var e = d.which; return !(!b.keys.ctrlKey(d) && b.keys.isCharacter(e) || e === a.FE.KEYCODE.IME) || (d.preventDefault(),
            d.stopPropagation(),
            b.events.trigger("charCounter.exceeded"),
            !1)
        }
        function e(d) {
            return b.opts.charCounterMax < 0 ? d : a("<div>").html(d).text().length + c() <= b.opts.charCounterMax ? d : (b.events.trigger("charCounter.exceeded"),
            "")
        }
        function f() {
            if (b.opts.charCounterCount) {
                var a = c() + (b.opts.charCounterMax > 0 ? "/" + b.opts.charCounterMax : "");
                h.text(a),
                b.opts.toolbarBottom && h.css("margin-bottom", b.$tb.outerHeight(!0));
                var d = b.$wp.get(0).offsetWidth - b.$wp.get(0).clientWidth; d >= 0 && ("rtl" == b.opts.direction ? h.css("margin-left", d) : h.css("margin-right", d))
            }
        }
        function g() {
            return !!b.$wp && (!!b.opts.charCounterCount && (h = a('<span class="fr-counter"></span>'),
            h.css("bottom", b.$wp.css("border-bottom-width")),
            b.$box.append(h),
            b.events.on("keydown", d, !0),
            b.events.on("paste.afterCleanup", e),
            b.events.on("keyup contentChanged input", function () { b.events.trigger("charCounter.update") }),
            b.events.on("charCounter.update", f),
            b.events.trigger("charCounter.update"),
            void b.events.on("destroy", function () {
                a(b.o_win).off("resize.char" + b.id),
                h.removeData().remove(),
                h = null
            })))
        }
        var h; return { _init: g, count: c }
    }
});
