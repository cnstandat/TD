// Global Javascript Initialization
/*eslint eqeqeq: "error"*/
var Global = function () {
    'use strict';
    var rAF = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // IE Fallback, you can even fallback to onscroll
      function (callback) { window.setTimeout(callback, 1000 / 60) };
    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }


    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }
    var has = hasClass,
        add = addClass,
        remove = removeClass,
        toggle = toggleClass;
    var hasScrolled = false;
    var lastScrollTop;
    function _onScroll() {
        if (!hasScrolled) {
            rAF(scrollHandler);
        }
        hasScrolled = true;
        rAF(_onScroll);
    }
    var _shrinkClass = 'th__shrink';
    function scrollHandler() {
        var st = window.scrollY;
        let offsetShowBachToTop = 300;
        let scrollTime = 700;
        let buttonBackToTop = document.querySelector('.js__back-to-top');
        var header = $('.js__header-sticky');
        if (header.length) {
            if (st > 15) {
                add(header[0], _shrinkClass);

            } else {
                remove(header[0], _shrinkClass);
            }
        }
        if (buttonBackToTop) {
            if (st > offsetShowBachToTop) {
                add(buttonBackToTop,'-is-visible')
            }
            else {
                remove(buttonBackToTop, '-is-visible -zoom-out');
            }
            buttonBackToTop.addEventListener('click', function (e) {
                console.log('on Scroll Button Click');
                e.preventDefault();
                $('html,body').animate({ scrollTop: 0 }, scrollTime);
            })
        }

        //if (st > lastScrollTop) { //down
        //    if (st >= windowHeight) {

        //        if (requiredHideLoader && GoogleMenu && !has(GoogleMenu.el, 'active')) {
        //            // add(GoogleMenu.el, 'active');
        //            $(GoogleMenu.el).hide().addClass('active').slideDown();
        //        }
        //    }
        //} else {
        //    if (requiredHideLoader && st == 0 && GoogleMenu) {
        //        if (GoogleMenu.isMenuOpen) {
        //            GoogleMenu._closeMenu();
        //            GoogleMenu._closeIconMenu();
        //        }
        //        remove(GoogleMenu.el, 'active');
        //    }
        //}

        //lastScrollTop = st;
        hasScrolled = false;
        //return false;
    }
    function addScript(url, callback) {
        var script = document.createElement('script');
        script.onload = callback;
        script.type = 'text/javascript';
        script.defer = "defer";
        script.innerText = "";
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    var GM = function () {
        var isInitMap = false;
        window.mapsApiReady = function () {
            initMap();
        }

        function loadMapsAPI() {
            addScript('//maps.google.com/maps/api/js?libraries=places&key=AIzaSyBrBw9g211KtgGxDdwJM-uyAD1zaJumAyo&callback=mapsApiReady');
        }

        function init() {
            if (document.getElementById('js__google-container') && !isInitMap) {
                isInitMap = true;
                loadMapsAPI();
            }
        }

        function initMap() {
            var latitude = 18.6937813,
                longitude = 105.6794076, //,19z,
                map_zoom = 19;

            //google map custom marker icon - .png fallback for IE11
            var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
            var marker_url = (is_internetExplorer11) ? '/data/img/megakit/widgets/gmap/cd-icon-location.png' : '/data/img/megakit/widgets/gmap/cd-icon-location.svg';

            //define the basic color of your map, plus a value for saturation and brightness
            var main_color = '#f7f8fa',
                saturation_value = -70,
                brightness_value = 40;

            //we define here the style of the map
            var style = [{
                //set saturation for the labels on the map
                elementType: 'labels',
                stylers: [
                    { saturation: saturation_value }
                ]
            },
                { //poi stands for point of interest - don't show these lables on the map 
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [
                        { visibility: 'off' }
                    ]
                },
                {
                    //don't show highways lables on the map
                    featureType: 'road.highway',
                    elementType: 'labels',
                    stylers: [
                        { visibility: 'off' }
                    ]
                },
                {
                    //don't show local road lables on the map
                    featureType: 'road.local',
                    elementType: 'labels.icon',
                    stylers: [
                        { visibility: 'off' }
                    ]
                },
                {
                    //don't show arterial road lables on the map
                    featureType: 'road.arterial',
                    elementType: 'labels.icon',
                    stylers: [
                        { visibility: 'off' }
                    ]
                },
                {
                    //don't show road lables on the map
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [
                        { visibility: 'off' }
                    ]
                },
                //style different elements on the map
                {
                    featureType: 'transit',
                    elementType: 'geometry.fill',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: 'poi',
                    elementType: 'geometry.fill',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: 'poi.government',
                    elementType: 'geometry.fill',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: 'poi.sport_complex',
                    elementType: 'geometry.fill',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: 'poi.attraction',
                    elementType: 'geometry.fill',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: 'poi.business',
                    elementType: 'geometry.fill',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry.fill',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'geometry.fill',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: 'landscape',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]

                },
                {
                    featureType: 'road',
                    elementType: 'geometry.fill',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.fill',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [
                        { hue: main_color },
                        { visibility: 'on' },
                        { lightness: brightness_value },
                        { saturation: saturation_value }
                    ]
                }
            ];

            //set google map options
            var map_options = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: map_zoom,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style,
            }

            //inizialize the map
            var map = new google.maps.Map(document.getElementById('js__google-container'), map_options);

            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h2 id="firstHeading" class="firstHeading">Tấn Đạt</h2>' +
                '<div id="bodyContent">' +
                '<p>14B Phạm Đình Toái, <br> Hà Huy Tập , Vinh, <br> Nghệ An, VN</p>' +
                '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 300
            });

            //add a custom marker to the map        
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map: map,
                visible: true,
                icon: marker_url,
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        }
        return { i: init }

    }();
    var _initClass = 'inited';
    var Collapse = function () {
        function toggerLoad(trigger) {

            var url = $(trigger).data('src');
            var hash = trigger.hash;
            remove(trigger, 'togger-load');
            var target = $(hash);
            if (!target.length) {
                console.log(hash);
                console.log(hash.substr(1));
                trigger.setAttribute('data-toggle', hash.substr(1));
                if (url && url.length) {
                    $.get(url).done(function (data) {
                        $('body').append(data);
                        target = $(hash);
                        if (target.length) {
                            if (has(target[0], 'collapse')) {
                                $(trigger).trigger('click');


                            }
                        }
                    })
                }
            }
        }
        function onTogglerButtonClick(evt) {

            evt.preventDefault();
            evt.stopPropagation();
            var trigger = this;
            if (has(trigger, "self")) {
                if (trigger.parentElement.tagName === "LI") {
                    toggle(trigger.parentElement.parentElement, 'open');
                }
                else
                    toggle(trigger.parentElement, "open");
                return false;
            } else {
                if (has(trigger, 'togger-load')) {
                    toggerLoad(trigger);
                }
                else {
                    var target = document.getElementById(trigger.getAttribute("data-toggle"));
                    if (target) {
                        if (!has(target, "open")) {
                            add(document.body, 'modal-open');
                            add(target, "open");
                            var ev = new CustomEvent('open-trigger', { detail: target });
                            window.dispatchEvent(ev);
                        } else {
                            //onButtonCloseClick(evt);
                            remove(target, "open");
                            handlerClosed();
                        }
                    }
                }

            }

        }

        function disableScroll(e) {
            e.preventDefault();
            //return false;
        }
        function onButtonCloseClick(evt) {
            var target = this.parentNode;
            remove(target, "open");
            var ev = new CustomEvent("closed-trigger", { detail: this.parentNode });
            window.dispatchEvent(ev);
        }

        function handlerClosed() {
            var find = document.querySelector('.collapse.open');
            if (!find && has(document.body, "modal-open")) {
                remove(document.body, "modal-open");
                // $('body').off('scroll mousewheel', disableScroll);
            }
        }

        function handlerOpened(e) {
            var div = e.detail;
            //  $('body').on('scroll mousewheel', disableScroll);
            if (div) {
                if (has(div, "scrollspy")) {
                    //$(div).mCustomScrollbar({
                    //    theme: 'minimal'
                    //});
                    $(div).find('.scroll').each(function (_, anchor) {
                        if (!has(this, _initClass)) {
                            add(this, _initClass);
                            var self = this;
                            var scrollSpy = $(self).closest('.scrollspy');
                            var target = $(self.getAttribute('href'));
                            if (target)
                                this.addEventListener('click', function (evt) {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    scrollSpy.animate({ scrollTop: target.position().top }, scrollTime);
                                })
                        }
                    })
                    var anchors = [],
                        viewH = $(div).height(),
                        divH = $(div).find('.sidebar-wrap').height();
                    var scroll = $(div).scrollTop();
                    $('[id^=chapter]').each(function (_, chapter) {
                        var id = chapter.id;
                        anchors.push({
                            id: $(div).find('.scroll[href=\'#' + id + '\']')[0],
                            top: $(chapter).position().top,
                            height: $(chapter).height()
                        });
                    });
                    function _draw(item) {
                        if (scroll < item.top) {
                            if (scroll + viewH >= item.top) {
                                add(item.id, "active");
                            } else {

                                remove(item.id, "active");
                            }
                        } else {
                            if (scroll <= item.top + item.height) {
                                add(item.id, "active");
                            } else {
                                remove(item.id, "active");
                            }
                        }
                    }
                    function _update(e) {
                        scroll = $(div).scrollTop();
                        anchors.forEach(_draw);
                    };
                    //rAF(_draw);
                    div.addEventListener('scroll', _.debounce(_update, 100));
                }
            }

        }


        function init() {
            console.log('init Collapse');
            $('body').on('click', '.togger', onTogglerButtonClick);
            $('body').on('click', '.collapse-close', onButtonCloseClick);
            addEventListener('closed-trigger', handlerClosed);
            addEventListener('open-trigger', handlerOpened);
        }
        return {
            init: init,

        }
    }();
    // Bootstra Components
    var handleBootstrapComponents = function () {
        // Bootstrap Carousel
        $('.carousel').carousel({
            interval: 5000,
            pause: 'hover'
        });

        // Tooltips
        $('.tooltips').tooltip();
        $('.tooltips-show').tooltip('show');
        $('.tooltips-hide').tooltip('hide');
        $('.tooltips-toggle').tooltip('toggle');
        $('.tooltips-destroy').tooltip('destroy');

        // Popovers
        $('.popovers').popover();
        $('.popovers-show').popover('show');
        $('.popovers-hide').popover('hide');
        $('.popovers-toggle').popover('toggle');
        $('.popovers-destroy').popover('destroy');
    }

    var Wow = function () {
        'use strict';

        // Handle Wow
        var handleWow = function () {
            var wow = new WOW({
                mobile: false
            });
            wow.init();
        }

        return {
            init: function () {
                handleWow(); // initial setup for Wow
            }
        }
    }();
    // Scroll To Section
    var handleScrollToSection = function () {
        $(function () {
            $('a[href*=\\#js__scroll-to-]:not([href=\\#js__scroll-to-])').on('click', function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 90
                        }, 1000);
                        return false;
                    }
                }
            });
        });
    }
    var Scrollbar = function () {
        'use strict';

        // Handle Scrollbar
        var handleScrollbar = function () {
            $('.js__scrollbar').mCustomScrollbar({
                theme: 'minimal'
            });
        }


        return {
            init: function () {
                handleScrollbar(); // initial setup for Scrollbar
            }
        }
    }();
    // Handle Promo Section
    var handlePromoSection = function () {
        $('.js__fullwidth-img').each(function () {
            $(this).css('background-image', 'url(' + $(this).children('img').attr('src') + ')');
            $(this).children('img').hide();
        });
    }

    // Handle Overlay
    var handleOverlay = function () {
        var overlay = $('.js__bg-overlay'),
          headerOverlay = $('.js__header-overlay'),
          trigger = $('.js__trigger');

        trigger.on('click', function () {
            overlay.toggleClass('-is-open');
            headerOverlay.toggleClass('-is-open');
            trigger.toggleClass('-is-active');

        });
    }

    // Vertical Center Aligned
    // Note! This works only with promo block and background image via CSS.
    var handleVerticalCenterAligned = function () {
        $('.js__ver-center-aligned').each(function () {
            $(this).css('padding-top', $(this).parent().height() / 2 - $(this).height() / 2);
        });
        $(window).resize(function () {
            $('.js__ver-center-aligned').each(function () {
                $(this).css('padding-top', $(this).parent().height() / 2 - $(this).height() / 2);
            });
        });
    }

    // handle group element heights
    var handleEqualHeight = function () {
        $('[data-auto-height]').each(function () {
            var parent = $(this);
            var items = $('[data-height]', parent);
            var height = 0;
            var mode = parent.attr('data-mode');
            var offset = parseInt(parent.attr('data-offset') ? parent.attr('data-offset') : 0);

            items.each(function () {
                if ($(this).attr('data-height') == "height") {
                    $(this).css('height', '');
                } else {
                    $(this).css('min-height', '');
                }

                var height_ = (mode == 'base-height' ? $(this).outerHeight() : $(this).outerHeight(true));
                if (height_ > height) {
                    height = height_;
                }
            });

            height = height + offset;

            items.each(function () {
                if ($(this).attr('data-height') == "height") {
                    $(this).css('height', height);
                } else {
                    $(this).css('min-height', height);
                }
            });

            if (parent.attr('data-related')) {
                $(parent.attr('data-related')).css('height', parent.height());
            }
        });
    }
    var MagnificPopup = function () {
        'use strict';

        // Handle Magnific Popup
        var handleMagnificPopup = function () {
            // Image popup - vertical fit
            $(document).ready(function () {
                $('.js__popup__image').magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    mainClass: 'mfp-img-mobile',
                    image: {
                        verticalFit: true,
                    }
                });
            });

            // Popup gallery
            $(document).ready(function () {
                $('.js__popup__gallery').magnificPopup({
                    delegate: 'a.js__popup__gallery-child',
                    type: 'image',
                    mainClass: 'mfp-img-mobile',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                    }
                });
            });

            // Multiple Galleries with a single popup
            $(document).ready(function () {
                $('.js__popup__multiple-image').magnificPopup({
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    fixedContentPos: true,
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                        preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
                    }
                });
            });

            // Video iframes
            $(document).ready(function () {
                $('.popup-video').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: true
                });
            });
        }

        return {
            init: function () {
                handleMagnificPopup(); // initial setup for Magnific Popup
            }
        }
    }();
    var Parallax = function () {
        'use strict';

        // Handle Parallax
        var handleParallax = function () {
            $('.js__parallax-window').parallax("50%", 0.1);
        }

        return {
            init: function () {
                handleParallax(); // initial setup for Parallax
            }
        }
    }();
    var Portfolio = function () {
        'use strict';

        // Handle Portfolio
        var handlePortfolio = function () {
            $('#js__grid-portfolio-gallery').cubeportfolio({
                filters: '#js__filters-portfolio-gallery',
                layoutMode: 'grid',
                mediaQueries: [{
                    width: 1500,
                    cols: 3
                }, {
                    width: 1100,
                    cols: 3
                }, {
                    width: 800,
                    cols: 3
                }, {
                    width: 480,
                    cols: 2
                }, {
                    width: 320,
                    cols: 1
                }],
                defaultFilter: '*',
                gapHorizontal: 2,
                gapVertical: 2,
                gridAdjustment: 'responsive',
                caption: ' ',

                // lightbox
                lightboxDelegate: '.cbp-lightbox',
                lightboxGallery: true,
                lightboxTitleSrc: 'data-title',
            });
        }

        return {
            init: function () {
                handlePortfolio(); // initial setup for Portfolio
            }
        }
    }();
    var Swipper = function () {
        function init() {
            var swiper = new Swiper('.js__swiper-one-item', {
                nextButton: '.js__swiper-btn-next',
                prevButton: '.js__swiper-btn-prev',
                speed: 1000,
                autoplay: 7000,
                loop: true
            });

            /* Slider */
            var swiper = new Swiper('.js__swiper-slider', {
                pagination: '.js__swiper-pagination',
                paginationClickable: true,
                speed: 1000,
                autoplay: 7000,
                loop: true
            });

            // Swiper Clients
            var swiper = new Swiper('.js__swiper-clients', {
                slidesPerView: 5,
                spaceBetween: 50,
                loop: true,
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 0
                    }
                }
            });

            // Swiper News
            var swiper = new Swiper('.js__swiper-news', {
                pagination: '.js__swiper-pagination',
                paginationClickable: true,
                slidesPerView: 4,
                spaceBetween: 30,
                loop: true,
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    }
                }
            });

            /* Testimonials */
            var swiper = new Swiper('.js__swiper-testimonials', {
                pagination: '.js__swiper-fraction',
                paginationType: 'fraction',
                paginationClickable: true,
                nextButton: '.js__swiper-btn-next',
                prevButton: '.js__swiper-btn-prev',
                slidesPerView: 1,
                speed: 1000,
                autoplay: 7000,
                loop: true
            });
        }
        return {
            init: init
        }
    }();
    var Counter = function () {
        'use strict';

        // Handle Counter
        var handleCounter = function () {
            $('.js__counter').counterUp();
        }

        return {
            init: function () {
                handleCounter(); // initial setup for Counter
            }
        }
    }();
    function BackToTop() {
        var t = 300, a = 1200, s = 700, l = $(".js__back-to-top");
        $(window).scroll(function () {
            $(this).scrollTop() > t ? l.addClass("-is-visible") : l.removeClass("-is-visible -zoom-out"),
            $(this).scrollTop() > a && l.addClass("-zoom-out")
        }),
        l.on("click", function (t) {
            t.preventDefault(),
            $("body,html").animate({ scrollTop: 0 },
            s)
        })
    };

    window.addScript = addScript;
    return {
        init: function () {
            handleBootstrapComponents(); // initial setup for Bootstrap Components
            handleScrollToSection(); // initial setup for Scroll To Section
            handlePromoSection(); // initial setup for Promo Section
            handleOverlay(); // initial setup for Overlay
            handleVerticalCenterAligned(); // initial setup for Vertical Center Aligned
            handleEqualHeight(); // initial setup for Equal Height
            GM.i();
            Collapse.init();
            _onScroll();
            //HeaderSticky.init();
            MagnificPopup.init();
            Parallax.init();
            Portfolio.init();
            Counter.init();
            Swipper.init();
            Wow.init();
            Scrollbar.init();
        }
    }
}();

$(document).ready(function () {
    Global.init();
});
