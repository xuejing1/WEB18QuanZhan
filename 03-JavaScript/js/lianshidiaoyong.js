var timer=0;
//  不一样的东西用过参数传进来 
	/*obj代表是哪个对象
	  attr代表是哪个属性
	  target代表目标值
	  isLinear代表是否匀速
	  fn代表是一个函数 	*/
	// 函数作为参数
function animation(obj,attr,target,isLinear,endFn){
	if(isLinear==undefined){
		isLinear=true;
	}
	// 清除定时器
	clearInterval(obj.timer);
		var iSpeed=0;
		obj.timer=setInterval(function(){
			// 获取值
			var current=parseFloat(getComputedStyle(obj,false)[attr]);
			// 默认不终止动画
			var isStop=false;
			if(attr=='opacity'){
				current=Math.round(current*100)
			}
			// 判断是不是匀速
			// 默认匀速
			if(isLinear){
				if(current>target){
					iSpeed=-20;
				}else{
					iSpeed=20;
				}
				if(Math.abs(target-current)<Math.abs(iSpeed)){
					if(attr=='opacity'){
						obj.style[attr]=target/100;
					}else{
						obj.style[attr]=target+'px';
					}
					// 终止动画
					isStop=true;
				}
			//减速的处理				
			}else{
				iSpeed=(target-current)/10;
				iSpeed=iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				// 0是假 ！0是真
				// ！iSpeed的意思是当目标值和当前值一样时
				if(!iSpeed){
					isStop=true;
				}
			}
			// 终止动画关闭定时器
			if(isStop){
				clearInterval(obj.timer);
				if(typeof endFn=='function'){
					endFn();
				}
			// 还没有达到目标值，不终止动画，继续运动
			}else{
				if(attr=='opacity'){
					obj.style[attr]=(current+iSpeed)/100 ;
				}else{
					obj.style[attr]=current+iSpeed+'px';
				}
			}
		},30)
}