/* PLUGINS                                      
--------------------------------------------------------*/
/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).IMask={})}(this,(function(t){"use strict";function e(t){return"string"==typeof t||t instanceof String}function s(t){var e;return"object"==typeof t&&null!=t&&"Object"===(null==t||null==(e=t.constructor)?void 0:e.name)}function i(t,e){return Array.isArray(e)?i(t,((t,s)=>e.includes(s))):Object.entries(t).reduce(((t,s)=>{let[i,a]=s;return e(a,i)&&(t[i]=a),t}),{})}const a={NONE:"NONE",LEFT:"LEFT",FORCE_LEFT:"FORCE_LEFT",RIGHT:"RIGHT",FORCE_RIGHT:"FORCE_RIGHT"};function u(t){switch(t){case a.LEFT:return a.FORCE_LEFT;case a.RIGHT:return a.FORCE_RIGHT;default:return t}}function n(t){return t.replace(/([.*+?^=!:${}()|[\]/\\])/g,"\\$1")}function r(t,e){if(e===t)return!0;const s=Array.isArray(e),i=Array.isArray(t);let a;if(s&&i){if(e.length!=t.length)return!1;for(a=0;a<e.length;a++)if(!r(e[a],t[a]))return!1;return!0}if(s!=i)return!1;if(e&&t&&"object"==typeof e&&"object"==typeof t){const s=e instanceof Date,i=t instanceof Date;if(s&&i)return e.getTime()==t.getTime();if(s!=i)return!1;const u=e instanceof RegExp,n=t instanceof RegExp;if(u&&n)return e.toString()==t.toString();if(u!=n)return!1;const h=Object.keys(e);for(a=0;a<h.length;a++)if(!Object.prototype.hasOwnProperty.call(t,h[a]))return!1;for(a=0;a<h.length;a++)if(!r(t[h[a]],e[h[a]]))return!1;return!0}return!(!e||!t||"function"!=typeof e||"function"!=typeof t)&&e.toString()===t.toString()}class h{constructor(t){for(Object.assign(this,t);this.value.slice(0,this.startChangePos)!==this.oldValue.slice(0,this.startChangePos);)--this.oldSelection.start;if(this.insertedCount)for(;this.value.slice(this.cursorPos)!==this.oldValue.slice(this.oldSelection.end);)this.value.length-this.cursorPos<this.oldValue.length-this.oldSelection.end?++this.oldSelection.end:++this.cursorPos}get startChangePos(){return Math.min(this.cursorPos,this.oldSelection.start)}get insertedCount(){return this.cursorPos-this.startChangePos}get inserted(){return this.value.substr(this.startChangePos,this.insertedCount)}get removedCount(){return Math.max(this.oldSelection.end-this.startChangePos||this.oldValue.length-this.value.length,0)}get removed(){return this.oldValue.substr(this.startChangePos,this.removedCount)}get head(){return this.value.substring(0,this.startChangePos)}get tail(){return this.value.substring(this.startChangePos+this.insertedCount)}get removeDirection(){return!this.removedCount||this.insertedCount?a.NONE:this.oldSelection.end!==this.cursorPos&&this.oldSelection.start!==this.cursorPos||this.oldSelection.end!==this.oldSelection.start?a.LEFT:a.RIGHT}}function o(t,e){return new o.InputMask(t,e)}function l(t){if(null==t)throw new Error("mask property should be defined");return t instanceof RegExp?o.MaskedRegExp:e(t)?o.MaskedPattern:t===Date?o.MaskedDate:t===Number?o.MaskedNumber:Array.isArray(t)||t===Array?o.MaskedDynamic:o.Masked&&t.prototype instanceof o.Masked?t:o.Masked&&t instanceof o.Masked?t.constructor:t instanceof Function?o.MaskedFunction:(console.warn("Mask not found for mask",t),o.Masked)}function p(t){if(!t)throw new Error("Options in not defined");if(o.Masked){if(t.prototype instanceof o.Masked)return{mask:t};const{mask:e,...a}=t instanceof o.Masked?{mask:t}:s(t)&&t.mask instanceof o.Masked?t:{};if(e){const t=e.mask;return{...i(e,((t,e)=>!e.startsWith("_"))),mask:e.constructor,_mask:t,...a}}}return s(t)?{...t}:{mask:t}}function d(t){if(o.Masked&&t instanceof o.Masked)return t;const e=p(t),s=l(e.mask);if(!s)throw new Error("Masked class is not found for provided mask "+e.mask+", appropriate module needs to be imported manually before creating mask.");return e.mask===s&&delete e.mask,e._mask&&(e.mask=e._mask,delete e._mask),new s(e)}o.createMask=d;class c{get selectionStart(){let t;try{t=this._unsafeSelectionStart}catch{}return null!=t?t:this.value.length}get selectionEnd(){let t;try{t=this._unsafeSelectionEnd}catch{}return null!=t?t:this.value.length}select(t,e){if(null!=t&&null!=e&&(t!==this.selectionStart||e!==this.selectionEnd))try{this._unsafeSelect(t,e)}catch{}}get isActive(){return!1}}o.MaskElement=c;class g extends c{constructor(t){super(),this.input=t,this._onKeydown=this._onKeydown.bind(this),this._onInput=this._onInput.bind(this),this._onBeforeinput=this._onBeforeinput.bind(this),this._onCompositionEnd=this._onCompositionEnd.bind(this)}get rootElement(){var t,e,s;return null!=(t=null==(e=(s=this.input).getRootNode)?void 0:e.call(s))?t:document}get isActive(){return this.input===this.rootElement.activeElement}bindEvents(t){this.input.addEventListener("keydown",this._onKeydown),this.input.addEventListener("input",this._onInput),this.input.addEventListener("beforeinput",this._onBeforeinput),this.input.addEventListener("compositionend",this._onCompositionEnd),this.input.addEventListener("drop",t.drop),this.input.addEventListener("click",t.click),this.input.addEventListener("focus",t.focus),this.input.addEventListener("blur",t.commit),this._handlers=t}_onKeydown(t){return this._handlers.redo&&(90===t.keyCode&&t.shiftKey&&(t.metaKey||t.ctrlKey)||89===t.keyCode&&t.ctrlKey)?(t.preventDefault(),this._handlers.redo(t)):this._handlers.undo&&90===t.keyCode&&(t.metaKey||t.ctrlKey)?(t.preventDefault(),this._handlers.undo(t)):void(t.isComposing||this._handlers.selectionChange(t))}_onBeforeinput(t){return"historyUndo"===t.inputType&&this._handlers.undo?(t.preventDefault(),this._handlers.undo(t)):"historyRedo"===t.inputType&&this._handlers.redo?(t.preventDefault(),this._handlers.redo(t)):void 0}_onCompositionEnd(t){this._handlers.input(t)}_onInput(t){t.isComposing||this._handlers.input(t)}unbindEvents(){this.input.removeEventListener("keydown",this._onKeydown),this.input.removeEventListener("input",this._onInput),this.input.removeEventListener("beforeinput",this._onBeforeinput),this.input.removeEventListener("compositionend",this._onCompositionEnd),this.input.removeEventListener("drop",this._handlers.drop),this.input.removeEventListener("click",this._handlers.click),this.input.removeEventListener("focus",this._handlers.focus),this.input.removeEventListener("blur",this._handlers.commit),this._handlers={}}}o.HTMLMaskElement=g;class k extends g{constructor(t){super(t),this.input=t}get _unsafeSelectionStart(){return null!=this.input.selectionStart?this.input.selectionStart:this.value.length}get _unsafeSelectionEnd(){return this.input.selectionEnd}_unsafeSelect(t,e){this.input.setSelectionRange(t,e)}get value(){return this.input.value}set value(t){this.input.value=t}}o.HTMLMaskElement=g;class m extends g{get _unsafeSelectionStart(){const t=this.rootElement,e=t.getSelection&&t.getSelection(),s=e&&e.anchorOffset,i=e&&e.focusOffset;return null==i||null==s||s<i?s:i}get _unsafeSelectionEnd(){const t=this.rootElement,e=t.getSelection&&t.getSelection(),s=e&&e.anchorOffset,i=e&&e.focusOffset;return null==i||null==s||s>i?s:i}_unsafeSelect(t,e){if(!this.rootElement.createRange)return;const s=this.rootElement.createRange();s.setStart(this.input.firstChild||this.input,t),s.setEnd(this.input.lastChild||this.input,e);const i=this.rootElement,a=i.getSelection&&i.getSelection();a&&(a.removeAllRanges(),a.addRange(s))}get value(){return this.input.textContent||""}set value(t){this.input.textContent=t}}o.HTMLContenteditableMaskElement=m;class _{constructor(){this.states=[],this.currentIndex=0}get currentState(){return this.states[this.currentIndex]}get isEmpty(){return 0===this.states.length}push(t){this.currentIndex<this.states.length-1&&(this.states.length=this.currentIndex+1),this.states.push(t),this.states.length>_.MAX_LENGTH&&this.states.shift(),this.currentIndex=this.states.length-1}go(t){return this.currentIndex=Math.min(Math.max(this.currentIndex+t,0),this.states.length-1),this.currentState}undo(){return this.go(-1)}redo(){return this.go(1)}clear(){this.states.length=0,this.currentIndex=0}}_.MAX_LENGTH=100;class f{constructor(t,e){this.el=t instanceof c?t:t.isContentEditable&&"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName?new m(t):new k(t),this.masked=d(e),this._listeners={},this._value="",this._unmaskedValue="",this._rawInputValue="",this.history=new _,this._saveSelection=this._saveSelection.bind(this),this._onInput=this._onInput.bind(this),this._onChange=this._onChange.bind(this),this._onDrop=this._onDrop.bind(this),this._onFocus=this._onFocus.bind(this),this._onClick=this._onClick.bind(this),this._onUndo=this._onUndo.bind(this),this._onRedo=this._onRedo.bind(this),this.alignCursor=this.alignCursor.bind(this),this.alignCursorFriendly=this.alignCursorFriendly.bind(this),this._bindEvents(),this._onChange()}maskEquals(t){var e;return null==t||(null==(e=this.masked)?void 0:e.maskEquals(t))}get mask(){return this.masked.mask}set mask(t){if(this.maskEquals(t))return;if(!(t instanceof o.Masked)&&this.masked.constructor===l(t))return void this.masked.updateOptions({mask:t});const e=t instanceof o.Masked?t:d({mask:t});e.unmaskedValue=this.masked.unmaskedValue,this.masked=e}get value(){return this._value}set value(t){this.value!==t&&(this.masked.value=t,this.updateControl("auto"))}get unmaskedValue(){return this._unmaskedValue}set unmaskedValue(t){this.unmaskedValue!==t&&(this.masked.unmaskedValue=t,this.updateControl("auto"))}get rawInputValue(){return this._rawInputValue}set rawInputValue(t){this.rawInputValue!==t&&(this.masked.rawInputValue=t,this.updateControl(),this.alignCursor())}get typedValue(){return this.masked.typedValue}set typedValue(t){this.masked.typedValueEquals(t)||(this.masked.typedValue=t,this.updateControl("auto"))}get displayValue(){return this.masked.displayValue}_bindEvents(){this.el.bindEvents({selectionChange:this._saveSelection,input:this._onInput,drop:this._onDrop,click:this._onClick,focus:this._onFocus,commit:this._onChange,undo:this._onUndo,redo:this._onRedo})}_unbindEvents(){this.el&&this.el.unbindEvents()}_fireEvent(t,e){const s=this._listeners[t];s&&s.forEach((t=>t(e)))}get selectionStart(){return this._cursorChanging?this._changingCursorPos:this.el.selectionStart}get cursorPos(){return this._cursorChanging?this._changingCursorPos:this.el.selectionEnd}set cursorPos(t){this.el&&this.el.isActive&&(this.el.select(t,t),this._saveSelection())}_saveSelection(){this.displayValue!==this.el.value&&console.warn("Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly."),this._selection={start:this.selectionStart,end:this.cursorPos}}updateValue(){this.masked.value=this.el.value,this._value=this.masked.value,this._unmaskedValue=this.masked.unmaskedValue,this._rawInputValue=this.masked.rawInputValue}updateControl(t){const e=this.masked.unmaskedValue,s=this.masked.value,i=this.masked.rawInputValue,a=this.displayValue,u=this.unmaskedValue!==e||this.value!==s||this._rawInputValue!==i;this._unmaskedValue=e,this._value=s,this._rawInputValue=i,this.el.value!==a&&(this.el.value=a),"auto"===t?this.alignCursor():null!=t&&(this.cursorPos=t),u&&this._fireChangeEvents(),this._historyChanging||!u&&!this.history.isEmpty||this.history.push({unmaskedValue:e,selection:{start:this.selectionStart,end:this.cursorPos}})}updateOptions(t){const{mask:e,...s}=t,i=!this.maskEquals(e),a=this.masked.optionsIsChanged(s);i&&(this.mask=e),a&&this.masked.updateOptions(s),(i||a)&&this.updateControl()}updateCursor(t){null!=t&&(this.cursorPos=t,this._delayUpdateCursor(t))}_delayUpdateCursor(t){this._abortUpdateCursor(),this._changingCursorPos=t,this._cursorChanging=setTimeout((()=>{this.el&&(this.cursorPos=this._changingCursorPos,this._abortUpdateCursor())}),10)}_fireChangeEvents(){this._fireEvent("accept",this._inputEvent),this.masked.isComplete&&this._fireEvent("complete",this._inputEvent)}_abortUpdateCursor(){this._cursorChanging&&(clearTimeout(this._cursorChanging),delete this._cursorChanging)}alignCursor(){this.cursorPos=this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos,a.LEFT))}alignCursorFriendly(){this.selectionStart===this.cursorPos&&this.alignCursor()}on(t,e){return this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e),this}off(t,e){if(!this._listeners[t])return this;if(!e)return delete this._listeners[t],this;const s=this._listeners[t].indexOf(e);return s>=0&&this._listeners[t].splice(s,1),this}_onInput(t){this._inputEvent=t,this._abortUpdateCursor();const e=new h({value:this.el.value,cursorPos:this.cursorPos,oldValue:this.displayValue,oldSelection:this._selection}),s=this.masked.rawInputValue,i=this.masked.splice(e.startChangePos,e.removed.length,e.inserted,e.removeDirection,{input:!0,raw:!0}).offset,u=s===this.masked.rawInputValue?e.removeDirection:a.NONE;let n=this.masked.nearestInputPos(e.startChangePos+i,u);u!==a.NONE&&(n=this.masked.nearestInputPos(n,a.NONE)),this.updateControl(n),delete this._inputEvent}_onChange(){this.displayValue!==this.el.value&&this.updateValue(),this.masked.doCommit(),this.updateControl(),this._saveSelection()}_onDrop(t){t.preventDefault(),t.stopPropagation()}_onFocus(t){this.alignCursorFriendly()}_onClick(t){this.alignCursorFriendly()}_onUndo(){this._applyHistoryState(this.history.undo())}_onRedo(){this._applyHistoryState(this.history.redo())}_applyHistoryState(t){t&&(this._historyChanging=!0,this.unmaskedValue=t.unmaskedValue,this.el.select(t.selection.start,t.selection.end),this._saveSelection(),this._historyChanging=!1)}destroy(){this._unbindEvents(),this._listeners.length=0,delete this.el}}o.InputMask=f;class v{static normalize(t){return Array.isArray(t)?t:[t,new v]}constructor(t){Object.assign(this,{inserted:"",rawInserted:"",tailShift:0,skip:!1},t)}aggregate(t){return this.inserted+=t.inserted,this.rawInserted+=t.rawInserted,this.tailShift+=t.tailShift,this.skip=this.skip||t.skip,this}get offset(){return this.tailShift+this.inserted.length}get consumed(){return Boolean(this.rawInserted)||this.skip}equals(t){return this.inserted===t.inserted&&this.tailShift===t.tailShift&&this.rawInserted===t.rawInserted&&this.skip===t.skip}}o.ChangeDetails=v;class E{constructor(t,e,s){void 0===t&&(t=""),void 0===e&&(e=0),this.value=t,this.from=e,this.stop=s}toString(){return this.value}extend(t){this.value+=String(t)}appendTo(t){return t.append(this.toString(),{tail:!0}).aggregate(t._appendPlaceholder())}get state(){return{value:this.value,from:this.from,stop:this.stop}}set state(t){Object.assign(this,t)}unshift(t){if(!this.value.length||null!=t&&this.from>=t)return"";const e=this.value[0];return this.value=this.value.slice(1),e}shift(){if(!this.value.length)return"";const t=this.value[this.value.length-1];return this.value=this.value.slice(0,-1),t}}class C{constructor(t){this._value="",this._update({...C.DEFAULTS,...t}),this._initialized=!0}updateOptions(t){this.optionsIsChanged(t)&&this.withValueRefresh(this._update.bind(this,t))}_update(t){Object.assign(this,t)}get state(){return{_value:this.value,_rawInputValue:this.rawInputValue}}set state(t){this._value=t._value}reset(){this._value=""}get value(){return this._value}set value(t){this.resolve(t,{input:!0})}resolve(t,e){void 0===e&&(e={input:!0}),this.reset(),this.append(t,e,""),this.doCommit()}get unmaskedValue(){return this.value}set unmaskedValue(t){this.resolve(t,{})}get typedValue(){return this.parse?this.parse(this.value,this):this.unmaskedValue}set typedValue(t){this.format?this.value=this.format(t,this):this.unmaskedValue=String(t)}get rawInputValue(){return this.extractInput(0,this.displayValue.length,{raw:!0})}set rawInputValue(t){this.resolve(t,{raw:!0})}get displayValue(){return this.value}get isComplete(){return!0}get isFilled(){return this.isComplete}nearestInputPos(t,e){return t}totalInputPositions(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),Math.min(this.displayValue.length,e-t)}extractInput(t,e,s){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),this.displayValue.slice(t,e)}extractTail(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),new E(this.extractInput(t,e),t)}appendTail(t){return e(t)&&(t=new E(String(t))),t.appendTo(this)}_appendCharRaw(t,e){return t?(this._value+=t,new v({inserted:t,rawInserted:t})):new v}_appendChar(t,e,s){void 0===e&&(e={});const i=this.state;let a;if([t,a]=this.doPrepareChar(t,e),t&&(a=a.aggregate(this._appendCharRaw(t,e)),!a.rawInserted&&"pad"===this.autofix)){const s=this.state;this.state=i;let u=this.pad(e);const n=this._appendCharRaw(t,e);u=u.aggregate(n),n.rawInserted||u.equals(a)?a=u:this.state=s}if(a.inserted){let t,u=!1!==this.doValidate(e);if(u&&null!=s){const e=this.state;if(!0===this.overwrite){t=s.state;for(let t=0;t<a.rawInserted.length;++t)s.unshift(this.displayValue.length-a.tailShift)}let i=this.appendTail(s);if(u=i.rawInserted.length===s.toString().length,!(u&&i.inserted||"shift"!==this.overwrite)){this.state=e,t=s.state;for(let t=0;t<a.rawInserted.length;++t)s.shift();i=this.appendTail(s),u=i.rawInserted.length===s.toString().length}u&&i.inserted&&(this.state=e)}u||(a=new v,this.state=i,s&&t&&(s.state=t))}return a}_appendPlaceholder(){return new v}_appendEager(){return new v}append(t,s,i){if(!e(t))throw new Error("value should be string");const a=e(i)?new E(String(i)):i;let u;null!=s&&s.tail&&(s._beforeTailState=this.state),[t,u]=this.doPrepare(t,s);for(let e=0;e<t.length;++e){const i=this._appendChar(t[e],s,a);if(!i.rawInserted&&!this.doSkipInvalid(t[e],s,a))break;u.aggregate(i)}return(!0===this.eager||"append"===this.eager)&&null!=s&&s.input&&t&&u.aggregate(this._appendEager()),null!=a&&(u.tailShift+=this.appendTail(a).tailShift),u}remove(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),this._value=this.displayValue.slice(0,t)+this.displayValue.slice(e),new v}withValueRefresh(t){if(this._refreshing||!this._initialized)return t();this._refreshing=!0;const e=this.rawInputValue,s=this.value,i=t();return this.rawInputValue=e,this.value&&this.value!==s&&0===s.indexOf(this.value)&&(this.append(s.slice(this.displayValue.length),{},""),this.doCommit()),delete this._refreshing,i}runIsolated(t){if(this._isolated||!this._initialized)return t(this);this._isolated=!0;const e=this.state,s=t(this);return this.state=e,delete this._isolated,s}doSkipInvalid(t,e,s){return Boolean(this.skipInvalid)}doPrepare(t,e){return void 0===e&&(e={}),v.normalize(this.prepare?this.prepare(t,this,e):t)}doPrepareChar(t,e){return void 0===e&&(e={}),v.normalize(this.prepareChar?this.prepareChar(t,this,e):t)}doValidate(t){return(!this.validate||this.validate(this.value,this,t))&&(!this.parent||this.parent.doValidate(t))}doCommit(){this.commit&&this.commit(this.value,this)}splice(t,e,s,i,n){void 0===s&&(s=""),void 0===i&&(i=a.NONE),void 0===n&&(n={input:!0});const r=t+e,h=this.extractTail(r),o=!0===this.eager||"remove"===this.eager;let l;o&&(i=u(i),l=this.extractInput(0,r,{raw:!0}));let p=t;const d=new v;if(i!==a.NONE&&(p=this.nearestInputPos(t,e>1&&0!==t&&!o?a.NONE:i),d.tailShift=p-t),d.aggregate(this.remove(p)),o&&i!==a.NONE&&l===this.rawInputValue)if(i===a.FORCE_LEFT){let t;for(;l===this.rawInputValue&&(t=this.displayValue.length);)d.aggregate(new v({tailShift:-1})).aggregate(this.remove(t-1))}else i===a.FORCE_RIGHT&&h.unshift();return d.aggregate(this.append(s,n,h))}maskEquals(t){return this.mask===t}optionsIsChanged(t){return!r(this,t)}typedValueEquals(t){const e=this.typedValue;return t===e||C.EMPTY_VALUES.includes(t)&&C.EMPTY_VALUES.includes(e)||!!this.format&&this.format(t,this)===this.format(this.typedValue,this)}pad(t){return new v}}C.DEFAULTS={skipInvalid:!0},C.EMPTY_VALUES=[void 0,null,""],o.Masked=C;class A{constructor(t,e){void 0===t&&(t=[]),void 0===e&&(e=0),this.chunks=t,this.from=e}toString(){return this.chunks.map(String).join("")}extend(t){if(!String(t))return;t=e(t)?new E(String(t)):t;const s=this.chunks[this.chunks.length-1],i=s&&(s.stop===t.stop||null==t.stop)&&t.from===s.from+s.toString().length;if(t instanceof E)i?s.extend(t.toString()):this.chunks.push(t);else if(t instanceof A){if(null==t.stop){let e;for(;t.chunks.length&&null==t.chunks[0].stop;)e=t.chunks.shift(),e.from+=t.from,this.extend(e)}t.toString()&&(t.stop=t.blockIndex,this.chunks.push(t))}}appendTo(t){if(!(t instanceof o.MaskedPattern)){return new E(this.toString()).appendTo(t)}const e=new v;for(let s=0;s<this.chunks.length;++s){const i=this.chunks[s],a=t._mapPosToBlock(t.displayValue.length),u=i.stop;let n;if(null!=u&&(!a||a.index<=u)&&((i instanceof A||t._stops.indexOf(u)>=0)&&e.aggregate(t._appendPlaceholder(u)),n=i instanceof A&&t._blocks[u]),n){const s=n.appendTail(i);e.aggregate(s);const a=i.toString().slice(s.rawInserted.length);a&&e.aggregate(t.append(a,{tail:!0}))}else e.aggregate(t.append(i.toString(),{tail:!0}))}return e}get state(){return{chunks:this.chunks.map((t=>t.state)),from:this.from,stop:this.stop,blockIndex:this.blockIndex}}set state(t){const{chunks:e,...s}=t;Object.assign(this,s),this.chunks=e.map((t=>{const e="chunks"in t?new A:new E;return e.state=t,e}))}unshift(t){if(!this.chunks.length||null!=t&&this.from>=t)return"";const e=null!=t?t-this.from:t;let s=0;for(;s<this.chunks.length;){const t=this.chunks[s],i=t.unshift(e);if(t.toString()){if(!i)break;++s}else this.chunks.splice(s,1);if(i)return i}return""}shift(){if(!this.chunks.length)return"";let t=this.chunks.length-1;for(;0<=t;){const e=this.chunks[t],s=e.shift();if(e.toString()){if(!s)break;--t}else this.chunks.splice(t,1);if(s)return s}return""}}class F{constructor(t,e){this.masked=t,this._log=[];const{offset:s,index:i}=t._mapPosToBlock(e)||(e<0?{index:0,offset:0}:{index:this.masked._blocks.length,offset:0});this.offset=s,this.index=i,this.ok=!1}get block(){return this.masked._blocks[this.index]}get pos(){return this.masked._blockStartPos(this.index)+this.offset}get state(){return{index:this.index,offset:this.offset,ok:this.ok}}set state(t){Object.assign(this,t)}pushState(){this._log.push(this.state)}popState(){const t=this._log.pop();return t&&(this.state=t),t}bindBlock(){this.block||(this.index<0&&(this.index=0,this.offset=0),this.index>=this.masked._blocks.length&&(this.index=this.masked._blocks.length-1,this.offset=this.block.displayValue.length))}_pushLeft(t){for(this.pushState(),this.bindBlock();0<=this.index;--this.index,this.offset=(null==(e=this.block)?void 0:e.displayValue.length)||0){var e;if(t())return this.ok=!0}return this.ok=!1}_pushRight(t){for(this.pushState(),this.bindBlock();this.index<this.masked._blocks.length;++this.index,this.offset=0)if(t())return this.ok=!0;return this.ok=!1}pushLeftBeforeFilled(){return this._pushLeft((()=>{if(!this.block.isFixed&&this.block.value)return this.offset=this.block.nearestInputPos(this.offset,a.FORCE_LEFT),0!==this.offset||void 0}))}pushLeftBeforeInput(){return this._pushLeft((()=>{if(!this.block.isFixed)return this.offset=this.block.nearestInputPos(this.offset,a.LEFT),!0}))}pushLeftBeforeRequired(){return this._pushLeft((()=>{if(!(this.block.isFixed||this.block.isOptional&&!this.block.value))return this.offset=this.block.nearestInputPos(this.offset,a.LEFT),!0}))}pushRightBeforeFilled(){return this._pushRight((()=>{if(!this.block.isFixed&&this.block.value)return this.offset=this.block.nearestInputPos(this.offset,a.FORCE_RIGHT),this.offset!==this.block.value.length||void 0}))}pushRightBeforeInput(){return this._pushRight((()=>{if(!this.block.isFixed)return this.offset=this.block.nearestInputPos(this.offset,a.NONE),!0}))}pushRightBeforeRequired(){return this._pushRight((()=>{if(!(this.block.isFixed||this.block.isOptional&&!this.block.value))return this.offset=this.block.nearestInputPos(this.offset,a.NONE),!0}))}}class x{constructor(t){Object.assign(this,t),this._value="",this.isFixed=!0}get value(){return this._value}get unmaskedValue(){return this.isUnmasking?this.value:""}get rawInputValue(){return this._isRawInput?this.value:""}get displayValue(){return this.value}reset(){this._isRawInput=!1,this._value=""}remove(t,e){return void 0===t&&(t=0),void 0===e&&(e=this._value.length),this._value=this._value.slice(0,t)+this._value.slice(e),this._value||(this._isRawInput=!1),new v}nearestInputPos(t,e){void 0===e&&(e=a.NONE);const s=this._value.length;switch(e){case a.LEFT:case a.FORCE_LEFT:return 0;default:return s}}totalInputPositions(t,e){return void 0===t&&(t=0),void 0===e&&(e=this._value.length),this._isRawInput?e-t:0}extractInput(t,e,s){return void 0===t&&(t=0),void 0===e&&(e=this._value.length),void 0===s&&(s={}),s.raw&&this._isRawInput&&this._value.slice(t,e)||""}get isComplete(){return!0}get isFilled(){return Boolean(this._value)}_appendChar(t,e){if(void 0===e&&(e={}),this.isFilled)return new v;const s=!0===this.eager||"append"===this.eager,i=this.char===t&&(this.isUnmasking||e.input||e.raw)&&(!e.raw||!s)&&!e.tail,a=new v({inserted:this.char,rawInserted:i?this.char:""});return this._value=this.char,this._isRawInput=i&&(e.raw||e.input),a}_appendEager(){return this._appendChar(this.char,{tail:!0})}_appendPlaceholder(){const t=new v;return this.isFilled||(this._value=t.inserted=this.char),t}extractTail(){return new E("")}appendTail(t){return e(t)&&(t=new E(String(t))),t.appendTo(this)}append(t,e,s){const i=this._appendChar(t[0],e);return null!=s&&(i.tailShift+=this.appendTail(s).tailShift),i}doCommit(){}get state(){return{_value:this._value,_rawInputValue:this.rawInputValue}}set state(t){this._value=t._value,this._isRawInput=Boolean(t._rawInputValue)}pad(t){return this._appendPlaceholder()}}class S{constructor(t){const{parent:e,isOptional:s,placeholderChar:i,displayChar:a,lazy:u,eager:n,...r}=t;this.masked=d(r),Object.assign(this,{parent:e,isOptional:s,placeholderChar:i,displayChar:a,lazy:u,eager:n})}reset(){this.isFilled=!1,this.masked.reset()}remove(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.value.length),0===t&&e>=1?(this.isFilled=!1,this.masked.remove(t,e)):new v}get value(){return this.masked.value||(this.isFilled&&!this.isOptional?this.placeholderChar:"")}get unmaskedValue(){return this.masked.unmaskedValue}get rawInputValue(){return this.masked.rawInputValue}get displayValue(){return this.masked.value&&this.displayChar||this.value}get isComplete(){return Boolean(this.masked.value)||this.isOptional}_appendChar(t,e){if(void 0===e&&(e={}),this.isFilled)return new v;const s=this.masked.state;let i=this.masked._appendChar(t,this.currentMaskFlags(e));return i.inserted&&!1===this.doValidate(e)&&(i=new v,this.masked.state=s),i.inserted||this.isOptional||this.lazy||e.input||(i.inserted=this.placeholderChar),i.skip=!i.inserted&&!this.isOptional,this.isFilled=Boolean(i.inserted),i}append(t,e,s){return this.masked.append(t,this.currentMaskFlags(e),s)}_appendPlaceholder(){return this.isFilled||this.isOptional?new v:(this.isFilled=!0,new v({inserted:this.placeholderChar}))}_appendEager(){return new v}extractTail(t,e){return this.masked.extractTail(t,e)}appendTail(t){return this.masked.appendTail(t)}extractInput(t,e,s){return void 0===t&&(t=0),void 0===e&&(e=this.value.length),this.masked.extractInput(t,e,s)}nearestInputPos(t,e){void 0===e&&(e=a.NONE);const s=this.value.length,i=Math.min(Math.max(t,0),s);switch(e){case a.LEFT:case a.FORCE_LEFT:return this.isComplete?i:0;case a.RIGHT:case a.FORCE_RIGHT:return this.isComplete?i:s;default:return i}}totalInputPositions(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.value.length),this.value.slice(t,e).length}doValidate(t){return this.masked.doValidate(this.currentMaskFlags(t))&&(!this.parent||this.parent.doValidate(this.currentMaskFlags(t)))}doCommit(){this.masked.doCommit()}get state(){return{_value:this.value,_rawInputValue:this.rawInputValue,masked:this.masked.state,isFilled:this.isFilled}}set state(t){this.masked.state=t.masked,this.isFilled=t.isFilled}currentMaskFlags(t){var e;return{...t,_beforeTailState:(null==t||null==(e=t._beforeTailState)?void 0:e.masked)||(null==t?void 0:t._beforeTailState)}}pad(t){return new v}}S.DEFAULT_DEFINITIONS={0:/\d/,a:/[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,"*":/./};class B extends C{updateOptions(t){super.updateOptions(t)}_update(t){const e=t.mask;e&&(t.validate=t=>t.search(e)>=0),super._update(t)}}o.MaskedRegExp=B;class b extends C{constructor(t){super({...b.DEFAULTS,...t,definitions:Object.assign({},S.DEFAULT_DEFINITIONS,null==t?void 0:t.definitions)})}updateOptions(t){super.updateOptions(t)}_update(t){t.definitions=Object.assign({},this.definitions,t.definitions),super._update(t),this._rebuildMask()}_rebuildMask(){const t=this.definitions;this._blocks=[],this.exposeBlock=void 0,this._stops=[],this._maskedBlocks={};const e=this.mask;if(!e||!t)return;let s=!1,i=!1;for(let a=0;a<e.length;++a){if(this.blocks){const t=e.slice(a),s=Object.keys(this.blocks).filter((e=>0===t.indexOf(e)));s.sort(((t,e)=>e.length-t.length));const i=s[0];if(i){const{expose:t,repeat:e,...s}=p(this.blocks[i]),u={lazy:this.lazy,eager:this.eager,placeholderChar:this.placeholderChar,displayChar:this.displayChar,overwrite:this.overwrite,autofix:this.autofix,...s,repeat:e,parent:this},n=null!=e?new o.RepeatBlock(u):d(u);n&&(this._blocks.push(n),t&&(this.exposeBlock=n),this._maskedBlocks[i]||(this._maskedBlocks[i]=[]),this._maskedBlocks[i].push(this._blocks.length-1)),a+=i.length-1;continue}}let u=e[a],n=u in t;if(u===b.STOP_CHAR){this._stops.push(this._blocks.length);continue}if("{"===u||"}"===u){s=!s;continue}if("["===u||"]"===u){i=!i;continue}if(u===b.ESCAPE_CHAR){if(++a,u=e[a],!u)break;n=!1}const r=n?new S({isOptional:i,lazy:this.lazy,eager:this.eager,placeholderChar:this.placeholderChar,displayChar:this.displayChar,...p(t[u]),parent:this}):new x({char:u,eager:this.eager,isUnmasking:s});this._blocks.push(r)}}get state(){return{...super.state,_blocks:this._blocks.map((t=>t.state))}}set state(t){if(!t)return void this.reset();const{_blocks:e,...s}=t;this._blocks.forEach(((t,s)=>t.state=e[s])),super.state=s}reset(){super.reset(),this._blocks.forEach((t=>t.reset()))}get isComplete(){return this.exposeBlock?this.exposeBlock.isComplete:this._blocks.every((t=>t.isComplete))}get isFilled(){return this._blocks.every((t=>t.isFilled))}get isFixed(){return this._blocks.every((t=>t.isFixed))}get isOptional(){return this._blocks.every((t=>t.isOptional))}doCommit(){this._blocks.forEach((t=>t.doCommit())),super.doCommit()}get unmaskedValue(){return this.exposeBlock?this.exposeBlock.unmaskedValue:this._blocks.reduce(((t,e)=>t+e.unmaskedValue),"")}set unmaskedValue(t){if(this.exposeBlock){const e=this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock))+this.exposeBlock.displayValue.length);this.exposeBlock.unmaskedValue=t,this.appendTail(e),this.doCommit()}else super.unmaskedValue=t}get value(){return this.exposeBlock?this.exposeBlock.value:this._blocks.reduce(((t,e)=>t+e.value),"")}set value(t){if(this.exposeBlock){const e=this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock))+this.exposeBlock.displayValue.length);this.exposeBlock.value=t,this.appendTail(e),this.doCommit()}else super.value=t}get typedValue(){return this.exposeBlock?this.exposeBlock.typedValue:super.typedValue}set typedValue(t){if(this.exposeBlock){const e=this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock))+this.exposeBlock.displayValue.length);this.exposeBlock.typedValue=t,this.appendTail(e),this.doCommit()}else super.typedValue=t}get displayValue(){return this._blocks.reduce(((t,e)=>t+e.displayValue),"")}appendTail(t){return super.appendTail(t).aggregate(this._appendPlaceholder())}_appendEager(){var t;const e=new v;let s=null==(t=this._mapPosToBlock(this.displayValue.length))?void 0:t.index;if(null==s)return e;this._blocks[s].isFilled&&++s;for(let t=s;t<this._blocks.length;++t){const s=this._blocks[t]._appendEager();if(!s.inserted)break;e.aggregate(s)}return e}_appendCharRaw(t,e){void 0===e&&(e={});const s=this._mapPosToBlock(this.displayValue.length),i=new v;if(!s)return i;for(let u,n=s.index;u=this._blocks[n];++n){var a;const s=u._appendChar(t,{...e,_beforeTailState:null==(a=e._beforeTailState)||null==(a=a._blocks)?void 0:a[n]});if(i.aggregate(s),s.consumed)break}return i}extractTail(t,e){void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length);const s=new A;return t===e||this._forEachBlocksInRange(t,e,((t,e,i,a)=>{const u=t.extractTail(i,a);u.stop=this._findStopBefore(e),u.from=this._blockStartPos(e),u instanceof A&&(u.blockIndex=e),s.extend(u)})),s}extractInput(t,e,s){if(void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),void 0===s&&(s={}),t===e)return"";let i="";return this._forEachBlocksInRange(t,e,((t,e,a,u)=>{i+=t.extractInput(a,u,s)})),i}_findStopBefore(t){let e;for(let s=0;s<this._stops.length;++s){const i=this._stops[s];if(!(i<=t))break;e=i}return e}_appendPlaceholder(t){const e=new v;if(this.lazy&&null==t)return e;const s=this._mapPosToBlock(this.displayValue.length);if(!s)return e;const i=s.index,a=null!=t?t:this._blocks.length;return this._blocks.slice(i,a).forEach((s=>{var i;s.lazy&&null==t||e.aggregate(s._appendPlaceholder(null==(i=s._blocks)?void 0:i.length))})),e}_mapPosToBlock(t){let e="";for(let s=0;s<this._blocks.length;++s){const i=this._blocks[s],a=e.length;if(e+=i.displayValue,t<=e.length)return{index:s,offset:t-a}}}_blockStartPos(t){return this._blocks.slice(0,t).reduce(((t,e)=>t+e.displayValue.length),0)}_forEachBlocksInRange(t,e,s){void 0===e&&(e=this.displayValue.length);const i=this._mapPosToBlock(t);if(i){const t=this._mapPosToBlock(e),a=t&&i.index===t.index,u=i.offset,n=t&&a?t.offset:this._blocks[i.index].displayValue.length;if(s(this._blocks[i.index],i.index,u,n),t&&!a){for(let e=i.index+1;e<t.index;++e)s(this._blocks[e],e,0,this._blocks[e].displayValue.length);s(this._blocks[t.index],t.index,0,t.offset)}}}remove(t,e){void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length);const s=super.remove(t,e);return this._forEachBlocksInRange(t,e,((t,e,i,a)=>{s.aggregate(t.remove(i,a))})),s}nearestInputPos(t,e){if(void 0===e&&(e=a.NONE),!this._blocks.length)return 0;const s=new F(this,t);if(e===a.NONE)return s.pushRightBeforeInput()?s.pos:(s.popState(),s.pushLeftBeforeInput()?s.pos:this.displayValue.length);if(e===a.LEFT||e===a.FORCE_LEFT){if(e===a.LEFT){if(s.pushRightBeforeFilled(),s.ok&&s.pos===t)return t;s.popState()}if(s.pushLeftBeforeInput(),s.pushLeftBeforeRequired(),s.pushLeftBeforeFilled(),e===a.LEFT){if(s.pushRightBeforeInput(),s.pushRightBeforeRequired(),s.ok&&s.pos<=t)return s.pos;if(s.popState(),s.ok&&s.pos<=t)return s.pos;s.popState()}return s.ok?s.pos:e===a.FORCE_LEFT?0:(s.popState(),s.ok?s.pos:(s.popState(),s.ok?s.pos:0))}return e===a.RIGHT||e===a.FORCE_RIGHT?(s.pushRightBeforeInput(),s.pushRightBeforeRequired(),s.pushRightBeforeFilled()?s.pos:e===a.FORCE_RIGHT?this.displayValue.length:(s.popState(),s.ok?s.pos:(s.popState(),s.ok?s.pos:this.nearestInputPos(t,a.LEFT)))):t}totalInputPositions(t,e){void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length);let s=0;return this._forEachBlocksInRange(t,e,((t,e,i,a)=>{s+=t.totalInputPositions(i,a)})),s}maskedBlock(t){return this.maskedBlocks(t)[0]}maskedBlocks(t){const e=this._maskedBlocks[t];return e?e.map((t=>this._blocks[t])):[]}pad(t){const e=new v;return this._forEachBlocksInRange(0,this.displayValue.length,(s=>e.aggregate(s.pad(t)))),e}}b.DEFAULTS={...C.DEFAULTS,lazy:!0,placeholderChar:"_"},b.STOP_CHAR="`",b.ESCAPE_CHAR="\\",b.InputDefinition=S,b.FixedDefinition=x,o.MaskedPattern=b;class D extends b{get _matchFrom(){return this.maxLength-String(this.from).length}constructor(t){super(t)}updateOptions(t){super.updateOptions(t)}_update(t){const{to:e=this.to||0,from:s=this.from||0,maxLength:i=this.maxLength||0,autofix:a=this.autofix,...u}=t;this.to=e,this.from=s,this.maxLength=Math.max(String(e).length,i),this.autofix=a;const n=String(this.from).padStart(this.maxLength,"0"),r=String(this.to).padStart(this.maxLength,"0");let h=0;for(;h<r.length&&r[h]===n[h];)++h;u.mask=r.slice(0,h).replace(/0/g,"\\0")+"0".repeat(this.maxLength-h),super._update(u)}get isComplete(){return super.isComplete&&Boolean(this.value)}boundaries(t){let e="",s="";const[,i,a]=t.match(/^(\D*)(\d*)(\D*)/)||[];return a&&(e="0".repeat(i.length)+a,s="9".repeat(i.length)+a),e=e.padEnd(this.maxLength,"0"),s=s.padEnd(this.maxLength,"9"),[e,s]}doPrepareChar(t,e){let s;return void 0===e&&(e={}),[t,s]=super.doPrepareChar(t.replace(/\D/g,""),e),t||(s.skip=!this.isComplete),[t,s]}_appendCharRaw(t,e){if(void 0===e&&(e={}),!this.autofix||this.value.length+1>this.maxLength)return super._appendCharRaw(t,e);const s=String(this.from).padStart(this.maxLength,"0"),i=String(this.to).padStart(this.maxLength,"0"),[a,u]=this.boundaries(this.value+t);return Number(u)<this.from?super._appendCharRaw(s[this.value.length],e):Number(a)>this.to?!e.tail&&"pad"===this.autofix&&this.value.length+1<this.maxLength?super._appendCharRaw(s[this.value.length],e).aggregate(this._appendCharRaw(t,e)):super._appendCharRaw(i[this.value.length],e):super._appendCharRaw(t,e)}doValidate(t){const e=this.value;if(-1===e.search(/[^0]/)&&e.length<=this._matchFrom)return!0;const[s,i]=this.boundaries(e);return this.from<=Number(i)&&Number(s)<=this.to&&super.doValidate(t)}pad(t){const e=new v;if(this.value.length===this.maxLength)return e;const s=this.value,i=this.maxLength-this.value.length;if(i){this.reset();for(let s=0;s<i;++s)e.aggregate(super._appendCharRaw("0",t));s.split("").forEach((t=>this._appendCharRaw(t)))}return e}}o.MaskedRange=D;class y extends b{static extractPatternOptions(t){const{mask:s,pattern:i,...a}=t;return{...a,mask:e(s)?s:i}}constructor(t){super(y.extractPatternOptions({...y.DEFAULTS,...t}))}updateOptions(t){super.updateOptions(t)}_update(t){const{mask:s,pattern:i,blocks:a,...u}={...y.DEFAULTS,...t},n=Object.assign({},y.GET_DEFAULT_BLOCKS());t.min&&(n.Y.from=t.min.getFullYear()),t.max&&(n.Y.to=t.max.getFullYear()),t.min&&t.max&&n.Y.from===n.Y.to&&(n.m.from=t.min.getMonth()+1,n.m.to=t.max.getMonth()+1,n.m.from===n.m.to&&(n.d.from=t.min.getDate(),n.d.to=t.max.getDate())),Object.assign(n,this.blocks,a),super._update({...u,mask:e(s)?s:i,blocks:n})}doValidate(t){const e=this.date;return super.doValidate(t)&&(!this.isComplete||this.isDateExist(this.value)&&null!=e&&(null==this.min||this.min<=e)&&(null==this.max||e<=this.max))}isDateExist(t){return this.format(this.parse(t,this),this).indexOf(t)>=0}get date(){return this.typedValue}set date(t){this.typedValue=t}get typedValue(){return this.isComplete?super.typedValue:null}set typedValue(t){super.typedValue=t}maskEquals(t){return t===Date||super.maskEquals(t)}optionsIsChanged(t){return super.optionsIsChanged(y.extractPatternOptions(t))}}y.GET_DEFAULT_BLOCKS=()=>({d:{mask:D,from:1,to:31,maxLength:2},m:{mask:D,from:1,to:12,maxLength:2},Y:{mask:D,from:1900,to:9999}}),y.DEFAULTS={...b.DEFAULTS,mask:Date,pattern:"d{.}`m{.}`Y",format:(t,e)=>{if(!t)return"";return[String(t.getDate()).padStart(2,"0"),String(t.getMonth()+1).padStart(2,"0"),t.getFullYear()].join(".")},parse:(t,e)=>{const[s,i,a]=t.split(".").map(Number);return new Date(a,i-1,s)}},o.MaskedDate=y;class M extends C{constructor(t){super({...M.DEFAULTS,...t}),this.currentMask=void 0}updateOptions(t){super.updateOptions(t)}_update(t){super._update(t),"mask"in t&&(this.exposeMask=void 0,this.compiledMasks=Array.isArray(t.mask)?t.mask.map((t=>{const{expose:e,...s}=p(t),i=d({overwrite:this._overwrite,eager:this._eager,skipInvalid:this._skipInvalid,...s});return e&&(this.exposeMask=i),i})):[])}_appendCharRaw(t,e){void 0===e&&(e={});const s=this._applyDispatch(t,e);return this.currentMask&&s.aggregate(this.currentMask._appendChar(t,this.currentMaskFlags(e))),s}_applyDispatch(t,e,s){void 0===t&&(t=""),void 0===e&&(e={}),void 0===s&&(s="");const i=e.tail&&null!=e._beforeTailState?e._beforeTailState._value:this.value,a=this.rawInputValue,u=e.tail&&null!=e._beforeTailState?e._beforeTailState._rawInputValue:a,n=a.slice(u.length),r=this.currentMask,h=new v,o=null==r?void 0:r.state;return this.currentMask=this.doDispatch(t,{...e},s),this.currentMask&&(this.currentMask!==r?(this.currentMask.reset(),u&&(this.currentMask.append(u,{raw:!0}),h.tailShift=this.currentMask.value.length-i.length),n&&(h.tailShift+=this.currentMask.append(n,{raw:!0,tail:!0}).tailShift)):o&&(this.currentMask.state=o)),h}_appendPlaceholder(){const t=this._applyDispatch();return this.currentMask&&t.aggregate(this.currentMask._appendPlaceholder()),t}_appendEager(){const t=this._applyDispatch();return this.currentMask&&t.aggregate(this.currentMask._appendEager()),t}appendTail(t){const e=new v;return t&&e.aggregate(this._applyDispatch("",{},t)),e.aggregate(this.currentMask?this.currentMask.appendTail(t):super.appendTail(t))}currentMaskFlags(t){var e,s;return{...t,_beforeTailState:(null==(e=t._beforeTailState)?void 0:e.currentMaskRef)===this.currentMask&&(null==(s=t._beforeTailState)?void 0:s.currentMask)||t._beforeTailState}}doDispatch(t,e,s){return void 0===e&&(e={}),void 0===s&&(s=""),this.dispatch(t,this,e,s)}doValidate(t){return super.doValidate(t)&&(!this.currentMask||this.currentMask.doValidate(this.currentMaskFlags(t)))}doPrepare(t,e){void 0===e&&(e={});let[s,i]=super.doPrepare(t,e);if(this.currentMask){let t;[s,t]=super.doPrepare(s,this.currentMaskFlags(e)),i=i.aggregate(t)}return[s,i]}doPrepareChar(t,e){void 0===e&&(e={});let[s,i]=super.doPrepareChar(t,e);if(this.currentMask){let t;[s,t]=super.doPrepareChar(s,this.currentMaskFlags(e)),i=i.aggregate(t)}return[s,i]}reset(){var t;null==(t=this.currentMask)||t.reset(),this.compiledMasks.forEach((t=>t.reset()))}get value(){return this.exposeMask?this.exposeMask.value:this.currentMask?this.currentMask.value:""}set value(t){this.exposeMask?(this.exposeMask.value=t,this.currentMask=this.exposeMask,this._applyDispatch()):super.value=t}get unmaskedValue(){return this.exposeMask?this.exposeMask.unmaskedValue:this.currentMask?this.currentMask.unmaskedValue:""}set unmaskedValue(t){this.exposeMask?(this.exposeMask.unmaskedValue=t,this.currentMask=this.exposeMask,this._applyDispatch()):super.unmaskedValue=t}get typedValue(){return this.exposeMask?this.exposeMask.typedValue:this.currentMask?this.currentMask.typedValue:""}set typedValue(t){if(this.exposeMask)return this.exposeMask.typedValue=t,this.currentMask=this.exposeMask,void this._applyDispatch();let e=String(t);this.currentMask&&(this.currentMask.typedValue=t,e=this.currentMask.unmaskedValue),this.unmaskedValue=e}get displayValue(){return this.currentMask?this.currentMask.displayValue:""}get isComplete(){var t;return Boolean(null==(t=this.currentMask)?void 0:t.isComplete)}get isFilled(){var t;return Boolean(null==(t=this.currentMask)?void 0:t.isFilled)}remove(t,e){const s=new v;return this.currentMask&&s.aggregate(this.currentMask.remove(t,e)).aggregate(this._applyDispatch()),s}get state(){var t;return{...super.state,_rawInputValue:this.rawInputValue,compiledMasks:this.compiledMasks.map((t=>t.state)),currentMaskRef:this.currentMask,currentMask:null==(t=this.currentMask)?void 0:t.state}}set state(t){const{compiledMasks:e,currentMaskRef:s,currentMask:i,...a}=t;e&&this.compiledMasks.forEach(((t,s)=>t.state=e[s])),null!=s&&(this.currentMask=s,this.currentMask.state=i),super.state=a}extractInput(t,e,s){return this.currentMask?this.currentMask.extractInput(t,e,s):""}extractTail(t,e){return this.currentMask?this.currentMask.extractTail(t,e):super.extractTail(t,e)}doCommit(){this.currentMask&&this.currentMask.doCommit(),super.doCommit()}nearestInputPos(t,e){return this.currentMask?this.currentMask.nearestInputPos(t,e):super.nearestInputPos(t,e)}get overwrite(){return this.currentMask?this.currentMask.overwrite:this._overwrite}set overwrite(t){this._overwrite=t}get eager(){return this.currentMask?this.currentMask.eager:this._eager}set eager(t){this._eager=t}get skipInvalid(){return this.currentMask?this.currentMask.skipInvalid:this._skipInvalid}set skipInvalid(t){this._skipInvalid=t}get autofix(){return this.currentMask?this.currentMask.autofix:this._autofix}set autofix(t){this._autofix=t}maskEquals(t){return Array.isArray(t)?this.compiledMasks.every(((e,s)=>{if(!t[s])return;const{mask:i,...a}=t[s];return r(e,a)&&e.maskEquals(i)})):super.maskEquals(t)}typedValueEquals(t){var e;return Boolean(null==(e=this.currentMask)?void 0:e.typedValueEquals(t))}}M.DEFAULTS={...C.DEFAULTS,dispatch:(t,e,s,i)=>{if(!e.compiledMasks.length)return;const u=e.rawInputValue,n=e.compiledMasks.map(((n,r)=>{const h=e.currentMask===n,o=h?n.displayValue.length:n.nearestInputPos(n.displayValue.length,a.FORCE_LEFT);return n.rawInputValue!==u?(n.reset(),n.append(u,{raw:!0})):h||n.remove(o),n.append(t,e.currentMaskFlags(s)),n.appendTail(i),{index:r,weight:n.rawInputValue.length,totalInputPositions:n.totalInputPositions(0,Math.max(o,n.nearestInputPos(n.displayValue.length,a.FORCE_LEFT)))}}));return n.sort(((t,e)=>e.weight-t.weight||e.totalInputPositions-t.totalInputPositions)),e.compiledMasks[n[0].index]}},o.MaskedDynamic=M;class I extends b{constructor(t){super({...I.DEFAULTS,...t})}updateOptions(t){super.updateOptions(t)}_update(t){const{enum:e,...s}=t;if(e){const t=e.map((t=>t.length)),i=Math.min(...t),a=Math.max(...t)-i;s.mask="*".repeat(i),a&&(s.mask+="["+"*".repeat(a)+"]"),this.enum=e}super._update(s)}_appendCharRaw(t,e){void 0===e&&(e={});const s=Math.min(this.nearestInputPos(0,a.FORCE_RIGHT),this.value.length),i=this.enum.filter((e=>this.matchValue(e,this.unmaskedValue+t,s)));if(i.length){1===i.length&&this._forEachBlocksInRange(0,this.value.length,((t,s)=>{const a=i[0][s];s>=this.value.length||a===t.value||(t.reset(),t._appendChar(a,e))}));const t=super._appendCharRaw(i[0][this.value.length],e);return 1===i.length&&i[0].slice(this.unmaskedValue.length).split("").forEach((e=>t.aggregate(super._appendCharRaw(e)))),t}return new v({skip:!this.isComplete})}extractTail(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),new E("",t)}remove(t,e){if(void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),t===e)return new v;const s=Math.min(super.nearestInputPos(0,a.FORCE_RIGHT),this.value.length);let i;for(i=t;i>=0;--i){if(this.enum.filter((t=>this.matchValue(t,this.value.slice(s,i),s))).length>1)break}const u=super.remove(i,e);return u.tailShift+=i-t,u}get isComplete(){return this.enum.indexOf(this.value)>=0}}I.DEFAULTS={...b.DEFAULTS,matchValue:(t,e,s)=>t.indexOf(e,s)===s},o.MaskedEnum=I;class V extends C{updateOptions(t){super.updateOptions(t)}_update(t){super._update({...t,validate:t.mask})}}var T;o.MaskedFunction=V;class w extends C{constructor(t){super({...w.DEFAULTS,...t})}updateOptions(t){super.updateOptions(t)}_update(t){super._update(t),this._updateRegExps()}_updateRegExps(){const t="^"+(this.allowNegative?"[+|\\-]?":""),e=(this.scale?"("+n(this.radix)+"\\d{0,"+this.scale+"})?":"")+"$";this._numberRegExp=new RegExp(t+"\\d*"+e),this._mapToRadixRegExp=new RegExp("["+this.mapToRadix.map(n).join("")+"]","g"),this._thousandsSeparatorRegExp=new RegExp(n(this.thousandsSeparator),"g")}_removeThousandsSeparators(t){return t.replace(this._thousandsSeparatorRegExp,"")}_insertThousandsSeparators(t){const e=t.split(this.radix);return e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,this.thousandsSeparator),e.join(this.radix)}doPrepareChar(t,e){void 0===e&&(e={});const[s,i]=super.doPrepareChar(this._removeThousandsSeparators(this.scale&&this.mapToRadix.length&&(e.input&&e.raw||!e.input&&!e.raw)?t.replace(this._mapToRadixRegExp,this.radix):t),e);return t&&!s&&(i.skip=!0),!s||this.allowPositive||this.value||"-"===s||i.aggregate(this._appendChar("-")),[s,i]}_separatorsCount(t,e){void 0===e&&(e=!1);let s=0;for(let i=0;i<t;++i)this._value.indexOf(this.thousandsSeparator,i)===i&&(++s,e&&(t+=this.thousandsSeparator.length));return s}_separatorsCountFromSlice(t){return void 0===t&&(t=this._value),this._separatorsCount(this._removeThousandsSeparators(t).length,!0)}extractInput(t,e,s){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),[t,e]=this._adjustRangeWithSeparators(t,e),this._removeThousandsSeparators(super.extractInput(t,e,s))}_appendCharRaw(t,e){void 0===e&&(e={});const s=e.tail&&e._beforeTailState?e._beforeTailState._value:this._value,i=this._separatorsCountFromSlice(s);this._value=this._removeThousandsSeparators(this.value);const a=this._value;this._value+=t;const u=this.number;let n,r=!isNaN(u),h=!1;if(r){let t;null!=this.min&&this.min<0&&this.number<this.min&&(t=this.min),null!=this.max&&this.max>0&&this.number>this.max&&(t=this.max),null!=t&&(this.autofix?(this._value=this.format(t,this).replace(w.UNMASKED_RADIX,this.radix),h||(h=a===this._value&&!e.tail)):r=!1),r&&(r=Boolean(this._value.match(this._numberRegExp)))}r?n=new v({inserted:this._value.slice(a.length),rawInserted:h?"":t,skip:h}):(this._value=a,n=new v),this._value=this._insertThousandsSeparators(this._value);const o=e.tail&&e._beforeTailState?e._beforeTailState._value:this._value,l=this._separatorsCountFromSlice(o);return n.tailShift+=(l-i)*this.thousandsSeparator.length,n}_findSeparatorAround(t){if(this.thousandsSeparator){const e=t-this.thousandsSeparator.length+1,s=this.value.indexOf(this.thousandsSeparator,e);if(s<=t)return s}return-1}_adjustRangeWithSeparators(t,e){const s=this._findSeparatorAround(t);s>=0&&(t=s);const i=this._findSeparatorAround(e);return i>=0&&(e=i+this.thousandsSeparator.length),[t,e]}remove(t,e){void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),[t,e]=this._adjustRangeWithSeparators(t,e);const s=this.value.slice(0,t),i=this.value.slice(e),a=this._separatorsCount(s.length);this._value=this._insertThousandsSeparators(this._removeThousandsSeparators(s+i));const u=this._separatorsCountFromSlice(s);return new v({tailShift:(u-a)*this.thousandsSeparator.length})}nearestInputPos(t,e){if(!this.thousandsSeparator)return t;switch(e){case a.NONE:case a.LEFT:case a.FORCE_LEFT:{const s=this._findSeparatorAround(t-1);if(s>=0){const i=s+this.thousandsSeparator.length;if(t<i||this.value.length<=i||e===a.FORCE_LEFT)return s}break}case a.RIGHT:case a.FORCE_RIGHT:{const e=this._findSeparatorAround(t);if(e>=0)return e+this.thousandsSeparator.length}}return t}doCommit(){if(this.value){const t=this.number;let e=t;null!=this.min&&(e=Math.max(e,this.min)),null!=this.max&&(e=Math.min(e,this.max)),e!==t&&(this.unmaskedValue=this.format(e,this));let s=this.value;this.normalizeZeros&&(s=this._normalizeZeros(s)),this.padFractionalZeros&&this.scale>0&&(s=this._padFractionalZeros(s)),this._value=s}super.doCommit()}_normalizeZeros(t){const e=this._removeThousandsSeparators(t).split(this.radix);return e[0]=e[0].replace(/^(\D*)(0*)(\d*)/,((t,e,s,i)=>e+i)),t.length&&!/\d$/.test(e[0])&&(e[0]=e[0]+"0"),e.length>1&&(e[1]=e[1].replace(/0*$/,""),e[1].length||(e.length=1)),this._insertThousandsSeparators(e.join(this.radix))}_padFractionalZeros(t){if(!t)return t;const e=t.split(this.radix);return e.length<2&&e.push(""),e[1]=e[1].padEnd(this.scale,"0"),e.join(this.radix)}doSkipInvalid(t,e,s){void 0===e&&(e={});const i=0===this.scale&&t!==this.thousandsSeparator&&(t===this.radix||t===w.UNMASKED_RADIX||this.mapToRadix.includes(t));return super.doSkipInvalid(t,e,s)&&!i}get unmaskedValue(){return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix,w.UNMASKED_RADIX)}set unmaskedValue(t){super.unmaskedValue=t}get typedValue(){return this.parse(this.unmaskedValue,this)}set typedValue(t){this.rawInputValue=this.format(t,this).replace(w.UNMASKED_RADIX,this.radix)}get number(){return this.typedValue}set number(t){this.typedValue=t}get allowNegative(){return null!=this.min&&this.min<0||null!=this.max&&this.max<0}get allowPositive(){return null!=this.min&&this.min>0||null!=this.max&&this.max>0}typedValueEquals(t){return(super.typedValueEquals(t)||w.EMPTY_VALUES.includes(t)&&w.EMPTY_VALUES.includes(this.typedValue))&&!(0===t&&""===this.value)}}T=w,w.UNMASKED_RADIX=".",w.EMPTY_VALUES=[...C.EMPTY_VALUES,0],w.DEFAULTS={...C.DEFAULTS,mask:Number,radix:",",thousandsSeparator:"",mapToRadix:[T.UNMASKED_RADIX],min:Number.MIN_SAFE_INTEGER,max:Number.MAX_SAFE_INTEGER,scale:2,normalizeZeros:!0,padFractionalZeros:!1,parse:Number,format:t=>t.toLocaleString("en-US",{useGrouping:!1,maximumFractionDigits:20})},o.MaskedNumber=w;const R={MASKED:"value",UNMASKED:"unmaskedValue",TYPED:"typedValue"};function P(t,e,s){void 0===e&&(e=R.MASKED),void 0===s&&(s=R.MASKED);const i=d(t);return t=>i.runIsolated((i=>(i[e]=t,i[s])))}function O(t,e,s,i){return P(e,s,i)(t)}o.PIPE_TYPE=R,o.createPipe=P,o.pipe=O;class L extends b{get repeatFrom(){var t;return null!=(t=Array.isArray(this.repeat)?this.repeat[0]:this.repeat===1/0?0:this.repeat)?t:0}get repeatTo(){var t;return null!=(t=Array.isArray(this.repeat)?this.repeat[1]:this.repeat)?t:1/0}constructor(t){super(t)}updateOptions(t){super.updateOptions(t)}_update(t){var e,s,i;const{repeat:a,...u}=p(t);this._blockOpts=Object.assign({},this._blockOpts,u);const n=d(this._blockOpts);this.repeat=null!=(e=null!=(s=null!=a?a:n.repeat)?s:this.repeat)?e:1/0,super._update({mask:"m".repeat(Math.max(this.repeatTo===1/0&&(null==(i=this._blocks)?void 0:i.length)||0,this.repeatFrom)),blocks:{m:n},eager:n.eager,overwrite:n.overwrite,skipInvalid:n.skipInvalid,lazy:n.lazy,placeholderChar:n.placeholderChar,displayChar:n.displayChar})}_allocateBlock(t){return t<this._blocks.length?this._blocks[t]:this.repeatTo===1/0||this._blocks.length<this.repeatTo?(this._blocks.push(d(this._blockOpts)),this.mask+="m",this._blocks[this._blocks.length-1]):void 0}_appendCharRaw(t,e){void 0===e&&(e={});const s=new v;for(let r,h,o=null!=(i=null==(a=this._mapPosToBlock(this.displayValue.length))?void 0:a.index)?i:Math.max(this._blocks.length-1,0);r=null!=(u=this._blocks[o])?u:h=!h&&this._allocateBlock(o);++o){var i,a,u,n;const l=r._appendChar(t,{...e,_beforeTailState:null==(n=e._beforeTailState)||null==(n=n._blocks)?void 0:n[o]});if(l.skip&&h){this._blocks.pop(),this.mask=this.mask.slice(1);break}if(s.aggregate(l),l.consumed)break}return s}_trimEmptyTail(t,e){var s,i;void 0===t&&(t=0);const a=Math.max((null==(s=this._mapPosToBlock(t))?void 0:s.index)||0,this.repeatFrom,0);let u;null!=e&&(u=null==(i=this._mapPosToBlock(e))?void 0:i.index),null==u&&(u=this._blocks.length-1);let n=0;for(let t=u;a<=t&&!this._blocks[t].unmaskedValue;--t,++n);n&&(this._blocks.splice(u-n+1,n),this.mask=this.mask.slice(n))}reset(){super.reset(),this._trimEmptyTail()}remove(t,e){void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length);const s=super.remove(t,e);return this._trimEmptyTail(t,e),s}totalInputPositions(t,e){return void 0===t&&(t=0),null==e&&this.repeatTo===1/0?1/0:super.totalInputPositions(t,e)}get state(){return super.state}set state(t){this._blocks.length=t._blocks.length,this.mask=this.mask.slice(0,this._blocks.length),super.state=t}}o.RepeatBlock=L;try{globalThis.IMask=o}catch{}t.ChangeDetails=v,t.ChunksTailDetails=A,t.DIRECTION=a,t.HTMLContenteditableMaskElement=m,t.HTMLInputMaskElement=k,t.HTMLMaskElement=g,t.InputMask=f,t.MaskElement=c,t.Masked=C,t.MaskedDate=y,t.MaskedDynamic=M,t.MaskedEnum=I,t.MaskedFunction=V,t.MaskedNumber=w,t.MaskedPattern=b,t.MaskedRange=D,t.MaskedRegExp=B,t.PIPE_TYPE=R,t.PatternFixedDefinition=x,t.PatternInputDefinition=S,t.RepeatBlock=L,t.createMask=d,t.createPipe=P,t.default=o,t.forceDirection=u,t.normalizeOpts=p,t.pipe=O,Object.defineProperty(t,"__esModule",{value:!0})}));
// Custom select
$(function(){
    var x, i, j, l, ll, selElmnt, a, b, c, s, pholder;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;

      pholder = selElmnt.getAttribute('xplaceholder') || false;

      if(selElmnt.selectedIndex == 0) {
        selElmnt.options[0].setAttribute("selected", "selected");
      }

      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      s = document.createElement("SPAN");
      a.setAttribute("class", "select-selected");     
      if(pholder && selElmnt.value==0) {
        s.setAttribute("class", "select-placeholder");
        s.innerHTML = pholder;
      } else {
        s.setAttribute("class", "select-label");
        s.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      }
      a.appendChild(s);
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 0; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;

        if(selElmnt.options[j].hasAttribute("selected")){
            c.setAttribute("class", "same-as-selected");
        }

        c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = '<span class="select-label">' + this.innerHTML + "</span>";
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
            $(selElmnt).trigger("change");
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
    
    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      var x, y, i, xl, yl, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }
    
    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
});
/**
 * @popperjs/core v2.11.8 - MIT License
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Popper={})}(this,(function(e){"use strict";function t(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function n(e){return e instanceof t(e).Element||e instanceof Element}function r(e){return e instanceof t(e).HTMLElement||e instanceof HTMLElement}function o(e){return"undefined"!=typeof ShadowRoot&&(e instanceof t(e).ShadowRoot||e instanceof ShadowRoot)}var i=Math.max,a=Math.min,s=Math.round;function f(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function c(){return!/^((?!chrome|android).)*safari/i.test(f())}function p(e,o,i){void 0===o&&(o=!1),void 0===i&&(i=!1);var a=e.getBoundingClientRect(),f=1,p=1;o&&r(e)&&(f=e.offsetWidth>0&&s(a.width)/e.offsetWidth||1,p=e.offsetHeight>0&&s(a.height)/e.offsetHeight||1);var u=(n(e)?t(e):window).visualViewport,l=!c()&&i,d=(a.left+(l&&u?u.offsetLeft:0))/f,h=(a.top+(l&&u?u.offsetTop:0))/p,m=a.width/f,v=a.height/p;return{width:m,height:v,top:h,right:d+m,bottom:h+v,left:d,x:d,y:h}}function u(e){var n=t(e);return{scrollLeft:n.pageXOffset,scrollTop:n.pageYOffset}}function l(e){return e?(e.nodeName||"").toLowerCase():null}function d(e){return((n(e)?e.ownerDocument:e.document)||window.document).documentElement}function h(e){return p(d(e)).left+u(e).scrollLeft}function m(e){return t(e).getComputedStyle(e)}function v(e){var t=m(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function y(e,n,o){void 0===o&&(o=!1);var i,a,f=r(n),c=r(n)&&function(e){var t=e.getBoundingClientRect(),n=s(t.width)/e.offsetWidth||1,r=s(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(n),m=d(n),y=p(e,c,o),g={scrollLeft:0,scrollTop:0},b={x:0,y:0};return(f||!f&&!o)&&(("body"!==l(n)||v(m))&&(g=(i=n)!==t(i)&&r(i)?{scrollLeft:(a=i).scrollLeft,scrollTop:a.scrollTop}:u(i)),r(n)?((b=p(n,!0)).x+=n.clientLeft,b.y+=n.clientTop):m&&(b.x=h(m))),{x:y.left+g.scrollLeft-b.x,y:y.top+g.scrollTop-b.y,width:y.width,height:y.height}}function g(e){var t=p(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function b(e){return"html"===l(e)?e:e.assignedSlot||e.parentNode||(o(e)?e.host:null)||d(e)}function x(e){return["html","body","#document"].indexOf(l(e))>=0?e.ownerDocument.body:r(e)&&v(e)?e:x(b(e))}function w(e,n){var r;void 0===n&&(n=[]);var o=x(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),a=t(o),s=i?[a].concat(a.visualViewport||[],v(o)?o:[]):o,f=n.concat(s);return i?f:f.concat(w(b(s)))}function O(e){return["table","td","th"].indexOf(l(e))>=0}function j(e){return r(e)&&"fixed"!==m(e).position?e.offsetParent:null}function E(e){for(var n=t(e),i=j(e);i&&O(i)&&"static"===m(i).position;)i=j(i);return i&&("html"===l(i)||"body"===l(i)&&"static"===m(i).position)?n:i||function(e){var t=/firefox/i.test(f());if(/Trident/i.test(f())&&r(e)&&"fixed"===m(e).position)return null;var n=b(e);for(o(n)&&(n=n.host);r(n)&&["html","body"].indexOf(l(n))<0;){var i=m(n);if("none"!==i.transform||"none"!==i.perspective||"paint"===i.contain||-1!==["transform","perspective"].indexOf(i.willChange)||t&&"filter"===i.willChange||t&&i.filter&&"none"!==i.filter)return n;n=n.parentNode}return null}(e)||n}var D="top",A="bottom",L="right",P="left",M="auto",k=[D,A,L,P],W="start",B="end",H="viewport",T="popper",R=k.reduce((function(e,t){return e.concat([t+"-"+W,t+"-"+B])}),[]),S=[].concat(k,[M]).reduce((function(e,t){return e.concat([t,t+"-"+W,t+"-"+B])}),[]),V=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function q(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function C(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&o(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function N(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function I(e,r,o){return r===H?N(function(e,n){var r=t(e),o=d(e),i=r.visualViewport,a=o.clientWidth,s=o.clientHeight,f=0,p=0;if(i){a=i.width,s=i.height;var u=c();(u||!u&&"fixed"===n)&&(f=i.offsetLeft,p=i.offsetTop)}return{width:a,height:s,x:f+h(e),y:p}}(e,o)):n(r)?function(e,t){var n=p(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(r,o):N(function(e){var t,n=d(e),r=u(e),o=null==(t=e.ownerDocument)?void 0:t.body,a=i(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=i(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),f=-r.scrollLeft+h(e),c=-r.scrollTop;return"rtl"===m(o||n).direction&&(f+=i(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:f,y:c}}(d(e)))}function _(e,t,o,s){var f="clippingParents"===t?function(e){var t=w(b(e)),o=["absolute","fixed"].indexOf(m(e).position)>=0&&r(e)?E(e):e;return n(o)?t.filter((function(e){return n(e)&&C(e,o)&&"body"!==l(e)})):[]}(e):[].concat(t),c=[].concat(f,[o]),p=c[0],u=c.reduce((function(t,n){var r=I(e,n,s);return t.top=i(r.top,t.top),t.right=a(r.right,t.right),t.bottom=a(r.bottom,t.bottom),t.left=i(r.left,t.left),t}),I(e,p,s));return u.width=u.right-u.left,u.height=u.bottom-u.top,u.x=u.left,u.y=u.top,u}function F(e){return e.split("-")[0]}function U(e){return e.split("-")[1]}function z(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function X(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?F(o):null,a=o?U(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case D:t={x:s,y:n.y-r.height};break;case A:t={x:s,y:n.y+n.height};break;case L:t={x:n.x+n.width,y:f};break;case P:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?z(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case W:t[c]=t[c]-(n[p]/2-r[p]/2);break;case B:t[c]=t[c]+(n[p]/2-r[p]/2)}}return t}function Y(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function G(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function J(e,t){void 0===t&&(t={});var r=t,o=r.placement,i=void 0===o?e.placement:o,a=r.strategy,s=void 0===a?e.strategy:a,f=r.boundary,c=void 0===f?"clippingParents":f,u=r.rootBoundary,l=void 0===u?H:u,h=r.elementContext,m=void 0===h?T:h,v=r.altBoundary,y=void 0!==v&&v,g=r.padding,b=void 0===g?0:g,x=Y("number"!=typeof b?b:G(b,k)),w=m===T?"reference":T,O=e.rects.popper,j=e.elements[y?w:m],E=_(n(j)?j:j.contextElement||d(e.elements.popper),c,l,s),P=p(e.elements.reference),M=X({reference:P,element:O,strategy:"absolute",placement:i}),W=N(Object.assign({},O,M)),B=m===T?W:P,R={top:E.top-B.top+x.top,bottom:B.bottom-E.bottom+x.bottom,left:E.left-B.left+x.left,right:B.right-E.right+x.right},S=e.modifiersData.offset;if(m===T&&S){var V=S[i];Object.keys(R).forEach((function(e){var t=[L,A].indexOf(e)>=0?1:-1,n=[D,A].indexOf(e)>=0?"y":"x";R[e]+=V[n]*t}))}return R}var K={placement:"bottom",modifiers:[],strategy:"absolute"};function Q(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Z(e){void 0===e&&(e={});var t=e,r=t.defaultModifiers,o=void 0===r?[]:r,i=t.defaultOptions,a=void 0===i?K:i;return function(e,t,r){void 0===r&&(r=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},K,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],p=!1,u={state:f,setOptions:function(r){var i="function"==typeof r?r(f.options):r;l(),f.options=Object.assign({},a,f.options,i),f.scrollParents={reference:n(e)?w(e):e.contextElement?w(e.contextElement):[],popper:w(t)};var s,p,d=function(e){var t=q(e);return V.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(o,f.options.modifiers),p=s.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(p).map((function(e){return p[e]}))));return f.orderedModifiers=d.filter((function(e){return e.enabled})),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:u,options:r}),a=function(){};c.push(i||a)}})),u.update()},forceUpdate:function(){if(!p){var e=f.elements,t=e.reference,n=e.popper;if(Q(t,n)){f.rects={reference:y(t,E(n),"fixed"===f.options.strategy),popper:g(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<f.orderedModifiers.length;r++)if(!0!==f.reset){var o=f.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,c=o.name;"function"==typeof i&&(f=i({state:f,options:s,name:c,instance:u})||f)}else f.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(e){u.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(i())}))}))),s}),destroy:function(){l(),p=!0}};if(!Q(e,t))return u;function l(){c.forEach((function(e){return e()})),c=[]}return u.setOptions(r).then((function(e){!p&&r.onFirstUpdate&&r.onFirstUpdate(e)})),u}}var $={passive:!0};var ee={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var n=e.state,r=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,f=void 0===s||s,c=t(n.elements.popper),p=[].concat(n.scrollParents.reference,n.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",r.update,$)})),f&&c.addEventListener("resize",r.update,$),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",r.update,$)})),f&&c.removeEventListener("resize",r.update,$)}},data:{}};var te={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=X({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},ne={top:"auto",right:"auto",bottom:"auto",left:"auto"};function re(e){var n,r=e.popper,o=e.popperRect,i=e.placement,a=e.variation,f=e.offsets,c=e.position,p=e.gpuAcceleration,u=e.adaptive,l=e.roundOffsets,h=e.isFixed,v=f.x,y=void 0===v?0:v,g=f.y,b=void 0===g?0:g,x="function"==typeof l?l({x:y,y:b}):{x:y,y:b};y=x.x,b=x.y;var w=f.hasOwnProperty("x"),O=f.hasOwnProperty("y"),j=P,M=D,k=window;if(u){var W=E(r),H="clientHeight",T="clientWidth";if(W===t(r)&&"static"!==m(W=d(r)).position&&"absolute"===c&&(H="scrollHeight",T="scrollWidth"),W=W,i===D||(i===P||i===L)&&a===B)M=A,b-=(h&&W===k&&k.visualViewport?k.visualViewport.height:W[H])-o.height,b*=p?1:-1;if(i===P||(i===D||i===A)&&a===B)j=L,y-=(h&&W===k&&k.visualViewport?k.visualViewport.width:W[T])-o.width,y*=p?1:-1}var R,S=Object.assign({position:c},u&&ne),V=!0===l?function(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:s(n*o)/o||0,y:s(r*o)/o||0}}({x:y,y:b},t(r)):{x:y,y:b};return y=V.x,b=V.y,p?Object.assign({},S,((R={})[M]=O?"0":"",R[j]=w?"0":"",R.transform=(k.devicePixelRatio||1)<=1?"translate("+y+"px, "+b+"px)":"translate3d("+y+"px, "+b+"px, 0)",R)):Object.assign({},S,((n={})[M]=O?b+"px":"",n[j]=w?y+"px":"",n.transform="",n))}var oe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:F(t.placement),variation:U(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,re(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,re(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}};var ie={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},i=t.elements[e];r(i)&&l(i)&&(Object.assign(i.style,n),Object.keys(o).forEach((function(e){var t=o[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],i=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});r(o)&&l(o)&&(Object.assign(o.style,a),Object.keys(i).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]};var ae={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=S.reduce((function(e,n){return e[n]=function(e,t,n){var r=F(e),o=[P,D].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[P,L].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},se={left:"right",right:"left",bottom:"top",top:"bottom"};function fe(e){return e.replace(/left|right|bottom|top/g,(function(e){return se[e]}))}var ce={start:"end",end:"start"};function pe(e){return e.replace(/start|end/g,(function(e){return ce[e]}))}function ue(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?S:f,p=U(r),u=p?s?R:R.filter((function(e){return U(e)===p})):k,l=u.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=u);var d=l.reduce((function(t,n){return t[n]=J(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[F(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}var le={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.flipVariations,h=void 0===d||d,m=n.allowedAutoPlacements,v=t.options.placement,y=F(v),g=f||(y===v||!h?[fe(v)]:function(e){if(F(e)===M)return[];var t=fe(e);return[pe(e),t,pe(t)]}(v)),b=[v].concat(g).reduce((function(e,n){return e.concat(F(n)===M?ue(t,{placement:n,boundary:p,rootBoundary:u,padding:c,flipVariations:h,allowedAutoPlacements:m}):n)}),[]),x=t.rects.reference,w=t.rects.popper,O=new Map,j=!0,E=b[0],k=0;k<b.length;k++){var B=b[k],H=F(B),T=U(B)===W,R=[D,A].indexOf(H)>=0,S=R?"width":"height",V=J(t,{placement:B,boundary:p,rootBoundary:u,altBoundary:l,padding:c}),q=R?T?L:P:T?A:D;x[S]>w[S]&&(q=fe(q));var C=fe(q),N=[];if(i&&N.push(V[H]<=0),s&&N.push(V[q]<=0,V[C]<=0),N.every((function(e){return e}))){E=B,j=!1;break}O.set(B,N)}if(j)for(var I=function(e){var t=b.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return E=t,"break"},_=h?3:1;_>0;_--){if("break"===I(_))break}t.placement!==E&&(t.modifiersData[r]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function de(e,t,n){return i(e,a(t,n))}var he={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=void 0===o||o,f=n.altAxis,c=void 0!==f&&f,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.padding,h=n.tether,m=void 0===h||h,v=n.tetherOffset,y=void 0===v?0:v,b=J(t,{boundary:p,rootBoundary:u,padding:d,altBoundary:l}),x=F(t.placement),w=U(t.placement),O=!w,j=z(x),M="x"===j?"y":"x",k=t.modifiersData.popperOffsets,B=t.rects.reference,H=t.rects.popper,T="function"==typeof y?y(Object.assign({},t.rects,{placement:t.placement})):y,R="number"==typeof T?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,V={x:0,y:0};if(k){if(s){var q,C="y"===j?D:P,N="y"===j?A:L,I="y"===j?"height":"width",_=k[j],X=_+b[C],Y=_-b[N],G=m?-H[I]/2:0,K=w===W?B[I]:H[I],Q=w===W?-H[I]:-B[I],Z=t.elements.arrow,$=m&&Z?g(Z):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[C],ne=ee[N],re=de(0,B[I],$[I]),oe=O?B[I]/2-G-re-te-R.mainAxis:K-re-te-R.mainAxis,ie=O?-B[I]/2+G+re+ne+R.mainAxis:Q+re+ne+R.mainAxis,ae=t.elements.arrow&&E(t.elements.arrow),se=ae?"y"===j?ae.clientTop||0:ae.clientLeft||0:0,fe=null!=(q=null==S?void 0:S[j])?q:0,ce=_+ie-fe,pe=de(m?a(X,_+oe-fe-se):X,_,m?i(Y,ce):Y);k[j]=pe,V[j]=pe-_}if(c){var ue,le="x"===j?D:P,he="x"===j?A:L,me=k[M],ve="y"===M?"height":"width",ye=me+b[le],ge=me-b[he],be=-1!==[D,P].indexOf(x),xe=null!=(ue=null==S?void 0:S[M])?ue:0,we=be?ye:me-B[ve]-H[ve]-xe+R.altAxis,Oe=be?me+B[ve]+H[ve]-xe-R.altAxis:ge,je=m&&be?function(e,t,n){var r=de(e,t,n);return r>n?n:r}(we,me,Oe):de(m?we:ye,me,m?Oe:ge);k[M]=je,V[M]=je-me}t.modifiersData[r]=V}},requiresIfExists:["offset"]};var me={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=F(n.placement),f=z(s),c=[P,L].indexOf(s)>=0?"height":"width";if(i&&a){var p=function(e,t){return Y("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:G(e,k))}(o.padding,n),u=g(i),l="y"===f?D:P,d="y"===f?A:L,h=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],m=a[f]-n.rects.reference[f],v=E(i),y=v?"y"===f?v.clientHeight||0:v.clientWidth||0:0,b=h/2-m/2,x=p[l],w=y-u[c]-p[d],O=y/2-u[c]/2+b,j=de(x,O,w),M=f;n.modifiersData[r]=((t={})[M]=j,t.centerOffset=j-O,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&C(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ve(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ye(e){return[D,L,A,P].some((function(t){return e[t]>=0}))}var ge={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=J(t,{elementContext:"reference"}),s=J(t,{altBoundary:!0}),f=ve(a,r),c=ve(s,o,i),p=ye(f),u=ye(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":u})}},be=Z({defaultModifiers:[ee,te,oe,ie]}),xe=[ee,te,oe,ie,ae,le,he,me,ge],we=Z({defaultModifiers:xe});e.applyStyles=ie,e.arrow=me,e.computeStyles=oe,e.createPopper=we,e.createPopperLite=be,e.defaultModifiers=xe,e.detectOverflow=J,e.eventListeners=ee,e.flip=le,e.hide=ge,e.offset=ae,e.popperGenerator=Z,e.popperOffsets=te,e.preventOverflow=he,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=popper.min.js.map
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("@popperjs/core")):"function"==typeof define&&define.amd?define(["@popperjs/core"],e):(t=t||self).tippy=e(t.Popper)}(this,(function(t){"use strict";var e="undefined"!=typeof window&&"undefined"!=typeof document,n=!!e&&!!window.msCrypto,r={passive:!0,capture:!0},o=function(){return document.body};function i(t,e,n){if(Array.isArray(t)){var r=t[e];return null==r?Array.isArray(n)?n[e]:n:r}return t}function a(t,e){var n={}.toString.call(t);return 0===n.indexOf("[object")&&n.indexOf(e+"]")>-1}function s(t,e){return"function"==typeof t?t.apply(void 0,e):t}function u(t,e){return 0===e?t:function(r){clearTimeout(n),n=setTimeout((function(){t(r)}),e)};var n}function p(t,e){var n=Object.assign({},t);return e.forEach((function(t){delete n[t]})),n}function c(t){return[].concat(t)}function f(t,e){-1===t.indexOf(e)&&t.push(e)}function l(t){return t.split("-")[0]}function d(t){return[].slice.call(t)}function v(t){return Object.keys(t).reduce((function(e,n){return void 0!==t[n]&&(e[n]=t[n]),e}),{})}function m(){return document.createElement("div")}function g(t){return["Element","Fragment"].some((function(e){return a(t,e)}))}function h(t){return a(t,"MouseEvent")}function b(t){return!(!t||!t._tippy||t._tippy.reference!==t)}function y(t){return g(t)?[t]:function(t){return a(t,"NodeList")}(t)?d(t):Array.isArray(t)?t:d(document.querySelectorAll(t))}function w(t,e){t.forEach((function(t){t&&(t.style.transitionDuration=e+"ms")}))}function x(t,e){t.forEach((function(t){t&&t.setAttribute("data-state",e)}))}function E(t){var e,n=c(t)[0];return null!=n&&null!=(e=n.ownerDocument)&&e.body?n.ownerDocument:document}function O(t,e,n){var r=e+"EventListener";["transitionend","webkitTransitionEnd"].forEach((function(e){t[r](e,n)}))}function C(t,e){for(var n=e;n;){var r;if(t.contains(n))return!0;n=null==n.getRootNode||null==(r=n.getRootNode())?void 0:r.host}return!1}var T={isTouch:!1},A=0;function L(){T.isTouch||(T.isTouch=!0,window.performance&&document.addEventListener("mousemove",D))}function D(){var t=performance.now();t-A<20&&(T.isTouch=!1,document.removeEventListener("mousemove",D)),A=t}function k(){var t=document.activeElement;if(b(t)){var e=t._tippy;t.blur&&!e.state.isVisible&&t.blur()}}var R=Object.assign({appendTo:o,aria:{content:"auto",expanded:"auto"},delay:0,duration:[300,250],getReferenceClientRect:null,hideOnClick:!0,ignoreAttributes:!1,interactive:!1,interactiveBorder:2,interactiveDebounce:0,moveTransition:"",offset:[0,10],onAfterUpdate:function(){},onBeforeUpdate:function(){},onCreate:function(){},onDestroy:function(){},onHidden:function(){},onHide:function(){},onMount:function(){},onShow:function(){},onShown:function(){},onTrigger:function(){},onUntrigger:function(){},onClickOutside:function(){},placement:"top",plugins:[],popperOptions:{},render:null,showOnCreate:!1,touch:!0,trigger:"mouseenter focus",triggerTarget:null},{animateFill:!1,followCursor:!1,inlinePositioning:!1,sticky:!1},{allowHTML:!1,animation:"fade",arrow:!0,content:"",inertia:!1,maxWidth:350,role:"tooltip",theme:"",zIndex:9999}),P=Object.keys(R);function j(t){var e=(t.plugins||[]).reduce((function(e,n){var r,o=n.name,i=n.defaultValue;o&&(e[o]=void 0!==t[o]?t[o]:null!=(r=R[o])?r:i);return e}),{});return Object.assign({},t,e)}function M(t,e){var n=Object.assign({},e,{content:s(e.content,[t])},e.ignoreAttributes?{}:function(t,e){return(e?Object.keys(j(Object.assign({},R,{plugins:e}))):P).reduce((function(e,n){var r=(t.getAttribute("data-tippy-"+n)||"").trim();if(!r)return e;if("content"===n)e[n]=r;else try{e[n]=JSON.parse(r)}catch(t){e[n]=r}return e}),{})}(t,e.plugins));return n.aria=Object.assign({},R.aria,n.aria),n.aria={expanded:"auto"===n.aria.expanded?e.interactive:n.aria.expanded,content:"auto"===n.aria.content?e.interactive?null:"describedby":n.aria.content},n}function V(t,e){t.innerHTML=e}function I(t){var e=m();return!0===t?e.className="tippy-arrow":(e.className="tippy-svg-arrow",g(t)?e.appendChild(t):V(e,t)),e}function S(t,e){g(e.content)?(V(t,""),t.appendChild(e.content)):"function"!=typeof e.content&&(e.allowHTML?V(t,e.content):t.textContent=e.content)}function B(t){var e=t.firstElementChild,n=d(e.children);return{box:e,content:n.find((function(t){return t.classList.contains("tippy-content")})),arrow:n.find((function(t){return t.classList.contains("tippy-arrow")||t.classList.contains("tippy-svg-arrow")})),backdrop:n.find((function(t){return t.classList.contains("tippy-backdrop")}))}}function N(t){var e=m(),n=m();n.className="tippy-box",n.setAttribute("data-state","hidden"),n.setAttribute("tabindex","-1");var r=m();function o(n,r){var o=B(e),i=o.box,a=o.content,s=o.arrow;r.theme?i.setAttribute("data-theme",r.theme):i.removeAttribute("data-theme"),"string"==typeof r.animation?i.setAttribute("data-animation",r.animation):i.removeAttribute("data-animation"),r.inertia?i.setAttribute("data-inertia",""):i.removeAttribute("data-inertia"),i.style.maxWidth="number"==typeof r.maxWidth?r.maxWidth+"px":r.maxWidth,r.role?i.setAttribute("role",r.role):i.removeAttribute("role"),n.content===r.content&&n.allowHTML===r.allowHTML||S(a,t.props),r.arrow?s?n.arrow!==r.arrow&&(i.removeChild(s),i.appendChild(I(r.arrow))):i.appendChild(I(r.arrow)):s&&i.removeChild(s)}return r.className="tippy-content",r.setAttribute("data-state","hidden"),S(r,t.props),e.appendChild(n),n.appendChild(r),o(t.props,t.props),{popper:e,onUpdate:o}}N.$$tippy=!0;var H=1,U=[],_=[];function z(e,a){var p,g,b,y,A,L,D,k,P=M(e,Object.assign({},R,j(v(a)))),V=!1,I=!1,S=!1,N=!1,z=[],F=u(wt,P.interactiveDebounce),W=H++,X=(k=P.plugins).filter((function(t,e){return k.indexOf(t)===e})),Y={id:W,reference:e,popper:m(),popperInstance:null,props:P,state:{isEnabled:!0,isVisible:!1,isDestroyed:!1,isMounted:!1,isShown:!1},plugins:X,clearDelayTimeouts:function(){clearTimeout(p),clearTimeout(g),cancelAnimationFrame(b)},setProps:function(t){if(Y.state.isDestroyed)return;at("onBeforeUpdate",[Y,t]),bt();var n=Y.props,r=M(e,Object.assign({},n,v(t),{ignoreAttributes:!0}));Y.props=r,ht(),n.interactiveDebounce!==r.interactiveDebounce&&(pt(),F=u(wt,r.interactiveDebounce));n.triggerTarget&&!r.triggerTarget?c(n.triggerTarget).forEach((function(t){t.removeAttribute("aria-expanded")})):r.triggerTarget&&e.removeAttribute("aria-expanded");ut(),it(),J&&J(n,r);Y.popperInstance&&(Ct(),At().forEach((function(t){requestAnimationFrame(t._tippy.popperInstance.forceUpdate)})));at("onAfterUpdate",[Y,t])},setContent:function(t){Y.setProps({content:t})},show:function(){var t=Y.state.isVisible,e=Y.state.isDestroyed,n=!Y.state.isEnabled,r=T.isTouch&&!Y.props.touch,a=i(Y.props.duration,0,R.duration);if(t||e||n||r)return;if(et().hasAttribute("disabled"))return;if(at("onShow",[Y],!1),!1===Y.props.onShow(Y))return;Y.state.isVisible=!0,tt()&&($.style.visibility="visible");it(),dt(),Y.state.isMounted||($.style.transition="none");if(tt()){var u=rt(),p=u.box,c=u.content;w([p,c],0)}L=function(){var t;if(Y.state.isVisible&&!N){if(N=!0,$.offsetHeight,$.style.transition=Y.props.moveTransition,tt()&&Y.props.animation){var e=rt(),n=e.box,r=e.content;w([n,r],a),x([n,r],"visible")}st(),ut(),f(_,Y),null==(t=Y.popperInstance)||t.forceUpdate(),at("onMount",[Y]),Y.props.animation&&tt()&&function(t,e){mt(t,e)}(a,(function(){Y.state.isShown=!0,at("onShown",[Y])}))}},function(){var t,e=Y.props.appendTo,n=et();t=Y.props.interactive&&e===o||"parent"===e?n.parentNode:s(e,[n]);t.contains($)||t.appendChild($);Y.state.isMounted=!0,Ct()}()},hide:function(){var t=!Y.state.isVisible,e=Y.state.isDestroyed,n=!Y.state.isEnabled,r=i(Y.props.duration,1,R.duration);if(t||e||n)return;if(at("onHide",[Y],!1),!1===Y.props.onHide(Y))return;Y.state.isVisible=!1,Y.state.isShown=!1,N=!1,V=!1,tt()&&($.style.visibility="hidden");if(pt(),vt(),it(!0),tt()){var o=rt(),a=o.box,s=o.content;Y.props.animation&&(w([a,s],r),x([a,s],"hidden"))}st(),ut(),Y.props.animation?tt()&&function(t,e){mt(t,(function(){!Y.state.isVisible&&$.parentNode&&$.parentNode.contains($)&&e()}))}(r,Y.unmount):Y.unmount()},hideWithInteractivity:function(t){nt().addEventListener("mousemove",F),f(U,F),F(t)},enable:function(){Y.state.isEnabled=!0},disable:function(){Y.hide(),Y.state.isEnabled=!1},unmount:function(){Y.state.isVisible&&Y.hide();if(!Y.state.isMounted)return;Tt(),At().forEach((function(t){t._tippy.unmount()})),$.parentNode&&$.parentNode.removeChild($);_=_.filter((function(t){return t!==Y})),Y.state.isMounted=!1,at("onHidden",[Y])},destroy:function(){if(Y.state.isDestroyed)return;Y.clearDelayTimeouts(),Y.unmount(),bt(),delete e._tippy,Y.state.isDestroyed=!0,at("onDestroy",[Y])}};if(!P.render)return Y;var q=P.render(Y),$=q.popper,J=q.onUpdate;$.setAttribute("data-tippy-root",""),$.id="tippy-"+Y.id,Y.popper=$,e._tippy=Y,$._tippy=Y;var G=X.map((function(t){return t.fn(Y)})),K=e.hasAttribute("aria-expanded");return ht(),ut(),it(),at("onCreate",[Y]),P.showOnCreate&&Lt(),$.addEventListener("mouseenter",(function(){Y.props.interactive&&Y.state.isVisible&&Y.clearDelayTimeouts()})),$.addEventListener("mouseleave",(function(){Y.props.interactive&&Y.props.trigger.indexOf("mouseenter")>=0&&nt().addEventListener("mousemove",F)})),Y;function Q(){var t=Y.props.touch;return Array.isArray(t)?t:[t,0]}function Z(){return"hold"===Q()[0]}function tt(){var t;return!(null==(t=Y.props.render)||!t.$$tippy)}function et(){return D||e}function nt(){var t=et().parentNode;return t?E(t):document}function rt(){return B($)}function ot(t){return Y.state.isMounted&&!Y.state.isVisible||T.isTouch||y&&"focus"===y.type?0:i(Y.props.delay,t?0:1,R.delay)}function it(t){void 0===t&&(t=!1),$.style.pointerEvents=Y.props.interactive&&!t?"":"none",$.style.zIndex=""+Y.props.zIndex}function at(t,e,n){var r;(void 0===n&&(n=!0),G.forEach((function(n){n[t]&&n[t].apply(n,e)})),n)&&(r=Y.props)[t].apply(r,e)}function st(){var t=Y.props.aria;if(t.content){var n="aria-"+t.content,r=$.id;c(Y.props.triggerTarget||e).forEach((function(t){var e=t.getAttribute(n);if(Y.state.isVisible)t.setAttribute(n,e?e+" "+r:r);else{var o=e&&e.replace(r,"").trim();o?t.setAttribute(n,o):t.removeAttribute(n)}}))}}function ut(){!K&&Y.props.aria.expanded&&c(Y.props.triggerTarget||e).forEach((function(t){Y.props.interactive?t.setAttribute("aria-expanded",Y.state.isVisible&&t===et()?"true":"false"):t.removeAttribute("aria-expanded")}))}function pt(){nt().removeEventListener("mousemove",F),U=U.filter((function(t){return t!==F}))}function ct(t){if(!T.isTouch||!S&&"mousedown"!==t.type){var n=t.composedPath&&t.composedPath()[0]||t.target;if(!Y.props.interactive||!C($,n)){if(c(Y.props.triggerTarget||e).some((function(t){return C(t,n)}))){if(T.isTouch)return;if(Y.state.isVisible&&Y.props.trigger.indexOf("click")>=0)return}else at("onClickOutside",[Y,t]);!0===Y.props.hideOnClick&&(Y.clearDelayTimeouts(),Y.hide(),I=!0,setTimeout((function(){I=!1})),Y.state.isMounted||vt())}}}function ft(){S=!0}function lt(){S=!1}function dt(){var t=nt();t.addEventListener("mousedown",ct,!0),t.addEventListener("touchend",ct,r),t.addEventListener("touchstart",lt,r),t.addEventListener("touchmove",ft,r)}function vt(){var t=nt();t.removeEventListener("mousedown",ct,!0),t.removeEventListener("touchend",ct,r),t.removeEventListener("touchstart",lt,r),t.removeEventListener("touchmove",ft,r)}function mt(t,e){var n=rt().box;function r(t){t.target===n&&(O(n,"remove",r),e())}if(0===t)return e();O(n,"remove",A),O(n,"add",r),A=r}function gt(t,n,r){void 0===r&&(r=!1),c(Y.props.triggerTarget||e).forEach((function(e){e.addEventListener(t,n,r),z.push({node:e,eventType:t,handler:n,options:r})}))}function ht(){var t;Z()&&(gt("touchstart",yt,{passive:!0}),gt("touchend",xt,{passive:!0})),(t=Y.props.trigger,t.split(/\s+/).filter(Boolean)).forEach((function(t){if("manual"!==t)switch(gt(t,yt),t){case"mouseenter":gt("mouseleave",xt);break;case"focus":gt(n?"focusout":"blur",Et);break;case"focusin":gt("focusout",Et)}}))}function bt(){z.forEach((function(t){var e=t.node,n=t.eventType,r=t.handler,o=t.options;e.removeEventListener(n,r,o)})),z=[]}function yt(t){var e,n=!1;if(Y.state.isEnabled&&!Ot(t)&&!I){var r="focus"===(null==(e=y)?void 0:e.type);y=t,D=t.currentTarget,ut(),!Y.state.isVisible&&h(t)&&U.forEach((function(e){return e(t)})),"click"===t.type&&(Y.props.trigger.indexOf("mouseenter")<0||V)&&!1!==Y.props.hideOnClick&&Y.state.isVisible?n=!0:Lt(t),"click"===t.type&&(V=!n),n&&!r&&Dt(t)}}function wt(t){var e=t.target,n=et().contains(e)||$.contains(e);"mousemove"===t.type&&n||function(t,e){var n=e.clientX,r=e.clientY;return t.every((function(t){var e=t.popperRect,o=t.popperState,i=t.props.interactiveBorder,a=l(o.placement),s=o.modifiersData.offset;if(!s)return!0;var u="bottom"===a?s.top.y:0,p="top"===a?s.bottom.y:0,c="right"===a?s.left.x:0,f="left"===a?s.right.x:0,d=e.top-r+u>i,v=r-e.bottom-p>i,m=e.left-n+c>i,g=n-e.right-f>i;return d||v||m||g}))}(At().concat($).map((function(t){var e,n=null==(e=t._tippy.popperInstance)?void 0:e.state;return n?{popperRect:t.getBoundingClientRect(),popperState:n,props:P}:null})).filter(Boolean),t)&&(pt(),Dt(t))}function xt(t){Ot(t)||Y.props.trigger.indexOf("click")>=0&&V||(Y.props.interactive?Y.hideWithInteractivity(t):Dt(t))}function Et(t){Y.props.trigger.indexOf("focusin")<0&&t.target!==et()||Y.props.interactive&&t.relatedTarget&&$.contains(t.relatedTarget)||Dt(t)}function Ot(t){return!!T.isTouch&&Z()!==t.type.indexOf("touch")>=0}function Ct(){Tt();var n=Y.props,r=n.popperOptions,o=n.placement,i=n.offset,a=n.getReferenceClientRect,s=n.moveTransition,u=tt()?B($).arrow:null,p=a?{getBoundingClientRect:a,contextElement:a.contextElement||et()}:e,c=[{name:"offset",options:{offset:i}},{name:"preventOverflow",options:{padding:{top:2,bottom:2,left:5,right:5}}},{name:"flip",options:{padding:5}},{name:"computeStyles",options:{adaptive:!s}},{name:"$$tippy",enabled:!0,phase:"beforeWrite",requires:["computeStyles"],fn:function(t){var e=t.state;if(tt()){var n=rt().box;["placement","reference-hidden","escaped"].forEach((function(t){"placement"===t?n.setAttribute("data-placement",e.placement):e.attributes.popper["data-popper-"+t]?n.setAttribute("data-"+t,""):n.removeAttribute("data-"+t)})),e.attributes.popper={}}}}];tt()&&u&&c.push({name:"arrow",options:{element:u,padding:3}}),c.push.apply(c,(null==r?void 0:r.modifiers)||[]),Y.popperInstance=t.createPopper(p,$,Object.assign({},r,{placement:o,onFirstUpdate:L,modifiers:c}))}function Tt(){Y.popperInstance&&(Y.popperInstance.destroy(),Y.popperInstance=null)}function At(){return d($.querySelectorAll("[data-tippy-root]"))}function Lt(t){Y.clearDelayTimeouts(),t&&at("onTrigger",[Y,t]),dt();var e=ot(!0),n=Q(),r=n[0],o=n[1];T.isTouch&&"hold"===r&&o&&(e=o),e?p=setTimeout((function(){Y.show()}),e):Y.show()}function Dt(t){if(Y.clearDelayTimeouts(),at("onUntrigger",[Y,t]),Y.state.isVisible){if(!(Y.props.trigger.indexOf("mouseenter")>=0&&Y.props.trigger.indexOf("click")>=0&&["mouseleave","mousemove"].indexOf(t.type)>=0&&V)){var e=ot(!1);e?g=setTimeout((function(){Y.state.isVisible&&Y.hide()}),e):b=requestAnimationFrame((function(){Y.hide()}))}}else vt()}}function F(t,e){void 0===e&&(e={});var n=R.plugins.concat(e.plugins||[]);document.addEventListener("touchstart",L,r),window.addEventListener("blur",k);var o=Object.assign({},e,{plugins:n}),i=y(t).reduce((function(t,e){var n=e&&z(e,o);return n&&t.push(n),t}),[]);return g(t)?i[0]:i}F.defaultProps=R,F.setDefaultProps=function(t){Object.keys(t).forEach((function(e){R[e]=t[e]}))},F.currentInput=T;var W=Object.assign({},t.applyStyles,{effect:function(t){var e=t.state,n={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};Object.assign(e.elements.popper.style,n.popper),e.styles=n,e.elements.arrow&&Object.assign(e.elements.arrow.style,n.arrow)}}),X={mouseover:"mouseenter",focusin:"focus",click:"click"};var Y={name:"animateFill",defaultValue:!1,fn:function(t){var e;if(null==(e=t.props.render)||!e.$$tippy)return{};var n=B(t.popper),r=n.box,o=n.content,i=t.props.animateFill?function(){var t=m();return t.className="tippy-backdrop",x([t],"hidden"),t}():null;return{onCreate:function(){i&&(r.insertBefore(i,r.firstElementChild),r.setAttribute("data-animatefill",""),r.style.overflow="hidden",t.setProps({arrow:!1,animation:"shift-away"}))},onMount:function(){if(i){var t=r.style.transitionDuration,e=Number(t.replace("ms",""));o.style.transitionDelay=Math.round(e/10)+"ms",i.style.transitionDuration=t,x([i],"visible")}},onShow:function(){i&&(i.style.transitionDuration="0ms")},onHide:function(){i&&x([i],"hidden")}}}};var q={clientX:0,clientY:0},$=[];function J(t){var e=t.clientX,n=t.clientY;q={clientX:e,clientY:n}}var G={name:"followCursor",defaultValue:!1,fn:function(t){var e=t.reference,n=E(t.props.triggerTarget||e),r=!1,o=!1,i=!0,a=t.props;function s(){return"initial"===t.props.followCursor&&t.state.isVisible}function u(){n.addEventListener("mousemove",f)}function p(){n.removeEventListener("mousemove",f)}function c(){r=!0,t.setProps({getReferenceClientRect:null}),r=!1}function f(n){var r=!n.target||e.contains(n.target),o=t.props.followCursor,i=n.clientX,a=n.clientY,s=e.getBoundingClientRect(),u=i-s.left,p=a-s.top;!r&&t.props.interactive||t.setProps({getReferenceClientRect:function(){var t=e.getBoundingClientRect(),n=i,r=a;"initial"===o&&(n=t.left+u,r=t.top+p);var s="horizontal"===o?t.top:r,c="vertical"===o?t.right:n,f="horizontal"===o?t.bottom:r,l="vertical"===o?t.left:n;return{width:c-l,height:f-s,top:s,right:c,bottom:f,left:l}}})}function l(){t.props.followCursor&&($.push({instance:t,doc:n}),function(t){t.addEventListener("mousemove",J)}(n))}function d(){0===($=$.filter((function(e){return e.instance!==t}))).filter((function(t){return t.doc===n})).length&&function(t){t.removeEventListener("mousemove",J)}(n)}return{onCreate:l,onDestroy:d,onBeforeUpdate:function(){a=t.props},onAfterUpdate:function(e,n){var i=n.followCursor;r||void 0!==i&&a.followCursor!==i&&(d(),i?(l(),!t.state.isMounted||o||s()||u()):(p(),c()))},onMount:function(){t.props.followCursor&&!o&&(i&&(f(q),i=!1),s()||u())},onTrigger:function(t,e){h(e)&&(q={clientX:e.clientX,clientY:e.clientY}),o="focus"===e.type},onHidden:function(){t.props.followCursor&&(c(),p(),i=!0)}}}};var K={name:"inlinePositioning",defaultValue:!1,fn:function(t){var e,n=t.reference;var r=-1,o=!1,i=[],a={name:"tippyInlinePositioning",enabled:!0,phase:"afterWrite",fn:function(o){var a=o.state;t.props.inlinePositioning&&(-1!==i.indexOf(a.placement)&&(i=[]),e!==a.placement&&-1===i.indexOf(a.placement)&&(i.push(a.placement),t.setProps({getReferenceClientRect:function(){return function(t){return function(t,e,n,r){if(n.length<2||null===t)return e;if(2===n.length&&r>=0&&n[0].left>n[1].right)return n[r]||e;switch(t){case"top":case"bottom":var o=n[0],i=n[n.length-1],a="top"===t,s=o.top,u=i.bottom,p=a?o.left:i.left,c=a?o.right:i.right;return{top:s,bottom:u,left:p,right:c,width:c-p,height:u-s};case"left":case"right":var f=Math.min.apply(Math,n.map((function(t){return t.left}))),l=Math.max.apply(Math,n.map((function(t){return t.right}))),d=n.filter((function(e){return"left"===t?e.left===f:e.right===l})),v=d[0].top,m=d[d.length-1].bottom;return{top:v,bottom:m,left:f,right:l,width:l-f,height:m-v};default:return e}}(l(t),n.getBoundingClientRect(),d(n.getClientRects()),r)}(a.placement)}})),e=a.placement)}};function s(){var e;o||(e=function(t,e){var n;return{popperOptions:Object.assign({},t.popperOptions,{modifiers:[].concat(((null==(n=t.popperOptions)?void 0:n.modifiers)||[]).filter((function(t){return t.name!==e.name})),[e])})}}(t.props,a),o=!0,t.setProps(e),o=!1)}return{onCreate:s,onAfterUpdate:s,onTrigger:function(e,n){if(h(n)){var o=d(t.reference.getClientRects()),i=o.find((function(t){return t.left-2<=n.clientX&&t.right+2>=n.clientX&&t.top-2<=n.clientY&&t.bottom+2>=n.clientY})),a=o.indexOf(i);r=a>-1?a:r}},onHidden:function(){r=-1}}}};var Q={name:"sticky",defaultValue:!1,fn:function(t){var e=t.reference,n=t.popper;function r(e){return!0===t.props.sticky||t.props.sticky===e}var o=null,i=null;function a(){var s=r("reference")?(t.popperInstance?t.popperInstance.state.elements.reference:e).getBoundingClientRect():null,u=r("popper")?n.getBoundingClientRect():null;(s&&Z(o,s)||u&&Z(i,u))&&t.popperInstance&&t.popperInstance.update(),o=s,i=u,t.state.isMounted&&requestAnimationFrame(a)}return{onMount:function(){t.props.sticky&&a()}}}};function Z(t,e){return!t||!e||(t.top!==e.top||t.right!==e.right||t.bottom!==e.bottom||t.left!==e.left)}return e&&function(t){var e=document.createElement("style");e.textContent=t,e.setAttribute("data-tippy-stylesheet","");var n=document.head,r=document.querySelector("head>style,head>link");r?n.insertBefore(e,r):n.appendChild(e)}('.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}'),F.setDefaultProps({plugins:[Y,G,K,Q],render:N}),F.createSingleton=function(t,e){var n;void 0===e&&(e={});var r,o=t,i=[],a=[],s=e.overrides,u=[],f=!1;function l(){a=o.map((function(t){return c(t.props.triggerTarget||t.reference)})).reduce((function(t,e){return t.concat(e)}),[])}function d(){i=o.map((function(t){return t.reference}))}function v(t){o.forEach((function(e){t?e.enable():e.disable()}))}function g(t){return o.map((function(e){var n=e.setProps;return e.setProps=function(o){n(o),e.reference===r&&t.setProps(o)},function(){e.setProps=n}}))}function h(t,e){var n=a.indexOf(e);if(e!==r){r=e;var u=(s||[]).concat("content").reduce((function(t,e){return t[e]=o[n].props[e],t}),{});t.setProps(Object.assign({},u,{getReferenceClientRect:"function"==typeof u.getReferenceClientRect?u.getReferenceClientRect:function(){var t;return null==(t=i[n])?void 0:t.getBoundingClientRect()}}))}}v(!1),d(),l();var b={fn:function(){return{onDestroy:function(){v(!0)},onHidden:function(){r=null},onClickOutside:function(t){t.props.showOnCreate&&!f&&(f=!0,r=null)},onShow:function(t){t.props.showOnCreate&&!f&&(f=!0,h(t,i[0]))},onTrigger:function(t,e){h(t,e.currentTarget)}}}},y=F(m(),Object.assign({},p(e,["overrides"]),{plugins:[b].concat(e.plugins||[]),triggerTarget:a,popperOptions:Object.assign({},e.popperOptions,{modifiers:[].concat((null==(n=e.popperOptions)?void 0:n.modifiers)||[],[W])})})),w=y.show;y.show=function(t){if(w(),!r&&null==t)return h(y,i[0]);if(!r||null!=t){if("number"==typeof t)return i[t]&&h(y,i[t]);if(o.indexOf(t)>=0){var e=t.reference;return h(y,e)}return i.indexOf(t)>=0?h(y,t):void 0}},y.showNext=function(){var t=i[0];if(!r)return y.show(0);var e=i.indexOf(r);y.show(i[e+1]||t)},y.showPrevious=function(){var t=i[i.length-1];if(!r)return y.show(t);var e=i.indexOf(r),n=i[e-1]||t;y.show(n)};var x=y.setProps;return y.setProps=function(t){s=t.overrides||s,x(t)},y.setInstances=function(t){v(!0),u.forEach((function(t){return t()})),o=t,v(!1),d(),l(),u=g(y),y.setProps({triggerTarget:a})},u=g(y),y},F.delegate=function(t,e){var n=[],o=[],i=!1,a=e.target,s=p(e,["target"]),u=Object.assign({},s,{trigger:"manual",touch:!1}),f=Object.assign({touch:R.touch},s,{showOnCreate:!0}),l=F(t,u);function d(t){if(t.target&&!i){var n=t.target.closest(a);if(n){var r=n.getAttribute("data-tippy-trigger")||e.trigger||R.trigger;if(!n._tippy&&!("touchstart"===t.type&&"boolean"==typeof f.touch||"touchstart"!==t.type&&r.indexOf(X[t.type])<0)){var s=F(n,f);s&&(o=o.concat(s))}}}}function v(t,e,r,o){void 0===o&&(o=!1),t.addEventListener(e,r,o),n.push({node:t,eventType:e,handler:r,options:o})}return c(l).forEach((function(t){var e=t.destroy,a=t.enable,s=t.disable;t.destroy=function(t){void 0===t&&(t=!0),t&&o.forEach((function(t){t.destroy()})),o=[],n.forEach((function(t){var e=t.node,n=t.eventType,r=t.handler,o=t.options;e.removeEventListener(n,r,o)})),n=[],e()},t.enable=function(){a(),o.forEach((function(t){return t.enable()})),i=!1},t.disable=function(){s(),o.forEach((function(t){return t.disable()})),i=!0},function(t){var e=t.reference;v(e,"touchstart",d,r),v(e,"mouseover",d),v(e,"focusin",d),v(e,"click",d)}(t)})),l},F.hideAll=function(t){var e=void 0===t?{}:t,n=e.exclude,r=e.duration;_.forEach((function(t){var e=!1;if(n&&(e=b(n)?t.reference===n:t.popper===n.popper),!e){var o=t.props.duration;t.setProps({duration:r}),t.hide(),t.state.isDestroyed||t.setProps({duration:o})}}))},F.roundArrow='<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>',F}));
//# sourceMappingURL=tippy-bundle.umd.min.js.map
/*
 * Created by David Adams
 * https://codeshack.io/multi-select-dropdown-html-javascript/
 * 
 * Released under the MIT license
 */
class MultiSelect {

  constructor(element, options = {}) {
      let defaults = {
          placeholder: 'Select item(s)',
          max: null,
          search: true,
          selectAll: true,
          listAll: true,
          closeListOnItemSelect: false,
          name: '',
          width: '',
          height: '',
          dropdownWidth: '',
          dropdownHeight: '',
          data: [],
          onChange: function() {},
          onSelect: function() {},
          onUnselect: function() {}
      };
      this.options = Object.assign(defaults, options);
      this.selectElement = typeof element === 'string' ? document.querySelector(element) : element;
      for(const prop in this.selectElement.dataset) {
          if (this.options[prop] !== undefined) {
              this.options[prop] = this.selectElement.dataset[prop];
          }
      }
      this.name = this.selectElement.getAttribute('name') ? this.selectElement.getAttribute('name') : 'multi-select-' + Math.floor(Math.random() * 1000000);
      if (!this.options.data.length) {
          let options = this.selectElement.querySelectorAll('option');
          for (let i = 0; i < options.length; i++) {
              this.options.data.push({
                  value: options[i].value,
                  text: options[i].innerHTML,
                  selected: options[i].selected,
                  html: options[i].getAttribute('data-html')
              });
          }
      }
      this.element = this._template();
      this.selectElement.replaceWith(this.element);
      this._updateSelected();
      this._eventHandlers();
  }

  _template() {
      let optionsHTML = '';
      for (let i = 0; i < this.data.length; i++) {
          optionsHTML += `
              <div class="multi-select-option${this.selectedValues.includes(this.data[i].value) ? ' multi-select-selected' : ''}" data-value="${this.data[i].value}">
                  <span class="multi-select-option-radio"></span>
                  <span class="multi-select-option-text">${this.data[i].html ? this.data[i].html : this.data[i].text}</span>
              </div>
          `;
      }
      let selectAllHTML = '';
      if (this.options.selectAll === true || this.options.selectAll === 'true') {
          selectAllHTML = `<div class="multi-select-all">
              <span class="multi-select-option-radio"></span>
              <span class="multi-select-option-text">Select all</span>
          </div>`;
      }
      let template = `
          <div class="multi-select ${this.name}"${this.selectElement.id ? ' id="' + this.selectElement.id + '"' : ''} style="${this.width ? 'width:' + this.width + ';' : ''}${this.height ? 'height:' + this.height + ';' : ''}">
              ${this.selectedValues.map(value => `<input type="hidden" name="${this.name}[]" value="${value}">`).join('')}
              <div class="multi-select-header" style="${this.width ? 'width:' + this.width + ';' : ''}${this.height ? 'height:' + this.height + ';' : ''}">
                  <span class="multi-select-header-max">${this.options.max ? this.selectedValues.length + '/' + this.options.max : ''}</span>
                  <span class="multi-select-header-placeholder">${this.placeholder}</span>
              </div>
              <div class="multi-select-options" style="${this.options.dropdownWidth ? 'width:' + this.options.dropdownWidth + ';' : ''}${this.options.dropdownHeight ? 'height:' + this.options.dropdownHeight + ';' : ''}">
                <div class="multi-select-options-scroll">
                    ${this.options.search === true || this.options.search === 'true' ? '<input type="text" class="multi-select-search" placeholder="Search...">' : ''}
                    ${selectAllHTML}
                    ${optionsHTML}
                </div>
              </div>
          </div>
      `;
      let element = document.createElement('div');
      element.innerHTML = template;
      return element;
  }

  _eventHandlers() {
      let headerElement = this.element.querySelector('.multi-select-header');
      this.element.querySelectorAll('.multi-select-option').forEach(option => {
          option.onclick = () => {
              let selected = true;
              if (!option.classList.contains('multi-select-selected')) {
                  if (this.options.max && this.selectedValues.length >= this.options.max) {
                      return;
                  }
                  option.classList.add('multi-select-selected');
                  if (this.options.listAll === true || this.options.listAll === 'true') {
                      if (this.element.querySelector('.multi-select-header-option')) {
                          let opt = Array.from(this.element.querySelectorAll('.multi-select-header-option')).pop();
                          opt.insertAdjacentHTML('afterend', `<span class="multi-select-header-option" data-value="${option.dataset.value}">${option.querySelector('.multi-select-option-text').innerHTML}</span>`);
                      } else {
                          headerElement.insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option" data-value="${option.dataset.value}">${option.querySelector('.multi-select-option-text').innerHTML}</span>`);
                      }
                  }
                  this.element.querySelector('.multi-select').insertAdjacentHTML('afterbegin', `<input type="hidden" name="${this.name}[]" value="${option.dataset.value}">`);
                  this.data.filter(data => data.value == option.dataset.value)[0].selected = true;
              } else {
                  option.classList.remove('multi-select-selected');
                  this.element.querySelectorAll('.multi-select-header-option').forEach(headerOption => headerOption.dataset.value == option.dataset.value ? headerOption.remove() : '');
                  this.element.querySelector(`input[value="${option.dataset.value}"]`).remove();
                  this.data.filter(data => data.value == option.dataset.value)[0].selected = false;
                  selected = false;
              }
              if (this.options.listAll === false || this.options.listAll === 'false') {
                  if (this.element.querySelector('.multi-select-header-option')) {
                      this.element.querySelector('.multi-select-header-option').remove();
                  }
                  headerElement.insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option">${this.selectedValues.length} selected</span>`);
              }
              if (!this.element.querySelector('.multi-select-header-option')) {
                  headerElement.insertAdjacentHTML('afterbegin', `<span class="multi-select-header-placeholder">${this.placeholder}</span>`);
              } else if (this.element.querySelector('.multi-select-header-placeholder')) {
                  this.element.querySelector('.multi-select-header-placeholder').remove();
              }
              if (this.options.max) {
                  this.element.querySelector('.multi-select-header-max').innerHTML = this.selectedValues.length + '/' + this.options.max;
              }
              if (this.options.search === true || this.options.search === 'true') {
                  this.element.querySelector('.multi-select-search').value = '';
              }
              this.element.querySelectorAll('.multi-select-option').forEach(option => option.style.display = 'flex');
              if (this.options.closeListOnItemSelect === true || this.options.closeListOnItemSelect === 'true') {
                  headerElement.classList.remove('multi-select-header-active');
              }
              this.options.onChange(option.dataset.value, option.querySelector('.multi-select-option-text').innerHTML, option);
              if (selected) {
                  this.options.onSelect(option.dataset.value, option.querySelector('.multi-select-option-text').innerHTML, option);
              } else {
                  this.options.onUnselect(option.dataset.value, option.querySelector('.multi-select-option-text').innerHTML, option);
              }
          };
      });
      headerElement.onclick = () => headerElement.classList.toggle('multi-select-header-active');  
      if (this.options.search === true || this.options.search === 'true') {
          let search = this.element.querySelector('.multi-select-search');
          search.oninput = () => {
              this.element.querySelectorAll('.multi-select-option').forEach(option => {
                  option.style.display = option.querySelector('.multi-select-option-text').innerHTML.toLowerCase().indexOf(search.value.toLowerCase()) > -1 ? 'flex' : 'none';
              });
          };
      }
      if (this.options.selectAll === true || this.options.selectAll === 'true') {
          let selectAllButton = this.element.querySelector('.multi-select-all');
          selectAllButton.onclick = () => {
              let allSelected = selectAllButton.classList.contains('multi-select-selected');
              this.element.querySelectorAll('.multi-select-option').forEach(option => {
                  let dataItem = this.data.find(data => data.value == option.dataset.value);
                  if (dataItem && ((allSelected && dataItem.selected) || (!allSelected && !dataItem.selected))) {
                      option.click();
                  }
              });
              selectAllButton.classList.toggle('multi-select-selected');
          };
      }
      if (this.selectElement.id && document.querySelector('label[for="' + this.selectElement.id + '"]')) {
          document.querySelector('label[for="' + this.selectElement.id + '"]').onclick = () => {
              headerElement.classList.toggle('multi-select-header-active');
          };
      }
      document.addEventListener('click', event => {
          if (!event.target.closest('.' + this.name) && !event.target.closest('label[for="' + this.selectElement.id + '"]')) {
              headerElement.classList.remove('multi-select-header-active');
          }
      });
  }

  _updateSelected() {
      if (this.options.listAll === true || this.options.listAll === 'true') {
          this.element.querySelectorAll('.multi-select-option').forEach(option => {
              if (option.classList.contains('multi-select-selected')) {
                  this.element.querySelector('.multi-select-header').insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option" data-value="${option.dataset.value}">${option.querySelector('.multi-select-option-text').innerHTML}</span>`);
              }
          });
      } else {
          if (this.selectedValues.length > 0) {
              this.element.querySelector('.multi-select-header').insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option">${this.selectedValues.length} selected</span>`);
          }
      }
      if (this.element.querySelector('.multi-select-header-option')) {
          this.element.querySelector('.multi-select-header-placeholder').remove();
      }
  }

  get selectedValues() {
      return this.data.filter(data => data.selected).map(data => data.value);
  }

  get selectedItems() {
      return this.data.filter(data => data.selected);
  }

  set data(value) {
      this.options.data = value;
  }

  get data() {
      return this.options.data;
  }

  set selectElement(value) {
      this.options.selectElement = value;
  }

  get selectElement() {
      return this.options.selectElement;
  }

  set element(value) {
      this.options.element = value;
  }

  get element() {
      return this.options.element;
  }

  set placeholder(value) {
      this.options.placeholder = value;
  }

  get placeholder() {
      return this.options.placeholder;
  }

  set name(value) {
      this.options.name = value;
  }

  get name() {
      return this.options.name;
  }

  set width(value) {
      this.options.width = value;
  }

  get width() {
      return this.options.width;
  }

  set height(value) {
      this.options.height = value;
  }

  get height() {
      return this.options.height;
  }

}


