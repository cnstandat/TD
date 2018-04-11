/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.FE.PLUGINS.align = function (b) {
        function c(c) {
            b.selection.save(),
            b.html.wrap(!0, !0, !0, !0),
            b.selection.restore();
            for (var d = b.selection.blocks(),
            e = 0; e < d.length; e++) b.helpers.getAlignment(a(d[e].parentNode)) == c ? a(d[e]).css("text-align", "").removeClass("fr-temp-div") : a(d[e]).css("text-align", c).removeClass("fr-temp-div"),
            "" === a(d[e]).attr("class") && a(d[e]).removeAttr("class"),
            "" === a(d[e]).attr("style") && a(d[e]).removeAttr("style");
            b.selection.save(),
            b.html.unwrap(),
            b.selection.restore()
        }
        function d(c) {
            var d = b.selection.blocks();

            if (d.length) {
                var e = b.helpers.getAlignment(a(d[0]));
                c.find("> *:first").replaceWith(b.icon.create("align-" + e))
            }
        }
        function e(c, d) {
            var e = b.selection.blocks();

            if (e.length) {
                var f = b.helpers.getAlignment(a(e[0]));
                d.find('a.fr-command[data-param1="' + f + '"]').addClass("fr-active").attr("aria-selected", !0)
            }
        }
        return { apply: c, refresh: d, refreshOnShow: e }
    },
    a.FE.DefineIcon("align", { NAME: "align-left" }),
    a.FE.DefineIcon("align-left", { NAME: "align-left" }),
    a.FE.DefineIcon("align-right", { NAME: "align-right" }),
    a.FE.DefineIcon("align-center", { NAME: "align-center" }),
    a.FE.DefineIcon("align-justify", { NAME: "align-justify" }),
    a.FE.RegisterCommand("align", {
        type: "dropdown", title: "Align", options: { left: "Align Left", center: "Align Center", right: "Align Right", justify: "Align Justify" },
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">', c = a.FE.COMMANDS.align.options; for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="align" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.icon.create("align-" + d) + '<span class="fr-sr-only">' + this.language.translate(c[d]) + "</span></a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) { this.align.apply(b) },
        refresh: function (a) { this.align.refresh(a) },
        refreshOnShow: function (a, b) { this.align.refreshOnShow(a, b) },
        plugin: "align"
    })
});
