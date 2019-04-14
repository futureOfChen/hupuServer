webpackJsonp([4],{

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
                            style: { backgroundImage: "url('https://wallet.95516.com/s/wl/icon/default/" + item.iconRelUrl + "')" } }),
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
                            style: { backgroundImage: "url('https://wallet.95516.com/s/wl/icon/default/" + item.iconRelUrl + "')" } }),
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

/***/ "3c24d38ffcd0c38e3477":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("1679851be27b268ea24e"), __esModule: true };

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

/***/ "55bc55c0af7fc3d3d4d2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _modal = __webpack_require__("cc81f23a066389bd7f8d");

var _modal2 = _interopRequireDefault(_modal);

var _Cardlist = __webpack_require__("f082854b3263c1ba7d85");

var _Cardlist2 = _interopRequireDefault(_Cardlist);

var _CollectionBankCard = __webpack_require__("87217ffa572810598828");

var _CollectionBankCard2 = _interopRequireDefault(_CollectionBankCard);

var _config = __webpack_require__("8653d9474e130320c382");

var _config2 = _interopRequireDefault(_config);

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

var _request = __webpack_require__("76fb50331ac78bf18670");

var _store = __webpack_require__("729bd0f3009c1858d0f9");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__("5d4604b08304c597d074");

var _cacheStorage = __webpack_require__("8688ab3c6978d6c41524");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollectionBankCardContainer = function (_Component) {
    (0, _inherits3.default)(CollectionBankCardContainer, _Component);

    function CollectionBankCardContainer() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, CollectionBankCardContainer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CollectionBankCardContainer.__proto__ || (0, _getPrototypeOf2.default)(CollectionBankCardContainer)).call.apply(_ref, [this].concat(args))), _this), _this.initDefaultCard = function () {
            var _this$props$mchntDeta = _this.props.mchntDetail,
                bankNm = _this$props$mchntDeta.bankNm,
                iconRelUrl = _this$props$mchntDeta.iconRelUrl,
                cardType = _this$props$mchntDeta.cardType,
                cardNo = _this$props$mchntDeta.cardNo;

            var FLAG_CARD_TYPE_USEFUL = '01'; // 可用卡片借记卡的标识符
            var NAME_CARD_USEFUL = '借记卡'; // 可用的卡的卡名称：借记卡
            var defaultCard = {
                bank: bankNm || '', //银行名称
                iconRelUrl: iconRelUrl || '', //银行logo的URL地址
                cardType: cardType == FLAG_CARD_TYPE_USEFUL ? NAME_CARD_USEFUL : '', // 卡类型
                pan: cardNo || '' //虚拟卡号

                // 设置store中的收款银行卡信心
            };_store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({ storeReceiveCardObj: defaultCard }));
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(CollectionBankCardContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _request.beforeEnterRouter)('收款银行卡');
            this.initDefaultCard();
            // 获取银行卡列表
            (0, _requestAPI.getCardlist)();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _Cardlist2.default.Close();
        }
        /**
         * 根据mchntDetail(店铺详情)，初始化默认收款银行卡
         */

    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_CollectionBankCard2.default, this.props);
        }
    }]);
    return CollectionBankCardContainer;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {
    return {
        mchntDetail: state.getIn(['mchntDetail']).toJS(), //店铺信息详情
        storeReceiveCardObj: state.getIn(['storeReceiveCardObj']).toJS(), //收款银行卡信息
        cardList: state.getIn(['cardList']).toJS() //银行卡列表
    };
};

var mapDispathToProps = function mapDispathToProps(dispatch) {

    /**
     * 处理银行卡的切换
     * @param val  选中的卡对象
     * @param resolve Promise的resolve 函数
     * @param reject  Promis的reject 函数
     */
    var handleChangeCard = function handleChangeCard(val, resolve, reject) {
        console.log('准备换卡');
        _modal2.default.alert('提示', '通过收款码得到的收入将进入更换后的银行卡请确认是否更换收款卡', [{
            text: '取消', onPress: function onPress() {
                reject();
            }
        }, {
            text: '确认', onPress: function onPress() {
                (0, _requestAPI.updateMccCard)({ virtualCardNo: val.virtualCardNo }).then(function (res) {
                    if (res.statusCode == _config2.default.STATUSCODE.SUCCESS) {
                        // 更新redux中的收款银行开信息
                        var bank = val.bank,
                            cardType = val.cardType,
                            iconRelUrl = val.iconRelUrl,
                            pan = val.pan;

                        dispatch((0, _action.UPDATE_STORE_STATE)({
                            storeReceiveCardObj: val, mchntDetail: {
                                cardNo: pan,
                                bankNm: bank,
                                iconRelUrl: iconRelUrl,
                                cardType: cardType
                            }
                        }));
                        resolve();
                        _Cardlist2.default.Close();
                    } else {
                        _Cardlist2.default.Close();
                        reject();
                    }
                });
            }
        }]);
    };

    /**
     * 通过调用客户端插件添加新的银行卡
     * @param result  添加银行卡的结果  selectIn{'success','fail'}
     */
    var addCard = function addCard(result) {
        console.log("添加银行卡成功");
        if (result == "success") {
            // 删除用户收款卡列表的localStorage缓存
            (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.getMccCardList.rollKey, _config2.default.CACHEKEY.getMccCardList.secondKey);
            (0, _requestAPI.getCardlist)();
        }
        _Cardlist2.default.Close();
    };
    return {
        handleChangeCard: handleChangeCard,
        addCard: addCard
    };
};
exports.default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(CollectionBankCardContainer);

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

/***/ "6df1f81ce2e1991eb255":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"CBC":"CBC","headTitle":"headTitle","storeName":"storeName","tips-warp-div":"tips-warp-div","tipsIcon":"tipsIcon","bankCard-selector-div":"bankCard-selector-div","bankIcon":"bankIcon","bankName":"bankName","gray":"gray","inner":"inner"};

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

/***/ "87217ffa572810598828":
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

__webpack_require__("6df1f81ce2e1991eb255");

var _Cardlist = __webpack_require__("f082854b3263c1ba7d85");

var _Cardlist2 = _interopRequireDefault(_Cardlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollectionBankCard = function (_React$Component) {
    (0, _inherits3.default)(CollectionBankCard, _React$Component);

    function CollectionBankCard() {
        (0, _classCallCheck3.default)(this, CollectionBankCard);
        return (0, _possibleConstructorReturn3.default)(this, (CollectionBankCard.__proto__ || (0, _getPrototypeOf2.default)(CollectionBankCard)).apply(this, arguments));
    }

    (0, _createClass3.default)(CollectionBankCard, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                storeReceiveCardObj = _props.storeReceiveCardObj,
                addCard = _props.addCard,
                handleChangeCard = _props.handleChangeCard,
                cardList = _props.cardList;

            console.log(this.props);
            return _react2.default.createElement(
                "div",
                { id: "CBC" },
                _react2.default.createElement(
                    "div",
                    { id: "contentWarp" },
                    _react2.default.createElement(
                        "div",
                        { className: "tips-warp-div" },
                        "\u5F53\u524D\u6536\u6B3E\u94F6\u884C\u5361"
                    ),
                    _react2.default.createElement(
                        _Cardlist2.default,
                        {
                            addSeneNo: "10020", data: cardList, value: storeReceiveCardObj, haveAddCard: true,
                            addCardCallback: addCard, title: '选择收款银行卡', onChange: handleChangeCard },
                        _react2.default.createElement(ShowSelectedCard, null)
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "tips-warp-div" },
                        _react2.default.createElement("i", { className: "tipsIcon" }),
                        "\u901A\u8FC7\u6536\u6B3E\u7801\u6536\u5165\u7684\u94B1\u6B3E\u5C06\u4F1A\u8FDB\u5165\u8BE5\u94F6\u884C\u5361"
                    ),
                    _react2.default.createElement("div", { className: "inner" })
                )
            );
        }
    }]);
    return CollectionBankCard;
}(_react2.default.Component);

exports.default = CollectionBankCard;