/* FUNCTIONS                                      
--------------------------------------------------------*/

// Range slider
(function(){
    if(!$('.cg-range').length) return;

    const rangevalue = document.querySelector(".cg-range__sliderin");
    const rangeInputvalue = document.querySelectorAll(".cg-range__itms input");
    const priceInputvalue = document.querySelectorAll(".cg-range__inputs input");

    let priceGap = 10;

    for (let i = 0; i < priceInputvalue.length; i++) {
        priceInputvalue[i].addEventListener("input", e => {
            // Parse min and max values of the range input
            priceInputvalue[i].value = priceInputvalue[i].value || '0';
            let minp = parseInt(priceInputvalue[0].value);
            let maxp = parseInt(priceInputvalue[1].value);
            let diff = maxp - minp

            if (minp < 0) {
                console.log("minimum price cannot be less than 0");
                priceInputvalue[0].value = 0;
                minp = 0;
            }
    
            // Validate the input values
            if (maxp > 10000) {
                console.log(`maximum price cannot be greater than ${priceInputvalue[1].max}`);
                priceInputvalue[1].value = priceInputvalue[1].max || 10000;
                maxp = priceInputvalue[1].max || 10000;
            }
    
            if (minp > maxp - priceGap) {
                priceInputvalue[0].value = maxp - priceGap;
                minp = maxp - priceGap;
    
                if (minp < 0) {
                    priceInputvalue[0].value = 0;
                    minp = 0;
                }
            }
    
            // Check if the price gap is met 
            // and max price is within the range
            if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
                if (e.target.className.includes("min-input")) {
                    rangeInputvalue[0].value = minp;
                    let value1 = rangeInputvalue[0].max;
                    rangevalue.style.left = `${(minp / value1) * 100}%`;
                }
                else {
                    rangeInputvalue[1].value = maxp;
                    let value2 = rangeInputvalue[1].max;
                    rangevalue.style.right = 
                        `${100 - (maxp / value2) * 100}%`;
                }
            } else {
                rangeInputvalue[0].value = priceInputvalue[0].value;
                rangeInputvalue[1].value = priceInputvalue[1].value;
                rangevalue.style.left = `${(minp / rangeInputvalue[0].max) * 100}%`;
                rangevalue.style.right = `${100 - (maxp / rangeInputvalue[1].max) * 100}%`;
            }
        });
    
        // Add event listeners to range input elements
        for (let i = 0; i < rangeInputvalue.length; i++) {
            rangeInputvalue[i].addEventListener("input", e => {
                let minVal = 
                    parseInt(rangeInputvalue[0].value);
                let maxVal = 
                    parseInt(rangeInputvalue[1].value);
    
                let diff = maxVal - minVal
                // Check if the price gap is exceeded
                if (diff < priceGap) {
                
                    // Check if the input is the min range input
                    if (e.target.className === "min-range") {
                        rangeInputvalue[0].value = maxVal - priceGap;
                    }
                    else {
                        rangeInputvalue[1].value = minVal + priceGap;
                    }
                }
                else {
                
                    // Update price inputs and range progress
                    priceInputvalue[0].value = minVal;
                    priceInputvalue[1].value = maxVal;
                    rangevalue.style.left =
                        `${(minVal / rangeInputvalue[0].max) * 100}%`;
                    rangevalue.style.right =
                        `${100 - (maxVal / rangeInputvalue[1].max) * 100}%`;
                }
            });
        } 
    }

    rangevalue.style.left =
    `${(parseInt(rangeInputvalue[0].value) / rangeInputvalue[0].max) * 100}%`;
    rangevalue.style.right =
    `${100 - (parseInt(rangeInputvalue[1].value) / rangeInputvalue[1].max) * 100}%`;

})();


