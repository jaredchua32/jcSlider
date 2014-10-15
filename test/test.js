;(function($) {
	container = $('div.jcSlider').eq(0);
	// images = ['1.png', '2.png', '3.png', '4.png', '1.png', '2.png', '3.png', '4.png', '1.png', '2.png', '3.png', '4.png', '1.png', '2.png', '3.png', '4.png', '1.png', '2.png', '3.png', '4.png'];
	images = ['1.png', 'grid1.jpg', 'grid2.jpg', 'grid3.jpg']
	
	images.forEach(function(str, index) {
		images[index] = '../test_images/' + str;
	})
	options = {
		// scrollInterval: 2500,
		// autoScroll: false,
		// buttons: 'auto',
		// width:'800px',
		// scrollDuration: 700,
		// navButtons:false
		
		width: 'auto',
		frameBG: 'rgb(255,0,255)',
		// marginTop: '50px',
		// resizeDelay: 50,
		sideButtons: 'auto',
		leftBtn: $('div.testLeft'),
		rightBtn: $('div.testRight'),
		// navButtons: false,
		autoScroll: false,
		// scrollInterval: 1500,
		// scrollDuration: 600,
		// pauseDuration: 3000,
		// easing: 'linear'
		
	}
	slider1 = $.jcSlider(container, images, options);
	
	// var zz = 0;
	// var handelr;

	// handelr = setInterval(function() {
	// 	console.log(zz + '. ' + slider1.images[0][0].getBoundingClientRect().height)
	// 	if(zz === 50) {
	// 		handelr = clearInterval(handelr);
	// 	}
	// 	zz++;
	// },1)




	container2 = $('div.jcSlider').eq(1);
	// images2 = ['1.png','2.png','3.png','4.png'];
	images2 = ['5.jpg','6.jpg','7.jpg','8.jpg','9.jpg'];
	images2.forEach(function(str, index) {
		images2[index] = '../test_images/' + str;
	})
	options2 = {
		marginTop: '50px',
		autoScroll: true,
		scrollInterval: 2700,
		scrollDuration: 600,
		easing: 'swing'
	}
	slider2 = $.jcSlider(container2, images2, options2);

})(jQuery);
