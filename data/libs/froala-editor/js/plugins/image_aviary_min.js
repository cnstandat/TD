/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
         a(c)
    }
    : a(window.jQuery)
}(function (a) {
    if (a.extend(a.FE.DEFAULTS, {
        aviaryKey: "66b921965e474512871d025ada1c040d", aviaryScriptURL: "https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js", aviaryOptions: { displayImageSize: !0, theme: "minimum" }
    }),
     a.FE.PLUGINS.imageAviary = function (b) {
     function c(a, b) {
     var c = document.createElement("script");
     c.type = "text/javascript", c.defer = "defer", c.src = a, c.innerText = "", c.onload = b, document.getElementsByTagName("head")[0].appendChild(c)
    }
    function d() { b.shared.feather_editor || (b.shared.feather_editor = !0, "undefined" == typeof Aviary ? c(b.opts.aviaryScriptURL, e) : e()) }
    function e() {
    b.shared.feather_editor = new Aviary.Feather(a.extend({
        apiKey: b.opts.aviaryKey, onSave: function (c, d) {
    var e = new Image; e.crossOrigin = "Anonymous", e.onload = function () {
    var c = document.createElement("CANVAS"),
     d = c.getContext("2d");
     c.height = this.height, c.width = this.width, d.drawImage(this, 0, 0);
     for (var e = c.toDataURL("image/png"),
     f = atob(e.split(",")[1]),
     g = [], h = 0; h < f.length; h++) g.push(f.charCodeAt(h));
     var i = new Blob([new Uint8Array(g)], { type: "image/png" });
     b.shared.feather_editor.instance.image.edit(a(b.shared.feather_editor.current_image)),
     b.shared.feather_editor.instance.image.upload([i]),
     b.shared.feather_editor.close()
    },
     e.src = d, b.shared.feather_editor.showWaitIndicator()
    },
        onError: function (a) { throw new Error(a.message) },
        onClose: function () { b.shared.feather_editor.instance.image.get() || b.shared.feather_editor.instance.image.edit(a(b.shared.feather_editor.current_image)) }
    },
     b.opts.aviaryOptions))
    }
    function f(a) { "object" == typeof a.shared.feather_editor && (a.shared.feather_editor.current_image = a.image.get()[0], a.shared.feather_editor.instance = a, a.shared.feather_editor.launch({ image: a.image.get()[0], url: a.image.get()[0].src })) }
    return { _init: d, launch: f }
    },
     a.FE.DefineIcon("aviary", { NAME: "sliders" }),
     a.FE.RegisterCommand("aviary", {
        title: "Advanced Edit", undo: !1, focus: !1, callback: function (a, b) { this.imageAviary.launch(this) },
        plugin: "imageAviary"
    }),
     !a.FE.PLUGINS.image) throw new Error("Image Aviary plugin requires image plugin.");
    a.FE.DEFAULTS.imageEditButtons.push("aviary")
});