// Add Card
function addCard(el) {
    let qty = $(el).closest('.bg-cards__foot').find('[data-count]').val();
    if(!qty || qty <= 0) return;

    $('.basket').addClass('basket--show');
    $('.livechat-link').css('bottom', `${$('.basket').outerHeight() + 20}px`);
}
function closeCard() {
    $('.basket').removeClass('basket--show');
    $('.livechat-link').removeAttr('style');
}


// Reset Filters
function filtersReset() {
    // multi selects
    $('.cgfilters').find('.multi-select-selected').trigger('click');

    // stock
    $('.cgfilters__checkbox input').prop('checked', false);

    // range input
    const rangevalue = document.querySelector(".cg-range__sliderin");
    const rangeInputvalue = document.querySelectorAll(".cg-range__itms input");
    const priceInputvalue = document.querySelectorAll(".cg-range__inputs input");
    rangeInputvalue[0].value = rangeInputvalue[0].min || 0;
    rangeInputvalue[1].value = rangeInputvalue[1].max || 10000;
    priceInputvalue[0].value = rangeInputvalue[0].value;
    priceInputvalue[1].value = rangeInputvalue[1].value;

    rangevalue.style.left = `${(parseInt(rangeInputvalue[0].value) / rangeInputvalue[0].max) * 100}%`;
    rangevalue.style.right = `${100 - (parseInt(rangeInputvalue[1].value) / rangeInputvalue[1].max) * 100}%`;
}


