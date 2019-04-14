webpackJsonp([16],{

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

/***/ "b3f3cb7f7f541e1a7132":
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

var _inputItem = __webpack_require__("46e3f6ce771e1a6ba82e");

var _inputItem2 = _interopRequireDefault(_inputItem);

var _picker = __webpack_require__("42a05ae39bd6095f4cec");

var _picker2 = _interopRequireDefault(_picker);

__webpack_require__("b92f41b733128ca97ebc");

var _request = __webpack_require__("76fb50331ac78bf18670");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpStoreInfomation = function (_React$Component) {
    (0, _inherits3.default)(UpStoreInfomation, _React$Component);

    function UpStoreInfomation(props, context) {
        (0, _classCallCheck3.default)(this, UpStoreInfomation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UpStoreInfomation.__proto__ || (0, _getPrototypeOf2.default)(UpStoreInfomation)).call(this, props, context));

        _this.changeStoreNameHandler = function (val) {
            /**
             * 只要用户修改过名，我们就需要修改状态
             */
            if (_this.neverChangeName) {
                _this.neverChangeName = false;
            }
            _this.props.changeStoreName(val);
        };

        _this.clickError = function (msg) {
            (0, _request.toast)(msg);
        };

        _this.intoView = function () {
            var ele = document.getElementById("detailAddrinput");
            if (!!ele.scrollIntoView) {
                ele.scrollIntoView(true);
            }
            if (!!ele.scrollIntoViewIfNeeded) {
                ele.scrollIntoViewIfNeeded();
            }
        };

        _this.handleNextClick = function () {
            //如果该页面是来自错误毁掉页面，必须处理过不合法的名称，才能提交请求
            if (!_this.props.isFailback || !_this.neverChangeName) {
                _this.props.handleClick();
            }
        };

        _this.neverChangeName = true; //从来没有修改过店铺名称

        return _this;
    }
    /**
     * 处理点击事件
     */


    (0, _createClass3.default)(UpStoreInfomation, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                storename = _props.storename,
                StoreTp = _props.StoreTp,
                StroeArea = _props.StroeArea,
                addr = _props.addr,
                merchantTpArr = _props.merchantTpArr,
                areaArr = _props.areaArr,
                changeStoreType = _props.changeStoreType,
                changeStoreArea = _props.changeStoreArea,
                changeStoreAddr = _props.changeStoreAddr,
                isFailback = _props.isFailback,
                errMsg = _props.errMsg;


            var error = false,
                showMsg = ""; //默认店铺名称是不错的

            StroeArea = StroeArea.split('|');
            StoreTp = parseInt(StoreTp) + '';
            if (StoreTp.length <= 3) {
                StoreTp = [StoreTp.substr(0, 1) + '', StoreTp];
            } else {
                StoreTp = [StoreTp.substr(0, 2) + '', StoreTp];
            }

            //用于判定用户名是不是有错误
            if (isFailback && this.neverChangeName) {
                //如果来自错误页面的跳转，并且从来没有修改过店铺名称，则店铺名称要标红，且点击显示错误信息
                error = true;
                showMsg = errMsg;
            } else {
                //根据字符串长度判定是否是合法的名称
                if (!!storename && storename.length > 20) {
                    error = true;
                    showMsg = "您的店铺名称过长";
                } else {
                    error = false;
                }
            }

            //判定是不是diaable的按钮，如果名称符合要求，且不是空,选中了店铺类型，选中了店铺区域，填写了店铺地址
            var disableBtn = void 0;
            if (!error && storename.length != 0 && StoreTp.length != 0 && StroeArea.length != 0 && addr.length) {
                disableBtn = false;
            } else {
                disableBtn = true;
            }

            return _react2.default.createElement(
                'div',
                { id: 'usf' },
                _react2.default.createElement(
                    'div',
                    { id: 'contentWarp' },
                    !isFailback && _react2.default.createElement(
                        'div',
                        { className: 'headTipe' },
                        _react2.default.createElement(
                            'div',
                            { className: 'tips-warp-div mt0' },
                            _react2.default.createElement('i', { className: 'tipsIcon' })
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u8865\u5168\u8D44\u6599\u5E76\u6EE1\u8DB3\u3010\u5F00\u901A\u5546\u5BB6\u6536\u6B3E\u6EE190\u5929\u4E14\u8FDE\u7EED30\u5929\u6B63\u5E38\u6536\u6B3E\u3011\u5373\u53EF\u652F\u6301\u987E\u5BA2\u7684\u4FE1\u7528\u5361\u4ED8\u6B3E\u3002'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'contentWarp', className: 'padlr32' },
                        _react2.default.createElement(
                            'div',
                            { className: 'inputWap' },
                            _react2.default.createElement(
                                _inputItem2.default,
                                { clear: true, placeholder: '\u6700\u591A20\u4E2A\u5B57\u7B26',
                                    error: error,
                                    value: storename,
                                    onChange: this.changeStoreNameHandler,
                                    onErrorClick: this.clickError.bind(this, showMsg)
                                },
                                '\u5E97\u94FA\u540D\u79F0'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'tips-warp-div' },
                            _react2.default.createElement('i', { className: 'tipsIcon' }),
                            '\u8BE5\u540D\u79F0\u5C06\u5C55\u793A\u5728\u987E\u5BA2\u7684\u4ED8\u6B3E\u9875\u9762'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'inputWap' },
                            _react2.default.createElement(
                                _picker2.default,
                                {
                                    extra: '\u8BF7\u9009\u62E9\u5546\u6237\u7C7B\u578B',
                                    data: merchantTpArr,
                                    cols: '2',
                                    value: StoreTp,
                                    onOk: function onOk(v) {
                                        return changeStoreType(v);
                                    }
                                },
                                _react2.default.createElement(
                                    CustomChildren,
                                    null,
                                    '\u5E97\u94FA\u7C7B\u578B'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'inputWap' },
                            _react2.default.createElement(
                                _picker2.default
                                // title="选择地区"
                                ,
                                { extra: '\u8BF7\u9009\u62E9\u5E97\u94FA\u6240\u5728\u5730\u533A',
                                    data: areaArr,
                                    value: StroeArea,
                                    onOk: function onOk(v) {
                                        return changeStoreArea(v);
                                    } },
                                _react2.default.createElement(
                                    CustomChildren,
                                    null,
                                    '\u6240\u5728\u5730\u533A'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'inputWap' },
                            _react2.default.createElement(
                                _inputItem2.default,
                                { clear: true, placeholder: '\u8BF7\u8F93\u5165\u5E97\u94FA\u8BE6\u7EC6\u5730\u5740',
                                    id: 'detailAddrinput',
                                    onFocus: this.intoView,
                                    value: addr,
                                    onChange: function onChange(v) {
                                        changeStoreAddr(v);
                                    } },
                                '\u8BE6\u7EC6\u5730\u5740'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    !isFailback && _react2.default.createElement(
                        'div',
                        { className: 'btn-tips' },
                        '\u4FE1\u7528\u5361\u4ED8\u6B3E\uFF0C\u5355\u7B14\u4EA4\u6613\u5C06\u88AB\u6536\u53D6',
                        _react2.default.createElement(
                            'span',
                            null,
                            '0.5%'
                        ),
                        '\u624B\u7EED\u8D39\uFF0C\u501F\u8BB0\u5361\u4ED8\u6B3E\u514D\u8D39\u3002'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'submit-warp-button' },
                        _react2.default.createElement(
                            _button2.default,
                            { type: 'primary', disabled: disableBtn,
                                onClick: this.handleNextClick },
                            '\u4E0B\u4E00\u6B65'
                        )
                    )
                )
            );
        }
    }]);
    return UpStoreInfomation;
}(_react2.default.Component);

exports.default = UpStoreInfomation;


var CustomChildren = function CustomChildren(props) {
    var placeholderClass = "";
    if (props.extra.indexOf("请选择") > -1) {
        placeholderClass = "color666";
    }

    function handleClick() {
        var node = document.getElementsByClassName("czymask")[0];
        if (!node) {
            node = document.createElement('div'); // 创建 DOM
            node.className = 'czymask'; // 给上 ClassName
            document.getElementsByTagName('body')[0].appendChild(node); //给body添加一个div
        }
        node.style.display = "block";
        setTimeout(function () {
            node.style.display = "none";
        }, 300);
        // console.log("aa")
        props.onClick();
    }

    return _react2.default.createElement(
        'div',
        {
            onClick: handleClick,
            className: 'cell-warp-div'
        },
        _react2.default.createElement(
            'div',
            { className: 'cell-inner-div' },
            _react2.default.createElement(
                'div',
                { className: 'cell-name-div' },
                props.children
            ),
            _react2.default.createElement(
                'div',
                { className: "cell-value-div " + placeholderClass },
                props.extra
            ),
            _react2.default.createElement('i', { className: 'rightArrow' })
        )
    );
};

/***/ }),

/***/ "b401e319c41c5a1d857e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.submitHandleClick = submitHandleClick;

var _request = __webpack_require__("76fb50331ac78bf18670");

var _modal = __webpack_require__("cc81f23a066389bd7f8d");

var _modal2 = _interopRequireDefault(_modal);

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function submitHandleClick(param) {
    (0, _requestAPI.upgradeMcc)(param).then(function () {
        _modal2.default.alert('提交成功', '我们将在2~5个工作日内完成审核，请耐心等待，审核结果将通过云闪付消息进行发送', [{
            text: '好的', onPress: function onPress() {
                var url = window.location.protocol + "//" + window.location.host + "/s/wl/xvsh/index.html#/merchabtServ";
                (0, _request.createWebView)(url, null, "", "1");
            }
        }]);
    });
}

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

/***/ "b92f41b733128ca97ebc":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"usf":"usf","am-list-item":"am-list-item","am-input-item":"am-input-item","am-list-item-middle":"am-list-item-middle","am-input-error":"am-input-error","headTipe":"headTipe","mt0":"mt0","tips-warp-div":"tips-warp-div","btn-tips":"btn-tips","padlr32":"padlr32","inputWap":"inputWap","cell-warp-div":"cell-warp-div","cell-inner-div":"cell-inner-div","cell-name-div":"cell-name-div","cell-value-div":"cell-value-div","color666":"color666"};

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

/***/ "f206ed499a368f9f4036":
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

var _UpStoreInfomation = __webpack_require__("b3f3cb7f7f541e1a7132");

var _UpStoreInfomation2 = _interopRequireDefault(_UpStoreInfomation);

var _request = __webpack_require__("76fb50331ac78bf18670");

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

var _IdIdentifyActions = __webpack_require__("b401e319c41c5a1d857e");

var _action = __webpack_require__("5d4604b08304c597d074");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpStoreInfomationContainers = function (_Component) {
    (0, _inherits3.default)(UpStoreInfomationContainers, _Component);

    function UpStoreInfomationContainers(props, context) {
        (0, _classCallCheck3.default)(this, UpStoreInfomationContainers);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UpStoreInfomationContainers.__proto__ || (0, _getPrototypeOf2.default)(UpStoreInfomationContainers)).call(this, props, context));

        _this.handleClick = function () {
            var history = _this.props.history;
            var _this$state = _this.state,
                failPictrueObj = _this$state.failPictrueObj,
                isFailback = _this$state.isFailback,
                hasFailPicture = _this$state.hasFailPicture;


            if (isFailback) {
                //如果是来自错误毁掉页面，则需要判断是否有照片的错误信息
                if (hasFailPicture) {
                    //如果有错误的照片需要将错误的照片重新拍照
                    history.push({
                        pathname: "/idIdentify",
                        search: "?failPictrueObj=" + failPictrueObj + "&isFailback=true"
                    });
                } else {
                    //如果没有则直接发请求
                    var _this$props = _this.props,
                        storename = _this$props.storename,
                        StoreTp = _this$props.StoreTp,
                        StroeArea = _this$props.StroeArea,
                        addr = _this$props.addr;

                    StroeArea = StroeArea.split('|');
                    (0, _IdIdentifyActions.submitHandleClick)({
                        storeNm: storename,
                        StoreTp: StoreTp,
                        provCd: StroeArea[0],
                        cityCd: StroeArea[1],
                        coutyCd: !!StroeArea[2] ? StroeArea[2] : null,
                        addr: addr
                    });
                }
            } else {
                //如果不是来自错误信息页面，则直接跳转到拍照上传页面
                history.push({
                    pathname: "/idIdentify"
                });
            }
        };

        var search = _this.props.location.search;
        _this.state = {
            isFailback: false,
            errMsg: "",
            hasFailPicture: "",
            failPictrueObj: {}
        };

        if (!!search) {
            //如果search 存在代表来自审核失败的回调页面
            /**
             * 如果是审核失败了进入该页面，需要在URL上面加入两个参数
             * isFailback       是否来自审核失败页面 是-true,否-false
             * errMsg           错误原因
             * hasFailPicture   是否有失败的图片  有 -true  , 没有 -false
             * failPictrueObj   错误的图片是哪一类
             * {
             *     certVerifyFailReason: false,     //身份证 信息有误
             *     licVerifyFailReason: false,      //营业执照信息有误
             *     shoppicVerifyFailReason: false,  //店铺照片有误
             *     auxVerifyFailReason: false,      //辅助证明资料有误
             *     mernmVerifyFailReason: false,    //店铺名称有误
             *     merLogoVerifyFailReason: false,    //店铺logo有误
             * }
             * ?isFailback=true&errMsg=asdfasdfsadf&hasFailPicture=false&failPictrueObj=asdfadfasfds
             */
            var _getSearchParam = (0, _request.getSearchParam)(search),
                isFailback = _getSearchParam.isFailback,
                errMsg = _getSearchParam.errMsg,
                hasFailPicture = _getSearchParam.hasFailPicture,
                failPictrueObj = _getSearchParam.failPictrueObj;

            _this.state = {
                isFailback: isFailback,
                errMsg: errMsg,
                hasFailPicture: hasFailPicture,
                failPictrueObj: failPictrueObj
            };
        }
        return _this;
    }

    (0, _createClass3.default)(UpStoreInfomationContainers, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _request.beforeEnterRouter)('店铺信息');

            //获取商铺列表和地址列表
            (0, _requestAPI.getMchntAndAreaInf)();

            var storename = this.props.storename;

            //如果storename不存在说明没有操作过这个页面，应该读取商户信息回显商户信息

            if (!storename.length) {
                //获取店铺详情
                (0, _requestAPI.getMchntDetail)();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_UpStoreInfomation2.default, (0, _extends3.default)({}, this.props, this.state, { handleClick: this.handleClick }));
        }
    }]);
    return UpStoreInfomationContainers;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {
    return {
        storename: state.getIn(["mchntDetail", "storeNm"]),
        StoreTp: state.getIn(["mchntDetail", "storeTp"]),
        StroeArea: state.getIn(["mchntDetail", "area"]),
        addr: state.getIn(["mchntDetail", "addr"]),
        merchantTpArr: state.getIn(["mchntAndAreaInf", "merchantTpArr"]).toJS(),
        areaArr: state.getIn(["mchntAndAreaInf", "areaArr"]).toJS()
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
     * 用于用户更新Redux中的店铺类型
     */
    var changeStoreType = function changeStoreType(value) {

        dispatch((0, _action.UPDATE_STORE_STATE)({ mchntDetail: { storeTp: value[1] } }));
    };

    /**
     * 用于用户更新Redux中的店铺地址区域
     */
    var changeStoreArea = function changeStoreArea(value) {
        var storeArea = value.join('|');
        dispatch((0, _action.UPDATE_STORE_STATE)({ mchntDetail: { area: storeArea } }));
    };

    /**
     * 用于用户更新Redux中的店铺地址
     */
    var changeStoreAddr = function changeStoreAddr(value) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ mchntDetail: { addr: value } }));
    };

    return {
        changeStoreName: changeStoreName,
        // changeInputErrState:bindActionCreators(changeInputErrState,dispatch),
        changeStoreType: changeStoreType,
        changeStoreArea: changeStoreArea,
        changeStoreAddr: changeStoreAddr
    };
};
exports.default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(UpStoreInfomationContainers);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVXBTdG9yZUluZm9tYXRpb24vVXBTdG9yZUluZm9tYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSWRJZGVudGlmeS9JZElkZW50aWZ5QWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVXBTdG9yZUluZm9tYXRpb24vVXBTdG9yZUluZm9tYXRpb24uc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191c2VyLWFnZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9VcFN0b3JlSW5mb21hdGlvbi9VcFN0b3JlSW5mb21hdGlvbkNvbnRhaW5lcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIl0sIm5hbWVzIjpbInJlY21kUmVjb3JkIiwic2hhcmxpbmsiLCJpc0JsYWNrIiwiaXNBcHBseSIsImFwcGx5TWNjIiwiZ2V0Q2FyZGxpc3QiLCJnZXRBZGRyTGlzdCIsImFwcGx5TWF0IiwiZ2V0UXJVcmxSZXN0IiwiZ2V0TWNobnRBbmRBcmVhSW5mIiwiZ2V0TWNobnREZXRhaWwiLCJ1cGdyYWRlTWNjIiwiZ2V0UHJvdG9jb2xJbmZvIiwiZ2V0SGlzdG9yeUluY29tZSIsImdldEhpc3RvcnlUcmFucyIsImdldFRvZGF5SW5jb21lIiwiZ2V0VG9kYXlUcmFucyIsImdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0iLCJnZXRMb2dpc3RpY3NTdCIsImdldFVwZ3JhZGVTdCIsImdldExvZ2lzdGljc0xpc3QiLCJnZXRBdWRpdEluZm8iLCJnZXRMaW1pdEF0SW5mbyIsIm1jaG50T3BlciIsImRlbGV0ZUFkZHJlc3MiLCJ1cGRhdGVNY2NDYXJkIiwibmV3QWRkcmVzcyIsImVkaXRBZGRyZXNzIiwic2V0TWNjT25PZmYiLCJnZXRNY2NUcmFuc051bSIsInBob25lIiwidW5kZWZpbmVkIiwicmVjbWRNb2JpbGUiLCJVdGlsIiwiYmFzZTY0RW5jb2RlIiwiQ09ORklHIiwiUkVTVCIsInRoZW4iLCJyZXNwb25zZSIsInN0YXR1c0NvZGUiLCJTVEFUVVNDT0RFIiwiU1VDQ0VTUyIsInJvbGxLZXkiLCJDQUNIRUtFWSIsInNlY29uZEtleSIsImZ1bGwiLCJyZXNvbHZlIiwic2hhcmVMaW5rIiwicmVkVXJsU3RyIiwiZGF0YSIsImlkZW50aWZpZXIiLCJuZXh0U3RhdGUiLCJzdG9yZSIsImRpc3BhdGNoIiwidXBkYXRlIiwidXBkYXRlRnVuYyIsInJlc3AiLCJibGFja1N0IiwiY29uc29sZSIsImxvZyIsImNhY2hlUGFyYW0iLCJhcHBseVN0IiwicGFyYW0iLCJyZWZlcmVlVGVsIiwidmlydHVhbENhcmRObyIsImFjY05tIiwiY2l0eUNkIiwiY29tb21QYXJhbSIsImdldE1jY0NhcmRMaXN0IiwiY2FyZExpc3QiLCJsZW5ndGgiLCJkZWZhbHV0Q2FyZCIsImJhbmsiLCJjYXJkVHlwZSIsImZ1bmN0aW9uQml0bWFwIiwiaWNvblJlbFVybCIsImlzU3VwcG9ydCIsInBhbiIsInJhbmsiLCJzZWxlY3RlZCIsImZvckVhY2giLCJpdGVtIiwiayIsInN0b3JlU3RhdGUiLCJzdG9yZVJlY2VpdmVDYXJkT2JqIiwic3RhdGUiLCJhZGRyZXNzTGlzdCIsInJlc3VsdCIsIm1hdGVyaWFsTGlzdCIsImRlbGl2Tm0iLCJhZGRBbGwiLCJkZWxpdlBob25lIiwicHJvdmluY2VJZCIsImNpdHlJZCIsImFyZWFJZCIsImFkZHJlc3NJbmZvIiwiaWQiLCJjaXR5Tm0iLCJyZWRVcmwiLCJnZXRRclVybCIsIm1jaG50RGV0YWlsIiwicXJVcmwiLCJxck51bSIsImFyZWEiLCJtZXJjaGFudFRwIiwiYXJlYUFyciIsInByb3ZpbmNlIiwib25lIiwicHJvSWQiLCJwcm9ObSIsInR3byIsImNpdHkiLCJ0aHJlZSIsInZhbHVlIiwiY2hpbGRyZW4iLCJwdXNoIiwiYXJlYU5tIiwibWVyY2hhbnRUcEFyciIsIm1lclR5cGUxIiwibWVyY2hhbnRUcENkIiwibWVyY2hhbnRUcE5tIiwibWVyVHlwZTIiLCJtY2hudEFuZEFyZWFJbmYiLCJzdG9yZU5tIiwiU3RvcmVUcCIsInByb3ZDZCIsImNvdXR5Q2QiLCJhZGRyIiwiY2VydGlmUGljMSIsImNlcnRpZlBpYzIiLCJjZXJ0aWZQaWMzIiwibGljZW5zZVBpYyIsInNob3BQaWMxIiwic2hvcFBpYzIiLCJhdXhQcm92TWF0MSIsImF1eFByb3ZNYXQyIiwic2hvcExvZ29QaWMiLCJVcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdCIsInJlcyIsImhpc3RvcnlJbmNvbWVPYmoiLCJvcmlnaW5MaXN0RGF0YSIsImdldFN0YXRlIiwiZ2V0SW4iLCJ0b0pTIiwibmV3TGlzdCIsInRyYW5zSW5mbyIsImhpc3RvcnlPcmRlckxpc3QiLCJjb25jYXQiLCJ0b2RheUluY29tZU9iaiIsInRvZGF5T3JkZXJMaXN0IiwibmV3T2JqIiwiZGVsaXZlcnlNc2ciLCJtYXREZWxpdlN0YXR1cyIsImxpbWl0SW5mbyIsImlzVXNlTWNjIiwibWNjVHJhbnNOdW0iLCJ0cmFuc051bSIsInJlcXVlc3QiLCJzZXRYaWFvV2VpUGF5Iiwid2luZG93IiwiVVAiLCJXIiwiQXBwIiwiRW52IiwicmVnUGhvbmUiLCJyZWdQYXlOdW0iLCJ2ZXJzaW9uIiwic291cmNlIiwiYmFzZVVybCIsImJhc2VVcmwyIiwiYmFzZVVybDMiLCJsb2NhdGlvbiIsImhvc3RuYW1lIiwiaW5kZXhPZiIsInByb3RvY29sIiwiZ2V0U2VydlVybCIsInVybCIsInNlcnZlclVybCIsInVzZXJJbmZvIiwic3BsaXQiLCJnZXRDaXR5IiwicmVzcG9uc2VGb3JtYXR0ZXIiLCJwYXJhbXMiLCJtc2ciLCJkZWxldGVTbGFzaCIsImhvc3QiLCJyZXBsYWNlIiwiYWRkU2xhc2giLCJwYXRoIiwidGVzdCIsInNlcGFyYXRlUGFyYW1zIiwicGFyYW1zTGluZSIsImtleSIsImNvbmZpZyIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwiZmluYWxVcmwiLCJyZWplY3QiLCJvcHRpb25zIiwidHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsIkVycm9yIiwiZGF0YVR5cGUiLCIkIiwiYWpheCIsImdldCIsInBhcmFtQWxsIiwiZm9yQ2hzcCIsImVuY3J5cHQiLCJjYWNoZSIsImJ5QWpheCIsInBvc3QiLCJwdXQiLCJkZWwiLCJnZXRTZWFyY2hQYXJhbSIsInNlYXJjaCIsInN0ciIsInNsaWNlIiwiYXJyYXkiLCJvYmoiLCJzdWMiLCJlcnIiLCJhcHAiLCJzZXRYaWFvV2VpQXVkaW8iLCJnZXRYaWFvV2VpQXVkaW8iLCJ0b2FzdCIsIm1zIiwiVG9hc3QiLCJpbmZvIiwiYmVmb3JlRW50ZXJSb3V0ZXIiLCJ0aXRsZSIsInJpZ2h0QmFyIiwicmlnaHRDYWxsYmFjayIsInJpZ2h0QmFySW1nIiwiZG9jdW1lbnQiLCJvblBsdWdpblJlYWR5Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwic2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uIiwibWNjU3RhdGVDaGFuZ2VkIiwic2VuZFFyQ29kZSIsImZhaWwiLCJzY2FuUVJDb2RlIiwiY2xvc2VXZWJWaWV3IiwidmVyaWZ5UGF5UHdkIiwiY3JlYXRlV2ViVmlldyIsImlzRmluaXNoIiwiZ2V0VXNlckRldGFpbEluZm8iLCJzYXZlUWNvZGUiLCJjYW52YXMiLCJ1aSIsIlVJIiwicGljVXJsIiwidG9EYXRhVVJMIiwibG9nRXZlbnQiLCJzYXZlUGljVG9Mb2NhbCIsInN1YnN0ciIsInNob3dUb2FzdFdpdGhQaWMiLCJzaG93QWxlcnQiLCJlbnYiLCJpc0lPUyIsIm9wZW5Ccm93c2VyIiwic2hvd1RvYXN0Iiwic2hhcmUiLCJkZXNjIiwiaW1nVVJMIiwicGFnZVVSbCIsInNob3dTaGFyZVBhbmVsIiwic2hhcmVVcmwiLCJnZXRDdXJyZW50TG9jYXRpb25JbmZvIiwiY2FsbGJhY2syIiwic2hvd0xvYWRpbmciLCJjYWxsYmFjayIsImRpc21pc3MiLCJzZW5kTWVzc2FnZSIsImNtZCIsImZldGNoTmF0aXZlRGF0YSIsInhociIsImNyZWF0ZVRleHRDYW52YXNlIiwidGV4dCIsImNvbG9yIiwibG9uZyIsInNob3QiLCJyZW0ycHgiLCJ2YWwiLCJjV2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsInNldEF0dHJpYnV0ZSIsIndpZHRoIiwicm90YXRlIiwiTWF0aCIsIlBJIiwiZmlsbFN0eWxlIiwidGV4dEFsaWduIiwiZm9udFNpemUiLCJmb250IiwibWVhc3VyZVRleHQiLCJmaWxsVGV4dCIsImNyZWF0ZUNvbnZhc0FuZFNhdmVQaG90byIsImNhbnZhc09iaiIsImJndXJsIiwicXJjb2RlVVJMIiwicXJjb2RlV2RBbmRIZyIsInhXaWR0aCIsInlIZWlnaHQiLCJ0ZXh0YmdVUkwiLCJ4VGV4dFdpZHRoIiwieVRleHRIZWlnaHQiLCJpbWciLCJJbWFnZSIsInNyYyIsIm9ubG9hZCIsImhlaWdodCIsImRyYXdJbWFnZSIsInRleHRVcmkiLCJ0ZXh0SW1nIiwicXJjb2RlV2lkdGhBbmRIZWlnaHQiLCJpbm5lckhUTUwiLCJxcmNvZGUiLCJRUkNvZGUiLCJjb3JyZWN0TGV2ZWwiLCJDb3JyZWN0TGV2ZWwiLCJMIiwicXJjb2RlSW1nIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJxcmNvZGVEeCIsInFyY29kZUR5IiwiZ2V0TWF0ZXJpZWxJbmZvTGlzdCIsImdldFJld2FyZExpc3QiLCJDT05TVF9EQVRBIiwiaW1nZVNpemUiLCJjYWNoZUZpcnN0IiwidGltZSIsInN0b3JhZ2UiLCJ2YWxpZGF0ZVRpbWUiLCJjYWNoZUZpcnN0U3RvcmFnZSIsIm5lZWRTdyIsInN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSIsInJlZnJlc2hEb21GdW5jIiwicmVxIiwiZGF0YUZyb21DYWNoZSIsImdldEZyb21TdG9yYWdlIiwicmVtb3ZlU3RvcmFnZSIsImlzU2FtZUF0QWxsIiwiSW1tdXRhYmxlIiwiaXMiLCJmcm9tSlMiLCJhc3luYyIsImVuZE9mU3luY0Z1bmMiLCJyZW1vdmVDYWNoZSIsIlVwU3RvcmVJbmZvbWF0aW9uIiwicHJvcHMiLCJjb250ZXh0IiwiY2hhbmdlU3RvcmVOYW1lSGFuZGxlciIsIm5ldmVyQ2hhbmdlTmFtZSIsImNoYW5nZVN0b3JlTmFtZSIsImNsaWNrRXJyb3IiLCJpbnRvVmlldyIsImVsZSIsInNjcm9sbEludG9WaWV3Iiwic2Nyb2xsSW50b1ZpZXdJZk5lZWRlZCIsImhhbmRsZU5leHRDbGljayIsImlzRmFpbGJhY2siLCJoYW5kbGVDbGljayIsInN0b3JlbmFtZSIsIlN0cm9lQXJlYSIsImNoYW5nZVN0b3JlVHlwZSIsImNoYW5nZVN0b3JlQXJlYSIsImNoYW5nZVN0b3JlQWRkciIsImVyck1zZyIsInNob3dNc2ciLCJwYXJzZUludCIsImRpc2FibGVCdG4iLCJiaW5kIiwidiIsIlJlYWN0IiwiQ29tcG9uZW50IiwiQ3VzdG9tQ2hpbGRyZW4iLCJwbGFjZWhvbGRlckNsYXNzIiwiZXh0cmEiLCJub2RlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJhcHBlbmRDaGlsZCIsInN0eWxlIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJvbkNsaWNrIiwic3VibWl0SGFuZGxlQ2xpY2siLCJNb2RhbCIsImFsZXJ0Iiwib25QcmVzcyIsIlVwU3RvcmVJbmZvbWF0aW9uQ29udGFpbmVycyIsImhpc3RvcnkiLCJmYWlsUGljdHJ1ZU9iaiIsImhhc0ZhaWxQaWN0dXJlIiwicGF0aG5hbWUiLCJtYXBzdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRoVG9Qcm9wcyIsInN0b3JlVHAiLCJzdG9yZUFyZWEiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQVdnQkEsVyxHQUFBQSxXO1FBeUJBQyxRLEdBQUFBLFE7UUFpQkFDLE8sR0FBQUEsTztRQXVCQUMsTyxHQUFBQSxPO1FBb0JBQyxRLEdBQUFBLFE7UUEwQkFDLFcsR0FBQUEsVztRQWdEQUMsVyxHQUFBQSxXO1FBZ0NBQyxRLEdBQUFBLFE7UUFvQkFDLFksR0FBQUEsWTtRQW1CQUMsa0IsR0FBQUEsa0I7UUFtSEFDLGMsR0FBQUEsYztRQWdCQUMsVSxHQUFBQSxVO1FBZ0NBQyxlLEdBQUFBLGU7UUFlQUMsZ0IsR0FBQUEsZ0I7UUFlQUMs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QUFDLHNCQUFnQjtBQUN4QixVQUFVLG1CQUFPLENBQUMsc0JBQVM7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGdEQUFnRCxtQkFBTyxDQUFDLHNCQUFnQjtBQUN4RTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiY2h1bmsvVXBTdG9yZUluZm9tYXRpb24uMjViNWJjMjFjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y29tb21QYXJhbSwgZ2V0LCBwb3N0LCBVdGlsfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7fSBmcm9tIFwiLi9jYWNoZVN0b3JhZ2VcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gXCIuLi8uLi9zdG9yZS9zdG9yZVwiO1xyXG5pbXBvcnQge1VQREFURV9TVE9SRV9TVEFURX0gZnJvbSBcIi4uLy4uL3N0b3JlL2FjdGlvblwiO1xyXG5pbXBvcnQge2NhY2hlRmlyc3QsY2FjaGVGaXJzdFN0b3JhZ2Usc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlLHJlbW92ZUNhY2hlfSBmcm9tIFwiLi9jYWNoZVN0b3JhZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiDnlLPor7fnuqLljIXnoIHnmoTor7fmsYJcclxuICogQHBhcmFtIHBob25lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVjbWRSZWNvcmQocGhvbmUpIHtcclxuICAgIGlmIChwaG9uZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBwaG9uZSA9IFwiXCJcclxuICAgIH1cclxuICAgIGxldCByZWNtZE1vYmlsZSA9IFV0aWwuYmFzZTY0RW5jb2RlKHBob25lKVxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QucmVjbWRSZWNvcmQsIHtyZWNtZE1vYmlsZX0pLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpueUs+ivt+e6ouWMheeggeaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXlcclxuICAgICAgICAgICAgfSwoKT0+e30sKCk9PntcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDor7fmsYLnuqLljIXlkJfov57mjqVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFybGluaygpIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnNoYXJlTGluaywge30pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICBsZXQgcmVkVXJsU3RyPSBcImh0dHBzOi8vd2FsbGV0Ljk1NTE2LmNvbS9zL3dsL3dlYlYzL2FjdGl2aXR5L3ZNYXJrZXRpbmcyL2h0bWwvc25zSW5kZXguaHRtbD9yPVwiICsgcmVzcG9uc2UuZGF0YS5pZGVudGlmaWVyO1xyXG4gICAgICAgICAgICBsZXQgbmV4dFN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgcmVkVXJsU3RyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKG5leHRTdGF0ZSkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVkVXJsU3RyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOaYr+WQpuWcqOeZveWQjeWNleeahOivt+axglxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQmxhY2sodXBkYXRlKSB7XHJcbiAgICBsZXQgdXBkYXRlRnVuYyA9IGZ1bmN0aW9uKHJlc3Ape1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGJsYWNrU3Q6cmVzcC5kYXRhLmJsYWNrU3RcclxuICAgICAgICB9KSlcclxuICAgICAgICBjb25zb2xlLmxvZygnaXNCbGFjazogdXBkYXRl5Ye95pWw5omn6KGM5a6M5q+VJyk7XHJcbiAgICAgICAgaWYoIHR5cGVvZiB1cGRhdGUgPT09ICdmdW5jdGlvbicgKXtcclxuICAgICAgICAgICAgdXBkYXRlKHJlc3ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v6K+75Y+W57yT5a2Y77yM5ZCM5pe25byC5q2l5Y+R6YCB6K+35rGCXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5pc0JsYWNrLHt9LHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSh1cGRhdGVGdW5jKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYmxhY2tTdDpyZXNwb25zZS5kYXRhLmJsYWNrU3RcclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKblnKjpu5HlkI3ljZXnmoTor7fmsYJcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNBcHBseSgpIHtcclxuICAgIGxldCBjYWNoZVBhcmFtID0gY2FjaGVGaXJzdFN0b3JhZ2UoMzAqNjAqMTAwMCxDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXkpOy8v57yT5a2YMzDliIbpkp9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuaXNBcHBseSwge30sY2FjaGVQYXJhbSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5hcHBseVN0ICE9IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDlpoLmnpzlt7Lnu4/nlLPor7fov4fnuqLljIXnoIHliJnnvJPlrZgzMOWIhumSn++8jOWQpuWImeS4jee8k+WtmFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5KVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBhcHBseVN0OnJlc3BvbnNlLmRhdGEuYXBwbHlTdFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOeUs+ivt+aUtuasvueggVxyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNY2MocGFyYW0gPSB7XHJcbiAgICByZWZlcmVlVGVsOiBcIlwiLCAgICAgICAgIC8v5o6o6I2Q5Lq65omL5py65Y+3XHJcbiAgICB2aXJ0dWFsQ2FyZE5vOiBcIlwiLCAgICAgIC8v6Jma5ouf5Y2h5Y+3XHJcbiAgICBhY2NObTogXCJcIiwgICAgICAgICAgICAgIC8v5bqX6ZO65ZCN56ewXHJcbiAgICBjaXR5Q2Q6IFwiXCIgICAgICAgICAgICAgICAvL+WfjuW4guS7o+eggVxyXG59KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5hcHBseU1jYywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpueUs+ivt+e6ouWMheeggeaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXlcclxuICAgICAgICAgICAgfSwoKT0+e30sKCk9PntcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTpk7booYzljaHliJfooahcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDYXJkbGlzdCgpIHtcclxuICAgIC8v6I635Y+W55So5oi36ZO26KGM5Y2h5YiX6KGo77yM57yT5a2YMeWIhumSn1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRNY2NDYXJkTGlzdCwgY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSg2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAvL+WmguaenOWQjuWPsOi/lOWbnumTtuihjOWNoeWIl+ihqOS4lOS4jeS4uuepulxyXG4gICAgICAgIGlmICghIXJlc3BvbnNlLmRhdGEuY2FyZExpc3QgJiYgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5sZW5ndGggIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgLy/liJ3lp4vljJbpu5jorqTljaFcclxuICAgICAgICAgICAgbGV0IGRlZmFsdXRDYXJkID0ge1xyXG4gICAgICAgICAgICAgICAgYmFuazogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeaJgOWcqOeahOmTtuihjFxyXG4gICAgICAgICAgICAgICAgY2FyZFR5cGU6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h57G75Z6LXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbkJpdG1hcDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHlip/og73kvY1cclxuICAgICAgICAgICAgICAgIGljb25SZWxVcmw6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeeahGxvZ2/lnLDlnYBcclxuICAgICAgICAgICAgICAgIGlzU3VwcG9ydDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5pSv5oyBXHJcbiAgICAgICAgICAgICAgICBwYW46IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W4puacieaOqeeggeeahOWNoeWPt1xyXG4gICAgICAgICAgICAgICAgcmFuazogMCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm6YCJ5LitXHJcbiAgICAgICAgICAgICAgICB2aXJ0dWFsQ2FyZE5vOiBcIlwiICAgLy/omZrmi5/ljaHlj7dcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuY2FyZExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhaXRlbS5zZWxlY3RlZCAmJiBpdGVtLmlzU3VwcG9ydCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYWx1dENhcmQgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL+WmguaenOayoeaciem7mOiupOmAieS4reeahOWNoeWPluS4gOS4quS4jeiiq+e9ruS4uueBsOeahOWNoeS4uum7mOiupOWNoVxyXG4gICAgICAgICAgICBpZiAoZGVmYWx1dENhcmQuYmFuay5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZXNwb25zZS5kYXRhLmNhcmRMaXN0Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuY2FyZExpc3Rba10uaXNTdXBwb3J0ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYWx1dENhcmQgPSByZXNwb25zZS5kYXRhLmNhcmRMaXN0W2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0b3JlU3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yZVJlY2VpdmVDYXJkT2JqOiBkZWZhbHV0Q2FyZCxcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0OiByZXNwb25zZS5kYXRhLmNhcmRMaXN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHN0b3JlU3RhdGUpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWcsOWdgOWIl+ihqFxyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWRkckxpc3QoXHJcbiAgICB1cGRhdGUsIC8v57yT5a2Y55qE5pu05paw5Ye95pWwXHJcbiAgICBwYXJhbSA9IHtcclxuICAgICAgICBzdGF0ZTogXCJcIiAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuKSB7XHJcbiAgICAvLyDor7vlj5bnvJPlrZjvvIzlkIzml7blvILmraXlj5HpgIHor7fmsYJcclxuICAgIGxldCB1cGRhdGVGdW5jID0gZnVuY3Rpb24ocmVzcCl7XHJcbiAgICAgICAgLy8g5ZyodXBkYXRl5Ye95pWw5Lit77yM5pu05pawcmVkdXjkuK3nmoRhZGRyZXNzTGlzdFxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7YWRkcmVzc0xpc3Q6cmVzcC5kYXRhLnJlc3VsdHx8W119KSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEFkZHJMaXN0OiB1cGRhdGXlh73mlbDmiafooYzlrozmr5UnKTtcclxuICAgICAgICBpZiggdHlwZW9mIHVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXNwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSh1cGRhdGVGdW5jLENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpO1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0QWRkckxpc3QsIE9iamVjdC5hc3NpZ24oe30sIGNvbW9tUGFyYW0sIHBhcmFtKSxjYWNoZVBhcmFtKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgYWRkcmVzc0xpc3QgPSByZXNwb25zZS5kYXRhLnJlc3VsdCB8fCBbXTtcclxuXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYWRkcmVzc0xpc3RcclxuICAgICAgICB9KSlcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnlLPor7fnianmlpnmjqXlj6NcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWF0KHBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+eJqeaWmeWIl+ihqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2Tm06IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+S6ulxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEFsbDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWMuuWQjeensFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2UGhvbmU6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+eUteivnVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ecgUlEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5biCSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDljLpJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3NJbmZvOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ivpue7huWcsOWdgFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnJywgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWdgOeahElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eU5tOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5omA5Zyo5Z+O5biCQ2l0eUNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRVcmw6IFwiXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nuqLljIXnoIHlnLDlnYAgIOWPr+mAieWPguaVsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuYXBwbHlNYXQsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5ZWG5oi35pS25qy+56CB5Zyw5Z2A5ZKM5ZWG5oi357yW5Y+3XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXJVcmxSZXN0KCkge1xyXG4gICAgLy/nvJPlrZgy5bCP5pe2XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFFyVXJsLCBjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBtY2hudERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgcXJVcmw6IHJlc3BvbnNlLmRhdGEucXJVcmwsXHJcbiAgICAgICAgICAgICAgICBxck51bTogcmVzcG9uc2UuZGF0YS5xck51bVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKuiOt+WPluW6l+mTuuWMuuWfn+WIl+ihqOWSjOW6l+mTuuexu+Wei+WIl+ihqFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNobnRBbmRBcmVhSW5mKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+Z5Liq5o6l5Y+jLOWPqui1sHN377yM5LiN6LWwbG9hY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICAvLyBsZXQgY2FjaGVQYXJhbSA9IHtcclxuICAgIC8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4gICAgLy8gICAgIGZvckNoc3A6ZmFsc2UsXHJcbiAgICAvLyAgICAgZW5jcnlwdDpmYWxzZSxcclxuICAgIC8vICAgICBjYWNoZTogdHJ1ZVxyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRNY2hudEFuZEFyZWFJbmYsIGNvbW9tUGFyYW0sIGNhY2hlRmlyc3QoMjQqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgbGV0IGFyZWEgPSBbXSwgbWVyY2hhbnRUcCA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOecgee6p1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5hcmVhQXJyLmZvckVhY2goKHByb3ZpbmNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9uZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHByb3ZpbmNlLnByb0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogcHJvdmluY2UucHJvTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHByb3ZpbmNlLnByb05tID09IFwi5YyX5Lqs5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLkuIrmtbfluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIuWkqea0peW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi6YeN5bqG5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLmt7HlnLPluIJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogcHJvdmluY2UucHJvSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogcHJvdmluY2UucHJvTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlLmNpdHkuZm9yRWFjaCgoY2l0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhyZWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGNpdHkuY2l0eUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBjaXR5LmNpdHlObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhyZWUudmFsdWUgIT0gdHdvLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d28uY2hpbGRyZW4ucHVzaCh0aHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgKiDluILnuqdcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBwcm92aW5jZS5jaXR5LmZvckVhY2goKGNpdHkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGNpdHkuY2l0eUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBjaXR5LmNpdHlObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIOWMuue6p1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5hcmVhLmZvckVhY2goKGFyZWEpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhyZWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBhcmVhLmFyZWFJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IGFyZWEuYXJlYU5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d28uY2hpbGRyZW4ucHVzaCh0aHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYXJlYS5wdXNoKG9uZSk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLm1lcmNoYW50VHBBcnIuZm9yRWFjaCgobWVyVHlwZTEpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvbmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtZXJUeXBlMS5tZXJjaGFudFRwQ2QsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBtZXJUeXBlMS5tZXJjaGFudFRwTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1lclR5cGUxLm1lcmNoYW50VHBBcnIuZm9yRWFjaCgobWVyVHlwZTIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IG1lclR5cGUyLm1lcmNoYW50VHBDZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBtZXJUeXBlMi5tZXJjaGFudFRwTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIG1lcmNoYW50VHAucHVzaChvbmUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV4dFN0YXRlID0ge1xyXG4gICAgICAgICAgICBtY2hudEFuZEFyZWFJbmY6IHtcclxuICAgICAgICAgICAgICAgIGFyZWFBcnI6IGFyZWEsXHJcbiAgICAgICAgICAgICAgICBtZXJjaGFudFRwQXJyOiBtZXJjaGFudFRwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKG5leHRTdGF0ZSkpXHJcblxyXG4gICAgfSlcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5blupfpk7ror6bmg4Xkv6Hmga9cclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNobnREZXRhaWwoKSB7XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IGNhY2hlRmlyc3RTdG9yYWdlKDYwKjEwMDAsQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7Ly/nvJPlrZgx5YiG6ZKfXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRNY2hudERldGFpbCwgY29tb21QYXJhbSxjYWNoZVBhcmFtKS50aGVuKChyZXNwKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3Auc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgbGV0IG1jaG50RGV0YWlsID0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe21jaG50RGV0YWlsfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1jaG50RGV0YWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5Y2H57qn5ZWG6ZO65LqM57u056CBXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGdyYWRlTWNjKHBhcmFtPXtcclxuICAgIHN0b3JlTm06IFwiXCIsICAgIC8v5bqX6ZO65ZCN56ewXHJcbiAgICBTdG9yZVRwOiBcIlwiLCAgICAvL+W6l+mTuuexu+Wei1xyXG4gICAgcHJvdkNkOiBcIlwiLCAgICAgLy/nnIFJRFxyXG4gICAgY2l0eUNkOiBcIlwiLCAgICAgLy/luIJJRFxyXG4gICAgY291dHlDZDogXCJcIiwgICAgLy/ljLpJRFxyXG4gICAgYWRkcjogXCJcIiwgICAgICAgLy/lnLDlnYBcclxuICAgIGNlcnRpZlBpYzE6IFwiXCIsIC8v6Lqr5Lu96K+B5q2j6Z2i54WnXHJcbiAgICBjZXJ0aWZQaWMyOiBcIlwiLCAvL+i6q+S7veivgeWPjemdoueFp1xyXG4gICAgY2VydGlmUGljMzogXCJcIiwgLy/miYvmjIHouqvku73or4HnhafniYdcclxuICAgIGxpY2Vuc2VQaWM6IFwiXCIsIC8v6JCl5Lia5omn54WnXHJcbiAgICBzaG9wUGljMTogXCJcIiwgICAvL+W6l+mTuueFp+eJhzFcclxuICAgIHNob3BQaWMyOiBcIlwiLCAgIC8v5bqX6ZO654Wn54mHMlxyXG4gICAgYXV4UHJvdk1hdDE6IFwiXCIsLy/ovoXliqnnhafniYcxXHJcbiAgICBhdXhQcm92TWF0MjogXCJcIiwvL+i+heWKqeeFp+eJhzJcclxuICAgIHNob3BMb2dvUGljOiBcIlwiIC8v5bqX6ZO6TE9HT1xyXG59KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC51cGdyYWRlTWNjLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk5bqX6ZO66K+m5oOF55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpO1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpuWNh+e6p+eahOaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Qucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0LnNlY29uZEtleSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTljY/orq7nvJblj7flkozljY/orq7lkI3np7BcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvdG9jb2xJbmZvKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiDov5nkuKrmjqXlj6Ms57yT5a2YMuWwj+aXtlxyXG4gICAgICovXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFByb3RvY29sSW5mbywgY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZS5kYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDljoblj7LmlLbmrL5cclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlzdG9yeUluY29tZShwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0SGlzdG9yeUluY29tZSwgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeUluY29tZU9iajogcmVzLmRhdGFcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5Y6G5Y+y6K6i5Y2VXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpc3RvcnlUcmFucyhwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0SGlzdG9yeVRyYW5zLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBsZXQgb3JpZ2luTGlzdERhdGEgPSBzdG9yZS5nZXRTdGF0ZSgpLmdldEluKFsnaGlzdG9yeU9yZGVyTGlzdCddKS50b0pTKClcclxuICAgICAgICAgICAgbGV0IG5ld0xpc3QgPSByZXMuZGF0YS50cmFuc0luZm87XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0xpc3QpXHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5T3JkZXJMaXN0OiBvcmlnaW5MaXN0RGF0YS5jb25jYXQobmV3TGlzdClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5LuK5pel5pS25qy+XHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5SW5jb21lKCkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VG9kYXlJbmNvbWUsY29tb21QYXJhbSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgdG9kYXlJbmNvbWVPYmo6IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDku4rml6XorqLljZVcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9kYXlUcmFucyhwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VG9kYXlUcmFucywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgbGV0IG9yaWdpbkxpc3REYXRhID0gc3RvcmUuZ2V0U3RhdGUoKS5nZXRJbihbJ3RvZGF5T3JkZXJMaXN0J10pLnRvSlMoKVxyXG4gICAgICAgICAgICBsZXQgbmV3TGlzdCA9IHJlcy5kYXRhLnRyYW5zSW5mbztcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIHRvZGF5T3JkZXJMaXN0OiBvcmlnaW5MaXN0RGF0YS5jb25jYXQobmV3TGlzdClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5Y2V56yU5p+l6K+iXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0ocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0sT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSlcclxufVxyXG4vKipcclxuICog6I635Y+W54mp5rWB5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naXN0aWNzU3QocGFyYW0pe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRMb2dpc3RpY3NTdCwgT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICBsZXQgbmV3T2JqID0gcmVzLmRhdGEuZGVsaXZlcnlNc2c7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBuZXdPYmoubWF0RGVsaXZTdGF0dXMg55qE54q25oCB5ZKMcmVkdXjnmoRzdG9yZeS/neaMgeS4gOiHtFxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIG5ld09iai5tYXREZWxpdlN0YXR1cyA9IHJlcy5kYXRhLm1hdERlbGl2U3RhdHVzO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgZGVsaXZlcnlNc2c6IG5ld09ialxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDllYbmiLfmnI3liqHpppbpobUg54K55Ye75L+h55So5Y2h5oyJ6ZKu5p+l6K+i5ZWG5oi35piv5ZCm5byA6YCa6L+H5L+h55So5Y2h5pS25qy+XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXBncmFkZVN0KCl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFVwZ3JhZGVTdCwgY29tb21QYXJhbSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnianmlpnljoblj7LorqLljZVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpc3RpY3NMaXN0KHBhcmFtKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TG9naXN0aWNzTGlzdCxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5p+l6K+i5L+h55So5Y2h5pS25qy+5Y2H57qn54q25oCBXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXVkaXRJbmZvKCl7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRBdWRpdEluZm8sIGNvbW9tUGFyYW0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bmlLbmrL7pmZDpop3or6bmg4VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW1pdEF0SW5mbygpe1xyXG4gICAgLy/nvJPlrZgy5Liq5bCP5pe2XHJcbiAgICBwb3N0KENPTkZJRy5SRVNULmdldExpbWl0QXRJbmZvLGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcCk9PntcclxuICAgICAgICBpZiggcmVzcC5zdGF0dXNDb2RlID0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyApe1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe2xpbWl0SW5mbzpyZXNwLmRhdGF9KSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5pu05paw5bqX6ZO66K+m5oOFXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g5bqX6ZO66K+m5oOF5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWNobnRPcGVyKHBhcmFtID17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBncmFkZU1jYyAsIE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpG1jaG50RGV0YWls57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7IFxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKDpmaTlnLDlnYDkv6Hmga9cclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVBZGRyZXNzKHBhcmFtPXtcclxuICAgIGlkOicnIC8v5Zyw5Z2AaWRcclxufSl7XHJcbiAgICBcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmRlbGV0ZUFkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBhcmFtKTtcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5pu05paw5pS25qy+6ZO26KGM5Y2hXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWNjQ2FyZChwYXJhbT17XHJcbiAgICB2aXJ0dWFsQ2FyZE5vOicnIC8v6Jma5ouf5Y2h5Y+3XHJcbn0pIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBkYXRlTWNjQ2FyZCxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/mjaLljaHlkI7vvIzmuIXpmaTlupfpk7ror6bmg4XnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7IFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmlrDlop7lnLDlnYBcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor6bnu4bnmoTlnLDlnYDkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdBZGRyZXNzKHBhcmFtPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5uZXdBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1Mpe1xyXG4gICAgICAgICAgICAvLyDliKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOS/ruaUueWcsOWdgOS/oeaBr1xyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivpue7hueahOWcsOWdgOS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRBZGRyZXNzKHBhcmFtPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5lZGl0QWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgLy/liKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDlkK/lgZzmlLbmrL7noIHmnI3liqFcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNY2NPbk9mZihwYXJhbT17XHJcbiAgICBpc1VzZU1jYzonJyAgLy/mmK/lkKbkvb/nlKjmlLbmrL7noIHmnI3liqFcclxuIH0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnNldE1jY09uT2ZmLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpOW6l+mTuuivpuaDhee8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOyBcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDojrflj5blkIrotbfmlK/ku5jmjqfku7bnmoRUTuWPt1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jY1RyYW5zTnVtKCl7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRNY2NUcmFuc051bSkudGhlbigocmVzcCk9PntcclxuICAgICAgICBpZiggcmVzcC5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MgKXtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7bWNjVHJhbnNOdW06cmVzcC5kYXRhLnRyYW5zTnVtfSlcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJLmpzIiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgc2FmZSkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgaWYgKHNhZmUgJiYgdGFyZ2V0W2tleV0pIHRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNGRjMWY3ZWJkODBkMTViZmQzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjc5ODUxYmUyN2IyNjhlYTI0ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFkZmFjMjg1MjNhZTM3ZGFjNWJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjUxYmM3YWZlODEyN2UwOTE0OWRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDI4Y2ZmODZlMWQ1MWViZjIxZjdmXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAzYzI0ZDM4ZmZjZDBjMzhlMzQ3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNTNiN2QzNDgxNzE0NGIxMmIwYWFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDVlNTliNzFiMzNhMzhjMzYxOGU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1ZTc0OTFmMWY3OTk3MTVlYWM3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDZhNDQyYWI1YmQ5YmQ5Mjk0NDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8qXHJcbiAgIEFQSSDmjqXlj6PphY3nva5cclxuICAgYXhpb3Mg5Y+C6ICD5paH5qGj77yaaHR0cHM6Ly93d3cua2FuY2xvdWQuY24veXVueWUvYXhpb3MvMjM0ODQ1XHJcblxyXG4qL1xyXG4vLyBpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnYW50ZC1tb2JpbGUvbGliL3RvYXN0JztcclxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnXCJcclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKlxyXG4qIOW4uOmHj+WumuS5ieWMulxyXG4qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBjb25zdCBVdGlsID0gd2luZG93LlVQLlcuVXRpbDtcclxuXHJcbmV4cG9ydCBjb25zdCBBcHAgPSBVUC5XLkFwcDtcclxuXHJcbmV4cG9ydCBjb25zdCBFbnYgPSBVUC5XLkVudjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGhvbmUgPSAvXigxM1swLTldfDE0WzU3OV18MTVbMC0zLDUtOV18MTZbNl18MTdbMDEzNTY3OF18MThbMC05XXwxOVs4OV0pXFxkezh9JC87XHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGF5TnVtID0gL15bMC05XXsyMH0kLztcclxuXHJcbmV4cG9ydCBjb25zdCBjb21vbVBhcmFtID0ge1xyXG4gICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgIHNvdXJjZTogXCIyXCJcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiDor7fmsYLmoLjlv4PljLog5LiL6Z2i6L+Z5Z2X5Yy65Z+f5Lit55qE5Luj56CB5pS55Yqo6K+35oWO6YeNXHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5sZXQgYmFzZVVybCA9IFwiXCIsIGJhc2VVcmwyID0gXCJcIiwgYmFzZVVybDMgPSBcIlwiO1xyXG5pZiAobG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignOTU1MTYuY29tJykgIT09IC0xKSB7IC8v55Sf5Lqn546v5aKDXHJcbiAgICBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vc2hhbmdodS45NTUxNi5jb20vd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDIgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9tYWxsLjk1NTE2LmNvbS9jcXAtaW50LW1hbGwtd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICBiYXNlVXJsMyA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL3lvdWh1aS45NTUxNi5jb20veW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2UgaWYgKGxvY2F0aW9uLmhvc3RuYW1lLmluZGV4T2YoJzE3Mi4xOC4xNzkuMTAnKSAhPT0gLTEpIHsgLy/mtYvor5Xnjq/looNcclxuICAgIC8vIGJhc2VVcmw9XCJodHRwOi8vMTcyLjIxLjEwMS4yNTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7IC8v5rWL6K+V5a6kYXBhY2hlXHJcbiAgICAvL2Jhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjk1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+W8gOWPkeeOr+Wig2FwYWNoZVxyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4xMzMuMjU6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2Uge1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuOTU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuMjU6MzgyMTAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMTMzLjI1OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjMzLjU2OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufVxyXG4vKipcclxuICog6YCa6L+H5ZCO57yA6I635Y+W5pyN5Yqh5Zmo55qE5YWo5Zyw5Z2AXHJcbiAqIEBwYXJhbSB1cmxcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZXJ2VXJsID0gKHVybCkgPT4ge1xyXG4gICAgbGV0IHNlcnZlclVybCA9IFwiXCJcclxuICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QudXNlckluZm8pIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgLy8gZWxzZSBpZiAodXJsLnNwbGl0KFwiL1wiKVswXSA9PSBcImFkZHJlc3NcIikge1xyXG4gICAgLy8gICAgIHNlcnZlclVybCA9IGJhc2VVcmwyXHJcbiAgICAvLyB9XHJcbiAgICBlbHNlIGlmICh1cmwuc3BsaXQoXCIvXCIpWzBdID09IFwic2NhblwiIHx8IHVybCA9PSBDT05GSUcuUkVTVC5nZXRDaXR5KSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gYmFzZVVybDNcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHNlcnZlclVybCA9IGJhc2VVcmxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VydmVyVXJsO1xyXG59XHJcblxyXG4vKipcclxuICog5qC85byP5YyW57uT5p6cIOWwhue7k+aenOagvOW8j+WMluS4ulxyXG4gKiB7XHJcbiAqICAgICBzdGF0dXNDb2RlICAg5ZCO5Y+w5ZON5bqU56CBXHJcbiAqICAgICBkYXRhICAgICAgICAg5ZCO5Y+w6L+U5Zue55qE5pWw5o2uXHJcbiAqICAgICBtc2cgICAgICAgICAg5ZCO5Y+w55qE5o+Q56S65L+h5oGvXHJcbiAqIH1cclxuICogQHBhcmFtIGRhdGFcclxuICogQHJldHVybnMge3tzdGF0dXNDb2RlOiAoc3RyaW5nfCopLCBkYXRhOiAqLCBtc2c6ICp9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlRm9ybWF0dGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCByZXMgPSB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5yZXNwLFxyXG4gICAgICAgIGRhdGE6IGRhdGEucGFyYW1zLFxyXG4gICAgICAgIG1zZzogZGF0YS5tc2dcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vLyDliKDpmaTlupXpg6ggJy8nXHJcbmZ1bmN0aW9uIGRlbGV0ZVNsYXNoKGhvc3QpIHtcclxuICAgIHJldHVybiBob3N0LnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbn1cclxuXHJcbi8vIOa3u+WKoOWktOmDqCAnLydcclxuZnVuY3Rpb24gYWRkU2xhc2gocGF0aCkge1xyXG4gICAgcmV0dXJuIC9eXFwvLy50ZXN0KHBhdGgpID8gcGF0aCA6IGAvJHtwYXRofWA7XHJcbn1cclxuXHJcbi8vIOino+aekOWPguaVsFxyXG5mdW5jdGlvbiBzZXBhcmF0ZVBhcmFtcyh1cmwpIHtcclxuICAgIGNvbnN0IFtwYXRoID0gJycsIHBhcmFtc0xpbmUgPSAnJ10gPSB1cmwuc3BsaXQoJz8nKTtcclxuXHJcbiAgICBsZXQgcGFyYW1zID0ge307XHJcblxyXG4gICAgcGFyYW1zTGluZS5zcGxpdCgnJicpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gaXRlbS5zcGxpdCgnPScpO1xyXG5cclxuICAgICAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtwYXRoLCBwYXJhbXN9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZyl7XHJcbiAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge319ID0gY29uZmlnO1xyXG4gICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4gICAgbGV0IHNlcnZlclVybCA9ICdodHRwOi8vMTI3LjAuMC4xOjMwMDAvJztcclxuICAgIGxldCBmaW5hbFVybCA9IHNlcnZlclVybCArIHVybDtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHVybDpmaW5hbFVybCxcclxuICAgICAgICAgICAgdHlwZTptZXRob2QsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAnMjAwJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZUZvcm1hdHRlcihyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcign6K+35rGC5aSx6LSlJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYoIG1ldGhvZCA9PT0gJ1BPU1QnICl7XHJcbiAgICAgICAgICAgICBvcHRpb25zLmRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgIG9wdGlvbnMuZGF0YVR5cGUgPSAnanNvbidcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgob3B0aW9ucyk7XHJcbiAgICB9KVxyXG4gICAgXHJcbn1cclxuXHJcbi8vIOS4u+imgeivt+axguaWueazlVxyXG4vLyBleHBvcnQgIGZ1bmN0aW9uIHJlcXVlc3RPcmlnaW4oY29uZmlnKSB7XHJcblxyXG4vLyAgICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbi8vICAgICBjb25zdCB1aSA9IFVQLlcuVUk7XHJcbi8vICAgICBjb25zdCBlbnYgPSBVUC5XLkVudjtcclxuXHJcbi8vICAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge30sIGhlYWRlcnMsIGZvckNoc3AsIGVuY3J5cHQsIGJ5QWpheCwgY2FjaGUsIHVwZGF0ZSwgc3RvcmFnZX0gPSBjb25maWc7XHJcblxyXG4vLyAgICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4vLyAgICAgbGV0IHNlcnZlclVybCA9IGdldFNlcnZVcmwodXJsKTtcclxuXHJcbi8vICAgICAvLyBsZXQgc2VydmVyVXJsID0gYmFzZVVybCA7XHJcbi8vICAgICAvLyBpZiAodHJ1ZSkge1xyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4fmj5Lku7blj5HpgIHor7fmsYJcclxuLy8gICAgICAqL1xyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKiBAcGFyYW0gcGFyYW1zIOivt+axguWPguaVsFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB2ZXJzaW9u77ya54mI5pys77yM6buY6K6k5pivMS4wXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHNvdXJjZe+8muadpea6kO+8jOm7mOiupOagueaNrkFuZHJvaWTjgIFpT1Poh6rliqjmt7vliqBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgZW5jcnlwdO+8muaYr+WQpuWKoOWvhu+8jOm7mOiupOWKoOWvhlxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBtZXRob2TvvJror7fmsYLmlrnms5XvvIxQT1NU5oiWR0VUXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIGNtZO+8muivt+axguWRveS7pO+8iOS5n+WPr+iHquihjOWwhmNtZOe7hOijheiHs3VyaVvkvJjmg6DlkI7lj7Bd5oiWcGF0aFvpkrHljIXlkI7lj7Bd77yJXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHVyaS9wYXRo77ya6K+35rGC5Zyw5Z2A77yM5bu66K6u5LuF5aGr5YWFY21k77yM5LiN5bu66K6u6Ieq6KGM57uE6KOFdXJpL3BhdGhcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgcGFyYW1z77ya5Y+R6YCB57uZ5ZCO5Y+w55qE5Y+C5pWwXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHZpZO+8muWmguaenOmAmui/h0FqYXjmlrnlvI/lkJF3YWxsZXTlkI7lj7Dlj5HpgIHor7fmsYLpnIDopoHmkLrluKZ2aWRcclxuLy8gICAgICAqIEBwYXJhbSBmb3JDaHNwIOaYr+WQpuWQkeS8mOaDoOWQjuWPsOWPkemAgeivt+axgu+8iOm7mOiupOWQkeaJi+acuuWQjuWPsOWPkemAgeivt+axgu+8iVxyXG4vLyAgICAgICogQHBhcmFtIGJ5QWpheCDmmK/lkKbkvb/nlKhBamF45Y+R6YCB6K+35rGC77yI6buY6K6k5L2/55So5o6n5Lu277yJXHJcbi8vICAgICAgKiBAcGFyYW0gc3VjY2VzcyDmiJDlip/lm57osINcclxuLy8gICAgICAqIEBwYXJhbSBlcnJvciDplJnor6/lm57osIPvvIjkuJrliqHplJnor6/vvIlcclxuLy8gICAgICAqIEBwYXJhbSBmYWlsIOWksei0peWbnuiwg++8iOivt+axguWksei0pe+8iVxyXG4vLyAgICAgICovXHJcbi8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4vLyAgICAgICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuXHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgc3VjY2Vzc0NhbGxiYWNrID0gKGRhdGEsZnVjKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuaIkOWKn+e7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuLy8gICAgICAgICAgICAgICAgIGxldCByZXEgPSByZXNwb25zZUZvcm1hdHRlcihkYXRhKTtcclxuLy8gICAgICAgICAgICAgICAgIGlmKCAhIWZ1YyApe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlcS5mdWMgPSBmdWM7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcSlcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGVycm9yQ2FsbGJhY2sgPSAoZXJyKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuWksei0pee7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QuYXBwbHlNY2MgfHwgdXJsID09IENPTkZJRy5SRVNULmFwcGx5TWF0IHx8IHVybCA9PSBDT05GSUcuUkVTVC50b2RheU1vbmV5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJlc3BvbnNlRm9ybWF0dGVyKGVycik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXEpXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBUb2FzdC5pbmZvKGVyci5tc2cgfHwgJ+afpeivouS4muWKoeimgee0oOWHuumUme+8jOivt+eojeWQjuWGjeivle+8gScpO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgbmV0d29ya0NhbGxiYWNrID0gKHhocikgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgVG9hc3QuaW5mbyh4aHIubXNnKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuXHJcbi8vICAgICAgICAgICAgIGlmICh1cmwgIT0gQ09ORklHLlJFU1QuZ2V0VG9kYXlJbmNvbWUpIHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLnNob3dMb2FkaW5nKCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGlmICghY2FjaGUpIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJQYXJhbTpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHtcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgZW5jcnlwdDogZW5jcnlwdCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBmb3JDaHNwOiBmb3JDaHNwLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGJ5QWpheDogYnlBamF4XHJcbi8vICAgICAgICAgICAgICAgICAvLyB9KVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHpnZ7nvJPlrZjor7fmsYJcIilcclxuLy8gICAgICAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZShcclxuLy8gICAgICAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cmk6c2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjayk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNhY2hlVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdG9yZWFnZeetlueVpeaYrzpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2UpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInVwZGF0ZeWHveaVsDpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVwZGF0ZSlcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB57yT5a2Y6K+35rGCXCIpXHJcbi8vICAgICAgICAgICAgICAgICAvKipcclxuLy8gICAgICAgICAgICAgICAgICAqIOWQkeacjeWKoeWZqOWPkemAgeivt+axglxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHBhcmFtcyDor7fmsYLlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmVyc2lvbu+8mueJiOacrO+8jOm7mOiupOaYrzEuMFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzb3VyY2XvvJrmnaXmupDvvIzpu5jorqTmoLnmja5BbmRyb2lk44CBaU9T6Ieq5Yqo5re75YqgXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuY3J5cHTvvJrmmK/lkKbliqDlr4bvvIzpu5jorqTliqDlr4ZcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbWV0aG9k77ya6K+35rGC5pa55rOV77yMUE9TVOaIlkdFVFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBjbWTvvJror7fmsYLlkb3ku6TvvIjkuZ/lj6/oh6rooYzlsIZjbWTnu4Too4Xoh7N1cmlb5LyY5oOg5ZCO5Y+wXeaIlnBhdGhb6ZKx5YyF5ZCO5Y+wXe+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB1cmkvcGF0aO+8muivt+axguWcsOWdgO+8jOW7uuiuruS7heWhq+WFhWNtZO+8jOS4jeW7uuiuruiHquihjOe7hOijhXVyaS9wYXRoXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHBhcmFtc++8muWPkemAgee7meWQjuWPsOeahOWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2aWTvvJrlpoLmnpzpgJrov4dBamF45pa55byP5ZCRd2FsbGV05ZCO5Y+w5Y+R6YCB6K+35rGC6ZyA6KaB5pC65bimdmlkXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZm9yQ2hzcCDmmK/lkKblkJHkvJjmg6DlkI7lj7Dlj5HpgIHor7fmsYLvvIjpu5jorqTlkJHmiYvmnLrlkI7lj7Dlj5HpgIHor7fmsYLvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBieUFqYXgg5piv5ZCm5L2/55SoQWpheOWPkemAgeivt+axgu+8iOm7mOiupOS9v+eUqOaOp+S7tu+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3Mg5oiQ5Yqf5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZXJyb3Ig6ZSZ6K+v5Zue6LCD77yI5Lia5Yqh6ZSZ6K+v77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZmFpbCDlpLHotKXlm57osIPvvIjor7fmsYLlpLHotKXvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSB1cGRhdGUg5byC5q2l5Yi35paw5Zue6LCDIOWmguaenOiuvue9rmFzeW5j5Li6dHJ1ZeWQjuWPr+S7pea3u+WKoHVwZGF0ZeWbnuiwgyDlpoLmnpzkuI3loavlhpnpu5jorqTku6VzdWNjZXNz6L+b6KGM5aSE55CGXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gc3RvcmFnZSDnvJPlrZjlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbmVlZFN3ICAgICAgICAgICAgLy/pu5jorqRmYWxzZeWkp+mDqOWIhueUqOeahOaYr+aPkuS7tumcgOimgeeahOaJi+WKqOWOu+WKoFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzdG9yYWdlVHlwZSAgICAgIC8v6buY6K6k5L2/55SobG9jYWxzdG9yYWdlXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGFzeW5jICAgICAgICAgICAgLy/pu5jorqTojrflj5bnvJPlrZjlkI7kuI3lj5Hor7fmsYLvvIzmlLnkuLp0cnVl5ZCO5Lya5byC5q2l5Y676K+35rGC5ZCO5Y+w5bm25Yi35paw5pWw5o2uXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuZE9mU3luY0Z1bmMgICAgLy90b2RvIOmHjeimge+8ge+8ge+8ge+8geWbnuiwg+S4reWmguaenOWtmOWcqOW8guatpe+8iOaPkuS7tuetie+8iemcgOimgeagh+aYjuW8guatpeeKtuaAgeS4unRydWVcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmFsaWRhdGVUaW1lICAgICAvL+acieaViOacn+m7mOiupOaXoOmZkOacieaViOacnyDljZXkvY3mr6vnp5JcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVdpdGhJZCAgICAgICAvL+m7mOiupHRydWXku6XnlKjmiLdpZOi/m+ihjOWtmOWCqOWQpuWImWZhbHNl5LulbG9jYWzlrZjlgqhcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVN1Y2MgICAgICAgICAvL+S/neWtmOaIkOWKn+WQjueahOWbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlRXJyICAgICAgICAgIC8v5L+d5a2Y5aSx6LSl5ZCO55qE5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHJvbGxLZXkgICAgICAgICAgLy/lvLrliLborr7nva7kuLvplK5cclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2Vjb25kS2V5ICAgICAgICAvL+W8uuWItuiuvue9ruasoeimgemUruWAvFxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g6YeN6KaB6K+05piOIOiwg+eUqOW8guatpeaooeW8j++8iGFzeW5j6K6+572u5Li6dHJ1Ze+8ieWQjuWPr+iDveWcqHN1Y2Nlc3Plm57osIPph4zlrZjlnKjlvILmraXmk43kvZzvvIzor6Xmg4XlhrXkuIvlm57lr7zoh7TnvJPlrZjnmoTlm57osIPlj6/og71cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOacquaJp+ihjOWujOaIkO+8jOivt+axgueahOWbnuiwg+WPiOW8gOWni+aJp+ihjOS6hueahOaDheWGte+8jOaJgOS7peaIkeS7rOe7n+S4gOWcqHN1Y2Nlc3Plm57osIPlkox1cGRhdGXlm57osIPnmoTlhaXlj4Llop7liqDkuobnrKzkuozkuKrlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOeUqOS6juWFvOWuueWbnuiwg+WGheWMheWQq+W8guatpeeahOeKtuWGte+8jOS9v+eUqOaWueazleS4uu+8mummluWFiOiuvue9rmVuZE9mU3luY0Z1bmPlj4LmlbDkuLp0cnVlLOWFtuasoXN1Y2Nlc3Plkox1cGRhdGXlm55cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOiwg+WGheS8muaciTLkuKrlhaXlj4LvvIxzdWNjZXNz77yIcmVzcO+8jGZ1Y++8ie+8jOivt+WcqOS7o+eggemXreWMheWkhOS9v+eUqGZ1Yy5lbmRPZkZ1bmMoKVxyXG4vLyAgICAgICAgICAgICAgICAgICovXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHBhcmFtID0ge31cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGJ5QWpheCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogXCJsaWZlL2xpZmVcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXJpOnNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2VXaXRoU3RvcmFnZShwYXJhbSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjaywgc3RvcmFnZSwgdXBkYXRlKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICB9KVxyXG4vLyAgICAgfSlcclxuXHJcblxyXG4vLyAgICAgLy8gfVxyXG4vLyAgICAgLy8gZWxzZSB7XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4dBamF4IOWPkemAgeivt+axglxyXG4vLyAgICAgICovXHJcbi8vICAgICAvLyByZXR1cm4gYXhpb3Moe1xyXG4vLyAgICAgLy8gICAgIHVybDogYmFzZVVybCArIHVybCxcclxuLy8gICAgIC8vICAgICBtZXRob2QsXHJcbi8vICAgICAvLyAgICAgaGVhZGVycyxcclxuLy8gICAgIC8vICAgICBkYXRhOiBtZXRob2QgPT09ICdHRVQnID8gdW5kZWZpbmVkIDogZGF0YSxcclxuLy8gICAgIC8vICAgICBwYXJhbXM6IE9iamVjdC5hc3NpZ24obWV0aG9kID09PSAnR0VUJyA/IGRhdGEgOiB7fSwgcGFyYW1zKVxyXG4vLyAgICAgLy8gfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gICAgIC8vXHJcbi8vICAgICAvLyAgICAgbGV0IHJlcSA9IHtcclxuLy8gICAgIC8vICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2UuZGF0YS5yZXNwLFxyXG4vLyAgICAgLy8gICAgICAgICBkYXRhOiByZXNwb25zZS5kYXRhLnBhcmFtc1xyXG4vLyAgICAgLy8gICAgIH1cclxuLy8gICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcSlcclxuLy8gICAgIC8vIH0pLmNhdGNoKGVyciA9PiB7XHJcbi8vICAgICAvLyAgICAgLy8g6K+35rGC5Ye66ZSZXHJcbi8vICAgICAvLyAgICAgVG9hc3QuaW5mbygncmVxdWVzdCBlcnJvciwgSFRUUCBDT0RFOiAnICsgZXJyLnJlc3BvbnNlLnN0YXR1cyk7XHJcbi8vICAgICAvLyAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XHJcbi8vICAgICAvLyB9KTtcclxuLy8gICAgIC8vIH1cclxuXHJcbi8vIH1cclxuXHJcbi8vIOS4gOS6m+W4uOeUqOeahOivt+axguaWueazlVxyXG5leHBvcnQgY29uc3QgZ2V0ID0gKHVybCwgZGF0YSwgcGFyYW0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IHBhcmFtQWxsID0gT2JqZWN0LmFzc2lnbih7Zm9yQ2hzcDogdHJ1ZSwgZW5jcnlwdDogdHJ1ZSwgY2FjaGU6IGZhbHNlLCBieUFqYXg6IGZhbHNlfSwgcGFyYW0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QoT2JqZWN0LmFzc2lnbih7dXJsLCBkYXRhfSwgcGFyYW1BbGwpKVxyXG59O1xyXG5leHBvcnQgY29uc3QgcG9zdCA9ICh1cmwsIGRhdGEsIHBhcmFtID0ge30pID0+IHtcclxuICAgIGxldCBwYXJhbUFsbCA9IE9iamVjdC5hc3NpZ24oe2ZvckNoc3A6IHRydWUsIGVuY3J5cHQ6IHRydWUsIGNhY2hlOiBmYWxzZSwgYnlBamF4OiBmYWxzZX0sIHBhcmFtKTtcclxuICAgIHJldHVybiByZXF1ZXN0KE9iamVjdC5hc3NpZ24oe21ldGhvZDogJ1BPU1QnLCB1cmwsIGRhdGF9LCBwYXJhbUFsbCkpXHJcbn07XHJcbmV4cG9ydCBjb25zdCBwdXQgPSAodXJsLCBkYXRhKSA9PiByZXF1ZXN0KHttZXRob2Q6ICdQVVQnLCB1cmwsIGRhdGF9KTtcclxuZXhwb3J0IGNvbnN0IGRlbCA9ICh1cmwsIGRhdGEpID0+IHJlcXVlc3Qoe21ldGhvZDogJ0RFTEVURScsIHVybCwgZGF0YX0pO1xyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIOWKn+iDveWHveaVsOWMulxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIOWwhlVSTOS4reeahHNlYXJjaCDlrZfnrKbkuLIg6L2s5o2i5oiQIOWvueixoVxyXG4gKiBAcGFyYW0gc2VhcmNoXHJcbiAqIEByZXR1cm5zIHt7fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZWFyY2hQYXJhbSA9IChzZWFyY2gpID0+IHtcclxuICAgIGlmICghIXNlYXJjaCkge1xyXG4gICAgICAgIGxldCBzdHIgPSBzZWFyY2guc2xpY2UoMSk7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gc3RyLnNwbGl0KFwiJlwiKTtcclxuICAgICAgICBsZXQgb2JqID0ge307XHJcbiAgICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW0gPSBpdGVtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgb2JqW3BhcmFtWzBdXSA9IHBhcmFtWzFdO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIGNvZG92YSDmj5Lku7bosIPnlKjljLpcclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5cclxuLy8g5ZCv5YGc5pS25qy+56CBXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRYaWFvV2VpUGF5KHBhcmFtLCBzdWMsIGVycikge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuc2V0WGlhb1dlaVBheShwYXJhbSwgc3VjLCBlcnIpO1xyXG59XHJcblxyXG4vL+Wwj+W+rmF1ZGlvXHJcbmV4cG9ydCBjb25zdCBzZXRYaWFvV2VpQXVkaW8gPSAocGFyYW0sIHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5zZXRYaWFvV2VpQXVkaW8ocGFyYW0sIHN1YywgZXJyKTtcclxufVxyXG5leHBvcnQgY29uc3QgZ2V0WGlhb1dlaUF1ZGlvID0gKHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5nZXRYaWFvV2VpQXVkaW8oc3VjLCBlcnIpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdG9hc3QgPSAobXMpID0+IHtcclxuICAgIFRvYXN0LmluZm8obXMsIDIpO1xyXG59XHJcbi8qKlxyXG4gKiDorr7nva7pobbpg6hiYXJcclxuICogQHBhcmFtIHRpdGxlIOmhtemdouWQjeensFxyXG4gKiBAcGFyYW0gcmlnaHRCYXIg5Y+z5L6n5oyJ6ZKu5ZCN56ewXHJcbiAqIEBwYXJhbSByaWdodENhbGxiYWNrIOWPs+S+p+aMiemSruWbnuiwg1xyXG4gKiBAcGFyYW0gcmlnaHRCYXJJbWcg5Y+z5L6n5oyJ6ZKu5Zu+54mHXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYmVmb3JlRW50ZXJSb3V0ZXIgPSAodGl0bGUgPSBcIlwiLCByaWdodEJhciA9IFwiXCIsIHJpZ2h0Q2FsbGJhY2sgPSBudWxsLCByaWdodEJhckltZyA9IG51bGwpID0+IHtcclxuICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHRpdGxlKVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueql+WPo+WPs+S+p+aMiemSrlxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZSDlm77moIfmoIfpophcclxuICAgICAgICAgKiBAcGFyYW0gaW1hZ2Ug5Zu+5qCH5paH5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIGhhbmRsZXIg54K55Ye75Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKCEhcmlnaHRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uKHJpZ2h0QmFyLCByaWdodEJhckltZywgcmlnaHRDYWxsYmFjaylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24oXCJcIiwgbnVsbCwgbnVsbClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDpgJrnn6XlrqLmiLfnq6/kv67mlLnnirbmgIFcclxuICovXHJcbmV4cG9ydCBjb25zdCBtY2NTdGF0ZUNoYW5nZWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAubWNjU3RhdGVDaGFuZ2VkKClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kUXJDb2RlID0gKHBhcmFtcywgc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5omr5o+P5p2h56CB5ZKM5LqM57u056CBXHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAgICAgICAqIEBwYXJhbSBzdWNjZXNzXHJcbiAgICAgICAgICogQHBhcmFtIGZhaWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuc2NhblFSQ29kZShwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VXZWJWaWV3ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY2xvc2VXZWJWaWV3KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2ZXJpZnlQYXlQd2QgPSAocGFyYW0sIHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnZlcmlmeVBheVB3ZChwYXJhbSwgc3VjY2VzcywgZmFpbClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVXZWJWaWV3ID0gKHVybCwgcGFyYW1zID0gbnVsbCwgdGl0bGUgPSAnJywgaXNGaW5pc2ggPSBcIjFcIikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY3JlYXRlV2ViVmlldyh1cmwsIHBhcmFtcywgdGl0bGUsIGlzRmluaXNoKVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRVc2VyRGV0YWlsSW5mbyA9IChzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuZ2V0VXNlckRldGFpbEluZm8oc3VjY2VzcywgZmFpbClcclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWwhmNhdmFzIOS/neWtmOWIsOacrOWcsOebuOWGjFxyXG4gKiBAcGFyYW0gY2FudmFzXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2F2ZVFjb2RlID0gKGNhbnZhcykgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgdWkgPSBVUC5XLlVJIHx8IHt9O1xyXG4gICAgdmFyIHBpY1VybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhcHAubG9nRXZlbnQoJ3NhdmVQaWN0dXJlX05ld1llYXJBY3QnKTtcclxuICAgICAgICBhcHAuc2F2ZVBpY1RvTG9jYWwoe1xyXG4gICAgICAgICAgICB1cmw6IHBpY1VybCAmJiBwaWNVcmwuc3Vic3RyKDIyKVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdWkuc2hvd1RvYXN0V2l0aFBpYygn5bey5L+d5a2Y5Yiw57O757uf55u45YaMJyk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd1RvYXN0KG1zZyB8fCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoYXJlID0gKHRpdGxlLCBkZXNjLCBpbWdVUkwsIHBhZ2VVUmwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIGVudiA9IFVQLlcuRW52IHx8IHt9O1xyXG5cclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pi+56S65YiG5Lqr6Z2i5p2/XHJcbiAgICAgICAgICog5aaC5p6c5omA5pyJ5rig6YGT5L2/55So55u45ZCM55qE5YiG5Lqr5YaF5a655YiZ5LuF5aGr5YaZcGFyYW1z5Y2z5Y+v77yMXHJcbiAgICAgICAgICog5aaC5p6c6ZyA6KaB5qC55o2u5LiN5ZCM5rig6YGT5a6a5Yi25YiG5Lqr5YaF5a6577yM5YiZ5Y+vcGFyYW1z55WZ56m677yM5Zyoc2hhcmVDYWxsYmFja+S4rei/lOWbnuaMh+Wumua4oOmBk+eahOWIhuS6q+WGheWuuVxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXMg5YiG5Lqr5Y+C5pWwXHJcbiAgICAgICAgICogICAgICAgICAgICAgIHtcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHRpdGxl77yaIOWIhuS6q+agh+mimFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgZGVzYzog5YiG5Lqr5pGY6KaBXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBwaWNVcmzvvJrliIbkuqvlm77moIdcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNoYXJlVXJs77ya6K+m5oOF5Zyw5Z2AXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiBAcGFyYW0gc2hhcmVDYWxsYmFjayDliIbkuqvml7blm57osINcclxuICAgICAgICAgKiAgICAgICAgICAgICAgY2hhbm5lbO+8mntcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDDvvJrnn63kv6FcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDHvvJrmlrDmtarlvq7ljZpcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDPvvJrlvq7kv6Hlpb3lj4tcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDTvvJrlvq7kv6HmnIvlj4vlnIhcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDXvvJpRUeWlveWPi1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNu+8mlFR56m66Ze0XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA377ya5aSN5Yi26ZO+5o6lXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiAgICAgICAgICAgICAgZGF0YTog6buY6K6k5YiG5Lqr5pWw5o2uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLnNob3dTaGFyZVBhbmVsKHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBkZXNjOiBkZXNjLFxyXG4gICAgICAgICAgICBwaWNVcmw6IGltZ1VSTCxcclxuICAgICAgICAgICAgc2hhcmVVcmw6IHBhZ2VVUmwgIC8vIHRvZG8g5pmu6YCa5YiG5LqrXHJcbiAgICAgICAgfSwgbnVsbClcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE5a6a5L2N77yM6aaW5YWI6YCa6L+HR1BTIOWumuS9je+8jOWmguaenOWumuS9jeWksei0pe+8jOmAmui/h+aOpeWPo2dldENpdHks5Yip55SoSVDlnLDlnYDov5vooYzlrprkvY3vvIzlpoLmnpzov5jmmK/lpLHotKXvvIzpgJrov4fmj5Lku7bojrflj5blrqLmiLfnq6/lt6bkuIrop5LnmoTln47luILkv6Hmga/vvIzkvp3nhLblpLHotKXpu5jorqTnqb9jaXR5Q2Q6MzEwMDAwIOS7o+ihqOS4iua1t+W4glxyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50TG9jYXRpb25JbmZvID0gKGNhbGxiYWNrMikgPT4ge1xyXG4gICAgY29uc3QgdWkgPSBVUC5XLlVJO1xyXG4gICAgdWkuc2hvd0xvYWRpbmcoKTtcclxuICAgIGxldCBjYWxsYmFjayA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4gICAgICAgIGNhbGxiYWNrMihkYXRhKVxyXG4gICAgfVxyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYXBwLmdldEN1cnJlbnRMb2NhdGlvbkluZm8oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNtZDogXCIvXCIgKyBDT05GSUcuUkVTVC5nZXRDaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhdGg6IFwiaHR0cDovLzE3Mi4yMS4zMy41NjozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCIrQ09ORklHLlJFU1QuZ2V0Q2l0eSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBcIjJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCB0cnVlLCBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoTmF0aXZlRGF0YShjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hOYXRpdmVEYXRhKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaE5hdGl2ZURhdGEgPSAoY2FsbGJhY2spID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5blrqLmiLfnq6/kv6Hmga9cclxuICAgICAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICAgICAqIEBwYXJhbSBmYWlsXHJcbiAgICAgICAgICogQHBhcmFtIHR5cGUgMO+8muWfjuW4guS/oeaBr2NpdHlDZO+8mzHvvJrnu4/nuqzluqbvvJs177yaVXNlcklkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLmZldGNoTmF0aXZlRGF0YSgwLCAoZGF0YSA9IHt9KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICBjaXR5Q2Q6IFwiMzEwMDAwXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgY29uc3Qgc2F2ZVBpY1RvTG9jYWwgPSAoY2FudmFzLCByZXNvbHZlKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciB1aSA9IFVQLlcuVUkgfHwge307XHJcbiAgICB2YXIgcGljVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zYXZlUGljVG9Mb2NhbCh7XHJcbiAgICAgICAgICAgIHVybDogcGljVXJsICYmIHBpY1VybC5zdWJzdHIoMjIpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+aIkOWKn1xyXG4gICAgICAgICAgICAhIXJlc29sdmUgJiYgcmVzb2x2ZShcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgfSwgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgISFyZXNvbHZlICYmIHJlc29sdmUoXCJmYWlsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlVGV4dENhbnZhc2UgPSAodGV4dCwgY29sb3IsIGxvbmcgPSA2ODQsIHNob3QgPSA2MCkgPT4ge1xyXG5cclxuICAgIGxldCByZW0ycHggPSAodmFsKSA9PiB7XHJcbiAgICAgICAgdmFyIGNXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgICAgIHJldHVybiB2YWwgKiBjV2lkdGggLyA3NTBcclxuICAgIH1cclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dENhbnZhcycpO1xyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIC8v6Kit572u55Wr5L2I55qE5a+s6auYXHJcbiAgICAvLyB2YXIgYmdXaWR0aCA9IHJlbTJweChsb25nKTtcclxuICAgIC8vIHZhciBiZ0hlaWdodCA9IHJlbTJweChzaG90KTtcclxuXHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHNob3QpO1xyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbG9uZyk7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgY3R4LnJvdGF0ZSgtOTAgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgIHZhciB0ZXh0ID0gdGV4dDtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XHJcbiAgICBsZXQgZm9udFNpemUgPSBzaG90O1xyXG4gICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB3aGlsZSAoY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoID4gbG9uZykge1xyXG4gICAgICAgIGZvbnRTaXplLS07XHJcbiAgICAgICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB9XHJcbiAgICBjdHguZmlsbFRleHQodGV4dCwgLWxvbmcsIGZvbnRTaXplKTtcclxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOeUn+aIkOWbvueJh+W5tuS/neWtmOWIsOebuOWGjFxyXG4gKiBAcGFyYW0gYmd1cmwg6IOM5pmv5Zu+54mH55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVVUkwg5LqM57u056CB55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVXZEFuZEhnIOS6jOe7tOeggeeahOWuveW6plxyXG4gKiBAcGFyYW0geFdpZHRoIOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpIg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5SGVpZ2h0IOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB0ZXh0YmdVUkwg5Yqg5YWl55S75biD55qE5Zu+54mH55qEVVJMXHJcbiAqIEBwYXJhbSB4VGV4dFdpZHRoIOWKoOWFpeeUu+W4g+eahOWbvueJh+i3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5VGV4dEhlaWdodCDliqDlhaXnlLvluIPnmoTlm77niYfot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVDb252YXNBbmRTYXZlUGhvdG8gPSAoY2FudmFzT2JqLCByZXNvbHZlKSA9PiB7XHJcbiAgICBsZXQge2JndXJsLCBxcmNvZGVVUkwsIHFyY29kZVdkQW5kSGcsIHhXaWR0aCwgeUhlaWdodCwgdGV4dGJnVVJMLCB4VGV4dFdpZHRoLCB5VGV4dEhlaWdodH0gPSBjYW52YXNPYmo7XHJcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1vbkNhbnZhc1dyYXBwZXInKTtcclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk55S75biD5YaF5a65XHJcbiAgICAgKi9cclxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aFxyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLnNyYyA9IGJndXJsO1xyXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy/oqK3nva7nlavkvYjnmoTlr6zpq5hcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGltZy53aWR0aCk7XHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaW1nLmhlaWdodCk7XHJcblxyXG4gICAgICAgIC8v5Zyo55Wr5biD5LiK55Wr6IOM5pmv5ZyWXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG5cclxuICAgICAgICBpZiAoISF0ZXh0YmdVUkwpIHtcclxuICAgICAgICAgICAgbGV0IHRleHRVcmkgPSB0ZXh0YmdVUkw7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0SW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIHRleHRJbWcuc3JjID0gdGV4dFVyaTtcclxuICAgICAgICAgICAgdGV4dEltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRleHRJbWcsIHhUZXh0V2lkdGgsIHlUZXh0SGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuozntq3norzlnJbniYflpKflsI9cclxuICAgICAgICB2YXIgcXJjb2RlV2lkdGhBbmRIZWlnaHQgPSBxcmNvZGVXZEFuZEhnO1xyXG4gICAgICAgIC8v5riF6Zmk5LqM57u056CBXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB2YXIgcXJjb2RlID0gbmV3IFFSQ29kZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKSwge1xyXG4gICAgICAgICAgICB0ZXh0OiBxcmNvZGVVUkwsXHJcbiAgICAgICAgICAgIGhlaWdodDogcXJjb2RlV2lkdGhBbmRIZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoOiBxcmNvZGVXaWR0aEFuZEhlaWdodCxcclxuICAgICAgICAgICAgY29ycmVjdExldmVsOiBRUkNvZGUuQ29ycmVjdExldmVsLkxcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcXJjb2RlSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xyXG4gICAgICAgIHFyY29kZUltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8v55Wr5LqM57at56K855qE5ZyW54mHXHJcbiAgICAgICAgICAgIGxldCBxcmNvZGVEeCA9IHhXaWR0aCwgcXJjb2RlRHkgPSB5SGVpZ2h0O1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHFyY29kZUltZywgcXJjb2RlRHgsIHFyY29kZUR5KTtcclxuICAgICAgICAgICAgLy8gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICBzYXZlUGljVG9Mb2NhbChjYW52YXMsIHJlc29sdmUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdC5qcyIsImNvbnN0IGNvbmZpZyA9IHtcclxuICAgIFJFU1Q6IHtcclxuICAgICAgICBhcHBseU1jYzogXCJjb2xsZWN0aW9uQ29kZS9hcHBseU1jY1wiLCAvLzIuNC4055Sz6K+35pS25qy+56CB5o6l5Y+jXHJcbiAgICAgICAgZ2V0TWNjQ2FyZExpc3Q6IFwiY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIiwgLy8yLjQuMuWVhuaIt+aUtuasvueggeWNoeWIl+ihqOaOpeWPo1xyXG4gICAgICAgIGFwcGx5TWF0OiBcImNvbGxlY3Rpb25Db2RlL2FwcGx5TWF0XCIsIC8v55Sz6K+354mp5paZ5o6l5Y+jXHJcbiAgICAgICAgZ2V0TWNobnRBbmRBcmVhSW5mOiBcIm1jaG50L2dldE1jaG50QW5kQXJlYUluZi5zanNvblwiLCAvL+WVhuaIt+exu+Wei+WPiuWcsOWMuuWIl+ihqOafpeivolxyXG4gICAgICAgIHVwZ3JhZGVNY2M6IFwiY29sbGVjdGlvbkNvZGUvdXBncmFkZU1jY1wiLCAvLzIuNC425Y2H57qn5pS25qy+56CB5o6l5Y+jLFxyXG4gICAgICAgIGdldEFkZHJMaXN0OiBcImFkZHJlc3MvZ2V0QWRkckxpc3RcIiAsIC8vMi40LjEzIOiOt+WPluaUtui0p+WcsOWdgOWIl+ihqFxyXG4gICAgICAgIGRlbGV0ZUFkZHJlc3M6IFwiYWRkcmVzcy9kZWxldGVBZGRyZXNzXCIgLCAvLzIuNC4xMiDliKDpmaTmlLbotKflnLDlnYBcclxuICAgICAgICBlZGl0QWRkcmVzczogXCJhZGRyZXNzL2VkaXRBZGRyZXNzXCIsIC8vMi40LjExIOS/ruaUueaUtui0p+WcsOWdgCxcclxuICAgICAgICBuZXdBZGRyZXNzOiBcImFkZHJlc3MvbmV3QWRkcmVzc1wiLCAvLzIuNC4xMCDmlrDlop7mlLbotKflnLDlnYBcclxuICAgICAgICBtY2hudE9wZXIgOlwibWNobnQvbWNobnRPcGVyXCIsIC8vMi4yLjIg5bqX6ZO65L+h5oGv5pu05pawXHJcbiAgICAgICAgZ2V0TGltaXRBdEluZm86XCJtY2hudC9nZXRMaW1pdEF0SW5mb1wiLCAvL+iOt+WPluaUtuasvumZkOminVxyXG4gICAgICAgIHNldE1jY09uT2ZmOlwiY29sbGVjdGlvbkNvZGUvc2V0TWNjT25PZmZcIiwgLy/lgZzmraLlkozlkK/nlKjku5jmrL7noIHlgJ/lj6NcclxuICAgICAgICBnZXRNY2hudERldGFpbDpcIm1jaG50L21jaG50RGV0YWlsXCIsIC8vMi4yLjEg6I635Y+W5bqX6ZO66K+m5oOF6aG16Z2iXHJcbiAgICAgICAgLy8gdXBncmFkZU1jYzogXCJjb2xsZWN0aW9uQ29kZS91cGdyYWRlTWNjXCIsIC8vMi40LjbljYfnuqfmlLbmrL7noIHmjqXlj6NcclxuICAgICAgICBnZXRUb2RheVRyYW5zOlwidHJhbi9nZXRUb2RheVRyYW5zXCIsLy8yLjEuMy8v5LuK5pel6K6i5Y2V5o6l5Y+jXHJcbiAgICAgICAgZ2V0VG9kYXlJbmNvbWU6XCJ0cmFuL2dldFRvZGF5SW5jb21lXCIsLy8yLjEuMeWVhuaIt+acjeWKoemmlumhteS7iuaXpeaUtuasvuaOpeWPo35+fn5+fn5+XHJcbiAgICAgICAgZ2V0SGlzdG9yeUluY29tZTpcInRyYW4vZ2V0SGlzdG9yeUluY29tZVwiLC8vMi4xLjLljoblj7LmlLbmrL7mjqXlj6NcclxuICAgICAgICBnZXRIaXN0b3J5VHJhbnM6XCJ0cmFuL2dldEhpc3RvcnlUcmFuc1wiLC8vMi4xLjTljoblj7LorqLljZXmjqXlj6NcclxuICAgICAgICBnZXRMb2dpc3RpY3NTdDpcIm1hdGVyaWVsL2dldExvZ2lzdGljc1N0XCIsLy8yLjMuM+eJqea1geivpuaDheaOpeWPo+afpeivolxyXG4gICAgICAgIGdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW06XCJ0cmFuL2dldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW1cIiwvLzIuMS415Y2V56yU6K6i5Y2V5p+l6K+i5o6l5Y+jXHJcbiAgICAgICAgZ2V0QXVkaXRJbmZvOlwiY29sbGVjdGlvbkNvZGUvZ2V0QXVkaXRJbmZvXCIsLy8yLjQuMTTkv6HnlKjljaHljYfnuqflrqHmoLjnu5Pmnpzmn6Xor6JcclxuICAgICAgICB1cGRhdGVNY2NDYXJkOlwiY29sbGVjdGlvbkNvZGUvdXBkYXRlTWNjQ2FyZFwiLC8vMi40Ljnmm7TmjaLmlLbmrL7ljaHmjqXlj6NcclxuICAgICAgICBnZXRVcGdyYWRlU3Q6XCJtY2hudC9nZXRVcGdyYWRlU3RcIiwvL+afpeivouWVhuaIt+aYr+WQpuWNh+e6p+S/oeeUqOWNoeaUtuasvlxyXG4gICAgICAgIGdldE1jY1RyYW5zTnVtOidjb2xsZWN0aW9uQ29kZS9nZXRNY2NUcmFuc051bScsLy/ojrflj5bosIPlj5bmlK/ku5jmjqfku7bnmoRUTuWPt1xyXG4gICAgICAgIGdldE1hdGVyaWVsSW5mb0xpc3Q6XCJjb2xsZWN0aW9uQ29kZS9nZXRNYXRlcmllbEluZm9MaXN0XCIsLy8yLjQuM+eJqeaWmeS/oeaBr+WIl+ihqOaOpeWPo1xyXG4gICAgICAgIHVzZXJJbmZvOlwiL2FwcC9pbkFwcC91c2VyL2dldFwiLC8v6I635Y+W55So5oi35L+h5oGvXHJcbiAgICAgICAgaXNCbGFjazpcInNjYW4vaXNCbGFja1wiLC8vMi4xLjXmlLbpk7blkZjmmK/lkKblnKjpu5HlkI3ljZVcclxuICAgICAgICBpc0FwcGx5Olwic2Nhbi9pc0FwcGx5XCIsLy8yLjEuNOaYr+WQpuW3sue7j+eUs+ivt+e6ouWMheeggVxyXG4gICAgICAgIHNoYXJlTGluazpcInNjYW4vc2hhcmVMaW5rXCIsLy8yLjEuNueUn+aIkOe6ouWMheeggemTvuaOpVxyXG4gICAgICAgIHJlY21kUmVjb3JkOlwic2Nhbi9yZWNtZFJlY29yZFwiLC8v5o6o6I2Q5YWz57O76K6w5b2VXHJcbiAgICAgICAgZ2V0TG9naXN0aWNzTGlzdDpcIm1hdGVyaWVsL2dldExvZ2lzdGljc0xpc3RcIiwvL+iOt+WPlueJqeaWmeWOhuWPsuiuouWNlVxyXG4gICAgICAgIGdldFJld2FyZExpc3Q6XCJzY2FuL2dldFJld2FyZExpc3RcIiwvLzIuMS435p+l6K+i5pS26ZO25ZGY6LWP6YeR5piO57uG6K6w5b2VXHJcbiAgICAgICAgZ2V0UHJvdG9jb2xJbmZvOlwiY29sbGVjdGlvbkNvZGUvZ2V0UHJvdG9jb2xJbmZvXCIsLy/llYbmiLfljYfnuqfmn6Xor6LmmL7npLrljY/orq7nmoTlkI3np7DlkozljY/orq7nmoTlnLDlnYBcclxuICAgICAgICBnZXRDaXR5OlwicmVnaW9uL2dldENpdHlcIiwvL+mAmui/h0lQ5Zyw5Z2A6I635Y+W5Zyw5Z2A5a6a5L2NXHJcbiAgICAgICAgZ2V0UXJVcmw6XCJjb2xsZWN0aW9uQ29kZS9nZXRRckluZm9cIi8vMi4xLjHojrflj5bnlKjmiLfmlLbmrL7noIFVUkxcclxuICAgIH0sXHJcbiAgICBTVEFUVVNDT0RFOiB7XHJcbiAgICAgICAgU1VDQ0VTUzpcIjAwXCJcclxuICAgIH0sXHJcbiAgICBDT05TVF9EQVRBOntcclxuICAgICAgICBpbWdlU2l6ZTpcIjMwMFwiXHJcbiAgICB9LFxyXG4gICAgQ0FDSEVLRVk6e1xyXG4gICAgICAgIGdldE1jY0NhcmRMaXN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1jb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBVcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLW1jaG50L2dldFVwZ3JhZGVTdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLW1jaG50L2dldFVwZ3JhZGVTdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRNY2hudERldGFpbDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLW1jaG50L21jaG50RGV0YWlsXCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtbWNobnQvbWNobnREZXRhaWxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNBcHBseTp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLXNjYW4vaXNBcHBseVwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLXNjYW4vaXNBcHBseVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRBZGRyTGlzdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLWFkZHJlc3MvZ2V0QWRkckxpc3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1hZGRyZXNzL2dldEFkZHJMaXN0XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvY29uZmlnLmpzIiwiaW1wb3J0IEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCI7XHJcblxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5Y+q5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIOWFiOivu+e8k+WtmO+8jOWQjOatpeW+gOWQjuWPsOWPkeivt+axgu+8jOivt+axguaKpeaWh+WbnuadpeWQjuWIt+aWsOe8k+WtmOWPiumhtemdolxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlID0gKHVwZGF0ZSxyb2xsS2V5LHNlY29uZEtleSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICByb2xsS2V5LFxyXG4vLyAgICAgICAgICAgICBzZWNvbmRLZXlcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIHVwZGF0ZTogdXBkYXRlLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDkuI3mlK/mjIEgc3cgICAs5rC45LmF57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7Y2FjaGU6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVMb25nVGltZSA9IChyb2xsS2V5LCBzZWNvbmRLZXkpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICByb2xsS2V5LFxyXG4vLyAgICAgICAgICAgICBzZWNvbmRLZXlcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOWPquS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAx5YiG6ZKf5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMW1pbiA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTMwbWluID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDMwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UxaG91ciA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqNjAqMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMmhvdXIgPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMiAqIDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcblxyXG4vL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMjRkaWFuID0gKCkgPT4ge1xyXG4vL1xyXG4vLyAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4vLyAgICAgbGV0IHRlbW9ycm93ID0gbmV3IERhdGUoKTtcclxuLy8gICAgIHRlbW9ycm93LnNldEhvdXJzKDIzKTtcclxuLy8gICAgIHRlbW9ycm93LnNldE1pbnV0ZXMoNTkpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0U2Vjb25kcyg1OSk7XHJcbi8vICAgICBsZXQgdGVtID0gdGVtb3Jyb3cuZ2V0VGltZSgpO1xyXG4vLyAgICAgbGV0IHZhbGlkYXRlVGltZSA9IHRlbSAtIG5vdyArIDEwMDAgKiA2MFxyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgICAgIHZhbGlkYXRlVGltZTogdmFsaWRhdGVUaW1lLFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICB3b3JrYm9455qE562W55WlICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuLy9cclxuLy8gLyoqXHJcbi8vICAq5Li6Z2V06K+35rGC77yM5LiN5Yqg5a+GXHJcbi8vICAq5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKuWFiOivu+e8k+WtmO+8jOWQjOaXtuW+gOWQjuWPsOWPkeivt+axgu+8jOivt+axguaKpeaWh+WbnuadpeWQjuWIt+aWsOe8k+WtmOWPiumhtemdolxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgY2FjaGU6IGJvb2xlYW4sIGFzeW5jOiBib29sZWFufX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZSA9ICh1cGRhdGUpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgYnlBamF4OiBmYWxzZSwvL+WmguaenOimgeaUr+aMgXN3IOWwseS4jemcgOS9v+eUqGFqYXhcclxuLy8gICAgICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgdXBkYXRlOiB1cGRhdGVcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAzMOWIhumSn+WGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QzMG1pbiA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDMwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDHlsI/mmYLlhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MWhvdXIgPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDJob3VyID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMiAqIDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8qKlxyXG4gKiDor6XnrZbnlaXmmK/kuIDlrprml7bpl7TlhoXkuI3lkJHlkI7lj7Dor7fmsYLmlbDmja7vvIwg5aaC5p6c5Zyo6K6+5aSH5LiK5pSv5oyBc3fliJnkvb/nlKhzdyzlkKbliJnkvb/nlKggbG9jYWxTdG9yYWdlXHJcbiAqIEBwYXJhbSB0aW1lICDopoHnvJPlrZjnmoTml7bpl7Qg5Y2V5L2N5piv5q+r56eSXHJcbiAqIEByZXR1cm5zIHt7YnlBamF4OiBib29sZWFuLCBmb3JDaHNwOiBib29sZWFuLCBlbmNyeXB0OiBib29sZWFuLCBjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge3ZhbGlkYXRlVGltZTogKn19fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QgPSh0aW1lKT0+e1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBieUFqYXg6IHRydWUsXHJcbiAgICAgICAgZm9yQ2hzcDpmYWxzZSxcclxuICAgICAgICBlbmNyeXB0OmZhbHNlLFxyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgdmFsaWRhdGVUaW1lOnRpbWUsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqICDor6XnrZbnlaXmmK/kuIDlrprml7bpl7TlhoXkuI3lkJHlkI7lj7Dor7fmsYLmlbDmja7vvIzmt7vliqDnvJPlrZjlj6rlnKhsb2NhbHN0b3JhZ2XkuK1cclxuICogQHBhcmFtIHRpbWUgIOimgee8k+WtmOeahOaXtumXtCDljZXkvY3mmK/mr6vnp5JcclxuICogQHBhcmFtIHJvbGxLZXkgICDpnZ7lv4Xloasg5aaC5p6c5ZCO5pyf6KaB5Yig6Zmk6L+Z5Liq57yT5a2Y77yM6L+Z5aGr5YaZ6L+Za2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXkgIOmdnuW/heWhqyDlpoLmnpzlkI7mnJ/opoHliKDpmaTov5nkuKrnvJPlrZjvvIzov5nloavlhpnov5lrZXlcclxuICogQHJldHVybnMge3tjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge25lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiAqLCByb2xsS2V5OiAqLCBzZWNvbmRLZXk6ICp9fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjYWNoZUZpcnN0U3RvcmFnZSA9KHRpbWUscm9sbEtleSwgc2Vjb25kS2V5KT0+e1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlVGltZTogdGltZSxcclxuICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzcG9uc2VGb3JtYXR0ZXIgPSAoZGF0YSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnJlc3AsXHJcbiAgICAgICAgZGF0YTogZGF0YS5wYXJhbXMsXHJcbiAgICAgICAgbXNnOiBkYXRhLm1zZ1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDor6XnrZbnlaXmmK/lhYjor7vnvJPlrZjvvIzlkIzml7blkJHlkI7lj7Dlj5HpgIHor7fmsYLvvIzor7fmsYLlm57mnaXlkI7lkIzmraXmm7TmlrDnvJPlrZjvvIzlm57osIN1cGRhdGUg5Ye95pWw77yMXHJcbiAqIEBwYXJhbSB1cGRhdGUg5b+F5aGr5pu05paw6aG16Z2i55qE5Zue6LCD5Ye95pWwXHJcbiAqIEBwYXJhbSByb2xsS2V5ICDpnZ7lv4Xloasg6K6+572u57yT5a2Y55qEIHJvbGxrZXlcclxuICogQHBhcmFtIHNlY29uZEtleSDpnZ7lv4Xloasg6K6+572u57yT5a2Y55qEIHNlY29uZEtleVxyXG4gKiBAcmV0dXJucyB7e2NhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7YXN5bmM6IGJvb2xlYW4sIHJvbGxLZXk6ICosIHNlY29uZEtleTogKn0sIHVwZGF0ZTogKn19XHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlID0gKHVwZGF0ZSxyb2xsS2V5LHNlY29uZEtleSkgPT4ge1xyXG5cclxuICAgbGV0ICByZWZyZXNoRG9tRnVuYz0ocmVzcG9uc2UpPT57XHJcbiAgICAgICBsZXQgcmVxPXJlc3BvbnNlRm9ybWF0dGVyKHJlc3BvbnNlKVxyXG4gICAgICAgLy8g5bCG6I635Y+W55qE5pWw5o2u5ZKM57yT5a2Y5Lit55qE5pWw5o2u6L+b6KGM5a+55q+UXHJcbiAgICAgICBsZXQgZGF0YUZyb21DYWNoZSA9IHt9O1xyXG4gICAgICAgVVAuVy5VdGlsLmdldEZyb21TdG9yYWdlKHtcclxuICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgfSxmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICBpZiggISFkYXRhICl7XHJcbiAgICAgICAgICAgICAgICBkYXRhRnJvbUNhY2hlID0gZGF0YTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgIH0pXHJcbiAgICAgICBsZXQgaXNTYW1lQXRBbGwgPSBJbW11dGFibGUuaXMoSW1tdXRhYmxlLmZyb21KUyhyZXEpLEltbXV0YWJsZS5mcm9tSlMoZGF0YUZyb21DYWNoZSkpOyAvL+aVsOaNruaYr+WQpuWujOWFqOebuOWQjFxyXG4gICAgICAgaWYoICFpc1NhbWVBdEFsbCApeyAvL+aVsOaNruacieWPmOWKqFxyXG4gICAgICAgICAgICB1cGRhdGUocmVxKVxyXG4gICAgICAgfVxyXG4gICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIGVuZE9mU3luY0Z1bmM6ZmFsc2UsXHJcbiAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiByZWZyZXNoRG9tRnVuYyxcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOWIoOmZpGxvY2Fsc3RvcmFnZeS4reeahOe8k+WtmFxyXG4gKiBAcGFyYW0gcm9sbEtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2FjaGUgPSAocm9sbEtleSwgc2Vjb25kS2V5KSA9PiB7XHJcbiAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgcm9sbEtleTogcm9sbEtleSxcclxuICAgICAgICBzZWNvbmRLZXk6IHNlY29uZEtleVxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfliKDpmaTnvJPlrZjmiJDlip8nKVxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICAgICAgZnVsbDogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9jYWNoZVN0b3JhZ2UuanMiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1Byb21pc2UnLCB7ICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgKHJlc3VsdC5lID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnYpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanNcbi8vIG1vZHVsZSBpZCA9IDhlMGMxZGIwMDA4NWM4YWQyNTVhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UudHJ5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDk3M2NjOGVlZmM1OTkzMWRlOTVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBhYTk2M2I0YzI3MTQ0ZjA5NGNjYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICdhbnRkLW1vYmlsZS9saWIvYnV0dG9uJztcclxuaW1wb3J0IElucHV0SXRlbSBmcm9tICdhbnRkLW1vYmlsZS9saWIvaW5wdXQtaXRlbSc7XHJcbmltcG9ydCBQaWNrZXIgZnJvbSAnYW50ZC1tb2JpbGUvbGliL3BpY2tlcic7XHJcblxyXG5pbXBvcnQgXCIuL1VwU3RvcmVJbmZvbWF0aW9uLnNjc3NcIlxyXG5pbXBvcnQge3RvYXN0fSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdFwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwU3RvcmVJbmZvbWF0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KVxyXG4gICAgICAgIHRoaXMubmV2ZXJDaGFuZ2VOYW1lPXRydWUgIC8v5LuO5p2l5rKh5pyJ5L+u5pS56L+H5bqX6ZO65ZCN56ewXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgY2hhbmdlU3RvcmVOYW1lSGFuZGxlciA9ICh2YWwpID0+IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlj6ropoHnlKjmiLfkv67mlLnov4flkI3vvIzmiJHku6zlsLHpnIDopoHkv67mlLnnirbmgIFcclxuICAgICAgICAgKi9cclxuICAgICAgICBpZih0aGlzLm5ldmVyQ2hhbmdlTmFtZSl7XHJcbiAgICAgICAgICAgIHRoaXMubmV2ZXJDaGFuZ2VOYW1lPWZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvcHMuY2hhbmdlU3RvcmVOYW1lKHZhbClcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0Vycm9yID0gKG1zZykgPT4ge1xyXG4gICAgICAgIHRvYXN0KG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW50b1ZpZXcgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGV0YWlsQWRkcmlucHV0XCIpXHJcbiAgICAgICAgaWYgKCEhZWxlLnNjcm9sbEludG9WaWV3KSB7XHJcbiAgICAgICAgICAgIGVsZS5zY3JvbGxJbnRvVmlldyh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEhZWxlLnNjcm9sbEludG9WaWV3SWZOZWVkZWQpIHtcclxuICAgICAgICAgICAgZWxlLnNjcm9sbEludG9WaWV3SWZOZWVkZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWkhOeQhueCueWHu+S6i+S7tlxyXG4gICAgICovXHJcbiAgICBoYW5kbGVOZXh0Q2xpY2s9KCk9PntcclxuICAgICAgICAvL+WmguaenOivpemhtemdouaYr+adpeiHqumUmeivr+avgeaOiemhtemdou+8jOW/hemhu+WkhOeQhui/h+S4jeWQiOazleeahOWQjeensO+8jOaJjeiDveaPkOS6pOivt+axglxyXG4gICAgICAgIGlmKCF0aGlzLnByb3BzLmlzRmFpbGJhY2t8fCF0aGlzLm5ldmVyQ2hhbmdlTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUNsaWNrKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBsZXQge3N0b3JlbmFtZSwgU3RvcmVUcCwgU3Ryb2VBcmVhLCBhZGRyLCBtZXJjaGFudFRwQXJyLCBhcmVhQXJyLGNoYW5nZVN0b3JlVHlwZSwgY2hhbmdlU3RvcmVBcmVhLCBjaGFuZ2VTdG9yZUFkZHIsaXNGYWlsYmFjayxlcnJNc2d9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgbGV0IGVycm9yPWZhbHNlLHNob3dNc2c9XCJcIjsvL+m7mOiupOW6l+mTuuWQjeensOaYr+S4jemUmeeahFxyXG5cclxuICAgICAgICBTdHJvZUFyZWEgPSAgU3Ryb2VBcmVhLnNwbGl0KCd8Jyk7XHJcbiAgICAgICAgU3RvcmVUcCA9IHBhcnNlSW50KFN0b3JlVHApKycnO1xyXG4gICAgICAgIGlmKCBTdG9yZVRwLmxlbmd0aCA8PTMgKXtcclxuICAgICAgICAgICAgU3RvcmVUcCA9IFtTdG9yZVRwLnN1YnN0cigwLDEpKycnLFN0b3JlVHBdO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgU3RvcmVUcCA9IFtTdG9yZVRwLnN1YnN0cigwLDIpKycnLFN0b3JlVHBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nlKjkuo7liKTlrprnlKjmiLflkI3mmK/kuI3mmK/mnInplJnor69cclxuICAgICAgICBpZihpc0ZhaWxiYWNrJiZ0aGlzLm5ldmVyQ2hhbmdlTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5p2l6Ieq6ZSZ6K+v6aG16Z2i55qE6Lez6L2s77yM5bm25LiU5LuO5p2l5rKh5pyJ5L+u5pS56L+H5bqX6ZO65ZCN56ew77yM5YiZ5bqX6ZO65ZCN56ew6KaB5qCH57qi77yM5LiU54K55Ye75pi+56S66ZSZ6K+v5L+h5oGvXHJcbiAgICAgICAgICAgIGVycm9yPXRydWU7XHJcbiAgICAgICAgICAgIHNob3dNc2c9ZXJyTXNnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8v5qC55o2u5a2X56ym5Liy6ZW/5bqm5Yik5a6a5piv5ZCm5piv5ZCI5rOV55qE5ZCN56ewXHJcbiAgICAgICAgICAgIGlmKCEhc3RvcmVuYW1lJiZzdG9yZW5hbWUubGVuZ3RoPjIwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcj10cnVlO1xyXG4gICAgICAgICAgICAgICAgc2hvd01zZz1cIuaCqOeahOW6l+mTuuWQjeensOi/h+mVv1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGVycm9yPWZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOWumuaYr+S4jeaYr2RpYWFibGXnmoTmjInpkq7vvIzlpoLmnpzlkI3np7DnrKblkIjopoHmsYLvvIzkuJTkuI3mmK/nqbos6YCJ5Lit5LqG5bqX6ZO657G75Z6L77yM6YCJ5Lit5LqG5bqX6ZO65Yy65Z+f77yM5aGr5YaZ5LqG5bqX6ZO65Zyw5Z2AXHJcbiAgICAgICAgbGV0IGRpc2FibGVCdG47XHJcbiAgICAgICAgaWYoIWVycm9yJiZzdG9yZW5hbWUubGVuZ3RoIT0wJiZTdG9yZVRwLmxlbmd0aCE9MCYmU3Ryb2VBcmVhLmxlbmd0aCE9MCYmYWRkci5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNhYmxlQnRuPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBkaXNhYmxlQnRuPXRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwidXNmXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGVudFdhcnBcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IWlzRmFpbGJhY2sgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRUaXBlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpcHMtd2FycC1kaXYgbXQwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwidGlwc0ljb25cIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg6KGl5YWo6LWE5paZ5bm25ruh6Laz44CQ5byA6YCa5ZWG5a625pS25qy+5ruhOTDlpKnkuJTov57nu60zMOWkqeato+W4uOaUtuasvuOAkeWNs+WPr+aUr+aMgemhvuWuoueahOS/oeeUqOWNoeS7mOasvuOAglxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250ZW50V2FycFwiIGNsYXNzTmFtZT1cInBhZGxyMzJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dFdhcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0SXRlbSBjbGVhciBwbGFjZWhvbGRlcj1cIuacgOWkmjIw5Liq5a2X56ymXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I9e2Vycm9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c3RvcmVuYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VTdG9yZU5hbWVIYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yQ2xpY2s9e3RoaXMuY2xpY2tFcnJvci5iaW5kKHRoaXMsc2hvd01zZyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+5bqX6ZO65ZCN56ewPC9JbnB1dEl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpcHMtd2FycC1kaXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cInRpcHNJY29uXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg6K+l5ZCN56ew5bCG5bGV56S65Zyo6aG+5a6i55qE5LuY5qy+6aG16Z2iXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXRXYXBcIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGlja2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmE9XCLor7fpgInmi6nllYbmiLfnsbvlnotcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e21lcmNoYW50VHBBcnJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scz1cIjJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtTdG9yZVRwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uT2s9e3YgPT4gY2hhbmdlU3RvcmVUeXBlKHYpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDdXN0b21DaGlsZHJlbj7lupfpk7rnsbvlnos8L0N1c3RvbUNoaWxkcmVuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9QaWNrZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXRXYXBcIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGlja2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGl0bGU9XCLpgInmi6nlnLDljLpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhPVwi6K+36YCJ5oup5bqX6ZO65omA5Zyo5Zyw5Yy6XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXthcmVhQXJyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtTdHJvZUFyZWF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Paz17diA9PiBjaGFuZ2VTdG9yZUFyZWEodil9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDdXN0b21DaGlsZHJlbj7miYDlnKjlnLDljLo8L0N1c3RvbUNoaWxkcmVuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9QaWNrZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dFdhcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0SXRlbSBjbGVhciBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeW6l+mTuuivpue7huWcsOWdgFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZGV0YWlsQWRkcmlucHV0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5pbnRvVmlld31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FkZHJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlU3RvcmVBZGRyKHYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOivpue7huWcsOWdgFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Lyo8ZGl2IHN0eWxlPXt7aGVpZ2h0OjEwMCsncHgnfX0+PC9kaXY+Ki99XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgeyFpc0ZhaWxiYWNrICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tdGlwc1wiPuS/oeeUqOWNoeS7mOasvu+8jOWNleeslOS6pOaYk+Wwhuiiq+aUtuWPljxzcGFuPjAuNSU8L3NwYW4+5omL57ut6LS577yM5YCf6K6w5Y2h5LuY5qy+5YWN6LS544CCPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pdC13YXJwLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgZGlzYWJsZWQ9e2Rpc2FibGVCdG59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVOZXh0Q2xpY2t9PuS4i+S4gOatpTwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IEN1c3RvbUNoaWxkcmVuID0gcHJvcHMgPT4ge1xyXG4gICAgbGV0IHBsYWNlaG9sZGVyQ2xhc3MgPSBcIlwiO1xyXG4gICAgaWYgKHByb3BzLmV4dHJhLmluZGV4T2YoXCLor7fpgInmi6lcIikgPiAtMSkge1xyXG4gICAgICAgIHBsYWNlaG9sZGVyQ2xhc3MgPSBcImNvbG9yNjY2XCJcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVDbGljaygpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjenltYXNrXCIpWzBdO1xyXG4gICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IC8vIOWIm+W7uiBET01cclxuICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSAnY3p5bWFzayc7IC8vIOe7meS4iiBDbGFzc05hbWVcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChub2RlKS8v57uZYm9keea3u+WKoOS4gOS4qmRpdlxyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH0sIDMwMClcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFhXCIpXHJcbiAgICAgICAgcHJvcHMub25DbGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2VsbC13YXJwLWRpdlwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbGwtaW5uZXItZGl2XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbGwtbmFtZS1kaXZcIj57cHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjZWxsLXZhbHVlLWRpdiBcIiArIHBsYWNlaG9sZGVyQ2xhc3N9Pntwcm9wcy5leHRyYX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cInJpZ2h0QXJyb3dcIj48L2k+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9VcFN0b3JlSW5mb21hdGlvbi9VcFN0b3JlSW5mb21hdGlvbi5qcyIsImltcG9ydCB7Y3JlYXRlV2ViVmlld30gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RcIjtcclxuaW1wb3J0IE1vZGFsIGZyb20gJ2FudGQtbW9iaWxlL2xpYi9tb2RhbCc7XHJcbmltcG9ydCB7dXBncmFkZU1jY30gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RBUElcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIHN1Ym1pdEhhbmRsZUNsaWNrKHBhcmFtKSB7XHJcbiAgICB1cGdyYWRlTWNjKHBhcmFtKS50aGVuKCgpID0+IHtcclxuICAgICAgICBNb2RhbC5hbGVydCgn5o+Q5Lqk5oiQ5YqfJywgJ+aIkeS7rOWwhuWcqDJ+NeS4quW3peS9nOaXpeWGheWujOaIkOWuoeaguO+8jOivt+iAkOW/g+etieW+he+8jOWuoeaguOe7k+aenOWwhumAmui/h+S6kemXquS7mOa2iOaBr+i/m+ihjOWPkemAgScsIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WlveeahCcsIG9uUHJlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi9zL3dsL3h2c2gvaW5kZXguaHRtbCMvbWVyY2hhYnRTZXJ2XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlV2ViVmlldyh1cmwsIG51bGwsIFwiXCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdKVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9JZElkZW50aWZ5L0lkSWRlbnRpZnlBY3Rpb25zLmpzIiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanNcbi8vIG1vZHVsZSBpZCA9IGI1MGQ4MjQ1NmU1NDVkY2MzZGQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIGFyZ3MsIHRoYXQpIHtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanNcbi8vIG1vZHVsZSBpZCA9IGI1ODBiOTRiMTk1ODQyY2JmMmIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcInVzZlwiOlwidXNmXCIsXCJhbS1saXN0LWl0ZW1cIjpcImFtLWxpc3QtaXRlbVwiLFwiYW0taW5wdXQtaXRlbVwiOlwiYW0taW5wdXQtaXRlbVwiLFwiYW0tbGlzdC1pdGVtLW1pZGRsZVwiOlwiYW0tbGlzdC1pdGVtLW1pZGRsZVwiLFwiYW0taW5wdXQtZXJyb3JcIjpcImFtLWlucHV0LWVycm9yXCIsXCJoZWFkVGlwZVwiOlwiaGVhZFRpcGVcIixcIm10MFwiOlwibXQwXCIsXCJ0aXBzLXdhcnAtZGl2XCI6XCJ0aXBzLXdhcnAtZGl2XCIsXCJidG4tdGlwc1wiOlwiYnRuLXRpcHNcIixcInBhZGxyMzJcIjpcInBhZGxyMzJcIixcImlucHV0V2FwXCI6XCJpbnB1dFdhcFwiLFwiY2VsbC13YXJwLWRpdlwiOlwiY2VsbC13YXJwLWRpdlwiLFwiY2VsbC1pbm5lci1kaXZcIjpcImNlbGwtaW5uZXItZGl2XCIsXCJjZWxsLW5hbWUtZGl2XCI6XCJjZWxsLW5hbWUtZGl2XCIsXCJjZWxsLXZhbHVlLWRpdlwiOlwiY2VsbC12YWx1ZS1kaXZcIixcImNvbG9yNjY2XCI6XCJjb2xvcjY2NlwifTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL1VwU3RvcmVJbmZvbWF0aW9uL1VwU3RvcmVJbmZvbWF0aW9uLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IGI5MmY0MWI3MzMxMjhjYTk3ZWJjXG4vLyBtb2R1bGUgY2h1bmtzID0gMTYiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBPYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBQcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG52YXIgaXNOb2RlID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYgKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKSBwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICBmbiA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKGlzTm9kZSkge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlciwgZXhjZXB0IGlPUyBTYWZhcmkgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIH0gZWxzZSBpZiAoT2JzZXJ2ZXIgJiYgIShnbG9iYWwubmF2aWdhdG9yICYmIGdsb2JhbC5uYXZpZ2F0b3Iuc3RhbmRhbG9uZSkpIHtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmIChQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSkge1xuICAgIC8vIFByb21pc2UucmVzb2x2ZSB3aXRob3V0IGFuIGFyZ3VtZW50IHRocm93cyBhbiBlcnJvciBpbiBMRyBXZWJPUyAyXG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICAgIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmICghaGVhZCkge1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IGJkZTBmNTdlOWI1NzlmOTQzZjg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0Jztcbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xuXG5mdW5jdGlvbiBQcm9taXNlQ2FwYWJpbGl0eShDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSBjMWI5NGUzZTk1ZWQ0MzVhZjU0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdQcm9taXNlJywgeyAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2Ygb25GaW5hbGx5ID09ICdmdW5jdGlvbic7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgfSA6IG9uRmluYWxseSxcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHRocm93IGU7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHlcbiAgKTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzXG4vLyBtb2R1bGUgaWQgPSBjMmUzNWJiZmY4MzMwOTU5NDNjMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanNcbi8vIG1vZHVsZSBpZCA9IGNiNzgzNzUyOTQ1NDJjMjRjNWJhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gZDE4MTBhZTUzMzJlMzZmZmEzYzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG5hdmlnYXRvciA9IGdsb2JhbC5uYXZpZ2F0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgfHwgJyc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdXNlci1hZ2VudC5qc1xuLy8gbW9kdWxlIGlkID0gZWM2Y2JlMzE3Yjk4NTBiMDVjZTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IGVmNTFkNDk4OWYzMDQ0YjJlYjMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzXG4vLyBtb2R1bGUgaWQgPSBmMGRiYzEwYzY4ZGQ4MTQwMTRlN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCBVcFN0b3JlSW5mb21hdGlvbiBmcm9tIFwiLi9VcFN0b3JlSW5mb21hdGlvblwiXHJcbmltcG9ydCB7YmVmb3JlRW50ZXJSb3V0ZXIsIGdldFNlYXJjaFBhcmFtfSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdFwiO1xyXG5pbXBvcnQge2dldE1jaG50QW5kQXJlYUluZiwgZ2V0TWNobnREZXRhaWx9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJXCI7XHJcbmltcG9ydCB7c3VibWl0SGFuZGxlQ2xpY2t9IGZyb20gXCIuLi9JZElkZW50aWZ5L0lkSWRlbnRpZnlBY3Rpb25zXCI7XHJcbmltcG9ydCB7VVBEQVRFX1NUT1JFX1NUQVRFfSBmcm9tIFwiLi4vLi4vc3RvcmUvYWN0aW9uXCI7XHJcblxyXG5cclxuY2xhc3MgVXBTdG9yZUluZm9tYXRpb25Db250YWluZXJzIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpXHJcblxyXG4gICAgICAgIGxldCBzZWFyY2ggPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaDtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpc0ZhaWxiYWNrOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyTXNnOiBcIlwiLFxyXG4gICAgICAgICAgICBoYXNGYWlsUGljdHVyZTogXCJcIixcclxuICAgICAgICAgICAgZmFpbFBpY3RydWVPYmo6IHt9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoISFzZWFyY2gpIHtcclxuICAgICAgICAgICAgLy/lpoLmnpxzZWFyY2gg5a2Y5Zyo5Luj6KGo5p2l6Ieq5a6h5qC45aSx6LSl55qE5Zue6LCD6aG16Z2iXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDlpoLmnpzmmK/lrqHmoLjlpLHotKXkuobov5vlhaXor6XpobXpnaLvvIzpnIDopoHlnKhVUkzkuIrpnaLliqDlhaXkuKTkuKrlj4LmlbBcclxuICAgICAgICAgICAgICogaXNGYWlsYmFjayAgICAgICDmmK/lkKbmnaXoh6rlrqHmoLjlpLHotKXpobXpnaIg5pivLXRydWUs5ZCmLWZhbHNlXHJcbiAgICAgICAgICAgICAqIGVyck1zZyAgICAgICAgICAg6ZSZ6K+v5Y6f5ZugXHJcbiAgICAgICAgICAgICAqIGhhc0ZhaWxQaWN0dXJlICAg5piv5ZCm5pyJ5aSx6LSl55qE5Zu+54mHICDmnIkgLXRydWUgICwg5rKh5pyJIC1mYWxzZVxyXG4gICAgICAgICAgICAgKiBmYWlsUGljdHJ1ZU9iaiAgIOmUmeivr+eahOWbvueJh+aYr+WTquS4gOexu1xyXG4gICAgICAgICAgICAgKiB7XHJcbiAgICAgICAgICAgICAqICAgICBjZXJ0VmVyaWZ5RmFpbFJlYXNvbjogZmFsc2UsICAgICAvL+i6q+S7veivgSDkv6Hmga/mnInor69cclxuICAgICAgICAgICAgICogICAgIGxpY1ZlcmlmeUZhaWxSZWFzb246IGZhbHNlLCAgICAgIC8v6JCl5Lia5omn54Wn5L+h5oGv5pyJ6K+vXHJcbiAgICAgICAgICAgICAqICAgICBzaG9wcGljVmVyaWZ5RmFpbFJlYXNvbjogZmFsc2UsICAvL+W6l+mTuueFp+eJh+acieivr1xyXG4gICAgICAgICAgICAgKiAgICAgYXV4VmVyaWZ5RmFpbFJlYXNvbjogZmFsc2UsICAgICAgLy/ovoXliqnor4HmmI7otYTmlpnmnInor69cclxuICAgICAgICAgICAgICogICAgIG1lcm5tVmVyaWZ5RmFpbFJlYXNvbjogZmFsc2UsICAgIC8v5bqX6ZO65ZCN56ew5pyJ6K+vXHJcbiAgICAgICAgICAgICAqICAgICBtZXJMb2dvVmVyaWZ5RmFpbFJlYXNvbjogZmFsc2UsICAgIC8v5bqX6ZO6bG9nb+acieivr1xyXG4gICAgICAgICAgICAgKiB9XHJcbiAgICAgICAgICAgICAqID9pc0ZhaWxiYWNrPXRydWUmZXJyTXNnPWFzZGZhc2Rmc2FkZiZoYXNGYWlsUGljdHVyZT1mYWxzZSZmYWlsUGljdHJ1ZU9iaj1hc2RmYWRmYXNmZHNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGxldCB7aXNGYWlsYmFjaywgZXJyTXNnLCBoYXNGYWlsUGljdHVyZSwgZmFpbFBpY3RydWVPYmp9ID0gZ2V0U2VhcmNoUGFyYW0oc2VhcmNoKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIGlzRmFpbGJhY2ssXHJcbiAgICAgICAgICAgICAgICBlcnJNc2csXHJcbiAgICAgICAgICAgICAgICBoYXNGYWlsUGljdHVyZSxcclxuICAgICAgICAgICAgICAgIGZhaWxQaWN0cnVlT2JqXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgYmVmb3JlRW50ZXJSb3V0ZXIoJ+W6l+mTuuS/oeaBrycpO1xyXG5cclxuICAgICAgICAvL+iOt+WPluWVhumTuuWIl+ihqOWSjOWcsOWdgOWIl+ihqFxyXG4gICAgICAgIGdldE1jaG50QW5kQXJlYUluZigpXHJcblxyXG4gICAgICAgIGxldCB7c3RvcmVuYW1lfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIC8v5aaC5p6cc3RvcmVuYW1l5LiN5a2Y5Zyo6K+05piO5rKh5pyJ5pON5L2c6L+H6L+Z5Liq6aG16Z2i77yM5bqU6K+l6K+75Y+W5ZWG5oi35L+h5oGv5Zue5pi+5ZWG5oi35L+h5oGvXHJcbiAgICAgICAgaWYoIXN0b3JlbmFtZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAvL+iOt+WPluW6l+mTuuivpuaDhVxyXG4gICAgICAgICAgICBnZXRNY2hudERldGFpbCgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDbGljayA9ICgpID0+IHtcclxuICAgICAgICBsZXQge2hpc3Rvcnl9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBsZXQge2ZhaWxQaWN0cnVlT2JqLCBpc0ZhaWxiYWNrLCBoYXNGYWlsUGljdHVyZX0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgICAgICBpZiAoaXNGYWlsYmFjaykge1xyXG4gICAgICAgICAgICAvL+WmguaenOaYr+adpeiHqumUmeivr+avgeaOiemhtemdou+8jOWImemcgOimgeWIpOaWreaYr+WQpuacieeFp+eJh+eahOmUmeivr+S/oeaBr1xyXG4gICAgICAgICAgICBpZiAoaGFzRmFpbFBpY3R1cmUpIHtcclxuICAgICAgICAgICAgICAgIC8v5aaC5p6c5pyJ6ZSZ6K+v55qE54Wn54mH6ZyA6KaB5bCG6ZSZ6K+v55qE54Wn54mH6YeN5paw5ouN54WnXHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBcIi9pZElkZW50aWZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiBcIj9mYWlsUGljdHJ1ZU9iaj1cIiArIGZhaWxQaWN0cnVlT2JqK1wiJmlzRmFpbGJhY2s9dHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmsqHmnInliJnnm7TmjqXlj5Hor7fmsYJcclxuICAgICAgICAgICAgICAgIGxldCB7c3RvcmVuYW1lLCBTdG9yZVRwLCBTdHJvZUFyZWEsIGFkZHJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAgICAgICAgIFN0cm9lQXJlYT1TdHJvZUFyZWEuc3BsaXQoJ3wnKTtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEhhbmRsZUNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZU5tOiBzdG9yZW5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgU3RvcmVUcDogU3RvcmVUcCxcclxuICAgICAgICAgICAgICAgICAgICBwcm92Q2Q6IFN0cm9lQXJlYVswXSxcclxuICAgICAgICAgICAgICAgICAgICBjaXR5Q2Q6IFN0cm9lQXJlYVsxXSxcclxuICAgICAgICAgICAgICAgICAgICBjb3V0eUNkOiAhIVN0cm9lQXJlYVsyXSA/IFN0cm9lQXJlYVsyXSA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkcjogYWRkcixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5LiN5piv5p2l6Ieq6ZSZ6K+v5L+h5oGv6aG16Z2i77yM5YiZ55u05o6l6Lez6L2s5Yiw5ouN54Wn5LiK5Lyg6aG16Z2iXHJcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwYXRobmFtZTogXCIvaWRJZGVudGlmeVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPFVwU3RvcmVJbmZvbWF0aW9uey4uLnRoaXMucHJvcHN9IHsuLi50aGlzLnN0YXRlfSBoYW5kbGVDbGljaz17dGhpcy5oYW5kbGVDbGlja30vPjtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwc3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0b3JlbmFtZTogc3RhdGUuZ2V0SW4oW1wibWNobnREZXRhaWxcIiwgXCJzdG9yZU5tXCJdKSxcclxuICAgICAgICBTdG9yZVRwOiBzdGF0ZS5nZXRJbihbXCJtY2hudERldGFpbFwiLCBcInN0b3JlVHBcIl0pLFxyXG4gICAgICAgIFN0cm9lQXJlYTogc3RhdGUuZ2V0SW4oW1wibWNobnREZXRhaWxcIiwgXCJhcmVhXCJdKSxcclxuICAgICAgICBhZGRyOiBzdGF0ZS5nZXRJbihbXCJtY2hudERldGFpbFwiLCBcImFkZHJcIl0pLFxyXG4gICAgICAgIG1lcmNoYW50VHBBcnI6IHN0YXRlLmdldEluKFtcIm1jaG50QW5kQXJlYUluZlwiLCBcIm1lcmNoYW50VHBBcnJcIl0pLnRvSlMoKSxcclxuICAgICAgICBhcmVhQXJyOiBzdGF0ZS5nZXRJbihbXCJtY2hudEFuZEFyZWFJbmZcIiwgXCJhcmVhQXJyXCJdKS50b0pTKCksXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcERpc3BhdGhUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAvKipcclxuICAgICAqIOeUqOS6jueUqOaIt+abtOaWsFJlZHV45Lit55qE5bqX6ZO65ZCN56ewXHJcbiAgICAgKi9cclxuICAgIGxldCBjaGFuZ2VTdG9yZU5hbWUgPSAodmFsdWUpID0+IHtcclxuICAgICAgICBkaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe21jaG50RGV0YWlsOiB7c3RvcmVObTogdmFsdWV9fSkpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjkuo7nlKjmiLfmm7TmlrBSZWR1eOS4reeahOW6l+mTuuexu+Wei1xyXG4gICAgICovXHJcbiAgICBsZXQgY2hhbmdlU3RvcmVUeXBlID0gKHZhbHVlKSA9PiB7XHJcblxyXG4gICAgICAgIGRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7bWNobnREZXRhaWw6IHtzdG9yZVRwOiB2YWx1ZVsxXX19KSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUqOS6jueUqOaIt+abtOaWsFJlZHV45Lit55qE5bqX6ZO65Zyw5Z2A5Yy65Z+fXHJcbiAgICAgKi9cclxuICAgIGxldCBjaGFuZ2VTdG9yZUFyZWEgPSAodmFsdWUpID0+IHtcclxuICAgICAgICBsZXQgc3RvcmVBcmVhPXZhbHVlLmpvaW4oJ3wnKTtcclxuICAgICAgICBkaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe21jaG50RGV0YWlsOiB7YXJlYTogc3RvcmVBcmVhfX0pKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55So5LqO55So5oi35pu05pawUmVkdXjkuK3nmoTlupfpk7rlnLDlnYBcclxuICAgICAqL1xyXG4gICAgbGV0IGNoYW5nZVN0b3JlQWRkciA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7bWNobnREZXRhaWw6IHthZGRyOiB2YWx1ZX19KSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNoYW5nZVN0b3JlTmFtZTogY2hhbmdlU3RvcmVOYW1lLFxyXG4gICAgICAgIC8vIGNoYW5nZUlucHV0RXJyU3RhdGU6YmluZEFjdGlvbkNyZWF0b3JzKGNoYW5nZUlucHV0RXJyU3RhdGUsZGlzcGF0Y2gpLFxyXG4gICAgICAgIGNoYW5nZVN0b3JlVHlwZTogY2hhbmdlU3RvcmVUeXBlLFxyXG4gICAgICAgIGNoYW5nZVN0b3JlQXJlYTogY2hhbmdlU3RvcmVBcmVhLFxyXG4gICAgICAgIGNoYW5nZVN0b3JlQWRkcjogY2hhbmdlU3RvcmVBZGRyLFxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwc3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRoVG9Qcm9wcykoVXBTdG9yZUluZm9tYXRpb25Db250YWluZXJzKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvVXBTdG9yZUluZm9tYXRpb24vVXBTdG9yZUluZm9tYXRpb25Db250YWluZXJzLmpzIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4vX3VzZXItYWdlbnQnKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52OCB8fCAnJztcbnZhciAkUHJvbWlzZSA9IGdsb2JhbFtQUk9NSVNFXTtcbnZhciBpc05vZGUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbnZhciBlbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBJbnRlcm5hbCwgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBPd25Qcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIHZhciBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICAgIGV4ZWMoZW1wdHksIGVtcHR5KTtcbiAgICB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpXG4gICAgICAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2VcbiAgICAgIC8vIHY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTgzMDU2NVxuICAgICAgLy8gd2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgICAgICYmIHY4LmluZGV4T2YoJzYuNicpICE9PSAwXG4gICAgICAmJiB1c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lLzY2JykgPT09IC0xO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuLCBleGl0ZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7IC8vIG1heSB0aHJvd1xuICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgICAgICBleGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaSkgcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKSBvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIHVuaGFuZGxlZCA9IGlzVW5oYW5kbGVkKHByb21pc2UpO1xuICAgIHZhciByZXN1bHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYgKHVuaGFuZGxlZCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKSB7XG4gICAgICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodW5oYW5kbGVkICYmIHJlc3VsdC5lKSB0aHJvdyByZXN1bHQudjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgcmV0dXJuIHByb21pc2UuX2ggIT09IDEgJiYgKHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYykubGVuZ3RoID09PSAwO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gZmE5ODdkODExZTRlYjJkNDNkOWNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4Il0sInNvdXJjZVJvb3QiOiIifQ==