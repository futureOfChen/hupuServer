const express = require('express');
const groupRouter = express.Router();

let hotNews = require('./data/hotNews.json');
let streetItem = require('./data/streetItem.json');
let nbaItem = require('./data/nbaItem.json');
let chinaBallItem = require('./data/chinaBallItem.json');

groupRouter.get('/hotRecommendNews', (req, res, next) => {
    res.status(200);
    res.json({
        data: {
            news:hotNews
        },
        msg: '成功',
        statusCode: 200
    });
});
groupRouter.get('/getStreetItem', (req, res, next) => {
    res.status(200);
    res.json({
        data: {
            items:streetItem
        },
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});
groupRouter.get('/getNbaItem', (req, res, next) => {
    res.status(200);
    res.json({
        data: {
            items:nbaItem
        },
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});
groupRouter.get('/getChinaBallItem', (req, res, next) => {
    res.status(200);
    res.json({
        data: {
            items:chinaBallItem
        },
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});

module.exports = groupRouter;

