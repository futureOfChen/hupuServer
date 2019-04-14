webpackJsonp([1],{

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

/***/ "13d681b31bec60bc8035":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _class, _temp;

var _react = __webpack_require__("8af190b70a6bc55c6f1b");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("8a2d1b95e05b6a321e74");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CarListUL = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(CarListUL, _React$Component);

    function CarListUL(props, context) {
        (0, _classCallCheck3.default)(this, CarListUL);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CarListUL.__proto__ || (0, _getPrototypeOf2.default)(CarListUL)).call(this, props, context));

        _this.handleClick = function () {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _this.props.onChange(value);
        };

        _this.getItems = function () {

            var listItems = _this.props.data.map(function (item, index) {

                if (_this.props.isOnlyShow) {
                    return _react2.default.createElement(
                        "li",
                        { className: "cardItem ", key: index },
                        _react2.default.createElement("i", { className: "icon noOperateIcon",
                            style: { backgroundImage: "url('http://127.0.0.1:3000/s/wl/icon/default/" + item.iconRelUrl + "')" } }),
                        _react2.default.createElement(
                            "div",
                            { className: "itemContent noOperate" },
                            _react2.default.createElement(
                                "div",
                                null,
                                item.bank + item.cardType + "(" + item.pan + ")"
                            ),
                            _react2.default.createElement(
                                "span",
                                { className: "noOperate" },
                                "\u8BE5\u94F6\u884C\u5361\u6682\u4E0D\u652F\u6301\u5F53\u524D\u4E1A\u52A1"
                            )
                        )
                    );
                } else {
                    return _react2.default.createElement(
                        "li",
                        { className: "cardItem", key: index, onClick: item.selected ? function () {} : _this.handleClick.bind(_this, item) },
                        _react2.default.createElement("i", { className: "icon",
                            style: { backgroundImage: "url('http://127.0.0.1:3000/s/wl/icon/default/" + item.iconRelUrl + "')" } }),
                        _react2.default.createElement(
                            "div",
                            { className: "itemContent" },
                            _react2.default.createElement(
                                "div",
                                null,
                                item.bank + item.cardType + "(" + item.pan + ")"
                            ),
                            !!item.addProvice && _react2.default.createElement(
                                "span",
                                null,
                                item.addProvice
                            )
                        ),
                        !!item.addProvice && !item.selected && _react2.default.createElement("i", { className: "rightArrow" }),
                        !!item.selected && _react2.default.createElement("i", { className: "icon-selected" })
                    );
                }
            });
            return listItems;
        };

        return _this;
    }

    (0, _createClass3.default)(CarListUL, [{
        key: "render",
        value: function render() {
            var listItem = this.getItems();
            return _react2.default.createElement(
                "ul",
                null,
                listItem
            );
        }
    }]);
    return CarListUL;
}(_react2.default.Component), _class.propTypes = {
    data: _propTypes2.default.any.isRequired,
    onChange: _propTypes2.default.func,
    isOnlyShow: _propTypes2.default.bool //true,所有的开只是展示，不用添加相应函数，如果是FALSE，要添加相应函数
}, _class.defaultProps = {
    isOnlyShow: false
}, _temp);
exports.default = CarListUL;

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

/***/ "3c187b4fa42dbe1f974b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

__webpack_require__("4014aa05e630d2f45911");

var _button = __webpack_require__("8d56c7db4300680162d8");

var _button2 = _interopRequireDefault(_button);

var _inputItem = __webpack_require__("46e3f6ce771e1a6ba82e");

var _inputItem2 = _interopRequireDefault(_inputItem);

var _Cardlist = __webpack_require__("f082854b3263c1ba7d85");

var _Cardlist2 = _interopRequireDefault(_Cardlist);

var _request = __webpack_require__("76fb50331ac78bf18670");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoreInfomation = function (_React$Component) {
    (0, _inherits3.default)(StoreInfomation, _React$Component);

    function StoreInfomation(props, context) {
        (0, _classCallCheck3.default)(this, StoreInfomation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (StoreInfomation.__proto__ || (0, _getPrototypeOf2.default)(StoreInfomation)).call(this, props, context));

        _this.clickError = function (msg) {
            // console.log('aa')
            (0, _request.toast)(msg);
        };

        return _this;
    }

    (0, _createClass3.default)(StoreInfomation, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                storename = _props.storename,
                storeReceiveCardObj = _props.storeReceiveCardObj,
                recommendPhone = _props.recommendPhone,
                showRecommondPhone = _props.showRecommondPhone,
                changeStoreName = _props.changeStoreName,
                cardList = _props.cardList,
                handleChangeCard = _props.handleChangeCard,
                addCard = _props.addCard,
                changeRecommendPhone = _props.changeRecommendPhone,
                handleClick = _props.handleClick;
            var _false = false,
                error = _false.error,
                error2 = _false.error2;

            if (this.props.storename.length > 20) {
                error = true;
            } else {
                error = false;
            }

            if (!!this.props.recommendPhone && !_request.regPhone.test(this.props.recommendPhone)) {
                error2 = true;
            } else {
                error2 = false;
            }

            return _react2.default.createElement(
                "div",
                { id: "si" },
                _react2.default.createElement(
                    "div",
                    { id: "contentWarp" },
                    _react2.default.createElement(
                        "div",
                        { className: "headTitle" },
                        "\u8BF7\u586B\u5199\u6536\u6B3E\u4FE1\u606F"
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "storeName inputWap" },
                        _react2.default.createElement(
                            _inputItem2.default,
                            { clear: true, placeholder: "\u6700\u591A20\u4E2A\u5B57\u7B26", error: error,
                                value: storename,
                                onChange: function onChange(val) {
                                    changeStoreName(val);
                                },
                                onErrorClick: this.clickError.bind(this, "您输入的店铺名称过长")
                            },
                            "\u5E97\u94FA\u540D\u79F0"
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "tips-warp-div" },
                        _react2.default.createElement("i", { className: "tipsIcon" }),
                        "\u8BE5\u540D\u79F0\u5C06\u5C55\u793A\u5728\u987E\u5BA2\u7684\u4ED8\u6B3E\u9875\u9762"
                    ),
                    _react2.default.createElement(
                        _Cardlist2.default,
                        { addSeneNo: "10020", data: cardList, value: storeReceiveCardObj,
                            haveAddCard: true, addCardCallback: addCard, title: '选择收款银行卡',
                            onChange: handleChangeCard },
                        _react2.default.createElement(ShowSelectedCard, null)
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "tips-warp-div" },
                        _react2.default.createElement("i", { className: "tipsIcon" }),
                        "\u9700\u6DFB\u52A0\u672C\u4EBA\u50A8\u84C4\u5361\uFF0C\u6536\u6B3E\u7801\u7684\u94B1\u5C06\u76F4\u63A5\u6253\u5230\u8BE5\u5361\u4E2D"
                    ),
                    !!showRecommondPhone && _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _react2.default.createElement(
                            "div",
                            { className: "recommend inputWap" },
                            _react2.default.createElement(
                                _inputItem2.default,
                                { clear: true, placeholder: "\u63A8\u8350\u4EBA\u624B\u673A\u53F7", error: error2,
                                    value: recommendPhone, onChange: changeRecommendPhone,
                                    onErrorClick: this.clickError.bind(this, "请输入合法的手机号")
                                },
                                "\u624B\u673A\u53F7"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "tips-warp-div" },
                            _react2.default.createElement("i", { className: "tipsIcon" }),
                            "\u8BF7\u8F93\u5165\u63A8\u8350\u4EBA\u624B\u673A\u53F7\uFF0C\u975E\u5FC5\u586B"
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "submit-warp-button", style: { paddingLeft: 0, paddingRight: 0 } },
                    _react2.default.createElement(
                        _button2.default,
                        { type: "primary", onClick: handleClick },
                        "\u4E0B\u4E00\u6B65"
                    )
                )
            );
        }
    }]);
    return StoreInfomation;
}(_react2.default.Component);

exports.default = StoreInfomation;


var ShowSelectedCard = function ShowSelectedCard(props) {

    return _react2.default.createElement(
        "div",
        null,
        !!props.extra.iconRelUrl ? _react2.default.createElement(
            "div",
            { className: "bankCard-selector-div", onClick: props.onClick },
            _react2.default.createElement("i", { className: "bankIcon",
                style: { backgroundImage: "url('http://127.0.0.1:3000/s/wl/icon/default/" + props.extra.iconRelUrl + "')" } }),
            _react2.default.createElement(
                "span",
                {
                    className: "bankName" },
                props.extra.bank + props.extra.cardType + "(" + props.extra.pan + ")"
            ),
            _react2.default.createElement("i", { className: "rightArrow" })
        ) : _react2.default.createElement(
            "div",
            { className: "bankCard-selector-div", onClick: props.onClick },
            _react2.default.createElement(
                "span",
                { className: "bankName gray", style: { textAlign: "center" } },
                "\u70B9\u51FB\u6B64\u5904\u9009\u62E9\u60A8\u7684\u94F6\u884C\u5361"
            ),
            _react2.default.createElement("i", { className: "rightArrow" })
        )
    );
};

/***/ }),

/***/ "3c24d38ffcd0c38e3477":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("1679851be27b268ea24e"), __esModule: true };

/***/ }),

/***/ "4014aa05e630d2f45911":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"si":"si","headTitle":"headTitle","storeName":"storeName","recommend":"recommend","bankCard-selector-div":"bankCard-selector-div","bankIcon":"bankIcon","bankName":"bankName","gray":"gray","inner":"inner"};

/***/ }),

/***/ "52ccca23778bad24dbcc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyMccCode = applyMccCode;

var _config = __webpack_require__("8653d9474e130320c382");

var _config2 = _interopRequireDefault(_config);

var _modal = __webpack_require__("cc81f23a066389bd7f8d");

var _modal2 = _interopRequireDefault(_modal);

var _request = __webpack_require__("76fb50331ac78bf18670");

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 申请收款码
 * @param history router中的history
 * @param param   请求参数
 */
function applyMccCode(history, param) {
    (0, _requestAPI.applyMcc)(param).then(function (response) {
        if (response.statusCode == _config2.default.STATUSCODE.SUCCESS) {
            //通知客户端修改状态
            (0, _request.mccStateChanged)();

            // if (response.data.redCodeSt == "00" || response.data.redCodeSt == "02") {
            //     //如果用户未申请红包码或者不再黑名单则让用户去申请红包码和收款码
            //     history.push({pathname: "/applyCommdityOfRedBag/storeInfo"})
            // }
            // else {
            //     //否则用户只可以申请收款码
            //     history.push({pathname: "/applyCommdity/storeInfo"})
            // }
            if (!!response.data.redCodeSt) {
                history.push({
                    pathname: "/applyCommdity/storeInfo",
                    search: "?redCodeSt=" + response.data.redCodeSt
                });
            } else {
                history.push({
                    pathname: "/applyCommdity/storeInfo"
                });
            }
        } else {
            _modal2.default.alert('申请失败', response.msg, [{
                text: '确认', onPress: function onPress() {}
            }]);
        }
    });
}

/**
 * 判定是否显示推荐人手机号的输入框
 */
// export function isShowRecommondPhone() {
//     isBlack().then((response) => {
//         console.log("判定是否在黑名单：" + response.data.blackSt)
//         if (response.statusCode == CONFIG.STATUSCODE.SUCCESS) {
//             if (response.data.blackSt == "1") {
//                 //在黑名单中则不显示推荐人手机号的输入框
//                 store.dispatch(UPDATE_STORE_STATE({
//                     showRecommondPhone: false
//                 }))
//             }
//             else {
//                 //根据是否申请过红包码判定是否显示推荐人手机号的输入框
//                 return isApply();
//             }
//         }
//     }).then((response) => {
//         console.log("判定是否已经申请红包码：" + response.data.applySt)
//         if (response.statusCode == CONFIG.STATUSCODE.SUCCESS) {
//             if (response.data.applySt == "1") {
//                 //已经申请红包码
//                 store.dispatch(UPDATE_STORE_STATE({
//                     showRecommondPhone: false
//                 }))
//             }
//             else {
//                 //未申请红包码
//                 store.dispatch(UPDATE_STORE_STATE({
//                     showRecommondPhone: true
//                 }))
//             }
//         }
//     })
// }

// import store from '../../store/store'
// import {UPDATE_STORE_STATE} from "../../store/action";

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

/***/ "80fec97e3bb3d703b205":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"bankCadlist-warp-div":"bankCadlist-warp-div","leftArrow":"leftArrow","rightArrow":"rightArrow","icon-selected":"icon-selected","noOperate":"noOperate","noOperateIcon":"noOperateIcon","mask":"mask","bankCadlist-warp-inner":"bankCadlist-warp-inner","head":"head","paddingRight":"paddingRight","arrowDiv":"arrowDiv","head-title":"head-title","content":"content","cardItem":"cardItem","icon":"icon","icon-add":"icon-add","itemContent":"itemContent"};

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

/***/ "b429028e9b7335c51b56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _promise = __webpack_require__("251bc7afe8127e09149d");

var _promise2 = _interopRequireDefault(_promise);

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

var _class, _temp;

var _react = __webpack_require__("8af190b70a6bc55c6f1b");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("8a2d1b95e05b6a321e74");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CarListUL = __webpack_require__("13d681b31bec60bc8035");

var _CarListUL2 = _interopRequireDefault(_CarListUL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardlistPanel = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(CardlistPanel, _React$Component);

    function CardlistPanel(props, context) {
        (0, _classCallCheck3.default)(this, CardlistPanel);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CardlistPanel.__proto__ || (0, _getPrototypeOf2.default)(CardlistPanel)).call(this, props, context));

        _this.distritData = function () {
            _this.props.data.forEach(function (item) {
                if (item.isSupport == 0 || item.isSupport === false) {
                    _this.jieJiKa.push(item);
                } else {
                    _this.chuXuka.push(item);
                }
            });
        };

        _this.handleClose = function () {
            _this.props.onClose();
        };

        _this.addNewCard = function () {
            var self = _this;
            var app = UP.W.App;
            /**
             * 拉起绑卡控件
             * @param success
             * @param fail
             * @params params:{scene:'场景号'}
             */
            // console.log(self.props.addSeneNo)
            app.onPluginReady(function () {
                app.addBankCard(function () {
                    self.props.addCardCallback("success");
                }, function () {
                    self.props.addCardCallback("fail");
                }, { scene: self.props.addSeneNo });
            });
        };

        _this.handlItemChange = function (value) {

            /**处理自定义的onChange函数**/
            if (!!_this.props.onChange) {
                var self = _this;
                new _promise2.default(function (resolve, reject) {
                    self.props.onChange(value, resolve, reject);
                }).then(function () {
                    self.changeState(value);
                }).catch(function () {});
            } else {
                _this.changeState(value);
            }
        };

        _this.changeState = function (value) {
            /**修改Li的显示**/
            var newData = [];
            _this.state.data.map(function (item) {
                if (item.virtualCardNo == value.virtualCardNo) item.selected = true;else {
                    item.selected = false;
                }
                newData.push(item);
            });
            _this.setState({
                data: newData
            });
            /**修改孩子节点的显示**/
            // this.props.changeChildShow(value);
        };

        _this.componentWillUnmount = function () {
            _this.setState = function (state, callback) {
                return;
            };
        };

        _this.chuXuka = []; //可以操作的卡
        _this.jieJiKa = []; //不可以操作的卡

        _this.distritData();

        _this.state = {
            data: _this.chuXuka
        };
        return _this;
    }

    (0, _createClass3.default)(CardlistPanel, [{
        key: "render",
        value: function render() {

            return _react2.default.createElement(
                "div",
                { className: "bankCadlist-warp-div" },
                _react2.default.createElement("div", { className: "mask", onClick: this.handleClose }),
                _react2.default.createElement(
                    "div",
                    { className: "bankCadlist-warp-inner" },
                    _react2.default.createElement(
                        "div",
                        { className: "head" },
                        _react2.default.createElement(
                            "div",
                            { className: "arrowDiv", onClick: this.handleClose },
                            _react2.default.createElement("i", { className: "leftArrow" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "head-title" },
                            this.props.title
                        ),
                        !!this.props.showRightBar ? _react2.default.createElement(
                            "div",
                            { className: "arrowDiv" },
                            "\u786E\u8BA4"
                        ) : _react2.default.createElement("div", { className: "paddingRight" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(_CarListUL2.default, { data: this.chuXuka, onChange: this.handlItemChange }),
                            this.props.haveAddCard && _react2.default.createElement(
                                "div",
                                { className: "cardItem", onClick: this.addNewCard },
                                _react2.default.createElement("i", { className: "icon icon-add" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "itemContent" },
                                    "\u6DFB\u52A0\u94F6\u884C\u5361\u6536\u6B3E"
                                ),
                                _react2.default.createElement("i", { className: "rightArrow" })
                            ),
                            _react2.default.createElement(_CarListUL2.default, { data: this.jieJiKa, isOnlyShow: true })
                        )
                    )
                )
            );
        }
    }]);
    return CardlistPanel;
}(_react2.default.Component), _class.propTypes = {
    title: _propTypes2.default.string,
    data: _propTypes2.default.array.isRequired,
    onChange: _propTypes2.default.func,
    showRightBar: _propTypes2.default.bool,
    changeChildShow: _propTypes2.default.func,
    haveAddCard: _propTypes2.default.bool,
    addCardCallback: _propTypes2.default.func,
    addSeneNo: _propTypes2.default.string
}, _class.defaultProps = {
    showRightBar: false
}, _temp);
exports.default = CardlistPanel;

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

/***/ "ebc906439b971642730a":
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

var _StoreInfomationActions = __webpack_require__("52ccca23778bad24dbcc");

var _StoreInfomation = __webpack_require__("3c187b4fa42dbe1f974b");

var _StoreInfomation2 = _interopRequireDefault(_StoreInfomation);

var _request = __webpack_require__("76fb50331ac78bf18670");

var _store = __webpack_require__("729bd0f3009c1858d0f9");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__("5d4604b08304c597d074");

var _Cardlist = __webpack_require__("f082854b3263c1ba7d85");

var _Cardlist2 = _interopRequireDefault(_Cardlist);

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

var _cacheStorage = __webpack_require__("8688ab3c6978d6c41524");

var _config = __webpack_require__("8653d9474e130320c382");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoreInfomationContainer = function (_Component) {
    (0, _inherits3.default)(StoreInfomationContainer, _Component);

    function StoreInfomationContainer() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, StoreInfomationContainer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = StoreInfomationContainer.__proto__ || (0, _getPrototypeOf2.default)(StoreInfomationContainer)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
            var _this$props = _this.props,
                storename = _this$props.storename,
                storeReceiveCardObj = _this$props.storeReceiveCardObj,
                recommendPhone = _this$props.recommendPhone,
                showRecommondPhone = _this$props.showRecommondPhone,
                history = _this$props.history;

            if (storename.length > 20 || storename.length == 0) {
                (0, _request.toast)("您输入有效的店铺名称");
            } else if (!!recommendPhone && !_request.regPhone.test(_this.props.recommendPhone)) {
                (0, _request.toast)("请输入合法的手机号");
            } else if (!storeReceiveCardObj.virtualCardNo) {
                (0, _request.toast)("请选择您的银行卡");
            } else {

                
                if (showRecommondPhone) {
                    (0, _request.getCurrentLocationInfo)(function (city) {
                        (0, _StoreInfomationActions.applyMccCode)(history, {
                            refereeTel: recommendPhone,
                            virtualCardNo: storeReceiveCardObj.virtualCardNo,
                            accNm: storename,
                            cityCd: city.cityCd
                        });
                    });
                } else {
                    (0, _request.getCurrentLocationInfo)(function (city) {
                        (0, _StoreInfomationActions.applyMccCode)(history, {
                            virtualCardNo: storeReceiveCardObj.virtualCardNo,
                            accNm: storename,
                            cityCd: city.cityCd
                        });
                    });
                }
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(StoreInfomationContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //设置网页title
            (0, _request.beforeEnterRouter)('申请商户收款码');
            //获取银行卡列表
            (0, _requestAPI.getCardlist)();
            //根据是否申请过红包码判定是否显示推荐关系。
            (0, _requestAPI.isBlack)(function (resp) {
                console.log('isBlack:我是真正的update函数');
            }).then(function (response) {
                if (response.data.blackSt == "0") {
                    (0, _requestAPI.isApply)();
                }
                // 通知update函数，succes已经执行完毕
                if( !!response.fuc){
                    response.fuc.endOfSyncFunc();
                }
            });
        }

        /**
         * 处理下一步的操作
         */

    }, {
        key: 'render',
        value: function render() {
            var showRecommondPhone = false;
            var _props = this.props,
                isblack = _props.isblack,
                isApply = _props.isApply;


            if (isblack == "0" && isApply == "0") {
                //用户不在黑名单并且 未申请过红包码，显示推荐手机
                showRecommondPhone = true;
            }
            return _react2.default.createElement(_StoreInfomation2.default, (0, _extends3.default)({}, this.props, { showRecommondPhone: showRecommondPhone, handleClick: this.handleClick }));
        }
    }]);
    return StoreInfomationContainer;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {

    return {
        storename: state.getIn(["mchntDetail", "storeNm"]),
        storeReceiveCardObj: state.getIn(["storeReceiveCardObj"]).toJS(),
        cardList: state.getIn(['cardList']).toJS(),
        recommendPhone: state.getIn(["recommendPhone"]),
        isblack: state.getIn(["blackSt"]),
        isApply: state.getIn(["applySt"])

        // showRecommondPhone:state.getIn(["showRecommondPhone"])
    };
};

var mapDispathToProps = function mapDispathToProps(dispatch) {
    /**
     * 用于用户更新Redux中的店铺名称
     */
    var changeStoreName = function changeStoreName(value) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ mchntDetail: { storeNm: value } }));
    };

    /**
     * 处理银行卡的切换
     * @param val  选中的卡对象
     * @param resolve Promise的resolve 函数
     * @param reject  Promis的reject 函数
     */
    var handleChangeCard = function handleChangeCard(val, resolve, reject) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ storeReceiveCardObj: val }));
        resolve();
        _Cardlist2.default.Close();
    };

    /**
     * 通过调用客户端插件添加新的银行卡
     * @param result  添加银行卡的结果  selectIn{'success','fail'}
     */
    var addCard = function addCard(result) {
        console.log("添加银行卡成功");
        if (result == "success") {
            (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.getMccCardList.rollKey, _config2.default.CACHEKEY.getMccCardList.secondKey);
            (0, _requestAPI.getCardlist)();
        }
        _Cardlist2.default.Close();
    };

    /**
     * 更改redux中的推荐人手机号的值
     * @param value 用户输入的值
     */
    var changeRecommendPhone = function changeRecommendPhone(value) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ recommendPhone: value }));
    };

    return {
        changeStoreName: changeStoreName,
        handleChangeCard: handleChangeCard,
        addCard: addCard,
        changeRecommendPhone: changeRecommendPhone
    };
};
exports.default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(StoreInfomationContainer);

/***/ }),

/***/ "ec6cbe317b9850b05ce5":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e044a82d1d9b0444627b");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


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

/***/ "f082854b3263c1ba7d85":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _class, _temp;

var _react = __webpack_require__("8af190b70a6bc55c6f1b");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("63f14ac74ce296f77f4d");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__("8a2d1b95e05b6a321e74");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CardlistPanel = __webpack_require__("b429028e9b7335c51b56");

var _CardlistPanel2 = _interopRequireDefault(_CardlistPanel);

