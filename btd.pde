// v1.3 BtD™
// Desmos graph of default functions:
// https://www.desmos.com/calculator/q8krvyo0cl

//Color list (alternating)
var colorList = [
	color(255,0,0),
	color(0,0,255),
	color(0,255,0),
	color(255,179,0),
	color(221,0,255)
];

//------------------------------------------------------------
//                  Caution! Dragons below!
//------------------------------------------------------------
void draw() {
	
	var screenWidth = $("#cContainer").width();
	size(screenWidth, screenWidth);
	background(255);
	
	var divisionCount = $("#divisionCount").val();

	var useSecantRendering = $("#useSecantRendering").is(":checked");
	var plotDensity = parseFloat($("#plotDensity").val());
	
	if(plotDensity <= 0){
		plotDensity = NaN;
	}

	var combineZoom = $("#combineZoom").is(":checked");
	var modifierZoom = parseFloat($("#modifierZoom").val());
	var modifierZoomX = parseFloat($("#modifierZoomX").val());
	var modifierZoomY = parseFloat($("#modifierZoomY").val());

	var axisStrokeWeight = parseFloat($("#axisStrokeWeight").val());
	var graphStrokeWeight = parseFloat($("#graphStrokeWeight").val());
	var functionStrokeWeight = parseFloat($("#functionStrokeWeight").val());
	var labelTextSize = parseFloat($("#labelTextSize").val());
	
	var colorCount = 0;
	var functionObjects = [];
	var funcTexts = $("#functionText").val().split('\n');
	funcTexts = funcTexts.map(x => "try{return " + x + "}catch(e){}");

	for(var i = 0; i < funcTexts.length; i++){
		try{
			var newFunc = new Function(["x"], funcTexts[i]);
			functionObjects.push({func:newFunc, color: colorList[colorCount]});
		}catch(e){
			var newFunc = function(x){return NaN;};
			functionObjects.push({func:newFunc, color: colorList[colorCount]});
		}
		colorCount++;
		if(colorCount == colorList.length){
			colorCount = 0;
		}
	}
	var pixelMid = screenWidth / 2;
	var spacePerDivision = screenWidth / divisionCount;
	void(combineZoom && ((modifierZoomX = modifierZoom) && (modifierZoomY = modifierZoom)));
	var baseScaleX = 1 / (screenWidth / 2);
	var baseScaleY = screenWidth / 2;
	var scaleX = baseScaleX * modifierZoomX;
	var scaleY = baseScaleY * 1 / modifierZoomY;
	var secantBoundOffset = plotDensity * 10;

	//Draw axis
	stroke(0);
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
