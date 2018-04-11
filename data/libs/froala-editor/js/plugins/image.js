/*eslint eqeqeq: "error"*/
! function (factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof module && module.exports ? module.exports = function(b, c) {
            return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
                factory(c),
                c
        } :
        factory(jQuery)
}(function($) {
    "use strict";
    $.extend($.FE.POPUP_TEMPLATES, {
            "image.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]",
            "image.edit": "[_BUTTONS_]",
            "image.alt": "[_BUTTONS_][_ALT_LAYER_]",
            "image.size": "[_BUTTONS_][_SIZE_LAYER_]"
        }),
        $.extend($.FE.DEFAULTS, {
            imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
            imageEditButtons: ["imageReplace", "imageAlign", "imageRemove", "|", "imageLink", "linkOpen", "linkEdit", "linkRemove", "-", "imageDisplay", "imageStyle", "imageAlt", "imageSize"],
            imageAltButtons: ["imageBack", "|"],
            imageSizeButtons: ["imageBack", "|"],
            imageUploadURL: "/FileApi/uploadImage",
            imageUploadParam: "file",
            imageUploadParams: {},
            imageUploadToS3: !1,
            imageUploadMethod: "POST",
            imageMaxSize: 10485760,
            imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "svg+xml"],
            imageResize: !0,
            imageResizeWithPercent: !1,
            imageRoundPercent: !1,
            imageDefaultWidth: 300,
            imageDefaultAlign: "center",
            imageDefaultDisplay: "block",
            imageSplitHTML: !1,
            imageStyles: { "fr-rounded": "Rounded", "fr-bordered": "Bordered" },
            imageMove: !0,
            imageMultipleStyles: !0,
            imageTextNear: !0,
            imagePaste: !0,
            imagePasteProcess: !1,
            imageMinWidth: 16,
            imageOutputSize: !1
        }),
        $.FE.PLUGINS.image = function(editor) {
            function c() {
                var a = editor.popups.get("image.insert"),
                    c = a.find(".fr-image-by-url-layer input");
                c.val(""),
                    qa && c.val(qa.attr("src")),
                    c.trigger("change")
            }

            function showInsertPopup() {
                var a = editor.$tb.find('.fr-command[data-cmd="insertImage"]'),
                    c = editor.popups.get("image.insert");
                if (c || (c = L()),
                    hideProgressBar(), !c.hasClass("fr-active"))
                    if (editor.popups.refresh("image.insert"),
                        editor.popups.setContainer("image.insert", editor.$tb),
                        a.is(":visible")) {
                        var d = a.offset().left + a.outerWidth() / 2,
                            e = a.offset().top + (editor.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                        editor.popups.show("image.insert", d, e, a.outerHeight())
                    } else editor.position.forSelection(c),
                        editor.popups.show("image.insert")
            }

            function e() {
                var c = editor.popups.get("image.edit");
                c || (c = p()),
                    editor.popups.setContainer("image.edit", $(editor.opts.scrollableContainer)),
                    editor.popups.refresh("image.edit");
                var d = qa.offset().left + qa.outerWidth() / 2,
                    e = qa.offset().top + qa.outerHeight();
                editor.popups.show("image.edit", d, e, qa.outerHeight())
            }

            function f() { hideProgressBar() }

            function g(a) {
                if (!a.hasClass("fr-dii") && !a.hasClass("fr-dib")) {
                    var c = a.css("float");
                    a.css("float", "none"),
                        "block" == a.css("display") ? (a.css("float", c),
                            editor.opts.imageEditButtons.indexOf("imageAlign") >= 0 && (0 === parseInt(a.css("margin-left"),
                                10) && (a.attr("style") || "").indexOf("margin-right: auto") >= 0 ? a.addClass("fr-fil") : 0 === parseInt(a.css("margin-right"),
                                10) && (a.attr("style") || "").indexOf("margin-left: auto") >= 0 && a.addClass("fr-fir")),
                            a.addClass("fr-dib")) : (a.css("float", c),
                            editor.opts.imageEditButtons.indexOf("imageAlign") >= 0 && ("left" == a.css("float") ? a.addClass("fr-fil") : "right" == a.css("float") && a.addClass("fr-fir")),
                            a.addClass("fr-dii")),
                        a.css("margin", ""),
                        a.css("float", ""),
                        a.css("display", ""),
                        a.css("z-index", ""),
                        a.css("position", ""),
                        a.css("overflow", ""),
                        a.css("vertical-align", "")
                }
            }

            function h() {
                for (var c = "IMG" == editor.$el.get(0).tagName ? [editor.$el.get(0)] : editor.$el.get(0).querySelectorAll("img"),
                        d = 0; d < c.length; d++) {
                    var e = $(c[d]);
                    (editor.opts.imageEditButtons.indexOf("imageAlign") >= 0 || editor.opts.imageEditButtons.indexOf("imageDisplay") >= 0) && g(e),
                        e.attr("width") && (e.css("width", e.width()),
                            e.removeAttr("width")),
                        editor.opts.imageTextNear || e.removeClass("fr-dii").addClass("fr-dib"),
                        editor.opts.iframe && e.on("load", editor.size.syncIframe)
                }
            }

            function i() {
                var c, d = Array.prototype.slice.call(editor.$el.get(0).querySelectorAll("img")),
                    e = [];
                for (c = 0; c < d.length; c++) e.push(d[c].getAttribute("src")),
                    $(d[c]).toggleClass("fr-draggable", editor.opts.imageMove),
                    "" === d[c].className && d[c].removeAttribute("class"),
                    "" === d[c].getAttribute("style") && d[c].removeAttribute("style");
                if (Da)
                    for (c = 0; c < Da.length; c++) e.indexOf(Da[c].getAttribute("src")) < 0 && editor.events.trigger("image.removed", [$(Da[c])]);
                Da = d
            }

            function j() {
                ra || X();
                var c = editor.$wp || $(editor.opts.scrollableContainer);
                c.append(ra),
                    ra.data("instance", editor);
                var d = c.scrollTop() - ("static" != c.css("position") ? c.offset().top : 0),
                    e = c.scrollLeft() - ("static" != c.css("position") ? c.offset().left : 0);
                e -= editor.helpers.getPX(c.css("border-left-width")),
                    d -= editor.helpers.getPX(c.css("border-top-width")),
                    ra.css("top", (editor.opts.iframe ? qa.offset().top : qa.offset().top + d) - 1).css("left", (editor.opts.iframe ? qa.offset().left : qa.offset().left + e) - 1).css("width", qa.get(0).getBoundingClientRect().width).css("height", qa.get(0).getBoundingClientRect().height).addClass("fr-active")
            }

            function k(a) { return '<div class="fr-handler fr-h' + a + '"></div>' }

            function l(c) {
                if (!editor.core.sameInstance(ra)) return !0;
                if (c.preventDefault(),
                    c.stopPropagation(),
                    editor.$el.find("img.fr-error").left) return !1;
                editor.undo.canDo() || editor.undo.saveStep(),
                    sa = $(this),
                    sa.data("start-x", c.pageX || c.originalEvent.touches[0].pageX),
                    sa.data("start-width", qa.width()),
                    sa.data("start-height", qa.height());
                var d = qa.width();
                if (editor.opts.imageResizeWithPercent) {
                    var e = qa.parentsUntil(editor.$el, editor.html.blockTagsQuery()).get(0) || editor.$el.get(0);
                    qa.css("width", (d / $(e).outerWidth() * 100).toFixed(2) + "%")
                } else qa.css("width", d);
                ta.show(),
                    editor.popups.hideAll(),
                    ea()
            }

            function m(c) {
                if (!editor.core.sameInstance(ra)) return !0;
                if (sa && qa) {
                    if (c.preventDefault(),
                        editor.$el.find("img.fr-error").left) return !1;
                    var d = c.pageX || (c.originalEvent.touches ? c.originalEvent.touches[0].pageX : null);
                    if (!d) return !1;
                    var e = sa.data("start-x"),
                        f = d - e,
                        g = sa.data("start-width");
                    if ((sa.hasClass("fr-hnw") || sa.hasClass("fr-hsw")) && (f = 0 - f),
                        editor.opts.imageResizeWithPercent) {
                        var h = qa.parentsUntil(editor.$el, editor.html.blockTagsQuery()).get(0) || editor.$el.get(0);
                        g = ((g + f) / $(h).outerWidth() * 100).toFixed(2),
                            editor.opts.imageRoundPercent && (g = Math.round(g)),
                            qa.css("width", g + "%"),
                            qa.css("height", "").removeAttr("height")
                    } else g + f >= editor.opts.imageMinWidth && qa.css("width", g + f),
                        qa.css("height", sa.data("start-height") * qa.width() / sa.data("start-width"));
                    j(),
                        editor.events.trigger("image.resize", [get()])
                }
            }

            function n(a) {
                if (!editor.core.sameInstance(ra)) return !0;
                if (sa && qa) {
                    if (a && a.stopPropagation(),
                        editor.$el.find("img.fr-error").left) return !1;
                    sa = null, ta.hide(),
                        j(),
                        e(),
                        editor.undo.saveStep(),
                        editor.events.trigger("image.resizeEnd", [get()])
                }
            }

            function o(a, c) {
                editor.edit.on(),
                    qa && qa.addClass("fr-error"),
                    t(editor.language.translate("Something went wrong. Please try again.")),
                    editor.events.trigger("image.error", [{ code: a, message: Ca[a] },
                        c
                    ])
            }

            function p(a) {
                if (a) return editor.$wp && editor.events.$on(editor.$wp, "scroll", function() { qa && editor.popups.isVisible("image.edit") && e() }), !0;
                var c = "";
                editor.opts.imageEditButtons.length > 0 && (c += '<div class="fr-buttons">', c += editor.button.buildList(editor.opts.imageEditButtons),
                    c += "</div>");
                var d = { buttons: c },
                    f = editor.popups.create("image.edit", d);
                return f
            }

            function showProgressBar(c) {
                var d = editor.popups.get("image.insert");
                if (d || (d = L()),
                    d.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),
                    d.find(".fr-image-progress-bar-layer").addClass("fr-active"),
                    d.find(".fr-buttons").hide(),
                    qa) {
                    editor.popups.setContainer("image.insert", $(editor.opts.scrollableContainer));
                    var e = qa.offset().left + qa.width() / 2,
                        f = qa.offset().top + qa.height();
                    editor.popups.show("image.insert", e, f, qa.outerHeight())
                }
                "undefined" == typeof c && s("Uploading", 0)
            }

            function hideProgressBar(a) {
                var c = editor.popups.get("image.insert");
                c && (c.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),
                    c.find(".fr-image-progress-bar-layer").removeClass("fr-active"),
                    c.find(".fr-buttons").show(),
                    (a || editor.$el.find("img.fr-error").length) && (editor.events.focus(),
                        editor.$el.find("img.fr-error").remove(),
                        editor.undo.saveStep(),
                        editor.undo.run(),
                        editor.undo.dropRedo()))
            }

            function s(a, c) {
                var d = editor.popups.get("image.insert");
                if (d) {
                    var e = d.find(".fr-image-progress-bar-layer");
                    e.find("h3").text(a + (c ? " " + c + "%" : "")),
                        e.removeClass("fr-error"),
                        c ? (e.find("div").removeClass("fr-indeterminate"),
                            e.find("div > span").css("width", c + "%")) : e.find("div").addClass("fr-indeterminate")
                }
            }

            function t(a) {
                showProgressBar();
                var c = editor.popups.get("image.insert"),
                    d = c.find(".fr-image-progress-bar-layer");
                d.addClass("fr-error"),
                    d.find("h3").text(a)
            }

            function insertByURL() {
                var a = editor.popups.get("image.insert"),
                    c = a.find(".fr-image-by-url-layer input");
                c.val().length > 0 && (showProgressBar(),
                    s("Loading image"),
                    insert(c.val(), !0, [], qa),
                    c.val(""),
                    c.blur())
            }

            function edit(a) { ba.call(a.get(0)) }

            function w() {
                var c = $(this);
                editor.popups.hide("image.insert"),
                    c.removeClass("fr-uploading"),
                    c.next().is("br") && c.next().remove(),
                    edit(c),
                    editor.events.trigger("image.loaded", [c])
            }

            function insert(a, c, d, e, f) {
                editor.edit.off(),
                    s("Loading image"),
                    c && (a = editor.helpers.sanitizeURL(a));
                var g = new Image;
                g.onload = function() {
                        var c, g;
                        if (e) {
                            var h = e.data("fr-old-src");
                            editor.$wp ? (c = e.clone().removeData("fr-old-src").removeClass("fr-uploading"),
                                c.off("load"),
                                h && e.attr("src", h),
                                e.replaceWith(c)) : c = e;
                            for (var j = c.get(0).attributes, k = 0; k < j.length; k++) {
                                var l = j[k];
                                0 === l.nodeName.indexOf("data-") && c.removeAttr(l.nodeName)
                            }
                            if ("undefined" != typeof d)
                                for (g in d) d.hasOwnProperty(g) && "link" != g && c.attr("data-" + g, d[g]);
                            c.on("load", w),
                                c.attr("src", a),
                                editor.edit.on(),
                                i(),
                                editor.undo.saveStep(),
                                editor.events.trigger(h ? "image.replaced" : "image.inserted", [c, f])
                        } else c = D(a, d, w),
                            i(),
                            editor.undo.saveStep(),
                            editor.events.trigger("image.inserted", [c, f])
                    },
                    g.onerror = function() { o(va) },
                    g.src = a
            }

            function y(c) {
                try {
                    if (editor.events.trigger("image.uploaded", [c], !0) === !1) return editor.edit.on(), !1;
                    var d = $.parseJSON(c);
                    return d.link ? d : (o(wa, c), !1)
                } catch (e) {
                    return o(ya, c), !1
                }
            }

            function z(c) {
                try {
                    var d = $(c).find("Location").text(),
                        e = $(c).find("Key").text();
                    return editor.events.trigger("image.uploadedToS3", [d, e, c], !0) === !1 ? (editor.edit.on(), !1) : d
                } catch (f) {
                    return o(ya, c), !1
                }
            }

            function A(a) {
                s("Loading image");
                var c = this.status,
                    d = this.response,
                    e = this.responseXML,
                    f = this.responseText;
                try {
                    if (editor.opts.imageUploadToS3)
                        if (201 == c) {
                            var g = z(e);
                            g && insert(g, !1, [], a, d || e)
                        } else o(ya, d || e);
                    else if (c >= 200 && 300 > c) {
                        var h = y(f);
                        h && insert(h.link, !1, h, a, d || f)
                    } else o(xa, d || f)
                } catch (i) { o(ya, d || f) }
            }

            function B() { o(ya, this.response || this.responseText || this.responseXML) }

            function C(a) {
                if (a.lengthComputable) {
                    var b = a.loaded / a.total * 100 | 0;
                    s("Uploading", b)
                }
            }

            function D(c, d, e) {
                var f, g = "";
                if (d && "undefined" != typeof d)
                    for (f in d) d.hasOwnProperty(f) && "link" != f && (g += " data-" + f + '="' + d[f] + '"');
                var h = editor.opts.imageDefaultWidth;
                h && "auto" != h && (h += editor.opts.imageResizeWithPercent ? "%" : "px");
                var i = $('<img class="' + (editor.opts.imageDefaultDisplay ? "fr-di" + editor.opts.imageDefaultDisplay[0] : "") + (editor.opts.imageDefaultAlign && "center" != editor.opts.imageDefaultAlign ? " fr-fi" + editor.opts.imageDefaultAlign[0] : "") + '" src="' + c + '"' + g + (h ? ' style="width: ' + h + ';"' : "") + ">");
                i.on("load", e),
                    editor.edit.on(),
                    editor.events.focus(!0),
                    editor.selection.restore(),
                    editor.undo.saveStep(),
                    editor.opts.imageSplitHTML ? editor.markers.split() : editor.markers.insert();
                var j = editor.$el.find(".fr-marker");
                return j.replaceWith(i),
                    editor.html.wrap(),
                    editor.selection.clear(),
                    i
            }

            function E() {
                editor.edit.on(),
                    hideProgressBar(!0)
            }

            function F(c, d, e) {
                function f() {
                    var e = $(this);
                    e.off("load"),
                        e.addClass("fr-uploading"),
                        e.next().is("br") && e.next().remove(),
                        editor.placeholder.refresh(),
                        e.is(qa) || edit(e),
                        j(),
                        showProgressBar(),
                        editor.edit.off(),
                        c.onload = function() { A.call(c, e) },
                        c.onerror = B, c.upload.onprogress = C, c.onabort = E, e.off("abortUpload").on("abortUpload", function() { 4 != c.readyState && c.abort() }),
                        c.send(d)
                }
                var g, h = new FileReader;
                h.addEventListener("load", function() {
                        var a = h.result;
                        if (h.result.indexOf("svg+xml") < 0) {
                            for (var c = atob(h.result.split(",")[1]),
                                    d = [], e = 0; e < c.length; e++) d.push(c.charCodeAt(e));
                            a = window.URL.createObjectURL(new Blob([new Uint8Array(d)], { type: "image/jpeg" }))
                        }
                        qa ? (qa.on("load", f),
                            editor.edit.on(),
                            editor.undo.saveStep(),
                            qa.data("fr-old-src", qa.attr("src")),
                            qa.attr("src", a)) : g = D(a, null, f)
                    }, !1),
                    h.readAsDataURL(e)
            }

            function upload(a) {
                if (editor.events.trigger("image.beforeUpload", [a]) === !1) return !1;
                if ("undefined" != typeof a && a.length > 0) {
                    var c = a[0];
                    if (c.size > editor.opts.imageMaxSize) return o(za), !1;
                    if (editor.opts.imageAllowedTypes.indexOf(c.type.replace(/image\//g, "")) < 0) return o(Aa), !1;
                    var d;
                    if (editor.drag_support.formdata && (d = editor.drag_support.formdata ? new FormData : null),
                        d) {
                        var e;
                        if (editor.opts.imageUploadToS3 !== !1) {
                            d.append("key", editor.opts.imageUploadToS3.keyStart + (new Date).getTime() + "-" + (c.name || "untitled")),
                                d.append("success_action_status", "201"),
                                d.append("X-Requested-With", "xhr"),
                                d.append("Content-Type", c.type);
                            for (e in editor.opts.imageUploadToS3.params) editor.opts.imageUploadToS3.params.hasOwnProperty(e) && d.append(e, editor.opts.imageUploadToS3.params[e])
                        }
                        for (e in editor.opts.imageUploadParams) editor.opts.imageUploadParams.hasOwnProperty(e) && d.append(e, editor.opts.imageUploadParams[e]);
                        d.append(editor.opts.imageUploadParam, c);
                        var f = editor.opts.imageUploadURL;
                        editor.opts.imageUploadToS3 && (f = "https://" + editor.opts.imageUploadToS3.region + ".amazonaws.com/" + editor.opts.imageUploadToS3.bucket);
                        var g = editor.core.getXHR(f, editor.opts.imageUploadMethod);
                        F(g, d, c)
                    }
                }
            }

            function H(c) {
                editor.events.$on(c, "dragover dragenter", ".fr-image-upload-layer", function() {
                        return $(this).addClass("fr-drop"), !1
                    }),
                    editor.events.$on(c, "dragleave dragend", ".fr-image-upload-layer", function() {
                        return $(this).removeClass("fr-drop"), !1
                    }),
                    editor.events.$on(c, "drop", ".fr-image-upload-layer", function(d) {
                        d.preventDefault(),
                            d.stopPropagation(),
                            $(this).removeClass("fr-drop");
                        var e = d.originalEvent.dataTransfer;
                        if (e && e.files) {
                            var f = c.data("instance") || editor;
                            f.events.disableBlur(),
                                f.image.upload(e.files),
                                f.events.enableBlur()
                        }
                    }),
                    editor.events.$on(c, "change", '.fr-image-upload-layer input[type="file"]', function() {
                        if (this.files) {
                            var d = c.data("instance") || editor;
                            d.events.disableBlur(),
                                c.find("input:focus").blur(),
                                d.events.enableBlur(),
                                d.image.upload(this.files)
                        }
                        $(this).val("")
                    })
            }

            function I(c) {
                var d = c.originalEvent.dataTransfer;
                if (d && d.files && d.files.length) {
                    var e = d.files[0];
                    if (e && e.type && editor.opts.imageAllowedTypes.indexOf(e.type.replace(/image\//g, "")) >= 0) {
                        editor.markers.remove(),
                            editor.markers.insertAtPoint(c.originalEvent),
                            editor.$el.find(".fr-marker").replaceWith($.FE.MARKERS),
                            editor.popups.hideAll();
                        var f = editor.popups.get("image.insert");
                        return f || (f = L()),
                            editor.popups.setContainer("image.insert", $(editor.opts.scrollableContainer)),
                            editor.popups.show("image.insert", c.originalEvent.pageX, c.originalEvent.pageY),
                            showProgressBar(),
                            upload(d.files),
                            c.preventDefault(),
                            c.stopPropagation(), !1
                    }
                }
            }

            function J() {
                var c, d, e = editor.selection.ranges(0);
                e.collapsed && e.startContainer.nodeType == Node.ELEMENT_NODE && (e.startContainer.childNodes.length == e.startOffset ? (c = e.startContainer.childNodes[e.startOffset - 1], c && "IMG" == c.tagName && "block" == $(c).css("display") && (d = editor.node.blockParent(c),
                    d && editor.html.defaultTag() ? d.nextSibling || (["TD", "TH"].indexOf(d.tagName) < 0 ? $(d).after("<" + editor.html.defaultTag() + "><br>" + $.FE.MARKERS + "</" + editor.html.defaultTag() + ">") : $(img).after("<br>" + $.FE.MARKERS),
                        editor.selection.restore()) : d || ($(c).after("<br>" + $.FE.MARKERS),
                        editor.selection.restore()))) : 0 === e.startOffset && e.startContainer.childNodes.length > e.startOffset && (c = e.startContainer.childNodes[e.startOffset], c && "IMG" == c.tagName && "block" == $(c).css("display") && (d = editor.node.blockParent(c),
                    d && editor.html.defaultTag() ? d.previousSibling || (["TD", "TH"].indexOf(d.tagName) < 0 ? $(d).before("<" + editor.html.defaultTag() + "><br>" + $.FE.MARKERS + "</" + editor.html.defaultTag() + ">") : $(img).before("<br>" + $.FE.MARKERS),
                        editor.selection.restore()) : d || ($(c).before($.FE.MARKERS + "<br>"),
                        editor.selection.restore()))))
            }

            function K() {
                editor.events.$on(editor.$el, editor._mousedown, "IMG" == editor.$el.get(0).tagName ? null : 'img:not([contenteditable="false"])', function(c) {
                        return $(this).parents('[contenteditable="false"]:not(.fr-element):not(body)').length ? !0 : (editor.selection.clear(),
                            ua = !0, editor.browser.msie && (editor.events.disableBlur(),
                                editor.$el.attr("contenteditable", !1)),
                            editor.draggable || c.preventDefault(),
                            void c.stopPropagation())
                    }),
                    editor.events.$on(editor.$el, editor._mouseup, "IMG" == editor.$el.get(0).tagName ? null : 'img:not([contenteditable="false"])', function(c) {
                        return $(this).parents('[contenteditable="false"]:not(.fr-element):not(body)').length ? !0 : void(ua && (ua = !1, c.stopPropagation(),
                            editor.browser.msie && (editor.$el.attr("contenteditable", !0),
                                editor.events.enableBlur())))
                    }),
                    editor.events.on("keyup", function(c) {
                        if (c.shiftKey && "" === editor.selection.text().replace(/\n/g, "")) {
                            var d = editor.selection.element(),
                                e = editor.selection.endElement();
                            d && "IMG" == d.tagName ? edit($(d)) : e && "IMG" == e.tagName && edit($(e))
                        }
                    }, !0),
                    editor.events.on("drop", I),
                    editor.events.on("mousedown window.mousedown", da),
                    editor.events.on("window.touchmove", ea),
                    editor.events.on("mouseup window.mouseup", function() {
                        return qa ? (exitEdit(), !1) : void 0
                    }),
                    editor.events.on("commands.mousedown", function(a) { a.parents(".fr-toolbar").length > 0 && exitEdit() }),
                    editor.events.on("mouseup", J),
                    editor.events.on("blur image.hideResizer commands.undo commands.redo element.dropped", function() { ua = !1, exitEdit(!0) })
            }

            function L(a) {
                if (a) return editor.popups.onRefresh("image.insert", c),
                    editor.popups.onHide("image.insert", f), !0;
                var d, e = "";
                editor.opts.imageInsertButtons.length > 1 && (e = '<div class="fr-buttons">' + editor.button.buildList(editor.opts.imageInsertButtons) + "</div>");
                var g = editor.opts.imageInsertButtons.indexOf("imageUpload"),
                    h = editor.opts.imageInsertButtons.indexOf("imageByURL"),
                    i = "";
                g >= 0 && (d = " fr-active", h >= 0 && g > h && (d = ""),
                    i = '<div class="fr-image-upload-layer' + d + ' fr-layer" id="fr-image-upload-layer-' + editor.id + '"><strong>' + editor.language.translate("Drop image") + "</strong><br>(" + editor.language.translate("or click") + ')<div class="fr-form"><input type="file" class="ignore" accept="image/' + editor.opts.imageAllowedTypes.join(", image/").toLowerCase() + '" tabIndex="-1"></div></div>');
                var j = "";
                h >= 0 && (d = " fr-active", g >= 0 && h > g && (d = ""),
                    j = '<div class="fr-image-by-url-layer' + d + ' fr-layer" id="fr-image-by-url-layer-' + editor.id + '"><div class="fr-input-line"><input type="text" placeholder="http://" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2">' + editor.language.translate("Insert") + "</button></div></div>");
                var k = '<div class="fr-image-progress-bar-layer fr-layer"><h3 class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-back" data-cmd="imageDismissError" tabIndex="2">OK</button></div></div>',
                    l = { buttons: e, upload_layer: i, by_url_layer: j, progress_bar: k },
                    m = editor.popups.create("image.insert", l);
                return editor.$wp && editor.events.$on(editor.$wp, "scroll", function() { qa && editor.popups.isVisible("image.insert") && replace() }),
                    H(m),
                    m
            }

            function M() {
                if (qa) {
                    var a = editor.popups.get("image.alt");
                    a.find("input").val(qa.attr("alt") || "").trigger("change")
                }
            }

            function showAltPopup() {
                var c = editor.popups.get("image.alt");
                c || (c = O()),
                    hideProgressBar(),
                    editor.popups.refresh("image.alt"),
                    editor.popups.setContainer("image.alt", $(editor.opts.scrollableContainer));
                var d = qa.offset().left + qa.width() / 2,
                    e = qa.offset().top + qa.height();
                editor.popups.show("image.alt", d, e, qa.outerHeight())
            }

            function O(a) {
                if (a) return editor.popups.onRefresh("image.alt", M), !0;
                var c = "";
                c = '<div class="fr-buttons">' + editor.button.buildList(editor.opts.imageAltButtons) + "</div>";
                var d = "";
                d = '<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-' + editor.id + '"><div class="fr-input-line"><input type="text" placeholder="' + editor.language.translate("Alternate Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2">' + editor.language.translate("Update") + "</button></div></div>";
                var e = { buttons: c, alt_layer: d },
                    f = editor.popups.create("image.alt", e);
                return editor.$wp && editor.events.$on(editor.$wp, "scroll.image-alt", function() { qa && editor.popups.isVisible("image.alt") && showAltPopup() }),
                    f
            }

            function setAlt(a) {
                if (qa) {
                    var c = editor.popups.get("image.alt");
                    qa.attr("alt", a || c.find("input").val() || ""),
                        c.find("input:focus").blur(),
                        edit(qa)
                }
            }

            function Q() {
                if (qa) {
                    var a = editor.popups.get("image.size");
                    a.find('input[name="width"]').val(qa.get(0).style.width).trigger("change"),
                        a.find('input[name="height"]').val(qa.get(0).style.height).trigger("change")
                }
            }

            function showSizePopup() {
                var c = editor.popups.get("image.size");
                c || (c = S()),
                    hideProgressBar(),
                    editor.popups.refresh("image.size"),
                    editor.popups.setContainer("image.size", $(editor.opts.scrollableContainer));
                var d = qa.offset().left + qa.width() / 2,
                    e = qa.offset().top + qa.height();
                editor.popups.show("image.size", d, e, qa.outerHeight())
            }

            function S(a) {
                if (a) return editor.popups.onRefresh("image.size", Q), !0;
                var c = "";
                c = '<div class="fr-buttons">' + editor.button.buildList(editor.opts.imageSizeButtons) + "</div>";
                var d = "";
                d = '<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-' + editor.id + '"><div class="fr-image-group"><div class="fr-input-line"><input type="text" name="width" placeholder="' + editor.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input type="text" name="height" placeholder="' + editor.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2">' + editor.language.translate("Update") + "</button></div></div>";
                var e = { buttons: c, size_layer: d },
                    f = editor.popups.create("image.size", e);
                return editor.$wp && editor.events.$on(editor.$wp, "scroll.image-size", function() { qa && editor.popups.isVisible("image.size") && showSizePopup() }),
                    f
            }

            function setSize(a, c) {
                if (qa) {
                    var d = editor.popups.get("image.size");
                    qa.css("width", a || d.find('input[name="width"]').val()),
                        qa.css("height", c || d.find('input[name="height"]').val()),
                        d.find("input:focus").blur(),
                        edit(qa)
                }
            }

            function showLayer(a) {
                var c, d, e = editor.popups.get("image.insert");
                if (qa || editor.opts.toolbarInline) qa && (d = qa.offset().top + qa.outerHeight());
                else {
                    var f = editor.$tb.find('.fr-command[data-cmd="insertImage"]');
                    c = f.offset().left + f.outerWidth() / 2, d = f.offset().top + (editor.opts.toolbarBottom ? 10 : f.outerHeight() - 10)
                }!qa && editor.opts.toolbarInline && (d = e.offset().top - editor.helpers.getPX(e.css("margin-top")),
                        e.hasClass("fr-above") && (d += e.outerHeight())),
                    e.find(".fr-layer").removeClass("fr-active"),
                    e.find(".fr-" + a + "-layer").addClass("fr-active"),
                    editor.popups.show("image.insert", c, d, qa ? qa.outerHeight() : 0)
            }

            function refreshUploadButton(a) {
                var c = editor.popups.get("image.insert");
                c.find(".fr-image-upload-layer").hasClass("fr-active") && a.addClass("fr-active")
            }

            function refreshByURLButton(a) {
                var c = editor.popups.get("image.insert");
                c.find(".fr-image-by-url-layer").hasClass("fr-active") && a.addClass("fr-active")
            }

            function X() {
                var c;
                editor.shared.$image_resizer ? (ra = editor.shared.$image_resizer, ta = editor.shared.$img_overlay, editor.events.on("destroy", function() { ra.removeClass("fr-active").appendTo($("body")) }, !0)) : (editor.shared.$image_resizer = $('<div class="fr-image-resizer"></div>'),
                        ra = editor.shared.$image_resizer, editor.events.$on(ra, "mousedown", function(a) { a.stopPropagation() }, !0),
                        editor.opts.imageResize && (ra.append(k("nw") + k("ne") + k("sw") + k("se")),
                            editor.shared.$img_overlay = $('<div class="fr-image-overlay"></div>'),
                            ta = editor.shared.$img_overlay, c = ra.get(0).ownerDocument, $(c).find("body").append(ta))),
                    editor.events.on("shared.destroy", function() {
                        ra.html("").removeData().remove(),
                            ra = null, editor.opts.imageResize && (ta.remove(),
                                ta = null)
                    }, !0),
                    editor.helpers.isMobile() || editor.events.$on($(editor.o_win),
                        "resize",
                        function() {
                            qa && !qa.hasClass("fr-uploading") ? exitEdit(!0) : qa && (j(),
                                replace(),
                                showProgressBar(!1))
                        }),
                    editor.opts.imageResize && (c = ra.get(0).ownerDocument, editor.events.$on(ra, editor._mousedown, ".fr-handler", l),
                        editor.events.$on($(c),
                            editor._mousemove, m),
                        editor.events.$on($(c.defaultView || c.parentWindow),
                            editor._mouseup, n),
                        editor.events.$on(ta, "mouseleave", n))
            }

            function remove(c) {
                c = c || qa, c && editor.events.trigger("image.beforeRemove", [c]) !== !1 && (editor.popups.hideAll(),
                    exitEdit(!0),
                    c.get(0) == editor.$el.get(0) ? c.removeAttr("src") : ("A" == c.get(0).parentNode.tagName ? (editor.selection.setBefore(c.get(0).parentNode) || editor.selection.setAfter(c.get(0).parentNode) || c.parent().after($.FE.MARKERS),
                            $(c.get(0).parentNode).remove()) : (editor.selection.setBefore(c.get(0)) || editor.selection.setAfter(c.get(0)) || c.after($.FE.MARKERS),
                            c.remove()),
                        editor.html.fillEmptyBlocks(),
                        editor.selection.restore()),
                    editor.undo.saveStep())
            }

            function init() {
                if (K(),
                    "IMG" == editor.$el.get(0).tagName && editor.$el.addClass("fr-view"),
                    editor.events.$on(editor.$el, editor.helpers.isMobile() && !editor.helpers.isWindowsPhone() ? "touchend" : "click", "IMG" == editor.$el.get(0).tagName ? null : 'img:not([contenteditable="false"])', ba),
                    editor.helpers.isMobile() && (editor.events.$on(editor.$el, "touchstart", "IMG" == editor.$el.get(0).tagName ? null : 'img:not([contenteditable="false"])', function() { Ea = !1 }),
                        editor.events.$on(editor.$el, "touchmove", function() { Ea = !0 })),
                    editor.events.on("window.keydown keydown", function(c) {
                        var d = c.which;
                        if (qa && (d == $.FE.KEYCODE.BACKSPACE || d == $.FE.KEYCODE.DELETE)) return c.preventDefault(),
                            c.stopPropagation(),
                            remove(), !1;
                        if (qa && d == $.FE.KEYCODE.ESC) {
                            var e = qa;
                            return exitEdit(!0),
                                editor.selection.setAfter(e.get(0)),
                                editor.selection.restore(),
                                c.preventDefault(), !1
                        }
                        return qa && !editor.keys.ctrlKey(c) ? (c.preventDefault(), !1) : void 0
                    }, !0),
                    editor.events.on("window.cut window.copy", function(c) {
                        qa && (ma(),
                            $.FE.copied_text = "\n", $.FE.copied_html = qa.get(0).outerHTML, "copy" == c.type ? setTimeout(function() { edit(qa) }) : (exitEdit(!0),
                                editor.undo.saveStep(),
                                setTimeout(function() { editor.undo.saveStep() },
                                    0)))
                    }, !0),
                    editor.events.$on($(editor.o_win),
                        "keydown",
                        function(b) {
                            var c = b.which;
                            return qa && c == $.FE.KEYCODE.BACKSPACE ? (b.preventDefault(), !1) : void 0
                        }),
                    editor.events.$on(editor.$win, "keydown", function(b) {
                        var c = b.which;
                        qa && qa.hasClass("fr-uploading") && c == $.FE.KEYCODE.ESC && qa.trigger("abortUpload")
                    }),
                    editor.events.on("destroy", function() { qa && qa.hasClass("fr-uploading") && qa.trigger("abortUpload") }),
                    editor.events.on("paste.before", _),
                    editor.events.on("paste.beforeCleanup", aa),
                    editor.events.on("paste.after", $),
                    editor.events.on("html.set", h),
                    editor.events.on("html.inserted", h),
                    h(),
                    editor.events.on("destroy", function() { Da = [] }),
                    editor.events.on("html.get", function(a) { return a = a.replace(/<(img)((?:[\w\W]*?))class="([\w\W]*?)(fr-uploading|fr-error)([\w\W]*?)"((?:[\w\W]*?))>/g, "") }),
                    editor.opts.imageOutputSize) {
                    var c;
                    editor.events.on("html.beforeGet", function() {
                            c = editor.$el.get(0).querySelectorAll("img");
                            for (var d = 0; d < c.length; d++) c[d].setAttribute("width", $(c[d]).width()),
                                c[d].setAttribute("height", $(c[d]).height())
                        }),
                        editor.events.on("html.afterGet", function() {
                            for (var a = 0; a < c.length; a++) c[a].removeAttribute("width"),
                                c[a].removeAttribute("height")
                        })
                }
                editor.opts.iframe && editor.events.on("image.loaded", editor.size.syncIframe),
                    editor.$wp && (i(),
                        editor.events.on("contentChanged", i)),
                    editor.events.$on($(editor.o_win),
                        "orientationchange.image",
                        function() {
                            setTimeout(function() {
                                    var a = get();
                                    a && edit(a)
                                },
                                0)
                        }),
                    p(!0),
                    L(!0),
                    S(!0),
                    O(!0),
                    editor.events.on("node.remove", function(a) {
                        return "IMG" == a.get(0).tagName ? (remove(a), !1) : void 0
                    })
            }

            function $() {
                editor.opts.imagePaste ? editor.$el.find("img[data-fr-image-pasted]").each(function(c, d) {
                    if (editor.opts.imagePasteProcess) {
                        var f = editor.opts.imageDefaultWidth;
                        f && "auto" != f && (f += editor.opts.imageResizeWithPercent ? "%" : "px"),
                            $(d).css("width", f),
                            $(d).removeClass("fr-dii fr-dib fr-fir fr-fil").addClass((editor.opts.imageDefaultDisplay ? "fr-di" + editor.opts.imageDefaultDisplay[0] : "") + (editor.opts.imageDefaultAlign && "center" != editor.opts.imageDefaultAlign ? " fr-fi" + editor.opts.imageDefaultAlign[0] : ""))
                    }
                    if (0 === d.src.indexOf("data:")) {
                        if (editor.events.trigger("image.beforePasteUpload", [d]) === !1) return !1;
                        qa = $(d),
                            j(),
                            e(),
                            replace(),
                            showProgressBar(),
                            editor.edit.off();
                        for (var g = atob($(d).attr("src").split(",")[1]),
                                h = [], i = 0; i < g.length; i++) h.push(g.charCodeAt(i));
                        var k = new Blob([new Uint8Array(h)], { type: "image/jpeg" });
                        upload([k]),
                            $(d).removeAttr("data-fr-image-pasted")
                    } else 0 !== d.src.indexOf("http") ? (editor.selection.save(),
                        $(d).remove(),
                        editor.selection.restore()) : $(d).removeAttr("data-fr-image-pasted")
                }) : editor.$el.find("img[data-fr-image-pasted]").remove()
            }

            function _(a) {
                if (a && a.clipboardData && a.clipboardData.items && a.clipboardData.items[0]) {
                    var c = a.clipboardData.items[0].getAsFile();
                    if (c) {
                        var d = new FileReader;
                        return d.onload = function(a) {
                                var c = a.target.result,
                                    d = editor.opts.imageDefaultWidth;
                                d && "auto" != d && (d += editor.opts.imageResizeWithPercent ? "%" : "px"),
                                    editor.html.insert('<img data-fr-image-pasted="true" class="' + (editor.opts.imageDefaultDisplay ? "fr-di" + editor.opts.imageDefaultDisplay[0] : "") + (editor.opts.imageDefaultAlign && "center" != editor.opts.imageDefaultAlign ? " fr-fi" + editor.opts.imageDefaultAlign[0] : "") + '" src="' + c + '"' + (d ? ' style="width: ' + d + ';"' : "") + ">"),
                                    editor.events.trigger("paste.after")
                            },
                            d.readAsDataURL(c), !1
                    }
                }
            }

            function aa(a) { return a = a.replace(/<img /gi, '<img data-fr-image-pasted="true" ') }

            function ba(c) {
                if ($(this).parents('[contenteditable="false"]:not(.fr-element):not(body)').length) return !0;
                if (c && "touchend" == c.type && Ea) return !0;
                if (c && editor.edit.isDisabled()) return c.stopPropagation(),
                    c.preventDefault(), !1;
                for (var d = 0; d < $.FE.INSTANCES.length; d++) $.FE.INSTANCES[d] != editor && $.FE.INSTANCES[d].events.trigger("image.hideResizer");
                editor.toolbar.disable(),
                    c && (c.stopPropagation(),
                        c.preventDefault()),
                    editor.helpers.isMobile() && (editor.events.disableBlur(),
                        editor.$el.blur(),
                        editor.events.enableBlur()),
                    editor.opts.iframe && editor.size.syncIframe(),
                    qa = $(this),
                    ma(),
                    j(),
                    e(),
                    editor.selection.clear(),
                    editor.button.bulkRefresh(),
                    editor.events.trigger("video.hideResizer")
            }

            function exitEdit(a) {
                qa && (fa() || a === !0) && (editor.toolbar.enable(),
                    ra.removeClass("fr-active"),
                    editor.popups.hide("image.edit"),
                    qa = null, ea())
            }

            function da() { Fa = !0 }

            function ea() { Fa = !1 }

            function fa() { return Fa }

            function align(a) {
                qa.removeClass("fr-fir fr-fil"),
                    "left" == a ? qa.addClass("fr-fil") : "right" == a && qa.addClass("fr-fir"),
                    j(),
                    e()
            }

            function refreshAlign(a) { qa && (qa.hasClass("fr-fil") ? a.find("> *:first").replaceWith(editor.icon.create("align-left")) : qa.hasClass("fr-fir") ? a.find("> *:first").replaceWith(editor.icon.create("align-right")) : a.find("> *:first").replaceWith(editor.icon.create("align-justify"))) }

            function refreshAlignOnShow(a, b) {
                if (qa) {
                    var c = "justify";
                    qa.hasClass("fr-fil") ? c = "left" : qa.hasClass("fr-fir") && (c = "right"),
                        b.find('.fr-command[data-param1="' + c + '"]').addClass("fr-active")
                }
            }

            function display(a) {
                qa.removeClass("fr-dii fr-dib"),
                    "inline" == a ? qa.addClass("fr-dii") : "block" == a && qa.addClass("fr-dib"),
                    j(),
                    e()
            }

            function refreshDisplayOnShow(a, b) {
                var c = "block";
                qa.hasClass("fr-dii") && (c = "inline"),
                    b.find('.fr-command[data-param1="' + c + '"]').addClass("fr-active")
            }

            function replace() {
                var c = editor.popups.get("image.insert");
                c || (c = L()),
                    editor.popups.isVisible("image.insert") || (hideProgressBar(),
                        editor.popups.refresh("image.insert"),
                        editor.popups.setContainer("image.insert", $(editor.opts.scrollableContainer)));
                var d = qa.offset().left + qa.width() / 2,
                    e = qa.offset().top + qa.height();
                editor.popups.show("image.insert", d, e, qa.outerHeight())
            }

            function ma() {
                if (qa) {
                    editor.selection.clear();
                    var a = editor.doc.createRange();
                    a.selectNode(qa.get(0));
                    var c = editor.selection.get();
                    console.log(a);
                    console.log(c);
                    c.addRange(a)

                }
            }

            function back() {
                qa ? ($(".fr-popup input:focus").blur(),
                    edit(qa)) : (editor.events.disableBlur(),
                    editor.selection.restore(),
                    editor.events.enableBlur(),
                    editor.popups.hide("image.insert"),
                    editor.toolbar.showInline())
            }

            function get() { return qa }

            function applyStyle(a, c, d) {
                if ("undefined" == typeof c && (c = editor.opts.imageStyles),
                    "undefined" == typeof d && (d = editor.opts.imageMultipleStyles), !qa) return !1;
                if (!d) {
                    var e = Object.keys(c);
                    e.splice(e.indexOf(a),
                            1),
                        qa.removeClass(e.join(" "))
                }
                qa.toggleClass(a),
                    edit(qa)
            }
            var qa, ra, sa, ta, ua = !1,
                va = 1,
                wa = 2,
                xa = 3,
                ya = 4,
                za = 5,
                Aa = 6,
                Ba = 7,
                Ca = {};
            Ca[va] = "Image cannot be loaded from the passed link.",
                Ca[wa] = "No link in upload response.",
                Ca[xa] = "Error during file upload.",
                Ca[ya] = "Parsing response failed.",
                Ca[za] = "File is too large.", Ca[Aa] = "Image file type is invalid.", Ca[Ba] = "Files can be uploaded only to same domain in IE 8 and IE 9.";
            var Da, Ea, Fa = !1;
            return {
                _init: init,
                showInsertPopup: showInsertPopup,
                showLayer: showLayer,
                refreshUploadButton: refreshUploadButton,
                refreshByURLButton: refreshByURLButton,
                upload: upload,
                insertByURL: insertByURL,
                align: align,
                refreshAlign: refreshAlign,
                refreshAlignOnShow: refreshAlignOnShow,
                display: display,
                refreshDisplayOnShow: refreshDisplayOnShow,
                replace: replace,
                back: back,
                get: get,
                insert: insert,
                showProgressBar: showProgressBar,
                remove: remove,
                hideProgressBar: hideProgressBar,
                applyStyle: applyStyle,
                showAltPopup: showAltPopup,
                showSizePopup: showSizePopup,
                setAlt: setAlt,
                setSize: setSize,
                exitEdit: exitEdit,
                edit: edit
            }
        },
        $.FE.DefineIcon("insertImage", { NAME: "image" }),
        $.FE.RegisterShortcut($.FE.KEYCODE.P, "insertImage", null, "P"),
        $.FE.RegisterCommand("insertImage", {
            title: "Insert Image",
            undo: !1,
            focus: !0,
            refreshAfterCallback: !1,
            popup: !0,
            callback: function() {
                this.popups.isVisible("image.insert") ? (this.$el.find(".fr-marker") && (this.events.disableBlur(),
                        this.selection.restore()),
                    this.popups.hide("image.insert")) : this.image.showInsertPopup()
            },
            plugin: "image"
        }),
        $.FE.DefineIcon("imageUpload", { NAME: "upload" }),
        $.FE.RegisterCommand("imageUpload", {
            title: "Upload Image",
            undo: !1,
            focus: !1,
            callback: function() { this.image.showLayer("image-upload") },
            refresh: function(a) { this.image.refreshUploadButton(a) }
        }),
        $.FE.DefineIcon("imageByURL", { NAME: "link" }),
        $.FE.RegisterCommand("imageByURL", {
            title: "By URL",
            undo: !1,
            focus: !1,
            callback: function() { this.image.showLayer("image-by-url") },
            refresh: function(a) { this.image.refreshByURLButton(a) }
        }),
        $.FE.RegisterCommand("imageInsertByURL", {
            title: "Insert Image",
            undo: !0,
            refreshAfterCallback: !1,
            callback: function() { this.image.insertByURL() },
            refresh: function(a) {
                var b = this.image.get();
                b ? a.text(this.language.translate("Replace")) : a.text(this.language.translate("Insert"))
            }
        }),
        $.FE.DefineIcon("imageDisplay", { NAME: "star" }),
        $.FE.RegisterCommand("imageDisplay", {
            title: "Display",
            type: "dropdown",
            options: { inline: "Inline", block: "Break Text" },
            callback: function(a, b) { this.image.display(b) },
            refresh: function(a) { this.opts.imageTextNear || a.addClass("fr-hidden") },
            refreshOnShow: function(a, b) { this.image.refreshDisplayOnShow(a, b) }
        }),
        $.FE.ICONS.align || ($.FE.DefineIcon("align", { NAME: "align-left" }),
            $.FE.DefineIcon("align-left", { NAME: "align-left" }),
            $.FE.DefineIcon("align-right", { NAME: "align-right" }),
            $.FE.DefineIcon("align-center", { NAME: "align-center" }),
            $.FE.DefineIcon("align-justify", { NAME: "align-justify" })),
        $.FE.DefineIcon("imageAlign", { NAME: "align-center" }),
        $.FE.RegisterCommand("imageAlign", {
            type: "dropdown",
            title: "Align",
            options: { left: "Align Left", justify: "None", right: "Align Right" },
            html: function() {
                var b = '<ul class="fr-dropdown-list">',
                    c = $.FE.COMMANDS.imageAlign.options;
                for (var d in c) c.hasOwnProperty(d) && (b += '<li><a class="fr-command fr-title" data-cmd="imageAlign" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.icon.create("align-" + d) + "</a></li>");
                return b += "</ul>"
            },
            callback: function(a, b) { this.image.align(b) },
            refresh: function(a) { this.image.refreshAlign(a) },
            refreshOnShow: function(a, b) { this.image.refreshAlignOnShow(a, b) }

        }),
        $.FE.DefineIcon("imageReplace", { NAME: "exchange" }),
        $.FE.RegisterCommand("imageReplace", {
            title: "Replace",
            undo: !1,
            focus: !1,
            refreshAfterCallback: !1,
            callback: function() { this.image.replace() }
        }),
        $.FE.DefineIcon("imageRemove", { NAME: "trash" }),
        $.FE.RegisterCommand("imageRemove", {
            title: "Remove",
            callback: function() { this.image.remove() }
        }),
        $.FE.DefineIcon("imageBack", { NAME: "arrow-left" }),
        $.FE.RegisterCommand("imageBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            callback: function() { this.image.back() },
            refresh: function(a) {
                var b = this.image.get();
                b || this.opts.toolbarInline ? (a.removeClass("fr-hidden"),
                    a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"),
                    a.next(".fr-separator").addClass("fr-hidden"))
            }
        }),
        $.FE.RegisterCommand("imageDismissError", {
            title: "OK",
            undo: !1,
            callback: function() { this.image.hideProgressBar(!0) }
        }),
        $.FE.DefineIcon("imageStyle", { NAME: "magic" }),
        $.FE.RegisterCommand("imageStyle", {
            title: "Style",
            type: "dropdown",
            html: function() {
                var a = '<ul class="fr-dropdown-list">',
                    b = this.opts.imageStyles;
                for (var c in b) b.hasOwnProperty(c) && (a += '<li><a class="fr-command" data-cmd="imageStyle" data-param1="' + c + '">' + this.language.translate(b[c]) + "</a></li>");
                return a += "</ul>"
            },
            callback: function(a, b) { this.image.applyStyle(b) },
            refreshOnShow: function(b, c) {
                var d = this.image.get();
                d && c.find(".fr-command").each(function() {
                    var b = $(this).data("param1");
                    $(this).toggleClass("fr-active", d.hasClass(b))
                })
            }
        }),
        $.FE.DefineIcon("imageAlt", { NAME: "info" }),
        $.FE.RegisterCommand("imageAlt", {
            undo: !1,
            focus: !1,
            title: "Alternate Text",
            callback: function() { this.image.showAltPopup() }
        }),
        $.FE.RegisterCommand("imageSetAlt", {
            undo: !0,
            focus: !1,
            title: "Update",
            refreshAfterCallback: !1,
            callback: function() { this.image.setAlt() }
        }),
        $.FE.DefineIcon("imageSize", { NAME: "arrows-alt" }),
        $.FE.RegisterCommand("imageSize", {
            undo: !1,
            focus: !1,
            title: "Change Size",
            callback: function() { this.image.showSizePopup() }
        }),
        $.FE.RegisterCommand("imageSetSize", {
            undo: !0,
            focus: !1,
            title: "Update",
            refreshAfterCallback: !1,
            callback: function() { this.image.setSize() }
        })
});