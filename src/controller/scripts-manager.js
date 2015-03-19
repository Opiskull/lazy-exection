var fs = require('co-fs'),
    path = require('path'),
    uuid = require('node-uuid');

const SCRIPTSPATH = path.join(__dirname,"../scripts");

module.exports = {
    loadScripts: loadScripts
};

function *loadScripts(){
    return yield loadScriptsFromFolder(SCRIPTSPATH);
}

function *loadScriptsFromFolder(scriptsPath){
    var files = yield fs.readdir(scriptsPath);
    var scripts = [];
    for(var file of files){
        var filePath = path.join(scriptsPath,file);
        var script = yield loadScript(filePath);
        scripts.push(script);
    }
    return scripts;
}

function *loadScript(filePath){
    var content = yield fs.readFile(filePath,{ encoding: 'utf8'});
    var script = JSON.parse(content);
    script.filename = path.basename(filePath);
    if(!script.id){
        script.id=uuid.v4();
    }
    return script;
}

function *saveScript(script){
    var content = JSON.stringify(script);
    yield fs.writeFile(script.filename,content);
    return script;
}