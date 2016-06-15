onmessage = function(e) {
	if (/!([a-zA-Z0-9]+)/.test(e.data.data)) {
		var myregexp = /!([a-zA-Z0-9]+)/g;
		var command = myregexp.exec(e.data.data);
		postMessage({"message":e.data, "command":command[1]});
		//command = myregexp.exec(e.data);
	}
};