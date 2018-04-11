/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.POPUP_TEMPLATES, { "link.edit": "[_BUTTONS_]", "link.insert": "[_BUTTONS_][_INPUT_LAYER_]" }),
    a.extend(a.FE.DEFAULTS, {
        linkEditButtons: ["linkOpen", "linkStyle", "linkEdit", "linkRemove"], linkInsertButtons: ["linkBack", "|", "linkList"], linkAttributes: {},
        linkAutoPrefix: "http://", linkStyles: { "fr-green": "Green", "fr-strong": "Thick" },
        linkMultipleStyles: !0, linkConvertEmailAddress: !0, linkAlwaysBlank: !1, linkAlwaysNoFollow: !1, linkList: [{ text: "Froala", href: "https://froala.com", target: "_blank" },
        { text: "Google", href: "https://google.com", target: "_blank" },
        { displayText: "Facebook", href: "https://facebook.com" }], linkText: !0
    }),
    a.FE.PLUGINS.link = function (b) {
        function c() {
            var c = b.image ? b.image.get() : null;
            if (!c && b.$wp) {
                var d = b.selection.ranges(0).commonAncestorContainer;
                if (d && (d.contains && d.contains(b.el) || !b.el.contains(d) || b.el == d) && (d = null),
                d && "A" === d.tagName) return d; var e = b.selection.element(),
                f = b.selection.endElement();
                return "A" == e.tagName || b.node.isElement(e) || (e = a(e).parentsUntil(b.$el, "a:first").get(0)),
                "A" == f.tagName || b.node.isElement(f) || (f = a(f).parentsUntil(b.$el, "a:first").get(0)),
                f && (f.contains && f.contains(b.el) || !b.el.contains(f) || b.el == f) && (f = null),
                e && (e.contains && e.contains(b.el) || !b.el.contains(e) || b.el == e) && (e = null),
                f && f == e && "A" == f.tagName ? e : null
            }
            return "A" == b.el.tagName ? b.el : c && c.get(0).parentNode && "A" == c.get(0).parentNode.tagName ? c.get(0).parentNode : void 0
        }
        function d() {
            var a = b.image ? b.image.get() : null, c = [];
            if (a) "A" == a.get(0).parentNode.tagName && c.push(a.get(0).parentNode);
            else {
                var d, e, f, g;
                if (b.win.getSelection) {
                    var h = b.win.getSelection();

                    if (h.getRangeAt && h.rangeCount) {
                        g = b.doc.createRange();
                        for (var i = 0; i < h.rangeCount; ++i)
                            if (d = h.getRangeAt(i),
                            e = d.commonAncestorContainer, e && 1 != e.nodeType && (e = e.parentNode),
                            e && "a" == e.nodeName.toLowerCase()) c.push(e);
                            else {
                                f = e.getElementsByTagName("a");
                                for (var j = 0; j < f.length; ++j) g.selectNodeContents(f[j]),
                                g.compareBoundaryPoints(d.END_TO_START, d) < 1 && g.compareBoundaryPoints(d.START_TO_END, d) > -1 && c.push(f[j])
                            }
                    }
                }
                else
                    if (b.doc.selection && "Control" != b.doc.selection.type)
                        if (d = b.doc.selection.createRange(),
                        e = d.parentElement(),
                        "a" == e.nodeName.toLowerCase()) c.push(e);
                        else {
                            f = e.getElementsByTagName("a"),
                            g = b.doc.body.createTextRange();
                            for (var k = 0; k < f.length; ++k) g.moveToElementText(f[k]),
                            g.compareEndPoints("StartToEnd", d) > -1 && g.compareEndPoints("EndToStart", d) < 1 && c.push(f[k])
                        }
            }
            return c
        }
        function e(d) {
            if (b.core.hasFocus()) {
                if (g(),
                d && "keyup" === d.type && (d.altKey || d.which == a.FE.KEYCODE.ALT)) return !0; setTimeout(function () {
                    if (!d || d && (1 == d.which || "mouseup" != d.type)) {
                        var e = c(),
                        g = b.image ? b.image.get() : null;
                        if (e && !g) {
                            if (b.image) {
                                var h = b.node.contents(e);

                                if (1 == h.length && "IMG" == h[0].tagName) {
                                    var i = b.selection.ranges(0);
                                    return 0 === i.startOffset && 0 === i.endOffset ? a(e).before(a.FE.MARKERS) : a(e).after(a.FE.MARKERS),
                                    b.selection.restore(),
                                    !1
                                }
                            }
                            d && d.stopPropagation(),
                            f(e)
                        }
                    }
                },
                b.helpers.isIOS() ? 100 : 0)
            }
        }
        function f(c) {
            var d = b.popups.get("link.edit");
            d || (d = h());
            var e = a(c);
            b.popups.isVisible("link.edit") || b.popups.refresh("link.edit"),
            b.popups.setContainer("link.edit", b.$sc);
            var f = e.offset().left + a(c).outerWidth() / 2, g = e.offset().top + e.outerHeight();
            b.popups.show("link.edit", f, g, e.outerHeight())
        }
        function g() { b.popups.hide("link.edit") }
        function h() {
            var a = ""; b.opts.linkEditButtons.length > 1 && ("A" == b.el.tagName && b.opts.linkEditButtons.indexOf("linkRemove") >= 0 && b.opts.linkEditButtons.splice(b.opts.linkEditButtons.indexOf("linkRemove"),
            1),
            a = '<div class="fr-buttons">' + b.button.buildList(b.opts.linkEditButtons) + "</div>");
            var d = { buttons: a },
            e = b.popups.create("link.edit", d);
            return b.$wp && b.events.$on(b.$wp, "scroll.link-edit", function () { c() && b.popups.isVisible("link.edit") && f(c()) }),
            e
        }
        function i() { }
        function j() {
            var d = b.popups.get("link.insert"),
            e = c();

            if (e) {
                var f, g, h = a(e),
                i = d.find('input.fr-link-attr[type="text"]'),
                j = d.find('input.fr-link-attr[type="checkbox"]');
                for (f = 0; f < i.length; f++) g = a(i[f]),
                g.val(h.attr(g.attr("name") || ""));
                for (j.prop("checked", !1),
                f = 0; f < j.length; f++) g = a(j[f]),
                h.attr(g.attr("name")) == g.data("checked") && g.prop("checked", !0);
                d.find('input.fr-link-attr[type="text"][name="text"]').val(h.text())
            }
            else d.find('input.fr-link-attr[type="text"]').val(""),
            d.find('input.fr-link-attr[type="checkbox"]').prop("checked", !1),
            d.find('input.fr-link-attr[type="text"][name="text"]').val(b.selection.text());
            d.find("input.fr-link-attr").trigger("change"),
            (b.image ? b.image.get() : null) ? d.find('.fr-link-attr[name="text"]').parent().hide() : d.find('.fr-link-attr[name="text"]').parent().show()
        }
        function k() {
            var a = b.$tb.find('.fr-command[data-cmd="insertLink"]'),
            c = b.popups.get("link.insert");

            if (c || (c = l()),
            !c.hasClass("fr-active"))
                if (b.popups.refresh("link.insert"),
                b.popups.setContainer("link.insert", b.$tb || b.$sc),
                a.is(":visible")) {
                    var d = a.offset().left + a.outerWidth() / 2, e = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                    b.popups.show("link.insert", d, e, a.outerHeight())
                }
                else b.position.forSelection(c),
                b.popups.show("link.insert")
        }
        function l(a) {
            if (a) return b.popups.onRefresh("link.insert", j),
            b.popups.onHide("link.insert", i),
            !0; var d = ""; b.opts.linkInsertButtons.length >= 1 && (d = '<div class="fr-buttons">' + b.button.buildList(b.opts.linkInsertButtons) + "</div>");
            var e = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>', f = "", g = 0; f = '<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-' + b.id + '">', f += '<div class="fr-input-line"><input id="fr-link-insert-layer-url-' + b.id + '" name="href" type="text" class="fr-link-attr" placeholder="URL" tabIndex="' + ++g + '"></div>', b.opts.linkText && (f += '<div class="fr-input-line"><input id="fr-link-insert-layer-text-' + b.id + '" name="text" type="text" class="fr-link-attr" placeholder="' + b.language.translate("Text") + '" tabIndex="' + ++g + '"></div>');
            for (var h in b.opts.linkAttributes)
                if (b.opts.linkAttributes.hasOwnProperty(h)) { var k = b.opts.linkAttributes[h]; f += '<div class="fr-input-line"><input name="' + h + '" type="text" class="fr-link-attr" placeholder="' + b.language.translate(k) + '" tabIndex="' + ++g + '"></div>' }
            b.opts.linkAlwaysBlank || (f += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-' + b.id + '" tabIndex="' + ++g + '"><span>' + e + '</span></span><label for="fr-link-target-' + b.id + '">' + b.language.translate("Open in new tab") + "</label></div>"),
            f += '<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="' + ++g + '" type="button">' + b.language.translate("Insert") + "</button></div></div>"; var l = { buttons: d, input_layer: f },
            m = b.popups.create("link.insert", l);
            return b.$wp && b.events.$on(b.$wp, "scroll.link-insert", function () {
                (b.image ? b.image.get() : null) && b.popups.isVisible("link.insert") && u(),
                c && b.popups.isVisible("link.insert") && s()
            }),
            m
        }
        function m() {
            var d = c(),
            e = b.image ? b.image.get() : null;
            if (!1 === b.events.trigger("link.beforeRemove", [d])) return !1; e && d ? (e.unwrap(),
            b.image.edit(e)) : d && (b.selection.save(),
            a(d).replaceWith(a(d).html()),
            b.selection.restore(),
            g())
        }
        function n() {
            b.events.on("keyup", function (b) { b.which != a.FE.KEYCODE.ESC && e(b) }),
            b.events.on("window.mouseup", e),
            b.events.$on(b.$el, "click", "a", function (a) { b.edit.isDisabled() && a.preventDefault() }),
            b.helpers.isMobile() && b.events.$on(b.$doc, "selectionchange", e),
            l(!0),
            "A" == b.el.tagName && b.$el.addClass("fr-view"),
            b.events.on("toolbar.esc", function () {
                if (b.popups.isVisible("link.edit")) return b.events.disableBlur(),
                b.events.focus(),
                !1
            },
            !0)
        }
        function o(c) {
            var d, e, f = b.opts.linkList[c], g = b.popups.get("link.insert"),
            h = g.find('input.fr-link-attr[type="text"]'),
            i = g.find('input.fr-link-attr[type="checkbox"]');
            for (e = 0; e < h.length; e++) d = a(h[e]),
            f[d.attr("name")] ? d.val(f[d.attr("name")]) : "text" != d.attr("name") && d.val("");
            for (e = 0; e < i.length; e++) d = a(i[e]),
            d.prop("checked", d.data("checked") == f[d.attr("name")]);
            b.accessibility.focusPopup(g)
        }
        function p() {
            var c, d, e = b.popups.get("link.insert"),
            f = e.find('input.fr-link-attr[type="text"]'),
            g = e.find('input.fr-link-attr[type="checkbox"]'),
            h = f.filter('[name="href"]').val(),
            i = f.filter('[name="text"]').val(),
            j = {};
            for (d = 0; d < f.length; d++) c = a(f[d]),
            ["href", "text"].indexOf(c.attr("name")) < 0 && (j[c.attr("name")] = c.val());
            for (d = 0; d < g.length; d++) c = a(g[d]),
            c.is(":checked") ? j[c.attr("name")] = c.data("checked") : j[c.attr("name")] = c.data("unchecked") || null; var k = b.helpers.scrollTop();
            r(h, i, j),
            a(b.o_win).scrollTop(k)
        }
        function q() {
            if (!b.selection.isCollapsed()) {
                b.selection.save();
                for (var c = b.$el.find(".fr-marker").addClass("fr-unprocessed").toArray() ;
                c.length;) {
                    var d = a(c.pop());
                    d.removeClass("fr-unprocessed");
                    var e = b.node.deepestParent(d.get(0));

                    if (e) {
                        var f = d.get(0),
                        g = "", h = ""; do {
                            f = f.parentNode, b.node.isBlock(f) || (g += b.node.closeTagString(f),
                            h = b.node.openTagString(f) + h)
                        }
                        while (f != e);
                        var i = b.node.openTagString(d.get(0)) + d.html() + b.node.closeTagString(d.get(0));
                        d.replaceWith('<span id="fr-break"></span>');
                        var j = e.outerHTML; j = j.replace(/<span id="fr-break"><\/span>/g, g + i + h),
                        e.outerHTML = j
                    }
                    c = b.$el.find(".fr-marker.fr-unprocessed").toArray()
                }
                b.html.cleanEmptyTags(),
                b.selection.restore()
            }
        }
        function r(f, g, h) {
            if (void 0 === h && (h = {}),
            !1 === b.events.trigger("link.beforeInsert", [f, g, h])) return !1; var i = b.image ? b.image.get() : null; i || "A" == b.el.tagName ? "A" == b.el.tagName && b.$el.focus() : (b.selection.restore(),
            b.popups.hide("link.insert"));
            var j = f;
            if (b.opts.linkConvertEmailAddress) { a.FE.MAIL_REGEX.test(f) && !/^mailto:.*/i.test(f) && (f = "mailto:" + f) }
            var k = /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i;
            if ("" === b.opts.linkAutoPrefix || new RegExp("^(" + a.FE.LinkProtocols.join("|") + "):.", "i").test(f) || /^data:image.*/i.test(f) || /^(https?:|ftps?:|file:|)\/\//i.test(f) || k.test(f) || ["/", "{", "[", "#", "("].indexOf((f || "")[0]) < 0 && (f = b.opts.linkAutoPrefix + f),
            f = b.helpers.sanitizeURL(f),
            b.opts.linkAlwaysBlank && (h.target = "_blank"),
            b.opts.linkAlwaysNoFollow && (h.rel = "nofollow"),
            "_blank" == h.target ? h.rel ? h.rel += " noopener noreferrer" : h.rel = "noopener noreferrer" : null == h.target && (h.rel ? h.rel = h.rel.replace(/noopener/, "").replace(/noreferrer/, "") : h.rel = null),
            g = g || "", f === b.opts.linkAutoPrefix) {
                return b.popups.get("link.insert").find('input[name="href"]').addClass("fr-error"),
                b.events.trigger("link.bad", [j]),
                !1
            }
            var l, m = c();

            if (m) l = a(m),
            l.attr("href", f),
            g.length > 0 && l.text() != g && !i && l.text(g),
            i || l.prepend(a.FE.START_MARKER).append(a.FE.END_MARKER),
            l.attr(h),
            i || b.selection.restore();
            else {
                i ? i.wrap('<a href="' + f + '"></a>') : (b.format.remove("a"),
                b.selection.isCollapsed() ? (g = 0 === g.length ? j : g, b.html.insert('<a href="' + f + '">' + a.FE.START_MARKER + g + a.FE.END_MARKER + "</a>"),
                b.selection.restore()) : g.length > 0 && g != b.selection.text().replace(/\n/g, "") ? (b.selection.remove(),
                b.html.insert('<a href="' + f + '">' + a.FE.START_MARKER + g + a.FE.END_MARKER + "</a>"),
                b.selection.restore()) : (q(),
                b.format.apply("a", { href: f })));
                for (var n = d(),
                o = 0; o < n.length; o++) l = a(n[o]),
                l.attr(h),
                l.removeAttr("_moz_dirty");
                1 == n.length && b.$wp && !i && (a(n[0]).prepend(a.FE.START_MARKER).append(a.FE.END_MARKER),
                b.selection.restore())
            }

            if (i) {
                var p = b.popups.get("link.insert");
                p && p.find("input:focus").blur(),
                b.image.edit(i)
            }
            else e()
        }
        function s() {
            g();
            var d = c();

            if (d) {
                var e = b.popups.get("link.insert");
                e || (e = l()),
                b.popups.isVisible("link.insert") || (b.popups.refresh("link.insert"),
                b.selection.save(),
                b.helpers.isMobile() && (b.events.disableBlur(),
                b.$el.blur(),
                b.events.enableBlur())),
                b.popups.setContainer("link.insert", b.$sc);
                var f = (b.image ? b.image.get() : null) || a(d),
                h = f.offset().left + f.outerWidth() / 2, i = f.offset().top + f.outerHeight();
                b.popups.show("link.insert", h, i, f.outerHeight())
            }
        }
        function t() {
            (b.image ? b.image.get() : null) ? b.image.back() : (b.events.disableBlur(),
            b.selection.restore(),
            b.events.enableBlur(),
            c() && b.$wp ? (b.selection.restore(),
            g(),
            e()) : "A" == b.el.tagName ? (b.$el.focus(),
            e()) : (b.popups.hide("link.insert"),
            b.toolbar.showInline()))
        }
        function u() {
            var a = b.image ? b.image.getEl() : null;
            if (a) {
                var c = b.popups.get("link.insert");
                b.image.hasCaption() && (a = a.find(".fr-img-wrap")),
                c || (c = l()),
                j(!0),
                b.popups.setContainer("link.insert", b.$sc);
                var d = a.offset().left + a.outerWidth(!0) / 2, e = a.offset().top + a.outerHeight(!0);
                b.popups.show("link.insert", d, e, a.outerHeight())
            }
        }
        function v(d, f, g) {
            void 0 === g && (g = b.opts.linkMultipleStyles),
            void 0 === f && (f = b.opts.linkStyles);
            var h = c();

            if (!h) return !1;
            if (!g) {
                var i = Object.keys(f);
                i.splice(i.indexOf(d),
                1),
                a(h).removeClass(i.join(" "))
            }
            a(h).toggleClass(d),
            e()
        }
        return { _init: n, remove: m, showInsertPopup: k, usePredefined: o, insertCallback: p, insert: r, update: s, get: c, allSelected: d, back: t, imageLink: u, applyStyle: v }
    },
    a.FE.DefineIcon("insertLink", { NAME: "link" }),
    a.FE.RegisterShortcut(a.FE.KEYCODE.K, "insertLink", null, "K"),
    a.FE.RegisterCommand("insertLink", {
        title: "Insert Link", undo: !1, focus: !0, refreshOnCallback: !1, popup: !0, callback: function () {
            this.popups.isVisible("link.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(),
            this.selection.restore()),
            this.popups.hide("link.insert")) : this.link.showInsertPopup()
        },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkOpen", { NAME: "external-link" }),
    a.FE.RegisterCommand("linkOpen", {
        title: "Open Link", undo: !1, refresh: function (a) { this.link.get() ? a.removeClass("fr-hidden") : a.addClass("fr-hidden") },
        callback: function () {
            var a = this.link.get();
            a && this.o_win.open(a.href)
        },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkEdit", { NAME: "edit" }),
    a.FE.RegisterCommand("linkEdit", {
        title: "Edit Link", undo: !1, refreshAfterCallback: !1, popup: !0, callback: function () { this.link.update() },
        refresh: function (a) { this.link.get() ? a.removeClass("fr-hidden") : a.addClass("fr-hidden") },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkRemove", { NAME: "unlink" }),
    a.FE.RegisterCommand("linkRemove", {
        title: "Unlink", callback: function () { this.link.remove() },
        refresh: function (a) { this.link.get() ? a.removeClass("fr-hidden") : a.addClass("fr-hidden") },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkBack", { NAME: "arrow-left" }),
    a.FE.RegisterCommand("linkBack", {
        title: "Back", undo: !1, focus: !1, back: !0, refreshAfterCallback: !1, callback: function () { this.link.back() },
        refresh: function (a) {
            var b = this.link.get() && this.doc.hasFocus();
            (this.image ? this.image.get() : null) || b || this.opts.toolbarInline ? (a.removeClass("fr-hidden"),
            a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"),
            a.next(".fr-separator").addClass("fr-hidden"))
        },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkList", { NAME: "search" }),
    a.FE.RegisterCommand("linkList", {
        title: "Choose Link", type: "dropdown", focus: !1, undo: !1, refreshAfterCallback: !1, html: function () { for (var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.linkList, c = 0; c < b.length; c++) a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="' + c + '">' + (b[c].displayText || b[c].text) + "</a></li>"; return a += "</ul>" },
        callback: function (a, b) { this.link.usePredefined(b) },
        plugin: "link"
    }),
    a.FE.RegisterCommand("linkInsert", {
        focus: !1, refreshAfterCallback: !1, callback: function () { this.link.insertCallback() },
        refresh: function (a) { this.link.get() ? a.text(this.language.translate("Update")) : a.text(this.language.translate("Insert")) },
        plugin: "link"
    }),
    a.FE.DefineIcon("imageLink", { NAME: "link" }),
    a.FE.RegisterCommand("imageLink", {
        title: "Insert Link", undo: !1, focus: !1, popup: !0, callback: function () { this.link.imageLink() },
        refresh: function (a) {
            var b, c = this.link.get();
            c ? (b = a.prev(),
            b.hasClass("fr-separator") && b.removeClass("fr-hidden"),
            a.addClass("fr-hidden")) : (b = a.prev(),
            b.hasClass("fr-separator") && b.addClass("fr-hidden"),
            a.removeClass("fr-hidden"))
        },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkStyle", { NAME: "magic" }),
    a.FE.RegisterCommand("linkStyle", {
        title: "Style", type: "dropdown", html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.linkStyles; for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="' + c + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        callback: function (a, b) { this.link.applyStyle(b) },
        refreshOnShow: function (b, c) {
            var d = this.link.get();

            if (d) {
                var e = a(d);
                c.find(".fr-command").each(function () {
                    var b = a(this).data("param1"),
                    c = e.hasClass(b);
                    a(this).toggleClass("fr-active", c).attr("aria-selected", c)
                })
            }
        },
        plugin: "link"
    })
});
