var TD = function () {
    var api, canvas, context, $modal_crop, cropx, cropy, btnDoCrop, crp, reader, file, data = { ContentType: '', Data: {} }, retImage, input;
    function HideCrop() {
        api.destroy();
        $('.jcrop-holder').remove();
    }
    function DoCrop() {
        var ck = $modal_crop.find('input[type="checkbox"]');
        var dataFull;
        if (ck && ck.is(":checked")) {
            dataFull = canvas.toDataURL("image/png");
            data.ContentType = "image/png";
        }
        else {
            dataFull = canvas.toDataURL("image/jpeg");
            data.ContentType = "image/jpeg";
        }

        data.Data = dataFull.split(',')[1];
        if (retImage) {
            $('#Avatar').attr('src', dataFull);
            $('#ImageData').val(data.Data);
        }



        $modal_crop.modal('hide');
        //    $modal_crop.remove();//.modal('hide');

    }
    function ReaderLoaded(evt) {
        $modal_crop.modal('show');
        crp.attr('src', evt.target.result)
        var img = new Image();
        img.onload = function () {
            var selectx = img.naturalWidth, selecty = img.naturalHeight;
            var imageratio = selectx / selecty;
            cropx.on('change', function () {

                canvas.width = this.value;
                initCrop();
            })
            cropy.on('change', function () {
                canvas.height = this.value;
                initCrop();
            })
            var ratio = canvas.width / canvas.height;

            if (ratio < imageratio) {
                selectx = ratio * selecty;
            }
            else {
                selecty = selectx / ratio;
            }
            crp.Jcrop({
                onChange: showCoords,
                onSelect: showCoords,
                aspectRatio: ratio,
                bgColor: 'transparent',
                boxWidth: $(window).width() - 5,
                boxHeight: $(window).height() - 20,
                bgOpacity: 0.6, setSelect: [0, 0, selectx, selecty]
            }, function () { api = this });
        }
        img.src = evt.target.result;
    }
    function initCrop() {
        if (api != undefined) api.destroy();
        var img = crp[0];
        var selectx = img.naturalWidth, selecty = img.naturalHeight;
        var imageratio = selectx / selecty;
        var ratio = canvas.width / canvas.height;
        if (ratio < imageratio) {
            selectx = ratio * selecty;
        }
        else {
            selecty = selectx / ratio;
        }
        crp.Jcrop({
            onChange: showCoords,
            onSelect: showCoords,
            aspectRatio: ratio,
            bgColor: 'transparent',
            boxWidth: $(window).width() - 5,
            boxHeight: $(window).height() - 20,
            bgOpacity: 0.6, setSelect: [0, 0, selectx, selecty]
        }, function () { api = this });
    }
    function showCoords(c) {
        var image = crp[0];
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
    }
    function Init(fileInput, width, height, returnImage) {
        if (width == null || width == undefined) width = 100;
        if (height == null || height == undefined) height = 100;
        if (!$('#mdcrop').length) {
            $('body').prepend("<div id=\"mdcrop\" class=\"modal modal-fw modal-crop\">\
    <div class=\"modal-dialog\">\
        <div class=\"modal-content\">\
            <div class=\"modal-body\">\
<canvas id=\"preview\" class=\"hide\"></canvas>\
                <div class=\"image-cropper center-block\">\
                    <img class=\"image_crop\" src=\"/data/img/noavatar.png\" />\
                </div>\
            </div>\
<div class=\"modal-toolbar\">\
                <div class=\"form-inline\">\
                    <span>Nền trong suốt ?</span>\
                    <input type=\"checkbox\" title=\"Là ảnh có nền trong suốt\" />\
                    <span>Kích thước :</span> <input type=\"number\" class=\"cropx\" /><b>X</b>\
                    <input type=\"number\" class=\"cropy\" />\
                </div>\
                <a class=\"btn btn-outline-success docrop\" title=\"Cắt và sử dụng ảnh\"><i class=\"fa fa-save\"></i></a>\
                <a class=\"btn btn-outline-danger\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"fa fa-cross\"></i></a>\
            </div>\
        </div>\
    </div>\
</div>");
            $modal_crop = $('#mdcrop.modal');

        }
        input = $('#avaup');
        if (!input.length) {
            $('body').prepend("<input type=\"file\" id=\"avaup\" class=\"input-file hide\"/>");
            input = $('#avaup');
        }
        canvas = $modal_crop.find('#preview')[0];
        canvas.height = height;
        canvas.width = width;
        context = canvas.getContext("2d");
        cropx = $modal_crop.find('.cropx');
        cropy = $modal_crop.find('.cropy');
        btnDoCrop = $modal_crop.find('.docrop');
        crp = $modal_crop.find('img.image_crop');
        btnDoCrop.on('click', DoCrop);
        $modal_crop.on('hidden.bs.modal', function () {
            if (api != undefined) api.destroy();
        });
       
        if (fileInput && fileInput.length > 0) {
            $(fileInput).on('change', function (e) {
                retImage = null;
                cropx.val(width);
                cropy.val(height);
                canvas.height = height;
                canvas.width = width;
                try {
                    // If multiple files allowed, we just get the first.
                    file = e.target.files[0];
                } catch (err) {
                    // In IE8, multiple files not allowed
                    file = e.target.value;
                }

                reader = new FileReader();
                reader.onload = ReaderLoaded;
                if (file)
                    reader.readAsDataURL(file);
            });
        }
        else if (returnImage && returnImage.length) {
            $('#Avatar').click(function () {
                retImage = returnImage;
                cropx.val(width);
                cropy.val(height);
                canvas.height = height;
                canvas.width = width;
                input.on('change', function (e) {
                    try {
                        // If multiple files allowed, we just get the first.
                        var file = e.target.files[0];
                    } catch (err) {
                        // In IE8, multiple files not allowed
                        file = e.target.value;
                    }
                    reader = new FileReader();
                    reader.onload = ReaderLoaded;
                    if (file)
                        reader.readAsDataURL(file);
                }).click();
            })

        }
    }

    return {
        initUpload: Init,
        data: data,
    }
}();

