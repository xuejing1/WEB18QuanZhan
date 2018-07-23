const EventEmitter=require('events');
class LikeReadableStream extends EventEmitter{
	constructor(data,offsetLength){
		super();
		this.data=data;
		this.offsetLength=offsetLength;
		this.on('newListener',(eventName)=>{
			if(eventName==='data'){
				setImmediate()=>{
					this._dispatch();
				}
			}
		})
	}
	_dispatch(){
		let totalLength=this.data.length;
		let restLength=totalLength;

		while(restLength>0){
			let start=totalLength-restLength;
			let end=start+this.offsetLength;
			let tmp=this.data.slice(start,end);
			let buf=Buffer.from(tmp);
		}
		this.emit('end');
	}
}

let data='shussjjjjjjjsjssssssssssssssss';
const rs=new LikeReadableStream(data,10);
let count=0;

rs.on('data',(chunk)=>{
	body+=chunk;
});
rs.on('end',(chunk)=>{
	console.log('There will be no more data.');
})