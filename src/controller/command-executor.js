var exec = require('co-exec'),
    parameterManager = require('./parameter-manager.js');

module.exports = {
    executeCommand: executeCommand,
    executeScript: executeScript
};

function *executeCommand(command){
    var fullCommand = 'powershell.exe "'+command+' | ConvertTo-Json"'
    console.log(fullCommand);
    return yield exec(fullCommand);
}

function *executeScript(script){
    var command = parameterManager.replaceParametersInCommand(script.command,script.parameters);
    return yield executeCommand(command);
}

//https://technet.microsoft.com/en-us/library/hh849922.aspx
