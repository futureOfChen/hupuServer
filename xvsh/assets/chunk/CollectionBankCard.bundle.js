(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["CollectionBankCard"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/CollectionBankCard/CollectionBankCard.scss":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/CollectionBankCard/CollectionBankCard.scss ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#CBC {\n  height: 100%;\n  background: #EFEFF4;\n  padding: 0.42667rem;\n  padding-bottom: 0;\n  position: relative; }\n  #CBC .headTitle {\n    color: #333333;\n    line-height: 0.37333rem;\n    font-weight: bold; }\n  #CBC .storeName {\n    margin-top: 0.26667rem; }\n  #CBC .tips-warp-div {\n    display: flex;\n    align-items: center;\n    color: #666666;\n    line-height: 0.41333rem; }\n    #CBC .tips-warp-div:first-child {\n      margin-top: 0rem !important; }\n    #CBC .tips-warp-div .tipsIcon {\n      display: inline-block;\n      width: 0.37333rem;\n      height: 0.37333rem;\n      vertical-align: top;\n      margin-top: -0.08rem;\n      background-image: url(" + escape(__webpack_require__(/*! ../../assets/imgs/Tips.png */ "./src/assets/imgs/Tips.png")) + ");\n      background-size: cover;\n      background-repeat: no-repeat;\n      margin-right: 0.04rem; }\n  #CBC .bankCard-selector-div {\n    background: #ffffff;\n    border-radius: 0.10667rem;\n    height: 1.33333rem;\n    display: flex;\n    align-self: center;\n    align-items: center;\n    margin-top: 0.26667rem;\n    padding-right: 0.53333rem; }\n    #CBC .bankCard-selector-div .bankIcon {\n      height: 0.8rem;\n      width: 0.8rem;\n      background-size: cover;\n      margin-left: 0.42667rem;\n      margin-right: 0.21333rem; }\n    #CBC .bankCard-selector-div .bankName {\n      flex: 1;\n      font-size: 0.42667rem;\n      color: #333333;\n      letter-spacing: 0;\n      line-height: 0.42667rem; }\n    #CBC .bankCard-selector-div .gray {\n      color: #999999; }\n  #CBC .inner {\n    height: 1.33333rem; }\n", ""]);

// exports
exports.locals = {
	"CBC": "CBC",
	"headTitle": "headTitle",
	"storeName": "storeName",
	"tips-warp-div": "tips-warp-div",
	"tipsIcon": "tipsIcon",
	"bankCard-selector-div": "bankCard-selector-div",
	"bankIcon": "bankIcon",
	"bankName": "bankName",
	"gray": "gray",
	"inner": "inner"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/CollectionBankCard/CollectionBankCard.scss":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/CollectionBankCard/CollectionBankCard.scss ***!
  \********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./CollectionBankCard.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/CollectionBankCard/CollectionBankCard.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("748257c6", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/CollectionBankCard/CollectionBankCard.js":
/*!*****************************************************************!*\
  !*** ./src/components/CollectionBankCard/CollectionBankCard.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./CollectionBankCard.scss */ "./src/components/CollectionBankCard/CollectionBankCard.scss");

var _Cardlist = __webpack_require__(/*! ../Tools/Cardlist/Cardlist */ "./src/components/Tools/Cardlist/Cardlist.js");

var _Cardlist2 = _interopRequireDefault(_Cardlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

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
                addCard = _props.addCard,
                handleChangeCard = _props.handleChangeCard,
                cardList = _props.cardList,
                mchntDetail = _props.mchntDetail;
            var cardNo = mchntDetail.cardNo,
                bankNm = mchntDetail.bankNm,
                cardType = mchntDetail.cardType,
                iconRelUrl = mchntDetail.iconRelUrl;

            var cardUsing = {
                pan: cardNo,
                bank: bankNm,
                cardType: cardType,
                iconRelUrl: iconRelUrl
            };
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
                            addSeneNo: "10020", data: cardList, value: cardUsing, haveAddCard: true,
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
    }, {
        key: "__reactstandin__regenerateByEval",
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
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
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(CollectionBankCard, "CollectionBankCard", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/CollectionBankCard/CollectionBankCard.js");
    reactHotLoader.register(ShowSelectedCard, "ShowSelectedCard", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/CollectionBankCard/CollectionBankCard.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/CollectionBankCard/CollectionBankCard.scss":
/*!*******************************************************************!*\
  !*** ./src/components/CollectionBankCard/CollectionBankCard.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./CollectionBankCard.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/CollectionBankCard/CollectionBankCard.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/CollectionBankCard/CollectionBankCardContainer.js":
/*!**************************************************************************!*\
  !*** ./src/components/CollectionBankCard/CollectionBankCardContainer.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _modal = __webpack_require__(/*! antd-mobile/lib/modal */ "./node_modules/antd-mobile/lib/modal/index.js");

var _modal2 = _interopRequireDefault(_modal);

var _Cardlist = __webpack_require__(/*! ../Tools/Cardlist/Cardlist */ "./src/components/Tools/Cardlist/Cardlist.js");

var _Cardlist2 = _interopRequireDefault(_Cardlist);

var _CollectionBankCard = __webpack_require__(/*! ./CollectionBankCard */ "./src/components/CollectionBankCard/CollectionBankCard.js");

var _CollectionBankCard2 = _interopRequireDefault(_CollectionBankCard);

var _config = __webpack_require__(/*! ../../assets/util/config */ "./src/assets/util/config.js");

var _config2 = _interopRequireDefault(_config);

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _store = __webpack_require__(/*! ../../store/store */ "./src/store/store.js");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__(/*! ../../store/action */ "./src/store/action.js");

var _cacheStorage = __webpack_require__(/*! ../../assets/util/cacheStorage */ "./src/assets/util/cacheStorage.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

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

                // 设置store中的收款银行卡信息
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
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
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
                        // 更新redux中的收款银行卡信息
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

var _default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(CollectionBankCardContainer);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(CollectionBankCardContainer, 'CollectionBankCardContainer', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/CollectionBankCard/CollectionBankCardContainer.js');
    reactHotLoader.register(mapstateToProps, 'mapstateToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/CollectionBankCard/CollectionBankCardContainer.js');
    reactHotLoader.register(mapDispathToProps, 'mapDispathToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/CollectionBankCard/CollectionBankCardContainer.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/CollectionBankCard/CollectionBankCardContainer.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ })

}]);