let mode = "draw";
let color = "#df3939";
let startPosX = -1;
let startPosY = -1;
let drawBtn = document.getElementById("draw-btn");
let fillBtn = document.getElementById("fill-btn");
let redBtn = document.getElementById("red-btn");
let greenBtn = document.getElementById("green-btn");
let blueBtn = document.getElementById("blue-btn");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

drawBtn.addEventListener("click", (e) =>
{
	mode = "draw";
});

fillBtn.addEventListener("click", (e) =>
{
	mode = "fill";
});

redBtn.addEventListener("click", (e) =>
{
	color = "#df3939";
});

greenBtn.addEventListener("click", (e) =>
{
	color = "#00ff00";
});

blueBtn.addEventListener("click", (e) =>
{
	color = "#0000ff";
});

canvas.addEventListener("mousedown", (e) =>
{
	startPosX = e.clientX;
	startPosY = e.clientY;

	// fill area
	if (mode == "fill")
	{
		let imageData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
		fill(startPosX, startPosY, canvas.clientWidth, canvas.clientHeight, imageData, color);
		ctx.putImageData(imageData, 0, 0);
	}
});

canvas.addEventListener("mousemove", (e) =>
{
	// draw
	if (mode == "draw" && e.buttons == 1 && e.button == 0 && startPosX > -1 && startPosY > -1)
	{
		let posX = e.offsetX;
		let posY = e.offsetY;

		ctx.lineWidth = 50;
		ctx.strokeStyle = color;
		ctx.lineJoin = "round";

		ctx.beginPath();
		ctx.moveTo(startPosX, startPosY);
		ctx.lineTo(posX, posY);
		ctx.closePath();
		ctx.stroke();

		startPosX = posX;
		startPosY = posY;
	}
});