const ws=fs.createWriteStream('./en1.txt')

ws.on('open',()=>{

	console.log('open',open);
	console.log('close',close);
	console.log('finish',finish);

});
console.log(ws);
ws.write('aaa');
ws.end();
