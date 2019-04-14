const express = require('express');
const loginRouter = express.Router();
let codeList = require('./data/codes.json'); 
let phoneList = require('./data/phones.json'); 

loginRouter.post('/login', (req, res, next) => {
    const paramPost = req.body || {};
    let isPhoneOk = phoneList.indexOf(paramPost.phone) == -1;
    if( isPhoneOk ){
        res.status(200);
        res.json({
            data: {},
            msg: '登录失败,手机号错误',
            statusCode: 999
        });
    }
    res.status(200);
    res.json({
        data: {},
        msg: '登录成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});
loginRouter.get('/getCode', (req, res, next) => {
    let random =Math.ceil( Math.random()*10);
    let code = codeList[random] || '952768';
    res.status(200);
    res.json({
        data: {
            code:code
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});

module.exports = loginRouter;

