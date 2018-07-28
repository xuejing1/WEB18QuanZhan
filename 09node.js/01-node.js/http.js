

const http=require('http');
// req可读流  res可写流
const server=http.createServer((req,res)=>{

	let pathName=req.url;
	if(pathName==='/index.html'){
		fs.readFile('./index.html',(err,data)=>{
			if(!err){
				res.setHeader("Content-Type","text/html;charset=UTF-8");
				res.end(data);
			}else{
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.statusCode=404;
				res.end('<h1>出错了。。。</h1>');
			}
		});
	}else if(pathName)
})
//监听
server.listen(3000,'127.0.0.1',()=>{
	console.log('server runing at 127.0.0.1');
})