const express = require('express');
const mchntRouter = express.Router();
const bodyParser = require('body-parser');
const path = require('path');

const arrayPath = path.resolve(__dirname, 'data/array.json')
const detailPath = path.resolve(__dirname, 'data/detail.json')
const array = require(arrayPath);
const mchntDetail = require(detailPath);

mchntRouter.get('/getMchntAndAreaInf.sjson', (req, res, next) => {
    res.json({
        params: array,
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
})
mchntRouter.post('/mchntDetail', bodyParser.json(), (req, res, next) => {
    res.json({
        params: mchntDetail,
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
})
const limitInfo = require('./data/limit.json');
mchntRouter.post('/getLimitAtInfo', bodyParser.json(), (req, res, next) => {
    res.json({
        params: limitInfo,
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
})
mchntRouter.get('/getUpgradeSt', (req, res, next) => {
    res.json({
        params: {
            upgradeSt:mchntDetail.upgradeSt
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
})

module.exports = mchntRouter;