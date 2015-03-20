var util = require('util');

var logger = {
    info:info,
    error:error
};

function applyParameters(parameters){
    var message = util.format.apply(util,parameters);
    return message;
}

function info(){
    var message = applyParameters(arguments);
    console.info(message);
}

function error(){
    var message = applyParameters(arguments);
    console.error(message);
}

function log(){
    var message = applyParameters(arguments);
    console.log(message);
}

module.exports = logger;