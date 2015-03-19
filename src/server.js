var koa = require('koa'),
    json = require('koa-json'),
    router = require('koa-router');

var logger = require('./logger.js'),
    filesCtrl = require('./controller/files.js');

var app = koa();

app.use(json())
    .use(logger.koa())
    .use(router(app));

app.get("root","/",filesCtrl.list);

app.listen(3000);