const express = require('express');
const scanRouter = express.Router();

const codeStatus = require('../collectionCode/data/codeStatus.json')

// 是否已申请
scanRouter.get('/isApply', (req, res, next) => {
    res.status(200);
    res.json({ state: '01' })
})
// 是否在黑名单
scanRouter.post('/isBlack', (req, res, next) => {
    res.status(200);
    res.json({
        params: {
            blackSt: codeStatus['blackSt']
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});





module.exports = scanRouter;