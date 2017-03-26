Elf.effects = function (args) {
//    if (Elf.effects.isAnimating()) return;

    var effectsName = args["effectName"];
    var effectsArgs = args["effectArgs"];
    Elf.effects[effectsName](effectsArgs);
};
Elf.effects.DefaultTransition=300;//ms
Elf.effects.DefaultDuration=0.3;//s, because css3 use seconds as unit

Elf.effects.AnimatingFlags = [];
Elf.effects.isAnimating = function () {
    return Elf.effects.AnimatingFlags.length != 0;
};

Elf.effects.changeStyle= function (args) {
    var targetObj = args["targetObj"];
    var duration = args["duration"];
    var css = args["css"];
    Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);

    css += Elf.cssText.duration(duration);
//    console.log(css);
    targetObj.style.cssText += css;
};

Elf.effects.moveToLeft= function (args) {
    var targetObj = args["targetObj"];
    var duration = args["duration"];
    Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);

    var left = "-100%";
    var top = "0";
    var css = Elf.cssText.leftTopPosition(left, top);
    css += Elf.cssText.duration(duration);
    targetObj.style.cssText += css;
};
Elf.effects.moveToCentral= function (args) {
    var targetObj = args["targetObj"];
    var duration = args["duration"];
    Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);

    var left = "0";
    var top = "0";
    var css = Elf.cssText.leftTopPosition(left, top);
    css += Elf.cssText.duration(duration);
    targetObj.style.cssText += css;
};
Elf.effects.moveToCentralPosition= function (args) {
    var targetObj = args["targetObj"];
    var duration = args["duration"];
//    var position = args["position"];
    Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);

    var left = args["left"];
    var top = "0";
    var css = Elf.cssText.leftTopPosition(left, top);
    css += Elf.cssText.duration(duration);
    targetObj.style.cssText += css;
};
Elf.effects.moveToRight= function (args) {
    var targetObj = args["targetObj"];
    var duration = args["duration"];
    Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);

    var left = "100%";
    var top = "0";
    var css = Elf.cssText.leftTopPosition(left, top);
    css += Elf.cssText.duration(duration);
    targetObj.style.cssText += css;
};
Elf.effects.moveToUpper= function (args) {
    var targetObj = args["targetObj"];
    var duration = args["duration"];
    Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);

    var left = "0";
    var top = "-100%";
    var css = Elf.cssText.leftTopPosition(left, top);
    css += Elf.cssText.duration(duration);
    targetObj.style.cssText += css;
};
Elf.effects.moveToLower= function (args) {
    var targetObj = args["targetObj"];
    var duration = args["duration"];
    Elf.effects.AnimatingFlags.push(Elf.effects.AnimatingFlags.length);

    var left = "0";
    var top = "100%";
    var css = Elf.cssText.leftTopPosition(left, top);
    css += Elf.cssText.duration(duration);
    targetObj.style.cssText += css;
};
/*
 * 建议使用 Elf.utils.addClass()
 * TODO delete form 2.0
 **/
Elf.effects.appendClass= function (obj,aClass) {
    //obj.classMemory=obj.className;
    //obj.className+=" "+aClass;
    var classArray=aClass.split(" ");
    var oldClassName=obj.className?obj.className:"";
    var _length=classArray.length;
    var classMatch=" "+oldClassName+" ";
    var result=oldClassName;
    for(var i=0;i<_length;i++){
        if(classMatch.indexOf(" "+classArray[i]+" ")<0){
            result+=" "+classArray[i];
        }
    }
    obj.className=result;
};
/*
 * 建议使用 Elf.utils.removeClass()
 * TODO delete form 2.0
 **/
Elf.effects.removeClass= function (obj,rClass) {
    var classArray=rClass.split(" ");
    var _length=classArray.length;
    var oldClassName=obj.className?obj.className:"";
    var result=" "+oldClassName+" ";
    for(var i=0;i<_length;i++){
        //console.log(classArray[i]);
        result=result.replace(" "+classArray[i]+" "," ");
        //console.log(result);
    }
    obj.className=result;
};

