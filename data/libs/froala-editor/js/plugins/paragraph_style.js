/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        paragraphStyles: { "fr-text-gray": "Gray", "fr-text-bordered": "Bordered", "fr-text-spaced": "Spaced", "fr-text-uppercase": "Uppercase" },
        paragraphMultipleStyles: !0
    }),
    a.FE.PLUGINS.paragraphStyle = function (b) {
        function c(c, d, e) {
            void 0 === d && (d = b.opts.paragraphStyles),
            void 0 === e && (e = b.opts.paragraphMultipleStyles);
            var f = ""; e || (f = Object.keys(d),
            f.splice(f.indexOf(c),
            1),
            f = f.join(" ")),
            b.selection.save(),
            b.html.wrap(!0, !0, !0, !0),
            b.selection.restore();
            var g = b.selection.blocks();
            b.selection.save();
            for (var h = a(g[0]).hasClass(c),
            i = 0; i < g.length; i++) a(g[i]).removeClass(f).toggleClass(c, !h),
            a(g[i]).hasClass("fr-temp-div") && a(g[i]).removeClass("fr-temp-div"),
            "" === a(g[i]).attr("class") && a(g[i]).removeAttr("class");
            b.html.unwrap(),
            b.selection.restore()
        }
        function d(c, d) {
            var e = b.selection.blocks();

            if (e.length) {
                var f = a(e[0]);
                d.find(".fr-command").each(function () {
                    var b = a(this).data("param1"),
                    c = f.hasClass(b);
                    a(this).toggleClass("fr-active", c).attr("aria-selected", c)
                })
            }
        }
        function e() { }
        return { _init: e, apply: c, refreshOnShow: d }
    },
    a.FE.RegisterCommand("paragraphStyle", {
        type: "dropdown", html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.paragraphStyles; for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command ' + c + '" tabIndex="-1" role="option" data-cmd="paragraphStyle" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        title: "Paragraph Style", callback: function (a, b) { this.paragraphStyle.apply(b) },
        refreshOnShow: function (a, b) { this.paragraphStyle.refreshOnShow(a, b) },
        plugin: "paragraphStyle"
    }),
    a.FE.DefineIcon("paragraphStyle", { NAME: "magic" })
});
