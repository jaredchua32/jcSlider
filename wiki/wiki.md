JSlider constructor takes:
1. jQuery object of the <div class = "jSlider"></div>
2. urls of the images as an array
3. options object

* Fix css - location of leftArrow.png and rightArrow.png

==============================================
JSlider options

You may use the default settings I have provided, modify them for all JSlider instances, or give each JSlider instance its own settings. The default values for each property of the jSlider.options object are outlined in their respective section of this wiki page. The default settings can also be found at the bottom of jSlider.js.

You may easily override the settings for all instances of jSlider by modifying the properties of the $.jSlider.options object.

Example: change the frame background and top margin for all jSliders.
[code] $.jSlider.options.frameBG = 'rgba(123,123,123,1)'
		$.jSlider.options.marginTop = '75px'

Because the jSlider constructor accepts an options object, you may also override the default settings by passing in an object with all the properties that you wish to override.

Example: Override width, frame background, top margin, resize delay, disable navigation buttons, and disable the auto scroll feature.

[code] 
customOptions = {
	width: '720px',
	frameBG: '#FFFFFF',
	marginTop: '100px',
	resizeDelay: 100,
	navButtons: false,
	autoScroll: false
}

After creating the custom options object, simply pass it along with the jQuery object holding the container div and the array of image URLs to use for the slider. JSlider will take care of overriding the settings for you!
[code]
$.jSlider($container, arrayOfImages, customOptions);

The details of every setting in jSlider.options are outlined below.

width
Possible values: Any valid CSS [code]max-width value in string format (i.e. '640px', '640', 3em', '50%', '50vw', etc)
Description: The width property is what determines the max-width of the main image slider container. The default value of this property is 'auto', which is 100% the width of the first image in the [code]images array.

frameBG
Possible values: Any valid CSS color value in string format (i.e. '#000000', 'rgb(255,255,255)', 'rgba(255,255,255,1)', 'red', 'black', 'hsl(0, 100%, 50%)', 'hsla(240, 100%, 50%, 0.7)', etc).
Description: The frameBG property is the [code]background-color of the frames. The easiest way to understand this is by envisioning a picture frame with a picture that does not occupy the entire frame - frameBG is simply the parts of the frame that you can still see. Because JSlider has the ability to display images that have dimensions which are different from either the first image's dimensions or the width of the main image slider container, 'rectangles' are displayed around the image in order to preserve the image's aspect ratio. The default value of this property is '#000000'. [INSERT EXAMPLE HERE]

marginTop
Possible values: Any valid CSS value for [code]margin-top in string format (i.e '50px', '25', '3em', etc).
Description:default value: The marginTop property is the [code]margin-top value of the JSlider container. I decided not to implement option properties for the right, bottom, and left margin in order to keep the styles where they belong. The default value of this property is 0.

resizeDelay
Possible values:
Description:default value: resizeDelay: 	50,

sideButtons
Possible values:
Description:default value: sideButtons: 	'auto',

leftBtn
Possible values:
Description:default value: leftBtn: 		undefined,

rightBtn
Possible values:
Description:default value: rightBtn: 		undefined,

navButtons
Possible values:
Description:default value: navButtons: 	true,

autoScroll
Possible values:
Description:default value: autoScroll: 	true,

scrollInterval
Possible values:
Description:default value: scrollInterval: 3000,

scrollDuration
Possible values:
Description:default value: scrollDuration: 600,

pauseDuration
Possible values:
Description:default value: easingpauseDuration: 	1000,

Possible values:
Description:default value: easing: 		'linear'

==============================================