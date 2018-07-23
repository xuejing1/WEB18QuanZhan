const {Readable}=require('stream');

class MyReadStream extends Readable(){
	super();

}

_read(){
	this.index++;
	if(this.index>5){
		this.push(null);
	}else{
		let str="+this.index";
		let buf=Buff.from(str);
		this.push(buf);
	}
}