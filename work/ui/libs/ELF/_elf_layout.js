
/*应用场景，全局布局适应浏览器布局*/
(function(){
    function init(target,options){
        target.root=Elf.controls({name: "div",className: "elf_fiexd"});
        if(options.border){
            Elf.utils.css(target.root,{border:options.border});
        }
        if(options.top){
            target.topRegion=Elf.createChild(target.root,{name: "div",className: "elf_fiexd_top"});
            Elf.utils.css(target.topRegion,{
                height:options.top.height,
                left:(options.flow=="clomn" ? 0 : (!!options.left && !!options.left.width ? options.left.width : 0)),
                right:(options.flow=="clomn" ? 0 : (!!options.right && !!options.right.width ? options.right.width : 0))
            });
        }
        if(options.left){
            target.leftRegion=Elf.createChild(target.root,{name: "div",className: "elf_fiexd_left"});
            Elf.utils.css(target.leftRegion,{
                width:options.left.width,
                top:(options.flow=="clomn" ? (!!options.top && !!options.top.height ? options.top.height : 0) : 0),
                bottom:(options.flow=="clomn" ? (!!options.bottom && !!options.bottom.height ? options.bottom.height : 0) : 0)
            });
        }
        if(options.right){
            target.rightRegion=Elf.createChild(target.root,{name: "div",className: "elf_fiexd_right"});
            Elf.utils.css(target.rightRegion,{
                width:options.right.width,
                top:(options.flow=="clomn" ? (!!options.top && !!options.top.height ? options.top.height : 0) : 0),
                bottom:(options.flow=="clomn" ? (!!options.bottom && !!options.bottom.height ? options.bottom.height : 0) : 0)
            });
        }
        if(options.bottom){
            target.bottomRegion=Elf.createChild(target.root,{name: "div",className: "elf_fiexd_bottom"});
            Elf.utils.css(target.bottomRegion,{
                height:options.bottom.height,
                left:(options.flow=="clomn" ? 0 : (!!options.left && !!options.left.width ? options.left.width : 0)),
                right:(options.flow=="clomn" ? 0 : (!!options.left && !!options.left.width ? options.left.width : 0))
            });
        }
        target.centerRegion=Elf.createChild(target.root,{name: "div",className: "elf_fiexd_center"});
        Elf.utils.css(target.centerRegion,{
            top:(!!options.top && options.top.height ? options.top.height : 0),
            left:(!!options.left && options.left.width ? options.left.width : 0),
            right:(!!options.right && options.right.width ? options.right.width : 0),
            bottom:(!!options.bottom && options.bottom.height ? options.bottom.height : 0)
        });
        if(options.target){
            options.target.appendChild(target.root);
        }
    }
    //Elf.layout.fixed=function(options,param){
    //    if (typeof options == 'string'){
    //        return Elf.layout.fixed.methods[options](this,param);
    //    }
    //    var me=this;
    //    console.info(me);
    //    var _this={
    //        root:""
    //    };
    //    _this.options = Elf.extend({flow:"clomn",target:document.body,border:""},options);
    //    init(_this,_this.options);
    //    return _this;
    //};
    Elf.utils.extend(Elf.layout,{
        fixed:function(options,param){
            if (typeof options == 'string'){
                return Elf.layout.fixed.methods[options](param);
            }
            var _this={
                root:""
            };
            _this.options = Elf.utils.extend({flow:"clomn",target:document.body,border:""},options);
            init(_this,_this.options);
            return _this;
        }
    });
    Elf.layout.fixed.methods = Elf.utils.extend({},{
        get:function(param){}
    });
})(Elf);
//Flow layout 流式布局
(function(){
    function init(target,options){
        if(options.border){
            Elf.utils.css(target,{border:options.border});
        }
        if(options.top){
            target.top=Elf.createChild(target,{name: "div",className: "elf_fiexd_top"});
            Elf.utils.css(target.top,{
                height:options.top.height,
                left:(options.flow=="clomn" ? 0 : (!!options.left && !!options.left.width ? options.left.width : 0)),
                right:(options.flow=="clomn" ? 0 : (!!options.right && !!options.right.width ? options.right.width : 0))
            });
        }
        if(options.left){
            target.left=Elf.createChild(target,{name: "div",className: "elf_fiexd_left"});
            Elf.utils.css(target.left,{
                width:options.left.width,
                top:(options.flow=="clomn" ? (!!options.top && !!options.top.height ? options.top.height : 0) : 0),
                bottom:(options.flow=="clomn" ? (!!options.bottom && !!options.bottom.height ? options.bottom.height : 0) : 0)
            });
        }
        if(options.right){
            target.right=Elf.createChild(target,{name: "div",className: "elf_fiexd_right"});
            Elf.utils.css(target.right,{
                width:options.right.width,
                top:(options.flow=="clomn" ? (!!options.top && !!options.top.height ? options.top.height : 0) : 0),
                bottom:(options.flow=="clomn" ? (!!options.bottom && !!options.bottom.height ? options.bottom.height : 0) : 0)
            });
        }
        if(options.bottom){
            target.bottom=Elf.createChild(target,{name: "div",className: "elf_fiexd_bottom"});
            Elf.utils.css(target.bottom,{
                height:options.bottom.height,
                left:(options.flow=="clomn" ? 0 : (!!options.left && !!options.left.width ? options.left.width : 0)),
                right:(options.flow=="clomn" ? 0 : (!!options.left && !!options.left.width ? options.left.width : 0))
            });
        }
        target.center=Elf.createChild(target,{name: "div",className: "elf_fiexd_center"});
        Elf.utils.css(target.center,{
            top:(!!options.top && options.top.height ? options.top.height : 0),
            left:(!!options.left && options.left.width ? options.left.width : 0),
            right:(!!options.right && options.right.width ? options.right.width : 0),
            bottom:(!!options.bottom && options.bottom.height ? options.bottom.height : 0)
        });
    }

    Elf.utils.extend(Elf.layout,{
        flow:function(options,param){
            if (typeof options == 'string'){
                return Elf.layout.flow.methods[options](this,param);
            }
            options = Elf.utils.extend({flow:"clomn",target:document.body,border:""},options);
            var layout=Elf.controls({name: "div",className: "elf_flow"});
            init(layout,options);
            if(options.target){
                options.target.appendChild(layout);
            }
            return layout;
        }
    });
    Elf.layout.flow.methods = Elf.utils.extend({},{
    });
})(Elf);

