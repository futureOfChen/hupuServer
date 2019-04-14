webpackJsonp([2],{

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

/***/ "190ecd4c72d7a4423fcb":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"clearfix":"clearfix","dn":"dn","iogisticInfoContain":"iogisticInfoContain","iogisticBg":"iogisticBg","iogisticInfo":"iogisticInfo","iogisticTitle":"iogisticTitle","greyLine":"greyLine","iogisticStatus":"iogisticStatus","iogisticImg":"iogisticImg","iogisticMessage":"iogisticMessage","iogisticList":"iogisticList","item":"item","detailInfo":"detailInfo","leftBorderWarp":"leftBorderWarp","point":"point","lineWarp":"lineWarp","line":"line","contentInfo":"contentInfo","desc":"desc","descTime":"descTime","moneyCodeIng":"moneyCodeIng","explain":"explain"};

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

/***/ "4ee4ca14e096341612c3":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/imgs/moneyProing-icon.79eb5df5c0.png";

/***/ }),

/***/ "4f6d3c9d590c0feb712f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__("b365af20d4e02cb0aa22");

var _assign2 = _interopRequireDefault(_assign);

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

var _IogisticsInfoActions = __webpack_require__("57febfc23f7816bca4fe");

var _IogisticsInfo = __webpack_require__("99c3d30c708520bdba2a");

var _IogisticsInfo2 = _interopRequireDefault(_IogisticsInfo);

var _request = __webpack_require__("76fb50331ac78bf18670");

var _store = __webpack_require__("729bd0f3009c1858d0f9");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__("5d4604b08304c597d074");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IogisticsInfoContainers = function (_Component) {
    (0, _inherits3.default)(IogisticsInfoContainers, _Component);

    function IogisticsInfoContainers(props) {
        (0, _classCallCheck3.default)(this, IogisticsInfoContainers);
        return (0, _possibleConstructorReturn3.default)(this, (IogisticsInfoContainers.__proto__ || (0, _getPrototypeOf2.default)(IogisticsInfoContainers)).call(this, props));
    }

    (0, _createClass3.default)(IogisticsInfoContainers, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _request.beforeEnterRouter)("物流信息");
            /**
             * location.search由历史订单进入...
             */
            var dataParam = void 0,
                search = this.props.location.search;

            search = (0, _request.getSearchParam)(search);
            // search.materialId="01029802620000023020180621163839";
            if (!!search.materialId) {
                dataParam = (0, _assign2.default)({ materialId: search.materialId }, _request.comomParam);
            } else {
                dataParam = _request.comomParam;
            }

            (0, _IogisticsInfoActions.IogisticsInfo)(dataParam).then(function (newObj) {
                if (newObj.matDelivStatus == "02") {
                    /**
                     * 通知客户端修改状态
                     */
                    (0, _request.mccStateChanged)();
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                deliveryMsg: {}
            }));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_IogisticsInfo2.default, this.props);
        }
    }]);
    return IogisticsInfoContainers;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {
    return {
        deliveryMsg: state.getIn(["deliveryMsg"]).toJS()
    };
};
exports.default = (0, _reactRedux.connect)(mapstateToProps)(IogisticsInfoContainers);

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

/***/ "57febfc23f7816bca4fe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__("251bc7afe8127e09149d");

var _promise2 = _interopRequireDefault(_promise);

exports.IogisticsInfo = IogisticsInfo;

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 查询商户收钱码的物流信息
 * @param param
 * @constructor
 */
function IogisticsInfo(param) {
    return (0, _requestAPI.getLogisticsSt)(param).then(function (res) {
        var newObj = res.data;
        return _promise2.default.resolve(newObj);
    });
}

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

/***/ "65ef9fe3397720d555d2":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

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

/***/ "6ceeaa5d4bd114b7f1ea":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAGkVJREFUeAHtnQt0VdWZx+/7kQeB8AatCAqVKKNYRfGB1HHpiNYHGsD36tQ6ratOWzs+plO7xjrT6aq1tr7mVZeOAiGJIhbRTlVAEVEwIgoDilSUNyHkQXLf98xvJznJTbiXJHCTu8+531krOefss88+3/5/+3++79t7n30dDtkEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEgfQIONMnS6rdEZg/f/4Qt9s32+EwzjMM42TDcJ3gcjmKqLe7ve4J0ps43u50Oj/j+J1kMvbijTfeeNDu2KTWTwiSiobNjysrK080DGd5Mpm8kkY/IZl0rKHh17jdrn3JpLPW4UjWGobjkILB6VRkcQ1zuYxhiURyBPmnknYulz5zuZx/TCbjlfPmzftC5bXzJgSxs3bb66aIkUg4fwUBzqGhvwEJVtL4P4EoRl+q74IZEOo0iDIDy3MxNFrtcMTvtTNRhCB9aSEWy/viiy8OjUZjD9KQr8Za/A/EWEwVEtmoBmTxYF2ugTA387fY7XY+UF5eXpeNsnUqw6WTMCJL9hBYuLDyhkgkvoHYwuV0usshRzWlZ4UcSkqsTzweN6og3hwI6E0kHB9XVFTNzV4N9ChJLIgeesiqFAsWVP6SgPvaeNx5t9Np7M5q4RkK43ljufQbCLnohhuu+6cM2SyXLASxnMoyC7x69erg9u07KogzBhFe/AyrEcqcO/tXsFUFuFsPQZa6r33tuBumT58+oM/Pfo2I1PqjUClz4BFoI8fOd3B3ahMJ4ycDTQ5VY0jZ4nS67ubZ9V9+ueNtJdPAI5HdJwpBsotnzkpTloOHf0gjfTJnQvBg1TNGXPI4JPkYkizIpSzZeLYQJBso5rgMFXMgQkmuydEVBtcTEKV0wYLqh7qmW+tMCGItfR0mreqtwq2azRs7J4Gx2+32HiYUCcqSEAshk1Fu5d4tCdLTadciaWqcg67cjwmM72CEfNdAiM14xwja/lk8qxRi8mjHCkiwI9Oz6UUbA1H+3e12nGbFcRJPpopJuv4IRKOJB2l8L+PK9Bs5PB53oWEkp/KMExQi7PfxTOZlGfUQo0eQFHHV1BRG8v+ZzD/o8QbNMogF0UwhvRVHTR+hsa7ibw5v8Wx2p7oZJT+VN/9kymbiotHM1JIPOP6yt7J1z8f9Qbp+FxlG4jyrTUsRC9JdmxY5V3Or8G/U9JFjJgdds+MgxJmUpRoys3iTn8TjyUWkJxUcpB/TpmTE6jzHROF/oyBLjbaLBTkm1efm5rbJh8ZKZuBehwR9nj4CAYZ6PK6zuH+YqgFzqr7AQnxwtGRLJGLDIpHwhQUFxS9mQkTN3cJBq/b53OfPnj17e6Z8uqWLBdFNI72QR01Zx215g6y9IgdxRIAp61NdruT4ZNLl4PwAFmIt9zPFnUJ6VYrK2bbF49FTXC73NnWWSCSCXq83hPv0XU4zEkTN3XK7jTdjsUQ5+X6t7rXCJgSxgpa6yUhju5IepP/ultxxioVQM9Mn4yKdilXw0IjDnNfglq1WgXU8rrIevfMQDjf/MhAo/G4sFr0AqzDa6/U9ToE7w+GWc3j2IP6mQaBXyFPTIRQHhuFeSf7bOLQMQWQcJFWDFjhWXwLiz09Q33OkExfLUoT7NJc8vPyc1cQpz0OSaqaftL7x092TKS0Wi4yDDHz70WVzU3aJx+PbRyrxinFyS0vDXexHx+ORByHAmXyAtdrr9X/a5a62kw3sJi5evHhwmmtaJokF0VItmYVSn8nSxcqXgOk/doIMh3CZFrSV0BpjZy6s25VkMlIai8XOZh47lsCgJ8v1Fc/BnSqmWzfZanfi8dhoru1sL99HOp/uer/CYvyevFcGg4PUqH7ajbxq8v2acDh6LRmeTptJs0SxIJoppGdxjPMYrPug53w958BCfN0cCadxu0Kh0GJik/GQ8CUa+tzCwpIfYS0+bmlpmmKWFouFLiSNz3FV/JGcSPzxbDBYtNjvD75OHDIRcvnMvBn2H2L9zstwTbtksSDaqeTIAimXBtdpzZFzHX41EmmZ6HZ7mnCNOr4Poefpsmg0NJMPqmjkhS9Rbo3H41nl9xdsJH9ZNJqcRkl8rpuYyL41nuD5szgeEo2Gx2ANhng8/o/U0yBaHIvzSSwWnhWNGsqyqHuLi4pKblfXzY3u5H1YOT7XtcYmBLGGnjqkVKuP0ItF71PPgxOqEScS0YuwBgto5GfwV0rDXefxeDfgEkVovI+Sp5I8LOLgIrJ3v4cL9fN4vF65UxsJY97HityO2+WCTCzg4PRwf4Ie25cSifi04uLS+2KxluJI5NBllD0NK3QaVuVkeghe9vl8z/p8wTRxkrMWkpzQUSHND4Qgmiuou3gM5BXRSFu7Z7tfo7GWeb0FG810n8/f0NQUugEXyYP7cxHpk2IxYyjpWzmOqHw+X2CXwxH4D3UcCARfgwzv+v2BffRITaXRn33oUMOtBP4JLM9TlP0O2R6AHBAv9i3I9XY4HHoKQryHFVpOb9YLWJD7CgpK/lOVl26DQLW4iK0uWrrruqUJQXTTSM/yuFUg3j0bL/aCSCTylMPhuSaZjJ7NIGAMy/B93voB3KIi4oSfh0KHHmcw72FlPSCZA+LM4b5ziSmGYCluJX4opIH/FLdrOI3+S/KU+P2F36PhM+/KQe+VgzEP/xeQZU9zc/0DHB8gQL8+VRZ6sobQ/Tu4/Z7US+3HzkZcOW+aC1omSZCupVr6LhSu0fE09GA02vIkDb2MmGA7jf46GmMFVqeWNDUceKC5ufGxpqa6JViBEs5jWJA/QCA/g3+sfeXeD5F+UVQ05BpFKK4Pw0pchhV5BEIsDocPTVeS8RzGVVzbI5HQJHWeunFtLbJ8IzXNysdiQaynvYQa6+huRbAWx1OVtYWFg79vVkmNYZD3FBUfJJPhS2m8a3jjvx8IFHxMnoQ5NQRyrKFRn83A3lLiiTLI9LdcP52/UbhmNxFL3M893dbRcr4fjUbOwYpsNp+n9hDzPRWHcPh6anrnsTGI41jnud5HYkH01s9h0uEZ4V65hnW/QONXBNkGKa7ASvyiubnhtzTusViFJUVFgy/1egMP0ngPsnzoTViELiPZkIbgPH6OKpMBxZHc8xqkuJMy/0JA/hxu1w+j0WYGJzs3gvr3GBQ8uzOl7cjvL3oV4uHqpd8YRBxGJ4Na0tQSmxDEEmrqFJIeoC/UcqCdKW1HNLrPadjriCnOoOGOxL36ieq9whVyHzpU/yyN/EdYHQ9EeYoyJuBWBcwyyPIhPVCn07XLGItnAw18DflnqeCb40UQ6IloNPoPuFkL1DwsdR8WZRPPgyR93QwIYshkxb7CJvl7hwBv9c9wYUYQCXS5gZjhLZVAo17V2HhgaSjUOAtrMJ6BvLchwOcFBYPuVXEHMcpZNNAEgfiZjHeoXikHAXWYAcAdNP57IND3cLMI8pPfCgSK+JxXkaF1TtUdauoJZakpJsQhriTkeVYd92WDyMQ6SdWLZolNLIgl1NRFyNWQZGqXlPYTLMBMAvD5nKqeq6mMd6yAOB8xw+N03KpnQqHm3+GifZ03/5t006qBvI6NMvfiTi2EGCPo6v1HXKy7uJ8ep85N9WBBkJbOlKM6OgNyrTqqO3NwkwTpOQD9WB5JMP6Cy+V9iEbmpDF3GS1kusd6/r4dCjVdjS0pwA1aTx7e9sYWRsifJz54Xz2b3qdz6Y79+1Q5sBxP0KO1X5UZj3tv6U6O1LyZjhnfOA5XjR4sp/q+ZH33fFg3zF7yHL/fe1v3a7qed7XTukopcnVBYOHCRasYUVfdsxu6XGg/gQAn4Q7dV1w8+AfNzU3fplE2kPevuBxjjwVxfs7xJJ+v4JbM4xXpSu6aRnsfTMo3iG1GMbJPW3J+xX5d9x428y66m1XP2K3z5pVfaKbpvhcLoruG0sjHm1gt1DCDhpiWIFiRrViIE+nJehRLspBpHzsYRJzDvKn7GUUnuFbTSlxq2oiaUtLrjS5jn2rkkEz94I56udYzILkWArZ36XYxaIeVy/0zSPzjYRc0ThCCaKycTKLhMlVx7S0a+VPpGrlq/FiJN3CbniZu2KPKoSHf0TatpK3UdPe1Xen+38mM3+QUvkSEHMmocp0ItIlzjPZv1Y9MCrM0JRPEmunzuX5mpllhLy6WFbSURsaFC6tYVMHYxrcf1WkuH3USjX80a1gpt6mE3iYWf3NtwQp9xGDjMQ3uYT3m4JIdP3fu9fOOWrgc3GhbC8LbylVRUc23C46reNtdgOLHsB8JxjbpuWt7g1O/+7LZbhhj6VjFBMw4VhYiQaDf5SnqS6w6CLqfuIP1gB0rsRA1KsDvkqv9BGKw6rvjJq/XdW666zqnda22zpL2QbZFi6ovpTeFZXEcKjC1/dbahnNcSwj0Ke+e30OSw75VYbGGv+NaCOtxV47F7PPjbWVBli9f7tmzp/ZRlHRnn5HIkxtMS5BtUlEeH1UlHyf2qcTq/AY4E22Qqq5fx+XFxcFTrQixbQiiyLF3b+3LuFF/k6oIFFaPgl6l94UJes69kKdvH2qnFqbhMQ2e+VDOaxBNfeMdPYKIbq61N1ruOAbfAddKuaml4HoSbhifzxrFnc81yolhxhIb/VgtN8Sg/cPk+/EVV1xxsDOPdY5sQxBlOVLJQQNgUp/jwZEjhz02c+bMsHVU0mdJnyFgP8hb+3wC6rvhf9o4oM+l9vIGyOIjKwG443ZePQXqNvbnEZPcTWCvFq6umDfv+kW9LE67bMfwHtGnLirmoGG8ZkoEOVhlwzGL1cTVtO682CoqKhfzpmZcwvF4LioM3ieBO+6tGjRs2wj435k7d8755rkV95YniOqtWrSoqobG0RqQK8uBsqankmPdunUFQaa2WlFBvZWZ2baBzZu3LmFNrE3BYMEz4NLvlqSlJdTMd1gd1rmdJE8rS4IecOOcG+bMuY65V07LurWWJwjuxUW4VsvNhoRi7pk7t/zX6nzTpk0s25+8mkPVvWv7DU64t23bfjGzdv0jRgxfi5vTp5HyowEIGtY1NDSuOHiwYbPqzgV/Rc7xnWU5Z+Jireg8t9aR5ccEUAjjHG2bCshHjhz+mDqDHJdAjjs4zAtyqDpT/8SECeP+NxAI7Nm9e88MPoJqjQnUtf7awL908OBB1w4fXno5Lyo6CoxKpQfzean6MdOstLc8QVDIBZ2AG8tUQF5TUzO83XJ0XsqjI36Cee3w4cPX7tmz74K6urpTwEL1YPXLRtke9Yz6+vp7mfP1K6z3/ViVVzsflqqfzlSrHFmeIG0j5G1w8+b6RB3xkVAZO9v00LXVrm//hw0r3TZx4oQqvv1I7Nq155L6+kbl9mTTpXbW1zeM37Vr98XqGRMnnlQ1efKkz5SUxCIdnSOp+ulbDfTIbYNG1Dp9pB1N5151gO89ZgBiVD00eAQp+AYkesIJx60Oh8MbcLmm7dy565JAwL+LVRR3FRQE6o5wa8ZLLE86lOB8dEtLeCwdH7vHjx+3BJdOdanTvZsc23aj0oPZR5Cqn4zFanvBBgTpnFuFglp7SyCHV1vEcyCYasAnnjjuDYhSVFdXP76pqXESblGJz+fdFwwGWMjNG6L3K8yiDuqvdVIiYxhe/gKs1ctvi8SCoVCYJYBiI7xeT0NhYeH20aNHrjOJYVbJxN3UQ3u6pb0UOxDE1I/se0BANegxY0apb0g2EMD7Dhyo45uR0KhEIjSWz2zVaLiX+KHVDSO4ViYghrvaxEIOjYMGFW8vLR2yQlmlHh5jq8u2JAhvwaW8zVbYSlNZrgwBtWP06I4xvayUTgzY6mplpTBNCrElQTDxEd502QxINVGX3mJglSJ6S9h36WxJEKzHbFyG6X2HQ+44RgRWc/+zx1iGVrdbOoDSCkkRxpYI2JIgWJCOad221JqmlbIj7rYkCMHiTk3bkK3FYvxpl90qaHmC0B3Z0XPCcesPs6CozZDEsjNIrdjIwFtZ7U1KdlMP7ccd+lHnVtssTxAAT3lrta5w7pg8ebL6Hb6U+UBWU4sl5X2trKysdYkhKHJ8Sg1S9JOSapFDGxDEyWIB5mb8tXmEsl7mrfYc55Z+g5n10Xh/CJyfV3h3ytipB8iSop/OHFY5skM371LAvkIBzijw1IqKF6bOnTu7Rp2jtFXsVm3ZsoVpEtESlSZb9hBgsLFh0qRJtaklKvzpI5makqb0Y9nN8gQJBn0vhULR39GD4ldaQDmPcPzN1BikXYldFGlZjWksOLizFlnVI6aI6CCi9GOeW3FveRfrqquu2ktQ2PqRVLsCZrBg3MNWVIbVZW7HfYZZD6UXpR/z3Ip7W0zHWLp06RB+7phJeMZxphJQznPBoP9OFNRkpsm+fxBYsmRJcSgUeQIX9+bOJzh3sBbWFKsu92PWwxYEUZVRvi/LPvGzAI6gWTkCxH18vPMoS9O8eP3113+KyTc/UujMIkdHhQDulLOqqmoiu2v5yOCHvJz41au2jZdTiJ/zPN+MBc10K+5tQxAFfmVl5TdRVhUkKe2uDJSmpmmzlqxDxke6g9P3c+WaDwdnX/dbeQc1gvWtc+bMsXTsYdbL8kG6WRG1Z6mfNyHJNFb128xpl++w25XZ/sVb6l1ynE0EsCiDWMDONlN9LB+kd1cuJNlKWsdaTbhVtlFW97rqcA6+cf7e1kGW/pDBVhYkPUDG/Uw92YjPPAY/WS0B1MWypL9HUntAgJeOk95D567CwsC7LS0tTqz2gR7useRl2xMEc9/C6n7LLKkdiwiNW3tYzGcR0XsU03YuVo81lgyCQB8QEIL0ASzJmn8I2N7FSlXpxo0bfcQiZ6WmyXHfESCma2DG9Cd9v9N6d+QVQVj0LMjSN7dYT016ScxLRs3QzQuCiIulV9sTaTRDQAiimUJEHL0QEILopQ+RRjMEhCCaKUTE0QsBIYhe+hBpNENACKKZQkQcvRAQguilD5FGMwSEIJopRMTRCwEhiF76EGk0Q0AIoplCRBy9EMirqSZ6Qc8X9ImEn28qehSLqR0OfhTIdr+90WPFNcggBBlgJUQi0dFNTU2nqD0/9FPY28czQbCZ3xPcU1hY9H9+v9fSy3n2ts465BOCDKAWGhubynbv3judVR6XYTl+y9/nrLHd4yISrMfmwopMqKszLmey5axRo0asLS4uWj+Aoufto4QgA6R6fmH2uK++2nkej7tt3rzyZ4/ysU8uWlR9Kz/p/IzXe3w9P+n8xVGWI7f1EgEJ0nsJ1LFmq609cKZhJP/A579HS45WEdT9kUjs6YaGBtYBk62/ERCC9DfClI97FGDlwZEsibMwS49boH63XJWbpfKkmAwICEEyAJPNZGIO1opyOHw+11+yUW5bOayER7nZKE/KyIyAECQzNlm74vV6DxJcG/G4UZaNQlU5gYDPUOVmozwpIzMCQpDM2GTtCl20MXqd9tOg78Et6nng4whPVvcXFAR/CuFqVblHyCqXsoCAECQLIPamiMLCglVDh5ZOf+WVZfOXLVvW+lsmvbkvNc/y5csDf/rTn6tLSgadBUlsu5phap1zfSzdvAOkAY/HU1tYGFzhcjlnMzB++cqVb21hUbv9jIX0uOK8shrcM4KV6id5PN4AA4Yr+HUn+UGgAdCdEGQAQDYfgVu01ePx7Q6HQ2VMMxnLSPop5rUj7VWA73a7Gplusi0QCG70eFzNR8ov17KHgBAke1j2qiTVuIuKCt/vVWbJlHMEJAbJuQpEAJ0REILorB2RLecICEFyrgIRQGcEhCA6a0dkyzkCQpCcq0AE0BkBIYjO2hHZco6AECTnKhABdEZACKKzdkS2nCMgBMm5CkQAnREQguisHZEt5wgIQXKuAhFAZwSEIDprR2TLOQJCkJyrQATQGQEhiM7aEdlyjoAQJOcqEAF0RkAIorN2RLacIyAEybkKRACdEcgrgpSUlPT4/bfOytJItrzBMa8IsmPHjpbeLJKgUUPUUhQwbNBSsH4QKq8IMnPmzDgLJXzeDzjmVZEsOLEnXyqcVwRRSmWxtcX5otz+qCdLEBmxWCxvFp3IO4KUlZVtxUV4vT8aTz6UyQtmzdSpU/fnQ11VHfOOIKrSkKQKRVert6E6l613CPBi2RgKheb3Lrc9cuXtuliTJ0/+c01NzXq/3z8FxRfbQ539UwveI8l4PL5jypQp68Gqx1/E6h8pclNq3hJEwd3uKryRG+jlqVZAwJYuFkt1bu8E3xjXeSxH/YFAMunugrHbnYp/fzxx4Mq0JUGA7wMTQqKM71RWVk42z2WfXQTANmgYiX9JKTU8dOjQTSnnlj60pYvFKujPJRKOm5Vm8J8HJ5POmoqKqnc5zZsBroFolWDr4Td6z+RZo8znYb3nq/Em89zq+2P6MRedKw8h/gsFfkdnGe0mG+TYycuprLy83DYvIru6WAwIGnfyWxz/itISdmuImtZnpWF4z7cTORTOtrUgZiOqrq6eEo8nyzk/ierKr8KawGRnr14+atrJG/w89WK6gGVcKTu4SimCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAikR+D/ARVdKkZvBHRIAAAAAElFTkSuQmCC"

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

/***/ "932ad6a134ce71c1fa3b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/imgs/sendarticle-icon.9589709ffc.png";

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

/***/ "99c3d30c708520bdba2a":
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

