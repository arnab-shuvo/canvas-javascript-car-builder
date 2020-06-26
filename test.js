var eventListner = true;
var el = null;
var lastImageX = 10;
var lastImagewidth = 0;
var newImageX = 10;

if (images.length != 0) {
	lastImageX = images[images.length - 1].x;
	lastImagewidth = images[images.length - 1].width;
	newImageX = lastImageX + lastImagewidth;
}

document.addEventListener(
	'dblclick',
	function (e) {
		e.stopPropagation();
		e.preventDefault();
		if (eventListner) {
			images.push({
				x: newImageX,
				width: 10,
				image: e.srcElement,
			});
			eventListner = false;
			el = e.srcElement;
		}
	},
	false,
);

if (images.length != 0) {
	ctx.drawImage(doc, '30%', 10, 10, 10);
} else {
	ctx.drawImage(doc, '30%', 10, 10, 10);
}
