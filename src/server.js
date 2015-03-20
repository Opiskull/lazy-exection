var koa = require('koa'),
    json = require('koa-json'),
    router = require('koa-router'),
    body = require('koa-json-body');

var scriptsRoute = require('./routes/scripts.js');

var app = koa();

app.use(json())
    .use(body())
    .use(router(app));

scriptsRoute(app);

app.listen(3000);