# Browser Canvas Bug
This is an example code to reproduce a browser bug that happens 100% of time in Firefox and a bit less often in Chrome.

## Steps to reproduce:
1. Draw a shape with the red color.
2. Click on the `fill` button, then change the color to green or blue. Click on the drawn shape to fill it.
3. Repeat for the rest of the colors.

## Expected behaviour:
All colors are drawn solid and it's easy to fill them with another color.

## What happens instead:
Some colors (like the red color here) are drawn with a border or shadow. Drawn shapes, are not of solid color and can't be filled with another color.