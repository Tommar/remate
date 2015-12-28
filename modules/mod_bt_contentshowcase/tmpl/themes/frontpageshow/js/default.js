/*
** Author: hungtx@vsmarttech.com
** Website: bowthemes.com 
** Version: 1.0
** License: http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
** Base on slidesjs.com */

(function($){
	$.fn.btslidersOption = {
		start:1,
		autoPlay:true,
		hoverPause: true,
		easing: 'easeInQuad',
		captionEasing: 'easeInOutSine',
		slideSpeed: 500,
		captionSpeed:400,
		interval:3000,
		touchScreen:0,
		effect:'slide' // slide or fade
		
	};
	$.fn.btsliders = function( option ) {
		option = $.extend( {}, $.fn.btslidersOption, option);
		return this.each(function(){
			var wrapper = $(this);
			$(wrapper).bind("dragstart", function(event, ui){
			  return false;//edited
			});
			var sliders = $('.bt-window',wrapper);
			var navigation = wrapper.find('.bt-nav');
			var navPipe =  $('.bt-navpipe',wrapper);
			var caption = wrapper.find('.bt-caption');
			var img = new Image();
			var start = option.start-1, next = 0,preview = 0, current = 0,total = sliders.children().size(),direction,move,playing = false,intervalId,navTimeoutId,naviPosition,slidersPosition,widthView;
			$(img).load(function(){
				startSlider();
			}).error(function () {
				alert('invalid image');
			}).attr('src',sliders.find('img:first').attr('src'));

			function startSlider(){
				// set height
				current = start;
				sliders.height(sliders.find('.bt-slide:first').outerHeight());
				if(option.effect == 'fade'){
					sliders.children().css({
						display:'none'
					})
				}
				sliders.children(':eq(' + start + ')').fadeIn(option.slideSpeed, option.easing, function(){
				$(this).css({
					zIndex: 5
					});
					$(caption.get(current)).slideDown(option.captionSpeed,option.captionEasing);
				});
				
				
				$(navigation.get(current)).addClass('active');
				wrapper.find('.next').click(function(){
					if (option.autoPlay) {	 pause();	}
					animate('next');
				})
				wrapper.find('.prev').click(function(){
					if (option.autoPlay) {	 pause();	}
					animate('prev');
				});
				navigation.click(function(){
					if (option.autoPlay) { pause();}
					animate($(this).index());
				})
				$(window).resize(function(){
					setTimeout(function(){
						sliders.height(sliders.find('.bt-slide:visible').outerHeight());
						naviPosition = $('.bt-navpipe',wrapper).position().left;
						slidersPosition = sliders.position().left;
						widthView = wrapper.width();
					},200);
				});
				if (option.hoverPause && option.autoPlay) {
					wrapper.bind('mouseover',function(){
						stop();
					});
					wrapper.bind('mouseleave',function(){
						pause();
					});
				}
				if (option.autoPlay){
					intervalId = setInterval(function(){
					animate('next');
					}, option.interval);
					sliders.data('intervalId',intervalId);
				}
				
				//populate navigation
				var maxHeightNav = Math.max.apply(null, $('.bt-nav',navPipe).map(function (){return $(this).outerHeight();}).get());
				navPipe.css({
					width:$(navigation.get(0)).outerWidth(true)* navigation.size()
				});
				navPipe.children().css({height:maxHeightNav});
				navPipe.parent().css({height:maxHeightNav});
				
				/* base on skitter slideshow http://thiagosf.net */
				navPipe.mousemove(function(e){
				if (navPipe.width() > navPipe.parent().width()){ 
					var navWidth= $(navigation.get(0)).outerWidth(true);
					var pipeWidth = navPipe.width();
					var viewWidth = navPipe.parent().width();
					var novo_width,x_value = 0,	y_value = wrapper.offset().top;
					var width_value = viewWidth - navWidth;
					x_value = navWidth + wrapper.offset().left;
					var x = e.pageX, y = e.pageY, new_x = 0;
					
					x = x - x_value;
					y = y - y_value;
					novo_width = pipeWidth - width_value;
					new_x = -((novo_width * x) / width_value);
					
					if (new_x > 0) new_x = 0;
					if (new_x < -(pipeWidth - viewWidth)) new_x = -(pipeWidth - viewWidth);
					navPipe.css({left: new_x});
					}
				});
				
			}
			function animate(direction){
				if(playing || direction == current){
					return false;	
				}
				playing = true;
				position = '0%';								
				move = '0%';
				
				switch(direction){
				case 'next':
					prev = current;
					next = current + 1;
					next = total === next ? 0 : next;
					position = '66.66%';
					move = '-200%';
					current = next;
					break;
				case 'prev':
					prev = current;
					next = current - 1;
					next = next === -1 ? total-1 : next;									
					current = next;
					break;
				default:
					next = direction
					prev = current;
					current = next;
					if (next > prev){
						position = '66.66%';
						move = '-200%';
					}
					break;
				}
				if(current<0) current= 0; 
					$(caption.get(prev)).slideUp(100,function(){
						if(option.effect == 'slide'){
							sliders.children(':eq('+ next +')').css({
									left: position,
									display: 'block'
							});
							sliders.animate({
								left: move,
								height: sliders.children(':eq('+ next +')').outerHeight()
							},option.slideSpeed, option.easing, function(){
								// after animation reset control position
								sliders.css({
									left: '-100%'
								});
								// reset and show next
								sliders.children(':eq('+ next +')').css({
									left: '33.33%',
									zIndex: 5
								});
								// reset previous slide
								sliders.children(':eq('+ prev +')').css({
									left: '33.33%',
									display: 'none',
									zIndex: 0
								});
								setTimeout(function(){ $(caption.get(next)).stop(true,true).slideDown(option.slideSpeed,option.captionEasing)},option.captionSpeed);
								playing=false;
							});
						}
						else
						{
							sliders.children(':eq('+ next +')').css({
								zIndex: 5
							}).fadeIn(option.slideSpeed, option.easing, function(){
								sliders.animate({
								height: sliders.children(':eq('+ next +')').outerHeight()
							}, 400, function(){
								sliders.children(':eq('+ prev +')').css({
									display: 'none',
									zIndex: 0
								});								
								sliders.children(':eq('+ next +')').css({
									zIndex: 0
								});									
								
								setTimeout(function(){ $(caption.get(next)).stop(true,true).slideDown(option.slideSpeed,option.captionEasing)},option.captionSpeed);
								playing=false;
							});
								 
							});
						}
					});
				changeNavigation();
			
			}
			function changeNavigation(){
				navigation.removeClass('active');
				$(navigation.get(current)).addClass('active');
				
				if (navPipe.width() > navPipe.parent().width()){ 
					var width= $(navigation.get(0)).outerWidth(true);
					var pipeWidth = navPipe.width();
					var viewWidth = navPipe.parent().width();
					var left = $(navigation.get(current)).position().left;
					var pipeLeft = navPipe.position().left;
					var move = null;
					if(left + pipeLeft > viewWidth - width){
						move = '-='+width;
					}				
					if(left > pipeWidth - viewWidth+2*width){
						move = -pipeWidth + viewWidth;
					}
					if(left+ pipeLeft < 0){
						move = -left;
					}
					if(left+ pipeWidth < width){
						move = -pipeWidth;
					}
					if(move!=null) navPipe.animate({'left':move+'px' },200,option.easing);
				}
				
			}
			function stop() {
				clearInterval(sliders.data('intervalId'));
			}
			function pause() {
				if (option.hoverPause) {
					clearInterval(sliders.data('intervalId'));
					intervalId = setInterval(function(){
						animate("next");
					},option.interval);
					sliders.data('intervalId',intervalId);
				}else {
					stop();
				}
			}
			
			if(option.touchScreen){
			/*********************************************************
			 * Add touch screen plugin	for slider content			 *
			 * @author chinhpv@vsmarttech.com						 *
			 *********************************************************/
			var hammer = new Hammer($('.bt-sliders',wrapper)[0],
										{prevent_default: true,
										not_prevent_tags:
										{
											id			: [],
											className	: [],
											tagName 	: ['A']
											}
										});
			// get position of sliders
			slidersPosition = sliders.position().left;
			var nextTemp, prevTemp;
			widthView = wrapper.width();
			var windowPosition = $('html,body').offset().top;
			$(window).scroll(function(){
				windowPosition = $('html,body').offset().top;
			});
			// on drag function
			hammer.ondrag = function (ev){
				if(current == total-1){
					nextTemp = 0;
					prevTemp = total -2;
				}else if(current == 0 ){
					nextTemp = 1;
					prevTemp = total -1;
				}else {
					nextTemp = current + 1;
					prevTemp = current - 1;
				}
				sliders.children(':eq('+ nextTemp +')').css({
					left: 2*widthView,
					display: 'block'
				});
				sliders.children(':eq('+ prevTemp +')').css({
					left: 0,
					display: 'block'
				});
				$(caption.get(prevTemp)).show();
				$(caption.get(nextTemp)).show();
				if(ev.direction =='left'){      // next
					sliders.css('left', slidersPosition - ev.distance);
				}
				if(ev.direction == 'right'){   // prev
					sliders.css('left', slidersPosition + ev.distance);
				}
				
			}
			// on end drag function 
			hammer.ondragend = function (ev){
				if(ev.distance > 100){
					if(ev.direction == 'left'){
						prev = current;
						next = current + 1;
						next = total === next ? 0 : next;
						position = 2*widthView;
						move = -2*widthView;
						current = next;
						sliders.children(':eq('+ prevTemp +')').css({
							left: widthView,
							display: 'none',
							zIndex: 0
						});
					}
					if(ev.direction == 'right'){
						prev = current;
						next = current - 1;
						next = next === -1 ? total-1 : next;									
						current = next;
						move = 0;
						sliders.children(':eq('+ nextTemp +')').css({
							left: widthView,
							display: 'none',
							zIndex: 0
						});
					}
					if(ev.direction == 'right' || ev.direction == 'left'){
						sliders.animate({
							left: move,
							height: sliders.children(':eq('+ next +')').outerHeight()
						},option.slideSpeed, option.easing, function(){
							// after animation reset control position
							sliders.css({
								left: - widthView
							});
							// reset and show next
							sliders.children(':eq('+ next +')').css({
								left: widthView,
								zIndex: 5
							});
							// reset previous slide
							sliders.children(':eq('+ prev +')').css({
								left: widthView,
								display: 'none',
								zIndex: 0
							});
							changeNavigation();
							slidersPosition = sliders.position().left;
						});
					}
				}else{
					sliders.animate({left: slidersPosition}, 250);
				}
				windowPosition = $('html,body').offset().top;
		}
		//swipe function 
		hammer.onswipe = function(ev){
				if(ev.direction == 'left'){
					prev = current;
					next = current + 1;
					next = total === next ? 0 : next;
					position = 2*widthView;
					move = - 2*widthView;
					current = next;
					sliders.children(':eq('+ prevTemp +')').css({
						left: widthView,
						display: 'none',
						zIndex: 0
					});
				}
				if(ev.direction == 'right'){
					prev = current;
					next = current - 1;
					next = next === -1 ? total-1 : next;									
					current = next;
					move = 0;
					sliders.children(':eq('+ nextTemp +')').css({
						left: widthView,
						display: 'none',
						zIndex: 0
					});
				}
				if(ev.direction == 'up'){
					$('html,body').animate({scrollTop: -windowPosition + 500},500);
				}
				if(ev.direction == 'down'){
					$('html,body').animate({scrollTop: -windowPosition - 500},500);
				}
				if(ev.direction == 'right' || ev.direction == 'left'){
					sliders.animate({
						left: move,
						height: sliders.children(':eq('+ next +')').outerHeight()
					},option.slideSpeed, option.easing, function(){
						// after animation reset control position
						sliders.css({
							left: - widthView
						});
						// reset and show next
						sliders.children(':eq('+ next +')').css({
							left: widthView,
							zIndex: 5
						});
						// reset previous slide
						sliders.children(':eq('+ prev +')').css({
							left: widthView,
							display: 'none',
							zIndex: 0
						});
						
						changeNavigation();
						slidersPosition = sliders.position().left;
					});
				}
			}
		
			/*********************************************************
			 * Add touch screen plugin	for navigation				 *
			 * @author chinhpv@vsmarttech.com						 *
			 *********************************************************/
		
			var naviHammer = new Hammer($('.bt-footernav',wrapper)[0],{prevent_default : true});
			naviPosition = $('.bt-navpipe',wrapper).position().left;
			// on drag function 
			naviHammer.ondrag = function (ev){
				if (navPipe.width() > navPipe.parent().width()){ 
				if(ev.direction == 'left'){
					if($('.bt-navpipe',wrapper).position().left > $('.bt-footernav').width() - $('.bt-navpipe',wrapper).width() - 100){
						$('.bt-navpipe',wrapper).css('left', naviPosition - ev.distance);
					}
				}
				if(ev.direction == 'right'){
					if($('.bt-navpipe',wrapper).position().left <   100)
					$('.bt-navpipe',wrapper).css('left', naviPosition + ev.distance);
				}
				}
			}
			// on end drag function 
			naviHammer.ondragend = function(ev){
				if(ev.direction == 'left'){
					if($('.bt-navpipe',wrapper).position().left < $('.bt-footernav').width() - $('.bt-navpipe',wrapper).width()){
						$('.bt-navpipe',wrapper).animate({left:$('.bt-footernav').width() - $('.bt-navpipe',wrapper).width()},250,function(){
							naviPosition = $('.bt-navpipe',wrapper).position().left;
						});
					}
				}
				if(ev.direction == 'right'){
					if($('.bt-navpipe',wrapper).position().left > 0)
						$('.bt-navpipe',wrapper).animate({left: 0}, 250, function(){
							naviPosition = $('.bt-navpipe',wrapper).position().left;
						});
				}
				naviPosition = $('.bt-navpipe',wrapper).position().left;
				
			}
			// on swipe function 
			naviHammer.onswipe = function(ev){
				if (navPipe.width() > navPipe.parent().width()){ 
				if(ev.direction == 'left'){
					$('.bt-navpipe',wrapper).animate({left:naviPosition -300},250,function(){
						naviPosition = $('.bt-navpipe',wrapper).position().left;naviPosition = $('.bt-navpipe',wrapper).position().left;
					});
					if($('.bt-navpipe',wrapper).position().left < $('.bt-footernav').width() - $('.bt-navpipe',wrapper).width()){
						$('.bt-navpipe',wrapper).animate({left:$('.bt-footernav').width() - $('.bt-navpipe',wrapper).width()},300,function(){
							naviPosition = $('.bt-navpipe',wrapper).position().left;
						});
					}
				}
				if(ev.direction == 'right'){
					$('.bt-navpipe',wrapper).animate({left:naviPosition + 300},250,function(){
						naviPosition = $('.bt-navpipe',wrapper).position().left;
					});
					if($('.bt-navpipe',wrapper).position().left > 0)
						$('.bt-navpipe',wrapper).animate({left: 0}, 300, function(){
							naviPosition = $('.bt-navpipe',wrapper).position().left;
						});
				}
				naviPosition = $('.bt-navpipe',wrapper).position().left;
				}
			}
			// on tap function 
			naviHammer.ontap = function(ev){
				target = $(ev.originalEvent.target);
				if(target.attr('class') != 'bt-nav'){
					target = target.parents('.bt-nav');
				}
				if(target.length){
					if (option.autoPlay) { pause();}
					animate(target.index());
				}
			}
			}
		});
	};	
})(jQuery);


$B=jQuery.noConflict();
$B(document).ready(function () {
	$B('img.hovereffect').hover(function () {
		$B(this).stop(true).animate({
			opacity : 0.5
		}, 300);
	}, function () {
		$B(this).animate({
			opacity : 1
		}, 300)
	});
});