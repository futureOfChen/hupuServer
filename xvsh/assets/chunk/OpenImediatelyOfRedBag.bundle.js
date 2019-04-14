(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["OpenImediatelyOfRedBag"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/OpenImediatelyOfRedBag/OpenImediately.scss":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/OpenImediatelyOfRedBag/OpenImediately.scss ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#oi2 {\n  text-align: center;\n  height: 100%;\n  position: relative;\n  background: #EFEFF4; }\n  #oi2 label, #oi2 span {\n    display: block; }\n  #oi2 .head {\n    padding-top: 0.53333rem; }\n    #oi2 .head label {\n      font-size: 0.48rem;\n      color: #333333;\n      letter-spacing: 0.05333rem;\n      line-height: 0.64rem;\n      font-weight: bold; }\n  #oi2 .content {\n    font-size: 0.37333rem;\n    margin-top: 0.42667rem;\n    color: #999999;\n    letter-spacing: 0;\n    line-height: 0.66667rem; }\n  #oi2 .introduc {\n    padding: 0 0.53333rem;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    flex-direction: row; }\n    #oi2 .introduc .introItem {\n      flex: 0 0 100%; }\n      #oi2 .introduc .introItem img {\n        width: 100%;\n        margin-top: 0.53333rem; }\n    #oi2 .introduc .mt37 {\n      margin-top: 0.49333rem; }\n", ""]);

// exports
exports.locals = {
	"oi2": "oi2",
	"head": "head",
	"content": "content",
	"introduc": "introduc",
	"introItem": "introItem",
	"mt37": "mt37"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/OpenImediatelyOfRedBag/OpenImediately.scss":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/OpenImediatelyOfRedBag/OpenImediately.scss ***!
  \********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./OpenImediately.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/OpenImediatelyOfRedBag/OpenImediately.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("02a0e8d2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/assets/imgs/redbag1.png":
/*!*************************************!*\
  !*** ./src/assets/imgs/redbag1.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/imgs/redbag1.png";

/***/ }),

/***/ "./src/assets/imgs/redbag2.png":
/*!*************************************!*\
  !*** ./src/assets/imgs/redbag2.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/imgs/redbag2.png";

/***/ }),

/***/ "./src/assets/imgs/redbag3.png":
/*!*************************************!*\
  !*** ./src/assets/imgs/redbag3.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/imgs/redbag3.png";

/***/ }),

/***/ "./src/components/OpenImediatelyOfRedBag/OpenImediately.js":
/*!*****************************************************************!*\
  !*** ./src/components/OpenImediatelyOfRedBag/OpenImediately.js ***!
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

__webpack_require__(/*! ./OpenImediately.scss */ "./src/components/OpenImediatelyOfRedBag/OpenImediately.scss");

var _button = __webpack_require__(/*! antd-mobile/lib/button */ "./node_modules/antd-mobile/lib/button/index.js");

var _button2 = _interopRequireDefault(_button);

var _redbag = __webpack_require__(/*! ../../assets/imgs/redbag1.png */ "./src/assets/imgs/redbag1.png");

var _redbag2 = _interopRequireDefault(_redbag);

var _redbag3 = __webpack_require__(/*! ../../assets/imgs/redbag2.png */ "./src/assets/imgs/redbag2.png");

var _redbag4 = _interopRequireDefault(_redbag3);

var _redbag5 = __webpack_require__(/*! ../../assets/imgs/redbag3.png */ "./src/assets/imgs/redbag3.png");

var _redbag6 = _interopRequireDefault(_redbag5);

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var OpenImediately = function (_React$Component) {
    (0, _inherits3.default)(OpenImediately, _React$Component);

    function OpenImediately(props, context) {
        (0, _classCallCheck3.default)(this, OpenImediately);

        var _this = (0, _possibleConstructorReturn3.default)(this, (OpenImediately.__proto__ || (0, _getPrototypeOf2.default)(OpenImediately)).call(this, props, context));

        _this.handleClick = function () {
            var search = _this.search;

            _this.props.history.push({
                pathname: '/redBagIdIdentify',
                search: _this.props.location.search
            });
        };

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(OpenImediately, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            (0, _request.beforeEnterRouter)("申请红包码");
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "oi2" },
                _react2.default.createElement(
                    "div",
                    { id: "contentWarp" },
                    _react2.default.createElement(
                        "div",
                        { className: "head" },
                        _react2.default.createElement(
                            "label",
                            null,
                            "\u6B22\u8FCE\u4F7F\u7528"
                        ),
                        _react2.default.createElement(
                            "label",
                            null,
                            "\u4E91\u95EA\u4ED8\u7EA2\u5305\u7801"
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(
                            "label",
                            null,
                            "\u63A8\u8350\u987E\u5BA2\u9886\u7EA2\u5305\uFF0C\u4F60\u8D5A\u8D4F\u91D1\uFF0C"
                        ),
                        _react2.default.createElement(
                            "label",
                            null,
                            "\u5929\u5929\u53D1\u7EA2\u5305\uFF0C\u8EBA\u7740\u4E5F\u8D5A\u94B1"
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "introduc" },
                        _react2.default.createElement(
                            "div",
                            { className: "introItem" },
                            _react2.default.createElement("img", { src: _redbag2.default, alt: "" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "introItem" },
                            _react2.default.createElement("img", { src: _redbag4.default, alt: "" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "introItem" },
                            _react2.default.createElement("img", { src: _redbag6.default, alt: "" })
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "submit-warp-button specialBtnBg" },
                    _react2.default.createElement(
                        _button2.default,
                        { type: "primary", onClick: this.handleClick },
                        "\u7ACB\u5373\u5F00\u901A"
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
    return OpenImediately;
}(_react2.default.Component);

exports.default = OpenImediately;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(OpenImediately, "OpenImediately", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/OpenImediatelyOfRedBag/OpenImediately.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/OpenImediatelyOfRedBag/OpenImediately.scss":
/*!*******************************************************************!*\
  !*** ./src/components/OpenImediatelyOfRedBag/OpenImediately.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./OpenImediately.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/OpenImediatelyOfRedBag/OpenImediately.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

}]);