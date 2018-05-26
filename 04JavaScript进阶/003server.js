
var http=require('http');
// 将文件引入到环境当中
var fs=require('fs');

var server=http.createServer(function(req,res){
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	// url请求的地址，通过req获取到请求的地址
	console.log(req.url);
	// 定义一个变量为文件的位置
	var filePath="./"+req.url;
	// readFile读取文件，是个异步操作，接收两个参数
	// 第一个参数是读取的文件的路径，第二个参数是一个函数(这个函数接收两个参数)
	// 这个函数第一个参数是err(将异常信息存到err当中) 第二个参数是data，就是获取的数据
	fs.readFile(filePath,function(err,data){
		// 做相应的处理，出现异常的处理，没有异常的处理
		if(err){
			console.log('read file error:::',err);
			res.statusCode=404;
			res.end('file not found');
		}else{
			res.statusCode=200;
			res.end(data);
		}
	})

});
server.listen(3000,'127.0.0.1',function(){
	console.log("server is running at http://127.0.0.1:3000");
})