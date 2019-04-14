webpackJsonp([19],{

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

/***/ "0444fb27207eef4f2caa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeStoreAddr = changeStoreAddr;

var _store = __webpack_require__("729bd0f3009c1858d0f9");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__("5d4604b08304c597d074");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 更改redux中的storeAddr
 * @param {*} addrInfo 地址详情
 */
function changeStoreAddr(addrInfo) {

    var addrItemToUpdate = {
        delivNm: "NO_DEFAULT", //收货人,设为非空，目的是返回申请物料页面时，不必再去发送请求，获取地址列表
        addAll: "", //地区名称
        delivPhone: "", //收货电话
        provinceId: "", //省ID
        cityId: "", //市ID
        areaId: "", //地区ID
        addressInfo: "", //详细地址
        id: ''
    };

    if (!!addrInfo.id && !!addrInfo.addAll) {
        //传递的是已存在的地址
        // 从地址信息中获取对应信息
        var memberName = addrInfo.memberName,
            addAll = addrInfo.addAll,
            phone = addrInfo.phone,
            provinceId = addrInfo.provinceId,
            cityId = addrInfo.cityId,
            areaId = addrInfo.areaId,
            addressInfo = addrInfo.addressInfo,
            id = addrInfo.id;

        addrItemToUpdate = {
            delivNm: memberName, //收货人
            addAll: addAll, //地区名称
            delivPhone: phone, //收货电话
            provinceId: provinceId, //省ID
            cityId: cityId, //市ID
            areaId: areaId, //地区ID
            addressInfo: addressInfo, //详细地址
            id: id //地址id
        };
    }

    _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
        storeAddr: addrItemToUpdate
    }));
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

/***/ "33cac9ed11d5318b4a01":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"AM":"AM","addressItems":"addressItems","item":"item","info":"info","text":"text","name":"name","default":"default","defaultFlag":"defaultFlag","show":"show","icon":"icon","address":"address","rightArrow":"rightArrow","handles":"handles","edit":"edit","add":"add","button":"button"};

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

/***/ "6063059c5e10b43ce815":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

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

__webpack_require__("33cac9ed11d5318b4a01");

var _reactRouterDom = __webpack_require__("91409e3157f4cc61f11f");

var _request = __webpack_require__("76fb50331ac78bf18670");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddressManagement = function (_Component) {
    (0, _inherits3.default)(AddressManagement, _Component);

    function AddressManagement(props) {
        (0, _classCallCheck3.default)(this, AddressManagement);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AddressManagement.__proto__ || (0, _getPrototypeOf2.default)(AddressManagement)).call(this, props));

        _this.changeRightIconOfNavBar = function () {
            if (_this.state.isEdit) {
                (0, _request.beforeEnterRouter)("收货地址", '取消', function () {
                    _this.setState({ isEdit: !_this.state.isEdit });
                }, null);
            } else {
                (0, _request.beforeEnterRouter)("收货地址", '编辑', function () {
                    _this.setState({ isEdit: !_this.state.isEdit });
                }, _request.Env.currentPath + "static/imgs/edit.png");
            }
        };

        _this.state = {
            isEdit: false
        };
        return _this;
    }

    /**
     * 根据页面是否处于编辑状态（isEdit），更改导航栏右上角图标的显示
     */


    (0, _createClass3.default)(AddressManagement, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            (0, _request.beforeEnterRouter)();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.changeRightIconOfNavBar();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.changeRightIconOfNavBar();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            (0, _request.beforeEnterRouter)();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                addressList = _props.addressList,
                clickToDelAddr = _props.clickToDelAddr,
                clickToChangeStoreAddr = _props.clickToChangeStoreAddr; // 获取从container传递过来的属性和方法

            var FLAG_DEF_ADDR = '1',
                // 默认地址标致
            FLAG_NORMAL_ADDR = '0'; // 非默认地址标致

            // 遍历数组，确保默认地址第一位显示
            addressList.forEach(function (item, index) {
                if (item.state == FLAG_DEF_ADDR && index != 0) {
                    var temp = item;
                    addressList[index] = addressList[0];
                    addressList[0] = temp;
                }
            });

            // 使用排序后的地址列表数组，渲染出地址列表组件
            var addrListComponents = addressList.map(function (ele, index) {

                var itemClassName = 'item',
                    // 单条地址item的类名
                defIconClassName = 'defaultFlag';
                if (ele.state == FLAG_DEF_ADDR) {
                    itemClassName += ' default';
                    defIconClassName += ' show';
                }
                if (!!_this2.state.isEdit) {
                    // 当前是编辑状态
                    itemClassName += ' edit';
                }

                return _react2.default.createElement(
                    "div",
                    { className: itemClassName, key: index },
                    _react2.default.createElement(
                        "div",
                        { className: "info" },
                        _react2.default.createElement(
                            "div",
                            { className: "text", onClick: function onClick() {
                                    clickToChangeStoreAddr(ele);
                                } },
                            _react2.default.createElement(
                                "div",
                                null,
                                _react2.default.createElement(
                                    "span",
                                    { className: "name" },
                                    " ",
                                    ele.memberName,
                                    " "
                                ),
                                _react2.default.createElement(
                                    "span",
                                    { className: "tel" },
                                    " ",
                                    ele.mobile,
                                    " "
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                null,
                                _react2.default.createElement(
                                    "span",
                                    { className: defIconClassName },
                                    _react2.default.createElement("i", { className: "icon" })
                                ),
                                _react2.default.createElement(
                                    "span",
                                    { className: "address" },
                                    ele.addressInfo
                                )
                            )
                        ),
                        _react2.default.createElement(_reactRouterDom.Link, { className: "rightArrow", to: "/handleAddress?addrItem=" + encodeURIComponent((0, _stringify2.default)(ele)) })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "handles" },
                        _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: "/handleAddress?addrItem=" + encodeURIComponent((0, _stringify2.default)(ele)) },
                                "\u7F16\u8F91"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                "span",
                                { onClick: function onClick() {
                                        clickToDelAddr(ele.id + '');
                                    } },
                                "\u5220\u9664"
                            )
                        )
                    )
                );
            });

            // 通过添加按钮传递给HandleAddress页面的地址信息
            var addrItemToSendByAddBtn = {
                "id": "", //地址id
                "memberId": "", //merId
                "memberName": "", //用户名
                "provinceId": "", //省ID
                "cityId": "", //市ID
                "areaId": "", //区ID
                "addAll": '', //省市区组合
                "addressInfo": "", //详细地址
                "mobile": "", //手机号
                "phone": "", //手机号
                "email": "", //邮件地址
                "zipCode": "", // zipCode
                "state": FLAG_NORMAL_ADDR //state必须设置为'0'
            };

            return _react2.default.createElement(
                "div",
                { id: "AM" },
                _react2.default.createElement(
                    "div",
                    { className: "addressItems" },
                    addrListComponents
                ),
                _react2.default.createElement(
                    "div",
                    { className: "add" },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: "/handleAddress?addrItem=" + encodeURIComponent((0, _stringify2.default)(addrItemToSendByAddBtn)) },
                        _react2.default.createElement(
                            "button",
                            { className: this.state.isEdit ? "button edit" : " button ",
                                disabled: this.state.isEdit },
                            " \u65B0\u589E"
                        )
                    )
                )
            );
        }
    }]);
    return AddressManagement;
}(_react.Component);

exports.default = AddressManagement;

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

/***/ "86fcba31c0bc8ff5aafc":
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

var _AddressManagement = __webpack_require__("6063059c5e10b43ce815");

var _AddressManagement2 = _interopRequireDefault(_AddressManagement);

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

var _store = __webpack_require__("729bd0f3009c1858d0f9");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__("5d4604b08304c597d074");

