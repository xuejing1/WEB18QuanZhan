
var http=require('http');
var server=http.createServer(function(req,res){
	//setHeader返回的类型(接收两个)
	//第一个参数键，第二个对应的值(类型)，第二个参数后面也可加上个哪种格式解码
	//text/html是html格式，text/plain纯文本格式
	res.setHeader("Content-Type","text/html;charset=UTF-8")
	//res上有个end方法，end返回，必须要有返回值
	//默认返回结果html执行
	res.end("<h1>nodejs</h1>恩恩");
	//通过改变statusCode来改变浏览器的返回状态
	res.statusCode=404;
});
server.listen(3000,'127.0.0.1',function(){
	console.log("server is running at http://127.0.0.1:3000");
})