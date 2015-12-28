

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


/*===============================
http://localhost/bt_real_estate30/modules/mod_btimagegallery/assets/js/hammer.js
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
http://localhost/bt_real_estate30/modules/mod_btimagegallery/tmpl//js/jquery.fancybox.js
================================================================================*/;
/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.4 (Thu, 10 Jan 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
(function(window,document,$,undefined){"use strict";var W=$(window),D=$(document),F=$.fancybox=function(){F.open.apply(this,arguments);},IE=navigator.userAgent.match(/msie/),didUpdate=null,isTouch=document.createTouch!==undefined,isQuery=function(obj){return obj&&obj.hasOwnProperty&&obj instanceof $;},isString=function(str){return str&&$.type(str)==="string";},isPercentage=function(str){return isString(str)&&str.indexOf('%')>0;},isScrollable=function(el){return(el&&!(el.style.overflow&&el.style.overflow==='hidden')&&((el.clientWidth&&el.scrollWidth>el.clientWidth)||(el.clientHeight&&el.scrollHeight>el.clientHeight)));},getScalar=function(orig,dim){var value=parseInt(orig,10)||0;if(dim&&isPercentage(orig)){value=F.getViewport()[dim]/100*value;}
return Math.ceil(value);},getValue=function(value,dim){return getScalar(value,dim)+'px';};$.extend(F,{version:'2.1.4',defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,autoSize:true,autoHeight:false,autoWidth:false,autoResize:true,autoCenter:!isTouch,fitToView:true,aspectRatio:false,topRatio:0.5,leftRatio:0.5,scrolling:'auto',wrapCSS:'',arrows:true,closeBtn:true,closeClick:false,nextClick:false,mouseWheel:true,autoPlay:false,playSpeed:3000,preload:3,modal:false,loop:true,ajax:{dataType:'html',headers:{'X-fancyBox':true}},iframe:{scrolling:'auto',preload:true},swf:{wmode:'transparent',allowfullscreen:'true',allowscriptaccess:'always'},keys:{next:{13:'left',34:'up',39:'left',40:'up'},prev:{8:'right',33:'down',37:'right',38:'down'},close:[27],play:[32],toggle:[70]},direction:{next:'left',prev:'right'},scrollOutside:true,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(IE?' allowtransparency="true"':'')+'></iframe>',error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:'fade',openSpeed:250,openEasing:'swing',openOpacity:true,openMethod:'zoomIn',closeEffect:'fade',closeSpeed:250,closeEasing:'swing',closeOpacity:true,closeMethod:'zoomOut',nextEffect:'elastic',nextSpeed:250,nextEasing:'swing',nextMethod:'changeIn',prevEffect:'elastic',prevSpeed:250,prevEasing:'swing',prevMethod:'changeOut',helpers:{overlay:true,title:true},onCancel:$.noop,beforeLoad:$.noop,afterLoad:$.noop,beforeShow:$.noop,afterShow:$.noop,beforeChange:$.noop,beforeClose:$.noop,afterClose:$.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:false,isOpen:false,isOpened:false,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:false},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(group,opts){if(!group){return;}
if(!$.isPlainObject(opts)){opts={};}
if(false===F.close(true)){return;}
if(!$.isArray(group)){group=isQuery(group)?$(group).get():[group];}
$.each(group,function(i,element){var obj={},href,title,content,type,rez,hrefParts,selector;if($.type(element)==="object"){if(element.nodeType){element=$(element);}
if(isQuery(element)){obj={href:element.data('fancybox-href')||element.attr('href'),title:element.data('fancybox-title')||element.attr('title'),isDom:true,element:element};if($.metadata){$.extend(true,obj,element.metadata());}}else{obj=element;}}
href=opts.href||obj.href||(isString(element)?element:null);title=opts.title!==undefined?opts.title:obj.title||'';content=opts.content||obj.content;type=content?'html':(opts.type||obj.type);if(!type&&obj.isDom){type=element.data('fancybox-type');if(!type){rez=element.prop('class').match(/fancybox\.(\w+)/);type=rez?rez[1]:null;}}
if(isString(href)){if(!type){if(F.isImage(href)){type='image';}else if(F.isSWF(href)){type='swf';}else if(href.charAt(0)==='#'){type='inline';}else if(isString(element)){type='html';content=element;}}
if(type==='ajax'){hrefParts=href.split(/\s+/,2);href=hrefParts.shift();selector=hrefParts.shift();}}
if(!content){if(type==='inline'){if(href){content=$(isString(href)?href.replace(/.*(?=#[^\s]+$)/,''):href);}else if(obj.isDom){content=element;}}else if(type==='html'){content=href;}else if(!type&&!href&&obj.isDom){type='inline';content=element;}}
$.extend(obj,{href:href,type:type,content:content,title:title,selector:selector});group[i]=obj;});F.opts=$.extend(true,{},F.defaults,opts);if(opts.keys!==undefined){F.opts.keys=opts.keys?$.extend({},F.defaults.keys,opts.keys):false;}
F.group=group;return F._start(F.opts.index);},cancel:function(){var coming=F.coming;if(!coming||false===F.trigger('onCancel')){return;}
F.hideLoading();if(F.ajaxLoad){F.ajaxLoad.abort();}
F.ajaxLoad=null;if(F.imgPreload){F.imgPreload.onload=F.imgPreload.onerror=null;}
if(coming.wrap){coming.wrap.stop(true,true).trigger('onReset').remove();}
F.coming=null;if(!F.current){F._afterZoomOut(coming);}},close:function(event){F.cancel();if(false===F.trigger('beforeClose')){return;}
F.unbindEvents();if(!F.isActive){return;}
if(!F.isOpen||event===true){$('.fancybox-wrap').stop(true).trigger('onReset').remove();F._afterZoomOut();}else{F.isOpen=F.isOpened=false;F.isClosing=true;$('.fancybox-item, .fancybox-nav').remove();F.wrap.stop(true,true).removeClass('fancybox-opened');F.transitions[F.current.closeMethod]();}},play:function(action){var clear=function(){clearTimeout(F.player.timer);},set=function(){clear();if(F.current&&F.player.isActive){F.player.timer=setTimeout(F.next,F.current.playSpeed);}},stop=function(){clear();$('body').unbind('.player');F.player.isActive=false;F.trigger('onPlayEnd');},start=function(){if(F.current&&(F.current.loop||F.current.index<F.group.length-1)){F.player.isActive=true;$('body').bind({'afterShow.player onUpdate.player':set,'onCancel.player beforeClose.player':stop,'beforeLoad.player':clear});set();F.trigger('onPlayStart');}};if(action===true||(!F.player.isActive&&action!==false)){start();}else{stop();}},next:function(direction){var current=F.current;if(current){if(!isString(direction)){direction=current.direction.next;}
F.jumpto(current.index+1,direction,'next');}},prev:function(direction){var current=F.current;if(current){if(!isString(direction)){direction=current.direction.prev;}
F.jumpto(current.index-1,direction,'prev');}},jumpto:function(index,direction,router){var current=F.current;if(!current){return;}
index=getScalar(index);F.direction=direction||current.direction[(index>=current.index?'next':'prev')];F.router=router||'jumpto';if(current.loop){if(index<0){index=current.group.length+(index%current.group.length);}
index=index%current.group.length;}
if(current.group[index]!==undefined){F.cancel();F._start(index);}},reposition:function(e,onlyAbsolute){var current=F.current,wrap=current?current.wrap:null,pos;if(wrap){pos=F._getPosition(onlyAbsolute);if(e&&e.type==='scroll'){delete pos.position;wrap.stop(true,true).animate(pos,200);}else{wrap.css(pos);current.pos=$.extend({},current.dim,pos);}}},update:function(e){var type=(e&&e.type),anyway=!type||type==='orientationchange';if(anyway){clearTimeout(didUpdate);didUpdate=null;}
if(!F.isOpen||didUpdate){return;}
didUpdate=setTimeout(function(){var current=F.current;if(!current||F.isClosing){return;}
F.wrap.removeClass('fancybox-tmp');if(anyway||type==='load'||(type==='resize'&&current.autoResize)){F._setDimension();}
if(!(type==='scroll'&&current.canShrink)){F.reposition(e);}
F.trigger('onUpdate');didUpdate=null;},(anyway&&!isTouch?0:300));},toggle:function(action){if(F.isOpen){F.current.fitToView=$.type(action)==="boolean"?action:!F.current.fitToView;if(isTouch){F.wrap.removeAttr('style').addClass('fancybox-tmp');F.trigger('onUpdate');}
F.update();}},hideLoading:function(){D.unbind('.loading');$('#fancybox-loading').remove();},showLoading:function(){var el,viewport;F.hideLoading();el=$('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');D.bind('keydown.loading',function(e){if((e.which||e.keyCode)===27){e.preventDefault();F.cancel();}});if(!F.defaults.fixed){viewport=F.getViewport();el.css({position:'absolute',top:(viewport.h*0.5)+viewport.y,left:(viewport.w*0.5)+viewport.x});}},getViewport:function(){var locked=(F.current&&F.current.locked)||false,rez={x:W.scrollLeft(),y:W.scrollTop()};if(locked){rez.w=locked[0].clientWidth;rez.h=locked[0].clientHeight;}else{rez.w=isTouch&&window.innerWidth?window.innerWidth:W.width();rez.h=isTouch&&window.innerHeight?window.innerHeight:W.height();}
return rez;},unbindEvents:function(){if(F.wrap&&isQuery(F.wrap)){F.wrap.unbind('.fb');}
D.unbind('.fb');W.unbind('.fb');},bindEvents:function(){var current=F.current,keys;if(!current){return;}
W.bind('orientationchange.fb'+(isTouch?'':' resize.fb')+(current.autoCenter&&!current.locked?' scroll.fb':''),F.update);keys=current.keys;if(keys){D.bind('keydown.fb',function(e){var code=e.which||e.keyCode,target=e.target||e.srcElement;if(code===27&&F.coming){return false;}
if(!e.ctrlKey&&!e.altKey&&!e.shiftKey&&!e.metaKey&&!(target&&(target.type||$(target).is('[contenteditable]')))){$.each(keys,function(i,val){if(current.group.length>1&&val[code]!==undefined){F[i](val[code]);e.preventDefault();return false;}
if($.inArray(code,val)>-1){F[i]();e.preventDefault();return false;}});}});}
if($.fn.mousewheel&&current.mouseWheel){F.wrap.bind('mousewheel.fb',function(e,delta,deltaX,deltaY){var target=e.target||null,parent=$(target),canScroll=false;while(parent.length){if(canScroll||parent.is('.fancybox-skin')||parent.is('.fancybox-wrap')){break;}
canScroll=isScrollable(parent[0]);parent=$(parent).parent();}
if(delta!==0&&!canScroll){if(F.group.length>1&&!current.canShrink){if(deltaY>0||deltaX>0){F.prev(deltaY>0?'down':'left');}else if(deltaY<0||deltaX<0){F.next(deltaY<0?'up':'right');}
e.preventDefault();}}});}},trigger:function(event,o){var ret,obj=o||F.coming||F.current;if(!obj){return;}
if($.isFunction(obj[event])){ret=obj[event].apply(obj,Array.prototype.slice.call(arguments,1));}
if(ret===false){return false;}
if(obj.helpers){$.each(obj.helpers,function(helper,opts){if(opts&&F.helpers[helper]&&$.isFunction(F.helpers[helper][event])){opts=$.extend(true,{},F.helpers[helper].defaults,opts);F.helpers[helper][event](opts,obj);}});}
$.event.trigger(event+'.fb');},isImage:function(str){return isString(str)&&str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i);},isSWF:function(str){return isString(str)&&str.match(/\.(swf)((\?|#).*)?$/i);},_start:function(index){var coming={},obj,href,type,margin,padding;index=getScalar(index);obj=F.group[index]||null;if(!obj){return false;}
coming=$.extend(true,{},F.opts,obj);margin=coming.margin;padding=coming.padding;if($.type(margin)==='number'){coming.margin=[margin,margin,margin,margin];}
if($.type(padding)==='number'){coming.padding=[padding,padding,padding,padding];}
if(coming.modal){$.extend(true,coming,{closeBtn:false,closeClick:false,nextClick:false,arrows:false,mouseWheel:false,keys:null,helpers:{overlay:{closeClick:false}}});}
if(coming.autoSize){coming.autoWidth=coming.autoHeight=true;}
if(coming.width==='auto'){coming.autoWidth=true;}
if(coming.height==='auto'){coming.autoHeight=true;}
coming.group=F.group;coming.index=index;F.coming=coming;if(false===F.trigger('beforeLoad')){F.coming=null;return;}
type=coming.type;href=coming.href;if(!type){F.coming=null;if(F.current&&F.router&&F.router!=='jumpto'){F.current.index=index;return F[F.router](F.direction);}
return false;}
F.isActive=true;if(type==='image'||type==='swf'){coming.autoHeight=coming.autoWidth=false;coming.scrolling='visible';}
if(type==='image'){coming.aspectRatio=true;}
if(type==='iframe'&&isTouch){coming.scrolling='scroll';}
coming.wrap=$(coming.tpl.wrap).addClass('fancybox-'+(isTouch?'mobile':'desktop')+' fancybox-type-'+type+' fancybox-tmp '+coming.wrapCSS).appendTo(coming.parent||'body');$.extend(coming,{skin:$('.fancybox-skin',coming.wrap),outer:$('.fancybox-outer',coming.wrap),inner:$('.fancybox-inner',coming.wrap)});$.each(["Top","Right","Bottom","Left"],function(i,v){coming.skin.css('padding'+v,getValue(coming.padding[i]));});F.trigger('onReady');if(type==='inline'||type==='html'){if(!coming.content||!coming.content.length){return F._error('content');}}else if(!href){return F._error('href');}
if(type==='image'){F._loadImage();}else if(type==='ajax'){F._loadAjax();}else if(type==='iframe'){F._loadIframe();}else{F._afterLoad();}},_error:function(type){$.extend(F.coming,{type:'html',autoWidth:true,autoHeight:true,minWidth:0,minHeight:0,scrolling:'no',hasError:type,content:F.coming.tpl.error});F._afterLoad();},_loadImage:function(){var img=F.imgPreload=new Image();img.onload=function(){this.onload=this.onerror=null;F.coming.width=this.width;F.coming.height=this.height;F._afterLoad();};img.onerror=function(){this.onload=this.onerror=null;F._error('image');};img.src=F.coming.href;if(img.complete!==true){F.showLoading();}},_loadAjax:function(){var coming=F.coming;F.showLoading();F.ajaxLoad=$.ajax($.extend({},coming.ajax,{url:coming.href,error:function(jqXHR,textStatus){if(F.coming&&textStatus!=='abort'){F._error('ajax',jqXHR);}else{F.hideLoading();}},success:function(data,textStatus){if(textStatus==='success'){coming.content=data;F._afterLoad();}}}));},_loadIframe:function(){var coming=F.coming,iframe=$(coming.tpl.iframe.replace(/\{rnd\}/g,new Date().getTime())).attr('scrolling',isTouch?'auto':coming.iframe.scrolling).attr('src',coming.href);$(coming.wrap).bind('onReset',function(){try{$(this).find('iframe').hide().attr('src','//about:blank').end().empty();}catch(e){}});if(coming.iframe.preload){F.showLoading();iframe.one('load',function(){$(this).data('ready',1);if(!isTouch){$(this).bind('load.fb',F.update);}
$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();F._afterLoad();});}
coming.content=iframe.appendTo(coming.inner);if(!coming.iframe.preload){F._afterLoad();}},_preloadImages:function(){var group=F.group,current=F.current,len=group.length,cnt=current.preload?Math.min(current.preload,len-1):0,item,i;for(i=1;i<=cnt;i+=1){item=group[(current.index+i)%len];if(item.type==='image'&&item.href){new Image().src=item.href;}}},_afterLoad:function(){var coming=F.coming,previous=F.current,placeholder='fancybox-placeholder',current,content,type,scrolling,href,embed;F.hideLoading();if(!coming||F.isActive===false){return;}
if(false===F.trigger('afterLoad',coming,previous)){coming.wrap.stop(true).trigger('onReset').remove();F.coming=null;return;}
if(previous){F.trigger('beforeChange',previous);previous.wrap.stop(true).removeClass('fancybox-opened').find('.fancybox-item, .fancybox-nav').remove();}
F.unbindEvents();current=coming;content=coming.content;type=coming.type;scrolling=coming.scrolling;$.extend(F,{wrap:current.wrap,skin:current.skin,outer:current.outer,inner:current.inner,current:current,previous:previous});href=current.href;switch(type){case'inline':case'ajax':case'html':if(current.selector){content=$('<div>').html(content).find(current.selector);}else if(isQuery(content)){if(!content.data(placeholder)){content.data(placeholder,$('<div class="'+placeholder+'"></div>').insertAfter(content).hide());}
content=content.show().detach();current.wrap.bind('onReset',function(){if($(this).find(content).length){content.hide().replaceAll(content.data(placeholder)).data(placeholder,false);}});}
break;case'image':content=current.tpl.image.replace('{href}',href);break;case'swf':content='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+href+'"></param>';embed='';$.each(current.swf,function(name,val){content+='<param name="'+name+'" value="'+val+'"></param>';embed+=' '+name+'="'+val+'"';});content+='<embed src="'+href+'" type="application/x-shockwave-flash" width="100%" height="100%"'+embed+'></embed></object>';break;}
if(!(isQuery(content)&&content.parent().is(current.inner))){current.inner.append(content);}
F.trigger('beforeShow');current.inner.css('overflow',scrolling==='yes'?'scroll':(scrolling==='no'?'hidden':scrolling));F._setDimension();F.reposition();F.isOpen=false;F.coming=null;F.bindEvents();if(!F.isOpened){$('.fancybox-wrap').not(current.wrap).stop(true).trigger('onReset').remove();}else if(previous.prevMethod){F.transitions[previous.prevMethod]();}
F.transitions[F.isOpened?current.nextMethod:current.openMethod]();F._preloadImages();},_setDimension:function(){var viewport=F.getViewport(),steps=0,canShrink=false,canExpand=false,wrap=F.wrap,skin=F.skin,inner=F.inner,current=F.current,width=current.width,height=current.height,minWidth=current.minWidth,minHeight=current.minHeight,maxWidth=current.maxWidth,maxHeight=current.maxHeight,scrolling=current.scrolling,scrollOut=current.scrollOutside?current.scrollbarWidth:0,margin=current.margin,wMargin=getScalar(margin[1]+margin[3]),hMargin=getScalar(margin[0]+margin[2]),wPadding,hPadding,wSpace,hSpace,origWidth,origHeight,origMaxWidth,origMaxHeight,ratio,width_,height_,maxWidth_,maxHeight_,iframe,body;wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');wPadding=getScalar(skin.outerWidth(true)-skin.width());hPadding=getScalar(skin.outerHeight(true)-skin.height());wSpace=wMargin+wPadding;hSpace=hMargin+hPadding;origWidth=isPercentage(width)?(viewport.w-wSpace)*getScalar(width)/100:width;origHeight=isPercentage(height)?(viewport.h-hSpace)*getScalar(height)/100:height;if(current.type==='iframe'){iframe=current.content;if(current.autoHeight&&iframe.data('ready')===1){try{if(iframe[0].contentWindow.document.location){inner.width(origWidth).height(9999);body=iframe.contents().find('body');if(scrollOut){body.css('overflow-x','hidden');}
origHeight=body.height();}}catch(e){}}}else if(current.autoWidth||current.autoHeight){inner.addClass('fancybox-tmp');if(!current.autoWidth){inner.width(origWidth);}
if(!current.autoHeight){inner.height(origHeight);}
if(current.autoWidth){origWidth=inner.width();}
if(current.autoHeight){origHeight=inner.height();}
inner.removeClass('fancybox-tmp');}
width=getScalar(origWidth);height=getScalar(origHeight);ratio=origWidth/origHeight;minWidth=getScalar(isPercentage(minWidth)?getScalar(minWidth,'w')-wSpace:minWidth);maxWidth=getScalar(isPercentage(maxWidth)?getScalar(maxWidth,'w')-wSpace:maxWidth);minHeight=getScalar(isPercentage(minHeight)?getScalar(minHeight,'h')-hSpace:minHeight);maxHeight=getScalar(isPercentage(maxHeight)?getScalar(maxHeight,'h')-hSpace:maxHeight);origMaxWidth=maxWidth;origMaxHeight=maxHeight;if(current.fitToView){maxWidth=Math.min(viewport.w-wSpace,maxWidth);maxHeight=Math.min(viewport.h-hSpace,maxHeight);}
maxWidth_=viewport.w-wMargin;maxHeight_=viewport.h-hMargin;if(current.aspectRatio){if(width>maxWidth){width=maxWidth;height=getScalar(width/ratio);}
if(height>maxHeight){height=maxHeight;width=getScalar(height*ratio);}
if(width<minWidth){width=minWidth;height=getScalar(width/ratio);}
if(height<minHeight){height=minHeight;width=getScalar(height*ratio);}}else{width=Math.max(minWidth,Math.min(width,maxWidth));if(current.autoHeight&&current.type!=='iframe'){inner.width(width);height=inner.height();}
height=Math.max(minHeight,Math.min(height,maxHeight));}
if(current.fitToView){inner.width(width).height(height);wrap.width(width+wPadding);width_=wrap.width();height_=wrap.height();if(current.aspectRatio){while((width_>maxWidth_||height_>maxHeight_)&&width>minWidth&&height>minHeight){if(steps++>19){break;}
height=Math.max(minHeight,Math.min(maxHeight,height-10));width=getScalar(height*ratio);if(width<minWidth){width=minWidth;height=getScalar(width/ratio);}
if(width>maxWidth){width=maxWidth;height=getScalar(width/ratio);}
inner.width(width).height(height);wrap.width(width+wPadding);width_=wrap.width();height_=wrap.height();}}else{width=Math.max(minWidth,Math.min(width,width-(width_-maxWidth_)));height=Math.max(minHeight,Math.min(height,height-(height_-maxHeight_)));}}
if(scrollOut&&scrolling==='auto'&&height<origHeight&&(width+wPadding+scrollOut)<maxWidth_){width+=scrollOut;}
inner.width(width).height(height);wrap.width(width+wPadding);width_=wrap.width();height_=wrap.height();canShrink=(width_>maxWidth_||height_>maxHeight_)&&width>minWidth&&height>minHeight;canExpand=current.aspectRatio?(width<origMaxWidth&&height<origMaxHeight&&width<origWidth&&height<origHeight):((width<origMaxWidth||height<origMaxHeight)&&(width<origWidth||height<origHeight));$.extend(current,{dim:{width:getValue(width_),height:getValue(height_)},origWidth:origWidth,origHeight:origHeight,canShrink:canShrink,canExpand:canExpand,wPadding:wPadding,hPadding:hPadding,wrapSpace:height_-skin.outerHeight(true),skinSpace:skin.height()-height});if(!iframe&&current.autoHeight&&height>minHeight&&height<maxHeight&&!canExpand){inner.height('auto');}},_getPosition:function(onlyAbsolute){var current=F.current,viewport=F.getViewport(),margin=current.margin,width=F.wrap.width()+margin[1]+margin[3],height=F.wrap.height()+margin[0]+margin[2],rez={position:'absolute',top:margin[0],left:margin[3]};if(current.autoCenter&&current.fixed&&!onlyAbsolute&&height<=viewport.h&&width<=viewport.w){rez.position='fixed';}else if(!current.locked){rez.top+=viewport.y;rez.left+=viewport.x;}
rez.top=getValue(Math.max(rez.top,rez.top+((viewport.h-height)*current.topRatio)));rez.left=getValue(Math.max(rez.left,rez.left+((viewport.w-width)*current.leftRatio)));return rez;},_afterZoomIn:function(){var current=F.current;if(!current){return;}
F.isOpen=F.isOpened=true;F.wrap.css('overflow','visible').addClass('fancybox-opened');F.update();if(current.closeClick||(current.nextClick&&F.group.length>1)){F.inner.css('cursor','pointer').bind('click.fb',function(e){if(!$(e.target).is('a')&&!$(e.target).parent().is('a')){e.preventDefault();F[current.closeClick?'close':'next']();}});}
if(current.closeBtn){$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb',function(e){e.preventDefault();F.close();});}
if(current.arrows&&F.group.length>1){if(current.loop||current.index>0){$(current.tpl.prev).appendTo(F.outer).bind('click.fb',F.prev);}
if(current.loop||current.index<F.group.length-1){$(current.tpl.next).appendTo(F.outer).bind('click.fb',F.next);}}
F.trigger('afterShow');if(!current.loop&&current.index===current.group.length-1){F.play(false);}else if(F.opts.autoPlay&&!F.player.isActive){F.opts.autoPlay=false;F.play();}},_afterZoomOut:function(obj){obj=obj||F.current;$('.fancybox-wrap').trigger('onReset').remove();$.extend(F,{group:{},opts:{},router:false,current:null,isActive:false,isOpened:false,isOpen:false,isClosing:false,wrap:null,skin:null,outer:null,inner:null});F.trigger('afterClose',obj);}});F.transitions={getOrigPosition:function(){var current=F.current,element=current.element,orig=current.orig,pos={},width=50,height=50,hPadding=current.hPadding,wPadding=current.wPadding,viewport=F.getViewport();if(!orig&&current.isDom&&element.is(':visible')){orig=element.find('img:first');if(!orig.length){orig=element;}}
if(isQuery(orig)){pos=orig.offset();if(orig.is('img')){width=orig.outerWidth();height=orig.outerHeight();}}else{pos.top=viewport.y+(viewport.h-height)*current.topRatio;pos.left=viewport.x+(viewport.w-width)*current.leftRatio;}
if(F.wrap.css('position')==='fixed'||current.locked){pos.top-=viewport.y;pos.left-=viewport.x;}
pos={top:getValue(pos.top-hPadding*current.topRatio),left:getValue(pos.left-wPadding*current.leftRatio),width:getValue(width+wPadding),height:getValue(height+hPadding)};return pos;},step:function(now,fx){var ratio,padding,value,prop=fx.prop,current=F.current,wrapSpace=current.wrapSpace,skinSpace=current.skinSpace;if(prop==='width'||prop==='height'){ratio=fx.end===fx.start?1:(now-fx.start)/(fx.end-fx.start);if(F.isClosing){ratio=1-ratio;}
padding=prop==='width'?current.wPadding:current.hPadding;value=now-padding;F.skin[prop](getScalar(prop==='width'?value:value-(wrapSpace*ratio)));F.inner[prop](getScalar(prop==='width'?value:value-(wrapSpace*ratio)-(skinSpace*ratio)));}},zoomIn:function(){var current=F.current,startPos=current.pos,effect=current.openEffect,elastic=effect==='elastic',endPos=$.extend({opacity:1},startPos);delete endPos.position;if(elastic){startPos=this.getOrigPosition();if(current.openOpacity){startPos.opacity=0.1;}}else if(effect==='fade'){startPos.opacity=0.1;}
F.wrap.css(startPos).animate(endPos,{duration:effect==='none'?0:current.openSpeed,easing:current.openEasing,step:elastic?this.step:null,complete:F._afterZoomIn});},zoomOut:function(){var current=F.current,effect=current.closeEffect,elastic=effect==='elastic',endPos={opacity:0.1};if(elastic){endPos=this.getOrigPosition();if(current.closeOpacity){endPos.opacity=0.1;}}
F.wrap.animate(endPos,{duration:effect==='none'?0:current.closeSpeed,easing:current.closeEasing,step:elastic?this.step:null,complete:F._afterZoomOut});},changeIn:function(){var current=F.current,effect=current.nextEffect,startPos=current.pos,endPos={opacity:1},direction=F.direction,distance=200,field;startPos.opacity=0.1;if(effect==='elastic'){field=direction==='down'||direction==='up'?'top':'left';if(direction==='down'||direction==='right'){startPos[field]=getValue(getScalar(startPos[field])-distance);endPos[field]='+='+distance+'px';}else{startPos[field]=getValue(getScalar(startPos[field])+distance);endPos[field]='-='+distance+'px';}}
if(effect==='none'){F._afterZoomIn();}else{F.wrap.css(startPos).animate(endPos,{duration:current.nextSpeed,easing:current.nextEasing,complete:F._afterZoomIn});}},changeOut:function(){var previous=F.previous,effect=previous.prevEffect,endPos={opacity:0.1},direction=F.direction,distance=200;if(effect==='elastic'){endPos[direction==='down'||direction==='up'?'top':'left']=(direction==='up'||direction==='left'?'-':'+')+'='+distance+'px';}
previous.wrap.animate(endPos,{duration:effect==='none'?0:previous.prevSpeed,easing:previous.prevEasing,complete:function(){$(this).trigger('onReset').remove();}});}};F.helpers.overlay={defaults:{closeClick:true,speedOut:200,showEarly:true,css:{},locked:!isTouch,fixed:true},overlay:null,fixed:false,create:function(opts){opts=$.extend({},this.defaults,opts);if(this.overlay){this.close();}
this.overlay=$('<div class="fancybox-overlay"></div>').appendTo('body');this.fixed=false;if(opts.fixed&&F.defaults.fixed){this.overlay.addClass('fancybox-overlay-fixed');this.fixed=true;}},open:function(opts){var that=this;opts=$.extend({},this.defaults,opts);if(this.overlay){this.overlay.unbind('.overlay').width('auto').height('auto');}else{this.create(opts);}
if(!this.fixed){W.bind('resize.overlay',$.proxy(this.update,this));this.update();}
if(opts.closeClick){this.overlay.bind('click.overlay',function(e){if($(e.target).hasClass('fancybox-overlay')){if(F.isActive){F.close();}else{that.close();}}});}
this.overlay.css(opts.css).show();},close:function(){$('.fancybox-overlay').remove();W.unbind('resize.overlay');this.overlay=null;if(this.margin!==false){$('body').css('margin-right',this.margin);this.margin=false;}
if(this.el){this.el.removeClass('fancybox-lock');}},update:function(){var width='100%',offsetWidth;this.overlay.width(width).height('100%');if(IE){offsetWidth=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);if(D.width()>offsetWidth){width=D.width();}}else if(D.width()>W.width()){width=D.width();}
this.overlay.width(width).height(D.height());},onReady:function(opts,obj){$('.fancybox-overlay').stop(true,true);if(!this.overlay){this.margin=D.height()>W.height()||$('body').css('overflow-y')==='scroll'?$('body').css('margin-right'):false;this.el=document.all&&!document.querySelector?$('html'):$('body');this.create(opts);}
if(opts.locked&&this.fixed){obj.locked=this.overlay.append(obj.wrap);obj.fixed=false;}
if(opts.showEarly===true){this.beforeShow.apply(this,arguments);}},beforeShow:function(opts,obj){if(obj.locked){this.el.addClass('fancybox-lock');if(this.margin!==false){$('body').css('margin-right',getScalar(this.margin)+obj.scrollbarWidth);}}
this.open(opts);},onUpdate:function(){if(!this.fixed){this.update();}},afterClose:function(opts){if(this.overlay&&!F.isActive){this.overlay.fadeOut(opts.speedOut,$.proxy(this.close,this));}}};F.helpers.title={defaults:{type:'float',position:'bottom'},beforeShow:function(opts){var current=F.current,text=current.title,type=opts.type,title,target;if($.isFunction(text)){text=text.call(current.element,current);}
if(!isString(text)||$.trim(text)===''){return;}
title=$('<div class="fancybox-title fancybox-title-'+type+'-wrap">'+text+'</div>');switch(type){case'inside':target=F.skin;break;case'outside':target=F.wrap;break;case'over':target=F.inner;break;default:target=F.skin;title.appendTo('body');if(IE){title.width(title.width());}
title.wrapInner('<span class="child"></span>');F.current.margin[2]+=Math.abs(getScalar(title.css('margin-bottom')));break;}
title[(opts.position==='top'?'prependTo':'appendTo')](target);}};$.fn.fancybox=function(options){var index,that=$(this),selector=this.selector||'',run=function(e){var what=$(this).blur(),idx=index,relType,relVal;if(!(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey)&&!what.is('.fancybox-wrap')){relType=options.groupAttr||'data-fancybox-group';relVal=what.attr(relType);if(!relVal){relType='rel';relVal=what.get(0)[relType];}
if(relVal&&relVal!==''&&relVal!=='nofollow'){what=selector.length?$(selector):that;what=what.filter('['+relType+'="'+relVal+'"]');idx=what.index(this);}
options.index=idx;if(F.open(what,options)!==false){e.preventDefault();}}};options=options||{};index=options.index||0;if(!selector||options.live===false){that.unbind('click.fb-start').bind('click.fb-start',run);}else{D.undelegate(selector,'click.fb-start').delegate(selector+":not('.fancybox-item, .fancybox-nav')",'click.fb-start',run);}
this.filter('[data-fancybox-start=1]').trigger('click');return this;};D.ready(function(){if($.scrollbarWidth===undefined){$.scrollbarWidth=function(){var parent=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),child=parent.children(),width=child.innerWidth()-child.height(99).innerWidth();parent.remove();return width;};}
if($.support.fixedPosition===undefined){$.support.fixedPosition=(function(){var elem=$('<div style="position:fixed;top:20px;"></div>').appendTo('body'),fixed=(elem[0].offsetTop===20||elem[0].offsetTop===15);elem.remove();return fixed;}());}
$.extend(F.defaults,{scrollbarWidth:$.scrollbarWidth(),fixed:$.support.fixedPosition,parent:$('body')});});}(window,document,jQuery));


/*===============================
http://localhost/bt_real_estate30/modules/mod_btimagegallery/tmpl//js/jquery.fancybox-buttons.js
================================================================================*/;
/*!
 * Buttons helper for fancyBox
 * version: 1.0.5 (Mon, 15 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             buttons: {
 *                 position : 'top'
 *             }
 *         }
 *     });
 *
 */
(function($){var F=$.fancybox;F.helpers.buttons={defaults:{skipSingle:false,position:'top',tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:jQuery.fancybox.close();"></a></li></ul></div>'},list:null,buttons:null,beforeLoad:function(opts,obj){if(opts.skipSingle&&obj.group.length<2){obj.helpers.buttons=false;obj.closeBtn=true;return;}
obj.margin[opts.position==='bottom'?2:0]+=30;},onPlayStart:function(){if(this.buttons){this.buttons.play.attr('title','Pause slideshow').addClass('btnPlayOn');}},onPlayEnd:function(){if(this.buttons){this.buttons.play.attr('title','Start slideshow').removeClass('btnPlayOn');}},afterShow:function(opts,obj){var buttons=this.buttons;if(!buttons){this.list=$(opts.tpl).addClass(opts.position).appendTo('body');buttons={prev:this.list.find('.btnPrev').click(F.prev),next:this.list.find('.btnNext').click(F.next),play:this.list.find('.btnPlay').click(F.play),toggle:this.list.find('.btnToggle').click(F.toggle)}}
if(obj.index>0||obj.loop){buttons.prev.removeClass('btnDisabled');}else{buttons.prev.addClass('btnDisabled');}
if(obj.loop||obj.index<obj.group.length-1){buttons.next.removeClass('btnDisabled');buttons.play.removeClass('btnDisabled');}else{buttons.next.addClass('btnDisabled');buttons.play.addClass('btnDisabled');}
this.buttons=buttons;this.onUpdate(opts,obj);},onUpdate:function(opts,obj){var toggle;if(!this.buttons){return;}
toggle=this.buttons.toggle.removeClass('btnDisabled btnToggleOn');if(obj.canShrink){toggle.addClass('btnToggleOn');}else if(!obj.canExpand){toggle.addClass('btnDisabled');}},beforeClose:function(){if(this.list){this.list.remove();}
this.list=null;this.buttons=null;}};}(jQuery));


/*===============================
http://localhost/bt_real_estate30/modules/mod_btimagegallery/tmpl//js/jquery.fancybox-thumbs.js
================================================================================*/;
/*!
 * Thumbnail helper for fancyBox
 * version: 1.0.7 (Mon, 01 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             thumbs: {
 *                 width  : 50,
 *                 height : 50
 *             }
 *         }
 *     });
 *
 */
(function($){var F=$.fancybox;F.helpers.thumbs={defaults:{width:50,height:50,position:'bottom',source:function(item){var href;if(item.element){href=$(item.element).find('img').attr('src');}
if(!href&&item.type==='image'&&item.href){href=item.href;}
return href;}},wrap:null,list:null,width:0,init:function(opts,obj){var that=this,list,thumbWidth=opts.width,thumbHeight=opts.height,thumbSource=opts.source;list='';for(var n=0;n<obj.group.length;n++){list+='<li><a style="width:'+thumbWidth+'px;height:'+thumbHeight+'px;" href="javascript:jQuery.fancybox.jumpto('+n+');"></a></li>';}
this.wrap=$('<div id="fancybox-thumbs"></div>').addClass(opts.position).appendTo('body');this.list=$('<ul>'+list+'</ul>').appendTo(this.wrap);$.each(obj.group,function(i){var href=thumbSource(obj.group[i]);if(!href){return;}
$("<img />").load(function(){var width=this.width,height=this.height,widthRatio,heightRatio,parent;if(!that.list||!width||!height){return;}
widthRatio=width/thumbWidth;heightRatio=height/thumbHeight;parent=that.list.children().eq(i).find('a');if(widthRatio>=1&&heightRatio>=1){if(widthRatio>heightRatio){width=Math.floor(width/heightRatio);height=thumbHeight;}else{width=thumbWidth;height=Math.floor(height/widthRatio);}}
$(this).css({width:width,height:height,top:Math.floor(thumbHeight/2-height/2),left:Math.floor(thumbWidth/2-width/2)});parent.width(thumbWidth).height(thumbHeight);$(this).hide().appendTo(parent).fadeIn(300);}).attr('src',href);});this.width=this.list.children().eq(0).outerWidth(true);this.list.width(this.width*(obj.group.length+1)).css('left',Math.floor($(window).width()*0.5-(obj.index*this.width+this.width*0.5)));},beforeLoad:function(opts,obj){if(obj.group.length<2){obj.helpers.thumbs=false;return;}
obj.margin[opts.position==='top'?0:2]+=((opts.height)+15);},afterShow:function(opts,obj){if(this.list){this.onUpdate(opts,obj);}else{this.init(opts,obj);}
this.list.children().removeClass('active').eq(obj.index).addClass('active');},onUpdate:function(opts,obj){if(this.list){this.list.stop(true).animate({'left':Math.floor($(window).width()*0.5-(obj.index*this.width+this.width*0.5))},150);}},beforeClose:function(){if(this.wrap){this.wrap.remove();}
this.wrap=null;this.list=null;this.width=0;}}}(jQuery));


/*===============================
http://localhost/bt_real_estate30/templates/bt_real_estate/html/mod_btimagegallery/js/default.js
================================================================================*/;
jQuery.noConflict();$B=jQuery;function appendOverlay(a){$B(a).append("<div class='btig-overlay'></div>");}
$B(document).ready(function(){var tag=document.createElement('script');tag.src="//www.youtube.com/player_api";var firstScriptTag=document.getElementsByTagName('script')[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);$B('.btloading').remove();$B('.jcarousel').fadeIn();$B('.mod_btimagegallery .next,.mod_btimagegallery .prev').fadeIn();if(typeof(btiModuleIds)!='undefined'){for(var i=0;i<btiModuleIds.length;i++){initBTimageGallery(btiModuleOpts[i]);}}
function initBTimageGallery(moduleOpts){var showBullet=moduleOpts.showBullet,moduleID='#btimagegallery'+moduleOpts.moduleID,responsive=moduleOpts.responsive,touchscreen=moduleOpts.touchscreen,moduleURI=moduleOpts.moduleURI;if($B.browser.version<9.0)touchscreen=0;$B(moduleID).bind("dragstart",function(event,ui){return false;});if(showBullet&&!responsive){var step=moduleOpts.scroll,size=$B(moduleID+' .jcarousel li').length,i=1;if(step<size){$B(moduleID+' .jcarousel li').each(function(){if((($B(this).index())%step==0)){$B(moduleID+' .pagination').append('<a href="#" class="page-'+($B(this).index()+1)+'" rel="'+($B(this).index()+1)+'"></a>');if($B(this).index()+1+moduleOpts.itemVisible>size)return false;if($B(this).index()+1+moduleOpts.itemVisible<=size&&$B(this).index()+1+step>size){$B(moduleID+' .pagination').append('<a href="#" class="page-'+(size)+'" rel="'+(size)+'"></a>');}}});}
$B(moduleID+' .pagination a').eq(0).addClass('current');$B(moduleID+' .pagination').append('<div style="clear: both;"></div>');}
var getautofancy;var nextimg;if(moduleOpts.autofancybox==0){getautofancy=false;}else{getautofancy=true;}
if(moduleOpts.shownp==1){nextimg=true;}else{nextimg=false;}
$B(moduleID+' .jcarousel').jcarousel({initCallback:function(carousel,state){if(touchscreen){var hammer=new Hammer(carousel.list.parent()[0],{prevent_default:true});var carouselWidth=carousel.list.parent().width();hammer.ontap=function(ev){if(ev.originalEvent.button==undefined||ev.originalEvent.button==0){target=ev.originalEvent.target;el=$B(target.parentNode);gallery=el.parent().parent();$B(moduleID+" a.fancybox").fancybox({padding:0,autoResize:true,autoCenter:true,openEffect:moduleOpts.animationeffect,nextEffect:moduleOpts.animationeffect,prevEffect:moduleOpts.animationeffect,openSpeed:150,closeEffect:moduleOpts.animationeffect,closeSpeed:150,closeBtn:true,closeClick:true,overlayShow:true,overlayOpacity:0.6,zoomSpeedIn:0,zoomSpeedOut:100,easingIn:"swing",easingOut:"swing",openEasing:"swing",closeEasing:"swing",nextEasing:"swing",prevEasing:"swing",hideOnContentClick:false,centerOnScroll:false,imageScale:true,autoDimensions:true,autoPlay:getautofancy,showNavArrows:true,mouseWheel:true,playSpeed:moduleOpts.playspeed,loop:true,arrows:nextimg,helpers:{media:{},title:{type:'inside'},buttons:(moduleOpts.showhelperbutton)?{}:""},beforeLoad:function(){if(moduleOpts.autofancybox==1){$B.fancybox.play(true);}},afterLoad:function(){this.title='Image '+(this.index+1)+' of '+this.group.length+(this.title?' - '+this.title:'');},beforeShow:function(){var id=$B.fancybox.inner.find('iframe').attr('id');if(typeof(id)!='undefined'){var player=new YT.Player(id,{playerVars:{'autoplay':0,'controls':0},events:{'onReady':onPlayerReady,'onStateChange':onPlayerStateChange}});}},afterShow:function(){var id=$B.fancybox.inner.find('iframe').attr('id');if(typeof(id)!='undefined'){$B('.fancybox-nav').hide();$B('.fancybox-title').html('');var youtubeid=$B(".fancybox-iframe").attr("src").match(/[\w\-]{11,}/)[0];$B.getJSON('http://gdata.youtube.com/feeds/api/videos/'+youtubeid+'?v=2&alt=jsonc&callback=?',function(data,status,xhr){$B('.fancybox-title').html(data.data.title);});var deviceAgent=navigator.userAgent.toLowerCase();var agentID=deviceAgent.match(/(iphone|ipod|ipad)/);if(agentID){$B('.fancybox-title').after('<div class="fancybox-drag">Swipe in here to move slide</div>');}}
$B('.fancybox-drag').each(function(){var elem=$B(this);setInterval(function(){if(elem.css('visibility')=='hidden'){elem.css('visibility','visible');}else{elem.css('visibility','hidden');}},800);});if(typeof(id)!='undefined'){var hammer=new Hammer($B(".fancybox-title").get(0),{drag_min_distance:50,drag_horizontal:true,drag_vertical:true,transform:true,scale_treshold:0.1,hold:true,hold_timeout:400,swipe:true,swipe_time:200,swipe_min_distance:20,prevent_default:true});}else{var hammer=new Hammer($B(".fancybox-inner").get(0),{drag_min_distance:50,drag_horizontal:true,drag_vertical:true,transform:true,scale_treshold:0.1,hold:true,hold_timeout:400,swipe:true,swipe_time:200,swipe_min_distance:20,prevent_default:true});}
hammer.ontap=function(ev){$B.fancybox.close();}
var timeout=0;hammer.ondrag=function(ev){var load=true;if(Math.abs(ev.distance)>50){clearTimeout(timeout);if(ev.direction=='right'){timeout=setTimeout(function(){$B.fancybox.prev();},100);load=false;}
if(ev.direction=='down'){timeout=setTimeout(function(){$B.fancybox.prev('down');},100);load=false;}
if(ev.direction=='up'){timeout=setTimeout(function(){$B.fancybox.next('up');},100);load=false;}
if(ev.direction=='left'){timeout=setTimeout(function(){$B.fancybox.next();},100);load=false;}}};hammer.onhold=function(ev){var width=$B(".fancybox-wrap").width();width=width*(0.85);$B(".fancybox-wrap").width(width);$B(".fancybox-inner").width(width);var height=$B(".fancybox-wrap").height();height=height*(0.85);$B(".fancybox-wrap").height(height);$B(".fancybox-inner").height(height);};var oldScale=0.0;hammer.ontransform=function(ev){var width=$B(".fancybox-wrap").width();var height=$B(".fancybox-wrap").height();var scale=1+ev.scale-oldScale;width=width*(scale);$B(".fancybox-wrap").width(width);$B(".fancybox-inner").width(width);height=height*(scale);$B(".fancybox-wrap").height(height);$B(".fancybox-inner").height(height);oldScale=ev.scale;};hammer.onswipe=function(ev){if(ev.direction=='right'){$B(".fancybox-inner").attr("Left",$B(".fancybox-wrap").width()+'px');}
if(ev.direction=='left'){$B(".fancybox-inner").attr("Left",'0'+'px');}};}});el.click();}}
hammer.ondrag=function(ev){if(carousel.options.onAnimate){return}
if(ev.direction=='left'){carousel.list.css('left',carousel.options.posAfterAnimate-ev.distance);}
if(ev.direction=='right'){carousel.list.css('left',carousel.options.posAfterAnimate+ev.distance);}}
hammer.ondragend=function(ev){if(carousel.options.onAnimate){return}
if(ev.distance>100){if(ev.direction=='left'){if(carousel.first==carousel.options.size){carousel.options.onAnimate=true;carousel.list.animate({left:carousel.options.posAfterAnimate},250,function(){carousel.options.onAnimate=false;});}else{carousel.options.onAnimate=true;carousel.pauseAuto();carousel.animate(carousel.pos(carousel.first+carousel.options.scroll)+ev.distance-1);carousel.stopAuto();carousel.options.auto=10000;}}
if(ev.direction=='right'){if(carousel.first==1){carousel.options.onAnimate=true;carousel.list.animate({left:0},250,function(){carousel.options.onAnimate=false;});}else{carousel.options.onAnimate=true;carousel.pauseAuto();carousel.animate(carousel.pos(carousel.first-carousel.options.scroll)-ev.distance-1);carousel.stopAuto();carousel.options.auto=10000;}}}else{carousel.list.animate({left:carousel.options.posAfterAnimate},250,function(){carousel.options.onAnimate=false;});}}
var timeout=0;hammer.onswipe=function(ev){clearTimeout(timeout);if(carousel.options.onAnimate){return}
if(ev.direction=='left'){if(carousel.first==carousel.options.size){carousel.options.onAnimate=true;timeout=setTimeout(function(){carousel.list.animate({left:carousel.options.posAfterAnimate},150,function(){carousel.options.onAnimate=false;});},100);}else{timeout=setTimeout(function(){carousel.pauseAuto();carousel.options.onAnimate=true;carousel.animate(carousel.pos(carousel.first+carousel.options.scroll)+ev.distance-1);carousel.stopAuto();carousel.options.auto=10000;},100);}}
if(ev.direction=='right'){if(carousel.first==1){carousel.options.onAnimate=true;timeout=setTimeout(function(){carousel.list.animate({left:carousel.options.posAfterAnimate},150,function(){carousel.options.onAnimate=false;});},100);}else{timeout=setTimeout(function(){carousel.pauseAuto();carousel.options.onAnimate=true;carousel.animate(carousel.pos(carousel.first-carousel.options.scroll)-ev.distance-1);carousel.stopAuto();carousel.options.auto=10000;},100);}}}}
if(moduleOpts.responsive){$B(window).bind('resize.btim',function(){var minWidth=moduleOpts.liWidth;var minOutterWidth=minWidth+parseInt($B(moduleID+' .jcarousel-item').css('margin-left'))
+parseInt($B(moduleID+' .jcarousel-item').css('margin-right'));var numberItem=$B(moduleID+' .jcarousel-item').length;var width=$B(moduleID+' .jcarousel-container').parent().innerWidth();$B(moduleID+' .jcarousel-container,'+moduleID+' .jcarousel-clip').width(width);var availableItem=Math.floor(width/minOutterWidth);if(availableItem==0)availableItem=1;var delta=0;var newWidth=0;if(width>minOutterWidth){if(availableItem>numberItem){delta=Math.floor((width-minOutterWidth*numberItem)/numberItem);}else{delta=Math.floor(width%minOutterWidth/availableItem);}
newWidth=minWidth+delta;}else{newWidth=width;}
var ratio=$B(moduleID+' .jcarousel-item img').width()/$B(moduleID+' .jcarousel-item img').height();$B(moduleID+' .jcarousel-item img').width(newWidth).height(Math.floor(newWidth/ratio));carousel.options.visible=availableItem>numberItem?numberItem:availableItem;carousel.options.scroll=availableItem;if($B.browser.webkit){$B(moduleID+' .jcarousel-item').width(newWidth);$B(moduleID+' .jcarousel-list').width(carousel.options.size*$B(moduleID+' .jcarousel-item').outerWidth(true));}else{carousel.funcResize();}
if(moduleOpts.showBullet){$B(moduleID+' .pagination').html('');if(carousel.options.visible<numberItem){var i=1;var step=carousel.options.visible;if(step>=numberItem){$B(moduleID+' .pagination').append('<a href="#" class="page-'+(1)+'" rel="'+(1)+'"></a>');$B(moduleID+' .pagination').append('<a href="#" class="page-'+(numberItem)+'" rel="'+(numberItem)+'"></a>');}else{$B(moduleID+' .jcarousel li').each(function(){if((($B(this).index())%step==0)){$B(moduleID+' .pagination').append('<a href="#" class="page-'+($B(this).index()+1)+'" rel="'+($B(this).index()+1)+'"></a>');if($B(this).index()+1+carousel.options.visible>numberItem)return false;if($B(this).index()+1+carousel.options.visible<=numberItem&&$B(this).index()+1+step>numberItem){$B(moduleID+' .pagination').append('<a href="#" class="page-'+(numberItem)+'" rel="'+(numberItem)+'"></a>');}}});}
$B(moduleID+' .pagination a').eq(0).addClass('current');$B(moduleID+' .pagination').append('<div style="clear: both;"></div>');$B(moduleID+' .pagination a').bind('click',function(){if($B(this).hasClass('current'))return false;carousel.stopAuto();carousel.options.auto=10000;$B(this).parent().find('.current').removeClass('current');$B(this).addClass('current');carousel.scroll($B.jcarousel.intval($B(this).attr('rel')));return false;});}}});$B(window).trigger('resize.btim');}
if(moduleOpts.showBullet){$B(moduleID+' .pagination a').bind('click',function(){if($B(this).hasClass('current'))return false;carousel.stopAuto();carousel.options.auto=10000;$B(this).parent().find('.current').removeClass('current');$B(this).addClass('current');carousel.scroll($B.jcarousel.intval($B(this).attr('rel')));return false;});}
if(moduleOpts.showNav){var prev=moduleID+' .prev';var next=moduleID+' .next';$B(prev).unbind('click').click(function(){carousel.prev();carousel.stopAuto();carousel.options.auto=10000;return false;});$B(next).unbind('click').click(function(){carousel.next();carousel.stopAuto();carousel.options.auto=10000;return false;});}
if(moduleOpts.pauseHover){carousel.clip.hover(function(){carousel.stopAuto();},function(){carousel.startAuto();});}},itemLoadCallback:{onAfterAnimation:function(carousel,state){if(carousel.first==1){carousel.options.posAfterAnimate=0;}else{carousel.options.posAfterAnimate=carousel.pos(carousel.first);}
carousel.options.onAnimate=false;if(moduleOpts.showBullet){var size=carousel.options.size;var index=carousel.first;$B(moduleID+' .pagination a').removeClass('current');if($B(moduleID+' .pagination a.page-'+index).length==0){var last=carousel.last;while(last>size){last-=size;}
if(last==size){$B(moduleID+' .pagination a').last().addClass('current');}else{var lastNavigation;do{last--;lastNavigation=$B(moduleID+' .pagination a.page-'+last);if(last<=0)break;}while(lastNavigation.length==0);lastNavigation.addClass('current');}}else{$B(moduleID+' .pagination a.page-'+index).addClass('current');}}}},start:1,auto:moduleOpts.auto,animation:moduleOpts.animation,buttonNextHTML:null,buttonPrevHTML:null,scroll:(!moduleOpts.responsive)?moduleOpts.scroll:3,wrap:'both',rtl:moduleOpts.rtl});if(!touchscreen){$B(moduleID+" a.fancybox").fancybox({padding:0,autoResize:true,autoCenter:true,openEffect:moduleOpts.animationeffect,nextEffect:moduleOpts.animationeffect,prevEffect:moduleOpts.animationeffect,openSpeed:150,closeEffect:moduleOpts.animationeffect,closeSpeed:150,closeBtn:true,closeClick:true,overlayShow:true,overlayOpacity:0.6,zoomSpeedIn:0,zoomSpeedOut:100,easingIn:"swing",easingOut:"swing",nextEasing:"swing",prevEasing:"swing",hideOnContentClick:false,centerOnScroll:false,imageScale:true,autoDimensions:true,autoPlay:getautofancy,showNavArrows:true,mouseWheel:true,playSpeed:moduleOpts.playspeed,loop:true,arrows:nextimg,helpers:{media:{},title:{type:'inside'},buttons:(moduleOpts.showhelperbutton)?{}:""},beforeLoad:function(){if(moduleOpts.autofancybox==1){$B.fancybox.play(true);}},afterLoad:function(){this.title='Image '+(this.index+1)+' of '+this.group.length+(this.title?' - '+this.title:'');},afterShow:function(){var id=$B.fancybox.inner.find('iframe').attr('id');if(typeof(id)!='undefined'){$B('.fancybox-nav').css({'height':'82%','margin-top':'7%','z-index':'999'});$B('.fancybox-title').html('');var youtubeid=$B(".fancybox-iframe").attr("src").match(/[\w\-]{11,}/)[0];$B.getJSON('http://gdata.youtube.com/feeds/api/videos/'+youtubeid+'?v=2&alt=jsonc&callback=?',function(data,status,xhr){$B('.fancybox-title').html(data.data.title);});}},beforeShow:function(){var id=$B.fancybox.inner.find('iframe').attr('id');if(typeof(id)!='undefined'){var player=new YT.Player(id,{playerVars:{'autoplay':0,'controls':0},events:{'onReady':onPlayerReady,'onStateChange':onPlayerStateChange}});}}});}
function onPlayerReady(event){}
function onPlayerStateChange(event){switch(event.data){case-1:return;case 0:if(moduleOpts.autofancybox==1){$B.fancybox.next();$B.fancybox.play(true);}
return;case 1:case 2:case 3:case 5:$B.fancybox.play(false);return;}}
var deviceAgent=navigator.userAgent.toLowerCase();var agentID=deviceAgent.match(/(iphone|ipod|ipad)/);if(!agentID){$B(moduleID+" .jcarousel-item a").hover(function(){$B(this).children(' .imageicon').children(".icon").addClass('iconhover');appendOverlay(this);},function(){$B(this).children(".btig-overlay").remove();$B(this).children(' .imageicon').children(".icon").removeClass('iconhover');});}}});