var util = require('util');

var logger = {
    info:info,
    error:error,
    koa: register
};

function register(){
    return function *(next){
        var start = new Date;
        yield next;
        var ms = new Date - start;
        logger.info('%s %s - %s ms', this.method, this.url, ms);
    }
}

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