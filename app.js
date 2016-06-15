var WebSocket = require('ws');
const EventClass = require('events');
var Worker = require('webworker-threads').Worker;
var async = require("async");
var CommandHandle = require('./command.js');
const Events = new EventClass();
var ws = new WebSocket('ws://www.destiny.gg:9998/ws', {
  origin: 'www.destiny.gg',
  headers: {
    cookie: 'authtoken=token'
  }
});
ws.on('open', function open() {
	console.log('connected');
});
const registeredEvents = [ "MSG", "JOIN", "QUIT", "NAMES" ];
const registeredChatChecks = [ "longSpam" ];
ws.on('message', function message(data, flags) {
	for(i in registeredEvents){
		if(data.startsWith(registeredEvents[i])){
			Events.emit(registeredEvents[i], JSON.parse(data.substring(registeredEvents[i].length+1, data.length)));
			break;
		}
	}
});
CommandHandle.add("strim", "overrustleStrimTopList.js");
//CommandHandle.execute({"message":{"nick":"boo","data":"!strims"},"command":"strims"});
Events.on('MSG', (e)=>{
	//if(e.nick=="Firestarthe"){ // commands
		var worker = new Worker('./lib/CommandRouting.js');
		worker.onmessage = function(event) {
			if(event.data.command!=""){
				CommandHandle.execute(ws, event.data);
			}
		};
		worker.postMessage(e);
	//}
	for(i in registeredChatChecks){
		var plugin = require("./lib/plugins/"+registeredChatChecks[i]+".js");
		plugin.run(ws, e.data);
	}
})