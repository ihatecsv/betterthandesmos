//v1.07 BtD™

var functionObjects = [ //Functions to graph
    {func: function(x){return Math.sin(x);}, color: color(255, 0, 0)},
    {func: function(x){return x*x;}, color: color(0, 0, 255)},
    {func: function(x){return Math.pow(x, x);}, color: color(0, 255, 0)},
    {func: function(x){return x/(x-(-4));}, color: color(255, 179, 0)},
    {func: function(x){return log(x);}, color: color(221, 0, 255)},
];

var screenWidth = 400; //Width/height of display in pixels
var divisionCount = 8; //Number of grid divisions to display (multiple of two)

var combineZoom = true; //Combined zoom or individual zoom
var modifierZoom = 4; //Combined zoom
var modifierZoomX = 4; //X zoom
var modifierZoomY = 4; //Y zoom
var plotScale = 0.1; //Dot density

var axisStrokeWeight = 2; //X and Y axis stroke weight
var graphStrokeWeight = 1; //Grid line stroke weight
var functionStrokeWeight = 2; //Function stroke weight
var labelTextSize = 10; //Label text size

//------------------------------------------------------------
//                  Caution! Dragons below!
//------------------------------------------------------------

var pixelMidPoint = screenWidth/2;
var spacePerDivision = screenWidth/divisionCount;
void(combineZoom&&((modifierZoomX=modifierZoom)&&(modifierZoomY=modifierZoom)));
var baseScaleX = 1/(screenWidth/2);
var baseScaleY = screenWidth/2;
var scaleX = baseScaleX * modifierZoomX;
var scaleY = baseScaleY * 1/modifierZoomY;

//Draw axis
strokeWeight(axisStrokeWeight);
line(screenWidth/2, 0, screenWidth/2, screenWidth);
line(0, screenWidth/2, screenWidth, screenWidth/2);

//Draw grid
textSize(labelTextSize);
fill(0, 0, 0);
var textSpacing = screenWidth/divisionCount;
strokeWeight(graphStrokeWeight);
stroke(48, 48, 48);
for(var i = -divisionCount/2; i <= divisionCount/2; i++){
    text(((i/divisionCount*2)*modifierZoomX).toString(), (textSpacing*i)+pixelMidPoint, pixelMidPoint+labelTextSize);
    text(((-i/divisionCount*2)*modifierZoomY).toString(), pixelMidPoint-labelTextSize, (textSpacing*i)+pixelMidPoint);
    var lineCoords = pixelMidPoint+(screenWidth*i/divisionCount);
    line(lineCoords, 0, lineCoords, screenWidth);
    line(0, lineCoords, screenWidth, lineCoords);
}

//Draw functions
strokeWeight(functionStrokeWeight);
for(var k = -pixelMidPoint; k <= pixelMidPoint; k=k+plotScale){
    for(var i = 0; i < functionObjects.length; i++){
        stroke(functionObjects[i].color);
        point(k+pixelMidPoint, (-functionObjects[i].func(k*scaleX)*scaleY)+pixelMidPoint);
    }
}