var _AddressManagementActions = __webpack_require__("0444fb27207eef4f2caa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddressManagementContainer = function (_Component) {
    (0, _inherits3.default)(AddressManagementContainer, _Component);

    function AddressManagementContainer() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, AddressManagementContainer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AddressManagementContainer.__proto__ || (0, _getPrototypeOf2.default)(AddressManagementContainer)).call.apply(_ref, [this].concat(args))), _this), _this.clickToChangeStoreAddr = function (addrItem) {
            (0, _AddressManagementActions.changeStoreAddr)(addrItem);
            _this.props.history.go(-1);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    /**
     * 在地址列表管理页面点击地址详情时，更改申请物料页面申请物料的地址信息，然后回退到申请物料页面
     * @param {*} addrItem 选中的地址信息
     */


    (0, _createClass3.default)(AddressManagementContainer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_AddressManagement2.default, (0, _extends3.default)({}, this.props, { clickToChangeStoreAddr: this.clickToChangeStoreAddr }));
        }
    }]);
    return AddressManagementContainer;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {
    return {
        addressList: state.getIn(['addressList']).toJS() //地址列表
    };
};
var mapDispathToProps = function mapDispathToProps(dispatch) {

    /**
     * 删除对应id的地址信息
     * @param {*} addrId 地址id
     */
    function clickToDelAddr(addrId) {
        (0, _requestAPI.deleteAddress)({
            id: addrId
        }).then(function (param) {
            var delId = param.id;
            var FLAG_DEF_ADDR = '1'; //默认地址的标识符
            // console.log('id'+delId);
            var addrList = _store2.default.getState().getIn(['addressList']).toJS();
            var storeAddr = _store2.default.getState().getIn(['storeAddr']).toJS();
            // 删除完成后更新redux中的addressList
            var lastestAddrList = addrList.filter(function (item) {
                return item.id != delId;
            });
            dispatch((0, _action.UPDATE_STORE_STATE)({ 'addressList': lastestAddrList }));

            //如果当前删除的是物料申请页面选中的地址，则需要更新申请物料页面使用的storeAddr
            if (storeAddr.id == delId) {
                var addrItem = {};
                // 如果有默认地址，则将默认地址设为将要更新的地址
                lastestAddrList.forEach(function (item) {
                    if (item.state == FLAG_DEF_ADDR) {
                        addrItem = item;
                    }
                });
                (0, _AddressManagementActions.changeStoreAddr)(addrItem);
            }
        });
    }
    return {
        clickToDelAddr: clickToDelAddr
    };
};
exports.default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(AddressManagementContainer);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BZGRyZXNzTWFuYWdlbWVudC9BZGRyZXNzTWFuYWdlbWVudEFjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BZGRyZXNzTWFuYWdlbWVudC9BZGRyZXNzTWFuYWdlbWVudC5zY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0FkZHJlc3NNYW5hZ2VtZW50L0FkZHJlc3NNYW5hZ2VtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BZGRyZXNzTWFuYWdlbWVudC9BZGRyZXNzTWFuYWdlbWVudENvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyJdLCJuYW1lcyI6WyJyZWNtZFJlY29yZCIsInNoYXJsaW5rIiwiaXNCbGFjayIsImlzQXBwbHkiLCJhcHBseU1jYyIsImdldENhcmRsaXN0IiwiZ2V0QWRkckxpc3QiLCJhcHBseU1hdCIsImdldFFyVXJsUmVzdCIsImdldE1jaG50QW5kQXJlYUluZiIsImdldE1jaG50RGV0YWlsIiwidXBncmFkZU1jYyIsImdldFByb3RvY29sSW5mbyIsImdldEhpc3RvcnlJbmNvbWUiLCJnZXRIaXN0b3J5VHJhbnMiLCJnZXRUb2RheUluY29tZSIsImdldFRvZGF5VHJhbnMiLCJnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtIiwiZ2V0TG9naXN0aWNzU3QiLCJnZXRVcGdyYWRlU3QiLCJnZXRMb2dpc3RpY3NMaXN0IiwiZ2V0QXVkaXRJbmZvIiwiZ2V0TGltaXRBdEluZm8iLCJtY2hudE9wZXIiLCJkZWxldGVBZGRyZXNzIiwidXBkYXRlTWNjQ2FyZCIsIm5ld0FkZHJlc3MiLCJlZGl0QWRkcmVzcyIsInNldE1jY09uT2ZmIiwiZ2V0TWNjVHJhbnNOdW0iLCJwaG9uZSIsInVuZGVmaW5lZCIsInJlY21kTW9iaWxlIiwiVXRpbCIsImJhc2U2NEVuY29kZSIsIkNPTkZJRyIsIlJFU1QiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwiU1RBVFVTQ09ERSIsIlNVQ0NFU1MiLCJyb2xsS2V5IiwiQ0FDSEVLRVkiLCJzZWNvbmRLZXkiLCJmdWxsIiwicmVzb2x2ZSIsInNoYXJlTGluayIsInJlZFVybFN0ciIsImRhdGEiLCJpZGVudGlmaWVyIiwibmV4dFN0YXRlIiwic3RvcmUiLCJkaXNwYXRjaCIsInVwZGF0ZSIsInVwZGF0ZUZ1bmMiLCJyZXNwIiwiYmxhY2tTdCIsImNvbnNvbGUiLCJsb2ciLCJjYWNoZVBhcmFtIiwiYXBwbHlTdCIsInBhcmFtIiwicmVmZXJlZVRlbCIsInZpcnR1YWxDYXJkTm8iLCJhY2NObSIsImNpdHlDZCIsImNvbW9tUGFyYW0iLCJnZXRNY2NDYXJkTGlzdCIsImNhcmRMaXN0IiwibGVuZ3RoIiwiZGVmYWx1dENhcmQiLCJiYW5rIiwiY2FyZFR5cGUiLCJmdW5jdGlvbkJpdG1hcCIsImljb25SZWxVcmwiLCJpc1N1cHBvcnQiLCJwYW4iLCJyYW5rIiwic2VsZWN0ZWQiLCJmb3JFYWNoIiwiaXRlbSIsImsiLCJzdG9yZVN0YXRlIiwic3RvcmVSZWNlaXZlQ2FyZE9iaiIsInN0YXRlIiwiYWRkcmVzc0xpc3QiLCJyZXN1bHQiLCJtYXRlcmlhbExpc3QiLCJkZWxpdk5tIiwiYWRkQWxsIiwiZGVsaXZQaG9uZSIsInByb3ZpbmNlSWQiLCJjaXR5SWQiLCJhcmVhSWQiLCJhZGRyZXNzSW5mbyIsImlkIiwiY2l0eU5tIiwicmVkVXJsIiwiZ2V0UXJVcmwiLCJtY2hudERldGFpbCIsInFyVXJsIiwicXJOdW0iLCJhcmVhIiwibWVyY2hhbnRUcCIsImFyZWFBcnIiLCJwcm92aW5jZSIsIm9uZSIsInByb0lkIiwicHJvTm0iLCJ0d28iLCJjaXR5IiwidGhyZWUiLCJ2YWx1ZSIsImNoaWxkcmVuIiwicHVzaCIsImFyZWFObSIsIm1lcmNoYW50VHBBcnIiLCJtZXJUeXBlMSIsIm1lcmNoYW50VHBDZCIsIm1lcmNoYW50VHBObSIsIm1lclR5cGUyIiwibWNobnRBbmRBcmVhSW5mIiwic3RvcmVObSIsIlN0b3JlVHAiLCJwcm92Q2QiLCJjb3V0eUNkIiwiYWRkciIsImNlcnRpZlBpYzEiLCJjZXJ0aWZQaWMyIiwiY2VydGlmUGljMyIsImxpY2Vuc2VQaWMiLCJzaG9wUGljMSIsInNob3BQaWMyIiwiYXV4UHJvdk1hdDEiLCJhdXhQcm92TWF0MiIsInNob3BMb2dvUGljIiwiVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3QiLCJyZXMiLCJoaXN0b3J5SW5jb21lT2JqIiwib3JpZ2luTGlzdERhdGEiLCJnZXRTdGF0ZSIsImdldEluIiwidG9KUyIsIm5ld0xpc3QiLCJ0cmFuc0luZm8iLCJoaXN0b3J5T3JkZXJMaXN0IiwiY29uY2F0IiwidG9kYXlJbmNvbWVPYmoiLCJ0b2RheU9yZGVyTGlzdCIsIm5ld09iaiIsImRlbGl2ZXJ5TXNnIiwibWF0RGVsaXZTdGF0dXMiLCJsaW1pdEluZm8iLCJpc1VzZU1jYyIsIm1jY1RyYW5zTnVtIiwidHJhbnNOdW0iLCJjaGFuZ2VTdG9yZUFkZHIiLCJhZGRySW5mbyIsImFkZHJJdGVtVG9VcGRhdGUiLCJtZW1iZXJOYW1lIiwic3RvcmVBZGRyIiwiQWRkcmVzc01hbmFnZW1lbnQiLCJwcm9wcyIsImNoYW5nZVJpZ2h0SWNvbk9mTmF2QmFyIiwiaXNFZGl0Iiwic2V0U3RhdGUiLCJFbnYiLCJjdXJyZW50UGF0aCIsImNsaWNrVG9EZWxBZGRyIiwiY2xpY2tUb0NoYW5nZVN0b3JlQWRkciIsIkZMQUdfREVGX0FERFIiLCJGTEFHX05PUk1BTF9BRERSIiwiaW5kZXgiLCJ0ZW1wIiwiYWRkckxpc3RDb21wb25lbnRzIiwibWFwIiwiZWxlIiwiaXRlbUNsYXNzTmFtZSIsImRlZkljb25DbGFzc05hbWUiLCJtb2JpbGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJhZGRySXRlbVRvU2VuZEJ5QWRkQnRuIiwiQ29tcG9uZW50IiwicmVxdWVzdCIsInNldFhpYW9XZWlQYXkiLCJ3aW5kb3ciLCJVUCIsIlciLCJBcHAiLCJyZWdQaG9uZSIsInJlZ1BheU51bSIsInZlcnNpb24iLCJzb3VyY2UiLCJiYXNlVXJsIiwiYmFzZVVybDIiLCJiYXNlVXJsMyIsImxvY2F0aW9uIiwiaG9zdG5hbWUiLCJpbmRleE9mIiwicHJvdG9jb2wiLCJnZXRTZXJ2VXJsIiwidXJsIiwic2VydmVyVXJsIiwidXNlckluZm8iLCJzcGxpdCIsImdldENpdHkiLCJyZXNwb25zZUZvcm1hdHRlciIsInBhcmFtcyIsIm1zZyIsImRlbGV0ZVNsYXNoIiwiaG9zdCIsInJlcGxhY2UiLCJhZGRTbGFzaCIsInBhdGgiLCJ0ZXN0Iiwic2VwYXJhdGVQYXJhbXMiLCJwYXJhbXNMaW5lIiwia2V5IiwiY29uZmlnIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJmaW5hbFVybCIsInJlamVjdCIsIm9wdGlvbnMiLCJ0eXBlIiwic3VjY2VzcyIsImVycm9yIiwiRXJyb3IiLCJkYXRhVHlwZSIsIiQiLCJhamF4IiwiZ2V0IiwicGFyYW1BbGwiLCJmb3JDaHNwIiwiZW5jcnlwdCIsImNhY2hlIiwiYnlBamF4IiwicG9zdCIsInB1dCIsImRlbCIsImdldFNlYXJjaFBhcmFtIiwic2VhcmNoIiwic3RyIiwic2xpY2UiLCJhcnJheSIsIm9iaiIsInN1YyIsImVyciIsImFwcCIsInNldFhpYW9XZWlBdWRpbyIsImdldFhpYW9XZWlBdWRpbyIsInRvYXN0IiwibXMiLCJUb2FzdCIsImluZm8iLCJiZWZvcmVFbnRlclJvdXRlciIsInRpdGxlIiwicmlnaHRCYXIiLCJyaWdodENhbGxiYWNrIiwicmlnaHRCYXJJbWciLCJkb2N1bWVudCIsIm9uUGx1Z2luUmVhZHkiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJzZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24iLCJtY2NTdGF0ZUNoYW5nZWQiLCJzZW5kUXJDb2RlIiwiZmFpbCIsInNjYW5RUkNvZGUiLCJjbG9zZVdlYlZpZXciLCJ2ZXJpZnlQYXlQd2QiLCJjcmVhdGVXZWJWaWV3IiwiaXNGaW5pc2giLCJnZXRVc2VyRGV0YWlsSW5mbyIsInNhdmVRY29kZSIsImNhbnZhcyIsInVpIiwiVUkiLCJwaWNVcmwiLCJ0b0RhdGFVUkwiLCJsb2dFdmVudCIsInNhdmVQaWNUb0xvY2FsIiwic3Vic3RyIiwic2hvd1RvYXN0V2l0aFBpYyIsInNob3dBbGVydCIsImVudiIsImlzSU9TIiwib3BlbkJyb3dzZXIiLCJzaG93VG9hc3QiLCJzaGFyZSIsImRlc2MiLCJpbWdVUkwiLCJwYWdlVVJsIiwic2hvd1NoYXJlUGFuZWwiLCJzaGFyZVVybCIsImdldEN1cnJlbnRMb2NhdGlvbkluZm8iLCJjYWxsYmFjazIiLCJzaG93TG9hZGluZyIsImNhbGxiYWNrIiwiZGlzbWlzcyIsInNlbmRNZXNzYWdlIiwiY21kIiwiZmV0Y2hOYXRpdmVEYXRhIiwieGhyIiwiY3JlYXRlVGV4dENhbnZhc2UiLCJ0ZXh0IiwiY29sb3IiLCJsb25nIiwic2hvdCIsInJlbTJweCIsInZhbCIsImNXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0Iiwic2V0QXR0cmlidXRlIiwid2lkdGgiLCJyb3RhdGUiLCJNYXRoIiwiUEkiLCJmaWxsU3R5bGUiLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsImZvbnQiLCJtZWFzdXJlVGV4dCIsImZpbGxUZXh0IiwiY3JlYXRlQ29udmFzQW5kU2F2ZVBob3RvIiwiY2FudmFzT2JqIiwiYmd1cmwiLCJxcmNvZGVVUkwiLCJxcmNvZGVXZEFuZEhnIiwieFdpZHRoIiwieUhlaWdodCIsInRleHRiZ1VSTCIsInhUZXh0V2lkdGgiLCJ5VGV4dEhlaWdodCIsImltZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwiaGVpZ2h0IiwiZHJhd0ltYWdlIiwidGV4dFVyaSIsInRleHRJbWciLCJxcmNvZGVXaWR0aEFuZEhlaWdodCIsImlubmVySFRNTCIsInFyY29kZSIsIlFSQ29kZSIsImNvcnJlY3RMZXZlbCIsIkNvcnJlY3RMZXZlbCIsIkwiLCJxcmNvZGVJbWciLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInFyY29kZUR4IiwicXJjb2RlRHkiLCJnZXRNYXRlcmllbEluZm9MaXN0IiwiZ2V0UmV3YXJkTGlzdCIsIkNPTlNUX0RBVEEiLCJpbWdlU2l6ZSIsImNhY2hlRmlyc3QiLCJ0aW1lIiwic3RvcmFnZSIsInZhbGlkYXRlVGltZSIsImNhY2hlRmlyc3RTdG9yYWdlIiwibmVlZFN3Iiwic3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlIiwicmVmcmVzaERvbUZ1bmMiLCJyZXEiLCJkYXRhRnJvbUNhY2hlIiwiZ2V0RnJvbVN0b3JhZ2UiLCJyZW1vdmVTdG9yYWdlIiwiaXNTYW1lQXRBbGwiLCJJbW11dGFibGUiLCJpcyIsImZyb21KUyIsImFzeW5jIiwiZW5kT2ZTeW5jRnVuYyIsInJlbW92ZUNhY2hlIiwiQWRkcmVzc01hbmFnZW1lbnRDb250YWluZXIiLCJhZGRySXRlbSIsImhpc3RvcnkiLCJnbyIsIm1hcHN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGhUb1Byb3BzIiwiYWRkcklkIiwiZGVsSWQiLCJhZGRyTGlzdCIsImxhc3Rlc3RBZGRyTGlzdCIsImZpbHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFXZ0JBLFcsR0FBQUEsVztRQXlCQUMsUSxHQUFBQSxRO1FBaUJBQyxPLEdBQUFBLE87UUF1QkFDLE8sR0FBQUEsTztRQW9CQUMsUSxHQUFBQSxRO1FBMEJBQyxXLEdBQUFBLFc7UUFnREFDLFcsR0FBQUEsVztRQWdDQUMsUSxHQUFBQSxRO1FBb0JBQyxZLEdBQUFBLFk7UUFtQkFDLGtCLEdBQUFBLGtCO1FBbUhBQyxjLEdBQUFBLGM7UUFnQkFDLFUsR0FBQUEsVTtRQWdDQUMsZSxHQUFBQSxlO1FBZUFDLGdCLEdBQUFBLGdCO1FBZUFDLGUsR0FBQUEsZTtRQWlCQUMsYyxHQUFBQSxjO1FBZUFDLGEsR0FBQUEsYTtRQWdCQUMseUIsR0FBQUEseUI7UUFNQUMsYyxHQUFBQSxjO1FBdUJBQyxZLEdBQUFBLFk7UUFXQUMsZ0IsR0FBQUEsZ0I7UUFZQUMsWSxHQUFBQSxZO1FBWUFDLGMsR0FBQUEsYztRQWFBQyxTLEdBQUFBLFM7UUFZQUMsYSxHQUFBQSxh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QUFVLG1CQUFPLENBQUMsc0JBQVM7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGdEQUFnRCxtQkFBTyxDQUFDLHNCQUFnQjtBQUN4RTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiY2h1bmsvQWRkcmVzc01hbmFnZW1lbnQuNWMwMjFkNDIxMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y29tb21QYXJhbSwgZ2V0LCBwb3N0LCBVdGlsfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7fSBmcm9tIFwiLi9jYWNoZVN0b3JhZ2VcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gXCIuLi8uLi9zdG9yZS9zdG9yZVwiO1xyXG5pbXBvcnQge1VQREFURV9TVE9SRV9TVEFURX0gZnJvbSBcIi4uLy4uL3N0b3JlL2FjdGlvblwiO1xyXG5pbXBvcnQge2NhY2hlRmlyc3QsY2FjaGVGaXJzdFN0b3JhZ2Usc3RhbGVXaGlsZVJldmFsaWRhdGVTdG9yYWdlLHJlbW92ZUNhY2hlfSBmcm9tIFwiLi9jYWNoZVN0b3JhZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiDnlLPor7fnuqLljIXnoIHnmoTor7fmsYJcclxuICogQHBhcmFtIHBob25lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVjbWRSZWNvcmQocGhvbmUpIHtcclxuICAgIGlmIChwaG9uZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBwaG9uZSA9IFwiXCJcclxuICAgIH1cclxuICAgIGxldCByZWNtZE1vYmlsZSA9IFV0aWwuYmFzZTY0RW5jb2RlKHBob25lKVxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QucmVjbWRSZWNvcmQsIHtyZWNtZE1vYmlsZX0pLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpueUs+ivt+e6ouWMheeggeaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXlcclxuICAgICAgICAgICAgfSwoKT0+e30sKCk9PntcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDor7fmsYLnuqLljIXlkJfov57mjqVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFybGluaygpIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnNoYXJlTGluaywge30pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICBsZXQgcmVkVXJsU3RyPSBcImh0dHBzOi8vd2FsbGV0Ljk1NTE2LmNvbS9zL3dsL3dlYlYzL2FjdGl2aXR5L3ZNYXJrZXRpbmcyL2h0bWwvc25zSW5kZXguaHRtbD9yPVwiICsgcmVzcG9uc2UuZGF0YS5pZGVudGlmaWVyO1xyXG4gICAgICAgICAgICBsZXQgbmV4dFN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgcmVkVXJsU3RyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKG5leHRTdGF0ZSkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVkVXJsU3RyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOaYr+WQpuWcqOeZveWQjeWNleeahOivt+axglxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQmxhY2sodXBkYXRlKSB7XHJcbiAgICBsZXQgdXBkYXRlRnVuYyA9IGZ1bmN0aW9uKHJlc3Ape1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGJsYWNrU3Q6cmVzcC5kYXRhLmJsYWNrU3RcclxuICAgICAgICB9KSlcclxuICAgICAgICBjb25zb2xlLmxvZygnaXNCbGFjazogdXBkYXRl5Ye95pWw5omn6KGM5a6M5q+VJyk7XHJcbiAgICAgICAgaWYoIHR5cGVvZiB1cGRhdGUgPT09ICdmdW5jdGlvbicgKXtcclxuICAgICAgICAgICAgdXBkYXRlKHJlc3ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v6K+75Y+W57yT5a2Y77yM5ZCM5pe25byC5q2l5Y+R6YCB6K+35rGCXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5pc0JsYWNrLHt9LHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSh1cGRhdGVGdW5jKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYmxhY2tTdDpyZXNwb25zZS5kYXRhLmJsYWNrU3RcclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKblnKjpu5HlkI3ljZXnmoTor7fmsYJcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNBcHBseSgpIHtcclxuICAgIGxldCBjYWNoZVBhcmFtID0gY2FjaGVGaXJzdFN0b3JhZ2UoMzAqNjAqMTAwMCxDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LCBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXkpOy8v57yT5a2YMzDliIbpkp9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuaXNBcHBseSwge30sY2FjaGVQYXJhbSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5hcHBseVN0ICE9IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDlpoLmnpzlt7Lnu4/nlLPor7fov4fnuqLljIXnoIHliJnnvJPlrZgzMOWIhumSn++8jOWQpuWImeS4jee8k+WtmFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5KVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBhcHBseVN0OnJlc3BvbnNlLmRhdGEuYXBwbHlTdFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOeUs+ivt+aUtuasvueggVxyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNY2MocGFyYW0gPSB7XHJcbiAgICByZWZlcmVlVGVsOiBcIlwiLCAgICAgICAgIC8v5o6o6I2Q5Lq65omL5py65Y+3XHJcbiAgICB2aXJ0dWFsQ2FyZE5vOiBcIlwiLCAgICAgIC8v6Jma5ouf5Y2h5Y+3XHJcbiAgICBhY2NObTogXCJcIiwgICAgICAgICAgICAgIC8v5bqX6ZO65ZCN56ewXHJcbiAgICBjaXR5Q2Q6IFwiXCIgICAgICAgICAgICAgICAvL+WfjuW4guS7o+eggVxyXG59KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5hcHBseU1jYywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpueUs+ivt+e6ouWMheeggeaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5yb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5OiBDT05GSUcuQ0FDSEVLRVkuaXNBcHBseS5zZWNvbmRLZXlcclxuICAgICAgICAgICAgfSwoKT0+e30sKCk9PntcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNhY2hlKHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTpk7booYzljaHliJfooahcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDYXJkbGlzdCgpIHtcclxuICAgIC8v6I635Y+W55So5oi36ZO26KGM5Y2h5YiX6KGo77yM57yT5a2YMeWIhumSn1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRNY2NDYXJkTGlzdCwgY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSg2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAvL+WmguaenOWQjuWPsOi/lOWbnumTtuihjOWNoeWIl+ihqOS4lOS4jeS4uuepulxyXG4gICAgICAgIGlmICghIXJlc3BvbnNlLmRhdGEuY2FyZExpc3QgJiYgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5sZW5ndGggIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgLy/liJ3lp4vljJbpu5jorqTljaFcclxuICAgICAgICAgICAgbGV0IGRlZmFsdXRDYXJkID0ge1xyXG4gICAgICAgICAgICAgICAgYmFuazogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeaJgOWcqOeahOmTtuihjFxyXG4gICAgICAgICAgICAgICAgY2FyZFR5cGU6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h57G75Z6LXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbkJpdG1hcDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHlip/og73kvY1cclxuICAgICAgICAgICAgICAgIGljb25SZWxVcmw6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeeahGxvZ2/lnLDlnYBcclxuICAgICAgICAgICAgICAgIGlzU3VwcG9ydDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5pSv5oyBXHJcbiAgICAgICAgICAgICAgICBwYW46IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W4puacieaOqeeggeeahOWNoeWPt1xyXG4gICAgICAgICAgICAgICAgcmFuazogMCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm6YCJ5LitXHJcbiAgICAgICAgICAgICAgICB2aXJ0dWFsQ2FyZE5vOiBcIlwiICAgLy/omZrmi5/ljaHlj7dcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuY2FyZExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhaXRlbS5zZWxlY3RlZCAmJiBpdGVtLmlzU3VwcG9ydCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYWx1dENhcmQgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL+WmguaenOayoeaciem7mOiupOmAieS4reeahOWNoeWPluS4gOS4quS4jeiiq+e9ruS4uueBsOeahOWNoeS4uum7mOiupOWNoVxyXG4gICAgICAgICAgICBpZiAoZGVmYWx1dENhcmQuYmFuay5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZXNwb25zZS5kYXRhLmNhcmRMaXN0Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuY2FyZExpc3Rba10uaXNTdXBwb3J0ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYWx1dENhcmQgPSByZXNwb25zZS5kYXRhLmNhcmRMaXN0W2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0b3JlU3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yZVJlY2VpdmVDYXJkT2JqOiBkZWZhbHV0Q2FyZCxcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0OiByZXNwb25zZS5kYXRhLmNhcmRMaXN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHN0b3JlU3RhdGUpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWcsOWdgOWIl+ihqFxyXG4gKiBAcGFyYW0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWRkckxpc3QoXHJcbiAgICB1cGRhdGUsIC8v57yT5a2Y55qE5pu05paw5Ye95pWwXHJcbiAgICBwYXJhbSA9IHtcclxuICAgICAgICBzdGF0ZTogXCJcIiAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuKSB7XHJcbiAgICAvLyDor7vlj5bnvJPlrZjvvIzlkIzml7blvILmraXlj5HpgIHor7fmsYJcclxuICAgIGxldCB1cGRhdGVGdW5jID0gZnVuY3Rpb24ocmVzcCl7XHJcbiAgICAgICAgLy8g5ZyodXBkYXRl5Ye95pWw5Lit77yM5pu05pawcmVkdXjkuK3nmoRhZGRyZXNzTGlzdFxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7YWRkcmVzc0xpc3Q6cmVzcC5kYXRhLnJlc3VsdHx8W119KSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEFkZHJMaXN0OiB1cGRhdGXlh73mlbDmiafooYzlrozmr5UnKTtcclxuICAgICAgICBpZiggdHlwZW9mIHVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXNwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSh1cGRhdGVGdW5jLENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpO1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0QWRkckxpc3QsIE9iamVjdC5hc3NpZ24oe30sIGNvbW9tUGFyYW0sIHBhcmFtKSxjYWNoZVBhcmFtKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgYWRkcmVzc0xpc3QgPSByZXNwb25zZS5kYXRhLnJlc3VsdCB8fCBbXTtcclxuXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYWRkcmVzc0xpc3RcclxuICAgICAgICB9KSlcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnlLPor7fnianmlpnmjqXlj6NcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWF0KHBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+eJqeaWmeWIl+ihqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2Tm06IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+S6ulxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEFsbDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWMuuWQjeensFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2UGhvbmU6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+eUteivnVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ecgUlEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5biCSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDljLpJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3NJbmZvOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ivpue7huWcsOWdgFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnJywgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWdgOeahElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eU5tOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5omA5Zyo5Z+O5biCQ2l0eUNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRVcmw6IFwiXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nuqLljIXnoIHlnLDlnYAgIOWPr+mAieWPguaVsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuYXBwbHlNYXQsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5ZWG5oi35pS25qy+56CB5Zyw5Z2A5ZKM5ZWG5oi357yW5Y+3XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXJVcmxSZXN0KCkge1xyXG4gICAgLy/nvJPlrZgy5bCP5pe2XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFFyVXJsLCBjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBtY2hudERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgcXJVcmw6IHJlc3BvbnNlLmRhdGEucXJVcmwsXHJcbiAgICAgICAgICAgICAgICBxck51bTogcmVzcG9uc2UuZGF0YS5xck51bVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKuiOt+WPluW6l+mTuuWMuuWfn+WIl+ihqOWSjOW6l+mTuuexu+Wei+WIl+ihqFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNobnRBbmRBcmVhSW5mKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+Z5Liq5o6l5Y+jLOWPqui1sHN377yM5LiN6LWwbG9hY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICAvLyBsZXQgY2FjaGVQYXJhbSA9IHtcclxuICAgIC8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4gICAgLy8gICAgIGZvckNoc3A6ZmFsc2UsXHJcbiAgICAvLyAgICAgZW5jcnlwdDpmYWxzZSxcclxuICAgIC8vICAgICBjYWNoZTogdHJ1ZVxyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRNY2hudEFuZEFyZWFJbmYsIGNvbW9tUGFyYW0sIGNhY2hlRmlyc3QoMjQqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgbGV0IGFyZWEgPSBbXSwgbWVyY2hhbnRUcCA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOecgee6p1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5hcmVhQXJyLmZvckVhY2goKHByb3ZpbmNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9uZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHByb3ZpbmNlLnByb0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogcHJvdmluY2UucHJvTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHByb3ZpbmNlLnByb05tID09IFwi5YyX5Lqs5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLkuIrmtbfluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIuWkqea0peW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi6YeN5bqG5biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLmt7HlnLPluIJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogcHJvdmluY2UucHJvSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogcHJvdmluY2UucHJvTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlLmNpdHkuZm9yRWFjaCgoY2l0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhyZWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGNpdHkuY2l0eUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBjaXR5LmNpdHlObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhyZWUudmFsdWUgIT0gdHdvLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d28uY2hpbGRyZW4ucHVzaCh0aHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgKiDluILnuqdcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBwcm92aW5jZS5jaXR5LmZvckVhY2goKGNpdHkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0d28gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGNpdHkuY2l0eUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBjaXR5LmNpdHlObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIOWMuue6p1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5hcmVhLmZvckVhY2goKGFyZWEpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhyZWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBhcmVhLmFyZWFJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IGFyZWEuYXJlYU5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d28uY2hpbGRyZW4ucHVzaCh0aHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYXJlYS5wdXNoKG9uZSk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLm1lcmNoYW50VHBBcnIuZm9yRWFjaCgobWVyVHlwZTEpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvbmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtZXJUeXBlMS5tZXJjaGFudFRwQ2QsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBtZXJUeXBlMS5tZXJjaGFudFRwTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1lclR5cGUxLm1lcmNoYW50VHBBcnIuZm9yRWFjaCgobWVyVHlwZTIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IG1lclR5cGUyLm1lcmNoYW50VHBDZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBtZXJUeXBlMi5tZXJjaGFudFRwTm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uZS5jaGlsZHJlbi5wdXNoKHR3byk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIG1lcmNoYW50VHAucHVzaChvbmUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV4dFN0YXRlID0ge1xyXG4gICAgICAgICAgICBtY2hudEFuZEFyZWFJbmY6IHtcclxuICAgICAgICAgICAgICAgIGFyZWFBcnI6IGFyZWEsXHJcbiAgICAgICAgICAgICAgICBtZXJjaGFudFRwQXJyOiBtZXJjaGFudFRwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKG5leHRTdGF0ZSkpXHJcblxyXG4gICAgfSlcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5blupfpk7ror6bmg4Xkv6Hmga9cclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNobnREZXRhaWwoKSB7XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IGNhY2hlRmlyc3RTdG9yYWdlKDYwKjEwMDAsQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7Ly/nvJPlrZgx5YiG6ZKfXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRNY2hudERldGFpbCwgY29tb21QYXJhbSxjYWNoZVBhcmFtKS50aGVuKChyZXNwKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3Auc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgbGV0IG1jaG50RGV0YWlsID0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe21jaG50RGV0YWlsfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1jaG50RGV0YWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5Y2H57qn5ZWG6ZO65LqM57u056CBXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGdyYWRlTWNjKHBhcmFtPXtcclxuICAgIHN0b3JlTm06IFwiXCIsICAgIC8v5bqX6ZO65ZCN56ewXHJcbiAgICBTdG9yZVRwOiBcIlwiLCAgICAvL+W6l+mTuuexu+Wei1xyXG4gICAgcHJvdkNkOiBcIlwiLCAgICAgLy/nnIFJRFxyXG4gICAgY2l0eUNkOiBcIlwiLCAgICAgLy/luIJJRFxyXG4gICAgY291dHlDZDogXCJcIiwgICAgLy/ljLpJRFxyXG4gICAgYWRkcjogXCJcIiwgICAgICAgLy/lnLDlnYBcclxuICAgIGNlcnRpZlBpYzE6IFwiXCIsIC8v6Lqr5Lu96K+B5q2j6Z2i54WnXHJcbiAgICBjZXJ0aWZQaWMyOiBcIlwiLCAvL+i6q+S7veivgeWPjemdoueFp1xyXG4gICAgY2VydGlmUGljMzogXCJcIiwgLy/miYvmjIHouqvku73or4HnhafniYdcclxuICAgIGxpY2Vuc2VQaWM6IFwiXCIsIC8v6JCl5Lia5omn54WnXHJcbiAgICBzaG9wUGljMTogXCJcIiwgICAvL+W6l+mTuueFp+eJhzFcclxuICAgIHNob3BQaWMyOiBcIlwiLCAgIC8v5bqX6ZO654Wn54mHMlxyXG4gICAgYXV4UHJvdk1hdDE6IFwiXCIsLy/ovoXliqnnhafniYcxXHJcbiAgICBhdXhQcm92TWF0MjogXCJcIiwvL+i+heWKqeeFp+eJhzJcclxuICAgIHNob3BMb2dvUGljOiBcIlwiIC8v5bqX6ZO6TE9HT1xyXG59KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC51cGdyYWRlTWNjLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk5bqX6ZO66K+m5oOF55qE57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpO1xyXG4gICAgICAgICAgICAvL+WIoOmZpOeUqOaIt+aYr+WQpuWNh+e6p+eahOaOpeWPo+eahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Qucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0LnNlY29uZEtleSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTljY/orq7nvJblj7flkozljY/orq7lkI3np7BcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvdG9jb2xJbmZvKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiDov5nkuKrmjqXlj6Ms57yT5a2YMuWwj+aXtlxyXG4gICAgICovXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFByb3RvY29sSW5mbywgY29tb21QYXJhbSxjYWNoZUZpcnN0U3RvcmFnZSgyKjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZS5kYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDljoblj7LmlLbmrL5cclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlzdG9yeUluY29tZShwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0SGlzdG9yeUluY29tZSwgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeUluY29tZU9iajogcmVzLmRhdGFcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5Y6G5Y+y6K6i5Y2VXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpc3RvcnlUcmFucyhwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0SGlzdG9yeVRyYW5zLCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBsZXQgb3JpZ2luTGlzdERhdGEgPSBzdG9yZS5nZXRTdGF0ZSgpLmdldEluKFsnaGlzdG9yeU9yZGVyTGlzdCddKS50b0pTKClcclxuICAgICAgICAgICAgbGV0IG5ld0xpc3QgPSByZXMuZGF0YS50cmFuc0luZm87XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0xpc3QpXHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5T3JkZXJMaXN0OiBvcmlnaW5MaXN0RGF0YS5jb25jYXQobmV3TGlzdClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5LuK5pel5pS25qy+XHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5SW5jb21lKCkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VG9kYXlJbmNvbWUsY29tb21QYXJhbSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgdG9kYXlJbmNvbWVPYmo6IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDku4rml6XorqLljZVcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9kYXlUcmFucyhwYXJhbSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0VG9kYXlUcmFucywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgbGV0IG9yaWdpbkxpc3REYXRhID0gc3RvcmUuZ2V0U3RhdGUoKS5nZXRJbihbJ3RvZGF5T3JkZXJMaXN0J10pLnRvSlMoKVxyXG4gICAgICAgICAgICBsZXQgbmV3TGlzdCA9IHJlcy5kYXRhLnRyYW5zSW5mbztcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIHRvZGF5T3JkZXJMaXN0OiBvcmlnaW5MaXN0RGF0YS5jb25jYXQobmV3TGlzdClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5Y2V56yU5p+l6K+iXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0ocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0sT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSlcclxufVxyXG4vKipcclxuICog6I635Y+W54mp5rWB5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naXN0aWNzU3QocGFyYW0pe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRMb2dpc3RpY3NTdCwgT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICBsZXQgbmV3T2JqID0gcmVzLmRhdGEuZGVsaXZlcnlNc2c7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBuZXdPYmoubWF0RGVsaXZTdGF0dXMg55qE54q25oCB5ZKMcmVkdXjnmoRzdG9yZeS/neaMgeS4gOiHtFxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIG5ld09iai5tYXREZWxpdlN0YXR1cyA9IHJlcy5kYXRhLm1hdERlbGl2U3RhdHVzO1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgZGVsaXZlcnlNc2c6IG5ld09ialxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDllYbmiLfmnI3liqHpppbpobUg54K55Ye75L+h55So5Y2h5oyJ6ZKu5p+l6K+i5ZWG5oi35piv5ZCm5byA6YCa6L+H5L+h55So5Y2h5pS25qy+XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXBncmFkZVN0KCl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldFVwZ3JhZGVTdCwgY29tb21QYXJhbSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnianmlpnljoblj7LorqLljZVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpc3RpY3NMaXN0KHBhcmFtKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TG9naXN0aWNzTGlzdCxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMDBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5p+l6K+i5L+h55So5Y2h5pS25qy+5Y2H57qn54q25oCBXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXVkaXRJbmZvKCl7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRBdWRpdEluZm8sIGNvbW9tUGFyYW0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bmlLbmrL7pmZDpop3or6bmg4VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW1pdEF0SW5mbygpe1xyXG4gICAgLy/nvJPlrZgy5Liq5bCP5pe2XHJcbiAgICBwb3N0KENPTkZJRy5SRVNULmdldExpbWl0QXRJbmZvLGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcCk9PntcclxuICAgICAgICBpZiggcmVzcC5zdGF0dXNDb2RlID0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyApe1xyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe2xpbWl0SW5mbzpyZXNwLmRhdGF9KSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5pu05paw5bqX6ZO66K+m5oOFXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g5bqX6ZO66K+m5oOF5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWNobnRPcGVyKHBhcmFtID17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBncmFkZU1jYyAsIE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpG1jaG50RGV0YWls57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7IFxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKDpmaTlnLDlnYDkv6Hmga9cclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVBZGRyZXNzKHBhcmFtPXtcclxuICAgIGlkOicnIC8v5Zyw5Z2AaWRcclxufSl7XHJcbiAgICBcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmRlbGV0ZUFkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBhcmFtKTtcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5pu05paw5pS25qy+6ZO26KGM5Y2hXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWNjQ2FyZChwYXJhbT17XHJcbiAgICB2aXJ0dWFsQ2FyZE5vOicnIC8v6Jma5ouf5Y2h5Y+3XHJcbn0pIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBkYXRlTWNjQ2FyZCxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/mjaLljaHlkI7vvIzmuIXpmaTlupfpk7ror6bmg4XnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7IFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmlrDlop7lnLDlnYBcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor6bnu4bnmoTlnLDlnYDkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdBZGRyZXNzKHBhcmFtPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5uZXdBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1Mpe1xyXG4gICAgICAgICAgICAvLyDliKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOS/ruaUueWcsOWdgOS/oeaBr1xyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivpue7hueahOWcsOWdgOS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRBZGRyZXNzKHBhcmFtPXt9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5lZGl0QWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgLy/liKDpmaTmlLbotKflnLDlnYDnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldEFkZHJMaXN0LnNlY29uZEtleSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDlkK/lgZzmlLbmrL7noIHmnI3liqFcclxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNY2NPbk9mZihwYXJhbT17XHJcbiAgICBpc1VzZU1jYzonJyAgLy/mmK/lkKbkvb/nlKjmlLbmrL7noIHmnI3liqFcclxuIH0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnNldE1jY09uT2ZmLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpOW6l+mTuuivpuaDhee8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOyBcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDojrflj5blkIrotbfmlK/ku5jmjqfku7bnmoRUTuWPt1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jY1RyYW5zTnVtKCl7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRNY2NUcmFuc051bSkudGhlbigocmVzcCk9PntcclxuICAgICAgICBpZiggcmVzcC5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MgKXtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7bWNjVHJhbnNOdW06cmVzcC5kYXRhLnRyYW5zTnVtfSlcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJLmpzIiwiaW1wb3J0IHN0b3JlIGZyb20gJy4uLy4uL3N0b3JlL3N0b3JlJztcclxuaW1wb3J0IHsgVVBEQVRFX1NUT1JFX1NUQVRFIH0gZnJvbSAnLi4vLi4vc3RvcmUvYWN0aW9uJ1xyXG5cclxuLyoqXHJcbiAqIOabtOaUuXJlZHV45Lit55qEc3RvcmVBZGRyXHJcbiAqIEBwYXJhbSB7Kn0gYWRkckluZm8g5Zyw5Z2A6K+m5oOFXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlU3RvcmVBZGRyKGFkZHJJbmZvKSB7XHJcblxyXG4gICAgbGV0IGFkZHJJdGVtVG9VcGRhdGUgPSB7XHJcbiAgICAgICAgZGVsaXZObTogXCJOT19ERUZBVUxUXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pS26LSn5Lq6LOiuvuS4uumdnuepuu+8jOebrueahOaYr+i/lOWbnueUs+ivt+eJqeaWmemhtemdouaXtu+8jOS4jeW/heWGjeWOu+WPkemAgeivt+axgu+8jOiOt+WPluWcsOWdgOWIl+ihqFxyXG4gICAgICAgIGFkZEFsbDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcsOWMuuWQjeensFxyXG4gICAgICAgIGRlbGl2UGhvbmU6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aUtui0p+eUteivnVxyXG4gICAgICAgIHByb3ZpbmNlSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ecgUlEXHJcbiAgICAgICAgY2l0eUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5biCSURcclxuICAgICAgICBhcmVhSWQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDljLpJRFxyXG4gICAgICAgIGFkZHJlc3NJbmZvOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ivpue7huWcsOWdgFxyXG4gICAgICAgIGlkOiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCAhIWFkZHJJbmZvLmlkICYmICEhYWRkckluZm8uYWRkQWxsICl7IC8v5Lyg6YCS55qE5piv5bey5a2Y5Zyo55qE5Zyw5Z2AXHJcbiAgICAgICAgLy8g5LuO5Zyw5Z2A5L+h5oGv5Lit6I635Y+W5a+55bqU5L+h5oGvXHJcbiAgICAgICAgbGV0IHsgbWVtYmVyTmFtZSwgYWRkQWxsLCBwaG9uZSwgcHJvdmluY2VJZCwgY2l0eUlkLCBhcmVhSWQsIGFkZHJlc3NJbmZvLCBpZCB9ID0gYWRkckluZm87XHJcbiAgICAgICAgYWRkckl0ZW1Ub1VwZGF0ZSA9IHtcclxuICAgICAgICAgICAgZGVsaXZObTogbWVtYmVyTmFtZSwgLy/mlLbotKfkurpcclxuICAgICAgICAgICAgYWRkQWxsOiBhZGRBbGwsLy/lnLDljLrlkI3np7BcclxuICAgICAgICAgICAgZGVsaXZQaG9uZTogcGhvbmUsLy/mlLbotKfnlLXor51cclxuICAgICAgICAgICAgcHJvdmluY2VJZDogcHJvdmluY2VJZCwvL+ecgUlEXHJcbiAgICAgICAgICAgIGNpdHlJZDogY2l0eUlkLC8v5biCSURcclxuICAgICAgICAgICAgYXJlYUlkOiBhcmVhSWQsLy/lnLDljLpJRFxyXG4gICAgICAgICAgICBhZGRyZXNzSW5mbzogYWRkcmVzc0luZm8sLy/or6bnu4blnLDlnYBcclxuICAgICAgICAgICAgaWQ6IGlkIC8v5Zyw5Z2AaWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICBzdG9yZUFkZHI6YWRkckl0ZW1Ub1VwZGF0ZVxyXG4gICAgfSkpXHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvQWRkcmVzc01hbmFnZW1lbnQvQWRkcmVzc01hbmFnZW1lbnRBY3Rpb25zLmpzIiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgc2FmZSkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgaWYgKHNhZmUgJiYgdGFyZ2V0W2tleV0pIHRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNGRjMWY3ZWJkODBkMTViZmQzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjc5ODUxYmUyN2IyNjhlYTI0ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFkZmFjMjg1MjNhZTM3ZGFjNWJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjUxYmM3YWZlODEyN2UwOTE0OWRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDI4Y2ZmODZlMWQ1MWViZjIxZjdmXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkFNXCI6XCJBTVwiLFwiYWRkcmVzc0l0ZW1zXCI6XCJhZGRyZXNzSXRlbXNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZm9cIjpcImluZm9cIixcInRleHRcIjpcInRleHRcIixcIm5hbWVcIjpcIm5hbWVcIixcImRlZmF1bHRcIjpcImRlZmF1bHRcIixcImRlZmF1bHRGbGFnXCI6XCJkZWZhdWx0RmxhZ1wiLFwic2hvd1wiOlwic2hvd1wiLFwiaWNvblwiOlwiaWNvblwiLFwiYWRkcmVzc1wiOlwiYWRkcmVzc1wiLFwicmlnaHRBcnJvd1wiOlwicmlnaHRBcnJvd1wiLFwiaGFuZGxlc1wiOlwiaGFuZGxlc1wiLFwiZWRpdFwiOlwiZWRpdFwiLFwiYWRkXCI6XCJhZGRcIixcImJ1dHRvblwiOlwiYnV0dG9uXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQWRkcmVzc01hbmFnZW1lbnQvQWRkcmVzc01hbmFnZW1lbnQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMzNjYWM5ZWQxMWQ1MzE4YjRhMDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAzYzI0ZDM4ZmZjZDBjMzhlMzQ3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNTNiN2QzNDgxNzE0NGIxMmIwYWFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDVlNTliNzFiMzNhMzhjMzYxOGU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1ZTc0OTFmMWY3OTk3MTVlYWM3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFwiLi9BZGRyZXNzTWFuYWdlbWVudC5zY3NzXCJcclxuaW1wb3J0IHsgTGluayB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCJcclxuaW1wb3J0IHsgYmVmb3JlRW50ZXJSb3V0ZXIsIEVudiB9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0XCI7XHJcbmNsYXNzIEFkZHJlc3NNYW5hZ2VtZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGlzRWRpdDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u6aG16Z2i5piv5ZCm5aSE5LqO57yW6L6R54q25oCB77yIaXNFZGl077yJ77yM5pu05pS55a+86Iiq5qCP5Y+z5LiK6KeS5Zu+5qCH55qE5pi+56S6XHJcbiAgICAgKi9cclxuICAgIGNoYW5nZVJpZ2h0SWNvbk9mTmF2QmFyID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzRWRpdCkge1xyXG4gICAgICAgICAgICBiZWZvcmVFbnRlclJvdXRlcihcIuaUtui0p+WcsOWdgFwiLCAn5Y+W5raIJywgKCkgPT4geyB0aGlzLnNldFN0YXRlKHsgaXNFZGl0OiAhdGhpcy5zdGF0ZS5pc0VkaXQgfSkgfSwgbnVsbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmVmb3JlRW50ZXJSb3V0ZXIoXCLmlLbotKflnLDlnYBcIiwgJ+e8lui+kScsICgpID0+IHsgdGhpcy5zZXRTdGF0ZSh7IGlzRWRpdDogIXRoaXMuc3RhdGUuaXNFZGl0IH0pIH0sIEVudi5jdXJyZW50UGF0aCArIFwic3RhdGljL2ltZ3MvZWRpdC5wbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICBiZWZvcmVFbnRlclJvdXRlcigpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VSaWdodEljb25PZk5hdkJhcigpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlUmlnaHRJY29uT2ZOYXZCYXIoKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGJlZm9yZUVudGVyUm91dGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBsZXQgeyBhZGRyZXNzTGlzdCwgY2xpY2tUb0RlbEFkZHIsIGNsaWNrVG9DaGFuZ2VTdG9yZUFkZHIgfSA9IHRoaXMucHJvcHM7IC8vIOiOt+WPluS7jmNvbnRhaW5lcuS8oOmAkui/h+adpeeahOWxnuaAp+WSjOaWueazlVxyXG4gICAgICAgIGNvbnN0IEZMQUdfREVGX0FERFIgPSAnMScsICAvLyDpu5jorqTlnLDlnYDmoIfoh7RcclxuICAgICAgICAgICAgRkxBR19OT1JNQUxfQUREUiA9ICcwJzsgLy8g6Z2e6buY6K6k5Zyw5Z2A5qCH6Ie0XHJcblxyXG4gICAgICAgIC8vIOmBjeWOhuaVsOe7hO+8jOehruS/nem7mOiupOWcsOWdgOesrOS4gOS9jeaYvuekulxyXG4gICAgICAgIGFkZHJlc3NMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLnN0YXRlID09IEZMQUdfREVGX0FERFIgJiYgaW5kZXggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgYWRkcmVzc0xpc3RbaW5kZXhdID0gYWRkcmVzc0xpc3RbMF07XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzTGlzdFswXSA9IHRlbXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDkvb/nlKjmjpLluo/lkI7nmoTlnLDlnYDliJfooajmlbDnu4TvvIzmuLLmn5Plh7rlnLDlnYDliJfooajnu4Tku7ZcclxuICAgICAgICB2YXIgYWRkckxpc3RDb21wb25lbnRzID0gYWRkcmVzc0xpc3QubWFwKChlbGUsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgaXRlbUNsYXNzTmFtZSA9ICdpdGVtJywgIC8vIOWNleadoeWcsOWdgGl0ZW3nmoTnsbvlkI1cclxuICAgICAgICAgICAgICAgIGRlZkljb25DbGFzc05hbWUgPSAnZGVmYXVsdEZsYWcnO1xyXG4gICAgICAgICAgICBpZiAoZWxlLnN0YXRlID09IEZMQUdfREVGX0FERFIpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1DbGFzc05hbWUgKz0gJyBkZWZhdWx0JztcclxuICAgICAgICAgICAgICAgIGRlZkljb25DbGFzc05hbWUgKz0gJyBzaG93JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISF0aGlzLnN0YXRlLmlzRWRpdCkgeyAvLyDlvZPliY3mmK/nvJbovpHnirbmgIFcclxuICAgICAgICAgICAgICAgIGl0ZW1DbGFzc05hbWUgKz0gJyBlZGl0J1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2l0ZW1DbGFzc05hbWV9IGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiDlnLDlnYDkv6Hmga/or6bmg4UgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmZvXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRcIiBvbkNsaWNrPXsoKSA9PiB7IGNsaWNrVG9DaGFuZ2VTdG9yZUFkZHIoZWxlKSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hbWVcIj4ge2VsZS5tZW1iZXJOYW1lfSA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGVsXCI+IHtlbGUubW9iaWxlfSA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17ZGVmSWNvbkNsYXNzTmFtZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb25cIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkZHJlc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2VsZS5hZGRyZXNzSW5mb31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiDlj7Pnrq3lpLTvvIzot7PovazliLDnvJbovpHpobXpnaIgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cInJpZ2h0QXJyb3dcIiB0bz17XCIvaGFuZGxlQWRkcmVzcz9hZGRySXRlbT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShlbGUpKX0gPjwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7Lyog57yW6L6R5ZKM5Yig6Zmk5Yy65Z+fICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGFuZGxlc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgdG89e1wiL2hhbmRsZUFkZHJlc3M/YWRkckl0ZW09XCIgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZWxlKSl9ICA+57yW6L6RPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IHsgY2xpY2tUb0RlbEFkZHIoZWxlLmlkICsgJycpIH19ID7liKDpmaQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDpgJrov4fmt7vliqDmjInpkq7kvKDpgJLnu5lIYW5kbGVBZGRyZXNz6aG16Z2i55qE5Zyw5Z2A5L+h5oGvXHJcbiAgICAgICAgdmFyIGFkZHJJdGVtVG9TZW5kQnlBZGRCdG4gPSB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJcIiwgICAgLy/lnLDlnYBpZFxyXG4gICAgICAgICAgICBcIm1lbWJlcklkXCI6IFwiXCIsICAvL21lcklkXHJcbiAgICAgICAgICAgIFwibWVtYmVyTmFtZVwiOiBcIlwiLCAgICAvL+eUqOaIt+WQjVxyXG4gICAgICAgICAgICBcInByb3ZpbmNlSWRcIjogXCJcIiwgICAgLy/nnIFJRFxyXG4gICAgICAgICAgICBcImNpdHlJZFwiOiBcIlwiLCAgICAvL+W4gklEXHJcbiAgICAgICAgICAgIFwiYXJlYUlkXCI6IFwiXCIsICAgIC8v5Yy6SURcclxuICAgICAgICAgICAgXCJhZGRBbGxcIjogJycsICAgIC8v55yB5biC5Yy657uE5ZCIXHJcbiAgICAgICAgICAgIFwiYWRkcmVzc0luZm9cIjogXCJcIiwgICAvL+ivpue7huWcsOWdgFxyXG4gICAgICAgICAgICBcIm1vYmlsZVwiOiBcIlwiLCAgICAvL+aJi+acuuWPt1xyXG4gICAgICAgICAgICBcInBob25lXCI6IFwiXCIsICAgICAvL+aJi+acuuWPt1xyXG4gICAgICAgICAgICBcImVtYWlsXCI6IFwiXCIsICAgICAvL+mCruS7tuWcsOWdgFxyXG4gICAgICAgICAgICBcInppcENvZGVcIjogXCJcIiwgICAvLyB6aXBDb2RlXHJcbiAgICAgICAgICAgIFwic3RhdGVcIjogRkxBR19OT1JNQUxfQUREUiAvL3N0YXRl5b+F6aG76K6+572u5Li6JzAnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiQU1cIiA+XHJcbiAgICAgICAgICAgICAgICB7Lyog5Zyw5Z2A5YiX6KGoICovfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZGRyZXNzSXRlbXNcIj5cclxuICAgICAgICAgICAgICAgICAgICB7YWRkckxpc3RDb21wb25lbnRzfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7Lyog5paw5aKe5oyJ6ZKuICovfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZGRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8TGluayB0bz17XCIvaGFuZGxlQWRkcmVzcz9hZGRySXRlbT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShhZGRySXRlbVRvU2VuZEJ5QWRkQnRuKSl9ID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3RoaXMuc3RhdGUuaXNFZGl0ID8gXCJidXR0b24gZWRpdFwiIDogXCIgYnV0dG9uIFwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuaXNFZGl0fT4g5paw5aKeXHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWRkcmVzc01hbmFnZW1lbnRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9BZGRyZXNzTWFuYWdlbWVudC9BZGRyZXNzTWFuYWdlbWVudC5qcyIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gNmE0NDJhYjViZDliZDkyOTQ0Nzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLypcclxuICAgQVBJIOaOpeWPo+mFjee9rlxyXG4gICBheGlvcyDlj4LogIPmlofmoaPvvJpodHRwczovL3d3dy5rYW5jbG91ZC5jbi95dW55ZS9heGlvcy8yMzQ4NDVcclxuXHJcbiovXHJcbi8vIGltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCBUb2FzdCBmcm9tICdhbnRkLW1vYmlsZS9saWIvdG9hc3QnO1xyXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuaW1wb3J0IENPTkZJRyBmcm9tIFwiLi9jb25maWdcIlxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qXHJcbiog5bi46YeP5a6a5LmJ5Yy6XHJcbipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZXhwb3J0IGNvbnN0IFV0aWwgPSB3aW5kb3cuVVAuVy5VdGlsO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwcCA9IFVQLlcuQXBwO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVudiA9IFVQLlcuRW52O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCByZWdQaG9uZSA9IC9eKDEzWzAtOV18MTRbNTc5XXwxNVswLTMsNS05XXwxNls2XXwxN1swMTM1Njc4XXwxOFswLTldfDE5Wzg5XSlcXGR7OH0kLztcclxuXHJcbmV4cG9ydCBjb25zdCByZWdQYXlOdW0gPSAvXlswLTldezIwfSQvO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbW9tUGFyYW0gPSB7XHJcbiAgICB2ZXJzaW9uOiBcIjIuMFwiLFxyXG4gICAgc291cmNlOiBcIjJcIlxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIOivt+axguaguOW/g+WMuiDkuIvpnaLov5nlnZfljLrln5/kuK3nmoTku6PnoIHmlLnliqjor7fmhY7ph41cclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmxldCBiYXNlVXJsID0gXCJcIiwgYmFzZVVybDIgPSBcIlwiLCBiYXNlVXJsMyA9IFwiXCI7XHJcbmlmIChsb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCc5NTUxNi5jb20nKSAhPT0gLTEpIHsgLy/nlJ/kuqfnjq/looNcclxuICAgIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9zaGFuZ2h1Ljk1NTE2LmNvbS93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMiA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL21hbGwuOTU1MTYuY29tL2NxcC1pbnQtbWFsbC13ZWIvcmVzdGxldC9cIjtcclxuICAgIGJhc2VVcmwzID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8veW91aHVpLjk1NTE2LmNvbS95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn0gZWxzZSBpZiAobG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignMTcyLjE4LjE3OS4xMCcpICE9PSAtMSkgeyAvL+a1i+ivleeOr+Wig1xyXG4gICAgLy8gYmFzZVVybD1cImh0dHA6Ly8xNzIuMjEuMTAxLjI1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjsgLy/mtYvor5XlrqRhcGFjaGVcclxuICAgIC8vYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuOTU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5byA5Y+R546v5aKDYXBhY2hlXHJcbiAgICBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xNy93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjExL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjEzMy4yNTozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn0gZWxzZSB7XHJcbiAgICAvLyBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS45NTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS4yNTozODIxMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xNy93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjExL3lvdWh1aS13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4xMzMuMjU6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMzMuNTY6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59XHJcbi8qKlxyXG4gKiDpgJrov4flkI7nvIDojrflj5bmnI3liqHlmajnmoTlhajlnLDlnYBcclxuICogQHBhcmFtIHVybFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldFNlcnZVcmwgPSAodXJsKSA9PiB7XHJcbiAgICBsZXQgc2VydmVyVXJsID0gXCJcIlxyXG4gICAgaWYgKHVybCA9PSBDT05GSUcuUkVTVC51c2VySW5mbykge1xyXG4gICAgICAgIHNlcnZlclVybCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICAvLyBlbHNlIGlmICh1cmwuc3BsaXQoXCIvXCIpWzBdID09IFwiYWRkcmVzc1wiKSB7XHJcbiAgICAvLyAgICAgc2VydmVyVXJsID0gYmFzZVVybDJcclxuICAgIC8vIH1cclxuICAgIGVsc2UgaWYgKHVybC5zcGxpdChcIi9cIilbMF0gPT0gXCJzY2FuXCIgfHwgdXJsID09IENPTkZJRy5SRVNULmdldENpdHkpIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsM1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gYmFzZVVybFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZXJ2ZXJVcmw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmoLzlvI/ljJbnu5Pmnpwg5bCG57uT5p6c5qC85byP5YyW5Li6XHJcbiAqIHtcclxuICogICAgIHN0YXR1c0NvZGUgICDlkI7lj7Dlk43lupTnoIFcclxuICogICAgIGRhdGEgICAgICAgICDlkI7lj7Dov5Tlm57nmoTmlbDmja5cclxuICogICAgIG1zZyAgICAgICAgICDlkI7lj7DnmoTmj5DnpLrkv6Hmga9cclxuICogfVxyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKiBAcmV0dXJucyB7e3N0YXR1c0NvZGU6IChzdHJpbmd8KiksIGRhdGE6ICosIG1zZzogKn19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVzcG9uc2VGb3JtYXR0ZXIgPSAoZGF0YSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnJlc3AsXHJcbiAgICAgICAgZGF0YTogZGF0YS5wYXJhbXMsXHJcbiAgICAgICAgbXNnOiBkYXRhLm1zZ1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8vIOWIoOmZpOW6lemDqCAnLydcclxuZnVuY3Rpb24gZGVsZXRlU2xhc2goaG9zdCkge1xyXG4gICAgcmV0dXJuIGhvc3QucmVwbGFjZSgvXFwvJC8sICcnKTtcclxufVxyXG5cclxuLy8g5re75Yqg5aS06YOoICcvJ1xyXG5mdW5jdGlvbiBhZGRTbGFzaChwYXRoKSB7XHJcbiAgICByZXR1cm4gL15cXC8vLnRlc3QocGF0aCkgPyBwYXRoIDogYC8ke3BhdGh9YDtcclxufVxyXG5cclxuLy8g6Kej5p6Q5Y+C5pWwXHJcbmZ1bmN0aW9uIHNlcGFyYXRlUGFyYW1zKHVybCkge1xyXG4gICAgY29uc3QgW3BhdGggPSAnJywgcGFyYW1zTGluZSA9ICcnXSA9IHVybC5zcGxpdCgnPycpO1xyXG5cclxuICAgIGxldCBwYXJhbXMgPSB7fTtcclxuXHJcbiAgICBwYXJhbXNMaW5lLnNwbGl0KCcmJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBpdGVtLnNwbGl0KCc9Jyk7XHJcblxyXG4gICAgICAgIHBhcmFtc1trZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge3BhdGgsIHBhcmFtc307XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKXtcclxuICAgIGxldCB7bWV0aG9kLCB1cmwsIGRhdGEgPSB7fX0gPSBjb25maWc7XHJcbiAgICBtZXRob2QgPSAobWV0aG9kICYmIG1ldGhvZC50b1VwcGVyQ2FzZSgpKSB8fCAnR0VUJztcclxuXHJcbiAgICBsZXQgc2VydmVyVXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6MzAwMC8nO1xyXG4gICAgbGV0IGZpbmFsVXJsID0gc2VydmVyVXJsICsgdXJsO1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdXJsOmZpbmFsVXJsLFxyXG4gICAgICAgICAgICB0eXBlOm1ldGhvZCxcclxuICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09ICcyMDAnKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlRm9ybWF0dGVyKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjpmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCfor7fmsYLlpLHotKUnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICBpZiggbWV0aG9kID09PSAnUE9TVCcgKXtcclxuICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICAgb3B0aW9ucy5kYXRhVHlwZSA9ICdqc29uJ1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICQuYWpheChvcHRpb25zKTtcclxuICAgIH0pXHJcbiAgICBcclxufVxyXG5cclxuLy8g5Li76KaB6K+35rGC5pa55rOVXHJcbi8vIGV4cG9ydCAgZnVuY3Rpb24gcmVxdWVzdE9yaWdpbihjb25maWcpIHtcclxuXHJcbi8vICAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuLy8gICAgIGNvbnN0IHVpID0gVVAuVy5VSTtcclxuLy8gICAgIGNvbnN0IGVudiA9IFVQLlcuRW52O1xyXG5cclxuLy8gICAgIGxldCB7bWV0aG9kLCB1cmwsIGRhdGEgPSB7fSwgaGVhZGVycywgZm9yQ2hzcCwgZW5jcnlwdCwgYnlBamF4LCBjYWNoZSwgdXBkYXRlLCBzdG9yYWdlfSA9IGNvbmZpZztcclxuXHJcbi8vICAgICBtZXRob2QgPSAobWV0aG9kICYmIG1ldGhvZC50b1VwcGVyQ2FzZSgpKSB8fCAnR0VUJztcclxuXHJcbi8vICAgICBsZXQgc2VydmVyVXJsID0gZ2V0U2VydlVybCh1cmwpO1xyXG5cclxuLy8gICAgIC8vIGxldCBzZXJ2ZXJVcmwgPSBiYXNlVXJsIDtcclxuLy8gICAgIC8vIGlmICh0cnVlKSB7XHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOmAmui/h+aPkuS7tuWPkemAgeivt+axglxyXG4vLyAgICAgICovXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDlkJHmnI3liqHlmajlj5HpgIHor7fmsYJcclxuLy8gICAgICAqIEBwYXJhbSBwYXJhbXMg6K+35rGC5Y+C5pWwXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHZlcnNpb27vvJrniYjmnKzvvIzpu5jorqTmmK8xLjBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgc291cmNl77ya5p2l5rqQ77yM6buY6K6k5qC55o2uQW5kcm9pZOOAgWlPU+iHquWKqOa3u+WKoFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBlbmNyeXB077ya5piv5ZCm5Yqg5a+G77yM6buY6K6k5Yqg5a+GXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIG1ldGhvZO+8muivt+axguaWueazle+8jFBPU1TmiJZHRVRcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgY21k77ya6K+35rGC5ZG95Luk77yI5Lmf5Y+v6Ieq6KGM5bCGY21k57uE6KOF6IezdXJpW+S8mOaDoOWQjuWPsF3miJZwYXRoW+mSseWMheWQjuWPsF3vvIlcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdXJpL3BhdGjvvJror7fmsYLlnLDlnYDvvIzlu7rorq7ku4XloavlhYVjbWTvvIzkuI3lu7rorq7oh6rooYznu4Too4V1cmkvcGF0aFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBwYXJhbXPvvJrlj5HpgIHnu5nlkI7lj7DnmoTlj4LmlbBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdmlk77ya5aaC5p6c6YCa6L+HQWpheOaWueW8j+WQkXdhbGxldOWQjuWPsOWPkemAgeivt+axgumcgOimgeaQuuW4pnZpZFxyXG4vLyAgICAgICogQHBhcmFtIGZvckNoc3Ag5piv5ZCm5ZCR5LyY5oOg5ZCO5Y+w5Y+R6YCB6K+35rGC77yI6buY6K6k5ZCR5omL5py65ZCO5Y+w5Y+R6YCB6K+35rGC77yJXHJcbi8vICAgICAgKiBAcGFyYW0gYnlBamF4IOaYr+WQpuS9v+eUqEFqYXjlj5HpgIHor7fmsYLvvIjpu5jorqTkvb/nlKjmjqfku7bvvIlcclxuLy8gICAgICAqIEBwYXJhbSBzdWNjZXNzIOaIkOWKn+Wbnuiwg1xyXG4vLyAgICAgICogQHBhcmFtIGVycm9yIOmUmeivr+Wbnuiwg++8iOS4muWKoemUmeivr++8iVxyXG4vLyAgICAgICogQHBhcmFtIGZhaWwg5aSx6LSl5Zue6LCD77yI6K+35rGC5aSx6LSl77yJXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbi8vICAgICAgICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG5cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBzdWNjZXNzQ2FsbGJhY2sgPSAoZGF0YSxmdWMpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+U5Zue5oiQ5Yqf57uT5p6c77yaXCIpXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJlc3BvbnNlRm9ybWF0dGVyKGRhdGEpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWYoICEhZnVjICl7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVxLmZ1YyA9IGZ1YztcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIHJlc29sdmUocmVxKVxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgZXJyb3JDYWxsYmFjayA9IChlcnIpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+U5Zue5aSx6LSl57uT5p6c77yaXCIpXHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHVybCA9PSBDT05GSUcuUkVTVC5hcHBseU1jYyB8fCB1cmwgPT0gQ09ORklHLlJFU1QuYXBwbHlNYXQgfHwgdXJsID09IENPTkZJRy5SRVNULnRvZGF5TW9uZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBsZXQgcmVxID0gcmVzcG9uc2VGb3JtYXR0ZXIoZXJyKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcSlcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIFRvYXN0LmluZm8oZXJyLm1zZyB8fCAn5p+l6K+i5Lia5Yqh6KaB57Sg5Ye66ZSZ77yM6K+356iN5ZCO5YaN6K+V77yBJyk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBuZXR3b3JrQ2FsbGJhY2sgPSAoeGhyKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBUb2FzdC5pbmZvKHhoci5tc2cpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKHVybCAhPSBDT05GSUcuUkVTVC5nZXRUb2RheUluY29tZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuc2hvd0xvYWRpbmcoKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKCFjYWNoZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVcmw6XCIgKyB1cmwpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBhcmFtOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coe1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBlbmNyeXB0OiBlbmNyeXB0LFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGZvckNoc3A6IGZvckNoc3AsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgYnlBamF4OiBieUFqYXhcclxuLy8gICAgICAgICAgICAgICAgIC8vIH0pXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWPkemAgemdnue8k+WtmOivt+axglwiKVxyXG4vLyAgICAgICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlKFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVyaTpzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9LCBmb3JDaHNwLCBieUFqYXgsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgbmV0d29ya0NhbGxiYWNrKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2FjaGVVcmw6XCIgKyB1cmwpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN0b3JlYWdl562W55Wl5pivOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3RvcmFnZSlcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXBkYXRl5Ye95pWwOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXBkYXRlKVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHnvJPlrZjor7fmsYJcIilcclxuLy8gICAgICAgICAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAgICAgICAgICog5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gcGFyYW1zIOivt+axguWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2ZXJzaW9u77ya54mI5pys77yM6buY6K6k5pivMS4wXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNvdXJjZe+8muadpea6kO+8jOm7mOiupOagueaNrkFuZHJvaWTjgIFpT1Poh6rliqjmt7vliqBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgZW5jcnlwdO+8muaYr+WQpuWKoOWvhu+8jOm7mOiupOWKoOWvhlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBtZXRob2TvvJror7fmsYLmlrnms5XvvIxQT1NU5oiWR0VUXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGNtZO+8muivt+axguWRveS7pO+8iOS5n+WPr+iHquihjOWwhmNtZOe7hOijheiHs3VyaVvkvJjmg6DlkI7lj7Bd5oiWcGF0aFvpkrHljIXlkI7lj7Bd77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHVyaS9wYXRo77ya6K+35rGC5Zyw5Z2A77yM5bu66K6u5LuF5aGr5YWFY21k77yM5LiN5bu66K6u6Ieq6KGM57uE6KOFdXJpL3BhdGhcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgcGFyYW1z77ya5Y+R6YCB57uZ5ZCO5Y+w55qE5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZpZO+8muWmguaenOmAmui/h0FqYXjmlrnlvI/lkJF3YWxsZXTlkI7lj7Dlj5HpgIHor7fmsYLpnIDopoHmkLrluKZ2aWRcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBmb3JDaHNwIOaYr+WQpuWQkeS8mOaDoOWQjuWPsOWPkemAgeivt+axgu+8iOm7mOiupOWQkeaJi+acuuWQjuWPsOWPkemAgeivt+axgu+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGJ5QWpheCDmmK/lkKbkvb/nlKhBamF45Y+R6YCB6K+35rGC77yI6buY6K6k5L2/55So5o6n5Lu277yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gc3VjY2VzcyDmiJDlip/lm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBlcnJvciDplJnor6/lm57osIPvvIjkuJrliqHplJnor6/vvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBmYWlsIOWksei0peWbnuiwg++8iOivt+axguWksei0pe+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHVwZGF0ZSDlvILmraXliLfmlrDlm57osIMg5aaC5p6c6K6+572uYXN5bmPkuLp0cnVl5ZCO5Y+v5Lul5re75YqgdXBkYXRl5Zue6LCDIOWmguaenOS4jeWhq+WGmem7mOiupOS7pXN1Y2Nlc3Pov5vooYzlpITnkIZcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBzdG9yYWdlIOe8k+WtmOWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBuZWVkU3cgICAgICAgICAgICAvL+m7mOiupGZhbHNl5aSn6YOo5YiG55So55qE5piv5o+S5Lu26ZyA6KaB55qE5omL5Yqo5Y675YqgXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHN0b3JhZ2VUeXBlICAgICAgLy/pu5jorqTkvb/nlKhsb2NhbHN0b3JhZ2VcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgYXN5bmMgICAgICAgICAgICAvL+m7mOiupOiOt+WPlue8k+WtmOWQjuS4jeWPkeivt+axgu+8jOaUueS4unRydWXlkI7kvJrlvILmraXljrvor7fmsYLlkI7lj7DlubbliLfmlrDmlbDmja5cclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgZW5kT2ZTeW5jRnVuYyAgICAvL3RvZG8g6YeN6KaB77yB77yB77yB77yB5Zue6LCD5Lit5aaC5p6c5a2Y5Zyo5byC5q2l77yI5o+S5Lu2562J77yJ6ZyA6KaB5qCH5piO5byC5q2l54q25oCB5Li6dHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2YWxpZGF0ZVRpbWUgICAgIC8v5pyJ5pWI5pyf6buY6K6k5peg6ZmQ5pyJ5pWI5pyfIOWNleS9jeavq+enklxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlV2l0aElkICAgICAgIC8v6buY6K6kdHJ1ZeS7peeUqOaIt2lk6L+b6KGM5a2Y5YKo5ZCm5YiZZmFsc2Xku6Vsb2NhbOWtmOWCqFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlU3VjYyAgICAgICAgIC8v5L+d5a2Y5oiQ5Yqf5ZCO55qE5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVFcnIgICAgICAgICAgLy/kv53lrZjlpLHotKXlkI7nmoTlm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgcm9sbEtleSAgICAgICAgICAvL+W8uuWItuiuvue9ruS4u+mUrlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzZWNvbmRLZXkgICAgICAgIC8v5by65Yi26K6+572u5qyh6KaB6ZSu5YC8XHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDph43opoHor7TmmI4g6LCD55So5byC5q2l5qih5byP77yIYXN5bmPorr7nva7kuLp0cnVl77yJ5ZCO5Y+v6IO95Zyoc3VjY2Vzc+Wbnuiwg+mHjOWtmOWcqOW8guatpeaTjeS9nO+8jOivpeaDheWGteS4i+WbnuWvvOiHtOe8k+WtmOeahOWbnuiwg+WPr+iDvVxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g5pyq5omn6KGM5a6M5oiQ77yM6K+35rGC55qE5Zue6LCD5Y+I5byA5aeL5omn6KGM5LqG55qE5oOF5Ya177yM5omA5Lul5oiR5Lus57uf5LiA5Zyoc3VjY2Vzc+Wbnuiwg+WSjHVwZGF0ZeWbnuiwg+eahOWFpeWPguWinuWKoOS6huesrOS6jOS4quWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g55So5LqO5YW85a655Zue6LCD5YaF5YyF5ZCr5byC5q2l55qE54q25Ya177yM5L2/55So5pa55rOV5Li677ya6aaW5YWI6K6+572uZW5kT2ZTeW5jRnVuY+WPguaVsOS4unRydWUs5YW25qyhc3VjY2Vzc+WSjHVwZGF0ZeWbnlxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g6LCD5YaF5Lya5pyJMuS4quWFpeWPgu+8jHN1Y2Nlc3PvvIhyZXNw77yMZnVj77yJ77yM6K+35Zyo5Luj56CB6Zet5YyF5aSE5L2/55SoZnVjLmVuZE9mRnVuYygpXHJcbi8vICAgICAgICAgICAgICAgICAgKi9cclxuXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgcGFyYW0gPSB7fVxyXG5cclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoYnlBamF4KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFyYW0gPSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBcImxpZmUvbGlmZVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFyYW0gPSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cmk6c2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZVdpdGhTdG9yYWdlKHBhcmFtLCBmb3JDaHNwLCBieUFqYXgsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgbmV0d29ya0NhbGxiYWNrLCBzdG9yYWdlLCB1cGRhdGUpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICB9KVxyXG5cclxuXHJcbi8vICAgICAvLyB9XHJcbi8vICAgICAvLyBlbHNlIHtcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOmAmui/h0FqYXgg5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKi9cclxuLy8gICAgIC8vIHJldHVybiBheGlvcyh7XHJcbi8vICAgICAvLyAgICAgdXJsOiBiYXNlVXJsICsgdXJsLFxyXG4vLyAgICAgLy8gICAgIG1ldGhvZCxcclxuLy8gICAgIC8vICAgICBoZWFkZXJzLFxyXG4vLyAgICAgLy8gICAgIGRhdGE6IG1ldGhvZCA9PT0gJ0dFVCcgPyB1bmRlZmluZWQgOiBkYXRhLFxyXG4vLyAgICAgLy8gICAgIHBhcmFtczogT2JqZWN0LmFzc2lnbihtZXRob2QgPT09ICdHRVQnID8gZGF0YSA6IHt9LCBwYXJhbXMpXHJcbi8vICAgICAvLyB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4vLyAgICAgLy9cclxuLy8gICAgIC8vICAgICBsZXQgcmVxID0ge1xyXG4vLyAgICAgLy8gICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5kYXRhLnJlc3AsXHJcbi8vICAgICAvLyAgICAgICAgIGRhdGE6IHJlc3BvbnNlLmRhdGEucGFyYW1zXHJcbi8vICAgICAvLyAgICAgfVxyXG4vLyAgICAgLy8gICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVxKVxyXG4vLyAgICAgLy8gfSkuY2F0Y2goZXJyID0+IHtcclxuLy8gICAgIC8vICAgICAvLyDor7fmsYLlh7rplJlcclxuLy8gICAgIC8vICAgICBUb2FzdC5pbmZvKCdyZXF1ZXN0IGVycm9yLCBIVFRQIENPREU6ICcgKyBlcnIucmVzcG9uc2Uuc3RhdHVzKTtcclxuLy8gICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcclxuLy8gICAgIC8vIH0pO1xyXG4vLyAgICAgLy8gfVxyXG5cclxuLy8gfVxyXG5cclxuLy8g5LiA5Lqb5bi455So55qE6K+35rGC5pa55rOVXHJcbmV4cG9ydCBjb25zdCBnZXQgPSAodXJsLCBkYXRhLCBwYXJhbSA9IHt9KSA9PiB7XHJcbiAgICBsZXQgcGFyYW1BbGwgPSBPYmplY3QuYXNzaWduKHtmb3JDaHNwOiB0cnVlLCBlbmNyeXB0OiB0cnVlLCBjYWNoZTogZmFsc2UsIGJ5QWpheDogZmFsc2V9LCBwYXJhbSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdChPYmplY3QuYXNzaWduKHt1cmwsIGRhdGF9LCBwYXJhbUFsbCkpXHJcbn07XHJcbmV4cG9ydCBjb25zdCBwb3N0ID0gKHVybCwgZGF0YSwgcGFyYW0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IHBhcmFtQWxsID0gT2JqZWN0LmFzc2lnbih7Zm9yQ2hzcDogdHJ1ZSwgZW5jcnlwdDogdHJ1ZSwgY2FjaGU6IGZhbHNlLCBieUFqYXg6IGZhbHNlfSwgcGFyYW0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QoT2JqZWN0LmFzc2lnbih7bWV0aG9kOiAnUE9TVCcsIHVybCwgZGF0YX0sIHBhcmFtQWxsKSlcclxufTtcclxuZXhwb3J0IGNvbnN0IHB1dCA9ICh1cmwsIGRhdGEpID0+IHJlcXVlc3Qoe21ldGhvZDogJ1BVVCcsIHVybCwgZGF0YX0pO1xyXG5leHBvcnQgY29uc3QgZGVsID0gKHVybCwgZGF0YSkgPT4gcmVxdWVzdCh7bWV0aG9kOiAnREVMRVRFJywgdXJsLCBkYXRhfSk7XHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICog5Yqf6IO95Ye95pWw5Yy6XHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICog5bCGVVJM5Lit55qEc2VhcmNoIOWtl+espuS4siDovazmjaLmiJAg5a+56LGhXHJcbiAqIEBwYXJhbSBzZWFyY2hcclxuICogQHJldHVybnMge3t9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldFNlYXJjaFBhcmFtID0gKHNlYXJjaCkgPT4ge1xyXG4gICAgaWYgKCEhc2VhcmNoKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IHNlYXJjaC5zbGljZSgxKTtcclxuICAgICAgICBsZXQgYXJyYXkgPSBzdHIuc3BsaXQoXCImXCIpO1xyXG4gICAgICAgIGxldCBvYmogPSB7fTtcclxuICAgICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbSA9IGl0ZW0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICBvYmpbcGFyYW1bMF1dID0gcGFyYW1bMV07XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICogY29kb3ZhIOaPkuS7tuiwg+eUqOWMulxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcblxyXG4vLyDlkK/lgZzmlLbmrL7noIFcclxuZXhwb3J0IGZ1bmN0aW9uIHNldFhpYW9XZWlQYXkocGFyYW0sIHN1YywgZXJyKSB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5zZXRYaWFvV2VpUGF5KHBhcmFtLCBzdWMsIGVycik7XHJcbn1cclxuXHJcbi8v5bCP5b6uYXVkaW9cclxuZXhwb3J0IGNvbnN0IHNldFhpYW9XZWlBdWRpbyA9IChwYXJhbSwgc3VjLCBlcnIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnNldFhpYW9XZWlBdWRpbyhwYXJhbSwgc3VjLCBlcnIpO1xyXG59XHJcbmV4cG9ydCBjb25zdCBnZXRYaWFvV2VpQXVkaW8gPSAoc3VjLCBlcnIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmdldFhpYW9XZWlBdWRpbyhzdWMsIGVycik7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0b2FzdCA9IChtcykgPT4ge1xyXG4gICAgVG9hc3QuaW5mbyhtcywgMik7XHJcbn1cclxuLyoqXHJcbiAqIOiuvue9rumhtumDqGJhclxyXG4gKiBAcGFyYW0gdGl0bGUg6aG16Z2i5ZCN56ewXHJcbiAqIEBwYXJhbSByaWdodEJhciDlj7PkvqfmjInpkq7lkI3np7BcclxuICogQHBhcmFtIHJpZ2h0Q2FsbGJhY2sg5Y+z5L6n5oyJ6ZKu5Zue6LCDXHJcbiAqIEBwYXJhbSByaWdodEJhckltZyDlj7PkvqfmjInpkq7lm77niYdcclxuICovXHJcbmV4cG9ydCBjb25zdCBiZWZvcmVFbnRlclJvdXRlciA9ICh0aXRsZSA9IFwiXCIsIHJpZ2h0QmFyID0gXCJcIiwgcmlnaHRDYWxsYmFjayA9IG51bGwsIHJpZ2h0QmFySW1nID0gbnVsbCkgPT4ge1xyXG4gICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUodGl0bGUpXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u56qX5Y+j5Y+z5L6n5oyJ6ZKuXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlIOWbvuagh+agh+mimFxyXG4gICAgICAgICAqIEBwYXJhbSBpbWFnZSDlm77moIfmlofku7ZcclxuICAgICAgICAgKiBAcGFyYW0gaGFuZGxlciDngrnlh7vlm57osIPlh73mlbBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoISFyaWdodENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24ocmlnaHRCYXIsIHJpZ2h0QmFySW1nLCByaWdodENhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJSaWdodEJ1dHRvbihcIlwiLCBudWxsLCBudWxsKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIOmAmuefpeWuouaIt+err+S/ruaUueeKtuaAgVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1jY1N0YXRlQ2hhbmdlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5tY2NTdGF0ZUNoYW5nZWQoKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNlbmRRckNvZGUgPSAocGFyYW1zLCBzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmiavmj4/mnaHnoIHlkozkuoznu7TnoIFcclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3NcclxuICAgICAgICAgKiBAcGFyYW0gZmFpbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5zY2FuUVJDb2RlKHBhcmFtcywgc3VjY2VzcywgZmFpbClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjbG9zZVdlYlZpZXcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5jbG9zZVdlYlZpZXcoKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHZlcmlmeVBheVB3ZCA9IChwYXJhbSwgc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAudmVyaWZ5UGF5UHdkKHBhcmFtLCBzdWNjZXNzLCBmYWlsKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVdlYlZpZXcgPSAodXJsLCBwYXJhbXMgPSBudWxsLCB0aXRsZSA9ICcnLCBpc0ZpbmlzaCA9IFwiMVwiKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5jcmVhdGVXZWJWaWV3KHVybCwgcGFyYW1zLCB0aXRsZSwgaXNGaW5pc2gpXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFVzZXJEZXRhaWxJbmZvID0gKHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5nZXRVc2VyRGV0YWlsSW5mbyhzdWNjZXNzLCBmYWlsKVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5bCGY2F2YXMg5L+d5a2Y5Yiw5pys5Zyw55u45YaMXHJcbiAqIEBwYXJhbSBjYW52YXNcclxuICovXHJcbmV4cG9ydCBjb25zdCBzYXZlUWNvZGUgPSAoY2FudmFzKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciB1aSA9IFVQLlcuVUkgfHwge307XHJcbiAgICB2YXIgcGljVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFwcC5sb2dFdmVudCgnc2F2ZVBpY3R1cmVfTmV3WWVhckFjdCcpO1xyXG4gICAgICAgIGFwcC5zYXZlUGljVG9Mb2NhbCh7XHJcbiAgICAgICAgICAgIHVybDogcGljVXJsICYmIHBpY1VybC5zdWJzdHIoMjIpXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB1aS5zaG93VG9hc3RXaXRoUGljKCflt7Lkv53lrZjliLDns7vnu5/nm7jlhownKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgIGlmIChtc2cgPT0gJ3VwZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dBbGVydCgn6K+35Y2H57qn5Yiw5pyA5paw5a6i5oi356uvJywgZnVuY3Rpb24gKCkgeyAvLyDljrvljYfnuqdcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ1llcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW52LmlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL2l0dW5lcy5hcHBsZS5jb20vY24vYXBwL2lkNjAwMjczOTI4P2NvZGU9bmV3WWVhckFjdGl2aXR5JztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b3VodWkuOTU1MTYuY29tL2FwcC9hcHAvc29mdHdhcmUvdW5pb25wYXktd2FsbGV0LXYyLmFwaz9jb2RlPW5ld1llYXJBY3Rpdml0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLm9wZW5Ccm93c2VyKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdObycpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ+mprOS4iuWNh+e6pycsICfnqI3lkI7lho3or7QnLCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93VG9hc3QobXNnIHx8ICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2hhcmUgPSAodGl0bGUsIGRlc2MsIGltZ1VSTCwgcGFnZVVSbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgZW52ID0gVVAuVy5FbnYgfHwge307XHJcblxyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmmL7npLrliIbkuqvpnaLmnb9cclxuICAgICAgICAgKiDlpoLmnpzmiYDmnInmuKDpgZPkvb/nlKjnm7jlkIznmoTliIbkuqvlhoXlrrnliJnku4XloavlhplwYXJhbXPljbPlj6/vvIxcclxuICAgICAgICAgKiDlpoLmnpzpnIDopoHmoLnmja7kuI3lkIzmuKDpgZPlrprliLbliIbkuqvlhoXlrrnvvIzliJnlj69wYXJhbXPnlZnnqbrvvIzlnKhzaGFyZUNhbGxiYWNr5Lit6L+U5Zue5oyH5a6a5rig6YGT55qE5YiG5Lqr5YaF5a65XHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtcyDliIbkuqvlj4LmlbBcclxuICAgICAgICAgKiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgdGl0bGXvvJog5YiG5Lqr5qCH6aKYXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBkZXNjOiDliIbkuqvmkZjopoFcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHBpY1VybO+8muWIhuS6q+Wbvuagh1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgc2hhcmVVcmzvvJror6bmg4XlnLDlnYBcclxuICAgICAgICAgKiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAqIEBwYXJhbSBzaGFyZUNhbGxiYWNrIOWIhuS6q+aXtuWbnuiwg1xyXG4gICAgICAgICAqICAgICAgICAgICAgICBjaGFubmVs77yae1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgMO+8muefreS/oVxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgMe+8muaWsOa1quW+ruWNmlxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgM++8muW+ruS/oeWlveWPi1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNO+8muW+ruS/oeaci+WPi+WciFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNe+8mlFR5aW95Y+LXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA277yaUVHnqbrpl7RcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDfvvJrlpI3liLbpk77mjqVcclxuICAgICAgICAgKiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAqICAgICAgICAgICAgICBkYXRhOiDpu5jorqTliIbkuqvmlbDmja5cclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuc2hvd1NoYXJlUGFuZWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIGRlc2M6IGRlc2MsXHJcbiAgICAgICAgICAgIHBpY1VybDogaW1nVVJMLFxyXG4gICAgICAgICAgICBzaGFyZVVybDogcGFnZVVSbCAgLy8gdG9kbyDmma7pgJrliIbkuqtcclxuICAgICAgICB9LCBudWxsKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTlrprkvY3vvIzpppblhYjpgJrov4dHUFMg5a6a5L2N77yM5aaC5p6c5a6a5L2N5aSx6LSl77yM6YCa6L+H5o6l5Y+jZ2V0Q2l0eSzliKnnlKhJUOWcsOWdgOi/m+ihjOWumuS9je+8jOWmguaenOi/mOaYr+Wksei0pe+8jOmAmui/h+aPkuS7tuiOt+WPluWuouaIt+err+W3puS4iuinkueahOWfjuW4guS/oeaBr++8jOS+neeEtuWksei0pem7mOiupOepv2NpdHlDZDozMTAwMDAg5Luj6KGo5LiK5rW35biCXHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRMb2NhdGlvbkluZm8gPSAoY2FsbGJhY2syKSA9PiB7XHJcbiAgICBjb25zdCB1aSA9IFVQLlcuVUk7XHJcbiAgICB1aS5zaG93TG9hZGluZygpO1xyXG4gICAgbGV0IGNhbGxiYWNrID0gKGRhdGEpID0+IHtcclxuICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbiAgICAgICAgY2FsbGJhY2syKGRhdGEpXHJcbiAgICB9XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhcHAuZ2V0Q3VycmVudExvY2F0aW9uSW5mbygoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBhbGVydChKU09OLnN0cmluZ2lmeShkYXRhKSlcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9LCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2UoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY21kOiBcIi9cIiArIENPTkZJRy5SRVNULmdldENpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGF0aDogXCJodHRwOi8vMTcyLjIxLjMzLjU2OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIitDT05GSUcuUkVTVC5nZXRDaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcIjIuMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IFwiMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHRydWUsIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhLnBhcmFtcylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hOYXRpdmVEYXRhKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaE5hdGl2ZURhdGEoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoTmF0aXZlRGF0YSA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluWuouaIt+err+S/oeaBr1xyXG4gICAgICAgICAqIEBwYXJhbSBzdWNjZXNzXHJcbiAgICAgICAgICogQHBhcmFtIGZhaWxcclxuICAgICAgICAgKiBAcGFyYW0gdHlwZSAw77ya5Z+O5biC5L+h5oGvY2l0eUNk77ybMe+8mue7j+e6rOW6pu+8mzXvvJpVc2VySWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuZmV0Y2hOYXRpdmVEYXRhKDAsIChkYXRhID0ge30pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgICAgICAgIGNpdHlDZDogXCIzMTAwMDBcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcbmV4cG9ydCBjb25zdCBzYXZlUGljVG9Mb2NhbCA9IChjYW52YXMsIHJlc29sdmUpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIHVpID0gVVAuVy5VSSB8fCB7fTtcclxuICAgIHZhciBwaWNVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLnNhdmVQaWNUb0xvY2FsKHtcclxuICAgICAgICAgICAgdXJsOiBwaWNVcmwgJiYgcGljVXJsLnN1YnN0cigyMilcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8v5oiQ5YqfXHJcbiAgICAgICAgICAgICEhcmVzb2x2ZSAmJiByZXNvbHZlKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICB9LCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cgPT0gJ3VwZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dBbGVydCgn6K+35Y2H57qn5Yiw5pyA5paw5a6i5oi356uvJywgZnVuY3Rpb24gKCkgeyAvLyDljrvljYfnuqdcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ1llcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW52LmlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL2l0dW5lcy5hcHBsZS5jb20vY24vYXBwL2lkNjAwMjczOTI4P2NvZGU9bmV3WWVhckFjdGl2aXR5JztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b3VodWkuOTU1MTYuY29tL2FwcC9hcHAvc29mdHdhcmUvdW5pb25wYXktd2FsbGV0LXYyLmFwaz9jb2RlPW5ld1llYXJBY3Rpdml0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLm9wZW5Ccm93c2VyKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdObycpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ+mprOS4iuWNh+e6pycsICfnqI3lkI7lho3or7QnLCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAhIXJlc29sdmUgJiYgcmVzb2x2ZShcImZhaWxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVUZXh0Q2FudmFzZSA9ICh0ZXh0LCBjb2xvciwgbG9uZyA9IDY4NCwgc2hvdCA9IDYwKSA9PiB7XHJcblxyXG4gICAgbGV0IHJlbTJweCA9ICh2YWwpID0+IHtcclxuICAgICAgICB2YXIgY1dpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcbiAgICAgICAgcmV0dXJuIHZhbCAqIGNXaWR0aCAvIDc1MFxyXG4gICAgfVxyXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Q2FudmFzJyk7XHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgLy/oqK3nva7nlavkvYjnmoTlr6zpq5hcclxuICAgIC8vIHZhciBiZ1dpZHRoID0gcmVtMnB4KGxvbmcpO1xyXG4gICAgLy8gdmFyIGJnSGVpZ2h0ID0gcmVtMnB4KHNob3QpO1xyXG5cclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgc2hvdCk7XHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBsb25nKTtcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBjdHgucm90YXRlKC05MCAqIE1hdGguUEkgLyAxODApO1xyXG4gICAgdmFyIHRleHQgPSB0ZXh0O1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcclxuICAgIGxldCBmb250U2l6ZSA9IHNob3Q7XHJcbiAgICBjdHguZm9udCA9IGZvbnRTaXplICsgJ3B4IEFpcmFsJztcclxuICAgIHdoaWxlIChjdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGggPiBsb25nKSB7XHJcbiAgICAgICAgZm9udFNpemUtLTtcclxuICAgICAgICBjdHguZm9udCA9IGZvbnRTaXplICsgJ3B4IEFpcmFsJztcclxuICAgIH1cclxuICAgIGN0eC5maWxsVGV4dCh0ZXh0LCAtbG9uZywgZm9udFNpemUpO1xyXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog55Sf5oiQ5Zu+54mH5bm25L+d5a2Y5Yiw55u45YaMXHJcbiAqIEBwYXJhbSBiZ3VybCDog4zmma/lm77niYfnmoTlnLDlnYBcclxuICogQHBhcmFtIHFyY29kZVVSTCDkuoznu7TnoIHnmoTlnLDlnYBcclxuICogQHBhcmFtIHFyY29kZVdkQW5kSGcg5LqM57u056CB55qE5a695bqmXHJcbiAqIEBwYXJhbSB4V2lkdGgg5LqM57u056CB6Led56a75bem5LiK6KeS55qEIOKGkiDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHlIZWlnaHQg5LqM57u056CB6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHRleHRiZ1VSTCDliqDlhaXnlLvluIPnmoTlm77niYfnmoRVUkxcclxuICogQHBhcmFtIHhUZXh0V2lkdGgg5Yqg5YWl55S75biD55qE5Zu+54mH6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHlUZXh0SGVpZ2h0IOWKoOWFpeeUu+W4g+eahOWbvueJh+i3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnZhc0FuZFNhdmVQaG90byA9IChjYW52YXNPYmosIHJlc29sdmUpID0+IHtcclxuICAgIGxldCB7Ymd1cmwsIHFyY29kZVVSTCwgcXJjb2RlV2RBbmRIZywgeFdpZHRoLCB5SGVpZ2h0LCB0ZXh0YmdVUkwsIHhUZXh0V2lkdGgsIHlUZXh0SGVpZ2h0fSA9IGNhbnZhc09iajtcclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbW9uQ2FudmFzV3JhcHBlcicpO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTnlLvluIPlhoXlrrlcclxuICAgICAqL1xyXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoXHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuc3JjID0gYmd1cmw7XHJcbiAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvL+ioree9rueVq+S9iOeahOWvrOmrmFxyXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgaW1nLndpZHRoKTtcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBpbWcuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy/lnKjnlavluIPkuIrnlavog4zmma/lnJZcclxuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XHJcblxyXG4gICAgICAgIGlmICghIXRleHRiZ1VSTCkge1xyXG4gICAgICAgICAgICBsZXQgdGV4dFVyaSA9IHRleHRiZ1VSTDtcclxuICAgICAgICAgICAgdmFyIHRleHRJbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgdGV4dEltZy5zcmMgPSB0ZXh0VXJpO1xyXG4gICAgICAgICAgICB0ZXh0SW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGV4dEltZywgeFRleHRXaWR0aCwgeVRleHRIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S6jOe2reeivOWclueJh+Wkp+Wwj1xyXG4gICAgICAgIHZhciBxcmNvZGVXaWR0aEFuZEhlaWdodCA9IHFyY29kZVdkQW5kSGc7XHJcbiAgICAgICAgLy/muIXpmaTkuoznu7TnoIFcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHZhciBxcmNvZGUgPSBuZXcgUVJDb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLCB7XHJcbiAgICAgICAgICAgIHRleHQ6IHFyY29kZVVSTCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBxcmNvZGVXaWR0aEFuZEhlaWdodCxcclxuICAgICAgICAgICAgd2lkdGg6IHFyY29kZVdpZHRoQW5kSGVpZ2h0LFxyXG4gICAgICAgICAgICBjb3JyZWN0TGV2ZWw6IFFSQ29kZS5Db3JyZWN0TGV2ZWwuTFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBxcmNvZGVJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF07XHJcbiAgICAgICAgcXJjb2RlSW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy/nlavkuozntq3norznmoTlnJbniYdcclxuICAgICAgICAgICAgbGV0IHFyY29kZUR4ID0geFdpZHRoLCBxcmNvZGVEeSA9IHlIZWlnaHQ7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UocXJjb2RlSW1nLCBxcmNvZGVEeCwgcXJjb2RlRHkpO1xyXG4gICAgICAgICAgICAvLyByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIHNhdmVQaWNUb0xvY2FsKGNhbnZhcywgcmVzb2x2ZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0LmpzIiwiY29uc3QgY29uZmlnID0ge1xyXG4gICAgUkVTVDoge1xyXG4gICAgICAgIGFwcGx5TWNjOiBcImNvbGxlY3Rpb25Db2RlL2FwcGx5TWNjXCIsIC8vMi40LjTnlLPor7fmlLbmrL7noIHmjqXlj6NcclxuICAgICAgICBnZXRNY2NDYXJkTGlzdDogXCJjb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiLCAvLzIuNC4y5ZWG5oi35pS25qy+56CB5Y2h5YiX6KGo5o6l5Y+jXHJcbiAgICAgICAgYXBwbHlNYXQ6IFwiY29sbGVjdGlvbkNvZGUvYXBwbHlNYXRcIiwgLy/nlLPor7fnianmlpnmjqXlj6NcclxuICAgICAgICBnZXRNY2hudEFuZEFyZWFJbmY6IFwibWNobnQvZ2V0TWNobnRBbmRBcmVhSW5mLnNqc29uXCIsIC8v5ZWG5oi357G75Z6L5Y+K5Zyw5Yy65YiX6KGo5p+l6K+iXHJcbiAgICAgICAgdXBncmFkZU1jYzogXCJjb2xsZWN0aW9uQ29kZS91cGdyYWRlTWNjXCIsIC8vMi40LjbljYfnuqfmlLbmrL7noIHmjqXlj6MsXHJcbiAgICAgICAgZ2V0QWRkckxpc3Q6IFwiYWRkcmVzcy9nZXRBZGRyTGlzdFwiICwgLy8yLjQuMTMg6I635Y+W5pS26LSn5Zyw5Z2A5YiX6KGoXHJcbiAgICAgICAgZGVsZXRlQWRkcmVzczogXCJhZGRyZXNzL2RlbGV0ZUFkZHJlc3NcIiAsIC8vMi40LjEyIOWIoOmZpOaUtui0p+WcsOWdgFxyXG4gICAgICAgIGVkaXRBZGRyZXNzOiBcImFkZHJlc3MvZWRpdEFkZHJlc3NcIiwgLy8yLjQuMTEg5L+u5pS55pS26LSn5Zyw5Z2ALFxyXG4gICAgICAgIG5ld0FkZHJlc3M6IFwiYWRkcmVzcy9uZXdBZGRyZXNzXCIsIC8vMi40LjEwIOaWsOWinuaUtui0p+WcsOWdgFxyXG4gICAgICAgIG1jaG50T3BlciA6XCJtY2hudC9tY2hudE9wZXJcIiwgLy8yLjIuMiDlupfpk7rkv6Hmga/mm7TmlrBcclxuICAgICAgICBnZXRMaW1pdEF0SW5mbzpcIm1jaG50L2dldExpbWl0QXRJbmZvXCIsIC8v6I635Y+W5pS25qy+6ZmQ6aKdXHJcbiAgICAgICAgc2V0TWNjT25PZmY6XCJjb2xsZWN0aW9uQ29kZS9zZXRNY2NPbk9mZlwiLCAvL+WBnOatouWSjOWQr+eUqOS7mOasvueggeWAn+WPo1xyXG4gICAgICAgIGdldE1jaG50RGV0YWlsOlwibWNobnQvbWNobnREZXRhaWxcIiwgLy8yLjIuMSDojrflj5blupfpk7ror6bmg4XpobXpnaJcclxuICAgICAgICAvLyB1cGdyYWRlTWNjOiBcImNvbGxlY3Rpb25Db2RlL3VwZ3JhZGVNY2NcIiwgLy8yLjQuNuWNh+e6p+aUtuasvueggeaOpeWPo1xyXG4gICAgICAgIGdldFRvZGF5VHJhbnM6XCJ0cmFuL2dldFRvZGF5VHJhbnNcIiwvLzIuMS4zLy/ku4rml6XorqLljZXmjqXlj6NcclxuICAgICAgICBnZXRUb2RheUluY29tZTpcInRyYW4vZ2V0VG9kYXlJbmNvbWVcIiwvLzIuMS4x5ZWG5oi35pyN5Yqh6aaW6aG15LuK5pel5pS25qy+5o6l5Y+jfn5+fn5+fn5cclxuICAgICAgICBnZXRIaXN0b3J5SW5jb21lOlwidHJhbi9nZXRIaXN0b3J5SW5jb21lXCIsLy8yLjEuMuWOhuWPsuaUtuasvuaOpeWPo1xyXG4gICAgICAgIGdldEhpc3RvcnlUcmFuczpcInRyYW4vZ2V0SGlzdG9yeVRyYW5zXCIsLy8yLjEuNOWOhuWPsuiuouWNleaOpeWPo1xyXG4gICAgICAgIGdldExvZ2lzdGljc1N0OlwibWF0ZXJpZWwvZ2V0TG9naXN0aWNzU3RcIiwvLzIuMy4z54mp5rWB6K+m5oOF5o6l5Y+j5p+l6K+iXHJcbiAgICAgICAgZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bTpcInRyYW4vZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bVwiLC8vMi4xLjXljZXnrJTorqLljZXmn6Xor6LmjqXlj6NcclxuICAgICAgICBnZXRBdWRpdEluZm86XCJjb2xsZWN0aW9uQ29kZS9nZXRBdWRpdEluZm9cIiwvLzIuNC4xNOS/oeeUqOWNoeWNh+e6p+WuoeaguOe7k+aenOafpeivolxyXG4gICAgICAgIHVwZGF0ZU1jY0NhcmQ6XCJjb2xsZWN0aW9uQ29kZS91cGRhdGVNY2NDYXJkXCIsLy8yLjQuOeabtOaNouaUtuasvuWNoeaOpeWPo1xyXG4gICAgICAgIGdldFVwZ3JhZGVTdDpcIm1jaG50L2dldFVwZ3JhZGVTdFwiLC8v5p+l6K+i5ZWG5oi35piv5ZCm5Y2H57qn5L+h55So5Y2h5pS25qy+XHJcbiAgICAgICAgZ2V0TWNjVHJhbnNOdW06J2NvbGxlY3Rpb25Db2RlL2dldE1jY1RyYW5zTnVtJywvL+iOt+WPluiwg+WPluaUr+S7mOaOp+S7tueahFRO5Y+3XHJcbiAgICAgICAgZ2V0TWF0ZXJpZWxJbmZvTGlzdDpcImNvbGxlY3Rpb25Db2RlL2dldE1hdGVyaWVsSW5mb0xpc3RcIiwvLzIuNC4z54mp5paZ5L+h5oGv5YiX6KGo5o6l5Y+jXHJcbiAgICAgICAgdXNlckluZm86XCIvYXBwL2luQXBwL3VzZXIvZ2V0XCIsLy/ojrflj5bnlKjmiLfkv6Hmga9cclxuICAgICAgICBpc0JsYWNrOlwic2Nhbi9pc0JsYWNrXCIsLy8yLjEuNeaUtumTtuWRmOaYr+WQpuWcqOm7keWQjeWNlVxyXG4gICAgICAgIGlzQXBwbHk6XCJzY2FuL2lzQXBwbHlcIiwvLzIuMS405piv5ZCm5bey57uP55Sz6K+357qi5YyF56CBXHJcbiAgICAgICAgc2hhcmVMaW5rOlwic2Nhbi9zaGFyZUxpbmtcIiwvLzIuMS4255Sf5oiQ57qi5YyF56CB6ZO+5o6lXHJcbiAgICAgICAgcmVjbWRSZWNvcmQ6XCJzY2FuL3JlY21kUmVjb3JkXCIsLy/mjqjojZDlhbPns7vorrDlvZVcclxuICAgICAgICBnZXRMb2dpc3RpY3NMaXN0OlwibWF0ZXJpZWwvZ2V0TG9naXN0aWNzTGlzdFwiLC8v6I635Y+W54mp5paZ5Y6G5Y+y6K6i5Y2VXHJcbiAgICAgICAgZ2V0UmV3YXJkTGlzdDpcInNjYW4vZ2V0UmV3YXJkTGlzdFwiLC8vMi4xLjfmn6Xor6LmlLbpk7blkZjotY/ph5HmmI7nu4borrDlvZVcclxuICAgICAgICBnZXRQcm90b2NvbEluZm86XCJjb2xsZWN0aW9uQ29kZS9nZXRQcm90b2NvbEluZm9cIiwvL+WVhuaIt+WNh+e6p+afpeivouaYvuekuuWNj+iurueahOWQjeensOWSjOWNj+iurueahOWcsOWdgFxyXG4gICAgICAgIGdldENpdHk6XCJyZWdpb24vZ2V0Q2l0eVwiLC8v6YCa6L+HSVDlnLDlnYDojrflj5blnLDlnYDlrprkvY1cclxuICAgICAgICBnZXRRclVybDpcImNvbGxlY3Rpb25Db2RlL2dldFFySW5mb1wiLy8yLjEuMeiOt+WPlueUqOaIt+aUtuasvueggVVSTFxyXG4gICAgfSxcclxuICAgIFNUQVRVU0NPREU6IHtcclxuICAgICAgICBTVUNDRVNTOlwiMDBcIlxyXG4gICAgfSxcclxuICAgIENPTlNUX0RBVEE6e1xyXG4gICAgICAgIGltZ2VTaXplOlwiMzAwXCJcclxuICAgIH0sXHJcbiAgICBDQUNIRUtFWTp7XHJcbiAgICAgICAgZ2V0TWNjQ2FyZExpc3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1jb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLWNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtbWNobnQvZ2V0VXBncmFkZVN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtbWNobnQvZ2V0VXBncmFkZVN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE1jaG50RGV0YWlsOntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtbWNobnQvbWNobnREZXRhaWxcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1tY2hudC9tY2hudERldGFpbFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0FwcGx5OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtc2Nhbi9pc0FwcGx5XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtc2Nhbi9pc0FwcGx5XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEFkZHJMaXN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtYWRkcmVzcy9nZXRBZGRyTGlzdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLWFkZHJlc3MvZ2V0QWRkckxpc3RcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCJpbXBvcnQgSW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIjtcclxuXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDlj6rkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICog5YWI6K+757yT5a2Y77yM5ZCM5q2l5b6A5ZCO5Y+w5Y+R6K+35rGC77yM6K+35rGC5oql5paH5Zue5p2l5ZCO5Yi35paw57yT5a2Y5Y+K6aG16Z2iXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UgPSAodXBkYXRlLHJvbGxLZXksc2Vjb25kS2V5KSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbi8vICAgICAgICAgICAgIHJvbGxLZXksXHJcbi8vICAgICAgICAgICAgIHNlY29uZEtleVxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgdXBkYXRlOiB1cGRhdGUsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOS4jeaUr+aMgSBzdyAgICzmsLjkuYXnt6nlrZhcclxuLy8gICogQHR5cGUge3tjYWNoZTogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFufX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUxvbmdUaW1lID0gKHJvbGxLZXksIHNlY29uZEtleSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgICAgIHJvbGxLZXksXHJcbi8vICAgICAgICAgICAgIHNlY29uZEtleVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5Y+q5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDHliIbpkp/lhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UxbWluID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMzBtaW4gPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMzAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTFob3VyID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICo2MCoxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UyaG91ciA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAyICogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuXHJcbi8vXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UyNGRpYW4gPSAoKSA9PiB7XHJcbi8vXHJcbi8vICAgICBsZXQgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbi8vICAgICBsZXQgdGVtb3Jyb3cgPSBuZXcgRGF0ZSgpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0SG91cnMoMjMpO1xyXG4vLyAgICAgdGVtb3Jyb3cuc2V0TWludXRlcyg1OSk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRTZWNvbmRzKDU5KTtcclxuLy8gICAgIGxldCB0ZW0gPSB0ZW1vcnJvdy5nZXRUaW1lKCk7XHJcbi8vICAgICBsZXQgdmFsaWRhdGVUaW1lID0gdGVtIC0gbm93ICsgMTAwMCAqIDYwXHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICAgICAgdmFsaWRhdGVUaW1lOiB2YWxpZGF0ZVRpbWUsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIHdvcmtib3jnmoTnrZbnlaUgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICrkuLpnZXTor7fmsYLvvIzkuI3liqDlr4ZcclxuLy8gICrmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAq5YWI6K+757yT5a2Y77yM5ZCM5pe25b6A5ZCO5Y+w5Y+R6K+35rGC77yM6K+35rGC5oql5paH5Zue5p2l5ZCO5Yi35paw57yT5a2Y5Y+K6aG16Z2iXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBjYWNoZTogYm9vbGVhbiwgYXN5bmM6IGJvb2xlYW59fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlID0gKHVwZGF0ZSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBieUFqYXg6IGZhbHNlLC8v5aaC5p6c6KaB5pSv5oyBc3cg5bCx5LiN6ZyA5L2/55SoYWpheFxyXG4vLyAgICAgICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICB1cGRhdGU6IHVwZGF0ZVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDmlK/mjIFzd+eahOiuvuWkh++8jOS9v+eUqHN377yM5LiN5pSv5oyB55qE5L2/55SobG9jYWxTdG9yYWdl57yT5a2YXHJcbi8vICAqIDMw5YiG6ZKf5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDMwbWluID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogMzAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMeWwj+aZguWGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QxaG91ciA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDYwICogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MmhvdXIgPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAyICogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLyoqXHJcbiAqIOivpeetlueVpeaYr+S4gOWumuaXtumXtOWGheS4jeWQkeWQjuWPsOivt+axguaVsOaNru+8jCDlpoLmnpzlnKjorr7lpIfkuIrmlK/mjIFzd+WImeS9v+eUqHN3LOWQpuWImeS9v+eUqCBsb2NhbFN0b3JhZ2VcclxuICogQHBhcmFtIHRpbWUgIOimgee8k+WtmOeahOaXtumXtCDljZXkvY3mmK/mr6vnp5JcclxuICogQHJldHVybnMge3tieUFqYXg6IGJvb2xlYW4sIGZvckNoc3A6IGJvb2xlYW4sIGVuY3J5cHQ6IGJvb2xlYW4sIGNhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7dmFsaWRhdGVUaW1lOiAqfX19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2FjaGVGaXJzdCA9KHRpbWUpPT57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGJ5QWpheDogdHJ1ZSxcclxuICAgICAgICBmb3JDaHNwOmZhbHNlLFxyXG4gICAgICAgIGVuY3J5cHQ6ZmFsc2UsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICB2YWxpZGF0ZVRpbWU6dGltZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogIOivpeetlueVpeaYr+S4gOWumuaXtumXtOWGheS4jeWQkeWQjuWPsOivt+axguaVsOaNru+8jOa3u+WKoOe8k+WtmOWPquWcqGxvY2Fsc3RvcmFnZeS4rVxyXG4gKiBAcGFyYW0gdGltZSAg6KaB57yT5a2Y55qE5pe26Ze0IOWNleS9jeaYr+avq+enklxyXG4gKiBAcGFyYW0gcm9sbEtleSAgIOmdnuW/heWhqyDlpoLmnpzlkI7mnJ/opoHliKDpmaTov5nkuKrnvJPlrZjvvIzov5nloavlhpnov5lrZXlcclxuICogQHBhcmFtIHNlY29uZEtleSAg6Z2e5b+F5aGrIOWmguaenOWQjuacn+imgeWIoOmZpOi/meS4que8k+WtmO+8jOi/meWhq+WGmei/mWtleVxyXG4gKiBAcmV0dXJucyB7e2NhY2hlOiBib29sZWFuLCBzdG9yYWdlOiB7bmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6ICosIHJvbGxLZXk6ICosIHNlY29uZEtleTogKn19fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3RTdG9yYWdlID0odGltZSxyb2xsS2V5LCBzZWNvbmRLZXkpPT57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsaWRhdGVUaW1lOiB0aW1lLFxyXG4gICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXNwb25zZUZvcm1hdHRlciA9IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgcmVzID0ge1xyXG4gICAgICAgIHN0YXR1c0NvZGU6IGRhdGEucmVzcCxcclxuICAgICAgICBkYXRhOiBkYXRhLnBhcmFtcyxcclxuICAgICAgICBtc2c6IGRhdGEubXNnXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIOivpeetlueVpeaYr+WFiOivu+e8k+WtmO+8jOWQjOaXtuWQkeWQjuWPsOWPkemAgeivt+axgu+8jOivt+axguWbnuadpeWQjuWQjOatpeabtOaWsOe8k+WtmO+8jOWbnuiwg3VwZGF0ZSDlh73mlbDvvIxcclxuICogQHBhcmFtIHVwZGF0ZSDlv4Xloavmm7TmlrDpobXpnaLnmoTlm57osIPlh73mlbBcclxuICogQHBhcmFtIHJvbGxLZXkgIOmdnuW/heWhqyDorr7nva7nvJPlrZjnmoQgcm9sbGtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5IOmdnuW/heWhqyDorr7nva7nvJPlrZjnmoQgc2Vjb25kS2V5XHJcbiAqIEByZXR1cm5zIHt7Y2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHthc3luYzogYm9vbGVhbiwgcm9sbEtleTogKiwgc2Vjb25kS2V5OiAqfSwgdXBkYXRlOiAqfX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UgPSAodXBkYXRlLHJvbGxLZXksc2Vjb25kS2V5KSA9PiB7XHJcblxyXG4gICBsZXQgIHJlZnJlc2hEb21GdW5jPShyZXNwb25zZSk9PntcclxuICAgICAgIGxldCByZXE9cmVzcG9uc2VGb3JtYXR0ZXIocmVzcG9uc2UpXHJcbiAgICAgICAvLyDlsIbojrflj5bnmoTmlbDmja7lkoznvJPlrZjkuK3nmoTmlbDmja7ov5vooYzlr7nmr5RcclxuICAgICAgIGxldCBkYXRhRnJvbUNhY2hlID0ge307XHJcbiAgICAgICBVUC5XLlV0aWwuZ2V0RnJvbVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICB9LGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgIGlmKCAhIWRhdGEgKXtcclxuICAgICAgICAgICAgICAgIGRhdGFGcm9tQ2FjaGUgPSBkYXRhO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgfSlcclxuICAgICAgIGxldCBpc1NhbWVBdEFsbCA9IEltbXV0YWJsZS5pcyhJbW11dGFibGUuZnJvbUpTKHJlcSksSW1tdXRhYmxlLmZyb21KUyhkYXRhRnJvbUNhY2hlKSk7IC8v5pWw5o2u5piv5ZCm5a6M5YWo55u45ZCMXHJcbiAgICAgICBpZiggIWlzU2FtZUF0QWxsICl7IC8v5pWw5o2u5pyJ5Y+Y5YqoXHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXEpXHJcbiAgICAgICB9XHJcbiAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgZW5kT2ZTeW5jRnVuYzpmYWxzZSxcclxuICAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IHJlZnJlc2hEb21GdW5jLFxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5Yig6ZmkbG9jYWxzdG9yYWdl5Lit55qE57yT5a2YXHJcbiAqIEBwYXJhbSByb2xsS2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXlcclxuICovXHJcbmV4cG9ydCBjb25zdCByZW1vdmVDYWNoZSA9IChyb2xsS2V5LCBzZWNvbmRLZXkpID0+IHtcclxuICAgIFVQLlcuVXRpbC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICByb2xsS2V5OiByb2xsS2V5LFxyXG4gICAgICAgIHNlY29uZEtleTogc2Vjb25kS2V5XHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIoOmZpOe8k+WtmOaIkOWKnycpXHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICBmdWxsOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL2NhY2hlU3RvcmFnZS5qcyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCBBZGRyZXNzTWFuYWdlbWVudCBmcm9tIFwiLi9BZGRyZXNzTWFuYWdlbWVudFwiXHJcbmltcG9ydCB7IGRlbGV0ZUFkZHJlc3MgfSBmcm9tICcuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJJ1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vLi4vc3RvcmUvc3RvcmUnXHJcbmltcG9ydCB7IFVQREFURV9TVE9SRV9TVEFURSB9IGZyb20gJy4uLy4uL3N0b3JlL2FjdGlvbidcclxuaW1wb3J0IHsgY2hhbmdlU3RvcmVBZGRyIH0gZnJvbSAnLi9BZGRyZXNzTWFuYWdlbWVudEFjdGlvbnMnXHJcblxyXG5jbGFzcyBBZGRyZXNzTWFuYWdlbWVudENvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICAvKipcclxuICAgICAqIOWcqOWcsOWdgOWIl+ihqOeuoeeQhumhtemdoueCueWHu+WcsOWdgOivpuaDheaXtu+8jOabtOaUueeUs+ivt+eJqeaWmemhtemdoueUs+ivt+eJqeaWmeeahOWcsOWdgOS/oeaBr++8jOeEtuWQjuWbnumAgOWIsOeUs+ivt+eJqeaWmemhtemdolxyXG4gICAgICogQHBhcmFtIHsqfSBhZGRySXRlbSDpgInkuK3nmoTlnLDlnYDkv6Hmga9cclxuICAgICAqL1xyXG4gICAgY2xpY2tUb0NoYW5nZVN0b3JlQWRkciA9IChhZGRySXRlbSkgPT4ge1xyXG4gICAgICAgIGNoYW5nZVN0b3JlQWRkcihhZGRySXRlbSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPEFkZHJlc3NNYW5hZ2VtZW50IHsuLi50aGlzLnByb3BzfSBjbGlja1RvQ2hhbmdlU3RvcmVBZGRyPXt0aGlzLmNsaWNrVG9DaGFuZ2VTdG9yZUFkZHJ9IC8+O1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IG1hcHN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRyZXNzTGlzdDogc3RhdGUuZ2V0SW4oWydhZGRyZXNzTGlzdCddKS50b0pTKCkgLy/lnLDlnYDliJfooahcclxuICAgIH1cclxufVxyXG5jb25zdCBtYXBEaXNwYXRoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk5a+55bqUaWTnmoTlnLDlnYDkv6Hmga9cclxuICAgICAqIEBwYXJhbSB7Kn0gYWRkcklkIOWcsOWdgGlkXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNsaWNrVG9EZWxBZGRyKGFkZHJJZCkge1xyXG4gICAgICAgIGRlbGV0ZUFkZHJlc3Moe1xyXG4gICAgICAgICAgICBpZDogYWRkcklkXHJcbiAgICAgICAgfSkudGhlbigocGFyYW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGRlbElkID0gcGFyYW0uaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IEZMQUdfREVGX0FERFIgPSAnMSc7IC8v6buY6K6k5Zyw5Z2A55qE5qCH6K+G56ymXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdpZCcrZGVsSWQpO1xyXG4gICAgICAgICAgICBsZXQgYWRkckxpc3QgPSBzdG9yZS5nZXRTdGF0ZSgpLmdldEluKFsnYWRkcmVzc0xpc3QnXSkudG9KUygpO1xyXG4gICAgICAgICAgICBsZXQgc3RvcmVBZGRyID0gc3RvcmUuZ2V0U3RhdGUoKS5nZXRJbihbJ3N0b3JlQWRkciddKS50b0pTKCk7XHJcbiAgICAgICAgICAgIC8vIOWIoOmZpOWujOaIkOWQjuabtOaWsHJlZHV45Lit55qEYWRkcmVzc0xpc3RcclxuICAgICAgICAgICAgbGV0IGxhc3Rlc3RBZGRyTGlzdCA9IGFkZHJMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgIT0gZGVsSWQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7ICdhZGRyZXNzTGlzdCc6IGxhc3Rlc3RBZGRyTGlzdCB9KSk7XHJcblxyXG4gICAgICAgICAgICAvL+WmguaenOW9k+WJjeWIoOmZpOeahOaYr+eJqeaWmeeUs+ivt+mhtemdoumAieS4reeahOWcsOWdgO+8jOWImemcgOimgeabtOaWsOeUs+ivt+eJqeaWmemhtemdouS9v+eUqOeahHN0b3JlQWRkclxyXG4gICAgICAgICAgICBpZiAoc3RvcmVBZGRyLmlkID09IGRlbElkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWRkckl0ZW0gPSB7fTtcclxuICAgICAgICAgICAgICAgIC8vIOWmguaenOaciem7mOiupOWcsOWdgO+8jOWImeWwhum7mOiupOWcsOWdgOiuvuS4uuWwhuimgeabtOaWsOeahOWcsOWdgFxyXG4gICAgICAgICAgICAgICAgbGFzdGVzdEFkZHJMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdGUgPT0gRkxBR19ERUZfQUREUikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRySXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VTdG9yZUFkZHIoYWRkckl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2xpY2tUb0RlbEFkZHJcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcHN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0aFRvUHJvcHMpKEFkZHJlc3NNYW5hZ2VtZW50Q29udGFpbmVyKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvQWRkcmVzc01hbmFnZW1lbnQvQWRkcmVzc01hbmFnZW1lbnRDb250YWluZXIuanMiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1Byb21pc2UnLCB7ICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgKHJlc3VsdC5lID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnYpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanNcbi8vIG1vZHVsZSBpZCA9IDhlMGMxZGIwMDA4NWM4YWQyNTVhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UudHJ5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDk3M2NjOGVlZmM1OTkzMWRlOTVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBhYTk2M2I0YzI3MTQ0ZjA5NGNjYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIEQpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gYjUwZDgyNDU2ZTU0NWRjYzNkZDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgYXJncywgdGhhdCkge1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qc1xuLy8gbW9kdWxlIGlkID0gYjU4MGI5NGIxOTU4NDJjYmYyYjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIGlzTm9kZSA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChoZWFkKSBub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChpc05vZGUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgU2FmYXJpIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMzOVxuICB9IGVsc2UgaWYgKE9ic2VydmVyICYmICEoZ2xvYmFsLm5hdmlnYXRvciAmJiBnbG9iYWwubmF2aWdhdG9yLnN0YW5kYWxvbmUpKSB7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWU7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICAvLyBQcm9taXNlLnJlc29sdmUgd2l0aG91dCBhbiBhcmd1bWVudCB0aHJvd3MgYW4gZXJyb3IgaW4gTEcgV2ViT1MgMlxuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZiAoIWhlYWQpIHtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBiZGUwZjU3ZTliNTc5Zjk0M2Y4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG4vLyAyNS40LjEuNSBOZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcblxuZnVuY3Rpb24gUHJvbWlzZUNhcGFiaWxpdHkoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gYzFiOTRlM2U5NWVkNDM1YWY1NDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS1maW5hbGx5XG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnUHJvbWlzZScsIHsgJ2ZpbmFsbHknOiBmdW5jdGlvbiAob25GaW5hbGx5KSB7XG4gIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIGNvcmUuUHJvbWlzZSB8fCBnbG9iYWwuUHJvbWlzZSk7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIG9uRmluYWxseSA9PSAnZnVuY3Rpb24nO1xuICByZXR1cm4gdGhpcy50aGVuKFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHg7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHksXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9KTtcbiAgICB9IDogb25GaW5hbGx5XG4gICk7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qc1xuLy8gbW9kdWxlIGlkID0gYzJlMzViYmZmODMzMDk1OTQzYzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGU6IGZhbHNlLCB2OiBleGVjKCkgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IGU6IHRydWUsIHY6IGUgfTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSBjYjc4Mzc1Mjk0NTQyYzI0YzViYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IGQxODEwYWU1MzMyZTM2ZmZhM2M0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBuYXZpZ2F0b3IgPSBnbG9iYWwubmF2aWdhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50IHx8ICcnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanNcbi8vIG1vZHVsZSBpZCA9IGVjNmNiZTMxN2I5ODUwYjA1Y2U1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSBlZjUxZDQ5ODlmMzA0NGIyZWIzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qc1xuLy8gbW9kdWxlIGlkID0gZjBkYmMxMGM2OGRkODE0MDE0ZTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4vX3VzZXItYWdlbnQnKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52OCB8fCAnJztcbnZhciAkUHJvbWlzZSA9IGdsb2JhbFtQUk9NSVNFXTtcbnZhciBpc05vZGUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbnZhciBlbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBJbnRlcm5hbCwgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBPd25Qcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIHZhciBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICAgIGV4ZWMoZW1wdHksIGVtcHR5KTtcbiAgICB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpXG4gICAgICAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2VcbiAgICAgIC8vIHY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTgzMDU2NVxuICAgICAgLy8gd2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgICAgICYmIHY4LmluZGV4T2YoJzYuNicpICE9PSAwXG4gICAgICAmJiB1c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lLzY2JykgPT09IC0xO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuLCBleGl0ZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7IC8vIG1heSB0aHJvd1xuICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgICAgICBleGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaSkgcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKSBvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIHVuaGFuZGxlZCA9IGlzVW5oYW5kbGVkKHByb21pc2UpO1xuICAgIHZhciByZXN1bHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYgKHVuaGFuZGxlZCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKSB7XG4gICAgICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodW5oYW5kbGVkICYmIHJlc3VsdC5lKSB0aHJvdyByZXN1bHQudjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgcmV0dXJuIHByb21pc2UuX2ggIT09IDEgJiYgKHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYykubGVuZ3RoID09PSAwO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gZmE5ODdkODExZTRlYjJkNDNkOWNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4Il0sInNvdXJjZVJvb3QiOiIifQ==