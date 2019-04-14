webpackJsonp([9],{

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

/***/ "214017667160a07c7691":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/imgs/commdity2.4bd2273f1d.png";

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

/***/ "2d399874ee57a1c7ee38":
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

var _button = __webpack_require__("8d56c7db4300680162d8");

var _button2 = _interopRequireDefault(_button);

__webpack_require__("54774c70023dfefe9f98");

var _reactRouterDom = __webpack_require__("91409e3157f4cc61f11f");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApplyCommdity = function (_React$Component) {
    (0, _inherits3.default)(ApplyCommdity, _React$Component);

    function ApplyCommdity(props, context) {
        (0, _classCallCheck3.default)(this, ApplyCommdity);
        return (0, _possibleConstructorReturn3.default)(this, (ApplyCommdity.__proto__ || (0, _getPrototypeOf2.default)(ApplyCommdity)).call(this, props, context));
    }

    (0, _createClass3.default)(ApplyCommdity, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                storeAddr = _props.storeAddr,
                isAgree = _props.isAgree,
                changeApplyCommdityAgreement = _props.changeApplyCommdityAgreement,
                picture = _props.picture,
                introduce = _props.introduce,
                handleClick = _props.handleClick;

            var agreeClass = isAgree ? "agreIcon" : "notAgreeIcon";
            var showrightbtn = this.props.match.params.showrightbtn;
            return _react2.default.createElement(
                "div",
                { id: "ac" },
                _react2.default.createElement(
                    "div",
                    { id: "contentWarp" },
                    _react2.default.createElement(
                        "div",
                        { className: "head" },
                        _react2.default.createElement("img", { src: picture, alt: "" }),
                        _react2.default.createElement("div", { className: "introduce", dangerouslySetInnerHTML: { __html: introduce } })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "formItem" },
                        _react2.default.createElement(
                            "span",
                            null,
                            "\u60A8\u5C06\u6536\u5230"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "itemInfo pd24" },
                            _react2.default.createElement("i", { className: "lipai-icon" }),
                            _react2.default.createElement(
                                "div",
                                { className: "introduce-warp-div" },
                                showrightbtn == "storeInfo" && _react2.default.createElement("i", { className: "icon-tips" }),
                                _react2.default.createElement(
                                    "label",
                                    null,
                                    "\u8D34\u7EB8\u3001\u6302\u724C"
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "formItem" },
                        _react2.default.createElement(
                            "span",
                            null,
                            "\u90AE\u5BC4\u5730\u5740"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "itemInfo pd20", onClick: function onClick() {
                                    return _this2.props.history.push({
                                        pathname: "/addressManagement",
                                        state: { redirect: "/applyCommdity" + _this2.props.match.params.showrightbtn }
                                    });
                                } },
                            storeAddr.delivNm.length == 0 || storeAddr.delivPhone.length == 0 || storeAddr.addAll.length == 0 || storeAddr.addressInfo.length == 0 ? _react2.default.createElement(
                                "div",
                                { className: "addAddr-warp-div" },
                                _react2.default.createElement("i", { className: "add-icon" }),
                                _react2.default.createElement(
                                    "span",
                                    null,
                                    "\u6DFB\u52A0\u6536\u8D27\u5730\u5740"
                                )
                            ) : _react2.default.createElement(
                                "div",
                                { className: "addAddr-warp-div2" },
                                _react2.default.createElement(
                                    "div",
                                    null,
                                    _react2.default.createElement(
                                        "div",
                                        {
                                            className: "personInfo" },
                                        storeAddr.delivNm,
                                        " ",
                                        storeAddr.delivPhone
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "personAddr" },
                                        "\u6536\u8D27\u5730\u5740\uFF1A",
                                        storeAddr.addAll,
                                        storeAddr.addressInfo
                                    )
                                )
                            ),
                            _react2.default.createElement("i", { className: "rightArrow" })
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "agree-warp-div" },
                        _react2.default.createElement(
                            "label",
                            { htmlFor: "agree", onClick: changeApplyCommdityAgreement.bind(this, !isAgree) },
                            _react2.default.createElement("i", { className: agreeClass })
                        ),
                        _react2.default.createElement(
                            "span",
                            null,
                            "\u9605\u8BFB\u5E76\u540C\u610F ",
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: "/userAgree" },
                                "\u300A\u6536\u6B3E\u7801\u670D\u52A1\u4F7F\u7528\u6761\u6B3E\u300B"
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "submit-warp-button" },
                    _react2.default.createElement(
                        _button2.default,
                        { type: "primary", onClick: handleClick },
                        "\u63D0\u4EA4\u7533\u8BF7"
                    )
                )
            );
        }
    }]);
    return ApplyCommdity;
}(_react2.default.Component);

exports.default = ApplyCommdity;

/***/ }),

/***/ "321d6cf1645d3f69171c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyMatAPI = applyMatAPI;
exports.setDefaultAddr = setDefaultAddr;

var _config = __webpack_require__("8653d9474e130320c382");

var _config2 = _interopRequireDefault(_config);

var _request = __webpack_require__("76fb50331ac78bf18670");

var _store = __webpack_require__("729bd0f3009c1858d0f9");

var _store2 = _interopRequireDefault(_store);

var _modal = __webpack_require__("cc81f23a066389bd7f8d");

var _modal2 = _interopRequireDefault(_modal);

var _action = __webpack_require__("5d4604b08304c597d074");

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyMatAPI(history) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
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


    (0, _requestAPI.applyMat)(param).then(function (response) {
        if (response.statusCode == _config2.default.STATUSCODE.SUCCESS) {
            //通知客户端修改状态
            (0, _request.mccStateChanged)();

            //传的参数中是否有红包码地址，如果有说明要申请红包码物料，
            if (param.redUrl) {
                if (JSON.parse(param.materielList).length == 2) {
                    //如果物料列表有两个对象，说明同时申请了红包码物料和收款码物料
                    var url = JSON.parse(param.redUrl).redUrl;
                    url = encodeURIComponent(url);
                    history.push({
                        pathname: "/result/success",
                        search: '?showBtn=true&redURL=' + url
                    });
                } else {
                    //如果物料列表有1个，说明只申请了收款码物料
                    history.push({
                        pathname: "/result/success",
                        search: '?showBtn=true&onlyRedBag=true'
                    });
                }
            } else {
                history.push({
                    pathname: "/result/success",
                    search: '?showBtn=true'
                });
            }
        } else {
            _modal2.default.alert('申请失败', response.msg || '查询业务要素出错，请稍后再试！', [{
                text: '确认', onPress: function onPress() {
                    history.push({ pathname: "/result/fail" });
                }
            }]);
        }
    });
}

function setDefaultAddr() {

    /**
     * 判定是不是初次进入该页面
     * @type {boolean}
     */
    var isInit = _store2.default.getState().getIn(["storeAddr"]).get("delivNm").length == 0;
    if (isInit) {
        (0, _requestAPI.getAddrList)(function (res) {
            console.log('getAddrList:我是真正的update函数');
        }).then(function (response) {
            /**
             * storeAddr 代表默认地址
             * @type {null}
             */
            var storeAddr = null,
                addressList = response.data.result || [];

            /**
             * 遍历地址列表
             */
            addressList.forEach(function (value) {
                //state==1 的代表默认地址
                if (value.state == 1) {
                    storeAddr = value;
                }
            });
            //如果默认地址不是null 则更新 redux 中的storeAddr
            if (!!storeAddr) {
                var nextState = {
                    delivNm: storeAddr.memberName, //收货人
                    addAll: storeAddr.addAll, //省市区组合
                    delivPhone: storeAddr.phone, //收货电话
                    provinceId: storeAddr.provinceId, //省ID
                    cityId: storeAddr.cityId, //市ID
                    areaId: storeAddr.areaId, //地区ID
                    addressInfo: storeAddr.addressInfo, //详细地址
                    id: storeAddr.id
                };
                _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({ storeAddr: nextState }));
            }

            // 通知update函数，success中的代码已执行完毕
            if (!!response.fuc) {
                response.fuc.endOfFunc();
                console.log('getAddrList:  success函数执行完毕');
            }
        });
    }
}

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

/***/ "54774c70023dfefe9f98":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"ac":"ac","head":"head","introduce":"introduce","formItem":"formItem","itemInfo":"itemInfo","addAddr-warp-div":"addAddr-warp-div","add-icon":"add-icon","addAddr-warp-div2":"addAddr-warp-div2","lipai-icon":"lipai-icon","introduce-warp-div":"introduce-warp-div","icon-tips":"icon-tips","personInfo":"personInfo","personAddr":"personAddr","rightArrow":"rightArrow","pd24":"pd24","pd20":"pd20"};

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

/***/ "ea3d215739948f813c41":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__("7474e09206d6df50164e");

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = __webpack_require__("8e994c8287bafcdbd431");

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = __webpack_require__("b365af20d4e02cb0aa22");

var _assign2 = _interopRequireDefault(_assign);

var _keys = __webpack_require__("5a45bbf323059c3eb8f7");

var _keys2 = _interopRequireDefault(_keys);

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

var _ApplyCommdityActions = __webpack_require__("321d6cf1645d3f69171c");

var _ApplyCommdity = __webpack_require__("2d399874ee57a1c7ee38");

var _ApplyCommdity2 = _interopRequireDefault(_ApplyCommdity);

var _request = __webpack_require__("76fb50331ac78bf18670");

var _action = __webpack_require__("5d4604b08304c597d074");

var _commdity = __webpack_require__("214017667160a07c7691");

var _commdity2 = _interopRequireDefault(_commdity);

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApplyCommdityContainer = function (_Component) {
    (0, _inherits3.default)(ApplyCommdityContainer, _Component);

    function ApplyCommdityContainer(props, context) {
        (0, _classCallCheck3.default)(this, ApplyCommdityContainer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ApplyCommdityContainer.__proto__ || (0, _getPrototypeOf2.default)(ApplyCommdityContainer)).call(this, props, context));

        _this.handleClick = function () {
            var _this$props = _this.props,
                storeAddr = _this$props.storeAddr,
                isAgree = _this$props.isAgree,
                history = _this$props.history,
                redUrlStr = _this$props.redUrlStr;


            var key = null,
                self = _this;
            (0, _keys2.default)(storeAddr).forEach(function (n) {
                if (storeAddr[n].length == 0) {
                    key = n;
                }
            });

            if (!!key) {
                (0, _request.toast)("您的地址当中缺少必要数据");
            } else if (!isAgree) {
                (0, _request.toast)("如果您已阅读《收款码服务使用条款》并同意，请勾选它");
            } else {
                (0, _request.getCurrentLocationInfo)(function (city) {
                    if (!!redUrlStr) {
                        var materielList = [{
                            materielType: "00",
                            count: "1"
                        }, {
                            materielType: "10",
                            count: "1"
                        }];

                        (0, _ApplyCommdityActions.applyMatAPI)(history, (0, _assign2.default)(storeAddr, { materielList: (0, _stringify2.default)(materielList) }, { cityNm: city.cityCd }, { redUrl: (0, _stringify2.default)({ redUrl: redUrlStr }) }));
                    } else {
                        (0, _request.toast)("获取红包码地址失败");
                    }
                });
            }
        };

        _this.unblock = null;
        return _this;
    }

    (0, _createClass3.default)(ApplyCommdityContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _request.beforeEnterRouter)('申请收款码物料');
            /**
             * 设置默认地址
             */
            (0, _ApplyCommdityActions.setDefaultAddr)();

            //控制路由
            this.unblock = this.props.history.block(function (location, action) {
                if (action == "POP") {
                    return "尚未申请收款码贴纸和挂牌|还未申请收款码贴纸，是否继续申请收款码贴纸，用于店铺内收款？|/s/wl/xvsh/index.html#/applyCommdityOfRedbag/storeInfo";
                }
            });

            //初始化红包码地址
            (0, _requestAPI.sharlink)();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unblock && this.unblock();
        }
    }, {
        key: 'render',
        value: function render() {
            // console.log(this.props);
            return _react2.default.createElement(_ApplyCommdity2.default, (0, _extends3.default)({}, this.props, { handleClick: this.handleClick }));
        }
    }]);
    return ApplyCommdityContainer;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {

    /**
     * storeAddr   默认地址
     * isAgree     是否同意协议
     * picture     头图
     * introduce   简介
     */
    return {
        redUrlStr: state.getIn(["redUrlStr"]),
        storeAddr: state.getIn(["storeAddr"]).toJS(),
        isAgree: state.getIn(["isAgreeReceivablesCodeAgreement"]),
        picture: _commdity2.default,
        introduce: "推荐使用收款和红包码物料，收款安全方便，<br/>赚取红包赏金，自主免费开通更便捷，马上体验吧~"
    };
};

