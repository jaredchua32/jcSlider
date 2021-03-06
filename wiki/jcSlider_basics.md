My goal for this page is to help you understand how I've structured jcSlider and the logic used for its features.

## Table of Contents

1. [Structure](#structure)

2. [Image Sliding](#image-sliding)
  - [queue](#queue)
  - [pause](#pause)
  - [nav buttons](#nav-buttons)

## Structure

jcSlider is structured in the following manner:

```
Slider Container
  Slider
    Frame
      Image
    Frame
      Image
    Frame
      Image
```

Here is a gif I've made to help visualize the structure of jcSlider:

![jcSlider_structure.gif](https://raw.githubusercontent.com/jaredchua32/jcSlider/master/wiki/images/jcSlider_structure.gif)

## Image Sliding

### queue

Most of the sliders I have seen do not allow multiple clicks of the left and right slide buttons. However, because jcSlider uses a queue, users may click the side buttons to their heart's desire.

The functions jcSlider uses to slide the images left and right are `JCSlider.slideLeft()` and `JCSlider.slideRight()`.

The above functions are essentially the same but the ordering of the items added to the queue are slightly different.

`JCSlider.slideLeft()` is summarized by the following pseuducode:

```
1. If the nav buttons (the little dots towards the bottom of the slider)
are enabled, deactivate the current button that's lit up and activate
the next button (left or right, whichever is chosen by jcSlider - will
be explained in the nav buttons section).

2. Slide the image left.

3. Move the first image to the end of the slider and update the
current image index.

4. If there are no other items in the queue, unpause the slider's
auto scroll.
```

`JCSlider.slideRight()` on the other hand is summarized by the following pseudocode:

```
1. If the nav buttons (the little dots towards the bottom of the slider)
are enabled, deactivate the current button that's lit up.

2. Move the last image to the end of the slider and update the
current image index and activate the next button (left or right,
whichever is chosen by jcSlider - will be explained in the nav buttons
section).

3. Slide the image right.

4. If there are no other items in the queue, unpause the slider's
auto scroll.
```

### pause

Whenever a side or nav button is clicked, jcSlider's auto scroll feature is paused. As mentioned in the queue portion of this page, the auto scroll feature is resumed once there are no longer any more items in the queue. Because the queue is emptied before the final scrolling finishes, `jcSlider.options.scrollDuration` is added on to `jcSlider.options.pauseDuration` in order to ensure that the slider will indead pause for at least the amount assigned to `jcSlider.options.pauseDuration`.

### nav buttons

I've programed jcSlider to scroll either left or right - whichever is the shorter path to the destination image.

Below is the code snippet for calculating the left and right distances.

```javascript
var currentIndex = self.dispIndex,
    diff = clickedIndex - currentIndex,
    absDiff = Math.abs(diff);
    amountOfImages = self.images.length;

if(diff === 0) { 
  return; 
} else if(diff > 0) {
  // Button clicked is to the right of current index.       
  var rightDistance = absDiff,
    leftDistance = amountOfImages - absDiff;
} else {
  // Button clicked is to the left of current index.
  var rightDistance = amountOfImages - absDiff,
    leftDistance = absDiff;
}
```

jcSlider then scrolls left or right, depending on which is the shorter path.