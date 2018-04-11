! function($) {
    "use strict";
    $.fn.equalHeight = function() {
            var t = [];
            return $.each(this, function(e, n) {
                    var r, s = $(n),
                        a = "border-box" === s.css("box-sizing") || "border-box" === s.css("-moz-box-sizing");
                    r = a ? s.innerHeight() : s.height(),
                        t.push(r)
                }),
                this.css("height", Math.max.apply(window, t) + "px"),
                this
        },
        $.fn.equalHeightGrid = function(t) {
            var e = this.filter(":visible");
            e.css("height", "auto");
            for (var n = 0; n < e.length; n++)
                if (n % t === 0) {
                    for (var r = $(e[n]),
                            s = 1; s < t; s++) r = r.add(e[n + s]);
                    r.equalHeight()
                }
            return this
        },
        $.fn.detectGridColumns = function() {
            var t = 0,
                e = 0,
                n = this.filter(":visible");
            return n.each(function(n, r) { var s = $(r).offset().top; return (0 === t || s === t) && (e++, void(t = s)) }),
                e
        };
    var t = 0;
    $.fn.responsiveEqualHeightGrid = function() {
            function e() {
                var i = n.detectGridColumns();
                n.equalHeightGrid(i)
            }
            var n = this,
                r = ".grids_" + t;
            return n.data("grids-event-namespace", r),
                $(window).bind("resize" + r + " load" + r, e),
                e(),
                t++, this
        },
        $.fn.responsiveEqualHeightGridDestroy = function() {
            var t = this;
            return t.css("height", "auto"),
                $(window).unbind(t.data("grids-event-namespace")),
                this
        }
}(window.jQuery);