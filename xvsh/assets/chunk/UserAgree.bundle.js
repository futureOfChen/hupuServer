(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["UserAgree"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/AgreeMenagement/agree.scss":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/AgreeMenagement/agree.scss ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".commonAgreeClass {\n  padding: 0 0.26667rem;\n  font-size: 0.32rem;\n  color: #555; }\n  .commonAgreeClass .bold {\n    font-weight: bold; }\n  .commonAgreeClass h2, .commonAgreeClass h1 {\n    font-size: 0.37333rem;\n    font-weight: bold;\n    color: #474747; }\n  .commonAgreeClass h2 {\n    margin-top: 0.26667rem; }\n  .commonAgreeClass .about_tit {\n    text-align: left;\n    padding: 20px 0;\n    border-bottom: 1px solid #CCC; }\n  .commonAgreeClass p {\n    padding: 0.13333rem 0 0.13333rem 0.4rem;\n    line-height: 180%; }\n\n#payAgree h2, #payAgree h1 {\n  text-align: center; }\n", ""]);

// exports
exports.locals = {
	"commonAgreeClass": "commonAgreeClass",
	"bold": "bold",
	"about_tit": "about_tit",
	"payAgree": "payAgree"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/AgreeMenagement/agree.scss":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/AgreeMenagement/agree.scss ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./agree.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/AgreeMenagement/agree.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("1db5e85e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/AgreeMenagement/UserAgree.js":
/*!*****************************************************!*\
  !*** ./src/components/AgreeMenagement/UserAgree.js ***!
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

__webpack_require__(/*! ./agree.scss */ "./src/components/AgreeMenagement/agree.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var UserAgree = function (_React$Component) {
    (0, _inherits3.default)(UserAgree, _React$Component);

    function UserAgree(props, context) {
        (0, _classCallCheck3.default)(this, UserAgree);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UserAgree.__proto__ || (0, _getPrototypeOf2.default)(UserAgree)).call(this, props, context));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(UserAgree, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "userAgree", className: "commonAgreeClass" },
                _react2.default.createElement(
                    "h1",
                    { className: "about_tit" },
                    "\u8BF7\u8BA4\u771F\u9605\u8BFB\u5E76\u7406\u89E3\u300A\u94F6\u8054\u7528\u6237\u670D\u52A1\u534F\u8BAE\u300B\u7B2C\u56DB\u90E8\u5206\u7B2C\u4E03\u6761\u6B3E\u7684\u5185\u5BB9\uFF1A"
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u4E03\u3001\u6536\u6B3E\u7801\u670D\u52A1\u4F7F\u7528\u6761\u6B3E"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "1\u3001\u201C\u6536\u6B3E\u7801\u670D\u52A1\u201D\u662F\u6307\u5176\u4ED6\u94F6\u8054\u7528\u6237\u626B\u63CF\u60A8\u672C\u4EBA\u5728\u4E91\u95EA\u4ED8APP\u7533\u8BF7\u7684\u4E8C\u7EF4\u7801\u540E\uFF0C\u53EF\u5411\u60A8\u4ED8\u6B3E\uFF08\u8F6C\u8D26\uFF09\uFF0C\u7531\u4E2D\u56FD\u94F6\u8054\u4ECE\u4ED8\u6B3E\u4EBA\u94F6\u884C\u5361\u5185\u6263\u9664\u8BE5\u7B14\u6B3E\u9879\u5E76\u8F6C\u5165\u5230\u60A8\u6307\u5B9A\u94F6\u884C\u5361\u7684\u670D\u52A1\uFF0C\u4EE5\u4E0B\u7B80\u79F0\u4E3A\u201C\u6536\u6B3E\u7801\u670D\u52A1\u201D\u6216\u201C\u672C\u670D\u52A1\u201D\uFF0C\u8BE5\u4E8C\u7EF4\u7801\u5373\u79F0\u4E3A\u6536\u6B3E\u7801\u3002\u672C\u670D\u52A1\u5F53\u524D\u4EC5\u9650\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u5883\u5185\uFF08\u4E0D\u5305\u542B\u9999\u6E2F\u3001\u6FB3\u95E8\u3001\u53F0\u6E7E\uFF09\u4F7F\u7528\u3002"
                ),
                _react2.default.createElement(
                    "p",
                    { className: "bold" },
                    "2\u3001\u60A8\u627F\u8BFA\u5728\u4F7F\u7528\u201D\u6536\u6B3E\u7801\u670D\u52A1\u201D\u65F6\uFF0C\u5E94\u9075\u5B88\u56FD\u5BB6\u6CD5\u5F8B\u3001\u6CD5\u89C4\u548C\u94F6\u884C\u3001\u94F6\u8054\u7684\u76F8\u5173\u534F\u8BAE\u7EA6\u5B9A\u4EE5\u53CA\u793E\u4F1A\u516C\u5171\u5229\u76CA\u6216\u516C\u5171\u9053\u5FB7\uFF0C\u4E0D\u5F97\u5C06\u672C\u670D\u52A1\u7528\u4E8E\u6B3A\u8BC8\u3001\u5957\u73B0\u3001\u8D4C\u535A\u3001\u6D89\u9EC4\u7B49\u975E\u6CD5\u6D3B\u52A8\u3002\u60A8\u5229\u7528\u672C\u670D\u52A1\u4ECE\u4E8B\u4EFB\u4F55\u975E\u6CD5\u6D3B\u52A8\u6216\u4E0D\u6B63\u5F53\u4EA4\u6613\u4EA7\u751F\u7684\u4E00\u5207\u540E\u679C\u4E0E\u8D23\u4EFB\uFF0C\u7531\u60A8\u81EA\u884C\u627F\u62C5\uFF0C\u4E0E\u94F6\u8054\u65E0\u5173\u3002"
                ),
                _react2.default.createElement(
                    "p",
                    { className: "bold" },
                    "3\u3001\u60A8\u5E94\u4FDD\u8BC1\u5C31\u672C\u670D\u52A1\u6240\u63D0\u4F9B\u3001\u586B\u5199\u7684\u59D3\u540D\u3001\u8054\u7CFB\u65B9\u5F0F\u3001\u94F6\u884C\u5361\u5361\u53F7\u7B49\u4FE1\u606F\u8D44\u6599\u771F\u5B9E\u3001\u51C6\u786E\u3001\u5B8C\u6574\u3001\u6709\u6548\uFF0C\u4E14\u5747\u7CFB\u60A8\u672C\u4EBA\u4FE1\u606F\u3002\u5BF9\u4E8E\u56E0\u60A8\u63D0\u4F9B\u4FE1\u606F\u4E0D\u771F\u5B9E\u6216\u4E0D\u5B8C\u6574\u6240\u9020\u6210\u7684\u635F\u5931\u53CA\u8D23\u4EFB\u5E94\u7531\u60A8\u81EA\u884C\u627F\u62C5\uFF0C\u4E14\u4E2D\u56FD\u94F6\u8054\u5C06\u62D2\u7EDD\u63D0\u4F9B\u672C\u670D\u52A1\u3002"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "4\u3001\u82E5\u53D1\u73B0\u60A8\u586B\u5199\u7684\u4FE1\u606F\u4E0D\u5B9E\uFF0C\u6216\u60A8\u4F7F\u7528\u201D\u6536\u6B3E\u7801\u670D\u52A1\u201D\u7684\u884C\u4E3A\u8FDD\u53CD\u56FD\u5BB6\u76F8\u5173\u6CD5\u5F8B\u6CD5\u89C4\u3001\u89C4\u7AE0\uFF0C\u6216\u8FDD\u53CD\u672C\u534F\u8BAE\u7EA6\u5B9A\uFF0C\u6216\u8005\u4FB5\u72AF\u5176\u4ED6\u7B2C\u4E09\u65B9\u6743\u76CA\u7684\uFF0C\u94F6\u8054\u6709\u6743\u8981\u6C42\u60A8\u7ACB\u5373\u4E88\u4EE5\u505C\u6B62\u3001\u7EA0\u6B63\u8BE5\u7B49\u884C\u4E3A\u6216\u4E0D\u7ECF\u901A\u77E5\u76F4\u63A5\u6682\u505C\u3001\u62D2\u7EDD\u76F8\u5173\u6B3E\u9879\u7684\u5904\u7406\u3002\u82E5\u60A8\u7684\u8FDD\u7EA6\u884C\u4E3A\u7ED9\u94F6\u8054\u9020\u6210\u4EFB\u4F55\u635F\u5931\uFF0C\u60A8\u5E94\u627F\u62C5\u5168\u90E8\u8D54\u507F\u8D23\u4EFB\u3002"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "5\u3001\u60A8\u7406\u89E3\u5E76\u540C\u610F\uFF0C\u672C\u670D\u52A1\u4E0B\u7684\u4ED8\u6B3E\u5177\u4F53\u5230\u8D26\u65F6\u95F4\u53D6\u51B3\u4E8E\u5404\u94F6\u884C\u7684\u652F\u6301\u60C5\u51B5\uFF0C\u56E0\u8282\u5047\u65E5\u6216\u975E\u5DE5\u4F5C\u65E5\u4EE5\u53CA\u5404\u4E2A\u94F6\u884C\u7684\u4E0D\u540C\u8981\u6C42\uFF0C\u8D44\u91D1\u5230\u8D26\u53EF\u80FD\u5B58\u5728\u8FDF\u5EF6\u3002 \u56E0\u89E6\u53D1\u94F6\u884C\u98CE\u63A7\u653F\u7B56\u7B49\u539F\u56E0\u5BFC\u81F4\u652F\u4ED8\u5931\u8D25\u7684\uFF0C\u60A8\u6709\u4E49\u52A1\u914D\u5408\u94F6\u8054\u5411\u94F6\u884C\u63D0\u4F9B\u76F8\u5173\u8BC1\u660E\u6750\u6599\uFF0C\u5411\u94F6\u884C\u786E\u8BA4\u4EA4\u6613\u7684\u771F\u5B9E\u3001\u5408\u6CD5\u6027\uFF0C\u5426\u5219\u56E0\u6B64\u5BFC\u81F4\u7684\u6240\u6709\u8D23\u4EFB\u5747\u7531\u60A8\u81EA\u884C\u627F\u62C5\uFF0C\u7531\u4E8E\u524D\u8FF0\u539F\u56E0\u5BFC\u81F4\u8D44\u91D1\u88AB\u94F6\u884C\u6B62\u4ED8\u6216\u5EF6\u8FDF\u5230\u8D26\u7684\uFF0C\u8BF7\u4E0E\u60A8\u7684\u94F6\u884C\u5361\u53D1\u5361\u94F6\u884C\u8054\u7CFB\u5904\u7406\u3002"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "6\u3001\u53D7\u4E1A\u52A1\u53D1\u5C55\u9700\u8981\u6216\u94F6\u884C\u4FA7\u670D\u52A1\u8C03\u6574\u7B49\u56E0\u7D20\u5F71\u54CD\uFF0C\u60A8\u7406\u89E3\u5E76\u540C\u610F\u672C\u670D\u52A1\u7684\u4ED8\u6B3E\u9650\u989D\u3001\u652F\u6301\u7684\u94F6\u884C\u540D\u5355\u7B49\u5C06\u4E0D\u65F6\u8FDB\u884C\u8C03\u6574\uFF0C\u5177\u4F53\u4EE5\u4E2D\u56FD\u94F6\u8054\u6B63\u5F0F\u516C\u544A\u4E3A\u51C6\u3002"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "7\u3001\u60A8\u540C\u610F\u94F6\u8054\u6709\u6743\u5C31\u672C\u670D\u52A1\u5411\u60A8\u6536\u53D6\u5E76\u4E0D\u65F6\u8C03\u6574\u670D\u52A1\u8D39\u7528\uFF0C\u5177\u4F53\u6536\u8D39\u6807\u51C6\u4EE5\u94F6\u8054\u6B63\u5F0F\u516C\u544A\u4E3A\u51C6\u3002\u5F53\u524D\u8BD5\u70B9\u671F\u95F4\u5C06\u6682\u514D\u670D\u52A1\u8D39\u3002"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "8\u3001\u4F7F\u7528\u672C\u670D\u52A1\u65F6\uFF0C\u60A8\u987B\u540C\u65F6\u9075\u5B88\u5404\u5BB6\u94F6\u884C\u7684\u76F8\u5173\u4E1A\u52A1\u89C4\u5B9A\u3002"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "9\u3001\u7531\u4E8E\u56FD\u5BB6\u653F\u7B56\u6CD5\u89C4\u53D8\u5316\u3001\u4E1A\u52A1\u53D1\u5C55\u9700\u8981\u7B49\u539F\u56E0\uFF0C\u7ECF\u63D0\u524D\u5411\u60A8\u901A\u77E5\u6216\u516C\u793A\uFF0C\u94F6\u8054\u6709\u6743\u505C\u6B62\u63D0\u4F9B\u672C\u670D\u52A1\u3002"
                ),
                _react2.default.createElement(
                    "p",
                    { className: "bold" },
                    "10\u3001\u5982\u60A8\u4E0D\u540C\u610F\u4E0A\u8FF0\u6761\u6B3E\u548C\u6761\u4EF6\uFF0C\u60A8\u5E94\u7ACB\u5373\u505C\u6B62\u4F7F\u7528\u672C\u9879\u670D\u52A1\uFF0C\u5426\u5219\u89C6\u4E3A\u60A8\u5B8C\u5168\u540C\u610F\u4E0A\u8FF0\u6761\u6B3E\u5185\u5BB9\uFF0C\u5305\u62EC\u94F6\u8054\u4E0D\u65F6\u5BF9\u5176\u7684\u66F4\u65B0\u3001\u4FEE\u8BA2\u3002"
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
    return UserAgree;
}(_react2.default.Component);

exports.default = UserAgree;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(UserAgree, "UserAgree", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/AgreeMenagement/UserAgree.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/AgreeMenagement/agree.scss":
/*!***************************************************!*\
  !*** ./src/components/AgreeMenagement/agree.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./agree.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/AgreeMenagement/agree.scss");

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