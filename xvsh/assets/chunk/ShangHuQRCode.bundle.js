(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ShangHuQRCode"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/ShangHuQRCode/ShangHuQRCode.scss":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/ShangHuQRCode/ShangHuQRCode.scss ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#qrcode {\n  min-height: 100%; }\n  #qrcode .container {\n    margin-top: 0.8rem;\n    text-align: center; }\n  #qrcode .sh-code-canvas {\n    width: 6.37333rem;\n    height: 9.09333rem; }\n", ""]);

// exports
exports.locals = {
	"qrcode": "qrcode",
	"container": "container",
	"sh-code-canvas": "sh-code-canvas"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/ShangHuQRCode/ShangHuQRCode.scss":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/ShangHuQRCode/ShangHuQRCode.scss ***!
  \**********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./ShangHuQRCode.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/ShangHuQRCode/ShangHuQRCode.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("081a0a69", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/assets/imgs/qrcode-bg-xiaowei.png":
/*!***********************************************!*\
  !*** ./src/assets/imgs/qrcode-bg-xiaowei.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/imgs/qrcode-bg-xiaowei.png";

/***/ }),

/***/ "./src/components/ShangHuQRCode/ShangHuQRCode.js":
/*!*******************************************************!*\
  !*** ./src/components/ShangHuQRCode/ShangHuQRCode.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

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

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

__webpack_require__(/*! ./ShangHuQRCode.scss */ "./src/components/ShangHuQRCode/ShangHuQRCode.scss");

var _qrcodeBgXiaowei = __webpack_require__(/*! ../../assets/imgs/qrcode-bg-xiaowei.png */ "./src/assets/imgs/qrcode-bg-xiaowei.png");

var _qrcodeBgXiaowei2 = _interopRequireDefault(_qrcodeBgXiaowei);

var _button = __webpack_require__(/*! antd-mobile/lib/button */ "./node_modules/antd-mobile/lib/button/index.js");

var _button2 = _interopRequireDefault(_button);

var _modal = __webpack_require__(/*! antd-mobile/lib/modal */ "./node_modules/antd-mobile/lib/modal/index.js");

var _modal2 = _interopRequireDefault(_modal);

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var ShangHuQRCode = function (_React$Component) {
    (0, _inherits3.default)(ShangHuQRCode, _React$Component);

    function ShangHuQRCode(props, context) {
        (0, _classCallCheck3.default)(this, ShangHuQRCode);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ShangHuQRCode.__proto__ || (0, _getPrototypeOf2.default)(ShangHuQRCode)).call(this, props, context));

        _this.makecanvas = function (url, num) {

            _this.canvas = document.getElementById('sh-code-canvas');
            var canvas = _this.canvas;
            /**
             * 清除画布内容
             */
            _this.canvas.width = _this.canvas.width;
            var ctx = _this.canvas.getContext('2d');

            var img = new Image();
            img.src = _qrcodeBgXiaowei2.default;
            img.onload = function () {

                //設置畫佈的寬高
                canvas.setAttribute('width', img.width);
                canvas.setAttribute('height', img.height);

                //在畫布上畫背景圖
                ctx.drawImage(img, 0, 0);

                var textbgURL = (0, _request.createTextCanvase)(num, "#ce4041", 682);
                var textUri = textbgURL;
                var textImg = new Image();
                textImg.src = textUri;
                textImg.onload = function () {
                    ctx.drawImage(textImg, 1336, 750);
                };

                //二維碼圖片大小
                var qrcodeWidthAndHeight = 776;
                //清除二维码
                document.getElementById("qrCodeimg").innerHTML = "";
                var qrcode = new QRCode(document.getElementById("qrCodeimg"), {
                    text: url,
                    height: qrcodeWidthAndHeight,
                    width: qrcodeWidthAndHeight,
                    correctLevel: QRCode.CorrectLevel.L
                });
                var qrcodeImg = document.getElementById("qrCodeimg").getElementsByTagName('img')[0];
                qrcodeImg.onload = function () {
                    //畫二維碼的圖片
                    var qrcodeDx = 364,
                        qrcodeDy = 668;
                    ctx.drawImage(qrcodeImg, qrcodeDx, qrcodeDy);
                };
            };
        };

        _this.saveQRCode = function () {
            new _promise2.default(function (resolve, reject) {
                (0, _request.savePicToLocal)(_this.canvas, resolve);
            }).then(function (qrResult) {
                if (qrResult == "success") {
                    _modal2.default.alert('图片已保存至相册', '可打印张贴在店铺内，供顾客扫码支付', [{
                        text: '确认', onPress: function onPress() {}
                    }]);
                } else {
                    _modal2.default.alert('图片保存失败', '请检查系统设置并重新尝试', [{
                        text: '确认', onPress: function onPress() {}
                    }]);
                }
            });
        };

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(ShangHuQRCode, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            (0, _request.beforeEnterRouter)("我的收款码");

            var _props = this.props,
                qrUrl = _props.qrUrl,
                qrNum = _props.qrNum;

            if (!!qrUrl && !!qrNum) {
                this.makecanvas(qrUrl, 'NO.' + qrNum);
            } else {
                //获取商户的Url
                (0, _requestAPI.getQrUrlRest)().then(function (response) {
                    var _response$data = response.data,
                        qrUrl = _response$data.qrUrl,
                        qrNum = _response$data.qrNum;

                    _this2.makecanvas(qrUrl, 'NO.' + qrNum);
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "qrcode" },
                _react2.default.createElement(
                    "div",
                    { id: "contentWarp" },
                    _react2.default.createElement(
                        "div",
                        { className: "container" },
                        _react2.default.createElement(
                            "canvas",
                            { className: "sh-code-canvas", id: "sh-code-canvas" },
                            _react2.default.createElement("div", { id: "qrCodeimg" })
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "submit-warp-button" },
                    _react2.default.createElement(
                        _button2.default,
                        { type: "primary", onClick: this.saveQRCode },
                        "\u4FDD\u5B58\u6536\u6B3E\u7801"
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
    return ShangHuQRCode;
}(_react2.default.Component);

var mapstateToProps = function mapstateToProps(state) {
    return {
        qrUrl: state.getIn(["mchntDetail", "qrUrl"]),
        qrNum: state.getIn(["mchntDetail", "qrNum"])
    };
};

var _default = (0, _reactRedux.connect)(mapstateToProps)(ShangHuQRCode);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(ShangHuQRCode, "ShangHuQRCode", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ShangHuQRCode/ShangHuQRCode.js");
    reactHotLoader.register(mapstateToProps, "mapstateToProps", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ShangHuQRCode/ShangHuQRCode.js");
    reactHotLoader.register(_default, "default", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ShangHuQRCode/ShangHuQRCode.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/ShangHuQRCode/ShangHuQRCode.scss":
/*!*********************************************************!*\
  !*** ./src/components/ShangHuQRCode/ShangHuQRCode.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./ShangHuQRCode.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/ShangHuQRCode/ShangHuQRCode.scss");

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