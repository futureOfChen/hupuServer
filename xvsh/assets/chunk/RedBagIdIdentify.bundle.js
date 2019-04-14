(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["RedBagIdIdentify"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagIdIdentify/RedBagIdIdentify.scss":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/RedBagIdIdentify/RedBagIdIdentify.scss ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#rbii {\n  height: 100%;\n  background: #EFEFF4; }\n  #rbii .pad32 {\n    padding: 0 0.42667rem;\n    padding-top: 0.42667rem; }\n  #rbii .inputRowIntroduce {\n    display: block;\n    font-size: 0.37333rem;\n    color: #666666;\n    line-height: 0.37333rem; }\n    #rbii .inputRowIntroduce.mt59 {\n      margin-top: 0.78667rem; }\n  #rbii .inputRow {\n    margin-top: 0.32rem; }\n    #rbii .inputRow .rowLabel {\n      display: inline-block;\n      font-size: 0.42667rem;\n      color: #333333;\n      letter-spacing: 0;\n      line-height: 0.42667rem;\n      font-weight: bold;\n      width: 1.28rem; }\n    #rbii .inputRow .rowInfo {\n      margin-left: 0.53333rem;\n      font-size: 0.42667rem;\n      color: #666666;\n      letter-spacing: 0;\n      line-height: 0.42667rem; }\n    #rbii .inputRow.mt32 {\n      margin-top: 0.42667rem; }\n  #rbii .recommend {\n    margin-top: 0.28rem; }\n", ""]);

// exports
exports.locals = {
	"rbii": "rbii",
	"pad32": "pad32",
	"inputRowIntroduce": "inputRowIntroduce",
	"mt59": "mt59",
	"inputRow": "inputRow",
	"rowLabel": "rowLabel",
	"rowInfo": "rowInfo",
	"mt32": "mt32",
	"recommend": "recommend"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagIdIdentify/RedBagIdIdentify.scss":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/RedBagIdIdentify/RedBagIdIdentify.scss ***!
  \****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./RedBagIdIdentify.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagIdIdentify/RedBagIdIdentify.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("090dc729", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/RedBagIdIdentify/RedBagIdIdentify.js":
/*!*************************************************************!*\
  !*** ./src/components/RedBagIdIdentify/RedBagIdIdentify.js ***!
  \*************************************************************/
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

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _button = __webpack_require__(/*! antd-mobile/lib/button */ "./node_modules/antd-mobile/lib/button/index.js");

var _button2 = _interopRequireDefault(_button);

var _inputItem = __webpack_require__(/*! antd-mobile/lib/input-item */ "./node_modules/antd-mobile/lib/input-item/index.js");

var _inputItem2 = _interopRequireDefault(_inputItem);

__webpack_require__(/*! ./RedBagIdIdentify.scss */ "./src/components/RedBagIdIdentify/RedBagIdIdentify.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

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
    }, {
        key: "__reactstandin__regenerateByEval",
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return RedBagIdIdentify;
}(_react2.default.Component);

exports.default = RedBagIdIdentify;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(RedBagIdIdentify, "RedBagIdIdentify", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/RedBagIdIdentify/RedBagIdIdentify.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/RedBagIdIdentify/RedBagIdIdentify.scss":
/*!***************************************************************!*\
  !*** ./src/components/RedBagIdIdentify/RedBagIdIdentify.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./RedBagIdIdentify.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagIdIdentify/RedBagIdIdentify.scss");

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

/***/ "./src/components/RedBagIdIdentify/RedBagIdIdentifyActions.js":
/*!********************************************************************!*\
  !*** ./src/components/RedBagIdIdentify/RedBagIdIdentifyActions.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.recmdRedCode = recmdRedCode;

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

function recmdRedCode(history, phone, type) {
    (0, _requestAPI.recmdRecord)(phone).then(function () {
        if (type == "code") {
            history.push({ pathname: '/redBagCode/code' });
        } else {
            history.push({ pathname: "/applyCommdityOfRedBagSingle/storeInfo" });
        }
    });
}
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(recmdRedCode, "recmdRedCode", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/RedBagIdIdentify/RedBagIdIdentifyActions.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/RedBagIdIdentify/RedBagIdIdentifyContainers.js":
/*!***********************************************************************!*\
  !*** ./src/components/RedBagIdIdentify/RedBagIdIdentifyContainers.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _RedBagIdIdentifyActions = __webpack_require__(/*! ./RedBagIdIdentifyActions */ "./src/components/RedBagIdIdentify/RedBagIdIdentifyActions.js");

var _RedBagIdIdentify = __webpack_require__(/*! ./RedBagIdIdentify */ "./src/components/RedBagIdIdentify/RedBagIdIdentify.js");

var _RedBagIdIdentify2 = _interopRequireDefault(_RedBagIdIdentify);

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _action = __webpack_require__(/*! ../../store/action */ "./src/store/action.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

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
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
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

var _default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(RedBagIdIdentifyContainers);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(RedBagIdIdentifyContainers, 'RedBagIdIdentifyContainers', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/RedBagIdIdentify/RedBagIdIdentifyContainers.js');
    reactHotLoader.register(mapstateToProps, 'mapstateToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/RedBagIdIdentify/RedBagIdIdentifyContainers.js');
    reactHotLoader.register(mapDispathToProps, 'mapDispathToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/RedBagIdIdentify/RedBagIdIdentifyContainers.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/RedBagIdIdentify/RedBagIdIdentifyContainers.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ })

}]);