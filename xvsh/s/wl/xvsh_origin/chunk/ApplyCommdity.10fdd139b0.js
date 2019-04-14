webpackJsonp([7],{

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

/***/ "191503b881fa5f20a4a6":
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

var _commdity = __webpack_require__("ef355b54f077dbfb1505");

var _commdity2 = _interopRequireDefault(_commdity);

var _commdity3 = __webpack_require__("214017667160a07c7691");

var _commdity4 = _interopRequireDefault(_commdity3);

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


            var key = null;
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

                    var param = void 0;
                    var search = (0, _request.getSearchParam)(_this.props.location.search);
                    if (!!search.redCodeSt && search.redCodeSt == "00" || search.redCodeSt == "02") {
                        //如果是00 或者是 02 说明来自申码页面，并且用户不在黑名单，申请红包码和收款码

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
                    } else if (!!search.redCodeSt) {
                        //如果是 01 redCodeSt 存在，说明来自申码页面，用户在黑名单或者其他状态

                        var _materielList = [{
                            materielType: "00",
                            count: "1"
                        }];
                        (0, _ApplyCommdityActions.applyMatAPI)(history, (0, _assign2.default)(storeAddr, { materielList: (0, _stringify2.default)(_materielList) }, { cityNm: city.cityCd }));
                    } else {
                        var _this$props2 = _this.props,
                            isblack = _this$props2.isblack,
                            _isApply = _this$props2.isApply;

                        if (isblack == "0" && _isApply == "1") {
                            //用户不在黑名单并且 申请过红包码，申请红包码和收款码
                            if (!!redUrlStr) {
                                var _materielList2 = [{
                                    materielType: "00",
                                    count: "1"
                                }, {
                                    materielType: "10",
                                    count: "1"
                                }];

                                (0, _ApplyCommdityActions.applyMatAPI)(history, (0, _assign2.default)(storeAddr, { materielList: (0, _stringify2.default)(_materielList2) }, { cityNm: city.cityCd }, { redUrl: (0, _stringify2.default)({ redUrl: redUrlStr }) }));
                            } else {
                                (0, _request.toast)("获取红包码地址失败");
                            }
                        } else if (isblack == "1" || _isApply == "0") {

                            //用户在黑名单或未申请红包码

                            var _materielList3 = [{
                                materielType: "00",
                                count: "1"
                            }];
                            (0, _ApplyCommdityActions.applyMatAPI)(history, (0, _assign2.default)(storeAddr, { materielList: (0, _stringify2.default)(_materielList3) }, { cityNm: city.cityCd }));
                        }
                    }
                });
            }
        };

        _this.unblock = null;

        _this.state = {
            picture: "",
            introduce: ""
        };

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
                    return "尚未申请收款码贴纸和挂牌|还未申请收款码贴纸，是否继续申请收款码贴纸，用于店铺内收款？|/s/wl/xvsh/index.html#/applyCommdity/storeInfo";
                }
            });

            var search = (0, _request.getSearchParam)(this.props.location.search);

            if (!!search.redCodeSt && search.redCodeSt == "00" || search.redCodeSt == "02") {
                //如果是00 或者是 02 说明来自申码页面，并且用户不在黑名单
                (0, _requestAPI.sharlink)();
            } else if (!search.redCodeSt) {
                //redCodeSt 不存在说明从客户端直接跳过来的页面此时需要，通过优惠组的接口决定
                (0, _requestAPI.isBlack)(function (resp) {
                    console.log('isBlack:我是真正的update函数');
                }).then(function (response) {
                    var preResp = response;
                    if (response.data.blackSt == "0") {
                        (0, _requestAPI.isApply)().then(function (response) {
                            if (response.data.applySt == "1") {
                                (0, _requestAPI.sharlink)().then(function () {
                                    // 通知update函数，success执行完毕
                                    if (!!preResp.fuc) {
                                        preResp.fuc.endOfFunc();
                                        console.log('isBlack: success函数执行完毕');
                                    }
                                });
                            } else {
                                // 通知update函数，success执行完毕
                                if (!!preResp.fuc) {
                                    preResp.fuc.endOfFunc();
                                }
                                console.log('isBlack: success函数执行完毕');
                            }
                        });
                    }
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unblock && this.unblock();
        }
    }, {
        key: 'render',
        value: function render() {
            var param = {
                picture: "",
                introduce: ""
            };
            //获取search 的参数
            var search = (0, _request.getSearchParam)(this.props.location.search);
            if (!!search.redCodeSt && search.redCodeSt == "00" || search.redCodeSt == "02") {
                //如果是00 或者是 02 说明来自申码页面，并且用户不在黑名单，申请红包码和收款码
                param = {
                    picture: _commdity4.default,
                    introduce: "推荐使用收款和红包码物料，收款安全方便，<br/>赚取红包赏金，自主免费开通更便捷，马上体验吧~"
                };
            } else if (!!search.redCodeSt) {
                //如果不是00 或者是 02，但是 redCodeSt 存在，说明来自申码页面，用户在黑名单或者其他状态
                param = {
                    picture: _commdity2.default,
                    introduce: "商户收款码贴纸可用于您的店铺收款，储蓄卡收款无需手续费，无需营业执照等相关手续，自主免费开通更便捷，马上来体验吧～"
                };
            } else {
                var _props = this.props,
                    isblack = _props.isblack,
                    _isApply2 = _props.isApply;

                if (isblack == "0" && _isApply2 == "1") {
                    //用户不在黑名单并且 申请过红包码，申请红包码和收款码
                    param = {
                        picture: _commdity4.default,
                        introduce: "推荐使用收款和红包码物料，收款安全方便，<br/>赚取红包赏金，自主免费开通更便捷，马上体验吧~"
                    };
                } else if (isblack == "1" || _isApply2 == "0") {
                    param = {
                        picture: _commdity2.default,
                        introduce: "商户收款码贴纸可用于您的店铺收款，储蓄卡收款无需手续费，无需营业执照等相关手续，自主免费开通更便捷，马上来体验吧～"
                    };
                }
            }
            return _react2.default.createElement(_ApplyCommdity2.default, (0, _extends3.default)({}, this.props, { handleClick: this.handleClick }, param));
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
        isblack: state.getIn(["blackSt"]),
        isApply: state.getIn(["applySt"]),
        storeAddr: state.getIn(["storeAddr"]).toJS(),
        isAgree: state.getIn(["isAgreeReceivablesCodeAgreement"])
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

/***/ "ec6cbe317b9850b05ce5":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e044a82d1d9b0444627b");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "ef355b54f077dbfb1505":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/imgs/commdity.3749c698de.png";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BcHBseUNvbW1kaXR5L0FwcGx5Q29tbWRpdHlDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWdzL2NvbW1kaXR5Mi5wbmciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BcHBseUNvbW1kaXR5L0FwcGx5Q29tbWRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwbHlDb21tZGl0eS9BcHBseUNvbW1kaXR5QWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwbHlDb21tZGl0eS9hcHBseUNvbW1kaXR5LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9jYWNoZVN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191c2VyLWFnZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1ncy9jb21tZGl0eS5wbmciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyJdLCJuYW1lcyI6WyJyZWNtZFJlY29yZCIsInNoYXJsaW5rIiwiaXNCbGFjayIsImlzQXBwbHkiLCJhcHBseU1jYyIsImdldENhcmRsaXN0IiwiZ2V0QWRkckxpc3QiLCJhcHBseU1hdCIsImdldFFyVXJsUmVzdCIsImdldE1jaG50QW5kQXJlYUluZiIsImdldE1jaG50RGV0YWlsIiwidXBncmFkZU1jYyIsImdldFByb3RvY29sSW5mbyIsImdldEhpc3RvcnlJbmNvbWUiLCJnZXRIaXN0b3J5VHJhbnMiLCJnZXRUb2RheUluY29tZSIsImdldFRvZGF5VHJhbnMiLCJnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtIiwiZ2V0TG9naXN0aWNzU3QiLCJnZXRVcGdyYWRlU3QiLCJnZXRMb2dpc3RpY3NMaXN0IiwiZ2V0QXVkaXRJbmZvIiwiZ2V0TGltaXRBdEluZm8iLCJtY2hudE9wZXIiLCJkZWxldGVBZGRyZXNzIiwidXBkYXRlTWNjQ2FyZCIsIm5ld0FkZHJlc3MiLCJlZGl0QWRkcmVzcyIsInNldE1jY09uT2ZmIiwiZ2V0TWNjVHJhbnNOdW0iLCJwaG9uZSIsInVuZGVmaW5lZCIsInJlY21kTW9iaWxlIiwiVXRpbCIsImJhc2U2NEVuY29kZSIsIkNPTkZJRyIsIlJFU1QiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwiU1RBVFVTQ09ERSIsIlNVQ0NFU1MiLCJyb2xsS2V5IiwiQ0FDSEVLRVkiLCJzZWNvbmRLZXkiLCJmdWxsIiwicmVzb2x2ZSIsInNoYXJlTGluayIsInJlZFVybFN0ciIsImRhdGEiLCJpZGVudGlmaWVyIiwibmV4dFN0YXRlIiwic3RvcmUiLCJkaXNwYXRjaCIsInVwZGF0ZSIsInVwZGF0ZUZ1bmMiLCJyZXNwIiwiYmxhY2tTdCIsImNvbnNvbGUiLCJsb2ciLCJjYWNoZVBhcmFtIiwiYXBwbHlTdCIsInBhcmFtIiwicmVmZXJlZVRlbCIsInZpcnR1YWxDYXJkTm8iLCJhY2NObSIsImNpdHlDZCIsImNvbW9tUGFyYW0iLCJnZXRNY2NDYXJkTGlzdCIsImNhcmRMaXN0IiwibGVuZ3RoIiwiZGVmYWx1dENhcmQiLCJiYW5rIiwiY2FyZFR5cGUiLCJmdW5jdGlvbkJpdG1hcCIsImljb25SZWxVcmwiLCJpc1N1cHBvcnQiLCJwYW4iLCJyYW5rIiwic2VsZWN0ZWQiLCJmb3JFYWNoIiwiaXRlbSIsImsiLCJzdG9yZVN0YXRlIiwic3RvcmVSZWNlaXZlQ2FyZE9iaiIsInN0YXRlIiwiYWRkcmVzc0xpc3QiLCJyZXN1bHQiLCJtYXRlcmlhbExpc3QiLCJkZWxpdk5tIiwiYWRkQWxsIiwiZGVsaXZQaG9uZSIsInByb3ZpbmNlSWQiLCJjaXR5SWQiLCJhcmVhSWQiLCJhZGRyZXNzSW5mbyIsImlkIiwiY2l0eU5tIiwicmVkVXJsIiwiZ2V0UXJVcmwiLCJtY2hudERldGFpbCIsInFyVXJsIiwicXJOdW0iLCJhcmVhIiwibWVyY2hhbnRUcCIsImFyZWFBcnIiLCJwcm92aW5jZSIsIm9uZSIsInByb0lkIiwicHJvTm0iLCJ0d28iLCJjaXR5IiwidGhyZWUiLCJ2YWx1ZSIsImNoaWxkcmVuIiwicHVzaCIsImFyZWFObSIsIm1lcmNoYW50VHBBcnIiLCJtZXJUeXBlMSIsIm1lcmNoYW50VHBDZCIsIm1lcmNoYW50VHBObSIsIm1lclR5cGUyIiwibWNobnRBbmRBcmVhSW5mIiwic3RvcmVObSIsIlN0b3JlVHAiLCJwcm92Q2QiLCJjb3V0eUNkIiwiYWRkciIsImNlcnRpZlBpYzEiLCJjZXJ0aWZQaWMyIiwiY2VydGlmUGljMyIsImxpY2Vuc2VQaWMiLCJzaG9wUGljMSIsInNob3BQaWMyIiwiYXV4UHJvdk1hdDEiLCJhdXhQcm92TWF0MiIsInNob3BMb2dvUGljIiwiVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3QiLCJyZXMiLCJoaXN0b3J5SW5jb21lT2JqIiwib3JpZ2luTGlzdERhdGEiLCJnZXRTdGF0ZSIsImdldEluIiwidG9KUyIsIm5ld0xpc3QiLCJ0cmFuc0luZm8iLCJoaXN0b3J5T3JkZXJMaXN0IiwiY29uY2F0IiwidG9kYXlJbmNvbWVPYmoiLCJ0b2RheU9yZGVyTGlzdCIsIm5ld09iaiIsImRlbGl2ZXJ5TXNnIiwibWF0RGVsaXZTdGF0dXMiLCJsaW1pdEluZm8iLCJpc1VzZU1jYyIsIm1jY1RyYW5zTnVtIiwidHJhbnNOdW0iLCJBcHBseUNvbW1kaXR5Q29udGFpbmVyIiwicHJvcHMiLCJjb250ZXh0IiwiaGFuZGxlQ2xpY2siLCJzdG9yZUFkZHIiLCJpc0FncmVlIiwiaGlzdG9yeSIsImtleSIsIm4iLCJzZWFyY2giLCJsb2NhdGlvbiIsInJlZENvZGVTdCIsIm1hdGVyaWVsTGlzdCIsIm1hdGVyaWVsVHlwZSIsImNvdW50IiwiaXNibGFjayIsInVuYmxvY2siLCJwaWN0dXJlIiwiaW50cm9kdWNlIiwiYmxvY2siLCJhY3Rpb24iLCJwcmVSZXNwIiwiZnVjIiwiZW5kT2ZGdW5jIiwiY29tbWRpdHlBbmRSZWQiLCJjb21tZGl0eSIsIkNvbXBvbmVudCIsIm1hcHN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGhUb1Byb3BzIiwiY2hhbmdlQXBwbHlDb21tZGl0eUFncmVlbWVudCIsInZhbCIsImlzQWdyZWVSZWNlaXZhYmxlc0NvZGVBZ3JlZW1lbnQiLCJBcHBseUNvbW1kaXR5IiwiYWdyZWVDbGFzcyIsInNob3dyaWdodGJ0biIsIm1hdGNoIiwicGFyYW1zIiwiX19odG1sIiwicGF0aG5hbWUiLCJyZWRpcmVjdCIsImJpbmQiLCJSZWFjdCIsImFwcGx5TWF0QVBJIiwic2V0RGVmYXVsdEFkZHIiLCJKU09OIiwicGFyc2UiLCJ1cmwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJNb2RhbCIsImFsZXJ0IiwibXNnIiwidGV4dCIsIm9uUHJlc3MiLCJpc0luaXQiLCJnZXQiLCJtZW1iZXJOYW1lIiwicmVxdWVzdCIsInNldFhpYW9XZWlQYXkiLCJ3aW5kb3ciLCJVUCIsIlciLCJBcHAiLCJFbnYiLCJyZWdQaG9uZSIsInJlZ1BheU51bSIsInZlcnNpb24iLCJzb3VyY2UiLCJiYXNlVXJsIiwiYmFzZVVybDIiLCJiYXNlVXJsMyIsImhvc3RuYW1lIiwiaW5kZXhPZiIsInByb3RvY29sIiwiZ2V0U2VydlVybCIsInNlcnZlclVybCIsInVzZXJJbmZvIiwic3BsaXQiLCJnZXRDaXR5IiwicmVzcG9uc2VGb3JtYXR0ZXIiLCJkZWxldGVTbGFzaCIsImhvc3QiLCJyZXBsYWNlIiwiYWRkU2xhc2giLCJwYXRoIiwidGVzdCIsInNlcGFyYXRlUGFyYW1zIiwicGFyYW1zTGluZSIsImNvbmZpZyIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwiZmluYWxVcmwiLCJyZWplY3QiLCJvcHRpb25zIiwidHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsIkVycm9yIiwiZGF0YVR5cGUiLCIkIiwiYWpheCIsInBhcmFtQWxsIiwiZm9yQ2hzcCIsImVuY3J5cHQiLCJjYWNoZSIsImJ5QWpheCIsInBvc3QiLCJwdXQiLCJkZWwiLCJnZXRTZWFyY2hQYXJhbSIsInN0ciIsInNsaWNlIiwiYXJyYXkiLCJvYmoiLCJzdWMiLCJlcnIiLCJhcHAiLCJzZXRYaWFvV2VpQXVkaW8iLCJnZXRYaWFvV2VpQXVkaW8iLCJ0b2FzdCIsIm1zIiwiVG9hc3QiLCJpbmZvIiwiYmVmb3JlRW50ZXJSb3V0ZXIiLCJ0aXRsZSIsInJpZ2h0QmFyIiwicmlnaHRDYWxsYmFjayIsInJpZ2h0QmFySW1nIiwiZG9jdW1lbnQiLCJvblBsdWdpblJlYWR5Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwic2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uIiwibWNjU3RhdGVDaGFuZ2VkIiwic2VuZFFyQ29kZSIsImZhaWwiLCJzY2FuUVJDb2RlIiwiY2xvc2VXZWJWaWV3IiwidmVyaWZ5UGF5UHdkIiwiY3JlYXRlV2ViVmlldyIsImlzRmluaXNoIiwiZ2V0VXNlckRldGFpbEluZm8iLCJzYXZlUWNvZGUiLCJjYW52YXMiLCJ1aSIsIlVJIiwicGljVXJsIiwidG9EYXRhVVJMIiwibG9nRXZlbnQiLCJzYXZlUGljVG9Mb2NhbCIsInN1YnN0ciIsInNob3dUb2FzdFdpdGhQaWMiLCJzaG93QWxlcnQiLCJlbnYiLCJpc0lPUyIsIm9wZW5Ccm93c2VyIiwic2hvd1RvYXN0Iiwic2hhcmUiLCJkZXNjIiwiaW1nVVJMIiwicGFnZVVSbCIsInNob3dTaGFyZVBhbmVsIiwic2hhcmVVcmwiLCJnZXRDdXJyZW50TG9jYXRpb25JbmZvIiwiY2FsbGJhY2syIiwic2hvd0xvYWRpbmciLCJjYWxsYmFjayIsImRpc21pc3MiLCJzZW5kTWVzc2FnZSIsImNtZCIsImZldGNoTmF0aXZlRGF0YSIsInhociIsImNyZWF0ZVRleHRDYW52YXNlIiwiY29sb3IiLCJsb25nIiwic2hvdCIsInJlbTJweCIsImNXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0Iiwic2V0QXR0cmlidXRlIiwid2lkdGgiLCJyb3RhdGUiLCJNYXRoIiwiUEkiLCJmaWxsU3R5bGUiLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsImZvbnQiLCJtZWFzdXJlVGV4dCIsImZpbGxUZXh0IiwiY3JlYXRlQ29udmFzQW5kU2F2ZVBob3RvIiwiY2FudmFzT2JqIiwiYmd1cmwiLCJxcmNvZGVVUkwiLCJxcmNvZGVXZEFuZEhnIiwieFdpZHRoIiwieUhlaWdodCIsInRleHRiZ1VSTCIsInhUZXh0V2lkdGgiLCJ5VGV4dEhlaWdodCIsImltZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwiaGVpZ2h0IiwiZHJhd0ltYWdlIiwidGV4dFVyaSIsInRleHRJbWciLCJxcmNvZGVXaWR0aEFuZEhlaWdodCIsImlubmVySFRNTCIsInFyY29kZSIsIlFSQ29kZSIsImNvcnJlY3RMZXZlbCIsIkNvcnJlY3RMZXZlbCIsIkwiLCJxcmNvZGVJbWciLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInFyY29kZUR4IiwicXJjb2RlRHkiLCJnZXRNYXRlcmllbEluZm9MaXN0IiwiZ2V0UmV3YXJkTGlzdCIsIkNPTlNUX0RBVEEiLCJpbWdlU2l6ZSIsImNhY2hlRmlyc3QiLCJ0aW1lIiwic3RvcmFnZSIsInZhbGlkYXRlVGltZSIsImNhY2hlRmlyc3RTdG9yYWdlIiwibmVlZFN3Iiwic3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlIiwicmVmcmVzaERvbUZ1bmMiLCJyZXEiLCJkYXRhRnJvbUNhY2hlIiwiZ2V0RnJvbVN0b3JhZ2UiLCJyZW1vdmVTdG9yYWdlIiwiaXNTYW1lQXRBbGwiLCJJbW11dGFibGUiLCJpcyIsImZyb21KUyIsImFzeW5jIiwiZW5kT2ZTeW5jRnVuYyIsInJlbW92ZUNhY2hlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQVdnQkEsVyxHQUFBQSxXO1FBeUJBQyxRLEdBQUFBLFE7UUFpQkFDLE8sR0FBQUEsTztRQXVCQUMsTyxHQUFBQSxPO1FBb0JBQyxRLEdBQUFBLFE7UUEwQkFDLFcsR0FBQUEsVztRQWdEQUMsVyxHQUFBQSxXO1FBZ0NBQyxRLEdBQUFBLFE7UUFvQkFDLFksR0FBQUEsWTtRQW1CQUMsa0IsR0FBQUEsa0I7UUFtSEFDLGMsR0FBQUEsYztRQWdCQUMsVSxHQUFBQSxVO1FBZ0NBQyxlLEdBQUFBLGU7UUFlQUMsZ0IsR0FBQUEsZ0I7UUFlQUMsZSxHQUFBQSxlO1FBaUJBQyxjLEdBQUFBLGM7UUFlQUMsYSxHQUFBQSxhO1FBZ0JBQyx5QixHQUFBQSx5QjtRQU1BQyxj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Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNPLElBQU10QyxvQkFBTSxTQUFOQSxHQUFN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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6ImNodW5rL0FwcGx5Q29tbWRpdHkuMTBmZGQxMzliMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y29tb21QYXJhbSwgZ2V0LCBwb3N0LCBVdGlsfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7fSBmcm9tIFwiLi9jYWNoZVN0b3JhZ2VcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gXCIuLi8uLi9zdG9yZS9zdG9yZVwiO1xyXG5pbXBvcnQge1VQREFURV9TVE9SRV9TVEFURX0gZnJvbSBcIi4uLy4uL3N0b3JlL2FjdGlvblwiO1xyXG5pbXBvcnQge2NhY2hlRmlyc3QsY2FjaGVGaXJzdFN0b3JhZ2Usc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlLHJlbW92ZUNhY2hlfSBmcm9tIFwiLi9jYWNoZVN0b3JhZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiDnlLPor7fnuqLljIXnoIHnmoTor7fmsYJcclxuICogQHBhcmFtIHBob25lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVjbWRSZWNvcmQocGhvbmUpIHtcclxuICAgIGlmIChwaG9uZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBwaG9uZSA9IFwiXCJcclxuICAgIH1cclxuICAgIGxldCByZWNtZE1vYmlsZSA9IFV0aWwuYmFzZTY0RW5jb2RlKHBob25lKVxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QucmVjbWRSZWNvcmQsIHtyZWNtZE1vYmlsZX0pLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpueUs+ivt+e6ouWMheeggeaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXlcclxuICAgICAgICAgICAgfSwoKT0+e30sKCk9PntcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDor7fmsYLnuqLljIXlkJfov57mjqVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFybGluaygpIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnNoYXJlTGluaywge30pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICBsZXQgcmVkVXJsU3RyPSBcImh0dHBzOi8vd2FsbGV0Ljk1NTE2LmNvbS9zL3dsL3dlYlYzL2FjdGl2aXR5L3ZNYXJrZXRpbmcyL2h0bWwvc25zSW5kZXguaHRtbD9yPVwiICsgcmVzcG9uc2UuZGF0YS5pZGVudGlmaWVyO1xyXG4gICAgICAgICAgICBsZXQgbmV4dFN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgcmVkVXJsU3RyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKG5leHRTdGF0ZSkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVkVXJsU3RyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOaYr+WQpuWcqOeZveWQjeWNleeahOivt+axglxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQmxhY2sodXBkYXRlKSB7XHJcbiAgICBsZXQgdXBkYXRlRnVuYyA9IGZ1bmN0aW9uKHJlc3Ape1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGJsYWNrU3Q6cmVzcC5kYXRhLmJsYWNrU3RcclxuICAgICAgICB9KSlcclxuICAgICAgICBjb25zb2xlLmxvZygnaXNCbGFjazogdXBkYXRl5Ye95pWw5omn6KGM5a6M5q+VJyk7XHJcbiAgICAgICAgaWYoIHR5cGVvZiB1cGRhdGUgPT09ICdmdW5jdGlvbicgKXtcclxuICAgICAgICAgICAgdXBkYXRlKHJlc3ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v6K+75Y+W57yT5a2Y77yM5ZCM5pe25byC5q2l5Y+R6YCB6K+35rGCXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5pc0JsYWNrLHt9LHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSh1cGRhdGVGdW5jKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYmxhY2tTdDpyZXNwb25zZS5kYXRhLmJsYWNrU3RcclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKblnKjpu5HlkI3ljZXnmoTor7fmsYJcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNBcHBseSgpIHtcclxuICAgIGxldCBjYWNoZVBhcmFtID0gY2FjaGVGaXJzdFN0b3JhZ2UoMzAqNjAqMTAwMCxDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXkpOy8v57yT5a2YMzDliIbpkp9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuaXNBcHBseSwge30sY2FjaGVQYXJhbSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5hcHBseVN0ICE9IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDlpoLmnpzlt7Lnu4/nlLPor7fov4fnuqLljIXnoIHliJnnvJPlrZgzMOWIhumSn++8jOWQpuWImeS4jee8k+WtmFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5KVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBhcHBseVN0OnJlc3BvbnNlLmRhdGEuYXBwbHlTdFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOeUs+ivt+aUtuasvueggVxyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNY2MocGFyYW0gPSB7XHJcbiAgICByZWZlcmVlVGVsOiBcIlwiLCAgICAgICAgIC8v5o6o6I2Q5Lq65omL5py65Y+3XHJcbiAgICB2aXJ0dWFsQ2FyZE5vOiBcIlwiLCAgICAgIC8v6Jma5ouf5Y2h5Y+3XHJcbiAgICBhY2NObTogXCJcIiwgICAgICAgICAgICAgIC8v5bqX6ZO65ZCN56ewXHJcbiAgICBjaXR5Q2Q6IFwiXCIgICAgICAgICAgICAgICAvL+WfjuW4guS7o+eggVxyXG59KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5hcHBseU1jYywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpueUs+ivt+e6ouWMheeggeaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXlcclxuICAgICAgICAgICAgfSwoKT0+e30sKCk9PntcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTpk7booYzljaHliJfooahcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDYXJkbGlzdCgpIHtcclxuICAgIC8v6I635Y+W55So5oi36ZO26KGM5Y2h5YiX6KGo77yM57yT5a2YMeWIhumSn1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRNY2NDYXJkTGlzdCwgY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSg2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAvL+WmguaenOWQjuWPsOi/lOWbnumTtuihjOWNoeWIl+ihqOS4lOS4jeS4uuepulxyXG4gICAgICAgIGlmICghIXJlc3BvbnNlLmRhdGEuY2FyZExpc3QgJiYgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5sZW5ndGggIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgLy/liJ3lp4vljJbpu5jorqTljaFcclxuICAgICAgICAgICAgbGV0IGRlZmFsdXRDYXJkID0ge1xyXG4gICAgICAgICAgICAgICAgYmFuazogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeaJgOWcqOeahOmTtuihjFxyXG4gICAgICAgICAgICAgICAgY2FyZFR5cGU6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h57G75Z6LXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbkJpdG1hcDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHlip/og73kvY1cclxuICAgICAgICAgICAgICAgIGljb25SZWxVcmw6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeeahGxvZ2/lnLDlnYBcclxuICAgICAgICAgICAgICAgIGlzU3VwcG9ydDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5pSv5oyBXHJcbiAgICAgICAgICAgICAgICBwYW46IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W4puacieaOqeeggeeahOWNoeWPt1xyXG4gICAgICAgICAgICAgICAgcmFuazogMCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm6YCJ5LitXHJcbiAgICAgICAgICAgICAgICB2aXJ0dWFsQ2FyZE5vOiBcIlwiICAgLy/omZrmi5/ljaHlj7dcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuY2FyZExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhaXRlbS5zZWxlY3RlZCAmJiBpdGVtLmlzU3VwcG9ydCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYWx1dENhcmQgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL+WmguaenOayoeaciem7mOiupOmAieS4reeahOWNoeWPluS4gOS4quS4jeiiq+e9ruS4uueBsOeahOWNoeS4uum7mOiupOWNoVxyXG4gICAgICAgICAgICBpZiAoZGVmYWx1dENhcmQuYmFuay5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZXNwb25zZS5kYXRhLmNhcmRMaXN0Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuY2FyZExpc3Rba10uaXNTdXBwb3J0ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYWx1dENhcmQgPSByZXNwb25zZS5kYXRhLmNhcmRMaXN0W2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0b3JlU3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yZVJlY2VpdmVDYXJkT2JqOiBkZWZhbHV0Q2FyZCxcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0OiByZXNwb25zZS5kYXRhLmNhcmRMaXN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHN0b3JlU3RhdGUpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWcsOWdgOWIl+ihqFxyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWRkckxpc3QoXHJcbiAgICB1cGRhdGUsIC8v57yT5a2Y55qE5pu05paw5Ye95pWwXHJcbiAgICBwYXJhbSA9IHtcclxuICAgICAgICBzdGF0ZTogXCJcIiAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuKSB7XHJcbiAgICAvLyDor7vlj5bnvJPlrZjvvIzlkIzml7blvILmraXlj5HpgIHor7fmsYJcclxuICAgIGxldCB1cGRhdGVGdW5jID0gZnVuY3Rpb24ocmVzcCl7XHJcbiAgICAgICAgLy8g5ZyodXBkYXRl5Ye95pWw5Lit77yM5pu05pawcmVkdXjkuK3nmoRhZGRyZXNzTGlzdFxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7YWRkcmVzc0xpc3Q6cmVzcC5kYXRhLnJlc3VsdHx8W119KSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEFkZHJMaXN0OiB1cGRhdGXlh73mlbDmiafooYzlrozmr5UnKTtcclxuICAgICAgICBpZiggdHlwZW9mIHVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXNwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSh1cGRhdGVGdW5jLENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpO1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0QWRkckxpc3QsIE9iamVjdC5hc3NpZ24oe30sIGNvbW9tUGFyYW0sIHBhcmFtKSxjYWNoZVBhcmFtKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgYWRkcmVzc0xpc3QgPSByZXNwb25zZS5kYXRhLnJlc3VsdCB8fCBbXTtcclxuXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYWRkcmVzc0xpc3RcclxuICAgICAgICB9KSlcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnlLPor7fnianmlpnmjqXlj6NcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWF0KHBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+eJqeaWmeWIl+ihqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2Tm06IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+S6ulxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEFsbDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWMuuWQjeensFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2UGhvbmU6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+eUteivnVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ecgUlEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5biCSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDljLpJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3NJbmZvOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ivpue7huWcsOWdgFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnJywgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWdgOeahElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eU5tOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5omA5Zyo5Z+O5biCQ2l0eUNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRVcmw6IFwiXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nuqLljIXnoIHlnLDlnYAgIOWPr+mAieWPguaVsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuYXBwbHlNYXQsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5ZWG5oi35pS25qy+56CB5Zyw5Z2A5ZKM5ZWG5oi357yW5Y+3XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXJVcmxSZXN0KCkge1xyXG4gICAgLy/nvJPlrZgy5bCP5pe2XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFFyVXJsLCBjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBtY2hudERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgcXJVcmw6IHJlc3BvbnNlLmRhdGEucXJVcmwsXHJcbiAgICAgICAgICAgICAgICBxck51bTogcmVzcG9uc2UuZGF0YS5xck51bVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKuiOt+WPluW6l+mTuuWMuuWfn+WIl+ihqOWSjOW6l+mTuuexu+Wei+WIl+ihqFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNobnRBbmRBcmVhSW5mKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+Z5Liq5o6l5Y+jLOWPqui1sHN377yM5LiN6LWwbG9hY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICAvLyBsZXQgY2FjaGVQYXJhbSA9IHtcclxuICAgIC8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4gICAgLy8gICAgIGZvckNoc3A6ZmFsc2UsXHJcbiAgICAvLyAgICAgZW5jcnlwdDpmYWxzZSxcclxuICAgIC8vICAgICBjYWNoZTogdHJ1ZVxyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRNY2hudEFuZEFyZWFJbmYsIGNvbW9tUGFyYW0sIGNhY2hlRmlyc3QoMjQqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgbGV0IGFyZWEgPSBbXSwgbWVyY2hhbnRUcCA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOecgee6p1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5hcmVhQXJyLmZvckVhY2goKHByb3ZpbmNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9uZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHByb3ZpbmNlLnByb0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogcHJvdmluY2UucHJvTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHByb3ZpbmNlLnByb05tID09IFwi5YyX5Lqs5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLkuIrmtbfluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIuWkqea0peW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi6YeN5bqG5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLmt7HlnLPluIJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogcHJvdmluY2UucHJvSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogcHJvdmluY2UucHJvTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlLmNpdHkuZm9yRWFjaCgoY2l0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhyZWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGNpdHkuY2l0eUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBjaXR5LmNpdHlObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhyZWUudmFsdWUgIT0gdHdvLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d28uY2hpbGRyZW4ucHVzaCh0aHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgKiDluILnuqdcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBwcm92aW5jZS5jaXR5LmZvckVhY2goKGNpdHkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGNpdHkuY2l0eUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBjaXR5LmNpdHlObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIOWMuue6p1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5hcmVhLmZvckVhY2goKGFyZWEpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhyZWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBhcmVhLmFyZWFJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IGFyZWEuYXJlYU5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d28uY2hpbGRyZW4ucHVzaCh0aHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYXJlYS5wdXNoKG9uZSk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLm1lcmNoYW50VHBBcnIuZm9yRWFjaCgobWVyVHlwZTEpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvbmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtZXJUeXBlMS5tZXJjaGFudFRwQ2QsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBtZXJUeXBlMS5tZXJjaGFudFRwTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1lclR5cGUxLm1lcmNoYW50VHBBcnIuZm9yRWFjaCgobWVyVHlwZTIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IG1lclR5cGUyLm1lcmNoYW50VHBDZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBtZXJUeXBlMi5tZXJjaGFudFRwTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIG1lcmNoYW50VHAucHVzaChvbmUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV4dFN0YXRlID0ge1xyXG4gICAgICAgICAgICBtY2hudEFuZEFyZWFJbmY6IHtcclxuICAgICAgICAgICAgICAgIGFyZWFBcnI6IGFyZWEsXHJcbiAgICAgICAgICAgICAgICBtZXJjaGFudFRwQXJyOiBtZXJjaGFudFRwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKG5leHRTdGF0ZSkpXHJcblxyXG4gICAgfSlcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5blupfpk7ror6bmg4Xkv6Hmga9cclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNobnREZXRhaWwoKSB7XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IGNhY2hlRmlyc3RTdG9yYWdlKDYwKjEwMDAsQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7Ly/nvJPlrZgx5YiG6ZKfXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRNY2hudERldGFpbCwgY29tb21QYXJhbSxjYWNoZVBhcmFtKS50aGVuKChyZXNwKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3Auc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgbGV0IG1jaG50RGV0YWlsID0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe21jaG50RGV0YWlsfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1jaG50RGV0YWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5Y2H57qn5ZWG6ZO65LqM57u056CBXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGdyYWRlTWNjKHBhcmFtPXtcclxuICAgIHN0b3JlTm06IFwiXCIsICAgIC8v5bqX6ZO65ZCN56ewXHJcbiAgICBTdG9yZVRwOiBcIlwiLCAgICAvL+W6l+mTuuexu+Wei1xyXG4gICAgcHJvdkNkOiBcIlwiLCAgICAgLy/nnIFJRFxyXG4gICAgY2l0eUNkOiBcIlwiLCAgICAgLy/luIJJRFxyXG4gICAgY291dHlDZDogXCJcIiwgICAgLy/ljLpJRFxyXG4gICAgYWRkcjogXCJcIiwgICAgICAgLy/lnLDlnYBcclxuICAgIGNlcnRpZlBpYzE6IFwiXCIsIC8v6Lqr5Lu96K+B5q2j6Z2i54WnXHJcbiAgICBjZXJ0aWZQaWMyOiBcIlwiLCAvL+i6q+S7veivgeWPjemdoueFp1xyXG4gICAgY2VydGlmUGljMzogXCJcIiwgLy/miYvmjIHouqvku73or4HnhafniYdcclxuICAgIGxpY2Vuc2VQaWM6IFwiXCIsIC8v6JCl5Lia5omn54WnXHJcbiAgICBzaG9wUGljMTogXCJcIiwgICAvL+W6l+mTuueFp+eJhzFcclxuICAgIHNob3BQaWMyOiBcIlwiLCAgIC8v5bqX6ZO654Wn54mHMlxyXG4gICAgYXV4UHJvdk1hdDE6IFwiXCIsLy/ovoXliqnnhafniYcxXHJcbiAgICBhdXhQcm92TWF0MjogXCJcIiwvL+i+heWKqeeFp+eJhzJcclxuICAgIHNob3BMb2dvUGljOiBcIlwiIC8v5bqX6ZO6TE9HT1xyXG59KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC51cGdyYWRlTWNjLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk5bqX6ZO66K+m5oOF55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpO1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpuWNh+e6p+eahOaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Qucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0LnNlY29uZEtleSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTljY/orq7nvJblj7flkozljY/orq7lkI3np7BcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvdG9jb2xJbmZvKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiDov5nkuKrmjqXlj6Ms57yT5a2YMuWwj+aXtlxyXG4gICAgICovXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFByb3RvY29sSW5mbywgY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZS5kYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDljoblj7LmlLbmrL5cclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlzdG9yeUluY29tZShwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0SGlzdG9yeUluY29tZSwgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeUluY29tZU9iajogcmVzLmRhdGFcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5Y6G5Y+y6K6i5Y2VXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpc3RvcnlUcmFucyhwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0SGlzdG9yeVRyYW5zLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBsZXQgb3JpZ2luTGlzdERhdGEgPSBzdG9yZS5nZXRTdGF0ZSgpLmdldEluKFsnaGlzdG9yeU9yZGVyTGlzdCddKS50b0pTKClcclxuICAgICAgICAgICAgbGV0IG5ld0xpc3QgPSByZXMuZGF0YS50cmFuc0luZm87XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0xpc3QpXHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5T3JkZXJMaXN0OiBvcmlnaW5MaXN0RGF0YS5jb25jYXQobmV3TGlzdClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5LuK5pel5pS25qy+XHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5SW5jb21lKCkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VG9kYXlJbmNvbWUsY29tb21QYXJhbSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgdG9kYXlJbmNvbWVPYmo6IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDku4rml6XorqLljZVcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9kYXlUcmFucyhwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VG9kYXlUcmFucywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgbGV0IG9yaWdpbkxpc3REYXRhID0gc3RvcmUuZ2V0U3RhdGUoKS5nZXRJbihbJ3RvZGF5T3JkZXJMaXN0J10pLnRvSlMoKVxyXG4gICAgICAgICAgICBsZXQgbmV3TGlzdCA9IHJlcy5kYXRhLnRyYW5zSW5mbztcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIHRvZGF5T3JkZXJMaXN0OiBvcmlnaW5MaXN0RGF0YS5jb25jYXQobmV3TGlzdClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5Y2V56yU5p+l6K+iXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0ocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0sT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSlcclxufVxyXG4vKipcclxuICog6I635Y+W54mp5rWB5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naXN0aWNzU3QocGFyYW0pe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRMb2dpc3RpY3NTdCwgT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICBsZXQgbmV3T2JqID0gcmVzLmRhdGEuZGVsaXZlcnlNc2c7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBuZXdPYmoubWF0RGVsaXZTdGF0dXMg55qE54q25oCB5ZKMcmVkdXjnmoRzdG9yZeS/neaMgeS4gOiHtFxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIG5ld09iai5tYXREZWxpdlN0YXR1cyA9IHJlcy5kYXRhLm1hdERlbGl2U3RhdHVzO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgZGVsaXZlcnlNc2c6IG5ld09ialxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDllYbmiLfmnI3liqHpppbpobUg54K55Ye75L+h55So5Y2h5oyJ6ZKu5p+l6K+i5ZWG5oi35piv5ZCm5byA6YCa6L+H5L+h55So5Y2h5pS25qy+XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXBncmFkZVN0KCl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFVwZ3JhZGVTdCwgY29tb21QYXJhbSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnianmlpnljoblj7LorqLljZVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpc3RpY3NMaXN0KHBhcmFtKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TG9naXN0aWNzTGlzdCxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5p+l6K+i5L+h55So5Y2h5pS25qy+5Y2H57qn54q25oCBXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXVkaXRJbmZvKCl7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRBdWRpdEluZm8sIGNvbW9tUGFyYW0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bmlLbmrL7pmZDpop3or6bmg4VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW1pdEF0SW5mbygpe1xyXG4gICAgLy/nvJPlrZgy5Liq5bCP5pe2XHJcbiAgICBwb3N0KENPTkZJRy5SRVNULmdldExpbWl0QXRJbmZvLGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcCk9PntcclxuICAgICAgICBpZiggcmVzcC5zdGF0dXNDb2RlID0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyApe1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe2xpbWl0SW5mbzpyZXNwLmRhdGF9KSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5pu05paw5bqX6ZO66K+m5oOFXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g5bqX6ZO66K+m5oOF5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWNobnRPcGVyKHBhcmFtID17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBncmFkZU1jYyAsIE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpG1jaG50RGV0YWls57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7IFxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKDpmaTlnLDlnYDkv6Hmga9cclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVBZGRyZXNzKHBhcmFtPXtcclxuICAgIGlkOicnIC8v5Zyw5Z2AaWRcclxufSl7XHJcbiAgICBcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmRlbGV0ZUFkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBhcmFtKTtcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5pu05paw5pS25qy+6ZO26KGM5Y2hXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWNjQ2FyZChwYXJhbT17XHJcbiAgICB2aXJ0dWFsQ2FyZE5vOicnIC8v6Jma5ouf5Y2h5Y+3XHJcbn0pIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBkYXRlTWNjQ2FyZCxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/mjaLljaHlkI7vvIzmuIXpmaTlupfpk7ror6bmg4XnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7IFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmlrDlop7lnLDlnYBcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor6bnu4bnmoTlnLDlnYDkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdBZGRyZXNzKHBhcmFtPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5uZXdBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1Mpe1xyXG4gICAgICAgICAgICAvLyDliKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOS/ruaUueWcsOWdgOS/oeaBr1xyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivpue7hueahOWcsOWdgOS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRBZGRyZXNzKHBhcmFtPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5lZGl0QWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgLy/liKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDlkK/lgZzmlLbmrL7noIHmnI3liqFcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNY2NPbk9mZihwYXJhbT17XHJcbiAgICBpc1VzZU1jYzonJyAgLy/mmK/lkKbkvb/nlKjmlLbmrL7noIHmnI3liqFcclxuIH0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnNldE1jY09uT2ZmLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpOW6l+mTuuivpuaDhee8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOyBcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDojrflj5blkIrotbfmlK/ku5jmjqfku7bnmoRUTuWPt1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jY1RyYW5zTnVtKCl7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRNY2NUcmFuc051bSkudGhlbigocmVzcCk9PntcclxuICAgICAgICBpZiggcmVzcC5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MgKXtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7bWNjVHJhbnNOdW06cmVzcC5kYXRhLnRyYW5zTnVtfSlcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJLmpzIiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgc2FmZSkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgaWYgKHNhZmUgJiYgdGFyZ2V0W2tleV0pIHRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNGRjMWY3ZWJkODBkMTViZmQzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjc5ODUxYmUyN2IyNjhlYTI0ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7c2V0RGVmYXVsdEFkZHIsIGFwcGx5TWF0QVBJfSBmcm9tIFwiLi9BcHBseUNvbW1kaXR5QWN0aW9uc1wiO1xyXG5pbXBvcnQgQXBwbHlDb21tZGl0eSBmcm9tIFwiLi9BcHBseUNvbW1kaXR5XCJcclxuaW1wb3J0IHtiZWZvcmVFbnRlclJvdXRlciwgZ2V0Q3VycmVudExvY2F0aW9uSW5mbywgZ2V0U2VhcmNoUGFyYW0sIHRvYXN0fSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdFwiO1xyXG5pbXBvcnQge1VQREFURV9TVE9SRV9TVEFURX0gZnJvbSBcIi4uLy4uL3N0b3JlL2FjdGlvblwiO1xyXG5pbXBvcnQgY29tbWRpdHkgZnJvbSBcIi4uLy4uL2Fzc2V0cy9pbWdzL2NvbW1kaXR5LnBuZ1wiXHJcblxyXG5pbXBvcnQgY29tbWRpdHlBbmRSZWQgZnJvbSBcIi4uLy4uL2Fzc2V0cy9pbWdzL2NvbW1kaXR5Mi5wbmdcIlxyXG5pbXBvcnQge2lzQXBwbHksIGlzQmxhY2ssIHNoYXJsaW5rfSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdEFQSVwiO1xyXG5cclxuXHJcbmNsYXNzIEFwcGx5Q29tbWRpdHlDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpXHJcbiAgICAgICAgdGhpcy51bmJsb2NrID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcGljdHVyZTogXCJcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIlwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBiZWZvcmVFbnRlclJvdXRlcign55Sz6K+35pS25qy+56CB54mp5paZJyk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u6buY6K6k5Zyw5Z2AXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0RGVmYXVsdEFkZHIoKTtcclxuXHJcbiAgICAgICAgLy/mjqfliLbot6/nlLFcclxuICAgICAgICB0aGlzLnVuYmxvY2sgPSB0aGlzLnByb3BzLmhpc3RvcnkuYmxvY2soKGxvY2F0aW9uLCBhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSBcIlBPUFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLlsJrmnKrnlLPor7fmlLbmrL7noIHotLTnurjlkozmjILniYx86L+Y5pyq55Sz6K+35pS25qy+56CB6LS057q477yM5piv5ZCm57un57ut55Sz6K+35pS25qy+56CB6LS057q477yM55So5LqO5bqX6ZO65YaF5pS25qy+77yffC9zL3dsL3h2c2gvaW5kZXguaHRtbCMvYXBwbHlDb21tZGl0eS9zdG9yZUluZm9cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIGxldCBzZWFyY2ggPSBnZXRTZWFyY2hQYXJhbSh0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaCk7XHJcblxyXG5cclxuICAgICAgICBpZiAoISFzZWFyY2gucmVkQ29kZVN0ICYmIHNlYXJjaC5yZWRDb2RlU3QgPT0gXCIwMFwiIHx8IHNlYXJjaC5yZWRDb2RlU3QgPT0gXCIwMlwiKSB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pivMDAg5oiW6ICF5pivIDAyIOivtOaYjuadpeiHqueUs+eggemhtemdou+8jOW5tuS4lOeUqOaIt+S4jeWcqOm7keWQjeWNlVxyXG4gICAgICAgICAgICBzaGFybGluaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghc2VhcmNoLnJlZENvZGVTdCkge1xyXG4gICAgICAgICAgICAvL3JlZENvZGVTdCDkuI3lrZjlnKjor7TmmI7ku47lrqLmiLfnq6/nm7TmjqXot7Pov4fmnaXnmoTpobXpnaLmraTml7bpnIDopoHvvIzpgJrov4fkvJjmg6Dnu4TnmoTmjqXlj6PlhrPlrppcclxuICAgICAgICAgICAgaXNCbGFjaygocmVzcCk9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpc0JsYWNrOuaIkeaYr+ecn+ato+eahHVwZGF0ZeWHveaVsCcpXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJlUmVzcCA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuYmxhY2tTdCA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQXBwbHkoKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5hcHBseVN0ID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFybGluaygpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpgJrnn6V1cGRhdGXlh73mlbDvvIxzdWNjZXNz5omn6KGM5a6M5q+VXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoICEhcHJlUmVzcC5mdWMgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlUmVzcC5mdWMuZW5kT2ZGdW5jKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpc0JsYWNrOiBzdWNjZXNz5Ye95pWw5omn6KGM5a6M5q+VJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmAmuefpXVwZGF0ZeWHveaVsO+8jHN1Y2Nlc3PmiafooYzlrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCAhIXByZVJlc3AuZnVjICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlUmVzcC5mdWMuZW5kT2ZGdW5jKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaXNCbGFjazogc3VjY2Vzc+WHveaVsOaJp+ihjOWujOavlScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy51bmJsb2NrICYmIHRoaXMudW5ibG9jaygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBoYW5kbGVDbGljayA9ICgpID0+IHtcclxuICAgICAgICBsZXQge3N0b3JlQWRkciwgaXNBZ3JlZSwgaGlzdG9yeSxyZWRVcmxTdHJ9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgbGV0IGtleSA9IG51bGw7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoc3RvcmVBZGRyKS5mb3JFYWNoKChuKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdG9yZUFkZHJbbl0ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGtleSA9IG47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCEha2V5KSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi5oKo55qE5Zyw5Z2A5b2T5Lit57y65bCR5b+F6KaB5pWw5o2uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghaXNBZ3JlZSkge1xyXG4gICAgICAgICAgICB0b2FzdChcIuWmguaenOaCqOW3sumYheivu+OAiuaUtuasvueggeacjeWKoeS9v+eUqOadoeasvuOAi+W5tuWQjOaEj++8jOivt+WLvumAieWug1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGdldEN1cnJlbnRMb2NhdGlvbkluZm8oKGNpdHkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW0gO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaCA9IGdldFNlYXJjaFBhcmFtKHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoKTtcclxuICAgICAgICAgICAgICAgIGlmICghIXNlYXJjaC5yZWRDb2RlU3QgJiYgc2VhcmNoLnJlZENvZGVTdCA9PSBcIjAwXCIgfHwgc2VhcmNoLnJlZENvZGVTdCA9PSBcIjAyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOaYrzAwIOaIluiAheaYryAwMiDor7TmmI7mnaXoh6rnlLPnoIHpobXpnaLvvIzlubbkuJTnlKjmiLfkuI3lnKjpu5HlkI3ljZXvvIznlLPor7fnuqLljIXnoIHlkozmlLbmrL7noIFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhcmVkVXJsU3RyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXRlcmllbExpc3QgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpZWxUeXBlOiBcIjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogXCIxXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpZWxUeXBlOiBcIjEwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogXCIxXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseU1hdEFQSShoaXN0b3J5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzdG9yZUFkZHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21hdGVyaWVsTGlzdDogSlNPTi5zdHJpbmdpZnkobWF0ZXJpZWxMaXN0KX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NpdHlObTogY2l0eS5jaXR5Q2R9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWRVcmw6IEpTT04uc3RyaW5naWZ5KHtyZWRVcmw6IHJlZFVybFN0cn0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLojrflj5bnuqLljIXnoIHlnLDlnYDlpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCEhc2VhcmNoLnJlZENvZGVTdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5pivIDAxIHJlZENvZGVTdCDlrZjlnKjvvIzor7TmmI7mnaXoh6rnlLPnoIHpobXpnaLvvIznlKjmiLflnKjpu5HlkI3ljZXmiJbogIXlhbbku5bnirbmgIFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdGVyaWVsTGlzdCA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWVsVHlwZTogXCIwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogXCIxXCJcclxuICAgICAgICAgICAgICAgICAgICB9XTtcclxuICAgICAgICAgICAgICAgICAgICBhcHBseU1hdEFQSShoaXN0b3J5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHN0b3JlQWRkcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttYXRlcmllbExpc3Q6IEpTT04uc3RyaW5naWZ5KG1hdGVyaWVsTGlzdCl9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NpdHlObTogY2l0eS5jaXR5Q2R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHtpc2JsYWNrLCBpc0FwcGx5fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzYmxhY2sgPT0gXCIwXCIgJiYgaXNBcHBseSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eUqOaIt+S4jeWcqOm7keWQjeWNleW5tuS4lCDnlLPor7fov4fnuqLljIXnoIHvvIznlLPor7fnuqLljIXnoIHlkozmlLbmrL7noIFcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhcmVkVXJsU3RyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWF0ZXJpZWxMaXN0ID0gW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmllbFR5cGU6IFwiMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogXCIxXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmllbFR5cGU6IFwiMTBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogXCIxXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5TWF0QVBJKGhpc3RvcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzdG9yZUFkZHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttYXRlcmllbExpc3Q6IEpTT04uc3RyaW5naWZ5KG1hdGVyaWVsTGlzdCl9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2l0eU5tOiBjaXR5LmNpdHlDZH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWRVcmw6IEpTT04uc3RyaW5naWZ5KHtyZWRVcmw6IHJlZFVybFN0cn0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuiOt+WPlue6ouWMheeggeWcsOWdgOWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzYmxhY2sgPT0gXCIxXCIgfHwgaXNBcHBseSA9PSBcIjBcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/nlKjmiLflnKjpu5HlkI3ljZXmiJbmnKrnlLPor7fnuqLljIXnoIFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXRlcmllbExpc3QgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpZWxUeXBlOiBcIjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogXCIxXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5TWF0QVBJKGhpc3RvcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHN0b3JlQWRkcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWF0ZXJpZWxMaXN0OiBKU09OLnN0cmluZ2lmeShtYXRlcmllbExpc3QpfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2l0eU5tOiBjaXR5LmNpdHlDZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIHBpY3R1cmU6IFwiXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJcIixcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v6I635Y+Wc2VhcmNoIOeahOWPguaVsFxyXG4gICAgICAgIGxldCBzZWFyY2ggPSBnZXRTZWFyY2hQYXJhbSh0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaCk7XHJcbiAgICAgICAgaWYgKCEhc2VhcmNoLnJlZENvZGVTdCAmJiBzZWFyY2gucmVkQ29kZVN0ID09IFwiMDBcIiB8fCBzZWFyY2gucmVkQ29kZVN0ID09IFwiMDJcIikge1xyXG4gICAgICAgICAgICAvL+WmguaenOaYrzAwIOaIluiAheaYryAwMiDor7TmmI7mnaXoh6rnlLPnoIHpobXpnaLvvIzlubbkuJTnlKjmiLfkuI3lnKjpu5HlkI3ljZXvvIznlLPor7fnuqLljIXnoIHlkozmlLbmrL7noIFcclxuICAgICAgICAgICAgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlOiBjb21tZGl0eUFuZFJlZCxcclxuICAgICAgICAgICAgICAgIGludHJvZHVjZTogXCLmjqjojZDkvb/nlKjmlLbmrL7lkoznuqLljIXnoIHnianmlpnvvIzmlLbmrL7lronlhajmlrnkvr/vvIw8YnIvPui1muWPlue6ouWMhei1j+mHke+8jOiHquS4u+WFjei0ueW8gOmAmuabtOS+v+aNt++8jOmprOS4iuS9k+mqjOWQp35cIixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghIXNlYXJjaC5yZWRDb2RlU3QpIHtcclxuICAgICAgICAgICAgLy/lpoLmnpzkuI3mmK8wMCDmiJbogIXmmK8gMDLvvIzkvYbmmK8gcmVkQ29kZVN0IOWtmOWcqO+8jOivtOaYjuadpeiHqueUs+eggemhtemdou+8jOeUqOaIt+WcqOm7keWQjeWNleaIluiAheWFtuS7lueKtuaAgVxyXG4gICAgICAgICAgICBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgIHBpY3R1cmU6IGNvbW1kaXR5LFxyXG4gICAgICAgICAgICAgICAgaW50cm9kdWNlOiBcIuWVhuaIt+aUtuasvueggei0tOe6uOWPr+eUqOS6juaCqOeahOW6l+mTuuaUtuasvu+8jOWCqOiThOWNoeaUtuasvuaXoOmcgOaJi+e7rei0ue+8jOaXoOmcgOiQpeS4muaJp+eFp+etieebuOWFs+aJi+e7re+8jOiHquS4u+WFjei0ueW8gOmAmuabtOS+v+aNt++8jOmprOS4iuadpeS9k+mqjOWQp++9nlwiLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQge2lzYmxhY2ssIGlzQXBwbHl9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAgICAgaWYgKGlzYmxhY2sgPT0gXCIwXCIgJiYgaXNBcHBseSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgLy/nlKjmiLfkuI3lnKjpu5HlkI3ljZXlubbkuJQg55Sz6K+36L+H57qi5YyF56CB77yM55Sz6K+357qi5YyF56CB5ZKM5pS25qy+56CBXHJcbiAgICAgICAgICAgICAgICBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlOiBjb21tZGl0eUFuZFJlZCxcclxuICAgICAgICAgICAgICAgICAgICBpbnRyb2R1Y2U6IFwi5o6o6I2Q5L2/55So5pS25qy+5ZKM57qi5YyF56CB54mp5paZ77yM5pS25qy+5a6J5YWo5pa55L6/77yMPGJyLz7otZrlj5bnuqLljIXotY/ph5HvvIzoh6rkuLvlhY3otLnlvIDpgJrmm7Tkvr/mjbfvvIzpqazkuIrkvZPpqozlkKd+XCIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaXNibGFjayA9PSBcIjFcIiB8fCBpc0FwcGx5ID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlOiBjb21tZGl0eSxcclxuICAgICAgICAgICAgICAgICAgICBpbnRyb2R1Y2U6IFwi5ZWG5oi35pS25qy+56CB6LS057q45Y+v55So5LqO5oKo55qE5bqX6ZO65pS25qy+77yM5YKo6JOE5Y2h5pS25qy+5peg6ZyA5omL57ut6LS577yM5peg6ZyA6JCl5Lia5omn54Wn562J55u45YWz5omL57ut77yM6Ieq5Li75YWN6LS55byA6YCa5pu05L6/5o2377yM6ams5LiK5p2l5L2T6aqM5ZCn772eXCIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxBcHBseUNvbW1kaXR5IHsuLi50aGlzLnByb3BzfSBoYW5kbGVDbGljaz17dGhpcy5oYW5kbGVDbGlja30gey4uLnBhcmFtfS8+O1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBzdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHN0b3JlQWRkciAgIOm7mOiupOWcsOWdgFxyXG4gICAgICogaXNBZ3JlZSAgICAg5piv5ZCm5ZCM5oSP5Y2P6K6uXHJcbiAgICAgKiBwaWN0dXJlICAgICDlpLTlm75cclxuICAgICAqIGludHJvZHVjZSAgIOeugOS7i1xyXG4gICAgICovXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlZFVybFN0cjogc3RhdGUuZ2V0SW4oW1wicmVkVXJsU3RyXCJdKSxcclxuICAgICAgICBpc2JsYWNrOiBzdGF0ZS5nZXRJbihbXCJibGFja1N0XCJdKSxcclxuICAgICAgICBpc0FwcGx5OiBzdGF0ZS5nZXRJbihbXCJhcHBseVN0XCJdKSxcclxuICAgICAgICBzdG9yZUFkZHI6IHN0YXRlLmdldEluKFtcInN0b3JlQWRkclwiXSkudG9KUygpLFxyXG4gICAgICAgIGlzQWdyZWU6IHN0YXRlLmdldEluKFtcImlzQWdyZWVSZWNlaXZhYmxlc0NvZGVBZ3JlZW1lbnRcIl0pLFxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBEaXNwYXRoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrByZWR1eCDkuK3nmoRpc0FncmVlUmVjZWl2YWJsZXNDb2RlQWdyZWVtZW50XHJcbiAgICAgKiBAcGFyYW0gdmFsIOWQjOaEj+WNj+iuruS4juWQplxyXG4gICAgICovXHJcbiAgICBsZXQgY2hhbmdlQXBwbHlDb21tZGl0eUFncmVlbWVudCA9ICh2YWwpID0+IHtcclxuICAgICAgICBkaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe2lzQWdyZWVSZWNlaXZhYmxlc0NvZGVBZ3JlZW1lbnQ6IHZhbH0pKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjaGFuZ2VBcHBseUNvbW1kaXR5QWdyZWVtZW50OiBjaGFuZ2VBcHBseUNvbW1kaXR5QWdyZWVtZW50LFxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwc3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRoVG9Qcm9wcykoQXBwbHlDb21tZGl0eUNvbnRhaW5lcik7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0FwcGx5Q29tbWRpdHkvQXBwbHlDb21tZGl0eUNvbnRhaW5lci5qcyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInN0YXRpYy9pbWdzL2NvbW1kaXR5Mi40YmQyMjczZjFkLnBuZ1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Fzc2V0cy9pbWdzL2NvbW1kaXR5Mi5wbmdcbi8vIG1vZHVsZSBpZCA9IDIxNDAxNzY2NzE2MGEwN2M3NjkxXG4vLyBtb2R1bGUgY2h1bmtzID0gNyA5IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDIxZGZhYzI4NTIzYWUzN2RhYzViXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDI1MWJjN2FmZTgxMjdlMDkxNDlkXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOGNmZjg2ZTFkNTFlYmYyMWY3ZlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICdhbnRkLW1vYmlsZS9saWIvYnV0dG9uJztcclxuaW1wb3J0IFwiLi9hcHBseUNvbW1kaXR5LnNjc3NcIlxyXG5cclxuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBseUNvbW1kaXR5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQge3N0b3JlQWRkciwgaXNBZ3JlZSxjaGFuZ2VBcHBseUNvbW1kaXR5QWdyZWVtZW50LHBpY3R1cmUsaW50cm9kdWNlLGhhbmRsZUNsaWNrfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgbGV0IGFncmVlQ2xhc3MgPSBpc0FncmVlID8gXCJhZ3JlSWNvblwiIDogXCJub3RBZ3JlZUljb25cIjtcclxuICAgICAgICBsZXQgc2hvd3JpZ2h0YnRuID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuc2hvd3JpZ2h0YnRuO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJhY1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImNvbnRlbnRXYXJwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtwaWN0dXJlfSBhbHQ9XCJcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50cm9kdWNlXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWw6aW50cm9kdWNlfX0+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybUl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+5oKo5bCG5pS25YiwPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1JbmZvIHBkMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHs8aSBjbGFzc05hbWU9XCJsaXBhaS1pY29uXCI+PC9pPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50cm9kdWNlLXdhcnAtZGl2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Nob3dyaWdodGJ0biA9PSBcInN0b3JlSW5mb1wiICYmICg8aSBjbGFzc05hbWU9XCJpY29uLXRpcHNcIj48L2k+KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+6LS057q444CB5oyC54mMPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybUl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+6YKu5a+E5Zyw5Z2APC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1JbmZvIHBkMjBcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogXCIvYWRkcmVzc01hbmFnZW1lbnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiB7cmVkaXJlY3Q6IFwiL2FwcGx5Q29tbWRpdHlcIiArIHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLnNob3dyaWdodGJ0bn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlQWRkci5kZWxpdk5tLmxlbmd0aCA9PSAwIHx8IHN0b3JlQWRkci5kZWxpdlBob25lLmxlbmd0aCA9PSAwIHx8IHN0b3JlQWRkci5hZGRBbGwubGVuZ3RoID09IDAgfHwgc3RvcmVBZGRyLmFkZHJlc3NJbmZvLmxlbmd0aCA9PSAwID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZGRBZGRyLXdhcnAtZGl2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYWRkLWljb25cIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+5re75Yqg5pS26LSn5Zyw5Z2APC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkZEFkZHItd2FycC1kaXYyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicGVyc29uSW5mb1wiPntzdG9yZUFkZHIuZGVsaXZObX0ge3N0b3JlQWRkci5kZWxpdlBob25lfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBlcnNvbkFkZHJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOaUtui0p+WcsOWdgO+8mntzdG9yZUFkZHIuYWRkQWxsfXtzdG9yZUFkZHIuYWRkcmVzc0luZm99PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwicmlnaHRBcnJvd1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZ3JlZS13YXJwLWRpdlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImFncmVlXCIgb25DbGljaz17Y2hhbmdlQXBwbHlDb21tZGl0eUFncmVlbWVudC5iaW5kKHRoaXMsIWlzQWdyZWUpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT17YWdyZWVDbGFzc30+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7pmIXor7vlubblkIzmhI8gPExpbmsgdG89e1wiL3VzZXJBZ3JlZVwifT7jgIrmlLbmrL7noIHmnI3liqHkvb/nlKjmnaHmrL7jgIs8L0xpbms+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJtaXQtd2FycC1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25DbGljaz17aGFuZGxlQ2xpY2t9PuaPkOS6pOeUs+ivtzwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9BcHBseUNvbW1kaXR5L0FwcGx5Q29tbWRpdHkuanMiLCJpbXBvcnQgQ09ORklHIGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9jb25maWdcIjtcclxuaW1wb3J0IHttY2NTdGF0ZUNoYW5nZWR9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0XCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tIFwiLi4vLi4vc3RvcmUvc3RvcmVcIlxyXG5pbXBvcnQgTW9kYWwgZnJvbSAnYW50ZC1tb2JpbGUvbGliL21vZGFsJztcclxuaW1wb3J0IHtVUERBVEVfU1RPUkVfU1RBVEV9IGZyb20gXCIuLi8uLi9zdG9yZS9hY3Rpb25cIjtcclxuaW1wb3J0IHthcHBseU1hdCwgZ2V0QWRkckxpc3R9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJXCI7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWF0QVBJKGhpc3RvcnksIHBhcmFtPXtcclxuICAgIG1hdGVyaWFsTGlzdDpcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v54mp5paZ5YiX6KGoXHJcbiAgICBkZWxpdk5tOlwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+S6ulxyXG4gICAgYWRkQWxsOlwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDljLrlkI3np7BcclxuICAgIGRlbGl2UGhvbmU6XCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pS26LSn55S16K+dXHJcbiAgICBwcm92aW5jZUlkOlwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ecgUlEXHJcbiAgICBjaXR5SWQ6XCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W4gklEXHJcbiAgICBhcmVhSWQ6XCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWMuklEXHJcbiAgICBhZGRyZXNzSW5mbzpcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ivpue7huWcsOWdgFxyXG4gICAgaWQ6JycgLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Z2A55qESURcclxuICAgIGNpdHlObTpcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5omA5Zyo5Z+O5biCQ2l0eUNvZGVcclxuICAgIHJlZFVybDpcIlwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v57qi5YyF56CB5Zyw5Z2AICDlj6/pgInlj4LmlbBcclxufSkge1xyXG5cclxuICAgIGFwcGx5TWF0KHBhcmFtKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgLy/pgJrnn6XlrqLmiLfnq6/kv67mlLnnirbmgIFcclxuICAgICAgICAgICAgbWNjU3RhdGVDaGFuZ2VkKClcclxuXHJcbiAgICAgICAgICAgIC8v5Lyg55qE5Y+C5pWw5Lit5piv5ZCm5pyJ57qi5YyF56CB5Zyw5Z2A77yM5aaC5p6c5pyJ6K+05piO6KaB55Sz6K+357qi5YyF56CB54mp5paZ77yMXHJcbiAgICAgICAgICAgIGlmKHBhcmFtLnJlZFVybCl7XHJcbiAgICAgICAgICAgICAgICBpZihKU09OLnBhcnNlKHBhcmFtLm1hdGVyaWVsTGlzdCkubGVuZ3RoPT0yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c54mp5paZ5YiX6KGo5pyJ5Lik5Liq5a+56LGh77yM6K+05piO5ZCM5pe255Sz6K+35LqG57qi5YyF56CB54mp5paZ5ZKM5pS25qy+56CB54mp5paZXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVybCA9IEpTT04ucGFyc2UocGFyYW0ucmVkVXJsKS5yZWRVcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsPWVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBcIi9yZXN1bHQvc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2g6ICc/c2hvd0J0bj10cnVlJnJlZFVSTD0nICsgdXJsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpznianmlpnliJfooajmnIkx5Liq77yM6K+05piO5Y+q55Sz6K+35LqG5pS25qy+56CB54mp5paZXHJcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IFwiL3Jlc3VsdC9zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaDogJz9zaG93QnRuPXRydWUmb25seVJlZEJhZz10cnVlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IFwiL3Jlc3VsdC9zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiAnP3Nob3dCdG49dHJ1ZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIE1vZGFsLmFsZXJ0KCfnlLPor7flpLHotKUnLCByZXNwb25zZS5tc2cgfHwgJ+afpeivouS4muWKoeimgee0oOWHuumUme+8jOivt+eojeWQjuWGjeivle+8gScsIFtcclxuXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+ehruiupCcsIG9uUHJlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoKHtwYXRobmFtZTogXCIvcmVzdWx0L2ZhaWxcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0QWRkcigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOWumuaYr+S4jeaYr+WIneasoei/m+WFpeivpemhtemdolxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGxldCBpc0luaXQgPSBzdG9yZS5nZXRTdGF0ZSgpLmdldEluKFtcInN0b3JlQWRkclwiXSkuZ2V0KFwiZGVsaXZObVwiKS5sZW5ndGg9PSAwO1xyXG4gICAgaWYoaXNJbml0KXtcclxuICAgICAgICBnZXRBZGRyTGlzdCgocmVzKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0QWRkckxpc3Q65oiR5piv55yf5q2j55qEdXBkYXRl5Ye95pWwJylcclxuICAgICAgICB9KS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIHN0b3JlQWRkciDku6Pooajpu5jorqTlnLDlnYBcclxuICAgICAgICAgICAgICogQHR5cGUge251bGx9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsZXQgc3RvcmVBZGRyID0gbnVsbCwgYWRkcmVzc0xpc3QgPSByZXNwb25zZS5kYXRhLnJlc3VsdCB8fCBbXTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDpgY3ljoblnLDlnYDliJfooahcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGFkZHJlc3NMaXN0LmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL3N0YXRlPT0xIOeahOS7o+ihqOm7mOiupOWcsOWdgFxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZUFkZHIgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL+WmguaenOm7mOiupOWcsOWdgOS4jeaYr251bGwg5YiZ5pu05pawIHJlZHV4IOS4reeahHN0b3JlQWRkclxyXG4gICAgICAgICAgICBpZighIXN0b3JlQWRkcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFN0YXRlPXtcclxuICAgICAgICAgICAgICAgICAgICBkZWxpdk5tOiBzdG9yZUFkZHIubWVtYmVyTmFtZSwgLy/mlLbotKfkurpcclxuICAgICAgICAgICAgICAgICAgICBhZGRBbGw6IHN0b3JlQWRkci5hZGRBbGwsLy/nnIHluILljLrnu4TlkIhcclxuICAgICAgICAgICAgICAgICAgICBkZWxpdlBob25lOiBzdG9yZUFkZHIucGhvbmUsLy/mlLbotKfnlLXor51cclxuICAgICAgICAgICAgICAgICAgICBwcm92aW5jZUlkOiBzdG9yZUFkZHIucHJvdmluY2VJZCwvL+ecgUlEXHJcbiAgICAgICAgICAgICAgICAgICAgY2l0eUlkOiBzdG9yZUFkZHIuY2l0eUlkLC8v5biCSURcclxuICAgICAgICAgICAgICAgICAgICBhcmVhSWQ6IHN0b3JlQWRkci5hcmVhSWQsLy/lnLDljLpJRFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3NJbmZvOiBzdG9yZUFkZHIuYWRkcmVzc0luZm8sLy/or6bnu4blnLDlnYBcclxuICAgICAgICAgICAgICAgICAgICBpZDogc3RvcmVBZGRyLmlkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe3N0b3JlQWRkcjpuZXh0U3RhdGV9KSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g6YCa55+ldXBkYXRl5Ye95pWw77yMc3VjY2Vzc+S4reeahOS7o+eggeW3suaJp+ihjOWujOavlVxyXG4gICAgICAgICAgICBpZiggISFyZXNwb25zZS5mdWMgKXtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmZ1Yy5lbmRPZkZ1bmMoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRBZGRyTGlzdDogIHN1Y2Nlc3Plh73mlbDmiafooYzlrozmr5UnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9BcHBseUNvbW1kaXR5L0FwcGx5Q29tbWRpdHlBY3Rpb25zLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDNjMjRkMzhmZmNkMGMzOGUzNDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1M2I3ZDM0ODE3MTQ0YjEyYjBhYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJhY1wiOlwiYWNcIixcImhlYWRcIjpcImhlYWRcIixcImludHJvZHVjZVwiOlwiaW50cm9kdWNlXCIsXCJmb3JtSXRlbVwiOlwiZm9ybUl0ZW1cIixcIml0ZW1JbmZvXCI6XCJpdGVtSW5mb1wiLFwiYWRkQWRkci13YXJwLWRpdlwiOlwiYWRkQWRkci13YXJwLWRpdlwiLFwiYWRkLWljb25cIjpcImFkZC1pY29uXCIsXCJhZGRBZGRyLXdhcnAtZGl2MlwiOlwiYWRkQWRkci13YXJwLWRpdjJcIixcImxpcGFpLWljb25cIjpcImxpcGFpLWljb25cIixcImludHJvZHVjZS13YXJwLWRpdlwiOlwiaW50cm9kdWNlLXdhcnAtZGl2XCIsXCJpY29uLXRpcHNcIjpcImljb24tdGlwc1wiLFwicGVyc29uSW5mb1wiOlwicGVyc29uSW5mb1wiLFwicGVyc29uQWRkclwiOlwicGVyc29uQWRkclwiLFwicmlnaHRBcnJvd1wiOlwicmlnaHRBcnJvd1wiLFwicGQyNFwiOlwicGQyNFwiLFwicGQyMFwiOlwicGQyMFwifTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0FwcGx5Q29tbWRpdHkvYXBwbHlDb21tZGl0eS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1NDc3NGM3MDAyM2RmZWZlOWY5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDcgOSAxMCIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgQlJFQUsgPSB7fTtcbnZhciBSRVRVUk4gPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUikge1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSk7XG4gIHZhciBmID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmIChpc0FycmF5SXRlcihpdGVyRm4pKSBmb3IgKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOykge1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1ZTU5YjcxYjMzYTM4YzM2MThlN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmIChERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSBkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qc1xuLy8gbW9kdWxlIGlkID0gNWU3NDkxZjFmNzk5NzE1ZWFjNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmlzSXRlcmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA2YTQ0MmFiNWJkOWJkOTI5NDQ3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvKlxyXG4gICBBUEkg5o6l5Y+j6YWN572uXHJcbiAgIGF4aW9zIOWPguiAg+aWh+aho++8mmh0dHBzOi8vd3d3LmthbmNsb3VkLmNuL3l1bnllL2F4aW9zLzIzNDg0NVxyXG5cclxuKi9cclxuLy8gaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IFRvYXN0IGZyb20gJ2FudGQtbW9iaWxlL2xpYi90b2FzdCc7XHJcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuL2NvbmZpZ1wiXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbipcclxuKiDluLjph4/lrprkuYnljLpcclxuKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgY29uc3QgVXRpbCA9IHdpbmRvdy5VUC5XLlV0aWw7XHJcblxyXG5leHBvcnQgY29uc3QgQXBwID0gVVAuVy5BcHA7XHJcblxyXG5leHBvcnQgY29uc3QgRW52ID0gVVAuVy5FbnY7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ1Bob25lID0gL14oMTNbMC05XXwxNFs1NzldfDE1WzAtMyw1LTldfDE2WzZdfDE3WzAxMzU2NzhdfDE4WzAtOV18MTlbODldKVxcZHs4fSQvO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ1BheU51bSA9IC9eWzAtOV17MjB9JC87XHJcblxyXG5leHBvcnQgY29uc3QgY29tb21QYXJhbSA9IHtcclxuICAgIHZlcnNpb246IFwiMi4wXCIsXHJcbiAgICBzb3VyY2U6IFwiMlwiXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICog6K+35rGC5qC45b+D5Yy6IOS4i+mdoui/meWdl+WMuuWfn+S4reeahOS7o+eggeaUueWKqOivt+aFjumHjVxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxubGV0IGJhc2VVcmwgPSBcIlwiLCBiYXNlVXJsMiA9IFwiXCIsIGJhc2VVcmwzID0gXCJcIjtcclxuaWYgKGxvY2F0aW9uLmhvc3RuYW1lLmluZGV4T2YoJzk1NTE2LmNvbScpICE9PSAtMSkgeyAvL+eUn+S6p+eOr+Wig1xyXG4gICAgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL3NoYW5naHUuOTU1MTYuY29tL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwyID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vbWFsbC45NTUxNi5jb20vY3FwLWludC1tYWxsLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgYmFzZVVybDMgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy95b3VodWkuOTU1MTYuY29tL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufSBlbHNlIGlmIChsb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCcxNzIuMTguMTc5LjEwJykgIT09IC0xKSB7IC8v5rWL6K+V546v5aKDXHJcbiAgICAvLyBiYXNlVXJsPVwiaHR0cDovLzE3Mi4yMS4xMDEuMjU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOyAvL+a1i+ivleWupGFwYWNoZVxyXG4gICAgLy9iYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS45NTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/lvIDlj5Hnjq/looNhcGFjaGVcclxuICAgIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjE3L3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTEveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMTMzLjI1OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufSBlbHNlIHtcclxuICAgIC8vIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjk1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjI1OjM4MjEwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjE3L3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTEveW91aHVpLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjEzMy4yNTozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4zMy41NjozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn1cclxuLyoqXHJcbiAqIOmAmui/h+WQjue8gOiOt+WPluacjeWKoeWZqOeahOWFqOWcsOWdgFxyXG4gKiBAcGFyYW0gdXJsXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0U2VydlVybCA9ICh1cmwpID0+IHtcclxuICAgIGxldCBzZXJ2ZXJVcmwgPSBcIlwiXHJcbiAgICBpZiAodXJsID09IENPTkZJRy5SRVNULnVzZXJJbmZvKSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gXCJcIjtcclxuICAgIH1cclxuICAgIC8vIGVsc2UgaWYgKHVybC5zcGxpdChcIi9cIilbMF0gPT0gXCJhZGRyZXNzXCIpIHtcclxuICAgIC8vICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsMlxyXG4gICAgLy8gfVxyXG4gICAgZWxzZSBpZiAodXJsLnNwbGl0KFwiL1wiKVswXSA9PSBcInNjYW5cIiB8fCB1cmwgPT0gQ09ORklHLlJFU1QuZ2V0Q2l0eSkge1xyXG4gICAgICAgIHNlcnZlclVybCA9IGJhc2VVcmwzXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNlcnZlclVybDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOagvOW8j+WMlue7k+aenCDlsIbnu5PmnpzmoLzlvI/ljJbkuLpcclxuICoge1xyXG4gKiAgICAgc3RhdHVzQ29kZSAgIOWQjuWPsOWTjeW6lOeggVxyXG4gKiAgICAgZGF0YSAgICAgICAgIOWQjuWPsOi/lOWbnueahOaVsOaNrlxyXG4gKiAgICAgbXNnICAgICAgICAgIOWQjuWPsOeahOaPkOekuuS/oeaBr1xyXG4gKiB9XHJcbiAqIEBwYXJhbSBkYXRhXHJcbiAqIEByZXR1cm5zIHt7c3RhdHVzQ29kZTogKHN0cmluZ3wqKSwgZGF0YTogKiwgbXNnOiAqfX1cclxuICovXHJcbmV4cG9ydCBjb25zdCByZXNwb25zZUZvcm1hdHRlciA9IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgcmVzID0ge1xyXG4gICAgICAgIHN0YXR1c0NvZGU6IGRhdGEucmVzcCxcclxuICAgICAgICBkYXRhOiBkYXRhLnBhcmFtcyxcclxuICAgICAgICBtc2c6IGRhdGEubXNnXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLy8g5Yig6Zmk5bqV6YOoICcvJ1xyXG5mdW5jdGlvbiBkZWxldGVTbGFzaChob3N0KSB7XHJcbiAgICByZXR1cm4gaG9zdC5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG59XHJcblxyXG4vLyDmt7vliqDlpLTpg6ggJy8nXHJcbmZ1bmN0aW9uIGFkZFNsYXNoKHBhdGgpIHtcclxuICAgIHJldHVybiAvXlxcLy8udGVzdChwYXRoKSA/IHBhdGggOiBgLyR7cGF0aH1gO1xyXG59XHJcblxyXG4vLyDop6PmnpDlj4LmlbBcclxuZnVuY3Rpb24gc2VwYXJhdGVQYXJhbXModXJsKSB7XHJcbiAgICBjb25zdCBbcGF0aCA9ICcnLCBwYXJhbXNMaW5lID0gJyddID0gdXJsLnNwbGl0KCc/Jyk7XHJcblxyXG4gICAgbGV0IHBhcmFtcyA9IHt9O1xyXG5cclxuICAgIHBhcmFtc0xpbmUuc3BsaXQoJyYnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuXHJcbiAgICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7cGF0aCwgcGFyYW1zfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdChjb25maWcpe1xyXG4gICAgbGV0IHttZXRob2QsIHVybCwgZGF0YSA9IHt9fSA9IGNvbmZpZztcclxuICAgIG1ldGhvZCA9IChtZXRob2QgJiYgbWV0aG9kLnRvVXBwZXJDYXNlKCkpIHx8ICdHRVQnO1xyXG5cclxuICAgIGxldCBzZXJ2ZXJVcmwgPSAnaHR0cDovLzEyNy4wLjAuMTozMDAwLyc7XHJcbiAgICBsZXQgZmluYWxVcmwgPSBzZXJ2ZXJVcmwgKyB1cmw7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB1cmw6ZmluYWxVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6bWV0aG9kLFxyXG4gICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gJzIwMCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2VGb3JtYXR0ZXIocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ+ivt+axguWksei0pScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGlmKCBtZXRob2QgPT09ICdQT1NUJyApe1xyXG4gICAgICAgICAgICAgb3B0aW9ucy5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgICAgICBvcHRpb25zLmRhdGFUeXBlID0gJ2pzb24nXHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5hamF4KG9wdGlvbnMpO1xyXG4gICAgfSlcclxuICAgIFxyXG59XHJcblxyXG4vLyDkuLvopoHor7fmsYLmlrnms5VcclxuLy8gZXhwb3J0ICBmdW5jdGlvbiByZXF1ZXN0T3JpZ2luKGNvbmZpZykge1xyXG5cclxuLy8gICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4vLyAgICAgY29uc3QgdWkgPSBVUC5XLlVJO1xyXG4vLyAgICAgY29uc3QgZW52ID0gVVAuVy5FbnY7XHJcblxyXG4vLyAgICAgbGV0IHttZXRob2QsIHVybCwgZGF0YSA9IHt9LCBoZWFkZXJzLCBmb3JDaHNwLCBlbmNyeXB0LCBieUFqYXgsIGNhY2hlLCB1cGRhdGUsIHN0b3JhZ2V9ID0gY29uZmlnO1xyXG5cclxuLy8gICAgIG1ldGhvZCA9IChtZXRob2QgJiYgbWV0aG9kLnRvVXBwZXJDYXNlKCkpIHx8ICdHRVQnO1xyXG5cclxuLy8gICAgIGxldCBzZXJ2ZXJVcmwgPSBnZXRTZXJ2VXJsKHVybCk7XHJcblxyXG4vLyAgICAgLy8gbGV0IHNlcnZlclVybCA9IGJhc2VVcmwgO1xyXG4vLyAgICAgLy8gaWYgKHRydWUpIHtcclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6YCa6L+H5o+S5Lu25Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKi9cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWQkeacjeWKoeWZqOWPkemAgeivt+axglxyXG4vLyAgICAgICogQHBhcmFtIHBhcmFtcyDor7fmsYLlj4LmlbBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdmVyc2lvbu+8mueJiOacrO+8jOm7mOiupOaYrzEuMFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBzb3VyY2XvvJrmnaXmupDvvIzpu5jorqTmoLnmja5BbmRyb2lk44CBaU9T6Ieq5Yqo5re75YqgXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIGVuY3J5cHTvvJrmmK/lkKbliqDlr4bvvIzpu5jorqTliqDlr4ZcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgbWV0aG9k77ya6K+35rGC5pa55rOV77yMUE9TVOaIlkdFVFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBjbWTvvJror7fmsYLlkb3ku6TvvIjkuZ/lj6/oh6rooYzlsIZjbWTnu4Too4Xoh7N1cmlb5LyY5oOg5ZCO5Y+wXeaIlnBhdGhb6ZKx5YyF5ZCO5Y+wXe+8iVxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB1cmkvcGF0aO+8muivt+axguWcsOWdgO+8jOW7uuiuruS7heWhq+WFhWNtZO+8jOS4jeW7uuiuruiHquihjOe7hOijhXVyaS9wYXRoXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHBhcmFtc++8muWPkemAgee7meWQjuWPsOeahOWPguaVsFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB2aWTvvJrlpoLmnpzpgJrov4dBamF45pa55byP5ZCRd2FsbGV05ZCO5Y+w5Y+R6YCB6K+35rGC6ZyA6KaB5pC65bimdmlkXHJcbi8vICAgICAgKiBAcGFyYW0gZm9yQ2hzcCDmmK/lkKblkJHkvJjmg6DlkI7lj7Dlj5HpgIHor7fmsYLvvIjpu5jorqTlkJHmiYvmnLrlkI7lj7Dlj5HpgIHor7fmsYLvvIlcclxuLy8gICAgICAqIEBwYXJhbSBieUFqYXgg5piv5ZCm5L2/55SoQWpheOWPkemAgeivt+axgu+8iOm7mOiupOS9v+eUqOaOp+S7tu+8iVxyXG4vLyAgICAgICogQHBhcmFtIHN1Y2Nlc3Mg5oiQ5Yqf5Zue6LCDXHJcbi8vICAgICAgKiBAcGFyYW0gZXJyb3Ig6ZSZ6K+v5Zue6LCD77yI5Lia5Yqh6ZSZ6K+v77yJXHJcbi8vICAgICAgKiBAcGFyYW0gZmFpbCDlpLHotKXlm57osIPvvIjor7fmsYLlpLHotKXvvIlcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gICAgICAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IHN1Y2Nlc3NDYWxsYmFjayA9IChkYXRhLGZ1YykgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5Tlm57miJDlip/nu5PmnpzvvJpcIilcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgcmVxID0gcmVzcG9uc2VGb3JtYXR0ZXIoZGF0YSk7XHJcbi8vICAgICAgICAgICAgICAgICBpZiggISFmdWMgKXtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXEuZnVjID0gZnVjO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXEpXHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBlcnJvckNhbGxiYWNrID0gKGVycikgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5Tlm57lpLHotKXnu5PmnpzvvJpcIilcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAodXJsID09IENPTkZJRy5SRVNULmFwcGx5TWNjIHx8IHVybCA9PSBDT05GSUcuUkVTVC5hcHBseU1hdCB8fCB1cmwgPT0gQ09ORklHLlJFU1QudG9kYXlNb25leSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCByZXEgPSByZXNwb25zZUZvcm1hdHRlcihlcnIpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVxKVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgVG9hc3QuaW5mbyhlcnIubXNnIHx8ICfmn6Xor6LkuJrliqHopoHntKDlh7rplJnvvIzor7fnqI3lkI7lho3or5XvvIEnKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IG5ldHdvcmtDYWxsYmFjayA9ICh4aHIpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIFRvYXN0LmluZm8oeGhyLm1zZyk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcblxyXG4vLyAgICAgICAgICAgICBpZiAodXJsICE9IENPTkZJRy5SRVNULmdldFRvZGF5SW5jb21lKSB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5zaG93TG9hZGluZygpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAoIWNhY2hlKSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVybDpcIiArIHVybClcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUGFyYW06XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh7XHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGVuY3J5cHQ6IGVuY3J5cHQsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgZm9yQ2hzcDogZm9yQ2hzcCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBieUFqYXg6IGJ5QWpheFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gfSlcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB6Z2e57yT5a2Y6K+35rGCXCIpXHJcbi8vICAgICAgICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2UoXHJcbi8vICAgICAgICAgICAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXJpOnNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH0sIGZvckNoc3AsIGJ5QWpheCwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBuZXR3b3JrQ2FsbGJhY2spO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDYWNoZVVybDpcIiArIHVybClcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3RvcmVhZ2XnrZbnlaXmmK86XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ1cGRhdGXlh73mlbA6XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1cGRhdGUpXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWPkemAgee8k+WtmOivt+axglwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICAgICAgICAgKiDlkJHmnI3liqHlmajlj5HpgIHor7fmsYJcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBwYXJhbXMg6K+35rGC5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZlcnNpb27vvJrniYjmnKzvvIzpu5jorqTmmK8xLjBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc291cmNl77ya5p2l5rqQ77yM6buY6K6k5qC55o2uQW5kcm9pZOOAgWlPU+iHquWKqOa3u+WKoFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBlbmNyeXB077ya5piv5ZCm5Yqg5a+G77yM6buY6K6k5Yqg5a+GXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIG1ldGhvZO+8muivt+axguaWueazle+8jFBPU1TmiJZHRVRcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgY21k77ya6K+35rGC5ZG95Luk77yI5Lmf5Y+v6Ieq6KGM5bCGY21k57uE6KOF6IezdXJpW+S8mOaDoOWQjuWPsF3miJZwYXRoW+mSseWMheWQjuWPsF3vvIlcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdXJpL3BhdGjvvJror7fmsYLlnLDlnYDvvIzlu7rorq7ku4XloavlhYVjbWTvvIzkuI3lu7rorq7oh6rooYznu4Too4V1cmkvcGF0aFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBwYXJhbXPvvJrlj5HpgIHnu5nlkI7lj7DnmoTlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmlk77ya5aaC5p6c6YCa6L+HQWpheOaWueW8j+WQkXdhbGxldOWQjuWPsOWPkemAgeivt+axgumcgOimgeaQuuW4pnZpZFxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGZvckNoc3Ag5piv5ZCm5ZCR5LyY5oOg5ZCO5Y+w5Y+R6YCB6K+35rGC77yI6buY6K6k5ZCR5omL5py65ZCO5Y+w5Y+R6YCB6K+35rGC77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gYnlBamF4IOaYr+WQpuS9v+eUqEFqYXjlj5HpgIHor7fmsYLvvIjpu5jorqTkvb/nlKjmjqfku7bvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBzdWNjZXNzIOaIkOWKn+Wbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGVycm9yIOmUmeivr+Wbnuiwg++8iOS4muWKoemUmeivr++8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGZhaWwg5aSx6LSl5Zue6LCD77yI6K+35rGC5aSx6LSl77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gdXBkYXRlIOW8guatpeWIt+aWsOWbnuiwgyDlpoLmnpzorr7nva5hc3luY+S4unRydWXlkI7lj6/ku6Xmt7vliqB1cGRhdGXlm57osIMg5aaC5p6c5LiN5aGr5YaZ6buY6K6k5Lulc3VjY2Vzc+i/m+ihjOWkhOeQhlxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHN0b3JhZ2Ug57yT5a2Y5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIG5lZWRTdyAgICAgICAgICAgIC8v6buY6K6kZmFsc2XlpKfpg6jliIbnlKjnmoTmmK/mj5Lku7bpnIDopoHnmoTmiYvliqjljrvliqBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc3RvcmFnZVR5cGUgICAgICAvL+m7mOiupOS9v+eUqGxvY2Fsc3RvcmFnZVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBhc3luYyAgICAgICAgICAgIC8v6buY6K6k6I635Y+W57yT5a2Y5ZCO5LiN5Y+R6K+35rGC77yM5pS55Li6dHJ1ZeWQjuS8muW8guatpeWOu+ivt+axguWQjuWPsOW5tuWIt+aWsOaVsOaNrlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBlbmRPZlN5bmNGdW5jICAgIC8vdG9kbyDph43opoHvvIHvvIHvvIHvvIHlm57osIPkuK3lpoLmnpzlrZjlnKjlvILmraXvvIjmj5Lku7bnrYnvvInpnIDopoHmoIfmmI7lvILmraXnirbmgIHkuLp0cnVlXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZhbGlkYXRlVGltZSAgICAgLy/mnInmlYjmnJ/pu5jorqTml6DpmZDmnInmlYjmnJ8g5Y2V5L2N5q+r56eSXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVXaXRoSWQgICAgICAgLy/pu5jorqR0cnVl5Lul55So5oi3aWTov5vooYzlrZjlgqjlkKbliJlmYWxzZeS7pWxvY2Fs5a2Y5YKoXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVTdWNjICAgICAgICAgLy/kv53lrZjmiJDlip/lkI7nmoTlm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZUVyciAgICAgICAgICAvL+S/neWtmOWksei0peWQjueahOWbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICByb2xsS2V5ICAgICAgICAgIC8v5by65Yi26K6+572u5Li76ZSuXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNlY29uZEtleSAgICAgICAgLy/lvLrliLborr7nva7mrKHopoHplK7lgLxcclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOmHjeimgeivtOaYjiDosIPnlKjlvILmraXmqKHlvI/vvIhhc3luY+iuvue9ruS4unRydWXvvInlkI7lj6/og73lnKhzdWNjZXNz5Zue6LCD6YeM5a2Y5Zyo5byC5q2l5pON5L2c77yM6K+l5oOF5Ya15LiL5Zue5a+86Ie057yT5a2Y55qE5Zue6LCD5Y+v6IO9XHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDmnKrmiafooYzlrozmiJDvvIzor7fmsYLnmoTlm57osIPlj4jlvIDlp4vmiafooYzkuobnmoTmg4XlhrXvvIzmiYDku6XmiJHku6znu5/kuIDlnKhzdWNjZXNz5Zue6LCD5ZKMdXBkYXRl5Zue6LCD55qE5YWl5Y+C5aKe5Yqg5LqG56ys5LqM5Liq5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDnlKjkuo7lhbzlrrnlm57osIPlhoXljIXlkKvlvILmraXnmoTnirblhrXvvIzkvb/nlKjmlrnms5XkuLrvvJrpppblhYjorr7nva5lbmRPZlN5bmNGdW5j5Y+C5pWw5Li6dHJ1ZSzlhbbmrKFzdWNjZXNz5ZKMdXBkYXRl5ZueXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDosIPlhoXkvJrmnIky5Liq5YWl5Y+C77yMc3VjY2Vzc++8iHJlc3DvvIxmdWPvvInvvIzor7flnKjku6PnoIHpl63ljIXlpITkvb/nlKhmdWMuZW5kT2ZGdW5jKClcclxuLy8gICAgICAgICAgICAgICAgICAqL1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIGxldCBwYXJhbSA9IHt9XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmIChieUFqYXgpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwYXJhbSA9IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IFwibGlmZS9saWZlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwYXJhbSA9IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVyaTpzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlV2l0aFN0b3JhZ2UocGFyYW0sIGZvckNoc3AsIGJ5QWpheCwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBuZXR3b3JrQ2FsbGJhY2ssIHN0b3JhZ2UsIHVwZGF0ZSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgfSlcclxuLy8gICAgIH0pXHJcblxyXG5cclxuLy8gICAgIC8vIH1cclxuLy8gICAgIC8vIGVsc2Uge1xyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6YCa6L+HQWpheCDlj5HpgIHor7fmsYJcclxuLy8gICAgICAqL1xyXG4vLyAgICAgLy8gcmV0dXJuIGF4aW9zKHtcclxuLy8gICAgIC8vICAgICB1cmw6IGJhc2VVcmwgKyB1cmwsXHJcbi8vICAgICAvLyAgICAgbWV0aG9kLFxyXG4vLyAgICAgLy8gICAgIGhlYWRlcnMsXHJcbi8vICAgICAvLyAgICAgZGF0YTogbWV0aG9kID09PSAnR0VUJyA/IHVuZGVmaW5lZCA6IGRhdGEsXHJcbi8vICAgICAvLyAgICAgcGFyYW1zOiBPYmplY3QuYXNzaWduKG1ldGhvZCA9PT0gJ0dFVCcgPyBkYXRhIDoge30sIHBhcmFtcylcclxuLy8gICAgIC8vIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbi8vICAgICAvL1xyXG4vLyAgICAgLy8gICAgIGxldCByZXEgPSB7XHJcbi8vICAgICAvLyAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLmRhdGEucmVzcCxcclxuLy8gICAgIC8vICAgICAgICAgZGF0YTogcmVzcG9uc2UuZGF0YS5wYXJhbXNcclxuLy8gICAgIC8vICAgICB9XHJcbi8vICAgICAvLyAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXEpXHJcbi8vICAgICAvLyB9KS5jYXRjaChlcnIgPT4ge1xyXG4vLyAgICAgLy8gICAgIC8vIOivt+axguWHuumUmVxyXG4vLyAgICAgLy8gICAgIFRvYXN0LmluZm8oJ3JlcXVlc3QgZXJyb3IsIEhUVFAgQ09ERTogJyArIGVyci5yZXNwb25zZS5zdGF0dXMpO1xyXG4vLyAgICAgLy8gICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xyXG4vLyAgICAgLy8gfSk7XHJcbi8vICAgICAvLyB9XHJcblxyXG4vLyB9XHJcblxyXG4vLyDkuIDkupvluLjnlKjnmoTor7fmsYLmlrnms5VcclxuZXhwb3J0IGNvbnN0IGdldCA9ICh1cmwsIGRhdGEsIHBhcmFtID0ge30pID0+IHtcclxuICAgIGxldCBwYXJhbUFsbCA9IE9iamVjdC5hc3NpZ24oe2ZvckNoc3A6IHRydWUsIGVuY3J5cHQ6IHRydWUsIGNhY2hlOiBmYWxzZSwgYnlBamF4OiBmYWxzZX0sIHBhcmFtKTtcclxuICAgIHJldHVybiByZXF1ZXN0KE9iamVjdC5hc3NpZ24oe3VybCwgZGF0YX0sIHBhcmFtQWxsKSlcclxufTtcclxuZXhwb3J0IGNvbnN0IHBvc3QgPSAodXJsLCBkYXRhLCBwYXJhbSA9IHt9KSA9PiB7XHJcbiAgICBsZXQgcGFyYW1BbGwgPSBPYmplY3QuYXNzaWduKHtmb3JDaHNwOiB0cnVlLCBlbmNyeXB0OiB0cnVlLCBjYWNoZTogZmFsc2UsIGJ5QWpheDogZmFsc2V9LCBwYXJhbSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdChPYmplY3QuYXNzaWduKHttZXRob2Q6ICdQT1NUJywgdXJsLCBkYXRhfSwgcGFyYW1BbGwpKVxyXG59O1xyXG5leHBvcnQgY29uc3QgcHV0ID0gKHVybCwgZGF0YSkgPT4gcmVxdWVzdCh7bWV0aG9kOiAnUFVUJywgdXJsLCBkYXRhfSk7XHJcbmV4cG9ydCBjb25zdCBkZWwgPSAodXJsLCBkYXRhKSA9PiByZXF1ZXN0KHttZXRob2Q6ICdERUxFVEUnLCB1cmwsIGRhdGF9KTtcclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiDlip/og73lh73mlbDljLpcclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiDlsIZVUkzkuK3nmoRzZWFyY2gg5a2X56ym5LiyIOi9rOaNouaIkCDlr7nosaFcclxuICogQHBhcmFtIHNlYXJjaFxyXG4gKiBAcmV0dXJucyB7e319XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0U2VhcmNoUGFyYW0gPSAoc2VhcmNoKSA9PiB7XHJcbiAgICBpZiAoISFzZWFyY2gpIHtcclxuICAgICAgICBsZXQgc3RyID0gc2VhcmNoLnNsaWNlKDEpO1xyXG4gICAgICAgIGxldCBhcnJheSA9IHN0ci5zcGxpdChcIiZcIik7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtID0gaXRlbS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgICAgIG9ialtwYXJhbVswXV0gPSBwYXJhbVsxXTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiBjb2RvdmEg5o+S5Lu26LCD55So5Yy6XHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuXHJcbi8vIOWQr+WBnOaUtuasvueggVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0WGlhb1dlaVBheShwYXJhbSwgc3VjLCBlcnIpIHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnNldFhpYW9XZWlQYXkocGFyYW0sIHN1YywgZXJyKTtcclxufVxyXG5cclxuLy/lsI/lvq5hdWRpb1xyXG5leHBvcnQgY29uc3Qgc2V0WGlhb1dlaUF1ZGlvID0gKHBhcmFtLCBzdWMsIGVycikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuc2V0WGlhb1dlaUF1ZGlvKHBhcmFtLCBzdWMsIGVycik7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGdldFhpYW9XZWlBdWRpbyA9IChzdWMsIGVycikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuZ2V0WGlhb1dlaUF1ZGlvKHN1YywgZXJyKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRvYXN0ID0gKG1zKSA9PiB7XHJcbiAgICBUb2FzdC5pbmZvKG1zLCAyKTtcclxufVxyXG4vKipcclxuICog6K6+572u6aG26YOoYmFyXHJcbiAqIEBwYXJhbSB0aXRsZSDpobXpnaLlkI3np7BcclxuICogQHBhcmFtIHJpZ2h0QmFyIOWPs+S+p+aMiemSruWQjeensFxyXG4gKiBAcGFyYW0gcmlnaHRDYWxsYmFjayDlj7PkvqfmjInpkq7lm57osINcclxuICogQHBhcmFtIHJpZ2h0QmFySW1nIOWPs+S+p+aMiemSruWbvueJh1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGJlZm9yZUVudGVyUm91dGVyID0gKHRpdGxlID0gXCJcIiwgcmlnaHRCYXIgPSBcIlwiLCByaWdodENhbGxiYWNrID0gbnVsbCwgcmlnaHRCYXJJbWcgPSBudWxsKSA9PiB7XHJcbiAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJUaXRsZSh0aXRsZSlcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7nqpflj6Plj7PkvqfmjInpkq5cclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGUg5Zu+5qCH5qCH6aKYXHJcbiAgICAgICAgICogQHBhcmFtIGltYWdlIOWbvuagh+aWh+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSBoYW5kbGVyIOeCueWHu+Wbnuiwg+WHveaVsFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmICghIXJpZ2h0Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJSaWdodEJ1dHRvbihyaWdodEJhciwgcmlnaHRCYXJJbWcsIHJpZ2h0Q2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uKFwiXCIsIG51bGwsIG51bGwpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICog6YCa55+l5a6i5oi356uv5L+u5pS554q25oCBXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWNjU3RhdGVDaGFuZ2VkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLm1jY1N0YXRlQ2hhbmdlZCgpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2VuZFFyQ29kZSA9IChwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaJq+aPj+adoeeggeWSjOS6jOe7tOeggVxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXNcclxuICAgICAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICAgICAqIEBwYXJhbSBmYWlsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLnNjYW5RUkNvZGUocGFyYW1zLCBzdWNjZXNzLCBmYWlsKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNsb3NlV2ViVmlldyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmNsb3NlV2ViVmlldygpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdmVyaWZ5UGF5UHdkID0gKHBhcmFtLCBzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC52ZXJpZnlQYXlQd2QocGFyYW0sIHN1Y2Nlc3MsIGZhaWwpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlV2ViVmlldyA9ICh1cmwsIHBhcmFtcyA9IG51bGwsIHRpdGxlID0gJycsIGlzRmluaXNoID0gXCIxXCIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmNyZWF0ZVdlYlZpZXcodXJsLCBwYXJhbXMsIHRpdGxlLCBpc0ZpbmlzaClcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VXNlckRldGFpbEluZm8gPSAoc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLmdldFVzZXJEZXRhaWxJbmZvKHN1Y2Nlc3MsIGZhaWwpXHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDlsIZjYXZhcyDkv53lrZjliLDmnKzlnLDnm7jlhoxcclxuICogQHBhcmFtIGNhbnZhc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNhdmVRY29kZSA9IChjYW52YXMpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIHVpID0gVVAuVy5VSSB8fCB7fTtcclxuICAgIHZhciBwaWNVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYXBwLmxvZ0V2ZW50KCdzYXZlUGljdHVyZV9OZXdZZWFyQWN0Jyk7XHJcbiAgICAgICAgYXBwLnNhdmVQaWNUb0xvY2FsKHtcclxuICAgICAgICAgICAgdXJsOiBwaWNVcmwgJiYgcGljVXJsLnN1YnN0cigyMilcclxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHVpLnNob3dUb2FzdFdpdGhQaWMoJ+W3suS/neWtmOWIsOezu+e7n+ebuOWGjCcpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9PSAndXBkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd0FsZXJ0KCfor7fljYfnuqfliLDmnIDmlrDlrqLmiLfnq68nLCBmdW5jdGlvbiAoKSB7IC8vIOWOu+WNh+e6p1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnWWVzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnYuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS9jbi9hcHAvaWQ2MDAyNzM5Mjg/Y29kZT1uZXdZZWFyQWN0aXZpdHknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL3lvdWh1aS45NTUxNi5jb20vYXBwL2FwcC9zb2Z0d2FyZS91bmlvbnBheS13YWxsZXQtdjIuYXBrP2NvZGU9bmV3WWVhckFjdGl2aXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhcHAub3BlbkJyb3dzZXIodXJsKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ05vJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAn6ams5LiK5Y2H57qnJywgJ+eojeWQjuWGjeivtCcsICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dUb2FzdChtc2cgfHwgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzaGFyZSA9ICh0aXRsZSwgZGVzYywgaW1nVVJMLCBwYWdlVVJsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciBlbnYgPSBVUC5XLkVudiB8fCB7fTtcclxuXHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaYvuekuuWIhuS6q+mdouadv1xyXG4gICAgICAgICAqIOWmguaenOaJgOaciea4oOmBk+S9v+eUqOebuOWQjOeahOWIhuS6q+WGheWuueWImeS7heWhq+WGmXBhcmFtc+WNs+WPr++8jFxyXG4gICAgICAgICAqIOWmguaenOmcgOimgeagueaNruS4jeWQjOa4oOmBk+WumuWItuWIhuS6q+WGheWuue+8jOWImeWPr3BhcmFtc+eVmeepuu+8jOWcqHNoYXJlQ2FsbGJhY2vkuK3ov5Tlm57mjIflrprmuKDpgZPnmoTliIbkuqvlhoXlrrlcclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zIOWIhuS6q+WPguaVsFxyXG4gICAgICAgICAqICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICB0aXRsZe+8miDliIbkuqvmoIfpophcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGRlc2M6IOWIhuS6q+aRmOimgVxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgcGljVXJs77ya5YiG5Lqr5Zu+5qCHXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBzaGFyZVVybO+8muivpuaDheWcsOWdgFxyXG4gICAgICAgICAqICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICogQHBhcmFtIHNoYXJlQ2FsbGJhY2sg5YiG5Lqr5pe25Zue6LCDXHJcbiAgICAgICAgICogICAgICAgICAgICAgIGNoYW5uZWzvvJp7XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAw77ya55+t5L+hXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAx77ya5paw5rWq5b6u5Y2aXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAz77ya5b6u5L+h5aW95Y+LXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA077ya5b6u5L+h5pyL5Y+L5ZyIXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA177yaUVHlpb3lj4tcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDbvvJpRUeepuumXtFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgN++8muWkjeWItumTvuaOpVxyXG4gICAgICAgICAqICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICogICAgICAgICAgICAgIGRhdGE6IOm7mOiupOWIhuS6q+aVsOaNrlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5zaG93U2hhcmVQYW5lbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgZGVzYzogZGVzYyxcclxuICAgICAgICAgICAgcGljVXJsOiBpbWdVUkwsXHJcbiAgICAgICAgICAgIHNoYXJlVXJsOiBwYWdlVVJsICAvLyB0b2RvIOaZrumAmuWIhuS6q1xyXG4gICAgICAgIH0sIG51bGwpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueUqOaIt+eahOWumuS9je+8jOmmluWFiOmAmui/h0dQUyDlrprkvY3vvIzlpoLmnpzlrprkvY3lpLHotKXvvIzpgJrov4fmjqXlj6NnZXRDaXR5LOWIqeeUqElQ5Zyw5Z2A6L+b6KGM5a6a5L2N77yM5aaC5p6c6L+Y5piv5aSx6LSl77yM6YCa6L+H5o+S5Lu26I635Y+W5a6i5oi356uv5bem5LiK6KeS55qE5Z+O5biC5L+h5oGv77yM5L6d54S25aSx6LSl6buY6K6k56m/Y2l0eUNkOjMxMDAwMCDku6PooajkuIrmtbfluIJcclxuICogQHBhcmFtIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudExvY2F0aW9uSW5mbyA9IChjYWxsYmFjazIpID0+IHtcclxuICAgIGNvbnN0IHVpID0gVVAuVy5VSTtcclxuICAgIHVpLnNob3dMb2FkaW5nKCk7XHJcbiAgICBsZXQgY2FsbGJhY2sgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgIHVpLmRpc21pc3MoKTtcclxuICAgICAgICBjYWxsYmFjazIoZGF0YSlcclxuICAgIH1cclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFwcC5nZXRDdXJyZW50TG9jYXRpb25JbmZvKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGFsZXJ0KEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjbWQ6IFwiL1wiICsgQ09ORklHLlJFU1QuZ2V0Q2l0eSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwYXRoOiBcImh0dHA6Ly8xNzIuMjEuMzMuNTY6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiK0NPTkZJRy5SRVNULmdldENpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb246IFwiMi4wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogXCIyXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEucGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEucGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaE5hdGl2ZURhdGEoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoTmF0aXZlRGF0YShjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hOYXRpdmVEYXRhID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5a6i5oi356uv5L+h5oGvXHJcbiAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3NcclxuICAgICAgICAgKiBAcGFyYW0gZmFpbFxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIDDvvJrln47luILkv6Hmga9jaXR5Q2TvvJsx77ya57uP57qs5bqm77ybNe+8mlVzZXJJZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5mZXRjaE5hdGl2ZURhdGEoMCwgKGRhdGEgPSB7fSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICAgICAgY2l0eUNkOiBcIjMxMDAwMFwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNhdmVQaWNUb0xvY2FsID0gKGNhbnZhcywgcmVzb2x2ZSkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgdWkgPSBVUC5XLlVJIHx8IHt9O1xyXG4gICAgdmFyIHBpY1VybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuc2F2ZVBpY1RvTG9jYWwoe1xyXG4gICAgICAgICAgICB1cmw6IHBpY1VybCAmJiBwaWNVcmwuc3Vic3RyKDIyKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgLy/miJDlip9cclxuICAgICAgICAgICAgISFyZXNvbHZlICYmIHJlc29sdmUoXCJzdWNjZXNzXCIpO1xyXG4gICAgICAgIH0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9PSAndXBkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd0FsZXJ0KCfor7fljYfnuqfliLDmnIDmlrDlrqLmiLfnq68nLCBmdW5jdGlvbiAoKSB7IC8vIOWOu+WNh+e6p1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnWWVzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnYuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS9jbi9hcHAvaWQ2MDAyNzM5Mjg/Y29kZT1uZXdZZWFyQWN0aXZpdHknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL3lvdWh1aS45NTUxNi5jb20vYXBwL2FwcC9zb2Z0d2FyZS91bmlvbnBheS13YWxsZXQtdjIuYXBrP2NvZGU9bmV3WWVhckFjdGl2aXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhcHAub3BlbkJyb3dzZXIodXJsKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ05vJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAn6ams5LiK5Y2H57qnJywgJ+eojeWQjuWGjeivtCcsICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICEhcmVzb2x2ZSAmJiByZXNvbHZlKFwiZmFpbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRleHRDYW52YXNlID0gKHRleHQsIGNvbG9yLCBsb25nID0gNjg0LCBzaG90ID0gNjApID0+IHtcclxuXHJcbiAgICBsZXQgcmVtMnB4ID0gKHZhbCkgPT4ge1xyXG4gICAgICAgIHZhciBjV2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcclxuICAgICAgICByZXR1cm4gdmFsICogY1dpZHRoIC8gNzUwXHJcbiAgICB9XHJcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHRDYW52YXMnKTtcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICAvL+ioree9rueVq+S9iOeahOWvrOmrmFxyXG4gICAgLy8gdmFyIGJnV2lkdGggPSByZW0ycHgobG9uZyk7XHJcbiAgICAvLyB2YXIgYmdIZWlnaHQgPSByZW0ycHgoc2hvdCk7XHJcblxyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzaG90KTtcclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGxvbmcpO1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIGN0eC5yb3RhdGUoLTkwICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICB2YXIgdGV4dCA9IHRleHQ7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xyXG4gICAgbGV0IGZvbnRTaXplID0gc2hvdDtcclxuICAgIGN0eC5mb250ID0gZm9udFNpemUgKyAncHggQWlyYWwnO1xyXG4gICAgd2hpbGUgKGN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCA+IGxvbmcpIHtcclxuICAgICAgICBmb250U2l6ZS0tO1xyXG4gICAgICAgIGN0eC5mb250ID0gZm9udFNpemUgKyAncHggQWlyYWwnO1xyXG4gICAgfVxyXG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIC1sb25nLCBmb250U2l6ZSk7XHJcbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDnlJ/miJDlm77niYflubbkv53lrZjliLDnm7jlhoxcclxuICogQHBhcmFtIGJndXJsIOiDjOaZr+WbvueJh+eahOWcsOWdgFxyXG4gKiBAcGFyYW0gcXJjb2RlVVJMIOS6jOe7tOeggeeahOWcsOWdgFxyXG4gKiBAcGFyYW0gcXJjb2RlV2RBbmRIZyDkuoznu7TnoIHnmoTlrr3luqZcclxuICogQHBhcmFtIHhXaWR0aCDkuoznu7TnoIHot53nprvlt6bkuIrop5LnmoQg4oaSIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0geUhlaWdodCDkuoznu7TnoIHot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0gdGV4dGJnVVJMIOWKoOWFpeeUu+W4g+eahOWbvueJh+eahFVSTFxyXG4gKiBAcGFyYW0geFRleHRXaWR0aCDliqDlhaXnlLvluIPnmoTlm77niYfot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0geVRleHRIZWlnaHQg5Yqg5YWl55S75biD55qE5Zu+54mH6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlQ29udmFzQW5kU2F2ZVBob3RvID0gKGNhbnZhc09iaiwgcmVzb2x2ZSkgPT4ge1xyXG4gICAgbGV0IHtiZ3VybCwgcXJjb2RlVVJMLCBxcmNvZGVXZEFuZEhnLCB4V2lkdGgsIHlIZWlnaHQsIHRleHRiZ1VSTCwgeFRleHRXaWR0aCwgeVRleHRIZWlnaHR9ID0gY2FudmFzT2JqO1xyXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tb25DYW52YXNXcmFwcGVyJyk7XHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOeUu+W4g+WGheWuuVxyXG4gICAgICovXHJcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMud2lkdGhcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5zcmMgPSBiZ3VybDtcclxuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8v6Kit572u55Wr5L2I55qE5a+s6auYXHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBpbWcud2lkdGgpO1xyXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGltZy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAvL+WcqOeVq+W4g+S4iueVq+iDjOaZr+WcllxyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcclxuXHJcbiAgICAgICAgaWYgKCEhdGV4dGJnVVJMKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0VXJpID0gdGV4dGJnVVJMO1xyXG4gICAgICAgICAgICB2YXIgdGV4dEltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICB0ZXh0SW1nLnNyYyA9IHRleHRVcmk7XHJcbiAgICAgICAgICAgIHRleHRJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0ZXh0SW1nLCB4VGV4dFdpZHRoLCB5VGV4dEhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5LqM57at56K85ZyW54mH5aSn5bCPXHJcbiAgICAgICAgdmFyIHFyY29kZVdpZHRoQW5kSGVpZ2h0ID0gcXJjb2RlV2RBbmRIZztcclxuICAgICAgICAvL+a4hemZpOS6jOe7tOeggVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdmFyIHFyY29kZSA9IG5ldyBRUkNvZGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIiksIHtcclxuICAgICAgICAgICAgdGV4dDogcXJjb2RlVVJMLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHFyY29kZVdpZHRoQW5kSGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogcXJjb2RlV2lkdGhBbmRIZWlnaHQsXHJcbiAgICAgICAgICAgIGNvcnJlY3RMZXZlbDogUVJDb2RlLkNvcnJlY3RMZXZlbC5MXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHFyY29kZUltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXTtcclxuICAgICAgICBxcmNvZGVJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+eVq+S6jOe2reeivOeahOWclueJh1xyXG4gICAgICAgICAgICBsZXQgcXJjb2RlRHggPSB4V2lkdGgsIHFyY29kZUR5ID0geUhlaWdodDtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShxcmNvZGVJbWcsIHFyY29kZUR4LCBxcmNvZGVEeSk7XHJcbiAgICAgICAgICAgIC8vIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgc2F2ZVBpY1RvTG9jYWwoY2FudmFzLCByZXNvbHZlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL3JlcXVlc3QuanMiLCJjb25zdCBjb25maWcgPSB7XHJcbiAgICBSRVNUOiB7XHJcbiAgICAgICAgYXBwbHlNY2M6IFwiY29sbGVjdGlvbkNvZGUvYXBwbHlNY2NcIiwgLy8yLjQuNOeUs+ivt+aUtuasvueggeaOpeWPo1xyXG4gICAgICAgIGdldE1jY0NhcmRMaXN0OiBcImNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCIsIC8vMi40LjLllYbmiLfmlLbmrL7noIHljaHliJfooajmjqXlj6NcclxuICAgICAgICBhcHBseU1hdDogXCJjb2xsZWN0aW9uQ29kZS9hcHBseU1hdFwiLCAvL+eUs+ivt+eJqeaWmeaOpeWPo1xyXG4gICAgICAgIGdldE1jaG50QW5kQXJlYUluZjogXCJtY2hudC9nZXRNY2hudEFuZEFyZWFJbmYuc2pzb25cIiwgLy/llYbmiLfnsbvlnovlj4rlnLDljLrliJfooajmn6Xor6JcclxuICAgICAgICB1cGdyYWRlTWNjOiBcImNvbGxlY3Rpb25Db2RlL3VwZ3JhZGVNY2NcIiwgLy8yLjQuNuWNh+e6p+aUtuasvueggeaOpeWPoyxcclxuICAgICAgICBnZXRBZGRyTGlzdDogXCJhZGRyZXNzL2dldEFkZHJMaXN0XCIgLCAvLzIuNC4xMyDojrflj5bmlLbotKflnLDlnYDliJfooahcclxuICAgICAgICBkZWxldGVBZGRyZXNzOiBcImFkZHJlc3MvZGVsZXRlQWRkcmVzc1wiICwgLy8yLjQuMTIg5Yig6Zmk5pS26LSn5Zyw5Z2AXHJcbiAgICAgICAgZWRpdEFkZHJlc3M6IFwiYWRkcmVzcy9lZGl0QWRkcmVzc1wiLCAvLzIuNC4xMSDkv67mlLnmlLbotKflnLDlnYAsXHJcbiAgICAgICAgbmV3QWRkcmVzczogXCJhZGRyZXNzL25ld0FkZHJlc3NcIiwgLy8yLjQuMTAg5paw5aKe5pS26LSn5Zyw5Z2AXHJcbiAgICAgICAgbWNobnRPcGVyIDpcIm1jaG50L21jaG50T3BlclwiLCAvLzIuMi4yIOW6l+mTuuS/oeaBr+abtOaWsFxyXG4gICAgICAgIGdldExpbWl0QXRJbmZvOlwibWNobnQvZ2V0TGltaXRBdEluZm9cIiwgLy/ojrflj5bmlLbmrL7pmZDpop1cclxuICAgICAgICBzZXRNY2NPbk9mZjpcImNvbGxlY3Rpb25Db2RlL3NldE1jY09uT2ZmXCIsIC8v5YGc5q2i5ZKM5ZCv55So5LuY5qy+56CB5YCf5Y+jXHJcbiAgICAgICAgZ2V0TWNobnREZXRhaWw6XCJtY2hudC9tY2hudERldGFpbFwiLCAvLzIuMi4xIOiOt+WPluW6l+mTuuivpuaDhemhtemdolxyXG4gICAgICAgIC8vIHVwZ3JhZGVNY2M6IFwiY29sbGVjdGlvbkNvZGUvdXBncmFkZU1jY1wiLCAvLzIuNC425Y2H57qn5pS25qy+56CB5o6l5Y+jXHJcbiAgICAgICAgZ2V0VG9kYXlUcmFuczpcInRyYW4vZ2V0VG9kYXlUcmFuc1wiLC8vMi4xLjMvL+S7iuaXpeiuouWNleaOpeWPo1xyXG4gICAgICAgIGdldFRvZGF5SW5jb21lOlwidHJhbi9nZXRUb2RheUluY29tZVwiLC8vMi4xLjHllYbmiLfmnI3liqHpppbpobXku4rml6XmlLbmrL7mjqXlj6N+fn5+fn5+flxyXG4gICAgICAgIGdldEhpc3RvcnlJbmNvbWU6XCJ0cmFuL2dldEhpc3RvcnlJbmNvbWVcIiwvLzIuMS4y5Y6G5Y+y5pS25qy+5o6l5Y+jXHJcbiAgICAgICAgZ2V0SGlzdG9yeVRyYW5zOlwidHJhbi9nZXRIaXN0b3J5VHJhbnNcIiwvLzIuMS405Y6G5Y+y6K6i5Y2V5o6l5Y+jXHJcbiAgICAgICAgZ2V0TG9naXN0aWNzU3Q6XCJtYXRlcmllbC9nZXRMb2dpc3RpY3NTdFwiLC8vMi4zLjPnianmtYHor6bmg4XmjqXlj6Pmn6Xor6JcclxuICAgICAgICBnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtOlwidHJhbi9nZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtXCIsLy8yLjEuNeWNleeslOiuouWNleafpeivouaOpeWPo1xyXG4gICAgICAgIGdldEF1ZGl0SW5mbzpcImNvbGxlY3Rpb25Db2RlL2dldEF1ZGl0SW5mb1wiLC8vMi40LjE05L+h55So5Y2h5Y2H57qn5a6h5qC457uT5p6c5p+l6K+iXHJcbiAgICAgICAgdXBkYXRlTWNjQ2FyZDpcImNvbGxlY3Rpb25Db2RlL3VwZGF0ZU1jY0NhcmRcIiwvLzIuNC455pu05o2i5pS25qy+5Y2h5o6l5Y+jXHJcbiAgICAgICAgZ2V0VXBncmFkZVN0OlwibWNobnQvZ2V0VXBncmFkZVN0XCIsLy/mn6Xor6LllYbmiLfmmK/lkKbljYfnuqfkv6HnlKjljaHmlLbmrL5cclxuICAgICAgICBnZXRNY2NUcmFuc051bTonY29sbGVjdGlvbkNvZGUvZ2V0TWNjVHJhbnNOdW0nLC8v6I635Y+W6LCD5Y+W5pSv5LuY5o6n5Lu255qEVE7lj7dcclxuICAgICAgICBnZXRNYXRlcmllbEluZm9MaXN0OlwiY29sbGVjdGlvbkNvZGUvZ2V0TWF0ZXJpZWxJbmZvTGlzdFwiLC8vMi40LjPnianmlpnkv6Hmga/liJfooajmjqXlj6NcclxuICAgICAgICB1c2VySW5mbzpcIi9hcHAvaW5BcHAvdXNlci9nZXRcIiwvL+iOt+WPlueUqOaIt+S/oeaBr1xyXG4gICAgICAgIGlzQmxhY2s6XCJzY2FuL2lzQmxhY2tcIiwvLzIuMS415pS26ZO25ZGY5piv5ZCm5Zyo6buR5ZCN5Y2VXHJcbiAgICAgICAgaXNBcHBseTpcInNjYW4vaXNBcHBseVwiLC8vMi4xLjTmmK/lkKblt7Lnu4/nlLPor7fnuqLljIXnoIFcclxuICAgICAgICBzaGFyZUxpbms6XCJzY2FuL3NoYXJlTGlua1wiLC8vMi4xLjbnlJ/miJDnuqLljIXnoIHpk77mjqVcclxuICAgICAgICByZWNtZFJlY29yZDpcInNjYW4vcmVjbWRSZWNvcmRcIiwvL+aOqOiNkOWFs+ezu+iusOW9lVxyXG4gICAgICAgIGdldExvZ2lzdGljc0xpc3Q6XCJtYXRlcmllbC9nZXRMb2dpc3RpY3NMaXN0XCIsLy/ojrflj5bnianmlpnljoblj7LorqLljZVcclxuICAgICAgICBnZXRSZXdhcmRMaXN0Olwic2Nhbi9nZXRSZXdhcmRMaXN0XCIsLy8yLjEuN+afpeivouaUtumTtuWRmOi1j+mHkeaYjue7huiusOW9lVxyXG4gICAgICAgIGdldFByb3RvY29sSW5mbzpcImNvbGxlY3Rpb25Db2RlL2dldFByb3RvY29sSW5mb1wiLC8v5ZWG5oi35Y2H57qn5p+l6K+i5pi+56S65Y2P6K6u55qE5ZCN56ew5ZKM5Y2P6K6u55qE5Zyw5Z2AXHJcbiAgICAgICAgZ2V0Q2l0eTpcInJlZ2lvbi9nZXRDaXR5XCIsLy/pgJrov4dJUOWcsOWdgOiOt+WPluWcsOWdgOWumuS9jVxyXG4gICAgICAgIGdldFFyVXJsOlwiY29sbGVjdGlvbkNvZGUvZ2V0UXJJbmZvXCIvLzIuMS4x6I635Y+W55So5oi35pS25qy+56CBVVJMXHJcbiAgICB9LFxyXG4gICAgU1RBVFVTQ09ERToge1xyXG4gICAgICAgIFNVQ0NFU1M6XCIwMFwiXHJcbiAgICB9LFxyXG4gICAgQ09OU1RfREFUQTp7XHJcbiAgICAgICAgaW1nZVNpemU6XCIzMDBcIlxyXG4gICAgfSxcclxuICAgIENBQ0hFS0VZOntcclxuICAgICAgICBnZXRNY2NDYXJkTGlzdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLWNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1tY2hudC9nZXRVcGdyYWRlU3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1tY2hudC9nZXRVcGdyYWRlU3RcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0TWNobnREZXRhaWw6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1tY2hudC9tY2hudERldGFpbFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLW1jaG50L21jaG50RGV0YWlsXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzQXBwbHk6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1zY2FuL2lzQXBwbHlcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1zY2FuL2lzQXBwbHlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0QWRkckxpc3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1hZGRyZXNzL2dldEFkZHJMaXN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtYWRkcmVzcy9nZXRBZGRyTGlzdFwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL2NvbmZpZy5qcyIsImltcG9ydCBJbW11dGFibGUgZnJvbSBcImltbXV0YWJsZVwiO1xyXG5cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOWPquS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiDlhYjor7vnvJPlrZjvvIzlkIzmraXlvoDlkI7lj7Dlj5Hor7fmsYLvvIzor7fmsYLmiqXmloflm57mnaXlkI7liLfmlrDnvJPlrZjlj4rpobXpnaJcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSA9ICh1cGRhdGUscm9sbEtleSxzZWNvbmRLZXkpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuLy8gICAgICAgICAgICAgcm9sbEtleSxcclxuLy8gICAgICAgICAgICAgc2Vjb25kS2V5XHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5LiN5pSv5oyBIHN3ICAgLOawuOS5hee3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2NhY2hlOiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW59fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlTG9uZ1RpbWUgPSAocm9sbEtleSwgc2Vjb25kS2V5KSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICAgICAgcm9sbEtleSxcclxuLy8gICAgICAgICAgICAgc2Vjb25kS2V5XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDlj6rkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMeWIhumSn+WGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTFtaW4gPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UzMG1pbiA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAzMCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMWhvdXIgPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKjYwKjEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTJob3VyID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDIgKiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG5cclxuLy9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTI0ZGlhbiA9ICgpID0+IHtcclxuLy9cclxuLy8gICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuLy8gICAgIGxldCB0ZW1vcnJvdyA9IG5ldyBEYXRlKCk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRIb3VycygyMyk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRNaW51dGVzKDU5KTtcclxuLy8gICAgIHRlbW9ycm93LnNldFNlY29uZHMoNTkpO1xyXG4vLyAgICAgbGV0IHRlbSA9IHRlbW9ycm93LmdldFRpbWUoKTtcclxuLy8gICAgIGxldCB2YWxpZGF0ZVRpbWUgPSB0ZW0gLSBub3cgKyAxMDAwICogNjBcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICB2YWxpZGF0ZVRpbWU6IHZhbGlkYXRlVGltZSxcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgd29ya2JveOeahOetlueVpSAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKuS4umdldOivt+axgu+8jOS4jeWKoOWvhlxyXG4vLyAgKuaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICrlhYjor7vnvJPlrZjvvIzlkIzml7blvoDlkI7lj7Dlj5Hor7fmsYLvvIzor7fmsYLmiqXmloflm57mnaXlkI7liLfmlrDnvJPlrZjlj4rpobXpnaJcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIGNhY2hlOiBib29sZWFuLCBhc3luYzogYm9vbGVhbn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGUgPSAodXBkYXRlKSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGJ5QWpheDogZmFsc2UsLy/lpoLmnpzopoHmlK/mjIFzdyDlsLHkuI3pnIDkvb/nlKhhamF4XHJcbi8vICAgICAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIHVwZGF0ZTogdXBkYXRlXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMzDliIbpkp/lhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MzBtaW4gPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAzMCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAx5bCP5pmC5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDFob3VyID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QyaG91ciA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDIgKiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vKipcclxuICog6K+l562W55Wl5piv5LiA5a6a5pe26Ze05YaF5LiN5ZCR5ZCO5Y+w6K+35rGC5pWw5o2u77yMIOWmguaenOWcqOiuvuWkh+S4iuaUr+aMgXN35YiZ5L2/55Soc3cs5ZCm5YiZ5L2/55SoIGxvY2FsU3RvcmFnZVxyXG4gKiBAcGFyYW0gdGltZSAg6KaB57yT5a2Y55qE5pe26Ze0IOWNleS9jeaYr+avq+enklxyXG4gKiBAcmV0dXJucyB7e2J5QWpheDogYm9vbGVhbiwgZm9yQ2hzcDogYm9vbGVhbiwgZW5jcnlwdDogYm9vbGVhbiwgY2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHt2YWxpZGF0ZVRpbWU6ICp9fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjYWNoZUZpcnN0ID0odGltZSk9PntcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYnlBamF4OiB0cnVlLFxyXG4gICAgICAgIGZvckNoc3A6ZmFsc2UsXHJcbiAgICAgICAgZW5jcnlwdDpmYWxzZSxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRlVGltZTp0aW1lLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiAg6K+l562W55Wl5piv5LiA5a6a5pe26Ze05YaF5LiN5ZCR5ZCO5Y+w6K+35rGC5pWw5o2u77yM5re75Yqg57yT5a2Y5Y+q5ZyobG9jYWxzdG9yYWdl5LitXHJcbiAqIEBwYXJhbSB0aW1lICDopoHnvJPlrZjnmoTml7bpl7Qg5Y2V5L2N5piv5q+r56eSXHJcbiAqIEBwYXJhbSByb2xsS2V5ICAg6Z2e5b+F5aGrIOWmguaenOWQjuacn+imgeWIoOmZpOi/meS4que8k+WtmO+8jOi/meWhq+WGmei/mWtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5ICDpnZ7lv4Xloasg5aaC5p6c5ZCO5pyf6KaB5Yig6Zmk6L+Z5Liq57yT5a2Y77yM6L+Z5aGr5YaZ6L+Za2V5XHJcbiAqIEByZXR1cm5zIHt7Y2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHtuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogKiwgcm9sbEtleTogKiwgc2Vjb25kS2V5OiAqfX19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2FjaGVGaXJzdFN0b3JhZ2UgPSh0aW1lLHJvbGxLZXksIHNlY29uZEtleSk9PntcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZVRpbWU6IHRpbWUsXHJcbiAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlRm9ybWF0dGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCByZXMgPSB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5yZXNwLFxyXG4gICAgICAgIGRhdGE6IGRhdGEucGFyYW1zLFxyXG4gICAgICAgIG1zZzogZGF0YS5tc2dcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vKipcclxuICog6K+l562W55Wl5piv5YWI6K+757yT5a2Y77yM5ZCM5pe25ZCR5ZCO5Y+w5Y+R6YCB6K+35rGC77yM6K+35rGC5Zue5p2l5ZCO5ZCM5q2l5pu05paw57yT5a2Y77yM5Zue6LCDdXBkYXRlIOWHveaVsO+8jFxyXG4gKiBAcGFyYW0gdXBkYXRlIOW/heWhq+abtOaWsOmhtemdoueahOWbnuiwg+WHveaVsFxyXG4gKiBAcGFyYW0gcm9sbEtleSAg6Z2e5b+F5aGrIOiuvue9rue8k+WtmOeahCByb2xsa2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXkg6Z2e5b+F5aGrIOiuvue9rue8k+WtmOeahCBzZWNvbmRLZXlcclxuICogQHJldHVybnMge3tjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge2FzeW5jOiBib29sZWFuLCByb2xsS2V5OiAqLCBzZWNvbmRLZXk6ICp9LCB1cGRhdGU6ICp9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSA9ICh1cGRhdGUscm9sbEtleSxzZWNvbmRLZXkpID0+IHtcclxuXHJcbiAgIGxldCAgcmVmcmVzaERvbUZ1bmM9KHJlc3BvbnNlKT0+e1xyXG4gICAgICAgbGV0IHJlcT1yZXNwb25zZUZvcm1hdHRlcihyZXNwb25zZSlcclxuICAgICAgIC8vIOWwhuiOt+WPlueahOaVsOaNruWSjOe8k+WtmOS4reeahOaVsOaNrui/m+ihjOWvueavlFxyXG4gICAgICAgbGV0IGRhdGFGcm9tQ2FjaGUgPSB7fTtcclxuICAgICAgIFVQLlcuVXRpbC5nZXRGcm9tU3RvcmFnZSh7XHJcbiAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgIH0sZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgaWYoICEhZGF0YSApe1xyXG4gICAgICAgICAgICAgICAgZGF0YUZyb21DYWNoZSA9IGRhdGE7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICB9KVxyXG4gICAgICAgbGV0IGlzU2FtZUF0QWxsID0gSW1tdXRhYmxlLmlzKEltbXV0YWJsZS5mcm9tSlMocmVxKSxJbW11dGFibGUuZnJvbUpTKGRhdGFGcm9tQ2FjaGUpKTsgLy/mlbDmja7mmK/lkKblrozlhajnm7jlkIxcclxuICAgICAgIGlmKCAhaXNTYW1lQXRBbGwgKXsgLy/mlbDmja7mnInlj5jliqhcclxuICAgICAgICAgICAgdXBkYXRlKHJlcSlcclxuICAgICAgIH1cclxuICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBlbmRPZlN5bmNGdW5jOmZhbHNlLFxyXG4gICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZTogcmVmcmVzaERvbUZ1bmMsXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKDpmaRsb2NhbHN0b3JhZ2XkuK3nmoTnvJPlrZhcclxuICogQHBhcmFtIHJvbGxLZXlcclxuICogQHBhcmFtIHNlY29uZEtleVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlbW92ZUNhY2hlID0gKHJvbGxLZXksIHNlY29uZEtleSkgPT4ge1xyXG4gICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgIHJvbGxLZXk6IHJvbGxLZXksXHJcbiAgICAgICAgc2Vjb25kS2V5OiBzZWNvbmRLZXlcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5Yig6Zmk57yT5a2Y5oiQ5YqfJylcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgICAgIGZ1bGw6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvY2FjaGVTdG9yYWdlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS10cnlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdQcm9taXNlJywgeyAndHJ5JzogZnVuY3Rpb24gKGNhbGxiYWNrZm4pIHtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZih0aGlzKTtcbiAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oY2FsbGJhY2tmbik7XG4gIChyZXN1bHQuZSA/IHByb21pc2VDYXBhYmlsaXR5LnJlamVjdCA6IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmUpKHJlc3VsdC52KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA4ZTBjMWRiMDAwODVjOGFkMjU1YVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA5NzNjYzhlZWZjNTk5MzFkZTk1ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaW52b2tlID0gcmVxdWlyZSgnLi9faW52b2tlJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4vX2h0bWwnKTtcbnZhciBjZWwgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHNldFRhc2sgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xudmFyIGNsZWFyVGFzayA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBNZXNzYWdlQ2hhbm5lbCA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbDtcbnZhciBEaXNwYXRjaCA9IGdsb2JhbC5EaXNwYXRjaDtcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgaWYgKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spIHtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCkge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gYWE5NjNiNGMyNzE0NGYwOTRjY2Fcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanNcbi8vIG1vZHVsZSBpZCA9IGI1MGQ4MjQ1NmU1NDVkY2MzZGQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIGFyZ3MsIHRoYXQpIHtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanNcbi8vIG1vZHVsZSBpZCA9IGI1ODBiOTRiMTk1ODQyY2JmMmIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIE9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbnZhciBpc05vZGUgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZiAoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAoaXNOb2RlKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyLCBleGNlcHQgaU9TIFNhZmFyaSAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMzlcbiAgfSBlbHNlIGlmIChPYnNlcnZlciAmJiAhKGdsb2JhbC5uYXZpZ2F0b3IgJiYgZ2xvYmFsLm5hdmlnYXRvci5zdGFuZGFsb25lKSkge1xuICAgIHZhciB0b2dnbGUgPSB0cnVlO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlIHdpdGhvdXQgYW4gYXJndW1lbnQgdGhyb3dzIGFuIGVycm9yIGluIExHIFdlYk9TIDJcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gICAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYgKCFoZWFkKSB7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gYmRlMGY1N2U5YjU3OWY5NDNmODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjUuNC4xLjUgTmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5cbmZ1bmN0aW9uIFByb21pc2VDYXBhYmlsaXR5KEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIChDKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanNcbi8vIG1vZHVsZSBpZCA9IGMxYjk0ZTNlOTVlZDQzNWFmNTQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtZmluYWxseVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1Byb21pc2UnLCB7ICdmaW5hbGx5JzogZnVuY3Rpb24gKG9uRmluYWxseSkge1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBjb3JlLlByb21pc2UgfHwgZ2xvYmFsLlByb21pc2UpO1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBvbkZpbmFsbHkgPT0gJ2Z1bmN0aW9uJztcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB4OyB9KTtcbiAgICB9IDogb25GaW5hbGx5LFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSk7XG4gICAgfSA6IG9uRmluYWxseVxuICApO1xufSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanNcbi8vIG1vZHVsZSBpZCA9IGMyZTM1YmJmZjgzMzA5NTk0M2MxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4geyBlOiBmYWxzZSwgdjogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBlOiB0cnVlLCB2OiBlIH07XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gY2I3ODM3NTI5NDU0MmMyNGM1YmFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSBkMTgxMGFlNTMzMmUzNmZmYTNjNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbmF2aWdhdG9yID0gZ2xvYmFsLm5hdmlnYXRvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCAnJztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191c2VyLWFnZW50LmpzXG4vLyBtb2R1bGUgaWQgPSBlYzZjYmUzMTdiOTg1MGIwNWNlNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzdGF0aWMvaW1ncy9jb21tZGl0eS4zNzQ5YzY5OGRlLnBuZ1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Fzc2V0cy9pbWdzL2NvbW1kaXR5LnBuZ1xuLy8gbW9kdWxlIGlkID0gZWYzNTViNTRmMDc3ZGJmYjE1MDVcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IGVmNTFkNDk4OWYzMDQ0YjJlYjMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzXG4vLyBtb2R1bGUgaWQgPSBmMGRiYzEwYzY4ZGQ4MTQwMTRlN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi9fdXNlci1hZ2VudCcpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4IHx8ICcnO1xudmFyICRQcm9taXNlID0gZ2xvYmFsW1BST01JU0VdO1xudmFyIGlzTm9kZSA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xudmFyIGVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIEludGVybmFsLCBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIE93blByb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlLnJlc29sdmUoMSk7XG4gICAgdmFyIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhlbXB0eSwgZW1wdHkpO1xuICAgIH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZVxuICAgICAgLy8gdjggNi42IChOb2RlIDEwIGFuZCBDaHJvbWUgNjYpIGhhdmUgYSBidWcgd2l0aCByZXNvbHZpbmcgY3VzdG9tIHRoZW5hYmxlc1xuICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9ODMwNTY1XG4gICAgICAvLyB3ZSBjYW4ndCBkZXRlY3QgaXQgc3luY2hyb25vdXNseSwgc28ganVzdCBjaGVjayB2ZXJzaW9uc1xuICAgICAgJiYgdjguaW5kZXhPZignNi42JykgIT09IDBcbiAgICAgICYmIHVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUvNjYnKSA9PT0gLTE7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbiAocHJvbWlzZSwgaXNSZWplY3QpIHtcbiAgaWYgKHByb21pc2UuX24pIHJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgb2sgPSBwcm9taXNlLl9zID09IDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbiAocmVhY3Rpb24pIHtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW4sIGV4aXRlZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgaWYgKHByb21pc2UuX2ggPT0gMikgb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhbmRsZXIgPT09IHRydWUpIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTsgLy8gbWF5IHRocm93XG4gICAgICAgICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgICAgICAgIGRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgICAgIGV4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2UpIHtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZG9tYWluICYmICFleGl0ZWQpIGRvbWFpbi5leGl0KCk7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSBydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpIG9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgdW5oYW5kbGVkID0gaXNVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgdmFyIHJlc3VsdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pIHtcbiAgICAgICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmICh1bmhhbmRsZWQgJiYgcmVzdWx0LmUpIHRocm93IHJlc3VsdC52O1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICByZXR1cm4gcHJvbWlzZS5faCAhPT0gMSAmJiAocHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jKS5sZW5ndGggPT09IDA7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpIHtcbiAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3YgfSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYgKCFwcm9taXNlLl9hKSBwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgdmFyIHRoZW47XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmICh0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0geyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgJHJlamVjdC5jYWxsKHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9hKSB0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX3MpIG5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbiAgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgICByZXR1cm4gQyA9PT0gJFByb21pc2UgfHwgQyA9PT0gV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFByb21pc2U6ICRQcm9taXNlIH0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICB2YXIgJCRyZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoTElCUkFSWSAmJiB0aGlzID09PSBXcmFwcGVyID8gJFByb21pc2UgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyICRpbmRleCA9IGluZGV4Kys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSBmYTk4N2Q4MTFlNGViMmQ0M2Q5Y1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiXSwic291cmNlUm9vdCI6IiJ9