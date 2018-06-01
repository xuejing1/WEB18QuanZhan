
//require需求请求，通过require方法引入nodejs系统模块的http
//这个http本身是有内容的，node提供的一些模块
var http=require('http');
//http上有个createServer方法，接收一个函数
//该函数接收两个参数(第一个参数是req请求数据(require)，第二个参数是res返回对象(response))
//相当于创建了一个server实例
//根据请求的内容封装返回的内容
var server=http.createServer(function(req,res){
	//res上有个end方法，end返回，必须要有返回值
	res.end("nodejs");
	});
//server上面会有一个listen方法，接收三个参数
//第一个参数是端口 第二个是IP地址(机器自身地址,运行在哪个地址上) localhost也就是IP地址
//第三个是回调函数(前面两个启动就会调用这个函数)
server.listen(3000,'127.0.0.1',function(){
	//提示信息
	console.log("server is running at http://127.0.0.1:3000");
})