/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { quickInsertButtons: ["image", "video", "embedly", "table", "ul", "ol", "hr"], quickInsertTags: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote"] }),
    a.FE.QUICK_INSERT_BUTTONS = {},
    a.FE.DefineIcon("quickInsert", { PATH: '<path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/>', template: "svg" }),
    a.FE.RegisterQuickInsertButton = function (b, c) {
        a.FE.QUICK_INSERT_BUTTONS[b] = a.extend({ undo: !0 },
        c)
    },
    a.FE.RegisterQuickInsertButton("image", {
        icon: "insertImage", requiredPlugin: "image", title: "Insert Image", undo: !1, callback: function () {
            var b = this; b.shared.$qi_image_input || (b.shared.$qi_image_input = a('<input accept="image/*" name="quickInsertImage' + this.id + '" style="display: none;" type="file">'),
            a("body:first").append(b.shared.$qi_image_input),
            b.events.$on(b.shared.$qi_image_input, "change", function () {
                var b = a(this).data("inst");
                this.files && (b.quickInsert.hide(),
                b.image.upload(this.files)),
                a(this).val("")
            },
            !0)),
            b.$qi_image_input = b.shared.$qi_image_input, b.helpers.isMobile() && b.selection.save(),
            b.$qi_image_input.data("inst", b).trigger("click")
        }
    }),
    a.FE.RegisterQuickInsertButton("video", {
        icon: "insertVideo", requiredPlugin: "video", title: "Insert Video", undo: !1, callback: function () {
            var a = prompt(this.language.translate("Paste the URL of the video you want to insert."));
            a && this.video.insertByURL(a)
        }
    }),
    a.FE.RegisterQuickInsertButton("embedly", {
        icon: "embedly", requiredPlugin: "embedly", title: "Embed URL", undo: !1, callback: function () {
            var a = prompt(this.language.translate("Paste the URL of any web content you want to insert."));
            a && this.embedly.add(a)
        }
    }),
    a.FE.RegisterQuickInsertButton("table", { icon: "insertTable", requiredPlugin: "table", title: "Insert Table", callback: function () { this.table.insert(2, 2) } }),
    a.FE.RegisterQuickInsertButton("ol", { icon: "formatOL", requiredPlugin: "lists", title: "Ordered List", callback: function () { this.lists.format("OL") } }),
    a.FE.RegisterQuickInsertButton("ul", { icon: "formatUL", requiredPlugin: "lists", title: "Unordered List", callback: function () { this.lists.format("UL") } }),
    a.FE.RegisterQuickInsertButton("hr", { icon: "insertHR", title: "Insert Horizontal Line", callback: function () { this.commands.insertHR() } }),
    a.FE.PLUGINS.quickInsert = function (b) {
        function c(a) {
            var c, d, e; c = a.offset().top - b.$box.offset().top, d = 0 - k.outerWidth(),
            e = (k.outerHeight() - a.outerHeight()) / 2, b.opts.iframe && (c += b.$iframe.offset().top - b.helpers.scrollTop()),
            k.hasClass("fr-on") && c >= 0 && l.css("top", c - e),
            c >= 0 && c - e <= b.$box.outerHeight() - a.outerHeight() ? (k.hasClass("fr-hidden") && (k.hasClass("fr-on") && g(),
            k.removeClass("fr-hidden")),
            k.css("top", c - e)) : k.hasClass("fr-visible") && (k.addClass("fr-hidden"),
            h()),
            k.css("left", d)
        }
        function d(a) {
            k || i(),
            k.hasClass("fr-on") && h(),
            b.$box.append(k),
            c(a),
            k.data("tag", a),
            k.addClass("fr-visible")
        }
        function e() {
            if (b.core.hasFocus()) {
                var c = b.selection.element();
                b.node.isBlock(c) || (c = b.node.blockParent(c)),
                c && b.node.isEmpty(c) && b.node.isElement(c.parentNode) && b.opts.quickInsertTags.indexOf(c.tagName.toLowerCase()) >= 0 ? k && k.data("tag").is(a(c)) && k.hasClass("fr-on") ? h() : b.selection.isCollapsed() && d(a(c)) : f()
            }
        }
        function f() {
            k && (b.html.checkIfEmpty(),
            k.hasClass("fr-on") && h(),
            k.removeClass("fr-visible fr-on"),
            k.css("left", -9999).css("top", -9999))
        }
        function g(c) {
            if (c && c.preventDefault(),
            k.hasClass("fr-on") && !k.hasClass("fr-hidden")) h();
            else {
                if (!b.shared.$qi_helper) {
                    for (var d = b.opts.quickInsertButtons, e = '<div class="fr-qi-helper">', f = 0, g = 0; g < d.length; g++) { var i = a.FE.QUICK_INSERT_BUTTONS[d[g]]; i && (!i.requiredPlugin || a.FE.PLUGINS[i.requiredPlugin] && b.opts.pluginsEnabled.indexOf(i.requiredPlugin) >= 0) && (e += '<a class="fr-btn fr-floating-btn" role="button" title="' + b.language.translate(i.title) + '" tabIndex="-1" data-cmd="' + d[g] + '" style="transition-delay: ' + .025 * f++ + 's;">' + b.icon.create(i.icon) + "</a>") }
                    e += "</div>", b.shared.$qi_helper = a(e),
                    b.tooltip.bind(b.shared.$qi_helper, "> a.fr-btn")
                }
                l = b.shared.$qi_helper, l.appendTo(b.$box),
                setTimeout(function () {
                    l.css("top", parseFloat(k.css("top"))),
                    l.css("left", parseFloat(k.css("left")) + k.outerWidth()),
                    l.find("a").addClass("fr-size-1"),
                    k.addClass("fr-on")
                },
                10)
            }
        }
        function h() {
            var a = b.$box.find(".fr-qi-helper");
            a.length && (a.find("a").removeClass("fr-size-1"),
            a.css("left", -9999),
            k.hasClass("fr-hidden") || k.removeClass("fr-on"))
        }
        function i() {
            b.shared.$quick_insert || (b.shared.$quick_insert = a('<div class="fr-quick-insert"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + b.language.translate("Quick Insert") + '">' + b.icon.create("quickInsert") + "</a></div>")),
            k = b.shared.$quick_insert, b.tooltip.bind(b.$box, ".fr-quick-insert > a.fr-floating-btn"),
            b.events.on("destroy", function () {
                k.removeClass("fr-on").appendTo(a("body:first")).css("left", -9999).css("top", -9999),
                l && (h(),
                l.appendTo(a("body:first")))
            },
            !0),
            b.events.on("shared.destroy", function () {
                k.html("").removeData().remove(),
                k = null, l && (l.html("").removeData().remove(),
                l = null)
            },
            !0),
            b.events.on("commands.before", f),
            b.events.on("commands.after", function () { b.popups.areVisible() || e() }),
            b.events.bindClick(b.$box, ".fr-quick-insert > a", g),
            b.events.bindClick(b.$box, ".fr-qi-helper > a.fr-btn", function (c) {
                var d = a(c.currentTarget).data("cmd");
                a.FE.QUICK_INSERT_BUTTONS[d].callback.apply(b, [c.currentTarget]),
                a.FE.QUICK_INSERT_BUTTONS[d].undo && b.undo.saveStep(),
                b.quickInsert.hide()
            }),
            b.events.$on(b.$wp, "scroll", function () { k.hasClass("fr-visible") && c(k.data("tag")) })
        }
        function j() {
            if (!b.$wp) return !1; b.opts.iframe && b.$el.parent("html").find("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css">'),
            b.popups.onShow("image.edit", f),
            b.events.on("mouseup", e),
            b.helpers.isMobile() && b.events.$on(a(b.o_doc),
            "selectionchange", e),
            b.events.on("blur", f),
            b.events.on("keyup", e),
            b.events.on("keydown", function () {
                setTimeout(function () { e() },
                0)
            })
        }
        var k, l; return { _init: j, hide: f }
    }
});
