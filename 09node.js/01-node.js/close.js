const fs=require('fs');

let buf=Buffer.alloc(100);

fs.open('./en.txt','r',(err,fd)=>{
	if(!err){

		let buf=Buffer.alloc(100);
		fs.read(fd,,buf,0,100,0,(err)=>{
			if(!arr){
				fs.close(fd,(err)=>{
					if(!err){
						console.log('close file success.');
					}else{
						console.log('close file error',err);
					}
				});

			}else{
				console.log('read file error',err);
			}
		});

	}else{
		console.log('read error',err);
	}
})