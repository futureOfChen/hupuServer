webpackJsonp([3],{

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

/***/ "2d7ebbe658f783007f2a":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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8r8x0DG4H0y6RRRLcFfj47YFBI32vFAovNMWGsYmRhpaJthVLzdS8elbzi3BrMmm4bsR+2FgMxd5nnOfzj0gwNkzI3j24h7YTHsraSsgo4aOW33gaPBmlBBKGQMOqIaRrI16/ej9E/+jxDmMTfoyKhbnvYeq15T9x/d9De9egu3Jxp1om+4oAlgbjtop+8AQbGvFogLtdqPtr1RK2yqWAqJU/IgW669dVZMgDNhKmldiEnCloTbjMTMqKxaO2d1fQMndgUUgrQVEJUUZdDW9WR680WJSlQIjUfUKoDSpYtDGaPLMqq5U9Q+spKTYEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABHoPwL/D4PKU0UShb7UAAAAAElFTkSuQmCC"

/***/ }),

/***/ "39ba73c5d48eb8b2e9ec":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAFqdJREFUeAHtnQtwVNd5x8+uHhYIBEJCIAlsME8BAlOHh01sBgcbFw+RKe9m6ibTdJpM3LQz7QxNH0naSdN0mhm3mcadaeI4TacBJB5xyzDGxNgY2wS/AhjxNhghCQFCMpLQAz22/+/CXd1d7Wr37t7de3b3f2ake/fec8/5zu/c757vvJWiIwESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIIFkEPAkIxI34ti5c+fn+voGfqaUZ57P50vbdLrB1hJno9fr/ctNm9Zvs1xLq1NvWqXGkhgox8s+n6qkcligOH9aBr4vV1dXj3M+aD1CTFsFQckxVw/E6S0FFOQ+lCIz0jWV2emasMCSw/OCx6OOpGtak50uj8dTNDAw8B9mvH19oJumLm0VxJpfohybN2+osV7jeewEdu3aNenOHeVXkNhD0v/JNDax9IdPCfUnkBElSKhsaGxsrICpIPWUtDUPQqU7lmvg1D1y5Mh3CwoKbsbyfCo/k5EKAuX4M2TaC7CjqRxRvr3t7e2tV69e/XxpaempKB9JC2+ZamL9bWAlPi3yMtGJKASz5xMdiW7hZ6SCIKOLdcuIFJEn47hlpIKkyMtIMTUgQAXRIBMogr4EqCD65g0l04AAFUSDTKAI+hKgguibN5RMAwJUEA0ygSLoS4AKom/eUDINCFBBNMgEiqAvASqIvnlDyTQgkJFjsTTgThFAAMPmS3t7+7/p9aqXNm7ceEFHKFSQCLnS39+vzp49r1paWhUGN0bwrfdtzPxT48YVqtmzZyo5d9PJWLjt22tkLvtyYK3at2/fwtWrV/e4KVOouN2lFEoiza7V1zeq5uabKa8cglUUXNJy5UqD65R37Kj5BoRYLoJg7YCKtrbb/+C6UCEE0LoEeeWVV8q6u3ufxtfmYcwK7BwY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"

/***/ }),

/***/ "3c24d38ffcd0c38e3477":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("1679851be27b268ea24e"), __esModule: true };

/***/ }),

/***/ "3cb98d3d87ec149e9895":
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

__webpack_require__("e58353b62fef5ca96d4c");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreditMoney = function (_React$Component) {
    (0, _inherits3.default)(CreditMoney, _React$Component);

    function CreditMoney() {
        (0, _classCallCheck3.default)(this, CreditMoney);
        return (0, _possibleConstructorReturn3.default)(this, (CreditMoney.__proto__ || (0, _getPrototypeOf2.default)(CreditMoney)).apply(this, arguments));
    }

    (0, _createClass3.default)(CreditMoney, [{
        key: "rendenDom",
        value: function rendenDom(status, click) {
            switch (status) {
                case "01":
                    return _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "div",
                            { className: "creditMoneyStatus" },
                            _react2.default.createElement("img", { src: __webpack_require__("2d7ebbe658f783007f2a"), alt: "" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "examineStatus" },
                            "\u5BA1\u6838\u4E2D"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "infoDesc" },
                            _react2.default.createElement(
                                "p",
                                null,
                                "\u60A8\u5DF2\u4E0A\u4F20\u8EAB\u4EFD\u8BC1\u548C\u8425\u4E1A\u6267\u7167"
                            ),
                            _react2.default.createElement(
                                "p",
                                null,
                                "\u8BC1\u4EF6\u8D44\u6599\u6B63\u5728\u5BA1\u6838"
                            )
                        )
                    );
                    break;
                case "02":
                    return _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "div",
                            { className: "creditMoneyStatus" },
                            _react2.default.createElement("img", { src: __webpack_require__("4e13a9c3b1a0250c5bb1"), alt: "" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "examineStatus" },
                            "\u5BA1\u6838\u6210\u529F"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "infoDesc" },
                            _react2.default.createElement(
                                "p",
                                null,
                                "\u5E97\u94FA\u8D44\u6599\u5BA1\u6838\u901A\u8FC7\uFF0C\u7B49\u5230\u5F00\u901A\u5546\u6237\u6536\u6B3E\u6EE190\u5929\u4E14\u8FDE\u7EED\u6536\u6B3E30\u5929\uFF0C\u7CFB\u7EDF\u5C06\u81EA\u52A8\u5F00\u901A\u4FE1\u7528\u5361\u6536\u6B3E\u529F\u80FD\uFF0C\u8BF7\u5173\u6CE8\u6D88\u606F\u63D0\u9192\u3002"
                            )
                        )
                    );
                    break;
                case "03":
                    return _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "div",
                            { className: "creditMoneyStatus" },
                            _react2.default.createElement("img", { src: __webpack_require__("4e13a9c3b1a0250c5bb1"), alt: "" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "examineStatus" },
                            "\u5F00\u901A\u6210\u529F"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "infoDesc" },
                            _react2.default.createElement(
                                "p",
                                null,
                                "\u987E\u5BA2\u5DF2\u53EF\u4F7F\u7528\u4FE1\u7528\u5361\u5411\u60A8\u4ED8\u6B3E"
                            )
                        )
                    );
                    break;
                case "04":
                    return _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "div",
                            { className: "creditMoneyStatus" },
                            _react2.default.createElement("img", { src: __webpack_require__("39ba73c5d48eb8b2e9ec"), alt: "" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "examineStatus" },
                            "\u5BA1\u6838\u5931\u8D25"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "infoDesc" },
                            _react2.default.createElement(
                                "div",
                                { className: "descInfo" },
                                "\u3000\u4EE5\u4E0B\u8D44\u6599\u672A\u901A\u8FC7\u5BA1\u6838\uFF0C\u8BF7\u6838\u5B9E\u5E76\u4FEE\u6539\uFF1A"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "descInfo" },
                                "\u3000\u8425\u4E1A\u6267\u7167\u3000\u5546\u6237\u6CD5\u4EBA\u4E0E\u8EAB\u4EFD\u8BC1\u4FE1\u606F\u4E0D\u4E00\u81F4"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "descInfo" },
                                "\u3000\u5E97\u94FA\u540D\u79F0\u3000\u5305\u542B\u654F\u611F\u8BCD\u6C47"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "restApply" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "restBtn", onClick: click },
                                "\u91CD\u65B0\u7533\u8BF7"
                            )
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
            var _props = this.props,
                handleClick = _props.handleClick,
                pageStatus = _props.pageStatus;

            return _react2.default.createElement(
                "div",
                { className: "creditMoneyContainer" },
                this.rendenDom(pageStatus, handleClick)
            );
        }
    }]);
    return CreditMoney;
}(_react2.default.Component);

exports.default = CreditMoney;

/***/ }),

/***/ "4e13a9c3b1a0250c5bb1":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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lxbNOmWM13HLDQFpfoqIl+KtjsFYrDAinAVYH/e0HieG5UPRSXYzbN3usQKIWnknaqxqqFrP9DhuRnAIgZyNpB+SUhFewIP7c6yXa3u2bke74LNQMsdo6dTDDm2VI8TrfpBojcXglJgqXTsAaPokwsrnsYzizUILb8E4P/HRb2YEKCCZcTpqXwm1x0zDm972bE1HY3oKapUpePu/A4F5CqrY68JRf4DA7HR13PuApZJOWEt1vNDuJzBdeRTUJ1gfmHM7FlBBMBiCKgdTCdx6DL4iKm65IkAByRXZlHjlXpzeIx3nfuG6mIIs/hpP9amoCU71nm7XFXHPv4xhF3eNRg1hV+/p2DpEALtNWPjiQQjGAxCM9qQz97kjQAHJHdtDY9bxrXj7/9Q4agEWs4DKpS7A6oej0Nt1Bjzbsgh3/BJhjdmHxeheQy/Vq0qGMHcm9iaECm6od7jlhQAFJC+YUxOR0KXQu7UeD/t6u1AYDAxh3Gz6O1Cr8Oij9lB7lXb3uEpgNByuCA7hSI2EZ3khQAHJC+b0iXSYye/Gtz12J7QpLVxWEumh5cmV3bx5As1kCpMABaQwy425zhMBCkieQDOZwiRAASnMcmOu80SAApIn0EymMAlQQAqz3JjrPBEIvIC4mKSRJ5ZFm0ykdE9gGQdeQMp1n9aifXLzcOOOUbFlMy8I7Chm4AXk7FFDdknpJkyd8vDAFFsS8XD8/SDfc+AFZP54GVfl0c1OWAX2LddbD2hY6531s04N9AzGojA1WT3jzH34DPUbz762aWCotLyPA1vy3nqogpCujseiorV134PfPXOfxGdMg7wFSkBg9Wobi5hagc2olHuzNQmu7vDc+JcTArAj62SON1AgGu6dN5QTYnmOFKsKbkQhnW2TdY17Q9WiZlfGj4FvM+eZQ28kh2WHTofJ8ZiEsSUM8pXZ2Bv5yHaagRIQI2U9CskTEFQhU3XcTM02MMbXDYGkZFhnKfaKktBT3fgsqMuB0sWdMudWFM4bBVUCAcssphNrJdXcNTOHBWKefKAEBIXSeuLAErt6/E/xe9MWVsCev2P2djB9ZTdWdGzEXPlxa6srfnXMZpQZIwESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESCAqB/wdO6gS3gI5VaAAAAABJRU5ErkJggg=="

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

/***/ "b07cfc8aef8e41ba9552":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__("251bc7afe8127e09149d");

var _promise2 = _interopRequireDefault(_promise);

exports.createUpdata = createUpdata;

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *查询信用卡升级收款状态
 */
function createUpdata() {
    return (0, _requestAPI.getAuditInfo)().then(function (res) {
        return _promise2.default.resolve(res);
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

/***/ "e58353b62fef5ca96d4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"clearfix":"clearfix","dn":"dn","creditMoneyContainer":"creditMoneyContainer","creditMoneyStatus":"creditMoneyStatus","examineStatus":"examineStatus","infoDesc":"infoDesc","restApply":"restApply","restBtn":"restBtn"};

/***/ }),

/***/ "e7dbc63bdaae5e9f8899":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__("7474e09206d6df50164e");

var _extends3 = _interopRequireDefault(_extends2);

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

var _request = __webpack_require__("76fb50331ac78bf18670");

var _CreditMoneyActions = __webpack_require__("b07cfc8aef8e41ba9552");

var _store = __webpack_require__("729bd0f3009c1858d0f9");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__("5d4604b08304c597d074");

var _CreditMoney = __webpack_require__("3cb98d3d87ec149e9895");

var _CreditMoney2 = _interopRequireDefault(_CreditMoney);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreditMoneyContainers = function (_Component) {
    (0, _inherits3.default)(CreditMoneyContainers, _Component);

    function CreditMoneyContainers(props) {
        (0, _classCallCheck3.default)(this, CreditMoneyContainers);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CreditMoneyContainers.__proto__ || (0, _getPrototypeOf2.default)(CreditMoneyContainers)).call(this, props));

        _this.handleClick = function () {
            var _data = void 0;
            _data = JSON.parse(_this.state.failReason.data.failReason);
            var merchantName = _data.mernmVerifyFailReason.split(";")[0];

            var param = {};
            var keysList = (0, _keys2.default)(_data);
            keysList.forEach(function (key) {
                if (key == "certVerifyFailReason") {
                    param.certVerifyFailReason = true;
                } else if (key == "licVerifyFailReason") {
                    param.licVerifyFailReason = true;
                } else if (key == "shoppicVerifyFailReason") {
                    param.shoppicVerifyFailReason = true;
                } else if (key == "auxVerifyFailReason") {
                    param.auxVerifyFailReason = true;
                } else if (key == "mernmVerifyFailReason") {
                    param.mernmVerifyFailReason = true;
                }
            });

            console.log(_data);
            /*
             keysList的length详解
            * 1.商户名称审核不通过mernmVerifyFailReason+errMsg提示语
            * 2.商户名称审核不通过mernmVerifyFailReason+商户上传的图片不通过的图片错误字段+errMsg提示语
            * 3.图片审核不通过字段+errMsg提示语
            * */

            if (!!_data.mernmVerifyFailReason && keysList.length == 2) {
                _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                    mchntDetail: {
                        storeNm: merchantName
                    }
                }));
                //商户名称审核不通过
                _this.props.history.push({
                    pathname: "/upStoreInfomation",
                    search: "?isFailback=true&errMsg=" + _this.state.failReason.msg + "&hasFailPicture=false"
                });
            } else if (!!_data.mernmVerifyFailReason && keysList.length > 2) {
                _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                    mchntDetail: {
                        storeNm: merchantName
                    }
                }));
                //商户名称加商户上传的图片不通过
                _this.props.history.push({
                    pathname: "/upStoreInfomation",
                    search: "?isFailback=true&errMsg=" + _this.state.failReason.msg + "&hasFailPicture=true&failPictrueObj=" + param
                });
            } else {
                //图片审核不通过
                _this.props.history.push({
                    pathname: "/idIdentify",
                    search: "?isFailback=true&errMsg=" + _this.state.failReason.msg + "&hasFailPicture=true&failPictrueObj=" + param
                });
            }
        };

        _this.state = {
            pageStatus: null,
            failReason: {}
        };
        return _this;
    }

    (0, _createClass3.default)(CreditMoneyContainers, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            (0, _request.beforeEnterRouter)("信用卡收款");
            (0, _CreditMoneyActions.createUpdata)().then(function (res) {
                _this2.setState({
                    pageStatus: res.data.upgradeSt,
                    failReason: res
                });
            });
        }

        // certVerifyFailReason:false,//身份证审核不通过时出现
        // licVerifyFailReason:false,//营业执照审核不通过时出现
        // shoppicVerifyFailReason:false,//店铺经营照片审核不通过时出现
        // auxVerifyFailReason:false,//辅助证明材料审核不通过时出现
        // mernmVerifyFailReason:false,//商户名称审核不通过时出现


        /**
         * 重新提交信用卡升级收款 根据后台返回的错误字段 判断该路由跳转到哪个页面
         */

    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_CreditMoney2.default, (0, _extends3.default)({ handleClick: this.handleClick }, this.state));
        }
    }]);
    return CreditMoneyContainers;
}(_react.Component);

