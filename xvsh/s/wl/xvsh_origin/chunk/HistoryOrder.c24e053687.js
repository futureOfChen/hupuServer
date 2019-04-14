webpackJsonp([8],{

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

/***/ "107b915147828be3c047":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"clearfix":"clearfix","specialColor":"specialColor","historyOrderContain":"historyOrderContain","orderInfo":"orderInfo","historyOrderList":"historyOrderList","plateImg":"plateImg","plateImgBoX":"plateImgBoX","plateStatus":"plateStatus","plateDesc":"plateDesc","plateTitle":"plateTitle","plateTime":"plateTime","platePro":"platePro","proIng":"proIng","rightRocket":"rightRocket"};

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

/***/ "255a9dd80c749948d3ae":
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

var _reactRouterDom = __webpack_require__("91409e3157f4cc61f11f");

__webpack_require__("107b915147828be3c047");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HistoryOrder = function (_React$Component) {
    (0, _inherits3.default)(HistoryOrder, _React$Component);

    function HistoryOrder() {
        (0, _classCallCheck3.default)(this, HistoryOrder);
        return (0, _possibleConstructorReturn3.default)(this, (HistoryOrder.__proto__ || (0, _getPrototypeOf2.default)(HistoryOrder)).apply(this, arguments));
    }

    (0, _createClass3.default)(HistoryOrder, [{
        key: "render",
        value: function render() {
            var logisticsList = this.props.logisticsList;


            var getStatusText = function getStatusText(status) {
                switch (status) {
                    case "00":
                        return "未邮寄";
                    case "01":
                        return "已发货";
                    case "02":
                        return "已签收";
                    case "03":
                        return "错误件";
                    default:
                        return "";
                }
            };

            var createOrderList = function createOrderList(item, index) {

                return _react2.default.createElement(
                    "li",
                    { className: "clearfix", key: index },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: { pathname: "/iogisticsInfo", search: "?materialId=" + item.materielId } },
                        _react2.default.createElement(
                            "div",
                            { className: "plateImg" },
                            _react2.default.createElement(
                                "div",
                                { className: "plateImgBoX" },
                                _react2.default.createElement("img", { src: __webpack_require__("bf807e23c39e86f3c865") })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "plateStatus" },
                            _react2.default.createElement(
                                "div",
                                { className: "plateDesc" },
                                _react2.default.createElement(
                                    "p",
                                    { className: "plateTitle" },
                                    "\u7EA2\u5305\u7801\u8D34\u7EB8"
                                ),
                                _react2.default.createElement(
                                    "p",
                                    { className: "plateTime" },
                                    item.recCrtTs
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "platePro" },
                                _react2.default.createElement(
                                    "p",
                                    { className: item.matDelivSt == '01' ? "proIng specialColor" : "proIng" },
                                    getStatusText(item.matDelivSt),
                                    _react2.default.createElement("span", { className: "rightRocket" })
                                )
                            )
                        )
                    )
                );
            };
            return _react2.default.createElement(
                "div",
                { className: "historyOrderContain" },
                _react2.default.createElement(
                    "p",
                    { className: "orderInfo" },
                    "\u8BA2\u5355\u4FE1\u606F"
                ),
                _react2.default.createElement(
                    "ul",
                    { className: "historyOrderList" },
                    logisticsList.map(createOrderList)
                )
            );
        }
    }]);
    return HistoryOrder;
}(_react2.default.Component); /**
                               * Created by by on 2018/4/12.
                               */


exports.default = HistoryOrder;

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

/***/ "5ec485887913e5b7ef2a":
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

var _HistoryOrderActions = __webpack_require__("9250820edadc40d79de0");

var _HistoryOrder = __webpack_require__("255a9dd80c749948d3ae");

var _HistoryOrder2 = _interopRequireDefault(_HistoryOrder);

var _store = __webpack_require__("729bd0f3009c1858d0f9");

var _store2 = _interopRequireDefault(_store);

var _request = __webpack_require__("76fb50331ac78bf18670");

var _action = __webpack_require__("5d4604b08304c597d074");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HistoryOrderContainers = function (_Component) {
    (0, _inherits3.default)(HistoryOrderContainers, _Component);

    function HistoryOrderContainers(props) {
        (0, _classCallCheck3.default)(this, HistoryOrderContainers);
        return (0, _possibleConstructorReturn3.default)(this, (HistoryOrderContainers.__proto__ || (0, _getPrototypeOf2.default)(HistoryOrderContainers)).call(this, props));
    }

    (0, _createClass3.default)(HistoryOrderContainers, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _request.beforeEnterRouter)("历史订单");
            /**
             *这个参数要
             * @type {{logisticsTp: string}}
             */
            // {logisticsTp:"01"} 未邮寄

            var param = { logisticsTp: "02" };

            (0, _HistoryOrderActions.getLogisticsListOfRedbag)(param).then(function (res) {
                var list = JSON.parse(res.data.logisticsList);
                list.forEach(function (item) {
                    var date = new Date(item.recCrtTs);
                    var yyyy = date.getFullYear() + "";
                    var mm = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 + "" : "0" + (date.getMonth() + 1);
                    var dd = date.getDate() >= 10 ? date.getDate() + "" : "0" + date.getDate();
                    var hh = date.getHours() >= 10 ? date.getHours() + "" : "0" + date.getHours();
                    var min = date.getMinutes() >= 10 ? date.getMinutes() + "" : "0" + date.getMinutes();
                    item.recCrtTs = yyyy + "." + mm + "." + dd + " " + hh + ":" + min;
                });
                _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                    logisticsList: list
                }));
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                logisticsList: []
            }));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_HistoryOrder2.default, this.props);
        }
    }]);
    return HistoryOrderContainers;
}(_react.Component); /**
                      * Created by justice on 2018/11/12.
                      */


var mapstateToProps = function mapstateToProps(state) {
    return {
        logisticsList: state.getIn(["logisticsList"]).toJS()
    };
};

exports.default = (0, _reactRedux.connect)(mapstateToProps)(HistoryOrderContainers);

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

/***/ "9250820edadc40d79de0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__("251bc7afe8127e09149d");

var _promise2 = _interopRequireDefault(_promise);

exports.getLogisticsListOfRedbag = getLogisticsListOfRedbag;

var _requestAPI = __webpack_require__("01f45e806ef08cc34923");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 历史收款码物料历史订单
 * @param param
 */
function getLogisticsListOfRedbag(param) {
    return (0, _requestAPI.getLogisticsList)(param).then(function (res) {
        return _promise2.default.resolve(res);
    });
}

// export function getLogisticsListOfXVSH() {
//     /**
//      * 这个接口要
//      */
//     return get(CONFIG.REST.getLogisticsList,Object.assign(comomParam,{logisticsTp:"01"}),cacheStorage(1*60*1000));
// }

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

