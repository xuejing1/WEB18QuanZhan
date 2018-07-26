
const http=require('http');
const url=require('url');
const querystring=require('querystring');
const formidable=require('formidable');
const path=require('path');

const server=http.createServer((req,res)=>{

	if(req.method.toUpperCase()==='POST'){

		let form=new formidable.IncomingForm();
		form.upLoadDir='.upload';
		form.parse(req,(err,fields,files)=>{

			res.writeHead(200,{'Content-Type':'text/plain'});
			res.write('recrived upload:\n\n');
			res.end(util.inspect({fields:fields,files:files}));
			
		});

	}
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server runing at 127.0.0.1');
})