/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { fontSize: ["8", "9", "10", "11", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96"], fontSizeSelection: !1, fontSizeDefaultSelection: "12" }),
    a.FE.PLUGINS.fontSize = function (b) {
        function c(a) { b.format.applyStyle("font-size", a) }
        function d(c, d) {
            var e = a(b.selection.element()).css("font-size");
            d.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1),
            d.find('.fr-command[data-param1="' + e + '"]').addClass("fr-active").attr("aria-selected", !0);
            var f = d.find(".fr-dropdown-list"),
            g = d.find(".fr-active").parent();
            g.length ? f.parent().scrollTop(g.offset().top - f.offset().top - (f.parent().outerHeight() / 2 - g.outerHeight() / 2)) : f.parent().scrollTop(0)
        }
        function e(c) {
            if (b.opts.fontSizeSelection) {
                var d = b.helpers.getPX(a(b.selection.element()).css("font-size"));
                c.find("> span").text(d)
            }
        }
        return { apply: c, refreshOnShow: d, refresh: e }
    },
    a.FE.RegisterCommand("fontSize", {
        type: "dropdown", title: "Font Size", displaySelection: function (a) { return a.opts.fontSizeSelection },
        displaySelectionWidth: 30, defaultSelection: function (a) { return a.opts.fontSizeDefaultSelection },
        html: function () {
            for (var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.fontSize, c = 0; c < b.length; c++) { var d = b[c]; a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontSize" data-param1="' + d + 'px" title="' + d + '">' + d + "</a></li>" }
            return a += "</ul>"
        },
        callback: function (a, b) { this.fontSize.apply(b) },
        refresh: function (a) { this.fontSize.refresh(a) },
        refreshOnShow: function (a, b) { this.fontSize.refreshOnShow(a, b) },
        plugin: "fontSize"
    }),
    a.FE.DefineIcon("fontSize", { NAME: "text-height" })
});
