//kQuery的基本结构是一个闭包
(function(window, undefined){
var 
	//kQuery的构造函数
	kQuery=function(selector){
		return new kQuery.fn.init(selector);
	};
//kQuery的原型对象
kQuery.fn=kQuery.prototype={
	constructor:kQuery,
	//核心函数
	init:function(selector){
		selector=kQuery.trim(selector);
		//布尔值是假的情况返回空的jquery对象
		if(!selector){
			return this;
		}
		//如是函数的话返回有document的jquery对象,当页面所有的DOM节点加载完毕后执行传入的函数
		else if(kQuery.isFunction(selector)){
			document.addEventListener('DOMContentLoaded',function(){
				selector();
			});
			this[0]=document;
			this.length=1;
		//处理字符串	
		}else if(kQuery.isString(selector)){
			//HTML代码处理
			if(kQuery.isHTML(selector)){
				var tmpDom=document.createElement('div');
				tmpDom.innerHTML=selector;
				// console.log(tmpDom.children);
				/*
				for(var i=0;i<tmpDom.children.length;i++){
					this[i]=tmpDom.children[i];
				}
				this.length=tmpDom.children.length;
				*/
				[].push.apply(this,tmpDom.children);
			//选择器处理	
			}else{
				var doms=document.querySelectorAll(selector);
				// console.log(doms);
				/*
				for(var i=0;i<doms.length;i++){
					this[i]=doms[i];
				}
				this.length=doms.length;
				*/
				[].push.apply(this,doms);
			}	
		}
		else if(kQuery.isArray(selector)){
			//由于apply转伪数组有兼容问题(IE8以下不兼容),所以把所有传入的数组转换成真数组
			var tmpArr=[].slice.call(selector);
			
			//把转换后的真数组转换成伪数组
			[].push.apply(this,tmpArr);
		}else{
			this[0]=selector;
			this.length=1;
		}
		return this;
	},
	selector: "",
	length: 0,
	jquery:'1.0.0',
	//以下方法在调用时是kquery对象调用,所以方法内部的this指向调用的kquery对象
	push: [].push,
	sort: [].sort,
	splice: [].splice,
	toArray:function(){
		return [].slice.call(this);
	},
	get:function(num){
		if(arguments.length==1){
			//正数
			if(num>=0){
				return this[num];
			//负数	
			}else{
				// -1 4=3
				// -2 4=2
				return this[this.length+num]
			}
		}else{
			return this.toArray();
		}
	},
	eq:function(num){
		if(arguments.length==1){
			return kQuery(this.get(num));
		}else{
			return new kQuery();
		}
	},
	first:function(){
		return this.eq(0);
	},
	last:function(){
		return this.eq(-1);
	},
	each:function(fn){
		return kQuery.each(this,fn);
	},
	map:function(fn){
		return kQuery(kQuery.map(this,fn));
	}	
}

kQuery.extend=kQuery.fn.extend=function(obj){
	for(key in obj){
		this[key]=obj[key];
		//kQuery['isFunction']=function(str){
		// 	return typeof str==='function';
		// },
	}
}

//kQuery的静态方法
kQuery.extend({
	isFunction:function(str){
		return typeof str==='function';
	},
	isString:function(str){
		return typeof str==='string';
	},
	isHTML:function(str){
		return str.charAt(0)=='<'&&str.charAt(str.length-1)=='>'&&str.length>=3;
	},
	isArray:function(str){
		return kQuery.isObject(str)&&length in str 
	},
	isObject:function(str){
		return typeof str==='object';
	},
	trim:function(str){
		if(kQuery.isString(str)){
			//用正则去掉字符串的前后空格
			return str.replace(/^\s+|\s+$/g,'');
		}else{
			return str;
		}	
	},
	each:function(arr,fn){
		if(kQuery.isArray(arr)){
			for(var i=0;i<arr.length;i++){
				// console.log(i,arr[i]);
				var res=fn.call(arr[i],i,arr[i]);
				if(res==false){
					break;
				}else if(res==true){
					continue;
				}
			}
		}else{
			for(key in arr){
				// console.log(key,arr[key]);
				var res=fn.call(arr[key],key,arr[key]);
				if(res==false){
					break;
				}else if(res==true){
					continue;
				}				
			}
		}
		return arr;
	},
	map:function(arr,fn){
		var retArr=[];
		if(kQuery.isArray(arr)){
			for(var i=0;i<arr.length;i++){
				var res=fn(arr[i],i);
				if(res){
					retArr.push(res);
				}
			}
		}else{
			for(key in arr){
				var res=fn(arr[key],key);
				if(res){
					retArr.push(res);
				}
			}
		}
		return retArr;
	},
	toWords:function(str){
		return str.match(/\b\w+\b/g);
	},
	addEvent:function(dom,eventName,fn){
		if(dom.addEventListener){
			dom.addEventListener(eventName,fn);
		}else{
			dom.attachEvent('on'+eventName,fn);
		}
	}
});

//kquery对象上的属性相关的操作方法
// 相当于函数extend的调用，此时的this指的是kQuery.fn
kQuery.fn.extend({
	// 可以有参数也可以没有参数
	html:function(content){
		// 有参数的处理
		if(content){
			//设置所有DOM原始的innerHTML
			this.each(function(){
				// 此处this为一个一个的DOM节点
				this.innerHTML=content;
			})
			// this指kQuery对象
			return this;
		//没参数的处理 
		}else{
			return this[0].innerHTML;
		}
	},
	text:function(content){
		// 有参数处理
		if(content){
			this.each(function(){
				this.innerText=content;
			});
			return this;
		// 没参数处理
		}else{
			// 文本值需要拼起来，先保存一个变量
			var str='';
			this.each(function(){
				// 此时的this指DOM节点，只有DOM节点才会有原生的innerHTML和innerText
				str+=this.innerText;
			});
			return str;
		}
	},
	// 两个参数
	// 第一个参数：存在不存在或者是对象不是对象
	attr:function(arg1,arg2){
		// 判断是不是对象
		if(kQuery.isObject(arg1)){
			//是对象的情况
			//设置所有的DOM属性值为对象中的所有值
			this.each(function(){
				// 把遍历的每一个DOM节点存下来
				var dom=this;
				// attr属性的名称，val属性的值
				kQuery.each(arg1,function(attr,val){
					dom.setAttribute(attr,val);
				})
			})

		}else{
			//传递一个参数(获取)
			if(arguments.length==1){
				//获取第一个DOM节点的属性值
				return this[0].getAttribute(arg1);
			//传递两个参数(设置)
			}else if(arguments.length==2){
				//设置所有DOM的属性值
				this.each(function(){
					// 调用DOM节点上的setAttribute函数
					this.setAttribute(arg1,arg2);
				});
			}
		}
		return this;
	},
	removeAttr:function(attr){
		// 传参数
		if(attr){
			this.each(function(){
				// 此时的this是DOM节点
				this.removeAttribute(attr);
			})
		}
		// 返回自身(移除之后或者什么都不传)
		return this;
	},
	// 可以接收参数也可以不接收
	val:function(val){
		if(val){
			this.each(function(){
				// 此时this为DOM节点
				this.value=val;
			});
			return this;
		}else{
			return this[0].value;
		}
	},
	// 传递两个参数
	// 第一个参数是不是字符串还是对象
	// 第二个参数是值
	css:function(arg1,arg2){
		// 是字符串时的处理
		if(kQuery.isString(arg1)){
			// 一个参数
			if(arguments.length==1){
				//获取第一个元素对应的样式值
				//兼容浏览器处理
				// 判断你有没有currentStyle属性，有的话就在IE9以下的浏览器
				if(this[0].currentStyle){
					return this[0].currentStyle[arg1];
				}else{
					// getComputedStyle存在兼容性问题
					//获取第一个元素对应的样式值
					return getComputedStyle(this[0],false)[arg1];
				}
			// 两个参数
			}else if(arguments.length==2){
				// 循环遍历
				this.each(function(){
					this.style[arg1]=arg2;
				});
			}
		// 是对象的处理
		}else if(kQuery.isObject(arg1)){
			this.each(function(){
				// 循环遍历
				for(key in arg1){
					this.style[key]=arg1[key];
				}
			});
		}
		return this;
	},
	// 传一个参数
	hasClass:function(str){
		// 要返回布尔值，先定义一个初始默认的变量
		var res=false;
		// 有参数的处理
		if(str){
			//判断是否存在指定class的正则
			// eval将字符串转换成JavaScript代码(eval存在一些安全性问题)，两个\\是因为转义了一下
			var reg=eval('/\\b'+str+'\\b/');
			this.each(function(){
				//判断传入的参数是否存在在DOM节点的className上
				if(reg.test(this.className)){
					res=true;
					// 返回布尔值
					return false;
				}
			})
		}
		return res;
	},
	// 传进来一个参数
	addClass:function(str){
		//把传入的参数转换为数组
		// var reg=/\b\w+\b/g;\b单词分界线
		// console.log(str.match(reg));
		var names=kQuery.toWords(str);
		this.each(function(){
			// 里面的this为DOM节点
			//如果有参数对应的class不添加,如果没有就添加
			//DOM节点转kquery对象，因为只有转换成对象才可以调用hasClass(因为hasClass这个方法属于对象)
			var $this=kQuery(this);
			for(var i=0;i<names.length;i++){
				// 没有class的情况下的处理
				if(!$this.hasClass(names[i])){
					this.className=this.className+' '+names[i];
				}			
			}

		})
		return this;
	},
	removeClass:function(str){
		if(str){
			//把传入的参数转换为数组
			var names=kQuery.toWords(str);
			this.each(function(){
				//如果有就删除
				var $this=kQuery(this);
				for(var i=0;i<names.length;i++){
					if($this.hasClass(names[i])){//DOM节点上有class
						//删除
						var reg = eval('/\\b'+names[i]+'\\b/');
						// console.log('把'+this.className+"上的"+names[i]+"删除掉");
						this.className=this.className.replace(reg,'');
					}
				}
			});			
		}else{
			this.each(function(){
				this.className='';
			})
		}
		return this;
	},
	toggleClass:function(str){
		if(str){
			var names=kQuery.toWords(str);
			this.each(function(){
				var $this=kQuery(this);
				for(var i=0;i<names.length;i++){
					if($this.hasClass(names[i])){
						//有对应的class删除
						$this.removeClass(names[i]);
					}else{
						//没有对应的class添加
						$this.addClass(names[i]);
					}
				}
			});
		}else{
			this.each(function(){
				this.className='';
			});
		}
		return this;
	}
});

//kquery对象上的DOM操作相关方法
kQuery.fn.extend({
	empty:function(){
		this.each(function(){
			this.innerHTML='';
		});
		return this;
	},
	remove:function(selector){
		if(selector){
			//获取选择器选中的所有DOM节点
			var doms=document.querySelectorAll(selector);
			this.each(function(){
				for(var i=0;i<doms.length;i++){
					if(doms[i]==this){
						//删除
						var parentNode=this.parentNode;
						parentNode.removeChild(this);
					}
				}
			});
		}else{//没有传参
			this.each(function(){
				//parentNode.removeChild(sonNode)
				var parentNode=this.parentNode;
				parentNode.removeChild(this);
			});
		}
		return this;
	},
	append:function(source){
		if(source){
			//kquery对象,DOM节点,HTML代码片段
			//source -> this
			var $source=kQuery(source);
			this.each(function(index,value){
				// this.appendChild($source);
				var parentNode=this;
				if(index==0){//第一个DOM元素直接插入
					$source.each(function(){
						parentNode.appendChild(this);
					})
				}else{//第一个DOM元素复制一份再插入
					$source.each(function(){
						//复制一份
						var dom=this.cloneNode(true);
						parentNode.appendChild(dom);
						// parentNode.appendChild(this);
					})					
				}
			})
		}
		return this;
	},
	prepend:function(source){
		if(source){
			//kquery对象,DOM节点,HTML代码片段
			//source -> this
			var $source=kQuery(source);
			this.each(function(index,value){
				// this.appendChild($source);
				var parentNode=this;
				if(index==0){//第一个DOM元素直接插入
					$source.each(function(){
						// parentNode.appendChild(this);
						//firstChild
						//firstElementChild
						parentNode.insertBefore(this,parentNode.firstChild);
					})
				}else{//第一个DOM元素复制一份再插入
					$source.each(function(){
						//复制一份
						var dom=this.cloneNode(true);
						// parentNode.appendChild(dom);
						parentNode.insertBefore(dom,parentNode.firstChild);
					})					
				}
			})
		}
		return this;
	}	
});

//kquery对象上事件相关的方法
kQuery.fn.extend({
	on:function(eventName,fn){
		this.each(function(){
			if(!this.bucketEvent){
				this.bucketEvent={};
			}
			if(!this.bucketEvent[eventName]){
				this.bucketEvent[eventName]=[];
				this.bucketEvent.push(fn);
				kQuery.addEvent(this,eventName,function(){
					kQuery.each(this.bucketEvent[eventName],function(){
						
					})
				})
			}else{
				this.bucketEvent.push(fn);
			}
		})	
	},
	off:function(eventName,fnName){
		if(arguments==0){
			this.each(function(){
				this.bucketEvent={};
			})
		}else if(arguments==1){
			this.each(function(){
				if(this.bucketEvent){
					this.bucketEvent[eventName]=[];
				}
			})
		}else if(arguments==2){
			this.each(function(){
				if(this.bucketEvent&&this.bucketEvent[eventName]){
					kQuery(this.bucketEvent[eventName],function(index,fn){
						if(this==fnName){
							this.bucketEvent[eventName].splice(index,1);
						}
					})
				}
			})
		}
	},
	clone:function(bocpy){
		var arr=[];
		this.each(function(){
			if(bocpy&&this.bucketEvent){
				var dom=this.cloneNode(true);
				// 第一个参数事件名，第二个参数是数组
				kQuery.each(this.bucketEvent,function(eventName,fnArr){
					kQuery.each(fnArr,function(){
						kQuery(dom).on(eventName,this);
					})
				});
				arr.push(dom)
			}else{
				var dom=this.cloneNode(true);
				arr.push(dom)
			}
		})
		return kQuery(arr);
	}
});
kQuery.fn.init.prototype=kQuery.fn;
window.kQuery=window.$=kQuery;
})(window);