var ShowSelectedCard = function ShowSelectedCard(props) {
    var styleObj = {
        color: '#4A90E2 ',
        fontSize: 'rem(32)',
        lineHeight: 'rem(28)'
    };
    return _react2.default.createElement(
        "div",
        null,
        !!props.extra.iconRelUrl ? _react2.default.createElement(
            "div",
            { className: "bankCard-selector-div", onClick: props.onClick },
            _react2.default.createElement("i", { className: "bankIcon",
                style: { backgroundImage: "url('https://wallet.95516.com/s/wl/icon/default/" + props.extra.iconRelUrl + "')" } }),
            _react2.default.createElement(
                "span",
                {
                    className: "bankName" },
                props.extra.bank + props.extra.cardType + "(" + props.extra.pan + ")"
            ),
            _react2.default.createElement(
                "span",
                { style: styleObj },
                "\u66F4\u6362"
            )
        ) : _react2.default.createElement(
            "div",
            { className: "bankCard-selector-div", onClick: props.onClick },
            _react2.default.createElement(
                "span",
                { className: "bankName gray", style: { textAlign: "center" } },
                "\u70B9\u51FB\u6B64\u5904\u9009\u62E9\u60A8\u7684\u94F6\u884C\u5361"
            ),
            _react2.default.createElement(
                "span",
                { style: styleObj },
                "\u66F4\u6362"
            ),
            _react2.default.createElement("i", { className: "rightArrow" })
        )
    );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub29scy9DYXJkbGlzdC9DYXJMaXN0VUwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbkJhbmtDYXJkL0NvbGxlY3Rpb25CYW5rQ2FyZENvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25CYW5rQ2FyZC9Db2xsZWN0aW9uQmFua0NhcmQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub29scy9DYXJkbGlzdC9jYXJkbGlzdC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uQmFua0NhcmQvQ29sbGVjdGlvbkJhbmtDYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub29scy9DYXJkbGlzdC9DYXJkbGlzdFBhbmVsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191c2VyLWFnZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub29scy9DYXJkbGlzdC9DYXJkbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanMiXSwibmFtZXMiOlsicmVjbWRSZWNvcmQiLCJzaGFybGluayIsImlzQmxhY2siLCJpc0FwcGx5IiwiYXBwbHlNY2MiLCJnZXRDYXJkbGlzdCIsImdldEFkZHJMaXN0IiwiYXBwbHlNYXQiLCJnZXRRclVybFJlc3QiLCJnZXRNY2hudEFuZEFyZWFJbmYiLCJnZXRNY2hudERldGFpbCIsInVwZ3JhZGVNY2MiLCJnZXRQcm90b2NvbEluZm8iLCJnZXRIaXN0b3J5SW5jb21lIiwiZ2V0SGlzdG9yeVRyYW5zIiwiZ2V0VG9kYXlJbmNvbWUiLCJnZXRUb2RheVRyYW5zIiwiZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bSIsImdldExvZ2lzdGljc1N0IiwiZ2V0VXBncmFkZVN0IiwiZ2V0TG9naXN0aWNzTGlzdCIsImdldEF1ZGl0SW5mbyIsImdldExpbWl0QXRJbmZvIiwibWNobnRPcGVyIiwiZGVsZXRlQWRkcmVzcyIsInVwZGF0ZU1jY0NhcmQiLCJuZXdBZGRyZXNzIiwiZWRpdEFkZHJlc3MiLCJzZXRNY2NPbk9mZiIsImdldE1jY1RyYW5zTnVtIiwicGhvbmUiLCJ1bmRlZmluZWQiLCJyZWNtZE1vYmlsZSIsIlV0aWwiLCJiYXNlNjRFbmNvZGUiLCJDT05GSUciLCJSRVNUIiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzQ29kZSIsIlNUQVRVU0NPREUiLCJTVUNDRVNTIiwicm9sbEtleSIsIkNBQ0hFS0VZIiwic2Vjb25kS2V5IiwiZnVsbCIsInJlc29sdmUiLCJzaGFyZUxpbmsiLCJyZWRVcmxTdHIiLCJkYXRhIiwiaWRlbnRpZmllciIsIm5leHRTdGF0ZSIsInN0b3JlIiwiZGlzcGF0Y2giLCJ1cGRhdGUiLCJ1cGRhdGVGdW5jIiwicmVzcCIsImJsYWNrU3QiLCJjb25zb2xlIiwibG9nIiwiY2FjaGVQYXJhbSIsImFwcGx5U3QiLCJwYXJhbSIsInJlZmVyZWVUZWwiLCJ2aXJ0dWFsQ2FyZE5vIiwiYWNjTm0iLCJjaXR5Q2QiLCJjb21vbVBhcmFtIiwiZ2V0TWNjQ2FyZExpc3QiLCJjYXJkTGlzdCIsImxlbmd0aCIsImRlZmFsdXRDYXJkIiwiYmFuayIsImNhcmRUeXBlIiwiZnVuY3Rpb25CaXRtYXAiLCJpY29uUmVsVXJsIiwiaXNTdXBwb3J0IiwicGFuIiwicmFuayIsInNlbGVjdGVkIiwiZm9yRWFjaCIsIml0ZW0iLCJrIiwic3RvcmVTdGF0ZSIsInN0b3JlUmVjZWl2ZUNhcmRPYmoiLCJzdGF0ZSIsImFkZHJlc3NMaXN0IiwicmVzdWx0IiwibWF0ZXJpYWxMaXN0IiwiZGVsaXZObSIsImFkZEFsbCIsImRlbGl2UGhvbmUiLCJwcm92aW5jZUlkIiwiY2l0eUlkIiwiYXJlYUlkIiwiYWRkcmVzc0luZm8iLCJpZCIsImNpdHlObSIsInJlZFVybCIsImdldFFyVXJsIiwibWNobnREZXRhaWwiLCJxclVybCIsInFyTnVtIiwiYXJlYSIsIm1lcmNoYW50VHAiLCJhcmVhQXJyIiwicHJvdmluY2UiLCJvbmUiLCJwcm9JZCIsInByb05tIiwidHdvIiwiY2l0eSIsInRocmVlIiwidmFsdWUiLCJjaGlsZHJlbiIsInB1c2giLCJhcmVhTm0iLCJtZXJjaGFudFRwQXJyIiwibWVyVHlwZTEiLCJtZXJjaGFudFRwQ2QiLCJtZXJjaGFudFRwTm0iLCJtZXJUeXBlMiIsIm1jaG50QW5kQXJlYUluZiIsInN0b3JlTm0iLCJTdG9yZVRwIiwicHJvdkNkIiwiY291dHlDZCIsImFkZHIiLCJjZXJ0aWZQaWMxIiwiY2VydGlmUGljMiIsImNlcnRpZlBpYzMiLCJsaWNlbnNlUGljIiwic2hvcFBpYzEiLCJzaG9wUGljMiIsImF1eFByb3ZNYXQxIiwiYXV4UHJvdk1hdDIiLCJzaG9wTG9nb1BpYyIsIlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0IiwicmVzIiwiaGlzdG9yeUluY29tZU9iaiIsIm9yaWdpbkxpc3REYXRhIiwiZ2V0U3RhdGUiLCJnZXRJbiIsInRvSlMiLCJuZXdMaXN0IiwidHJhbnNJbmZvIiwiaGlzdG9yeU9yZGVyTGlzdCIsImNvbmNhdCIsInRvZGF5SW5jb21lT2JqIiwidG9kYXlPcmRlckxpc3QiLCJuZXdPYmoiLCJkZWxpdmVyeU1zZyIsIm1hdERlbGl2U3RhdHVzIiwibGltaXRJbmZvIiwiaXNVc2VNY2MiLCJtY2NUcmFuc051bSIsInRyYW5zTnVtIiwiQ2FyTGlzdFVMIiwicHJvcHMiLCJjb250ZXh0IiwiaGFuZGxlQ2xpY2siLCJvbkNoYW5nZSIsImdldEl0ZW1zIiwibGlzdEl0ZW1zIiwibWFwIiwiaW5kZXgiLCJpc09ubHlTaG93IiwiYmFja2dyb3VuZEltYWdlIiwiYmluZCIsImFkZFByb3ZpY2UiLCJsaXN0SXRlbSIsIlJlYWN0IiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYW55IiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJib29sIiwiZGVmYXVsdFByb3BzIiwiQ29sbGVjdGlvbkJhbmtDYXJkQ29udGFpbmVyIiwiaW5pdERlZmF1bHRDYXJkIiwiYmFua05tIiwiY2FyZE5vIiwiRkxBR19DQVJEX1RZUEVfVVNFRlVMIiwiTkFNRV9DQVJEX1VTRUZVTCIsImRlZmF1bHRDYXJkIiwiQ2FyZExpc3QiLCJDbG9zZSIsIm1hcHN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGhUb1Byb3BzIiwiaGFuZGxlQ2hhbmdlQ2FyZCIsInZhbCIsInJlamVjdCIsIk1vZGFsIiwiYWxlcnQiLCJ0ZXh0Iiwib25QcmVzcyIsImFkZENhcmQiLCJyZXF1ZXN0Iiwic2V0WGlhb1dlaVBheSIsIndpbmRvdyIsIlVQIiwiVyIsIkFwcCIsIkVudiIsInJlZ1Bob25lIiwicmVnUGF5TnVtIiwidmVyc2lvbiIsInNvdXJjZSIsImJhc2VVcmwiLCJiYXNlVXJsMiIsImJhc2VVcmwzIiwibG9jYXRpb24iLCJob3N0bmFtZSIsImluZGV4T2YiLCJwcm90b2NvbCIsImdldFNlcnZVcmwiLCJ1cmwiLCJzZXJ2ZXJVcmwiLCJ1c2VySW5mbyIsInNwbGl0IiwiZ2V0Q2l0eSIsInJlc3BvbnNlRm9ybWF0dGVyIiwicGFyYW1zIiwibXNnIiwiZGVsZXRlU2xhc2giLCJob3N0IiwicmVwbGFjZSIsImFkZFNsYXNoIiwicGF0aCIsInRlc3QiLCJzZXBhcmF0ZVBhcmFtcyIsInBhcmFtc0xpbmUiLCJrZXkiLCJjb25maWciLCJtZXRob2QiLCJ0b1VwcGVyQ2FzZSIsImZpbmFsVXJsIiwib3B0aW9ucyIsInR5cGUiLCJzdWNjZXNzIiwiZXJyb3IiLCJFcnJvciIsImRhdGFUeXBlIiwiJCIsImFqYXgiLCJnZXQiLCJwYXJhbUFsbCIsImZvckNoc3AiLCJlbmNyeXB0IiwiY2FjaGUiLCJieUFqYXgiLCJwb3N0IiwicHV0IiwiZGVsIiwiZ2V0U2VhcmNoUGFyYW0iLCJzZWFyY2giLCJzdHIiLCJzbGljZSIsImFycmF5Iiwib2JqIiwic3VjIiwiZXJyIiwiYXBwIiwic2V0WGlhb1dlaUF1ZGlvIiwiZ2V0WGlhb1dlaUF1ZGlvIiwidG9hc3QiLCJtcyIsIlRvYXN0IiwiaW5mbyIsImJlZm9yZUVudGVyUm91dGVyIiwidGl0bGUiLCJyaWdodEJhciIsInJpZ2h0Q2FsbGJhY2siLCJyaWdodEJhckltZyIsImRvY3VtZW50Iiwib25QbHVnaW5SZWFkeSIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInNldE5hdmlnYXRpb25CYXJSaWdodEJ1dHRvbiIsIm1jY1N0YXRlQ2hhbmdlZCIsInNlbmRRckNvZGUiLCJmYWlsIiwic2NhblFSQ29kZSIsImNsb3NlV2ViVmlldyIsInZlcmlmeVBheVB3ZCIsImNyZWF0ZVdlYlZpZXciLCJpc0ZpbmlzaCIsImdldFVzZXJEZXRhaWxJbmZvIiwic2F2ZVFjb2RlIiwiY2FudmFzIiwidWkiLCJVSSIsInBpY1VybCIsInRvRGF0YVVSTCIsImxvZ0V2ZW50Iiwic2F2ZVBpY1RvTG9jYWwiLCJzdWJzdHIiLCJzaG93VG9hc3RXaXRoUGljIiwic2hvd0FsZXJ0IiwiZW52IiwiaXNJT1MiLCJvcGVuQnJvd3NlciIsInNob3dUb2FzdCIsInNoYXJlIiwiZGVzYyIsImltZ1VSTCIsInBhZ2VVUmwiLCJzaG93U2hhcmVQYW5lbCIsInNoYXJlVXJsIiwiZ2V0Q3VycmVudExvY2F0aW9uSW5mbyIsImNhbGxiYWNrMiIsInNob3dMb2FkaW5nIiwiY2FsbGJhY2siLCJkaXNtaXNzIiwic2VuZE1lc3NhZ2UiLCJjbWQiLCJmZXRjaE5hdGl2ZURhdGEiLCJ4aHIiLCJjcmVhdGVUZXh0Q2FudmFzZSIsImNvbG9yIiwibG9uZyIsInNob3QiLCJyZW0ycHgiLCJjV2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsInNldEF0dHJpYnV0ZSIsIndpZHRoIiwicm90YXRlIiwiTWF0aCIsIlBJIiwiZmlsbFN0eWxlIiwidGV4dEFsaWduIiwiZm9udFNpemUiLCJmb250IiwibWVhc3VyZVRleHQiLCJmaWxsVGV4dCIsImNyZWF0ZUNvbnZhc0FuZFNhdmVQaG90byIsImNhbnZhc09iaiIsImJndXJsIiwicXJjb2RlVVJMIiwicXJjb2RlV2RBbmRIZyIsInhXaWR0aCIsInlIZWlnaHQiLCJ0ZXh0YmdVUkwiLCJ4VGV4dFdpZHRoIiwieVRleHRIZWlnaHQiLCJpbWciLCJJbWFnZSIsInNyYyIsIm9ubG9hZCIsImhlaWdodCIsImRyYXdJbWFnZSIsInRleHRVcmkiLCJ0ZXh0SW1nIiwicXJjb2RlV2lkdGhBbmRIZWlnaHQiLCJpbm5lckhUTUwiLCJxcmNvZGUiLCJRUkNvZGUiLCJjb3JyZWN0TGV2ZWwiLCJDb3JyZWN0TGV2ZWwiLCJMIiwicXJjb2RlSW1nIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJxcmNvZGVEeCIsInFyY29kZUR5IiwiZ2V0TWF0ZXJpZWxJbmZvTGlzdCIsImdldFJld2FyZExpc3QiLCJDT05TVF9EQVRBIiwiaW1nZVNpemUiLCJjYWNoZUZpcnN0IiwidGltZSIsInN0b3JhZ2UiLCJ2YWxpZGF0ZVRpbWUiLCJjYWNoZUZpcnN0U3RvcmFnZSIsIm5lZWRTdyIsInN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSIsInJlZnJlc2hEb21GdW5jIiwicmVxIiwiZGF0YUZyb21DYWNoZSIsImdldEZyb21TdG9yYWdlIiwicmVtb3ZlU3RvcmFnZSIsImlzU2FtZUF0QWxsIiwiSW1tdXRhYmxlIiwiaXMiLCJmcm9tSlMiLCJhc3luYyIsImVuZE9mU3luY0Z1bmMiLCJyZW1vdmVDYWNoZSIsIkNvbGxlY3Rpb25CYW5rQ2FyZCIsIlNob3dTZWxlY3RlZENhcmQiLCJzdHlsZU9iaiIsImxpbmVIZWlnaHQiLCJleHRyYSIsIm9uQ2xpY2siLCJDYXJkbGlzdFBhbmVsIiwiZGlzdHJpdERhdGEiLCJqaWVKaUthIiwiY2h1WHVrYSIsImhhbmRsZUNsb3NlIiwib25DbG9zZSIsImFkZE5ld0NhcmQiLCJzZWxmIiwiYWRkQmFua0NhcmQiLCJhZGRDYXJkQ2FsbGJhY2siLCJzY2VuZSIsImFkZFNlbmVObyIsImhhbmRsSXRlbUNoYW5nZSIsImNoYW5nZVN0YXRlIiwiY2F0Y2giLCJuZXdEYXRhIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInNob3dSaWdodEJhciIsImhhdmVBZGRDYXJkIiwic3RyaW5nIiwiY2hhbmdlQ2hpbGRTaG93IiwiQ2FyZGxpc3QiLCJub2RlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIlJlYWN0RE9NIiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsImhhbmRsZUNoaWxkQ2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImFwcGVuZENoaWxkIiwiY2FyZHBhbmVsIiwiaGFuZGxlQ2hhbmdlIiwiYWxsQ2xhc3MiLCJyZW5kZXIiLCJzZWxlY3RlZFZhbHVlIiwidG9TdHJpbmciLCJjYWxsIiwiQ2hpbGRyZW4iLCJjaGlsZCIsImNsb25lRWxlbWVudCIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFXZ0JBLFcsR0FBQUEsVztRQXlCQUMsUSxHQUFBQSxRO1FBaUJBQyxPLEdBQUFBLE87UUF1QkFDLE8sR0FBQUEsTztRQW9CQUMsUSxHQUFBQSxRO1FBMEJBQyxXLEdBQUFBLFc7UUFnREFDLFcsR0FBQUEsVztRQWdDQUMsUSxHQUFBQSxRO1FBb0JBQyxZLEdBQUFBLFk7UUFtQkFDLGtCLEdBQUFBLGtCO1FBbUhBQyxjLEdBQUFBLGM7UUFnQkFDLFUsR0FBQUEsVTtRQWdDQUMsZSxHQUFBQSxlO1FBZUFDLGdCLEdBQUFBLGdCO1FBZUFDLGUsR0FBQUEsZTtRQWlCQUMsYyxHQUFBQSxjO1FBZUFDLGEsR0FBQUEsYTtRQWdCQUMseUIsR0FBQUEseUI7UUFNQUMsYyxHQUFBQSxjO1FBdUJBQyxZLEdBQUFBLFk7UUFXQUMsZ0IsR0FBQUEsZ0I7UUFZQUMsWSxHQUFBQSxZO1FBWUFDLGMsR0FBQUEsYztRQWFBQyxTLEdBQUFBLFM7UUFZQUMsYSxHQUFBQSxhO1FBZ0JBQyxhLEdBQUFBLGE7UUFlQUMsVSxHQUFBQSxVO1FBYUFDLFcsR0FBQUEsVztRQWVBQyxXLEdBQUFBLFc7UUFZQUMsYyxHQUFBQSxjOztBQWxvQmhCOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FB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QUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsd0JBQXdCO0FBQ3hCLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEI7QUFDQSx1QkFBdUIsbUJBQU8sQ0FBQyxzQkFBaUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBEQUEwRCxvQkFBb0I7QUFDOUUsbUJBQU8sQ0FBQyxzQkFBc0I7QUFDOUIsbUJBQU8sQ0FBQyxzQkFBZ0I7QUFDeEIsVUFBVSxtQkFBTyxDQUFDLHNCQUFTOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxnREFBZ0QsbUJBQU8sQ0FBQyxzQkFBZ0I7QUFDeEU7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6ImNodW5rL0NvbGxlY3Rpb25CYW5rQ2FyZC5mOWY5ZDUyZTg3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjb21vbVBhcmFtLCBnZXQsIHBvc3QsIFV0aWx9IGZyb20gXCIuL3JlcXVlc3RcIjtcclxuaW1wb3J0IENPTkZJRyBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHt9IGZyb20gXCIuL2NhY2hlU3RvcmFnZVwiO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSBcIi4uLy4uL3N0b3JlL3N0b3JlXCI7XHJcbmltcG9ydCB7VVBEQVRFX1NUT1JFX1NUQVRFfSBmcm9tIFwiLi4vLi4vc3RvcmUvYWN0aW9uXCI7XHJcbmltcG9ydCB7Y2FjaGVGaXJzdCxjYWNoZUZpcnN0U3RvcmFnZSxzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UscmVtb3ZlQ2FjaGV9IGZyb20gXCIuL2NhY2hlU3RvcmFnZVwiO1xyXG5cclxuLyoqXHJcbiAqIOeUs+ivt+e6ouWMheeggeeahOivt+axglxyXG4gKiBAcGFyYW0gcGhvbmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWNtZFJlY29yZChwaG9uZSkge1xyXG4gICAgaWYgKHBob25lID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHBob25lID0gXCJcIlxyXG4gICAgfVxyXG4gICAgbGV0IHJlY21kTW9iaWxlID0gVXRpbC5iYXNlNjRFbmNvZGUocGhvbmUpXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5yZWNtZFJlY29yZCwge3JlY21kTW9iaWxlfSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk55So5oi35piv5ZCm55Sz6K+357qi5YyF56CB5o6l5Y+j55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgIHJvbGxLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleVxyXG4gICAgICAgICAgICB9LCgpPT57fSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGw6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOivt+axgue6ouWMheWQl+i/nuaOpVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNoYXJsaW5rKCkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1Quc2hhcmVMaW5rLCB7fSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIGxldCByZWRVcmxTdHI9IFwiaHR0cHM6Ly93YWxsZXQuOTU1MTYuY29tL3Mvd2wvd2ViVjMvYWN0aXZpdHkvdk1hcmtldGluZzIvaHRtbC9zbnNJbmRleC5odG1sP3I9XCIgKyByZXNwb25zZS5kYXRhLmlkZW50aWZpZXI7XHJcbiAgICAgICAgICAgIGxldCBuZXh0U3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICByZWRVcmxTdHJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUobmV4dFN0YXRlKSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWRVcmxTdHIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5piv5ZCm5Zyo55m95ZCN5Y2V55qE6K+35rGCXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNCbGFjayh1cGRhdGUpIHtcclxuICAgIGxldCB1cGRhdGVGdW5jID0gZnVuY3Rpb24ocmVzcCl7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYmxhY2tTdDpyZXNwLmRhdGEuYmxhY2tTdFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpc0JsYWNrOiB1cGRhdGXlh73mlbDmiafooYzlrozmr5UnKTtcclxuICAgICAgICBpZiggdHlwZW9mIHVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJyApe1xyXG4gICAgICAgICAgICB1cGRhdGUocmVzcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/or7vlj5bnvJPlrZjvvIzlkIzml7blvILmraXlj5HpgIHor7fmsYJcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmlzQmxhY2sse30sc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlKHVwZGF0ZUZ1bmMpKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBibGFja1N0OnJlc3BvbnNlLmRhdGEuYmxhY2tTdFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOaYr+WQpuWcqOm7keWQjeWNleeahOivt+axglxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FwcGx5KCkge1xyXG4gICAgbGV0IGNhY2hlUGFyYW0gPSBjYWNoZUZpcnN0U3RvcmFnZSgzMCo2MCoxMDAwLENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleSk7Ly/nvJPlrZgzMOWIhumSn1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5pc0FwcGx5LCB7fSxjYWNoZVBhcmFtKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmFwcGx5U3QgIT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWmguaenOW3sue7j+eUs+ivt+i/h+e6ouWMheeggeWImee8k+WtmDMw5YiG6ZKf77yM5ZCm5YiZ5LiN57yT5a2YXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGFwcGx5U3Q6cmVzcG9uc2UuZGF0YS5hcHBseVN0XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog55Sz6K+35pS25qy+56CBXHJcbiAqIEBwYXJhbSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1jYyhwYXJhbSA9IHtcclxuICAgIHJlZmVyZWVUZWw6IFwiXCIsICAgICAgICAgLy/mjqjojZDkurrmiYvmnLrlj7dcclxuICAgIHZpcnR1YWxDYXJkTm86IFwiXCIsICAgICAgLy/omZrmi5/ljaHlj7dcclxuICAgIGFjY05tOiBcIlwiLCAgICAgICAgICAgICAgLy/lupfpk7rlkI3np7BcclxuICAgIGNpdHlDZDogXCJcIiAgICAgICAgICAgICAgIC8v5Z+O5biC5Luj56CBXHJcbn0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmFwcGx5TWNjLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk55So5oi35piv5ZCm55Sz6K+357qi5YyF56CB5o6l5Y+j55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgIHJvbGxLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleVxyXG4gICAgICAgICAgICB9LCgpPT57fSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGw6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueUqOaIt+eahOmTtuihjOWNoeWIl+ihqFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENhcmRsaXN0KCkge1xyXG4gICAgLy/ojrflj5bnlKjmiLfpk7booYzljaHliJfooajvvIznvJPlrZgx5YiG6ZKfXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldE1jY0NhcmRMaXN0LCBjb21vbVBhcmFtLGNhY2hlRmlyc3RTdG9yYWdlKDYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIC8v5aaC5p6c5ZCO5Y+w6L+U5Zue6ZO26KGM5Y2h5YiX6KGo5LiU5LiN5Li656m6XHJcbiAgICAgICAgaWYgKCEhcmVzcG9uc2UuZGF0YS5jYXJkTGlzdCAmJiByZXNwb25zZS5kYXRhLmNhcmRMaXN0Lmxlbmd0aCAhPSAwKSB7XHJcblxyXG4gICAgICAgICAgICAvL+WIneWni+WMlum7mOiupOWNoVxyXG4gICAgICAgICAgICBsZXQgZGVmYWx1dENhcmQgPSB7XHJcbiAgICAgICAgICAgICAgICBiYW5rOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h5omA5Zyo55qE6ZO26KGMXHJcbiAgICAgICAgICAgICAgICBjYXJkVHlwZTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHnsbvlnotcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uQml0bWFwOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeWKn+iDveS9jVxyXG4gICAgICAgICAgICAgICAgaWNvblJlbFVybDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h55qEbG9nb+WcsOWdgFxyXG4gICAgICAgICAgICAgICAgaXNTdXBwb3J0OiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKbmlK/mjIFcclxuICAgICAgICAgICAgICAgIHBhbjogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5bim5pyJ5o6p56CB55qE5Y2h5Y+3XHJcbiAgICAgICAgICAgICAgICByYW5rOiAwLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKbpgInkuK1cclxuICAgICAgICAgICAgICAgIHZpcnR1YWxDYXJkTm86IFwiXCIgICAvL+iZmuaLn+WNoeWPt1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFpdGVtLnNlbGVjdGVkICYmIGl0ZW0uaXNTdXBwb3J0ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhbHV0Q2FyZCA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8v5aaC5p6c5rKh5pyJ6buY6K6k6YCJ5Lit55qE5Y2h5Y+W5LiA5Liq5LiN6KKr572u5Li654Gw55qE5Y2h5Li66buY6K6k5Y2hXHJcbiAgICAgICAgICAgIGlmIChkZWZhbHV0Q2FyZC5iYW5rLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHJlc3BvbnNlLmRhdGEuY2FyZExpc3QubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5jYXJkTGlzdFtrXS5pc1N1cHBvcnQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhbHV0Q2FyZCA9IHJlc3BvbnNlLmRhdGEuY2FyZExpc3Rba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc3RvcmVTdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHN0b3JlUmVjZWl2ZUNhcmRPYmo6IGRlZmFsdXRDYXJkLFxyXG4gICAgICAgICAgICAgICAgY2FyZExpc3Q6IHJlc3BvbnNlLmRhdGEuY2FyZExpc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoc3RvcmVTdGF0ZSkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5Zyw5Z2A5YiX6KGoXHJcbiAqIEBwYXJhbSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBZGRyTGlzdChcclxuICAgIHVwZGF0ZSwgLy/nvJPlrZjnmoTmm7TmlrDlh73mlbBcclxuICAgIHBhcmFtID0ge1xyXG4gICAgICAgIHN0YXRlOiBcIlwiICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG4pIHtcclxuICAgIC8vIOivu+WPlue8k+WtmO+8jOWQjOaXtuW8guatpeWPkemAgeivt+axglxyXG4gICAgbGV0IHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbihyZXNwKXtcclxuICAgICAgICAvLyDlnKh1cGRhdGXlh73mlbDkuK3vvIzmm7TmlrByZWR1eOS4reeahGFkZHJlc3NMaXN0XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHthZGRyZXNzTGlzdDpyZXNwLmRhdGEucmVzdWx0fHxbXX0pKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0QWRkckxpc3Q6IHVwZGF0ZeWHveaVsOaJp+ihjOWujOavlScpO1xyXG4gICAgICAgIGlmKCB0eXBlb2YgdXBkYXRlID09PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICAgICAgdXBkYXRlKHJlc3ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBjYWNoZVBhcmFtID0gc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlKHVwZGF0ZUZ1bmMsQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSk7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRBZGRyTGlzdCwgT2JqZWN0LmFzc2lnbih7fSwgY29tb21QYXJhbSwgcGFyYW0pLGNhY2hlUGFyYW0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBhZGRyZXNzTGlzdCA9IHJlc3BvbnNlLmRhdGEucmVzdWx0IHx8IFtdO1xyXG5cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBhZGRyZXNzTGlzdFxyXG4gICAgICAgIH0pKVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOeUs+ivt+eJqeaWmeaOpeWPo1xyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNYXQocGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxMaXN0OiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v54mp5paZ5YiX6KGoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsaXZObTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pS26LSn5Lq6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkQWxsOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Yy65ZCN56ewXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsaXZQaG9uZTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pS26LSn55S16K+dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmluY2VJZDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v55yBSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5SWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/luIJJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFJZDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWMuklEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzc0luZm86IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6K+m57uG5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcnLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Z2A55qESURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5Tm06IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/miYDlnKjln47luIJDaXR5Q29kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZFVybDogXCJcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+e6ouWMheeggeWcsOWdgCAg5Y+v6YCJ5Y+C5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5hcHBseU1hdCwgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bllYbmiLfmlLbmrL7noIHlnLDlnYDlkozllYbmiLfnvJblj7dcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRRclVybFJlc3QoKSB7XHJcbiAgICAvL+e8k+WtmDLlsI/ml7ZcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0UXJVcmwsIGNhY2hlRmlyc3RTdG9yYWdlKDIqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIG1jaG50RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICBxclVybDogcmVzcG9uc2UuZGF0YS5xclVybCxcclxuICAgICAgICAgICAgICAgIHFyTnVtOiByZXNwb25zZS5kYXRhLnFyTnVtXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAq6I635Y+W5bqX6ZO65Yy65Z+f5YiX6KGo5ZKM5bqX6ZO657G75Z6L5YiX6KGoXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNY2hudEFuZEFyZWFJbmYoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5nkuKrmjqXlj6Ms5Y+q6LWwc3fvvIzkuI3otbBsb2FjYWxTdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIC8vIGxldCBjYWNoZVBhcmFtID0ge1xyXG4gICAgLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbiAgICAvLyAgICAgZm9yQ2hzcDpmYWxzZSxcclxuICAgIC8vICAgICBlbmNyeXB0OmZhbHNlLFxyXG4gICAgLy8gICAgIGNhY2hlOiB0cnVlXHJcbiAgICAvLyB9XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldE1jaG50QW5kQXJlYUluZiwgY29tb21QYXJhbSwgY2FjaGVGaXJzdCgyNCo2MCo2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBsZXQgYXJlYSA9IFtdLCBtZXJjaGFudFRwID0gW107XHJcblxyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog55yB57qnXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLmFyZWFBcnIuZm9yRWFjaCgocHJvdmluY2UpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb25lID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogcHJvdmluY2UucHJvSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBwcm92aW5jZS5wcm9ObSxcclxuICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvdmluY2UucHJvTm0gPT0gXCLljJfkuqzluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIuS4iua1t+W4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi5aSp5rSl5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLph43luobluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIua3seWcs+W4glwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBwcm92aW5jZS5wcm9JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBwcm92aW5jZS5wcm9ObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmluY2UuY2l0eS5mb3JFYWNoKChjaXR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aHJlZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogY2l0eS5jaXR5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IGNpdHkuY2l0eU5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aHJlZS52YWx1ZSAhPSB0d28udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR3by5jaGlsZHJlbi5wdXNoKHRocmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgb25lLmNoaWxkcmVuLnB1c2godHdvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIOW4gue6p1xyXG4gICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlLmNpdHkuZm9yRWFjaCgoY2l0eSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR3byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogY2l0eS5jaXR5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IGNpdHkuY2l0eU5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgICAgICog5Yy657qnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5LmFyZWEuZm9yRWFjaCgoYXJlYSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aHJlZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGFyZWEuYXJlYUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogYXJlYS5hcmVhTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR3by5jaGlsZHJlbi5wdXNoKHRocmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBhcmVhLnB1c2gob25lKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEubWVyY2hhbnRUcEFyci5mb3JFYWNoKChtZXJUeXBlMSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9uZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IG1lclR5cGUxLm1lcmNoYW50VHBDZCxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IG1lclR5cGUxLm1lcmNoYW50VHBObSxcclxuICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbWVyVHlwZTEubWVyY2hhbnRUcEFyci5mb3JFYWNoKChtZXJUeXBlMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogbWVyVHlwZTIubWVyY2hhbnRUcENkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IG1lclR5cGUyLm1lcmNoYW50VHBObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25lLmNoaWxkcmVuLnB1c2godHdvKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgbWVyY2hhbnRUcC5wdXNoKG9uZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXh0U3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG1jaG50QW5kQXJlYUluZjoge1xyXG4gICAgICAgICAgICAgICAgYXJlYUFycjogYXJlYSxcclxuICAgICAgICAgICAgICAgIG1lcmNoYW50VHBBcnI6IG1lcmNoYW50VHBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUobmV4dFN0YXRlKSlcclxuXHJcbiAgICB9KVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluW6l+mTuuivpuaDheS/oeaBr1xyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNY2hudERldGFpbCgpIHtcclxuICAgIGxldCBjYWNoZVBhcmFtID0gY2FjaGVGaXJzdFN0b3JhZ2UoNjAqMTAwMCxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTsvL+e8k+WtmDHliIbpkp9cclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldE1jaG50RGV0YWlsLCBjb21vbVBhcmFtLGNhY2hlUGFyYW0pLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICBpZiAocmVzcC5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1Mpe1xyXG4gICAgICAgICAgICBsZXQgbWNobnREZXRhaWwgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7bWNobnREZXRhaWx9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobWNobnREZXRhaWwpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDljYfnuqfllYbpk7rkuoznu7TnoIFcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZ3JhZGVNY2MocGFyYW09e1xyXG4gICAgc3RvcmVObTogXCJcIiwgICAgLy/lupfpk7rlkI3np7BcclxuICAgIFN0b3JlVHA6IFwiXCIsICAgIC8v5bqX6ZO657G75Z6LXHJcbiAgICBwcm92Q2Q6IFwiXCIsICAgICAvL+ecgUlEXHJcbiAgICBjaXR5Q2Q6IFwiXCIsICAgICAvL+W4gklEXHJcbiAgICBjb3V0eUNkOiBcIlwiLCAgICAvL+WMuklEXHJcbiAgICBhZGRyOiBcIlwiLCAgICAgICAvL+WcsOWdgFxyXG4gICAgY2VydGlmUGljMTogXCJcIiwgLy/ouqvku73or4HmraPpnaLnhadcclxuICAgIGNlcnRpZlBpYzI6IFwiXCIsIC8v6Lqr5Lu96K+B5Y+N6Z2i54WnXHJcbiAgICBjZXJ0aWZQaWMzOiBcIlwiLCAvL+aJi+aMgei6q+S7veivgeeFp+eJh1xyXG4gICAgbGljZW5zZVBpYzogXCJcIiwgLy/okKXkuJrmiafnhadcclxuICAgIHNob3BQaWMxOiBcIlwiLCAgIC8v5bqX6ZO654Wn54mHMVxyXG4gICAgc2hvcFBpYzI6IFwiXCIsICAgLy/lupfpk7rnhafniYcyXHJcbiAgICBhdXhQcm92TWF0MTogXCJcIiwvL+i+heWKqeeFp+eJhzFcclxuICAgIGF1eFByb3ZNYXQyOiBcIlwiLC8v6L6F5Yqp54Wn54mHMlxyXG4gICAgc2hvcExvZ29QaWM6IFwiXCIgLy/lupfpk7pMT0dPXHJcbn0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnVwZ3JhZGVNY2MsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgLy/liKDpmaTlupfpk7ror6bmg4XnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk55So5oi35piv5ZCm5Y2H57qn55qE5o6l5Y+j55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5VcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdC5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Quc2Vjb25kS2V5KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueUqOaIt+eahOWNj+iurue8luWPt+WSjOWNj+iuruWQjeensFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm90b2NvbEluZm8oKSB7XHJcbiAgICAvKipcclxuICAgICAqIOi/meS4quaOpeWPoyznvJPlrZgy5bCP5pe2XHJcbiAgICAgKi9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0UHJvdG9jb2xJbmZvLCBjb21vbVBhcmFtLGNhY2hlRmlyc3RTdG9yYWdlKDIqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlLmRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOWOhuWPsuaUtuasvlxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXN0b3J5SW5jb21lKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRIaXN0b3J5SW5jb21lLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5SW5jb21lT2JqOiByZXMuZGF0YVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDljoblj7LorqLljZVcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlzdG9yeVRyYW5zKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRIaXN0b3J5VHJhbnMsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5MaXN0RGF0YSA9IHN0b3JlLmdldFN0YXRlKCkuZ2V0SW4oWydoaXN0b3J5T3JkZXJMaXN0J10pLnRvSlMoKVxyXG4gICAgICAgICAgICBsZXQgbmV3TGlzdCA9IHJlcy5kYXRhLnRyYW5zSW5mbztcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3TGlzdClcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnlPcmRlckxpc3Q6IG9yaWdpbkxpc3REYXRhLmNvbmNhdChuZXdMaXN0KVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDku4rml6XmlLbmrL5cclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9kYXlJbmNvbWUoKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRUb2RheUluY29tZSxjb21vbVBhcmFtKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICB0b2RheUluY29tZU9iajogcmVzLmRhdGFcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOS7iuaXpeiuouWNlVxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2RheVRyYW5zKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRUb2RheVRyYW5zLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBsZXQgb3JpZ2luTGlzdERhdGEgPSBzdG9yZS5nZXRTdGF0ZSgpLmdldEluKFsndG9kYXlPcmRlckxpc3QnXSkudG9KUygpXHJcbiAgICAgICAgICAgIGxldCBuZXdMaXN0ID0gcmVzLmRhdGEudHJhbnNJbmZvO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgdG9kYXlPcmRlckxpc3Q6IG9yaWdpbkxpc3REYXRhLmNvbmNhdChuZXdMaXN0KVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDljZXnrJTmn6Xor6JcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bShwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bSxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKVxyXG59XHJcbi8qKlxyXG4gKiDojrflj5bnianmtYHkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpc3RpY3NTdChwYXJhbSl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldExvZ2lzdGljc1N0LCBPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIGxldCBuZXdPYmogPSByZXMuZGF0YS5kZWxpdmVyeU1zZztcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIG5ld09iai5tYXREZWxpdlN0YXR1cyDnmoTnirbmgIHlkoxyZWR1eOeahHN0b3Jl5L+d5oyB5LiA6Ie0XHJcbiAgICAgICAgICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbmV3T2JqLm1hdERlbGl2U3RhdHVzID0gcmVzLmRhdGEubWF0RGVsaXZTdGF0dXM7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICBkZWxpdmVyeU1zZzogbmV3T2JqXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIOWVhuaIt+acjeWKoemmlumhtSDngrnlh7vkv6HnlKjljaHmjInpkq7mn6Xor6LllYbmiLfmmK/lkKblvIDpgJrov4fkv6HnlKjljaHmlLbmrL5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVcGdyYWRlU3QoKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0VXBncmFkZVN0LCBjb21vbVBhcmFtKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueJqeaWmeWOhuWPsuiuouWNlVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2lzdGljc0xpc3QocGFyYW0pe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRMb2dpc3RpY3NMaXN0LE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmn6Xor6Lkv6HnlKjljaHmlLbmrL7ljYfnuqfnirbmgIFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBdWRpdEluZm8oKXtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEF1ZGl0SW5mbywgY29tb21QYXJhbSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluaUtuasvumZkOmineivpuaDhVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbWl0QXRJbmZvKCl7XHJcbiAgICAvL+e8k+WtmDLkuKrlsI/ml7ZcclxuICAgIHBvc3QoQ09ORklHLlJFU1QuZ2V0TGltaXRBdEluZm8sY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwKT0+e1xyXG4gICAgICAgIGlmKCByZXNwLnN0YXR1c0NvZGUgPSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTICl7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7bGltaXRJbmZvOnJlc3AuZGF0YX0pKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmm7TmlrDlupfpk7ror6bmg4VcclxuICogQHBhcmFtIHsqfSBwYXJhbSDlupfpk7ror6bmg4Xkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtY2hudE9wZXIocGFyYW0gPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC51cGdyYWRlTWNjICwgT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5Yig6ZmkbWNobnREZXRhaWznvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTsgXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOWIoOmZpOWcsOWdgOS/oeaBr1xyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUFkZHJlc3MocGFyYW09e1xyXG4gICAgaWQ6JycgLy/lnLDlnYBpZFxyXG59KXtcclxuICAgIFxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZGVsZXRlQWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/liKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocGFyYW0pO1xyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDmm7TmlrDmlLbmrL7pk7booYzljaFcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNY2NDYXJkKHBhcmFtPXtcclxuICAgIHZpcnR1YWxDYXJkTm86JycgLy/omZrmi5/ljaHlj7dcclxufSkge1xyXG4gICAgXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC51cGRhdGVNY2NDYXJkLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+aNouWNoeWQju+8jOa4hemZpOW6l+mTuuivpuaDhee8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTsgXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOaWsOWinuWcsOWdgFxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivpue7hueahOWcsOWdgOS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0FkZHJlc3MocGFyYW09e30pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULm5ld0FkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyl7XHJcbiAgICAgICAgICAgIC8vIOWIoOmZpOaUtui0p+WcsOWdgOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog5L+u5pS55Zyw5Z2A5L+h5oGvXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+m57uG55qE5Zyw5Z2A5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZWRpdEFkZHJlc3MocGFyYW09e30pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmVkaXRBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1Mpe1xyXG4gICAgICAgICAgICAvL+WIoOmZpOaUtui0p+WcsOWdgOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOWQr+WBnOaUtuasvueggeacjeWKoVxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE1jY09uT2ZmKHBhcmFtPXtcclxuICAgIGlzVXNlTWNjOicnICAvL+aYr+WQpuS9v+eUqOaUtuasvueggeacjeWKoVxyXG4gfSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1Quc2V0TWNjT25PZmYsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5Yig6Zmk5bqX6ZO66K+m5oOF57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7IFxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOiOt+WPluWQiui1t+aUr+S7mOaOp+S7tueahFRO5Y+3XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNjVHJhbnNOdW0oKXtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldE1jY1RyYW5zTnVtKS50aGVuKChyZXNwKT0+e1xyXG4gICAgICAgIGlmKCByZXNwLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyApe1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHttY2NUcmFuc051bTpyZXNwLmRhdGEudHJhbnNOdW19KVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL3JlcXVlc3RBUEkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyTGlzdFVMIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgZGF0YTogUHJvcFR5cGVzLmFueS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBpc09ubHlTaG93OiBQcm9wVHlwZXMuYm9vbCwvL3RydWUs5omA5pyJ55qE5byA5Y+q5piv5bGV56S677yM5LiN55So5re75Yqg55u45bqU5Ye95pWw77yM5aaC5p6c5pivRkFMU0XvvIzopoHmt7vliqDnm7jlupTlh73mlbBcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgICAgIGlzT25seVNob3c6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2xpY2sgPSAodmFsdWUgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1zID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgbGlzdEl0ZW1zID0gdGhpcy5wcm9wcy5kYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlzT25seVNob3cpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImNhcmRJdGVtIFwiIGtleT17aW5kZXh9ID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCBpIGNsYXNzTmFtZT1cImljb24gbm9PcGVyYXRlSWNvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2JhY2tncm91bmRJbWFnZTogXCJ1cmwoJ2h0dHBzOi8vd2FsbGV0Ljk1NTE2LmNvbS9zL3dsL2ljb24vZGVmYXVsdC9cIiArIGl0ZW0uaWNvblJlbFVybCArIFwiJylcIn19PjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtQ29udGVudCBub09wZXJhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e2l0ZW0uYmFuayArIGl0ZW0uY2FyZFR5cGUgKyBcIihcIiArIGl0ZW0ucGFuICsgXCIpXCJ9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJub09wZXJhdGVcIj7or6Xpk7booYzljaHmmoLkuI3mlK/mjIHlvZPliY3kuJrliqE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJjYXJkSXRlbVwiIGtleT17aW5kZXh9IG9uQ2xpY2s9e2l0ZW0uc2VsZWN0ZWQ/KCk9Pnt9OnRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCBpdGVtKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwgaSBjbGFzc05hbWU9XCJpY29uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOiBcInVybCgnaHR0cHM6Ly93YWxsZXQuOTU1MTYuY29tL3Mvd2wvaWNvbi9kZWZhdWx0L1wiICsgaXRlbS5pY29uUmVsVXJsICsgXCInKVwifX0+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1Db250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PntpdGVtLmJhbmsgKyBpdGVtLmNhcmRUeXBlICsgXCIoXCIgKyBpdGVtLnBhbiArIFwiKVwifTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyEhaXRlbS5hZGRQcm92aWNlICYmICg8c3Bhbj57aXRlbS5hZGRQcm92aWNlfTwvc3Bhbj4pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyEhaXRlbS5hZGRQcm92aWNlICYmICFpdGVtLnNlbGVjdGVkICYmICg8aSBjbGFzc05hbWU9XCJyaWdodEFycm93XCI+PC9pPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshIWl0ZW0uc2VsZWN0ZWQgJiYgKDxpIGNsYXNzTmFtZT1cImljb24tc2VsZWN0ZWRcIj48L2k+KX1cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gbGlzdEl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgbGlzdEl0ZW0gPSB0aGlzLmdldEl0ZW1zKCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAge2xpc3RJdGVtfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9Ub29scy9DYXJkbGlzdC9DYXJMaXN0VUwuanMiLCJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBpZiAoc2FmZSAmJiB0YXJnZXRba2V5XSkgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanNcbi8vIG1vZHVsZSBpZCA9IDE0ZGMxZjdlYmQ4MGQxNWJmZDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDE2Nzk4NTFiZTI3YjI2OGVhMjRlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMWRmYWMyODUyM2FlMzdkYWM1YlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNTFiYzdhZmU4MTI3ZTA5MTQ5ZFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhjZmY4NmUxZDUxZWJmMjFmN2Zcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDNjMjRkMzhmZmNkMGMzOGUzNDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1M2I3ZDM0ODE3MTQ0YjEyYjBhYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAnYW50ZC1tb2JpbGUvbGliL21vZGFsJztcclxuaW1wb3J0IENhcmRMaXN0IGZyb20gXCIuLi9Ub29scy9DYXJkbGlzdC9DYXJkbGlzdFwiXHJcbmltcG9ydCBDb2xsZWN0aW9uQmFua0NhcmQgZnJvbSBcIi4vQ29sbGVjdGlvbkJhbmtDYXJkXCI7XHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBnZXRDYXJkbGlzdCwgdXBkYXRlTWNjQ2FyZCB9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJXCI7XHJcbmltcG9ydCB7IGJlZm9yZUVudGVyUm91dGVyIH0gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4uLy4uL3N0b3JlL3N0b3JlJ1xyXG5pbXBvcnQgeyBVUERBVEVfU1RPUkVfU1RBVEUgfSBmcm9tIFwiLi4vLi4vc3RvcmUvYWN0aW9uXCI7XHJcbmltcG9ydCB7IHJlbW92ZUNhY2hlIH0gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZVwiO1xyXG5cclxuXHJcbmNsYXNzIENvbGxlY3Rpb25CYW5rQ2FyZENvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBiZWZvcmVFbnRlclJvdXRlcign5pS25qy+6ZO26KGM5Y2hJyk7XHJcbiAgICAgICAgdGhpcy5pbml0RGVmYXVsdENhcmQoKTtcclxuICAgICAgICAvLyDojrflj5bpk7booYzljaHliJfooahcclxuICAgICAgICBnZXRDYXJkbGlzdCgpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgQ2FyZExpc3QuQ2xvc2UoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2ubWNobnREZXRhaWwo5bqX6ZO66K+m5oOFKe+8jOWIneWni+WMlum7mOiupOaUtuasvumTtuihjOWNoVxyXG4gICAgICovXHJcbiAgICBpbml0RGVmYXVsdENhcmQgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHsgYmFua05tLCBpY29uUmVsVXJsLCBjYXJkVHlwZSwgY2FyZE5vIH0gPSB0aGlzLnByb3BzLm1jaG50RGV0YWlsO1xyXG4gICAgICAgIGNvbnN0IEZMQUdfQ0FSRF9UWVBFX1VTRUZVTCA9ICcwMSc7IC8vIOWPr+eUqOWNoeeJh+WAn+iusOWNoeeahOagh+ivhuesplxyXG4gICAgICAgIGNvbnN0IE5BTUVfQ0FSRF9VU0VGVUwgPSAn5YCf6K6w5Y2hJzsgLy8g5Y+v55So55qE5Y2h55qE5Y2h5ZCN56ew77ya5YCf6K6w5Y2hXHJcbiAgICAgICAgbGV0IGRlZmF1bHRDYXJkID0ge1xyXG4gICAgICAgICAgICBiYW5rOiBiYW5rTm0gfHwgJycsIC8v6ZO26KGM5ZCN56ewXHJcbiAgICAgICAgICAgIGljb25SZWxVcmw6IGljb25SZWxVcmwgfHwgJycsIC8v6ZO26KGMbG9nb+eahFVSTOWcsOWdgFxyXG4gICAgICAgICAgICBjYXJkVHlwZTogY2FyZFR5cGUgPT0gRkxBR19DQVJEX1RZUEVfVVNFRlVMID8gTkFNRV9DQVJEX1VTRUZVTCA6ICcnLCAvLyDljaHnsbvlnotcclxuICAgICAgICAgICAgcGFuOiBjYXJkTm8gfHwgJycsIC8v6Jma5ouf5Y2h5Y+3XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOiuvue9rnN0b3Jl5Lit55qE5pS25qy+6ZO26KGM5Y2h5L+h5b+DXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHsgc3RvcmVSZWNlaXZlQ2FyZE9iajogZGVmYXVsdENhcmQgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPENvbGxlY3Rpb25CYW5rQ2FyZCB7Li4udGhpcy5wcm9wc30gLz47XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcHN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtY2hudERldGFpbDogc3RhdGUuZ2V0SW4oWydtY2hudERldGFpbCddKS50b0pTKCksIC8v5bqX6ZO65L+h5oGv6K+m5oOFXHJcbiAgICAgICAgc3RvcmVSZWNlaXZlQ2FyZE9iajogc3RhdGUuZ2V0SW4oWydzdG9yZVJlY2VpdmVDYXJkT2JqJ10pLnRvSlMoKSwgLy/mlLbmrL7pk7booYzljaHkv6Hmga9cclxuICAgICAgICBjYXJkTGlzdDogc3RhdGUuZ2V0SW4oWydjYXJkTGlzdCddKS50b0pTKCkgLy/pk7booYzljaHliJfooahcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwRGlzcGF0aFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWkhOeQhumTtuihjOWNoeeahOWIh+aNolxyXG4gICAgICogQHBhcmFtIHZhbCAg6YCJ5Lit55qE5Y2h5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gcmVzb2x2ZSBQcm9taXNl55qEcmVzb2x2ZSDlh73mlbBcclxuICAgICAqIEBwYXJhbSByZWplY3QgIFByb21pc+eahHJlamVjdCDlh73mlbBcclxuICAgICAqL1xyXG4gICAgbGV0IGhhbmRsZUNoYW5nZUNhcmQgPSAodmFsLCByZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5YeG5aSH5o2i5Y2hJylcclxuICAgICAgICBNb2RhbC5hbGVydCgn5o+Q56S6JywgJ+mAmui/h+aUtuasvueggeW+l+WIsOeahOaUtuWFpeWwhui/m+WFpeabtOaNouWQjueahOmTtuihjOWNoeivt+ehruiupOaYr+WQpuabtOaNouaUtuasvuWNoScsIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WPlua2iCcsIG9uUHJlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn56Gu6K6kJywgb25QcmVzczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZU1jY0NhcmQoeyB2aXJ0dWFsQ2FyZE5vOiB2YWwudmlydHVhbENhcmRObyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmm7TmlrByZWR1eOS4reeahOaUtuasvumTtuihjOW8gOS/oeaBr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7IGJhbmssIGNhcmRUeXBlLCBpY29uUmVsVXJsLCBwYW4gfSA9IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVJlY2VpdmVDYXJkT2JqOiB2YWwsIG1jaG50RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkTm86IHBhbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhbmtObTogYmFuayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25SZWxVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FyZExpc3QuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FyZExpc3QuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H6LCD55So5a6i5oi356uv5o+S5Lu25re75Yqg5paw55qE6ZO26KGM5Y2hXHJcbiAgICAgKiBAcGFyYW0gcmVzdWx0ICDmt7vliqDpk7booYzljaHnmoTnu5PmnpwgIHNlbGVjdElueydzdWNjZXNzJywnZmFpbCd9XHJcbiAgICAgKi9cclxuICAgIGxldCBhZGRDYXJkID0gKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5re75Yqg6ZO26KGM5Y2h5oiQ5YqfXCIpXHJcbiAgICAgICAgaWYgKHJlc3VsdCA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAvLyDliKDpmaTnlKjmiLfmlLbmrL7ljaHliJfooajnmoRsb2NhbFN0b3JhZ2XnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jY0NhcmRMaXN0LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5nZXRNY2NDYXJkTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgICAgIGdldENhcmRsaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENhcmRMaXN0LkNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGhhbmRsZUNoYW5nZUNhcmQsXHJcbiAgICAgICAgYWRkQ2FyZFxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwc3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRoVG9Qcm9wcykoQ29sbGVjdGlvbkJhbmtDYXJkQ29udGFpbmVyKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbkJhbmtDYXJkL0NvbGxlY3Rpb25CYW5rQ2FyZENvbnRhaW5lci5qcyIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgQlJFQUsgPSB7fTtcbnZhciBSRVRVUk4gPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUikge1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSk7XG4gIHZhciBmID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmIChpc0FycmF5SXRlcihpdGVyRm4pKSBmb3IgKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOykge1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1ZTU5YjcxYjMzYTM4YzM2MThlN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmIChERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSBkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qc1xuLy8gbW9kdWxlIGlkID0gNWU3NDkxZjFmNzk5NzE1ZWFjNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmlzSXRlcmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA2YTQ0MmFiNWJkOWJkOTI5NDQ3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJDQkNcIjpcIkNCQ1wiLFwiaGVhZFRpdGxlXCI6XCJoZWFkVGl0bGVcIixcInN0b3JlTmFtZVwiOlwic3RvcmVOYW1lXCIsXCJ0aXBzLXdhcnAtZGl2XCI6XCJ0aXBzLXdhcnAtZGl2XCIsXCJ0aXBzSWNvblwiOlwidGlwc0ljb25cIixcImJhbmtDYXJkLXNlbGVjdG9yLWRpdlwiOlwiYmFua0NhcmQtc2VsZWN0b3ItZGl2XCIsXCJiYW5rSWNvblwiOlwiYmFua0ljb25cIixcImJhbmtOYW1lXCI6XCJiYW5rTmFtZVwiLFwiZ3JheVwiOlwiZ3JheVwiLFwiaW5uZXJcIjpcImlubmVyXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbkJhbmtDYXJkL0NvbGxlY3Rpb25CYW5rQ2FyZC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA2ZGYxZjgxY2UyZTE5OTFlYjI1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvKlxyXG4gICBBUEkg5o6l5Y+j6YWN572uXHJcbiAgIGF4aW9zIOWPguiAg+aWh+aho++8mmh0dHBzOi8vd3d3LmthbmNsb3VkLmNuL3l1bnllL2F4aW9zLzIzNDg0NVxyXG5cclxuKi9cclxuLy8gaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IFRvYXN0IGZyb20gJ2FudGQtbW9iaWxlL2xpYi90b2FzdCc7XHJcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuL2NvbmZpZ1wiXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbipcclxuKiDluLjph4/lrprkuYnljLpcclxuKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgY29uc3QgVXRpbCA9IHdpbmRvdy5VUC5XLlV0aWw7XHJcblxyXG5leHBvcnQgY29uc3QgQXBwID0gVVAuVy5BcHA7XHJcblxyXG5leHBvcnQgY29uc3QgRW52ID0gVVAuVy5FbnY7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ1Bob25lID0gL14oMTNbMC05XXwxNFs1NzldfDE1WzAtMyw1LTldfDE2WzZdfDE3WzAxMzU2NzhdfDE4WzAtOV18MTlbODldKVxcZHs4fSQvO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ1BheU51bSA9IC9eWzAtOV17MjB9JC87XHJcblxyXG5leHBvcnQgY29uc3QgY29tb21QYXJhbSA9IHtcclxuICAgIHZlcnNpb246IFwiMi4wXCIsXHJcbiAgICBzb3VyY2U6IFwiMlwiXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICog6K+35rGC5qC45b+D5Yy6IOS4i+mdoui/meWdl+WMuuWfn+S4reeahOS7o+eggeaUueWKqOivt+aFjumHjVxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxubGV0IGJhc2VVcmwgPSBcIlwiLCBiYXNlVXJsMiA9IFwiXCIsIGJhc2VVcmwzID0gXCJcIjtcclxuaWYgKGxvY2F0aW9uLmhvc3RuYW1lLmluZGV4T2YoJzk1NTE2LmNvbScpICE9PSAtMSkgeyAvL+eUn+S6p+eOr+Wig1xyXG4gICAgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL3NoYW5naHUuOTU1MTYuY29tL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwyID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vbWFsbC45NTUxNi5jb20vY3FwLWludC1tYWxsLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgYmFzZVVybDMgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy95b3VodWkuOTU1MTYuY29tL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufSBlbHNlIGlmIChsb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCcxNzIuMTguMTc5LjEwJykgIT09IC0xKSB7IC8v5rWL6K+V546v5aKDXHJcbiAgICAvLyBiYXNlVXJsPVwiaHR0cDovLzE3Mi4yMS4xMDEuMjU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOyAvL+a1i+ivleWupGFwYWNoZVxyXG4gICAgLy9iYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS45NTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/lvIDlj5Hnjq/looNhcGFjaGVcclxuICAgIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjE3L3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTEveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMTMzLjI1OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufSBlbHNlIHtcclxuICAgIC8vIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjk1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjI1OjM4MjEwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjE3L3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTEveW91aHVpLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjEzMy4yNTozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4zMy41NjozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn1cclxuLyoqXHJcbiAqIOmAmui/h+WQjue8gOiOt+WPluacjeWKoeWZqOeahOWFqOWcsOWdgFxyXG4gKiBAcGFyYW0gdXJsXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0U2VydlVybCA9ICh1cmwpID0+IHtcclxuICAgIGxldCBzZXJ2ZXJVcmwgPSBcIlwiXHJcbiAgICBpZiAodXJsID09IENPTkZJRy5SRVNULnVzZXJJbmZvKSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gXCJcIjtcclxuICAgIH1cclxuICAgIC8vIGVsc2UgaWYgKHVybC5zcGxpdChcIi9cIilbMF0gPT0gXCJhZGRyZXNzXCIpIHtcclxuICAgIC8vICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsMlxyXG4gICAgLy8gfVxyXG4gICAgZWxzZSBpZiAodXJsLnNwbGl0KFwiL1wiKVswXSA9PSBcInNjYW5cIiB8fCB1cmwgPT0gQ09ORklHLlJFU1QuZ2V0Q2l0eSkge1xyXG4gICAgICAgIHNlcnZlclVybCA9IGJhc2VVcmwzXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNlcnZlclVybDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOagvOW8j+WMlue7k+aenCDlsIbnu5PmnpzmoLzlvI/ljJbkuLpcclxuICoge1xyXG4gKiAgICAgc3RhdHVzQ29kZSAgIOWQjuWPsOWTjeW6lOeggVxyXG4gKiAgICAgZGF0YSAgICAgICAgIOWQjuWPsOi/lOWbnueahOaVsOaNrlxyXG4gKiAgICAgbXNnICAgICAgICAgIOWQjuWPsOeahOaPkOekuuS/oeaBr1xyXG4gKiB9XHJcbiAqIEBwYXJhbSBkYXRhXHJcbiAqIEByZXR1cm5zIHt7c3RhdHVzQ29kZTogKHN0cmluZ3wqKSwgZGF0YTogKiwgbXNnOiAqfX1cclxuICovXHJcbmV4cG9ydCBjb25zdCByZXNwb25zZUZvcm1hdHRlciA9IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgcmVzID0ge1xyXG4gICAgICAgIHN0YXR1c0NvZGU6IGRhdGEucmVzcCxcclxuICAgICAgICBkYXRhOiBkYXRhLnBhcmFtcyxcclxuICAgICAgICBtc2c6IGRhdGEubXNnXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLy8g5Yig6Zmk5bqV6YOoICcvJ1xyXG5mdW5jdGlvbiBkZWxldGVTbGFzaChob3N0KSB7XHJcbiAgICByZXR1cm4gaG9zdC5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG59XHJcblxyXG4vLyDmt7vliqDlpLTpg6ggJy8nXHJcbmZ1bmN0aW9uIGFkZFNsYXNoKHBhdGgpIHtcclxuICAgIHJldHVybiAvXlxcLy8udGVzdChwYXRoKSA/IHBhdGggOiBgLyR7cGF0aH1gO1xyXG59XHJcblxyXG4vLyDop6PmnpDlj4LmlbBcclxuZnVuY3Rpb24gc2VwYXJhdGVQYXJhbXModXJsKSB7XHJcbiAgICBjb25zdCBbcGF0aCA9ICcnLCBwYXJhbXNMaW5lID0gJyddID0gdXJsLnNwbGl0KCc/Jyk7XHJcblxyXG4gICAgbGV0IHBhcmFtcyA9IHt9O1xyXG5cclxuICAgIHBhcmFtc0xpbmUuc3BsaXQoJyYnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuXHJcbiAgICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7cGF0aCwgcGFyYW1zfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdChjb25maWcpe1xyXG4gICAgbGV0IHttZXRob2QsIHVybCwgZGF0YSA9IHt9fSA9IGNvbmZpZztcclxuICAgIG1ldGhvZCA9IChtZXRob2QgJiYgbWV0aG9kLnRvVXBwZXJDYXNlKCkpIHx8ICdHRVQnO1xyXG5cclxuICAgIGxldCBzZXJ2ZXJVcmwgPSAnaHR0cDovLzEyNy4wLjAuMTozMDAwLyc7XHJcbiAgICBsZXQgZmluYWxVcmwgPSBzZXJ2ZXJVcmwgKyB1cmw7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB1cmw6ZmluYWxVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6bWV0aG9kLFxyXG4gICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gJzIwMCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2VGb3JtYXR0ZXIocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ+ivt+axguWksei0pScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGlmKCBtZXRob2QgPT09ICdQT1NUJyApe1xyXG4gICAgICAgICAgICAgb3B0aW9ucy5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgICAgICBvcHRpb25zLmRhdGFUeXBlID0gJ2pzb24nXHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5hamF4KG9wdGlvbnMpO1xyXG4gICAgfSlcclxuICAgIFxyXG59XHJcblxyXG4vLyDkuLvopoHor7fmsYLmlrnms5VcclxuLy8gZXhwb3J0ICBmdW5jdGlvbiByZXF1ZXN0T3JpZ2luKGNvbmZpZykge1xyXG5cclxuLy8gICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4vLyAgICAgY29uc3QgdWkgPSBVUC5XLlVJO1xyXG4vLyAgICAgY29uc3QgZW52ID0gVVAuVy5FbnY7XHJcblxyXG4vLyAgICAgbGV0IHttZXRob2QsIHVybCwgZGF0YSA9IHt9LCBoZWFkZXJzLCBmb3JDaHNwLCBlbmNyeXB0LCBieUFqYXgsIGNhY2hlLCB1cGRhdGUsIHN0b3JhZ2V9ID0gY29uZmlnO1xyXG5cclxuLy8gICAgIG1ldGhvZCA9IChtZXRob2QgJiYgbWV0aG9kLnRvVXBwZXJDYXNlKCkpIHx8ICdHRVQnO1xyXG5cclxuLy8gICAgIGxldCBzZXJ2ZXJVcmwgPSBnZXRTZXJ2VXJsKHVybCk7XHJcblxyXG4vLyAgICAgLy8gbGV0IHNlcnZlclVybCA9IGJhc2VVcmwgO1xyXG4vLyAgICAgLy8gaWYgKHRydWUpIHtcclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6YCa6L+H5o+S5Lu25Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKi9cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWQkeacjeWKoeWZqOWPkemAgeivt+axglxyXG4vLyAgICAgICogQHBhcmFtIHBhcmFtcyDor7fmsYLlj4LmlbBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdmVyc2lvbu+8mueJiOacrO+8jOm7mOiupOaYrzEuMFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBzb3VyY2XvvJrmnaXmupDvvIzpu5jorqTmoLnmja5BbmRyb2lk44CBaU9T6Ieq5Yqo5re75YqgXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIGVuY3J5cHTvvJrmmK/lkKbliqDlr4bvvIzpu5jorqTliqDlr4ZcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgbWV0aG9k77ya6K+35rGC5pa55rOV77yMUE9TVOaIlkdFVFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBjbWTvvJror7fmsYLlkb3ku6TvvIjkuZ/lj6/oh6rooYzlsIZjbWTnu4Too4Xoh7N1cmlb5LyY5oOg5ZCO5Y+wXeaIlnBhdGhb6ZKx5YyF5ZCO5Y+wXe+8iVxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB1cmkvcGF0aO+8muivt+axguWcsOWdgO+8jOW7uuiuruS7heWhq+WFhWNtZO+8jOS4jeW7uuiuruiHquihjOe7hOijhXVyaS9wYXRoXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHBhcmFtc++8muWPkemAgee7meWQjuWPsOeahOWPguaVsFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB2aWTvvJrlpoLmnpzpgJrov4dBamF45pa55byP5ZCRd2FsbGV05ZCO5Y+w5Y+R6YCB6K+35rGC6ZyA6KaB5pC65bimdmlkXHJcbi8vICAgICAgKiBAcGFyYW0gZm9yQ2hzcCDmmK/lkKblkJHkvJjmg6DlkI7lj7Dlj5HpgIHor7fmsYLvvIjpu5jorqTlkJHmiYvmnLrlkI7lj7Dlj5HpgIHor7fmsYLvvIlcclxuLy8gICAgICAqIEBwYXJhbSBieUFqYXgg5piv5ZCm5L2/55SoQWpheOWPkemAgeivt+axgu+8iOm7mOiupOS9v+eUqOaOp+S7tu+8iVxyXG4vLyAgICAgICogQHBhcmFtIHN1Y2Nlc3Mg5oiQ5Yqf5Zue6LCDXHJcbi8vICAgICAgKiBAcGFyYW0gZXJyb3Ig6ZSZ6K+v5Zue6LCD77yI5Lia5Yqh6ZSZ6K+v77yJXHJcbi8vICAgICAgKiBAcGFyYW0gZmFpbCDlpLHotKXlm57osIPvvIjor7fmsYLlpLHotKXvvIlcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gICAgICAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IHN1Y2Nlc3NDYWxsYmFjayA9IChkYXRhLGZ1YykgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5Tlm57miJDlip/nu5PmnpzvvJpcIilcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgcmVxID0gcmVzcG9uc2VGb3JtYXR0ZXIoZGF0YSk7XHJcbi8vICAgICAgICAgICAgICAgICBpZiggISFmdWMgKXtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXEuZnVjID0gZnVjO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXEpXHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBlcnJvckNhbGxiYWNrID0gKGVycikgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5Tlm57lpLHotKXnu5PmnpzvvJpcIilcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAodXJsID09IENPTkZJRy5SRVNULmFwcGx5TWNjIHx8IHVybCA9PSBDT05GSUcuUkVTVC5hcHBseU1hdCB8fCB1cmwgPT0gQ09ORklHLlJFU1QudG9kYXlNb25leSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCByZXEgPSByZXNwb25zZUZvcm1hdHRlcihlcnIpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVxKVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgVG9hc3QuaW5mbyhlcnIubXNnIHx8ICfmn6Xor6LkuJrliqHopoHntKDlh7rplJnvvIzor7fnqI3lkI7lho3or5XvvIEnKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IG5ldHdvcmtDYWxsYmFjayA9ICh4aHIpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIFRvYXN0LmluZm8oeGhyLm1zZyk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcblxyXG4vLyAgICAgICAgICAgICBpZiAodXJsICE9IENPTkZJRy5SRVNULmdldFRvZGF5SW5jb21lKSB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5zaG93TG9hZGluZygpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAoIWNhY2hlKSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVybDpcIiArIHVybClcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUGFyYW06XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh7XHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGVuY3J5cHQ6IGVuY3J5cHQsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgZm9yQ2hzcDogZm9yQ2hzcCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBieUFqYXg6IGJ5QWpheFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gfSlcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB6Z2e57yT5a2Y6K+35rGCXCIpXHJcbi8vICAgICAgICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2UoXHJcbi8vICAgICAgICAgICAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXJpOnNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH0sIGZvckNoc3AsIGJ5QWpheCwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBuZXR3b3JrQ2FsbGJhY2spO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDYWNoZVVybDpcIiArIHVybClcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3RvcmVhZ2XnrZbnlaXmmK86XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ1cGRhdGXlh73mlbA6XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1cGRhdGUpXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWPkemAgee8k+WtmOivt+axglwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICAgICAgICAgKiDlkJHmnI3liqHlmajlj5HpgIHor7fmsYJcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBwYXJhbXMg6K+35rGC5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZlcnNpb27vvJrniYjmnKzvvIzpu5jorqTmmK8xLjBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc291cmNl77ya5p2l5rqQ77yM6buY6K6k5qC55o2uQW5kcm9pZOOAgWlPU+iHquWKqOa3u+WKoFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBlbmNyeXB077ya5piv5ZCm5Yqg5a+G77yM6buY6K6k5Yqg5a+GXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIG1ldGhvZO+8muivt+axguaWueazle+8jFBPU1TmiJZHRVRcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgY21k77ya6K+35rGC5ZG95Luk77yI5Lmf5Y+v6Ieq6KGM5bCGY21k57uE6KOF6IezdXJpW+S8mOaDoOWQjuWPsF3miJZwYXRoW+mSseWMheWQjuWPsF3vvIlcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdXJpL3BhdGjvvJror7fmsYLlnLDlnYDvvIzlu7rorq7ku4XloavlhYVjbWTvvIzkuI3lu7rorq7oh6rooYznu4Too4V1cmkvcGF0aFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBwYXJhbXPvvJrlj5HpgIHnu5nlkI7lj7DnmoTlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmlk77ya5aaC5p6c6YCa6L+HQWpheOaWueW8j+WQkXdhbGxldOWQjuWPsOWPkemAgeivt+axgumcgOimgeaQuuW4pnZpZFxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGZvckNoc3Ag5piv5ZCm5ZCR5LyY5oOg5ZCO5Y+w5Y+R6YCB6K+35rGC77yI6buY6K6k5ZCR5omL5py65ZCO5Y+w5Y+R6YCB6K+35rGC77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gYnlBamF4IOaYr+WQpuS9v+eUqEFqYXjlj5HpgIHor7fmsYLvvIjpu5jorqTkvb/nlKjmjqfku7bvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBzdWNjZXNzIOaIkOWKn+Wbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGVycm9yIOmUmeivr+Wbnuiwg++8iOS4muWKoemUmeivr++8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGZhaWwg5aSx6LSl5Zue6LCD77yI6K+35rGC5aSx6LSl77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gdXBkYXRlIOW8guatpeWIt+aWsOWbnuiwgyDlpoLmnpzorr7nva5hc3luY+S4unRydWXlkI7lj6/ku6Xmt7vliqB1cGRhdGXlm57osIMg5aaC5p6c5LiN5aGr5YaZ6buY6K6k5Lulc3VjY2Vzc+i/m+ihjOWkhOeQhlxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHN0b3JhZ2Ug57yT5a2Y5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIG5lZWRTdyAgICAgICAgICAgIC8v6buY6K6kZmFsc2XlpKfpg6jliIbnlKjnmoTmmK/mj5Lku7bpnIDopoHnmoTmiYvliqjljrvliqBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc3RvcmFnZVR5cGUgICAgICAvL+m7mOiupOS9v+eUqGxvY2Fsc3RvcmFnZVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBhc3luYyAgICAgICAgICAgIC8v6buY6K6k6I635Y+W57yT5a2Y5ZCO5LiN5Y+R6K+35rGC77yM5pS55Li6dHJ1ZeWQjuS8muW8guatpeWOu+ivt+axguWQjuWPsOW5tuWIt+aWsOaVsOaNrlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBlbmRPZlN5bmNGdW5jICAgIC8vdG9kbyDph43opoHvvIHvvIHvvIHvvIHlm57osIPkuK3lpoLmnpzlrZjlnKjlvILmraXvvIjmj5Lku7bnrYnvvInpnIDopoHmoIfmmI7lvILmraXnirbmgIHkuLp0cnVlXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZhbGlkYXRlVGltZSAgICAgLy/mnInmlYjmnJ/pu5jorqTml6DpmZDmnInmlYjmnJ8g5Y2V5L2N5q+r56eSXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVXaXRoSWQgICAgICAgLy/pu5jorqR0cnVl5Lul55So5oi3aWTov5vooYzlrZjlgqjlkKbliJlmYWxzZeS7pWxvY2Fs5a2Y5YKoXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVTdWNjICAgICAgICAgLy/kv53lrZjmiJDlip/lkI7nmoTlm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZUVyciAgICAgICAgICAvL+S/neWtmOWksei0peWQjueahOWbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICByb2xsS2V5ICAgICAgICAgIC8v5by65Yi26K6+572u5Li76ZSuXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNlY29uZEtleSAgICAgICAgLy/lvLrliLborr7nva7mrKHopoHplK7lgLxcclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOmHjeimgeivtOaYjiDosIPnlKjlvILmraXmqKHlvI/vvIhhc3luY+iuvue9ruS4unRydWXvvInlkI7lj6/og73lnKhzdWNjZXNz5Zue6LCD6YeM5a2Y5Zyo5byC5q2l5pON5L2c77yM6K+l5oOF5Ya15LiL5Zue5a+86Ie057yT5a2Y55qE5Zue6LCD5Y+v6IO9XHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDmnKrmiafooYzlrozmiJDvvIzor7fmsYLnmoTlm57osIPlj4jlvIDlp4vmiafooYzkuobnmoTmg4XlhrXvvIzmiYDku6XmiJHku6znu5/kuIDlnKhzdWNjZXNz5Zue6LCD5ZKMdXBkYXRl5Zue6LCD55qE5YWl5Y+C5aKe5Yqg5LqG56ys5LqM5Liq5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDnlKjkuo7lhbzlrrnlm57osIPlhoXljIXlkKvlvILmraXnmoTnirblhrXvvIzkvb/nlKjmlrnms5XkuLrvvJrpppblhYjorr7nva5lbmRPZlN5bmNGdW5j5Y+C5pWw5Li6dHJ1ZSzlhbbmrKFzdWNjZXNz5ZKMdXBkYXRl5ZueXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDosIPlhoXkvJrmnIky5Liq5YWl5Y+C77yMc3VjY2Vzc++8iHJlc3DvvIxmdWPvvInvvIzor7flnKjku6PnoIHpl63ljIXlpITkvb/nlKhmdWMuZW5kT2ZGdW5jKClcclxuLy8gICAgICAgICAgICAgICAgICAqL1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIGxldCBwYXJhbSA9IHt9XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmIChieUFqYXgpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwYXJhbSA9IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IFwibGlmZS9saWZlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwYXJhbSA9IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVyaTpzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlV2l0aFN0b3JhZ2UocGFyYW0sIGZvckNoc3AsIGJ5QWpheCwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBuZXR3b3JrQ2FsbGJhY2ssIHN0b3JhZ2UsIHVwZGF0ZSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgfSlcclxuLy8gICAgIH0pXHJcblxyXG5cclxuLy8gICAgIC8vIH1cclxuLy8gICAgIC8vIGVsc2Uge1xyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6YCa6L+HQWpheCDlj5HpgIHor7fmsYJcclxuLy8gICAgICAqL1xyXG4vLyAgICAgLy8gcmV0dXJuIGF4aW9zKHtcclxuLy8gICAgIC8vICAgICB1cmw6IGJhc2VVcmwgKyB1cmwsXHJcbi8vICAgICAvLyAgICAgbWV0aG9kLFxyXG4vLyAgICAgLy8gICAgIGhlYWRlcnMsXHJcbi8vICAgICAvLyAgICAgZGF0YTogbWV0aG9kID09PSAnR0VUJyA/IHVuZGVmaW5lZCA6IGRhdGEsXHJcbi8vICAgICAvLyAgICAgcGFyYW1zOiBPYmplY3QuYXNzaWduKG1ldGhvZCA9PT0gJ0dFVCcgPyBkYXRhIDoge30sIHBhcmFtcylcclxuLy8gICAgIC8vIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbi8vICAgICAvL1xyXG4vLyAgICAgLy8gICAgIGxldCByZXEgPSB7XHJcbi8vICAgICAvLyAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLmRhdGEucmVzcCxcclxuLy8gICAgIC8vICAgICAgICAgZGF0YTogcmVzcG9uc2UuZGF0YS5wYXJhbXNcclxuLy8gICAgIC8vICAgICB9XHJcbi8vICAgICAvLyAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXEpXHJcbi8vICAgICAvLyB9KS5jYXRjaChlcnIgPT4ge1xyXG4vLyAgICAgLy8gICAgIC8vIOivt+axguWHuumUmVxyXG4vLyAgICAgLy8gICAgIFRvYXN0LmluZm8oJ3JlcXVlc3QgZXJyb3IsIEhUVFAgQ09ERTogJyArIGVyci5yZXNwb25zZS5zdGF0dXMpO1xyXG4vLyAgICAgLy8gICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xyXG4vLyAgICAgLy8gfSk7XHJcbi8vICAgICAvLyB9XHJcblxyXG4vLyB9XHJcblxyXG4vLyDkuIDkupvluLjnlKjnmoTor7fmsYLmlrnms5VcclxuZXhwb3J0IGNvbnN0IGdldCA9ICh1cmwsIGRhdGEsIHBhcmFtID0ge30pID0+IHtcclxuICAgIGxldCBwYXJhbUFsbCA9IE9iamVjdC5hc3NpZ24oe2ZvckNoc3A6IHRydWUsIGVuY3J5cHQ6IHRydWUsIGNhY2hlOiBmYWxzZSwgYnlBamF4OiBmYWxzZX0sIHBhcmFtKTtcclxuICAgIHJldHVybiByZXF1ZXN0KE9iamVjdC5hc3NpZ24oe3VybCwgZGF0YX0sIHBhcmFtQWxsKSlcclxufTtcclxuZXhwb3J0IGNvbnN0IHBvc3QgPSAodXJsLCBkYXRhLCBwYXJhbSA9IHt9KSA9PiB7XHJcbiAgICBsZXQgcGFyYW1BbGwgPSBPYmplY3QuYXNzaWduKHtmb3JDaHNwOiB0cnVlLCBlbmNyeXB0OiB0cnVlLCBjYWNoZTogZmFsc2UsIGJ5QWpheDogZmFsc2V9LCBwYXJhbSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdChPYmplY3QuYXNzaWduKHttZXRob2Q6ICdQT1NUJywgdXJsLCBkYXRhfSwgcGFyYW1BbGwpKVxyXG59O1xyXG5leHBvcnQgY29uc3QgcHV0ID0gKHVybCwgZGF0YSkgPT4gcmVxdWVzdCh7bWV0aG9kOiAnUFVUJywgdXJsLCBkYXRhfSk7XHJcbmV4cG9ydCBjb25zdCBkZWwgPSAodXJsLCBkYXRhKSA9PiByZXF1ZXN0KHttZXRob2Q6ICdERUxFVEUnLCB1cmwsIGRhdGF9KTtcclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiDlip/og73lh73mlbDljLpcclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiDlsIZVUkzkuK3nmoRzZWFyY2gg5a2X56ym5LiyIOi9rOaNouaIkCDlr7nosaFcclxuICogQHBhcmFtIHNlYXJjaFxyXG4gKiBAcmV0dXJucyB7e319XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0U2VhcmNoUGFyYW0gPSAoc2VhcmNoKSA9PiB7XHJcbiAgICBpZiAoISFzZWFyY2gpIHtcclxuICAgICAgICBsZXQgc3RyID0gc2VhcmNoLnNsaWNlKDEpO1xyXG4gICAgICAgIGxldCBhcnJheSA9IHN0ci5zcGxpdChcIiZcIik7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtID0gaXRlbS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgICAgIG9ialtwYXJhbVswXV0gPSBwYXJhbVsxXTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiBjb2RvdmEg5o+S5Lu26LCD55So5Yy6XHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuXHJcbi8vIOWQr+WBnOaUtuasvueggVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0WGlhb1dlaVBheShwYXJhbSwgc3VjLCBlcnIpIHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnNldFhpYW9XZWlQYXkocGFyYW0sIHN1YywgZXJyKTtcclxufVxyXG5cclxuLy/lsI/lvq5hdWRpb1xyXG5leHBvcnQgY29uc3Qgc2V0WGlhb1dlaUF1ZGlvID0gKHBhcmFtLCBzdWMsIGVycikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuc2V0WGlhb1dlaUF1ZGlvKHBhcmFtLCBzdWMsIGVycik7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGdldFhpYW9XZWlBdWRpbyA9IChzdWMsIGVycikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuZ2V0WGlhb1dlaUF1ZGlvKHN1YywgZXJyKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRvYXN0ID0gKG1zKSA9PiB7XHJcbiAgICBUb2FzdC5pbmZvKG1zLCAyKTtcclxufVxyXG4vKipcclxuICog6K6+572u6aG26YOoYmFyXHJcbiAqIEBwYXJhbSB0aXRsZSDpobXpnaLlkI3np7BcclxuICogQHBhcmFtIHJpZ2h0QmFyIOWPs+S+p+aMiemSruWQjeensFxyXG4gKiBAcGFyYW0gcmlnaHRDYWxsYmFjayDlj7PkvqfmjInpkq7lm57osINcclxuICogQHBhcmFtIHJpZ2h0QmFySW1nIOWPs+S+p+aMiemSruWbvueJh1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGJlZm9yZUVudGVyUm91dGVyID0gKHRpdGxlID0gXCJcIiwgcmlnaHRCYXIgPSBcIlwiLCByaWdodENhbGxiYWNrID0gbnVsbCwgcmlnaHRCYXJJbWcgPSBudWxsKSA9PiB7XHJcbiAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJUaXRsZSh0aXRsZSlcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7nqpflj6Plj7PkvqfmjInpkq5cclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGUg5Zu+5qCH5qCH6aKYXHJcbiAgICAgICAgICogQHBhcmFtIGltYWdlIOWbvuagh+aWh+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSBoYW5kbGVyIOeCueWHu+Wbnuiwg+WHveaVsFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmICghIXJpZ2h0Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJSaWdodEJ1dHRvbihyaWdodEJhciwgcmlnaHRCYXJJbWcsIHJpZ2h0Q2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uKFwiXCIsIG51bGwsIG51bGwpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICog6YCa55+l5a6i5oi356uv5L+u5pS554q25oCBXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWNjU3RhdGVDaGFuZ2VkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLm1jY1N0YXRlQ2hhbmdlZCgpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2VuZFFyQ29kZSA9IChwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaJq+aPj+adoeeggeWSjOS6jOe7tOeggVxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXNcclxuICAgICAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICAgICAqIEBwYXJhbSBmYWlsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLnNjYW5RUkNvZGUocGFyYW1zLCBzdWNjZXNzLCBmYWlsKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNsb3NlV2ViVmlldyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmNsb3NlV2ViVmlldygpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdmVyaWZ5UGF5UHdkID0gKHBhcmFtLCBzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC52ZXJpZnlQYXlQd2QocGFyYW0sIHN1Y2Nlc3MsIGZhaWwpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlV2ViVmlldyA9ICh1cmwsIHBhcmFtcyA9IG51bGwsIHRpdGxlID0gJycsIGlzRmluaXNoID0gXCIxXCIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmNyZWF0ZVdlYlZpZXcodXJsLCBwYXJhbXMsIHRpdGxlLCBpc0ZpbmlzaClcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VXNlckRldGFpbEluZm8gPSAoc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLmdldFVzZXJEZXRhaWxJbmZvKHN1Y2Nlc3MsIGZhaWwpXHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDlsIZjYXZhcyDkv53lrZjliLDmnKzlnLDnm7jlhoxcclxuICogQHBhcmFtIGNhbnZhc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNhdmVRY29kZSA9IChjYW52YXMpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIHVpID0gVVAuVy5VSSB8fCB7fTtcclxuICAgIHZhciBwaWNVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYXBwLmxvZ0V2ZW50KCdzYXZlUGljdHVyZV9OZXdZZWFyQWN0Jyk7XHJcbiAgICAgICAgYXBwLnNhdmVQaWNUb0xvY2FsKHtcclxuICAgICAgICAgICAgdXJsOiBwaWNVcmwgJiYgcGljVXJsLnN1YnN0cigyMilcclxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHVpLnNob3dUb2FzdFdpdGhQaWMoJ+W3suS/neWtmOWIsOezu+e7n+ebuOWGjCcpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9PSAndXBkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd0FsZXJ0KCfor7fljYfnuqfliLDmnIDmlrDlrqLmiLfnq68nLCBmdW5jdGlvbiAoKSB7IC8vIOWOu+WNh+e6p1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnWWVzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnYuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS9jbi9hcHAvaWQ2MDAyNzM5Mjg/Y29kZT1uZXdZZWFyQWN0aXZpdHknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL3lvdWh1aS45NTUxNi5jb20vYXBwL2FwcC9zb2Z0d2FyZS91bmlvbnBheS13YWxsZXQtdjIuYXBrP2NvZGU9bmV3WWVhckFjdGl2aXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhcHAub3BlbkJyb3dzZXIodXJsKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ05vJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAn6ams5LiK5Y2H57qnJywgJ+eojeWQjuWGjeivtCcsICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dUb2FzdChtc2cgfHwgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzaGFyZSA9ICh0aXRsZSwgZGVzYywgaW1nVVJMLCBwYWdlVVJsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciBlbnYgPSBVUC5XLkVudiB8fCB7fTtcclxuXHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaYvuekuuWIhuS6q+mdouadv1xyXG4gICAgICAgICAqIOWmguaenOaJgOaciea4oOmBk+S9v+eUqOebuOWQjOeahOWIhuS6q+WGheWuueWImeS7heWhq+WGmXBhcmFtc+WNs+WPr++8jFxyXG4gICAgICAgICAqIOWmguaenOmcgOimgeagueaNruS4jeWQjOa4oOmBk+WumuWItuWIhuS6q+WGheWuue+8jOWImeWPr3BhcmFtc+eVmeepuu+8jOWcqHNoYXJlQ2FsbGJhY2vkuK3ov5Tlm57mjIflrprmuKDpgZPnmoTliIbkuqvlhoXlrrlcclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zIOWIhuS6q+WPguaVsFxyXG4gICAgICAgICAqICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICB0aXRsZe+8miDliIbkuqvmoIfpophcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGRlc2M6IOWIhuS6q+aRmOimgVxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgcGljVXJs77ya5YiG5Lqr5Zu+5qCHXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBzaGFyZVVybO+8muivpuaDheWcsOWdgFxyXG4gICAgICAgICAqICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICogQHBhcmFtIHNoYXJlQ2FsbGJhY2sg5YiG5Lqr5pe25Zue6LCDXHJcbiAgICAgICAgICogICAgICAgICAgICAgIGNoYW5uZWzvvJp7XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAw77ya55+t5L+hXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAx77ya5paw5rWq5b6u5Y2aXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAz77ya5b6u5L+h5aW95Y+LXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA077ya5b6u5L+h5pyL5Y+L5ZyIXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA177yaUVHlpb3lj4tcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDbvvJpRUeepuumXtFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgN++8muWkjeWItumTvuaOpVxyXG4gICAgICAgICAqICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICogICAgICAgICAgICAgIGRhdGE6IOm7mOiupOWIhuS6q+aVsOaNrlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5zaG93U2hhcmVQYW5lbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgZGVzYzogZGVzYyxcclxuICAgICAgICAgICAgcGljVXJsOiBpbWdVUkwsXHJcbiAgICAgICAgICAgIHNoYXJlVXJsOiBwYWdlVVJsICAvLyB0b2RvIOaZrumAmuWIhuS6q1xyXG4gICAgICAgIH0sIG51bGwpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueUqOaIt+eahOWumuS9je+8jOmmluWFiOmAmui/h0dQUyDlrprkvY3vvIzlpoLmnpzlrprkvY3lpLHotKXvvIzpgJrov4fmjqXlj6NnZXRDaXR5LOWIqeeUqElQ5Zyw5Z2A6L+b6KGM5a6a5L2N77yM5aaC5p6c6L+Y5piv5aSx6LSl77yM6YCa6L+H5o+S5Lu26I635Y+W5a6i5oi356uv5bem5LiK6KeS55qE5Z+O5biC5L+h5oGv77yM5L6d54S25aSx6LSl6buY6K6k56m/Y2l0eUNkOjMxMDAwMCDku6PooajkuIrmtbfluIJcclxuICogQHBhcmFtIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudExvY2F0aW9uSW5mbyA9IChjYWxsYmFjazIpID0+IHtcclxuICAgIGNvbnN0IHVpID0gVVAuVy5VSTtcclxuICAgIHVpLnNob3dMb2FkaW5nKCk7XHJcbiAgICBsZXQgY2FsbGJhY2sgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgIHVpLmRpc21pc3MoKTtcclxuICAgICAgICBjYWxsYmFjazIoZGF0YSlcclxuICAgIH1cclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFwcC5nZXRDdXJyZW50TG9jYXRpb25JbmZvKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGFsZXJ0KEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjbWQ6IFwiL1wiICsgQ09ORklHLlJFU1QuZ2V0Q2l0eSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwYXRoOiBcImh0dHA6Ly8xNzIuMjEuMzMuNTY6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiK0NPTkZJRy5SRVNULmdldENpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb246IFwiMi4wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogXCIyXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEucGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEucGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaE5hdGl2ZURhdGEoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoTmF0aXZlRGF0YShjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hOYXRpdmVEYXRhID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5a6i5oi356uv5L+h5oGvXHJcbiAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3NcclxuICAgICAgICAgKiBAcGFyYW0gZmFpbFxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIDDvvJrln47luILkv6Hmga9jaXR5Q2TvvJsx77ya57uP57qs5bqm77ybNe+8mlVzZXJJZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5mZXRjaE5hdGl2ZURhdGEoMCwgKGRhdGEgPSB7fSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICAgICAgY2l0eUNkOiBcIjMxMDAwMFwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNhdmVQaWNUb0xvY2FsID0gKGNhbnZhcywgcmVzb2x2ZSkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgdWkgPSBVUC5XLlVJIHx8IHt9O1xyXG4gICAgdmFyIHBpY1VybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuc2F2ZVBpY1RvTG9jYWwoe1xyXG4gICAgICAgICAgICB1cmw6IHBpY1VybCAmJiBwaWNVcmwuc3Vic3RyKDIyKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgLy/miJDlip9cclxuICAgICAgICAgICAgISFyZXNvbHZlICYmIHJlc29sdmUoXCJzdWNjZXNzXCIpO1xyXG4gICAgICAgIH0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9PSAndXBkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd0FsZXJ0KCfor7fljYfnuqfliLDmnIDmlrDlrqLmiLfnq68nLCBmdW5jdGlvbiAoKSB7IC8vIOWOu+WNh+e6p1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnWWVzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnYuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS9jbi9hcHAvaWQ2MDAyNzM5Mjg/Y29kZT1uZXdZZWFyQWN0aXZpdHknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL3lvdWh1aS45NTUxNi5jb20vYXBwL2FwcC9zb2Z0d2FyZS91bmlvbnBheS13YWxsZXQtdjIuYXBrP2NvZGU9bmV3WWVhckFjdGl2aXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhcHAub3BlbkJyb3dzZXIodXJsKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ05vJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAn6ams5LiK5Y2H57qnJywgJ+eojeWQjuWGjeivtCcsICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICEhcmVzb2x2ZSAmJiByZXNvbHZlKFwiZmFpbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRleHRDYW52YXNlID0gKHRleHQsIGNvbG9yLCBsb25nID0gNjg0LCBzaG90ID0gNjApID0+IHtcclxuXHJcbiAgICBsZXQgcmVtMnB4ID0gKHZhbCkgPT4ge1xyXG4gICAgICAgIHZhciBjV2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcclxuICAgICAgICByZXR1cm4gdmFsICogY1dpZHRoIC8gNzUwXHJcbiAgICB9XHJcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHRDYW52YXMnKTtcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICAvL+ioree9rueVq+S9iOeahOWvrOmrmFxyXG4gICAgLy8gdmFyIGJnV2lkdGggPSByZW0ycHgobG9uZyk7XHJcbiAgICAvLyB2YXIgYmdIZWlnaHQgPSByZW0ycHgoc2hvdCk7XHJcblxyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzaG90KTtcclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGxvbmcpO1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIGN0eC5yb3RhdGUoLTkwICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICB2YXIgdGV4dCA9IHRleHQ7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xyXG4gICAgbGV0IGZvbnRTaXplID0gc2hvdDtcclxuICAgIGN0eC5mb250ID0gZm9udFNpemUgKyAncHggQWlyYWwnO1xyXG4gICAgd2hpbGUgKGN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCA+IGxvbmcpIHtcclxuICAgICAgICBmb250U2l6ZS0tO1xyXG4gICAgICAgIGN0eC5mb250ID0gZm9udFNpemUgKyAncHggQWlyYWwnO1xyXG4gICAgfVxyXG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIC1sb25nLCBmb250U2l6ZSk7XHJcbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDnlJ/miJDlm77niYflubbkv53lrZjliLDnm7jlhoxcclxuICogQHBhcmFtIGJndXJsIOiDjOaZr+WbvueJh+eahOWcsOWdgFxyXG4gKiBAcGFyYW0gcXJjb2RlVVJMIOS6jOe7tOeggeeahOWcsOWdgFxyXG4gKiBAcGFyYW0gcXJjb2RlV2RBbmRIZyDkuoznu7TnoIHnmoTlrr3luqZcclxuICogQHBhcmFtIHhXaWR0aCDkuoznu7TnoIHot53nprvlt6bkuIrop5LnmoQg4oaSIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0geUhlaWdodCDkuoznu7TnoIHot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0gdGV4dGJnVVJMIOWKoOWFpeeUu+W4g+eahOWbvueJh+eahFVSTFxyXG4gKiBAcGFyYW0geFRleHRXaWR0aCDliqDlhaXnlLvluIPnmoTlm77niYfot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0geVRleHRIZWlnaHQg5Yqg5YWl55S75biD55qE5Zu+54mH6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlQ29udmFzQW5kU2F2ZVBob3RvID0gKGNhbnZhc09iaiwgcmVzb2x2ZSkgPT4ge1xyXG4gICAgbGV0IHtiZ3VybCwgcXJjb2RlVVJMLCBxcmNvZGVXZEFuZEhnLCB4V2lkdGgsIHlIZWlnaHQsIHRleHRiZ1VSTCwgeFRleHRXaWR0aCwgeVRleHRIZWlnaHR9ID0gY2FudmFzT2JqO1xyXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tb25DYW52YXNXcmFwcGVyJyk7XHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOeUu+W4g+WGheWuuVxyXG4gICAgICovXHJcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMud2lkdGhcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5zcmMgPSBiZ3VybDtcclxuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8v6Kit572u55Wr5L2I55qE5a+s6auYXHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBpbWcud2lkdGgpO1xyXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGltZy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAvL+WcqOeVq+W4g+S4iueVq+iDjOaZr+WcllxyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcclxuXHJcbiAgICAgICAgaWYgKCEhdGV4dGJnVVJMKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0VXJpID0gdGV4dGJnVVJMO1xyXG4gICAgICAgICAgICB2YXIgdGV4dEltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICB0ZXh0SW1nLnNyYyA9IHRleHRVcmk7XHJcbiAgICAgICAgICAgIHRleHRJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0ZXh0SW1nLCB4VGV4dFdpZHRoLCB5VGV4dEhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5LqM57at56K85ZyW54mH5aSn5bCPXHJcbiAgICAgICAgdmFyIHFyY29kZVdpZHRoQW5kSGVpZ2h0ID0gcXJjb2RlV2RBbmRIZztcclxuICAgICAgICAvL+a4hemZpOS6jOe7tOeggVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdmFyIHFyY29kZSA9IG5ldyBRUkNvZGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIiksIHtcclxuICAgICAgICAgICAgdGV4dDogcXJjb2RlVVJMLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHFyY29kZVdpZHRoQW5kSGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogcXJjb2RlV2lkdGhBbmRIZWlnaHQsXHJcbiAgICAgICAgICAgIGNvcnJlY3RMZXZlbDogUVJDb2RlLkNvcnJlY3RMZXZlbC5MXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHFyY29kZUltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXTtcclxuICAgICAgICBxcmNvZGVJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+eVq+S6jOe2reeivOeahOWclueJh1xyXG4gICAgICAgICAgICBsZXQgcXJjb2RlRHggPSB4V2lkdGgsIHFyY29kZUR5ID0geUhlaWdodDtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShxcmNvZGVJbWcsIHFyY29kZUR4LCBxcmNvZGVEeSk7XHJcbiAgICAgICAgICAgIC8vIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgc2F2ZVBpY1RvTG9jYWwoY2FudmFzLCByZXNvbHZlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL3JlcXVlc3QuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJiYW5rQ2FkbGlzdC13YXJwLWRpdlwiOlwiYmFua0NhZGxpc3Qtd2FycC1kaXZcIixcImxlZnRBcnJvd1wiOlwibGVmdEFycm93XCIsXCJyaWdodEFycm93XCI6XCJyaWdodEFycm93XCIsXCJpY29uLXNlbGVjdGVkXCI6XCJpY29uLXNlbGVjdGVkXCIsXCJub09wZXJhdGVcIjpcIm5vT3BlcmF0ZVwiLFwibm9PcGVyYXRlSWNvblwiOlwibm9PcGVyYXRlSWNvblwiLFwibWFza1wiOlwibWFza1wiLFwiYmFua0NhZGxpc3Qtd2FycC1pbm5lclwiOlwiYmFua0NhZGxpc3Qtd2FycC1pbm5lclwiLFwiaGVhZFwiOlwiaGVhZFwiLFwicGFkZGluZ1JpZ2h0XCI6XCJwYWRkaW5nUmlnaHRcIixcImFycm93RGl2XCI6XCJhcnJvd0RpdlwiLFwiaGVhZC10aXRsZVwiOlwiaGVhZC10aXRsZVwiLFwiY29udGVudFwiOlwiY29udGVudFwiLFwiY2FyZEl0ZW1cIjpcImNhcmRJdGVtXCIsXCJpY29uXCI6XCJpY29uXCIsXCJpY29uLWFkZFwiOlwiaWNvbi1hZGRcIixcIml0ZW1Db250ZW50XCI6XCJpdGVtQ29udGVudFwifTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL1Rvb2xzL0NhcmRsaXN0L2NhcmRsaXN0LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDgwZmVjOTdlM2JiM2Q3MDNiMjA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSA0IiwiY29uc3QgY29uZmlnID0ge1xyXG4gICAgUkVTVDoge1xyXG4gICAgICAgIGFwcGx5TWNjOiBcImNvbGxlY3Rpb25Db2RlL2FwcGx5TWNjXCIsIC8vMi40LjTnlLPor7fmlLbmrL7noIHmjqXlj6NcclxuICAgICAgICBnZXRNY2NDYXJkTGlzdDogXCJjb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiLCAvLzIuNC4y5ZWG5oi35pS25qy+56CB5Y2h5YiX6KGo5o6l5Y+jXHJcbiAgICAgICAgYXBwbHlNYXQ6IFwiY29sbGVjdGlvbkNvZGUvYXBwbHlNYXRcIiwgLy/nlLPor7fnianmlpnmjqXlj6NcclxuICAgICAgICBnZXRNY2hudEFuZEFyZWFJbmY6IFwibWNobnQvZ2V0TWNobnRBbmRBcmVhSW5mLnNqc29uXCIsIC8v5ZWG5oi357G75Z6L5Y+K5Zyw5Yy65YiX6KGo5p+l6K+iXHJcbiAgICAgICAgdXBncmFkZU1jYzogXCJjb2xsZWN0aW9uQ29kZS91cGdyYWRlTWNjXCIsIC8vMi40LjbljYfnuqfmlLbmrL7noIHmjqXlj6MsXHJcbiAgICAgICAgZ2V0QWRkckxpc3Q6IFwiYWRkcmVzcy9nZXRBZGRyTGlzdFwiICwgLy8yLjQuMTMg6I635Y+W5pS26LSn5Zyw5Z2A5YiX6KGoXHJcbiAgICAgICAgZGVsZXRlQWRkcmVzczogXCJhZGRyZXNzL2RlbGV0ZUFkZHJlc3NcIiAsIC8vMi40LjEyIOWIoOmZpOaUtui0p+WcsOWdgFxyXG4gICAgICAgIGVkaXRBZGRyZXNzOiBcImFkZHJlc3MvZWRpdEFkZHJlc3NcIiwgLy8yLjQuMTEg5L+u5pS55pS26LSn5Zyw5Z2ALFxyXG4gICAgICAgIG5ld0FkZHJlc3M6IFwiYWRkcmVzcy9uZXdBZGRyZXNzXCIsIC8vMi40LjEwIOaWsOWinuaUtui0p+WcsOWdgFxyXG4gICAgICAgIG1jaG50T3BlciA6XCJtY2hudC9tY2hudE9wZXJcIiwgLy8yLjIuMiDlupfpk7rkv6Hmga/mm7TmlrBcclxuICAgICAgICBnZXRMaW1pdEF0SW5mbzpcIm1jaG50L2dldExpbWl0QXRJbmZvXCIsIC8v6I635Y+W5pS25qy+6ZmQ6aKdXHJcbiAgICAgICAgc2V0TWNjT25PZmY6XCJjb2xsZWN0aW9uQ29kZS9zZXRNY2NPbk9mZlwiLCAvL+WBnOatouWSjOWQr+eUqOS7mOasvueggeWAn+WPo1xyXG4gICAgICAgIGdldE1jaG50RGV0YWlsOlwibWNobnQvbWNobnREZXRhaWxcIiwgLy8yLjIuMSDojrflj5blupfpk7ror6bmg4XpobXpnaJcclxuICAgICAgICAvLyB1cGdyYWRlTWNjOiBcImNvbGxlY3Rpb25Db2RlL3VwZ3JhZGVNY2NcIiwgLy8yLjQuNuWNh+e6p+aUtuasvueggeaOpeWPo1xyXG4gICAgICAgIGdldFRvZGF5VHJhbnM6XCJ0cmFuL2dldFRvZGF5VHJhbnNcIiwvLzIuMS4zLy/ku4rml6XorqLljZXmjqXlj6NcclxuICAgICAgICBnZXRUb2RheUluY29tZTpcInRyYW4vZ2V0VG9kYXlJbmNvbWVcIiwvLzIuMS4x5ZWG5oi35pyN5Yqh6aaW6aG15LuK5pel5pS25qy+5o6l5Y+jfn5+fn5+fn5cclxuICAgICAgICBnZXRIaXN0b3J5SW5jb21lOlwidHJhbi9nZXRIaXN0b3J5SW5jb21lXCIsLy8yLjEuMuWOhuWPsuaUtuasvuaOpeWPo1xyXG4gICAgICAgIGdldEhpc3RvcnlUcmFuczpcInRyYW4vZ2V0SGlzdG9yeVRyYW5zXCIsLy8yLjEuNOWOhuWPsuiuouWNleaOpeWPo1xyXG4gICAgICAgIGdldExvZ2lzdGljc1N0OlwibWF0ZXJpZWwvZ2V0TG9naXN0aWNzU3RcIiwvLzIuMy4z54mp5rWB6K+m5oOF5o6l5Y+j5p+l6K+iXHJcbiAgICAgICAgZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bTpcInRyYW4vZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bVwiLC8vMi4xLjXljZXnrJTorqLljZXmn6Xor6LmjqXlj6NcclxuICAgICAgICBnZXRBdWRpdEluZm86XCJjb2xsZWN0aW9uQ29kZS9nZXRBdWRpdEluZm9cIiwvLzIuNC4xNOS/oeeUqOWNoeWNh+e6p+WuoeaguOe7k+aenOafpeivolxyXG4gICAgICAgIHVwZGF0ZU1jY0NhcmQ6XCJjb2xsZWN0aW9uQ29kZS91cGRhdGVNY2NDYXJkXCIsLy8yLjQuOeabtOaNouaUtuasvuWNoeaOpeWPo1xyXG4gICAgICAgIGdldFVwZ3JhZGVTdDpcIm1jaG50L2dldFVwZ3JhZGVTdFwiLC8v5p+l6K+i5ZWG5oi35piv5ZCm5Y2H57qn5L+h55So5Y2h5pS25qy+XHJcbiAgICAgICAgZ2V0TWNjVHJhbnNOdW06J2NvbGxlY3Rpb25Db2RlL2dldE1jY1RyYW5zTnVtJywvL+iOt+WPluiwg+WPluaUr+S7mOaOp+S7tueahFRO5Y+3XHJcbiAgICAgICAgZ2V0TWF0ZXJpZWxJbmZvTGlzdDpcImNvbGxlY3Rpb25Db2RlL2dldE1hdGVyaWVsSW5mb0xpc3RcIiwvLzIuNC4z54mp5paZ5L+h5oGv5YiX6KGo5o6l5Y+jXHJcbiAgICAgICAgdXNlckluZm86XCIvYXBwL2luQXBwL3VzZXIvZ2V0XCIsLy/ojrflj5bnlKjmiLfkv6Hmga9cclxuICAgICAgICBpc0JsYWNrOlwic2Nhbi9pc0JsYWNrXCIsLy8yLjEuNeaUtumTtuWRmOaYr+WQpuWcqOm7keWQjeWNlVxyXG4gICAgICAgIGlzQXBwbHk6XCJzY2FuL2lzQXBwbHlcIiwvLzIuMS405piv5ZCm5bey57uP55Sz6K+357qi5YyF56CBXHJcbiAgICAgICAgc2hhcmVMaW5rOlwic2Nhbi9zaGFyZUxpbmtcIiwvLzIuMS4255Sf5oiQ57qi5YyF56CB6ZO+5o6lXHJcbiAgICAgICAgcmVjbWRSZWNvcmQ6XCJzY2FuL3JlY21kUmVjb3JkXCIsLy/mjqjojZDlhbPns7vorrDlvZVcclxuICAgICAgICBnZXRMb2dpc3RpY3NMaXN0OlwibWF0ZXJpZWwvZ2V0TG9naXN0aWNzTGlzdFwiLC8v6I635Y+W54mp5paZ5Y6G5Y+y6K6i5Y2VXHJcbiAgICAgICAgZ2V0UmV3YXJkTGlzdDpcInNjYW4vZ2V0UmV3YXJkTGlzdFwiLC8vMi4xLjfmn6Xor6LmlLbpk7blkZjotY/ph5HmmI7nu4borrDlvZVcclxuICAgICAgICBnZXRQcm90b2NvbEluZm86XCJjb2xsZWN0aW9uQ29kZS9nZXRQcm90b2NvbEluZm9cIiwvL+WVhuaIt+WNh+e6p+afpeivouaYvuekuuWNj+iurueahOWQjeensOWSjOWNj+iurueahOWcsOWdgFxyXG4gICAgICAgIGdldENpdHk6XCJyZWdpb24vZ2V0Q2l0eVwiLC8v6YCa6L+HSVDlnLDlnYDojrflj5blnLDlnYDlrprkvY1cclxuICAgICAgICBnZXRRclVybDpcImNvbGxlY3Rpb25Db2RlL2dldFFySW5mb1wiLy8yLjEuMeiOt+WPlueUqOaIt+aUtuasvueggVVSTFxyXG4gICAgfSxcclxuICAgIFNUQVRVU0NPREU6IHtcclxuICAgICAgICBTVUNDRVNTOlwiMDBcIlxyXG4gICAgfSxcclxuICAgIENPTlNUX0RBVEE6e1xyXG4gICAgICAgIGltZ2VTaXplOlwiMzAwXCJcclxuICAgIH0sXHJcbiAgICBDQUNIRUtFWTp7XHJcbiAgICAgICAgZ2V0TWNjQ2FyZExpc3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1jb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLWNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtbWNobnQvZ2V0VXBncmFkZVN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtbWNobnQvZ2V0VXBncmFkZVN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE1jaG50RGV0YWlsOntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtbWNobnQvbWNobnREZXRhaWxcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1tY2hudC9tY2hudERldGFpbFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0FwcGx5OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtc2Nhbi9pc0FwcGx5XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtc2Nhbi9pc0FwcGx5XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEFkZHJMaXN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtYWRkcmVzcy9nZXRBZGRyTGlzdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLWFkZHJlc3MvZ2V0QWRkckxpc3RcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCJpbXBvcnQgSW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIjtcclxuXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDlj6rkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICog5YWI6K+757yT5a2Y77yM5ZCM5q2l5b6A5ZCO5Y+w5Y+R6K+35rGC77yM6K+35rGC5oql5paH5Zue5p2l5ZCO5Yi35paw57yT5a2Y5Y+K6aG16Z2iXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UgPSAodXBkYXRlLHJvbGxLZXksc2Vjb25kS2V5KSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbi8vICAgICAgICAgICAgIHJvbGxLZXksXHJcbi8vICAgICAgICAgICAgIHNlY29uZEtleVxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgdXBkYXRlOiB1cGRhdGUsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOS4jeaUr+aMgSBzdyAgICzmsLjkuYXnt6nlrZhcclxuLy8gICogQHR5cGUge3tjYWNoZTogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFufX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUxvbmdUaW1lID0gKHJvbGxLZXksIHNlY29uZEtleSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgICAgIHJvbGxLZXksXHJcbi8vICAgICAgICAgICAgIHNlY29uZEtleVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5Y+q5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDHliIbpkp/lhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UxbWluID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMzBtaW4gPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMzAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTFob3VyID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICo2MCoxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UyaG91ciA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAyICogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuXHJcbi8vXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UyNGRpYW4gPSAoKSA9PiB7XHJcbi8vXHJcbi8vICAgICBsZXQgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbi8vICAgICBsZXQgdGVtb3Jyb3cgPSBuZXcgRGF0ZSgpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0SG91cnMoMjMpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0TWludXRlcyg1OSk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRTZWNvbmRzKDU5KTtcclxuLy8gICAgIGxldCB0ZW0gPSB0ZW1vcnJvdy5nZXRUaW1lKCk7XHJcbi8vICAgICBsZXQgdmFsaWRhdGVUaW1lID0gdGVtIC0gbm93ICsgMTAwMCAqIDYwXHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICAgICAgdmFsaWRhdGVUaW1lOiB2YWxpZGF0ZVRpbWUsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIHdvcmtib3jnmoTnrZbnlaUgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICrkuLpnZXTor7fmsYLvvIzkuI3liqDlr4ZcclxuLy8gICrmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAq5YWI6K+757yT5a2Y77yM5ZCM5pe25b6A5ZCO5Y+w5Y+R6K+35rGC77yM6K+35rGC5oql5paH5Zue5p2l5ZCO5Yi35paw57yT5a2Y5Y+K6aG16Z2iXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBjYWNoZTogYm9vbGVhbiwgYXN5bmM6IGJvb2xlYW59fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlID0gKHVwZGF0ZSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBieUFqYXg6IGZhbHNlLC8v5aaC5p6c6KaB5pSv5oyBc3cg5bCx5LiN6ZyA5L2/55SoYWpheFxyXG4vLyAgICAgICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICB1cGRhdGU6IHVwZGF0ZVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDMw5YiG6ZKf5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDMwbWluID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMzAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMeWwj+aZguWGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QxaG91ciA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MmhvdXIgPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAyICogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLyoqXHJcbiAqIOivpeetlueVpeaYr+S4gOWumuaXtumXtOWGheS4jeWQkeWQjuWPsOivt+axguaVsOaNru+8jCDlpoLmnpzlnKjorr7lpIfkuIrmlK/mjIFzd+WImeS9v+eUqHN3LOWQpuWImeS9v+eUqCBsb2NhbFN0b3JhZ2VcclxuICogQHBhcmFtIHRpbWUgIOimgee8k+WtmOeahOaXtumXtCDljZXkvY3mmK/mr6vnp5JcclxuICogQHJldHVybnMge3tieUFqYXg6IGJvb2xlYW4sIGZvckNoc3A6IGJvb2xlYW4sIGVuY3J5cHQ6IGJvb2xlYW4sIGNhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7dmFsaWRhdGVUaW1lOiAqfX19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2FjaGVGaXJzdCA9KHRpbWUpPT57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGJ5QWpheDogdHJ1ZSxcclxuICAgICAgICBmb3JDaHNwOmZhbHNlLFxyXG4gICAgICAgIGVuY3J5cHQ6ZmFsc2UsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICB2YWxpZGF0ZVRpbWU6dGltZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogIOivpeetlueVpeaYr+S4gOWumuaXtumXtOWGheS4jeWQkeWQjuWPsOivt+axguaVsOaNru+8jOa3u+WKoOe8k+WtmOWPquWcqGxvY2Fsc3RvcmFnZeS4rVxyXG4gKiBAcGFyYW0gdGltZSAg6KaB57yT5a2Y55qE5pe26Ze0IOWNleS9jeaYr+avq+enklxyXG4gKiBAcGFyYW0gcm9sbEtleSAgIOmdnuW/heWhqyDlpoLmnpzlkI7mnJ/opoHliKDpmaTov5nkuKrnvJPlrZjvvIzov5nloavlhpnov5lrZXlcclxuICogQHBhcmFtIHNlY29uZEtleSAg6Z2e5b+F5aGrIOWmguaenOWQjuacn+imgeWIoOmZpOi/meS4que8k+WtmO+8jOi/meWhq+WGmei/mWtleVxyXG4gKiBAcmV0dXJucyB7e2NhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7bmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6ICosIHJvbGxLZXk6ICosIHNlY29uZEtleTogKn19fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3RTdG9yYWdlID0odGltZSxyb2xsS2V5LCBzZWNvbmRLZXkpPT57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsaWRhdGVUaW1lOiB0aW1lLFxyXG4gICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXNwb25zZUZvcm1hdHRlciA9IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgcmVzID0ge1xyXG4gICAgICAgIHN0YXR1c0NvZGU6IGRhdGEucmVzcCxcclxuICAgICAgICBkYXRhOiBkYXRhLnBhcmFtcyxcclxuICAgICAgICBtc2c6IGRhdGEubXNnXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIOivpeetlueVpeaYr+WFiOivu+e8k+WtmO+8jOWQjOaXtuWQkeWQjuWPsOWPkemAgeivt+axgu+8jOivt+axguWbnuadpeWQjuWQjOatpeabtOaWsOe8k+WtmO+8jOWbnuiwg3VwZGF0ZSDlh73mlbDvvIxcclxuICogQHBhcmFtIHVwZGF0ZSDlv4Xloavmm7TmlrDpobXpnaLnmoTlm57osIPlh73mlbBcclxuICogQHBhcmFtIHJvbGxLZXkgIOmdnuW/heWhqyDorr7nva7nvJPlrZjnmoQgcm9sbGtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5IOmdnuW/heWhqyDorr7nva7nvJPlrZjnmoQgc2Vjb25kS2V5XHJcbiAqIEByZXR1cm5zIHt7Y2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHthc3luYzogYm9vbGVhbiwgcm9sbEtleTogKiwgc2Vjb25kS2V5OiAqfSwgdXBkYXRlOiAqfX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UgPSAodXBkYXRlLHJvbGxLZXksc2Vjb25kS2V5KSA9PiB7XHJcblxyXG4gICBsZXQgIHJlZnJlc2hEb21GdW5jPShyZXNwb25zZSk9PntcclxuICAgICAgIGxldCByZXE9cmVzcG9uc2VGb3JtYXR0ZXIocmVzcG9uc2UpXHJcbiAgICAgICAvLyDlsIbojrflj5bnmoTmlbDmja7lkoznvJPlrZjkuK3nmoTmlbDmja7ov5vooYzlr7nmr5RcclxuICAgICAgIGxldCBkYXRhRnJvbUNhY2hlID0ge307XHJcbiAgICAgICBVUC5XLlV0aWwuZ2V0RnJvbVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICB9LGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgIGlmKCAhIWRhdGEgKXtcclxuICAgICAgICAgICAgICAgIGRhdGFGcm9tQ2FjaGUgPSBkYXRhO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgfSlcclxuICAgICAgIGxldCBpc1NhbWVBdEFsbCA9IEltbXV0YWJsZS5pcyhJbW11dGFibGUuZnJvbUpTKHJlcSksSW1tdXRhYmxlLmZyb21KUyhkYXRhRnJvbUNhY2hlKSk7IC8v5pWw5o2u5piv5ZCm5a6M5YWo55u45ZCMXHJcbiAgICAgICBpZiggIWlzU2FtZUF0QWxsICl7IC8v5pWw5o2u5pyJ5Y+Y5YqoXHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXEpXHJcbiAgICAgICB9XHJcbiAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgZW5kT2ZTeW5jRnVuYzpmYWxzZSxcclxuICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IHJlZnJlc2hEb21GdW5jLFxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5Yig6ZmkbG9jYWxzdG9yYWdl5Lit55qE57yT5a2YXHJcbiAqIEBwYXJhbSByb2xsS2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXlcclxuICovXHJcbmV4cG9ydCBjb25zdCByZW1vdmVDYWNoZSA9IChyb2xsS2V5LCBzZWNvbmRLZXkpID0+IHtcclxuICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICByb2xsS2V5OiByb2xsS2V5LFxyXG4gICAgICAgIHNlY29uZEtleTogc2Vjb25kS2V5XHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIoOmZpOe8k+WtmOaIkOWKnycpXHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICBmdWxsOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgXCIuL0NvbGxlY3Rpb25CYW5rQ2FyZC5zY3NzXCJcclxuaW1wb3J0IENhcmRMaXN0IGZyb20gXCIuLi9Ub29scy9DYXJkbGlzdC9DYXJkbGlzdFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uQmFua0NhcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCB7IHN0b3JlUmVjZWl2ZUNhcmRPYmosIGFkZENhcmQsIGhhbmRsZUNoYW5nZUNhcmQsIGNhcmRMaXN0IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJDQkNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250ZW50V2FycFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGlwcy13YXJwLWRpdlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogPGkgY2xhc3NOYW1lPVwidGlwc0ljb25cIj48L2k+ICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICDlvZPliY3mlLbmrL7pk7booYzljaFcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPENhcmRMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFNlbmVObz17XCIxMDAyMFwifSBkYXRhPXtjYXJkTGlzdH0gdmFsdWU9e3N0b3JlUmVjZWl2ZUNhcmRPYmp9IGhhdmVBZGRDYXJkPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDYXJkQ2FsbGJhY2s9e2FkZENhcmR9IHRpdGxlPXsn6YCJ5oup5pS25qy+6ZO26KGM5Y2hJ30gb25DaGFuZ2U9e2hhbmRsZUNoYW5nZUNhcmR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2hvd1NlbGVjdGVkQ2FyZD48L1Nob3dTZWxlY3RlZENhcmQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9DYXJkTGlzdD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpcHMtd2FycC1kaXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwidGlwc0ljb25cIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOmAmui/h+aUtuasvueggeaUtuWFpeeahOmSseasvuWwhuS8mui/m+WFpeivpemTtuihjOWNoVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXJcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBTaG93U2VsZWN0ZWRDYXJkID0gcHJvcHMgPT4ge1xyXG4gICAgbGV0IHN0eWxlT2JqID0ge1xyXG4gICAgICAgIGNvbG9yOiAnIzRBOTBFMiAnLFxyXG4gICAgICAgIGZvbnRTaXplOiAncmVtKDMyKScsXHJcbiAgICAgICAgbGluZUhlaWdodDogJ3JlbSgyOCknXHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIHshIXByb3BzLmV4dHJhLmljb25SZWxVcmwgPyAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbmtDYXJkLXNlbGVjdG9yLWRpdlwiIG9uQ2xpY2s9e3Byb3BzLm9uQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImJhbmtJY29uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZEltYWdlOiBcInVybCgnaHR0cHM6Ly93YWxsZXQuOTU1MTYuY29tL3Mvd2wvaWNvbi9kZWZhdWx0L1wiICsgcHJvcHMuZXh0cmEuaWNvblJlbFVybCArIFwiJylcIiB9fT48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmFua05hbWVcIj57cHJvcHMuZXh0cmEuYmFuayArIHByb3BzLmV4dHJhLmNhcmRUeXBlICsgXCIoXCIgKyBwcm9wcy5leHRyYS5wYW4gKyBcIilcIn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgey8qIDxpIGNsYXNzTmFtZT1cInJpZ2h0QXJyb3dcIj48L2k+ICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZU9ian0+5pu05o2iPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5rQ2FyZC1zZWxlY3Rvci1kaXZcIiBvbkNsaWNrPXtwcm9wcy5vbkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmFua05hbWUgZ3JheVwiIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT7ngrnlh7vmraTlpITpgInmi6nmgqjnmoTpk7booYzljaE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZU9ian0+5pu05o2iPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJyaWdodEFycm93XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbkJhbmtDYXJkL0NvbGxlY3Rpb25CYW5rQ2FyZC5qcyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtdHJ5XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUHJvbWlzZScsIHsgJ3RyeSc6IGZ1bmN0aW9uIChjYWxsYmFja2ZuKSB7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYodGhpcyk7XG4gIHZhciByZXN1bHQgPSBwZXJmb3JtKGNhbGxiYWNrZm4pO1xuICAocmVzdWx0LmUgPyBwcm9taXNlQ2FwYWJpbGl0eS5yZWplY3QgOiBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlKShyZXN1bHQudik7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qc1xuLy8gbW9kdWxlIGlkID0gOGUwYzFkYjAwMDg1YzhhZDI1NWFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS50cnknKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLlByb21pc2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gOTczY2M4ZWVmYzU5OTMxZGU5NWVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGludm9rZSA9IHJlcXVpcmUoJy4vX2ludm9rZScpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuL19odG1sJyk7XG52YXIgY2VsID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBzZXRUYXNrID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhclRhc2sgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZCA9ICt0aGlzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0VGFzayB8fCAhY2xlYXJUYXNrKSB7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBpID0gMTtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2VzcycpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3coY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IGFhOTYzYjRjMjcxNDRmMDk0Y2NhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBDYXJkTGlzdFVMIGZyb20gXCIuL0Nhckxpc3RVTFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkbGlzdFBhbmVsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGRhdGE6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBzaG93UmlnaHRCYXI6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIGNoYW5nZUNoaWxkU2hvdzogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgaGF2ZUFkZENhcmQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIGFkZENhcmRDYWxsYmFjazpQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBhZGRTZW5lTm86UHJvcFR5cGVzLnN0cmluZ1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICBzaG93UmlnaHRCYXI6IGZhbHNlXHJcbiAgICB9XHJcbiAgICBkaXN0cml0RGF0YSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLmRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5pc1N1cHBvcnQgPT0gMCB8fCBpdGVtLmlzU3VwcG9ydCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuamllSmlLYS5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNodVh1a2EucHVzaChpdGVtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25DbG9zZSgpXHJcbiAgICB9XHJcbiAgICBhZGROZXdDYXJkID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBzZWxmPXRoaXM7XHJcbiAgICAgICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5ouJ6LW357uR5Y2h5o6n5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3NcclxuICAgICAgICAgKiBAcGFyYW0gZmFpbFxyXG4gICAgICAgICAqIEBwYXJhbXMgcGFyYW1zOntzY2VuZTon5Zy65pmv5Y+3J31cclxuICAgICAgICAgKi9cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzZWxmLnByb3BzLmFkZFNlbmVObylcclxuICAgICAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGFwcC5hZGRCYW5rQ2FyZCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wcm9wcy5hZGRDYXJkQ2FsbGJhY2soXCJzdWNjZXNzXCIpXHJcbiAgICAgICAgICAgIH0sICgpPT57XHJcbiAgICAgICAgICAgICAgICBzZWxmLnByb3BzLmFkZENhcmRDYWxsYmFjayhcImZhaWxcIilcclxuICAgICAgICAgICAgfSx7c2NlbmU6c2VsZi5wcm9wcy5hZGRTZW5lTm99KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG4gICAgaGFuZGxJdGVtQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcblxyXG4gICAgICAgIC8qKuWkhOeQhuiHquWumuS5ieeahG9uQ2hhbmdl5Ye95pWwKiovXHJcbiAgICAgICAgaWYgKCEhdGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYucHJvcHMub25DaGFuZ2UodmFsdWUsIHJlc29sdmUsIHJlamVjdClcclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVN0YXRlKHZhbHVlKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUodmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgY2hhbmdlU3RhdGUgPSAodmFsdWUpID0+IHtcclxuICAgICAgICAvKirkv67mlLlMaeeahOaYvuekuioqL1xyXG4gICAgICAgIGxldCBuZXdEYXRhID0gW107XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5kYXRhLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS52aXJ0dWFsQ2FyZE5vID09IHZhbHVlLnZpcnR1YWxDYXJkTm8pXHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3RGF0YS5wdXNoKGl0ZW0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgZGF0YTogbmV3RGF0YVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qKuS/ruaUueWtqeWtkOiKgueCueeahOaYvuekuioqL1xyXG4gICAgICAgIC8vIHRoaXMucHJvcHMuY2hhbmdlQ2hpbGRTaG93KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLmNodVh1a2EgPSBbXTsvL+WPr+S7peaTjeS9nOeahOWNoVxyXG4gICAgICAgIHRoaXMuamllSmlLYSA9IFtdOy8v5LiN5Y+v5Lul5pON5L2c55qE5Y2hXHJcblxyXG4gICAgICAgIHRoaXMuZGlzdHJpdERhdGEoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5jaHVYdWthXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlID0gKHN0YXRlLGNhbGxiYWNrKT0+e1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFua0NhZGxpc3Qtd2FycC1kaXZcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFza1wiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2V9PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5rQ2FkbGlzdC13YXJwLWlubmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJyb3dEaXZcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImxlZnRBcnJvd1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZC10aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIXRoaXMucHJvcHMuc2hvd1JpZ2h0QmFyID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJyb3dEaXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg56Gu6K6kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFkZGluZ1JpZ2h0XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDYXJkTGlzdFVMIGRhdGE9e3RoaXMuY2h1WHVrYX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxJdGVtQ2hhbmdlfT48L0NhcmRMaXN0VUw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oYXZlQWRkQ2FyZCYmKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZEl0ZW1cIiBvbkNsaWNrPXt0aGlzLmFkZE5ld0NhcmR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJpY29uIGljb24tYWRkXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1Db250ZW50XCI+5re75Yqg6ZO26KGM5Y2h5pS25qy+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cInJpZ2h0QXJyb3dcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCBDYXJkTGlzdFVMIGRhdGE9e3RoaXMuamllSmlLYX0gaXNPbmx5U2hvdz17dHJ1ZX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvVG9vbHMvQ2FyZGxpc3QvQ2FyZGxpc3RQYW5lbC5qcyIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgRCkge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSBiNTBkODI0NTZlNTQ1ZGNjM2RkM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCBhcmdzLCB0aGF0KSB7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzXG4vLyBtb2R1bGUgaWQgPSBiNTgwYjk0YjE5NTg0MmNiZjJiMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBPYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBQcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG52YXIgaXNOb2RlID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYgKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKSBwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICBmbiA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKGlzTm9kZSkge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlciwgZXhjZXB0IGlPUyBTYWZhcmkgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIH0gZWxzZSBpZiAoT2JzZXJ2ZXIgJiYgIShnbG9iYWwubmF2aWdhdG9yICYmIGdsb2JhbC5uYXZpZ2F0b3Iuc3RhbmRhbG9uZSkpIHtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmIChQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSkge1xuICAgIC8vIFByb21pc2UucmVzb2x2ZSB3aXRob3V0IGFuIGFyZ3VtZW50IHRocm93cyBhbiBlcnJvciBpbiBMRyBXZWJPUyAyXG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICAgIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmICghaGVhZCkge1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IGJkZTBmNTdlOWI1NzlmOTQzZjg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0Jztcbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xuXG5mdW5jdGlvbiBQcm9taXNlQ2FwYWJpbGl0eShDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSBjMWI5NGUzZTk1ZWQ0MzVhZjU0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdQcm9taXNlJywgeyAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2Ygb25GaW5hbGx5ID09ICdmdW5jdGlvbic7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgfSA6IG9uRmluYWxseSxcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHRocm93IGU7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHlcbiAgKTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzXG4vLyBtb2R1bGUgaWQgPSBjMmUzNWJiZmY4MzMwOTU5NDNjMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanNcbi8vIG1vZHVsZSBpZCA9IGNiNzgzNzUyOTQ1NDJjMjRjNWJhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gZDE4MTBhZTUzMzJlMzZmZmEzYzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG5hdmlnYXRvciA9IGdsb2JhbC5uYXZpZ2F0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgfHwgJyc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdXNlci1hZ2VudC5qc1xuLy8gbW9kdWxlIGlkID0gZWM2Y2JlMzE3Yjk4NTBiMDVjZTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IGVmNTFkNDk4OWYzMDQ0YjJlYjMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IENhcmRsaXN0UGFuZWwgZnJvbSBcIi4vQ2FyZGxpc3RQYW5lbFwiXHJcblxyXG5pbXBvcnQgXCIuL2NhcmRsaXN0LnNjc3NcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZGxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuc3RhdGU9e1xyXG4gICAgICAgICAgICBzZWxlY3RlZFZhbHVlOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICAvKiog5byA5Y+R6aG16Z2i55qEdGl0bGUgICAgKi9cclxuICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAvKiog5Y2h5YiX6KGo6ZuG5ZCIKi9cclxuICAgICAgICBkYXRhOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgICAgICAvKiog5b2T6YCJ5Y2h5Y+R55Sf5pS55Y+Y5pe255qE5Zue5o6J5Ye95pWwICovXHJcbiAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIC8qKiDngrnlh7ttYXNrIOaIlui/lOWbnuaMiemSruaXtueahOWbnuaOieWHveaVsCovXHJcbiAgICAgICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgLyoqIOS9huWJjemAieS4reeahOWAvCovXHJcbiAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAgICAgLyoqIOaYr+WQpuaYvuekuuWPs+S+p+eahOehruWumuaMiemSriovXHJcbiAgICAgICAgc2hvd1JpZ2h0QmFyOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICAvKiog5piv5ZCm5oul5pyJ5re75Yqg5Y2h55qE5Yqf6IO9ICAgICAgICAgKi9cclxuICAgICAgICBoYXZlQWRkQ2FyZDpQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICAvKiog5re75Yqg6ZO26KGM5Y2h5ZCO55qE5Zue5o6J5Ye95pWw77yM5o6l5Y+X5LiA5Liq5Y+C5pWw57G75Z6L5Li6IHN0cmluZyAgXCJzdWNjZXNzXCIg6KGo56S65re75Yqg5oiQ5YqfKi9cclxuICAgICAgICBhZGRDYXJkQ2FsbGJhY2s6UHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgLyoqIOa3u+WKoOWNoeaXtueahOWcuuaZr+WPtyovXHJcbiAgICAgICAgYWRkU2VuZU5vOlByb3BUeXBlcy5zdHJpbmdcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIENsb3NlKCl7XHJcbiAgICAgICAgbGV0IG5vZGU9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIlJlYWN0QmFua0NhcmRsaXN0XCIpWzBdO1xyXG4gICAgICAgIGlmKCEhbm9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUobm9kZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8gaGFuZGxlQ2hhbmdlID0gKGl0ZW0pID0+IHtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRWYWx1ZTogaXRlbX0pXHJcbiAgICAvL1xyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICBvbkNsb3NlID0gKCkgPT4ge1xyXG4gICAgICAgICEhdGhpcy5wcm9wcy5vbkNsb3NlICYmIHRoaXMucHJvcHMub25DbG9zZSgpO1xyXG4gICAgICAgIGxldCBub2RlPWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJSZWFjdEJhbmtDYXJkbGlzdFwiKVswXTtcclxuICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKG5vZGUpXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWtkOe7hOS7tueCueWHu+eahOaXtuWAmeeahOWkhOeQhuaXtumXtFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUNoaWxkQ2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGxldCBub2RlPWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJSZWFjdEJhbmtDYXJkbGlzdFwiKVswXTtcclxuICAgICAgICBpZighbm9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAvLyDliJvlu7ogRE9NXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAnUmVhY3RCYW5rQ2FyZGxpc3QnOyAvLyDnu5nkuIogQ2xhc3NOYW1lXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQodGhpcy5ub2RlKS8v57uZYm9keea3u+WKoOS4gOS4qmRpdlxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2FyZHBhbmVsID0gKFxyXG4gICAgICAgICAgICA8Q2FyZGxpc3RQYW5lbCB7Li4udGhpcy5wcm9wc30gb25DbG9zZT17dGhpcy5vbkNsb3NlfSBjaGFuZ2VDaGlsZFNob3c9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XHJcbiAgICAgICAgKVxyXG4gICAgICAgIGxldCBhbGxDbGFzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ1JlYWN0QmFua0NhcmRsaXN0Jyk7XHJcbiAgICAgICAgUmVhY3RET00ucmVuZGVyKGNhcmRwYW5lbCwgYWxsQ2xhc3NbYWxsQ2xhc3MubGVuZ3RoIC0gMV0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBsZXQge3ZhbHVlLGRhdGF9ID10aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKHZhbHVlICE9dW5kZWZpbmVkICYmICh2YWx1ZS52aXJ0dWFsQ2FyZE5vICE9IHVuZGVmaW5lZHx8dmFsdWUucGFuICE9dW5kZWZpbmVkKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnZpcnR1YWxDYXJkTm8gPT0gdmFsdWUudmlydHVhbENhcmROb3x8aXRlbS5wYW4gPT12YWx1ZS5wYW4pXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtpbmRleF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtpbmRleF0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0b1N0cmluZy5jYWxsKHRoaXMucHJvcHMuY2hpbGRyZW4pID09PSAnW29iamVjdCBBcnJheV0nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtSZWFjdC5DaGlsZHJlbi5tYXAodGhpcy5wcm9wcy5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYTogdGhpcy5zdGF0ZS5zZWxlY3RlZFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDaGlsZENsaWNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucHJvcHMuY2hpbGRyZW4gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbiwge1xyXG4gICAgICAgICAgICAgICAgZXh0cmE6IHRoaXMucHJvcHMudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNoaWxkQ2xpY2tcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9Ub29scy9DYXJkbGlzdC9DYXJkbGlzdC5qcyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzXG4vLyBtb2R1bGUgaWQgPSBmMGRiYzEwYzY4ZGQ4MTQwMTRlN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi9fdXNlci1hZ2VudCcpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4IHx8ICcnO1xudmFyICRQcm9taXNlID0gZ2xvYmFsW1BST01JU0VdO1xudmFyIGlzTm9kZSA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xudmFyIGVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIEludGVybmFsLCBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIE93blByb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlLnJlc29sdmUoMSk7XG4gICAgdmFyIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhlbXB0eSwgZW1wdHkpO1xuICAgIH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZVxuICAgICAgLy8gdjggNi42IChOb2RlIDEwIGFuZCBDaHJvbWUgNjYpIGhhdmUgYSBidWcgd2l0aCByZXNvbHZpbmcgY3VzdG9tIHRoZW5hYmxlc1xuICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9ODMwNTY1XG4gICAgICAvLyB3ZSBjYW4ndCBkZXRlY3QgaXQgc3luY2hyb25vdXNseSwgc28ganVzdCBjaGVjayB2ZXJzaW9uc1xuICAgICAgJiYgdjguaW5kZXhPZignNi42JykgIT09IDBcbiAgICAgICYmIHVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUvNjYnKSA9PT0gLTE7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbiAocHJvbWlzZSwgaXNSZWplY3QpIHtcbiAgaWYgKHByb21pc2UuX24pIHJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgb2sgPSBwcm9taXNlLl9zID09IDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbiAocmVhY3Rpb24pIHtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW4sIGV4aXRlZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgaWYgKHByb21pc2UuX2ggPT0gMikgb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhbmRsZXIgPT09IHRydWUpIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTsgLy8gbWF5IHRocm93XG4gICAgICAgICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgICAgICAgIGRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgICAgIGV4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2UpIHtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZG9tYWluICYmICFleGl0ZWQpIGRvbWFpbi5leGl0KCk7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSBydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpIG9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgdW5oYW5kbGVkID0gaXNVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgdmFyIHJlc3VsdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pIHtcbiAgICAgICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmICh1bmhhbmRsZWQgJiYgcmVzdWx0LmUpIHRocm93IHJlc3VsdC52O1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICByZXR1cm4gcHJvbWlzZS5faCAhPT0gMSAmJiAocHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jKS5sZW5ndGggPT09IDA7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpIHtcbiAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3YgfSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYgKCFwcm9taXNlLl9hKSBwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgdmFyIHRoZW47XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmICh0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0geyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgJHJlamVjdC5jYWxsKHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9hKSB0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX3MpIG5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbiAgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgICByZXR1cm4gQyA9PT0gJFByb21pc2UgfHwgQyA9PT0gV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFByb21pc2U6ICRQcm9taXNlIH0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICB2YXIgJCRyZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoTElCUkFSWSAmJiB0aGlzID09PSBXcmFwcGVyID8gJFByb21pc2UgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyICRpbmRleCA9IGluZGV4Kys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSBmYTk4N2Q4MTFlNGViMmQ0M2Q5Y1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiXSwic291cmNlUm9vdCI6IiJ9