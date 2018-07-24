const fs=require('fs');

// let data=fs.readFileSync('./en.txt');
// fs.readFileSync('./en.txt','aaa',{file:'a'});

// let data=fs.readFileSync('en.txt');

fs.readFileSync('./en.txt','hello\h',{flag:'a'},(err)=>{
	if(!err){
		console.log('success');
	}else{
		console.log('error',err);
	}
})
