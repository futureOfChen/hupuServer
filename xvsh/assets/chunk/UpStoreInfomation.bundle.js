(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["UpStoreInfomation"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/UpStoreInfomation/UpStoreInfomation.scss":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/UpStoreInfomation/UpStoreInfomation.scss ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#usf {\n  height: 100%;\n  background: #EFEFF4;\n  position: relative; }\n  #usf .am-list-item.am-input-item.am-list-item-middle.am-input-error {\n    border: 1px solid #E6394D; }\n  #usf .headTipe {\n    display: flex;\n    background: #F3F8FF;\n    box-shadow: inset 0 -1px 0 0 #C7C7C7, inset 0 1px 0 0 #C7C7C7;\n    flex-direction: row;\n    padding: 0.42667rem;\n    flex-shrink: 0; }\n    #usf .headTipe .mt0 {\n      margin: 0; }\n    #usf .headTipe .tips-warp-div {\n      margin-top: 0.04rem; }\n    #usf .headTipe span {\n      font-size: 0.37333rem;\n      color: #4A90E2;\n      letter-spacing: 0;\n      line-height: 0.50667rem; }\n  #usf .btn-tips {\n    font-size: 0.32rem;\n    color: #999999;\n    letter-spacing: 0;\n    text-align: center;\n    line-height: 0.32rem; }\n    #usf .btn-tips span {\n      color: #fd3259; }\n  #usf .padlr32 {\n    padding: 0 0.42667rem; }\n  #usf .inputWap {\n    padding-top: 0.42667rem; }\n  #usf .cell-warp-div {\n    background: #ffffff;\n    padding: 0.45333rem 0.42667rem;\n    border-radius: 0.10667rem; }\n    #usf .cell-warp-div .cell-inner-div {\n      display: flex;\n      align-items: center;\n      flex-direction: row;\n      flex-wrap: nowrap;\n      line-height: 0.42667rem;\n      line-height: 0.42667rem;\n      letter-spacing: 0; }\n      #usf .cell-warp-div .cell-inner-div .cell-name-div {\n        width: 1.84rem;\n        font-size: 0.42667rem;\n        color: #333333; }\n      #usf .cell-warp-div .cell-inner-div .cell-value-div {\n        flex: 1;\n        color: #999999;\n        font-size: 0.42667rem;\n        margin-left: 0.42667rem;\n        font-weight: 450; }\n      #usf .cell-warp-div .cell-inner-div .color666 {\n        color: #666666; }\n", ""]);

