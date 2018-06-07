
var http=require('http');
var fs=require('fs');
var url=require('url');
// 引入模块，从而解析成对象
var querystring=require('querystring');
var server=http.createServer(function(req,res){
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	// 协议、域名、端口号三者只要有一者不一样就构成跨域 
	res.setHeader("Access-Control-Allow-origin","http://127.0.0.1:3000");
	var urlStr=req.url;
	// 请求一次返回之后就不再走这一步
	if(urlStr=='/favicon.ico'){
		res.statusCode=404;
		res.end();
	}
	// req上有个method方法，(post请求数量比较大)
	console.log(req.method);
	// 判断是什么请求，不同请求对应的处理方法不一样
	if(req.method=="POST"){
		var body='';
		// req上有个on，on上面有个data事件为on的第一个参数，第二个参数chunk段，分成段
		req.on('data',function(chunk){
			body+=chunk;
		});
		// 数据完全获取之后
		req.on('end',function(){
			console.log(body);
			// 通常拿到参数后需要根据参数做相应的处理
			// 将字符串解析为对象
			var bodyObj=querystring.parse(body);
			var strBody=JSON.stringify(bodyObj);
			res.statusCode=200;
			res.end(strBody);
		});

	}else{
		// 如果请求中有参数,把参数返回给前端页面
		// search搜到为正值，搜不到为-1
		if(urlStr.search(/\?/)!=-1){
			var prams=url.parse(urlStr,true).query;
			//通常拿到参数后需要根据参数做相应的处理
			var parmsStr=JSON.stringify(prams);
			res.statusCode=200;
			res.end(parmsStr);		
		}
		// 如果没有参数,打开文件读取并且返回
		var filePath="./"+urlStr;
		fs.readFile(filePath,function(err,data){
			if(err){
				res.statusCode=404;
				res.end('file not found');
			}else{
				res.statusCode=200;
				res.end(data);
			}
		})		
	}
});

server.listen(3000,'127.0.0.1',function(){
	console.log("server is running at http://127.0.0.1:3000");
})