class CommandHandle{
	constructor() {
		this.commandMap = new Array();
	}
	add(regex, commandFile){
		this.commandMap[regex]=commandFile;
	}
	execute(ws, commandObj){
		for(var k in this.commandMap){
			var regex = new RegExp(k,"i");
			console.log(k+" = "+commandObj.command);
			if (regex.test(commandObj.command)) {
				console.log(this.commandMap[k]);
				require("./lib/commands/"+this.commandMap[k]).exec(ws, commandObj.message);
			}
		}
	}
}
module.exports = new CommandHandle();