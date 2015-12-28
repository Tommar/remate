/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery.noConflict();
$B = jQuery;
function appendOverlay(a){
    $B(a).append("<div class='btig-overlay'></div>");
}

$B(document).ready(function() {
//$B(window).load(function() {
	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];	
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	$B('.btloading').remove();
	$B('.jcarousel').fadeIn();
	$B('.mod_btimagegallery .next,.mod_btimagegallery .prev').fadeIn();
	 if (typeof(btiModuleIds) != 'undefined') {
			for (var i = 0; i < btiModuleIds.length; i++) {
				initBTimageGallery(btiModuleOpts[i]);
			}
	 }
	 function initBTimageGallery(moduleOpts){
			var showBullet = moduleOpts.showBullet,
			moduleID = '#btimagegallery'+moduleOpts.moduleID,
			responsive = moduleOpts.responsive,
			touchscreen = moduleOpts.touchscreen,
			moduleURI  = moduleOpts.moduleURI;
			if ($B.browser.version < 9.0) touchscreen = 0;	
			$B(moduleID).bind("dragstart", function(event, ui){
			  return false;//edited
			});
			if(showBullet && !responsive){
				var step = moduleOpts.scroll,size = $B(moduleID + ' .jcarousel li').length, i = 1;
				if(step < size){
					 $B(moduleID + ' .jcarousel li').each(function(){
				            if((($B(this).index()) % step == 0)){
				                $B(moduleID + ' .pagination').append('<a href="#" class="page-' + ($B(this).index() + 1) + '" rel="' + ($B(this).index() + 1) + '"></a>');
				                if($B(this).index() + 1 + moduleOpts.itemVisible > size) return false;
				                if($B(this).index() + 1 + moduleOpts.itemVisible <= size && $B(this).index() + 1 + step > size){
				                    $B(moduleID + ' .pagination').append('<a href="#" class="page-' + (size) + '" rel="' + (size) + '"></a>');
				                }
				            }
				        });
				}
				$B(moduleID + ' .pagination a').eq(0).addClass('current');
			    $B(moduleID + ' .pagination').append('<div style="clear: both;"></div>');
			}
		    //init jcarousel
			var getautofancy;
			var nextimg;
			if(moduleOpts.autofancybox ==0){
				getautofancy = false; 
			}else{
				getautofancy =true;
			}
			if(moduleOpts.shownp ==1){
				nextimg =true;
			}else{
				nextimg =false;
			}
			
		    $B(moduleID + ' .jcarousel').jcarousel({
		        initCallback: function(carousel, state){
		        	
		        	/************************************************************************
		             * Add touch screen Hammer.js											*
		             * @auther: chinhpv@vsmarttech.com										*
		             ************************************************************************/
					 if(touchscreen){
		            var hammer = new Hammer(carousel.list.parent()[0],{prevent_default: true});
		            var carouselWidth = carousel.list.parent().width();		          
		            hammer.ontap = function (ev){	            	
		            	if(ev.originalEvent.button == undefined || ev.originalEvent.button == 0){
			            	target = ev.originalEvent.target;
			            	el = $B(target.parentNode);
			            	gallery = el.parent().parent();			
							
							$B(moduleID + " a.fancybox").fancybox({
							padding             : 0,
							autoResize 			:true,
							autoCenter 			:true,
							openEffect 			: moduleOpts.animationeffect,
							nextEffect 			: moduleOpts.animationeffect,
							prevEffect			: moduleOpts.animationeffect,
							openSpeed  			: 150,
							closeEffect 		: moduleOpts.animationeffect,
							closeSpeed  		: 150,
							closeBtn 			:true,
							closeClick			:true,
							overlayShow         : true,
							overlayOpacity      : 0.6,
							zoomSpeedIn         : 0,
							zoomSpeedOut        : 100,
							easingIn            : "swing",
							easingOut           : "swing",
							openEasing 			:"swing",
							closeEasing 		:"swing",													
							nextEasing  		:"swing",													
							prevEasing  		:"swing",														
							hideOnContentClick  : false, 
							centerOnScroll      : false,
							imageScale          : true,
							autoDimensions      : true,
							autoPlay 			: getautofancy,
							showNavArrows		: true,
							mouseWheel			:true,
							playSpeed			: moduleOpts.playspeed,
							loop				:true, 
							arrows : nextimg,
								helpers : {
									media : {},					
									title : {
										type : 'inside'
										},						
										buttons	:(moduleOpts.showhelperbutton) ?{} :""					
											
									},
								beforeLoad: function(){
									if(moduleOpts.autofancybox ==1){
										$B.fancybox.play(true);
										}
								},
								afterLoad : function() {
										this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
								},							
								beforeShow  : function() {					
									var id = $B.fancybox.inner.find('iframe').attr('id');
									if (typeof(id) != 'undefined') {
									var player = new YT.Player(id, {
									playerVars: { 'autoplay': 0, 'controls': 0 },
											events: {
											'onReady': onPlayerReady,
											'onStateChange': onPlayerStateChange
											}
									}); 
								 }
								},									
								afterShow	:	function() {
											var id = $B.fancybox.inner.find('iframe').attr('id');
											
											if (typeof(id) != 'undefined') {
												$B('.fancybox-nav').hide();
												$B('.fancybox-title').html('');
												var youtubeid = $B(".fancybox-iframe").attr("src").match(/[\w\-]{11,}/)[0];
												$B.getJSON('http://gdata.youtube.com/feeds/api/videos/'+youtubeid+'?v=2&alt=jsonc&callback=?',function(data,status,xhr){		
																$B('.fancybox-title').html(data.data.title );
												});
												var deviceAgent = navigator.userAgent.toLowerCase();
												var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
												if (agentID) {
													$B('.fancybox-title').after('<div class="fancybox-drag">Swipe in here to move slide</div>');
												}
											}
											$B('.fancybox-drag').each(function() {
											var elem = $B(this);
												setInterval(function() {
													if (elem.css('visibility') == 'hidden') {
														elem.css('visibility', 'visible');
													} else {
														elem.css('visibility', 'hidden');
													}    
												}, 800);
											});
											if (typeof(id) != 'undefined') {
												var hammer = new Hammer($B(".fancybox-title").get(0),{
												drag_min_distance: 50,
												drag_horizontal: true,
												drag_vertical: true,
												transform: true,
												scale_treshold: 0.1,
												hold: true,
												hold_timeout: 400,
												swipe: true,
												swipe_time: 200, // ms
												swipe_min_distance: 20, // pixels
												prevent_default: true
												});
												
											}else{
											var hammer = new Hammer($B(".fancybox-inner").get(0),{
												drag_min_distance: 50,
												drag_horizontal: true,
												drag_vertical: true,
												transform: true,
												scale_treshold: 0.1,
												hold: true,
												hold_timeout: 400,
												swipe: true,
												swipe_time: 200, // ms
												swipe_min_distance: 20, // pixels
												prevent_default: true
												});
											}
											hammer.ontap = function (ev){
												$B.fancybox.close();
											}
											var timeout = 0;
											hammer.ondrag = function(ev) {
											var load = true;
												if(Math.abs(ev.distance) > 50) {													
												clearTimeout(timeout);
												if(ev.direction == 'right') {														
														timeout = setTimeout(function(){$B.fancybox.prev();},100);
														load = false;
													}
												if(ev.direction == 'down') {
														timeout = setTimeout(function(){$B.fancybox.prev('down');},100);
														load = false;
													}
													if(ev.direction == 'up') {
													timeout = setTimeout(function(){$B.fancybox.next('up');},100);
														load=false;
													}	
													if(ev.direction == 'left') {
														timeout = setTimeout(function(){$B.fancybox.next();},100);
														load=false;
													}																						
												} 								
														
											};
											hammer.onhold = function (ev) {
												var width = $B(".fancybox-wrap").width();
												width = width * (0.85);
												$B(".fancybox-wrap").width(width);
												$B(".fancybox-inner").width(width);
												var height = $B(".fancybox-wrap").height();
												height = height * (0.85);
												$B(".fancybox-wrap").height(height);
												$B(".fancybox-inner").height(height);
											};
											var oldScale = 0.0;
											hammer.ontransform = function(ev) {
												var width = $B(".fancybox-wrap").width();
												var height = $B(".fancybox-wrap").height();
												var scale = 1 + ev.scale - oldScale;												
												width = width * (scale);
												$B(".fancybox-wrap").width(width);
												$B(".fancybox-inner").width(width);
												height = height * (scale);
												$B(".fancybox-wrap").height(height);
												$B(".fancybox-inner").height(height);
												oldScale = ev.scale;
											};
											hammer.onswipe = function (ev) {
												if (ev.direction == 'right') {
													$B(".fancybox-inner").attr("Left", $B(".fancybox-wrap").width() + 'px');
												}
												if (ev.direction == 'left') {
													$B(".fancybox-inner").attr("Left", '0' + 'px');
												}
																			
											};
																			
								}
																
						});				
					
			            	el.click();
			            	//$B(target.parentNode).unbind('click').click(function(){return false}); 
		            	}
		            }
		            // on drag function
		            hammer.ondrag = function (ev){
		                if(carousel.options.onAnimate){return}
						if(ev.direction == 'left'){
								carousel.list.css('left', carousel.options.posAfterAnimate - ev.distance);
						}
						if(ev.direction == 'right'){
								carousel.list.css('left', carousel.options.posAfterAnimate + ev.distance);
						}
		                 
		            }
		            // on drag end fucntion
		            hammer.ondragend = function (ev){					
		                if(carousel.options.onAnimate){return }
		                //$B(ev.originalEvent.target.parentNode).unbind('click').click(function(){return false}); 
		                if(ev.distance > 100){
							if(ev.direction == 'left'){
								if(carousel.first == carousel.options.size){
									carousel.options.onAnimate = true;
									carousel.list.animate({left: carousel.options.posAfterAnimate}, 250,function(){carousel.options.onAnimate = false;});
								}else{
									carousel.options.onAnimate = true;
									carousel.pauseAuto();
									carousel.animate(carousel.pos(carousel.first + carousel.options.scroll) + ev.distance - 1);
									carousel.stopAuto();
					                carousel.options.auto = 10000;
			                    	}
								}
							if(ev.direction == 'right'){
								if(carousel.first == 1){
									carousel.options.onAnimate = true;
									carousel.list.animate({left: 0}, 250,function(){ carousel.options.onAnimate = false;});
								}else{
									carousel.options.onAnimate = true;
									carousel.pauseAuto();
									carousel.animate(carousel.pos(carousel.first - carousel.options.scroll) - ev.distance -1);
									carousel.stopAuto();
					                carousel.options.auto = 10000;
			                    	}
							}	
		                }else{
		                	carousel.list.animate({left: carousel.options.posAfterAnimate}, 250, function(){carousel.options.onAnimate = false;});
		                }
		            }
		           
		            // on swipe function 
		             var timeout = 0;
		            hammer.onswipe = function (ev){
					clearTimeout(timeout);
		                if(carousel.options.onAnimate){return}
		               // $B(ev.originalEvent.target.parentNode).unbind('click').click(function(){return false});
		            	if(ev.direction == 'left'){
							if(carousel.first == carousel.options.size){
								carousel.options.onAnimate = true;
								timeout = setTimeout(function(){carousel.list.animate({left: carousel.options.posAfterAnimate}, 150, function(){carousel.options.onAnimate = false;});},100);
							}else{
							timeout = setTimeout(function(){
								carousel.pauseAuto();
								carousel.options.onAnimate = true;
								carousel.animate(carousel.pos(carousel.first + carousel.options.scroll) + ev.distance - 1);
								carousel.stopAuto();
				                carousel.options.auto = 10000;
								},100);
		                    }
						}
						if(ev.direction == 'right'){
							if(carousel.first == 1){
								carousel.options.onAnimate = true;
									timeout = setTimeout(function(){carousel.list.animate({left: carousel.options.posAfterAnimate}, 150,function(){carousel.options.onAnimate = false;});},100);
							}else{
							timeout = setTimeout(function(){
								carousel.pauseAuto();
								carousel.options.onAnimate = true;
								carousel.animate(carousel.pos(carousel.first - carousel.options.scroll)- ev.distance -1);
								carousel.stopAuto();
				                carousel.options.auto = 10000;
		                    },100);
							}
						}	
		            }					
		            }
		            if(moduleOpts.responsive){
		            $B(window).bind('resize.btim',function(){
		                var minWidth = moduleOpts.liWidth;
		                var minOutterWidth = minWidth + parseInt($B(moduleID + ' .jcarousel-item').css('margin-left')) 
		                                        + parseInt($B(moduleID + ' .jcarousel-item').css('margin-right')); 
		                var numberItem = $B(moduleID + ' .jcarousel-item').length;
		                var width = $B(moduleID + ' .jcarousel-container').parent().innerWidth();	

		                $B(moduleID + ' .jcarousel-container,' + moduleID + ' .jcarousel-clip').width(width);
		                var availableItem = Math.floor( width / minOutterWidth);
		                if(availableItem == 0) availableItem = 1;
		                var delta = 0;
		                var newWidth = 0;
		                if(width > minOutterWidth){
		                    if(availableItem > numberItem){
		                        delta = Math.floor((width - minOutterWidth * numberItem) / numberItem);
		                    }else {
		                        delta = Math.floor(width % minOutterWidth / availableItem);
		                    }
		                    newWidth = minWidth + delta;
		                }else{
		                    newWidth = width;
		                }
		                var ratio = $B(moduleID + ' .jcarousel-item img').width() / $B(moduleID + ' .jcarousel-item img').height();
		                $B(moduleID + ' .jcarousel-item img').width(newWidth).height(Math.floor(newWidth/ratio));
		                carousel.options.visible = availableItem > numberItem ? numberItem : availableItem;
		                carousel.options.scroll = availableItem;
		                if($B.browser.webkit){
							$B(moduleID + ' .jcarousel-item').width(newWidth);
							$B(moduleID + ' .jcarousel-list').width(carousel.options.size * $B(moduleID + ' .jcarousel-item').outerWidth(true)); 
						}else{
							carousel.funcResize();
						}
		                
		                //regenerade pagination
						 if(moduleOpts.showBullet){
		                    $B(moduleID + ' .pagination').html(''); 
		                    if(carousel.options.visible < numberItem){
			                        var i = 1;
			                        var step = carousel.options.visible;
			                        if(step >=  numberItem){
			                            $B(moduleID + ' .pagination').append('<a href="#" class="page-' + (1) + '" rel="' + (1) + '"></a>');
			                            $B(moduleID + ' .pagination').append('<a href="#" class="page-' + (numberItem) + '" rel="' + (numberItem) + '"></a>');
			                        }else{
			                            $B(moduleID + ' .jcarousel li').each(function(){
			                                if((($B(this).index()) % step == 0)){
			                                    $B(moduleID + ' .pagination').append('<a href="#" class="page-' + ($B(this).index() + 1) + '" rel="' + ($B(this).index() + 1) + '"></a>');
			                                    if($B(this).index() + 1 + carousel.options.visible > numberItem) return false;
			                                    if($B(this).index() + 1 + carousel.options.visible <= numberItem && $B(this).index() + 1 + step > numberItem){
			                                        $B(moduleID + ' .pagination').append('<a href="#" class="page-' + (numberItem) + '" rel="' + (numberItem) + '"></a>');
			                                    }
			                                }
			                            });
			                        }

			                        $B(moduleID + ' .pagination a').eq(0).addClass('current');
			                        $B(moduleID + ' .pagination').append('<div style="clear: both;"></div>');

			                        //hook navigation
			                        $B(moduleID + ' .pagination a').bind('click', function() {
			                            if($B(this).hasClass('current')) return false;
			                            carousel.stopAuto();
			                            carousel.options.auto = 10000;
			                            $B(this).parent().find('.current').removeClass('current');
			                            $B(this).addClass('current');
			                            carousel.scroll($B.jcarousel.intval($B(this).attr('rel')));
			                            return false;
			                        });
		                    	}
		                    }
		                });	
		            $B(window).trigger('resize.btim');
		            }
		            
		           if(moduleOpts.showBullet){
			            //hook navigation
			            $B(moduleID + ' .pagination a').bind('click', function() {
			                if($B(this).hasClass('current')) return false;
			                carousel.stopAuto();
			                carousel.options.auto = 10000;
			                $B(this).parent().find('.current').removeClass('current');
			                $B(this).addClass('current');
			                carousel.scroll($B.jcarousel.intval($B(this).attr('rel')));
			                return false;
			            });
					}
		                
			            //hook next and prev
			         if(moduleOpts.showNav){    
			            var prev = moduleID + ' .prev';
			            var next = moduleID + ' .next';
			            $B(prev).unbind('click').click(function(){
			                carousel.prev();
			                carousel.stopAuto();
			                carousel.options.auto = 10000;
			                return false;
			            });

			            $B(next).unbind('click').click(function(){
			                carousel.next(); 
			               
			                carousel.stopAuto();
			                carousel.options.auto = 10000;
			                return false;
			            });
			         }
		            //if turn on pause_hover
		         	if(moduleOpts.pauseHover){
						    carousel.clip.hover(function() {
						        carousel.stopAuto();
						    }, function() {
						        carousel.startAuto();
						    });
		         	}
		        },

		        // item  load call back function
			        itemLoadCallback:{
			            onAfterAnimation : function(carousel, state){
			                if(carousel.first == 1){
			                	carousel.options.posAfterAnimate = 0;
			                }else{
			            		carousel.options.posAfterAnimate = carousel.pos(carousel.first);
			                }
			                carousel.options.onAnimate = false;
							if(moduleOpts.showBullet) {
			                    var size = carousel.options.size;
			                    var index = carousel.first;
			                    $B(moduleID + ' .pagination a').removeClass('current');
			                    if($B(moduleID + ' .pagination a.page-' + index).length == 0){
			                        var last = carousel.last; //alert(last);
			                        while (last > size){
			                            last -=size;
			                        }
			                        if( last == size){
			                            $B(moduleID + ' .pagination a').last().addClass('current');
			                        }else{
			                            var lastNavigation;
			                            do {
			                                last--;
			                                lastNavigation = $B(moduleID + ' .pagination a.page-' + last);
			                                if(last <=0) break;
			                            } while(lastNavigation.length == 0);
			                            
			                            lastNavigation.addClass('current');
			                        }
			                    }else{
			                        $B(moduleID + ' .pagination a.page-' + index).addClass('current');
			                    }
			                 } 
			            }
			        },
			        start: 1,
			        auto: moduleOpts.auto,
			        animation: moduleOpts.animation,              
			        buttonNextHTML: null,
			        buttonPrevHTML: null,
			        scroll : (!moduleOpts.responsive) ? moduleOpts.scroll : 3,
			        wrap : 'both',
			        rtl: moduleOpts.rtl
			});		
			
		    if(!touchscreen){
		    	$B(moduleID + " a.fancybox").fancybox({
				padding             : 0,
				autoResize 			:true,
				autoCenter 			:true,
				openEffect 			: moduleOpts.animationeffect,
				nextEffect 			: moduleOpts.animationeffect,
				prevEffect			: moduleOpts.animationeffect,
				openSpeed  			: 150,
				closeEffect 		: moduleOpts.animationeffect,
				closeSpeed  		: 150,
				closeBtn 			:true,
				closeClick			:true,
				overlayShow         : true,
				overlayOpacity      : 0.6,
				zoomSpeedIn         : 0,
				zoomSpeedOut        : 100,
				easingIn            : "swing",
				easingOut           : "swing",
				nextEasing 			: "swing",
				prevEasing			: "swing",			
				hideOnContentClick  : false, 
				centerOnScroll      : false,
				imageScale          : true,
				autoDimensions      : true,
				autoPlay 			: getautofancy,
				showNavArrows		: true,
				mouseWheel			:true,
				playSpeed			: moduleOpts.playspeed,
				loop				:true, 
				arrows : nextimg,
					helpers : {
						media : {},					
						title : {
							type : 'inside'
						},						
						buttons	:(moduleOpts.showhelperbutton) ?{} :""					
						
					},
					beforeLoad: function(){
						if(moduleOpts.autofancybox ==1){
							$B.fancybox.play(true);
						}
					},
					afterLoad : function() {
						this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
					},
					afterShow	:	function() {
						var id = $B.fancybox.inner.find('iframe').attr('id');		
						if (typeof(id) != 'undefined') {
							$B('.fancybox-nav').css({'height':'82%', 'margin-top':'7%','z-index':'999'});
							$B('.fancybox-title').html('');
							var youtubeid = $B(".fancybox-iframe").attr("src").match(/[\w\-]{11,}/)[0];
							$B.getJSON('http://gdata.youtube.com/feeds/api/videos/'+youtubeid+'?v=2&alt=jsonc&callback=?',function(data,status,xhr){		
								$B('.fancybox-title').html(data.data.title );
							});
						}
					},
					beforeShow  : function() {					
					var id = $B.fancybox.inner.find('iframe').attr('id');
					if (typeof(id) != 'undefined') {
						 var player = new YT.Player(id, {
							playerVars: { 'autoplay': 0, 'controls': 0 },
							events: {
								'onReady': onPlayerReady,
								'onStateChange': onPlayerStateChange
							}
						});
					}
				}
									
			});
		    }
			function onPlayerReady(event) { 		 
			//$B.fancybox.play(false); 
			}
			function onPlayerStateChange(event) {			
				switch(event.data){
				   case -1: // unstarted
						return;
					case 0: // ended					
						if(moduleOpts.autofancybox ==1){
							$B.fancybox.next();						
							$B.fancybox.play(true);
						}
						return;
					case 1: // playing				
					case 2: // paused					
					case 3: // buffering				
					case 5: // video cued					
						 $B.fancybox.play(false);				
					return;
				}
			}
			var deviceAgent = navigator.userAgent.toLowerCase();
				var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
				if (!agentID) {
			    $B(moduleID + " .jcarousel-item a").hover(function(){
					$B(this).children(' .imageicon').children(".icon").addClass('iconhover');
			        appendOverlay(this);},
			    function(){
			        $B(this).children(".btig-overlay").remove();
					$B(this).children(' .imageicon').children(".icon").removeClass('iconhover');
				});
			}
		}   
});


