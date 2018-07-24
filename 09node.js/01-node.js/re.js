const fs=require('fs');
const filePath='file.json';

let add=(id,name)=>{
	fs.readFile('filePath',(err,data)=>{
		if(!err){
			let obj=JSON.parse(data);
			obj.push({
				id:id,
				name:name
			})
		}else{
			console.log('error',err);
		}
	});
	fs.writeFile('filePath','aaa',(err)=>{

		if(!err){
			callback(null,obj);
		}else{
			callback(err)
		}
	})
}

let get=(id,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if(!err){

			let obj=JSON.parse(data);
			let result={};
			// obj.forEach(val)=>{

			// 	console.log(val);
			// 	if(val['id']=id){
			// 		result=val;
			// 		return false;
			// 	}
			// }
		}
	})
}


let update=(id,name,callback)=>{
	fs.readFile(filePath,(err,data)=>{		
	if(!err){

		let obj=JSON.parse(data);
		obj.some((val)=>{
			if(val['id']==id){

				val['name']=name;
				return true;
			}
		})

		let str=JSON.stringify(obj);

		fs.writeFile(filePath,str,(err)=>{
			if(!err){

				callback(null,obj);
			}else{

				callback(err);
			}
		})
	}else{

		callback(err);
	}
	});
}


let remove=(id,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if(!err){

			let obj=JSON.parse(data);
			obj.some((val)=>{
				if(val['id']){

					return true;
				}
			})
			let str=JSON.stringify(obj);
			fs.writeFile(filePath,str,(err)=>{
				if(!err){
					callback(null,obj);
				}else{
					callback(err);
				}
			})
		}else{
			callback(err);
		}
	})
}