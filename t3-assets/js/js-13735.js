

/*===============================
http://localhost/bt_real_estate30/modules/mod_bt_contentshowcase/assets/js/hammer.js
================================================================================*/;
function Hammer(element,options,undefined)
{var self=this;var defaults={prevent_default:false,not_prevent_tags:{id:[],className:[],tagName:[]},css_hacks:true,swipe:true,swipe_time:200,swipe_min_distance:20,drag:true,drag_vertical:true,drag_horizontal:true,drag_min_distance:20,transform:true,scale_treshold:0.1,rotation_treshold:15,tap:true,tap_double:true,tap_max_interval:300,tap_max_distance:10,tap_double_distance:20,hold:true,hold_timeout:500};options=mergeObject(defaults,options);(function(){if(!options.css_hacks){return false;}
var vendors=['webkit','moz','ms','o',''];var css_props={"userSelect":"none","touchCallout":"none","userDrag":"none","tapHighlightColor":"rgba(0,0,0,0)"};var prop='';for(var i=0;i<vendors.length;i++){for(var p in css_props){prop=p;if(vendors[i]){prop=vendors[i]+prop.substring(0,1).toUpperCase()+prop.substring(1);}
element.style[prop]=css_props[p];}}})();var _distance=0;var _angle=0;var _direction=0;var _pos={};var _fingers=0;var _first=false;var _gesture=null;var _prev_gesture=null;var _touch_start_time=null;var _prev_tap_pos={x:0,y:0};var _prev_tap_end_time=null;var _hold_timer=null;var _offset={};var _mousedown=false;var _event_start;var _event_move;var _event_end;var _has_touch=('ontouchstart'in window);var _can_tap=false;this.option=function(key,val){if(val!==undefined){options[key]=val;}
return options[key];};this.getDirectionFromAngle=function(angle){var directions={down:angle>=45&&angle<135,left:angle>=135||angle<=-135,up:angle<-45&&angle>-135,right:angle>=-45&&angle<=45};var direction,key;for(key in directions){if(directions[key]){direction=key;break;}}
return direction;};this.destroy=function(){if(_has_touch){removeEvent(element,"touchstart touchmove touchend touchcancel",handleEvents);}
else{removeEvent(element,"mouseup mousedown mousemove",handleEvents);removeEvent(element,"mouseout",handleMouseOut);}};function countFingers(event)
{return event.touches?event.touches.length:1;}
function getXYfromEvent(event)
{event=event||window.event;if(!_has_touch){var doc=document,body=doc.body;return[{x:event.pageX||event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&doc.clientLeft||0),y:event.pageY||event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&doc.clientTop||0)}];}
else{var pos=[],src;for(var t=0,len=event.touches.length;t<len;t++){src=event.touches[t];pos.push({x:src.pageX,y:src.pageY});}
return pos;}}
function getAngle(pos1,pos2)
{return Math.atan2(pos2.y-pos1.y,pos2.x-pos1.x)*180/Math.PI;}
function getDistance(pos1,pos2)
{var x=pos2.x-pos1.x,y=pos2.y-pos1.y;return Math.sqrt((x*x)+(y*y));}
function calculateScale(pos_start,pos_move)
{if(pos_start.length==2&&pos_move.length==2){var start_distance=getDistance(pos_start[0],pos_start[1]);var end_distance=getDistance(pos_move[0],pos_move[1]);return end_distance/start_distance;}
return 0;}
function calculateRotation(pos_start,pos_move)
{if(pos_start.length==2&&pos_move.length==2){var start_rotation=getAngle(pos_start[1],pos_start[0]);var end_rotation=getAngle(pos_move[1],pos_move[0]);return end_rotation-start_rotation;}
return 0;}
function triggerEvent(eventName,params)
{params.touches=getXYfromEvent(params.originalEvent);params.type=eventName;if(isFunction(self["on"+eventName])){self["on"+eventName].call(self,params);}}
function cancelEvent(event)
{event=event||window.event;if(event.preventDefault){for(i=0;i<options.not_prevent_tags.className.length;i++)
if(event.target.className==options.not_prevent_tags.className[i]){return;}
for(i=0;i<options.not_prevent_tags.tagName.length;i++)
if(event.target.tagName==options.not_prevent_tags.tagName[i]){return;}
for(i=0;i<options.not_prevent_tags.id.length;i++)
if(event.target.id==options.not_prevent_tags.id[i]){return;}
if(countFingers(event)==2){return;}
event.preventDefault();event.stopPropagation();}else{event.returnValue=false;event.cancelBubble=true;}}
function reset()
{_pos={};_first=false;_fingers=0;_distance=0;_angle=0;_gesture=null;}
var gestures={hold:function(event)
{if(options.hold){_gesture='hold';clearTimeout(_hold_timer);_hold_timer=setTimeout(function(){if(_gesture=='hold'){triggerEvent("hold",{originalEvent:event,position:_pos.start});}},options.hold_timeout);}},swipe:function(event)
{if(!_pos.move||_gesture==="transform"){return;}
var _distance_x=_pos.move[0].x-_pos.start[0].x;var _distance_y=_pos.move[0].y-_pos.start[0].y;_distance=Math.sqrt(_distance_x*_distance_x+_distance_y*_distance_y);var now=new Date().getTime();var touch_time=now-_touch_start_time;if(options.swipe&&(options.swipe_time>touch_time)&&(_distance>options.swipe_min_distance)){_angle=getAngle(_pos.start[0],_pos.move[0]);_direction=self.getDirectionFromAngle(_angle);_gesture='swipe';var position={x:_pos.move[0].x-_offset.left,y:_pos.move[0].y-_offset.top};var event_obj={originalEvent:event,position:position,direction:_direction,distance:_distance,distanceX:_distance_x,distanceY:_distance_y,angle:_angle};triggerEvent("swipe",event_obj);}},drag:function(event)
{var _distance_x=_pos.move[0].x-_pos.start[0].x;var _distance_y=_pos.move[0].y-_pos.start[0].y;_distance=Math.sqrt(_distance_x*_distance_x+_distance_y*_distance_y);if(options.drag&&(_distance>options.drag_min_distance)||_gesture=='drag'){_angle=getAngle(_pos.start[0],_pos.move[0]);_direction=self.getDirectionFromAngle(_angle);var is_vertical=(_direction=='up'||_direction=='down');if(((is_vertical&&!options.drag_vertical)||(!is_vertical&&!options.drag_horizontal))&&(_distance>options.drag_min_distance)){return;}
_gesture='drag';var position={x:_pos.move[0].x-_offset.left,y:_pos.move[0].y-_offset.top};var event_obj={originalEvent:event,position:position,direction:_direction,distance:_distance,distanceX:_distance_x,distanceY:_distance_y,angle:_angle};if(_first){triggerEvent("dragstart",event_obj);_first=false;}
triggerEvent("drag",event_obj);cancelEvent(event);}},transform:function(event)
{if(options.transform){var count=countFingers(event);if(count!==2){return false;}
var rotation=calculateRotation(_pos.start,_pos.move);var scale=calculateScale(_pos.start,_pos.move);if(_gesture==='transform'||Math.abs(1-scale)>options.scale_treshold||Math.abs(rotation)>options.rotation_treshold){_gesture='transform';_pos.center={x:((_pos.move[0].x+_pos.move[1].x)/2)-_offset.left,y:((_pos.move[0].y+_pos.move[1].y)/2)-_offset.top};if(_first)
_pos.startCenter=_pos.center;var _distance_x=_pos.center.x-_pos.startCenter.x;var _distance_y=_pos.center.y-_pos.startCenter.y;_distance=Math.sqrt(_distance_x*_distance_x+_distance_y*_distance_y);var event_obj={originalEvent:event,position:_pos.center,scale:scale,rotation:rotation,distance:_distance,distanceX:_distance_x,distanceY:_distance_y};if(_first){triggerEvent("transformstart",event_obj);_first=false;}
triggerEvent("transform",event_obj);cancelEvent(event);return true;}}
return false;},tap:function(event)
{var now=new Date().getTime();var touch_time=now-_touch_start_time;if(options.hold&&!(options.hold&&options.hold_timeout>touch_time)){return;}
var is_double_tap=(function(){if(_prev_tap_pos&&options.tap_double&&_prev_gesture=='tap'&&_pos.start&&(_touch_start_time-_prev_tap_end_time)<options.tap_max_interval)
{var x_distance=Math.abs(_prev_tap_pos[0].x-_pos.start[0].x);var y_distance=Math.abs(_prev_tap_pos[0].y-_pos.start[0].y);return(_prev_tap_pos&&_pos.start&&Math.max(x_distance,y_distance)<options.tap_double_distance);}
return false;})();if(is_double_tap){_gesture='double_tap';_prev_tap_end_time=null;triggerEvent("doubletap",{originalEvent:event,position:_pos.start});cancelEvent(event);}
else{var x_distance=(_pos.move)?Math.abs(_pos.move[0].x-_pos.start[0].x):0;var y_distance=(_pos.move)?Math.abs(_pos.move[0].y-_pos.start[0].y):0;_distance=Math.max(x_distance,y_distance);if(_distance<options.tap_max_distance){_gesture='tap';_prev_tap_end_time=now;_prev_tap_pos=_pos.start;if(options.tap){triggerEvent("tap",{originalEvent:event,position:_pos.start});cancelEvent(event);}}}}};function handleEvents(event)
{var count;switch(event.type)
{case'mousedown':case'touchstart':count=countFingers(event);_can_tap=count===1;if(count===2&&_gesture==="drag"){triggerEvent("dragend",{originalEvent:event,direction:_direction,distance:_distance,angle:_angle});}
_setup();if(options.prevent_default){cancelEvent(event);}
break;case'mousemove':case'touchmove':count=countFingers(event);if(!_mousedown&&count===1){return false;}else if(!_mousedown&&count===2){_can_tap=false;reset();_setup();}
_event_move=event;_pos.move=getXYfromEvent(event);if(!gestures.transform(event)){gestures.drag(event);}
break;case'mouseup':case'mouseout':case'touchcancel':case'touchend':var callReset=true;_mousedown=false;_event_end=event;gestures.swipe(event);if(_gesture=='drag'){triggerEvent("dragend",{originalEvent:event,direction:_direction,distance:_distance,angle:_angle});}
else if(_gesture=='transform'){var _distance_x=_pos.center.x-_pos.startCenter.x;var _distance_y=_pos.center.y-_pos.startCenter.y;triggerEvent("transformend",{originalEvent:event,position:_pos.center,scale:calculateScale(_pos.start,_pos.move),rotation:calculateRotation(_pos.start,_pos.move),distance:_distance,distanceX:_distance_x,distanceY:_distance_y});if(countFingers(event)===1){reset();_setup();callReset=false;}}else if(_can_tap){gestures.tap(_event_start);}
_prev_gesture=_gesture;triggerEvent("release",{originalEvent:event,gesture:_gesture,position:_pos.move||_pos.start});if(callReset){reset();}
break;}
function _setup(){_pos.start=getXYfromEvent(event);_touch_start_time=new Date().getTime();_fingers=countFingers(event);_first=true;_event_start=event;var box=element.getBoundingClientRect();var clientTop=element.clientTop||document.body.clientTop||0;var clientLeft=element.clientLeft||document.body.clientLeft||0;var scrollTop=window.pageYOffset||element.scrollTop||document.body.scrollTop;var scrollLeft=window.pageXOffset||element.scrollLeft||document.body.scrollLeft;_offset={top:box.top+scrollTop-clientTop,left:box.left+scrollLeft-clientLeft};_mousedown=true;gestures.hold(event);}}
function handleMouseOut(event){if(!isInsideHammer(element,event.relatedTarget)){handleEvents(event);}}
if(_has_touch){addEvent(element,"touchstart touchmove touchend touchcancel",handleEvents);}
else{addEvent(element,"mouseup mousedown mousemove",handleEvents);addEvent(element,"mouseout",handleMouseOut);}
function isInsideHammer(parent,child){if(!child&&window.event&&window.event.toElement){child=window.event.toElement;}
if(parent===child){return true;}
if(child){var node=child.parentNode;while(node!==null){if(node===parent){return true;}
node=node.parentNode;}}
return false;}
function mergeObject(obj1,obj2){var output={};if(!obj2){return obj1;}
for(var prop in obj1){if(prop in obj2){output[prop]=obj2[prop];}else{output[prop]=obj1[prop];}}
return output;}
function isFunction(obj){return Object.prototype.toString.call(obj)=="[object Function]";}
function addEvent(element,types,callback){types=types.split(" ");for(var t=0,len=types.length;t<len;t++){if(element.addEventListener){element.addEventListener(types[t],callback,false);}
else if(document.attachEvent){element.attachEvent("on"+types[t],callback);}}}
function removeEvent(element,types,callback){types=types.split(" ");for(var t=0,len=types.length;t<len;t++){if(element.removeEventListener){element.removeEventListener(types[t],callback,false);}
else if(document.detachEvent){element.detachEvent("on"+types[t],callback);}}}}


/*===============================
http://localhost/bt_real_estate30/templates/bt_real_estate/html/mod_bt_contentshowcase/themes/default/js/default.js
================================================================================*/;
$B=jQuery.noConflict();$B(document).ready(function(){jQuery('img.hovereffect').hover(function(){jQuery(this).stop(true).animate({opacity:0.5},300);},function(){jQuery(this).animate({opacity:1},300)});});