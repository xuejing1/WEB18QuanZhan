
// kQuery的基本结构是一个闭包
// window是为了全局的变量
(function(window,undefined){
	// kQuery构造函数
	var kQuery=function(selector){
		return new kQuery.fn.init(selector);
	};
	kQuery.fn=kQuery.prototype={
		constructor:kQuery,
		init:function(selector){
			selector=kQuery.trim(selector);
			if(!selector){
				return this;
			}
			else if(typeof selector==='function'){
				document.addEventListener('DOMContentLoaded',function(){
					selector();
				});
				this[0]=document;
				this.length=1;
			}else if(kQuery.isString(selector)){
				if(kQuery.isHTML(selector)){
					var tmpDom=document.createElement('div');
					tmpDom.innerHTML=selector;
					[].push.apply(this,tmpDom.children);
				}else{
					var doms=document.querySelectorAll(selector);
					[].push.apply(this,doms);
					// return this;
				}
			}
			else if(kQuery.isArray(selector)){
				var tmpArr=[].slice.call(selector);
				[].push.apply(this,tmpArr);
			}else{
				this[0]=selector;
				this.length=1;
			}
			return this;
		},
		selector:'',
		length:0,
		jquery；"1.0.0",
		push:[].push,
		sort:[].sort,
		splice:[].splice,
		toArray:function(){
			return [].slice.call(this);
		},
		get:function(num){
			if(arguments.length==1){
				if(num>=0){
					return this[num];
				}else{
					return this[this.length+num];
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
			return this.eq(-1);
		},
		map:function(fn){
			return kQuery(kQuery.map(this,fn))
		}
	}
	kQuery.extend=kQuery.fn.extend=function(obj){
	for(key in obj){
		this[key]=obj[key];
	}
}
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
			return str.replace(/^\s+|\s+$/g,'');
		}else{
			return str;
		}
	},
	each:function(arr,fn){
		if(kQuery.isArray(arr)){
			for(var i=0;i<arr.length;i++){
				var res=fn.call(arr[i],i,arr[i]);
				if(res==false){
					break;
				}else if(res==true){
					continue;
				}
			}
		}else{
			for(key in arr){
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
	}
});
kQuery.fn.extend({
	html:function(content){
		if(content){
			this.each(function(){
				this.innerHTML=content
			})
			return this
		}else{
			return this[0].innerHTML;
		}
	},
	text:function(content){
		if(content){
			this.each(function(){
				this.innerText=content;
			});
			return this;
		}else{
			var str='';
			this.each(function(){
				str+=this.innerText;
			});
			return str;
		}
	},
	attr:function(arg1,arg2){
		if(kQuery.isObject(arg1)){
			this.each(function(){
				var dom=this;
				kQuery.each(arg1,function(attr,val){
					dom.setAttribute(attr,val);
				})
			})
			}else{
				if(arguments.length==1){
					return this[0].getAttribute(arg1);
				}else if(arguments.length==2){
					this.each(function(){
						this.setAttribute(arg1,arg2);
					});
				}
			}
			return this;
		},
		removeAttr:function(attr){
			if(attr){
				this.each(function(){
					this.removeAttribute(attr);
				})
			}
			return this;
		},
		val:function(val){
			if(val){
				this.each(function(){
					this.value=val;
				});
				return this;
			}else{
				return this[0].value;
			}
		},
		css:function(arg1,arg2){
			if(kQuery.isString(arg1)){
				if(arguments.length==1){
					if(this[0].currentStyle){
						return this[0].currentStyle[arg1];
					}else{
						return getComputedStyle(this[0],false)[arg1];
					}
				}else if(arguments.length==2){
					this.each(function(){
						this.style[arg1]=arg2;
					});
				}

			}else if(kQuery.isObject(arg1)){
				this.each(function(){
					for(key in arg1){
						this.style[key]=arg1[key];
					}
				});
			}
			return this;
		},
		hasClass:function(str){
			var res=false;
			var reg=eval('/\\b'+str+'\\b/');
			if(str){
				this.each(function(){
					console.log(this.className);
					if(reg+)
				})
			}
		}
	})
	kQuery.fn.prototype=kQuery.fn;
	window.kQuery=window.$=kQuery;
})(window);