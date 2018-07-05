;function($){
	function Carousel($elem,options){
		this.$elem=$elem;
		this.options=options;
		this.carouselItems=this.$elem.find('.carousel-img');
		this.btnNum=this.carouselItems.length;
		this.btns=$elem.find('.carousel-btn');
		this.controls=$elem.find('.control');
		this.now=this._getCorrectIndex(options.activeIndex);
		this._init();
		if(options.interval){
			this.auto();
			var self=this;
			this.$elem.hover($proxy(self.pause,self),$proxy(self.auto,self));
		}
	}
	Carousel.prototype={
		constructor:Carousel,
		_init:function(){
			var self=this;
			this.$btns.eq(this.now).addClass('active');
			if(this.options.mode==='slide'){
				this.tab=this._slide;
			}else{
				this.carouselItems.showHide(this.options);
				this.tab=this._slide;
			}
			this.$elem.hover(function(){
				self._show();
			},function(){
				self._hide();
			})
			.on('click','.carousel-btnr',function(){
				self.tab(self._getCorrectIndex(self.now+1));
			})
			.on('click','.carousel-btnl',function(){
				self.tab(self._getCorrectIndex(self.now-1));
			})
			this.$btns.on('click',function(){
				self.tab(self.$btns.index($(this)));
			});
			if(this.options.interval){
				this.auto();
				this.$elem.hover($.proxy(self.pause,self),$.proxy(self.auto,self))
			}
		},
		_fade(index){
			if(this.now==index) return;
			this.$carouselItems.eq(this.now).showHide('hide');
			this.$btns.eq(this.now).removeClass('active');
			this.$carouselItems.eq(index).showHide('show');
			this.$btns.eq(index).addClass('active');
			this.now=index;
		},
		_slide(){
		},
		auto(){
			var self=this;
			this.timer=null;
			this.timer=setInterval(function(){
				self.tab(self._getCorrectIndex(self.now+1));
			},this.options.interval)
		},
		pause(){
			clearInterval(this.timer);
		},
		_getCorrectIndex(index){
			if(index>=this.btnNum) return 0;
			if(index<0) return (this.btnNum-1);
			return index;
		}
	}
	Carousel.DEFAULTS={
		css3:true,
		js:false,
		mode:'fade',
		activeIndex:1,
		interval:0
	}
	$.fn.extend({
		carousel:function(options){
			return this.each(function(){
				var $this=$(this);
				var carousel=$this.data('carousel');
				if(!carousel){
					options=$.extend(Carousel.DEFAULTS,options);
					carousel=new Carousel($(this),options);
					$this.data('carousel',carousel);
				}
				if(typeof carousel[options]=='function'){
					carousel[options]();
				}
			});
		}
	})
}(jQuery)