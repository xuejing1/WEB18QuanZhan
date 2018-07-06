;(function($){
	function loadHtmlOnce($elem,callBack){
		var loadUrl=$elem.data('load');
		if(!loadUrl) return;
		var isLoaded=$elem.data('isLoaded');
		if(isLoaded) return;
		$.getJSON(loadUrl,function(data){
			callBack($elem,data)
		});
	}
	/*顶部下拉菜单begin*/
	var $menu=$('.top .dropdown');
	$menu.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),buildMenuItem)
		//模拟网络延时		
	});
	function buildMenuItem($elem,data){
		var html='';
		for(var i=0;i<data.length;i++){
			html+='<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>';
		}
		setTimeout(function(){
			$this.find('.dropdown-layer').html(html);
			$this.data('isLoaded',true);
		},1000);
	}
	$menu.dropdown({
		css3:false,
		js:true,
		mode:'slideUpDown'
	});
	/*顶部下拉菜单end*/
	/*搜索框begin*/
	var $search=$('.search');
	$search.search({
		autocomplete:true,
		getDataInterval:0
	});
	$search
	.on('getData',function(ev,data){
			var $this=$(this);
			var html=createSearchLayer(data,10);	
			$this.search('appendLayer',html);
			if(html){
				$this.search('showLayer');
			}else{
				$this.search('hideLayer');
			}
	})
	.on('getNoData',function(){
		$search.search('appendLayer','').search('hideLayer');
	})
	.on('click','.search-item',function(){
		$search.search('setInputVal',$(this).html());
		$search.search('submit');

	});
	function createSearchLayer(data,maxNum){
		if(data.result.length==0){
			return '';
		}		
		var html='';
		for(var i=0;i<data.result.length;i++){
			if(i>=maxNum) break;
			html+='<li class="search-item">'+data.result[i][0]+'</li>'
		}
		return html;
	}
	/*搜索框end*/	
	/*分类导航开始*/
	var $category=$('.category .dropdown');
	$category.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),buildMenuItem)
	});
	//如果有请求地址,发送请求获取数据
	function buildCategorItem($elem,data){
		var html='';
		for(var i=0;i<data.length;i++){
			html+='<dl class="category-details clearfix"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
			for(var j=0;j<data[i].items.length;j++){
				html+='<a href="#" class="link">'+data[i].items[j]+'</a>'
			}
			html+='</dd></dl>';
		}
		//模拟网络延时
		setTimeout(function(){
			$this.find('.dropdown-layer').html(html);
			$this.data('isLoaded',true);
		},1000);
	};
	$category.dropdown({
		css3:false,
		js:true,
		mode:'slideLeftRight'
	});
	// 主要内容导航end
	// 轮播图begin
	var $focusCarousel=$('.focus .carousel-container');
	var item={};
	var totalItemNum=0;
	var loadFn=null;
	$focusCarousel.on('carousel-show',function(ev,index,elem){
		if(item[index]!='loaded'{
			var img=$(elem).find('img');
			var imgUrl=$img.data('src');
			loadImage(imgUrl,function(url){
				$img.attr('src',url);
			},function(url){
				$img.attr('src','images/placeholder.png')
			}
		});
		
		var image=new Image();
		image.onload=function(){
			$img.attr('src',imgUrl);
		}
		image.src=imgUrl;
	})
	$focusCarousel.carousel({
		activeIndex:0,
		mode:'fade',
		interval:0
	});
	
})(jQuery);