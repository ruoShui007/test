(function(){if(!window.applicationCache){alert("E001-检测到您的环境不支持HTML5，程序终止运行！");return}var a=this;if(typeof Elf==="undefined"){a.Elf={}}Elf.global=a})();(function(){Elf.getEvent=function(a){return a?a:window.event};Elf.getEventSource=function(a){var b=Elf.getEvent(a);return b.srcElement?b.srcElement:b.target};Elf.stopPop=function(a){if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}}})();Elf.createChild=function(b,a){var c=Elf.controls(a);b.appendChild(c);return c};Elf.doLayout=function(){var a=document.body.scrollLeft};Elf.terminalInfo=function(){};(function(){var a=navigator.userAgent;Elf.terminalInfo.IsIE=a.indexOf("Trident")>-1;Elf.terminalInfo.IsOpera=a.indexOf("Presto")>-1;Elf.terminalInfo.IsWebKit=a.indexOf("AppleWebKit")>-1;Elf.terminalInfo.IsFireFox=a.indexOf("Gecko")>-1&&a.indexOf("KHTML")==-1;Elf.terminalInfo.IsMobile=!!a.match(/AppleWebKit.*Mobile.*/);Elf.terminalInfo.IsIOS=!!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);Elf.terminalInfo.IsAndroid=a.indexOf("Android")>-1||a.indexOf("Linux")>-1;Elf.terminalInfo.IsIPhone=a.indexOf("iPhone")>-1;Elf.terminalInfo.IsIPad=a.indexOf("iPad")>-1;Elf.terminalInfo.IsMobile=Elf.terminalInfo.IsIOS||Elf.terminalInfo.IsIPhone||Elf.terminalInfo.IsIPad||Elf.terminalInfo.IsAndroid||Elf.terminalInfo.IsMobile})();Elf.terminalInfo.testBrowserSupported=function(){if(Elf.terminalInfo.IsMobile){return true}var d={};var b=navigator.userAgent.toLowerCase();var c;(c=b.match(/trident\/([\d]+)/))?d.trident=c[1]:(c=b.match(/firefox\/([\d]+)/))?d.firefox=c[1]:(c=b.match(/chrome\/([\d]+)/))?d.chrome=c[1]:(c=b.match(/safari\/([\d]+)/))?d.safari=c[1]:0;var a=false;if(d.trident>=7||d.firefox>=36||d.chrome>=36||d.safari>=600){a=true}return a};Elf.isBrowserSupported=Elf.terminalInfo.testBrowserSupported();Elf.algorithm=function(){};Elf.algorithm.iterateKeys=function(a){var d=a.collection;var c=a.handler;for(var b in d){if(Object.prototype.hasOwnProperty.call(d,b)){c(b)}}};Elf.algorithm.iterateValues=function(a){var e=a.collection;var c=a.handler;for(var b in e){if(Object.prototype.hasOwnProperty.call(e,b)){var d=e[b];c(d)}}};Elf.algorithm.contains=function(c,b){var a=false;Elf.algorithm.iterateValues({collection:c,handler:function(d){if(d==b){a=true}}});return a};Elf.algorithm.appendEvent=function(e){var c=e.eventObj;var d=e.eventName;var b=e.eventFunction;var a=e.isStopPop;var f=function(g){var h=Elf.getEvent(g);Elf.algorithm.iterateValues({collection:f.AppendedEvents,handler:function(i){i.apply(this,arguments)}});if(f.StopPop){Elf.StopPop(h)}};if(c==null){f.AppendedEvents={};f.AppendedEvents[d]=b;f.StopPop=a}else{if(!c.AppendedEvents){f.AppendedEvents={};f.AppendedEvents.one=c;f.AppendedEvents[d]=b;f.StopPop=a}else{f.AppendedEvents=c.AppendedEvents;f.AppendedEvents[d]=b;f.StopPop=c.StopPop;if(a){f.StopPop=true}}}return f};Elf.algorithm.removeEvent=function(c){var a=c.eventObj;var b=c.eventName;if(a&&a.AppendedEvents){delete a.AppendedEvents[b]}};Elf.algorithm.copyProperties=function(a,b){Elf.algorithm.iterateKeys({collection:b,handler:function(c){a[c]=b[c]}})};Elf.algorithm.minGestureDistance=50;Elf.algorithm.isDraggedToRight=function(a){return a.draggedX>0&&(a.draggedX-Math.abs(a.draggedY))>Elf.algorithm.minGestureDistance};Elf.algorithm.isDraggedToLeft=function(a){return a.draggedX<0&&(Math.abs(a.draggedX)-Math.abs(a.draggedY))>Elf.algorithm.minGestureDistance};Elf.algorithm.getUrlParam=function(d){var e=window.location.search;var a=d.length;var c=e.indexOf(d);if(c==-1){return""}c+=a+1;var b=e.indexOf("&",c);if(b==-1){return e.substring(c)}return e.substring(c,b)};Elf.algorithm.getBlobByArrayBuffer=function(a,c){var d=window.WebKitBlobBuilder||window.MozBlobBuilder;if(d){var b=new d;b.append(a);return b.getBlob(c)}else{return new window.Blob([a],{type:c})}};Elf.algorithm.buildClosedDoublyLink=function(b){for(var c=0;c<b.length;c++){var g=c==0?(b.length-1):(c-1);var a=c==(b.length-1)?0:c+1;var e=b[g];var f=b[c];var d=b[a];f.previous=e;f.next=d;f.index=c}};Elf.algorithm.StripHTML=function(a){return a.replace(/<\/?.+?>/g,"")};Elf.constants=function(){};Elf.constants.E002="E002-无法访问浏览器离线数据库，程序终止运行！";Elf.constants.E003="E003-访问离线数据库失败，请关闭浏览器的无痕/隐身模式！";Elf.constants.E004="E004-数据访问异常！";Elf.constants.E005="E005-无法访问浏览器本地存储，程序终止运行！";Elf.constants.E006="E006-无法初始化web socket，程序终止运行！";Elf.constants.E007="E007-服务链接异常！请检测网络连接！";Elf.constants.E008="E008-服务请求异常：";Elf.constants.E009="E009-获取签名失败！";Elf.constants.E010="E010-文件上传失败！";Elf.constants.E011="E011-网络已断开！";Elf.cssText=function(){};Elf.cssText.duration=function(b){var a="-webkit-transition-duration:"+b+"s;";a+="-moz-transition-duration:"+b+"s;";a+="-ms-transition-duration:"+b+"s;";a+="-o-transition-duration:"+b+"s;";a+="transition-duration:"+b+"s;";return a};Elf.cssText.leftTopPosition=function(b,a){return"position:absolute;left:"+b+";top:"+a+";"};Elf.cssText.absoluteCenter=function(d){var a=d.parentNode;var c=(-1)*(d.offsetWidth-a.offsetWidth)/2;var b=(-1)*(d.offsetHeight-a.offsetHeight)/2;return"position:absolute;margin: auto;left:"+c+"px;top:"+b+"px;"};Elf.cssText.scale=function(b){var a="-webkit-transform:scale("+b+");";a+="-moz-transform:scale("+b+");";a+="-ms-transform:scale("+b+");";a+="-o-transform:scale("+b+");";a+="transform:scale("+b+");";return a};Elf.cssText.transformWithScale=function(b,a,d){var c="-webkit-transform:scale("+d+") translate("+b/d+"px,"+a/d+"px); ";c+="-moz-transform:scale("+d+") translate("+b/d+"px,"+a/d+"px);";c+="-ms-transform:scale("+d+") translate("+b/d+"px,"+a/d+"px);";c+="-o-transform:scale("+d+") translate("+b/d+"px,"+a/d+"px);";c+="transform:scale("+d+") translate("+b/d+"px,"+a/d+"px);";return c};Elf.cssText.rotate=function(c,b){var a="-webkit-transform:rotateX("+c+"deg) rotateY("+b+"deg);";a+="-moz-transform:rotateX("+c+"deg) rotateY("+b+"deg);";a+="-ms-transform:rotateX("+c+"deg) rotateY("+b+"deg);";a+="-o-transform:rotateX("+c+"deg) rotateY("+b+"deg);";a+="transform:rotateX("+c+"deg) rotateY("+b+"deg);";return a};Elf.controls=function(c){var b=c.name;var d=c.className;var a=c.initProps;var e;switch(b){case"button":e=document.createElement("input");e.type="button";break;case"submit":e=document.createElement("input");e.type="submit";break;case"text":e=document.createElement("input");e.type="text";break;case"search":e=document.createElement("input");e.type="search";break;case"color":e=document.createElement("input");e.type="color";break;case"file":e=document.createElement("input");e.type="file";break;case"checkbox":e=document.createElement("input");e.type="checkbox";break;case"radio":e=document.createElement("input");e.type="radio";break;case"password":e=document.createElement("input");e.type="password";break;case"hDiv":e=Elf.controls({name:"div",className:"hFlex"});break;case"hFullDiv":e=Elf.controls({name:"div",className:"hFlex full"});break;case"vDiv":e=Elf.controls({name:"div",className:"vFlex"});break;case"vFullDiv":e=Elf.controls({name:"div",className:"vFlex full"});break;case"hForm":e=Elf.controls({name:"form",className:"hFlex"});break;case"hFullForm":e=Elf.controls({name:"form",className:"hFlex full"});break;case"vForm":e=Elf.controls({name:"form",className:"vFlex"});break;case"vFullForm":e=Elf.controls({name:"form",className:"vFlex full"});break;default:e=document.createElement(b);break}if(d){e.className=e.className?e.className+" "+d:d}if(a){Elf.algorithm.copyProperties(e,a)}return e};Elf.controls.window=function(a,b){var d=Elf.controls({name:"div",className:"window full"});d.background=Elf.createChild(d,{name:"div",className:"windowBackground full"});var c=Elf.createChild(d,{name:"hFullDiv",className:"parallelCenter perpendicularCenter windowContent"});c.appendChild(b);b.WinHandler=d;a.appendChild(d)};Elf.controls.goldenRatioBox=function(a){var c=Elf.controls({name:"div",className:"goldenRatioBox"});var b=Elf.createChild(c,{name:"div",className:"full"});c.appendChild=b.appendChild;if(a){b.appendChild(a)}return c};Elf.controls.longRatioBox=function(a){var c=Elf.controls({name:"div",className:"longRatioBox"});var b=Elf.createChild(c,{name:"div",className:"full"});c.appendChild=b.appendChild;if(a){b.appendChild(a)}return c};Elf.controls.comboBox=function(c,d,a,g,f,b){var e=Elf.controls({name:"div",className:"inlineBlock"});e.wrapper=Elf.createChild(e,{name:"hDiv",className:"parallelEnd perpendicularStart"});if(d){e.wrapper.label=Elf.createChild(e.wrapper,{name:"hDiv",className:"parallelEnd perpendicularCenter "+a,initProps:{innerHTML:d}})}e.wrapper.select=Elf.createChild(e.wrapper,{name:"select",className:g,initProps:{name:c}});Elf.algorithm.iterateValues({collection:f,handler:function(i){var h=Elf.createChild(e.wrapper.select,{name:"option",initProps:{value:i.code,innerHTML:i.name}});h.boundData=i}});e.getSelectedOption=function(){return e.wrapper.select.options[e.wrapper.select.selectedIndex]};e.getBoundData=function(){var h=e.getSelectedOption();if(h){return h.boundData}};e.getCode=function(){var h=e.getBoundData();if(h){return h.code}};e.getName=function(){var h=e.getBoundData();if(h){return h.name}};e.setValue=function(h){e.wrapper.select.value=h};e.addEventListener("change",function(){var h=e.getBoundData();if(b){b(h)}});return e};Elf.controls.checkBox=function(c,b,a){var d=Elf.controls({name:"div",className:"inlineBlock skin_cursorHand skin_clickEffect"});d.labelText=b;d.wrapper=Elf.createChild(d,{name:"hDiv",className:"parallelEnd perpendicularStart"});d.isChecked=false;d.wrapper.box=Elf.createChild(d.wrapper,{name:"div",className:"checkbox_box "+c,initProps:{name:name}});d.setChecked=function(e){if(e){d.isChecked=true;Elf.effects.appendClass(d.wrapper.box,"checkbox_checked")}else{d.isChecked=false;Elf.effects.removeClass(d.wrapper.box,"checkbox_checked")}if(a){a(d.isChecked)}};d.toggleChecked=function(){d.isChecked=!d.isChecked;d.setChecked(d.isChecked)};d.wrapper.label=Elf.createChild(d.wrapper,{name:"hDiv",className:"parallelStart perpendicularCenter",initProps:{innerHTML:b}});Elf.xEvents.onXClick(d,function(){d.toggleChecked()});return d};Elf.effects=function(c){var b=c.effectName;var a=c.effectArgs;Elf.effects[b](a)};Elf.effects.DefaultDuration=0.3;Elf.effects.AnimatingFlags=[];Elf.effects.isAnimating=function(){return Elf.effects.AnimatingFlags.length!=0};Elf.effects.changeStyle=function(a){var c=a.targetObj;var d=a.duration;var b=a.css;Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);b+=Elf.cssText.duration(d);c.style.cssText+=b};Elf.effects.moveToLeft=function(a){var c=a.targetObj;var f=a.duration;Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);var e="-100%";var d="0";var b=Elf.cssText.leftTopPosition(e,d);b+=Elf.cssText.duration(f);c.style.cssText+=b};Elf.effects.moveToCentral=function(a){var c=a.targetObj;var f=a.duration;Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);var e="0";var d="0";var b=Elf.cssText.leftTopPosition(e,d);b+=Elf.cssText.duration(f);c.style.cssText+=b};Elf.effects.moveToCentralPosition=function(a){var c=a.targetObj;var f=a.duration;Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);var e=a.left;var d="0";var b=Elf.cssText.leftTopPosition(e,d);b+=Elf.cssText.duration(f);c.style.cssText+=b};Elf.effects.moveToRight=function(a){var c=a.targetObj;var f=a.duration;Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);var e="100%";var d="0";var b=Elf.cssText.leftTopPosition(e,d);b+=Elf.cssText.duration(f);c.style.cssText+=b};Elf.effects.moveToUpper=function(a){var c=a.targetObj;var f=a.duration;Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);var e="0";var d="-100%";var b=Elf.cssText.leftTopPosition(e,d);b+=Elf.cssText.duration(f);c.style.cssText+=b};Elf.effects.moveToLower=function(a){var c=a.targetObj;var f=a.duration;Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);var e="0";var d="100%";var b=Elf.cssText.leftTopPosition(e,d);b+=Elf.cssText.duration(f);c.style.cssText+=b};Elf.effects.appendClass=function(g,f){var b=f.split(" ");var c=g.className?g.className:"";var h=b.length;var e=" "+c+" ";var a=c;for(var d=0;d<h;d++){if(e.indexOf(" "+b[d]+" ")<0){a+=" "+b[d]}}g.className=a};Elf.effects.removeClass=function(f,c){var b=c.split(" ");var g=b.length;var d=f.className?f.className:"";var a=" "+d+" ";for(var e=0;e<g;e++){a=a.replace(" "+b[e]+" "," ")}f.className=a};Elf.effects.unSelected=function(b,a){if(b.isSelected){Elf.effects.removeClass(b,a);b.isSelected=false}};Elf.effects.singleSelect=function(c,b,a){if(!c.isSelected){Elf.effects.appendClass(c,a);c.isSelected=true;Elf.algorithm.iterateValues({collection:b,handler:function(d){if(d!=c){Elf.effects.unSelected(d,a)}}})}};(function(){document.addEventListener("webkitTransitionEnd",function(){Elf.effects.AnimatingFlags.pop()});document.addEventListener("transitionend",function(){Elf.effects.AnimatingFlags.pop()});document.addEventListener("otransitionend",function(){Elf.effects.AnimatingFlags.pop()})})();Elf.xEvents=function(){};Elf.xEvents.DefaultScalingDistance=5000;Elf.xEvents.DefaultScalingRoll=0.05;Elf.xEvents.DefaultTransformDistance=10;Elf.xEvents.MinTouchSpan=50;Elf.xEvents.MinMoveDistance=5;Elf.xEvents.MaxDoubleTouchSpan=300;Elf.xEvents.MaxSwipeTouchSpan=400;Elf.xEvents.isEventing=false;Elf.xEvents.preventEvent=function(){Elf.xEvents.isEventing=true;setTimeout(function(){Elf.xEvents.isEventing=false},Elf.effects.DefaultDuration*1000*1.1)};Elf.xEvents.getDistance=function(b,d,a,c){return Math.sqrt(Math.pow((b-a),2)+Math.pow((d-c),2))};Elf.xEvents.eventDispatcher=function(a){a.isDispatcherBinded=true;a.fireClick=function(){var b=document.createEvent("Event");b.initEvent("xClick",true,true);a.dispatchEvent(b)};a.fireDblClick=function(){var b=document.createEvent("Event");b.initEvent("xDblClick",true,true);a.dispatchEvent(b)};a.fireDrag=function(d){var b={draggedX:d.x,draggedY:d.y};var c=document.createEvent("Event");c.initEvent("xDragging",true,true);c.args=b;a.dispatchEvent(c)};a.fireDragEnd=function(){var b=document.createEvent("Event");b.initEvent("xDragEnd",true,true);a.dispatchEvent(b)};a.fireSwipe=function(d){var b={draggedX:d.x,draggedY:d.y};var c=document.createEvent("Event");c.initEvent("xSwipe",true,true);c.args=b;a.dispatchEvent(c)};a.fireScale=function(c){var b={scaleRate:c};var d=document.createEvent("Event");d.initEvent("xScale",true,true);d.args=b;a.dispatchEvent(d)};if(Elf.terminalInfo.IsMobile){a.TouchStarts=[];a.TouchMoves=[];a.TouchEnds=[];a.isTouchMoving=false;a.isTouchScaling=false;a.addEventListener("touchstart",function(f){var g=Elf.getEvent(f);Elf.stopPop(g);var d={};d.fingersCount=f.touches.length;d.touches=[];for(var b=0;b<f.touches.length;b++){var c={x:f.touches[b].pageX,y:f.touches[b].pageY};d.touches.push(c)}d.time=(new Date()).getTime();d.prev=a.TouchStarts[a.TouchStarts.length-1];a.TouchStarts.push(d)});a.addEventListener("touchmove",function(c){var j=Elf.getEvent(c);Elf.stopPop(j);var g={};g.fingersCount=c.touches.length;g.moveDistances=[];g.touches=[];for(var f=0;f<c.touches.length;f++){var b={x:c.touches[f].pageX-a.TouchStarts[a.TouchStarts.length-1].touches[f].x,y:c.touches[f].pageY-a.TouchStarts[a.TouchStarts.length-1].touches[f].y};if(Math.pow(b.x,2)+Math.pow(b.y,2)>Elf.xEvents.MinMoveDistance){a.isTouchMoving=true}g.moveDistances.push(b);var k={x:c.touches[f].pageX,y:c.touches[f].pageY};g.touches.push(k)}g.time=(new Date()).getTime();g.prev=a.TouchMoves[a.TouchMoves.length-1];a.TouchMoves.push(g);if(g.fingersCount==1){if(!a.isTouchScaling){a.fireDrag(g.moveDistances[0])}}else{if(g.fingersCount==2){var m=Elf.xEvents.getDistance(g.touches[0].x,g.touches[0].y,g.touches[1].x,g.touches[1].y);var d=a.TouchStarts[a.TouchStarts.length-1];var n=Elf.xEvents.getDistance(d.touches[0].x,d.touches[0].y,d.touches[1].x,d.touches[1].y);var l=m-n;var h=l/Elf.xEvents.DefaultScalingDistance;a.fireScale(h);a.isTouchScaling=true}else{}}});a.addEventListener("touchend",function(g){var j=Elf.getEvent(g);Elf.stopPop(j);var c={};c.fingersCount=g.changedTouches.length;c.touches=[];for(var d=0;d<g.changedTouches.length;d++){var f={x:g.changedTouches[d].pageX,y:g.changedTouches[d].pageY};c.touches.push(f)}c.time=(new Date()).getTime();c.prev=a.TouchEnds[a.TouchEnds.length-1];a.TouchEnds.push(c);var b=g.touches.length;if(b==0){if(a.isTouchMoving){if(c.time-a.TouchStarts[a.TouchStarts.length-1].time<Elf.xEvents.MaxSwipeTouchSpan){var k={x:c.touches[0].x-a.TouchStarts[a.TouchStarts.length-1].touches[0].x,y:c.touches[0].y-a.TouchStarts[a.TouchStarts.length-1].touches[0].y};a.fireSwipe(k)}a.fireDragEnd()}else{if(c.prev){var h=c.time-c.prev.time;if(h<Elf.xEvents.MinTouchSpan){}else{if(h<Elf.xEvents.MaxDoubleTouchSpan){a.fireDblClick()}else{a.fireClick()}}}else{a.fireClick()}}a.isTouchMoving=false;a.isTouchScaling=false}})}else{a.starts=[];a.mouseDownMoves=[];a.ends=[];a.IsMouseDown=false;a.isMouseDownMoving=false;a.addEventListener("mousedown",function(c){var d=Elf.getEvent(c);Elf.stopPop(d);var b={};b.x=d.pageX;b.y=d.pageY;b.time=(new Date()).getTime();b.prev=a.starts[a.starts.length-1];a.starts.push(b);a.IsMouseDown=true});a.addEventListener("mousemove",function(b){var d=Elf.getEvent(b);Elf.stopPop(d);if(a.IsMouseDown){var c={};c.distance={x:d.pageX-a.starts[a.starts.length-1].x,y:d.pageY-a.starts[a.starts.length-1].y};c.time=(new Date()).getTime();c.prev=a.mouseDownMoves[a.mouseDownMoves.length-1];a.mouseDownMoves.push(c);if(Math.pow(c.distance.x,2)+Math.pow(c.distance.y,2)>Elf.xEvents.MinMoveDistance){a.isMouseDownMoving=true}a.fireDrag(c.distance)}});a.addEventListener("mouseup",function(c){var f=Elf.getEvent(c);Elf.stopPop(f);var b={};b.x=f.pageX;b.y=f.pageY;b.time=(new Date()).getTime();b.prev=a.ends[a.ends.length-1];a.ends.push(b);if(a.isMouseDownMoving){if(b.time-a.starts[a.starts.length-1].time<Elf.xEvents.MaxSwipeTouchSpan){var g={x:b.x-a.starts[a.starts.length-1].x,y:b.y-a.starts[a.starts.length-1].y};a.fireSwipe(g)}a.fireDragEnd()}else{if(b.prev){var d=b.time-b.prev.time;if(d<Elf.xEvents.MinTouchSpan){}else{if(d<Elf.xEvents.MaxDoubleTouchSpan){a.fireDblClick()}else{a.fireClick()}}}else{a.fireClick()}}a.IsMouseDown=false;a.isMouseDownMoving=false});a.addEventListener("DOMMouseScroll",function(c){var d=Elf.getEvent(c);Elf.stopPop(d);var b;if(d.detail<0){b=Elf.xEvents.DefaultScalingRoll}else{b=Elf.xEvents.DefaultScalingRoll*(-1)}a.fireScale(b)});a.addEventListener("mousewheel",function(c){var d=Elf.getEvent(c);Elf.stopPop(d);var b;if(d.wheelDelta>0){b=Elf.xEvents.DefaultScalingRoll}else{b=Elf.xEvents.DefaultScalingRoll*(-1)}a.fireScale(b)})}};Elf.xEvents.bindDispatcher=function(a){if(!a.isDispatcherBinded){Elf.xEvents.eventDispatcher(a)}};Elf.xEvents.onXClick=function(b,a){b.addEventListener("xClick",a);Elf.xEvents.bindDispatcher(b)};Elf.xEvents.onXDblClick=function(b,a){b.addEventListener("xDblClick",a);Elf.xEvents.bindDispatcher(b)};Elf.xEvents.onXDragging=function(c,b,a){c.addEventListener("xDragging",b);c.addEventListener("xDragEnd",a);Elf.xEvents.bindDispatcher(c)};Elf.xEvents.onXSwipe=function(b,a){b.addEventListener("xSwipe",a);Elf.xEvents.bindDispatcher(b)};Elf.xEvents.onXScaling=function(b,a){b.addEventListener("xScale",a);Elf.xEvents.bindDispatcher(b)};Elf.webSocket=function(){};Elf.webSocket.showLoading=function(){Elf.loadingTimer=setTimeout(function(){if(Elf.webCallApp){var a={Command:"showLoading",Args:""};Elf.webCallApp(JSON.stringify(a))}else{Elf.loadMask=Elf.createChild(document.body,{name:"div",className:"loading"})}},0)};Elf.webSocket.dismissLoading=function(){clearTimeout(Elf.loadingTimer);if(Elf.webCallApp){setTimeout(function(){var a={Command:"dismissLoading",Args:""};Elf.webCallApp(JSON.stringify(a))},500)}else{if(Elf.loadMask){document.body.removeChild(Elf.loadMask);Elf.loadMask=null}}};Elf.webSocket.sendMessage=function(c,b,d){if(!window.WebSocket){alert(Elf.constants.E006);return}var a=new WebSocket(c);a.onopen=function(){Elf.webSocket.showLoading();a.send(JSON.stringify(b))};a.onclose=function(){Elf.webSocket.dismissLoading()};a.onmessage=function(e){Elf.webSocket.dismissLoading();a.close();d(JSON.parse(e.data))};a.onerror=function(e){Elf.webSocket.dismissLoading();a.close();console.error(e);alert(Elf.constants.E007)}};