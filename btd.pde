// v1.10 BtD™
// Desmos graph of default functions:
// https://www.desmos.com/calculator/q8krvyo0cl

//Functions to graph
var functionObjects=[
	{func:function(x){return Math.sin(x)},color:color(255,0,0)},
	{func:function(x){return x*x},color:color(0,0,255)},
	{func:function(x){return Math.pow(x,x)},color:color(0,255,0)},
	{func:function(x){return x/(x-4)},color:color(255,179,0)},
	{func:function(x){return Math.log(x)},color:color(221,0,255)}
];

//Width/height of display in pixels
var screenWidth = 800;
//Number of grid divisions to display (multiple of two)
var divisionCount = 8;

//Secant-line rendering or dot rendering
var useSecantRendering = true;
//Plot density (>= 1 looks good for secant-line, <= 0.1 looks good for dot)
var plotDensity = 1;

//Combined zoom or individual zoom
var combineZoom = true;
//Combined zoom
var modifierZoom = 8;
//Individual X zoom
var modifierZoomX = 4;
//Individual Y zoom
var modifierZoomY = 4;

//X and Y axis stroke weight
var axisStrokeWeight = 2;
//Grid line stroke weight
var graphStrokeWeight = 1;
//Function stroke weight
var functionStrokeWeight = 2;
//Label text size
var labelTextSize = 10;

//------------------------------------------------------------
//                  Caution! Dragons below!
//------------------------------------------------------------
void setup() {
	size(screenWidth, screenWidth);
	background(255);
}

void draw() {
	background(255);
	var pixelMid = screenWidth / 2;
	var spacePerDivision = screenWidth / divisionCount;
	void(combineZoom && ((modifierZoomX = modifierZoom) && (modifierZoomY = modifierZoom)));
	var baseScaleX = 1 / (screenWidth / 2);
	var baseScaleY = screenWidth / 2;
	var scaleX = baseScaleX * modifierZoomX;
	var scaleY = baseScaleY * 1 / modifierZoomY;
	var secantBoundOffset = plotDensity * 10;

	//Draw axis
	strokeWeight(axisStrokeWeight);
	line(screenWidth / 2, 0, screenWidth / 2, screenWidth);
	line(0, screenWidth / 2, screenWidth, screenWidth / 2);

	//Draw grid
	textSize(labelTextSize);
	fill(0, 0, 0);
	var textSpacing = screenWidth / divisionCount;
	strokeWeight(graphStrokeWeight);
	stroke(48, 48, 48);
	for (var i = -divisionCount / 2; i <= divisionCount / 2; i++) {
		text(((i / divisionCount * 2) * modifierZoomX).toString(), (textSpacing * i) + pixelMid, pixelMid + labelTextSize);
		text(((-i / divisionCount * 2) * modifierZoomY).toString(), pixelMid - labelTextSize, (textSpacing * i) + pixelMid);
		var lineCoords = pixelMid + (screenWidth * i / divisionCount);
		line(lineCoords, 0, lineCoords, screenWidth);
		line(0, lineCoords, screenWidth, lineCoords);
	}

	//Draw functions
	strokeWeight(functionStrokeWeight);
	for (var k = -pixelMid; k <= pixelMid; k = k + plotDensity) {
		for (var i = 0; i < functionObjects.length; i++) {
			stroke(functionObjects[i].color);
			var x1 = k + pixelMid;
			var y1 = (-functionObjects[i].func(k * scaleX) * scaleY) + pixelMid;
			if (useSecantRendering) {
				var x2 = (k - plotDensity) + pixelMid;
				var y2 = (-functionObjects[i].func((k - plotDensity) * scaleX) * scaleY) + pixelMid;
				if (
					x1 > (0 - secantBoundOffset) &&
					x1 <= (screenWidth + secantBoundOffset) &&
					x2 > (0 - secantBoundOffset) &&
					x2 <= (screenWidth + secantBoundOffset) &&
					y1 > (0 - secantBoundOffset) &&
					y1 <= (screenWidth + secantBoundOffset) &&
					y2 > (0 - secantBoundOffset) &&
					y2 <= (screenWidth + secantBoundOffset)
				) {
					line(x1, y1, x2, y2);
				}
			} else {
				point(x1, y1);
			}
		}
	}
}
