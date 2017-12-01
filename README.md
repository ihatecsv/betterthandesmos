# Better than Desmos™
A graphing calculator, based on evaluating JavaScript expressions!

![Screenshot](https://i.imgur.com/cIVYcO0.png)

You can access the calculator [here](https://drakeluce.com/betterthandesmos/), and the default functions can be seen on Desmos [here](https://www.desmos.com/calculator/q8krvyo0cl).

Original calculator on Khan Academy [here](https://www.khanacademy.org/computer-programming/better-than-desmos-a-graphing-calculator/5078845089054720)!

## Function examples
+ [Parabola](https://drakeluce.com/betterthandesmos/?function=x*x)
+ [Sine wave](https://drakeluce.com/betterthandesmos/?function=Math.sin(x))
+ [1st and 2nd derivatives in a range](https://drakeluce.com/betterthandesmos/?function=x%20%3E%200%20%26%26%20x%20%3C%20Math.PI%20%3F%20-Math.cos(x)%20%2B%201%20%3A%20NaN%0Ax%20%3E%200%20%26%26%20x%20%3C%20Math.PI%20%3F%20Math.sin(x)%20%3A%20NaN%0Ax%20%3E%200%20%26%26%20x%20%3C%20Math.PI%20%3F%20Math.cos(x)%20%3A%20NaN%0A)
+ [Smooth rolling wave](https://drakeluce.com/betterthandesmos/?function=Math.sin(x%20%2B%20Date.now()%2F500)*x)
+ [Function gen. waves](https://drakeluce.com/betterthandesmos/?function=(Math.sin(((Date.now()%2F3000)%20-%20x)*Math.PI))%2B2%0A(Math.floor((Date.now()%2F2000)%20-%20x)%20%25%202%20%3F%20-1%20%3A%201)%0A((((Date.now()%2F1000)%20-%20x-1)%2F2%20-%20Math.floor(((Date.now()%2F1000)%20-%20x-1)%2F2))*2-1)-2)
+ [Rolling noise](https://drakeluce.com/betterthandesmos/?function=x%25Math.tan(x%20%2B%20Date.now()%2F100)*2)
+ [Stretchy sine wave](https://drakeluce.com/betterthandesmos/?function=Math.sin(x*Date.now()%2F1000))
+ [Oscillating-oscillating trig. functions](https://drakeluce.com/betterthandesmos/?function=Math.sin(x)*Math.sin((Date.now()%2F1000))%0AMath.cos(x)*Math.cos((Date.now()%2F1000))%0AMath.tan(x)*Math.tan((Date.now()%2F1000)))
+ [Square-sine wave](https://drakeluce.com/betterthandesmos/?function=Math.round(x*x%2B%20Date.now()%2F200)%252%20%3F%20-Math.sin(x)%20%3A%20Math.sin(x))
+ [Squeezing squeeze function](https://drakeluce.com/betterthandesmos/?function=Math.sin(Date.now()%2F1000)*x*x%0AMath.sin(Date.now()%2F1000)*-x*x%0AMath.sin(Date.now()%2F1000)*x*x*Math.sin(1%2Fx)%0AMath.sin(Date.now()%2F1000)*-x*x*Math.sin(1%2Fx))
+ [Clock (hr., min., sec. from 0 to 6)](https://drakeluce.com/betterthandesmos/?function=(x%20%3C%20new%20Date().getHours()%2F4)%20%2B%204%0A(x%20%3C%20new%20Date().getMinutes()%2F10)%20%2B%202%0A(x%20%3C%20new%20Date().getSeconds()%2F10))

## Disclaimer
This is not actually better than Desmos. Desmos is great; this is just a for-fun project. :blush:
