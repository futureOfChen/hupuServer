webpackJsonp([6],{

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

/***/ "3ec0d770a0566a73ffd9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _button = __webpack_require__("8d56c7db4300680162d8");

var _button2 = _interopRequireDefault(_button);

__webpack_require__("7d3ac17646a09c5ffd57");

var _Picture = __webpack_require__("4efd02de9ed3aebf5380");

var _Picture2 = _interopRequireDefault(_Picture);

var _AgreeComp = __webpack_require__("4e2b0651b0f1f60250d3");

var _AgreeComp2 = _interopRequireDefault(_AgreeComp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IdIdentify = function (_React$Component) {
    (0, _inherits3.default)(IdIdentify, _React$Component);

    function IdIdentify(props, context) {
        (0, _classCallCheck3.default)(this, IdIdentify);

        var _this = (0, _possibleConstructorReturn3.default)(this, (IdIdentify.__proto__ || (0, _getPrototypeOf2.default)(IdIdentify)).call(this, props, context));

        _this.hanlePhotoClick = function (key, isMust) {

            var app = UP.W.App;
            app.onPluginReady(function () {
                app.chooseImage({ maxWidth: 292, maxHeight: 176 }, function (data) {
                    var obj = {};
                    obj[key] = data.base64;
                    _this.props.changePhoto(obj);
                }, function (err) {});
            });
        };

        return _this;
    }

    /**
     *key 是键值
     */


    (0, _createClass3.default)(IdIdentify, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                isAgreeUpCodeAgreement = _props.isAgreeUpCodeAgreement,
                certifPic1 = _props.certifPic1,
                certifPic2 = _props.certifPic2,
                certifPic3 = _props.certifPic3,
                licensePic = _props.licensePic,
                shopPic1 = _props.shopPic1,
                shopPic2 = _props.shopPic2,
                auxProvMat1 = _props.auxProvMat1,
                auxProvMat2 = _props.auxProvMat2,
                shopLogoPic = _props.shopLogoPic,
                changeAgreement = _props.changeAgreement,
                isFailback = _props.isFailback,
                failPictrueObj = _props.failPictrueObj,
                handleClick = _props.handleClick;
            //计算协议的样式

            var agreeClass = isAgreeUpCodeAgreement ? "agreIcon" : "notAgreeIcon";

            //默认所有的部分都不显示
            var showCertVerify = false,
                showlicVerify = false,
                showshoppicVerify = false,
                showauxVerify = false,
                showmerLogoVerify = false;

            //判定是不是diaable的按钮，如果来自失败页面，则根据failPictrueObj 来判定否则需要校验和显示与否
            // 如果ertifPic1, certifPic2, certifPic3, licensePic 不是NUll 并且同意了协议 则可以点击按钮
            var disableBtn = void 0,
                picArray = [];
            if (isFailback) {
                var keys = (0, _keys2.default)(failPictrueObj);
                keys.forEach(function (item) {
                    switch (item) {
                        case "certVerifyFailReason":
                            picArray.concat([certifPic1, certifPic2, certifPic3]);
                            showCertVerify = true;
                            break;
                        case "licVerifyFailReason":
                            picArray.push(licensePic);
                            showlicVerify = true;
                            break;
                        case "shoppicVerifyFailReason":
                            picArray.concat([shopPic1, shopPic2]);
                            showshoppicVerify = true;
                            break;
                        case "auxVerifyFailReason":
                            picArray.concat([auxProvMat1, auxProvMat2]);
                            showauxVerify = true;
                            break;
                        case "merLogoVerifyFailReason":
                            picArray.push(shopLogoPic);
                            showmerLogoVerify = true;
                            break;
                    }
                });
                if (!picArray.includes(null)) {
                    disableBtn = false;
                } else {
                    disableBtn = true;
                }
            } else {
                if (!!certifPic1 && !!certifPic2 && !!certifPic3 && !!licensePic && isAgreeUpCodeAgreement) {
                    disableBtn = false;
                } else {
                    disableBtn = true;
                }

                showCertVerify = true, showlicVerify = true, showshoppicVerify = true, showauxVerify = true, showmerLogoVerify = true;
            }

            return _react2.default.createElement(
                "div",
                { id: "ii" },
                _react2.default.createElement(
                    "div",
                    { id: "contentWarp" },
                    _react2.default.createElement(
                        "div",
                        { className: "content pb32" },
                        showCertVerify && _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                "label",
                                { className: "pt32" },
                                "\u4E0A\u4F20\u8BC1\u4EF6\u7167\u7247(\u5FC5\u586B)"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "picWarp-div pb32" },
                                _react2.default.createElement(_Picture2.default, { value: certifPic1, label: "\u56FD\u5FBD\u6240\u5728\u9762", isMust: true, name: "certifPic1",
                                    onClick: this.hanlePhotoClick }),
                                _react2.default.createElement(_Picture2.default, { value: certifPic2, label: "\u7167\u7247\u6240\u5728\u9762", isMust: true, name: "certifPic2",
                                    onClick: this.hanlePhotoClick }),
                                _react2.default.createElement(_Picture2.default, { value: certifPic3, label: "\u624B\u6301\u8EAB\u4EFD\u56FD\u5FBD\u6240\u5728\u9762", isMust: true, name: "certifPic3",
                                    className: "pt32",
                                    onClick: this.hanlePhotoClick })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "idInfo-introduce" },
                                "\u8BF7\u4E0A\u4F20\u5F69\u8272\u8EAB\u4EFD\u8BC1\u7167\u7247\uFF0C\u62CD\u6444\u9700\u6E05\u6670",
                                _react2.default.createElement("br", null),
                                "\u8BF7\u5728\u5149\u7EBF\u5145\u8DB3\u7684\u5730\u65B9\u62CD\u6444",
                                _react2.default.createElement("br", null),
                                "\u8BF7\u4FDD\u8BC1\u4EE5\u4E0A\u7528\u6237\u4FE1\u606F\u4E0E\u4E91\u95EA\u4ED8\u7528\u6237\u76F8\u7B26"
                            )
                        ),
                        showlicVerify && _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                "label",
                                { className: "pt32" },
                                "\u4E0A\u4F20\u8425\u4E1A\u6267\u7167\u7167\u7247(\u5FC5\u586B)"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "picWarp-div pb32" },
                                _react2.default.createElement(_Picture2.default, { value: licensePic, label: "\u8425\u4E1A\u6267\u7167\u6B63\u9762\uFF0C\u9700\u540C\u8EAB\u4EFD\u8BC1\u59D3\u540D\u4FDD\u6301\u4E00\u81F4", isMust: true,
                                    name: "licensePic",
                                    onClick: this.hanlePhotoClick })
                            )
                        ),
                        showshoppicVerify && _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                "label",
                                { className: "pt32" },
                                "\u4E0A\u4F20\u5E97\u94FA\u7167\u7247(\u9009\u586B)"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "picWarp-div" },
                                _react2.default.createElement(_Picture2.default, { value: shopPic1, label: "\u6DFB\u52A0\u5E97\u94FA\u7167\u7247", name: "shopPic1",
                                    onClick: this.hanlePhotoClick }),
                                _react2.default.createElement(_Picture2.default, { value: shopPic2, label: "\u6DFB\u52A0\u5E97\u94FA\u7167\u7247", name: "shopPic2",
                                    onClick: this.hanlePhotoClick })
                            )
                        ),
                        showauxVerify && _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                "label",
                                { className: "pt32" },
                                "\u4E0A\u4F20\u8F85\u52A9\u8BC1\u660E\u8D44\u6599\u7167\u7247(\u9009\u586B)"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "picWarp-div" },
                                _react2.default.createElement(_Picture2.default, { value: auxProvMat1, label: "", name: "auxProvMat1",
                                    onClick: this.hanlePhotoClick }),
                                _react2.default.createElement(_Picture2.default, { value: auxProvMat2, label: "", name: "auxProvMat2",
                                    onClick: this.hanlePhotoClick })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "storeInfo-introduce" },
                                "\u6709\u52A9\u4E8E\u8BC1\u660E\u5E97\u94FA\u4FE1\u606F\u771F\u5B9E\u7684\u6750\u6599\uFF0C\u5982\u8425\u4E1A\u573A\u6240\u79DF\u8D41\u534F\u8BAE\u3001\u4EA7\u6743\u8BC1\u660E\u7B49"
                            )
                        ),
                        showmerLogoVerify && _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                "label",
                                { className: "pt32" },
                                "\u4E0A\u4F20\u5E97\u94FALOGO(\u9009\u586B)"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "picWarp-div" },
                                _react2.default.createElement(_Picture2.default, { value: shopLogoPic, label: "", name: "shopLogoPic",
                                    onClick: this.hanlePhotoClick })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "storeInfo-introduce" },
                                "\u8BF7\u4E0A\u4F20\u5E97\u6807\uFF0C\u5373\u53EF\u4EE3\u8868\u60A8\u5E97\u94FA\u7684\u6807\u5FD7\uFF0C\u5982\u95E8\u5934\u6807\u5FD7\u3001\u5546\u6807\u3002"
                            )
                        )
                    ),
                    _react2.default.createElement(_AgreeComp2.default, { agreeClass: agreeClass, hanleAgrementClick: changeAgreement.bind(this, !isAgreeUpCodeAgreement) })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "submit-warp-button", style: { position: "relative", paddingLeft: "0", paddingRight: "0" } },
                    _react2.default.createElement(
                        _button2.default,
                        { type: "primary", disabled: disableBtn, onClick: handleClick },
                        "\u63D0\u4EA4"
                    )
                )
            );
        }
    }]);
    return IdIdentify;
}(_react2.default.Component);

exports.default = IdIdentify;

/***/ }),

/***/ "4e2b0651b0f1f60250d3":
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

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AgreeComp = function (_React$Component) {
    (0, _inherits3.default)(AgreeComp, _React$Component);

    function AgreeComp(props, context) {
        (0, _classCallCheck3.default)(this, AgreeComp);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AgreeComp.__proto__ || (0, _getPrototypeOf2.default)(AgreeComp)).call(this, props, context));

        _this.handleClick = function () {
            var _this$state = _this.state,
                protoCd = _this$state.protoCd,
                protoNm = _this$state.protoNm;

            var url = location.protocol + "//" + location.host + "/s/wl/xvshAgree/" + protoCd + ".html";
            (0, _request.createWebView)(url, null, protoNm, "0");
        };

        _this.state = {
            protoCd: "00010002",
            protoNm: "银联云闪付收款码收单服务协议"
        };
        return _this;
    }

    (0, _createClass3.default)(AgreeComp, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            (0, _requestAPI.getProtocolInfo)().then(function (data) {
                _this2.setState(data);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                agreeClass = _props.agreeClass,
                hanleAgrementClick = _props.hanleAgrementClick;
            var _state = this.state,
                protoCd = _state.protoCd,
                protoNm = _state.protoNm;
            // href={`/s/wl/xvshAgree/${protoCd}.html`}

            return _react2.default.createElement(
                "div",
                { className: "agree-warp-div mt36", style: { paddingLeft: 0 } },
                _react2.default.createElement(
                    "label",
                    { htmlFor: "agree", onClick: hanleAgrementClick, className: "agree-Self" },
                    _react2.default.createElement("i", { className: agreeClass })
                ),
                _react2.default.createElement(
                    "span",
                    null,
                    "\u9605\u8BFB\u5E76\u540C\u610F ",
                    _react2.default.createElement(
                        "a",
                        { onClick: this.handleClick },
                        "\u300A" + protoNm + "\u300B"
                    )
                )
            );
        }
    }]);
    return AgreeComp;
}(_react2.default.Component);

exports.default = AgreeComp;

/***/ }),

/***/ "4efd02de9ed3aebf5380":
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

var Picture = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(Picture, _React$Component);

    function Picture(props, context) {
        (0, _classCallCheck3.default)(this, Picture);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Picture.__proto__ || (0, _getPrototypeOf2.default)(Picture)).call(this, props, context));

        _this.hanlePhotoClick = function () {
            _this.props.onClick(_this.props.name, _this.props.isMust);
        };

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(Picture, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                isMust = _props.isMust,
                label = _props.label,
                value = _props.value,
                className = _props.className;

            return _react2.default.createElement(
                "div",
                { className: "infoItem " + className },
                _react2.default.createElement(
                    "div",
                    { className: isMust ? "picBord" : "picBord",
                        onClick: this.hanlePhotoClick },
                    value == undefined ? _react2.default.createElement(
                        "div",
                        { className: "border" },
                        _react2.default.createElement("i", { className: "photo-icon" })
                    ) : _react2.default.createElement(
                        "div",
                        { className: "imageBg" },
                        _react2.default.createElement("img", { src: "data:img/jpg;base64," + value, alt: "" })
                    )
                ),
                _react2.default.createElement(
                    "span",
                    null,
                    label
                )
            );
        }
    }]);
    return Picture;
}(_react2.default.Component), _class.propTypes = {
    // picture:PropTypes.,
    label: _propTypes2.default.string,
    isMust: _propTypes2.default.bool,
    name: _propTypes2.default.string,
    onClick: _propTypes2.default.func,
    className: _propTypes2.default.string
}, _class.defaultProps = {
    isMust: false,
    className: "",
    label: ""
}, _temp);
exports.default = Picture;

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

/***/ "7d3ac17646a09c5ffd57":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"ii":"ii","pb32":"pb32","content":"content","pt32":"pt32","must-in":"must-in","picWarp-div":"picWarp-div","infoItem":"infoItem","picBord":"picBord","border":"border","photo-icon":"photo-icon","imageBg":"imageBg","idInfo-introduce":"idInfo-introduce","storeInfo-introduce":"storeInfo-introduce","mt36":"mt36"};

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

/***/ "b04e61ecf23110741176":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__("7474e09206d6df50164e");

var _extends3 = _interopRequireDefault(_extends2);

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

var _IdIdentify = __webpack_require__("3ec0d770a0566a73ffd9");

var _IdIdentify2 = _interopRequireDefault(_IdIdentify);

var _request = __webpack_require__("76fb50331ac78bf18670");

var _action = __webpack_require__("5d4604b08304c597d074");

var _IdIdentifyActions = __webpack_require__("b401e319c41c5a1d857e");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IdIdentifyContainers = function (_Component) {
    (0, _inherits3.default)(IdIdentifyContainers, _Component);

    function IdIdentifyContainers(props, context) {
        (0, _classCallCheck3.default)(this, IdIdentifyContainers);

        var _this = (0, _possibleConstructorReturn3.default)(this, (IdIdentifyContainers.__proto__ || (0, _getPrototypeOf2.default)(IdIdentifyContainers)).call(this, props, context));

        _this.handleClick = function () {
            var _this$state = _this.state,
                failPictrueObj = _this$state.failPictrueObj,
                isFailback = _this$state.isFailback;
            var _this$props = _this.props,
                certifPic1 = _this$props.certifPic1,
                certifPic2 = _this$props.certifPic2,
                certifPic3 = _this$props.certifPic3,
                licensePic = _this$props.licensePic,
                shopPic1 = _this$props.shopPic1,
                shopPic2 = _this$props.shopPic2,
                auxProvMat1 = _this$props.auxProvMat1,
                auxProvMat2 = _this$props.auxProvMat2,
                shopLogoPic = _this$props.shopLogoPic,
                merchantDetail = _this$props.merchantDetail;

            var StroeArea = merchantDetail.area.split('|');
            if (isFailback) {
                //如果是从审核错误结果页回调回来的，根据failPictrueObj来决定参数
                var param = {};
                (0, _keys2.default)(failPictrueObj).forEach(function (key) {

                    if (key == "mernmVerifyFailReason" && showErrorPic[key]) {
                        //如果有用户信息出错
                        (0, _assign2.default)(param, {
                            storeNm: merchantDetail.storeNm,
                            StoreTp: merchantDetail.storeTp,
                            provCd: StroeArea[0],
                            cityCd: StroeArea[1],
                            coutyCd: !!StroeArea[2] ? StroeArea[2] : null,
                            addr: merchantDetail.addr
                        });
                    } else if (key == "certVerifyFailReason" && showErrorPic[key]) {
                        (0, _assign2.default)(param, {
                            certifPic1: certifPic1,
                            certifPic2: certifPic2,
                            certifPic3: certifPic3
                        });
                    } else if (key == "licVerifyFailReason" && showErrorPic[key]) {
                        (0, _assign2.default)(param, {
                            licensePic: licensePic
                        });
                    } else if (key == "shoppicVerifyFailReason" && showErrorPic[key]) {
                        (0, _assign2.default)(param, {
                            shopPic1: shopPic1,
                            shopPic2: shopPic2
                        });
                    } else if (key == "auxVerifyFailReason" && showErrorPic[key]) {
                        (0, _assign2.default)(param, {
                            auxProvMat1: auxProvMat1,
                            auxProvMat2: auxProvMat2
                        });
                    } else {
                        (0, _assign2.default)(param, {
                            shopLogoPic: shopLogoPic
                        });
                    }
                });
                (0, _IdIdentifyActions.submitHandleClick)(param);
            } else {

                //否则将所有的商户信息发送给后台
                (0, _IdIdentifyActions.submitHandleClick)({
                    storeNm: merchantDetail.storeNm,
                    StoreTp: merchantDetail.storeTp,
                    provCd: StroeArea[0],
                    cityCd: StroeArea[1],
                    coutyCd: !!StroeArea[2] ? StroeArea[2] : null,
                    addr: merchantDetail.addr,
                    certifPic1: certifPic1,
                    certifPic2: certifPic2,
                    certifPic3: certifPic3,
                    licensePic: licensePic,
                    shopPic1: shopPic1,
                    shopPic2: shopPic2,
                    auxProvMat1: auxProvMat1,
                    auxProvMat2: auxProvMat2,
                    shopLogoPic: shopLogoPic
                });
            }
        };

        _this.state = {
            isFailback: false, //是否来自失败页面
            failPictrueObj: {} //要更新的图片有哪些
        };

        var search = _this.props.location.search;
        if (!!search) {
            //如果search 存在代表来自审核失败的回调页面
            /**
             * 如果是审核失败了进入该页面，需要在URL上面加入两个参数
             * isFailback       是否来自审核失败页面 是-true,否-false
             * failPictrueObj   错误的图片是哪一类 他是JSON string 串
             * {
             *     mernmVerifyFailReason: false,    //店铺名称有误 true  代表有错误，false 代表没有错误
             *     certVerifyFailReason: false,     //身份证 信息有误
             *     licVerifyFailReason: false,      //营业执照信息有误
             *     shoppicVerifyFailReason: false,  //店铺照片有误
             *     auxVerifyFailReason: false,      //辅助证明资料有误
             *     merLogoVerifyFailReason: false,    //店铺logo有误
             *
             * }
             */
            var _getSearchParam = (0, _request.getSearchParam)(search),
                isFailback = _getSearchParam.isFailback,
                failPictrueObj = _getSearchParam.failPictrueObj;

            failPictrueObj = JSON.parse(failPictrueObj);
            _this.state = {
                isFailback: isFailback,
                failPictrueObj: failPictrueObj
            };
        }
        return _this;
    }

    (0, _createClass3.default)(IdIdentifyContainers, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _request.beforeEnterRouter)('身份信息核验');
        }

        /**
         * 处理按钮点击事件
         */

    }, {
        key: 'render',
        value: function render() {
            // console.log(this.props);
            return _react2.default.createElement(_IdIdentify2.default, (0, _extends3.default)({}, this.props, this.state, { handleClick: this.handleClick }));
        }
    }]);
    return IdIdentifyContainers;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {
    return {
        merchantDetail: state.getIn(["mchntDetail"]).toJS(),
        certifPic1: state.getIn(["updateImg", "certifPic1"]), //身份证国徽所在面
        certifPic2: state.getIn(["updateImg", "certifPic2"]), //身份证照片所在面
        certifPic3: state.getIn(["updateImg", "certifPic3"]), //手持身份证的照片
        licensePic: state.getIn(["updateImg", "licensePic"]), //营业执照照片
        shopPic1: state.getIn(["updateImg", "shopPic1"]), //店铺照片1
        shopPic2: state.getIn(["updateImg", "shopPic2"]), //店铺照片2
        auxProvMat1: state.getIn(["updateImg", "auxProvMat1"]), //辅助证明照片1
        auxProvMat2: state.getIn(["updateImg", "auxProvMat2"]), //辅助证明照片1
        shopLogoPic: state.getIn(["updateImg", "shopLogoPic"]), //店铺logo 照片
        isAgreeUpCodeAgreement: state.getIn(["isAgreeUpCodeAgreement"])
    };
};

