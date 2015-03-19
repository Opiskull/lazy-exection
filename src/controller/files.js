

var scriptsManager = require('./scripts-manager.js'),
    commandExecutor = require('./command-executor.js');

var controller = {
    list: list
};

function *list(){
    var start = new Date;
    var scripts = yield scriptsManager.loadScripts();
    var afterScript = new Date;
    var ms = start - afterScript;
    console.log("afterloadScripts"+ ms);
    var output = yield commandExecutor.executeScript(scripts[0]);
    var afterCommand = new Date;
    ms = afterScript - afterCommand;
    console.log("afterCommand"+ ms);
    this.body = {
        result: JSON.parse(output)
    }
}

module.exports = controller;

