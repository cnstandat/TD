
$(function () {
    //(function () {
    //    var method;
    //    var noop = function () { };
    //    var methods = [
    //        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    //        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    //        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    //        'timeStamp', 'trace', 'warn'
    //    ];
    //    var length = methods.length;
    //    var console = (window.console = window.console || {});

    //    while (length--) {
    //        method = methods[length];

    //        // Only stub undefined methods.
    //        if (!console[method]) {
    //            console[method] = noop;
    //        }
    //    }
    //}());

    var supportani = { animations: Modernizr.cssanimations },
        animEndEventNames = { 'WebkitAnimation': 'webkitAnimationEnd', 'OAnimation': 'oAnimationEnd', 'msAnimation': 'MSAnimationEnd', 'animation': 'animationend' },
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        onEndAnimation = function (el, callback) {
            var onEndCallbackFn = function (ev) {
                if (supportani.animations) {
                    if (ev.target !== this) return;
                    this.removeEventListener(animEndEventName, onEndCallbackFn);
                }
                if (callback && typeof callback === 'function') { callback.call(); }
            };
            if (supportani.animations) {
                el.addEventListener(animEndEventName, onEndCallbackFn);
            } else {
                onEndCallbackFn();
            }
        };
    var transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        supportTrans = { transitions: Modernizr.csstransitions };

    // #region Mobile Check Get ViewPort

    //function mobilecheck() {
    //    var check = false;
    //    (function (a) { if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    //    return check;
    //}

    function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    // #endregion

    // #region Cookie
    //JavaScript Cookie v2.1.4
    //https://github.com/js-cookie/js-cookie
    (function (factory) {
        var registeredInModuleLoader = false;
        if (typeof define === 'function' && define.amd) {
            define(factory);
            registeredInModuleLoader = true;
        }
        if (typeof exports === 'object') {
            module.exports = factory();
            registeredInModuleLoader = true;
        }
        if (!registeredInModuleLoader) {
            var OldCookies = window.Cookies;
            var api = window.Cookies = factory();
            api.noConflict = function () {
                window.Cookies = OldCookies;
                return api;
            };
        }
    }(function () {
        function init(converter) {
            function api(key, value, attributes) {
                var result;
                if (typeof document === 'undefined') {
                    return;
                }

                if (arguments.length > 1) {
                    attributes = extend({
                        path: '/'
                    }, api.defaults, attributes);

                    if (typeof attributes.expires === 'number') {
                        var expires = new Date();
                        expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                        attributes.expires = expires;
                    }

                    // We're using "expires" because "max-age" is not supported by IE
                    attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                    try {
                        result = JSON.stringify(value);
                        if (/^[\{\[]/.test(result)) {
                            value = result;
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    if (!converter.write) {
                        value = encodeURIComponent(String(value))
                            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                    } else {
                        value = converter.write(value, key);
                    }

                    key = encodeURIComponent(String(key));
                    key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                    key = key.replace(/[\(\)]/g, escape);

                    var stringifiedAttributes = '';

                    for (var attributeName in attributes) {
                        if (!attributes[attributeName]) {
                            continue;
                        }
                        stringifiedAttributes += '; ' + attributeName;
                        if (attributes[attributeName] === true) {
                            continue;
                        }
                        stringifiedAttributes += '=' + attributes[attributeName];
                    }
                    return (document.cookie = key + '=' + value + stringifiedAttributes);
                }

                // Read

                if (!key) {
                    result = {};
                }

                // To prevent the for loop in the first place assign an empty array
                // in case there are no cookies at all. Also prevents odd result when
                // calling "get()"
                var cookies = document.cookie ? document.cookie.split('; ') : [];
                var rdecode = /(%[0-9A-Z]{2})+/g;
                var i = 0;

                for (; i < cookies.length; i++) {
                    var parts = cookies[i].split('=');
                    var cookie = parts.slice(1).join('=');

                    if (cookie.charAt(0) === '"') {
                        cookie = cookie.slice(1, -1);
                    }

                    try {
                        var name = parts[0].replace(rdecode, decodeURIComponent);
                        cookie = converter.read ?
                            converter.read(cookie, name) : converter(cookie, name) ||
                            cookie.replace(rdecode, decodeURIComponent);

                        if (this.json) {
                            try {
                                cookie = JSON.parse(cookie);
                            } catch (e) {
                                console.log(e);
                            }
                        }

                        if (key === name) {
                            result = cookie;
                            break;
                        }

                        if (!key) {
                            result[name] = cookie;
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }

                return result;
            }

            api.set = api;
            api.get = function (key) {
                return api.call(api, key);
            };
            api.getJSON = function () {
                return api.apply({
                    json: true
                }, [].slice.call(arguments));
            };
            api.defaults = {};

            api.remove = function (key, attributes) {
                api(key, '', extend(attributes, {
                    expires: -1
                }));
            };

            api.withConverter = init;

            return api;
        }

        return init(function () { });
    }));

    function cookieBar(options) {
        var settings = extend({

            'hideOnClose': true,
            'secure': false,
            'path': '/',
            'domain': ''
        }, options);
        var item = $('.cookie');
        item.removeClass("show");//.remove("show");
        if (Cookies.get('cookiebar') !== 'hide') {
            item.addClass("show");
        }
        var button = item.find('.btn');
        button.addEventListener('click', function () {
            if (settings.hideOnClose) {
                item.removeClass("show");
            }
            Cookies.set('cookiebar', 'hide', { path: settings.path, secure: settings.secure, domain: settings.domain, expires: 30 });
            return false;
        })
    }

    // #endregion


    // #region MakeGlobalId

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        if (document.getElementById(text) === null)
            return text;
        else return makeid();
    }

    // #endregion

    // #region CheckBox

    var CheckBox = function () {
        function toggleCheckBox(e) {
            var check = this.querySelector('input');
            check.setAttribute('checked', !this.getAttribute('checked'));
            check.setAttribute('value', (this.getAttribute('value') === 'true' ? 'false' : 'true'));
            classie.toggle(this, "checkedBox");
        }

        function wrapCheckBox(el) {
            var par = el.parentNode;
            if (!classie.has(el, 'check-box')) {
                var div = document.createElement("div");
                div.classList = "check-box";
                par.replaceChild(div, el);
                var i = document.createElement("i");
                if (el.getAttribute('value') === "true") {
                    classie.add(div, "checkedBox");
                }
                i.appendChild(el);
                div.appendChild(i);
                var title = el.getAttribute('title');
                if (title && title.length) {
                    var wrap = document.createElement("div");
                    wrap.classList = "check-wrap";
                    div.title = title;

                    var span = document.createElement('p');
                    span.textContent = title;
                    par.replaceChild(wrap, div);
                    wrap.appendChild(div);
                    wrap.appendChild(span);
                }
                div.addEventListener('click', toggleCheckBox)
            }

        }
        return {
            wrapAll: function () {
                var checkBoxList = document.querySelectorAll('.ck');
                if (checkBoxList.length) {
                    [].slice.call(checkBoxList).forEach(function (el) {
                        classie.remove(el, "ck");
                        wrapCheckBox(el);
                    });
                }

            },
            init: function () {
                CheckBox.wrapAll();
            }
        }
    }();

    // #endregion

    // #region Notify
    var Notify = function () {
        var container = document.getElementById('notify-container');
        function onclose(id) {
            var notity = document.getElementById(id);
            if (notity) {
                var _current = notity.getAttribute('data-url');
                if (_current) {
                    if (_current === "reload") location.reload();
                    else location.href = _current;
                } else notity.parentNode.removeChild(notity);
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
            notify.setAttribute("id", id);
            var progressValue = document.createElement('div');
            classie.add(progressValue, "notify-progress");
            notify.appendChild(progressValue);
            container.insertBefore(notify, container.firstChild);
            notify.addEventListener('click', function (ev) {
                onclose(id);
            })
            $(progressValue).velocity({ width: "100%" }, {
                duration: 1000,
                easing: "linear",
                progress: function (elements, c, r, s, t) { },
            })
            return id;
        }
        function complete(data, id) {
            console.log(data);
            var notify = document.getElementById(id);

            notify.querySelector('.notify-progress').remove();
            var message = document.createElement("div");
            message.classList = "notify-message";
            if (data.Message)
                message.innerText = data.Message;
            if (data.DataType) {
                notify.classList += " " + data.DataType;
            }

            if (data.IsReload) {
                notify.setAttribute('data-url', "reload");
            }
            else if (data.RedirectUrl) {
                notify.setAttribute('data-url', data.RedirectUrl);
            }
            var time = 3000;
            if (data.Time) time = data.Time * 1000;
            notify.appendChild(message);
            message.style.opacity = 1;



            if (data.Component) {
                if (!data.Param) {
                    $('#' + data.Component).remove();
                    $('[data-target="' + data.Component + '"]').trigger('click');
                } else {
                    $('#' + data.Component).remove();
                    $('[data-target="' + data.Component + '"]').data('param', data.Param).trigger('click');
                }
            }
            if (data.Time) {
                setTimeout(function () {
                    onclose(id)
                }, time);
            }
            else onclose(id);
            console.log(notify);
        }
        function err(data, id) {
            var notify = document.getElementById(id);
            $(notify).find('.notify-progress').velocity('stop').remove();
            var message = document.createElement("div");
            message.classList = "notify-message";
            message.innerHTML = data;
            classie.add(notify, "danger");
            notify.appendChild(message);
            $(message).velocity({ opacity: 1 }, { duration: 400, delay: 5000 }, onclose(id));
        }
        function remove(id) {
            var notify = document.getElementById(id);
            if (notify) notify.remove();
        }
        return {
            Show: show,
            Complete: complete,
            Error: err,
            Destroy: remove
        }
    }();
    // #endregion

    // #region Collapse
    var body = document.getElementsByTagName('body')[0],
        main = document.querySelector('.wrapper');
    var Collapse = function () {
        function onTogglerButtonClick(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            var trigger = this;
            var target = document.getElementById(trigger.getAttribute("data-toggle"));
            if (target) {
                if (!classie.has(target, "open")) {
                    classie.add(body, 'modal-open');
                    classie.add(target, "open");
                    var ev = new CustomEvent('open-trigger', { detail: target });
                    window.dispatchEvent(ev);
                    var onshow_body_class = trigger.getAttribute("data-onshow");
                    if (onshow_body_class) {
                        classie.add(main, onshow_body_class);
                        target.setAttribute('data-onclose', onshow_body_class);
                    }
                } else classie.remove(target, "open");
            }
        }

        function onButtonCloseClick(evt) {
            var target = this.parentNode;
            var onClose_body_class = target.getAttribute("data-onclose");
            if (onClose_body_class) {
                target.setAttribute("data-onclose", "");
                classie.remove(main, onClose_body_class);
            }
            classie.remove(target, "open");
            var ev = new CustomEvent("closed-trigger", { detail: this.parentNode });
            window.dispatchEvent(ev);
        }

        function handlerClosed() {
            var find = document.querySelector('.collapse.open');
            if (!find && classie.has(body, "modal-open")) {
                classie.remove(body, "modal-open");
            }
        }



        function handlerOpened(e) {

            var div = e.detail;
            if (div) {
                if (classie.has(div, "scrollspy")) {
                    $(div).find(".scroll").each(function (_, anchor) {
                        if (!classie.has(this, "inited")) {
                            classie.add(this, 'inited');
                            var self = this;
                            var scrollSpy = $(self).closest('.scrollspy');
                            this.addEventListener('click', function (evt) {
                                evt.preventDefault();
                                evt.stopPropagation();
                                var target = $(self.getAttribute('href'));
                                if (target.length) {
                                    scrollSpy.animate({ scrollTop: target.position().top }, 1000);
                                }
                            })
                        }
                    })
                    var anchors = [],
                        viewH = $(div).height() - 50,
                        divH = $(div).find('.sidebar-wrap').height();
                    $('[id^=chapter]').each(function (_, chapter) {
                        var id = chapter.id;
                        anchors.push({
                            id: $(div).find('.scroll[href=\'#' + id + '\']')[0],
                            top: $(chapter).position().top,
                            height: $(chapter).height()
                        });
                    });

                    $(div).scroll(_.debounce(function (e) {
                        var scroll = $(div).scrollTop();
                        anchors.forEach(function (item) {
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
                        })
                    }, 100));
                }
            }

        }

        function init() {
            $('body').on('click', '.togger', onTogglerButtonClick);
            $('body').on('click', '.collapse-close', onButtonCloseClick);
            addEventListener('closed-trigger', handlerClosed);
            addEventListener('open-trigger', handlerOpened);
        }
        return {
            init: init
        }
    }();

    // #endregion

    // #region Menu Manager


    function initMenu() {
        var pathname = window.location.pathname; // Returns path only
        var url = window.location.href; // Returns full URL
        var menuItems = document.querySelectorAll(".menu-link");
        [].slice.call(menuItems).forEach(function (el) {
            if (el.pathname === pathname) {
                classie.add(el.parentNode, "menu-current");
            } else {
                classie.remove(el.parentNode, "menu-current");
            }
        });
    }

    var ScrollAutoHide = function () {
        var didScroll;
        var lastScrollTop = 0;
        var delta = 15;
        var box_gallery_height = $('#boxgallery').outerHeight();
        var offset_trigger = 80;
        if (box_gallery_height) offset_trigger = box_gallery_height - 100;

        var scrollHandler = function () {
            var _menu = document.querySelector('.menu-top');
            if (_menu) {
                var st = window.pageYOffset;
                if (Math.abs(lastScrollTop - st) <= delta)
                    return;
                var barFilter = document.getElementById("bar-filter");

                if (st > lastScrollTop) {
                    if (st > offset_trigger) {
                        if (!classie.has(_menu, "on-down")) {
                            classie.add(_menu, "on-down");
                        }
                        if (barFilter) {
                            if (st < document.body.clientHeight - document.querySelector('.footer').offsetHeight - 200) {
                                classie.add(barFilter, "show");
                            } else {
                                classie.remove(barFilter, "show");
                            }
                        }

                    }
                } else {
                    if (barFilter)
                        if (st < document.body.clientHeight - document.querySelector('.footer').offsetHeight) {
                            classie.add(barFilter, "show");
                        } else {
                            classie.remove(barFilter, "show");
                        }


                    if (st < offset_trigger) {
                        if (classie.has(_menu, "on-down")) classie.remove(_menu, 'on-down');
                        if (barFilter)
                            classie.remove(barFilter, "show");
                    }
                }

                lastScrollTop = st;
            }

        };

        function init() {
            window.addEventListener('scroll', _.debounce(scrollHandler, 100));
            scrollHandler();
        }
        return {
            init: init
        }
    }()
    // #endregion

    // #region AddScripts

    var addScript = function (url, callback) {
        var script = document.createElement('script');
        script.onload = callback;
        script.type = 'text/javascript';
        script.defer = "defer";
        script.innerText = "";
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
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
                        url: "/pub/upload",
                        type: 'POST',
                        data: {
                            'ContentType': e.detail.data.ContentType,
                            'Data': e.detail.data.Data
                        },
                        cache: false,
                        dataType: 'json',
                        success: function (ddata) {
                            try {
                                if (ddata.Success) {
                                    var data = ddata.FileName;
                                    var image = new Image();
                                    image.onload = function () {
                                        editor.image.insert(this.src, null, null, editor.image.get());
                                    }
                                    image.src = data;
                                    Notify.Destroy(notify);
                                }
                                else {
                                    Notify.Error({ Message: "Có lỗi khi up ảnh" }, notify);
                                }

                            }
                            catch (e) {
                                Notify.Error({ Message: e }, notify);
                            }

                        },

                        error: function (e) {
                            Notity.Error({ Message: e }, notify);

                        }
                    });

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

        $('.note-editable').removeClass("note-editable")
            //.on('froalaEditor.initialized', function (e, editor) {
            //    $('.note-editable').parents('form').on('submit', function () {
            //        console.log($('#edit').val());
            //        return false;
            //    })
            //})
            .on('froalaEditor.initialized', editorInitted)
            .froalaEditor({
                // toolbarStickyOffset: 300,
                //function () {
                //  return $(this).offset().top;
                //},
                inlineStyles: {
                    'Big Red': 'font-size: 20px; color: red;',
                    'Small Blue': 'font-size: 14px; color: blue;'
                },

                paragraphStyles: {
                    class1: 'text-danger',
                    class2: 'text-info'
                },
                //  toolbarInline: true,
                //  fullPage:true,
                htmlRemoveTags: [],
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
    }
    function initTrumbo() {
        // $('.note-editable').removeClass('.note-editable').trumbowyg({
        //     autogrow: true,
        //     sematic: true,
        //     svgPath: '/data/fonts/icons.svg',
        //     btnsDef: {
        //         image: {
        //             dropdown: ['upload'],
        //             ico: 'insertImage'
        //         }
        //     },
        //     btns: [
        //['viewHTML'],
        //['undo', 'redo'],
        //['foreColor', 'backColor'],
        //['formatting'],
        //'btnGrp-design',
        //['link'],
        //['image'],
        //'btnGrp-justify',
        //'btnGrp-lists',
        //['foreColor', 'backColor'],
        //['preformatted'],
        //['horizontalRule'],
        //['fullscreen']
        //     ],
        //     plugins: {
        //         upload: {
        //             serverPath: '/pub/upload'
        //         }
        //     }
        // }).on('tbwinit', function () {
        //     $('.trumbowyg-editor').addClass('ignore');
        // })
    }
    //#endregion
    function InitEdit() {
        if (!$.FE || !$.FE.length) {
            addScript("/data/editor.js", initEditor);
        }
    }


    // #region Lazy Load
    var tempSVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {{w}} {{h}}'/>"; // Simplest possible SVG

    var iconSVG = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 {{w}} {{h}}'><defs><symbol id='a' viewBox='0 0 90 66' opacity='0.3'><path d='M85 5v56H5V5h80m5-5H0v66h90V0z'/><circle cx='18' cy='20' r='6'/><path d='M56 14L37 39l-8-6-17 23h67z'/></symbol></defs><use xlink:href='#a' width='20%' x='40%'/></svg>"; // Basic 'picture' icon

    function initTimeAgo() {
        $('.timeago').removeClass('timeago').timeago();
    }

    function initSlide() {
        var slider = document.getElementById('boxgallery');
        if (slider) {
            if (classie.has(slider, "init")) {
                classie.remove(slider, "init");
                new BoxesFx(slider, { autoplay: true });
            }

        }
    }

    function initChosen() {

        $(".chosen.init").each(function (i, item) {
            var $this = $(item);
            $this.removeClass("init").chosen({
                no_results_text: "Không tìm thấy , nhấn Enter để thêm mới ",
                max_selected_options: $this.attr('count') ? $(this).attr('count') : "Infinity"
            });
        })
        $(".chosen-deselect").chosen({ allow_single_deselect: true });
    }

    function initImage_Replacement() {
        $('.image-replacement').each(function () {
            var $this = $(this);
            classie.remove($this[0], 'image-replacement');
            var data = $this.data(); // Get all the data attributes
            var $img = $('<img />').attr({

                "class": "image-upload " + data.class,
                "title": "Click vào ảnh để Upload"
            });
            if (data.auto) {
                if (data.src) {
                    $img.attr({
                        src: data.src
                    })
                } else {
                    $img.attr({
                        src: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(iconSVG.replace(/{{w}}/g, 300).replace(/{{h}}/g, 150)),
                    })
                }
            } else {
                $img.attr({
                    src: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(iconSVG.replace(/{{w}}/g, 300).replace(/{{h}}/g, 150)),
                })
                    .on('mouseover touchmove click', function () {
                        $img.off('mouseover touchmove click');
                        if (data.src && data.src.length) {
                            $img.attr({ src: data.src });
                        }
                    });
            }
            $img.appendTo($this);
            if (data.upload) {
                $img.attr('id', 'upload');
                //$('body').on("click", '#upload', function () {

                //    if (!$('#avaup').length) {
                //        $('body').prepend("<input type='file' id='avaup' class='input-file hide'/>");

                //    }
                //    var input = $('#avaup');
                //    $('body').on('change', '#avaup', function () {
                //        var formData = new FormData();
                //        formData.append("file", $('#avaup')[0].files[0]);
                //        var id = Notify.Show();
                //        $.ajax({
                //            url: "/FileApi/UploadImage",
                //            type: 'POST',
                //            data: formData,
                //            processData: false, // tell jQuery not to process the data
                //            contentType: false, // tell jQuery not to set contentType
                //            success: function (data) {
                //                input.remove();
                //                Notify.Destroy(id);
                //                UpLoadAviary.init("upload", data.link)
                //            },
                //            error: function (e) {
                //                Notify.Error({ Message: e }, id);
                //                input.remove();
                //            }
                //        })

                //    });
                //    input.trigger('click');

                //});
                TD.initUpload(null, data.width, data.height, "#ImageData");
            }
        });
    }

    var LazyLoad = function () {

        function loadData(item) {
            var $item = $(item);
            classie.remove(item, "lazy");
            var loader = document.createElement("div");
            loader.classList = "loader";
            item.appendChild(loader);
            var dataget = item.getAttribute("data-get");
            if (dataget && dataget.length) {
                $.get(dataget, function (data) {
                    var div = document.createElement("div");
                    var par = item.parentNode;
                    par.replaceChild(div, item);
                    var id = item.id;
                    div.outerHTML = data;
                    var isOpen = classie.has(item, "open");
                    if (id && id.length) {
                        var newDiv = document.getElementById(id);
                        if (classie.has(newDiv, "collapse")) {
                            console.log('collapse');
                            if (document.body && newDiv.parentNode !== document.body) {
                                console.log('not in body');
                                var parNew = newDiv.parentNode;
                                parNew.removeChild(newDiv);
                                document.body.appendChild(newDiv);
                            }
                            if (isOpen)
                                classie.add(newDiv, "open");
                        }
                    }
                    ajaxComplete();



                    //  if (isOpen) classie.add(item, "open");
                    if (classie.has(item, "product-load"))
                        Grid.init();
                    continueLoad();
                })
            }
            var datasrc = item.getAttribute('data-src');
            if (datasrc && datasrc.length) {
                var img = new Image();

                img.onload = function () {
                    item.src = datasrc;
                    delete item.dataset.src;
                    continueLoad();
                }
                img.src = datasrc;
            }

            var databg = item.getAttribute('data-bg');
            if (databg && databg.length) {
                var imgbg = new Image();
                imgbg.onload = function () {
                    $(item).css({ 'background-image': databg }).removeAttr('data-bg');
                    continueLoad();
                }
                imgbg.src = databg;
            }
        }

        function continueLoad() {
            lazyLoading();
        }

        function lazyLoading() {
            var requiredElement = document.querySelector('.lazy'); // $(elements[0]);
            if (requiredElement) {
                loadData(requiredElement);
            }

        }
        return {
            init: lazyLoading

        }
    }();

    // #endregion

    // #region Validate

    var FormValidate = function () {
        // var // feedback_success = "form-control-success",
        //feedback_error = "form-control-danger";
        var success_class = "has-success";
        var error_class = "has-danger";

        function reload() {
            location.reload();
        }

        function getParent(element) {
            return $(element).closest('div');
        }
        var customs = [];

        function addCustom(name, customfunction) {
            if (name && customfunction) {
                var customObject = {
                    name: name,
                    func: customfunction
                };
                customs.push(customObject);
            }
        }
        return {
            addCustom: addCustom,
            init: function () {
                $.validator.setDefaults({
                    highlight: function (element) {
                        var parrent = element.parentNode;
                        classie.remove(parrent, success_class);
                        classie.add(parrent, error_class);
                    },
                    unhighlight: function (element) {
                        var parrent = element.parentNode;
                        classie.add(parrent, success_class);
                        classie.remove(parrent, error_class);
                    },
                    ignore: ".ignore",
                    errorElement: 'span',
                    errorPlacement: function (error, element) {
                        $(element).closest('div').prepend(error);
                    },
                    debug: true,
                });
                $('body').on('click', '.form .submit', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var form = $(this).closest('form.form');
                    if (form.length)
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
                                    }
                                    else {
                                        var name = form.attr('id');
                                        for (var i = 0, l = customs.length; i < l; i++) {
                                            if (customs[i].name === name) {
                                                customs[i].func(data, message);
                                            }
                                        }
                                    }
                                })
                                .error(function (data) {
                                    Notify.Error(data, message);
                                })
                        }
                });
                $('body').on('click', '.form .delete', function (e) {
                    var buttonDelete = $(this);
                    e.preventDefault();
                    e.stopPropagation();
                    var form = $(this).closest('form.form');
                    if (form.length) {
                        var buttonCancel = $('<a/>').addClass('cancel btn btn-success').html('Hủy');
                        buttonCancel.click(function () {
                            buttonCancel.remove();
                            buttonDelete.html("<i class='fa fa-cross'>Xóa</i>");
                            buttonDelete.off('click').addClass('delete');
                        });
                        buttonDelete[0].innerHTML = "Bạn xác nhận muốn xóa ?";
                        buttonDelete.on('click', (function () {
                            var message = Notify.Show();
                            $.post(buttonDelete.data('src'), form.serialize())
                                .done(function (data) {
                                    Notify.Complete(data, message);
                                });
                        })).removeClass('delete').parent().append(buttonCancel);

                    }
                });
                var keydown_or_change = function (ele) {

                    if (ele && !classie.has(ele, "ignore"))
                        $(ele).valid();
                }
                $('body').on('focus', ".form input", function () { $('span.error').hide(); });
                $('body').on('change keydown', '.form input', _.debounce(function () { keydown_or_change(this) }, 200));
                $('body').on('click', '.form .error', function () {
                    $(this).parent().find('input').focus();
                    $('span.error').hide();
                })
            }
        }
    }();

    // #endregion

    // #region Contact
    var Contact = function () {
        return {
            init: function () {
                FormValidate.addCustom("contact-form", function (data, message) {
                    if (!data.length) {
                        Notify.Complete({ Message: "Không có dữ liệu", Time: 3 }, message);
                    }
                    else {
                        var form = $('#contact-form');
                        if (data === "True") {
                            $('#contact-form')[0].reset();
                            $('#contact-form .trumbowyg-editor.ignore').html("");
                            $('#contact-form').removeClass('open');
                            form.fadeOut(1000, function () {
                                $(this).delay(5000).fadeIn();
                            })
                            Notify.Complete({ Message: "Tin nhắn của bạn đã được gửi cho chúng tôi, chúng tôi sẽ liên hệ với bạn sớm nhất có thể , xin cảm ơn", Time: 3 }, message);
                        } else {
                            Notify.Error("Có lỗi xảy ra", message);
                        }
                    }
                });
                FormValidate.addCustom('comment-form', function (kn, message) {
                    if (!data.length) {
                        Notify.Complete({ Message: "Không có dữ liệu", Time: 3 }, message);
                    }
                    else {
                        var form = $('#comment-form');
                        if (kn.DataType === "success") {
                            $('#comment-form')[0].reset();
                            $('#comment-form .trumbowyg-editor.ignore').html("");
                            form.fadeOut(1000, function () {
                                $(this).delay(5000).fadeIn();
                            })
                            Notify.Complete({ Message: kn.Message, Time: 3 }, message);
                        } else {
                            Notify.Error(kn.Message, message);
                        }
                    }
                });
            }
        }
    }();


    // #endregion

    // #region GoogleMap

    var GoogleMap = function () {
        var isInit = false;

        function init() {
            if (document.getElementById("google-container") && !isInit) {
                isInit = true;
                loadMapsAPI();
            }
        }

        function initMap() {
            var $latitude = 18.6936107,
                $longitude = 105.6790277,
                $map_zoom = 16;

            //google map custom marker icon - .png fallback for IE11
            var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
            var $marker_url = (is_internetExplorer11) ? '/data/img/map-location.png' : '/data/img/map-location.svg';

            //define the basic color of your map, plus a value for saturation and brightness
            var $main_color = '#2d313f',
                $saturation = -20,
                $brightness = 5;

            //we define here the style of the map
            var style = [{
                //set saturation for the labels on the map
                elementType: "labels",
                stylers: [
                    { saturation: $saturation }
                ]
            },
                { //poi stands for point of interest - don't show these lables on the map
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    //don't show highways lables on the map
                    featureType: 'road.highway',
                    elementType: 'labels',
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    //don't show local road lables on the map
                    featureType: "road.local",
                    elementType: "labels.icon",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    //don't show arterial road lables on the map
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    //don't show road lables on the map
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                //style different elements on the map
                {
                    featureType: "transit",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]
                },
                {
                    featureType: "poi",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]
                },
                {
                    featureType: "poi.government",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]
                },
                {
                    featureType: "poi.sport_complex",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]
                },
                {
                    featureType: "poi.attraction",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]
                },
                {
                    featureType: "poi.business",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]
                },
                {
                    featureType: "transit",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]
                },
                {
                    featureType: "transit.station",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]
                },
                {
                    featureType: "landscape",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]

                },
                {
                    featureType: "road",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]
                },
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [
                        { hue: $main_color },
                        { visibility: "on" },
                        { lightness: $brightness },
                        { saturation: $saturation }
                    ]
                }
            ];

            //set google map options
            var map_options = {
                center: new google.maps.LatLng($latitude, $longitude),
                zoom: $map_zoom,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style,
            }
            //inizialize the map
            var map = new google.maps.Map(document.getElementById('google-container'), map_options);
            //add a custom marker to the map
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng($latitude, $longitude),
                map: map,
                visible: true,
                icon: $marker_url,
            });

            //add custom buttons for the zoom-in/zoom-out on the map
            function CustomZoomControl(controlDiv, map) {
                //grap the zoom elements from the DOM and insert them in the map
                var controlUIzoomIn = document.getElementById('cd-zoom-in'),
                    controlUIzoomOut = document.getElementById('cd-zoom-out');
                controlDiv.appendChild(controlUIzoomIn);
                controlDiv.appendChild(controlUIzoomOut);

                // Setup the click event listeners and zoom-in or out according to the clicked element
                google.maps.event.addDomListener(controlUIzoomIn, 'click', function () {
                    map.setZoom(map.getZoom() + 1)
                });
                google.maps.event.addDomListener(controlUIzoomOut, 'click', function () {
                    map.setZoom(map.getZoom() - 1)
                });
            }

            var zoomControlDiv = document.createElement('div');
            var zoomControl = new CustomZoomControl(zoomControlDiv, map);

            //insert the zoom div on the top left of the map
            map.controls[google.maps.ControlPosition.LEFT_CENTER].push(zoomControlDiv);
        }
        // 18.6937813,105.6794076,19z

        window.mapsApiReady = function () {
            initMap();
        }

        function loadMapsAPI() {
            addScript('http://maps.google.com/maps/api/js?libraries=places&key=AIzaSyBrBw9g211KtgGxDdwJM-uyAD1zaJumAyo&callback=mapsApiReady');
        }
        return {
            init: init
        }
    }();

    // #endregion

    var AdminForm = function () {
        return {
            init: function () {
                $('body').on('click', ".fullscreen", function () {
                    var table = $(this).closest('.table');
                    table.toggleClass('full-screen');
                })
            }
        }
    }();

    // #region SearchAll

    var SearchAll = function () {
        return {
            init: function () {
                FormValidate.addCustom("search-form", function (data, message) {
                    if (!data.length) {
                        Notify.Complete({ Message: "Không có dữ liệu", Time: 3 }, message);
                    } else {
                        Notify.Destroy(message);
                        var form = $('#search-form');
                        var container = form.find('.search-data');

                        if (!container.length) {
                            container = $('<div/>').addClass('search-data');
                            form.append(container);
                        }
                        var list = $.parseJSON(data);
                        for (var item in list) {
                            container.append($("<a/>").addClass("search-item")
                                .append($("<img/>").addClass("search-image").attr('src', list[item].Image))
                                .append($("<p/>").addClass("search-name").html(list[item].Name))
                                .attr("href", list[item].Link));
                        }
                    }
                })
            }
        };
    }();

    // #endregion

    // #region GridProduct

    var Grid = function () {
        'use strict';
        var sliders,
            // array where the flickity instances are going to be stored
            flkties = [],
            // grid element
            grid,
            // isotope instance
            iso,
            // filter ctrls
            filterCtrls,
            // cart
            cart,
            cartItems;

        function init() {
            // preload images

            grid = document.querySelector('.grid');


            if (grid) {
                cart = document.querySelector('.cart');
                if (cart)
                    cartItems = cart.querySelector('.cart__count');
                imagesLoaded(grid, function () {

                    initFlickity();
                    initIsotope();
                    initEvents();
                    classie.remove(grid, 'grid--loading');
                });
            }
        }

        function init2() {
            grid = document.getElementById('product-info');
            if (grid)
                imagesLoaded(grid, function () {

                    initFlickity();
                    //initIsotope();
                    //initEvents();
                    //classie.remove(grid, 'grid--loading');
                });
        }

        function initFlickity() {
            sliders = [].slice.call(document.querySelectorAll('.slider'));
            if (sliders) {
                sliders.forEach(function (slider) {
                    var flkty = new Flickity(slider, {
                        prevNextButtons: false,
                        wrapAround: true,
                        cellAlign: 'left',
                        contain: true,
                        resize: false,
                        lazyLoad: true
                    });

                    // store flickity instances
                    flkties.push(flkty);
                });
            }

        }

        function initIsotope() {
            iso = new Isotope(grid, {
                isResizeBound: false,
                itemSelector: '.grid__item',
                percentPosition: true,
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: '.grid__sizer'
                },
                transitionDuration: '0.6s'
            });
        }

        function initEvents() {
            filterCtrls = [].slice.call(document.querySelectorAll('.filter > button'));
            if (filterCtrls) {
                filterCtrls.forEach(function (filterCtrl) {
                    filterCtrl.addEventListener('click', function () {
                        classie.remove(filterCtrl.parentNode.querySelector('.filter__item--selected'), 'filter__item--selected');
                        classie.add(filterCtrl, 'filter__item--selected');
                        iso.arrange({
                            filter: filterCtrl.getAttribute('data-filter')
                        });
                        recalcFlickities();
                        iso.layout();
                    });
                });
            }


            // window resize / recalculate sizes for both flickity and isotope/masonry layouts
            window.addEventListener('resize', _.throttle(function (ev) {
                recalcFlickities();
                iso.layout();
            }, 200));

            // add to cart
            [].slice.call(grid.querySelectorAll('.grid__item')).forEach(function (item) {
                var button =
                    item.querySelector('.action--buy');
                if (button) button.addEventListener('click', addToCart);
            });
        }

        function addToCart() {
            classie.add(cart, 'cart--animate');
            setTimeout(function () { cartItems.innerHTML = Number(cartItems.innerHTML) + 1; }, 200);
            onEndAnimation(cartItems, function () {
                classie.remove(cart, 'cart--animate');
            });
        }

        function recalcFlickities() {
            for (var i = 0, len = flkties.length; i < len; ++i) {
                flkties[i].resize();
            }
        }

        return {
            init: init,
            init2: init2
        };


    }();


    // #endregion
    //var UpLoadAviary = function () {
    //    var feather;
    //    //"undefined" == typeof Aviary ? addScript("https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js", initIviary) : initIviary();

    //    function initIviary() {
    //        feather = new Aviary.Feather({
    //            apiKey: "66b921965e474512871d025ada1c040d",
    //            onSave: function (c, d) {
    //                if (window.customInit) {
    //                    console.log('app save');
    //                    var saveImaeg = new Image;
    //                    saveImaeg.crossOrigin = "Anonymous";
    //                    saveImaeg.onload = function () {
    //                        var canvas = document.createElement("CANVAS"),
    //                            context = canvas.getContext("2d");
    //                        canvas.height = this.height, canvas.width = this.width, context.drawImage(this, 0, 0);
    //                        var fullData = canvas.toDataURL("image/png");
    //                        $('#ImageData').val(fullData.split(',')[1]);
    //                        var old = $('#upload').attr('src');

    //                        $.post('/FileApi/DeleteImage', { src: old }).done(function (data) {

    //                        }).error(function (e) {
    //                            debugger;
    //                        })
    //                        $("#upload").attr('src', d);
    //                        feather.close(); 
    //                    };
    //                    feather.showWaitIndicator();
    //                    saveImaeg.src = d; 
    //                    return false;
    //                }
    //                else {

    //                    if (editor.shared.feather_editor.instance) {
    //                        var saveImaeg = new Image;
    //                        saveImaeg.crossOrigin = "Anonymous", saveImaeg.onload = function () {
    //                            var canvas = document.createElement("CANVAS"),
    //                                context = canvas.getContext("2d");
    //                            canvas.height = this.height, canvas.width = this.width, context.drawImage(this, 0, 0);
    //                            for (var e = canvas.toDataURL("image/png"),
    //                                    f = atob(e.split(",")[1]),
    //                                    g = [], h = 0; h < f.length; h++) g.push(f.charCodeAt(h));
    //                            var imageIviary = new Blob([new Uint8Array(g)], { type: "image/png" });
    //                            editor.shared.feather_editor.instance.image.edit($(editor.shared.feather_editor.current_image)),
    //                                editor.shared.feather_editor.instance.image.upload([imageIviary]),
    //                                editor.shared.feather_editor.close()
    //                        },
    //                            saveImaeg.src = d, editor.shared.feather_editor.showWaitIndicator()
    //                    }
    //                }


    //            },
    //            onError: function (a) {
    //                debugger;
    //            },
    //            onClose: function () {

    //            }
    //        })
    //    }

    //    function launchEditor(id, src, w, h) {
    //        console.log('app init');
    //        var image = new Image();
    //        image.src = src;
    //        window.customInit = true;
    //        feather.launch({
    //            image: id,
    //            url: image.src,
    //            cropPresets: [
    //                ['Photo', '4:3'],
    //                ['HDTV', '16:9'],
    //                ['Avatar', '60x50']
    //            ],
    //            initTool: 'crop',
    //            noCloseButton: true,
    //            language: "vi"
    //        });
    //        return false;
    //    }

    //    return {
    //        feather: feather,
    //        init: launchEditor
    //    }
    //}()

    // #region Upload

    var Upload = function () {
        var api, canvas, context, $modal_crop, cropx, cropy, crp, reader, file,
            data = { ContentType: '', Data: {} },
            retImage, input;

        function HideCrop() {
            api.destroy();
            crp.remove();
            $('.image-cropper').append('<img class="image_crop" src="/data/img/noavatar.png" />');
            crp = $('img.image_crop');
            $modal_crop.removeClass('open');
        }

        function DoCrop() {

            var ck = $modal_crop.find('input[type="checkbox"]');
            var dataFull;

            if (ck && ck.is(":checked")) {
                dataFull = canvas.toDataURL("image/png");
                data.ContentType = "image/png";
            } else {
                dataFull = canvas.toDataURL("image/jpeg");
                data.ContentType = "image/jpeg";
            }

            data.Data = dataFull.split(',')[1];
            var dataChecked = crp.data("ck");
            if (dataChecked && dataChecked.length) {
                var ev = new CustomEvent("imageCropped", { detail: { file: crp.data("ck"), data: data } })
                window.dispatchEvent(ev);

            } else {
                $('#upload').attr('src', dataFull);
                $('img.image_crop').attr("src", "");
                $('#ImageData').val(data.Data);
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

        function imageLoaded(evt, i, w, h) {
            crp = $modal_crop.find('img.image_crop');

            var img;
            if (i) img = i;
            else img = this;
            var selectx = img.naturalWidth,
                selecty = img.naturalHeight;
            var imageratio = selectx / selecty;
            if (w) cropx.val(w);
            if (h) cropy.val(h);
            cropx.on('change', cropXChanged);
            cropy.on('change', cropYChanged);
            var ratio = canvas.width / canvas.height;
            if (ratio < imageratio) {
                selectx = ratio * selecty;
            } else {
                selecty = selectx / ratio;
            }
            crp.attr('src', evt.target.src);
            initJcrop(ratio, selectx, selecty);

        }

        function ReaderLoaded(evt, w, h) {
            $modal_crop.addClass('open');
            var img = new Image();

            if (!w)
                img.onload = imageLoaded;
            else img.onload = function (evt) {
                imageLoaded(evt, this, w, h);
            };
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

        function initJcrop(ratio, selectx, selecty) {
            crp.Jcrop({
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
            reader = new FileReader();
            if (!w) reader.onload = ReaderLoaded;
            else {
                reader.onload = function (e) {
                    ReaderLoaded(e, w, h);
                };
            }
            if (file) reader.readAsDataURL(file);
        }

        function showCoords(c) {
            var image = crp[0];
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
        }

        function InitUploadExternal(fileInput, width, height) {

            $(fileInput).on('change', function (e) {
                if (!width) width = 100;
                if (!height) height = 100;
                cropx.val(width);
                cropy.val(height);
                canvas.height = height;
                canvas.width = width;
                $('img.image_crop').data('ck', fileInput);
                onUserSelectFile(e, width, height);
            });


        }
        function froalaUpload(files, fileInput) {
            var width = 300;
            var height = 200;
            cropx.val(width);
            cropy.val(height);
            canvas.height = height;
            canvas.width = width;
            $('img.image_crop').data('ck', fileInput);
            var file = files[0];
            reader = new FileReader();
            reader.onload = function (e) {
                ReaderLoaded(e, width, height);
            };
            reader.readAsDataURL(file);
        }

        function imageClick() {
            var fig = $(this).closest("figure");
            var w = fig.data('width');
            var h = fig.data('height');
            cropx.val(w);
            cropy.val(h);
            canvas.height = h;
            canvas.width = w;
            crp = $('img.image_crop');
            crp.data('ck', "");
            input.click();
        }

        function init() {
            addEventListener('closed-trigger', function (evt) {
                if (evt.detail.getAttribute("id") === "mdcrop") {
                    if (api !== undefined) api.destroy();
                }
            })
            if (!$('#avaup').length) {
                $('body').prepend("<input type='file' id='avaup' class='input-file hide'/>");
                input = $('#avaup');
            }
            if (!$('#mdcrop').length) {
                $('body').append(
                    "<div id='mdcrop' class='collapse form form-block jcrop-container'>\
<a class='collapse-close'><span class='line'></span></a>\
    <div class='form-title small'>\
        <input type='checkbox' class='ck' title='Nền trong suốt' />\
        <div>\
        <input type='number' class='cropx ignore' /><p>X</p>\
        <input type='number' class='cropy ignore' />\
        </div>\
        <a class='btn btn-sm docrop' title='Cắt và sử dụng ảnh'><i class='fa fa-save'></i></a>\
    </div>\
    <canvas id='preview' class='hide'></canvas>\
    <div class='image-cropper center-block'>\
        <img class='image_crop' src='/data/img/noavatar.png' />\
    </div>\
</div>");
                $modal_crop = $('#mdcrop');
                CheckBox.wrapAll();
            }

            canvas = $modal_crop.find('#preview')[0];
            context = canvas.getContext("2d");
            cropx = $modal_crop.find('.cropx');
            cropy = $modal_crop.find('.cropy');
            // btnDoCrop = $modal_crop.find('.docrop');
            $('body').on('click', '.docrop', DoCrop);
            $('#avaup').on('change', onUserSelectFile);
            $('body').on("click", '#upload', imageClick);
        }
        return {
            init: init,
            initUpload: InitUploadExternal,
            initFE: froalaUpload
        };
    }();

    // #endregion

    // #region Blog

    var Blog = function () {


        function addAdminComment(item) {
            return "<div class='table-row'>\
    <div class='table-cell'>\
        <a href='/admin/blogs/editcomment/" + item.Id + "'>" +
                item.Content +
                "</a>\
    </div>\
    <div class='table-cell'>" +
                item.Creator +
                "</div>\
    <div class='table-cell'>" +
                item.Created +
                "</div>\
    <div class='table-cell'>" +
                item.ChildCount +
                "</div>\
</div>";
        }

        function addNewComment(item) {

            return "<li class='comment parent'>\
        <div class='comment-body'>\
            <figure class='comment-author-avatar'>\
                <img src='" + item.CreatorAvatar + "' alt='@item.Creator'>\
            </figure>\
            <div class='comment-contents'>\
                <div class='comment-header clearfix'>\
                    <h4 class='comment-author'>\
                        <a href='/Account/profile/" + item.Creator + "'>  " + item.Creator + " </a>\
                    </h4>\
                    <time class='timeago' datetime='" + item.CreatedUtc + "'></time>\
                    <a href='#comment-form' class='comment-reply-link' data-id='" + item.Id + "'><i class='fa fa-comment'></i>Trả lời</a>\
                </div>\
                <div class='comment-text'>" +
                item.Content +
                "</div>" +
                (item.HasChild ? "<ul class='children wow load-comment' data-id='" + item.Id + "' data-page='1'></ul>" : "") +
                "</div>\
        </div>\
    </li>";
        }

        function addBlog(item) {
            var str = "<div class='blog-post'>\
    <article>\
        <header>\
            <div class='post-meta'>\
                <span class='fa fa-user'> " +
                item.Creator + "</span>\
                <span>\
                    đăng <time class='timeago' datetime='" +
                item.LastModifyUtc + "'></time>\
                </span>" +
                (item.CommentCount > 0 ? "<span><i class='fa fa-comment'></i> " + item.CommentCount + " người bình luận</span>" : "") +

                (item.Viewed > 0 ? "<span><i class='fa fa-eye'></i> " + item.Viewed + " lượt xem</span>" : "") +
                "</div>\
            <h1><a href='/SinglePost/" + item.ShortName + "/read'>" + item.FullName + "</a></h1>" +
                (item.Image && item.Image.length ? " <div class='post-image'><img src='" + item.Image + "' class='wow' alt='Ảnh bài viết'></div>" : "") +
                "</header>\
        <div class='post-contents'>" + item.Summary +
                "<div class='p-1 text-center'>\
                                <a href='/SinglePost/" + item.ShortName + "/read' class='btn btn-success read-more'>Chi tiết <i class='fa fa-a-right'></i></a>\
                            </div>\
        </div>\
    </article>\
</div>";

            return str;
        }

        function init() {
            // if (page === "blog")                initLoadMoreBlog();

            $('body').on('click', ".load-more-homeblog", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var page = $(this).data("page");
                var button = $(this);
                if (!page) page = 2;

                $.get('/home/HomeBlogGetMore/' + page).done(function (dataa) {
                    try {
                        var data = $.parseJSON(dataa);
                        if (data && data.length) {
                            var str = "";
                            var curPage = parseInt(page) + 1;
                            for (var item in data) {
                                str += addBlog(data[item]);
                            }
                            if (data.length === 4) {
                                str += "<div class='text-center'><a href='#' class='btn btn-info load-more-homeblog' data-page='" + curPage + "'><i class='fa fa-checkmark'></i> Xem thêm </a></div>";
                            }
                            var par = button.parent().parent();
                            button.parent().remove();
                            par.append(str);
                            $('.timeago').removeClass('timeago').timeago();
                        } else {
                            button.remove();
                        }
                    } catch (e) {
                        button.remove();
                    }

                }).error(function (e) {
                    console.log(e);
                });
            });
            $('body').on('click', "a.load-comment", function () {
                var box = $(this);
                var page = box.data('page');
                if (!page) page = 1;
                var id = box.data('id');
                $.get("/LoadMoreComment/" + id + "/" + page).done(function (dataa) {

                    var curPage = parseInt(page) + 1;
                    var str = '';
                    try {
                        var data = $.parseJSON(dataa);
                        if (!data.length) {
                            box.remove();
                            return;
                        }
                        for (var item in data) {

                            str += addNewComment(data[item]);

                        }
                        var par = box.parent().parent();
                        box.parent().remove();
                        if (data.length === 10) {
                            str += "<li class='load-comment text-center'>\
                            <a class='load-comment btn btn-info' data-page='" + curPage + "' data-id='" + id + "'> Xem thêm </a>\
</li>";
                        }
                        par.append(str);
                        $('.timeago').removeClass('timeago').timeago();
                    } catch (e) {
                        box.remove();
                    }

                }).error(function (e) {
                    console.log(e);
                })
            });
            $('body').on('click', '.comment-reply-link', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var button = $(this);
                var parentId = button.data("id");

                var hidden_ParentId = $('#comment-form #parentId');
                hidden_ParentId.val(parentId);
                var href = button.attr('href');
                $("html, body").animate({ scrollTop: $(href).offset().top }, 1000);
            });
            $('body').on('dblclick', "pre,kbd,blockquote", function () {
                var selection = getSelection();
                var range = document.createRange();
                range.selectNodeContents($(this)[0]);
                selection.removeAllRanges();
                selection.addRange(range);
            });

        }

        function infinityloadmore(box) {
            var tagatr = box.getAttribute('data-tag');
            var year = box.getAttribute("data-year");
            var month = box.getAttribute('data-month');
            var page = box.getAttribute('data-page');
            var url = '/getmoreblog';
            var tag = "all";
            if (tagatr && tagatr.length) tag = tagatr;
            url += "/" + tag;
            if (page) url += "/" + page;
            if (year) url += "/" + year;
            if (month) url += "/" + month;
            $.get(url).done(function (dataa) {
                var curPage = parseInt(page) + 1;
                var str = "";
                var data = $.parseJSON(dataa);
                for (var item in data) {
                    str += addBlog(data[item]);
                }
                if (data.length === 4) {
                    str += "<div class='text-center' data-tag='" + tag + "' data-page='" + curPage + "'" + (year && year.length ? " data-year='" + year + "'" : "") + (month && month.length ? " data-month='" + month + "'" : "") + "></div>";
                }
                $(box).html(str);
                $('.timeago').removeClass('timeago').timeago();
            }).error(function (e) {
                console.log(e);
            })
        }

        function loadcomment(box) {
            var page = box.getAttribute('data-page');
            if (!page) page = 1;
            var id = box.getAttribute('data-id');
            $.get("/loadcommentchild/" + id + "/" + page).done(function (dataa) {

                var curPage = parseInt(page) + 1;
                var str = '<ul class=\"children\">';
                var data = $.parseJSON(dataa);
                if (!data.length) {
                    $(box).remove();
                    return;
                }
                for (var item in data) {

                    str += addNewComment(data[item]);

                }
                var par = $(box).parent();
                $(box).remove();
                if (!data.length === 10) {
                    str += '<li class=\"load-comment\" data-page=\"' + curPage + '\" data-id=\"' + id + '"></li>';
                }
                str += "</ul>";
                par.append(str);
                $('.timeago').removeClass('timeago').timeago();
            }).error(function (e) {
                console.log(e);
            });
        }

        function loadadmincomment(box) {
            var page = box.getAttribute('data-page');
            if (!page) page = 1;
            var id = box.getAttribute('data-id');
            $.get("/admin/blogs/GetMoreComment/" + id + "/" + page)
                .done(function (dataa) {
                    var curPage = parseInt(page) + 1;
                    var str = '';
                    var data = $.parseJSON(dataa);
                    if (data.length === 0) {
                        $(box).remove();
                        return;
                    }
                    for (var item in data) {

                        str += addAdminComment(data[item]);

                    }
                    var par = $(box).parent();
                    $(box).remove();
                    if (data.length === 4) {
                        str += "<div class='table-row wow load-admin-comment' data-id='" + id + "' data-page='" + curPage + "'></div>";
                    }

                    par.append(str);
                    $('.timeago').removeClass('timeago').timeago();
                })
                .error(function (e) {
                    console.log(e);
                })
        }
        return {
            init: init,
            loadmore: infinityloadmore,
            loadcomment: loadcomment,
            loadadmincomment: loadadmincomment
        }
    }();

    // #endregion

    // #region Accordion

    var Accordion = function () {
        // function dropdown (e) {
        //    var $el = e.data.el;
        //   var $this = $(this),
        //	$next = $this.next();

        //    $next.slideToggle();
        //    $this.parent().toggleClass('open');

        //    if (!e.data.multiple) {
        //        $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        //    };
        //}
        function init(el, multiple) {
            $('body').on('click', ".accordion .link", function () {
                var $next = $(this).next();
                $next.slideToggle();
                $(this).parent().toggleClass('open');
                $(this).closest('.accordion').find('.submenu').not($next).slideUp().parent().removeClass('open');
            })
            //this.el = el || {};
            //this.multiple = multiple || false;

            //// Variables privadas
            //var links = this.el.find('.link');
            //// Evento
            //links.on('click', { el: this.el, multiple: this.multiple }, dropdown)
        }
        return {
            init: init
        }
    }();

    function OnTabLinkClick(evt) {
        evt.preventDefault();
        var target = $(this.getAttribute('href'));
        var tab_container = target.closest('.sidebar-wrap');
        $(this).closest('ul').find('.tab-link').removeClass('active');
        tab_container.find('.tab-content').removeClass("active").hide();
        $(this).addClass("active");
        target.closest('.tab-content').fadeIn(600).addClass("active");
    }
    // #endregion

    function ajaxComplete() {
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
        [].slice.call(document.querySelectorAll(".tab-link-init")).forEach(function (tab) {
            classie.remove(tab, "tab-link-init");
            classie.add(tab, "tab-link");
            tab.addEventListener('click', OnTabLinkClick);
        })

        InitEdit();
        CheckBox.wrapAll();
        GoogleMap.init();
        initTimeAgo();
        initSlide();
        initChosen();
        initImage_Replacement();

        initCarosel();
    }
    function initCarosel() {
        var $carousel = $('.carousel.lazy-completed').removeClass("lazy-completed").flickity({
            bgLazyLoad: true,
            autoPlay: true,
            wrapAround: true,
            draggable: false
        });
    }



    function init() {
        cookieBar();
        Upload.init();
        Collapse.init();
        initMenu();
        LazyLoad.init();
        ScrollAutoHide.init();
        InitEdit();

        FormValidate.init();
        CheckBox.init();
        SearchAll.init();
        Blog.init();
        AdminForm.init();
        Grid.init2();
        Contact.init();
        Accordion.init();
        $('body').on('click', '.load-click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var button = $(this);
            var targetLink = button.data('target');
            var target = $('#' + targetLink);
            var panelLoad = $(button.attr('href'));
            panelLoad.find('.in').removeClass("in");
            if (!target || !target.length) {
                var url = button.data('load');
                var param = button.data('param');
                if (param) url += "/" + param;
                var id = Notify.Show();
                $.get(url).done(function (data) {
                    var str = "<div class='in' id='" + targetLink + "'>" + data + "</div>";
                    panelLoad.append(str);
                    ajaxComplete();
                    Notify.Destroy(id);
                }).error(function (e) {
                    Notify.Error({ Message: e }, id);
                });
            } else {
                target.addClass("in");
            }

        })
        $('body').on('click', '.load-on-click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var button = $(this);
            var url = button.data("src");
            var parent = button.parent();
            var id = Notify.Show();
            $.get(url).done(function (data) {
                var par = parent.parent();
                parent.remove();
                par.append(data);
                Notify.Destroy(id);
                ajaxComplete();
            }).error(function (e) {
                Notify.Error({ Message: e }, id);
            });
        })
        //$('body').on('click', '.check-box', function (evt) {
        //    evt.preventDefault;
        //    evt.stopPropagation();
        //    $(this).find(':checkbox').toggleCheckbox();
        //    $(this).toggleClass('checkedBox');
        //});
        var wow = new WOW({
            //boxClass: 'wow',      // default
            //animateClass: 'animated', // default
            //offset: 0,          // default
            //mobile: true,       // default
            //live: true,        // default
            callback: function (box) {
                if (classie.has(box, 'load-more')) {
                    Blog.loadmore(box);
                } else if (classie.has(box, 'load-comment')) {
                    Blog.loadcomment(box);
                } else if (classie.has(box, 'load-admin-comment')) {
                    Blog.loadadmincomment(box);
                }

            },
        });

        wow.init();
        //$('body').on('blur', '.number', function () {
        //    $(this).val(parseFloat($(this).val().replace(/,/g, ""))
        //            .toFixed(2)
        //            .toString()
        //            .replace(/\B(?=(\d{3})+(?!\d))/g, ","))

        //})
    }

    window.TD = Upload;
    window.Notify = Notify;
    init();
});