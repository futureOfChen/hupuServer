webpackJsonp([17],{

/***/ "01f45e806ef08cc34923":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__("b365af20d4e02cb0aa22");

var _assign2 = _interopRequireDefault(_assign);

var _promise = __webpack_require__("251bc7afe8127e09149d");

var _promise2 = _interopRequireDefault(_promise);

exports.recmdRecord = recmdRecord;
exports.sharlink = sharlink;
exports.isBlack = isBlack;
exports.isApply = isApply;
exports.applyMcc = applyMcc;
exports.getCardlist = getCardlist;
exports.getAddrList = getAddrList;
exports.applyMat = applyMat;
exports.getQrUrlRest = getQrUrlRest;
exports.getMchntAndAreaInf = getMchntAndAreaInf;
exports.getMchntDetail = getMchntDetail;
exports.upgradeMcc = upgradeMcc;
exports.getProtocolInfo = getProtocolInfo;
exports.getHistoryIncome = getHistoryIncome;
exports.getHistoryTrans = getHistoryTrans;
exports.getTodayIncome = getTodayIncome;
exports.getTodayTrans = getTodayTrans;
exports.getTransDetilByVoucherNum = getTransDetilByVoucherNum;
exports.getLogisticsSt = getLogisticsSt;
exports.getUpgradeSt = getUpgradeSt;
exports.getLogisticsList = getLogisticsList;
exports.getAuditInfo = getAuditInfo;
exports.getLimitAtInfo = getLimitAtInfo;
exports.mchntOper = mchntOper;
exports.deleteAddress = deleteAddress;
exports.updateMccCard = updateMccCard;
exports.newAddress = newAddress;
exports.editAddress = editAddress;
exports.setMccOnOff = setMccOnOff;
exports.getMccTransNum = getMccTransNum;

var _request = __webpack_require__("76fb50331ac78bf18670");

var _config = __webpack_require__("8653d9474e130320c382");

var _config2 = _interopRequireDefault(_config);

var _cacheStorage = __webpack_require__("8688ab3c6978d6c41524");

var _store = __webpack_require__("729bd0f3009c1858d0f9");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__("5d4604b08304c597d074");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 申请红包码的请求
 * @param phone
 */
function recmdRecord(phone) {
    if (phone == undefined) {
        phone = "";
    }
    var recmdMobile = _request.Util.base64Encode(phone);
    return (0, _request.post)(_config2.default.REST.recmdRecord, { recmdMobile: recmdMobile }).then(function (response) {
        if (response.statusCode == _config2.default.STATUSCODE.SUCCESS) {
            //删除用户是否申请红包码接口的缓存
            (0, _cacheStorage.removeCache)({
                rollKey: _config2.default.CACHEKEY.isApply.rollKey,
                secondKey: _config2.default.CACHEKEY.isApply.secondKey
            }, function () {}, function () {
                (0, _cacheStorage.removeCache)({
                    full: true
                });
            });
        }
        return _promise2.default.resolve();
    });
}

/**
 * 请求红包吗连接
 */
function sharlink() {
    return (0, _request.post)(_config2.default.REST.shareLink, {}).then(function (response) {
        if (response.statusCode == _config2.default.STATUSCODE.SUCCESS) {
            var redUrlStr = "https://wallet.95516.com/s/wl/webV3/activity/vMarketing2/html/snsIndex.html?r=" + response.data.identifier;
            var nextState = {
                redUrlStr: redUrlStr
            };
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)(nextState));
            return _promise2.default.resolve(redUrlStr);
        }
    });
}

/**
 * 是否在白名单的请求
 */
function isBlack(update) {
    var updateFunc = function updateFunc(resp) {
        _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
            blackSt: resp.data.blackSt
        }));
        console.log('isBlack: update函数执行完毕');
        if (typeof update === 'function') {
            update(resp);
        }
    };
    //读取缓存，同时异步发送请求
    return (0, _request.post)(_config2.default.REST.isBlack, {}, (0, _cacheStorage.staleWhileRevalidateStorage)(updateFunc)).then(function (response) {
        _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
            blackSt: response.data.blackSt
        }));
        return _promise2.default.resolve(response);
    });
}

/**
 * 是否在黑名单的请求
 * @returns {*}
 */
function isApply() {
    var cacheParam = (0, _cacheStorage.cacheFirstStorage)(30 * 60 * 1000, _config2.default.CACHEKEY.isApply.rollKey, _config2.default.CACHEKEY.isApply.secondKey); //缓存30分钟
    return (0, _request.get)(_config2.default.REST.isApply, {}, cacheParam).then(function (response) {
        if (response.data.applySt != "1") {
            /**
             * 如果已经申请过红包码则缓存30分钟，否则不缓存
             */
            (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.isApply.rollKey, _config2.default.CACHEKEY.isApply.secondKey);
        }
        _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
            applySt: response.data.applySt
        }));
        return _promise2.default.resolve(response);
    });
}

/**
 * 申请收款码
 * @param param 请求参数
 */
function applyMcc() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        refereeTel: "", //推荐人手机号
        virtualCardNo: "", //虚拟卡号
        accNm: "", //店铺名称
        cityCd: "" //城市代码
    };

    return (0, _request.post)(_config2.default.REST.applyMcc, (0, _assign2.default)(param, _request.comomParam)).then(function (response) {
        if (response.statusCode == _config2.default.STATUSCODE.SUCCESS) {
            //删除用户是否申请红包码接口的缓存
            (0, _cacheStorage.removeCache)({
                rollKey: _config2.default.CACHEKEY.isApply.rollKey,
                secondKey: _config2.default.CACHEKEY.isApply.secondKey
            }, function () {}, function () {
                (0, _cacheStorage.removeCache)({
                    full: true
                });
            });
        }
        return _promise2.default.resolve(response);
    });
}

/**
 * 获取用户的银行卡列表
 */
function getCardlist() {
    //获取用户银行卡列表，缓存1分钟
    return (0, _request.get)(_config2.default.REST.getMccCardList, _request.comomParam, (0, _cacheStorage.cacheFirstStorage)(60 * 1000)).then(function (response) {
        //如果后台返回银行卡列表且不为空
        if (!!response.data.cardList && response.data.cardList.length != 0) {

            //初始化默认卡
            var defalutCard = {
                bank: "", //银行卡所在的银行
                cardType: "", //银行卡类型
                functionBitmap: "", //银行卡功能位
                iconRelUrl: "", //银行卡的logo地址
                isSupport: "", //是否支持
                pan: "", //带有掩码的卡号
                rank: 0,
                selected: false, //是否选中
                virtualCardNo: "" //虚拟卡号
            };

            response.data.cardList.forEach(function (item) {
                if (!!item.selected && item.isSupport == 1) {
                    defalutCard = item;
                }
            });
            //如果没有默认选中的卡取一个不被置为灰的卡为默认卡
            if (defalutCard.bank.length == 0) {
                for (var k = 0; k < response.data.cardList.length; k++) {
                    if (response.data.cardList[k].isSupport == 1) {
                        defalutCard = response.data.cardList[k];
                        break;
                    }
                }
            }
            var storeState = {
                storeReceiveCardObj: defalutCard,
                cardList: response.data.cardList
            };
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)(storeState));

            return _promise2.default.resolve(response);
        }
    });
}

/**
 * 获取地址列表
 * @param param 请求参数
 */
function getAddrList(update) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        state: ""
    };

    // 读取缓存，同时异步发送请求
    var updateFunc = function updateFunc(resp) {
        // 在update函数中，更新redux中的addressList
        _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({ addressList: resp.data.result || [] }));
        console.log('getAddrList: update函数执行完毕');
        if (typeof update === 'function') {
            update(resp);
        }
    };
    var cacheParam = (0, _cacheStorage.staleWhileRevalidateStorage)(updateFunc, _config2.default.CACHEKEY.getAddrList.rollKey, _config2.default.CACHEKEY.getAddrList.secondKey);
    return (0, _request.post)(_config2.default.REST.getAddrList, (0, _assign2.default)({}, _request.comomParam, param), cacheParam).then(function (response) {

        var addressList = response.data.result || [];

        _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
            addressList: addressList
        }));

        return _promise2.default.resolve(response);
    });
}

/**
 * 申请物料接口
 * @param param 请求参数
 */
function applyMat() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        materialList: "", //物料列表
        delivNm: "", //收货人
        addAll: "", //地区名称
        delivPhone: "", //收货电话
        provinceId: "", //省ID
        cityId: "", //市ID
        areaId: "", //地区ID
        addressInfo: "", //详细地址
        id: '', //地址的ID
        cityNm: "", //所在城市CityCode
        redUrl: "" //红包码地址  可选参数
    };

    return (0, _request.post)(_config2.default.REST.applyMat, (0, _assign2.default)(param, _request.comomParam));
}

/**
 * 获取商户收款码地址和商户编号
 *
 */
function getQrUrlRest() {
    //缓存2小时
    return (0, _request.get)(_config2.default.REST.getQrUrl, (0, _cacheStorage.cacheFirstStorage)(2 * 60 * 60 * 1000)).then(function (response) {

        _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
            mchntDetail: {
                qrUrl: response.data.qrUrl,
                qrNum: response.data.qrNum
            }
        }));
        return _promise2.default.resolve(response);
    });
}

/**
 *获取店铺区域列表和店铺类型列表
 * @returns {*}
 */

function getMchntAndAreaInf() {

    /**
     * 这个接口,只走sw，不走loacalStorage
     */
    // let cacheParam = {
    //     byAjax: false,
    //     forChsp:false,
    //     encrypt:false,
    //     cache: true
    // }
    return (0, _request.get)(_config2.default.REST.getMchntAndAreaInf, _request.comomParam, (0, _cacheStorage.cacheFirst)(24 * 60 * 60 * 1000)).then(function (response) {
        var area = [],
            merchantTp = [];

        if (response.statusCode == _config2.default.STATUSCODE.SUCCESS) {

            /**
             * 省级
             */
            response.data.areaArr.forEach(function (province) {

                var one = {
                    "value": province.proId,
                    "label": province.proNm,
                    "children": []
                };
                if (province.proNm == "北京市" || province.proNm == "上海市" || province.proNm == "天津市" || province.proNm == "重庆市" || province.proNm == "深圳市") {
                    var two = {
                        "value": province.proId,
                        "label": province.proNm,
                        "children": []
                    };
                    province.city.forEach(function (city) {
                        var three = {
                            "value": city.cityId,
                            "label": city.cityNm,
                            "children": []
                        };
                        if (three.value != two.value) {
                            two.children.push(three);
                        }
                    });
                    one.children.push(two);
                } else {
                    /**
                     * 市级
                     */
                    province.city.forEach(function (city) {

                        var two = {
                            "value": city.cityId,
                            "label": city.cityNm,
                            "children": []

                            /**
                             * 区级
                             */
                        };city.area.forEach(function (area) {

                            var three = {
                                "value": area.areaId,
                                "label": area.areaNm,
                                "children": []
                            };

                            two.children.push(three);
                        });

                        one.children.push(two);
                    });
                }

                area.push(one);
            });

            response.data.merchantTpArr.forEach(function (merType1) {
                var one = {
                    "value": merType1.merchantTpCd,
                    "label": merType1.merchantTpNm,
                    "children": []
                };

                merType1.merchantTpArr.forEach(function (merType2) {
                    var two = {
                        "value": merType2.merchantTpCd,
                        "label": merType2.merchantTpNm,
                        "children": []
                    };

                    one.children.push(two);
                });

                merchantTp.push(one);
            });
        }

        var nextState = {
            mchntAndAreaInf: {
                areaArr: area,
                merchantTpArr: merchantTp
            }
        };
        _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)(nextState));
    });
}

/**
 * 获取店铺详情信息
 * @returns {*}
 */
function getMchntDetail() {
    var cacheParam = (0, _cacheStorage.cacheFirstStorage)(60 * 1000, _config2.default.CACHEKEY.getMchntDetail.rollKey, _config2.default.CACHEKEY.getMchntDetail.secondKey); //缓存1分钟
    return (0, _request.post)(_config2.default.REST.getMchntDetail, _request.comomParam, cacheParam).then(function (resp) {
        if (resp.statusCode == _config2.default.STATUSCODE.SUCCESS) {
            var mchntDetail = resp.data;
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({ mchntDetail: mchntDetail }));
            return _promise2.default.resolve(mchntDetail);
        }
    });
}

/**
 * 升级商铺二维码
 * @param param
 * @returns {*}
 */
function upgradeMcc() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        storeNm: "", //店铺名称
        StoreTp: "", //店铺类型
        provCd: "", //省ID
        cityCd: "", //市ID
        coutyCd: "", //区ID
        addr: "", //地址
        certifPic1: "", //身份证正面照
        certifPic2: "", //身份证反面照
        certifPic3: "", //手持身份证照片
        licensePic: "", //营业执照
        shopPic1: "", //店铺照片1
        shopPic2: "", //店铺照片2
        auxProvMat1: "", //辅助照片1
        auxProvMat2: "", //辅助照片2
        shopLogoPic: "" //店铺LOGO
    };

    return (0, _request.post)(_config2.default.REST.upgradeMcc, (0, _assign2.default)(param, _request.comomParam)).then(function (response) {
        if (response.statusCode == _config2.default.STATUSCODE.SUCCESS) {
            //删除店铺详情的缓存
            (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.getMchntDetail.rollKey, _config2.default.CACHEKEY.getMchntDetail.secondKey);
            //删除用户是否升级的接口的缓存
            (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.UpdateCreditCollectMoneySt.rollKey, _config2.default.CACHEKEY.UpdateCreditCollectMoneySt.secondKey);
        }
        return _promise2.default.resolve(response);
    });
}

/**
 * 获取用户的协议编号和协议名称
 * @returns {*}
 */
function getProtocolInfo() {
    /**
     * 这个接口,缓存2小时
     */
    return (0, _request.get)(_config2.default.REST.getProtocolInfo, _request.comomParam, (0, _cacheStorage.cacheFirstStorage)(2 * 60 * 60 * 1000)).then(function (response) {
        if (response.statusCode == _config2.default.STATUSCODE.SUCCESS) {
            return _promise2.default.resolve(response.data);
        }
    });
}

/**
 * 历史收款
 * @param param
 */
function getHistoryIncome(param) {
    return (0, _request.post)(_config2.default.REST.getHistoryIncome, (0, _assign2.default)(param, _request.comomParam)).then(function (res) {
        if (res.statusCode == "00") {
            console.log(res.data);
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                historyIncomeObj: res.data
            }));
            return _promise2.default.resolve(res);
        }
    });
}
/**
 * 历史订单
 * @param param
 */
function getHistoryTrans(param) {
    return (0, _request.post)(_config2.default.REST.getHistoryTrans, (0, _assign2.default)(param, _request.comomParam)).then(function (res) {
        if (res.statusCode == "00") {
            var originListData = _store2.default.getState().getIn(['historyOrderList']).toJS();
            var newList = res.data.transInfo;
            console.log(newList);
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                historyOrderList: originListData.concat(newList)
            }));
            return _promise2.default.resolve(res);
        }
    });
}
/**
 * 今日收款
 * @param param
 */
function getTodayIncome() {
    return (0, _request.post)(_config2.default.REST.getTodayIncome, _request.comomParam).then(function (res) {
        if (res.statusCode == "00") {
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                todayIncomeObj: res.data
            }));
            return _promise2.default.resolve(res);
        }
    });
}

/**
 * 今日订单
 * @param param
 */
function getTodayTrans(param) {
    return (0, _request.post)(_config2.default.REST.getTodayTrans, (0, _assign2.default)(param, _request.comomParam)).then(function (res) {
        if (res.statusCode == "00") {
            var originListData = _store2.default.getState().getIn(['todayOrderList']).toJS();
            var newList = res.data.transInfo;
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                todayOrderList: originListData.concat(newList)
            }));
            return _promise2.default.resolve(res);
        }
    });
}
/**
 * 单笔查询
 * @param param
 */
function getTransDetilByVoucherNum(param) {
    return (0, _request.post)(_config2.default.REST.getTransDetilByVoucherNum, (0, _assign2.default)(param, _request.comomParam));
}
/**
 * 获取物流信息
 */
function getLogisticsSt(param) {
    return (0, _request.get)(_config2.default.REST.getLogisticsSt, (0, _assign2.default)(param, _request.comomParam)).then(function (res) {
        if (res.statusCode == "00") {
            console.log(res);
            var newObj = res.data.deliveryMsg;
            /**
             * newObj.matDelivStatus 的状态和redux的store保持一致
             * @type {*}
             */
            newObj.matDelivStatus = res.data.matDelivStatus;
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                deliveryMsg: newObj
            }));
            return _promise2.default.resolve(res);
        }
    });
}

/**
 * 商户服务首页 点击信用卡按钮查询商户是否开通过信用卡收款
 */
function getUpgradeSt() {
    return (0, _request.get)(_config2.default.REST.getUpgradeSt, _request.comomParam).then(function (res) {
        if (res.statusCode == "00") {
            return _promise2.default.resolve(res);
        }
    });
}

/**
 * 获取物料历史订单
 */
function getLogisticsList(param) {
    return (0, _request.get)(_config2.default.REST.getLogisticsList, (0, _assign2.default)(param, _request.comomParam)).then(function (res) {
        if (res.statusCode == "00") {
            console.log(res);
            return _promise2.default.resolve(res);
        }
    });
}

/**
 * 查询信用卡收款升级状态
 */
function getAuditInfo() {
    return (0, _request.post)(_config2.default.REST.getAuditInfo, _request.comomParam).then(function (res) {
        if (res.statusCode == "00") {
            console.log(res);
            return _promise2.default.resolve(res);
        }
    });
}

/**
 * 获取收款限额详情
 */
function getLimitAtInfo() {
    //缓存2个小时
    (0, _request.post)(_config2.default.REST.getLimitAtInfo, _request.comomParam, (0, _cacheStorage.cacheFirstStorage)(2 * 60 * 60 * 1000)).then(function (resp) {
        if (resp.statusCode = _config2.default.STATUSCODE.SUCCESS) {
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({ limitInfo: resp.data }));
        }
    });
}

/**
 * 更新店铺详情
 * @param {*} param 店铺详情信息
 */
function mchntOper() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return (0, _request.post)(_config2.default.REST.upgradeMcc, (0, _assign2.default)(param, _request.comomParam)).then(function () {
        //删除mchntDetail缓存
        (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.getMchntDetail.rollKey, _config2.default.CACHEKEY.getMchntDetail.secondKey);
        return _promise2.default.resolve();
    });
}

/**
 * 删除地址信息
 * @param {*} param 请求参数
 */
function deleteAddress() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        id: '' //地址id
    };


    return (0, _request.post)(_config2.default.REST.deleteAddress, (0, _assign2.default)(param, _request.comomParam)).then(function () {
        //删除收货地址缓存
        (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.getAddrList.rollKey, _config2.default.CACHEKEY.getAddrList.secondKey);
        return _promise2.default.resolve(param);
    });
}

/**
 * 更新收款银行卡
 * @param {*} param 请求参数
 */
function updateMccCard() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        virtualCardNo: '' //虚拟卡号
    };


    return (0, _request.post)(_config2.default.REST.updateMccCard, (0, _assign2.default)(param, _request.comomParam)).then(function () {
        //换卡后，清除店铺详情缓存
        (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.getMchntDetail.rollKey, _config2.default.CACHEKEY.getMchntDetail.secondKey);
        return _promise2.default.resolve();
    });
}

/**
 * 新增地址
 * @param {*} param 详细的地址信息
 */
function newAddress() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return (0, _request.post)(_config2.default.REST.newAddress, (0, _assign2.default)(param, _request.comomParam)).then(function (response) {
        if (response.statusCode === _config2.default.STATUSCODE.SUCCESS) {
            // 删除收货地址缓存
            (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.getAddrList.rollKey, _config2.default.CACHEKEY.getAddrList.secondKey);
            return _promise2.default.resolve(response);
        }
    });
}
/**
 * 修改地址信息
 * @param {*} param 详细的地址信息
 */
function editAddress() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return (0, _request.post)(_config2.default.REST.editAddress, (0, _assign2.default)(param, _request.comomParam)).then(function (response) {
        if (response.statusCode === _config2.default.STATUSCODE.SUCCESS) {
            //删除收货地址缓存
            (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.getAddrList.rollKey, _config2.default.CACHEKEY.getAddrList.secondKey);
            return _promise2.default.resolve(response);
        }
    });
}
/**
 * 启停收款码服务
 * @param {*} param 请求参数
 */
function setMccOnOff() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        isUseMcc: '' //是否使用收款码服务
    };

    return (0, _request.post)(_config2.default.REST.setMccOnOff, (0, _assign2.default)(param, _request.comomParam)).then(function () {
        //删除店铺详情缓存
        (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.getMchntDetail.rollKey, _config2.default.CACHEKEY.getMchntDetail.secondKey);
        return _promise2.default.resolve();
    });
}
/**
 * 获取吊起支付控件的TN号
 */
function getMccTransNum() {
    return (0, _request.post)(_config2.default.REST.getMccTransNum).then(function (resp) {
        if (resp.statusCode == _config2.default.STATUSCODE.SUCCESS) {
            return _promise2.default.resolve({ mccTransNum: resp.data.transNum });
        }
    });
}

/***/ }),

/***/ "14dc1f7ebd80d15bfd34":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("a6f620d47943704beb48");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "1679851be27b268ea24e":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("3e71833d67eff32178f6");
__webpack_require__("666e0b794582d53894ee");
module.exports = __webpack_require__("53b7d34817144b12b0aa");


/***/ }),

/***/ "21dfac28523ae37dac5b":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("3e71833d67eff32178f6");
__webpack_require__("666e0b794582d53894ee");
module.exports = __webpack_require__("6a442ab5bd9bd9294478");


/***/ }),

/***/ "251bc7afe8127e09149d":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("973cc8eefc59931de95e"), __esModule: true };

/***/ }),

/***/ "28cff86e1d51ebf21f7f":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "3c24d38ffcd0c38e3477":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("1679851be27b268ea24e"), __esModule: true };

/***/ }),

/***/ "4d5efb0a44c218859eb2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _stringify = __webpack_require__("8e994c8287bafcdbd431");

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__("8a4a7a62a26b8f064358");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("acab2ae8d55fd58113d8");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("0bf817924258aa08734c");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("de6bd889b0c636aa995b");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("aa675f1299ad16c8424c");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("8af190b70a6bc55c6f1b");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("91409e3157f4cc61f11f");

