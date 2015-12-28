

/*===============================
/bt_real_estate30/media/system/js/caption.js
================================================================================*/;
var JCaption=function(c){var e,b,a=function(f){e=jQuery.noConflict();b=f;e(b).each(function(g,h){d(h)})},d=function(i){var h=e(i),f=h.attr("title"),j=h.attr("width")||i.width,l=h.attr("align")||h.css("float")||i.style.styleFloat||"none",g=e("<p/>",{text:f,"class":b.replace(".","_")}),k=e("<div/>",{"class":b.replace(".","_")+" "+l,css:{"float":l,width:j}});h.parent().before(k,h);k.append(h);if(f!==""){k.append(g)}};a(c)};


/*===============================
/bt_real_estate30/plugins/system/t3/base/bootstrap/js/bootstrap.js
================================================================================*/;
!function($){"use strict";$(function(){$.support.transition=(function(){var transitionEnd=(function(){var el=document.createElement('bootstrap'),transEndEventNames={'WebkitTransition':'webkitTransitionEnd','MozTransition':'transitionend','OTransition':'oTransitionEnd otransitionend','transition':'transitionend'},name
for(name in transEndEventNames){if(el.style[name]!==undefined){return transEndEventNames[name]}}}())
return transitionEnd&&{end:transitionEnd}})()})}(window.jQuery);!function($){"use strict";var dismiss='[data-dismiss="alert"]',Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.prototype.close=function(e){var $this=$(this),selector=$this.attr('data-target'),$parent
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
$parent=$(selector)
e&&e.preventDefault()
$parent.length||($parent=$this.hasClass('alert')?$this:$this.parent())
$parent.trigger(e=$.Event('close'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.trigger('closed').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.on($.support.transition.end,removeElement):removeElement()}
var old=$.fn.alert
$.fn.alert=function(option){return this.each(function(){var $this=$(this),data=$this.data('alert')
if(!data)$this.data('alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.alert.data-api',dismiss,Alert.prototype.close)}(window.jQuery);!function($){"use strict";var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},$.fn.button.defaults,options)}
Button.prototype.setState=function(state){var d='disabled',$el=this.$element,data=$el.data(),val=$el.is('input')?'val':'html'
state=state+'Text'
data.resetText||$el.data('resetText',$el[val]())
$el[val](data[state]||this.options[state])
setTimeout(function(){state=='loadingText'?$el.addClass(d).attr(d,d):$el.removeClass(d).removeAttr(d)},0)}
Button.prototype.toggle=function(){var $parent=this.$element.closest('[data-toggle="buttons-radio"]')
$parent&&$parent.find('.active').removeClass('active')
this.$element.toggleClass('active')}
var old=$.fn.button
$.fn.button=function(option){return this.each(function(){var $this=$(this),data=$this.data('button'),options=typeof option=='object'&&option
if(!data)$this.data('button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
$.fn.button.defaults={loadingText:'loading...'}
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.button.data-api','[data-toggle^=button]',function(e){var $btn=$(e.target)
if(!$btn.hasClass('btn'))$btn=$btn.closest('.btn')
$btn.button('toggle')})}(window.jQuery);!function($){"use strict";var Carousel=function(element,options){this.$element=$(element)
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.options.pause=='hover'&&this.$element.on('mouseenter',$.proxy(this.pause,this)).on('mouseleave',$.proxy(this.cycle,this))}
Carousel.prototype={cycle:function(e){if(!e)this.paused=false
if(this.interval)clearInterval(this.interval);this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this},getActiveIndex:function(){this.$active=this.$element.find('.item.active')
this.$items=this.$active.parent().children()
return this.$items.index(this.$active)},to:function(pos){var activeIndex=this.getActiveIndex(),that=this
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding){return this.$element.one('slid',function(){that.to(pos)})}
if(activeIndex==pos){return this.pause().cycle()}
return this.slide(pos>activeIndex?'next':'prev',$(this.$items[pos]))},pause:function(e){if(!e)this.paused=true
if(this.$element.find('.next, .prev').length&&$.support.transition.end){this.$element.trigger($.support.transition.end)
this.cycle(true)}
clearInterval(this.interval)
this.interval=null
return this},next:function(){if(this.sliding)return
return this.slide('next')},prev:function(){if(this.sliding)return
return this.slide('prev')},slide:function(type,next){var $active=this.$element.find('.item.active'),$next=next||$active[type](),isCycling=this.interval,direction=type=='next'?'left':'right',fallback=type=='next'?'first':'last',that=this,e
this.sliding=true
isCycling&&this.pause()
$next=$next.length?$next:this.$element.find('.item')[fallback]()
e=$.Event('slide',{relatedTarget:$next[0],direction:direction})
if($next.hasClass('active'))return
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
this.$element.one('slid',function(){var $nextIndicator=$(that.$indicators.children()[that.getActiveIndex()])
$nextIndicator&&$nextIndicator.addClass('active')})}
if($.support.transition&&this.$element.hasClass('slide')){this.$element.trigger(e)
if(e.isDefaultPrevented())return
$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
this.$element.one($.support.transition.end,function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger('slid')},0)})}else{this.$element.trigger(e)
if(e.isDefaultPrevented())return
$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger('slid')}
isCycling&&this.cycle()
return this}}
var old=$.fn.carousel
$.fn.carousel=function(option){return this.each(function(){var $this=$(this),data=$this.data('carousel'),options=$.extend({},$.fn.carousel.defaults,typeof option=='object'&&option),action=typeof option=='string'?option:options.slide
if(!data)$this.data('carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
$.fn.carousel.defaults={interval:5000,pause:'hover'}
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
$(document).on('click.carousel.data-api','[data-slide], [data-slide-to]',function(e){var $this=$(this),href,$target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')),options=$.extend({},$target.data(),$this.data()),slideIndex
$target.carousel(options)
if(slideIndex=$this.attr('data-slide-to')){$target.data('carousel').pause().to(slideIndex).cycle()}
e.preventDefault()})}(window.jQuery);!function($){"use strict";var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},$.fn.collapse.defaults,options)
if(this.options.parent){this.$parent=$(this.options.parent)}
this.options.toggle&&this.toggle()}
Collapse.prototype={constructor:Collapse,dimension:function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'},show:function(){var dimension,scroll,actives,hasData
if(this.transitioning||this.$element.hasClass('in'))return
dimension=this.dimension()
scroll=$.camelCase(['scroll',dimension].join('-'))
actives=this.$parent&&this.$parent.find('> .accordion-group > .in')
if(actives&&actives.length){hasData=actives.data('collapse')
if(hasData&&hasData.transitioning)return
actives.collapse('hide')
hasData||actives.data('collapse',null)}
this.$element[dimension](0)
this.transition('addClass',$.Event('show'),'shown')
$.support.transition&&this.$element[dimension](this.$element[0][scroll])},hide:function(){var dimension
if(this.transitioning||!this.$element.hasClass('in'))return
dimension=this.dimension()
this.reset(this.$element[dimension]())
this.transition('removeClass',$.Event('hide'),'hidden')
this.$element[dimension](0)},reset:function(size){var dimension=this.dimension()
this.$element.removeClass('collapse')
[dimension](size||'auto')
[0].offsetWidth
this.$element[size!==null?'addClass':'removeClass']('collapse')
return this},transition:function(method,startEvent,completeEvent){var that=this,complete=function(){if(startEvent.type=='show')that.reset()
that.transitioning=0
that.$element.trigger(completeEvent)}
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
this.transitioning=1
this.$element[method]('in')
$.support.transition&&this.$element.hasClass('collapse')?this.$element.one($.support.transition.end,complete):complete()},toggle:function(){this[this.$element.hasClass('in')?'hide':'show']()}}
var old=$.fn.collapse
$.fn.collapse=function(option){return this.each(function(){var $this=$(this),data=$this.data('collapse'),options=$.extend({},$.fn.collapse.defaults,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.collapse.defaults={toggle:true}
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.collapse.data-api','[data-toggle=collapse]',function(e){var $this=$(this),href,target=$this.attr('data-target')||e.preventDefault()||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''),option=$(target).data('collapse')?'toggle':$this.data()
$this[$(target).hasClass('in')?'addClass':'removeClass']('collapsed')
$(target).collapse(option)})}(window.jQuery);!function($){"use strict";var toggle='[data-toggle=dropdown]',Dropdown=function(element){var $el=$(element).on('click.dropdown.data-api',this.toggle)
$('html').on('click.dropdown.data-api',function(){$el.parent().removeClass('open')})}
Dropdown.prototype={constructor:Dropdown,toggle:function(e){var $this=$(this),$parent,isActive
if($this.is('.disabled, :disabled'))return
$parent=getParent($this)
isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement){$('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click',clearMenus)}
$parent.toggleClass('open')}
$this.focus()
return false},keydown:function(e){var $this,$items,$active,$parent,isActive,index
if(!/(38|40|27)/.test(e.keyCode))return
$this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
$parent=getParent($this)
isActive=$parent.hasClass('open')
if(!isActive||(isActive&&e.keyCode==27)){if(e.which==27)$parent.find(toggle).focus()
return $this.click()}
$items=$('[role=menu] li:not(.divider):visible a',$parent)
if(!$items.length)return
index=$items.index($items.filter(':focus'))
if(e.keyCode==38&&index>0)index--
if(e.keyCode==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).focus()}}
function clearMenus(){$('.dropdown-backdrop').remove()
$(toggle).each(function(){getParent($(this)).removeClass('open')})}
function getParent($this){var selector=$this.attr('data-target'),$parent
if(!selector){selector=$this.attr('href')
selector=selector&&/#/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
$parent=selector&&$(selector)
if(!$parent||!$parent.length)$parent=$this.parent()
return $parent}
var old=$.fn.dropdown
$.fn.dropdown=function(option){return this.each(function(){var $this=$(this),data=$this.data('dropdown')
if(!data)$this.data('dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.dropdown.data-api',clearMenus).on('click.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.dropdown.data-api',toggle+', [role=menu]',Dropdown.prototype.keydown)}(window.jQuery);!function($){"use strict";var Modal=function(element,options){this.options=options
this.$element=$(element).delegate('[data-dismiss="modal"]','click.dismiss.modal',$.proxy(this.hide,this))
this.options.remote&&this.$element.find('.modal-body').load(this.options.remote)}
Modal.prototype={constructor:Modal,toggle:function(){return this[!this.isShown?'show':'hide']()},show:function(){var that=this,e=$.Event('show')
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.escape()
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(document.body)}
that.$element.show()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in').attr('aria-hidden',false)
that.enforceFocus()
transition?that.$element.one($.support.transition.end,function(){that.$element.focus().trigger('shown')}):that.$element.focus().trigger('shown')})},hide:function(e){e&&e.preventDefault()
var that=this
e=$.Event('hide')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
$(document).off('focusin.modal')
this.$element.removeClass('in').attr('aria-hidden',true)
$.support.transition&&this.$element.hasClass('fade')?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var that=this
$(document).on('focusin.modal',function(e){if(that.$element[0]!==e.target&&!that.$element.has(e.target).length){that.$element.focus()}})},escape:function(){var that=this
if(this.isShown&&this.options.keyboard){this.$element.on('keyup.dismiss.modal',function(e){e.which==27&&that.hide()})}else if(!this.isShown){this.$element.off('keyup.dismiss.modal')}},hideWithTransition:function(){var that=this,timeout=setTimeout(function(){that.$element.off($.support.transition.end)
that.hideModal()},500)
this.$element.one($.support.transition.end,function(){clearTimeout(timeout)
that.hideModal()})},hideModal:function(){var that=this
this.$element.hide()
this.backdrop(function(){that.removeBackdrop()
that.$element.trigger('hidden')})},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null},backdrop:function(callback){var that=this,animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').appendTo(document.body)
this.$backdrop.click(this.options.backdrop=='static'?$.proxy(this.$element[0].focus,this.$element[0]):$.proxy(this.hide,this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one($.support.transition.end,callback):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one($.support.transition.end,callback):callback()}else if(callback){callback()}}}
var old=$.fn.modal
$.fn.modal=function(option){return this.each(function(){var $this=$(this),data=$this.data('modal'),options=$.extend({},$.fn.modal.defaults,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option]()
else if(options.show)data.show()})}
$.fn.modal.defaults={backdrop:true,keyboard:true,show:true}
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this),href=$this.attr('href'),$target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,''))),option=$target.data('modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
e.preventDefault()
$target.modal(option).one('hide',function(){$this.focus()})})}(window.jQuery);!function($){"use strict";var Tooltip=function(element,options){this.init('tooltip',element,options)}
Tooltip.prototype={constructor:Tooltip,init:function(type,element,options){var eventIn,eventOut,triggers,trigger,i
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.enabled=true
triggers=this.options.trigger.split(' ')
for(i=triggers.length;i--;){trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){eventIn=trigger=='hover'?'mouseenter':'focus'
eventOut=trigger=='hover'?'mouseleave':'blur'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()},getOptions:function(options){options=$.extend({},$.fn[this.type].defaults,this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options},enter:function(e){var defaults=$.fn[this.type].defaults,options={},self
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value},this)
self=$(e.currentTarget)[this.type](options).data(this.type)
if(!self.options.delay||!self.options.delay.show)return self.show()
clearTimeout(this.timeout)
self.hoverState='in'
this.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)},leave:function(e){var self=$(e.currentTarget)[this.type](this._options).data(this.type)
if(this.timeout)clearTimeout(this.timeout)
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.hoverState='out'
this.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)},show:function(){var $tip,pos,actualWidth,actualHeight,placement,tp,e=$.Event('show')
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip=this.tip()
this.setContent()
if(this.options.animation){$tip.addClass('fade')}
placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
$tip.detach().css({top:0,left:0,display:'block'})
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
pos=this.getPosition()
actualWidth=$tip[0].offsetWidth
actualHeight=$tip[0].offsetHeight
switch(placement){case'bottom':tp={top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}
break
case'top':tp={top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}
break
case'left':tp={top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}
break
case'right':tp={top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}
break}
this.applyPlacement(tp,placement)
this.$element.trigger('shown')}},applyPlacement:function(offset,placement){var $tip=this.tip(),width=$tip[0].offsetWidth,height=$tip[0].offsetHeight,actualWidth,actualHeight,delta,replace
$tip.offset(offset).addClass(placement).addClass('in')
actualWidth=$tip[0].offsetWidth
actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight
replace=true}
if(placement=='bottom'||placement=='top'){delta=0
if(offset.left<0){delta=offset.left*-2
offset.left=0
$tip.offset(offset)
actualWidth=$tip[0].offsetWidth
actualHeight=$tip[0].offsetHeight}
this.replaceArrow(delta-width+actualWidth,actualWidth,'left')}else{this.replaceArrow(actualHeight-height,actualHeight,'top')}
if(replace)$tip.offset(offset)},replaceArrow:function(delta,dimension,position){this.arrow().css(position,delta?(50*(1-delta/dimension)+"%"):'')},setContent:function(){var $tip=this.tip(),title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')},hide:function(){var that=this,$tip=this.tip(),e=$.Event('hide')
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
function removeWithAnimation(){var timeout=setTimeout(function(){$tip.off($.support.transition.end).detach()},500)
$tip.one($.support.transition.end,function(){clearTimeout(timeout)
$tip.detach()})}
$.support.transition&&this.$tip.hasClass('fade')?removeWithAnimation():$tip.detach()
this.$element.trigger('hidden')
return this},fixTitle:function(){var $e=this.$element
if($e.attr('title')||typeof($e.attr('data-original-title'))!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}},hasContent:function(){return this.getTitle()},getPosition:function(){var el=this.$element[0]
return $.extend({},(typeof el.getBoundingClientRect=='function')?el.getBoundingClientRect():{width:el.offsetWidth,height:el.offsetHeight},this.$element.offset())},getTitle:function(){var title,$e=this.$element,o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title},tip:function(){return this.$tip=this.$tip||$(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){if(!this.$element[0].parentNode){this.hide()
this.$element=null
this.options=null}},enable:function(){this.enabled=true},disable:function(){this.enabled=false},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(e){var self=e?$(e.currentTarget)[this.type](this._options).data(this.type):this
self.tip().hasClass('in')?self.hide():self.show()},destroy:function(){this.hide().$element.off('.'+this.type).removeData(this.type)}}
var old=$.fn.tooltip
$.fn.tooltip=function(option){return this.each(function(){var $this=$(this),data=$this.data('tooltip'),options=typeof option=='object'&&option
if(!data)$this.data('tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.defaults={animation:true,placement:'top',selector:false,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false}
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(window.jQuery);!function($){"use strict";var Popover=function(element,options){this.init('popover',element,options)}
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype,{constructor:Popover,setContent:function(){var $tip=this.tip(),title=this.getTitle(),content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content')[this.options.html?'html':'text'](content)
$tip.removeClass('fade top bottom left right in')},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var content,$e=this.$element,o=this.options
content=(typeof o.content=='function'?o.content.call($e[0]):o.content)||$e.attr('data-content')
return content},tip:function(){if(!this.$tip){this.$tip=$(this.options.template)}
return this.$tip},destroy:function(){this.hide().$element.off('.'+this.type).removeData(this.type)}})
var old=$.fn.popover
$.fn.popover=function(option){return this.each(function(){var $this=$(this),data=$this.data('popover'),options=typeof option=='object'&&option
if(!data)$this.data('popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.popover.Constructor=Popover
$.fn.popover.defaults=$.extend({},$.fn.tooltip.defaults,{placement:'right',trigger:'click',content:'',template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(window.jQuery);!function($){"use strict";function ScrollSpy(element,options){var process=$.proxy(this.process,this),$element=$(element).is('body')?$(window):$(element),href
this.options=$.extend({},$.fn.scrollspy.defaults,options)
this.$scrollElement=$element.on('scroll.scroll-spy.data-api',process)
this.selector=(this.options.target||((href=$(element).attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))||'')+' .nav li > a'
this.$body=$('body')
this.refresh()
this.process()}
ScrollSpy.prototype={constructor:ScrollSpy,refresh:function(){var self=this,$targets
this.offsets=$([])
this.targets=$([])
$targets=this.$body.find(this.selector).map(function(){var $el=$(this),href=$el.data('target')||$el.attr('href'),$href=/^#\w/.test(href)&&$(href)
return($href&&$href.length&&[[$href.position().top+(!$.isWindow(self.$scrollElement.get(0))&&self.$scrollElement.scrollTop()),href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){self.offsets.push(this[0])
self.targets.push(this[1])})},process:function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset,scrollHeight=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,maxScroll=scrollHeight-this.$scrollElement.height(),offsets=this.offsets,targets=this.targets,activeTarget=this.activeTarget,i
if(scrollTop>=maxScroll){return activeTarget!=(i=targets.last()[0])&&this.activate(i)}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(!offsets[i+1]||scrollTop<=offsets[i+1])&&this.activate(targets[i])}},activate:function(target){var active,selector
this.activeTarget=target
$(this.selector).parent('.active').removeClass('active')
selector=this.selector
+'[data-target="'+target+'"],'
+this.selector+'[href="'+target+'"]'
active=$(selector).parent('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate')}}
var old=$.fn.scrollspy
$.fn.scrollspy=function(option){return this.each(function(){var $this=$(this),data=$this.data('scrollspy'),options=typeof option=='object'&&option
if(!data)$this.data('scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.defaults={offset:10}
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
$spy.scrollspy($spy.data())})})}(window.jQuery);!function($){"use strict";var Tab=function(element){this.element=$(element)}
Tab.prototype={constructor:Tab,show:function(){var $this=this.element,$ul=$this.closest('ul:not(.dropdown-menu)'),selector=$this.attr('data-target'),previous,$target,e
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
previous=$ul.find('.active:last a')[0]
e=$.Event('show',{relatedTarget:previous})
$this.trigger(e)
if(e.isDefaultPrevented())return
$target=$(selector)
this.activate($this.parent('li'),$ul)
this.activate($target,$target.parent(),function(){$this.trigger({type:'shown',relatedTarget:previous})})},activate:function(element,container,callback){var $active=container.find('> .active'),transition=callback&&$.support.transition&&$active.hasClass('fade')
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active')
element.addClass('active')
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu')){element.closest('li.dropdown').addClass('active')}
callback&&callback()}
transition?$active.one($.support.transition.end,next):next()
$active.removeClass('in')}}
var old=$.fn.tab
$.fn.tab=function(option){return this.each(function(){var $this=$(this),data=$this.data('tab')
if(!data)$this.data('tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
$(document).on('click.tab.data-api','[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault()
$(this).tab('show')})}(window.jQuery);!function($){"use strict";var Typeahead=function(element,options){this.$element=$(element)
this.options=$.extend({},$.fn.typeahead.defaults,options)
this.matcher=this.options.matcher||this.matcher
this.sorter=this.options.sorter||this.sorter
this.highlighter=this.options.highlighter||this.highlighter
this.updater=this.options.updater||this.updater
this.source=this.options.source
this.$menu=$(this.options.menu)
this.shown=false
this.listen()}
Typeahead.prototype={constructor:Typeahead,select:function(){var val=this.$menu.find('.active').attr('data-value')
this.$element.val(this.updater(val)).change()
return this.hide()},updater:function(item){return item},show:function(){var pos=$.extend({},this.$element.position(),{height:this.$element[0].offsetHeight})
this.$menu.insertAfter(this.$element).css({top:pos.top+pos.height,left:pos.left}).show()
this.shown=true
return this},hide:function(){this.$menu.hide()
this.shown=false
return this},lookup:function(event){var items
this.query=this.$element.val()
if(!this.query||this.query.length<this.options.minLength){return this.shown?this.hide():this}
items=$.isFunction(this.source)?this.source(this.query,$.proxy(this.process,this)):this.source
return items?this.process(items):this},process:function(items){var that=this
items=$.grep(items,function(item){return that.matcher(item)})
items=this.sorter(items)
if(!items.length){return this.shown?this.hide():this}
return this.render(items.slice(0,this.options.items)).show()},matcher:function(item){return~item.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(items){var beginswith=[],caseSensitive=[],caseInsensitive=[],item
while(item=items.shift()){if(!item.toLowerCase().indexOf(this.query.toLowerCase()))beginswith.push(item)
else if(~item.indexOf(this.query))caseSensitive.push(item)
else caseInsensitive.push(item)}
return beginswith.concat(caseSensitive,caseInsensitive)},highlighter:function(item){var query=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,'\\$&')
return item.replace(new RegExp('('+query+')','ig'),function($1,match){return'<strong>'+match+'</strong>'})},render:function(items){var that=this
items=$(items).map(function(i,item){i=$(that.options.item).attr('data-value',item)
i.find('a').html(that.highlighter(item))
return i[0]})
items.first().addClass('active')
this.$menu.html(items)
return this},next:function(event){var active=this.$menu.find('.active').removeClass('active'),next=active.next()
if(!next.length){next=$(this.$menu.find('li')[0])}
next.addClass('active')},prev:function(event){var active=this.$menu.find('.active').removeClass('active'),prev=active.prev()
if(!prev.length){prev=this.$menu.find('li').last()}
prev.addClass('active')},listen:function(){this.$element.on('focus',$.proxy(this.focus,this)).on('blur',$.proxy(this.blur,this)).on('keypress',$.proxy(this.keypress,this)).on('keyup',$.proxy(this.keyup,this))
if(this.eventSupported('keydown')){this.$element.on('keydown',$.proxy(this.keydown,this))}
this.$menu.on('click',$.proxy(this.click,this)).on('mouseenter','li',$.proxy(this.mouseenter,this)).on('mouseleave','li',$.proxy(this.mouseleave,this))},eventSupported:function(eventName){var isSupported=eventName in this.$element
if(!isSupported){this.$element.setAttribute(eventName,'return;')
isSupported=typeof this.$element[eventName]==='function'}
return isSupported},move:function(e){if(!this.shown)return
switch(e.keyCode){case 9:case 13:case 27:e.preventDefault()
break
case 38:e.preventDefault()
this.prev()
break
case 40:e.preventDefault()
this.next()
break}
e.stopPropagation()},keydown:function(e){this.suppressKeyPressRepeat=~$.inArray(e.keyCode,[40,38,9,13,27])
this.move(e)},keypress:function(e){if(this.suppressKeyPressRepeat)return
this.move(e)},keyup:function(e){switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break
case 9:case 13:if(!this.shown)return
this.select()
break
case 27:if(!this.shown)return
this.hide()
break
default:this.lookup()}
e.stopPropagation()
e.preventDefault()},focus:function(e){this.focused=true},blur:function(e){this.focused=false
if(!this.mousedover&&this.shown)this.hide()},click:function(e){e.stopPropagation()
e.preventDefault()
this.select()
this.$element.focus()},mouseenter:function(e){this.mousedover=true
this.$menu.find('.active').removeClass('active')
$(e.currentTarget).addClass('active')},mouseleave:function(e){this.mousedover=false
if(!this.focused&&this.shown)this.hide()}}
var old=$.fn.typeahead
$.fn.typeahead=function(option){return this.each(function(){var $this=$(this),data=$this.data('typeahead'),options=typeof option=='object'&&option
if(!data)$this.data('typeahead',(data=new Typeahead(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1}
$.fn.typeahead.Constructor=Typeahead
$.fn.typeahead.noConflict=function(){$.fn.typeahead=old
return this}
$(document).on('focus.typeahead.data-api','[data-provide="typeahead"]',function(e){var $this=$(this)
if($this.data('typeahead'))return
$this.typeahead($this.data())})}(window.jQuery);!function($){"use strict";var Affix=function(element,options){this.options=$.extend({},$.fn.affix.defaults,options)
this.$window=$(window).on('scroll.affix.data-api',$.proxy(this.checkPosition,this)).on('click.affix.data-api',$.proxy(function(){setTimeout($.proxy(this.checkPosition,this),1)},this))
this.$element=$(element)
this.checkPosition()}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var scrollHeight=$(document).height(),scrollTop=this.$window.scrollTop(),position=this.$element.offset(),offset=this.options.offset,offsetBottom=offset.bottom,offsetTop=offset.top,reset='affix affix-top affix-bottom',affix
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top()
if(typeof offsetBottom=='function')offsetBottom=offset.bottom()
affix=this.unpin!=null&&(scrollTop+this.unpin<=position.top)?false:offsetBottom!=null&&(position.top+this.$element.height()>=scrollHeight-offsetBottom)?'bottom':offsetTop!=null&&scrollTop<=offsetTop?'top':false
if(this.affixed===affix)return
this.affixed=affix
this.unpin=affix=='bottom'?position.top-scrollTop:null
this.$element.removeClass(reset).addClass('affix'+(affix?'-'+affix:''))}
var old=$.fn.affix
$.fn.affix=function(option){return this.each(function(){var $this=$(this),data=$this.data('affix'),options=typeof option=='object'&&option
if(!data)$this.data('affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.affix.Constructor=Affix
$.fn.affix.defaults={offset:0}
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this),data=$spy.data()
data.offset=data.offset||{}
data.offsetBottom&&(data.offset.bottom=data.offsetBottom)
data.offsetTop&&(data.offset.top=data.offsetTop)
$spy.affix(data)})})}(window.jQuery);


/*===============================
/bt_real_estate30/plugins/system/t3/base/js/jquery.tap.min.js
================================================================================*/;
!function(r,t){"use strict";var d=t.support.touch=!!("ontouchstart"in window||window.DocumentTouch&&r instanceof DocumentTouch),e="._tap",i="tap",f=40,l=400,a="clientX clientY screenX screenY pageX pageY".split(" "),s=function(n,e){var c;return c=Array.prototype.indexOf?n.indexOf(e):t.inArray(e,n)},n={$el:null,x:0,y:0,count:0,cancel:!1,start:0},u=function(o,i){var n=i.originalEvent,c=t.Event(n),r=n.changedTouches?n.changedTouches[0]:n;c.type=o;for(var e=0,u=a.length;u>e;e++)c[a[e]]=r[a[e]];return c},g=function(t){var o=t.originalEvent,e=t.changedTouches?t.changedTouches[0]:o.changedTouches[0],i=Math.abs(e.pageX-n.x),a=Math.abs(e.pageY-n.y),r=Math.max(i,a);return Date.now()-n.start<l&&f>r&&!n.cancel&&1===n.count&&c.isTracking},c={isEnabled:!1,isTracking:!1,enable:function(){return this.isEnabled?this:(this.isEnabled=!0,t(r.body).on("touchstart"+e,this.onTouchStart).on("touchend"+e,this.onTouchEnd).on("touchcancel"+e,this.onTouchCancel),this)},disable:function(){return this.isEnabled?(this.isEnabled=!1,t(r.body).off("touchstart"+e,this.onTouchStart).off("touchend"+e,this.onTouchEnd).off("touchcancel"+e,this.onTouchCancel),this):this},onTouchStart:function(e){var o=e.originalEvent.touches;if(n.count=o.length,!c.isTracking){c.isTracking=!0;var i=o[0];n.cancel=!1,n.start=Date.now(),n.$el=t(e.target),n.x=i.pageX,n.y=i.pageY}},onTouchEnd:function(t){g(t)&&n.$el.trigger(u(i,t)),c.onTouchCancel(t)},onTouchCancel:function(){c.isTracking=!1,n.cancel=!0}};if(t.event.special[i]={setup:function(){c.enable()}},!d){var o=[],h=function(n){var e=n.originalEvent;if(!(n.isTrigger||s(o,e)>=0)){o.length>3&&o.splice(0,o.length-3),o.push(e);var c=u(i,n);t(n.target).trigger(c)}};t.event.special[i]={setup:function(){t(this).on("click"+e,h)},teardown:function(){t(this).off("click"+e,h)}}}}(document,jQuery);


/*===============================
/bt_real_estate30/plugins/system/t3/base/js/off-canvas.js
================================================================================*/;
!function($){$(document).ready(function(){if($.support.t3transform!==false){var $btn=$('.btn-navbar[data-toggle="collapse"]'),$nav=null,$fixeditems=null;if(!$btn.length){return;}
$(document.documentElement).addClass('off-canvas-ready');$nav=$('<div class="t3-mainnav" />').appendTo($('<div id="off-canvas-nav"></div>').appendTo(document.body));var $navcollapse=$btn.parent().find($btn.data('target')+':first');if(!$navcollapse.length){$navcollapse=$($btn.data('target')+':first');}
$navcollapse.clone().appendTo($nav);$btn.click(function(e){if($(this).data('off-canvas')=='show'){hideNav();}else{showNav();}
return false;});var posNav=function(){var t=$(window).scrollTop();if(t<$nav.position().top)$nav.css('top',t);},bdHideNav=function(e){e.preventDefault();hideNav();return false;},showNav=function(){$('html').addClass('off-canvas');$nav.css('top',$(window).scrollTop());wpfix(1);setTimeout(function(){$btn.data('off-canvas','show');$('html').addClass('off-canvas-enabled');$(window).on('scroll touchmove',posNav);$('#off-canvas-nav').on('click',function(e){e.stopPropagation();});$('body').on('click',bdHideNav);},50);setTimeout(function(){wpfix(2);},1000);},hideNav=function(e){if(e&&e.type=='click'&&e.target.tagName.toUpperCase()=='A'&&$(e.target).parent('li').data('noclick')){return true;}
$(window).off('scroll touchmove',posNav);$('#off-canvas-nav').off('click');$('body').off('click',bdHideNav);$('html').removeClass('off-canvas-enabled');$btn.data('off-canvas','hide');setTimeout(function(){$('html').removeClass('off-canvas');},600);},wpfix=function(step){if($fixeditems==-1){return;}
if(!$fixeditems){$fixeditems=$('body').children().filter(function(){return $(this).css('position')==='fixed'});if(!$fixeditems.length){$fixeditems=-1;return;}}
if(step==1){$fixeditems.each(function(){var $this=$(this);var style=$this.attr('style'),opos=style&&style.match('position')?$this.css('position'):'',otop=style&&style.match('top')?$this.css('top'):'';$this.data('opos',opos).data('otop',otop);$this.css({'position':'absolute','top':($(window).scrollTop()+parseInt($this.css('top')))});});}else{$fixeditems.each(function(){$this=$(this);$this.css({'position':$this.data('opos'),'top':$this.data('otop')});});}};}});}(jQuery);


/*===============================
/bt_real_estate30/plugins/system/t3/base/js/script.js
================================================================================*/;
!function($){if(match=navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)||navigator.userAgent.match(/Trident.*rv:([0-9]{1,}[\.0-9]{0,})/)){$('html').addClass('ie'+parseInt(match[1]));}
$(document).ready(function(){if(!window.getComputedStyle){window.getComputedStyle=function(el,pseudo){this.el=el;this.getPropertyValue=function(prop){var re=/(\-([a-z]){1})/g;if(prop=='float')prop='styleFloat';if(re.test(prop)){prop=prop.replace(re,function(){return arguments[2].toUpperCase();});}
return el.currentStyle[prop]?el.currentStyle[prop]:null;}
return this;}}
var fromClass='body-data-holder',prop='content',$inspector=$('<div>').css('display','none').addClass(fromClass).appendTo($('body'));try{var attrs=window.getComputedStyle($inspector[0],':before').getPropertyValue(prop);if(attrs){var matches=attrs.match(/([\da-z\-]+)/gi),data={};if(matches&&matches.length){for(var i=0;i<matches.length;i++){data[matches[i++]]=i<matches.length?matches[i]:null;}}
$('body').data(data);}}finally{$inspector.remove();}});(function(){$.support.t3transform=(function(){var style=document.createElement('div').style,vendors=['t','webkitT','MozT','msT','OT'],transform,i=0,l=vendors.length;for(;i<l;i++){transform=vendors[i]+'ransform';if(transform in style){return transform;}}
return false;})();})();(function(){$('html').addClass('ontouchstart'in window?'touch':'no-touch');})();$(document).ready(function(){(function(){if(window.MooTools&&window.MooTools.More&&Element&&Element.implement){var mthide=Element.prototype.hide,mtshow=Element.prototype.show,mtslide=Element.prototype.slide;Element.implement({show:function(args){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mtshow)&&mtshow.apply(this,args);},hide:function(){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mthide)&&mthide.apply(this,arguments);},slide:function(args){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mtslide)&&mtslide.apply(this,args);}})}})();$.fn.tooltip.Constructor&&$.fn.tooltip.Constructor.DEFAULTS&&($.fn.tooltip.Constructor.DEFAULTS.html=true);$.fn.popover.Constructor&&$.fn.popover.Constructor.DEFAULTS&&($.fn.popover.Constructor.DEFAULTS.html=true);$.fn.tooltip.defaults&&($.fn.tooltip.defaults.html=true);$.fn.popover.defaults&&($.fn.popover.defaults.html=true);(function(){if(window.jomsQuery&&jomsQuery.fn.collapse){$('[data-toggle="collapse"]').on('click',function(e){$($(this).attr('data-target')).eq(0).collapse('toggle');e.stopPropagation();return false;});jomsQuery('html, body').off('touchstart.dropdown.data-api');}})();(function(){if($.fn.chosen&&$(document.documentElement).attr('dir')=='rtl'){$('select').addClass('chzn-rtl');}})();});$(window).load(function(){if(!$(document.documentElement).hasClass('off-canvas-ready')&&($('.navbar-collapse-fixed-top').length||$('.navbar-collapse-fixed-bottom').length)){var btn=$('.btn-navbar[data-toggle="collapse"]');if(!btn.length){return;}
if(btn.data('target')){var nav=$(btn.data('target'));if(!nav.length){return;}
var fixedtop=nav.closest('.navbar-collapse-fixed-top').length;btn.on('click',function(){var wheight=(window.innerHeight||$(window).height()),offset=fixedtop?parseInt(nav.css('top'))+parseInt(nav.css('margin-top'))+parseInt(nav.closest('.navbar-collapse-fixed-top').css('top')):parseInt(nav.css('bottom'));if(!$.support.transition){nav.parent().css('height',!btn.hasClass('collapsed')&&btn.data('t3-clicked')?'':wheight);btn.data('t3-clicked',1);}
nav.addClass('animate').css('max-height',wheight-offset);});nav.on('shown hidden',function(){nav.removeClass('animate');});}}});}(jQuery);


/*===============================
/bt_real_estate30/plugins/system/t3/base/js/menu.js
================================================================================*/;
;(function($){var T3Menu=function(elm,options){this.$menu=$(elm);if(!this.$menu.length){return;}
this.options=$.extend({},$.fn.t3menu.defaults,options);this.child_open=[];this.loaded=false;this.start();};T3Menu.prototype={constructor:T3Menu,start:function(){if(this.loaded){return;}
this.loaded=true;var self=this,options=this.options,$menu=this.$menu;this.$items=$menu.find('li');this.$items.each(function(idx,li){var $item=$(this),$child=$item.children('.dropdown-menu'),$link=$item.children('a'),item={$item:$item,child:$child.length,link:$link.length,clickable:!($link.length&&$child.length),mega:$item.hasClass('mega'),status:'close',timer:null,atimer:null};$item.data('t3menu.item',item);if($child.length&&!options.hover){$item.on('click',function(e){e.stopPropagation();if($item.hasClass('group')){return;}
if(item.status=='close'){e.preventDefault();self.show(item);}});}else{$item.on('click',function(e){e.stopPropagation()});}
if(options.hover){$item.on('mouseover',function(e){if($item.hasClass('group'))return;var $target=$(e.target);if($target.data('show-processed'))return;$target.data('show-processed',true);setTimeout(function(){$target.data('show-processed',false);},10);self.show(item);}).on('mouseleave',function(e){if($item.hasClass('group'))return;var $target=$(e.target);if($target.data('hide-processed'))return;$target.data('hide-processed',true);setTimeout(function(){$target.data('hide-processed',false);},10);self.hide(item);});if($link.length&&$child.length){$link.on('click',function(e){return item.clickable;});}}});$(document.body).on('tap hideall.t3menu',function(e){clearTimeout(self.timer);self.timer=setTimeout($.proxy(self.hide_alls,self),e.type=='tap'?500:self.options.hidedelay);});},show:function(item){if($.inArray(item,this.child_open)<this.child_open.length-1){this.hide_others(item);}
$(document.body).trigger('hideall.t3menu',[this]);clearTimeout(this.timer);clearTimeout(item.timer);clearTimeout(item.ftimer);clearTimeout(item.ctimer);if(item.status!='open'||!item.$item.hasClass('open')||!this.child_open.length){if(item.mega){clearTimeout(item.astimer);clearTimeout(item.atimer);this.position(item.$item);item.astimer=setTimeout(function(){item.$item.addClass('animating')},10);item.atimer=setTimeout(function(){item.$item.removeClass('animating')},this.options.duration+50);item.timer=setTimeout(function(){item.$item.addClass('open')},100);}else{item.$item.addClass('open');}
item.status='open';if(item.child&&$.inArray(item,this.child_open)==-1){this.child_open.push(item);}}
item.ctimer=setTimeout($.proxy(this.clickable,this,item),300);},hide:function(item){clearTimeout(this.timer);clearTimeout(item.timer);clearTimeout(item.astimer);clearTimeout(item.atimer);clearTimeout(item.ftimer);if(item.mega){item.$item.addClass('animating');item.atimer=setTimeout(function(){item.$item.removeClass('animating')},this.options.duration);item.timer=setTimeout(function(){item.$item.removeClass('open')},100);}else{item.$item.removeClass('open');}
item.status='close';for(var i=this.child_open.length;i--;){if(this.child_open[i]===item){this.child_open.splice(i,1);}}
item.ftimer=setTimeout($.proxy(this.hidden,this,item),this.options.duration);this.timer=setTimeout($.proxy(this.hide_alls,this),this.options.hidedelay);},hidden:function(item){if(item.status=='close'){item.clickable=false;}},hide_others:function(item){var self=this;$.each(this.child_open.slice(),function(idx,open){if(!item||(open!=item&&!open.$item.has(item.$item).length)){self.hide(open);}});},hide_alls:function(e,inst){if(!e||e.type=='tap'||(e.type=='hideall'&&this!=inst)){var self=this;$.each(this.child_open.slice(),function(idx,item){item&&self.hide(item);});}},clickable:function(item){item.clickable=true;},position:function($item){var sub=$item.children('.mega-dropdown-menu'),is_show=sub.is(':visible');if(!is_show){sub.show();}
var offset=$item.offset(),width=$item.outerWidth(),screen_width=$(window).width()-this.options.sb_width,sub_width=sub.outerWidth(),level=$item.data('level');if(!is_show){sub.css('display','');}
sub.css({left:'',right:''});if(level==1){var align=$item.data('alignsub'),align_offset=0,align_delta=0,align_trans=0;if(align=='justify'){return;}
if(!align){align='left';}
if(align=='center'){align_offset=offset.left+(width/2);if(!$.support.t3transform){align_trans=-sub_width/2;sub.css(this.options.rtl?'right':'left',align_trans+width/2);}}else{align_offset=offset.left+((align=='left'&&this.options.rtl||align=='right'&&!this.options.rtl)?width:0);}
if(this.options.rtl){if(align=='right'){if(align_offset+sub_width>screen_width){align_delta=screen_width-align_offset-sub_width;sub.css('left',align_delta);if(screen_width<sub_width){sub.css('left',align_delta+sub_width-screen_width);}}}else{if(align_offset<(align=='center'?sub_width/2:sub_width)){align_delta=align_offset-(align=='center'?sub_width/2:sub_width);sub.css('right',align_delta+align_trans);}
if(align_offset+(align=='center'?sub_width/2:0)-align_delta>screen_width){sub.css('right',align_offset+(align=='center'?(sub_width+width)/2:0)+align_trans-screen_width);}}}else{if(align=='right'){if(align_offset<sub_width){align_delta=align_offset-sub_width;sub.css('right',align_delta);if(sub_width>screen_width){sub.css('right',sub_width-screen_width+align_delta);}}}else{if(align_offset+(align=='center'?sub_width/2:sub_width)>screen_width){align_delta=screen_width-align_offset-(align=='center'?sub_width/2:sub_width);sub.css('left',align_delta+align_trans);}
if(align_offset-(align=='center'?sub_width/2:0)+align_delta<0){sub.css('left',(align=='center'?(sub_width+width)/2:0)+align_trans-align_offset);}}}}else{if(this.options.rtl){if($item.closest('.mega-dropdown-menu').parent().hasClass('mega-align-right')){if(offset.left+width+sub_width>screen_width){$item.removeClass('mega-align-right');if(offset.left-sub_width<0){sub.css('right',offset.left+width-sub_width);}}}else{if(offset.left-sub_width<0){$item.removeClass('mega-align-left').addClass('mega-align-right');if(offset.left+width+sub_width>screen_width){sub.css('left',screen_width-offset.left-sub_width);}}}}else{if($item.closest('.mega-dropdown-menu').parent().hasClass('mega-align-right')){if(offset.left-sub_width<0){$item.removeClass('mega-align-right');if(offset.left+width+sub_width>screen_width){sub.css('left',screen_width-offset.left-sub_width);}}}else{if(offset.left+width+sub_width>screen_width){$item.removeClass('mega-align-left').addClass('mega-align-right');if(offset.left-sub_width<0){sub.css('right',offset.left+width-sub_width);}}}}}}};$.fn.t3menu=function(option){return this.each(function(){var $this=$(this),data=$this.data('megamenu'),options=typeof option=='object'&&option;if(!data){$this.data('megamenu',(data=new T3Menu(this,options)));}else{if(typeof option=='string'&&data[option]){data[option]()}}})};$.fn.t3menu.defaults={duration:400,timeout:100,hidedelay:200,hover:true,sb_width:20};$(document).ready(function(){var mm_duration=$('.t3-megamenu').data('duration')||0;if(mm_duration){$('<style type="text/css">'+'.t3-megamenu.animate .animating > .mega-dropdown-menu,'+'.t3-megamenu.animate.slide .animating > .mega-dropdown-menu > div {'+'transition-duration: '+mm_duration+'ms !important;'+'-webkit-transition-duration: '+mm_duration+'ms !important;'+'}'+'</style>').appendTo('head');}
var mm_timeout=mm_duration?100+mm_duration:500,mm_rtl=$(document.documentElement).attr('dir')=='rtl',mm_trigger=$(document.documentElement).hasClass('mm-hover'),sb_width=(function(){var parent=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),child=parent.children(),width=child.innerWidth()-child.height(100).innerWidth();parent.remove();return width;})();if(!$.support.transition){$('.t3-megamenu').removeClass('animate');mm_timeout=100;}
$('.nav').has('.dropdown-menu').t3menu({duration:mm_duration,timeout:mm_timeout,rtl:mm_rtl,sb_width:sb_width,hover:mm_trigger});$(window).load(function(){$('.nav').has('.dropdown-menu').t3menu({duration:mm_duration,timeout:mm_timeout,rtl:mm_rtl,sb_width:sb_width,hover:mm_trigger});});});})(jQuery);


/*===============================
/bt_real_estate30/plugins/system/t3/base/js/responsive.js
================================================================================*/;
jQuery(document).ready(function($){var current_layout='';var responsive_elements=$('[class*="span"], .t3respon');responsive_elements.each(function(){var $this=$(this);$this.data();$this.removeAttr('data-default data-wide data-normal data-xtablet data-tablet data-mobile');if(!$this.data('default'))$this.data('default',$this.attr('class'));});var scrollbarWidth=(function(){var div=$('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');$('body').append(div);var w1=$('div',div).innerWidth();div.css('overflow-y','scroll');var w2=$('div',div).innerWidth();$(div).remove();return(w1-w2);})();var update_layout_classes=function(new_layout){if(new_layout==current_layout)return;responsive_elements.each(function(){var $this=$(this);if(!$this.data('default'))return;if(!$this.data(new_layout)&&(!current_layout||!$this.data(current_layout)))return;if($this.data(current_layout))$this.removeClass($this.data(current_layout));else $this.removeClass($this.data('default'));if($this.data(new_layout))$this.addClass($this.data(new_layout));else $this.addClass($this.data('default'));});current_layout=new_layout;};var detect_layout=function(){var devices={wide:1200,normal:980,xtablet:768,tablet:600,mobile:0};var width=$(window).width()+scrollbarWidth;for(var device in devices){if(width>=devices[device])return device;}}
update_layout_classes(detect_layout());$(window).resize(function(){if($.data(window,'detect-layout-timeout')){clearTimeout($.data(window,'detect-layout-timeout'));}
$.data(window,'detect-layout-timeout',setTimeout(function(){update_layout_classes(detect_layout());},200))})});