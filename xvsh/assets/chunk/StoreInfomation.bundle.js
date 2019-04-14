(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["StoreInfomation"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/StoreInfomation/StoreInfomation.scss":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/StoreInfomation/StoreInfomation.scss ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#si {\n  height: 100%;\n  background: #EFEFF4;\n  padding: 0.42667rem;\n  padding-bottom: 0;\n  position: relative; }\n  #si .headTitle {\n    color: #333333;\n    line-height: 0.37333rem;\n    font-weight: bold; }\n  #si .storeName {\n    margin-top: 0.26667rem; }\n  #si .recommend {\n    margin-top: 0.42667rem; }\n  #si .bankCard-selector-div {\n    background: #ffffff;\n    border-radius: 0.10667rem;\n    height: 1.33333rem;\n    display: flex;\n    align-self: center;\n    align-items: center;\n    margin-top: 0.42667rem;\n    padding-right: 0.53333rem; }\n    #si .bankCard-selector-div .bankIcon {\n      height: 0.8rem;\n      width: 0.8rem;\n      background-size: cover;\n      margin-left: 0.42667rem;\n      margin-right: 0.21333rem; }\n    #si .bankCard-selector-div .bankName {\n      flex: 1;\n      font-size: 0.42667rem;\n      color: #333333;\n      letter-spacing: 0;\n      line-height: 0.42667rem; }\n    #si .bankCard-selector-div .gray {\n      color: #999999; }\n  #si .inner {\n    height: 1.33333rem; }\n", ""]);