__webpack_require__("190ecd4c72d7a4423fcb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by by on 2018/4/12.
 */
var IogisticsInfoPage = function (_React$Component) {
    (0, _inherits3.default)(IogisticsInfoPage, _React$Component);

    function IogisticsInfoPage(props) {
        (0, _classCallCheck3.default)(this, IogisticsInfoPage);
        return (0, _possibleConstructorReturn3.default)(this, (IogisticsInfoPage.__proto__ || (0, _getPrototypeOf2.default)(IogisticsInfoPage)).call(this, props));
    }

    (0, _createClass3.default)(IogisticsInfoPage, [{
        key: "rendenDom",
        value: function rendenDom(deliveryMsg) {
            status = deliveryMsg.matDelivStatus;
            var renderIogisticList = void 0;

            var transJsonObj = JSON.parse(deliveryMsg.matDelivDetail);
            // transJsonObj.traces = [
            //     {acceptAddress: 'a', acceptTime: "2018-06-11 15:41:00"},
            //     {acceptAddress: 'd', acceptTime: "2018-06-12 05:05:00"},
            //     {acceptAddress: 'c', acceptTime: "2018-06-11 20:31:09"},
            //     {acceptAddress: 'b', acceptTime: "2018-06-11 19:17:45"},
            //     {acceptAddress: 'e', acceptTime: "2018-06-12 07:36:47"},
            // ];
            //对无序的展示信息进行排序
            var array = transJsonObj.traces;
            for (var i = 1; i < array.length; i++) {
                var temp = array[i];
                var j = void 0;
                for (j = i - 1; j >= 0; j--) {
                    if (new Date(temp.acceptTime).getTime() > new Date(array[j].acceptTime).getTime()) {
                        array[j + 1] = array[j];
                    } else {
                        break;
                    }
                }
                array[j + 1] = temp;
            }
            transJsonObj.traces = array;

            renderIogisticList = function renderIogisticList(item, index) {
                return _react2.default.createElement(
                    "li",
                    { className: "item clearfix", key: index },
                    _react2.default.createElement(
                        "div",
                        { className: "detailInfo" },
                        _react2.default.createElement(
                            "div",
                            { className: "leftBorderWarp" },
                            _react2.default.createElement(
                                "div",
                                { className: "point" },
                                "\u25CF"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "lineWarp" },
                                _react2.default.createElement("div", { className: "line" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "contentInfo" },
                            _react2.default.createElement(
                                "p",
                                { className: "desc" },
                                item.acceptAddress,
                                " ",
                                item.remark
                            ),
                            _react2.default.createElement(
                                "p",
                                { className: "descTime" },
                                _react2.default.createElement(
                                    "span",
                                    null,
                                    item.acceptTime
                                )
                            )
                        )
                    )
                );
            };
            switch (status) {
                case "00":
                    return _react2.default.createElement(
                        "div",
                        { className: "moneyCodeIng" },
                        _react2.default.createElement(
                            "div",
                            { className: "iogisticImg" },
                            _react2.default.createElement("img", { src: __webpack_require__("4ee4ca14e096341612c3"), alt: "" }),
                            _react2.default.createElement(
                                "p",
                                null,
                                "\u5236\u4F5C\u4E2D"
                            )
                        ),
                        _react2.default.createElement(
                            "p",
                            { className: "explain" },
                            "\u60A8\u7533\u8BF7\u7684\u6536\u6B3E\u7801\u8D34\u7EB8\u6B63\u5728\u5236\u4F5C\u4E2D\uFF0C\u5236\u4F5C\u5B8C\u6210\u540E\u5C06\u901A\u8FC7\u6302\u53F7\u4FE1\u5BC4\u9001\uFF0C \u5236\u4F5C\u53CA\u5BC4\u9001\u5C06\u57285-7\u4E2A\u5DE5\u4F5C\u65E5\u5185\u5B8C\u6210\u3002"
                        )
                    );
                    break;
                case "01":
                    return _react2.default.createElement(
                        "div",
                        { className: "iogisticInfoContain" },
                        _react2.default.createElement(
                            "div",
                            { className: "iogisticBg" },
                            _react2.default.createElement(
                                "div",
                                { className: "iogisticInfo" },
                                _react2.default.createElement(
                                    "p",
                                    { className: "iogisticTitle" },
                                    "\u7269\u6D41\u516C\u53F8: ",
                                    _react2.default.createElement(
                                        "span",
                                        null,
                                        deliveryMsg.logisticsCompany ? deliveryMsg.logisticsCompany : ""
                                    )
                                ),
                                _react2.default.createElement(
                                    "p",
                                    null,
                                    "\u7269\u6D41\u5355\u53F7: ",
                                    _react2.default.createElement(
                                        "span",
                                        null,
                                        deliveryMsg.billCode
                                    )
                                )
                            ),
                            _react2.default.createElement("div", { className: "greyLine" }),
                            _react2.default.createElement(
                                "div",
                                { className: "iogisticStatus" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "iogisticImg" },
                                    _react2.default.createElement("img", { src: __webpack_require__("932ad6a134ce71c1fa3b"), alt: "" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "iogisticMessage" },
                                    _react2.default.createElement(
                                        "p",
                                        null,
                                        "\u5DF2\u53D1\u8D27"
                                    )
                                ),
                                _react2.default.createElement(
                                    "ul",
                                    { className: "iogisticList" },
                                    transJsonObj.traces.map(renderIogisticList)
                                )
                            )
                        )
                    );
                    break;
                case "02":
                    return _react2.default.createElement(
                        "div",
                        { className: "iogisticInfoContain" },
                        _react2.default.createElement(
                            "div",
                            { className: "iogisticBg" },
                            _react2.default.createElement(
                                "div",
                                { className: "iogisticInfo" },
                                _react2.default.createElement(
                                    "p",
                                    { className: "iogisticTitle" },
                                    "\u7269\u6D41\u516C\u53F8: ",
                                    _react2.default.createElement(
                                        "span",
                                        null,
                                        deliveryMsg.logisticsCompany ? deliveryMsg.logisticsCompany : ""
                                    )
                                ),
                                _react2.default.createElement(
                                    "p",
                                    null,
                                    "\u7269\u6D41\u5355\u53F7: ",
                                    _react2.default.createElement(
                                        "span",
                                        null,
                                        deliveryMsg.billCode
                                    )
                                )
                            ),
                            _react2.default.createElement("div", { className: "greyLine" }),
                            _react2.default.createElement(
                                "div",
                                { className: "iogisticStatus" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "iogisticImg" },
                                    _react2.default.createElement("img", { src: __webpack_require__("65ef9fe3397720d555d2"), alt: "" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "iogisticMessage" },
                                    _react2.default.createElement(
                                        "p",
                                        null,
                                        "\u5DF2\u7B7E\u6536"
                                    )
                                ),
                                _react2.default.createElement(
                                    "ul",
                                    { className: "iogisticList" },
                                    transJsonObj.traces.map(renderIogisticList)
                                )
                            )
                        )
                    );
                    break;
                case "03":
                    return _react2.default.createElement(
                        "div",
                        { className: "moneyCodeIng" },
                        _react2.default.createElement(
                            "div",
                            { className: "iogisticImg" },
                            _react2.default.createElement("img", { src: __webpack_require__("6ceeaa5d4bd114b7f1ea"), alt: "" }),
                            _react2.default.createElement(
                                "p",
                                null,
                                "\u9519\u8BEF\u4EF6"
                            )
                        ),
                        _react2.default.createElement(
                            "p",
                            { className: "explain" },
                            "\u60A8\u7533\u8BF7\u7684\u6536\u6B3E\u7801\u8D34\u7EB8\u90AE\u5BC4\u6709\u8BEF\uFF0C\u8BE6\u60C5\u8BF7\u54A8\u8BE295516\uFF5E"
                        )
                    );
                    break;
                default:
                    return _react2.default.createElement("div", null);

            }
        }
    }, {
        key: "render",
        value: function render() {
            var deliveryMsg = this.props.deliveryMsg;

            console.log(deliveryMsg);
            return _react2.default.createElement(
                "div",
                { className: "iogisticInfoContain" },
                this.rendenDom(deliveryMsg)
            );
        }
    }]);
    return IogisticsInfoPage;
}(_react2.default.Component);

exports.default = IogisticsInfoPage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Jb2dpc3RpY3NJbmZvL0lvZ2lzdGljc0luZm8uc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1ncy9tb25leVByb2luZy1pY29uLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Jb2dpc3RpY3NJbmZvL0lvZ2lzdGljc0luZm9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0lvZ2lzdGljc0luZm8vSW9naXN0aWNzSW5mb0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltZ3Mvc3VjY2Vzcy1pY29uLnBuZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltZ3MvZXJyb3ItaWNvbi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvY2FjaGVTdG9yYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWdzL3NlbmRhcnRpY2xlLWljb24ucG5nIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Jb2dpc3RpY3NJbmZvL0lvZ2lzdGljc0luZm8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191c2VyLWFnZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanMiXSwibmFtZXMiOlsicmVjbWRSZWNvcmQiLCJzaGFybGluayIsImlzQmxhY2siLCJpc0FwcGx5IiwiYXBwbHlNY2MiLCJnZXRDYXJkbGlzdCIsImdldEFkZHJMaXN0IiwiYXBwbHlNYXQiLCJnZXRRclVybFJlc3QiLCJnZXRNY2hudEFuZEFyZWFJbmYiLCJnZXRNY2hudERldGFpbCIsInVwZ3JhZGVNY2MiLCJnZXRQcm90b2NvbEluZm8iLCJnZXRIaXN0b3J5SW5jb21lIiwiZ2V0SGlzdG9yeVRyYW5zIiwiZ2V0VG9kYXlJbmNvbWUiLCJnZXRUb2RheVRyYW5zIiwiZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bSIsImdldExvZ2lzdGljc1N0IiwiZ2V0VXBncmFkZVN0IiwiZ2V0TG9naXN0aWNzTGlzdCIsImdldEF1ZGl0SW5mbyIsImdldExpbWl0QXRJbmZvIiwibWNobnRPcGVyIiwiZGVsZXRlQWRkcmVzcyIsInVwZGF0ZU1jY0NhcmQiLCJuZXdBZGRyZXNzIiwiZWRpdEFkZHJlc3MiLCJzZXRNY2NPbk9mZiIsImdldE1jY1RyYW5zTnVtIiwicGhvbmUiLCJ1bmRlZmluZWQiLCJyZWNtZE1vYmlsZSIsIlV0aWwiLCJiYXNlNjRFbmNvZGUiLCJDT05GSUciLCJSRVNUIiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzQ29kZSIsIlNUQVRVU0NPREUiLCJTVUNDRVNTIiwicm9sbEtleSIsIkNBQ0hFS0VZIiwic2Vjb25kS2V5IiwiZnVsbCIsInJlc29sdmUiLCJzaGFyZUxpbmsiLCJyZWRVcmxTdHIiLCJkYXRhIiwiaWRlbnRpZmllciIsIm5leHRTdGF0ZSIsInN0b3JlIiwiZGlzcGF0Y2giLCJ1cGRhdGUiLCJ1cGRhdGVGdW5jIiwicmVzcCIsImJsYWNrU3QiLCJjb25zb2xlIiwibG9nIiwiY2FjaGVQYXJhbSIsImFwcGx5U3QiLCJwYXJhbSIsInJlZmVyZWVUZWwiLCJ2aXJ0dWFsQ2FyZE5vIiwiYWNjTm0iLCJjaXR5Q2QiLCJjb21vbVBhcmFtIiwiZ2V0TWNjQ2FyZExpc3QiLCJjYXJkTGlzdCIsImxlbmd0aCIsImRlZmFsdXRDYXJkIiwiYmFuayIsImNhcmRUeXBlIiwiZnVuY3Rpb25CaXRtYXAiLCJpY29uUmVsVXJsIiwiaXNTdXBwb3J0IiwicGFuIiwicmFuayIsInNlbGVjdGVkIiwiZm9yRWFjaCIsIml0ZW0iLCJrIiwic3RvcmVTdGF0ZSIsInN0b3JlUmVjZWl2ZUNhcmRPYmoiLCJzdGF0ZSIsImFkZHJlc3NMaXN0IiwicmVzdWx0IiwibWF0ZXJpYWxMaXN0IiwiZGVsaXZObSIsImFkZEFsbCIsImRlbGl2UGhvbmUiLCJwcm92aW5jZUlkIiwiY2l0eUlkIiwiYXJlYUlkIiwiYWRkcmVzc0luZm8iLCJpZCIsImNpdHlObSIsInJlZFVybCIsImdldFFyVXJsIiwibWNobnREZXRhaWwiLCJxclVybCIsInFyTnVtIiwiYXJlYSIsIm1lcmNoYW50VHAiLCJhcmVhQXJyIiwicHJvdmluY2UiLCJvbmUiLCJwcm9JZCIsInByb05tIiwidHdvIiwiY2l0eSIsInRocmVlIiwidmFsdWUiLCJjaGlsZHJlbiIsInB1c2giLCJhcmVhTm0iLCJtZXJjaGFudFRwQXJyIiwibWVyVHlwZTEiLCJtZXJjaGFudFRwQ2QiLCJtZXJjaGFudFRwTm0iLCJtZXJUeXBlMiIsIm1jaG50QW5kQXJlYUluZiIsInN0b3JlTm0iLCJTdG9yZVRwIiwicHJvdkNkIiwiY291dHlDZCIsImFkZHIiLCJjZXJ0aWZQaWMxIiwiY2VydGlmUGljMiIsImNlcnRpZlBpYzMiLCJsaWNlbnNlUGljIiwic2hvcFBpYzEiLCJzaG9wUGljMiIsImF1eFByb3ZNYXQxIiwiYXV4UHJvdk1hdDIiLCJzaG9wTG9nb1BpYyIsIlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0IiwicmVzIiwiaGlzdG9yeUluY29tZU9iaiIsIm9yaWdpbkxpc3REYXRhIiwiZ2V0U3RhdGUiLCJnZXRJbiIsInRvSlMiLCJuZXdMaXN0IiwidHJhbnNJbmZvIiwiaGlzdG9yeU9yZGVyTGlzdCIsImNvbmNhdCIsInRvZGF5SW5jb21lT2JqIiwidG9kYXlPcmRlckxpc3QiLCJuZXdPYmoiLCJkZWxpdmVyeU1zZyIsIm1hdERlbGl2U3RhdHVzIiwibGltaXRJbmZvIiwiaXNVc2VNY2MiLCJtY2NUcmFuc051bSIsInRyYW5zTnVtIiwiSW9naXN0aWNzSW5mb0NvbnRhaW5lcnMiLCJwcm9wcyIsImRhdGFQYXJhbSIsInNlYXJjaCIsImxvY2F0aW9uIiwibWF0ZXJpYWxJZCIsIkNvbXBvbmVudCIsIm1hcHN0YXRlVG9Qcm9wcyIsIklvZ2lzdGljc0luZm8iLCJyZXF1ZXN0Iiwic2V0WGlhb1dlaVBheSIsIndpbmRvdyIsIlVQIiwiVyIsIkFwcCIsIkVudiIsInJlZ1Bob25lIiwicmVnUGF5TnVtIiwidmVyc2lvbiIsInNvdXJjZSIsImJhc2VVcmwiLCJiYXNlVXJsMiIsImJhc2VVcmwzIiwiaG9zdG5hbWUiLCJpbmRleE9mIiwicHJvdG9jb2wiLCJnZXRTZXJ2VXJsIiwidXJsIiwic2VydmVyVXJsIiwidXNlckluZm8iLCJzcGxpdCIsImdldENpdHkiLCJyZXNwb25zZUZvcm1hdHRlciIsInBhcmFtcyIsIm1zZyIsImRlbGV0ZVNsYXNoIiwiaG9zdCIsInJlcGxhY2UiLCJhZGRTbGFzaCIsInBhdGgiLCJ0ZXN0Iiwic2VwYXJhdGVQYXJhbXMiLCJwYXJhbXNMaW5lIiwia2V5IiwiY29uZmlnIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJmaW5hbFVybCIsInJlamVjdCIsIm9wdGlvbnMiLCJ0eXBlIiwic3VjY2VzcyIsImVycm9yIiwiRXJyb3IiLCJkYXRhVHlwZSIsIiQiLCJhamF4IiwiZ2V0IiwicGFyYW1BbGwiLCJmb3JDaHNwIiwiZW5jcnlwdCIsImNhY2hlIiwiYnlBamF4IiwicG9zdCIsInB1dCIsImRlbCIsImdldFNlYXJjaFBhcmFtIiwic3RyIiwic2xpY2UiLCJhcnJheSIsIm9iaiIsInN1YyIsImVyciIsImFwcCIsInNldFhpYW9XZWlBdWRpbyIsImdldFhpYW9XZWlBdWRpbyIsInRvYXN0IiwibXMiLCJUb2FzdCIsImluZm8iLCJiZWZvcmVFbnRlclJvdXRlciIsInRpdGxlIiwicmlnaHRCYXIiLCJyaWdodENhbGxiYWNrIiwicmlnaHRCYXJJbWciLCJkb2N1bWVudCIsIm9uUGx1Z2luUmVhZHkiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJzZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24iLCJtY2NTdGF0ZUNoYW5nZWQiLCJzZW5kUXJDb2RlIiwiZmFpbCIsInNjYW5RUkNvZGUiLCJjbG9zZVdlYlZpZXciLCJ2ZXJpZnlQYXlQd2QiLCJjcmVhdGVXZWJWaWV3IiwiaXNGaW5pc2giLCJnZXRVc2VyRGV0YWlsSW5mbyIsInNhdmVRY29kZSIsImNhbnZhcyIsInVpIiwiVUkiLCJwaWNVcmwiLCJ0b0RhdGFVUkwiLCJsb2dFdmVudCIsInNhdmVQaWNUb0xvY2FsIiwic3Vic3RyIiwic2hvd1RvYXN0V2l0aFBpYyIsInNob3dBbGVydCIsImVudiIsImlzSU9TIiwib3BlbkJyb3dzZXIiLCJzaG93VG9hc3QiLCJzaGFyZSIsImRlc2MiLCJpbWdVUkwiLCJwYWdlVVJsIiwic2hvd1NoYXJlUGFuZWwiLCJzaGFyZVVybCIsImdldEN1cnJlbnRMb2NhdGlvbkluZm8iLCJjYWxsYmFjazIiLCJzaG93TG9hZGluZyIsImNhbGxiYWNrIiwiZGlzbWlzcyIsInNlbmRNZXNzYWdlIiwiY21kIiwiZmV0Y2hOYXRpdmVEYXRhIiwieGhyIiwiY3JlYXRlVGV4dENhbnZhc2UiLCJ0ZXh0IiwiY29sb3IiLCJsb25nIiwic2hvdCIsInJlbTJweCIsInZhbCIsImNXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0Iiwic2V0QXR0cmlidXRlIiwid2lkdGgiLCJyb3RhdGUiLCJNYXRoIiwiUEkiLCJmaWxsU3R5bGUiLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsImZvbnQiLCJtZWFzdXJlVGV4dCIsImZpbGxUZXh0IiwiY3JlYXRlQ29udmFzQW5kU2F2ZVBob3RvIiwiY2FudmFzT2JqIiwiYmd1cmwiLCJxcmNvZGVVUkwiLCJxcmNvZGVXZEFuZEhnIiwieFdpZHRoIiwieUhlaWdodCIsInRleHRiZ1VSTCIsInhUZXh0V2lkdGgiLCJ5VGV4dEhlaWdodCIsImltZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwiaGVpZ2h0IiwiZHJhd0ltYWdlIiwidGV4dFVyaSIsInRleHRJbWciLCJxcmNvZGVXaWR0aEFuZEhlaWdodCIsImlubmVySFRNTCIsInFyY29kZSIsIlFSQ29kZSIsImNvcnJlY3RMZXZlbCIsIkNvcnJlY3RMZXZlbCIsIkwiLCJxcmNvZGVJbWciLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInFyY29kZUR4IiwicXJjb2RlRHkiLCJnZXRNYXRlcmllbEluZm9MaXN0IiwiZ2V0UmV3YXJkTGlzdCIsIkNPTlNUX0RBVEEiLCJpbWdlU2l6ZSIsImNhY2hlRmlyc3QiLCJ0aW1lIiwic3RvcmFnZSIsInZhbGlkYXRlVGltZSIsImNhY2hlRmlyc3RTdG9yYWdlIiwibmVlZFN3Iiwic3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlIiwicmVmcmVzaERvbUZ1bmMiLCJyZXEiLCJkYXRhRnJvbUNhY2hlIiwiZ2V0RnJvbVN0b3JhZ2UiLCJyZW1vdmVTdG9yYWdlIiwiaXNTYW1lQXRBbGwiLCJJbW11dGFibGUiLCJpcyIsImZyb21KUyIsImFzeW5jIiwiZW5kT2ZTeW5jRnVuYyIsInJlbW92ZUNhY2hlIiwiSW9naXN0aWNzSW5mb1BhZ2UiLCJzdGF0dXMiLCJyZW5kZXJJb2dpc3RpY0xpc3QiLCJ0cmFuc0pzb25PYmoiLCJKU09OIiwicGFyc2UiLCJtYXREZWxpdkRldGFpbCIsInRyYWNlcyIsImkiLCJ0ZW1wIiwiaiIsIkRhdGUiLCJhY2NlcHRUaW1lIiwiZ2V0VGltZSIsImluZGV4IiwiYWNjZXB0QWRkcmVzcyIsInJlbWFyayIsInJlcXVpcmUiLCJsb2dpc3RpY3NDb21wYW55IiwiYmlsbENvZGUiLCJtYXAiLCJyZW5kZW5Eb20iLCJSZWFjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFXZ0JBLFcsR0FBQUEsVztRQXlCQUMsUSxHQUFBQSxRO1FBaUJBQyxPLEdBQUFBLE87UUF1QkFDLE8sR0FBQUEsTztRQW9CQUMsUSxHQUFBQSxRO1FBMEJBQyxXLEdBQUFBLFc7UUFnREFDLFcsR0FBQUEsVztRQWdDQUMsUSxHQUFBQSxRO1FBb0JBQyxZLEdBQUFBLFk7UUFtQkFDLGtCLEdBQUFBLGtCO1FBbUhBQyxjLEdBQUFBLGM7UUFnQkFDLFUsR0FBQUEsVTtRQWdDQUMsZSxHQUFBQSxlO1FBZUFDLGdCLEdBQUFBLGdCO1FBZUFDLGUsR0FBQUEsZTtRQWlCQUMsYyxHQUFBQSxjO1FBZUFDLGEsR0FBQUEsYTtRQWdCQUMseUIsR0FBQUEseUI7UUFNQUMsYyxHQUFBQSxjO1FBdUJBQyxZLEdBQUFBLFk7UUFXQUMsZ0IsR0FBQUEsZ0I7UUFZQUMsWSxHQUFBQSxZO1FBWUFDLGMsR0FBQUEsYztRQWFBQyxTLEdBQUFBLFM7UUFZQUMsYSxHQUFBQSxhO1FBZ0JBQyxhLEdBQUFB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QUFzQjtBQUM5QixtQkFBTyxDQUFDLHNCQUFnQjtBQUN4QixVQUFVLG1CQUFPLENBQUMsc0JBQVM7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGdEQUFnRCxtQkFBTyxDQUFDLHNCQUFnQjtBQUN4RTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiY2h1bmsvSW9naXN0aWNzSW5mby42ZjljNmJjNThhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjb21vbVBhcmFtLCBnZXQsIHBvc3QsIFV0aWx9IGZyb20gXCIuL3JlcXVlc3RcIjtcclxuaW1wb3J0IENPTkZJRyBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHt9IGZyb20gXCIuL2NhY2hlU3RvcmFnZVwiO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSBcIi4uLy4uL3N0b3JlL3N0b3JlXCI7XHJcbmltcG9ydCB7VVBEQVRFX1NUT1JFX1NUQVRFfSBmcm9tIFwiLi4vLi4vc3RvcmUvYWN0aW9uXCI7XHJcbmltcG9ydCB7Y2FjaGVGaXJzdCxjYWNoZUZpcnN0U3RvcmFnZSxzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UscmVtb3ZlQ2FjaGV9IGZyb20gXCIuL2NhY2hlU3RvcmFnZVwiO1xyXG5cclxuLyoqXHJcbiAqIOeUs+ivt+e6ouWMheeggeeahOivt+axglxyXG4gKiBAcGFyYW0gcGhvbmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWNtZFJlY29yZChwaG9uZSkge1xyXG4gICAgaWYgKHBob25lID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHBob25lID0gXCJcIlxyXG4gICAgfVxyXG4gICAgbGV0IHJlY21kTW9iaWxlID0gVXRpbC5iYXNlNjRFbmNvZGUocGhvbmUpXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5yZWNtZFJlY29yZCwge3JlY21kTW9iaWxlfSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk55So5oi35piv5ZCm55Sz6K+357qi5YyF56CB5o6l5Y+j55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgIHJvbGxLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleVxyXG4gICAgICAgICAgICB9LCgpPT57fSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGw6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOivt+axgue6ouWMheWQl+i/nuaOpVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNoYXJsaW5rKCkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1Quc2hhcmVMaW5rLCB7fSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIGxldCByZWRVcmxTdHI9IFwiaHR0cHM6Ly93YWxsZXQuOTU1MTYuY29tL3Mvd2wvd2ViVjMvYWN0aXZpdHkvdk1hcmtldGluZzIvaHRtbC9zbnNJbmRleC5odG1sP3I9XCIgKyByZXNwb25zZS5kYXRhLmlkZW50aWZpZXI7XHJcbiAgICAgICAgICAgIGxldCBuZXh0U3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICByZWRVcmxTdHJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUobmV4dFN0YXRlKSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWRVcmxTdHIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5piv5ZCm5Zyo55m95ZCN5Y2V55qE6K+35rGCXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNCbGFjayh1cGRhdGUpIHtcclxuICAgIGxldCB1cGRhdGVGdW5jID0gZnVuY3Rpb24ocmVzcCl7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYmxhY2tTdDpyZXNwLmRhdGEuYmxhY2tTdFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpc0JsYWNrOiB1cGRhdGXlh73mlbDmiafooYzlrozmr5UnKTtcclxuICAgICAgICBpZiggdHlwZW9mIHVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJyApe1xyXG4gICAgICAgICAgICB1cGRhdGUocmVzcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/or7vlj5bnvJPlrZjvvIzlkIzml7blvILmraXlj5HpgIHor7fmsYJcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmlzQmxhY2sse30sc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlKHVwZGF0ZUZ1bmMpKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBibGFja1N0OnJlc3BvbnNlLmRhdGEuYmxhY2tTdFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOaYr+WQpuWcqOm7keWQjeWNleeahOivt+axglxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FwcGx5KCkge1xyXG4gICAgbGV0IGNhY2hlUGFyYW0gPSBjYWNoZUZpcnN0U3RvcmFnZSgzMCo2MCoxMDAwLENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleSk7Ly/nvJPlrZgzMOWIhumSn1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5pc0FwcGx5LCB7fSxjYWNoZVBhcmFtKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmFwcGx5U3QgIT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWmguaenOW3sue7j+eUs+ivt+i/h+e6ouWMheeggeWImee8k+WtmDMw5YiG6ZKf77yM5ZCm5YiZ5LiN57yT5a2YXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGFwcGx5U3Q6cmVzcG9uc2UuZGF0YS5hcHBseVN0XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog55Sz6K+35pS25qy+56CBXHJcbiAqIEBwYXJhbSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1jYyhwYXJhbSA9IHtcclxuICAgIHJlZmVyZWVUZWw6IFwiXCIsICAgICAgICAgLy/mjqjojZDkurrmiYvmnLrlj7dcclxuICAgIHZpcnR1YWxDYXJkTm86IFwiXCIsICAgICAgLy/omZrmi5/ljaHlj7dcclxuICAgIGFjY05tOiBcIlwiLCAgICAgICAgICAgICAgLy/lupfpk7rlkI3np7BcclxuICAgIGNpdHlDZDogXCJcIiAgICAgICAgICAgICAgIC8v5Z+O5biC5Luj56CBXHJcbn0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmFwcGx5TWNjLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk55So5oi35piv5ZCm55Sz6K+357qi5YyF56CB5o6l5Y+j55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgIHJvbGxLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleVxyXG4gICAgICAgICAgICB9LCgpPT57fSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGw6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueUqOaIt+eahOmTtuihjOWNoeWIl+ihqFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENhcmRsaXN0KCkge1xyXG4gICAgLy/ojrflj5bnlKjmiLfpk7booYzljaHliJfooajvvIznvJPlrZgx5YiG6ZKfXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldE1jY0NhcmRMaXN0LCBjb21vbVBhcmFtLGNhY2hlRmlyc3RTdG9yYWdlKDYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIC8v5aaC5p6c5ZCO5Y+w6L+U5Zue6ZO26KGM5Y2h5YiX6KGo5LiU5LiN5Li656m6XHJcbiAgICAgICAgaWYgKCEhcmVzcG9uc2UuZGF0YS5jYXJkTGlzdCAmJiByZXNwb25zZS5kYXRhLmNhcmRMaXN0Lmxlbmd0aCAhPSAwKSB7XHJcblxyXG4gICAgICAgICAgICAvL+WIneWni+WMlum7mOiupOWNoVxyXG4gICAgICAgICAgICBsZXQgZGVmYWx1dENhcmQgPSB7XHJcbiAgICAgICAgICAgICAgICBiYW5rOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h5omA5Zyo55qE6ZO26KGMXHJcbiAgICAgICAgICAgICAgICBjYXJkVHlwZTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHnsbvlnotcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uQml0bWFwOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeWKn+iDveS9jVxyXG4gICAgICAgICAgICAgICAgaWNvblJlbFVybDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h55qEbG9nb+WcsOWdgFxyXG4gICAgICAgICAgICAgICAgaXNTdXBwb3J0OiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKbmlK/mjIFcclxuICAgICAgICAgICAgICAgIHBhbjogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5bim5pyJ5o6p56CB55qE5Y2h5Y+3XHJcbiAgICAgICAgICAgICAgICByYW5rOiAwLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKbpgInkuK1cclxuICAgICAgICAgICAgICAgIHZpcnR1YWxDYXJkTm86IFwiXCIgICAvL+iZmuaLn+WNoeWPt1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFpdGVtLnNlbGVjdGVkICYmIGl0ZW0uaXNTdXBwb3J0ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhbHV0Q2FyZCA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8v5aaC5p6c5rKh5pyJ6buY6K6k6YCJ5Lit55qE5Y2h5Y+W5LiA5Liq5LiN6KKr572u5Li654Gw55qE5Y2h5Li66buY6K6k5Y2hXHJcbiAgICAgICAgICAgIGlmIChkZWZhbHV0Q2FyZC5iYW5rLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHJlc3BvbnNlLmRhdGEuY2FyZExpc3QubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5jYXJkTGlzdFtrXS5pc1N1cHBvcnQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhbHV0Q2FyZCA9IHJlc3BvbnNlLmRhdGEuY2FyZExpc3Rba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc3RvcmVTdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHN0b3JlUmVjZWl2ZUNhcmRPYmo6IGRlZmFsdXRDYXJkLFxyXG4gICAgICAgICAgICAgICAgY2FyZExpc3Q6IHJlc3BvbnNlLmRhdGEuY2FyZExpc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoc3RvcmVTdGF0ZSkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5Zyw5Z2A5YiX6KGoXHJcbiAqIEBwYXJhbSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBZGRyTGlzdChcclxuICAgIHVwZGF0ZSwgLy/nvJPlrZjnmoTmm7TmlrDlh73mlbBcclxuICAgIHBhcmFtID0ge1xyXG4gICAgICAgIHN0YXRlOiBcIlwiICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG4pIHtcclxuICAgIC8vIOivu+WPlue8k+WtmO+8jOWQjOaXtuW8guatpeWPkemAgeivt+axglxyXG4gICAgbGV0IHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbihyZXNwKXtcclxuICAgICAgICAvLyDlnKh1cGRhdGXlh73mlbDkuK3vvIzmm7TmlrByZWR1eOS4reeahGFkZHJlc3NMaXN0XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHthZGRyZXNzTGlzdDpyZXNwLmRhdGEucmVzdWx0fHxbXX0pKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0QWRkckxpc3Q6IHVwZGF0ZeWHveaVsOaJp+ihjOWujOavlScpO1xyXG4gICAgICAgIGlmKCB0eXBlb2YgdXBkYXRlID09PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICAgICAgdXBkYXRlKHJlc3ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBjYWNoZVBhcmFtID0gc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlKHVwZGF0ZUZ1bmMsQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSk7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRBZGRyTGlzdCwgT2JqZWN0LmFzc2lnbih7fSwgY29tb21QYXJhbSwgcGFyYW0pLGNhY2hlUGFyYW0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBhZGRyZXNzTGlzdCA9IHJlc3BvbnNlLmRhdGEucmVzdWx0IHx8IFtdO1xyXG5cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBhZGRyZXNzTGlzdFxyXG4gICAgICAgIH0pKVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOeUs+ivt+eJqeaWmeaOpeWPo1xyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNYXQocGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxMaXN0OiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v54mp5paZ5YiX6KGoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsaXZObTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pS26LSn5Lq6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkQWxsOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Yy65ZCN56ewXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsaXZQaG9uZTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pS26LSn55S16K+dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmluY2VJZDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v55yBSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5SWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/luIJJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFJZDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWMuklEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzc0luZm86IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6K+m57uG5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcnLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Z2A55qESURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5Tm06IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/miYDlnKjln47luIJDaXR5Q29kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZFVybDogXCJcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+e6ouWMheeggeWcsOWdgCAg5Y+v6YCJ5Y+C5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5hcHBseU1hdCwgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bllYbmiLfmlLbmrL7noIHlnLDlnYDlkozllYbmiLfnvJblj7dcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRRclVybFJlc3QoKSB7XHJcbiAgICAvL+e8k+WtmDLlsI/ml7ZcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0UXJVcmwsIGNhY2hlRmlyc3RTdG9yYWdlKDIqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIG1jaG50RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICBxclVybDogcmVzcG9uc2UuZGF0YS5xclVybCxcclxuICAgICAgICAgICAgICAgIHFyTnVtOiByZXNwb25zZS5kYXRhLnFyTnVtXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAq6I635Y+W5bqX6ZO65Yy65Z+f5YiX6KGo5ZKM5bqX6ZO657G75Z6L5YiX6KGoXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNY2hudEFuZEFyZWFJbmYoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5nkuKrmjqXlj6Ms5Y+q6LWwc3fvvIzkuI3otbBsb2FjYWxTdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIC8vIGxldCBjYWNoZVBhcmFtID0ge1xyXG4gICAgLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbiAgICAvLyAgICAgZm9yQ2hzcDpmYWxzZSxcclxuICAgIC8vICAgICBlbmNyeXB0OmZhbHNlLFxyXG4gICAgLy8gICAgIGNhY2hlOiB0cnVlXHJcbiAgICAvLyB9XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldE1jaG50QW5kQXJlYUluZiwgY29tb21QYXJhbSwgY2FjaGVGaXJzdCgyNCo2MCo2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBsZXQgYXJlYSA9IFtdLCBtZXJjaGFudFRwID0gW107XHJcblxyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog55yB57qnXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLmFyZWFBcnIuZm9yRWFjaCgocHJvdmluY2UpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb25lID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogcHJvdmluY2UucHJvSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBwcm92aW5jZS5wcm9ObSxcclxuICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvdmluY2UucHJvTm0gPT0gXCLljJfkuqzluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIuS4iua1t+W4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi5aSp5rSl5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLph43luobluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIua3seWcs+W4glwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBwcm92aW5jZS5wcm9JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBwcm92aW5jZS5wcm9ObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmluY2UuY2l0eS5mb3JFYWNoKChjaXR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aHJlZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogY2l0eS5jaXR5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IGNpdHkuY2l0eU5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aHJlZS52YWx1ZSAhPSB0d28udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR3by5jaGlsZHJlbi5wdXNoKHRocmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgb25lLmNoaWxkcmVuLnB1c2godHdvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIOW4gue6p1xyXG4gICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlLmNpdHkuZm9yRWFjaCgoY2l0eSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR3byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogY2l0eS5jaXR5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IGNpdHkuY2l0eU5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgICAgICog5Yy657qnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5LmFyZWEuZm9yRWFjaCgoYXJlYSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aHJlZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGFyZWEuYXJlYUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogYXJlYS5hcmVhTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR3by5jaGlsZHJlbi5wdXNoKHRocmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBhcmVhLnB1c2gob25lKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEubWVyY2hhbnRUcEFyci5mb3JFYWNoKChtZXJUeXBlMSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9uZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IG1lclR5cGUxLm1lcmNoYW50VHBDZCxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IG1lclR5cGUxLm1lcmNoYW50VHBObSxcclxuICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbWVyVHlwZTEubWVyY2hhbnRUcEFyci5mb3JFYWNoKChtZXJUeXBlMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogbWVyVHlwZTIubWVyY2hhbnRUcENkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IG1lclR5cGUyLm1lcmNoYW50VHBObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25lLmNoaWxkcmVuLnB1c2godHdvKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgbWVyY2hhbnRUcC5wdXNoKG9uZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXh0U3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG1jaG50QW5kQXJlYUluZjoge1xyXG4gICAgICAgICAgICAgICAgYXJlYUFycjogYXJlYSxcclxuICAgICAgICAgICAgICAgIG1lcmNoYW50VHBBcnI6IG1lcmNoYW50VHBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUobmV4dFN0YXRlKSlcclxuXHJcbiAgICB9KVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluW6l+mTuuivpuaDheS/oeaBr1xyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNY2hudERldGFpbCgpIHtcclxuICAgIGxldCBjYWNoZVBhcmFtID0gY2FjaGVGaXJzdFN0b3JhZ2UoNjAqMTAwMCxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTsvL+e8k+WtmDHliIbpkp9cclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldE1jaG50RGV0YWlsLCBjb21vbVBhcmFtLGNhY2hlUGFyYW0pLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICBpZiAocmVzcC5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1Mpe1xyXG4gICAgICAgICAgICBsZXQgbWNobnREZXRhaWwgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7bWNobnREZXRhaWx9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobWNobnREZXRhaWwpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDljYfnuqfllYbpk7rkuoznu7TnoIFcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZ3JhZGVNY2MocGFyYW09e1xyXG4gICAgc3RvcmVObTogXCJcIiwgICAgLy/lupfpk7rlkI3np7BcclxuICAgIFN0b3JlVHA6IFwiXCIsICAgIC8v5bqX6ZO657G75Z6LXHJcbiAgICBwcm92Q2Q6IFwiXCIsICAgICAvL+ecgUlEXHJcbiAgICBjaXR5Q2Q6IFwiXCIsICAgICAvL+W4gklEXHJcbiAgICBjb3V0eUNkOiBcIlwiLCAgICAvL+WMuklEXHJcbiAgICBhZGRyOiBcIlwiLCAgICAgICAvL+WcsOWdgFxyXG4gICAgY2VydGlmUGljMTogXCJcIiwgLy/ouqvku73or4HmraPpnaLnhadcclxuICAgIGNlcnRpZlBpYzI6IFwiXCIsIC8v6Lqr5Lu96K+B5Y+N6Z2i54WnXHJcbiAgICBjZXJ0aWZQaWMzOiBcIlwiLCAvL+aJi+aMgei6q+S7veivgeeFp+eJh1xyXG4gICAgbGljZW5zZVBpYzogXCJcIiwgLy/okKXkuJrmiafnhadcclxuICAgIHNob3BQaWMxOiBcIlwiLCAgIC8v5bqX6ZO654Wn54mHMVxyXG4gICAgc2hvcFBpYzI6IFwiXCIsICAgLy/lupfpk7rnhafniYcyXHJcbiAgICBhdXhQcm92TWF0MTogXCJcIiwvL+i+heWKqeeFp+eJhzFcclxuICAgIGF1eFByb3ZNYXQyOiBcIlwiLC8v6L6F5Yqp54Wn54mHMlxyXG4gICAgc2hvcExvZ29QaWM6IFwiXCIgLy/lupfpk7pMT0dPXHJcbn0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnVwZ3JhZGVNY2MsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgLy/liKDpmaTlupfpk7ror6bmg4XnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk55So5oi35piv5ZCm5Y2H57qn55qE5o6l5Y+j55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5VcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdC5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Quc2Vjb25kS2V5KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueUqOaIt+eahOWNj+iurue8luWPt+WSjOWNj+iuruWQjeensFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm90b2NvbEluZm8oKSB7XHJcbiAgICAvKipcclxuICAgICAqIOi/meS4quaOpeWPoyznvJPlrZgy5bCP5pe2XHJcbiAgICAgKi9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0UHJvdG9jb2xJbmZvLCBjb21vbVBhcmFtLGNhY2hlRmlyc3RTdG9yYWdlKDIqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlLmRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOWOhuWPsuaUtuasvlxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXN0b3J5SW5jb21lKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRIaXN0b3J5SW5jb21lLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5SW5jb21lT2JqOiByZXMuZGF0YVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDljoblj7LorqLljZVcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlzdG9yeVRyYW5zKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRIaXN0b3J5VHJhbnMsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5MaXN0RGF0YSA9IHN0b3JlLmdldFN0YXRlKCkuZ2V0SW4oWydoaXN0b3J5T3JkZXJMaXN0J10pLnRvSlMoKVxyXG4gICAgICAgICAgICBsZXQgbmV3TGlzdCA9IHJlcy5kYXRhLnRyYW5zSW5mbztcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3TGlzdClcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnlPcmRlckxpc3Q6IG9yaWdpbkxpc3REYXRhLmNvbmNhdChuZXdMaXN0KVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDku4rml6XmlLbmrL5cclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9kYXlJbmNvbWUoKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRUb2RheUluY29tZSxjb21vbVBhcmFtKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICB0b2RheUluY29tZU9iajogcmVzLmRhdGFcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOS7iuaXpeiuouWNlVxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2RheVRyYW5zKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRUb2RheVRyYW5zLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBsZXQgb3JpZ2luTGlzdERhdGEgPSBzdG9yZS5nZXRTdGF0ZSgpLmdldEluKFsndG9kYXlPcmRlckxpc3QnXSkudG9KUygpXHJcbiAgICAgICAgICAgIGxldCBuZXdMaXN0ID0gcmVzLmRhdGEudHJhbnNJbmZvO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgdG9kYXlPcmRlckxpc3Q6IG9yaWdpbkxpc3REYXRhLmNvbmNhdChuZXdMaXN0KVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDljZXnrJTmn6Xor6JcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bShwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bSxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKVxyXG59XHJcbi8qKlxyXG4gKiDojrflj5bnianmtYHkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpc3RpY3NTdChwYXJhbSl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldExvZ2lzdGljc1N0LCBPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIGxldCBuZXdPYmogPSByZXMuZGF0YS5kZWxpdmVyeU1zZztcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIG5ld09iai5tYXREZWxpdlN0YXR1cyDnmoTnirbmgIHlkoxyZWR1eOeahHN0b3Jl5L+d5oyB5LiA6Ie0XHJcbiAgICAgICAgICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbmV3T2JqLm1hdERlbGl2U3RhdHVzID0gcmVzLmRhdGEubWF0RGVsaXZTdGF0dXM7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICBkZWxpdmVyeU1zZzogbmV3T2JqXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIOWVhuaIt+acjeWKoemmlumhtSDngrnlh7vkv6HnlKjljaHmjInpkq7mn6Xor6LllYbmiLfmmK/lkKblvIDpgJrov4fkv6HnlKjljaHmlLbmrL5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVcGdyYWRlU3QoKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0VXBncmFkZVN0LCBjb21vbVBhcmFtKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueJqeaWmeWOhuWPsuiuouWNlVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2lzdGljc0xpc3QocGFyYW0pe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRMb2dpc3RpY3NMaXN0LE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmn6Xor6Lkv6HnlKjljaHmlLbmrL7ljYfnuqfnirbmgIFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBdWRpdEluZm8oKXtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEF1ZGl0SW5mbywgY29tb21QYXJhbSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluaUtuasvumZkOmineivpuaDhVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbWl0QXRJbmZvKCl7XHJcbiAgICAvL+e8k+WtmDLkuKrlsI/ml7ZcclxuICAgIHBvc3QoQ09ORklHLlJFU1QuZ2V0TGltaXRBdEluZm8sY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwKT0+e1xyXG4gICAgICAgIGlmKCByZXNwLnN0YXR1c0NvZGUgPSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTICl7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7bGltaXRJbmZvOnJlc3AuZGF0YX0pKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmm7TmlrDlupfpk7ror6bmg4VcclxuICogQHBhcmFtIHsqfSBwYXJhbSDlupfpk7ror6bmg4Xkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtY2hudE9wZXIocGFyYW0gPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC51cGdyYWRlTWNjICwgT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5Yig6ZmkbWNobnREZXRhaWznvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTsgXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOWIoOmZpOWcsOWdgOS/oeaBr1xyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUFkZHJlc3MocGFyYW09e1xyXG4gICAgaWQ6JycgLy/lnLDlnYBpZFxyXG59KXtcclxuICAgIFxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZGVsZXRlQWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/liKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocGFyYW0pO1xyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDmm7TmlrDmlLbmrL7pk7booYzljaFcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNY2NDYXJkKHBhcmFtPXtcclxuICAgIHZpcnR1YWxDYXJkTm86JycgLy/omZrmi5/ljaHlj7dcclxufSkge1xyXG4gICAgXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC51cGRhdGVNY2NDYXJkLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+aNouWNoeWQju+8jOa4hemZpOW6l+mTuuivpuaDhee8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTsgXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOaWsOWinuWcsOWdgFxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivpue7hueahOWcsOWdgOS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0FkZHJlc3MocGFyYW09e30pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULm5ld0FkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyl7XHJcbiAgICAgICAgICAgIC8vIOWIoOmZpOaUtui0p+WcsOWdgOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog5L+u5pS55Zyw5Z2A5L+h5oGvXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+m57uG55qE5Zyw5Z2A5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZWRpdEFkZHJlc3MocGFyYW09e30pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmVkaXRBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1Mpe1xyXG4gICAgICAgICAgICAvL+WIoOmZpOaUtui0p+WcsOWdgOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOWQr+WBnOaUtuasvueggeacjeWKoVxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE1jY09uT2ZmKHBhcmFtPXtcclxuICAgIGlzVXNlTWNjOicnICAvL+aYr+WQpuS9v+eUqOaUtuasvueggeacjeWKoVxyXG4gfSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1Quc2V0TWNjT25PZmYsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5Yig6Zmk5bqX6ZO66K+m5oOF57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7IFxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOiOt+WPluWQiui1t+aUr+S7mOaOp+S7tueahFRO5Y+3XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNjVHJhbnNOdW0oKXtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldE1jY1RyYW5zTnVtKS50aGVuKChyZXNwKT0+e1xyXG4gICAgICAgIGlmKCByZXNwLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyApe1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHttY2NUcmFuc051bTpyZXNwLmRhdGEudHJhbnNOdW19KVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL3JlcXVlc3RBUEkuanMiLCJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBpZiAoc2FmZSAmJiB0YXJnZXRba2V5XSkgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanNcbi8vIG1vZHVsZSBpZCA9IDE0ZGMxZjdlYmQ4MGQxNWJmZDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDE2Nzk4NTFiZTI3YjI2OGVhMjRlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImNsZWFyZml4XCI6XCJjbGVhcmZpeFwiLFwiZG5cIjpcImRuXCIsXCJpb2dpc3RpY0luZm9Db250YWluXCI6XCJpb2dpc3RpY0luZm9Db250YWluXCIsXCJpb2dpc3RpY0JnXCI6XCJpb2dpc3RpY0JnXCIsXCJpb2dpc3RpY0luZm9cIjpcImlvZ2lzdGljSW5mb1wiLFwiaW9naXN0aWNUaXRsZVwiOlwiaW9naXN0aWNUaXRsZVwiLFwiZ3JleUxpbmVcIjpcImdyZXlMaW5lXCIsXCJpb2dpc3RpY1N0YXR1c1wiOlwiaW9naXN0aWNTdGF0dXNcIixcImlvZ2lzdGljSW1nXCI6XCJpb2dpc3RpY0ltZ1wiLFwiaW9naXN0aWNNZXNzYWdlXCI6XCJpb2dpc3RpY01lc3NhZ2VcIixcImlvZ2lzdGljTGlzdFwiOlwiaW9naXN0aWNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJkZXRhaWxJbmZvXCI6XCJkZXRhaWxJbmZvXCIsXCJsZWZ0Qm9yZGVyV2FycFwiOlwibGVmdEJvcmRlcldhcnBcIixcInBvaW50XCI6XCJwb2ludFwiLFwibGluZVdhcnBcIjpcImxpbmVXYXJwXCIsXCJsaW5lXCI6XCJsaW5lXCIsXCJjb250ZW50SW5mb1wiOlwiY29udGVudEluZm9cIixcImRlc2NcIjpcImRlc2NcIixcImRlc2NUaW1lXCI6XCJkZXNjVGltZVwiLFwibW9uZXlDb2RlSW5nXCI6XCJtb25leUNvZGVJbmdcIixcImV4cGxhaW5cIjpcImV4cGxhaW5cIn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9Jb2dpc3RpY3NJbmZvL0lvZ2lzdGljc0luZm8uc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTkwZWNkNGM3MmQ3YTQ0MjNmY2Jcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDIxZGZhYzI4NTIzYWUzN2RhYzViXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDI1MWJjN2FmZTgxMjdlMDkxNDlkXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOGNmZjg2ZTFkNTFlYmYyMWY3ZlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gM2MyNGQzOGZmY2QwYzM4ZTM0Nzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3RhdGljL2ltZ3MvbW9uZXlQcm9pbmctaWNvbi43OWViNWRmNWMwLnBuZ1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Fzc2V0cy9pbWdzL21vbmV5UHJvaW5nLWljb24ucG5nXG4vLyBtb2R1bGUgaWQgPSA0ZWU0Y2ExNGUwOTYzNDE2MTJjM1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQge0lvZ2lzdGljc0luZm99IGZyb20gJy4vSW9naXN0aWNzSW5mb0FjdGlvbnMnXHJcbmltcG9ydCBJb2dpc3RpY3NJbmZvUGFnZSBmcm9tIFwiLi9Jb2dpc3RpY3NJbmZvXCI7XHJcbmltcG9ydCB7Y29tb21QYXJhbSwgYmVmb3JlRW50ZXJSb3V0ZXIsIGdldFNlYXJjaFBhcmFtLG1jY1N0YXRlQ2hhbmdlZH0gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RcIlxyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vLi4vc3RvcmUvc3RvcmUnO1xyXG5pbXBvcnQge1VQREFURV9TVE9SRV9TVEFURX0gZnJvbSBcIi4uLy4uL3N0b3JlL2FjdGlvblwiXHJcblxyXG5jbGFzcyBJb2dpc3RpY3NJbmZvQ29udGFpbmVycyBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgYmVmb3JlRW50ZXJSb3V0ZXIoXCLnianmtYHkv6Hmga9cIik7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogbG9jYXRpb24uc2VhcmNo55Sx5Y6G5Y+y6K6i5Y2V6L+b5YWlLi4uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IGRhdGFQYXJhbSwgc2VhcmNoID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2g7XHJcblxyXG4gICAgICAgIHNlYXJjaCA9IGdldFNlYXJjaFBhcmFtKHNlYXJjaCk7XHJcbiAgICAgICAgLy8gc2VhcmNoLm1hdGVyaWFsSWQ9XCIwMTAyOTgwMjYyMDAwMDAyMzAyMDE4MDYyMTE2MzgzOVwiO1xyXG4gICAgICAgIGlmICghIXNlYXJjaC5tYXRlcmlhbElkKSB7XHJcbiAgICAgICAgICAgIGRhdGFQYXJhbSA9IE9iamVjdC5hc3NpZ24oe21hdGVyaWFsSWQ6IHNlYXJjaC5tYXRlcmlhbElkfSxjb21vbVBhcmFtKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGF0YVBhcmFtID0gY29tb21QYXJhbVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgSW9naXN0aWNzSW5mbyhkYXRhUGFyYW0pLnRoZW4oKG5ld09iaikgPT57XHJcbiAgICAgICAgICAgIGlmKG5ld09iai5tYXREZWxpdlN0YXR1cyA9PSBcIjAyXCIpe1xyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiDpgJrnn6XlrqLmiLfnq6/kv67mlLnnirbmgIFcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgbWNjU3RhdGVDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgZGVsaXZlcnlNc2c6e31cclxuICAgICAgICB9KSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxJb2dpc3RpY3NJbmZvUGFnZSB7Li4udGhpcy5wcm9wc30gLz47XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcHN0YXRlVG9Qcm9wcz0oc3RhdGUpPT57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRlbGl2ZXJ5TXNnOnN0YXRlLmdldEluKFtcImRlbGl2ZXJ5TXNnXCJdKS50b0pTKClcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcHN0YXRlVG9Qcm9wcykoSW9naXN0aWNzSW5mb0NvbnRhaW5lcnMpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0lvZ2lzdGljc0luZm8vSW9naXN0aWNzSW5mb0NvbnRhaW5lci5qcyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1M2I3ZDM0ODE3MTQ0YjEyYjBhYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQge2dldExvZ2lzdGljc1N0fSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdEFQSVwiO1xyXG5cclxuLyoqXHJcbiAqIOafpeivouWVhuaIt+aUtumSseeggeeahOeJqea1geS/oeaBr1xyXG4gKiBAcGFyYW0gcGFyYW1cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gSW9naXN0aWNzSW5mbyhwYXJhbSl7XHJcbiAgICByZXR1cm4gZ2V0TG9naXN0aWNzU3QocGFyYW0pLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBsZXQgbmV3T2JqID0gcmVzLmRhdGE7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXdPYmopO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0lvZ2lzdGljc0luZm8vSW9naXN0aWNzSW5mb0FjdGlvbnMuanMiLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNWU1OWI3MWIzM2EzOGMzNjE4ZTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSkge1xuICB2YXIgQyA9IHR5cGVvZiBjb3JlW0tFWV0gPT0gJ2Z1bmN0aW9uJyA/IGNvcmVbS0VZXSA6IGdsb2JhbFtLRVldO1xuICBpZiAoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkgZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDVlNzQ5MWYxZjc5OTcxNWVhYzc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQU1nQUFBRElDQVlBQUFDdFdLNmVBQUFBQVhOU1IwSUFyczRjNlFBQUdnTkpSRUZVZUFIdG5RbWNGTVc5eDZ1cVo0WTlZTGxad0Ywd0hKb2dLQ0tDQ29yRUl5b0N4Z1N2cDA5alZCUUVEZmhKMU9nTCtqendBTG54aU1SSEVoUEVweEU4aWZlQklJS2N3UWdxc0N2SEFzc0NlODkwVlg0MXV6TU03TTd1ekU3UGJIZlB2eitmM2VtdXJ2TmIvZXU2cXhtamd3Z1FBU0pBQklnQUVTQUNSSUFJRUFFaVFBU0lBQkVnQWtTQUNCQUJJa0FFaUFBUklBSkVnQWdRQVNKQUJJZ0FFU0FDUklBSUVBRWlRQVNJQUJFZ0FrU0FDQkFCSWtBRWlBQVJJQUpFZ0FnUUFTSkFCSWdBRVNBQ1JJQUlFQUVpUUFTSVFQMEVlUDNHWk9wMkF1cnV1OXVhNXVGZmNHa09VWXIxWnB4MTU0eTNaRXdaT01jUE4vSHZzR0o4T3k2M0tNNC9Nenc1ci9DcFV3KzRuVTFrK2tnZ2tUUmNmcTd1dXYxSGtwbFhLS2xHY3M1N0tzWldLS1hXZUFRck1qbmJCekhzVTVLVmFneGNzSmFjcVE2R1loMENrbldDL1FHNFBoTjJ0a0JJUzRYWDl4S2ZPbU9ieTVFRjN4VnVUMlBhcDA4THcyVG1ZMXlwTXdEalBhWEVSMUtaRzVrUTBFZ2NoNVJjR0tJZi9CbW11RG9QaGMxeXcrdjduWnVGUWlWSUhNK0gwNnlxZThhM04vM21nMXl4eXlSakMxRTZ2TXFFcmpwWmNIRGhNWmo4T1ZQcU9wUXFyeG95NDMvNFUwOFZXK0N6cmJ3UXRvb05SY1l5QXVxdTI2NlJmcm1lS3k2azhGeUJoL2hseThTaFk2bGt3RlJzc1dUaVNseDVwVkc1UWQxMTYxV1dKY0FtSGxFSllwT01zRElhL3NtM1BpcVl1bHdKejJRcDVTNHIvWTdtRnlwcnh6R3VwcUhCdjhnNy9lbjdvdGx6bWprSnhHazUxa0I4MVc5K2s2bEV4ZDhsWnpsb1o5eXZtS3Bvd0xybHQ3aGtXVnlvaHlET1lpNnpya0dWSzZYaFc1NGdlRWhWckdSUWJRWS90VGdDb3VJelZIbjJTY1h2U3JVNGRKS1ZZT1ZTcXNrSXYwU0t5azkwbkpvQmhhVkJra0FzeGRsOG51bVNnelB4bFdScVh2UEZBaUdqWjB4eVBnZmR4eHVVS0greFdlTmlRZUFrRUFzZ05yY1h1czJCaDdKMXM0c2pBb1JVYXE1a3ZKMS8wcTBQUlJnNzdwUUU0cmdzT3pyQ3VyZEtjUFlMcFhqek5Jd041ajA2UnJWWEtFbFFsTnduQkx2Q3liMWIxRWl2TjNlZFlhakhPV1MxdVFFOXVXUHh4dDZaaWxqampkb0pvNHVub3lIZWpuRU1HWnJpUXlsa1liU3dCZWRkMFNYOHRDRXoremx4bk1RVExXRmtibjhDRW9PQW1BdXhKSm5pNEV4bUN5NEdnRVozVFVReVdjU0U1elBUbENWTWo4TUxERUUyY09pNEdad3ROWTJLQjJCdFFnTldiWG1MU2hCYlprdmprUXJPcTFLQlQvVkFuYVU5VmxJWmdodDlPVGY3b0lUQVlMa3FRKy9VYXZSTTdXZzhWdlhid055dFRNSGtJdUhOR09LMGFTbFVndFNmcDdZMzFYT3I4QUpmYUlVNDBGdzRYcG44TkxRWE10SHhiNklIYXFQSnhDSk1JMEU3Rys5UVhWSWtjQVRqeVBtZnBiOXFLcnh4MUdnN2xTQUpaSHh6T2EwdFBUNHlKZnRsVTZhUGNNbmJDNE9kamllL1F6QU5TbTZUekZodGhkaWlNc0hjTGNFQ0x4dktNNVJQbTdzOXFqMmIzYUFTeEdZWkVrdDA5SlIxMkhzdlZuRmdDbTZHa1A0QlVyRWVBc1dFRkdvLzJnYXI5UFQybXZCMFoyWjh4UVRHWE5vcEptT2ZuSWk1VzVoRC83N2tVc2Y5aVpwdzdmK2ZCR0wvUEtvVFE3MmVBNjNqUDJMdVU1MTdOUVljTWxCOVVEdnFpMnVQbElGS0pjUWFWSmlXWTRKaDdSRi81UUV5MHY0Vm9WbGVoRW5CQzB6Rkx3djVCdUYxUVpkV09icWJENGJNNnZ4SzhSRkVkUVBNSFNNUS9lcWd3MEVFOUVwQXZkZ3B1SjZqbm5nSEZ6b3BkWlhCcFFmdGlKY2hpTC9vbWJ4U3N1L3FzUjZYRVNUVlMzRTJQT2dJbmhxS0QvZHdkYmZCMVN0TW1yL0gvWm9xV3hSZnBRcXNSOC93Q1dyS25XMmlXTEdkTVFuRWRsblNjSVQwTWxrVUFpdWlMWGJTS3dMeEVML29WMkt0bnBMZXNHOTE3d3F1dXFGYmRnem53bWNvTlFnUDlHaHVpRFlHNTJlaUZGcUprWS9CZXFVaDR0QmFDZGtkaGRnL3NQN3dueER0SXZSMGZWdlh4d2dUOUFad0pWYVlaZjdMSTB4dGZVb0NzWFgyMUkxY2NBMDVZNnZyM21tYWlYN3dzV0FrVDd0R3RlbEVyRVcvQ05XZy8rTE1mQVFHSjNBcE5qRy9ySWJZYnRKVDU5SDI2Q1NZT0FXbFJUWjZ1RDcyTS80MTJqWjcwSVJwSDBzTVRDYS9nc0NHeEdMWERuWklJSGJJaFRqaW9EZFlRTFZtYnh4T0dyWXExVGpGNVdTMFdXYWg5WDRCL1A4SkJoL0hDc2JMME0yN1EzSzFWYy9TUlNrUjRBYlA0Vnh1UkNjQlJNUVdZdzNJalVIUGxhcEVJNzlWd3dIVjNNVURWNlJNMVRzV3UzYXdRd0t4UXk3RUV3ZnNQcUkzV0lqSGliYXJxMGxZcTNFQmVtWHV3OXl0bjJnelBRMEVELzhoaklhdnhGejFXV2pVcjhlOWJwaERkVDU2bStaQkJKSGhyTUtnNFNBbFVjMWk0bHRwOEtlMEg2aU9YUVUzUFNDUTcvVjFZNGN5K0Q2VUlOMGJzMmVYKzlTTFpaZWNpREVlZW1zZXRDejJOYnFTQjVNSURaUDF4NE03R0Y2ZnFrd1RpNWM0dW5aVkNhN1B3ZmxtVEJ5NXptRHNUeEJjQWRvYUkxRzlHb1lTUTVjZVE1bkpuMFJiWmo5S3E5MVlmTFVWSmN0S2xCNmpsS0graW9WUjErTCswNll3SHVJeU1CM0M2Z0U3TDhXU0JHd2Z0QTlodFl6RnJoM3NrRURza0F2eHhJSGpFUlU4dURWUE5HY2V6aDVBTlNZUEQrTTZOSXBYU2c5N1RnVlVsYmFQWnZKeGVFRC9GNmZQS0dVODU4ZFlCamQ1U3pTNHo4Q2NxeG1vVXZSRlMvcEV0QzhPNGZjTmRPV2lrRUVMaExOTkVOTURFTWFQVVFYTDBuTzAwQ0ZRaGxMb1pkeStIWDQrNjFIOFN3andXeW5GTW9XeGx2cmloM2dkZ25uOU00RHJjOURNWmlTUVpzNkFaQVJ2Y3VOUmpFbFUxb3o5b2FJVTBaY0YwUlNqZ2QwRnBZQVdSVEVlL2s1NG1LY2JITlVtcHNaZ05tSWhTcGMzTU5heDBhdDRYMHhPdkJqZHhjRnhDd2dDeHVKSmxDUm5vV0UvRU82K2h4bmFNT3dXbUVNc3dYMnoraklQeEFpYmJqaElJRTdMUmV4NHFNYzZkSGR1dEtncmFWYWluditDWXVKR2JRZU42Wk1ZTndkakVHOGczdmJhYUM5NlhQdmp3ZjhVMTFNOGdzOEpLTFVKOXc5ai9PUXNWT1AwTmtGb2pLdCttQXdaN3JyRnJsZ1lCVWY1QUk4aGh0SHdhanltTnY0QkE1ZG9xeWhNNG1MdncrLzNhNExRd2RROWRFTWZGdjExNzlqVGhBUml6M3lKR2l0VVlVcjFnQnpHNmFJS3BNWXhMeEZvYUdPY0lnTWo3cHRRS3F5RUFGN1VQVko0MEgyWWgxaU4waU1mc3hISDRXM2ZDVzVtby9FOUNadG1MWWYvbzlEdzdvdzVXLzBnaEdXWWxuS3Q3dFZDVytWVjdUZmNiMEJYY0h0bXNpZDFmR3JDaSswL3hsRTZ3T2JoMkd3M3Z5MFNTUFBuUVp3eDROc3dnTmNCYi9odERUcmtjZ1gyeE9wb01qNGI0cWl4Q2tYb1E0dEQvK3BTQnYvUGcxOUZRaGxQb1pTNUNjWUxVQUo4Q29HTWc1aTZvN3daREhHc3hLYUtYNGE4MFFPUU1IKzMwWTRDSGNneEJ6Y3h5TWpaOW1PTWJYdEpBckZ0MXRRZk1UenFXL1JldWVHSHRYNXJhR1B6Rlhqell4bHVyVGpxc1llSDNLOG5NdUtoUFJGZHZlZEJVRDFSZlpwa0NyVVNKY3M4REFEdURqdXJGVmY0dW9rbkVHTW54R2hyRTUybjNCa0pKT1hJRXdzUTB6MldjeWxINE9GK3N5R2Y4TWJmaGw2blRwaURsYVdyVlNHN0tEVTZvSVFZQkFWZENPMXNETFpYVUh6QTdFMlVOdE9EZXNJckh2NG41VENZT0JWVnROZVM0bmtTUENXQkpBRnFNcjAwakZiL0wyWEpReGkwUTVNQjcvc0dEdGhZaVhVZnQ2Qk90UWE5VndQeE93aVBQbHh5RFBheHY2SUxkNVYyRG9NMURYZ1Q4eTEwRStjcEZSaUlidVp0d2JsZ3g3cUVhdEZGZlliUjBuZkRzYmZzZWgyOS9MVnJqQ2xlTEREcDFrOHhEUDQ4cWtEckc4SWhoTXpGNE45a2RNa2VSaW15Q2tMNElxNDFIQTE1am50NmRGNUlpWjR4MWhuaTA4OVNnVzZySUt4NkcrNFlNK2tQTlY3dm1UNy9uRWE4dHMxdEtrRnNreFd4UndRemJaZWdJQmlHUjdSQmdhQkRkZzk4L1MzZTI3Vzl1dzBXT0kxR1FNL3dGZExzajBIRDNuallNVmFvU2pDUGF4WENlVGZjMW1tb3JZSTRRMGRMR3czSVJoWklJRGJLakZpamdxck1ZcXhKL3hnem9lYnJIcVZZM1RYRkhpWXgvaGpESGllanU5ZUhSbjgxdGhoYWk2NWRWTSswYjFwNERTa2lJa1FzdWNVTTRlR0dFUGRIbU5yK2xLcFl0cytpK2lNWW1EeHVFVEx2TzVNcFRQV3c3cWhaR2FnR1FoaXRJUWlGcC9yZmZzSFhZY3dqb2NFOWxEZFhvc1dVYjB5YmY3VjFzVTIrVDY0dFFhWmc5dHlYY3dyUHdkeWYwZWlaT1J1VDdicGloRGdYYjc4WVgzbkpoNTlJQ0RjSFN0aGpSUXZaWSswdnU3dWFOMzFxVTZhcVpyMnJkckgyc21iczdvQm95YjVwMFlXVjh4WlJvNGZlQVluTlQ0cTl5dHliYlZaKzFUT3crNlBMU3o5ZjR6V1BMT2lOZEZ5NzZ6c0dHNDB6STgyZGNPN0tFbVRFN0IwL3czRHZZM2dCbnVLRVRHaHFITWNlV01ZTVRMUjZKL3ZVbUwwd01FZmxSLzRpbGhmWWovZUdnaEI4Ykt1dkM5dHZ4TFNjSTJvNFBpVy82Vk85WTlaMUpSK3VPTllTM2tpM3dxekNNMjMreEdQdjJmM2FWUUtaOG9IeWZMRytjQVo2Vk1iYkhid1Y4V3VKR2V4ejl6ekg1clM5aUJVMzhvQVBLZithK1NDbUFJYS90M2x6V2FHbkhUcTRyTS8rZHJMc3BVbkZTNmRsbXBXWXRZSjVZRml0eUEwNVQzaFlYejUxdnVPK2tHczlJU3R5dmdsK0JNV3hybkFKV28wWFJ6cEhBckgrZ2IrRlRoZnNZU3Yzb01HSndWejNIT01PdkQzb25MSk5QMStVTTNSQnVlRUxUaUdwTDNVUWgxSE5zSStEQlFlcXJhTEN5R2hYSmpKNmxYTGZFQXd3SGxYOFpLdnF6KzdaLzhxa0xMTThBOHR6bjBkMzgzMzhpV2NXV1JCMHlyMXdqVUF1bVZrd0o3TGtnQ0QwNWdVUGRtcVZOL3VGWDNFc0NYWHZnYzhmUEl5TUhLby9YdFBZNEtIVkZBNzQydmorbERQc3lwMUcyNXZScDVVVjhyODlTcExmNzEzY0ZkY2ZlcWZOZDFUUFZTZ04rdGNWQXRGdERtV3l0NDhrakJkNERUYml0UW41RzQ2WXVmdE1UaDc3S2dZQ1MvVEhhNW9qcGU5a0QrajFmc3QrTTdBN1hHY2Qvc2pEWDdKVC9Ocy95NTM2K05EbWlJOVZZVHBlSUxxM2F0V3N3aldoQnJrdU9iREg1Vm1SNGpoM3lnZWU0N3NmNzlvZU8vMHdqTjcrWWNhbHBhdmVReFZ5NHdIRDkwd3FTaEtqc3NyTUVZRnd0VTJMNU4zc2ZndEdsSzdPNmhiWXgrN052WGI5eVhmME9IVUtWbGhaOWNDbTJoL0hDK1RTMlFYblNsTjlFQVluK0cvZm5KZ2ZYQUUzWXQ3MnRwaXZlaHphSmRIN0xNTU9uWC9TTlZEYzR2SGRDeC9HR0ViTzhzeVQ1bFVZM3FSWExUMnEydDg3c0tlb1o4WE93N283ZDYrdjlRdmZlVHYxZUtMOWFLRDNNbUh3NGE5UHlQL1FxWFFkUHlZUUhPZW9wUSsxbCtnMmg3NGM5ZHllWEF4dDlVZ1hjZWcwNy9TMHE3bzI3ODY3RGhoWmE0ZVZyL3RENThDQmp0bzhtVWVBKzd5YnZmbkhGV1owN0lOZFV4YTBrZVV2UGRyaGx5VmFIUHFJeko5a3hpTlpmanRlSUhvUU1BUUgzWlp2NmdiNXhiTzJ0RkJWRlNnNTB2TVkzMlhzdks4emo1ODNzSExydlVQS04xK09YcVdrbGFDWnBqOURoOUcxYXQ4MHY1RXhKZXVKV2Zmb1hzTXcrWWo4Q1pzNTZNVHhBdEVqNUNIZVdQbTJVWjluZVBGQlN6TUpuZnloZ0J6d2UzK0hNZitjMHVIcUt3T2MrNGVWcm4xc1lNV1c4N0Z6SXBhSVdITm92K0RuQmNQTDF6NnF3M2l3NHhWWC9uZmU3NVpwMzNXWGVpaVV5UHdKbVRucDEvRU4xOXJwSTBIbWVweERud1JFVmdZV3l6a3BINUlTMTNVWitZZHU2WExiRXhlWHJmdkwxUWMvbm5EUjRUV1BIemF5ViszMnRGMjkxWk83RlJNUGcxTU9ZdzJjWS9PZjN1YnUzcmxWeGFlMWtoV25sNG5NcjU1dGUrR3YzbW5aUDdqeVVMUlFtZHF2WUQ3VStxenpKMWIvN1dqUDhRS0puRnNWR2dRMHlxc3dnT3Y0d3RHeTUrV3Q3Rk4yNGUvZW41V3U3WHhSNlpvTHUxVVdqVHFSRjNZcll4a2Jpa1htdjZ1TkZzV2xSbWJKUVNPcjVCRFBLdE1CNTZqeTdOWm1lUnVNMXJmeG1WWHQyc21LRTdOWlpiOEs1ZHV4eDlQNjQ3KzFQbnQrU0JpaGlHcnUrcndtSDJvNnJpTHpKMlRQU2IrT0Y0aVRZRGQzWFBVRGpiK0ZpTWZDZnRVN1dsMXo2SlBodVZVbC9UT3F5d2I1V0hVWGJBYUJEZUV3dlFzSENnQVR0ZFR5YXViYlZTbThCZHQ5N1QvK2U1dXpIOWpnNjFZenE3RzVFNU9pOEYwcGtDb2pzTXVzS3QrYklvYU9ER1lOeTJGcmNrWUVsOXpHbFlCcXZYTnAvWWRza1pYVXRTbjFoNXBjVTFjS1pIQy9YdWJLRFZ1VFM0NThyME5BY3ovU2ZWWG50aU1OWENtUXRXdTM1UW5oYSsvSUhIRndwTUZkNzhlN3pjRkpxQk4xYXNuV1FVSUdST0FJQVZjS3BOcUwzbmM2VWs3QWpkeGRLWkFXUmxaRnlwOE9DcEM1a2J2akJhSm43NGFlVFNGclBzemlxZkNuVlZka0tQM04rU3NNcjJxZGthdS8vWUVsYVVjK2tCT1pQODBadjZhRzdYaUJvQzYxTTVSNDdOZVVyODhYVDhxdk1BVGZGVEtuMytRVDRDcXdPN1F3TFpRUE90VEkvRWwrTEt3UHdmRUNBWkp2UWxpd3RmNzVvZk1sRTdydEZCbmU3WndicnV1YkQ2WFJEcithcitUVk96VHZVSHdpOHdGbTRmd0ozWGZTci9PN2VUbC9IVXR0TDlYUThiWWFNSExPemdGTGIrOGEzR3QyNmRpdStMQUwyNmRuOTdZMFdqZDlieHduNVdnSzQxcHFIdlMvTmJGMzhOTnVvV0ExZnpNUUdCQzZ4c3pGMThQbkRqeHh2RUE4MHZ1UEFLK2FDWFVFcDNTYnBqa2Rxd3gvR3JtS3JUWVRqOHBJQithVjdhT3NWM2QrTWF0d2VqaWluRlhwL0FsZk8vREU4VldzSlhmbTdzR00wZGxoOWtvTld6V3I0TW53Tloya2pFQ1FPL2lIQXRUNW92TW5kTzNFWDhjdnVkWFFSOHdyYWF2OGg5ZWpxcFVYeWdSc3J2eG4wVEpqL0pKZmQ2UWVyUkNVSlAyT2VuNXZLMWxhT1JkYmxWNFhEb0x6UXU1dGRmSWI0OW80Ymkrc2NCcHc0Z3FCNkFUcHVxOE1tSjlpZW5Wd1RVSk5JbmtSaERKRGVQa3JyOTNXOVJ0ME9hS1pRb2NWQkxCSkJoODlmK2NKMHE4dWh6RHVSQXRRZitjd2VLRGtxQkFlWTJpb0xSZ3lkK0t2YXdTaTRZK2NYZmhUYkErN0dKblY3dGpNUUVLcjhUN1lDNFU0ZG9lTlk5UFVYTmRnaWFxNTZnaVd2bnJpY01ndzJQVkxKM1J6ZE5zamxDN0hOOUpEQ2RHL1N5Zmt2VDlxYnNIZ2dKOS9qUXc4YW5scFRXYXF0RjJuSHNrcDBmTkdpdUVjcFl6d1ZrQ0podFhjN2gzZlNEOFc0Skx4K1hxZWUzaTdHMVNyWEpOWng2YlZIdGM4Z0krbWYyS1B1RmdmQzFlVklQWGh3ZFlOOTZCT3ZBblZncTc0Y21zdXZobCtWTWxTbnhzeWE0U0E0aWIyM3NJK3gyeW44cmI2UE5OM21KZVZNajNWM1hXSDZ3V0NucTN5MSsvbzF1QVhZVjJYcXlsTzBKZy9GdFJwODZVNENra0x6blZWcktTUklvL1RrZ0FKSkMyem5SSWRLd0gzVjdFaVNPaXBFS3VmM2VYYTZrQkVVcE42bXNFcS9Jdkg5anlZMUVCczRubGFDV1Ruczh5UWxmN3VObUh2MkdoVXFlQWFuTFFRQ0ZXeEhQdVlVc1JUUVlBRWtncktGSVpqQ1pCQUhKdDFGUEZVRUNDQnBJSXloZUZZQWlRUXgyWWRSVHdWQkVnZ3FhQk1ZVGlXQUFuRXNWbEhFVThGQVJKSUtpaFRHSTRsUUFKeGJOWlJ4Rk5CZ0FTU0Nzb1VobU1KcE5WVUUvdmxrc3FSV0tUU1dMendOVGtzdmVDSEdyTkg5NjBuUUFLeG5tbURQbkptbkk0TkQ2N0R3cTJUc085QjYxaSt4YXYzcXVlQ0hXU1Mvd3NySkJjcVpzYi9aYWdHWTBVM294RWdnVVFqa3hSemNadGs2a2FJNGsyVUNmZHlnMzFybUVham0waVlCaGJ3bWF3bnlwcEw0SDRlUGlQNEFtZm0zS1JFa1R3OWlnQUo1Q2djU2J4UTZseko1SzhGTjI1NDQ0NjgvMnRpU1BOR3pDeThYaW41QXJiMC9CYzJwdmlnaWY2UXN4Z0pVQ005UmxBSlcrUEdSTUhGOHdtSUl4Z0Y3UjdWckFXSzg0a0p4NGs4YUpRQUNhUlJSQlpZNEo2MmVPdDN3K1lSZjdQQU45UzArSXZNbFBrTS9scmhIL2tSblFBSkpEb2J5KzZZS29EOXVEaFRYdS8zVm5nYTlBZDlYelgrV3VFaitSR05BQWtrR2hrTHpRM092Mk9DS3g0SW5HU0Z0elgrWVA4aTdTOGRTU1ZBQWtrcTNsclBzZlVRdGgvYUxLVzhVKzlwbTBpUVFmZFNUa0tCdEZsdmFaU0lYK1MyY1FJa2tNWVpXV0tEQy80b1BEcm4wcGtGOHlmTVVzRnZtY1Ryc1hZM2NtYmhNL2pFMlZCc3l2MUl2TzdKZnZ3RXFKczNmbVpOY3lIbFp2UStUVUZiNU82dGFzZklFVE1MbG1NbitoMFlFOEV3WU1NSEJncFI2dkR1MzhtQ005Rzltd01uMktCRllmOWhPcEpOZ0FTU2JNSkgrYS9lNWt4K0paUVlnNUgwUHZnWXcxazFELzlSbHVwY1FCMlFpQ3JFaldVWUlGeU1DMGQvbEtaT0FtMXNRQUpKY2VZRUgyNnU1Z1NEMWVWQ1BPSFhLQ1VlRjJRM1FRTFVCa2tRSURsM053RVNpTHZ6bDFLWElBRVNTSUlBeWJtN0NaQkEzSjIvbExvRUNaQkFFZ1JJenQxTmdBVGk3dnlsMUNWSWdBU1NJRUJ5N200Q0pCQjM1eStsTGtFQ0pKQUVBWkp6ZHhNZ2diZzdmeWwxQ1JJZ2dTUUlrSnk3bXdBSnhOMzVTNmxMa0FBSkpFR0E1TnpkQkVnZzdzNWZTbDJDQkVnZ0NRSWs1KzRtUUFKeGQvNVM2aElrUUFKSkVDQTVkemNCRW9pNzh6Y3BxVE04dmtiWDBTY2w0R2J3TkswRTBuVVh0b0NtSTJFQ0FlWHhKK3lKUXp4SUs0Rk1tY0tsNGZXVU9pUnZiQnROcjYreTByYVJzemhpYVNVUXphNkY4djVnTWNPMDg2Nml5bCtjTG9sT080RXNIdCtwMU9QeEY2VkxCbHVkVHEvUHQvK3RpYjJyclBiWHJ2NmxuVUIwUnJ3MnZsZUJrWldoOTVtaUl3NENuSWxEL2ZkMDNoR0hFOGRiVGR0OXNaYmNuTHZuNGxsYlNyelNhQ05iZU5PV1F5eFBzQWdvWlJxcVl1bHRlU1hZSFRKdGVyQTBtN1IrTUdxckNyUkxZU3dxZ1IwK0xrYUxMckxtemlvV1Y5dERlWVNkREk4UG5kTnZjZ2hVVmhwSE1SWlNodmtuSjhUVStlcEtnUWpHVjRjUktuWFQ2Rm03K29TdjZjUlNBbU5lS3NpVXB2bHcyRlBPS2dlY2tvZnZKN3JqaUd0cldLY2tlZFNNSHk0SU1ITlpPTDZjVmVIek5aOWpBK2lEWVRNNnNZQUFSeFZkbllZTnVEdUhQRU1iQmQ5aHpMOHBkTzMwWDFjS1JHZktKVE1MbnNNSFpseVRVVTU0MFBEdHhCK3lNck5QV2p5Mm5XdGVSSzZzWXVtSEtidEwzbmd1MkNONG85SDBrbFNvaS9PUHZDMDhROTBrRG8zTnRTVkk2SmtZTmFQZ1pKT3JLMUFONklXUDFXU0V6T25YQWdJS0x4L09kNlBxK3Q3ckUvSmVUYmN1WUFzSWtoZEVnQWdRQVNKQUJJZ0FFU0FDUklBSUVBRWlRQVNJQUJFZ0FrU0FDQkFCSWtBRWlBQVJJQUpFZ0FnUUFTSkFCSWdBRVNBQ1JJQUlFQUVpUUFTSUFCRWdBa1NBQ0JBQklrQUVpQUFSSUFKRWdBZ1FBU0pBQklnQUVTQUNSSUFJRUFFaVFBU0lBQkVnQWtTQUNCQUJJa0FFaUFBUklBSkVnQWdRQVNKQUJJZ0FFU0FDUklBSUVBRWlRQVNJQUJFZ0FrU0FDQkFCSWtBRWlBQVJJQUpFZ0FnUUFTSkFCSWdBRVNBQ1JJQUlFQUVpUUFTSUFCRWdBa1NBQ0JBQklrQUVpQUFSSUFKRWdBZ1FBU0pBQklnQUVTQUNSSUFJRUFFaVFBU0lBQkVnQWtTQUNCQUJJa0FFaUFBUklBSkVnQWdRQVNKQUJJZ0FFU0FDUklBSUVBRWlRQVNJQUJFZ0FrU0FDQkNCK0FqOEI3bUthQmNDb0hyL0FBQUFBRWxGVGtTdVFtQ0NcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Fzc2V0cy9pbWdzL3N1Y2Nlc3MtaWNvbi5wbmdcbi8vIG1vZHVsZSBpZCA9IDY1ZWY5ZmUzMzk3NzIwZDU1NWQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gNmE0NDJhYjViZDliZDkyOTQ0Nzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBTWdBQUFESUNBWUFBQUN0V0s2ZUFBQUFBWE5TUjBJQXJzNGM2UUFBR2tWSlJFRlVlQUh0blF0MFZkV1p4Ky83a1FlQjhBYXRDQXFWS0tOWVJmR0IxSEhwaU5ZSEdzRDM2dFE2cmF0T1d6cytwbE83eGpyVDZhcTF0cjdtVlplT0FpR0pJaGJSVGxWQUVWRXdJZ29EaWxTVU55SGtRWExmOTh4dkp6bkpUYmlYSkhDVHU4KzUzMWtyT2Vmc3M4OCszLzUvKzMrKzc5dDduMzBkRHRrRUFVRkFFQkFFQkFGQlFCQVFCQVFCUVVBUUVBUUVBVUZBRUJBRUJBRkJRQkFRQkFRQlFVQVFFQVFFQVVGQUVCQUVCQUZCUUJBUUJBUUJRVUFRRUFRRUFVRkFFQkFFQkFGQlFCQVFCQVFCUVVBUUVBUUVBVUZBRUJBRUJBRkJRQkFRQkFRQlFVQVFFQVFFZ2ZRSU9OTW5TNnJkRVpnL2YvNFF0OXMzMitFd3pqTU00MlREY0ozZ2NqbUtxTGU3dmU0SjBwczQzdTUwT2ovaitKMWtNdmJpalRmZWVORHUyS1RXVHdpU2lvYk5qeXNySzA4MERHZDVNcG04a2tZL0labDByS0hoMTdqZHJuM0pwTFBXNFVqV0dvYmprSUxCNlZSa2NRMXp1WXhoaVVSeUJQbW5rbll1bHo1enVaeC9UQ2JqbGZQbXpmdEM1Ylh6SmdTeHMzYmI2NmFJa1VnNGZ3VUJ6cUdodndFSlZ0TDRQNEVvUmwrcTc0SVpFT28waURJRHkzTXhORnJ0Y01UdnRUTlJoQ0I5YVNFV3kvdmlpeThPalVaakQ5S1FyOFphL0EvRVdFd1ZFdG1vQm1UeFlGMnVnVEEzODdmWTdYWStVRjVlWHBlTnNuVXF3NldUTUNKTDloQll1TER5aGtna3ZvSFl3dVYwdXNzaFJ6V2xaNFVjU2txc1R6d2VONm9nM2h3STZFMGtIQjlYVkZUTnpWNE45Q2hKTElnZWVzaXFGQXNXVlA2U2dQdmFlTng1dDlOcDdNNXE0UmtLNDNsanVmUWJDTG5vaGh1dSs2Y00yU3lYTEFTeG5Nb3lDN3g2OWVyZzl1MDdLb2d6QmhGZS9BeXJFY3FjTy90WHNGVUZ1RnNQUVphNnIzM3R1QnVtVDU4K29NL1BmbzJJMVBxalVDbHo0QkZvSThmT2QzQjNhaE1KNHljRFRRNVZZMGpaNG5TNjd1Ylo5VjkrdWVOdEpkUEFJNUhkSndwQnNvdG56a3BUbG9PSGYwZ2pmVEpuUXZCZzFUTkdYUEk0SlBrWWtpeklwU3paZUxZUUpCc281cmdNRlhNZ1FrbXV5ZEVWQnRjVEVLVjB3WUxxaDdxbVcrdE1DR0l0ZlIwbXJlcXR3cTJhelJzN0o0R3gyKzMySGlZVUNjcVNFQXNoazFGdTVkNHRDZExUYWRjaWFXcWNnNjdjandtTTcyQ0VmTmRBaU0xNHh3amEvbGs4cXhSaThtakhDa2l3STlPejZVVWJBMUgrM2UxMm5HYkZjUkpQcG9wSnV2NElSS09KQjJsOEwrUEs5QnM1UEI1M29XRWtwL0tNRXhRaTdQZnhUT1psR2ZVUW8wZVFGSEhWMUJSRzh2K1p6RC9vOFFiTk1vZ0YwVXdodlJWSFRSK2hzYTdpYnc1djhXeDJwN29aSlQrVk4vOWt5bWJpb3RITTFKSVBPUDZ5dDdKMXo4ZjlRYnArRnhsRzRqeXJUVXNSQzlKZG14WTVWM09yOEcvVTlKRmpKZ2RkcytNZ3hKbVVwUm95czNpVG44VGp5VVdrSnhVY3BCL1RwbVRFNmp6SFJPRi9veUJMamJhTEJUa20xZWZtNXJiSmg4WktadUJlaHdSOW5qNENBWVo2UEs2enVIK1lxZ0Z6cXI3QVFueHd0R1JMSkdMRElwSHdoUVVGeFM5bVFrVE4zY0pCcS9iNTNPZlBuajE3ZTZaOHVxV0xCZEZOSTcyUVIwMVp4MjE1ZzZ5OUlnZHhSSUFwNjFOZHJ1VDRaTkxsNFB3QUZtSXQ5elBGblVKNlZZcksyYmJGNDlGVFhDNzNObldXU0NTQ1hxODNoUHYwWFU0ekVrVE4zWEs3alRkanNVUTUrWDZ0N3JYQ0pnU3hncGE2eVVoanU1SWVwUC91bHR4eGlvVlFNOU1uNHlLZGlsWHcwSWpEbk5mZ2xxMVdnWFU4cnJJZXZmTVFEamYvTWhBby9HNHNGcjBBcXpEYTYvVTlUb0U3dytHV2MzajJJUDZtUWFCWHlGUFRJUlFIaHVGZVNmN2JPTFFNUVdRY0pGV0RGamhXWHdMaXowOVEzM09rRXhmTFVvVDdOSmM4dlB5YzFjUXB6ME9TYXFhZnRMN3gwOTJUS1MwV2k0eURESHo3MFdWelUzYUp4K1BiUnlyeGluRnlTMHZEWGV4SHgrT1JCeUhBbVh5QXRkcnI5WC9hNWE2Mmt3M3NKaTVldkhod21tdGFKb2tGMFZJdG1ZVlNuOG5TeGNxWGdPay9kb0lNaDNDWkZyU1YwQnBqWnk2czI1VmtNbElhaThYT1poNDdsc0NnSjh2MUZjL0JuU3FtV3pmWmFuZmk4ZGhvcnUxc0w5OUhPcC91ZXIvQ1l2eWV2RmNHZzRQVXFIN2FqYnhxOHYyYWNEaDZMUm1lVHB0SnMwU3hJSm9wcEdkeGpQTVlyUHVnNTN3OTU4QkNmTjBjQ2FkeHUwS2gwR0ppay9HUThDVWErdHpDd3BJZllTMCtibWxwbW1LV0ZvdUZMaVNOejNGVi9KR2NTUHp4YkRCWXROanZENzVPSERJUmN2bk12Qm4ySDJMOXpzdHdUYnRrc1NEYXFlVElBaW1YQnRkcHpaRnpIWDQxRW1tWjZIWjdtbkNOT3I0UG9lZnBzbWcwTkpNUHFtamtoUzlSYm8zSDQxbmw5eGRzSkg5Wk5KcWNSa2w4cnB1WXlMNDFudUQ1c3pnZUVvMkd4MkFOaG5nOC9vL1UweUJhSEl2elNTd1duaFdOR3NxeXFIdUxpNHBLYmxmWHpZM3U1SDFZT1Q3WHRjWW1CTEdHbmpxa1ZLdVAwSXRGNzFQUGd4T3FFU2NTMFl1d0JndG81R2Z3VjByRFhlZnhlRGZnRWtWb3ZJK1NwNUk4TE9MZ0lySjN2NGNMOWZONHZGNjVVeHNKWTk3SGl0eU8yK1dDVEN6ZzRQUndmNEllMjVjU2lmaTA0dUxTKzJLeGx1Skk1TkJsbEQwTkszUWFWdVZrZWdoZTl2bDh6L3A4d1RSeGtyTVdrcHpRVVNITkQ0UWdtaXVvdTNnTTVCWFJTRnU3Wjd0Zm83R1dlYjBGRzgxMG44L2YwTlFVdWdFWHlZUDdjeEhwazJJeFl5anBXem1PcUh3K1gyQ1h3eEg0RDNVY0NBUmZnd3p2K3YyQmZmUklUYVhSbjMzb1VNT3RCUDRKTE05VGxQME8yUjZBSEJBdjlpM0k5WFk0SEhvS1FyeUhGVnBPYjlZTFdKRDdDZ3BLL2xPVmwyNkRRTFc0aUswdVdycnJ1cVVKUVhUVFNNL3l1RlVnM2owYkwvYUNTQ1R5bE1QaHVTYVpqSjdOSUdBTXkvQjkzdm9CM0tJaTRvU2ZoMEtISG1jdzcyRmxQU0NaQStMTTRiNXppU21HWUNsdUpYNG9wSUgvRkxkck9JMytTL0tVK1AyRjM2UGhNKy9LUWUrVmd6RVAveGVRWlU5emMvMERIQjhnUUw4K1ZSWjZzb2JRL1R1NC9aN1VTKzNIemtaY09XK2FDMW9tU1pDdXBWcjZMaFN1MGZFMDlHQTAydklrRGIyTW1HQTdqZjQ2R21NRlZxZVdORFVjZUtDNXVmR3hwcWE2SlZpQkVzNWpXSkEvUUNBL2czK3NmZVhlRDVGK1VWUTA1QnBGS0s0UHcwcGNoaFY1QkVJc0RvY1BUVmVTOFJ6R1ZWemJJNUhRSkhXZXVuRnRMYko4SXpYTnlzZGlRYXludllRYTYraHVSYkFXeDFPVnRZV0ZnNzl2VmttTllaRDNGQlVmSkpQaFMybThhM2pqdng4SUZIeE1ub1E1TlFSeXJLRlJuODNBM2xMaWlUTEk5TGRjUDUyL1ViaG1OeEZMM004OTNkYlJjcjRmalViT3dZcHNOcCtuOWhEelBSV0hjUGg2YW5ybnNUR0k0MWpudWQ1SFlrSDAxczloMHVFWjRWNjVoblcvUU9OWEJOa0dLYTdBU3Z5aXVibmh0elR1c1ZpRkpVVkZneS8xZWdNUDBuZ1BzbnpvVFZpRUxpUFprSWJnUEg2T0twTUJ4WkhjOHhxa3VKTXkvMEpBL2h4dTF3K2owV1lHSnpzM2d2cjNHQlE4dXpPbDdjanZMM29WNHVIcXBkOFlSQnhHSjROYTB0UVNteERFRW1ycUZKSWVvQy9VY3FDZEtXMUhOTHJQYWRqcmlDbk9vT0dPeEwzNmllcTl3aFZ5SHpwVS95eU4vRWRZSFE5RWVZb3lKdUJXQmN3eXlQSWhQVkNuMDdYTEdJdG5BdzE4RGZsbnFlQ2I0MFVRNklsb05Qb1B1RmtMMUR3c2RSOFdaUlBQZ3lSOTNRd0lZc2hreGI3Q0p2bDdod0J2OWM5d1lVWVFDWFM1Z1pqaExaVkFvMTdWMkhoZ2FTalVPQXRyTUo2QnZMY2h3T2NGQllQdVZYRUhNY3BaTk5BRWdmaVpqSGVvWGlrSEFYV1lBY0FkTlA1N0lORDNjTE1JOHBQZkNnU0srSnhYa2FGMVR0VWRhdW9KWmFrcEpzUWhyaVRrZVZZZDkyV0R5TVE2U2RXTFpvbE5MSWdsMU5SRnlOV1FaR3FYbFBZVExNQk1BdkQ1bktxZXE2bU1kNnlBT0I4eHcrTjAzS3BuUXFIbTMrR2lmWjAzLzV0MDA2cUJ2STZOTXZmaVRpMkVHQ1BvNnYxSFhLeTd1SjhlcDg1TjlXQkJrSmJPbEtNNk9nTnlyVHFxTzNOd2t3VHBPUUQ5V0I1Sk1QNkN5K1Y5aUVibXBERjNHUzFrdXNkNi9yNGRDalZkalMwcHdBMWFUeDdlOXNZV1JzaWZKejU0WHoyYjNxZHo2WTc5KzFRNXNCeFAwS08xWDVVWmozdHY2VTZPMUx5WmpobmZPQTVYalI0c3AvcStaSDMzZkZnM3pGN3lITC9mZTF2M2E3cWVkN1hUdWtvcGNuVkJZT0hDUmFzWVVWZmRzeHU2WEdnL2dRQW40UTdkVjF3OCtBZk56VTNmcGxFMmtQZXZ1QnhqandWeGZzN3hKSit2NEpiTTR4WHBTdTZhUm5zZlRNbzNpRzFHTWJKUFczSit4WDVkOXg0Mjh5NjZtMVhQMkszejVwVmZhS2JwdmhjTG9ydUcwc2pIbTFndDFEQ0RocGlXSUZpUnJWaUlFK25KZWhSTHNwQnBIenNZUkp6RHZLbjdHVVVudUZiVFNseHEyb2lhVXRMcmpTNWpuMnJra0V6OTRJNTZ1ZFl6SUxrV0FyWjM2WFl4YUllVnkvMHpTUHpqWVJjMFRoQ0NhS3ljVEtMaE1sVng3UzBhK1ZQcEdybHEvRmlKTjNDYm5pWnUyS1BLb1NIZjBUYXRwSzNVZFBlMVhlbiszOG1NMytRVXZrU0VITW1vY3AwSXRJbHpqUFp2MVk5TUNyTTBKUlBFbXVuenVYNW1wbGxoTHk2V0ZiU1VSc2FGQzZ0WVZNSFl4cmNmMVdrdUgzVVNqWDgwYTFncHQ2bUUzaVlXZjNOdHdRcDl4R0RqTVEzdVlUM200SklkUDNmdTlmT09XcmdjM0doYkM4TGJ5bFZSVWMyM0M0NnJlTnRkZ09MSHNCOEp4amJwdVd0N2cxTy8rN0xaYmhoajZWakZCTXc0VmhZaVFhRGY1U25xUzZ3NkNMcWZ1SVAxZ0IwcnNSQTFLc0R2a3F2OUJHS3c2cnZqSnEvWGRXNjY2enFuZGEyMnpwTDJRYlpGaTZvdnBUZUZaWEVjS2pDMS9kYmFobk5jU3dqMEtlK2UzME9Tdzc1VlliR0d2K05hQ090eFY0N0Y3UFBqYldWQmxpOWY3dG16cC9aUmxIUm5uNUhJa3h0TVM1QnRVbEVlSDFVbEh5ZjJxY1RxL0FZNEUyMlFxcTVmeCtYRnhjRlRyUWl4YlFpaXlMRjNiKzNMdUZGL2s2b0lGRmFQZ2w2bDk0VUplczY5a0tkdkgycW5GcWJoTVEyZStWRE9heEJOZmVNZFBZS0licTYxTjFydU9BYmZBZGRLdWFtbDRIb1NiaGlmenhyRm5jODF5b2xoeGhJYi9WZ3ROOFNnL2NQaysvRVZWMXh4c0RPUGRZNXNReEJsT1ZMSlFRTmdVcC9qd1pFamh6MDJjK2JNc0hWVTBtZEpueUZnUDhoYiszd0M2cnZoZjlvNG9NK2w5dklHeU9Jakt3RzQ0M1plUFFYcU52Ym5FWlBjVFdDdkZxNnVtRGZ2K2tXOUxFNjdiTWZ3SHRHbkxpcm1vR0c4WmtvRU9WaGx3ekdMMWNUVnRPNjgyQ29xS2hmenBtWmN3dkY0TGlvTTNpZUJPKzZ0R2pSczJ3ajQzNWs3ZDg3NTVya1Y5NVluaU9xdFdyU29xb2JHMFJxUUs4dUJzcWFua21QZHVuVUZRYWEyV2xGQnZaV1oyYmFCelp1M0xtRk5yRTNCWU1FejROTHZscVNsSmRUTWQxZ2Qxcm1kSkU4clM0SWVjT09jRytiTXVZNjVWMDdMdXJXV0p3anV4VVc0VnN2TmhvUmk3cGs3dC96WDZuelRwazBzMjUrOG1rUFZ2V3Y3RFU2NHQyM2Jmakd6ZHYwalJneGZpNXZUcDVIeW93RUlHdFkxTkRTdU9IaXdZYlBxemdWL1JjN3huV1U1WitKaXJlZzh0OWFSNWNjRVVBampIRzJiQ3NoSGpoeittRHFESEpkQWpqczR6QXR5cURwVC84U0VDZVArTnhBSTdObTllODhNUG9KcWpRblV0Zjdhd0w5MDhPQkIxdzRmWG5vNUx5bzZDb3hLcFFmemVhbjZNZE9zdExjOFFWRElCWjJBRzh0VVFGNVRVek84M1hKMFhzcWpJMzZDZWUzdzRjUFg3dG16NzRLNnVycFR3RUwxWVBYTFJ0a2U5WXo2K3ZwN21mUDFLNnozL1ZpVlZ6c2ZscXFmemxTckhGbWVJRzBqNUcxdzgrYjZSQjN4a1ZBWk85djAwTFhWcm0vL2h3MHIzVFp4NG9RcXZ2MUk3TnExNTVMNitrYmw5bVRUcFhiVzF6ZU0zN1ZyOThYcUdSTW5ubFExZWZLa3o1U1V4Q0lkblNPcCt1bGJEZlRJYllORzFEcDlwQjFONTE1MWdPODlaZ0JpVkQwMGVBUXArQVlrZXNJSng2ME9oOE1iY0xtbTdkeTU2NUpBd0wrTFZSUjNGUlFFNm81d2E4WkxMRTg2bE9COGRFdExlQ3dkSDd2SGp4KzNCSmRPZGFuVHZac2MyM2FqMG9QWlI1Q3FuNHpGYW52QkJnVHBuRnVGZ2xwN1N5Q0hWMXZFY3lDWWFzQW5uamp1RFloU1ZGZFhQNzZwcVhFU2JsR0p6K2ZkRnd3R1dNak5HNkwzSzh5aUR1cXZkVklpWXhoZS9nS3MxY3R2aThTQ29WQ1lKWUJpSTd4ZVQwTmhZZUgyMGFOSHJqT0pZVmJKeE4zVVEzdTZwYjBVT3hERTFJL3NlMEJBTmVneFkwYXBiMGcyRU1EN0RoeW80NXVSMEtoRUlqU1d6MnpWYUxpWCtLSFZEU080VmlZZ2hydmF4RUlPallNR0ZXOHZMUjJ5UWxtbEhoNWpxOHUySkFodndhVzh6VmJZU2xOWnJnd0J0V1AwNkk0eHZheVVUZ3pZNm1wbHBUQk5DckVsUVREeEVkNTAyUXhJTlZHWDNtSmdsU0o2UzloMzZXeEpFS3pIYkZ5RzZYMkhRKzQ0UmdSV2MvK3p4MWlHVnJkYk9vRFNDa2tSeHBZSTJKSWdXSkNPYWQyMjFKcW1sYklqN3JZa0NNSGlUazNia0szRll2eHBsOTBxYUhtQzBCM1owWFBDY2VzUHM2Q296WkRFc2pOSXJkakl3RnRaN1UxS2RsTVA3Y2NkK2xIblZ0c3NUeEFBVDNscnRhNXc3cGc4ZWJMNkhiNlUrVUJXVTRzbDVYMnRyS3lzZFlraEtISjhTZzFTOUpPU2FwRkRHeERFeVdJQjVtYjh0WG1Fc2w3bXJmWWM1NVorZzVuMTBYaC9DSnlmVjNoM3l0aXBCOGlTb3AvT0hGWTVza00zNzFMQXZrSUJ6aWp3MUlxS0Y2Yk9uVHU3UnAyanRGWHNWbTNac29WcEV0RVNsU1piOWhCZ3NMRmgwcVJKdGFrbEt2enBJNW1ha3FiMFk5bk44Z1FKQm4wdmhVTFIzOUdENGxkYVFEbVBjUHpOMUJpa1hZbGRGR2xaaldrc09MaXpGbG5WSTZhSTZDQ2k5R09lVzNGdmVSZnJxcXV1Mmt0UTJQcVJWTHNDWnJCZzNNTldWSWJWWlc3SGZZWlpENlVYcFIvejNJcDdXMHpIV0xwMDZSQis3cGhKZU1aeHBoSlF6blBCb1A5T0ZOUmtwc20rZnhCWXNtUkpjU2dVZVFJWDkrYk9Kemgzc0JiV0ZLc3U5MlBXd3hZRVVaVlJ2aS9MUHZHekFJNmdXVGtDeEgxOHZQTW9TOU84ZVAzMTEzK0t5VGMvVXVqTUlrZEhoUUR1bExPcXFtb2l1MnY1eU9DSHZKejQxYXUyalpkVGlKL3pQTitNQmMxMEsrNXRReEFGZm1WbDVUZFJWaFVrS2UydURKU21wbW16bHF4RHhrZTZnOVAzYytXYUR3ZG5YL2RiZVFjMWd2V3RjK2JNc1hUc1lkYkw4a0c2V1JHMVo2bWZOeUhKTkZiMTI4eHBsKyt3MjVYWi9zVmI2bDF5bkUwRXNDaURXTURPTmxOOUxCK2tkMWN1Sk5sS1dzZGFUYmhWdGxGVzk3cnFjQTYrY2Y3ZTFrR1cvcERCVmhZa1BVREcvVXc5MllqUFBBWS9XUzBCMU1XeXBMOUhVbnRBZ0plT2s5NUQ1NjdDd3NDN0xTMHRUcXoyZ1I3dXNlUmwyeE1FYzkvQzZuN0xMS2tkaXdpTlczdFl6R2NSMFhzVTAzWXVWbzgxbGd5Q1FCOFFFSUwwQVN6Sm1uOEkyTjdGU2xYcHhvMGJmY1FpWjZXbXlYSGZFU0NtYTJERzlDZDl2OU42ZCtRVlFWajBMTWpTTjdkWVQwMTZTY3hMUnMzUXpRdUNpSXVsVjlzVGFUUkRRQWlpbVVKRUhMMFFFSUxvcFErUlJqTUVoQ0NhS1VURTBRc0JJWWhlK2hCcE5FTkFDS0taUWtRY3ZSQVFndWlsRDVGR013U0VJSm9wUk1UUkN3RWhpRjc2RUdrMFEwQUlvcGxDUkJ5OUVNaXJxU1o2UWM4WDlJbUVuMjhxZWhTTHFSME9maFRJZHIrOTBXUEZOY2dnQkJsZ0pVUWkwZEZOVFUybnFEMC85RlBZMjhjelFiQ1ozeFBjVTFoWTlIOSt2OWZTeTNuMnRzNDY1Qk9DREtBV0dodWJ5bmJ2M2p1ZFZSNlhZVGwreTkvbnJMSGQ0eUlTck1mbXdvcE1xS3N6TG1leTVheFJvMGFzTFM0dVdqK0FvdWZ0bzRRZ0E2UjZmbUgydUsrKzJua2VqN3R0M3J6eVo0L3lzVTh1V2xSOUt6L3AvSXpYZTN3OVArbjh4VkdXSTdmMUVnRUowbnNKMUxGbXE2MDljS1poSlAvQTU3OUhTNDVXRWRUOWtVanM2WWFHQnRZQms2Mi9FUkNDOURmQ2xJOTdGR0Rsd1pFc2liTXdTNDlib0g2M1hKV2JwZktrbUF3SUNFRXlBSlBOWkdJTzFvcHlPSHcrMTEreVVXNWJPYXlFUjduWktFL0t5SXlBRUNRek5sbTc0dlY2RHhKY0cvRzRVWmFOUWxVNWdZRFBVT1Ztb3p3cEl6TUNRcERNMkdUdENsMjBNWHFkOXRPZzc4RXQ2bm5nNHdoUFZ2Y1hGQVIvQ3VGcVZibEh5Q3FYc29DQUVDUUxJUGFtaU1MQ2dsVkRoNVpPZitXVlpmT1hMVnZXK2xzbXZia3ZOYy95NWNzRGYvclRuNnRMU2dhZEJVbHN1NXBoYXAxemZTemR2QU9rQVkvSFUxdFlHRnpoY2psbk16QisrY3FWYjIxaFVidjlqSVgwdU9LOHNocmNNNEtWNmlkNVBONEFBNFlyK0hVbitVR2dBZENkRUdRQVFEWWZnVnUwMWVQeDdRNkhRMlZNTXhuTFNQb3A1clVqN1ZXQTczYTdHcGx1c2kwUUNHNzBlRnpOUjhvdjE3S0hnQkFrZTFqMnFpVFZ1SXVLQ3QvdlZXYkpsSE1FSkFiSnVRcEVBSjBSRUlMb3JCMlJMZWNJQ0VGeXJnSVJRR2NFaENBNmEwZGt5emtDUXBDY3EwQUUwQmtCSVlqTzJoSFpjbzZBRUNUbktoQUJkRVpBQ0tLemRrUzJuQ01nQk1tNUNrUUFuUkVRZ3Vpc0haRXQ1d2dJUVhLdUFoRkFad1NFSURwclIyVExPUUpDa0p5clFBVFFHUUVoaU03YUVkbHlqb0FRSk9jcUVBRjBSa0FJb3JOMlJMYWNJeUFFeWJrS1JBQ2RFY2dyZ3BTVWxQVDQvYmZPeXRKSXRyekJNYThJc21QSGpwYmVMSktnVVVQVVVoUXdiTkJTc0g0UUtxOElNblBtekRnTEpYemVEemptVlpFc09MRW5YeXFjVndSUlNtV3h0Y1g1b3R6K3FDZExFQm14V0N4dkZwM0lPNEtVbFpWdHhVVjR2VDhhVHo2VXlRdG16ZFNwVS9mblExMVZIZk9PSUtyU2tLUUtSVmVydDZFNmw2MTNDUEJpMlJnS2hlYjNMcmM5Y3VYdHVsaVRKMC8rYzAxTnpYcS8zejhGeFJmYlE1MzlVd3ZlSThsNFBMNWp5cFFwNjhHcXgxL0U2aDhwY2xOcTNoSkV3ZDN1S3J5UkcramxxVlpBd0pZdUZrdDFidThFM3hqWGVTeEgvWUZBTXVudWdySGJuWXAvZnp4eDRNcTBKVUdBN3dNVFFxS003MVJXVms0MnoyV2ZYUVRBTm1nWWlYOUpLVFU4ZE9qUVRTbm5sajYwcFl2Rkt1alBKUktPbTVWbThKOEhKNVBPbW9xS3FuYzV6WnNCcm9Gb2xXRHI0VGQ2eitSWm84em5ZYjNucS9FbTg5enErMlA2TVJlZEt3OGgvZ3NGZmtkbkdlMG1HK1RZeWN1cHJMeTgzRFl2SXJ1NldBd0lHbmZ5V3h6L2l0SVNkbXVJbXRabnBXRjR6N2NUT1JUT3RyVWdaaU9xcnE2ZUVvOG55emsvaWVyS3I4S2F3R1JucjE0K2F0ckpHL3c4OVdLNmdHVmNLVHU0U2ltQ2dDQWdDQWdDZ29BZ0lBZ0lBb0tBSUNBSUNBS0NnQ0FnQ0FnQ2dvQWdJQWdJQW9LQUlDQUlDQUtDZ0NBZ0NBZ0Nnb0FnSUFnSUFvS0FJQ0FJQ0FLQ2dDQWdDQWdDZ29BZ0lBZ0lBb0tBSUNBSUNBS0NnQ0FnQ0FnQ2dvQWdJQWdJQW9LQUlDQUlDQUtDZ0NBZ0NBZ0Nnb0FnSUFnSUFvS0FJQ0FJQ0FLQ2dDQWdDQWdDZ29BZ0lBZ0lBb0tBSUNBSUNBS0NnQ0FnQ0FnQ2dvQWdJQWdJQW9LQUlDQUlDQUtDZ0NBZ0NBZ0Nnb0FnSUFnSUFvS0FJQ0FJQ0FLQ2dDQWdDQWdDZ29BZ0lBZ0lBb0tBSUNBSUNBS0NnQ0FnQ0FnQ2dvQWdJQWdJQW9LQUlDQUlDQUtDZ0NBZ0NBZ0Nnb0FnSUFnSUFvS0FJQ0FJQ0FLQ2dDQWdDQWdDZ29BZ0lBZ0lBb0tBSUNBSUNBS0NnQ0FnQ0FnQ2dvQWdJQWlrUitEL0FSVmRLa1p2QkhSSUFBQUFBRWxGVGtTdVFtQ0NcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Fzc2V0cy9pbWdzL2Vycm9yLWljb24ucG5nXG4vLyBtb2R1bGUgaWQgPSA2Y2VlYWE1ZDRiZDExNGI3ZjFlYVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvKlxyXG4gICBBUEkg5o6l5Y+j6YWN572uXHJcbiAgIGF4aW9zIOWPguiAg+aWh+aho++8mmh0dHBzOi8vd3d3LmthbmNsb3VkLmNuL3l1bnllL2F4aW9zLzIzNDg0NVxyXG5cclxuKi9cclxuLy8gaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IFRvYXN0IGZyb20gJ2FudGQtbW9iaWxlL2xpYi90b2FzdCc7XHJcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuL2NvbmZpZ1wiXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbipcclxuKiDluLjph4/lrprkuYnljLpcclxuKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgY29uc3QgVXRpbCA9IHdpbmRvdy5VUC5XLlV0aWw7XHJcblxyXG5leHBvcnQgY29uc3QgQXBwID0gVVAuVy5BcHA7XHJcblxyXG5leHBvcnQgY29uc3QgRW52ID0gVVAuVy5FbnY7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ1Bob25lID0gL14oMTNbMC05XXwxNFs1NzldfDE1WzAtMyw1LTldfDE2WzZdfDE3WzAxMzU2NzhdfDE4WzAtOV18MTlbODldKVxcZHs4fSQvO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ1BheU51bSA9IC9eWzAtOV17MjB9JC87XHJcblxyXG5leHBvcnQgY29uc3QgY29tb21QYXJhbSA9IHtcclxuICAgIHZlcnNpb246IFwiMi4wXCIsXHJcbiAgICBzb3VyY2U6IFwiMlwiXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICog6K+35rGC5qC45b+D5Yy6IOS4i+mdoui/meWdl+WMuuWfn+S4reeahOS7o+eggeaUueWKqOivt+aFjumHjVxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxubGV0IGJhc2VVcmwgPSBcIlwiLCBiYXNlVXJsMiA9IFwiXCIsIGJhc2VVcmwzID0gXCJcIjtcclxuaWYgKGxvY2F0aW9uLmhvc3RuYW1lLmluZGV4T2YoJzk1NTE2LmNvbScpICE9PSAtMSkgeyAvL+eUn+S6p+eOr+Wig1xyXG4gICAgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL3NoYW5naHUuOTU1MTYuY29tL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwyID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vbWFsbC45NTUxNi5jb20vY3FwLWludC1tYWxsLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgYmFzZVVybDMgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy95b3VodWkuOTU1MTYuY29tL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufSBlbHNlIGlmIChsb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCcxNzIuMTguMTc5LjEwJykgIT09IC0xKSB7IC8v5rWL6K+V546v5aKDXHJcbiAgICAvLyBiYXNlVXJsPVwiaHR0cDovLzE3Mi4yMS4xMDEuMjU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOyAvL+a1i+ivleWupGFwYWNoZVxyXG4gICAgLy9iYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS45NTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/lvIDlj5Hnjq/looNhcGFjaGVcclxuICAgIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjE3L3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTEveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMTMzLjI1OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufSBlbHNlIHtcclxuICAgIC8vIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjk1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjI1OjM4MjEwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjE3L3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTEveW91aHVpLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjEzMy4yNTozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4zMy41NjozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn1cclxuLyoqXHJcbiAqIOmAmui/h+WQjue8gOiOt+WPluacjeWKoeWZqOeahOWFqOWcsOWdgFxyXG4gKiBAcGFyYW0gdXJsXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0U2VydlVybCA9ICh1cmwpID0+IHtcclxuICAgIGxldCBzZXJ2ZXJVcmwgPSBcIlwiXHJcbiAgICBpZiAodXJsID09IENPTkZJRy5SRVNULnVzZXJJbmZvKSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gXCJcIjtcclxuICAgIH1cclxuICAgIC8vIGVsc2UgaWYgKHVybC5zcGxpdChcIi9cIilbMF0gPT0gXCJhZGRyZXNzXCIpIHtcclxuICAgIC8vICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsMlxyXG4gICAgLy8gfVxyXG4gICAgZWxzZSBpZiAodXJsLnNwbGl0KFwiL1wiKVswXSA9PSBcInNjYW5cIiB8fCB1cmwgPT0gQ09ORklHLlJFU1QuZ2V0Q2l0eSkge1xyXG4gICAgICAgIHNlcnZlclVybCA9IGJhc2VVcmwzXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNlcnZlclVybDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOagvOW8j+WMlue7k+aenCDlsIbnu5PmnpzmoLzlvI/ljJbkuLpcclxuICoge1xyXG4gKiAgICAgc3RhdHVzQ29kZSAgIOWQjuWPsOWTjeW6lOeggVxyXG4gKiAgICAgZGF0YSAgICAgICAgIOWQjuWPsOi/lOWbnueahOaVsOaNrlxyXG4gKiAgICAgbXNnICAgICAgICAgIOWQjuWPsOeahOaPkOekuuS/oeaBr1xyXG4gKiB9XHJcbiAqIEBwYXJhbSBkYXRhXHJcbiAqIEByZXR1cm5zIHt7c3RhdHVzQ29kZTogKHN0cmluZ3wqKSwgZGF0YTogKiwgbXNnOiAqfX1cclxuICovXHJcbmV4cG9ydCBjb25zdCByZXNwb25zZUZvcm1hdHRlciA9IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgcmVzID0ge1xyXG4gICAgICAgIHN0YXR1c0NvZGU6IGRhdGEucmVzcCxcclxuICAgICAgICBkYXRhOiBkYXRhLnBhcmFtcyxcclxuICAgICAgICBtc2c6IGRhdGEubXNnXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLy8g5Yig6Zmk5bqV6YOoICcvJ1xyXG5mdW5jdGlvbiBkZWxldGVTbGFzaChob3N0KSB7XHJcbiAgICByZXR1cm4gaG9zdC5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG59XHJcblxyXG4vLyDmt7vliqDlpLTpg6ggJy8nXHJcbmZ1bmN0aW9uIGFkZFNsYXNoKHBhdGgpIHtcclxuICAgIHJldHVybiAvXlxcLy8udGVzdChwYXRoKSA/IHBhdGggOiBgLyR7cGF0aH1gO1xyXG59XHJcblxyXG4vLyDop6PmnpDlj4LmlbBcclxuZnVuY3Rpb24gc2VwYXJhdGVQYXJhbXModXJsKSB7XHJcbiAgICBjb25zdCBbcGF0aCA9ICcnLCBwYXJhbXNMaW5lID0gJyddID0gdXJsLnNwbGl0KCc/Jyk7XHJcblxyXG4gICAgbGV0IHBhcmFtcyA9IHt9O1xyXG5cclxuICAgIHBhcmFtc0xpbmUuc3BsaXQoJyYnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuXHJcbiAgICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7cGF0aCwgcGFyYW1zfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdChjb25maWcpe1xyXG4gICAgbGV0IHttZXRob2QsIHVybCwgZGF0YSA9IHt9fSA9IGNvbmZpZztcclxuICAgIG1ldGhvZCA9IChtZXRob2QgJiYgbWV0aG9kLnRvVXBwZXJDYXNlKCkpIHx8ICdHRVQnO1xyXG5cclxuICAgIGxldCBzZXJ2ZXJVcmwgPSAnaHR0cDovLzEyNy4wLjAuMTozMDAwLyc7XHJcbiAgICBsZXQgZmluYWxVcmwgPSBzZXJ2ZXJVcmwgKyB1cmw7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB1cmw6ZmluYWxVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6bWV0aG9kLFxyXG4gICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gJzIwMCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2VGb3JtYXR0ZXIocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ+ivt+axguWksei0pScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGlmKCBtZXRob2QgPT09ICdQT1NUJyApe1xyXG4gICAgICAgICAgICAgb3B0aW9ucy5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgICAgICBvcHRpb25zLmRhdGFUeXBlID0gJ2pzb24nXHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5hamF4KG9wdGlvbnMpO1xyXG4gICAgfSlcclxuICAgIFxyXG59XHJcblxyXG4vLyDkuLvopoHor7fmsYLmlrnms5VcclxuLy8gZXhwb3J0ICBmdW5jdGlvbiByZXF1ZXN0T3JpZ2luKGNvbmZpZykge1xyXG5cclxuLy8gICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4vLyAgICAgY29uc3QgdWkgPSBVUC5XLlVJO1xyXG4vLyAgICAgY29uc3QgZW52ID0gVVAuVy5FbnY7XHJcblxyXG4vLyAgICAgbGV0IHttZXRob2QsIHVybCwgZGF0YSA9IHt9LCBoZWFkZXJzLCBmb3JDaHNwLCBlbmNyeXB0LCBieUFqYXgsIGNhY2hlLCB1cGRhdGUsIHN0b3JhZ2V9ID0gY29uZmlnO1xyXG5cclxuLy8gICAgIG1ldGhvZCA9IChtZXRob2QgJiYgbWV0aG9kLnRvVXBwZXJDYXNlKCkpIHx8ICdHRVQnO1xyXG5cclxuLy8gICAgIGxldCBzZXJ2ZXJVcmwgPSBnZXRTZXJ2VXJsKHVybCk7XHJcblxyXG4vLyAgICAgLy8gbGV0IHNlcnZlclVybCA9IGJhc2VVcmwgO1xyXG4vLyAgICAgLy8gaWYgKHRydWUpIHtcclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6YCa6L+H5o+S5Lu25Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKi9cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWQkeacjeWKoeWZqOWPkemAgeivt+axglxyXG4vLyAgICAgICogQHBhcmFtIHBhcmFtcyDor7fmsYLlj4LmlbBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdmVyc2lvbu+8mueJiOacrO+8jOm7mOiupOaYrzEuMFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBzb3VyY2XvvJrmnaXmupDvvIzpu5jorqTmoLnmja5BbmRyb2lk44CBaU9T6Ieq5Yqo5re75YqgXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIGVuY3J5cHTvvJrmmK/lkKbliqDlr4bvvIzpu5jorqTliqDlr4ZcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgbWV0aG9k77ya6K+35rGC5pa55rOV77yMUE9TVOaIlkdFVFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBjbWTvvJror7fmsYLlkb3ku6TvvIjkuZ/lj6/oh6rooYzlsIZjbWTnu4Too4Xoh7N1cmlb5LyY5oOg5ZCO5Y+wXeaIlnBhdGhb6ZKx5YyF5ZCO5Y+wXe+8iVxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB1cmkvcGF0aO+8muivt+axguWcsOWdgO+8jOW7uuiuruS7heWhq+WFhWNtZO+8jOS4jeW7uuiuruiHquihjOe7hOijhXVyaS9wYXRoXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHBhcmFtc++8muWPkemAgee7meWQjuWPsOeahOWPguaVsFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB2aWTvvJrlpoLmnpzpgJrov4dBamF45pa55byP5ZCRd2FsbGV05ZCO5Y+w5Y+R6YCB6K+35rGC6ZyA6KaB5pC65bimdmlkXHJcbi8vICAgICAgKiBAcGFyYW0gZm9yQ2hzcCDmmK/lkKblkJHkvJjmg6DlkI7lj7Dlj5HpgIHor7fmsYLvvIjpu5jorqTlkJHmiYvmnLrlkI7lj7Dlj5HpgIHor7fmsYLvvIlcclxuLy8gICAgICAqIEBwYXJhbSBieUFqYXgg5piv5ZCm5L2/55SoQWpheOWPkemAgeivt+axgu+8iOm7mOiupOS9v+eUqOaOp+S7tu+8iVxyXG4vLyAgICAgICogQHBhcmFtIHN1Y2Nlc3Mg5oiQ5Yqf5Zue6LCDXHJcbi8vICAgICAgKiBAcGFyYW0gZXJyb3Ig6ZSZ6K+v5Zue6LCD77yI5Lia5Yqh6ZSZ6K+v77yJXHJcbi8vICAgICAgKiBAcGFyYW0gZmFpbCDlpLHotKXlm57osIPvvIjor7fmsYLlpLHotKXvvIlcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gICAgICAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IHN1Y2Nlc3NDYWxsYmFjayA9IChkYXRhLGZ1YykgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5Tlm57miJDlip/nu5PmnpzvvJpcIilcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgcmVxID0gcmVzcG9uc2VGb3JtYXR0ZXIoZGF0YSk7XHJcbi8vICAgICAgICAgICAgICAgICBpZiggISFmdWMgKXtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXEuZnVjID0gZnVjO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXEpXHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBlcnJvckNhbGxiYWNrID0gKGVycikgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5Tlm57lpLHotKXnu5PmnpzvvJpcIilcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAodXJsID09IENPTkZJRy5SRVNULmFwcGx5TWNjIHx8IHVybCA9PSBDT05GSUcuUkVTVC5hcHBseU1hdCB8fCB1cmwgPT0gQ09ORklHLlJFU1QudG9kYXlNb25leSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCByZXEgPSByZXNwb25zZUZvcm1hdHRlcihlcnIpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVxKVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgVG9hc3QuaW5mbyhlcnIubXNnIHx8ICfmn6Xor6LkuJrliqHopoHntKDlh7rplJnvvIzor7fnqI3lkI7lho3or5XvvIEnKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IG5ldHdvcmtDYWxsYmFjayA9ICh4aHIpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIFRvYXN0LmluZm8oeGhyLm1zZyk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcblxyXG4vLyAgICAgICAgICAgICBpZiAodXJsICE9IENPTkZJRy5SRVNULmdldFRvZGF5SW5jb21lKSB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5zaG93TG9hZGluZygpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAoIWNhY2hlKSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVybDpcIiArIHVybClcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUGFyYW06XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh7XHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGVuY3J5cHQ6IGVuY3J5cHQsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgZm9yQ2hzcDogZm9yQ2hzcCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBieUFqYXg6IGJ5QWpheFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gfSlcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB6Z2e57yT5a2Y6K+35rGCXCIpXHJcbi8vICAgICAgICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2UoXHJcbi8vICAgICAgICAgICAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXJpOnNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH0sIGZvckNoc3AsIGJ5QWpheCwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBuZXR3b3JrQ2FsbGJhY2spO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDYWNoZVVybDpcIiArIHVybClcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3RvcmVhZ2XnrZbnlaXmmK86XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ1cGRhdGXlh73mlbA6XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1cGRhdGUpXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWPkemAgee8k+WtmOivt+axglwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICAgICAgICAgKiDlkJHmnI3liqHlmajlj5HpgIHor7fmsYJcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBwYXJhbXMg6K+35rGC5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZlcnNpb27vvJrniYjmnKzvvIzpu5jorqTmmK8xLjBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc291cmNl77ya5p2l5rqQ77yM6buY6K6k5qC55o2uQW5kcm9pZOOAgWlPU+iHquWKqOa3u+WKoFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBlbmNyeXB077ya5piv5ZCm5Yqg5a+G77yM6buY6K6k5Yqg5a+GXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIG1ldGhvZO+8muivt+axguaWueazle+8jFBPU1TmiJZHRVRcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgY21k77ya6K+35rGC5ZG95Luk77yI5Lmf5Y+v6Ieq6KGM5bCGY21k57uE6KOF6IezdXJpW+S8mOaDoOWQjuWPsF3miJZwYXRoW+mSseWMheWQjuWPsF3vvIlcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdXJpL3BhdGjvvJror7fmsYLlnLDlnYDvvIzlu7rorq7ku4XloavlhYVjbWTvvIzkuI3lu7rorq7oh6rooYznu4Too4V1cmkvcGF0aFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBwYXJhbXPvvJrlj5HpgIHnu5nlkI7lj7DnmoTlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmlk77ya5aaC5p6c6YCa6L+HQWpheOaWueW8j+WQkXdhbGxldOWQjuWPsOWPkemAgeivt+axgumcgOimgeaQuuW4pnZpZFxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGZvckNoc3Ag5piv5ZCm5ZCR5LyY5oOg5ZCO5Y+w5Y+R6YCB6K+35rGC77yI6buY6K6k5ZCR5omL5py65ZCO5Y+w5Y+R6YCB6K+35rGC77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gYnlBamF4IOaYr+WQpuS9v+eUqEFqYXjlj5HpgIHor7fmsYLvvIjpu5jorqTkvb/nlKjmjqfku7bvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBzdWNjZXNzIOaIkOWKn+Wbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGVycm9yIOmUmeivr+Wbnuiwg++8iOS4muWKoemUmeivr++8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGZhaWwg5aSx6LSl5Zue6LCD77yI6K+35rGC5aSx6LSl77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gdXBkYXRlIOW8guatpeWIt+aWsOWbnuiwgyDlpoLmnpzorr7nva5hc3luY+S4unRydWXlkI7lj6/ku6Xmt7vliqB1cGRhdGXlm57osIMg5aaC5p6c5LiN5aGr5YaZ6buY6K6k5Lulc3VjY2Vzc+i/m+ihjOWkhOeQhlxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHN0b3JhZ2Ug57yT5a2Y5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIG5lZWRTdyAgICAgICAgICAgIC8v6buY6K6kZmFsc2XlpKfpg6jliIbnlKjnmoTmmK/mj5Lku7bpnIDopoHnmoTmiYvliqjljrvliqBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc3RvcmFnZVR5cGUgICAgICAvL+m7mOiupOS9v+eUqGxvY2Fsc3RvcmFnZVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBhc3luYyAgICAgICAgICAgIC8v6buY6K6k6I635Y+W57yT5a2Y5ZCO5LiN5Y+R6K+35rGC77yM5pS55Li6dHJ1ZeWQjuS8muW8guatpeWOu+ivt+axguWQjuWPsOW5tuWIt+aWsOaVsOaNrlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBlbmRPZlN5bmNGdW5jICAgIC8vdG9kbyDph43opoHvvIHvvIHvvIHvvIHlm57osIPkuK3lpoLmnpzlrZjlnKjlvILmraXvvIjmj5Lku7bnrYnvvInpnIDopoHmoIfmmI7lvILmraXnirbmgIHkuLp0cnVlXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZhbGlkYXRlVGltZSAgICAgLy/mnInmlYjmnJ/pu5jorqTml6DpmZDmnInmlYjmnJ8g5Y2V5L2N5q+r56eSXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVXaXRoSWQgICAgICAgLy/pu5jorqR0cnVl5Lul55So5oi3aWTov5vooYzlrZjlgqjlkKbliJlmYWxzZeS7pWxvY2Fs5a2Y5YKoXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVTdWNjICAgICAgICAgLy/kv53lrZjmiJDlip/lkI7nmoTlm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZUVyciAgICAgICAgICAvL+S/neWtmOWksei0peWQjueahOWbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICByb2xsS2V5ICAgICAgICAgIC8v5by65Yi26K6+572u5Li76ZSuXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNlY29uZEtleSAgICAgICAgLy/lvLrliLborr7nva7mrKHopoHplK7lgLxcclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOmHjeimgeivtOaYjiDosIPnlKjlvILmraXmqKHlvI/vvIhhc3luY+iuvue9ruS4unRydWXvvInlkI7lj6/og73lnKhzdWNjZXNz5Zue6LCD6YeM5a2Y5Zyo5byC5q2l5pON5L2c77yM6K+l5oOF5Ya15LiL5Zue5a+86Ie057yT5a2Y55qE5Zue6LCD5Y+v6IO9XHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDmnKrmiafooYzlrozmiJDvvIzor7fmsYLnmoTlm57osIPlj4jlvIDlp4vmiafooYzkuobnmoTmg4XlhrXvvIzmiYDku6XmiJHku6znu5/kuIDlnKhzdWNjZXNz5Zue6LCD5ZKMdXBkYXRl5Zue6LCD55qE5YWl5Y+C5aKe5Yqg5LqG56ys5LqM5Liq5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDnlKjkuo7lhbzlrrnlm57osIPlhoXljIXlkKvlvILmraXnmoTnirblhrXvvIzkvb/nlKjmlrnms5XkuLrvvJrpppblhYjorr7nva5lbmRPZlN5bmNGdW5j5Y+C5pWw5Li6dHJ1ZSzlhbbmrKFzdWNjZXNz5ZKMdXBkYXRl5ZueXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDosIPlhoXkvJrmnIky5Liq5YWl5Y+C77yMc3VjY2Vzc++8iHJlc3DvvIxmdWPvvInvvIzor7flnKjku6PnoIHpl63ljIXlpITkvb/nlKhmdWMuZW5kT2ZGdW5jKClcclxuLy8gICAgICAgICAgICAgICAgICAqL1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIGxldCBwYXJhbSA9IHt9XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmIChieUFqYXgpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwYXJhbSA9IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IFwibGlmZS9saWZlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwYXJhbSA9IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVyaTpzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlV2l0aFN0b3JhZ2UocGFyYW0sIGZvckNoc3AsIGJ5QWpheCwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBuZXR3b3JrQ2FsbGJhY2ssIHN0b3JhZ2UsIHVwZGF0ZSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgfSlcclxuLy8gICAgIH0pXHJcblxyXG5cclxuLy8gICAgIC8vIH1cclxuLy8gICAgIC8vIGVsc2Uge1xyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6YCa6L+HQWpheCDlj5HpgIHor7fmsYJcclxuLy8gICAgICAqL1xyXG4vLyAgICAgLy8gcmV0dXJuIGF4aW9zKHtcclxuLy8gICAgIC8vICAgICB1cmw6IGJhc2VVcmwgKyB1cmwsXHJcbi8vICAgICAvLyAgICAgbWV0aG9kLFxyXG4vLyAgICAgLy8gICAgIGhlYWRlcnMsXHJcbi8vICAgICAvLyAgICAgZGF0YTogbWV0aG9kID09PSAnR0VUJyA/IHVuZGVmaW5lZCA6IGRhdGEsXHJcbi8vICAgICAvLyAgICAgcGFyYW1zOiBPYmplY3QuYXNzaWduKG1ldGhvZCA9PT0gJ0dFVCcgPyBkYXRhIDoge30sIHBhcmFtcylcclxuLy8gICAgIC8vIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbi8vICAgICAvL1xyXG4vLyAgICAgLy8gICAgIGxldCByZXEgPSB7XHJcbi8vICAgICAvLyAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLmRhdGEucmVzcCxcclxuLy8gICAgIC8vICAgICAgICAgZGF0YTogcmVzcG9uc2UuZGF0YS5wYXJhbXNcclxuLy8gICAgIC8vICAgICB9XHJcbi8vICAgICAvLyAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXEpXHJcbi8vICAgICAvLyB9KS5jYXRjaChlcnIgPT4ge1xyXG4vLyAgICAgLy8gICAgIC8vIOivt+axguWHuumUmVxyXG4vLyAgICAgLy8gICAgIFRvYXN0LmluZm8oJ3JlcXVlc3QgZXJyb3IsIEhUVFAgQ09ERTogJyArIGVyci5yZXNwb25zZS5zdGF0dXMpO1xyXG4vLyAgICAgLy8gICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xyXG4vLyAgICAgLy8gfSk7XHJcbi8vICAgICAvLyB9XHJcblxyXG4vLyB9XHJcblxyXG4vLyDkuIDkupvluLjnlKjnmoTor7fmsYLmlrnms5VcclxuZXhwb3J0IGNvbnN0IGdldCA9ICh1cmwsIGRhdGEsIHBhcmFtID0ge30pID0+IHtcclxuICAgIGxldCBwYXJhbUFsbCA9IE9iamVjdC5hc3NpZ24oe2ZvckNoc3A6IHRydWUsIGVuY3J5cHQ6IHRydWUsIGNhY2hlOiBmYWxzZSwgYnlBamF4OiBmYWxzZX0sIHBhcmFtKTtcclxuICAgIHJldHVybiByZXF1ZXN0KE9iamVjdC5hc3NpZ24oe3VybCwgZGF0YX0sIHBhcmFtQWxsKSlcclxufTtcclxuZXhwb3J0IGNvbnN0IHBvc3QgPSAodXJsLCBkYXRhLCBwYXJhbSA9IHt9KSA9PiB7XHJcbiAgICBsZXQgcGFyYW1BbGwgPSBPYmplY3QuYXNzaWduKHtmb3JDaHNwOiB0cnVlLCBlbmNyeXB0OiB0cnVlLCBjYWNoZTogZmFsc2UsIGJ5QWpheDogZmFsc2V9LCBwYXJhbSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdChPYmplY3QuYXNzaWduKHttZXRob2Q6ICdQT1NUJywgdXJsLCBkYXRhfSwgcGFyYW1BbGwpKVxyXG59O1xyXG5leHBvcnQgY29uc3QgcHV0ID0gKHVybCwgZGF0YSkgPT4gcmVxdWVzdCh7bWV0aG9kOiAnUFVUJywgdXJsLCBkYXRhfSk7XHJcbmV4cG9ydCBjb25zdCBkZWwgPSAodXJsLCBkYXRhKSA9PiByZXF1ZXN0KHttZXRob2Q6ICdERUxFVEUnLCB1cmwsIGRhdGF9KTtcclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiDlip/og73lh73mlbDljLpcclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiDlsIZVUkzkuK3nmoRzZWFyY2gg5a2X56ym5LiyIOi9rOaNouaIkCDlr7nosaFcclxuICogQHBhcmFtIHNlYXJjaFxyXG4gKiBAcmV0dXJucyB7e319XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0U2VhcmNoUGFyYW0gPSAoc2VhcmNoKSA9PiB7XHJcbiAgICBpZiAoISFzZWFyY2gpIHtcclxuICAgICAgICBsZXQgc3RyID0gc2VhcmNoLnNsaWNlKDEpO1xyXG4gICAgICAgIGxldCBhcnJheSA9IHN0ci5zcGxpdChcIiZcIik7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtID0gaXRlbS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgICAgIG9ialtwYXJhbVswXV0gPSBwYXJhbVsxXTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiBjb2RvdmEg5o+S5Lu26LCD55So5Yy6XHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuXHJcbi8vIOWQr+WBnOaUtuasvueggVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0WGlhb1dlaVBheShwYXJhbSwgc3VjLCBlcnIpIHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnNldFhpYW9XZWlQYXkocGFyYW0sIHN1YywgZXJyKTtcclxufVxyXG5cclxuLy/lsI/lvq5hdWRpb1xyXG5leHBvcnQgY29uc3Qgc2V0WGlhb1dlaUF1ZGlvID0gKHBhcmFtLCBzdWMsIGVycikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuc2V0WGlhb1dlaUF1ZGlvKHBhcmFtLCBzdWMsIGVycik7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGdldFhpYW9XZWlBdWRpbyA9IChzdWMsIGVycikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuZ2V0WGlhb1dlaUF1ZGlvKHN1YywgZXJyKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRvYXN0ID0gKG1zKSA9PiB7XHJcbiAgICBUb2FzdC5pbmZvKG1zLCAyKTtcclxufVxyXG4vKipcclxuICog6K6+572u6aG26YOoYmFyXHJcbiAqIEBwYXJhbSB0aXRsZSDpobXpnaLlkI3np7BcclxuICogQHBhcmFtIHJpZ2h0QmFyIOWPs+S+p+aMiemSruWQjeensFxyXG4gKiBAcGFyYW0gcmlnaHRDYWxsYmFjayDlj7PkvqfmjInpkq7lm57osINcclxuICogQHBhcmFtIHJpZ2h0QmFySW1nIOWPs+S+p+aMiemSruWbvueJh1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGJlZm9yZUVudGVyUm91dGVyID0gKHRpdGxlID0gXCJcIiwgcmlnaHRCYXIgPSBcIlwiLCByaWdodENhbGxiYWNrID0gbnVsbCwgcmlnaHRCYXJJbWcgPSBudWxsKSA9PiB7XHJcbiAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJUaXRsZSh0aXRsZSlcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7nqpflj6Plj7PkvqfmjInpkq5cclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGUg5Zu+5qCH5qCH6aKYXHJcbiAgICAgICAgICogQHBhcmFtIGltYWdlIOWbvuagh+aWh+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSBoYW5kbGVyIOeCueWHu+Wbnuiwg+WHveaVsFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmICghIXJpZ2h0Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJSaWdodEJ1dHRvbihyaWdodEJhciwgcmlnaHRCYXJJbWcsIHJpZ2h0Q2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uKFwiXCIsIG51bGwsIG51bGwpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICog6YCa55+l5a6i5oi356uv5L+u5pS554q25oCBXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWNjU3RhdGVDaGFuZ2VkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLm1jY1N0YXRlQ2hhbmdlZCgpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2VuZFFyQ29kZSA9IChwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaJq+aPj+adoeeggeWSjOS6jOe7tOeggVxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXNcclxuICAgICAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICAgICAqIEBwYXJhbSBmYWlsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLnNjYW5RUkNvZGUocGFyYW1zLCBzdWNjZXNzLCBmYWlsKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNsb3NlV2ViVmlldyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmNsb3NlV2ViVmlldygpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdmVyaWZ5UGF5UHdkID0gKHBhcmFtLCBzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC52ZXJpZnlQYXlQd2QocGFyYW0sIHN1Y2Nlc3MsIGZhaWwpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlV2ViVmlldyA9ICh1cmwsIHBhcmFtcyA9IG51bGwsIHRpdGxlID0gJycsIGlzRmluaXNoID0gXCIxXCIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmNyZWF0ZVdlYlZpZXcodXJsLCBwYXJhbXMsIHRpdGxlLCBpc0ZpbmlzaClcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VXNlckRldGFpbEluZm8gPSAoc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLmdldFVzZXJEZXRhaWxJbmZvKHN1Y2Nlc3MsIGZhaWwpXHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDlsIZjYXZhcyDkv53lrZjliLDmnKzlnLDnm7jlhoxcclxuICogQHBhcmFtIGNhbnZhc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNhdmVRY29kZSA9IChjYW52YXMpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIHVpID0gVVAuVy5VSSB8fCB7fTtcclxuICAgIHZhciBwaWNVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYXBwLmxvZ0V2ZW50KCdzYXZlUGljdHVyZV9OZXdZZWFyQWN0Jyk7XHJcbiAgICAgICAgYXBwLnNhdmVQaWNUb0xvY2FsKHtcclxuICAgICAgICAgICAgdXJsOiBwaWNVcmwgJiYgcGljVXJsLnN1YnN0cigyMilcclxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHVpLnNob3dUb2FzdFdpdGhQaWMoJ+W3suS/neWtmOWIsOezu+e7n+ebuOWGjCcpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9PSAndXBkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd0FsZXJ0KCfor7fljYfnuqfliLDmnIDmlrDlrqLmiLfnq68nLCBmdW5jdGlvbiAoKSB7IC8vIOWOu+WNh+e6p1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnWWVzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnYuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS9jbi9hcHAvaWQ2MDAyNzM5Mjg/Y29kZT1uZXdZZWFyQWN0aXZpdHknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL3lvdWh1aS45NTUxNi5jb20vYXBwL2FwcC9zb2Z0d2FyZS91bmlvbnBheS13YWxsZXQtdjIuYXBrP2NvZGU9bmV3WWVhckFjdGl2aXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhcHAub3BlbkJyb3dzZXIodXJsKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ05vJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAn6ams5LiK5Y2H57qnJywgJ+eojeWQjuWGjeivtCcsICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dUb2FzdChtc2cgfHwgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzaGFyZSA9ICh0aXRsZSwgZGVzYywgaW1nVVJMLCBwYWdlVVJsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciBlbnYgPSBVUC5XLkVudiB8fCB7fTtcclxuXHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaYvuekuuWIhuS6q+mdouadv1xyXG4gICAgICAgICAqIOWmguaenOaJgOaciea4oOmBk+S9v+eUqOebuOWQjOeahOWIhuS6q+WGheWuueWImeS7heWhq+WGmXBhcmFtc+WNs+WPr++8jFxyXG4gICAgICAgICAqIOWmguaenOmcgOimgeagueaNruS4jeWQjOa4oOmBk+WumuWItuWIhuS6q+WGheWuue+8jOWImeWPr3BhcmFtc+eVmeepuu+8jOWcqHNoYXJlQ2FsbGJhY2vkuK3ov5Tlm57mjIflrprmuKDpgZPnmoTliIbkuqvlhoXlrrlcclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zIOWIhuS6q+WPguaVsFxyXG4gICAgICAgICAqICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICB0aXRsZe+8miDliIbkuqvmoIfpophcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGRlc2M6IOWIhuS6q+aRmOimgVxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgcGljVXJs77ya5YiG5Lqr5Zu+5qCHXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBzaGFyZVVybO+8muivpuaDheWcsOWdgFxyXG4gICAgICAgICAqICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICogQHBhcmFtIHNoYXJlQ2FsbGJhY2sg5YiG5Lqr5pe25Zue6LCDXHJcbiAgICAgICAgICogICAgICAgICAgICAgIGNoYW5uZWzvvJp7XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAw77ya55+t5L+hXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAx77ya5paw5rWq5b6u5Y2aXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAz77ya5b6u5L+h5aW95Y+LXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA077ya5b6u5L+h5pyL5Y+L5ZyIXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA177yaUVHlpb3lj4tcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDbvvJpRUeepuumXtFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgN++8muWkjeWItumTvuaOpVxyXG4gICAgICAgICAqICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICogICAgICAgICAgICAgIGRhdGE6IOm7mOiupOWIhuS6q+aVsOaNrlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5zaG93U2hhcmVQYW5lbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgZGVzYzogZGVzYyxcclxuICAgICAgICAgICAgcGljVXJsOiBpbWdVUkwsXHJcbiAgICAgICAgICAgIHNoYXJlVXJsOiBwYWdlVVJsICAvLyB0b2RvIOaZrumAmuWIhuS6q1xyXG4gICAgICAgIH0sIG51bGwpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueUqOaIt+eahOWumuS9je+8jOmmluWFiOmAmui/h0dQUyDlrprkvY3vvIzlpoLmnpzlrprkvY3lpLHotKXvvIzpgJrov4fmjqXlj6NnZXRDaXR5LOWIqeeUqElQ5Zyw5Z2A6L+b6KGM5a6a5L2N77yM5aaC5p6c6L+Y5piv5aSx6LSl77yM6YCa6L+H5o+S5Lu26I635Y+W5a6i5oi356uv5bem5LiK6KeS55qE5Z+O5biC5L+h5oGv77yM5L6d54S25aSx6LSl6buY6K6k56m/Y2l0eUNkOjMxMDAwMCDku6PooajkuIrmtbfluIJcclxuICogQHBhcmFtIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudExvY2F0aW9uSW5mbyA9IChjYWxsYmFjazIpID0+IHtcclxuICAgIGNvbnN0IHVpID0gVVAuVy5VSTtcclxuICAgIHVpLnNob3dMb2FkaW5nKCk7XHJcbiAgICBsZXQgY2FsbGJhY2sgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgIHVpLmRpc21pc3MoKTtcclxuICAgICAgICBjYWxsYmFjazIoZGF0YSlcclxuICAgIH1cclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFwcC5nZXRDdXJyZW50TG9jYXRpb25JbmZvKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGFsZXJ0KEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjbWQ6IFwiL1wiICsgQ09ORklHLlJFU1QuZ2V0Q2l0eSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwYXRoOiBcImh0dHA6Ly8xNzIuMjEuMzMuNTY6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiK0NPTkZJRy5SRVNULmdldENpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb246IFwiMi4wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogXCIyXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEucGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEucGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaE5hdGl2ZURhdGEoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoTmF0aXZlRGF0YShjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hOYXRpdmVEYXRhID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5a6i5oi356uv5L+h5oGvXHJcbiAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3NcclxuICAgICAgICAgKiBAcGFyYW0gZmFpbFxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIDDvvJrln47luILkv6Hmga9jaXR5Q2TvvJsx77ya57uP57qs5bqm77ybNe+8mlVzZXJJZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5mZXRjaE5hdGl2ZURhdGEoMCwgKGRhdGEgPSB7fSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICAgICAgY2l0eUNkOiBcIjMxMDAwMFwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNhdmVQaWNUb0xvY2FsID0gKGNhbnZhcywgcmVzb2x2ZSkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgdWkgPSBVUC5XLlVJIHx8IHt9O1xyXG4gICAgdmFyIHBpY1VybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuc2F2ZVBpY1RvTG9jYWwoe1xyXG4gICAgICAgICAgICB1cmw6IHBpY1VybCAmJiBwaWNVcmwuc3Vic3RyKDIyKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgLy/miJDlip9cclxuICAgICAgICAgICAgISFyZXNvbHZlICYmIHJlc29sdmUoXCJzdWNjZXNzXCIpO1xyXG4gICAgICAgIH0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9PSAndXBkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd0FsZXJ0KCfor7fljYfnuqfliLDmnIDmlrDlrqLmiLfnq68nLCBmdW5jdGlvbiAoKSB7IC8vIOWOu+WNh+e6p1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnWWVzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnYuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS9jbi9hcHAvaWQ2MDAyNzM5Mjg/Y29kZT1uZXdZZWFyQWN0aXZpdHknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL3lvdWh1aS45NTUxNi5jb20vYXBwL2FwcC9zb2Z0d2FyZS91bmlvbnBheS13YWxsZXQtdjIuYXBrP2NvZGU9bmV3WWVhckFjdGl2aXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhcHAub3BlbkJyb3dzZXIodXJsKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ05vJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAn6ams5LiK5Y2H57qnJywgJ+eojeWQjuWGjeivtCcsICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICEhcmVzb2x2ZSAmJiByZXNvbHZlKFwiZmFpbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRleHRDYW52YXNlID0gKHRleHQsIGNvbG9yLCBsb25nID0gNjg0LCBzaG90ID0gNjApID0+IHtcclxuXHJcbiAgICBsZXQgcmVtMnB4ID0gKHZhbCkgPT4ge1xyXG4gICAgICAgIHZhciBjV2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcclxuICAgICAgICByZXR1cm4gdmFsICogY1dpZHRoIC8gNzUwXHJcbiAgICB9XHJcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHRDYW52YXMnKTtcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICAvL+ioree9rueVq+S9iOeahOWvrOmrmFxyXG4gICAgLy8gdmFyIGJnV2lkdGggPSByZW0ycHgobG9uZyk7XHJcbiAgICAvLyB2YXIgYmdIZWlnaHQgPSByZW0ycHgoc2hvdCk7XHJcblxyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzaG90KTtcclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGxvbmcpO1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIGN0eC5yb3RhdGUoLTkwICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICB2YXIgdGV4dCA9IHRleHQ7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xyXG4gICAgbGV0IGZvbnRTaXplID0gc2hvdDtcclxuICAgIGN0eC5mb250ID0gZm9udFNpemUgKyAncHggQWlyYWwnO1xyXG4gICAgd2hpbGUgKGN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCA+IGxvbmcpIHtcclxuICAgICAgICBmb250U2l6ZS0tO1xyXG4gICAgICAgIGN0eC5mb250ID0gZm9udFNpemUgKyAncHggQWlyYWwnO1xyXG4gICAgfVxyXG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIC1sb25nLCBmb250U2l6ZSk7XHJcbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDnlJ/miJDlm77niYflubbkv53lrZjliLDnm7jlhoxcclxuICogQHBhcmFtIGJndXJsIOiDjOaZr+WbvueJh+eahOWcsOWdgFxyXG4gKiBAcGFyYW0gcXJjb2RlVVJMIOS6jOe7tOeggeeahOWcsOWdgFxyXG4gKiBAcGFyYW0gcXJjb2RlV2RBbmRIZyDkuoznu7TnoIHnmoTlrr3luqZcclxuICogQHBhcmFtIHhXaWR0aCDkuoznu7TnoIHot53nprvlt6bkuIrop5LnmoQg4oaSIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0geUhlaWdodCDkuoznu7TnoIHot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0gdGV4dGJnVVJMIOWKoOWFpeeUu+W4g+eahOWbvueJh+eahFVSTFxyXG4gKiBAcGFyYW0geFRleHRXaWR0aCDliqDlhaXnlLvluIPnmoTlm77niYfot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0geVRleHRIZWlnaHQg5Yqg5YWl55S75biD55qE5Zu+54mH6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlQ29udmFzQW5kU2F2ZVBob3RvID0gKGNhbnZhc09iaiwgcmVzb2x2ZSkgPT4ge1xyXG4gICAgbGV0IHtiZ3VybCwgcXJjb2RlVVJMLCBxcmNvZGVXZEFuZEhnLCB4V2lkdGgsIHlIZWlnaHQsIHRleHRiZ1VSTCwgeFRleHRXaWR0aCwgeVRleHRIZWlnaHR9ID0gY2FudmFzT2JqO1xyXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tb25DYW52YXNXcmFwcGVyJyk7XHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOeUu+W4g+WGheWuuVxyXG4gICAgICovXHJcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMud2lkdGhcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5zcmMgPSBiZ3VybDtcclxuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8v6Kit572u55Wr5L2I55qE5a+s6auYXHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBpbWcud2lkdGgpO1xyXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGltZy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAvL+WcqOeVq+W4g+S4iueVq+iDjOaZr+WcllxyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcclxuXHJcbiAgICAgICAgaWYgKCEhdGV4dGJnVVJMKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0VXJpID0gdGV4dGJnVVJMO1xyXG4gICAgICAgICAgICB2YXIgdGV4dEltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICB0ZXh0SW1nLnNyYyA9IHRleHRVcmk7XHJcbiAgICAgICAgICAgIHRleHRJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0ZXh0SW1nLCB4VGV4dFdpZHRoLCB5VGV4dEhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5LqM57at56K85ZyW54mH5aSn5bCPXHJcbiAgICAgICAgdmFyIHFyY29kZVdpZHRoQW5kSGVpZ2h0ID0gcXJjb2RlV2RBbmRIZztcclxuICAgICAgICAvL+a4hemZpOS6jOe7tOeggVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdmFyIHFyY29kZSA9IG5ldyBRUkNvZGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIiksIHtcclxuICAgICAgICAgICAgdGV4dDogcXJjb2RlVVJMLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHFyY29kZVdpZHRoQW5kSGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogcXJjb2RlV2lkdGhBbmRIZWlnaHQsXHJcbiAgICAgICAgICAgIGNvcnJlY3RMZXZlbDogUVJDb2RlLkNvcnJlY3RMZXZlbC5MXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHFyY29kZUltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXTtcclxuICAgICAgICBxcmNvZGVJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+eVq+S6jOe2reeivOeahOWclueJh1xyXG4gICAgICAgICAgICBsZXQgcXJjb2RlRHggPSB4V2lkdGgsIHFyY29kZUR5ID0geUhlaWdodDtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShxcmNvZGVJbWcsIHFyY29kZUR4LCBxcmNvZGVEeSk7XHJcbiAgICAgICAgICAgIC8vIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgc2F2ZVBpY1RvTG9jYWwoY2FudmFzLCByZXNvbHZlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL3JlcXVlc3QuanMiLCJjb25zdCBjb25maWcgPSB7XHJcbiAgICBSRVNUOiB7XHJcbiAgICAgICAgYXBwbHlNY2M6IFwiY29sbGVjdGlvbkNvZGUvYXBwbHlNY2NcIiwgLy8yLjQuNOeUs+ivt+aUtuasvueggeaOpeWPo1xyXG4gICAgICAgIGdldE1jY0NhcmRMaXN0OiBcImNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCIsIC8vMi40LjLllYbmiLfmlLbmrL7noIHljaHliJfooajmjqXlj6NcclxuICAgICAgICBhcHBseU1hdDogXCJjb2xsZWN0aW9uQ29kZS9hcHBseU1hdFwiLCAvL+eUs+ivt+eJqeaWmeaOpeWPo1xyXG4gICAgICAgIGdldE1jaG50QW5kQXJlYUluZjogXCJtY2hudC9nZXRNY2hudEFuZEFyZWFJbmYuc2pzb25cIiwgLy/llYbmiLfnsbvlnovlj4rlnLDljLrliJfooajmn6Xor6JcclxuICAgICAgICB1cGdyYWRlTWNjOiBcImNvbGxlY3Rpb25Db2RlL3VwZ3JhZGVNY2NcIiwgLy8yLjQuNuWNh+e6p+aUtuasvueggeaOpeWPoyxcclxuICAgICAgICBnZXRBZGRyTGlzdDogXCJhZGRyZXNzL2dldEFkZHJMaXN0XCIgLCAvLzIuNC4xMyDojrflj5bmlLbotKflnLDlnYDliJfooahcclxuICAgICAgICBkZWxldGVBZGRyZXNzOiBcImFkZHJlc3MvZGVsZXRlQWRkcmVzc1wiICwgLy8yLjQuMTIg5Yig6Zmk5pS26LSn5Zyw5Z2AXHJcbiAgICAgICAgZWRpdEFkZHJlc3M6IFwiYWRkcmVzcy9lZGl0QWRkcmVzc1wiLCAvLzIuNC4xMSDkv67mlLnmlLbotKflnLDlnYAsXHJcbiAgICAgICAgbmV3QWRkcmVzczogXCJhZGRyZXNzL25ld0FkZHJlc3NcIiwgLy8yLjQuMTAg5paw5aKe5pS26LSn5Zyw5Z2AXHJcbiAgICAgICAgbWNobnRPcGVyIDpcIm1jaG50L21jaG50T3BlclwiLCAvLzIuMi4yIOW6l+mTuuS/oeaBr+abtOaWsFxyXG4gICAgICAgIGdldExpbWl0QXRJbmZvOlwibWNobnQvZ2V0TGltaXRBdEluZm9cIiwgLy/ojrflj5bmlLbmrL7pmZDpop1cclxuICAgICAgICBzZXRNY2NPbk9mZjpcImNvbGxlY3Rpb25Db2RlL3NldE1jY09uT2ZmXCIsIC8v5YGc5q2i5ZKM5ZCv55So5LuY5qy+56CB5YCf5Y+jXHJcbiAgICAgICAgZ2V0TWNobnREZXRhaWw6XCJtY2hudC9tY2hudERldGFpbFwiLCAvLzIuMi4xIOiOt+WPluW6l+mTuuivpuaDhemhtemdolxyXG4gICAgICAgIC8vIHVwZ3JhZGVNY2M6IFwiY29sbGVjdGlvbkNvZGUvdXBncmFkZU1jY1wiLCAvLzIuNC425Y2H57qn5pS25qy+56CB5o6l5Y+jXHJcbiAgICAgICAgZ2V0VG9kYXlUcmFuczpcInRyYW4vZ2V0VG9kYXlUcmFuc1wiLC8vMi4xLjMvL+S7iuaXpeiuouWNleaOpeWPo1xyXG4gICAgICAgIGdldFRvZGF5SW5jb21lOlwidHJhbi9nZXRUb2RheUluY29tZVwiLC8vMi4xLjHllYbmiLfmnI3liqHpppbpobXku4rml6XmlLbmrL7mjqXlj6N+fn5+fn5+flxyXG4gICAgICAgIGdldEhpc3RvcnlJbmNvbWU6XCJ0cmFuL2dldEhpc3RvcnlJbmNvbWVcIiwvLzIuMS4y5Y6G5Y+y5pS25qy+5o6l5Y+jXHJcbiAgICAgICAgZ2V0SGlzdG9yeVRyYW5zOlwidHJhbi9nZXRIaXN0b3J5VHJhbnNcIiwvLzIuMS405Y6G5Y+y6K6i5Y2V5o6l5Y+jXHJcbiAgICAgICAgZ2V0TG9naXN0aWNzU3Q6XCJtYXRlcmllbC9nZXRMb2dpc3RpY3NTdFwiLC8vMi4zLjPnianmtYHor6bmg4XmjqXlj6Pmn6Xor6JcclxuICAgICAgICBnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtOlwidHJhbi9nZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtXCIsLy8yLjEuNeWNleeslOiuouWNleafpeivouaOpeWPo1xyXG4gICAgICAgIGdldEF1ZGl0SW5mbzpcImNvbGxlY3Rpb25Db2RlL2dldEF1ZGl0SW5mb1wiLC8vMi40LjE05L+h55So5Y2h5Y2H57qn5a6h5qC457uT5p6c5p+l6K+iXHJcbiAgICAgICAgdXBkYXRlTWNjQ2FyZDpcImNvbGxlY3Rpb25Db2RlL3VwZGF0ZU1jY0NhcmRcIiwvLzIuNC455pu05o2i5pS25qy+5Y2h5o6l5Y+jXHJcbiAgICAgICAgZ2V0VXBncmFkZVN0OlwibWNobnQvZ2V0VXBncmFkZVN0XCIsLy/mn6Xor6LllYbmiLfmmK/lkKbljYfnuqfkv6HnlKjljaHmlLbmrL5cclxuICAgICAgICBnZXRNY2NUcmFuc051bTonY29sbGVjdGlvbkNvZGUvZ2V0TWNjVHJhbnNOdW0nLC8v6I635Y+W6LCD5Y+W5pSv5LuY5o6n5Lu255qEVE7lj7dcclxuICAgICAgICBnZXRNYXRlcmllbEluZm9MaXN0OlwiY29sbGVjdGlvbkNvZGUvZ2V0TWF0ZXJpZWxJbmZvTGlzdFwiLC8vMi40LjPnianmlpnkv6Hmga/liJfooajmjqXlj6NcclxuICAgICAgICB1c2VySW5mbzpcIi9hcHAvaW5BcHAvdXNlci9nZXRcIiwvL+iOt+WPlueUqOaIt+S/oeaBr1xyXG4gICAgICAgIGlzQmxhY2s6XCJzY2FuL2lzQmxhY2tcIiwvLzIuMS415pS26ZO25ZGY5piv5ZCm5Zyo6buR5ZCN5Y2VXHJcbiAgICAgICAgaXNBcHBseTpcInNjYW4vaXNBcHBseVwiLC8vMi4xLjTmmK/lkKblt7Lnu4/nlLPor7fnuqLljIXnoIFcclxuICAgICAgICBzaGFyZUxpbms6XCJzY2FuL3NoYXJlTGlua1wiLC8vMi4xLjbnlJ/miJDnuqLljIXnoIHpk77mjqVcclxuICAgICAgICByZWNtZFJlY29yZDpcInNjYW4vcmVjbWRSZWNvcmRcIiwvL+aOqOiNkOWFs+ezu+iusOW9lVxyXG4gICAgICAgIGdldExvZ2lzdGljc0xpc3Q6XCJtYXRlcmllbC9nZXRMb2dpc3RpY3NMaXN0XCIsLy/ojrflj5bnianmlpnljoblj7LorqLljZVcclxuICAgICAgICBnZXRSZXdhcmRMaXN0Olwic2Nhbi9nZXRSZXdhcmRMaXN0XCIsLy8yLjEuN+afpeivouaUtumTtuWRmOi1j+mHkeaYjue7huiusOW9lVxyXG4gICAgICAgIGdldFByb3RvY29sSW5mbzpcImNvbGxlY3Rpb25Db2RlL2dldFByb3RvY29sSW5mb1wiLC8v5ZWG5oi35Y2H57qn5p+l6K+i5pi+56S65Y2P6K6u55qE5ZCN56ew5ZKM5Y2P6K6u55qE5Zyw5Z2AXHJcbiAgICAgICAgZ2V0Q2l0eTpcInJlZ2lvbi9nZXRDaXR5XCIsLy/pgJrov4dJUOWcsOWdgOiOt+WPluWcsOWdgOWumuS9jVxyXG4gICAgICAgIGdldFFyVXJsOlwiY29sbGVjdGlvbkNvZGUvZ2V0UXJJbmZvXCIvLzIuMS4x6I635Y+W55So5oi35pS25qy+56CBVVJMXHJcbiAgICB9LFxyXG4gICAgU1RBVFVTQ09ERToge1xyXG4gICAgICAgIFNVQ0NFU1M6XCIwMFwiXHJcbiAgICB9LFxyXG4gICAgQ09OU1RfREFUQTp7XHJcbiAgICAgICAgaW1nZVNpemU6XCIzMDBcIlxyXG4gICAgfSxcclxuICAgIENBQ0hFS0VZOntcclxuICAgICAgICBnZXRNY2NDYXJkTGlzdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLWNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1tY2hudC9nZXRVcGdyYWRlU3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1tY2hudC9nZXRVcGdyYWRlU3RcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0TWNobnREZXRhaWw6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1tY2hudC9tY2hudERldGFpbFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLW1jaG50L21jaG50RGV0YWlsXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzQXBwbHk6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1zY2FuL2lzQXBwbHlcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1zY2FuL2lzQXBwbHlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0QWRkckxpc3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1hZGRyZXNzL2dldEFkZHJMaXN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtYWRkcmVzcy9nZXRBZGRyTGlzdFwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL2NvbmZpZy5qcyIsImltcG9ydCBJbW11dGFibGUgZnJvbSBcImltbXV0YWJsZVwiO1xyXG5cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOWPquS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiDlhYjor7vnvJPlrZjvvIzlkIzmraXlvoDlkI7lj7Dlj5Hor7fmsYLvvIzor7fmsYLmiqXmloflm57mnaXlkI7liLfmlrDnvJPlrZjlj4rpobXpnaJcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSA9ICh1cGRhdGUscm9sbEtleSxzZWNvbmRLZXkpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuLy8gICAgICAgICAgICAgcm9sbEtleSxcclxuLy8gICAgICAgICAgICAgc2Vjb25kS2V5XHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5LiN5pSv5oyBIHN3ICAgLOawuOS5hee3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2NhY2hlOiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW59fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlTG9uZ1RpbWUgPSAocm9sbEtleSwgc2Vjb25kS2V5KSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICAgICAgcm9sbEtleSxcclxuLy8gICAgICAgICAgICAgc2Vjb25kS2V5XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDlj6rkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMeWIhumSn+WGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTFtaW4gPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UzMG1pbiA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAzMCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMWhvdXIgPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKjYwKjEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTJob3VyID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDIgKiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG5cclxuLy9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTI0ZGlhbiA9ICgpID0+IHtcclxuLy9cclxuLy8gICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuLy8gICAgIGxldCB0ZW1vcnJvdyA9IG5ldyBEYXRlKCk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRIb3VycygyMyk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRNaW51dGVzKDU5KTtcclxuLy8gICAgIHRlbW9ycm93LnNldFNlY29uZHMoNTkpO1xyXG4vLyAgICAgbGV0IHRlbSA9IHRlbW9ycm93LmdldFRpbWUoKTtcclxuLy8gICAgIGxldCB2YWxpZGF0ZVRpbWUgPSB0ZW0gLSBub3cgKyAxMDAwICogNjBcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICB2YWxpZGF0ZVRpbWU6IHZhbGlkYXRlVGltZSxcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgd29ya2JveOeahOetlueVpSAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKuS4umdldOivt+axgu+8jOS4jeWKoOWvhlxyXG4vLyAgKuaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICrlhYjor7vnvJPlrZjvvIzlkIzml7blvoDlkI7lj7Dlj5Hor7fmsYLvvIzor7fmsYLmiqXmloflm57mnaXlkI7liLfmlrDnvJPlrZjlj4rpobXpnaJcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIGNhY2hlOiBib29sZWFuLCBhc3luYzogYm9vbGVhbn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGUgPSAodXBkYXRlKSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGJ5QWpheDogZmFsc2UsLy/lpoLmnpzopoHmlK/mjIFzdyDlsLHkuI3pnIDkvb/nlKhhamF4XHJcbi8vICAgICAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIHVwZGF0ZTogdXBkYXRlXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMzDliIbpkp/lhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MzBtaW4gPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAzMCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAx5bCP5pmC5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDFob3VyID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QyaG91ciA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDIgKiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vKipcclxuICog6K+l562W55Wl5piv5LiA5a6a5pe26Ze05YaF5LiN5ZCR5ZCO5Y+w6K+35rGC5pWw5o2u77yMIOWmguaenOWcqOiuvuWkh+S4iuaUr+aMgXN35YiZ5L2/55Soc3cs5ZCm5YiZ5L2/55SoIGxvY2FsU3RvcmFnZVxyXG4gKiBAcGFyYW0gdGltZSAg6KaB57yT5a2Y55qE5pe26Ze0IOWNleS9jeaYr+avq+enklxyXG4gKiBAcmV0dXJucyB7e2J5QWpheDogYm9vbGVhbiwgZm9yQ2hzcDogYm9vbGVhbiwgZW5jcnlwdDogYm9vbGVhbiwgY2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHt2YWxpZGF0ZVRpbWU6ICp9fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjYWNoZUZpcnN0ID0odGltZSk9PntcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYnlBamF4OiB0cnVlLFxyXG4gICAgICAgIGZvckNoc3A6ZmFsc2UsXHJcbiAgICAgICAgZW5jcnlwdDpmYWxzZSxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRlVGltZTp0aW1lLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiAg6K+l562W55Wl5piv5LiA5a6a5pe26Ze05YaF5LiN5ZCR5ZCO5Y+w6K+35rGC5pWw5o2u77yM5re75Yqg57yT5a2Y5Y+q5ZyobG9jYWxzdG9yYWdl5LitXHJcbiAqIEBwYXJhbSB0aW1lICDopoHnvJPlrZjnmoTml7bpl7Qg5Y2V5L2N5piv5q+r56eSXHJcbiAqIEBwYXJhbSByb2xsS2V5ICAg6Z2e5b+F5aGrIOWmguaenOWQjuacn+imgeWIoOmZpOi/meS4que8k+WtmO+8jOi/meWhq+WGmei/mWtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5ICDpnZ7lv4Xloasg5aaC5p6c5ZCO5pyf6KaB5Yig6Zmk6L+Z5Liq57yT5a2Y77yM6L+Z5aGr5YaZ6L+Za2V5XHJcbiAqIEByZXR1cm5zIHt7Y2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHtuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogKiwgcm9sbEtleTogKiwgc2Vjb25kS2V5OiAqfX19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2FjaGVGaXJzdFN0b3JhZ2UgPSh0aW1lLHJvbGxLZXksIHNlY29uZEtleSk9PntcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZVRpbWU6IHRpbWUsXHJcbiAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlRm9ybWF0dGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCByZXMgPSB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5yZXNwLFxyXG4gICAgICAgIGRhdGE6IGRhdGEucGFyYW1zLFxyXG4gICAgICAgIG1zZzogZGF0YS5tc2dcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vKipcclxuICog6K+l562W55Wl5piv5YWI6K+757yT5a2Y77yM5ZCM5pe25ZCR5ZCO5Y+w5Y+R6YCB6K+35rGC77yM6K+35rGC5Zue5p2l5ZCO5ZCM5q2l5pu05paw57yT5a2Y77yM5Zue6LCDdXBkYXRlIOWHveaVsO+8jFxyXG4gKiBAcGFyYW0gdXBkYXRlIOW/heWhq+abtOaWsOmhtemdoueahOWbnuiwg+WHveaVsFxyXG4gKiBAcGFyYW0gcm9sbEtleSAg6Z2e5b+F5aGrIOiuvue9rue8k+WtmOeahCByb2xsa2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXkg6Z2e5b+F5aGrIOiuvue9rue8k+WtmOeahCBzZWNvbmRLZXlcclxuICogQHJldHVybnMge3tjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge2FzeW5jOiBib29sZWFuLCByb2xsS2V5OiAqLCBzZWNvbmRLZXk6ICp9LCB1cGRhdGU6ICp9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSA9ICh1cGRhdGUscm9sbEtleSxzZWNvbmRLZXkpID0+IHtcclxuXHJcbiAgIGxldCAgcmVmcmVzaERvbUZ1bmM9KHJlc3BvbnNlKT0+e1xyXG4gICAgICAgbGV0IHJlcT1yZXNwb25zZUZvcm1hdHRlcihyZXNwb25zZSlcclxuICAgICAgIC8vIOWwhuiOt+WPlueahOaVsOaNruWSjOe8k+WtmOS4reeahOaVsOaNrui/m+ihjOWvueavlFxyXG4gICAgICAgbGV0IGRhdGFGcm9tQ2FjaGUgPSB7fTtcclxuICAgICAgIFVQLlcuVXRpbC5nZXRGcm9tU3RvcmFnZSh7XHJcbiAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgIH0sZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgaWYoICEhZGF0YSApe1xyXG4gICAgICAgICAgICAgICAgZGF0YUZyb21DYWNoZSA9IGRhdGE7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICB9KVxyXG4gICAgICAgbGV0IGlzU2FtZUF0QWxsID0gSW1tdXRhYmxlLmlzKEltbXV0YWJsZS5mcm9tSlMocmVxKSxJbW11dGFibGUuZnJvbUpTKGRhdGFGcm9tQ2FjaGUpKTsgLy/mlbDmja7mmK/lkKblrozlhajnm7jlkIxcclxuICAgICAgIGlmKCAhaXNTYW1lQXRBbGwgKXsgLy/mlbDmja7mnInlj5jliqhcclxuICAgICAgICAgICAgdXBkYXRlKHJlcSlcclxuICAgICAgIH1cclxuICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBlbmRPZlN5bmNGdW5jOmZhbHNlLFxyXG4gICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZTogcmVmcmVzaERvbUZ1bmMsXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKDpmaRsb2NhbHN0b3JhZ2XkuK3nmoTnvJPlrZhcclxuICogQHBhcmFtIHJvbGxLZXlcclxuICogQHBhcmFtIHNlY29uZEtleVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlbW92ZUNhY2hlID0gKHJvbGxLZXksIHNlY29uZEtleSkgPT4ge1xyXG4gICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgIHJvbGxLZXk6IHJvbGxLZXksXHJcbiAgICAgICAgc2Vjb25kS2V5OiBzZWNvbmRLZXlcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5Yig6Zmk57yT5a2Y5oiQ5YqfJylcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgICAgIGZ1bGw6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvY2FjaGVTdG9yYWdlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS10cnlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdQcm9taXNlJywgeyAndHJ5JzogZnVuY3Rpb24gKGNhbGxiYWNrZm4pIHtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZih0aGlzKTtcbiAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oY2FsbGJhY2tmbik7XG4gIChyZXN1bHQuZSA/IHByb21pc2VDYXBhYmlsaXR5LnJlamVjdCA6IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmUpKHJlc3VsdC52KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA4ZTBjMWRiMDAwODVjOGFkMjU1YVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzdGF0aWMvaW1ncy9zZW5kYXJ0aWNsZS1pY29uLjk1ODk3MDlmZmMucG5nXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXNzZXRzL2ltZ3Mvc2VuZGFydGljbGUtaWNvbi5wbmdcbi8vIG1vZHVsZSBpZCA9IDkzMmFkNmExMzRjZTcxYzFmYTNiXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UudHJ5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDk3M2NjOGVlZmM1OTkzMWRlOTVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGJ5IG9uIDIwMTgvNC8xMi5cclxuICovXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgXCIuL0lvZ2lzdGljc0luZm8uc2Nzc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW9naXN0aWNzSW5mb1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVuRG9tKGRlbGl2ZXJ5TXNnKSB7XHJcbiAgICAgICAgc3RhdHVzID0gZGVsaXZlcnlNc2cubWF0RGVsaXZTdGF0dXM7XHJcbiAgICAgICAgbGV0IHJlbmRlcklvZ2lzdGljTGlzdDtcclxuXHJcbiAgICAgICAgbGV0IHRyYW5zSnNvbk9iaiA9IEpTT04ucGFyc2UoZGVsaXZlcnlNc2cubWF0RGVsaXZEZXRhaWwpO1xyXG4gICAgICAgIC8vIHRyYW5zSnNvbk9iai50cmFjZXMgPSBbXHJcbiAgICAgICAgLy8gICAgIHthY2NlcHRBZGRyZXNzOiAnYScsIGFjY2VwdFRpbWU6IFwiMjAxOC0wNi0xMSAxNTo0MTowMFwifSxcclxuICAgICAgICAvLyAgICAge2FjY2VwdEFkZHJlc3M6ICdkJywgYWNjZXB0VGltZTogXCIyMDE4LTA2LTEyIDA1OjA1OjAwXCJ9LFxyXG4gICAgICAgIC8vICAgICB7YWNjZXB0QWRkcmVzczogJ2MnLCBhY2NlcHRUaW1lOiBcIjIwMTgtMDYtMTEgMjA6MzE6MDlcIn0sXHJcbiAgICAgICAgLy8gICAgIHthY2NlcHRBZGRyZXNzOiAnYicsIGFjY2VwdFRpbWU6IFwiMjAxOC0wNi0xMSAxOToxNzo0NVwifSxcclxuICAgICAgICAvLyAgICAge2FjY2VwdEFkZHJlc3M6ICdlJywgYWNjZXB0VGltZTogXCIyMDE4LTA2LTEyIDA3OjM2OjQ3XCJ9LFxyXG4gICAgICAgIC8vIF07XHJcbiAgICAgICAgLy/lr7nml6Dluo/nmoTlsZXnpLrkv6Hmga/ov5vooYzmjpLluo9cclxuICAgICAgICBsZXQgYXJyYXkgPSB0cmFuc0pzb25PYmoudHJhY2VzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSBhcnJheVtpXVxyXG4gICAgICAgICAgICBsZXQgajtcclxuICAgICAgICAgICAgZm9yIChqPSBpIC0gMTsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChuZXcgRGF0ZSh0ZW1wLmFjY2VwdFRpbWUpLmdldFRpbWUoKSA+IG5ldyBEYXRlKGFycmF5W2pdLmFjY2VwdFRpbWUpLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5W2ogKyAxXSA9IGFycmF5W2pdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcnJheVtqKzFdID0gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJhbnNKc29uT2JqLnRyYWNlcyA9IGFycmF5O1xyXG5cclxuICAgICAgICByZW5kZXJJb2dpc3RpY0xpc3QgPSBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxsaSBjbGFzc05hbWU9e1wiaXRlbSBjbGVhcmZpeFwifSBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImRldGFpbEluZm9cIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWZ0Qm9yZGVyV2FycFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJwb2ludFwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKXj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5lV2FycFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5lXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudEluZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtcImRlc2NcIn0+e2l0ZW0uYWNjZXB0QWRkcmVzc30ge2l0ZW0ucmVtYXJrfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtcImRlc2NUaW1lXCJ9PjxzcGFuPntpdGVtLmFjY2VwdFRpbWV9PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlIFwiMDBcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibW9uZXlDb2RlSW5nXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpb2dpc3RpY0ltZ1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtyZXF1aXJlKFwiLi4vLi4vYXNzZXRzL2ltZ3MvbW9uZXlQcm9pbmctaWNvbi5wbmdcIil9IGFsdD1cIlwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPuWItuS9nOS4rTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17XCJleHBsYWluXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg5oKo55Sz6K+355qE5pS25qy+56CB6LS057q45q2j5Zyo5Yi25L2c5Lit77yM5Yi25L2c5a6M5oiQ5ZCO5bCG6YCa6L+H5oyC5Y+35L+h5a+E6YCB77yMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDliLbkvZzlj4rlr4TpgIHlsIblnKg1LTfkuKrlt6XkvZzml6XlhoXlrozmiJDjgIJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwMVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpb2dpc3RpY0luZm9Db250YWluXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpb2dpc3RpY0JnXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW9naXN0aWNJbmZvXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17XCJpb2dpc3RpY1RpdGxlXCJ9PueJqea1geWFrOWPuDogPHNwYW4+e2RlbGl2ZXJ5TXNnLmxvZ2lzdGljc0NvbXBhbnkgPyBkZWxpdmVyeU1zZy5sb2dpc3RpY3NDb21wYW55IDogXCJcIn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPueJqea1geWNleWPtzogPHNwYW4+e2RlbGl2ZXJ5TXNnLmJpbGxDb2RlfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImdyZXlMaW5lXCJ9PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW9naXN0aWNTdGF0dXNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW9naXN0aWNJbWdcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtyZXF1aXJlKFwiLi4vLi4vYXNzZXRzL2ltZ3Mvc2VuZGFydGljbGUtaWNvbi5wbmdcIil9IGFsdD1cIlwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpb2dpc3RpY01lc3NhZ2VcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPuW3suWPkei0pzwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXtcImlvZ2lzdGljTGlzdFwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zSnNvbk9iai50cmFjZXMubWFwKHJlbmRlcklvZ2lzdGljTGlzdCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW9naXN0aWNJbmZvQ29udGFpblwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW9naXN0aWNCZ1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImlvZ2lzdGljSW5mb1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e1wiaW9naXN0aWNUaXRsZVwifT7nianmtYHlhazlj7g6IDxzcGFuPntkZWxpdmVyeU1zZy5sb2dpc3RpY3NDb21wYW55ID8gZGVsaXZlcnlNc2cubG9naXN0aWNzQ29tcGFueSA6IFwiXCJ9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD7nianmtYHljZXlj7c6IDxzcGFuPntkZWxpdmVyeU1zZy5iaWxsQ29kZX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJncmV5TGluZVwifT48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImlvZ2lzdGljU3RhdHVzXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImlvZ2lzdGljSW1nXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17cmVxdWlyZShcIi4uLy4uL2Fzc2V0cy9pbWdzL3N1Y2Nlc3MtaWNvbi5wbmdcIil9IGFsdD1cIlwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpb2dpc3RpY01lc3NhZ2VcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPuW3suetvuaUtjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXtcImlvZ2lzdGljTGlzdFwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zSnNvbk9iai50cmFjZXMubWFwKHJlbmRlcklvZ2lzdGljTGlzdCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDNcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibW9uZXlDb2RlSW5nXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpb2dpc3RpY0ltZ1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtyZXF1aXJlKFwiLi4vLi4vYXNzZXRzL2ltZ3MvZXJyb3ItaWNvbi5wbmdcIil9IGFsdD1cIlwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPumUmeivr+S7tjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17XCJleHBsYWluXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg5oKo55Sz6K+355qE5pS25qy+56CB6LS057q46YKu5a+E5pyJ6K+v77yM6K+m5oOF6K+35ZKo6K+iOTU1MTbvvZ5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHtkZWxpdmVyeU1zZ30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRlbGl2ZXJ5TXNnKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpb2dpc3RpY0luZm9Db250YWluXCJ9PlxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVuRG9tKGRlbGl2ZXJ5TXNnKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvSW9naXN0aWNzSW5mby9Jb2dpc3RpY3NJbmZvLmpzIiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGludm9rZSA9IHJlcXVpcmUoJy4vX2ludm9rZScpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuL19odG1sJyk7XG52YXIgY2VsID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBzZXRUYXNrID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhclRhc2sgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZCA9ICt0aGlzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0VGFzayB8fCAhY2xlYXJUYXNrKSB7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBpID0gMTtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2VzcycpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3coY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IGFhOTYzYjRjMjcxNDRmMDk0Y2NhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgRCkge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSBiNTBkODI0NTZlNTQ1ZGNjM2RkM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCBhcmdzLCB0aGF0KSB7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzXG4vLyBtb2R1bGUgaWQgPSBiNTgwYjk0YjE5NTg0MmNiZjJiMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBPYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBQcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG52YXIgaXNOb2RlID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYgKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKSBwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICBmbiA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKGlzTm9kZSkge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlciwgZXhjZXB0IGlPUyBTYWZhcmkgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIH0gZWxzZSBpZiAoT2JzZXJ2ZXIgJiYgIShnbG9iYWwubmF2aWdhdG9yICYmIGdsb2JhbC5uYXZpZ2F0b3Iuc3RhbmRhbG9uZSkpIHtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmIChQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSkge1xuICAgIC8vIFByb21pc2UucmVzb2x2ZSB3aXRob3V0IGFuIGFyZ3VtZW50IHRocm93cyBhbiBlcnJvciBpbiBMRyBXZWJPUyAyXG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICAgIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmICghaGVhZCkge1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IGJkZTBmNTdlOWI1NzlmOTQzZjg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0Jztcbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xuXG5mdW5jdGlvbiBQcm9taXNlQ2FwYWJpbGl0eShDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSBjMWI5NGUzZTk1ZWQ0MzVhZjU0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdQcm9taXNlJywgeyAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2Ygb25GaW5hbGx5ID09ICdmdW5jdGlvbic7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgfSA6IG9uRmluYWxseSxcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHRocm93IGU7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHlcbiAgKTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzXG4vLyBtb2R1bGUgaWQgPSBjMmUzNWJiZmY4MzMwOTU5NDNjMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanNcbi8vIG1vZHVsZSBpZCA9IGNiNzgzNzUyOTQ1NDJjMjRjNWJhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gZDE4MTBhZTUzMzJlMzZmZmEzYzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG5hdmlnYXRvciA9IGdsb2JhbC5uYXZpZ2F0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgfHwgJyc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdXNlci1hZ2VudC5qc1xuLy8gbW9kdWxlIGlkID0gZWM2Y2JlMzE3Yjk4NTBiMDVjZTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IGVmNTFkNDk4OWYzMDQ0YjJlYjMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzXG4vLyBtb2R1bGUgaWQgPSBmMGRiYzEwYzY4ZGQ4MTQwMTRlN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi9fdXNlci1hZ2VudCcpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4IHx8ICcnO1xudmFyICRQcm9taXNlID0gZ2xvYmFsW1BST01JU0VdO1xudmFyIGlzTm9kZSA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xudmFyIGVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIEludGVybmFsLCBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIE93blByb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlLnJlc29sdmUoMSk7XG4gICAgdmFyIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhlbXB0eSwgZW1wdHkpO1xuICAgIH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZVxuICAgICAgLy8gdjggNi42IChOb2RlIDEwIGFuZCBDaHJvbWUgNjYpIGhhdmUgYSBidWcgd2l0aCByZXNvbHZpbmcgY3VzdG9tIHRoZW5hYmxlc1xuICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9ODMwNTY1XG4gICAgICAvLyB3ZSBjYW4ndCBkZXRlY3QgaXQgc3luY2hyb25vdXNseSwgc28ganVzdCBjaGVjayB2ZXJzaW9uc1xuICAgICAgJiYgdjguaW5kZXhPZignNi42JykgIT09IDBcbiAgICAgICYmIHVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUvNjYnKSA9PT0gLTE7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbiAocHJvbWlzZSwgaXNSZWplY3QpIHtcbiAgaWYgKHByb21pc2UuX24pIHJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgb2sgPSBwcm9taXNlLl9zID09IDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbiAocmVhY3Rpb24pIHtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW4sIGV4aXRlZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgaWYgKHByb21pc2UuX2ggPT0gMikgb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhbmRsZXIgPT09IHRydWUpIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTsgLy8gbWF5IHRocm93XG4gICAgICAgICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgICAgICAgIGRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgICAgIGV4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2UpIHtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZG9tYWluICYmICFleGl0ZWQpIGRvbWFpbi5leGl0KCk7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSBydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpIG9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgdW5oYW5kbGVkID0gaXNVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgdmFyIHJlc3VsdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pIHtcbiAgICAgICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmICh1bmhhbmRsZWQgJiYgcmVzdWx0LmUpIHRocm93IHJlc3VsdC52O1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICByZXR1cm4gcHJvbWlzZS5faCAhPT0gMSAmJiAocHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jKS5sZW5ndGggPT09IDA7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpIHtcbiAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3YgfSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYgKCFwcm9taXNlLl9hKSBwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgdmFyIHRoZW47XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmICh0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0geyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgJHJlamVjdC5jYWxsKHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9hKSB0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX3MpIG5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbiAgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgICByZXR1cm4gQyA9PT0gJFByb21pc2UgfHwgQyA9PT0gV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFByb21pc2U6ICRQcm9taXNlIH0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICB2YXIgJCRyZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoTElCUkFSWSAmJiB0aGlzID09PSBXcmFwcGVyID8gJFByb21pc2UgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyICRpbmRleCA9IGluZGV4Kys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSBmYTk4N2Q4MTFlNGViMmQ0M2Q5Y1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiXSwic291cmNlUm9vdCI6IiJ9