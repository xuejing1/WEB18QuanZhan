;(function($){
	function loadHtmlOnce($elem,callBack){
		//获取需要请求的地址
		var loadUrl=$elem.data('load');
		//如果页面上没有设置请求地址直接返回
		if(!loadUrl) return;
		var isLoaded=$elem.data('isLoaded');
		//如果已经加载过数据了直接返回
		if(isLoaded) return;		
		//如果有请求地址,发送请求获取数据
		$.getJSON(loadUrl,function(data){
			callBack($elem,data);
		});		
	}
	/*顶部下拉菜单begin*/
	var $menu=$('.nav-site .dropdown');
	
	$menu.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),buildMenuItem)
	});
	//构建菜单并加重
	function buildMenuItem($elem,data){
		var html='';
		for(var i=0;i<data.length;i++){
			html+='<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>';
		}
		//模拟网络延时
		setTimeout(function(){
			$elem.find('.dropdown-layer').html(html);
			$elem.data('isLoaded',true);
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
	/*分类导航begin*/
	var $category=$('.category .dropdown');
	$category.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),buildCategorItem);
	});
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
			$elem.find('.dropdown-layer').html(html);
			$elem.data('isLoaded',true);
		},1000);		
	}

	$category.dropdown({
		css3:false,
		js:true,
		mode:'slideLeftRight'
	});
	/*分类导航end*/
	/*中心轮播图begin*/
	var $focusCarousel=$('.focus .carousel-container');
	$focusCarousel.item={};
	$focusCarousel.totalItemNum=$focusCarousel.find('img').length;
	$focusCarousel.loadedItemNum=0;
	$focusCarousel.on('carousel-show',$focusCarousel.loadFn=function(ev,index,elem){
		if($focusCarousel.item[index]!='loaded'){
			$focusCarousel.trigger('carousel-loadedItem',[index,elem]);
		}
	});
	$focusCarousel.on('carousel-loadItem',function(ev,index,elem){
		var $img=$(elem).find('img');
		var imgUrl=$img.data('src');
		loadImage(imgUrl,function(url){
			$img.attr('src',url);
		},function(url){
			$img.attr('src','images/focus-carousel/placeholder.png');
		});
		$focusCarousel.item[index]='loaded';
		$focusCarousel.loadedItemNum++;
		if($focusCarousel.loadedItemNum==$focusCarousel.totalItemNum){
			$focusCarousel.trigger('carousel-loadedItems')
		}
	});
	$focusCarousel.on('carousel-loadedItems',function(){
		$focusCarousel.off('carousel-show',$focusCarousel.loadFn)
	});
	$focusCarousel.carousel({
		activeIndex:0,
		mode:'fade',
		interval:0
	})
	/*轮播图end*/
	/*轮番图2begin*/
	var $toadysCarousel=$('.todays container');
	$todaysCarousel.item={};
	$todaysCarousel.totalItemNum=$todaysCarousel.find('img').length;
	$todaysCarousel.loadedItemNum=0;
	$todaysCarousel.on('carousel-show',$todaysCarousel.loadFn=function(ev,index,elem){
		if($todaysCarousel.item[index]!='loaded'){
			$todaysCarousel.trigger('carousel-loadedItem',[index,elem]);
		}
	});
	$todaysCarousel.on('carousel-loadItem',function(ev,index,elem){
		var $imgs=$(elem).find('img');
		var imgUrl=$img.data('src');
		$imgs.each(function(){
			var $img=$(this);
			var imgUrl=$img.data('src');
			loadImage(imgUrl,function(url){
				$img.attr('src',url);
			},function(url){
				$img.attr('src','images/placeholder')
			});
			$todaysCarousel.item[index]='loaded';
			$todaysCarousel.loadedItemNum++;
			if($todaysCarousel.loadedItemNum==$todaysCarousel.totalItemNum){
				$todaysCarousel.trigger('carousel-loadedItems')
			}
		})
	});
	$todaysCarousel.on('carousel-loadedItems',function(){
		$focusCarousel.off('carousel-show',$todaysCarousel.loadFn)
	});
	$todaysCarousel.carousel({
		activeIndex:0,
		mode:'fade',
		interval:0
	})
	/*轮番图2end*/
})(jQuery);