;(function($){
	function init($elem){
		this.$elem=$elem;
		this.currentX=parseFloat(this.$elem.css('left'));
		this.currentY=parseFloat(this.$elem.css('top'));			
	}
	function to(x,y,callBack){
		x=(typeof x=='number')? x:this.currentX; 
		y=(typeof y=='number')? y:this.currentY; 
		if(this.currentX==x&&this.currentY==y) return;
		this.$elem.trigger('move');
		if(typeof callBack=='function') callBack();
		this.currentX=x;
		this.currentY=y;			
	}
	function Slient($elem){
		init.call(this,$elem);
		this.$elem.removeClass('transition');
	}
	Slient.prototype={
		constructor:Slient,
		to:function(x,y){
			var self=this;
			to.call(this,x,y,function(){
				self.$elem.css({
					top:y,
					left:x,
				});
				self.$elem.trigger('moved');
			});
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	}
	function Css3($elem){
		init.call(this,$elem);
		this.$elem.addClass('transition');
		this.$elem.css({
			left:this.currentX,
			top:this.currentY
		});
	}
	Css3.prototype={
		constructor:Css3,
		to:function(x,y){
			var self=this;
			to.call(this,x,y,function(){
				self.$elem
				.off(kuazhu.transition.end)
				.one(kuazhu.transition.end,function(){
					self.$elem.trigger('moved');
				});
				self.$elem.css({
					top:y,
					left:x,
				});
			});				
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	}
	function Js($elem){
		init.call(this,$elem);
		this.$elem.removeClass('transition');
	}
	Js.prototype={
		constructor:Js,
		to:function(x,y){
			var self=this;
			to.call(this,x,y,function(){
				self.$elem
				.stop()
				.animate({
					left:x,
					top:y
				},function(){
					self.$elem.trigger('moved');
				});
			});				
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	}
	var mode=null;
	function move(options){
		if(options.css3&&kuazhu.transition.isSupport){
			mode=Css3;
		}
		else if(options.js){
			mode=Js;
		}
		else{
			mode=Slient;
		}
		return {
		to:$.proxy(mode.to,mode),
		x:$.proxy(mode.x,mode),
		y:$.proxy(mode.y,mode)
		}
	}
	var DEFAULTS={
		css3:true,
		js:true
	}
	$.fn.extend({
		move:function(options,x,y){
			return this.each(function(){
				var $this=$(this);
				var moveMode=$this.data('moveMode')
				if(!moveMode){
					options=$.extend(DEFAULTS,options);
					moveMode=mmove($this,options);
					$this.data('moveMode',moveMode);
				}
				if(typeof moveMode[options]=='function'){
					moveMode[options](x,y);
				}
			});
		}
	})
})(jQuery);