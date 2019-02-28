# Better than Desmos
A graphing calculator, based on evaluating JavaScript expressions!

![Screenshot](https://i.imgur.com/cIVYcO0.png)

You can access the calculator [here](https://drakeluce.com/projects/betterthandesmos/), and the default functions can be seen on Desmos [here](https://www.desmos.com/calculator/q8krvyo0cl).

Original calculator on Khan Academy [here](https://www.khanacademy.org/computer-programming/better-than-desmos-a-graphing-calculator/5078845089054720)!

## Color rotation
![#e6194b](https://placehold.it/16/e6194b/000000?text=+)
![#3cb44b](https://placehold.it/16/3cb44b/000000?text=+)
![#0082c8](https://placehold.it/16/0082c8/000000?text=+)
![#f58230](https://placehold.it/16/f58230/000000?text=+)
![#911eb4](https://placehold.it/16/911eb4/000000?text=+)
![#ffe119](https://placehold.it/16/ffe119/000000?text=+)
![#46f0f0](https://placehold.it/16/46f0f0/000000?text=+)
![#f032e6](https://placehold.it/16/f032e6/000000?text=+)
![#d2f53c](https://placehold.it/16/d2f53c/000000?text=+)
![#fabebe](https://placehold.it/16/fabebe/000000?text=+)
![#008080](https://placehold.it/16/008080/000000?text=+)
![#808000](https://placehold.it/16/808000/000000?text=+)

[Example here!](https://drakeluce.com/projects/betterthandesmos/?function=Math.sin(x)%0AMath.sin(x)%2B0.1%0AMath.sin(x)%2B0.2%0AMath.sin(x)%2B0.3%0AMath.sin(x)%2B0.4%0AMath.sin(x)%2B0.5%0AMath.sin(x)%2B0.6%0AMath.sin(x)%2B0.7%0AMath.sin(x)%2B0.8%0AMath.sin(x)%2B0.9%0AMath.sin(x)%2B1%0AMath.sin(x)%2B1.1&divisionCount=8&useSecantRendering=true&plotDensity=1&combineZoom=false&modifierZoom=8&modifierZoomX=4&modifierZoomY=4&axisStrokeWeight=2&graphStrokeWeight=1&functionStrokeWeight=4&labelTextSize=10)

## Function examples
+ [Parabola](https://drakeluce.com/projects/betterthandesmos/?function=x*x)
+ [Sine wave](https://drakeluce.com/projects/betterthandesmos/?function=Math.sin(x))
+ [1st and 2nd derivatives in a range](https://drakeluce.com/projects/betterthandesmos/?function=x%20%3E%200%20%26%26%20x%20%3C%20Math.PI%20%3F%20-Math.cos(x)%20%2B%201%20%3A%20NaN%0Ax%20%3E%200%20%26%26%20x%20%3C%20Math.PI%20%3F%20Math.sin(x)%20%3A%20NaN%0Ax%20%3E%200%20%26%26%20x%20%3C%20Math.PI%20%3F%20Math.cos(x)%20%3A%20NaN%0A)
+ [Smooth rolling wave](https://drakeluce.com/projects/betterthandesmos/?function=Math.sin(x%20%2B%20Date.now()%2F500)*x)
+ [Function gen. waves](https://drakeluce.com/projects/betterthandesmos/?function=(Math.sin(((Date.now()%2F3000)%20-%20x)*Math.PI))%2B2%0A(Math.floor((Date.now()%2F2000)%20-%20x)%20%25%202%20%3F%20-1%20%3A%201)%0A((((Date.now()%2F1000)%20-%20x-1)%2F2%20-%20Math.floor(((Date.now()%2F1000)%20-%20x-1)%2F2))*2-1)-2)
+ [Rolling noise](https://drakeluce.com/projects/betterthandesmos/?function=x%25Math.tan(x%20%2B%20Date.now()%2F100)*2) ([pt.2](https://drakeluce.com/projects/betterthandesmos/?function=x%25Math.tan(x%20%2B%20Date.now()%2F100)*1%0Ax%25Math.tan(x%20%2B%20Date.now()%2F100)*2%0Ax%25Math.tan(x%20%2B%20Date.now()%2F100)*3%0Ax%25Math.tan(x%20%2B%20Date.now()%2F100)*4%0Ax%25Math.tan(x%20%2B%20Date.now()%2F100)*5&divisionCount=8&useSecantRendering=false&plotDensity=1&combineZoom=true&modifierZoom=8&modifierZoomX=4&modifierZoomY=4&axisStrokeWeight=2&graphStrokeWeight=1&functionStrokeWeight=64&labelTextSize=10]))
+ [Stretchy sine wave](https://drakeluce.com/projects/betterthandesmos/?function=Math.sin(x*Date.now()%2F1000)&divisionCount=8&useSecantRendering=false&plotDensity=1&combineZoom=true&modifierZoom=8&modifierZoomX=4&modifierZoomY=4&axisStrokeWeight=2&graphStrokeWeight=1&functionStrokeWeight=16&labelTextSize=10)
+ [Oscillating-oscillating trig. functions](https://drakeluce.com/projects/betterthandesmos/?function=Math.sin(x)*Math.sin((Date.now()%2F1000))%0AMath.cos(x)*Math.cos((Date.now()%2F1000))%0AMath.tan(x)*Math.tan((Date.now()%2F1000)))
+ [Square-sine wave](https://drakeluce.com/projects/betterthandesmos/?function=Math.round(x*x%2B%20Date.now()%2F200)%252%20%3F%20-Math.sin(x)%20%3A%20Math.sin(x))
+ [Squeezing squeeze function](https://drakeluce.com/projects/betterthandesmos/?function=Math.sin(Date.now()%2F1000)*x*x%0AMath.sin(Date.now()%2F1000)*-x*x%0AMath.sin(Date.now()%2F1000)*x*x*Math.sin(1%2Fx)%0AMath.sin(Date.now()%2F1000)*-x*x*Math.sin(1%2Fx)&divisionCount=8&useSecantRendering=true&plotDensity=1&combineZoom=true&modifierZoom=2&modifierZoomX=4&modifierZoomY=4&axisStrokeWeight=2&graphStrokeWeight=1&functionStrokeWeight=4&labelTextSize=10)
+ [Clock (hr., min., sec. from 0 to 6)](https://drakeluce.com/projects/betterthandesmos/?function=(x%20%3C%20new%20Date().getHours()%2F4)%20%2B%204%0A(x%20%3C%20new%20Date().getMinutes()%2F10)%20%2B%202%0A(x%20%3C%20new%20Date().getSeconds()%2F10))
+ [x^x thingies](https://drakeluce.com/projects/betterthandesmos/?function=Math.pow(Math.cos(Date.now()%2F1000)%2Cx)%0AMath.pow(Math.cos(Date.now()%2F1000)%2Bx%2Cx)%0AMath.pow(Math.cos(Date.now()%2F1000)-x%2Cx)%0AMath.pow(Math.cos(Date.now()%2F1000)*x%2Cx)%0AMath.pow(Math.cos(Date.now()%2F1000)%2Fx%2Cx)%0AMath.pow(Math.pow(Math.cos(Date.now()%2F1000)%2Cx)%2Cx)&divisionCount=8&useSecantRendering=true&plotDensity=1&combineZoom=true&modifierZoom=8&modifierZoomX=4&modifierZoomY=4&axisStrokeWeight=2&graphStrokeWeight=1&functionStrokeWeight=4&labelTextSize=10)

Make a [pull request](https://github.com/ihatecsv/betterthandesmos/pulls) if you want to add your function here!

## Disclaimer
This is not actually better than Desmos. Desmos is great; this is just a for-fun project. :blush:
