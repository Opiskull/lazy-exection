module.exports = {
    replaceParametersInCommand: replaceParametersInCommand,
    getParameterName: getParameterName
};

function replaceParametersInCommand(command,parameters){
    var completeCommand = command;
    for(var parameter of parameters){
        var parameterName = getParameterName(parameter.name);
        completeCommand = completeCommand.replace(parameterName,parameter.value);
    }
    return completeCommand;
}

function getParameterName(name){
    return "{{"+name+"}}";
}