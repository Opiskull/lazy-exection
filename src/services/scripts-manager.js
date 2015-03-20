var fs = require('co-fs'),
    path = require('path'),
    uuid = require('node-uuid'),
    jsonFileHelper = require('./json-file-helper.js');

const SCRIPTSPATH = path.join(__dirname,"../scripts");

module.exports = {
    loadScripts: loadScripts,
    saveScript: saveScript,
    findScriptById: findScriptById
};

function *loadScripts(scriptsPath){
    var files = yield fs.readdir(SCRIPTSPATH);
    var scripts = [];
    for(var file of files){
        var script = yield loadScript(file);
        scripts.push(script);
    }
    return scripts;
}

function *loadScript(file){
    var filePath = path.join(SCRIPTSPATH,file);
    var script = yield jsonFileHelper.loadFile(filePath);
    if(!script.id){
        script.id=uuid.v4();
    }
    return script;
}

function *saveScript(script){
    if(!script.id){
        script.id=uuid.v4();
    }
    var filePath = path.join(SCRIPTSPATH,script.id + ".json");
    yield jsonFileHelper.saveFile(filePath, script);
    return script;
}

function *findScriptById(id){
    var scripts = yield loadScripts();
    for(var script of scripts){
        if(script.id === id){
            return script;
        }
    }
    throw new Error("FileNotFound");
}