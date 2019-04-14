(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["CollectionLimit"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/CollectionLimit/CollectionLimit.scss":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/CollectionLimit/CollectionLimit.scss ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#CL {\n  width: 100%;\n  height: 100%;\n  background-color: #EFEFF4; }\n  #CL .item {\n    width: 100%;\n    margin-bottom: 0.2rem; }\n    #CL .item .title {\n      width: 100%;\n      box-sizing: border-box;\n      padding: 0.37333rem 0 0 0.42667rem;\n      background-color: #ffffff;\n      color: #333333; }\n      #CL .item .title h3 {\n        padding-bottom: 0.37333rem;\n        border-bottom: 1px solid #ccc;\n        font-weight: 400; }\n    #CL .item .limitDetails {\n      display: flex;\n      width: 100%;\n      padding: 0.37333rem;\n      box-sizing: border-box;\n      justify-content: space-around;\n      align-content: center;\n      background-color: #ffffff;\n      color: #666666; }\n      #CL .item .limitDetails .num {\n        color: #333333;\n        font-size: 0.48rem;\n        height: 0.48rem;\n        line-height: 0.6rem;\n        margin-top: 0.06667rem;\n        font-weight: 600; }\n  #CL .ps {\n    padding-top: 0.26667rem;\n    text-indent: 0.26667rem;\n    color: #999999;\n    font-size: 0.32rem; }\n", ""]);

// exports
exports.locals = {
	"CL": "CL",
	"item": "item",
	"title": "title",
	"limitDetails": "limitDetails",
	"num": "num",
	"ps": "ps"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/CollectionLimit/CollectionLimit.scss":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/CollectionLimit/CollectionLimit.scss ***!
  \**************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./CollectionLimit.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/CollectionLimit/CollectionLimit.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("7c774012", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/CollectionLimit/CollectionLimit.js":
/*!***********************************************************!*\
  !*** ./src/components/CollectionLimit/CollectionLimit.js ***!
  \***********************************************************/
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

__webpack_require__(/*! ./CollectionLimit.scss */ "./src/components/CollectionLimit/CollectionLimit.scss");

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var CollectionLimit = function (_Component) {
    (0, _inherits3.default)(CollectionLimit, _Component);

    function CollectionLimit() {
        (0, _classCallCheck3.default)(this, CollectionLimit);
        return (0, _possibleConstructorReturn3.default)(this, (CollectionLimit.__proto__ || (0, _getPrototypeOf2.default)(CollectionLimit)).apply(this, arguments));
    }

    (0, _createClass3.default)(CollectionLimit, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //设置头部标题
            (0, _request.beforeEnterRouter)('收款限额', '');
            //发送ajax请求，更新store中的limitInfo(收款限额详情)
            (0, _requestAPI.getLimitAtInfo)();
        }
    }, {
        key: 'render',
        value: function render() {
            // 从props中获取到 单条的限额信息
            var _props$limitInfo = this.props.limitInfo,
                dCardLimitAt = _props$limitInfo.dCardLimitAt,
                dDailiyLimitAt = _props$limitInfo.dDailiyLimitAt,
                dMonthLimitAt = _props$limitInfo.dMonthLimitAt,
                cCardLimitAt = _props$limitInfo.cCardLimitAt,
                cDailiyLimitAt = _props$limitInfo.cDailiyLimitAt,
                cMonthLimitAt = _props$limitInfo.cMonthLimitAt;
            // 单个限额组件

            function LimitInfoItem(props) {
                return _react2.default.createElement(
                    'div',
                    { className: 'item' },
                    _react2.default.createElement(
                        'div',
                        { className: 'title' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            props.title
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'limitDetails' },
                        _react2.default.createElement(
                            'div',
                            { className: 'item' },
                            _react2.default.createElement(
                                'div',
                                null,
                                '\u5355\u5361\u5355\u65E5'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'num' },
                                ' ',
                                props.cardDaily,
                                ' '
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'item' },
                            _react2.default.createElement(
                                'div',
                                null,
                                '\u5355\u65E5'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'num' },
                                props.day
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'item' },
                            _react2.default.createElement(
                                'div',
                                null,
                                '\u5355\u6708'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'num' },
                                props.month
                            )
                        )
                    )
                );
            }

            return _react2.default.createElement(
                'div',
                { id: 'CL' },
                _react2.default.createElement(
                    'div',
                    { className: 'limitsContainer' },
                    _react2.default.createElement(LimitInfoItem, { title: '\u5411\u50A8\u84C4\u5361\u6536\u6B3E\u7684\u9650\u989D', cardDaily: dCardLimitAt, day: dDailiyLimitAt, month: dMonthLimitAt }),
                    _react2.default.createElement(LimitInfoItem, { title: '\u5411\u4FE1\u7528\u5361\u6536\u6B3E\u7684\u9650\u989D', cardDaily: cCardLimitAt, day: cDailiyLimitAt, month: cMonthLimitAt })
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'ps' },
                    ' \u8BF4\u660E:\xA0\xA0\xA0"- -"\u662F\u672A\u8BBE\u7F6E\u9650\u989D'
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return CollectionLimit;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {
    /**
     * 处理收款限额详情，返回collectionLimit.js所需的数据格式
     * @param {*} originLimitInfo  从后台请求得到的原始限额详情数据
     */
    function decorateLimitInfo(originLimitInfo) {
        /**
         * 处理单条的金额信息
         * @param {*} money 单条数字金额
         */
        function decorateMoney(money) {
            var moneyDecorated = '';
            if (money.indexOf('-') > -1 || money == '') {
                moneyDecorated = '- -';
            } else {
                moneyDecorated = money + '元';
            }
            return moneyDecorated;
        }
        // 处理后的限额详情
        var limitInfoDecorated = {};
        for (var key in originLimitInfo) {
            limitInfoDecorated[key] = decorateMoney(originLimitInfo[key]);
        }
        return limitInfoDecorated;
    }
    return {
        limitInfo: decorateLimitInfo(state.getIn(["limitInfo"]).toJS())
    };
};

var _default = (0, _reactRedux.connect)(mapstateToProps)(CollectionLimit);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(CollectionLimit, 'CollectionLimit', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/CollectionLimit/CollectionLimit.js');
    reactHotLoader.register(mapstateToProps, 'mapstateToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/CollectionLimit/CollectionLimit.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/CollectionLimit/CollectionLimit.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/CollectionLimit/CollectionLimit.scss":
/*!*************************************************************!*\
  !*** ./src/components/CollectionLimit/CollectionLimit.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./CollectionLimit.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/CollectionLimit/CollectionLimit.scss");

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