__webpack_require__("80fec97e3bb3d703b205");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cardlist = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(Cardlist, _React$Component);

    function Cardlist(props, context) {
        (0, _classCallCheck3.default)(this, Cardlist);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Cardlist.__proto__ || (0, _getPrototypeOf2.default)(Cardlist)).call(this, props, context));

        _this.onClose = function () {
            !!_this.props.onClose && _this.props.onClose();
            var node = document.getElementsByClassName("ReactBankCardlist")[0];
            _reactDom2.default.unmountComponentAtNode(node);
        };

        _this.handleChildClick = function (event) {
            event.preventDefault();
            var node = document.getElementsByClassName("ReactBankCardlist")[0];
            if (!node) {
                _this.node = document.createElement('div'); // 创建 DOM
                _this.node.className = 'ReactBankCardlist'; // 给上 ClassName
                document.getElementsByTagName('body')[0].appendChild(_this.node); //给body添加一个div
            }
            var cardpanel = _react2.default.createElement(_CardlistPanel2.default, (0, _extends3.default)({}, _this.props, { onClose: _this.onClose, changeChildShow: _this.handleChange }));
            var allClass = document.getElementsByClassName('ReactBankCardlist');
            _reactDom2.default.render(cardpanel, allClass[allClass.length - 1]);
        };

        _this.state = {
            selectedValue: {}
        };
        return _this;
    }

    (0, _createClass3.default)(Cardlist, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                value = _props.value,
                data = _props.data;

            if (value != undefined && (value.virtualCardNo != undefined || value.pan != undefined)) {
                data.forEach(function (item, index) {
                    if (item.virtualCardNo == value.virtualCardNo || item.pan == value.pan) data[index].selected = true;else {
                        data[index].selected = false;
                    }
                });
            }

            if (toString.call(this.props.children) === '[object Array]') {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.Children.map(this.props.children, function (child) {

                        return _react2.default.cloneElement(child, {
                            extra: _this2.state.selectedValue,
                            onClick: _this2.handleChildClick
                        });
                    })
                );
            } else if (this.props.children != undefined) {
                return _react2.default.cloneElement(this.props.children, {
                    extra: this.props.value,
                    onClick: this.handleChildClick
                });
            } else {
                return null;
            }
        }
    }], [{
        key: 'Close',
        value: function Close() {
            var node = document.getElementsByClassName("ReactBankCardlist")[0];
            if (!!node) {
                _reactDom2.default.unmountComponentAtNode(node);
            }
        }

        // handleChange = (item) => {
        //
        //     this.setState({selectedValue: item})
        //
        // }


        /**
         * 子组件点击的时候的处理时间
         * @returns {*}
         */

    }]);
    return Cardlist;
}(_react2.default.Component), _class.propTypes = {
    /** 开发页面的title    */
    title: _propTypes2.default.string,
    /** 卡列表集合*/
    data: _propTypes2.default.array.isRequired,
    /** 当选卡发生改变时的回掉函数 */
    onChange: _propTypes2.default.func,
    /** 点击mask 或返回按钮时的回掉函数*/
    onClose: _propTypes2.default.func,
    /** 但前选中的值*/
    value: _propTypes2.default.object,
    /** 是否显示右侧的确定按钮*/
    showRightBar: _propTypes2.default.bool,
    /** 是否拥有添加卡的功能         */
    haveAddCard: _propTypes2.default.bool,
    /** 添加银行卡后的回掉函数，接受一个参数类型为 string  "success" 表示添加成功*/
    addCardCallback: _propTypes2.default.func,
    /** 添加卡时的场景号*/
    addSeneNo: _propTypes2.default.string
}, _temp);
exports.default = Cardlist;

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


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub29scy9DYXJkbGlzdC9DYXJMaXN0VUwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TdG9yZUluZm9tYXRpb24vU3RvcmVJbmZvbWF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1N0b3JlSW5mb21hdGlvbi9TdG9yZUluZm9tYXRpb24uc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TdG9yZUluZm9tYXRpb24vU3RvcmVJbmZvbWF0aW9uQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub29scy9DYXJkbGlzdC9jYXJkbGlzdC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVG9vbHMvQ2FyZGxpc3QvQ2FyZGxpc3RQYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1N0b3JlSW5mb21hdGlvbi9TdG9yZUluZm9tYXRpb25Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191c2VyLWFnZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub29scy9DYXJkbGlzdC9DYXJkbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanMiXSwibmFtZXMiOlsicmVjbWRSZWNvcmQiLCJzaGFybGluayIsImlzQmxhY2siLCJpc0FwcGx5IiwiYXBwbHlNY2MiLCJnZXRDYXJkbGlzdCIsImdldEFkZHJMaXN0IiwiYXBwbHlNYXQiLCJnZXRRclVybFJlc3QiLCJnZXRNY2hudEFuZEFyZWFJbmYiLCJnZXRNY2hudERldGFpbCIsInVwZ3JhZGVNY2MiLCJnZXRQcm90b2NvbEluZm8iLCJnZXRIaXN0b3J5SW5jb21lIiwiZ2V0SGlzdG9yeVRyYW5zIiwiZ2V0VG9kYXlJbmNvbWUiLCJnZXRUb2RheVRyYW5zIiwiZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bSIsImdldExvZ2lzdGljc1N0IiwiZ2V0VXBncmFkZVN0IiwiZ2V0TG9naXN0aWNzTGlzdCIsImdldEF1ZGl0SW5mbyIsImdldExpbWl0QXRJbmZvIiwibWNobnRPcGVyIiwiZGVsZXRlQWRkcmVzcyIsInVwZGF0ZU1jY0NhcmQiLCJuZXdBZGRyZXNzIiwiZWRpdEFkZHJlc3MiLCJzZXRNY2NPbk9mZiIsImdldE1jY1RyYW5zTnVtIiwicGhvbmUiLCJ1bmRlZmluZWQiLCJyZWNtZE1vYmlsZSIsIlV0aWwiLCJiYXNlNjRFbmNvZGUiLCJDT05GSUciLCJSRVNUIiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzQ29kZSIsIlNUQVRVU0NPREUiLCJTVUNDRVNTIiwicm9sbEtleSIsIkNBQ0hFS0VZIiwic2Vjb25kS2V5IiwiZnVsbCIsInJlc29sdmUiLCJzaGFyZUxpbmsiLCJyZWRVcmxTdHIiLCJkYXRhIiwiaWRlbnRpZmllciIsIm5leHRTdGF0ZSIsInN0b3JlIiwiZGlzcGF0Y2giLCJ1cGRhdGUiLCJ1cGRhdGVGdW5jIiwicmVzcCIsImJsYWNrU3QiLCJjb25zb2xlIiwibG9nIiwiY2FjaGVQYXJhbSIsImFwcGx5U3QiLCJwYXJhbSIsInJlZmVyZWVUZWwiLCJ2aXJ0dWFsQ2FyZE5vIiwiYWNjTm0iLCJjaXR5Q2QiLCJjb21vbVBhcmFtIiwiZ2V0TWNjQ2FyZExpc3QiLCJjYXJkTGlzdCIsImxlbmd0aCIsImRlZmFsdXRDYXJkIiwiYmFuayIsImNhcmRUeXBlIiwiZnVuY3Rpb25CaXRtYXAiLCJpY29uUmVsVXJsIiwiaXNTdXBwb3J0IiwicGFuIiwicmFuayIsInNlbGVjdGVkIiwiZm9yRWFjaCIsIml0ZW0iLCJrIiwic3RvcmVTdGF0ZSIsInN0b3JlUmVjZWl2ZUNhcmRPYmoiLCJzdGF0ZSIsImFkZHJlc3NMaXN0IiwicmVzdWx0IiwibWF0ZXJpYWxMaXN0IiwiZGVsaXZObSIsImFkZEFsbCIsImRlbGl2UGhvbmUiLCJwcm92aW5jZUlkIiwiY2l0eUlkIiwiYXJlYUlkIiwiYWRkcmVzc0luZm8iLCJpZCIsImNpdHlObSIsInJlZFVybCIsImdldFFyVXJsIiwibWNobnREZXRhaWwiLCJxclVybCIsInFyTnVtIiwiYXJlYSIsIm1lcmNoYW50VHAiLCJhcmVhQXJyIiwicHJvdmluY2UiLCJvbmUiLCJwcm9JZCIsInByb05tIiwidHdvIiwiY2l0eSIsInRocmVlIiwidmFsdWUiLCJjaGlsZHJlbiIsInB1c2giLCJhcmVhTm0iLCJtZXJjaGFudFRwQXJyIiwibWVyVHlwZTEiLCJtZXJjaGFudFRwQ2QiLCJtZXJjaGFudFRwTm0iLCJtZXJUeXBlMiIsIm1jaG50QW5kQXJlYUluZiIsInN0b3JlTm0iLCJTdG9yZVRwIiwicHJvdkNkIiwiY291dHlDZCIsImFkZHIiLCJjZXJ0aWZQaWMxIiwiY2VydGlmUGljMiIsImNlcnRpZlBpYzMiLCJsaWNlbnNlUGljIiwic2hvcFBpYzEiLCJzaG9wUGljMiIsImF1eFByb3ZNYXQxIiwiYXV4UHJvdk1hdDIiLCJzaG9wTG9nb1BpYyIsIlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0IiwicmVzIiwiaGlzdG9yeUluY29tZU9iaiIsIm9yaWdpbkxpc3REYXRhIiwiZ2V0U3RhdGUiLCJnZXRJbiIsInRvSlMiLCJuZXdMaXN0IiwidHJhbnNJbmZvIiwiaGlzdG9yeU9yZGVyTGlzdCIsImNvbmNhdCIsInRvZGF5SW5jb21lT2JqIiwidG9kYXlPcmRlckxpc3QiLCJuZXdPYmoiLCJkZWxpdmVyeU1zZyIsIm1hdERlbGl2U3RhdHVzIiwibGltaXRJbmZvIiwiaXNVc2VNY2MiLCJtY2NUcmFuc051bSIsInRyYW5zTnVtIiwiQ2FyTGlzdFVMIiwicHJvcHMiLCJjb250ZXh0IiwiaGFuZGxlQ2xpY2siLCJvbkNoYW5nZSIsImdldEl0ZW1zIiwibGlzdEl0ZW1zIiwibWFwIiwiaW5kZXgiLCJpc09ubHlTaG93IiwiYmFja2dyb3VuZEltYWdlIiwiYmluZCIsImFkZFByb3ZpY2UiLCJsaXN0SXRlbSIsIlJlYWN0IiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYW55IiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJib29sIiwiZGVmYXVsdFByb3BzIiwiU3RvcmVJbmZvbWF0aW9uIiwiY2xpY2tFcnJvciIsIm1zZyIsInN0b3JlbmFtZSIsInJlY29tbWVuZFBob25lIiwic2hvd1JlY29tbW9uZFBob25lIiwiY2hhbmdlU3RvcmVOYW1lIiwiaGFuZGxlQ2hhbmdlQ2FyZCIsImFkZENhcmQiLCJjaGFuZ2VSZWNvbW1lbmRQaG9uZSIsImVycm9yIiwiZXJyb3IyIiwicmVnUGhvbmUiLCJ0ZXN0IiwidmFsIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJTaG93U2VsZWN0ZWRDYXJkIiwiZXh0cmEiLCJvbkNsaWNrIiwidGV4dEFsaWduIiwiYXBwbHlNY2NDb2RlIiwiaGlzdG9yeSIsInJlZENvZGVTdCIsInBhdGhuYW1lIiwic2VhcmNoIiwiTW9kYWwiLCJhbGVydCIsInRleHQiLCJvblByZXNzIiwicmVxdWVzdCIsInNldFhpYW9XZWlQYXkiLCJ3aW5kb3ciLCJVUCIsIlciLCJBcHAiLCJFbnYiLCJyZWdQYXlOdW0iLCJ2ZXJzaW9uIiwic291cmNlIiwiYmFzZVVybCIsImJhc2VVcmwyIiwiYmFzZVVybDMiLCJsb2NhdGlvbiIsImhvc3RuYW1lIiwiaW5kZXhPZiIsInByb3RvY29sIiwiZ2V0U2VydlVybCIsInVybCIsInNlcnZlclVybCIsInVzZXJJbmZvIiwic3BsaXQiLCJnZXRDaXR5IiwicmVzcG9uc2VGb3JtYXR0ZXIiLCJwYXJhbXMiLCJkZWxldGVTbGFzaCIsImhvc3QiLCJyZXBsYWNlIiwiYWRkU2xhc2giLCJwYXRoIiwic2VwYXJhdGVQYXJhbXMiLCJwYXJhbXNMaW5lIiwia2V5IiwiY29uZmlnIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJmaW5hbFVybCIsInJlamVjdCIsIm9wdGlvbnMiLCJ0eXBlIiwic3VjY2VzcyIsIkVycm9yIiwiZGF0YVR5cGUiLCIkIiwiYWpheCIsImdldCIsInBhcmFtQWxsIiwiZm9yQ2hzcCIsImVuY3J5cHQiLCJjYWNoZSIsImJ5QWpheCIsInBvc3QiLCJwdXQiLCJkZWwiLCJnZXRTZWFyY2hQYXJhbSIsInN0ciIsInNsaWNlIiwiYXJyYXkiLCJvYmoiLCJzdWMiLCJlcnIiLCJhcHAiLCJzZXRYaWFvV2VpQXVkaW8iLCJnZXRYaWFvV2VpQXVkaW8iLCJ0b2FzdCIsIm1zIiwiVG9hc3QiLCJpbmZvIiwiYmVmb3JlRW50ZXJSb3V0ZXIiLCJ0aXRsZSIsInJpZ2h0QmFyIiwicmlnaHRDYWxsYmFjayIsInJpZ2h0QmFySW1nIiwiZG9jdW1lbnQiLCJvblBsdWdpblJlYWR5Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwic2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uIiwibWNjU3RhdGVDaGFuZ2VkIiwic2VuZFFyQ29kZSIsImZhaWwiLCJzY2FuUVJDb2RlIiwiY2xvc2VXZWJWaWV3IiwidmVyaWZ5UGF5UHdkIiwiY3JlYXRlV2ViVmlldyIsImlzRmluaXNoIiwiZ2V0VXNlckRldGFpbEluZm8iLCJzYXZlUWNvZGUiLCJjYW52YXMiLCJ1aSIsIlVJIiwicGljVXJsIiwidG9EYXRhVVJMIiwibG9nRXZlbnQiLCJzYXZlUGljVG9Mb2NhbCIsInN1YnN0ciIsInNob3dUb2FzdFdpdGhQaWMiLCJzaG93QWxlcnQiLCJlbnYiLCJpc0lPUyIsIm9wZW5Ccm93c2VyIiwic2hvd1RvYXN0Iiwic2hhcmUiLCJkZXNjIiwiaW1nVVJMIiwicGFnZVVSbCIsInNob3dTaGFyZVBhbmVsIiwic2hhcmVVcmwiLCJnZXRDdXJyZW50TG9jYXRpb25JbmZvIiwiY2FsbGJhY2syIiwic2hvd0xvYWRpbmciLCJjYWxsYmFjayIsImRpc21pc3MiLCJzZW5kTWVzc2FnZSIsImNtZCIsImZldGNoTmF0aXZlRGF0YSIsInhociIsImNyZWF0ZVRleHRDYW52YXNlIiwiY29sb3IiLCJsb25nIiwic2hvdCIsInJlbTJweCIsImNXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0Iiwic2V0QXR0cmlidXRlIiwid2lkdGgiLCJyb3RhdGUiLCJNYXRoIiwiUEkiLCJmaWxsU3R5bGUiLCJmb250U2l6ZSIsImZvbnQiLCJtZWFzdXJlVGV4dCIsImZpbGxUZXh0IiwiY3JlYXRlQ29udmFzQW5kU2F2ZVBob3RvIiwiY2FudmFzT2JqIiwiYmd1cmwiLCJxcmNvZGVVUkwiLCJxcmNvZGVXZEFuZEhnIiwieFdpZHRoIiwieUhlaWdodCIsInRleHRiZ1VSTCIsInhUZXh0V2lkdGgiLCJ5VGV4dEhlaWdodCIsImltZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwiaGVpZ2h0IiwiZHJhd0ltYWdlIiwidGV4dFVyaSIsInRleHRJbWciLCJxcmNvZGVXaWR0aEFuZEhlaWdodCIsImlubmVySFRNTCIsInFyY29kZSIsIlFSQ29kZSIsImNvcnJlY3RMZXZlbCIsIkNvcnJlY3RMZXZlbCIsIkwiLCJxcmNvZGVJbWciLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInFyY29kZUR4IiwicXJjb2RlRHkiLCJnZXRNYXRlcmllbEluZm9MaXN0IiwiZ2V0UmV3YXJkTGlzdCIsIkNPTlNUX0RBVEEiLCJpbWdlU2l6ZSIsImNhY2hlRmlyc3QiLCJ0aW1lIiwic3RvcmFnZSIsInZhbGlkYXRlVGltZSIsImNhY2hlRmlyc3RTdG9yYWdlIiwibmVlZFN3Iiwic3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlIiwicmVmcmVzaERvbUZ1bmMiLCJyZXEiLCJkYXRhRnJvbUNhY2hlIiwiZ2V0RnJvbVN0b3JhZ2UiLCJyZW1vdmVTdG9yYWdlIiwiaXNTYW1lQXRBbGwiLCJJbW11dGFibGUiLCJpcyIsImZyb21KUyIsImFzeW5jIiwiZW5kT2ZTeW5jRnVuYyIsInJlbW92ZUNhY2hlIiwiQ2FyZGxpc3RQYW5lbCIsImRpc3RyaXREYXRhIiwiamllSmlLYSIsImNodVh1a2EiLCJoYW5kbGVDbG9zZSIsIm9uQ2xvc2UiLCJhZGROZXdDYXJkIiwic2VsZiIsImFkZEJhbmtDYXJkIiwiYWRkQ2FyZENhbGxiYWNrIiwic2NlbmUiLCJhZGRTZW5lTm8iLCJoYW5kbEl0ZW1DaGFuZ2UiLCJjaGFuZ2VTdGF0ZSIsImNhdGNoIiwibmV3RGF0YSIsInNldFN0YXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJzaG93UmlnaHRCYXIiLCJoYXZlQWRkQ2FyZCIsInN0cmluZyIsImNoYW5nZUNoaWxkU2hvdyIsIlN0b3JlSW5mb21hdGlvbkNvbnRhaW5lciIsImZ1YyIsImlzYmxhY2siLCJtYXBzdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRoVG9Qcm9wcyIsIkNhcmRMaXN0IiwiQ2xvc2UiLCJDYXJkbGlzdCIsIm5vZGUiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiUmVhY3RET00iLCJ1bm1vdW50Q29tcG9uZW50QXROb2RlIiwiaGFuZGxlQ2hpbGRDbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYXBwZW5kQ2hpbGQiLCJjYXJkcGFuZWwiLCJoYW5kbGVDaGFuZ2UiLCJhbGxDbGFzcyIsInJlbmRlciIsInNlbGVjdGVkVmFsdWUiLCJ0b1N0cmluZyIsImNhbGwiLCJDaGlsZHJlbiIsImNoaWxkIiwiY2xvbmVFbGVtZW50Iiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQVdnQkEsVyxHQUFBQSxXO1FBeUJBQyxRLEdBQUFBLFE7UUFpQkFDLE8sR0FBQUEsTztRQXVCQUMsTyxHQUFBQSxPO1FBb0JBQyxRLEdBQUFBLFE7UUEwQkFDLFcsR0FBQUEsVztRQWdEQUMsVyxHQUFBQSxXO1FBZ0NBQyxRLEdBQUFBLFE7UUFvQkFDLFksR0FBQUEsWTtRQW1CQUMsa0IsR0FBQUEsa0I7UUFtSEFDLGMsR0FBQUEsYztRQWdCQUMsVSxHQUFBQSxVO1FBZ0NBQyxlLEdBQUFBLGU7UUFlQUMsZ0IsR0FBQUEsZ0I7UUFlQUMsZSxHQUFBQSxlO1FBaUJBQyxjLEdBQUFBLGM7UUFlQUMsYSxHQUFBQSxhO1FBZ0JBQyx5QixHQUFBQSx5QjtRQU1BQyxjLEdBQUFBLGM7UUF1QkFDLFksR0FBQUEsWTtRQVdBQyxnQixHQUFBQSxnQjtRQVlBQyxZLEdBQUFBLFk7UUFZQUMsYyxHQUFBQSxjO1FBYUFDLFMsR0FBQUEsUztRQVlBQyxhLEdBQUFBLGE7UUFnQkFDLGEsR0FBQUEsYTtRQWVBQyxVLEdBQUFBLFU7UUFhQUMsVyxHQUFBQSxXO1FBZUFDLFcsR0FBQUEsVztRQVlBQyxjLEdBQUFBLGM7O0FBbG9CaEI7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFJTyxTQUFTN0IsV0FBVCxDQUFxQjhCLEtBQXJCLEVBQTRCO0FBQy9CLFFBQUlBLFNBQVNDLFNBQWIsRUFBd0I7QUFDcEJELGdCQUFRLEVBQVI7QUFDSDtBQUNELFFBQUlFLGNBQWNDLGNBQUtDLFlBQUwsQ0FBa0JKLEtBQWxCLENBQWxCO0FBQ0EsV0FBTyxtQkFBS0ssaUJBQU9DLElBQVAsQ0FBWXBDLFdBQWpCLEVBQThCLEVBQUNnQyx3QkFBRCxFQUE5QixFQUE2Q0ssSUFBN0MsQ0FBa0QsVUFBQ0MsUUFBRCxFQUFZO0FBQ2pFLFlBQUlBLFNBQVNDLFVBQVQsSUFBdUJKLGlCQUFPSyxVQUFQLENBQWtCQyxPQUE3QyxFQUNBO0FBQ0k7QUFDQSwyQ0FBWTtBQUNSQyx5QkFBU1AsaUJBQU9RLFFBQVAsQ0FBZ0J4QyxPQUFoQixDQUF3QnVDLE9BRHpCO0FBRVJFLDJCQUFXVCxpQkFBT1EsUUFBUCxDQUFnQnhDLE9BQWhCLENBQXdCeUM7QUFGM0IsYUFBWixFQUdFLFlBQUksQ0FBRSxDQUhSLEVBR1MsWUFBSTtBQUNULCtDQUFZO0FBQ1JDLDBCQUFLO0FBREcsaUJBQVo7QUFHSCxhQVBEO0FBUUg7QUFDRCxlQUFPLGtCQUFRQyxPQUFSLEVBQVA7QUFDSCxLQWRNLENBQVA7QUFlSDs7QUFFRDs7O0FBR08sU0FBUzdDLFFBQVQsR0FBb0I7QUFDdkIsV0FBTyxtQkFBS2tDLGlCQUFPQyxJQUFQLENBQVlXLFNBQWpCLEVBQTRCLEVBQTVCLEVBQWdDVixJQUFoQyxDQUFxQyxVQUFDQyxRQUFELEVBQWM7QUFDdEQsWUFBSUEsU0FBU0MsVUFBVCxJQUF1QkosaUJBQU9LLFVBQVAsQ0FBa0JDLE9BQTdDLEVBQXNEO0FBQ2xELGdCQUFJTyxZQUFXLG1GQUFtRlYsU0FBU1csSUFBVCxDQUFjQyxVQUFoSDtBQUNBLGdCQUFJQyxZQUFZO0FBQ1pIO0FBRFksYUFBaEI7QUFHQUksNEJBQU1DLFFBQU4sQ0FBZSxnQ0FBbUJGLFNBQW5CLENBQWY7QUFDQSxtQkFBTyxrQkFBUUwsT0FBUixDQUFnQkUsU0FBaEIsQ0FBUDtBQUNIO0FBRUosS0FWTSxDQUFQO0FBV0g7O0FBRUQ7OztBQUdPLFNBQVM5QyxPQUFULENBQWlCb0QsTUFBakIsRUFBeUI7QUFDNUIsUUFBSUMsYUFBYSxTQUFiQSxVQUFhLENBQVNDLElBQVQsRUFBYztBQUMzQkosd0JBQU1DLFFBQU4sQ0FBZSxnQ0FBbUI7QUFDOUJJLHFCQUFRRCxLQUFLUCxJQUFMLENBQVVRO0FBRFksU0FBbkIsQ0FBZjtBQUdBQyxnQkFBUUMsR0FBUixDQUFZLHVCQUFaO0FBQ0EsWUFBSSxPQUFPTCxNQUFQLEtBQWtCLFVBQXRCLEVBQWtDO0FBQzlCQSxtQkFBT0UsSUFBUDtBQUNIO0FBQ0osS0FSRDtBQVNBO0FBQ0EsV0FBTyxtQkFBS3JCLGlCQUFPQyxJQUFQLENBQVlsQyxPQUFqQixFQUF5QixFQUF6QixFQUE0QiwrQ0FBNEJxRCxVQUE1QixDQUE1QixFQUFxRWxCLElBQXJFLENBQTBFLFVBQUNDLFFBQUQsRUFBWTtBQUN6RmMsd0JBQU1DLFFBQU4sQ0FBZSxnQ0FBbUI7QUFDOUJJLHFCQUFRbkIsU0FBU1csSUFBVCxDQUFjUTtBQURRLFNBQW5CLENBQWY7QUFHQSxlQUFPLGtCQUFRWCxPQUFSLENBQWdCUixRQUFoQixDQUFQO0FBQ0gsS0FMTSxDQUFQO0FBTUg7O0FBRUQ7Ozs7QUFJTyxTQUFTbkMsT0FBVCxHQUFtQjtBQUN0QixRQUFJeUQsYUFBYSxxQ0FBa0IsS0FBRyxFQUFILEdBQU0sSUFBeEIsRUFBNkJ6QixpQkFBT1EsUUFBUCxDQUFnQnhDLE9BQWhCLENBQXdCdUMsT0FBckQsRUFBOERQLGlCQUFPUSxRQUFQLENBQWdCeEMsT0FBaEIsQ0FBd0J5QyxTQUF0RixDQUFqQixDQURzQixDQUM0RjtBQUNsSCxXQUFPLGtCQUFJVCxpQkFBT0MsSUFBUCxDQUFZakMsT0FBaEIsRUFBeUIsRUFBekIsRUFBNEJ5RCxVQUE1QixFQUF3Q3ZCLElBQXhDLENBQTZDLFVBQUNDLFFBQUQsRUFBYztBQUM5RCxZQUFJQSxTQUFTVyxJQUFULENBQWNZLE9BQWQsSUFBeUIsR0FBN0IsRUFBa0M7QUFDOUI7OztBQUdBLDJDQUFZMUIsaUJBQU9RLFFBQVAsQ0FBZ0J4QyxPQUFoQixDQUF3QnVDLE9BQXBDLEVBQTZDUCxpQkFBT1EsUUFBUCxDQUFnQnhDLE9BQWhCLENBQXdCeUMsU0FBckU7QUFDSDtBQUNEUSx3QkFBTUMsUUFBTixDQUFlLGdDQUFtQjtBQUM5QlEscUJBQVF2QixTQUFTVyxJQUFULENBQWNZO0FBRFEsU0FBbkIsQ0FBZjtBQUdBLGVBQU8sa0JBQVFmLE9BQVIsQ0FBZ0JSLFFBQWhCLENBQVA7QUFDSCxLQVhNLENBQVA7QUFZSDs7QUFFRDs7OztBQUlPLFNBQVNsQyxRQUFULEdBS0o7QUFBQSxRQUxzQjBELEtBS3RCLHVFQUw4QjtBQUM3QkMsb0JBQVksRUFEaUIsRUFDTDtBQUN4QkMsdUJBQWUsRUFGYyxFQUVMO0FBQ3hCQyxlQUFPLEVBSHNCLEVBR0w7QUFDeEJDLGdCQUFRLEVBSnFCLENBSUo7QUFKSSxLQUs5Qjs7QUFDQyxXQUFPLG1CQUFLL0IsaUJBQU9DLElBQVAsQ0FBWWhDLFFBQWpCLEVBQTJCLHNCQUFjMEQsS0FBZCxFQUFxQkssbUJBQXJCLENBQTNCLEVBQTZEOUIsSUFBN0QsQ0FBa0UsVUFBQ0MsUUFBRCxFQUFZO0FBQ2pGLFlBQUlBLFNBQVNDLFVBQVQsSUFBdUJKLGlCQUFPSyxVQUFQLENBQWtCQyxPQUE3QyxFQUNBO0FBQ0k7QUFDQSwyQ0FBWTtBQUNSQyx5QkFBU1AsaUJBQU9RLFFBQVAsQ0FBZ0J4QyxPQUFoQixDQUF3QnVDLE9BRHpCO0FBRVJFLDJCQUFXVCxpQkFBT1EsUUFBUCxDQUFnQnhDLE9BQWhCLENBQXdCeUM7QUFGM0IsYUFBWixFQUdFLFlBQUksQ0FBRSxDQUhSLEVBR1MsWUFBSTtBQUNULCtDQUFZO0FBQ1JDLDBCQUFLO0FBREcsaUJBQVo7QUFHSCxhQVBEO0FBUUg7QUFDRCxlQUFPLGtCQUFRQyxPQUFSLENBQWdCUixRQUFoQixDQUFQO0FBQ0gsS0FkTSxDQUFQO0FBZUg7O0FBRUQ7OztBQUdPLFNBQVNqQyxXQUFULEdBQXVCO0FBQzFCO0FBQ0EsV0FBTyxrQkFBSThCLGlCQUFPQyxJQUFQLENBQVlnQyxjQUFoQixFQUFnQ0QsbUJBQWhDLEVBQTJDLHFDQUFrQixLQUFHLElBQXJCLENBQTNDLEVBQXVFOUIsSUFBdkUsQ0FBNEUsVUFBQ0MsUUFBRCxFQUFjO0FBQzdGO0FBQ0EsWUFBSSxDQUFDLENBQUNBLFNBQVNXLElBQVQsQ0FBY29CLFFBQWhCLElBQTRCL0IsU0FBU1csSUFBVCxDQUFjb0IsUUFBZCxDQUF1QkMsTUFBdkIsSUFBaUMsQ0FBakUsRUFBb0U7O0FBRWhFO0FBQ0EsZ0JBQUlDLGNBQWM7QUFDZEMsc0JBQU0sRUFEUSxFQUNrQztBQUNoREMsMEJBQVUsRUFGSSxFQUVvQztBQUNsREMsZ0NBQWdCLEVBSEYsRUFHaUM7QUFDL0NDLDRCQUFZLEVBSkUsRUFJOEI7QUFDNUNDLDJCQUFXLEVBTEcsRUFLeUM7QUFDdkRDLHFCQUFLLEVBTlMsRUFNZ0M7QUFDOUNDLHNCQUFNLENBUFE7QUFRZEMsMEJBQVUsS0FSSSxFQVEyQztBQUN6RGYsK0JBQWUsRUFURCxDQVNNO0FBVE4sYUFBbEI7O0FBWUExQixxQkFBU1csSUFBVCxDQUFjb0IsUUFBZCxDQUF1QlcsT0FBdkIsQ0FBK0IsVUFBQ0MsSUFBRCxFQUFVO0FBQ3JDLG9CQUFJLENBQUMsQ0FBQ0EsS0FBS0YsUUFBUCxJQUFtQkUsS0FBS0wsU0FBTCxJQUFrQixDQUF6QyxFQUE0QztBQUN4Q0wsa0NBQWNVLElBQWQ7QUFDSDtBQUNKLGFBSkQ7QUFLQTtBQUNBLGdCQUFJVixZQUFZQyxJQUFaLENBQWlCRixNQUFqQixJQUEyQixDQUEvQixFQUFrQztBQUM5QixxQkFBSyxJQUFJWSxJQUFJLENBQWIsRUFBZ0JBLElBQUk1QyxTQUFTVyxJQUFULENBQWNvQixRQUFkLENBQXVCQyxNQUEzQyxFQUFtRFksR0FBbkQsRUFBd0Q7QUFDcEQsd0JBQUk1QyxTQUFTVyxJQUFULENBQWNvQixRQUFkLENBQXVCYSxDQUF2QixFQUEwQk4sU0FBMUIsSUFBdUMsQ0FBM0MsRUFBOEM7QUFDMUNMLHNDQUFjakMsU0FBU1csSUFBVCxDQUFjb0IsUUFBZCxDQUF1QmEsQ0FBdkIsQ0FBZDtBQUNBO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsZ0JBQUlDLGFBQWE7QUFDYkMscUNBQXFCYixXQURSO0FBRWJGLDBCQUFVL0IsU0FBU1csSUFBVCxDQUFjb0I7QUFGWCxhQUFqQjtBQUlBakIsNEJBQU1DLFFBQU4sQ0FBZSxnQ0FBbUI4QixVQUFuQixDQUFmOztBQUVBLG1CQUFPLGtCQUFRckMsT0FBUixDQUFnQlIsUUFBaEIsQ0FBUDtBQUNIO0FBQ0osS0F2Q00sQ0FBUDtBQXdDSDs7QUFFRDs7OztBQUlPLFNBQVNoQyxXQUFULENBQ0hnRCxNQURHLEVBS0w7QUFBQSxRQUhFUSxLQUdGLHVFQUhVO0FBQ0p1QixlQUFPO0FBREgsS0FHVjs7QUFDRTtBQUNBLFFBQUk5QixhQUFhLFNBQWJBLFVBQWEsQ0FBU0MsSUFBVCxFQUFjO0FBQzNCO0FBQ0FKLHdCQUFNQyxRQUFOLENBQWUsZ0NBQW1CLEVBQUNpQyxhQUFZOUIsS0FBS1AsSUFBTCxDQUFVc0MsTUFBVixJQUFrQixFQUEvQixFQUFuQixDQUFmO0FBQ0E3QixnQkFBUUMsR0FBUixDQUFZLDJCQUFaO0FBQ0EsWUFBSSxPQUFPTCxNQUFQLEtBQWtCLFVBQXRCLEVBQWlDO0FBQzdCQSxtQkFBT0UsSUFBUDtBQUNIO0FBQ0osS0FQRDtBQVFBLFFBQUlJLGFBQWEsK0NBQTRCTCxVQUE1QixFQUF1Q3BCLGlCQUFPUSxRQUFQLENBQWdCckMsV0FBaEIsQ0FBNEJvQyxPQUFuRSxFQUEyRVAsaUJBQU9RLFFBQVAsQ0FBZ0JyQyxXQUFoQixDQUE0QnNDLFNBQXZHLENBQWpCO0FBQ0EsV0FBTyxtQkFBS1QsaUJBQU9DLElBQVAsQ0FBWTlCLFdBQWpCLEVBQThCLHNCQUFjLEVBQWQsRUFBa0I2RCxtQkFBbEIsRUFBOEJMLEtBQTlCLENBQTlCLEVBQW1FRixVQUFuRSxFQUErRXZCLElBQS9FLENBQW9GLFVBQUNDLFFBQUQsRUFBYzs7QUFFckcsWUFBSWdELGNBQWNoRCxTQUFTVyxJQUFULENBQWNzQyxNQUFkLElBQXdCLEVBQTFDOztBQUVBbkMsd0JBQU1DLFFBQU4sQ0FBZSxnQ0FBbUI7QUFDOUJpQztBQUQ4QixTQUFuQixDQUFmOztBQUlBLGVBQU8sa0JBQVF4QyxPQUFSLENBQWdCUixRQUFoQixDQUFQO0FBQ0gsS0FUTSxDQUFQO0FBVUg7O0FBRUQ7Ozs7QUFJTyxTQUFTL0IsUUFBVCxHQVlxQjtBQUFBLFFBWkh1RCxLQVlHLHVFQVpLO0FBQ0owQixzQkFBYyxFQURWLEVBQ2lEO0FBQ3JEQyxpQkFBUyxFQUZMLEVBRWlEO0FBQ3JEQyxnQkFBUSxFQUhKLEVBR2lEO0FBQ3JEQyxvQkFBWSxFQUpSLEVBSWlEO0FBQ3JEQyxvQkFBWSxFQUxSLEVBS2lEO0FBQ3JEQyxnQkFBUSxFQU5KLEVBTWlEO0FBQ3JEQyxnQkFBUSxFQVBKLEVBT2lEO0FBQ3JEQyxxQkFBYSxFQVJULEVBUWlEO0FBQ3JEQyxZQUFJLEVBVEEsRUFTZ0Q7QUFDcERDLGdCQUFRLEVBVkosRUFVaUQ7QUFDckRDLGdCQUFRLEVBWEosQ0FXaUQ7QUFYakQsS0FZTDs7QUFDeEIsV0FBTyxtQkFBSy9ELGlCQUFPQyxJQUFQLENBQVk3QixRQUFqQixFQUEyQixzQkFBY3VELEtBQWQsRUFBcUJLLG1CQUFyQixDQUEzQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7QUFJTyxTQUFTM0QsWUFBVCxHQUF3QjtBQUMzQjtBQUNBLFdBQU8sa0JBQUkyQixpQkFBT0MsSUFBUCxDQUFZK0QsUUFBaEIsRUFBMEIscUNBQWtCLElBQUUsRUFBRixHQUFLLEVBQUwsR0FBUSxJQUExQixDQUExQixFQUEyRDlELElBQTNELENBQWdFLFVBQUNDLFFBQUQsRUFBYzs7QUFFakZjLHdCQUFNQyxRQUFOLENBQWUsZ0NBQW1CO0FBQzlCK0MseUJBQWE7QUFDVEMsdUJBQU8vRCxTQUFTVyxJQUFULENBQWNvRCxLQURaO0FBRVRDLHVCQUFPaEUsU0FBU1csSUFBVCxDQUFjcUQ7QUFGWjtBQURpQixTQUFuQixDQUFmO0FBTUEsZUFBTyxrQkFBUXhELE9BQVIsQ0FBZ0JSLFFBQWhCLENBQVA7QUFDSCxLQVRNLENBQVA7QUFVSDs7QUFFRDs7Ozs7QUFLTyxTQUFTN0Isa0JBQVQsR0FBOEI7O0FBRWpDOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFPLGtCQUFJMEIsaUJBQU9DLElBQVAsQ0FBWTNCLGtCQUFoQixFQUFvQzBELG1CQUFwQyxFQUFnRCw4QkFBVyxLQUFHLEVBQUgsR0FBTSxFQUFOLEdBQVMsSUFBcEIsQ0FBaEQsRUFBMkU5QixJQUEzRSxDQUFnRixVQUFDQyxRQUFELEVBQWM7QUFDakcsWUFBSWlFLE9BQU8sRUFBWDtBQUFBLFlBQWVDLGFBQWEsRUFBNUI7O0FBR0EsWUFBSWxFLFNBQVNDLFVBQVQsSUFBdUJKLGlCQUFPSyxVQUFQLENBQWtCQyxPQUE3QyxFQUFzRDs7QUFFbEQ7OztBQUdBSCxxQkFBU1csSUFBVCxDQUFjd0QsT0FBZCxDQUFzQnpCLE9BQXRCLENBQThCLFVBQUMwQixRQUFELEVBQWM7O0FBRXhDLG9CQUFJQyxNQUFNO0FBQ04sNkJBQVNELFNBQVNFLEtBRFo7QUFFTiw2QkFBU0YsU0FBU0csS0FGWjtBQUdOLGdDQUFZO0FBSE4saUJBQVY7QUFLQSxvQkFBSUgsU0FBU0csS0FBVCxJQUFrQixLQUFsQixJQUEyQkgsU0FBU0csS0FBVCxJQUFrQixLQUE3QyxJQUFzREgsU0FBU0csS0FBVCxJQUFrQixLQUF4RSxJQUFpRkgsU0FBU0csS0FBVCxJQUFrQixLQUFuRyxJQUE0R0gsU0FBU0csS0FBVCxJQUFrQixLQUFsSSxFQUF5STtBQUNySSx3QkFBSUMsTUFBTTtBQUNOLGlDQUFTSixTQUFTRSxLQURaO0FBRU4saUNBQVNGLFNBQVNHLEtBRlo7QUFHTixvQ0FBWTtBQUhOLHFCQUFWO0FBS0FILDZCQUFTSyxJQUFULENBQWMvQixPQUFkLENBQXNCLFVBQUMrQixJQUFELEVBQVU7QUFDNUIsNEJBQUlDLFFBQVE7QUFDUixxQ0FBU0QsS0FBS2xCLE1BRE47QUFFUixxQ0FBU2tCLEtBQUtkLE1BRk47QUFHUix3Q0FBWTtBQUhKLHlCQUFaO0FBS0EsNEJBQUllLE1BQU1DLEtBQU4sSUFBZUgsSUFBSUcsS0FBdkIsRUFBOEI7QUFDMUJILGdDQUFJSSxRQUFKLENBQWFDLElBQWIsQ0FBa0JILEtBQWxCO0FBQ0g7QUFDSixxQkFURDtBQVVBTCx3QkFBSU8sUUFBSixDQUFhQyxJQUFiLENBQWtCTCxHQUFsQjtBQUNILGlCQWpCRCxNQWtCSztBQUNEOzs7QUFHQUosNkJBQVNLLElBQVQsQ0FBYy9CLE9BQWQsQ0FBc0IsVUFBQytCLElBQUQsRUFBVTs7QUFFNUIsNEJBQUlELE1BQU07QUFDTixxQ0FBU0MsS0FBS2xCLE1BRFI7QUFFTixxQ0FBU2tCLEtBQUtkLE1BRlI7QUFHTix3Q0FBWTs7QUFHaEI7OztBQU5VLHlCQUFWLENBU0FjLEtBQUtSLElBQUwsQ0FBVXZCLE9BQVYsQ0FBa0IsVUFBQ3VCLElBQUQsRUFBVTs7QUFFeEIsZ0NBQUlTLFFBQVE7QUFDUix5Q0FBU1QsS0FBS1QsTUFETjtBQUVSLHlDQUFTUyxLQUFLYSxNQUZOO0FBR1IsNENBQVk7QUFISiw2QkFBWjs7QUFNQU4sZ0NBQUlJLFFBQUosQ0FBYUMsSUFBYixDQUFrQkgsS0FBbEI7QUFDSCx5QkFURDs7QUFXQUwsNEJBQUlPLFFBQUosQ0FBYUMsSUFBYixDQUFrQkwsR0FBbEI7QUFDSCxxQkF2QkQ7QUF3Qkg7O0FBRURQLHFCQUFLWSxJQUFMLENBQVVSLEdBQVY7QUFDSCxhQXhERDs7QUEwREFyRSxxQkFBU1csSUFBVCxDQUFjb0UsYUFBZCxDQUE0QnJDLE9BQTVCLENBQW9DLFVBQUNzQyxRQUFELEVBQWM7QUFDOUMsb0JBQUlYLE1BQU07QUFDTiw2QkFBU1csU0FBU0MsWUFEWjtBQUVOLDZCQUFTRCxTQUFTRSxZQUZaO0FBR04sZ0NBQVk7QUFITixpQkFBVjs7QUFNQUYseUJBQVNELGFBQVQsQ0FBdUJyQyxPQUF2QixDQUErQixVQUFDeUMsUUFBRCxFQUFjO0FBQ3pDLHdCQUFJWCxNQUFNO0FBQ04saUNBQVNXLFNBQVNGLFlBRFo7QUFFTixpQ0FBU0UsU0FBU0QsWUFGWjtBQUdOLG9DQUFZO0FBSE4scUJBQVY7O0FBTUFiLHdCQUFJTyxRQUFKLENBQWFDLElBQWIsQ0FBa0JMLEdBQWxCO0FBQ0gsaUJBUkQ7O0FBVUFOLDJCQUFXVyxJQUFYLENBQWdCUixHQUFoQjtBQUNILGFBbEJEO0FBbUJIOztBQUVELFlBQUl4RCxZQUFZO0FBQ1p1RSw2QkFBaUI7QUFDYmpCLHlCQUFTRixJQURJO0FBRWJjLCtCQUFlYjtBQUZGO0FBREwsU0FBaEI7QUFNQXBELHdCQUFNQyxRQUFOLENBQWUsZ0NBQW1CRixTQUFuQixDQUFmO0FBRUgsS0FoR00sQ0FBUDtBQWtHSDs7QUFFRDs7OztBQUlPLFNBQVN6QyxjQUFULEdBQTBCO0FBQzdCLFFBQUlrRCxhQUFhLHFDQUFrQixLQUFHLElBQXJCLEVBQTBCekIsaUJBQU9RLFFBQVAsQ0FBZ0JqQyxjQUFoQixDQUErQmdDLE9BQXpELEVBQWlFUCxpQkFBT1EsUUFBUCxDQUFnQmpDLGNBQWhCLENBQStCa0MsU0FBaEcsQ0FBakIsQ0FENkIsQ0FDK0Y7QUFDNUgsV0FBTyxtQkFBS1QsaUJBQU9DLElBQVAsQ0FBWTFCLGNBQWpCLEVBQWlDeUQsbUJBQWpDLEVBQTRDUCxVQUE1QyxFQUF3RHZCLElBQXhELENBQTZELFVBQUNtQixJQUFELEVBQVU7QUFDMUUsWUFBSUEsS0FBS2pCLFVBQUwsSUFBbUJKLGlCQUFPSyxVQUFQLENBQWtCQyxPQUF6QyxFQUFpRDtBQUM3QyxnQkFBSTJELGNBQWM1QyxLQUFLUCxJQUF2QjtBQUNBRyw0QkFBTUMsUUFBTixDQUFlLGdDQUFtQixFQUFDK0Msd0JBQUQsRUFBbkIsQ0FBZjtBQUNBLG1CQUFPLGtCQUFRdEQsT0FBUixDQUFnQnNELFdBQWhCLENBQVA7QUFDSDtBQUNKLEtBTk0sQ0FBUDtBQU9IOztBQUVEOzs7OztBQUtPLFNBQVN6RixVQUFULEdBZ0JKO0FBQUEsUUFoQndCbUQsS0FnQnhCLHVFQWhCOEI7QUFDN0I2RCxpQkFBUyxFQURvQixFQUNiO0FBQ2hCQyxpQkFBUyxFQUZvQixFQUViO0FBQ2hCQyxnQkFBUSxFQUhxQixFQUdiO0FBQ2hCM0QsZ0JBQVEsRUFKcUIsRUFJYjtBQUNoQjRELGlCQUFTLEVBTG9CLEVBS2I7QUFDaEJDLGNBQU0sRUFOdUIsRUFNYjtBQUNoQkMsb0JBQVksRUFQaUIsRUFPYjtBQUNoQkMsb0JBQVksRUFSaUIsRUFRYjtBQUNoQkMsb0JBQVksRUFUaUIsRUFTYjtBQUNoQkMsb0JBQVksRUFWaUIsRUFVYjtBQUNoQkMsa0JBQVUsRUFYbUIsRUFXYjtBQUNoQkMsa0JBQVUsRUFabUIsRUFZYjtBQUNoQkMscUJBQWEsRUFiZ0IsRUFhYjtBQUNoQkMscUJBQWEsRUFkZ0IsRUFjYjtBQUNoQkMscUJBQWEsRUFmZ0IsQ0FlYjtBQWZhLEtBZ0I5Qjs7QUFDQyxXQUFPLG1CQUFLckcsaUJBQU9DLElBQVAsQ0FBWXpCLFVBQWpCLEVBQTZCLHNCQUFjbUQsS0FBZCxFQUFxQkssbUJBQXJCLENBQTdCLEVBQStEOUIsSUFBL0QsQ0FBb0UsVUFBQ0MsUUFBRCxFQUFjO0FBQ3JGLFlBQUlBLFNBQVNDLFVBQVQsSUFBdUJKLGlCQUFPSyxVQUFQLENBQWtCQyxPQUE3QyxFQUFzRDtBQUNsRDtBQUNBLDJDQUFZTixpQkFBT1EsUUFBUCxDQUFnQmpDLGNBQWhCLENBQStCZ0MsT0FBM0MsRUFBbURQLGlCQUFPUSxRQUFQLENBQWdCakMsY0FBaEIsQ0FBK0JrQyxTQUFsRjtBQUNBO0FBQ0EsMkNBQVlULGlCQUFPUSxRQUFQLENBQWdCOEYsMEJBQWhCLENBQTJDL0YsT0FBdkQsRUFBZ0VQLGlCQUFPUSxRQUFQLENBQWdCOEYsMEJBQWhCLENBQTJDN0YsU0FBM0c7QUFDSDtBQUNELGVBQU8sa0JBQVFFLE9BQVIsQ0FBZ0JSLFFBQWhCLENBQVA7QUFDSCxLQVJNLENBQVA7QUFTSDs7QUFFRDs7OztBQUlPLFNBQVMxQixlQUFULEdBQTJCO0FBQzlCOzs7QUFHQSxXQUFPLGtCQUFJdUIsaUJBQU9DLElBQVAsQ0FBWXhCLGVBQWhCLEVBQWlDdUQsbUJBQWpDLEVBQTRDLHFDQUFrQixJQUFFLEVBQUYsR0FBSyxFQUFMLEdBQVEsSUFBMUIsQ0FBNUMsRUFBNkU5QixJQUE3RSxDQUFrRixVQUFDQyxRQUFELEVBQWM7QUFDbkcsWUFBSUEsU0FBU0MsVUFBVCxJQUF1QkosaUJBQU9LLFVBQVAsQ0FBa0JDLE9BQTdDLEVBQXNEO0FBQ2xELG1CQUFPLGtCQUFRSyxPQUFSLENBQWdCUixTQUFTVyxJQUF6QixDQUFQO0FBQ0g7QUFDSixLQUpNLENBQVA7QUFLSDs7QUFFRDs7OztBQUlPLFNBQVNwQyxnQkFBVCxDQUEwQmlELEtBQTFCLEVBQWlDO0FBQ3BDLFdBQU8sbUJBQUszQixpQkFBT0MsSUFBUCxDQUFZdkIsZ0JBQWpCLEVBQW1DLHNCQUFjaUQsS0FBZCxFQUFxQkssbUJBQXJCLENBQW5DLEVBQXFFOUIsSUFBckUsQ0FBMEUsVUFBQ3FHLEdBQUQsRUFBUztBQUN0RixZQUFJQSxJQUFJbkcsVUFBSixJQUFrQixJQUF0QixFQUE0QjtBQUN4Qm1CLG9CQUFRQyxHQUFSLENBQVkrRSxJQUFJekYsSUFBaEI7QUFDQUcsNEJBQU1DLFFBQU4sQ0FBZSxnQ0FBbUI7QUFDOUJzRixrQ0FBa0JELElBQUl6RjtBQURRLGFBQW5CLENBQWY7QUFHQSxtQkFBTyxrQkFBUUgsT0FBUixDQUFnQjRGLEdBQWhCLENBQVA7QUFDSDtBQUNKLEtBUk0sQ0FBUDtBQVNIO0FBQ0Q7Ozs7QUFJTyxTQUFTNUgsZUFBVCxDQUF5QmdELEtBQXpCLEVBQWdDO0FBQ25DLFdBQU8sbUJBQUszQixpQkFBT0MsSUFBUCxDQUFZdEIsZUFBakIsRUFBa0Msc0JBQWNnRCxLQUFkLEVBQXFCSyxtQkFBckIsQ0FBbEMsRUFBb0U5QixJQUFwRSxDQUF5RSxVQUFDcUcsR0FBRCxFQUFTO0FBQ3JGLFlBQUlBLElBQUluRyxVQUFKLElBQWtCLElBQXRCLEVBQTRCO0FBQ3hCLGdCQUFJcUcsaUJBQWlCeEYsZ0JBQU15RixRQUFOLEdBQWlCQyxLQUFqQixDQUF1QixDQUFDLGtCQUFELENBQXZCLEVBQTZDQyxJQUE3QyxFQUFyQjtBQUNBLGdCQUFJQyxVQUFVTixJQUFJekYsSUFBSixDQUFTZ0csU0FBdkI7QUFDQXZGLG9CQUFRQyxHQUFSLENBQVlxRixPQUFaO0FBQ0E1Riw0QkFBTUMsUUFBTixDQUFlLGdDQUFtQjtBQUM5QjZGLGtDQUFrQk4sZUFBZU8sTUFBZixDQUFzQkgsT0FBdEI7QUFEWSxhQUFuQixDQUFmO0FBR0EsbUJBQU8sa0JBQVFsRyxPQUFSLENBQWdCNEYsR0FBaEIsQ0FBUDtBQUNIO0FBQ0osS0FWTSxDQUFQO0FBV0g7QUFDRDs7OztBQUlPLFNBQVMzSCxjQUFULEdBQTBCO0FBQzdCLFdBQU8sbUJBQUtvQixpQkFBT0MsSUFBUCxDQUFZckIsY0FBakIsRUFBZ0NvRCxtQkFBaEMsRUFBNEM5QixJQUE1QyxDQUFpRCxVQUFDcUcsR0FBRCxFQUFTO0FBQzdELFlBQUlBLElBQUluRyxVQUFKLElBQWtCLElBQXRCLEVBQTRCO0FBQ3hCYSw0QkFBTUMsUUFBTixDQUFlLGdDQUFtQjtBQUM5QitGLGdDQUFnQlYsSUFBSXpGO0FBRFUsYUFBbkIsQ0FBZjtBQUdBLG1CQUFPLGtCQUFRSCxPQUFSLENBQWdCNEYsR0FBaEIsQ0FBUDtBQUNIO0FBQ0osS0FQTSxDQUFQO0FBUUg7O0FBRUQ7Ozs7QUFJTyxTQUFTMUgsYUFBVCxDQUF1QjhDLEtBQXZCLEVBQThCO0FBQ2pDLFdBQU8sbUJBQUszQixpQkFBT0MsSUFBUCxDQUFZcEIsYUFBakIsRUFBZ0Msc0JBQWM4QyxLQUFkLEVBQXFCSyxtQkFBckIsQ0FBaEMsRUFBa0U5QixJQUFsRSxDQUF1RSxVQUFDcUcsR0FBRCxFQUFTO0FBQ25GLFlBQUlBLElBQUluRyxVQUFKLElBQWtCLElBQXRCLEVBQTRCO0FBQ3hCLGdCQUFJcUcsaUJBQWlCeEYsZ0JBQU15RixRQUFOLEdBQWlCQyxLQUFqQixDQUF1QixDQUFDLGdCQUFELENBQXZCLEVBQTJDQyxJQUEzQyxFQUFyQjtBQUNBLGdCQUFJQyxVQUFVTixJQUFJekYsSUFBSixDQUFTZ0csU0FBdkI7QUFDQTdGLDRCQUFNQyxRQUFOLENBQWUsZ0NBQW1CO0FBQzlCZ0csZ0NBQWdCVCxlQUFlTyxNQUFmLENBQXNCSCxPQUF0QjtBQURjLGFBQW5CLENBQWY7QUFHQSxtQkFBTyxrQkFBUWxHLE9BQVIsQ0FBZ0I0RixHQUFoQixDQUFQO0FBQ0g7QUFDSixLQVRNLENBQVA7QUFVSDtBQUNEOzs7O0FBSU8sU0FBU3pILHlCQUFULENBQW1DNkMsS0FBbkMsRUFBMEM7QUFDN0MsV0FBTyxtQkFBSzNCLGlCQUFPQyxJQUFQLENBQVluQix5QkFBakIsRUFBMkMsc0JBQWM2QyxLQUFkLEVBQW9CSyxtQkFBcEIsQ0FBM0MsQ0FBUDtBQUNIO0FBQ0Q7OztBQUdPLFNBQVNqRCxjQUFULENBQXdCNEMsS0FBeEIsRUFBOEI7QUFDakMsV0FBTyxrQkFBSTNCLGlCQUFPQyxJQUFQLENBQVlsQixjQUFoQixFQUFnQyxzQkFBYzRDLEtBQWQsRUFBb0JLLG1CQUFwQixDQUFoQyxFQUFpRTlCLElBQWpFLENBQXNFLFVBQUNxRyxHQUFELEVBQU87QUFDaEYsWUFBSUEsSUFBSW5HLFVBQUosSUFBa0IsSUFBdEIsRUFBNEI7QUFDeEJtQixvQkFBUUMsR0FBUixDQUFZK0UsR0FBWjtBQUNBLGdCQUFJWSxTQUFTWixJQUFJekYsSUFBSixDQUFTc0csV0FBdEI7QUFDQTs7OztBQUlBRCxtQkFBT0UsY0FBUCxHQUF3QmQsSUFBSXpGLElBQUosQ0FBU3VHLGNBQWpDO0FBQ0FwRyw0QkFBTUMsUUFBTixDQUFlLGdDQUFtQjtBQUM5QmtHLDZCQUFhRDtBQURpQixhQUFuQixDQUFmO0FBR0EsbUJBQU8sa0JBQVF4RyxPQUFSLENBQWdCNEYsR0FBaEIsQ0FBUDtBQUNIO0FBQ0osS0FkTSxDQUFQO0FBZUg7O0FBSUQ7OztBQUdPLFNBQVN2SCxZQUFULEdBQXVCO0FBQzFCLFdBQU8sa0JBQUlnQixpQkFBT0MsSUFBUCxDQUFZakIsWUFBaEIsRUFBOEJnRCxtQkFBOUIsRUFBMEM5QixJQUExQyxDQUErQyxVQUFDcUcsR0FBRCxFQUFPO0FBQ3pELFlBQUlBLElBQUluRyxVQUFKLElBQWtCLElBQXRCLEVBQTRCO0FBQ3hCLG1CQUFPLGtCQUFRTyxPQUFSLENBQWdCNEYsR0FBaEIsQ0FBUDtBQUNIO0FBQ0osS0FKTSxDQUFQO0FBS0g7O0FBRUQ7OztBQUdPLFNBQVN0SCxnQkFBVCxDQUEwQjBDLEtBQTFCLEVBQWdDO0FBQ25DLFdBQU8sa0JBQUkzQixpQkFBT0MsSUFBUCxDQUFZaEIsZ0JBQWhCLEVBQWlDLHNCQUFjMEMsS0FBZCxFQUFvQkssbUJBQXBCLENBQWpDLEVBQWtFOUIsSUFBbEUsQ0FBdUUsVUFBQ3FHLEdBQUQsRUFBTztBQUNqRixZQUFJQSxJQUFJbkcsVUFBSixJQUFrQixJQUF0QixFQUE0QjtBQUN4Qm1CLG9CQUFRQyxHQUFSLENBQVkrRSxHQUFaO0FBQ0EsbUJBQU8sa0JBQVE1RixPQUFSLENBQWdCNEYsR0FBaEIsQ0FBUDtBQUNIO0FBQ0osS0FMTSxDQUFQO0FBTUg7O0FBRUQ7OztBQUdPLFNBQVNySCxZQUFULEdBQXVCO0FBQzFCLFdBQU8sbUJBQUtjLGlCQUFPQyxJQUFQLENBQVlmLFlBQWpCLEVBQStCOEMsbUJBQS9CLEVBQTJDOUIsSUFBM0MsQ0FBZ0QsVUFBQ3FHLEdBQUQsRUFBUztBQUM1RCxZQUFJQSxJQUFJbkcsVUFBSixJQUFrQixJQUF0QixFQUE0QjtBQUN4Qm1CLG9CQUFRQyxHQUFSLENBQVkrRSxHQUFaO0FBQ0EsbUJBQU8sa0JBQVE1RixPQUFSLENBQWdCNEYsR0FBaEIsQ0FBUDtBQUNIO0FBQ0osS0FMTSxDQUFQO0FBTUg7O0FBRUQ7OztBQUdPLFNBQVNwSCxjQUFULEdBQXlCO0FBQzVCO0FBQ0EsdUJBQUthLGlCQUFPQyxJQUFQLENBQVlkLGNBQWpCLEVBQWdDNkMsbUJBQWhDLEVBQTJDLHFDQUFrQixJQUFFLEVBQUYsR0FBSyxFQUFMLEdBQVEsSUFBMUIsQ0FBM0MsRUFBNEU5QixJQUE1RSxDQUFpRixVQUFDbUIsSUFBRCxFQUFRO0FBQ3JGLFlBQUlBLEtBQUtqQixVQUFMLEdBQWtCSixpQkFBT0ssVUFBUCxDQUFrQkMsT0FBeEMsRUFBaUQ7QUFDN0NXLDRCQUFNQyxRQUFOLENBQWUsZ0NBQW1CLEVBQUNvRyxXQUFVakcsS0FBS1AsSUFBaEIsRUFBbkIsQ0FBZjtBQUNIO0FBQ0osS0FKRDtBQUtIOztBQUVEOzs7O0FBSU8sU0FBUzFCLFNBQVQsR0FBOEI7QUFBQSxRQUFYdUMsS0FBVyx1RUFBSixFQUFJOztBQUNqQyxXQUFPLG1CQUFLM0IsaUJBQU9DLElBQVAsQ0FBWXpCLFVBQWpCLEVBQThCLHNCQUFjbUQsS0FBZCxFQUFvQkssbUJBQXBCLENBQTlCLEVBQStEOUIsSUFBL0QsQ0FBb0UsWUFBSTtBQUMzRTtBQUNBLHVDQUFZRixpQkFBT1EsUUFBUCxDQUFnQmpDLGNBQWhCLENBQStCZ0MsT0FBM0MsRUFBbURQLGlCQUFPUSxRQUFQLENBQWdCakMsY0FBaEIsQ0FBK0JrQyxTQUFsRjtBQUNBLGVBQU8sa0JBQVFFLE9BQVIsRUFBUDtBQUNILEtBSk0sQ0FBUDtBQUtIOztBQUVEOzs7O0FBSU8sU0FBU3RCLGFBQVQsR0FFTDtBQUFBLFFBRjRCc0MsS0FFNUIsdUVBRmtDO0FBQ2hDa0MsWUFBRyxFQUQ2QixDQUMxQjtBQUQwQixLQUVsQzs7O0FBRUUsV0FBTyxtQkFBSzdELGlCQUFPQyxJQUFQLENBQVlaLGFBQWpCLEVBQStCLHNCQUFjc0MsS0FBZCxFQUFvQkssbUJBQXBCLENBQS9CLEVBQWdFOUIsSUFBaEUsQ0FBcUUsWUFBSTtBQUM1RTtBQUNBLHVDQUFZRixpQkFBT1EsUUFBUCxDQUFnQnJDLFdBQWhCLENBQTRCb0MsT0FBeEMsRUFBZ0RQLGlCQUFPUSxRQUFQLENBQWdCckMsV0FBaEIsQ0FBNEJzQyxTQUE1RTtBQUNBLGVBQU8sa0JBQVFFLE9BQVIsQ0FBZ0JnQixLQUFoQixDQUFQO0FBQ0gsS0FKTSxDQUFQO0FBS0g7O0FBR0Q7Ozs7QUFJTyxTQUFTckMsYUFBVCxHQUVKO0FBQUEsUUFGMkJxQyxLQUUzQix1RUFGaUM7QUFDaENFLHVCQUFjLEVBRGtCLENBQ2Y7QUFEZSxLQUVqQzs7O0FBRUMsV0FBTyxtQkFBSzdCLGlCQUFPQyxJQUFQLENBQVlYLGFBQWpCLEVBQStCLHNCQUFjcUMsS0FBZCxFQUFvQkssbUJBQXBCLENBQS9CLEVBQWdFOUIsSUFBaEUsQ0FBcUUsWUFBSTtBQUM1RTtBQUNBLHVDQUFZRixpQkFBT1EsUUFBUCxDQUFnQmpDLGNBQWhCLENBQStCZ0MsT0FBM0MsRUFBbURQLGlCQUFPUSxRQUFQLENBQWdCakMsY0FBaEIsQ0FBK0JrQyxTQUFsRjtBQUNBLGVBQU8sa0JBQVFFLE9BQVIsRUFBUDtBQUNILEtBSk0sQ0FBUDtBQUtIOztBQUVEOzs7O0FBSU8sU0FBU3BCLFVBQVQsR0FBOEI7QUFBQSxRQUFWb0MsS0FBVSx1RUFBSixFQUFJOztBQUNqQyxXQUFPLG1CQUFLM0IsaUJBQU9DLElBQVAsQ0FBWVYsVUFBakIsRUFBNEIsc0JBQWNvQyxLQUFkLEVBQW9CSyxtQkFBcEIsQ0FBNUIsRUFBNkQ5QixJQUE3RCxDQUFrRSxVQUFDQyxRQUFELEVBQVk7QUFDakYsWUFBR0EsU0FBU0MsVUFBVCxLQUF3QkosaUJBQU9LLFVBQVAsQ0FBa0JDLE9BQTdDLEVBQXFEO0FBQ2pEO0FBQ0EsMkNBQVlOLGlCQUFPUSxRQUFQLENBQWdCckMsV0FBaEIsQ0FBNEJvQyxPQUF4QyxFQUFnRFAsaUJBQU9RLFFBQVAsQ0FBZ0JyQyxXQUFoQixDQUE0QnNDLFNBQTVFO0FBQ0EsbUJBQU8sa0JBQVFFLE9BQVIsQ0FBZ0JSLFFBQWhCLENBQVA7QUFDSDtBQUNKLEtBTk0sQ0FBUDtBQU9IO0FBQ0Q7Ozs7QUFJTyxTQUFTWCxXQUFULEdBQStCO0FBQUEsUUFBVm1DLEtBQVUsdUVBQUosRUFBSTs7QUFDbEMsV0FBTyxtQkFBSzNCLGlCQUFPQyxJQUFQLENBQVlULFdBQWpCLEVBQTZCLHNCQUFjbUMsS0FBZCxFQUFvQkssbUJBQXBCLENBQTdCLEVBQThEOUIsSUFBOUQsQ0FBbUUsVUFBQ0MsUUFBRCxFQUFZO0FBQ2xGLFlBQUdBLFNBQVNDLFVBQVQsS0FBd0JKLGlCQUFPSyxVQUFQLENBQWtCQyxPQUE3QyxFQUFxRDtBQUNqRDtBQUNBLDJDQUFZTixpQkFBT1EsUUFBUCxDQUFnQnJDLFdBQWhCLENBQTRCb0MsT0FBeEMsRUFBZ0RQLGlCQUFPUSxRQUFQLENBQWdCckMsV0FBaEIsQ0FBNEJzQyxTQUE1RTtBQUNBLG1CQUFPLGtCQUFRRSxPQUFSLENBQWdCUixRQUFoQixDQUFQO0FBQ0g7QUFHSixLQVJNLENBQVA7QUFTSDtBQUNEOzs7O0FBSU8sU0FBU1YsV0FBVCxHQUVIO0FBQUEsUUFGd0JrQyxLQUV4Qix1RUFGOEI7QUFDOUI0RixrQkFBUyxFQURxQixDQUNqQjtBQURpQixLQUU5Qjs7QUFDQSxXQUFPLG1CQUFLdkgsaUJBQU9DLElBQVAsQ0FBWVIsV0FBakIsRUFBNkIsc0JBQWNrQyxLQUFkLEVBQW9CSyxtQkFBcEIsQ0FBN0IsRUFBOEQ5QixJQUE5RCxDQUFtRSxZQUFJO0FBQzFFO0FBQ0EsdUNBQVlGLGlCQUFPUSxRQUFQLENBQWdCakMsY0FBaEIsQ0FBK0JnQyxPQUEzQyxFQUFtRFAsaUJBQU9RLFFBQVAsQ0FBZ0JqQyxjQUFoQixDQUErQmtDLFNBQWxGO0FBQ0EsZUFBTyxrQkFBUUUsT0FBUixFQUFQO0FBQ0gsS0FKTSxDQUFQO0FBS0g7QUFDRDs7O0FBR08sU0FBU2pCLGNBQVQsR0FBeUI7QUFDNUIsV0FBTyxtQkFBS00saUJBQU9DLElBQVAsQ0FBWVAsY0FBakIsRUFBaUNRLElBQWpDLENBQXNDLFVBQUNtQixJQUFELEVBQVE7QUFDakQsWUFBSUEsS0FBS2pCLFVBQUwsSUFBbUJKLGlCQUFPSyxVQUFQLENBQWtCQyxPQUF6QyxFQUFrRDtBQUM5QyxtQkFBTyxrQkFBUUssT0FBUixDQUFnQixFQUFDNkcsYUFBWW5HLEtBQUtQLElBQUwsQ0FBVTJHLFFBQXZCLEVBQWhCLENBQVA7QUFDSDtBQUNKLEtBSk0sQ0FBUDtBQUtILEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4b0JEOzs7O0FBQ0E7Ozs7OztJQUVxQkMsUzs7O0FBRWpCLHVCQUFZQyxLQUFaLEVBQW1CQyxPQUFuQixFQUE0QjtBQUFBOztBQUFBLGdKQUNsQkQsS0FEa0IsRUFDWEMsT0FEVzs7QUFBQSxjQWM1QkMsV0FkNEIsR0FjZCxZQUFnQjtBQUFBLGdCQUFmL0MsS0FBZSx1RUFBUCxFQUFPOztBQUMxQixrQkFBSzZDLEtBQUwsQ0FBV0csUUFBWCxDQUFvQmhELEtBQXBCO0FBQ0gsU0FoQjJCOztBQUFBLGNBa0I1QmlELFFBbEI0QixHQWtCakIsWUFBTTs7QUFFYixnQkFBSUMsWUFBWSxNQUFLTCxLQUFMLENBQVc3RyxJQUFYLENBQWdCbUgsR0FBaEIsQ0FBb0IsVUFBQ25GLElBQUQsRUFBT29GLEtBQVAsRUFBaUI7O0FBRWpELG9CQUFJLE1BQUtQLEtBQUwsQ0FBV1EsVUFBZixFQUEyQjtBQUN2QiwyQkFDSTtBQUFBO0FBQUEsMEJBQUksV0FBVSxXQUFkLEVBQTBCLEtBQUtELEtBQS9CO0FBQ0ksNkRBQUksV0FBVSxvQkFBZDtBQUNJLG1DQUFPLEVBQUNFLGlCQUFpQixxREFBcUR0RixLQUFLTixVQUExRCxHQUF1RSxJQUF6RixFQURYLEdBREo7QUFHSTtBQUFBO0FBQUEsOEJBQUssV0FBVSx1QkFBZjtBQUNJO0FBQUE7QUFBQTtBQUFNTSxxQ0FBS1QsSUFBTCxHQUFZUyxLQUFLUixRQUFqQixHQUE0QixHQUE1QixHQUFrQ1EsS0FBS0osR0FBdkMsR0FBNkM7QUFBbkQsNkJBREo7QUFFSTtBQUFBO0FBQUEsa0NBQU0sV0FBVSxXQUFoQjtBQUFBO0FBQUE7QUFGSjtBQUhKLHFCQURKO0FBVUgsaUJBWEQsTUFZSztBQUNELDJCQUNJO0FBQUE7QUFBQSwwQkFBSSxXQUFVLFVBQWQsRUFBeUIsS0FBS3dGLEtBQTlCLEVBQXFDLFNBQVNwRixLQUFLRixRQUFMLEdBQWMsWUFBSSxDQUFFLENBQXBCLEdBQXFCLE1BQUtpRixXQUFMLENBQWlCUSxJQUFqQixRQUE0QnZGLElBQTVCLENBQW5FO0FBQ0ksNkRBQUksV0FBVSxNQUFkO0FBQ0ksbUNBQU8sRUFBQ3NGLGlCQUFpQixxREFBcUR0RixLQUFLTixVQUExRCxHQUF1RSxJQUF6RixFQURYLEdBREo7QUFHSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxhQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQU1NLHFDQUFLVCxJQUFMLEdBQVlTLEtBQUtSLFFBQWpCLEdBQTRCLEdBQTVCLEdBQWtDUSxLQUFLSixHQUF2QyxHQUE2QztBQUFuRCw2QkFESjtBQUVLLDZCQUFDLENBQUNJLEtBQUt3RixVQUFQLElBQXNCO0FBQUE7QUFBQTtBQUFPeEYscUNBQUt3RjtBQUFaO0FBRjNCLHlCQUhKO0FBT0sseUJBQUMsQ0FBQ3hGLEtBQUt3RixVQUFQLElBQXFCLENBQUN4RixLQUFLRixRQUEzQixJQUF3QyxxQ0FBRyxXQUFVLFlBQWIsR0FQN0M7QUFRSyx5QkFBQyxDQUFDRSxLQUFLRixRQUFQLElBQW9CLHFDQUFHLFdBQVUsZUFBYjtBQVJ6QixxQkFESjtBQVlIO0FBQ0osYUE1QmUsQ0FBaEI7QUE2QkEsbUJBQU9vRixTQUFQO0FBQ0gsU0FsRDJCOztBQUFBO0FBRTNCOzs7O2lDQWtEUTtBQUNMLGdCQUFJTyxXQUFXLEtBQUtSLFFBQUwsRUFBZjtBQUNBLG1CQUNJO0FBQUE7QUFBQTtBQUNLUTtBQURMLGFBREo7QUFLSDs7O0VBN0RrQ0MsZ0JBQU1DLFMsVUFNbENDLFMsR0FBWTtBQUNmNUgsVUFBTTZILG9CQUFVQyxHQUFWLENBQWNDLFVBREw7QUFFZmYsY0FBVWEsb0JBQVVHLElBRkw7QUFHZlgsZ0JBQVlRLG9CQUFVSSxJQUhQLENBR1k7QUFIWixDLFNBTVpDLFksR0FBZTtBQUNsQmIsZ0JBQVk7QUFETSxDO2tCQVpMVCxTOzs7Ozs7O0FDSHJCLFdBQVcsbUJBQU8sQ0FBQyxzQkFBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7QUNOQSxtQkFBTyxDQUFDLHNCQUE2QjtBQUNyQyxtQkFBTyxDQUFDLHNCQUFnQztBQUN4QyxpQkFBaUIsbUJBQU8sQ0FBQyxzQkFBOEI7Ozs7Ozs7O0FDRnZELG1CQUFPLENBQUMsc0JBQTZCO0FBQ3JDLG1CQUFPLENBQUMsc0JBQWdDO0FBQ3hDLGlCQUFpQixtQkFBTyxDQUFDLHNCQUE2Qjs7Ozs7Ozs7QUNGdEQsa0JBQWtCLFlBQVksbUJBQU8sQ0FBQyxzQkFBNEIsc0I7Ozs7Ozs7QUNBbEU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0lBRXFCdUIsZTs7O0FBRWpCLDZCQUFZdEIsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTs7QUFBQSw0SkFDbEJELEtBRGtCLEVBQ1hDLE9BRFc7O0FBQUEsY0FJNUJzQixVQUo0QixHQUlmLFVBQUNDLEdBQUQsRUFBUztBQUNsQjtBQUNBLGdDQUFNQSxHQUFOO0FBQ0gsU0FQMkI7O0FBQUE7QUFFM0I7Ozs7aUNBT1E7QUFBQSx5QkFHcUYsS0FBS3hCLEtBSDFGO0FBQUEsZ0JBRUF5QixTQUZBLFVBRUFBLFNBRkE7QUFBQSxnQkFFV25HLG1CQUZYLFVBRVdBLG1CQUZYO0FBQUEsZ0JBRWdDb0csY0FGaEMsVUFFZ0NBLGNBRmhDO0FBQUEsZ0JBRStDQyxrQkFGL0MsVUFFK0NBLGtCQUYvQztBQUFBLGdCQUdEQyxlQUhDLFVBR0RBLGVBSEM7QUFBQSxnQkFHZXJILFFBSGYsVUFHZUEsUUFIZjtBQUFBLGdCQUd3QnNILGdCQUh4QixVQUd3QkEsZ0JBSHhCO0FBQUEsZ0JBR3lDQyxPQUh6QyxVQUd5Q0EsT0FIekM7QUFBQSxnQkFHaURDLG9CQUhqRCxVQUdpREEsb0JBSGpEO0FBQUEsZ0JBR3NFN0IsV0FIdEUsVUFHc0VBLFdBSHRFO0FBQUEseUJBS2MsS0FMZDtBQUFBLGdCQUtBOEIsS0FMQSxVQUtBQSxLQUxBO0FBQUEsZ0JBS01DLE1BTE4sVUFLTUEsTUFMTjs7QUFNTCxnQkFBSSxLQUFLakMsS0FBTCxDQUFXeUIsU0FBWCxDQUFxQmpILE1BQXJCLEdBQThCLEVBQWxDLEVBQXNDO0FBQ2xDd0gsd0JBQVEsSUFBUjtBQUNILGFBRkQsTUFHSztBQUNEQSx3QkFBUSxLQUFSO0FBQ0g7O0FBRUQsZ0JBQUksQ0FBQyxDQUFDLEtBQUtoQyxLQUFMLENBQVcwQixjQUFiLElBQStCLENBQUNRLGtCQUFTQyxJQUFULENBQWMsS0FBS25DLEtBQUwsQ0FBVzBCLGNBQXpCLENBQXBDLEVBQThFO0FBQzFFTyx5QkFBUyxJQUFUO0FBQ0gsYUFGRCxNQUdLO0FBQ0RBLHlCQUFTLEtBQVQ7QUFDSDs7QUFFRCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssSUFBRyxJQUFSO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLElBQUcsYUFBUjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLFdBQWY7QUFBQTtBQUFBLHFCQURKO0FBR0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsb0JBQWY7QUFDSTtBQUFDLCtDQUFEO0FBQUEsOEJBQVcsV0FBWCxFQUFpQixhQUFZLGtDQUE3QixFQUF1QyxPQUFPRCxLQUE5QztBQUNXLHVDQUFPUCxTQURsQjtBQUVXLDBDQUFVLGtCQUFDVyxHQUFELEVBQU87QUFBQ1Isb0RBQWdCUSxHQUFoQjtBQUFxQixpQ0FGbEQ7QUFHVyw4Q0FBYyxLQUFLYixVQUFMLENBQWdCYixJQUFoQixDQUFxQixJQUFyQixFQUEyQixZQUEzQjtBQUh6QjtBQUFBO0FBQUE7QUFESixxQkFISjtBQVdJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLGVBQWY7QUFDSSw2REFBRyxXQUFVLFVBQWIsR0FESjtBQUFBO0FBQUEscUJBWEo7QUFnQkk7QUFBQywwQ0FBRDtBQUFBLDBCQUFVLFdBQVcsT0FBckIsRUFBOEIsTUFBTW5HLFFBQXBDLEVBQThDLE9BQU9lLG1CQUFyRDtBQUNVLHlDQUFhLElBRHZCLEVBQzZCLGlCQUFpQndHLE9BRDlDLEVBQ3VELE9BQU8sU0FEOUQ7QUFFVSxzQ0FBVUQsZ0JBRnBCO0FBR0ksc0RBQUMsZ0JBQUQ7QUFISixxQkFoQko7QUFxQkk7QUFBQTtBQUFBLDBCQUFLLFdBQVUsZUFBZjtBQUNJLDZEQUFHLFdBQVUsVUFBYixHQURKO0FBQUE7QUFBQSxxQkFyQko7QUEwQlEscUJBQUMsQ0FBQ0Ysa0JBQUYsSUFDSTtBQUFDLHVDQUFELENBQU8sUUFBUDtBQUFBO0FBQ0k7QUFBQTtBQUFBLDhCQUFLLFdBQVUsb0JBQWY7QUFDSTtBQUFDLG1EQUFEO0FBQUEsa0NBQVcsV0FBWCxFQUFpQixhQUFZLHNDQUE3QixFQUFzQyxPQUFPTSxNQUE3QztBQUNXLDJDQUFPUCxjQURsQixFQUNrQyxVQUFVSyxvQkFENUM7QUFFVyxrREFBYyxLQUFLUixVQUFMLENBQWdCYixJQUFoQixDQUFxQixJQUFyQixFQUEyQixXQUEzQjtBQUZ6QjtBQUFBO0FBQUE7QUFESix5QkFESjtBQU9JO0FBQUE7QUFBQSw4QkFBSyxXQUFVLGVBQWY7QUFDSSxpRUFBRyxXQUFVLFVBQWIsR0FESjtBQUFBO0FBQUE7QUFQSjtBQTNCWixpQkFESjtBQThDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxvQkFBZixFQUFvQyxPQUFPLEVBQUMyQixhQUFhLENBQWQsRUFBaUJDLGNBQWMsQ0FBL0IsRUFBM0M7QUFDSTtBQUFDLHdDQUFEO0FBQUEsMEJBQVEsTUFBSyxTQUFiLEVBQXVCLFNBQVNwQyxXQUFoQztBQUFBO0FBQUE7QUFESjtBQTlDSixhQURKO0FBb0RIOzs7RUFuRndDVyxnQkFBTUMsUzs7a0JBQTlCUSxlOzs7QUFzRnJCLElBQU1pQixtQkFBbUIsU0FBbkJBLGdCQUFtQixRQUFTOztBQUU5QixXQUNJO0FBQUE7QUFBQTtBQUNLLFNBQUMsQ0FBQ3ZDLE1BQU13QyxLQUFOLENBQVkzSCxVQUFkLEdBQ0c7QUFBQTtBQUFBLGNBQUssV0FBVSx1QkFBZixFQUF1QyxTQUFTbUYsTUFBTXlDLE9BQXREO0FBQ0ksaURBQUcsV0FBVSxVQUFiO0FBQ0csdUJBQU8sRUFBQ2hDLGlCQUFpQixxREFBcURULE1BQU13QyxLQUFOLENBQVkzSCxVQUFqRSxHQUE4RSxJQUFoRyxFQURWLEdBREo7QUFHSTtBQUFBO0FBQUE7QUFDSSwrQkFBVSxVQURkO0FBQzBCbUYsc0JBQU13QyxLQUFOLENBQVk5SCxJQUFaLEdBQW1Cc0YsTUFBTXdDLEtBQU4sQ0FBWTdILFFBQS9CLEdBQTBDLEdBQTFDLEdBQWdEcUYsTUFBTXdDLEtBQU4sQ0FBWXpILEdBQTVELEdBQWtFO0FBRDVGLGFBSEo7QUFLSSxpREFBRyxXQUFVLFlBQWI7QUFMSixTQURILEdBU0c7QUFBQTtBQUFBLGNBQUssV0FBVSx1QkFBZixFQUF1QyxTQUFTaUYsTUFBTXlDLE9BQXREO0FBQ0k7QUFBQTtBQUFBLGtCQUFNLFdBQVUsZUFBaEIsRUFBZ0MsT0FBTyxFQUFDQyxXQUFXLFFBQVosRUFBdkM7QUFBQTtBQUFBLGFBREo7QUFFSSxpREFBRyxXQUFVLFlBQWI7QUFGSjtBQVZSLEtBREo7QUFrQkgsQ0FwQkQsQzs7Ozs7OztBQzdGQSxrQkFBa0IsWUFBWSxtQkFBTyxDQUFDLHNCQUFpQyxzQjs7Ozs7OztBQ0F2RTtBQUNBLGtCQUFrQiw2TTs7Ozs7Ozs7Ozs7OztRQ2FGQyxZLEdBQUFBLFk7O0FBZGhCOzs7O0FBRUE7Ozs7QUFDQTs7QUFHQTs7OztBQUdBOzs7OztBQUtPLFNBQVNBLFlBQVQsQ0FBc0JDLE9BQXRCLEVBQStCNUksS0FBL0IsRUFBc0M7QUFDekMsOEJBQVNBLEtBQVQsRUFBZ0J6QixJQUFoQixDQUFxQixVQUFDQyxRQUFELEVBQWM7QUFDL0IsWUFBSUEsU0FBU0MsVUFBVCxJQUF1QkosaUJBQU9LLFVBQVAsQ0FBa0JDLE9BQTdDLEVBQXNEO0FBQ2xEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFJLENBQUMsQ0FBQ0gsU0FBU1csSUFBVCxDQUFjMEosU0FBcEIsRUFBOEI7QUFDMUJELHdCQUFRdkYsSUFBUixDQUFhO0FBQ1R5Riw4QkFBVSwwQkFERDtBQUVUQyw0QkFBTyxnQkFBY3ZLLFNBQVNXLElBQVQsQ0FBYzBKO0FBRjFCLGlCQUFiO0FBSUgsYUFMRCxNQU1JO0FBQ0FELHdCQUFRdkYsSUFBUixDQUFhO0FBQ1R5Riw4QkFBVTtBQURELGlCQUFiO0FBR0g7QUFFSixTQXhCRCxNQXlCSztBQUNERSw0QkFBTUMsS0FBTixDQUFZLE1BQVosRUFBb0J6SyxTQUFTZ0osR0FBN0IsRUFBa0MsQ0FBQztBQUMvQjBCLHNCQUFNLElBRHlCLEVBQ25CQyxTQUFTLG1CQUFNLENBQzFCO0FBRjhCLGFBQUQsQ0FBbEM7QUFJSDtBQUNKLEtBaENEO0FBaUNIOztBQUVEOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBakZBO0FBQ0EseUQ7Ozs7Ozs7QUNMQSxlQUFlLG1CQUFPLENBQUMsc0JBQWM7QUFDckMsVUFBVSxtQkFBTyxDQUFDLHNCQUE0QjtBQUM5QyxpQkFBaUIsbUJBQU8sQ0FBQyxzQkFBUztBQUNsQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNOQSxVQUFVLG1CQUFPLENBQUMsc0JBQVE7QUFDMUIsV0FBVyxtQkFBTyxDQUFDLHNCQUFjO0FBQ2pDLGtCQUFrQixtQkFBTyxDQUFDLHNCQUFrQjtBQUM1QyxlQUFlLG1CQUFPLENBQUMsc0JBQWM7QUFDckMsZUFBZSxtQkFBTyxDQUFDLHNCQUFjO0FBQ3JDLGdCQUFnQixtQkFBTyxDQUFDLHNCQUE0QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsaUJBQWlCLEVBQUU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxnQkFBZ0I7QUFDbkY7QUFDQTtBQUNBLEdBQUcsNENBQTRDLGdDQUFnQztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3hCYTtBQUNiLGFBQWEsbUJBQU8sQ0FBQyxzQkFBVztBQUNoQyxXQUFXLG1CQUFPLENBQUMsc0JBQVM7QUFDNUIsU0FBUyxtQkFBTyxDQUFDLHNCQUFjO0FBQy9CLGtCQUFrQixtQkFBTyxDQUFDLHNCQUFnQjtBQUMxQyxjQUFjLG1CQUFPLENBQUMsc0JBQVE7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGFBQWE7QUFDbkMsR0FBRztBQUNIOzs7Ozs7OztBQ2JBLGNBQWMsbUJBQU8sQ0FBQyxzQkFBWTtBQUNsQyxlQUFlLG1CQUFPLENBQUMsc0JBQVE7QUFDL0IsZ0JBQWdCLG1CQUFPLENBQUMsc0JBQWM7QUFDdEMsaUJBQWlCLG1CQUFPLENBQUMsc0JBQVM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkMwSHdCQyxPO1FBd1JSQyxhLEdBQUFBLGE7O0FBclpoQjs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUdBOzs7Ozs7QUFNTyxJQUFNbEwsc0JBQU9tTCxPQUFPQyxFQUFQLENBQVVDLENBQVYsQ0FBWXJMLElBQXpCLEMsQ0FsQlA7Ozs7O0FBS0E7QUFlTyxJQUFNc0wsb0JBQU1GLEdBQUdDLENBQUgsQ0FBS0MsR0FBakI7O0FBRUEsSUFBTUMsb0JBQU1ILEdBQUdDLENBQUgsQ0FBS0UsR0FBakI7O0FBR0EsSUFBTXhCLDhCQUFXLHVFQUFqQjs7QUFFQSxJQUFNeUIsZ0NBQVksYUFBbEI7O0FBRUEsSUFBTXRKLGtDQUFhO0FBQ3RCdUosYUFBUyxLQURhO0FBRXRCQyxZQUFROztBQU9aOzs7Ozs7QUFUMEIsQ0FBbkIsQ0FlUCxJQUFJQyxVQUFVLEVBQWQ7QUFBQSxJQUFrQkMsV0FBVyxFQUE3QjtBQUFBLElBQWlDQyxXQUFXLEVBQTVDO0FBQ0EsSUFBSUMsU0FBU0MsUUFBVCxDQUFrQkMsT0FBbEIsQ0FBMEIsV0FBMUIsTUFBMkMsQ0FBQyxDQUFoRCxFQUFtRDtBQUFFO0FBQ2pETCxjQUFVRyxTQUFTRyxRQUFULEdBQW9CLHlDQUE5QjtBQUNBO0FBQ0FKLGVBQVdDLFNBQVNHLFFBQVQsR0FBb0Isd0NBQS9CO0FBQ0gsQ0FKRCxNQUlPLElBQUlILFNBQVNDLFFBQVQsQ0FBa0JDLE9BQWxCLENBQTBCLGVBQTFCLE1BQStDLENBQUMsQ0FBcEQsRUFBdUQ7QUFBRTtBQUM1RDtBQUNBO0FBQ0FMLGNBQVUsMENBQVYsQ0FIMEQsQ0FHTDtBQUNyREUsZUFBVywwQ0FBWDtBQUNBO0FBQ0gsQ0FOTSxNQU1BO0FBQ0g7QUFDQTtBQUNBRixjQUFVLDBDQUFWLENBSEcsQ0FHa0Q7QUFDckRFLGVBQVcsMENBQVgsQ0FKRyxDQUltRDtBQUN0RDtBQUNBO0FBQ0g7QUFDRDs7Ozs7QUFLTyxJQUFNSyxrQ0FBYSxTQUFiQSxVQUFhLENBQUNDLEdBQUQsRUFBUztBQUMvQixRQUFJQyxZQUFZLEVBQWhCO0FBQ0EsUUFBSUQsT0FBT2pNLGlCQUFPQyxJQUFQLENBQVlrTSxRQUF2QixFQUFpQztBQUM3QkQsb0JBQVksRUFBWjtBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBTEEsU0FNSyxJQUFJRCxJQUFJRyxLQUFKLENBQVUsR0FBVixFQUFlLENBQWYsS0FBcUIsTUFBckIsSUFBK0JILE9BQU9qTSxpQkFBT0MsSUFBUCxDQUFZb00sT0FBdEQsRUFBK0Q7QUFDaEVILHdCQUFZUCxRQUFaO0FBQ0gsU0FGSSxNQUdBO0FBQ0RPLHdCQUFZVCxPQUFaO0FBQ0g7O0FBRUQsV0FBT1MsU0FBUDtBQUNILENBaEJNOztBQWtCUDs7Ozs7Ozs7OztBQVVPLElBQU1JLGdEQUFvQixTQUFwQkEsaUJBQW9CLENBQUN4TCxJQUFELEVBQVU7QUFDdkMsUUFBSXlGLE1BQU07QUFDTm5HLG9CQUFZVSxLQUFLTyxJQURYO0FBRU5QLGNBQU1BLEtBQUt5TCxNQUZMO0FBR05wRCxhQUFLckksS0FBS3FJO0FBSEosS0FBVjs7QUFNQSxXQUFPNUMsR0FBUDtBQUNILENBUk07O0FBVVA7QUFDQSxTQUFTaUcsV0FBVCxDQUFxQkMsSUFBckIsRUFBMkI7QUFDdkIsV0FBT0EsS0FBS0MsT0FBTCxDQUFhLEtBQWIsRUFBb0IsRUFBcEIsQ0FBUDtBQUNIOztBQUVEO0FBQ0EsU0FBU0MsUUFBVCxDQUFrQkMsSUFBbEIsRUFBd0I7QUFDcEIsV0FBTyxPQUFNOUMsSUFBTixDQUFXOEMsSUFBWCxJQUFtQkEsSUFBbkIsU0FBOEJBO0FBQXJDO0FBQ0g7O0FBRUQ7QUFDQSxTQUFTQyxjQUFULENBQXdCWixHQUF4QixFQUE2QjtBQUFBLHFCQUNZQSxJQUFJRyxLQUFKLENBQVUsR0FBVixDQURaO0FBQUE7QUFBQTtBQUFBLFFBQ2xCUSxJQURrQixnQ0FDWCxFQURXO0FBQUE7QUFBQSxRQUNQRSxVQURPLGlDQUNNLEVBRE47O0FBR3pCLFFBQUlQLFNBQVMsRUFBYjs7QUFFQU8sZUFBV1YsS0FBWCxDQUFpQixHQUFqQixFQUFzQnZKLE9BQXRCLENBQThCLGdCQUFRO0FBQUEsMEJBQ2JDLEtBQUtzSixLQUFMLENBQVcsR0FBWCxDQURhO0FBQUE7QUFBQSxZQUMzQlcsR0FEMkI7QUFBQSxZQUN0QmpJLEtBRHNCOztBQUdsQ3lILGVBQU9RLEdBQVAsSUFBY2pJLEtBQWQ7QUFDSCxLQUpEOztBQU1BLFdBQU8sRUFBQzhILFVBQUQsRUFBT0wsY0FBUCxFQUFQO0FBQ0g7O0FBRWMsU0FBU3hCLE9BQVQsQ0FBaUJpQyxNQUFqQixFQUF3QjtBQUFBLFFBQzlCQyxNQUQ4QixHQUNKRCxNQURJLENBQzlCQyxNQUQ4QjtBQUFBLFFBQ3RCaEIsR0FEc0IsR0FDSmUsTUFESSxDQUN0QmYsR0FEc0I7QUFBQSx1QkFDSmUsTUFESSxDQUNqQmxNLElBRGlCO0FBQUEsUUFDakJBLElBRGlCLGdDQUNWLEVBRFU7O0FBRW5DbU0sYUFBVUEsVUFBVUEsT0FBT0MsV0FBUCxFQUFYLElBQW9DLEtBQTdDOztBQUVBLFFBQUloQixZQUFZLHdCQUFoQjtBQUNBLFFBQUlpQixXQUFXakIsWUFBWUQsR0FBM0I7O0FBRUEsV0FBTyxzQkFBWSxVQUFDdEwsT0FBRCxFQUFTeU0sTUFBVCxFQUFrQjs7QUFFakMsWUFBSUMsVUFBVTtBQUNWcEIsaUJBQUlrQixRQURNO0FBRVZHLGtCQUFLTCxNQUZLO0FBR1ZNLHFCQUFRLGlCQUFTcE4sUUFBVCxFQUFrQjtBQUN0QixvQkFBR0EsU0FBU0MsVUFBVCxJQUF1QixLQUExQixFQUFnQztBQUM1Qix3QkFBSVUsUUFBT3dMLGtCQUFrQm5NLFFBQWxCLENBQVg7QUFDQVEsNEJBQVFHLEtBQVI7QUFDSDtBQUNKLGFBUlM7QUFTVjZJLG1CQUFNLGVBQVN4SixRQUFULEVBQWtCO0FBQ3BCaU4sdUJBQU8sSUFBSUksS0FBSixDQUFVLE1BQVYsQ0FBUDtBQUNIO0FBWFMsU0FBZDtBQWFDLFlBQUlQLFdBQVcsTUFBZixFQUF1QjtBQUNuQkksb0JBQVF2TSxJQUFSLEdBQWUseUJBQWVBLElBQWYsQ0FBZjtBQUNBdU0sb0JBQVFJLFFBQVIsR0FBbUIsTUFBbkI7QUFDSDs7QUFFRkMseUJBQUVDLElBQUYsQ0FBT04sT0FBUDtBQUNILEtBckJNLENBQVA7QUF1Qkg7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ08sSUFBTU8sb0JBQU0sU0FBTkEsR0FBTSxDQUFDM0IsR0FBRCxFQUFNbkwsSUFBTixFQUEyQjtBQUFBLFFBQWZhLEtBQWUsdUVBQVAsRUFBTzs7QUFDMUMsUUFBSWtNLFdBQVcsc0JBQWMsRUFBQ0MsU0FBUyxJQUFWLEVBQWdCQyxTQUFTLElBQXpCLEVBQStCQyxPQUFPLEtBQXRDLEVBQTZDQyxRQUFRLEtBQXJELEVBQWQsRUFBMkV0TSxLQUEzRSxDQUFmO0FBQ0EsV0FBT29KLFFBQVEsc0JBQWMsRUFBQ2tCLFFBQUQsRUFBTW5MLFVBQU4sRUFBZCxFQUEyQitNLFFBQTNCLENBQVIsQ0FBUDtBQUNILENBSE07QUFJQSxJQUFNSyxzQkFBTyxTQUFQQSxJQUFPLENBQUNqQyxHQUFELEVBQU1uTCxJQUFOLEVBQTJCO0FBQUEsUUFBZmEsS0FBZSx1RUFBUCxFQUFPOztBQUMzQyxRQUFJa00sV0FBVyxzQkFBYyxFQUFDQyxTQUFTLElBQVYsRUFBZ0JDLFNBQVMsSUFBekIsRUFBK0JDLE9BQU8sS0FBdEMsRUFBNkNDLFFBQVEsS0FBckQsRUFBZCxFQUEyRXRNLEtBQTNFLENBQWY7QUFDQSxXQUFPb0osUUFBUSxzQkFBYyxFQUFDa0MsUUFBUSxNQUFULEVBQWlCaEIsUUFBakIsRUFBc0JuTCxVQUF0QixFQUFkLEVBQTJDK00sUUFBM0MsQ0FBUixDQUFQO0FBQ0gsQ0FITTtBQUlBLElBQU1NLG9CQUFNLFNBQU5BLEdBQU0sQ0FBQ2xDLEdBQUQsRUFBTW5MLElBQU47QUFBQSxXQUFlaUssUUFBUSxFQUFDa0MsUUFBUSxLQUFULEVBQWdCaEIsUUFBaEIsRUFBcUJuTCxVQUFyQixFQUFSLENBQWY7QUFBQSxDQUFaO0FBQ0EsSUFBTXNOLG9CQUFNLFNBQU5BLEdBQU0sQ0FBQ25DLEdBQUQsRUFBTW5MLElBQU47QUFBQSxXQUFlaUssUUFBUSxFQUFDa0MsUUFBUSxRQUFULEVBQW1CaEIsUUFBbkIsRUFBd0JuTCxVQUF4QixFQUFSLENBQWY7QUFBQSxDQUFaOztBQUtQOzs7Ozs7QUFNQTs7Ozs7QUFLTyxJQUFNdU4sMENBQWlCLFNBQWpCQSxjQUFpQixDQUFDM0QsTUFBRCxFQUFZO0FBQ3RDLFFBQUksQ0FBQyxDQUFDQSxNQUFOLEVBQWM7QUFDVixZQUFJNEQsTUFBTTVELE9BQU82RCxLQUFQLENBQWEsQ0FBYixDQUFWO0FBQ0EsWUFBSUMsUUFBUUYsSUFBSWxDLEtBQUosQ0FBVSxHQUFWLENBQVo7QUFDQSxZQUFJcUMsTUFBTSxFQUFWO0FBQ0FELGNBQU0zTCxPQUFOLENBQWMsVUFBQ0MsSUFBRCxFQUFVO0FBQ3BCLGdCQUFJbkIsUUFBUW1CLEtBQUtzSixLQUFMLENBQVcsR0FBWCxDQUFaO0FBQ0FxQyxnQkFBSTlNLE1BQU0sQ0FBTixDQUFKLElBQWdCQSxNQUFNLENBQU4sQ0FBaEI7QUFDSCxTQUhEO0FBSUEsZUFBTzhNLEdBQVA7QUFDSCxLQVRELE1BVUs7QUFDRCxlQUFPLEVBQVA7QUFDSDtBQUNKLENBZE07O0FBbUJQOzs7Ozs7QUFRQTtBQUNPLFNBQVN6RCxhQUFULENBQXVCckosS0FBdkIsRUFBOEIrTSxHQUE5QixFQUFtQ0MsR0FBbkMsRUFBd0M7QUFDM0MsUUFBTUMsTUFBTTFELEdBQUdDLENBQUgsQ0FBS0MsR0FBakI7QUFDQXdELFFBQUk1RCxhQUFKLENBQWtCckosS0FBbEIsRUFBeUIrTSxHQUF6QixFQUE4QkMsR0FBOUI7QUFDSDs7QUFFRDtBQUNPLElBQU1FLDRDQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ2xOLEtBQUQsRUFBUStNLEdBQVIsRUFBYUMsR0FBYixFQUFxQjtBQUNoRCxRQUFNQyxNQUFNMUQsR0FBR0MsQ0FBSCxDQUFLQyxHQUFqQjtBQUNBd0QsUUFBSUMsZUFBSixDQUFvQmxOLEtBQXBCLEVBQTJCK00sR0FBM0IsRUFBZ0NDLEdBQWhDO0FBQ0gsQ0FITTtBQUlBLElBQU1HLDRDQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0osR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDekMsUUFBTUMsTUFBTTFELEdBQUdDLENBQUgsQ0FBS0MsR0FBakI7QUFDQXdELFFBQUlFLGVBQUosQ0FBb0JKLEdBQXBCLEVBQXlCQyxHQUF6QjtBQUNILENBSE07O0FBS0EsSUFBTUksd0JBQVEsU0FBUkEsS0FBUSxDQUFDQyxFQUFELEVBQVE7QUFDekJDLG9CQUFNQyxJQUFOLENBQVdGLEVBQVgsRUFBZSxDQUFmO0FBQ0gsQ0FGTTtBQUdQOzs7Ozs7O0FBT08sSUFBTUcsZ0RBQW9CLFNBQXBCQSxpQkFBb0IsR0FBeUU7QUFBQSxRQUF4RUMsS0FBd0UsdUVBQWhFLEVBQWdFO0FBQUEsUUFBNURDLFFBQTRELHVFQUFqRCxFQUFpRDtBQUFBLFFBQTdDQyxhQUE2Qyx1RUFBN0IsSUFBNkI7QUFBQSxRQUF2QkMsV0FBdUIsdUVBQVQsSUFBUzs7QUFDdEdDLGFBQVNKLEtBQVQsR0FBaUJBLEtBQWpCO0FBQ0EsUUFBTVIsTUFBTTFELEdBQUdDLENBQUgsQ0FBS0MsR0FBakI7QUFDQXdELFFBQUlhLGFBQUosQ0FBa0IsWUFBTTtBQUNwQmIsWUFBSWMscUJBQUosQ0FBMEJOLEtBQTFCO0FBQ0E7Ozs7OztBQU1BLFlBQUksQ0FBQyxDQUFDRSxhQUFOLEVBQXFCO0FBQ2pCVixnQkFBSWUsMkJBQUosQ0FBZ0NOLFFBQWhDLEVBQTBDRSxXQUExQyxFQUF1REQsYUFBdkQ7QUFDSCxTQUZELE1BR0s7QUFDRFYsZ0JBQUllLDJCQUFKLENBQWdDLEVBQWhDLEVBQW9DLElBQXBDLEVBQTBDLElBQTFDO0FBQ0g7QUFDSixLQWREO0FBZUgsQ0FsQk07O0FBc0JQOzs7QUFHTyxJQUFNQyw0Q0FBa0IsU0FBbEJBLGVBQWtCLEdBQU07QUFDakMsUUFBTWhCLE1BQU0xRCxHQUFHQyxDQUFILENBQUtDLEdBQWpCO0FBQ0F3RCxRQUFJYSxhQUFKLENBQWtCLFlBQU07QUFDcEJiLFlBQUlnQixlQUFKO0FBQ0gsS0FGRDtBQUdILENBTE07O0FBT0EsSUFBTUMsa0NBQWEsU0FBYkEsVUFBYSxDQUFDdEQsTUFBRCxFQUFTZ0IsT0FBVCxFQUFrQnVDLElBQWxCLEVBQTJCO0FBQ2pELFFBQU1sQixNQUFNMUQsR0FBR0MsQ0FBSCxDQUFLQyxHQUFqQjtBQUNBd0QsUUFBSWEsYUFBSixDQUFrQixZQUFNO0FBQ3BCOzs7Ozs7QUFNQWIsWUFBSW1CLFVBQUosQ0FBZXhELE1BQWYsRUFBdUJnQixPQUF2QixFQUFnQ3VDLElBQWhDO0FBQ0gsS0FSRDtBQVNILENBWE07O0FBYUEsSUFBTUUsc0NBQWUsU0FBZkEsWUFBZSxHQUFNO0FBQzlCLFFBQU1wQixNQUFNMUQsR0FBR0MsQ0FBSCxDQUFLQyxHQUFqQjtBQUNBd0QsUUFBSW9CLFlBQUo7QUFDSCxDQUhNOztBQUtBLElBQU1DLHNDQUFlLFNBQWZBLFlBQWUsQ0FBQ3RPLEtBQUQsRUFBUTRMLE9BQVIsRUFBaUJ1QyxJQUFqQixFQUEwQjtBQUNsRCxRQUFNbEIsTUFBTTFELEdBQUdDLENBQUgsQ0FBS0MsR0FBakI7QUFDQXdELFFBQUlxQixZQUFKLENBQWlCdE8sS0FBakIsRUFBd0I0TCxPQUF4QixFQUFpQ3VDLElBQWpDO0FBQ0gsQ0FITTs7QUFNQSxJQUFNSSx3Q0FBZ0IsU0FBaEJBLGFBQWdCLENBQUNqRSxHQUFELEVBQW9EO0FBQUEsUUFBOUNNLE1BQThDLHVFQUFyQyxJQUFxQztBQUFBLFFBQS9CNkMsS0FBK0IsdUVBQXZCLEVBQXVCO0FBQUEsUUFBbkJlLFFBQW1CLHVFQUFSLEdBQVE7O0FBQzdFLFFBQU12QixNQUFNMUQsR0FBR0MsQ0FBSCxDQUFLQyxHQUFqQjtBQUNBd0QsUUFBSXNCLGFBQUosQ0FBa0JqRSxHQUFsQixFQUF1Qk0sTUFBdkIsRUFBK0I2QyxLQUEvQixFQUFzQ2UsUUFBdEM7QUFDSCxDQUhNOztBQU9BLElBQU1DLGdEQUFvQixTQUFwQkEsaUJBQW9CLENBQUM3QyxPQUFELEVBQVV1QyxJQUFWLEVBQW1CO0FBQ2hELFFBQU1sQixNQUFNMUQsR0FBR0MsQ0FBSCxDQUFLQyxHQUFqQjtBQUNBd0QsUUFBSWEsYUFBSixDQUFrQixZQUFNO0FBQ3BCYixZQUFJd0IsaUJBQUosQ0FBc0I3QyxPQUF0QixFQUErQnVDLElBQS9CO0FBQ0gsS0FGRDtBQUdILENBTE07QUFNUDs7OztBQUlPLElBQU1PLGdDQUFZLFNBQVpBLFNBQVksQ0FBQ0MsTUFBRCxFQUFZO0FBQ2pDLFFBQU0xQixNQUFNMUQsR0FBR0MsQ0FBSCxDQUFLQyxHQUFqQjtBQUNBLFFBQUltRixLQUFLckYsR0FBR0MsQ0FBSCxDQUFLcUYsRUFBTCxJQUFXLEVBQXBCO0FBQ0EsUUFBSUMsU0FBU0gsT0FBT0ksU0FBUCxFQUFiO0FBQ0E5QixRQUFJYSxhQUFKLENBQWtCLFlBQVk7QUFDMUJiLFlBQUkrQixRQUFKLENBQWEsd0JBQWI7QUFDQS9CLFlBQUlnQyxjQUFKLENBQW1CO0FBQ2YzRSxpQkFBS3dFLFVBQVVBLE9BQU9JLE1BQVAsQ0FBYyxFQUFkO0FBREEsU0FBbkIsRUFFRyxZQUFZO0FBQ1hOLGVBQUdPLGdCQUFILENBQW9CLFVBQXBCO0FBQ0gsU0FKRCxFQUlHLFVBQVUzSCxHQUFWLEVBQWU7QUFDZCxnQkFBSUEsT0FBTyxRQUFYLEVBQXFCO0FBQ2pCb0gsbUJBQUdRLFNBQUgsQ0FBYSxXQUFiLEVBQTBCLFlBQVk7QUFBRTtBQUNwQ25DLHdCQUFJK0IsUUFBSixDQUFhLGdCQUFiLEVBQStCLEtBQS9CO0FBQ0Esd0JBQUkxRSxNQUFNLEVBQVY7QUFDQSx3QkFBSStFLElBQUlDLEtBQVIsRUFBZTtBQUNYaEYsOEJBQU0sa0VBQU47QUFDSCxxQkFGRCxNQUVPO0FBQ0hBLDhCQUFNLHNGQUFOO0FBQ0g7QUFDRDJDLHdCQUFJc0MsV0FBSixDQUFnQmpGLEdBQWhCO0FBQ0gsaUJBVEQsRUFTRyxZQUFZO0FBQ1gyQyx3QkFBSStCLFFBQUosQ0FBYSxnQkFBYixFQUErQixJQUEvQjtBQUNILGlCQVhELEVBV0csTUFYSCxFQVdXLE1BWFgsRUFXbUIsTUFYbkI7QUFZSCxhQWJELE1BYU87QUFDSEosbUJBQUdZLFNBQUgsQ0FBYWhJLE9BQU8sTUFBcEI7QUFDSDtBQUNKLFNBckJEO0FBc0JILEtBeEJEO0FBeUJILENBN0JNOztBQStCQSxJQUFNaUksd0JBQVEsU0FBUkEsS0FBUSxDQUFDaEMsS0FBRCxFQUFRaUMsSUFBUixFQUFjQyxNQUFkLEVBQXNCQyxPQUF0QixFQUFrQztBQUNuRCxRQUFNM0MsTUFBTTFELEdBQUdDLENBQUgsQ0FBS0MsR0FBakI7QUFDQSxRQUFJNEYsTUFBTTlGLEdBQUdDLENBQUgsQ0FBS0UsR0FBTCxJQUFZLEVBQXRCOztBQUVBdUQsUUFBSWEsYUFBSixDQUFrQixZQUFZOztBQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkFiLFlBQUk0QyxjQUFKLENBQW1CO0FBQ2ZwQyxtQkFBT0EsS0FEUTtBQUVmaUMsa0JBQU1BLElBRlM7QUFHZlosb0JBQVFhLE1BSE87QUFJZkcsc0JBQVVGLE9BSkssQ0FJSTtBQUpKLFNBQW5CLEVBS0csSUFMSDtBQU1ILEtBL0JEO0FBZ0NILENBcENNOztBQXNDUDs7OztBQUlPLElBQU1HLDBEQUF5QixTQUF6QkEsc0JBQXlCLENBQUNDLFNBQUQsRUFBZTtBQUNqRCxRQUFNcEIsS0FBS3JGLEdBQUdDLENBQUgsQ0FBS3FGLEVBQWhCO0FBQ0FELE9BQUdxQixXQUFIO0FBQ0EsUUFBSUMsV0FBVyxTQUFYQSxRQUFXLENBQUMvUSxJQUFELEVBQVU7QUFDckJ5UCxXQUFHdUIsT0FBSDtBQUNBSCxrQkFBVTdRLElBQVY7QUFDSCxLQUhEO0FBSUEsUUFBTThOLE1BQU0xRCxHQUFHQyxDQUFILENBQUtDLEdBQWpCO0FBQ0F3RCxRQUFJYSxhQUFKLENBQWtCLFlBQVk7QUFDMUJiLFlBQUk4QyxzQkFBSixDQUEyQixVQUFDNVEsSUFBRCxFQUFVO0FBQ2pDO0FBQ0ErUSxxQkFBUy9RLElBQVQ7QUFDSCxTQUhELEVBR0csWUFBTTs7QUFFTDhOLGdCQUFJbUQsV0FBSixDQUNJO0FBQ0lDLHFCQUFLLE1BQU1oUyxpQkFBT0MsSUFBUCxDQUFZb00sT0FEM0I7QUFFSTtBQUNBRSx3QkFBUTtBQUNKaEIsNkJBQVMsS0FETDtBQUVKQyw0QkFBUTtBQUZKLGlCQUhaO0FBT0l5Qix3QkFBUSxLQVBaO0FBUUljLHlCQUFTO0FBUmIsYUFESixFQVVPLElBVlAsRUFVYSxLQVZiLEVBV0ksVUFBVWpOLElBQVYsRUFBZ0I7QUFDWlMsd0JBQVFDLEdBQVIsQ0FBWVYsS0FBS3lMLE1BQWpCO0FBQ0FzRix5QkFBUy9RLEtBQUt5TCxNQUFkO0FBQ0gsYUFkTCxFQWVJLFVBQVVvQyxHQUFWLEVBQWU7QUFDWHNELGdDQUFnQkosUUFBaEI7QUFDSCxhQWpCTCxFQWtCSSxVQUFVSyxHQUFWLEVBQWU7QUFDWEQsZ0NBQWdCSixRQUFoQjtBQUNILGFBcEJMO0FBcUJILFNBMUJEO0FBMkJILEtBNUJEO0FBNkJILENBckNNOztBQXVDQSxJQUFNSSw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUNKLFFBQUQsRUFBYztBQUN6QyxRQUFNakQsTUFBTTFELEdBQUdDLENBQUgsQ0FBS0MsR0FBakI7QUFDQXdELFFBQUlhLGFBQUosQ0FBa0IsWUFBTTs7QUFFcEI7Ozs7OztBQU1BYixZQUFJcUQsZUFBSixDQUFvQixDQUFwQixFQUF1QixZQUFlO0FBQUEsZ0JBQWRuUixJQUFjLHVFQUFQLEVBQU87O0FBQ2xDUyxvQkFBUUMsR0FBUixDQUFZVixJQUFaO0FBQ0ErUSxxQkFBUy9RLElBQVQ7QUFDSCxTQUhELEVBR0csWUFBTTtBQUNMK1EscUJBQVM7QUFDTDlQLHdCQUFRO0FBREgsYUFBVDtBQUdILFNBUEQ7QUFRSCxLQWhCRDtBQWlCSCxDQW5CTTtBQW9CQSxJQUFNNk8sMENBQWlCLFNBQWpCQSxjQUFpQixDQUFDTixNQUFELEVBQVMzUCxPQUFULEVBQXFCO0FBQy9DLFFBQU1pTyxNQUFNMUQsR0FBR0MsQ0FBSCxDQUFLQyxHQUFqQjtBQUNBLFFBQUltRixLQUFLckYsR0FBR0MsQ0FBSCxDQUFLcUYsRUFBTCxJQUFXLEVBQXBCO0FBQ0EsUUFBSUMsU0FBU0gsT0FBT0ksU0FBUCxFQUFiO0FBQ0E5QixRQUFJYSxhQUFKLENBQWtCLFlBQU07QUFDcEJiLFlBQUlnQyxjQUFKLENBQW1CO0FBQ2YzRSxpQkFBS3dFLFVBQVVBLE9BQU9JLE1BQVAsQ0FBYyxFQUFkO0FBREEsU0FBbkIsRUFFRyxZQUFNO0FBQ0w7QUFDQSxhQUFDLENBQUNsUSxPQUFGLElBQWFBLFFBQVEsU0FBUixDQUFiO0FBQ0gsU0FMRCxFQUtHLFVBQUN3SSxHQUFELEVBQVM7QUFDUixnQkFBSUEsT0FBTyxRQUFYLEVBQXFCO0FBQ2pCb0gsbUJBQUdRLFNBQUgsQ0FBYSxXQUFiLEVBQTBCLFlBQVk7QUFBRTtBQUNwQ25DLHdCQUFJK0IsUUFBSixDQUFhLGdCQUFiLEVBQStCLEtBQS9CO0FBQ0Esd0JBQUkxRSxNQUFNLEVBQVY7QUFDQSx3QkFBSStFLElBQUlDLEtBQVIsRUFBZTtBQUNYaEYsOEJBQU0sa0VBQU47QUFDSCxxQkFGRCxNQUVPO0FBQ0hBLDhCQUFNLHNGQUFOO0FBQ0g7QUFDRDJDLHdCQUFJc0MsV0FBSixDQUFnQmpGLEdBQWhCO0FBQ0gsaUJBVEQsRUFTRyxZQUFZO0FBQ1gyQyx3QkFBSStCLFFBQUosQ0FBYSxnQkFBYixFQUErQixJQUEvQjtBQUNILGlCQVhELEVBV0csTUFYSCxFQVdXLE1BWFgsRUFXbUIsTUFYbkI7QUFZSCxhQWJELE1BYU87QUFDSCxpQkFBQyxDQUFDaFEsT0FBRixJQUFhQSxRQUFRLE1BQVIsQ0FBYjtBQUNIO0FBQ0osU0F0QkQ7QUF1QkgsS0F4QkQ7QUF5QkgsQ0E3Qk07O0FBZ0NBLElBQU13UixnREFBb0IsU0FBcEJBLGlCQUFvQixDQUFDdEgsSUFBRCxFQUFPdUgsS0FBUCxFQUF3QztBQUFBLFFBQTFCQyxJQUEwQix1RUFBbkIsR0FBbUI7QUFBQSxRQUFkQyxJQUFjLHVFQUFQLEVBQU87OztBQUVyRSxRQUFJQyxTQUFTLFNBQVRBLE1BQVMsQ0FBQ3hJLEdBQUQsRUFBUztBQUNsQixZQUFJeUksU0FBU2hELFNBQVNpRCxlQUFULENBQXlCQyxXQUF0QztBQUNBLGVBQU8zSSxNQUFNeUksTUFBTixHQUFlLEdBQXRCO0FBQ0gsS0FIRDtBQUlBLFFBQUlsQyxTQUFTZCxTQUFTbUQsY0FBVCxDQUF3QixZQUF4QixDQUFiO0FBQ0EsUUFBSUMsTUFBTXRDLE9BQU91QyxVQUFQLENBQWtCLElBQWxCLENBQVY7O0FBRUE7QUFDQTtBQUNBOztBQUVBdkMsV0FBT3dDLFlBQVAsQ0FBb0IsT0FBcEIsRUFBNkJSLElBQTdCO0FBQ0FoQyxXQUFPd0MsWUFBUCxDQUFvQixRQUFwQixFQUE4QlQsSUFBOUI7O0FBRUEvQixXQUFPeUMsS0FBUCxHQUFlekMsT0FBT3lDLEtBQXRCO0FBQ0FILFFBQUlJLE1BQUosQ0FBVyxDQUFDLEVBQUQsR0FBTUMsS0FBS0MsRUFBWCxHQUFnQixHQUEzQjtBQUNBLFFBQUlySSxPQUFPQSxJQUFYO0FBQ0ErSCxRQUFJTyxTQUFKLEdBQWdCZixLQUFoQjtBQUNBUSxRQUFJdkksU0FBSixHQUFnQixNQUFoQjtBQUNBLFFBQUkrSSxXQUFXZCxJQUFmO0FBQ0FNLFFBQUlTLElBQUosR0FBV0QsV0FBVyxVQUF0QjtBQUNBLFdBQU9SLElBQUlVLFdBQUosQ0FBZ0J6SSxJQUFoQixFQUFzQmtJLEtBQXRCLEdBQThCVixJQUFyQyxFQUEyQztBQUN2Q2U7QUFDQVIsWUFBSVMsSUFBSixHQUFXRCxXQUFXLFVBQXRCO0FBQ0g7QUFDRFIsUUFBSVcsUUFBSixDQUFhMUksSUFBYixFQUFtQixDQUFDd0gsSUFBcEIsRUFBMEJlLFFBQTFCO0FBQ0EsV0FBTzlDLE9BQU9JLFNBQVAsQ0FBaUIsV0FBakIsQ0FBUDtBQUNILENBN0JNOztBQWdDUDs7Ozs7Ozs7Ozs7O0FBWU8sSUFBTThDLDhEQUEyQixTQUEzQkEsd0JBQTJCLENBQUNDLFNBQUQsRUFBWTlTLE9BQVosRUFBd0I7QUFBQSxRQUN2RCtTLEtBRHVELEdBQ2lDRCxTQURqQyxDQUN2REMsS0FEdUQ7QUFBQSxRQUNoREMsU0FEZ0QsR0FDaUNGLFNBRGpDLENBQ2hERSxTQURnRDtBQUFBLFFBQ3JDQyxhQURxQyxHQUNpQ0gsU0FEakMsQ0FDckNHLGFBRHFDO0FBQUEsUUFDdEJDLE1BRHNCLEdBQ2lDSixTQURqQyxDQUN0QkksTUFEc0I7QUFBQSxRQUNkQyxPQURjLEdBQ2lDTCxTQURqQyxDQUNkSyxPQURjO0FBQUEsUUFDTEMsU0FESyxHQUNpQ04sU0FEakMsQ0FDTE0sU0FESztBQUFBLFFBQ01DLFVBRE4sR0FDaUNQLFNBRGpDLENBQ01PLFVBRE47QUFBQSxRQUNrQkMsV0FEbEIsR0FDaUNSLFNBRGpDLENBQ2tCUSxXQURsQjs7QUFFNUQsUUFBSTNELFNBQVNkLFNBQVNtRCxjQUFULENBQXdCLHFCQUF4QixDQUFiO0FBQ0E7OztBQUdBckMsV0FBT3lDLEtBQVAsR0FBZXpDLE9BQU95QyxLQUF0QjtBQUNBLFFBQUlILE1BQU10QyxPQUFPdUMsVUFBUCxDQUFrQixJQUFsQixDQUFWO0FBQ0EsUUFBSXFCLE1BQU0sSUFBSUMsS0FBSixFQUFWO0FBQ0FELFFBQUlFLEdBQUosR0FBVVYsS0FBVjtBQUNBUSxRQUFJRyxNQUFKLEdBQWEsWUFBWTs7QUFFckI7QUFDQS9ELGVBQU93QyxZQUFQLENBQW9CLE9BQXBCLEVBQTZCb0IsSUFBSW5CLEtBQWpDO0FBQ0F6QyxlQUFPd0MsWUFBUCxDQUFvQixRQUFwQixFQUE4Qm9CLElBQUlJLE1BQWxDOztBQUVBO0FBQ0ExQixZQUFJMkIsU0FBSixDQUFjTCxHQUFkLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCOztBQUVBLFlBQUksQ0FBQyxDQUFDSCxTQUFOLEVBQWlCO0FBQ2IsZ0JBQUlTLFVBQVVULFNBQWQ7QUFDQSxnQkFBSVUsVUFBVSxJQUFJTixLQUFKLEVBQWQ7QUFDQU0sb0JBQVFMLEdBQVIsR0FBY0ksT0FBZDtBQUNBQyxvQkFBUUosTUFBUixHQUFpQixZQUFZO0FBQ3pCekIsb0JBQUkyQixTQUFKLENBQWNFLE9BQWQsRUFBdUJULFVBQXZCLEVBQW1DQyxXQUFuQztBQUNILGFBRkQ7QUFHSDs7QUFFRDtBQUNBLFlBQUlTLHVCQUF1QmQsYUFBM0I7QUFDQTtBQUNBcEUsaUJBQVNtRCxjQUFULENBQXdCLGNBQXhCLEVBQXdDZ0MsU0FBeEMsR0FBb0QsRUFBcEQ7QUFDQSxZQUFJQyxTQUFTLElBQUlDLE1BQUosQ0FBV3JGLFNBQVNtRCxjQUFULENBQXdCLGNBQXhCLENBQVgsRUFBb0Q7QUFDN0Q5SCxrQkFBTThJLFNBRHVEO0FBRTdEVyxvQkFBUUksb0JBRnFEO0FBRzdEM0IsbUJBQU8yQixvQkFIc0Q7QUFJN0RJLDBCQUFjRCxPQUFPRSxZQUFQLENBQW9CQztBQUoyQixTQUFwRCxDQUFiO0FBTUEsWUFBSUMsWUFBWXpGLFNBQVNtRCxjQUFULENBQXdCLGNBQXhCLEVBQXdDdUMsb0JBQXhDLENBQTZELEtBQTdELEVBQW9FLENBQXBFLENBQWhCO0FBQ0FELGtCQUFVWixNQUFWLEdBQW1CLFlBQVk7QUFDM0I7QUFDQSxnQkFBSWMsV0FBV3RCLE1BQWY7QUFBQSxnQkFBdUJ1QixXQUFXdEIsT0FBbEM7QUFDQWxCLGdCQUFJMkIsU0FBSixDQUFjVSxTQUFkLEVBQXlCRSxRQUF6QixFQUFtQ0MsUUFBbkM7QUFDQTtBQUNBeEUsMkJBQWVOLE1BQWYsRUFBdUIzUCxPQUF2QjtBQUNILFNBTkQ7QUFPSCxLQXBDRDtBQXFDSCxDQS9DTSxDOzs7Ozs7O0FDN3NCUDtBQUNBLGtCQUFrQiwrYjs7Ozs7Ozs7Ozs7OztBQ0RsQixJQUFNcU0sU0FBUztBQUNYL00sVUFBTTtBQUNGaEMsa0JBQVUseUJBRFIsRUFDbUM7QUFDckNnRSx3QkFBZ0IsK0JBRmQsRUFFK0M7QUFDakQ3RCxrQkFBVSx5QkFIUixFQUdtQztBQUNyQ0UsNEJBQW9CLGdDQUpsQixFQUlvRDtBQUN0REUsb0JBQVksMkJBTFYsRUFLdUM7QUFDekNMLHFCQUFhLHFCQU5YLEVBTW1DO0FBQ3JDa0IsdUJBQWUsdUJBUGIsRUFPdUM7QUFDekNHLHFCQUFhLHFCQVJYLEVBUWtDO0FBQ3BDRCxvQkFBWSxvQkFUVixFQVNnQztBQUNsQ0gsbUJBQVcsaUJBVlQsRUFVNEI7QUFDOUJELHdCQUFlLHNCQVhiLEVBV3FDO0FBQ3ZDTSxxQkFBWSw0QkFaVixFQVl3QztBQUMxQ2xCLHdCQUFlLG1CQWJiLEVBYWtDO0FBQ3BDO0FBQ0FNLHVCQUFjLG9CQWZaLEVBZWlDO0FBQ25DRCx3QkFBZSxxQkFoQmIsRUFnQm1DO0FBQ3JDRiwwQkFBaUIsdUJBakJmLEVBaUJ1QztBQUN6Q0MseUJBQWdCLHNCQWxCZCxFQWtCcUM7QUFDdkNJLHdCQUFlLHlCQW5CYixFQW1CdUM7QUFDekNELG1DQUEwQixnQ0FwQnhCLEVBb0J5RDtBQUMzREksc0JBQWEsNkJBckJYLEVBcUJ5QztBQUMzQ0ksdUJBQWMsOEJBdEJaLEVBc0IyQztBQUM3Q04sc0JBQWEsb0JBdkJYLEVBdUJnQztBQUNsQ1Usd0JBQWUsK0JBeEJiLEVBd0I2QztBQUMvQzJWLDZCQUFvQixvQ0F6QmxCLEVBeUJ1RDtBQUN6RGxKLGtCQUFTLHFCQTFCUCxFQTBCNkI7QUFDL0JwTyxpQkFBUSxjQTNCTixFQTJCcUI7QUFDdkJDLGlCQUFRLGNBNUJOLEVBNEJxQjtBQUN2QjRDLG1CQUFVLGdCQTdCUixFQTZCeUI7QUFDM0IvQyxxQkFBWSxrQkE5QlYsRUE4QjZCO0FBQy9Cb0IsMEJBQWlCLDJCQS9CZixFQStCMkM7QUFDN0NxVyx1QkFBYyxvQkFoQ1osRUFnQ2lDO0FBQ25DN1cseUJBQWdCLGdDQWpDZCxFQWlDK0M7QUFDakQ0TixpQkFBUSxnQkFsQ04sRUFrQ3VCO0FBQ3pCckksa0JBQVMsMEJBbkNQLENBbUNpQztBQW5DakMsS0FESztBQXNDWDNELGdCQUFZO0FBQ1JDLGlCQUFRO0FBREEsS0F0Q0Q7QUF5Q1hpVixnQkFBVztBQUNQQyxrQkFBUztBQURGLEtBekNBO0FBNENYaFYsY0FBUztBQUNMeUIsd0JBQWU7QUFDWDFCLHFCQUFRLG9DQURHO0FBRVhFLHVCQUFVO0FBRkMsU0FEVjtBQUtMNkYsb0NBQTJCO0FBQ3ZCL0YscUJBQVEseUJBRGU7QUFFdkJFLHVCQUFVO0FBRmEsU0FMdEI7QUFTTGxDLHdCQUFlO0FBQ1hnQyxxQkFBUSx3QkFERztBQUVYRSx1QkFBVTtBQUZDLFNBVFY7QUFhTHpDLGlCQUFRO0FBQ0p1QyxxQkFBUSxtQkFESjtBQUVKRSx1QkFBVTtBQUZOLFNBYkg7QUFpQkx0QyxxQkFBWTtBQUNSb0MscUJBQVEsMEJBREE7QUFFUkUsdUJBQVU7QUFGRjtBQWpCUDtBQTVDRSxDQUFmO2tCQW1FZXVNLE07Ozs7Ozs7Ozs7Ozs7OztBQ25FZjs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLTyxJQUFNeUksa0NBQVksU0FBWkEsVUFBWSxDQUFDQyxJQUFELEVBQVE7QUFDN0IsV0FBTztBQUNIekgsZ0JBQVEsSUFETDtBQUVISCxpQkFBUSxLQUZMO0FBR0hDLGlCQUFRLEtBSEw7QUFJSEMsZUFBTyxJQUpKO0FBS0gySCxpQkFBUztBQUNMQywwQkFBYUY7QUFEUjtBQUxOLEtBQVA7QUFVSCxDQVhNOztBQWFQOzs7Ozs7O0FBT08sSUFBTUcsZ0RBQW1CLFNBQW5CQSxpQkFBbUIsQ0FBQ0gsSUFBRCxFQUFNblYsT0FBTixFQUFlRSxTQUFmLEVBQTJCO0FBQ3ZELFdBQU87QUFDSHVOLGVBQU8sSUFESjtBQUVIMkgsaUJBQVM7QUFDTEcsb0JBQVEsS0FESDtBQUVMRiwwQkFBY0YsSUFGVDtBQUdMblYsNEJBSEs7QUFJTEU7QUFKSztBQUZOLEtBQVA7QUFTSCxDQVZNOztBQVlBLElBQU02TCxnREFBb0IsU0FBcEJBLGlCQUFvQixDQUFDeEwsSUFBRCxFQUFVO0FBQ3ZDLFFBQUl5RixNQUFNO0FBQ05uRyxvQkFBWVUsS0FBS08sSUFEWDtBQUVOUCxjQUFNQSxLQUFLeUwsTUFGTDtBQUdOcEQsYUFBS3JJLEtBQUtxSTtBQUhKLEtBQVY7O0FBTUEsV0FBTzVDLEdBQVA7QUFDSCxDQVJNOztBQVVQOzs7Ozs7O0FBT08sSUFBTXdQLG9FQUE4QixTQUE5QkEsMkJBQThCLENBQUM1VSxNQUFELEVBQVFaLE9BQVIsRUFBZ0JFLFNBQWhCLEVBQThCOztBQUV0RSxRQUFLdVYsaUJBQWUsU0FBZkEsY0FBZSxDQUFDN1YsUUFBRCxFQUFZO0FBQzVCLFlBQUk4VixNQUFJM0osa0JBQWtCbk0sUUFBbEIsQ0FBUjtBQUNBO0FBQ0EsWUFBSStWLGdCQUFnQixFQUFwQjtBQUNBaEwsV0FBR0MsQ0FBSCxDQUFLckwsSUFBTCxDQUFVcVcsY0FBVixDQUF5QjtBQUNyQjVWLDRCQURxQjtBQUVyQkU7QUFGcUIsU0FBekIsRUFHRSxVQUFTSyxJQUFULEVBQWM7QUFDWixnQkFBSSxDQUFDLENBQUNBLElBQU4sRUFBWTtBQUNQb1YsZ0NBQWdCcFYsSUFBaEI7QUFDSjtBQUNKLFNBUEQsRUFPRSxZQUFVO0FBQ1BvSyxlQUFHQyxDQUFILENBQUtyTCxJQUFMLENBQVVzVyxhQUFWLENBQXdCO0FBQ3BCN1YsZ0NBRG9CO0FBRXBCRTtBQUZvQixhQUF4QjtBQUlKLFNBWkQ7QUFhQSxZQUFJNFYsY0FBY0Msb0JBQVVDLEVBQVYsQ0FBYUQsb0JBQVVFLE1BQVYsQ0FBaUJQLEdBQWpCLENBQWIsRUFBbUNLLG9CQUFVRSxNQUFWLENBQWlCTixhQUFqQixDQUFuQyxDQUFsQixDQWpCNEIsQ0FpQjJEO0FBQ3ZGLFlBQUksQ0FBQ0csV0FBTCxFQUFrQjtBQUFFO0FBQ2ZsVixtQkFBTzhVLEdBQVA7QUFDSjtBQUNKLEtBckJEO0FBc0JDLFdBQU87QUFDSGpJLGVBQU8sSUFESjtBQUVIMkgsaUJBQVM7QUFDTGMsbUJBQU8sSUFERjtBQUVMQywyQkFBYyxLQUZUO0FBR0xuVyw0QkFISztBQUlMRTtBQUpLLFNBRk47QUFRSFUsZ0JBQVE2VTtBQVJMLEtBQVA7QUFVSCxDQWxDTTs7QUFvQ1A7Ozs7O0FBS08sSUFBTVcsb0NBQWMsU0FBZEEsV0FBYyxDQUFDcFcsT0FBRCxFQUFVRSxTQUFWLEVBQXdCO0FBQy9DeUssT0FBR0MsQ0FBSCxDQUFLckwsSUFBTCxDQUFVc1csYUFBVixDQUF3QjtBQUNwQjdWLGlCQUFTQSxPQURXO0FBRXBCRSxtQkFBV0E7QUFGUyxLQUF4QixFQUdHLFlBQU07QUFDTGMsZ0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0gsS0FMRCxFQUtHLFlBQU07QUFDTDBKLFdBQUdDLENBQUgsQ0FBS3JMLElBQUwsQ0FBVXNXLGFBQVYsQ0FBd0I7QUFDcEIxVixrQkFBTTtBQURjLFNBQXhCO0FBR0gsS0FURDtBQVVILENBWE0sQzs7Ozs7Ozs7QUM5T007QUFDYjtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxzQkFBVztBQUNqQywyQkFBMkIsbUJBQU8sQ0FBQyxzQkFBMkI7QUFDOUQsY0FBYyxtQkFBTyxDQUFDLHNCQUFZOztBQUVsQywrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUU7Ozs7Ozs7O0FDWEgsbUJBQU8sQ0FBQyxzQkFBaUM7QUFDekMsbUJBQU8sQ0FBQyxzQkFBZ0M7QUFDeEMsbUJBQU8sQ0FBQyxzQkFBNkI7QUFDckMsbUJBQU8sQ0FBQyxzQkFBd0I7QUFDaEMsbUJBQU8sQ0FBQyxzQkFBZ0M7QUFDeEMsbUJBQU8sQ0FBQyxzQkFBNEI7QUFDcEMsaUJBQWlCLG1CQUFPLENBQUMsc0JBQWtCOzs7Ozs7OztBQ04zQyxVQUFVLG1CQUFPLENBQUMsc0JBQVE7QUFDMUIsYUFBYSxtQkFBTyxDQUFDLHNCQUFXO0FBQ2hDLFdBQVcsbUJBQU8sQ0FBQyxzQkFBUztBQUM1QixVQUFVLG1CQUFPLENBQUMsc0JBQWU7QUFDakMsYUFBYSxtQkFBTyxDQUFDLHNCQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLG1CQUFPLENBQUMsc0JBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRkE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJrVyxhOzs7QUFvRmpCLDJCQUFZalAsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTs7QUFBQSx3SkFDbEJELEtBRGtCLEVBQ1hDLE9BRFc7O0FBQUEsY0FyRTVCaVAsV0FxRTRCLEdBckVkLFlBQU07QUFDaEIsa0JBQUtsUCxLQUFMLENBQVc3RyxJQUFYLENBQWdCK0IsT0FBaEIsQ0FBd0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzlCLG9CQUFJQSxLQUFLTCxTQUFMLElBQWtCLENBQWxCLElBQXVCSyxLQUFLTCxTQUFMLEtBQW1CLEtBQTlDLEVBQXFEO0FBQ2pELDBCQUFLcVUsT0FBTCxDQUFhOVIsSUFBYixDQUFrQmxDLElBQWxCO0FBQ0gsaUJBRkQsTUFHSztBQUNELDBCQUFLaVUsT0FBTCxDQUFhL1IsSUFBYixDQUFrQmxDLElBQWxCO0FBQ0g7QUFDSixhQVBEO0FBUUgsU0E0RDJCOztBQUFBLGNBM0Q1QmtVLFdBMkQ0QixHQTNEZCxZQUFNO0FBQ2hCLGtCQUFLclAsS0FBTCxDQUFXc1AsT0FBWDtBQUNILFNBeUQyQjs7QUFBQSxjQXhENUJDLFVBd0Q0QixHQXhEZixZQUFNO0FBQ2YsZ0JBQUlDLFlBQUo7QUFDQSxnQkFBTXZJLE1BQU0xRCxHQUFHQyxDQUFILENBQUtDLEdBQWpCO0FBQ0E7Ozs7OztBQU1BO0FBQ0F3RCxnQkFBSWEsYUFBSixDQUFrQixZQUFNO0FBQ3BCYixvQkFBSXdJLFdBQUosQ0FBZ0IsWUFBSTtBQUNoQkQseUJBQUt4UCxLQUFMLENBQVcwUCxlQUFYLENBQTJCLFNBQTNCO0FBQ0gsaUJBRkQsRUFFRyxZQUFJO0FBQ0hGLHlCQUFLeFAsS0FBTCxDQUFXMFAsZUFBWCxDQUEyQixNQUEzQjtBQUNILGlCQUpELEVBSUUsRUFBQ0MsT0FBTUgsS0FBS3hQLEtBQUwsQ0FBVzRQLFNBQWxCLEVBSkY7QUFLSCxhQU5EO0FBUUgsU0FzQzJCOztBQUFBLGNBckM1QkMsZUFxQzRCLEdBckNWLFVBQUMxUyxLQUFELEVBQVc7O0FBRXpCO0FBQ0EsZ0JBQUksQ0FBQyxDQUFDLE1BQUs2QyxLQUFMLENBQVdHLFFBQWpCLEVBQTJCO0FBQ3ZCLG9CQUFJcVAsWUFBSjtBQUNBLHNDQUFZLFVBQUN4VyxPQUFELEVBQVV5TSxNQUFWLEVBQXFCO0FBQzdCK0oseUJBQUt4UCxLQUFMLENBQVdHLFFBQVgsQ0FBb0JoRCxLQUFwQixFQUEyQm5FLE9BQTNCLEVBQW9DeU0sTUFBcEM7QUFDSCxpQkFGRCxFQUVHbE4sSUFGSCxDQUVRLFlBQU07QUFDVmlYLHlCQUFLTSxXQUFMLENBQWlCM1MsS0FBakI7QUFDSCxpQkFKRCxFQUlHNFMsS0FKSCxDQUlTLFlBQU0sQ0FFZCxDQU5EO0FBT0gsYUFURCxNQVVLO0FBQ0Qsc0JBQUtELFdBQUwsQ0FBaUIzUyxLQUFqQjtBQUNIO0FBR0osU0FtQjJCOztBQUFBLGNBbEI1QjJTLFdBa0I0QixHQWxCZCxVQUFDM1MsS0FBRCxFQUFXO0FBQ3JCO0FBQ0EsZ0JBQUk2UyxVQUFVLEVBQWQ7QUFDQSxrQkFBS3pVLEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0JtSCxHQUFoQixDQUFvQixVQUFDbkYsSUFBRCxFQUFVO0FBQzFCLG9CQUFJQSxLQUFLakIsYUFBTCxJQUFzQmlELE1BQU1qRCxhQUFoQyxFQUNJaUIsS0FBS0YsUUFBTCxHQUFnQixJQUFoQixDQURKLEtBRUs7QUFDREUseUJBQUtGLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSDtBQUNEK1Usd0JBQVEzUyxJQUFSLENBQWFsQyxJQUFiO0FBQ0gsYUFQRDtBQVFBLGtCQUFLOFUsUUFBTCxDQUFjO0FBQ1Y5VyxzQkFBTTZXO0FBREksYUFBZDtBQUdBO0FBQ0E7QUFDSCxTQUUyQjs7QUFBQSxjQVk1QkUsb0JBWjRCLEdBWUwsWUFBTTtBQUN6QixrQkFBS0QsUUFBTCxHQUFnQixVQUFDMVUsS0FBRCxFQUFPMk8sUUFBUCxFQUFrQjtBQUM5QjtBQUNILGFBRkQ7QUFHSCxTQWhCMkI7O0FBRXhCLGNBQUtrRixPQUFMLEdBQWUsRUFBZixDQUZ3QixDQUVOO0FBQ2xCLGNBQUtELE9BQUwsR0FBZSxFQUFmLENBSHdCLENBR047O0FBRWxCLGNBQUtELFdBQUw7O0FBRUEsY0FBSzNULEtBQUwsR0FBYTtBQUNUcEMsa0JBQU0sTUFBS2lXO0FBREYsU0FBYjtBQVB3QjtBQVUzQjs7OztpQ0FPUTs7QUFHTCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxzQkFBZjtBQUNJLHVEQUFLLFdBQVUsTUFBZixFQUFzQixTQUFTLEtBQUtDLFdBQXBDLEdBREo7QUFFSTtBQUFBO0FBQUEsc0JBQUssV0FBVSx3QkFBZjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLE1BQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxVQUFmLEVBQTBCLFNBQVMsS0FBS0EsV0FBeEM7QUFDSSxpRUFBRyxXQUFVLFdBQWI7QUFESix5QkFESjtBQUlJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLFlBQWY7QUFDSyxpQ0FBS3JQLEtBQUwsQ0FBV3lIO0FBRGhCLHlCQUpKO0FBUVEseUJBQUMsQ0FBQyxLQUFLekgsS0FBTCxDQUFXbVEsWUFBYixHQUNJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLFVBQWY7QUFBQTtBQUFBLHlCQURKLEdBS0ksdUNBQUssV0FBVSxjQUFmO0FBYloscUJBREo7QUFrQkk7QUFBQTtBQUFBLDBCQUFLLFdBQVUsU0FBZjtBQUNJO0FBQUE7QUFBQTtBQUNJLDBEQUFDLG1CQUFELElBQVksTUFBTSxLQUFLZixPQUF2QixFQUFnQyxVQUFVLEtBQUtTLGVBQS9DLEdBREo7QUFFSyxpQ0FBSzdQLEtBQUwsQ0FBV29RLFdBQVgsSUFDRztBQUFBO0FBQUEsa0NBQUssV0FBVSxVQUFmLEVBQTBCLFNBQVMsS0FBS2IsVUFBeEM7QUFDSSxxRUFBRyxXQUFVLGVBQWIsR0FESjtBQUVJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLGFBQWY7QUFBQTtBQUFBLGlDQUZKO0FBR0kscUVBQUcsV0FBVSxZQUFiO0FBSEosNkJBSFI7QUFTSSwwREFBRSxtQkFBRixJQUFhLE1BQU0sS0FBS0osT0FBeEIsRUFBaUMsWUFBWSxJQUE3QztBQVRKO0FBREo7QUFsQko7QUFGSixhQURKO0FBcUNIOzs7RUE3SXNDdE8sZ0JBQU1DLFMsVUFFdENDLFMsR0FBWTtBQUNmMEcsV0FBT3pHLG9CQUFVcVAsTUFERjtBQUVmbFgsVUFBTTZILG9CQUFVNkYsS0FBVixDQUFnQjNGLFVBRlA7QUFHZmYsY0FBVWEsb0JBQVVHLElBSEw7QUFJZmdQLGtCQUFjblAsb0JBQVVJLElBSlQ7QUFLZmtQLHFCQUFpQnRQLG9CQUFVRyxJQUxaO0FBTWZpUCxpQkFBYXBQLG9CQUFVSSxJQU5SO0FBT2ZzTyxxQkFBZ0IxTyxvQkFBVUcsSUFQWDtBQVFmeU8sZUFBVTVPLG9CQUFVcVA7QUFSTCxDLFNBVVpoUCxZLEdBQWU7QUFDbEI4TyxrQkFBYztBQURJLEM7a0JBWkxsQixhOzs7Ozs7O0FDSnJCO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLHNCQUFjO0FBQ3JDLGdCQUFnQixtQkFBTyxDQUFDLHNCQUFlO0FBQ3ZDLGNBQWMsbUJBQU8sQ0FBQyxzQkFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7O0FDZkEsYUFBYSxtQkFBTyxDQUFDLHNCQUFXO0FBQ2hDLGdCQUFnQixtQkFBTyxDQUFDLHNCQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxzQkFBUTs7QUFFN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSx1Q0FBdUMsc0JBQXNCLEVBQUU7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7OztBQ3BFYTtBQUNiO0FBQ0EsZ0JBQWdCLG1CQUFPLENBQUMsc0JBQWU7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNqQkE7QUFDYTtBQUNiLGNBQWMsbUJBQU8sQ0FBQyxzQkFBVztBQUNqQyxXQUFXLG1CQUFPLENBQUMsc0JBQVM7QUFDNUIsYUFBYSxtQkFBTyxDQUFDLHNCQUFXO0FBQ2hDLHlCQUF5QixtQkFBTyxDQUFDLHNCQUF3QjtBQUN6RCxxQkFBcUIsbUJBQU8sQ0FBQyxzQkFBb0I7O0FBRWpELDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxVQUFVLEVBQUU7QUFDMUUsS0FBSztBQUNMO0FBQ0EsOERBQThELFNBQVMsRUFBRTtBQUN6RSxLQUFLO0FBQ0w7QUFDQSxDQUFDLEVBQUU7Ozs7Ozs7O0FDbkJIO0FBQ0E7QUFDQSxZQUFZO0FBQ1osR0FBRztBQUNILFlBQVk7QUFDWjtBQUNBOzs7Ozs7OztBQ05BLGtCQUFrQixZQUFZLG1CQUFPLENBQUMsc0JBQWdDLHNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0F0RTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7SUFHTXNCLHdCOzs7Ozs7Ozs7Ozs7OztvUEFzQkZyUSxXLEdBQVksWUFBSTtBQUFBLDhCQUNrRSxNQUFLRixLQUR2RTtBQUFBLGdCQUNQeUIsU0FETyxlQUNQQSxTQURPO0FBQUEsZ0JBQ0duRyxtQkFESCxlQUNHQSxtQkFESDtBQUFBLGdCQUN1Qm9HLGNBRHZCLGVBQ3VCQSxjQUR2QjtBQUFBLGdCQUNzQ0Msa0JBRHRDLGVBQ3NDQSxrQkFEdEM7QUFBQSxnQkFDeURpQixPQUR6RCxlQUN5REEsT0FEekQ7O0FBRVosZ0JBQUluQixVQUFVakgsTUFBVixHQUFpQixFQUFqQixJQUFxQmlILFVBQVVqSCxNQUFWLElBQWtCLENBQTNDLEVBQThDO0FBQzFDLG9DQUFNLFlBQU47QUFDSCxhQUZELE1BR0ssSUFBSSxDQUFDLENBQUNrSCxjQUFGLElBQW9CLENBQUNRLGtCQUFTQyxJQUFULENBQWMsTUFBS25DLEtBQUwsQ0FBVzBCLGNBQXpCLENBQXpCLEVBQWtFO0FBQ25FLG9DQUFNLFdBQU47QUFDSCxhQUZJLE1BR0EsSUFBSSxDQUFDcEcsb0JBQW9CcEIsYUFBekIsRUFBd0M7QUFDekMsb0NBQU0sVUFBTjtBQUNILGFBRkksTUFHQTtBQUNELG9CQUFHeUgsa0JBQUgsRUFBc0I7QUFDbEIseURBQXVCLFVBQUMxRSxJQUFELEVBQVE7QUFDM0Isa0VBQWEyRixPQUFiLEVBQXNCO0FBQ2xCM0ksd0NBQVl5SCxjQURNO0FBRWxCeEgsMkNBQWVvQixvQkFBb0JwQixhQUZqQjtBQUdsQkMsbUNBQU9zSCxTQUhXO0FBSWxCckgsb0NBQU82QyxLQUFLN0M7QUFKTSx5QkFBdEI7QUFNSCxxQkFQRDtBQVNILGlCQVZELE1BV0k7QUFDQSx5REFBdUIsVUFBQzZDLElBQUQsRUFBUTtBQUMzQixrRUFBYTJGLE9BQWIsRUFBc0I7QUFDbEIxSSwyQ0FBZW9CLG9CQUFvQnBCLGFBRGpCO0FBRWxCQyxtQ0FBT3NILFNBRlc7QUFHbEJySCxvQ0FBTzZDLEtBQUs3QztBQUhNLHlCQUF0QjtBQUtILHFCQU5EO0FBUUg7QUFFSjtBQUVKLFM7Ozs7OzRDQXhEbUI7QUFDaEI7QUFDQSw0Q0FBa0IsU0FBbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBUSxVQUFDVixJQUFELEVBQVE7QUFDWkUsd0JBQVFDLEdBQVIsQ0FBWSx1QkFBWjtBQUNILGFBRkQsRUFFR3RCLElBRkgsQ0FFUSxVQUFDQyxRQUFELEVBQVk7QUFDaEIsb0JBQUlBLFNBQVNXLElBQVQsQ0FBY1EsT0FBZCxJQUF5QixHQUE3QixFQUFrQztBQUM5QjtBQUNIO0FBQ0Q7QUFDQW5CLHlCQUFTZ1ksR0FBVCxDQUFhekIsYUFBYjtBQUNILGFBUkQ7QUFTSDs7QUFFRDs7Ozs7O2lDQXlDUztBQUNMLGdCQUFJcE4scUJBQW1CLEtBQXZCO0FBREsseUJBRW9CLEtBQUszQixLQUZ6QjtBQUFBLGdCQUVBeVEsT0FGQSxVQUVBQSxPQUZBO0FBQUEsZ0JBRVNwYSxPQUZULFVBRVNBLE9BRlQ7OztBQUlMLGdCQUFJb2EsV0FBVyxHQUFYLElBQWtCcGEsV0FBVyxHQUFqQyxFQUFzQztBQUNsQztBQUNEc0wscUNBQW1CLElBQW5CO0FBQ0Y7QUFDRCxtQkFBTyw4QkFBQyx5QkFBRCw2QkFBcUIsS0FBSzNCLEtBQTFCLElBQWlDLG9CQUFvQjJCLGtCQUFyRCxFQUF5RSxhQUFhLEtBQUt6QixXQUEzRixJQUFQO0FBQ0g7OztFQXJFa0NZLGdCOztBQXdFdkMsSUFBTTRQLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ25WLEtBQUQsRUFBVzs7QUFFL0IsV0FBTztBQUNIa0csbUJBQVdsRyxNQUFNeUQsS0FBTixDQUFZLENBQUMsYUFBRCxFQUFnQixTQUFoQixDQUFaLENBRFI7QUFFSDFELDZCQUFxQkMsTUFBTXlELEtBQU4sQ0FBWSxDQUFDLHFCQUFELENBQVosRUFBcUNDLElBQXJDLEVBRmxCO0FBR0gxRSxrQkFBVWdCLE1BQU15RCxLQUFOLENBQVksQ0FBQyxVQUFELENBQVosRUFBMEJDLElBQTFCLEVBSFA7QUFJSHlDLHdCQUFnQm5HLE1BQU15RCxLQUFOLENBQVksQ0FBQyxnQkFBRCxDQUFaLENBSmI7QUFLSHlSLGlCQUFTbFYsTUFBTXlELEtBQU4sQ0FBWSxDQUFDLFNBQUQsQ0FBWixDQUxOO0FBTUgzSSxpQkFBU2tGLE1BQU15RCxLQUFOLENBQVksQ0FBQyxTQUFELENBQVo7O0FBRVQ7QUFSRyxLQUFQO0FBVUgsQ0FaRDs7QUFjQSxJQUFNMlIsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ3BYLFFBQUQsRUFBYztBQUNwQzs7O0FBR0EsUUFBSXFJLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ3pFLEtBQUQsRUFBVztBQUM3QjVELGlCQUFTLGdDQUFtQixFQUFDK0MsYUFBYSxFQUFDdUIsU0FBU1YsS0FBVixFQUFkLEVBQW5CLENBQVQ7QUFDSCxLQUZEOztBQUlBOzs7Ozs7QUFNQSxRQUFJMEUsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ08sR0FBRCxFQUFNcEosT0FBTixFQUFleU0sTUFBZixFQUEwQjtBQUM3Q2xNLGlCQUFTLGdDQUFtQixFQUFDK0IscUJBQXFCOEcsR0FBdEIsRUFBbkIsQ0FBVDtBQUNBcEo7QUFDQTRYLDJCQUFTQyxLQUFUO0FBQ0gsS0FKRDs7QUFNQTs7OztBQUlBLFFBQUkvTyxVQUFVLFNBQVZBLE9BQVUsQ0FBQ3JHLE1BQUQsRUFBWTtBQUN0QjdCLGdCQUFRQyxHQUFSLENBQVksU0FBWjtBQUNBLFlBQUk0QixVQUFVLFNBQWQsRUFBeUI7QUFDckIsMkNBQVlwRCxpQkFBT1EsUUFBUCxDQUFnQnlCLGNBQWhCLENBQStCMUIsT0FBM0MsRUFBb0RQLGlCQUFPUSxRQUFQLENBQWdCeUIsY0FBaEIsQ0FBK0J4QixTQUFuRjtBQUNBO0FBQ0g7QUFDRDhYLDJCQUFTQyxLQUFUO0FBQ0gsS0FQRDs7QUFTQTs7OztBQUlBLFFBQUk5Tyx1QkFBcUIsU0FBckJBLG9CQUFxQixDQUFDNUUsS0FBRCxFQUFTO0FBQzlCNUQsaUJBQVMsZ0NBQW1CLEVBQUNtSSxnQkFBZ0J2RSxLQUFqQixFQUFuQixDQUFUO0FBQ0gsS0FGRDs7QUFLQSxXQUFPO0FBQ0h5RSx5QkFBaUJBLGVBRGQ7QUFFSEMsMEJBQWtCQSxnQkFGZjtBQUdIQyxpQkFBU0EsT0FITjtBQUlIQyw4QkFBcUJBO0FBSmxCLEtBQVA7QUFNSCxDQWhERDtrQkFpRGUseUJBQVEyTyxlQUFSLEVBQXlCQyxpQkFBekIsRUFBNENKLHdCQUE1QyxDOzs7Ozs7O0FDcEpmLGFBQWEsbUJBQU8sQ0FBQyxzQkFBVztBQUNoQzs7QUFFQTs7Ozs7Ozs7O0FDSGE7O0FBRWI7O0FBRUEsbUJBQW1CLG1CQUFPLENBQUMsc0JBQXdCOztBQUVuRDs7QUFFQSxvQkFBb0IsbUJBQU8sQ0FBQyxzQkFBeUI7O0FBRXJEOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3REFBd0QsK0JBQStCO0FBQ3ZGOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEREOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7SUFFcUJPLFE7OztBQUVqQixzQkFBWTlRLEtBQVosRUFBbUJDLE9BQW5CLEVBQTRCO0FBQUE7O0FBQUEsOElBQ2xCRCxLQURrQixFQUNYQyxPQURXOztBQUFBLGNBOEM1QnFQLE9BOUM0QixHQThDbEIsWUFBTTtBQUNaLGFBQUMsQ0FBQyxNQUFLdFAsS0FBTCxDQUFXc1AsT0FBYixJQUF3QixNQUFLdFAsS0FBTCxDQUFXc1AsT0FBWCxFQUF4QjtBQUNBLGdCQUFJeUIsT0FBS2xKLFNBQVNtSixzQkFBVCxDQUFnQyxtQkFBaEMsRUFBcUQsQ0FBckQsQ0FBVDtBQUNBQywrQkFBU0Msc0JBQVQsQ0FBZ0NILElBQWhDO0FBQ0gsU0FsRDJCOztBQUFBLGNBdUQ1QkksZ0JBdkQ0QixHQXVEVCxVQUFDQyxLQUFELEVBQVc7QUFDMUJBLGtCQUFNQyxjQUFOO0FBQ0EsZ0JBQUlOLE9BQUtsSixTQUFTbUosc0JBQVQsQ0FBZ0MsbUJBQWhDLEVBQXFELENBQXJELENBQVQ7QUFDQSxnQkFBRyxDQUFDRCxJQUFKLEVBQ0E7QUFDSSxzQkFBS0EsSUFBTCxHQUFZbEosU0FBU3lKLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWixDQURKLENBQytDO0FBQzNDLHNCQUFLUCxJQUFMLENBQVVRLFNBQVYsR0FBc0IsbUJBQXRCLENBRkosQ0FFK0M7QUFDM0MxSix5QkFBUzBGLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDaUUsV0FBekMsQ0FBcUQsTUFBS1QsSUFBMUQsRUFISixDQUdtRTtBQUNsRTtBQUNELGdCQUFJVSxZQUNBLDhCQUFDLHVCQUFELDZCQUFtQixNQUFLelIsS0FBeEIsSUFBK0IsU0FBUyxNQUFLc1AsT0FBN0MsRUFBc0QsaUJBQWlCLE1BQUtvQyxZQUE1RSxJQURKO0FBR0EsZ0JBQUlDLFdBQVc5SixTQUFTbUosc0JBQVQsQ0FBZ0MsbUJBQWhDLENBQWY7QUFDQUMsK0JBQVNXLE1BQVQsQ0FBZ0JILFNBQWhCLEVBQTJCRSxTQUFTQSxTQUFTblgsTUFBVCxHQUFrQixDQUEzQixDQUEzQjtBQUNILFNBckUyQjs7QUFFeEIsY0FBS2UsS0FBTCxHQUFXO0FBQ1BzVywyQkFBZTtBQURSLFNBQVg7QUFGd0I7QUFLM0I7Ozs7aUNBa0VRO0FBQUE7O0FBQUEseUJBRWEsS0FBSzdSLEtBRmxCO0FBQUEsZ0JBRUE3QyxLQUZBLFVBRUFBLEtBRkE7QUFBQSxnQkFFTWhFLElBRk4sVUFFTUEsSUFGTjs7QUFHTCxnQkFBR2dFLFNBQVFsRixTQUFSLEtBQXNCa0YsTUFBTWpELGFBQU4sSUFBdUJqQyxTQUF2QixJQUFrQ2tGLE1BQU1wQyxHQUFOLElBQVk5QyxTQUFwRSxDQUFILEVBQ0E7QUFDSWtCLHFCQUFLK0IsT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBTW9GLEtBQU4sRUFBYztBQUN2Qix3QkFBSXBGLEtBQUtqQixhQUFMLElBQXNCaUQsTUFBTWpELGFBQTVCLElBQTJDaUIsS0FBS0osR0FBTCxJQUFXb0MsTUFBTXBDLEdBQWhFLEVBQ0k1QixLQUFLb0gsS0FBTCxFQUFZdEYsUUFBWixHQUF1QixJQUF2QixDQURKLEtBRUs7QUFDRDlCLDZCQUFLb0gsS0FBTCxFQUFZdEYsUUFBWixHQUF1QixLQUF2QjtBQUNIO0FBQ0osaUJBTkQ7QUFPSDs7QUFFRCxnQkFBSTZXLFNBQVNDLElBQVQsQ0FBYyxLQUFLL1IsS0FBTCxDQUFXNUMsUUFBekIsTUFBdUMsZ0JBQTNDLEVBQTZEO0FBQ3pELHVCQUNJO0FBQUE7QUFBQTtBQUNLeUQsb0NBQU1tUixRQUFOLENBQWUxUixHQUFmLENBQW1CLEtBQUtOLEtBQUwsQ0FBVzVDLFFBQTlCLEVBQXdDLFVBQUM2VSxLQUFELEVBQVc7O0FBRWhELCtCQUFPcFIsZ0JBQU1xUixZQUFOLENBQW1CRCxLQUFuQixFQUEwQjtBQUM3QnpQLG1DQUFPLE9BQUtqSCxLQUFMLENBQVdzVyxhQURXO0FBRTdCcFAscUNBQVMsT0FBSzBPO0FBRmUseUJBQTFCLENBQVA7QUFJSCxxQkFOQTtBQURMLGlCQURKO0FBV0gsYUFaRCxNQWFLLElBQUksS0FBS25SLEtBQUwsQ0FBVzVDLFFBQVgsSUFBdUJuRixTQUEzQixFQUFzQztBQUN2Qyx1QkFBTzRJLGdCQUFNcVIsWUFBTixDQUFtQixLQUFLbFMsS0FBTCxDQUFXNUMsUUFBOUIsRUFBd0M7QUFDM0NvRiwyQkFBTyxLQUFLeEMsS0FBTCxDQUFXN0MsS0FEeUI7QUFFM0NzRiw2QkFBUyxLQUFLME87QUFGNkIsaUJBQXhDLENBQVA7QUFJSCxhQUxJLE1BTUE7QUFDRCx1QkFBTyxJQUFQO0FBQ0g7QUFDSjs7O2dDQS9FYTtBQUNWLGdCQUFJSixPQUFLbEosU0FBU21KLHNCQUFULENBQWdDLG1CQUFoQyxFQUFxRCxDQUFyRCxDQUFUO0FBQ0EsZ0JBQUcsQ0FBQyxDQUFDRCxJQUFMLEVBQ0E7QUFDSUUsbUNBQVNDLHNCQUFULENBQWdDSCxJQUFoQztBQUNIO0FBRUo7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBUUE7Ozs7Ozs7RUFyRGtDbFEsZ0JBQU1DLFMsVUFTakNDLFMsR0FBWTtBQUNmO0FBQ0EwRyxXQUFPekcsb0JBQVVxUCxNQUZGO0FBR2Y7QUFDQWxYLFVBQU02SCxvQkFBVTZGLEtBQVYsQ0FBZ0IzRixVQUpQO0FBS2Y7QUFDQWYsY0FBVWEsb0JBQVVHLElBTkw7QUFPZjtBQUNBbU8sYUFBU3RPLG9CQUFVRyxJQVJKO0FBU2Y7QUFDQWhFLFdBQU82RCxvQkFBVW1SLE1BVkY7QUFXZjtBQUNBaEMsa0JBQWNuUCxvQkFBVUksSUFaVDtBQWFmO0FBQ0FnUCxpQkFBWXBQLG9CQUFVSSxJQWRQO0FBZWY7QUFDQXNPLHFCQUFnQjFPLG9CQUFVRyxJQWhCWDtBQWlCZjtBQUNBeU8sZUFBVTVPLG9CQUFVcVA7QUFsQkwsQztrQkFURlMsUTs7Ozs7OztBQ1ByQixlQUFlLG1CQUFPLENBQUMsc0JBQWM7QUFDckMsZUFBZSxtQkFBTyxDQUFDLHNCQUFjO0FBQ3JDLDJCQUEyQixtQkFBTyxDQUFDLHNCQUEyQjs7QUFFOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDWGE7QUFDYixjQUFjLG1CQUFPLENBQUMsc0JBQVk7QUFDbEMsYUFBYSxtQkFBTyxDQUFDLHNCQUFXO0FBQ2hDLFVBQVUsbUJBQU8sQ0FBQyxzQkFBUTtBQUMxQixjQUFjLG1CQUFPLENBQUMsc0JBQVk7QUFDbEMsY0FBYyxtQkFBTyxDQUFDLHNCQUFXO0FBQ2pDLGVBQWUsbUJBQU8sQ0FBQyxzQkFBYztBQUNyQyxnQkFBZ0IsbUJBQU8sQ0FBQyxzQkFBZTtBQUN2QyxpQkFBaUIsbUJBQU8sQ0FBQyxzQkFBZ0I7QUFDekMsWUFBWSxtQkFBTyxDQUFDLHNCQUFXO0FBQy9CLHlCQUF5QixtQkFBTyxDQUFDLHNCQUF3QjtBQUN6RCxXQUFXLG1CQUFPLENBQUMsc0JBQVM7QUFDNUIsZ0JBQWdCLG1CQUFPLENBQUMsc0JBQWM7QUFDdEMsaUNBQWlDLG1CQUFPLENBQUMsc0JBQTJCO0FBQ3BFLGNBQWMsbUJBQU8sQ0FBQyxzQkFBWTtBQUNsQyxnQkFBZ0IsbUJBQU8sQ0FBQyxzQkFBZTtBQUN2QyxxQkFBcUIsbUJBQU8sQ0FBQyxzQkFBb0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxFQUFFLG1CQUFPLENBQUMsc0JBQVE7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFlBQVk7QUFDZixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULG1CQUFtQixrQ0FBa0M7QUFDckQsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZUFBZSx1Q0FBdUM7QUFDdEQ7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxrQkFBa0IseUJBQXlCLEtBQUs7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQix3QkFBd0I7QUFDeEIsZ0JBQWdCO0FBQ2hCLG9CQUFvQjtBQUNwQix3QkFBd0I7QUFDeEIsZ0JBQWdCO0FBQ2hCLG9CQUFvQjtBQUNwQjtBQUNBLHVCQUF1QixtQkFBTyxDQUFDLHNCQUFpQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQTBELG9CQUFvQjtBQUM5RSxtQkFBTyxDQUFDLHNCQUFzQjtBQUM5QixtQkFBTyxDQUFDLHNCQUFnQjtBQUN4QixVQUFVLG1CQUFPLENBQUMsc0JBQVM7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGdEQUFnRCxtQkFBTyxDQUFDLHNCQUFnQjtBQUN4RTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiY2h1bmsvU3RvcmVJbmZvbWF0aW9uLjRlZDU0YjRjOGYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NvbW9tUGFyYW0sIGdldCwgcG9zdCwgVXRpbH0gZnJvbSBcIi4vcmVxdWVzdFwiO1xyXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge30gZnJvbSBcIi4vY2FjaGVTdG9yYWdlXCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tIFwiLi4vLi4vc3RvcmUvc3RvcmVcIjtcclxuaW1wb3J0IHtVUERBVEVfU1RPUkVfU1RBVEV9IGZyb20gXCIuLi8uLi9zdG9yZS9hY3Rpb25cIjtcclxuaW1wb3J0IHtjYWNoZUZpcnN0LGNhY2hlRmlyc3RTdG9yYWdlLHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSxyZW1vdmVDYWNoZX0gZnJvbSBcIi4vY2FjaGVTdG9yYWdlXCI7XHJcblxyXG4vKipcclxuICog55Sz6K+357qi5YyF56CB55qE6K+35rGCXHJcbiAqIEBwYXJhbSBwaG9uZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlY21kUmVjb3JkKHBob25lKSB7XHJcbiAgICBpZiAocGhvbmUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcGhvbmUgPSBcIlwiXHJcbiAgICB9XHJcbiAgICBsZXQgcmVjbWRNb2JpbGUgPSBVdGlsLmJhc2U2NEVuY29kZShwaG9uZSlcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnJlY21kUmVjb3JkLCB7cmVjbWRNb2JpbGV9KS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbnlLPor7fnuqLljIXnoIHmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0sKCk9Pnt9LCgpPT57XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbDp0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6K+35rGC57qi5YyF5ZCX6L+e5o6lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2hhcmxpbmsoKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5zaGFyZUxpbmssIHt9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgbGV0IHJlZFVybFN0cj0gXCJodHRwczovL3dhbGxldC45NTUxNi5jb20vcy93bC93ZWJWMy9hY3Rpdml0eS92TWFya2V0aW5nMi9odG1sL3Nuc0luZGV4Lmh0bWw/cj1cIiArIHJlc3BvbnNlLmRhdGEuaWRlbnRpZmllcjtcclxuICAgICAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHJlZFVybFN0clxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShuZXh0U3RhdGUpKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlZFVybFN0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKblnKjnmb3lkI3ljZXnmoTor7fmsYJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0JsYWNrKHVwZGF0ZSkge1xyXG4gICAgbGV0IHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbihyZXNwKXtcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBibGFja1N0OnJlc3AuZGF0YS5ibGFja1N0XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lzQmxhY2s6IHVwZGF0ZeWHveaVsOaJp+ihjOWujOavlScpO1xyXG4gICAgICAgIGlmKCB0eXBlb2YgdXBkYXRlID09PSAnZnVuY3Rpb24nICl7XHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXNwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+ivu+WPlue8k+WtmO+8jOWQjOaXtuW8guatpeWPkemAgeivt+axglxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuaXNCbGFjayx7fSxzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UodXBkYXRlRnVuYykpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGJsYWNrU3Q6cmVzcG9uc2UuZGF0YS5ibGFja1N0XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5piv5ZCm5Zyo6buR5ZCN5Y2V55qE6K+35rGCXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQXBwbHkoKSB7XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IGNhY2hlRmlyc3RTdG9yYWdlKDMwKjYwKjEwMDAsQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5KTsvL+e8k+WtmDMw5YiG6ZKfXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmlzQXBwbHksIHt9LGNhY2hlUGFyYW0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuYXBwbHlTdCAhPSBcIjFcIikge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5aaC5p6c5bey57uP55Sz6K+36L+H57qi5YyF56CB5YiZ57yT5a2YMzDliIbpkp/vvIzlkKbliJnkuI3nvJPlrZhcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleSlcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYXBwbHlTdDpyZXNwb25zZS5kYXRhLmFwcGx5U3RcclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnlLPor7fmlLbmrL7noIFcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWNjKHBhcmFtID0ge1xyXG4gICAgcmVmZXJlZVRlbDogXCJcIiwgICAgICAgICAvL+aOqOiNkOS6uuaJi+acuuWPt1xyXG4gICAgdmlydHVhbENhcmRObzogXCJcIiwgICAgICAvL+iZmuaLn+WNoeWPt1xyXG4gICAgYWNjTm06IFwiXCIsICAgICAgICAgICAgICAvL+W6l+mTuuWQjeensFxyXG4gICAgY2l0eUNkOiBcIlwiICAgICAgICAgICAgICAgLy/ln47luILku6PnoIFcclxufSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuYXBwbHlNY2MsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbnlLPor7fnuqLljIXnoIHmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0sKCk9Pnt9LCgpPT57XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbDp0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE6ZO26KGM5Y2h5YiX6KGoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FyZGxpc3QoKSB7XHJcbiAgICAvL+iOt+WPlueUqOaIt+mTtuihjOWNoeWIl+ihqO+8jOe8k+WtmDHliIbpkp9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TWNjQ2FyZExpc3QsIGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgLy/lpoLmnpzlkI7lj7Dov5Tlm57pk7booYzljaHliJfooajkuJTkuI3kuLrnqbpcclxuICAgICAgICBpZiAoISFyZXNwb25zZS5kYXRhLmNhcmRMaXN0ICYmIHJlc3BvbnNlLmRhdGEuY2FyZExpc3QubGVuZ3RoICE9IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8v5Yid5aeL5YyW6buY6K6k5Y2hXHJcbiAgICAgICAgICAgIGxldCBkZWZhbHV0Q2FyZCA9IHtcclxuICAgICAgICAgICAgICAgIGJhbms6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHmiYDlnKjnmoTpk7booYxcclxuICAgICAgICAgICAgICAgIGNhcmRUeXBlOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeexu+Wei1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb25CaXRtYXA6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h5Yqf6IO95L2NXHJcbiAgICAgICAgICAgICAgICBpY29uUmVsVXJsOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHnmoRsb2dv5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICBpc1N1cHBvcnQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpuaUr+aMgVxyXG4gICAgICAgICAgICAgICAgcGFuOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/luKbmnInmjqnnoIHnmoTljaHlj7dcclxuICAgICAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpumAieS4rVxyXG4gICAgICAgICAgICAgICAgdmlydHVhbENhcmRObzogXCJcIiAgIC8v6Jma5ouf5Y2h5Y+3XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLmNhcmRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghIWl0ZW0uc2VsZWN0ZWQgJiYgaXRlbS5pc1N1cHBvcnQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmFsdXRDYXJkID0gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy/lpoLmnpzmsqHmnInpu5jorqTpgInkuK3nmoTljaHlj5bkuIDkuKrkuI3ooqvnva7kuLrngbDnmoTljaHkuLrpu5jorqTljaFcclxuICAgICAgICAgICAgaWYgKGRlZmFsdXRDYXJkLmJhbmsubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmNhcmRMaXN0W2tdLmlzU3VwcG9ydCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmFsdXRDYXJkID0gcmVzcG9uc2UuZGF0YS5jYXJkTGlzdFtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdG9yZVN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgc3RvcmVSZWNlaXZlQ2FyZE9iajogZGVmYWx1dENhcmQsXHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdDogcmVzcG9uc2UuZGF0YS5jYXJkTGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShzdG9yZVN0YXRlKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5blnLDlnYDliJfooahcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFkZHJMaXN0KFxyXG4gICAgdXBkYXRlLCAvL+e8k+WtmOeahOabtOaWsOWHveaVsFxyXG4gICAgcGFyYW0gPSB7XHJcbiAgICAgICAgc3RhdGU6IFwiXCIgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbikge1xyXG4gICAgLy8g6K+75Y+W57yT5a2Y77yM5ZCM5pe25byC5q2l5Y+R6YCB6K+35rGCXHJcbiAgICBsZXQgdXBkYXRlRnVuYyA9IGZ1bmN0aW9uKHJlc3Ape1xyXG4gICAgICAgIC8vIOWcqHVwZGF0ZeWHveaVsOS4re+8jOabtOaWsHJlZHV45Lit55qEYWRkcmVzc0xpc3RcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe2FkZHJlc3NMaXN0OnJlc3AuZGF0YS5yZXN1bHR8fFtdfSkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRBZGRyTGlzdDogdXBkYXRl5Ye95pWw5omn6KGM5a6M5q+VJyk7XHJcbiAgICAgICAgaWYoIHR5cGVvZiB1cGRhdGUgPT09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgICB1cGRhdGUocmVzcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGNhY2hlUGFyYW0gPSBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UodXBkYXRlRnVuYyxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KTtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEFkZHJMaXN0LCBPYmplY3QuYXNzaWduKHt9LCBjb21vbVBhcmFtLCBwYXJhbSksY2FjaGVQYXJhbSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IGFkZHJlc3NMaXN0ID0gcmVzcG9uc2UuZGF0YS5yZXN1bHQgfHwgW107XHJcblxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGFkZHJlc3NMaXN0XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog55Sz6K+354mp5paZ5o6l5Y+jXHJcbiAqIEBwYXJhbSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1hdChwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3Q6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nianmlpnliJfooahcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxpdk5tOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mlLbotKfkurpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRBbGw6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDljLrlkI3np7BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxpdlBob25lOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mlLbotKfnlLXor51cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aW5jZUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nnIFJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlJZDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W4gklEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Yy6SURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzSW5mbzogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/or6bnu4blnLDlnYBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJycsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDlnYDnmoRJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlObTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aJgOWcqOWfjuW4gkNpdHlDb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkVXJsOiBcIlwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v57qi5YyF56CB5Zyw5Z2AICDlj6/pgInlj4LmlbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmFwcGx5TWF0LCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWVhuaIt+aUtuasvueggeWcsOWdgOWSjOWVhuaIt+e8luWPt1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFFyVXJsUmVzdCgpIHtcclxuICAgIC8v57yT5a2YMuWwj+aXtlxyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRRclVybCwgY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgbWNobnREZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgIHFyVXJsOiByZXNwb25zZS5kYXRhLnFyVXJsLFxyXG4gICAgICAgICAgICAgICAgcXJOdW06IHJlc3BvbnNlLmRhdGEucXJOdW1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICrojrflj5blupfpk7rljLrln5/liJfooajlkozlupfpk7rnsbvlnovliJfooahcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jaG50QW5kQXJlYUluZigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/meS4quaOpeWPoyzlj6rotbBzd++8jOS4jei1sGxvYWNhbFN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgLy8gbGV0IGNhY2hlUGFyYW0gPSB7XHJcbiAgICAvLyAgICAgYnlBamF4OiBmYWxzZSxcclxuICAgIC8vICAgICBmb3JDaHNwOmZhbHNlLFxyXG4gICAgLy8gICAgIGVuY3J5cHQ6ZmFsc2UsXHJcbiAgICAvLyAgICAgY2FjaGU6IHRydWVcclxuICAgIC8vIH1cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TWNobnRBbmRBcmVhSW5mLCBjb21vbVBhcmFtLCBjYWNoZUZpcnN0KDI0KjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGxldCBhcmVhID0gW10sIG1lcmNoYW50VHAgPSBbXTtcclxuXHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDnnIHnuqdcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuYXJlYUFyci5mb3JFYWNoKChwcm92aW5jZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvbmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBwcm92aW5jZS5wcm9JZCxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IHByb3ZpbmNlLnByb05tLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwcm92aW5jZS5wcm9ObSA9PSBcIuWMl+S6rOW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi5LiK5rW35biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLlpKnmtKXluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIumHjeW6huW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi5rex5Zyz5biCXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHByb3ZpbmNlLnByb0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IHByb3ZpbmNlLnByb05tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aW5jZS5jaXR5LmZvckVhY2goKGNpdHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRocmVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBjaXR5LmNpdHlJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogY2l0eS5jaXR5Tm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRocmVlLnZhbHVlICE9IHR3by52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdvLmNoaWxkcmVuLnB1c2godGhyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICog5biC57qnXHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmluY2UuY2l0eS5mb3JFYWNoKChjaXR5KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBjaXR5LmNpdHlJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogY2l0eS5jaXR5Tm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiDljLrnuqdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuYXJlYS5mb3JFYWNoKChhcmVhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRocmVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogYXJlYS5hcmVhSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBhcmVhLmFyZWFObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdvLmNoaWxkcmVuLnB1c2godGhyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25lLmNoaWxkcmVuLnB1c2godHdvKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGFyZWEucHVzaChvbmUpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5tZXJjaGFudFRwQXJyLmZvckVhY2goKG1lclR5cGUxKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb25lID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogbWVyVHlwZTEubWVyY2hhbnRUcENkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogbWVyVHlwZTEubWVyY2hhbnRUcE5tLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBtZXJUeXBlMS5tZXJjaGFudFRwQXJyLmZvckVhY2goKG1lclR5cGUyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtZXJUeXBlMi5tZXJjaGFudFRwQ2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogbWVyVHlwZTIubWVyY2hhbnRUcE5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBtZXJjaGFudFRwLnB1c2gob25lKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHtcclxuICAgICAgICAgICAgbWNobnRBbmRBcmVhSW5mOiB7XHJcbiAgICAgICAgICAgICAgICBhcmVhQXJyOiBhcmVhLFxyXG4gICAgICAgICAgICAgICAgbWVyY2hhbnRUcEFycjogbWVyY2hhbnRUcFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShuZXh0U3RhdGUpKVxyXG5cclxuICAgIH0pXHJcblxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5bqX6ZO66K+m5oOF5L+h5oGvXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jaG50RGV0YWlsKCkge1xyXG4gICAgbGV0IGNhY2hlUGFyYW0gPSBjYWNoZUZpcnN0U3RvcmFnZSg2MCoxMDAwLENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOy8v57yT5a2YMeWIhumSn1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0TWNobnREZXRhaWwsIGNvbW9tUGFyYW0sY2FjaGVQYXJhbSkudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyl7XHJcbiAgICAgICAgICAgIGxldCBtY2hudERldGFpbCA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHttY2hudERldGFpbH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtY2hudERldGFpbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOWNh+e6p+WVhumTuuS6jOe7tOeggVxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBncmFkZU1jYyhwYXJhbT17XHJcbiAgICBzdG9yZU5tOiBcIlwiLCAgICAvL+W6l+mTuuWQjeensFxyXG4gICAgU3RvcmVUcDogXCJcIiwgICAgLy/lupfpk7rnsbvlnotcclxuICAgIHByb3ZDZDogXCJcIiwgICAgIC8v55yBSURcclxuICAgIGNpdHlDZDogXCJcIiwgICAgIC8v5biCSURcclxuICAgIGNvdXR5Q2Q6IFwiXCIsICAgIC8v5Yy6SURcclxuICAgIGFkZHI6IFwiXCIsICAgICAgIC8v5Zyw5Z2AXHJcbiAgICBjZXJ0aWZQaWMxOiBcIlwiLCAvL+i6q+S7veivgeato+mdoueFp1xyXG4gICAgY2VydGlmUGljMjogXCJcIiwgLy/ouqvku73or4Hlj43pnaLnhadcclxuICAgIGNlcnRpZlBpYzM6IFwiXCIsIC8v5omL5oyB6Lqr5Lu96K+B54Wn54mHXHJcbiAgICBsaWNlbnNlUGljOiBcIlwiLCAvL+iQpeS4muaJp+eFp1xyXG4gICAgc2hvcFBpYzE6IFwiXCIsICAgLy/lupfpk7rnhafniYcxXHJcbiAgICBzaG9wUGljMjogXCJcIiwgICAvL+W6l+mTuueFp+eJhzJcclxuICAgIGF1eFByb3ZNYXQxOiBcIlwiLC8v6L6F5Yqp54Wn54mHMVxyXG4gICAgYXV4UHJvdk1hdDI6IFwiXCIsLy/ovoXliqnnhafniYcyXHJcbiAgICBzaG9wTG9nb1BpYzogXCJcIiAvL+W6l+mTukxPR09cclxufSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBncmFkZU1jYywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOW6l+mTuuivpuaDheeahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbljYfnuqfnmoTmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5VcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE5Y2P6K6u57yW5Y+35ZKM5Y2P6K6u5ZCN56ewXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3RvY29sSW5mbygpIHtcclxuICAgIC8qKlxyXG4gICAgICog6L+Z5Liq5o6l5Y+jLOe8k+WtmDLlsI/ml7ZcclxuICAgICAqL1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRQcm90b2NvbEluZm8sIGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UuZGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5Y6G5Y+y5pS25qy+XHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpc3RvcnlJbmNvbWUocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEhpc3RvcnlJbmNvbWUsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnlJbmNvbWVPYmo6IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWOhuWPsuiuouWNlVxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXN0b3J5VHJhbnMocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEhpc3RvcnlUcmFucywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgbGV0IG9yaWdpbkxpc3REYXRhID0gc3RvcmUuZ2V0U3RhdGUoKS5nZXRJbihbJ2hpc3RvcnlPcmRlckxpc3QnXSkudG9KUygpXHJcbiAgICAgICAgICAgIGxldCBuZXdMaXN0ID0gcmVzLmRhdGEudHJhbnNJbmZvO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdMaXN0KVxyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeU9yZGVyTGlzdDogb3JpZ2luTGlzdERhdGEuY29uY2F0KG5ld0xpc3QpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOS7iuaXpeaUtuasvlxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2RheUluY29tZSgpIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRvZGF5SW5jb21lLGNvbW9tUGFyYW0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIHRvZGF5SW5jb21lT2JqOiByZXMuZGF0YVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5LuK5pel6K6i5Y2VXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5VHJhbnMocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRvZGF5VHJhbnMsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5MaXN0RGF0YSA9IHN0b3JlLmdldFN0YXRlKCkuZ2V0SW4oWyd0b2RheU9yZGVyTGlzdCddKS50b0pTKClcclxuICAgICAgICAgICAgbGV0IG5ld0xpc3QgPSByZXMuZGF0YS50cmFuc0luZm87XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICB0b2RheU9yZGVyTGlzdDogb3JpZ2luTGlzdERhdGEuY29uY2F0KG5ld0xpc3QpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWNleeslOafpeivolxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpXHJcbn1cclxuLyoqXHJcbiAqIOiOt+WPlueJqea1geS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2lzdGljc1N0KHBhcmFtKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TG9naXN0aWNzU3QsIE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgbGV0IG5ld09iaiA9IHJlcy5kYXRhLmRlbGl2ZXJ5TXNnO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogbmV3T2JqLm1hdERlbGl2U3RhdHVzIOeahOeKtuaAgeWSjHJlZHV455qEc3RvcmXkv53mjIHkuIDoh7RcclxuICAgICAgICAgICAgICogQHR5cGUgeyp9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBuZXdPYmoubWF0RGVsaXZTdGF0dXMgPSByZXMuZGF0YS5tYXREZWxpdlN0YXR1cztcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIGRlbGl2ZXJ5TXNnOiBuZXdPYmpcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICog5ZWG5oi35pyN5Yqh6aaW6aG1IOeCueWHu+S/oeeUqOWNoeaMiemSruafpeivouWVhuaIt+aYr+WQpuW8gOmAmui/h+S/oeeUqOWNoeaUtuasvlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVwZ3JhZGVTdCgpe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRVcGdyYWRlU3QsIGNvbW9tUGFyYW0pLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W54mp5paZ5Y6G5Y+y6K6i5Y2VXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naXN0aWNzTGlzdChwYXJhbSl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldExvZ2lzdGljc0xpc3QsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOafpeivouS/oeeUqOWNoeaUtuasvuWNh+e6p+eKtuaAgVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEF1ZGl0SW5mbygpe1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0QXVkaXRJbmZvLCBjb21vbVBhcmFtKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5pS25qy+6ZmQ6aKd6K+m5oOFXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGltaXRBdEluZm8oKXtcclxuICAgIC8v57yT5a2YMuS4quWwj+aXtlxyXG4gICAgcG9zdChDT05GSUcuUkVTVC5nZXRMaW1pdEF0SW5mbyxjb21vbVBhcmFtLGNhY2hlRmlyc3RTdG9yYWdlKDIqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3ApPT57XHJcbiAgICAgICAgaWYoIHJlc3Auc3RhdHVzQ29kZSA9IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MgKXtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtsaW1pdEluZm86cmVzcC5kYXRhfSkpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOabtOaWsOW6l+mTuuivpuaDhVxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOW6l+mTuuivpuaDheS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1jaG50T3BlcihwYXJhbSA9e30pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnVwZ3JhZGVNY2MgLCBPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/liKDpmaRtY2hudERldGFpbOe8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOyBcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5Yig6Zmk5Zyw5Z2A5L+h5oGvXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQWRkcmVzcyhwYXJhbT17XHJcbiAgICBpZDonJyAvL+WcsOWdgGlkXHJcbn0pe1xyXG4gICAgXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5kZWxldGVBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpOaUtui0p+WcsOWdgOe8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwYXJhbSk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOabtOaWsOaUtuasvumTtuihjOWNoVxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1jY0NhcmQocGFyYW09e1xyXG4gICAgdmlydHVhbENhcmRObzonJyAvL+iZmuaLn+WNoeWPt1xyXG59KSB7XHJcbiAgICBcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnVwZGF0ZU1jY0NhcmQsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5o2i5Y2h5ZCO77yM5riF6Zmk5bqX6ZO66K+m5oOF57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpOyBcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5paw5aKe5Zyw5Z2AXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+m57uG55qE5Zyw5Z2A5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3QWRkcmVzcyhwYXJhbT17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QubmV3QWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgLy8g5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDkv67mlLnlnLDlnYDkv6Hmga9cclxuICogQHBhcmFtIHsqfSBwYXJhbSDor6bnu4bnmoTlnLDlnYDkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlZGl0QWRkcmVzcyhwYXJhbT17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZWRpdEFkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyl7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog5ZCv5YGc5pS25qy+56CB5pyN5YqhXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWNjT25PZmYocGFyYW09e1xyXG4gICAgaXNVc2VNY2M6JycgIC8v5piv5ZCm5L2/55So5pS25qy+56CB5pyN5YqhXHJcbiB9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5zZXRNY2NPbk9mZixPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/liKDpmaTlupfpk7ror6bmg4XnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTsgXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog6I635Y+W5ZCK6LW35pSv5LuY5o6n5Lu255qEVE7lj7dcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNY2NUcmFuc051bSgpe1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0TWNjVHJhbnNOdW0pLnRoZW4oKHJlc3ApPT57XHJcbiAgICAgICAgaWYoIHJlc3Auc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTICl7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe21jY1RyYW5zTnVtOnJlc3AuZGF0YS50cmFuc051bX0pXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJMaXN0VUwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICBkYXRhOiBQcm9wVHlwZXMuYW55LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIGlzT25seVNob3c6IFByb3BUeXBlcy5ib29sLC8vdHJ1ZSzmiYDmnInnmoTlvIDlj6rmmK/lsZXnpLrvvIzkuI3nlKjmt7vliqDnm7jlupTlh73mlbDvvIzlpoLmnpzmmK9GQUxTRe+8jOimgea3u+WKoOebuOW6lOWHveaVsFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgaXNPbmx5U2hvdzogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDbGljayA9ICh2YWx1ZSA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbXMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBsaXN0SXRlbXMgPSB0aGlzLnByb3BzLmRhdGEubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNPbmx5U2hvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiY2FyZEl0ZW0gXCIga2V5PXtpbmRleH0gPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IGkgY2xhc3NOYW1lPVwiaWNvbiBub09wZXJhdGVJY29uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOiBcInVybCgnaHR0cHM6Ly93YWxsZXQuOTU1MTYuY29tL3Mvd2wvaWNvbi9kZWZhdWx0L1wiICsgaXRlbS5pY29uUmVsVXJsICsgXCInKVwifX0+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1Db250ZW50IG5vT3BlcmF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57aXRlbS5iYW5rICsgaXRlbS5jYXJkVHlwZSArIFwiKFwiICsgaXRlbS5wYW4gKyBcIilcIn08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5vT3BlcmF0ZVwiPuivpemTtuihjOWNoeaaguS4jeaUr+aMgeW9k+WJjeS4muWKoTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImNhcmRJdGVtXCIga2V5PXtpbmRleH0gb25DbGljaz17aXRlbS5zZWxlY3RlZD8oKT0+e306dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIGl0ZW0pfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCBpIGNsYXNzTmFtZT1cImljb25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdodHRwczovL3dhbGxldC45NTUxNi5jb20vcy93bC9pY29uL2RlZmF1bHQvXCIgKyBpdGVtLmljb25SZWxVcmwgKyBcIicpXCJ9fT48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbUNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e2l0ZW0uYmFuayArIGl0ZW0uY2FyZFR5cGUgKyBcIihcIiArIGl0ZW0ucGFuICsgXCIpXCJ9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ISFpdGVtLmFkZFByb3ZpY2UgJiYgKDxzcGFuPntpdGVtLmFkZFByb3ZpY2V9PC9zcGFuPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ISFpdGVtLmFkZFByb3ZpY2UgJiYgIWl0ZW0uc2VsZWN0ZWQgJiYgKDxpIGNsYXNzTmFtZT1cInJpZ2h0QXJyb3dcIj48L2k+KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyEhaXRlbS5zZWxlY3RlZCAmJiAoPGkgY2xhc3NOYW1lPVwiaWNvbi1zZWxlY3RlZFwiPjwvaT4pfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBsaXN0SXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBsaXN0SXRlbSA9IHRoaXMuZ2V0SXRlbXMoKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICB7bGlzdEl0ZW19XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL1Rvb2xzL0NhcmRsaXN0L0Nhckxpc3RVTC5qcyIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIHNhZmUpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzYWZlICYmIHRhcmdldFtrZXldKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qc1xuLy8gbW9kdWxlIGlkID0gMTRkYzFmN2ViZDgwZDE1YmZkMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTY3OTg1MWJlMjdiMjY4ZWEyNGVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDIxZGZhYzI4NTIzYWUzN2RhYzViXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDI1MWJjN2FmZTgxMjdlMDkxNDlkXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOGNmZjg2ZTFkNTFlYmYyMWY3ZlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFwiLi9TdG9yZUluZm9tYXRpb24uc2Nzc1wiXHJcbmltcG9ydCBCdXR0b24gZnJvbSAnYW50ZC1tb2JpbGUvbGliL2J1dHRvbic7XHJcbmltcG9ydCBJbnB1dEl0ZW0gZnJvbSAnYW50ZC1tb2JpbGUvbGliL2lucHV0LWl0ZW0nO1xyXG5pbXBvcnQgQ2FyZExpc3QgZnJvbSBcIi4uL1Rvb2xzL0NhcmRsaXN0L0NhcmRsaXN0XCJcclxuaW1wb3J0IHtyZWdQaG9uZSwgdG9hc3R9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZUluZm9tYXRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tFcnJvciA9IChtc2cpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnYWEnKVxyXG4gICAgICAgIHRvYXN0KG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBsZXQge3N0b3JlbmFtZSwgc3RvcmVSZWNlaXZlQ2FyZE9iaiwgcmVjb21tZW5kUGhvbmUsc2hvd1JlY29tbW9uZFBob25lLFxyXG4gICAgICAgICAgICBjaGFuZ2VTdG9yZU5hbWUsY2FyZExpc3QsaGFuZGxlQ2hhbmdlQ2FyZCxhZGRDYXJkLGNoYW5nZVJlY29tbWVuZFBob25lLGhhbmRsZUNsaWNrfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIGxldCB7ZXJyb3IsZXJyb3IyfT1mYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdG9yZW5hbWUubGVuZ3RoID4gMjApIHtcclxuICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3IgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghIXRoaXMucHJvcHMucmVjb21tZW5kUGhvbmUgJiYgIXJlZ1Bob25lLnRlc3QodGhpcy5wcm9wcy5yZWNvbW1lbmRQaG9uZSkpIHtcclxuICAgICAgICAgICAgZXJyb3IyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVycm9yMiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD1cInNpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGVudFdhcnBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRUaXRsZVwiPuivt+Whq+WGmeaUtuasvuS/oeaBrzwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0b3JlTmFtZSBpbnB1dFdhcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRJdGVtIGNsZWFyIHBsYWNlaG9sZGVyPVwi5pyA5aSaMjDkuKrlrZfnrKZcIiBlcnJvcj17ZXJyb3J9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3N0b3JlbmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHZhbCk9PntjaGFuZ2VTdG9yZU5hbWUodmFsKX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvckNsaWNrPXt0aGlzLmNsaWNrRXJyb3IuYmluZCh0aGlzLCBcIuaCqOi+k+WFpeeahOW6l+mTuuWQjeensOi/h+mVv1wiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPuW6l+mTuuWQjeensDwvSW5wdXRJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpcHMtd2FycC1kaXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwidGlwc0ljb25cIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOivpeWQjeensOWwhuWxleekuuWcqOmhvuWuoueahOS7mOasvumhtemdolxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8Q2FyZExpc3QgYWRkU2VuZU5vPXtcIjEwMDIwXCJ9IGRhdGE9e2NhcmRMaXN0fSB2YWx1ZT17c3RvcmVSZWNlaXZlQ2FyZE9ian1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGF2ZUFkZENhcmQ9e3RydWV9IGFkZENhcmRDYWxsYmFjaz17YWRkQ2FyZH0gdGl0bGU9eyfpgInmi6nmlLbmrL7pk7booYzljaEnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlQ2FyZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxTaG93U2VsZWN0ZWRDYXJkPjwvU2hvd1NlbGVjdGVkQ2FyZD5cclxuICAgICAgICAgICAgICAgICAgICA8L0NhcmRMaXN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGlwcy13YXJwLWRpdlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJ0aXBzSWNvblwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg6ZyA5re75Yqg5pys5Lq65YKo6JOE5Y2h77yM5pS25qy+56CB55qE6ZKx5bCG55u05o6l5omT5Yiw6K+l5Y2h5LitXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAhIXNob3dSZWNvbW1vbmRQaG9uZSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWNvbW1lbmQgaW5wdXRXYXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0SXRlbSBjbGVhciBwbGFjZWhvbGRlcj1cIuaOqOiNkOS6uuaJi+acuuWPt1wiIGVycm9yPXtlcnJvcjJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3JlY29tbWVuZFBob25lfSBvbkNoYW5nZT17Y2hhbmdlUmVjb21tZW5kUGhvbmV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvckNsaWNrPXt0aGlzLmNsaWNrRXJyb3IuYmluZCh0aGlzLCBcIuivt+i+k+WFpeWQiOazleeahOaJi+acuuWPt1wiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPuaJi+acuuWPtzwvSW5wdXRJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGlwcy13YXJwLWRpdlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJ0aXBzSWNvblwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg6K+36L6T5YWl5o6o6I2Q5Lq65omL5py65Y+377yM6Z2e5b+F5aGrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pdC13YXJwLWJ1dHRvblwiIHN0eWxlPXt7cGFkZGluZ0xlZnQ6IDAsIHBhZGRpbmdSaWdodDogMH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVDbGlja30+5LiL5LiA5q2lPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgU2hvd1NlbGVjdGVkQ2FyZCA9IHByb3BzID0+IHtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIHshIXByb3BzLmV4dHJhLmljb25SZWxVcmwgPyAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbmtDYXJkLXNlbGVjdG9yLWRpdlwiIG9uQ2xpY2s9e3Byb3BzLm9uQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImJhbmtJY29uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2JhY2tncm91bmRJbWFnZTogXCJ1cmwoJ2h0dHBzOi8vd2FsbGV0Ljk1NTE2LmNvbS9zL3dsL2ljb24vZGVmYXVsdC9cIiArIHByb3BzLmV4dHJhLmljb25SZWxVcmwgKyBcIicpXCJ9fT48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmFua05hbWVcIj57cHJvcHMuZXh0cmEuYmFuayArIHByb3BzLmV4dHJhLmNhcmRUeXBlICsgXCIoXCIgKyBwcm9wcy5leHRyYS5wYW4gKyBcIilcIn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwicmlnaHRBcnJvd1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5rQ2FyZC1zZWxlY3Rvci1kaXZcIiBvbkNsaWNrPXtwcm9wcy5vbkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiYW5rTmFtZSBncmF5XCIgc3R5bGU9e3t0ZXh0QWxpZ246IFwiY2VudGVyXCJ9fT7ngrnlh7vmraTlpITpgInmi6nmgqjnmoTpk7booYzljaE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwicmlnaHRBcnJvd1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9TdG9yZUluZm9tYXRpb24vU3RvcmVJbmZvbWF0aW9uLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDNjMjRkMzhmZmNkMGMzOGUzNDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcInNpXCI6XCJzaVwiLFwiaGVhZFRpdGxlXCI6XCJoZWFkVGl0bGVcIixcInN0b3JlTmFtZVwiOlwic3RvcmVOYW1lXCIsXCJyZWNvbW1lbmRcIjpcInJlY29tbWVuZFwiLFwiYmFua0NhcmQtc2VsZWN0b3ItZGl2XCI6XCJiYW5rQ2FyZC1zZWxlY3Rvci1kaXZcIixcImJhbmtJY29uXCI6XCJiYW5rSWNvblwiLFwiYmFua05hbWVcIjpcImJhbmtOYW1lXCIsXCJncmF5XCI6XCJncmF5XCIsXCJpbm5lclwiOlwiaW5uZXJcIn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9TdG9yZUluZm9tYXRpb24vU3RvcmVJbmZvbWF0aW9uLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQwMTRhYTA1ZTYzMGQyZjQ1OTExXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBDT05GSUcgZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL2NvbmZpZ1wiO1xyXG5cclxuaW1wb3J0IE1vZGFsIGZyb20gJ2FudGQtbW9iaWxlL2xpYi9tb2RhbCc7XHJcbmltcG9ydCB7bWNjU3RhdGVDaGFuZ2VkfSBmcm9tICcuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0JztcclxuLy8gaW1wb3J0IHN0b3JlIGZyb20gJy4uLy4uL3N0b3JlL3N0b3JlJ1xyXG4vLyBpbXBvcnQge1VQREFURV9TVE9SRV9TVEFURX0gZnJvbSBcIi4uLy4uL3N0b3JlL2FjdGlvblwiO1xyXG5pbXBvcnQge2FwcGx5TWNjLCBpc0FwcGx5LCBpc0JsYWNrfSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdEFQSVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDnlLPor7fmlLbmrL7noIFcclxuICogQHBhcmFtIGhpc3Rvcnkgcm91dGVy5Lit55qEaGlzdG9yeVxyXG4gKiBAcGFyYW0gcGFyYW0gICDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1jY0NvZGUoaGlzdG9yeSwgcGFyYW0pIHtcclxuICAgIGFwcGx5TWNjKHBhcmFtKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgLy/pgJrnn6XlrqLmiLfnq6/kv67mlLnnirbmgIFcclxuICAgICAgICAgICAgbWNjU3RhdGVDaGFuZ2VkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAocmVzcG9uc2UuZGF0YS5yZWRDb2RlU3QgPT0gXCIwMFwiIHx8IHJlc3BvbnNlLmRhdGEucmVkQ29kZVN0ID09IFwiMDJcIikge1xyXG4gICAgICAgICAgICAvLyAgICAgLy/lpoLmnpznlKjmiLfmnKrnlLPor7fnuqLljIXnoIHmiJbogIXkuI3lho3pu5HlkI3ljZXliJnorqnnlKjmiLfljrvnlLPor7fnuqLljIXnoIHlkozmlLbmrL7noIFcclxuICAgICAgICAgICAgLy8gICAgIGhpc3RvcnkucHVzaCh7cGF0aG5hbWU6IFwiL2FwcGx5Q29tbWRpdHlPZlJlZEJhZy9zdG9yZUluZm9cIn0pXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAvL+WQpuWImeeUqOaIt+WPquWPr+S7peeUs+ivt+aUtuasvueggVxyXG4gICAgICAgICAgICAvLyAgICAgaGlzdG9yeS5wdXNoKHtwYXRobmFtZTogXCIvYXBwbHlDb21tZGl0eS9zdG9yZUluZm9cIn0pXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKCEhcmVzcG9uc2UuZGF0YS5yZWRDb2RlU3Qpe1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogXCIvYXBwbHlDb21tZGl0eS9zdG9yZUluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2g6XCI/cmVkQ29kZVN0PVwiK3Jlc3BvbnNlLmRhdGEucmVkQ29kZVN0XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBcIi9hcHBseUNvbW1kaXR5L3N0b3JlSW5mb1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgTW9kYWwuYWxlcnQoJ+eUs+ivt+Wksei0pScsIHJlc3BvbnNlLm1zZywgW3tcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfnoa7orqQnLCBvblByZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKTlrprmmK/lkKbmmL7npLrmjqjojZDkurrmiYvmnLrlj7fnmoTovpPlhaXmoYZcclxuICovXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBpc1Nob3dSZWNvbW1vbmRQaG9uZSgpIHtcclxuLy8gICAgIGlzQmxhY2soKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwi5Yik5a6a5piv5ZCm5Zyo6buR5ZCN5Y2V77yaXCIgKyByZXNwb25zZS5kYXRhLmJsYWNrU3QpXHJcbi8vICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4vLyAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5ibGFja1N0ID09IFwiMVwiKSB7XHJcbi8vICAgICAgICAgICAgICAgICAvL+WcqOm7keWQjeWNleS4reWImeS4jeaYvuekuuaOqOiNkOS6uuaJi+acuuWPt+eahOi+k+WFpeahhlxyXG4vLyAgICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBzaG93UmVjb21tb25kUGhvbmU6IGZhbHNlXHJcbi8vICAgICAgICAgICAgICAgICB9KSlcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIC8v5qC55o2u5piv5ZCm55Sz6K+36L+H57qi5YyF56CB5Yik5a6a5piv5ZCm5pi+56S65o6o6I2Q5Lq65omL5py65Y+355qE6L6T5YWl5qGGXHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gaXNBcHBseSgpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuWIpOWumuaYr+WQpuW3sue7j+eUs+ivt+e6ouWMheegge+8mlwiICsgcmVzcG9uc2UuZGF0YS5hcHBseVN0KVxyXG4vLyAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuLy8gICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuYXBwbHlTdCA9PSBcIjFcIikge1xyXG4vLyAgICAgICAgICAgICAgICAgLy/lt7Lnu4/nlLPor7fnuqLljIXnoIFcclxuLy8gICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgc2hvd1JlY29tbW9uZFBob25lOiBmYWxzZVxyXG4vLyAgICAgICAgICAgICAgICAgfSkpXHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAvL+acqueUs+ivt+e6ouWMheeggVxyXG4vLyAgICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBzaG93UmVjb21tb25kUGhvbmU6IHRydWVcclxuLy8gICAgICAgICAgICAgICAgIH0pKVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSlcclxuLy8gfVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvU3RvcmVJbmZvbWF0aW9uL1N0b3JlSW5mb21hdGlvbkFjdGlvbnMuanMiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNTNiN2QzNDgxNzE0NGIxMmIwYWFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDVlNTliNzFiMzNhMzhjMzYxOGU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1ZTc0OTFmMWY3OTk3MTVlYWM3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDZhNDQyYWI1YmQ5YmQ5Mjk0NDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8qXHJcbiAgIEFQSSDmjqXlj6PphY3nva5cclxuICAgYXhpb3Mg5Y+C6ICD5paH5qGj77yaaHR0cHM6Ly93d3cua2FuY2xvdWQuY24veXVueWUvYXhpb3MvMjM0ODQ1XHJcblxyXG4qL1xyXG4vLyBpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnYW50ZC1tb2JpbGUvbGliL3RvYXN0JztcclxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnXCJcclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKlxyXG4qIOW4uOmHj+WumuS5ieWMulxyXG4qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBjb25zdCBVdGlsID0gd2luZG93LlVQLlcuVXRpbDtcclxuXHJcbmV4cG9ydCBjb25zdCBBcHAgPSBVUC5XLkFwcDtcclxuXHJcbmV4cG9ydCBjb25zdCBFbnYgPSBVUC5XLkVudjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGhvbmUgPSAvXigxM1swLTldfDE0WzU3OV18MTVbMC0zLDUtOV18MTZbNl18MTdbMDEzNTY3OF18MThbMC05XXwxOVs4OV0pXFxkezh9JC87XHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGF5TnVtID0gL15bMC05XXsyMH0kLztcclxuXHJcbmV4cG9ydCBjb25zdCBjb21vbVBhcmFtID0ge1xyXG4gICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgIHNvdXJjZTogXCIyXCJcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiDor7fmsYLmoLjlv4PljLog5LiL6Z2i6L+Z5Z2X5Yy65Z+f5Lit55qE5Luj56CB5pS55Yqo6K+35oWO6YeNXHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5sZXQgYmFzZVVybCA9IFwiXCIsIGJhc2VVcmwyID0gXCJcIiwgYmFzZVVybDMgPSBcIlwiO1xyXG5pZiAobG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignOTU1MTYuY29tJykgIT09IC0xKSB7IC8v55Sf5Lqn546v5aKDXHJcbiAgICBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vc2hhbmdodS45NTUxNi5jb20vd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDIgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9tYWxsLjk1NTE2LmNvbS9jcXAtaW50LW1hbGwtd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICBiYXNlVXJsMyA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL3lvdWh1aS45NTUxNi5jb20veW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2UgaWYgKGxvY2F0aW9uLmhvc3RuYW1lLmluZGV4T2YoJzE3Mi4xOC4xNzkuMTAnKSAhPT0gLTEpIHsgLy/mtYvor5Xnjq/looNcclxuICAgIC8vIGJhc2VVcmw9XCJodHRwOi8vMTcyLjIxLjEwMS4yNTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7IC8v5rWL6K+V5a6kYXBhY2hlXHJcbiAgICAvL2Jhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjk1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+W8gOWPkeeOr+Wig2FwYWNoZVxyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4xMzMuMjU6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2Uge1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuOTU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuMjU6MzgyMTAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMTMzLjI1OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjMzLjU2OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufVxyXG4vKipcclxuICog6YCa6L+H5ZCO57yA6I635Y+W5pyN5Yqh5Zmo55qE5YWo5Zyw5Z2AXHJcbiAqIEBwYXJhbSB1cmxcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZXJ2VXJsID0gKHVybCkgPT4ge1xyXG4gICAgbGV0IHNlcnZlclVybCA9IFwiXCJcclxuICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QudXNlckluZm8pIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgLy8gZWxzZSBpZiAodXJsLnNwbGl0KFwiL1wiKVswXSA9PSBcImFkZHJlc3NcIikge1xyXG4gICAgLy8gICAgIHNlcnZlclVybCA9IGJhc2VVcmwyXHJcbiAgICAvLyB9XHJcbiAgICBlbHNlIGlmICh1cmwuc3BsaXQoXCIvXCIpWzBdID09IFwic2NhblwiIHx8IHVybCA9PSBDT05GSUcuUkVTVC5nZXRDaXR5KSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gYmFzZVVybDNcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHNlcnZlclVybCA9IGJhc2VVcmxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VydmVyVXJsO1xyXG59XHJcblxyXG4vKipcclxuICog5qC85byP5YyW57uT5p6cIOWwhue7k+aenOagvOW8j+WMluS4ulxyXG4gKiB7XHJcbiAqICAgICBzdGF0dXNDb2RlICAg5ZCO5Y+w5ZON5bqU56CBXHJcbiAqICAgICBkYXRhICAgICAgICAg5ZCO5Y+w6L+U5Zue55qE5pWw5o2uXHJcbiAqICAgICBtc2cgICAgICAgICAg5ZCO5Y+w55qE5o+Q56S65L+h5oGvXHJcbiAqIH1cclxuICogQHBhcmFtIGRhdGFcclxuICogQHJldHVybnMge3tzdGF0dXNDb2RlOiAoc3RyaW5nfCopLCBkYXRhOiAqLCBtc2c6ICp9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlRm9ybWF0dGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCByZXMgPSB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5yZXNwLFxyXG4gICAgICAgIGRhdGE6IGRhdGEucGFyYW1zLFxyXG4gICAgICAgIG1zZzogZGF0YS5tc2dcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vLyDliKDpmaTlupXpg6ggJy8nXHJcbmZ1bmN0aW9uIGRlbGV0ZVNsYXNoKGhvc3QpIHtcclxuICAgIHJldHVybiBob3N0LnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbn1cclxuXHJcbi8vIOa3u+WKoOWktOmDqCAnLydcclxuZnVuY3Rpb24gYWRkU2xhc2gocGF0aCkge1xyXG4gICAgcmV0dXJuIC9eXFwvLy50ZXN0KHBhdGgpID8gcGF0aCA6IGAvJHtwYXRofWA7XHJcbn1cclxuXHJcbi8vIOino+aekOWPguaVsFxyXG5mdW5jdGlvbiBzZXBhcmF0ZVBhcmFtcyh1cmwpIHtcclxuICAgIGNvbnN0IFtwYXRoID0gJycsIHBhcmFtc0xpbmUgPSAnJ10gPSB1cmwuc3BsaXQoJz8nKTtcclxuXHJcbiAgICBsZXQgcGFyYW1zID0ge307XHJcblxyXG4gICAgcGFyYW1zTGluZS5zcGxpdCgnJicpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gaXRlbS5zcGxpdCgnPScpO1xyXG5cclxuICAgICAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtwYXRoLCBwYXJhbXN9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZyl7XHJcbiAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge319ID0gY29uZmlnO1xyXG4gICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4gICAgbGV0IHNlcnZlclVybCA9ICdodHRwOi8vMTI3LjAuMC4xOjMwMDAvJztcclxuICAgIGxldCBmaW5hbFVybCA9IHNlcnZlclVybCArIHVybDtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHVybDpmaW5hbFVybCxcclxuICAgICAgICAgICAgdHlwZTptZXRob2QsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAnMjAwJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZUZvcm1hdHRlcihyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcign6K+35rGC5aSx6LSlJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYoIG1ldGhvZCA9PT0gJ1BPU1QnICl7XHJcbiAgICAgICAgICAgICBvcHRpb25zLmRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgIG9wdGlvbnMuZGF0YVR5cGUgPSAnanNvbidcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgob3B0aW9ucyk7XHJcbiAgICB9KVxyXG4gICAgXHJcbn1cclxuXHJcbi8vIOS4u+imgeivt+axguaWueazlVxyXG4vLyBleHBvcnQgIGZ1bmN0aW9uIHJlcXVlc3RPcmlnaW4oY29uZmlnKSB7XHJcblxyXG4vLyAgICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbi8vICAgICBjb25zdCB1aSA9IFVQLlcuVUk7XHJcbi8vICAgICBjb25zdCBlbnYgPSBVUC5XLkVudjtcclxuXHJcbi8vICAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge30sIGhlYWRlcnMsIGZvckNoc3AsIGVuY3J5cHQsIGJ5QWpheCwgY2FjaGUsIHVwZGF0ZSwgc3RvcmFnZX0gPSBjb25maWc7XHJcblxyXG4vLyAgICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4vLyAgICAgbGV0IHNlcnZlclVybCA9IGdldFNlcnZVcmwodXJsKTtcclxuXHJcbi8vICAgICAvLyBsZXQgc2VydmVyVXJsID0gYmFzZVVybCA7XHJcbi8vICAgICAvLyBpZiAodHJ1ZSkge1xyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4fmj5Lku7blj5HpgIHor7fmsYJcclxuLy8gICAgICAqL1xyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKiBAcGFyYW0gcGFyYW1zIOivt+axguWPguaVsFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB2ZXJzaW9u77ya54mI5pys77yM6buY6K6k5pivMS4wXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHNvdXJjZe+8muadpea6kO+8jOm7mOiupOagueaNrkFuZHJvaWTjgIFpT1Poh6rliqjmt7vliqBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgZW5jcnlwdO+8muaYr+WQpuWKoOWvhu+8jOm7mOiupOWKoOWvhlxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBtZXRob2TvvJror7fmsYLmlrnms5XvvIxQT1NU5oiWR0VUXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIGNtZO+8muivt+axguWRveS7pO+8iOS5n+WPr+iHquihjOWwhmNtZOe7hOijheiHs3VyaVvkvJjmg6DlkI7lj7Bd5oiWcGF0aFvpkrHljIXlkI7lj7Bd77yJXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHVyaS9wYXRo77ya6K+35rGC5Zyw5Z2A77yM5bu66K6u5LuF5aGr5YWFY21k77yM5LiN5bu66K6u6Ieq6KGM57uE6KOFdXJpL3BhdGhcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgcGFyYW1z77ya5Y+R6YCB57uZ5ZCO5Y+w55qE5Y+C5pWwXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHZpZO+8muWmguaenOmAmui/h0FqYXjmlrnlvI/lkJF3YWxsZXTlkI7lj7Dlj5HpgIHor7fmsYLpnIDopoHmkLrluKZ2aWRcclxuLy8gICAgICAqIEBwYXJhbSBmb3JDaHNwIOaYr+WQpuWQkeS8mOaDoOWQjuWPsOWPkemAgeivt+axgu+8iOm7mOiupOWQkeaJi+acuuWQjuWPsOWPkemAgeivt+axgu+8iVxyXG4vLyAgICAgICogQHBhcmFtIGJ5QWpheCDmmK/lkKbkvb/nlKhBamF45Y+R6YCB6K+35rGC77yI6buY6K6k5L2/55So5o6n5Lu277yJXHJcbi8vICAgICAgKiBAcGFyYW0gc3VjY2VzcyDmiJDlip/lm57osINcclxuLy8gICAgICAqIEBwYXJhbSBlcnJvciDplJnor6/lm57osIPvvIjkuJrliqHplJnor6/vvIlcclxuLy8gICAgICAqIEBwYXJhbSBmYWlsIOWksei0peWbnuiwg++8iOivt+axguWksei0pe+8iVxyXG4vLyAgICAgICovXHJcbi8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4vLyAgICAgICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuXHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgc3VjY2Vzc0NhbGxiYWNrID0gKGRhdGEsZnVjKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuaIkOWKn+e7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuLy8gICAgICAgICAgICAgICAgIGxldCByZXEgPSByZXNwb25zZUZvcm1hdHRlcihkYXRhKTtcclxuLy8gICAgICAgICAgICAgICAgIGlmKCAhIWZ1YyApe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlcS5mdWMgPSBmdWM7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcSlcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGVycm9yQ2FsbGJhY2sgPSAoZXJyKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuWksei0pee7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QuYXBwbHlNY2MgfHwgdXJsID09IENPTkZJRy5SRVNULmFwcGx5TWF0IHx8IHVybCA9PSBDT05GSUcuUkVTVC50b2RheU1vbmV5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJlc3BvbnNlRm9ybWF0dGVyKGVycik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXEpXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBUb2FzdC5pbmZvKGVyci5tc2cgfHwgJ+afpeivouS4muWKoeimgee0oOWHuumUme+8jOivt+eojeWQjuWGjeivle+8gScpO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgbmV0d29ya0NhbGxiYWNrID0gKHhocikgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgVG9hc3QuaW5mbyh4aHIubXNnKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuXHJcbi8vICAgICAgICAgICAgIGlmICh1cmwgIT0gQ09ORklHLlJFU1QuZ2V0VG9kYXlJbmNvbWUpIHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLnNob3dMb2FkaW5nKCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGlmICghY2FjaGUpIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJQYXJhbTpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHtcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgZW5jcnlwdDogZW5jcnlwdCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBmb3JDaHNwOiBmb3JDaHNwLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGJ5QWpheDogYnlBamF4XHJcbi8vICAgICAgICAgICAgICAgICAvLyB9KVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHpnZ7nvJPlrZjor7fmsYJcIilcclxuLy8gICAgICAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZShcclxuLy8gICAgICAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cmk6c2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjayk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNhY2hlVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdG9yZWFnZeetlueVpeaYrzpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2UpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInVwZGF0ZeWHveaVsDpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVwZGF0ZSlcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB57yT5a2Y6K+35rGCXCIpXHJcbi8vICAgICAgICAgICAgICAgICAvKipcclxuLy8gICAgICAgICAgICAgICAgICAqIOWQkeacjeWKoeWZqOWPkemAgeivt+axglxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHBhcmFtcyDor7fmsYLlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmVyc2lvbu+8mueJiOacrO+8jOm7mOiupOaYrzEuMFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzb3VyY2XvvJrmnaXmupDvvIzpu5jorqTmoLnmja5BbmRyb2lk44CBaU9T6Ieq5Yqo5re75YqgXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuY3J5cHTvvJrmmK/lkKbliqDlr4bvvIzpu5jorqTliqDlr4ZcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbWV0aG9k77ya6K+35rGC5pa55rOV77yMUE9TVOaIlkdFVFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBjbWTvvJror7fmsYLlkb3ku6TvvIjkuZ/lj6/oh6rooYzlsIZjbWTnu4Too4Xoh7N1cmlb5LyY5oOg5ZCO5Y+wXeaIlnBhdGhb6ZKx5YyF5ZCO5Y+wXe+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB1cmkvcGF0aO+8muivt+axguWcsOWdgO+8jOW7uuiuruS7heWhq+WFhWNtZO+8jOS4jeW7uuiuruiHquihjOe7hOijhXVyaS9wYXRoXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHBhcmFtc++8muWPkemAgee7meWQjuWPsOeahOWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2aWTvvJrlpoLmnpzpgJrov4dBamF45pa55byP5ZCRd2FsbGV05ZCO5Y+w5Y+R6YCB6K+35rGC6ZyA6KaB5pC65bimdmlkXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZm9yQ2hzcCDmmK/lkKblkJHkvJjmg6DlkI7lj7Dlj5HpgIHor7fmsYLvvIjpu5jorqTlkJHmiYvmnLrlkI7lj7Dlj5HpgIHor7fmsYLvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBieUFqYXgg5piv5ZCm5L2/55SoQWpheOWPkemAgeivt+axgu+8iOm7mOiupOS9v+eUqOaOp+S7tu+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3Mg5oiQ5Yqf5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZXJyb3Ig6ZSZ6K+v5Zue6LCD77yI5Lia5Yqh6ZSZ6K+v77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZmFpbCDlpLHotKXlm57osIPvvIjor7fmsYLlpLHotKXvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSB1cGRhdGUg5byC5q2l5Yi35paw5Zue6LCDIOWmguaenOiuvue9rmFzeW5j5Li6dHJ1ZeWQjuWPr+S7pea3u+WKoHVwZGF0ZeWbnuiwgyDlpoLmnpzkuI3loavlhpnpu5jorqTku6VzdWNjZXNz6L+b6KGM5aSE55CGXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gc3RvcmFnZSDnvJPlrZjlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbmVlZFN3ICAgICAgICAgICAgLy/pu5jorqRmYWxzZeWkp+mDqOWIhueUqOeahOaYr+aPkuS7tumcgOimgeeahOaJi+WKqOWOu+WKoFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzdG9yYWdlVHlwZSAgICAgIC8v6buY6K6k5L2/55SobG9jYWxzdG9yYWdlXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGFzeW5jICAgICAgICAgICAgLy/pu5jorqTojrflj5bnvJPlrZjlkI7kuI3lj5Hor7fmsYLvvIzmlLnkuLp0cnVl5ZCO5Lya5byC5q2l5Y676K+35rGC5ZCO5Y+w5bm25Yi35paw5pWw5o2uXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuZE9mU3luY0Z1bmMgICAgLy90b2RvIOmHjeimge+8ge+8ge+8ge+8geWbnuiwg+S4reWmguaenOWtmOWcqOW8guatpe+8iOaPkuS7tuetie+8iemcgOimgeagh+aYjuW8guatpeeKtuaAgeS4unRydWVcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmFsaWRhdGVUaW1lICAgICAvL+acieaViOacn+m7mOiupOaXoOmZkOacieaViOacnyDljZXkvY3mr6vnp5JcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVdpdGhJZCAgICAgICAvL+m7mOiupHRydWXku6XnlKjmiLdpZOi/m+ihjOWtmOWCqOWQpuWImWZhbHNl5LulbG9jYWzlrZjlgqhcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVN1Y2MgICAgICAgICAvL+S/neWtmOaIkOWKn+WQjueahOWbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlRXJyICAgICAgICAgIC8v5L+d5a2Y5aSx6LSl5ZCO55qE5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHJvbGxLZXkgICAgICAgICAgLy/lvLrliLborr7nva7kuLvplK5cclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2Vjb25kS2V5ICAgICAgICAvL+W8uuWItuiuvue9ruasoeimgemUruWAvFxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g6YeN6KaB6K+05piOIOiwg+eUqOW8guatpeaooeW8j++8iGFzeW5j6K6+572u5Li6dHJ1Ze+8ieWQjuWPr+iDveWcqHN1Y2Nlc3Plm57osIPph4zlrZjlnKjlvILmraXmk43kvZzvvIzor6Xmg4XlhrXkuIvlm57lr7zoh7TnvJPlrZjnmoTlm57osIPlj6/og71cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOacquaJp+ihjOWujOaIkO+8jOivt+axgueahOWbnuiwg+WPiOW8gOWni+aJp+ihjOS6hueahOaDheWGte+8jOaJgOS7peaIkeS7rOe7n+S4gOWcqHN1Y2Nlc3Plm57osIPlkox1cGRhdGXlm57osIPnmoTlhaXlj4Llop7liqDkuobnrKzkuozkuKrlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOeUqOS6juWFvOWuueWbnuiwg+WGheWMheWQq+W8guatpeeahOeKtuWGte+8jOS9v+eUqOaWueazleS4uu+8mummluWFiOiuvue9rmVuZE9mU3luY0Z1bmPlj4LmlbDkuLp0cnVlLOWFtuasoXN1Y2Nlc3Plkox1cGRhdGXlm55cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOiwg+WGheS8muaciTLkuKrlhaXlj4LvvIxzdWNjZXNz77yIcmVzcO+8jGZ1Y++8ie+8jOivt+WcqOS7o+eggemXreWMheWkhOS9v+eUqGZ1Yy5lbmRPZkZ1bmMoKVxyXG4vLyAgICAgICAgICAgICAgICAgICovXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHBhcmFtID0ge31cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGJ5QWpheCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogXCJsaWZlL2xpZmVcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXJpOnNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2VXaXRoU3RvcmFnZShwYXJhbSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjaywgc3RvcmFnZSwgdXBkYXRlKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICB9KVxyXG4vLyAgICAgfSlcclxuXHJcblxyXG4vLyAgICAgLy8gfVxyXG4vLyAgICAgLy8gZWxzZSB7XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4dBamF4IOWPkemAgeivt+axglxyXG4vLyAgICAgICovXHJcbi8vICAgICAvLyByZXR1cm4gYXhpb3Moe1xyXG4vLyAgICAgLy8gICAgIHVybDogYmFzZVVybCArIHVybCxcclxuLy8gICAgIC8vICAgICBtZXRob2QsXHJcbi8vICAgICAvLyAgICAgaGVhZGVycyxcclxuLy8gICAgIC8vICAgICBkYXRhOiBtZXRob2QgPT09ICdHRVQnID8gdW5kZWZpbmVkIDogZGF0YSxcclxuLy8gICAgIC8vICAgICBwYXJhbXM6IE9iamVjdC5hc3NpZ24obWV0aG9kID09PSAnR0VUJyA/IGRhdGEgOiB7fSwgcGFyYW1zKVxyXG4vLyAgICAgLy8gfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gICAgIC8vXHJcbi8vICAgICAvLyAgICAgbGV0IHJlcSA9IHtcclxuLy8gICAgIC8vICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2UuZGF0YS5yZXNwLFxyXG4vLyAgICAgLy8gICAgICAgICBkYXRhOiByZXNwb25zZS5kYXRhLnBhcmFtc1xyXG4vLyAgICAgLy8gICAgIH1cclxuLy8gICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcSlcclxuLy8gICAgIC8vIH0pLmNhdGNoKGVyciA9PiB7XHJcbi8vICAgICAvLyAgICAgLy8g6K+35rGC5Ye66ZSZXHJcbi8vICAgICAvLyAgICAgVG9hc3QuaW5mbygncmVxdWVzdCBlcnJvciwgSFRUUCBDT0RFOiAnICsgZXJyLnJlc3BvbnNlLnN0YXR1cyk7XHJcbi8vICAgICAvLyAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XHJcbi8vICAgICAvLyB9KTtcclxuLy8gICAgIC8vIH1cclxuXHJcbi8vIH1cclxuXHJcbi8vIOS4gOS6m+W4uOeUqOeahOivt+axguaWueazlVxyXG5leHBvcnQgY29uc3QgZ2V0ID0gKHVybCwgZGF0YSwgcGFyYW0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IHBhcmFtQWxsID0gT2JqZWN0LmFzc2lnbih7Zm9yQ2hzcDogdHJ1ZSwgZW5jcnlwdDogdHJ1ZSwgY2FjaGU6IGZhbHNlLCBieUFqYXg6IGZhbHNlfSwgcGFyYW0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QoT2JqZWN0LmFzc2lnbih7dXJsLCBkYXRhfSwgcGFyYW1BbGwpKVxyXG59O1xyXG5leHBvcnQgY29uc3QgcG9zdCA9ICh1cmwsIGRhdGEsIHBhcmFtID0ge30pID0+IHtcclxuICAgIGxldCBwYXJhbUFsbCA9IE9iamVjdC5hc3NpZ24oe2ZvckNoc3A6IHRydWUsIGVuY3J5cHQ6IHRydWUsIGNhY2hlOiBmYWxzZSwgYnlBamF4OiBmYWxzZX0sIHBhcmFtKTtcclxuICAgIHJldHVybiByZXF1ZXN0KE9iamVjdC5hc3NpZ24oe21ldGhvZDogJ1BPU1QnLCB1cmwsIGRhdGF9LCBwYXJhbUFsbCkpXHJcbn07XHJcbmV4cG9ydCBjb25zdCBwdXQgPSAodXJsLCBkYXRhKSA9PiByZXF1ZXN0KHttZXRob2Q6ICdQVVQnLCB1cmwsIGRhdGF9KTtcclxuZXhwb3J0IGNvbnN0IGRlbCA9ICh1cmwsIGRhdGEpID0+IHJlcXVlc3Qoe21ldGhvZDogJ0RFTEVURScsIHVybCwgZGF0YX0pO1xyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIOWKn+iDveWHveaVsOWMulxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIOWwhlVSTOS4reeahHNlYXJjaCDlrZfnrKbkuLIg6L2s5o2i5oiQIOWvueixoVxyXG4gKiBAcGFyYW0gc2VhcmNoXHJcbiAqIEByZXR1cm5zIHt7fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZWFyY2hQYXJhbSA9IChzZWFyY2gpID0+IHtcclxuICAgIGlmICghIXNlYXJjaCkge1xyXG4gICAgICAgIGxldCBzdHIgPSBzZWFyY2guc2xpY2UoMSk7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gc3RyLnNwbGl0KFwiJlwiKTtcclxuICAgICAgICBsZXQgb2JqID0ge307XHJcbiAgICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW0gPSBpdGVtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgb2JqW3BhcmFtWzBdXSA9IHBhcmFtWzFdO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIGNvZG92YSDmj5Lku7bosIPnlKjljLpcclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5cclxuLy8g5ZCv5YGc5pS25qy+56CBXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRYaWFvV2VpUGF5KHBhcmFtLCBzdWMsIGVycikge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuc2V0WGlhb1dlaVBheShwYXJhbSwgc3VjLCBlcnIpO1xyXG59XHJcblxyXG4vL+Wwj+W+rmF1ZGlvXHJcbmV4cG9ydCBjb25zdCBzZXRYaWFvV2VpQXVkaW8gPSAocGFyYW0sIHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5zZXRYaWFvV2VpQXVkaW8ocGFyYW0sIHN1YywgZXJyKTtcclxufVxyXG5leHBvcnQgY29uc3QgZ2V0WGlhb1dlaUF1ZGlvID0gKHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5nZXRYaWFvV2VpQXVkaW8oc3VjLCBlcnIpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdG9hc3QgPSAobXMpID0+IHtcclxuICAgIFRvYXN0LmluZm8obXMsIDIpO1xyXG59XHJcbi8qKlxyXG4gKiDorr7nva7pobbpg6hiYXJcclxuICogQHBhcmFtIHRpdGxlIOmhtemdouWQjeensFxyXG4gKiBAcGFyYW0gcmlnaHRCYXIg5Y+z5L6n5oyJ6ZKu5ZCN56ewXHJcbiAqIEBwYXJhbSByaWdodENhbGxiYWNrIOWPs+S+p+aMiemSruWbnuiwg1xyXG4gKiBAcGFyYW0gcmlnaHRCYXJJbWcg5Y+z5L6n5oyJ6ZKu5Zu+54mHXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYmVmb3JlRW50ZXJSb3V0ZXIgPSAodGl0bGUgPSBcIlwiLCByaWdodEJhciA9IFwiXCIsIHJpZ2h0Q2FsbGJhY2sgPSBudWxsLCByaWdodEJhckltZyA9IG51bGwpID0+IHtcclxuICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHRpdGxlKVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueql+WPo+WPs+S+p+aMiemSrlxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZSDlm77moIfmoIfpophcclxuICAgICAgICAgKiBAcGFyYW0gaW1hZ2Ug5Zu+5qCH5paH5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIGhhbmRsZXIg54K55Ye75Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKCEhcmlnaHRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uKHJpZ2h0QmFyLCByaWdodEJhckltZywgcmlnaHRDYWxsYmFjaylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24oXCJcIiwgbnVsbCwgbnVsbClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDpgJrnn6XlrqLmiLfnq6/kv67mlLnnirbmgIFcclxuICovXHJcbmV4cG9ydCBjb25zdCBtY2NTdGF0ZUNoYW5nZWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAubWNjU3RhdGVDaGFuZ2VkKClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kUXJDb2RlID0gKHBhcmFtcywgc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5omr5o+P5p2h56CB5ZKM5LqM57u056CBXHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAgICAgICAqIEBwYXJhbSBzdWNjZXNzXHJcbiAgICAgICAgICogQHBhcmFtIGZhaWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuc2NhblFSQ29kZShwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VXZWJWaWV3ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY2xvc2VXZWJWaWV3KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2ZXJpZnlQYXlQd2QgPSAocGFyYW0sIHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnZlcmlmeVBheVB3ZChwYXJhbSwgc3VjY2VzcywgZmFpbClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVXZWJWaWV3ID0gKHVybCwgcGFyYW1zID0gbnVsbCwgdGl0bGUgPSAnJywgaXNGaW5pc2ggPSBcIjFcIikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY3JlYXRlV2ViVmlldyh1cmwsIHBhcmFtcywgdGl0bGUsIGlzRmluaXNoKVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRVc2VyRGV0YWlsSW5mbyA9IChzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuZ2V0VXNlckRldGFpbEluZm8oc3VjY2VzcywgZmFpbClcclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWwhmNhdmFzIOS/neWtmOWIsOacrOWcsOebuOWGjFxyXG4gKiBAcGFyYW0gY2FudmFzXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2F2ZVFjb2RlID0gKGNhbnZhcykgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgdWkgPSBVUC5XLlVJIHx8IHt9O1xyXG4gICAgdmFyIHBpY1VybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhcHAubG9nRXZlbnQoJ3NhdmVQaWN0dXJlX05ld1llYXJBY3QnKTtcclxuICAgICAgICBhcHAuc2F2ZVBpY1RvTG9jYWwoe1xyXG4gICAgICAgICAgICB1cmw6IHBpY1VybCAmJiBwaWNVcmwuc3Vic3RyKDIyKVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdWkuc2hvd1RvYXN0V2l0aFBpYygn5bey5L+d5a2Y5Yiw57O757uf55u45YaMJyk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd1RvYXN0KG1zZyB8fCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoYXJlID0gKHRpdGxlLCBkZXNjLCBpbWdVUkwsIHBhZ2VVUmwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIGVudiA9IFVQLlcuRW52IHx8IHt9O1xyXG5cclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pi+56S65YiG5Lqr6Z2i5p2/XHJcbiAgICAgICAgICog5aaC5p6c5omA5pyJ5rig6YGT5L2/55So55u45ZCM55qE5YiG5Lqr5YaF5a655YiZ5LuF5aGr5YaZcGFyYW1z5Y2z5Y+v77yMXHJcbiAgICAgICAgICog5aaC5p6c6ZyA6KaB5qC55o2u5LiN5ZCM5rig6YGT5a6a5Yi25YiG5Lqr5YaF5a6577yM5YiZ5Y+vcGFyYW1z55WZ56m677yM5Zyoc2hhcmVDYWxsYmFja+S4rei/lOWbnuaMh+Wumua4oOmBk+eahOWIhuS6q+WGheWuuVxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXMg5YiG5Lqr5Y+C5pWwXHJcbiAgICAgICAgICogICAgICAgICAgICAgIHtcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHRpdGxl77yaIOWIhuS6q+agh+mimFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgZGVzYzog5YiG5Lqr5pGY6KaBXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBwaWNVcmzvvJrliIbkuqvlm77moIdcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNoYXJlVXJs77ya6K+m5oOF5Zyw5Z2AXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiBAcGFyYW0gc2hhcmVDYWxsYmFjayDliIbkuqvml7blm57osINcclxuICAgICAgICAgKiAgICAgICAgICAgICAgY2hhbm5lbO+8mntcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDDvvJrnn63kv6FcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDHvvJrmlrDmtarlvq7ljZpcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDPvvJrlvq7kv6Hlpb3lj4tcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDTvvJrlvq7kv6HmnIvlj4vlnIhcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDXvvJpRUeWlveWPi1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNu+8mlFR56m66Ze0XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA377ya5aSN5Yi26ZO+5o6lXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiAgICAgICAgICAgICAgZGF0YTog6buY6K6k5YiG5Lqr5pWw5o2uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLnNob3dTaGFyZVBhbmVsKHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBkZXNjOiBkZXNjLFxyXG4gICAgICAgICAgICBwaWNVcmw6IGltZ1VSTCxcclxuICAgICAgICAgICAgc2hhcmVVcmw6IHBhZ2VVUmwgIC8vIHRvZG8g5pmu6YCa5YiG5LqrXHJcbiAgICAgICAgfSwgbnVsbClcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE5a6a5L2N77yM6aaW5YWI6YCa6L+HR1BTIOWumuS9je+8jOWmguaenOWumuS9jeWksei0pe+8jOmAmui/h+aOpeWPo2dldENpdHks5Yip55SoSVDlnLDlnYDov5vooYzlrprkvY3vvIzlpoLmnpzov5jmmK/lpLHotKXvvIzpgJrov4fmj5Lku7bojrflj5blrqLmiLfnq6/lt6bkuIrop5LnmoTln47luILkv6Hmga/vvIzkvp3nhLblpLHotKXpu5jorqTnqb9jaXR5Q2Q6MzEwMDAwIOS7o+ihqOS4iua1t+W4glxyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50TG9jYXRpb25JbmZvID0gKGNhbGxiYWNrMikgPT4ge1xyXG4gICAgY29uc3QgdWkgPSBVUC5XLlVJO1xyXG4gICAgdWkuc2hvd0xvYWRpbmcoKTtcclxuICAgIGxldCBjYWxsYmFjayA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4gICAgICAgIGNhbGxiYWNrMihkYXRhKVxyXG4gICAgfVxyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYXBwLmdldEN1cnJlbnRMb2NhdGlvbkluZm8oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNtZDogXCIvXCIgKyBDT05GSUcuUkVTVC5nZXRDaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhdGg6IFwiaHR0cDovLzE3Mi4yMS4zMy41NjozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCIrQ09ORklHLlJFU1QuZ2V0Q2l0eSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBcIjJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCB0cnVlLCBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoTmF0aXZlRGF0YShjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hOYXRpdmVEYXRhKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaE5hdGl2ZURhdGEgPSAoY2FsbGJhY2spID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5blrqLmiLfnq6/kv6Hmga9cclxuICAgICAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICAgICAqIEBwYXJhbSBmYWlsXHJcbiAgICAgICAgICogQHBhcmFtIHR5cGUgMO+8muWfjuW4guS/oeaBr2NpdHlDZO+8mzHvvJrnu4/nuqzluqbvvJs177yaVXNlcklkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLmZldGNoTmF0aXZlRGF0YSgwLCAoZGF0YSA9IHt9KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICBjaXR5Q2Q6IFwiMzEwMDAwXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgY29uc3Qgc2F2ZVBpY1RvTG9jYWwgPSAoY2FudmFzLCByZXNvbHZlKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciB1aSA9IFVQLlcuVUkgfHwge307XHJcbiAgICB2YXIgcGljVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zYXZlUGljVG9Mb2NhbCh7XHJcbiAgICAgICAgICAgIHVybDogcGljVXJsICYmIHBpY1VybC5zdWJzdHIoMjIpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+aIkOWKn1xyXG4gICAgICAgICAgICAhIXJlc29sdmUgJiYgcmVzb2x2ZShcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgfSwgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgISFyZXNvbHZlICYmIHJlc29sdmUoXCJmYWlsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlVGV4dENhbnZhc2UgPSAodGV4dCwgY29sb3IsIGxvbmcgPSA2ODQsIHNob3QgPSA2MCkgPT4ge1xyXG5cclxuICAgIGxldCByZW0ycHggPSAodmFsKSA9PiB7XHJcbiAgICAgICAgdmFyIGNXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgICAgIHJldHVybiB2YWwgKiBjV2lkdGggLyA3NTBcclxuICAgIH1cclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dENhbnZhcycpO1xyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIC8v6Kit572u55Wr5L2I55qE5a+s6auYXHJcbiAgICAvLyB2YXIgYmdXaWR0aCA9IHJlbTJweChsb25nKTtcclxuICAgIC8vIHZhciBiZ0hlaWdodCA9IHJlbTJweChzaG90KTtcclxuXHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHNob3QpO1xyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbG9uZyk7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgY3R4LnJvdGF0ZSgtOTAgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgIHZhciB0ZXh0ID0gdGV4dDtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XHJcbiAgICBsZXQgZm9udFNpemUgPSBzaG90O1xyXG4gICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB3aGlsZSAoY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoID4gbG9uZykge1xyXG4gICAgICAgIGZvbnRTaXplLS07XHJcbiAgICAgICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB9XHJcbiAgICBjdHguZmlsbFRleHQodGV4dCwgLWxvbmcsIGZvbnRTaXplKTtcclxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOeUn+aIkOWbvueJh+W5tuS/neWtmOWIsOebuOWGjFxyXG4gKiBAcGFyYW0gYmd1cmwg6IOM5pmv5Zu+54mH55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVVUkwg5LqM57u056CB55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVXZEFuZEhnIOS6jOe7tOeggeeahOWuveW6plxyXG4gKiBAcGFyYW0geFdpZHRoIOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpIg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5SGVpZ2h0IOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB0ZXh0YmdVUkwg5Yqg5YWl55S75biD55qE5Zu+54mH55qEVVJMXHJcbiAqIEBwYXJhbSB4VGV4dFdpZHRoIOWKoOWFpeeUu+W4g+eahOWbvueJh+i3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5VGV4dEhlaWdodCDliqDlhaXnlLvluIPnmoTlm77niYfot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVDb252YXNBbmRTYXZlUGhvdG8gPSAoY2FudmFzT2JqLCByZXNvbHZlKSA9PiB7XHJcbiAgICBsZXQge2JndXJsLCBxcmNvZGVVUkwsIHFyY29kZVdkQW5kSGcsIHhXaWR0aCwgeUhlaWdodCwgdGV4dGJnVVJMLCB4VGV4dFdpZHRoLCB5VGV4dEhlaWdodH0gPSBjYW52YXNPYmo7XHJcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1vbkNhbnZhc1dyYXBwZXInKTtcclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk55S75biD5YaF5a65XHJcbiAgICAgKi9cclxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aFxyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLnNyYyA9IGJndXJsO1xyXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy/oqK3nva7nlavkvYjnmoTlr6zpq5hcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGltZy53aWR0aCk7XHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaW1nLmhlaWdodCk7XHJcblxyXG4gICAgICAgIC8v5Zyo55Wr5biD5LiK55Wr6IOM5pmv5ZyWXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG5cclxuICAgICAgICBpZiAoISF0ZXh0YmdVUkwpIHtcclxuICAgICAgICAgICAgbGV0IHRleHRVcmkgPSB0ZXh0YmdVUkw7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0SW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIHRleHRJbWcuc3JjID0gdGV4dFVyaTtcclxuICAgICAgICAgICAgdGV4dEltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRleHRJbWcsIHhUZXh0V2lkdGgsIHlUZXh0SGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuozntq3norzlnJbniYflpKflsI9cclxuICAgICAgICB2YXIgcXJjb2RlV2lkdGhBbmRIZWlnaHQgPSBxcmNvZGVXZEFuZEhnO1xyXG4gICAgICAgIC8v5riF6Zmk5LqM57u056CBXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB2YXIgcXJjb2RlID0gbmV3IFFSQ29kZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKSwge1xyXG4gICAgICAgICAgICB0ZXh0OiBxcmNvZGVVUkwsXHJcbiAgICAgICAgICAgIGhlaWdodDogcXJjb2RlV2lkdGhBbmRIZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoOiBxcmNvZGVXaWR0aEFuZEhlaWdodCxcclxuICAgICAgICAgICAgY29ycmVjdExldmVsOiBRUkNvZGUuQ29ycmVjdExldmVsLkxcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcXJjb2RlSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xyXG4gICAgICAgIHFyY29kZUltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8v55Wr5LqM57at56K855qE5ZyW54mHXHJcbiAgICAgICAgICAgIGxldCBxcmNvZGVEeCA9IHhXaWR0aCwgcXJjb2RlRHkgPSB5SGVpZ2h0O1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHFyY29kZUltZywgcXJjb2RlRHgsIHFyY29kZUR5KTtcclxuICAgICAgICAgICAgLy8gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICBzYXZlUGljVG9Mb2NhbChjYW52YXMsIHJlc29sdmUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImJhbmtDYWRsaXN0LXdhcnAtZGl2XCI6XCJiYW5rQ2FkbGlzdC13YXJwLWRpdlwiLFwibGVmdEFycm93XCI6XCJsZWZ0QXJyb3dcIixcInJpZ2h0QXJyb3dcIjpcInJpZ2h0QXJyb3dcIixcImljb24tc2VsZWN0ZWRcIjpcImljb24tc2VsZWN0ZWRcIixcIm5vT3BlcmF0ZVwiOlwibm9PcGVyYXRlXCIsXCJub09wZXJhdGVJY29uXCI6XCJub09wZXJhdGVJY29uXCIsXCJtYXNrXCI6XCJtYXNrXCIsXCJiYW5rQ2FkbGlzdC13YXJwLWlubmVyXCI6XCJiYW5rQ2FkbGlzdC13YXJwLWlubmVyXCIsXCJoZWFkXCI6XCJoZWFkXCIsXCJwYWRkaW5nUmlnaHRcIjpcInBhZGRpbmdSaWdodFwiLFwiYXJyb3dEaXZcIjpcImFycm93RGl2XCIsXCJoZWFkLXRpdGxlXCI6XCJoZWFkLXRpdGxlXCIsXCJjb250ZW50XCI6XCJjb250ZW50XCIsXCJjYXJkSXRlbVwiOlwiY2FyZEl0ZW1cIixcImljb25cIjpcImljb25cIixcImljb24tYWRkXCI6XCJpY29uLWFkZFwiLFwiaXRlbUNvbnRlbnRcIjpcIml0ZW1Db250ZW50XCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvVG9vbHMvQ2FyZGxpc3QvY2FyZGxpc3Quc2Nzc1xuLy8gbW9kdWxlIGlkID0gODBmZWM5N2UzYmIzZDcwM2IyMDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDQiLCJjb25zdCBjb25maWcgPSB7XHJcbiAgICBSRVNUOiB7XHJcbiAgICAgICAgYXBwbHlNY2M6IFwiY29sbGVjdGlvbkNvZGUvYXBwbHlNY2NcIiwgLy8yLjQuNOeUs+ivt+aUtuasvueggeaOpeWPo1xyXG4gICAgICAgIGdldE1jY0NhcmRMaXN0OiBcImNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCIsIC8vMi40LjLllYbmiLfmlLbmrL7noIHljaHliJfooajmjqXlj6NcclxuICAgICAgICBhcHBseU1hdDogXCJjb2xsZWN0aW9uQ29kZS9hcHBseU1hdFwiLCAvL+eUs+ivt+eJqeaWmeaOpeWPo1xyXG4gICAgICAgIGdldE1jaG50QW5kQXJlYUluZjogXCJtY2hudC9nZXRNY2hudEFuZEFyZWFJbmYuc2pzb25cIiwgLy/llYbmiLfnsbvlnovlj4rlnLDljLrliJfooajmn6Xor6JcclxuICAgICAgICB1cGdyYWRlTWNjOiBcImNvbGxlY3Rpb25Db2RlL3VwZ3JhZGVNY2NcIiwgLy8yLjQuNuWNh+e6p+aUtuasvueggeaOpeWPoyxcclxuICAgICAgICBnZXRBZGRyTGlzdDogXCJhZGRyZXNzL2dldEFkZHJMaXN0XCIgLCAvLzIuNC4xMyDojrflj5bmlLbotKflnLDlnYDliJfooahcclxuICAgICAgICBkZWxldGVBZGRyZXNzOiBcImFkZHJlc3MvZGVsZXRlQWRkcmVzc1wiICwgLy8yLjQuMTIg5Yig6Zmk5pS26LSn5Zyw5Z2AXHJcbiAgICAgICAgZWRpdEFkZHJlc3M6IFwiYWRkcmVzcy9lZGl0QWRkcmVzc1wiLCAvLzIuNC4xMSDkv67mlLnmlLbotKflnLDlnYAsXHJcbiAgICAgICAgbmV3QWRkcmVzczogXCJhZGRyZXNzL25ld0FkZHJlc3NcIiwgLy8yLjQuMTAg5paw5aKe5pS26LSn5Zyw5Z2AXHJcbiAgICAgICAgbWNobnRPcGVyIDpcIm1jaG50L21jaG50T3BlclwiLCAvLzIuMi4yIOW6l+mTuuS/oeaBr+abtOaWsFxyXG4gICAgICAgIGdldExpbWl0QXRJbmZvOlwibWNobnQvZ2V0TGltaXRBdEluZm9cIiwgLy/ojrflj5bmlLbmrL7pmZDpop1cclxuICAgICAgICBzZXRNY2NPbk9mZjpcImNvbGxlY3Rpb25Db2RlL3NldE1jY09uT2ZmXCIsIC8v5YGc5q2i5ZKM5ZCv55So5LuY5qy+56CB5YCf5Y+jXHJcbiAgICAgICAgZ2V0TWNobnREZXRhaWw6XCJtY2hudC9tY2hudERldGFpbFwiLCAvLzIuMi4xIOiOt+WPluW6l+mTuuivpuaDhemhtemdolxyXG4gICAgICAgIC8vIHVwZ3JhZGVNY2M6IFwiY29sbGVjdGlvbkNvZGUvdXBncmFkZU1jY1wiLCAvLzIuNC425Y2H57qn5pS25qy+56CB5o6l5Y+jXHJcbiAgICAgICAgZ2V0VG9kYXlUcmFuczpcInRyYW4vZ2V0VG9kYXlUcmFuc1wiLC8vMi4xLjMvL+S7iuaXpeiuouWNleaOpeWPo1xyXG4gICAgICAgIGdldFRvZGF5SW5jb21lOlwidHJhbi9nZXRUb2RheUluY29tZVwiLC8vMi4xLjHllYbmiLfmnI3liqHpppbpobXku4rml6XmlLbmrL7mjqXlj6N+fn5+fn5+flxyXG4gICAgICAgIGdldEhpc3RvcnlJbmNvbWU6XCJ0cmFuL2dldEhpc3RvcnlJbmNvbWVcIiwvLzIuMS4y5Y6G5Y+y5pS25qy+5o6l5Y+jXHJcbiAgICAgICAgZ2V0SGlzdG9yeVRyYW5zOlwidHJhbi9nZXRIaXN0b3J5VHJhbnNcIiwvLzIuMS405Y6G5Y+y6K6i5Y2V5o6l5Y+jXHJcbiAgICAgICAgZ2V0TG9naXN0aWNzU3Q6XCJtYXRlcmllbC9nZXRMb2dpc3RpY3NTdFwiLC8vMi4zLjPnianmtYHor6bmg4XmjqXlj6Pmn6Xor6JcclxuICAgICAgICBnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtOlwidHJhbi9nZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtXCIsLy8yLjEuNeWNleeslOiuouWNleafpeivouaOpeWPo1xyXG4gICAgICAgIGdldEF1ZGl0SW5mbzpcImNvbGxlY3Rpb25Db2RlL2dldEF1ZGl0SW5mb1wiLC8vMi40LjE05L+h55So5Y2h5Y2H57qn5a6h5qC457uT5p6c5p+l6K+iXHJcbiAgICAgICAgdXBkYXRlTWNjQ2FyZDpcImNvbGxlY3Rpb25Db2RlL3VwZGF0ZU1jY0NhcmRcIiwvLzIuNC455pu05o2i5pS25qy+5Y2h5o6l5Y+jXHJcbiAgICAgICAgZ2V0VXBncmFkZVN0OlwibWNobnQvZ2V0VXBncmFkZVN0XCIsLy/mn6Xor6LllYbmiLfmmK/lkKbljYfnuqfkv6HnlKjljaHmlLbmrL5cclxuICAgICAgICBnZXRNY2NUcmFuc051bTonY29sbGVjdGlvbkNvZGUvZ2V0TWNjVHJhbnNOdW0nLC8v6I635Y+W6LCD5Y+W5pSv5LuY5o6n5Lu255qEVE7lj7dcclxuICAgICAgICBnZXRNYXRlcmllbEluZm9MaXN0OlwiY29sbGVjdGlvbkNvZGUvZ2V0TWF0ZXJpZWxJbmZvTGlzdFwiLC8vMi40LjPnianmlpnkv6Hmga/liJfooajmjqXlj6NcclxuICAgICAgICB1c2VySW5mbzpcIi9hcHAvaW5BcHAvdXNlci9nZXRcIiwvL+iOt+WPlueUqOaIt+S/oeaBr1xyXG4gICAgICAgIGlzQmxhY2s6XCJzY2FuL2lzQmxhY2tcIiwvLzIuMS415pS26ZO25ZGY5piv5ZCm5Zyo6buR5ZCN5Y2VXHJcbiAgICAgICAgaXNBcHBseTpcInNjYW4vaXNBcHBseVwiLC8vMi4xLjTmmK/lkKblt7Lnu4/nlLPor7fnuqLljIXnoIFcclxuICAgICAgICBzaGFyZUxpbms6XCJzY2FuL3NoYXJlTGlua1wiLC8vMi4xLjbnlJ/miJDnuqLljIXnoIHpk77mjqVcclxuICAgICAgICByZWNtZFJlY29yZDpcInNjYW4vcmVjbWRSZWNvcmRcIiwvL+aOqOiNkOWFs+ezu+iusOW9lVxyXG4gICAgICAgIGdldExvZ2lzdGljc0xpc3Q6XCJtYXRlcmllbC9nZXRMb2dpc3RpY3NMaXN0XCIsLy/ojrflj5bnianmlpnljoblj7LorqLljZVcclxuICAgICAgICBnZXRSZXdhcmRMaXN0Olwic2Nhbi9nZXRSZXdhcmRMaXN0XCIsLy8yLjEuN+afpeivouaUtumTtuWRmOi1j+mHkeaYjue7huiusOW9lVxyXG4gICAgICAgIGdldFByb3RvY29sSW5mbzpcImNvbGxlY3Rpb25Db2RlL2dldFByb3RvY29sSW5mb1wiLC8v5ZWG5oi35Y2H57qn5p+l6K+i5pi+56S65Y2P6K6u55qE5ZCN56ew5ZKM5Y2P6K6u55qE5Zyw5Z2AXHJcbiAgICAgICAgZ2V0Q2l0eTpcInJlZ2lvbi9nZXRDaXR5XCIsLy/pgJrov4dJUOWcsOWdgOiOt+WPluWcsOWdgOWumuS9jVxyXG4gICAgICAgIGdldFFyVXJsOlwiY29sbGVjdGlvbkNvZGUvZ2V0UXJJbmZvXCIvLzIuMS4x6I635Y+W55So5oi35pS25qy+56CBVVJMXHJcbiAgICB9LFxyXG4gICAgU1RBVFVTQ09ERToge1xyXG4gICAgICAgIFNVQ0NFU1M6XCIwMFwiXHJcbiAgICB9LFxyXG4gICAgQ09OU1RfREFUQTp7XHJcbiAgICAgICAgaW1nZVNpemU6XCIzMDBcIlxyXG4gICAgfSxcclxuICAgIENBQ0hFS0VZOntcclxuICAgICAgICBnZXRNY2NDYXJkTGlzdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLWNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1tY2hudC9nZXRVcGdyYWRlU3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1tY2hudC9nZXRVcGdyYWRlU3RcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0TWNobnREZXRhaWw6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1tY2hudC9tY2hudERldGFpbFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLW1jaG50L21jaG50RGV0YWlsXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzQXBwbHk6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1zY2FuL2lzQXBwbHlcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1zY2FuL2lzQXBwbHlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0QWRkckxpc3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1hZGRyZXNzL2dldEFkZHJMaXN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtYWRkcmVzcy9nZXRBZGRyTGlzdFwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL2NvbmZpZy5qcyIsImltcG9ydCBJbW11dGFibGUgZnJvbSBcImltbXV0YWJsZVwiO1xyXG5cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOWPquS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiDlhYjor7vnvJPlrZjvvIzlkIzmraXlvoDlkI7lj7Dlj5Hor7fmsYLvvIzor7fmsYLmiqXmloflm57mnaXlkI7liLfmlrDnvJPlrZjlj4rpobXpnaJcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSA9ICh1cGRhdGUscm9sbEtleSxzZWNvbmRLZXkpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuLy8gICAgICAgICAgICAgcm9sbEtleSxcclxuLy8gICAgICAgICAgICAgc2Vjb25kS2V5XHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5LiN5pSv5oyBIHN3ICAgLOawuOS5hee3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2NhY2hlOiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW59fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlTG9uZ1RpbWUgPSAocm9sbEtleSwgc2Vjb25kS2V5KSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICAgICAgcm9sbEtleSxcclxuLy8gICAgICAgICAgICAgc2Vjb25kS2V5XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDlj6rkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMeWIhumSn+WGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTFtaW4gPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UzMG1pbiA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAzMCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMWhvdXIgPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKjYwKjEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTJob3VyID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDIgKiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG5cclxuLy9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTI0ZGlhbiA9ICgpID0+IHtcclxuLy9cclxuLy8gICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuLy8gICAgIGxldCB0ZW1vcnJvdyA9IG5ldyBEYXRlKCk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRIb3VycygyMyk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRNaW51dGVzKDU5KTtcclxuLy8gICAgIHRlbW9ycm93LnNldFNlY29uZHMoNTkpO1xyXG4vLyAgICAgbGV0IHRlbSA9IHRlbW9ycm93LmdldFRpbWUoKTtcclxuLy8gICAgIGxldCB2YWxpZGF0ZVRpbWUgPSB0ZW0gLSBub3cgKyAxMDAwICogNjBcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICB2YWxpZGF0ZVRpbWU6IHZhbGlkYXRlVGltZSxcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgd29ya2JveOeahOetlueVpSAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKuS4umdldOivt+axgu+8jOS4jeWKoOWvhlxyXG4vLyAgKuaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICrlhYjor7vnvJPlrZjvvIzlkIzml7blvoDlkI7lj7Dlj5Hor7fmsYLvvIzor7fmsYLmiqXmloflm57mnaXlkI7liLfmlrDnvJPlrZjlj4rpobXpnaJcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIGNhY2hlOiBib29sZWFuLCBhc3luYzogYm9vbGVhbn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGUgPSAodXBkYXRlKSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGJ5QWpheDogZmFsc2UsLy/lpoLmnpzopoHmlK/mjIFzdyDlsLHkuI3pnIDkvb/nlKhhamF4XHJcbi8vICAgICAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIHVwZGF0ZTogdXBkYXRlXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMzDliIbpkp/lhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MzBtaW4gPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAzMCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAx5bCP5pmC5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDFob3VyID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QyaG91ciA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDIgKiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vKipcclxuICog6K+l562W55Wl5piv5LiA5a6a5pe26Ze05YaF5LiN5ZCR5ZCO5Y+w6K+35rGC5pWw5o2u77yMIOWmguaenOWcqOiuvuWkh+S4iuaUr+aMgXN35YiZ5L2/55Soc3cs5ZCm5YiZ5L2/55SoIGxvY2FsU3RvcmFnZVxyXG4gKiBAcGFyYW0gdGltZSAg6KaB57yT5a2Y55qE5pe26Ze0IOWNleS9jeaYr+avq+enklxyXG4gKiBAcmV0dXJucyB7e2J5QWpheDogYm9vbGVhbiwgZm9yQ2hzcDogYm9vbGVhbiwgZW5jcnlwdDogYm9vbGVhbiwgY2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHt2YWxpZGF0ZVRpbWU6ICp9fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjYWNoZUZpcnN0ID0odGltZSk9PntcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYnlBamF4OiB0cnVlLFxyXG4gICAgICAgIGZvckNoc3A6ZmFsc2UsXHJcbiAgICAgICAgZW5jcnlwdDpmYWxzZSxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRlVGltZTp0aW1lLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiAg6K+l562W55Wl5piv5LiA5a6a5pe26Ze05YaF5LiN5ZCR5ZCO5Y+w6K+35rGC5pWw5o2u77yM5re75Yqg57yT5a2Y5Y+q5ZyobG9jYWxzdG9yYWdl5LitXHJcbiAqIEBwYXJhbSB0aW1lICDopoHnvJPlrZjnmoTml7bpl7Qg5Y2V5L2N5piv5q+r56eSXHJcbiAqIEBwYXJhbSByb2xsS2V5ICAg6Z2e5b+F5aGrIOWmguaenOWQjuacn+imgeWIoOmZpOi/meS4que8k+WtmO+8jOi/meWhq+WGmei/mWtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5ICDpnZ7lv4Xloasg5aaC5p6c5ZCO5pyf6KaB5Yig6Zmk6L+Z5Liq57yT5a2Y77yM6L+Z5aGr5YaZ6L+Za2V5XHJcbiAqIEByZXR1cm5zIHt7Y2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHtuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogKiwgcm9sbEtleTogKiwgc2Vjb25kS2V5OiAqfX19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2FjaGVGaXJzdFN0b3JhZ2UgPSh0aW1lLHJvbGxLZXksIHNlY29uZEtleSk9PntcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZVRpbWU6IHRpbWUsXHJcbiAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlRm9ybWF0dGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCByZXMgPSB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5yZXNwLFxyXG4gICAgICAgIGRhdGE6IGRhdGEucGFyYW1zLFxyXG4gICAgICAgIG1zZzogZGF0YS5tc2dcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vKipcclxuICog6K+l562W55Wl5piv5YWI6K+757yT5a2Y77yM5ZCM5pe25ZCR5ZCO5Y+w5Y+R6YCB6K+35rGC77yM6K+35rGC5Zue5p2l5ZCO5ZCM5q2l5pu05paw57yT5a2Y77yM5Zue6LCDdXBkYXRlIOWHveaVsO+8jFxyXG4gKiBAcGFyYW0gdXBkYXRlIOW/heWhq+abtOaWsOmhtemdoueahOWbnuiwg+WHveaVsFxyXG4gKiBAcGFyYW0gcm9sbEtleSAg6Z2e5b+F5aGrIOiuvue9rue8k+WtmOeahCByb2xsa2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXkg6Z2e5b+F5aGrIOiuvue9rue8k+WtmOeahCBzZWNvbmRLZXlcclxuICogQHJldHVybnMge3tjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge2FzeW5jOiBib29sZWFuLCByb2xsS2V5OiAqLCBzZWNvbmRLZXk6ICp9LCB1cGRhdGU6ICp9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSA9ICh1cGRhdGUscm9sbEtleSxzZWNvbmRLZXkpID0+IHtcclxuXHJcbiAgIGxldCAgcmVmcmVzaERvbUZ1bmM9KHJlc3BvbnNlKT0+e1xyXG4gICAgICAgbGV0IHJlcT1yZXNwb25zZUZvcm1hdHRlcihyZXNwb25zZSlcclxuICAgICAgIC8vIOWwhuiOt+WPlueahOaVsOaNruWSjOe8k+WtmOS4reeahOaVsOaNrui/m+ihjOWvueavlFxyXG4gICAgICAgbGV0IGRhdGFGcm9tQ2FjaGUgPSB7fTtcclxuICAgICAgIFVQLlcuVXRpbC5nZXRGcm9tU3RvcmFnZSh7XHJcbiAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgIH0sZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgaWYoICEhZGF0YSApe1xyXG4gICAgICAgICAgICAgICAgZGF0YUZyb21DYWNoZSA9IGRhdGE7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICB9KVxyXG4gICAgICAgbGV0IGlzU2FtZUF0QWxsID0gSW1tdXRhYmxlLmlzKEltbXV0YWJsZS5mcm9tSlMocmVxKSxJbW11dGFibGUuZnJvbUpTKGRhdGFGcm9tQ2FjaGUpKTsgLy/mlbDmja7mmK/lkKblrozlhajnm7jlkIxcclxuICAgICAgIGlmKCAhaXNTYW1lQXRBbGwgKXsgLy/mlbDmja7mnInlj5jliqhcclxuICAgICAgICAgICAgdXBkYXRlKHJlcSlcclxuICAgICAgIH1cclxuICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBlbmRPZlN5bmNGdW5jOmZhbHNlLFxyXG4gICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZTogcmVmcmVzaERvbUZ1bmMsXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKDpmaRsb2NhbHN0b3JhZ2XkuK3nmoTnvJPlrZhcclxuICogQHBhcmFtIHJvbGxLZXlcclxuICogQHBhcmFtIHNlY29uZEtleVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlbW92ZUNhY2hlID0gKHJvbGxLZXksIHNlY29uZEtleSkgPT4ge1xyXG4gICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgIHJvbGxLZXk6IHJvbGxLZXksXHJcbiAgICAgICAgc2Vjb25kS2V5OiBzZWNvbmRLZXlcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5Yig6Zmk57yT5a2Y5oiQ5YqfJylcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgICAgIGZ1bGw6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvY2FjaGVTdG9yYWdlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS10cnlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdQcm9taXNlJywgeyAndHJ5JzogZnVuY3Rpb24gKGNhbGxiYWNrZm4pIHtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZih0aGlzKTtcbiAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oY2FsbGJhY2tmbik7XG4gIChyZXN1bHQuZSA/IHByb21pc2VDYXBhYmlsaXR5LnJlamVjdCA6IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmUpKHJlc3VsdC52KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA4ZTBjMWRiMDAwODVjOGFkMjU1YVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA5NzNjYzhlZWZjNTk5MzFkZTk1ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaW52b2tlID0gcmVxdWlyZSgnLi9faW52b2tlJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4vX2h0bWwnKTtcbnZhciBjZWwgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHNldFRhc2sgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xudmFyIGNsZWFyVGFzayA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBNZXNzYWdlQ2hhbm5lbCA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbDtcbnZhciBEaXNwYXRjaCA9IGdsb2JhbC5EaXNwYXRjaDtcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgaWYgKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spIHtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCkge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gYWE5NjNiNGMyNzE0NGYwOTRjY2Fcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IENhcmRMaXN0VUwgZnJvbSBcIi4vQ2FyTGlzdFVMXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmRsaXN0UGFuZWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgZGF0YTogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIHNob3dSaWdodEJhcjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgY2hhbmdlQ2hpbGRTaG93OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBoYXZlQWRkQ2FyZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgYWRkQ2FyZENhbGxiYWNrOlByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIGFkZFNlbmVObzpQcm9wVHlwZXMuc3RyaW5nXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgICAgIHNob3dSaWdodEJhcjogZmFsc2VcclxuICAgIH1cclxuICAgIGRpc3RyaXREYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmlzU3VwcG9ydCA9PSAwIHx8IGl0ZW0uaXNTdXBwb3J0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qaWVKaUthLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2h1WHVrYS5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsb3NlKClcclxuICAgIH1cclxuICAgIGFkZE5ld0NhcmQgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlbGY9dGhpcztcclxuICAgICAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmi4notbfnu5HljaHmjqfku7ZcclxuICAgICAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICAgICAqIEBwYXJhbSBmYWlsXHJcbiAgICAgICAgICogQHBhcmFtcyBwYXJhbXM6e3NjZW5lOiflnLrmma/lj7cnfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNlbGYucHJvcHMuYWRkU2VuZU5vKVxyXG4gICAgICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICAgICAgYXBwLmFkZEJhbmtDYXJkKCgpPT57XHJcbiAgICAgICAgICAgICAgICBzZWxmLnByb3BzLmFkZENhcmRDYWxsYmFjayhcInN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgfSwgKCk9PntcclxuICAgICAgICAgICAgICAgIHNlbGYucHJvcHMuYWRkQ2FyZENhbGxiYWNrKFwiZmFpbFwiKVxyXG4gICAgICAgICAgICB9LHtzY2VuZTpzZWxmLnByb3BzLmFkZFNlbmVOb30pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbiAgICBoYW5kbEl0ZW1DaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuXHJcbiAgICAgICAgLyoq5aSE55CG6Ieq5a6a5LmJ55qEb25DaGFuZ2Xlh73mlbAqKi9cclxuICAgICAgICBpZiAoISF0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wcm9wcy5vbkNoYW5nZSh2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KVxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlU3RhdGUodmFsdWUpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBjaGFuZ2VTdGF0ZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIC8qKuS/ruaUuUxp55qE5pi+56S6KiovXHJcbiAgICAgICAgbGV0IG5ld0RhdGEgPSBbXTtcclxuICAgICAgICB0aGlzLnN0YXRlLmRhdGEubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLnZpcnR1YWxDYXJkTm8gPT0gdmFsdWUudmlydHVhbENhcmRObylcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdEYXRhLnB1c2goaXRlbSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBkYXRhOiBuZXdEYXRhXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyoq5L+u5pS55a2p5a2Q6IqC54K555qE5pi+56S6KiovXHJcbiAgICAgICAgLy8gdGhpcy5wcm9wcy5jaGFuZ2VDaGlsZFNob3codmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuY2h1WHVrYSA9IFtdOy8v5Y+v5Lul5pON5L2c55qE5Y2hXHJcbiAgICAgICAgdGhpcy5qaWVKaUthID0gW107Ly/kuI3lj6/ku6Xmk43kvZznmoTljaFcclxuXHJcbiAgICAgICAgdGhpcy5kaXN0cml0RGF0YSgpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmNodVh1a2FcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50ID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUgPSAoc3RhdGUsY2FsbGJhY2spPT57XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5rQ2FkbGlzdC13YXJwLWRpdlwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXNrXCIgb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZX0+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbmtDYWRsaXN0LXdhcnAtaW5uZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcnJvd0RpdlwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2V9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwibGVmdEFycm93XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICEhdGhpcy5wcm9wcy5zaG93UmlnaHRCYXIgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcnJvd0RpdlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDnoa7orqRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWRkaW5nUmlnaHRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENhcmRMaXN0VUwgZGF0YT17dGhpcy5jaHVYdWthfSBvbkNoYW5nZT17dGhpcy5oYW5kbEl0ZW1DaGFuZ2V9PjwvQ2FyZExpc3RVTD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmhhdmVBZGRDYXJkJiYoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkSXRlbVwiIG9uQ2xpY2s9e3RoaXMuYWRkTmV3Q2FyZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24gaWNvbi1hZGRcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbUNvbnRlbnRcIj7mt7vliqDpk7booYzljaHmlLbmrL48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwicmlnaHRBcnJvd1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IENhcmRMaXN0VUwgZGF0YT17dGhpcy5qaWVKaUthfSBpc09ubHlTaG93PXt0cnVlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9Ub29scy9DYXJkbGlzdC9DYXJkbGlzdFBhbmVsLmpzIiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanNcbi8vIG1vZHVsZSBpZCA9IGI1MGQ4MjQ1NmU1NDVkY2MzZGQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIGFyZ3MsIHRoYXQpIHtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanNcbi8vIG1vZHVsZSBpZCA9IGI1ODBiOTRiMTk1ODQyY2JmMmIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIE9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbnZhciBpc05vZGUgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZiAoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAoaXNOb2RlKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyLCBleGNlcHQgaU9TIFNhZmFyaSAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMzlcbiAgfSBlbHNlIGlmIChPYnNlcnZlciAmJiAhKGdsb2JhbC5uYXZpZ2F0b3IgJiYgZ2xvYmFsLm5hdmlnYXRvci5zdGFuZGFsb25lKSkge1xuICAgIHZhciB0b2dnbGUgPSB0cnVlO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlIHdpdGhvdXQgYW4gYXJndW1lbnQgdGhyb3dzIGFuIGVycm9yIGluIExHIFdlYk9TIDJcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gICAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYgKCFoZWFkKSB7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gYmRlMGY1N2U5YjU3OWY5NDNmODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjUuNC4xLjUgTmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5cbmZ1bmN0aW9uIFByb21pc2VDYXBhYmlsaXR5KEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIChDKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanNcbi8vIG1vZHVsZSBpZCA9IGMxYjk0ZTNlOTVlZDQzNWFmNTQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtZmluYWxseVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1Byb21pc2UnLCB7ICdmaW5hbGx5JzogZnVuY3Rpb24gKG9uRmluYWxseSkge1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBjb3JlLlByb21pc2UgfHwgZ2xvYmFsLlByb21pc2UpO1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBvbkZpbmFsbHkgPT0gJ2Z1bmN0aW9uJztcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB4OyB9KTtcbiAgICB9IDogb25GaW5hbGx5LFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSk7XG4gICAgfSA6IG9uRmluYWxseVxuICApO1xufSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanNcbi8vIG1vZHVsZSBpZCA9IGMyZTM1YmJmZjgzMzA5NTk0M2MxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4geyBlOiBmYWxzZSwgdjogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBlOiB0cnVlLCB2OiBlIH07XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gY2I3ODM3NTI5NDU0MmMyNGM1YmFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSBkMTgxMGFlNTMzMmUzNmZmYTNjNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IGFwcGx5TWNjQ29kZX0gZnJvbSBcIi4vU3RvcmVJbmZvbWF0aW9uQWN0aW9uc1wiO1xyXG5pbXBvcnQgU3RvcmVJbmZvbWF0aW9uIGZyb20gXCIuL1N0b3JlSW5mb21hdGlvblwiXHJcbmltcG9ydCB7YmVmb3JlRW50ZXJSb3V0ZXIsIGdldEN1cnJlbnRMb2NhdGlvbkluZm8sIHJlZ1Bob25lLCB0b2FzdH0gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gXCIuLi8uLi9zdG9yZS9zdG9yZVwiO1xyXG5pbXBvcnQge1VQREFURV9TVE9SRV9TVEFURX0gZnJvbSBcIi4uLy4uL3N0b3JlL2FjdGlvblwiO1xyXG5pbXBvcnQgQ2FyZExpc3QgZnJvbSBcIi4uL1Rvb2xzL0NhcmRsaXN0L0NhcmRsaXN0XCJcclxuaW1wb3J0IHtnZXRDYXJkbGlzdCwgaXNBcHBseSwgaXNCbGFjaywgc2hhcmxpbmt9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJXCI7XHJcbmltcG9ydCB7cmVtb3ZlQ2FjaGV9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9jYWNoZVN0b3JhZ2VcIjtcclxuaW1wb3J0IENPTkZJRyBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvY29uZmlnXCJcclxuXHJcblxyXG5jbGFzcyBTdG9yZUluZm9tYXRpb25Db250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8v6K6+572u572R6aG1dGl0bGVcclxuICAgICAgICBiZWZvcmVFbnRlclJvdXRlcign55Sz6K+35ZWG5oi35pS25qy+56CBJyk7XHJcbiAgICAgICAgLy/ojrflj5bpk7booYzljaHliJfooahcclxuICAgICAgICBnZXRDYXJkbGlzdCgpXHJcbiAgICAgICAgLy/moLnmja7mmK/lkKbnlLPor7fov4fnuqLljIXnoIHliKTlrprmmK/lkKbmmL7npLrmjqjojZDlhbPns7vjgIJcclxuICAgICAgICBpc0JsYWNrKChyZXNwKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaXNCbGFjazrmiJHmmK/nnJ/mraPnmoR1cGRhdGXlh73mlbAnKVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5ibGFja1N0ID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpc0FwcGx5KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDpgJrnn6V1cGRhdGXlh73mlbDvvIxzdWNjZXPlt7Lnu4/miafooYzlrozmr5VcclxuICAgICAgICAgICAgcmVzcG9uc2UuZnVjLmVuZE9mU3luY0Z1bmMoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aSE55CG5LiL5LiA5q2l55qE5pON5L2cXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUNsaWNrPSgpPT57XHJcbiAgICAgICAgbGV0IHtzdG9yZW5hbWUsc3RvcmVSZWNlaXZlQ2FyZE9iaixyZWNvbW1lbmRQaG9uZSxzaG93UmVjb21tb25kUGhvbmUsaGlzdG9yeX09dGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoc3RvcmVuYW1lLmxlbmd0aD4yMHx8c3RvcmVuYW1lLmxlbmd0aD09MCkge1xyXG4gICAgICAgICAgICB0b2FzdChcIuaCqOi+k+WFpeacieaViOeahOW6l+mTuuWQjeensFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoISFyZWNvbW1lbmRQaG9uZSAmJiAhcmVnUGhvbmUudGVzdCh0aGlzLnByb3BzLnJlY29tbWVuZFBob25lKSl7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi6K+36L6T5YWl5ZCI5rOV55qE5omL5py65Y+3XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghc3RvcmVSZWNlaXZlQ2FyZE9iai52aXJ0dWFsQ2FyZE5vKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi6K+36YCJ5oup5oKo55qE6ZO26KGM5Y2hXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZihzaG93UmVjb21tb25kUGhvbmUpe1xyXG4gICAgICAgICAgICAgICAgZ2V0Q3VycmVudExvY2F0aW9uSW5mbygoY2l0eSk9PntcclxuICAgICAgICAgICAgICAgICAgICBhcHBseU1jY0NvZGUoaGlzdG9yeSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVlVGVsOiByZWNvbW1lbmRQaG9uZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlydHVhbENhcmRObzogc3RvcmVSZWNlaXZlQ2FyZE9iai52aXJ0dWFsQ2FyZE5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NObTogc3RvcmVuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5Q2Q6Y2l0eS5jaXR5Q2RcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGdldEN1cnJlbnRMb2NhdGlvbkluZm8oKGNpdHkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlNY2NDb2RlKGhpc3RvcnksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlydHVhbENhcmRObzogc3RvcmVSZWNlaXZlQ2FyZE9iai52aXJ0dWFsQ2FyZE5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NObTogc3RvcmVuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5Q2Q6Y2l0eS5jaXR5Q2RcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHNob3dSZWNvbW1vbmRQaG9uZT1mYWxzZTtcclxuICAgICAgICBsZXQge2lzYmxhY2ssIGlzQXBwbHl9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgaWYgKGlzYmxhY2sgPT0gXCIwXCIgJiYgaXNBcHBseSA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAvL+eUqOaIt+S4jeWcqOm7keWQjeWNleW5tuS4lCDmnKrnlLPor7fov4fnuqLljIXnoIHvvIzmmL7npLrmjqjojZDmiYvmnLpcclxuICAgICAgICAgICBzaG93UmVjb21tb25kUGhvbmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxTdG9yZUluZm9tYXRpb24gey4uLnRoaXMucHJvcHN9IHNob3dSZWNvbW1vbmRQaG9uZT17c2hvd1JlY29tbW9uZFBob25lfSBoYW5kbGVDbGljaz17dGhpcy5oYW5kbGVDbGlja30gLz47XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcHN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RvcmVuYW1lOiBzdGF0ZS5nZXRJbihbXCJtY2hudERldGFpbFwiLCBcInN0b3JlTm1cIl0pLFxyXG4gICAgICAgIHN0b3JlUmVjZWl2ZUNhcmRPYmo6IHN0YXRlLmdldEluKFtcInN0b3JlUmVjZWl2ZUNhcmRPYmpcIl0pLnRvSlMoKSxcclxuICAgICAgICBjYXJkTGlzdDogc3RhdGUuZ2V0SW4oWydjYXJkTGlzdCddKS50b0pTKCksXHJcbiAgICAgICAgcmVjb21tZW5kUGhvbmU6IHN0YXRlLmdldEluKFtcInJlY29tbWVuZFBob25lXCJdKSxcclxuICAgICAgICBpc2JsYWNrOiBzdGF0ZS5nZXRJbihbXCJibGFja1N0XCJdKSxcclxuICAgICAgICBpc0FwcGx5OiBzdGF0ZS5nZXRJbihbXCJhcHBseVN0XCJdKSxcclxuXHJcbiAgICAgICAgLy8gc2hvd1JlY29tbW9uZFBob25lOnN0YXRlLmdldEluKFtcInNob3dSZWNvbW1vbmRQaG9uZVwiXSlcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwRGlzcGF0aFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcclxuICAgIC8qKlxyXG4gICAgICog55So5LqO55So5oi35pu05pawUmVkdXjkuK3nmoTlupfpk7rlkI3np7BcclxuICAgICAqL1xyXG4gICAgbGV0IGNoYW5nZVN0b3JlTmFtZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7bWNobnREZXRhaWw6IHtzdG9yZU5tOiB2YWx1ZX19KSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWkhOeQhumTtuihjOWNoeeahOWIh+aNolxyXG4gICAgICogQHBhcmFtIHZhbCAg6YCJ5Lit55qE5Y2h5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gcmVzb2x2ZSBQcm9taXNl55qEcmVzb2x2ZSDlh73mlbBcclxuICAgICAqIEBwYXJhbSByZWplY3QgIFByb21pc+eahHJlamVjdCDlh73mlbBcclxuICAgICAqL1xyXG4gICAgbGV0IGhhbmRsZUNoYW5nZUNhcmQgPSAodmFsLCByZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBkaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe3N0b3JlUmVjZWl2ZUNhcmRPYmo6IHZhbH0pKVxyXG4gICAgICAgIHJlc29sdmUoKVxyXG4gICAgICAgIENhcmRMaXN0LkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4fosIPnlKjlrqLmiLfnq6/mj5Lku7bmt7vliqDmlrDnmoTpk7booYzljaFcclxuICAgICAqIEBwYXJhbSByZXN1bHQgIOa3u+WKoOmTtuihjOWNoeeahOe7k+aenCAgc2VsZWN0SW57J3N1Y2Nlc3MnLCdmYWlsJ31cclxuICAgICAqL1xyXG4gICAgbGV0IGFkZENhcmQgPSAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmt7vliqDpk7booYzljaHmiJDlip9cIilcclxuICAgICAgICBpZiAocmVzdWx0ID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2NDYXJkTGlzdC5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuZ2V0TWNjQ2FyZExpc3Quc2Vjb25kS2V5KVxyXG4gICAgICAgICAgICBnZXRDYXJkbGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDYXJkTGlzdC5DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05pS5cmVkdXjkuK3nmoTmjqjojZDkurrmiYvmnLrlj7fnmoTlgLxcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDnlKjmiLfovpPlhaXnmoTlgLxcclxuICAgICAqL1xyXG4gICAgbGV0IGNoYW5nZVJlY29tbWVuZFBob25lPSh2YWx1ZSk9PntcclxuICAgICAgICBkaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe3JlY29tbWVuZFBob25lOiB2YWx1ZX0pKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNoYW5nZVN0b3JlTmFtZTogY2hhbmdlU3RvcmVOYW1lLFxyXG4gICAgICAgIGhhbmRsZUNoYW5nZUNhcmQ6IGhhbmRsZUNoYW5nZUNhcmQsXHJcbiAgICAgICAgYWRkQ2FyZDogYWRkQ2FyZCxcclxuICAgICAgICBjaGFuZ2VSZWNvbW1lbmRQaG9uZTpjaGFuZ2VSZWNvbW1lbmRQaG9uZVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwc3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRoVG9Qcm9wcykoU3RvcmVJbmZvbWF0aW9uQ29udGFpbmVyKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvU3RvcmVJbmZvbWF0aW9uL1N0b3JlSW5mb21hdGlvbkNvbnRhaW5lci5qcyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBuYXZpZ2F0b3IgPSBnbG9iYWwubmF2aWdhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50IHx8ICcnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanNcbi8vIG1vZHVsZSBpZCA9IGVjNmNiZTMxN2I5ODUwYjA1Y2U1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSBlZjUxZDQ5ODlmMzA0NGIyZWIzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBDYXJkbGlzdFBhbmVsIGZyb20gXCIuL0NhcmRsaXN0UGFuZWxcIlxyXG5cclxuaW1wb3J0IFwiLi9jYXJkbGlzdC5zY3NzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmRsaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnN0YXRlPXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZToge31cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgLyoqIOW8gOWPkemhtemdoueahHRpdGxlICAgICovXHJcbiAgICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgLyoqIOWNoeWIl+ihqOmbhuWQiCovXHJcbiAgICAgICAgZGF0YTogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgLyoqIOW9k+mAieWNoeWPkeeUn+aUueWPmOaXtueahOWbnuaOieWHveaVsCAqL1xyXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICAvKiog54K55Ye7bWFzayDmiJbov5Tlm57mjInpkq7ml7bnmoTlm57mjonlh73mlbAqL1xyXG4gICAgICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIC8qKiDkvYbliY3pgInkuK3nmoTlgLwqL1xyXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgICAgIC8qKiDmmK/lkKbmmL7npLrlj7PkvqfnmoTnoa7lrprmjInpkq4qL1xyXG4gICAgICAgIHNob3dSaWdodEJhcjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgLyoqIOaYr+WQpuaLpeaciea3u+WKoOWNoeeahOWKn+iDvSAgICAgICAgICovXHJcbiAgICAgICAgaGF2ZUFkZENhcmQ6UHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgLyoqIOa3u+WKoOmTtuihjOWNoeWQjueahOWbnuaOieWHveaVsO+8jOaOpeWPl+S4gOS4quWPguaVsOexu+Wei+S4uiBzdHJpbmcgIFwic3VjY2Vzc1wiIOihqOekuua3u+WKoOaIkOWKnyovXHJcbiAgICAgICAgYWRkQ2FyZENhbGxiYWNrOlByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIC8qKiDmt7vliqDljaHml7bnmoTlnLrmma/lj7cqL1xyXG4gICAgICAgIGFkZFNlbmVObzpQcm9wVHlwZXMuc3RyaW5nXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBDbG9zZSgpe1xyXG4gICAgICAgIGxldCBub2RlPWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJSZWFjdEJhbmtDYXJkbGlzdFwiKVswXTtcclxuICAgICAgICBpZighIW5vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKG5vZGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vIGhhbmRsZUNoYW5nZSA9IChpdGVtKSA9PiB7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkVmFsdWU6IGl0ZW19KVxyXG4gICAgLy9cclxuICAgIC8vIH1cclxuXHJcblxyXG4gICAgb25DbG9zZSA9ICgpID0+IHtcclxuICAgICAgICAhIXRoaXMucHJvcHMub25DbG9zZSAmJiB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcclxuICAgICAgICBsZXQgbm9kZT1kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiUmVhY3RCYW5rQ2FyZGxpc3RcIilbMF07XHJcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShub2RlKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlrZDnu4Tku7bngrnlh7vnmoTml7blgJnnmoTlpITnkIbml7bpl7RcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBoYW5kbGVDaGlsZENsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBsZXQgbm9kZT1kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiUmVhY3RCYW5rQ2FyZGxpc3RcIilbMF07XHJcbiAgICAgICAgaWYoIW5vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgLy8g5Yib5bu6IERPTVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gJ1JlYWN0QmFua0NhcmRsaXN0JzsgLy8g57uZ5LiKIENsYXNzTmFtZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHRoaXMubm9kZSkvL+e7mWJvZHnmt7vliqDkuIDkuKpkaXZcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNhcmRwYW5lbCA9IChcclxuICAgICAgICAgICAgPENhcmRsaXN0UGFuZWwgey4uLnRoaXMucHJvcHN9IG9uQ2xvc2U9e3RoaXMub25DbG9zZX0gY2hhbmdlQ2hpbGRTaG93PXt0aGlzLmhhbmRsZUNoYW5nZX0vPlxyXG4gICAgICAgIClcclxuICAgICAgICBsZXQgYWxsQ2xhc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdSZWFjdEJhbmtDYXJkbGlzdCcpO1xyXG4gICAgICAgIFJlYWN0RE9NLnJlbmRlcihjYXJkcGFuZWwsIGFsbENsYXNzW2FsbENsYXNzLmxlbmd0aCAtIDFdKVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgbGV0IHt2YWx1ZSxkYXRhfSA9dGhpcy5wcm9wcztcclxuICAgICAgICBpZih2YWx1ZSAhPXVuZGVmaW5lZCAmJiAodmFsdWUudmlydHVhbENhcmRObyAhPSB1bmRlZmluZWR8fHZhbHVlLnBhbiAhPXVuZGVmaW5lZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS52aXJ0dWFsQ2FyZE5vID09IHZhbHVlLnZpcnR1YWxDYXJkTm98fGl0ZW0ucGFuID09dmFsdWUucGFuKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaW5kZXhdLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaW5kZXhdLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodG9TdHJpbmcuY2FsbCh0aGlzLnByb3BzLmNoaWxkcmVuKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICB7UmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmE6IHRoaXMuc3RhdGUuc2VsZWN0ZWRWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2hpbGRDbGljayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnByb3BzLmNoaWxkcmVuICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW4sIHtcclxuICAgICAgICAgICAgICAgIGV4dHJhOiB0aGlzLnByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDaGlsZENsaWNrXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvVG9vbHMvQ2FyZGxpc3QvQ2FyZGxpc3QuanMiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qc1xuLy8gbW9kdWxlIGlkID0gZjBkYmMxMGM2OGRkODE0MDE0ZTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4vX3VzZXItYWdlbnQnKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52OCB8fCAnJztcbnZhciAkUHJvbWlzZSA9IGdsb2JhbFtQUk9NSVNFXTtcbnZhciBpc05vZGUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbnZhciBlbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBJbnRlcm5hbCwgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBPd25Qcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIHZhciBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICAgIGV4ZWMoZW1wdHksIGVtcHR5KTtcbiAgICB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpXG4gICAgICAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2VcbiAgICAgIC8vIHY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTgzMDU2NVxuICAgICAgLy8gd2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgICAgICYmIHY4LmluZGV4T2YoJzYuNicpICE9PSAwXG4gICAgICAmJiB1c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lLzY2JykgPT09IC0xO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuLCBleGl0ZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7IC8vIG1heSB0aHJvd1xuICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgICAgICBleGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaSkgcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKSBvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIHVuaGFuZGxlZCA9IGlzVW5oYW5kbGVkKHByb21pc2UpO1xuICAgIHZhciByZXN1bHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYgKHVuaGFuZGxlZCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKSB7XG4gICAgICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodW5oYW5kbGVkICYmIHJlc3VsdC5lKSB0aHJvdyByZXN1bHQudjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgcmV0dXJuIHByb21pc2UuX2ggIT09IDEgJiYgKHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYykubGVuZ3RoID09PSAwO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gZmE5ODdkODExZTRlYjJkNDNkOWNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4Il0sInNvdXJjZVJvb3QiOiIifQ==