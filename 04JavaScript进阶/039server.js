// 注意跨域的时候需要两个域都打开然后才可以请求成功

var http=require('http');
var fs=require('fs');
var url=require('url');
var querystring=require('querystring');
var server=http.createServer(function(req,res){
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	// 协议、域名、端口号三者只要有一者不一样就构成跨域 ,跨域请求需要有个origin header
	// 允许哪个域进行跨域请求，*代表所有的域
	// res.setHeader("Access-Control-Allow-origin","*");
	res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:3000");
	var urlStr=req.url;
	console.log("req url:::",urlStr);
	//如果请求的是/favicon.ico直接返回
	if(urlStr=='/favicon.ico'){
		res.statusCode=404;
		res.end();
	}
	console.log(req.method);
	if(req.method=="POST"){//处理POST请求
		var body='';
		// req上有个on，on上面有个data事件为on的第一个参数，第二个参数chunk段，分成段
		req.on('data',function(chunk){
			body+=chunk;
		});
		// 数据完全获取之后
		req.on('end',function(){
			// 通常拿到参数后需要根据参数做相应的处理
			// 将字符串解析为对象
			console.log(body);
			//通常拿到参数后需要根据参数做相应的处理
			//todo......
			var bodyObj=querystring.parse(body);
			var strBody=JSON.stringify(bodyObj);
			res.statusCode=200;
			res.end(strBody);
		});

	}else{
		//如果请求中有参数,把参数返回给前端页面
		// search搜到为正值，搜不到为-1
		if(urlStr.search(/\?/)!=-1){
			var prams=url.parse(urlStr,true).query;
			//通常拿到参数后需要根据参数做相应的处理
			//todo......
			var parmsStr=JSON.stringify(prams);
			res.statusCode=200;
			res.end(parmsStr);		
		}
		//如果没有参数,打开文件读取并且返回
		var filePath="./"+urlStr;
		fs.readFile(filePath,function(err,data){
			if(err){
				console.log('read file error:::',err);
				res.statusCode=404;
				res.end('file not found');
			}else{
				res.statusCode=200;
				res.end(data);
			}
		})		
	}
});

server.listen(3001,'127.0.0.1',function(){
	console.log("server is running at http://127.0.0.1:3001");
})




