exports.default = CreditMoneyContainers;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1ncy9hcHBseUluZy1pY29uLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltZ3MvYXBwbHlGYWlsLnBuZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DcmVkaXRNb25leXMvQ3JlZGl0TW9uZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWdzL2FwcGx5U3VjY2Vzcy1pY29uLnBuZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9jYWNoZVN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NyZWRpdE1vbmV5cy9DcmVkaXRNb25leUFjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DcmVkaXRNb25leXMvQ3JlZGl0TW9uZXkuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DcmVkaXRNb25leXMvQ3JlZGl0TW9uZXlDb250YWluZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdXNlci1hZ2VudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIl0sIm5hbWVzIjpbInJlY21kUmVjb3JkIiwic2hhcmxpbmsiLCJpc0JsYWNrIiwiaXNBcHBseSIsImFwcGx5TWNjIiwiZ2V0Q2FyZGxpc3QiLCJnZXRBZGRyTGlzdCIsImFwcGx5TWF0IiwiZ2V0UXJVcmxSZXN0IiwiZ2V0TWNobnRBbmRBcmVhSW5mIiwiZ2V0TWNobnREZXRhaWwiLCJ1cGdyYWRlTWNjIiwiZ2V0UHJvdG9jb2xJbmZvIiwiZ2V0SGlzdG9yeUluY29tZSIsImdldEhpc3RvcnlUcmFucyIsImdldFRvZGF5SW5jb21lIiwiZ2V0VG9kYXlUcmFucyIsImdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0iLCJnZXRMb2dpc3RpY3NTdCIsImdldFVwZ3JhZGVTdCIsImdldExvZ2lzdGljc0xpc3QiLCJnZXRBdWRpdEluZm8iLCJnZXRMaW1pdEF0SW5mbyIsIm1jaG50T3BlciIsImRlbGV0ZUFkZHJlc3MiLCJ1cGRhdGVNY2NDYXJkIiwibmV3QWRkcmVzcyIsImVkaXRBZGRyZXNzIiwic2V0TWNjT25PZmYiLCJnZXRNY2NUcmFuc051bSIsInBob25lIiwidW5kZWZpbmVkIiwicmVjbWRNb2JpbGUiLCJVdGlsIiwiYmFzZTY0RW5jb2RlIiwiQ09ORklHIiwiUkVTVCIsInRoZW4iLCJyZXNwb25zZSIsInN0YXR1c0NvZGUiLCJTVEFUVVNDT0RFIiwiU1VDQ0VTUyIsInJvbGxLZXkiLCJDQUNIRUtFWSIsInNlY29uZEtleSIsImZ1bGwiLCJyZXNvbHZlIiwic2hhcmVMaW5rIiwicmVkVXJsU3RyIiwiZGF0YSIsImlkZW50aWZpZXIiLCJuZXh0U3RhdGUiLCJzdG9yZSIsImRpc3BhdGNoIiwidXBkYXRlIiwidXBkYXRlRnVuYyIsInJlc3AiLCJibGFja1N0IiwiY29uc29sZSIsImxvZyIsImNhY2hlUGFyYW0iLCJhcHBseVN0IiwicGFyYW0iLCJyZWZlcmVlVGVsIiwidmlydHVhbENhcmRObyIsImFjY05tIiwiY2l0eUNkIiwiY29tb21QYXJhbSIsImdldE1jY0NhcmRMaXN0IiwiY2FyZExpc3QiLCJsZW5ndGgiLCJkZWZhbHV0Q2FyZCIsImJhbmsiLCJjYXJkVHlwZSIsImZ1bmN0aW9uQml0bWFwIiwiaWNvblJlbFVybCIsImlzU3VwcG9ydCIsInBhbiIsInJhbmsiLCJzZWxlY3RlZCIsImZvckVhY2giLCJpdGVtIiwiayIsInN0b3JlU3RhdGUiLCJzdG9yZVJlY2VpdmVDYXJkT2JqIiwic3RhdGUiLCJhZGRyZXNzTGlzdCIsInJlc3VsdCIsIm1hdGVyaWFsTGlzdCIsImRlbGl2Tm0iLCJhZGRBbGwiLCJkZWxpdlBob25lIiwicHJvdmluY2VJZCIsImNpdHlJZCIsImFyZWFJZCIsImFkZHJlc3NJbmZvIiwiaWQiLCJjaXR5Tm0iLCJyZWRVcmwiLCJnZXRRclVybCIsIm1jaG50RGV0YWlsIiwicXJVcmwiLCJxck51bSIsImFyZWEiLCJtZXJjaGFudFRwIiwiYXJlYUFyciIsInByb3ZpbmNlIiwib25lIiwicHJvSWQiLCJwcm9ObSIsInR3byIsImNpdHkiLCJ0aHJlZSIsInZhbHVlIiwiY2hpbGRyZW4iLCJwdXNoIiwiYXJlYU5tIiwibWVyY2hhbnRUcEFyciIsIm1lclR5cGUxIiwibWVyY2hhbnRUcENkIiwibWVyY2hhbnRUcE5tIiwibWVyVHlwZTIiLCJtY2hudEFuZEFyZWFJbmYiLCJzdG9yZU5tIiwiU3RvcmVUcCIsInByb3ZDZCIsImNvdXR5Q2QiLCJhZGRyIiwiY2VydGlmUGljMSIsImNlcnRpZlBpYzIiLCJjZXJ0aWZQaWMzIiwibGljZW5zZVBpYyIsInNob3BQaWMxIiwic2hvcFBpYzIiLCJhdXhQcm92TWF0MSIsImF1eFByb3ZNYXQyIiwic2hvcExvZ29QaWMiLCJVcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdCIsInJlcyIsImhpc3RvcnlJbmNvbWVPYmoiLCJvcmlnaW5MaXN0RGF0YSIsImdldFN0YXRlIiwiZ2V0SW4iLCJ0b0pTIiwibmV3TGlzdCIsInRyYW5zSW5mbyIsImhpc3RvcnlPcmRlckxpc3QiLCJjb25jYXQiLCJ0b2RheUluY29tZU9iaiIsInRvZGF5T3JkZXJMaXN0IiwibmV3T2JqIiwiZGVsaXZlcnlNc2ciLCJtYXREZWxpdlN0YXR1cyIsImxpbWl0SW5mbyIsImlzVXNlTWNjIiwibWNjVHJhbnNOdW0iLCJ0cmFuc051bSIsIkNyZWRpdE1vbmV5Iiwic3RhdHVzIiwiY2xpY2siLCJyZXF1aXJlIiwicHJvcHMiLCJoYW5kbGVDbGljayIsInBhZ2VTdGF0dXMiLCJyZW5kZW5Eb20iLCJSZWFjdCIsIkNvbXBvbmVudCIsInJlcXVlc3QiLCJzZXRYaWFvV2VpUGF5Iiwid2luZG93IiwiVVAiLCJXIiwiQXBwIiwiRW52IiwicmVnUGhvbmUiLCJyZWdQYXlOdW0iLCJ2ZXJzaW9uIiwic291cmNlIiwiYmFzZVVybCIsImJhc2VVcmwyIiwiYmFzZVVybDMiLCJsb2NhdGlvbiIsImhvc3RuYW1lIiwiaW5kZXhPZiIsInByb3RvY29sIiwiZ2V0U2VydlVybCIsInVybCIsInNlcnZlclVybCIsInVzZXJJbmZvIiwic3BsaXQiLCJnZXRDaXR5IiwicmVzcG9uc2VGb3JtYXR0ZXIiLCJwYXJhbXMiLCJtc2ciLCJkZWxldGVTbGFzaCIsImhvc3QiLCJyZXBsYWNlIiwiYWRkU2xhc2giLCJwYXRoIiwidGVzdCIsInNlcGFyYXRlUGFyYW1zIiwicGFyYW1zTGluZSIsImtleSIsImNvbmZpZyIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwiZmluYWxVcmwiLCJyZWplY3QiLCJvcHRpb25zIiwidHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsIkVycm9yIiwiZGF0YVR5cGUiLCIkIiwiYWpheCIsImdldCIsInBhcmFtQWxsIiwiZm9yQ2hzcCIsImVuY3J5cHQiLCJjYWNoZSIsImJ5QWpheCIsInBvc3QiLCJwdXQiLCJkZWwiLCJnZXRTZWFyY2hQYXJhbSIsInNlYXJjaCIsInN0ciIsInNsaWNlIiwiYXJyYXkiLCJvYmoiLCJzdWMiLCJlcnIiLCJhcHAiLCJzZXRYaWFvV2VpQXVkaW8iLCJnZXRYaWFvV2VpQXVkaW8iLCJ0b2FzdCIsIm1zIiwiVG9hc3QiLCJpbmZvIiwiYmVmb3JlRW50ZXJSb3V0ZXIiLCJ0aXRsZSIsInJpZ2h0QmFyIiwicmlnaHRDYWxsYmFjayIsInJpZ2h0QmFySW1nIiwiZG9jdW1lbnQiLCJvblBsdWdpblJlYWR5Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwic2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uIiwibWNjU3RhdGVDaGFuZ2VkIiwic2VuZFFyQ29kZSIsImZhaWwiLCJzY2FuUVJDb2RlIiwiY2xvc2VXZWJWaWV3IiwidmVyaWZ5UGF5UHdkIiwiY3JlYXRlV2ViVmlldyIsImlzRmluaXNoIiwiZ2V0VXNlckRldGFpbEluZm8iLCJzYXZlUWNvZGUiLCJjYW52YXMiLCJ1aSIsIlVJIiwicGljVXJsIiwidG9EYXRhVVJMIiwibG9nRXZlbnQiLCJzYXZlUGljVG9Mb2NhbCIsInN1YnN0ciIsInNob3dUb2FzdFdpdGhQaWMiLCJzaG93QWxlcnQiLCJlbnYiLCJpc0lPUyIsIm9wZW5Ccm93c2VyIiwic2hvd1RvYXN0Iiwic2hhcmUiLCJkZXNjIiwiaW1nVVJMIiwicGFnZVVSbCIsInNob3dTaGFyZVBhbmVsIiwic2hhcmVVcmwiLCJnZXRDdXJyZW50TG9jYXRpb25JbmZvIiwiY2FsbGJhY2syIiwic2hvd0xvYWRpbmciLCJjYWxsYmFjayIsImRpc21pc3MiLCJzZW5kTWVzc2FnZSIsImNtZCIsImZldGNoTmF0aXZlRGF0YSIsInhociIsImNyZWF0ZVRleHRDYW52YXNlIiwidGV4dCIsImNvbG9yIiwibG9uZyIsInNob3QiLCJyZW0ycHgiLCJ2YWwiLCJjV2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsInNldEF0dHJpYnV0ZSIsIndpZHRoIiwicm90YXRlIiwiTWF0aCIsIlBJIiwiZmlsbFN0eWxlIiwidGV4dEFsaWduIiwiZm9udFNpemUiLCJmb250IiwibWVhc3VyZVRleHQiLCJmaWxsVGV4dCIsImNyZWF0ZUNvbnZhc0FuZFNhdmVQaG90byIsImNhbnZhc09iaiIsImJndXJsIiwicXJjb2RlVVJMIiwicXJjb2RlV2RBbmRIZyIsInhXaWR0aCIsInlIZWlnaHQiLCJ0ZXh0YmdVUkwiLCJ4VGV4dFdpZHRoIiwieVRleHRIZWlnaHQiLCJpbWciLCJJbWFnZSIsInNyYyIsIm9ubG9hZCIsImhlaWdodCIsImRyYXdJbWFnZSIsInRleHRVcmkiLCJ0ZXh0SW1nIiwicXJjb2RlV2lkdGhBbmRIZWlnaHQiLCJpbm5lckhUTUwiLCJxcmNvZGUiLCJRUkNvZGUiLCJjb3JyZWN0TGV2ZWwiLCJDb3JyZWN0TGV2ZWwiLCJMIiwicXJjb2RlSW1nIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJxcmNvZGVEeCIsInFyY29kZUR5IiwiZ2V0TWF0ZXJpZWxJbmZvTGlzdCIsImdldFJld2FyZExpc3QiLCJDT05TVF9EQVRBIiwiaW1nZVNpemUiLCJjYWNoZUZpcnN0IiwidGltZSIsInN0b3JhZ2UiLCJ2YWxpZGF0ZVRpbWUiLCJjYWNoZUZpcnN0U3RvcmFnZSIsIm5lZWRTdyIsInN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSIsInJlZnJlc2hEb21GdW5jIiwicmVxIiwiZGF0YUZyb21DYWNoZSIsImdldEZyb21TdG9yYWdlIiwicmVtb3ZlU3RvcmFnZSIsImlzU2FtZUF0QWxsIiwiSW1tdXRhYmxlIiwiaXMiLCJmcm9tSlMiLCJhc3luYyIsImVuZE9mU3luY0Z1bmMiLCJyZW1vdmVDYWNoZSIsImNyZWF0ZVVwZGF0YSIsIkNyZWRpdE1vbmV5Q29udGFpbmVycyIsIl9kYXRhIiwiSlNPTiIsInBhcnNlIiwiZmFpbFJlYXNvbiIsIm1lcmNoYW50TmFtZSIsIm1lcm5tVmVyaWZ5RmFpbFJlYXNvbiIsImtleXNMaXN0IiwiY2VydFZlcmlmeUZhaWxSZWFzb24iLCJsaWNWZXJpZnlGYWlsUmVhc29uIiwic2hvcHBpY1ZlcmlmeUZhaWxSZWFzb24iLCJhdXhWZXJpZnlGYWlsUmVhc29uIiwiaGlzdG9yeSIsInBhdGhuYW1lIiwic2V0U3RhdGUiLCJ1cGdyYWRlU3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBV2dCQSxXLEdBQUFBLFc7UUF5QkFDLFEsR0FBQUEsUTtRQWlCQUMsTyxHQUFBQSxPO1FBdUJBQyxPLEdBQUFBLE87UUFvQkFDLFEsR0FBQUEsUTtRQTBCQUMsVyxHQUFBQSxXO1FBZ0RBQyxXLEdBQUFBLFc7UUFnQ0FDLFEsR0FBQUEsUTtRQW9CQUMsWSxHQUFBQSxZO1FBbUJBQyxrQixHQUFBQSxrQjtRQW1IQUMsYyxHQUFBQSxjO1FBZ0JBQyxVLEdBQUFBLFU7UUFnQ0FDLGUsR0FBQUEsZTtRQWVBQyxnQixHQUFBQSxnQjtRQWVBQyxlLEdBQUFBLGU7UUFpQkFDLGMsR0FBQUEsYztRQWVBQyxhLEdBQUFBLGE7UUFnQkFDLHlCLEdBQUFBLHlCO1FBTUFDLGMsR0FBQUEsYztRQXVCQUMsWSxHQUFBQSxZO1FBV0FDLGdCLEdBQUFBLGdCO1FBWUFDLFksR0FBQUEsWTtRQVlBQyxjLEdBQUFBLGM7UUFhQUMsUyxHQUFBQSxTO1FBWUFDLGEsR0FBQUEsYTtRQWdCQUMsYSxHQUFBQSxhO1FBZUFDLFUsR0FBQUEsVTtRQWFBQyxXLEdBQUFBLFc7UUFlQUMsVyxHQUFB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QTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLHdCQUF3QjtBQUN4QixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLHdCQUF3QjtBQUN4QixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCO0FBQ0EsdUJBQXVCLG1CQUFPLENBQUMsc0JBQWlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwREFBMEQsb0JBQW9CO0FBQzlFLG1CQUFPLENBQUMsc0JBQXNCO0FBQzlCLG1CQUFPLENBQUMsc0JBQWdCO0FBQ3hCLFVBQVUsbUJBQU8sQ0FBQyxzQkFBUzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsZ0RBQWdELG1CQUFPLENBQUMsc0JBQWdCO0FBQ3hFO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJjaHVuay9DcmVkaXRNb25leXMuYzZkOWJiMDUzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y29tb21QYXJhbSwgZ2V0LCBwb3N0LCBVdGlsfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7fSBmcm9tIFwiLi9jYWNoZVN0b3JhZ2VcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gXCIuLi8uLi9zdG9yZS9zdG9yZVwiO1xyXG5pbXBvcnQge1VQREFURV9TVE9SRV9TVEFURX0gZnJvbSBcIi4uLy4uL3N0b3JlL2FjdGlvblwiO1xyXG5pbXBvcnQge2NhY2hlRmlyc3QsY2FjaGVGaXJzdFN0b3JhZ2Usc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlLHJlbW92ZUNhY2hlfSBmcm9tIFwiLi9jYWNoZVN0b3JhZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiDnlLPor7fnuqLljIXnoIHnmoTor7fmsYJcclxuICogQHBhcmFtIHBob25lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVjbWRSZWNvcmQocGhvbmUpIHtcclxuICAgIGlmIChwaG9uZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBwaG9uZSA9IFwiXCJcclxuICAgIH1cclxuICAgIGxldCByZWNtZE1vYmlsZSA9IFV0aWwuYmFzZTY0RW5jb2RlKHBob25lKVxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QucmVjbWRSZWNvcmQsIHtyZWNtZE1vYmlsZX0pLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpueUs+ivt+e6ouWMheeggeaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXlcclxuICAgICAgICAgICAgfSwoKT0+e30sKCk9PntcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDor7fmsYLnuqLljIXlkJfov57mjqVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFybGluaygpIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnNoYXJlTGluaywge30pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICBsZXQgcmVkVXJsU3RyPSBcImh0dHBzOi8vd2FsbGV0Ljk1NTE2LmNvbS9zL3dsL3dlYlYzL2FjdGl2aXR5L3ZNYXJrZXRpbmcyL2h0bWwvc25zSW5kZXguaHRtbD9yPVwiICsgcmVzcG9uc2UuZGF0YS5pZGVudGlmaWVyO1xyXG4gICAgICAgICAgICBsZXQgbmV4dFN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgcmVkVXJsU3RyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKG5leHRTdGF0ZSkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVkVXJsU3RyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOaYr+WQpuWcqOeZveWQjeWNleeahOivt+axglxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQmxhY2sodXBkYXRlKSB7XHJcbiAgICBsZXQgdXBkYXRlRnVuYyA9IGZ1bmN0aW9uKHJlc3Ape1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGJsYWNrU3Q6cmVzcC5kYXRhLmJsYWNrU3RcclxuICAgICAgICB9KSlcclxuICAgICAgICBjb25zb2xlLmxvZygnaXNCbGFjazogdXBkYXRl5Ye95pWw5omn6KGM5a6M5q+VJyk7XHJcbiAgICAgICAgaWYoIHR5cGVvZiB1cGRhdGUgPT09ICdmdW5jdGlvbicgKXtcclxuICAgICAgICAgICAgdXBkYXRlKHJlc3ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v6K+75Y+W57yT5a2Y77yM5ZCM5pe25byC5q2l5Y+R6YCB6K+35rGCXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5pc0JsYWNrLHt9LHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSh1cGRhdGVGdW5jKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYmxhY2tTdDpyZXNwb25zZS5kYXRhLmJsYWNrU3RcclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKblnKjpu5HlkI3ljZXnmoTor7fmsYJcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNBcHBseSgpIHtcclxuICAgIGxldCBjYWNoZVBhcmFtID0gY2FjaGVGaXJzdFN0b3JhZ2UoMzAqNjAqMTAwMCxDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXkpOy8v57yT5a2YMzDliIbpkp9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuaXNBcHBseSwge30sY2FjaGVQYXJhbSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5hcHBseVN0ICE9IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDlpoLmnpzlt7Lnu4/nlLPor7fov4fnuqLljIXnoIHliJnnvJPlrZgzMOWIhumSn++8jOWQpuWImeS4jee8k+WtmFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5KVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBhcHBseVN0OnJlc3BvbnNlLmRhdGEuYXBwbHlTdFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOeUs+ivt+aUtuasvueggVxyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNY2MocGFyYW0gPSB7XHJcbiAgICByZWZlcmVlVGVsOiBcIlwiLCAgICAgICAgIC8v5o6o6I2Q5Lq65omL5py65Y+3XHJcbiAgICB2aXJ0dWFsQ2FyZE5vOiBcIlwiLCAgICAgIC8v6Jma5ouf5Y2h5Y+3XHJcbiAgICBhY2NObTogXCJcIiwgICAgICAgICAgICAgIC8v5bqX6ZO65ZCN56ewXHJcbiAgICBjaXR5Q2Q6IFwiXCIgICAgICAgICAgICAgICAvL+WfjuW4guS7o+eggVxyXG59KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5hcHBseU1jYywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpueUs+ivt+e6ouWMheeggeaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXlcclxuICAgICAgICAgICAgfSwoKT0+e30sKCk9PntcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTpk7booYzljaHliJfooahcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDYXJkbGlzdCgpIHtcclxuICAgIC8v6I635Y+W55So5oi36ZO26KGM5Y2h5YiX6KGo77yM57yT5a2YMeWIhumSn1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRNY2NDYXJkTGlzdCwgY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSg2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAvL+WmguaenOWQjuWPsOi/lOWbnumTtuihjOWNoeWIl+ihqOS4lOS4jeS4uuepulxyXG4gICAgICAgIGlmICghIXJlc3BvbnNlLmRhdGEuY2FyZExpc3QgJiYgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5sZW5ndGggIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgLy/liJ3lp4vljJbpu5jorqTljaFcclxuICAgICAgICAgICAgbGV0IGRlZmFsdXRDYXJkID0ge1xyXG4gICAgICAgICAgICAgICAgYmFuazogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeaJgOWcqOeahOmTtuihjFxyXG4gICAgICAgICAgICAgICAgY2FyZFR5cGU6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h57G75Z6LXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbkJpdG1hcDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHlip/og73kvY1cclxuICAgICAgICAgICAgICAgIGljb25SZWxVcmw6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeeahGxvZ2/lnLDlnYBcclxuICAgICAgICAgICAgICAgIGlzU3VwcG9ydDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5pSv5oyBXHJcbiAgICAgICAgICAgICAgICBwYW46IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W4puacieaOqeeggeeahOWNoeWPt1xyXG4gICAgICAgICAgICAgICAgcmFuazogMCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm6YCJ5LitXHJcbiAgICAgICAgICAgICAgICB2aXJ0dWFsQ2FyZE5vOiBcIlwiICAgLy/omZrmi5/ljaHlj7dcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuY2FyZExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhaXRlbS5zZWxlY3RlZCAmJiBpdGVtLmlzU3VwcG9ydCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYWx1dENhcmQgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL+WmguaenOayoeaciem7mOiupOmAieS4reeahOWNoeWPluS4gOS4quS4jeiiq+e9ruS4uueBsOeahOWNoeS4uum7mOiupOWNoVxyXG4gICAgICAgICAgICBpZiAoZGVmYWx1dENhcmQuYmFuay5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZXNwb25zZS5kYXRhLmNhcmRMaXN0Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuY2FyZExpc3Rba10uaXNTdXBwb3J0ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYWx1dENhcmQgPSByZXNwb25zZS5kYXRhLmNhcmRMaXN0W2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0b3JlU3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yZVJlY2VpdmVDYXJkT2JqOiBkZWZhbHV0Q2FyZCxcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0OiByZXNwb25zZS5kYXRhLmNhcmRMaXN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHN0b3JlU3RhdGUpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWcsOWdgOWIl+ihqFxyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWRkckxpc3QoXHJcbiAgICB1cGRhdGUsIC8v57yT5a2Y55qE5pu05paw5Ye95pWwXHJcbiAgICBwYXJhbSA9IHtcclxuICAgICAgICBzdGF0ZTogXCJcIiAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuKSB7XHJcbiAgICAvLyDor7vlj5bnvJPlrZjvvIzlkIzml7blvILmraXlj5HpgIHor7fmsYJcclxuICAgIGxldCB1cGRhdGVGdW5jID0gZnVuY3Rpb24ocmVzcCl7XHJcbiAgICAgICAgLy8g5ZyodXBkYXRl5Ye95pWw5Lit77yM5pu05pawcmVkdXjkuK3nmoRhZGRyZXNzTGlzdFxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7YWRkcmVzc0xpc3Q6cmVzcC5kYXRhLnJlc3VsdHx8W119KSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEFkZHJMaXN0OiB1cGRhdGXlh73mlbDmiafooYzlrozmr5UnKTtcclxuICAgICAgICBpZiggdHlwZW9mIHVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXNwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSh1cGRhdGVGdW5jLENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpO1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0QWRkckxpc3QsIE9iamVjdC5hc3NpZ24oe30sIGNvbW9tUGFyYW0sIHBhcmFtKSxjYWNoZVBhcmFtKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgYWRkcmVzc0xpc3QgPSByZXNwb25zZS5kYXRhLnJlc3VsdCB8fCBbXTtcclxuXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYWRkcmVzc0xpc3RcclxuICAgICAgICB9KSlcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnlLPor7fnianmlpnmjqXlj6NcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWF0KHBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+eJqeaWmeWIl+ihqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2Tm06IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+S6ulxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEFsbDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWMuuWQjeensFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2UGhvbmU6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+eUteivnVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ecgUlEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5biCSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDljLpJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3NJbmZvOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ivpue7huWcsOWdgFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnJywgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWdgOeahElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eU5tOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5omA5Zyo5Z+O5biCQ2l0eUNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRVcmw6IFwiXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nuqLljIXnoIHlnLDlnYAgIOWPr+mAieWPguaVsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuYXBwbHlNYXQsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5ZWG5oi35pS25qy+56CB5Zyw5Z2A5ZKM5ZWG5oi357yW5Y+3XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXJVcmxSZXN0KCkge1xyXG4gICAgLy/nvJPlrZgy5bCP5pe2XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFFyVXJsLCBjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBtY2hudERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgcXJVcmw6IHJlc3BvbnNlLmRhdGEucXJVcmwsXHJcbiAgICAgICAgICAgICAgICBxck51bTogcmVzcG9uc2UuZGF0YS5xck51bVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKuiOt+WPluW6l+mTuuWMuuWfn+WIl+ihqOWSjOW6l+mTuuexu+Wei+WIl+ihqFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNobnRBbmRBcmVhSW5mKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+Z5Liq5o6l5Y+jLOWPqui1sHN377yM5LiN6LWwbG9hY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICAvLyBsZXQgY2FjaGVQYXJhbSA9IHtcclxuICAgIC8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4gICAgLy8gICAgIGZvckNoc3A6ZmFsc2UsXHJcbiAgICAvLyAgICAgZW5jcnlwdDpmYWxzZSxcclxuICAgIC8vICAgICBjYWNoZTogdHJ1ZVxyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRNY2hudEFuZEFyZWFJbmYsIGNvbW9tUGFyYW0sIGNhY2hlRmlyc3QoMjQqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgbGV0IGFyZWEgPSBbXSwgbWVyY2hhbnRUcCA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOecgee6p1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5hcmVhQXJyLmZvckVhY2goKHByb3ZpbmNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9uZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHByb3ZpbmNlLnByb0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogcHJvdmluY2UucHJvTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHByb3ZpbmNlLnByb05tID09IFwi5YyX5Lqs5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLkuIrmtbfluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIuWkqea0peW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi6YeN5bqG5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLmt7HlnLPluIJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogcHJvdmluY2UucHJvSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogcHJvdmluY2UucHJvTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlLmNpdHkuZm9yRWFjaCgoY2l0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhyZWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGNpdHkuY2l0eUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBjaXR5LmNpdHlObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhyZWUudmFsdWUgIT0gdHdvLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d28uY2hpbGRyZW4ucHVzaCh0aHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgKiDluILnuqdcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBwcm92aW5jZS5jaXR5LmZvckVhY2goKGNpdHkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGNpdHkuY2l0eUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBjaXR5LmNpdHlObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIOWMuue6p1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5hcmVhLmZvckVhY2goKGFyZWEpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhyZWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBhcmVhLmFyZWFJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IGFyZWEuYXJlYU5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d28uY2hpbGRyZW4ucHVzaCh0aHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYXJlYS5wdXNoKG9uZSk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLm1lcmNoYW50VHBBcnIuZm9yRWFjaCgobWVyVHlwZTEpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvbmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtZXJUeXBlMS5tZXJjaGFudFRwQ2QsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBtZXJUeXBlMS5tZXJjaGFudFRwTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1lclR5cGUxLm1lcmNoYW50VHBBcnIuZm9yRWFjaCgobWVyVHlwZTIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IG1lclR5cGUyLm1lcmNoYW50VHBDZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBtZXJUeXBlMi5tZXJjaGFudFRwTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIG1lcmNoYW50VHAucHVzaChvbmUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV4dFN0YXRlID0ge1xyXG4gICAgICAgICAgICBtY2hudEFuZEFyZWFJbmY6IHtcclxuICAgICAgICAgICAgICAgIGFyZWFBcnI6IGFyZWEsXHJcbiAgICAgICAgICAgICAgICBtZXJjaGFudFRwQXJyOiBtZXJjaGFudFRwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKG5leHRTdGF0ZSkpXHJcblxyXG4gICAgfSlcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5blupfpk7ror6bmg4Xkv6Hmga9cclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNobnREZXRhaWwoKSB7XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IGNhY2hlRmlyc3RTdG9yYWdlKDYwKjEwMDAsQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7Ly/nvJPlrZgx5YiG6ZKfXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRNY2hudERldGFpbCwgY29tb21QYXJhbSxjYWNoZVBhcmFtKS50aGVuKChyZXNwKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3Auc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgbGV0IG1jaG50RGV0YWlsID0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe21jaG50RGV0YWlsfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1jaG50RGV0YWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5Y2H57qn5ZWG6ZO65LqM57u056CBXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGdyYWRlTWNjKHBhcmFtPXtcclxuICAgIHN0b3JlTm06IFwiXCIsICAgIC8v5bqX6ZO65ZCN56ewXHJcbiAgICBTdG9yZVRwOiBcIlwiLCAgICAvL+W6l+mTuuexu+Wei1xyXG4gICAgcHJvdkNkOiBcIlwiLCAgICAgLy/nnIFJRFxyXG4gICAgY2l0eUNkOiBcIlwiLCAgICAgLy/luIJJRFxyXG4gICAgY291dHlDZDogXCJcIiwgICAgLy/ljLpJRFxyXG4gICAgYWRkcjogXCJcIiwgICAgICAgLy/lnLDlnYBcclxuICAgIGNlcnRpZlBpYzE6IFwiXCIsIC8v6Lqr5Lu96K+B5q2j6Z2i54WnXHJcbiAgICBjZXJ0aWZQaWMyOiBcIlwiLCAvL+i6q+S7veivgeWPjemdoueFp1xyXG4gICAgY2VydGlmUGljMzogXCJcIiwgLy/miYvmjIHouqvku73or4HnhafniYdcclxuICAgIGxpY2Vuc2VQaWM6IFwiXCIsIC8v6JCl5Lia5omn54WnXHJcbiAgICBzaG9wUGljMTogXCJcIiwgICAvL+W6l+mTuueFp+eJhzFcclxuICAgIHNob3BQaWMyOiBcIlwiLCAgIC8v5bqX6ZO654Wn54mHMlxyXG4gICAgYXV4UHJvdk1hdDE6IFwiXCIsLy/ovoXliqnnhafniYcxXHJcbiAgICBhdXhQcm92TWF0MjogXCJcIiwvL+i+heWKqeeFp+eJhzJcclxuICAgIHNob3BMb2dvUGljOiBcIlwiIC8v5bqX6ZO6TE9HT1xyXG59KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC51cGdyYWRlTWNjLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk5bqX6ZO66K+m5oOF55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpO1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpuWNh+e6p+eahOaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Qucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0LnNlY29uZEtleSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTljY/orq7nvJblj7flkozljY/orq7lkI3np7BcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvdG9jb2xJbmZvKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiDov5nkuKrmjqXlj6Ms57yT5a2YMuWwj+aXtlxyXG4gICAgICovXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFByb3RvY29sSW5mbywgY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZS5kYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDljoblj7LmlLbmrL5cclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlzdG9yeUluY29tZShwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0SGlzdG9yeUluY29tZSwgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeUluY29tZU9iajogcmVzLmRhdGFcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5Y6G5Y+y6K6i5Y2VXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpc3RvcnlUcmFucyhwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0SGlzdG9yeVRyYW5zLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBsZXQgb3JpZ2luTGlzdERhdGEgPSBzdG9yZS5nZXRTdGF0ZSgpLmdldEluKFsnaGlzdG9yeU9yZGVyTGlzdCddKS50b0pTKClcclxuICAgICAgICAgICAgbGV0IG5ld0xpc3QgPSByZXMuZGF0YS50cmFuc0luZm87XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0xpc3QpXHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5T3JkZXJMaXN0OiBvcmlnaW5MaXN0RGF0YS5jb25jYXQobmV3TGlzdClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5LuK5pel5pS25qy+XHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5SW5jb21lKCkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VG9kYXlJbmNvbWUsY29tb21QYXJhbSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgdG9kYXlJbmNvbWVPYmo6IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDku4rml6XorqLljZVcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9kYXlUcmFucyhwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VG9kYXlUcmFucywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgbGV0IG9yaWdpbkxpc3REYXRhID0gc3RvcmUuZ2V0U3RhdGUoKS5nZXRJbihbJ3RvZGF5T3JkZXJMaXN0J10pLnRvSlMoKVxyXG4gICAgICAgICAgICBsZXQgbmV3TGlzdCA9IHJlcy5kYXRhLnRyYW5zSW5mbztcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIHRvZGF5T3JkZXJMaXN0OiBvcmlnaW5MaXN0RGF0YS5jb25jYXQobmV3TGlzdClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5Y2V56yU5p+l6K+iXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0ocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0sT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSlcclxufVxyXG4vKipcclxuICog6I635Y+W54mp5rWB5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naXN0aWNzU3QocGFyYW0pe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRMb2dpc3RpY3NTdCwgT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICBsZXQgbmV3T2JqID0gcmVzLmRhdGEuZGVsaXZlcnlNc2c7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBuZXdPYmoubWF0RGVsaXZTdGF0dXMg55qE54q25oCB5ZKMcmVkdXjnmoRzdG9yZeS/neaMgeS4gOiHtFxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIG5ld09iai5tYXREZWxpdlN0YXR1cyA9IHJlcy5kYXRhLm1hdERlbGl2U3RhdHVzO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgZGVsaXZlcnlNc2c6IG5ld09ialxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDllYbmiLfmnI3liqHpppbpobUg54K55Ye75L+h55So5Y2h5oyJ6ZKu5p+l6K+i5ZWG5oi35piv5ZCm5byA6YCa6L+H5L+h55So5Y2h5pS25qy+XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXBncmFkZVN0KCl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFVwZ3JhZGVTdCwgY29tb21QYXJhbSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnianmlpnljoblj7LorqLljZVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpc3RpY3NMaXN0KHBhcmFtKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TG9naXN0aWNzTGlzdCxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5p+l6K+i5L+h55So5Y2h5pS25qy+5Y2H57qn54q25oCBXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXVkaXRJbmZvKCl7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRBdWRpdEluZm8sIGNvbW9tUGFyYW0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bmlLbmrL7pmZDpop3or6bmg4VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW1pdEF0SW5mbygpe1xyXG4gICAgLy/nvJPlrZgy5Liq5bCP5pe2XHJcbiAgICBwb3N0KENPTkZJRy5SRVNULmdldExpbWl0QXRJbmZvLGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcCk9PntcclxuICAgICAgICBpZiggcmVzcC5zdGF0dXNDb2RlID0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyApe1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe2xpbWl0SW5mbzpyZXNwLmRhdGF9KSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5pu05paw5bqX6ZO66K+m5oOFXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g5bqX6ZO66K+m5oOF5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWNobnRPcGVyKHBhcmFtID17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBncmFkZU1jYyAsIE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpG1jaG50RGV0YWls57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7IFxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKDpmaTlnLDlnYDkv6Hmga9cclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVBZGRyZXNzKHBhcmFtPXtcclxuICAgIGlkOicnIC8v5Zyw5Z2AaWRcclxufSl7XHJcbiAgICBcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmRlbGV0ZUFkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBhcmFtKTtcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5pu05paw5pS25qy+6ZO26KGM5Y2hXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWNjQ2FyZChwYXJhbT17XHJcbiAgICB2aXJ0dWFsQ2FyZE5vOicnIC8v6Jma5ouf5Y2h5Y+3XHJcbn0pIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBkYXRlTWNjQ2FyZCxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/mjaLljaHlkI7vvIzmuIXpmaTlupfpk7ror6bmg4XnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7IFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmlrDlop7lnLDlnYBcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor6bnu4bnmoTlnLDlnYDkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdBZGRyZXNzKHBhcmFtPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5uZXdBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1Mpe1xyXG4gICAgICAgICAgICAvLyDliKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOS/ruaUueWcsOWdgOS/oeaBr1xyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivpue7hueahOWcsOWdgOS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRBZGRyZXNzKHBhcmFtPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5lZGl0QWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgLy/liKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDlkK/lgZzmlLbmrL7noIHmnI3liqFcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNY2NPbk9mZihwYXJhbT17XHJcbiAgICBpc1VzZU1jYzonJyAgLy/mmK/lkKbkvb/nlKjmlLbmrL7noIHmnI3liqFcclxuIH0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnNldE1jY09uT2ZmLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpOW6l+mTuuivpuaDhee8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOyBcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDojrflj5blkIrotbfmlK/ku5jmjqfku7bnmoRUTuWPt1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jY1RyYW5zTnVtKCl7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRNY2NUcmFuc051bSkudGhlbigocmVzcCk9PntcclxuICAgICAgICBpZiggcmVzcC5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MgKXtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7bWNjVHJhbnNOdW06cmVzcC5kYXRhLnRyYW5zTnVtfSlcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJLmpzIiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgc2FmZSkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgaWYgKHNhZmUgJiYgdGFyZ2V0W2tleV0pIHRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNGRjMWY3ZWJkODBkMTViZmQzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjc5ODUxYmUyN2IyNjhlYTI0ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFkZmFjMjg1MjNhZTM3ZGFjNWJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjUxYmM3YWZlODEyN2UwOTE0OWRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDI4Y2ZmODZlMWQ1MWViZjIxZjdmXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQU1nQUFBRElDQVlBQUFDdFdLNmVBQUFBQVhOU1IwSUFyczRjNlFBQUhkSkpSRUZVZUFIdG5RdDhGTlc5eDgrWjJXeGVJQThGSVNUQkYyaXRTTUdpVk92cnR0SlBFd0tveFd0cnBhVytyZ3FCMjk3YjNuNzgzSko3YmJXMXRSY0NxUFFodHJXMGxZcENnTGJhQ3I0Uk5WR28xb29LWkpjOFFONTViWGJublBzN3N6dXptNUFuMmV5Y1RmN3p5V2JPekp3NWorK1ovM21mLzJHTURpSkFCSWdBRVNBQ1JJQUlFQUVpUUFTSUFCRWdBa1NBQ0JBQklrQUVpQUFSSUFKRWdBZ1FBU0pBQklnQUVTQUNSSUFJRUFFaVFBU0lBQkVnQWtTQUNCQUJJa0FFaUFBUklBSkVnQWdRQVNKQUJJZ0FFU0FDUklBSUVBRWlRQVNJQUJFZ0FrU0FDQkFCSWtBRWlBQVJJQUpFZ0FnUUFTSkFCSWdBRVNBQ1JJQUlFQUVpUUFTSUFCRWdBa1NBQ0JBQklrQUVpQUFSSUFKRWdBZ1FBU0pBQklnQUVTQUNSSUFJRUFFaVFBU0lBQkVnQWtSZ0lCRGdPa1NpZUduZ0ZzbllFc05rOHpZdUxOaXFRNWdvREVSQUVUQTB3WEFiWTdKQVd1d3Jtb1NIZ2tFRWJBSmFDSWprTVVIbHpLUjBJUUk2RWZDc2lsVzhMSGk3bE9JMkJNQmduSjhucGN6aG5COWtVdTVGZGFzWmt2THZGWXNMWDljSkZvVmw4Qkh3ZVJkbGVRLzhMb1F3b0habC84ZEpub29yOVdPU0diTndJZ0ZSTU9qd2pJQm5BbUl3OHlhTFd6ZENGRkJZOE9zaEhhTlFncndubWR4cVNPUGpEQjliNmhrVjhwZ0l4QWg0VnNWS1RJR2laWUh0RUpCcEVKQkhOeTBxdUNYeEdabUpnSmNFdEdpa0EwQ1Rnc0FsYS9BU0J2bE5CTm9UMEVKQVRNNldJR0IvNE54OHNIMEE2Wm9JRUFFaVFBU0lBQkVnQWtTQUNCQ0JBVVZBaTE0c0w0bGV1eUk0TVdUSkplZ2d1Rmh5bWU5bFdIVDJtek11RUw1ZDRQUzg5QTh0MjNUWDhNTTZoemRaWVJ2VUFsS3lORGhUTVBrRXhsNnlrd1Ywa0xoVGEzQis1Y1pGQmJzR2VueTE2TVh5QW5MSnFwclRMQzRmSmVFNEtmcGpNZmZoTWN4OEdQQVpyR2NqNlNlVkxOMjhOSGZWb1dITjRhYnpOeTdJZjdVYnEweUdSSkVhdlkvYjQ4OGh0VitLWDVPcERRRXVUUWpGdFpnRGRMNjZEK0c0ZFBiRE5STmgvR2NiZXdQc0ltMEZaRzU1N2FnV0pxZFkwcHFLZXZGVXBNdVV4cGJHczFYNlFGQkdyTDFqNU5HdTBrb0tNY1Y1emprN25ETTIvNHRyYitDdHpqMDZuMGlnZUZuMTd5RWtPNTBuVnRoU0RFbEFIQ0JlbmE4ckQrYTNNajVGU0FGaGtGTWw1MU1iUmRodFVDUFJva2ZNME56YXFCSnVhK3h1SnllZXE2WkV4bzRqSkJ3T2lzN1BPVHlqdmxHRzR4YWtZaml3RDYxS0VGV252WGI1L3JQQ0lnd2hFRk80NURpenFTMUN1RlVoKzVPT3pmN3ROR2tFVnlYSzFrNmYwd01pMEVNQ25ndkl6UExBeFV5d0wrSERuMVpjSHBpQ1RIMllIWGJjUUFNNklaUHZNa1o3MEExWmlYVWxsWVloSzMyY2JlL1NkamNQdjc1NmQ5YWhadjk0Rm1FNTBnZ1ArSVpvUnppNHlKRE14NXBHWnJmdWZXeittUzBkMlJrTTl6d1ZFTXppWFNxRVhPU0N0b3NIOStvRWc5MFh6OW43a0pzcXpHeUVNQmlWd2h4U2xldysrWU1ObVdjSUVZNVdINnhCS1I5Z0grRXN6SVljdERMUHdNVjdKeVRHSUxuaG1ZQVVsUWYra3lVS1IzdmdTQjRJeExzU0pRTm5zc3FFTUF3YlpyNzFtM2xqR3R0YlRmYTFLeHpKZGpnTjNSdnNMRHdSa0xrcjl3OXBDb2YreHkwd09QcWhHSHNEOWFrM01RQlZhWEN6YXJ3Y3UzTjVLUStsNFRkRlFSNUFCRHdSa0paSWFGYWJBVG91YjlwY1d2aTdBY1NWb3RKREFuTWVyajJqTlJSNXplRHNRWXpNUDlERDExSm16Wk9SZENIWnVXNE1PVHUyYVdIQjc5MXJNZ3dxQXBHd21JU2F3MmhVSWE3UU1lS2VDSWcwRWp2VHNaSXdXc1hTa1ErRmFaQVQ4RVJBRE1uaU0wRWxPMlhtdzRGeGd6d2RLUHFhRXZDa0RXSVk1bHZDc3VKSXdvWWEyTnNYdjZHenliZ1U3YWQ3ME5WOHVzNmg3SEhZT0t0SGIrRVBHQk92OVBpZFFXVFJreElrMDhoNDJ4N1RpSUZXVTBqU2hmbUFFZzRGSFlKdXg4bWpCUENqQ3g5VjdGMzRFTmQ0RklRdXZmV2tCRmw3OStpR29xVUJ0WmJBYnF4am5NT2RPTmhsYUhWNE9GQktqa1NXS2s3OVBCNWFVaDZjYmtsMnU4RmsvSnVUZks4NVp0eTltMjdnRTFWd1ppNExmaE1TK3lrbmFBSnpqM3pNZkh6RDRuSFBPdmRTZlk0SE5zVStJejBxMFhOaEN3aW1ZS1ZOQ1pLSWFmUGl3bjcrckJKOVM3NjVhR20xT3hTVmZOZmJ1cWlFZzBreFh5MUxqQitTaGVwcTF1RzZhdTRUMHQ5WUc3Z1BKVnBtL0RsakZoTVg0dHF6RE5RekFWRlRSUURqeTFFWXNrQXRZS3E0SSsvalJEaGtIamdFekN6ajIxWklQTXVrNFg1elBzbnJNc2ZrN1NoWkdyamVxdHYzR21lK3l6QkoxVjV2b21LT21kc3l3L0MvNmlVRk43Q3BEZ1FVdWxkSnpGSjBqNUM5cHVNWjk1b01BNHBBTFBQN1hmdElGYTJvVnVNZmYwUUpzMmJ6b3J5YllINnp2UjB2cnoxcHBLc0laK2ZLcXNTSUMyWXZ2a204UmVaQlFNQVFwajE3RzNWVis2eGJsRDBUa0xXM0Zod0NqRDB1RUN5RWNzMWtJQUthRVBCTVFGVDgwZFZiNlhKSTA0YTZHMzR5REVnQ25nb0lwcHk0MVN5c0hEejdwdktEcHd4SXloU3B6Z2xJYVNzdVIzZmEwYzR0ZWZmRVV3RXhaR0lKSXZsaG85SHRBL2NPQ2ZtY1NnSjVXZU5ld0JLSHhTWXp2NXRLZjN2cWwyZTlXQ3FBL3F5c3FwYm1aamVzWE5oVFRsNXdiNUJod0JQNDJSMDhqRWd1MHpXaW5wWWc2KzRZVlFzdzZtY2ZTbU9KWTZZekVkQ0JnS2NDb2dCZ0hrNjhIVUlDb3NNM1FXRklJT0M5Z0NTMlE3RGI3ZHduQXFRbk55R0J5T2d0QVUvYklIYlVvMU5PYkNObUZwaU4rN21hZS9PYXQxaDY1bnNxNXpMMUxFUmtLOWtFUEM5QmhHbkd4MElRT3g1VitwYnNlQ2JQUGF5ZlNKNWptcmcwRU9PVUpMU2VDOGptQlhsN0lSYUhuUGlnRk5HNm9XNHZMaHBJSDVTN1lNcEpBVG9uRXZDK2lvWFFRSGwwRmJTSmZrNEZUUCsxSWVJVnpCc3E3dS8xRTRtSjFQL21sTTE2Ny8rb0pOa0h6MHNRRlI5b3hYS3JXVWlxQzI1ZkpUT1NIRTl5TGdrRS9Nd2ZRZ202MXZrWkp0K2RCR2UxZGtLTEVnUmJuNm0xSWRFREMyYUNrWDJmeE1WYldwTWJoSUg3YmVtcHh4RHRHd1pUMUxVb1Fjd00weDBMVWZDNWxUNXIxQWZUeHpJWTQ2cEZDVEwxenJ4ZHI1Y0hHOUJBSHhKTkJPN1pFc3ZCK0JIMEpzNWZYeTJoK2I1bXZCV1dlVkJubGllRkhNTzRjUnlxbkdvRU4ycjlmaVB3MUoxajl2ZkdUWjN0YWlFZ1pad0w3RjZrcWxTZnRXRkZkNHpTbWR1Z0NodDJBajQxSkZnSmxJM1BQbkFzT0FNWldZNEM0RzdUSXJIY3piNGhXQWphbEl1WEJmNk9wK3ROdy9mMCtnVmozMHhueFlCYVZMRVVXMnlXRTIrb1N6YTVURXB0d3FiQ054Z1BReGlqQmVmZmE3VmtQUk5pTlQ3Nk9ZNXdkTVVEZGk2QThOd1RzU0t2Rnk4TC9nUDd2bHpYbFgyZG4ybnpFUW9qUGljTENaSDcra08xNStvTWJpQ0h6VlJicTBtK3dETFlPaTdrTEh6dzVnbng1VXhwM3QrRDBtRTcrdW5mUjgvVzhSUHMyRGZrdWFpR1BWbThOUERLck9YN0x1dllqcjUzdGFoaUtUdytJU3NqQ1p5TWlMMUcvUjhKdDdRd1dwSWJHUWJQc1NLeWtadlJTc1psRTRhY2VjYXBQaTNYc2h4dFluVWJkeHg1dGNmd3VERWUxYVgvazFJVXh1dFFLT0U1YjRBYmY4YVkxZE9HOFA5MXc2TFRUNWhSWUc5cllZV240OTA1NkpXY2hZeXV3UEVYeXVrK1kxbmlCV3lhZE0vbVJRVS9kTzdyZnRaR1FLWk96bjkzKzQ1QUNHQXpGVFFVN1dwRVhUdHRlNllob0luY0hDNTlrUVBZR2ZsZ1ZwYmh1K1RNck5WUTN4L3JZTkFyeWNkQ0ZZSTBoaTdZOU5ieGJkMkZESnNWVFVlSjhVTjh6RzVjVURJMGNHN2NsejFXTGwxN1EwRjg4VTRIamltRmdMajkxOWh2UWNueTZqbEM4UHRSQXAybnJNTmQ2STFqOTZPTmNzR29VL0p2Zld3KzEzNXJOMjBFcE94cUhrSHVzZ01ZcHltWXlMMlVnR2gzR0w3TUJobHB6ZlpKczBrcExXcHBFWkhHVnZHM1hEKy9YTHZBSWtEQzRuWFY5WkVQdXdzYmhxRm1RQmp1aFNxbVdIVUs4d1U0WDhNdDl1Mk4zOHcvS2IzSkZRc0xueTdiSWplK3NXUGZyUkNPQjUzMkM4NDNIVGdXS0Z4WUxxL1JmWk1rYlFSRUpTQ1NCTHF5bUNNZ1duYjFpbkNyeWlVYm5IRk5GZTVWV3cvZHE4NXBleGpHSjlCRHRRUlZvNmh3Y0I0MnVWeFlVVnE0cXFNNHpTbXZQenNzd3pjaUU1dUIzcFdKMEl4NUdxcGVMV0N5RzdNaXRuR1RyYWxZa1ArODZyMVNHUi9jZUtSb1pYQWI5anpjZ0p6UHJuYWhjbnI1UnpMd0NKN043OGdQWGU1cDAwaFhRTEQvZWJ3bmk3SGhKY3ZyenV3SnFKdC9YWmM3YzNuZ3Fwbmx3Y2s5c1U5MkVnZ1kvRFEwb24rS2p6MFQxUjhjUmlNejJlY3JTc2VmSUJ6SStUbTY0eDhMaTliM0lVemZoNktOTVhnSDdSTDVjN3o2Szh5ak80SlUvSnF3NUJha3hiYVNwZFhSekE2dWJyNDcveTBmODA5REtlWE9rTUE3WHk5ZVd2MnRoTkJvWjlSS1FFd2hYQUd4U1ZuaGJxdFpKU3RxcGg0N0d0NmI1ZU4vUXE3M092cnNuMFBSYmJkanRLT3RZWUNrNEdVUWpsRjIwTENITmpmWXZNMExDbC9vS0tqekgyT1orS2p6VUdyY3ovMlpaNk94ZmU2bXhZWHpOeTBxdkF2bUJUaGZZV1Q3UmpDREw0S2dUTUFHd1M4WGwxZC93M0ZydytMVDZ6TU5Yb0xTSnFHQnp4K1lWYjVQeTlxQ0NyZFdWYXhUaHhYczNIODBpQ0k1cWdGY0dIWTc1RWtIY0VkbmswVWV2M3pDa0JHenB1UWFUYTJTL2ZUWnc5TS9PaDVZQ0xzLzZjaCtYKzhKeWIrQXRmUFQrK3FPRisramhONW1jUGtYeDIvVktJZEM2Vmhja0xjenVXUlRhZUU2NTNuN2M2eFJQYVA5L2NScnFCaFZhbnpLb1d0NWpXaXhIa01KOHpPWWZ4Kzd6OWFWNWdkbnJnaGVLeTJ4QmM4Z2NOS3dwS1gySnJ3bTBSMWR6RnFWSUhZQ2NCYnYydTFHbVp5YTlkdHE4Zk11blpCcHh5UEh6OW0wOGY1c3YybjBXNE1aS21xT2MyNGVUTWVmQ251YkQwOXlsWkZFRCtnRzJGaGE4SDNuc3E5bnBZdDNXbW4rTEpiaG4rZ0loK1BteGdYNXI2Szk2V1pnYUk5OHZxUzhwa3ZCYzk1TjlWbXJFa1JGSHJtWTJoWmhVaFJFMS91R0tKVXhjNVlIOTcxVDA1cC81VVFmczlDdDlHNXRhMHVyeGQ3dVA1RFlpWW16Vi9yUC9SUzV6STNQby9TSURjWkNyN28wdnFNYTFjbjB2UXhUaU9EZVJ4MjVPWnpuUG5CRU50MkJFdVEwOVJ5bGlCSk83WlNYYTFXQ0tGQnRHdXJZMkdYVzhnTjU2bjVuaHlXTlc1NnVhZ2c5OE9kRGpVdldIMml1T1dvRmNySnlIdXpNUHQyUEVrQ3UvWVdvQ1hrNTQ4K2xlcE1hTlhVZVZiejczUFNRY2xyeFEvVm51ZGVhR0xRVEVGTzJYYU11clZDWERmV0swcnhuTUdBM3NlWm91TFNoVlg2MXdCbzNhZTBkSTQ5cXdsZkxZSERUeE01bmFFZkZ5Z3VJeUdvdkFwcnBZNzlHcVdVNWZ2TndlSTVqMXVXc1h4VnJTTWJickFHN1JhQkxVVUdLTmRRM2RnV3NZbEZlTlo0LzJwVWRlaFluZ01tM2w2Q3N6bFlEVHlnOUlzdy9kRlA4YWVwTVR5M0lQNGc1V2kvRHh5dVVyK2hHbm8zVFQ1VlpsME83RW1URExhTlVRM0tYQXdpSnFXMFhvQlBHZER2alE3eklIcGFGaEtETDljVk5kdzAvN0ZVY1VJS3NkLzNtN0RMZGxsdHJKeUFLRnBMTkhROUJBblpaeFhMaGtxRVhCT1JvNU5lTy9iODdCaS9PbU9mbCtnL0JOZXNqTldPOENFZG5mbW9wSVBZYTlWaUlBYTFRTGRqcExBSjAvMlFJcUlGQnUzNmx4S1RtWkZ4STFqdENSdHI0anhtL1k1UGxkakxjMFZKQTFQNkZpWkd6SXVtNUMyNWlIUFF5ODFGbzVObEJ3dGhJbXc4MDFlSE15VzNydjFyR20rb3dkT1dmbGdMaVQ5aFlSd1ZlY0VIdGtLNVNzYmZQSk11S2xoK3FZU3hhZS90NlV1MkhNdHY0ajluSDdsVDdwUHB6a281cEtTQ3Fkd09OdDcxT25MQ2hQTFZESEJoSk9HTXc5bU9uaW9YUzJ0TWN1emtTYWxPbFFwdnpVQktpbURRbnRCU1FXT3dTR3VwVXhVcGFpc01oRE1ZZWNOeERWYXZOQityY1Q5VVpBdEZHUURIaC9tQ3EvTzZKUDlxTmc4UURiZTlmZUsyNlJtMzVuRm0vUERBMDFnVWN0K0tCeWNqd0Q4R0NxVkdZbEZHSGVSVDJDcnM3cmhyNTN6b3ZtUHJidTQzZjJsbmI3QW9Gd243QTdjTmk3R3dQTUxwZUNpYmIrSjhyZkIxT1RYRmZTTEZCWHdIaEJyUXQ0aE5VQndZTnJjYXdXdlA5b24zZHhUK2x0K2xBODlIcy91cmJGNUhRRU03TXpBZ1A1eGpTYkZaTGJuUDl4dWQwWFhKcitOakl3dE45Wisrc1phNkFDTTQrd294a1VFUkxCQk1GNXo0aC9XdHY0RzNhQWwwZ1R1b2pKRzJSblFYYW9lRWZyQzBkNjRZenFSNmRwR1BhQ2tobVptWmxtLzBMcGFYYUlaMEtTQm5VQkZVdEQ1WkRiOU8vcWY1MGRBMi9HdUwrNnpiZlBicnVKTmwwK0pvbGpQMFpCbXZnRVI4V0ZrbDd5ZTFydTF2bTY2eTBZZE9PdHV2UmZhYnh2Qld4L2tORkVGV3NvVTMxZ2F0aGRLZkJkeGp4ZnJpcDF1MThKSU5mY0Vzekx0V291bGFIdGdLaTlpL0U2clY2WkhTbksyTGROZFRmS045Mys5QXNmc3Z0VjQ0d1Q4azIySnJYamwzMDBZSFFhcno2eFdRU3g2SXNnYkEwWUZtcGU3eThxMkgzeTd2WWJ2ZUc1Z1poV2JVWW9IdGZDREVSblNFb3FJMS9SWkJUTGlBZnNXQXhNak8zMXdwTENKN1VEWjNPalhSVnMrcHhROTJmSWVkY1BqRW5LMytFajUyU1piQ1prNGY0V3lQeWMwZ0FwMGRUTi9aZWgyY3JSNzNRUHFTOEdTWHV4RlFHU0pYNHlQektIRDhocDNXZm5wVDNKK2RhbDdPMkpZZ0NoRUdqU2tDMFN3Q2N6MVB0aTg1VXhWZ1JGcWc5aXYreFZaSjFSeUlzd3pBT0lZZDBTL0JrUUJlQ29kWGhTOHVSZlJHSkhEUU0xcUk0Q0M2ZmhEN2RyNktLcGRTSStrSVd1dy9uTDZsbnFUaTJMOTgzRHpsZ2JOMlA4dEg0ZVZsVXdVTXF2Tyt4SDFvTENDUUVEWFhuKzVhK2o0OEhMMFRNdG5jVU8raisrOUZiMVMxZmJteTFyT0haUHZPTlBjM1FSY0MvM1pIZHZ0d3pER094dEt5VWZVaDlDV3Y3ZHhIMlAwSTBiS1Z0eUw0UGd1d2EyTG5WdGlmbDlUT1hCWW8yTGlyWTNQNjlaRi9QV2xwL3VpVkRQM0JTRm5QdlBoN09zMytTYkgrUzRaN1dBcEtSNGF0c0RhbDk1bU5IZEFsdWh3S3k0ZTZDRDBxVzFaei96NXJ3TGRCYU0weWlQcnVwTksvVFJyM2paTy9QNmdNenRFek03dU1pVkFuckhpaGRmNDJQOUhvMDhFYW9hYjNvY2wxVHNyeG1lc1hDdlBkY1MwazIyQTF6RVh3SytWNTgvSVBMSDhYMkhrbXliMzEzVG1zQmVmck9zWHZRVUQ4TW1DTlVWTkdlNkhKRVBiWXVaRW5mc1hUdEFsYVN0dm5RdXJhdDhWTXBsWUtGSCtPSDZoVkVSZkpoUWxnYjVwYlhYdFlmM2EycTNmRkdlUkFxZ3VSbkVxbGdaZUZ0MTYwNjhGdlZNWk40WHdlejFvMTBCUWh0YkhmaUlzRFNuS3drZnpWb3BqK0QwbU4xYkV4RVpVSVRHa1Y0Kyt6bGdZVDJRZDg5VlFPOTI4dUQ2OUVEZVBNSnJrazVzYVc1WlF1RXhOTlIvUlBDaFJ2YUN3aEtmcmNuQytOYWszUmJVTk1SMUxTN1o3S0h3UFo1c0hhT015S0N2VkswTEhpRGM2TXY1K0tWTlord2pqZS9DdW1ibWVpTzA0a1d2U2ZQMVZGSXRCZVF4TFVocUFWazFvVDJuWjhJbWN4OUp3Q0YxZEpubVBjZ3U5eXFxbHBLVHV6eENTbitnQ1d4enhldENGeHlNcjRVcmR3L0Jwb1RINUZoYXdjcWNKOU1kR1A2V2RuczhkdnkySS9uam1aalRuRUdsYUpDb3Q1THRPdWxXZXMyaUFKamNsK1Z4UktxL05MZXYvQnRMNkVOUkw4dEVWSGR2eGhkNTNlaktqdGZOVWxVd3gzS3JLOWdFYjZ0YUZuMXN3WXoxaGxHNW9ZTkMwZlZkTVlBU3VKeVdHdGtockRZYkJrT3pZVXp1VXJvMmg4ekx4ekNobVdiOXUrSFh4ck4vdXVQKzFuZE1hVy9RWjdMSTZFdEVKS3JrejBMb24wWWVuS3R2WUJjdEdEcys5dVhCUnNCRHFBVmFudi93dFU5aVJ6WjZUMEJEQnV0eE9jTW5RQWN3aUpIdWk1SWRvMWc0aG9oV2g1Q3FmQXUwcUVhOGxNTFlhckhsUGxoS0hHd1p5SExFODNXSkx5ZkhYMnZyV0NnWkRxQ084UFZzNWMvYkdKVHhtZloxa1lOOWJGRUlZRmI1K2tpSk5wWHNjcHM1V015cnZDNG01NnNhTUxRLzc0UVVBMTNUS21aalEvLzV4Q1U1alp1b2RjRUh6bXFTL0tMK0pDL2dSenJ1MWgwZFJldTFmWnNGME5nWXNMUjVxMlhEWjl4YWFaaFRFTDk3VVAxNUU4N0c5bVRieDV6TFRsQzRsUzNFb1RFMCtxVzlnS2lDS0svM20yb3cwejdGN3FmVmY4WjdLbjhYS3pDbGpkek1DVmxDUkxCN1Uzc2lhOUlweVlzNS8wTjVuejl5K2JGaFo5VjZrYVZYdDRNbjNrMUJOQ2UwdjdvUzBlN0ZSSVdDZjFGelRidWlaLzlZU2M5QklUWmEwUHMrQ05uR2ZMbWl0cUovUUdEM0R5UmdCcHgzMVJhOEwvUTNqNFY3Y0h4NkhsYWdJLytJV1JiVDBNSXR1T0hxaGJmQlFIYWhpcldldnkrNTJQbWpCeGY1dWtZbForM2FWSCtsa1JYMTk4OUx1RExNSy9xcVpDZ3QrRENwdHJBZHhMZFNLVloremFJRFNOeGJRaHVXREtpeGtQNmJiUTNsUW1RVG43RkJtSlg5alhNU2tobXI5eDNWU1JzYlVWMTdTeFZrcWpqK290T3NjOU9kZXZ1eCt0WUl6VDJvNzFUaEFmMzJnOVQvQzh0U3BDOHpISHZvdTRhY3RoZ3krZ3VSOVRWZmhOelZnUzN6VnBlZmZUYWxjSG5VajFUMVFrbm5Uc24wSk9TNU5KemNtd0hzTGhyZE9jdTllK1R0Q2hCbEJiM29xWFZPNEhpMHdvSHBwNTBLaURvWmp5TmhheXRuNTJRbTN2Qk9MKzVmWGZMNVcvdWJkNHk5NG5BT2QxdFF0bGoxQkZzME9QanJzQkdMTXMwRFJidGt1bXhJNm14aU1aeFdGckpXUzFZcHFhS1BCSjBSN3U1WVI1dXY3VkJiMktsaEFUejU2NFdMTElWYVhxbUtrbVVodjdyTHhxS25tTEozcW1KSXNZYStsNjFmM29UaHU3c3BvV0FxRWhneGlmMkw1UzJnS0Fyc3ZNcEp5M1dqQkZEVFhQMnAzTHQwYWV6Um1YNGRnU2FSN2JVODgvQW1lZTZBOUxkYzBNWW8yVUdHeW1aVWM5azVMQ3k3elA1V1p6N25OR3U3cHhJN1hOOGNBWVRlM0ZxMnh0MUVxRjRaM25kcVZndEZuUmU1Y3k2RmVaZk90Y25jMWJWTmdqSlZZSkhoZVJYcnh4bEc5OXVZRTJ0Z2pXSFVRR0Q3bURUTk84N0diZVQ4VTVhVkxGVVJORVFkSHV5MU9URk9RL1hudEVSQUt5M2JnbEhKQWFIbzA4ajBJT05QNDd0aU5WQVdKK1BzQ0ZhN1RWNFRNU25HWXZrNU5COURsd0hEcUJUdzVLbVZDTncyaDVLU0xqYUpaaXpaMVVnRHpaYWpuQWNRc2I0bFlvRmVXN2Fwem9TYVZPQ1lGODhyQTJKNHdtSEk2cWF0U2QrSjJvYU9UempMOGVPaFEvOTRvWER2a241V2Y3dGU1clYzdXNmVExzd2Izc3lWSmlqbURpQ21SbEhVTkdMZTIzd3ZSSFJxbVZtZzU0bmdTcFdQS3lhbWpiZVdiQVBRWnRSVWg2Y0RtbWVqSm5GZGJtNTRzVzF0K1lmOGpMSWFTTWdwdzNOM3dHRkRCWnl4R2hWSmpwZ3VLNDl2Ti9NRzlPSVdhRVg3NnB2dWZmRGo4TlRMWXU5RkRHSExpbnI1OVZxNmtOc0h4YTY3ajJCaXRMOGJYaEwvYlE0MGtaQTFGTGI0bVdCZjREYUJZb2NCblE3YmFqSDFoV28rakVkUktCUEJOSkdRRlFzVVhxb3VxZ3RJRjAyMVB1RXBPdVgwZjVSSFFWS1I5ZUFPOUFyOVU4bXJSY0hYTVQ2RUtHMEVoQk1YYWhFL1grZWlpOCsxREZxZ1UycVY2RkIwY0ZZdFBuUDZRTnpmVitWb3M4OVhmcEc3dVJDbGxZQ2duWG1hS2pIcDc2SFF2YitoY2xvZS9lWUh1WW1WVUE4OGFOak1CRFFzdWVsTS9CbWJzWmI2TytOZHg5RjE0WjBacDN1RTRFK0UwZ3JBVkhLcTlGaCtVRTgxdmJha1BnbG1ZaEFrZ21rbFlDb3VNY2E2ZzZHVG51eUhBdDBKZ0o5SVpCMkFxSWE2azZFSVN6ajUvNGlNTks1cGpNUlNEYUI5Qk1RS0hGUGhORFVaRkFwa2dpRXpFa2xrSFlDWXZyc3NSQVhBcFFLZEQ1eDBiWFZPNE9QOTMxaVgrOTgxTmYyWUdlUmRnSVMyNyt3MnZta3Vsc2I0dGpyelZsa1p1d3h6S2lTNTk2OE45RHNLZ2FLeFVDTFYyL2lrMWJqSUU3RU1FaW8yaUdGNmhwVDRKTmV4WXF0Y1hpbnJBeWpIb1A0S0N2amczNStXVm9LQ0RkWUZYWm5teFA3ZGlmMDEvNkY5SUVNNHR3aEZ2VzB6Q0VORWUvSlVyTVdaVU40Y3ErVDBwQUhuSGN3OGpnV3kzTFRjczhQSnc2cE9MZHdxNjIrWHROd0dhYkNmeS84U004U3hNeXNaRlo4MmhBVW1sMEplQzkxQlZCdHZxUDJGeEZRUEljMXpsT3hqT2hWTE5DSkhwSmxoU0x5ZmFqWjNOR1ZHNFA2R1plbUpjVEZpUXhNNW44ajhYb2dtcDFQSk8zaVZyUXNzQjJseHpRVmNLaWFxZkg3L1ZPZXVuUE1mbld0cWx4cVYxeU9qVC9SUnBtQ3lZVlQwVmo1QkZvc2JvWmdHT1lzS0R5N0YyTXB2Uzk5bENlRC9lREc2czJMOHI4eDBERzRIMHk2UlJSTGNGZmo0N1lGQkkzMnZGQW92Tk1XR3NZbVJocGFKdGhWTHpkUzhlbGJ6aTNCck1tbTRic1IrMkZnTXhkNW5uT2Z6ajBnd05rekkzajI0aDdZVEhzcmFTc2dvNGFPVzMzZ2FQQm1sQkJLR1FNT3FJYVJySTE2L2VqOUUvK2p4RG1NVGZveUtoYm52WWVxMTVUOXgvZDlEZTllZ3UzSnhwMW9tKzRvQWxnYmp0b3ArOEFRYkd2Rm9nTHRkcVB0cjFSSzJ5cVdBcUpVL0lnVzY2OWRWWk1nRE5oS21sZGlFbkNsb1Riak1UTXFLeGFPMmQxZlFNbmRnVVVnclFWRUpVVVpkRFc5V1I2ODBXSlNsUUlqVWZVS29EU3BZdERHYVBMTXFxNVU5UStzcEtUWUVBRWlRQVNJQUJFZ0FrU0FDQkFCSWtBRWlBQVJJQUpFZ0FnUUFTSkFCSWdBRVNBQ1JJQUlFQUVpUUFTSUFCRWdBa1NBQ0JBQklrQUVpQUFSSUFKRWdBZ1FBU0pBQklnQUVTQUNSSUFJRUFFaVFBU0lBQkVnQWtTQUNCQUJJa0FFaUFBUklBSkVnQWdRQVNKQUJJZ0FFU0FDUklBSUVBRWlRQVNJQUJFZ0FrU0FDQkFCSWtBRWlBQVJJQUpFZ0FnUUFTSkFCSWdBRVNBQ1JJQUlFQUVpUUFTSUFCRWdBa1NBQ0JBQklrQUVpQUFSSUFKRWdBZ1FBU0pBQklnQUVTQUNSSUFJRUFFaVFBU0lBQkVnQWtTQUNCQUJJa0FFaUFBUklBSkVnQWdRQVNKQUJJZ0FFU0FDUklBSUVBRWlRQVNJQUJIb1B3TC9ENFBLVTBVU2hiN1VBQUFBQUVsRlRrU3VRbUNDXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hc3NldHMvaW1ncy9hcHBseUluZy1pY29uLnBuZ1xuLy8gbW9kdWxlIGlkID0gMmQ3ZWJiZTY1OGY3ODMwMDdmMmFcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBTWdBQUFESUNBWUFBQUN0V0s2ZUFBQUFBWE5TUjBJQXJzNGM2UUFBRnFkSlJFRlVlQUh0blF0d1ZOZDV4OCt1SGhZSUJFSkNJQWxzTUU4QkFsT0hoMDFzQmdjYkZ3K1JLZTltNmliVGRKcE0zTFF6N1F4TkgwbmFTZE4wbWhtM21jYWRhZUk0VGFjQkpCNXh5ekRHeE5nWTJ3Uy9BaGp4TmhnaENRRkNNcExRQXoyMi8rL0NYZDFkN1dyMzd0N2RlM2IzZjJha2UvZmVjOC81enUvYzc1N3Z2SldpSXdFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lJRmtFUEFrSXhJMzR0aTVjK2ZuK3ZvR2ZxYVVaNTdQNTB2YmRMckIxaEpubzlmci9jdE5tOVp2czF4THExTnZXcVhHa2hnb3g4cytuNnFrY2xpZ09IOWFCcjR2VjFkWGozTSthRDFDVEZzRlFja3hWdy9FNlMwRkZPUStsQ0l6MGpXVjJlbWFzTUNTdy9PQ3g2T09wR3RhazUwdWo4ZFROREF3OEI5bXZIMTlvSnVtTG0wVnhKcGZvaHliTjIrb3NWN2plZXdFZHUzYU5lbk9IZVZYa05oRDB2L0pORGF4OUlkUENmVW5rQkVsU0toc2FHeHNySUNwSVBXVXREVVBRcVU3bG12ZzFEMXk1TWgzQ3dvS2JzYnlmQ28vazVFS0F1WDRNMlRhQzdDanFSeFJ2cjN0N2UydFY2OWUvWHhwYWVtcEtCOUpDMitaYW1MOWJXQWxQaTN5TXRHSktBU3o1eE1kaVc3aFo2U0NJS09MZGN1SUZKRW40N2hscElLa3lNdElNVFVnUUFYUklCTW9ncjRFcUNENjVnMGwwNEFBRlVTRFRLQUkraEtnZ3VpYk41Uk1Bd0pVRUEweWdTTG9TNEFLb20vZVVESU5DRkJCTk1nRWlxQXZBU3FJdm5sRHlUUWdrSkZqc1RUZ1RoRkFBTVBtUzN0Nys3L3A5YXFYTm03Y2VFRkhLRlNRQ0xuUzM5K3Z6cDQ5cjFwYVdoVUdOMGJ3cmZkdHpQeFQ0OFlWcXRtelp5bzVkOVBKV0xqdDIydGtMdnR5WUszYXQyL2Z3dFdyVi9lNEtWT291TjJsRkVvaXphN1YxemVxNXVhYkthOGNnbFVVWE5KeTVVcUQ2NVIzN0tqNUJvUllMb0pnN1lDS3RyYmIvK0M2VUNFRTBMb0VlZVdWVjhxNnUzdWZ4dGZtWWN3SzdCd1k4SDB3YnR5WXZhdFdyYm9kSWkwSnVkVFoyWm1RY04wTTFPMDB3YlI2OE02ZC9oL2NaZUQ1bnNmait4YlU1Qyt3RXMzdTlldlhIM1dUVFhEYzJpb0lpdCt2ZEhiMi9Dc0VMaENoOFpVeFhHdnJyVSsyYmF2NXlwWXRHdzdmdlpLOC84WEZSV3JXckpuSmk5REJtTTZlUFdlVUhnNEdHVk5ROTB3ckxNZWs4dkhSK3lXbVF2OGRTcE1jZlB5MnlrbzB1cGxhV2lvSWxHTXpRQXBFQllpL3d2OERVSkNSVUpNTk9DN0c4VFY4YlJiaWEzTW1wbHlLOFNITXFsT1RKMCtLOFdsM0g3dHlwUjRDdUQ4aDBEU3RrSzlOcUFiOXFWQVpQVHIvTzIxdEhWKzBtRnBiM2FVMUdMdDJkWkM5ZS9jV1FnRitMQ0ppcXVjZmI5NjhjUzIrTWkraXhQZ2hqby9nNms5d0s2K3Z6L2ZTWURKNGxnb0V4TFNDRWhpbWxjZmovVHBhcmxwRWJxbWNRMW0rREtYcFI5NkxxYlZFbC9Sb3B5QWRIVjNMQUhFY2xPTk5LTVJQcmFCd2JXRFVxTHcveDdWV2xEQ1A3dDY5dThoNm4rZjZFaERUQ3ZVT3YybUYxUmhoR1F3NktNdDd5TjhmSXUrejdwbGE5dzNlZGU5TU93VUJvSVdDQTErVGtIV01OV3ZXZE9MZWgrS250OWRuK0pWek9yMEpoREt0Z2lVV1V3dDVleHJ2Z0RhdFd0b3BpTmZydVNIZzBDSTVQaGlnNWJkeER4OGx3Ni9sT2s4MUpCRE90QW9XTmRqVXdwS21xRys2NjdTcnBHZGxxUStnSENoQmZNOEMwTitZZHFxSmFmdjJYWXQ4dnY1S2ZHbTZKa3dvckRXdjg2Z3ZBWmhXUDRKMCtTSWgrbUwyYk50V0hWWlk5TXY2SGQ2RC84U1BoL3dYWERqUlRrSFFNdlhCOXUzVisxSE1yZ0tnLzhYWDU3bDE2OVpkRkRZN2R1eDZITXJ4M3pqMXdsNzk1eFVyVnZRbGsxbGQzUlVsZjNSMkNYaGFVZm0yK3hEOHkzUHVPdTBVUkhEazVHUjlGV04wM29HU0xPdnRIYmdBaGZrRTVsVCt3RUIvcWR5WENueEpTZkUveW5taVhVNk9sb2ppU25heTA0UVd5RCtBd1BLWGNrNjdPb2dRUklsUlgxQXdTc3dvS1dKdlFWR200d3NreW9IOUtEeGJ2VjdmeW1TVkhtVmxwU283TzMyVVJOSWlhYUtMam9DMk9ZOEtXeHVTOENkb0h2eGFUVTNOdEt5c3JOdFFuS3ZSSmNzNVg5STV1R2pSNzZpMnR2YVVINDhsQXhRTENrYWpoTTV4RGxDYWg2U3RncGpjWVU2SjhlcnFVR2g1b1lxSzBuYVBHQk0xanlFSWFHbGloWkNUbDBqQUZRSlVFRmV3TTlKVUlhQzlpYVVEU0psSElVUEVNZUkwYWVKa1pYbVYxSDlnWWlZdFRrWTBsQUFWWkNpVGdDczlQVDNxK1BHUFZYZDNUOEQxWlB3WU5TcGZ6WjgvTDYxYTBaTEJ6Y2s0YUdKRm9Da3pDdDFRRGhHcm8rTzJhbXE2RmtGQzNrNGtBU3BJQkxwM3NCbWZtNjZueDkzNDNVeTdEbkhUeExLUkM5TEJ0bWpSd3phZWlNM3I0Y1B2R0l0RXhQWTBuM0tTQUJYRUJrM3BoUjR4WW9TTkoyTHo2dmFLSTdGSm5aNVAwY1JLejN4bHFod2lRQVZ4Q0NTRFNVOENWSkQwekZlbXlpRUNWQkNIUURLWTlDVEFTcnFOZkpWT3c1czNqWVU0YkR4bDMydGZYMUxuZ2RrWE1JT2VvSUxZeU94cjE2NnJBd2RldC9GRS9GNDUwaVIraHZHRVFCTXJBcjI4UEhkWG44bkx5NHNnSVc4bmtnQVZKQUpkV1VseDlPaFJFWHdsNW5aaDRWZzFjZUtFeEFUT1VLTWlRQk1yQWlicEhGeTRjSUdTZW9Gc2haQXNoeG1VSEtTWUxOakR4RU1GR1FhTzlaWW9pdnpSWlJZQm1saVpsZDlNclUwQ1ZCQ2J3T2c5c3dqUVpvZ2l2N3U2dWxScjYyZllvOFNaR1lVeVMxQXE0TWtZK0JoRjh1aGxHQUpVa0dIZ3lLMjJ0aloxNGtTdDQwdit5SWpkK2ZQblloa2VZMytnQ0ZJazd2YnQyN2RWZTN1SGtvOUFaMmNYRmdUdlJZTkVQOUxiYit4ajZQVm1ZWm1nYkNYTnpkblpXVE93SE93VGFLeW9TNXhFZW9WTUJZbVFIMDFOMXgxWERvbFM1cmxMMk1sV0VDa0ZXMXBhMUkwYk4xRXF0a0loYlBYYXl6cTVyNk1FeFB4alowclRDUGhkdjAwRmlaQUYxcVpkZkVGVmJtNThIWWQzN3ZRWVgyaUoxaHAyQkRIaXZpMXh5ZWFkalkxWGpTYnJlQUtFa2dWQjZQOCtTcGJuc2RENHFYakMxZkZaS29pTlhDa3JLMU9QUHJyVXhoTkR2Yjc3N20rU3VnQzJsQmhYcnphcHk1ZnJ3cFlXc29MSzZOR2pqVDlaU1VVV3lwT1BnWlJ5VXNMMDlIUWJLMHZLNnBLaHBpQWppaFh3ZWdKYjU3MDhZa1R1ZDZxcXFocUhwancxcjFCQlVqUGZvcEw2K3ZVYmhtSjBkWFVQOForYm0ydXMwVHRwVXJuUld4OXRIOC9ObXpkVlEwT2pxcTl2TUpUR0RCaEtrZ1d6NjZ0ZFhUMWZ3bVk1TCtUbDVmNEFpdEp1M2svVkl4VWtWWE51R0xubHkzL2h3c1dRSzZLVWxrNVVGUld6MVBqeDQyTmFjNnVvcUFqTHNCYWhnYUVTbGZ0MmRmSGlKWFh1M0FXL3VRaEZHWUZTNjYraEtHdGhkbjBSWnBlcnk4WU9neW1xVyt3SGlRcFQ2bmlTVnFnVEowNE9VWTV4NHdyVmloWEwxZkxsajZtU2twS1lsQ09ZZ3BobEN4Yk1WODg4ODd2cXdRZW5CSVFKUmFtQW5oN0ZsdDFmQ0g0dWxYNVRRVklwdHlMSTJ0SFJvVDc2NkZpQTZTUE5zMUp2ZXVxcGxXckNoSklJSWNSMmUrVElFV3J4NGtYcTZhZWZoUElON3B3SEpjRm1yT3JWSFR0MmZpTzJrTjEvaWdyaWZoNDRJb0dZTzhlT2ZZd0s5ZUE2V3RJWitkUlRYMUQzM3ovWmtUZ2lCVEptekJpamxKb3hZN3JmSzh5dGJKaDgvNDVOa1A3ZWZ6R0ZUbGdIc1pGWjhoS2VPM2ZleGhORHZVb1lUanVaNlZoYmV5YWd2MGFHNlM5ZHVsakpxT0JrT2hrbDhQRERDOVhZc1dQVWh4LysxaThUU3BOdm81WHJOTGIyM3A1TWVlS05pd29TZ2FCMThXZ1pidExhZWl6Q0U5SGZ0b1lkL1ZPQlBxVi9vN2IyZEVEejY1dzVzNDFLZEtEUDVQNmFOdTFCbzluNHJiZmV0dlM3K0g2MmMrZk9DN0lQWlhLbGlUMDJtbGdSMk1rQzBvbHlUb1I5L3Z3bnhocStwb3hUcGp6Z3VuS1lza2g5NUpGSGx2Z3I3OUxDMWRjMzhDdHN6Sm95ZThDeEJERnpNOHl4dkx3TWRuMlBzUlNvVTlzZllKOUZKYTFLRW5ZOFRuckZwYS9EZExJTDF1TEZuek4vYW5HVU5GWld6alZhMWtRZ0tFazVObWdWTTJ1NUZnSkdFSUlLRWdHUW1FRmlMa3liRnNGamttL0xETWZMbDYvNFk1V1dwTWNlVzJZTU1QUmYxT1JrenB3S2RldFdtOUZwS1NKQlNSNUhmZVQzVUIvWnJZbUlZY1dnaVJVV2pkNDNybHlwTjBiZW1sSXVYYnJFR0hGci90YnRLQ1ZiZnY1SWkxaSs3Ny94eGh2YWY2Q3BJSllzUzVWVE1mbkV2REtkbURIVy9nZnp1azVIYVUycnJKem5Gd21seUt4cjE1ci95SDlCMHhNcWlLWVpNNXhZWWxyMTl3OFlYc1FFWExDZ2NqanYydHlUQm9TeFk4ZGE1UEY5ZC8vKy9ZbHJCYkhFRk91cDlrVmNyQWx6OGptcENNdmNDYnVWZEJrWk8zbHl1YVAxQWhsTmUrM2E0SzVUVTZkT1NmcWNrbmpZUHZSUXBYcnp6Y05HRUNoRkpyYTJ0djBoZnJ3WVQ1aUpmRlpyQlVFdnJMZTZldGZYVVRvZmRhdnRYSlRqekpsek1lZUJ6TmlUZmdtbm5NaURGOHR3VW5yTW16ZkhWdEJncWs2ZE9tMDBEYytkVzZGR2pZcDl6YTh6Wjg2cXp6NjdaYVF2Mm9sZkV5ZE9OUGFjTjVkd2hUalBJUUhhS29qV0poWTZsVmJLTUFVTWV2dWxyYmZBUWM5U2NzVGpXbHJpZXo0NDd1dlhtLzJYQ2dzTGpaMXcvUmVpT0ttcnU2SSsvcmhXWGJyMHFmcjFyOTh3cGhSSDhkZ1FMMGVQdm8raExTZlVwNTllVmtlT3ZEZmsvbkFYcEpkLzBQbVdZTlR2OU1IZmVwMXBYb0o0Q3pIdlRyNllWc00xcVFTdFpwV1lUTVhGUlJIamx5MmptNXR2R3Y1azZMbFRUa2JxeW9CRTAwMmFaTDhmeGJwN1ZYZDN0enA0OEpCNjRvbmx0c3cwVVE1Uk1OUEpoQ3M3cnJ5ODNGQXU4eGtZQ3F0d3J1V3dlSzBWeEFTb3kxR1VJNW9aaGRJRTI5eDh4SEd4WmFpTDFjbUxadGZKMTN2cTFDbitGOXl1a2dRcmg0d1d0dHM1S1V1NWpobFRZUFNOaVB3dys1N0E0Y2R5cnB1enAvcTZTWjloOHNnS0s2WXpYekx6dDUzamtpV0xEQ1V4bnpHVnhCcStlYzk2REtVY2Rrc2ZNenpyS0FJb3lETHp1bTVIS29odU9US01QTmFwczlHWWVzTUVwZXdxaVpQS0lYSVZGeGRieFp1d1o4OGUxOHhvcXlEQjUxb3JDRnF2M29mTjNJbkdtZ1BCZ21maWIxbTd5blF5bXk5ZUY2MlNPSzBjSW5ldy9CaVZQQ3ZlOUNUaWVTM3FJSmprL3k5b3Nud09sWEdQbVVnb1JTZWdmUTJteExqVnExZjNWRmZ2L0IvY2Y5SzhMMGY0K1F6cnIvMitXMDNBVmxtU2NkN2RqZVdvN3JsNG1tZk5NT1FvU2lMT3JIU2I1cFpwT2lWQ09TUys0SkhNZlgwKyt4VXFDU2pCVGdzRndhdStHVDNEUSthRFFnR1dRemxlM2JkdjMzM3Q3WjNQb2tYSU9waEgwSXhIQzhnU0hGTm1ma0dzK1JuY0dpWkw4empsd2luSitQSEZXRXVyM2grTlZNaE54ZkZmalBGRStuQ3lzN1A5YzBYd08vNGlNVVpaaG50TUN3WEp6dllzSGhqd2ZCNHZ1OVhrNjVnMHFmUWdwbXIrRTVvMkQyR2Rwc3IrL3F5N256dC9pand0R3phc2ZYM1RKditGaEo1STA2MnNheFhKU1RPdjAwNG1SbG1kdkZ4T3VsQktraWpsTU9XMktvalBOMEFGTWNFRUg5ZXRXeWNqNzJxQ3I2TVgvUm1ZVlgrbGxIY0wvRXpCL1l2QmZoTDlXK1p1bUU1ZS9MbzZleSsvdGQvQkRDZVdvM3h4clU1NnhKMTJ3VXBpaHU5a3lXR0dLY2VnTkFSK0Fhd2VYVHkzZnJGZEZDTnMxTVk0Q0x3THdhWlYyQWVjdmlHOTFmRTRtUmpsaEF0V3RIVFlDZGVhQm8vSDYveGtmUWZBTzF0T095Q1Fia0dVM0Z2R0pwN0JpazZrU1JSRVNqT3paei9VRXFEeHhoTmNJVGZEQzY2NG05ZmpPWXJKYURVYlVacFFRZUlCNnVhem9pU21vcmdwaDVnNnNrV0JPS2RYUndsV0RvbkxXa2wzV2tsa3l3V3JRejMwa3ZXM0x1ZGFtMWdlejkyQlREQy9uVGU0ZGNrQkczSllOOXlSaGFTZGNxR1VRMXFybGkxN0pLWWU5Mmprc3ZiYW8zN2xReXZkK1dpZVM3WWZyUlVFWnNYYitLdEg4ZnVMWklQUk1UNlpkMjY2dThQZTQvOXVoRk1PYy9pNlZOeW5UcDFpUnF2TWtzVDZndnR2MmppNWZ2MjYzemZxbUpld2h1OWdMNmovanZzbld0ZEI3clZ1SldkWlFQZnpJcUlFc25LaDdQRWhUcWJkU3JPem1FR3h1a2pLWVlZclNpSXVYR2VpNmMvT3NhRkJHaTd2T2xnSWg4eHozWTVhbHlDNndYSmJIaGtCYTIzdWJXaTRxeXl4eUJXdGNwaGhPMW1TeUdRcDY3QVpwT21nR1k5dVJ5cUliamt5akR5eThJRXM2V2s2MmFjakZtZFhPY3c0bkZJU3EySkRPZnBRMTl4dnhxSGJrUXFpVzQ1RWtLZmtYck96ZUpPV0lObHYwSTZUM25IVFZKTG43SFlDaGxLUzk5NkxmcVNQZEE3VzFkVmJSWDRWOVkvQjFlK3NkelE0cDRKb2tBbDJSSkE2aDNWQmF0a0x4STZ6anVteXF4eG1QTUZLWXE2d1l0NGY3bmp4NHFXQVdaRW9RWDQrbkgrMzcybGRTWGNiam83eFM0ZWhUTFUxVjFWc2FycG1iSll6Y2VLRXFNU1ZyUkJrMm01SHgyMFZ6NklOb2lSU0p6SVhiWWdtY3VrWVBIbXkxdUxWYzJManhuVjdraldXemhKeDFLZFVrS2hSNmVOUnBzM0t4cHgzN3ZRYVFoMC9mZ0w3REFiTUJBZ3JyRlR5NTg2ZEUvYStuUnV6Wjl1YndpR3J3MWduZldWbCtiWkNIdWNtN2RzUlBrcS9OTEdpQktXVE55bEZIbmpnZnI5SU1sZGRUQmVkbll3QWtHV0NMTzRnNmg2dlduNXJlVW9GMFRKYklnc2xKcFcxNDFBMnEzRjZpYUhJVWtUblEweXJ0OTkreDcrV01Fb05YMDZPZDJ0MFQ3dnJpd3JpTHYrWVl4ZFRhZHEwcWY3bjVTVThmUGdkbzZmYmYxR1RFMmxXRGxMZWwxSmxGaWdWUkpPWEtCWXhaQ2orMUtrUCtCK1Z6amRSRW10TGxmK21TeWUxdGFmUXJEdTRUUVAwK2pjRkJmblB1eVNPN1dnelVrSHc5VzIyVFVyVEI2VENYbEl5T054RWVxbEZTV1NST2JlZFZNcFBuanhsRWNOVGorclRXbGxqd0hKUjY5T01WQkRreVBmRUR0WTZaMndJTjNQbURLd1NZc3d0TTU2U0ZxNERCdzRHOURmWUNDNXVyMUtDaVZsMTdOaHgvNnhCbEJ4ZG1CUlZoWXA1VTl3UkpER0FqR3ptTFNzcis3Zkd4c2JYMEJvMEY2d0Q1N0ltRWI1VFVVbXIxc3laMHd1UEh6LzVYY3pTSzVWd1piVHRhNis5Ymd4WlQ5VCs2S0hrbDBHVVVvS1pTNitLSDN5TWVyeGUzNWZRNS9GUnFHZDB2cGFSQ2lJWkFpVTVqWVA4cFkzYnUzZHZUVWRIWHpWR2M2eVVSTW1zdzBPSDNsTFRwMDgzVm9IUHpjMU5XRnBsQ0lrTVlaR0ZzYTBERVJIaE5TakhXcFFjUnhJV2VRSURUdm12WnpnMjI3WlYrMDBvZk1GK2diOWo0ZnltMTNXZkYrOXFGVjdZeDZ6cHlzbkpVUlVWczlTc1dUTURocXBZL2NSNkxydGRTV2VsN0VNWTZEeS9WU3FuYXN1V1p3ZHI2WUVldFArVnpnb2lxMlJrYWgwcjdJc25zeEpuekppRzRTcmx0bFowRHc1UVNpY1pUU3dkbERkdURHM3p3QWVwSmo4Lzc4dHIxcXl4dHd4TWNFUXUvMDViQmNGNldrZndKVjNxTWwrdG81ZUt2YXdRTHd0SkZ4YU9OUlp5Q3lld21GQXllcmlwcVVuVjF6ZWdqdEhzWDBBaThCbFBMUmFYK05hbVRldi9ML0I2YXY1S1d3V1JUVm13R04yUHNQclNQSjhQYlNnWjdKQjZXWVp4REY3eXZPRXdTT2tpTzlHS09TWWpocVUxU3BibWtXbTJNcmh4dVA0VnhOR0FWcXB2WTJqVmY2RytvZVVhVjhPbFBkeTlqSDV4d2tGSjErczdkdXhjalJVTXY0bjByVVNCa09WTU9qMW4wSWoyVTdTYXZ3akY2SEltVEgxQ29ZTG9reGRKazJUWHJsMmxXQ3g2QTBxVUovSDNPQ0l1aURaeWxCVDlLSkUvZ1ArREtESDJiTjY4N3Yxb24wMUZmMVNRVk13MUIyV0dLWnFGZnBUWlVCaU1YZmZOeE10ZkFpV1FkWExSOCtqcnhyRURGVzVzdE9qNUJQZk9qaGlSWFZ0VlZlWGNta01PcG9WQmtRQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKa0FBSmtBQUprQUFKUkVQZy93R1h3YVNHa0k5czFnQUFBQUJKUlU1RXJrSmdnZz09XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hc3NldHMvaW1ncy9hcHBseUZhaWwucG5nXG4vLyBtb2R1bGUgaWQgPSAzOWJhNzNjNWQ0OGViOGIyZTllY1xuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gM2MyNGQzOGZmY2QwYzM4ZTM0Nzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBcIi4vQ3JlZGl0TW9uZXkuc2Nzc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVkaXRNb25leSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVuZGVuRG9tKHN0YXR1cyxjbGljaykge1xyXG4gICAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwMVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjcmVkaXRNb25leVN0YXR1c1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtyZXF1aXJlKFwiLi4vLi4vYXNzZXRzL2ltZ3MvYXBwbHlJbmctaWNvbi5wbmdcIil9IGFsdD1cIlwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImV4YW1pbmVTdGF0dXNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDlrqHmoLjkuK1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImluZm9EZXNjXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+5oKo5bey5LiK5Lyg6Lqr5Lu96K+B5ZKM6JCl5Lia5omn54WnPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+6K+B5Lu26LWE5paZ5q2j5Zyo5a6h5qC4PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiY3JlZGl0TW9uZXlTdGF0dXNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17cmVxdWlyZShcIi4uLy4uL2Fzc2V0cy9pbWdzL2FwcGx5U3VjY2Vzcy1pY29uLnBuZ1wiKX0gYWx0PVwiXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiZXhhbWluZVN0YXR1c1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOWuoeaguOaIkOWKn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW5mb0Rlc2NcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD7lupfpk7rotYTmlpnlrqHmoLjpgJrov4fvvIznrYnliLDlvIDpgJrllYbmiLfmlLbmrL7mu6E5MOWkqeS4lOi/nue7reaUtuasvjMw5aSp77yM57O757uf5bCG6Ieq5Yqo5byA6YCa5L+h55So5Y2h5pS25qy+5Yqf6IO977yM6K+35YWz5rOo5raI5oGv5o+Q6YaS44CCPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDNcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiY3JlZGl0TW9uZXlTdGF0dXNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17cmVxdWlyZShcIi4uLy4uL2Fzc2V0cy9pbWdzL2FwcGx5U3VjY2Vzcy1pY29uLnBuZ1wiKX0gYWx0PVwiXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiZXhhbWluZVN0YXR1c1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOW8gOmAmuaIkOWKn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW5mb0Rlc2NcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD7pob7lrqLlt7Llj6/kvb/nlKjkv6HnlKjljaHlkJHmgqjku5jmrL48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwNFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjcmVkaXRNb25leVN0YXR1c1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtyZXF1aXJlKFwiLi4vLi4vYXNzZXRzL2ltZ3MvYXBwbHlGYWlsLnBuZ1wiKX0gYWx0PVwiXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiZXhhbWluZVN0YXR1c1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOWuoeaguOWksei0pVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW5mb0Rlc2NcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJkZXNjSW5mb1wifT7jgIDku6XkuIvotYTmlpnmnKrpgJrov4flrqHmoLjvvIzor7fmoLjlrp7lubbkv67mlLnvvJo8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImRlc2NJbmZvXCJ9PuOAgOiQpeS4muaJp+eFp+OAgOWVhuaIt+azleS6uuS4jui6q+S7veivgeS/oeaBr+S4jeS4gOiHtDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiZGVzY0luZm9cIn0+44CA5bqX6ZO65ZCN56ew44CA5YyF5ZCr5pWP5oSf6K+N5rGHPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJyZXN0QXBwbHlcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9e1wicmVzdEJ0blwifSBvbkNsaWNrPXtjbGlja30+6YeN5paw55Sz6K+3PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCB7aGFuZGxlQ2xpY2sscGFnZVN0YXR1c30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNyZWRpdE1vbmV5Q29udGFpbmVyXCJ9PlxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVuRG9tKHBhZ2VTdGF0dXMsaGFuZGxlQ2xpY2spfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9DcmVkaXRNb25leXMvQ3JlZGl0TW9uZXkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFNZ0FBQURJQ0FZQUFBQ3RXSzZlQUFBQUFYTlNSMElBcnM0YzZRQUFHVVJKUkVGVWVBSHRuUXQ4Vk5XZHg4ODVkeVlKUkJBVWxFY0d0WmJxYXRGYVpWMUtyZENDYmtOQWJBdmRWdXVqdExMbGtlRDYyVzNYUjR0V3Q5cldTc0xEaGJMRmRyZTdYZGxGQlpMVkVoV3Q3cXI0MWxxTEZKVUVnbExrSlNHWm1Ydk8vczZkVE13QUdlYVNtUWx6NTNjL241bjdPTS83UGZkL3ovK2M4ei9uQ3NHTkJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkVpQUJFaUFCRWlBQkFKT1FBYjgvaks2dmFyYTVpOW9vNjhDalBPRkZMdU1VRzg1d2pSS1UvTG82bmtudjVkUkpQUVVTQUpGTHlDVGFyZmNZb1M4VlJoektBc3A3Y1ZYaFpTTnhwaEdwOHg1Y3MzTVlhMkJmQko0VTRjbGNPaERjVmh2d2J4WXViajVVeUp1WGp5c2NCem1sZ0VyQ21GNVdncTVUaHJkZUg1TjVJWDVVdXJEZU9XbGdCQW9hZ0ZCN1hHZk1lSnFXNVlBc1JrUC9qMFFnQkl0OURqVUhlT01NUDNTbGJPRU9pYU1mTndvK1ZzWkNxK3JuM1h5NW5UKzZWWjRCSXBjUUpyZWhlbzB3aGFiRW5MdTJubVJSY2tpblArNENXMTRyV1dNME80RVhKdG9oQmd0aEFrbDNidlp2eU9sL0MyRXByRWtKQjU3WUU3RnptNzg4WEtCRUNoYUFabThjUHRwcmh2dGZPT0hIWG5PUTNNanIzVlhibGZVN2V5L3k3U05oMFkxd1dneEVjSnlSbmQrN1hYVVJscEk4NUpWeDNEV09Lai84S2Z2dTFhMnBRdER0Mk9QUU5FS1NHVmQ4elZDNnhXMlNQRFczN20ydW1JdzlxZ29NdHUrVk5kY0VUVjZJdHIyRXlFSW40ZXFkbkxha0ZKWTRYZ1NpVFVLUjBJZEcvNktuL1RTeGszSG5CRW9XZ0ZKYlgvSVZmWHpJbDgrV3NwUTArVGtoVnZQTVZwREhiTUNJeTdDdGI3cDRrUE44bWRQV05BN1prSk9ZOE9jWWUrbTgwKzMzaUZRdEFKU3VXREwyMEIrcW9kZHlacUc2a2hkdG9wZzJ2Mm1wTFZsNjFnak5GUXhPUUgxMHZsbzhLdTA4VXU1RVVMVHFKUmU1eHpYYi8yRDF3N2NuZFkvSGZOQ29DZ0ZaT3E5TGFkRzIyTldRTHd0Sk9TNXErZEZYazJlSDJrL1plR09ZZXE0VUd1bUQvR2tKYnNIcXVpK3oydGhKbUpnWllJdzR2UjBhVUQxY3FIcmJWQm83T3VRWGxkK1V1U1psZE5sTkYwWXV1V0dRRkVLeUtUYTVxdU4wZmNsa01vUDZtc3FCbVhhSHFpNnQybTRpSmxOSVNrMlBUaDN4S2lqS1JZcm9MR29ld25HWHlaQUhVUDd4WnlZUGg2NUgxM0tUMEFsV3ljdy9sSmZNK0wxOVA3cG1pMENSK3EyekZZNngxWThSbzlMWnNnK2VKa0todzBqWTdMSzFhYk1xQ04yK1NhVE9HVC80SGVHdm9PTHkreHZ2akZxUTEzTGVVYTRFL0cybWdCVmJDeHFtTExVUUtZY25RQ1ZFS2hLZXgzdHArM0lTU1B5dlU3SjBzYlZjd2R2Uy9YUHMyd1JLRW9CZ2ZveUxna1FEK1VUeWVOTTl1am91dFQ2aXh1MU5oUC9SL0l6UHpFUy93TDgyZCtkMTZ3d1pUdjN0WHpPWVB3RitiUXEyYmtRakpTYUhzSXlCTjNNVjZMbXVWS0xBNkt5ZHNzYkVKaDFEbFF5MmEvMGlkVXpCdTg3VXJwMHo0eEFDdmpNZ2hTMnI4bTEyMGE0SnY1dThpNlVVcDlDRis4cnlmTjBlenlROHJLRlcvZkV0ZTVYR2c1OThZSFp3eDVPNTcrcjIrV0xtai9SN3Vwcm5MTFF6MkRQOWVldWJ1bU9KeS9kTmtpM3hXM3ZHSDZvWVl3NUpaMS8rSXREaUo5SnFHT3FjZlE1dzU2YlAxN0cwNGVoYTNjRWlrNUFxdXFhcjlKYS85SUNzYVlpbzZzamd6cmU0dDB4NnJ6K3BjVXRvOXRpc2Vla0VyRytRK1R4SzZkSERuUTZIdUZneXNJdEQ4ZGRjYWxRNm04YnFpdVdIc0Y3dDg1VnRVMGpJU1FZMlpkUXlRek1ZY1NBYmoxYkJ5bjJvaGR0dlIyd1ZDVnEzZXBady8rWTFqOGRVd2dVbllxbHpVZnFGVWc4bWFsd1dHclJ1R2QySWh3aG52VWpITlpzNWZsWG04YlpPTUpDUVIwNittMXRUZVF0aExhL0plaE9kdHEyYngzdENveS9HTnVkYk1aQVlFcFNZamVpUDY1TlFkdG1pbzY2VU1lYW1pRTE2Nnc1ZjZnazNQakFkNGE4bitLZkp5a0VpazVBWUlWN01SNll4Q2JWK3VSaEpuc2xkU1VFVEdpakdqTHhuL1R6d2grYXh5SmNxVktpN2J4UlEvL3ZvYVJERC9mbytuVVJ4VE1kdjl1LzhhdnQ1YnQyeFM2Mk5ReXFSNnVPZmZLUUpJeXBRUHZsV2dTODFvM0dEQVRtTmR2WWgyVU1hcGpRNzJqT24wcXNxQVRrc3NWYkk3R1krN0VrQXVPSTljbmpJKzJuM2QvVXAzVzd1ZEQ2SzhISTk1SDhkM1UzVWR0K3dEUXM5Smo1YVErZzNYSWllc3hlaEI3OHhFUFZrYXU2eG5tNDQzKzlhc2grWExmQzZ3bHc1ZUwzaDhoWXUrMFptd2gxRWdJamhxV0VTelQrejRFZ25ZUHJOK2dEOGVpazJxYW5yYkdsRW5vZHpmbUZLQ29CaWNYTnVPUURnb2R1OStoWncxOXRtSjI4a240ZjMrRmNiSFE4SEZKcTMzL1BHdks4ekRDY2pkVnh6Q1NOVjdiVzhuL1NwNUxxR25mTjVTNnNqV0VaZkVHcVMyWm5EYk5QUW5ldytMZU9uN2lzcnVXc21FQ0QzNGlKYUplZ0prMDE1L2ZVTTJQR1E1akhJN3QzYktocjJvVWE1akVJOWlNREI0VC92VU1BTTBzOElMN1NtejhFNUNhVHQ0Rkc3Y1hKWSt6OXRqKytZTVBDZk9SUlArTW0wNVorY0x5cjBWV0x6WkVoV1BabXZra2xMN0crWTNIeFNPYWh1dmY1VVBYUU42eEpUVU5OWlBMb2N5dE9RSDR1UXVQOU50elAvOXJlcjRORG9zWVppQzdtTDJ0dGxuMndLL1p1VlYzVHR3LzJFL1R6b3FwQjhNWWNseXhRS0R6cms4ZVo3RU5TVjhXODRRaVZjZGV1alRjZTM0LzU3a2FGSGJIem9ibERmVGJRdFNjZ0pTSDFhQ1o1VFBxeGxzYm82LzMwNnJuRFZ5ZXZIYnp2VVBXZXduWDcrNEUxNTk4dDI4WmhwSDdpNGN6NW9ZYWRDSUZaTnFsdWkxdGZQZUlYQjhjWDFQT2lxVUhzUTRQWGY2Y05sQk5TVDJSYXFOUHFXZ2JIalBMbWYyak1ITXcwblBVWGQ3M3hDOS9xMVpSN3Q1NkhidUhqMFhad2orc2ZldHhYbWtLdmlydnVRNU9YTkhXdE1kTkc4ZXZxRS9mV1E2RHFxeU56RytaRnppeFRLZ0xWNnB1b1lmNERYY1d4WkdDajVZK3VXMnJDeWZPZzc0dEdRS0pkMUN2Yi9qaC85dENYTXkzY05obWZhRWV6VVF0czlUdXRWa2t6S1pFT1pocjYyT0l4YXpxUFJxS1VHL3pvL3RPV041M2dhbm0rRjFiTEZoOUpwbmhkVlYzUnZMWm14QXBNQS9pNjQ0VCs2aU5IYzFKTFc0dlhXZkhSdGVBZUZZMkFkQjMvZ0tiME96L2pIK2pWZ2RtNjdkNzExOGkyby9ZeE56R2xOMXhXNnF2bkt5d1RkbGN4WWVyOVBIN1JBd3FEaUo1Szl4Nm0vRzcwRTdZN3YyVW5EWDBkdFVoYjB0MTEzTTRhSlhrdHFQdWlFUkQwMm94TEZpS09NMWF2YkJpTWYzelI3dEdZOVZVTENBR0xYV3lvZVRhdG1qazQ0N2Y1M0RwVGloNnZ6OWl3R0R6eDFmN0ErbDVlellPeEdsODlaamF0N3JhMjdjMWpvSjRtRENoaHgrS0VuVDkxNXpkbzE0dENRS3lKT3Q2cUgrOHNQQmxhMzNsOGhBTnJReFZ6eGNuUXhYVnBIK1ByWVUzMlFxRXQ0Y3V3c1ZsdCt4eTZkMHNjSlZyUG5UMzgyU05rTWNVWktwMW44WXY2enFjd3AwU1Rjb0pPQnE4R3RSY3hXditTSDF1eWxJZ0s4Q1JVZ0huMm5lV0I1ZUhkdTZJeDJ4WVlxV0c3dExaNjZJdXlKck5vb2xwNDNic2h4L3grNWJkR2ZKQlpxQTVmNkJHeVIzNTdvYUt1dWNpR2sxSTk1a2NWbkZyMzN1bFJ0MzBZQXBveUVmS2wwdG4wdXQrc2lvbFJFbXpHenFrdm9xMG9CS1RMQ0xOWHRKa0toL1dNQnYwTysyaWcvYkhjQyt6dmIwdFlpUTlESi9tcmVaRGFHOVlzSmE3TllqL0p4VVZzclBWZm9zeWJLK2NPM2VFbmJIZCtwNjdZTlNDMjkwT3YwVy85UUdoOTllSjFGMitoWEM4S0FlbEpZY0FVL3I4dzJEZGc1Y3dUOXZpTnAzUkk1Tk1kOWxLK2dtTEc0RzhRd1A1OGJTb2tudzI1OG1YWEZiZjdDcGpHczk0VExVVzlzUkR0TDJ1eTh2SEIvWVk5bGNaN2o1MXMrK3RQcHZrNVJQUTZCalN2NkhHRWpJQUU4a1hBV2cvbk9xM0xGamFOd29JYU1LTGMwdGxybHVzMDA4VWZ1Qm9FSTc2eWFtSFR0VkNXcXpCMjhRbm9CRGt2MUhTQWcrVFcydEtNNmI1Tmg3OGxnMlZZcFhqZU9NN2RRVnJDS0ZBQ1l0OXdXSkJoRFVvUTNiS0pSaVdFNVBBRnlxdlpKMkRFR0JsM3I1bThzSG5xbXJrVmoyVS9nZnpIR0todTN0YVdwdXNoR042WVJmNVJNa1ZMQU8yVWZqRFIvK1cweGU4ZkZ3UWlnYXBCVUNCL2t5d1VOQ3FmUTZmOVVpbFVQSG1OKzl3Uk1OcWNqdGh2dHFQNHFMVXI5c2ZiUDR2emgvMm02SWJFQjBKamJYMGp1dEhsL01iWU0vK0JFaEFvVTJjbmNXQmc3OGExMVJGZkEzdkpzTndmSFlGSkM1cnN1TThZR3hvRGlyWXN1aFVRT3czNTVUZTNWMWkveVMwY2p1OWQrYTNJVnN4QnFTd0p5YzMydWpVeTFXR244em5WN2VwQVByLzYxWmx3TXBPRnZJZFFoUEVHODI0QlZyQjJkbDNuWmh2djA1ZnNLSThyM2JkZEh3aVVhdGw1azNrNktHOFBSVVhGM2c5WFRqODdtcEtrRksyZFRUOHB3eWx1WFU1c1dVeXFhM29GZnMvcWNsbEUyMlY4OHFKdEY2NlprMWd0QmgwQy85S205VGRGTzRaM3Uyd3d1WitSTDVQN1FBbElGNFlwaDllc2VMdXNhc203cDRtNDdHc2RvSGFsdVBQRUg0RldSd3YxZnJtcFhQejJ0b2JacDlsWmk3NDJxTDhHdGMzN2VKbWxDQWdpMmF0TUYwTklJM1pZcXdCclNkMlpnQlR0ZUJHMmQ1N24rQ0R3QWpKL3ZsRXY3Tjl5dW5BUFhxMHd4MlFESHIxMjhaZ0xPUnptOVZHb1JmNU1jTUFHWnZUakQ1NVhzdlE2NGJVWHE5d3QvNHdSKzQxcmF5cStCMVhzNW0wYjhVN3IySFlORlBwb0JsK1Q0ZjN1QXk4Z3J3emFPaER6d1JPV3FIN3AwUDhSQ2JUdU44UGd5YmVBMklpWHpaUXBadlBMWmdveGVlRzJNNkVrNDhoOENDOC84N1BJaFkwejIxdmdkWTI0MjE2ZWJXaU1yeXNCVTVyTkVYWWxYSy90QXIycTJ6Wk0xOVJ6ZlJ4NEFSSEs0VWg2anAraUQ3ZHZDcXdtRW53QnlmSER3ZWlEVFlBQ0V1enlMYmk3d3hKSm5wRWlPZ0JzRzZUWE53cElyeGNCTTlDVmdMZjJzSlR6MGIxN2RkZnJ2WFVjV04yeHQ0QXkzWjRUd0R5UVczc2VTM1ppWUEyU0hZNk1KYUFFS0NBQkxWamVWbllJVUVDeXc1R3hCSlFBMnlBOUs5anpoVlNqTUNmTGhmbnF5N0JnZmExbjBXVW5OUEp6QXZMMUdlUW5BaU9OdDZVS1AyMTBkRjkyWWkrdVdDZ2dSMUhlK0ZobWVkeUkyL0R3WGR3NVk5RWFFVXZWb0tUOG9lNXFjSGNVOGZjb2lKSGpZTGowZlZqTTJpOUxKU1pXdXZFL1krYnhMWkRqRFQyS3V3Z0RVOFU2aWtLUEszbTlKeHhZbXhxMnBvMTRJTmVqM3g3cnE1bEtmUDhRZGtTOXM4RktlUVRXcmJvZGd0RWZlWHJiS0xVYStXcUcyY1lnZkJmK0xpd1JPYWgzY2xhNHFiSUc4VmwyK0ZZR1ZsdzNVMjB3cVZTMU1LNWRvZ2JyWm9sTDhWRGVnWWZ6NjVoVUIydFVuZmVaalBpdzUzUjh2c0FhWmo2UDR6a3dIWTlEOVNzVnh2a0ZoT1FNNFpxcE1NRmRidlBMTFRNQ3JFRXk0OVRwSytTRVJub25VbXhQQ29jOXg1S2ZqNkJXc2FQQUpmald3U21lbnp6L0dlT2VZWk5VeHRSL0pLQ3lIWVhzZllESFNKWEllNTd6VmNqSlVVQjhscDRyVGNjM3p1VUFKVlhud2dUNElNOWcxQ21sTmpxTmorWDRqRFlyM3FGT2VYa3pTa2E2UnVnS05OYXg0UXRidlpLdnJua3B0R01LaU84U00rOWF2UjZOOHpJc0Rmb1RmRmp0a3hDTzg2QmUvY1RPZk1PQzFiK0grZkJ1MzlGbUlRRFdwSHJhUm9OZXJDdVFwNjhZRng4TU12SktkQnhNOGFJM3huUFBRbEpGRTBYZUJNUk8wcDlVdStXV1FpZnJOY1dsdUJYM0VZVlFqRWJqOXo0OGtUOUhBLzJUc0I5cWhmc1BlK3NlMGV5eHE4aGJJVUM3dzN3UGV0OS9vazAwRDNsek1QOFBhcGZuMWx2Wks4aDA4eVlnejcvYU5CTU54MXNuTDlneXVpQkpkY20wRlBvbDZhZ3JvYlA4RGcvZWJ2eDI0cmdSamZhdlliMmFUVjI4NXYwUXl4dGNENkZZaE44bUNHd2JmbStpeHJzTGl0OFA4cDZaQUNTWWwxNHM3d09SdW5VK0tuK3BwYmdiM0Q1WDhPeTB1eGsxaUYyb3pyc1ZIT01aekh2SDFTRVlIWWxQY0FweFgrS1h5QnVFbDl0UkVzaExEYkpidDk1bysrSnRIcUVmWDFSVjIzVDVVZWFYd1VnZ3J3UnlMaUNWaTdhZEFyV2pCaSt4S0JxTDM3VjNoL2ZhWFFldmFKSFh1MlppSkpBaGdad0xDQll6L2hFa29nelYvR0pNaHZreDh2VTBHbzBqdDdVMXo4b3dqL1JHQXIxR0lHZHRFTys3Z0ZGekI0VGhhK2lCLzBDRSt5VjZkMEx5QmhFM3oyaGg3b1NxTmFSUFdmbWRSL054bWw0anhvU0xpa0RXYTVESlM3ZjF4WU0vMzBURlJyUTNya2JOc1FjOUtkK3BuelZnbHlYYk1DZnlMQVlMckxBNE1GNzYzdjREK3pkWDFUYi9uZjJ5VUZHUjU4MFdCSUdzQ1FocUNsbFoxM3lOYm91L2hRZi9CeENPRWdqR1lxY3M5UEdHbW9yN3U5S29yNm40Zmlna3owSy8vUDBRb0lINGRQSGRtMDN6SHl0cm03OHgzMkIxY0c0a2NJd1F5SnFLTmJsMjYyM281OFR5OTRrTkk4clY5ZFVWOTNaM242dG5SK3g0d1ZjeGVQZ1d3dHdFQVRzRnpmZGZQVmZYOUJlNGZtTjM0WGlkQlBKSklHdHY2N1h6S200SkNlY1MxQnJlcENHajlaTEtCVTBQUU4wYWViZ2JtbFM3OVRQNEZ0MVRxR2x1OHR5bDNLQWNPYjZoWmdTRjQzREFlSzFYQ0dSTlFHenVWODhidnE1OGFNVjVTc25yb0Q2OWh4cGhLaHJqdjUrMFlFdEtqNVZkMWg2V3A5WWtZaXhHZVRIaXE3NksydWJDdFhNajYyMDgzRWpnV0NHUVZRR3hOMlZYM3NhSGEzN3VITmRucEZUaW55QUFDclhLWFpmZnUvMGs2NDV2Q0k2SE92Vk5DTkF1SmNXYzRYMHF6ckp0RkpockpMVXo2NDBiQ1J3VEJMTFdCam40YmxiUEdHem5RTitFMnVKa0NNU01hRFIyTTg2clVhdmNhZjFDYXY1aFRVMWt1VDBPd3VaaXNrV0htVWV2MzQ2ZDFJVmEzUGQzM1hzOTQ4ZGdCckplZ3h4OGo2WGVLbm1ZU0dUTXpNcTZwcitIc1B3bGFvczN5NFpXckRqWWJ5R2ZBMlFkT3ZKcWUvc2V0SkF6MEkzK0tDeXlwdmQyWG9LUWZzNEZaRlYxUmJNeWNpSDBKOHkwTTNZazNjN2N1U21mSDBISlQwR1pBVWhuTE93eHgrVW52VU5Ud1VMMlE2R296ckF1c0RidWU2Z1BYdkZMSU9jQ1lqTmtTdnI5Q0xaWTNpUWl0RW1lcmErT3JQS2IwV1BlditNczgrNVZpRmxXM2VxTi9FSzFtb04wU3l4cmpNS3U3STA4QkMzTnZCU2tONHF1WktMdG9ZUm5zQmcwa0ZLN1QrSlY4REx1NjJPT2tOL08rLzBaTlFHZllyN1VTMWZLNVpnYW5QSVIwN3puSnlBSjVrVkFMS3UrUTBRZGVyT1dyNm1PUEJFUWRvZmVocU51eDhVRCtNM0ErTTRGaDNySXpSVk1SS3ZBUEJ2YkNRTEU4aFgwRUxMMnlCTHF2QW5JeXVtUkF4anJ1QzVMK1Q0bW81RmF2d01MZ2pzeDl3VTkyUExIYUN5Zm1ldU1ZaUdHazZXUmk3Q0s0bkVRanQxU3VEZGlHckNiNjNTTEpmNjhDWWdGV2hSakhVWmo3cmY1TlRvbCtrUGxXWUxlcExOeTlURFpScmsyYWlrRXNnSnAyTThqL3lOcUV3elFjc3NXZ2J3S1NMWXlYUUR4M0lPRzhtK3NrRmkxRXZhWFg4bDZucVZ6a1k3clh5TmVUempRTTNnRGx4Yk5PbVdNMTNITERRRnBmb3FJbCtLdGpzRllyREFpbkFWWUgvZTBIaWVHNVVQUlNYWXpiTjN1c1FLSVdua25hcXhxcUZyUDlEaHVSbkFJZ1p5TnBCK1NVaEZld0lQN2M2eVhhM3UyYmtlNzRMTlFNc2RvNmRURERtMlZJOFRyZnBCb2pjWGdsSmdxWFRzQWFQb2t3c3Juc1l6aXpVSUxiOEU0UC9IUmIyWUVLQ0NaY1RwcVh3bTF4MHpEbTk3MmJFMUhZM29LYXBVcGVQdS9BNEY1Q3FyWTY4SlJmNERBN0hSMTNQdUFwWkpPV0V0MXZORHVKekJkZVJUVUoxZ2ZtSE03RmxCQk1CaUNLZ2RUQ2R4NkRMNGlLbTY1SWtBQnlSWFpsSGpsWHB6ZUl4M25mdUc2bUlJcy9ocFA5YW1vQ1U3MW5tN1hGWEhQdjR4aEYzZU5SZzFoVisvcDJEcEVBTHROV1BqaVFRakdBeENNOXFRejk3a2pRQUhKSGR0RFk5YnhyWGo3LzlRNGFnRVdzNERLcFM3QTZvZWowTnQxQmp6YnNnaDMvQkpoamRtSHhlaGVReS9WcTBxR01IY205aWFFQ202b2Q3amxoUUFGSkMrWVV4T1IwS1hRdTdVZUQvdDZ1MUFZREF4aDNHejZPMUNyOE9pajlsQjdsWGIzdUVwZ05CeXVDQTdoU0kyRVoza2hRQUhKQytiMGlYU1l5ZS9HdHoxMko3UXBMVnhXRXVtaDVjbVYzYng1QXMxa0NwTUFCYVF3eTQyNXpoTUJDa2llUURPWndpUkFBU25NY21PdTgwU0FBcEluMEV5bU1BbFFRQXF6M0pqclBCRUl2SUM0bUtTUko1WkZtMHlrZEU5Z0dRZGVRTXAxbjlhaWZYTHpjT09PVWJGbE15OEk3Q2htNEFYazdGRkRka25wSmt5ZDh2REFGRnNTOFhEOC9TRGZjK0FGWlA1NEdWZmwwYzFPV0FYMkxkZGJEMmhZNjUzMXMwNE45QXpHb2pBMVdUM2p6SDM0RFBVYno3NjJhV0NvdEx5UEExdnkzbnFvZ3BDdWpzZWlvclYxMzRQZlBYT2Z4R2RNZzd3RlNrQmc5V29iaTVoYWdjMm9sSHV6TlFtdTd2RGMrSmNUQXJBajYyU09OMUFnR3U2ZE41UVRZbm1PRktzS2JrUWhuVzJUZFkxN1E5V2labGZHajRGdk0rZVpRMjhraDJXSFRvZko4WmlFc1NVTThwWFoyQnY1eUhhYWdSSVFJMlU5Q3NrVEVGUWhVM1hjVE0wMk1NYlhEWUdrWkZobktmYUtrdEJUM2Znc3FNdUIwc1dkTXVkV0ZNNGJCVlVDQWNzc3BoTnJKZFhjTlRPSEJXS2VmS0FFQklYU2V1TEFFcnQ2L0UveGU5TVdWc0NldjJQMmRqQjlaVGRXZEd6RVhQbHhhNnNyZm5YTVpwUVpJd0VTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTSUFFU0lBRVNJQUVTQ0FxQi93ZE82Z1MzZ0k1VmFBQUFBQUJKUlU1RXJrSmdnZz09XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hc3NldHMvaW1ncy9hcHBseVN1Y2Nlc3MtaWNvbi5wbmdcbi8vIG1vZHVsZSBpZCA9IDRlMTNhOWMzYjFhMDI1MGM1YmIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1M2I3ZDM0ODE3MTQ0YjEyYjBhYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNWU1OWI3MWIzM2EzOGMzNjE4ZTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSkge1xuICB2YXIgQyA9IHR5cGVvZiBjb3JlW0tFWV0gPT0gJ2Z1bmN0aW9uJyA/IGNvcmVbS0VZXSA6IGdsb2JhbFtLRVldO1xuICBpZiAoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkgZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDVlNzQ5MWYxZjc5OTcxNWVhYzc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gNmE0NDJhYjViZDliZDkyOTQ0Nzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLypcclxuICAgQVBJIOaOpeWPo+mFjee9rlxyXG4gICBheGlvcyDlj4LogIPmlofmoaPvvJpodHRwczovL3d3dy5rYW5jbG91ZC5jbi95dW55ZS9heGlvcy8yMzQ4NDVcclxuXHJcbiovXHJcbi8vIGltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCBUb2FzdCBmcm9tICdhbnRkLW1vYmlsZS9saWIvdG9hc3QnO1xyXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuaW1wb3J0IENPTkZJRyBmcm9tIFwiLi9jb25maWdcIlxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qXHJcbiog5bi46YeP5a6a5LmJ5Yy6XHJcbipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZXhwb3J0IGNvbnN0IFV0aWwgPSB3aW5kb3cuVVAuVy5VdGlsO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwcCA9IFVQLlcuQXBwO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVudiA9IFVQLlcuRW52O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCByZWdQaG9uZSA9IC9eKDEzWzAtOV18MTRbNTc5XXwxNVswLTMsNS05XXwxNls2XXwxN1swMTM1Njc4XXwxOFswLTldfDE5Wzg5XSlcXGR7OH0kLztcclxuXHJcbmV4cG9ydCBjb25zdCByZWdQYXlOdW0gPSAvXlswLTldezIwfSQvO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbW9tUGFyYW0gPSB7XHJcbiAgICB2ZXJzaW9uOiBcIjIuMFwiLFxyXG4gICAgc291cmNlOiBcIjJcIlxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIOivt+axguaguOW/g+WMuiDkuIvpnaLov5nlnZfljLrln5/kuK3nmoTku6PnoIHmlLnliqjor7fmhY7ph41cclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmxldCBiYXNlVXJsID0gXCJcIiwgYmFzZVVybDIgPSBcIlwiLCBiYXNlVXJsMyA9IFwiXCI7XHJcbmlmIChsb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCc5NTUxNi5jb20nKSAhPT0gLTEpIHsgLy/nlJ/kuqfnjq/looNcclxuICAgIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9zaGFuZ2h1Ljk1NTE2LmNvbS93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMiA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL21hbGwuOTU1MTYuY29tL2NxcC1pbnQtbWFsbC13ZWIvcmVzdGxldC9cIjtcclxuICAgIGJhc2VVcmwzID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8veW91aHVpLjk1NTE2LmNvbS95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn0gZWxzZSBpZiAobG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignMTcyLjE4LjE3OS4xMCcpICE9PSAtMSkgeyAvL+a1i+ivleeOr+Wig1xyXG4gICAgLy8gYmFzZVVybD1cImh0dHA6Ly8xNzIuMjEuMTAxLjI1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjsgLy/mtYvor5XlrqRhcGFjaGVcclxuICAgIC8vYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuOTU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5byA5Y+R546v5aKDYXBhY2hlXHJcbiAgICBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xNy93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjExL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjEzMy4yNTozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn0gZWxzZSB7XHJcbiAgICAvLyBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS45NTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS4yNTozODIxMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xNy93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjExL3lvdWh1aS13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4xMzMuMjU6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMzMuNTY6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59XHJcbi8qKlxyXG4gKiDpgJrov4flkI7nvIDojrflj5bmnI3liqHlmajnmoTlhajlnLDlnYBcclxuICogQHBhcmFtIHVybFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldFNlcnZVcmwgPSAodXJsKSA9PiB7XHJcbiAgICBsZXQgc2VydmVyVXJsID0gXCJcIlxyXG4gICAgaWYgKHVybCA9PSBDT05GSUcuUkVTVC51c2VySW5mbykge1xyXG4gICAgICAgIHNlcnZlclVybCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICAvLyBlbHNlIGlmICh1cmwuc3BsaXQoXCIvXCIpWzBdID09IFwiYWRkcmVzc1wiKSB7XHJcbiAgICAvLyAgICAgc2VydmVyVXJsID0gYmFzZVVybDJcclxuICAgIC8vIH1cclxuICAgIGVsc2UgaWYgKHVybC5zcGxpdChcIi9cIilbMF0gPT0gXCJzY2FuXCIgfHwgdXJsID09IENPTkZJRy5SRVNULmdldENpdHkpIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsM1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gYmFzZVVybFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZXJ2ZXJVcmw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmoLzlvI/ljJbnu5Pmnpwg5bCG57uT5p6c5qC85byP5YyW5Li6XHJcbiAqIHtcclxuICogICAgIHN0YXR1c0NvZGUgICDlkI7lj7Dlk43lupTnoIFcclxuICogICAgIGRhdGEgICAgICAgICDlkI7lj7Dov5Tlm57nmoTmlbDmja5cclxuICogICAgIG1zZyAgICAgICAgICDlkI7lj7DnmoTmj5DnpLrkv6Hmga9cclxuICogfVxyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKiBAcmV0dXJucyB7e3N0YXR1c0NvZGU6IChzdHJpbmd8KiksIGRhdGE6ICosIG1zZzogKn19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVzcG9uc2VGb3JtYXR0ZXIgPSAoZGF0YSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnJlc3AsXHJcbiAgICAgICAgZGF0YTogZGF0YS5wYXJhbXMsXHJcbiAgICAgICAgbXNnOiBkYXRhLm1zZ1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8vIOWIoOmZpOW6lemDqCAnLydcclxuZnVuY3Rpb24gZGVsZXRlU2xhc2goaG9zdCkge1xyXG4gICAgcmV0dXJuIGhvc3QucmVwbGFjZSgvXFwvJC8sICcnKTtcclxufVxyXG5cclxuLy8g5re75Yqg5aS06YOoICcvJ1xyXG5mdW5jdGlvbiBhZGRTbGFzaChwYXRoKSB7XHJcbiAgICByZXR1cm4gL15cXC8vLnRlc3QocGF0aCkgPyBwYXRoIDogYC8ke3BhdGh9YDtcclxufVxyXG5cclxuLy8g6Kej5p6Q5Y+C5pWwXHJcbmZ1bmN0aW9uIHNlcGFyYXRlUGFyYW1zKHVybCkge1xyXG4gICAgY29uc3QgW3BhdGggPSAnJywgcGFyYW1zTGluZSA9ICcnXSA9IHVybC5zcGxpdCgnPycpO1xyXG5cclxuICAgIGxldCBwYXJhbXMgPSB7fTtcclxuXHJcbiAgICBwYXJhbXNMaW5lLnNwbGl0KCcmJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBpdGVtLnNwbGl0KCc9Jyk7XHJcblxyXG4gICAgICAgIHBhcmFtc1trZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge3BhdGgsIHBhcmFtc307XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKXtcclxuICAgIGxldCB7bWV0aG9kLCB1cmwsIGRhdGEgPSB7fX0gPSBjb25maWc7XHJcbiAgICBtZXRob2QgPSAobWV0aG9kICYmIG1ldGhvZC50b1VwcGVyQ2FzZSgpKSB8fCAnR0VUJztcclxuXHJcbiAgICBsZXQgc2VydmVyVXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6MzAwMC8nO1xyXG4gICAgbGV0IGZpbmFsVXJsID0gc2VydmVyVXJsICsgdXJsO1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdXJsOmZpbmFsVXJsLFxyXG4gICAgICAgICAgICB0eXBlOm1ldGhvZCxcclxuICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09ICcyMDAnKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlRm9ybWF0dGVyKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjpmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCfor7fmsYLlpLHotKUnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICBpZiggbWV0aG9kID09PSAnUE9TVCcgKXtcclxuICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICAgb3B0aW9ucy5kYXRhVHlwZSA9ICdqc29uJ1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICQuYWpheChvcHRpb25zKTtcclxuICAgIH0pXHJcbiAgICBcclxufVxyXG5cclxuLy8g5Li76KaB6K+35rGC5pa55rOVXHJcbi8vIGV4cG9ydCAgZnVuY3Rpb24gcmVxdWVzdE9yaWdpbihjb25maWcpIHtcclxuXHJcbi8vICAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuLy8gICAgIGNvbnN0IHVpID0gVVAuVy5VSTtcclxuLy8gICAgIGNvbnN0IGVudiA9IFVQLlcuRW52O1xyXG5cclxuLy8gICAgIGxldCB7bWV0aG9kLCB1cmwsIGRhdGEgPSB7fSwgaGVhZGVycywgZm9yQ2hzcCwgZW5jcnlwdCwgYnlBamF4LCBjYWNoZSwgdXBkYXRlLCBzdG9yYWdlfSA9IGNvbmZpZztcclxuXHJcbi8vICAgICBtZXRob2QgPSAobWV0aG9kICYmIG1ldGhvZC50b1VwcGVyQ2FzZSgpKSB8fCAnR0VUJztcclxuXHJcbi8vICAgICBsZXQgc2VydmVyVXJsID0gZ2V0U2VydlVybCh1cmwpO1xyXG5cclxuLy8gICAgIC8vIGxldCBzZXJ2ZXJVcmwgPSBiYXNlVXJsIDtcclxuLy8gICAgIC8vIGlmICh0cnVlKSB7XHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOmAmui/h+aPkuS7tuWPkemAgeivt+axglxyXG4vLyAgICAgICovXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDlkJHmnI3liqHlmajlj5HpgIHor7fmsYJcclxuLy8gICAgICAqIEBwYXJhbSBwYXJhbXMg6K+35rGC5Y+C5pWwXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHZlcnNpb27vvJrniYjmnKzvvIzpu5jorqTmmK8xLjBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgc291cmNl77ya5p2l5rqQ77yM6buY6K6k5qC55o2uQW5kcm9pZOOAgWlPU+iHquWKqOa3u+WKoFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBlbmNyeXB077ya5piv5ZCm5Yqg5a+G77yM6buY6K6k5Yqg5a+GXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIG1ldGhvZO+8muivt+axguaWueazle+8jFBPU1TmiJZHRVRcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgY21k77ya6K+35rGC5ZG95Luk77yI5Lmf5Y+v6Ieq6KGM5bCGY21k57uE6KOF6IezdXJpW+S8mOaDoOWQjuWPsF3miJZwYXRoW+mSseWMheWQjuWPsF3vvIlcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdXJpL3BhdGjvvJror7fmsYLlnLDlnYDvvIzlu7rorq7ku4XloavlhYVjbWTvvIzkuI3lu7rorq7oh6rooYznu4Too4V1cmkvcGF0aFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBwYXJhbXPvvJrlj5HpgIHnu5nlkI7lj7DnmoTlj4LmlbBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdmlk77ya5aaC5p6c6YCa6L+HQWpheOaWueW8j+WQkXdhbGxldOWQjuWPsOWPkemAgeivt+axgumcgOimgeaQuuW4pnZpZFxyXG4vLyAgICAgICogQHBhcmFtIGZvckNoc3Ag5piv5ZCm5ZCR5LyY5oOg5ZCO5Y+w5Y+R6YCB6K+35rGC77yI6buY6K6k5ZCR5omL5py65ZCO5Y+w5Y+R6YCB6K+35rGC77yJXHJcbi8vICAgICAgKiBAcGFyYW0gYnlBamF4IOaYr+WQpuS9v+eUqEFqYXjlj5HpgIHor7fmsYLvvIjpu5jorqTkvb/nlKjmjqfku7bvvIlcclxuLy8gICAgICAqIEBwYXJhbSBzdWNjZXNzIOaIkOWKn+Wbnuiwg1xyXG4vLyAgICAgICogQHBhcmFtIGVycm9yIOmUmeivr+Wbnuiwg++8iOS4muWKoemUmeivr++8iVxyXG4vLyAgICAgICogQHBhcmFtIGZhaWwg5aSx6LSl5Zue6LCD77yI6K+35rGC5aSx6LSl77yJXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbi8vICAgICAgICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG5cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBzdWNjZXNzQ2FsbGJhY2sgPSAoZGF0YSxmdWMpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+U5Zue5oiQ5Yqf57uT5p6c77yaXCIpXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJlc3BvbnNlRm9ybWF0dGVyKGRhdGEpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWYoICEhZnVjICl7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVxLmZ1YyA9IGZ1YztcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIHJlc29sdmUocmVxKVxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgZXJyb3JDYWxsYmFjayA9IChlcnIpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+U5Zue5aSx6LSl57uT5p6c77yaXCIpXHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHVybCA9PSBDT05GSUcuUkVTVC5hcHBseU1jYyB8fCB1cmwgPT0gQ09ORklHLlJFU1QuYXBwbHlNYXQgfHwgdXJsID09IENPTkZJRy5SRVNULnRvZGF5TW9uZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBsZXQgcmVxID0gcmVzcG9uc2VGb3JtYXR0ZXIoZXJyKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcSlcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIFRvYXN0LmluZm8oZXJyLm1zZyB8fCAn5p+l6K+i5Lia5Yqh6KaB57Sg5Ye66ZSZ77yM6K+356iN5ZCO5YaN6K+V77yBJyk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBuZXR3b3JrQ2FsbGJhY2sgPSAoeGhyKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBUb2FzdC5pbmZvKHhoci5tc2cpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKHVybCAhPSBDT05GSUcuUkVTVC5nZXRUb2RheUluY29tZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuc2hvd0xvYWRpbmcoKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKCFjYWNoZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVcmw6XCIgKyB1cmwpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBhcmFtOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coe1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBlbmNyeXB0OiBlbmNyeXB0LFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGZvckNoc3A6IGZvckNoc3AsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgYnlBamF4OiBieUFqYXhcclxuLy8gICAgICAgICAgICAgICAgIC8vIH0pXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWPkemAgemdnue8k+WtmOivt+axglwiKVxyXG4vLyAgICAgICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlKFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVyaTpzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9LCBmb3JDaHNwLCBieUFqYXgsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgbmV0d29ya0NhbGxiYWNrKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2FjaGVVcmw6XCIgKyB1cmwpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN0b3JlYWdl562W55Wl5pivOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3RvcmFnZSlcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXBkYXRl5Ye95pWwOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXBkYXRlKVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHnvJPlrZjor7fmsYJcIilcclxuLy8gICAgICAgICAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAgICAgICAgICog5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gcGFyYW1zIOivt+axguWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2ZXJzaW9u77ya54mI5pys77yM6buY6K6k5pivMS4wXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNvdXJjZe+8muadpea6kO+8jOm7mOiupOagueaNrkFuZHJvaWTjgIFpT1Poh6rliqjmt7vliqBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgZW5jcnlwdO+8muaYr+WQpuWKoOWvhu+8jOm7mOiupOWKoOWvhlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBtZXRob2TvvJror7fmsYLmlrnms5XvvIxQT1NU5oiWR0VUXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGNtZO+8muivt+axguWRveS7pO+8iOS5n+WPr+iHquihjOWwhmNtZOe7hOijheiHs3VyaVvkvJjmg6DlkI7lj7Bd5oiWcGF0aFvpkrHljIXlkI7lj7Bd77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHVyaS9wYXRo77ya6K+35rGC5Zyw5Z2A77yM5bu66K6u5LuF5aGr5YWFY21k77yM5LiN5bu66K6u6Ieq6KGM57uE6KOFdXJpL3BhdGhcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgcGFyYW1z77ya5Y+R6YCB57uZ5ZCO5Y+w55qE5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZpZO+8muWmguaenOmAmui/h0FqYXjmlrnlvI/lkJF3YWxsZXTlkI7lj7Dlj5HpgIHor7fmsYLpnIDopoHmkLrluKZ2aWRcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBmb3JDaHNwIOaYr+WQpuWQkeS8mOaDoOWQjuWPsOWPkemAgeivt+axgu+8iOm7mOiupOWQkeaJi+acuuWQjuWPsOWPkemAgeivt+axgu+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGJ5QWpheCDmmK/lkKbkvb/nlKhBamF45Y+R6YCB6K+35rGC77yI6buY6K6k5L2/55So5o6n5Lu277yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gc3VjY2VzcyDmiJDlip/lm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBlcnJvciDplJnor6/lm57osIPvvIjkuJrliqHplJnor6/vvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBmYWlsIOWksei0peWbnuiwg++8iOivt+axguWksei0pe+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHVwZGF0ZSDlvILmraXliLfmlrDlm57osIMg5aaC5p6c6K6+572uYXN5bmPkuLp0cnVl5ZCO5Y+v5Lul5re75YqgdXBkYXRl5Zue6LCDIOWmguaenOS4jeWhq+WGmem7mOiupOS7pXN1Y2Nlc3Pov5vooYzlpITnkIZcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBzdG9yYWdlIOe8k+WtmOWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBuZWVkU3cgICAgICAgICAgICAvL+m7mOiupGZhbHNl5aSn6YOo5YiG55So55qE5piv5o+S5Lu26ZyA6KaB55qE5omL5Yqo5Y675YqgXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHN0b3JhZ2VUeXBlICAgICAgLy/pu5jorqTkvb/nlKhsb2NhbHN0b3JhZ2VcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgYXN5bmMgICAgICAgICAgICAvL+m7mOiupOiOt+WPlue8k+WtmOWQjuS4jeWPkeivt+axgu+8jOaUueS4unRydWXlkI7kvJrlvILmraXljrvor7fmsYLlkI7lj7DlubbliLfmlrDmlbDmja5cclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgZW5kT2ZTeW5jRnVuYyAgICAvL3RvZG8g6YeN6KaB77yB77yB77yB77yB5Zue6LCD5Lit5aaC5p6c5a2Y5Zyo5byC5q2l77yI5o+S5Lu2562J77yJ6ZyA6KaB5qCH5piO5byC5q2l54q25oCB5Li6dHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2YWxpZGF0ZVRpbWUgICAgIC8v5pyJ5pWI5pyf6buY6K6k5peg6ZmQ5pyJ5pWI5pyfIOWNleS9jeavq+enklxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlV2l0aElkICAgICAgIC8v6buY6K6kdHJ1ZeS7peeUqOaIt2lk6L+b6KGM5a2Y5YKo5ZCm5YiZZmFsc2Xku6Vsb2NhbOWtmOWCqFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlU3VjYyAgICAgICAgIC8v5L+d5a2Y5oiQ5Yqf5ZCO55qE5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVFcnIgICAgICAgICAgLy/kv53lrZjlpLHotKXlkI7nmoTlm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgcm9sbEtleSAgICAgICAgICAvL+W8uuWItuiuvue9ruS4u+mUrlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzZWNvbmRLZXkgICAgICAgIC8v5by65Yi26K6+572u5qyh6KaB6ZSu5YC8XHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDph43opoHor7TmmI4g6LCD55So5byC5q2l5qih5byP77yIYXN5bmPorr7nva7kuLp0cnVl77yJ5ZCO5Y+v6IO95Zyoc3VjY2Vzc+Wbnuiwg+mHjOWtmOWcqOW8guatpeaTjeS9nO+8jOivpeaDheWGteS4i+WbnuWvvOiHtOe8k+WtmOeahOWbnuiwg+WPr+iDvVxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g5pyq5omn6KGM5a6M5oiQ77yM6K+35rGC55qE5Zue6LCD5Y+I5byA5aeL5omn6KGM5LqG55qE5oOF5Ya177yM5omA5Lul5oiR5Lus57uf5LiA5Zyoc3VjY2Vzc+Wbnuiwg+WSjHVwZGF0ZeWbnuiwg+eahOWFpeWPguWinuWKoOS6huesrOS6jOS4quWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g55So5LqO5YW85a655Zue6LCD5YaF5YyF5ZCr5byC5q2l55qE54q25Ya177yM5L2/55So5pa55rOV5Li677ya6aaW5YWI6K6+572uZW5kT2ZTeW5jRnVuY+WPguaVsOS4unRydWUs5YW25qyhc3VjY2Vzc+WSjHVwZGF0ZeWbnlxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g6LCD5YaF5Lya5pyJMuS4quWFpeWPgu+8jHN1Y2Nlc3PvvIhyZXNw77yMZnVj77yJ77yM6K+35Zyo5Luj56CB6Zet5YyF5aSE5L2/55SoZnVjLmVuZE9mRnVuYygpXHJcbi8vICAgICAgICAgICAgICAgICAgKi9cclxuXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgcGFyYW0gPSB7fVxyXG5cclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoYnlBamF4KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFyYW0gPSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBcImxpZmUvbGlmZVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFyYW0gPSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cmk6c2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZVdpdGhTdG9yYWdlKHBhcmFtLCBmb3JDaHNwLCBieUFqYXgsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgbmV0d29ya0NhbGxiYWNrLCBzdG9yYWdlLCB1cGRhdGUpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICB9KVxyXG5cclxuXHJcbi8vICAgICAvLyB9XHJcbi8vICAgICAvLyBlbHNlIHtcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOmAmui/h0FqYXgg5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKi9cclxuLy8gICAgIC8vIHJldHVybiBheGlvcyh7XHJcbi8vICAgICAvLyAgICAgdXJsOiBiYXNlVXJsICsgdXJsLFxyXG4vLyAgICAgLy8gICAgIG1ldGhvZCxcclxuLy8gICAgIC8vICAgICBoZWFkZXJzLFxyXG4vLyAgICAgLy8gICAgIGRhdGE6IG1ldGhvZCA9PT0gJ0dFVCcgPyB1bmRlZmluZWQgOiBkYXRhLFxyXG4vLyAgICAgLy8gICAgIHBhcmFtczogT2JqZWN0LmFzc2lnbihtZXRob2QgPT09ICdHRVQnID8gZGF0YSA6IHt9LCBwYXJhbXMpXHJcbi8vICAgICAvLyB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4vLyAgICAgLy9cclxuLy8gICAgIC8vICAgICBsZXQgcmVxID0ge1xyXG4vLyAgICAgLy8gICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5kYXRhLnJlc3AsXHJcbi8vICAgICAvLyAgICAgICAgIGRhdGE6IHJlc3BvbnNlLmRhdGEucGFyYW1zXHJcbi8vICAgICAvLyAgICAgfVxyXG4vLyAgICAgLy8gICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVxKVxyXG4vLyAgICAgLy8gfSkuY2F0Y2goZXJyID0+IHtcclxuLy8gICAgIC8vICAgICAvLyDor7fmsYLlh7rplJlcclxuLy8gICAgIC8vICAgICBUb2FzdC5pbmZvKCdyZXF1ZXN0IGVycm9yLCBIVFRQIENPREU6ICcgKyBlcnIucmVzcG9uc2Uuc3RhdHVzKTtcclxuLy8gICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcclxuLy8gICAgIC8vIH0pO1xyXG4vLyAgICAgLy8gfVxyXG5cclxuLy8gfVxyXG5cclxuLy8g5LiA5Lqb5bi455So55qE6K+35rGC5pa55rOVXHJcbmV4cG9ydCBjb25zdCBnZXQgPSAodXJsLCBkYXRhLCBwYXJhbSA9IHt9KSA9PiB7XHJcbiAgICBsZXQgcGFyYW1BbGwgPSBPYmplY3QuYXNzaWduKHtmb3JDaHNwOiB0cnVlLCBlbmNyeXB0OiB0cnVlLCBjYWNoZTogZmFsc2UsIGJ5QWpheDogZmFsc2V9LCBwYXJhbSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdChPYmplY3QuYXNzaWduKHt1cmwsIGRhdGF9LCBwYXJhbUFsbCkpXHJcbn07XHJcbmV4cG9ydCBjb25zdCBwb3N0ID0gKHVybCwgZGF0YSwgcGFyYW0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IHBhcmFtQWxsID0gT2JqZWN0LmFzc2lnbih7Zm9yQ2hzcDogdHJ1ZSwgZW5jcnlwdDogdHJ1ZSwgY2FjaGU6IGZhbHNlLCBieUFqYXg6IGZhbHNlfSwgcGFyYW0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QoT2JqZWN0LmFzc2lnbih7bWV0aG9kOiAnUE9TVCcsIHVybCwgZGF0YX0sIHBhcmFtQWxsKSlcclxufTtcclxuZXhwb3J0IGNvbnN0IHB1dCA9ICh1cmwsIGRhdGEpID0+IHJlcXVlc3Qoe21ldGhvZDogJ1BVVCcsIHVybCwgZGF0YX0pO1xyXG5leHBvcnQgY29uc3QgZGVsID0gKHVybCwgZGF0YSkgPT4gcmVxdWVzdCh7bWV0aG9kOiAnREVMRVRFJywgdXJsLCBkYXRhfSk7XHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICog5Yqf6IO95Ye95pWw5Yy6XHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICog5bCGVVJM5Lit55qEc2VhcmNoIOWtl+espuS4siDovazmjaLmiJAg5a+56LGhXHJcbiAqIEBwYXJhbSBzZWFyY2hcclxuICogQHJldHVybnMge3t9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldFNlYXJjaFBhcmFtID0gKHNlYXJjaCkgPT4ge1xyXG4gICAgaWYgKCEhc2VhcmNoKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IHNlYXJjaC5zbGljZSgxKTtcclxuICAgICAgICBsZXQgYXJyYXkgPSBzdHIuc3BsaXQoXCImXCIpO1xyXG4gICAgICAgIGxldCBvYmogPSB7fTtcclxuICAgICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbSA9IGl0ZW0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICBvYmpbcGFyYW1bMF1dID0gcGFyYW1bMV07XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICogY29kb3ZhIOaPkuS7tuiwg+eUqOWMulxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcblxyXG4vLyDlkK/lgZzmlLbmrL7noIFcclxuZXhwb3J0IGZ1bmN0aW9uIHNldFhpYW9XZWlQYXkocGFyYW0sIHN1YywgZXJyKSB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5zZXRYaWFvV2VpUGF5KHBhcmFtLCBzdWMsIGVycik7XHJcbn1cclxuXHJcbi8v5bCP5b6uYXVkaW9cclxuZXhwb3J0IGNvbnN0IHNldFhpYW9XZWlBdWRpbyA9IChwYXJhbSwgc3VjLCBlcnIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnNldFhpYW9XZWlBdWRpbyhwYXJhbSwgc3VjLCBlcnIpO1xyXG59XHJcbmV4cG9ydCBjb25zdCBnZXRYaWFvV2VpQXVkaW8gPSAoc3VjLCBlcnIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmdldFhpYW9XZWlBdWRpbyhzdWMsIGVycik7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0b2FzdCA9IChtcykgPT4ge1xyXG4gICAgVG9hc3QuaW5mbyhtcywgMik7XHJcbn1cclxuLyoqXHJcbiAqIOiuvue9rumhtumDqGJhclxyXG4gKiBAcGFyYW0gdGl0bGUg6aG16Z2i5ZCN56ewXHJcbiAqIEBwYXJhbSByaWdodEJhciDlj7PkvqfmjInpkq7lkI3np7BcclxuICogQHBhcmFtIHJpZ2h0Q2FsbGJhY2sg5Y+z5L6n5oyJ6ZKu5Zue6LCDXHJcbiAqIEBwYXJhbSByaWdodEJhckltZyDlj7PkvqfmjInpkq7lm77niYdcclxuICovXHJcbmV4cG9ydCBjb25zdCBiZWZvcmVFbnRlclJvdXRlciA9ICh0aXRsZSA9IFwiXCIsIHJpZ2h0QmFyID0gXCJcIiwgcmlnaHRDYWxsYmFjayA9IG51bGwsIHJpZ2h0QmFySW1nID0gbnVsbCkgPT4ge1xyXG4gICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUodGl0bGUpXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u56qX5Y+j5Y+z5L6n5oyJ6ZKuXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlIOWbvuagh+agh+mimFxyXG4gICAgICAgICAqIEBwYXJhbSBpbWFnZSDlm77moIfmlofku7ZcclxuICAgICAgICAgKiBAcGFyYW0gaGFuZGxlciDngrnlh7vlm57osIPlh73mlbBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoISFyaWdodENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24ocmlnaHRCYXIsIHJpZ2h0QmFySW1nLCByaWdodENhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJSaWdodEJ1dHRvbihcIlwiLCBudWxsLCBudWxsKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIOmAmuefpeWuouaIt+err+S/ruaUueeKtuaAgVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1jY1N0YXRlQ2hhbmdlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5tY2NTdGF0ZUNoYW5nZWQoKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNlbmRRckNvZGUgPSAocGFyYW1zLCBzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmiavmj4/mnaHnoIHlkozkuoznu7TnoIFcclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3NcclxuICAgICAgICAgKiBAcGFyYW0gZmFpbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5zY2FuUVJDb2RlKHBhcmFtcywgc3VjY2VzcywgZmFpbClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjbG9zZVdlYlZpZXcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5jbG9zZVdlYlZpZXcoKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHZlcmlmeVBheVB3ZCA9IChwYXJhbSwgc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAudmVyaWZ5UGF5UHdkKHBhcmFtLCBzdWNjZXNzLCBmYWlsKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVdlYlZpZXcgPSAodXJsLCBwYXJhbXMgPSBudWxsLCB0aXRsZSA9ICcnLCBpc0ZpbmlzaCA9IFwiMVwiKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5jcmVhdGVXZWJWaWV3KHVybCwgcGFyYW1zLCB0aXRsZSwgaXNGaW5pc2gpXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFVzZXJEZXRhaWxJbmZvID0gKHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5nZXRVc2VyRGV0YWlsSW5mbyhzdWNjZXNzLCBmYWlsKVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5bCGY2F2YXMg5L+d5a2Y5Yiw5pys5Zyw55u45YaMXHJcbiAqIEBwYXJhbSBjYW52YXNcclxuICovXHJcbmV4cG9ydCBjb25zdCBzYXZlUWNvZGUgPSAoY2FudmFzKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciB1aSA9IFVQLlcuVUkgfHwge307XHJcbiAgICB2YXIgcGljVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFwcC5sb2dFdmVudCgnc2F2ZVBpY3R1cmVfTmV3WWVhckFjdCcpO1xyXG4gICAgICAgIGFwcC5zYXZlUGljVG9Mb2NhbCh7XHJcbiAgICAgICAgICAgIHVybDogcGljVXJsICYmIHBpY1VybC5zdWJzdHIoMjIpXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB1aS5zaG93VG9hc3RXaXRoUGljKCflt7Lkv53lrZjliLDns7vnu5/nm7jlhownKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgIGlmIChtc2cgPT0gJ3VwZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dBbGVydCgn6K+35Y2H57qn5Yiw5pyA5paw5a6i5oi356uvJywgZnVuY3Rpb24gKCkgeyAvLyDljrvljYfnuqdcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ1llcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW52LmlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL2l0dW5lcy5hcHBsZS5jb20vY24vYXBwL2lkNjAwMjczOTI4P2NvZGU9bmV3WWVhckFjdGl2aXR5JztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b3VodWkuOTU1MTYuY29tL2FwcC9hcHAvc29mdHdhcmUvdW5pb25wYXktd2FsbGV0LXYyLmFwaz9jb2RlPW5ld1llYXJBY3Rpdml0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLm9wZW5Ccm93c2VyKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdObycpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ+mprOS4iuWNh+e6pycsICfnqI3lkI7lho3or7QnLCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93VG9hc3QobXNnIHx8ICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2hhcmUgPSAodGl0bGUsIGRlc2MsIGltZ1VSTCwgcGFnZVVSbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgZW52ID0gVVAuVy5FbnYgfHwge307XHJcblxyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmmL7npLrliIbkuqvpnaLmnb9cclxuICAgICAgICAgKiDlpoLmnpzmiYDmnInmuKDpgZPkvb/nlKjnm7jlkIznmoTliIbkuqvlhoXlrrnliJnku4XloavlhplwYXJhbXPljbPlj6/vvIxcclxuICAgICAgICAgKiDlpoLmnpzpnIDopoHmoLnmja7kuI3lkIzmuKDpgZPlrprliLbliIbkuqvlhoXlrrnvvIzliJnlj69wYXJhbXPnlZnnqbrvvIzlnKhzaGFyZUNhbGxiYWNr5Lit6L+U5Zue5oyH5a6a5rig6YGT55qE5YiG5Lqr5YaF5a65XHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtcyDliIbkuqvlj4LmlbBcclxuICAgICAgICAgKiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgdGl0bGXvvJog5YiG5Lqr5qCH6aKYXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBkZXNjOiDliIbkuqvmkZjopoFcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHBpY1VybO+8muWIhuS6q+Wbvuagh1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgc2hhcmVVcmzvvJror6bmg4XlnLDlnYBcclxuICAgICAgICAgKiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAqIEBwYXJhbSBzaGFyZUNhbGxiYWNrIOWIhuS6q+aXtuWbnuiwg1xyXG4gICAgICAgICAqICAgICAgICAgICAgICBjaGFubmVs77yae1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgMO+8muefreS/oVxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgMe+8muaWsOa1quW+ruWNmlxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgM++8muW+ruS/oeWlveWPi1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNO+8muW+ruS/oeaci+WPi+WciFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNe+8mlFR5aW95Y+LXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA277yaUVHnqbrpl7RcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDfvvJrlpI3liLbpk77mjqVcclxuICAgICAgICAgKiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAqICAgICAgICAgICAgICBkYXRhOiDpu5jorqTliIbkuqvmlbDmja5cclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuc2hvd1NoYXJlUGFuZWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIGRlc2M6IGRlc2MsXHJcbiAgICAgICAgICAgIHBpY1VybDogaW1nVVJMLFxyXG4gICAgICAgICAgICBzaGFyZVVybDogcGFnZVVSbCAgLy8gdG9kbyDmma7pgJrliIbkuqtcclxuICAgICAgICB9LCBudWxsKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTlrprkvY3vvIzpppblhYjpgJrov4dHUFMg5a6a5L2N77yM5aaC5p6c5a6a5L2N5aSx6LSl77yM6YCa6L+H5o6l5Y+jZ2V0Q2l0eSzliKnnlKhJUOWcsOWdgOi/m+ihjOWumuS9je+8jOWmguaenOi/mOaYr+Wksei0pe+8jOmAmui/h+aPkuS7tuiOt+WPluWuouaIt+err+W3puS4iuinkueahOWfjuW4guS/oeaBr++8jOS+neeEtuWksei0pem7mOiupOepv2NpdHlDZDozMTAwMDAg5Luj6KGo5LiK5rW35biCXHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRMb2NhdGlvbkluZm8gPSAoY2FsbGJhY2syKSA9PiB7XHJcbiAgICBjb25zdCB1aSA9IFVQLlcuVUk7XHJcbiAgICB1aS5zaG93TG9hZGluZygpO1xyXG4gICAgbGV0IGNhbGxiYWNrID0gKGRhdGEpID0+IHtcclxuICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbiAgICAgICAgY2FsbGJhY2syKGRhdGEpXHJcbiAgICB9XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhcHAuZ2V0Q3VycmVudExvY2F0aW9uSW5mbygoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBhbGVydChKU09OLnN0cmluZ2lmeShkYXRhKSlcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9LCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2UoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY21kOiBcIi9cIiArIENPTkZJRy5SRVNULmdldENpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGF0aDogXCJodHRwOi8vMTcyLjIxLjMzLjU2OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIitDT05GSUcuUkVTVC5nZXRDaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcIjIuMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IFwiMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHRydWUsIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhLnBhcmFtcylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hOYXRpdmVEYXRhKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaE5hdGl2ZURhdGEoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoTmF0aXZlRGF0YSA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluWuouaIt+err+S/oeaBr1xyXG4gICAgICAgICAqIEBwYXJhbSBzdWNjZXNzXHJcbiAgICAgICAgICogQHBhcmFtIGZhaWxcclxuICAgICAgICAgKiBAcGFyYW0gdHlwZSAw77ya5Z+O5biC5L+h5oGvY2l0eUNk77ybMe+8mue7j+e6rOW6pu+8mzXvvJpVc2VySWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuZmV0Y2hOYXRpdmVEYXRhKDAsIChkYXRhID0ge30pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgICAgICAgIGNpdHlDZDogXCIzMTAwMDBcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcbmV4cG9ydCBjb25zdCBzYXZlUGljVG9Mb2NhbCA9IChjYW52YXMsIHJlc29sdmUpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIHVpID0gVVAuVy5VSSB8fCB7fTtcclxuICAgIHZhciBwaWNVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLnNhdmVQaWNUb0xvY2FsKHtcclxuICAgICAgICAgICAgdXJsOiBwaWNVcmwgJiYgcGljVXJsLnN1YnN0cigyMilcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8v5oiQ5YqfXHJcbiAgICAgICAgICAgICEhcmVzb2x2ZSAmJiByZXNvbHZlKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICB9LCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cgPT0gJ3VwZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dBbGVydCgn6K+35Y2H57qn5Yiw5pyA5paw5a6i5oi356uvJywgZnVuY3Rpb24gKCkgeyAvLyDljrvljYfnuqdcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ1llcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW52LmlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL2l0dW5lcy5hcHBsZS5jb20vY24vYXBwL2lkNjAwMjczOTI4P2NvZGU9bmV3WWVhckFjdGl2aXR5JztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b3VodWkuOTU1MTYuY29tL2FwcC9hcHAvc29mdHdhcmUvdW5pb25wYXktd2FsbGV0LXYyLmFwaz9jb2RlPW5ld1llYXJBY3Rpdml0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLm9wZW5Ccm93c2VyKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdObycpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ+mprOS4iuWNh+e6pycsICfnqI3lkI7lho3or7QnLCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAhIXJlc29sdmUgJiYgcmVzb2x2ZShcImZhaWxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVUZXh0Q2FudmFzZSA9ICh0ZXh0LCBjb2xvciwgbG9uZyA9IDY4NCwgc2hvdCA9IDYwKSA9PiB7XHJcblxyXG4gICAgbGV0IHJlbTJweCA9ICh2YWwpID0+IHtcclxuICAgICAgICB2YXIgY1dpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcbiAgICAgICAgcmV0dXJuIHZhbCAqIGNXaWR0aCAvIDc1MFxyXG4gICAgfVxyXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Q2FudmFzJyk7XHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgLy/oqK3nva7nlavkvYjnmoTlr6zpq5hcclxuICAgIC8vIHZhciBiZ1dpZHRoID0gcmVtMnB4KGxvbmcpO1xyXG4gICAgLy8gdmFyIGJnSGVpZ2h0ID0gcmVtMnB4KHNob3QpO1xyXG5cclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgc2hvdCk7XHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBsb25nKTtcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBjdHgucm90YXRlKC05MCAqIE1hdGguUEkgLyAxODApO1xyXG4gICAgdmFyIHRleHQgPSB0ZXh0O1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcclxuICAgIGxldCBmb250U2l6ZSA9IHNob3Q7XHJcbiAgICBjdHguZm9udCA9IGZvbnRTaXplICsgJ3B4IEFpcmFsJztcclxuICAgIHdoaWxlIChjdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGggPiBsb25nKSB7XHJcbiAgICAgICAgZm9udFNpemUtLTtcclxuICAgICAgICBjdHguZm9udCA9IGZvbnRTaXplICsgJ3B4IEFpcmFsJztcclxuICAgIH1cclxuICAgIGN0eC5maWxsVGV4dCh0ZXh0LCAtbG9uZywgZm9udFNpemUpO1xyXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog55Sf5oiQ5Zu+54mH5bm25L+d5a2Y5Yiw55u45YaMXHJcbiAqIEBwYXJhbSBiZ3VybCDog4zmma/lm77niYfnmoTlnLDlnYBcclxuICogQHBhcmFtIHFyY29kZVVSTCDkuoznu7TnoIHnmoTlnLDlnYBcclxuICogQHBhcmFtIHFyY29kZVdkQW5kSGcg5LqM57u056CB55qE5a695bqmXHJcbiAqIEBwYXJhbSB4V2lkdGgg5LqM57u056CB6Led56a75bem5LiK6KeS55qEIOKGkiDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHlIZWlnaHQg5LqM57u056CB6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHRleHRiZ1VSTCDliqDlhaXnlLvluIPnmoTlm77niYfnmoRVUkxcclxuICogQHBhcmFtIHhUZXh0V2lkdGgg5Yqg5YWl55S75biD55qE5Zu+54mH6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHlUZXh0SGVpZ2h0IOWKoOWFpeeUu+W4g+eahOWbvueJh+i3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnZhc0FuZFNhdmVQaG90byA9IChjYW52YXNPYmosIHJlc29sdmUpID0+IHtcclxuICAgIGxldCB7Ymd1cmwsIHFyY29kZVVSTCwgcXJjb2RlV2RBbmRIZywgeFdpZHRoLCB5SGVpZ2h0LCB0ZXh0YmdVUkwsIHhUZXh0V2lkdGgsIHlUZXh0SGVpZ2h0fSA9IGNhbnZhc09iajtcclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbW9uQ2FudmFzV3JhcHBlcicpO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTnlLvluIPlhoXlrrlcclxuICAgICAqL1xyXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoXHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuc3JjID0gYmd1cmw7XHJcbiAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvL+ioree9rueVq+S9iOeahOWvrOmrmFxyXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgaW1nLndpZHRoKTtcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBpbWcuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy/lnKjnlavluIPkuIrnlavog4zmma/lnJZcclxuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XHJcblxyXG4gICAgICAgIGlmICghIXRleHRiZ1VSTCkge1xyXG4gICAgICAgICAgICBsZXQgdGV4dFVyaSA9IHRleHRiZ1VSTDtcclxuICAgICAgICAgICAgdmFyIHRleHRJbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgdGV4dEltZy5zcmMgPSB0ZXh0VXJpO1xyXG4gICAgICAgICAgICB0ZXh0SW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGV4dEltZywgeFRleHRXaWR0aCwgeVRleHRIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S6jOe2reeivOWclueJh+Wkp+Wwj1xyXG4gICAgICAgIHZhciBxcmNvZGVXaWR0aEFuZEhlaWdodCA9IHFyY29kZVdkQW5kSGc7XHJcbiAgICAgICAgLy/muIXpmaTkuoznu7TnoIFcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHZhciBxcmNvZGUgPSBuZXcgUVJDb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLCB7XHJcbiAgICAgICAgICAgIHRleHQ6IHFyY29kZVVSTCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBxcmNvZGVXaWR0aEFuZEhlaWdodCxcclxuICAgICAgICAgICAgd2lkdGg6IHFyY29kZVdpZHRoQW5kSGVpZ2h0LFxyXG4gICAgICAgICAgICBjb3JyZWN0TGV2ZWw6IFFSQ29kZS5Db3JyZWN0TGV2ZWwuTFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBxcmNvZGVJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF07XHJcbiAgICAgICAgcXJjb2RlSW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy/nlavkuozntq3norznmoTlnJbniYdcclxuICAgICAgICAgICAgbGV0IHFyY29kZUR4ID0geFdpZHRoLCBxcmNvZGVEeSA9IHlIZWlnaHQ7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UocXJjb2RlSW1nLCBxcmNvZGVEeCwgcXJjb2RlRHkpO1xyXG4gICAgICAgICAgICAvLyByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIHNhdmVQaWNUb0xvY2FsKGNhbnZhcywgcmVzb2x2ZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0LmpzIiwiY29uc3QgY29uZmlnID0ge1xyXG4gICAgUkVTVDoge1xyXG4gICAgICAgIGFwcGx5TWNjOiBcImNvbGxlY3Rpb25Db2RlL2FwcGx5TWNjXCIsIC8vMi40LjTnlLPor7fmlLbmrL7noIHmjqXlj6NcclxuICAgICAgICBnZXRNY2NDYXJkTGlzdDogXCJjb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiLCAvLzIuNC4y5ZWG5oi35pS25qy+56CB5Y2h5YiX6KGo5o6l5Y+jXHJcbiAgICAgICAgYXBwbHlNYXQ6IFwiY29sbGVjdGlvbkNvZGUvYXBwbHlNYXRcIiwgLy/nlLPor7fnianmlpnmjqXlj6NcclxuICAgICAgICBnZXRNY2hudEFuZEFyZWFJbmY6IFwibWNobnQvZ2V0TWNobnRBbmRBcmVhSW5mLnNqc29uXCIsIC8v5ZWG5oi357G75Z6L5Y+K5Zyw5Yy65YiX6KGo5p+l6K+iXHJcbiAgICAgICAgdXBncmFkZU1jYzogXCJjb2xsZWN0aW9uQ29kZS91cGdyYWRlTWNjXCIsIC8vMi40LjbljYfnuqfmlLbmrL7noIHmjqXlj6MsXHJcbiAgICAgICAgZ2V0QWRkckxpc3Q6IFwiYWRkcmVzcy9nZXRBZGRyTGlzdFwiICwgLy8yLjQuMTMg6I635Y+W5pS26LSn5Zyw5Z2A5YiX6KGoXHJcbiAgICAgICAgZGVsZXRlQWRkcmVzczogXCJhZGRyZXNzL2RlbGV0ZUFkZHJlc3NcIiAsIC8vMi40LjEyIOWIoOmZpOaUtui0p+WcsOWdgFxyXG4gICAgICAgIGVkaXRBZGRyZXNzOiBcImFkZHJlc3MvZWRpdEFkZHJlc3NcIiwgLy8yLjQuMTEg5L+u5pS55pS26LSn5Zyw5Z2ALFxyXG4gICAgICAgIG5ld0FkZHJlc3M6IFwiYWRkcmVzcy9uZXdBZGRyZXNzXCIsIC8vMi40LjEwIOaWsOWinuaUtui0p+WcsOWdgFxyXG4gICAgICAgIG1jaG50T3BlciA6XCJtY2hudC9tY2hudE9wZXJcIiwgLy8yLjIuMiDlupfpk7rkv6Hmga/mm7TmlrBcclxuICAgICAgICBnZXRMaW1pdEF0SW5mbzpcIm1jaG50L2dldExpbWl0QXRJbmZvXCIsIC8v6I635Y+W5pS25qy+6ZmQ6aKdXHJcbiAgICAgICAgc2V0TWNjT25PZmY6XCJjb2xsZWN0aW9uQ29kZS9zZXRNY2NPbk9mZlwiLCAvL+WBnOatouWSjOWQr+eUqOS7mOasvueggeWAn+WPo1xyXG4gICAgICAgIGdldE1jaG50RGV0YWlsOlwibWNobnQvbWNobnREZXRhaWxcIiwgLy8yLjIuMSDojrflj5blupfpk7ror6bmg4XpobXpnaJcclxuICAgICAgICAvLyB1cGdyYWRlTWNjOiBcImNvbGxlY3Rpb25Db2RlL3VwZ3JhZGVNY2NcIiwgLy8yLjQuNuWNh+e6p+aUtuasvueggeaOpeWPo1xyXG4gICAgICAgIGdldFRvZGF5VHJhbnM6XCJ0cmFuL2dldFRvZGF5VHJhbnNcIiwvLzIuMS4zLy/ku4rml6XorqLljZXmjqXlj6NcclxuICAgICAgICBnZXRUb2RheUluY29tZTpcInRyYW4vZ2V0VG9kYXlJbmNvbWVcIiwvLzIuMS4x5ZWG5oi35pyN5Yqh6aaW6aG15LuK5pel5pS25qy+5o6l5Y+jfn5+fn5+fn5cclxuICAgICAgICBnZXRIaXN0b3J5SW5jb21lOlwidHJhbi9nZXRIaXN0b3J5SW5jb21lXCIsLy8yLjEuMuWOhuWPsuaUtuasvuaOpeWPo1xyXG4gICAgICAgIGdldEhpc3RvcnlUcmFuczpcInRyYW4vZ2V0SGlzdG9yeVRyYW5zXCIsLy8yLjEuNOWOhuWPsuiuouWNleaOpeWPo1xyXG4gICAgICAgIGdldExvZ2lzdGljc1N0OlwibWF0ZXJpZWwvZ2V0TG9naXN0aWNzU3RcIiwvLzIuMy4z54mp5rWB6K+m5oOF5o6l5Y+j5p+l6K+iXHJcbiAgICAgICAgZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bTpcInRyYW4vZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bVwiLC8vMi4xLjXljZXnrJTorqLljZXmn6Xor6LmjqXlj6NcclxuICAgICAgICBnZXRBdWRpdEluZm86XCJjb2xsZWN0aW9uQ29kZS9nZXRBdWRpdEluZm9cIiwvLzIuNC4xNOS/oeeUqOWNoeWNh+e6p+WuoeaguOe7k+aenOafpeivolxyXG4gICAgICAgIHVwZGF0ZU1jY0NhcmQ6XCJjb2xsZWN0aW9uQ29kZS91cGRhdGVNY2NDYXJkXCIsLy8yLjQuOeabtOaNouaUtuasvuWNoeaOpeWPo1xyXG4gICAgICAgIGdldFVwZ3JhZGVTdDpcIm1jaG50L2dldFVwZ3JhZGVTdFwiLC8v5p+l6K+i5ZWG5oi35piv5ZCm5Y2H57qn5L+h55So5Y2h5pS25qy+XHJcbiAgICAgICAgZ2V0TWNjVHJhbnNOdW06J2NvbGxlY3Rpb25Db2RlL2dldE1jY1RyYW5zTnVtJywvL+iOt+WPluiwg+WPluaUr+S7mOaOp+S7tueahFRO5Y+3XHJcbiAgICAgICAgZ2V0TWF0ZXJpZWxJbmZvTGlzdDpcImNvbGxlY3Rpb25Db2RlL2dldE1hdGVyaWVsSW5mb0xpc3RcIiwvLzIuNC4z54mp5paZ5L+h5oGv5YiX6KGo5o6l5Y+jXHJcbiAgICAgICAgdXNlckluZm86XCIvYXBwL2luQXBwL3VzZXIvZ2V0XCIsLy/ojrflj5bnlKjmiLfkv6Hmga9cclxuICAgICAgICBpc0JsYWNrOlwic2Nhbi9pc0JsYWNrXCIsLy8yLjEuNeaUtumTtuWRmOaYr+WQpuWcqOm7keWQjeWNlVxyXG4gICAgICAgIGlzQXBwbHk6XCJzY2FuL2lzQXBwbHlcIiwvLzIuMS405piv5ZCm5bey57uP55Sz6K+357qi5YyF56CBXHJcbiAgICAgICAgc2hhcmVMaW5rOlwic2Nhbi9zaGFyZUxpbmtcIiwvLzIuMS4255Sf5oiQ57qi5YyF56CB6ZO+5o6lXHJcbiAgICAgICAgcmVjbWRSZWNvcmQ6XCJzY2FuL3JlY21kUmVjb3JkXCIsLy/mjqjojZDlhbPns7vorrDlvZVcclxuICAgICAgICBnZXRMb2dpc3RpY3NMaXN0OlwibWF0ZXJpZWwvZ2V0TG9naXN0aWNzTGlzdFwiLC8v6I635Y+W54mp5paZ5Y6G5Y+y6K6i5Y2VXHJcbiAgICAgICAgZ2V0UmV3YXJkTGlzdDpcInNjYW4vZ2V0UmV3YXJkTGlzdFwiLC8vMi4xLjfmn6Xor6LmlLbpk7blkZjotY/ph5HmmI7nu4borrDlvZVcclxuICAgICAgICBnZXRQcm90b2NvbEluZm86XCJjb2xsZWN0aW9uQ29kZS9nZXRQcm90b2NvbEluZm9cIiwvL+WVhuaIt+WNh+e6p+afpeivouaYvuekuuWNj+iurueahOWQjeensOWSjOWNj+iurueahOWcsOWdgFxyXG4gICAgICAgIGdldENpdHk6XCJyZWdpb24vZ2V0Q2l0eVwiLC8v6YCa6L+HSVDlnLDlnYDojrflj5blnLDlnYDlrprkvY1cclxuICAgICAgICBnZXRRclVybDpcImNvbGxlY3Rpb25Db2RlL2dldFFySW5mb1wiLy8yLjEuMeiOt+WPlueUqOaIt+aUtuasvueggVVSTFxyXG4gICAgfSxcclxuICAgIFNUQVRVU0NPREU6IHtcclxuICAgICAgICBTVUNDRVNTOlwiMDBcIlxyXG4gICAgfSxcclxuICAgIENPTlNUX0RBVEE6e1xyXG4gICAgICAgIGltZ2VTaXplOlwiMzAwXCJcclxuICAgIH0sXHJcbiAgICBDQUNIRUtFWTp7XHJcbiAgICAgICAgZ2V0TWNjQ2FyZExpc3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1jb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLWNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtbWNobnQvZ2V0VXBncmFkZVN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtbWNobnQvZ2V0VXBncmFkZVN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE1jaG50RGV0YWlsOntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtbWNobnQvbWNobnREZXRhaWxcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1tY2hudC9tY2hudERldGFpbFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0FwcGx5OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtc2Nhbi9pc0FwcGx5XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtc2Nhbi9pc0FwcGx5XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEFkZHJMaXN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtYWRkcmVzcy9nZXRBZGRyTGlzdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLWFkZHJlc3MvZ2V0QWRkckxpc3RcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCJpbXBvcnQgSW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIjtcclxuXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDlj6rkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICog5YWI6K+757yT5a2Y77yM5ZCM5q2l5b6A5ZCO5Y+w5Y+R6K+35rGC77yM6K+35rGC5oql5paH5Zue5p2l5ZCO5Yi35paw57yT5a2Y5Y+K6aG16Z2iXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UgPSAodXBkYXRlLHJvbGxLZXksc2Vjb25kS2V5KSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbi8vICAgICAgICAgICAgIHJvbGxLZXksXHJcbi8vICAgICAgICAgICAgIHNlY29uZEtleVxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgdXBkYXRlOiB1cGRhdGUsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOS4jeaUr+aMgSBzdyAgICzmsLjkuYXnt6nlrZhcclxuLy8gICogQHR5cGUge3tjYWNoZTogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFufX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUxvbmdUaW1lID0gKHJvbGxLZXksIHNlY29uZEtleSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgICAgIHJvbGxLZXksXHJcbi8vICAgICAgICAgICAgIHNlY29uZEtleVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5Y+q5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDHliIbpkp/lhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UxbWluID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMzBtaW4gPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMzAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTFob3VyID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICo2MCoxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UyaG91ciA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAyICogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuXHJcbi8vXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UyNGRpYW4gPSAoKSA9PiB7XHJcbi8vXHJcbi8vICAgICBsZXQgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbi8vICAgICBsZXQgdGVtb3Jyb3cgPSBuZXcgRGF0ZSgpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0SG91cnMoMjMpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0TWludXRlcyg1OSk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRTZWNvbmRzKDU5KTtcclxuLy8gICAgIGxldCB0ZW0gPSB0ZW1vcnJvdy5nZXRUaW1lKCk7XHJcbi8vICAgICBsZXQgdmFsaWRhdGVUaW1lID0gdGVtIC0gbm93ICsgMTAwMCAqIDYwXHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICAgICAgdmFsaWRhdGVUaW1lOiB2YWxpZGF0ZVRpbWUsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIHdvcmtib3jnmoTnrZbnlaUgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICrkuLpnZXTor7fmsYLvvIzkuI3liqDlr4ZcclxuLy8gICrmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAq5YWI6K+757yT5a2Y77yM5ZCM5pe25b6A5ZCO5Y+w5Y+R6K+35rGC77yM6K+35rGC5oql5paH5Zue5p2l5ZCO5Yi35paw57yT5a2Y5Y+K6aG16Z2iXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBjYWNoZTogYm9vbGVhbiwgYXN5bmM6IGJvb2xlYW59fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlID0gKHVwZGF0ZSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBieUFqYXg6IGZhbHNlLC8v5aaC5p6c6KaB5pSv5oyBc3cg5bCx5LiN6ZyA5L2/55SoYWpheFxyXG4vLyAgICAgICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICB1cGRhdGU6IHVwZGF0ZVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDMw5YiG6ZKf5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDMwbWluID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMzAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMeWwj+aZguWGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QxaG91ciA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MmhvdXIgPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAyICogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLyoqXHJcbiAqIOivpeetlueVpeaYr+S4gOWumuaXtumXtOWGheS4jeWQkeWQjuWPsOivt+axguaVsOaNru+8jCDlpoLmnpzlnKjorr7lpIfkuIrmlK/mjIFzd+WImeS9v+eUqHN3LOWQpuWImeS9v+eUqCBsb2NhbFN0b3JhZ2VcclxuICogQHBhcmFtIHRpbWUgIOimgee8k+WtmOeahOaXtumXtCDljZXkvY3mmK/mr6vnp5JcclxuICogQHJldHVybnMge3tieUFqYXg6IGJvb2xlYW4sIGZvckNoc3A6IGJvb2xlYW4sIGVuY3J5cHQ6IGJvb2xlYW4sIGNhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7dmFsaWRhdGVUaW1lOiAqfX19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2FjaGVGaXJzdCA9KHRpbWUpPT57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGJ5QWpheDogdHJ1ZSxcclxuICAgICAgICBmb3JDaHNwOmZhbHNlLFxyXG4gICAgICAgIGVuY3J5cHQ6ZmFsc2UsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICB2YWxpZGF0ZVRpbWU6dGltZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogIOivpeetlueVpeaYr+S4gOWumuaXtumXtOWGheS4jeWQkeWQjuWPsOivt+axguaVsOaNru+8jOa3u+WKoOe8k+WtmOWPquWcqGxvY2Fsc3RvcmFnZeS4rVxyXG4gKiBAcGFyYW0gdGltZSAg6KaB57yT5a2Y55qE5pe26Ze0IOWNleS9jeaYr+avq+enklxyXG4gKiBAcGFyYW0gcm9sbEtleSAgIOmdnuW/heWhqyDlpoLmnpzlkI7mnJ/opoHliKDpmaTov5nkuKrnvJPlrZjvvIzov5nloavlhpnov5lrZXlcclxuICogQHBhcmFtIHNlY29uZEtleSAg6Z2e5b+F5aGrIOWmguaenOWQjuacn+imgeWIoOmZpOi/meS4que8k+WtmO+8jOi/meWhq+WGmei/mWtleVxyXG4gKiBAcmV0dXJucyB7e2NhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7bmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6ICosIHJvbGxLZXk6ICosIHNlY29uZEtleTogKn19fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3RTdG9yYWdlID0odGltZSxyb2xsS2V5LCBzZWNvbmRLZXkpPT57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsaWRhdGVUaW1lOiB0aW1lLFxyXG4gICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXNwb25zZUZvcm1hdHRlciA9IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgcmVzID0ge1xyXG4gICAgICAgIHN0YXR1c0NvZGU6IGRhdGEucmVzcCxcclxuICAgICAgICBkYXRhOiBkYXRhLnBhcmFtcyxcclxuICAgICAgICBtc2c6IGRhdGEubXNnXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIOivpeetlueVpeaYr+WFiOivu+e8k+WtmO+8jOWQjOaXtuWQkeWQjuWPsOWPkemAgeivt+axgu+8jOivt+axguWbnuadpeWQjuWQjOatpeabtOaWsOe8k+WtmO+8jOWbnuiwg3VwZGF0ZSDlh73mlbDvvIxcclxuICogQHBhcmFtIHVwZGF0ZSDlv4Xloavmm7TmlrDpobXpnaLnmoTlm57osIPlh73mlbBcclxuICogQHBhcmFtIHJvbGxLZXkgIOmdnuW/heWhqyDorr7nva7nvJPlrZjnmoQgcm9sbGtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5IOmdnuW/heWhqyDorr7nva7nvJPlrZjnmoQgc2Vjb25kS2V5XHJcbiAqIEByZXR1cm5zIHt7Y2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHthc3luYzogYm9vbGVhbiwgcm9sbEtleTogKiwgc2Vjb25kS2V5OiAqfSwgdXBkYXRlOiAqfX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UgPSAodXBkYXRlLHJvbGxLZXksc2Vjb25kS2V5KSA9PiB7XHJcblxyXG4gICBsZXQgIHJlZnJlc2hEb21GdW5jPShyZXNwb25zZSk9PntcclxuICAgICAgIGxldCByZXE9cmVzcG9uc2VGb3JtYXR0ZXIocmVzcG9uc2UpXHJcbiAgICAgICAvLyDlsIbojrflj5bnmoTmlbDmja7lkoznvJPlrZjkuK3nmoTmlbDmja7ov5vooYzlr7nmr5RcclxuICAgICAgIGxldCBkYXRhRnJvbUNhY2hlID0ge307XHJcbiAgICAgICBVUC5XLlV0aWwuZ2V0RnJvbVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICB9LGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgIGlmKCAhIWRhdGEgKXtcclxuICAgICAgICAgICAgICAgIGRhdGFGcm9tQ2FjaGUgPSBkYXRhO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgfSlcclxuICAgICAgIGxldCBpc1NhbWVBdEFsbCA9IEltbXV0YWJsZS5pcyhJbW11dGFibGUuZnJvbUpTKHJlcSksSW1tdXRhYmxlLmZyb21KUyhkYXRhRnJvbUNhY2hlKSk7IC8v5pWw5o2u5piv5ZCm5a6M5YWo55u45ZCMXHJcbiAgICAgICBpZiggIWlzU2FtZUF0QWxsICl7IC8v5pWw5o2u5pyJ5Y+Y5YqoXHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXEpXHJcbiAgICAgICB9XHJcbiAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgZW5kT2ZTeW5jRnVuYzpmYWxzZSxcclxuICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IHJlZnJlc2hEb21GdW5jLFxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5Yig6ZmkbG9jYWxzdG9yYWdl5Lit55qE57yT5a2YXHJcbiAqIEBwYXJhbSByb2xsS2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXlcclxuICovXHJcbmV4cG9ydCBjb25zdCByZW1vdmVDYWNoZSA9IChyb2xsS2V5LCBzZWNvbmRLZXkpID0+IHtcclxuICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICByb2xsS2V5OiByb2xsS2V5LFxyXG4gICAgICAgIHNlY29uZEtleTogc2Vjb25kS2V5XHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIoOmZpOe8k+WtmOaIkOWKnycpXHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICBmdWxsOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZS5qcyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtdHJ5XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUHJvbWlzZScsIHsgJ3RyeSc6IGZ1bmN0aW9uIChjYWxsYmFja2ZuKSB7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYodGhpcyk7XG4gIHZhciByZXN1bHQgPSBwZXJmb3JtKGNhbGxiYWNrZm4pO1xuICAocmVzdWx0LmUgPyBwcm9taXNlQ2FwYWJpbGl0eS5yZWplY3QgOiBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlKShyZXN1bHQudik7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qc1xuLy8gbW9kdWxlIGlkID0gOGUwYzFkYjAwMDg1YzhhZDI1NWFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS50cnknKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLlByb21pc2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gOTczY2M4ZWVmYzU5OTMxZGU5NWVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGludm9rZSA9IHJlcXVpcmUoJy4vX2ludm9rZScpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuL19odG1sJyk7XG52YXIgY2VsID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBzZXRUYXNrID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhclRhc2sgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZCA9ICt0aGlzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0VGFzayB8fCAhY2xlYXJUYXNrKSB7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBpID0gMTtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2VzcycpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3coY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IGFhOTYzYjRjMjcxNDRmMDk0Y2NhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsImltcG9ydCB7Z2V0QXVkaXRJbmZvfSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdEFQSVwiO1xyXG5cclxuLyoqXHJcbiAq5p+l6K+i5L+h55So5Y2h5Y2H57qn5pS25qy+54q25oCBXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXBkYXRhKCl7XHJcbiAgICByZXR1cm4gZ2V0QXVkaXRJbmZvKCkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvQ3JlZGl0TW9uZXlzL0NyZWRpdE1vbmV5QWN0aW9ucy5qcyIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgRCkge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSBiNTBkODI0NTZlNTQ1ZGNjM2RkM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCBhcmdzLCB0aGF0KSB7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzXG4vLyBtb2R1bGUgaWQgPSBiNTgwYjk0YjE5NTg0MmNiZjJiMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBPYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBQcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG52YXIgaXNOb2RlID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYgKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKSBwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICBmbiA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKGlzTm9kZSkge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlciwgZXhjZXB0IGlPUyBTYWZhcmkgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIH0gZWxzZSBpZiAoT2JzZXJ2ZXIgJiYgIShnbG9iYWwubmF2aWdhdG9yICYmIGdsb2JhbC5uYXZpZ2F0b3Iuc3RhbmRhbG9uZSkpIHtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmIChQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSkge1xuICAgIC8vIFByb21pc2UucmVzb2x2ZSB3aXRob3V0IGFuIGFyZ3VtZW50IHRocm93cyBhbiBlcnJvciBpbiBMRyBXZWJPUyAyXG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICAgIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmICghaGVhZCkge1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IGJkZTBmNTdlOWI1NzlmOTQzZjg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0Jztcbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xuXG5mdW5jdGlvbiBQcm9taXNlQ2FwYWJpbGl0eShDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSBjMWI5NGUzZTk1ZWQ0MzVhZjU0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdQcm9taXNlJywgeyAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2Ygb25GaW5hbGx5ID09ICdmdW5jdGlvbic7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgfSA6IG9uRmluYWxseSxcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHRocm93IGU7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHlcbiAgKTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzXG4vLyBtb2R1bGUgaWQgPSBjMmUzNWJiZmY4MzMwOTU5NDNjMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanNcbi8vIG1vZHVsZSBpZCA9IGNiNzgzNzUyOTQ1NDJjMjRjNWJhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gZDE4MTBhZTUzMzJlMzZmZmEzYzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiY2xlYXJmaXhcIjpcImNsZWFyZml4XCIsXCJkblwiOlwiZG5cIixcImNyZWRpdE1vbmV5Q29udGFpbmVyXCI6XCJjcmVkaXRNb25leUNvbnRhaW5lclwiLFwiY3JlZGl0TW9uZXlTdGF0dXNcIjpcImNyZWRpdE1vbmV5U3RhdHVzXCIsXCJleGFtaW5lU3RhdHVzXCI6XCJleGFtaW5lU3RhdHVzXCIsXCJpbmZvRGVzY1wiOlwiaW5mb0Rlc2NcIixcInJlc3RBcHBseVwiOlwicmVzdEFwcGx5XCIsXCJyZXN0QnRuXCI6XCJyZXN0QnRuXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQ3JlZGl0TW9uZXlzL0NyZWRpdE1vbmV5LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IGU1ODM1M2I2MmZlZjVjYTk2ZDRjXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7YmVmb3JlRW50ZXJSb3V0ZXJ9IGZyb20gIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdFwiXHJcbmltcG9ydCB7Y3JlYXRlVXBkYXRhfSBmcm9tICcuL0NyZWRpdE1vbmV5QWN0aW9ucyc7XHJcbmltcG9ydCBzdG9yZSBmcm9tICcuLi8uLi9zdG9yZS9zdG9yZSc7XHJcbmltcG9ydCB7VVBEQVRFX1NUT1JFX1NUQVRFfSBmcm9tIFwiLi4vLi4vc3RvcmUvYWN0aW9uXCI7XHJcbmltcG9ydCBDcmVkaXRNb25leSBmcm9tIFwiLi9DcmVkaXRNb25leVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVkaXRNb25leUNvbnRhaW5lcnMgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHBhZ2VTdGF0dXM6IG51bGwsXHJcbiAgICAgICAgICAgIGZhaWxSZWFzb246IHt9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGJlZm9yZUVudGVyUm91dGVyKFwi5L+h55So5Y2h5pS25qy+XCIpO1xyXG4gICAgICAgIGNyZWF0ZVVwZGF0YSgpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBwYWdlU3RhdHVzOnJlcy5kYXRhLnVwZ3JhZGVTdCxcclxuICAgICAgICAgICAgICAgIGZhaWxSZWFzb246IHJlc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2VydFZlcmlmeUZhaWxSZWFzb246ZmFsc2UsLy/ouqvku73or4HlrqHmoLjkuI3pgJrov4fml7blh7rnjrBcclxuICAgIC8vIGxpY1ZlcmlmeUZhaWxSZWFzb246ZmFsc2UsLy/okKXkuJrmiafnhaflrqHmoLjkuI3pgJrov4fml7blh7rnjrBcclxuICAgIC8vIHNob3BwaWNWZXJpZnlGYWlsUmVhc29uOmZhbHNlLC8v5bqX6ZO657uP6JCl54Wn54mH5a6h5qC45LiN6YCa6L+H5pe25Ye6546wXHJcbiAgICAvLyBhdXhWZXJpZnlGYWlsUmVhc29uOmZhbHNlLC8v6L6F5Yqp6K+B5piO5p2Q5paZ5a6h5qC45LiN6YCa6L+H5pe25Ye6546wXHJcbiAgICAvLyBtZXJubVZlcmlmeUZhaWxSZWFzb246ZmFsc2UsLy/llYbmiLflkI3np7DlrqHmoLjkuI3pgJrov4fml7blh7rnjrBcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43mlrDmj5DkuqTkv6HnlKjljaHljYfnuqfmlLbmrL4g5qC55o2u5ZCO5Y+w6L+U5Zue55qE6ZSZ6K+v5a2X5q61IOWIpOaWreivpei3r+eUsei3s+i9rOWIsOWTquS4qumhtemdolxyXG4gICAgICovXHJcbiAgICBoYW5kbGVDbGljayA9ICgpID0+IHtcclxuICAgICAgICBsZXQgX2RhdGE7XHJcbiAgICAgICAgX2RhdGEgPSBKU09OLnBhcnNlKHRoaXMuc3RhdGUuZmFpbFJlYXNvbi5kYXRhLmZhaWxSZWFzb24pO1xyXG4gICAgICAgIGxldCBtZXJjaGFudE5hbWUgPSBfZGF0YS5tZXJubVZlcmlmeUZhaWxSZWFzb24uc3BsaXQoXCI7XCIpWzBdO1xyXG5cclxuICAgICAgICBsZXQgIHBhcmFtID0ge307XHJcbiAgICAgICAgbGV0IGtleXNMaXN0ID0gT2JqZWN0LmtleXMoX2RhdGEpO1xyXG4gICAgICAgIGtleXNMaXN0LmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09IFwiY2VydFZlcmlmeUZhaWxSZWFzb25cIikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uY2VydFZlcmlmeUZhaWxSZWFzb24gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PSBcImxpY1ZlcmlmeUZhaWxSZWFzb25cIikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0ubGljVmVyaWZ5RmFpbFJlYXNvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09IFwic2hvcHBpY1ZlcmlmeUZhaWxSZWFzb25cIikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uc2hvcHBpY1ZlcmlmeUZhaWxSZWFzb24gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PSBcImF1eFZlcmlmeUZhaWxSZWFzb25cIikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uYXV4VmVyaWZ5RmFpbFJlYXNvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09IFwibWVybm1WZXJpZnlGYWlsUmVhc29uXCIpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtLm1lcm5tVmVyaWZ5RmFpbFJlYXNvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIGtleXNMaXN055qEbGVuZ3Ro6K+m6KejXHJcbiAgICAgICAgKiAxLuWVhuaIt+WQjeensOWuoeaguOS4jemAmui/h21lcm5tVmVyaWZ5RmFpbFJlYXNvbitlcnJNc2fmj5DnpLror61cclxuICAgICAgICAqIDIu5ZWG5oi35ZCN56ew5a6h5qC45LiN6YCa6L+HbWVybm1WZXJpZnlGYWlsUmVhc29uK+WVhuaIt+S4iuS8oOeahOWbvueJh+S4jemAmui/h+eahOWbvueJh+mUmeivr+Wtl+autStlcnJNc2fmj5DnpLror61cclxuICAgICAgICAqIDMu5Zu+54mH5a6h5qC45LiN6YCa6L+H5a2X5q61K2Vyck1zZ+aPkOekuuivrVxyXG4gICAgICAgICogKi9cclxuXHJcbiAgICAgICAgaWYgKCEhX2RhdGEubWVybm1WZXJpZnlGYWlsUmVhc29uICYmIGtleXNMaXN0Lmxlbmd0aD09Mikge1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgbWNobnREZXRhaWw6e1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlTm06bWVyY2hhbnROYW1lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAvL+WVhuaIt+WQjeensOWuoeaguOS4jemAmui/h1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwYXRobmFtZTogXCIvdXBTdG9yZUluZm9tYXRpb25cIixcclxuICAgICAgICAgICAgICAgIHNlYXJjaDpcIj9pc0ZhaWxiYWNrPXRydWUmZXJyTXNnPVwiK3RoaXMuc3RhdGUuZmFpbFJlYXNvbi5tc2crXCImaGFzRmFpbFBpY3R1cmU9ZmFsc2VcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICghIV9kYXRhLm1lcm5tVmVyaWZ5RmFpbFJlYXNvbiAmJiBrZXlzTGlzdC5sZW5ndGg+Mikge1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgbWNobnREZXRhaWw6e1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlTm06bWVyY2hhbnROYW1lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAvL+WVhuaIt+WQjeensOWKoOWVhuaIt+S4iuS8oOeahOWbvueJh+S4jemAmui/h1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwYXRobmFtZTogXCIvdXBTdG9yZUluZm9tYXRpb25cIixcclxuICAgICAgICAgICAgICAgIHNlYXJjaDpcIj9pc0ZhaWxiYWNrPXRydWUmZXJyTXNnPVwiK3RoaXMuc3RhdGUuZmFpbFJlYXNvbi5tc2crXCImaGFzRmFpbFBpY3R1cmU9dHJ1ZSZmYWlsUGljdHJ1ZU9iaj1cIitwYXJhbVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSAge1xyXG4gICAgICAgICAgICAvL+WbvueJh+WuoeaguOS4jemAmui/h1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwYXRobmFtZTogXCIvaWRJZGVudGlmeVwiLFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoOlwiP2lzRmFpbGJhY2s9dHJ1ZSZlcnJNc2c9XCIrdGhpcy5zdGF0ZS5mYWlsUmVhc29uLm1zZytcIiZoYXNGYWlsUGljdHVyZT10cnVlJmZhaWxQaWN0cnVlT2JqPVwiK3BhcmFtXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIDxDcmVkaXRNb25leSBoYW5kbGVDbGljaz17dGhpcy5oYW5kbGVDbGlja30gey4uLnRoaXMuc3RhdGV9Lz47XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0NyZWRpdE1vbmV5cy9DcmVkaXRNb25leUNvbnRhaW5lcnMuanMiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbmF2aWdhdG9yID0gZ2xvYmFsLm5hdmlnYXRvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCAnJztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191c2VyLWFnZW50LmpzXG4vLyBtb2R1bGUgaWQgPSBlYzZjYmUzMTdiOTg1MGIwNWNlNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pc0l0ZXJhYmxlMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2lzLWl0ZXJhYmxlXCIpO1xuXG52YXIgX2lzSXRlcmFibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNJdGVyYWJsZTIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2dldC1pdGVyYXRvclwiKTtcblxudmFyIF9nZXRJdGVyYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRJdGVyYXRvcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9ICgwLCBfZ2V0SXRlcmF0b3IzLmRlZmF1bHQpKGFyciksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoKDAsIF9pc0l0ZXJhYmxlMy5kZWZhdWx0KShPYmplY3QoYXJyKSkpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgIH1cbiAgfTtcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gZWY1MWQ0OTg5ZjMwNDRiMmViMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQywgeCkge1xuICBhbk9iamVjdChDKTtcbiAgaWYgKGlzT2JqZWN0KHgpICYmIHguY29uc3RydWN0b3IgPT09IEMpIHJldHVybiB4O1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKEMpO1xuICB2YXIgcmVzb2x2ZSA9IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmU7XG4gIHJlc29sdmUoeCk7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanNcbi8vIG1vZHVsZSBpZCA9IGYwZGJjMTBjNjhkZDgxNDAxNGU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHRhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKCk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuL191c2VyLWFnZW50Jyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjggfHwgJyc7XG52YXIgJFByb21pc2UgPSBnbG9iYWxbUFJPTUlTRV07XG52YXIgaXNOb2RlID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG52YXIgZW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgSW50ZXJuYWwsIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlID0gJFByb21pc2UucmVzb2x2ZSgxKTtcbiAgICB2YXIgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uIChleGVjKSB7XG4gICAgICBleGVjKGVtcHR5LCBlbXB0eSk7XG4gICAgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKVxuICAgICAgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlXG4gICAgICAvLyB2OCA2LjYgKE5vZGUgMTAgYW5kIENocm9tZSA2NikgaGF2ZSBhIGJ1ZyB3aXRoIHJlc29sdmluZyBjdXN0b20gdGhlbmFibGVzXG4gICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04MzA1NjVcbiAgICAgIC8vIHdlIGNhbid0IGRldGVjdCBpdCBzeW5jaHJvbm91c2x5LCBzbyBqdXN0IGNoZWNrIHZlcnNpb25zXG4gICAgICAmJiB2OC5pbmRleE9mKCc2LjYnKSAhPT0gMFxuICAgICAgJiYgdXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZS82NicpID09PSAtMTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uIChwcm9taXNlLCBpc1JlamVjdCkge1xuICBpZiAocHJvbWlzZS5fbikgcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciBvayA9IHByb21pc2UuX3MgPT0gMTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uIChyZWFjdGlvbikge1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbDtcbiAgICAgIHZhciByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZTtcbiAgICAgIHZhciByZWplY3QgPSByZWFjdGlvbi5yZWplY3Q7XG4gICAgICB2YXIgZG9tYWluID0gcmVhY3Rpb24uZG9tYWluO1xuICAgICAgdmFyIHJlc3VsdCwgdGhlbiwgZXhpdGVkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5faCA9PSAyKSBvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpOyAvLyBtYXkgdGhyb3dcbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICAgICAgZXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChkb21haW4gJiYgIWV4aXRlZCkgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGkpIHJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmIChpc1JlamVjdCAmJiAhcHJvbWlzZS5faCkgb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciB1bmhhbmRsZWQgPSBpc1VuaGFuZGxlZChwcm9taXNlKTtcbiAgICB2YXIgcmVzdWx0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmICh1bmhhbmRsZWQpIHtcbiAgICAgIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbikge1xuICAgICAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHVuaGFuZGxlZCAmJiByZXN1bHQuZSkgdGhyb3cgcmVzdWx0LnY7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHJldHVybiBwcm9taXNlLl9oICE9PSAxICYmIChwcm9taXNlLl9hIHx8IHByb21pc2UuX2MpLmxlbmd0aCA9PT0gMDtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCkge1xuICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdiB9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZiAoIXByb21pc2UuX2EpIHByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICB2YXIgdGhlbjtcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkgdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSkge1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAkcmVqZWN0LmNhbGwoeyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJykoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX2EpIHRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fcykgbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSAkUHJvbWlzZSB8fCBDID09PSBXcmFwcGVyXG4gICAgICA/IG5ldyBPd25Qcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgOiBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgUHJvbWlzZTogJFByb21pc2UgfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpIHtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpO1xuICAgIHZhciAkJHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShMSUJSQVJZICYmIHRoaXMgPT09IFdyYXBwZXIgPyAkUHJvbWlzZSA6IHRoaXMsIHgpO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHtcbiAgJFByb21pc2UuYWxsKGl0ZXIpWydjYXRjaCddKGVtcHR5KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIHZhciByZW1haW5pbmcgPSAxO1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgJGluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgdmFyIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IGZhOTg3ZDgxMWU0ZWIyZDQzZDljXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCJdLCJzb3VyY2VSb290IjoiIn0=