__webpack_require__("fb2f049dfcee4dce3cc8");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollectionDetails = function (_React$Component) {
    (0, _inherits3.default)(CollectionDetails, _React$Component);

    function CollectionDetails(props) {
        (0, _classCallCheck3.default)(this, CollectionDetails);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (CollectionDetails.__proto__ || (0, _getPrototypeOf2.default)(CollectionDetails)).call(this, props));

        _this2.getDateTime = function (num) {
            console.log(num);
            var now = new Date();
            var dateS = new Date(now.getTime() - num * 24 * 3600 * 1000);
            var months = dateS.getMonth() + 1;
            var days = dateS.getDate();
            console.log(days);
            if (months < 10) {
                months = "0" + months;
            }
            if (days < 10) {
                days = "0" + days;
            }
            var startDate = dateS.getFullYear() + '/' + months + '/' + days; //开始日期

            var yearE = void 0,
                monthE = void 0,
                dayE = void 0,
                preDate = void 0;

            if (num != "0") {
                preDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                dayE = preDate.getDate();
                yearE = preDate.getFullYear();
                monthE = preDate.getMonth() + 1;
            } else {
                dayE = now.getDate();
                yearE = now.getFullYear();
                monthE = now.getMonth() + 1;
            }

            if (monthE < 10) {
                monthE = "0" + monthE;
            }
            if (dayE < 10) {
                dayE = "0" + dayE;
            }

            var endDate = yearE + "/" + monthE + "/" + dayE; //结束日期
            var lastDate = void 0;
            if (num == "3" || num == "7" || num == "31") {
                lastDate = startDate + " - " + endDate;
                return lastDate;
            } else {
                lastDate = startDate;
                return lastDate;
            }
        };

        _this2.formatDate = function (str) {
            var year = str.substr(0, 4);
            var month = str.substr(4, 2);
            var day = str.substr(6, 2);
            var hour = str.substr(8, 2);
            var min = str.substr(10, 2);
            var s = str.substr(12, 2);
            var date = year + "/" + month + "/" + day;
            var time = hour + ":" + min + ":" + s;

            return date + "  " + time;
        };

        _this2.state = {
            isLoading: false
        };
        _this2.scrollContainerRef = _react2.default.createRef();
        return _this2;
    }

    (0, _createClass3.default)(CollectionDetails, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var that = this;
            this.scrollContainerRef.current.onscroll = function (e) {
                var _that$props = that.props,
                    hasMore = _that$props.hasMore,
                    getMoreData = _that$props.getMoreData;

                if (e.target.scrollHeight - (e.target.offsetHeight + e.target.scrollTop) < 5) {
                    if (hasMore && !that.state.isLoading) {
                        that.setState({
                            isLoading: true
                        });
                        getMoreData().then(function () {
                            that.setState({
                                isLoading: false
                            });
                        });
                    }
                }
            };
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.scrollContainerRef.current.onscroll = ""; //清空滚动
        }

        /**
         * 获取日期时间段
         * @param num
         * @returns {string|*}
         */


        /**
         * 格式化拆分后台响应回来的时间日期
         * @param str
         * @returns {string}
         */

    }, {
        key: "render",
        value: function render() {
            var fixHeaderStyle = {
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: 10,
                background: '#fff'
            };
            var _this = this;

            var _props = this.props,
                todayOrderList = _props.todayOrderList,
                historyOrderList = _props.historyOrderList,
                todayIncomeObj = _props.todayIncomeObj,
                historyIncomeObj = _props.historyIncomeObj,
                tabDayVal = _props.tabDayVal,
                bottomText = _props.bottomText,
                tableCLickHandler = _props.tableCLickHandler;

            //根据 tab 的值确定渲染那个数组,那个对象

            var showOrderListData = tabDayVal == 0 ? todayOrderList : historyOrderList;
            var showIncObjData = tabDayVal == 0 ? todayIncomeObj : historyIncomeObj;

            var renderlist = function renderlist(item, index) {
                return _react2.default.createElement(
                    "div",
                    { key: index, className: "item" },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: "/queryResults?goDetail=" + encodeURIComponent((0, _stringify2.default)(item)) },
                        _react2.default.createElement(
                            "p",
                            { className: "payMonerNum" },
                            "\u4ED8\u6B3E\u51ED\u8BC1\u53F7\uFF1A",
                            _react2.default.createElement(
                                "span",
                                null,
                                item.voucherNum
                            )
                        ),
                        _react2.default.createElement("div", { className: "bottomLine" }),
                        _react2.default.createElement(
                            "p",
                            { className: "cardNum" },
                            "\u8D26\u6237\u5361\u53F7\uFF1A",
                            _react2.default.createElement(
                                "span",
                                null,
                                item.accNo
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "CollectMoney" },
                            _react2.default.createElement(
                                "p",
                                { className: "moneyLeft" },
                                "\u91D1\u989D\uFF1A",
                                _react2.default.createElement(
                                    "span",
                                    { className: "money" },
                                    item.txnAmt,
                                    "\u5143"
                                )
                            ),
                            _react2.default.createElement(
                                "p",
                                { className: "timeRight" },
                                _react2.default.createElement(
                                    "span",
                                    { className: "time" },
                                    _this.formatDate(item.transTm)
                                )
                            )
                        )
                    )
                );
            };
            return _react2.default.createElement(
                "div",
                { className: "CollectionDetailsContain" },
                _react2.default.createElement(
                    "div",
                    { style: fixHeaderStyle },
                    _react2.default.createElement(
                        "ul",
                        { className: "dateTabs clearfix" },
                        _react2.default.createElement(
                            "li",
                            { className: tabDayVal == "0" ? "active" : "", "data-num": "0", onClick: tableCLickHandler.bind(this, "0") },
                            _react2.default.createElement(
                                "div",
                                null,
                                "\u4ECA\u5929"
                            )
                        ),
                        _react2.default.createElement(
                            "li",
                            { className: tabDayVal == "3" ? "active" : "", "data-num": "3", onClick: tableCLickHandler.bind(this, "3") },
                            _react2.default.createElement(
                                "div",
                                null,
                                "\u6700\u8FD13\u5929"
                            )
                        ),
                        _react2.default.createElement(
                            "li",
                            { className: tabDayVal == "7" ? "active" : "", "data-num": "7", onClick: tableCLickHandler.bind(this, "7") },
                            _react2.default.createElement(
                                "div",
                                null,
                                "\u6700\u8FD11\u5468"
                            )
                        ),
                        _react2.default.createElement(
                            "li",
                            { className: tabDayVal == "31" ? "active" : "", "data-num": "31", onClick: tableCLickHandler.bind(this, "31") },
                            _react2.default.createElement(
                                "div",
                                null,
                                "\u6700\u8FD11\u6708"
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "CollectMoneyListBox", ref: this.scrollContainerRef },
                    _react2.default.createElement(
                        "div",
                        { className: "curDate curNoDate" },
                        _react2.default.createElement(
                            "div",
                            { className: "date" },
                            _react2.default.createElement(
                                "span",
                                null,
                                this.getDateTime(tabDayVal)
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "curMoney clearfix" },
                            _react2.default.createElement(
                                "div",
                                { className: "curMoneyLeft" },
                                _react2.default.createElement(
                                    "p",
                                    { className: "receiveMoney" },
                                    "\u6536\u6B3E\u91D1\u989D"
                                ),
                                _react2.default.createElement(
                                    "p",
                                    { className: "receiveNum" },
                                    "\xA5",
                                    showIncObjData.dayIncome ? showIncObjData.dayIncome : "0.00"
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "curMoneyRight" },
                                _react2.default.createElement(
                                    "p",
                                    { className: "order" },
                                    "\u8BA2\u5355\u91CF"
                                ),
                                _react2.default.createElement(
                                    "p",
                                    { className: "orderNum" },
                                    showIncObjData.orderNum ? showIncObjData.orderNum : "0"
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "CollectMoneyList" },
                        showOrderListData.map(renderlist)
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "loading" },
                        _react2.default.createElement(
                            "div",
                            { className: "loadingBg" },
                            bottomText
                        )
                    )
                )
            );
        }
    }]);
    return CollectionDetails;
}(_react2.default.Component); /**
                               * Created by by on 2018/4/13.
                               */


exports.default = CollectionDetails;

/***/ }),

/***/ "53b7d34817144b12b0aa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e2cf04d7ed5fdb33fb87");
var get = __webpack_require__("058da6cfda39d4efd6de");
module.exports = __webpack_require__("91d9e3da5180694da5dd").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "5e59b71b33a38c3618e7":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("e9bd0ce2843722ddc7e3");
var call = __webpack_require__("3d8b92ce0865fd975233");
var isArrayIter = __webpack_require__("16d5e004271702f1eb9e");
var anObject = __webpack_require__("e2cf04d7ed5fdb33fb87");
var toLength = __webpack_require__("09b84769b8f44671e2b5");
var getIterFn = __webpack_require__("058da6cfda39d4efd6de");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "5e7491f1f799715eac75":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("e044a82d1d9b0444627b");
var core = __webpack_require__("91d9e3da5180694da5dd");
var dP = __webpack_require__("c085b2899129a5955b7e");
var DESCRIPTORS = __webpack_require__("d5b766fc471c53cb9e69");
var SPECIES = __webpack_require__("4a88bf6bd245e3166736")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "6a442ab5bd9bd9294478":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("468b0a4631cfd44380cf");
var ITERATOR = __webpack_require__("4a88bf6bd245e3166736")('iterator');
var Iterators = __webpack_require__("eacf80a9f87676689dc1");
module.exports = __webpack_require__("91d9e3da5180694da5dd").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "76fb50331ac78bf18670":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createConvasAndSavePhoto = exports.createTextCanvase = exports.savePicToLocal = exports.fetchNativeData = exports.getCurrentLocationInfo = exports.share = exports.saveQcode = exports.getUserDetailInfo = exports.createWebView = exports.verifyPayPwd = exports.closeWebView = exports.sendQrCode = exports.mccStateChanged = exports.beforeEnterRouter = exports.toast = exports.getXiaoWeiAudio = exports.setXiaoWeiAudio = exports.getSearchParam = exports.del = exports.put = exports.post = exports.get = exports.responseFormatter = exports.getServUrl = exports.comomParam = exports.regPayNum = exports.regPhone = exports.Env = exports.App = exports.Util = undefined;

var _assign = __webpack_require__("b365af20d4e02cb0aa22");

var _assign2 = _interopRequireDefault(_assign);

var _stringify = __webpack_require__("8e994c8287bafcdbd431");

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__("251bc7afe8127e09149d");

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = __webpack_require__("ef51d4989f3044b2eb33");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = request;
exports.setXiaoWeiPay = setXiaoWeiPay;

var _toast = __webpack_require__("c2e05f9935ecf0b033a4");

var _toast2 = _interopRequireDefault(_toast);

var _jquery = __webpack_require__("802cdb4f0b591dfd1229");

var _jquery2 = _interopRequireDefault(_jquery);

var _config = __webpack_require__("8653d9474e130320c382");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***********************************************************************************************
*
* 常量定义区
*
************************************************************************************************/

var Util = exports.Util = window.UP.W.Util; /*
                                               API 接口配置
                                               axios 参考文档：https://www.kancloud.cn/yunye/axios/234845
                                            
                                            */
// import axios from 'axios';
var App = exports.App = UP.W.App;

var Env = exports.Env = UP.W.Env;

var regPhone = exports.regPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

var regPayNum = exports.regPayNum = /^[0-9]{20}$/;

var comomParam = exports.comomParam = {
    version: "2.0",
    source: "2"

    /***********************************************************************************************
     *
     * 请求核心区 下面这块区域中的代码改动请慎重
     *
     ************************************************************************************************/

};var baseUrl = "",
    baseUrl2 = "",
    baseUrl3 = "";
if (location.hostname.indexOf('95516.com') !== -1) {
    //生产环境
    baseUrl = location.protocol + "//shanghu.95516.com/wlmweb-web/restlet/";
    // baseUrl2 = location.protocol + "//mall.95516.com/cqp-int-mall-web/restlet/";
    baseUrl3 = location.protocol + "//youhui.95516.com/youhui-web/restlet/";
} else if (location.hostname.indexOf('172.18.179.10') !== -1) {
    //测试环境
    // baseUrl="http://172.21.101.25:36000/wlmweb-web/restlet/"; //测试室apache
    //baseUrl = "http://172.21.101.95:36000/wlmweb-web/restlet/";//开发环境apache
    baseUrl = "http://172.18.179.17/wlmweb-web/restlet/"; //测试室f5 通过Nginx转发
    baseUrl3 = "http://172.18.179.11/youhui-web/restlet/";
    // baseUrl3 = "http://172.21.133.25:36000/youhui-web/restlet/";
} else {
    // baseUrl = "http://172.21.101.95:36000/wlmweb-web/restlet/";
    // baseUrl = "http://172.21.101.25:38210/wlmweb-web/restlet/";
    baseUrl = "http://172.18.179.17/wlmweb-web/restlet/"; //测试室f5 通过Nginx转发
    baseUrl3 = "http://172.18.179.11/youhui-web/restlet/"; //测试室f5 通过Nginx转发
    // baseUrl3 = "http://172.21.133.25:36000/youhui-web/restlet/";
    // baseUrl3 = "http://172.21.33.56:36000/youhui-web/restlet/";
}
/**
 * 通过后缀获取服务器的全地址
 * @param url
 * @returns {string}
 */
var getServUrl = exports.getServUrl = function getServUrl(url) {
    var serverUrl = "";
    if (url == _config2.default.REST.userInfo) {
        serverUrl = "";
    }
    // else if (url.split("/")[0] == "address") {
    //     serverUrl = baseUrl2
    // }
    else if (url.split("/")[0] == "scan" || url == _config2.default.REST.getCity) {
            serverUrl = baseUrl3;
        } else {
            serverUrl = baseUrl;
        }

    return serverUrl;
};

/**
 * 格式化结果 将结果格式化为
 * {
 *     statusCode   后台响应码
 *     data         后台返回的数据
 *     msg          后台的提示信息
 * }
 * @param data
 * @returns {{statusCode: (string|*), data: *, msg: *}}
 */
var responseFormatter = exports.responseFormatter = function responseFormatter(data) {
    var res = {
        statusCode: data.resp,
        data: data.params,
        msg: data.msg
    };

    return res;
};

// 删除底部 '/'
function deleteSlash(host) {
    return host.replace(/\/$/, '');
}

// 添加头部 '/'
function addSlash(path) {
    return (/^\//.test(path) ? path : '/' + path
    );
}

// 解析参数
function separateParams(url) {
    var _url$split = url.split('?'),
        _url$split2 = (0, _slicedToArray3.default)(_url$split, 2),
        _url$split2$ = _url$split2[0],
        path = _url$split2$ === undefined ? '' : _url$split2$,
        _url$split2$2 = _url$split2[1],
        paramsLine = _url$split2$2 === undefined ? '' : _url$split2$2;

    var params = {};

    paramsLine.split('&').forEach(function (item) {
        var _item$split = item.split('='),
            _item$split2 = (0, _slicedToArray3.default)(_item$split, 2),
            key = _item$split2[0],
            value = _item$split2[1];

        params[key] = value;
    });

    return { path: path, params: params };
}

function request(config) {
    var method = config.method,
        url = config.url,
        _config$data = config.data,
        data = _config$data === undefined ? {} : _config$data;

    method = method && method.toUpperCase() || 'GET';

    var serverUrl = 'http://127.0.0.1:3000/';
    var finalUrl = serverUrl + url;

    return new _promise2.default(function (resolve, reject) {

        var options = {
            url: finalUrl,
            type: method,
            success: function success(response) {
                if (response.statusCode == '200') {
                    var _data = responseFormatter(response);
                    resolve(_data);
                }
            },
            error: function error(response) {
                reject(new Error('请求失败'));
            }
        };
        if (method === 'POST') {
            options.data = (0, _stringify2.default)(data);
            options.dataType = 'json';
        }

        _jquery2.default.ajax(options);
    });
}

// 主要请求方法
// export  function requestOrigin(config) {

//     const app = UP.W.App;
//     const ui = UP.W.UI;
//     const env = UP.W.Env;

//     let {method, url, data = {}, headers, forChsp, encrypt, byAjax, cache, update, storage} = config;

//     method = (method && method.toUpperCase()) || 'GET';

//     let serverUrl = getServUrl(url);

//     // let serverUrl = baseUrl ;
//     // if (true) {
//     /**
//      * 通过插件发送请求
//      */

//     /**
//      * 向服务器发送请求
//      * @param params 请求参数
//      *                  version：版本，默认是1.0
//      *                  source：来源，默认根据Android、iOS自动添加
//      *                  encrypt：是否加密，默认加密
//      *                  method：请求方法，POST或GET
//      *                  cmd：请求命令（也可自行将cmd组装至uri[优惠后台]或path[钱包后台]）
//      *                  uri/path：请求地址，建议仅填充cmd，不建议自行组装uri/path
//      *                  params：发送给后台的参数
//      *                  vid：如果通过Ajax方式向wallet后台发送请求需要携带vid
//      * @param forChsp 是否向优惠后台发送请求（默认向手机后台发送请求）
//      * @param byAjax 是否使用Ajax发送请求（默认使用控件）
//      * @param success 成功回调
//      * @param error 错误回调（业务错误）
//      * @param fail 失败回调（请求失败）
//      */
//     return new Promise((resolve, reject) => {
//         app.onPluginReady(() => {


//             let successCallback = (data,fuc) => {
//                 ui.dismiss();
//                 console.log("返回成功结果：")
//                 console.log(data)
//                 let req = responseFormatter(data);
//                 if( !!fuc ){
//                     req.fuc = fuc;
//                 }
//                 resolve(req)
//             }

//             let errorCallback = (err) => {
//                 console.log("返回失败结果：")
//                 ui.dismiss();
//                 console.log(err)

//                 if (url == CONFIG.REST.applyMcc || url == CONFIG.REST.applyMat || url == CONFIG.REST.todayMoney) {
//                     let req = responseFormatter(err);
//                     resolve(req)
//                 }
//                 else {
//                     Toast.info(err.msg || '查询业务要素出错，请稍后再试！');
//                 }
//             }

//             let networkCallback = (xhr) => {
//                 ui.dismiss();
//                 Toast.info(xhr.msg);
//             }


//             if (url != CONFIG.REST.getTodayIncome) {
//                 ui.showLoading();
//             }

//             if (!cache) {
//                 // console.log("Url:" + url)
//                 // console.log("Param:")
//                 // console.log({
//                 //     cmd: serverUrl + url,
//                 //     params: data,
//                 //     method: method,
//                 //     encrypt: encrypt,
//                 //     forChsp: forChsp,
//                 //     byAjax: byAjax
//                 // })
//                 console.log("发送非缓存请求")
//                 app.sendMessage(
//                     {
//                         cmd: serverUrl + url,
//                         // uri:serverUrl + url,
//                         params: data,
//                         method: method,
//                         encrypt: encrypt
//                     }, forChsp, byAjax, successCallback, errorCallback, networkCallback);
//             }
//             else {
//                 // console.log("CacheUrl:" + url)
//                 // console.log("storeage策略是:")
//                 // console.log(storage)
//                 // console.log("update函数:")
//                 // console.log(update)
//                 console.log("发送缓存请求")
//                 /**
//                  * 向服务器发送请求
//                  * @param params 请求参数
//                  *                  version：版本，默认是1.0
//                  *                  source：来源，默认根据Android、iOS自动添加
//                  *                  encrypt：是否加密，默认加密
//                  *                  method：请求方法，POST或GET
//                  *                  cmd：请求命令（也可自行将cmd组装至uri[优惠后台]或path[钱包后台]）
//                  *                  uri/path：请求地址，建议仅填充cmd，不建议自行组装uri/path
//                  *                  params：发送给后台的参数
//                  *                  vid：如果通过Ajax方式向wallet后台发送请求需要携带vid
//                  * @param forChsp 是否向优惠后台发送请求（默认向手机后台发送请求）
//                  * @param byAjax 是否使用Ajax发送请求（默认使用控件）
//                  * @param success 成功回调
//                  * @param error 错误回调（业务错误）
//                  * @param fail 失败回调（请求失败）
//                  * @param update 异步刷新回调 如果设置async为true后可以添加update回调 如果不填写默认以success进行处理
//                  * @param storage 缓存参数
//                  *                  needSw            //默认false大部分用的是插件需要的手动去加
//                  *                  storageType      //默认使用localstorage
//                  *                  async            //默认获取缓存后不发请求，改为true后会异步去请求后台并刷新数据
//                  *                  endOfSyncFunc    //todo 重要！！！！回调中如果存在异步（插件等）需要标明异步状态为true
//                  *                  validateTime     //有效期默认无限有效期 单位毫秒
//                  *                  saveWithId       //默认true以用户id进行存储否则false以local存储
//                  *                  saveSucc         //保存成功后的回调
//                  *                  saveErr          //保存失败后的回调
//                  *                  rollKey          //强制设置主键
//                  *                  secondKey        //强制设置次要键值
//                  *  todo 重要说明 调用异步模式（async设置为true）后可能在success回调里存在异步操作，该情况下回导致缓存的回调可能
//                  *  todo 未执行完成，请求的回调又开始执行了的情况，所以我们统一在success回调和update回调的入参增加了第二个参数
//                  *  todo 用于兼容回调内包含异步的状况，使用方法为：首先设置endOfSyncFunc参数为true,其次success和update回
//                  *  todo 调内会有2个入参，success（resp，fuc），请在代码闭包处使用fuc.endOfFunc()
//                  */

//                 let param = {}


//                 if (byAjax) {
//                     param = {
//                         path: serverUrl + url,
//                         cmd: "life/life",
//                         params: data,
//                         method: method,
//                         encrypt: encrypt
//                     }
//                 }
//                 else {
//                     param = {
//                         cmd: serverUrl + url,
//                         // uri:serverUrl + url,
//                         params: data,
//                         method: method,
//                         encrypt: encrypt
//                     }
//                 }

//                 app.sendMessageWithStorage(param, forChsp, byAjax, successCallback, errorCallback, networkCallback, storage, update);
//             }

//         })
//     })


//     // }
//     // else {

//     /**
//      * 通过Ajax 发送请求
//      */
//     // return axios({
//     //     url: baseUrl + url,
//     //     method,
//     //     headers,
//     //     data: method === 'GET' ? undefined : data,
//     //     params: Object.assign(method === 'GET' ? data : {}, params)
//     // }).then((response) => {
//     //
//     //     let req = {
//     //         statusCode: response.data.resp,
//     //         data: response.data.params
//     //     }
//     //     return Promise.resolve(req)
//     // }).catch(err => {
//     //     // 请求出错
//     //     Toast.info('request error, HTTP CODE: ' + err.response.status);
//     //     return Promise.reject(err);
//     // });
//     // }

// }

// 一些常用的请求方法
var get = exports.get = function get(url, data) {
    var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var paramAll = (0, _assign2.default)({ forChsp: true, encrypt: true, cache: false, byAjax: false }, param);
    return request((0, _assign2.default)({ url: url, data: data }, paramAll));
};
var post = exports.post = function post(url, data) {
    var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var paramAll = (0, _assign2.default)({ forChsp: true, encrypt: true, cache: false, byAjax: false }, param);
    return request((0, _assign2.default)({ method: 'POST', url: url, data: data }, paramAll));
};
var put = exports.put = function put(url, data) {
    return request({ method: 'PUT', url: url, data: data });
};
var del = exports.del = function del(url, data) {
    return request({ method: 'DELETE', url: url, data: data });
};

/***********************************************************************************************
 *
 * 功能函数区
 *
 ************************************************************************************************/

/**
 * 将URL中的search 字符串 转换成 对象
 * @param search
 * @returns {{}}
 */
var getSearchParam = exports.getSearchParam = function getSearchParam(search) {
    if (!!search) {
        var str = search.slice(1);
        var array = str.split("&");
        var obj = {};
        array.forEach(function (item) {
            var param = item.split("=");
            obj[param[0]] = param[1];
        });
        return obj;
    } else {
        return {};
    }
};

/***********************************************************************************************
 *
 * codova 插件调用区
 *
 ************************************************************************************************/

// 启停收款码
function setXiaoWeiPay(param, suc, err) {
    var app = UP.W.App;
    app.setXiaoWeiPay(param, suc, err);
}

//小微audio
var setXiaoWeiAudio = exports.setXiaoWeiAudio = function setXiaoWeiAudio(param, suc, err) {
    var app = UP.W.App;
    app.setXiaoWeiAudio(param, suc, err);
};
var getXiaoWeiAudio = exports.getXiaoWeiAudio = function getXiaoWeiAudio(suc, err) {
    var app = UP.W.App;
    app.getXiaoWeiAudio(suc, err);
};

var toast = exports.toast = function toast(ms) {
    _toast2.default.info(ms, 2);
};
/**
 * 设置顶部bar
 * @param title 页面名称
 * @param rightBar 右侧按钮名称
 * @param rightCallback 右侧按钮回调
 * @param rightBarImg 右侧按钮图片
 */
var beforeEnterRouter = exports.beforeEnterRouter = function beforeEnterRouter() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var rightBar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var rightCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var rightBarImg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    document.title = title;
    var app = UP.W.App;
    app.onPluginReady(function () {
        app.setNavigationBarTitle(title);
        /**
         * 设置窗口右侧按钮
         * @param title 图标标题
         * @param image 图标文件
         * @param handler 点击回调函数
         */
        if (!!rightCallback) {
            app.setNavigationBarRightButton(rightBar, rightBarImg, rightCallback);
        } else {
            app.setNavigationBarRightButton("", null, null);
        }
    });
};

/**
 * 通知客户端修改状态
 */
var mccStateChanged = exports.mccStateChanged = function mccStateChanged() {
    var app = UP.W.App;
    app.onPluginReady(function () {
        app.mccStateChanged();
    });
};

var sendQrCode = exports.sendQrCode = function sendQrCode(params, success, fail) {
    var app = UP.W.App;
    app.onPluginReady(function () {
        /**
         * 扫描条码和二维码
         * @param params
         * @param success
         * @param fail
         */
        app.scanQRCode(params, success, fail);
    });
};

var closeWebView = exports.closeWebView = function closeWebView() {
    var app = UP.W.App;
    app.closeWebView();
};

var verifyPayPwd = exports.verifyPayPwd = function verifyPayPwd(param, success, fail) {
    var app = UP.W.App;
    app.verifyPayPwd(param, success, fail);
};

var createWebView = exports.createWebView = function createWebView(url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var isFinish = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "1";

    var app = UP.W.App;
    app.createWebView(url, params, title, isFinish);
};

var getUserDetailInfo = exports.getUserDetailInfo = function getUserDetailInfo(success, fail) {
    var app = UP.W.App;
    app.onPluginReady(function () {
        app.getUserDetailInfo(success, fail);
    });
};
/**
 * 将cavas 保存到本地相册
 * @param canvas
 */
var saveQcode = exports.saveQcode = function saveQcode(canvas) {
    var app = UP.W.App;
    var ui = UP.W.UI || {};
    var picUrl = canvas.toDataURL();
    app.onPluginReady(function () {
        app.logEvent('savePicture_NewYearAct');
        app.savePicToLocal({
            url: picUrl && picUrl.substr(22)
        }, function () {
            ui.showToastWithPic('已保存到系统相册');
        }, function (msg) {
            if (msg == 'update') {
                ui.showAlert('请升级到最新客户端', function () {
                    // 去升级
                    app.logEvent('update_signAct', 'Yes');
                    var url = '';
                    if (env.isIOS) {
                        url = 'https://itunes.apple.com/cn/app/id600273928?code=newYearActivity';
                    } else {
                        url = 'https://youhui.95516.com/app/app/software/unionpay-wallet-v2.apk?code=newYearActivit';
                    }
                    app.openBrowser(url);
                }, function () {
                    app.logEvent('update_signAct', 'No');
                }, '马上升级', '稍后再说', '保存失败');
            } else {
                ui.showToast(msg || '保存失败');
            }
        });
    });
};

