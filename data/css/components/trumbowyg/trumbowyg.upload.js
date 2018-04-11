

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
                                        
                                        trumbowyg.execCmd('insertImage',"data:image/png;base64,"+ TD.data.Data);
                                        $('img[src="data:image/png;base64,' + TD.data.Data + '"]:not([alt])', trumbowyg.$box).attr('alt', "image Upload");
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
