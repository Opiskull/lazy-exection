var exec = require('co-exec'),
    parameterManager = require('./parameter-manager.js');

module.exports = {
    executeCommand: executeCommand,
    executeScript: executeScript,
    executePowerShell: executePowerShell
};

function *executeCommand(command){
    var result = yield exec(command);
    return yield exec(command);
}

function *executePowerShell(command){
    //https://technet.microsoft.com/en-us/library/hh849922.aspx
    var fullCommand = 'powershell.exe "'+command+' | ConvertTo-Json"';
    var result = yield exec(fullCommand);
    return JSON.parse(result);
}

function *executeScript(script){
    var command = script.command;
    if(Array.isArray(script.parameters)){
        command = parameterManager.replaceParametersInCommand(script.command,script.parameters);
    }
    if(script.type === 'ps'){
        return yield executePowerShell(command);
    }
    return yield executeCommand(command);
}