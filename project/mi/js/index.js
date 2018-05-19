// 调用
gouwu();
headerList();
function gouwu(){
	// 获取元素
	var oCartLoader = document.querySelector('.cart-content .loader');
	var oCartContent = document.querySelector('.cart-content');
	var oEmptySpan = document.querySelector('.cart-box .empty-cart');
	var oLr=document.querySelector(".lr");
	var oNavr=document.querySelector(".navr");
	var oNavList=document.querySelector(".navList");
	var oLoder=document.querySelector(".loder");
	var oA=oNavr.getElementsByTagName('a')[0];
	var oI=oA.getElementsByTagName('i')[0];
	var oLoding=document.getElementById('lod');
	// 购物车部分
	oNavr.onmouseenter=function(){
		oNavr.style.backgroundColor='white';
		oA.style.color='#ff6700';
		oI.style.color='#ff6700';
		oLoder.style.display="block";
		oLoding.style.display="block";
		// oNavList.style.height='100'px;
		animation(oNavList,{height:300},false,function(){

		})
	}
	oNavr.onmouseleave=function(){
		oNavr.style.backgroundColor='';
		oA.style.color='';
		oI.style.color='';
		oLoder.style.display="";
		oLoding.style.display="";
	}
}
function headerList(){
	var oDaoA=document.querySelectorAll(".daohang a");
	var oDaoNavList=document.querySelector(".navList1");
	for(var i=0;i<oDaoA.length;i++){
		oDaoA.onmouseenter=function(){
			oDaoNavList.style.height="300px"
		}
	}
}