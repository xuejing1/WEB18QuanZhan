var http=require('http');
var fs=require('fs');
var url=require('url');
var querystring=require('querystring');
var server=http.createServer(function(req,res){
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	var urlStr=req.url;
	if(urlStr=='/favicon.ico'){
		res.statusCode=404;
		res.end();
	}
	var prams=url.parse(urlStr,true).query;
	var callback=prams.callback;
	var obj='{"name":"TOM","age":18}';
	console.log(prams.callback);
	var resStr=callback+'('+obj+')';
	res.end(resStr);			
});
server.listen(3000,'127.0.0.1',function(){
	console.log("server is running at http://127.0.0.1:3000");
})