// Countdown
function xtimer(id, deadline, cb) {

	const addZero = (num) => num <= 9 ? `0${num}` : num;
	
	function timeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			//hours   = Math.floor( (t/(1000 * 60 * 60))),
			days = Math.floor(t / (1000 * 60 * 60 * 24));

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("[data-days]") || '',
			hours = timer.querySelector("[data-hours]") || '',
			minutes = timer.querySelector("[data-minutes]") || '',
			seconds = timer.querySelector("[data-seconds]") || '',
			timerInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = timeRemaining(endtime);

			if (days) {
				days.textContent = addZero(t.days);
			}
			if (hours) {
				hours.textContent = addZero(t.hours);
			}
			if (minutes) {
				minutes.textContent = addZero(t.minutes);
			}
			if (seconds) {
				seconds.textContent = addZero(t.seconds);
			}

			if (t.total <= 0) {
				if (days) {
					days.textContent = "00";
				}
				if (hours) {
					hours.textContent = "00";
				}
				if (minutes) {
					minutes.textContent = "00";
				}
				if (seconds) {
					seconds.textContent = "00";
				}

				clearInterval(timerInterval);

				if (cb && typeof cb === 'function') {
					cb();
				}
			}

		}

	}

	setClock(id, deadline);
}


// Short Countdown
function shortTimer(durationInSeconds, element, cb) {
    let remainingTime = durationInSeconds;
    const wrap = document.querySelector(element);

    const timerInterval = setInterval(() => {
        if (remainingTime < 0) {
            clearInterval(timerInterval);
            (cb && typeof cb === 'function') && cb();
        } else {
            // Вычисляем минуты и секунды
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            // Форматируем в виде MM:SS
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            wrap.innerHTML = formattedTime;

            remainingTime--;
        }
    }, 1000);
}


