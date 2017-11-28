// v1.09 BtD™
// Desmos graph of default functions:
// https://www.desmos.com/calculator/q8krvyo0cl

var functionObjects = [ //Functions to graph
    {func: function(x){return Math.sin(x);}, color: color(255, 0, 0)},
    {func: function(x){return x*x;}, color: color(0, 0, 255)},
    {func: function(x){return Math.pow(x, x);}, color: color(0, 255, 0)},
    {func: function(x){return x/(x-4);}, color: color(255, 179, 0)},
    {func: function(x){return Math.log(x);}, color: color(221, 0, 255)},
];

var screenWidth = 400; //Width/height of display in pixels
var divisionCount = 8; //Number of grid divisions to display (multiple of two)

var useSecantRendering = true; //Secant-line rendering or dot rendering

var combineZoom = true; //Combined zoom or individual zoom
var modifierZoom = 8; //Combined zoom
var modifierZoomX = 4; //X zoom
var modifierZoomY = 4; //Y zoom

//Plot density (>= 1 looks good for secant-line mode, <= 0.1 looks good for dot mode)
var plotDensity = 1; 

var axisStrokeWeight = 2; //X and Y axis stroke weight
var graphStrokeWeight = 1; //Grid line stroke weight
var functionStrokeWeight = 2; //Function stroke weight
var labelTextSize = 10; //Label text size

//------------------------------------------------------------
//                  Caution! Dragons below!
//------------------------------------------------------------

var pixelMid = screenWidth/2;
var spacePerDivision = screenWidth/divisionCount;
void(combineZoom&&((modifierZoomX=modifierZoom)&&(modifierZoomY=modifierZoom)));
var baseScaleX = 1/(screenWidth/2);
var baseScaleY = screenWidth/2;
var scaleX = baseScaleX * modifierZoomX;
var scaleY = baseScaleY * 1/modifierZoomY;
var secantBoundOffset = plotDensity*10;

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
    text(((i/divisionCount*2)*modifierZoomX).toString(), (textSpacing*i)+pixelMid, pixelMid+labelTextSize);
    text(((-i/divisionCount*2)*modifierZoomY).toString(), pixelMid-labelTextSize, (textSpacing*i)+pixelMid);
    var lineCoords = pixelMid+(screenWidth*i/divisionCount);
    line(lineCoords, 0, lineCoords, screenWidth);
    line(0, lineCoords, screenWidth, lineCoords);
}

//Draw functions
strokeWeight(functionStrokeWeight);
for(var k = -pixelMid; k <= pixelMid; k=k+plotDensity){
    for(var i = 0; i < functionObjects.length; i++){
        stroke(functionObjects[i].color);
        var x1=k+pixelMid;
        var y1=(-functionObjects[i].func(k*scaleX)*scaleY)+pixelMid;
        if(useSecantRendering){
            var x2=(k-plotDensity)+pixelMid;
            var y2=(-functionObjects[i].func((k-plotDensity)*scaleX)*scaleY)+pixelMid;
            if(
                x1 > (0-secantBoundOffset) && 
                x1 <= (screenWidth+secantBoundOffset) &&
                x2 > (0-secantBoundOffset) &&
                x2 <= (screenWidth+secantBoundOffset) &&
                y1 > (0-secantBoundOffset) && 
                y1 <= (screenWidth+secantBoundOffset) &&
                y2 > (0-secantBoundOffset) &&
                y2 <= (screenWidth+secantBoundOffset)
            ){
                line(x1, y1, x2, y2);
            }
        }else{
            point(x1, y1);
        }
    }
}
