// 传参
/*
obj    对象
attr   属性
target 目标值
*/
function anmation(obj,attr,target){
	// 任何需要定时器的函数，在一开始之前就需要清除定时器
	clearInterval(obj.timer);
	// 将定时器绑定在每一个对象上，让他们互不干扰
	obj.timer=setInterval(function(){
		var iSpeed=0;
		var current=Math.round(parseFloat(getComputedStyle(obj,false)[attr]));
		if(attr=='opacity'){
			current=current*100;
		}
		if(current>target){
			iSpeed=-20;
		}else{
			iSpeed=20;
		}
		if(Math.abs(target-current)<Math.abs(iSpeed)){
			if(attr=='opacity'){
				obj.style.opacity=1;
			}else{
				obj.style[attr]=target+'px';
			}
			clearInterval(obj.timer);	
		}else{
			if(attr=='opacity'){
				obj.style.opacity=(current+iSpeed)/100;
			}else{
				obj.style[attr]=current+iSpeed+'px';
			}
		}
	},30);
}


function getScrollTop(){
	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}
function getScrollLeft(){
	return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
}