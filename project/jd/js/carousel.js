;(function($){
	function Carousel($elem,options){
		this.$elem=$elem;
		this.options=options;
		this.$carouselItems=this.$elem.find('.carousel-item');
		this.itemNum=this.$carouselItems.length;
		this.$btns=$elem.find('.btn-item');
		this.$controlBtns=$elem.find('.control');
		this.now=this._getCorrectIndex(options.activeIndex);
		this._init();
	}
	Carousel.prototype={
		constructor:Carousel,
		_init:function(){
			var self=this;
			this.$elem.trigger('carousel-show',[this.now,this.$carouselItems[this.now]]);
			if(this.options.mode==='slide'){
				this.$carouselItems.on('move moved',function(ev){
					var index=self.$carouselItems.index(this);
					if(ev.type=='move'){
						if(index==self.now){
							self.$elem.trigger('carousel-hide',[index,this]);
						}else{
						 	self.$elem.trigger('carousel-show',[index,this]);
						}
					}else if(ev.type=='moved'){
						if(index==self.now){
						 	self.$elem.trigger('carousel-shown',[index,this]);
						}else{
						 	self.$elem.trigger('carousel-hidden',[index,this]);
						}
					}
				});
				this.$elem.addClass('slide');
				this.$carouselItems.eq(this.now).css({left:0});
				this.itemWidth=this.$carouselItems.eq(0).width();
				this.$carouselItems.move(this.options);	
				this.transitionClass=this.$carouselItems.eq(this.now).hasClass('transition') ? 'transition' : '';
				this.tab=this._slide;
			}else{
				this.$carouselItems.on('show shown hide hidden',function(ev){
					self.$elem.trigger('carousel-'+ev.type,[self.$carouselItems.index(this),this]);
				});
				this.$elem.addClass('fade');
				this.$carouselItems.eq(this.now).show();								
				this.$carouselItems.showHide(this.options);
				this.tab=this._fade;
			}
			this.$btns.eq(this.now).addClass('active');	
			this.$elem
			.hover(function(){
				self.$controlBtns.show();
			},function(){
				self.$controlBtns.hide();
			})
			.on('click','.control-right',function(){
				self.tab(self._getCorrectIndex(self.now+1),1);
			})
			.on('click','.control-left',function(){
				self.tab(self._getCorrectIndex(self.now-1),-1);
			});
			this.$btns.on('click',function(){
				self.tab(self.$btns.index($(this)));
			});
			if(this.options.interval){
				this.auto();
				this.$elem.hover($.proxy(self.pause,self),$.proxy(self.auto,self));		
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
		_slide(index,direction){
			if(this.now==index) return;
			// 确定方向
			if(!direction){
				if(index>this.now){
					direction=1;
				}else{
					direction=-1;
				}		
			}
			this.$carouselItems.eq(index).removeClass(this.transitionClass).css({left:direction*this.itemWidth});
			setTimeout(function(){
				this.$carouselItems.eq(this.now).move('x',-1*direction*this.itemWidth)
				this.$carouselItems.eq(index).addClass(this.transitionClass).move('x',0);
				this.now=index;
			}.bind(this),20);
			this.$btns.eq(this.now).removeClass('active');
			this.$btns.eq(index).addClass('active');	
		},
		auto(){
			var self=this;
			this.timer=null;
			this.timer=setInterval(function(){
				self.tab(self._getCorrectIndex(self.now+1),1);
			},this.options.interval)
		},
		pause(){
			clearInterval(this.timer);
		},
		_getCorrectIndex(index){
			if(index>=this.itemNum) return 0;
			if(index<0) return (this.itemNum-1);
			return index;
		}
	}
	Carousel.DEFAULTS={
		css3:false,
		js:true,
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
					options=$.extend({},Carousel.DEFAULTS,options);
					carousel=new Carousel($(this),options);
					$this.data('carousel',carousel);
				}
				if(typeof carousel[options]=='function'){
					carousel[options]();
				}
			});
		}
	})
})(jQuery);