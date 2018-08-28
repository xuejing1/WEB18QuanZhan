(function($){
	function getRandom(min,max){	
		return Math.round(min+(max-min)*Math.random());
	}

	$wall=$('.wall');
	$wish=$('.wish');
	var wallWidth=parseInt($wall.css('width'));
	var wallHeight=parseInt($wall.css('height'));
	var wishWidth=parseInt($wish.css('width'));
	var wishHeight=parseInt($wish.css('height'));
	function handleWish($elem){
		$elem.pep({  constrainTo: '.wall' });
		$elem.each(function(){
			$(this).css({
				transform:'matrix(1, 0, 0, 1, '+getRandom(0,wallWidth-wishWidth)+','+getRandom(0,wallHeight-wishHeight) +')'
			});
		});
		$elem.hover(function(){
			$(this).css({
				zIndex:999
			})
		},function(){
			$(this).css({
				zIndex:0
			})
		});		
	}
	handleWish($wish);
	$wall.on('click','.close',function(){
		var $this=$(this);
		var self=this;
		$.ajax({
			url:'/del',
			data:'id='+$this.data('id'),
			dataType:'json'
		})
		.done(function(data){
			if(data.status==0){
				$(self.parentNode).remove();
			}
		})

	});
	$('.sub-btn').on('click',function(){
		let val=$('#content').val();
		$.ajax({
			url:'/add',
			data:{content:val},
			dataType:'json',
			type:'POST'
		})
		.done(function(data){
			console.log(data);
			if(data.status===0){
				var $dom=$(`<div class="wish" style="background: ${data.data.color}">
								<a href="javascript:;" class="close" data-id='${data.data.id}'></a>
									${data.data.content}
							   </div>`);
				$wall.append($dom);
				handleWish($dom);
				$('#content').val('');				
			}else{
				alert('许愿失败了');
			}
		})		
	});
})(jQuery);	