(function ($) {
    'use strict';

    var defaultOptions = {
        serverPath: './src/plugins/upload/trumbowyg.upload.php',
        fileFieldName: 'fileToUpload',
        data: [],                       // Additional data for ajax [{name: 'key', value: 'value'}]
        headers: {},                    // Additional headers
        xhrFields: {},                  // Additional fields
        urlPropertyName: 'file',        // How to get url from the json response (for instance 'url' for {url: ....})
        statusPropertyName: 'success',  // How to get status from the json response 
        success: undefined,             // Success callback: function (data, trumbowyg, $modal, values) {}
        error: undefined                // Error callback: function () {}
    };

    function getDeep(object, propertyParts) {
        var mainProperty = propertyParts.shift(),
            otherProperties = propertyParts;

        if (object !== null) {
            if (otherProperties.length === 0) {
                return object[mainProperty];
            }

            if (typeof object === 'object') {
                return getDeep(object[mainProperty], otherProperties);
            }
        }
        return object;
    }

    addXhrProgressEvent();

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                upload: 'Tải ảnh lên Server',
                file: 'Chọn ảnh',
                uploadError: 'Có lỗi xảy ra'
            }

        },
        // jshint camelcase:true

        plugins: {
            upload: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.upload = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.upload || {});
                    var btnDef = {
                        fn: function () {
                            trumbowyg.saveRange();

                            var file, base64,
                                prefix = trumbowyg.o.prefix;
                            var data = {
                                ContentType: '',
                                Data: ''
                            };
                            var $modal = trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.upload,

                                // Fields
                                {

                                    file: {
                                        type: 'file',
                                        required: true,
                                        attributes: {
                                            accept: 'image/*',
                                            class: 'ignore',
                                            id: 'uploadtrumbowyg'
                                        }
                                    },

                                    isbase64: {
                                        type: 'checkbox',
                                        label: 'Chèn ảnh trực tiếp'
                                    }
                                },

                                // Callback
                                function (values) {
                                    if (!values.isbase64) {
                                        if ($('.' + prefix + 'progress', $modal).length === 0) {
                                            $('.' + prefix + 'modal-title', $modal)
                                                .after(
                                                    $('<div/>', {
                                                        'class': prefix + 'progress'
                                                    }).append(
                                                        $('<div/>', {
                                                            'class': prefix + 'progress-bar'
                                                        })
                                                    )
                                                );
                                        }

                                        $.ajax({
                                            url: trumbowyg.o.plugins.upload.serverPath,
                                            headers: trumbowyg.o.plugins.upload.headers,
                                            xhrFields: trumbowyg.o.plugins.upload.xhrFields,
                                            type: 'POST',
                                            data: {
                                                'ContentType': TD.data.ContentType,
                                                'Data': TD.data.Data
                                            },
                                            cache: false,
                                            dataType: 'json',

                                            progresImageUpload: function (e) {
                                                $('.' + prefix + 'progress-bar').stop().animate({
                                                    width: Math.round(e.loaded * 100 / e.total) + '%'
                                                }, 200);
                                            },

                                            success: function (ddata) {
                                                try {

                                                    if (ddata.Success) {
                                                        var data = ddata.FileName;
                                                        if (trumbowyg.o.plugins.upload.success) {
                                                            trumbowyg.o.plugins.upload.success(data, trumbowyg, $modal, values);
                                                        }
                                                        else {

                                                            var url = data;
                                                            trumbowyg.execCmd('insertImage', url);
                                                            $('img[src="' + url + '"]:not([alt])', trumbowyg.$box).attr('alt', values.alt);
                                                            setTimeout(function () {
                                                                trumbowyg.closeModal();
                                                            }, 250);
                                                            trumbowyg.$c.trigger('tbwuploadsuccess', [trumbowyg, data, url]);

                                                        }
                                                    }
                                                    else {
                                                        trumbowyg.o.plugins.upload.error || function () {

                                                            trumbowyg.addErrorOnModalField(
                                                                $('input[type=file]', $modal),
                                                                trumbowyg.lang.uploadError
                                                            );
                                                            trumbowyg.$c.trigger('tbwuploaderror', [trumbowyg]);
                                                        }
                                                    }

                                                }
                                                catch (e) {

                                                }

                                            },

                                            error: trumbowyg.o.plugins.upload.error || function () {

                                                trumbowyg.addErrorOnModalField(
                                                    $('input[type=file]', $modal),
                                                    trumbowyg.lang.uploadError
                                                );
                                                trumbowyg.$c.trigger('tbwuploaderror', [trumbowyg]);
                                            }
                                        });
                                    }
                                    else {
                                        trumbowyg.execCmd('insertImage', TD.data.Data);
                                        $('img[src="' + TD.data.Data + '"]:not([alt])', trumbowyg.$box).attr('alt', "image Upload");
                                        trumbowyg.closeModal();
                                    }


                                }
                            );

                            TD.initUpload('#uploadtrumbowyg', 300, 200);

                        }
                    };

                    trumbowyg.addBtnDef('upload', btnDef);
                }
            }
        }
    });


    function addXhrProgressEvent() {
        if (!$.trumbowyg && !$.trumbowyg.addedXhrProgressEvent) {   // Avoid adding progress event multiple times
            var originalXhr = $.ajaxSettings.xhr;
            $.ajaxSetup({
                xhr: function () {
                    var req = originalXhr(),
                        that = this;
                    if (req && typeof req.upload === 'object' && that.progresImageUpload !== undefined) {
                        req.upload.addEventListener('progress', function (e) {
                            that.progresImageUpload(e);
                        }, false);
                    }

                    return req;
                }
            });
            $.trumbowyg.addedXhrProgressEvent = true;
        }
    }
})(jQuery);
