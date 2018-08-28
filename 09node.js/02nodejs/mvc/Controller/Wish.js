const wish=require('../Model/Wish.js');
const swig=require('swig');
class Wish{
	index(req,res,...args){
		wish.get((err,data)=>{
			if(!err){
				let template=swig.compileFile(__dirname+'/../View/Wish/index.html');
				let html=template({
				   data:data
				});
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.end(html);	
			}else{
				console.log(err);
			}
		});	
	}
	del(req,res,...args){
		if(!err){
			let template=swig.compileFile(__dirname+'../View/Wish/index.html');
			let html=template({

			})
		}
	}
	add(req,res,...args){
		if(!err){
			let template=swig.compileFile(__dirname+"../View/Wish/index.html");
		}
	}
}

module.exports=new Wish();