;(function($){
	function Search($elem,options){
		this.$elem=$elem;
		this.$searchFrom=this.$elem.find('#search-form'),
		this.searchInput=this.$elem.find('.search-input'),
		this.$searchLayer=this.$elem.find('.search-layer'),
		this.$searchBtn=this.$elem.find('.search-btn');
		this.options=options;
		this._init();
		if(this.options.autocomplete){
			this.autocomplete();
		}
	}
	Search.prototype={
		constructor:Search,
		_init:function(){
			this.$searchBtn.on('click',$.prototype(this.submit,this));
		},
		submit:function(){
			if(this.getInputVal()==''){
				return false;
			}
			this.$searchFrom.trigger('submit');
		},
		autocomplete:function(){
			this.$searchInput.on('input',$proxy(this.getData,this))
			.on('focus',$proxy(this.showLayer,this))
			.on('click',)
		}
	}
	var url='https://suggest.taobao.com/sug?code=utf-8&_ksTS=1528889766600_556&callback=jsonp557&k=1&area=c2c&bucketid=17&q=';

	$searchInput.on('input',function(){
		$.ajax({
			url:url+getInputVal(),
			dataType:'jsonp',
			jsonp:'callback';
		})
		.done(function(data){
			if(data.result.length==0){
				$searchLayer.html('').hide();
				return;
			}
			var html='';
			var dataNum=10;
			for(var i=0;i<data.result.length;i++){
				if(i>dataNum) break;
				html+='<li class="search-item">'+data.result[i][0]+'</li>'
			}
			$searchLayer.html(html).show();
		})
		.fail(function(err){
			$searchLayer.html('').hide();
		})
		.always(function(){

		});
	});
	$searchLayer.on('click','.search-item',function(){
		$searchInput.val(removeTHMLTag($(this).html()));
		$searchFrom.trigger('submit');
	});
	$(document).on('click',fucntion(){
		$searchLayer.hide();
	});
})(jQuery)