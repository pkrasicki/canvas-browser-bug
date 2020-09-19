function hexToColor(hexString)
{
	const redMatches = hexString.match(/^#?([a-f0-9]{2})/);
	const greenMatches = hexString.match(/^#.{2}?([a-f0-9]{2})/);
	const blueMatches = hexString.match(/^#.{4}?([a-f0-9]{2})/);
	const red = parseInt(redMatches[1], 16);
	const green = parseInt(greenMatches[1], 16);
	const blue = parseInt(blueMatches[1], 16);

	return [red, green, blue];
}

function getImageDataOffset(posX, posY, imageData)
{
	return (posY * imageData.width + posX) * 4;
}

function getPixelColor(posX, posY, imageData)
{
	const offset = getImageDataOffset(posX, posY, imageData);
	const arr = imageData.data.slice(offset, offset + 4);
	return [arr[0], arr[1], arr[2], arr[3]];
}

function setPixelColor(posX, posY, imageData, color)
{
	const offset = getImageDataOffset(posX, posY, imageData);
	imageData.data[offset] = color[0];
	imageData.data[offset + 1] = color[1];
	imageData.data[offset + 2] = color[2];
	imageData.data[offset + 3] = 255;
}

function areColorsEqual(color1, color2)
{
	return color1[0] == color2[0]
		&& color1[1] == color2[1]
		&& color1[2] == color2[2]
		&& color1[3] == color2[3];
}

function pixelNeedsUpdate(x, y, width, height, imageData, curColor, colorToReplace)
{
	if (x < 0 || y < 0 || x >= width || y >= height)
		return false;

	let pixelColor = getPixelColor(x, y, imageData);
	if (areColorsEqual(pixelColor, curColor) || !areColorsEqual(pixelColor, colorToReplace))
		return false;

	return true;
}

function fillPixels(width, height, posX, posY, imageData, curColor, colorToReplace)
{
	let pixels = [posX, posY]
	for (let i = 0; i < pixels.length - 1; i+=2)
	{
		if (this.pixelNeedsUpdate(pixels[i], pixels[i+1], width, height, imageData, curColor, colorToReplace))
		{
			this.setPixelColor(pixels[i], pixels[i+1], imageData, curColor);

			pixels.push(pixels[i] - 1);
			pixels.push(pixels[i+1]);

			pixels.push(pixels[i]);
			pixels.push(pixels[i+1] - 1);

			pixels.push(pixels[i] + 1);
			pixels.push(pixels[i+1]);

			pixels.push(pixels[i]);
			pixels.push(pixels[i+1] + 1);
		}
	}
}

function fill(posX, posY, canvasWidth, canvasHeight, imageData, color)
{
	if (posX < 0 || posX > canvasWidth)
		return;

	if (posY < 0 || posY > canvasHeight)
		return;

	let curColor = hexToColor(color);
	let colorToReplace = getPixelColor(posX, posY, imageData);
	if (areColorsEqual(curColor, colorToReplace))
		return;

	fillPixels(canvasWidth, canvasHeight, posX, posY, imageData, curColor, colorToReplace);
}