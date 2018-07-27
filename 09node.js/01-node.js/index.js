(function($){

	function getRandom(min,max){
		return Math*round(min+(max-min)*Math.random());
	}
	$wish=$('.wish');
	$wall=$('.wall');
	$wish.pep({constrainTo:'.wall'});
	var wallWidth=parseInt($wall.css('width'));
	var wallHeight=parseInt($wall.css('height'));
	var wishWidth=parseInt($wish.css('width'));
	var wishHeight=parseInt($wish.css('height'));
	$wish.each(function(){
		$(this).css({
		transform:'matrix(1,0,0,1'+getRandom(0,wallWidth-wishWidth)+','+getRandom()
	});
	})
	$wish.hover(function(){
		$(this).css({
			z-index:99;
		}),
	},function(){
		$(this).css({
			z-index:0;
		})
	})
	$wall.on('click','.close',function(){
		var $this=$(this);
		$.ajax({
			url:'/del';
			data:'id='+this.data('id');

			dataType:'json'
		})
		.done(function(data){

		});
	})

})(jQuery)