/*eslint eqeqeq: "error"*/
! function (factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
            factory(c)
    } :
        factory(window.jQuery)
}(function ($) {
    if ($.extend($.FE.DEFAULTS, {
        aviaryKey: "66b921965e474512871d025ada1c040d",
        aviaryScriptURL: "https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js",
        aviaryOptions: { displayImageSize: !0, theme: "minimum" }
    }),
        $.FE.PLUGINS.imageAviary = function (editor) {
            function preLoadScript(src, callback) {
                var loadScripts = document.createElement("script");
                loadScripts.type = "text/javascript",
                    loadScripts.defer = "defer",
                    loadScripts.src = src,
                    loadScripts.innerText = "",
                    loadScripts.onload = callback, document.getElementsByTagName("head")[0].appendChild(loadScripts)
    }

            function init() {
        debugger;
        editor.shared.feather_editor || (editor.shared.feather_editor = !0, "undefined" == typeof Aviary ? preLoadScript(editor.opts.aviaryScriptURL, initIviary) : initIviary())
    }

            function initIviary() {
                editor.shared.feather_editor = new Aviary.Feather($.extend({
        apiKey: editor.opts.aviaryKey,
        onSave: function (c, d) {
                            console.log("FE save")
                            if (editor.shared.feather_editor.instance) {
                                var saveImaeg = new Image;
                                saveImaeg.crossOrigin = "Anonymous", saveImaeg.onload = function () {
                                        var canvas = document.createElement("CANVAS"),
                                            context = canvas.getContext("2d");
                                        canvas.height = this.height, canvas.width = this.width, context.drawImage(this, 0, 0);
                                        for (var e = canvas.toDataURL("image/png"),
                                                f = atob(e.split(",")[1]),
                                                g = [], h = 0; h < f.length; h++) g.push(f.charCodeAt(h));
                                        var imageIviary = new Blob([new Uint8Array(g)], { type: "image/png" });
                                        editor.shared.feather_editor.instance.image.edit($(editor.shared.feather_editor.current_image)),
                                            editor.shared.feather_editor.instance.image.upload([imageIviary]),
                                            editor.shared.feather_editor.close()
    },
                                    saveImaeg.src = d, editor.shared.feather_editor.showWaitIndicator()
    } else {

    }
                            return false;
    },
        onError: function (a) { throw new Error(a.message) },
        onClose: function () {
                            if (editor.shared.feather_editor.instance) {
                                editor.shared.feather_editor.instance.image.get() || editor.shared.feather_editor.instance.image.edit($(editor.shared.feather_editor.current_image))
    }
    }

    },
                    editor.opts.aviaryOptions))
    }

            function launch(editor) {
                console.log("FE launch")
                window.customInit = false;
                "object" == typeof editor.shared.feather_editor && (
                    editor.shared.feather_editor.current_image = editor.image.get() ? editor.image.get()[0] : null,
                    editor.shared.feather_editor.instance = editor,
                    editor.shared.feather_editor.current_image && (
                        editor.shared.feather_editor.launch({
        image: editor.image.get()[0],
        url: editor.image.get()[0].src
    })))
    }
            return { _init: init, launch: launch }
    },
        $.FE.DefineIcon("aviary", { NAME: "sliders" }),
        $.FE.RegisterCommand("aviary", {
        title: "Advanced Edit",
        undo: !1,
        focus: !1,
        callback: function (a, b) { this.imageAviary.launch(this) },
        plugin: "imageAviary"
    }), !$.FE.PLUGINS.image) throw new Error("Image Aviary plugin requires image plugin.");
    $.FE.DEFAULTS.imageEditButtons.push("aviary")
});