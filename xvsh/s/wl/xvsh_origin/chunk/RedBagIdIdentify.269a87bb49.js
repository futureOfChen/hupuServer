webpackJsonp([15],{

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

/***/ "26644768ce323071e7e6":
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

var _request = __webpack_require__("76fb50331ac78bf18670");

var _button = __webpack_require__("8d56c7db4300680162d8");

var _button2 = _interopRequireDefault(_button);

var _inputItem = __webpack_require__("46e3f6ce771e1a6ba82e");

var _inputItem2 = _interopRequireDefault(_inputItem);

__webpack_require__("d1d9a28c6b1520038ff6");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedBagIdIdentify = function (_React$Component) {
    (0, _inherits3.default)(RedBagIdIdentify, _React$Component);

    function RedBagIdIdentify() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, RedBagIdIdentify);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RedBagIdIdentify.__proto__ || (0, _getPrototypeOf2.default)(RedBagIdIdentify)).call.apply(_ref, [this].concat(args))), _this), _this.clickError = function (msg) {
            // console.log('aa')
            (0, _request.toast)(msg);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(RedBagIdIdentify, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                name = _props.name,
                ID = _props.ID,
                phone = _props.phone,
                changeRedBagphone = _props.changeRedBagphone,
                handleClick = _props.handleClick;

            var error = false;
            if (!!phone && !_request.regPhone.test(phone)) {
                error = true;
            } else {
                error = false;
            }

            return _react2.default.createElement(
                "div",
                { id: "rbii" },
                _react2.default.createElement(
                    "div",
                    { id: "contentWarp" },
                    _react2.default.createElement(
                        "div",
                        { className: "pad32" },
                        _react2.default.createElement(
                            "span",
                            { className: "inputRowIntroduce" },
                            "\u7528\u6237\u8EAB\u4EFD\u4FE1\u606F"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "inputRow" },
                            _react2.default.createElement(
                                "span",
                                { className: "rowLabel" },
                                "\u59D3\u540D"
                            ),
                            _react2.default.createElement(
                                "span",
                                { className: "rowInfo" },
                                name
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "inputRow mt32" },
                            _react2.default.createElement(
                                "span",
                                { className: "rowLabel" },
                                "\u8BC1\u4EF6\u53F7"
                            ),
                            _react2.default.createElement(
                                "span",
                                { className: "rowInfo" },
                                ID
                            )
                        ),
                        _react2.default.createElement(
                            "span",
                            { className: "inputRowIntroduce mt59" },
                            "\u7528\u6237\u7533\u8BF7\u606F"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "recommend inputWap" },
                            _react2.default.createElement(
                                _inputItem2.default,
                                { clear: true, placeholder: "\u63A8\u8350\u4EBA\u624B\u673A\u53F7", error: error,
                                    value: phone, onChange: changeRedBagphone,
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
                    { className: "submit-warp-button " },
                    _react2.default.createElement(
                        _button2.default,
                        { type: "primary", onClick: handleClick },
                        "\u4E0B\u4E00\u6B65"
                    )
                )
            );
        }
    }]);
    return RedBagIdIdentify;
}(_react2.default.Component);

exports.default = RedBagIdIdentify;

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

/***/ "6048f20010c8257cf139":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.recmdRedCode = recmdRedCode;

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

function recmdRedCode(history, phone, type) {
    (0, _requestAPI.recmdRecord)(phone).then(function () {
        if (type == "code") {
            history.push({ pathname: '/redBagCode/code' });
        } else {
            history.push({ pathname: "/applyCommdityOfRedBagSingle/storeInfo" });
        }
    });
}

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

/***/ "d1d9a28c6b1520038ff6":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"rbii":"rbii","pad32":"pad32","inputRowIntroduce":"inputRowIntroduce","mt59":"mt59","inputRow":"inputRow","rowLabel":"rowLabel","rowInfo":"rowInfo","mt32":"mt32","recommend":"recommend"};

/***/ }),

/***/ "e1818af41802a8c964fc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__("7474e09206d6df50164e");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = __webpack_require__("fafba3d44052ea8dcdf4");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _RedBagIdIdentifyActions = __webpack_require__("6048f20010c8257cf139");

var _RedBagIdIdentify = __webpack_require__("26644768ce323071e7e6");

var _RedBagIdIdentify2 = _interopRequireDefault(_RedBagIdIdentify);

var _request = __webpack_require__("76fb50331ac78bf18670");

var _action = __webpack_require__("5d4604b08304c597d074");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedBagIdIdentifyContainers = function (_Component) {
    (0, _inherits3.default)(RedBagIdIdentifyContainers, _Component);

    function RedBagIdIdentifyContainers(props, context) {
        (0, _classCallCheck3.default)(this, RedBagIdIdentifyContainers);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RedBagIdIdentifyContainers.__proto__ || (0, _getPrototypeOf2.default)(RedBagIdIdentifyContainers)).call(this, props, context));

        _this.handleClick = function () {

            var search = (0, _request.getSearchParam)(_this.props.location.search);
            var _this$props = _this.props,
                phone = _this$props.phone,
                history = _this$props.history;


            if (!!phone && !_request.regPhone.test(phone)) {
                (0, _request.toast)("请输入合法的手机号");
                return;
            }
            /**
             * 申请红包码
             */
            (0, _RedBagIdIdentifyActions.recmdRedCode)(history, phone, search.type);
        };

        _this.getMaskName = function (str) {
            var arr = [].concat((0, _toConsumableArray3.default)(str));
            arr[0] = "*";
            return arr.join("");
        };

        _this.state = {
            name: "", //用户名
            ID: "" //身份证号
        };
        return _this;
    }

    /**
     * 将字符串的第一字符加*
     * @param str 要加*的字符串
     * @returns {string}
     */


    (0, _createClass3.default)(RedBagIdIdentifyContainers, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            (0, _request.beforeEnterRouter)("申请商户红包码");
            (0, _request.getUserDetailInfo)(function (data) {
                var realName = _this2.getMaskName(data.realName);
                _this2.setState({
                    name: realName,
                    ID: data.maskCertId
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_RedBagIdIdentify2.default, (0, _extends3.default)({ handleClick: this.handleClick }, this.state, this.props));
        }
    }]);
    return RedBagIdIdentifyContainers;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {
    return {
        phone: state.getIn(["recommendPhone"])
    };
};