/* Onload DOM                                        
--------------------------------------------------------*/
$(function(){
    // Mobile menu
    $('.mobile-hamburger').on('click', (e) => {
        e.preventDefault();
        $('body').toggleClass('menu--open');
        let xlink = $('body').hasClass('menu--open') ? 'ic-x' : 'ic-hamburger';
        $('.mobile-hamburger use').attr('xlink:href', `#${xlink}`);
        $('.mobile-hamburger svg').attr('class', xlink);
    });

    // Live chat
    $('.livechat-link').on('click', (e) => e.preventDefault());

    // Search input
    const $inputSearch = $('.search__inp');
    $(document).on('click', e => {
        if (!$(e.target).closest('.search').length) {
            $('.search__dropdown').fadeOut(200);
        }
    });
    $inputSearch.on('input click', e => {
        const $searchDropdown = $('.search__dropdown');
        if( $inputSearch.val().length < 3 ) {
            $searchDropdown.is(':visible') && $searchDropdown.fadeOut(200);
            return;
        }
        if( $inputSearch.val().length > 50 ) {
            return;
        }
        
        const $searchList = $('.search__list');
        const $searchTxt = $searchList.find('.search-txt');

        $searchTxt.text($inputSearch.val());    
        $searchDropdown.fadeIn(200, () => $searchList.scrollTop(0));
    });


    // Cards carousel
    function toggleNewItemInCards($carousel, categoryLink) {
        let newEl = $carousel.find('.cat-link');

        if ($(window).width() <= 720 && newEl.length === 0) {
            $carousel.trigger('add.owl.carousel', [
                `<div class="sm-card cat-link">
                    <a href="${categoryLink}" class="abs-link">&nbsp;</a>
                    <svg><use xlink:href="#ic-arr-next"></use></svg>
                </div>`
            ]).trigger('refresh.owl.carousel');
        } else if ($(window).width() > 720 && newEl.length > 0) {
            let itemIndex = $carousel.find('.owl-item:has(.cat-link)').index();

            if (itemIndex !== -1) {
                $carousel.trigger('remove.owl.carousel', itemIndex).trigger('refresh.owl.carousel');
            }
        }
    }

    $('.sm-card__list').each(function(index, element) {
        const $carousel = $(element);
        const $prevBtn = $carousel.closest('.sm-card__carousel').find('.sm-card__prevbtn');
        const $nextBtn = $carousel.closest('.sm-card__carousel').find('.sm-card__nextbtn');
        const $scrollBar = $carousel.closest('.sm-card__carousel').find('.smc-scroll'); // for mobile
        const categoryLink = $carousel.closest('.sm-card__carousel').data('category-link') || '#';
        let prevClicked = false;

        $carousel.addClass("owl-carousel").owlCarousel({
            nav: false,
            loop: false,
            dots: false,
            drag: false,
            mouseDrag: false,
            rewind: true,
            responsive: {
                0: {
                    margin: 10,
                    autoWidth: true,
                    rewind: false,
                },
                500: {
                    margin: 10,
                    autoWidth: true,
                    rewind: false,
                },
                721: {
                    margin: 20
                },
                1024: {
                    items: 4,
                    margin: 20
                },
                1440: {
                    items: 4,
                    margin: 25
                },
                1700: {
                    items: 4,
                    margin: 40
                }
            },
            onInitialized: function(e) {
                toggleNewItemInCards($carousel, categoryLink);
    
                let perPage = e.page.size;
                let itemCount = $carousel.find('.sm-card').length - (perPage - 1);
                let carouselWidth = $carousel.closest('.sm-card__list').outerWidth(true);
                let barWidth = carouselWidth / itemCount;
                $scrollBar.css('width', barWidth + 'px');
            },
            onTranslated: function(e) {
                toggleNewItemInCards($carousel, categoryLink);
    
                let perPage = e.page.size;
                let itemCount = $carousel.find('.sm-card').length - (perPage - 1);
                let carouselWidth = $carousel.closest('.sm-card__list').outerWidth(true);
                let barWidth = carouselWidth / itemCount;
                $scrollBar.css('width', barWidth + 'px');
            },
            onResized: function(e) {
                toggleNewItemInCards($carousel, categoryLink);
    
                let perPage = e.page.size;
                let itemCount = $carousel.find('.sm-card').length - (perPage - 1);
                let carouselWidth = $carousel.closest('.sm-card__list').outerWidth(true);
                let barWidth = carouselWidth / itemCount;
                $scrollBar.css('width', barWidth + 'px');
            }
        });

        $nextBtn.on('click', function() {
            $carousel.trigger('next.owl.carousel');
            let currentIndex = $carousel.find('.owl-item.active').index();
            let barPosition = $scrollBar.width() * currentIndex;
            $scrollBar.animate({left: barPosition},200);
        });

        $prevBtn.on('click', function() {
            let currentIndex = $carousel.find('.owl-item.active').index();
            let barPosition = $scrollBar.width() * currentIndex;
            let totalItems = $carousel.find('.owl-item').length;

            if (!prevClicked && currentIndex === 0) {
                $carousel.trigger('to.owl.carousel', [totalItems - 1, 300]);
            } else {
                $carousel.trigger('prev.owl.carousel');
            }

            $scrollBar.animate({left: barPosition},200);
        });

        $carousel.on('dragged.owl.carousel', function(e) {
            let currentIndex = e.item.index;
            let itemCount = e.item.count - 1;
            let carouselWidth = $carousel.closest('.sm-card__list').outerWidth(true);
            let elementWidth = $carousel.find('.owl-item').outerWidth(true);
            let activeItemsLength = $carousel.find('.owl-item.active').length - 1;
            
            let barWidth = carouselWidth / (itemCount + 1); 
        
            let barPosition = barWidth * currentIndex; 
            
            if (currentIndex + activeItemsLength >= itemCount) {
                console.log($carousel.find('.sm-card.cat-link').outerWidth(true));
                barPosition = barPosition + ($carousel.find('.sm-card.cat-link').outerWidth(true) - barWidth);
                barPosition = carouselWidth - barWidth;
            }
        
            $scrollBar.animate({ left: barPosition }, 200);
        });

        $scrollBar.on('touchstart', function(event) {
            event.stopPropagation();
            const touch = event.originalEvent.touches[0];
            startX = touch.pageX;
            initialLeft = $scrollBar.position().left;
            isDragging = true;
            event.preventDefault();
        });

        $scrollBar.on('touchmove', function(event) {
            event.stopPropagation();
            if (isDragging) {
                var touch = event.originalEvent.touches[0];
                var deltaX = touch.pageX - startX;
                var newLeft = initialLeft + deltaX;

                var containmentWidth = $scrollBar.parent().width() - $scrollBar.width();
                newLeft = Math.max(0, Math.min(newLeft, containmentWidth));

                $scrollBar.css('left', newLeft + 'px');

                let scrollPos = Math.round(newLeft / $scrollBar.width());
                $carousel.trigger('to.owl.carousel', scrollPos);

                event.preventDefault();
            }
        });

        $scrollBar.on('touchend', function() {
            isDragging = false;
        });
    });


    // Inputs mask
    if (document.querySelector('[data-isnumber]')) {
        const dataNumber = document.querySelectorAll('[data-isnumber]');
        for (let i = 0; i < dataNumber.length; i++) {
            IMask(dataNumber[i], {
                mask: Number
            });
        }
    }
    if (document.querySelector('[data-isnumber-100]')) {
        const dataNumber100 = document.querySelectorAll('[data-isnumber-100]');
        const maskOptions = {
            mask: Number,
            lazy: false
        };
        for (let i = 0; i < dataNumber100.length; i++) {
            const maskedInput = IMask(dataNumber100[i], maskOptions);

            maskedInput.on('accept', function () {
                let value = parseInt(maskedInput.value, 10);
                if (value > 99) {
                  maskedInput.value = '99';
                } else if (value < 1 || maskedInput.value == '') {
                  maskedInput.value = '1';
                }
            });

            dataNumber100[i].addEventListener('blur', () => {
                let value = parseInt(dataNumber100[i].value, 10);
                if (value > 99) value = 99;
                else if (value < 1) value = 1;
                dataNumber100[i].value = value;
            });
        }
    }


    // Cards counter
    $('.bg-cards__counter').each(function(index, element) {
        let $inpVal = $(element).find('[data-count]'),
            $btnMin = $(element).find('[data-minus]'),
            $btnPls = $(element).find('[data-plus]');

        ($inpVal.val() <= 1) && $btnMin.prop('disabled', true);

        $btnMin.on('click', e => {
            e.preventDefault();
            !$inpVal.val() && $inpVal.val(1);
            let val = $inpVal.val();
            if($inpVal.val() <= 1) return;

            $inpVal.val(parseInt(val)-1);
            ($inpVal.val() == 1) && $btnMin.prop('disabled', true);
            $btnPls.prop('disabled') && $btnPls.prop('disabled', false);
        });

        $btnPls.on('click', e => {
            e.preventDefault();
            !$inpVal.val() && $inpVal.val(1);
            let val = $inpVal.val();
            if(val >= 99) return;

            $inpVal.val(parseInt(val)+1);
            ($inpVal.val() == 99) && $btnPls.prop('disabled', true);
            $btnMin.prop('disabled') && $btnMin.prop('disabled', false);           
        });

        $inpVal.on('input', (e) => {
            ($inpVal.val() == 1) && $btnMin.prop('disabled', true);
            ($inpVal.val() > 1 && $btnMin.prop('disabled')) && $btnMin.prop('disabled', false);

            ($inpVal.val() >= 99) && $btnPls.prop('disabled', true);
            ($inpVal.val() < 99 && $btnPls.prop('disabled')) && $btnPls.prop('disabled', false);
        });
    });


    // Select multi
    if(document.querySelectorAll('[data-multi-select]').length) {
        document.querySelectorAll('[data-multi-select]').forEach(select => new MultiSelect(select, {
            selectAll: false,
            search: false
        }));
    }   

    // Tippy tooltip
    tippy('[data-tippy-content]', {
        theme: 'light',
        allowHTML: true,
        animation: 'scale',
        duration: 200
    });


    // Timers
    if($('.js-stimer').length) {
        shortTimer(15, '.js-stimer', () => console.log('Finish timer!'));
    }

    if($('.js-offline-timer').length) {
        const now = new Date();
        now.setHours(now.getHours() + 7);
        xtimer('.js-offline-timer', now.toISOString(), () => console.log("Finish Timer!"));
    }

});