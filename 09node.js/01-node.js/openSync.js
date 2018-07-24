const fs=require('fs');

let fd=fs.openSync('./en.txt','w',(err,fd)=>{

	if(!err){
		fs.write(fd,'aaa',(err)=>{
			if(!err){
				console.log('write file sucess.');

			}else{
				console.log('write file error.',err);
			}
		});

	}else{
		console.log('openfile error',err);
	}
});