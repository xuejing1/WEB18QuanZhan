;(function($){
	function DropDown($elem,options){
		this.$elem=$elem;
		this.options=options;
		this.activeClass=this.$elem.data('active');
		this.$layer=this.$elem.find('.dropdown-layer');
		this.$layer.showHide(this.options);
		this.$layer.on('show shown hide hidden',function(ev){
			this.$elem.trigger('dropdown.js-'+ev.type);
		})
	}
	DropDown.prototype={
		constructor:'DropDown',
		show:function(){
			if(this.options.delay){
				this.timer=setTimeout(function(){
					this.$layer.showHide(show);
				})
			}
		},
		hide:function(){
			this.$layer.showHide('hide');
			this.$elem.removeClass(this.activeClass);
		}
	};
	DropDown.DEFULTS={
		css3:false,
		js:true,
		mode:'slideUpDown'
	}
	$.fn.extend({
		DropDown:function(options){
			return this.each(function(){
				options=$.extend(DropDown.DEFULTS,options);
				new DropDown($(this),options)
			});
		}
	})
})(jQuery);