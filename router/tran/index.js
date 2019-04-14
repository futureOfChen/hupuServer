const express = require('express');
const tranRouter = express.Router();

tranRouter.post('/getTodayIncome', (req, res, next) => {
    res.status(200);
    res.json({
        params: {},
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});

let todayOrder = require('./todayOrder.json');
// for( let k = 0; k<10; k++ ) {
//     todayOrder[k] = todayOrder[1];
// }
tranRouter.post('/getTodayTrans', (req, res, next) => {
    res.status(200);
    res.json({
        params: {
            transInfo:todayOrder
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});
tranRouter.post('/getHistoryIncome', (req, res, next) => {
    res.status(200);
    res.json({
        params:{
            dayIncome: "1000",
            notice: "交易终止，有内鬼",
            orderNum: "100"
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});
tranRouter.post('/getHistoryTrans', (req, res, next) => {
    res.status(200);
    res.json({
        params: {
            transInfo:todayOrder
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});

module.exports = tranRouter;