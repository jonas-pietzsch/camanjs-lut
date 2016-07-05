Caman.Plugin.register('lut', function (lutData) {
    var EMPTY_IMG_DATA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    // new canvas = old canvas
    var canvas = this.canvas;
    var ctx = canvas.getContext('2d');

    // prepare LUT img, canvas and context
    var lutImg = new Image;
    var lutCanvas = document.createElement('canvas');
    var lutCtx = lutCanvas.getContext('2d');

    // define on load event of image: fill the canvas with the image
    lutImg.onload = function () {
        lutCanvas.width = lutImg.width;
        lutCanvas.height = lutImg.height;
        lutCtx.drawImage(lutImg, 0, 0);

        var lutWidth = lutCanvas.width;
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var filterData = lutCtx.getImageData(0, 0, lutCanvas.width, lutCanvas.height);

        for (var i = 0; i < imgData.data.length; i += 4) {
            var r = Math.floor(imgData.data[i] / 4);
            var g = Math.floor(imgData.data[i + 1] / 4);
            var b = Math.floor(imgData.data[i + 2] / 4);

            var lutX = (b % 8) * 64 + r;
            var lutY = Math.floor(b / 8) * 64 + g;
            var lutIndex = (lutY * lutWidth + lutX) * 4;

            imgData.data[i] = filterData.data[lutIndex];
            imgData.data[i + 1] = filterData.data[lutIndex + 1];
            imgData.data[i + 2] = filterData.data[lutIndex + 2];
            imgData.data[i + 3] = 255;

        }
        ctx.putImageData(imgData, 0, 0);
    };

    // trigger the load event by setting src
    lutImg.src = lutData;
    if (lutImg.complete || lutImg.complete === undefined) {
        lutImg.src = EMPTY_IMG_DATA;
        lutImg.src = lutData;
    }

    // replace the previous canvas
    this.replaceCanvas(canvas);
});

Caman.Filter.register('lut', function () {
    this.processPlugin('lut', arguments);
});

