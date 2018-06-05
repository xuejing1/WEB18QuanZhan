
// kQuery的基本结构是一个闭包
// window是为了全局的变量
(function(window,undefined){
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
				return this;
			}else if(kQuery.isString(selector)){
				if(kQuery.isHTML(selector)){
					var tmpDom=document.createElement('div');
					[].push.apply(this,tmpDom.children);
					return this;
				}else{
					var doms=document.querySelectorAll(selector);
					[].push.apply(this,doms);
					return this;
				}
			}
		}
	}
	kQuery.fn.prototype=kQuery.fn;
	window.kQuery=window.$=kQuery;
})(window);