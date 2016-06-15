var Worker = require('webworker-threads').Worker;
class LongSpam{
	run(ws, data){
		var worker = new Worker('./lib/plugins/longSpamThread.js');
		worker.onmessage = function(event) {
			console.log(event);
		};
		worker.postMessage(data);
	}
}
module.exports = new LongSpam();