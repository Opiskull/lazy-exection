var fs = require('co-fs');

module.exports = {
    saveFile:function *(filePath, obj){
        var content = JSON.stringify(obj);
        yield fs.writeFile(filePath,content);
    },
    loadFile:function *(filePath){
        var content = yield fs.readFile(filePath,{ encoding: 'utf8'});
        var obj = JSON.parse(content);
        return obj;
    }
};