var mapDispathToProps = function mapDispathToProps(dispatch) {

    /**
     * 更新redux 中的照片
     * @param value  {key:value }对象  举个栗子：{certifPic1:base64Str}
     */
    var changePhoto = function changePhoto(value) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ updateImg: value }));
    };
    /**
     * g更新redux中协议代表的状态，
     * @param val
     */
    var changeAgreement = function changeAgreement(val) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ isAgreeUpCodeAgreement: val }));
    };

    return {
        changePhoto: changePhoto,
        changeAgreement: changeAgreement
    };
};
exports.default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(IdIdentifyContainers);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0lkSWRlbnRpZnkvSWRJZGVudGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JZElkZW50aWZ5L0FncmVlQ29tcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JZElkZW50aWZ5L1BpY3R1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSWRJZGVudGlmeS9JZElkZW50aWZ5LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvY2FjaGVTdG9yYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JZElkZW50aWZ5L0lkSWRlbnRpZnlDb250YWluZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0lkSWRlbnRpZnkvSWRJZGVudGlmeUFjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyJdLCJuYW1lcyI6WyJyZWNtZFJlY29yZCIsInNoYXJsaW5rIiwiaXNCbGFjayIsImlzQXBwbHkiLCJhcHBseU1jYyIsImdldENhcmRsaXN0IiwiZ2V0QWRkckxpc3QiLCJhcHBseU1hdCIsImdldFFyVXJsUmVzdCIsImdldE1jaG50QW5kQXJlYUluZiIsImdldE1jaG50RGV0YWlsIiwidXBncmFkZU1jYyIsImdldFByb3RvY29sSW5mbyIsImdldEhpc3RvcnlJbmNvbWUiLCJnZXRIaXN0b3J5VHJhbnMiLCJnZXRUb2RheUluY29tZSIsImdldFRvZGF5VHJhbnMiLCJnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtIiwiZ2V0TG9naXN0aWNzU3QiLCJnZXRVcGdyYWRlU3QiLCJnZXRMb2dpc3RpY3NMaXN0IiwiZ2V0QXVkaXRJbmZvIiwiZ2V0TGltaXRBdEluZm8iLCJtY2hudE9wZXIiLCJkZWxldGVBZGRyZXNzIiwidXBkYXRlTWNjQ2FyZCIsIm5ld0FkZHJlc3MiLCJlZGl0QWRkcmVzcyIsInNldE1jY09uT2ZmIiwiZ2V0TWNjVHJhbnNOdW0iLCJwaG9uZSIsInVuZGVmaW5lZCIsInJlY21kTW9iaWxlIiwiVXRpbCIsImJhc2U2NEVuY29kZSIsIkNPTkZJRyIsIlJFU1QiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwiU1RBVFVTQ09ERSIsIlNVQ0NFU1MiLCJyb2xsS2V5IiwiQ0FDSEVLRVkiLCJzZWNvbmRLZXkiLCJmdWxsIiwicmVzb2x2ZSIsInNoYXJlTGluayIsInJlZFVybFN0ciIsImRhdGEiLCJpZGVudGlmaWVyIiwibmV4dFN0YXRlIiwic3RvcmUiLCJkaXNwYXRjaCIsInVwZGF0ZSIsInVwZGF0ZUZ1bmMiLCJyZXNwIiwiYmxhY2tTdCIsImNvbnNvbGUiLCJsb2ciLCJjYWNoZVBhcmFtIiwiYXBwbHlTdCIsInBhcmFtIiwicmVmZXJlZVRlbCIsInZpcnR1YWxDYXJkTm8iLCJhY2NObSIsImNpdHlDZCIsImNvbW9tUGFyYW0iLCJnZXRNY2NDYXJkTGlzdCIsImNhcmRMaXN0IiwibGVuZ3RoIiwiZGVmYWx1dENhcmQiLCJiYW5rIiwiY2FyZFR5cGUiLCJmdW5jdGlvbkJpdG1hcCIsImljb25SZWxVcmwiLCJpc1N1cHBvcnQiLCJwYW4iLCJyYW5rIiwic2VsZWN0ZWQiLCJmb3JFYWNoIiwiaXRlbSIsImsiLCJzdG9yZVN0YXRlIiwic3RvcmVSZWNlaXZlQ2FyZE9iaiIsInN0YXRlIiwiYWRkcmVzc0xpc3QiLCJyZXN1bHQiLCJtYXRlcmlhbExpc3QiLCJkZWxpdk5tIiwiYWRkQWxsIiwiZGVsaXZQaG9uZSIsInByb3ZpbmNlSWQiLCJjaXR5SWQiLCJhcmVhSWQiLCJhZGRyZXNzSW5mbyIsImlkIiwiY2l0eU5tIiwicmVkVXJsIiwiZ2V0UXJVcmwiLCJtY2hudERldGFpbCIsInFyVXJsIiwicXJOdW0iLCJhcmVhIiwibWVyY2hhbnRUcCIsImFyZWFBcnIiLCJwcm92aW5jZSIsIm9uZSIsInByb0lkIiwicHJvTm0iLCJ0d28iLCJjaXR5IiwidGhyZWUiLCJ2YWx1ZSIsImNoaWxkcmVuIiwicHVzaCIsImFyZWFObSIsIm1lcmNoYW50VHBBcnIiLCJtZXJUeXBlMSIsIm1lcmNoYW50VHBDZCIsIm1lcmNoYW50VHBObSIsIm1lclR5cGUyIiwibWNobnRBbmRBcmVhSW5mIiwic3RvcmVObSIsIlN0b3JlVHAiLCJwcm92Q2QiLCJjb3V0eUNkIiwiYWRkciIsImNlcnRpZlBpYzEiLCJjZXJ0aWZQaWMyIiwiY2VydGlmUGljMyIsImxpY2Vuc2VQaWMiLCJzaG9wUGljMSIsInNob3BQaWMyIiwiYXV4UHJvdk1hdDEiLCJhdXhQcm92TWF0MiIsInNob3BMb2dvUGljIiwiVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3QiLCJyZXMiLCJoaXN0b3J5SW5jb21lT2JqIiwib3JpZ2luTGlzdERhdGEiLCJnZXRTdGF0ZSIsImdldEluIiwidG9KUyIsIm5ld0xpc3QiLCJ0cmFuc0luZm8iLCJoaXN0b3J5T3JkZXJMaXN0IiwiY29uY2F0IiwidG9kYXlJbmNvbWVPYmoiLCJ0b2RheU9yZGVyTGlzdCIsIm5ld09iaiIsImRlbGl2ZXJ5TXNnIiwibWF0RGVsaXZTdGF0dXMiLCJsaW1pdEluZm8iLCJpc1VzZU1jYyIsIm1jY1RyYW5zTnVtIiwidHJhbnNOdW0iLCJJZElkZW50aWZ5IiwicHJvcHMiLCJjb250ZXh0IiwiaGFubGVQaG90b0NsaWNrIiwia2V5IiwiaXNNdXN0IiwiYXBwIiwiVVAiLCJXIiwiQXBwIiwib25QbHVnaW5SZWFkeSIsImNob29zZUltYWdlIiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJvYmoiLCJiYXNlNjQiLCJjaGFuZ2VQaG90byIsImVyciIsImlzQWdyZWVVcENvZGVBZ3JlZW1lbnQiLCJjaGFuZ2VBZ3JlZW1lbnQiLCJpc0ZhaWxiYWNrIiwiZmFpbFBpY3RydWVPYmoiLCJoYW5kbGVDbGljayIsImFncmVlQ2xhc3MiLCJzaG93Q2VydFZlcmlmeSIsInNob3dsaWNWZXJpZnkiLCJzaG93c2hvcHBpY1ZlcmlmeSIsInNob3dhdXhWZXJpZnkiLCJzaG93bWVyTG9nb1ZlcmlmeSIsImRpc2FibGVCdG4iLCJwaWNBcnJheSIsImtleXMiLCJpbmNsdWRlcyIsImJpbmQiLCJwb3NpdGlvbiIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwiUmVhY3QiLCJDb21wb25lbnQiLCJBZ3JlZUNvbXAiLCJwcm90b0NkIiwicHJvdG9ObSIsInVybCIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJob3N0Iiwic2V0U3RhdGUiLCJoYW5sZUFncmVtZW50Q2xpY2siLCJQaWN0dXJlIiwib25DbGljayIsIm5hbWUiLCJsYWJlbCIsImNsYXNzTmFtZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImJvb2wiLCJmdW5jIiwiZGVmYXVsdFByb3BzIiwicmVxdWVzdCIsInNldFhpYW9XZWlQYXkiLCJ3aW5kb3ciLCJFbnYiLCJyZWdQaG9uZSIsInJlZ1BheU51bSIsInZlcnNpb24iLCJzb3VyY2UiLCJiYXNlVXJsIiwiYmFzZVVybDIiLCJiYXNlVXJsMyIsImhvc3RuYW1lIiwiaW5kZXhPZiIsImdldFNlcnZVcmwiLCJzZXJ2ZXJVcmwiLCJ1c2VySW5mbyIsInNwbGl0IiwiZ2V0Q2l0eSIsInJlc3BvbnNlRm9ybWF0dGVyIiwicGFyYW1zIiwibXNnIiwiZGVsZXRlU2xhc2giLCJyZXBsYWNlIiwiYWRkU2xhc2giLCJwYXRoIiwidGVzdCIsInNlcGFyYXRlUGFyYW1zIiwicGFyYW1zTGluZSIsImNvbmZpZyIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwiZmluYWxVcmwiLCJyZWplY3QiLCJvcHRpb25zIiwidHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsIkVycm9yIiwiZGF0YVR5cGUiLCIkIiwiYWpheCIsImdldCIsInBhcmFtQWxsIiwiZm9yQ2hzcCIsImVuY3J5cHQiLCJjYWNoZSIsImJ5QWpheCIsInBvc3QiLCJwdXQiLCJkZWwiLCJnZXRTZWFyY2hQYXJhbSIsInNlYXJjaCIsInN0ciIsInNsaWNlIiwiYXJyYXkiLCJzdWMiLCJzZXRYaWFvV2VpQXVkaW8iLCJnZXRYaWFvV2VpQXVkaW8iLCJ0b2FzdCIsIm1zIiwiVG9hc3QiLCJpbmZvIiwiYmVmb3JlRW50ZXJSb3V0ZXIiLCJ0aXRsZSIsInJpZ2h0QmFyIiwicmlnaHRDYWxsYmFjayIsInJpZ2h0QmFySW1nIiwiZG9jdW1lbnQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJzZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24iLCJtY2NTdGF0ZUNoYW5nZWQiLCJzZW5kUXJDb2RlIiwiZmFpbCIsInNjYW5RUkNvZGUiLCJjbG9zZVdlYlZpZXciLCJ2ZXJpZnlQYXlQd2QiLCJjcmVhdGVXZWJWaWV3IiwiaXNGaW5pc2giLCJnZXRVc2VyRGV0YWlsSW5mbyIsInNhdmVRY29kZSIsImNhbnZhcyIsInVpIiwiVUkiLCJwaWNVcmwiLCJ0b0RhdGFVUkwiLCJsb2dFdmVudCIsInNhdmVQaWNUb0xvY2FsIiwic3Vic3RyIiwic2hvd1RvYXN0V2l0aFBpYyIsInNob3dBbGVydCIsImVudiIsImlzSU9TIiwib3BlbkJyb3dzZXIiLCJzaG93VG9hc3QiLCJzaGFyZSIsImRlc2MiLCJpbWdVUkwiLCJwYWdlVVJsIiwic2hvd1NoYXJlUGFuZWwiLCJzaGFyZVVybCIsImdldEN1cnJlbnRMb2NhdGlvbkluZm8iLCJjYWxsYmFjazIiLCJzaG93TG9hZGluZyIsImNhbGxiYWNrIiwiZGlzbWlzcyIsInNlbmRNZXNzYWdlIiwiY21kIiwiZmV0Y2hOYXRpdmVEYXRhIiwieGhyIiwiY3JlYXRlVGV4dENhbnZhc2UiLCJ0ZXh0IiwiY29sb3IiLCJsb25nIiwic2hvdCIsInJlbTJweCIsInZhbCIsImNXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0Iiwic2V0QXR0cmlidXRlIiwid2lkdGgiLCJyb3RhdGUiLCJNYXRoIiwiUEkiLCJmaWxsU3R5bGUiLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsImZvbnQiLCJtZWFzdXJlVGV4dCIsImZpbGxUZXh0IiwiY3JlYXRlQ29udmFzQW5kU2F2ZVBob3RvIiwiY2FudmFzT2JqIiwiYmd1cmwiLCJxcmNvZGVVUkwiLCJxcmNvZGVXZEFuZEhnIiwieFdpZHRoIiwieUhlaWdodCIsInRleHRiZ1VSTCIsInhUZXh0V2lkdGgiLCJ5VGV4dEhlaWdodCIsImltZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwiaGVpZ2h0IiwiZHJhd0ltYWdlIiwidGV4dFVyaSIsInRleHRJbWciLCJxcmNvZGVXaWR0aEFuZEhlaWdodCIsImlubmVySFRNTCIsInFyY29kZSIsIlFSQ29kZSIsImNvcnJlY3RMZXZlbCIsIkNvcnJlY3RMZXZlbCIsIkwiLCJxcmNvZGVJbWciLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInFyY29kZUR4IiwicXJjb2RlRHkiLCJnZXRNYXRlcmllbEluZm9MaXN0IiwiZ2V0UmV3YXJkTGlzdCIsIkNPTlNUX0RBVEEiLCJpbWdlU2l6ZSIsImNhY2hlRmlyc3QiLCJ0aW1lIiwic3RvcmFnZSIsInZhbGlkYXRlVGltZSIsImNhY2hlRmlyc3RTdG9yYWdlIiwibmVlZFN3Iiwic3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlIiwicmVmcmVzaERvbUZ1bmMiLCJyZXEiLCJkYXRhRnJvbUNhY2hlIiwiZ2V0RnJvbVN0b3JhZ2UiLCJyZW1vdmVTdG9yYWdlIiwiaXNTYW1lQXRBbGwiLCJJbW11dGFibGUiLCJpcyIsImZyb21KUyIsImFzeW5jIiwiZW5kT2ZTeW5jRnVuYyIsInJlbW92ZUNhY2hlIiwiSWRJZGVudGlmeUNvbnRhaW5lcnMiLCJtZXJjaGFudERldGFpbCIsIlN0cm9lQXJlYSIsInNob3dFcnJvclBpYyIsInN0b3JlVHAiLCJKU09OIiwicGFyc2UiLCJtYXBzdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRoVG9Qcm9wcyIsInVwZGF0ZUltZyIsInN1Ym1pdEhhbmRsZUNsaWNrIiwiTW9kYWwiLCJhbGVydCIsIm9uUHJlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBV2dCQSxXLEdBQUFBLFc7UUF5QkFDLFEsR0FBQUEsUTtRQWlCQUMsTyxHQUFBQSxPO1FBdUJBQyxPLEdBQUFBLE87UUFvQkFDLFEsR0FBQUEsUTtRQTBCQUMsVyxHQUFBQSxXO1FBZ0RBQyxXLEdBQUFBLFc7UUFnQ0FDLFEsR0FB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QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDTyxJQUFNUSxvQkFBTSxTQUFOQSxHQUFNLENBQUMxRCxHQUFELEVBQU10SixJQUFOLEVBQTJCO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQix3QkFBd0I7QUFDeEIsZ0JBQWdCO0FBQ2hCLG9CQUFvQjtBQUNwQix3QkFBd0I7QUFDeEIsZ0JBQWdCO0FBQ2hCLG9CQUFvQjtBQUNwQjtBQUNBLHVCQUF1QixtQkFBTyxDQUFDLHNCQUFpQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQTBELG9CQUFvQjtBQUM5RSxtQkFBTyxDQUFDLHNCQUFzQjtBQUM5QixtQkFBTyxDQUFDLHNCQUFnQjtBQUN4QixVQUFVLG1CQUFPLENBQUMsc0JBQVM7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGdEQUFnRCxtQkFBTyxDQUFDLHNCQUFnQjtBQUN4RTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiY2h1bmsvSWRJZGVudGlmeS4wMjMyOTE1YmIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjb21vbVBhcmFtLCBnZXQsIHBvc3QsIFV0aWx9IGZyb20gXCIuL3JlcXVlc3RcIjtcclxuaW1wb3J0IENPTkZJRyBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHt9IGZyb20gXCIuL2NhY2hlU3RvcmFnZVwiO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSBcIi4uLy4uL3N0b3JlL3N0b3JlXCI7XHJcbmltcG9ydCB7VVBEQVRFX1NUT1JFX1NUQVRFfSBmcm9tIFwiLi4vLi4vc3RvcmUvYWN0aW9uXCI7XHJcbmltcG9ydCB7Y2FjaGVGaXJzdCxjYWNoZUZpcnN0U3RvcmFnZSxzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UscmVtb3ZlQ2FjaGV9IGZyb20gXCIuL2NhY2hlU3RvcmFnZVwiO1xyXG5cclxuLyoqXHJcbiAqIOeUs+ivt+e6ouWMheeggeeahOivt+axglxyXG4gKiBAcGFyYW0gcGhvbmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWNtZFJlY29yZChwaG9uZSkge1xyXG4gICAgaWYgKHBob25lID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHBob25lID0gXCJcIlxyXG4gICAgfVxyXG4gICAgbGV0IHJlY21kTW9iaWxlID0gVXRpbC5iYXNlNjRFbmNvZGUocGhvbmUpXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5yZWNtZFJlY29yZCwge3JlY21kTW9iaWxlfSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk55So5oi35piv5ZCm55Sz6K+357qi5YyF56CB5o6l5Y+j55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgIHJvbGxLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleVxyXG4gICAgICAgICAgICB9LCgpPT57fSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGw6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOivt+axgue6ouWMheWQl+i/nuaOpVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNoYXJsaW5rKCkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1Quc2hhcmVMaW5rLCB7fSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIGxldCByZWRVcmxTdHI9IFwiaHR0cHM6Ly93YWxsZXQuOTU1MTYuY29tL3Mvd2wvd2ViVjMvYWN0aXZpdHkvdk1hcmtldGluZzIvaHRtbC9zbnNJbmRleC5odG1sP3I9XCIgKyByZXNwb25zZS5kYXRhLmlkZW50aWZpZXI7XHJcbiAgICAgICAgICAgIGxldCBuZXh0U3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICByZWRVcmxTdHJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUobmV4dFN0YXRlKSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWRVcmxTdHIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5piv5ZCm5Zyo55m95ZCN5Y2V55qE6K+35rGCXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNCbGFjayh1cGRhdGUpIHtcclxuICAgIGxldCB1cGRhdGVGdW5jID0gZnVuY3Rpb24ocmVzcCl7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYmxhY2tTdDpyZXNwLmRhdGEuYmxhY2tTdFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpc0JsYWNrOiB1cGRhdGXlh73mlbDmiafooYzlrozmr5UnKTtcclxuICAgICAgICBpZiggdHlwZW9mIHVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJyApe1xyXG4gICAgICAgICAgICB1cGRhdGUocmVzcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/or7vlj5bnvJPlrZjvvIzlkIzml7blvILmraXlj5HpgIHor7fmsYJcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmlzQmxhY2sse30sc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlKHVwZGF0ZUZ1bmMpKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBibGFja1N0OnJlc3BvbnNlLmRhdGEuYmxhY2tTdFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOaYr+WQpuWcqOm7keWQjeWNleeahOivt+axglxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FwcGx5KCkge1xyXG4gICAgbGV0IGNhY2hlUGFyYW0gPSBjYWNoZUZpcnN0U3RvcmFnZSgzMCo2MCoxMDAwLENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleSk7Ly/nvJPlrZgzMOWIhumSn1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5pc0FwcGx5LCB7fSxjYWNoZVBhcmFtKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmFwcGx5U3QgIT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWmguaenOW3sue7j+eUs+ivt+i/h+e6ouWMheeggeWImee8k+WtmDMw5YiG6ZKf77yM5ZCm5YiZ5LiN57yT5a2YXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGFwcGx5U3Q6cmVzcG9uc2UuZGF0YS5hcHBseVN0XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog55Sz6K+35pS25qy+56CBXHJcbiAqIEBwYXJhbSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1jYyhwYXJhbSA9IHtcclxuICAgIHJlZmVyZWVUZWw6IFwiXCIsICAgICAgICAgLy/mjqjojZDkurrmiYvmnLrlj7dcclxuICAgIHZpcnR1YWxDYXJkTm86IFwiXCIsICAgICAgLy/omZrmi5/ljaHlj7dcclxuICAgIGFjY05tOiBcIlwiLCAgICAgICAgICAgICAgLy/lupfpk7rlkI3np7BcclxuICAgIGNpdHlDZDogXCJcIiAgICAgICAgICAgICAgIC8v5Z+O5biC5Luj56CBXHJcbn0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmFwcGx5TWNjLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk55So5oi35piv5ZCm55Sz6K+357qi5YyF56CB5o6l5Y+j55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgIHJvbGxLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRLZXk6IENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleVxyXG4gICAgICAgICAgICB9LCgpPT57fSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGw6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueUqOaIt+eahOmTtuihjOWNoeWIl+ihqFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENhcmRsaXN0KCkge1xyXG4gICAgLy/ojrflj5bnlKjmiLfpk7booYzljaHliJfooajvvIznvJPlrZgx5YiG6ZKfXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldE1jY0NhcmRMaXN0LCBjb21vbVBhcmFtLGNhY2hlRmlyc3RTdG9yYWdlKDYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIC8v5aaC5p6c5ZCO5Y+w6L+U5Zue6ZO26KGM5Y2h5YiX6KGo5LiU5LiN5Li656m6XHJcbiAgICAgICAgaWYgKCEhcmVzcG9uc2UuZGF0YS5jYXJkTGlzdCAmJiByZXNwb25zZS5kYXRhLmNhcmRMaXN0Lmxlbmd0aCAhPSAwKSB7XHJcblxyXG4gICAgICAgICAgICAvL+WIneWni+WMlum7mOiupOWNoVxyXG4gICAgICAgICAgICBsZXQgZGVmYWx1dENhcmQgPSB7XHJcbiAgICAgICAgICAgICAgICBiYW5rOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h5omA5Zyo55qE6ZO26KGMXHJcbiAgICAgICAgICAgICAgICBjYXJkVHlwZTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHnsbvlnotcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uQml0bWFwOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeWKn+iDveS9jVxyXG4gICAgICAgICAgICAgICAgaWNvblJlbFVybDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h55qEbG9nb+WcsOWdgFxyXG4gICAgICAgICAgICAgICAgaXNTdXBwb3J0OiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKbmlK/mjIFcclxuICAgICAgICAgICAgICAgIHBhbjogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5bim5pyJ5o6p56CB55qE5Y2h5Y+3XHJcbiAgICAgICAgICAgICAgICByYW5rOiAwLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKbpgInkuK1cclxuICAgICAgICAgICAgICAgIHZpcnR1YWxDYXJkTm86IFwiXCIgICAvL+iZmuaLn+WNoeWPt1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFpdGVtLnNlbGVjdGVkICYmIGl0ZW0uaXNTdXBwb3J0ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhbHV0Q2FyZCA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8v5aaC5p6c5rKh5pyJ6buY6K6k6YCJ5Lit55qE5Y2h5Y+W5LiA5Liq5LiN6KKr572u5Li654Gw55qE5Y2h5Li66buY6K6k5Y2hXHJcbiAgICAgICAgICAgIGlmIChkZWZhbHV0Q2FyZC5iYW5rLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHJlc3BvbnNlLmRhdGEuY2FyZExpc3QubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5jYXJkTGlzdFtrXS5pc1N1cHBvcnQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhbHV0Q2FyZCA9IHJlc3BvbnNlLmRhdGEuY2FyZExpc3Rba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc3RvcmVTdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHN0b3JlUmVjZWl2ZUNhcmRPYmo6IGRlZmFsdXRDYXJkLFxyXG4gICAgICAgICAgICAgICAgY2FyZExpc3Q6IHJlc3BvbnNlLmRhdGEuY2FyZExpc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoc3RvcmVTdGF0ZSkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5Zyw5Z2A5YiX6KGoXHJcbiAqIEBwYXJhbSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBZGRyTGlzdChcclxuICAgIHVwZGF0ZSwgLy/nvJPlrZjnmoTmm7TmlrDlh73mlbBcclxuICAgIHBhcmFtID0ge1xyXG4gICAgICAgIHN0YXRlOiBcIlwiICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG4pIHtcclxuICAgIC8vIOivu+WPlue8k+WtmO+8jOWQjOaXtuW8guatpeWPkemAgeivt+axglxyXG4gICAgbGV0IHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbihyZXNwKXtcclxuICAgICAgICAvLyDlnKh1cGRhdGXlh73mlbDkuK3vvIzmm7TmlrByZWR1eOS4reeahGFkZHJlc3NMaXN0XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHthZGRyZXNzTGlzdDpyZXNwLmRhdGEucmVzdWx0fHxbXX0pKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0QWRkckxpc3Q6IHVwZGF0ZeWHveaVsOaJp+ihjOWujOavlScpO1xyXG4gICAgICAgIGlmKCB0eXBlb2YgdXBkYXRlID09PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICAgICAgdXBkYXRlKHJlc3ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBjYWNoZVBhcmFtID0gc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlKHVwZGF0ZUZ1bmMsQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSk7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRBZGRyTGlzdCwgT2JqZWN0LmFzc2lnbih7fSwgY29tb21QYXJhbSwgcGFyYW0pLGNhY2hlUGFyYW0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBhZGRyZXNzTGlzdCA9IHJlc3BvbnNlLmRhdGEucmVzdWx0IHx8IFtdO1xyXG5cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBhZGRyZXNzTGlzdFxyXG4gICAgICAgIH0pKVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOeUs+ivt+eJqeaWmeaOpeWPo1xyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNYXQocGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxMaXN0OiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v54mp5paZ5YiX6KGoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsaXZObTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pS26LSn5Lq6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkQWxsOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Yy65ZCN56ewXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsaXZQaG9uZTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pS26LSn55S16K+dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmluY2VJZDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v55yBSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5SWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/luIJJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFJZDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWMuklEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzc0luZm86IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6K+m57uG5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcnLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Z2A55qESURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5Tm06IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/miYDlnKjln47luIJDaXR5Q29kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZFVybDogXCJcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+e6ouWMheeggeWcsOWdgCAg5Y+v6YCJ5Y+C5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5hcHBseU1hdCwgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bllYbmiLfmlLbmrL7noIHlnLDlnYDlkozllYbmiLfnvJblj7dcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRRclVybFJlc3QoKSB7XHJcbiAgICAvL+e8k+WtmDLlsI/ml7ZcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0UXJVcmwsIGNhY2hlRmlyc3RTdG9yYWdlKDIqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIG1jaG50RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICBxclVybDogcmVzcG9uc2UuZGF0YS5xclVybCxcclxuICAgICAgICAgICAgICAgIHFyTnVtOiByZXNwb25zZS5kYXRhLnFyTnVtXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAq6I635Y+W5bqX6ZO65Yy65Z+f5YiX6KGo5ZKM5bqX6ZO657G75Z6L5YiX6KGoXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNY2hudEFuZEFyZWFJbmYoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5nkuKrmjqXlj6Ms5Y+q6LWwc3fvvIzkuI3otbBsb2FjYWxTdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIC8vIGxldCBjYWNoZVBhcmFtID0ge1xyXG4gICAgLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbiAgICAvLyAgICAgZm9yQ2hzcDpmYWxzZSxcclxuICAgIC8vICAgICBlbmNyeXB0OmZhbHNlLFxyXG4gICAgLy8gICAgIGNhY2hlOiB0cnVlXHJcbiAgICAvLyB9XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldE1jaG50QW5kQXJlYUluZiwgY29tb21QYXJhbSwgY2FjaGVGaXJzdCgyNCo2MCo2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBsZXQgYXJlYSA9IFtdLCBtZXJjaGFudFRwID0gW107XHJcblxyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog55yB57qnXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLmFyZWFBcnIuZm9yRWFjaCgocHJvdmluY2UpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb25lID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogcHJvdmluY2UucHJvSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBwcm92aW5jZS5wcm9ObSxcclxuICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvdmluY2UucHJvTm0gPT0gXCLljJfkuqzluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIuS4iua1t+W4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi5aSp5rSl5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLph43luobluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIua3seWcs+W4glwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBwcm92aW5jZS5wcm9JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBwcm92aW5jZS5wcm9ObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmluY2UuY2l0eS5mb3JFYWNoKChjaXR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aHJlZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogY2l0eS5jaXR5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IGNpdHkuY2l0eU5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aHJlZS52YWx1ZSAhPSB0d28udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR3by5jaGlsZHJlbi5wdXNoKHRocmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgb25lLmNoaWxkcmVuLnB1c2godHdvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIOW4gue6p1xyXG4gICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlLmNpdHkuZm9yRWFjaCgoY2l0eSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR3byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogY2l0eS5jaXR5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IGNpdHkuY2l0eU5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgICAgICog5Yy657qnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5LmFyZWEuZm9yRWFjaCgoYXJlYSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aHJlZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGFyZWEuYXJlYUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogYXJlYS5hcmVhTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR3by5jaGlsZHJlbi5wdXNoKHRocmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBhcmVhLnB1c2gob25lKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEubWVyY2hhbnRUcEFyci5mb3JFYWNoKChtZXJUeXBlMSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9uZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IG1lclR5cGUxLm1lcmNoYW50VHBDZCxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IG1lclR5cGUxLm1lcmNoYW50VHBObSxcclxuICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbWVyVHlwZTEubWVyY2hhbnRUcEFyci5mb3JFYWNoKChtZXJUeXBlMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogbWVyVHlwZTIubWVyY2hhbnRUcENkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IG1lclR5cGUyLm1lcmNoYW50VHBObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25lLmNoaWxkcmVuLnB1c2godHdvKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgbWVyY2hhbnRUcC5wdXNoKG9uZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXh0U3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG1jaG50QW5kQXJlYUluZjoge1xyXG4gICAgICAgICAgICAgICAgYXJlYUFycjogYXJlYSxcclxuICAgICAgICAgICAgICAgIG1lcmNoYW50VHBBcnI6IG1lcmNoYW50VHBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUobmV4dFN0YXRlKSlcclxuXHJcbiAgICB9KVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluW6l+mTuuivpuaDheS/oeaBr1xyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNY2hudERldGFpbCgpIHtcclxuICAgIGxldCBjYWNoZVBhcmFtID0gY2FjaGVGaXJzdFN0b3JhZ2UoNjAqMTAwMCxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTsvL+e8k+WtmDHliIbpkp9cclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldE1jaG50RGV0YWlsLCBjb21vbVBhcmFtLGNhY2hlUGFyYW0pLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICBpZiAocmVzcC5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1Mpe1xyXG4gICAgICAgICAgICBsZXQgbWNobnREZXRhaWwgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7bWNobnREZXRhaWx9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobWNobnREZXRhaWwpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDljYfnuqfllYbpk7rkuoznu7TnoIFcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZ3JhZGVNY2MocGFyYW09e1xyXG4gICAgc3RvcmVObTogXCJcIiwgICAgLy/lupfpk7rlkI3np7BcclxuICAgIFN0b3JlVHA6IFwiXCIsICAgIC8v5bqX6ZO657G75Z6LXHJcbiAgICBwcm92Q2Q6IFwiXCIsICAgICAvL+ecgUlEXHJcbiAgICBjaXR5Q2Q6IFwiXCIsICAgICAvL+W4gklEXHJcbiAgICBjb3V0eUNkOiBcIlwiLCAgICAvL+WMuklEXHJcbiAgICBhZGRyOiBcIlwiLCAgICAgICAvL+WcsOWdgFxyXG4gICAgY2VydGlmUGljMTogXCJcIiwgLy/ouqvku73or4HmraPpnaLnhadcclxuICAgIGNlcnRpZlBpYzI6IFwiXCIsIC8v6Lqr5Lu96K+B5Y+N6Z2i54WnXHJcbiAgICBjZXJ0aWZQaWMzOiBcIlwiLCAvL+aJi+aMgei6q+S7veivgeeFp+eJh1xyXG4gICAgbGljZW5zZVBpYzogXCJcIiwgLy/okKXkuJrmiafnhadcclxuICAgIHNob3BQaWMxOiBcIlwiLCAgIC8v5bqX6ZO654Wn54mHMVxyXG4gICAgc2hvcFBpYzI6IFwiXCIsICAgLy/lupfpk7rnhafniYcyXHJcbiAgICBhdXhQcm92TWF0MTogXCJcIiwvL+i+heWKqeeFp+eJhzFcclxuICAgIGF1eFByb3ZNYXQyOiBcIlwiLC8v6L6F5Yqp54Wn54mHMlxyXG4gICAgc2hvcExvZ29QaWM6IFwiXCIgLy/lupfpk7pMT0dPXHJcbn0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnVwZ3JhZGVNY2MsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgLy/liKDpmaTlupfpk7ror6bmg4XnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk55So5oi35piv5ZCm5Y2H57qn55qE5o6l5Y+j55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5VcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdC5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Quc2Vjb25kS2V5KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueUqOaIt+eahOWNj+iurue8luWPt+WSjOWNj+iuruWQjeensFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm90b2NvbEluZm8oKSB7XHJcbiAgICAvKipcclxuICAgICAqIOi/meS4quaOpeWPoyznvJPlrZgy5bCP5pe2XHJcbiAgICAgKi9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0UHJvdG9jb2xJbmZvLCBjb21vbVBhcmFtLGNhY2hlRmlyc3RTdG9yYWdlKDIqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlLmRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOWOhuWPsuaUtuasvlxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXN0b3J5SW5jb21lKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRIaXN0b3J5SW5jb21lLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5SW5jb21lT2JqOiByZXMuZGF0YVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDljoblj7LorqLljZVcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlzdG9yeVRyYW5zKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRIaXN0b3J5VHJhbnMsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5MaXN0RGF0YSA9IHN0b3JlLmdldFN0YXRlKCkuZ2V0SW4oWydoaXN0b3J5T3JkZXJMaXN0J10pLnRvSlMoKVxyXG4gICAgICAgICAgICBsZXQgbmV3TGlzdCA9IHJlcy5kYXRhLnRyYW5zSW5mbztcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3TGlzdClcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnlPcmRlckxpc3Q6IG9yaWdpbkxpc3REYXRhLmNvbmNhdChuZXdMaXN0KVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDku4rml6XmlLbmrL5cclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9kYXlJbmNvbWUoKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRUb2RheUluY29tZSxjb21vbVBhcmFtKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICB0b2RheUluY29tZU9iajogcmVzLmRhdGFcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOS7iuaXpeiuouWNlVxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2RheVRyYW5zKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRUb2RheVRyYW5zLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBsZXQgb3JpZ2luTGlzdERhdGEgPSBzdG9yZS5nZXRTdGF0ZSgpLmdldEluKFsndG9kYXlPcmRlckxpc3QnXSkudG9KUygpXHJcbiAgICAgICAgICAgIGxldCBuZXdMaXN0ID0gcmVzLmRhdGEudHJhbnNJbmZvO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgdG9kYXlPcmRlckxpc3Q6IG9yaWdpbkxpc3REYXRhLmNvbmNhdChuZXdMaXN0KVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDljZXnrJTmn6Xor6JcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bShwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bSxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKVxyXG59XHJcbi8qKlxyXG4gKiDojrflj5bnianmtYHkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpc3RpY3NTdChwYXJhbSl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldExvZ2lzdGljc1N0LCBPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIGxldCBuZXdPYmogPSByZXMuZGF0YS5kZWxpdmVyeU1zZztcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIG5ld09iai5tYXREZWxpdlN0YXR1cyDnmoTnirbmgIHlkoxyZWR1eOeahHN0b3Jl5L+d5oyB5LiA6Ie0XHJcbiAgICAgICAgICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbmV3T2JqLm1hdERlbGl2U3RhdHVzID0gcmVzLmRhdGEubWF0RGVsaXZTdGF0dXM7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICBkZWxpdmVyeU1zZzogbmV3T2JqXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIOWVhuaIt+acjeWKoemmlumhtSDngrnlh7vkv6HnlKjljaHmjInpkq7mn6Xor6LllYbmiLfmmK/lkKblvIDpgJrov4fkv6HnlKjljaHmlLbmrL5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVcGdyYWRlU3QoKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0VXBncmFkZVN0LCBjb21vbVBhcmFtKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueJqeaWmeWOhuWPsuiuouWNlVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2lzdGljc0xpc3QocGFyYW0pe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRMb2dpc3RpY3NMaXN0LE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmn6Xor6Lkv6HnlKjljaHmlLbmrL7ljYfnuqfnirbmgIFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBdWRpdEluZm8oKXtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEF1ZGl0SW5mbywgY29tb21QYXJhbSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluaUtuasvumZkOmineivpuaDhVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbWl0QXRJbmZvKCl7XHJcbiAgICAvL+e8k+WtmDLkuKrlsI/ml7ZcclxuICAgIHBvc3QoQ09ORklHLlJFU1QuZ2V0TGltaXRBdEluZm8sY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwKT0+e1xyXG4gICAgICAgIGlmKCByZXNwLnN0YXR1c0NvZGUgPSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTICl7XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7bGltaXRJbmZvOnJlc3AuZGF0YX0pKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmm7TmlrDlupfpk7ror6bmg4VcclxuICogQHBhcmFtIHsqfSBwYXJhbSDlupfpk7ror6bmg4Xkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtY2hudE9wZXIocGFyYW0gPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC51cGdyYWRlTWNjICwgT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5Yig6ZmkbWNobnREZXRhaWznvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTsgXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOWIoOmZpOWcsOWdgOS/oeaBr1xyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUFkZHJlc3MocGFyYW09e1xyXG4gICAgaWQ6JycgLy/lnLDlnYBpZFxyXG59KXtcclxuICAgIFxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZGVsZXRlQWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/liKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocGFyYW0pO1xyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDmm7TmlrDmlLbmrL7pk7booYzljaFcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNY2NDYXJkKHBhcmFtPXtcclxuICAgIHZpcnR1YWxDYXJkTm86JycgLy/omZrmi5/ljaHlj7dcclxufSkge1xyXG4gICAgXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC51cGRhdGVNY2NDYXJkLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+aNouWNoeWQju+8jOa4hemZpOW6l+mTuuivpuaDhee8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTsgXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOaWsOWinuWcsOWdgFxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivpue7hueahOWcsOWdgOS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0FkZHJlc3MocGFyYW09e30pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULm5ld0FkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyl7XHJcbiAgICAgICAgICAgIC8vIOWIoOmZpOaUtui0p+WcsOWdgOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog5L+u5pS55Zyw5Z2A5L+h5oGvXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+m57uG55qE5Zyw5Z2A5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZWRpdEFkZHJlc3MocGFyYW09e30pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmVkaXRBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1Mpe1xyXG4gICAgICAgICAgICAvL+WIoOmZpOaUtui0p+WcsOWdgOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOWQr+WBnOaUtuasvueggeacjeWKoVxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE1jY09uT2ZmKHBhcmFtPXtcclxuICAgIGlzVXNlTWNjOicnICAvL+aYr+WQpuS9v+eUqOaUtuasvueggeacjeWKoVxyXG4gfSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1Quc2V0TWNjT25PZmYsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5Yig6Zmk5bqX6ZO66K+m5oOF57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7IFxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOiOt+WPluWQiui1t+aUr+S7mOaOp+S7tueahFRO5Y+3XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNjVHJhbnNOdW0oKXtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldE1jY1RyYW5zTnVtKS50aGVuKChyZXNwKT0+e1xyXG4gICAgICAgIGlmKCByZXNwLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyApe1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHttY2NUcmFuc051bTpyZXNwLmRhdGEudHJhbnNOdW19KVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL3JlcXVlc3RBUEkuanMiLCJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBpZiAoc2FmZSAmJiB0YXJnZXRba2V5XSkgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanNcbi8vIG1vZHVsZSBpZCA9IDE0ZGMxZjdlYmQ4MGQxNWJmZDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDE2Nzk4NTFiZTI3YjI2OGVhMjRlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMWRmYWMyODUyM2FlMzdkYWM1YlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNTFiYzdhZmU4MTI3ZTA5MTQ5ZFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhjZmY4NmUxZDUxZWJmMjFmN2Zcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDNjMjRkMzhmZmNkMGMzOGUzNDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEJ1dHRvbiBmcm9tICdhbnRkLW1vYmlsZS9saWIvYnV0dG9uJztcclxuXHJcbmltcG9ydCBcIi4vSWRJZGVudGlmeS5zY3NzXCJcclxuaW1wb3J0IFBpY3R1cmUgZnJvbSBcIi4vUGljdHVyZVwiXHJcbmltcG9ydCBBZ3JlZUNvbXAgZnJvbSBcIi4vQWdyZWVDb21wXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWRJZGVudGlmeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKmtleSDmmK/plK7lgLxcclxuICAgICAqL1xyXG4gICAgaGFubGVQaG90b0NsaWNrID0gKGtleSwgaXNNdXN0KSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICAgICAgYXBwLmNob29zZUltYWdlKHttYXhXaWR0aDogMjkyLCBtYXhIZWlnaHQ6IDE3Nn0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0ge307XHJcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IGRhdGEuYmFzZTY0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGFuZ2VQaG90byhvYmopXHJcbiAgICAgICAgICAgIH0sIChlcnIpID0+IHtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dClcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBsZXQge2lzQWdyZWVVcENvZGVBZ3JlZW1lbnQsY2VydGlmUGljMSwgY2VydGlmUGljMiwgY2VydGlmUGljMywgbGljZW5zZVBpYyxzaG9wUGljMSwgc2hvcFBpYzIsIGF1eFByb3ZNYXQxLCBhdXhQcm92TWF0Miwgc2hvcExvZ29QaWMsY2hhbmdlQWdyZWVtZW50LGlzRmFpbGJhY2ssZmFpbFBpY3RydWVPYmosaGFuZGxlQ2xpY2t9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAvL+iuoeeul+WNj+iurueahOagt+W8j1xyXG4gICAgICAgIGxldCBhZ3JlZUNsYXNzID0gaXNBZ3JlZVVwQ29kZUFncmVlbWVudCA/IFwiYWdyZUljb25cIiA6IFwibm90QWdyZWVJY29uXCI7XHJcblxyXG4gICAgICAgIC8v6buY6K6k5omA5pyJ55qE6YOo5YiG6YO95LiN5pi+56S6XHJcbiAgICAgICAgbGV0IHNob3dDZXJ0VmVyaWZ5PWZhbHNlLHNob3dsaWNWZXJpZnk9ZmFsc2Usc2hvd3Nob3BwaWNWZXJpZnk9ZmFsc2Usc2hvd2F1eFZlcmlmeT1mYWxzZSxzaG93bWVyTG9nb1ZlcmlmeT1mYWxzZTtcclxuXHJcbiAgICAgICAgLy/liKTlrprmmK/kuI3mmK9kaWFhYmxl55qE5oyJ6ZKu77yM5aaC5p6c5p2l6Ieq5aSx6LSl6aG16Z2i77yM5YiZ5qC55o2uZmFpbFBpY3RydWVPYmog5p2l5Yik5a6a5ZCm5YiZ6ZyA6KaB5qCh6aqM5ZKM5pi+56S65LiO5ZCmXHJcbiAgICAgICAgLy8g5aaC5p6cZXJ0aWZQaWMxLCBjZXJ0aWZQaWMyLCBjZXJ0aWZQaWMzLCBsaWNlbnNlUGljIOS4jeaYr05VbGwg5bm25LiU5ZCM5oSP5LqG5Y2P6K6uIOWImeWPr+S7peeCueWHu+aMiemSrlxyXG4gICAgICAgIGxldCBkaXNhYmxlQnRuLHBpY0FycmF5PVtdO1xyXG4gICAgICAgIGlmKGlzRmFpbGJhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQga2V5cz1PYmplY3Qua2V5cyhmYWlsUGljdHJ1ZU9iailcclxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjZXJ0VmVyaWZ5RmFpbFJlYXNvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaWNBcnJheS5jb25jYXQoW2NlcnRpZlBpYzEsY2VydGlmUGljMixjZXJ0aWZQaWMzXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDZXJ0VmVyaWZ5PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsaWNWZXJpZnlGYWlsUmVhc29uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpY0FycmF5LnB1c2gobGljZW5zZVBpYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dsaWNWZXJpZnk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNob3BwaWNWZXJpZnlGYWlsUmVhc29uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpY0FycmF5LmNvbmNhdChbc2hvcFBpYzEsc2hvcFBpYzJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd3Nob3BwaWNWZXJpZnk9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXV4VmVyaWZ5RmFpbFJlYXNvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaWNBcnJheS5jb25jYXQoW2F1eFByb3ZNYXQxLGF1eFByb3ZNYXQyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dhdXhWZXJpZnk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm1lckxvZ29WZXJpZnlGYWlsUmVhc29uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpY0FycmF5LnB1c2goc2hvcExvZ29QaWMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93bWVyTG9nb1ZlcmlmeT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYoIXBpY0FycmF5LmluY2x1ZGVzKG51bGwpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlQnRuPWZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlQnRuPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoISFjZXJ0aWZQaWMxJiYgISFjZXJ0aWZQaWMyJiYhIWNlcnRpZlBpYzMmJiEhbGljZW5zZVBpYyYmaXNBZ3JlZVVwQ29kZUFncmVlbWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZUJ0bj1mYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZUJ0bj10cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzaG93Q2VydFZlcmlmeT10cnVlLHNob3dsaWNWZXJpZnk9dHJ1ZSxzaG93c2hvcHBpY1ZlcmlmeT10cnVlLHNob3dhdXhWZXJpZnk9dHJ1ZSxzaG93bWVyTG9nb1ZlcmlmeT10cnVlO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiaWlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250ZW50V2FycFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudCBwYjMyXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0NlcnRWZXJpZnkmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJwdDMyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOS4iuS8oOivgeS7tueFp+eJhyjlv4XloaspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpY1dhcnAtZGl2IHBiMzJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBpY3R1cmUgdmFsdWU9e2NlcnRpZlBpYzF9IGxhYmVsPVwi5Zu95b695omA5Zyo6Z2iXCIgaXNNdXN0PXt0cnVlfSBuYW1lPVwiY2VydGlmUGljMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFubGVQaG90b0NsaWNrfT48L1BpY3R1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQaWN0dXJlIHZhbHVlPXtjZXJ0aWZQaWMyfSBsYWJlbD1cIueFp+eJh+aJgOWcqOmdolwiIGlzTXVzdD17dHJ1ZX0gbmFtZT1cImNlcnRpZlBpYzJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmxlUGhvdG9DbGlja30+PC9QaWN0dXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGljdHVyZSB2YWx1ZT17Y2VydGlmUGljM30gbGFiZWw9XCLmiYvmjIHouqvku73lm73lvr3miYDlnKjpnaJcIiBpc011c3Q9e3RydWV9IG5hbWU9XCJjZXJ0aWZQaWMzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHQzMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFubGVQaG90b0NsaWNrfT48L1BpY3R1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpZEluZm8taW50cm9kdWNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOivt+S4iuS8oOW9qeiJsui6q+S7veivgeeFp+eJh++8jOaLjeaRhOmcgOa4heaZsDxici8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOivt+WcqOWFiee6v+WFhei2s+eahOWcsOaWueaLjeaRhDxici8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOivt+S/neivgeS7peS4iueUqOaIt+S/oeaBr+S4juS6kemXquS7mOeUqOaIt+ebuOesplxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c2hvd2xpY1ZlcmlmeSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJwdDMyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOS4iuS8oOiQpeS4muaJp+eFp+eFp+eJhyjlv4XloaspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpY1dhcnAtZGl2IHBiMzJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBpY3R1cmUgdmFsdWU9e2xpY2Vuc2VQaWN9IGxhYmVsPVwi6JCl5Lia5omn54Wn5q2j6Z2i77yM6ZyA5ZCM6Lqr5Lu96K+B5aeT5ZCN5L+d5oyB5LiA6Ie0XCIgaXNNdXN0PXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwibGljZW5zZVBpY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFubGVQaG90b0NsaWNrfT48L1BpY3R1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Nob3dzaG9wcGljVmVyaWZ5ICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInB0MzJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg5LiK5Lyg5bqX6ZO654Wn54mHKOmAieWhqylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGljV2FycC1kaXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBpY3R1cmUgdmFsdWU9e3Nob3BQaWMxfSBsYWJlbD1cIua3u+WKoOW6l+mTuueFp+eJh1wiIG5hbWU9XCJzaG9wUGljMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFubGVQaG90b0NsaWNrfT48L1BpY3R1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQaWN0dXJlIHZhbHVlPXtzaG9wUGljMn0gbGFiZWw9XCLmt7vliqDlupfpk7rnhafniYdcIiBuYW1lPVwic2hvcFBpYzJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmxlUGhvdG9DbGlja30+PC9QaWN0dXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93YXV4VmVyaWZ5ICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInB0MzJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg5LiK5Lyg6L6F5Yqp6K+B5piO6LWE5paZ54Wn54mHKOmAieWhqylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGljV2FycC1kaXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBpY3R1cmUgdmFsdWU9e2F1eFByb3ZNYXQxfSBsYWJlbD1cIlwiIG5hbWU9XCJhdXhQcm92TWF0MVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFubGVQaG90b0NsaWNrfT48L1BpY3R1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQaWN0dXJlIHZhbHVlPXthdXhQcm92TWF0Mn0gbGFiZWw9XCJcIiBuYW1lPVwiYXV4UHJvdk1hdDJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmxlUGhvdG9DbGlja30+PC9QaWN0dXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RvcmVJbmZvLWludHJvZHVjZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDmnInliqnkuo7or4HmmI7lupfpk7rkv6Hmga/nnJ/lrp7nmoTmnZDmlpnvvIzlpoLokKXkuJrlnLrmiYDnp5/otYHljY/orq7jgIHkuqfmnYPor4HmmI7nrYlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93bWVyTG9nb1ZlcmlmeSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJwdDMyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOS4iuS8oOW6l+mTukxPR08o6YCJ5aGrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaWNXYXJwLWRpdlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGljdHVyZSB2YWx1ZT17c2hvcExvZ29QaWN9IGxhYmVsPVwiXCIgbmFtZT1cInNob3BMb2dvUGljXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5sZVBob3RvQ2xpY2t9PjwvUGljdHVyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0b3JlSW5mby1pbnRyb2R1Y2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg6K+35LiK5Lyg5bqX5qCH77yM5Y2z5Y+v5Luj6KGo5oKo5bqX6ZO655qE5qCH5b+X77yM5aaC6Zeo5aS05qCH5b+X44CB5ZWG5qCH44CCXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKjxkaXYgY2xhc3NOYW1lPVwiYWdyZWUtd2FycC1kaXYgbXQzNlwiIHN0eWxlPXt7cGFkZGluZ0xlZnQ6IDB9fT4qL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qPGxhYmVsIGh0bWxGb3I9XCJhZ3JlZVwiIG9uQ2xpY2s9e3RoaXMuaGFubGVBZ3JlbWVudENsaWNrfSBjbGFzc05hbWU9XCJhZ3JlZS1TZWxmXCI+Ki99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Lyo8aSBjbGFzc05hbWU9e2FncmVlQ2xhc3N9PjwvaT4qL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qPC9sYWJlbD4qL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qPHNwYW4+6ZiF6K+75bm25ZCM5oSPIDxMaW5rIHRvPXtcIi9wYXlBZ3JlZVwifT7jgIrkuIrmtbfmtabkuJzlj5HlsZXpk7booYzlsI/lvq7llYbmiLfmlLbljZXmnI3liqHljY/orq7jgIs8L0xpbms+PC9zcGFuPiovfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7Lyo8L2Rpdj4qL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPEFncmVlQ29tcCBhZ3JlZUNsYXNzPXthZ3JlZUNsYXNzfSBoYW5sZUFncmVtZW50Q2xpY2s9e2NoYW5nZUFncmVlbWVudC5iaW5kKHRoaXMsIWlzQWdyZWVVcENvZGVBZ3JlZW1lbnQpfT48L0FncmVlQ29tcD5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJtaXQtd2FycC1idXR0b25cIiBzdHlsZT17e3Bvc2l0aW9uOiBcInJlbGF0aXZlXCIsIHBhZGRpbmdMZWZ0OiBcIjBcIiwgcGFkZGluZ1JpZ2h0OiBcIjBcIn19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBkaXNhYmxlZD17ZGlzYWJsZUJ0bn0gb25DbGljaz17aGFuZGxlQ2xpY2t9PuaPkOS6pDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvSWRJZGVudGlmeS9JZElkZW50aWZ5LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQge2NyZWF0ZVdlYlZpZXd9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0XCI7XHJcbmltcG9ydCB7Z2V0UHJvdG9jb2xJbmZvfSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdEFQSVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFncmVlQ29tcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dClcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBwcm90b0NkOlwiMDAwMTAwMDJcIixcclxuICAgICAgICAgICAgcHJvdG9ObTpcIumTtuiBlOS6kemXquS7mOaUtuasvueggeaUtuWNleacjeWKoeWNj+iurlwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGdldFByb3RvY29sSW5mbygpLnRoZW4oKGRhdGEpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNsaWNrPSgpPT57XHJcbiAgICAgICAgbGV0IHtwcm90b0NkLHByb3RvTm19PXRoaXMuc3RhdGU7XHJcbiAgICAgICAgbGV0IHVybD1gJHtsb2NhdGlvbi5wcm90b2NvbH0vLyR7bG9jYXRpb24uaG9zdH0vcy93bC94dnNoQWdyZWUvJHtwcm90b0NkfS5odG1sYDtcclxuICAgICAgICBjcmVhdGVXZWJWaWV3KHVybCwgbnVsbCwgcHJvdG9ObSwgXCIwXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQge2FncmVlQ2xhc3MsaGFubGVBZ3JlbWVudENsaWNrfT10aGlzLnByb3BzO1xyXG4gICAgICAgIGxldCB7cHJvdG9DZCxwcm90b05tfT10aGlzLnN0YXRlO1xyXG4gICAgICAgIC8vIGhyZWY9e2Avcy93bC94dnNoQWdyZWUvJHtwcm90b0NkfS5odG1sYH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFncmVlLXdhcnAtZGl2IG10MzZcIiBzdHlsZT17e3BhZGRpbmdMZWZ0OiAwfX0+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImFncmVlXCIgb25DbGljaz17aGFubGVBZ3JlbWVudENsaWNrfSBjbGFzc05hbWU9XCJhZ3JlZS1TZWxmXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPXthZ3JlZUNsYXNzfT48L2k+XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+6ZiF6K+75bm25ZCM5oSPIDxhIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9Pntg44CKJHtwcm90b05tfeOAi2B9PC9hPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0lkSWRlbnRpZnkvQWdyZWVDb21wLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWN0dXJlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHByb3BUeXBlcz17XHJcbiAgICAgICAgLy8gcGljdHVyZTpQcm9wVHlwZXMuLFxyXG4gICAgICAgIGxhYmVsOlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgaXNNdXN0OlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIG5hbWU6UHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBvbkNsaWNrOlByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIGNsYXNzTmFtZTpQcm9wVHlwZXMuc3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XHJcbiAgICAgICAgaXNNdXN0OmZhbHNlLFxyXG4gICAgICAgIGNsYXNzTmFtZTpcIlwiLFxyXG4gICAgICAgIGxhYmVsOlwiXCJcclxuICAgIH1cclxuXHJcbiAgICBoYW5sZVBob3RvQ2xpY2s9KCk9PntcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy5uYW1lLHRoaXMucHJvcHMuaXNNdXN0KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHtpc011c3QsbGFiZWwsdmFsdWUsY2xhc3NOYW1lfT10aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImluZm9JdGVtIFwiK2NsYXNzTmFtZX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17aXNNdXN0P1wicGljQm9yZFwiOlwicGljQm9yZFwifVxyXG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmxlUGhvdG9DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PSB1bmRlZmluZWQgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlclwiPjxpIGNsYXNzTmFtZT1cInBob3RvLWljb25cIj48L2k+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImltYWdlQmdcIj48aW1nIHNyYz17XCJkYXRhOmltZy9qcGc7YmFzZTY0LFwiICsgdmFsdWV9IGFsdD1cIlwiLz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxzcGFuPntsYWJlbH08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9JZElkZW50aWZ5L1BpY3R1cmUuanMiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNTNiN2QzNDgxNzE0NGIxMmIwYWFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDVlNTliNzFiMzNhMzhjMzYxOGU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1ZTc0OTFmMWY3OTk3MTVlYWM3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDZhNDQyYWI1YmQ5YmQ5Mjk0NDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8qXHJcbiAgIEFQSSDmjqXlj6PphY3nva5cclxuICAgYXhpb3Mg5Y+C6ICD5paH5qGj77yaaHR0cHM6Ly93d3cua2FuY2xvdWQuY24veXVueWUvYXhpb3MvMjM0ODQ1XHJcblxyXG4qL1xyXG4vLyBpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnYW50ZC1tb2JpbGUvbGliL3RvYXN0JztcclxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnXCJcclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKlxyXG4qIOW4uOmHj+WumuS5ieWMulxyXG4qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBjb25zdCBVdGlsID0gd2luZG93LlVQLlcuVXRpbDtcclxuXHJcbmV4cG9ydCBjb25zdCBBcHAgPSBVUC5XLkFwcDtcclxuXHJcbmV4cG9ydCBjb25zdCBFbnYgPSBVUC5XLkVudjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGhvbmUgPSAvXigxM1swLTldfDE0WzU3OV18MTVbMC0zLDUtOV18MTZbNl18MTdbMDEzNTY3OF18MThbMC05XXwxOVs4OV0pXFxkezh9JC87XHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGF5TnVtID0gL15bMC05XXsyMH0kLztcclxuXHJcbmV4cG9ydCBjb25zdCBjb21vbVBhcmFtID0ge1xyXG4gICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgIHNvdXJjZTogXCIyXCJcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiDor7fmsYLmoLjlv4PljLog5LiL6Z2i6L+Z5Z2X5Yy65Z+f5Lit55qE5Luj56CB5pS55Yqo6K+35oWO6YeNXHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5sZXQgYmFzZVVybCA9IFwiXCIsIGJhc2VVcmwyID0gXCJcIiwgYmFzZVVybDMgPSBcIlwiO1xyXG5pZiAobG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignOTU1MTYuY29tJykgIT09IC0xKSB7IC8v55Sf5Lqn546v5aKDXHJcbiAgICBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vc2hhbmdodS45NTUxNi5jb20vd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDIgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9tYWxsLjk1NTE2LmNvbS9jcXAtaW50LW1hbGwtd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICBiYXNlVXJsMyA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL3lvdWh1aS45NTUxNi5jb20veW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2UgaWYgKGxvY2F0aW9uLmhvc3RuYW1lLmluZGV4T2YoJzE3Mi4xOC4xNzkuMTAnKSAhPT0gLTEpIHsgLy/mtYvor5Xnjq/looNcclxuICAgIC8vIGJhc2VVcmw9XCJodHRwOi8vMTcyLjIxLjEwMS4yNTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7IC8v5rWL6K+V5a6kYXBhY2hlXHJcbiAgICAvL2Jhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjk1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+W8gOWPkeeOr+Wig2FwYWNoZVxyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4xMzMuMjU6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2Uge1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuOTU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuMjU6MzgyMTAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMTMzLjI1OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjMzLjU2OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufVxyXG4vKipcclxuICog6YCa6L+H5ZCO57yA6I635Y+W5pyN5Yqh5Zmo55qE5YWo5Zyw5Z2AXHJcbiAqIEBwYXJhbSB1cmxcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZXJ2VXJsID0gKHVybCkgPT4ge1xyXG4gICAgbGV0IHNlcnZlclVybCA9IFwiXCJcclxuICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QudXNlckluZm8pIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgLy8gZWxzZSBpZiAodXJsLnNwbGl0KFwiL1wiKVswXSA9PSBcImFkZHJlc3NcIikge1xyXG4gICAgLy8gICAgIHNlcnZlclVybCA9IGJhc2VVcmwyXHJcbiAgICAvLyB9XHJcbiAgICBlbHNlIGlmICh1cmwuc3BsaXQoXCIvXCIpWzBdID09IFwic2NhblwiIHx8IHVybCA9PSBDT05GSUcuUkVTVC5nZXRDaXR5KSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gYmFzZVVybDNcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHNlcnZlclVybCA9IGJhc2VVcmxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VydmVyVXJsO1xyXG59XHJcblxyXG4vKipcclxuICog5qC85byP5YyW57uT5p6cIOWwhue7k+aenOagvOW8j+WMluS4ulxyXG4gKiB7XHJcbiAqICAgICBzdGF0dXNDb2RlICAg5ZCO5Y+w5ZON5bqU56CBXHJcbiAqICAgICBkYXRhICAgICAgICAg5ZCO5Y+w6L+U5Zue55qE5pWw5o2uXHJcbiAqICAgICBtc2cgICAgICAgICAg5ZCO5Y+w55qE5o+Q56S65L+h5oGvXHJcbiAqIH1cclxuICogQHBhcmFtIGRhdGFcclxuICogQHJldHVybnMge3tzdGF0dXNDb2RlOiAoc3RyaW5nfCopLCBkYXRhOiAqLCBtc2c6ICp9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlRm9ybWF0dGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCByZXMgPSB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5yZXNwLFxyXG4gICAgICAgIGRhdGE6IGRhdGEucGFyYW1zLFxyXG4gICAgICAgIG1zZzogZGF0YS5tc2dcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vLyDliKDpmaTlupXpg6ggJy8nXHJcbmZ1bmN0aW9uIGRlbGV0ZVNsYXNoKGhvc3QpIHtcclxuICAgIHJldHVybiBob3N0LnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbn1cclxuXHJcbi8vIOa3u+WKoOWktOmDqCAnLydcclxuZnVuY3Rpb24gYWRkU2xhc2gocGF0aCkge1xyXG4gICAgcmV0dXJuIC9eXFwvLy50ZXN0KHBhdGgpID8gcGF0aCA6IGAvJHtwYXRofWA7XHJcbn1cclxuXHJcbi8vIOino+aekOWPguaVsFxyXG5mdW5jdGlvbiBzZXBhcmF0ZVBhcmFtcyh1cmwpIHtcclxuICAgIGNvbnN0IFtwYXRoID0gJycsIHBhcmFtc0xpbmUgPSAnJ10gPSB1cmwuc3BsaXQoJz8nKTtcclxuXHJcbiAgICBsZXQgcGFyYW1zID0ge307XHJcblxyXG4gICAgcGFyYW1zTGluZS5zcGxpdCgnJicpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gaXRlbS5zcGxpdCgnPScpO1xyXG5cclxuICAgICAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtwYXRoLCBwYXJhbXN9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZyl7XHJcbiAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge319ID0gY29uZmlnO1xyXG4gICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4gICAgbGV0IHNlcnZlclVybCA9ICdodHRwOi8vMTI3LjAuMC4xOjMwMDAvJztcclxuICAgIGxldCBmaW5hbFVybCA9IHNlcnZlclVybCArIHVybDtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHVybDpmaW5hbFVybCxcclxuICAgICAgICAgICAgdHlwZTptZXRob2QsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAnMjAwJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZUZvcm1hdHRlcihyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcign6K+35rGC5aSx6LSlJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYoIG1ldGhvZCA9PT0gJ1BPU1QnICl7XHJcbiAgICAgICAgICAgICBvcHRpb25zLmRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgIG9wdGlvbnMuZGF0YVR5cGUgPSAnanNvbidcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgob3B0aW9ucyk7XHJcbiAgICB9KVxyXG4gICAgXHJcbn1cclxuXHJcbi8vIOS4u+imgeivt+axguaWueazlVxyXG4vLyBleHBvcnQgIGZ1bmN0aW9uIHJlcXVlc3RPcmlnaW4oY29uZmlnKSB7XHJcblxyXG4vLyAgICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbi8vICAgICBjb25zdCB1aSA9IFVQLlcuVUk7XHJcbi8vICAgICBjb25zdCBlbnYgPSBVUC5XLkVudjtcclxuXHJcbi8vICAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge30sIGhlYWRlcnMsIGZvckNoc3AsIGVuY3J5cHQsIGJ5QWpheCwgY2FjaGUsIHVwZGF0ZSwgc3RvcmFnZX0gPSBjb25maWc7XHJcblxyXG4vLyAgICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4vLyAgICAgbGV0IHNlcnZlclVybCA9IGdldFNlcnZVcmwodXJsKTtcclxuXHJcbi8vICAgICAvLyBsZXQgc2VydmVyVXJsID0gYmFzZVVybCA7XHJcbi8vICAgICAvLyBpZiAodHJ1ZSkge1xyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4fmj5Lku7blj5HpgIHor7fmsYJcclxuLy8gICAgICAqL1xyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKiBAcGFyYW0gcGFyYW1zIOivt+axguWPguaVsFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB2ZXJzaW9u77ya54mI5pys77yM6buY6K6k5pivMS4wXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHNvdXJjZe+8muadpea6kO+8jOm7mOiupOagueaNrkFuZHJvaWTjgIFpT1Poh6rliqjmt7vliqBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgZW5jcnlwdO+8muaYr+WQpuWKoOWvhu+8jOm7mOiupOWKoOWvhlxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBtZXRob2TvvJror7fmsYLmlrnms5XvvIxQT1NU5oiWR0VUXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIGNtZO+8muivt+axguWRveS7pO+8iOS5n+WPr+iHquihjOWwhmNtZOe7hOijheiHs3VyaVvkvJjmg6DlkI7lj7Bd5oiWcGF0aFvpkrHljIXlkI7lj7Bd77yJXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHVyaS9wYXRo77ya6K+35rGC5Zyw5Z2A77yM5bu66K6u5LuF5aGr5YWFY21k77yM5LiN5bu66K6u6Ieq6KGM57uE6KOFdXJpL3BhdGhcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgcGFyYW1z77ya5Y+R6YCB57uZ5ZCO5Y+w55qE5Y+C5pWwXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHZpZO+8muWmguaenOmAmui/h0FqYXjmlrnlvI/lkJF3YWxsZXTlkI7lj7Dlj5HpgIHor7fmsYLpnIDopoHmkLrluKZ2aWRcclxuLy8gICAgICAqIEBwYXJhbSBmb3JDaHNwIOaYr+WQpuWQkeS8mOaDoOWQjuWPsOWPkemAgeivt+axgu+8iOm7mOiupOWQkeaJi+acuuWQjuWPsOWPkemAgeivt+axgu+8iVxyXG4vLyAgICAgICogQHBhcmFtIGJ5QWpheCDmmK/lkKbkvb/nlKhBamF45Y+R6YCB6K+35rGC77yI6buY6K6k5L2/55So5o6n5Lu277yJXHJcbi8vICAgICAgKiBAcGFyYW0gc3VjY2VzcyDmiJDlip/lm57osINcclxuLy8gICAgICAqIEBwYXJhbSBlcnJvciDplJnor6/lm57osIPvvIjkuJrliqHplJnor6/vvIlcclxuLy8gICAgICAqIEBwYXJhbSBmYWlsIOWksei0peWbnuiwg++8iOivt+axguWksei0pe+8iVxyXG4vLyAgICAgICovXHJcbi8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4vLyAgICAgICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuXHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgc3VjY2Vzc0NhbGxiYWNrID0gKGRhdGEsZnVjKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuaIkOWKn+e7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuLy8gICAgICAgICAgICAgICAgIGxldCByZXEgPSByZXNwb25zZUZvcm1hdHRlcihkYXRhKTtcclxuLy8gICAgICAgICAgICAgICAgIGlmKCAhIWZ1YyApe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlcS5mdWMgPSBmdWM7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcSlcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGVycm9yQ2FsbGJhY2sgPSAoZXJyKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuWksei0pee7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QuYXBwbHlNY2MgfHwgdXJsID09IENPTkZJRy5SRVNULmFwcGx5TWF0IHx8IHVybCA9PSBDT05GSUcuUkVTVC50b2RheU1vbmV5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJlc3BvbnNlRm9ybWF0dGVyKGVycik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXEpXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBUb2FzdC5pbmZvKGVyci5tc2cgfHwgJ+afpeivouS4muWKoeimgee0oOWHuumUme+8jOivt+eojeWQjuWGjeivle+8gScpO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgbmV0d29ya0NhbGxiYWNrID0gKHhocikgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgVG9hc3QuaW5mbyh4aHIubXNnKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuXHJcbi8vICAgICAgICAgICAgIGlmICh1cmwgIT0gQ09ORklHLlJFU1QuZ2V0VG9kYXlJbmNvbWUpIHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLnNob3dMb2FkaW5nKCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGlmICghY2FjaGUpIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJQYXJhbTpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHtcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgZW5jcnlwdDogZW5jcnlwdCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBmb3JDaHNwOiBmb3JDaHNwLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGJ5QWpheDogYnlBamF4XHJcbi8vICAgICAgICAgICAgICAgICAvLyB9KVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHpnZ7nvJPlrZjor7fmsYJcIilcclxuLy8gICAgICAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZShcclxuLy8gICAgICAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cmk6c2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjayk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNhY2hlVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdG9yZWFnZeetlueVpeaYrzpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2UpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInVwZGF0ZeWHveaVsDpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVwZGF0ZSlcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB57yT5a2Y6K+35rGCXCIpXHJcbi8vICAgICAgICAgICAgICAgICAvKipcclxuLy8gICAgICAgICAgICAgICAgICAqIOWQkeacjeWKoeWZqOWPkemAgeivt+axglxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHBhcmFtcyDor7fmsYLlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmVyc2lvbu+8mueJiOacrO+8jOm7mOiupOaYrzEuMFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzb3VyY2XvvJrmnaXmupDvvIzpu5jorqTmoLnmja5BbmRyb2lk44CBaU9T6Ieq5Yqo5re75YqgXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuY3J5cHTvvJrmmK/lkKbliqDlr4bvvIzpu5jorqTliqDlr4ZcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbWV0aG9k77ya6K+35rGC5pa55rOV77yMUE9TVOaIlkdFVFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBjbWTvvJror7fmsYLlkb3ku6TvvIjkuZ/lj6/oh6rooYzlsIZjbWTnu4Too4Xoh7N1cmlb5LyY5oOg5ZCO5Y+wXeaIlnBhdGhb6ZKx5YyF5ZCO5Y+wXe+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB1cmkvcGF0aO+8muivt+axguWcsOWdgO+8jOW7uuiuruS7heWhq+WFhWNtZO+8jOS4jeW7uuiuruiHquihjOe7hOijhXVyaS9wYXRoXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHBhcmFtc++8muWPkemAgee7meWQjuWPsOeahOWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2aWTvvJrlpoLmnpzpgJrov4dBamF45pa55byP5ZCRd2FsbGV05ZCO5Y+w5Y+R6YCB6K+35rGC6ZyA6KaB5pC65bimdmlkXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZm9yQ2hzcCDmmK/lkKblkJHkvJjmg6DlkI7lj7Dlj5HpgIHor7fmsYLvvIjpu5jorqTlkJHmiYvmnLrlkI7lj7Dlj5HpgIHor7fmsYLvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBieUFqYXgg5piv5ZCm5L2/55SoQWpheOWPkemAgeivt+axgu+8iOm7mOiupOS9v+eUqOaOp+S7tu+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3Mg5oiQ5Yqf5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZXJyb3Ig6ZSZ6K+v5Zue6LCD77yI5Lia5Yqh6ZSZ6K+v77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZmFpbCDlpLHotKXlm57osIPvvIjor7fmsYLlpLHotKXvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSB1cGRhdGUg5byC5q2l5Yi35paw5Zue6LCDIOWmguaenOiuvue9rmFzeW5j5Li6dHJ1ZeWQjuWPr+S7pea3u+WKoHVwZGF0ZeWbnuiwgyDlpoLmnpzkuI3loavlhpnpu5jorqTku6VzdWNjZXNz6L+b6KGM5aSE55CGXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gc3RvcmFnZSDnvJPlrZjlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbmVlZFN3ICAgICAgICAgICAgLy/pu5jorqRmYWxzZeWkp+mDqOWIhueUqOeahOaYr+aPkuS7tumcgOimgeeahOaJi+WKqOWOu+WKoFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzdG9yYWdlVHlwZSAgICAgIC8v6buY6K6k5L2/55SobG9jYWxzdG9yYWdlXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGFzeW5jICAgICAgICAgICAgLy/pu5jorqTojrflj5bnvJPlrZjlkI7kuI3lj5Hor7fmsYLvvIzmlLnkuLp0cnVl5ZCO5Lya5byC5q2l5Y676K+35rGC5ZCO5Y+w5bm25Yi35paw5pWw5o2uXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuZE9mU3luY0Z1bmMgICAgLy90b2RvIOmHjeimge+8ge+8ge+8ge+8geWbnuiwg+S4reWmguaenOWtmOWcqOW8guatpe+8iOaPkuS7tuetie+8iemcgOimgeagh+aYjuW8guatpeeKtuaAgeS4unRydWVcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmFsaWRhdGVUaW1lICAgICAvL+acieaViOacn+m7mOiupOaXoOmZkOacieaViOacnyDljZXkvY3mr6vnp5JcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVdpdGhJZCAgICAgICAvL+m7mOiupHRydWXku6XnlKjmiLdpZOi/m+ihjOWtmOWCqOWQpuWImWZhbHNl5LulbG9jYWzlrZjlgqhcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVN1Y2MgICAgICAgICAvL+S/neWtmOaIkOWKn+WQjueahOWbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlRXJyICAgICAgICAgIC8v5L+d5a2Y5aSx6LSl5ZCO55qE5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHJvbGxLZXkgICAgICAgICAgLy/lvLrliLborr7nva7kuLvplK5cclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2Vjb25kS2V5ICAgICAgICAvL+W8uuWItuiuvue9ruasoeimgemUruWAvFxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g6YeN6KaB6K+05piOIOiwg+eUqOW8guatpeaooeW8j++8iGFzeW5j6K6+572u5Li6dHJ1Ze+8ieWQjuWPr+iDveWcqHN1Y2Nlc3Plm57osIPph4zlrZjlnKjlvILmraXmk43kvZzvvIzor6Xmg4XlhrXkuIvlm57lr7zoh7TnvJPlrZjnmoTlm57osIPlj6/og71cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOacquaJp+ihjOWujOaIkO+8jOivt+axgueahOWbnuiwg+WPiOW8gOWni+aJp+ihjOS6hueahOaDheWGte+8jOaJgOS7peaIkeS7rOe7n+S4gOWcqHN1Y2Nlc3Plm57osIPlkox1cGRhdGXlm57osIPnmoTlhaXlj4Llop7liqDkuobnrKzkuozkuKrlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOeUqOS6juWFvOWuueWbnuiwg+WGheWMheWQq+W8guatpeeahOeKtuWGte+8jOS9v+eUqOaWueazleS4uu+8mummluWFiOiuvue9rmVuZE9mU3luY0Z1bmPlj4LmlbDkuLp0cnVlLOWFtuasoXN1Y2Nlc3Plkox1cGRhdGXlm55cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOiwg+WGheS8muaciTLkuKrlhaXlj4LvvIxzdWNjZXNz77yIcmVzcO+8jGZ1Y++8ie+8jOivt+WcqOS7o+eggemXreWMheWkhOS9v+eUqGZ1Yy5lbmRPZkZ1bmMoKVxyXG4vLyAgICAgICAgICAgICAgICAgICovXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHBhcmFtID0ge31cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGJ5QWpheCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogXCJsaWZlL2xpZmVcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXJpOnNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2VXaXRoU3RvcmFnZShwYXJhbSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjaywgc3RvcmFnZSwgdXBkYXRlKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICB9KVxyXG4vLyAgICAgfSlcclxuXHJcblxyXG4vLyAgICAgLy8gfVxyXG4vLyAgICAgLy8gZWxzZSB7XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4dBamF4IOWPkemAgeivt+axglxyXG4vLyAgICAgICovXHJcbi8vICAgICAvLyByZXR1cm4gYXhpb3Moe1xyXG4vLyAgICAgLy8gICAgIHVybDogYmFzZVVybCArIHVybCxcclxuLy8gICAgIC8vICAgICBtZXRob2QsXHJcbi8vICAgICAvLyAgICAgaGVhZGVycyxcclxuLy8gICAgIC8vICAgICBkYXRhOiBtZXRob2QgPT09ICdHRVQnID8gdW5kZWZpbmVkIDogZGF0YSxcclxuLy8gICAgIC8vICAgICBwYXJhbXM6IE9iamVjdC5hc3NpZ24obWV0aG9kID09PSAnR0VUJyA/IGRhdGEgOiB7fSwgcGFyYW1zKVxyXG4vLyAgICAgLy8gfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gICAgIC8vXHJcbi8vICAgICAvLyAgICAgbGV0IHJlcSA9IHtcclxuLy8gICAgIC8vICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2UuZGF0YS5yZXNwLFxyXG4vLyAgICAgLy8gICAgICAgICBkYXRhOiByZXNwb25zZS5kYXRhLnBhcmFtc1xyXG4vLyAgICAgLy8gICAgIH1cclxuLy8gICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcSlcclxuLy8gICAgIC8vIH0pLmNhdGNoKGVyciA9PiB7XHJcbi8vICAgICAvLyAgICAgLy8g6K+35rGC5Ye66ZSZXHJcbi8vICAgICAvLyAgICAgVG9hc3QuaW5mbygncmVxdWVzdCBlcnJvciwgSFRUUCBDT0RFOiAnICsgZXJyLnJlc3BvbnNlLnN0YXR1cyk7XHJcbi8vICAgICAvLyAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XHJcbi8vICAgICAvLyB9KTtcclxuLy8gICAgIC8vIH1cclxuXHJcbi8vIH1cclxuXHJcbi8vIOS4gOS6m+W4uOeUqOeahOivt+axguaWueazlVxyXG5leHBvcnQgY29uc3QgZ2V0ID0gKHVybCwgZGF0YSwgcGFyYW0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IHBhcmFtQWxsID0gT2JqZWN0LmFzc2lnbih7Zm9yQ2hzcDogdHJ1ZSwgZW5jcnlwdDogdHJ1ZSwgY2FjaGU6IGZhbHNlLCBieUFqYXg6IGZhbHNlfSwgcGFyYW0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QoT2JqZWN0LmFzc2lnbih7dXJsLCBkYXRhfSwgcGFyYW1BbGwpKVxyXG59O1xyXG5leHBvcnQgY29uc3QgcG9zdCA9ICh1cmwsIGRhdGEsIHBhcmFtID0ge30pID0+IHtcclxuICAgIGxldCBwYXJhbUFsbCA9IE9iamVjdC5hc3NpZ24oe2ZvckNoc3A6IHRydWUsIGVuY3J5cHQ6IHRydWUsIGNhY2hlOiBmYWxzZSwgYnlBamF4OiBmYWxzZX0sIHBhcmFtKTtcclxuICAgIHJldHVybiByZXF1ZXN0KE9iamVjdC5hc3NpZ24oe21ldGhvZDogJ1BPU1QnLCB1cmwsIGRhdGF9LCBwYXJhbUFsbCkpXHJcbn07XHJcbmV4cG9ydCBjb25zdCBwdXQgPSAodXJsLCBkYXRhKSA9PiByZXF1ZXN0KHttZXRob2Q6ICdQVVQnLCB1cmwsIGRhdGF9KTtcclxuZXhwb3J0IGNvbnN0IGRlbCA9ICh1cmwsIGRhdGEpID0+IHJlcXVlc3Qoe21ldGhvZDogJ0RFTEVURScsIHVybCwgZGF0YX0pO1xyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIOWKn+iDveWHveaVsOWMulxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIOWwhlVSTOS4reeahHNlYXJjaCDlrZfnrKbkuLIg6L2s5o2i5oiQIOWvueixoVxyXG4gKiBAcGFyYW0gc2VhcmNoXHJcbiAqIEByZXR1cm5zIHt7fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZWFyY2hQYXJhbSA9IChzZWFyY2gpID0+IHtcclxuICAgIGlmICghIXNlYXJjaCkge1xyXG4gICAgICAgIGxldCBzdHIgPSBzZWFyY2guc2xpY2UoMSk7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gc3RyLnNwbGl0KFwiJlwiKTtcclxuICAgICAgICBsZXQgb2JqID0ge307XHJcbiAgICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW0gPSBpdGVtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgb2JqW3BhcmFtWzBdXSA9IHBhcmFtWzFdO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIGNvZG92YSDmj5Lku7bosIPnlKjljLpcclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5cclxuLy8g5ZCv5YGc5pS25qy+56CBXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRYaWFvV2VpUGF5KHBhcmFtLCBzdWMsIGVycikge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuc2V0WGlhb1dlaVBheShwYXJhbSwgc3VjLCBlcnIpO1xyXG59XHJcblxyXG4vL+Wwj+W+rmF1ZGlvXHJcbmV4cG9ydCBjb25zdCBzZXRYaWFvV2VpQXVkaW8gPSAocGFyYW0sIHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5zZXRYaWFvV2VpQXVkaW8ocGFyYW0sIHN1YywgZXJyKTtcclxufVxyXG5leHBvcnQgY29uc3QgZ2V0WGlhb1dlaUF1ZGlvID0gKHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5nZXRYaWFvV2VpQXVkaW8oc3VjLCBlcnIpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdG9hc3QgPSAobXMpID0+IHtcclxuICAgIFRvYXN0LmluZm8obXMsIDIpO1xyXG59XHJcbi8qKlxyXG4gKiDorr7nva7pobbpg6hiYXJcclxuICogQHBhcmFtIHRpdGxlIOmhtemdouWQjeensFxyXG4gKiBAcGFyYW0gcmlnaHRCYXIg5Y+z5L6n5oyJ6ZKu5ZCN56ewXHJcbiAqIEBwYXJhbSByaWdodENhbGxiYWNrIOWPs+S+p+aMiemSruWbnuiwg1xyXG4gKiBAcGFyYW0gcmlnaHRCYXJJbWcg5Y+z5L6n5oyJ6ZKu5Zu+54mHXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYmVmb3JlRW50ZXJSb3V0ZXIgPSAodGl0bGUgPSBcIlwiLCByaWdodEJhciA9IFwiXCIsIHJpZ2h0Q2FsbGJhY2sgPSBudWxsLCByaWdodEJhckltZyA9IG51bGwpID0+IHtcclxuICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHRpdGxlKVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueql+WPo+WPs+S+p+aMiemSrlxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZSDlm77moIfmoIfpophcclxuICAgICAgICAgKiBAcGFyYW0gaW1hZ2Ug5Zu+5qCH5paH5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIGhhbmRsZXIg54K55Ye75Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKCEhcmlnaHRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uKHJpZ2h0QmFyLCByaWdodEJhckltZywgcmlnaHRDYWxsYmFjaylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24oXCJcIiwgbnVsbCwgbnVsbClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDpgJrnn6XlrqLmiLfnq6/kv67mlLnnirbmgIFcclxuICovXHJcbmV4cG9ydCBjb25zdCBtY2NTdGF0ZUNoYW5nZWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAubWNjU3RhdGVDaGFuZ2VkKClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kUXJDb2RlID0gKHBhcmFtcywgc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5omr5o+P5p2h56CB5ZKM5LqM57u056CBXHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAgICAgICAqIEBwYXJhbSBzdWNjZXNzXHJcbiAgICAgICAgICogQHBhcmFtIGZhaWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuc2NhblFSQ29kZShwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VXZWJWaWV3ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY2xvc2VXZWJWaWV3KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2ZXJpZnlQYXlQd2QgPSAocGFyYW0sIHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnZlcmlmeVBheVB3ZChwYXJhbSwgc3VjY2VzcywgZmFpbClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVXZWJWaWV3ID0gKHVybCwgcGFyYW1zID0gbnVsbCwgdGl0bGUgPSAnJywgaXNGaW5pc2ggPSBcIjFcIikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY3JlYXRlV2ViVmlldyh1cmwsIHBhcmFtcywgdGl0bGUsIGlzRmluaXNoKVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRVc2VyRGV0YWlsSW5mbyA9IChzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuZ2V0VXNlckRldGFpbEluZm8oc3VjY2VzcywgZmFpbClcclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWwhmNhdmFzIOS/neWtmOWIsOacrOWcsOebuOWGjFxyXG4gKiBAcGFyYW0gY2FudmFzXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2F2ZVFjb2RlID0gKGNhbnZhcykgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgdWkgPSBVUC5XLlVJIHx8IHt9O1xyXG4gICAgdmFyIHBpY1VybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhcHAubG9nRXZlbnQoJ3NhdmVQaWN0dXJlX05ld1llYXJBY3QnKTtcclxuICAgICAgICBhcHAuc2F2ZVBpY1RvTG9jYWwoe1xyXG4gICAgICAgICAgICB1cmw6IHBpY1VybCAmJiBwaWNVcmwuc3Vic3RyKDIyKVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdWkuc2hvd1RvYXN0V2l0aFBpYygn5bey5L+d5a2Y5Yiw57O757uf55u45YaMJyk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd1RvYXN0KG1zZyB8fCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoYXJlID0gKHRpdGxlLCBkZXNjLCBpbWdVUkwsIHBhZ2VVUmwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIGVudiA9IFVQLlcuRW52IHx8IHt9O1xyXG5cclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pi+56S65YiG5Lqr6Z2i5p2/XHJcbiAgICAgICAgICog5aaC5p6c5omA5pyJ5rig6YGT5L2/55So55u45ZCM55qE5YiG5Lqr5YaF5a655YiZ5LuF5aGr5YaZcGFyYW1z5Y2z5Y+v77yMXHJcbiAgICAgICAgICog5aaC5p6c6ZyA6KaB5qC55o2u5LiN5ZCM5rig6YGT5a6a5Yi25YiG5Lqr5YaF5a6577yM5YiZ5Y+vcGFyYW1z55WZ56m677yM5Zyoc2hhcmVDYWxsYmFja+S4rei/lOWbnuaMh+Wumua4oOmBk+eahOWIhuS6q+WGheWuuVxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXMg5YiG5Lqr5Y+C5pWwXHJcbiAgICAgICAgICogICAgICAgICAgICAgIHtcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHRpdGxl77yaIOWIhuS6q+agh+mimFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgZGVzYzog5YiG5Lqr5pGY6KaBXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBwaWNVcmzvvJrliIbkuqvlm77moIdcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNoYXJlVXJs77ya6K+m5oOF5Zyw5Z2AXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiBAcGFyYW0gc2hhcmVDYWxsYmFjayDliIbkuqvml7blm57osINcclxuICAgICAgICAgKiAgICAgICAgICAgICAgY2hhbm5lbO+8mntcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDDvvJrnn63kv6FcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDHvvJrmlrDmtarlvq7ljZpcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDPvvJrlvq7kv6Hlpb3lj4tcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDTvvJrlvq7kv6HmnIvlj4vlnIhcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDXvvJpRUeWlveWPi1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNu+8mlFR56m66Ze0XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA377ya5aSN5Yi26ZO+5o6lXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiAgICAgICAgICAgICAgZGF0YTog6buY6K6k5YiG5Lqr5pWw5o2uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLnNob3dTaGFyZVBhbmVsKHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBkZXNjOiBkZXNjLFxyXG4gICAgICAgICAgICBwaWNVcmw6IGltZ1VSTCxcclxuICAgICAgICAgICAgc2hhcmVVcmw6IHBhZ2VVUmwgIC8vIHRvZG8g5pmu6YCa5YiG5LqrXHJcbiAgICAgICAgfSwgbnVsbClcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE5a6a5L2N77yM6aaW5YWI6YCa6L+HR1BTIOWumuS9je+8jOWmguaenOWumuS9jeWksei0pe+8jOmAmui/h+aOpeWPo2dldENpdHks5Yip55SoSVDlnLDlnYDov5vooYzlrprkvY3vvIzlpoLmnpzov5jmmK/lpLHotKXvvIzpgJrov4fmj5Lku7bojrflj5blrqLmiLfnq6/lt6bkuIrop5LnmoTln47luILkv6Hmga/vvIzkvp3nhLblpLHotKXpu5jorqTnqb9jaXR5Q2Q6MzEwMDAwIOS7o+ihqOS4iua1t+W4glxyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50TG9jYXRpb25JbmZvID0gKGNhbGxiYWNrMikgPT4ge1xyXG4gICAgY29uc3QgdWkgPSBVUC5XLlVJO1xyXG4gICAgdWkuc2hvd0xvYWRpbmcoKTtcclxuICAgIGxldCBjYWxsYmFjayA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4gICAgICAgIGNhbGxiYWNrMihkYXRhKVxyXG4gICAgfVxyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYXBwLmdldEN1cnJlbnRMb2NhdGlvbkluZm8oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNtZDogXCIvXCIgKyBDT05GSUcuUkVTVC5nZXRDaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhdGg6IFwiaHR0cDovLzE3Mi4yMS4zMy41NjozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCIrQ09ORklHLlJFU1QuZ2V0Q2l0eSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBcIjJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCB0cnVlLCBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoTmF0aXZlRGF0YShjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hOYXRpdmVEYXRhKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaE5hdGl2ZURhdGEgPSAoY2FsbGJhY2spID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5blrqLmiLfnq6/kv6Hmga9cclxuICAgICAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICAgICAqIEBwYXJhbSBmYWlsXHJcbiAgICAgICAgICogQHBhcmFtIHR5cGUgMO+8muWfjuW4guS/oeaBr2NpdHlDZO+8mzHvvJrnu4/nuqzluqbvvJs177yaVXNlcklkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLmZldGNoTmF0aXZlRGF0YSgwLCAoZGF0YSA9IHt9KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICBjaXR5Q2Q6IFwiMzEwMDAwXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgY29uc3Qgc2F2ZVBpY1RvTG9jYWwgPSAoY2FudmFzLCByZXNvbHZlKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciB1aSA9IFVQLlcuVUkgfHwge307XHJcbiAgICB2YXIgcGljVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zYXZlUGljVG9Mb2NhbCh7XHJcbiAgICAgICAgICAgIHVybDogcGljVXJsICYmIHBpY1VybC5zdWJzdHIoMjIpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+aIkOWKn1xyXG4gICAgICAgICAgICAhIXJlc29sdmUgJiYgcmVzb2x2ZShcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgfSwgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgISFyZXNvbHZlICYmIHJlc29sdmUoXCJmYWlsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlVGV4dENhbnZhc2UgPSAodGV4dCwgY29sb3IsIGxvbmcgPSA2ODQsIHNob3QgPSA2MCkgPT4ge1xyXG5cclxuICAgIGxldCByZW0ycHggPSAodmFsKSA9PiB7XHJcbiAgICAgICAgdmFyIGNXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgICAgIHJldHVybiB2YWwgKiBjV2lkdGggLyA3NTBcclxuICAgIH1cclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dENhbnZhcycpO1xyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIC8v6Kit572u55Wr5L2I55qE5a+s6auYXHJcbiAgICAvLyB2YXIgYmdXaWR0aCA9IHJlbTJweChsb25nKTtcclxuICAgIC8vIHZhciBiZ0hlaWdodCA9IHJlbTJweChzaG90KTtcclxuXHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHNob3QpO1xyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbG9uZyk7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgY3R4LnJvdGF0ZSgtOTAgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgIHZhciB0ZXh0ID0gdGV4dDtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XHJcbiAgICBsZXQgZm9udFNpemUgPSBzaG90O1xyXG4gICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB3aGlsZSAoY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoID4gbG9uZykge1xyXG4gICAgICAgIGZvbnRTaXplLS07XHJcbiAgICAgICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB9XHJcbiAgICBjdHguZmlsbFRleHQodGV4dCwgLWxvbmcsIGZvbnRTaXplKTtcclxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOeUn+aIkOWbvueJh+W5tuS/neWtmOWIsOebuOWGjFxyXG4gKiBAcGFyYW0gYmd1cmwg6IOM5pmv5Zu+54mH55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVVUkwg5LqM57u056CB55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVXZEFuZEhnIOS6jOe7tOeggeeahOWuveW6plxyXG4gKiBAcGFyYW0geFdpZHRoIOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpIg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5SGVpZ2h0IOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB0ZXh0YmdVUkwg5Yqg5YWl55S75biD55qE5Zu+54mH55qEVVJMXHJcbiAqIEBwYXJhbSB4VGV4dFdpZHRoIOWKoOWFpeeUu+W4g+eahOWbvueJh+i3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5VGV4dEhlaWdodCDliqDlhaXnlLvluIPnmoTlm77niYfot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVDb252YXNBbmRTYXZlUGhvdG8gPSAoY2FudmFzT2JqLCByZXNvbHZlKSA9PiB7XHJcbiAgICBsZXQge2JndXJsLCBxcmNvZGVVUkwsIHFyY29kZVdkQW5kSGcsIHhXaWR0aCwgeUhlaWdodCwgdGV4dGJnVVJMLCB4VGV4dFdpZHRoLCB5VGV4dEhlaWdodH0gPSBjYW52YXNPYmo7XHJcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1vbkNhbnZhc1dyYXBwZXInKTtcclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk55S75biD5YaF5a65XHJcbiAgICAgKi9cclxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aFxyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLnNyYyA9IGJndXJsO1xyXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy/oqK3nva7nlavkvYjnmoTlr6zpq5hcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGltZy53aWR0aCk7XHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaW1nLmhlaWdodCk7XHJcblxyXG4gICAgICAgIC8v5Zyo55Wr5biD5LiK55Wr6IOM5pmv5ZyWXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG5cclxuICAgICAgICBpZiAoISF0ZXh0YmdVUkwpIHtcclxuICAgICAgICAgICAgbGV0IHRleHRVcmkgPSB0ZXh0YmdVUkw7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0SW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIHRleHRJbWcuc3JjID0gdGV4dFVyaTtcclxuICAgICAgICAgICAgdGV4dEltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRleHRJbWcsIHhUZXh0V2lkdGgsIHlUZXh0SGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuozntq3norzlnJbniYflpKflsI9cclxuICAgICAgICB2YXIgcXJjb2RlV2lkdGhBbmRIZWlnaHQgPSBxcmNvZGVXZEFuZEhnO1xyXG4gICAgICAgIC8v5riF6Zmk5LqM57u056CBXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB2YXIgcXJjb2RlID0gbmV3IFFSQ29kZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKSwge1xyXG4gICAgICAgICAgICB0ZXh0OiBxcmNvZGVVUkwsXHJcbiAgICAgICAgICAgIGhlaWdodDogcXJjb2RlV2lkdGhBbmRIZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoOiBxcmNvZGVXaWR0aEFuZEhlaWdodCxcclxuICAgICAgICAgICAgY29ycmVjdExldmVsOiBRUkNvZGUuQ29ycmVjdExldmVsLkxcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcXJjb2RlSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xyXG4gICAgICAgIHFyY29kZUltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8v55Wr5LqM57at56K855qE5ZyW54mHXHJcbiAgICAgICAgICAgIGxldCBxcmNvZGVEeCA9IHhXaWR0aCwgcXJjb2RlRHkgPSB5SGVpZ2h0O1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHFyY29kZUltZywgcXJjb2RlRHgsIHFyY29kZUR5KTtcclxuICAgICAgICAgICAgLy8gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICBzYXZlUGljVG9Mb2NhbChjYW52YXMsIHJlc29sdmUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImlpXCI6XCJpaVwiLFwicGIzMlwiOlwicGIzMlwiLFwiY29udGVudFwiOlwiY29udGVudFwiLFwicHQzMlwiOlwicHQzMlwiLFwibXVzdC1pblwiOlwibXVzdC1pblwiLFwicGljV2FycC1kaXZcIjpcInBpY1dhcnAtZGl2XCIsXCJpbmZvSXRlbVwiOlwiaW5mb0l0ZW1cIixcInBpY0JvcmRcIjpcInBpY0JvcmRcIixcImJvcmRlclwiOlwiYm9yZGVyXCIsXCJwaG90by1pY29uXCI6XCJwaG90by1pY29uXCIsXCJpbWFnZUJnXCI6XCJpbWFnZUJnXCIsXCJpZEluZm8taW50cm9kdWNlXCI6XCJpZEluZm8taW50cm9kdWNlXCIsXCJzdG9yZUluZm8taW50cm9kdWNlXCI6XCJzdG9yZUluZm8taW50cm9kdWNlXCIsXCJtdDM2XCI6XCJtdDM2XCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvSWRJZGVudGlmeS9JZElkZW50aWZ5LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDdkM2FjMTc2NDZhMDljNWZmZDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsImNvbnN0IGNvbmZpZyA9IHtcclxuICAgIFJFU1Q6IHtcclxuICAgICAgICBhcHBseU1jYzogXCJjb2xsZWN0aW9uQ29kZS9hcHBseU1jY1wiLCAvLzIuNC4055Sz6K+35pS25qy+56CB5o6l5Y+jXHJcbiAgICAgICAgZ2V0TWNjQ2FyZExpc3Q6IFwiY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIiwgLy8yLjQuMuWVhuaIt+aUtuasvueggeWNoeWIl+ihqOaOpeWPo1xyXG4gICAgICAgIGFwcGx5TWF0OiBcImNvbGxlY3Rpb25Db2RlL2FwcGx5TWF0XCIsIC8v55Sz6K+354mp5paZ5o6l5Y+jXHJcbiAgICAgICAgZ2V0TWNobnRBbmRBcmVhSW5mOiBcIm1jaG50L2dldE1jaG50QW5kQXJlYUluZi5zanNvblwiLCAvL+WVhuaIt+exu+Wei+WPiuWcsOWMuuWIl+ihqOafpeivolxyXG4gICAgICAgIHVwZ3JhZGVNY2M6IFwiY29sbGVjdGlvbkNvZGUvdXBncmFkZU1jY1wiLCAvLzIuNC425Y2H57qn5pS25qy+56CB5o6l5Y+jLFxyXG4gICAgICAgIGdldEFkZHJMaXN0OiBcImFkZHJlc3MvZ2V0QWRkckxpc3RcIiAsIC8vMi40LjEzIOiOt+WPluaUtui0p+WcsOWdgOWIl+ihqFxyXG4gICAgICAgIGRlbGV0ZUFkZHJlc3M6IFwiYWRkcmVzcy9kZWxldGVBZGRyZXNzXCIgLCAvLzIuNC4xMiDliKDpmaTmlLbotKflnLDlnYBcclxuICAgICAgICBlZGl0QWRkcmVzczogXCJhZGRyZXNzL2VkaXRBZGRyZXNzXCIsIC8vMi40LjExIOS/ruaUueaUtui0p+WcsOWdgCxcclxuICAgICAgICBuZXdBZGRyZXNzOiBcImFkZHJlc3MvbmV3QWRkcmVzc1wiLCAvLzIuNC4xMCDmlrDlop7mlLbotKflnLDlnYBcclxuICAgICAgICBtY2hudE9wZXIgOlwibWNobnQvbWNobnRPcGVyXCIsIC8vMi4yLjIg5bqX6ZO65L+h5oGv5pu05pawXHJcbiAgICAgICAgZ2V0TGltaXRBdEluZm86XCJtY2hudC9nZXRMaW1pdEF0SW5mb1wiLCAvL+iOt+WPluaUtuasvumZkOminVxyXG4gICAgICAgIHNldE1jY09uT2ZmOlwiY29sbGVjdGlvbkNvZGUvc2V0TWNjT25PZmZcIiwgLy/lgZzmraLlkozlkK/nlKjku5jmrL7noIHlgJ/lj6NcclxuICAgICAgICBnZXRNY2hudERldGFpbDpcIm1jaG50L21jaG50RGV0YWlsXCIsIC8vMi4yLjEg6I635Y+W5bqX6ZO66K+m5oOF6aG16Z2iXHJcbiAgICAgICAgLy8gdXBncmFkZU1jYzogXCJjb2xsZWN0aW9uQ29kZS91cGdyYWRlTWNjXCIsIC8vMi40LjbljYfnuqfmlLbmrL7noIHmjqXlj6NcclxuICAgICAgICBnZXRUb2RheVRyYW5zOlwidHJhbi9nZXRUb2RheVRyYW5zXCIsLy8yLjEuMy8v5LuK5pel6K6i5Y2V5o6l5Y+jXHJcbiAgICAgICAgZ2V0VG9kYXlJbmNvbWU6XCJ0cmFuL2dldFRvZGF5SW5jb21lXCIsLy8yLjEuMeWVhuaIt+acjeWKoemmlumhteS7iuaXpeaUtuasvuaOpeWPo35+fn5+fn5+XHJcbiAgICAgICAgZ2V0SGlzdG9yeUluY29tZTpcInRyYW4vZ2V0SGlzdG9yeUluY29tZVwiLC8vMi4xLjLljoblj7LmlLbmrL7mjqXlj6NcclxuICAgICAgICBnZXRIaXN0b3J5VHJhbnM6XCJ0cmFuL2dldEhpc3RvcnlUcmFuc1wiLC8vMi4xLjTljoblj7LorqLljZXmjqXlj6NcclxuICAgICAgICBnZXRMb2dpc3RpY3NTdDpcIm1hdGVyaWVsL2dldExvZ2lzdGljc1N0XCIsLy8yLjMuM+eJqea1geivpuaDheaOpeWPo+afpeivolxyXG4gICAgICAgIGdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW06XCJ0cmFuL2dldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW1cIiwvLzIuMS415Y2V56yU6K6i5Y2V5p+l6K+i5o6l5Y+jXHJcbiAgICAgICAgZ2V0QXVkaXRJbmZvOlwiY29sbGVjdGlvbkNvZGUvZ2V0QXVkaXRJbmZvXCIsLy8yLjQuMTTkv6HnlKjljaHljYfnuqflrqHmoLjnu5Pmnpzmn6Xor6JcclxuICAgICAgICB1cGRhdGVNY2NDYXJkOlwiY29sbGVjdGlvbkNvZGUvdXBkYXRlTWNjQ2FyZFwiLC8vMi40Ljnmm7TmjaLmlLbmrL7ljaHmjqXlj6NcclxuICAgICAgICBnZXRVcGdyYWRlU3Q6XCJtY2hudC9nZXRVcGdyYWRlU3RcIiwvL+afpeivouWVhuaIt+aYr+WQpuWNh+e6p+S/oeeUqOWNoeaUtuasvlxyXG4gICAgICAgIGdldE1jY1RyYW5zTnVtOidjb2xsZWN0aW9uQ29kZS9nZXRNY2NUcmFuc051bScsLy/ojrflj5bosIPlj5bmlK/ku5jmjqfku7bnmoRUTuWPt1xyXG4gICAgICAgIGdldE1hdGVyaWVsSW5mb0xpc3Q6XCJjb2xsZWN0aW9uQ29kZS9nZXRNYXRlcmllbEluZm9MaXN0XCIsLy8yLjQuM+eJqeaWmeS/oeaBr+WIl+ihqOaOpeWPo1xyXG4gICAgICAgIHVzZXJJbmZvOlwiL2FwcC9pbkFwcC91c2VyL2dldFwiLC8v6I635Y+W55So5oi35L+h5oGvXHJcbiAgICAgICAgaXNCbGFjazpcInNjYW4vaXNCbGFja1wiLC8vMi4xLjXmlLbpk7blkZjmmK/lkKblnKjpu5HlkI3ljZVcclxuICAgICAgICBpc0FwcGx5Olwic2Nhbi9pc0FwcGx5XCIsLy8yLjEuNOaYr+WQpuW3sue7j+eUs+ivt+e6ouWMheeggVxyXG4gICAgICAgIHNoYXJlTGluazpcInNjYW4vc2hhcmVMaW5rXCIsLy8yLjEuNueUn+aIkOe6ouWMheeggemTvuaOpVxyXG4gICAgICAgIHJlY21kUmVjb3JkOlwic2Nhbi9yZWNtZFJlY29yZFwiLC8v5o6o6I2Q5YWz57O76K6w5b2VXHJcbiAgICAgICAgZ2V0TG9naXN0aWNzTGlzdDpcIm1hdGVyaWVsL2dldExvZ2lzdGljc0xpc3RcIiwvL+iOt+WPlueJqeaWmeWOhuWPsuiuouWNlVxyXG4gICAgICAgIGdldFJld2FyZExpc3Q6XCJzY2FuL2dldFJld2FyZExpc3RcIiwvLzIuMS435p+l6K+i5pS26ZO25ZGY6LWP6YeR5piO57uG6K6w5b2VXHJcbiAgICAgICAgZ2V0UHJvdG9jb2xJbmZvOlwiY29sbGVjdGlvbkNvZGUvZ2V0UHJvdG9jb2xJbmZvXCIsLy/llYbmiLfljYfnuqfmn6Xor6LmmL7npLrljY/orq7nmoTlkI3np7DlkozljY/orq7nmoTlnLDlnYBcclxuICAgICAgICBnZXRDaXR5OlwicmVnaW9uL2dldENpdHlcIiwvL+mAmui/h0lQ5Zyw5Z2A6I635Y+W5Zyw5Z2A5a6a5L2NXHJcbiAgICAgICAgZ2V0UXJVcmw6XCJjb2xsZWN0aW9uQ29kZS9nZXRRckluZm9cIi8vMi4xLjHojrflj5bnlKjmiLfmlLbmrL7noIFVUkxcclxuICAgIH0sXHJcbiAgICBTVEFUVVNDT0RFOiB7XHJcbiAgICAgICAgU1VDQ0VTUzpcIjAwXCJcclxuICAgIH0sXHJcbiAgICBDT05TVF9EQVRBOntcclxuICAgICAgICBpbWdlU2l6ZTpcIjMwMFwiXHJcbiAgICB9LFxyXG4gICAgQ0FDSEVLRVk6e1xyXG4gICAgICAgIGdldE1jY0NhcmRMaXN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1jb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBVcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLW1jaG50L2dldFVwZ3JhZGVTdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLW1jaG50L2dldFVwZ3JhZGVTdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRNY2hudERldGFpbDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLW1jaG50L21jaG50RGV0YWlsXCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtbWNobnQvbWNobnREZXRhaWxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNBcHBseTp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLXNjYW4vaXNBcHBseVwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLXNjYW4vaXNBcHBseVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRBZGRyTGlzdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLWFkZHJlc3MvZ2V0QWRkckxpc3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1hZGRyZXNzL2dldEFkZHJMaXN0XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvY29uZmlnLmpzIiwiaW1wb3J0IEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCI7XHJcblxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5Y+q5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIOWFiOivu+e8k+WtmO+8jOWQjOatpeW+gOWQjuWPsOWPkeivt+axgu+8jOivt+axguaKpeaWh+WbnuadpeWQjuWIt+aWsOe8k+WtmOWPiumhtemdolxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlID0gKHVwZGF0ZSxyb2xsS2V5LHNlY29uZEtleSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICByb2xsS2V5LFxyXG4vLyAgICAgICAgICAgICBzZWNvbmRLZXlcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIHVwZGF0ZTogdXBkYXRlLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDkuI3mlK/mjIEgc3cgICAs5rC45LmF57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7Y2FjaGU6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVMb25nVGltZSA9IChyb2xsS2V5LCBzZWNvbmRLZXkpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICByb2xsS2V5LFxyXG4vLyAgICAgICAgICAgICBzZWNvbmRLZXlcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOWPquS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAx5YiG6ZKf5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMW1pbiA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTMwbWluID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDMwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UxaG91ciA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqNjAqMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMmhvdXIgPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMiAqIDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcblxyXG4vL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMjRkaWFuID0gKCkgPT4ge1xyXG4vL1xyXG4vLyAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4vLyAgICAgbGV0IHRlbW9ycm93ID0gbmV3IERhdGUoKTtcclxuLy8gICAgIHRlbW9ycm93LnNldEhvdXJzKDIzKTtcclxuLy8gICAgIHRlbW9ycm93LnNldE1pbnV0ZXMoNTkpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0U2Vjb25kcyg1OSk7XHJcbi8vICAgICBsZXQgdGVtID0gdGVtb3Jyb3cuZ2V0VGltZSgpO1xyXG4vLyAgICAgbGV0IHZhbGlkYXRlVGltZSA9IHRlbSAtIG5vdyArIDEwMDAgKiA2MFxyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgICAgIHZhbGlkYXRlVGltZTogdmFsaWRhdGVUaW1lLFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICB3b3JrYm9455qE562W55WlICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuLy9cclxuLy8gLyoqXHJcbi8vICAq5Li6Z2V06K+35rGC77yM5LiN5Yqg5a+GXHJcbi8vICAq5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKuWFiOivu+e8k+WtmO+8jOWQjOaXtuW+gOWQjuWPsOWPkeivt+axgu+8jOivt+axguaKpeaWh+WbnuadpeWQjuWIt+aWsOe8k+WtmOWPiumhtemdolxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgY2FjaGU6IGJvb2xlYW4sIGFzeW5jOiBib29sZWFufX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZSA9ICh1cGRhdGUpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgYnlBamF4OiBmYWxzZSwvL+WmguaenOimgeaUr+aMgXN3IOWwseS4jemcgOS9v+eUqGFqYXhcclxuLy8gICAgICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgdXBkYXRlOiB1cGRhdGVcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAzMOWIhumSn+WGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QzMG1pbiA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDMwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDHlsI/mmYLlhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MWhvdXIgPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDJob3VyID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMiAqIDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8qKlxyXG4gKiDor6XnrZbnlaXmmK/kuIDlrprml7bpl7TlhoXkuI3lkJHlkI7lj7Dor7fmsYLmlbDmja7vvIwg5aaC5p6c5Zyo6K6+5aSH5LiK5pSv5oyBc3fliJnkvb/nlKhzdyzlkKbliJnkvb/nlKggbG9jYWxTdG9yYWdlXHJcbiAqIEBwYXJhbSB0aW1lICDopoHnvJPlrZjnmoTml7bpl7Qg5Y2V5L2N5piv5q+r56eSXHJcbiAqIEByZXR1cm5zIHt7YnlBamF4OiBib29sZWFuLCBmb3JDaHNwOiBib29sZWFuLCBlbmNyeXB0OiBib29sZWFuLCBjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge3ZhbGlkYXRlVGltZTogKn19fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QgPSh0aW1lKT0+e1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBieUFqYXg6IHRydWUsXHJcbiAgICAgICAgZm9yQ2hzcDpmYWxzZSxcclxuICAgICAgICBlbmNyeXB0OmZhbHNlLFxyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgdmFsaWRhdGVUaW1lOnRpbWUsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqICDor6XnrZbnlaXmmK/kuIDlrprml7bpl7TlhoXkuI3lkJHlkI7lj7Dor7fmsYLmlbDmja7vvIzmt7vliqDnvJPlrZjlj6rlnKhsb2NhbHN0b3JhZ2XkuK1cclxuICogQHBhcmFtIHRpbWUgIOimgee8k+WtmOeahOaXtumXtCDljZXkvY3mmK/mr6vnp5JcclxuICogQHBhcmFtIHJvbGxLZXkgICDpnZ7lv4Xloasg5aaC5p6c5ZCO5pyf6KaB5Yig6Zmk6L+Z5Liq57yT5a2Y77yM6L+Z5aGr5YaZ6L+Za2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXkgIOmdnuW/heWhqyDlpoLmnpzlkI7mnJ/opoHliKDpmaTov5nkuKrnvJPlrZjvvIzov5nloavlhpnov5lrZXlcclxuICogQHJldHVybnMge3tjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge25lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiAqLCByb2xsS2V5OiAqLCBzZWNvbmRLZXk6ICp9fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjYWNoZUZpcnN0U3RvcmFnZSA9KHRpbWUscm9sbEtleSwgc2Vjb25kS2V5KT0+e1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlVGltZTogdGltZSxcclxuICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzcG9uc2VGb3JtYXR0ZXIgPSAoZGF0YSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnJlc3AsXHJcbiAgICAgICAgZGF0YTogZGF0YS5wYXJhbXMsXHJcbiAgICAgICAgbXNnOiBkYXRhLm1zZ1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDor6XnrZbnlaXmmK/lhYjor7vnvJPlrZjvvIzlkIzml7blkJHlkI7lj7Dlj5HpgIHor7fmsYLvvIzor7fmsYLlm57mnaXlkI7lkIzmraXmm7TmlrDnvJPlrZjvvIzlm57osIN1cGRhdGUg5Ye95pWw77yMXHJcbiAqIEBwYXJhbSB1cGRhdGUg5b+F5aGr5pu05paw6aG16Z2i55qE5Zue6LCD5Ye95pWwXHJcbiAqIEBwYXJhbSByb2xsS2V5ICDpnZ7lv4Xloasg6K6+572u57yT5a2Y55qEIHJvbGxrZXlcclxuICogQHBhcmFtIHNlY29uZEtleSDpnZ7lv4Xloasg6K6+572u57yT5a2Y55qEIHNlY29uZEtleVxyXG4gKiBAcmV0dXJucyB7e2NhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7YXN5bmM6IGJvb2xlYW4sIHJvbGxLZXk6ICosIHNlY29uZEtleTogKn0sIHVwZGF0ZTogKn19XHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlID0gKHVwZGF0ZSxyb2xsS2V5LHNlY29uZEtleSkgPT4ge1xyXG5cclxuICAgbGV0ICByZWZyZXNoRG9tRnVuYz0ocmVzcG9uc2UpPT57XHJcbiAgICAgICBsZXQgcmVxPXJlc3BvbnNlRm9ybWF0dGVyKHJlc3BvbnNlKVxyXG4gICAgICAgLy8g5bCG6I635Y+W55qE5pWw5o2u5ZKM57yT5a2Y5Lit55qE5pWw5o2u6L+b6KGM5a+55q+UXHJcbiAgICAgICBsZXQgZGF0YUZyb21DYWNoZSA9IHt9O1xyXG4gICAgICAgVVAuVy5VdGlsLmdldEZyb21TdG9yYWdlKHtcclxuICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgfSxmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICBpZiggISFkYXRhICl7XHJcbiAgICAgICAgICAgICAgICBkYXRhRnJvbUNhY2hlID0gZGF0YTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgIH0pXHJcbiAgICAgICBsZXQgaXNTYW1lQXRBbGwgPSBJbW11dGFibGUuaXMoSW1tdXRhYmxlLmZyb21KUyhyZXEpLEltbXV0YWJsZS5mcm9tSlMoZGF0YUZyb21DYWNoZSkpOyAvL+aVsOaNruaYr+WQpuWujOWFqOebuOWQjFxyXG4gICAgICAgaWYoICFpc1NhbWVBdEFsbCApeyAvL+aVsOaNruacieWPmOWKqFxyXG4gICAgICAgICAgICB1cGRhdGUocmVxKVxyXG4gICAgICAgfVxyXG4gICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIGVuZE9mU3luY0Z1bmM6ZmFsc2UsXHJcbiAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiByZWZyZXNoRG9tRnVuYyxcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOWIoOmZpGxvY2Fsc3RvcmFnZeS4reeahOe8k+WtmFxyXG4gKiBAcGFyYW0gcm9sbEtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2FjaGUgPSAocm9sbEtleSwgc2Vjb25kS2V5KSA9PiB7XHJcbiAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgcm9sbEtleTogcm9sbEtleSxcclxuICAgICAgICBzZWNvbmRLZXk6IHNlY29uZEtleVxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfliKDpmaTnvJPlrZjmiJDlip8nKVxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICAgICAgZnVsbDogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9jYWNoZVN0b3JhZ2UuanMiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1Byb21pc2UnLCB7ICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgKHJlc3VsdC5lID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnYpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanNcbi8vIG1vZHVsZSBpZCA9IDhlMGMxZGIwMDA4NWM4YWQyNTVhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UudHJ5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDk3M2NjOGVlZmM1OTkzMWRlOTVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBhYTk2M2I0YzI3MTQ0ZjA5NGNjYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCBJZElkZW50aWZ5IGZyb20gXCIuL0lkSWRlbnRpZnlcIlxyXG5pbXBvcnQge2JlZm9yZUVudGVyUm91dGVyLCBnZXRTZWFyY2hQYXJhbX0gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RcIjtcclxuaW1wb3J0IHtVUERBVEVfU1RPUkVfU1RBVEV9IGZyb20gXCIuLi8uLi9zdG9yZS9hY3Rpb25cIjtcclxuaW1wb3J0IHtzdWJtaXRIYW5kbGVDbGlja30gZnJvbSBcIi4vSWRJZGVudGlmeUFjdGlvbnNcIjtcclxuXHJcblxyXG5jbGFzcyBJZElkZW50aWZ5Q29udGFpbmVycyBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dClcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGlzRmFpbGJhY2s6IGZhbHNlLCAgIC8v5piv5ZCm5p2l6Ieq5aSx6LSl6aG16Z2iXHJcbiAgICAgICAgICAgIGZhaWxQaWN0cnVlT2JqOiB7fSAgICAgIC8v6KaB5pu05paw55qE5Zu+54mH5pyJ5ZOq5LqbXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VhcmNoID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2g7XHJcbiAgICAgICAgaWYgKCEhc2VhcmNoKSB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6cc2VhcmNoIOWtmOWcqOS7o+ihqOadpeiHquWuoeaguOWksei0peeahOWbnuiwg+mhtemdolxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5aaC5p6c5piv5a6h5qC45aSx6LSl5LqG6L+b5YWl6K+l6aG16Z2i77yM6ZyA6KaB5ZyoVVJM5LiK6Z2i5Yqg5YWl5Lik5Liq5Y+C5pWwXHJcbiAgICAgICAgICAgICAqIGlzRmFpbGJhY2sgICAgICAg5piv5ZCm5p2l6Ieq5a6h5qC45aSx6LSl6aG16Z2iIOaYry10cnVlLOWQpi1mYWxzZVxyXG4gICAgICAgICAgICAgKiBmYWlsUGljdHJ1ZU9iaiAgIOmUmeivr+eahOWbvueJh+aYr+WTquS4gOexuyDku5bmmK9KU09OIHN0cmluZyDkuLJcclxuICAgICAgICAgICAgICoge1xyXG4gICAgICAgICAgICAgKiAgICAgbWVybm1WZXJpZnlGYWlsUmVhc29uOiBmYWxzZSwgICAgLy/lupfpk7rlkI3np7DmnInor68gdHJ1ZSAg5Luj6KGo5pyJ6ZSZ6K+v77yMZmFsc2Ug5Luj6KGo5rKh5pyJ6ZSZ6K+vXHJcbiAgICAgICAgICAgICAqICAgICBjZXJ0VmVyaWZ5RmFpbFJlYXNvbjogZmFsc2UsICAgICAvL+i6q+S7veivgSDkv6Hmga/mnInor69cclxuICAgICAgICAgICAgICogICAgIGxpY1ZlcmlmeUZhaWxSZWFzb246IGZhbHNlLCAgICAgIC8v6JCl5Lia5omn54Wn5L+h5oGv5pyJ6K+vXHJcbiAgICAgICAgICAgICAqICAgICBzaG9wcGljVmVyaWZ5RmFpbFJlYXNvbjogZmFsc2UsICAvL+W6l+mTuueFp+eJh+acieivr1xyXG4gICAgICAgICAgICAgKiAgICAgYXV4VmVyaWZ5RmFpbFJlYXNvbjogZmFsc2UsICAgICAgLy/ovoXliqnor4HmmI7otYTmlpnmnInor69cclxuICAgICAgICAgICAgICogICAgIG1lckxvZ29WZXJpZnlGYWlsUmVhc29uOiBmYWxzZSwgICAgLy/lupfpk7psb2dv5pyJ6K+vXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIH1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGxldCB7aXNGYWlsYmFjaywgZmFpbFBpY3RydWVPYmp9ID0gZ2V0U2VhcmNoUGFyYW0oc2VhcmNoKTtcclxuICAgICAgICAgICAgZmFpbFBpY3RydWVPYmogPSBKU09OLnBhcnNlKGZhaWxQaWN0cnVlT2JqKVxyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgaXNGYWlsYmFjayxcclxuICAgICAgICAgICAgICAgIGZhaWxQaWN0cnVlT2JqXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgYmVmb3JlRW50ZXJSb3V0ZXIoJ+i6q+S7veS/oeaBr+aguOmqjCcpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpITnkIbmjInpkq7ngrnlh7vkuovku7ZcclxuICAgICAqL1xyXG4gICAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHtmYWlsUGljdHJ1ZU9iaiwgaXNGYWlsYmFja30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGxldCB7Y2VydGlmUGljMSwgY2VydGlmUGljMiwgY2VydGlmUGljMywgbGljZW5zZVBpYywgc2hvcFBpYzEsIHNob3BQaWMyLCBhdXhQcm92TWF0MSwgYXV4UHJvdk1hdDIsIHNob3BMb2dvUGljLCBtZXJjaGFudERldGFpbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGxldCBTdHJvZUFyZWEgPSBtZXJjaGFudERldGFpbC5hcmVhLnNwbGl0KCd8Jyk7XHJcbiAgICAgICAgaWYgKGlzRmFpbGJhY2spIHtcclxuICAgICAgICAgICAgLy/lpoLmnpzmmK/ku47lrqHmoLjplJnor6/nu5PmnpzpobXlm57osIPlm57mnaXnmoTvvIzmoLnmja5mYWlsUGljdHJ1ZU9iauadpeWGs+WumuWPguaVsFxyXG4gICAgICAgICAgICBsZXQgcGFyYW0gPSB7fTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoZmFpbFBpY3RydWVPYmopLmZvckVhY2goKGtleSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09IFwibWVybm1WZXJpZnlGYWlsUmVhc29uXCIgJiYgc2hvd0Vycm9yUGljW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzmnInnlKjmiLfkv6Hmga/lh7rplJlcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwYXJhbSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVObTogbWVyY2hhbnREZXRhaWwuc3RvcmVObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN0b3JlVHA6IG1lcmNoYW50RGV0YWlsLnN0b3JlVHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92Q2Q6IFN0cm9lQXJlYVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlDZDogU3Ryb2VBcmVhWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291dHlDZDogISFTdHJvZUFyZWFbMl0gPyBTdHJvZUFyZWFbMl0gOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcjogbWVyY2hhbnREZXRhaWwuYWRkclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXkgPT0gXCJjZXJ0VmVyaWZ5RmFpbFJlYXNvblwiICYmIHNob3dFcnJvclBpY1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocGFyYW0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlcnRpZlBpYzE6IGNlcnRpZlBpYzEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZXJ0aWZQaWMyOiBjZXJ0aWZQaWMyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VydGlmUGljMzogY2VydGlmUGljMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09IFwibGljVmVyaWZ5RmFpbFJlYXNvblwiICYmIHNob3dFcnJvclBpY1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocGFyYW0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpY2Vuc2VQaWM6IGxpY2Vuc2VQaWMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PSBcInNob3BwaWNWZXJpZnlGYWlsUmVhc29uXCIgJiYgc2hvd0Vycm9yUGljW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwYXJhbSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcFBpYzE6IHNob3BQaWMxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcFBpYzI6IHNob3BQaWMyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXkgPT0gXCJhdXhWZXJpZnlGYWlsUmVhc29uXCIgJiYgc2hvd0Vycm9yUGljW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwYXJhbSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4UHJvdk1hdDE6IGF1eFByb3ZNYXQxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4UHJvdk1hdDI6IGF1eFByb3ZNYXQyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwYXJhbSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcExvZ29QaWM6IHNob3BMb2dvUGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBzdWJtaXRIYW5kbGVDbGljayhwYXJhbSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvL+WQpuWImeWwhuaJgOacieeahOWVhuaIt+S/oeaBr+WPkemAgee7meWQjuWPsFxyXG4gICAgICAgICAgICBzdWJtaXRIYW5kbGVDbGljayh7XHJcbiAgICAgICAgICAgICAgICBzdG9yZU5tOiBtZXJjaGFudERldGFpbC5zdG9yZU5tLFxyXG4gICAgICAgICAgICAgICAgU3RvcmVUcDogbWVyY2hhbnREZXRhaWwuc3RvcmVUcCxcclxuICAgICAgICAgICAgICAgIHByb3ZDZDogU3Ryb2VBcmVhWzBdLFxyXG4gICAgICAgICAgICAgICAgY2l0eUNkOiBTdHJvZUFyZWFbMV0sXHJcbiAgICAgICAgICAgICAgICBjb3V0eUNkOiAhIVN0cm9lQXJlYVsyXSA/IFN0cm9lQXJlYVsyXSA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBhZGRyOiBtZXJjaGFudERldGFpbC5hZGRyLFxyXG4gICAgICAgICAgICAgICAgY2VydGlmUGljMTogY2VydGlmUGljMSxcclxuICAgICAgICAgICAgICAgIGNlcnRpZlBpYzI6IGNlcnRpZlBpYzIsXHJcbiAgICAgICAgICAgICAgICBjZXJ0aWZQaWMzOiBjZXJ0aWZQaWMzLFxyXG4gICAgICAgICAgICAgICAgbGljZW5zZVBpYzogbGljZW5zZVBpYyxcclxuICAgICAgICAgICAgICAgIHNob3BQaWMxOiBzaG9wUGljMSxcclxuICAgICAgICAgICAgICAgIHNob3BQaWMyOiBzaG9wUGljMixcclxuICAgICAgICAgICAgICAgIGF1eFByb3ZNYXQxOiBhdXhQcm92TWF0MSxcclxuICAgICAgICAgICAgICAgIGF1eFByb3ZNYXQyOiBhdXhQcm92TWF0MixcclxuICAgICAgICAgICAgICAgIHNob3BMb2dvUGljOiBzaG9wTG9nb1BpYyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb3BzKTtcclxuICAgICAgICByZXR1cm4gPElkSWRlbnRpZnkgey4uLnRoaXMucHJvcHN9IHsuLi50aGlzLnN0YXRlfSBoYW5kbGVDbGljaz17dGhpcy5oYW5kbGVDbGlja30vPjtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwc3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1lcmNoYW50RGV0YWlsOiBzdGF0ZS5nZXRJbihbXCJtY2hudERldGFpbFwiXSkudG9KUygpLFxyXG4gICAgICAgIGNlcnRpZlBpYzE6IHN0YXRlLmdldEluKFtcInVwZGF0ZUltZ1wiLCBcImNlcnRpZlBpYzFcIl0pLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6Lqr5Lu96K+B5Zu95b695omA5Zyo6Z2iXHJcbiAgICAgICAgY2VydGlmUGljMjogc3RhdGUuZ2V0SW4oW1widXBkYXRlSW1nXCIsIFwiY2VydGlmUGljMlwiXSksICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ouqvku73or4HnhafniYfmiYDlnKjpnaJcclxuICAgICAgICBjZXJ0aWZQaWMzOiBzdGF0ZS5nZXRJbihbXCJ1cGRhdGVJbWdcIiwgXCJjZXJ0aWZQaWMzXCJdKSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aJi+aMgei6q+S7veivgeeahOeFp+eJh1xyXG4gICAgICAgIGxpY2Vuc2VQaWM6IHN0YXRlLmdldEluKFtcInVwZGF0ZUltZ1wiLCBcImxpY2Vuc2VQaWNcIl0pLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6JCl5Lia5omn54Wn54Wn54mHXHJcbiAgICAgICAgc2hvcFBpYzE6IHN0YXRlLmdldEluKFtcInVwZGF0ZUltZ1wiLCBcInNob3BQaWMxXCJdKSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5bqX6ZO654Wn54mHMVxyXG4gICAgICAgIHNob3BQaWMyOiBzdGF0ZS5nZXRJbihbXCJ1cGRhdGVJbWdcIiwgXCJzaG9wUGljMlwiXSksICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W6l+mTuueFp+eJhzJcclxuICAgICAgICBhdXhQcm92TWF0MTogc3RhdGUuZ2V0SW4oW1widXBkYXRlSW1nXCIsIFwiYXV4UHJvdk1hdDFcIl0pLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ovoXliqnor4HmmI7nhafniYcxXHJcbiAgICAgICAgYXV4UHJvdk1hdDI6IHN0YXRlLmdldEluKFtcInVwZGF0ZUltZ1wiLCBcImF1eFByb3ZNYXQyXCJdKSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6L6F5Yqp6K+B5piO54Wn54mHMVxyXG4gICAgICAgIHNob3BMb2dvUGljOiBzdGF0ZS5nZXRJbihbXCJ1cGRhdGVJbWdcIiwgXCJzaG9wTG9nb1BpY1wiXSksICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W6l+mTumxvZ28g54Wn54mHXHJcbiAgICAgICAgaXNBZ3JlZVVwQ29kZUFncmVlbWVudDogc3RhdGUuZ2V0SW4oW1wiaXNBZ3JlZVVwQ29kZUFncmVlbWVudFwiXSlcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwRGlzcGF0aFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsHJlZHV4IOS4reeahOeFp+eJh1xyXG4gICAgICogQHBhcmFtIHZhbHVlICB7a2V5OnZhbHVlIH3lr7nosaEgIOS4vuS4quagl+WtkO+8mntjZXJ0aWZQaWMxOmJhc2U2NFN0cn1cclxuICAgICAqL1xyXG4gICAgbGV0IGNoYW5nZVBob3RvID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHt1cGRhdGVJbWc6IHZhbHVlfSkpXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGfmm7TmlrByZWR1eOS4reWNj+iuruS7o+ihqOeahOeKtuaAge+8jFxyXG4gICAgICogQHBhcmFtIHZhbFxyXG4gICAgICovXHJcbiAgICBsZXQgY2hhbmdlQWdyZWVtZW50ID0gKHZhbCkgPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7aXNBZ3JlZVVwQ29kZUFncmVlbWVudDogdmFsfSkpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjaGFuZ2VQaG90bzogY2hhbmdlUGhvdG8sXHJcbiAgICAgICAgY2hhbmdlQWdyZWVtZW50OiBjaGFuZ2VBZ3JlZW1lbnRcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcHN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0aFRvUHJvcHMpKElkSWRlbnRpZnlDb250YWluZXJzKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvSWRJZGVudGlmeS9JZElkZW50aWZ5Q29udGFpbmVycy5qcyIsImltcG9ydCB7Y3JlYXRlV2ViVmlld30gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RcIjtcclxuaW1wb3J0IE1vZGFsIGZyb20gJ2FudGQtbW9iaWxlL2xpYi9tb2RhbCc7XHJcbmltcG9ydCB7dXBncmFkZU1jY30gZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL3JlcXVlc3RBUElcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIHN1Ym1pdEhhbmRsZUNsaWNrKHBhcmFtKSB7XHJcbiAgICB1cGdyYWRlTWNjKHBhcmFtKS50aGVuKCgpID0+IHtcclxuICAgICAgICBNb2RhbC5hbGVydCgn5o+Q5Lqk5oiQ5YqfJywgJ+aIkeS7rOWwhuWcqDJ+NeS4quW3peS9nOaXpeWGheWujOaIkOWuoeaguO+8jOivt+iAkOW/g+etieW+he+8jOWuoeaguOe7k+aenOWwhumAmui/h+S6kemXquS7mOa2iOaBr+i/m+ihjOWPkemAgScsIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WlveeahCcsIG9uUHJlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi9zL3dsL3h2c2gvaW5kZXguaHRtbCMvbWVyY2hhYnRTZXJ2XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlV2ViVmlldyh1cmwsIG51bGwsIFwiXCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdKVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9JZElkZW50aWZ5L0lkSWRlbnRpZnlBY3Rpb25zLmpzIiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanNcbi8vIG1vZHVsZSBpZCA9IGI1MGQ4MjQ1NmU1NDVkY2MzZGQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIGFyZ3MsIHRoYXQpIHtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanNcbi8vIG1vZHVsZSBpZCA9IGI1ODBiOTRiMTk1ODQyY2JmMmIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIE9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbnZhciBpc05vZGUgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZiAoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAoaXNOb2RlKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyLCBleGNlcHQgaU9TIFNhZmFyaSAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMzlcbiAgfSBlbHNlIGlmIChPYnNlcnZlciAmJiAhKGdsb2JhbC5uYXZpZ2F0b3IgJiYgZ2xvYmFsLm5hdmlnYXRvci5zdGFuZGFsb25lKSkge1xuICAgIHZhciB0b2dnbGUgPSB0cnVlO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlIHdpdGhvdXQgYW4gYXJndW1lbnQgdGhyb3dzIGFuIGVycm9yIGluIExHIFdlYk9TIDJcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gICAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYgKCFoZWFkKSB7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gYmRlMGY1N2U5YjU3OWY5NDNmODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjUuNC4xLjUgTmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5cbmZ1bmN0aW9uIFByb21pc2VDYXBhYmlsaXR5KEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIChDKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanNcbi8vIG1vZHVsZSBpZCA9IGMxYjk0ZTNlOTVlZDQzNWFmNTQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtZmluYWxseVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1Byb21pc2UnLCB7ICdmaW5hbGx5JzogZnVuY3Rpb24gKG9uRmluYWxseSkge1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBjb3JlLlByb21pc2UgfHwgZ2xvYmFsLlByb21pc2UpO1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBvbkZpbmFsbHkgPT0gJ2Z1bmN0aW9uJztcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB4OyB9KTtcbiAgICB9IDogb25GaW5hbGx5LFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSk7XG4gICAgfSA6IG9uRmluYWxseVxuICApO1xufSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanNcbi8vIG1vZHVsZSBpZCA9IGMyZTM1YmJmZjgzMzA5NTk0M2MxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4geyBlOiBmYWxzZSwgdjogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBlOiB0cnVlLCB2OiBlIH07XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gY2I3ODM3NTI5NDU0MmMyNGM1YmFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSBkMTgxMGFlNTMzMmUzNmZmYTNjNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbmF2aWdhdG9yID0gZ2xvYmFsLm5hdmlnYXRvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCAnJztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191c2VyLWFnZW50LmpzXG4vLyBtb2R1bGUgaWQgPSBlYzZjYmUzMTdiOTg1MGIwNWNlNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pc0l0ZXJhYmxlMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2lzLWl0ZXJhYmxlXCIpO1xuXG52YXIgX2lzSXRlcmFibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNJdGVyYWJsZTIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2dldC1pdGVyYXRvclwiKTtcblxudmFyIF9nZXRJdGVyYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRJdGVyYXRvcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9ICgwLCBfZ2V0SXRlcmF0b3IzLmRlZmF1bHQpKGFyciksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoKDAsIF9pc0l0ZXJhYmxlMy5kZWZhdWx0KShPYmplY3QoYXJyKSkpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgIH1cbiAgfTtcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gZWY1MWQ0OTg5ZjMwNDRiMmViMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQywgeCkge1xuICBhbk9iamVjdChDKTtcbiAgaWYgKGlzT2JqZWN0KHgpICYmIHguY29uc3RydWN0b3IgPT09IEMpIHJldHVybiB4O1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKEMpO1xuICB2YXIgcmVzb2x2ZSA9IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmU7XG4gIHJlc29sdmUoeCk7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanNcbi8vIG1vZHVsZSBpZCA9IGYwZGJjMTBjNjhkZDgxNDAxNGU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHRhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKCk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuL191c2VyLWFnZW50Jyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjggfHwgJyc7XG52YXIgJFByb21pc2UgPSBnbG9iYWxbUFJPTUlTRV07XG52YXIgaXNOb2RlID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG52YXIgZW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgSW50ZXJuYWwsIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlID0gJFByb21pc2UucmVzb2x2ZSgxKTtcbiAgICB2YXIgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uIChleGVjKSB7XG4gICAgICBleGVjKGVtcHR5LCBlbXB0eSk7XG4gICAgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKVxuICAgICAgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlXG4gICAgICAvLyB2OCA2LjYgKE5vZGUgMTAgYW5kIENocm9tZSA2NikgaGF2ZSBhIGJ1ZyB3aXRoIHJlc29sdmluZyBjdXN0b20gdGhlbmFibGVzXG4gICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04MzA1NjVcbiAgICAgIC8vIHdlIGNhbid0IGRldGVjdCBpdCBzeW5jaHJvbm91c2x5LCBzbyBqdXN0IGNoZWNrIHZlcnNpb25zXG4gICAgICAmJiB2OC5pbmRleE9mKCc2LjYnKSAhPT0gMFxuICAgICAgJiYgdXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZS82NicpID09PSAtMTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uIChwcm9taXNlLCBpc1JlamVjdCkge1xuICBpZiAocHJvbWlzZS5fbikgcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciBvayA9IHByb21pc2UuX3MgPT0gMTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uIChyZWFjdGlvbikge1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbDtcbiAgICAgIHZhciByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZTtcbiAgICAgIHZhciByZWplY3QgPSByZWFjdGlvbi5yZWplY3Q7XG4gICAgICB2YXIgZG9tYWluID0gcmVhY3Rpb24uZG9tYWluO1xuICAgICAgdmFyIHJlc3VsdCwgdGhlbiwgZXhpdGVkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5faCA9PSAyKSBvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpOyAvLyBtYXkgdGhyb3dcbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICAgICAgZXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChkb21haW4gJiYgIWV4aXRlZCkgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGkpIHJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmIChpc1JlamVjdCAmJiAhcHJvbWlzZS5faCkgb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciB1bmhhbmRsZWQgPSBpc1VuaGFuZGxlZChwcm9taXNlKTtcbiAgICB2YXIgcmVzdWx0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmICh1bmhhbmRsZWQpIHtcbiAgICAgIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbikge1xuICAgICAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHVuaGFuZGxlZCAmJiByZXN1bHQuZSkgdGhyb3cgcmVzdWx0LnY7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHJldHVybiBwcm9taXNlLl9oICE9PSAxICYmIChwcm9taXNlLl9hIHx8IHByb21pc2UuX2MpLmxlbmd0aCA9PT0gMDtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCkge1xuICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdiB9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZiAoIXByb21pc2UuX2EpIHByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICB2YXIgdGhlbjtcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkgdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSkge1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAkcmVqZWN0LmNhbGwoeyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJykoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX2EpIHRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fcykgbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSAkUHJvbWlzZSB8fCBDID09PSBXcmFwcGVyXG4gICAgICA/IG5ldyBPd25Qcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgOiBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgUHJvbWlzZTogJFByb21pc2UgfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpIHtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpO1xuICAgIHZhciAkJHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShMSUJSQVJZICYmIHRoaXMgPT09IFdyYXBwZXIgPyAkUHJvbWlzZSA6IHRoaXMsIHgpO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHtcbiAgJFByb21pc2UuYWxsKGl0ZXIpWydjYXRjaCddKGVtcHR5KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIHZhciByZW1haW5pbmcgPSAxO1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgJGluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgdmFyIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IGZhOTg3ZDgxMWU0ZWIyZDQzZDljXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCJdLCJzb3VyY2VSb290IjoiIn0=