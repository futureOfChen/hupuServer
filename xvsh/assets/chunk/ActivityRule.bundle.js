(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ActivityRule"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/ActivityRule/ActivityRule.scss":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/ActivityRule/ActivityRule.scss ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#pageWrapper {\n  background-color: #ba1703;\n  position: relative;\n  width: 10rem;\n  min-height: 100%;\n  margin: 0 auto;\n  box-sizing: border-box;\n  overflow: hidden; }\n  #pageWrapper .container {\n    position: relative;\n    overflow: hidden;\n    padding: 0 0.4rem 0.26667rem; }\n  #pageWrapper .blank-placeholder {\n    overflow: hidden;\n    height: 1.76rem; }\n  #pageWrapper .activity-block {\n    color: #333;\n    font-size: 0.32rem;\n    background-color: #fff;\n    margin: 0.96rem 0 0.32rem;\n    padding: 0.16rem;\n    border: 1px solid #b7e791;\n    border-radius: 0.16rem;\n    background-clip: padding-box; }\n  #pageWrapper .bg-kb {\n    background-image: url(" + escape(__webpack_require__(/*! ./img/bg_kb.jpg */ "./src/components/ActivityRule/img/bg_kb.jpg")) + ");\n    background-repeat: no-repeat;\n    background-position: 50% 0;\n    background-size: 100% auto; }\n  #pageWrapper .activity-title {\n    text-align: center;\n    font-size: 0.4rem;\n    width: 5.12rem;\n    height: 0.93333rem;\n    line-height: 0.93333rem;\n    border-radius: 0.4rem;\n    margin: -0.576rem auto 0;\n    border: 1px solid #b7e791;\n    background-clip: padding-box;\n    color: #95b979;\n    background-color: #fff;\n    border-color: #f5a623; }\n  #pageWrapper .activity-invite-title, #pageWrapper .activity-invite-block p, #pageWrapper .activity-title, #pageWrapper .activity-body h1, #pageWrapper .gift-title, #pageWrapper .invite-color, #pageWrapper .invite-activity-title, #pageWrapper .invite-list-title {\n    color: #e72c1a; }\n  #pageWrapper .activity-body {\n    padding: 0.32rem 0; }\n  #pageWrapper .activity-body h1 {\n    font-size: 0.42667rem;\n    font-weight: 400;\n    margin: 0;\n    line-height: 0.74667rem; }\n  #pageWrapper .activity-body p {\n    font-size: 0.37333rem;\n    color: #666;\n    margin: 0;\n    line-height: 0.74667rem; }\n", ""]);

// exports
exports.locals = {
	"pageWrapper": "pageWrapper",
	"container": "container",
	"blank-placeholder": "blank-placeholder",
	"activity-block": "activity-block",
	"bg-kb": "bg-kb",
	"activity-title": "activity-title",
	"activity-invite-title": "activity-invite-title",
	"activity-invite-block": "activity-invite-block",
	"activity-body": "activity-body",
	"gift-title": "gift-title",
	"invite-color": "invite-color",
	"invite-activity-title": "invite-activity-title",
	"invite-list-title": "invite-list-title"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/ActivityRule/ActivityRule.scss":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/ActivityRule/ActivityRule.scss ***!
  \********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./ActivityRule.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/ActivityRule/ActivityRule.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("de3eaa48", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/ActivityRule/ActivityRule.js":
/*!*****************************************************!*\
  !*** ./src/components/ActivityRule/ActivityRule.js ***!
  \*****************************************************/
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

__webpack_require__(/*! ./ActivityRule.scss */ "./src/components/ActivityRule/ActivityRule.scss");

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var ActivityRule = function (_React$Component) {
    (0, _inherits3.default)(ActivityRule, _React$Component);

    function ActivityRule(props, context) {
        (0, _classCallCheck3.default)(this, ActivityRule);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ActivityRule.__proto__ || (0, _getPrototypeOf2.default)(ActivityRule)).call(this, props, context));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(ActivityRule, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            (0, _request.beforeEnterRouter)("天天领红包");
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "wrapper", id: "pageWrapper" },
                _react2.default.createElement(
                    "div",
                    { className: "page-container", id: "page_redPacketCodeRule" },
                    _react2.default.createElement(
                        "div",
                        { className: "container bg-kb" },
                        _react2.default.createElement("div", { className: "blank-placeholder" }),
                        _react2.default.createElement(
                            "div",
                            { className: "activity-block" },
                            _react2.default.createElement(
                                "div",
                                { className: "activity-title" },
                                "\u626B\u7801\u9886\u7EA2\u5305\u6D3B\u52A8\u89C4\u5219"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "activity-body" },
                                _react2.default.createElement(
                                    "h1",
                                    null,
                                    "\u25C6\xA0\u6D3B\u52A8\u65F6\u95F4"
                                ),
                                _react2.default.createElement(
                                    "p",
                                    { className: "activity-content" },
                                    "2018.05.15-2018.08.31"
                                ),
                                _react2.default.createElement(
                                    "h1",
                                    null,
                                    "\u25C6\xA0\u6D3B\u52A8\u89C4\u5219"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "1\u3001\u6D3B\u52A8\u671F\u95F4\uFF0C\u7528\u6237\u901A\u8FC7\u6D3B\u52A8\u9875\u9762\u83B7\u5F97\u7EA2\u5305\uFF0C\u6240\u5F97\u7EA2\u5305\u53EF\u5728\u4E3B\u626B\u3001\u88AB\u626B\u62B5\u6263\u6D88\u8D39\u91D1\u989D\u3002"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "2\u3001\u540C\u4E00\u7528\u6237\u6D3B\u52A8\u671F\u95F4\u6BCF\u5929\u67091\u6B21\u9886\u53D6\u673A\u4F1A(\u4E0D\u540C\u5546\u5BB6\u5171\u4EAB)\uFF0C\u7EA2\u5305\u5168\u90E8\u4F7F\u7528\u540E\u624D\u53EF\u83B7\u5F97\u4E0B\u4E00\u6B21\u9886\u53D6\u673A\u4F1A\uFF1B\u540C\u4E00\u8D26\u53F7\u3001\u624B\u673A\u53F7\u3001\u8EAB\u4EFD\u8BC1\u3001\u624B\u673A\u7EC8\u7AEF\uFF0C\u7B26\u5408\u4EE5\u4E0A\u4EFB\u4E00\u6761\u4EF6\u5747\u89C6\u4E3A\u540C\u4E00\u6237\u3002"
                                ),
                                _react2.default.createElement(
                                    "p",
                                    { className: "activity-content" },
                                    "3\u3001\u6D3B\u52A8\u671F\u95F4\u7EA2\u5305\u968F\u673A\u53D1\u9001\uFF0C\u53D1\u5B8C\u4E3A\u6B62\uFF1B\u7EA2\u5305\u9886\u53D6\u540E60\u65E5\u5185\u6709\u6548\uFF0C\u5DF2\u8FC7\u671F\u7EA2\u5305\u5C06\u4E0D\u5B9A\u671F\u6536\u56DE\u3002"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "4\u3001\u82E5\u4EAB\u53D7\u4F18\u60E0\u7684\u4EA4\u6613\u53D1\u751F\u9000\u6B3E\uFF0C\u4EC5\u9000\u8FD8\u5B9E\u9645\u652F\u4ED8\u7684\u91D1\u989D\uFF0C\u4E0D\u518D\u9000\u8FD8\u5DF2\u4EAB\u4F18\u60E0\u8D44\u683C\u3002"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "5\u3001\u7EA2\u5305\u53EF\u62C6\u5206\u591A\u6B21\u4F7F\u7528\uFF1B\u7528\u6237\u4E0D\u80FD\u540C\u65F6\u4EAB\u53D7\u7EA2\u5305\u3001\u7ACB\u51CF\u7B49\u4F18\u60E0\uFF0C\u4F18\u5148\u4EAB\u53D7\u7ACB\u51CF\u7B49\u4F18\u60E0\u3002"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "6\u3001\u5982\u7528\u6237\u51FA\u73B0\u8FDD\u89C4\u884C\u4E3A(\u5982\u865A\u5047\u4EA4\u6613\u3001\u4F5C\u5F0A\u3001\u6076\u610F\u5957\u53D6\u73B0\u91D1\u3001\u5237\u4FE1\u7B49)\uFF0C\u4E91\u95EA\u4ED8APP\u5C06\u64A4\u9500\u60A8\u7684\u6D3B\u52A8\u53C2\u4E0E\u8D44\u683C\uFF0C\u5E76\u6709\u6743\u64A4\u9500\u8FDD\u89C4\u4EA4\u6613\uFF0C\u56DE\u6536\u60A8\u5DF2\u7ECF\u83B7\u5F97\u7684\u4F18\u60E0\u91D1\u989D(\u5305\u62EC\u5DF2\u6D88\u8D39\u91D1\u989D)\u3002"
                                ),
                                _react2.default.createElement(
                                    "p",
                                    { className: "activity-content" },
                                    "7\u3001\u9650\u4F7F\u7528\u4E91\u95EA\u4ED8APP\u82F9\u679C\u5BA2\u6237\u7AEF5.0.6\u3001\u5B89\u5353\u5BA2\u6237\u7AEF5.0.9\u53CA\u4EE5\u4E0A\u7248\u672C\u53C2\u4E0E\u6D3B\u52A8\u3002"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "8\u3001\u7EA2\u5305\u4EC5\u9650\u5728\u4E2D\u56FD\u5927\u9646\u5730\u533A\u4F7F\u7528\u3002"
                                )
                            )
                        )
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
    return ActivityRule;
}(_react2.default.Component);

exports.default = ActivityRule;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(ActivityRule, "ActivityRule", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ActivityRule/ActivityRule.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/ActivityRule/ActivityRule.scss":
/*!*******************************************************!*\
  !*** ./src/components/ActivityRule/ActivityRule.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./ActivityRule.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/ActivityRule/ActivityRule.scss");

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

/***/ "./src/components/ActivityRule/img/bg_kb.jpg":
/*!***************************************************!*\
  !*** ./src/components/ActivityRule/img/bg_kb.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/imgs/bg_kb.jpg";

/***/ })

}]);