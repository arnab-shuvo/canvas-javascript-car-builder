var canvas = new fabric.Canvas('canvas');
var ctx = canvas.getContext('2d');

var bodyConfig = {
	car1: {
		wheel: [
			{
				x: 75,
				y: 90,
			},
			{
				x: 225,
				y: 90,
			},
		],
	},
	car2: {
		wheel: [
			{
				x: 63,
				y: 90,
			},
			{
				x: 245,
				y: 90,
			},
		],
	},
};

var bodyItem = {
	x: 100,
	y: 100,
	width: 200,
	height: 100,
};

var bodyWheels = {
	max: 2,
};

dblClick = (type, id) => {
	switch (type) {
		case 'car':
			setBody(id);
			break;
		case 'chakka':
			setWheel(id);
			break;

		default:
			break;
	}
};

setBody = (id) => {
	var eventListner = true;
	var isPrevBody = false;
	var prevBodyId = '';
	var prevBody = '';

	if (canvas._objects.length !== 0) {
		for (var i = 0; i < canvas._objects.length; i++) {
			var hasBody = canvas._objects[i]._element.className
				.split(' ')
				.includes('car');
			if (hasBody) {
				isPrevBody = true;
				prevBodyId = canvas._objects[i]._element.id;
				canvas.remove(canvas._objects[i]);
			}
		}
	}
	document.addEventListener(
		'dblclick',
		function (e) {
			e.stopPropagation();
			e.preventDefault();
			if (eventListner) {
				el = e.srcElement;
				var imgInstance = new fabric.Image(el, {
					left: bodyItem.x,
					top: bodyItem.y,
					opacity: 1,
				});
				var items = canvas.getObjects();
				var wheelId = '';
				var haswheel = false;

				imgInstance.scaleToHeight(600);
				imgInstance.scaleToWidth(300);
				canvas.add(imgInstance);
				canvas.sendToBack(imgInstance);

				items.forEach((item) => {
					var elment = item._element;
					haswheel = elment.className.split(' ').includes('chakka');
				});
				if (haswheel) {
					addWheelForThisBody(e.srcElement.id);
				}

				eventListner = false;
			}
		},
		false,
	);
};

addWheelForThisBody = (id) => {
	var totalItem = canvas.getObjects();
	var wheelId = '';
	if (totalItem.length !== 0) {
		canvas.getObjects().forEach((item) => {
			var elment = item._element;
			var haswheel = elment.className.split(' ').includes('chakka');
			if (haswheel) {
				wheelId = elment.id;
				canvas.remove(item);
			}
		});
	}
	if (id === 'car1') {
		config = bodyConfig.car1;
	} else {
		config = bodyConfig.car2;
	}
	for (let index = 0; index < bodyWheels.max; index++) {
		var el = document.getElementById(wheelId);
		var imgInstance = new fabric.Image(el, {
			left: 100 + config.wheel[index].x - 20,
			top: 100 + config.wheel[index].y - 20,
			opacity: 1,
		});
		imgInstance.scaleToHeight(40);
		imgInstance.scaleToWidth(40);
		canvas.add(imgInstance);
		canvas.bringToFront(imgInstance);
	}
};

setWheel = (id) => {
	var eventListner = true;
	var isPrevBody = false;
	var carId = '';
	var config = bodyConfig.car1;
	var totalItem = canvas.getObjects();

	if (totalItem.length !== 0) {
		canvas.getObjects().forEach((item) => {
			var elment = item._element;
			var hasBody = elment.className.split(' ').includes('car');
			var haswheel = elment.className.split(' ').includes('chakka');

			if (haswheel) {
				canvas.remove(item);
			}
			if (hasBody) {
				isPrevBody = true;
				carId = item._element.id;
			}
		});
	}
	if (carId === 'car1') {
		config = bodyConfig.car1;
	} else {
		config = bodyConfig.car2;
	}

	if (!isPrevBody) {
		alert('need to add body first');
		return;
	}
	document.addEventListener(
		'dblclick',
		function (e) {
			e.stopPropagation();
			e.preventDefault();
			if (eventListner) {
				el = e.srcElement;
				for (let index = 0; index < bodyWheels.max; index++) {
					var imgInstance = new fabric.Image(el, {
						left: 100 + config.wheel[index].x - 20,
						top: 100 + config.wheel[index].y - 20,
						opacity: 1,
					});
					imgInstance.scaleToHeight(40);
					imgInstance.scaleToWidth(40);
					canvas.add(imgInstance);
					canvas.bringToFront(imgInstance);
				}
				eventListner = false;
			}
		},
		false,
	);
};

function stopDragging(element) {
	element.lockMovementX = true;
	element.lockMovementY = true;
}

function onMoving(e) {
	e.target.lockMovementX = true;
	e.target.lockMovementY = true;
}
canvas.on({
	'object:moving': onMoving,
	'object:click': onMoving,
});
