(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["TodayCollectMoney"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/TodayCollectMoney/TodayCollectMoney.scss":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/TodayCollectMoney/TodayCollectMoney.scss ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "* {\n  margin: 0;\n  padding: 0;\n  list-style: none; }\n\n.clearfix:after {\n  display: block;\n  clear: both;\n  content: \"\";\n  visibility: hidden;\n  height: 0; }\n\n.clearfix {\n  zoom: 1; }\n\n.dn {\n  display: none; }\n\n.todayCollectMoneyContain {\n  height: 100%;\n  background: #EFEFF4;\n  padding: 0 0.2rem;\n  overflow-y: scroll;\n  -webkit-overflow-scrolling: touch; }\n  .todayCollectMoneyContain .CollectMoneyList {\n    padding-top: 0.42667rem; }\n    .todayCollectMoneyContain .CollectMoneyList .item {\n      height: 3.09333rem;\n      background-color: #fff;\n      margin-bottom: 0.26667rem;\n      padding: 0.37333rem 0.32rem; }\n      .todayCollectMoneyContain .CollectMoneyList .item .payMonerNum {\n        font-size: 0.37333rem;\n        color: #333333;\n        letter-spacing: 0;\n        text-align: left;\n        line-height: 0.37333rem;\n        border-bottom: 1px solid #C7C7C7;\n        padding-bottom: 0.37333rem;\n        font-weight: bold; }\n      .todayCollectMoneyContain .CollectMoneyList .item .cardNum {\n        font-size: 0.37333rem;\n        color: #666666;\n        letter-spacing: 0;\n        text-align: left;\n        line-height: 0.37333rem;\n        margin: 0.37333rem 0; }\n      .todayCollectMoneyContain .CollectMoneyList .item .CollectMoney {\n        font-size: 0.37333rem;\n        color: #666666;\n        letter-spacing: 0;\n        text-align: left;\n        line-height: 0.37333rem; }\n        .todayCollectMoneyContain .CollectMoneyList .item .CollectMoney .money {\n          font-size: 0.48rem;\n          color: #FD3259;\n          letter-spacing: 0;\n          text-align: left;\n          line-height: 0.48rem;\n          font-weight: bold; }\n        .todayCollectMoneyContain .CollectMoneyList .item .CollectMoney .time {\n          font-size: 0.32rem;\n          color: #999999;\n          letter-spacing: 0;\n          text-align: right;\n          line-height: 0.32rem;\n          margin-left: 2.73333rem; }\n  .todayCollectMoneyContain .loading {\n    text-align: center;\n    padding: 0rem 0.10667rem;\n    color: #999;\n    margin-bottom: 0.2rem; }\n    .todayCollectMoneyContain .loading .loadingBg {\n      background-color: #EFEFF4;\n      padding: 0.13333rem 0rem; }\n", ""]);

// exports
exports.locals = {
	"clearfix": "clearfix",
	"dn": "dn",
	"todayCollectMoneyContain": "todayCollectMoneyContain",
	"CollectMoneyList": "CollectMoneyList",
	"item": "item",
	"payMonerNum": "payMonerNum",
	"cardNum": "cardNum",
	"CollectMoney": "CollectMoney",
	"money": "money",
	"time": "time",
	"loading": "loading",
	"loadingBg": "loadingBg"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/TodayCollectMoney/TodayCollectMoney.scss":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/TodayCollectMoney/TodayCollectMoney.scss ***!
  \******************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./TodayCollectMoney.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/TodayCollectMoney/TodayCollectMoney.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("8d348e78", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/TodayCollectMoney/TodayCollectMoney.js":
/*!***************************************************************!*\
  !*** ./src/components/TodayCollectMoney/TodayCollectMoney.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "./node_modules/babel-runtime/core-js/json/stringify.js");

var _stringify2 = _interopRequireDefault(_stringify);

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

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

__webpack_require__(/*! ./TodayCollectMoney.scss */ "./src/components/TodayCollectMoney/TodayCollectMoney.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by by on 2018/4/12.
       */


var TodayCollectMoney = function (_React$Component) {
    (0, _inherits3.default)(TodayCollectMoney, _React$Component);

    function TodayCollectMoney(props) {
        (0, _classCallCheck3.default)(this, TodayCollectMoney);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (TodayCollectMoney.__proto__ || (0, _getPrototypeOf2.default)(TodayCollectMoney)).call(this, props));

        _this2.formatDate = function (str) {
            var year = str.substr(0, 4);
            var month = str.substr(4, 2);
            var day = str.substr(6, 2);
            var hour = str.substr(8, 2);
            var min = str.substr(10, 2);
            var s = str.substr(12, 2);
            var date = year + "/" + month + "/" + day;
            var time = hour + ":" + min + ":" + s;
            return date + "  " + time;
        };

        _this2.state = {
            isLoading: false
        };
        _this2.scrollContainerRef = _react2.default.createRef();
        return _this2;
    }

    /**
     * 格式化拆分后台响应回来的时间日期
     * @param str
     * @returns {string}
     */


    (0, _createClass3.default)(TodayCollectMoney, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var that = this;
            this.scrollContainerRef.current.onscroll = function (e) {
                var _that$props = that.props,
                    pageStatus = _that$props.pageStatus,
                    getMoreData = _that$props.getMoreData;

                if (e.target.scrollHeight - (e.target.offsetHeight + e.target.scrollTop) < 5) {
                    if (pageStatus.hasMore && !that.state.isLoading) {
                        that.setState({
                            isLoading: true
                        });
                        getMoreData().then(function () {
                            that.setState({
                                isLoading: false
                            });
                        });
                    }
                }
            };
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.scrollContainerRef.current.onscroll = ""; //清空滚动
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                todayOrderList = _props.todayOrderList,
                pageStatus = _props.pageStatus;

            var _this = this;
            var renderlist = function renderlist(item, index) {
                return _react2.default.createElement(
                    "div",
                    { key: index, className: "item" },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: "/queryResults?goDetail=" + encodeURIComponent((0, _stringify2.default)(item)) },
                        _react2.default.createElement(
                            "p",
                            { className: "payMonerNum" },
                            "\u4ED8\u6B3E\u51ED\u8BC1\u53F7: ",
                            _react2.default.createElement(
                                "span",
                                null,
                                item.voucherNum
                            )
                        ),
                        _react2.default.createElement(
                            "p",
                            { className: "cardNum" },
                            "\u8D26\u6237\u5361\u53F7: ",
                            _react2.default.createElement(
                                "span",
                                null,
                                item.accNo
                            )
                        ),
                        _react2.default.createElement(
                            "p",
                            { className: "CollectMoney" },
                            "\u91D1\u989D: ",
                            _react2.default.createElement(
                                "span",
                                { className: "money" },
                                item.txnAmt,
                                "\u5143"
                            ),
                            _react2.default.createElement(
                                "span",
                                {
                                    className: "time" },
                                _this.formatDate(item.transTm)
                            )
                        )
                    )
                );
            };
            return _react2.default.createElement(
                "div",
                { className: "todayCollectMoneyContain", ref: this.scrollContainerRef },
                _react2.default.createElement(
                    "div",
                    { className: "CollectMoneyList" },
                    todayOrderList.map(renderlist)
                ),
                _react2.default.createElement(
                    "div",
                    { className: "loading" },
                    _react2.default.createElement(
                        "div",
                        { className: "loadingBg", ref: "loadingText" },
                        pageStatus.bottomText
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
    return TodayCollectMoney;
}(_react2.default.Component);

exports.default = TodayCollectMoney;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(TodayCollectMoney, "TodayCollectMoney", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/TodayCollectMoney/TodayCollectMoney.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/TodayCollectMoney/TodayCollectMoney.scss":
/*!*****************************************************************!*\
  !*** ./src/components/TodayCollectMoney/TodayCollectMoney.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./TodayCollectMoney.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/TodayCollectMoney/TodayCollectMoney.scss");

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

/***/ "./src/components/TodayCollectMoney/TodayCollectMoneyActions.js":
/*!**********************************************************************!*\
  !*** ./src/components/TodayCollectMoney/TodayCollectMoneyActions.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

exports.getTodayOrder = getTodayOrder;

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

/**
 * 获取今日收款的交易记录
 * @param latedate 数据很多需要滚动加载时 将第一次请求数据的最后一个时间的字段 作为请求下一页的参数
 */
function getTodayOrder() {
    var latedate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    var param = void 0;
    if (!!latedate) {
        param = { transTm: latedate };
    } else {
        param = {};
    }
    return (0, _requestAPI.getTodayTrans)(param).then(function (res) {
        var newList = res.data.transInfo;
        return _promise2.default.resolve(newList);
    });
}
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(getTodayOrder, "getTodayOrder", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/TodayCollectMoney/TodayCollectMoneyActions.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/TodayCollectMoney/TodayCollectMoneyContainer.js":
/*!************************************************************************!*\
  !*** ./src/components/TodayCollectMoney/TodayCollectMoneyContainer.js ***!
  \************************************************************************/
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

var _TodayCollectMoneyActions = __webpack_require__(/*! ./TodayCollectMoneyActions */ "./src/components/TodayCollectMoney/TodayCollectMoneyActions.js");

var _TodayCollectMoney = __webpack_require__(/*! ./TodayCollectMoney */ "./src/components/TodayCollectMoney/TodayCollectMoney.js");

var _TodayCollectMoney2 = _interopRequireDefault(_TodayCollectMoney);

var _store = __webpack_require__(/*! ../../store/store */ "./src/store/store.js");

var _store2 = _interopRequireDefault(_store);

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _action = __webpack_require__(/*! ../../store/action */ "./src/store/action.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var TodayCollectMoneyContainers = function (_Component) {
    (0, _inherits3.default)(TodayCollectMoneyContainers, _Component);

    function TodayCollectMoneyContainers(props) {
        (0, _classCallCheck3.default)(this, TodayCollectMoneyContainers);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TodayCollectMoneyContainers.__proto__ || (0, _getPrototypeOf2.default)(TodayCollectMoneyContainers)).call(this, props));

        _this.getMoreData = function () {
            var lastDate = _this.state.lastDate;
            return (0, _TodayCollectMoneyActions.getTodayOrder)(lastDate).then(function (list) {
                console.log(list);
                if (list.length >= 10) {
                    lastDate = list[list.length - 1].transTm;
                    _this.setState({
                        hasMore: true,
                        lastDate: lastDate
                    });
                } else {
                    _this.setState({
                        hasMore: false,
                        bottomText: '暂无更多数据~~'
                    });
                }
            });
        };

        _this.state = {
            lastDate: null,
            bottomText: '加载中...',
            hasMore: true
        };
        return _this;
    }

    (0, _createClass3.default)(TodayCollectMoneyContainers, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            (0, _request.beforeEnterRouter)("今日收款", "单笔查询", function () {
                _this2.props.history.push({ pathname: "/singleStrokeQuery" });
            });

            (0, _TodayCollectMoneyActions.getTodayOrder)().then(function (list) {
                if (list.length < 10) {
                    _this2.setState({
                        bottomText: '暂无更多数据~~'
                    });
                } else {
                    var time = list[list.length - 1].transTm;
                    _this2.setState({
                        lastDate: time
                    });
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
                todayOrderList: []
            }));
        }

        /**
         * 触发滚动执行此函数
         */

    }, {
        key: 'render',
        value: function render() {
            var pageStatus = this.state;
            return _react2.default.createElement(_TodayCollectMoney2.default, (0, _extends3.default)({}, this.props, { getMoreData: this.getMoreData, pageStatus: pageStatus }));
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return TodayCollectMoneyContainers;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {
    return {
        todayOrderList: state.getIn(["todayOrderList"]).toJS()
    };
};

var _default = (0, _reactRedux.connect)(mapstateToProps)(TodayCollectMoneyContainers);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(TodayCollectMoneyContainers, 'TodayCollectMoneyContainers', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/TodayCollectMoney/TodayCollectMoneyContainer.js');
    reactHotLoader.register(mapstateToProps, 'mapstateToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/TodayCollectMoney/TodayCollectMoneyContainer.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/TodayCollectMoney/TodayCollectMoneyContainer.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ })

}]);