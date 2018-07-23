const eventEmitter=require('events');

class likeReadableStream extends eventEmitter{
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
			
		}
	}

}