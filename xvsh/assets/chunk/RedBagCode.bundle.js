(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["RedBagCode"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagCode/RedBagCode.scss":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/RedBagCode/RedBagCode.scss ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#rbc {\n  height: 100%; }\n  #rbc .container {\n    width: 9.2rem;\n    height: 11.50667rem;\n    margin: auto;\n    position: relative; }\n    #rbc .container #canvasWrapper {\n      width: 100%;\n      height: 100%; }\n    #rbc .container .download {\n      font-size: 0.42667rem;\n      line-height: 0.6rem;\n      color: #FFFFFF;\n      letter-spacing: 0.02667rem;\n      position: absolute;\n      top: 10.32rem;\n      left: 1.87333rem; }\n  #rbc .regDetail {\n    margin-top: 0.50667rem;\n    display: flex;\n    align-items: center;\n    padding: 0.21333rem 0.32rem 0.18667rem 0.69333rem;\n    background: #F5F5F5;\n    border-radius: 0.24rem; }\n    #rbc .regDetail .regIntroduce {\n      flex: 1; }\n      #rbc .regDetail .regIntroduce .item1 {\n        font-size: 0.42667rem;\n        line-height: 0.6rem;\n        color: #000000; }\n        #rbc .regDetail .regIntroduce .item1 span {\n          color: #EA0723; }\n      #rbc .regDetail .regIntroduce .item2 {\n        font-size: 0.34667rem;\n        color: #9B9B9B;\n        line-height: 0.49333rem; }\n  #rbc .submit-warp-button {\n    padding: 0.38667rem 0.4rem 0.65333rem; }\n    #rbc .submit-warp-button .share-btn {\n      height: 1.34667rem;\n      background: #ED171F;\n      border-radius: 0.24rem;\n      font-size: 0.56rem;\n      line-height: 0.56rem;\n      color: #FFFFFF;\n      text-align: center;\n      vertical-align: bottom; }\n", ""]);

// exports
exports.locals = {
	"rbc": "rbc",
	"container": "container",
	"canvasWrapper": "canvasWrapper",
	"download": "download",
	"regDetail": "regDetail",
	"regIntroduce": "regIntroduce",
	"item1": "item1",
	"item2": "item2",
	"submit-warp-button": "submit-warp-button",
	"share-btn": "share-btn"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagCode/RedBagCode.scss":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/RedBagCode/RedBagCode.scss ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./RedBagCode.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagCode/RedBagCode.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("625d3983", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/assets/imgs/qrcode-bg.png":
/*!***************************************!*\
  !*** ./src/assets/imgs/qrcode-bg.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/imgs/qrcode-bg.png";

/***/ }),

/***/ "./src/components/RedBagCode/RedBagCode.js":
/*!*************************************************!*\
  !*** ./src/components/RedBagCode/RedBagCode.js ***!
  \*************************************************/
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

__webpack_require__(/*! ./RedBagCode.scss */ "./src/components/RedBagCode/RedBagCode.scss");

var _qrcodeBg = __webpack_require__(/*! ../../assets/imgs/qrcode-bg.png */ "./src/assets/imgs/qrcode-bg.png");

var _qrcodeBg2 = _interopRequireDefault(_qrcodeBg);

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

