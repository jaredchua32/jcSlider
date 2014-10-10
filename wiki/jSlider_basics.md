My goal for this page is to help you understand how I've structured jSlider and some of the logic used for its features.

## Table of Contents

1. Structure

2. Image Sliding
  - queue
  - pause
  - nav buttons
## Structure

jSlider uses the following element hierarchy:

```
Slider Container
	Slider
		Frame
			Image
		Frame
			Image
		...
		Frame
			Image
```


==================================

  1. [Constructor](#constructor)

  2. [Initialize the Images and Their Containers](#initialize-the-images-and-their-containers)

## Initialization

`JSlider.init()`

The following section will discuss how jSlider is structured and initialized.

### Constructor

The jSlider constructor takes the following three arguments: `container`, `imageUrls`, and `options`. Please visit the [Using jSlider INSERT LINK HERE](#) wiki page for full details.

### Initialize the Images and Their Containers

jSlider's images are initialized with the following calls:

```
JSLider.initImages();
JSlider.getImageDimensions();
JSLider.initImageFrames();
JSlider.frameImages();
```

#### `JSlider.initImages()`

This is where the `<img>` elements are prepared for the slider.

Because image dimensions are only available after the images finish loading, event listeners are added to every image as they are instantiated.

Once an image (let's call this image x) finishes loading, its height is compared to the height of the first image in the array. If the height of image x is less than the height of the first image, image x is added to the `JSlider.shortImages` array. This array is used for image styling calculations, which will be explained [later on LINK HERE TO RESIZE STUFF]().

#### `JSlider.getImageDimensions()`

If `jSlider.options.width` is set to `auto`, the slider's `max-width` is set to the natural (native) width of the first image in the array.

#### `JSlider.initImageFrames()`