/***/ "bf807e23c39e86f3c865":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9IaXN0b3J5T3JkZXIvSGlzdG9yeU9yZGVyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSGlzdG9yeU9yZGVyL0hpc3RvcnlPcmRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0hpc3RvcnlPcmRlci9IaXN0b3J5T3JkZXJDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvY2FjaGVTdG9yYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSGlzdG9yeU9yZGVyL0hpc3RvcnlPcmRlckFjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWdzL3BsYXRlLWljb24ucG5nIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyJdLCJuYW1lcyI6WyJyZWNtZFJlY29yZCIsInNoYXJsaW5rIiwiaXNCbGFjayIsImlzQXBwbHkiLCJhcHBseU1jYyIsImdldENhcmRsaXN0IiwiZ2V0QWRkckxpc3QiLCJhcHBseU1hdCIsImdldFFyVXJsUmVzdCIsImdldE1jaG50QW5kQXJlYUluZiIsImdldE1jaG50RGV0YWlsIiwidXBncmFkZU1jYyIsImdldFByb3RvY29sSW5mbyIsImdldEhpc3RvcnlJbmNvbWUiLCJnZXRIaXN0b3J5VHJhbnMiLCJnZXRUb2RheUluY29tZSIsImdldFRvZGF5VHJhbnMiLCJnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtIiwiZ2V0TG9naXN0aWNzU3QiLCJnZXRVcGdyYWRlU3QiLCJnZXRMb2dpc3RpY3NMaXN0IiwiZ2V0QXVkaXRJbmZvIiwiZ2V0TGltaXRBdEluZm8iLCJtY2hudE9wZXIiLCJkZWxldGVBZGRyZXNzIiwidXBkYXRlTWNjQ2FyZCIsIm5ld0FkZHJlc3MiLCJlZGl0QWRkcmVzcyIsInNldE1jY09uT2ZmIiwiZ2V0TWNjVHJhbnNOdW0iLCJwaG9uZSIsInVuZGVmaW5lZCIsInJlY21kTW9iaWxlIiwiVXRpbCIsImJhc2U2NEVuY29kZSIsIkNPTkZJRyIsIlJFU1QiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwiU1RBVFVTQ09ERSIsIlNVQ0NFU1MiLCJyb2xsS2V5IiwiQ0FDSEVLRVkiLCJzZWNvbmRLZXkiLCJmdWxsIiwicmVzb2x2ZSIsInNoYXJlTGluayIsInJlZFVybFN0ciIsImRhdGEiLCJpZGVudGlmaWVyIiwibmV4dFN0YXRlIiwic3RvcmUiLCJkaXNwYXRjaCIsInVwZGF0ZSIsInVwZGF0ZUZ1bmMiLCJyZXNwIiwiYmxhY2tTdCIsImNvbnNvbGUiLCJsb2ciLCJjYWNoZVBhcmFtIiwiYXBwbHlTdCIsInBhcmFtIiwicmVmZXJlZVRlbCIsInZpcnR1YWxDYXJkTm8iLCJhY2NObSIsImNpdHlDZCIsImNvbW9tUGFyYW0iLCJnZXRNY2NDYXJkTGlzdCIsImNhcmRMaXN0IiwibGVuZ3RoIiwiZGVmYWx1dENhcmQiLCJiYW5rIiwiY2FyZFR5cGUiLCJmdW5jdGlvbkJpdG1hcCIsImljb25SZWxVcmwiLCJpc1N1cHBvcnQiLCJwYW4iLCJyYW5rIiwic2VsZWN0ZWQiLCJmb3JFYWNoIiwiaXRlbSIsImsiLCJzdG9yZVN0YXRlIiwic3RvcmVSZWNlaXZlQ2FyZE9iaiIsInN0YXRlIiwiYWRkcmVzc0xpc3QiLCJyZXN1bHQiLCJtYXRlcmlhbExpc3QiLCJkZWxpdk5tIiwiYWRkQWxsIiwiZGVsaXZQaG9uZSIsInByb3ZpbmNlSWQiLCJjaXR5SWQiLCJhcmVhSWQiLCJhZGRyZXNzSW5mbyIsImlkIiwiY2l0eU5tIiwicmVkVXJsIiwiZ2V0UXJVcmwiLCJtY2hudERldGFpbCIsInFyVXJsIiwicXJOdW0iLCJhcmVhIiwibWVyY2hhbnRUcCIsImFyZWFBcnIiLCJwcm92aW5jZSIsIm9uZSIsInByb0lkIiwicHJvTm0iLCJ0d28iLCJjaXR5IiwidGhyZWUiLCJ2YWx1ZSIsImNoaWxkcmVuIiwicHVzaCIsImFyZWFObSIsIm1lcmNoYW50VHBBcnIiLCJtZXJUeXBlMSIsIm1lcmNoYW50VHBDZCIsIm1lcmNoYW50VHBObSIsIm1lclR5cGUyIiwibWNobnRBbmRBcmVhSW5mIiwic3RvcmVObSIsIlN0b3JlVHAiLCJwcm92Q2QiLCJjb3V0eUNkIiwiYWRkciIsImNlcnRpZlBpYzEiLCJjZXJ0aWZQaWMyIiwiY2VydGlmUGljMyIsImxpY2Vuc2VQaWMiLCJzaG9wUGljMSIsInNob3BQaWMyIiwiYXV4UHJvdk1hdDEiLCJhdXhQcm92TWF0MiIsInNob3BMb2dvUGljIiwiVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3QiLCJyZXMiLCJoaXN0b3J5SW5jb21lT2JqIiwib3JpZ2luTGlzdERhdGEiLCJnZXRTdGF0ZSIsImdldEluIiwidG9KUyIsIm5ld0xpc3QiLCJ0cmFuc0luZm8iLCJoaXN0b3J5T3JkZXJMaXN0IiwiY29uY2F0IiwidG9kYXlJbmNvbWVPYmoiLCJ0b2RheU9yZGVyTGlzdCIsIm5ld09iaiIsImRlbGl2ZXJ5TXNnIiwibWF0RGVsaXZTdGF0dXMiLCJsaW1pdEluZm8iLCJpc1VzZU1jYyIsIm1jY1RyYW5zTnVtIiwidHJhbnNOdW0iLCJIaXN0b3J5T3JkZXIiLCJsb2dpc3RpY3NMaXN0IiwicHJvcHMiLCJnZXRTdGF0dXNUZXh0Iiwic3RhdHVzIiwiY3JlYXRlT3JkZXJMaXN0IiwiaW5kZXgiLCJwYXRobmFtZSIsInNlYXJjaCIsIm1hdGVyaWVsSWQiLCJyZXF1aXJlIiwicmVjQ3J0VHMiLCJtYXREZWxpdlN0IiwibWFwIiwiUmVhY3QiLCJDb21wb25lbnQiLCJIaXN0b3J5T3JkZXJDb250YWluZXJzIiwibG9naXN0aWNzVHAiLCJsaXN0IiwiSlNPTiIsInBhcnNlIiwiZGF0ZSIsIkRhdGUiLCJ5eXl5IiwiZ2V0RnVsbFllYXIiLCJtbSIsImdldE1vbnRoIiwiZGQiLCJnZXREYXRlIiwiaGgiLCJnZXRIb3VycyIsIm1pbiIsImdldE1pbnV0ZXMiLCJtYXBzdGF0ZVRvUHJvcHMiLCJyZXF1ZXN0Iiwic2V0WGlhb1dlaVBheSIsIndpbmRvdyIsIlVQIiwiVyIsIkFwcCIsIkVudiIsInJlZ1Bob25lIiwicmVnUGF5TnVtIiwidmVyc2lvbiIsInNvdXJjZSIsImJhc2VVcmwiLCJiYXNlVXJsMiIsImJhc2VVcmwzIiwibG9jYXRpb24iLCJob3N0bmFtZSIsImluZGV4T2YiLCJwcm90b2NvbCIsImdldFNlcnZVcmwiLCJ1cmwiLCJzZXJ2ZXJVcmwiLCJ1c2VySW5mbyIsInNwbGl0IiwiZ2V0Q2l0eSIsInJlc3BvbnNlRm9ybWF0dGVyIiwicGFyYW1zIiwibXNnIiwiZGVsZXRlU2xhc2giLCJob3N0IiwicmVwbGFjZSIsImFkZFNsYXNoIiwicGF0aCIsInRlc3QiLCJzZXBhcmF0ZVBhcmFtcyIsInBhcmFtc0xpbmUiLCJrZXkiLCJjb25maWciLCJtZXRob2QiLCJ0b1VwcGVyQ2FzZSIsImZpbmFsVXJsIiwicmVqZWN0Iiwib3B0aW9ucyIsInR5cGUiLCJzdWNjZXNzIiwiZXJyb3IiLCJFcnJvciIsImRhdGFUeXBlIiwiJCIsImFqYXgiLCJnZXQiLCJwYXJhbUFsbCIsImZvckNoc3AiLCJlbmNyeXB0IiwiY2FjaGUiLCJieUFqYXgiLCJwb3N0IiwicHV0IiwiZGVsIiwiZ2V0U2VhcmNoUGFyYW0iLCJzdHIiLCJzbGljZSIsImFycmF5Iiwib2JqIiwic3VjIiwiZXJyIiwiYXBwIiwic2V0WGlhb1dlaUF1ZGlvIiwiZ2V0WGlhb1dlaUF1ZGlvIiwidG9hc3QiLCJtcyIsIlRvYXN0IiwiaW5mbyIsImJlZm9yZUVudGVyUm91dGVyIiwidGl0bGUiLCJyaWdodEJhciIsInJpZ2h0Q2FsbGJhY2siLCJyaWdodEJhckltZyIsImRvY3VtZW50Iiwib25QbHVnaW5SZWFkeSIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInNldE5hdmlnYXRpb25CYXJSaWdodEJ1dHRvbiIsIm1jY1N0YXRlQ2hhbmdlZCIsInNlbmRRckNvZGUiLCJmYWlsIiwic2NhblFSQ29kZSIsImNsb3NlV2ViVmlldyIsInZlcmlmeVBheVB3ZCIsImNyZWF0ZVdlYlZpZXciLCJpc0ZpbmlzaCIsImdldFVzZXJEZXRhaWxJbmZvIiwic2F2ZVFjb2RlIiwiY2FudmFzIiwidWkiLCJVSSIsInBpY1VybCIsInRvRGF0YVVSTCIsImxvZ0V2ZW50Iiwic2F2ZVBpY1RvTG9jYWwiLCJzdWJzdHIiLCJzaG93VG9hc3RXaXRoUGljIiwic2hvd0FsZXJ0IiwiZW52IiwiaXNJT1MiLCJvcGVuQnJvd3NlciIsInNob3dUb2FzdCIsInNoYXJlIiwiZGVzYyIsImltZ1VSTCIsInBhZ2VVUmwiLCJzaG93U2hhcmVQYW5lbCIsInNoYXJlVXJsIiwiZ2V0Q3VycmVudExvY2F0aW9uSW5mbyIsImNhbGxiYWNrMiIsInNob3dMb2FkaW5nIiwiY2FsbGJhY2siLCJkaXNtaXNzIiwic2VuZE1lc3NhZ2UiLCJjbWQiLCJmZXRjaE5hdGl2ZURhdGEiLCJ4aHIiLCJjcmVhdGVUZXh0Q2FudmFzZSIsInRleHQiLCJjb2xvciIsImxvbmciLCJzaG90IiwicmVtMnB4IiwidmFsIiwiY1dpZHRoIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJzZXRBdHRyaWJ1dGUiLCJ3aWR0aCIsInJvdGF0ZSIsIk1hdGgiLCJQSSIsImZpbGxTdHlsZSIsInRleHRBbGlnbiIsImZvbnRTaXplIiwiZm9udCIsIm1lYXN1cmVUZXh0IiwiZmlsbFRleHQiLCJjcmVhdGVDb252YXNBbmRTYXZlUGhvdG8iLCJjYW52YXNPYmoiLCJiZ3VybCIsInFyY29kZVVSTCIsInFyY29kZVdkQW5kSGciLCJ4V2lkdGgiLCJ5SGVpZ2h0IiwidGV4dGJnVVJMIiwieFRleHRXaWR0aCIsInlUZXh0SGVpZ2h0IiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJvbmxvYWQiLCJoZWlnaHQiLCJkcmF3SW1hZ2UiLCJ0ZXh0VXJpIiwidGV4dEltZyIsInFyY29kZVdpZHRoQW5kSGVpZ2h0IiwiaW5uZXJIVE1MIiwicXJjb2RlIiwiUVJDb2RlIiwiY29ycmVjdExldmVsIiwiQ29ycmVjdExldmVsIiwiTCIsInFyY29kZUltZyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicXJjb2RlRHgiLCJxcmNvZGVEeSIsImdldE1hdGVyaWVsSW5mb0xpc3QiLCJnZXRSZXdhcmRMaXN0IiwiQ09OU1RfREFUQSIsImltZ2VTaXplIiwiY2FjaGVGaXJzdCIsInRpbWUiLCJzdG9yYWdlIiwidmFsaWRhdGVUaW1lIiwiY2FjaGVGaXJzdFN0b3JhZ2UiLCJuZWVkU3ciLCJzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UiLCJyZWZyZXNoRG9tRnVuYyIsInJlcSIsImRhdGFGcm9tQ2FjaGUiLCJnZXRGcm9tU3RvcmFnZSIsInJlbW92ZVN0b3JhZ2UiLCJpc1NhbWVBdEFsbCIsIkltbXV0YWJsZSIsImlzIiwiZnJvbUpTIiwiYXN5bmMiLCJlbmRPZlN5bmNGdW5jIiwicmVtb3ZlQ2FjaGUiLCJnZXRMb2dpc3RpY3NMaXN0T2ZSZWRiYWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBV2dCQSxXLEdBQUFBLFc7UUF5QkFDLFEsR0FBQUEsUTtRQWlCQUMsTyxHQUFBQSxPO1FBdUJBQyxPLEdBQUFBLE87UUFvQkFDLFEsR0FBQUEsUTtRQTBCQUMsVyxHQUFBQSxXO1FBZ0RBQyxXLEdBQUFBLFc7UUFnQ0FDLFEsR0FBQUEsUTtRQW9CQUMsWSxHQUFBQSxZO1FBbUJBQyxrQixHQUFBQSxrQjtRQW1IQUMsYyxHQUFBQSxjO1FBZ0JBQyxVLEdBQUFBLFU7UUFnQ0FDLGUsR0FBQUEsZTtRQWVBQyxnQixHQUFBQSxnQjtRQWVBQyxlLEdBQUFBLGU7UUFpQkFDLGMsR0FBQUEsYztRQWVBQyxhLEdBQUFBLGE7UUFnQkFDLHlCLEdBQUFBLHlCO1FBTUFDLGMsR0FBQUEsYztRQXVCQUMsWSxHQUFBQSxZO1FBV0FDLGdCLEdBQUFBLGdCO1FBWUFDLFksR0FBQUEsWTtRQVlBQyxjLEdBQUFBLGM7UUFhQUMsUyxHQUFBQSxTO1FBWUFDLGEsR0FBQUEsYTtRQWdCQUMsYSxHQUFBQSxhO1FBZUFDLFUsR0FBQUEsVTtRQWFBQyxXLEdBQUFBLFc7UUFlQUMsVyxHQUFBQSxXO1FBWUFDLGMsR0FBQUEsYzs7QUFsb0JoQjs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUlPLFNBQVM3QixXQUFULENB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Q0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQTBELG9CQUFvQjtBQUM5RSxtQkFBTyxDQUFDLHNCQUFzQjtBQUM5QixtQkFBTyxDQUFDLHNCQUFnQjtBQUN4QixVQUFVLG1CQUFPLENBQUMsc0JBQVM7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGdEQUFnRCxtQkFBTyxDQUFDLHNCQUFnQjtBQUN4RTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiY2h1bmsvSGlzdG9yeU9yZGVyLmMyNGUwNTM2ODcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NvbW9tUGFyYW0sIGdldCwgcG9zdCwgVXRpbH0gZnJvbSBcIi4vcmVxdWVzdFwiO1xyXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge30gZnJvbSBcIi4vY2FjaGVTdG9yYWdlXCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tIFwiLi4vLi4vc3RvcmUvc3RvcmVcIjtcclxuaW1wb3J0IHtVUERBVEVfU1RPUkVfU1RBVEV9IGZyb20gXCIuLi8uLi9zdG9yZS9hY3Rpb25cIjtcclxuaW1wb3J0IHtjYWNoZUZpcnN0LGNhY2hlRmlyc3RTdG9yYWdlLHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSxyZW1vdmVDYWNoZX0gZnJvbSBcIi4vY2FjaGVTdG9yYWdlXCI7XHJcblxyXG4vKipcclxuICog55Sz6K+357qi5YyF56CB55qE6K+35rGCXHJcbiAqIEBwYXJhbSBwaG9uZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlY21kUmVjb3JkKHBob25lKSB7XHJcbiAgICBpZiAocGhvbmUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcGhvbmUgPSBcIlwiXHJcbiAgICB9XHJcbiAgICBsZXQgcmVjbWRNb2JpbGUgPSBVdGlsLmJhc2U2NEVuY29kZShwaG9uZSlcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnJlY21kUmVjb3JkLCB7cmVjbWRNb2JpbGV9KS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbnlLPor7fnuqLljIXnoIHmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0sKCk9Pnt9LCgpPT57XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbDp0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6K+35rGC57qi5YyF5ZCX6L+e5o6lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2hhcmxpbmsoKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5zaGFyZUxpbmssIHt9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgbGV0IHJlZFVybFN0cj0gXCJodHRwczovL3dhbGxldC45NTUxNi5jb20vcy93bC93ZWJWMy9hY3Rpdml0eS92TWFya2V0aW5nMi9odG1sL3Nuc0luZGV4Lmh0bWw/cj1cIiArIHJlc3BvbnNlLmRhdGEuaWRlbnRpZmllcjtcclxuICAgICAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHJlZFVybFN0clxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShuZXh0U3RhdGUpKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlZFVybFN0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKblnKjnmb3lkI3ljZXnmoTor7fmsYJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0JsYWNrKHVwZGF0ZSkge1xyXG4gICAgbGV0IHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbihyZXNwKXtcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICBibGFja1N0OnJlc3AuZGF0YS5ibGFja1N0XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lzQmxhY2s6IHVwZGF0ZeWHveaVsOaJp+ihjOWujOavlScpO1xyXG4gICAgICAgIGlmKCB0eXBlb2YgdXBkYXRlID09PSAnZnVuY3Rpb24nICl7XHJcbiAgICAgICAgICAgIHVwZGF0ZShyZXNwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+ivu+WPlue8k+WtmO+8jOWQjOaXtuW8guatpeWPkemAgeivt+axglxyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuaXNCbGFjayx7fSxzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UodXBkYXRlRnVuYykpLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGJsYWNrU3Q6cmVzcG9uc2UuZGF0YS5ibGFja1N0XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5piv5ZCm5Zyo6buR5ZCN5Y2V55qE6K+35rGCXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQXBwbHkoKSB7XHJcbiAgICBsZXQgY2FjaGVQYXJhbSA9IGNhY2hlRmlyc3RTdG9yYWdlKDMwKjYwKjEwMDAsQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSwgQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5KTsvL+e8k+WtmDMw5YiG6ZKfXHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmlzQXBwbHksIHt9LGNhY2hlUGFyYW0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuYXBwbHlTdCAhPSBcIjFcIikge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5aaC5p6c5bey57uP55Sz6K+36L+H57qi5YyF56CB5YiZ57yT5a2YMzDliIbpkp/vvIzlkKbliJnkuI3nvJPlrZhcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5pc0FwcGx5LnNlY29uZEtleSlcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgYXBwbHlTdDpyZXNwb25zZS5kYXRhLmFwcGx5U3RcclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnlLPor7fmlLbmrL7noIFcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWNjKHBhcmFtID0ge1xyXG4gICAgcmVmZXJlZVRlbDogXCJcIiwgICAgICAgICAvL+aOqOiNkOS6uuaJi+acuuWPt1xyXG4gICAgdmlydHVhbENhcmRObzogXCJcIiwgICAgICAvL+iZmuaLn+WNoeWPt1xyXG4gICAgYWNjTm06IFwiXCIsICAgICAgICAgICAgICAvL+W6l+mTuuWQjeensFxyXG4gICAgY2l0eUNkOiBcIlwiICAgICAgICAgICAgICAgLy/ln47luILku6PnoIFcclxufSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuYXBwbHlNY2MsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbnlLPor7fnuqLljIXnoIHmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoe1xyXG4gICAgICAgICAgICAgICAgcm9sbEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkucm9sbEtleSxcclxuICAgICAgICAgICAgICAgIHNlY29uZEtleTogQ09ORklHLkNBQ0hFS0VZLmlzQXBwbHkuc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0sKCk9Pnt9LCgpPT57XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDYWNoZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbDp0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE6ZO26KGM5Y2h5YiX6KGoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FyZGxpc3QoKSB7XHJcbiAgICAvL+iOt+WPlueUqOaIt+mTtuihjOWNoeWIl+ihqO+8jOe8k+WtmDHliIbpkp9cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TWNjQ2FyZExpc3QsIGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoNjAqMTAwMCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgLy/lpoLmnpzlkI7lj7Dov5Tlm57pk7booYzljaHliJfooajkuJTkuI3kuLrnqbpcclxuICAgICAgICBpZiAoISFyZXNwb25zZS5kYXRhLmNhcmRMaXN0ICYmIHJlc3BvbnNlLmRhdGEuY2FyZExpc3QubGVuZ3RoICE9IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8v5Yid5aeL5YyW6buY6K6k5Y2hXHJcbiAgICAgICAgICAgIGxldCBkZWZhbHV0Q2FyZCA9IHtcclxuICAgICAgICAgICAgICAgIGJhbms6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHmiYDlnKjnmoTpk7booYxcclxuICAgICAgICAgICAgICAgIGNhcmRUeXBlOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mTtuihjOWNoeexu+Wei1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb25CaXRtYXA6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZO26KGM5Y2h5Yqf6IO95L2NXHJcbiAgICAgICAgICAgICAgICBpY29uUmVsVXJsOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pk7booYzljaHnmoRsb2dv5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICBpc1N1cHBvcnQ6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpuaUr+aMgVxyXG4gICAgICAgICAgICAgICAgcGFuOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/luKbmnInmjqnnoIHnmoTljaHlj7dcclxuICAgICAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpumAieS4rVxyXG4gICAgICAgICAgICAgICAgdmlydHVhbENhcmRObzogXCJcIiAgIC8v6Jma5ouf5Y2h5Y+3XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLmNhcmRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghIWl0ZW0uc2VsZWN0ZWQgJiYgaXRlbS5pc1N1cHBvcnQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmFsdXRDYXJkID0gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy/lpoLmnpzmsqHmnInpu5jorqTpgInkuK3nmoTljaHlj5bkuIDkuKrkuI3ooqvnva7kuLrngbDnmoTljaHkuLrpu5jorqTljaFcclxuICAgICAgICAgICAgaWYgKGRlZmFsdXRDYXJkLmJhbmsubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmVzcG9uc2UuZGF0YS5jYXJkTGlzdC5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmNhcmRMaXN0W2tdLmlzU3VwcG9ydCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmFsdXRDYXJkID0gcmVzcG9uc2UuZGF0YS5jYXJkTGlzdFtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdG9yZVN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgc3RvcmVSZWNlaXZlQ2FyZE9iajogZGVmYWx1dENhcmQsXHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdDogcmVzcG9uc2UuZGF0YS5jYXJkTGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShzdG9yZVN0YXRlKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5blnLDlnYDliJfooahcclxuICogQHBhcmFtIHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFkZHJMaXN0KFxyXG4gICAgdXBkYXRlLCAvL+e8k+WtmOeahOabtOaWsOWHveaVsFxyXG4gICAgcGFyYW0gPSB7XHJcbiAgICAgICAgc3RhdGU6IFwiXCIgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbikge1xyXG4gICAgLy8g6K+75Y+W57yT5a2Y77yM5ZCM5pe25byC5q2l5Y+R6YCB6K+35rGCXHJcbiAgICBsZXQgdXBkYXRlRnVuYyA9IGZ1bmN0aW9uKHJlc3Ape1xyXG4gICAgICAgIC8vIOWcqHVwZGF0ZeWHveaVsOS4re+8jOabtOaWsHJlZHV45Lit55qEYWRkcmVzc0xpc3RcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe2FkZHJlc3NMaXN0OnJlc3AuZGF0YS5yZXN1bHR8fFtdfSkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRBZGRyTGlzdDogdXBkYXRl5Ye95pWw5omn6KGM5a6M5q+VJyk7XHJcbiAgICAgICAgaWYoIHR5cGVvZiB1cGRhdGUgPT09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgICB1cGRhdGUocmVzcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGNhY2hlUGFyYW0gPSBzdGFsZVdoaWxlUmV2YWxpZGF0ZVN0b3JhZ2UodXBkYXRlRnVuYyxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Qucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0QWRkckxpc3Quc2Vjb25kS2V5KTtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEFkZHJMaXN0LCBPYmplY3QuYXNzaWduKHt9LCBjb21vbVBhcmFtLCBwYXJhbSksY2FjaGVQYXJhbSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IGFkZHJlc3NMaXN0ID0gcmVzcG9uc2UuZGF0YS5yZXN1bHQgfHwgW107XHJcblxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgIGFkZHJlc3NMaXN0XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog55Sz6K+354mp5paZ5o6l5Y+jXHJcbiAqIEBwYXJhbSBwYXJhbSDor7fmsYLlj4LmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1hdChwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3Q6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nianmlpnliJfooahcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxpdk5tOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mlLbotKfkurpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRBbGw6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDljLrlkI3np7BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxpdlBob25lOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mlLbotKfnlLXor51cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aW5jZUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nnIFJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlJZDogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W4gklEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYUlkOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyw5Yy6SURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzSW5mbzogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/or6bnu4blnLDlnYBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJycsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lnLDlnYDnmoRJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlObTogXCJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aJgOWcqOWfjuW4gkNpdHlDb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkVXJsOiBcIlwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v57qi5YyF56CB5Zyw5Z2AICDlj6/pgInlj4LmlbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmFwcGx5TWF0LCBPYmplY3QuYXNzaWduKHBhcmFtLCBjb21vbVBhcmFtKSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWVhuaIt+aUtuasvueggeWcsOWdgOWSjOWVhuaIt+e8luWPt1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFFyVXJsUmVzdCgpIHtcclxuICAgIC8v57yT5a2YMuWwj+aXtlxyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRRclVybCwgY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgbWNobnREZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgIHFyVXJsOiByZXNwb25zZS5kYXRhLnFyVXJsLFxyXG4gICAgICAgICAgICAgICAgcXJOdW06IHJlc3BvbnNlLmRhdGEucXJOdW1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICrojrflj5blupfpk7rljLrln5/liJfooajlkozlupfpk7rnsbvlnovliJfooahcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jaG50QW5kQXJlYUluZigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/meS4quaOpeWPoyzlj6rotbBzd++8jOS4jei1sGxvYWNhbFN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgLy8gbGV0IGNhY2hlUGFyYW0gPSB7XHJcbiAgICAvLyAgICAgYnlBamF4OiBmYWxzZSxcclxuICAgIC8vICAgICBmb3JDaHNwOmZhbHNlLFxyXG4gICAgLy8gICAgIGVuY3J5cHQ6ZmFsc2UsXHJcbiAgICAvLyAgICAgY2FjaGU6IHRydWVcclxuICAgIC8vIH1cclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TWNobnRBbmRBcmVhSW5mLCBjb21vbVBhcmFtLCBjYWNoZUZpcnN0KDI0KjYwKjYwKjEwMDApKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGxldCBhcmVhID0gW10sIG1lcmNoYW50VHAgPSBbXTtcclxuXHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MpIHtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDnnIHnuqdcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuYXJlYUFyci5mb3JFYWNoKChwcm92aW5jZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvbmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBwcm92aW5jZS5wcm9JZCxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IHByb3ZpbmNlLnByb05tLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwcm92aW5jZS5wcm9ObSA9PSBcIuWMl+S6rOW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi5LiK5rW35biCXCIgfHwgcHJvdmluY2UucHJvTm0gPT0gXCLlpKnmtKXluIJcIiB8fCBwcm92aW5jZS5wcm9ObSA9PSBcIumHjeW6huW4glwiIHx8IHByb3ZpbmNlLnByb05tID09IFwi5rex5Zyz5biCXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHByb3ZpbmNlLnByb0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IHByb3ZpbmNlLnByb05tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aW5jZS5jaXR5LmZvckVhY2goKGNpdHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRocmVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBjaXR5LmNpdHlJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogY2l0eS5jaXR5Tm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRocmVlLnZhbHVlICE9IHR3by52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdvLmNoaWxkcmVuLnB1c2godGhyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICog5biC57qnXHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmluY2UuY2l0eS5mb3JFYWNoKChjaXR5KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHdvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBjaXR5LmNpdHlJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogY2l0eS5jaXR5Tm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiDljLrnuqdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuYXJlYS5mb3JFYWNoKChhcmVhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRocmVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogYXJlYS5hcmVhSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBhcmVhLmFyZWFObSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdvLmNoaWxkcmVuLnB1c2godGhyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25lLmNoaWxkcmVuLnB1c2godHdvKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGFyZWEucHVzaChvbmUpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5tZXJjaGFudFRwQXJyLmZvckVhY2goKG1lclR5cGUxKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb25lID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogbWVyVHlwZTEubWVyY2hhbnRUcENkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogbWVyVHlwZTEubWVyY2hhbnRUcE5tLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBtZXJUeXBlMS5tZXJjaGFudFRwQXJyLmZvckVhY2goKG1lclR5cGUyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtZXJUeXBlMi5tZXJjaGFudFRwQ2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogbWVyVHlwZTIubWVyY2hhbnRUcE5tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbmUuY2hpbGRyZW4ucHVzaCh0d28pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBtZXJjaGFudFRwLnB1c2gob25lKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHtcclxuICAgICAgICAgICAgbWNobnRBbmRBcmVhSW5mOiB7XHJcbiAgICAgICAgICAgICAgICBhcmVhQXJyOiBhcmVhLFxyXG4gICAgICAgICAgICAgICAgbWVyY2hhbnRUcEFycjogbWVyY2hhbnRUcFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURShuZXh0U3RhdGUpKVxyXG5cclxuICAgIH0pXHJcblxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5bqX6ZO66K+m5oOF5L+h5oGvXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1jaG50RGV0YWlsKCkge1xyXG4gICAgbGV0IGNhY2hlUGFyYW0gPSBjYWNoZUZpcnN0U3RvcmFnZSg2MCoxMDAwLENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOy8v57yT5a2YMeWIhumSn1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0TWNobnREZXRhaWwsIGNvbW9tUGFyYW0sY2FjaGVQYXJhbSkudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyl7XHJcbiAgICAgICAgICAgIGxldCBtY2hudERldGFpbCA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHttY2hudERldGFpbH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtY2hudERldGFpbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOWNh+e6p+WVhumTuuS6jOe7tOeggVxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBncmFkZU1jYyhwYXJhbT17XHJcbiAgICBzdG9yZU5tOiBcIlwiLCAgICAvL+W6l+mTuuWQjeensFxyXG4gICAgU3RvcmVUcDogXCJcIiwgICAgLy/lupfpk7rnsbvlnotcclxuICAgIHByb3ZDZDogXCJcIiwgICAgIC8v55yBSURcclxuICAgIGNpdHlDZDogXCJcIiwgICAgIC8v5biCSURcclxuICAgIGNvdXR5Q2Q6IFwiXCIsICAgIC8v5Yy6SURcclxuICAgIGFkZHI6IFwiXCIsICAgICAgIC8v5Zyw5Z2AXHJcbiAgICBjZXJ0aWZQaWMxOiBcIlwiLCAvL+i6q+S7veivgeato+mdoueFp1xyXG4gICAgY2VydGlmUGljMjogXCJcIiwgLy/ouqvku73or4Hlj43pnaLnhadcclxuICAgIGNlcnRpZlBpYzM6IFwiXCIsIC8v5omL5oyB6Lqr5Lu96K+B54Wn54mHXHJcbiAgICBsaWNlbnNlUGljOiBcIlwiLCAvL+iQpeS4muaJp+eFp1xyXG4gICAgc2hvcFBpYzE6IFwiXCIsICAgLy/lupfpk7rnhafniYcxXHJcbiAgICBzaG9wUGljMjogXCJcIiwgICAvL+W6l+mTuueFp+eJhzJcclxuICAgIGF1eFByb3ZNYXQxOiBcIlwiLC8v6L6F5Yqp54Wn54mHMVxyXG4gICAgYXV4UHJvdk1hdDI6IFwiXCIsLy/ovoXliqnnhafniYcyXHJcbiAgICBzaG9wTG9nb1BpYzogXCJcIiAvL+W6l+mTukxPR09cclxufSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QudXBncmFkZU1jYywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICAvL+WIoOmZpOW6l+mTuuivpuaDheeahOe8k+WtmFxyXG4gICAgICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTtcclxuICAgICAgICAgICAgLy/liKDpmaTnlKjmiLfmmK/lkKbljYfnuqfnmoTmjqXlj6PnmoTnvJPlrZhcclxuICAgICAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0LnJvbGxLZXksIENPTkZJRy5DQUNIRUtFWS5VcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE5Y2P6K6u57yW5Y+35ZKM5Y2P6K6u5ZCN56ewXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3RvY29sSW5mbygpIHtcclxuICAgIC8qKlxyXG4gICAgICog6L+Z5Liq5o6l5Y+jLOe8k+WtmDLlsI/ml7ZcclxuICAgICAqL1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRQcm90b2NvbEluZm8sIGNvbW9tUGFyYW0sY2FjaGVGaXJzdFN0b3JhZ2UoMio2MCo2MCoxMDAwKSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UuZGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5Y6G5Y+y5pS25qy+XHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpc3RvcnlJbmNvbWUocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEhpc3RvcnlJbmNvbWUsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnlJbmNvbWVPYmo6IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWOhuWPsuiuouWNlVxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXN0b3J5VHJhbnMocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldEhpc3RvcnlUcmFucywgT2JqZWN0LmFzc2lnbihwYXJhbSwgY29tb21QYXJhbSkpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgbGV0IG9yaWdpbkxpc3REYXRhID0gc3RvcmUuZ2V0U3RhdGUoKS5nZXRJbihbJ2hpc3RvcnlPcmRlckxpc3QnXSkudG9KUygpXHJcbiAgICAgICAgICAgIGxldCBuZXdMaXN0ID0gcmVzLmRhdGEudHJhbnNJbmZvO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdMaXN0KVxyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeU9yZGVyTGlzdDogb3JpZ2luTGlzdERhdGEuY29uY2F0KG5ld0xpc3QpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOS7iuaXpeaUtuasvlxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2RheUluY29tZSgpIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRvZGF5SW5jb21lLGNvbW9tUGFyYW0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIHRvZGF5SW5jb21lT2JqOiByZXMuZGF0YVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5LuK5pel6K6i5Y2VXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5VHJhbnMocGFyYW0pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULmdldFRvZGF5VHJhbnMsIE9iamVjdC5hc3NpZ24ocGFyYW0sIGNvbW9tUGFyYW0pKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5MaXN0RGF0YSA9IHN0b3JlLmdldFN0YXRlKCkuZ2V0SW4oWyd0b2RheU9yZGVyTGlzdCddKS50b0pTKClcclxuICAgICAgICAgICAgbGV0IG5ld0xpc3QgPSByZXMuZGF0YS50cmFuc0luZm87XHJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKFVQREFURV9TVE9SRV9TVEFURSh7XHJcbiAgICAgICAgICAgICAgICB0b2RheU9yZGVyTGlzdDogb3JpZ2luTGlzdERhdGEuY29uY2F0KG5ld0xpc3QpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWNleeslOafpeivolxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtKHBhcmFtKSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5nZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpXHJcbn1cclxuLyoqXHJcbiAqIOiOt+WPlueJqea1geS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2lzdGljc1N0KHBhcmFtKXtcclxuICAgIHJldHVybiBnZXQoQ09ORklHLlJFU1QuZ2V0TG9naXN0aWNzU3QsIE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgbGV0IG5ld09iaiA9IHJlcy5kYXRhLmRlbGl2ZXJ5TXNnO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogbmV3T2JqLm1hdERlbGl2U3RhdHVzIOeahOeKtuaAgeWSjHJlZHV455qEc3RvcmXkv53mjIHkuIDoh7RcclxuICAgICAgICAgICAgICogQHR5cGUgeyp9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBuZXdPYmoubWF0RGVsaXZTdGF0dXMgPSByZXMuZGF0YS5tYXREZWxpdlN0YXR1cztcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgICAgIGRlbGl2ZXJ5TXNnOiBuZXdPYmpcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICog5ZWG5oi35pyN5Yqh6aaW6aG1IOeCueWHu+S/oeeUqOWNoeaMiemSruafpeivouWVhuaIt+aYr+WQpuW8gOmAmui/h+S/oeeUqOWNoeaUtuasvlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVwZ3JhZGVTdCgpe1xyXG4gICAgcmV0dXJuIGdldChDT05GSUcuUkVTVC5nZXRVcGdyYWRlU3QsIGNvbW9tUGFyYW0pLnRoZW4oKHJlcyk9PntcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W54mp5paZ5Y6G5Y+y6K6i5Y2VXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naXN0aWNzTGlzdChwYXJhbSl7XHJcbiAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldExvZ2lzdGljc0xpc3QsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOafpeivouS/oeeUqOWNoeaUtuasvuWNh+e6p+eKtuaAgVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEF1ZGl0SW5mbygpe1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0QXVkaXRJbmZvLCBjb21vbVBhcmFtKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5pS25qy+6ZmQ6aKd6K+m5oOFXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGltaXRBdEluZm8oKXtcclxuICAgIC8v57yT5a2YMuS4quWwj+aXtlxyXG4gICAgcG9zdChDT05GSUcuUkVTVC5nZXRMaW1pdEF0SW5mbyxjb21vbVBhcmFtLGNhY2hlRmlyc3RTdG9yYWdlKDIqNjAqNjAqMTAwMCkpLnRoZW4oKHJlc3ApPT57XHJcbiAgICAgICAgaWYoIHJlc3Auc3RhdHVzQ29kZSA9IENPTkZJRy5TVEFUVVNDT0RFLlNVQ0NFU1MgKXtcclxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtsaW1pdEluZm86cmVzcC5kYXRhfSkpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOabtOaWsOW6l+mTuuivpuaDhVxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOW6l+mTuuivpuaDheS/oeaBr1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1jaG50T3BlcihwYXJhbSA9e30pIHtcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnVwZ3JhZGVNY2MgLCBPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/liKDpmaRtY2hudERldGFpbOe8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRNY2hudERldGFpbC5zZWNvbmRLZXkpOyBcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5Yig6Zmk5Zyw5Z2A5L+h5oGvXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQWRkcmVzcyhwYXJhbT17XHJcbiAgICBpZDonJyAvL+WcsOWdgGlkXHJcbn0pe1xyXG4gICAgXHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5kZWxldGVBZGRyZXNzLE9iamVjdC5hc3NpZ24ocGFyYW0sY29tb21QYXJhbSkpLnRoZW4oKCk9PntcclxuICAgICAgICAvL+WIoOmZpOaUtui0p+WcsOWdgOe8k+WtmFxyXG4gICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwYXJhbSk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOabtOaWsOaUtuasvumTtuihjOWNoVxyXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1jY0NhcmQocGFyYW09e1xyXG4gICAgdmlydHVhbENhcmRObzonJyAvL+iZmuaLn+WNoeWPt1xyXG59KSB7XHJcbiAgICBcclxuICAgIHJldHVybiBwb3N0KENPTkZJRy5SRVNULnVwZGF0ZU1jY0NhcmQsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigoKT0+e1xyXG4gICAgICAgIC8v5o2i5Y2h5ZCO77yM5riF6Zmk5bqX6ZO66K+m5oOF57yT5a2YXHJcbiAgICAgICAgcmVtb3ZlQ2FjaGUoQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnJvbGxLZXksQ09ORklHLkNBQ0hFS0VZLmdldE1jaG50RGV0YWlsLnNlY29uZEtleSk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpOyBcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5paw5aKe5Zyw5Z2AXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+m57uG55qE5Zyw5Z2A5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3QWRkcmVzcyhwYXJhbT17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QubmV3QWRkcmVzcyxPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTKXtcclxuICAgICAgICAgICAgLy8g5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDkv67mlLnlnLDlnYDkv6Hmga9cclxuICogQHBhcmFtIHsqfSBwYXJhbSDor6bnu4bnmoTlnLDlnYDkv6Hmga9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlZGl0QWRkcmVzcyhwYXJhbT17fSkge1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZWRpdEFkZHJlc3MsT2JqZWN0LmFzc2lnbihwYXJhbSxjb21vbVBhcmFtKSkudGhlbigocmVzcG9uc2UpPT57XHJcbiAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gQ09ORklHLlNUQVRVU0NPREUuU1VDQ0VTUyl7XHJcbiAgICAgICAgICAgIC8v5Yig6Zmk5pS26LSn5Zyw5Z2A57yT5a2YXHJcbiAgICAgICAgICAgIHJlbW92ZUNhY2hlKENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5yb2xsS2V5LENPTkZJRy5DQUNIRUtFWS5nZXRBZGRyTGlzdC5zZWNvbmRLZXkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog5ZCv5YGc5pS25qy+56CB5pyN5YqhXHJcbiAqIEBwYXJhbSB7Kn0gcGFyYW0g6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWNjT25PZmYocGFyYW09e1xyXG4gICAgaXNVc2VNY2M6JycgIC8v5piv5ZCm5L2/55So5pS25qy+56CB5pyN5YqhXHJcbiB9KSB7XHJcbiAgICByZXR1cm4gcG9zdChDT05GSUcuUkVTVC5zZXRNY2NPbk9mZixPYmplY3QuYXNzaWduKHBhcmFtLGNvbW9tUGFyYW0pKS50aGVuKCgpPT57XHJcbiAgICAgICAgLy/liKDpmaTlupfpk7ror6bmg4XnvJPlrZhcclxuICAgICAgICByZW1vdmVDYWNoZShDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwucm9sbEtleSxDT05GSUcuQ0FDSEVLRVkuZ2V0TWNobnREZXRhaWwuc2Vjb25kS2V5KTsgXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog6I635Y+W5ZCK6LW35pSv5LuY5o6n5Lu255qEVE7lj7dcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNY2NUcmFuc051bSgpe1xyXG4gICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0TWNjVHJhbnNOdW0pLnRoZW4oKHJlc3ApPT57XHJcbiAgICAgICAgaWYoIHJlc3Auc3RhdHVzQ29kZSA9PSBDT05GSUcuU1RBVFVTQ09ERS5TVUNDRVNTICl7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe21jY1RyYW5zTnVtOnJlc3AuZGF0YS50cmFuc051bX0pXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdEFQSS5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImNsZWFyZml4XCI6XCJjbGVhcmZpeFwiLFwic3BlY2lhbENvbG9yXCI6XCJzcGVjaWFsQ29sb3JcIixcImhpc3RvcnlPcmRlckNvbnRhaW5cIjpcImhpc3RvcnlPcmRlckNvbnRhaW5cIixcIm9yZGVySW5mb1wiOlwib3JkZXJJbmZvXCIsXCJoaXN0b3J5T3JkZXJMaXN0XCI6XCJoaXN0b3J5T3JkZXJMaXN0XCIsXCJwbGF0ZUltZ1wiOlwicGxhdGVJbWdcIixcInBsYXRlSW1nQm9YXCI6XCJwbGF0ZUltZ0JvWFwiLFwicGxhdGVTdGF0dXNcIjpcInBsYXRlU3RhdHVzXCIsXCJwbGF0ZURlc2NcIjpcInBsYXRlRGVzY1wiLFwicGxhdGVUaXRsZVwiOlwicGxhdGVUaXRsZVwiLFwicGxhdGVUaW1lXCI6XCJwbGF0ZVRpbWVcIixcInBsYXRlUHJvXCI6XCJwbGF0ZVByb1wiLFwicHJvSW5nXCI6XCJwcm9JbmdcIixcInJpZ2h0Um9ja2V0XCI6XCJyaWdodFJvY2tldFwifTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0hpc3RvcnlPcmRlci9IaXN0b3J5T3JkZXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTA3YjkxNTE0NzgyOGJlM2MwNDdcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgc2FmZSkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgaWYgKHNhZmUgJiYgdGFyZ2V0W2tleV0pIHRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNGRjMWY3ZWJkODBkMTViZmQzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjc5ODUxYmUyN2IyNjhlYTI0ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFkZmFjMjg1MjNhZTM3ZGFjNWJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjUxYmM3YWZlODEyN2UwOTE0OWRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgYnkgb24gMjAxOC80LzEyLlxyXG4gKi9cclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIlxyXG5pbXBvcnQgXCIuL0hpc3RvcnlPcmRlci5zY3NzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpc3RvcnlPcmRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHtsb2dpc3RpY3NMaXN0fSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIGxldCBnZXRTdGF0dXNUZXh0ID0gKHN0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjAwXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwi5pyq6YKu5a+EXCI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMDFcIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCLlt7Llj5HotKdcIjtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIwMlwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIuW3suetvuaUtlwiO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjAzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwi6ZSZ6K+v5Lu2XCI7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3JlYXRlT3JkZXJMaXN0ID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17XCJjbGVhcmZpeFwifSBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgICAgICA8TGluayB0bz17e3BhdGhuYW1lOiBcIi9pb2dpc3RpY3NJbmZvXCIsIHNlYXJjaDogXCI/bWF0ZXJpYWxJZD1cIiArIGl0ZW0ubWF0ZXJpZWxJZH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJwbGF0ZUltZ1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInBsYXRlSW1nQm9YXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtyZXF1aXJlKFwiLi4vLi4vYXNzZXRzL2ltZ3MvcGxhdGUtaWNvbi5wbmdcIil9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wicGxhdGVTdGF0dXNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJwbGF0ZURlc2NcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtcInBsYXRlVGl0bGVcIn0+57qi5YyF56CB6LS057q4PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17XCJwbGF0ZVRpbWVcIn0+e2l0ZW0ucmVjQ3J0VHN9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJwbGF0ZVByb1wifT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtpdGVtLm1hdERlbGl2U3QgPT0gJzAxJyA/IFwicHJvSW5nIHNwZWNpYWxDb2xvclwiIDogXCJwcm9JbmdcIn0+e2dldFN0YXR1c1RleHQoaXRlbS5tYXREZWxpdlN0KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtcInJpZ2h0Um9ja2V0XCJ9Pjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICAgIDwvbGk+KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaGlzdG9yeU9yZGVyQ29udGFpblwifT5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17XCJvcmRlckluZm9cIn0+XHJcbiAgICAgICAgICAgICAgICAgICAg6K6i5Y2V5L+h5oGvXHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXtcImhpc3RvcnlPcmRlckxpc3RcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAge2xvZ2lzdGljc0xpc3QubWFwKGNyZWF0ZU9yZGVyTGlzdCl9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvSGlzdG9yeU9yZGVyL0hpc3RvcnlPcmRlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOGNmZjg2ZTFkNTFlYmYyMWY3ZlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gM2MyNGQzOGZmY2QwYzM4ZTM0Nzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0ID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpdGVyRm4gPSBnZXQoaXQpO1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDUzYjdkMzQ4MTcxNDRiMTJiMGFhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgQlJFQUsgPSB7fTtcbnZhciBSRVRVUk4gPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUikge1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSk7XG4gIHZhciBmID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmIChpc0FycmF5SXRlcihpdGVyRm4pKSBmb3IgKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOykge1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1ZTU5YjcxYjMzYTM4YzM2MThlN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmIChERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSBkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qc1xuLy8gbW9kdWxlIGlkID0gNWU3NDkxZjFmNzk5NzE1ZWFjNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkganVzdGljZSBvbiAyMDE4LzExLzEyLlxyXG4gKi9cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHtnZXRMb2dpc3RpY3NMaXN0T2ZSZWRiYWd9IGZyb20gJy4vSGlzdG9yeU9yZGVyQWN0aW9ucyc7XHJcbmltcG9ydCBIaXN0b3J5T3JkZXIgZnJvbSBcIi4vSGlzdG9yeU9yZGVyXCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tICcuLi8uLi9zdG9yZS9zdG9yZSc7XHJcbmltcG9ydCB7YmVmb3JlRW50ZXJSb3V0ZXJ9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0XCI7XHJcbmltcG9ydCB7VVBEQVRFX1NUT1JFX1NUQVRFfSBmcm9tIFwiLi4vLi4vc3RvcmUvYWN0aW9uXCI7XHJcblxyXG5jbGFzcyBIaXN0b3J5T3JkZXJDb250YWluZXJzIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGJlZm9yZUVudGVyUm91dGVyKFwi5Y6G5Y+y6K6i5Y2VXCIpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAq6L+Z5Liq5Y+C5pWw6KaBXHJcbiAgICAgICAgICogQHR5cGUge3tsb2dpc3RpY3NUcDogc3RyaW5nfX1cclxuICAgICAgICAgKi9cclxuICAgICAgICAvLyB7bG9naXN0aWNzVHA6XCIwMVwifSDmnKrpgq7lr4RcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtID0ge2xvZ2lzdGljc1RwOlwiMDJcIn07XHJcblxyXG4gICAgICAgIGdldExvZ2lzdGljc0xpc3RPZlJlZGJhZyhwYXJhbSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IEpTT04ucGFyc2UocmVzLmRhdGEubG9naXN0aWNzTGlzdCk7XHJcbiAgICAgICAgICAgIGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShpdGVtLnJlY0NydFRzKTtcclxuICAgICAgICAgICAgICAgIGxldCB5eXl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpICsgXCJcIjtcclxuICAgICAgICAgICAgICAgIGxldCBtbSA9IChkYXRlLmdldE1vbnRoKCkgKyAxKSA+PTEwID8gKGRhdGUuZ2V0TW9udGgoKSArIDEpICsgXCJcIiA6IFwiMFwiICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRkID0gZGF0ZS5nZXREYXRlKCkgPj0xMD9kYXRlLmdldERhdGUoKSArIFwiXCI6XCIwXCIgK2RhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhoID0gZGF0ZS5nZXRIb3VycygpPj0xMD9kYXRlLmdldEhvdXJzKCkgKyBcIlwiOlwiMFwiICtkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluID1kYXRlLmdldE1pbnV0ZXMoKT49MTA/ZGF0ZS5nZXRNaW51dGVzKCkgKyBcIlwiOlwiMFwiICtkYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucmVjQ3J0VHMgPSB5eXl5ICtcIi5cIisgbW0gK1wiLlwiKyBkZCtcIiBcIitoaCtcIjpcIiArbWluO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChVUERBVEVfU1RPUkVfU1RBVEUoe1xyXG4gICAgICAgICAgICAgICAgbG9naXN0aWNzTGlzdDpsaXN0XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goVVBEQVRFX1NUT1JFX1NUQVRFKHtcclxuICAgICAgICAgICAgbG9naXN0aWNzTGlzdDpbXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICByZXR1cm4gPEhpc3RvcnlPcmRlciB7Li4udGhpcy5wcm9wc30vPjtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwc3RhdGVUb1Byb3BzPShzdGF0ZSk9PntcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbG9naXN0aWNzTGlzdDogc3RhdGUuZ2V0SW4oW1wibG9naXN0aWNzTGlzdFwiXSkudG9KUygpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwc3RhdGVUb1Byb3BzKShIaXN0b3J5T3JkZXJDb250YWluZXJzKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9IaXN0b3J5T3JkZXIvSGlzdG9yeU9yZGVyQ29udGFpbmVyLmpzIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmlzSXRlcmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA2YTQ0MmFiNWJkOWJkOTI5NDQ3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvKlxyXG4gICBBUEkg5o6l5Y+j6YWN572uXHJcbiAgIGF4aW9zIOWPguiAg+aWh+aho++8mmh0dHBzOi8vd3d3LmthbmNsb3VkLmNuL3l1bnllL2F4aW9zLzIzNDg0NVxyXG5cclxuKi9cclxuLy8gaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IFRvYXN0IGZyb20gJ2FudGQtbW9iaWxlL2xpYi90b2FzdCc7XHJcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuL2NvbmZpZ1wiXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbipcclxuKiDluLjph4/lrprkuYnljLpcclxuKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgY29uc3QgVXRpbCA9IHdpbmRvdy5VUC5XLlV0aWw7XHJcblxyXG5leHBvcnQgY29uc3QgQXBwID0gVVAuVy5BcHA7XHJcblxyXG5leHBvcnQgY29uc3QgRW52ID0gVVAuVy5FbnY7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ1Bob25lID0gL14oMTNbMC05XXwxNFs1NzldfDE1WzAtMyw1LTldfDE2WzZdfDE3WzAxMzU2NzhdfDE4WzAtOV18MTlbODldKVxcZHs4fSQvO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ1BheU51bSA9IC9eWzAtOV17MjB9JC87XHJcblxyXG5leHBvcnQgY29uc3QgY29tb21QYXJhbSA9IHtcclxuICAgIHZlcnNpb246IFwiMi4wXCIsXHJcbiAgICBzb3VyY2U6IFwiMlwiXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICog6K+35rGC5qC45b+D5Yy6IOS4i+mdoui/meWdl+WMuuWfn+S4reeahOS7o+eggeaUueWKqOivt+aFjumHjVxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxubGV0IGJhc2VVcmwgPSBcIlwiLCBiYXNlVXJsMiA9IFwiXCIsIGJhc2VVcmwzID0gXCJcIjtcclxuaWYgKGxvY2F0aW9uLmhvc3RuYW1lLmluZGV4T2YoJzk1NTE2LmNvbScpICE9PSAtMSkgeyAvL+eUn+S6p+eOr+Wig1xyXG4gICAgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL3NoYW5naHUuOTU1MTYuY29tL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwyID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vbWFsbC45NTUxNi5jb20vY3FwLWludC1tYWxsLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgYmFzZVVybDMgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy95b3VodWkuOTU1MTYuY29tL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufSBlbHNlIGlmIChsb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCcxNzIuMTguMTc5LjEwJykgIT09IC0xKSB7IC8v5rWL6K+V546v5aKDXHJcbiAgICAvLyBiYXNlVXJsPVwiaHR0cDovLzE3Mi4yMS4xMDEuMjU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOyAvL+a1i+ivleWupGFwYWNoZVxyXG4gICAgLy9iYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS45NTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/lvIDlj5Hnjq/looNhcGFjaGVcclxuICAgIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjE3L3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTEveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMTMzLjI1OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufSBlbHNlIHtcclxuICAgIC8vIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjk1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjI1OjM4MjEwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjtcclxuICAgIGJhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjE3L3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTEveW91aHVpLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjEzMy4yNTozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4zMy41NjozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn1cclxuLyoqXHJcbiAqIOmAmui/h+WQjue8gOiOt+WPluacjeWKoeWZqOeahOWFqOWcsOWdgFxyXG4gKiBAcGFyYW0gdXJsXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0U2VydlVybCA9ICh1cmwpID0+IHtcclxuICAgIGxldCBzZXJ2ZXJVcmwgPSBcIlwiXHJcbiAgICBpZiAodXJsID09IENPTkZJRy5SRVNULnVzZXJJbmZvKSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gXCJcIjtcclxuICAgIH1cclxuICAgIC8vIGVsc2UgaWYgKHVybC5zcGxpdChcIi9cIilbMF0gPT0gXCJhZGRyZXNzXCIpIHtcclxuICAgIC8vICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsMlxyXG4gICAgLy8gfVxyXG4gICAgZWxzZSBpZiAodXJsLnNwbGl0KFwiL1wiKVswXSA9PSBcInNjYW5cIiB8fCB1cmwgPT0gQ09ORklHLlJFU1QuZ2V0Q2l0eSkge1xyXG4gICAgICAgIHNlcnZlclVybCA9IGJhc2VVcmwzXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNlcnZlclVybDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOagvOW8j+WMlue7k+aenCDlsIbnu5PmnpzmoLzlvI/ljJbkuLpcclxuICoge1xyXG4gKiAgICAgc3RhdHVzQ29kZSAgIOWQjuWPsOWTjeW6lOeggVxyXG4gKiAgICAgZGF0YSAgICAgICAgIOWQjuWPsOi/lOWbnueahOaVsOaNrlxyXG4gKiAgICAgbXNnICAgICAgICAgIOWQjuWPsOeahOaPkOekuuS/oeaBr1xyXG4gKiB9XHJcbiAqIEBwYXJhbSBkYXRhXHJcbiAqIEByZXR1cm5zIHt7c3RhdHVzQ29kZTogKHN0cmluZ3wqKSwgZGF0YTogKiwgbXNnOiAqfX1cclxuICovXHJcbmV4cG9ydCBjb25zdCByZXNwb25zZUZvcm1hdHRlciA9IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgcmVzID0ge1xyXG4gICAgICAgIHN0YXR1c0NvZGU6IGRhdGEucmVzcCxcclxuICAgICAgICBkYXRhOiBkYXRhLnBhcmFtcyxcclxuICAgICAgICBtc2c6IGRhdGEubXNnXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLy8g5Yig6Zmk5bqV6YOoICcvJ1xyXG5mdW5jdGlvbiBkZWxldGVTbGFzaChob3N0KSB7XHJcbiAgICByZXR1cm4gaG9zdC5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG59XHJcblxyXG4vLyDmt7vliqDlpLTpg6ggJy8nXHJcbmZ1bmN0aW9uIGFkZFNsYXNoKHBhdGgpIHtcclxuICAgIHJldHVybiAvXlxcLy8udGVzdChwYXRoKSA/IHBhdGggOiBgLyR7cGF0aH1gO1xyXG59XHJcblxyXG4vLyDop6PmnpDlj4LmlbBcclxuZnVuY3Rpb24gc2VwYXJhdGVQYXJhbXModXJsKSB7XHJcbiAgICBjb25zdCBbcGF0aCA9ICcnLCBwYXJhbXNMaW5lID0gJyddID0gdXJsLnNwbGl0KCc/Jyk7XHJcblxyXG4gICAgbGV0IHBhcmFtcyA9IHt9O1xyXG5cclxuICAgIHBhcmFtc0xpbmUuc3BsaXQoJyYnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuXHJcbiAgICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7cGF0aCwgcGFyYW1zfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdChjb25maWcpe1xyXG4gICAgbGV0IHttZXRob2QsIHVybCwgZGF0YSA9IHt9fSA9IGNvbmZpZztcclxuICAgIG1ldGhvZCA9IChtZXRob2QgJiYgbWV0aG9kLnRvVXBwZXJDYXNlKCkpIHx8ICdHRVQnO1xyXG5cclxuICAgIGxldCBzZXJ2ZXJVcmwgPSAnaHR0cDovLzEyNy4wLjAuMTozMDAwLyc7XHJcbiAgICBsZXQgZmluYWxVcmwgPSBzZXJ2ZXJVcmwgKyB1cmw7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB1cmw6ZmluYWxVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6bWV0aG9kLFxyXG4gICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gJzIwMCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2VGb3JtYXR0ZXIocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ+ivt+axguWksei0pScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGlmKCBtZXRob2QgPT09ICdQT1NUJyApe1xyXG4gICAgICAgICAgICAgb3B0aW9ucy5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgICAgICBvcHRpb25zLmRhdGFUeXBlID0gJ2pzb24nXHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5hamF4KG9wdGlvbnMpO1xyXG4gICAgfSlcclxuICAgIFxyXG59XHJcblxyXG4vLyDkuLvopoHor7fmsYLmlrnms5VcclxuLy8gZXhwb3J0ICBmdW5jdGlvbiByZXF1ZXN0T3JpZ2luKGNvbmZpZykge1xyXG5cclxuLy8gICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4vLyAgICAgY29uc3QgdWkgPSBVUC5XLlVJO1xyXG4vLyAgICAgY29uc3QgZW52ID0gVVAuVy5FbnY7XHJcblxyXG4vLyAgICAgbGV0IHttZXRob2QsIHVybCwgZGF0YSA9IHt9LCBoZWFkZXJzLCBmb3JDaHNwLCBlbmNyeXB0LCBieUFqYXgsIGNhY2hlLCB1cGRhdGUsIHN0b3JhZ2V9ID0gY29uZmlnO1xyXG5cclxuLy8gICAgIG1ldGhvZCA9IChtZXRob2QgJiYgbWV0aG9kLnRvVXBwZXJDYXNlKCkpIHx8ICdHRVQnO1xyXG5cclxuLy8gICAgIGxldCBzZXJ2ZXJVcmwgPSBnZXRTZXJ2VXJsKHVybCk7XHJcblxyXG4vLyAgICAgLy8gbGV0IHNlcnZlclVybCA9IGJhc2VVcmwgO1xyXG4vLyAgICAgLy8gaWYgKHRydWUpIHtcclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6YCa6L+H5o+S5Lu25Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKi9cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWQkeacjeWKoeWZqOWPkemAgeivt+axglxyXG4vLyAgICAgICogQHBhcmFtIHBhcmFtcyDor7fmsYLlj4LmlbBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdmVyc2lvbu+8mueJiOacrO+8jOm7mOiupOaYrzEuMFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBzb3VyY2XvvJrmnaXmupDvvIzpu5jorqTmoLnmja5BbmRyb2lk44CBaU9T6Ieq5Yqo5re75YqgXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIGVuY3J5cHTvvJrmmK/lkKbliqDlr4bvvIzpu5jorqTliqDlr4ZcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgbWV0aG9k77ya6K+35rGC5pa55rOV77yMUE9TVOaIlkdFVFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBjbWTvvJror7fmsYLlkb3ku6TvvIjkuZ/lj6/oh6rooYzlsIZjbWTnu4Too4Xoh7N1cmlb5LyY5oOg5ZCO5Y+wXeaIlnBhdGhb6ZKx5YyF5ZCO5Y+wXe+8iVxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB1cmkvcGF0aO+8muivt+axguWcsOWdgO+8jOW7uuiuruS7heWhq+WFhWNtZO+8jOS4jeW7uuiuruiHquihjOe7hOijhXVyaS9wYXRoXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHBhcmFtc++8muWPkemAgee7meWQjuWPsOeahOWPguaVsFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB2aWTvvJrlpoLmnpzpgJrov4dBamF45pa55byP5ZCRd2FsbGV05ZCO5Y+w5Y+R6YCB6K+35rGC6ZyA6KaB5pC65bimdmlkXHJcbi8vICAgICAgKiBAcGFyYW0gZm9yQ2hzcCDmmK/lkKblkJHkvJjmg6DlkI7lj7Dlj5HpgIHor7fmsYLvvIjpu5jorqTlkJHmiYvmnLrlkI7lj7Dlj5HpgIHor7fmsYLvvIlcclxuLy8gICAgICAqIEBwYXJhbSBieUFqYXgg5piv5ZCm5L2/55SoQWpheOWPkemAgeivt+axgu+8iOm7mOiupOS9v+eUqOaOp+S7tu+8iVxyXG4vLyAgICAgICogQHBhcmFtIHN1Y2Nlc3Mg5oiQ5Yqf5Zue6LCDXHJcbi8vICAgICAgKiBAcGFyYW0gZXJyb3Ig6ZSZ6K+v5Zue6LCD77yI5Lia5Yqh6ZSZ6K+v77yJXHJcbi8vICAgICAgKiBAcGFyYW0gZmFpbCDlpLHotKXlm57osIPvvIjor7fmsYLlpLHotKXvvIlcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gICAgICAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IHN1Y2Nlc3NDYWxsYmFjayA9IChkYXRhLGZ1YykgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5Tlm57miJDlip/nu5PmnpzvvJpcIilcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgcmVxID0gcmVzcG9uc2VGb3JtYXR0ZXIoZGF0YSk7XHJcbi8vICAgICAgICAgICAgICAgICBpZiggISFmdWMgKXtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXEuZnVjID0gZnVjO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXEpXHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBlcnJvckNhbGxiYWNrID0gKGVycikgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5Tlm57lpLHotKXnu5PmnpzvvJpcIilcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAodXJsID09IENPTkZJRy5SRVNULmFwcGx5TWNjIHx8IHVybCA9PSBDT05GSUcuUkVTVC5hcHBseU1hdCB8fCB1cmwgPT0gQ09ORklHLlJFU1QudG9kYXlNb25leSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCByZXEgPSByZXNwb25zZUZvcm1hdHRlcihlcnIpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVxKVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgVG9hc3QuaW5mbyhlcnIubXNnIHx8ICfmn6Xor6LkuJrliqHopoHntKDlh7rplJnvvIzor7fnqI3lkI7lho3or5XvvIEnKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IG5ldHdvcmtDYWxsYmFjayA9ICh4aHIpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIFRvYXN0LmluZm8oeGhyLm1zZyk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcblxyXG4vLyAgICAgICAgICAgICBpZiAodXJsICE9IENPTkZJRy5SRVNULmdldFRvZGF5SW5jb21lKSB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5zaG93TG9hZGluZygpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAoIWNhY2hlKSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVybDpcIiArIHVybClcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUGFyYW06XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh7XHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGVuY3J5cHQ6IGVuY3J5cHQsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgZm9yQ2hzcDogZm9yQ2hzcCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBieUFqYXg6IGJ5QWpheFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gfSlcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB6Z2e57yT5a2Y6K+35rGCXCIpXHJcbi8vICAgICAgICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2UoXHJcbi8vICAgICAgICAgICAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXJpOnNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH0sIGZvckNoc3AsIGJ5QWpheCwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBuZXR3b3JrQ2FsbGJhY2spO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDYWNoZVVybDpcIiArIHVybClcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3RvcmVhZ2XnrZbnlaXmmK86XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ1cGRhdGXlh73mlbA6XCIpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1cGRhdGUpXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWPkemAgee8k+WtmOivt+axglwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICAgICAgICAgKiDlkJHmnI3liqHlmajlj5HpgIHor7fmsYJcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBwYXJhbXMg6K+35rGC5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZlcnNpb27vvJrniYjmnKzvvIzpu5jorqTmmK8xLjBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc291cmNl77ya5p2l5rqQ77yM6buY6K6k5qC55o2uQW5kcm9pZOOAgWlPU+iHquWKqOa3u+WKoFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBlbmNyeXB077ya5piv5ZCm5Yqg5a+G77yM6buY6K6k5Yqg5a+GXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIG1ldGhvZO+8muivt+axguaWueazle+8jFBPU1TmiJZHRVRcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgY21k77ya6K+35rGC5ZG95Luk77yI5Lmf5Y+v6Ieq6KGM5bCGY21k57uE6KOF6IezdXJpW+S8mOaDoOWQjuWPsF3miJZwYXRoW+mSseWMheWQjuWPsF3vvIlcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdXJpL3BhdGjvvJror7fmsYLlnLDlnYDvvIzlu7rorq7ku4XloavlhYVjbWTvvIzkuI3lu7rorq7oh6rooYznu4Too4V1cmkvcGF0aFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBwYXJhbXPvvJrlj5HpgIHnu5nlkI7lj7DnmoTlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmlk77ya5aaC5p6c6YCa6L+HQWpheOaWueW8j+WQkXdhbGxldOWQjuWPsOWPkemAgeivt+axgumcgOimgeaQuuW4pnZpZFxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGZvckNoc3Ag5piv5ZCm5ZCR5LyY5oOg5ZCO5Y+w5Y+R6YCB6K+35rGC77yI6buY6K6k5ZCR5omL5py65ZCO5Y+w5Y+R6YCB6K+35rGC77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gYnlBamF4IOaYr+WQpuS9v+eUqEFqYXjlj5HpgIHor7fmsYLvvIjpu5jorqTkvb/nlKjmjqfku7bvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBzdWNjZXNzIOaIkOWKn+Wbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGVycm9yIOmUmeivr+Wbnuiwg++8iOS4muWKoemUmeivr++8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGZhaWwg5aSx6LSl5Zue6LCD77yI6K+35rGC5aSx6LSl77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gdXBkYXRlIOW8guatpeWIt+aWsOWbnuiwgyDlpoLmnpzorr7nva5hc3luY+S4unRydWXlkI7lj6/ku6Xmt7vliqB1cGRhdGXlm57osIMg5aaC5p6c5LiN5aGr5YaZ6buY6K6k5Lulc3VjY2Vzc+i/m+ihjOWkhOeQhlxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHN0b3JhZ2Ug57yT5a2Y5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIG5lZWRTdyAgICAgICAgICAgIC8v6buY6K6kZmFsc2XlpKfpg6jliIbnlKjnmoTmmK/mj5Lku7bpnIDopoHnmoTmiYvliqjljrvliqBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc3RvcmFnZVR5cGUgICAgICAvL+m7mOiupOS9v+eUqGxvY2Fsc3RvcmFnZVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBhc3luYyAgICAgICAgICAgIC8v6buY6K6k6I635Y+W57yT5a2Y5ZCO5LiN5Y+R6K+35rGC77yM5pS55Li6dHJ1ZeWQjuS8muW8guatpeWOu+ivt+axguWQjuWPsOW5tuWIt+aWsOaVsOaNrlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBlbmRPZlN5bmNGdW5jICAgIC8vdG9kbyDph43opoHvvIHvvIHvvIHvvIHlm57osIPkuK3lpoLmnpzlrZjlnKjlvILmraXvvIjmj5Lku7bnrYnvvInpnIDopoHmoIfmmI7lvILmraXnirbmgIHkuLp0cnVlXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZhbGlkYXRlVGltZSAgICAgLy/mnInmlYjmnJ/pu5jorqTml6DpmZDmnInmlYjmnJ8g5Y2V5L2N5q+r56eSXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVXaXRoSWQgICAgICAgLy/pu5jorqR0cnVl5Lul55So5oi3aWTov5vooYzlrZjlgqjlkKbliJlmYWxzZeS7pWxvY2Fs5a2Y5YKoXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVTdWNjICAgICAgICAgLy/kv53lrZjmiJDlip/lkI7nmoTlm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZUVyciAgICAgICAgICAvL+S/neWtmOWksei0peWQjueahOWbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICByb2xsS2V5ICAgICAgICAgIC8v5by65Yi26K6+572u5Li76ZSuXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNlY29uZEtleSAgICAgICAgLy/lvLrliLborr7nva7mrKHopoHplK7lgLxcclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOmHjeimgeivtOaYjiDosIPnlKjlvILmraXmqKHlvI/vvIhhc3luY+iuvue9ruS4unRydWXvvInlkI7lj6/og73lnKhzdWNjZXNz5Zue6LCD6YeM5a2Y5Zyo5byC5q2l5pON5L2c77yM6K+l5oOF5Ya15LiL5Zue5a+86Ie057yT5a2Y55qE5Zue6LCD5Y+v6IO9XHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDmnKrmiafooYzlrozmiJDvvIzor7fmsYLnmoTlm57osIPlj4jlvIDlp4vmiafooYzkuobnmoTmg4XlhrXvvIzmiYDku6XmiJHku6znu5/kuIDlnKhzdWNjZXNz5Zue6LCD5ZKMdXBkYXRl5Zue6LCD55qE5YWl5Y+C5aKe5Yqg5LqG56ys5LqM5Liq5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDnlKjkuo7lhbzlrrnlm57osIPlhoXljIXlkKvlvILmraXnmoTnirblhrXvvIzkvb/nlKjmlrnms5XkuLrvvJrpppblhYjorr7nva5lbmRPZlN5bmNGdW5j5Y+C5pWw5Li6dHJ1ZSzlhbbmrKFzdWNjZXNz5ZKMdXBkYXRl5ZueXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDosIPlhoXkvJrmnIky5Liq5YWl5Y+C77yMc3VjY2Vzc++8iHJlc3DvvIxmdWPvvInvvIzor7flnKjku6PnoIHpl63ljIXlpITkvb/nlKhmdWMuZW5kT2ZGdW5jKClcclxuLy8gICAgICAgICAgICAgICAgICAqL1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIGxldCBwYXJhbSA9IHt9XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmIChieUFqYXgpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwYXJhbSA9IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IFwibGlmZS9saWZlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwYXJhbSA9IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVyaTpzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlV2l0aFN0b3JhZ2UocGFyYW0sIGZvckNoc3AsIGJ5QWpheCwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBuZXR3b3JrQ2FsbGJhY2ssIHN0b3JhZ2UsIHVwZGF0ZSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgfSlcclxuLy8gICAgIH0pXHJcblxyXG5cclxuLy8gICAgIC8vIH1cclxuLy8gICAgIC8vIGVsc2Uge1xyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6YCa6L+HQWpheCDlj5HpgIHor7fmsYJcclxuLy8gICAgICAqL1xyXG4vLyAgICAgLy8gcmV0dXJuIGF4aW9zKHtcclxuLy8gICAgIC8vICAgICB1cmw6IGJhc2VVcmwgKyB1cmwsXHJcbi8vICAgICAvLyAgICAgbWV0aG9kLFxyXG4vLyAgICAgLy8gICAgIGhlYWRlcnMsXHJcbi8vICAgICAvLyAgICAgZGF0YTogbWV0aG9kID09PSAnR0VUJyA/IHVuZGVmaW5lZCA6IGRhdGEsXHJcbi8vICAgICAvLyAgICAgcGFyYW1zOiBPYmplY3QuYXNzaWduKG1ldGhvZCA9PT0gJ0dFVCcgPyBkYXRhIDoge30sIHBhcmFtcylcclxuLy8gICAgIC8vIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbi8vICAgICAvL1xyXG4vLyAgICAgLy8gICAgIGxldCByZXEgPSB7XHJcbi8vICAgICAvLyAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLmRhdGEucmVzcCxcclxuLy8gICAgIC8vICAgICAgICAgZGF0YTogcmVzcG9uc2UuZGF0YS5wYXJhbXNcclxuLy8gICAgIC8vICAgICB9XHJcbi8vICAgICAvLyAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXEpXHJcbi8vICAgICAvLyB9KS5jYXRjaChlcnIgPT4ge1xyXG4vLyAgICAgLy8gICAgIC8vIOivt+axguWHuumUmVxyXG4vLyAgICAgLy8gICAgIFRvYXN0LmluZm8oJ3JlcXVlc3QgZXJyb3IsIEhUVFAgQ09ERTogJyArIGVyci5yZXNwb25zZS5zdGF0dXMpO1xyXG4vLyAgICAgLy8gICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xyXG4vLyAgICAgLy8gfSk7XHJcbi8vICAgICAvLyB9XHJcblxyXG4vLyB9XHJcblxyXG4vLyDkuIDkupvluLjnlKjnmoTor7fmsYLmlrnms5VcclxuZXhwb3J0IGNvbnN0IGdldCA9ICh1cmwsIGRhdGEsIHBhcmFtID0ge30pID0+IHtcclxuICAgIGxldCBwYXJhbUFsbCA9IE9iamVjdC5hc3NpZ24oe2ZvckNoc3A6IHRydWUsIGVuY3J5cHQ6IHRydWUsIGNhY2hlOiBmYWxzZSwgYnlBamF4OiBmYWxzZX0sIHBhcmFtKTtcclxuICAgIHJldHVybiByZXF1ZXN0KE9iamVjdC5hc3NpZ24oe3VybCwgZGF0YX0sIHBhcmFtQWxsKSlcclxufTtcclxuZXhwb3J0IGNvbnN0IHBvc3QgPSAodXJsLCBkYXRhLCBwYXJhbSA9IHt9KSA9PiB7XHJcbiAgICBsZXQgcGFyYW1BbGwgPSBPYmplY3QuYXNzaWduKHtmb3JDaHNwOiB0cnVlLCBlbmNyeXB0OiB0cnVlLCBjYWNoZTogZmFsc2UsIGJ5QWpheDogZmFsc2V9LCBwYXJhbSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdChPYmplY3QuYXNzaWduKHttZXRob2Q6ICdQT1NUJywgdXJsLCBkYXRhfSwgcGFyYW1BbGwpKVxyXG59O1xyXG5leHBvcnQgY29uc3QgcHV0ID0gKHVybCwgZGF0YSkgPT4gcmVxdWVzdCh7bWV0aG9kOiAnUFVUJywgdXJsLCBkYXRhfSk7XHJcbmV4cG9ydCBjb25zdCBkZWwgPSAodXJsLCBkYXRhKSA9PiByZXF1ZXN0KHttZXRob2Q6ICdERUxFVEUnLCB1cmwsIGRhdGF9KTtcclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiDlip/og73lh73mlbDljLpcclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiDlsIZVUkzkuK3nmoRzZWFyY2gg5a2X56ym5LiyIOi9rOaNouaIkCDlr7nosaFcclxuICogQHBhcmFtIHNlYXJjaFxyXG4gKiBAcmV0dXJucyB7e319XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0U2VhcmNoUGFyYW0gPSAoc2VhcmNoKSA9PiB7XHJcbiAgICBpZiAoISFzZWFyY2gpIHtcclxuICAgICAgICBsZXQgc3RyID0gc2VhcmNoLnNsaWNlKDEpO1xyXG4gICAgICAgIGxldCBhcnJheSA9IHN0ci5zcGxpdChcIiZcIik7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtID0gaXRlbS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgICAgIG9ialtwYXJhbVswXV0gPSBwYXJhbVsxXTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiBjb2RvdmEg5o+S5Lu26LCD55So5Yy6XHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuXHJcbi8vIOWQr+WBnOaUtuasvueggVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0WGlhb1dlaVBheShwYXJhbSwgc3VjLCBlcnIpIHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnNldFhpYW9XZWlQYXkocGFyYW0sIHN1YywgZXJyKTtcclxufVxyXG5cclxuLy/lsI/lvq5hdWRpb1xyXG5leHBvcnQgY29uc3Qgc2V0WGlhb1dlaUF1ZGlvID0gKHBhcmFtLCBzdWMsIGVycikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuc2V0WGlhb1dlaUF1ZGlvKHBhcmFtLCBzdWMsIGVycik7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGdldFhpYW9XZWlBdWRpbyA9IChzdWMsIGVycikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuZ2V0WGlhb1dlaUF1ZGlvKHN1YywgZXJyKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRvYXN0ID0gKG1zKSA9PiB7XHJcbiAgICBUb2FzdC5pbmZvKG1zLCAyKTtcclxufVxyXG4vKipcclxuICog6K6+572u6aG26YOoYmFyXHJcbiAqIEBwYXJhbSB0aXRsZSDpobXpnaLlkI3np7BcclxuICogQHBhcmFtIHJpZ2h0QmFyIOWPs+S+p+aMiemSruWQjeensFxyXG4gKiBAcGFyYW0gcmlnaHRDYWxsYmFjayDlj7PkvqfmjInpkq7lm57osINcclxuICogQHBhcmFtIHJpZ2h0QmFySW1nIOWPs+S+p+aMiemSruWbvueJh1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGJlZm9yZUVudGVyUm91dGVyID0gKHRpdGxlID0gXCJcIiwgcmlnaHRCYXIgPSBcIlwiLCByaWdodENhbGxiYWNrID0gbnVsbCwgcmlnaHRCYXJJbWcgPSBudWxsKSA9PiB7XHJcbiAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJUaXRsZSh0aXRsZSlcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7nqpflj6Plj7PkvqfmjInpkq5cclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGUg5Zu+5qCH5qCH6aKYXHJcbiAgICAgICAgICogQHBhcmFtIGltYWdlIOWbvuagh+aWh+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSBoYW5kbGVyIOeCueWHu+Wbnuiwg+WHveaVsFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmICghIXJpZ2h0Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJSaWdodEJ1dHRvbihyaWdodEJhciwgcmlnaHRCYXJJbWcsIHJpZ2h0Q2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uKFwiXCIsIG51bGwsIG51bGwpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICog6YCa55+l5a6i5oi356uv5L+u5pS554q25oCBXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWNjU3RhdGVDaGFuZ2VkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLm1jY1N0YXRlQ2hhbmdlZCgpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2VuZFFyQ29kZSA9IChwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaJq+aPj+adoeeggeWSjOS6jOe7tOeggVxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXNcclxuICAgICAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICAgICAqIEBwYXJhbSBmYWlsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLnNjYW5RUkNvZGUocGFyYW1zLCBzdWNjZXNzLCBmYWlsKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNsb3NlV2ViVmlldyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmNsb3NlV2ViVmlldygpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdmVyaWZ5UGF5UHdkID0gKHBhcmFtLCBzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC52ZXJpZnlQYXlQd2QocGFyYW0sIHN1Y2Nlc3MsIGZhaWwpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlV2ViVmlldyA9ICh1cmwsIHBhcmFtcyA9IG51bGwsIHRpdGxlID0gJycsIGlzRmluaXNoID0gXCIxXCIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmNyZWF0ZVdlYlZpZXcodXJsLCBwYXJhbXMsIHRpdGxlLCBpc0ZpbmlzaClcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VXNlckRldGFpbEluZm8gPSAoc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLmdldFVzZXJEZXRhaWxJbmZvKHN1Y2Nlc3MsIGZhaWwpXHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDlsIZjYXZhcyDkv53lrZjliLDmnKzlnLDnm7jlhoxcclxuICogQHBhcmFtIGNhbnZhc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNhdmVRY29kZSA9IChjYW52YXMpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIHVpID0gVVAuVy5VSSB8fCB7fTtcclxuICAgIHZhciBwaWNVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYXBwLmxvZ0V2ZW50KCdzYXZlUGljdHVyZV9OZXdZZWFyQWN0Jyk7XHJcbiAgICAgICAgYXBwLnNhdmVQaWNUb0xvY2FsKHtcclxuICAgICAgICAgICAgdXJsOiBwaWNVcmwgJiYgcGljVXJsLnN1YnN0cigyMilcclxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHVpLnNob3dUb2FzdFdpdGhQaWMoJ+W3suS/neWtmOWIsOezu+e7n+ebuOWGjCcpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9PSAndXBkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd0FsZXJ0KCfor7fljYfnuqfliLDmnIDmlrDlrqLmiLfnq68nLCBmdW5jdGlvbiAoKSB7IC8vIOWOu+WNh+e6p1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnWWVzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnYuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS9jbi9hcHAvaWQ2MDAyNzM5Mjg/Y29kZT1uZXdZZWFyQWN0aXZpdHknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL3lvdWh1aS45NTUxNi5jb20vYXBwL2FwcC9zb2Z0d2FyZS91bmlvbnBheS13YWxsZXQtdjIuYXBrP2NvZGU9bmV3WWVhckFjdGl2aXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhcHAub3BlbkJyb3dzZXIodXJsKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ05vJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAn6ams5LiK5Y2H57qnJywgJ+eojeWQjuWGjeivtCcsICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dUb2FzdChtc2cgfHwgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzaGFyZSA9ICh0aXRsZSwgZGVzYywgaW1nVVJMLCBwYWdlVVJsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciBlbnYgPSBVUC5XLkVudiB8fCB7fTtcclxuXHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaYvuekuuWIhuS6q+mdouadv1xyXG4gICAgICAgICAqIOWmguaenOaJgOaciea4oOmBk+S9v+eUqOebuOWQjOeahOWIhuS6q+WGheWuueWImeS7heWhq+WGmXBhcmFtc+WNs+WPr++8jFxyXG4gICAgICAgICAqIOWmguaenOmcgOimgeagueaNruS4jeWQjOa4oOmBk+WumuWItuWIhuS6q+WGheWuue+8jOWImeWPr3BhcmFtc+eVmeepuu+8jOWcqHNoYXJlQ2FsbGJhY2vkuK3ov5Tlm57mjIflrprmuKDpgZPnmoTliIbkuqvlhoXlrrlcclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zIOWIhuS6q+WPguaVsFxyXG4gICAgICAgICAqICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICB0aXRsZe+8miDliIbkuqvmoIfpophcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGRlc2M6IOWIhuS6q+aRmOimgVxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgcGljVXJs77ya5YiG5Lqr5Zu+5qCHXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBzaGFyZVVybO+8muivpuaDheWcsOWdgFxyXG4gICAgICAgICAqICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICogQHBhcmFtIHNoYXJlQ2FsbGJhY2sg5YiG5Lqr5pe25Zue6LCDXHJcbiAgICAgICAgICogICAgICAgICAgICAgIGNoYW5uZWzvvJp7XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAw77ya55+t5L+hXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAx77ya5paw5rWq5b6u5Y2aXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAz77ya5b6u5L+h5aW95Y+LXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA077ya5b6u5L+h5pyL5Y+L5ZyIXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA177yaUVHlpb3lj4tcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDbvvJpRUeepuumXtFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgN++8muWkjeWItumTvuaOpVxyXG4gICAgICAgICAqICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICogICAgICAgICAgICAgIGRhdGE6IOm7mOiupOWIhuS6q+aVsOaNrlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5zaG93U2hhcmVQYW5lbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgZGVzYzogZGVzYyxcclxuICAgICAgICAgICAgcGljVXJsOiBpbWdVUkwsXHJcbiAgICAgICAgICAgIHNoYXJlVXJsOiBwYWdlVVJsICAvLyB0b2RvIOaZrumAmuWIhuS6q1xyXG4gICAgICAgIH0sIG51bGwpXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueUqOaIt+eahOWumuS9je+8jOmmluWFiOmAmui/h0dQUyDlrprkvY3vvIzlpoLmnpzlrprkvY3lpLHotKXvvIzpgJrov4fmjqXlj6NnZXRDaXR5LOWIqeeUqElQ5Zyw5Z2A6L+b6KGM5a6a5L2N77yM5aaC5p6c6L+Y5piv5aSx6LSl77yM6YCa6L+H5o+S5Lu26I635Y+W5a6i5oi356uv5bem5LiK6KeS55qE5Z+O5biC5L+h5oGv77yM5L6d54S25aSx6LSl6buY6K6k56m/Y2l0eUNkOjMxMDAwMCDku6PooajkuIrmtbfluIJcclxuICogQHBhcmFtIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudExvY2F0aW9uSW5mbyA9IChjYWxsYmFjazIpID0+IHtcclxuICAgIGNvbnN0IHVpID0gVVAuVy5VSTtcclxuICAgIHVpLnNob3dMb2FkaW5nKCk7XHJcbiAgICBsZXQgY2FsbGJhY2sgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgIHVpLmRpc21pc3MoKTtcclxuICAgICAgICBjYWxsYmFjazIoZGF0YSlcclxuICAgIH1cclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFwcC5nZXRDdXJyZW50TG9jYXRpb25JbmZvKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGFsZXJ0KEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjbWQ6IFwiL1wiICsgQ09ORklHLlJFU1QuZ2V0Q2l0eSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwYXRoOiBcImh0dHA6Ly8xNzIuMjEuMzMuNTY6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiK0NPTkZJRy5SRVNULmdldENpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb246IFwiMi4wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogXCIyXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEucGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEucGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaE5hdGl2ZURhdGEoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoTmF0aXZlRGF0YShjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hOYXRpdmVEYXRhID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5a6i5oi356uv5L+h5oGvXHJcbiAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3NcclxuICAgICAgICAgKiBAcGFyYW0gZmFpbFxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIDDvvJrln47luILkv6Hmga9jaXR5Q2TvvJsx77ya57uP57qs5bqm77ybNe+8mlVzZXJJZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5mZXRjaE5hdGl2ZURhdGEoMCwgKGRhdGEgPSB7fSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICAgICAgY2l0eUNkOiBcIjMxMDAwMFwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNhdmVQaWNUb0xvY2FsID0gKGNhbnZhcywgcmVzb2x2ZSkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgdWkgPSBVUC5XLlVJIHx8IHt9O1xyXG4gICAgdmFyIHBpY1VybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuc2F2ZVBpY1RvTG9jYWwoe1xyXG4gICAgICAgICAgICB1cmw6IHBpY1VybCAmJiBwaWNVcmwuc3Vic3RyKDIyKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgLy/miJDlip9cclxuICAgICAgICAgICAgISFyZXNvbHZlICYmIHJlc29sdmUoXCJzdWNjZXNzXCIpO1xyXG4gICAgICAgIH0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9PSAndXBkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd0FsZXJ0KCfor7fljYfnuqfliLDmnIDmlrDlrqLmiLfnq68nLCBmdW5jdGlvbiAoKSB7IC8vIOWOu+WNh+e6p1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnWWVzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnYuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS9jbi9hcHAvaWQ2MDAyNzM5Mjg/Y29kZT1uZXdZZWFyQWN0aXZpdHknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL3lvdWh1aS45NTUxNi5jb20vYXBwL2FwcC9zb2Z0d2FyZS91bmlvbnBheS13YWxsZXQtdjIuYXBrP2NvZGU9bmV3WWVhckFjdGl2aXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhcHAub3BlbkJyb3dzZXIodXJsKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ05vJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAn6ams5LiK5Y2H57qnJywgJ+eojeWQjuWGjeivtCcsICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICEhcmVzb2x2ZSAmJiByZXNvbHZlKFwiZmFpbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRleHRDYW52YXNlID0gKHRleHQsIGNvbG9yLCBsb25nID0gNjg0LCBzaG90ID0gNjApID0+IHtcclxuXHJcbiAgICBsZXQgcmVtMnB4ID0gKHZhbCkgPT4ge1xyXG4gICAgICAgIHZhciBjV2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcclxuICAgICAgICByZXR1cm4gdmFsICogY1dpZHRoIC8gNzUwXHJcbiAgICB9XHJcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHRDYW52YXMnKTtcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICAvL+ioree9rueVq+S9iOeahOWvrOmrmFxyXG4gICAgLy8gdmFyIGJnV2lkdGggPSByZW0ycHgobG9uZyk7XHJcbiAgICAvLyB2YXIgYmdIZWlnaHQgPSByZW0ycHgoc2hvdCk7XHJcblxyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzaG90KTtcclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGxvbmcpO1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIGN0eC5yb3RhdGUoLTkwICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICB2YXIgdGV4dCA9IHRleHQ7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xyXG4gICAgbGV0IGZvbnRTaXplID0gc2hvdDtcclxuICAgIGN0eC5mb250ID0gZm9udFNpemUgKyAncHggQWlyYWwnO1xyXG4gICAgd2hpbGUgKGN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCA+IGxvbmcpIHtcclxuICAgICAgICBmb250U2l6ZS0tO1xyXG4gICAgICAgIGN0eC5mb250ID0gZm9udFNpemUgKyAncHggQWlyYWwnO1xyXG4gICAgfVxyXG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIC1sb25nLCBmb250U2l6ZSk7XHJcbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDnlJ/miJDlm77niYflubbkv53lrZjliLDnm7jlhoxcclxuICogQHBhcmFtIGJndXJsIOiDjOaZr+WbvueJh+eahOWcsOWdgFxyXG4gKiBAcGFyYW0gcXJjb2RlVVJMIOS6jOe7tOeggeeahOWcsOWdgFxyXG4gKiBAcGFyYW0gcXJjb2RlV2RBbmRIZyDkuoznu7TnoIHnmoTlrr3luqZcclxuICogQHBhcmFtIHhXaWR0aCDkuoznu7TnoIHot53nprvlt6bkuIrop5LnmoQg4oaSIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0geUhlaWdodCDkuoznu7TnoIHot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0gdGV4dGJnVVJMIOWKoOWFpeeUu+W4g+eahOWbvueJh+eahFVSTFxyXG4gKiBAcGFyYW0geFRleHRXaWR0aCDliqDlhaXnlLvluIPnmoTlm77niYfot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKiBAcGFyYW0geVRleHRIZWlnaHQg5Yqg5YWl55S75biD55qE5Zu+54mH6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlQ29udmFzQW5kU2F2ZVBob3RvID0gKGNhbnZhc09iaiwgcmVzb2x2ZSkgPT4ge1xyXG4gICAgbGV0IHtiZ3VybCwgcXJjb2RlVVJMLCBxcmNvZGVXZEFuZEhnLCB4V2lkdGgsIHlIZWlnaHQsIHRleHRiZ1VSTCwgeFRleHRXaWR0aCwgeVRleHRIZWlnaHR9ID0gY2FudmFzT2JqO1xyXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tb25DYW52YXNXcmFwcGVyJyk7XHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOeUu+W4g+WGheWuuVxyXG4gICAgICovXHJcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMud2lkdGhcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5zcmMgPSBiZ3VybDtcclxuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8v6Kit572u55Wr5L2I55qE5a+s6auYXHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBpbWcud2lkdGgpO1xyXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGltZy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAvL+WcqOeVq+W4g+S4iueVq+iDjOaZr+WcllxyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcclxuXHJcbiAgICAgICAgaWYgKCEhdGV4dGJnVVJMKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0VXJpID0gdGV4dGJnVVJMO1xyXG4gICAgICAgICAgICB2YXIgdGV4dEltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICB0ZXh0SW1nLnNyYyA9IHRleHRVcmk7XHJcbiAgICAgICAgICAgIHRleHRJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0ZXh0SW1nLCB4VGV4dFdpZHRoLCB5VGV4dEhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5LqM57at56K85ZyW54mH5aSn5bCPXHJcbiAgICAgICAgdmFyIHFyY29kZVdpZHRoQW5kSGVpZ2h0ID0gcXJjb2RlV2RBbmRIZztcclxuICAgICAgICAvL+a4hemZpOS6jOe7tOeggVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdmFyIHFyY29kZSA9IG5ldyBRUkNvZGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIiksIHtcclxuICAgICAgICAgICAgdGV4dDogcXJjb2RlVVJMLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHFyY29kZVdpZHRoQW5kSGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogcXJjb2RlV2lkdGhBbmRIZWlnaHQsXHJcbiAgICAgICAgICAgIGNvcnJlY3RMZXZlbDogUVJDb2RlLkNvcnJlY3RMZXZlbC5MXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHFyY29kZUltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXTtcclxuICAgICAgICBxcmNvZGVJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+eVq+S6jOe2reeivOeahOWclueJh1xyXG4gICAgICAgICAgICBsZXQgcXJjb2RlRHggPSB4V2lkdGgsIHFyY29kZUR5ID0geUhlaWdodDtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShxcmNvZGVJbWcsIHFyY29kZUR4LCBxcmNvZGVEeSk7XHJcbiAgICAgICAgICAgIC8vIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgc2F2ZVBpY1RvTG9jYWwoY2FudmFzLCByZXNvbHZlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL3JlcXVlc3QuanMiLCJjb25zdCBjb25maWcgPSB7XHJcbiAgICBSRVNUOiB7XHJcbiAgICAgICAgYXBwbHlNY2M6IFwiY29sbGVjdGlvbkNvZGUvYXBwbHlNY2NcIiwgLy8yLjQuNOeUs+ivt+aUtuasvueggeaOpeWPo1xyXG4gICAgICAgIGdldE1jY0NhcmRMaXN0OiBcImNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCIsIC8vMi40LjLllYbmiLfmlLbmrL7noIHljaHliJfooajmjqXlj6NcclxuICAgICAgICBhcHBseU1hdDogXCJjb2xsZWN0aW9uQ29kZS9hcHBseU1hdFwiLCAvL+eUs+ivt+eJqeaWmeaOpeWPo1xyXG4gICAgICAgIGdldE1jaG50QW5kQXJlYUluZjogXCJtY2hudC9nZXRNY2hudEFuZEFyZWFJbmYuc2pzb25cIiwgLy/llYbmiLfnsbvlnovlj4rlnLDljLrliJfooajmn6Xor6JcclxuICAgICAgICB1cGdyYWRlTWNjOiBcImNvbGxlY3Rpb25Db2RlL3VwZ3JhZGVNY2NcIiwgLy8yLjQuNuWNh+e6p+aUtuasvueggeaOpeWPoyxcclxuICAgICAgICBnZXRBZGRyTGlzdDogXCJhZGRyZXNzL2dldEFkZHJMaXN0XCIgLCAvLzIuNC4xMyDojrflj5bmlLbotKflnLDlnYDliJfooahcclxuICAgICAgICBkZWxldGVBZGRyZXNzOiBcImFkZHJlc3MvZGVsZXRlQWRkcmVzc1wiICwgLy8yLjQuMTIg5Yig6Zmk5pS26LSn5Zyw5Z2AXHJcbiAgICAgICAgZWRpdEFkZHJlc3M6IFwiYWRkcmVzcy9lZGl0QWRkcmVzc1wiLCAvLzIuNC4xMSDkv67mlLnmlLbotKflnLDlnYAsXHJcbiAgICAgICAgbmV3QWRkcmVzczogXCJhZGRyZXNzL25ld0FkZHJlc3NcIiwgLy8yLjQuMTAg5paw5aKe5pS26LSn5Zyw5Z2AXHJcbiAgICAgICAgbWNobnRPcGVyIDpcIm1jaG50L21jaG50T3BlclwiLCAvLzIuMi4yIOW6l+mTuuS/oeaBr+abtOaWsFxyXG4gICAgICAgIGdldExpbWl0QXRJbmZvOlwibWNobnQvZ2V0TGltaXRBdEluZm9cIiwgLy/ojrflj5bmlLbmrL7pmZDpop1cclxuICAgICAgICBzZXRNY2NPbk9mZjpcImNvbGxlY3Rpb25Db2RlL3NldE1jY09uT2ZmXCIsIC8v5YGc5q2i5ZKM5ZCv55So5LuY5qy+56CB5YCf5Y+jXHJcbiAgICAgICAgZ2V0TWNobnREZXRhaWw6XCJtY2hudC9tY2hudERldGFpbFwiLCAvLzIuMi4xIOiOt+WPluW6l+mTuuivpuaDhemhtemdolxyXG4gICAgICAgIC8vIHVwZ3JhZGVNY2M6IFwiY29sbGVjdGlvbkNvZGUvdXBncmFkZU1jY1wiLCAvLzIuNC425Y2H57qn5pS25qy+56CB5o6l5Y+jXHJcbiAgICAgICAgZ2V0VG9kYXlUcmFuczpcInRyYW4vZ2V0VG9kYXlUcmFuc1wiLC8vMi4xLjMvL+S7iuaXpeiuouWNleaOpeWPo1xyXG4gICAgICAgIGdldFRvZGF5SW5jb21lOlwidHJhbi9nZXRUb2RheUluY29tZVwiLC8vMi4xLjHllYbmiLfmnI3liqHpppbpobXku4rml6XmlLbmrL7mjqXlj6N+fn5+fn5+flxyXG4gICAgICAgIGdldEhpc3RvcnlJbmNvbWU6XCJ0cmFuL2dldEhpc3RvcnlJbmNvbWVcIiwvLzIuMS4y5Y6G5Y+y5pS25qy+5o6l5Y+jXHJcbiAgICAgICAgZ2V0SGlzdG9yeVRyYW5zOlwidHJhbi9nZXRIaXN0b3J5VHJhbnNcIiwvLzIuMS405Y6G5Y+y6K6i5Y2V5o6l5Y+jXHJcbiAgICAgICAgZ2V0TG9naXN0aWNzU3Q6XCJtYXRlcmllbC9nZXRMb2dpc3RpY3NTdFwiLC8vMi4zLjPnianmtYHor6bmg4XmjqXlj6Pmn6Xor6JcclxuICAgICAgICBnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtOlwidHJhbi9nZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtXCIsLy8yLjEuNeWNleeslOiuouWNleafpeivouaOpeWPo1xyXG4gICAgICAgIGdldEF1ZGl0SW5mbzpcImNvbGxlY3Rpb25Db2RlL2dldEF1ZGl0SW5mb1wiLC8vMi40LjE05L+h55So5Y2h5Y2H57qn5a6h5qC457uT5p6c5p+l6K+iXHJcbiAgICAgICAgdXBkYXRlTWNjQ2FyZDpcImNvbGxlY3Rpb25Db2RlL3VwZGF0ZU1jY0NhcmRcIiwvLzIuNC455pu05o2i5pS25qy+5Y2h5o6l5Y+jXHJcbiAgICAgICAgZ2V0VXBncmFkZVN0OlwibWNobnQvZ2V0VXBncmFkZVN0XCIsLy/mn6Xor6LllYbmiLfmmK/lkKbljYfnuqfkv6HnlKjljaHmlLbmrL5cclxuICAgICAgICBnZXRNY2NUcmFuc051bTonY29sbGVjdGlvbkNvZGUvZ2V0TWNjVHJhbnNOdW0nLC8v6I635Y+W6LCD5Y+W5pSv5LuY5o6n5Lu255qEVE7lj7dcclxuICAgICAgICBnZXRNYXRlcmllbEluZm9MaXN0OlwiY29sbGVjdGlvbkNvZGUvZ2V0TWF0ZXJpZWxJbmZvTGlzdFwiLC8vMi40LjPnianmlpnkv6Hmga/liJfooajmjqXlj6NcclxuICAgICAgICB1c2VySW5mbzpcIi9hcHAvaW5BcHAvdXNlci9nZXRcIiwvL+iOt+WPlueUqOaIt+S/oeaBr1xyXG4gICAgICAgIGlzQmxhY2s6XCJzY2FuL2lzQmxhY2tcIiwvLzIuMS415pS26ZO25ZGY5piv5ZCm5Zyo6buR5ZCN5Y2VXHJcbiAgICAgICAgaXNBcHBseTpcInNjYW4vaXNBcHBseVwiLC8vMi4xLjTmmK/lkKblt7Lnu4/nlLPor7fnuqLljIXnoIFcclxuICAgICAgICBzaGFyZUxpbms6XCJzY2FuL3NoYXJlTGlua1wiLC8vMi4xLjbnlJ/miJDnuqLljIXnoIHpk77mjqVcclxuICAgICAgICByZWNtZFJlY29yZDpcInNjYW4vcmVjbWRSZWNvcmRcIiwvL+aOqOiNkOWFs+ezu+iusOW9lVxyXG4gICAgICAgIGdldExvZ2lzdGljc0xpc3Q6XCJtYXRlcmllbC9nZXRMb2dpc3RpY3NMaXN0XCIsLy/ojrflj5bnianmlpnljoblj7LorqLljZVcclxuICAgICAgICBnZXRSZXdhcmRMaXN0Olwic2Nhbi9nZXRSZXdhcmRMaXN0XCIsLy8yLjEuN+afpeivouaUtumTtuWRmOi1j+mHkeaYjue7huiusOW9lVxyXG4gICAgICAgIGdldFByb3RvY29sSW5mbzpcImNvbGxlY3Rpb25Db2RlL2dldFByb3RvY29sSW5mb1wiLC8v5ZWG5oi35Y2H57qn5p+l6K+i5pi+56S65Y2P6K6u55qE5ZCN56ew5ZKM5Y2P6K6u55qE5Zyw5Z2AXHJcbiAgICAgICAgZ2V0Q2l0eTpcInJlZ2lvbi9nZXRDaXR5XCIsLy/pgJrov4dJUOWcsOWdgOiOt+WPluWcsOWdgOWumuS9jVxyXG4gICAgICAgIGdldFFyVXJsOlwiY29sbGVjdGlvbkNvZGUvZ2V0UXJJbmZvXCIvLzIuMS4x6I635Y+W55So5oi35pS25qy+56CBVVJMXHJcbiAgICB9LFxyXG4gICAgU1RBVFVTQ09ERToge1xyXG4gICAgICAgIFNVQ0NFU1M6XCIwMFwiXHJcbiAgICB9LFxyXG4gICAgQ09OU1RfREFUQTp7XHJcbiAgICAgICAgaW1nZVNpemU6XCIzMDBcIlxyXG4gICAgfSxcclxuICAgIENBQ0hFS0VZOntcclxuICAgICAgICBnZXRNY2NDYXJkTGlzdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLWNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVXBkYXRlQ3JlZGl0Q29sbGVjdE1vbmV5U3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1tY2hudC9nZXRVcGdyYWRlU3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1tY2hudC9nZXRVcGdyYWRlU3RcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0TWNobnREZXRhaWw6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1tY2hudC9tY2hudERldGFpbFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLW1jaG50L21jaG50RGV0YWlsXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzQXBwbHk6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1zY2FuL2lzQXBwbHlcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1zY2FuL2lzQXBwbHlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0QWRkckxpc3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1hZGRyZXNzL2dldEFkZHJMaXN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtYWRkcmVzcy9nZXRBZGRyTGlzdFwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy91dGlsL2NvbmZpZy5qcyIsImltcG9ydCBJbW11dGFibGUgZnJvbSBcImltbXV0YWJsZVwiO1xyXG5cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOWPquS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiDlhYjor7vnvJPlrZjvvIzlkIzmraXlvoDlkI7lj7Dlj5Hor7fmsYLvvIzor7fmsYLmiqXmloflm57mnaXlkI7liLfmlrDnvJPlrZjlj4rpobXpnaJcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSA9ICh1cGRhdGUscm9sbEtleSxzZWNvbmRLZXkpID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuLy8gICAgICAgICAgICAgcm9sbEtleSxcclxuLy8gICAgICAgICAgICAgc2Vjb25kS2V5XHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5LiN5pSv5oyBIHN3ICAgLOawuOS5hee3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2NhY2hlOiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW59fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlTG9uZ1RpbWUgPSAocm9sbEtleSwgc2Vjb25kS2V5KSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICAgICAgcm9sbEtleSxcclxuLy8gICAgICAgICAgICAgc2Vjb25kS2V5XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiDlj6rkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMeWIhumSn+WGheS4jemHjeWkjeiwg+eUqCzlj6roroDnt6nlrZhcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIG5lZWRTdzogYm9vbGVhbiwgdmFsaWRhdGVUaW1lOiBudW1iZXJ9fVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTFtaW4gPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKiAxMDAwLFxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZVN0b3JhZ2UzMG1pbiA9IHtcclxuLy8gICAgIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIG5lZWRTdzogZmFsc2UsXHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAzMCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVTdG9yYWdlMWhvdXIgPSB7XHJcbi8vICAgICBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKjYwKjEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTJob3VyID0ge1xyXG4vLyAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgbmVlZFN3OiBmYWxzZSxcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDIgKiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG5cclxuLy9cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlU3RvcmFnZTI0ZGlhbiA9ICgpID0+IHtcclxuLy9cclxuLy8gICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuLy8gICAgIGxldCB0ZW1vcnJvdyA9IG5ldyBEYXRlKCk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRIb3VycygyMyk7XHJcbi8vICAgICB0ZW1vcnJvdy5zZXRNaW51dGVzKDU5KTtcclxuLy8gICAgIHRlbW9ycm93LnNldFNlY29uZHMoNTkpO1xyXG4vLyAgICAgbGV0IHRlbSA9IHRlbW9ycm93LmdldFRpbWUoKTtcclxuLy8gICAgIGxldCB2YWxpZGF0ZVRpbWUgPSB0ZW0gLSBub3cgKyAxMDAwICogNjBcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICB2YWxpZGF0ZVRpbWU6IHZhbGlkYXRlVGltZSxcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgd29ya2JveOeahOetlueVpSAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKuS4umdldOivt+axgu+8jOS4jeWKoOWvhlxyXG4vLyAgKuaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICrlhYjor7vnvJPlrZjvvIzlkIzml7blvoDlkI7lj7Dlj5Hor7fmsYLvvIzor7fmsYLmiqXmloflm57mnaXlkI7liLfmlrDnvJPlrZjlj4rpobXpnaJcclxuLy8gICogQHR5cGUge3tieUFqYXg6IGJvb2xlYW4sIGNhY2hlOiBib29sZWFuLCBhc3luYzogYm9vbGVhbn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3Qgc3RhbGVXaGlsZVJldmFsaWRhdGUgPSAodXBkYXRlKSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIGJ5QWpheDogZmFsc2UsLy/lpoLmnpzopoHmlK/mjIFzdyDlsLHkuI3pnIDkvb/nlKhhamF4XHJcbi8vICAgICAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIHVwZGF0ZTogdXBkYXRlXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIOaUr+aMgXN355qE6K6+5aSH77yM5L2/55Soc3fvvIzkuI3mlK/mjIHnmoTkvb/nlKhsb2NhbFN0b3JhZ2XnvJPlrZhcclxuLy8gICogMzDliIbpkp/lhoXkuI3ph43lpI3osIPnlKgs5Y+q6K6A57ep5a2YXHJcbi8vICAqIEB0eXBlIHt7YnlBamF4OiBib29sZWFuLCBuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogbnVtYmVyfX1cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBjYWNoZUZpcnN0MzBtaW4gPSB7XHJcbi8vICAgICBieUFqYXg6IGZhbHNlLFxyXG4vLyAgICAgLy8gY2FjaGU6IHRydWUsXHJcbi8vICAgICBzdG9yYWdlOiB7XHJcbi8vICAgICAgICAgdmFsaWRhdGVUaW1lOiAzMCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICog5pSv5oyBc3fnmoTorr7lpIfvvIzkvb/nlKhzd++8jOS4jeaUr+aMgeeahOS9v+eUqGxvY2FsU3RvcmFnZee8k+WtmFxyXG4vLyAgKiAx5bCP5pmC5YaF5LiN6YeN5aSN6LCD55SoLOWPquiugOe3qeWtmFxyXG4vLyAgKiBAdHlwZSB7e2J5QWpheDogYm9vbGVhbiwgbmVlZFN3OiBib29sZWFuLCB2YWxpZGF0ZVRpbWU6IG51bWJlcn19XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY29uc3QgY2FjaGVGaXJzdDFob3VyID0ge1xyXG4vLyAgICAgYnlBamF4OiBmYWxzZSxcclxuLy8gICAgIC8vIGNhY2hlOiB0cnVlLFxyXG4vLyAgICAgc3RvcmFnZToge1xyXG4vLyAgICAgICAgIHZhbGlkYXRlVGltZTogNjAgKiA2MCAqIDEwMDAsXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNvbnN0IGNhY2hlRmlyc3QyaG91ciA9IHtcclxuLy8gICAgIGJ5QWpheDogZmFsc2UsXHJcbi8vICAgICAvLyBjYWNoZTogdHJ1ZSxcclxuLy8gICAgIHN0b3JhZ2U6IHtcclxuLy8gICAgICAgICB2YWxpZGF0ZVRpbWU6IDIgKiA2MCAqIDYwICogMTAwMCxcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vKipcclxuICog6K+l562W55Wl5piv5LiA5a6a5pe26Ze05YaF5LiN5ZCR5ZCO5Y+w6K+35rGC5pWw5o2u77yMIOWmguaenOWcqOiuvuWkh+S4iuaUr+aMgXN35YiZ5L2/55Soc3cs5ZCm5YiZ5L2/55SoIGxvY2FsU3RvcmFnZVxyXG4gKiBAcGFyYW0gdGltZSAg6KaB57yT5a2Y55qE5pe26Ze0IOWNleS9jeaYr+avq+enklxyXG4gKiBAcmV0dXJucyB7e2J5QWpheDogYm9vbGVhbiwgZm9yQ2hzcDogYm9vbGVhbiwgZW5jcnlwdDogYm9vbGVhbiwgY2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHt2YWxpZGF0ZVRpbWU6ICp9fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjYWNoZUZpcnN0ID0odGltZSk9PntcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYnlBamF4OiB0cnVlLFxyXG4gICAgICAgIGZvckNoc3A6ZmFsc2UsXHJcbiAgICAgICAgZW5jcnlwdDpmYWxzZSxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRlVGltZTp0aW1lLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiAg6K+l562W55Wl5piv5LiA5a6a5pe26Ze05YaF5LiN5ZCR5ZCO5Y+w6K+35rGC5pWw5o2u77yM5re75Yqg57yT5a2Y5Y+q5ZyobG9jYWxzdG9yYWdl5LitXHJcbiAqIEBwYXJhbSB0aW1lICDopoHnvJPlrZjnmoTml7bpl7Qg5Y2V5L2N5piv5q+r56eSXHJcbiAqIEBwYXJhbSByb2xsS2V5ICAg6Z2e5b+F5aGrIOWmguaenOWQjuacn+imgeWIoOmZpOi/meS4que8k+WtmO+8jOi/meWhq+WGmei/mWtleVxyXG4gKiBAcGFyYW0gc2Vjb25kS2V5ICDpnZ7lv4Xloasg5aaC5p6c5ZCO5pyf6KaB5Yig6Zmk6L+Z5Liq57yT5a2Y77yM6L+Z5aGr5YaZ6L+Za2V5XHJcbiAqIEByZXR1cm5zIHt7Y2FjaGU6IGJvb2xlYW4sIHN0b3JhZ2U6IHtuZWVkU3c6IGJvb2xlYW4sIHZhbGlkYXRlVGltZTogKiwgcm9sbEtleTogKiwgc2Vjb25kS2V5OiAqfX19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2FjaGVGaXJzdFN0b3JhZ2UgPSh0aW1lLHJvbGxLZXksIHNlY29uZEtleSk9PntcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgc3RvcmFnZToge1xyXG4gICAgICAgICAgICBuZWVkU3c6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZVRpbWU6IHRpbWUsXHJcbiAgICAgICAgICAgIHJvbGxLZXksXHJcbiAgICAgICAgICAgIHNlY29uZEtleVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlRm9ybWF0dGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCByZXMgPSB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5yZXNwLFxyXG4gICAgICAgIGRhdGE6IGRhdGEucGFyYW1zLFxyXG4gICAgICAgIG1zZzogZGF0YS5tc2dcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vKipcclxuICog6K+l562W55Wl5piv5YWI6K+757yT5a2Y77yM5ZCM5pe25ZCR5ZCO5Y+w5Y+R6YCB6K+35rGC77yM6K+35rGC5Zue5p2l5ZCO5ZCM5q2l5pu05paw57yT5a2Y77yM5Zue6LCDdXBkYXRlIOWHveaVsO+8jFxyXG4gKiBAcGFyYW0gdXBkYXRlIOW/heWhq+abtOaWsOmhtemdoueahOWbnuiwg+WHveaVsFxyXG4gKiBAcGFyYW0gcm9sbEtleSAg6Z2e5b+F5aGrIOiuvue9rue8k+WtmOeahCByb2xsa2V5XHJcbiAqIEBwYXJhbSBzZWNvbmRLZXkg6Z2e5b+F5aGrIOiuvue9rue8k+WtmOeahCBzZWNvbmRLZXlcclxuICogQHJldHVybnMge3tjYWNoZTogYm9vbGVhbiwgc3RvcmFnZToge2FzeW5jOiBib29sZWFuLCByb2xsS2V5OiAqLCBzZWNvbmRLZXk6ICp9LCB1cGRhdGU6ICp9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHN0YWxlV2hpbGVSZXZhbGlkYXRlU3RvcmFnZSA9ICh1cGRhdGUscm9sbEtleSxzZWNvbmRLZXkpID0+IHtcclxuXHJcbiAgIGxldCAgcmVmcmVzaERvbUZ1bmM9KHJlc3BvbnNlKT0+e1xyXG4gICAgICAgbGV0IHJlcT1yZXNwb25zZUZvcm1hdHRlcihyZXNwb25zZSlcclxuICAgICAgIC8vIOWwhuiOt+WPlueahOaVsOaNruWSjOe8k+WtmOS4reeahOaVsOaNrui/m+ihjOWvueavlFxyXG4gICAgICAgbGV0IGRhdGFGcm9tQ2FjaGUgPSB7fTtcclxuICAgICAgIFVQLlcuVXRpbC5nZXRGcm9tU3RvcmFnZSh7XHJcbiAgICAgICAgICAgcm9sbEtleSxcclxuICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgIH0sZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgaWYoICEhZGF0YSApe1xyXG4gICAgICAgICAgICAgICAgZGF0YUZyb21DYWNoZSA9IGRhdGE7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kS2V5XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICB9KVxyXG4gICAgICAgbGV0IGlzU2FtZUF0QWxsID0gSW1tdXRhYmxlLmlzKEltbXV0YWJsZS5mcm9tSlMocmVxKSxJbW11dGFibGUuZnJvbUpTKGRhdGFGcm9tQ2FjaGUpKTsgLy/mlbDmja7mmK/lkKblrozlhajnm7jlkIxcclxuICAgICAgIGlmKCAhaXNTYW1lQXRBbGwgKXsgLy/mlbDmja7mnInlj5jliqhcclxuICAgICAgICAgICAgdXBkYXRlKHJlcSlcclxuICAgICAgIH1cclxuICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlOiB7XHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBlbmRPZlN5bmNGdW5jOmZhbHNlLFxyXG4gICAgICAgICAgICByb2xsS2V5LFxyXG4gICAgICAgICAgICBzZWNvbmRLZXlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZTogcmVmcmVzaERvbUZ1bmMsXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKDpmaRsb2NhbHN0b3JhZ2XkuK3nmoTnvJPlrZhcclxuICogQHBhcmFtIHJvbGxLZXlcclxuICogQHBhcmFtIHNlY29uZEtleVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlbW92ZUNhY2hlID0gKHJvbGxLZXksIHNlY29uZEtleSkgPT4ge1xyXG4gICAgVVAuVy5VdGlsLnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICAgIHJvbGxLZXk6IHJvbGxLZXksXHJcbiAgICAgICAgc2Vjb25kS2V5OiBzZWNvbmRLZXlcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5Yig6Zmk57yT5a2Y5oiQ5YqfJylcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgICBVUC5XLlV0aWwucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgICAgIGZ1bGw6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvY2FjaGVTdG9yYWdlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS10cnlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdQcm9taXNlJywgeyAndHJ5JzogZnVuY3Rpb24gKGNhbGxiYWNrZm4pIHtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZih0aGlzKTtcbiAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oY2FsbGJhY2tmbik7XG4gIChyZXN1bHQuZSA/IHByb21pc2VDYXBhYmlsaXR5LnJlamVjdCA6IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmUpKHJlc3VsdC52KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA4ZTBjMWRiMDAwODVjOGFkMjU1YVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQge2dldExvZ2lzdGljc0xpc3R9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0QVBJXCI7XHJcblxyXG4vKipcclxuICog5Y6G5Y+y5pS25qy+56CB54mp5paZ5Y6G5Y+y6K6i5Y2VXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2lzdGljc0xpc3RPZlJlZGJhZyhwYXJhbSkge1xyXG4gICAgcmV0dXJuIGdldExvZ2lzdGljc0xpc3QocGFyYW0pLnRoZW4oKHJlcyk9PntcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2lzdGljc0xpc3RPZlhWU0goKSB7XHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/meS4quaOpeWPo+imgVxyXG4vLyAgICAgICovXHJcbi8vICAgICByZXR1cm4gZ2V0KENPTkZJRy5SRVNULmdldExvZ2lzdGljc0xpc3QsT2JqZWN0LmFzc2lnbihjb21vbVBhcmFtLHtsb2dpc3RpY3NUcDpcIjAxXCJ9KSxjYWNoZVN0b3JhZ2UoMSo2MCoxMDAwKSk7XHJcbi8vIH1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9IaXN0b3J5T3JkZXIvSGlzdG9yeU9yZGVyQWN0aW9ucy5qcyIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UudHJ5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDk3M2NjOGVlZmM1OTkzMWRlOTVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBhYTk2M2I0YzI3MTQ0ZjA5NGNjYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIEQpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gYjUwZDgyNDU2ZTU0NWRjYzNkZDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgYXJncywgdGhhdCkge1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qc1xuLy8gbW9kdWxlIGlkID0gYjU4MGI5NGIxOTU4NDJjYmYyYjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIGlzTm9kZSA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChoZWFkKSBub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChpc05vZGUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgU2FmYXJpIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMzOVxuICB9IGVsc2UgaWYgKE9ic2VydmVyICYmICEoZ2xvYmFsLm5hdmlnYXRvciAmJiBnbG9iYWwubmF2aWdhdG9yLnN0YW5kYWxvbmUpKSB7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWU7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICAvLyBQcm9taXNlLnJlc29sdmUgd2l0aG91dCBhbiBhcmd1bWVudCB0aHJvd3MgYW4gZXJyb3IgaW4gTEcgV2ViT1MgMlxuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZiAoIWhlYWQpIHtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBiZGUwZjU3ZTliNTc5Zjk0M2Y4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFIZ0FBQUI0Q0FZQUFBQTVaRGJTQUFBQUFYTlNSMElBcnM0YzZRQUFJbkJKUkVGVWVBSHRYUWw4Vk5YVlA3TlA5cEJBRXNLK0k2aUl3T2RXRlFRVWNHbGRzZFd2dHRxNlZxdXRlNlZXcmRxdjF0b0thcFdpZFAzY0ZRVEJCVVJ3WVZWQVJIWWlTd2lFTGR0a3RqZlQvLzlrM25TU2dnMWtFbDZHM1B4ZTNuYmZuZnZ1LzU1enozYnZzOGxCVWpRYXRUVzQxZkNjdHc5MHJjRmpiYWRKYUlIb0FjcW9kODFtczlVN04vUFhBNmdCcU9hOWV2dGx5NWJwZVZwYW1ubGQzRzUzL05nc3VHM2Y5QllJQm9OeDBHcHJhL1Y0eUpBaDVyV0Q3U1VSN0Rnd0NlQ2ExN2kzRVZDQ1NSQ2RUcWR1TzNmdXRMbGNMczNIYTN3Vmg4TmhQdGYwTjJzclFRekRVQURENGJEdVE2RlF0TEN3TU1wemJnU2ZvTWNBWjU1NmdKc2dLeWdOd09XMU9MRHA2ZW4yUFh2MjJBbW94K094VjFkWDJ3bW11ZUZjajRtSjNXNXZBNWtOMGNRVWlVUVVMSUtjbVprWjVkN2NjQjRKQkFJUkFwNmZueC94K1h5UkF3Q3R6eFBrUklBVldOUk53YzNKeWJGN3ZWNTdaV1dsbzZxcXlnNmdIU2lJMXh6NEFUc29GM2phYlg2LzM4YTl1VFh4M2RvZVJ3c1FZSE5EZStzeHFEWUNBb3VndlExd1ZBSnJaR1ZsUmJLenN3MWNpMVJVVkVRYVVITlVBVzVBdlhheVpQUU1CNmtXdmNVQlZ1REU1c0FQT3NHbWRZL2U1Q0M2dU9aQUlUYjhPRSsxcy9DOERhWERid0hnb2RSSGdFRkVFWjZqYlEyY1I4QTFEUnlIZ1lmdWdZZUJMUXd1YXBDYWdaa1JBem1DR3RSUk1aNVBwRnc3S1JlOXdRSFFuT2doVHU2Unh3WHFkUUU3RjQ2ZFlOZTg1dVJ2RWxrQXpwMmRyOVVHOE9HRHl5ZlJyaWJBQkpTNFJ0akVhTmN3MkhLWWUyUUpnWXBET0E2aEU0VEJZY1BjQXpzalJza213RkZuUW5WVW1DSmJKb1ZpYytKQkZ3cDNjME5obnRqZWpSOXdBWGdYS3NCOERweHpJOEJtWjBrb3R1M3dVRm9BN1VpQXVZdWdiVWs1QnRyYUFJQUVNNFRyUVdBZXhMVUFzUWZoMlVDSUZIS2paT2NVdnZBOGNhaEh3V1ROZHJKbThIWW55aVdsdWpEV2V2Q2dCd1Y1dWVHYUZ6L0ljdzhBZDZNUTVpTVZLOGdzR1BmYVdEUWE0bkFUMmxJQlJ2dVNMWk55RFpTbHdPSWVRUTNnbWgvSHVnR3JBTVptWGdzQnF4QmtwWENNVlpPS0kzRUtwaXJFY1JjOWd3S1VBNXRTTHdyMEltTTZDa2pEY1RvS1RFUGhCTnNFbWF5YUxKdmpNVzYxU2RLSEN5NmZRenN5UmRDV0JEYk1EZWRCbkFmUTluNmMxNktOSGRoVEJxTG1vdm5CdmlPa2RBckNGTUp3WHhNQlZyWktQUmNacU84NklKVTVZMk11UWZSaVN4czJiTmk4dWtkUzgvL1g3NzByMHk4WUsyeFZPNW9rdTFjdnVYTEpjbkdtcFZueWhaY3NXVEtjSFlFYndEVTRXb0o2RFp4VDhES0hTcHNLUm53RFVLenF1ZXdCQkJtZ0tnWGpBUzk2VHJvbDN6S0psYUxacHREamxBSTNOcGRkY21ENWczU2F4RjlJYmxIRWhOaUFnaWtmdVlnWnNhT3RnbGlhdjZZQVV6WGlSUm94cU9mR1dLNFREMUxBOGlDek5idXgrUlpKMkhzZGRpbjJPblhyNkhGSUh0cW9wcVltQ1NVM1d4RWNLbldZQk5BNlRCSTdZa2dzaVNsL09UNEcwL3dJTXJmUmlBRmdIVEZWeUFXd0tUMXpIRTdwNUlIb1VPeDFRWnJSd1UzQ29PUTRHVmp3ellrSnNQRURNeit4QWtWVHRWV0xJN0UwcTZ3QVU4RGkrTXVFM3NCUm13TTRkV0JUOXlVVnAzUWl3SjA4QkRoSzZVWDhvT0tBaGQ4WUdCRVRWVmRCc1hWbVJRaTVKRktBcnh5WjFUZDFWMzBWOHliQUpadW1KTTBPUUpDcEVxVjBvdjJOOG45OHMvamJ4akJ4RVNNVEx3SkxEQk9xYm91emFPVGpHRXdLVnZTUldVMlJ5S3hXcTRTSFV2SXdBUHYrM2tCUWFDWWdCWWREWWJHeVpBbWNpRjNjbWtqdVM3OEFobGdiVE14eGtCVmdpdFd3Z0tqTEQ3MUJiY3Q0V0ZrMWVvUUtYU21KYXNKTGhRQndXU0NrWXpDc05TSTQ3cEp3MzRLSFpNdTBKQ3BPcUI5cFV0a3o2eHBUbGY0dFpKbWt6VXk0cjVTTVRrRXFaZ0ZVckZNNitRSHFUaWpCc0NyQS9oTVZCekR1Yk9FM0ppYkVoZ25WSkFISHdUV3haUFhqTEpvbkpyaDRVSjhndStaenZNWDdxWnJ3bnJMSjVwTG9nMDlJMUtEeENDK2NuaTRWMElPdENqSnhpV0ZEakpRbG0vZ2w0bFFQWVBORzdBR2xaTENBZU04dzc2ZmFuZ0Q3d29iWU9uY1ZlRnIwOVd3dXAxUldWa2tBNDdMSFl6MFpreGh4T0NXMUp1RDFIOUFjRU9EL3lKWHFGOENrY3JkL0xWdWUrSTBhZitGeGwzQmV2dVQvK25FSkEvRFdyQ08yQVl6T1M2bWpWMTZ1WkpWdmgrNWJwd2NiZ0RvOUoxdGNibGVyN3Q1dEFNZmdDOE9wMEx0ZGxzQkhwMnJTdnR4c3FmU21DUlROVmcxd1NndFBqVVVHTGhtWnRXYTlmT1ZNazQxVlB0bFFWU01yMHJKbDdaYXRsalpYTnViOVduZjNiTXdiTmlZUEFIWjFLSklGSjQrVTZ2VnI4VVJVc2s0YUx0MUF6WERGQ1d5OWpTbkZrbm5hQUFZc2tFSWxLeU5kYktQR1NOYUlzeFVvT3R6UzNHNFZzdG9BdG1UZlBiUktGWFhzS0xUbXdjRlNCekRHWHBmYkk0aFpQYlNDTEphN2pZSUJDQ2s0THo5ZndTUkxab0lIWFhWZzZzaXRPYlVCRFBRSTR2YnQyOFZYV3lzSVpWUThhUUhNYjkrZWtTNUp4WmUveFE3VlVpbTV0VytCV3BPRm1sU1dqSjlqWThOYUoydldyaFVFSFNyWUxKZEFISGZjY2RLdmIxODlUaFlsa3gvd041ME9SNHNJYjYwS1lEWXlBYWF0UEZtSmpjM3k5bGRVeXQ1OUZmVUE5dnRwOWhEdEFNbjZQWmJETWpuU3c4eEkrejh2TlZ0cVZRQ3pGZGdnTVdkSVVocUZBSE03L3ZqalpmLytDbVhSSnBWMUxDN1djUmx4TUVuNUxiTVFkbFI0Q3N6VFp0MjNPb0NUM1Jwc2JBSjg0dUFUWk9mT1hYRXBtdGN5b0RyaHB0NVBGb3MyNjUvczhzeHlHKzZQZW9EckdpUXE2VEJWRmhkM3JHUEhTc0oxTEpSalpVdUIwUkNjWkp5M09vQk5sZ3JTU3NiN2F4a2dZckIrbTZSNXZVcXRac0Vtc0x5ZjNKVDBBZzlhdlZZSE1NZGZiWERFTVpOOUppc2RzTW1UVjN4ZE5hT29POVV3L0JqdDMreXN6WjFhSGNCVWFUQWpTOEpidDRqczI0ZTJhdjVHU2dZSU5xS2FseWRPQ0c2Q3FCRzcxTEgrNWdhNTFRSHNRaWlOLysyM3BmYXh4eVJVVmFVcVJ6SUFhTzR5MkEyZDJkbVNjZSs5NGgwK1BCNDUwdHkvMitvQXhoUTY4YjN5aXRncW9MT0NrakVobG9wcWM3ZFQwOHFIb0lZd1I3R0I0MVM5OUpJNFRqdE5QRHBCc0duRk51YnBWZ2V3aHJUQ1hxeW1Eb3pIR2FOSGl4YzZiRExINDhZMFhLUHpZS3l0L2V3enFaMC92MjR1cUs5Vy9ENmZlREJwdXlWU3F3TllHNFdVQzZwMWR1MHFCWTgrS3BnVzJSSnRkZGkva1hYcHBiTHQ0b3NsQW5zM1JRWks1NmFFZnRpRk52TEI1cldUTmJJU2g1VU5qWVJWWWdRTGRoM1c0eTM1RUNaZGl6MGpnOGpHZjdhbFJNUFdDekNiaWcyVzBHangxclBhd1JHc1orc0cyR3BBV3JBK3JYTU1Qc1NHcEFlcXJLeE1zckl5WlJmc3paMjdkQkZNbWRWck5FVUdJYlFGL0g0MVBOREJnRm55c3VhcnI2Ujc5KzZ5WThjT3lXM1hUakNoUy9aREN2NzY2Ni9qSGlBNlBvNFpNRUR6SDJLVldpejdVUUV3MW82U3o1WXVsZkxkNVZJSnQyQkhoT2ZrNU9hcXYzZlRwbzFTc21telpBSjhPdjJIREJrcVBYcjBrRVdMRmtwSlNZbDh2R0NCZE9uYVJVYU1IQ1VyVnl5WERoMEtGUHcrZmZ2SWxpMWJGT3pqQncxcU1jQU85WWVPQ29BWjIwd3FEbUlhU3U4K2ZlQWx5aEFzV0NKNzkrNEZSZStFZ1NsUEFVOVB6MURwZHU3Y3VackhoeVVjQ291S1ZBWGpNZWJ1Q1R1TEg1RWZGZWdvV0hKSzh4OXFvN2RrL3FOaURNN095VkZXZStLUUlVcWRLMWVza0pOUE9VWDZJRnBqMzk1OVVnbUxHT2JXQ2haKzAyaVJrMDQ2U2NHa2JsMWI2NVBNakV6SnlNeFErekhaTWlacktlVTJ0N00rR1IzaHFBQzRMZ3JFQU1YdWtYWHIxa243OXZteWNjTUdwV3FmcjBhS2lnckJ1aXZVcXQyalowOE5wZkdtZVdGOGNpbVZqejduSE9uZHV3OG90a1lHRGh5b3NWcmRNRDUzYU44aDZkRWV5UUExc1l5amdrVlg3Tjh2Wnc0ZkxxV2xwZElYVk51cmR5OVovdmx5WFVXbmI3OStvTjZBaE1KMUFlNzd3TFlaUXV2RnRCVXNRU1dYWGpaZVBwZzdSNFlNSFFaL2NTZnBqdkY1OSs3ZEtuU1I2cG5YeXVtb0FKalJrZHlPSDNSQ0hJdFRUajAxZG54Z0FlbXNrU1BqZWNuYW1YcGhjVFNtb2NPRzZkNDgxeE9ML2t0WmdNbVdYMy8xVlRseDZGQlp0WEtsemhLTUdCRVZtalpzV0M5WW1WVmp1NG82Rml0ckppV1RiU2U2Ny9yMzd5KzdkdTFDck5aK2pMczJLZHRScHVOMnAwNmRaTjRISCtCNVRDMkZTclVYNDNnKzJQNlpadzYzSE13cE93WnYzclJKQmF0MUNJZGREMEJWdDEzemxhNWV0M0hEUnRsZHZoc0NWSzI4OTg0N2NWQXBOTmtSU0tBYmpwaysrZmdqK2ZMTFZUSjcxaXo1YXZWcW1mUGVleXFNVlZkWEtadW1mNW9DVytrMjJKa3RtRktXZ2dzS0N4VTRCckxUc0krVjY2RU81Y1BZd2FWMzdVclI3U0VrN1M0dlY2TUhWazZYUVNmOG00V2JXSGtReGtQOW1LdnU1TUhnNGZYV09UWTJiZHlrQWhnS1YwN0FWZkVZYldJMXlUcGxBVFlRTmNFQWVRcEN4V0REcE5adTNib0pBU01RV0c1SWRWcGFxbWlsT2xqS3lzcUdCRjFuOVFyRTRxVEp4b3M2Rm1uSFNJTStiV0Q1Qi9pSEVHQUNWbzBwTUZaS0tRc3dxYlZYNzk3U3JsMnViTjI2VmJwMjdRWUE5Z0tNa0JRVUZrazFkRjRhUEVhZmZiYXFUdmhLZ3BSc0x0RmdkQUpFMWtzOXVSQXFGSzlYVjFXTEUrdDJFRXltZHFEbXpiQ0FuUUxuZlEwV2ErSEV0Y1R4V3pOWjRGL0tBc3kyUGVua2s5VitUQXNWQmFPdzBWMDZkKzRzeHgwL1NOWmlQTzVRVUNnRkJRVUFhaFBZYjU2NFhZaTZBSFV5a2EzVG5NbXpRdVNqYWtYN05hS2tkVHcvRmNBT0hIaXNVQi9lQXZ0MEx2SVNkS3VsbEFhWU5tZHVEUlBIeVlISEhoZS9UT01HRXkxZURST3BuSWxqZW1LaXFUTTN0dzdRcm1EOVZrMHBLMFZidGNGYnVsNXRBTGQwaTdmdzc2VTBpMlpiWW9GVldieG9rVXJOOGJiRk9Oc1ZQdUdCeHg2cmw1WXRYU1lEQmc3UU1aYm1UQTlDYkdqNVd2anBweXA5OTRFSGlqN2t6eEU4dHdOKzVicFJHbzhpb0lST2lQK0Jjd0tMY2NlTHQ5SkJ5Z05NeC8xTk45eW8waklXNkZUaGFTTjh3RTZFcmI3Nnh1dnkzcnZ2eXZ2dnZTLzNQL2dyb1c1NzQ0MDNTTHVjWFBudDd4NlRpNzk5b1pTVzc1U1JJMGJJeEVsUHliMTMzUzN0WUxFcUxzSzRqazVDRld3T25wMzV6aXpwR1J2SHJRUXU2NUx5TEpxNk1FMkkzNy9xKzVJT2FxTVVmY2NkZDZqQlkrNmN1Zkx4UngvTFQyNjVXZjc1OTMrb0JFMDFpTTZINTZjOEwzZi80bDY1K2djL2xCcjRmV242eklHVWZNODk5eXAxczZ6cmI3Z2U5dTFCOFJtSlZnT1g5VWw1Q3VaTGNxSTFxZlNoaHg2U3ZPeGNlZjR2TCtpTWlJNllUVWludlEreHloNHN1UEwyekpreVpzd1lTTXdGT0g1YkhudjhkM0w1ZHkvSHhQQjkwZysyYXVyRzI3WnRsVi9lTndFeHpoSHBCQU5Lc3BkNFlIMlRtVktlZ3MzR29yNUw2cVc3a09NbEtmdVlZNDVCbEVkQXZrWm9UczllUGVXWDk5K3ZWcTdUVHo5ZDdydnZQcm4xNWx0a0pMeEswMTUvUTlreGRXU3FUWFJDc0t6MkdLZXRubzRLQ2w2M2ZwMWNlUEdGTXZISkowSE5UdG00Y1NPQzdBSWFyblBMclQrVjY2KzlUaXBnMmZvV1hJaVhYbmFwUFBQME0vQWZueWwzM24yM2ZPZUNDMlRTMDA5RHlPcXNnWG5iWUpkKytEZVBvQ05FMWNUSnptSGxsUElBZDRIME93Q1JqelBlbWlHaFlFak5qU0hZcVMrNitDSjU4ZjlmUkxCZGxvdzk5MXp4UWRvT1laejkrOS8rTHVQT08xY20vdUZKNmR5dGk1d0swSC8wNHgvRHhwd25ZOGFPaFZEMm5yaWRMblZXY0x5bWc0SXhYVlpOS1E4dzE3c2lPNjBOK09XS0s2NUFkT1V5ZFIrdVg3OWUzcDh6UjI2NjZTYTUrcHFyUWQwVDFUNU55VGdyTXd2TE9leVVkOTkvVnlZL04xbnlPN1NYNmRPblN4NHNWNVAvUEZuSDNTV0xGK3ZZYmdZRFdCWGdsQitEdDIvYkJsWjdsM3kyYkpsTW1UeFpycjMyV25sNjRpVHAzcjJia0xvblRab295ei83WEQ2RnpqdnhxVWs2VXlJek0xMXV2LzNuY3R5QWdUSWVRdFpzVEZlbEQvbVZsMTVXSHpQQkpmVnpMUC9OSTQ5cUtKQlZBVTU1Q3U0UFFXb3BZcUtYTEZvc0R6ejRnUHpxZ1FmZ1dlb3FVNmI4V1k2RnMyRDg1ZVBsMldlZmxhMkk1cmgwM0RncHhxcnZwYnYyU3NuMkhlTEdldEYvK3ZNVXlZVm5haHpZODZ1WXRuckY5NzRuSnlEMGg1M2p4aHR2bEoybE8rUzdWM3pQcXZpbXZwcEVwd0NsWGpyOFI0OGFMVE5temhDbnpTR25uWDRhUUo0aW55eFpJbytPSGlYSGJOa3NzeXBkY3YrbkVRbCt1bHdDUFJDT2MrNUY4a2hsUU03THlwRHpBVFo5djcrYmNKOXNBSHRuZUU4M3VDREhJT0t5c0lFandrcG9wenlMWm1OLzhjVVhNblhxVlBrNTJPNmJiNzZwYWhFakpDZkJPblVuakI2RHFlN0FjUEYrcFZPMjdQWEo3a0N0bk5xL000UXVRMHFoSTdmSGNrb2JBQ2dsNWw0OWV3bWpQejc1NUJPb1hIM2tIekNRTUdqQXFpbmxXVFFiL21UNGhSMHdUYzZhUFJzejdGOVdpOVZPMkpSM2xlK1M4MkNHTkRadkV0dFpvMlZvWmwvcGFMakZrMk9YcXF5Z25GaGNLRnNycXVUVzg4K1J1MzU0TmZUbUFXb0JPd0dTODZEQmcxRU9RbjhnVWRNQVl0V1U4aFRNb0x0SmtKQnBoMzRUQmd0R1NISWVFZzBmSDg1ZklET20va1ZDYjc0aHEvLzJzdnppeGNXeXI4b3ZCZm5wa29Ob3lXeHNaVkNmZmcvTDFmc2Z6TlZaRGd6Z3V3YzI2VE5PUDBPRnE3SG5qdFZnZ2phQWoxQUxGR08ySUsxUFA0VkI0NXBycmhFdlFMc2RiSG5ldkhscTNCaUVjVFd5WTd1c0RLVkpSY0FtTy9aWHk1THlNaW5CdXBWek41VklGK2kvc0hCSUNhSTIzcG45RGpoNWh0eDA4MC9VOGtVVDZQd1A1MnRzMXhGNnZmLzZzeW5Qb3ZFNVRqa0RWaW1PazlSeGwwSmRPaE5zK2JycnI4Y2EwWGxpeCt6QmNPbnhFckFWeWlrRm5hUnNYNVhzMkZrdGpqUzdCS3Q5OHVDNHMyWGh1dFVhR1dJem9ySm16UnJNTnV5cTRiTU1BMXE2WktrS2NFV2NwR2JCbFBJc3VoU214Y25QUGllWGpiOU1saTlmcmhQSFhuenBSUUQxbGJ3TGl2elp0T2tTZnZ3SjJWSHNsbzZiWHBWVHdrdGxYT2w2bVhuQkdPazcvMzNaT20rdWZMSjRrZXE3Tkd2KzlhOS9sV3QvZkMwQytiYkI4YkJOdzJRWmoyWFZsUElVVERVcEE5dlVGNlppYmxFeFFtQjdDVDRYcGhQSCt2VHBpekY1bi96bGhSYzBBSS8yWlJveFBrU3crNVp0VytXTFZWOUFSNTRzTTJiTmxCQ21ucDQ0ZElpYUpnZkNBTUxwSy9BOXlEMzMzcVBqdVZVQlRua0s1bFRQRVNQUGtrdXcwczFWUDdpcWJrWStCQzUrOElxeDAvemdCb1B3M25qOWRYbnM5NC9MQmQvNWpsdytmcnh3anJBYjQvVnRQLytaWWtlM0lLTXVkeURpWXdVNEFTTTVwazJiSmsvOC9nbGRTTnlxQUtjOEJYT3lOdTNNRks3d05WWnhPQjFxbDNiQ3E4VGc5Mm5UMzVKK0NNbVpjUDh2WmRIQ2hTb3dQUVh2MGRvMWErVXJSSVBROTh0cEw5OEc4RFUxMVhMbGxWZksrRXN1ay9uelBsUVd2ZUREQlJvd1lMV0FkN1BEcFR6QVpUSGg2bzQ3NzlScG4vamN2WlJqWHRJc09QZVB4Wkw5RjExNG9TeGV1RWhlZiswMXVRdnV3ZHZ2dkVNNG0vL2hYejhzZERPT2dqLzR6QkhEWmNYS0ZUSUN3aGxkalp5b1JzcW1GTTNKNUIwNmRERGIwM0w3bEdmUkhDZzdkK3FzZ1hjVXRHNjU2V1pZb3JLVU5mZnUwMXVwOHpuWXBUbi85NGJyYjVDOStHN0RhNisrSnJWK2hPbGczRDBQL3VCY21DbFhyVnFsZm1LYU56bnJmeWxNblBNLy9GQitnUkFlSzF1eVVoL2dHRTF4ZVFadWRBTXlta09ucGtESUtzZjAwRDg5ODR6Y2NmdnRzZ1VyMk5JZlBHYmNXTG50dHR2a2pEUFBrQnV1dTA0L3J6TVdqb2duL3ZBSE9CM0d5YndGOCtYME04NlFSeDU2V0xadTJhcFJJSllqM1ZpRlVwNUY4ejA1MXA0ejVoeHhZMlpnTm55OW5HTGlnTkEwNDYyM2RQNFMyVE1qT1paL3Rsd2QrblBoSno1cjFFanAzcU83UEgvVjg3THFpMVhxWnB6MjVqVDU1ei8rS1kvOTMyL0ZqckhjVjEyRGVjYlpsZzdkU1hrS3BzLzJvNDhXeU1PZ3RtV0xsd3JCbXpCaGdpNnlRaFdxYmk2d0F4L2ppR2lRWFc5TVdEc0JkbVphdlFnczV5eE5lWDZLVElDdzlRN21DTzlFR08ybldHS3BGOEprdVlETGRPclJpQVN4YW1yZEZFeEZGQ3JPTjZVQldEUmwrZ3lFNjRTdzdMQVpzbzdIMnVlM3gvaUxOU1FoV1k4YVBWckRlUmg0TjNUWVVJM1lJUGdUbjM1S3pad3Z2Znl5cnM1RGRuN0xiYmNxaXkvQWVsbW5mZXRiRU5qS2RiV0FiNnFEMXBGMVBRS3A5UUtNQm90Q0JZckFHV0JIWE5YQkVsV2N2djM2SHV5MlhzOEdtelVUWFlGbU1pZXVtZGRvb215WUdoTlp5VHBHWVNaVnkwakRBcHI1M1BJQTgrT1EzRUtJWC9iREU4UjFva05RWTdnRVlRZ3J6WlZlZFpWa1hYS0paTUx4N3JEWTVHc0RxL0ZVSTl5bkNrYVVNTlExMnNWYk9sa1NZQU9UcVIyd05tMzk2Rk5NTlRHa2ZPV1hzdmJGVjhTYm5Ta08ySDE3bGUwVW5lZ0pLZzVDTDkzejhNTlNBWWQrQm5UV0RBRHR3WndqRzRTb0k1R2lrTkFEQ0RDb2h1L1pCMnNZZ1FYUFAyTDFPVEt0MEtEbGc2Qk9Kd0Rkc3g1Z0lYS0NYd1ZiUG5tcTdGdTNGZ3QvUjZVS0lUSVJySEtUbnBzaitVTUg2L3dpc3dnRkVnMW9ZSHlzZ0NPZ0V1T2x1MjlmU2NmNG1JYVFWeDdyV3MzbUE4MndKd3NPd3U5Y2l5Z1AzMGNmU1JEMWpVSnk1MXJXdGlNOEtlMklBV3lncDFmdktwZFZiODZRREFDMzhKbm5wQVk2SldVUlg5a3VpWWF4SkFLTS93NmNSeDFSOGNJZDV5M0lsd3hJdVo2dk40dVVObGpWQnV5UFRnU2dMNEV2djVRQUxFejdZWlRnVjA0OENMenp3R3JsUm15V0M4RnlEc1F4SCs0cThRVE9nREVraEdVaGduQWQrckZFVXhBbVRWSXE3NW5VZXFTQk5mdHhpd0ZzTG1HL2IxdXBWRUh5TElIS3NtRGlzK0oxMnFYc2l5L0Z4UnFCSGRPb2I3ZmhXd3dJT3MrRlVPTkI5RVVuQk1zVlpiakVpZlUyc252M2tTQ21sUncwb1lmb0t2Q2dIcVlRWEhvaHhGSlZ3elRKRDJNNElKQTVFSVBsUktDY2d4dU95ZloxOVhoUW0zWVNQQmVGNmtQQmlOUnBZT3puZUJxR2tjVGdCb0FOR0Uyd01JZEs4Y3BGMk1Hd3hJUFZVb3NBN0srcWxoMGJOOHZzSi84a2UwdTJTQTNpb1hhdldhdUNrdHNJWVlvanZvTUU3MDZuTG9YaWhoT2cvVWxEWlVCaGpuaURBY2tDOVhubno1YkFubktSNGk1UzZVZitpdjM0NmxEamtnS1dJTndvWUlpd0RHSW9nQWxLS1Y1TEl1dmdscGpBRGNnUk5QRWVWVEpzOUZCcHVSWUVOTEg2UEc1MmdNbUs5NE9LbnZuZkgwbjFwbzJTRXdsSUVHMVc2QmJwNWdrcXVPa2VsL1JxbHk1cFRwK2tkZTBzZVJzV2lmZnpTdkhBNGhTWithS0U3UEQ4Z0ZwQ0VLNmMvWS9WVlY4YnZraWp6Mk1BTlRwL0s4L1k3QUN6cDVQVjlTeGJMVjZYRDJPcVErQzRrM3dBN0FKVmVMRmxPSVBpcmcwSm9tVEVzNllDMXlNUXVqd1NyWVJhaEJWeS9KbTVFaXdva3JBWGExS2RlTExZZkF0RmFyWjljOVBIcUk4cUZpbVRiSlJzVnltUzkzaU5kY045cFViczlYNUNxY3JxbVJmUHdseFZkNGZuZkE0ZGwwbnpZTTluajVUa3JoVTV5TDltQjVqT2RLTnlyeFQzNnkrK0ZVdmhhRWVvS1FDTWhCQnFpakV2Q2tORUdHT3ZQU05ML0podmF3ZGJydTNjUmV6RFRoUHY3bDFTUFhDd2VBWU5GamV1dTRxS0pRMExrKzFmL3VWQlhpZDJHU0N3NFhPdXZscHFQLzVZdkVPSFNnUnMyUTdyVkFnaFBKU3NJeGhEQ1N5RkpZTHVoeE9mZ2xpY0phTW8vK2VmaXd2em1qaEdzME00Y1V3QkxvUmxsN0xnWmlTN3BySEZUazZET2NSVkNBQXdBZi9tQ3JiYzNXWUhtSytTMjdlLzVKMDlSbkpHakJKYlZZV0V5MG9sdmY4eGt0c0hTL211WGlWTzNNOGNPRWpzZXlISXdQYWIyYk9QWUxFRjhRT2tqckFzMlVFdFVSeTdBQVE5UWV3MG9LT0RKbElUZFdFbkpHOUswQVRVQjllZUYyRTJGSmc4T0E5QzhPSjRuQWt2VVJVV0xTV3dCQ3NSWUk3UkdXZWRwZUM2c0ZRUzg3c2crRkU2cDFCR3labUNsUThmdmNyRTFCWXJwaFlCT0FPVU9XekNReEtzZ25BRHlyRmpEUXdQMko0dFlraGsvSldRcEZFTk5HWUVWQUpaRkg5MUxEUyt3R0JNSXY0bVVCTWJWeWtUVmk1Ti9CMldDOVdJdW5LRW44UURtR1M1QnRhRzVubUUwakxxVll1SURsSnFZaUtvL0FBWHFUV0NEcUQ2TFNqZkRhYy9KWEFtQ2wwT2RFUmw5WWtQVytDNFJRQm1rN254ejgxR2lObDZDVmE5cG1RanhSdWszcDM0MVVNNVlHTnpzMk1Jb0VtVGJKWldMNEtwVWpDdVUyVnlJdlNWNE9vWVMrQVRFenNCV0hzRXE4UzdrSSs2czVtRHJGMXQ0VENicWprVno1SmpoS0Voc0ROWUpSMFFZUFJ3dmdkM1ViQkQzVGUxd2cwaGEzamUxUExyUFk4R0p2c013THJFc2RIVm80ZGFseHdJcmJHQmlrTUlZcmR6dldnQVcvWEdHK0xGVkJSMkJqZGlzK0lKbEJ6QThzRmhCTm01WVZ5eG8yT3F3d0JsRTFEcXdoNVFjVFZXNlNHN3RsT2V3UFdXU2cyd1Vid085TnYxQU1ZcXJQR01MQUFQY0lkdkdXT2x6bGFXU0cwK3pGNVExb3h4Tnd4VlRXQkNKRFg3RWZ6dWdSdVIxQmJpdWxnWWs4TXdaSkFGSnlheWI0UitpQS9QRXV3SXFGWEhhRjZiTTBmOG1KWWFCSFdUWFZlakk5RVkwbExVRzhNRW81cU5HT0ZEckRaR2xzVHhNOThqRGpCQ1dIaFRNNWtaV1FnQ3kzQ0t3YksxSlZJeDJDaXBWVUVCaFRLUlV2bGh5MXFBWXhvc1NPbThUbXF2bDlob1lORWNsMmtSTThkbjVtV1pZVmprK0YxQzJwNTUzcElTTkFBMXdGMnhITFlSQnhsMUo4ZGxPRktVQVlGTUNqQ1d3bFZ3ZVlNSjVrS2xXaUtMUkhCalNxQStjK1QvS1hOcFJEWHdrZ3BHdzZ3QUxCR011UDZLNi8rUllnM0Z6bEF2c1l6WXRmano5VEljNUtTeGRUL0k0d21YdzhTR0lITUQ0UGkwY2xqeFl4NFQwemdGOHlZV3hvYitIdEtOeU9KQllHNkU4YkIxQUtaVUROVkV2eVBjc05FVDN0Nktoelp3RHF5WG1CUTJUa3lBWnBnWXhiQ0tJandKMnFRTFdtS1lSS3BOd1A5S3ZUd2pCU016eVp4VWF5QWp3UTJoSU1hN1dDWjVzSmhLRFF3V1dPRmJ2d0p1bVlwOVUwWEkwdUhjQ0oxLy9uL1Y0NytwR1BOZURCTXNEQlFPQTB4U01vSEc2Rk0zMU1ieVJSVm1MSGV2Z3pQNE50RlhjbWNQd1lNaFBCRENNZnhnRmtsUVhkTHdFWXphUC81UkFoZ0RrOGZ4bXZ2OTBNU3d3cVZCZC9ZNjZxZ0w3WHJZUDBwTUFIS0lHQkVyVWpIT2RUd215T1RFTEx6dWwzQ0FkU2FpaUJtRzVkRERnZHRBcUtrQ2pKNFJ3Q2tDaW81OE1odUVyQzRYZnQ1TVVBUmU2c2hYckxFMVFGMzVIVVVHTkJCYTgzMGErM2hpUHVEcEIwR1M4SUJsS0F6Y0RBckVCRGFHcFdaWGdJY01HUkl0S1NuaEdBek5vTUpBWmgxM3lRWlFFQXVwcno4ay9sSUxIMU02UkZkVm80ZzdOczYwY0JXYS9IUHNrdVlZMllUQ2Fva05DREJJQ3NZK2pQblBCcjRIcGNJV01XWFpjUW9HYTRZVkxoREJkd2xnN1BGVG5BNmhBRDdzeDhQL05qSTFvVWJKZUpRQW96NnRpM0lidkRncHR5blV5K0xRRGo1ZzVDZEd4QXBTczBIc2lDSHV4ZGthQWVaSmxHSTF5UnRBRytoZFlheHB3UUdjZko3NmdYM0praVhEd2FyVGNaeUdCdmJpdWdlVmRHUFBNcHpZTzNBTzd0T0VnUVVGSGUwSjdjakVzVlRWVSt3cExaUFFBZ0NUUTJVdHdjVjVMVFkvcjNNY0JsWmhySnhMN0JSTDVGTmM0eFJNUVF0VElDUElwR013Q2lVRkk5TFRBWTBFdnRMWWp3SmNzbTBXREkrdVJ0bzRTT0c0VHlwbjNzT1hIRkRBMFo3UWxyUktjYU5Vck5vTWpsV1RBUllFbVVUSDlpZG45WVBvQ0g0SUJLa1VqSUQ5eUo0OWUrSVVURHVYanZkb1dQdnExYXRoY3MxMjRDdGVUanpvd21RdEZ3cHhjME1IOFhDUHdoUlluTHZ3Z3pSektiaTRSMHJIN1RZS2Jrb25CUjVLZVdoWHBXSTBLNkF3U0ptTU1GQ2djU3VJYzRKTllndmlhMjRoUUJIQ1lqTmhMUGhtWVBGVm1wYTUxYWxKc1FyQk9WSWJSVStBaDZ5YU9yQ05uNEhEbnI5SjZZdzlpajhRZ0RLTjhtSHVBcmhJckFGWnM1cDYyZ0NPdGViaDc1VDYwSTZtbVRpQ3BqWndIcWEwekQwd01OVWo3c01nUk5XRlNXK215bXYrdkVuQlBDY2wyNWN0VzJZRHEzYUF6T0VreVhSZ2JIWmlJNlVpZE5tdGV3Qkt0bXdud0FRVW5ZQ255cHA1YmhiZXRqLzBGaUExOFNtMHJXa3lWc01UemdrNERScGhDbFRja3kxakM1TWdPYndDTXlNbVBTdjFzaHdGQTJWeUg5OElNc1J0ZU1DOGRwQzhBejBFMFM3cER2UU9Ybk5BVXJPajV5aW9rTGhoa3NYWDdXTWJDMjFMVFdzQmdtdHVORC95R0VRVW9ZMkNHZzZsWlFwVTRMQVJES2tHcmxHOWpjVEFWUmFQR3RTTjVheEtER0FlMWdNWkJka0FySjNVRExZTUQ1ekhqdDZpZ2hkNkUrejREaHZPZGMrSENUTDNiYWxwTFVCQVdRSTRwZm9IdURjMzJpcW9DbEhqTVlWaXN1V0c0UEo1TUZPbFhCNDNCSm1YRkd4U000RUdLNERUeEtrYkxGNXd4cmdVVEY1alpvTE5mVnRLVGdzUVVKWkVHWWg3QWtvTEZjKzVVYTA5QUxETXF2a0pMay9xZ1pKQXlZbjN6RHk2SitDOFNkQzVaeUw0ZFVkdC81UFpBZ1RSTEM4bVBJbHBvY0oxODE3RHZWS3UrZHhCZ1drQU52TWZLTytCcnBsbHQrMlQxd0ltaUlrbDFydG1VbXhpQmg3L0N5QTl6SnllcWJ2Q0FBQUFBRWxGVGtTdVFtQ0NcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Fzc2V0cy9pbWdzL3BsYXRlLWljb24ucG5nXG4vLyBtb2R1bGUgaWQgPSBiZjgwN2UyM2MzOWU4NmYzYzg2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XG4vLyAyNS40LjEuNSBOZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcblxuZnVuY3Rpb24gUHJvbWlzZUNhcGFiaWxpdHkoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gYzFiOTRlM2U5NWVkNDM1YWY1NDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS1maW5hbGx5XG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnUHJvbWlzZScsIHsgJ2ZpbmFsbHknOiBmdW5jdGlvbiAob25GaW5hbGx5KSB7XG4gIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIGNvcmUuUHJvbWlzZSB8fCBnbG9iYWwuUHJvbWlzZSk7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIG9uRmluYWxseSA9PSAnZnVuY3Rpb24nO1xuICByZXR1cm4gdGhpcy50aGVuKFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHg7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHksXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9KTtcbiAgICB9IDogb25GaW5hbGx5XG4gICk7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qc1xuLy8gbW9kdWxlIGlkID0gYzJlMzViYmZmODMzMDk1OTQzYzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGU6IGZhbHNlLCB2OiBleGVjKCkgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IGU6IHRydWUsIHY6IGUgfTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSBjYjc4Mzc1Mjk0NTQyYzI0YzViYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IGQxODEwYWU1MzMyZTM2ZmZhM2M0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBuYXZpZ2F0b3IgPSBnbG9iYWwubmF2aWdhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50IHx8ICcnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanNcbi8vIG1vZHVsZSBpZCA9IGVjNmNiZTMxN2I5ODUwYjA1Y2U1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSBlZjUxZDQ5ODlmMzA0NGIyZWIzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qc1xuLy8gbW9kdWxlIGlkID0gZjBkYmMxMGM2OGRkODE0MDE0ZTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4vX3VzZXItYWdlbnQnKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52OCB8fCAnJztcbnZhciAkUHJvbWlzZSA9IGdsb2JhbFtQUk9NSVNFXTtcbnZhciBpc05vZGUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbnZhciBlbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBJbnRlcm5hbCwgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBPd25Qcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIHZhciBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICAgIGV4ZWMoZW1wdHksIGVtcHR5KTtcbiAgICB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpXG4gICAgICAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2VcbiAgICAgIC8vIHY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTgzMDU2NVxuICAgICAgLy8gd2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgICAgICYmIHY4LmluZGV4T2YoJzYuNicpICE9PSAwXG4gICAgICAmJiB1c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lLzY2JykgPT09IC0xO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuLCBleGl0ZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7IC8vIG1heSB0aHJvd1xuICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgICAgICBleGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaSkgcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKSBvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIHVuaGFuZGxlZCA9IGlzVW5oYW5kbGVkKHByb21pc2UpO1xuICAgIHZhciByZXN1bHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYgKHVuaGFuZGxlZCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKSB7XG4gICAgICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodW5oYW5kbGVkICYmIHJlc3VsdC5lKSB0aHJvdyByZXN1bHQudjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgcmV0dXJuIHByb21pc2UuX2ggIT09IDEgJiYgKHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYykubGVuZ3RoID09PSAwO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gZmE5ODdkODExZTRlYjJkNDNkOWNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4Il0sInNvdXJjZVJvb3QiOiIifQ==