var mapDispathToProps = function mapDispathToProps(dispatch) {
    /**
     * 更新redux 中的isAgreeReceivablesCodeAgreement
     * @param val 同意协议与否
     */
    var changeApplyCommdityAgreement = function changeApplyCommdityAgreement(val) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ isAgreeReceivablesCodeAgreement: val }));
    };
    return {
        changeApplyCommdityAgreement: changeApplyCommdityAgreement
    };
};
exports.default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(ApplyCommdityContainer);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltZ3MvY29tbWRpdHkyLnBuZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0FwcGx5Q29tbWRpdHkvQXBwbHlDb21tZGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BcHBseUNvbW1kaXR5L0FwcGx5Q29tbWRpdHlBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BcHBseUNvbW1kaXR5L2FwcGx5Q29tbWRpdHkuc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BcHBseUNvbW1kaXR5T2ZSZWRCYWcvQXBwbHlDb21tZGl0eUNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyJdLCJuYW1lcyI6WyJyZWNtZFJlY29yZCIsInNoYXJsaW5rIiwiaXNCbGFjayIsImlzQXBwbHkiLCJhcHBseU1jYyIsImdldENhcmRsaXN0IiwiZ2V0QWRkckxpc3QiLCJhcHBseU1hdCIsImdldFFyVXJsUmVzdCIsImdldE1jaG50QW5kQXJlYUluZiIsImdldE1jaG50RGV0YWlsIiwidXBncmFkZU1jYyIsImdldFByb3RvY29sSW5mbyIsImdldEhpc3RvcnlJbmNvbWUiLCJnZXRIaXN0b3J5VHJhbnMiLCJnZXRUb2RheUluY29tZSIsImdldFRvZGF5VHJhbnMiLCJnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtIiwiZ2V0TG9naXN0aWNzU3QiLCJnZXRVcGdyYWRlU3QiLCJnZXRMb2dpc3RpY3NMaXN0IiwiZ2V0QXVkaXRJbmZvIiwiZ2V0TGltaXRBdEluZm8iLCJtY2hudE9wZXIiLCJkZWxldGVBZGRyZXNzIiwidXBkYXRlTWNjQ2FyZCIsIm5ld0FkZHJlc3MiLCJlZGl0QWRkcmVzcyIsInNldE1jY09uT2ZmIiwiZ2V0TWNjVHJhbnNOdW0iLCJwaG9uZSIsInVuZGVmaW5lZCIsInJlY21kTW9iaWxlIiwiVXRpbCIsImJhc2U2NEVuY29kZSIsIkNPTkZJRyIsIlJFU1QiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwiU1RBVFVTQ09ERSIsIlNVQ0NFU1MiLCJyb2xsS2V5IiwiQ0FDSEVLRVkiLCJzZWNvbmRLZXkiLCJmdWxsIiwicmVzb2x2ZSIsInNoYXJlTGluayIsInJlZFVybFN0ciIsImRhdGEiLCJpZGVudGlmaWVyIiwibmV4dFN0YXRlIiwic3RvcmUiLCJkaXNwYXRjaCIsInVwZGF0ZSIsInVwZGF0ZUZ1bmMiLCJyZXNwIiwiYmxhY2tTdCIsImNvbnNvbGUiLCJsb2ciLCJjYWNoZVBhcmFtIiwiYXBwbHlTdCIsInBhcmFtIiwicmVmZXJlZVRlbCIsInZpcnR1YWxDYXJkTm8iLCJhY2NObSIsImNpdHlDZCIsImNvbW9tUGFyYW0iLCJnZXRNY2NDYXJkTGlzdCIsImNhcmRMaXN0IiwibGVuZ3RoIiwiZGVmYWx1dENhcmQiLCJiYW5rIiwiY2FyZFR5cGUiLCJmdW5jdGlvbkJpdG1hcCIsImljb25SZWxVcmwiLCJpc1N1cHBvcnQiLCJwYW4iLCJyYW5rIiwic2VsZWN0ZWQiLCJmb3JFYWNoIiwiaXRlbSIsImsiLCJzdG9yZVN0YXRlIiwic3RvcmVSZWNlaXZlQ2FyZE9iaiIsInN0YXRlIiwiYWRkcmVzc0xpc3QiLCJyZXN1bHQiLCJtYXRlcmlhbExpc3QiLCJkZWxpdk5tIiwiYWRkQWxsIiwiZGVsaXZQaG9uZSIsInByb3ZpbmNlSWQiLCJjaXR5SWQiLCJhcmVhSWQiLCJhZGRyZXNzSW5mbyIsImlkIiwiY2l0eU5tIiwicmVkVXJsIiwiZ2V0UXJVcmwiLCJtY2hudERldGFpbCIsInFyVXJsIiwicXJOdW0iLCJhcmVhIiwibWVyY2hhbnRUcCIsImFyZWFBcnIiLCJwcm92aW5jZSIsIm9uZSIsInByb0lkIiwicHJvTm0iLCJ0d28iLCJjaXR5IiwidGhyZWUiLCJ2YWx1ZSIsImNoaWxkcmVuIiwicHVzaCIsImFyZWFObSIsIm1lcmNoYW50VHBBcnIiLCJtZXJUeXBlMSIsIm1lcmNoYW50VHBDZCIsIm1lcmNoYW50VHBObSIsIm1lclR5cGUyIiwibWNobnRBbmRBcmVhSW5mIiwic3RvcmVObSIsIlN0b3JlVHAiLCJwcm92Q2QiLCJjb3V0eUNkIiwiYWRkciIsImNlcnRpZlBpYzEiLCJjZXJ0aWZQaWMyIiwiY2VydGlmUGljMyIsImxpY2Vuc2VQaWMiLCJzaG9wUGljMSIsInNob3BQaWMyIiwiYXV4UHJvdk1hdDEiLCJhdXhQcm92TWF0MiIsInNob3BMb2dvUGljIiwiVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3QiLCJyZXMiLCJoaXN0b3J5SW5jb21lT2JqIiwib3JpZ2luTGlzdERhdGEiLCJnZXRTdGF0ZSIsImdldEluIiwidG9KUyIsIm5ld0xpc3QiLCJ0cmFuc0luZm8iLCJoaXN0b3J5T3JkZXJMaXN0IiwiY29uY2F0IiwidG9kYXlJbmNvbWVPYmoiLCJ0b2RheU9yZGVyTGlzdCIsIm5ld09iaiIsImRlbGl2ZXJ5TXNnIiwibWF0RGVsaXZTdGF0dXMiLCJsaW1pdEluZm8iLCJpc1VzZU1jYyIsIm1jY1RyYW5zTnVtIiwidHJhbnNOdW0iLCJBcHBseUNvbW1kaXR5IiwicHJvcHMiLCJjb250ZXh0Iiwic3RvcmVBZGRyIiwiaXNBZ3JlZSIsImNoYW5nZUFwcGx5Q29tbWRpdHlBZ3JlZW1lbnQiLCJwaWN0dXJlIiwiaW50cm9kdWNlIiwiaGFuZGxlQ2xpY2siLCJhZ3JlZUNsYXNzIiwic2hvd3JpZ2h0YnRuIiwibWF0Y2giLCJwYXJhbXMiLCJfX2h0bWwiLCJoaXN0b3J5IiwicGF0aG5hbWUiLCJyZWRpcmVjdCIsImJpbmQiLCJSZWFjdCIsIkNvbXBvbmVudCIsImFwcGx5TWF0QVBJIiwic2V0RGVmYXVsdEFkZHIiLCJKU09OIiwicGFyc2UiLCJtYXRlcmllbExpc3QiLCJ1cmwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJzZWFyY2giLCJNb2RhbCIsImFsZXJ0IiwibXNnIiwidGV4dCIsIm9uUHJlc3MiLCJpc0luaXQiLCJnZXQiLCJtZW1iZXJOYW1lIiwiZnVjIiwiZW5kT2ZGdW5jIiwicmVxdWVzdCIsInNldFhpYW9XZWlQYXkiLCJ3aW5kb3ciLCJVUCIsIlciLCJBcHAiLCJFbnYiLCJyZWdQaG9uZSIsInJlZ1BheU51bSIsInZlcnNpb24iLCJzb3VyY2UiLCJiYXNlVXJsIiwiYmFzZVVybDIiLCJiYXNlVXJsMyIsImxvY2F0aW9uIiwiaG9zdG5hbWUiLCJpbmRleE9mIiwicHJvdG9jb2wiLCJnZXRTZXJ2VXJsIiwic2VydmVyVXJsIiwidXNlckluZm8iLCJzcGxpdCIsImdldENpdHkiLCJyZXNwb25zZUZvcm1hdHRlciIsImRlbGV0ZVNsYXNoIiwiaG9zdCIsInJlcGxhY2UiLCJhZGRTbGFzaCIsInBhdGgiLCJ0ZXN0Iiwic2VwYXJhdGVQYXJhbXMiLCJwYXJhbXNMaW5lIiwia2V5IiwiY29uZmlnIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJmaW5hbFVybCIsInJlamVjdCIsIm9wdGlvbnMiLCJ0eXBlIiwic3VjY2VzcyIsImVycm9yIiwiRXJyb3IiLCJkYXRhVHlwZSIsIiQiLCJhamF4IiwicGFyYW1BbGwiLCJmb3JDaHNwIiwiZW5jcnlwdCIsImNhY2hlIiwiYnlBamF4IiwicG9zdCIsInB1dCIsImRlbCIsImdldFNlYXJjaFBhcmFtIiwic3RyIiwic2xpY2UiLCJhcnJheSIsIm9iaiIsInN1YyIsImVyciIsImFwcCIsInNldFhpYW9XZWlBdWRpbyIsImdldFhpYW9XZWlBdWRpbyIsInRvYXN0IiwibXMiLCJUb2FzdCIsImluZm8iLCJiZWZvcmVFbnRlclJvdXRlciIsInRpdGxlIiwicmlnaHRCYXIiLCJyaWdodENhbGxiYWNrIiwicmlnaHRCYXJJbWciLCJkb2N1bWVudCIsIm9uUGx1Z2luUmVhZHkiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJzZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24iLCJtY2NTdGF0ZUNoYW5nZWQiLCJzZW5kUXJDb2RlIiwiZmFpbCIsInNjYW5RUkNvZGUiLCJjbG9zZVdlYlZpZXciLCJ2ZXJpZnlQYXlQd2QiLCJjcmVhdGVXZWJWaWV3IiwiaXNGaW5pc2giLCJnZXRVc2VyRGV0YWlsSW5mbyIsInNhdmVRY29kZSIsImNhbnZhcyIsInVpIiwiVUkiLCJwaWNVcmwiLCJ0b0RhdGFVUkwiLCJsb2dFdmVudCIsInNhdmVQaWNUb0xvY2FsIiwic3Vic3RyIiwic2hvd1RvYXN0V2l0aFBpYyIsInNob3dBbGVydCIsImVudiIsImlzSU9TIiwib3BlbkJyb3dzZXIiLCJzaG93VG9hc3QiLCJzaGFyZSIsImRlc2MiLCJpbWdVUkwiLCJwYWdlVVJsIiwic2hvd1NoYXJlUGFuZWwiLCJzaGFyZVVybCIsImdldEN1cnJlbnRMb2NhdGlvbkluZm8iLCJjYWxsYmFjazIiLCJzaG93TG9hZGluZyIsImNhbGxiYWNrIiwiZGlzbWlzcyIsInNlbmRNZXNzYWdlIiwiY21kIiwiZmV0Y2hOYXRpdmVEYXRhIiwieGhyIiwiY3JlYXRlVGV4dENhbnZhc2UiLCJjb2xvciIsImxvbmciLCJzaG90IiwicmVtMnB4IiwidmFsIiwiY1dpZHRoIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJzZXRBdHRyaWJ1dGUiLCJ3aWR0aCIsInJvdGF0ZSIsIk1hdGgiLCJQSSIsImZpbGxTdHlsZSIsInRleHRBbGlnbiIsImZvbnRTaXplIiwiZm9udCIsIm1lYXN1cmVUZXh0IiwiZmlsbFRleHQiLCJjcmVhdGVDb252YXNBbmRTYXZlUGhvdG8iLCJjYW52YXNPYmoiLCJiZ3VybCIsInFyY29kZVVSTCIsInFyY29kZVdkQW5kSGciLCJ4V2lkdGgiLCJ5SGVpZ2h0IiwidGV4dGJnVVJMIiwieFRleHRXaWR0aCIsInlUZXh0SGVpZ2h0IiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJvbmxvYWQiLCJoZWlnaHQiLCJkcmF3SW1hZ2UiLCJ0ZXh0VXJpIiwidGV4dEltZyIsInFyY29kZVdpZHRoQW5kSGVpZ2h0IiwiaW5uZXJIVE1MIiwicXJjb2RlIiwiUVJDb2RlIiwiY29ycmVjdExldmVsIiwiQ29ycmVjdExldmVsIiwiTCIsInFyY29kZUltZyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicXJjb2RlRHgiLCJxcmNvZGVEeSIsImdldE1hdGVyaWVsSW5mb0xpc3QiLCJnZXRSZXdhcmRMaXN0IiwiQ09OU1RfREFUQSIsImltZ2VTaXplIiwiY2FjaGVGaXJzdCIsInRpbWUiLCJzdG9yYWdlIiwidmFsaWRhdGVUaW1lIiwiY2FjaGVGaXJzdFN0b3JhZ2UiLCJuZWVkU3ciLCJzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UiLCJyZWZyZXNoRG9tRnVuYyIsInJlcSIsImRhdGFGcm9tQ2FjaGUiLCJnZXRGcm9tU3RvcmFnZSIsInJlbW92ZVN0b3JhZ2UiLCJpc1NhbWVBdEFsbCIsIkltbXV0YWJsZSIsImlzIiwiZnJvbUpTIiwiYXN5bmMiLCJlbmRPZlN5bmNGdW5jIiwicmVtb3ZlQ2FjaGUiLCJBcHBseUNvbW1kaXR5Q29udGFpbmVyIiwic2VsZiIsIm4iLCJtYXRlcmllbFR5cGUiLCJjb3VudCIsInVuYmxvY2siLCJibG9jayIsImFjdGlvbiIsIm1hcHN0YXRlVG9Qcm9wcyIsImNvbW1kaXR5IiwibWFwRGlzcGF0aFRvUHJvcHMiLCJpc0FncmVlUmVjZWl2YWJsZXNDb2RlQWdyZWVtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQVdnQkEsVyxHQUFBQSxXO1FBeUJBQyxRLEdBQUFBLFE7UUFpQkFDLE8sR0FBQUEsTztRQXVCQUMsTyxHQUFBQSxPO1FBb0JBQyxRLEdBQUFBLFE7UUEwQkFDLFcsR0FBQUEsVztRQWdEQUMsVyxHQUFBQSxXO1FBZ0NBQyxRLEdBQUFBLFE7UUFvQkFDLFksR0FBQUEsWTtRQW1CQUMsa0IsR0FBQUEsa0I7UUFtSEFDLGMsR0FBQUEsYztRQWdCQUMsVSxHQUFBQSxVO1FBZ0NBQyxlLEdBQUFBLGU7UUFlQUMsZ0IsR0FBQUEsZ0I7UUFlQUMsZSxHQUFBQSxlO1FBaUJBQyxjLEdBQUFBLGM7UUFlQUMsYSxHQUFBQSxhO1FBZ0JBQyx5QixHQUFBQSx5QjtRQU1BQyxjLEdBQUFBLGM7UUF1QkFDLFksR0FBQUEsWTtRQVdBQyxnQixHQUFBQSxnQjtRQVlBQyxZLEdBQUFBLFk7UUFZQUMsYyxHQUFBQSxjO1FB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LG9CQUFvQjtBQUNwQjtBQUNBLHVCQUF1QixtQkFBTyxDQUFDLHNCQUFpQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQTBELG9CQUFvQjtBQUM5RSxtQkFBTyxDQUFDLHNCQUFzQjtBQUM5QixtQkFBTyxDQUFDLHNCQUFnQjtBQUN4QixVQUFVLG1CQUFPLENBQUMsc0JBQVM7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGdEQUFnRCxtQkFBTyxDQUFDLHNCQUFnQjtBQUN4RTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiY2h1bmsvQXBwbHlDb21tZGl0eU9mUmVkQmFnLjIwMDViY2QyZDkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NvbW9tUGFyYW0sIGdldCwgcG9zdCwgVXRpbH0gZnJvbSBcIi4vcmVxdWVzdFwiO1xyXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge30gZnJvbSBcIi4vY2FjaGVTdG9yYWdlXCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tIFwiLi4vLi4vc3RvcmUvc3RvcmVcIjtcclxuaW1wb3J0IHtVUERBVEVfU1RPUkVfU1RBVEV9IGZyb20gXCIuLi8uLi9zdG9yZS9hY3Rpb25cIjtcclxuaW1wb3J0IHtjYWNoZUZpcnN0LGNhY2hlRmlyc3RTdG9yYWdlLHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSxyZW1vdmVDYWNoZX0gZnJvbSBcIi4vY2FjaGVTdG9yYWdlXCI7XHJcblxyXG4vKipcclxuICog55Sz6K+357qi5YyF56CB55qE6K+35rGCXHJcbiAqIEBwYXJhbSBwaG9uZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlY21kUmVjb3JkKHBob25lKSB7XHJcbiAgICBpZiAocGhvbmUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcGhvbmUgPSBcIlwiXHJcbiAgICB9XHJcbiAgICBsZXQgcmVjbWRNb2JpbGUgPSBVdGlsLmJhc2U2NEVuY29kZShwaG9uZSlcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnJlY21kUmVjb3JkLCB7cmVjbWRNb2JpbGV9KS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbnlLPor7fnuqLljIXnoIHmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0sKCk9Pnt9LCgpPT57XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbDp0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6K+35rGC57qi5YyF5ZCX6L+e5o6lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2hhcmxpbmsoKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5zaGFyZUxpbmssIHt9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgbGV0IHJlZFVybFN0cj0gXCJodHRwczovL3dhbGxldC45NTUxNi5jb20vcy93bC93ZWJWMy9hY3Rpdml0eS92TWFya2V0aW5nMi9odG1sL3Nuc0luZGV4Lmh0bWw/cj1cIiArIHJlc3BvbnNlLmRhdGEuaWRlbnRpZmllcjtcclxuICAgICAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHJlZFVybFN0clxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShuZXh0U3RhdGUpKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlZFVybFN0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKblnKjnmb3lkI3ljZXnmoTor7fmsYJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0JsYWNrKHVwZGF0ZSkge1xyXG4gICAgbGV0IHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbihyZXNwKXtcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBibGFja1N0OnJlc3AuZGF0YS5ibGFja1N0XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lzQmxhY2s6IHVwZGF0ZeWHveaVsOaJp+ihjOWujOavlScpO1xyXG4gICAgICAgIGlmKCB0eXBlb2YgdXBkYXRlID09PSAnZnVuY3Rpb24nICl7XHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXNwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+ivu+WPlue8k+WtmO+8jOWQjOaXtuW8guatpeWPkemAgeivt+axglxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuaXNCbGFjayx7fSxzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UodXBkYXRlRnVuYykpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGJsYWNrU3Q6cmVzcG9uc2UuZGF0YS5ibGFja1N0XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5piv5ZCm5Zyo6buR5ZCN5Y2V55qE6K+35rGCXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQXBwbHkoKSB7XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IGNhY2hlRmlyc3RTdG9yYWdlKDMwKjYwKjEwMDAsQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5KTsvL+e8k+WtmDMw5YiG6ZKfXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmlzQXBwbHksIHt9LGNhY2hlUGFyYW0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuYXBwbHlTdCAhPSBcIjFcIikge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5aaC5p6c5bey57uP55Sz6K+36L+H57qi5YyF56CB5YiZ57yT5a2YMzDliIbpkp/vvIzlkKbliJnkuI3nvJPlrZhcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleSlcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYXBwbHlTdDpyZXNwb25zZS5kYXRhLmFwcGx5U3RcclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnlLPor7fmlLbmrL7noIFcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWNjKHBhcmFtID0ge1xyXG4gICAgcmVmZXJlZVRlbDogXCJcIiwgICAgICAgICAvL+aOqOiNkOS6uuaJi+acuuWPt1xyXG4gICAgdmlydHVhbENhcmRObzogXCJcIiwgICAgICAvL+iZmuaLn+WNoeWPt1xyXG4gICAgYWNjTm06IFwiXCIsICAgICAgICAgICAgICAvL+W6l+mTuuWQjeensFxyXG4gICAgY2l0eUNkOiBcIlwiICAgICAgICAgICAgICAgLy/ln47luILku6PnoIFcclxufSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuYXBwbHlNY2MsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbnlLPor7fnuqLljIXnoIHmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0sKCk9Pnt9LCgpPT57XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbDp0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE6ZO26KGM5Y2h5YiX6KGoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FyZGxpc3QoKSB7XHJcbiAgICAvL+iOt+WPlueUqOaIt+mTtuihjOWNoeWIl+ihqO+8jOe8k+WtmDHliIbpkp9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TWNjQ2FyZExpc3QsIGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgLy/lpoLmnpzlkI7lj7Dov5Tlm57pk7booYzljaHliJfooajkuJTkuI3kuLrnqbpcclxuICAgICAgICBpZiAoISFyZXNwb25zZS5kYXRhLmNhcmRMaXN0ICYmIHJlc3BvbnNlLmRhdGEuY2FyZExpc3QubGVuZ3RoICE9IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8v5Yid5aeL5YyW6buY6K6k5Y2hXHJcbiAgICAgICAgICAgIGxldCBkZWZhbHV0Q2FyZCA9IHtcclxuICAgICAgICAgICAgICAgIGJhbms6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHmiYDlnKjnmoTpk7booYxcclxuICAgICAgICAgICAgICAgIGNhcmRUeXBlOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeexu+Wei1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb25CaXRtYXA6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h5Yqf6IO95L2NXHJcbiAgICAgICAgICAgICAgICBpY29uUmVsVXJsOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHnmoRsb2dv5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICBpc1N1cHBvcnQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpuaUr+aMgVxyXG4gICAgICAgICAgICAgICAgcGFuOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/luKbmnInmjqnnoIHnmoTljaHlj7dcclxuICAgICAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpumAieS4rVxyXG4gICAgICAgICAgICAgICAgdmlydHVhbENhcmRObzogXCJcIiAgIC8v6Jma5ouf5Y2h5Y+3XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLmNhcmRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghIWl0ZW0uc2VsZWN0ZWQgJiYgaXRlbS5pc1N1cHBvcnQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmFsdXRDYXJkID0gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy/lpoLmnpzmsqHmnInpu5jorqTpgInkuK3nmoTljaHlj5bkuIDkuKrkuI3ooqvnva7kuLrngbDnmoTljaHkuLrpu5jorqTljaFcclxuICAgICAgICAgICAgaWYgKGRlZmFsdXRDYXJkLmJhbmsubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmNhcmRMaXN0W2tdLmlzU3VwcG9ydCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmFsdXRDYXJkID0gcmVzcG9uc2UuZGF0YS5jYXJkTGlzdFtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdG9yZVN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgc3RvcmVSZWNlaXZlQ2FyZE9iajogZGVmYWx1dENhcmQsXHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdDogcmVzcG9uc2UuZGF0YS5jYXJkTGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShzdG9yZVN0YXRlKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5blnLDlnYDliJfooahcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFkZHJMaXN0KFxyXG4gICAgdXBkYXRlLCAvL+e8k+WtmOeahOabtOaWsOWHveaVsFxyXG4gICAgcGFyYW0gPSB7XHJcbiAgICAgICAgc3RhdGU6IFwiXCIgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbikge1xyXG4gICAgLy8g6K+75Y+W57yT5a2Y77yM5ZCM5pe25byC5q2l5Y+R6YCB6K+35rGCXHJcbiAgICBsZXQgdXBkYXRlRnVuYyA9IGZ1bmN0aW9uKHJlc3Ape1xyXG4gICAgICAgIC8vIOWcqHVwZGF0ZeWHveaVsOS4re+8jOabtOaWsHJlZHV45Lit55qEYWRkcmVzc0xpc3RcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe2FkZHJlc3NMaXN0OnJlc3AuZGF0YS5yZXN1bHR8fFtdfSkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRBZGRyTGlzdDogdXBkYXRl5Ye95pWw5omn6KGM5a6M5q+VJyk7XHJcbiAgICAgICAgaWYoIHR5cGVvZiB1cGRhdGUgPT09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgICB1cGRhdGUocmVzcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGNhY2hlUGFyYW0gPSBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UodXBkYXRlRnVuYyxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KTtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEFkZHJMaXN0LCBPYmplY3QuYXNzaWduKHt9LCBjb21vbVBhcmFtLCBwYXJhbSksY2FjaGVQYXJhbSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IGFkZHJlc3NMaXN0ID0gcmVzcG9uc2UuZGF0YS5yZXN1bHQgfHwgW107XHJcblxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGFkZHJlc3NMaXN0XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog55Sz6K+354mp5paZ5o6l5Y+jXHJcbiAqIEBwYXJhbSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1hdChwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3Q6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nianmlpnliJfooahcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxpdk5tOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mlLbotKfkurpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRBbGw6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDljLrlkI3np7BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxpdlBob25lOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mlLbotKfnlLXor51cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aW5jZUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nnIFJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlJZDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W4gklEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Yy6SURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzSW5mbzogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/or6bnu4blnLDlnYBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJycsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDlnYDnmoRJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlObTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aJgOWcqOWfjuW4gkNpdHlDb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkVXJsOiBcIlwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v57qi5YyF56CB5Zyw5Z2AICDlj6/pgInlj4LmlbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmFwcGx5TWF0LCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWVhuaIt+aUtuasvueggeWcsOWdgOWSjOWVhuaIt+e8luWPt1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFFyVXJsUmVzdCgpIHtcclxuICAgIC8v57yT5a2YMuWwj+aXtlxyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRRclVybCwgY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgbWNobnREZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgIHFyVXJsOiByZXNwb25zZS5kYXRhLnFyVXJsLFxyXG4gICAgICAgICAgICAgICAgcXJOdW06IHJlc3BvbnNlLmRhdGEucXJOdW1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICrojrflj5blupfpk7rljLrln5/liJfooajlkozlupfpk7rnsbvlnovliJfooahcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jaG50QW5kQXJlYUluZigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/meS4quaOpeWPoyzlj6rotbBzd++8jOS4jei1sGxvYWNhbFN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgLy8gbGV0IGNhY2hlUGFyYW0gPSB7XHJcbiAgICAvLyAgICAgYnlBamF4OiBmYWxzZSxcclxuICAgIC8vICAgICBmb3JDaHNwOmZhbHNlLFxyXG4gICAgLy8gICAgIGVuY3J5cHQ6ZmFsc2UsXHJcbiAgICAvLyAgICAgY2FjaGU6IHRydWVcclxuICAgIC8vIH1cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TWNobnRBbmRBcmVhSW5mLCBjb21vbVBhcmFtLCBjYWNoZUZpcnN0KDI0KjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGxldCBhcmVhID0gW10sIG1lcmNoYW50VHAgPSBbXTtcclxuXHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDnnIHnuqdcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuYXJlYUFyci5mb3JFYWNoKChwcm92aW5jZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvbmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBwcm92aW5jZS5wcm9JZCxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IHByb3ZpbmNlLnByb05tLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwcm92aW5jZS5wcm9ObSA9PSBcIuWMl+S6rOW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi5LiK5rW35biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLlpKnmtKXluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIumHjeW6huW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi5rex5Zyz5biCXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHByb3ZpbmNlLnByb0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IHByb3ZpbmNlLnByb05tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aW5jZS5jaXR5LmZvckVhY2goKGNpdHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRocmVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBjaXR5LmNpdHlJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogY2l0eS5jaXR5Tm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRocmVlLnZhbHVlICE9IHR3by52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdvLmNoaWxkcmVuLnB1c2godGhyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICog5biC57qnXHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmluY2UuY2l0eS5mb3JFYWNoKChjaXR5KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBjaXR5LmNpdHlJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogY2l0eS5jaXR5Tm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiDljLrnuqdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuYXJlYS5mb3JFYWNoKChhcmVhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRocmVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogYXJlYS5hcmVhSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBhcmVhLmFyZWFObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdvLmNoaWxkcmVuLnB1c2godGhyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25lLmNoaWxkcmVuLnB1c2godHdvKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGFyZWEucHVzaChvbmUpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5tZXJjaGFudFRwQXJyLmZvckVhY2goKG1lclR5cGUxKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb25lID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogbWVyVHlwZTEubWVyY2hhbnRUcENkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogbWVyVHlwZTEubWVyY2hhbnRUcE5tLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBtZXJUeXBlMS5tZXJjaGFudFRwQXJyLmZvckVhY2goKG1lclR5cGUyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtZXJUeXBlMi5tZXJjaGFudFRwQ2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogbWVyVHlwZTIubWVyY2hhbnRUcE5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBtZXJjaGFudFRwLnB1c2gob25lKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHtcclxuICAgICAgICAgICAgbWNobnRBbmRBcmVhSW5mOiB7XHJcbiAgICAgICAgICAgICAgICBhcmVhQXJyOiBhcmVhLFxyXG4gICAgICAgICAgICAgICAgbWVyY2hhbnRUcEFycjogbWVyY2hhbnRUcFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShuZXh0U3RhdGUpKVxyXG5cclxuICAgIH0pXHJcblxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5bqX6ZO66K+m5oOF5L+h5oGvXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jaG50RGV0YWlsKCkge1xyXG4gICAgbGV0IGNhY2hlUGFyYW0gPSBjYWNoZUZpcnN0U3RvcmFnZSg2MCoxMDAwLENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOy8v57yT5a2YMeWIhumSn1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0TWNobnREZXRhaWwsIGNvbW9tUGFyYW0sY2FjaGVQYXJhbSkudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyl7XHJcbiAgICAgICAgICAgIGxldCBtY2hudERldGFpbCA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHttY2hudERldGFpbH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtY2hudERldGFpbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOWNh+e6p+WVhumTuuS6jOe7tOeggVxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBncmFkZU1jYyhwYXJhbT17XHJcbiAgICBzdG9yZU5tOiBcIlwiLCAgICAvL+W6l+mTuuWQjeensFxyXG4gICAgU3RvcmVUcDogXCJcIiwgICAgLy/lupfpk7rnsbvlnotcclxuICAgIHByb3ZDZDogXCJcIiwgICAgIC8v55yBSURcclxuICAgIGNpdHlDZDogXCJcIiwgICAgIC8v5biCSURcclxuICAgIGNvdXR5Q2Q6IFwiXCIsICAgIC8v5Yy6SURcclxuICAgIGFkZHI6IFwiXCIsICAgICAgIC8v5Zyw5Z2AXHJcbiAgICBjZXJ0aWZQaWMxOiBcIlwiLCAvL+i6q+S7veivgeato+mdoueFp1xyXG4gICAgY2VydGlmUGljMjogXCJcIiwgLy/ouqvku73or4Hlj43pnaLnhadcclxuICAgIGNlcnRpZlBpYzM6IFwiXCIsIC8v5omL5oyB6Lqr5Lu96K+B54Wn54mHXHJcbiAgICBsaWNlbnNlUGljOiBcIlwiLCAvL+iQpeS4muaJp+eFp1xyXG4gICAgc2hvcFBpYzE6IFwiXCIsICAgLy/lupfpk7rnhafniYcxXHJcbiAgICBzaG9wUGljMjogXCJcIiwgICAvL+W6l+mTuueFp+eJhzJcclxuICAgIGF1eFByb3ZNYXQxOiBcIlwiLC8v6L6F5Yqp54Wn54mHMVxyXG4gICAgYXV4UHJvdk1hdDI6IFwiXCIsLy/ovoXliqnnhafniYcyXHJcbiAgICBzaG9wTG9nb1BpYzogXCJcIiAvL+W6l+mTukxPR09cclxufSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBncmFkZU1jYywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOW6l+mTuuivpuaDheeahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbljYfnuqfnmoTmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5VcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE5Y2P6K6u57yW5Y+35ZKM5Y2P6K6u5ZCN56ewXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3RvY29sSW5mbygpIHtcclxuICAgIC8qKlxyXG4gICAgICog6L+Z5Liq5o6l5Y+jLOe8k+WtmDLlsI/ml7ZcclxuICAgICAqL1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRQcm90b2NvbEluZm8sIGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UuZGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5Y6G5Y+y5pS25qy+XHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpc3RvcnlJbmNvbWUocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEhpc3RvcnlJbmNvbWUsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnlJbmNvbWVPYmo6IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWOhuWPsuiuouWNlVxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXN0b3J5VHJhbnMocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEhpc3RvcnlUcmFucywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgbGV0IG9yaWdpbkxpc3REYXRhID0gc3RvcmUuZ2V0U3RhdGUoKS5nZXRJbihbJ2hpc3RvcnlPcmRlckxpc3QnXSkudG9KUygpXHJcbiAgICAgICAgICAgIGxldCBuZXdMaXN0ID0gcmVzLmRhdGEudHJhbnNJbmZvO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdMaXN0KVxyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeU9yZGVyTGlzdDogb3JpZ2luTGlzdERhdGEuY29uY2F0KG5ld0xpc3QpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOS7iuaXpeaUtuasvlxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2RheUluY29tZSgpIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRvZGF5SW5jb21lLGNvbW9tUGFyYW0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIHRvZGF5SW5jb21lT2JqOiByZXMuZGF0YVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5LuK5pel6K6i5Y2VXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5VHJhbnMocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRvZGF5VHJhbnMsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5MaXN0RGF0YSA9IHN0b3JlLmdldFN0YXRlKCkuZ2V0SW4oWyd0b2RheU9yZGVyTGlzdCddKS50b0pTKClcclxuICAgICAgICAgICAgbGV0IG5ld0xpc3QgPSByZXMuZGF0YS50cmFuc0luZm87XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICB0b2RheU9yZGVyTGlzdDogb3JpZ2luTGlzdERhdGEuY29uY2F0KG5ld0xpc3QpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWNleeslOafpeivolxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpXHJcbn1cclxuLyoqXHJcbiAqIOiOt+WPlueJqea1geS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2lzdGljc1N0KHBhcmFtKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TG9naXN0aWNzU3QsIE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgbGV0IG5ld09iaiA9IHJlcy5kYXRhLmRlbGl2ZXJ5TXNnO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogbmV3T2JqLm1hdERlbGl2U3RhdHVzIOeahOeKtuaAgeWSjHJlZHV455qEc3RvcmXkv53mjIHkuIDoh7RcclxuICAgICAgICAgICAgICogQHR5cGUgeyp9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBuZXdPYmoubWF0RGVsaXZTdGF0dXMgPSByZXMuZGF0YS5tYXREZWxpdlN0YXR1cztcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIGRlbGl2ZXJ5TXNnOiBuZXdPYmpcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICog5ZWG5oi35pyN5Yqh6aaW6aG1IOeCueWHu+S/oeeUqOWNoeaMiemSruafpeivouWVhuaIt+aYr+WQpuW8gOmAmui/h+S/oeeUqOWNoeaUtuasvlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVwZ3JhZGVTdCgpe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRVcGdyYWRlU3QsIGNvbW9tUGFyYW0pLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W54mp5paZ5Y6G5Y+y6K6i5Y2VXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naXN0aWNzTGlzdChwYXJhbSl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldExvZ2lzdGljc0xpc3QsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOafpeivouS/oeeUqOWNoeaUtuasvuWNh+e6p+eKtuaAgVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEF1ZGl0SW5mbygpe1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0QXVkaXRJbmZvLCBjb21vbVBhcmFtKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5pS25qy+6ZmQ6aKd6K+m5oOFXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGltaXRBdEluZm8oKXtcclxuICAgIC8v57yT5a2YMuS4quWwj+aXtlxyXG4gICAgcG9zdChDT05GSUcuUkVTVC5nZXRMaW1pdEF0SW5mbyxjb21vbVBhcmFtLGNhY2hlRmlyc3RTdG9yYWdlKDIqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3ApPT57XHJcbiAgICAgICAgaWYoIHJlc3Auc3RhdHVzQ29kZSA9IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MgKXtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtsaW1pdEluZm86cmVzcC5kYXRhfSkpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOabtOaWsOW6l+mTuuivpuaDhVxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOW6l+mTuuivpuaDheS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1jaG50T3BlcihwYXJhbSA9e30pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnVwZ3JhZGVNY2MgLCBPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/liKDpmaRtY2hudERldGFpbOe8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOyBcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5Yig6Zmk5Zyw5Z2A5L+h5oGvXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQWRkcmVzcyhwYXJhbT17XHJcbiAgICBpZDonJyAvL+WcsOWdgGlkXHJcbn0pe1xyXG4gICAgXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5kZWxldGVBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpOaUtui0p+WcsOWdgOe8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwYXJhbSk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOabtOaWsOaUtuasvumTtuihjOWNoVxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1jY0NhcmQocGFyYW09e1xyXG4gICAgdmlydHVhbENhcmRObzonJyAvL+iZmuaLn+WNoeWPt1xyXG59KSB7XHJcbiAgICBcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnVwZGF0ZU1jY0NhcmQsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5o2i5Y2h5ZCO77yM5riF6Zmk5bqX6ZO66K+m5oOF57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpOyBcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5paw5aKe5Zyw5Z2AXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+m57uG55qE5Zyw5Z2A5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3QWRkcmVzcyhwYXJhbT17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QubmV3QWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgLy8g5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDkv67mlLnlnLDlnYDkv6Hmga9cclxuICogQHBhcmFtIHsqfSBwYXJhbSDor6bnu4bnmoTlnLDlnYDkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlZGl0QWRkcmVzcyhwYXJhbT17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZWRpdEFkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyl7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog5ZCv5YGc5pS25qy+56CB5pyN5YqhXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWNjT25PZmYocGFyYW09e1xyXG4gICAgaXNVc2VNY2M6JycgIC8v5piv5ZCm5L2/55So5pS25qy+56CB5pyN5YqhXHJcbiB9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5zZXRNY2NPbk9mZixPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/liKDpmaTlupfpk7ror6bmg4XnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTsgXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog6I635Y+W5ZCK6LW35pSv5LuY5o6n5Lu255qEVE7lj7dcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNY2NUcmFuc051bSgpe1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0TWNjVHJhbnNOdW0pLnRoZW4oKHJlc3ApPT57XHJcbiAgICAgICAgaWYoIHJlc3Auc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTICl7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe21jY1RyYW5zTnVtOnJlc3AuZGF0YS50cmFuc051bX0pXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIHNhZmUpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzYWZlICYmIHRhcmdldFtrZXldKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qc1xuLy8gbW9kdWxlIGlkID0gMTRkYzFmN2ViZDgwZDE1YmZkMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTY3OTg1MWJlMjdiMjY4ZWEyNGVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3RhdGljL2ltZ3MvY29tbWRpdHkyLjRiZDIyNzNmMWQucG5nXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXNzZXRzL2ltZ3MvY29tbWRpdHkyLnBuZ1xuLy8gbW9kdWxlIGlkID0gMjE0MDE3NjY3MTYwYTA3Yzc2OTFcbi8vIG1vZHVsZSBjaHVua3MgPSA3IDkiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFkZmFjMjg1MjNhZTM3ZGFjNWJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjUxYmM3YWZlODEyN2UwOTE0OWRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDI4Y2ZmODZlMWQ1MWViZjIxZjdmXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgQnV0dG9uIGZyb20gJ2FudGQtbW9iaWxlL2xpYi9idXR0b24nO1xyXG5pbXBvcnQgXCIuL2FwcGx5Q29tbWRpdHkuc2Nzc1wiXHJcblxyXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGx5Q29tbWRpdHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCB7c3RvcmVBZGRyLCBpc0FncmVlLGNoYW5nZUFwcGx5Q29tbWRpdHlBZ3JlZW1lbnQscGljdHVyZSxpbnRyb2R1Y2UsaGFuZGxlQ2xpY2t9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBsZXQgYWdyZWVDbGFzcyA9IGlzQWdyZWUgPyBcImFncmVJY29uXCIgOiBcIm5vdEFncmVlSWNvblwiO1xyXG4gICAgICAgIGxldCBzaG93cmlnaHRidG4gPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5zaG93cmlnaHRidG47XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD1cImFjXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGVudFdhcnBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3BpY3R1cmV9IGFsdD1cIlwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRyb2R1Y2VcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDppbnRyb2R1Y2V9fT48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtSXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7mgqjlsIbmlLbliLA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbUluZm8gcGQyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgezxpIGNsYXNzTmFtZT1cImxpcGFpLWljb25cIj48L2k+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRyb2R1Y2Utd2FycC1kaXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd3JpZ2h0YnRuID09IFwic3RvcmVJbmZvXCIgJiYgKDxpIGNsYXNzTmFtZT1cImljb24tdGlwc1wiPjwvaT4pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD7otLTnurjjgIHmjILniYw8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtSXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7pgq7lr4TlnLDlnYA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbUluZm8gcGQyMFwiIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBcIi9hZGRyZXNzTWFuYWdlbWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHtyZWRpcmVjdDogXCIvYXBwbHlDb21tZGl0eVwiICsgdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuc2hvd3JpZ2h0YnRufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVBZGRyLmRlbGl2Tm0ubGVuZ3RoID09IDAgfHwgc3RvcmVBZGRyLmRlbGl2UGhvbmUubGVuZ3RoID09IDAgfHwgc3RvcmVBZGRyLmFkZEFsbC5sZW5ndGggPT0gMCB8fCBzdG9yZUFkZHIuYWRkcmVzc0luZm8ubGVuZ3RoID09IDAgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkZEFkZHItd2FycC1kaXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJhZGQtaWNvblwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7mt7vliqDmlLbotKflnLDlnYA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRkQWRkci13YXJwLWRpdjJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwZXJzb25JbmZvXCI+e3N0b3JlQWRkci5kZWxpdk5tfSB7c3RvcmVBZGRyLmRlbGl2UGhvbmV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGVyc29uQWRkclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg5pS26LSn5Zyw5Z2A77yae3N0b3JlQWRkci5hZGRBbGx9e3N0b3JlQWRkci5hZGRyZXNzSW5mb308L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJyaWdodEFycm93XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFncmVlLXdhcnAtZGl2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiYWdyZWVcIiBvbkNsaWNrPXtjaGFuZ2VBcHBseUNvbW1kaXR5QWdyZWVtZW50LmJpbmQodGhpcywhaXNBZ3JlZSl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPXthZ3JlZUNsYXNzfT48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPumYheivu+W5tuWQjOaEjyA8TGluayB0bz17XCIvdXNlckFncmVlXCJ9PuOAiuaUtuasvueggeacjeWKoeS9v+eUqOadoeasvuOAizwvTGluaz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pdC13YXJwLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVDbGlja30+5o+Q5Lqk55Sz6K+3PC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0FwcGx5Q29tbWRpdHkvQXBwbHlDb21tZGl0eS5qcyIsImltcG9ydCBDT05GSUcgZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL2NvbmZpZ1wiO1xyXG5pbXBvcnQge21jY1N0YXRlQ2hhbmdlZH0gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gXCIuLi8uLi9zdG9yZS9zdG9yZVwiXHJcbmltcG9ydCBNb2RhbCBmcm9tICdhbnRkLW1vYmlsZS9saWIvbW9kYWwnO1xyXG5pbXBvcnQge1VQREFURV9TVE9SRV9TVEFURX0gZnJvbSBcIi4uLy4uL3N0b3JlL2FjdGlvblwiO1xyXG5pbXBvcnQge2FwcGx5TWF0LCBnZXRBZGRyTGlzdH0gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RBUElcIjtcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNYXRBUEkoaGlzdG9yeSwgcGFyYW09e1xyXG4gICAgbWF0ZXJpYWxMaXN0OlwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nianmlpnliJfooahcclxuICAgIGRlbGl2Tm06XCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pS26LSn5Lq6XHJcbiAgICBhZGRBbGw6XCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWMuuWQjeensFxyXG4gICAgZGVsaXZQaG9uZTpcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mlLbotKfnlLXor51cclxuICAgIHByb3ZpbmNlSWQ6XCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v55yBSURcclxuICAgIGNpdHlJZDpcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5biCSURcclxuICAgIGFyZWFJZDpcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Yy6SURcclxuICAgIGFkZHJlc3NJbmZvOlwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6K+m57uG5Zyw5Z2AXHJcbiAgICBpZDonJyAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDlnYDnmoRJRFxyXG4gICAgY2l0eU5tOlwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/miYDlnKjln47luIJDaXR5Q29kZVxyXG4gICAgcmVkVXJsOlwiXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nuqLljIXnoIHlnLDlnYAgIOWPr+mAieWPguaVsFxyXG59KSB7XHJcblxyXG4gICAgYXBwbHlNYXQocGFyYW0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICAvL+mAmuefpeWuouaIt+err+S/ruaUueeKtuaAgVxyXG4gICAgICAgICAgICBtY2NTdGF0ZUNoYW5nZWQoKVxyXG5cclxuICAgICAgICAgICAgLy/kvKDnmoTlj4LmlbDkuK3mmK/lkKbmnInnuqLljIXnoIHlnLDlnYDvvIzlpoLmnpzmnInor7TmmI7opoHnlLPor7fnuqLljIXnoIHnianmlpnvvIxcclxuICAgICAgICAgICAgaWYocGFyYW0ucmVkVXJsKXtcclxuICAgICAgICAgICAgICAgIGlmKEpTT04ucGFyc2UocGFyYW0ubWF0ZXJpZWxMaXN0KS5sZW5ndGg9PTIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpznianmlpnliJfooajmnInkuKTkuKrlr7nosaHvvIzor7TmmI7lkIzml7bnlLPor7fkuobnuqLljIXnoIHnianmlpnlkozmlLbmrL7noIHnianmlplcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gSlNPTi5wYXJzZShwYXJhbS5yZWRVcmwpLnJlZFVybDtcclxuICAgICAgICAgICAgICAgICAgICB1cmw9ZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IFwiL3Jlc3VsdC9zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaDogJz9zaG93QnRuPXRydWUmcmVkVVJMPScgKyB1cmxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOeJqeaWmeWIl+ihqOaciTHkuKrvvIzor7TmmI7lj6rnlLPor7fkuobmlLbmrL7noIHnianmlplcclxuICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogXCIvcmVzdWx0L3N1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiAnP3Nob3dCdG49dHJ1ZSZvbmx5UmVkQmFnPXRydWUnXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogXCIvcmVzdWx0L3N1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2g6ICc/c2hvd0J0bj10cnVlJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgTW9kYWwuYWxlcnQoJ+eUs+ivt+Wksei0pScsIHJlc3BvbnNlLm1zZyB8fCAn5p+l6K+i5Lia5Yqh6KaB57Sg5Ye66ZSZ77yM6K+356iN5ZCO5YaN6K+V77yBJywgW1xyXG5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn56Gu6K6kJywgb25QcmVzczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnB1c2goe3BhdGhuYW1lOiBcIi9yZXN1bHQvZmFpbFwifSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHRBZGRyKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5a6a5piv5LiN5piv5Yid5qyh6L+b5YWl6K+l6aG16Z2iXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgbGV0IGlzSW5pdCA9IHN0b3JlLmdldFN0YXRlKCkuZ2V0SW4oW1wic3RvcmVBZGRyXCJdKS5nZXQoXCJkZWxpdk5tXCIpLmxlbmd0aD09IDA7XHJcbiAgICBpZihpc0luaXQpe1xyXG4gICAgICAgIGdldEFkZHJMaXN0KChyZXMpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRBZGRyTGlzdDrmiJHmmK/nnJ/mraPnmoR1cGRhdGXlh73mlbAnKVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogc3RvcmVBZGRyIOS7o+ihqOm7mOiupOWcsOWdgFxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVsbH1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGxldCBzdG9yZUFkZHIgPSBudWxsLCBhZGRyZXNzTGlzdCA9IHJlc3BvbnNlLmRhdGEucmVzdWx0IHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOmBjeWOhuWcsOWdgOWIl+ihqFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgYWRkcmVzc0xpc3QuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vc3RhdGU9PTEg55qE5Luj6KGo6buY6K6k5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlQWRkciA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8v5aaC5p6c6buY6K6k5Zyw5Z2A5LiN5pivbnVsbCDliJnmm7TmlrAgcmVkdXgg5Lit55qEc3RvcmVBZGRyXHJcbiAgICAgICAgICAgIGlmKCEhc3RvcmVBZGRyKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0U3RhdGU9e1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGl2Tm06IHN0b3JlQWRkci5tZW1iZXJOYW1lLCAvL+aUtui0p+S6ulxyXG4gICAgICAgICAgICAgICAgICAgIGFkZEFsbDogc3RvcmVBZGRyLmFkZEFsbCwvL+ecgeW4guWMuue7hOWQiFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGl2UGhvbmU6IHN0b3JlQWRkci5waG9uZSwvL+aUtui0p+eUteivnVxyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlSWQ6IHN0b3JlQWRkci5wcm92aW5jZUlkLC8v55yBSURcclxuICAgICAgICAgICAgICAgICAgICBjaXR5SWQ6IHN0b3JlQWRkci5jaXR5SWQsLy/luIJJRFxyXG4gICAgICAgICAgICAgICAgICAgIGFyZWFJZDogc3RvcmVBZGRyLmFyZWFJZCwvL+WcsOWMuklEXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzc0luZm86IHN0b3JlQWRkci5hZGRyZXNzSW5mbywvL+ivpue7huWcsOWdgFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBzdG9yZUFkZHIuaWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7c3RvcmVBZGRyOm5leHRTdGF0ZX0pKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDpgJrnn6V1cGRhdGXlh73mlbDvvIxzdWNjZXNz5Lit55qE5Luj56CB5bey5omn6KGM5a6M5q+VXHJcbiAgICAgICAgICAgIGlmKCAhIXJlc3BvbnNlLmZ1YyApe1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZnVjLmVuZE9mRnVuYygpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEFkZHJMaXN0OiAgc3VjY2Vzc+WHveaVsOaJp+ihjOWujOavlScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0FwcGx5Q29tbWRpdHkvQXBwbHlDb21tZGl0eUFjdGlvbnMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gM2MyNGQzOGZmY2QwYzM4ZTM0Nzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0ID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpdGVyRm4gPSBnZXQoaXQpO1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDUzYjdkMzQ4MTcxNDRiMTJiMGFhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImFjXCI6XCJhY1wiLFwiaGVhZFwiOlwiaGVhZFwiLFwiaW50cm9kdWNlXCI6XCJpbnRyb2R1Y2VcIixcImZvcm1JdGVtXCI6XCJmb3JtSXRlbVwiLFwiaXRlbUluZm9cIjpcIml0ZW1JbmZvXCIsXCJhZGRBZGRyLXdhcnAtZGl2XCI6XCJhZGRBZGRyLXdhcnAtZGl2XCIsXCJhZGQtaWNvblwiOlwiYWRkLWljb25cIixcImFkZEFkZHItd2FycC1kaXYyXCI6XCJhZGRBZGRyLXdhcnAtZGl2MlwiLFwibGlwYWktaWNvblwiOlwibGlwYWktaWNvblwiLFwiaW50cm9kdWNlLXdhcnAtZGl2XCI6XCJpbnRyb2R1Y2Utd2FycC1kaXZcIixcImljb24tdGlwc1wiOlwiaWNvbi10aXBzXCIsXCJwZXJzb25JbmZvXCI6XCJwZXJzb25JbmZvXCIsXCJwZXJzb25BZGRyXCI6XCJwZXJzb25BZGRyXCIsXCJyaWdodEFycm93XCI6XCJyaWdodEFycm93XCIsXCJwZDI0XCI6XCJwZDI0XCIsXCJwZDIwXCI6XCJwZDIwXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQXBwbHlDb21tZGl0eS9hcHBseUNvbW1kaXR5LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDU0Nzc0YzcwMDIzZGZlZmU5Zjk4XG4vLyBtb2R1bGUgY2h1bmtzID0gNyA5IDEwIiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDVlNTliNzFiMzNhMzhjMzYxOGU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1ZTc0OTFmMWY3OTk3MTVlYWM3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDZhNDQyYWI1YmQ5YmQ5Mjk0NDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8qXHJcbiAgIEFQSSDmjqXlj6PphY3nva5cclxuICAgYXhpb3Mg5Y+C6ICD5paH5qGj77yaaHR0cHM6Ly93d3cua2FuY2xvdWQuY24veXVueWUvYXhpb3MvMjM0ODQ1XHJcblxyXG4qL1xyXG4vLyBpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnYW50ZC1tb2JpbGUvbGliL3RvYXN0JztcclxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnXCJcclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKlxyXG4qIOW4uOmHj+WumuS5ieWMulxyXG4qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBjb25zdCBVdGlsID0gd2luZG93LlVQLlcuVXRpbDtcclxuXHJcbmV4cG9ydCBjb25zdCBBcHAgPSBVUC5XLkFwcDtcclxuXHJcbmV4cG9ydCBjb25zdCBFbnYgPSBVUC5XLkVudjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGhvbmUgPSAvXigxM1swLTldfDE0WzU3OV18MTVbMC0zLDUtOV18MTZbNl18MTdbMDEzNTY3OF18MThbMC05XXwxOVs4OV0pXFxkezh9JC87XHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGF5TnVtID0gL15bMC05XXsyMH0kLztcclxuXHJcbmV4cG9ydCBjb25zdCBjb21vbVBhcmFtID0ge1xyXG4gICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgIHNvdXJjZTogXCIyXCJcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiDor7fmsYLmoLjlv4PljLog5LiL6Z2i6L+Z5Z2X5Yy65Z+f5Lit55qE5Luj56CB5pS55Yqo6K+35oWO6YeNXHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5sZXQgYmFzZVVybCA9IFwiXCIsIGJhc2VVcmwyID0gXCJcIiwgYmFzZVVybDMgPSBcIlwiO1xyXG5pZiAobG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignOTU1MTYuY29tJykgIT09IC0xKSB7IC8v55Sf5Lqn546v5aKDXHJcbiAgICBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vc2hhbmdodS45NTUxNi5jb20vd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDIgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9tYWxsLjk1NTE2LmNvbS9jcXAtaW50LW1hbGwtd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICBiYXNlVXJsMyA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL3lvdWh1aS45NTUxNi5jb20veW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2UgaWYgKGxvY2F0aW9uLmhvc3RuYW1lLmluZGV4T2YoJzE3Mi4xOC4xNzkuMTAnKSAhPT0gLTEpIHsgLy/mtYvor5Xnjq/looNcclxuICAgIC8vIGJhc2VVcmw9XCJodHRwOi8vMTcyLjIxLjEwMS4yNTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7IC8v5rWL6K+V5a6kYXBhY2hlXHJcbiAgICAvL2Jhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjk1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+W8gOWPkeeOr+Wig2FwYWNoZVxyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4xMzMuMjU6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2Uge1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuOTU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuMjU6MzgyMTAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMTMzLjI1OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjMzLjU2OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufVxyXG4vKipcclxuICog6YCa6L+H5ZCO57yA6I635Y+W5pyN5Yqh5Zmo55qE5YWo5Zyw5Z2AXHJcbiAqIEBwYXJhbSB1cmxcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZXJ2VXJsID0gKHVybCkgPT4ge1xyXG4gICAgbGV0IHNlcnZlclVybCA9IFwiXCJcclxuICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QudXNlckluZm8pIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgLy8gZWxzZSBpZiAodXJsLnNwbGl0KFwiL1wiKVswXSA9PSBcImFkZHJlc3NcIikge1xyXG4gICAgLy8gICAgIHNlcnZlclVybCA9IGJhc2VVcmwyXHJcbiAgICAvLyB9XHJcbiAgICBlbHNlIGlmICh1cmwuc3BsaXQoXCIvXCIpWzBdID09IFwic2NhblwiIHx8IHVybCA9PSBDT05GSUcuUkVTVC5nZXRDaXR5KSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gYmFzZVVybDNcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHNlcnZlclVybCA9IGJhc2VVcmxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VydmVyVXJsO1xyXG59XHJcblxyXG4vKipcclxuICog5qC85byP5YyW57uT5p6cIOWwhue7k+aenOagvOW8j+WMluS4ulxyXG4gKiB7XHJcbiAqICAgICBzdGF0dXNDb2RlICAg5ZCO5Y+w5ZON5bqU56CBXHJcbiAqICAgICBkYXRhICAgICAgICAg5ZCO5Y+w6L+U5Zue55qE5pWw5o2uXHJcbiAqICAgICBtc2cgICAgICAgICAg5ZCO5Y+w55qE5o+Q56S65L+h5oGvXHJcbiAqIH1cclxuICogQHBhcmFtIGRhdGFcclxuICogQHJldHVybnMge3tzdGF0dXNDb2RlOiAoc3RyaW5nfCopLCBkYXRhOiAqLCBtc2c6ICp9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlRm9ybWF0dGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCByZXMgPSB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5yZXNwLFxyXG4gICAgICAgIGRhdGE6IGRhdGEucGFyYW1zLFxyXG4gICAgICAgIG1zZzogZGF0YS5tc2dcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vLyDliKDpmaTlupXpg6ggJy8nXHJcbmZ1bmN0aW9uIGRlbGV0ZVNsYXNoKGhvc3QpIHtcclxuICAgIHJldHVybiBob3N0LnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbn1cclxuXHJcbi8vIOa3u+WKoOWktOmDqCAnLydcclxuZnVuY3Rpb24gYWRkU2xhc2gocGF0aCkge1xyXG4gICAgcmV0dXJuIC9eXFwvLy50ZXN0KHBhdGgpID8gcGF0aCA6IGAvJHtwYXRofWA7XHJcbn1cclxuXHJcbi8vIOino+aekOWPguaVsFxyXG5mdW5jdGlvbiBzZXBhcmF0ZVBhcmFtcyh1cmwpIHtcclxuICAgIGNvbnN0IFtwYXRoID0gJycsIHBhcmFtc0xpbmUgPSAnJ10gPSB1cmwuc3BsaXQoJz8nKTtcclxuXHJcbiAgICBsZXQgcGFyYW1zID0ge307XHJcblxyXG4gICAgcGFyYW1zTGluZS5zcGxpdCgnJicpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gaXRlbS5zcGxpdCgnPScpO1xyXG5cclxuICAgICAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtwYXRoLCBwYXJhbXN9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZyl7XHJcbiAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge319ID0gY29uZmlnO1xyXG4gICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4gICAgbGV0IHNlcnZlclVybCA9ICdodHRwOi8vMTI3LjAuMC4xOjMwMDAvJztcclxuICAgIGxldCBmaW5hbFVybCA9IHNlcnZlclVybCArIHVybDtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHVybDpmaW5hbFVybCxcclxuICAgICAgICAgICAgdHlwZTptZXRob2QsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAnMjAwJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZUZvcm1hdHRlcihyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcign6K+35rGC5aSx6LSlJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYoIG1ldGhvZCA9PT0gJ1BPU1QnICl7XHJcbiAgICAgICAgICAgICBvcHRpb25zLmRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgIG9wdGlvbnMuZGF0YVR5cGUgPSAnanNvbidcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgob3B0aW9ucyk7XHJcbiAgICB9KVxyXG4gICAgXHJcbn1cclxuXHJcbi8vIOS4u+imgeivt+axguaWueazlVxyXG4vLyBleHBvcnQgIGZ1bmN0aW9uIHJlcXVlc3RPcmlnaW4oY29uZmlnKSB7XHJcblxyXG4vLyAgICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbi8vICAgICBjb25zdCB1aSA9IFVQLlcuVUk7XHJcbi8vICAgICBjb25zdCBlbnYgPSBVUC5XLkVudjtcclxuXHJcbi8vICAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge30sIGhlYWRlcnMsIGZvckNoc3AsIGVuY3J5cHQsIGJ5QWpheCwgY2FjaGUsIHVwZGF0ZSwgc3RvcmFnZX0gPSBjb25maWc7XHJcblxyXG4vLyAgICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4vLyAgICAgbGV0IHNlcnZlclVybCA9IGdldFNlcnZVcmwodXJsKTtcclxuXHJcbi8vICAgICAvLyBsZXQgc2VydmVyVXJsID0gYmFzZVVybCA7XHJcbi8vICAgICAvLyBpZiAodHJ1ZSkge1xyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4fmj5Lku7blj5HpgIHor7fmsYJcclxuLy8gICAgICAqL1xyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKiBAcGFyYW0gcGFyYW1zIOivt+axguWPguaVsFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB2ZXJzaW9u77ya54mI5pys77yM6buY6K6k5pivMS4wXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHNvdXJjZe+8muadpea6kO+8jOm7mOiupOagueaNrkFuZHJvaWTjgIFpT1Poh6rliqjmt7vliqBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgZW5jcnlwdO+8muaYr+WQpuWKoOWvhu+8jOm7mOiupOWKoOWvhlxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBtZXRob2TvvJror7fmsYLmlrnms5XvvIxQT1NU5oiWR0VUXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIGNtZO+8muivt+axguWRveS7pO+8iOS5n+WPr+iHquihjOWwhmNtZOe7hOijheiHs3VyaVvkvJjmg6DlkI7lj7Bd5oiWcGF0aFvpkrHljIXlkI7lj7Bd77yJXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHVyaS9wYXRo77ya6K+35rGC5Zyw5Z2A77yM5bu66K6u5LuF5aGr5YWFY21k77yM5LiN5bu66K6u6Ieq6KGM57uE6KOFdXJpL3BhdGhcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgcGFyYW1z77ya5Y+R6YCB57uZ5ZCO5Y+w55qE5Y+C5pWwXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHZpZO+8muWmguaenOmAmui/h0FqYXjmlrnlvI/lkJF3YWxsZXTlkI7lj7Dlj5HpgIHor7fmsYLpnIDopoHmkLrluKZ2aWRcclxuLy8gICAgICAqIEBwYXJhbSBmb3JDaHNwIOaYr+WQpuWQkeS8mOaDoOWQjuWPsOWPkemAgeivt+axgu+8iOm7mOiupOWQkeaJi+acuuWQjuWPsOWPkemAgeivt+axgu+8iVxyXG4vLyAgICAgICogQHBhcmFtIGJ5QWpheCDmmK/lkKbkvb/nlKhBamF45Y+R6YCB6K+35rGC77yI6buY6K6k5L2/55So5o6n5Lu277yJXHJcbi8vICAgICAgKiBAcGFyYW0gc3VjY2VzcyDmiJDlip/lm57osINcclxuLy8gICAgICAqIEBwYXJhbSBlcnJvciDplJnor6/lm57osIPvvIjkuJrliqHplJnor6/vvIlcclxuLy8gICAgICAqIEBwYXJhbSBmYWlsIOWksei0peWbnuiwg++8iOivt+axguWksei0pe+8iVxyXG4vLyAgICAgICovXHJcbi8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4vLyAgICAgICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuXHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgc3VjY2Vzc0NhbGxiYWNrID0gKGRhdGEsZnVjKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuaIkOWKn+e7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuLy8gICAgICAgICAgICAgICAgIGxldCByZXEgPSByZXNwb25zZUZvcm1hdHRlcihkYXRhKTtcclxuLy8gICAgICAgICAgICAgICAgIGlmKCAhIWZ1YyApe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlcS5mdWMgPSBmdWM7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcSlcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGVycm9yQ2FsbGJhY2sgPSAoZXJyKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuWksei0pee7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QuYXBwbHlNY2MgfHwgdXJsID09IENPTkZJRy5SRVNULmFwcGx5TWF0IHx8IHVybCA9PSBDT05GSUcuUkVTVC50b2RheU1vbmV5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJlc3BvbnNlRm9ybWF0dGVyKGVycik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXEpXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBUb2FzdC5pbmZvKGVyci5tc2cgfHwgJ+afpeivouS4muWKoeimgee0oOWHuumUme+8jOivt+eojeWQjuWGjeivle+8gScpO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgbmV0d29ya0NhbGxiYWNrID0gKHhocikgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgVG9hc3QuaW5mbyh4aHIubXNnKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuXHJcbi8vICAgICAgICAgICAgIGlmICh1cmwgIT0gQ09ORklHLlJFU1QuZ2V0VG9kYXlJbmNvbWUpIHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLnNob3dMb2FkaW5nKCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGlmICghY2FjaGUpIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJQYXJhbTpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHtcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgZW5jcnlwdDogZW5jcnlwdCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBmb3JDaHNwOiBmb3JDaHNwLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGJ5QWpheDogYnlBamF4XHJcbi8vICAgICAgICAgICAgICAgICAvLyB9KVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHpnZ7nvJPlrZjor7fmsYJcIilcclxuLy8gICAgICAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZShcclxuLy8gICAgICAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cmk6c2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjayk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNhY2hlVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdG9yZWFnZeetlueVpeaYrzpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2UpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInVwZGF0ZeWHveaVsDpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVwZGF0ZSlcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB57yT5a2Y6K+35rGCXCIpXHJcbi8vICAgICAgICAgICAgICAgICAvKipcclxuLy8gICAgICAgICAgICAgICAgICAqIOWQkeacjeWKoeWZqOWPkemAgeivt+axglxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHBhcmFtcyDor7fmsYLlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmVyc2lvbu+8mueJiOacrO+8jOm7mOiupOaYrzEuMFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzb3VyY2XvvJrmnaXmupDvvIzpu5jorqTmoLnmja5BbmRyb2lk44CBaU9T6Ieq5Yqo5re75YqgXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuY3J5cHTvvJrmmK/lkKbliqDlr4bvvIzpu5jorqTliqDlr4ZcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbWV0aG9k77ya6K+35rGC5pa55rOV77yMUE9TVOaIlkdFVFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBjbWTvvJror7fmsYLlkb3ku6TvvIjkuZ/lj6/oh6rooYzlsIZjbWTnu4Too4Xoh7N1cmlb5LyY5oOg5ZCO5Y+wXeaIlnBhdGhb6ZKx5YyF5ZCO5Y+wXe+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB1cmkvcGF0aO+8muivt+axguWcsOWdgO+8jOW7uuiuruS7heWhq+WFhWNtZO+8jOS4jeW7uuiuruiHquihjOe7hOijhXVyaS9wYXRoXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHBhcmFtc++8muWPkemAgee7meWQjuWPsOeahOWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2aWTvvJrlpoLmnpzpgJrov4dBamF45pa55byP5ZCRd2FsbGV05ZCO5Y+w5Y+R6YCB6K+35rGC6ZyA6KaB5pC65bimdmlkXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZm9yQ2hzcCDmmK/lkKblkJHkvJjmg6DlkI7lj7Dlj5HpgIHor7fmsYLvvIjpu5jorqTlkJHmiYvmnLrlkI7lj7Dlj5HpgIHor7fmsYLvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBieUFqYXgg5piv5ZCm5L2/55SoQWpheOWPkemAgeivt+axgu+8iOm7mOiupOS9v+eUqOaOp+S7tu+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3Mg5oiQ5Yqf5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZXJyb3Ig6ZSZ6K+v5Zue6LCD77yI5Lia5Yqh6ZSZ6K+v77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZmFpbCDlpLHotKXlm57osIPvvIjor7fmsYLlpLHotKXvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSB1cGRhdGUg5byC5q2l5Yi35paw5Zue6LCDIOWmguaenOiuvue9rmFzeW5j5Li6dHJ1ZeWQjuWPr+S7pea3u+WKoHVwZGF0ZeWbnuiwgyDlpoLmnpzkuI3loavlhpnpu5jorqTku6VzdWNjZXNz6L+b6KGM5aSE55CGXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gc3RvcmFnZSDnvJPlrZjlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbmVlZFN3ICAgICAgICAgICAgLy/pu5jorqRmYWxzZeWkp+mDqOWIhueUqOeahOaYr+aPkuS7tumcgOimgeeahOaJi+WKqOWOu+WKoFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzdG9yYWdlVHlwZSAgICAgIC8v6buY6K6k5L2/55SobG9jYWxzdG9yYWdlXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGFzeW5jICAgICAgICAgICAgLy/pu5jorqTojrflj5bnvJPlrZjlkI7kuI3lj5Hor7fmsYLvvIzmlLnkuLp0cnVl5ZCO5Lya5byC5q2l5Y676K+35rGC5ZCO5Y+w5bm25Yi35paw5pWw5o2uXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuZE9mU3luY0Z1bmMgICAgLy90b2RvIOmHjeimge+8ge+8ge+8ge+8geWbnuiwg+S4reWmguaenOWtmOWcqOW8guatpe+8iOaPkuS7tuetie+8iemcgOimgeagh+aYjuW8guatpeeKtuaAgeS4unRydWVcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmFsaWRhdGVUaW1lICAgICAvL+acieaViOacn+m7mOiupOaXoOmZkOacieaViOacnyDljZXkvY3mr6vnp5JcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVdpdGhJZCAgICAgICAvL+m7mOiupHRydWXku6XnlKjmiLdpZOi/m+ihjOWtmOWCqOWQpuWImWZhbHNl5LulbG9jYWzlrZjlgqhcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVN1Y2MgICAgICAgICAvL+S/neWtmOaIkOWKn+WQjueahOWbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlRXJyICAgICAgICAgIC8v5L+d5a2Y5aSx6LSl5ZCO55qE5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHJvbGxLZXkgICAgICAgICAgLy/lvLrliLborr7nva7kuLvplK5cclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2Vjb25kS2V5ICAgICAgICAvL+W8uuWItuiuvue9ruasoeimgemUruWAvFxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g6YeN6KaB6K+05piOIOiwg+eUqOW8guatpeaooeW8j++8iGFzeW5j6K6+572u5Li6dHJ1Ze+8ieWQjuWPr+iDveWcqHN1Y2Nlc3Plm57osIPph4zlrZjlnKjlvILmraXmk43kvZzvvIzor6Xmg4XlhrXkuIvlm57lr7zoh7TnvJPlrZjnmoTlm57osIPlj6/og71cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOacquaJp+ihjOWujOaIkO+8jOivt+axgueahOWbnuiwg+WPiOW8gOWni+aJp+ihjOS6hueahOaDheWGte+8jOaJgOS7peaIkeS7rOe7n+S4gOWcqHN1Y2Nlc3Plm57osIPlkox1cGRhdGXlm57osIPnmoTlhaXlj4Llop7liqDkuobnrKzkuozkuKrlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOeUqOS6juWFvOWuueWbnuiwg+WGheWMheWQq+W8guatpeeahOeKtuWGte+8jOS9v+eUqOaWueazleS4uu+8mummluWFiOiuvue9rmVuZE9mU3luY0Z1bmPlj4LmlbDkuLp0cnVlLOWFtuasoXN1Y2Nlc3Plkox1cGRhdGXlm55cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOiwg+WGheS8muaciTLkuKrlhaXlj4LvvIxzdWNjZXNz77yIcmVzcO+8jGZ1Y++8ie+8jOivt+WcqOS7o+eggemXreWMheWkhOS9v+eUqGZ1Yy5lbmRPZkZ1bmMoKVxyXG4vLyAgICAgICAgICAgICAgICAgICovXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHBhcmFtID0ge31cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGJ5QWpheCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogXCJsaWZlL2xpZmVcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXJpOnNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2VXaXRoU3RvcmFnZShwYXJhbSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjaywgc3RvcmFnZSwgdXBkYXRlKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICB9KVxyXG4vLyAgICAgfSlcclxuXHJcblxyXG4vLyAgICAgLy8gfVxyXG4vLyAgICAgLy8gZWxzZSB7XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4dBamF4IOWPkemAgeivt+axglxyXG4vLyAgICAgICovXHJcbi8vICAgICAvLyByZXR1cm4gYXhpb3Moe1xyXG4vLyAgICAgLy8gICAgIHVybDogYmFzZVVybCArIHVybCxcclxuLy8gICAgIC8vICAgICBtZXRob2QsXHJcbi8vICAgICAvLyAgICAgaGVhZGVycyxcclxuLy8gICAgIC8vICAgICBkYXRhOiBtZXRob2QgPT09ICdHRVQnID8gdW5kZWZpbmVkIDogZGF0YSxcclxuLy8gICAgIC8vICAgICBwYXJhbXM6IE9iamVjdC5hc3NpZ24obWV0aG9kID09PSAnR0VUJyA/IGRhdGEgOiB7fSwgcGFyYW1zKVxyXG4vLyAgICAgLy8gfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gICAgIC8vXHJcbi8vICAgICAvLyAgICAgbGV0IHJlcSA9IHtcclxuLy8gICAgIC8vICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2UuZGF0YS5yZXNwLFxyXG4vLyAgICAgLy8gICAgICAgICBkYXRhOiByZXNwb25zZS5kYXRhLnBhcmFtc1xyXG4vLyAgICAgLy8gICAgIH1cclxuLy8gICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcSlcclxuLy8gICAgIC8vIH0pLmNhdGNoKGVyciA9PiB7XHJcbi8vICAgICAvLyAgICAgLy8g6K+35rGC5Ye66ZSZXHJcbi8vICAgICAvLyAgICAgVG9hc3QuaW5mbygncmVxdWVzdCBlcnJvciwgSFRUUCBDT0RFOiAnICsgZXJyLnJlc3BvbnNlLnN0YXR1cyk7XHJcbi8vICAgICAvLyAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XHJcbi8vICAgICAvLyB9KTtcclxuLy8gICAgIC8vIH1cclxuXHJcbi8vIH1cclxuXHJcbi8vIOS4gOS6m+W4uOeUqOeahOivt+axguaWueazlVxyXG5leHBvcnQgY29uc3QgZ2V0ID0gKHVybCwgZGF0YSwgcGFyYW0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IHBhcmFtQWxsID0gT2JqZWN0LmFzc2lnbih7Zm9yQ2hzcDogdHJ1ZSwgZW5jcnlwdDogdHJ1ZSwgY2FjaGU6IGZhbHNlLCBieUFqYXg6IGZhbHNlfSwgcGFyYW0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QoT2JqZWN0LmFzc2lnbih7dXJsLCBkYXRhfSwgcGFyYW1BbGwpKVxyXG59O1xyXG5leHBvcnQgY29uc3QgcG9zdCA9ICh1cmwsIGRhdGEsIHBhcmFtID0ge30pID0+IHtcclxuICAgIGxldCBwYXJhbUFsbCA9IE9iamVjdC5hc3NpZ24oe2ZvckNoc3A6IHRydWUsIGVuY3J5cHQ6IHRydWUsIGNhY2hlOiBmYWxzZSwgYnlBamF4OiBmYWxzZX0sIHBhcmFtKTtcclxuICAgIHJldHVybiByZXF1ZXN0KE9iamVjdC5hc3NpZ24oe21ldGhvZDogJ1BPU1QnLCB1cmwsIGRhdGF9LCBwYXJhbUFsbCkpXHJcbn07XHJcbmV4cG9ydCBjb25zdCBwdXQgPSAodXJsLCBkYXRhKSA9PiByZXF1ZXN0KHttZXRob2Q6ICdQVVQnLCB1cmwsIGRhdGF9KTtcclxuZXhwb3J0IGNvbnN0IGRlbCA9ICh1cmwsIGRhdGEpID0+IHJlcXVlc3Qoe21ldGhvZDogJ0RFTEVURScsIHVybCwgZGF0YX0pO1xyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIOWKn+iDveWHveaVsOWMulxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIOWwhlVSTOS4reeahHNlYXJjaCDlrZfnrKbkuLIg6L2s5o2i5oiQIOWvueixoVxyXG4gKiBAcGFyYW0gc2VhcmNoXHJcbiAqIEByZXR1cm5zIHt7fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZWFyY2hQYXJhbSA9IChzZWFyY2gpID0+IHtcclxuICAgIGlmICghIXNlYXJjaCkge1xyXG4gICAgICAgIGxldCBzdHIgPSBzZWFyY2guc2xpY2UoMSk7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gc3RyLnNwbGl0KFwiJlwiKTtcclxuICAgICAgICBsZXQgb2JqID0ge307XHJcbiAgICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW0gPSBpdGVtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgb2JqW3BhcmFtWzBdXSA9IHBhcmFtWzFdO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIGNvZG92YSDmj5Lku7bosIPnlKjljLpcclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5cclxuLy8g5ZCv5YGc5pS25qy+56CBXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRYaWFvV2VpUGF5KHBhcmFtLCBzdWMsIGVycikge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuc2V0WGlhb1dlaVBheShwYXJhbSwgc3VjLCBlcnIpO1xyXG59XHJcblxyXG4vL+Wwj+W+rmF1ZGlvXHJcbmV4cG9ydCBjb25zdCBzZXRYaWFvV2VpQXVkaW8gPSAocGFyYW0sIHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5zZXRYaWFvV2VpQXVkaW8ocGFyYW0sIHN1YywgZXJyKTtcclxufVxyXG5leHBvcnQgY29uc3QgZ2V0WGlhb1dlaUF1ZGlvID0gKHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5nZXRYaWFvV2VpQXVkaW8oc3VjLCBlcnIpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdG9hc3QgPSAobXMpID0+IHtcclxuICAgIFRvYXN0LmluZm8obXMsIDIpO1xyXG59XHJcbi8qKlxyXG4gKiDorr7nva7pobbpg6hiYXJcclxuICogQHBhcmFtIHRpdGxlIOmhtemdouWQjeensFxyXG4gKiBAcGFyYW0gcmlnaHRCYXIg5Y+z5L6n5oyJ6ZKu5ZCN56ewXHJcbiAqIEBwYXJhbSByaWdodENhbGxiYWNrIOWPs+S+p+aMiemSruWbnuiwg1xyXG4gKiBAcGFyYW0gcmlnaHRCYXJJbWcg5Y+z5L6n5oyJ6ZKu5Zu+54mHXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYmVmb3JlRW50ZXJSb3V0ZXIgPSAodGl0bGUgPSBcIlwiLCByaWdodEJhciA9IFwiXCIsIHJpZ2h0Q2FsbGJhY2sgPSBudWxsLCByaWdodEJhckltZyA9IG51bGwpID0+IHtcclxuICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHRpdGxlKVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueql+WPo+WPs+S+p+aMiemSrlxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZSDlm77moIfmoIfpophcclxuICAgICAgICAgKiBAcGFyYW0gaW1hZ2Ug5Zu+5qCH5paH5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIGhhbmRsZXIg54K55Ye75Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKCEhcmlnaHRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uKHJpZ2h0QmFyLCByaWdodEJhckltZywgcmlnaHRDYWxsYmFjaylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24oXCJcIiwgbnVsbCwgbnVsbClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDpgJrnn6XlrqLmiLfnq6/kv67mlLnnirbmgIFcclxuICovXHJcbmV4cG9ydCBjb25zdCBtY2NTdGF0ZUNoYW5nZWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAubWNjU3RhdGVDaGFuZ2VkKClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kUXJDb2RlID0gKHBhcmFtcywgc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5omr5o+P5p2h56CB5ZKM5LqM57u056CBXHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAgICAgICAqIEBwYXJhbSBzdWNjZXNzXHJcbiAgICAgICAgICogQHBhcmFtIGZhaWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuc2NhblFSQ29kZShwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VXZWJWaWV3ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY2xvc2VXZWJWaWV3KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2ZXJpZnlQYXlQd2QgPSAocGFyYW0sIHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnZlcmlmeVBheVB3ZChwYXJhbSwgc3VjY2VzcywgZmFpbClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVXZWJWaWV3ID0gKHVybCwgcGFyYW1zID0gbnVsbCwgdGl0bGUgPSAnJywgaXNGaW5pc2ggPSBcIjFcIikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY3JlYXRlV2ViVmlldyh1cmwsIHBhcmFtcywgdGl0bGUsIGlzRmluaXNoKVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRVc2VyRGV0YWlsSW5mbyA9IChzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuZ2V0VXNlckRldGFpbEluZm8oc3VjY2VzcywgZmFpbClcclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWwhmNhdmFzIOS/neWtmOWIsOacrOWcsOebuOWGjFxyXG4gKiBAcGFyYW0gY2FudmFzXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2F2ZVFjb2RlID0gKGNhbnZhcykgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgdWkgPSBVUC5XLlVJIHx8IHt9O1xyXG4gICAgdmFyIHBpY1VybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhcHAubG9nRXZlbnQoJ3NhdmVQaWN0dXJlX05ld1llYXJBY3QnKTtcclxuICAgICAgICBhcHAuc2F2ZVBpY1RvTG9jYWwoe1xyXG4gICAgICAgICAgICB1cmw6IHBpY1VybCAmJiBwaWNVcmwuc3Vic3RyKDIyKVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdWkuc2hvd1RvYXN0V2l0aFBpYygn5bey5L+d5a2Y5Yiw57O757uf55u45YaMJyk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd1RvYXN0KG1zZyB8fCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoYXJlID0gKHRpdGxlLCBkZXNjLCBpbWdVUkwsIHBhZ2VVUmwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIGVudiA9IFVQLlcuRW52IHx8IHt9O1xyXG5cclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pi+56S65YiG5Lqr6Z2i5p2/XHJcbiAgICAgICAgICog5aaC5p6c5omA5pyJ5rig6YGT5L2/55So55u45ZCM55qE5YiG5Lqr5YaF5a655YiZ5LuF5aGr5YaZcGFyYW1z5Y2z5Y+v77yMXHJcbiAgICAgICAgICog5aaC5p6c6ZyA6KaB5qC55o2u5LiN5ZCM5rig6YGT5a6a5Yi25YiG5Lqr5YaF5a6577yM5YiZ5Y+vcGFyYW1z55WZ56m677yM5Zyoc2hhcmVDYWxsYmFja+S4rei/lOWbnuaMh+Wumua4oOmBk+eahOWIhuS6q+WGheWuuVxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXMg5YiG5Lqr5Y+C5pWwXHJcbiAgICAgICAgICogICAgICAgICAgICAgIHtcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHRpdGxl77yaIOWIhuS6q+agh+mimFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgZGVzYzog5YiG5Lqr5pGY6KaBXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBwaWNVcmzvvJrliIbkuqvlm77moIdcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNoYXJlVXJs77ya6K+m5oOF5Zyw5Z2AXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiBAcGFyYW0gc2hhcmVDYWxsYmFjayDliIbkuqvml7blm57osINcclxuICAgICAgICAgKiAgICAgICAgICAgICAgY2hhbm5lbO+8mntcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDDvvJrnn63kv6FcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDHvvJrmlrDmtarlvq7ljZpcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDPvvJrlvq7kv6Hlpb3lj4tcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDTvvJrlvq7kv6HmnIvlj4vlnIhcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDXvvJpRUeWlveWPi1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNu+8mlFR56m66Ze0XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA377ya5aSN5Yi26ZO+5o6lXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiAgICAgICAgICAgICAgZGF0YTog6buY6K6k5YiG5Lqr5pWw5o2uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLnNob3dTaGFyZVBhbmVsKHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBkZXNjOiBkZXNjLFxyXG4gICAgICAgICAgICBwaWNVcmw6IGltZ1VSTCxcclxuICAgICAgICAgICAgc2hhcmVVcmw6IHBhZ2VVUmwgIC8vIHRvZG8g5pmu6YCa5YiG5LqrXHJcbiAgICAgICAgfSwgbnVsbClcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE5a6a5L2N77yM6aaW5YWI6YCa6L+HR1BTIOWumuS9je+8jOWmguaenOWumuS9jeWksei0pe+8jOmAmui/h+aOpeWPo2dldENpdHks5Yip55SoSVDlnLDlnYDov5vooYzlrprkvY3vvIzlpoLmnpzov5jmmK/lpLHotKXvvIzpgJrov4fmj5Lku7bojrflj5blrqLmiLfnq6/lt6bkuIrop5LnmoTln47luILkv6Hmga/vvIzkvp3nhLblpLHotKXpu5jorqTnqb9jaXR5Q2Q6MzEwMDAwIOS7o+ihqOS4iua1t+W4glxyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50TG9jYXRpb25JbmZvID0gKGNhbGxiYWNrMikgPT4ge1xyXG4gICAgY29uc3QgdWkgPSBVUC5XLlVJO1xyXG4gICAgdWkuc2hvd0xvYWRpbmcoKTtcclxuICAgIGxldCBjYWxsYmFjayA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4gICAgICAgIGNhbGxiYWNrMihkYXRhKVxyXG4gICAgfVxyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYXBwLmdldEN1cnJlbnRMb2NhdGlvbkluZm8oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNtZDogXCIvXCIgKyBDT05GSUcuUkVTVC5nZXRDaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhdGg6IFwiaHR0cDovLzE3Mi4yMS4zMy41NjozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCIrQ09ORklHLlJFU1QuZ2V0Q2l0eSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBcIjJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCB0cnVlLCBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoTmF0aXZlRGF0YShjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hOYXRpdmVEYXRhKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaE5hdGl2ZURhdGEgPSAoY2FsbGJhY2spID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5blrqLmiLfnq6/kv6Hmga9cclxuICAgICAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICAgICAqIEBwYXJhbSBmYWlsXHJcbiAgICAgICAgICogQHBhcmFtIHR5cGUgMO+8muWfjuW4guS/oeaBr2NpdHlDZO+8mzHvvJrnu4/nuqzluqbvvJs177yaVXNlcklkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLmZldGNoTmF0aXZlRGF0YSgwLCAoZGF0YSA9IHt9KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICBjaXR5Q2Q6IFwiMzEwMDAwXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgY29uc3Qgc2F2ZVBpY1RvTG9jYWwgPSAoY2FudmFzLCByZXNvbHZlKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciB1aSA9IFVQLlcuVUkgfHwge307XHJcbiAgICB2YXIgcGljVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zYXZlUGljVG9Mb2NhbCh7XHJcbiAgICAgICAgICAgIHVybDogcGljVXJsICYmIHBpY1VybC5zdWJzdHIoMjIpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+aIkOWKn1xyXG4gICAgICAgICAgICAhIXJlc29sdmUgJiYgcmVzb2x2ZShcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgfSwgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgISFyZXNvbHZlICYmIHJlc29sdmUoXCJmYWlsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlVGV4dENhbnZhc2UgPSAodGV4dCwgY29sb3IsIGxvbmcgPSA2ODQsIHNob3QgPSA2MCkgPT4ge1xyXG5cclxuICAgIGxldCByZW0ycHggPSAodmFsKSA9PiB7XHJcbiAgICAgICAgdmFyIGNXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgICAgIHJldHVybiB2YWwgKiBjV2lkdGggLyA3NTBcclxuICAgIH1cclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dENhbnZhcycpO1xyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIC8v6Kit572u55Wr5L2I55qE5a+s6auYXHJcbiAgICAvLyB2YXIgYmdXaWR0aCA9IHJlbTJweChsb25nKTtcclxuICAgIC8vIHZhciBiZ0hlaWdodCA9IHJlbTJweChzaG90KTtcclxuXHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHNob3QpO1xyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbG9uZyk7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgY3R4LnJvdGF0ZSgtOTAgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgIHZhciB0ZXh0ID0gdGV4dDtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XHJcbiAgICBsZXQgZm9udFNpemUgPSBzaG90O1xyXG4gICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB3aGlsZSAoY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoID4gbG9uZykge1xyXG4gICAgICAgIGZvbnRTaXplLS07XHJcbiAgICAgICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB9XHJcbiAgICBjdHguZmlsbFRleHQodGV4dCwgLWxvbmcsIGZvbnRTaXplKTtcclxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOeUn+aIkOWbvueJh+W5tuS/neWtmOWIsOebuOWGjFxyXG4gKiBAcGFyYW0gYmd1cmwg6IOM5pmv5Zu+54mH55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVVUkwg5LqM57u056CB55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVXZEFuZEhnIOS6jOe7tOeggeeahOWuveW6plxyXG4gKiBAcGFyYW0geFdpZHRoIOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpIg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5SGVpZ2h0IOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB0ZXh0YmdVUkwg5Yqg5YWl55S75biD55qE5Zu+54mH55qEVVJMXHJcbiAqIEBwYXJhbSB4VGV4dFdpZHRoIOWKoOWFpeeUu+W4g+eahOWbvueJh+i3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5VGV4dEhlaWdodCDliqDlhaXnlLvluIPnmoTlm77niYfot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVDb252YXNBbmRTYXZlUGhvdG8gPSAoY2FudmFzT2JqLCByZXNvbHZlKSA9PiB7XHJcbiAgICBsZXQge2JndXJsLCBxcmNvZGVVUkwsIHFyY29kZVdkQW5kSGcsIHhXaWR0aCwgeUhlaWdodCwgdGV4dGJnVVJMLCB4VGV4dFdpZHRoLCB5VGV4dEhlaWdodH0gPSBjYW52YXNPYmo7XHJcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1vbkNhbnZhc1dyYXBwZXInKTtcclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk55S75biD5YaF5a65XHJcbiAgICAgKi9cclxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aFxyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLnNyYyA9IGJndXJsO1xyXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy/oqK3nva7nlavkvYjnmoTlr6zpq5hcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGltZy53aWR0aCk7XHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaW1nLmhlaWdodCk7XHJcblxyXG4gICAgICAgIC8v5Zyo55Wr5biD5LiK55Wr6IOM5pmv5ZyWXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG5cclxuICAgICAgICBpZiAoISF0ZXh0YmdVUkwpIHtcclxuICAgICAgICAgICAgbGV0IHRleHRVcmkgPSB0ZXh0YmdVUkw7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0SW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIHRleHRJbWcuc3JjID0gdGV4dFVyaTtcclxuICAgICAgICAgICAgdGV4dEltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRleHRJbWcsIHhUZXh0V2lkdGgsIHlUZXh0SGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuozntq3norzlnJbniYflpKflsI9cclxuICAgICAgICB2YXIgcXJjb2RlV2lkdGhBbmRIZWlnaHQgPSBxcmNvZGVXZEFuZEhnO1xyXG4gICAgICAgIC8v5riF6Zmk5LqM57u056CBXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB2YXIgcXJjb2RlID0gbmV3IFFSQ29kZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKSwge1xyXG4gICAgICAgICAgICB0ZXh0OiBxcmNvZGVVUkwsXHJcbiAgICAgICAgICAgIGhlaWdodDogcXJjb2RlV2lkdGhBbmRIZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoOiBxcmNvZGVXaWR0aEFuZEhlaWdodCxcclxuICAgICAgICAgICAgY29ycmVjdExldmVsOiBRUkNvZGUuQ29ycmVjdExldmVsLkxcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcXJjb2RlSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xyXG4gICAgICAgIHFyY29kZUltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8v55Wr5LqM57at56K855qE5ZyW54mHXHJcbiAgICAgICAgICAgIGxldCBxcmNvZGVEeCA9IHhXaWR0aCwgcXJjb2RlRHkgPSB5SGVpZ2h0O1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHFyY29kZUltZywgcXJjb2RlRHgsIHFyY29kZUR5KTtcclxuICAgICAgICAgICAgLy8gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICBzYXZlUGljVG9Mb2NhbChjYW52YXMsIHJlc29sdmUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdC5qcyIsImNvbnN0IGNvbmZpZyA9IHtcclxuICAgIFJFU1Q6IHtcclxuICAgICAgICBhcHBseU1jYzogXCJjb2xsZWN0aW9uQ29kZS9hcHBseU1jY1wiLCAvLzIuNC4055Sz6K+35pS25qy+56CB5o6l5Y+jXHJcbiAgICAgICAgZ2V0TWNjQ2FyZExpc3Q6IFwiY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIiwgLy8yLjQuMuWVhuaIt+aUtuasvueggeWNoeWIl+ihqOaOpeWPo1xyXG4gICAgICAgIGFwcGx5TWF0OiBcImNvbGxlY3Rpb25Db2RlL2FwcGx5TWF0XCIsIC8v55Sz6K+354mp5paZ5o6l5Y+jXHJcbiAgICAgICAgZ2V0TWNobnRBbmRBcmVhSW5mOiBcIm1jaG50L2dldE1jaG50QW5kQXJlYUluZi5zanNvblwiLCAvL+WVhuaIt+exu+Wei+WPiuWcsOWMuuWIl+ihqOafpeivolxyXG4gICAgICAgIHVwZ3JhZGVNY2M6IFwiY29sbGVjdGlvbkNvZGUvdXBncmFkZU1jY1wiLCAvLzIuNC425Y2H57qn5pS25qy+56CB5o6l5Y+jLFxyXG4gICAgICAgIGdldEFkZHJMaXN0OiBcImFkZHJlc3MvZ2V0QWRkckxpc3RcIiAsIC8vMi40LjEzIOiOt+WPluaUtui0p+WcsOWdgOWIl+ihqFxyXG4gICAgICAgIGRlbGV0ZUFkZHJlc3M6IFwiYWRkcmVzcy9kZWxldGVBZGRyZXNzXCIgLCAvLzIuNC4xMiDliKDpmaTmlLbotKflnLDlnYBcclxuICAgICAgICBlZGl0QWRkcmVzczogXCJhZGRyZXNzL2VkaXRBZGRyZXNzXCIsIC8vMi40LjExIOS/ruaUueaUtui0p+WcsOWdgCxcclxuICAgICAgICBuZXdBZGRyZXNzOiBcImFkZHJlc3MvbmV3QWRkcmVzc1wiLCAvLzIuNC4xMCDmlrDlop7mlLbotKflnLDlnYBcclxuICAgICAgICBtY2hudE9wZXIgOlwibWNobnQvbWNobnRPcGVyXCIsIC8vMi4yLjIg5bqX6ZO65L+h5oGv5pu05pawXHJcbiAgICAgICAgZ2V0TGltaXRBdEluZm86XCJtY2hudC9nZXRMaW1pdEF0SW5mb1wiLCAvL+iOt+WPluaUtuasvumZkOminVxyXG4gICAgICAgIHNldE1jY09uT2ZmOlwiY29sbGVjdGlvbkNvZGUvc2V0TWNjT25PZmZcIiwgLy/lgZzmraLlkozlkK/nlKjku5jmrL7noIHlgJ/lj6NcclxuICAgICAgICBnZXRNY2hudERldGFpbDpcIm1jaG50L21jaG50RGV0YWlsXCIsIC8vMi4yLjEg6I635Y+W5bqX6ZO66K+m5oOF6aG16Z2iXHJcbiAgICAgICAgLy8gdXBncmFkZU1jYzogXCJjb2xsZWN0aW9uQ29kZS91cGdyYWRlTWNjXCIsIC8vMi40LjbljYfnuqfmlLbmrL7noIHmjqXlj6NcclxuICAgICAgICBnZXRUb2RheVRyYW5zOlwidHJhbi9nZXRUb2RheVRyYW5zXCIsLy8yLjEuMy8v5LuK5pel6K6i5Y2V5o6l5Y+jXHJcbiAgICAgICAgZ2V0VG9kYXlJbmNvbWU6XCJ0cmFuL2dldFRvZGF5SW5jb21lXCIsLy8yLjEuMeWVhuaIt+acjeWKoemmlumhteS7iuaXpeaUtuasvuaOpeWPo35+fn5+fn5+XHJcbiAgICAgICAgZ2V0SGlzdG9yeUluY29tZTpcInRyYW4vZ2V0SGlzdG9yeUluY29tZVwiLC8vMi4xLjLljoblj7LmlLbmrL7mjqXlj6NcclxuICAgICAgICBnZXRIaXN0b3J5VHJhbnM6XCJ0cmFuL2dldEhpc3RvcnlUcmFuc1wiLC8vMi4xLjTljoblj7LorqLljZXmjqXlj6NcclxuICAgICAgICBnZXRMb2dpc3RpY3NTdDpcIm1hdGVyaWVsL2dldExvZ2lzdGljc1N0XCIsLy8yLjMuM+eJqea1geivpuaDheaOpeWPo+afpeivolxyXG4gICAgICAgIGdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW06XCJ0cmFuL2dldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW1cIiwvLzIuMS415Y2V56yU6K6i5Y2V5p+l6K+i5o6l5Y+jXHJcbiAgICAgICAgZ2V0QXVkaXRJbmZvOlwiY29sbGVjdGlvbkNvZGUvZ2V0QXVkaXRJbmZvXCIsLy8yLjQuMTTkv6HnlKjljaHljYfnuqflrqHmoLjnu5Pmnpzmn6Xor6JcclxuICAgICAgICB1cGRhdGVNY2NDYXJkOlwiY29sbGVjdGlvbkNvZGUvdXBkYXRlTWNjQ2FyZFwiLC8vMi40Ljnmm7TmjaLmlLbmrL7ljaHmjqXlj6NcclxuICAgICAgICBnZXRVcGdyYWRlU3Q6XCJtY2hudC9nZXRVcGdyYWRlU3RcIiwvL+afpeivouWVhuaIt+aYr+WQpuWNh+e6p+S/oeeUqOWNoeaUtuasvlxyXG4gICAgICAgIGdldE1jY1RyYW5zTnVtOidjb2xsZWN0aW9uQ29kZS9nZXRNY2NUcmFuc051bScsLy/ojrflj5bosIPlj5bmlK/ku5jmjqfku7bnmoRUTuWPt1xyXG4gICAgICAgIGdldE1hdGVyaWVsSW5mb0xpc3Q6XCJjb2xsZWN0aW9uQ29kZS9nZXRNYXRlcmllbEluZm9MaXN0XCIsLy8yLjQuM+eJqeaWmeS/oeaBr+WIl+ihqOaOpeWPo1xyXG4gICAgICAgIHVzZXJJbmZvOlwiL2FwcC9pbkFwcC91c2VyL2dldFwiLC8v6I635Y+W55So5oi35L+h5oGvXHJcbiAgICAgICAgaXNCbGFjazpcInNjYW4vaXNCbGFja1wiLC8vMi4xLjXmlLbpk7blkZjmmK/lkKblnKjpu5HlkI3ljZVcclxuICAgICAgICBpc0FwcGx5Olwic2Nhbi9pc0FwcGx5XCIsLy8yLjEuNOaYr+WQpuW3sue7j+eUs+ivt+e6ouWMheeggVxyXG4gICAgICAgIHNoYXJlTGluazpcInNjYW4vc2hhcmVMaW5rXCIsLy8yLjEuNueUn+aIkOe6ouWMheeggemTvuaOpVxyXG4gICAgICAgIHJlY21kUmVjb3JkOlwic2Nhbi9yZWNtZFJlY29yZFwiLC8v5o6o6I2Q5YWz57O76K6w5b2VXHJcbiAgICAgICAgZ2V0TG9naXN0aWNzTGlzdDpcIm1hdGVyaWVsL2dldExvZ2lzdGljc0xpc3RcIiwvL+iOt+WPlueJqeaWmeWOhuWPsuiuouWNlVxyXG4gICAgICAgIGdldFJld2FyZExpc3Q6XCJzY2FuL2dldFJld2FyZExpc3RcIiwvLzIuMS435p+l6K+i5pS26ZO25ZGY6LWP6YeR5piO57uG6K6w5b2VXHJcbiAgICAgICAgZ2V0UHJvdG9jb2xJbmZvOlwiY29sbGVjdGlvbkNvZGUvZ2V0UHJvdG9jb2xJbmZvXCIsLy/llYbmiLfljYfnuqfmn6Xor6LmmL7npLrljY/orq7nmoTlkI3np7DlkozljY/orq7nmoTlnLDlnYBcclxuICAgICAgICBnZXRDaXR5OlwicmVnaW9uL2dldENpdHlcIiwvL+mAmui/h0lQ5Zyw5Z2A6I635Y+W5Zyw5Z2A5a6a5L2NXHJcbiAgICAgICAgZ2V0UXJVcmw6XCJjb2xsZWN0aW9uQ29kZS9nZXRRckluZm9cIi8vMi4xLjHojrflj5bnlKjmiLfmlLbmrL7noIFVUkxcclxuICAgIH0sXHJcbiAgICBTVEFUVVNDT0RFOiB7XHJcbiAgICAgICAgU1VDQ0VTUzpcIjAwXCJcclxuICAgIH0sXHJcbiAgICBDT05TVF9EQVRBOntcclxuICAgICAgICBpbWdlU2l6ZTpcIjMwMFwiXHJcbiAgICB9LFxyXG4gICAgQ0FDSEVLRVk6e1xyXG4gICAgICAgIGdldE1jY0NhcmRMaXN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1jb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBVcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLW1jaG50L2dldFVwZ3JhZGVTdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLW1jaG50L2dldFVwZ3JhZGVTdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRNY2hudERldGFpbDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLW1jaG50L21jaG50RGV0YWlsXCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtbWNobnQvbWNobnREZXRhaWxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNBcHBseTp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLXNjYW4vaXNBcHBseVwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLXNjYW4vaXNBcHBseVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRBZGRyTGlzdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLWFkZHJlc3MvZ2V0QWRkckxpc3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1hZGRyZXNzL2dldEFkZHJMaXN0XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvY29uZmlnLmpzIiwiaW1wb3J0IEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCI7XHJcblxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5Y+q5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIOWFiOivu+e8k+WtmO+8jOWQjOatpeW+gOWQjuWPsOWPkeivt+axgu+8jOivt+axguaKpeaWh+WbnuadpeWQjuWIt+aWsOe8k+WtmOWPiumhtemdolxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlID0gKHVwZGF0ZSxyb2xsS2V5LHNlY29uZEtleSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICByb2xsS2V5LFxyXG4vLyAgICAgICAgICAgICBzZWNvbmRLZXlcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIHVwZGF0ZTogdXBkYXRlLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDkuI3mlK/mjIEgc3cgICAs5rC45LmF57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7Y2FjaGU6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVMb25nVGltZSA9IChyb2xsS2V5LCBzZWNvbmRLZXkpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICByb2xsS2V5LFxyXG4vLyAgICAgICAgICAgICBzZWNvbmRLZXlcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOWPquS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAx5YiG6ZKf5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMW1pbiA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTMwbWluID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDMwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UxaG91ciA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqNjAqMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMmhvdXIgPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMiAqIDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcblxyXG4vL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMjRkaWFuID0gKCkgPT4ge1xyXG4vL1xyXG4vLyAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4vLyAgICAgbGV0IHRlbW9ycm93ID0gbmV3IERhdGUoKTtcclxuLy8gICAgIHRlbW9ycm93LnNldEhvdXJzKDIzKTtcclxuLy8gICAgIHRlbW9ycm93LnNldE1pbnV0ZXMoNTkpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0U2Vjb25kcyg1OSk7XHJcbi8vICAgICBsZXQgdGVtID0gdGVtb3Jyb3cuZ2V0VGltZSgpO1xyXG4vLyAgICAgbGV0IHZhbGlkYXRlVGltZSA9IHRlbSAtIG5vdyArIDEwMDAgKiA2MFxyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgICAgIHZhbGlkYXRlVGltZTogdmFsaWRhdGVUaW1lLFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICB3b3JrYm9455qE562W55WlICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuLy9cclxuLy8gLyoqXHJcbi8vICAq5Li6Z2V06K+35rGC77yM5LiN5Yqg5a+GXHJcbi8vICAq5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKuWFiOivu+e8k+WtmO+8jOWQjOaXtuW+gOWQjuWPsOWPkeivt+axgu+8jOivt+axguaKpeaWh+WbnuadpeWQjuWIt+aWsOe8k+WtmOWPiumhtemdolxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgY2FjaGU6IGJvb2xlYW4sIGFzeW5jOiBib29sZWFufX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZSA9ICh1cGRhdGUpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgYnlBamF4OiBmYWxzZSwvL+WmguaenOimgeaUr+aMgXN3IOWwseS4jemcgOS9v+eUqGFqYXhcclxuLy8gICAgICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgdXBkYXRlOiB1cGRhdGVcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAzMOWIhumSn+WGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QzMG1pbiA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDMwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDHlsI/mmYLlhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MWhvdXIgPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDJob3VyID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMiAqIDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8qKlxyXG4gKiDor6XnrZbnlaXmmK/kuIDlrprml7bpl7TlhoXkuI3lkJHlkI7lj7Dor7fmsYLmlbDmja7vvIwg5aaC5p6c5Zyo6K6+5aSH5LiK5pSv5oyBc3fliJnkvb/nlKhzdyzlkKbliJnkvb/nlKggbG9jYWxTdG9yYWdlXHJcbiAqIEBwYXJhbSB0aW1lICDopoHnvJPlrZjnmoTml7bpl7Qg5Y2V5L2N5piv5q+r56eSXHJcbiAqIEByZXR1cm5zIHt7YnlBamF4OiBib29sZWFuLCBmb3JDaHNwOiBib29sZWFuLCBlbmNyeXB0OiBib29sZWFuLCBjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge3ZhbGlkYXRlVGltZTogKn19fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QgPSh0aW1lKT0+e1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBieUFqYXg6IHRydWUsXHJcbiAgICAgICAgZm9yQ2hzcDpmYWxzZSxcclxuICAgICAgICBlbmNyeXB0OmZhbHNlLFxyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgdmFsaWRhdGVUaW1lOnRpbWUsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqICDor6XnrZbnlaXmmK/kuIDlrprml7bpl7TlhoXkuI3lkJHlkI7lj7Dor7fmsYLmlbDmja7vvIzmt7vliqDnvJPlrZjlj6rlnKhsb2NhbHN0b3JhZ2XkuK1cclxuICogQHBhcmFtIHRpbWUgIOimgee8k+WtmOeahOaXtumXtCDljZXkvY3mmK/mr6vnp5JcclxuICogQHBhcmFtIHJvbGxLZXkgICDpnZ7lv4Xloasg5aaC5p6c5ZCO5pyf6KaB5Yig6Zmk6L+Z5Liq57yT5a2Y77yM6L+Z5aGr5YaZ6L+Za2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXkgIOmdnuW/heWhqyDlpoLmnpzlkI7mnJ/opoHliKDpmaTov5nkuKrnvJPlrZjvvIzov5nloavlhpnov5lrZXlcclxuICogQHJldHVybnMge3tjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge25lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiAqLCByb2xsS2V5OiAqLCBzZWNvbmRLZXk6ICp9fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjYWNoZUZpcnN0U3RvcmFnZSA9KHRpbWUscm9sbEtleSwgc2Vjb25kS2V5KT0+e1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlVGltZTogdGltZSxcclxuICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzcG9uc2VGb3JtYXR0ZXIgPSAoZGF0YSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnJlc3AsXHJcbiAgICAgICAgZGF0YTogZGF0YS5wYXJhbXMsXHJcbiAgICAgICAgbXNnOiBkYXRhLm1zZ1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDor6XnrZbnlaXmmK/lhYjor7vnvJPlrZjvvIzlkIzml7blkJHlkI7lj7Dlj5HpgIHor7fmsYLvvIzor7fmsYLlm57mnaXlkI7lkIzmraXmm7TmlrDnvJPlrZjvvIzlm57osIN1cGRhdGUg5Ye95pWw77yMXHJcbiAqIEBwYXJhbSB1cGRhdGUg5b+F5aGr5pu05paw6aG16Z2i55qE5Zue6LCD5Ye95pWwXHJcbiAqIEBwYXJhbSByb2xsS2V5ICDpnZ7lv4Xloasg6K6+572u57yT5a2Y55qEIHJvbGxrZXlcclxuICogQHBhcmFtIHNlY29uZEtleSDpnZ7lv4Xloasg6K6+572u57yT5a2Y55qEIHNlY29uZEtleVxyXG4gKiBAcmV0dXJucyB7e2NhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7YXN5bmM6IGJvb2xlYW4sIHJvbGxLZXk6ICosIHNlY29uZEtleTogKn0sIHVwZGF0ZTogKn19XHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlID0gKHVwZGF0ZSxyb2xsS2V5LHNlY29uZEtleSkgPT4ge1xyXG5cclxuICAgbGV0ICByZWZyZXNoRG9tRnVuYz0ocmVzcG9uc2UpPT57XHJcbiAgICAgICBsZXQgcmVxPXJlc3BvbnNlRm9ybWF0dGVyKHJlc3BvbnNlKVxyXG4gICAgICAgLy8g5bCG6I635Y+W55qE5pWw5o2u5ZKM57yT5a2Y5Lit55qE5pWw5o2u6L+b6KGM5a+55q+UXHJcbiAgICAgICBsZXQgZGF0YUZyb21DYWNoZSA9IHt9O1xyXG4gICAgICAgVVAuVy5VdGlsLmdldEZyb21TdG9yYWdlKHtcclxuICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgfSxmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICBpZiggISFkYXRhICl7XHJcbiAgICAgICAgICAgICAgICBkYXRhRnJvbUNhY2hlID0gZGF0YTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgIH0pXHJcbiAgICAgICBsZXQgaXNTYW1lQXRBbGwgPSBJbW11dGFibGUuaXMoSW1tdXRhYmxlLmZyb21KUyhyZXEpLEltbXV0YWJsZS5mcm9tSlMoZGF0YUZyb21DYWNoZSkpOyAvL+aVsOaNruaYr+WQpuWujOWFqOebuOWQjFxyXG4gICAgICAgaWYoICFpc1NhbWVBdEFsbCApeyAvL+aVsOaNruacieWPmOWKqFxyXG4gICAgICAgICAgICB1cGRhdGUocmVxKVxyXG4gICAgICAgfVxyXG4gICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIGVuZE9mU3luY0Z1bmM6ZmFsc2UsXHJcbiAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiByZWZyZXNoRG9tRnVuYyxcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOWIoOmZpGxvY2Fsc3RvcmFnZeS4reeahOe8k+WtmFxyXG4gKiBAcGFyYW0gcm9sbEtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2FjaGUgPSAocm9sbEtleSwgc2Vjb25kS2V5KSA9PiB7XHJcbiAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgcm9sbEtleTogcm9sbEtleSxcclxuICAgICAgICBzZWNvbmRLZXk6IHNlY29uZEtleVxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfliKDpmaTnvJPlrZjmiJDlip8nKVxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICAgICAgZnVsbDogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9jYWNoZVN0b3JhZ2UuanMiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1Byb21pc2UnLCB7ICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgKHJlc3VsdC5lID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnYpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanNcbi8vIG1vZHVsZSBpZCA9IDhlMGMxZGIwMDA4NWM4YWQyNTVhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UudHJ5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDk3M2NjOGVlZmM1OTkzMWRlOTVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBhYTk2M2I0YzI3MTQ0ZjA5NGNjYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIEQpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gYjUwZDgyNDU2ZTU0NWRjYzNkZDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgYXJncywgdGhhdCkge1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qc1xuLy8gbW9kdWxlIGlkID0gYjU4MGI5NGIxOTU4NDJjYmYyYjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIGlzTm9kZSA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChoZWFkKSBub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChpc05vZGUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgU2FmYXJpIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMzOVxuICB9IGVsc2UgaWYgKE9ic2VydmVyICYmICEoZ2xvYmFsLm5hdmlnYXRvciAmJiBnbG9iYWwubmF2aWdhdG9yLnN0YW5kYWxvbmUpKSB7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWU7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICAvLyBQcm9taXNlLnJlc29sdmUgd2l0aG91dCBhbiBhcmd1bWVudCB0aHJvd3MgYW4gZXJyb3IgaW4gTEcgV2ViT1MgMlxuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZiAoIWhlYWQpIHtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBiZGUwZjU3ZTliNTc5Zjk0M2Y4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG4vLyAyNS40LjEuNSBOZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcblxuZnVuY3Rpb24gUHJvbWlzZUNhcGFiaWxpdHkoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gYzFiOTRlM2U5NWVkNDM1YWY1NDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS1maW5hbGx5XG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnUHJvbWlzZScsIHsgJ2ZpbmFsbHknOiBmdW5jdGlvbiAob25GaW5hbGx5KSB7XG4gIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIGNvcmUuUHJvbWlzZSB8fCBnbG9iYWwuUHJvbWlzZSk7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIG9uRmluYWxseSA9PSAnZnVuY3Rpb24nO1xuICByZXR1cm4gdGhpcy50aGVuKFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHg7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHksXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9KTtcbiAgICB9IDogb25GaW5hbGx5XG4gICk7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qc1xuLy8gbW9kdWxlIGlkID0gYzJlMzViYmZmODMzMDk1OTQzYzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGU6IGZhbHNlLCB2OiBleGVjKCkgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IGU6IHRydWUsIHY6IGUgfTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSBjYjc4Mzc1Mjk0NTQyYzI0YzViYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IGQxODEwYWU1MzMyZTM2ZmZhM2M0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHtzZXREZWZhdWx0QWRkciwgYXBwbHlNYXRBUEl9IGZyb20gXCIuLi9BcHBseUNvbW1kaXR5L0FwcGx5Q29tbWRpdHlBY3Rpb25zXCI7XHJcbmltcG9ydCBBcHBseUNvbW1kaXR5IGZyb20gXCIuLi9BcHBseUNvbW1kaXR5L0FwcGx5Q29tbWRpdHlcIlxyXG5pbXBvcnQge2JlZm9yZUVudGVyUm91dGVyLCBnZXRDdXJyZW50TG9jYXRpb25JbmZvLCB0b2FzdH0gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RcIjtcclxuaW1wb3J0IHtVUERBVEVfU1RPUkVfU1RBVEV9IGZyb20gXCIuLi8uLi9zdG9yZS9hY3Rpb25cIjtcclxuaW1wb3J0IGNvbW1kaXR5IGZyb20gXCIuLi8uLi9hc3NldHMvaW1ncy9jb21tZGl0eTIucG5nXCJcclxuaW1wb3J0IHtzaGFybGlua30gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RBUElcIjtcclxuXHJcblxyXG5jbGFzcyBBcHBseUNvbW1kaXR5Q29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KVxyXG4gICAgICAgIHRoaXMudW5ibG9jayA9IG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCB7c3RvcmVBZGRyLCBpc0FncmVlLCBoaXN0b3J5LHJlZFVybFN0cn0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBsZXQga2V5ID0gbnVsbCxzZWxmPXRoaXM7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoc3RvcmVBZGRyKS5mb3JFYWNoKChuKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdG9yZUFkZHJbbl0ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGtleSA9IG47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCEha2V5KSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi5oKo55qE5Zyw5Z2A5b2T5Lit57y65bCR5b+F6KaB5pWw5o2uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghaXNBZ3JlZSkge1xyXG4gICAgICAgICAgICB0b2FzdChcIuWmguaenOaCqOW3sumYheivu+OAiuaUtuasvueggeacjeWKoeS9v+eUqOadoeasvuOAi+W5tuWQjOaEj++8jOivt+WLvumAieWug1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGdldEN1cnJlbnRMb2NhdGlvbkluZm8oKGNpdHkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghIXJlZFVybFN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXRlcmllbExpc3QgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmllbFR5cGU6IFwiMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IFwiMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmllbFR5cGU6IFwiMTBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IFwiMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5TWF0QVBJKGhpc3RvcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3RvcmVBZGRyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21hdGVyaWVsTGlzdDogSlNPTi5zdHJpbmdpZnkobWF0ZXJpZWxMaXN0KX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2l0eU5tOiBjaXR5LmNpdHlDZH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVkVXJsOiBKU09OLnN0cmluZ2lmeSh7cmVkVXJsOiByZWRVcmxTdHJ9KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuiOt+WPlue6ouWMheeggeWcsOWdgOWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGJlZm9yZUVudGVyUm91dGVyKCfnlLPor7fmlLbmrL7noIHnianmlpknKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7pu5jorqTlnLDlnYBcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZXREZWZhdWx0QWRkcigpO1xyXG5cclxuICAgICAgICAvL+aOp+WItui3r+eUsVxyXG4gICAgICAgIHRoaXMudW5ibG9jayA9IHRoaXMucHJvcHMuaGlzdG9yeS5ibG9jaygobG9jYXRpb24sIGFjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09IFwiUE9QXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuWwmuacqueUs+ivt+aUtuasvueggei0tOe6uOWSjOaMgueJjHzov5jmnKrnlLPor7fmlLbmrL7noIHotLTnurjvvIzmmK/lkKbnu6fnu63nlLPor7fmlLbmrL7noIHotLTnurjvvIznlKjkuo7lupfpk7rlhoXmlLbmrL7vvJ98L3Mvd2wveHZzaC9pbmRleC5odG1sIy9hcHBseUNvbW1kaXR5T2ZSZWRiYWcvc3RvcmVJbmZvXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW57qi5YyF56CB5Zyw5Z2AXHJcbiAgICAgICAgc2hhcmxpbmsoKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMudW5ibG9jayAmJiB0aGlzLnVuYmxvY2soKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9wcyk7XHJcbiAgICAgICAgcmV0dXJuIDxBcHBseUNvbW1kaXR5IHsuLi50aGlzLnByb3BzfSBoYW5kbGVDbGljaz17dGhpcy5oYW5kbGVDbGlja30vPjtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwc3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzdG9yZUFkZHIgICDpu5jorqTlnLDlnYBcclxuICAgICAqIGlzQWdyZWUgICAgIOaYr+WQpuWQjOaEj+WNj+iurlxyXG4gICAgICogcGljdHVyZSAgICAg5aS05Zu+XHJcbiAgICAgKiBpbnRyb2R1Y2UgICDnroDku4tcclxuICAgICAqL1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZWRVcmxTdHI6IHN0YXRlLmdldEluKFtcInJlZFVybFN0clwiXSksXHJcbiAgICAgICAgc3RvcmVBZGRyOiBzdGF0ZS5nZXRJbihbXCJzdG9yZUFkZHJcIl0pLnRvSlMoKSxcclxuICAgICAgICBpc0FncmVlOiBzdGF0ZS5nZXRJbihbXCJpc0FncmVlUmVjZWl2YWJsZXNDb2RlQWdyZWVtZW50XCJdKSxcclxuICAgICAgICBwaWN0dXJlOiBjb21tZGl0eSxcclxuICAgICAgICBpbnRyb2R1Y2U6IFwi5o6o6I2Q5L2/55So5pS25qy+5ZKM57qi5YyF56CB54mp5paZ77yM5pS25qy+5a6J5YWo5pa55L6/77yMPGJyLz7otZrlj5bnuqLljIXotY/ph5HvvIzoh6rkuLvlhY3otLnlvIDpgJrmm7Tkvr/mjbfvvIzpqazkuIrkvZPpqozlkKd+XCJcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwRGlzcGF0aFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcclxuICAgIC8qKlxyXG4gICAgICog5pu05pawcmVkdXgg5Lit55qEaXNBZ3JlZVJlY2VpdmFibGVzQ29kZUFncmVlbWVudFxyXG4gICAgICogQHBhcmFtIHZhbCDlkIzmhI/ljY/orq7kuI7lkKZcclxuICAgICAqL1xyXG4gICAgbGV0IGNoYW5nZUFwcGx5Q29tbWRpdHlBZ3JlZW1lbnQgPSAodmFsKSA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtpc0FncmVlUmVjZWl2YWJsZXNDb2RlQWdyZWVtZW50OiB2YWx9KSlcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2hhbmdlQXBwbHlDb21tZGl0eUFncmVlbWVudDogY2hhbmdlQXBwbHlDb21tZGl0eUFncmVlbWVudCxcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcHN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0aFRvUHJvcHMpKEFwcGx5Q29tbWRpdHlDb250YWluZXIpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0FwcGx5Q29tbWRpdHlPZlJlZEJhZy9BcHBseUNvbW1kaXR5Q29udGFpbmVyLmpzIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG5hdmlnYXRvciA9IGdsb2JhbC5uYXZpZ2F0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgfHwgJyc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdXNlci1hZ2VudC5qc1xuLy8gbW9kdWxlIGlkID0gZWM2Y2JlMzE3Yjk4NTBiMDVjZTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IGVmNTFkNDk4OWYzMDQ0YjJlYjMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzXG4vLyBtb2R1bGUgaWQgPSBmMGRiYzEwYzY4ZGQ4MTQwMTRlN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi9fdXNlci1hZ2VudCcpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4IHx8ICcnO1xudmFyICRQcm9taXNlID0gZ2xvYmFsW1BST01JU0VdO1xudmFyIGlzTm9kZSA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xudmFyIGVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIEludGVybmFsLCBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIE93blByb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlLnJlc29sdmUoMSk7XG4gICAgdmFyIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhlbXB0eSwgZW1wdHkpO1xuICAgIH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZVxuICAgICAgLy8gdjggNi42IChOb2RlIDEwIGFuZCBDaHJvbWUgNjYpIGhhdmUgYSBidWcgd2l0aCByZXNvbHZpbmcgY3VzdG9tIHRoZW5hYmxlc1xuICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9ODMwNTY1XG4gICAgICAvLyB3ZSBjYW4ndCBkZXRlY3QgaXQgc3luY2hyb25vdXNseSwgc28ganVzdCBjaGVjayB2ZXJzaW9uc1xuICAgICAgJiYgdjguaW5kZXhPZignNi42JykgIT09IDBcbiAgICAgICYmIHVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUvNjYnKSA9PT0gLTE7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbiAocHJvbWlzZSwgaXNSZWplY3QpIHtcbiAgaWYgKHByb21pc2UuX24pIHJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgb2sgPSBwcm9taXNlLl9zID09IDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbiAocmVhY3Rpb24pIHtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW4sIGV4aXRlZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgaWYgKHByb21pc2UuX2ggPT0gMikgb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhbmRsZXIgPT09IHRydWUpIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTsgLy8gbWF5IHRocm93XG4gICAgICAgICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgICAgICAgIGRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgICAgIGV4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2UpIHtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZG9tYWluICYmICFleGl0ZWQpIGRvbWFpbi5leGl0KCk7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSBydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpIG9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgdW5oYW5kbGVkID0gaXNVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgdmFyIHJlc3VsdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pIHtcbiAgICAgICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmICh1bmhhbmRsZWQgJiYgcmVzdWx0LmUpIHRocm93IHJlc3VsdC52O1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICByZXR1cm4gcHJvbWlzZS5faCAhPT0gMSAmJiAocHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jKS5sZW5ndGggPT09IDA7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpIHtcbiAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3YgfSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYgKCFwcm9taXNlLl9hKSBwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgdmFyIHRoZW47XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmICh0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0geyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgJHJlamVjdC5jYWxsKHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9hKSB0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX3MpIG5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbiAgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgICByZXR1cm4gQyA9PT0gJFByb21pc2UgfHwgQyA9PT0gV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFByb21pc2U6ICRQcm9taXNlIH0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICB2YXIgJCRyZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoTElCUkFSWSAmJiB0aGlzID09PSBXcmFwcGVyID8gJFByb21pc2UgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyICRpbmRleCA9IGluZGV4Kys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSBmYTk4N2Q4MTFlNGViMmQ0M2Q5Y1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiXSwic291cmNlUm9vdCI6IiJ9