var share = exports.share = function share(title, desc, imgURL, pageURl) {
    var app = UP.W.App;
    var env = UP.W.Env || {};

    app.onPluginReady(function () {

        /**
         * 显示分享面板
         * 如果所有渠道使用相同的分享内容则仅填写params即可，
         * 如果需要根据不同渠道定制分享内容，则可params留空，在shareCallback中返回指定渠道的分享内容
         * @param params 分享参数
         *              {
         *                  title： 分享标题
         *                  desc: 分享摘要
         *                  picUrl：分享图标
         *                  shareUrl：详情地址
         *              }
         * @param shareCallback 分享时回调
         *              channel：{
         *                  0：短信
         *                  1：新浪微博
         *                  3：微信好友
         *                  4：微信朋友圈
         *                  5：QQ好友
         *                  6：QQ空间
         *                  7：复制链接
         *              }
         *              data: 默认分享数据
         */
        app.showSharePanel({
            title: title,
            desc: desc,
            picUrl: imgURL,
            shareUrl: pageURl // todo 普通分享
        }, null);
    });
};

/**
 * 获取用户的定位，首先通过GPS 定位，如果定位失败，通过接口getCity,利用IP地址进行定位，如果还是失败，通过插件获取客户端左上角的城市信息，依然失败默认穿cityCd:310000 代表上海市
 * @param callback
 */
var getCurrentLocationInfo = exports.getCurrentLocationInfo = function getCurrentLocationInfo(callback2) {
    var ui = UP.W.UI;
    ui.showLoading();
    var callback = function callback(data) {
        ui.dismiss();
        callback2(data);
    };
    var app = UP.W.App;
    app.onPluginReady(function () {
        app.getCurrentLocationInfo(function (data) {
            // alert(JSON.stringify(data))
            callback(data);
        }, function () {

            app.sendMessage({
                cmd: "/" + _config2.default.REST.getCity,
                // path: "http://172.21.33.56:36000/youhui-web/restlet/"+CONFIG.REST.getCity,
                params: {
                    version: "2.0",
                    source: "2"
                },
                method: "GET",
                encrypt: false
            }, true, false, function (data) {
                console.log(data.params);
                callback(data.params);
            }, function (err) {
                fetchNativeData(callback);
            }, function (xhr) {
                fetchNativeData(callback);
            });
        });
    });
};

var fetchNativeData = exports.fetchNativeData = function fetchNativeData(callback) {
    var app = UP.W.App;
    app.onPluginReady(function () {

        /**
         * 获取客户端信息
         * @param success
         * @param fail
         * @param type 0：城市信息cityCd；1：经纬度；5：UserId
         */
        app.fetchNativeData(0, function () {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            console.log(data);
            callback(data);
        }, function () {
            callback({
                cityCd: "310000"
            });
        });
    });
};
var savePicToLocal = exports.savePicToLocal = function savePicToLocal(canvas, resolve) {
    var app = UP.W.App;
    var ui = UP.W.UI || {};
    var picUrl = canvas.toDataURL();
    app.onPluginReady(function () {
        app.savePicToLocal({
            url: picUrl && picUrl.substr(22)
        }, function () {
            //成功
            !!resolve && resolve("success");
        }, function (msg) {
            if (msg == 'update') {
                ui.showAlert('请升级到最新客户端', function () {
                    // 去升级
                    app.logEvent('update_signAct', 'Yes');
                    var url = '';
                    if (env.isIOS) {
                        url = 'https://itunes.apple.com/cn/app/id600273928?code=newYearActivity';
                    } else {
                        url = 'https://youhui.95516.com/app/app/software/unionpay-wallet-v2.apk?code=newYearActivit';
                    }
                    app.openBrowser(url);
                }, function () {
                    app.logEvent('update_signAct', 'No');
                }, '马上升级', '稍后再说', '保存失败');
            } else {
                !!resolve && resolve("fail");
            }
        });
    });
};

var createTextCanvase = exports.createTextCanvase = function createTextCanvase(text, color) {
    var long = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 684;
    var shot = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 60;


    var rem2px = function rem2px(val) {
        var cWidth = document.documentElement.clientWidth;
        return val * cWidth / 750;
    };
    var canvas = document.getElementById('textCanvas');
    var ctx = canvas.getContext('2d');

    //設置畫佈的寬高
    // var bgWidth = rem2px(long);
    // var bgHeight = rem2px(shot);

    canvas.setAttribute('width', shot);
    canvas.setAttribute('height', long);

    canvas.width = canvas.width;
    ctx.rotate(-90 * Math.PI / 180);
    var text = text;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    var fontSize = shot;
    ctx.font = fontSize + 'px Airal';
    while (ctx.measureText(text).width > long) {
        fontSize--;
        ctx.font = fontSize + 'px Airal';
    }
    ctx.fillText(text, -long, fontSize);
    return canvas.toDataURL("image/png");
};

/**
 * 生成图片并保存到相册
 * @param bgurl 背景图片的地址
 * @param qrcodeURL 二维码的地址
 * @param qrcodeWdAndHg 二维码的宽度
 * @param xWidth 二维码距离左上角的 → 方向的偏移量
 * @param yHeight 二维码距离左上角的 ↓ 方向的偏移量
 * @param textbgURL 加入画布的图片的URL
 * @param xTextWidth 加入画布的图片距离左上角的 ↓ 方向的偏移量
 * @param yTextHeight 加入画布的图片距离左上角的 ↓ 方向的偏移量
 */

var createConvasAndSavePhoto = exports.createConvasAndSavePhoto = function createConvasAndSavePhoto(canvasObj, resolve) {
    var bgurl = canvasObj.bgurl,
        qrcodeURL = canvasObj.qrcodeURL,
        qrcodeWdAndHg = canvasObj.qrcodeWdAndHg,
        xWidth = canvasObj.xWidth,
        yHeight = canvasObj.yHeight,
        textbgURL = canvasObj.textbgURL,
        xTextWidth = canvasObj.xTextWidth,
        yTextHeight = canvasObj.yTextHeight;

    var canvas = document.getElementById('commonCanvasWrapper');
    /**
     * 清除画布内容
     */
    canvas.width = canvas.width;
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = bgurl;
    img.onload = function () {

        //設置畫佈的寬高
        canvas.setAttribute('width', img.width);
        canvas.setAttribute('height', img.height);

        //在畫布上畫背景圖
        ctx.drawImage(img, 0, 0);

        if (!!textbgURL) {
            var textUri = textbgURL;
            var textImg = new Image();
            textImg.src = textUri;
            textImg.onload = function () {
                ctx.drawImage(textImg, xTextWidth, yTextHeight);
            };
        }

        //二維碼圖片大小
        var qrcodeWidthAndHeight = qrcodeWdAndHg;
        //清除二维码
        document.getElementById("commonQrcode").innerHTML = "";
        var qrcode = new QRCode(document.getElementById("commonQrcode"), {
            text: qrcodeURL,
            height: qrcodeWidthAndHeight,
            width: qrcodeWidthAndHeight,
            correctLevel: QRCode.CorrectLevel.L
        });
        var qrcodeImg = document.getElementById("commonQrcode").getElementsByTagName('img')[0];
        qrcodeImg.onload = function () {
            //畫二維碼的圖片
            var qrcodeDx = xWidth,
                qrcodeDy = yHeight;
            ctx.drawImage(qrcodeImg, qrcodeDx, qrcodeDy);
            // resolve();
            savePicToLocal(canvas, resolve);
        };
    };
};

/***/ }),

/***/ "8653d9474e130320c382":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    REST: {
        applyMcc: "collectionCode/applyMcc", //2.4.4申请收款码接口
        getMccCardList: "collectionCode/getMccCardList", //2.4.2商户收款码卡列表接口
        applyMat: "collectionCode/applyMat", //申请物料接口
        getMchntAndAreaInf: "mchnt/getMchntAndAreaInf.sjson", //商户类型及地区列表查询
        upgradeMcc: "collectionCode/upgradeMcc", //2.4.6升级收款码接口,
        getAddrList: "address/getAddrList", //2.4.13 获取收货地址列表
        deleteAddress: "address/deleteAddress", //2.4.12 删除收货地址
        editAddress: "address/editAddress", //2.4.11 修改收货地址,
        newAddress: "address/newAddress", //2.4.10 新增收货地址
        mchntOper: "mchnt/mchntOper", //2.2.2 店铺信息更新
        getLimitAtInfo: "mchnt/getLimitAtInfo", //获取收款限额
        setMccOnOff: "collectionCode/setMccOnOff", //停止和启用付款码借口
        getMchntDetail: "mchnt/mchntDetail", //2.2.1 获取店铺详情页面
        // upgradeMcc: "collectionCode/upgradeMcc", //2.4.6升级收款码接口
        getTodayTrans: "tran/getTodayTrans", //2.1.3//今日订单接口
        getTodayIncome: "tran/getTodayIncome", //2.1.1商户服务首页今日收款接口~~~~~~~~
        getHistoryIncome: "tran/getHistoryIncome", //2.1.2历史收款接口
        getHistoryTrans: "tran/getHistoryTrans", //2.1.4历史订单接口
        getLogisticsSt: "materiel/getLogisticsSt", //2.3.3物流详情接口查询
        getTransDetilByVoucherNum: "tran/getTransDetilByVoucherNum", //2.1.5单笔订单查询接口
        getAuditInfo: "collectionCode/getAuditInfo", //2.4.14信用卡升级审核结果查询
        updateMccCard: "collectionCode/updateMccCard", //2.4.9更换收款卡接口
        getUpgradeSt: "mchnt/getUpgradeSt", //查询商户是否升级信用卡收款
        getMccTransNum: 'collectionCode/getMccTransNum', //获取调取支付控件的TN号
        getMaterielInfoList: "collectionCode/getMaterielInfoList", //2.4.3物料信息列表接口
        userInfo: "/app/inApp/user/get", //获取用户信息
        isBlack: "scan/isBlack", //2.1.5收银员是否在黑名单
        isApply: "scan/isApply", //2.1.4是否已经申请红包码
        shareLink: "scan/shareLink", //2.1.6生成红包码链接
        recmdRecord: "scan/recmdRecord", //推荐关系记录
        getLogisticsList: "materiel/getLogisticsList", //获取物料历史订单
        getRewardList: "scan/getRewardList", //2.1.7查询收银员赏金明细记录
        getProtocolInfo: "collectionCode/getProtocolInfo", //商户升级查询显示协议的名称和协议的地址
        getCity: "region/getCity", //通过IP地址获取地址定位
        getQrUrl: "collectionCode/getQrInfo" //2.1.1获取用户收款码URL
    },
    STATUSCODE: {
        SUCCESS: "00"
    },
    CONST_DATA: {
        imgeSize: "300"
    },
    CACHEKEY: {
        getMccCardList: {
            rollKey: "xvsh-collectionCode/getMccCardList",
            secondKey: "xvsh-collectionCode/getMccCardList"
        },
        UpdateCreditCollectMoneySt: {
            rollKey: "xvsh-mchnt/getUpgradeSt",
            secondKey: "xvsh-mchnt/getUpgradeSt"
        },
        getMchntDetail: {
            rollKey: "xvsh-mchnt/mchntDetail",
            secondKey: "xvsh-mchnt/mchntDetail"
        },
        isApply: {
            rollKey: "xvsh-scan/isApply",
            secondKey: "xvsh-scan/isApply"
        },
        getAddrList: {
            rollKey: "xvsh-address/getAddrList",
            secondKey: "xvsh-address/getAddrList"
        }
    }
};
exports.default = config;

/***/ }),

/***/ "8688ab3c6978d6c41524":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeCache = exports.staleWhileRevalidateStorage = exports.responseFormatter = exports.cacheFirstStorage = exports.cacheFirst = undefined;

var _immutable = __webpack_require__("044048593bef2c4c544f");

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// /**
//  * 只使用localStorage缓存
//  * 先读缓存，同步往后台发请求，请求报文回来后刷新缓存及页面
//  * @type {{byAjax: boolean, needSw: boolean, validateTime: number}}
//  */
// export const staleWhileRevalidateStorage = (update,rollKey,secondKey) => {
//     return {
//         cache: true,
//         storage: {
//             async: true,
//             rollKey,
//             secondKey
//         },
//         update: update,
//     }
// }
//
// /**
//  * 不支持 sw   ,永久緩存
//  * @type {{cache: boolean, needSw: boolean}}
//  */
// export const cacheLongTime = (rollKey, secondKey) => {
//     return {
//         cache: true,
//         storage: {
//             needSw: false,
//             rollKey,
//             secondKey
//         }
//     }
// }
//
// /**
//  * 只使用localStorage缓存
//  * 1分钟内不重复调用,只讀緩存
//  * @type {{byAjax: boolean, needSw: boolean, validateTime: number}}
//  */
// export const cacheStorage1min = {
//     cache: true,
//     storage: {
//         needSw: false,
//         validateTime: 60 * 1000,
//     }
// }
//
// export const cacheStorage30min = {
//     cache: true,
//     storage: {
//         needSw: false,
//         validateTime: 30 * 60 * 1000,
//     }
// }
// export const cacheStorage1hour = {
//     cache: true,
//     storage: {
//         needSw: false,
//         validateTime: 60 *60*1000,
//     }
// }
// export const cacheStorage2hour = {
//     cache: true,
//     storage: {
//         needSw: false,
//         validateTime: 2 * 60 * 60 * 1000,
//     }
// }
//

//
// export const cacheStorage24dian = () => {
//
//     let now = new Date().getTime();
//     let temorrow = new Date();
//     temorrow.setHours(23);
//     temorrow.setMinutes(59);
//     temorrow.setSeconds(59);
//     let tem = temorrow.getTime();
//     let validateTime = tem - now + 1000 * 60
//     return {
//         cache: true,
//         storage: {
//             needSw: false,
//             validateTime: validateTime,
//         }
//     }
// }
//
// /*********************************  workbox的策略   ****************************/
//
// /**
//  *为get请求，不加密
//  *支持sw的设备，使用sw，不支持的使用localStorage缓存
//  *先读缓存，同时往后台发请求，请求报文回来后刷新缓存及页面
//  * @type {{byAjax: boolean, cache: boolean, async: boolean}}
//  */
// export const staleWhileRevalidate = (update) => {
//     return {
//         byAjax: false,//如果要支持sw 就不需使用ajax
//         // cache: true,
//         storage: {
//             async: true,
//         },
//         update: update
//     }
// }
//
// /**
//  * 支持sw的设备，使用sw，不支持的使用localStorage缓存
//  * 30分钟内不重复调用,只讀緩存
//  * @type {{byAjax: boolean, needSw: boolean, validateTime: number}}
//  */
// export const cacheFirst30min = {
//     byAjax: false,
//     // cache: true,
//     storage: {
//         validateTime: 30 * 60 * 1000,
//     }
// }
//
//
// /**
//  * 支持sw的设备，使用sw，不支持的使用localStorage缓存
//  * 1小時内不重复调用,只讀緩存
//  * @type {{byAjax: boolean, needSw: boolean, validateTime: number}}
//  */
// export const cacheFirst1hour = {
//     byAjax: false,
//     // cache: true,
//     storage: {
//         validateTime: 60 * 60 * 1000,
//     }
// }
// export const cacheFirst2hour = {
//     byAjax: false,
//     // cache: true,
//     storage: {
//         validateTime: 2 * 60 * 60 * 1000,
//     }
// }
//
/**
 * 该策略是一定时间内不向后台请求数据， 如果在设备上支持sw则使用sw,否则使用 localStorage
 * @param time  要缓存的时间 单位是毫秒
 * @returns {{byAjax: boolean, forChsp: boolean, encrypt: boolean, cache: boolean, storage: {validateTime: *}}}
 */
var cacheFirst = exports.cacheFirst = function cacheFirst(time) {
    return {
        byAjax: true,
        forChsp: false,
        encrypt: false,
        cache: true,
        storage: {
            validateTime: time
        }
    };
};

/**
 *  该策略是一定时间内不向后台请求数据，添加缓存只在localstorage中
 * @param time  要缓存的时间 单位是毫秒
 * @param rollKey   非必填 如果后期要删除这个缓存，这填写这key
 * @param secondKey  非必填 如果后期要删除这个缓存，这填写这key
 * @returns {{cache: boolean, storage: {needSw: boolean, validateTime: *, rollKey: *, secondKey: *}}}
 */
var cacheFirstStorage = exports.cacheFirstStorage = function cacheFirstStorage(time, rollKey, secondKey) {
    return {
        cache: true,
        storage: {
            needSw: false,
            validateTime: time,
            rollKey: rollKey,
            secondKey: secondKey
        }
    };
};

var responseFormatter = exports.responseFormatter = function responseFormatter(data) {
    var res = {
        statusCode: data.resp,
        data: data.params,
        msg: data.msg
    };

    return res;
};

/**
 * 该策略是先读缓存，同时向后台发送请求，请求回来后同步更新缓存，回调update 函数，
 * @param update 必填更新页面的回调函数
 * @param rollKey  非必填 设置缓存的 rollkey
 * @param secondKey 非必填 设置缓存的 secondKey
 * @returns {{cache: boolean, storage: {async: boolean, rollKey: *, secondKey: *}, update: *}}
 */
var staleWhileRevalidateStorage = exports.staleWhileRevalidateStorage = function staleWhileRevalidateStorage(update, rollKey, secondKey) {

    var refreshDomFunc = function refreshDomFunc(response) {
        var req = responseFormatter(response);
        // 将获取的数据和缓存中的数据进行对比
        var dataFromCache = {};
        UP.W.Util.getFromStorage({
            rollKey: rollKey,
            secondKey: secondKey
        }, function (data) {
            if (!!data) {
                dataFromCache = data;
            }
        }, function () {
            UP.W.Util.removeStorage({
                rollKey: rollKey,
                secondKey: secondKey
            });
        });
        var isSameAtAll = _immutable2.default.is(_immutable2.default.fromJS(req), _immutable2.default.fromJS(dataFromCache)); //数据是否完全相同
        if (!isSameAtAll) {
            //数据有变动
            update(req);
        }
    };
    return {
        cache: true,
        storage: {
            async: true,
            endOfSyncFunc: false,
            rollKey: rollKey,
            secondKey: secondKey
        },
        update: refreshDomFunc
    };
};

/**
 * 删除localstorage中的缓存
 * @param rollKey
 * @param secondKey
 */
var removeCache = exports.removeCache = function removeCache(rollKey, secondKey) {
    UP.W.Util.removeStorage({
        rollKey: rollKey,
        secondKey: secondKey
    }, function () {
        console.log('删除缓存成功');
    }, function () {
        UP.W.Util.removeStorage({
            full: true
        });
    });
};

/***/ }),

/***/ "8e0c1db00085c8ad255a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("5d1068788c8158502382");
var newPromiseCapability = __webpack_require__("c1b94e3e95ed435af540");
var perform = __webpack_require__("cb78375294542c24c5ba");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "973cc8eefc59931de95e":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("31f0b6437ca2ac6622fe");
__webpack_require__("666e0b794582d53894ee");
__webpack_require__("3e71833d67eff32178f6");
__webpack_require__("fa987d811e4eb2d43d9c");
__webpack_require__("c2e35bbff833095943c1");
__webpack_require__("8e0c1db00085c8ad255a");
module.exports = __webpack_require__("91d9e3da5180694da5dd").Promise;


/***/ }),

/***/ "aa963b4c27144f094cca":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("e9bd0ce2843722ddc7e3");
var invoke = __webpack_require__("b580b94b195842cbf2b0");
var html = __webpack_require__("eaa87696d1f8c297f1b4");
var cel = __webpack_require__("116d56d8ce15b7350b04");
var global = __webpack_require__("e044a82d1d9b0444627b");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("0de572c53e7bf26f2ba2")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "b50d82456e545dcc3dd3":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("e2cf04d7ed5fdb33fb87");
var aFunction = __webpack_require__("a49e09eeb3d95ed6b805");
var SPECIES = __webpack_require__("4a88bf6bd245e3166736")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "b580b94b195842cbf2b0":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "bde0f57e9b579f943f84":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e044a82d1d9b0444627b");
var macrotask = __webpack_require__("aa963b4c27144f094cca").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("0de572c53e7bf26f2ba2")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "c1b94e3e95ed435af540":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("a49e09eeb3d95ed6b805");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "c2e35bbff833095943c1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("5d1068788c8158502382");
var core = __webpack_require__("91d9e3da5180694da5dd");
var global = __webpack_require__("e044a82d1d9b0444627b");
var speciesConstructor = __webpack_require__("b50d82456e545dcc3dd3");
var promiseResolve = __webpack_require__("f0dbc10c68dd814014e7");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "cb78375294542c24c5ba":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "d1810ae5332e36ffa3c4":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("21dfac28523ae37dac5b"), __esModule: true };

/***/ }),

/***/ "ec6cbe317b9850b05ce5":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e044a82d1d9b0444627b");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "edceccc18f8c26d9b4e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__("251bc7afe8127e09149d");

var _promise2 = _interopRequireDefault(_promise);

exports.collectDetailOrder = collectDetailOrder;

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function collectDetailOrder(day) {
    var latedate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    /**
     * 是否是滚动加载 滚动的话就要把数据的响应回来的数据的最后一个时间传给后台
     */
    var param = void 0;
    if (!!latedate) {
        param = { transTm: latedate, intervalDay: day };
    } else {
        param = { intervalDay: day };
    }

    /**
     * 判断接口是今日收款还是历史收款
     */
    if (day != '0') {
        return (0, _requestAPI.getHistoryTrans)(param).then(function (res) {
            (0, _requestAPI.getHistoryIncome)({ intervalDay: day });
            var newList = res.data.transInfo;
            return _promise2.default.resolve(newList);
        });
    } else {
        return (0, _requestAPI.getTodayTrans)(param).then(function (res) {
            (0, _requestAPI.getTodayIncome)();
            var newList = res.data.transInfo;
            return _promise2.default.resolve(newList);
        });
    }
}

/***/ }),

/***/ "eeb4eea98cf1136fda3c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__("7474e09206d6df50164e");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("8a4a7a62a26b8f064358");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("acab2ae8d55fd58113d8");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("0bf817924258aa08734c");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("de6bd889b0c636aa995b");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("aa675f1299ad16c8424c");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("8af190b70a6bc55c6f1b");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__("0a81c721557e72a0975d");

var _CollectionDetailsActions = __webpack_require__("edceccc18f8c26d9b4e7");

var _request = __webpack_require__("76fb50331ac78bf18670");

var _CollectionDetails = __webpack_require__("4d5efb0a44c218859eb2");

var _CollectionDetails2 = _interopRequireDefault(_CollectionDetails);

var _store = __webpack_require__("729bd0f3009c1858d0f9");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__("5d4604b08304c597d074");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollectionDetailsContainers = function (_Component) {
    (0, _inherits3.default)(CollectionDetailsContainers, _Component);

    function CollectionDetailsContainers(props) {
        (0, _classCallCheck3.default)(this, CollectionDetailsContainers);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CollectionDetailsContainers.__proto__ || (0, _getPrototypeOf2.default)(CollectionDetailsContainers)).call(this, props));

        _this.tableCLickHandler = function (val) {
            if (val != _this.state.tabDayVal) {
                if (val == "0") {
                    _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                        todayOrderList: []
                    }));
                } else {
                    _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                        historyOrderList: []
                    }));
                }
                _this.setState({
                    tabDayVal: val,
                    lastDate: null,
                    bottomText: '加载中...',
                    hasMore: true
                }, function () {
                    _this.getMoreData();
                });
            }
        };

        _this.getMoreData = function () {
            var _this$state = _this.state,
                tabDayVal = _this$state.tabDayVal,
                lastDate = _this$state.lastDate;

            return (0, _CollectionDetailsActions.collectDetailOrder)(tabDayVal, lastDate).then(function (list) {
                console.log(list);
                if (list.length >= 10) {
                    lastDate = list[list.length - 1].transTm;
                    _this.setState({
                        hasMore: true,
                        lastDate: lastDate
                    });
                } else {
                    _this.setState({
                        hasMore: false,
                        bottomText: '暂无更多数据~~'
                    });
                }
            });
        };

        _this.state = {
            tabDayVal: "0",
            lastDate: null,
            bottomText: '加载中...',
            hasMore: true
        };
        return _this;
    }

    (0, _createClass3.default)(CollectionDetailsContainers, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _request.beforeEnterRouter)("收款明细");
            this.getMoreData();
        }

        /**
         * tab切换选择不同的历史时间
         * @param val
         */


        /**
         * 触发滚动执行此函数
         */

    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_CollectionDetails2.default, (0, _extends3.default)({}, this.props, this.state, { tableCLickHandler: this.tableCLickHandler, getMoreData: this.getMoreData }));
        }
    }]);
    return CollectionDetailsContainers;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {
    return {
        todayIncomeObj: state.getIn(["todayIncomeObj"]).toJS(),
        historyIncomeObj: state.getIn(["historyIncomeObj"]).toJS(),
        todayOrderList: state.getIn(["todayOrderList"]).toJS(),
        historyOrderList: state.getIn(["historyOrderList"]).toJS()
    };
};

