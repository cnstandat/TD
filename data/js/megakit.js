/// <reference path="../libs/imagesloaded.pkgd.min.js" />
/// <reference path="../libs/classie.js" />
/// <reference path="../libs/shuffle.js" />
// Global Javascript Initialization
/*eslint eqeqeq: "error"*/
function addScript(url, callback, err) {
    var script = document.createElement('script');
    script.onload = callback;
    script.onerror = err;
    script.type = 'text/javascript';
    script.defer = "defer";
    script.innerText = "";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    if (document.getElementById(text) === null)
        return text;
    else return makeid();
}
var Global = function () {
    'use strict';

    if (!String.prototype.trim) {
        (function () {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function () {
                return this.replace(rtrim, '');
            };
        })();
    }
    var _RAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    var _html = $('html')[0];
    var _body = $('body')[0];
    var _selector_image_fake = '.image-fake';
    var _className_image_fake = _selector_image_fake.substr(1);
    var _selector_open_comment_form = '.open-comment-form';
    var _className_open_comment_form = _selector_open_comment_form.substr(1);
    var classie = window.classie;
    var _hasScrolled = false;
    var _lastScrollTop;
    var _offsetShowBachToTop = 300;
    var _scrollTime = 700;
    var _scrH;
    var _image_BaseSVG = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 {{w}} {{h}}'><defs><symbol id='a' viewBox='0 0 90 66' opacity='0.3'><path d='M85 5v56H5V5h80m5-5H0v66h90V0z'/><circle cx='18' cy='20' r='6'/><path d='M56 14L37 39l-8-6-17 23h67z'/></symbol></defs><use xlink:href='#a' width='20%' x='40%'/></svg>"; // Basic 'picture' icon
    var _image_GoogleMap_PNG = '/data/img/megakit/widgets/gmap/cd-icon-location.png';
    var _image_GoogleMap_SVG = '/data/img/megakit/widgets/gmap/cd-icon-location.svg';
    var _selector_BackToTop = '.js-btt';
    var _BackToTop;
    var _className_BackToTop_visible = '-is-visible';
    var _className_BackToTop_zoomOut = '-zoom-out';
    var _selector_sticky = '.sticky';
    var _className_sticky = _selector_sticky.substr(1);
    var _className_shrink = 'shrink';
    var _className_mouse_scroll_down = 'on-down';
    var isInitMap = false;
    var _initClass = 'inited';
    var _className_modal_open = 'modal-open',
        _className_Trigger_self = 'self',
        _selector_trigger = '.togger',
        _selector_collapse = '.collapse',
        _selector_collapse_open = '.collsapse.open',
        _className_trigger_lazy = 'togger-lazy',
        _target_trigger = 'data-togger',
        _selector_trigger_close = '.collapse-close',
        _selector_collapse_overlay = '.collapse-overlay',
        _selector_trigger_wrap = '.collapse-wrap',
        _url_trigger = 'data-src',
        _className_trigger_open = 'open',
        _event_Close = 'closed-trigger',
        _event_Open = 'open-trigger';
    var _selector_accordion = '.acc-init';
    var Stickties = [];

    function _AnimationScroll(scrollTargetY, speed, easing) {
        var scrollY = window.scrollY || document.documentElement.scrollTop,
            scrollTargetY = scrollTargetY || 0,
            speed = speed || 2000,
            easing = easing || 'easeOutSine',
            currentTime = 0;

        // min time .1, max time .8 seconds
        var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

        // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
        var easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

        // add animation loop
        function tick() {
            currentTime += 1 / 60;

            var p = currentTime / time;
            var t = easingEquations[easing](p);

            if (p < 1) {
                _RAF(tick);

                window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
            } else {
                console.log('scroll done');
                window.scrollTo(0, scrollTargetY);
            }
        }

        // call it once to get started
        tick();
    }

    function _initOneSticky(item) {
        classie.remove(item, _className_sticky);
        Stickties.push({
            el: item,
            off: 15 + item.offsetTop
        });
    }

    function initSticky(el) {
        [].slice.call(el.querySelectorAll(_selector_sticky)).forEach(_initOneSticky)
    }

    function scrollHandler(e) {
        if (document.body && classie.has(_html, _className_modal_open)) {
            e.preventDefault();
            return;
        }
        let st = window.scrollY;
        if (st > _lastScrollTop) {
            classie.add(_html, _className_mouse_scroll_down);
        } else {
            classie.remove(_html, _className_mouse_scroll_down);
        }
        if (Stickties && Stickties.length) {
            for (var i = 0, l = Stickties.length; i < l; i++) {
                var item = Stickties[i];

                if (st > item.off) {
                    classie.add(item.el, _className_shrink);

                } else {
                    classie.remove(item.el, _className_shrink);
                }
            }
        }
        //let header = document.querySelector(_headerSticky);
        //if (header) {
        //    if (st > lastScrollTop) {
        //        classie.add(header, 'on-down');
        //    } else {
        //        classie.remove(header, 'on-down');
        //    }
        //    if (st > 15) {
        //        classie.add(header, _shrinkClass);

        //    } else {
        //        classie.remove(header, _shrinkClass);
        //    }
        //}

        if (!_BackToTop) _BackToTop = document.querySelector(_selector_BackToTop);
        if (_BackToTop) {
            if (st > _offsetShowBachToTop) {
                classie.add(_BackToTop, _className_BackToTop_visible)
            } else {
                classie.remove(_BackToTop, _className_BackToTop_visible);
                classie.remove(_BackToTop, _className_BackToTop_zoomOut)
            }
        }

        _lastScrollTop = st;
        _hasScrolled = false;

    }


    function mapsApiReady() {
        var latitude = 18.6937813,
            longitude = 105.6794076, //,19z,
            map_zoom = 19;
        var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
        var marker_url = (is_internetExplorer11) ? _image_GoogleMap_PNG : _image_GoogleMap_SVG;

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
            animatedZoom: false,
            center: new google.maps.LatLng(latitude, longitude),
            zoom: map_zoom,
            panControl: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true,
            styles: style,
        }

        //inizialize the map
        var map = new google.maps.Map(document.getElementById('google-map'), map_options);

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

    function InitGoogleMap() {
        window.mapsReady = window.mapsReady || mapsApiReady;
        if (document.getElementById('google-map') && !isInitMap) {
            isInitMap = true;
            addScript('//maps.google.com/maps/api/js?libraries=places&key=AIzaSyBrBw9g211KtgGxDdwJM-uyAD1zaJumAyo&callback=mapsReady');
        }
    }
    // var Shuffle = window.Shuffle;
    //#region Shuffle
    var Shuffle_HomeProject = function (el) {
        var shuffle;
        var mode = 'exclusive';
        var element = el;
        var _activeFilters = [];


        function toggleMode() {
            if (mode === 'additive') {
                mode = 'exclusive';
            } else {
                mode = 'additive';
            }
        }

        function addShuffleEventListeners() {
            shuffle.on(Shuffle.EventType.LAYOUT, function (data) { });
            shuffle.on(Shuffle.EventType.REMOVED, function (data) { });
        }

        function _handleFilterClick(evt) {
            var btn = this;
            var isActive = classie.has(btn, 'active');
            var btnGroup = btn.getAttribute('data-group');

            if (mode === 'additive') {
                if (isActive) {
                    _activeFilters.splice(_activeFilters.indexOf(btnGroup));
                } else {
                    _activeFilters.push(btnGroup);
                }
                btn.classList.toggle('active');
                shuffle.filter(_activeFilters);
            } else {
                _removeActiveClassFromChildren(btn.parentNode);
                var filterGroup;
                if (isActive) {
                    btn.classList.remove('active');
                    filterGroup = Shuffle.ALL_ITEMS;
                } else {
                    btn.classList.add('active');
                    filterGroup = btnGroup;
                }

                shuffle.filter(filterGroup);
            }
        };

        function addFilterButtons() {
            var options = element.parentNode.querySelector('.filter-options');
            if (!options) {
                return;
            }
            var filterButtons = Array.from(options.children);
            if (filterButtons) {
                filterButtons.forEach(function (button) {
                    button.addEventListener('click', _handleFilterClick, false);
                });
                //  return filterButtons;

            }
            // return false;
        }

        function _removeActiveClassFromChildren(parent) {
            var children = parent.children;
            for (var i = children.length - 1; i >= 0; i--) {
                children[i].classList.remove('active');
            }
        };

        function addSorting() {
            var buttonGroup = document.querySelector('.sort-options');

            if (!buttonGroup) {
                return;
            }

            buttonGroup.addEventListener('change', _handleSortChange);
        };

        function _handleSortChange(evt) {
            // Add and remove `active` class from buttons.
            var wrapper = evt.currentTarget;
            var buttons = Array.from(evt.currentTarget.children);
            buttons.forEach(function (button) {
                if (button.querySelector('input').value === evt.target.value) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });

            // Create the sort options to give to Shuffle.
            var value = evt.target.value;
            var options = {};

            function sortByDate(element) {
                return element.getAttribute('data-created');
            }

            function sortByTitle(element) {
                return element.getAttribute('data-title').toLowerCase();
            }

            if (value === 'date-created') {
                options = {
                    reverse: true,
                    by: sortByDate,
                };
            } else if (value === 'title') {
                options = {
                    by: sortByTitle,
                };
            }

            shuffle.sort(options);
        };

        function addSearchFilter() {
            var searchInput = document.querySelector('.js-shuffle-search');

            if (!searchInput) {
                return;
            }

            searchInput.addEventListener('keyup', _handleSearchKeyup);
        };

        function _handleSearchKeyup(evt) {
            var searchText = evt.target.value.toLowerCase();

            shuffle.filter(function (element, shuffle) {

                if (shuffle.group !== Shuffle.ALL_ITEMS) {
                    var groups = JSON.parse(element.getAttribute('data-groups'));
                    var isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;
                    if (!isElementInCurrentGroup) {
                        return false;
                    }
                }

                var titleElement = element.querySelector('.cbp-item__title');
                var titleText = titleElement.textContent.toLowerCase().trim();

                return titleText.indexOf(searchText) !== -1;
            });
        }
        // addShuffleEventListeners();
        imagesLoaded(element, function () {
            shuffle = new Shuffle(el, {
                itemSelector: '.cbp-item',
                //sizer: element.querySelector('.grid-project-sizer-element'),
            });
        });

        addFilterButtons();


    };

    //#endregion

    function WowCallback(box) {
        if (classie.has(box, 'wow-lazy')) {
            classie.remove(box, 'wow');
            classie.remove(box, 'wow-lazy');
            loadData(box, true);
        }
        if (classie.has(box, 'wow-map')) {
            classie.remove(box, 'wow');
            classie.remove(box, 'wow-map');
            InitGoogleMap();
        }
        if (classie.has(box, 'wow-bg')) {
            classie.remove(box, 'wow');
            classie.remove(box, 'wow-bg');
            var databg = box.getAttribute('data-bg');
            if (databg && databg.length) {
                $(box).css({ 'background-image': databg }).removeAttr('data-bg');
            }
        }
        if (classie.has(box, 'wow-img')) {
            classie.remove(box, 'wow');
            classie.remove(box, 'wow-img');
            var databg = box.getAttribute('data-img');
            if (databg && databg.length) {
                box.src = databg;
                delete box.dataset.img;
            }
        }
        if (classie.has(box, 'counter-init')) {
            classie.remove(box, 'wow');
            counter(box);
        }

    }


    function removeLoader(el) {
        $(el).fadeOut(function () {
            removeEl(el);
        })
    }
    function addStringToEl(data, par) {
        var span = document.createElement('span');
        span.innerHTML = data;
        [].slice.call(span.childNodes).forEach(function (el) {
            par.appendChild(el);
        })
    }
    function replaceStringToEl(data, item) {
        var span = document.createElement('span');
        span.innerHTML = data;
        var next = item.nextSibling;
        var par = item.parentNode;
        var lst = [];
        [].slice.call(span.childNodes).forEach(function (el) {
            lst.push(el);
            if (next) {
                par.insertBefore(el, next);
            }
            else {
                par.appendChild(el);
            }
        });
        removeEl(item);
        //item.parentNode.replaceChild(span, item);
    }
    function removeEl(el) {
        el.parentNode.removeChild(el);
    }
    var TDCollapse = function () {
        function processToggerClick(trigger) {

            if (classie.has(trigger, _className_Trigger_self)) {
                let $wrap = $(trigger).closest(_selector_trigger_wrap);
                if ($wrap.length) {
                    let wrap = $wrap[0];
                    classie.toggle($(wrap)[0], _className_trigger_open);
                }
            } else {
                var target = document.getElementById(trigger.getAttribute(_target_trigger));

                if (target) {
                    if (!classie.has(target, _className_trigger_open)) {
                        classie.add(_html, _className_modal_open);
                        classie.add(target, _className_trigger_open);
                        let ev = new CustomEvent(_event_Open, { detail: target })
                        dispatchEvent(ev);

                    } else {
                        classie.remove(target, _className_trigger_open);
                        if (!classie.has(trigger, _selector_trigger_close.substr(1)))
                            handlerClosed();
                    }
                }
            }
        }

        function onTogglerButtonClick(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            var target;
            var hash;
            var url;
            classie.toggle(this, _className_trigger_open);
            if (classie.has(this, _className_trigger_lazy)) {
                hash = this.hash;
                target = $(hash);
                url = this.getAttribute(_url_trigger);

                // classie.remove(this, _className_trigger_lazy);

                this.setAttribute(_target_trigger, hash.substr(1));
                if (!target.length) {
                    if (url && url.length) {
                        let self = this;
                        var loader = createLoader();
                        $.get(url).done(function (data) {
                            addStringToEl(data, _body);
                            removeLoader(loader);
                            target = $(hash);
                            if (target.length) {
                                AjaxLoadComplete();
                                processToggerClick(self);
                            }
                        }).fail(function () { removeLoader(loader) })

                    }
                } else {
                    processToggerClick(this);
                }

            } else {
                processToggerClick(this);
            }

        }

        function onButtonCloseClick(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            var target = this.closest(_selector_collapse);
            if (classie.has(target, 'auto-dispose')) {
                removeEl(target);
                handlerClosed();
            } else {
                classie.remove(this, _className_trigger_open);
                classie.remove(target, _className_trigger_open);

                let ev = new CustomEvent(_event_Close, { detail: target });
                dispatchEvent(ev);
            }

        }

        function handlerClosed() {
            var find = document.querySelector(_selector_collapse_open);
            if (!find && classie.has(_html, _className_modal_open)) {
                classie.remove(_html, _className_modal_open);
            }
        }

        function handlerOpened(e) {
            var div = e.detail;
            if (div) {
                $(div).find('.collapse-close').addClass('open');
                if (classie.has(div, "scrollspy")) {
                    $(div).find('.scroll').each(function (_, anchor) {
                        if (!classie.has(this, _initClass)) {
                            classie.add(this, _initClass);
                            var self = this;
                            var scrollSpy = $(self).closest('.scrollspy');
                            var target = $(self.getAttribute('href'));
                            if (target)
                                this.addEventListener('click', function (evt) {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    scrollSpy.animate({ scrollTop: target.position().top }, _scrollTime);
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
                                classie.add(item.id, "active");
                            } else {

                                classie.remove(item.id, "active");
                            }
                        } else {
                            if (scroll <= item.top + item.height) {
                                classie.add(item.id, "active");
                            } else {
                                classie.remove(item.id, "active");
                            }
                        }
                    }

                    function _update(e) {
                        scroll = $(div).scrollTop();
                        anchors.forEach(_draw);
                        e.preventDefault();
                    };
                    //rAF(_draw);
                    div.addEventListener('scroll', _.debounce(_update, 100));
                }
            }

        }

        function initEvent() {
            $('body').on('click', _selector_trigger, onTogglerButtonClick);
            $('body').on('click', _selector_trigger_close, onButtonCloseClick);
            $('body').on('click', _selector_collapse_overlay, function () {
                classie.remove(this.parentNode, _className_trigger_open);
                if (classie.has(this.parentNode, 'auto-dispose')) {
                    removeEl(this.parentNode);
                }
                handlerClosed();
            })
            addEventListener(_event_Close, handlerClosed);
            addEventListener(_event_Open, handlerOpened);
        }
        return {
            init: initEvent,
            onClose: handlerClosed
        }
    }();

    function initCookie() {
        var show = 'show';
        var item = document.querySelector('.cookie');
        if (item) {
            classie.remove(item, show);
            if (Cookies.get('cookiebar') !== 'hide') {
                classie.add(item, show);
            }
            var button = item.querySelector('.accept');
            if (button)
                button.addEventListener('click', function () {
                    classie.remove(item, 'show');
                    Cookies.set('cookiebar', 'hide', {
                        secure: false,
                        path: '/',
                        domain: '',
                        expires: 30
                    });
                    return false;
                })
        }
    }

    function hideLoader() {
        let loader = document.getElementById('loader');
        if (loader) {
            removeLoader(loader);
        }
    }
    // Scroll To Section
    function GlobalInit() {
        hideLoader();
        initCookie();
        addEventListener('scroll', _.debounce(scrollHandler, 100));

        handleWow();
        TDCollapse.init();
        $('body').on('keydown', '#lu', function (e) {
            if (e.keyCode === 13) {
                $('#lp').focus();
            }
        })
        $('body').on('keydown', '.auto-submit', function (e) {

            if (e.keyCode === 13) {
                e.preventDefault();
                this.closest('form').querySelector('.submit').click(); //.trigger('click');
                return false;
            }
        })

        function ButtonBackToTopClick(e) {
            e.preventDefault();
            _AnimationScroll(0, _scrollTime);
        }
        $('body').on('click', _selector_BackToTop, ButtonBackToTopClick);


        MagnificPopup.init();
        lazyLoading();
    }




    function handleWow() {
        var wow = new WOW({
            mobile: true,
            callback: WowCallback
        });
        wow.init();
    }

    function handleScrollToSection() {
        [].slice.call(document.querySelectorAll('.scrollTo-init')).forEach(function (item) {
            classie.remove(item, 'scrollTo-init');
            item.addEventListener('click', function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                    location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        _AnimationScroll(target[0].offsetTop - 70, _scrollTime);
                        //$('html,body').animate({ scrollTop: target.offset().top - 70 }, 1000);
                        return false;
                    }
                }
            });

        })
    }


    // ajax
    var MagnificPopup = function () {
        'use strict';

        // Handle Magnific Popup
        var handleMagnificPopup = function () {
            $(document).ready(function () {
                $('.cbp-lightbox')
                    .magnificPopup({
                        type: 'image',
                        mainClass: 'mfp-fade',
                        tLoading: 'Đang tải #%curr%...',
                        fixedContentPos: true,
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                            preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
                        },
                        image: {
                            tError: '<a href="%url%">Không thể tải  #%curr%</a> .'
                        }
                    });
            });


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





    function initFilter() {

        [].slice.call(document.querySelectorAll('.cbp-init')).forEach(function (item) {
            classie.remove(item, 'cbp-init');
            // classie.add(item, 'cbp');
            new Shuffle_HomeProject(item);
        })
    }

    function onInputFocus(ev) {
        classie.add(ev.target.parentNode, 'input--filled');
    }

    function onInputBlur(ev) {
        if (ev.target.value.trim() === '') {
            classie.remove(ev.target.parentNode, 'input--filled');
        }
    }

    function initInput(el) {
        if (!el) el = document;
        [].slice.call(el.querySelectorAll('input.input-text')).forEach(function (inputEl) {
            // in case the input is already filled..
            if (inputEl.value.trim() !== '') {
                classie.add(inputEl.parentNode, 'input--filled');
            }

            // events:
            inputEl.addEventListener('focus', onInputFocus);
            inputEl.addEventListener('blur', onInputBlur);
        });
    }

    function counter(el) {
        if (el) {
            classie.remove(el, 'counter-init');
            var $this = $(el),
                countTo = $this.attr('data-count');
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 600,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                }
            });

        }

    }

    function initTextArea() {
        $(document)
            .one('focus.autoExpand', 'textarea.autoExpand', function () {
                var savedValue = this.value;
                this.value = '';
                this.baseScrollHeight = this.scrollHeight;
                this.value = savedValue;
            })
            .on('input.autoExpand', 'textarea.autoExpand', function () {
                var minRows = this.getAttribute('data-min-rows') | 0,
                    rows;
                this.rows = minRows;
                rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
                this.rows = minRows + rows;
            });
    }
    var Notify = function () {
        var container = document.getElementById('notify-container');

        function onclose(id) {
            var notify = document.getElementById(id);
            if (notify) {
                var _current = notify.getAttribute('data-url');
                if (_current) {
                    if (_current === "reload") location.reload();
                    else location.href = _current;
                } else $(notify).fadeOut(100, function () {
                    notify.parentNode.removeChild(notify);
                });
            }
        }

        function show(data) {
            if (!container) {
                container = document.createElement("div");
                container.id = "notify-container";
                container.className = "notify-container";
                document.body.appendChild(container);
                container = document.getElementById('notify-container');
            }
            var notify = document.createElement('div');
            notify.className = "notify";
            var id = makeid();
            notify.id = id;
            var progressValue = document.createElement('div');
            classie.add(progressValue, "notify-progress");
            notify.appendChild(progressValue);
            container.insertBefore(notify, container.firstChild);
            notify.addEventListener('click', function (ev) {
                onclose(id);
            })
            return id;
        }
        function showE(data) {
            if (!container) {
                container = document.createElement("div");
                container.id = "notify-container";
                container.className = "notify-container";
                document.body.appendChild(container);
                container = document.getElementById('notify-container');
            }
            var notify = document.createElement('div');
            notify.className = "notify";
            var message = document.createElement("div");
            message.classList = "notify-message";
            message.innerHTML = data.Message;
            classie.add(notify, "danger");
            notify.appendChild(message);
            classie.add(message, 'show');
            var time = data.Time || 5;
            setTimeout(function () {
                onclose(id);
            }, time * 1000);
            container.insertBefore(notify, container.firstChild);
            notify.addEventListener('click', function (ev) {
                onclose(id);
            })
        }
        function complete(data, id) {
            var notify = document.getElementById(id);
            notify.querySelector('.notify-progress').remove();

            var message = document.createElement("div");
            message.classList = "notify-message";

            if (data.Message) {
                var messageInner = $.parseHTML(data.Message);
                if (messageInner.length)
                    message.appendChild(messageInner[0]);
                else message.innerHTML = data.Message;
            }
            if (data.DataType) {
                classie.add(notify, data.DataType);
            }

            if (data.IsReload) {
                notify.setAttribute('data-url', "reload");
            } else if (data.RedirectUrl) {
                notify.setAttribute('data-url', data.RedirectUrl);
            }
            var time = 3000;
            if (data.Time) time = data.Time * 1000;
            notify.appendChild(message);
            message.style.opacity = 1;
            if (data.Component) {
                if (!data.Param) {
                    var target = document.getElementById(data.Component);
                    if (target) {
                        var url = target.getAttribute('data-src');

                        if (url && url.length) {
                            var loader = createLoader();
                            $.get(url).done(function (d) {
                                target.replaceWith(d);
                                removeLoader(loader);
                                AjaxLoadComplete(document.getElementById(data.Component));
                            }).fail(function (e) {
                                removeLoader(loader);
                            });
                        } else {
                            removeEl(target);

                            var button = document.querySelector('[data-target="' + data.Component + '"]');
                            if (button) button.click();

                        }
                    }

                } else {
                    // $('#' + data.Component).remove();
                    var button = document.querySelector('[data-target="' + data.Component + '"]');
                    if (button) {
                        button.setAttribute('data-param', data.Param);
                        button.click();
                    }
                    //$('[data-target="' + data.Component + '"]').data('param', data.Param).trigger('click');
                }
            }
            if (data.Time) {
                setTimeout(function () {
                    onclose(id)
                }, time);
            } else onclose(id);

        }

        function err(data, id) {
            var notify = document.getElementById(id);
            notify.querySelector('.notify-progress').remove();
            var message = document.createElement("div");
            message.classList = "notify-message";
            message.innerHTML = data.Message;
            classie.add(notify, "danger");
            notify.appendChild(message);
            classie.add(message, 'show');
            var time = data.Time || 5;
            setTimeout(function () {
                onclose(id);
            }, time * 1000);

        }

        function remove(id) {
            var notify = document.getElementById(id);
            if (notify) notify.remove();
        }
        return {
            Show: show,
            Complete: complete,
            Error: err,
            Destroy: remove,
            s: show,
            d: complete,
            e: err,
            r: remove,
            se: showE
        }
    }();

    function loadData(item, needLoader) {
        classie.remove(item, 'lazy');

        var dataget = item.getAttribute("data-src");
        if (dataget && dataget.length) {
            var loader;

            var s = Notify.Show();
            $.get(dataget, function (data) {
                var id = item.id;
                var newEl = replaceStringToEl(data, item);
                Notify.Destroy(s);
                AjaxLoadComplete(newEl);
                continueLoad();
            }).fail(function (e) {
                Notify.Error({ Message: e.responseText }, s);
            })
        }

    }

    function continueLoad() {
        lazyLoading();
    }

    function createLoader() {
        var div = document.createElement('div');
        classie.add(div, 'loader-wrap');
        div.innerHTML = "<div class='loader'></div>";
        _body.appendChild(div);
        return div;
    }

    function lazyLoading() {
        var requiredElement = document.querySelector('.lazy.imp'); // $(elements[0]);
        if (requiredElement) {
            loadData(requiredElement);
        } else {
            requiredElement = document.querySelector('.lazy'); // $(elements[0]);
            if (requiredElement) {
                loadData(requiredElement);
            } else AjaxLoadComplete();
        }
    }

    // #endregion

    // #region Validate


    var isLoadAdmin = false;
    var isLoadAdminComplete = false;

    function FormValidate() {
        function ScriptAdminLoadComplete() {

            isLoadAdminComplete = true;
            $.validator.setDefaults({
                highlight: function (element) {
                    var pa = element.closest('div');
                    classie.remove(pa, 'has-success');
                    classie.add(pa, 'has-danger');
                    //$(element).closest('div').removeClass("has-success").addClass("has-danger");
                },
                unhighlight: function (element) {
                    var pa = element.closest('div');
                    classie.add(pa, 'has-success');
                    classie.remove(pa, 'has-danger');
                    //$(element).closest('div').addClass("has-success").removeClass("has-danger");
                },
                ignore: ".ignore",
                errorElement: 'span',
                errorPlacement: function (error, element) {
                    element.closest('div').append(error);
                    //$(element).closest('div').prepend(error);
                },
                debug: true,
            });
            var CustomFormValidate = [];

            function SubmitForm(e) {
                e.preventDefault();
                e.stopPropagation();

                var form = $(this).closest('form.form');
                if (form.length) {
                    if (form.valid()) {
                        var message = Notify.Show();
                        var url = new URL(location.href);
                        var c = url.searchParams.get("ReturnUrl");
                        var postUrl = form.data('src');
                        if (c && c.length) {
                            postUrl += '?ReturnUrl=' + c;
                        }
                        var datapost = form.serialize();
                        $.post(postUrl, datapost)
                            .done(function (data) {
                                if (!form.hasClass('form-custom')) {
                                    Notify.Complete(data, message);
                                } else {
                                    var name = form.attr('id');
                                    for (var i = 0, l = CustomFormValidate.length; i < l; i++) {
                                        if (CustomFormValidate[i].name === name) {
                                            CustomFormValidate[i].func(data, message);
                                        }
                                    }
                                }
                            }).fail(function (e) {
                                Notify.e({ Message: e.responseText }, message);
                            })
                    }
                }

            }

            function DeleteButtonClick(e) {
                var buttonDelete = $(this);
                e.preventDefault();
                e.stopPropagation();
                var form = $(this).closest('form.form');

                if (form.length) {
                    var keep = buttonDelete[0].innerHTML;
                    var buttonCancel = $('<a/>').addClass('btn cancel btn-success').html('Hủy');
                    buttonCancel.click(function () {
                        buttonCancel.remove();
                        buttonDelete.html(keep);
                        buttonDelete.off('click').removeClass('delete-active').addClass('delete');
                    });
                    buttonDelete[0].innerHTML = "Bạn xác nhận muốn xóa ?";
                    buttonDelete.on('click', (function () {
                        var message = Notify.Show();
                        $.post(buttonDelete.data('src'), form.serialize())
                            .done(function (data) {
                                Notify.Complete(data, message);
                            }).fail(function (e) {
                                Notify.e({ Message: e }, message);
                            });
                    })).removeClass('delete').addClass('delete-active').parent().append(buttonCancel);

                }
            }

            function InputGetFocus() {
                [].slice.call(this.closest('form').querySelectorAll('.error')).forEach(function (item) {
                    item.parentNode.removeChild(item);
                })

                //$(this).closest('form').find('.error').hide().remove();
            }

            function FormErrorClick() {
                $(this).parent().find('input').focus();
                $('span.error').hide();
            }

            function AddCustomFormValidate(name, customfunction) {
                if (name && customfunction) {
                    var customObject = {
                        name: name,
                        func: customfunction
                    };
                    CustomFormValidate.push(customObject);
                }
            }
            var keydown_or_change = function (ele) {

                if (ele && ele.name && ele.name.length && !classie.has(ele, "ignore"))
                    $(ele).valid();
            }

            $('body').on('click', '.form .submit', SubmitForm);
            $('body').on('click', '.form .delete', DeleteButtonClick);
            $('body').on('focus', ".form input", InputGetFocus);
            $('body').on('change keydown', '.form input', _.debounce(function () { keydown_or_change(this) }, 300));
            $('body').on('click', '.form .error', FormErrorClick);
            Upload.init();
            initChosen();
        }
        if (!isLoadAdmin) {
            var form = document.querySelector('.form');
            if (form) {
                isLoadAdmin = true;
                addScript('/data/admin.js', ScriptAdminLoadComplete);
            }
        }
        else if (isLoadAdminComplete) {
            initChosen();
        }

    }

    function OnTabLinkClick(evt) {
        evt.preventDefault();
        var target = $(this.getAttribute('href'));
        var tab_container = target.closest('.tab-container');
        $(this).closest('ul').find('.tab-link').removeClass('active');
        tab_container.find('.tab-content').removeClass("active").hide();
        $(this).addClass("active");
        target.closest('.tab-content').fadeIn(600).addClass("active");
    }
    // #endregion

    // #region CustomForm
    function _initCustomForm() {
        AddCustomFormValidate("contact-form", function (data, message) {
            if (!data.length) {
                Notify.Complete({ Message: "Không có dữ liệu", Time: 3 }, message);
            } else {
                var form = $('#contact-form');
                if (data === "True") {
                    $('#contact-form')[0].reset();
                    $('#contact-form .ignore').html("");
                    $('#contact-form').removeClass('open');
                    form.fadeOut(1000, function () {
                        $(this).delay(5000).fadeIn();
                    })
                    Notify.Complete({ Message: "Tin nhắn của bạn đã được gửi cho chúng tôi, chúng tôi sẽ liên hệ với bạn sớm nhất có thể , xin cảm ơn", Time: 3 }, message);
                } else {
                    Notify.Error({ Message: "Có lỗi xảy ra", Time: 3 }, message);
                }
            }
        });
        AddCustomFormValidate('comment-form', function (kn, message) {
            if (!kn) {
                Notify.Complete({ Message: "Không có dữ liệu", Time: 3 }, message);
            } else {
                var form = $('#comment-form');
                if (kn.DataType === "success") {
                    $('#comment-form')[0].reset();
                    $('#comment-form .ignore').html("");
                    form.fadeOut(1000, function () {
                        $(this).delay(5000).fadeIn();
                    })
                    Notify.Complete(kn, message);
                } else {
                    Notify.Error(kn, message);
                }
            }
        });
    };


    // #endregion

    function initLoadOnClick() {
        $('.load-on-click').each(function (_, item) {
            classie.remove(item, 'load-on-click');
            item.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var url = this.getAttribute("data-src");
                var parent = item.parentNode;
                var loader = createLoader();
                $.get(url)
                    .done(function (data) {
                        $(parent).replaceWith(data);

                        AjaxLoadComplete();
                        removeLoader(loader);
                    }).fail(function () { removeLoader(loader) })
            })
        })
    }

    function initSwipper() {
        $('.sw-init').each(function (_, item) {
            classie.remove(item, 'sw-init');
            if (classie.has(item, 'sw-one')) {
                new Swiper(item, {
                    nextButton: '.btn-next',
                    prevButton: '.btn-prev',
                    speed: 1200,
                    preloadImages: false,
                    lazyLoading: true,
                    lazyLoadingOnTransitionStart: true,
                    //lazyLoadingInPrevNextAmount: 1,
                    autoplay: 7000,
                    loop: true
                });
            } else if (classie.has(item, 'sw-clients')) {
                new Swiper(item, {
                    slidesPerView: 5,
                    spaceBetween: 50,
                    loop: true,
                    speed: 2000,
                    autoplay: 4000,
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
                            slidesPerView: 1,
                            spaceBetween: 0
                        }
                    }
                })
            } else if (classie.has(item, 'sw-testimonials')) {
                new Swiper(item, {
                    pagination: '.sw-page',
                    paginationClickable: true,
                    nextButton: '.btn-next',
                    prevButton: '.btn-prev',
                    slidesPerView: 1,
                    speed: 1000,
                    autoplay: 7000,
                    loop: true
                })
            } else if (classie.has(item, 'sw-news')) {
                new Swiper(item, {
                    pagination: '.sw-page',
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
                })
            }
        })




    }

    function Accordion() {
        [].slice.call(document.querySelectorAll(_selector_accordion)).forEach(function (item) {
            classie.remove(item, _selector_accordion.substr(1));
            item.addEventListener('click', function (evt) {
                var next = $(this).next(); //.nextSibling;
                next.slideToggle();
                classie.toggle(this.parentNode, _className_trigger_open);
                $(this).closest('.accordion').find('.submenu').not(next).slideUp().parent().removeClass(_className_trigger_open);
            })

        })

    }



    function initScrollSpy() {
        var $body = $('body'),
            $sidebar = $('.init-sidebar');
        if ($sidebar.length) {
            $sidebar.removeClass("init-sidebar");
            var $sidebar_a = $sidebar.find('a');
            $sidebar_a
                .addClass('scrolly init-scrolly')
                .on('click', function (e) {
                    var $this = $(this);
                    if ($this.attr('href').charAt(0) !== '#')
                        return;
                    $sidebar_a.removeClass('active');
                    $this.addClass('active')
                        .addClass('active-locked');

                })
        }
    }
    // #region CheckBox
    var checkbox_inited = 'check-box';
    var checkbox_not_init = 'ck'

    function toggleCheckBox(e) {
        var div = $(this);
        var check = div.find('input');
        //  var input = div.find('hidden');

        //check.attr('checked', !check.attr('checked'));
        check.attr('value', check.attr('value') == 'true' ? 'false' : 'true');
        // input.val(check.attr('value') == 'true');
        classie.toggle(this, 'checkedBox');
    }

    function wrapCheckBox(item) {
        var el = $(item);
        classie.add(item, checkbox_inited);
        var title = item.title;
        //item.setAttribute('checked', el.attr('value') == 'true');
        el.wrap('<div class ="check-wrap"><div class="' + checkbox_inited + '"' + (title ? ' title="' + title + ' "' : '') + '><i></i><input type="hidden" class="hidden" name="' + item.name + '" value=""/></div><p>' + (title ? title : ' ') + '</p></div>');
        var par = el.closest('div');
        var input = par.find('.hidden');
        if (el.attr('value') == 'true') {
            classie.add(par[0], 'checkedBox');
            input.val('true');
            // el.closest('div').addClass('checkedBox');
        }
        else {
            input.val('false');
        }
        if (!classie.has(item, 'readonly'))
            par[0].addEventListener('click', toggleCheckBox);
        // el.closest('div').on('click', toggleCheckBox);
    }

    function WrapCheckBoxs() {
        [].slice.call(document.querySelectorAll('.' + checkbox_not_init)).forEach(function (el) {
            classie.remove(el, checkbox_not_init);
            wrapCheckBox(el);

        });
    }
    // #endregion
    //#region Froala
    var names;

    function getNames() {
        if (!names || !names.length) {
            var r = $.Deffered();
            $.get('/pub/getUsers').done(function (data) {
                names = data;
                r.resolve();
            });
            return r.promise();
        }
        return names;
    }

    function beforeUpload(e, editor, files) {

        if (files.length) {
            var id = makeid();
            Upload.initFE(files, id);
            addEventListener('imageCropped', function (e) {
                if (e.detail.file === id) {
                    e.preventDefault();
                    e.stopPropagation();
                    var notify = Notify.Show();
                    $.post({
                        url: "/FileApi/uploadImage",
                        type: 'POST',
                        data: {
                            ImageData: e.detail.data
                            //'ContentType': e.detail.data.ContentType,
                            //'Data': e.detail.data.Data
                        },
                        cache: false,
                        dataType: 'json'
                    }).done(function (ddata) {
                        try {

                            if (ddata.Success) {

                                var data = ddata.FileName;
                                var image = new Image();
                                image.onload = function () {
                                    editor.image.insert(data, null, null, editor.image.get());
                                }

                                image.src = data;
                                Notify.Destroy(notify);
                            } else {
                                Notify.Error({ Message: ddata.Message, Time: 20 }, notify);
                            }

                        } catch (e) {
                            Notify.Error({ Message: e }, notify);
                        }

                    }).fail(function (e) {
                        Notify.e({ Message: e }, notify);
                    })




                }
            })
            //var reader = new FileReader();
            //reader.onload = function (e) {
            //    var result = e.target.result;
            //    editor.image.insert(result, null, null, editor.image.get());
            //};
            //reader.readAsDataURL(files[0]);
        }

        return false;
    }

    function unlink(e, editor, link) {
        $.ajax({
            method: "POST",
            url: "/FileApi/DeleteFile",
            data: {
                src: link.getAttribute('href')
            }
        })
            .done(function (data) {
                console.log('file was deleted');
            })
            .fail(function (err) {
                console.log('file delete problem: ' + JSON.stringify(err));
            })
    }

    function imageRemoved(e, editor, $img) {
        $.ajax({
            method: "POST",
            url: "/FileApi/DeleteImage",
            data: {
                src: $img.attr('src')
            }
        })
            .done(function (data) {
                console.log('image was deleted');
            })
            .fail(function (err) {
                console.log('image delete problem: ' + JSON.stringify(err));
            })
    }

    function editorInitted(e, editor) {
        if (!names || !names.length) {
            $.getJSON('/pub/getUsers').done(function (data) {
                names = $.map(data, function (item, i) {
                    return {
                        "id": i,
                        "name": item.N,
                        "fullname": item.F
                    }
                });
                var config = {
                    at: "@",
                    data: names,
                    displayTpl: '<li>${name} <small>${fullname}</small></li>',
                    limit: 200
                }
                editor.$el
                    .atwho(config)
                    .on('inserted.atwho', function () {
                        editor.$el.find('.atwho-inserted').removeAttr('contenteditable');
                    })

                editor.events.on('keydown', function (e) {
                    if (e.which === 13 && editor.$el.atwho('isSelecting')) {
                        return false;
                    }
                }, true);
            });
            //if (!editor.fullscreen.isActive) {
            //    editor.fullscreen.toggle();
            //}
        }

    }

    function initEditor() {
        //$.FroalaEditor.RegisterQuickInsertButton('myButton', {
        //    // Icon name.
        //    icon: 'fa ',

        //    // Tooltip.
        //    title: 'My Button',

        //    // Callback for the button.
        //    callback: function () {
        //        // Call any editor method here.
        //        this.html.insert('Hello Froala!');
        //    },

        //    // Save changes to undo stack.
        //    undo: true
        //})
        $('.note-editable').removeClass("note-editable")

        .on('froalaEditor.initialized', editorInitted)
            .froalaEditor({
                paragraphStyles: {
                    'Chữ màu đỏ': 'text-danger',
                    'Chữ màu xanh nhạt': 'text-info'
                },
                //  toolbarInline: true,
                //  fullPage:true,
                htmlRemoveTagBlogs: [],
                enter: $.FE.ENTER_BR,
                language: "vi",
                initOnClick: true,
                theme: 'red',
                imageUploadURL: '/FileApi/UploadImage',
                fileUploadURL: '/FileApi/UploadFile',
                imageManagerLoadURL: '/FileApi/LoadImages',
                imageManagerDeleteURL: "/FileApi/DeleteImage",
                imageManagerDeleteMethod: "POST",
                emoticonsStep: 4,
                emoticonsSet: [
                    { code: '1f600', desc: 'Grinning face' },
                    { code: '1f601', desc: 'Grinning face with smiling eyes' },
                    { code: '1f602', desc: 'Face with tears of joy' },
                    { code: '1f603', desc: 'Smiling face with open mouth' },
                    { code: '1f604', desc: 'Smiling face with open mouth and smiling eyes' },
                    { code: '1f605', desc: 'Smiling face with open mouth and cold sweat' },
                    { code: '1f606', desc: 'Smiling face with open mouth and tightly-closed eyes' },
                    { code: '1f607', desc: 'Smiling face with halo' }
                ]
            })
            .on('froalaEditor.image.removed', imageRemoved)
            .on('froalaEditor.file.unlink', unlink)
            .on('froalaEditor.image.beforeUpload', beforeUpload)

        //.on('froalaEditor.contentChanged', function (e, editor) {
        //    $('#preview-content').html(editor.html.get());
        //})
        ;
        $('.froa').each(function (_, item) {
            classie.remove(item, 'froa');
            $(item)
         .froalaEditor({
             toolbarButtons: ['bold', 'italic', 'underline', 'color'],
             toolbarButtonsSM: ['bold', 'italic', 'underline', 'color'],
             toolbarButtonsXS: ['bold', 'italic', 'underline', 'color'],
             pluginsEnabled: ['colors'],
             spellcheck: false,
             toolbarInline: true,
             //  fullPage:true,
             htmlRemoveTagBlogs: [],
             enter: $.FE.ENTER_BR,
             language: "vi",
             initOnClick: true,
         })
            .on('froalaEditor.blur', function (e, editor) {
                var control = editor.$box;
                var value = editor.$box.find('.fr-element')[0].innerHTML;
                var form = control.closest('form');
                var hidden = form.find('input[name=' + control.attr('name') + ']');
                hidden.val(value);

            })
        })
    }

    function InitEdit() {

        if ($('.note-editable').length || $('.froa').length)
            if (!$.FE || !$.FE.length) {
                addScript("/data/editor.min.js", initEditor);
            } else {
                initEditor();
            }
    }
    //#endregion
    function initTab() {
        $(".tab-link-init").each(function (_, tab) {
            classie.remove(tab, "tab-link-init");
            classie.add(tab, "tab-link");
            tab.addEventListener('click', OnTabLinkClick);
        })
    }

    function initTimeAgo() {
        [].slice.call(document.querySelectorAll('.timeago')).forEach(function (item) {
            classie.remove(item, 'timeago');
            $(item).timeago();
        })
    }

    function initChosen() {

        [].slice.call(document.querySelectorAll('.chosen')).forEach(function (item) {
            classie.remove(item, 'chosen');
            var count = item.getAttribute('count');
            $(item).chosen({
                no_results_text: "Không tìm thấy , nhấn Enter để thêm mới ",
                max_selected_options: count ? count : "Infinity",
                allow_single_deselect: true

            });
        })
    }

    function initImageFake(el) {


        [].slice.call(el.querySelectorAll(_selector_image_fake)).forEach(function (item) {
            classie.remove(item, _className_image_fake);
            item.innerHTML = '<img src="' + "data:image/svg+xml;charset=utf-8," + encodeURIComponent(_image_BaseSVG.replace(/{{w}}/g, 300).replace(/{{h}}/g, 150)) + '" class="image-upload" />';
            var img = item.querySelector('img');
            if (item.getAttribute('data-upload')) {
                img.id = "upload";
                img.title = "Click vào ảnh để upload";
            }
            var className = item.getAttribute('data-class');
            if (className && className.length) classie.add(img, className);
            classie.add(img, 'auto-height');
            var src = item.getAttribute('data-src');
            if (src && src.length) {
                img.src = src;
            }

        })


    }

    function _onClick_comment_form_link(e) {
        // e.preventDefault();
        // e.stopPropagation();
        var button = $(this);


        var target = document.getElementById(this.hash);
        if (target) {
            var parentId = this.getAttribute("data-id");
            var hidden_ParentId = target.querySelector('#parentId');
            if (hidden_ParentId && parentId)
                hidden_ParentId.value = parentId;
            _AnimationScroll(target.offsetTop - 70, _scrollTime);
            //$("html, body").animate({ scrollTop: target.offsetTop + 120 }, _scrollTime);
            var content = document.getElementById('ctmes');
            if (content) content.click();
            // $('#ctmes').trigger('click'); //.focus();
        }

        // return false;
    }

    function _comment_form_reply_click(item) {
        classie.remove(item, _className_open_comment_form);
        item.addEventListener('click', _onClick_comment_form_link, { capture: true })

    }

    function initCommentLink(el) {
        var all = el.querySelectorAll(_selector_open_comment_form);
        if (all && all.length)
            [].slide.call(all).forEach(_comment_form_reply_click)
    }
    // #region Upload

    var Upload = function () {
        let api,
            canvas,
            context,
            modal,
            cropx,
            cropy,
            crp,
            imageContainer,
            input;

        function HideCrop() {
            api.destroy();
            crp.parentNode.removeChild(crp);
            createCrop();
            classie.remove(modal, _className_trigger_open);
            TDCollapse.onClose();
        }

        function DoCrop() {

            let ck = $(modal).find('input[type="checkbox"]');
            let dataFull;

            if (ck && ck.is(":checked")) {
                dataFull = canvas.toDataURL("image/png");

            } else {
                dataFull = canvas.toDataURL("image/jpeg");

            }


            var dataChecked = $(crp).data("ck");
            if (dataChecked && dataChecked.length) {
                let ev = new CustomEvent("imageCropped", {
                    detail: { file: dataChecked, data: dataFull }
                })
                window.dispatchEvent(ev);

            } else {
                document.getElementById('upload').setAttribute('src', dataFull);
                document.getElementById('ImageData').value = dataFull;
            }
            HideCrop();
        }

        function cropXChanged() {
            canvas.width = this.value;
            initCrop();
        }

        function cropYChanged() {
            canvas.height = this.value;
            initCrop();
        }

        function loadImageComplete(evt, i, w, h) {
            let img;
            if (i) img = i;
            else img = this;
            var selectx = img.naturalWidth,
                selecty = img.naturalHeight;
            var imageratio = selectx / selecty;
            if (w) cropx.value = w;
            if (h) cropy.value = h;

            var ratio = canvas.width / canvas.height;
            if (ratio < imageratio) {
                selectx = ratio * selecty;
            } else {
                selecty = selectx / ratio;
            }
            crp.src = evt.target.src;
            initJcrop(ratio, selectx, selecty);

        }

        function ReaderLoaded(evt, w, h) {
            classie.add(_html, _className_modal_open);
            classie.add(modal, _className_trigger_open);
            let img = new Image();
            if (!w) {
                img.onload = loadImageComplete;
            } else {
                img.onload = function (evt) {
                    loadImageComplete(evt, this, w, h);
                };
            }
            img.src = evt.target.result;
        }

        function initCrop() {

            if (api) api.destroy();
            var img = crp[0];
            var selectx = img.naturalWidth,
                selecty = img.naturalHeight;
            var imageratio = selectx / selecty;
            var ratio = canvas.width / canvas.height;
            if (ratio < imageratio) {
                selectx = ratio * selecty;
            } else {
                selecty = selectx / ratio;
            }
            initJcrop(ratio, selectx, selecty);
        }

        function showCoords(c) {
            if (crp) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(crp, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
            }

        }

        function initJcrop(ratio, selectx, selecty) {
            $(crp).Jcrop({
                onChange: showCoords,
                onSelect: showCoords,
                aspectRatio: ratio,
                bgColor: 'transparent',
                boxWidth: $(window).width() - 5,
                boxHeight: $(window).height() - 20,
                bgOpacity: 0.6,
                setSelect: [0, 0, selectx, selecty]
            }, function () { api = this });
        }

        function onUserSelectFile(e, w, h) {
            try {
                var file = e.target.files[0];
            } catch (err) {
                file = e.target.value;
            }
            let reader = new FileReader();
            if (!w) reader.onload = ReaderLoaded;
            else {
                reader.onload = function (e) {
                    ReaderLoaded(e, w, h);
                };
            }
            if (file) reader.readAsDataURL(file);
        }



        // function InitUploadExternal(fileInput, width, height) {

        //     $(fileInput).on('change', function(e) {
        //         if (!width) width = 100;
        //         if (!height) height = 100;
        //         cropx.val(width);
        //         cropy.val(height);
        //         canvas.height = height;
        //         canvas.width = width;
        //         $('img.image_crop').data('ck', fileInput);
        //         onUserSelectFile(e, width, height);
        //     });


        // }

        function froalaUpload(files, fileInput) {
            var width = 300;
            var height = 200;
            cropx.value = (width);
            cropy.value = (height);
            canvas.height = height;
            canvas.width = width;

            $(crp).data('ck', fileInput);
            let file = files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                ReaderLoaded(e, width, height);
            };
            reader.readAsDataURL(file);
        }

        function imageClick() {
            var fig = $(this).closest("figure");
            var w = fig.data('width');
            var h = fig.data('height');
            cropx.value = w;
            cropy.value = h;
            canvas.height = h;
            canvas.width = w;
            crp.setAttribute('data-ck', "");
            input.click();
        }

        function closetrigger(evt) {
            if (evt.detail.id === modal_id) {
                if (api) api.destroy();
                if (input) {
                    input.removeEventListener('change', onUserSelectFile);
                    input.parentNode.removeChild(input);
                    createInput();
                }
                return false;
            }
        }
        let input_id = 'avaup',
            modal_id = 'mdcrop';

        function createInput() {
            addStringToEl("<input type='file' id='" + input_id + "' class='input-file hide'/>",_body);
            input = document.getElementById(input_id);
            input.addEventListener('change', onUserSelectFile);
        }

        function createCrop() {
            imageContainer.innerHTML = '<img class="image_crop" src="/data/site_svg/noavatar.png" />';
            crp = imageContainer.querySelector('img.image_crop');
        }

        function createModal() {
            addStringToEl("<div id='" + modal_id + "' class='collapse jcrop-container'><a class='collapse-close'><span class='line'></span></a><a class='btn btn-sm docrop' title='Cắt và sử dụng ảnh'><i class='fa fa-save'></i></a><div class='crop-options'><input type='checkbox' class='ck' title='Nền trong suốt' /><div><p>Kích thước:</p><input type='number' class='cropx ignore' /><p>X</p><input type='number' class='cropy ignore' /></div></div><canvas id='preview' class='hide'></canvas><div class='image-cropper center-block'><img class='image_crop' src='/data/site_svg/noavatar.png' /></div></div>",_body);
            WrapCheckBoxs();
            modal = document.getElementById(modal_id);
            canvas = modal.querySelector('#preview');
            context = canvas.getContext("2d");
            cropx = modal.querySelector('.cropx');
            cropy = modal.querySelector('.cropy');
            imageContainer = modal.querySelector('.image-cropper');
            cropx.addEventListener('change', cropXChanged);
            cropy.addEventListener('change', cropYChanged);
            crp = modal.querySelector('img.image_crop');
            let btnDocrop = modal.querySelector('.docrop');
            btnDocrop.addEventListener('click', DoCrop);
        }

        function init() {
            addEventListener(_event_Close, closetrigger);
            input = document.getElementById(input_id);
            if (!input) {
                createInput();
            }
            modal = document.getElementById('mdcrop');
            if (!modal) {
                createModal();
            }
            $('body').on("click", '#upload', imageClick);
        }
        return {
            init: init,
            // initUpload: InitUploadExternal,
            initFE: froalaUpload
        };
    }();
    // #endregion

    function _onClick_LoadToPanel(e) {
        console.log('load to Panel click');
        e.preventDefault();
        e.stopPropagation();
        var el = this;

        var targetLink = el.getAttribute('data-target');
        var target;
        if (targetLink && targetLink.length) {
            target = document.getElementById(targetLink);
        } else {
            var src = el.getAttribute('data-src');
            if (src && str.length) {
                var pieces = src.split('/');
                if (pieces && pieces.length) {
                    targetLink = pieces[pieces.length - 1];
                    target = document.getElementById(targetLink);
                    el.setAttribute('data-target', targetLink);
                } else {
                    Notify.Show({
                        Message: "Lỗi dữ liệu" + el,
                        DataType: 'error',
                    });
                    return;
                }
            }
        }

        var panelLoad = document.getElementById(el.hash.substr(1));
        if (panelLoad) {
            [].slice.call(panelLoad.querySelectorAll('.in')).forEach(function (item) { classie.remove(item, 'in') }); //.removeClass("in");
            if (!target) {
                var url = el.getAttribute('data-src');
                var param = el.getAttribute('data-param');
                if (param) url += "/" + param;

                var whenLoadCommplete = function (data) {
                    var div = document.createElement('div');
                    div.id = targetLink;
                    div.className = 'in';
                    div.innerHTML = data;
                    panelLoad.appendChild(div);
                    AjaxLoadComplete(div);

                    removeLoader(loader);
                }
                var loader = createLoader();
                $.get(url).done(whenLoadCommplete).fail(function (e) {
                    removeLoader(loader);
                    Notify.se({
                        DataType: 'error',
                        Time: 10,
                        Message: e.responseText
                    })
                });
            } else {
                classie.add(target, 'in')
            }
        }
    }

    function _initClick_LoadToPanel(item) {
        classie.remove(item, 'load-click');
        item.addEventListener('click', _onClick_LoadToPanel);
    }

    function initClick_LoadToPanel(el) {
        [].slice.call(el.querySelectorAll('.load-click')).forEach(_initClick_LoadToPanel);
    }

    function AjaxLoadComplete(el) {

        if (document) {

            if (!el) el = document;
            initSticky(el);
            FormValidate();
            initImageFake(el);
            initCommentLink(el);
            initClick_LoadToPanel(el);
            initLoadOnClick(el);
            initTextArea(el);
            initScrollSpy(el);
            initFilter(el);
            InitEdit(el);
            initTab(el);
            WrapCheckBoxs(el);
            initTimeAgo(el);
            initInput(el);
            Accordion(el);
            //InitGoogleMap();
            initSwipper(el);
            handleScrollToSection(el);
        }
        //    console.log('ajax' + (new Date() - st));
    }

    return {
        init: GlobalInit
    }
}();

$(document).ready(function () {

    Global.init();
});