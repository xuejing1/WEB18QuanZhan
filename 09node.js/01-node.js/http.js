const http=require('http');
// req可读流   res可写流
const server=http.createServer((req,res)=>{
	// res.setHeader("Content-Type","text/plain;charset=UTF-8");//文本
	res.setHeader("Content-Type","text/html;charset=UTF-8");//html页面
	res.write('<h1>你好</h1>');
	// res.write('hello word!');
	res.end();//返回
})
//监听
server.listen(3000,'127.0.0.1',()=>{
	console.log('server runing at 127.0.0.1');
})