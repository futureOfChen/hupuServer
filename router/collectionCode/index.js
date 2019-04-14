const express = require('express');
const colCodeRouter = express.Router();
const bodyParser = require('body-parser');
const util = require('../../util/index');
const path = require('path');

const mchntDetailPath = path.resolve(__dirname, '../mchnt/data/detail.json');
let mchntDetail = require(mchntDetailPath);
const cardList = require('./data/cardList.json');
const codeStatus = require('./data/codeStatus.json');
// 获取收款银行卡列表
colCodeRouter.get('/getMccCardList', (req, res, next) => {
    // console.log(req.param);

    res.status(200);
    res.json({
        params: {
            cardList: cardList,
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
})
// 申请收款码
colCodeRouter.post('/applyMcc', bodyParser.json(), (req, res, next) => {
    // console.log(req)
    // console.log(req.body)
    const paramGet = req.body;
    // delete paramGet['version']
    /**
     * {
            "virtualCardNo": "727d4211-2bed-3233-959e-ac066ad264b1",
            "accNm": "金州勇士",
            "cityCd": 1001,
            "version": "2.0",
            "source": "2"
        }
     */
    if (paramGet.virtualCardNo.trim().length == 0 || paramGet.accNm.trim().length == 0) {
        res.status(400);
        res.json({
            params: {
            },
            resp: '01',
            msg: '失败，缺少参数',
        });
    }

    // 根据传入的虚拟卡号，查询到对应的卡信息，然后完善店铺详情
    cardList.forEach(element => {
        if (element.virtualCardNo == paramGet.virtualCardNo) {
            mchntDetail = Object.assign(mchntDetail, {
                cardNo: element.pan,
                bankNm: element.bank,
                cardType: element.cardType,
                iconRelUrl: element.iconRelUrl
            })
        }
    });
    mchntDetail.accNm = paramGet.accNm;
    if (!mchntDetail.mchntCd && mchntDetail.mchntCd.length == 0) {
        const cd = String(Math.random()).slice(2, 5) + String(Math.random()).slice(6, 9);
        mchntDetail.mchntCd = cd;
    }

    util.writeFileJson(mchntDetailPath, mchntDetail, () => { });
    res.json({
        params: {
            redCodeSt: codeStatus['redcodeSt'],
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
});
// 申请物料
colCodeRouter.post('/applyMat', (req, res, next) => {
    res.json({
        params: {},
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
})
// 获取二维码信息
colCodeRouter.get('/getQrInfo', (req, res, next) => {
    res.json({
        params: {
            qrUrl:'https:www.zhihu.com',
            quNum:'256321458879654'
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
})
// 获取收款码交易口令数字
colCodeRouter.post('/getMccTransNum', (req, res, next) => {
    res.json({
        params: {},
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
})
//  启停收款码
colCodeRouter.post('/setMccOnOff', bodyParser.json(), (req, res, next) => {
    const param = req.body;
    mchntDetail.qrSt = param.isUseMcc;
    util.writeFileJson(mchntDetailPath, mchntDetail, () => {
        res.json({
            params: {},
            resp: 00,
            msg: '成功',
            statusCode: 200
        });
    });
})
//  更换收款卡
colCodeRouter.post('/updateMccCard', bodyParser.json(), (req, res, next) => {
    let param = req.body;
    let cardChanged = {};
    cardList.forEach(element => {
        if (element.virtualCardNo == param.virtualCardNo) {
            cardChanged = element;
        }
    });
    mchntDetail = Object.assign(mchntDetail, {
        cardNo: cardChanged.pan,
        bankNm: cardChanged.bank,
        cardType: cardChanged.cardType,
        iconRelUrl: cardChanged.iconRelUrl
    })
    util.writeFileJson(mchntDetailPath, mchntDetail, () => {
        res.json({
            params: {},
            resp: 00,
            msg: '成功',
            statusCode: 200
        });
    });

})
// 修改店铺信息
colCodeRouter.post('/upgradeMcc', bodyParser.json(), (req, res, next) => {
    const param = req.body;
    let obj = {
        storeNm: param.storeNm,
    };
    if (mchntDetail.upgradeSt != 0) {
        obj = Object.assign(obj, {
            addr: param.addr,
            area: param.area,
            storeTp: param.storeTp
        });
    }
    //修改店铺信息
    mchntDetail = Object.assign(mchntDetail, obj);
    util.writeFileJson(mchntDetailPath, mchntDetail, () => {
        res.json({
            params: {},
            resp: 00,
            msg: '成功',
            statusCode: 200
        });
    });

})
//  查询信用卡收款申请状态
colCodeRouter.post('/getAuditInfo', (req, res, next) => {
   
    res.json({
        params: {
            upgradeSt:'01'
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
   
})




module.exports = colCodeRouter;