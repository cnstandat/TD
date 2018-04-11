function Upload(devImage, e) {

    var canvas = document.getElementById('preview'),
        context = canvas.getContext("2d"), api;
    function ShownCrop() {

        $('#docrop').off('click').on('click', DoCrop);
  
    }
    function DoCrop() {
        var ck = $("#ckIsPng");
        if (ck && ck.is(":checked")) {
            var data = canvas.toDataURL("image/png");
        }
        else
            data = canvas.toDataURL("image/jpeg");
        $('#ImageData').val(data.split(',')[1]);
        $('#Avatar').attr("src", data);
        $('#mdcrop').modal('hide');
    }
    function HideCrop() {
        api.destroy();
        $('.jcrop-holder').remove();
        $('#imageCrop').attr('src', "").removeAttr('style');
    }
    function SelectImage() {
        var files = document.getElementById("ImageUpload").files[0];
        var reader = new FileReader();
        reader.onload = ReaderLoaded;
        reader.readAsDataURL(files);
    }
    function ReaderLoaded(evt) {
        var crp = $('#imageCrop');
        crp.attr('src', evt.target.result)//.attr('crossOrigin', 'anonymous');
        var imgtemp = new Image();
        imgtemp.onload = function () {
            $('#ImageUpload').val('');
            $('#mdcrop')
                .off('shown.bs.modal')
                .on('shown.bs.modal', ShownCrop)
                .off('hidden.bs.modal')
                .on('hidden.bs.modal', HideCrop)
                .modal('show');
            var img = document.getElementById('imageCrop');
            var ratio = canvas.width / canvas.height;

            var selectx = imgtemp.naturalWidth, selecty = imgtemp.naturalHeight;
            var imageratio = selectx / selecty;
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
                bgOpacity: 0.6, setSelect: [0, 0, selectx, selecty]
            }, function () { api = this });
        }
        imgtemp.src = evt.target.result;
        

    }
    function showCoords(c) {
        var image = document.getElementById('imageCrop');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
    }
    $('#ImageUpload').off('change').on('change', SelectImage).click();
};