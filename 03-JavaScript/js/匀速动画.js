//动画函数里面的参数依次对应元素、属性、目标值
function animation(obj,attr,iTarget){
	// obj.timer是指在obj对象上添加了一个timer属性，用来代替var timer=null
	// 多个物体同时运动使用timer=null是不可取的，因为这样多个物体会使用同一个定时器产生困扰
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var iSpeed=0;
		// parseFloat将小数、整数字符转化为数字类型
		// parseInt转化为整数
		// getComputedStyle取出来的是字符，取传进来的obj的attr
		var curr=parseFloat(getComputedStyle(obj,false)[attr]);
		if(attr=='opacity'){
			// 转化成100，为了可以统一使用下面的速度
			curr=curr*100;
		}
		if(curr>iTarget){
			iSpeed=-10;
		}else{
			iSpeed=10;
		}
		if(Math.abs(iTarget-curr)<=Math.abs(iSpeed)){
			clearInterval(obj.timer);
			// 如果不够一个速度，直接达到目标值
			if(attr=='opacity'){
				obj.style[attr]=iTarget/100;
			}else{
				obj.style[attr]=iTarget+'px';	
			}
			
		}else{
			if(attr=='opacity'){
				obj.style[attr]=(curr+iSpeed)/100; 
			}else{
				obj.style[attr]=curr+iSpeed+'px';	
			}
		}
	},30)
}		
window.onload=function(){
	// 获取元素
	var oDiv1=document.getElementById('div1');
	var oDiv2=document.getElementById('div2');
	var oDiv3=document.getElementById('div3');
	oDiv1.onmouseover=function(){
		// 调用函数
		animation(this,'width',400);
	}
	oDiv1.onmouseout=function(){
		animation(this,'width',100);
	}
	oDiv2.onmouseover=function(){
		animation(this,'height',400);
	}
	oDiv2.onmouseout=function(){
		animation(this,'height',100);
	}
	oDiv3.onmouseover=function(){
		animation(this,'opacity',100);
	}
	oDiv3.onmouseout=function(){
		animation(this,'opacity',30);
	}							
}