/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        helpSets: [{ title: "Inline Editor", commands: [{ val: "OSkeyE", desc: "Show the editor" }] },
        {
            title: "Common actions", commands: [{ val: "OSkeyC", desc: "Copy" },
            { val: "OSkeyX", desc: "Cut" },
            { val: "OSkeyV", desc: "Paste" },
            { val: "OSkeyZ", desc: "Undo" },
            { val: "OSkeyShift+Z", desc: "Redo" },
            { val: "OSkeyK", desc: "Insert link" },
            { val: "OSkeyP", desc: "Insert image" }]
        },
        {
            title: "Basic Formatting", commands: [{ val: "OSkeyA", desc: "Select all" },
            { val: "OSkeyB", desc: "Bold" },
            { val: "OSkeyI", desc: "Italic" },
            { val: "OSkeyU", desc: "Underline" },
            { val: "OSkeyS", desc: "Strikethrough" },
            { val: "OSkey]", desc: "Indent" },
            { val: "OSkey[", desc: "Outdent" }]
        },
        {
            title: "Quote", commands: [{ val: "OSkey'", desc: "Increase quote level" },
            { val: "OSkeyShift+'", desc: "Decrease quote level" }]
        },
        {
            title: "Image / Video", commands: [{ val: "OSkey+", desc: "Resize larger" },
            { val: "OSkey-", desc: "Resize smaller" }]
        },
        {
            title: "Table", commands: [{ val: "Alt+Space", desc: "Select table cell" },
            { val: "Shift+Left/Right arrow", desc: "Extend selection one cell" },
            { val: "Shift+Up/Down arrow", desc: "Extend selection one row" }]
        },
        {
            title: "Navigation", commands: [{ val: "OSkey/", desc: "Shortcuts" },
            { val: "Alt+F10", desc: "Focus popup / toolbar" },
            { val: "Esc", desc: "Return focus to previous position" }]
        }]
    }),
    a.FE.PLUGINS.help = function (b) {
        function c() { }
        function d() {
            for (var c = '<div class="fr-help-modal">', d = 0; d < a.FE.DEFAULTS.helpSets.length; d++) {
                var e = a.FE.DEFAULTS.helpSets[d], f = "<table>"; f += "<thead><tr><th>" + e.title + "</th></tr></thead>", f += "<tbody>"; for (var g = 0; g < e.commands.length; g++) { var h = e.commands[g]; f += "<tr>", f += "<td>" + h.desc + "</td>", f += "<td>" + h.val.replace("OSkey", b.helpers.isMac() ? "&#8984;" : "Ctrl+") + "</td>", f += "</tr>" }
                f += "</tbody></table>", c += f
            }
            return c += "</div>"
        }
        function e() {
            if (!g) {
                var c = "<h4>Shortcuts</h4>", e = d(),
                f = b.modals.create(j, c, e);
                g = f.$modal, h = f.$head, i = f.$body, b.events.$on(a(b.o_win),
                "resize", function () { b.modals.resize(j) })
            }
            b.modals.show(j),
            b.modals.resize(j)
        }
        function f() { b.modals.hide(j) }
        var g, h, i, j = "help"; return { _init: c, show: e, hide: f }
    },
    a.FroalaEditor.DefineIcon("help", { NAME: "question" }),
    a.FE.RegisterShortcut(a.FE.KEYCODE.SLASH, "help", null, "/"),
    a.FE.RegisterCommand("help", {
        title: "Help", icon: "help", undo: !1, focus: !1, modal: !0, callback: function () { this.help.show() },
        plugin: "help", showOnMobile: !1
    })
});
