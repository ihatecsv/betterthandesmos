// v1.4 BtD™
// Desmos graph of default functions:
// https://www.desmos.com/calculator/q8krvyo0cl

var sketchProc = function(processing){
	var functionObjects = [];
	var screenWidth;
	var divisionCount;
	var useSecantRendering;
	var plotDensity;
	var combineZoom;
	var modifierZoom;
	var modifierZoomX;
	var modifierZoomY;
	var axisStrokeWeight;
	var graphStrokeWeight;
	var functionStrokeWeight;
	var labelTextSize;
	var funcText;

	var pixelMid;
	var spacePerDivision;
	var baseScaleX;
	var baseScaleY;
	var scaleX;
	var scaleY;
	var secantBoundOffset;

	var colorList = [
		processing.color(255,0,0),
		processing.color(0,0,255),
		processing.color(0,255,0),
		processing.color(255,179,0),
		processing.color(221,0,255)
	];

	var presetFuncText = (new URL(location)).searchParams.get("function");
	if(presetFuncText != null){
		$("#functionText").val(presetFuncText);
	}

	var updateForm = function(){
		screenWidth = $("#cContainer").width();
		divisionCount = $("#divisionCount").val();
		useSecantRendering = $("#useSecantRendering").is(":checked");
		plotDensity = parseFloat($("#plotDensity").val());
		combineZoom = $("#combineZoom").is(":checked");
		modifierZoom = parseFloat($("#modifierZoom").val());
		modifierZoomX = parseFloat($("#modifierZoomX").val());
		modifierZoomY = parseFloat($("#modifierZoomY").val());
		axisStrokeWeight = parseFloat($("#axisStrokeWeight").val());
		graphStrokeWeight = parseFloat($("#graphStrokeWeight").val());
		functionStrokeWeight = parseFloat($("#functionStrokeWeight").val());
		labelTextSize = parseFloat($("#labelTextSize").val());
		funcText = $("#functionText").val();
		calculateValues();
		evaluateFunctions();
	}

	var calculateValues = function(){
		pixelMid = screenWidth / 2;
		spacePerDivision = screenWidth / divisionCount;
		void(combineZoom && ((modifierZoomX = modifierZoom) && (modifierZoomY = modifierZoom)));
		baseScaleX = 1 / (screenWidth / 2);
		baseScaleY = screenWidth / 2;
		scaleX = baseScaleX * modifierZoomX;
		scaleY = baseScaleY * 1 / modifierZoomY;
		secantBoundOffset = plotDensity * 10;
	}

	var evaluateFunctions = function(){
		var newURL = location.href.split("?")[0] + "?function=" + encodeURIComponent(funcText);
		history.replaceState({}, '', newURL);

		var colorCount = 0;
		var funcTexts = funcText.split('\n');
		funcTexts = funcTexts.map(x => "try{return " + x + "}catch(e){}");

		for (var i = 0; i < funcTexts.length; i++) {
			try {
				var newFunc = new Function(["x"], funcTexts[i]);
				functionObjects.push({
					func: newFunc,
					color: colorList[colorCount]
				});
			} catch (e) {
				var newFunc = function(x) {
					return NaN;
				};
				functionObjects.push({
					func: newFunc,
					color: colorList[colorCount]
				});
			}
			colorCount++;
			if (colorCount == colorList.length) {
				colorCount = 0;
			}
		}
	}

	$("#settingsForm").on('change', updateForm);
	updateForm();

	$("#cContainer").on('resize', function(){
		screenWidth = $("#cContainer").width();
	});

	processing.setup = function(){
		processing.draw(); //why is this not looping?!
	}

	processing.draw = function(){
		if(plotDensity <= 0){
			plotDensity = NaN;
		}

		//Setup
		processing.size(screenWidth, screenWidth);
		processing.background(255);

		//Draw axis
		processing.stroke(0);
		processing.strokeWeight(axisStrokeWeight);
		processing.line(screenWidth / 2, 0, screenWidth / 2, screenWidth);
		processing.line(0, screenWidth / 2, screenWidth, screenWidth / 2);

		//Draw grid
		processing.textSize(labelTextSize);
		processing.fill(0, 0, 0);
		var textSpacing = screenWidth / divisionCount;
		processing.strokeWeight(graphStrokeWeight);
		processing.stroke(48, 48, 48);
		for (var i = -divisionCount / 2; i <= divisionCount / 2; i++) {
			processing.text(((i / divisionCount * 2) * modifierZoomX).toString(), (textSpacing * i) + pixelMid, pixelMid + labelTextSize);
			processing.text(((-i / divisionCount * 2) * modifierZoomY).toString(), pixelMid - labelTextSize, (textSpacing * i) + pixelMid);
			var lineCoords = pixelMid + (screenWidth * i / divisionCount);
			processing.line(lineCoords, 0, lineCoords, screenWidth);
			processing.line(0, lineCoords, screenWidth, lineCoords);
		}

		//Draw functions
		processing.strokeWeight(functionStrokeWeight);
		for (var k = -pixelMid; k <= pixelMid; k = k + plotDensity) {
			for (var i = 0; i < functionObjects.length; i++) {
				processing.stroke(functionObjects[i].color);
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
						processing.line(x1, y1, x2, y2);
					}
				} else {
					processing.point(x1, y1);
				}
			}
		}
	}
}

var canvas = document.getElementById("btdCanvas");
var processingInstance = new Processing(canvas, sketchProc);
