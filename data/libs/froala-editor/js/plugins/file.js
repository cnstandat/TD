/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.POPUP_TEMPLATES, { "file.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_PROGRESS_BAR_]" }),
    a.extend(a.FE.DEFAULTS, {
        fileUploadURL: "/FileApi/upload", fileUploadParam: "file", fileUploadParams: {},
        fileUploadToS3: !1, fileUploadMethod: "POST", fileMaxSize: 10485760, fileAllowedTypes: ["*"], fileInsertButtons: ["fileBack", "|"], fileUseSelectedText: !1
    }),
    a.FE.PLUGINS.file = function (b) {
        function c() {
            var a = b.$tb.find('.fr-command[data-cmd="insertFile"]'),
            c = b.popups.get("file.insert");

            if (c || (c = s()),
            e(),
            !c.hasClass("fr-active"))
                if (b.popups.refresh("file.insert"),
                b.popups.setContainer("file.insert", b.$tb),
                a.is(":visible")) {
                    var d = a.offset().left + a.outerWidth() / 2, f = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                    b.popups.show("file.insert", d, f, a.outerHeight())
                }
                else b.position.forSelection(c),
                b.popups.show("file.insert")
        }
        function d() {
            var a = b.popups.get("file.insert");
            a || (a = s()),
            a.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),
            a.find(".fr-file-progress-bar-layer").addClass("fr-active"),
            a.find(".fr-buttons").hide(),
            f(b.language.translate("Uploading"),
            0)
        }
        function e(a) {
            var c = b.popups.get("file.insert");
            c && (c.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),
            c.find(".fr-file-progress-bar-layer").removeClass("fr-active"),
            c.find(".fr-buttons").show(),
            a && (b.events.focus(),
            b.popups.hide("file.insert")))
        }
        function f(a, c) {
            var d = b.popups.get("file.insert");

            if (d) {
                var e = d.find(".fr-file-progress-bar-layer");
                e.find("h3").text(a + (c ? " " + c + "%" : "")),
                e.removeClass("fr-error"),
                c ? (e.find("div").removeClass("fr-indeterminate"),
                e.find("div > span").css("width", c + "%")) : e.find("div").addClass("fr-indeterminate")
            }
        }
        function g(a) {
            d();
            var c = b.popups.get("file.insert"),
            e = c.find(".fr-file-progress-bar-layer");
            e.addClass("fr-error");
            var f = e.find("h3");
            f.text(a),
            b.events.disableBlur(),
            f.focus()
        }
        function h(a, c, d) {
            b.edit.on(),
            b.events.focus(!0),
            b.selection.restore(),
            b.opts.fileUseSelectedText && b.selection.text().length && (c = b.selection.text()),
            b.html.insert('<a href="' + a + '" id="fr-inserted-file" class="fr-file">' + c + "</a>");
            var e = b.$el.find("#fr-inserted-file");
            e.removeAttr("id"),
            b.popups.hide("file.insert"),
            b.undo.saveStep(),
            x(),
            b.events.trigger("file.inserted", [e, d])
        }
        function i(a) {
            try {
                if (!1 === b.events.trigger("file.uploaded", [a], !0)) return b.edit.on(),
                !1; var c = JSON.parse(a);
                return c.link ? c : (n(z, a),
                !1)
            }
            catch (d) {
                return n(B, a),
                !1
            }
        }
        function j(c) {
            try {
                var d = a(c).find("Location").text(),
                e = a(c).find("Key").text();
                return !1 === b.events.trigger("file.uploadedToS3", [d, e, c], !0) ? (b.edit.on(),
                !1) : d
            }
            catch (f) {
                return n(B, c),
                !1
            }
        }
        function k(a) {
            var c = this.status, d = this.response, e = this.responseXML, f = this.responseText; try {
                if (b.opts.fileUploadToS3)
                    if (201 == c) {
                        var g = j(e);
                        g && h(g, a, d || e)
                    }
                    else n(B, d || e);
                else
                    if (c >= 200 && c < 300) {
                        var k = i(f);
                        k && h(k.link, a, d || f)
                    }
                    else n(A, d || f)
            }
            catch (l) { n(B, d || f) }
        }
        function l() { n(B, this.response || this.responseText || this.responseXML) }
        function m(a) {
            if (a.lengthComputable) {
                var c = a.loaded / a.total * 100 | 0; f(b.language.translate("Uploading"),
                c)
            }
        }
        function n(a, c) {
            b.edit.on(),
            g(b.language.translate("Something went wrong. Please try again.")),
            b.events.trigger("file.error", [{ code: a, message: E[a] },
            c])
        }
        function o() {
            b.edit.on(),
            e(!0)
        }
        function p(a) {
            if (void 0 !== a && a.length > 0) {
                if (!1 === b.events.trigger("file.beforeUpload", [a])) return !1; var c = a[0];
                if (c.size > b.opts.fileMaxSize) return n(C),
                !1;
                if (b.opts.fileAllowedTypes.indexOf("*") < 0 && b.opts.fileAllowedTypes.indexOf(c.type.replace(/file\//g, "")) < 0) return n(D),
                !1; var e;
                if (b.drag_support.formdata && (e = b.drag_support.formdata ? new FormData : null),
                e) {
                    var f;
                    if (!1 !== b.opts.fileUploadToS3) {
                        e.append("key", b.opts.fileUploadToS3.keyStart + (new Date).getTime() + "-" + (c.name || "untitled")),
                        e.append("success_action_status", "201"),
                        e.append("X-Requested-With", "xhr"),
                        e.append("Content-Type", c.type);
                        for (f in b.opts.fileUploadToS3.params) b.opts.fileUploadToS3.params.hasOwnProperty(f) && e.append(f, b.opts.fileUploadToS3.params[f])
                    }
                    for (f in b.opts.fileUploadParams) b.opts.fileUploadParams.hasOwnProperty(f) && e.append(f, b.opts.fileUploadParams[f]);
                    e.append(b.opts.fileUploadParam, c);
                    var g = b.opts.fileUploadURL; b.opts.fileUploadToS3 && (g = b.opts.fileUploadToS3.uploadURL ? b.opts.fileUploadToS3.uploadURL : "https://" + b.opts.fileUploadToS3.region + ".amazonaws.com/" + b.opts.fileUploadToS3.bucket);
                    var h = b.core.getXHR(g, b.opts.fileUploadMethod);
                    h.onload = function () { k.call(h, c.name) },
                    h.onerror = l, h.upload.onprogress = m, h.onabort = o, d(),
                    b.edit.off();
                    var i = b.popups.get("file.insert");
                    i && i.off("abortUpload").on("abortUpload", function () { 4 != h.readyState && h.abort() }),
                    h.send(e)
                }
            }
        }
        function q(c) {
            b.events.$on(c, "dragover dragenter", ".fr-file-upload-layer", function () {
                return a(this).addClass("fr-drop"),
                !1
            },
            !0),
            b.events.$on(c, "dragleave dragend", ".fr-file-upload-layer", function () {
                return a(this).removeClass("fr-drop"),
                !1
            },
            !0),
            b.events.$on(c, "drop", ".fr-file-upload-layer", function (d) {
                d.preventDefault(),
                d.stopPropagation(),
                a(this).removeClass("fr-drop");
                var e = d.originalEvent.dataTransfer;
                if (e && e.files) { (c.data("instance") || b).file.upload(e.files) }
            },
            !0),
            b.helpers.isIOS() && b.events.$on(c, "touchstart", '.fr-file-upload-layer input[type="file"]', function () { a(this).trigger("click") }),
            b.events.$on(c, "change", '.fr-file-upload-layer input[type="file"]', function () {
                if (this.files) { (c.data("instance") || b).file.upload(this.files) }
                a(this).val("")
            },
            !0)
        }
        function r() { e() }
        function s(a) {
            if (a) return b.popups.onHide("file.insert", r),
            !0; var c = ""; c = '<div class="fr-buttons">' + b.button.buildList(b.opts.fileInsertButtons) + "</div>"; var d = ""; d = '<div class="fr-file-upload-layer fr-layer fr-active" id="fr-file-upload-layer-' + b.id + '"><strong>' + b.language.translate("Drop file") + "</strong><br>(" + b.language.translate("or click") + ')<div class="fr-form"><input type="file" name="' + b.opts.fileUploadParam + '" accept="/*" tabIndex="-1" aria-labelledby="fr-file-upload-layer-' + b.id + '" role="button"></div></div>'; var e = '<div class="fr-file-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="fileDismissError" tabIndex="2" role="button">OK</button></div></div>', f = { buttons: c, upload_layer: d, progress_bar: e },
            g = b.popups.create("file.insert", f);
            return q(g),
            g
        }
        function t(a) { b.node.hasClass(a, "fr-file") }
        function u(c) {
            var e = c.originalEvent.dataTransfer;
            if (e && e.files && e.files.length) {
                var f = e.files[0];
                if (f && void 0 !== f.type && f.type.indexOf("image") < 0 && (b.opts.fileAllowedTypes.indexOf(f.type) >= 0 || b.opts.fileAllowedTypes.indexOf("*") >= 0)) {
                    b.markers.remove(),
                    b.markers.insertAtPoint(c.originalEvent),
                    b.$el.find(".fr-marker").replaceWith(a.FE.MARKERS),
                    b.popups.hideAll();
                    var g = b.popups.get("file.insert");
                    return g || (g = s()),
                    b.popups.setContainer("file.insert", b.$sc),
                    b.popups.show("file.insert", c.originalEvent.pageX, c.originalEvent.pageY),
                    d(),
                    p(e.files),
                    c.preventDefault(),
                    c.stopPropagation(),
                    !1
                }
            }
        }
        function v() {
            b.events.on("drop", u),
            b.events.$on(b.$win, "keydown", function (c) {
                var d = c.which, e = b.popups.get("file.insert");
                e && d == a.FE.KEYCODE.ESC && e.trigger("abortUpload")
            }),
            b.events.on("destroy", function () {
                var a = b.popups.get("file.insert");
                a && a.trigger("abortUpload")
            })
        }
        function w() {
            b.events.disableBlur(),
            b.selection.restore(),
            b.events.enableBlur(),
            b.popups.hide("file.insert"),
            b.toolbar.showInline()
        }
        function x() {
            var a, c = Array.prototype.slice.call(b.el.querySelectorAll("a.fr-file")),
            d = []; for (a = 0; a < c.length; a++) d.push(c[a].getAttribute("href"));

            if (F) for (a = 0; a < F.length; a++) d.indexOf(F[a].getAttribute("href")) < 0 && b.events.trigger("file.unlink", [F[a]]);
            F = c
        }
        function y() {
            v(),
            b.events.on("link.beforeRemove", t),
            b.$wp && (x(),
            b.events.on("contentChanged", x)),
            s(!0)
        }
        var z = 2, A = 3, B = 4, C = 5, D = 6, E = {};
        E[1] = "File cannot be loaded from the passed link.", E[z] = "No link in upload response.", E[A] = "Error during file upload.", E[B] = "Parsing response failed.", E[C] = "File is too large.", E[D] = "File file type is invalid.", E[7] = "Files can be uploaded only to same domain in IE 8 and IE 9."; var F; return { _init: y, showInsertPopup: c, upload: p, insert: h, back: w, hideProgressBar: e }
    },
    a.FE.DefineIcon("insertFile", { NAME: "file-o" }),
    a.FE.RegisterCommand("insertFile", {
        title: "Upload File", undo: !1, focus: !0, refreshAfterCallback: !1, popup: !0, callback: function () {
            this.popups.isVisible("file.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(),
            this.selection.restore()),
            this.popups.hide("file.insert")) : this.file.showInsertPopup()
        },
        plugin: "file"
    }),
    a.FE.DefineIcon("fileBack", { NAME: "arrow-left" }),
    a.FE.RegisterCommand("fileBack", {
        title: "Back", undo: !1, focus: !1, back: !0, refreshAfterCallback: !1, callback: function () { this.file.back() },
        refresh: function (a) {
            this.opts.toolbarInline ? (a.removeClass("fr-hidden"),
            a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"),
            a.next(".fr-separator").addClass("fr-hidden"))
        }
    }),
    a.FE.RegisterCommand("fileDismissError", { title: "OK", callback: function () { this.file.hideProgressBar(!0) } })
});
