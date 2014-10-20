I've designed jcSlider to be as easy to use as possible.

Below are the **steps to properly set up jcSlider for your applications**:

1. [Install jcSlider](#install-jcslider)

2. [Create Your Very Own jcSlider Instance](#create-your-very-own-jcslider-instance)

## Install jcSlider

In order to install jcSlider, you must:

1. Because jcSlider was built using jQuery, you must download and add the [jQuery library](http://jquery.com/download/) to your project in order to use jcSlider.

  *You may also include the current jQuery version from [Google's CDN](https://developers.google.com/speed/libraries/devguide#jquery) or [jQuery's CDN](http://jquery.com/download/#jquery-39-s-cdn-provided-by-maxcdn).

2. Download the [source code](https://github.com/jaredchua32/jcSlider/tree/master/src_zip) and images for the plugin.

3. Place the following into your project folder:

  * jcSlider.js

  * jcSlider.css

  * leftArrow.png

  * rightArrow.png

  \* You do not need to add leftArrow.png and rightArrow.png to your project if you won't be using jcSlider's `sideButtons` option.

4. Update the urls for leftArrow.png and rightArrow.png in jcSlider.css. I've commented this for your convenience.

That's it!

## Create Your Very Own jcSlider Instance

The jcSlider constructor has the following **parameters**:

`container` is a jQuery object containing a `<div>` with the class of `jcSlider`. This `<div>` is where the jcSlider you've instantiated is going to be in your page.

`images` is an array containing the urls of the images to be used with the particular instance of jcSlider. There is no limit on how many images you can put in the slider. However, if you are using jcSlider's `navButtons`, after about 30 the navigation buttons will overflow from the container.

Please see the [wiki page](https://github.com/jaredchua32/jcSlider/wiki/Configuring-jcSlider's-Options) for full details on the `options` object.

**Now you can create your slider instance!**

```
container = $('div.jcSlider');
myImages = ['1.png', '2.png', '3.png', '4.png'];
// Please visit the wiki page for full details on options!

myJCSlider = $.jcSlider(container, images, options);
```

Voila! Assuming you've done everything outlined here, you should now have a working jcSlider in your page.