Elf.effects.unSelected=function(obj,selectedClass) {
    if (obj.isSelected) {
        Elf.effects.removeClass(obj,selectedClass);
        obj.isSelected = false;
    }
};

Elf.effects.singleSelect=function(obj, list, selectedClass) {
    if (!obj.isSelected) {
        Elf.effects.appendClass(obj, selectedClass);
        obj.isSelected = true;

        Elf.algorithm.iterateValues({
            collection: list,
            handler: function (item) {
                if (item != obj) {
                    Elf.effects.unSelected(item,selectedClass);
                }
            }
        });
    }
};
/*
 * 对象隐藏--支持回调，完成回调 可为空
 * time 毫秒数
 * create from 2.0
 **/
Elf.effects.hidden=function(obj,time,callback){
    time=!!time&&Elf.utils.isNumeric(time)?time:Elf.effects.DefaultTransition;
    obj.style.opacity= 0;
    obj.style.transition = "opacity "+ time/1000+"s"+" ease-out";
    window.setTimeout(function(){
        obj.style["display"]="none";
        obj.style.opacity="";
        obj.style.transition="";
        if(typeof(callback)==="function") {
            callback.call(obj);
        }
    },time);
    //Elf.xEvents.bind(obj,"transitionend",function(){
    //    obj.style["display"]="none";
    //    obj.style.opacity="";
    //    obj.style.transition="";
    //    console.info("dss");
    //    Elf.xEvents.unBind(obj,"transitionend",function(){});
    //    if(!!callback && typeof(callback)==="function") {
    //        callback.call(obj);
    //    }
    //});
};
/*
 * 对象效果--支持回调，完成回调 可为空
 * time 毫秒数
 * create from 2.0
 **/
Elf.effects.show=function(obj,time,fun){
    time=!!time&&Elf.utils.isNumeric(time)?time:Elf.effects.DefaultTransition;
    obj.style.opacity=1;
    obj.style.transition = "opacity "+ time/1000+"s"+" ease-out";
    window.setTimeout(function(){
        obj.style["display"]="";
        obj.style.opacity="";
        obj.style.transition="";
        if(typeof fun ==="function") {
            fun.call(this,obj);
        }
    },time);
    /*Elf.xEvents.bind(obj,"transitionend",function(){
        if(!!callback && typeof(callback)==="function") {
            callback.call(obj);
        }
    });*/
};
/*
 * 对象效果--支持回调，完成回调 可为空
 * time 毫秒数
 * create from 2.0
 * TODO need test
 **/
Elf.effects.slideUp=function(obj,time,fun){
    time = Elf.utils.isNumeric(time) ? time : Elf.effects.DefaultTransition;
    obj.style.height = 0;
    obj.style.overflow="hidden";
    obj.style.transition = "height "+ time/1000 + "s"+" ease-out";
    window.setTimeout(function(){
        obj.style["display"]="none";
        obj.style.height="";
        obj.style.transition="";
        if(typeof fun ==="function") {
            fun.call(this,obj);
        }
    },time);
};

(function () {
    document.addEventListener("webkitTransitionEnd", function () {//webkit
        Elf.effects.AnimatingFlags.pop();
    });
    document.addEventListener("transitionend", function () {//moz, ie10,ie11
        Elf.effects.AnimatingFlags.pop();
    });
    document.addEventListener("otransitionend", function () {//opera
        Elf.effects.AnimatingFlags.pop();
    });
})();

//Elf.effects.enableVScroll=function(obj) {
//    obj.className = obj.className ? obj.className + " autoOverflowY" : "autoOverflowY";
//    Elf.xEvents.onXDragging(obj,function(data){// for scroll function in mobile
//        var e = Elf.getEvent(arguments[0]);
//        Elf.stopPop(e);
//        obj.scrollTop+=(-1)*data.args.draggedY;
//    });
//};
