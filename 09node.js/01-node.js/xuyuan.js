(function($){
	function getRandom(min,max) {	
		return Math.round(min+(max-min)*Math.random());
	}
	$wall=$('.wall');
	$wish=$('.wish');
	$wish.pep({constrainTo: '.wall'});
	var wallWidth=parseInt($wall.css('width'));
	var wallHeight=parseInt($wall.css('height'));
	var wishWidth=parseInt($wish.css('width'));
	var wishHeight=parseInt($wish.css('height'));
	$wish.each(function(){
		$(this).css({
			transform:'matrix(1,0,0,1,'+getRandom(0,wallWidth-wishWidth)+','+getRandom(0,wallHeight-wishHeight)+')';
		});
	});
	$wish.hover(function(){
		$(this).css({
			zIndex:999;
		})
	},function(){
		$(this).css({
			zIndex:0;
		})
	});
	$wall.on('click','.close',function(){
		var $this=$(this);
		$.ajax({
			url:'/del',
			data:'id='+$this.data('id'),
			dataType:'json'
		})
		.done(function(data){
			
		})
	});
	$('.sub-btn').on('click',function(){
		let val=$('#content').val();
		$.ajax({
			url:'/add',
			data:{content:val},
			dataType:'json',
			method:'POST'
		})
		.done(function(data){
			if(data.status===0){
				$(self.parseInt())
			}
		})
	});
})(jQuery);	