var _connect = __webpack_require__(/*! react-redux/es/connect/connect */ "./node_modules/react-redux/es/connect/connect.js");

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var RedBagCode = function (_React$Component) {
    (0, _inherits3.default)(RedBagCode, _React$Component);

    function RedBagCode(props, context) {
        (0, _classCallCheck3.default)(this, RedBagCode);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RedBagCode.__proto__ || (0, _getPrototypeOf2.default)(RedBagCode)).call(this, props, context));

        _this.share1 = function () {
            var href = _this.props.redUrlStr;
            console.log("分享链接是：" + href);
            (0, _request.share)("扫码领红包", "云闪付APP，扫码领红包，天天可领，人人有份", _request.Env.currentPath + "static/imgs/sharePic.png", href);
        };

        _this.downLoad = function () {
            (0, _request.saveQcode)(_this.canvas);
        };

        _this.redirect = function () {
            _this.props.history.push({
                pathname: "/applyCommdityOfRedBagSingle/storeInfo"
            });
        };

        _this.makecanvas = function (redUrlstr) {

            _this.canvas = document.getElementById('canvasWrapper');
            var ctx = _this.canvas.getContext('2d');
            _this.canvas.width = _this.canvas.width;
            //設置畫佈的寬高
            var canvas = _this.canvas;

            var img = new Image();
            img.src = _qrcodeBg2.default;
            img.onload = function () {
                canvas.setAttribute('width', img.width);
                canvas.setAttribute('height', img.height);
                //在畫布上畫背景圖
                ctx.drawImage(img, 0, 0);
                //二維碼圖片大小
                var qrcodeWidthAndHeight = 502;

                document.getElementById("qrcode").innerHTML = "";
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: redUrlstr,
                    height: qrcodeWidthAndHeight,
                    width: qrcodeWidthAndHeight,
                    correctLevel: QRCode.CorrectLevel.L
                });
                var qrcodeImg = document.getElementById("qrcode").getElementsByTagName('img')[0];
                qrcodeImg.onload = function () {
                    //畫二維碼的圖片
                    var qrcodeDx = 267,
                        qrcodeDy = 525;
                    ctx.drawImage(qrcodeImg, qrcodeDx, qrcodeDy);
                };
            };
        };

        return _this;
    }

    (0, _createClass3.default)(RedBagCode, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            (0, _request.beforeEnterRouter)('红包码', "活动规则", function () {
                _this2.props.history.push({ pathname: "/activityRule" });
            });

            /**
             * 如果红包码地址存在则直接渲染canvase
             */
            var redUrlStr = this.props.redUrlStr;

            if (!!redUrlStr) {
                this.makecanvas(redUrlStr);
            } else {
                /**
                 * 否则先读取红包码地址在渲染canvase
                 */
                (0, _requestAPI.sharlink)().then(function (redUrlStr) {
                    _this2.makecanvas(redUrlStr);
                });
            }
        }
    }, {
        key: "render",
        value: function render() {

            return _react2.default.createElement(
                "div",
                { id: "rbc" },
                _react2.default.createElement(
                    "div",
                    { id: "contentWarp" },
                    _react2.default.createElement(
                        "div",
                        { className: "container" },
                        _react2.default.createElement(
                            "canvas",
                            { className: "canvasWrapper", id: "canvasWrapper", width: "100%", height: "100%" },
                            _react2.default.createElement("div", { id: "qrcode" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "download" },
                            _react2.default.createElement(
                                "a",
                                { onClick: this.redirect },
                                "\u7EA2\u5305\u7801\u8D34\u7EB8"
                            ),
                            " \xA0|\xA0",
                            _react2.default.createElement(
                                "a",
                                { onClick: this.downLoad },
                                "\u4E0B\u8F7D\u9AD8\u6E05\u6D77\u62A5"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "submit-warp-button " },
                        _react2.default.createElement(
                            "a",
                            { className: "share-btn", onClick: this.share1 },
                            "\u5206\u4EAB\u8D5A\u8D4F\u91D1"
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
    return RedBagCode;
}(_react2.default.Component);

var mapstateToProps = function mapstateToProps(state) {
    return {
        redUrlStr: state.getIn(["redUrlStr"])
    };
};

var _default = (0, _connect2.default)(mapstateToProps)(RedBagCode);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(RedBagCode, "RedBagCode", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/RedBagCode/RedBagCode.js");
    reactHotLoader.register(mapstateToProps, "mapstateToProps", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/RedBagCode/RedBagCode.js");
    reactHotLoader.register(_default, "default", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/RedBagCode/RedBagCode.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/RedBagCode/RedBagCode.scss":
/*!***************************************************!*\
  !*** ./src/components/RedBagCode/RedBagCode.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./RedBagCode.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagCode/RedBagCode.scss");

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