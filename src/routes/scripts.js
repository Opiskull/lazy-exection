var scriptsManager = require('../services/scripts-manager.js'),
    commandExecutor = require('../services/command-executor.js');

var controller = {
    list: list,
    getItem: getItem,
    executeItem: executeItem,
    saveScript:saveScript
};

function *list(){
    var scripts = yield scriptsManager.loadScripts();
    this.body = scripts;
}

function *getItem(){
    this.body = this.script;
}

function *executeItem(){
    var result = yield commandExecutor.executeScript(this.script);
    this.body = {
        result: result
    }
}

function *loadScript(next){
    this.script = yield scriptsManager.findScriptById(this.params.id);
    yield next;
}

function *saveScript(){
    var script = yield scriptsManager.saveScript(this.request.body);
    this.body = script;
}

module.exports = function(app){
    app.get('scripts',"/scripts", controller.list);
    app.get('/scripts/:id',loadScript,controller.getItem);
    app.get('/scripts/:id/execute',loadScript,controller.executeItem);
    app.post('/scripts',controller.saveScript);
};

