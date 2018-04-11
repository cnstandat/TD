/// <reference path="jquery.timeago.js" />
/// <reference path="underscore.js" />
/// <reference path="js-cookies.js" />
/*eslint eqeqeq: "error"*/
$(function () {
    function consoleConfig() {
        var method;
        var noop = function () { };
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});
        while (length--) {
            method = methods[length];
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }
    var rAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        // IE Fallback, you can even fallback to onscroll
        function (callback) { window.setTimeout(callback, 1000 / 60) };
    var scrollTime = 500;
    var _initClass = 'inited';
    var lastScrollTop = 0;
    var hasScrolled = false;
    var windowHeight = 0;
    var windowWidth = 0;
    var GoogleMenu;
    var iconSVG = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 {{w}} {{h}}'><defs><symbol id='a' viewBox='0 0 90 66' opacity='0.3'><path d='M85 5v56H5V5h80m5-5H0v66h90V0z'/><circle cx='18' cy='20' r='6'/><path d='M56 14L37 39l-8-6-17 23h67z'/></symbol></defs><use xlink:href='#a' width='20%' x='40%'/></svg>"; // Basic 'picture' icon
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

    // #region MakeGlobalId
    function mobilecheck() {
        var check = false;
        (function (a) { if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

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

    function closest(el, selector) {
        var matchesFn;
        ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        })

        var parent;
        // traverse parents
        while (el) {
            parent = el.parentElement;
            if (parent && parent[matchesFn](selector)) {
                return parent;
            }
            el = parent;
        }

        return null;
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

    // #endregion

    // #region CheckBox
    var checkbox_inited = 'check-box';
    var checkbox_not_init = 'ck'

    function toggleCheckBox(e) {
        var div = $(this);
        var check = div.find('input');
        check.attr('checked', !check.attr('checked'));
        check.attr('value', check.attr('value') == 'true' ? 'false' : 'true');
        toggle(this, 'checkedBox');
    }

    function wrapCheckBox(item) {
        var el = $(item);
        addClass(item, checkbox_inited);
        var title = item.title;
        el.wrap('<div class ="check-wrap"><div class="' + checkbox_inited + '"' + (title ? ' title="' + title + ' "' : '') + '><i></i></div><p>' + (title ? title : ' ') + '</p></div>');
        var par = el.closest('div');
        if (el.attr('value') == 'true') {
            add(par[0], 'checkedBox');
            // el.closest('div').addClass('checkedBox');
        }
        if (!has(item, 'readonly'))
            par[0].addEventListener('click', toggleCheckBox);
        // el.closest('div').on('click', toggleCheckBox);
    }

    function WrapCheckBoxs() {
        [].slice.call(document.querySelectorAll('.' + checkbox_not_init)).forEach(function (el) {
            remove(el, checkbox_not_init);
            wrapCheckBox(el);

        });
    }
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
                } else $(notity).fadeOut(100, function () {
                    $(this).remove();
                });
            }
        }

        function show(data) {
            if (!container) {
                container = document.createElement("div");
                container.id = "notify-container";
                container.className = "notify-container";
                document.body.appendChild(container);
                //container = document.getElementById('notify-container');
            }
            var notify = document.createElement('div');
            notify.className = "notify";
            var id = makeid();
            notify.id = id;
            var progressValue = document.createElement('div');
            add(progressValue, "notify-progress");
            notify.appendChild(progressValue);
            container.insertBefore(notify, container.firstChild);
            notify.addEventListener('click', function (ev) {
                onclose(id);
            })
            return id;
        }

        function complete(data, id) {
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
            } else if (data.RedirectUrl) {
                notify.setAttribute('data-url', data.RedirectUrl);
            }
            var time = 3000;
            if (data.Time) time = data.Time * 1000;
            notify.appendChild(message);
            message.style.opacity = 1;
            if (data.Component) {
                if (!data.Param) {
                    var target = $('#' + data.Component);
                    if (target.length) {
                        var url = target.data('src');

                        if (url && url.length) {
                            $.get(url).done(function (d) {
                                target.replaceWith(d);
                                ajaxComplete();
                            });
                        } else {
                            target.remove();
                            $('[data-target="' + data.Component + '"]').trigger('click');
                        }
                    }

                } else {
                    $('#' + data.Component).remove();
                    $('[data-target="' + data.Component + '"]').data('param', data.Param).trigger('click');
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
            message.innerHTML = data;
            add(notify, "danger");
            notify.appendChild(message);
            if (data.Time) {
                setTimeout(function () {
                    onclose(id);
                }, data.Time);
            }

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
            r: remove
        }
    }();

    // #endregion

    // #region Collapse
    var Collapse = function () {
        function toggerLoad(trigger) {
            debugger;
            var url = $(trigger).data('src');
            var hash = trigger.hash;
            remove(trigger, 'togger-lazy');
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
                                //rAF(function () {
                                //    add(target[0], 'open');
                                //    $('body').addClass('modal-open');
                                //})

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
                if (has(trigger, 'togger-lazy')) {
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
                        } else remove(target, "open");
                    }
                }

            }

        }

        function onButtonCloseClick(evt) {
            var target = this.parentNode;
            remove(target, "open");
            $(div).find('.collapse-close').removeClass('open');
            var ev = new CustomEvent("closed-trigger", { detail: this.parentNode });
            window.dispatchEvent(ev);
        }

        function handlerClosed() {
            var find = document.querySelector('.collapse.open');
            if (!find && has(document.body, "modal-open")) {
                remove(document.body, "modal-open");
            }
        }

        function handlerOpened(e) {
            var div = e.detail;
            if (div) {
                $(div).find('.collapse-close').addClass('open');
                if (has(div, "scrollspy")) {
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
            $('body').on('click', '.togger', onTogglerButtonClick);
            $('body').on('click', '.collapse-close', onButtonCloseClick);
            addEventListener('closed-trigger', handlerClosed);
            addEventListener('open-trigger', handlerOpened);
        }
        return {
            init: init,

        }
    }();
    // #endregion

    // #region Menu Manager
    function _onScroll() {
        if (!hasScrolled) {
            rAF(scrollHandler);
        }
        hasScrolled = true;
        rAF(_onScroll);
    }

    function scrollHandler() {
        var st = window.scrollY;
        if (st > lastScrollTop) { //down
            if (st >= windowHeight) {
                if (requiredHideLoader && GoogleMenu && !has(GoogleMenu.el, 'active')) {
                    // add(GoogleMenu.el, 'active');
                    $(GoogleMenu.el).hide().addClass('active').slideDown();
                }
            }
        } else {
            if (requiredHideLoader && st == 0 && GoogleMenu) {
                if (GoogleMenu.isMenuOpen) {
                    GoogleMenu._closeMenu();
                    GoogleMenu._closeIconMenu();
                }
                remove(GoogleMenu.el, 'active');
            }
        }

        lastScrollTop = st;
        hasScrolled = false;
        //return false;
    }

    function _resizeHandler() {
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
    }

    function ResizeHandler() {
        window.addEventListener('resize', _.debounce(_resizeHandler, 100));
    }
    // #endregion

    // #region AddScripts

    function addScript(url, callback) {
        var script = document.createElement('script');
        script.onload = callback;
        script.type = 'text/javascript';
        script.defer = "defer";
        script.innerText = "";
        script.src = url;
        document.getElementsByTagBlogName("head")[0].appendChild(script);
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
                                } else {
                                    Notify.Error({ Message: "Có lỗi khi up ảnh" }, notify);
                                }

                            } catch (e) {
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
                AppFileURL: '/FileApi/UploadImage',
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
    //#endregion
    function InitEdit() {

        if (!$.FE || !$.FE.length) {
            addScript("/data/editor.min.js", initEditor);
        } else {
            initEditor();
        }
    }
    // #region Lazy Load

    function initTimeAgo() {
        $('.timeago').removeClass('timeago').timeago();
    }

    function initChosen() {
        $(".chosen").each(function (_, item) {
            remove(item, 'chosen');
            var count = item.getAttribute('count');
            $(item).chosen({
                no_results_text: "Không tìm thấy , nhấn Enter để thêm mới ",
                max_selected_options: count ? count : "Infinity",
                allow_single_deselect: true

            });
        })
    }

    function initImage_Replacement() {
        //[].slice.call(document.querySelectorAll('.image-repacement')).forEach(function(item){
        $('.image-replacement').each(function (_, item) {
            remove(item, 'image-replacement');
            item.innerHTML = '<img src="' + "data:image/svg+xml;charset=utf-8," + encodeURIComponent(iconSVG.replace(/{{w}}/g, 300).replace(/{{h}}/g, 150)) + '" class="image-upload auto-height" />';
            var img = item.querySelector('img');
            if (item.getAttribute('data-upload')) {
                img.id = "upload";
                img.title = "Click vào ảnh để upload";
            }
            var className = item.getAttribute('data-class');
            if (className && className.length) add(img, className);
            var src = item.getAttribute('data-src');
            if (src && src.length) {
                var par = $(item).closest('figure');
                var loadImage = new Image();
                loadImage.onload = function () {
                    img.src = loadImage.src;
                    if (par.length) {
                        if (loadImage.naturalWidth > 150) {
                            $(img).css({ height: 150 });
                        }
                    }
                }
                loadImage.onerror = function () {
                    return false;
                }
                loadImage.src = src;
            }
            else {
                $(img).css({ height: 150 });
            }
        })
    }



    function loadData(item) {
        var $item = $(item);
        remove(item, 'lazy');
        //(item.append("<div class='preloader-pulse' id='preloader'>\
        //    <div class='pulse-center'></div>\
        //    <div class='pulse-explosion'></div>\
        //</div>"));
        var dataget = item.getAttribute("data-get");
        if (dataget && dataget.length) {
            $.get(dataget, function (data) {
                var id = item.id;
                var isOpen = $item.hasClass("open");
                ($item.replaceWith(data));
                if (id && id.length) {
                    var newitem = document.getElementById(id);
                    if (has(newitem, "collapse")) {
                        if (document.body && newitem.parentNode !== document.body) {
                            newitem.remove();
                            document.body.appendChild(newitem);
                        }
                        //if ($('body').length && $item.parent() !== $('body')) {
                        //    $item.detach().appendTo($('body'));
                        //}
                        if (isOpen) {
                            add(document.body, 'modal-open');
                            add(newitem, 'open');
                            //$item.addClass('open');

                        }
                    }
                }
                ajaxComplete();
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
        var requiredElement = document.querySelector('.lazy.imp'); // $(elements[0]);
        if (requiredElement) {
            loadData(requiredElement);
        }
        else {
            requiredElement = document.querySelector('.lazy'); // $(elements[0]);
            if (requiredElement) {
                loadData(requiredElement);
            }
        }
    }

    // #endregion

    // #region Validate
    var CustomFormValidate = [];

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
        if (ele && !has(ele, "ignore"))
            $(ele).valid();
    }

    function FormValidate() {

        $.validator.setDefaults({
            highlight: function (element) {
                $(element).closest('div').removeClass("has-success").addClass("has-danger");
            },
            unhighlight: function (element) {
                $(element).closest('div').addClass("has-success").removeClass("has-danger");
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
                            } else {
                                var name = form.attr('id');
                                for (var i = 0, l = CustomFormValidate.length; i < l; i++) {
                                    if (CustomFormValidate[i].name === name) {
                                        CustomFormValidate[i].func(data, message);
                                    }
                                }
                            }
                        })

                    //.error(function (data) {
                    //    Notify.Error({ Message: data }, message);
                    //})
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
                    buttonDelete.html("<i class='fa fa-cross'></i> Xóa");
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

        $('body').on('focus', ".form input", function () { $('span.error').hide(); });
        $('body').on('change keydown', '.form  input', _.debounce(function () { keydown_or_change(this) }, 500));
        $('body').on('click', '.form .error', function () {
            $(this).parent().find('input').focus();
            $('span.error').hide();
        })

    }

    // #endregion

    // #region Contact
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
                    Notify.Error("Có lỗi xảy ra", message);
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
                    Notify.Error(kn.Message, message);
                }
            }
        });
    };


    // #endregion

    // #region GoogleMap
    var isInitMap = false;
    var GoogleMap = function () {
        // 18.6937813,105.6794076,19z
        function init() {
            if (document.getElementById("google-container") && !isInitMap) {
                isInitMap = true;
                loadMapsAPI();
            }
        }

        function initMap() {
            var $latitude = 18.6936107,
                $longitude = 105.6790277,
                $map_zoom = 16;
            var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
            var $marker_url = (is_internetExplorer11) ? '/data/site_svg/map-location.png' : '/data/site_svg/map-location.svg';
            var $main_color = '#2d313f',
                $saturation = -20,
                $brightness = 5;
            var style = [{
                elementType: "labels",
                stylers: [
                    { saturation: $saturation }
                ]
            },
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels',
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "road.local",
                    elementType: "labels.icon",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [
                        { visibility: "off" }
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
            var map = new google.maps.Map(document.getElementById('google-container'), map_options);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng($latitude, $longitude),
                map: map,
                visible: true,
                icon: $marker_url,
            });

            function CustomZoomControl(controlDiv, map) {
                var controlUIzoomIn = document.getElementById('cd-zoom-in'),
                    controlUIzoomOut = document.getElementById('cd-zoom-out');
                controlDiv.appendChild(controlUIzoomIn);
                controlDiv.appendChild(controlUIzoomOut);
                google.maps.event.addDomListener(controlUIzoomIn, 'click', function () {
                    map.setZoom(map.getZoom() + 1)
                });
                google.maps.event.addDomListener(controlUIzoomOut, 'click', function () {
                    map.setZoom(map.getZoom() - 1)
                });
            }
            var zoomControlDiv = document.createElement('div');
            var zoomControl = new CustomZoomControl(zoomControlDiv, map);
            map.controls[google.maps.ControlPosition.LEFT_CENTER].push(zoomControlDiv);
        }
        window.mapsApiReady = function () {
            initMap();
        }

        function loadMapsAPI() {
            addScript('//maps.google.com/maps/api/js?libraries=places&key=AIzaSyBrBw9g211KtgGxDdwJM-uyAD1zaJumAyo&callback=mapsApiReady');
        }
        return {
            init: init
        }
    }();
    // #endregion

    // #region GridProduct

    //var Grid = function () {
    //    'use strict';
    //    var sliders,
    //        // array where the flickity instances are going to be stored
    //        flkties = [],
    //        // grid element
    //        grid,
    //        // isotope instance
    //        iso,
    //        // filter ctrls
    //        filterCtrls,
    //        // cart
    //        cart,
    //        cartItems;

    //    function init() {
    //        // preload images

    //        grid = document.querySelector('.grid');


    //        if (grid) {
    //            cart = document.querySelector('.cart');
    //            if (cart)
    //                cartItems = cart.querySelector('.cart__count');
    //            imagesLoaded(grid, function () {

    //                initFlickity();
    //                initIsotope();
    //                initEvents();
    //                remove(grid, 'grid-loading');
    //            });
    //        }
    //    }

    //    function init2() {
    //        grid = document.getElementById('product-info');
    //        if (grid)
    //            imagesLoaded(grid, function () {

    //                initFlickity();
    //                //initIsotope();
    //                //initEvents();
    //                //remove(grid, 'grid-loading');
    //            });
    //    }

    //    function initFlickity() {
    //        sliders = Array.slice.call(document.querySelectorAll('.slider'));
    //        if (sliders) {
    //            sliders.forEach(function (slider) {
    //                var flkty = new Flickity(slider, {
    //                    prevNextButtons: false,
    //                    wrapAround: true,
    //                    cellAlign: 'left',
    //                    contain: true,
    //                    resize: false,
    //                    lazyLoad: true
    //                });

    //                // store flickity instances
    //                flkties.push(flkty);
    //            });
    //        }

    //    }

    //    function initIsotope() {
    //        iso = new Isotope(grid, {
    //            isResizeBound: false,
    //            itemSelector: '.grid__item',
    //            percentPosition: true,
    //            masonry: {
    //                // use outer width of grid-sizer for columnWidth
    //                columnWidth: '.grid__sizer'
    //            },
    //            transitionDuration: '0.6s'
    //        });
    //    }

    //    function initEvents() {
    //        filterCtrls = Array.slice.call(document.querySelectorAll('.filter > button'));
    //        if (filterCtrls) {
    //            filterCtrls.forEach(function (filterCtrl) {
    //                filterCtrl.addEventListener('click', function () {
    //                    remove(filterCtrl.parentNode.querySelector('.filter__item-selected'), 'filter__item-selected');
    //                    add(filterCtrl, 'filter__item-selected');
    //                    iso.arrange({
    //                        filter: filterCtrl.getAttribute('data-filter')
    //                    });
    //                    recalcFlickities();
    //                    iso.layout();
    //                });
    //            });
    //        }


    //        // window resize / recalculate sizes for both flickity and isotope/masonry layouts
    //        window.addEventListener('resize', _.throttle(function (ev) {
    //            recalcFlickities();
    //            iso.layout();
    //        }, 200));

    //        // add to cart
    //        Array.slice.call(grid.querySelectorAll('.grid__item')).forEach(function (item) {
    //            var button =
    //                item.querySelector('.action-buy');
    //            if (button) button.addEventListener('click', addToCart);
    //        });
    //    }

    //    function addToCart() {
    //        add(cart, 'cart-animate');
    //        setTimeout(function () { cartItems.innerHTML = Number(cartItems.innerHTML) + 1; }, 200);
    //        onEndAnimation(cartItems, function () {
    //            remove(cart, 'cart-animate');
    //        });
    //    }

    //    function recalcFlickities() {
    //        for (var i = 0, len = flkties.length; i < len; ++i) {
    //            flkties[i].resize();
    //        }
    //    }

    //    return {
    //        init: init,
    //        init2: init2
    //    };


    //}();


    //#endregion

    // #region Upload

    var Upload = function () {
        var api, canvas, context, $modal_crop, cropx, cropy, crp, reader, file,
            data = { ContentType: '', Data: {} },
            retImage, input;

        function HideCrop() {
            api.destroy();
            crp.remove();
            $('.image-cropper').append('<img class="image_crop" src="/data/site_svg/noavatar.png" />');
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
            $('body').addClass('modal-open');
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
                    //var ainput = document.getElementById('avaup');
                    //if (ainput) {
                    //    console.log('remove input');
                    //    ainput.parentNode.removeChild(ainput);
                    //    //ainput.remove();
                    //}
                    if (input.length)
                        input.remove();
                    //console.log('remove input' + input.length);
                    $('body').prepend("<input type='file' id='avaup' class='input-file hide'/>");
                    input = $('#avaup');
                    $('#avaup').off('change').on('change', onUserSelectFile);
                    //console.log('add input' + input.length);
                    return false;
                }
            })
            if (!$('#avaup').length) {
                $('body').prepend("<input type='file' id='avaup' class='input-file hide'/>");
                input = $('#avaup');
            }
            if (!$('#mdcrop').length) {
                $('body').append("<div id='mdcrop' class='collapse jcrop-container'><a class='collapse-close'><span class='line'></span></a><div class='form-title small'><input type='checkbox' class='ck' title='Nền trong suốt' /><div><input type='number' class='cropx ignore' /><p>X</p><input type='number' class='cropy ignore' /></div><a class='btn btn-sm docrop' title='Cắt và sử dụng ảnh'><i class='fa fa-save'></i></a></div><canvas id='preview' class='hide'></canvas><div class='image-cropper center-block'><img class='image_crop' src='/data/site_svg/noavatar.png' /></div></div>");

                WrapCheckBoxs();
            }
            $modal_crop = $('#mdcrop');
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
    function initCommentLink() {
        $('.comment-reply-link').each(function (_, item) {
            if (!has(item, _initClass)) {
                add(item, _initClass);
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var button = $(this);
                    var parentId = this.getAttribute("data-id");
                    var hidden_ParentId = $('#comment-form #parentId');
                    hidden_ParentId.val(parentId);
                    var href = button.attr('href');

                    $("html, body").animate({ scrollTop: $(href).offset().top + 120 }, scrollTime);
                    $('#ctmes').trigger('click'); //.focus();
                    return false;
                }, { capture: true })
            }
        })
    }


    // #endregion

    // #region Accordion

    function Accordion() {
        $('.accordion .link').each(function (_, item) {
            if (!has(item, _initClass)) {
                add(item, _initClass);
                item.addEventListener('click', function (evt) {
                    var next = $(this).next(); //.nextSibling;
                    next.slideToggle();
                    toggle(this.parentNode, 'open');
                    $(this).closest('.accordion').find('.submenu').not(next).slideUp().parent().removeClass('open');
                })
            }
        })
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
        $(".tab-link-init").each(function (_, tab) {
            remove(tab, "tab-link-init");
            add(tab, "tab-link");
            tab.addEventListener('click', OnTabLinkClick);
        })
        InitEdit();
        WrapCheckBoxs();
        GoogleMap.init();
        initTimeAgo();
        // initGallery();
        initChosen();
        initImage_Replacement();
        Accordion();
        initCarosel();
        initLoadOnClick();
        initCommentLink();
        $('.cbp-qtrotator').each(function (_, item) {
            if (!has(item, _initClass)) {
                add(item, _initClass);
                $(item).cbpQTRotator();
            }
        })
    }

    function initCarosel() {
        $('.carousel.need-init').each(function (_, item) {
            remove(item, 'need-init');
            //[].slice.call(item.querySelectorAll('.eff')).forEach(function (el) {
            var rand = Math.floor(Math.random() * 60) + 20;
            //    $(el).css({
            //        top: rand + "%"
            //    })
            //});
            var flick = $(item).flickity({
                prevNextButtons: false,
                bgLazyLoad: true,
                autoPlay: 5000,
                wrapAround: true,
                draggable: false
            })
            //flick.on('select.flickity', function (el) {
            //    console.log(el);
            //});

        })
    }

    function gnMenu(el, options) {
        this.el = el;
        this._init();
    }

    gnMenu.prototype = {
        _init: function () {
            this.trigger = this.el.querySelector('a.gn-icon-menu');
            this.menu = this.el.querySelector('nav.gn-menu-wrapper');
            this.isMenuOpen = false;
            this.eventtype = mobilecheck() ? 'touchstart' : 'click';
            this._initEvents();
            var self = this;
            this.bodyClickFn = function () {
                self._closeMenu();
                this.removeEventListener(self.eventtype, self.bodyClickFn);
            };
        },
        _initEvents: function () {
            var self = this;

            if (!mobilecheck()) {
                if (this.trigger) {
                    this.trigger.addEventListener('mouseover', function (ev) { self._openIconMenu(); });
                    this.trigger.addEventListener('mouseout', function (ev) { self._closeIconMenu(); });
                    this.menu.addEventListener('mouseover', function (ev) {
                        self._openMenu();
                        document.addEventListener(self.eventtype, self.bodyClickFn);
                    });
                }

            }
            if (this.trigger) {
                this.trigger.addEventListener(this.eventtype, function (ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    if (self.isMenuOpen) {
                        self._closeMenu();
                        document.removeEventListener(self.eventtype, self.bodyClickFn);
                    } else {
                        self._openMenu();
                        document.addEventListener(self.eventtype, self.bodyClickFn);
                    }
                }, Modernizr.passiveeventlisteners ? { passive: true } : false);
                this.menu.addEventListener(this.eventtype, function (ev) {
                    ev.stopPropagation();
                });
            }

        },
        _openIconMenu: function () {
            if (this.el.offsetTop > 0) return;
            add(this.menu, 'gn-open-part');
        },
        _closeIconMenu: function () {
            remove(this.menu, 'gn-open-part');
        },
        _openMenu: function () {
            if (this.isMenuOpen) return;
            add(this.trigger, 'open');
            this.isMenuOpen = true;
            add(this.menu, 'gn-open-all');
            this._closeIconMenu();

        },
        _closeMenu: function () {
            if (!this.isMenuOpen) return;
            remove(this.trigger, 'open');
            this.isMenuOpen = false;
            remove(this.menu, 'gn-open-all');
            this._closeIconMenu();
        }
    };
    (function ($, window, undefined) {

        'use strict';

        // global

        $.CBPQTRotator = function (options, element) {
            this.$el = $(element);
            this._init(options);
        };

        // the options
        $.CBPQTRotator.defaults = {
            // default transition speed (ms)
            speed: 700,
            // default transition easing
            easing: 'ease',
            // rotator interval (ms)
            interval: 8000
        };

        $.CBPQTRotator.prototype = {
            _init: function (options) {

                // options
                this.options = $.extend(true, {}, $.CBPQTRotator.defaults, options);
                // cache some elements and initialize some variables
                this._config();
                // show current item
                this.$items.eq(this.current).addClass('cbp-qtcurrent');
                // set the transition to the items
                //if (this.support) {
                this._setTransition();
                //}
                // start rotating the items
                this._startRotator();

            },
            _config: function () {

                // the content items
                this.$items = this.$el.children('div.cbp-qtcontent');
                // total items
                this.itemsCount = this.$items.length;
                // current item's index
                this.current = 0;
                // support for CSS Transitions
                //                this.support = Modernizr.csstransitions;
                // add the progress bar
                // if (this.support)
                this.$progress = $('<span class="cbp-qtprogress"></span>').appendTo(this.$el);

            },

            _setTransition: function () {
                //  requestAnimationFrame()
                setTimeout($.proxy(function () {
                    this.$items.css('transition', 'opacity ' + this.options.speed + 'ms ' + this.options.easing);
                }, this), 25);
            },
            _startRotator: function () {

                //  if (this.support) {
                this._startProgress();
                // }

                setTimeout($.proxy(function () {
                    //if (this.support) {
                    this._resetProgress();
                    // }
                    this._next();
                    this._startRotator();
                }, this), this.options.interval);

            },
            _next: function () {

                // hide previous item
                this.$items.eq(this.current).removeClass('cbp-qtcurrent');
                // update current value
                this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
                // show next item
                this.$items.eq(this.current).addClass('cbp-qtcurrent');

            },
            _startProgress: function () {

                setTimeout($.proxy(function () {
                    this.$progress.css({ transition: 'width ' + this.options.interval + 'ms linear', width: '100%' });
                }, this), 25);

            },
            _resetProgress: function () {
                this.$progress.css({ transition: 'none', width: '0%' });
            },
            destroy: function () {
                // if (this.support) {
                this.$items.css('transition', 'none');
                this.$progress.remove();
                //  }
                this.$items.removeClass('cbp-qtcurrent').css({
                    'position': 'relative',
                    'z-index': 100,
                    'pointer-events': 'auto',
                    'opacity': 1
                });
            }
        };

        var logError = function (message) {
            if (window.console) {
                window.console.error(message);
            }
        };

        $.fn.cbpQTRotator = function (options) {
            if (typeof options === 'string') {
                var args = Array.prototype.slice.call(arguments, 1);
                this.each(function () {
                    var instance = $.data(this, 'cbpQTRotator');
                    if (!instance) {
                        logError("cannot call methods on cbpQTRotator prior to initialization; " +
                            "attempted to call method '" + options + "'");
                        return;
                    }
                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        logError("no such method '" + options + "' for cbpQTRotator instance");
                        return;
                    }
                    instance[options].apply(instance, args);
                });
            } else {
                this.each(function () {
                    var instance = $.data(this, 'cbpQTRotator');
                    if (instance) {
                        instance._init();
                    } else {
                        instance = $.data(this, 'cbpQTRotator', new $.CBPQTRotator(options, this));
                    }
                });
            }
            return this;
        };

    })(jQuery, window);

    function initLoadOnClick() {
        $('.load-on-click').each(function (_, item) {
            remove(item, 'load-on-click');
            item.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var url = this.getAttribute("data-src");
                var parent = item.parentNode;
                var id = Notify.Show();
                $.get(url)
                    .done(function (data) {
                        $(parent).replaceWith(data);
                        Notify.Destroy(id);
                        ajaxComplete();
                    })
            })
        })
    }
    var requiredHideLoader = false;

    function init() {

        initImage_Replacement();
        _resizeHandler();

        requiredHideLoader = document.getElementById('landing') != null;
        var mainMenu = document.getElementById('gn-menu');
        _onScroll();
        if (mainMenu) GoogleMenu = new gnMenu(mainMenu);
        $('.auto-focus').focus();
        //window.addEventListener('scroll', _.debounce(scrollHandler, 100));
        //scrollHandler();

        Accordion();
        initChosen();
        lazyLoading();
        Upload.init();
        Collapse.init();

        InitEdit();
        FormValidate();
        initCommentLink();
        _initCustomForm();

        $('body').on('click', '.scrollTo', function (e) {
            e.preventDefault();
            var target = $(this.hash);
            if (target && target.length) {

                $('html,body').animate({ scrollTop: target.offset().top }, scrollTime);
                return false;
            }
        })
        $('body').on('keydown', '#lu', function (e) {
            if (e.keyCode === 13) {
                $('#lp').focus();
            }
        })
        $('body').on('keydown', '.enter-submit', function (e) {

            if (e.keyCode === 13) {
                e.preventDefault();
                $(this).closest('form').find('.submit').trigger('click');
                return false;
            }
        })
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
                })
            } else {
                target.addClass("in");
            }

        })
        initLoadOnClick();
        var wow = new WOW({
            // mobile: true, // default
            callback: function (box) {
                if (has(box, 'lazy')) {
                    loadData(box);
                }
            },
        });
        wow.init();
        var clearLoader = function () {
            $('#preloader').remove();
            //if (requiredHideLoader) {
            //    //$('#landing').remove();
            //    //$('#gn-menu').addClass('active');
            //    $('html,body').animate({ scrollTop: windowHeight }, scrollTime);
            //}

        };
        rAF(clearLoader);

    }

    window.Notify = Notify;
    init();
});