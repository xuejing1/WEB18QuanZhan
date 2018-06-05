var http=require('http');
var fs=require('fs');
var url=require('url');

var server=http.createServer(function(req,res){
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	// 先将传进来的url给存起来
	var urlStr=req.url;
	//如果请求的是/favicon.ico直接返回，把它给屏蔽掉
	// favicon.ico是指标题中的小图标
	if(urlStr=='/favicon.ico'){
		res.statusCode=404;
		res.end();
	}
	//判断请求中有没有参数，如果请求中有参数(有问号即代表有参数),把参数返回给前端页面
	// search查询
	if(urlStr.search(/\?/)!=-1){
		// 目的：获取传进来的参数
		// parse是专门解析url的，返回的是一个对象(对象上面有个query属性(传进来的参数))
		// 返回的对象的第一个参数url的字符串，第二个参数true将query上的采纳数解析成对象
		var prams=url.parse(urlStr,true).query;
		//拿到参数后需要转换为字符串，网络上的传输只能是字符串
		var parmsStr=JSON.stringify(prams);
		res.statusCode=200;
		res.end(parmsStr);		
	}
	//如果没有参数,打开文件读取并且返回
	var filePath="./"+urlStr;
	fs.readFile(filePath,function(err,data){
		if(err){
			console.log('read file error:',err);
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