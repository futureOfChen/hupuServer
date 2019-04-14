const fs = require('fs');

const writeFileJson = function (filePath, jsonObj, callback) {
    fs.writeFile(filePath, JSON.stringify(jsonObj, null, '\t'), () => {
        console.log('文件写入成功');
        console.log('写入的文件路径是:', filePath);
        if( !!callback && typeof callback === 'function' ){
            callback();
        }
    })
}

const util = {
    writeFileJson: writeFileJson
}

module.exports = util