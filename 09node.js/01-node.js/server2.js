
const http=require('http');
const url=require('url');
const querystring=require('querystring');
const formidable=require('formidable');
const path=require('path');

const server=http.createServer((req,res)=>{

	if(req.method.toUpperCase()==='POST'){

		let form=new formidable.IncomingForm();
		form.upLoadDir='.upload';
		form.parse(req,function(err,fields,files){

			let 


		})

	}
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server runing at 127.0.0.1');
})