exports.default = (0, _reactRedux.connect)(mapstateToProps)(CollectionDetailsContainers);

/***/ }),

/***/ "ef51d4989f3044b2eb33":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__("d1810ae5332e36ffa3c4");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__("3c24d38ffcd0c38e3477");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),

/***/ "f0dbc10c68dd814014e7":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e2cf04d7ed5fdb33fb87");
var isObject = __webpack_require__("dea1d98bceb46441c38b");
var newPromiseCapability = __webpack_require__("c1b94e3e95ed435af540");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "fa987d811e4eb2d43d9c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("23bb3cc0c2767e99d794");
var global = __webpack_require__("e044a82d1d9b0444627b");
var ctx = __webpack_require__("e9bd0ce2843722ddc7e3");
var classof = __webpack_require__("468b0a4631cfd44380cf");
var $export = __webpack_require__("5d1068788c8158502382");
var isObject = __webpack_require__("dea1d98bceb46441c38b");
var aFunction = __webpack_require__("a49e09eeb3d95ed6b805");
var anInstance = __webpack_require__("28cff86e1d51ebf21f7f");
var forOf = __webpack_require__("5e59b71b33a38c3618e7");
var speciesConstructor = __webpack_require__("b50d82456e545dcc3dd3");
var task = __webpack_require__("aa963b4c27144f094cca").set;
var microtask = __webpack_require__("bde0f57e9b579f943f84")();
var newPromiseCapabilityModule = __webpack_require__("c1b94e3e95ed435af540");
var perform = __webpack_require__("cb78375294542c24c5ba");
var userAgent = __webpack_require__("ec6cbe317b9850b05ce5");
var promiseResolve = __webpack_require__("f0dbc10c68dd814014e7");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("4a88bf6bd245e3166736")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("14dc1f7ebd80d15bfd34")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("7aa97d4ddcfdcfbfd21a")($Promise, PROMISE);
__webpack_require__("5e7491f1f799715eac75")(PROMISE);
Wrapper = __webpack_require__("91d9e3da5180694da5dd")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("bbe63ac6275d7c004207")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "fb2f049dfcee4dce3cc8":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"clearfix":"clearfix","dn":"dn","CollectionDetailsContain":"CollectionDetailsContain","curDate":"curDate","date":"date","curMoney":"curMoney","curMoneyLeft":"curMoneyLeft","receiveMoney":"receiveMoney","receiveNum":"receiveNum","curMoneyRight":"curMoneyRight","order":"order","orderNum":"orderNum","curNoDate":"curNoDate","loading":"loading","loadingBg":"loadingBg","CollectMoneyListBox":"CollectMoneyListBox","CollectMoneyList":"CollectMoneyList","item":"item","payMonerNum":"payMonerNum","bottomLine":"bottomLine","cardNum":"cardNum","CollectMoney":"CollectMoney","moneyLeft":"moneyLeft","timeRight":"timeRight","money":"money","time":"time","notAvailable":"notAvailable","dateTabs":"dateTabs","active":"active","specialClass":"specialClass"};

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25EZXRhaWxzL0NvbGxlY3Rpb25EZXRhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbkRldGFpbHMvQ29sbGVjdGlvbkRldGFpbHNBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25EZXRhaWxzL0NvbGxlY3Rpb25EZXRhaWxzQ29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbkRldGFpbHMvQ29sbGVjdGlvbkRldGFpbHMuc2NzcyJdLCJuYW1lcyI6WyJyZWNtZFJlY29yZCIsInNoYXJsaW5rIiwiaXNCbGFjayIsImlzQXBwbHkiLCJhcHBseU1jYyIsImdldENhcmRsaXN0IiwiZ2V0QWRkckxpc3QiLCJhcHBseU1hdCIsImdldFFyVXJsUmVzdCIsImdldE1jaG50QW5kQXJlYUluZiIsImdldE1jaG50RGV0YWlsIiwidXBncmFkZU1jYyIsImdldFByb3RvY29sSW5mbyIsImdldEhpc3RvcnlJbmNvbWUiLCJnZXRIaXN0b3J5VHJhbnMiLCJnZXRUb2RheUluY29tZSIsImdldFRvZGF5VHJhbnMiLCJnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtIiwiZ2V0TG9naXN0aWNzU3QiLCJnZXRVcGdyYWRlU3QiLCJnZXRMb2dpc3RpY3NMaXN0IiwiZ2V0QXVkaXRJbmZvIiwiZ2V0TGltaXRBdEluZm8iLCJtY2hudE9wZXIiLCJkZWxldGVBZGRyZXNzIiwidXBkYXRlTWNjQ2FyZCIsIm5ld0FkZHJlc3MiLCJlZGl0QWRkcmVzcyIsInNldE1jY09uT2ZmIiwiZ2V0TWNjVHJhbnNOdW0iLCJwaG9uZSIsInVuZGVmaW5lZCIsInJlY21kTW9iaWxlIiwiVXRpbCIsImJhc2U2NEVuY29kZSIsIkNPTkZJRyIsIlJFU1QiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwiU1RBVFVTQ09ERSIsIlNVQ0NFU1MiLCJyb2xsS2V5IiwiQ0FDSEVLRVkiLCJzZWNvbmRLZXkiLCJmdWxsIiwicmVzb2x2ZSIsInNoYXJlTGluayIsInJlZFVybFN0ciIsImRhdGEiLCJpZGVudGlmaWVyIiwibmV4dFN0YXRlIiwic3RvcmUiLCJkaXNwYXRjaCIsInVwZGF0ZSIsInVwZGF0ZUZ1bmMiLCJyZXNwIiwiYmxhY2tTdCIsImNvbnNvbGUiLCJsb2ciLCJjYWNoZVBhcmFtIiwiYXBwbHlTdCIsInBhcmFtIiwicmVmZXJlZVRlbCIsInZpcnR1YWxDYXJkTm8iLCJhY2NObSIsImNpdHlDZCIsImNvbW9tUGFyYW0iLCJnZXRNY2NDYXJkTGlzdCIsImNhcmRMaXN0IiwibGVuZ3RoIiwiZGVmYWx1dENhcmQiLCJiYW5rIiwiY2FyZFR5cGUiLCJmdW5jdGlvbkJpdG1hcCIsImljb25SZWxVcmwiLCJpc1N1cHBvcnQiLCJwYW4iLCJyYW5rIiwic2VsZWN0ZWQiLCJmb3JFYWNoIiwiaXRlbSIsImsiLCJzdG9yZVN0YXRlIiwic3RvcmVSZWNlaXZlQ2FyZE9iaiIsInN0YXRlIiwiYWRkcmVzc0xpc3QiLCJyZXN1bHQiLCJtYXRlcmlhbExpc3QiLCJkZWxpdk5tIiwiYWRkQWxsIiwiZGVsaXZQaG9uZSIsInByb3ZpbmNlSWQiLCJjaXR5SWQiLCJhcmVhSWQiLCJhZGRyZXNzSW5mbyIsImlkIiwiY2l0eU5tIiwicmVkVXJsIiwiZ2V0UXJVcmwiLCJtY2hudERldGFpbCIsInFyVXJsIiwicXJOdW0iLCJhcmVhIiwibWVyY2hhbnRUcCIsImFyZWFBcnIiLCJwcm92aW5jZSIsIm9uZSIsInByb0lkIiwicHJvTm0iLCJ0d28iLCJjaXR5IiwidGhyZWUiLCJ2YWx1ZSIsImNoaWxkcmVuIiwicHVzaCIsImFyZWFObSIsIm1lcmNoYW50VHBBcnIiLCJtZXJUeXBlMSIsIm1lcmNoYW50VHBDZCIsIm1lcmNoYW50VHBObSIsIm1lclR5cGUyIiwibWNobnRBbmRBcmVhSW5mIiwic3RvcmVObSIsIlN0b3JlVHAiLCJwcm92Q2QiLCJjb3V0eUNkIiwiYWRkciIsImNlcnRpZlBpYzEiLCJjZXJ0aWZQaWMyIiwiY2VydGlmUGljMyIsImxpY2Vuc2VQaWMiLCJzaG9wUGljMSIsInNob3BQaWMyIiwiYXV4UHJvdk1hdDEiLCJhdXhQcm92TWF0MiIsInNob3BMb2dvUGljIiwiVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3QiLCJyZXMiLCJoaXN0b3J5SW5jb21lT2JqIiwib3JpZ2luTGlzdERhdGEiLCJnZXRTdGF0ZSIsImdldEluIiwidG9KUyIsIm5ld0xpc3QiLCJ0cmFuc0luZm8iLCJoaXN0b3J5T3JkZXJMaXN0IiwiY29uY2F0IiwidG9kYXlJbmNvbWVPYmoiLCJ0b2RheU9yZGVyTGlzdCIsIm5ld09iaiIsImRlbGl2ZXJ5TXNnIiwibWF0RGVsaXZTdGF0dXMiLCJsaW1pdEluZm8iLCJpc1VzZU1jYyIsIm1jY1RyYW5zTnVtIiwidHJhbnNOdW0iLCJDb2xsZWN0aW9uRGV0YWlscyIsInByb3BzIiwiZ2V0RGF0ZVRpbWUiLCJudW0iLCJub3ciLCJEYXRlIiwiZGF0ZVMiLCJnZXRUaW1lIiwibW9udGhzIiwiZ2V0TW9udGgiLCJkYXlzIiwiZ2V0RGF0ZSIsInN0YXJ0RGF0ZSIsImdldEZ1bGxZZWFyIiwieWVhckUiLCJtb250aEUiLCJkYXlFIiwicHJlRGF0ZSIsImVuZERhdGUiLCJsYXN0RGF0ZSIsImZvcm1hdERhdGUiLCJzdHIiLCJ5ZWFyIiwic3Vic3RyIiwibW9udGgiLCJkYXkiLCJob3VyIiwibWluIiwicyIsImRhdGUiLCJ0aW1lIiwiaXNMb2FkaW5nIiwic2Nyb2xsQ29udGFpbmVyUmVmIiwiUmVhY3QiLCJjcmVhdGVSZWYiLCJ0aGF0IiwiY3VycmVudCIsIm9uc2Nyb2xsIiwiZSIsImhhc01vcmUiLCJnZXRNb3JlRGF0YSIsInRhcmdldCIsInNjcm9sbEhlaWdodCIsIm9mZnNldEhlaWdodCIsInNjcm9sbFRvcCIsInNldFN0YXRlIiwiZml4SGVhZGVyU3R5bGUiLCJwb3NpdGlvbiIsImxlZnQiLCJ0b3AiLCJ6SW5kZXgiLCJiYWNrZ3JvdW5kIiwiX3RoaXMiLCJ0YWJEYXlWYWwiLCJib3R0b21UZXh0IiwidGFibGVDTGlja0hhbmRsZXIiLCJzaG93T3JkZXJMaXN0RGF0YSIsInNob3dJbmNPYmpEYXRhIiwicmVuZGVybGlzdCIsImluZGV4IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwidm91Y2hlck51bSIsImFjY05vIiwidHhuQW10IiwidHJhbnNUbSIsImJpbmQiLCJkYXlJbmNvbWUiLCJvcmRlck51bSIsIm1hcCIsIkNvbXBvbmVudCIsInJlcXVlc3QiLCJzZXRYaWFvV2VpUGF5Iiwid2luZG93IiwiVVAiLCJXIiwiQXBwIiwiRW52IiwicmVnUGhvbmUiLCJyZWdQYXlOdW0iLCJ2ZXJzaW9uIiwic291cmNlIiwiYmFzZVVybCIsImJhc2VVcmwyIiwiYmFzZVVybDMiLCJsb2NhdGlvbiIsImhvc3RuYW1lIiwiaW5kZXhPZiIsInByb3RvY29sIiwiZ2V0U2VydlVybCIsInVybCIsInNlcnZlclVybCIsInVzZXJJbmZvIiwic3BsaXQiLCJnZXRDaXR5IiwicmVzcG9uc2VGb3JtYXR0ZXIiLCJwYXJhbXMiLCJtc2ciLCJkZWxldGVTbGFzaCIsImhvc3QiLCJyZXBsYWNlIiwiYWRkU2xhc2giLCJwYXRoIiwidGVzdCIsInNlcGFyYXRlUGFyYW1zIiwicGFyYW1zTGluZSIsImtleSIsImNvbmZpZyIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwiZmluYWxVcmwiLCJyZWplY3QiLCJvcHRpb25zIiwidHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsIkVycm9yIiwiZGF0YVR5cGUiLCIkIiwiYWpheCIsImdldCIsInBhcmFtQWxsIiwiZm9yQ2hzcCIsImVuY3J5cHQiLCJjYWNoZSIsImJ5QWpheCIsInBvc3QiLCJwdXQiLCJkZWwiLCJnZXRTZWFyY2hQYXJhbSIsInNlYXJjaCIsInNsaWNlIiwiYXJyYXkiLCJvYmoiLCJzdWMiLCJlcnIiLCJhcHAiLCJzZXRYaWFvV2VpQXVkaW8iLCJnZXRYaWFvV2VpQXVkaW8iLCJ0b2FzdCIsIm1zIiwiVG9hc3QiLCJpbmZvIiwiYmVmb3JlRW50ZXJSb3V0ZXIiLCJ0aXRsZSIsInJpZ2h0QmFyIiwicmlnaHRDYWxsYmFjayIsInJpZ2h0QmFySW1nIiwiZG9jdW1lbnQiLCJvblBsdWdpblJlYWR5Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwic2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uIiwibWNjU3RhdGVDaGFuZ2VkIiwic2VuZFFyQ29kZSIsImZhaWwiLCJzY2FuUVJDb2RlIiwiY2xvc2VXZWJWaWV3IiwidmVyaWZ5UGF5UHdkIiwiY3JlYXRlV2ViVmlldyIsImlzRmluaXNoIiwiZ2V0VXNlckRldGFpbEluZm8iLCJzYXZlUWNvZGUiLCJjYW52YXMiLCJ1aSIsIlVJIiwicGljVXJsIiwidG9EYXRhVVJMIiwibG9nRXZlbnQiLCJzYXZlUGljVG9Mb2NhbCIsInNob3dUb2FzdFdpdGhQaWMiLCJzaG93QWxlcnQiLCJlbnYiLCJpc0lPUyIsIm9wZW5Ccm93c2VyIiwic2hvd1RvYXN0Iiwic2hhcmUiLCJkZXNjIiwiaW1nVVJMIiwicGFnZVVSbCIsInNob3dTaGFyZVBhbmVsIiwic2hhcmVVcmwiLCJnZXRDdXJyZW50TG9jYXRpb25JbmZvIiwiY2FsbGJhY2syIiwic2hvd0xvYWRpbmciLCJjYWxsYmFjayIsImRpc21pc3MiLCJzZW5kTWVzc2FnZSIsImNtZCIsImZldGNoTmF0aXZlRGF0YSIsInhociIsImNyZWF0ZVRleHRDYW52YXNlIiwidGV4dCIsImNvbG9yIiwibG9uZyIsInNob3QiLCJyZW0ycHgiLCJ2YWwiLCJjV2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsInNldEF0dHJpYnV0ZSIsIndpZHRoIiwicm90YXRlIiwiTWF0aCIsIlBJIiwiZmlsbFN0eWxlIiwidGV4dEFsaWduIiwiZm9udFNpemUiLCJmb250IiwibWVhc3VyZVRleHQiLCJmaWxsVGV4dCIsImNyZWF0ZUNvbnZhc0FuZFNhdmVQaG90byIsImNhbnZhc09iaiIsImJndXJsIiwicXJjb2RlVVJMIiwicXJjb2RlV2RBbmRIZyIsInhXaWR0aCIsInlIZWlnaHQiLCJ0ZXh0YmdVUkwiLCJ4VGV4dFdpZHRoIiwieVRleHRIZWlnaHQiLCJpbWciLCJJbWFnZSIsInNyYyIsIm9ubG9hZCIsImhlaWdodCIsImRyYXdJbWFnZSIsInRleHRVcmkiLCJ0ZXh0SW1nIiwicXJjb2RlV2lkdGhBbmRIZWlnaHQiLCJpbm5lckhUTUwiLCJxcmNvZGUiLCJRUkNvZGUiLCJjb3JyZWN0TGV2ZWwiLCJDb3JyZWN0TGV2ZWwiLCJMIiwicXJjb2RlSW1nIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJxcmNvZGVEeCIsInFyY29kZUR5IiwiZ2V0TWF0ZXJpZWxJbmZvTGlzdCIsImdldFJld2FyZExpc3QiLCJDT05TVF9EQVRBIiwiaW1nZVNpemUiLCJjYWNoZUZpcnN0Iiwic3RvcmFnZSIsInZhbGlkYXRlVGltZSIsImNhY2hlRmlyc3RTdG9yYWdlIiwibmVlZFN3Iiwic3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlIiwicmVmcmVzaERvbUZ1bmMiLCJyZXEiLCJkYXRhRnJvbUNhY2hlIiwiZ2V0RnJvbVN0b3JhZ2UiLCJyZW1vdmVTdG9yYWdlIiwiaXNTYW1lQXRBbGwiLCJJbW11dGFibGUiLCJpcyIsImZyb21KUyIsImFzeW5jIiwiZW5kT2ZTeW5jRnVuYyIsInJlbW92ZUNhY2hlIiwiY29sbGVjdERldGFpbE9yZGVyIiwibGF0ZWRhdGUiLCJpbnRlcnZhbERheSIsIkNvbGxlY3Rpb25EZXRhaWxzQ29udGFpbmVycyIsImxpc3QiLCJtYXBzdGF0ZVRvUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBV2dCQSxXLEdBQUFBLFc7UUF5QkFDLFEsR0FBQUEsUTtRQWlCQUMsTyxHQUFBQSxPO1FBdUJBQyxPLEdBQUFBLE87UUFvQkFDLFEsR0FBQUEsUTtRQTBCQUMsVyxHQUFBQSxXO1FBZ0RBQyxXLEdBQUFBLFc7UUFnQ0FDLFEsR0FBQUEsUTtRQW9CQUMsWSxHQUFB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MEQsb0JBQW9CO0FBQzlFLG1CQUFPLENBQUMsc0JBQXNCO0FBQzlCLG1CQUFPLENBQUMsc0JBQWdCO0FBQ3hCLFVBQVUsbUJBQU8sQ0FBQyxzQkFBUzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsZ0RBQWdELG1CQUFPLENBQUMsc0JBQWdCO0FBQ3hFO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUM3UkQ7QUFDQSxrQkFBa0IseXVCIiwiZmlsZSI6ImNodW5rL0NvbGxlY3Rpb25EZXRhaWxzLmMxODgwNDhkMzEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NvbW9tUGFyYW0sIGdldCwgcG9zdCwgVXRpbH0gZnJvbSBcIi4vcmVxdWVzdFwiO1xyXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge30gZnJvbSBcIi4vY2FjaGVTdG9yYWdlXCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tIFwiLi4vLi4vc3RvcmUvc3RvcmVcIjtcclxuaW1wb3J0IHtVUERBVEVfU1RPUkVfU1RBVEV9IGZyb20gXCIuLi8uLi9zdG9yZS9hY3Rpb25cIjtcclxuaW1wb3J0IHtjYWNoZUZpcnN0LGNhY2hlRmlyc3RTdG9yYWdlLHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSxyZW1vdmVDYWNoZX0gZnJvbSBcIi4vY2FjaGVTdG9yYWdlXCI7XHJcblxyXG4vKipcclxuICog55Sz6K+357qi5YyF56CB55qE6K+35rGCXHJcbiAqIEBwYXJhbSBwaG9uZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlY21kUmVjb3JkKHBob25lKSB7XHJcbiAgICBpZiAocGhvbmUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcGhvbmUgPSBcIlwiXHJcbiAgICB9XHJcbiAgICBsZXQgcmVjbWRNb2JpbGUgPSBVdGlsLmJhc2U2NEVuY29kZShwaG9uZSlcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnJlY21kUmVjb3JkLCB7cmVjbWRNb2JpbGV9KS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbnlLPor7fnuqLljIXnoIHmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0sKCk9Pnt9LCgpPT57XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbDp0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6K+35rGC57qi5YyF5ZCX6L+e5o6lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2hhcmxpbmsoKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5zaGFyZUxpbmssIHt9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgbGV0IHJlZFVybFN0cj0gXCJodHRwczovL3dhbGxldC45NTUxNi5jb20vcy93bC93ZWJWMy9hY3Rpdml0eS92TWFya2V0aW5nMi9odG1sL3Nuc0luZGV4Lmh0bWw/cj1cIiArIHJlc3BvbnNlLmRhdGEuaWRlbnRpZmllcjtcclxuICAgICAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHJlZFVybFN0clxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShuZXh0U3RhdGUpKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlZFVybFN0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKblnKjnmb3lkI3ljZXnmoTor7fmsYJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0JsYWNrKHVwZGF0ZSkge1xyXG4gICAgbGV0IHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbihyZXNwKXtcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBibGFja1N0OnJlc3AuZGF0YS5ibGFja1N0XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lzQmxhY2s6IHVwZGF0ZeWHveaVsOaJp+ihjOWujOavlScpO1xyXG4gICAgICAgIGlmKCB0eXBlb2YgdXBkYXRlID09PSAnZnVuY3Rpb24nICl7XHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXNwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+ivu+WPlue8k+WtmO+8jOWQjOaXtuW8guatpeWPkemAgeivt+axglxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuaXNCbGFjayx7fSxzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UodXBkYXRlRnVuYykpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGJsYWNrU3Q6cmVzcG9uc2UuZGF0YS5ibGFja1N0XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5piv5ZCm5Zyo6buR5ZCN5Y2V55qE6K+35rGCXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQXBwbHkoKSB7XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IGNhY2hlRmlyc3RTdG9yYWdlKDMwKjYwKjEwMDAsQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5KTsvL+e8k+WtmDMw5YiG6ZKfXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmlzQXBwbHksIHt9LGNhY2hlUGFyYW0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuYXBwbHlTdCAhPSBcIjFcIikge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5aaC5p6c5bey57uP55Sz6K+36L+H57qi5YyF56CB5YiZ57yT5a2YMzDliIbpkp/vvIzlkKbliJnkuI3nvJPlrZhcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleSlcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYXBwbHlTdDpyZXNwb25zZS5kYXRhLmFwcGx5U3RcclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnlLPor7fmlLbmrL7noIFcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWNjKHBhcmFtID0ge1xyXG4gICAgcmVmZXJlZVRlbDogXCJcIiwgICAgICAgICAvL+aOqOiNkOS6uuaJi+acuuWPt1xyXG4gICAgdmlydHVhbENhcmRObzogXCJcIiwgICAgICAvL+iZmuaLn+WNoeWPt1xyXG4gICAgYWNjTm06IFwiXCIsICAgICAgICAgICAgICAvL+W6l+mTuuWQjeensFxyXG4gICAgY2l0eUNkOiBcIlwiICAgICAgICAgICAgICAgLy/ln47luILku6PnoIFcclxufSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuYXBwbHlNY2MsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbnlLPor7fnuqLljIXnoIHmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0sKCk9Pnt9LCgpPT57XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbDp0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE6ZO26KGM5Y2h5YiX6KGoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FyZGxpc3QoKSB7XHJcbiAgICAvL+iOt+WPlueUqOaIt+mTtuihjOWNoeWIl+ihqO+8jOe8k+WtmDHliIbpkp9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TWNjQ2FyZExpc3QsIGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgLy/lpoLmnpzlkI7lj7Dov5Tlm57pk7booYzljaHliJfooajkuJTkuI3kuLrnqbpcclxuICAgICAgICBpZiAoISFyZXNwb25zZS5kYXRhLmNhcmRMaXN0ICYmIHJlc3BvbnNlLmRhdGEuY2FyZExpc3QubGVuZ3RoICE9IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8v5Yid5aeL5YyW6buY6K6k5Y2hXHJcbiAgICAgICAgICAgIGxldCBkZWZhbHV0Q2FyZCA9IHtcclxuICAgICAgICAgICAgICAgIGJhbms6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHmiYDlnKjnmoTpk7booYxcclxuICAgICAgICAgICAgICAgIGNhcmRUeXBlOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeexu+Wei1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb25CaXRtYXA6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h5Yqf6IO95L2NXHJcbiAgICAgICAgICAgICAgICBpY29uUmVsVXJsOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHnmoRsb2dv5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICBpc1N1cHBvcnQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpuaUr+aMgVxyXG4gICAgICAgICAgICAgICAgcGFuOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/luKbmnInmjqnnoIHnmoTljaHlj7dcclxuICAgICAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpumAieS4rVxyXG4gICAgICAgICAgICAgICAgdmlydHVhbENhcmRObzogXCJcIiAgIC8v6Jma5ouf5Y2h5Y+3XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLmNhcmRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghIWl0ZW0uc2VsZWN0ZWQgJiYgaXRlbS5pc1N1cHBvcnQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmFsdXRDYXJkID0gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy/lpoLmnpzmsqHmnInpu5jorqTpgInkuK3nmoTljaHlj5bkuIDkuKrkuI3ooqvnva7kuLrngbDnmoTljaHkuLrpu5jorqTljaFcclxuICAgICAgICAgICAgaWYgKGRlZmFsdXRDYXJkLmJhbmsubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmNhcmRMaXN0W2tdLmlzU3VwcG9ydCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmFsdXRDYXJkID0gcmVzcG9uc2UuZGF0YS5jYXJkTGlzdFtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdG9yZVN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgc3RvcmVSZWNlaXZlQ2FyZE9iajogZGVmYWx1dENhcmQsXHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdDogcmVzcG9uc2UuZGF0YS5jYXJkTGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShzdG9yZVN0YXRlKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5blnLDlnYDliJfooahcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFkZHJMaXN0KFxyXG4gICAgdXBkYXRlLCAvL+e8k+WtmOeahOabtOaWsOWHveaVsFxyXG4gICAgcGFyYW0gPSB7XHJcbiAgICAgICAgc3RhdGU6IFwiXCIgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbikge1xyXG4gICAgLy8g6K+75Y+W57yT5a2Y77yM5ZCM5pe25byC5q2l5Y+R6YCB6K+35rGCXHJcbiAgICBsZXQgdXBkYXRlRnVuYyA9IGZ1bmN0aW9uKHJlc3Ape1xyXG4gICAgICAgIC8vIOWcqHVwZGF0ZeWHveaVsOS4re+8jOabtOaWsHJlZHV45Lit55qEYWRkcmVzc0xpc3RcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe2FkZHJlc3NMaXN0OnJlc3AuZGF0YS5yZXN1bHR8fFtdfSkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRBZGRyTGlzdDogdXBkYXRl5Ye95pWw5omn6KGM5a6M5q+VJyk7XHJcbiAgICAgICAgaWYoIHR5cGVvZiB1cGRhdGUgPT09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgICB1cGRhdGUocmVzcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGNhY2hlUGFyYW0gPSBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UodXBkYXRlRnVuYyxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KTtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEFkZHJMaXN0LCBPYmplY3QuYXNzaWduKHt9LCBjb21vbVBhcmFtLCBwYXJhbSksY2FjaGVQYXJhbSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IGFkZHJlc3NMaXN0ID0gcmVzcG9uc2UuZGF0YS5yZXN1bHQgfHwgW107XHJcblxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGFkZHJlc3NMaXN0XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog55Sz6K+354mp5paZ5o6l5Y+jXHJcbiAqIEBwYXJhbSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1hdChwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3Q6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nianmlpnliJfooahcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxpdk5tOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mlLbotKfkurpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRBbGw6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDljLrlkI3np7BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxpdlBob25lOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mlLbotKfnlLXor51cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aW5jZUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nnIFJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlJZDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W4gklEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Yy6SURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzSW5mbzogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/or6bnu4blnLDlnYBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJycsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDlnYDnmoRJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlObTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aJgOWcqOWfjuW4gkNpdHlDb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkVXJsOiBcIlwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v57qi5YyF56CB5Zyw5Z2AICDlj6/pgInlj4LmlbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmFwcGx5TWF0LCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWVhuaIt+aUtuasvueggeWcsOWdgOWSjOWVhuaIt+e8luWPt1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFFyVXJsUmVzdCgpIHtcclxuICAgIC8v57yT5a2YMuWwj+aXtlxyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRRclVybCwgY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgbWNobnREZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgIHFyVXJsOiByZXNwb25zZS5kYXRhLnFyVXJsLFxyXG4gICAgICAgICAgICAgICAgcXJOdW06IHJlc3BvbnNlLmRhdGEucXJOdW1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICrojrflj5blupfpk7rljLrln5/liJfooajlkozlupfpk7rnsbvlnovliJfooahcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jaG50QW5kQXJlYUluZigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/meS4quaOpeWPoyzlj6rotbBzd++8jOS4jei1sGxvYWNhbFN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgLy8gbGV0IGNhY2hlUGFyYW0gPSB7XHJcbiAgICAvLyAgICAgYnlBamF4OiBmYWxzZSxcclxuICAgIC8vICAgICBmb3JDaHNwOmZhbHNlLFxyXG4gICAgLy8gICAgIGVuY3J5cHQ6ZmFsc2UsXHJcbiAgICAvLyAgICAgY2FjaGU6IHRydWVcclxuICAgIC8vIH1cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TWNobnRBbmRBcmVhSW5mLCBjb21vbVBhcmFtLCBjYWNoZUZpcnN0KDI0KjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGxldCBhcmVhID0gW10sIG1lcmNoYW50VHAgPSBbXTtcclxuXHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDnnIHnuqdcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuYXJlYUFyci5mb3JFYWNoKChwcm92aW5jZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvbmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBwcm92aW5jZS5wcm9JZCxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IHByb3ZpbmNlLnByb05tLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwcm92aW5jZS5wcm9ObSA9PSBcIuWMl+S6rOW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi5LiK5rW35biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLlpKnmtKXluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIumHjeW6huW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi5rex5Zyz5biCXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHByb3ZpbmNlLnByb0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IHByb3ZpbmNlLnByb05tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aW5jZS5jaXR5LmZvckVhY2goKGNpdHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRocmVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBjaXR5LmNpdHlJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogY2l0eS5jaXR5Tm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRocmVlLnZhbHVlICE9IHR3by52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdvLmNoaWxkcmVuLnB1c2godGhyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICog5biC57qnXHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmluY2UuY2l0eS5mb3JFYWNoKChjaXR5KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBjaXR5LmNpdHlJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogY2l0eS5jaXR5Tm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiDljLrnuqdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuYXJlYS5mb3JFYWNoKChhcmVhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRocmVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogYXJlYS5hcmVhSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBhcmVhLmFyZWFObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdvLmNoaWxkcmVuLnB1c2godGhyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25lLmNoaWxkcmVuLnB1c2godHdvKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGFyZWEucHVzaChvbmUpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5tZXJjaGFudFRwQXJyLmZvckVhY2goKG1lclR5cGUxKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb25lID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogbWVyVHlwZTEubWVyY2hhbnRUcENkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogbWVyVHlwZTEubWVyY2hhbnRUcE5tLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBtZXJUeXBlMS5tZXJjaGFudFRwQXJyLmZvckVhY2goKG1lclR5cGUyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtZXJUeXBlMi5tZXJjaGFudFRwQ2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogbWVyVHlwZTIubWVyY2hhbnRUcE5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBtZXJjaGFudFRwLnB1c2gob25lKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHtcclxuICAgICAgICAgICAgbWNobnRBbmRBcmVhSW5mOiB7XHJcbiAgICAgICAgICAgICAgICBhcmVhQXJyOiBhcmVhLFxyXG4gICAgICAgICAgICAgICAgbWVyY2hhbnRUcEFycjogbWVyY2hhbnRUcFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShuZXh0U3RhdGUpKVxyXG5cclxuICAgIH0pXHJcblxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5bqX6ZO66K+m5oOF5L+h5oGvXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jaG50RGV0YWlsKCkge1xyXG4gICAgbGV0IGNhY2hlUGFyYW0gPSBjYWNoZUZpcnN0U3RvcmFnZSg2MCoxMDAwLENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOy8v57yT5a2YMeWIhumSn1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0TWNobnREZXRhaWwsIGNvbW9tUGFyYW0sY2FjaGVQYXJhbSkudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyl7XHJcbiAgICAgICAgICAgIGxldCBtY2hudERldGFpbCA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHttY2hudERldGFpbH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtY2hudERldGFpbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOWNh+e6p+WVhumTuuS6jOe7tOeggVxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBncmFkZU1jYyhwYXJhbT17XHJcbiAgICBzdG9yZU5tOiBcIlwiLCAgICAvL+W6l+mTuuWQjeensFxyXG4gICAgU3RvcmVUcDogXCJcIiwgICAgLy/lupfpk7rnsbvlnotcclxuICAgIHByb3ZDZDogXCJcIiwgICAgIC8v55yBSURcclxuICAgIGNpdHlDZDogXCJcIiwgICAgIC8v5biCSURcclxuICAgIGNvdXR5Q2Q6IFwiXCIsICAgIC8v5Yy6SURcclxuICAgIGFkZHI6IFwiXCIsICAgICAgIC8v5Zyw5Z2AXHJcbiAgICBjZXJ0aWZQaWMxOiBcIlwiLCAvL+i6q+S7veivgeato+mdoueFp1xyXG4gICAgY2VydGlmUGljMjogXCJcIiwgLy/ouqvku73or4Hlj43pnaLnhadcclxuICAgIGNlcnRpZlBpYzM6IFwiXCIsIC8v5omL5oyB6Lqr5Lu96K+B54Wn54mHXHJcbiAgICBsaWNlbnNlUGljOiBcIlwiLCAvL+iQpeS4muaJp+eFp1xyXG4gICAgc2hvcFBpYzE6IFwiXCIsICAgLy/lupfpk7rnhafniYcxXHJcbiAgICBzaG9wUGljMjogXCJcIiwgICAvL+W6l+mTuueFp+eJhzJcclxuICAgIGF1eFByb3ZNYXQxOiBcIlwiLC8v6L6F5Yqp54Wn54mHMVxyXG4gICAgYXV4UHJvdk1hdDI6IFwiXCIsLy/ovoXliqnnhafniYcyXHJcbiAgICBzaG9wTG9nb1BpYzogXCJcIiAvL+W6l+mTukxPR09cclxufSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBncmFkZU1jYywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOW6l+mTuuivpuaDheeahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbljYfnuqfnmoTmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5VcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE5Y2P6K6u57yW5Y+35ZKM5Y2P6K6u5ZCN56ewXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3RvY29sSW5mbygpIHtcclxuICAgIC8qKlxyXG4gICAgICog6L+Z5Liq5o6l5Y+jLOe8k+WtmDLlsI/ml7ZcclxuICAgICAqL1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRQcm90b2NvbEluZm8sIGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UuZGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5Y6G5Y+y5pS25qy+XHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpc3RvcnlJbmNvbWUocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEhpc3RvcnlJbmNvbWUsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnlJbmNvbWVPYmo6IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWOhuWPsuiuouWNlVxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXN0b3J5VHJhbnMocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEhpc3RvcnlUcmFucywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgbGV0IG9yaWdpbkxpc3REYXRhID0gc3RvcmUuZ2V0U3RhdGUoKS5nZXRJbihbJ2hpc3RvcnlPcmRlckxpc3QnXSkudG9KUygpXHJcbiAgICAgICAgICAgIGxldCBuZXdMaXN0ID0gcmVzLmRhdGEudHJhbnNJbmZvO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdMaXN0KVxyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeU9yZGVyTGlzdDogb3JpZ2luTGlzdERhdGEuY29uY2F0KG5ld0xpc3QpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOS7iuaXpeaUtuasvlxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2RheUluY29tZSgpIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRvZGF5SW5jb21lLGNvbW9tUGFyYW0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIHRvZGF5SW5jb21lT2JqOiByZXMuZGF0YVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5LuK5pel6K6i5Y2VXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5VHJhbnMocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRvZGF5VHJhbnMsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5MaXN0RGF0YSA9IHN0b3JlLmdldFN0YXRlKCkuZ2V0SW4oWyd0b2RheU9yZGVyTGlzdCddKS50b0pTKClcclxuICAgICAgICAgICAgbGV0IG5ld0xpc3QgPSByZXMuZGF0YS50cmFuc0luZm87XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICB0b2RheU9yZGVyTGlzdDogb3JpZ2luTGlzdERhdGEuY29uY2F0KG5ld0xpc3QpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWNleeslOafpeivolxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpXHJcbn1cclxuLyoqXHJcbiAqIOiOt+WPlueJqea1geS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2lzdGljc1N0KHBhcmFtKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TG9naXN0aWNzU3QsIE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgbGV0IG5ld09iaiA9IHJlcy5kYXRhLmRlbGl2ZXJ5TXNnO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogbmV3T2JqLm1hdERlbGl2U3RhdHVzIOeahOeKtuaAgeWSjHJlZHV455qEc3RvcmXkv53mjIHkuIDoh7RcclxuICAgICAgICAgICAgICogQHR5cGUgeyp9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBuZXdPYmoubWF0RGVsaXZTdGF0dXMgPSByZXMuZGF0YS5tYXREZWxpdlN0YXR1cztcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIGRlbGl2ZXJ5TXNnOiBuZXdPYmpcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICog5ZWG5oi35pyN5Yqh6aaW6aG1IOeCueWHu+S/oeeUqOWNoeaMiemSruafpeivouWVhuaIt+aYr+WQpuW8gOmAmui/h+S/oeeUqOWNoeaUtuasvlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVwZ3JhZGVTdCgpe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRVcGdyYWRlU3QsIGNvbW9tUGFyYW0pLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W54mp5paZ5Y6G5Y+y6K6i5Y2VXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naXN0aWNzTGlzdChwYXJhbSl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldExvZ2lzdGljc0xpc3QsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOafpeivouS/oeeUqOWNoeaUtuasvuWNh+e6p+eKtuaAgVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEF1ZGl0SW5mbygpe1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0QXVkaXRJbmZvLCBjb21vbVBhcmFtKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5pS25qy+6ZmQ6aKd6K+m5oOFXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGltaXRBdEluZm8oKXtcclxuICAgIC8v57yT5a2YMuS4quWwj+aXtlxyXG4gICAgcG9zdChDT05GSUcuUkVTVC5nZXRMaW1pdEF0SW5mbyxjb21vbVBhcmFtLGNhY2hlRmlyc3RTdG9yYWdlKDIqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3ApPT57XHJcbiAgICAgICAgaWYoIHJlc3Auc3RhdHVzQ29kZSA9IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MgKXtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtsaW1pdEluZm86cmVzcC5kYXRhfSkpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOabtOaWsOW6l+mTuuivpuaDhVxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOW6l+mTuuivpuaDheS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1jaG50T3BlcihwYXJhbSA9e30pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnVwZ3JhZGVNY2MgLCBPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/liKDpmaRtY2hudERldGFpbOe8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOyBcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5Yig6Zmk5Zyw5Z2A5L+h5oGvXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQWRkcmVzcyhwYXJhbT17XHJcbiAgICBpZDonJyAvL+WcsOWdgGlkXHJcbn0pe1xyXG4gICAgXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5kZWxldGVBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpOaUtui0p+WcsOWdgOe8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwYXJhbSk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOabtOaWsOaUtuasvumTtuihjOWNoVxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1jY0NhcmQocGFyYW09e1xyXG4gICAgdmlydHVhbENhcmRObzonJyAvL+iZmuaLn+WNoeWPt1xyXG59KSB7XHJcbiAgICBcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnVwZGF0ZU1jY0NhcmQsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5o2i5Y2h5ZCO77yM5riF6Zmk5bqX6ZO66K+m5oOF57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpOyBcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5paw5aKe5Zyw5Z2AXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+m57uG55qE5Zyw5Z2A5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3QWRkcmVzcyhwYXJhbT17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QubmV3QWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgLy8g5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDkv67mlLnlnLDlnYDkv6Hmga9cclxuICogQHBhcmFtIHsqfSBwYXJhbSDor6bnu4bnmoTlnLDlnYDkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlZGl0QWRkcmVzcyhwYXJhbT17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZWRpdEFkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyl7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog5ZCv5YGc5pS25qy+56CB5pyN5YqhXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWNjT25PZmYocGFyYW09e1xyXG4gICAgaXNVc2VNY2M6JycgIC8v5piv5ZCm5L2/55So5pS25qy+56CB5pyN5YqhXHJcbiB9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5zZXRNY2NPbk9mZixPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/liKDpmaTlupfpk7ror6bmg4XnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTsgXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog6I635Y+W5ZCK6LW35pSv5LuY5o6n5Lu255qEVE7lj7dcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNY2NUcmFuc051bSgpe1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0TWNjVHJhbnNOdW0pLnRoZW4oKHJlc3ApPT57XHJcbiAgICAgICAgaWYoIHJlc3Auc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTICl7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe21jY1RyYW5zTnVtOnJlc3AuZGF0YS50cmFuc051bX0pXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIHNhZmUpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzYWZlICYmIHRhcmdldFtrZXldKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qc1xuLy8gbW9kdWxlIGlkID0gMTRkYzFmN2ViZDgwZDE1YmZkMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTY3OTg1MWJlMjdiMjY4ZWEyNGVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDIxZGZhYzI4NTIzYWUzN2RhYzViXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDI1MWJjN2FmZTgxMjdlMDkxNDlkXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOGNmZjg2ZTFkNTFlYmYyMWY3ZlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gM2MyNGQzOGZmY2QwYzM4ZTM0Nzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgYnkgb24gMjAxOC80LzEzLlxyXG4gKi9cclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCJcclxuaW1wb3J0IFwiLi9Db2xsZWN0aW9uRGV0YWlscy5zY3NzXCJcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbkRldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgaXNMb2FkaW5nOmZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjcm9sbENvbnRhaW5lclJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxDb250YWluZXJSZWYuY3VycmVudC5vbnNjcm9sbCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxldCB7aGFzTW9yZSwgZ2V0TW9yZURhdGF9ID0gdGhhdC5wcm9wc1xyXG4gICAgICAgICAgICBpZiAoKGUudGFyZ2V0LnNjcm9sbEhlaWdodCkgLSAoZS50YXJnZXQub2Zmc2V0SGVpZ2h0ICsgZS50YXJnZXQuc2Nyb2xsVG9wKSA8IDUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNNb3JlICYmICF0aGF0LnN0YXRlLmlzTG9hZGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGdldE1vcmVEYXRhKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxDb250YWluZXJSZWYuY3VycmVudC5vbnNjcm9sbCA9IFwiXCI7Ly/muIXnqbrmu5rliqhcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaXpeacn+aXtumXtOautVxyXG4gICAgICogQHBhcmFtIG51bVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ3wqfVxyXG4gICAgICovXHJcbiAgICBnZXREYXRlVGltZT0obnVtKT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG51bSlcclxuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBsZXQgZGF0ZVMgPSBuZXcgRGF0ZShub3cuZ2V0VGltZSgpIC0gbnVtICogMjQgKiAzNjAwICogMTAwMCk7XHJcbiAgICAgICAgbGV0IG1vbnRocyA9IGRhdGVTLmdldE1vbnRoKCkgKzEgO1xyXG4gICAgICAgIGxldCBkYXlzID0gZGF0ZVMuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRheXMpXHJcbiAgICAgICAgaWYobW9udGhzIDwgMTApe1xyXG4gICAgICAgICAgICBtb250aHMgPSBcIjBcIiArbW9udGhzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXlzIDwgMTApe1xyXG4gICAgICAgICAgICBkYXlzID0gXCIwXCIgKyBkYXlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RhcnREYXRlID0gZGF0ZVMuZ2V0RnVsbFllYXIoKSArJy8nK21vbnRocysnLycrZGF5czsvL+W8gOWni+aXpeacn1xyXG5cclxuICAgICAgICBsZXQgeWVhckUsbW9udGhFICxkYXlFLHByZURhdGU7XHJcblxyXG4gICAgICAgIGlmKG51bSAhPSBcIjBcIil7XHJcbiAgICAgICAgICAgIHByZURhdGUgPSBuZXcgRGF0ZShub3cuZ2V0VGltZSgpIC0gMjQqNjAqNjAqMTAwMCk7XHJcbiAgICAgICAgICAgIGRheUUgPSBwcmVEYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgeWVhckU9cHJlRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICBtb250aEU9cHJlRGF0ZS5nZXRNb250aCgpICsxXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGRheUUgPSBub3cuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICB5ZWFyRT1ub3cuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgbW9udGhFPW5vdy5nZXRNb250aCgpICsxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihtb250aEUgPCAxMCl7XHJcbiAgICAgICAgICAgIG1vbnRoRSA9IFwiMFwiICttb250aEU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRheUUgPCAxMCl7XHJcbiAgICAgICAgICAgIGRheUUgPSBcIjBcIiArIGRheUU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5kRGF0ZSA9IHllYXJFK1wiL1wiK21vbnRoRStcIi9cIitkYXlFOy8v57uT5p2f5pel5pyfXHJcbiAgICAgICAgbGV0IGxhc3REYXRlO1xyXG4gICAgICAgIGlmKG51bSA9PSBcIjNcIiB8fCBudW0gPT0gXCI3XCIgfHwgbnVtID09IFwiMzFcIil7XHJcbiAgICAgICAgICAgIGxhc3REYXRlID0gc3RhcnREYXRlICtcIiAtIFwiKyBlbmREYXRlXHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0RGF0ZVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsYXN0RGF0ZSAgPSBzdGFydERhdGU7XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0RGF0ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLzlvI/ljJbmi4bliIblkI7lj7Dlk43lupTlm57mnaXnmoTml7bpl7Tml6XmnJ9cclxuICAgICAqIEBwYXJhbSBzdHJcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGZvcm1hdERhdGUgPSAoc3RyKT0+e1xyXG4gICAgICAgIGxldCB5ZWFyPXN0ci5zdWJzdHIoMCw0KTtcclxuICAgICAgICBsZXQgbW9udGggPSBzdHIuc3Vic3RyKDQsMik7XHJcbiAgICAgICAgbGV0IGRheSA9IHN0ci5zdWJzdHIoNiwyKTtcclxuICAgICAgICBsZXQgaG91cj1zdHIuc3Vic3RyKDgsMik7XHJcbiAgICAgICAgbGV0IG1pbiA9IHN0ci5zdWJzdHIoMTAsMik7XHJcbiAgICAgICAgbGV0IHMgPSBzdHIuc3Vic3RyKDEyLDIpO1xyXG4gICAgICAgIGxldCBkYXRlID0geWVhcitcIi9cIittb250aCtcIi9cIitkYXlcclxuICAgICAgICBsZXQgdGltZSA9IGhvdXIrXCI6XCIrbWluK1wiOlwiK3NcclxuXHJcbiAgICAgICAgcmV0dXJuIChkYXRlK1wiICBcIit0aW1lKVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBmaXhIZWFkZXJTdHlsZSA9IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcclxuICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDEwLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOicjZmZmJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICBsZXQge3RvZGF5T3JkZXJMaXN0LGhpc3RvcnlPcmRlckxpc3QsdG9kYXlJbmNvbWVPYmosaGlzdG9yeUluY29tZU9iaix0YWJEYXlWYWwsYm90dG9tVGV4dCx0YWJsZUNMaWNrSGFuZGxlcn09dGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgLy/moLnmja4gdGFiIOeahOWAvOehruWumua4suafk+mCo+S4quaVsOe7hCzpgqPkuKrlr7nosaFcclxuICAgICAgICBsZXQgc2hvd09yZGVyTGlzdERhdGE9dGFiRGF5VmFsPT0wP3RvZGF5T3JkZXJMaXN0Omhpc3RvcnlPcmRlckxpc3RcclxuICAgICAgICBsZXQgc2hvd0luY09iakRhdGE9dGFiRGF5VmFsPT0wP3RvZGF5SW5jb21lT2JqOmhpc3RvcnlJbmNvbWVPYmpcclxuXHJcbiAgICAgICAgbGV0IHJlbmRlcmxpc3QgPSBmdW5jdGlvbihpdGVtLGluZGV4KXtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPXtcIml0ZW1cIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPXtcIi9xdWVyeVJlc3VsdHM/Z29EZXRhaWw9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoaXRlbSkpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17XCJwYXlNb25lck51bVwifT7ku5jmrL7lh63or4Hlj7fvvJo8c3Bhbj57aXRlbS52b3VjaGVyTnVtfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJib3R0b21MaW5lXCJ9PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtcImNhcmROdW1cIn0+6LSm5oi35Y2h5Y+377yaPHNwYW4+e2l0ZW0uYWNjTm99PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIkNvbGxlY3RNb25leVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e1wibW9uZXlMZWZ0XCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDph5Hpop3vvJo8c3BhbiBjbGFzc05hbWU9e1wibW9uZXlcIn0+e2l0ZW0udHhuQW10feWFgzwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtcInRpbWVSaWdodFwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtcInRpbWVcIn0+e190aGlzLmZvcm1hdERhdGUoaXRlbS50cmFuc1RtKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiQ29sbGVjdGlvbkRldGFpbHNDb250YWluXCJ9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17Zml4SGVhZGVyU3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e1wiZGF0ZVRhYnMgY2xlYXJmaXhcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e3RhYkRheVZhbD09XCIwXCI/XCJhY3RpdmVcIjpcIlwifSBkYXRhLW51bT1cIjBcIiBvbkNsaWNrPXt0YWJsZUNMaWNrSGFuZGxlci5iaW5kKHRoaXMsXCIwXCIpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+5LuK5aSpPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e3RhYkRheVZhbD09XCIzXCI/XCJhY3RpdmVcIjpcIlwifSBkYXRhLW51bT1cIjNcIiBvbkNsaWNrPXt0YWJsZUNMaWNrSGFuZGxlci5iaW5kKHRoaXMsXCIzXCIpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+5pyA6L+RM+WkqTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXt0YWJEYXlWYWw9PVwiN1wiP1wiYWN0aXZlXCI6XCJcIn0gZGF0YS1udW09XCI3XCIgb25DbGljaz17dGFibGVDTGlja0hhbmRsZXIuYmluZCh0aGlzLFwiN1wiKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PuacgOi/kTHlkag8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17dGFiRGF5VmFsPT1cIjMxXCI/XCJhY3RpdmVcIjpcIlwifSBkYXRhLW51bT1cIjMxXCIgb25DbGljaz17dGFibGVDTGlja0hhbmRsZXIuYmluZCh0aGlzLFwiMzFcIil9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj7mnIDov5Ex5pyIPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiQ29sbGVjdE1vbmV5TGlzdEJveFwifSAgIHJlZj17dGhpcy5zY3JvbGxDb250YWluZXJSZWZ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImN1ckRhdGUgY3VyTm9EYXRlXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJkYXRlXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3RoaXMuZ2V0RGF0ZVRpbWUodGFiRGF5VmFsKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjdXJNb25leSBjbGVhcmZpeFwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImN1ck1vbmV5TGVmdFwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e1wicmVjZWl2ZU1vbmV5XCJ9PuaUtuasvumHkeminTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e1wicmVjZWl2ZU51bVwifT7CpXtzaG93SW5jT2JqRGF0YS5kYXlJbmNvbWUgPyBzaG93SW5jT2JqRGF0YS5kYXlJbmNvbWU6XCIwLjAwXCJ9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjdXJNb25leVJpZ2h0XCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17XCJvcmRlclwifT7orqLljZXph488L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtcIm9yZGVyTnVtXCJ9PntzaG93SW5jT2JqRGF0YS5vcmRlck51bSA/IHNob3dJbmNPYmpEYXRhLm9yZGVyTnVtIDpcIjBcIn08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiQ29sbGVjdE1vbmV5TGlzdFwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Nob3dPcmRlckxpc3REYXRhLm1hcChyZW5kZXJsaXN0KX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJsb2FkaW5nXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJsb2FkaW5nQmdcIn0gPntib3R0b21UZXh0fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbkRldGFpbHMvQ29sbGVjdGlvbkRldGFpbHMuanMiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNTNiN2QzNDgxNzE0NGIxMmIwYWFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDVlNTliNzFiMzNhMzhjMzYxOGU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1ZTc0OTFmMWY3OTk3MTVlYWM3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDZhNDQyYWI1YmQ5YmQ5Mjk0NDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8qXHJcbiAgIEFQSSDmjqXlj6PphY3nva5cclxuICAgYXhpb3Mg5Y+C6ICD5paH5qGj77yaaHR0cHM6Ly93d3cua2FuY2xvdWQuY24veXVueWUvYXhpb3MvMjM0ODQ1XHJcblxyXG4qL1xyXG4vLyBpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnYW50ZC1tb2JpbGUvbGliL3RvYXN0JztcclxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnXCJcclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKlxyXG4qIOW4uOmHj+WumuS5ieWMulxyXG4qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBjb25zdCBVdGlsID0gd2luZG93LlVQLlcuVXRpbDtcclxuXHJcbmV4cG9ydCBjb25zdCBBcHAgPSBVUC5XLkFwcDtcclxuXHJcbmV4cG9ydCBjb25zdCBFbnYgPSBVUC5XLkVudjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGhvbmUgPSAvXigxM1swLTldfDE0WzU3OV18MTVbMC0zLDUtOV18MTZbNl18MTdbMDEzNTY3OF18MThbMC05XXwxOVs4OV0pXFxkezh9JC87XHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGF5TnVtID0gL15bMC05XXsyMH0kLztcclxuXHJcbmV4cG9ydCBjb25zdCBjb21vbVBhcmFtID0ge1xyXG4gICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgIHNvdXJjZTogXCIyXCJcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiDor7fmsYLmoLjlv4PljLog5LiL6Z2i6L+Z5Z2X5Yy65Z+f5Lit55qE5Luj56CB5pS55Yqo6K+35oWO6YeNXHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5sZXQgYmFzZVVybCA9IFwiXCIsIGJhc2VVcmwyID0gXCJcIiwgYmFzZVVybDMgPSBcIlwiO1xyXG5pZiAobG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignOTU1MTYuY29tJykgIT09IC0xKSB7IC8v55Sf5Lqn546v5aKDXHJcbiAgICBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vc2hhbmdodS45NTUxNi5jb20vd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDIgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9tYWxsLjk1NTE2LmNvbS9jcXAtaW50LW1hbGwtd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICBiYXNlVXJsMyA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL3lvdWh1aS45NTUxNi5jb20veW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2UgaWYgKGxvY2F0aW9uLmhvc3RuYW1lLmluZGV4T2YoJzE3Mi4xOC4xNzkuMTAnKSAhPT0gLTEpIHsgLy/mtYvor5Xnjq/looNcclxuICAgIC8vIGJhc2VVcmw9XCJodHRwOi8vMTcyLjIxLjEwMS4yNTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7IC8v5rWL6K+V5a6kYXBhY2hlXHJcbiAgICAvL2Jhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjk1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+W8gOWPkeeOr+Wig2FwYWNoZVxyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4xMzMuMjU6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2Uge1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuOTU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuMjU6MzgyMTAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMTMzLjI1OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjMzLjU2OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufVxyXG4vKipcclxuICog6YCa6L+H5ZCO57yA6I635Y+W5pyN5Yqh5Zmo55qE5YWo5Zyw5Z2AXHJcbiAqIEBwYXJhbSB1cmxcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZXJ2VXJsID0gKHVybCkgPT4ge1xyXG4gICAgbGV0IHNlcnZlclVybCA9IFwiXCJcclxuICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QudXNlckluZm8pIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgLy8gZWxzZSBpZiAodXJsLnNwbGl0KFwiL1wiKVswXSA9PSBcImFkZHJlc3NcIikge1xyXG4gICAgLy8gICAgIHNlcnZlclVybCA9IGJhc2VVcmwyXHJcbiAgICAvLyB9XHJcbiAgICBlbHNlIGlmICh1cmwuc3BsaXQoXCIvXCIpWzBdID09IFwic2NhblwiIHx8IHVybCA9PSBDT05GSUcuUkVTVC5nZXRDaXR5KSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gYmFzZVVybDNcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHNlcnZlclVybCA9IGJhc2VVcmxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VydmVyVXJsO1xyXG59XHJcblxyXG4vKipcclxuICog5qC85byP5YyW57uT5p6cIOWwhue7k+aenOagvOW8j+WMluS4ulxyXG4gKiB7XHJcbiAqICAgICBzdGF0dXNDb2RlICAg5ZCO5Y+w5ZON5bqU56CBXHJcbiAqICAgICBkYXRhICAgICAgICAg5ZCO5Y+w6L+U5Zue55qE5pWw5o2uXHJcbiAqICAgICBtc2cgICAgICAgICAg5ZCO5Y+w55qE5o+Q56S65L+h5oGvXHJcbiAqIH1cclxuICogQHBhcmFtIGRhdGFcclxuICogQHJldHVybnMge3tzdGF0dXNDb2RlOiAoc3RyaW5nfCopLCBkYXRhOiAqLCBtc2c6ICp9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlRm9ybWF0dGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCByZXMgPSB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5yZXNwLFxyXG4gICAgICAgIGRhdGE6IGRhdGEucGFyYW1zLFxyXG4gICAgICAgIG1zZzogZGF0YS5tc2dcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vLyDliKDpmaTlupXpg6ggJy8nXHJcbmZ1bmN0aW9uIGRlbGV0ZVNsYXNoKGhvc3QpIHtcclxuICAgIHJldHVybiBob3N0LnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbn1cclxuXHJcbi8vIOa3u+WKoOWktOmDqCAnLydcclxuZnVuY3Rpb24gYWRkU2xhc2gocGF0aCkge1xyXG4gICAgcmV0dXJuIC9eXFwvLy50ZXN0KHBhdGgpID8gcGF0aCA6IGAvJHtwYXRofWA7XHJcbn1cclxuXHJcbi8vIOino+aekOWPguaVsFxyXG5mdW5jdGlvbiBzZXBhcmF0ZVBhcmFtcyh1cmwpIHtcclxuICAgIGNvbnN0IFtwYXRoID0gJycsIHBhcmFtc0xpbmUgPSAnJ10gPSB1cmwuc3BsaXQoJz8nKTtcclxuXHJcbiAgICBsZXQgcGFyYW1zID0ge307XHJcblxyXG4gICAgcGFyYW1zTGluZS5zcGxpdCgnJicpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gaXRlbS5zcGxpdCgnPScpO1xyXG5cclxuICAgICAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtwYXRoLCBwYXJhbXN9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZyl7XHJcbiAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge319ID0gY29uZmlnO1xyXG4gICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4gICAgbGV0IHNlcnZlclVybCA9ICdodHRwOi8vMTI3LjAuMC4xOjMwMDAvJztcclxuICAgIGxldCBmaW5hbFVybCA9IHNlcnZlclVybCArIHVybDtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHVybDpmaW5hbFVybCxcclxuICAgICAgICAgICAgdHlwZTptZXRob2QsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAnMjAwJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZUZvcm1hdHRlcihyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcign6K+35rGC5aSx6LSlJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYoIG1ldGhvZCA9PT0gJ1BPU1QnICl7XHJcbiAgICAgICAgICAgICBvcHRpb25zLmRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgIG9wdGlvbnMuZGF0YVR5cGUgPSAnanNvbidcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgob3B0aW9ucyk7XHJcbiAgICB9KVxyXG4gICAgXHJcbn1cclxuXHJcbi8vIOS4u+imgeivt+axguaWueazlVxyXG4vLyBleHBvcnQgIGZ1bmN0aW9uIHJlcXVlc3RPcmlnaW4oY29uZmlnKSB7XHJcblxyXG4vLyAgICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbi8vICAgICBjb25zdCB1aSA9IFVQLlcuVUk7XHJcbi8vICAgICBjb25zdCBlbnYgPSBVUC5XLkVudjtcclxuXHJcbi8vICAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge30sIGhlYWRlcnMsIGZvckNoc3AsIGVuY3J5cHQsIGJ5QWpheCwgY2FjaGUsIHVwZGF0ZSwgc3RvcmFnZX0gPSBjb25maWc7XHJcblxyXG4vLyAgICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4vLyAgICAgbGV0IHNlcnZlclVybCA9IGdldFNlcnZVcmwodXJsKTtcclxuXHJcbi8vICAgICAvLyBsZXQgc2VydmVyVXJsID0gYmFzZVVybCA7XHJcbi8vICAgICAvLyBpZiAodHJ1ZSkge1xyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4fmj5Lku7blj5HpgIHor7fmsYJcclxuLy8gICAgICAqL1xyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKiBAcGFyYW0gcGFyYW1zIOivt+axguWPguaVsFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB2ZXJzaW9u77ya54mI5pys77yM6buY6K6k5pivMS4wXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHNvdXJjZe+8muadpea6kO+8jOm7mOiupOagueaNrkFuZHJvaWTjgIFpT1Poh6rliqjmt7vliqBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgZW5jcnlwdO+8muaYr+WQpuWKoOWvhu+8jOm7mOiupOWKoOWvhlxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBtZXRob2TvvJror7fmsYLmlrnms5XvvIxQT1NU5oiWR0VUXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIGNtZO+8muivt+axguWRveS7pO+8iOS5n+WPr+iHquihjOWwhmNtZOe7hOijheiHs3VyaVvkvJjmg6DlkI7lj7Bd5oiWcGF0aFvpkrHljIXlkI7lj7Bd77yJXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHVyaS9wYXRo77ya6K+35rGC5Zyw5Z2A77yM5bu66K6u5LuF5aGr5YWFY21k77yM5LiN5bu66K6u6Ieq6KGM57uE6KOFdXJpL3BhdGhcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgcGFyYW1z77ya5Y+R6YCB57uZ5ZCO5Y+w55qE5Y+C5pWwXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHZpZO+8muWmguaenOmAmui/h0FqYXjmlrnlvI/lkJF3YWxsZXTlkI7lj7Dlj5HpgIHor7fmsYLpnIDopoHmkLrluKZ2aWRcclxuLy8gICAgICAqIEBwYXJhbSBmb3JDaHNwIOaYr+WQpuWQkeS8mOaDoOWQjuWPsOWPkemAgeivt+axgu+8iOm7mOiupOWQkeaJi+acuuWQjuWPsOWPkemAgeivt+axgu+8iVxyXG4vLyAgICAgICogQHBhcmFtIGJ5QWpheCDmmK/lkKbkvb/nlKhBamF45Y+R6YCB6K+35rGC77yI6buY6K6k5L2/55So5o6n5Lu277yJXHJcbi8vICAgICAgKiBAcGFyYW0gc3VjY2VzcyDmiJDlip/lm57osINcclxuLy8gICAgICAqIEBwYXJhbSBlcnJvciDplJnor6/lm57osIPvvIjkuJrliqHplJnor6/vvIlcclxuLy8gICAgICAqIEBwYXJhbSBmYWlsIOWksei0peWbnuiwg++8iOivt+axguWksei0pe+8iVxyXG4vLyAgICAgICovXHJcbi8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4vLyAgICAgICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuXHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgc3VjY2Vzc0NhbGxiYWNrID0gKGRhdGEsZnVjKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuaIkOWKn+e7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuLy8gICAgICAgICAgICAgICAgIGxldCByZXEgPSByZXNwb25zZUZvcm1hdHRlcihkYXRhKTtcclxuLy8gICAgICAgICAgICAgICAgIGlmKCAhIWZ1YyApe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlcS5mdWMgPSBmdWM7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcSlcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGVycm9yQ2FsbGJhY2sgPSAoZXJyKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuWksei0pee7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QuYXBwbHlNY2MgfHwgdXJsID09IENPTkZJRy5SRVNULmFwcGx5TWF0IHx8IHVybCA9PSBDT05GSUcuUkVTVC50b2RheU1vbmV5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJlc3BvbnNlRm9ybWF0dGVyKGVycik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXEpXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBUb2FzdC5pbmZvKGVyci5tc2cgfHwgJ+afpeivouS4muWKoeimgee0oOWHuumUme+8jOivt+eojeWQjuWGjeivle+8gScpO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgbmV0d29ya0NhbGxiYWNrID0gKHhocikgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgVG9hc3QuaW5mbyh4aHIubXNnKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuXHJcbi8vICAgICAgICAgICAgIGlmICh1cmwgIT0gQ09ORklHLlJFU1QuZ2V0VG9kYXlJbmNvbWUpIHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLnNob3dMb2FkaW5nKCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGlmICghY2FjaGUpIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJQYXJhbTpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHtcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgZW5jcnlwdDogZW5jcnlwdCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBmb3JDaHNwOiBmb3JDaHNwLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGJ5QWpheDogYnlBamF4XHJcbi8vICAgICAgICAgICAgICAgICAvLyB9KVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHpnZ7nvJPlrZjor7fmsYJcIilcclxuLy8gICAgICAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZShcclxuLy8gICAgICAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cmk6c2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjayk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNhY2hlVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdG9yZWFnZeetlueVpeaYrzpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2UpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInVwZGF0ZeWHveaVsDpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVwZGF0ZSlcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB57yT5a2Y6K+35rGCXCIpXHJcbi8vICAgICAgICAgICAgICAgICAvKipcclxuLy8gICAgICAgICAgICAgICAgICAqIOWQkeacjeWKoeWZqOWPkemAgeivt+axglxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHBhcmFtcyDor7fmsYLlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmVyc2lvbu+8mueJiOacrO+8jOm7mOiupOaYrzEuMFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzb3VyY2XvvJrmnaXmupDvvIzpu5jorqTmoLnmja5BbmRyb2lk44CBaU9T6Ieq5Yqo5re75YqgXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuY3J5cHTvvJrmmK/lkKbliqDlr4bvvIzpu5jorqTliqDlr4ZcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbWV0aG9k77ya6K+35rGC5pa55rOV77yMUE9TVOaIlkdFVFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBjbWTvvJror7fmsYLlkb3ku6TvvIjkuZ/lj6/oh6rooYzlsIZjbWTnu4Too4Xoh7N1cmlb5LyY5oOg5ZCO5Y+wXeaIlnBhdGhb6ZKx5YyF5ZCO5Y+wXe+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB1cmkvcGF0aO+8muivt+axguWcsOWdgO+8jOW7uuiuruS7heWhq+WFhWNtZO+8jOS4jeW7uuiuruiHquihjOe7hOijhXVyaS9wYXRoXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHBhcmFtc++8muWPkemAgee7meWQjuWPsOeahOWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2aWTvvJrlpoLmnpzpgJrov4dBamF45pa55byP5ZCRd2FsbGV05ZCO5Y+w5Y+R6YCB6K+35rGC6ZyA6KaB5pC65bimdmlkXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZm9yQ2hzcCDmmK/lkKblkJHkvJjmg6DlkI7lj7Dlj5HpgIHor7fmsYLvvIjpu5jorqTlkJHmiYvmnLrlkI7lj7Dlj5HpgIHor7fmsYLvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBieUFqYXgg5piv5ZCm5L2/55SoQWpheOWPkemAgeivt+axgu+8iOm7mOiupOS9v+eUqOaOp+S7tu+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3Mg5oiQ5Yqf5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZXJyb3Ig6ZSZ6K+v5Zue6LCD77yI5Lia5Yqh6ZSZ6K+v77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZmFpbCDlpLHotKXlm57osIPvvIjor7fmsYLlpLHotKXvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSB1cGRhdGUg5byC5q2l5Yi35paw5Zue6LCDIOWmguaenOiuvue9rmFzeW5j5Li6dHJ1ZeWQjuWPr+S7pea3u+WKoHVwZGF0ZeWbnuiwgyDlpoLmnpzkuI3loavlhpnpu5jorqTku6VzdWNjZXNz6L+b6KGM5aSE55CGXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gc3RvcmFnZSDnvJPlrZjlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbmVlZFN3ICAgICAgICAgICAgLy/pu5jorqRmYWxzZeWkp+mDqOWIhueUqOeahOaYr+aPkuS7tumcgOimgeeahOaJi+WKqOWOu+WKoFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzdG9yYWdlVHlwZSAgICAgIC8v6buY6K6k5L2/55SobG9jYWxzdG9yYWdlXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGFzeW5jICAgICAgICAgICAgLy/pu5jorqTojrflj5bnvJPlrZjlkI7kuI3lj5Hor7fmsYLvvIzmlLnkuLp0cnVl5ZCO5Lya5byC5q2l5Y676K+35rGC5ZCO5Y+w5bm25Yi35paw5pWw5o2uXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuZE9mU3luY0Z1bmMgICAgLy90b2RvIOmHjeimge+8ge+8ge+8ge+8geWbnuiwg+S4reWmguaenOWtmOWcqOW8guatpe+8iOaPkuS7tuetie+8iemcgOimgeagh+aYjuW8guatpeeKtuaAgeS4unRydWVcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmFsaWRhdGVUaW1lICAgICAvL+acieaViOacn+m7mOiupOaXoOmZkOacieaViOacnyDljZXkvY3mr6vnp5JcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVdpdGhJZCAgICAgICAvL+m7mOiupHRydWXku6XnlKjmiLdpZOi/m+ihjOWtmOWCqOWQpuWImWZhbHNl5LulbG9jYWzlrZjlgqhcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVN1Y2MgICAgICAgICAvL+S/neWtmOaIkOWKn+WQjueahOWbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlRXJyICAgICAgICAgIC8v5L+d5a2Y5aSx6LSl5ZCO55qE5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHJvbGxLZXkgICAgICAgICAgLy/lvLrliLborr7nva7kuLvplK5cclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2Vjb25kS2V5ICAgICAgICAvL+W8uuWItuiuvue9ruasoeimgemUruWAvFxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g6YeN6KaB6K+05piOIOiwg+eUqOW8guatpeaooeW8j++8iGFzeW5j6K6+572u5Li6dHJ1Ze+8ieWQjuWPr+iDveWcqHN1Y2Nlc3Plm57osIPph4zlrZjlnKjlvILmraXmk43kvZzvvIzor6Xmg4XlhrXkuIvlm57lr7zoh7TnvJPlrZjnmoTlm57osIPlj6/og71cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOacquaJp+ihjOWujOaIkO+8jOivt+axgueahOWbnuiwg+WPiOW8gOWni+aJp+ihjOS6hueahOaDheWGte+8jOaJgOS7peaIkeS7rOe7n+S4gOWcqHN1Y2Nlc3Plm57osIPlkox1cGRhdGXlm57osIPnmoTlhaXlj4Llop7liqDkuobnrKzkuozkuKrlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOeUqOS6juWFvOWuueWbnuiwg+WGheWMheWQq+W8guatpeeahOeKtuWGte+8jOS9v+eUqOaWueazleS4uu+8mummluWFiOiuvue9rmVuZE9mU3luY0Z1bmPlj4LmlbDkuLp0cnVlLOWFtuasoXN1Y2Nlc3Plkox1cGRhdGXlm55cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOiwg+WGheS8muaciTLkuKrlhaXlj4LvvIxzdWNjZXNz77yIcmVzcO+8jGZ1Y++8ie+8jOivt+WcqOS7o+eggemXreWMheWkhOS9v+eUqGZ1Yy5lbmRPZkZ1bmMoKVxyXG4vLyAgICAgICAgICAgICAgICAgICovXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHBhcmFtID0ge31cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGJ5QWpheCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogXCJsaWZlL2xpZmVcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXJpOnNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2VXaXRoU3RvcmFnZShwYXJhbSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjaywgc3RvcmFnZSwgdXBkYXRlKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICB9KVxyXG4vLyAgICAgfSlcclxuXHJcblxyXG4vLyAgICAgLy8gfVxyXG4vLyAgICAgLy8gZWxzZSB7XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4dBamF4IOWPkemAgeivt+axglxyXG4vLyAgICAgICovXHJcbi8vICAgICAvLyByZXR1cm4gYXhpb3Moe1xyXG4vLyAgICAgLy8gICAgIHVybDogYmFzZVVybCArIHVybCxcclxuLy8gICAgIC8vICAgICBtZXRob2QsXHJcbi8vICAgICAvLyAgICAgaGVhZGVycyxcclxuLy8gICAgIC8vICAgICBkYXRhOiBtZXRob2QgPT09ICdHRVQnID8gdW5kZWZpbmVkIDogZGF0YSxcclxuLy8gICAgIC8vICAgICBwYXJhbXM6IE9iamVjdC5hc3NpZ24obWV0aG9kID09PSAnR0VUJyA/IGRhdGEgOiB7fSwgcGFyYW1zKVxyXG4vLyAgICAgLy8gfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gICAgIC8vXHJcbi8vICAgICAvLyAgICAgbGV0IHJlcSA9IHtcclxuLy8gICAgIC8vICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2UuZGF0YS5yZXNwLFxyXG4vLyAgICAgLy8gICAgICAgICBkYXRhOiByZXNwb25zZS5kYXRhLnBhcmFtc1xyXG4vLyAgICAgLy8gICAgIH1cclxuLy8gICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcSlcclxuLy8gICAgIC8vIH0pLmNhdGNoKGVyciA9PiB7XHJcbi8vICAgICAvLyAgICAgLy8g6K+35rGC5Ye66ZSZXHJcbi8vICAgICAvLyAgICAgVG9hc3QuaW5mbygncmVxdWVzdCBlcnJvciwgSFRUUCBDT0RFOiAnICsgZXJyLnJlc3BvbnNlLnN0YXR1cyk7XHJcbi8vICAgICAvLyAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XHJcbi8vICAgICAvLyB9KTtcclxuLy8gICAgIC8vIH1cclxuXHJcbi8vIH1cclxuXHJcbi8vIOS4gOS6m+W4uOeUqOeahOivt+axguaWueazlVxyXG5leHBvcnQgY29uc3QgZ2V0ID0gKHVybCwgZGF0YSwgcGFyYW0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IHBhcmFtQWxsID0gT2JqZWN0LmFzc2lnbih7Zm9yQ2hzcDogdHJ1ZSwgZW5jcnlwdDogdHJ1ZSwgY2FjaGU6IGZhbHNlLCBieUFqYXg6IGZhbHNlfSwgcGFyYW0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QoT2JqZWN0LmFzc2lnbih7dXJsLCBkYXRhfSwgcGFyYW1BbGwpKVxyXG59O1xyXG5leHBvcnQgY29uc3QgcG9zdCA9ICh1cmwsIGRhdGEsIHBhcmFtID0ge30pID0+IHtcclxuICAgIGxldCBwYXJhbUFsbCA9IE9iamVjdC5hc3NpZ24oe2ZvckNoc3A6IHRydWUsIGVuY3J5cHQ6IHRydWUsIGNhY2hlOiBmYWxzZSwgYnlBamF4OiBmYWxzZX0sIHBhcmFtKTtcclxuICAgIHJldHVybiByZXF1ZXN0KE9iamVjdC5hc3NpZ24oe21ldGhvZDogJ1BPU1QnLCB1cmwsIGRhdGF9LCBwYXJhbUFsbCkpXHJcbn07XHJcbmV4cG9ydCBjb25zdCBwdXQgPSAodXJsLCBkYXRhKSA9PiByZXF1ZXN0KHttZXRob2Q6ICdQVVQnLCB1cmwsIGRhdGF9KTtcclxuZXhwb3J0IGNvbnN0IGRlbCA9ICh1cmwsIGRhdGEpID0+IHJlcXVlc3Qoe21ldGhvZDogJ0RFTEVURScsIHVybCwgZGF0YX0pO1xyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIOWKn+iDveWHveaVsOWMulxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIOWwhlVSTOS4reeahHNlYXJjaCDlrZfnrKbkuLIg6L2s5o2i5oiQIOWvueixoVxyXG4gKiBAcGFyYW0gc2VhcmNoXHJcbiAqIEByZXR1cm5zIHt7fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZWFyY2hQYXJhbSA9IChzZWFyY2gpID0+IHtcclxuICAgIGlmICghIXNlYXJjaCkge1xyXG4gICAgICAgIGxldCBzdHIgPSBzZWFyY2guc2xpY2UoMSk7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gc3RyLnNwbGl0KFwiJlwiKTtcclxuICAgICAgICBsZXQgb2JqID0ge307XHJcbiAgICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW0gPSBpdGVtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgb2JqW3BhcmFtWzBdXSA9IHBhcmFtWzFdO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIGNvZG92YSDmj5Lku7bosIPnlKjljLpcclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5cclxuLy8g5ZCv5YGc5pS25qy+56CBXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRYaWFvV2VpUGF5KHBhcmFtLCBzdWMsIGVycikge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuc2V0WGlhb1dlaVBheShwYXJhbSwgc3VjLCBlcnIpO1xyXG59XHJcblxyXG4vL+Wwj+W+rmF1ZGlvXHJcbmV4cG9ydCBjb25zdCBzZXRYaWFvV2VpQXVkaW8gPSAocGFyYW0sIHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5zZXRYaWFvV2VpQXVkaW8ocGFyYW0sIHN1YywgZXJyKTtcclxufVxyXG5leHBvcnQgY29uc3QgZ2V0WGlhb1dlaUF1ZGlvID0gKHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5nZXRYaWFvV2VpQXVkaW8oc3VjLCBlcnIpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdG9hc3QgPSAobXMpID0+IHtcclxuICAgIFRvYXN0LmluZm8obXMsIDIpO1xyXG59XHJcbi8qKlxyXG4gKiDorr7nva7pobbpg6hiYXJcclxuICogQHBhcmFtIHRpdGxlIOmhtemdouWQjeensFxyXG4gKiBAcGFyYW0gcmlnaHRCYXIg5Y+z5L6n5oyJ6ZKu5ZCN56ewXHJcbiAqIEBwYXJhbSByaWdodENhbGxiYWNrIOWPs+S+p+aMiemSruWbnuiwg1xyXG4gKiBAcGFyYW0gcmlnaHRCYXJJbWcg5Y+z5L6n5oyJ6ZKu5Zu+54mHXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYmVmb3JlRW50ZXJSb3V0ZXIgPSAodGl0bGUgPSBcIlwiLCByaWdodEJhciA9IFwiXCIsIHJpZ2h0Q2FsbGJhY2sgPSBudWxsLCByaWdodEJhckltZyA9IG51bGwpID0+IHtcclxuICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHRpdGxlKVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueql+WPo+WPs+S+p+aMiemSrlxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZSDlm77moIfmoIfpophcclxuICAgICAgICAgKiBAcGFyYW0gaW1hZ2Ug5Zu+5qCH5paH5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIGhhbmRsZXIg54K55Ye75Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKCEhcmlnaHRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uKHJpZ2h0QmFyLCByaWdodEJhckltZywgcmlnaHRDYWxsYmFjaylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24oXCJcIiwgbnVsbCwgbnVsbClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDpgJrnn6XlrqLmiLfnq6/kv67mlLnnirbmgIFcclxuICovXHJcbmV4cG9ydCBjb25zdCBtY2NTdGF0ZUNoYW5nZWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAubWNjU3RhdGVDaGFuZ2VkKClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kUXJDb2RlID0gKHBhcmFtcywgc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5omr5o+P5p2h56CB5ZKM5LqM57u056CBXHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAgICAgICAqIEBwYXJhbSBzdWNjZXNzXHJcbiAgICAgICAgICogQHBhcmFtIGZhaWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuc2NhblFSQ29kZShwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VXZWJWaWV3ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY2xvc2VXZWJWaWV3KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2ZXJpZnlQYXlQd2QgPSAocGFyYW0sIHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnZlcmlmeVBheVB3ZChwYXJhbSwgc3VjY2VzcywgZmFpbClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVXZWJWaWV3ID0gKHVybCwgcGFyYW1zID0gbnVsbCwgdGl0bGUgPSAnJywgaXNGaW5pc2ggPSBcIjFcIikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY3JlYXRlV2ViVmlldyh1cmwsIHBhcmFtcywgdGl0bGUsIGlzRmluaXNoKVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRVc2VyRGV0YWlsSW5mbyA9IChzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuZ2V0VXNlckRldGFpbEluZm8oc3VjY2VzcywgZmFpbClcclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWwhmNhdmFzIOS/neWtmOWIsOacrOWcsOebuOWGjFxyXG4gKiBAcGFyYW0gY2FudmFzXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2F2ZVFjb2RlID0gKGNhbnZhcykgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgdWkgPSBVUC5XLlVJIHx8IHt9O1xyXG4gICAgdmFyIHBpY1VybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhcHAubG9nRXZlbnQoJ3NhdmVQaWN0dXJlX05ld1llYXJBY3QnKTtcclxuICAgICAgICBhcHAuc2F2ZVBpY1RvTG9jYWwoe1xyXG4gICAgICAgICAgICB1cmw6IHBpY1VybCAmJiBwaWNVcmwuc3Vic3RyKDIyKVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdWkuc2hvd1RvYXN0V2l0aFBpYygn5bey5L+d5a2Y5Yiw57O757uf55u45YaMJyk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd1RvYXN0KG1zZyB8fCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoYXJlID0gKHRpdGxlLCBkZXNjLCBpbWdVUkwsIHBhZ2VVUmwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIGVudiA9IFVQLlcuRW52IHx8IHt9O1xyXG5cclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pi+56S65YiG5Lqr6Z2i5p2/XHJcbiAgICAgICAgICog5aaC5p6c5omA5pyJ5rig6YGT5L2/55So55u45ZCM55qE5YiG5Lqr5YaF5a655YiZ5LuF5aGr5YaZcGFyYW1z5Y2z5Y+v77yMXHJcbiAgICAgICAgICog5aaC5p6c6ZyA6KaB5qC55o2u5LiN5ZCM5rig6YGT5a6a5Yi25YiG5Lqr5YaF5a6577yM5YiZ5Y+vcGFyYW1z55WZ56m677yM5Zyoc2hhcmVDYWxsYmFja+S4rei/lOWbnuaMh+Wumua4oOmBk+eahOWIhuS6q+WGheWuuVxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXMg5YiG5Lqr5Y+C5pWwXHJcbiAgICAgICAgICogICAgICAgICAgICAgIHtcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHRpdGxl77yaIOWIhuS6q+agh+mimFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgZGVzYzog5YiG5Lqr5pGY6KaBXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBwaWNVcmzvvJrliIbkuqvlm77moIdcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNoYXJlVXJs77ya6K+m5oOF5Zyw5Z2AXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiBAcGFyYW0gc2hhcmVDYWxsYmFjayDliIbkuqvml7blm57osINcclxuICAgICAgICAgKiAgICAgICAgICAgICAgY2hhbm5lbO+8mntcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDDvvJrnn63kv6FcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDHvvJrmlrDmtarlvq7ljZpcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDPvvJrlvq7kv6Hlpb3lj4tcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDTvvJrlvq7kv6HmnIvlj4vlnIhcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDXvvJpRUeWlveWPi1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNu+8mlFR56m66Ze0XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA377ya5aSN5Yi26ZO+5o6lXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiAgICAgICAgICAgICAgZGF0YTog6buY6K6k5YiG5Lqr5pWw5o2uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLnNob3dTaGFyZVBhbmVsKHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBkZXNjOiBkZXNjLFxyXG4gICAgICAgICAgICBwaWNVcmw6IGltZ1VSTCxcclxuICAgICAgICAgICAgc2hhcmVVcmw6IHBhZ2VVUmwgIC8vIHRvZG8g5pmu6YCa5YiG5LqrXHJcbiAgICAgICAgfSwgbnVsbClcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE5a6a5L2N77yM6aaW5YWI6YCa6L+HR1BTIOWumuS9je+8jOWmguaenOWumuS9jeWksei0pe+8jOmAmui/h+aOpeWPo2dldENpdHks5Yip55SoSVDlnLDlnYDov5vooYzlrprkvY3vvIzlpoLmnpzov5jmmK/lpLHotKXvvIzpgJrov4fmj5Lku7bojrflj5blrqLmiLfnq6/lt6bkuIrop5LnmoTln47luILkv6Hmga/vvIzkvp3nhLblpLHotKXpu5jorqTnqb9jaXR5Q2Q6MzEwMDAwIOS7o+ihqOS4iua1t+W4glxyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50TG9jYXRpb25JbmZvID0gKGNhbGxiYWNrMikgPT4ge1xyXG4gICAgY29uc3QgdWkgPSBVUC5XLlVJO1xyXG4gICAgdWkuc2hvd0xvYWRpbmcoKTtcclxuICAgIGxldCBjYWxsYmFjayA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4gICAgICAgIGNhbGxiYWNrMihkYXRhKVxyXG4gICAgfVxyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYXBwLmdldEN1cnJlbnRMb2NhdGlvbkluZm8oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNtZDogXCIvXCIgKyBDT05GSUcuUkVTVC5nZXRDaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhdGg6IFwiaHR0cDovLzE3Mi4yMS4zMy41NjozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCIrQ09ORklHLlJFU1QuZ2V0Q2l0eSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBcIjJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCB0cnVlLCBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoTmF0aXZlRGF0YShjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hOYXRpdmVEYXRhKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaE5hdGl2ZURhdGEgPSAoY2FsbGJhY2spID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5blrqLmiLfnq6/kv6Hmga9cclxuICAgICAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICAgICAqIEBwYXJhbSBmYWlsXHJcbiAgICAgICAgICogQHBhcmFtIHR5cGUgMO+8muWfjuW4guS/oeaBr2NpdHlDZO+8mzHvvJrnu4/nuqzluqbvvJs177yaVXNlcklkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLmZldGNoTmF0aXZlRGF0YSgwLCAoZGF0YSA9IHt9KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICBjaXR5Q2Q6IFwiMzEwMDAwXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgY29uc3Qgc2F2ZVBpY1RvTG9jYWwgPSAoY2FudmFzLCByZXNvbHZlKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciB1aSA9IFVQLlcuVUkgfHwge307XHJcbiAgICB2YXIgcGljVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zYXZlUGljVG9Mb2NhbCh7XHJcbiAgICAgICAgICAgIHVybDogcGljVXJsICYmIHBpY1VybC5zdWJzdHIoMjIpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+aIkOWKn1xyXG4gICAgICAgICAgICAhIXJlc29sdmUgJiYgcmVzb2x2ZShcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgfSwgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgISFyZXNvbHZlICYmIHJlc29sdmUoXCJmYWlsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlVGV4dENhbnZhc2UgPSAodGV4dCwgY29sb3IsIGxvbmcgPSA2ODQsIHNob3QgPSA2MCkgPT4ge1xyXG5cclxuICAgIGxldCByZW0ycHggPSAodmFsKSA9PiB7XHJcbiAgICAgICAgdmFyIGNXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgICAgIHJldHVybiB2YWwgKiBjV2lkdGggLyA3NTBcclxuICAgIH1cclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dENhbnZhcycpO1xyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIC8v6Kit572u55Wr5L2I55qE5a+s6auYXHJcbiAgICAvLyB2YXIgYmdXaWR0aCA9IHJlbTJweChsb25nKTtcclxuICAgIC8vIHZhciBiZ0hlaWdodCA9IHJlbTJweChzaG90KTtcclxuXHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHNob3QpO1xyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbG9uZyk7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgY3R4LnJvdGF0ZSgtOTAgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgIHZhciB0ZXh0ID0gdGV4dDtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XHJcbiAgICBsZXQgZm9udFNpemUgPSBzaG90O1xyXG4gICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB3aGlsZSAoY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoID4gbG9uZykge1xyXG4gICAgICAgIGZvbnRTaXplLS07XHJcbiAgICAgICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB9XHJcbiAgICBjdHguZmlsbFRleHQodGV4dCwgLWxvbmcsIGZvbnRTaXplKTtcclxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOeUn+aIkOWbvueJh+W5tuS/neWtmOWIsOebuOWGjFxyXG4gKiBAcGFyYW0gYmd1cmwg6IOM5pmv5Zu+54mH55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVVUkwg5LqM57u056CB55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVXZEFuZEhnIOS6jOe7tOeggeeahOWuveW6plxyXG4gKiBAcGFyYW0geFdpZHRoIOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpIg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5SGVpZ2h0IOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB0ZXh0YmdVUkwg5Yqg5YWl55S75biD55qE5Zu+54mH55qEVVJMXHJcbiAqIEBwYXJhbSB4VGV4dFdpZHRoIOWKoOWFpeeUu+W4g+eahOWbvueJh+i3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5VGV4dEhlaWdodCDliqDlhaXnlLvluIPnmoTlm77niYfot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVDb252YXNBbmRTYXZlUGhvdG8gPSAoY2FudmFzT2JqLCByZXNvbHZlKSA9PiB7XHJcbiAgICBsZXQge2JndXJsLCBxcmNvZGVVUkwsIHFyY29kZVdkQW5kSGcsIHhXaWR0aCwgeUhlaWdodCwgdGV4dGJnVVJMLCB4VGV4dFdpZHRoLCB5VGV4dEhlaWdodH0gPSBjYW52YXNPYmo7XHJcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1vbkNhbnZhc1dyYXBwZXInKTtcclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk55S75biD5YaF5a65XHJcbiAgICAgKi9cclxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aFxyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLnNyYyA9IGJndXJsO1xyXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy/oqK3nva7nlavkvYjnmoTlr6zpq5hcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGltZy53aWR0aCk7XHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaW1nLmhlaWdodCk7XHJcblxyXG4gICAgICAgIC8v5Zyo55Wr5biD5LiK55Wr6IOM5pmv5ZyWXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG5cclxuICAgICAgICBpZiAoISF0ZXh0YmdVUkwpIHtcclxuICAgICAgICAgICAgbGV0IHRleHRVcmkgPSB0ZXh0YmdVUkw7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0SW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIHRleHRJbWcuc3JjID0gdGV4dFVyaTtcclxuICAgICAgICAgICAgdGV4dEltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRleHRJbWcsIHhUZXh0V2lkdGgsIHlUZXh0SGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuozntq3norzlnJbniYflpKflsI9cclxuICAgICAgICB2YXIgcXJjb2RlV2lkdGhBbmRIZWlnaHQgPSBxcmNvZGVXZEFuZEhnO1xyXG4gICAgICAgIC8v5riF6Zmk5LqM57u056CBXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB2YXIgcXJjb2RlID0gbmV3IFFSQ29kZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKSwge1xyXG4gICAgICAgICAgICB0ZXh0OiBxcmNvZGVVUkwsXHJcbiAgICAgICAgICAgIGhlaWdodDogcXJjb2RlV2lkdGhBbmRIZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoOiBxcmNvZGVXaWR0aEFuZEhlaWdodCxcclxuICAgICAgICAgICAgY29ycmVjdExldmVsOiBRUkNvZGUuQ29ycmVjdExldmVsLkxcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcXJjb2RlSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xyXG4gICAgICAgIHFyY29kZUltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8v55Wr5LqM57at56K855qE5ZyW54mHXHJcbiAgICAgICAgICAgIGxldCBxcmNvZGVEeCA9IHhXaWR0aCwgcXJjb2RlRHkgPSB5SGVpZ2h0O1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHFyY29kZUltZywgcXJjb2RlRHgsIHFyY29kZUR5KTtcclxuICAgICAgICAgICAgLy8gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICBzYXZlUGljVG9Mb2NhbChjYW52YXMsIHJlc29sdmUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdC5qcyIsImNvbnN0IGNvbmZpZyA9IHtcclxuICAgIFJFU1Q6IHtcclxuICAgICAgICBhcHBseU1jYzogXCJjb2xsZWN0aW9uQ29kZS9hcHBseU1jY1wiLCAvLzIuNC4055Sz6K+35pS25qy+56CB5o6l5Y+jXHJcbiAgICAgICAgZ2V0TWNjQ2FyZExpc3Q6IFwiY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIiwgLy8yLjQuMuWVhuaIt+aUtuasvueggeWNoeWIl+ihqOaOpeWPo1xyXG4gICAgICAgIGFwcGx5TWF0OiBcImNvbGxlY3Rpb25Db2RlL2FwcGx5TWF0XCIsIC8v55Sz6K+354mp5paZ5o6l5Y+jXHJcbiAgICAgICAgZ2V0TWNobnRBbmRBcmVhSW5mOiBcIm1jaG50L2dldE1jaG50QW5kQXJlYUluZi5zanNvblwiLCAvL+WVhuaIt+exu+Wei+WPiuWcsOWMuuWIl+ihqOafpeivolxyXG4gICAgICAgIHVwZ3JhZGVNY2M6IFwiY29sbGVjdGlvbkNvZGUvdXBncmFkZU1jY1wiLCAvLzIuNC425Y2H57qn5pS25qy+56CB5o6l5Y+jLFxyXG4gICAgICAgIGdldEFkZHJMaXN0OiBcImFkZHJlc3MvZ2V0QWRkckxpc3RcIiAsIC8vMi40LjEzIOiOt+WPluaUtui0p+WcsOWdgOWIl+ihqFxyXG4gICAgICAgIGRlbGV0ZUFkZHJlc3M6IFwiYWRkcmVzcy9kZWxldGVBZGRyZXNzXCIgLCAvLzIuNC4xMiDliKDpmaTmlLbotKflnLDlnYBcclxuICAgICAgICBlZGl0QWRkcmVzczogXCJhZGRyZXNzL2VkaXRBZGRyZXNzXCIsIC8vMi40LjExIOS/ruaUueaUtui0p+WcsOWdgCxcclxuICAgICAgICBuZXdBZGRyZXNzOiBcImFkZHJlc3MvbmV3QWRkcmVzc1wiLCAvLzIuNC4xMCDmlrDlop7mlLbotKflnLDlnYBcclxuICAgICAgICBtY2hudE9wZXIgOlwibWNobnQvbWNobnRPcGVyXCIsIC8vMi4yLjIg5bqX6ZO65L+h5oGv5pu05pawXHJcbiAgICAgICAgZ2V0TGltaXRBdEluZm86XCJtY2hudC9nZXRMaW1pdEF0SW5mb1wiLCAvL+iOt+WPluaUtuasvumZkOminVxyXG4gICAgICAgIHNldE1jY09uT2ZmOlwiY29sbGVjdGlvbkNvZGUvc2V0TWNjT25PZmZcIiwgLy/lgZzmraLlkozlkK/nlKjku5jmrL7noIHlgJ/lj6NcclxuICAgICAgICBnZXRNY2hudERldGFpbDpcIm1jaG50L21jaG50RGV0YWlsXCIsIC8vMi4yLjEg6I635Y+W5bqX6ZO66K+m5oOF6aG16Z2iXHJcbiAgICAgICAgLy8gdXBncmFkZU1jYzogXCJjb2xsZWN0aW9uQ29kZS91cGdyYWRlTWNjXCIsIC8vMi40LjbljYfnuqfmlLbmrL7noIHmjqXlj6NcclxuICAgICAgICBnZXRUb2RheVRyYW5zOlwidHJhbi9nZXRUb2RheVRyYW5zXCIsLy8yLjEuMy8v5LuK5pel6K6i5Y2V5o6l5Y+jXHJcbiAgICAgICAgZ2V0VG9kYXlJbmNvbWU6XCJ0cmFuL2dldFRvZGF5SW5jb21lXCIsLy8yLjEuMeWVhuaIt+acjeWKoemmlumhteS7iuaXpeaUtuasvuaOpeWPo35+fn5+fn5+XHJcbiAgICAgICAgZ2V0SGlzdG9yeUluY29tZTpcInRyYW4vZ2V0SGlzdG9yeUluY29tZVwiLC8vMi4xLjLljoblj7LmlLbmrL7mjqXlj6NcclxuICAgICAgICBnZXRIaXN0b3J5VHJhbnM6XCJ0cmFuL2dldEhpc3RvcnlUcmFuc1wiLC8vMi4xLjTljoblj7LorqLljZXmjqXlj6NcclxuICAgICAgICBnZXRMb2dpc3RpY3NTdDpcIm1hdGVyaWVsL2dldExvZ2lzdGljc1N0XCIsLy8yLjMuM+eJqea1geivpuaDheaOpeWPo+afpeivolxyXG4gICAgICAgIGdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW06XCJ0cmFuL2dldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW1cIiwvLzIuMS415Y2V56yU6K6i5Y2V5p+l6K+i5o6l5Y+jXHJcbiAgICAgICAgZ2V0QXVkaXRJbmZvOlwiY29sbGVjdGlvbkNvZGUvZ2V0QXVkaXRJbmZvXCIsLy8yLjQuMTTkv6HnlKjljaHljYfnuqflrqHmoLjnu5Pmnpzmn6Xor6JcclxuICAgICAgICB1cGRhdGVNY2NDYXJkOlwiY29sbGVjdGlvbkNvZGUvdXBkYXRlTWNjQ2FyZFwiLC8vMi40Ljnmm7TmjaLmlLbmrL7ljaHmjqXlj6NcclxuICAgICAgICBnZXRVcGdyYWRlU3Q6XCJtY2hudC9nZXRVcGdyYWRlU3RcIiwvL+afpeivouWVhuaIt+aYr+WQpuWNh+e6p+S/oeeUqOWNoeaUtuasvlxyXG4gICAgICAgIGdldE1jY1RyYW5zTnVtOidjb2xsZWN0aW9uQ29kZS9nZXRNY2NUcmFuc051bScsLy/ojrflj5bosIPlj5bmlK/ku5jmjqfku7bnmoRUTuWPt1xyXG4gICAgICAgIGdldE1hdGVyaWVsSW5mb0xpc3Q6XCJjb2xsZWN0aW9uQ29kZS9nZXRNYXRlcmllbEluZm9MaXN0XCIsLy8yLjQuM+eJqeaWmeS/oeaBr+WIl+ihqOaOpeWPo1xyXG4gICAgICAgIHVzZXJJbmZvOlwiL2FwcC9pbkFwcC91c2VyL2dldFwiLC8v6I635Y+W55So5oi35L+h5oGvXHJcbiAgICAgICAgaXNCbGFjazpcInNjYW4vaXNCbGFja1wiLC8vMi4xLjXmlLbpk7blkZjmmK/lkKblnKjpu5HlkI3ljZVcclxuICAgICAgICBpc0FwcGx5Olwic2Nhbi9pc0FwcGx5XCIsLy8yLjEuNOaYr+WQpuW3sue7j+eUs+ivt+e6ouWMheeggVxyXG4gICAgICAgIHNoYXJlTGluazpcInNjYW4vc2hhcmVMaW5rXCIsLy8yLjEuNueUn+aIkOe6ouWMheeggemTvuaOpVxyXG4gICAgICAgIHJlY21kUmVjb3JkOlwic2Nhbi9yZWNtZFJlY29yZFwiLC8v5o6o6I2Q5YWz57O76K6w5b2VXHJcbiAgICAgICAgZ2V0TG9naXN0aWNzTGlzdDpcIm1hdGVyaWVsL2dldExvZ2lzdGljc0xpc3RcIiwvL+iOt+WPlueJqeaWmeWOhuWPsuiuouWNlVxyXG4gICAgICAgIGdldFJld2FyZExpc3Q6XCJzY2FuL2dldFJld2FyZExpc3RcIiwvLzIuMS435p+l6K+i5pS26ZO25ZGY6LWP6YeR5piO57uG6K6w5b2VXHJcbiAgICAgICAgZ2V0UHJvdG9jb2xJbmZvOlwiY29sbGVjdGlvbkNvZGUvZ2V0UHJvdG9jb2xJbmZvXCIsLy/llYbmiLfljYfnuqfmn6Xor6LmmL7npLrljY/orq7nmoTlkI3np7DlkozljY/orq7nmoTlnLDlnYBcclxuICAgICAgICBnZXRDaXR5OlwicmVnaW9uL2dldENpdHlcIiwvL+mAmui/h0lQ5Zyw5Z2A6I635Y+W5Zyw5Z2A5a6a5L2NXHJcbiAgICAgICAgZ2V0UXJVcmw6XCJjb2xsZWN0aW9uQ29kZS9nZXRRckluZm9cIi8vMi4xLjHojrflj5bnlKjmiLfmlLbmrL7noIFVUkxcclxuICAgIH0sXHJcbiAgICBTVEFUVVNDT0RFOiB7XHJcbiAgICAgICAgU1VDQ0VTUzpcIjAwXCJcclxuICAgIH0sXHJcbiAgICBDT05TVF9EQVRBOntcclxuICAgICAgICBpbWdlU2l6ZTpcIjMwMFwiXHJcbiAgICB9LFxyXG4gICAgQ0FDSEVLRVk6e1xyXG4gICAgICAgIGdldE1jY0NhcmRMaXN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1jb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBVcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLW1jaG50L2dldFVwZ3JhZGVTdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLW1jaG50L2dldFVwZ3JhZGVTdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRNY2hudERldGFpbDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLW1jaG50L21jaG50RGV0YWlsXCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtbWNobnQvbWNobnREZXRhaWxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNBcHBseTp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLXNjYW4vaXNBcHBseVwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLXNjYW4vaXNBcHBseVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRBZGRyTGlzdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLWFkZHJlc3MvZ2V0QWRkckxpc3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1hZGRyZXNzL2dldEFkZHJMaXN0XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvY29uZmlnLmpzIiwiaW1wb3J0IEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCI7XHJcblxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5Y+q5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIOWFiOivu+e8k+WtmO+8jOWQjOatpeW+gOWQjuWPsOWPkeivt+axgu+8jOivt+axguaKpeaWh+WbnuadpeWQjuWIt+aWsOe8k+WtmOWPiumhtemdolxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlID0gKHVwZGF0ZSxyb2xsS2V5LHNlY29uZEtleSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICByb2xsS2V5LFxyXG4vLyAgICAgICAgICAgICBzZWNvbmRLZXlcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIHVwZGF0ZTogdXBkYXRlLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDkuI3mlK/mjIEgc3cgICAs5rC45LmF57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7Y2FjaGU6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVMb25nVGltZSA9IChyb2xsS2V5LCBzZWNvbmRLZXkpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICByb2xsS2V5LFxyXG4vLyAgICAgICAgICAgICBzZWNvbmRLZXlcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOWPquS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAx5YiG6ZKf5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMW1pbiA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTMwbWluID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDMwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UxaG91ciA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqNjAqMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMmhvdXIgPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMiAqIDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcblxyXG4vL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMjRkaWFuID0gKCkgPT4ge1xyXG4vL1xyXG4vLyAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4vLyAgICAgbGV0IHRlbW9ycm93ID0gbmV3IERhdGUoKTtcclxuLy8gICAgIHRlbW9ycm93LnNldEhvdXJzKDIzKTtcclxuLy8gICAgIHRlbW9ycm93LnNldE1pbnV0ZXMoNTkpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0U2Vjb25kcyg1OSk7XHJcbi8vICAgICBsZXQgdGVtID0gdGVtb3Jyb3cuZ2V0VGltZSgpO1xyXG4vLyAgICAgbGV0IHZhbGlkYXRlVGltZSA9IHRlbSAtIG5vdyArIDEwMDAgKiA2MFxyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgICAgIHZhbGlkYXRlVGltZTogdmFsaWRhdGVUaW1lLFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICB3b3JrYm9455qE562W55WlICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuLy9cclxuLy8gLyoqXHJcbi8vICAq5Li6Z2V06K+35rGC77yM5LiN5Yqg5a+GXHJcbi8vICAq5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKuWFiOivu+e8k+WtmO+8jOWQjOaXtuW+gOWQjuWPsOWPkeivt+axgu+8jOivt+axguaKpeaWh+WbnuadpeWQjuWIt+aWsOe8k+WtmOWPiumhtemdolxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgY2FjaGU6IGJvb2xlYW4sIGFzeW5jOiBib29sZWFufX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZSA9ICh1cGRhdGUpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgYnlBamF4OiBmYWxzZSwvL+WmguaenOimgeaUr+aMgXN3IOWwseS4jemcgOS9v+eUqGFqYXhcclxuLy8gICAgICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgdXBkYXRlOiB1cGRhdGVcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAzMOWIhumSn+WGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QzMG1pbiA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDMwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDHlsI/mmYLlhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MWhvdXIgPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDJob3VyID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMiAqIDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8qKlxyXG4gKiDor6XnrZbnlaXmmK/kuIDlrprml7bpl7TlhoXkuI3lkJHlkI7lj7Dor7fmsYLmlbDmja7vvIwg5aaC5p6c5Zyo6K6+5aSH5LiK5pSv5oyBc3fliJnkvb/nlKhzdyzlkKbliJnkvb/nlKggbG9jYWxTdG9yYWdlXHJcbiAqIEBwYXJhbSB0aW1lICDopoHnvJPlrZjnmoTml7bpl7Qg5Y2V5L2N5piv5q+r56eSXHJcbiAqIEByZXR1cm5zIHt7YnlBamF4OiBib29sZWFuLCBmb3JDaHNwOiBib29sZWFuLCBlbmNyeXB0OiBib29sZWFuLCBjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge3ZhbGlkYXRlVGltZTogKn19fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QgPSh0aW1lKT0+e1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBieUFqYXg6IHRydWUsXHJcbiAgICAgICAgZm9yQ2hzcDpmYWxzZSxcclxuICAgICAgICBlbmNyeXB0OmZhbHNlLFxyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgdmFsaWRhdGVUaW1lOnRpbWUsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqICDor6XnrZbnlaXmmK/kuIDlrprml7bpl7TlhoXkuI3lkJHlkI7lj7Dor7fmsYLmlbDmja7vvIzmt7vliqDnvJPlrZjlj6rlnKhsb2NhbHN0b3JhZ2XkuK1cclxuICogQHBhcmFtIHRpbWUgIOimgee8k+WtmOeahOaXtumXtCDljZXkvY3mmK/mr6vnp5JcclxuICogQHBhcmFtIHJvbGxLZXkgICDpnZ7lv4Xloasg5aaC5p6c5ZCO5pyf6KaB5Yig6Zmk6L+Z5Liq57yT5a2Y77yM6L+Z5aGr5YaZ6L+Za2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXkgIOmdnuW/heWhqyDlpoLmnpzlkI7mnJ/opoHliKDpmaTov5nkuKrnvJPlrZjvvIzov5nloavlhpnov5lrZXlcclxuICogQHJldHVybnMge3tjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge25lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiAqLCByb2xsS2V5OiAqLCBzZWNvbmRLZXk6ICp9fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjYWNoZUZpcnN0U3RvcmFnZSA9KHRpbWUscm9sbEtleSwgc2Vjb25kS2V5KT0+e1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlVGltZTogdGltZSxcclxuICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzcG9uc2VGb3JtYXR0ZXIgPSAoZGF0YSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnJlc3AsXHJcbiAgICAgICAgZGF0YTogZGF0YS5wYXJhbXMsXHJcbiAgICAgICAgbXNnOiBkYXRhLm1zZ1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDor6XnrZbnlaXmmK/lhYjor7vnvJPlrZjvvIzlkIzml7blkJHlkI7lj7Dlj5HpgIHor7fmsYLvvIzor7fmsYLlm57mnaXlkI7lkIzmraXmm7TmlrDnvJPlrZjvvIzlm57osIN1cGRhdGUg5Ye95pWw77yMXHJcbiAqIEBwYXJhbSB1cGRhdGUg5b+F5aGr5pu05paw6aG16Z2i55qE5Zue6LCD5Ye95pWwXHJcbiAqIEBwYXJhbSByb2xsS2V5ICDpnZ7lv4Xloasg6K6+572u57yT5a2Y55qEIHJvbGxrZXlcclxuICogQHBhcmFtIHNlY29uZEtleSDpnZ7lv4Xloasg6K6+572u57yT5a2Y55qEIHNlY29uZEtleVxyXG4gKiBAcmV0dXJucyB7e2NhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7YXN5bmM6IGJvb2xlYW4sIHJvbGxLZXk6ICosIHNlY29uZEtleTogKn0sIHVwZGF0ZTogKn19XHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlID0gKHVwZGF0ZSxyb2xsS2V5LHNlY29uZEtleSkgPT4ge1xyXG5cclxuICAgbGV0ICByZWZyZXNoRG9tRnVuYz0ocmVzcG9uc2UpPT57XHJcbiAgICAgICBsZXQgcmVxPXJlc3BvbnNlRm9ybWF0dGVyKHJlc3BvbnNlKVxyXG4gICAgICAgLy8g5bCG6I635Y+W55qE5pWw5o2u5ZKM57yT5a2Y5Lit55qE5pWw5o2u6L+b6KGM5a+55q+UXHJcbiAgICAgICBsZXQgZGF0YUZyb21DYWNoZSA9IHt9O1xyXG4gICAgICAgVVAuVy5VdGlsLmdldEZyb21TdG9yYWdlKHtcclxuICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgfSxmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICBpZiggISFkYXRhICl7XHJcbiAgICAgICAgICAgICAgICBkYXRhRnJvbUNhY2hlID0gZGF0YTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgIH0pXHJcbiAgICAgICBsZXQgaXNTYW1lQXRBbGwgPSBJbW11dGFibGUuaXMoSW1tdXRhYmxlLmZyb21KUyhyZXEpLEltbXV0YWJsZS5mcm9tSlMoZGF0YUZyb21DYWNoZSkpOyAvL+aVsOaNruaYr+WQpuWujOWFqOebuOWQjFxyXG4gICAgICAgaWYoICFpc1NhbWVBdEFsbCApeyAvL+aVsOaNruacieWPmOWKqFxyXG4gICAgICAgICAgICB1cGRhdGUocmVxKVxyXG4gICAgICAgfVxyXG4gICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIGVuZE9mU3luY0Z1bmM6ZmFsc2UsXHJcbiAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiByZWZyZXNoRG9tRnVuYyxcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOWIoOmZpGxvY2Fsc3RvcmFnZeS4reeahOe8k+WtmFxyXG4gKiBAcGFyYW0gcm9sbEtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2FjaGUgPSAocm9sbEtleSwgc2Vjb25kS2V5KSA9PiB7XHJcbiAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgcm9sbEtleTogcm9sbEtleSxcclxuICAgICAgICBzZWNvbmRLZXk6IHNlY29uZEtleVxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfliKDpmaTnvJPlrZjmiJDlip8nKVxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICAgICAgZnVsbDogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9jYWNoZVN0b3JhZ2UuanMiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1Byb21pc2UnLCB7ICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgKHJlc3VsdC5lID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnYpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanNcbi8vIG1vZHVsZSBpZCA9IDhlMGMxZGIwMDA4NWM4YWQyNTVhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UudHJ5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDk3M2NjOGVlZmM1OTkzMWRlOTVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBhYTk2M2I0YzI3MTQ0ZjA5NGNjYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIEQpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gYjUwZDgyNDU2ZTU0NWRjYzNkZDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgYXJncywgdGhhdCkge1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qc1xuLy8gbW9kdWxlIGlkID0gYjU4MGI5NGIxOTU4NDJjYmYyYjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIGlzTm9kZSA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChoZWFkKSBub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChpc05vZGUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgU2FmYXJpIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMzOVxuICB9IGVsc2UgaWYgKE9ic2VydmVyICYmICEoZ2xvYmFsLm5hdmlnYXRvciAmJiBnbG9iYWwubmF2aWdhdG9yLnN0YW5kYWxvbmUpKSB7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWU7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICAvLyBQcm9taXNlLnJlc29sdmUgd2l0aG91dCBhbiBhcmd1bWVudCB0aHJvd3MgYW4gZXJyb3IgaW4gTEcgV2ViT1MgMlxuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZiAoIWhlYWQpIHtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBiZGUwZjU3ZTliNTc5Zjk0M2Y4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG4vLyAyNS40LjEuNSBOZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcblxuZnVuY3Rpb24gUHJvbWlzZUNhcGFiaWxpdHkoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gYzFiOTRlM2U5NWVkNDM1YWY1NDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS1maW5hbGx5XG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnUHJvbWlzZScsIHsgJ2ZpbmFsbHknOiBmdW5jdGlvbiAob25GaW5hbGx5KSB7XG4gIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIGNvcmUuUHJvbWlzZSB8fCBnbG9iYWwuUHJvbWlzZSk7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIG9uRmluYWxseSA9PSAnZnVuY3Rpb24nO1xuICByZXR1cm4gdGhpcy50aGVuKFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHg7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHksXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9KTtcbiAgICB9IDogb25GaW5hbGx5XG4gICk7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qc1xuLy8gbW9kdWxlIGlkID0gYzJlMzViYmZmODMzMDk1OTQzYzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGU6IGZhbHNlLCB2OiBleGVjKCkgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IGU6IHRydWUsIHY6IGUgfTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSBjYjc4Mzc1Mjk0NTQyYzI0YzViYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IGQxODEwYWU1MzMyZTM2ZmZhM2M0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBuYXZpZ2F0b3IgPSBnbG9iYWwubmF2aWdhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50IHx8ICcnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanNcbi8vIG1vZHVsZSBpZCA9IGVjNmNiZTMxN2I5ODUwYjA1Y2U1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsImltcG9ydCB7Z2V0SGlzdG9yeVRyYW5zLCBnZXRIaXN0b3J5SW5jb21lLGdldFRvZGF5VHJhbnMsIGdldFRvZGF5SW5jb21lfSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdEFQSVwiO1xyXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdERldGFpbE9yZGVyKGRheSwgbGF0ZWRhdGUgPSAnJykge1xyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbmmK/mu5rliqjliqDovb0g5rua5Yqo55qE6K+d5bCx6KaB5oqK5pWw5o2u55qE5ZON5bqU5Zue5p2l55qE5pWw5o2u55qE5pyA5ZCO5LiA5Liq5pe26Ze05Lyg57uZ5ZCO5Y+wXHJcbiAgICAgKi9cclxuICAgIGxldCBwYXJhbTtcclxuICAgIGlmICghIWxhdGVkYXRlKSB7XHJcbiAgICAgICAgcGFyYW0gPSB7dHJhbnNUbTogbGF0ZWRhdGUsIGludGVydmFsRGF5OiBkYXl9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBwYXJhbSA9IHtpbnRlcnZhbERheTogZGF5fVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5o6l5Y+j5piv5LuK5pel5pS25qy+6L+Y5piv5Y6G5Y+y5pS25qy+XHJcbiAgICAgKi9cclxuICAgIGlmIChkYXkgIT0gJzAnKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldEhpc3RvcnlUcmFucyhwYXJhbSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGdldEhpc3RvcnlJbmNvbWUoe2ludGVydmFsRGF5OmRheX0pXHJcbiAgICAgICAgICAgIGxldCBuZXdMaXN0ID0gcmVzLmRhdGEudHJhbnNJbmZvO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ld0xpc3QpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZ2V0VG9kYXlUcmFucyhwYXJhbSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGdldFRvZGF5SW5jb21lKCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdMaXN0ID0gcmVzLmRhdGEudHJhbnNJbmZvO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ld0xpc3QpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25EZXRhaWxzL0NvbGxlY3Rpb25EZXRhaWxzQWN0aW9ucy5qcyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHtjb2xsZWN0RGV0YWlsT3JkZXJ9IGZyb20gXCIuL0NvbGxlY3Rpb25EZXRhaWxzQWN0aW9uc1wiO1xyXG5pbXBvcnQge2JlZm9yZUVudGVyUm91dGVyfSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdFwiO1xyXG5pbXBvcnQgQ29sbGVjdGlvbkRldGFpbHMgZnJvbSBcIi4vQ29sbGVjdGlvbkRldGFpbHNcIlxyXG5pbXBvcnQgc3RvcmUgZnJvbSBcIi4uLy4uL3N0b3JlL3N0b3JlXCJcclxuaW1wb3J0IHtVUERBVEVfU1RPUkVfU1RBVEV9IGZyb20gXCIuLi8uLi9zdG9yZS9hY3Rpb25cIlxyXG5cclxuY2xhc3MgQ29sbGVjdGlvbkRldGFpbHNDb250YWluZXJzIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdGFiRGF5VmFsOiBcIjBcIixcclxuICAgICAgICAgICAgbGFzdERhdGU6IG51bGwsXHJcbiAgICAgICAgICAgIGJvdHRvbVRleHQ6ICfliqDovb3kuK0uLi4nLFxyXG4gICAgICAgICAgICBoYXNNb3JlOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBiZWZvcmVFbnRlclJvdXRlcihcIuaUtuasvuaYjue7hlwiKTtcclxuICAgICAgICB0aGlzLmdldE1vcmVEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0YWLliIfmjaLpgInmi6nkuI3lkIznmoTljoblj7Lml7bpl7RcclxuICAgICAqIEBwYXJhbSB2YWxcclxuICAgICAqL1xyXG4gICAgdGFibGVDTGlja0hhbmRsZXIgPSAodmFsKSA9PiB7XHJcbiAgICAgICAgaWYgKHZhbCAhPSB0aGlzLnN0YXRlLnRhYkRheVZhbCkge1xyXG4gICAgICAgICAgICBpZih2YWw9PVwiMFwiKXtcclxuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlPcmRlckxpc3Q6W11cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnlPcmRlckxpc3Q6W11cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGFiRGF5VmFsOiB2YWwsXHJcbiAgICAgICAgICAgICAgICBsYXN0RGF0ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGJvdHRvbVRleHQ6ICfliqDovb3kuK0uLi4nLFxyXG4gICAgICAgICAgICAgICAgaGFzTW9yZTogdHJ1ZVxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1vcmVEYXRhKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6blj5Hmu5rliqjmiafooYzmraTlh73mlbBcclxuICAgICAqL1xyXG4gICAgZ2V0TW9yZURhdGE9KCk9PntcclxuICAgICAgICBsZXQge3RhYkRheVZhbCxsYXN0RGF0ZX09dGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4gIGNvbGxlY3REZXRhaWxPcmRlcih0YWJEYXlWYWwsbGFzdERhdGUpLnRoZW4oKGxpc3QpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpc3QpXHJcbiAgICAgICAgICAgIGlmKGxpc3QubGVuZ3RoPj0xMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFzdERhdGU9IGxpc3RbbGlzdC5sZW5ndGgtMV0udHJhbnNUbTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc01vcmU6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0RGF0ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzTW9yZTpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBib3R0b21UZXh0OifmmoLml6Dmm7TlpJrmlbDmja5+fidcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPENvbGxlY3Rpb25EZXRhaWxzIHsuLi50aGlzLnByb3BzfSB7Li4udGhpcy5zdGF0ZX0gdGFibGVDTGlja0hhbmRsZXI9e3RoaXMudGFibGVDTGlja0hhbmRsZXJ9IGdldE1vcmVEYXRhPXt0aGlzLmdldE1vcmVEYXRhfS8+O1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBzdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9kYXlJbmNvbWVPYmo6IHN0YXRlLmdldEluKFtcInRvZGF5SW5jb21lT2JqXCJdKS50b0pTKCksXHJcbiAgICAgICAgaGlzdG9yeUluY29tZU9iajogc3RhdGUuZ2V0SW4oW1wiaGlzdG9yeUluY29tZU9ialwiXSkudG9KUygpLFxyXG4gICAgICAgIHRvZGF5T3JkZXJMaXN0OiBzdGF0ZS5nZXRJbihbXCJ0b2RheU9yZGVyTGlzdFwiXSkudG9KUygpLFxyXG4gICAgICAgIGhpc3RvcnlPcmRlckxpc3Q6IHN0YXRlLmdldEluKFtcImhpc3RvcnlPcmRlckxpc3RcIl0pLnRvSlMoKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcHN0YXRlVG9Qcm9wcykoQ29sbGVjdGlvbkRldGFpbHNDb250YWluZXJzKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uRGV0YWlscy9Db2xsZWN0aW9uRGV0YWlsc0NvbnRhaW5lci5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSBlZjUxZDQ5ODlmMzA0NGIyZWIzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qc1xuLy8gbW9kdWxlIGlkID0gZjBkYmMxMGM2OGRkODE0MDE0ZTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4vX3VzZXItYWdlbnQnKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52OCB8fCAnJztcbnZhciAkUHJvbWlzZSA9IGdsb2JhbFtQUk9NSVNFXTtcbnZhciBpc05vZGUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbnZhciBlbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBJbnRlcm5hbCwgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBPd25Qcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIHZhciBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICAgIGV4ZWMoZW1wdHksIGVtcHR5KTtcbiAgICB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpXG4gICAgICAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2VcbiAgICAgIC8vIHY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTgzMDU2NVxuICAgICAgLy8gd2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgICAgICYmIHY4LmluZGV4T2YoJzYuNicpICE9PSAwXG4gICAgICAmJiB1c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lLzY2JykgPT09IC0xO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuLCBleGl0ZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7IC8vIG1heSB0aHJvd1xuICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgICAgICBleGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaSkgcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKSBvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIHVuaGFuZGxlZCA9IGlzVW5oYW5kbGVkKHByb21pc2UpO1xuICAgIHZhciByZXN1bHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYgKHVuaGFuZGxlZCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKSB7XG4gICAgICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodW5oYW5kbGVkICYmIHJlc3VsdC5lKSB0aHJvdyByZXN1bHQudjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgcmV0dXJuIHByb21pc2UuX2ggIT09IDEgJiYgKHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYykubGVuZ3RoID09PSAwO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gZmE5ODdkODExZTRlYjJkNDNkOWNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiY2xlYXJmaXhcIjpcImNsZWFyZml4XCIsXCJkblwiOlwiZG5cIixcIkNvbGxlY3Rpb25EZXRhaWxzQ29udGFpblwiOlwiQ29sbGVjdGlvbkRldGFpbHNDb250YWluXCIsXCJjdXJEYXRlXCI6XCJjdXJEYXRlXCIsXCJkYXRlXCI6XCJkYXRlXCIsXCJjdXJNb25leVwiOlwiY3VyTW9uZXlcIixcImN1ck1vbmV5TGVmdFwiOlwiY3VyTW9uZXlMZWZ0XCIsXCJyZWNlaXZlTW9uZXlcIjpcInJlY2VpdmVNb25leVwiLFwicmVjZWl2ZU51bVwiOlwicmVjZWl2ZU51bVwiLFwiY3VyTW9uZXlSaWdodFwiOlwiY3VyTW9uZXlSaWdodFwiLFwib3JkZXJcIjpcIm9yZGVyXCIsXCJvcmRlck51bVwiOlwib3JkZXJOdW1cIixcImN1ck5vRGF0ZVwiOlwiY3VyTm9EYXRlXCIsXCJsb2FkaW5nXCI6XCJsb2FkaW5nXCIsXCJsb2FkaW5nQmdcIjpcImxvYWRpbmdCZ1wiLFwiQ29sbGVjdE1vbmV5TGlzdEJveFwiOlwiQ29sbGVjdE1vbmV5TGlzdEJveFwiLFwiQ29sbGVjdE1vbmV5TGlzdFwiOlwiQ29sbGVjdE1vbmV5TGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwicGF5TW9uZXJOdW1cIjpcInBheU1vbmVyTnVtXCIsXCJib3R0b21MaW5lXCI6XCJib3R0b21MaW5lXCIsXCJjYXJkTnVtXCI6XCJjYXJkTnVtXCIsXCJDb2xsZWN0TW9uZXlcIjpcIkNvbGxlY3RNb25leVwiLFwibW9uZXlMZWZ0XCI6XCJtb25leUxlZnRcIixcInRpbWVSaWdodFwiOlwidGltZVJpZ2h0XCIsXCJtb25leVwiOlwibW9uZXlcIixcInRpbWVcIjpcInRpbWVcIixcIm5vdEF2YWlsYWJsZVwiOlwibm90QXZhaWxhYmxlXCIsXCJkYXRlVGFic1wiOlwiZGF0ZVRhYnNcIixcImFjdGl2ZVwiOlwiYWN0aXZlXCIsXCJzcGVjaWFsQ2xhc3NcIjpcInNwZWNpYWxDbGFzc1wifTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25EZXRhaWxzL0NvbGxlY3Rpb25EZXRhaWxzLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IGZiMmYwNDlkZmNlZTRkY2UzY2M4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTciXSwic291cmNlUm9vdCI6IiJ9