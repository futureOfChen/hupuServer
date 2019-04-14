(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AddressManagement"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/AddressManagement/AddressManagement.scss":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/AddressManagement/AddressManagement.scss ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#AM {\n  width: 100%;\n  height: 100%;\n  background-color: #EFEFF4;\n  overflow: hidden; }\n  #AM .addressItems {\n    width: 100%;\n    position: relative; }\n    #AM .addressItems .item {\n      display: flex;\n      justify-content: space-around;\n      width: 14rem;\n      font-size: 0;\n      position: relative;\n      left: 0;\n      background-color: #ffffff;\n      transition-duration: 0.2s;\n      -webkit-transition-duration: 0.2s; }\n      #AM .addressItems .item .info {\n        display: inline-block;\n        width: 10rem;\n        height: 1.94667rem;\n        display: flex;\n        box-sizing: border-box;\n        padding: 0.26667rem 0.42667rem; }\n        #AM .addressItems .item .info .text > div {\n          display: flex;\n          align-content: center; }\n        #AM .addressItems .item .info .text span {\n          font-size: 0.37333rem;\n          line-height: 0.64rem; }\n        #AM .addressItems .item .info .text .name, #AM .addressItems .item .info .text .default {\n          width: 2rem;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap; }\n        #AM .addressItems .item .info .text .defaultFlag {\n          width: 2rem;\n          opacity: 0;\n          display: flex;\n          align-items: center;\n          font-size: 0; }\n          #AM .addressItems .item .info .text .defaultFlag.show {\n            opacity: 1; }\n          #AM .addressItems .item .info .text .defaultFlag .icon {\n            display: inline-block;\n            width: 0.90667rem;\n            height: 0.53333rem;\n            background-image: url(" + escape(__webpack_require__(/*! ../../assets/imgs/default.png */ "./src/assets/imgs/default.png")) + ");\n            background-size: 100%; }\n        #AM .addressItems .item .info .text .address {\n          width: 5.6rem;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap; }\n        #AM .addressItems .item .info .rightArrow {\n          margin: auto 0;\n          box-sizing: content-box;\n          border: 10px solid transparent;\n          border-left: 20px solid transparent; }\n      #AM .addressItems .item .handles {\n        display: flex;\n        float: left;\n        width: 3.94667rem;\n        height: 1.94667rem;\n        background-color: yellowgreen; }\n        #AM .addressItems .item .handles div {\n          flex: 1;\n          height: 100%;\n          display: flex;\n          justify-content: center;\n          align-items: center; }\n          #AM .addressItems .item .handles div span {\n            color: #ffffff;\n            font-size: 0.37333rem; }\n          #AM .addressItems .item .handles div a {\n            color: #ffffff;\n            font-size: 0.37333rem; }\n        #AM .addressItems .item .handles div:nth-child(1) {\n          background-color: #C7C7C7; }\n        #AM .addressItems .item .handles div:nth-child(2) {\n          background-image: linear-gradient(135deg, #FF7985 0%, #EB1E3D 100%); }\n      #AM .addressItems .item.edit {\n        left: -3.94667rem; }\n      #AM .addressItems .item.default {\n        margin-bottom: 0.26667rem; }\n      #AM .addressItems .item.default::after {\n        position: absolute;\n        bottom: -0.06667rem;\n        left: 0;\n        content: '';\n        display: block;\n        width: 100%;\n        height: 0.13333rem;\n        background-image: url(" + escape(__webpack_require__(/*! ../../assets/imgs/postLine.png */ "./src/assets/imgs/postLine.png")) + ");\n        background-repeat: no-repeat;\n        background-size: 100%; }\n      #AM .addressItems .item::after {\n        position: absolute;\n        bottom: 0;\n        left: 0.42667rem;\n        content: '';\n        display: block;\n        width: 100%;\n        height: 1px;\n        background-color: #ccc; }\n      #AM .addressItems .item:last-child::after {\n        display: none; }\n  #AM .add {\n    position: fixed;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    box-sizing: border-box;\n    padding: 0.42667rem 0.42667rem; }\n    #AM .add .button {\n      width: 100%;\n      color: #ffffff;\n      background-color: #40A60D;\n      text-align: center;\n      border-radius: 0.08rem;\n      font-size: 0.48rem;\n      line-height: 1.06667rem; }\n      #AM .add .button.edit {\n        background-color: #ccc; }\n", ""]);

// exports
exports.locals = {
	"AM": "AM",
	"addressItems": "addressItems",
	"item": "item",
	"info": "info",
	"text": "text",
	"name": "name",
	"default": "default",
	"defaultFlag": "defaultFlag",
	"show": "show",
	"icon": "icon",
	"address": "address",
	"rightArrow": "rightArrow",
	"handles": "handles",
	"edit": "edit",
	"add": "add",
	"button": "button"
};

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/AddressManagement/AddressManagement.scss":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/AddressManagement/AddressManagement.scss ***!
  \******************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./AddressManagement.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/AddressManagement/AddressManagement.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("20adcd84", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/assets/imgs/default.png":
/*!*************************************!*\
  !*** ./src/assets/imgs/default.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/assets/imgs/postLine.png":
/*!**************************************!*\
  !*** ./src/assets/imgs/postLine.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABGUAAAAPCAYAAABNynJxAAAAAXNSR0IArs4c6QAAAwZJREFUeAHt2OtNI0EQReFZAtocTFxkQx4mh02I9T/8QAw9aqvr8VlCsnG7p+rc1imp/7y9f35uTV6nv9v2evlr8zqft+3jo0277Ro9nS4H+rVN2+d/l+N8+fOqSYCfa+batit+bht9xcb5uWKqjXvi58bhx239JW5pcyszUObytNtiAgbK4gA8fiYBfp5J017LCfDz8ggUMI8AP89jaacABPg5QAhK+I5Ai0sZA+W76P0vLQEDJW10Cn8kwM+PTPwnMQF+Thye0u8J8PM9EZ9TE+Dn1PFVL778pYyBUv0IN+vPQGkWeO12+bl2vu264+d2kVdumJ8rp9uwN35uGHqulktfyhgouQ6jancIGCg7gHydiQA/Z0pLrbsE+HkXkQV5CPBznqxU+gsC/PwLSJasJlD2UsZAWX20PH8qAQNlKk6brSXAz2v5e/pkAvw8GajtVhLg55X0PXs6AX6ejtSGzyFQ8lLGQHnOYbHrIgIGyiLwHvsMAvz8DKr2XEaAn5eh9+D5BPh5PlM7LiTAzwvhe/QogXKXMgbK6BGwPjQBAyV0PIobI8DPY7ysDk6An4MHpLwRAvw8Qsva8AT4OXxECrwlUOpSxkC5Dden5AQMlOQBKv+aAD9f0/A+PQF+Th+hBr4I8PMXC+8KEODnAiH2a6HMpYyB0u/wlu7YQCkdb7fm+Llb4sX75efiAfdqj5975V2+W34uH3HVBktcyhgoVY9n074MlKbB12ybn2vm2rYrfm4bfcXG+bliqo174ufG4edvPf2ljIGS/xDq4IqAgXIFw9vsBPg5e4LqvyHAzzc4fMhNgJ9z56f6OwL8fAfEx2wEUl/KGCjZjpt6fyRgoPyIx5e5CPBzrrxUu0OAn3cA+ToTAX7OlJZadwnw8y4iC+ITSHspY6DEP1wqHCBgoAzAsjQ6AX6OnpD6hgjw8xAui2MT4OfY+ahukAA/DwKzPCqBlJcyBkrU46SuQwQMlEPY/CgmAX6OmYuqDhLg54Pg/CwiAX6OmIqaDhPg58Po/DAegf+ZrmtKttzHwQAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./src/components/AddressManagement/AddressManagement.js":
/*!***************************************************************!*\
  !*** ./src/components/AddressManagement/AddressManagement.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

__webpack_require__(/*! ./AddressManagement.scss */ "./src/components/AddressManagement/AddressManagement.scss");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var AddressManagement = function (_Component) {
    (0, _inherits3.default)(AddressManagement, _Component);

    function AddressManagement(props) {
        (0, _classCallCheck3.default)(this, AddressManagement);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AddressManagement.__proto__ || (0, _getPrototypeOf2.default)(AddressManagement)).call(this, props));

        _this.changeRightIconOfNavBar = function () {
            if (_this.state.isEdit) {
                (0, _request.beforeEnterRouter)("收货地址", '取消', function () {
                    _this.setState({ isEdit: !_this.state.isEdit });
                }, null);
            } else {
                (0, _request.beforeEnterRouter)("收货地址", '编辑', function () {
                    _this.setState({ isEdit: !_this.state.isEdit });
                }, _request.Env.currentPath + "static/imgs/edit.png");
            }
        };

        _this.state = {
            isEdit: false
        };
        return _this;
    }

    /**
     * 根据页面是否处于编辑状态（isEdit），更改导航栏右上角图标的显示
     */


    (0, _createClass3.default)(AddressManagement, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            (0, _request.beforeEnterRouter)();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.changeRightIconOfNavBar();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.changeRightIconOfNavBar();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            (0, _request.beforeEnterRouter)();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                addressList = _props.addressList,
                clickToDelAddr = _props.clickToDelAddr,
                clickToChangeStoreAddr = _props.clickToChangeStoreAddr; // 获取从container传递过来的属性和方法

            var FLAG_DEF_ADDR = '1',
                // 默认地址标致
            FLAG_NORMAL_ADDR = '0'; // 非默认地址标致

            // 遍历数组，确保默认地址第一位显示
            addressList.forEach(function (item, index) {
                if (item.state == FLAG_DEF_ADDR && index != 0) {
                    var temp = item;
                    addressList[index] = addressList[0];
                    addressList[0] = temp;
                }
            });

            // 使用排序后的地址列表数组，渲染出地址列表组件
            var addrListComponents = addressList.map(function (ele, index) {

                var itemClassName = 'item',
                    // 单条地址item的类名
                defIconClassName = 'defaultFlag';
                if (ele.state == FLAG_DEF_ADDR) {
                    itemClassName += ' default';
                    defIconClassName += ' show';
                }
                if (!!_this2.state.isEdit) {
                    // 当前是编辑状态
                    itemClassName += ' edit';
                }

                return _react2.default.createElement(
                    "div",
                    { className: itemClassName, key: index },
                    _react2.default.createElement(
                        "div",
                        { className: "info" },
                        _react2.default.createElement(
                            "div",
                            { className: "text", onClick: function onClick() {
                                    clickToChangeStoreAddr(ele);
                                } },
                            _react2.default.createElement(
                                "div",
                                null,
                                _react2.default.createElement(
                                    "span",
                                    { className: "name" },
                                    " ",
                                    ele.memberName,
                                    " "
                                ),
                                _react2.default.createElement(
                                    "span",
                                    { className: "tel" },
                                    " ",
                                    ele.mobile,
                                    " "
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                null,
                                _react2.default.createElement(
                                    "span",
                                    { className: defIconClassName },
                                    _react2.default.createElement("i", { className: "icon" })
                                ),
                                _react2.default.createElement(
                                    "span",
                                    { className: "address" },
                                    ele.addressInfo
                                )
                            )
                        ),
                        _react2.default.createElement(_reactRouterDom.Link, { className: "rightArrow", to: "/handleAddress?addrItem=" + encodeURIComponent((0, _stringify2.default)(ele)) })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "handles" },
                        _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: "/handleAddress?addrItem=" + encodeURIComponent((0, _stringify2.default)(ele)) },
                                "\u7F16\u8F91"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                "span",
                                { onClick: function onClick() {
                                        clickToDelAddr(ele.id + '');
                                    } },
                                "\u5220\u9664"
                            )
                        )
                    )
                );
            });

            // 通过添加按钮传递给HandleAddress页面的地址信息
            var addrItemToSendByAddBtn = {
                "id": "", //地址id
                "memberId": "", //merId
                "memberName": "", //用户名
                "provinceId": "", //省ID
                "cityId": "", //市ID
                "areaId": "", //区ID
                "addAll": '', //省市区组合
                "addressInfo": "", //详细地址
                "mobile": "", //手机号
                "phone": "", //手机号
                "email": "", //邮件地址
                "zipCode": "", // zipCode
                "state": FLAG_NORMAL_ADDR //state必须设置为'0'
            };

            return _react2.default.createElement(
                "div",
                { id: "AM" },
                _react2.default.createElement(
                    "div",
                    { className: "addressItems" },
                    addrListComponents
                ),
                _react2.default.createElement(
                    "div",
                    { className: "add" },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: "/handleAddress?addrItem=" + encodeURIComponent((0, _stringify2.default)(addrItemToSendByAddBtn)) },
                        _react2.default.createElement(
                            "button",
                            { className: this.state.isEdit ? "button edit" : " button ",
                                disabled: this.state.isEdit },
                            " \u65B0\u589E"
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
    return AddressManagement;
}(_react.Component);

var _default = AddressManagement;
exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(AddressManagement, "AddressManagement", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/AddressManagement/AddressManagement.js");
    reactHotLoader.register(_default, "default", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/AddressManagement/AddressManagement.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/AddressManagement/AddressManagement.scss":
/*!*****************************************************************!*\
  !*** ./src/components/AddressManagement/AddressManagement.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./AddressManagement.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/AddressManagement/AddressManagement.scss");

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

/***/ "./src/components/AddressManagement/AddressManagementActions.js":
/*!**********************************************************************!*\
  !*** ./src/components/AddressManagement/AddressManagementActions.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeStoreAddr = changeStoreAddr;

var _store = __webpack_require__(/*! ../../store/store */ "./src/store/store.js");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__(/*! ../../store/action */ "./src/store/action.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

/**
 * 更改redux中的storeAddr
 * @param {*} addrInfo 地址详情
 */
function changeStoreAddr(addrInfo) {

    var addrItemToUpdate = {
        delivNm: "NO_DEFAULT", //收货人,设为非空，目的是返回申请物料页面时，不必再去发送请求，获取地址列表
        addAll: "", //地区名称
        delivPhone: "", //收货电话
        provinceId: "", //省ID
        cityId: "", //市ID
        areaId: "", //地区ID
        addressInfo: "", //详细地址
        id: ''
    };

    if (!!addrInfo.id && !!addrInfo.addAll) {
        //传递的是已存在的地址
        // 从地址信息中获取对应信息
        var memberName = addrInfo.memberName,
            addAll = addrInfo.addAll,
            phone = addrInfo.phone,
            provinceId = addrInfo.provinceId,
            cityId = addrInfo.cityId,
            areaId = addrInfo.areaId,
            addressInfo = addrInfo.addressInfo,
            id = addrInfo.id;

        addrItemToUpdate = {
            delivNm: memberName, //收货人
            addAll: addAll, //地区名称
            delivPhone: phone, //收货电话
            provinceId: provinceId, //省ID
            cityId: cityId, //市ID
            areaId: areaId, //地区ID
            addressInfo: addressInfo, //详细地址
            id: id //地址id
        };
    }

    _store2.default.dispatch((0, _action.UPDATE_STORE_STATE)({
        storeAddr: addrItemToUpdate
    }));
}
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(changeStoreAddr, 'changeStoreAddr', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/AddressManagement/AddressManagementActions.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/AddressManagement/AddressManagementContainer.js":
/*!************************************************************************!*\
  !*** ./src/components/AddressManagement/AddressManagementContainer.js ***!
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

var _AddressManagement = __webpack_require__(/*! ./AddressManagement */ "./src/components/AddressManagement/AddressManagement.js");

var _AddressManagement2 = _interopRequireDefault(_AddressManagement);

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

var _store = __webpack_require__(/*! ../../store/store */ "./src/store/store.js");

var _store2 = _interopRequireDefault(_store);

var _action = __webpack_require__(/*! ../../store/action */ "./src/store/action.js");

var _AddressManagementActions = __webpack_require__(/*! ./AddressManagementActions */ "./src/components/AddressManagement/AddressManagementActions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var AddressManagementContainer = function (_Component) {
    (0, _inherits3.default)(AddressManagementContainer, _Component);

    function AddressManagementContainer() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, AddressManagementContainer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AddressManagementContainer.__proto__ || (0, _getPrototypeOf2.default)(AddressManagementContainer)).call.apply(_ref, [this].concat(args))), _this), _this.clickToChangeStoreAddr = function (addrItem) {
            (0, _AddressManagementActions.changeStoreAddr)(addrItem);
            _this.props.history.go(-1);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    /**
     * 在地址列表管理页面点击地址详情时，更改申请物料页面申请物料的地址信息，然后回退到申请物料页面
     * @param {*} addrItem 选中的地址信息
     */


    (0, _createClass3.default)(AddressManagementContainer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_AddressManagement2.default, (0, _extends3.default)({}, this.props, { clickToChangeStoreAddr: this.clickToChangeStoreAddr }));
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return AddressManagementContainer;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {
    return {
        addressList: state.getIn(['addressList']).toJS() //地址列表
    };
};
var mapDispathToProps = function mapDispathToProps(dispatch) {

    /**
     * 删除对应id的地址信息
     * @param {*} addrId 地址id
     */
    function clickToDelAddr(addrId) {
        (0, _requestAPI.deleteAddress)({
            id: addrId
        }).then(function (param) {
            var delId = param.id;
            var FLAG_DEF_ADDR = '1'; //默认地址的标识符
            // console.log('id'+delId);
            var addrList = _store2.default.getState().getIn(['addressList']).toJS();
            var storeAddr = _store2.default.getState().getIn(['storeAddr']).toJS();
            // 删除完成后更新redux中的addressList
            var lastestAddrList = addrList.filter(function (item) {
                return item.id != delId;
            });
            dispatch((0, _action.UPDATE_STORE_STATE)({ 'addressList': lastestAddrList }));

            //如果当前删除的是物料申请页面选中的地址，则需要更新申请物料页面使用的storeAddr
            if (storeAddr.id == delId) {
                var addrItem = {};
                // 如果有默认地址，则将默认地址设为将要更新的地址
                lastestAddrList.forEach(function (item) {
                    if (item.state == FLAG_DEF_ADDR) {
                        addrItem = item;
                    }
                });
                (0, _AddressManagementActions.changeStoreAddr)(addrItem);
            }
        });
    }
    return {
        clickToDelAddr: clickToDelAddr
    };
};

var _default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(AddressManagementContainer);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(AddressManagementContainer, 'AddressManagementContainer', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/AddressManagement/AddressManagementContainer.js');
    reactHotLoader.register(mapstateToProps, 'mapstateToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/AddressManagement/AddressManagementContainer.js');
    reactHotLoader.register(mapDispathToProps, 'mapDispathToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/AddressManagement/AddressManagementContainer.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/AddressManagement/AddressManagementContainer.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ })

}]);