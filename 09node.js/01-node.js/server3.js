
const http=require('http');
const url=require('url');
const querystring=require('querystring');

const path=require('path');
const fs=require('fs');
// const mine=require('mine');

const server=http.createServer((req,res)=>{

	let fileName=req.url;

	if(fileName.lastIndexOf('.')==-1){
		fileName=fileName+'/server.html';
	}
	let filePath=path.normalize(__dirname+'/static/'+fileName);

	fs.readFile(filePath,(err,data)=>{
		if(!err){
			res.setHeader('Content-Type','text/html;charset=UTF-8');
			res.end(data);
		}else{
			res.setHeader('Content-Type','text/html;charset=UTF-8');
			res.statusCode=404;
			res.end('<h1>页面走丢。。。。。。</h1>');
		}
	});

	// res.end('ok');
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server runing at 127.0.0.1');
});