// exports
exports.locals = {
	"usf": "usf",
	"am-list-item": "am-list-item",
	"am-input-item": "am-input-item",
	"am-list-item-middle": "am-list-item-middle",
	"am-input-error": "am-input-error",
	"headTipe": "headTipe",
	"mt0": "mt0",
	"tips-warp-div": "tips-warp-div",
	"btn-tips": "btn-tips",
	"padlr32": "padlr32",
	"inputWap": "inputWap",
	"cell-warp-div": "cell-warp-div",
	"cell-inner-div": "cell-inner-div",
	"cell-name-div": "cell-name-div",
	"cell-value-div": "cell-value-div",
	"color666": "color666"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/UpStoreInfomation/UpStoreInfomation.scss":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/UpStoreInfomation/UpStoreInfomation.scss ***!
  \******************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./UpStoreInfomation.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/UpStoreInfomation/UpStoreInfomation.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("12ced975", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/IdIdentify/IdIdentifyActions.js":
/*!********************************************************!*\
  !*** ./src/components/IdIdentify/IdIdentifyActions.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.submitHandleClick = submitHandleClick;

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _modal = __webpack_require__(/*! antd-mobile/lib/modal */ "./node_modules/antd-mobile/lib/modal/index.js");

var _modal2 = _interopRequireDefault(_modal);

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

function submitHandleClick(param) {
    (0, _requestAPI.upgradeMcc)(param).then(function () {
        _modal2.default.alert('提交成功', '我们将在2~5个工作日内完成审核，请耐心等待，审核结果将通过云闪付消息进行发送', [{
            text: '好的', onPress: function onPress() {
                var url = window.location.protocol + "//" + window.location.host + "/s/wl/xvsh/index.html#/merchabtServ";
                (0, _request.createWebView)(url, null, "", "1");
            }
        }]);
    });
}
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(submitHandleClick, "submitHandleClick", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/IdIdentify/IdIdentifyActions.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/UpStoreInfomation/UpStoreInfomation.js":
/*!***************************************************************!*\
  !*** ./src/components/UpStoreInfomation/UpStoreInfomation.js ***!
  \***************************************************************/
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

var _button = __webpack_require__(/*! antd-mobile/lib/button */ "./node_modules/antd-mobile/lib/button/index.js");

var _button2 = _interopRequireDefault(_button);

var _inputItem = __webpack_require__(/*! antd-mobile/lib/input-item */ "./node_modules/antd-mobile/lib/input-item/index.js");

var _inputItem2 = _interopRequireDefault(_inputItem);

var _picker = __webpack_require__(/*! antd-mobile/lib/picker */ "./node_modules/antd-mobile/lib/picker/index.js");

var _picker2 = _interopRequireDefault(_picker);

__webpack_require__(/*! ./UpStoreInfomation.scss */ "./src/components/UpStoreInfomation/UpStoreInfomation.scss");

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var UpStoreInfomation = function (_React$Component) {
    (0, _inherits3.default)(UpStoreInfomation, _React$Component);

    function UpStoreInfomation(props, context) {
        (0, _classCallCheck3.default)(this, UpStoreInfomation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UpStoreInfomation.__proto__ || (0, _getPrototypeOf2.default)(UpStoreInfomation)).call(this, props, context));

        _this.changeStoreNameHandler = function (val) {
            /**
             * 只要用户修改过名，我们就需要修改状态
             */
            if (_this.neverChangeName) {
                _this.neverChangeName = false;
            }
            _this.props.changeStoreName(val);
        };

        _this.clickError = function (msg) {
            (0, _request.toast)(msg);
        };

        _this.intoView = function () {
            var ele = document.getElementById("detailAddrinput");
            if (!!ele.scrollIntoView) {
                ele.scrollIntoView(true);
            }
            if (!!ele.scrollIntoViewIfNeeded) {
                ele.scrollIntoViewIfNeeded();
            }
        };

        _this.handleNextClick = function () {
            //如果该页面是来自错误毁掉页面，必须处理过不合法的名称，才能提交请求
            if (!_this.props.isFailback || !_this.neverChangeName) {
                _this.props.handleClick();
            }
        };

        _this.neverChangeName = true; //从来没有修改过店铺名称

        return _this;
    }
    /**
     * 处理点击事件
     */


    (0, _createClass3.default)(UpStoreInfomation, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                storename = _props.storename,
                StoreTp = _props.StoreTp,
                StroeArea = _props.StroeArea,
                addr = _props.addr,
                merchantTpArr = _props.merchantTpArr,
                areaArr = _props.areaArr,
                changeStoreType = _props.changeStoreType,
                changeStoreArea = _props.changeStoreArea,
                changeStoreAddr = _props.changeStoreAddr,
                isFailback = _props.isFailback,
                errMsg = _props.errMsg;


            var error = false,
                showMsg = ""; //默认店铺名称是不错的

            StroeArea = StroeArea.split('|');
            StoreTp = parseInt(StoreTp) + '';
            if (StoreTp.length <= 3) {
                StoreTp = [StoreTp.substr(0, 1) + '', StoreTp];
            } else {
                StoreTp = [StoreTp.substr(0, 2) + '', StoreTp];
            }

            //用于判定用户名是不是有错误
            if (isFailback && this.neverChangeName) {
                //如果来自错误页面的跳转，并且从来没有修改过店铺名称，则店铺名称要标红，且点击显示错误信息
                error = true;
                showMsg = errMsg;
            } else {
                //根据字符串长度判定是否是合法的名称
                if (!!storename && storename.length > 20) {
                    error = true;
                    showMsg = "您的店铺名称过长";
                } else {
                    error = false;
                }
            }

            //判定是不是disable的按钮，如果名称符合要求，且不是空,选中了店铺类型，选中了店铺区域，填写了店铺地址
            var disableBtn = void 0;
            storename.trim();
            addr.trim();
            if (!error && storename.length != 0 && StoreTp.length != 0 && StroeArea.length != 0 && addr.length) {
                disableBtn = false;
            } else {
                disableBtn = true;
            }

            return _react2.default.createElement(
                'div',
                { id: 'usf' },
                _react2.default.createElement(
                    'div',
                    { id: 'contentWarp' },
                    !isFailback && _react2.default.createElement(
                        'div',
                        { className: 'headTipe' },
                        _react2.default.createElement(
                            'div',
                            { className: 'tips-warp-div mt0' },
                            _react2.default.createElement('i', { className: 'tipsIcon' })
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u8865\u5168\u8D44\u6599\u5E76\u6EE1\u8DB3\u3010\u5F00\u901A\u5546\u5BB6\u6536\u6B3E\u6EE190\u5929\u4E14\u8FDE\u7EED30\u5929\u6B63\u5E38\u6536\u6B3E\u3011\u5373\u53EF\u652F\u6301\u987E\u5BA2\u7684\u4FE1\u7528\u5361\u4ED8\u6B3E\u3002'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'contentWarp', className: 'padlr32' },
                        _react2.default.createElement(
                            'div',
                            { className: 'inputWap' },
                            _react2.default.createElement(
                                _inputItem2.default,
                                { clear: true, placeholder: '\u6700\u591A20\u4E2A\u5B57\u7B26',
                                    error: error,
                                    value: storename,
                                    onChange: this.changeStoreNameHandler,
                                    onErrorClick: this.clickError.bind(this, showMsg)
                                },
                                '\u5E97\u94FA\u540D\u79F0'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'tips-warp-div' },
                            _react2.default.createElement('i', { className: 'tipsIcon' }),
                            '\u8BE5\u540D\u79F0\u5C06\u5C55\u793A\u5728\u987E\u5BA2\u7684\u4ED8\u6B3E\u9875\u9762'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'inputWap' },
                            _react2.default.createElement(
                                _picker2.default,
                                {
                                    extra: '\u8BF7\u9009\u62E9\u5546\u6237\u7C7B\u578B',
                                    data: merchantTpArr,
                                    cols: '2',
                                    value: StoreTp,
                                    onOk: function onOk(v) {
                                        return changeStoreType(v);
                                    }
                                },
                                _react2.default.createElement(
                                    CustomChildren,
                                    null,
                                    '\u5E97\u94FA\u7C7B\u578B'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'inputWap' },
                            _react2.default.createElement(
                                _picker2.default
                                // title="选择地区"
                                ,
                                { extra: '\u8BF7\u9009\u62E9\u5E97\u94FA\u6240\u5728\u5730\u533A',
                                    data: areaArr,
                                    value: StroeArea,
                                    onOk: function onOk(v) {
                                        return changeStoreArea(v);
                                    } },
                                _react2.default.createElement(
                                    CustomChildren,
                                    null,
                                    '\u6240\u5728\u5730\u533A'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'inputWap' },
                            _react2.default.createElement(
                                _inputItem2.default,
                                { clear: true, placeholder: '\u8BF7\u8F93\u5165\u5E97\u94FA\u8BE6\u7EC6\u5730\u5740',
                                    id: 'detailAddrinput',
                                    onFocus: this.intoView,
                                    value: addr,
                                    onChange: function onChange(v) {
                                        changeStoreAddr(v);
                                    } },
                                '\u8BE6\u7EC6\u5730\u5740'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    !isFailback && _react2.default.createElement(
                        'div',
                        { className: 'btn-tips' },
                        '\u4FE1\u7528\u5361\u4ED8\u6B3E\uFF0C\u5355\u7B14\u4EA4\u6613\u5C06\u88AB\u6536\u53D6',
                        _react2.default.createElement(
                            'span',
                            null,
                            '0.5%'
                        ),
                        '\u624B\u7EED\u8D39\uFF0C\u501F\u8BB0\u5361\u4ED8\u6B3E\u514D\u8D39\u3002'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'submit-warp-button' },
                        _react2.default.createElement(
                            _button2.default,
                            { type: 'primary', disabled: disableBtn,
                                onClick: this.handleNextClick },
                            '\u4E0B\u4E00\u6B65'
                        )
                    )
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
    return UpStoreInfomation;
}(_react2.default.Component);

exports.default = UpStoreInfomation;


var CustomChildren = function CustomChildren(props) {
    var placeholderClass = "";
    if (props.extra.indexOf("请选择") > -1) {
        placeholderClass = "color666";
    }

    function handleClick() {
        var node = document.getElementsByClassName("czymask")[0];
        if (!node) {
            node = document.createElement('div'); // 创建 DOM
            node.className = 'czymask'; // 给上 ClassName
            document.getElementsByTagName('body')[0].appendChild(node); //给body添加一个div
        }
        node.style.display = "block";
        setTimeout(function () {
            node.style.display = "none";
        }, 300);
        // console.log("aa")
        props.onClick();
    }

    return _react2.default.createElement(
        'div',
        {
            onClick: handleClick,
            className: 'cell-warp-div'
        },
        _react2.default.createElement(
            'div',
            { className: 'cell-inner-div' },
            _react2.default.createElement(
                'div',
                { className: 'cell-name-div' },
                props.children
            ),
            _react2.default.createElement(
                'div',
                { className: "cell-value-div " + placeholderClass },
                props.extra
            ),
            _react2.default.createElement('i', { className: 'rightArrow' })
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

    reactHotLoader.register(UpStoreInfomation, 'UpStoreInfomation', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/UpStoreInfomation/UpStoreInfomation.js');
    reactHotLoader.register(CustomChildren, 'CustomChildren', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/UpStoreInfomation/UpStoreInfomation.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/UpStoreInfomation/UpStoreInfomation.scss":
/*!*****************************************************************!*\
  !*** ./src/components/UpStoreInfomation/UpStoreInfomation.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./UpStoreInfomation.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/UpStoreInfomation/UpStoreInfomation.scss");

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

/***/ "./src/components/UpStoreInfomation/UpStoreInfomationContainers.js":
/*!*************************************************************************!*\
  !*** ./src/components/UpStoreInfomation/UpStoreInfomationContainers.js ***!
  \*************************************************************************/
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

var _UpStoreInfomation = __webpack_require__(/*! ./UpStoreInfomation */ "./src/components/UpStoreInfomation/UpStoreInfomation.js");

var _UpStoreInfomation2 = _interopRequireDefault(_UpStoreInfomation);

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

var _IdIdentifyActions = __webpack_require__(/*! ../IdIdentify/IdIdentifyActions */ "./src/components/IdIdentify/IdIdentifyActions.js");

var _action = __webpack_require__(/*! ../../store/action */ "./src/store/action.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var UpStoreInfomationContainers = function (_Component) {
    (0, _inherits3.default)(UpStoreInfomationContainers, _Component);

    function UpStoreInfomationContainers(props, context) {
        (0, _classCallCheck3.default)(this, UpStoreInfomationContainers);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UpStoreInfomationContainers.__proto__ || (0, _getPrototypeOf2.default)(UpStoreInfomationContainers)).call(this, props, context));

        _this.handleClick = function () {
            var history = _this.props.history;
            var _this$state = _this.state,
                failPictrueObj = _this$state.failPictrueObj,
                isFailback = _this$state.isFailback,
                hasFailPicture = _this$state.hasFailPicture;


            if (isFailback) {
                //如果是来自错误毁掉页面，则需要判断是否有照片的错误信息
                if (hasFailPicture) {
                    //如果有错误的照片需要将错误的照片重新拍照
                    history.push({
                        pathname: "/idIdentify",
                        search: "?failPictrueObj=" + failPictrueObj + "&isFailback=true"
                    });
                } else {
                    //如果没有则直接发请求
                    var _this$props = _this.props,
                        storename = _this$props.storename,
                        StoreTp = _this$props.StoreTp,
                        StroeArea = _this$props.StroeArea,
                        addr = _this$props.addr;

                    StroeArea = StroeArea.split('|');
                    (0, _IdIdentifyActions.submitHandleClick)({
                        storeNm: storename,
                        StoreTp: StoreTp,
                        provCd: StroeArea[0],
                        cityCd: StroeArea[1],
                        coutyCd: !!StroeArea[2] ? StroeArea[2] : null,
                        addr: addr
                    });
                }
            } else {
                //如果不是来自错误信息页面，则直接跳转到拍照上传页面
                history.push({
                    pathname: "/idIdentify"
                });
            }
        };

        var search = _this.props.location.search;
        _this.state = {
            isFailback: false,
            errMsg: "",
            hasFailPicture: "",
            failPictrueObj: {}
        };

        if (!!search) {
            //如果search 存在代表来自审核失败的回调页面
            /**
             * 如果是审核失败了进入该页面，需要在URL上面加入两个参数
             * isFailback       是否来自审核失败页面 是-true,否-false
             * errMsg           错误原因
             * hasFailPicture   是否有失败的图片  有 -true  , 没有 -false
             * failPictrueObj   错误的图片是哪一类
             * {
             *     certVerifyFailReason: false,     //身份证 信息有误
             *     licVerifyFailReason: false,      //营业执照信息有误
             *     shoppicVerifyFailReason: false,  //店铺照片有误
             *     auxVerifyFailReason: false,      //辅助证明资料有误
             *     mernmVerifyFailReason: false,    //店铺名称有误
             *     merLogoVerifyFailReason: false,    //店铺logo有误
             * }
             * ?isFailback=true&errMsg=asdfasdfsadf&hasFailPicture=false&failPictrueObj=asdfadfasfds
             */
            var _getSearchParam = (0, _request.getSearchParam)(decodeURIComponent(search)),
                isFailback = _getSearchParam.isFailback,
                errMsg = _getSearchParam.errMsg,
                hasFailPicture = _getSearchParam.hasFailPicture,
                failPictrueObj = _getSearchParam.failPictrueObj;

            _this.state = {
                isFailback: isFailback,
                errMsg: errMsg,
                hasFailPicture: hasFailPicture,
                failPictrueObj: failPictrueObj
            };
        }
        return _this;
    }

    (0, _createClass3.default)(UpStoreInfomationContainers, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _request.beforeEnterRouter)('店铺信息');

            //获取商铺列表和地址列表
            (0, _requestAPI.getMchntAndAreaInf)();

            var storename = this.props.storename;

            //如果storename不存在说明没有操作过这个页面，应该读取商户信息回显商户信息

            if (!storename.length) {
                //获取店铺详情
                (0, _requestAPI.getMchntDetail)();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_UpStoreInfomation2.default, (0, _extends3.default)({}, this.props, this.state, { handleClick: this.handleClick }));
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return UpStoreInfomationContainers;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {
    //检查店铺名称中是否有转换的emoj表情，转回utf16
    var storename = (0, _request.entitiesToUtf16)(state.getIn(["mchntDetail", "storeNm"]));
    return {
        storename: storename,
        StoreTp: state.getIn(["mchntDetail", "storeTp"]),
        StroeArea: state.getIn(["mchntDetail", "area"]),
        addr: state.getIn(["mchntDetail", "addr"]),
        merchantTpArr: state.getIn(["mchntAndAreaInf", "merchantTpArr"]).toJS(),
        areaArr: state.getIn(["mchntAndAreaInf", "areaArr"]).toJS()
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
     * 用于用户更新Redux中的店铺类型
     */
    var changeStoreType = function changeStoreType(value) {

        dispatch((0, _action.UPDATE_STORE_STATE)({ mchntDetail: { storeTp: value[1] } }));
    };

    /**
     * 用于用户更新Redux中的店铺地址区域
     */
    var changeStoreArea = function changeStoreArea(value) {
        var storeArea = value.join('|');
        dispatch((0, _action.UPDATE_STORE_STATE)({ mchntDetail: { area: storeArea } }));
    };

    /**
     * 用于用户更新Redux中的店铺地址
     */
    var changeStoreAddr = function changeStoreAddr(value) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ mchntDetail: { addr: value } }));
    };

    return {
        changeStoreName: changeStoreName,
        // changeInputErrState:bindActionCreators(changeInputErrState,dispatch),
        changeStoreType: changeStoreType,
        changeStoreArea: changeStoreArea,
        changeStoreAddr: changeStoreAddr
    };
};

var _default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(UpStoreInfomationContainers);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(UpStoreInfomationContainers, 'UpStoreInfomationContainers', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/UpStoreInfomation/UpStoreInfomationContainers.js');
    reactHotLoader.register(mapstateToProps, 'mapstateToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/UpStoreInfomation/UpStoreInfomationContainers.js');
    reactHotLoader.register(mapDispathToProps, 'mapDispathToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/UpStoreInfomation/UpStoreInfomationContainers.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/UpStoreInfomation/UpStoreInfomationContainers.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ })

}]);