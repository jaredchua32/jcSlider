## Table of Contents

1. [Overview](#overview)

2. [jSlider.options Properties](#jslideroptions-properties)

  1. [width](#i-width)

  2. [frameBG](#ii-framebg)

  3. [marginTop](#iii-margintop)

  4. [sideButtons](#iv-sidebuttons)

  5. [leftBtn / rightBtn](#v-leftbtn--rightbtn)

  6. [navButtons](#vi-navbuttons)

  7. [autoScroll](#vii-autoscroll)

  8. [scrollInterval](#viii-scrollinterval)

  9. [scrollDuration](#ix-scrollduration)

  10. [pauseDuration](#x-pauseduration)

  11. [easing](#xi-easing)

## Overview

You may use the default settings that I have provided, modify them for all JSlider instances, or configure each jSlider instance individually. Everything you need to know about how to configure jSlider to your liking is outlined below.

You may easily override the settings for all instances of jSlider by modifying the properties of the `$.jSlider.options object`.

**Example**: Change the frame background and top margin for all jSliders.

`$.jSlider.options.frameBG = 'rgba(123,123,123,1)';`

`$.jSlider.options.marginTop = '75px';`

Because the jSlider constructor accepts an options object, you may also override the default settings for a particular instance of jSlider by passing in an object with all the properties that you wish to override.

**Example**: Override width, frame background, top margin, resize delay, disable navigation buttons, and disable the auto scroll feature.

```
customOptions = {
  width: '720px',
  frameBG: '#FFFFFF',
  marginTop: '100px',
  resizeDelay: 100,
  navButtons: false,
  autoScroll: false
}
```

After creating the custom options object, simply pass it along with the jQuery object holding the container div and the array of image URLs to use for the slider. JSlider will take care of overriding the settings for you!

`$.jSlider($container, arrayOfImages, customOptions);`

## jSlider.options Properties

The details of every setting in jSlider.options are outlined below.

### i. `width`

**Possible values**: Any valid CSS `max-width` value in string format such as `'640px'`, `'640'`, `'3em'`, `'50%'`, `'50vw'`, `etc`.

**Description**: The `width` property is what determines the `max-width` of the main image slider container. The default value of this property is `'auto'`, which is 100% the width of the first image in the `images` array.

***

### ii. `frameBG`

**Possible values**: Any valid CSS `background-color` value in string format such as `'#000000'`, `'rgb(255,255,255)'`, `'rgba(255,255,255,1)'`, `'red'`, `'black'`, `'hsl(0, 100%, 50%)'`, `'hsla(240, 100%, 50%, 0.7)'`, `etc`.

**Description**: The `frameBG` property is the `background-color` of the frames. The easiest way to understand this is by envisioning a picture frame with a picture that does not occupy the entire frame - `frameBG` is simply the parts of the frame that have not been covered by the image. Because jSlider has the ability to display images with varying dimensions, 'rectangles' are displayed around the image in order to preserve the image's aspect ratio. The default value of this property is `'#000000'`. [INSERT EXAMPLE HERE]

***

### iii. `marginTop`

**Possible values**: Any valid CSS value for `margin-top` in string format such as `'50px'`, `'25'`, `'3em'`, `etc`.

**Description**: The `marginTop` property is the `margin-top` value of the JSlider container. I decided not to implement option properties for the right, bottom, and left margin in order to keep the styles where they belong. The default value of this property is `0`.

***

### iv. `sideButtons`

**Possible values**: `'none'` or `'auto'`.

**Description**: The `sideButtons` property is what determines if jSlider will automatically generate the side buttons that allow the user to view the next or previous image. If either `leftBtn` or `rightBtn` are defined, this property is overridden and no side buttons will be generated. The `sideButtons` property has the default value of `'auto'`.

***

### v. `leftBtn / rightBtn`

**Possible values**: A jQuery object containing (an) element(s) in the DOM such as `$('button#myButton')`, `$('div#leftButton1')`, `etc`.

**Description**: The elements contained within these properties are bound to call the `slideLeft()` and `slideRight()` functions respectively when clicked. These properties have the default value of `undefined`.

***

### vi. `navButtons`

**Possible values**: `true` or `false`.

**Description**: The `navButtons` property is what generates the 'dots' around the bottom of the slider for navigation. The default value of this property is `true`

***

### vii. `autoScroll`

**Possible values**: `true` or `false`.

**Description**: The `autoScroll` property enables or disables the automatic scrolling of the slider. The default value of this property is `true`.

***

### viii. `scrollInterval`

**Possible values**: Any number that represents milliseconds such as `1000`, `123.45`, `etc`.

**Description**: The `scrollInterval` property determines how often the slider scrolls to the next image. This property has no effect on the slider if `autoScroll` is set to `false`. The default value of this property is `3000`, or 3 seconds.

***

### ix. `scrollDuration`

**Possible values**: Any number that represents milliseconds such as `1000`, `123.45`, `etc`.

**Description**: The `scrollDuration` property is how long it takes the slider to scroll to the next image. The default value of this property is `600` or 0.6 seconds.

**WARNING**: `scrollDuration` must always be considerably less than `scrollInterval`! The amount of time the 'image' will remain in place is `scrollInterval - scrollDuration`.

***

### x. `pauseDuration`

**Possible values**: Any number that represents milliseconds such as `1000`, `123.45`, `etc`.

**Description**: JSlider is programmed to 'pause' after the last animation whenever a side or nav button is clicked. This property determines how long the slider will pause before the automatic scrolling feature resumes. The default value of this property is `1000`, or 1 second.

***

### xi. `easing`

**Possible values**: `'linear'` or `'swing'`.

**Description**: This property is just an extension of jQuery's easing property for animations. Please visit the [DEMO] to see the difference between `'linear'` and `'swing'`. The default value of this property is `'linear'`.