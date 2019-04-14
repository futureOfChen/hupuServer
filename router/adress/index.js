const express = require('express');
const addressRouter = express.Router();
const bodyParser = require('body-parser');
const util = require('../../util/index')
const path = require('path');
const addressListPath = path.resolve(__dirname,'data/addressList.json');
let addressList = require(addressListPath);

/**    地址模块  address */
/**
{"id":"001",
"memberId":"0032",
"memberName":"赵四",
"provinceId":"001",
"cityId":"002",
"areaId":"003",
"addAll":"1234",
"addressInfo":"唐镇顾唐路1699号中国银联",
"mobile":"18755442563",
"phone":"18755442563",
"email":"",
"zipCode":"00",
"state":1}
 */

let addrTemplate = {
    "id": "",
    "memberId": "",
    "memberName": "",
    "provinceId": "",
    "cityId": "",
    "areaId": "",
    "addAll": "TO遍历地区列表DO",
    "addressInfo": "",
    "mobile": "",
    "phone": "",
    "email": "",
    "zipCode": "",
    "state": '0'
}

addressRouter.post('/getAddrList', (req, res) => {

    setTimeout(() => {
        res.json({
            params: {
                result: addressList
            },
            resp: 00,
            msg: '成功',
            statusCode: 200
        });
    }, 3000);

    // res.json({
    //     params: {
    //         result: addressList
    //     },
    //     resp: 00,
    //     msg: '成功',
    //     statusCode: 200
    // });
});
addressRouter.post('/deleteAddress',bodyParser.json(), (req, res) => {
    const addrId  = req.body.id || '';
    let addrToSave = [];
    if( addrId.length > 0 ){
      addressList.forEach(ele => {
        if( ele.id != addrId ){
            addrToSave.push(ele)
        }
      })
    }
    util.writeFileJson(addressListPath, addrToSave, () => {
        res.json({
            params: {
                tip:'地址删除成功'
            },
            resp: 00,
            msg: '成功',
            statusCode: 200
        });
    })

    
});

addressRouter.post('/newAddress', bodyParser.json(), (req, res, next) => {

    const addrListLengthLimit = 5;
    if (addressList.length >= addrListLengthLimit) {
        // res.status(400);
        res.json({
            params: {
                tip: '地址最多5条'
            },
            resp: 00,
            msg: '地址条数已到达极限',
            statusCode: 400
        });

    } else {
        // console.log(req.body)
        const addrGet = req.body;
        delete addrGet['version'];
        delete addrGet['source'];
        if (addrGet.state == 1) {
            addressList.forEach(element => {
                if (element.state == 1) {
                    element.state = '0';
                }
            });
        }
        // 构造新增的地址
        const idNew = String(Math.random()).slice(2, 5) + String(Math.random()).slice(6, 9);
        addrTemplate.id = idNew;
        addrTemplate.mobile = addrGet.phone;
        addrTemplate = Object.assign(addrTemplate, addrGet);
        addressList.push(addrTemplate);
        util.writeFileJson(addressListPath, addressList, () => {
            res.json({
                params: {},
                resp: 00,
                msg: '成功',
                statusCode: 200
            });
        })
    }

})

addressRouter.post('/editAddress', bodyParser.json(), (req, res, next) => {
    const addrGet = req.body;
    addrGet.addAll = "TO遍历地区列表DO";
    let addrModify = {};
    let addrIndex = -1;
    addressList.forEach((item, index) => {
        if (addrGet.id == item.id) {
            // console.log(item.id);
            addrModify = item;
            addrIndex = index;
        }
    })
    if (addrGet.state == 1) {
        addressList = addressList.map(element => {
            if (element.state == 1) {
                element.state = '0';
                // console.log(element);

            }
            return element;
        });
    }

    addressList[addrIndex] = Object.assign(addrModify, addrGet);
    // console.log(addressList);

    util.writeFileJson(addressListPath,addressList,() => {
        console.log('地址修改成功');
        res.json({
            params: {},
            resp: 00,
            msg: '成功',
            statusCode: 200
        });
    })
})


module.exports = addressRouter;