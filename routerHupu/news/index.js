const express = require('express');
const newsRouter = express.Router();

let todayGamesNews = require('./data/todayGamesNews.json');
let otherNews = require('./data/otherNews.json');
let comments = require('./data/commnets.json');
let otherComments = require('./data/otherCommnets.json');


newsRouter.get('/todayGamesNews', (req, res, next) => {
   
    res.status(200);
    res.json({
        data: {
            todayGamesNews:todayGamesNews
        },
        msg: '登录成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});
newsRouter.get('/otherNews', (req, res, next) => {
    res.status(200);
    res.json({
        data: {
            otherNews:otherNews
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});
newsRouter.get('/getComments', (req, res, next) => {
    let param = req.body || {};
    let type = param.type;
    let _comments = comments
    if( type == 'other'){
        _comments = otherComments
    }
    res.status(200);
    res.json({
        data: {
            comments:_comments
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});

module.exports = newsRouter;

