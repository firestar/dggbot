var http = require('http');
class OverRustleTopList{
	exec(ws, msg){
		var callback = function(response) {
			var str = '';
			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				var data = JSON.parse(str);
				var total = 3;
				for(var i in data.streams){
					ws.send('MSG {"data":"'+data.streams[i]+" overrustle.com"+i+'"}')
					total--;
					if(total==0){
						break;
					}
				}
			});
		}
		http.request({host:"api.overrustle.com","path":"/api"}, callback).end();
	}
}
module.exports = new OverRustleTopList();