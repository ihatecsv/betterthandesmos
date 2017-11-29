// v1.4 BtD™
// Desmos graph of default functions:
// https://www.desmos.com/calculator/q8krvyo0cl

var canvas = document.getElementById("btdCanvas");
var ctx = canvas.getContext('2d');

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
	"rgb(255,0,0)",
	"rgb(0,0,255)",
	"rgb(0,255,0)",
	"rgb(255,179,0)",
	"rgb(221,0,255)"
];

var presetFuncText = (new URL(location)).searchParams.get("function");
if(presetFuncText != null){
	$("#functionText").val(presetFuncText);
}

var updateForm = function(){
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
	functionObjects = [];
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

var resizeCanvas = function(){
	screenWidth = $("#cContainer").width();
	canvas.width = screenWidth;
	canvas.height = screenWidth;
	calculateValues();
};

$("#settingsForm").on('input change', updateForm);
updateForm();

$(window).on('resize', resizeCanvas);
resizeCanvas();

drawLoop = function(){
	console.log(screenWidth);
	if(plotDensity <= 0){
		plotDensity = NaN;
	}

	//Setup
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Draw axis
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.lineWidth = axisStrokeWeight;

	ctx.beginPath();
	ctx.moveTo(screenWidth / 2, 0);
	ctx.lineTo(screenWidth / 2, screenWidth);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(0, screenWidth / 2);
	ctx.lineTo(screenWidth, screenWidth / 2);
	ctx.stroke();

	//Draw grid
	ctx.font = labelTextSize + 'px serif';
	ctx.fillStyle = "rgb(0, 0, 0)";
	var textSpacing = screenWidth / divisionCount;
	ctx.strokeStyle = "rgb(48,48,48)";
	ctx.lineWidth = graphStrokeWeight;
	for (var i = -divisionCount / 2; i <= divisionCount / 2; i++) {
		ctx.fillText(((i / divisionCount * 2) * modifierZoomX).toString(), (textSpacing * i) + pixelMid, pixelMid + labelTextSize);
		ctx.fillText(((-i / divisionCount * 2) * modifierZoomY).toString(), pixelMid - labelTextSize, (textSpacing * i) + pixelMid);
		var lineCoords = pixelMid + (screenWidth * i / divisionCount);

		ctx.beginPath();
		ctx.moveTo(lineCoords, 0);
		ctx.lineTo(lineCoords, screenWidth);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(0, lineCoords);
		ctx.lineTo(screenWidth, lineCoords);
		ctx.stroke();
	}

	//Draw functions
	ctx.lineWidth = functionStrokeWeight;
	for (var k = -pixelMid; k <= pixelMid; k = k + plotDensity) {
		for (var i = 0; i < functionObjects.length; i++) {
			ctx.strokeStyle = functionObjects[i].color;
			ctx.fillStyle = functionObjects[i].color;
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
					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.stroke();
				}
			} else {
				ctx.fillRect(x1, y1,functionStrokeWeight,functionStrokeWeight);
			}
		}
	}
	requestAnimationFrame(drawLoop);
}

requestAnimationFrame(drawLoop);
