
const wish=require('../Model/Wish.js');
const swig=require('swig');
class Wish(){

	index(req,res,...args){
		wish.get((err,data)=>{
			if(!err){
				let template=swig.compileFile(__dirname+'../View/Wish/index.html');
				res.setHeader('Content-Type,'text/html';charset=UTF-8');
				
			}
		});
	}

};
module.exports=new Wish();