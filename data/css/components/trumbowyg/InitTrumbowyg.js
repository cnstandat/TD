function InitTrumbowyg() {
    $('.note-editable').trumbowyg({
        autogrow: true,
        svgPath: '/data/fonts/icons.svg',
        btnsDef: {
            // Customizables dropdowns
            image: {
                dropdown: ['insertImage', 'upload'],
                ico: 'insertImage'
            }
        },
        btns: [
            ['viewHTML'],
            ['undo', 'redo'],
            ['formatting'],
            'btnGrp-design',
            ['link'],
            ['image'],
            'btnGrp-justify',
            'btnGrp-lists',
            ['foreColor', 'backColor'],
            ['preformatted'],
            ['horizontalRule'],
            ['fullscreen']
        ],
        plugins: {
            // Add imagur parameters to upload plugin
            upload: {
                serverPath: '/pub/upload'
            }
        }
    }).on('tbwinit', function () {
        $('.trumbowyg-editor').addClass('ignore');
    })
}