// exports
exports.locals = {
	"si": "si",
	"headTitle": "headTitle",
	"storeName": "storeName",
	"recommend": "recommend",
	"bankCard-selector-div": "bankCard-selector-div",
	"bankIcon": "bankIcon",
	"bankName": "bankName",
	"gray": "gray",
	"inner": "inner"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/StoreInfomation/StoreInfomation.scss":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/StoreInfomation/StoreInfomation.scss ***!
  \**************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./StoreInfomation.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/StoreInfomation/StoreInfomation.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("1a5b1ec4", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/StoreInfomation/StoreInfomation.js":
/*!***********************************************************!*\
  !*** ./src/components/StoreInfomation/StoreInfomation.js ***!
  \***********************************************************/
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

__webpack_require__(/*! ./StoreInfomation.scss */ "./src/components/StoreInfomation/StoreInfomation.scss");

var _button = __webpack_require__(/*! antd-mobile/lib/button */ "./node_modules/antd-mobile/lib/button/index.js");

var _button2 = _interopRequireDefault(_button);

var _inputItem = __webpack_require__(/*! antd-mobile/lib/input-item */ "./node_modules/antd-mobile/lib/input-item/index.js");

var _inputItem2 = _interopRequireDefault(_inputItem);

var _Cardlist = __webpack_require__(/*! ../Tools/Cardlist/Cardlist */ "./src/components/Tools/Cardlist/Cardlist.js");

var _Cardlist2 = _interopRequireDefault(_Cardlist);

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var StoreInfomation = function (_React$Component) {
    (0, _inherits3.default)(StoreInfomation, _React$Component);

    function StoreInfomation(props, context) {
        (0, _classCallCheck3.default)(this, StoreInfomation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (StoreInfomation.__proto__ || (0, _getPrototypeOf2.default)(StoreInfomation)).call(this, props, context));

        _this.clickError = function (msg) {
            // console.log('aa')
            (0, _request.toast)(msg);
        };

        return _this;
    }

    (0, _createClass3.default)(StoreInfomation, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                storename = _props.storename,
                storeReceiveCardObj = _props.storeReceiveCardObj,
                recommendPhone = _props.recommendPhone,
                showRecommondPhone = _props.showRecommondPhone,
                changeStoreName = _props.changeStoreName,
                cardList = _props.cardList,
                handleChangeCard = _props.handleChangeCard,
                addCard = _props.addCard,
                changeRecommendPhone = _props.changeRecommendPhone,
                handleClick = _props.handleClick;
            var _false = false,
                error = _false.error,
                error2 = _false.error2;

            if (this.props.storename.length > 20) {
                error = true;
            } else {
                error = false;
            }

            if (!!this.props.recommendPhone && !_request.regPhone.test(this.props.recommendPhone)) {
                error2 = true;
            } else {
                error2 = false;
            }

            return _react2.default.createElement(
                "div",
                { id: "si" },
                _react2.default.createElement(
                    "div",
                    { id: "contentWarp" },
                    _react2.default.createElement(
                        "div",
                        { className: "headTitle" },
                        "\u8BF7\u586B\u5199\u6536\u6B3E\u4FE1\u606F"
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "storeName inputWap" },
                        _react2.default.createElement(
                            _inputItem2.default,
                            { clear: true, placeholder: "\u6700\u591A20\u4E2A\u5B57\u7B26", error: error,
                                value: storename,
                                onChange: function onChange(val) {
                                    changeStoreName(val);
                                },
                                onErrorClick: this.clickError.bind(this, "您输入的店铺名称过长")
                            },
                            "\u5E97\u94FA\u540D\u79F0"
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "tips-warp-div" },
                        _react2.default.createElement("i", { className: "tipsIcon" }),
                        "\u8BE5\u540D\u79F0\u5C06\u5C55\u793A\u5728\u987E\u5BA2\u7684\u4ED8\u6B3E\u9875\u9762"
                    ),
                    _react2.default.createElement(
                        _Cardlist2.default,
                        { addSeneNo: "10020", data: cardList, value: storeReceiveCardObj,
                            haveAddCard: true, addCardCallback: addCard, title: '选择收款银行卡',
                            onChange: handleChangeCard },
                        _react2.default.createElement(ShowSelectedCard, null)
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "tips-warp-div" },
                        _react2.default.createElement("i", { className: "tipsIcon" }),
                        "\u9700\u6DFB\u52A0\u672C\u4EBA\u50A8\u84C4\u5361\uFF0C\u6536\u6B3E\u7801\u7684\u94B1\u5C06\u76F4\u63A5\u6253\u5230\u8BE5\u5361\u4E2D"
                    ),
                    !!showRecommondPhone && _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _react2.default.createElement(
                            "div",
                            { className: "recommend inputWap" },
                            _react2.default.createElement(
                                _inputItem2.default,
                                { clear: true, placeholder: "\u63A8\u8350\u4EBA\u624B\u673A\u53F7", error: error2,
                                    value: recommendPhone, onChange: changeRecommendPhone,
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
                    { className: "submit-warp-button", style: { paddingLeft: 0, paddingRight: 0 } },
                    _react2.default.createElement(
                        _button2.default,
                        { type: "primary", onClick: handleClick },
                        "\u4E0B\u4E00\u6B65"
                    )
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
    return StoreInfomation;
}(_react2.default.Component);

exports.default = StoreInfomation;


var ShowSelectedCard = function ShowSelectedCard(props) {

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
            _react2.default.createElement("i", { className: "rightArrow" })
        ) : _react2.default.createElement(
            "div",
            { className: "bankCard-selector-div", onClick: props.onClick },
            _react2.default.createElement(
                "span",
                { className: "bankName gray", style: { textAlign: "center" } },
                "\u70B9\u51FB\u6B64\u5904\u9009\u62E9\u60A8\u7684\u94F6\u884C\u5361"
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

    reactHotLoader.register(StoreInfomation, "StoreInfomation", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/StoreInfomation/StoreInfomation.js");
    reactHotLoader.register(ShowSelectedCard, "ShowSelectedCard", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/StoreInfomation/StoreInfomation.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/StoreInfomation/StoreInfomation.scss":
/*!*************************************************************!*\
  !*** ./src/components/StoreInfomation/StoreInfomation.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./StoreInfomation.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/StoreInfomation/StoreInfomation.scss");

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

/***/ "./src/components/StoreInfomation/StoreInfomationActions.js":
/*!******************************************************************!*\
  !*** ./src/components/StoreInfomation/StoreInfomationActions.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyMccCode = applyMccCode;

var _config = __webpack_require__(/*! ../../assets/util/config */ "./src/assets/util/config.js");

var _config2 = _interopRequireDefault(_config);

var _modal = __webpack_require__(/*! antd-mobile/lib/modal */ "./node_modules/antd-mobile/lib/modal/index.js");

var _modal2 = _interopRequireDefault(_modal);

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();
// import store from '../../store/store'
// import {UPDATE_STORE_STATE} from "../../store/action";


/**
 * 申请收款码
 * @param history router中的history
 * @param param   请求参数
 */
function applyMccCode(history, param) {
    (0, _requestAPI.applyMcc)(param).then(function (response) {
        if (response.statusCode == _config2.default.STATUSCODE.SUCCESS) {
            //通知客户端修改状态
            (0, _request.mccStateChanged)();

            // if (response.data.redCodeSt == "00" || response.data.redCodeSt == "02") {
            //     //如果用户未申请红包码或者不再黑名单则让用户去申请红包码和收款码
            //     history.push({pathname: "/applyCommdityOfRedBag/storeInfo"})
            // }
            // else {
            //     //否则用户只可以申请收款码
            //     history.push({pathname: "/applyCommdity/storeInfo"})
            // }
            if (!!response.data.redCodeSt) {
                history.push({
                    pathname: "/applyCommdity/storeInfo",
                    search: "?redCodeSt=" + response.data.redCodeSt
                });
            } else {
                history.push({
                    pathname: "/applyCommdity/storeInfo"
                });
            }
        } else {
            _modal2.default.alert('申请失败', response.msg, [{
                text: '确认', onPress: function onPress() {}
            }]);
        }
    });
}

/**
 * 判定是否显示推荐人手机号的输入框
 */
// export function isShowRecommondPhone() {
//     isBlack().then((response) => {
//         console.log("判定是否在黑名单：" + response.data.blackSt)
//         if (response.statusCode == CONFIG.STATUSCODE.SUCCESS) {
//             if (response.data.blackSt == "1") {
//                 //在黑名单中则不显示推荐人手机号的输入框
//                 store.dispatch(UPDATE_STORE_STATE({
//                     showRecommondPhone: false
//                 }))
//             }
//             else {
//                 //根据是否申请过红包码判定是否显示推荐人手机号的输入框
//                 return isApply();
//             }
//         }
//     }).then((response) => {
//         console.log("判定是否已经申请红包码：" + response.data.applySt)
//         if (response.statusCode == CONFIG.STATUSCODE.SUCCESS) {
//             if (response.data.applySt == "1") {
//                 //已经申请红包码
//                 store.dispatch(UPDATE_STORE_STATE({
//                     showRecommondPhone: false
//                 }))
//             }
//             else {
//                 //未申请红包码
//                 store.dispatch(UPDATE_STORE_STATE({
//                     showRecommondPhone: true
//                 }))
//             }
//         }
//     })
// }

;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(applyMccCode, 'applyMccCode', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/StoreInfomation/StoreInfomationActions.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/StoreInfomation/StoreInfomationContainer.js":
/*!********************************************************************!*\
  !*** ./src/components/StoreInfomation/StoreInfomationContainer.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

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

var _StoreInfomationActions = __webpack_require__(/*! ./StoreInfomationActions */ "./src/components/StoreInfomation/StoreInfomationActions.js");

var _StoreInfomation = __webpack_require__(/*! ./StoreInfomation */ "./src/components/StoreInfomation/StoreInfomation.js");

var _StoreInfomation2 = _interopRequireDefault(_StoreInfomation);

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _store = __webpack_require__(/*! ../../store/store */ "./src/store/store.js");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__(/*! ../../store/action */ "./src/store/action.js");

var _Cardlist = __webpack_require__(/*! ../Tools/Cardlist/Cardlist */ "./src/components/Tools/Cardlist/Cardlist.js");

var _Cardlist2 = _interopRequireDefault(_Cardlist);

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

var _cacheStorage = __webpack_require__(/*! ../../assets/util/cacheStorage */ "./src/assets/util/cacheStorage.js");

var _config = __webpack_require__(/*! ../../assets/util/config */ "./src/assets/util/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var StoreInfomationContainer = function (_Component) {
    (0, _inherits3.default)(StoreInfomationContainer, _Component);

    function StoreInfomationContainer() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, StoreInfomationContainer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = StoreInfomationContainer.__proto__ || (0, _getPrototypeOf2.default)(StoreInfomationContainer)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
            var _this$props = _this.props,
                storename = _this$props.storename,
                storeReceiveCardObj = _this$props.storeReceiveCardObj,
                recommendPhone = _this$props.recommendPhone,
                showRecommondPhone = _this$props.showRecommondPhone,
                history = _this$props.history;

            if (storename.length > 20 || storename.length == 0) {
                (0, _request.toast)("您输入有效的店铺名称");
            } else if (!!recommendPhone && !_request.regPhone.test(_this.props.recommendPhone)) {
                (0, _request.toast)("请输入合法的手机号");
            } else if (!storeReceiveCardObj.virtualCardNo) {
                (0, _request.toast)("请选择您的银行卡");
            } else {
                if (showRecommondPhone) {
                    (0, _request.getCurrentLocationInfo)(function (city) {
                        (0, _StoreInfomationActions.applyMccCode)(history, {
                            refereeTel: recommendPhone,
                            virtualCardNo: storeReceiveCardObj.virtualCardNo,
                            accNm: storename,
                            cityCd: city.cityCd
                        });
                    });
                } else {
                    (0, _request.getCurrentLocationInfo)(function (city) {
                        (0, _StoreInfomationActions.applyMccCode)(history, {
                            virtualCardNo: storeReceiveCardObj.virtualCardNo,
                            accNm: storename,
                            cityCd: city.cityCd
                        });
                    });
                }
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(StoreInfomationContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //设置网页title
            (0, _request.beforeEnterRouter)('申请商户收款码');
            //获取银行卡列表
            (0, _requestAPI.getCardlist)();
            //根据是否申请过红包码判定是否显示推荐关系。
            (0, _requestAPI.isBlack)(function (resp) {
                console.log('isBlack:我是真正的update函数');
            }).then(function (response) {
                if (response.data.blackSt == "0") {
                    (0, _requestAPI.isApply)();
                }
                // 通知update函数，succes已经执行完毕
                if (!!response.fuc) {
                    response.fuc.endOfFunc();
                }
            });
        }

        /**
         * 处理下一步的操作
         */

    }, {
        key: 'render',
        value: function render() {
            var showRecommondPhone = false;
            var _props = this.props,
                isblack = _props.isblack,
                isApply = _props.isApply;


            if (isblack == "0" && isApply == "0") {
                //用户不在黑名单并且 未申请过红包码，显示推荐手机
                showRecommondPhone = true;
            }
            return _react2.default.createElement(_StoreInfomation2.default, (0, _extends3.default)({}, this.props, { showRecommondPhone: showRecommondPhone, handleClick: this.handleClick }));
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return StoreInfomationContainer;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {

    //检查店铺名称中是否有转换的emoj表情，转回utf16
    var storename = (0, _request.entitiesToUtf16)(state.getIn(["mchntDetail", "storeNm"]));

    return {
        storename: storename,
        storeReceiveCardObj: state.getIn(["storeReceiveCardObj"]).toJS(),
        cardList: state.getIn(['cardList']).toJS(),
        recommendPhone: state.getIn(["recommendPhone"]),
        isblack: state.getIn(["blackSt"]),
        isApply: state.getIn(["applySt"])

        // showRecommondPhone:state.getIn(["showRecommondPhone"])
    };
};

var mapDispathToProps = function mapDispathToProps(dispatch) {
    /**
     * 用于用户更新Redux中的店铺名称
     */
    var changeStoreName = function changeStoreName(value) {
        var realVal = (0, _request.utf16ToEntities)(value);
        dispatch((0, _action.UPDATE_STORE_STATE)({ mchntDetail: { storeNm: realVal } }));
    };

    /**
     * 处理银行卡的切换
     * @param val  选中的卡对象
     * @param resolve Promise的resolve 函数
     * @param reject  Promis的reject 函数
     */
    var handleChangeCard = function handleChangeCard(val, resolve, reject) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ storeReceiveCardObj: val }));
        resolve();
        _Cardlist2.default.Close();
    };

    /**
     * 通过调用客户端插件添加新的银行卡
     * @param result  添加银行卡的结果  selectIn{'success','fail'}
     */
    var addCard = function addCard(result) {
        console.log("添加银行卡成功");
        if (result == "success") {
            (0, _cacheStorage.removeCache)(_config2.default.CACHEKEY.getMccCardList.rollKey, _config2.default.CACHEKEY.getMccCardList.secondKey);
            (0, _requestAPI.getCardlist)();
        }
        _Cardlist2.default.Close();
    };

    /**
     * 更改redux中的推荐人手机号的值
     * @param value 用户输入的值
     */
    var changeRecommendPhone = function changeRecommendPhone(value) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ recommendPhone: value }));
    };

    return {
        changeStoreName: changeStoreName,
        handleChangeCard: handleChangeCard,
        addCard: addCard,
        changeRecommendPhone: changeRecommendPhone
    };
};

var _default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(StoreInfomationContainer);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(StoreInfomationContainer, 'StoreInfomationContainer', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/StoreInfomation/StoreInfomationContainer.js');
    reactHotLoader.register(mapstateToProps, 'mapstateToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/StoreInfomation/StoreInfomationContainer.js');
    reactHotLoader.register(mapDispathToProps, 'mapDispathToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/StoreInfomation/StoreInfomationContainer.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/StoreInfomation/StoreInfomationContainer.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ })

}]);