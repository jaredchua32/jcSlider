I've designed jSlider to be as easy to use as possible.

Below are the **steps to properly set up jSlider for your applications**:

1. [Install jSlider](#install-jslider)

2. [Create Your Very Own jSlider Instance](#create-your-very-own-jslider-instance)

## Install jSlider

In order to install jSlider, you must:

1. Download the source code for the plugin ([.zip file]() or individual files below).

2. Place the following into your project folder:

  * [jSlider.js]()

  * [jSlider.css]()

  * [leftArrow.png]()

  * [rightArrow.png]()

  \* You do not need to add leftArrow.png and rightArrow.png to your project if you won't be using jSlider's `sideButtons` option.

3. Update the urls for leftArrow.png and rightArrow.png in jSlider.css. I've commented this for your convenience.

That's it!

## Create Your Very Own jSlider Instance

The jSlider constructor has the following parameters:

### `container`

`container` is a jQuery object containing a `<div>` with the class of `jSlider`. This `<div>` is where the jSlider you've instantiated is going to be in your page.

`container = $('div.jSlider');`

### `images`

`images` is an array containing the urls of the images to be used with the particular instance of jSlider. There is no limit on how many images you can put in the slider. However, if you are using jSlider's `navButtons`, after about 30 the navigation buttons will overflow from the container.

`myImages = ['1.png', '2.png', '3.png', '4.png'];`

### `options`

Please see the [wiki page](https://github.com/jaredchua32/jSlider/wiki/Configuring-jSlider's-Options) for full details on the `options` object.

**Now you can create your slider instance!**

`myJSlider = $.jSlider(container, images, options);`

Voila! Assuming you've done everything outlined here, you should now have a working jSlider in your page.