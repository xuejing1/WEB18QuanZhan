

const {Writable}=require('stream');
// console.log(stream);
// console.log(writable);
// const writer=new Writable();
// writer.write(ss);

class MyWriter extends Writable(){
	constructor(){
		super();
	}

	_writer(chunk,encoding,callback){
		console.log(chunk,toString());
	}
};

const writer=new Writable();


// writer.on('finish'()=>{
// 	console.log('on');
// })
// writer.write('write','utf8',()=>{
// 	console('write');
// })
// writer.write('ss','utf8',()=>{
// 	console.log('ss');
// })


process.stdin.write()