var mapDispathToProps = function mapDispathToProps(dispatch) {

    /**
     * 更改redux中的推荐人手机号的值
     * @param value 用户输入的值
     */
    var changeRedBagphone = function changeRedBagphone(value) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ recommendPhone: value }));
    };

    return {
        changeRedBagphone: changeRedBagphone
    };
};
exports.default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(RedBagIdIdentifyContainers);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZWRCYWdJZElkZW50aWZ5L1JlZEJhZ0lkSWRlbnRpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZWRCYWdJZElkZW50aWZ5L1JlZEJhZ0lkSWRlbnRpZnlBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZWRCYWdJZElkZW50aWZ5L1JlZEJhZ0lkSWRlbnRpZnkuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZWRCYWdJZElkZW50aWZ5L1JlZEJhZ0lkSWRlbnRpZnlDb250YWluZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdXNlci1hZ2VudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIl0sIm5hbWVzIjpbInJlY21kUmVjb3JkIiwic2hhcmxpbmsiLCJpc0JsYWNrIiwiaXNBcHBseSIsImFwcGx5TWNjIiwiZ2V0Q2FyZGxpc3QiLCJnZXRBZGRyTGlzdCIsImFwcGx5TWF0IiwiZ2V0UXJVcmxSZXN0IiwiZ2V0TWNobnRBbmRBcmVhSW5mIiwiZ2V0TWNobnREZXRhaWwiLCJ1cGdyYWRlTWNjIiwiZ2V0UHJvdG9jb2xJbmZvIiwiZ2V0SGlzdG9yeUluY29tZSIsImdldEhpc3RvcnlUcmFucyIsImdldFRvZGF5SW5jb21lIiwiZ2V0VG9kYXlUcmFucyIsImdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0iLCJnZXRMb2dpc3RpY3NTdCIsImdldFVwZ3JhZGVTdCIsImdldExvZ2lzdGljc0xpc3QiLCJnZXRBdWRpdEluZm8iLCJnZXRMaW1pdEF0SW5mbyIsIm1jaG50T3BlciIsImRlbGV0ZUFkZHJlc3MiLCJ1cGRhdGVNY2NDYXJkIiwibmV3QWRkcmVzcyIsImVkaXRBZGRyZXNzIiwic2V0TWNjT25PZmYiLCJnZXRNY2NUcmFuc051bSIsInBob25lIiwidW5kZWZpbmVkIiwicmVjbWRNb2JpbGUiLCJVdGlsIiwiYmFzZTY0RW5jb2RlIiwiQ09ORklHIiwiUkVTVCIsInRoZW4iLCJyZXNwb25zZSIsInN0YXR1c0NvZGUiLCJTVEFUVVNDT0RFIiwiU1VDQ0VTUyIsInJvbGxLZXkiLCJDQUNIRUtFWSIsInNlY29uZEtleSIsImZ1bGwiLCJyZXNvbHZlIiwic2hhcmVMaW5rIiwicmVkVXJsU3RyIiwiZGF0YSIsImlkZW50aWZpZXIiLCJuZXh0U3RhdGUiLCJzdG9yZSIsImRpc3BhdGNoIiwidXBkYXRlIiwidXBkYXRlRnVuYyIsInJlc3AiLCJibGFja1N0IiwiY29uc29sZSIsImxvZyIsImNhY2hlUGFyYW0iLCJhcHBseVN0IiwicGFyYW0iLCJyZWZlcmVlVGVsIiwidmlydHVhbENhcmRObyIsImFjY05tIiwiY2l0eUNkIiwiY29tb21QYXJhbSIsImdldE1jY0NhcmRMaXN0IiwiY2FyZExpc3QiLCJsZW5ndGgiLCJkZWZhbHV0Q2FyZCIsImJhbmsiLCJjYXJkVHlwZSIsImZ1bmN0aW9uQml0bWFwIiwiaWNvblJlbFVybCIsImlzU3VwcG9ydCIsInBhbiIsInJhbmsiLCJzZWxlY3RlZCIsImZvckVhY2giLCJpdGVtIiwiayIsInN0b3JlU3RhdGUiLCJzdG9yZVJlY2VpdmVDYXJkT2JqIiwic3RhdGUiLCJhZGRyZXNzTGlzdCIsInJlc3VsdCIsIm1hdGVyaWFsTGlzdCIsImRlbGl2Tm0iLCJhZGRBbGwiLCJkZWxpdlBob25lIiwicHJvdmluY2VJZCIsImNpdHlJZCIsImFyZWFJZCIsImFkZHJlc3NJbmZvIiwiaWQiLCJjaXR5Tm0iLCJyZWRVcmwiLCJnZXRRclVybCIsIm1jaG50RGV0YWlsIiwicXJVcmwiLCJxck51bSIsImFyZWEiLCJtZXJjaGFudFRwIiwiYXJlYUFyciIsInByb3ZpbmNlIiwib25lIiwicHJvSWQiLCJwcm9ObSIsInR3byIsImNpdHkiLCJ0aHJlZSIsInZhbHVlIiwiY2hpbGRyZW4iLCJwdXNoIiwiYXJlYU5tIiwibWVyY2hhbnRUcEFyciIsIm1lclR5cGUxIiwibWVyY2hhbnRUcENkIiwibWVyY2hhbnRUcE5tIiwibWVyVHlwZTIiLCJtY2hudEFuZEFyZWFJbmYiLCJzdG9yZU5tIiwiU3RvcmVUcCIsInByb3ZDZCIsImNvdXR5Q2QiLCJhZGRyIiwiY2VydGlmUGljMSIsImNlcnRpZlBpYzIiLCJjZXJ0aWZQaWMzIiwibGljZW5zZVBpYyIsInNob3BQaWMxIiwic2hvcFBpYzIiLCJhdXhQcm92TWF0MSIsImF1eFByb3ZNYXQyIiwic2hvcExvZ29QaWMiLCJVcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdCIsInJlcyIsImhpc3RvcnlJbmNvbWVPYmoiLCJvcmlnaW5MaXN0RGF0YSIsImdldFN0YXRlIiwiZ2V0SW4iLCJ0b0pTIiwibmV3TGlzdCIsInRyYW5zSW5mbyIsImhpc3RvcnlPcmRlckxpc3QiLCJjb25jYXQiLCJ0b2RheUluY29tZU9iaiIsInRvZGF5T3JkZXJMaXN0IiwibmV3T2JqIiwiZGVsaXZlcnlNc2ciLCJtYXREZWxpdlN0YXR1cyIsImxpbWl0SW5mbyIsImlzVXNlTWNjIiwibWNjVHJhbnNOdW0iLCJ0cmFuc051bSIsIlJlZEJhZ0lkSWRlbnRpZnkiLCJjbGlja0Vycm9yIiwibXNnIiwicHJvcHMiLCJuYW1lIiwiSUQiLCJjaGFuZ2VSZWRCYWdwaG9uZSIsImhhbmRsZUNsaWNrIiwiZXJyb3IiLCJyZWdQaG9uZSIsInRlc3QiLCJiaW5kIiwiUmVhY3QiLCJDb21wb25lbnQiLCJyZWNtZFJlZENvZGUiLCJoaXN0b3J5IiwidHlwZSIsInBhdGhuYW1lIiwicmVxdWVzdCIsInNldFhpYW9XZWlQYXkiLCJ3aW5kb3ciLCJVUCIsIlciLCJBcHAiLCJFbnYiLCJyZWdQYXlOdW0iLCJ2ZXJzaW9uIiwic291cmNlIiwiYmFzZVVybCIsImJhc2VVcmwyIiwiYmFzZVVybDMiLCJsb2NhdGlvbiIsImhvc3RuYW1lIiwiaW5kZXhPZiIsInByb3RvY29sIiwiZ2V0U2VydlVybCIsInVybCIsInNlcnZlclVybCIsInVzZXJJbmZvIiwic3BsaXQiLCJnZXRDaXR5IiwicmVzcG9uc2VGb3JtYXR0ZXIiLCJwYXJhbXMiLCJkZWxldGVTbGFzaCIsImhvc3QiLCJyZXBsYWNlIiwiYWRkU2xhc2giLCJwYXRoIiwic2VwYXJhdGVQYXJhbXMiLCJwYXJhbXNMaW5lIiwia2V5IiwiY29uZmlnIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJmaW5hbFVybCIsInJlamVjdCIsIm9wdGlvbnMiLCJzdWNjZXNzIiwiRXJyb3IiLCJkYXRhVHlwZSIsIiQiLCJhamF4IiwiZ2V0IiwicGFyYW1BbGwiLCJmb3JDaHNwIiwiZW5jcnlwdCIsImNhY2hlIiwiYnlBamF4IiwicG9zdCIsInB1dCIsImRlbCIsImdldFNlYXJjaFBhcmFtIiwic2VhcmNoIiwic3RyIiwic2xpY2UiLCJhcnJheSIsIm9iaiIsInN1YyIsImVyciIsImFwcCIsInNldFhpYW9XZWlBdWRpbyIsImdldFhpYW9XZWlBdWRpbyIsInRvYXN0IiwibXMiLCJUb2FzdCIsImluZm8iLCJiZWZvcmVFbnRlclJvdXRlciIsInRpdGxlIiwicmlnaHRCYXIiLCJyaWdodENhbGxiYWNrIiwicmlnaHRCYXJJbWciLCJkb2N1bWVudCIsIm9uUGx1Z2luUmVhZHkiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJzZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24iLCJtY2NTdGF0ZUNoYW5nZWQiLCJzZW5kUXJDb2RlIiwiZmFpbCIsInNjYW5RUkNvZGUiLCJjbG9zZVdlYlZpZXciLCJ2ZXJpZnlQYXlQd2QiLCJjcmVhdGVXZWJWaWV3IiwiaXNGaW5pc2giLCJnZXRVc2VyRGV0YWlsSW5mbyIsInNhdmVRY29kZSIsImNhbnZhcyIsInVpIiwiVUkiLCJwaWNVcmwiLCJ0b0RhdGFVUkwiLCJsb2dFdmVudCIsInNhdmVQaWNUb0xvY2FsIiwic3Vic3RyIiwic2hvd1RvYXN0V2l0aFBpYyIsInNob3dBbGVydCIsImVudiIsImlzSU9TIiwib3BlbkJyb3dzZXIiLCJzaG93VG9hc3QiLCJzaGFyZSIsImRlc2MiLCJpbWdVUkwiLCJwYWdlVVJsIiwic2hvd1NoYXJlUGFuZWwiLCJzaGFyZVVybCIsImdldEN1cnJlbnRMb2NhdGlvbkluZm8iLCJjYWxsYmFjazIiLCJzaG93TG9hZGluZyIsImNhbGxiYWNrIiwiZGlzbWlzcyIsInNlbmRNZXNzYWdlIiwiY21kIiwiZmV0Y2hOYXRpdmVEYXRhIiwieGhyIiwiY3JlYXRlVGV4dENhbnZhc2UiLCJ0ZXh0IiwiY29sb3IiLCJsb25nIiwic2hvdCIsInJlbTJweCIsInZhbCIsImNXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0Iiwic2V0QXR0cmlidXRlIiwid2lkdGgiLCJyb3RhdGUiLCJNYXRoIiwiUEkiLCJmaWxsU3R5bGUiLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsImZvbnQiLCJtZWFzdXJlVGV4dCIsImZpbGxUZXh0IiwiY3JlYXRlQ29udmFzQW5kU2F2ZVBob3RvIiwiY2FudmFzT2JqIiwiYmd1cmwiLCJxcmNvZGVVUkwiLCJxcmNvZGVXZEFuZEhnIiwieFdpZHRoIiwieUhlaWdodCIsInRleHRiZ1VSTCIsInhUZXh0V2lkdGgiLCJ5VGV4dEhlaWdodCIsImltZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwiaGVpZ2h0IiwiZHJhd0ltYWdlIiwidGV4dFVyaSIsInRleHRJbWciLCJxcmNvZGVXaWR0aEFuZEhlaWdodCIsImlubmVySFRNTCIsInFyY29kZSIsIlFSQ29kZSIsImNvcnJlY3RMZXZlbCIsIkNvcnJlY3RMZXZlbCIsIkwiLCJxcmNvZGVJbWciLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInFyY29kZUR4IiwicXJjb2RlRHkiLCJnZXRNYXRlcmllbEluZm9MaXN0IiwiZ2V0UmV3YXJkTGlzdCIsIkNPTlNUX0RBVEEiLCJpbWdlU2l6ZSIsImNhY2hlRmlyc3QiLCJ0aW1lIiwic3RvcmFnZSIsInZhbGlkYXRlVGltZSIsImNhY2hlRmlyc3RTdG9yYWdlIiwibmVlZFN3Iiwic3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlIiwicmVmcmVzaERvbUZ1bmMiLCJyZXEiLCJkYXRhRnJvbUNhY2hlIiwiZ2V0RnJvbVN0b3JhZ2UiLCJyZW1vdmVTdG9yYWdlIiwiaXNTYW1lQXRBbGwiLCJJbW11dGFibGUiLCJpcyIsImZyb21KUyIsImFzeW5jIiwiZW5kT2ZTeW5jRnVuYyIsInJlbW92ZUNhY2hlIiwiUmVkQmFnSWRJZGVudGlmeUNvbnRhaW5lcnMiLCJjb250ZXh0IiwiZ2V0TWFza05hbWUiLCJhcnIiLCJqb2luIiwicmVhbE5hbWUiLCJzZXRTdGF0ZSIsIm1hc2tDZXJ0SWQiLCJtYXBzdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRoVG9Qcm9wcyIsInJlY29tbWVuZFBob25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQVdnQkEsVyxHQUFBQSxXO1FBeUJBQyxRLEdBQUFBLFE7UUFpQkFDLE8sR0FBQUEsTztRQXVCQUMsTyxHQUFBQSxPO1FBb0JBQyxRLEdBQUFBLFE7UUEwQkFDLFcsR0FBQUEsVztRQWdEQUMsVyxHQUFBQSxXO1FBZ0NBQyxRLEdBQUFBLFE7UUFvQkFDLFksR0FBQUEsWTtRQW1CQUMsa0IsR0FBQUEsa0I7UUFtSEFDLGMsR0FBQUEsYztRQWdCQUMsVSxHQUFBQSxVO1FBZ0NBQyxlLEdBQUFBLGU7UUFlQUMsZ0IsR0FBQUEsZ0I7UUFlQUMsZSxHQUFBQSxlO1FBaUJBQyxjLEdBQUFBLGM7UUFlQUMsYSxHQUFBQSxhO1FBZ0JBQyx5QixHQUFBQSx5QjtRQU1BQyxjLEdBQUFBLGM7UUF1QkFDLFksR0FBQUEsWTtRQVdBQyxnQixHQUFBQSxnQjtRQVlBQyxZLEdBQUFBLFk7UUFZQUMsYyxHQUFBQSxjO1FBYUFDLFMsR0FBQUEsUztRQVlBQyxhLEdBQUFBLGE7UUFnQkFDLGEsR0FBQUEsYTtRQWVBQyxVLEdBQUFBLFU7UUFhQUMsVyxHQUFBQSxXO1FBZUFDLFcsR0FBQUEsVztRQVlBQyxjLEdBQUFBLGM7O0FBbG9CaEI7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFJTyxTQUFTN0IsV0FBVCxDQUFxQjhCLEtBQXJCLEVBQTRCO0FBQy9CLFFBQUlBLFNBQVNDLFNBQWIsRUFBd0I7QUFDcEJELGdCQUFRLEVBQVI7QUFDSDtBQUNELFFBQUlFLGNBQWNDLGNB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QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDTyxJQUFNTSxvQkFBTSxTQUFO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QixvQkFBb0I7QUFDcEI7QUFDQSx1QkFBdUIsbUJBQU8sQ0FBQyxzQkFBaUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBEQUEwRCxvQkFBb0I7QUFDOUUsbUJBQU8sQ0FBQyxzQkFBc0I7QUFDOUIsbUJBQU8sQ0FBQyxzQkFBZ0I7QUFDeEIsVUFBVSxtQkFBTyxDQUFDLHNCQUFTOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxnREFBZ0QsbUJBQU8sQ0FBQyxzQkFBZ0I7QUFDeEU7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6ImNodW5rL1JlZEJhZ0lkSWRlbnRpZnkuMjY5YTg3YmI0OS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y29tb21QYXJhbSwgZ2V0LCBwb3N0LCBVdGlsfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7fSBmcm9tIFwiLi9jYWNoZVN0b3JhZ2VcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gXCIuLi8uLi9zdG9yZS9zdG9yZVwiO1xyXG5pbXBvcnQge1VQREFURV9TVE9SRV9TVEFURX0gZnJvbSBcIi4uLy4uL3N0b3JlL2FjdGlvblwiO1xyXG5pbXBvcnQge2NhY2hlRmlyc3QsY2FjaGVGaXJzdFN0b3JhZ2Usc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlLHJlbW92ZUNhY2hlfSBmcm9tIFwiLi9jYWNoZVN0b3JhZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiDnlLPor7fnuqLljIXnoIHnmoTor7fmsYJcclxuICogQHBhcmFtIHBob25lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVjbWRSZWNvcmQocGhvbmUpIHtcclxuICAgIGlmIChwaG9uZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBwaG9uZSA9IFwiXCJcclxuICAgIH1cclxuICAgIGxldCByZWNtZE1vYmlsZSA9IFV0aWwuYmFzZTY0RW5jb2RlKHBob25lKVxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QucmVjbWRSZWNvcmQsIHtyZWNtZE1vYmlsZX0pLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpueUs+ivt+e6ouWMheeggeaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXlcclxuICAgICAgICAgICAgfSwoKT0+e30sKCk9PntcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDor7fmsYLnuqLljIXlkJfov57mjqVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFybGluaygpIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnNoYXJlTGluaywge30pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICBsZXQgcmVkVXJsU3RyPSBcImh0dHBzOi8vd2FsbGV0Ljk1NTE2LmNvbS9zL3dsL3dlYlYzL2FjdGl2aXR5L3ZNYXJrZXRpbmcyL2h0bWwvc25zSW5kZXguaHRtbD9yPVwiICsgcmVzcG9uc2UuZGF0YS5pZGVudGlmaWVyO1xyXG4gICAgICAgICAgICBsZXQgbmV4dFN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgcmVkVXJsU3RyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKG5leHRTdGF0ZSkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVkVXJsU3RyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOaYr+WQpuWcqOeZveWQjeWNleeahOivt+axglxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQmxhY2sodXBkYXRlKSB7XHJcbiAgICBsZXQgdXBkYXRlRnVuYyA9IGZ1bmN0aW9uKHJlc3Ape1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGJsYWNrU3Q6cmVzcC5kYXRhLmJsYWNrU3RcclxuICAgICAgICB9KSlcclxuICAgICAgICBjb25zb2xlLmxvZygnaXNCbGFjazogdXBkYXRl5Ye95pWw5omn6KGM5a6M5q+VJyk7XHJcbiAgICAgICAgaWYoIHR5cGVvZiB1cGRhdGUgPT09ICdmdW5jdGlvbicgKXtcclxuICAgICAgICAgICAgdXBkYXRlKHJlc3ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v6K+75Y+W57yT5a2Y77yM5ZCM5pe25byC5q2l5Y+R6YCB6K+35rGCXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5pc0JsYWNrLHt9LHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSh1cGRhdGVGdW5jKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYmxhY2tTdDpyZXNwb25zZS5kYXRhLmJsYWNrU3RcclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKblnKjpu5HlkI3ljZXnmoTor7fmsYJcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNBcHBseSgpIHtcclxuICAgIGxldCBjYWNoZVBhcmFtID0gY2FjaGVGaXJzdFN0b3JhZ2UoMzAqNjAqMTAwMCxDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXkpOy8v57yT5a2YMzDliIbpkp9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuaXNBcHBseSwge30sY2FjaGVQYXJhbSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5hcHBseVN0ICE9IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDlpoLmnpzlt7Lnu4/nlLPor7fov4fnuqLljIXnoIHliJnnvJPlrZgzMOWIhumSn++8jOWQpuWImeS4jee8k+WtmFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5KVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBhcHBseVN0OnJlc3BvbnNlLmRhdGEuYXBwbHlTdFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOeUs+ivt+aUtuasvueggVxyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNY2MocGFyYW0gPSB7XHJcbiAgICByZWZlcmVlVGVsOiBcIlwiLCAgICAgICAgIC8v5o6o6I2Q5Lq65omL5py65Y+3XHJcbiAgICB2aXJ0dWFsQ2FyZE5vOiBcIlwiLCAgICAgIC8v6Jma5ouf5Y2h5Y+3XHJcbiAgICBhY2NObTogXCJcIiwgICAgICAgICAgICAgIC8v5bqX6ZO65ZCN56ewXHJcbiAgICBjaXR5Q2Q6IFwiXCIgICAgICAgICAgICAgICAvL+WfjuW4guS7o+eggVxyXG59KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5hcHBseU1jYywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpueUs+ivt+e6ouWMheeggeaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXlcclxuICAgICAgICAgICAgfSwoKT0+e30sKCk9PntcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTpk7booYzljaHliJfooahcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDYXJkbGlzdCgpIHtcclxuICAgIC8v6I635Y+W55So5oi36ZO26KGM5Y2h5YiX6KGo77yM57yT5a2YMeWIhumSn1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRNY2NDYXJkTGlzdCwgY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSg2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAvL+WmguaenOWQjuWPsOi/lOWbnumTtuihjOWNoeWIl+ihqOS4lOS4jeS4uuepulxyXG4gICAgICAgIGlmICghIXJlc3BvbnNlLmRhdGEuY2FyZExpc3QgJiYgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5sZW5ndGggIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgLy/liJ3lp4vljJbpu5jorqTljaFcclxuICAgICAgICAgICAgbGV0IGRlZmFsdXRDYXJkID0ge1xyXG4gICAgICAgICAgICAgICAgYmFuazogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeaJgOWcqOeahOmTtuihjFxyXG4gICAgICAgICAgICAgICAgY2FyZFR5cGU6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h57G75Z6LXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbkJpdG1hcDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHlip/og73kvY1cclxuICAgICAgICAgICAgICAgIGljb25SZWxVcmw6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeeahGxvZ2/lnLDlnYBcclxuICAgICAgICAgICAgICAgIGlzU3VwcG9ydDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5pSv5oyBXHJcbiAgICAgICAgICAgICAgICBwYW46IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W4puacieaOqeeggeeahOWNoeWPt1xyXG4gICAgICAgICAgICAgICAgcmFuazogMCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm6YCJ5LitXHJcbiAgICAgICAgICAgICAgICB2aXJ0dWFsQ2FyZE5vOiBcIlwiICAgLy/omZrmi5/ljaHlj7dcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuY2FyZExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhaXRlbS5zZWxlY3RlZCAmJiBpdGVtLmlzU3VwcG9ydCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYWx1dENhcmQgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL+WmguaenOayoeaciem7mOiupOmAieS4reeahOWNoeWPluS4gOS4quS4jeiiq+e9ruS4uueBsOeahOWNoeS4uum7mOiupOWNoVxyXG4gICAgICAgICAgICBpZiAoZGVmYWx1dENhcmQuYmFuay5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZXNwb25zZS5kYXRhLmNhcmRMaXN0Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuY2FyZExpc3Rba10uaXNTdXBwb3J0ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYWx1dENhcmQgPSByZXNwb25zZS5kYXRhLmNhcmRMaXN0W2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0b3JlU3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yZVJlY2VpdmVDYXJkT2JqOiBkZWZhbHV0Q2FyZCxcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0OiByZXNwb25zZS5kYXRhLmNhcmRMaXN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHN0b3JlU3RhdGUpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWcsOWdgOWIl+ihqFxyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWRkckxpc3QoXHJcbiAgICB1cGRhdGUsIC8v57yT5a2Y55qE5pu05paw5Ye95pWwXHJcbiAgICBwYXJhbSA9IHtcclxuICAgICAgICBzdGF0ZTogXCJcIiAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuKSB7XHJcbiAgICAvLyDor7vlj5bnvJPlrZjvvIzlkIzml7blvILmraXlj5HpgIHor7fmsYJcclxuICAgIGxldCB1cGRhdGVGdW5jID0gZnVuY3Rpb24ocmVzcCl7XHJcbiAgICAgICAgLy8g5ZyodXBkYXRl5Ye95pWw5Lit77yM5pu05pawcmVkdXjkuK3nmoRhZGRyZXNzTGlzdFxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7YWRkcmVzc0xpc3Q6cmVzcC5kYXRhLnJlc3VsdHx8W119KSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEFkZHJMaXN0OiB1cGRhdGXlh73mlbDmiafooYzlrozmr5UnKTtcclxuICAgICAgICBpZiggdHlwZW9mIHVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXNwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSh1cGRhdGVGdW5jLENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpO1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0QWRkckxpc3QsIE9iamVjdC5hc3NpZ24oe30sIGNvbW9tUGFyYW0sIHBhcmFtKSxjYWNoZVBhcmFtKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgYWRkcmVzc0xpc3QgPSByZXNwb25zZS5kYXRhLnJlc3VsdCB8fCBbXTtcclxuXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYWRkcmVzc0xpc3RcclxuICAgICAgICB9KSlcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnlLPor7fnianmlpnmjqXlj6NcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWF0KHBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+eJqeaWmeWIl+ihqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2Tm06IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+S6ulxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEFsbDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWMuuWQjeensFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2UGhvbmU6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+eUteivnVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ecgUlEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5biCSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDljLpJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3NJbmZvOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ivpue7huWcsOWdgFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnJywgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWdgOeahElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eU5tOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5omA5Zyo5Z+O5biCQ2l0eUNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRVcmw6IFwiXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nuqLljIXnoIHlnLDlnYAgIOWPr+mAieWPguaVsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuYXBwbHlNYXQsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5ZWG5oi35pS25qy+56CB5Zyw5Z2A5ZKM5ZWG5oi357yW5Y+3XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXJVcmxSZXN0KCkge1xyXG4gICAgLy/nvJPlrZgy5bCP5pe2XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFFyVXJsLCBjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBtY2hudERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgcXJVcmw6IHJlc3BvbnNlLmRhdGEucXJVcmwsXHJcbiAgICAgICAgICAgICAgICBxck51bTogcmVzcG9uc2UuZGF0YS5xck51bVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKuiOt+WPluW6l+mTuuWMuuWfn+WIl+ihqOWSjOW6l+mTuuexu+Wei+WIl+ihqFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNobnRBbmRBcmVhSW5mKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+Z5Liq5o6l5Y+jLOWPqui1sHN377yM5LiN6LWwbG9hY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICAvLyBsZXQgY2FjaGVQYXJhbSA9IHtcclxuICAgIC8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4gICAgLy8gICAgIGZvckNoc3A6ZmFsc2UsXHJcbiAgICAvLyAgICAgZW5jcnlwdDpmYWxzZSxcclxuICAgIC8vICAgICBjYWNoZTogdHJ1ZVxyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRNY2hudEFuZEFyZWFJbmYsIGNvbW9tUGFyYW0sIGNhY2hlRmlyc3QoMjQqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgbGV0IGFyZWEgPSBbXSwgbWVyY2hhbnRUcCA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOecgee6p1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5hcmVhQXJyLmZvckVhY2goKHByb3ZpbmNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9uZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHByb3ZpbmNlLnByb0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogcHJvdmluY2UucHJvTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHByb3ZpbmNlLnByb05tID09IFwi5YyX5Lqs5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLkuIrmtbfluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIuWkqea0peW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi6YeN5bqG5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLmt7HlnLPluIJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogcHJvdmluY2UucHJvSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogcHJvdmluY2UucHJvTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlLmNpdHkuZm9yRWFjaCgoY2l0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhyZWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGNpdHkuY2l0eUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBjaXR5LmNpdHlObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhyZWUudmFsdWUgIT0gdHdvLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d28uY2hpbGRyZW4ucHVzaCh0aHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgKiDluILnuqdcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBwcm92aW5jZS5jaXR5LmZvckVhY2goKGNpdHkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGNpdHkuY2l0eUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBjaXR5LmNpdHlObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIOWMuue6p1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5hcmVhLmZvckVhY2goKGFyZWEpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhyZWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBhcmVhLmFyZWFJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IGFyZWEuYXJlYU5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d28uY2hpbGRyZW4ucHVzaCh0aHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYXJlYS5wdXNoKG9uZSk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLm1lcmNoYW50VHBBcnIuZm9yRWFjaCgobWVyVHlwZTEpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvbmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtZXJUeXBlMS5tZXJjaGFudFRwQ2QsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBtZXJUeXBlMS5tZXJjaGFudFRwTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1lclR5cGUxLm1lcmNoYW50VHBBcnIuZm9yRWFjaCgobWVyVHlwZTIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IG1lclR5cGUyLm1lcmNoYW50VHBDZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBtZXJUeXBlMi5tZXJjaGFudFRwTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIG1lcmNoYW50VHAucHVzaChvbmUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV4dFN0YXRlID0ge1xyXG4gICAgICAgICAgICBtY2hudEFuZEFyZWFJbmY6IHtcclxuICAgICAgICAgICAgICAgIGFyZWFBcnI6IGFyZWEsXHJcbiAgICAgICAgICAgICAgICBtZXJjaGFudFRwQXJyOiBtZXJjaGFudFRwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKG5leHRTdGF0ZSkpXHJcblxyXG4gICAgfSlcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5blupfpk7ror6bmg4Xkv6Hmga9cclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNobnREZXRhaWwoKSB7XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IGNhY2hlRmlyc3RTdG9yYWdlKDYwKjEwMDAsQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7Ly/nvJPlrZgx5YiG6ZKfXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRNY2hudERldGFpbCwgY29tb21QYXJhbSxjYWNoZVBhcmFtKS50aGVuKChyZXNwKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3Auc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgbGV0IG1jaG50RGV0YWlsID0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe21jaG50RGV0YWlsfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1jaG50RGV0YWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5Y2H57qn5ZWG6ZO65LqM57u056CBXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGdyYWRlTWNjKHBhcmFtPXtcclxuICAgIHN0b3JlTm06IFwiXCIsICAgIC8v5bqX6ZO65ZCN56ewXHJcbiAgICBTdG9yZVRwOiBcIlwiLCAgICAvL+W6l+mTuuexu+Wei1xyXG4gICAgcHJvdkNkOiBcIlwiLCAgICAgLy/nnIFJRFxyXG4gICAgY2l0eUNkOiBcIlwiLCAgICAgLy/luIJJRFxyXG4gICAgY291dHlDZDogXCJcIiwgICAgLy/ljLpJRFxyXG4gICAgYWRkcjogXCJcIiwgICAgICAgLy/lnLDlnYBcclxuICAgIGNlcnRpZlBpYzE6IFwiXCIsIC8v6Lqr5Lu96K+B5q2j6Z2i54WnXHJcbiAgICBjZXJ0aWZQaWMyOiBcIlwiLCAvL+i6q+S7veivgeWPjemdoueFp1xyXG4gICAgY2VydGlmUGljMzogXCJcIiwgLy/miYvmjIHouqvku73or4HnhafniYdcclxuICAgIGxpY2Vuc2VQaWM6IFwiXCIsIC8v6JCl5Lia5omn54WnXHJcbiAgICBzaG9wUGljMTogXCJcIiwgICAvL+W6l+mTuueFp+eJhzFcclxuICAgIHNob3BQaWMyOiBcIlwiLCAgIC8v5bqX6ZO654Wn54mHMlxyXG4gICAgYXV4UHJvdk1hdDE6IFwiXCIsLy/ovoXliqnnhafniYcxXHJcbiAgICBhdXhQcm92TWF0MjogXCJcIiwvL+i+heWKqeeFp+eJhzJcclxuICAgIHNob3BMb2dvUGljOiBcIlwiIC8v5bqX6ZO6TE9HT1xyXG59KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC51cGdyYWRlTWNjLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk5bqX6ZO66K+m5oOF55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpO1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpuWNh+e6p+eahOaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Qucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0LnNlY29uZEtleSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTljY/orq7nvJblj7flkozljY/orq7lkI3np7BcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvdG9jb2xJbmZvKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiDov5nkuKrmjqXlj6Ms57yT5a2YMuWwj+aXtlxyXG4gICAgICovXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFByb3RvY29sSW5mbywgY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZS5kYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDljoblj7LmlLbmrL5cclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlzdG9yeUluY29tZShwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0SGlzdG9yeUluY29tZSwgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeUluY29tZU9iajogcmVzLmRhdGFcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5Y6G5Y+y6K6i5Y2VXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpc3RvcnlUcmFucyhwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0SGlzdG9yeVRyYW5zLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBsZXQgb3JpZ2luTGlzdERhdGEgPSBzdG9yZS5nZXRTdGF0ZSgpLmdldEluKFsnaGlzdG9yeU9yZGVyTGlzdCddKS50b0pTKClcclxuICAgICAgICAgICAgbGV0IG5ld0xpc3QgPSByZXMuZGF0YS50cmFuc0luZm87XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0xpc3QpXHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5T3JkZXJMaXN0OiBvcmlnaW5MaXN0RGF0YS5jb25jYXQobmV3TGlzdClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5LuK5pel5pS25qy+XHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5SW5jb21lKCkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VG9kYXlJbmNvbWUsY29tb21QYXJhbSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgdG9kYXlJbmNvbWVPYmo6IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDku4rml6XorqLljZVcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9kYXlUcmFucyhwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VG9kYXlUcmFucywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgbGV0IG9yaWdpbkxpc3REYXRhID0gc3RvcmUuZ2V0U3RhdGUoKS5nZXRJbihbJ3RvZGF5T3JkZXJMaXN0J10pLnRvSlMoKVxyXG4gICAgICAgICAgICBsZXQgbmV3TGlzdCA9IHJlcy5kYXRhLnRyYW5zSW5mbztcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIHRvZGF5T3JkZXJMaXN0OiBvcmlnaW5MaXN0RGF0YS5jb25jYXQobmV3TGlzdClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5Y2V56yU5p+l6K+iXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0ocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0sT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSlcclxufVxyXG4vKipcclxuICog6I635Y+W54mp5rWB5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naXN0aWNzU3QocGFyYW0pe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRMb2dpc3RpY3NTdCwgT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICBsZXQgbmV3T2JqID0gcmVzLmRhdGEuZGVsaXZlcnlNc2c7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBuZXdPYmoubWF0RGVsaXZTdGF0dXMg55qE54q25oCB5ZKMcmVkdXjnmoRzdG9yZeS/neaMgeS4gOiHtFxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIG5ld09iai5tYXREZWxpdlN0YXR1cyA9IHJlcy5kYXRhLm1hdERlbGl2U3RhdHVzO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgZGVsaXZlcnlNc2c6IG5ld09ialxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDllYbmiLfmnI3liqHpppbpobUg54K55Ye75L+h55So5Y2h5oyJ6ZKu5p+l6K+i5ZWG5oi35piv5ZCm5byA6YCa6L+H5L+h55So5Y2h5pS25qy+XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXBncmFkZVN0KCl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFVwZ3JhZGVTdCwgY29tb21QYXJhbSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnianmlpnljoblj7LorqLljZVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpc3RpY3NMaXN0KHBhcmFtKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TG9naXN0aWNzTGlzdCxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5p+l6K+i5L+h55So5Y2h5pS25qy+5Y2H57qn54q25oCBXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXVkaXRJbmZvKCl7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRBdWRpdEluZm8sIGNvbW9tUGFyYW0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bmlLbmrL7pmZDpop3or6bmg4VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW1pdEF0SW5mbygpe1xyXG4gICAgLy/nvJPlrZgy5Liq5bCP5pe2XHJcbiAgICBwb3N0KENPTkZJRy5SRVNULmdldExpbWl0QXRJbmZvLGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcCk9PntcclxuICAgICAgICBpZiggcmVzcC5zdGF0dXNDb2RlID0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyApe1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe2xpbWl0SW5mbzpyZXNwLmRhdGF9KSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5pu05paw5bqX6ZO66K+m5oOFXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g5bqX6ZO66K+m5oOF5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWNobnRPcGVyKHBhcmFtID17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBncmFkZU1jYyAsIE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpG1jaG50RGV0YWls57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7IFxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKDpmaTlnLDlnYDkv6Hmga9cclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVBZGRyZXNzKHBhcmFtPXtcclxuICAgIGlkOicnIC8v5Zyw5Z2AaWRcclxufSl7XHJcbiAgICBcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmRlbGV0ZUFkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBhcmFtKTtcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5pu05paw5pS25qy+6ZO26KGM5Y2hXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWNjQ2FyZChwYXJhbT17XHJcbiAgICB2aXJ0dWFsQ2FyZE5vOicnIC8v6Jma5ouf5Y2h5Y+3XHJcbn0pIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBkYXRlTWNjQ2FyZCxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/mjaLljaHlkI7vvIzmuIXpmaTlupfpk7ror6bmg4XnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7IFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmlrDlop7lnLDlnYBcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor6bnu4bnmoTlnLDlnYDkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdBZGRyZXNzKHBhcmFtPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5uZXdBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1Mpe1xyXG4gICAgICAgICAgICAvLyDliKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOS/ruaUueWcsOWdgOS/oeaBr1xyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivpue7hueahOWcsOWdgOS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRBZGRyZXNzKHBhcmFtPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5lZGl0QWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgLy/liKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDlkK/lgZzmlLbmrL7noIHmnI3liqFcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNY2NPbk9mZihwYXJhbT17XHJcbiAgICBpc1VzZU1jYzonJyAgLy/mmK/lkKbkvb/nlKjmlLbmrL7noIHmnI3liqFcclxuIH0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnNldE1jY09uT2ZmLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpOW6l+mTuuivpuaDhee8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOyBcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDojrflj5blkIrotbfmlK/ku5jmjqfku7bnmoRUTuWPt1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jY1RyYW5zTnVtKCl7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRNY2NUcmFuc051bSkudGhlbigocmVzcCk9PntcclxuICAgICAgICBpZiggcmVzcC5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MgKXtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7bWNjVHJhbnNOdW06cmVzcC5kYXRhLnRyYW5zTnVtfSlcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJLmpzIiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgc2FmZSkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgaWYgKHNhZmUgJiYgdGFyZ2V0W2tleV0pIHRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNGRjMWY3ZWJkODBkMTViZmQzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjc5ODUxYmUyN2IyNjhlYTI0ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFkZmFjMjg1MjNhZTM3ZGFjNWJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjUxYmM3YWZlODEyN2UwOTE0OWRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7cmVnUGhvbmUsIHRvYXN0fSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdFwiO1xyXG5cclxuaW1wb3J0IEJ1dHRvbiBmcm9tICdhbnRkLW1vYmlsZS9saWIvYnV0dG9uJztcclxuaW1wb3J0IElucHV0SXRlbSBmcm9tICdhbnRkLW1vYmlsZS9saWIvaW5wdXQtaXRlbSc7XHJcblxyXG5pbXBvcnQgXCIuL1JlZEJhZ0lkSWRlbnRpZnkuc2Nzc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRCYWdJZElkZW50aWZ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgY2xpY2tFcnJvciA9IChtc2cpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnYWEnKVxyXG4gICAgICAgIHRvYXN0KG1zZyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIGxldCB7bmFtZSxJRCxwaG9uZSxjaGFuZ2VSZWRCYWdwaG9uZSxoYW5kbGVDbGlja309dGhpcy5wcm9wcztcclxuICAgICAgICBsZXQgZXJyb3IgPSBmYWxzZTtcclxuICAgICAgICBpZiAoISFwaG9uZSAmJiAhcmVnUGhvbmUudGVzdChwaG9uZSkpIHtcclxuICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3IgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJyYmlpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGVudFdhcnBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZDMyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlucHV0Um93SW50cm9kdWNlXCIgPueUqOaIt+i6q+S7veS/oeaBrzwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dFJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicm93TGFiZWxcIj7lp5PlkI08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyb3dJbmZvXCI+e25hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXRSb3cgbXQzMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicm93TGFiZWxcIj7or4Hku7blj7c8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyb3dJbmZvXCI+e0lEfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnB1dFJvd0ludHJvZHVjZSBtdDU5XCI+55So5oi355Sz6K+35oGvPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlY29tbWVuZCBpbnB1dFdhcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0SXRlbSBjbGVhciBwbGFjZWhvbGRlcj1cIuaOqOiNkOS6uuaJi+acuuWPt1wiIGVycm9yPXtlcnJvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Bob25lfSBvbkNoYW5nZT17Y2hhbmdlUmVkQmFncGhvbmV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3JDbGljaz17dGhpcy5jbGlja0Vycm9yLmJpbmQodGhpcyxcIuivt+i+k+WFpeWQiOazleeahOaJi+acuuWPt1wiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID7miYvmnLrlj7c8L0lucHV0SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpcHMtd2FycC1kaXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cInRpcHNJY29uXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg6K+36L6T5YWl5o6o6I2Q5Lq65omL5py65Y+377yM6Z2e5b+F5aGrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pdC13YXJwLWJ1dHRvbiBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25DbGljaz17aGFuZGxlQ2xpY2t9PuS4i+S4gOatpTwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9SZWRCYWdJZElkZW50aWZ5L1JlZEJhZ0lkSWRlbnRpZnkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhjZmY4NmUxZDUxZWJmMjFmN2Zcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDNjMjRkMzhmZmNkMGMzOGUzNDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1M2I3ZDM0ODE3MTQ0YjEyYjBhYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNWU1OWI3MWIzM2EzOGMzNjE4ZTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSkge1xuICB2YXIgQyA9IHR5cGVvZiBjb3JlW0tFWV0gPT0gJ2Z1bmN0aW9uJyA/IGNvcmVbS0VZXSA6IGdsb2JhbFtLRVldO1xuICBpZiAoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkgZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDVlNzQ5MWYxZjc5OTcxNWVhYzc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsImltcG9ydCB7cmVjbWRSZWNvcmR9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVjbWRSZWRDb2RlKGhpc3RvcnksIHBob25lLCB0eXBlKSB7XHJcbiAgICByZWNtZFJlY29yZChwaG9uZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJjb2RlXCIpIHtcclxuICAgICAgICAgICAgaGlzdG9yeS5wdXNoKHtwYXRobmFtZTogJy9yZWRCYWdDb2RlL2NvZGUnfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBoaXN0b3J5LnB1c2goe3BhdGhuYW1lOiBcIi9hcHBseUNvbW1kaXR5T2ZSZWRCYWdTaW5nbGUvc3RvcmVJbmZvXCJ9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvUmVkQmFnSWRJZGVudGlmeS9SZWRCYWdJZElkZW50aWZ5QWN0aW9ucy5qcyIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gNmE0NDJhYjViZDliZDkyOTQ0Nzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLypcclxuICAgQVBJIOaOpeWPo+mFjee9rlxyXG4gICBheGlvcyDlj4LogIPmlofmoaPvvJpodHRwczovL3d3dy5rYW5jbG91ZC5jbi95dW55ZS9heGlvcy8yMzQ4NDVcclxuXHJcbiovXHJcbi8vIGltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCBUb2FzdCBmcm9tICdhbnRkLW1vYmlsZS9saWIvdG9hc3QnO1xyXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuaW1wb3J0IENPTkZJRyBmcm9tIFwiLi9jb25maWdcIlxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qXHJcbiog5bi46YeP5a6a5LmJ5Yy6XHJcbipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZXhwb3J0IGNvbnN0IFV0aWwgPSB3aW5kb3cuVVAuVy5VdGlsO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwcCA9IFVQLlcuQXBwO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVudiA9IFVQLlcuRW52O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCByZWdQaG9uZSA9IC9eKDEzWzAtOV18MTRbNTc5XXwxNVswLTMsNS05XXwxNls2XXwxN1swMTM1Njc4XXwxOFswLTldfDE5Wzg5XSlcXGR7OH0kLztcclxuXHJcbmV4cG9ydCBjb25zdCByZWdQYXlOdW0gPSAvXlswLTldezIwfSQvO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbW9tUGFyYW0gPSB7XHJcbiAgICB2ZXJzaW9uOiBcIjIuMFwiLFxyXG4gICAgc291cmNlOiBcIjJcIlxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIOivt+axguaguOW/g+WMuiDkuIvpnaLov5nlnZfljLrln5/kuK3nmoTku6PnoIHmlLnliqjor7fmhY7ph41cclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmxldCBiYXNlVXJsID0gXCJcIiwgYmFzZVVybDIgPSBcIlwiLCBiYXNlVXJsMyA9IFwiXCI7XHJcbmlmIChsb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCc5NTUxNi5jb20nKSAhPT0gLTEpIHsgLy/nlJ/kuqfnjq/looNcclxuICAgIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9zaGFuZ2h1Ljk1NTE2LmNvbS93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMiA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL21hbGwuOTU1MTYuY29tL2NxcC1pbnQtbWFsbC13ZWIvcmVzdGxldC9cIjtcclxuICAgIGJhc2VVcmwzID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8veW91aHVpLjk1NTE2LmNvbS95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn0gZWxzZSBpZiAobG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignMTcyLjE4LjE3OS4xMCcpICE9PSAtMSkgeyAvL+a1i+ivleeOr+Wig1xyXG4gICAgLy8gYmFzZVVybD1cImh0dHA6Ly8xNzIuMjEuMTAxLjI1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjsgLy/mtYvor5XlrqRhcGFjaGVcclxuICAgIC8vYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuOTU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5byA5Y+R546v5aKDYXBhY2hlXHJcbiAgICBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xNy93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjExL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjEzMy4yNTozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn0gZWxzZSB7XHJcbiAgICAvLyBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS45NTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS4yNTozODIxMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xNy93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjExL3lvdWh1aS13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4xMzMuMjU6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMzMuNTY6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59XHJcbi8qKlxyXG4gKiDpgJrov4flkI7nvIDojrflj5bmnI3liqHlmajnmoTlhajlnLDlnYBcclxuICogQHBhcmFtIHVybFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldFNlcnZVcmwgPSAodXJsKSA9PiB7XHJcbiAgICBsZXQgc2VydmVyVXJsID0gXCJcIlxyXG4gICAgaWYgKHVybCA9PSBDT05GSUcuUkVTVC51c2VySW5mbykge1xyXG4gICAgICAgIHNlcnZlclVybCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICAvLyBlbHNlIGlmICh1cmwuc3BsaXQoXCIvXCIpWzBdID09IFwiYWRkcmVzc1wiKSB7XHJcbiAgICAvLyAgICAgc2VydmVyVXJsID0gYmFzZVVybDJcclxuICAgIC8vIH1cclxuICAgIGVsc2UgaWYgKHVybC5zcGxpdChcIi9cIilbMF0gPT0gXCJzY2FuXCIgfHwgdXJsID09IENPTkZJRy5SRVNULmdldENpdHkpIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsM1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gYmFzZVVybFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZXJ2ZXJVcmw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmoLzlvI/ljJbnu5Pmnpwg5bCG57uT5p6c5qC85byP5YyW5Li6XHJcbiAqIHtcclxuICogICAgIHN0YXR1c0NvZGUgICDlkI7lj7Dlk43lupTnoIFcclxuICogICAgIGRhdGEgICAgICAgICDlkI7lj7Dov5Tlm57nmoTmlbDmja5cclxuICogICAgIG1zZyAgICAgICAgICDlkI7lj7DnmoTmj5DnpLrkv6Hmga9cclxuICogfVxyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKiBAcmV0dXJucyB7e3N0YXR1c0NvZGU6IChzdHJpbmd8KiksIGRhdGE6ICosIG1zZzogKn19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVzcG9uc2VGb3JtYXR0ZXIgPSAoZGF0YSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnJlc3AsXHJcbiAgICAgICAgZGF0YTogZGF0YS5wYXJhbXMsXHJcbiAgICAgICAgbXNnOiBkYXRhLm1zZ1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8vIOWIoOmZpOW6lemDqCAnLydcclxuZnVuY3Rpb24gZGVsZXRlU2xhc2goaG9zdCkge1xyXG4gICAgcmV0dXJuIGhvc3QucmVwbGFjZSgvXFwvJC8sICcnKTtcclxufVxyXG5cclxuLy8g5re75Yqg5aS06YOoICcvJ1xyXG5mdW5jdGlvbiBhZGRTbGFzaChwYXRoKSB7XHJcbiAgICByZXR1cm4gL15cXC8vLnRlc3QocGF0aCkgPyBwYXRoIDogYC8ke3BhdGh9YDtcclxufVxyXG5cclxuLy8g6Kej5p6Q5Y+C5pWwXHJcbmZ1bmN0aW9uIHNlcGFyYXRlUGFyYW1zKHVybCkge1xyXG4gICAgY29uc3QgW3BhdGggPSAnJywgcGFyYW1zTGluZSA9ICcnXSA9IHVybC5zcGxpdCgnPycpO1xyXG5cclxuICAgIGxldCBwYXJhbXMgPSB7fTtcclxuXHJcbiAgICBwYXJhbXNMaW5lLnNwbGl0KCcmJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBpdGVtLnNwbGl0KCc9Jyk7XHJcblxyXG4gICAgICAgIHBhcmFtc1trZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge3BhdGgsIHBhcmFtc307XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKXtcclxuICAgIGxldCB7bWV0aG9kLCB1cmwsIGRhdGEgPSB7fX0gPSBjb25maWc7XHJcbiAgICBtZXRob2QgPSAobWV0aG9kICYmIG1ldGhvZC50b1VwcGVyQ2FzZSgpKSB8fCAnR0VUJztcclxuXHJcbiAgICBsZXQgc2VydmVyVXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6MzAwMC8nO1xyXG4gICAgbGV0IGZpbmFsVXJsID0gc2VydmVyVXJsICsgdXJsO1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdXJsOmZpbmFsVXJsLFxyXG4gICAgICAgICAgICB0eXBlOm1ldGhvZCxcclxuICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09ICcyMDAnKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlRm9ybWF0dGVyKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjpmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCfor7fmsYLlpLHotKUnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICBpZiggbWV0aG9kID09PSAnUE9TVCcgKXtcclxuICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICAgb3B0aW9ucy5kYXRhVHlwZSA9ICdqc29uJ1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICQuYWpheChvcHRpb25zKTtcclxuICAgIH0pXHJcbiAgICBcclxufVxyXG5cclxuLy8g5Li76KaB6K+35rGC5pa55rOVXHJcbi8vIGV4cG9ydCAgZnVuY3Rpb24gcmVxdWVzdE9yaWdpbihjb25maWcpIHtcclxuXHJcbi8vICAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuLy8gICAgIGNvbnN0IHVpID0gVVAuVy5VSTtcclxuLy8gICAgIGNvbnN0IGVudiA9IFVQLlcuRW52O1xyXG5cclxuLy8gICAgIGxldCB7bWV0aG9kLCB1cmwsIGRhdGEgPSB7fSwgaGVhZGVycywgZm9yQ2hzcCwgZW5jcnlwdCwgYnlBamF4LCBjYWNoZSwgdXBkYXRlLCBzdG9yYWdlfSA9IGNvbmZpZztcclxuXHJcbi8vICAgICBtZXRob2QgPSAobWV0aG9kICYmIG1ldGhvZC50b1VwcGVyQ2FzZSgpKSB8fCAnR0VUJztcclxuXHJcbi8vICAgICBsZXQgc2VydmVyVXJsID0gZ2V0U2VydlVybCh1cmwpO1xyXG5cclxuLy8gICAgIC8vIGxldCBzZXJ2ZXJVcmwgPSBiYXNlVXJsIDtcclxuLy8gICAgIC8vIGlmICh0cnVlKSB7XHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOmAmui/h+aPkuS7tuWPkemAgeivt+axglxyXG4vLyAgICAgICovXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDlkJHmnI3liqHlmajlj5HpgIHor7fmsYJcclxuLy8gICAgICAqIEBwYXJhbSBwYXJhbXMg6K+35rGC5Y+C5pWwXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHZlcnNpb27vvJrniYjmnKzvvIzpu5jorqTmmK8xLjBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgc291cmNl77ya5p2l5rqQ77yM6buY6K6k5qC55o2uQW5kcm9pZOOAgWlPU+iHquWKqOa3u+WKoFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBlbmNyeXB077ya5piv5ZCm5Yqg5a+G77yM6buY6K6k5Yqg5a+GXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIG1ldGhvZO+8muivt+axguaWueazle+8jFBPU1TmiJZHRVRcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgY21k77ya6K+35rGC5ZG95Luk77yI5Lmf5Y+v6Ieq6KGM5bCGY21k57uE6KOF6IezdXJpW+S8mOaDoOWQjuWPsF3miJZwYXRoW+mSseWMheWQjuWPsF3vvIlcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdXJpL3BhdGjvvJror7fmsYLlnLDlnYDvvIzlu7rorq7ku4XloavlhYVjbWTvvIzkuI3lu7rorq7oh6rooYznu4Too4V1cmkvcGF0aFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBwYXJhbXPvvJrlj5HpgIHnu5nlkI7lj7DnmoTlj4LmlbBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdmlk77ya5aaC5p6c6YCa6L+HQWpheOaWueW8j+WQkXdhbGxldOWQjuWPsOWPkemAgeivt+axgumcgOimgeaQuuW4pnZpZFxyXG4vLyAgICAgICogQHBhcmFtIGZvckNoc3Ag5piv5ZCm5ZCR5LyY5oOg5ZCO5Y+w5Y+R6YCB6K+35rGC77yI6buY6K6k5ZCR5omL5py65ZCO5Y+w5Y+R6YCB6K+35rGC77yJXHJcbi8vICAgICAgKiBAcGFyYW0gYnlBamF4IOaYr+WQpuS9v+eUqEFqYXjlj5HpgIHor7fmsYLvvIjpu5jorqTkvb/nlKjmjqfku7bvvIlcclxuLy8gICAgICAqIEBwYXJhbSBzdWNjZXNzIOaIkOWKn+Wbnuiwg1xyXG4vLyAgICAgICogQHBhcmFtIGVycm9yIOmUmeivr+Wbnuiwg++8iOS4muWKoemUmeivr++8iVxyXG4vLyAgICAgICogQHBhcmFtIGZhaWwg5aSx6LSl5Zue6LCD77yI6K+35rGC5aSx6LSl77yJXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbi8vICAgICAgICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG5cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBzdWNjZXNzQ2FsbGJhY2sgPSAoZGF0YSxmdWMpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+U5Zue5oiQ5Yqf57uT5p6c77yaXCIpXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJlc3BvbnNlRm9ybWF0dGVyKGRhdGEpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWYoICEhZnVjICl7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVxLmZ1YyA9IGZ1YztcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIHJlc29sdmUocmVxKVxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgZXJyb3JDYWxsYmFjayA9IChlcnIpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+U5Zue5aSx6LSl57uT5p6c77yaXCIpXHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHVybCA9PSBDT05GSUcuUkVTVC5hcHBseU1jYyB8fCB1cmwgPT0gQ09ORklHLlJFU1QuYXBwbHlNYXQgfHwgdXJsID09IENPTkZJRy5SRVNULnRvZGF5TW9uZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBsZXQgcmVxID0gcmVzcG9uc2VGb3JtYXR0ZXIoZXJyKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcSlcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIFRvYXN0LmluZm8oZXJyLm1zZyB8fCAn5p+l6K+i5Lia5Yqh6KaB57Sg5Ye66ZSZ77yM6K+356iN5ZCO5YaN6K+V77yBJyk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBuZXR3b3JrQ2FsbGJhY2sgPSAoeGhyKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBUb2FzdC5pbmZvKHhoci5tc2cpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKHVybCAhPSBDT05GSUcuUkVTVC5nZXRUb2RheUluY29tZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuc2hvd0xvYWRpbmcoKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKCFjYWNoZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVcmw6XCIgKyB1cmwpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBhcmFtOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coe1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBlbmNyeXB0OiBlbmNyeXB0LFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGZvckNoc3A6IGZvckNoc3AsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgYnlBamF4OiBieUFqYXhcclxuLy8gICAgICAgICAgICAgICAgIC8vIH0pXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWPkemAgemdnue8k+WtmOivt+axglwiKVxyXG4vLyAgICAgICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlKFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVyaTpzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9LCBmb3JDaHNwLCBieUFqYXgsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgbmV0d29ya0NhbGxiYWNrKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2FjaGVVcmw6XCIgKyB1cmwpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN0b3JlYWdl562W55Wl5pivOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3RvcmFnZSlcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXBkYXRl5Ye95pWwOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXBkYXRlKVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHnvJPlrZjor7fmsYJcIilcclxuLy8gICAgICAgICAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAgICAgICAgICog5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gcGFyYW1zIOivt+axguWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2ZXJzaW9u77ya54mI5pys77yM6buY6K6k5pivMS4wXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNvdXJjZe+8muadpea6kO+8jOm7mOiupOagueaNrkFuZHJvaWTjgIFpT1Poh6rliqjmt7vliqBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgZW5jcnlwdO+8muaYr+WQpuWKoOWvhu+8jOm7mOiupOWKoOWvhlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBtZXRob2TvvJror7fmsYLmlrnms5XvvIxQT1NU5oiWR0VUXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGNtZO+8muivt+axguWRveS7pO+8iOS5n+WPr+iHquihjOWwhmNtZOe7hOijheiHs3VyaVvkvJjmg6DlkI7lj7Bd5oiWcGF0aFvpkrHljIXlkI7lj7Bd77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHVyaS9wYXRo77ya6K+35rGC5Zyw5Z2A77yM5bu66K6u5LuF5aGr5YWFY21k77yM5LiN5bu66K6u6Ieq6KGM57uE6KOFdXJpL3BhdGhcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgcGFyYW1z77ya5Y+R6YCB57uZ5ZCO5Y+w55qE5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZpZO+8muWmguaenOmAmui/h0FqYXjmlrnlvI/lkJF3YWxsZXTlkI7lj7Dlj5HpgIHor7fmsYLpnIDopoHmkLrluKZ2aWRcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBmb3JDaHNwIOaYr+WQpuWQkeS8mOaDoOWQjuWPsOWPkemAgeivt+axgu+8iOm7mOiupOWQkeaJi+acuuWQjuWPsOWPkemAgeivt+axgu+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGJ5QWpheCDmmK/lkKbkvb/nlKhBamF45Y+R6YCB6K+35rGC77yI6buY6K6k5L2/55So5o6n5Lu277yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gc3VjY2VzcyDmiJDlip/lm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBlcnJvciDplJnor6/lm57osIPvvIjkuJrliqHplJnor6/vvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBmYWlsIOWksei0peWbnuiwg++8iOivt+axguWksei0pe+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHVwZGF0ZSDlvILmraXliLfmlrDlm57osIMg5aaC5p6c6K6+572uYXN5bmPkuLp0cnVl5ZCO5Y+v5Lul5re75YqgdXBkYXRl5Zue6LCDIOWmguaenOS4jeWhq+WGmem7mOiupOS7pXN1Y2Nlc3Pov5vooYzlpITnkIZcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBzdG9yYWdlIOe8k+WtmOWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBuZWVkU3cgICAgICAgICAgICAvL+m7mOiupGZhbHNl5aSn6YOo5YiG55So55qE5piv5o+S5Lu26ZyA6KaB55qE5omL5Yqo5Y675YqgXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHN0b3JhZ2VUeXBlICAgICAgLy/pu5jorqTkvb/nlKhsb2NhbHN0b3JhZ2VcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgYXN5bmMgICAgICAgICAgICAvL+m7mOiupOiOt+WPlue8k+WtmOWQjuS4jeWPkeivt+axgu+8jOaUueS4unRydWXlkI7kvJrlvILmraXljrvor7fmsYLlkI7lj7DlubbliLfmlrDmlbDmja5cclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgZW5kT2ZTeW5jRnVuYyAgICAvL3RvZG8g6YeN6KaB77yB77yB77yB77yB5Zue6LCD5Lit5aaC5p6c5a2Y5Zyo5byC5q2l77yI5o+S5Lu2562J77yJ6ZyA6KaB5qCH5piO5byC5q2l54q25oCB5Li6dHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2YWxpZGF0ZVRpbWUgICAgIC8v5pyJ5pWI5pyf6buY6K6k5peg6ZmQ5pyJ5pWI5pyfIOWNleS9jeavq+enklxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlV2l0aElkICAgICAgIC8v6buY6K6kdHJ1ZeS7peeUqOaIt2lk6L+b6KGM5a2Y5YKo5ZCm5YiZZmFsc2Xku6Vsb2NhbOWtmOWCqFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlU3VjYyAgICAgICAgIC8v5L+d5a2Y5oiQ5Yqf5ZCO55qE5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVFcnIgICAgICAgICAgLy/kv53lrZjlpLHotKXlkI7nmoTlm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgcm9sbEtleSAgICAgICAgICAvL+W8uuWItuiuvue9ruS4u+mUrlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzZWNvbmRLZXkgICAgICAgIC8v5by65Yi26K6+572u5qyh6KaB6ZSu5YC8XHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDph43opoHor7TmmI4g6LCD55So5byC5q2l5qih5byP77yIYXN5bmPorr7nva7kuLp0cnVl77yJ5ZCO5Y+v6IO95Zyoc3VjY2Vzc+Wbnuiwg+mHjOWtmOWcqOW8guatpeaTjeS9nO+8jOivpeaDheWGteS4i+WbnuWvvOiHtOe8k+WtmOeahOWbnuiwg+WPr+iDvVxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g5pyq5omn6KGM5a6M5oiQ77yM6K+35rGC55qE5Zue6LCD5Y+I5byA5aeL5omn6KGM5LqG55qE5oOF5Ya177yM5omA5Lul5oiR5Lus57uf5LiA5Zyoc3VjY2Vzc+Wbnuiwg+WSjHVwZGF0ZeWbnuiwg+eahOWFpeWPguWinuWKoOS6huesrOS6jOS4quWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g55So5LqO5YW85a655Zue6LCD5YaF5YyF5ZCr5byC5q2l55qE54q25Ya177yM5L2/55So5pa55rOV5Li677ya6aaW5YWI6K6+572uZW5kT2ZTeW5jRnVuY+WPguaVsOS4unRydWUs5YW25qyhc3VjY2Vzc+WSjHVwZGF0ZeWbnlxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g6LCD5YaF5Lya5pyJMuS4quWFpeWPgu+8jHN1Y2Nlc3PvvIhyZXNw77yMZnVj77yJ77yM6K+35Zyo5Luj56CB6Zet5YyF5aSE5L2/55SoZnVjLmVuZE9mRnVuYygpXHJcbi8vICAgICAgICAgICAgICAgICAgKi9cclxuXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgcGFyYW0gPSB7fVxyXG5cclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoYnlBamF4KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFyYW0gPSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBcImxpZmUvbGlmZVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFyYW0gPSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cmk6c2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZVdpdGhTdG9yYWdlKHBhcmFtLCBmb3JDaHNwLCBieUFqYXgsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgbmV0d29ya0NhbGxiYWNrLCBzdG9yYWdlLCB1cGRhdGUpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICB9KVxyXG5cclxuXHJcbi8vICAgICAvLyB9XHJcbi8vICAgICAvLyBlbHNlIHtcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOmAmui/h0FqYXgg5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKi9cclxuLy8gICAgIC8vIHJldHVybiBheGlvcyh7XHJcbi8vICAgICAvLyAgICAgdXJsOiBiYXNlVXJsICsgdXJsLFxyXG4vLyAgICAgLy8gICAgIG1ldGhvZCxcclxuLy8gICAgIC8vICAgICBoZWFkZXJzLFxyXG4vLyAgICAgLy8gICAgIGRhdGE6IG1ldGhvZCA9PT0gJ0dFVCcgPyB1bmRlZmluZWQgOiBkYXRhLFxyXG4vLyAgICAgLy8gICAgIHBhcmFtczogT2JqZWN0LmFzc2lnbihtZXRob2QgPT09ICdHRVQnID8gZGF0YSA6IHt9LCBwYXJhbXMpXHJcbi8vICAgICAvLyB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4vLyAgICAgLy9cclxuLy8gICAgIC8vICAgICBsZXQgcmVxID0ge1xyXG4vLyAgICAgLy8gICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5kYXRhLnJlc3AsXHJcbi8vICAgICAvLyAgICAgICAgIGRhdGE6IHJlc3BvbnNlLmRhdGEucGFyYW1zXHJcbi8vICAgICAvLyAgICAgfVxyXG4vLyAgICAgLy8gICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVxKVxyXG4vLyAgICAgLy8gfSkuY2F0Y2goZXJyID0+IHtcclxuLy8gICAgIC8vICAgICAvLyDor7fmsYLlh7rplJlcclxuLy8gICAgIC8vICAgICBUb2FzdC5pbmZvKCdyZXF1ZXN0IGVycm9yLCBIVFRQIENPREU6ICcgKyBlcnIucmVzcG9uc2Uuc3RhdHVzKTtcclxuLy8gICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcclxuLy8gICAgIC8vIH0pO1xyXG4vLyAgICAgLy8gfVxyXG5cclxuLy8gfVxyXG5cclxuLy8g5LiA5Lqb5bi455So55qE6K+35rGC5pa55rOVXHJcbmV4cG9ydCBjb25zdCBnZXQgPSAodXJsLCBkYXRhLCBwYXJhbSA9IHt9KSA9PiB7XHJcbiAgICBsZXQgcGFyYW1BbGwgPSBPYmplY3QuYXNzaWduKHtmb3JDaHNwOiB0cnVlLCBlbmNyeXB0OiB0cnVlLCBjYWNoZTogZmFsc2UsIGJ5QWpheDogZmFsc2V9LCBwYXJhbSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdChPYmplY3QuYXNzaWduKHt1cmwsIGRhdGF9LCBwYXJhbUFsbCkpXHJcbn07XHJcbmV4cG9ydCBjb25zdCBwb3N0ID0gKHVybCwgZGF0YSwgcGFyYW0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IHBhcmFtQWxsID0gT2JqZWN0LmFzc2lnbih7Zm9yQ2hzcDogdHJ1ZSwgZW5jcnlwdDogdHJ1ZSwgY2FjaGU6IGZhbHNlLCBieUFqYXg6IGZhbHNlfSwgcGFyYW0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QoT2JqZWN0LmFzc2lnbih7bWV0aG9kOiAnUE9TVCcsIHVybCwgZGF0YX0sIHBhcmFtQWxsKSlcclxufTtcclxuZXhwb3J0IGNvbnN0IHB1dCA9ICh1cmwsIGRhdGEpID0+IHJlcXVlc3Qoe21ldGhvZDogJ1BVVCcsIHVybCwgZGF0YX0pO1xyXG5leHBvcnQgY29uc3QgZGVsID0gKHVybCwgZGF0YSkgPT4gcmVxdWVzdCh7bWV0aG9kOiAnREVMRVRFJywgdXJsLCBkYXRhfSk7XHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICog5Yqf6IO95Ye95pWw5Yy6XHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICog5bCGVVJM5Lit55qEc2VhcmNoIOWtl+espuS4siDovazmjaLmiJAg5a+56LGhXHJcbiAqIEBwYXJhbSBzZWFyY2hcclxuICogQHJldHVybnMge3t9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldFNlYXJjaFBhcmFtID0gKHNlYXJjaCkgPT4ge1xyXG4gICAgaWYgKCEhc2VhcmNoKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IHNlYXJjaC5zbGljZSgxKTtcclxuICAgICAgICBsZXQgYXJyYXkgPSBzdHIuc3BsaXQoXCImXCIpO1xyXG4gICAgICAgIGxldCBvYmogPSB7fTtcclxuICAgICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbSA9IGl0ZW0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICBvYmpbcGFyYW1bMF1dID0gcGFyYW1bMV07XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICogY29kb3ZhIOaPkuS7tuiwg+eUqOWMulxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcblxyXG4vLyDlkK/lgZzmlLbmrL7noIFcclxuZXhwb3J0IGZ1bmN0aW9uIHNldFhpYW9XZWlQYXkocGFyYW0sIHN1YywgZXJyKSB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5zZXRYaWFvV2VpUGF5KHBhcmFtLCBzdWMsIGVycik7XHJcbn1cclxuXHJcbi8v5bCP5b6uYXVkaW9cclxuZXhwb3J0IGNvbnN0IHNldFhpYW9XZWlBdWRpbyA9IChwYXJhbSwgc3VjLCBlcnIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnNldFhpYW9XZWlBdWRpbyhwYXJhbSwgc3VjLCBlcnIpO1xyXG59XHJcbmV4cG9ydCBjb25zdCBnZXRYaWFvV2VpQXVkaW8gPSAoc3VjLCBlcnIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmdldFhpYW9XZWlBdWRpbyhzdWMsIGVycik7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0b2FzdCA9IChtcykgPT4ge1xyXG4gICAgVG9hc3QuaW5mbyhtcywgMik7XHJcbn1cclxuLyoqXHJcbiAqIOiuvue9rumhtumDqGJhclxyXG4gKiBAcGFyYW0gdGl0bGUg6aG16Z2i5ZCN56ewXHJcbiAqIEBwYXJhbSByaWdodEJhciDlj7PkvqfmjInpkq7lkI3np7BcclxuICogQHBhcmFtIHJpZ2h0Q2FsbGJhY2sg5Y+z5L6n5oyJ6ZKu5Zue6LCDXHJcbiAqIEBwYXJhbSByaWdodEJhckltZyDlj7PkvqfmjInpkq7lm77niYdcclxuICovXHJcbmV4cG9ydCBjb25zdCBiZWZvcmVFbnRlclJvdXRlciA9ICh0aXRsZSA9IFwiXCIsIHJpZ2h0QmFyID0gXCJcIiwgcmlnaHRDYWxsYmFjayA9IG51bGwsIHJpZ2h0QmFySW1nID0gbnVsbCkgPT4ge1xyXG4gICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUodGl0bGUpXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u56qX5Y+j5Y+z5L6n5oyJ6ZKuXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlIOWbvuagh+agh+mimFxyXG4gICAgICAgICAqIEBwYXJhbSBpbWFnZSDlm77moIfmlofku7ZcclxuICAgICAgICAgKiBAcGFyYW0gaGFuZGxlciDngrnlh7vlm57osIPlh73mlbBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoISFyaWdodENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24ocmlnaHRCYXIsIHJpZ2h0QmFySW1nLCByaWdodENhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJSaWdodEJ1dHRvbihcIlwiLCBudWxsLCBudWxsKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIOmAmuefpeWuouaIt+err+S/ruaUueeKtuaAgVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1jY1N0YXRlQ2hhbmdlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5tY2NTdGF0ZUNoYW5nZWQoKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNlbmRRckNvZGUgPSAocGFyYW1zLCBzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmiavmj4/mnaHnoIHlkozkuoznu7TnoIFcclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3NcclxuICAgICAgICAgKiBAcGFyYW0gZmFpbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5zY2FuUVJDb2RlKHBhcmFtcywgc3VjY2VzcywgZmFpbClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjbG9zZVdlYlZpZXcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5jbG9zZVdlYlZpZXcoKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHZlcmlmeVBheVB3ZCA9IChwYXJhbSwgc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAudmVyaWZ5UGF5UHdkKHBhcmFtLCBzdWNjZXNzLCBmYWlsKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVdlYlZpZXcgPSAodXJsLCBwYXJhbXMgPSBudWxsLCB0aXRsZSA9ICcnLCBpc0ZpbmlzaCA9IFwiMVwiKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5jcmVhdGVXZWJWaWV3KHVybCwgcGFyYW1zLCB0aXRsZSwgaXNGaW5pc2gpXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFVzZXJEZXRhaWxJbmZvID0gKHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5nZXRVc2VyRGV0YWlsSW5mbyhzdWNjZXNzLCBmYWlsKVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5bCGY2F2YXMg5L+d5a2Y5Yiw5pys5Zyw55u45YaMXHJcbiAqIEBwYXJhbSBjYW52YXNcclxuICovXHJcbmV4cG9ydCBjb25zdCBzYXZlUWNvZGUgPSAoY2FudmFzKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciB1aSA9IFVQLlcuVUkgfHwge307XHJcbiAgICB2YXIgcGljVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFwcC5sb2dFdmVudCgnc2F2ZVBpY3R1cmVfTmV3WWVhckFjdCcpO1xyXG4gICAgICAgIGFwcC5zYXZlUGljVG9Mb2NhbCh7XHJcbiAgICAgICAgICAgIHVybDogcGljVXJsICYmIHBpY1VybC5zdWJzdHIoMjIpXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB1aS5zaG93VG9hc3RXaXRoUGljKCflt7Lkv53lrZjliLDns7vnu5/nm7jlhownKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgIGlmIChtc2cgPT0gJ3VwZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dBbGVydCgn6K+35Y2H57qn5Yiw5pyA5paw5a6i5oi356uvJywgZnVuY3Rpb24gKCkgeyAvLyDljrvljYfnuqdcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ1llcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW52LmlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL2l0dW5lcy5hcHBsZS5jb20vY24vYXBwL2lkNjAwMjczOTI4P2NvZGU9bmV3WWVhckFjdGl2aXR5JztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b3VodWkuOTU1MTYuY29tL2FwcC9hcHAvc29mdHdhcmUvdW5pb25wYXktd2FsbGV0LXYyLmFwaz9jb2RlPW5ld1llYXJBY3Rpdml0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLm9wZW5Ccm93c2VyKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdObycpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ+mprOS4iuWNh+e6pycsICfnqI3lkI7lho3or7QnLCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93VG9hc3QobXNnIHx8ICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2hhcmUgPSAodGl0bGUsIGRlc2MsIGltZ1VSTCwgcGFnZVVSbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgZW52ID0gVVAuVy5FbnYgfHwge307XHJcblxyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmmL7npLrliIbkuqvpnaLmnb9cclxuICAgICAgICAgKiDlpoLmnpzmiYDmnInmuKDpgZPkvb/nlKjnm7jlkIznmoTliIbkuqvlhoXlrrnliJnku4XloavlhplwYXJhbXPljbPlj6/vvIxcclxuICAgICAgICAgKiDlpoLmnpzpnIDopoHmoLnmja7kuI3lkIzmuKDpgZPlrprliLbliIbkuqvlhoXlrrnvvIzliJnlj69wYXJhbXPnlZnnqbrvvIzlnKhzaGFyZUNhbGxiYWNr5Lit6L+U5Zue5oyH5a6a5rig6YGT55qE5YiG5Lqr5YaF5a65XHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtcyDliIbkuqvlj4LmlbBcclxuICAgICAgICAgKiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgdGl0bGXvvJog5YiG5Lqr5qCH6aKYXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBkZXNjOiDliIbkuqvmkZjopoFcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHBpY1VybO+8muWIhuS6q+Wbvuagh1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgc2hhcmVVcmzvvJror6bmg4XlnLDlnYBcclxuICAgICAgICAgKiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAqIEBwYXJhbSBzaGFyZUNhbGxiYWNrIOWIhuS6q+aXtuWbnuiwg1xyXG4gICAgICAgICAqICAgICAgICAgICAgICBjaGFubmVs77yae1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgMO+8muefreS/oVxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgMe+8muaWsOa1quW+ruWNmlxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgM++8muW+ruS/oeWlveWPi1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNO+8muW+ruS/oeaci+WPi+WciFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNe+8mlFR5aW95Y+LXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA277yaUVHnqbrpl7RcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDfvvJrlpI3liLbpk77mjqVcclxuICAgICAgICAgKiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAqICAgICAgICAgICAgICBkYXRhOiDpu5jorqTliIbkuqvmlbDmja5cclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuc2hvd1NoYXJlUGFuZWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIGRlc2M6IGRlc2MsXHJcbiAgICAgICAgICAgIHBpY1VybDogaW1nVVJMLFxyXG4gICAgICAgICAgICBzaGFyZVVybDogcGFnZVVSbCAgLy8gdG9kbyDmma7pgJrliIbkuqtcclxuICAgICAgICB9LCBudWxsKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTlrprkvY3vvIzpppblhYjpgJrov4dHUFMg5a6a5L2N77yM5aaC5p6c5a6a5L2N5aSx6LSl77yM6YCa6L+H5o6l5Y+jZ2V0Q2l0eSzliKnnlKhJUOWcsOWdgOi/m+ihjOWumuS9je+8jOWmguaenOi/mOaYr+Wksei0pe+8jOmAmui/h+aPkuS7tuiOt+WPluWuouaIt+err+W3puS4iuinkueahOWfjuW4guS/oeaBr++8jOS+neeEtuWksei0pem7mOiupOepv2NpdHlDZDozMTAwMDAg5Luj6KGo5LiK5rW35biCXHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRMb2NhdGlvbkluZm8gPSAoY2FsbGJhY2syKSA9PiB7XHJcbiAgICBjb25zdCB1aSA9IFVQLlcuVUk7XHJcbiAgICB1aS5zaG93TG9hZGluZygpO1xyXG4gICAgbGV0IGNhbGxiYWNrID0gKGRhdGEpID0+IHtcclxuICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbiAgICAgICAgY2FsbGJhY2syKGRhdGEpXHJcbiAgICB9XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhcHAuZ2V0Q3VycmVudExvY2F0aW9uSW5mbygoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBhbGVydChKU09OLnN0cmluZ2lmeShkYXRhKSlcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9LCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2UoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY21kOiBcIi9cIiArIENPTkZJRy5SRVNULmdldENpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGF0aDogXCJodHRwOi8vMTcyLjIxLjMzLjU2OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIitDT05GSUcuUkVTVC5nZXRDaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcIjIuMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IFwiMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHRydWUsIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhLnBhcmFtcylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hOYXRpdmVEYXRhKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaE5hdGl2ZURhdGEoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoTmF0aXZlRGF0YSA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluWuouaIt+err+S/oeaBr1xyXG4gICAgICAgICAqIEBwYXJhbSBzdWNjZXNzXHJcbiAgICAgICAgICogQHBhcmFtIGZhaWxcclxuICAgICAgICAgKiBAcGFyYW0gdHlwZSAw77ya5Z+O5biC5L+h5oGvY2l0eUNk77ybMe+8mue7j+e6rOW6pu+8mzXvvJpVc2VySWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuZmV0Y2hOYXRpdmVEYXRhKDAsIChkYXRhID0ge30pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgICAgICAgIGNpdHlDZDogXCIzMTAwMDBcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcbmV4cG9ydCBjb25zdCBzYXZlUGljVG9Mb2NhbCA9IChjYW52YXMsIHJlc29sdmUpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIHVpID0gVVAuVy5VSSB8fCB7fTtcclxuICAgIHZhciBwaWNVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLnNhdmVQaWNUb0xvY2FsKHtcclxuICAgICAgICAgICAgdXJsOiBwaWNVcmwgJiYgcGljVXJsLnN1YnN0cigyMilcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8v5oiQ5YqfXHJcbiAgICAgICAgICAgICEhcmVzb2x2ZSAmJiByZXNvbHZlKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICB9LCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cgPT0gJ3VwZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dBbGVydCgn6K+35Y2H57qn5Yiw5pyA5paw5a6i5oi356uvJywgZnVuY3Rpb24gKCkgeyAvLyDljrvljYfnuqdcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ1llcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW52LmlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL2l0dW5lcy5hcHBsZS5jb20vY24vYXBwL2lkNjAwMjczOTI4P2NvZGU9bmV3WWVhckFjdGl2aXR5JztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b3VodWkuOTU1MTYuY29tL2FwcC9hcHAvc29mdHdhcmUvdW5pb25wYXktd2FsbGV0LXYyLmFwaz9jb2RlPW5ld1llYXJBY3Rpdml0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLm9wZW5Ccm93c2VyKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdObycpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ+mprOS4iuWNh+e6pycsICfnqI3lkI7lho3or7QnLCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAhIXJlc29sdmUgJiYgcmVzb2x2ZShcImZhaWxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVUZXh0Q2FudmFzZSA9ICh0ZXh0LCBjb2xvciwgbG9uZyA9IDY4NCwgc2hvdCA9IDYwKSA9PiB7XHJcblxyXG4gICAgbGV0IHJlbTJweCA9ICh2YWwpID0+IHtcclxuICAgICAgICB2YXIgY1dpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcbiAgICAgICAgcmV0dXJuIHZhbCAqIGNXaWR0aCAvIDc1MFxyXG4gICAgfVxyXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Q2FudmFzJyk7XHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgLy/oqK3nva7nlavkvYjnmoTlr6zpq5hcclxuICAgIC8vIHZhciBiZ1dpZHRoID0gcmVtMnB4KGxvbmcpO1xyXG4gICAgLy8gdmFyIGJnSGVpZ2h0ID0gcmVtMnB4KHNob3QpO1xyXG5cclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgc2hvdCk7XHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBsb25nKTtcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBjdHgucm90YXRlKC05MCAqIE1hdGguUEkgLyAxODApO1xyXG4gICAgdmFyIHRleHQgPSB0ZXh0O1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcclxuICAgIGxldCBmb250U2l6ZSA9IHNob3Q7XHJcbiAgICBjdHguZm9udCA9IGZvbnRTaXplICsgJ3B4IEFpcmFsJztcclxuICAgIHdoaWxlIChjdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGggPiBsb25nKSB7XHJcbiAgICAgICAgZm9udFNpemUtLTtcclxuICAgICAgICBjdHguZm9udCA9IGZvbnRTaXplICsgJ3B4IEFpcmFsJztcclxuICAgIH1cclxuICAgIGN0eC5maWxsVGV4dCh0ZXh0LCAtbG9uZywgZm9udFNpemUpO1xyXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog55Sf5oiQ5Zu+54mH5bm25L+d5a2Y5Yiw55u45YaMXHJcbiAqIEBwYXJhbSBiZ3VybCDog4zmma/lm77niYfnmoTlnLDlnYBcclxuICogQHBhcmFtIHFyY29kZVVSTCDkuoznu7TnoIHnmoTlnLDlnYBcclxuICogQHBhcmFtIHFyY29kZVdkQW5kSGcg5LqM57u056CB55qE5a695bqmXHJcbiAqIEBwYXJhbSB4V2lkdGgg5LqM57u056CB6Led56a75bem5LiK6KeS55qEIOKGkiDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHlIZWlnaHQg5LqM57u056CB6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHRleHRiZ1VSTCDliqDlhaXnlLvluIPnmoTlm77niYfnmoRVUkxcclxuICogQHBhcmFtIHhUZXh0V2lkdGgg5Yqg5YWl55S75biD55qE5Zu+54mH6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHlUZXh0SGVpZ2h0IOWKoOWFpeeUu+W4g+eahOWbvueJh+i3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnZhc0FuZFNhdmVQaG90byA9IChjYW52YXNPYmosIHJlc29sdmUpID0+IHtcclxuICAgIGxldCB7Ymd1cmwsIHFyY29kZVVSTCwgcXJjb2RlV2RBbmRIZywgeFdpZHRoLCB5SGVpZ2h0LCB0ZXh0YmdVUkwsIHhUZXh0V2lkdGgsIHlUZXh0SGVpZ2h0fSA9IGNhbnZhc09iajtcclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbW9uQ2FudmFzV3JhcHBlcicpO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTnlLvluIPlhoXlrrlcclxuICAgICAqL1xyXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoXHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuc3JjID0gYmd1cmw7XHJcbiAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvL+ioree9rueVq+S9iOeahOWvrOmrmFxyXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgaW1nLndpZHRoKTtcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBpbWcuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy/lnKjnlavluIPkuIrnlavog4zmma/lnJZcclxuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XHJcblxyXG4gICAgICAgIGlmICghIXRleHRiZ1VSTCkge1xyXG4gICAgICAgICAgICBsZXQgdGV4dFVyaSA9IHRleHRiZ1VSTDtcclxuICAgICAgICAgICAgdmFyIHRleHRJbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgdGV4dEltZy5zcmMgPSB0ZXh0VXJpO1xyXG4gICAgICAgICAgICB0ZXh0SW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGV4dEltZywgeFRleHRXaWR0aCwgeVRleHRIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S6jOe2reeivOWclueJh+Wkp+Wwj1xyXG4gICAgICAgIHZhciBxcmNvZGVXaWR0aEFuZEhlaWdodCA9IHFyY29kZVdkQW5kSGc7XHJcbiAgICAgICAgLy/muIXpmaTkuoznu7TnoIFcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHZhciBxcmNvZGUgPSBuZXcgUVJDb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLCB7XHJcbiAgICAgICAgICAgIHRleHQ6IHFyY29kZVVSTCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBxcmNvZGVXaWR0aEFuZEhlaWdodCxcclxuICAgICAgICAgICAgd2lkdGg6IHFyY29kZVdpZHRoQW5kSGVpZ2h0LFxyXG4gICAgICAgICAgICBjb3JyZWN0TGV2ZWw6IFFSQ29kZS5Db3JyZWN0TGV2ZWwuTFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBxcmNvZGVJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF07XHJcbiAgICAgICAgcXJjb2RlSW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy/nlavkuozntq3norznmoTlnJbniYdcclxuICAgICAgICAgICAgbGV0IHFyY29kZUR4ID0geFdpZHRoLCBxcmNvZGVEeSA9IHlIZWlnaHQ7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UocXJjb2RlSW1nLCBxcmNvZGVEeCwgcXJjb2RlRHkpO1xyXG4gICAgICAgICAgICAvLyByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIHNhdmVQaWNUb0xvY2FsKGNhbnZhcywgcmVzb2x2ZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0LmpzIiwiY29uc3QgY29uZmlnID0ge1xyXG4gICAgUkVTVDoge1xyXG4gICAgICAgIGFwcGx5TWNjOiBcImNvbGxlY3Rpb25Db2RlL2FwcGx5TWNjXCIsIC8vMi40LjTnlLPor7fmlLbmrL7noIHmjqXlj6NcclxuICAgICAgICBnZXRNY2NDYXJkTGlzdDogXCJjb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiLCAvLzIuNC4y5ZWG5oi35pS25qy+56CB5Y2h5YiX6KGo5o6l5Y+jXHJcbiAgICAgICAgYXBwbHlNYXQ6IFwiY29sbGVjdGlvbkNvZGUvYXBwbHlNYXRcIiwgLy/nlLPor7fnianmlpnmjqXlj6NcclxuICAgICAgICBnZXRNY2hudEFuZEFyZWFJbmY6IFwibWNobnQvZ2V0TWNobnRBbmRBcmVhSW5mLnNqc29uXCIsIC8v5ZWG5oi357G75Z6L5Y+K5Zyw5Yy65YiX6KGo5p+l6K+iXHJcbiAgICAgICAgdXBncmFkZU1jYzogXCJjb2xsZWN0aW9uQ29kZS91cGdyYWRlTWNjXCIsIC8vMi40LjbljYfnuqfmlLbmrL7noIHmjqXlj6MsXHJcbiAgICAgICAgZ2V0QWRkckxpc3Q6IFwiYWRkcmVzcy9nZXRBZGRyTGlzdFwiICwgLy8yLjQuMTMg6I635Y+W5pS26LSn5Zyw5Z2A5YiX6KGoXHJcbiAgICAgICAgZGVsZXRlQWRkcmVzczogXCJhZGRyZXNzL2RlbGV0ZUFkZHJlc3NcIiAsIC8vMi40LjEyIOWIoOmZpOaUtui0p+WcsOWdgFxyXG4gICAgICAgIGVkaXRBZGRyZXNzOiBcImFkZHJlc3MvZWRpdEFkZHJlc3NcIiwgLy8yLjQuMTEg5L+u5pS55pS26LSn5Zyw5Z2ALFxyXG4gICAgICAgIG5ld0FkZHJlc3M6IFwiYWRkcmVzcy9uZXdBZGRyZXNzXCIsIC8vMi40LjEwIOaWsOWinuaUtui0p+WcsOWdgFxyXG4gICAgICAgIG1jaG50T3BlciA6XCJtY2hudC9tY2hudE9wZXJcIiwgLy8yLjIuMiDlupfpk7rkv6Hmga/mm7TmlrBcclxuICAgICAgICBnZXRMaW1pdEF0SW5mbzpcIm1jaG50L2dldExpbWl0QXRJbmZvXCIsIC8v6I635Y+W5pS25qy+6ZmQ6aKdXHJcbiAgICAgICAgc2V0TWNjT25PZmY6XCJjb2xsZWN0aW9uQ29kZS9zZXRNY2NPbk9mZlwiLCAvL+WBnOatouWSjOWQr+eUqOS7mOasvueggeWAn+WPo1xyXG4gICAgICAgIGdldE1jaG50RGV0YWlsOlwibWNobnQvbWNobnREZXRhaWxcIiwgLy8yLjIuMSDojrflj5blupfpk7ror6bmg4XpobXpnaJcclxuICAgICAgICAvLyB1cGdyYWRlTWNjOiBcImNvbGxlY3Rpb25Db2RlL3VwZ3JhZGVNY2NcIiwgLy8yLjQuNuWNh+e6p+aUtuasvueggeaOpeWPo1xyXG4gICAgICAgIGdldFRvZGF5VHJhbnM6XCJ0cmFuL2dldFRvZGF5VHJhbnNcIiwvLzIuMS4zLy/ku4rml6XorqLljZXmjqXlj6NcclxuICAgICAgICBnZXRUb2RheUluY29tZTpcInRyYW4vZ2V0VG9kYXlJbmNvbWVcIiwvLzIuMS4x5ZWG5oi35pyN5Yqh6aaW6aG15LuK5pel5pS25qy+5o6l5Y+jfn5+fn5+fn5cclxuICAgICAgICBnZXRIaXN0b3J5SW5jb21lOlwidHJhbi9nZXRIaXN0b3J5SW5jb21lXCIsLy8yLjEuMuWOhuWPsuaUtuasvuaOpeWPo1xyXG4gICAgICAgIGdldEhpc3RvcnlUcmFuczpcInRyYW4vZ2V0SGlzdG9yeVRyYW5zXCIsLy8yLjEuNOWOhuWPsuiuouWNleaOpeWPo1xyXG4gICAgICAgIGdldExvZ2lzdGljc1N0OlwibWF0ZXJpZWwvZ2V0TG9naXN0aWNzU3RcIiwvLzIuMy4z54mp5rWB6K+m5oOF5o6l5Y+j5p+l6K+iXHJcbiAgICAgICAgZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bTpcInRyYW4vZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bVwiLC8vMi4xLjXljZXnrJTorqLljZXmn6Xor6LmjqXlj6NcclxuICAgICAgICBnZXRBdWRpdEluZm86XCJjb2xsZWN0aW9uQ29kZS9nZXRBdWRpdEluZm9cIiwvLzIuNC4xNOS/oeeUqOWNoeWNh+e6p+WuoeaguOe7k+aenOafpeivolxyXG4gICAgICAgIHVwZGF0ZU1jY0NhcmQ6XCJjb2xsZWN0aW9uQ29kZS91cGRhdGVNY2NDYXJkXCIsLy8yLjQuOeabtOaNouaUtuasvuWNoeaOpeWPo1xyXG4gICAgICAgIGdldFVwZ3JhZGVTdDpcIm1jaG50L2dldFVwZ3JhZGVTdFwiLC8v5p+l6K+i5ZWG5oi35piv5ZCm5Y2H57qn5L+h55So5Y2h5pS25qy+XHJcbiAgICAgICAgZ2V0TWNjVHJhbnNOdW06J2NvbGxlY3Rpb25Db2RlL2dldE1jY1RyYW5zTnVtJywvL+iOt+WPluiwg+WPluaUr+S7mOaOp+S7tueahFRO5Y+3XHJcbiAgICAgICAgZ2V0TWF0ZXJpZWxJbmZvTGlzdDpcImNvbGxlY3Rpb25Db2RlL2dldE1hdGVyaWVsSW5mb0xpc3RcIiwvLzIuNC4z54mp5paZ5L+h5oGv5YiX6KGo5o6l5Y+jXHJcbiAgICAgICAgdXNlckluZm86XCIvYXBwL2luQXBwL3VzZXIvZ2V0XCIsLy/ojrflj5bnlKjmiLfkv6Hmga9cclxuICAgICAgICBpc0JsYWNrOlwic2Nhbi9pc0JsYWNrXCIsLy8yLjEuNeaUtumTtuWRmOaYr+WQpuWcqOm7keWQjeWNlVxyXG4gICAgICAgIGlzQXBwbHk6XCJzY2FuL2lzQXBwbHlcIiwvLzIuMS405piv5ZCm5bey57uP55Sz6K+357qi5YyF56CBXHJcbiAgICAgICAgc2hhcmVMaW5rOlwic2Nhbi9zaGFyZUxpbmtcIiwvLzIuMS4255Sf5oiQ57qi5YyF56CB6ZO+5o6lXHJcbiAgICAgICAgcmVjbWRSZWNvcmQ6XCJzY2FuL3JlY21kUmVjb3JkXCIsLy/mjqjojZDlhbPns7vorrDlvZVcclxuICAgICAgICBnZXRMb2dpc3RpY3NMaXN0OlwibWF0ZXJpZWwvZ2V0TG9naXN0aWNzTGlzdFwiLC8v6I635Y+W54mp5paZ5Y6G5Y+y6K6i5Y2VXHJcbiAgICAgICAgZ2V0UmV3YXJkTGlzdDpcInNjYW4vZ2V0UmV3YXJkTGlzdFwiLC8vMi4xLjfmn6Xor6LmlLbpk7blkZjotY/ph5HmmI7nu4borrDlvZVcclxuICAgICAgICBnZXRQcm90b2NvbEluZm86XCJjb2xsZWN0aW9uQ29kZS9nZXRQcm90b2NvbEluZm9cIiwvL+WVhuaIt+WNh+e6p+afpeivouaYvuekuuWNj+iurueahOWQjeensOWSjOWNj+iurueahOWcsOWdgFxyXG4gICAgICAgIGdldENpdHk6XCJyZWdpb24vZ2V0Q2l0eVwiLC8v6YCa6L+HSVDlnLDlnYDojrflj5blnLDlnYDlrprkvY1cclxuICAgICAgICBnZXRRclVybDpcImNvbGxlY3Rpb25Db2RlL2dldFFySW5mb1wiLy8yLjEuMeiOt+WPlueUqOaIt+aUtuasvueggVVSTFxyXG4gICAgfSxcclxuICAgIFNUQVRVU0NPREU6IHtcclxuICAgICAgICBTVUNDRVNTOlwiMDBcIlxyXG4gICAgfSxcclxuICAgIENPTlNUX0RBVEE6e1xyXG4gICAgICAgIGltZ2VTaXplOlwiMzAwXCJcclxuICAgIH0sXHJcbiAgICBDQUNIRUtFWTp7XHJcbiAgICAgICAgZ2V0TWNjQ2FyZExpc3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1jb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLWNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtbWNobnQvZ2V0VXBncmFkZVN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtbWNobnQvZ2V0VXBncmFkZVN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE1jaG50RGV0YWlsOntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtbWNobnQvbWNobnREZXRhaWxcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1tY2hudC9tY2hudERldGFpbFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0FwcGx5OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtc2Nhbi9pc0FwcGx5XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtc2Nhbi9pc0FwcGx5XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEFkZHJMaXN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtYWRkcmVzcy9nZXRBZGRyTGlzdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLWFkZHJlc3MvZ2V0QWRkckxpc3RcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCJpbXBvcnQgSW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIjtcclxuXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDlj6rkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICog5YWI6K+757yT5a2Y77yM5ZCM5q2l5b6A5ZCO5Y+w5Y+R6K+35rGC77yM6K+35rGC5oql5paH5Zue5p2l5ZCO5Yi35paw57yT5a2Y5Y+K6aG16Z2iXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UgPSAodXBkYXRlLHJvbGxLZXksc2Vjb25kS2V5KSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbi8vICAgICAgICAgICAgIHJvbGxLZXksXHJcbi8vICAgICAgICAgICAgIHNlY29uZEtleVxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgdXBkYXRlOiB1cGRhdGUsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOS4jeaUr+aMgSBzdyAgICzmsLjkuYXnt6nlrZhcclxuLy8gICogQHR5cGUge3tjYWNoZTogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFufX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUxvbmdUaW1lID0gKHJvbGxLZXksIHNlY29uZEtleSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgICAgIHJvbGxLZXksXHJcbi8vICAgICAgICAgICAgIHNlY29uZEtleVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5Y+q5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDHliIbpkp/lhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UxbWluID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMzBtaW4gPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMzAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTFob3VyID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICo2MCoxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UyaG91ciA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAyICogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuXHJcbi8vXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UyNGRpYW4gPSAoKSA9PiB7XHJcbi8vXHJcbi8vICAgICBsZXQgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbi8vICAgICBsZXQgdGVtb3Jyb3cgPSBuZXcgRGF0ZSgpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0SG91cnMoMjMpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0TWludXRlcyg1OSk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRTZWNvbmRzKDU5KTtcclxuLy8gICAgIGxldCB0ZW0gPSB0ZW1vcnJvdy5nZXRUaW1lKCk7XHJcbi8vICAgICBsZXQgdmFsaWRhdGVUaW1lID0gdGVtIC0gbm93ICsgMTAwMCAqIDYwXHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICAgICAgdmFsaWRhdGVUaW1lOiB2YWxpZGF0ZVRpbWUsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIHdvcmtib3jnmoTnrZbnlaUgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICrkuLpnZXTor7fmsYLvvIzkuI3liqDlr4ZcclxuLy8gICrmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAq5YWI6K+757yT5a2Y77yM5ZCM5pe25b6A5ZCO5Y+w5Y+R6K+35rGC77yM6K+35rGC5oql5paH5Zue5p2l5ZCO5Yi35paw57yT5a2Y5Y+K6aG16Z2iXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBjYWNoZTogYm9vbGVhbiwgYXN5bmM6IGJvb2xlYW59fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlID0gKHVwZGF0ZSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBieUFqYXg6IGZhbHNlLC8v5aaC5p6c6KaB5pSv5oyBc3cg5bCx5LiN6ZyA5L2/55SoYWpheFxyXG4vLyAgICAgICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICB1cGRhdGU6IHVwZGF0ZVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDMw5YiG6ZKf5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDMwbWluID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMzAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMeWwj+aZguWGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QxaG91ciA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MmhvdXIgPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAyICogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLyoqXHJcbiAqIOivpeetlueVpeaYr+S4gOWumuaXtumXtOWGheS4jeWQkeWQjuWPsOivt+axguaVsOaNru+8jCDlpoLmnpzlnKjorr7lpIfkuIrmlK/mjIFzd+WImeS9v+eUqHN3LOWQpuWImeS9v+eUqCBsb2NhbFN0b3JhZ2VcclxuICogQHBhcmFtIHRpbWUgIOimgee8k+WtmOeahOaXtumXtCDljZXkvY3mmK/mr6vnp5JcclxuICogQHJldHVybnMge3tieUFqYXg6IGJvb2xlYW4sIGZvckNoc3A6IGJvb2xlYW4sIGVuY3J5cHQ6IGJvb2xlYW4sIGNhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7dmFsaWRhdGVUaW1lOiAqfX19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2FjaGVGaXJzdCA9KHRpbWUpPT57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGJ5QWpheDogdHJ1ZSxcclxuICAgICAgICBmb3JDaHNwOmZhbHNlLFxyXG4gICAgICAgIGVuY3J5cHQ6ZmFsc2UsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICB2YWxpZGF0ZVRpbWU6dGltZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogIOivpeetlueVpeaYr+S4gOWumuaXtumXtOWGheS4jeWQkeWQjuWPsOivt+axguaVsOaNru+8jOa3u+WKoOe8k+WtmOWPquWcqGxvY2Fsc3RvcmFnZeS4rVxyXG4gKiBAcGFyYW0gdGltZSAg6KaB57yT5a2Y55qE5pe26Ze0IOWNleS9jeaYr+avq+enklxyXG4gKiBAcGFyYW0gcm9sbEtleSAgIOmdnuW/heWhqyDlpoLmnpzlkI7mnJ/opoHliKDpmaTov5nkuKrnvJPlrZjvvIzov5nloavlhpnov5lrZXlcclxuICogQHBhcmFtIHNlY29uZEtleSAg6Z2e5b+F5aGrIOWmguaenOWQjuacn+imgeWIoOmZpOi/meS4que8k+WtmO+8jOi/meWhq+WGmei/mWtleVxyXG4gKiBAcmV0dXJucyB7e2NhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7bmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6ICosIHJvbGxLZXk6ICosIHNlY29uZEtleTogKn19fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3RTdG9yYWdlID0odGltZSxyb2xsS2V5LCBzZWNvbmRLZXkpPT57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsaWRhdGVUaW1lOiB0aW1lLFxyXG4gICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXNwb25zZUZvcm1hdHRlciA9IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgcmVzID0ge1xyXG4gICAgICAgIHN0YXR1c0NvZGU6IGRhdGEucmVzcCxcclxuICAgICAgICBkYXRhOiBkYXRhLnBhcmFtcyxcclxuICAgICAgICBtc2c6IGRhdGEubXNnXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIOivpeetlueVpeaYr+WFiOivu+e8k+WtmO+8jOWQjOaXtuWQkeWQjuWPsOWPkemAgeivt+axgu+8jOivt+axguWbnuadpeWQjuWQjOatpeabtOaWsOe8k+WtmO+8jOWbnuiwg3VwZGF0ZSDlh73mlbDvvIxcclxuICogQHBhcmFtIHVwZGF0ZSDlv4Xloavmm7TmlrDpobXpnaLnmoTlm57osIPlh73mlbBcclxuICogQHBhcmFtIHJvbGxLZXkgIOmdnuW/heWhqyDorr7nva7nvJPlrZjnmoQgcm9sbGtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5IOmdnuW/heWhqyDorr7nva7nvJPlrZjnmoQgc2Vjb25kS2V5XHJcbiAqIEByZXR1cm5zIHt7Y2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHthc3luYzogYm9vbGVhbiwgcm9sbEtleTogKiwgc2Vjb25kS2V5OiAqfSwgdXBkYXRlOiAqfX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UgPSAodXBkYXRlLHJvbGxLZXksc2Vjb25kS2V5KSA9PiB7XHJcblxyXG4gICBsZXQgIHJlZnJlc2hEb21GdW5jPShyZXNwb25zZSk9PntcclxuICAgICAgIGxldCByZXE9cmVzcG9uc2VGb3JtYXR0ZXIocmVzcG9uc2UpXHJcbiAgICAgICAvLyDlsIbojrflj5bnmoTmlbDmja7lkoznvJPlrZjkuK3nmoTmlbDmja7ov5vooYzlr7nmr5RcclxuICAgICAgIGxldCBkYXRhRnJvbUNhY2hlID0ge307XHJcbiAgICAgICBVUC5XLlV0aWwuZ2V0RnJvbVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICB9LGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgIGlmKCAhIWRhdGEgKXtcclxuICAgICAgICAgICAgICAgIGRhdGFGcm9tQ2FjaGUgPSBkYXRhO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgfSlcclxuICAgICAgIGxldCBpc1NhbWVBdEFsbCA9IEltbXV0YWJsZS5pcyhJbW11dGFibGUuZnJvbUpTKHJlcSksSW1tdXRhYmxlLmZyb21KUyhkYXRhRnJvbUNhY2hlKSk7IC8v5pWw5o2u5piv5ZCm5a6M5YWo55u45ZCMXHJcbiAgICAgICBpZiggIWlzU2FtZUF0QWxsICl7IC8v5pWw5o2u5pyJ5Y+Y5YqoXHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXEpXHJcbiAgICAgICB9XHJcbiAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgZW5kT2ZTeW5jRnVuYzpmYWxzZSxcclxuICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IHJlZnJlc2hEb21GdW5jLFxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5Yig6ZmkbG9jYWxzdG9yYWdl5Lit55qE57yT5a2YXHJcbiAqIEBwYXJhbSByb2xsS2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXlcclxuICovXHJcbmV4cG9ydCBjb25zdCByZW1vdmVDYWNoZSA9IChyb2xsS2V5LCBzZWNvbmRLZXkpID0+IHtcclxuICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICByb2xsS2V5OiByb2xsS2V5LFxyXG4gICAgICAgIHNlY29uZEtleTogc2Vjb25kS2V5XHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIoOmZpOe8k+WtmOaIkOWKnycpXHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICBmdWxsOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZS5qcyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtdHJ5XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUHJvbWlzZScsIHsgJ3RyeSc6IGZ1bmN0aW9uIChjYWxsYmFja2ZuKSB7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYodGhpcyk7XG4gIHZhciByZXN1bHQgPSBwZXJmb3JtKGNhbGxiYWNrZm4pO1xuICAocmVzdWx0LmUgPyBwcm9taXNlQ2FwYWJpbGl0eS5yZWplY3QgOiBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlKShyZXN1bHQudik7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qc1xuLy8gbW9kdWxlIGlkID0gOGUwYzFkYjAwMDg1YzhhZDI1NWFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS50cnknKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLlByb21pc2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gOTczY2M4ZWVmYzU5OTMxZGU5NWVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGludm9rZSA9IHJlcXVpcmUoJy4vX2ludm9rZScpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuL19odG1sJyk7XG52YXIgY2VsID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBzZXRUYXNrID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhclRhc2sgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZCA9ICt0aGlzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0VGFzayB8fCAhY2xlYXJUYXNrKSB7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBpID0gMTtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2VzcycpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3coY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IGFhOTYzYjRjMjcxNDRmMDk0Y2NhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgRCkge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSBiNTBkODI0NTZlNTQ1ZGNjM2RkM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCBhcmdzLCB0aGF0KSB7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzXG4vLyBtb2R1bGUgaWQgPSBiNTgwYjk0YjE5NTg0MmNiZjJiMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBPYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBQcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG52YXIgaXNOb2RlID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYgKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKSBwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICBmbiA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKGlzTm9kZSkge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlciwgZXhjZXB0IGlPUyBTYWZhcmkgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIH0gZWxzZSBpZiAoT2JzZXJ2ZXIgJiYgIShnbG9iYWwubmF2aWdhdG9yICYmIGdsb2JhbC5uYXZpZ2F0b3Iuc3RhbmRhbG9uZSkpIHtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmIChQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSkge1xuICAgIC8vIFByb21pc2UucmVzb2x2ZSB3aXRob3V0IGFuIGFyZ3VtZW50IHRocm93cyBhbiBlcnJvciBpbiBMRyBXZWJPUyAyXG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICAgIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmICghaGVhZCkge1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IGJkZTBmNTdlOWI1NzlmOTQzZjg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0Jztcbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xuXG5mdW5jdGlvbiBQcm9taXNlQ2FwYWJpbGl0eShDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSBjMWI5NGUzZTk1ZWQ0MzVhZjU0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdQcm9taXNlJywgeyAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2Ygb25GaW5hbGx5ID09ICdmdW5jdGlvbic7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgfSA6IG9uRmluYWxseSxcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHRocm93IGU7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHlcbiAgKTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzXG4vLyBtb2R1bGUgaWQgPSBjMmUzNWJiZmY4MzMwOTU5NDNjMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanNcbi8vIG1vZHVsZSBpZCA9IGNiNzgzNzUyOTQ1NDJjMjRjNWJhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gZDE4MTBhZTUzMzJlMzZmZmEzYzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wicmJpaVwiOlwicmJpaVwiLFwicGFkMzJcIjpcInBhZDMyXCIsXCJpbnB1dFJvd0ludHJvZHVjZVwiOlwiaW5wdXRSb3dJbnRyb2R1Y2VcIixcIm10NTlcIjpcIm10NTlcIixcImlucHV0Um93XCI6XCJpbnB1dFJvd1wiLFwicm93TGFiZWxcIjpcInJvd0xhYmVsXCIsXCJyb3dJbmZvXCI6XCJyb3dJbmZvXCIsXCJtdDMyXCI6XCJtdDMyXCIsXCJyZWNvbW1lbmRcIjpcInJlY29tbWVuZFwifTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL1JlZEJhZ0lkSWRlbnRpZnkvUmVkQmFnSWRJZGVudGlmeS5zY3NzXG4vLyBtb2R1bGUgaWQgPSBkMWQ5YTI4YzZiMTUyMDAzOGZmNlxuLy8gbW9kdWxlIGNodW5rcyA9IDE1IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQge3JlY21kUmVkQ29kZX0gZnJvbSBcIi4vUmVkQmFnSWRJZGVudGlmeUFjdGlvbnNcIjtcclxuaW1wb3J0IFJlZEJhZ0lkSWRlbnRpZnkgZnJvbSBcIi4vUmVkQmFnSWRJZGVudGlmeVwiXHJcblxyXG5pbXBvcnQge2JlZm9yZUVudGVyUm91dGVyLCBnZXRTZWFyY2hQYXJhbSwgZ2V0VXNlckRldGFpbEluZm8sIHJlZ1Bob25lLCB0b2FzdH0gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RcIjtcclxuaW1wb3J0IHtVUERBVEVfU1RPUkVfU1RBVEV9IGZyb20gXCIuLi8uLi9zdG9yZS9hY3Rpb25cIjtcclxuXHJcblxyXG5jbGFzcyBSZWRCYWdJZElkZW50aWZ5Q29udGFpbmVycyBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBzZWFyY2g9Z2V0U2VhcmNoUGFyYW0odGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2gpXHJcbiAgICAgICAgbGV0IHtwaG9uZSxoaXN0b3J5fT10aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBpZighIXBob25lJiYhcmVnUGhvbmUudGVzdChwaG9uZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0b2FzdChcIuivt+i+k+WFpeWQiOazleeahOaJi+acuuWPt1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnlLPor7fnuqLljIXnoIFcclxuICAgICAgICAgKi9cclxuICAgICAgICByZWNtZFJlZENvZGUoaGlzdG9yeSxwaG9uZSxzZWFyY2gudHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dClcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlwiLCAgICAgICAvL+eUqOaIt+WQjVxyXG4gICAgICAgICAgICBJRDogXCJcIiwgICAgICAgICAvL+i6q+S7veivgeWPt1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuWtl+espuS4sueahOesrOS4gOWtl+espuWKoCpcclxuICAgICAqIEBwYXJhbSBzdHIg6KaB5YqgKueahOWtl+espuS4slxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0TWFza05hbWU9KHN0cik9PntcclxuICAgICAgICBsZXQgYXJyPVsuLi5zdHJdXHJcbiAgICAgICAgYXJyWzBdID0gXCIqXCJcclxuICAgICAgICByZXR1cm4gYXJyLmpvaW4oXCJcIilcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgYmVmb3JlRW50ZXJSb3V0ZXIoXCLnlLPor7fllYbmiLfnuqLljIXnoIFcIik7XHJcbiAgICAgICAgZ2V0VXNlckRldGFpbEluZm8oKGRhdGEpPT57XHJcbiAgICAgICAgICAgIGxldCByZWFsTmFtZT10aGlzLmdldE1hc2tOYW1lKGRhdGEucmVhbE5hbWUpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTpyZWFsTmFtZSxcclxuICAgICAgICAgICAgICAgIElEOmRhdGEubWFza0NlcnRJZFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPFJlZEJhZ0lkSWRlbnRpZnkgaGFuZGxlQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9ey4uLnRoaXMuc3RhdGV9ey4uLnRoaXMucHJvcHN9IC8+O1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBzdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGhvbmU6IHN0YXRlLmdldEluKFtcInJlY29tbWVuZFBob25lXCJdKVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBEaXNwYXRoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05pS5cmVkdXjkuK3nmoTmjqjojZDkurrmiYvmnLrlj7fnmoTlgLxcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDnlKjmiLfovpPlhaXnmoTlgLxcclxuICAgICAqL1xyXG4gICAgbGV0IGNoYW5nZVJlZEJhZ3Bob25lPSh2YWx1ZSk9PntcclxuICAgICAgICBkaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe3JlY29tbWVuZFBob25lOiB2YWx1ZX0pKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNoYW5nZVJlZEJhZ3Bob25lOiBjaGFuZ2VSZWRCYWdwaG9uZVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwc3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRoVG9Qcm9wcykoUmVkQmFnSWRJZGVudGlmeUNvbnRhaW5lcnMpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9SZWRCYWdJZElkZW50aWZ5L1JlZEJhZ0lkSWRlbnRpZnlDb250YWluZXJzLmpzIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG5hdmlnYXRvciA9IGdsb2JhbC5uYXZpZ2F0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgfHwgJyc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdXNlci1hZ2VudC5qc1xuLy8gbW9kdWxlIGlkID0gZWM2Y2JlMzE3Yjk4NTBiMDVjZTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IGVmNTFkNDk4OWYzMDQ0YjJlYjMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzXG4vLyBtb2R1bGUgaWQgPSBmMGRiYzEwYzY4ZGQ4MTQwMTRlN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi9fdXNlci1hZ2VudCcpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4IHx8ICcnO1xudmFyICRQcm9taXNlID0gZ2xvYmFsW1BST01JU0VdO1xudmFyIGlzTm9kZSA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xudmFyIGVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIEludGVybmFsLCBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIE93blByb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlLnJlc29sdmUoMSk7XG4gICAgdmFyIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhlbXB0eSwgZW1wdHkpO1xuICAgIH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZVxuICAgICAgLy8gdjggNi42IChOb2RlIDEwIGFuZCBDaHJvbWUgNjYpIGhhdmUgYSBidWcgd2l0aCByZXNvbHZpbmcgY3VzdG9tIHRoZW5hYmxlc1xuICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9ODMwNTY1XG4gICAgICAvLyB3ZSBjYW4ndCBkZXRlY3QgaXQgc3luY2hyb25vdXNseSwgc28ganVzdCBjaGVjayB2ZXJzaW9uc1xuICAgICAgJiYgdjguaW5kZXhPZignNi42JykgIT09IDBcbiAgICAgICYmIHVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUvNjYnKSA9PT0gLTE7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbiAocHJvbWlzZSwgaXNSZWplY3QpIHtcbiAgaWYgKHByb21pc2UuX24pIHJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgb2sgPSBwcm9taXNlLl9zID09IDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbiAocmVhY3Rpb24pIHtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW4sIGV4aXRlZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgaWYgKHByb21pc2UuX2ggPT0gMikgb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhbmRsZXIgPT09IHRydWUpIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTsgLy8gbWF5IHRocm93XG4gICAgICAgICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgICAgICAgIGRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgICAgIGV4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2UpIHtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZG9tYWluICYmICFleGl0ZWQpIGRvbWFpbi5leGl0KCk7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSBydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpIG9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgdW5oYW5kbGVkID0gaXNVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgdmFyIHJlc3VsdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pIHtcbiAgICAgICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmICh1bmhhbmRsZWQgJiYgcmVzdWx0LmUpIHRocm93IHJlc3VsdC52O1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICByZXR1cm4gcHJvbWlzZS5faCAhPT0gMSAmJiAocHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jKS5sZW5ndGggPT09IDA7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpIHtcbiAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3YgfSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYgKCFwcm9taXNlLl9hKSBwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgdmFyIHRoZW47XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmICh0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0geyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgJHJlamVjdC5jYWxsKHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9hKSB0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX3MpIG5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbiAgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgICByZXR1cm4gQyA9PT0gJFByb21pc2UgfHwgQyA9PT0gV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFByb21pc2U6ICRQcm9taXNlIH0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICB2YXIgJCRyZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoTElCUkFSWSAmJiB0aGlzID09PSBXcmFwcGVyID8gJFByb21pc2UgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyICRpbmRleCA9IGluZGV4Kys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSBmYTk4N2Q4MTFlNGViMmQ0M2Q5Y1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiXSwic291cmNlUm9vdCI6IiJ9