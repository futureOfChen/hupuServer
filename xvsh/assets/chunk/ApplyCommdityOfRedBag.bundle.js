(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ApplyCommdityOfRedBag"],{

/***/ "./src/assets/imgs/commdity2.png":
/*!***************************************!*\
  !*** ./src/assets/imgs/commdity2.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/imgs/commdity2.png";

/***/ }),

/***/ "./src/components/ApplyCommdityOfRedBag/ApplyCommdityContainer.js":
/*!************************************************************************!*\
  !*** ./src/components/ApplyCommdityOfRedBag/ApplyCommdityContainer.js ***!
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

var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "./node_modules/babel-runtime/core-js/json/stringify.js");

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "./node_modules/babel-runtime/core-js/object/assign.js");

var _assign2 = _interopRequireDefault(_assign);

var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ "./node_modules/babel-runtime/core-js/object/keys.js");

var _keys2 = _interopRequireDefault(_keys);

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

var _ApplyCommdityActions = __webpack_require__(/*! ../ApplyCommdity/ApplyCommdityActions */ "./src/components/ApplyCommdity/ApplyCommdityActions.js");

var _ApplyCommdity = __webpack_require__(/*! ../ApplyCommdity/ApplyCommdity */ "./src/components/ApplyCommdity/ApplyCommdity.js");

var _ApplyCommdity2 = _interopRequireDefault(_ApplyCommdity);

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _action = __webpack_require__(/*! ../../store/action */ "./src/store/action.js");

var _commdity = __webpack_require__(/*! ../../assets/imgs/commdity2.png */ "./src/assets/imgs/commdity2.png");

var _commdity2 = _interopRequireDefault(_commdity);

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

/**
 * 该文件用于申请红包码物料和收款码物料，目前已经放弃
 */
var ApplyCommdityContainer = function (_Component) {
    (0, _inherits3.default)(ApplyCommdityContainer, _Component);

    function ApplyCommdityContainer(props, context) {
        (0, _classCallCheck3.default)(this, ApplyCommdityContainer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ApplyCommdityContainer.__proto__ || (0, _getPrototypeOf2.default)(ApplyCommdityContainer)).call(this, props, context));

        _this.handleClick = function () {
            var _this$props = _this.props,
                storeAddr = _this$props.storeAddr,
                isAgree = _this$props.isAgree,
                history = _this$props.history,
                redUrlStr = _this$props.redUrlStr;


            var key = null,
                self = _this;
            (0, _keys2.default)(storeAddr).forEach(function (n) {
                if (storeAddr[n].length == 0) {
                    key = n;
                }
            });

            if (!!key) {
                (0, _request.toast)("您的地址当中缺少必要数据");
            } else if (!isAgree) {
                (0, _request.toast)("如果您已阅读《收款码服务使用条款》并同意，请勾选它");
            } else {
                (0, _request.getCurrentLocationInfo)(function (city) {
                    if (!!redUrlStr) {
                        var materielList = [{
                            materielType: "00",
                            count: "1"
                        }, {
                            materielType: "10",
                            count: "1"
                        }];

                        (0, _ApplyCommdityActions.applyMatAPI)(history, (0, _assign2.default)(storeAddr, { materielList: (0, _stringify2.default)(materielList) }, { cityNm: city.cityCd }, { redUrl: (0, _stringify2.default)({ redUrl: redUrlStr }) }));
                    } else {
                        (0, _request.toast)("获取红包码地址失败");
                    }
                });
            }
        };

        _this.unblock = null;
        return _this;
    }

    (0, _createClass3.default)(ApplyCommdityContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _request.beforeEnterRouter)('申请收款码物料');
            /**
             * 设置默认地址
             */
            (0, _ApplyCommdityActions.setDefaultAddr)();

            //控制路由
            this.unblock = this.props.history.block(function (location, action) {
                if (action == "POP") {
                    return "尚未申请收款码贴纸和挂牌|还未申请收款码贴纸，是否继续申请收款码贴纸，用于店铺内收款？|/s/wl/xvsh/index.html#/applyCommdityOfRedbag/storeInfo";
                }
            });

            //初始化红包码地址
            (0, _requestAPI.sharlink)();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unblock && this.unblock();
        }
    }, {
        key: 'render',
        value: function render() {
            // console.log(this.props);
            return _react2.default.createElement(_ApplyCommdity2.default, (0, _extends3.default)({}, this.props, { handleClick: this.handleClick }));
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return ApplyCommdityContainer;
}(_react.Component);

var mapstateToProps = function mapstateToProps(state) {

    /**
     * storeAddr   默认地址
     * isAgree     是否同意协议
     * picture     头图
     * introduce   简介
     */
    return {
        redUrlStr: state.getIn(["redUrlStr"]),
        storeAddr: state.getIn(["storeAddr"]).toJS(),
        isAgree: state.getIn(["isAgreeReceivablesCodeAgreement"]),
        picture: _commdity2.default,
        introduce: "推荐使用收款和红包码物料，收款安全方便，<br/>赚取红包赏金，自主免费开通更便捷，马上体验吧~"
    };
};

var mapDispathToProps = function mapDispathToProps(dispatch) {
    /**
     * 更新redux 中的isAgreeReceivablesCodeAgreement
     * @param val 同意协议与否
     */
    var changeApplyCommdityAgreement = function changeApplyCommdityAgreement(val) {
        dispatch((0, _action.UPDATE_STORE_STATE)({ isAgreeReceivablesCodeAgreement: val }));
    };
    return {
        changeApplyCommdityAgreement: changeApplyCommdityAgreement
    };
};

var _default = (0, _reactRedux.connect)(mapstateToProps, mapDispathToProps)(ApplyCommdityContainer);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(ApplyCommdityContainer, 'ApplyCommdityContainer', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ApplyCommdityOfRedBag/ApplyCommdityContainer.js');
    reactHotLoader.register(mapstateToProps, 'mapstateToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ApplyCommdityOfRedBag/ApplyCommdityContainer.js');
    reactHotLoader.register(mapDispathToProps, 'mapDispathToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ApplyCommdityOfRedBag/ApplyCommdityContainer.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ApplyCommdityOfRedBag/ApplyCommdityContainer.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ })

}]);