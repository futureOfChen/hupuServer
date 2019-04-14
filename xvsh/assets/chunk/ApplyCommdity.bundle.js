(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ApplyCommdity"],{

/***/ "./src/assets/imgs/commdity.png":
/*!**************************************!*\
  !*** ./src/assets/imgs/commdity.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/imgs/commdity.png";

/***/ }),

/***/ "./src/assets/imgs/commdity2.png":
/*!***************************************!*\
  !*** ./src/assets/imgs/commdity2.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/imgs/commdity2.png";

/***/ }),

/***/ "./src/components/ApplyCommdity/ApplyCommdityContainer.js":
/*!****************************************************************!*\
  !*** ./src/components/ApplyCommdity/ApplyCommdityContainer.js ***!
  \****************************************************************/
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

var _ApplyCommdityActions = __webpack_require__(/*! ./ApplyCommdityActions */ "./src/components/ApplyCommdity/ApplyCommdityActions.js");

var _ApplyCommdity = __webpack_require__(/*! ./ApplyCommdity */ "./src/components/ApplyCommdity/ApplyCommdity.js");

var _ApplyCommdity2 = _interopRequireDefault(_ApplyCommdity);

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

var _action = __webpack_require__(/*! ../../store/action */ "./src/store/action.js");

var _commdity = __webpack_require__(/*! ../../assets/imgs/commdity.png */ "./src/assets/imgs/commdity.png");

var _commdity2 = _interopRequireDefault(_commdity);

var _commdity3 = __webpack_require__(/*! ../../assets/imgs/commdity2.png */ "./src/assets/imgs/commdity2.png");

var _commdity4 = _interopRequireDefault(_commdity3);

var _requestAPI = __webpack_require__(/*! ../../assets/util/requestAPI */ "./src/assets/util/requestAPI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

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


            var key = null;
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

                    var param = void 0;
                    var search = (0, _request.getSearchParam)(_this.props.location.search);
                    if (!!search.redCodeSt && search.redCodeSt == "00" || search.redCodeSt == "02") {
                        //如果是00 或者是 02 说明来自申码页面，并且用户不在黑名单，申请红包码和收款码

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
                    } else if (!!search.redCodeSt) {
                        //如果是 01 redCodeSt 存在，说明来自申码页面，用户在黑名单或者其他状态

                        var _materielList = [{
                            materielType: "00",
                            count: "1"
                        }];
                        (0, _ApplyCommdityActions.applyMatAPI)(history, (0, _assign2.default)(storeAddr, { materielList: (0, _stringify2.default)(_materielList) }, { cityNm: city.cityCd }));
                    } else {
                        /**
                         * 用户前面放弃过申请物料，从客户端直接跳转进来
                         */
                        var _this$props2 = _this.props,
                            isblack = _this$props2.isblack,
                            _isApply = _this$props2.isApply;

                        if (isblack == "0" && _isApply == "1") {
                            //用户不在黑名单并且 申请过红包码，申请红包码和收款码
                            if (!!redUrlStr) {
                                var _materielList2 = [{
                                    materielType: "00",
                                    count: "1"
                                }, {
                                    materielType: "10",
                                    count: "1"
                                }];

                                (0, _ApplyCommdityActions.applyMatAPI)(history, (0, _assign2.default)(storeAddr, { materielList: (0, _stringify2.default)(_materielList2) }, { cityNm: city.cityCd }, { redUrl: (0, _stringify2.default)({ redUrl: redUrlStr }) }));
                            } else {
                                (0, _request.toast)("获取红包码地址失败");
                            }
                        } else if (isblack == "1" || _isApply == "0") {

                            //用户在黑名单或未申请红包码

                            var _materielList3 = [{
                                materielType: "00",
                                count: "1"
                            }];
                            (0, _ApplyCommdityActions.applyMatAPI)(history, (0, _assign2.default)(storeAddr, { materielList: (0, _stringify2.default)(_materielList3) }, { cityNm: city.cityCd }));
                        }
                    }
                });
            }
        };

        _this.unblock = null;

        _this.state = {
            picture: "",
            introduce: ""
        };

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
                    return "尚未申请收款码贴纸和挂牌|还未申请收款码贴纸，是否继续申请收款码贴纸，用于店铺内收款？|/s/wl/xvsh/index.html#/applyCommdity/storeInfo";
                }
            });

            var search = (0, _request.getSearchParam)(this.props.location.search);

            if (!!search.redCodeSt && search.redCodeSt == "00" || search.redCodeSt == "02") {
                //如果是00 或者是 02 说明来自申码页面，并且用户不在黑名单
                (0, _requestAPI.sharlink)();
            } else if (!search.redCodeSt) {
                //redCodeSt 不存在说明从客户端直接跳过来的页面此时需要，通过优惠组的接口决定
                (0, _requestAPI.isBlack)(function (resp) {
                    console.log('isBlack:我是真正的update函数');
                }).then(function (response) {
                    var preResp = response;
                    if (response.data.blackSt == "0") {
                        (0, _requestAPI.isApply)().then(function (response) {
                            if (response.data.applySt == "1") {
                                (0, _requestAPI.sharlink)().then(function () {
                                    // 通知update函数，success执行完毕
                                    if (!!preResp.fuc) {
                                        preResp.fuc.endOfFunc();
                                        console.log('isBlack: success函数执行完毕');
                                    }
                                });
                            } else {
                                // 通知update函数，success执行完毕
                                if (!!preResp.fuc) {
                                    preResp.fuc.endOfFunc();
                                }
                                console.log('isBlack: success函数执行完毕');
                            }
                        });
                    }
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unblock && this.unblock();
        }
    }, {
        key: 'render',
        value: function render() {
            var param = {
                picture: "",
                introduce: ""
            };
            //获取search 的参数
            var search = (0, _request.getSearchParam)(this.props.location.search);
            if (!!search.redCodeSt && search.redCodeSt == "00" || search.redCodeSt == "02") {
                //如果是00 或者是 02 说明来自申码页面，并且用户不在黑名单，申请红包码和收款码
                param = {
                    picture: _commdity4.default,
                    introduce: "推荐使用收款和红包码物料，收款安全方便，<br/>赚取红包赏金，自主免费开通更便捷，马上体验吧~"
                };
            } else if (!!search.redCodeSt) {
                //如果不是00 或者是 02，但是 redCodeSt 存在，说明来自申码页面，用户在黑名单或者其他状态
                param = {
                    picture: _commdity2.default,
                    introduce: "商户收款码贴纸可用于您的店铺收款，储蓄卡收款无需手续费，无需营业执照等相关手续，自主免费开通更便捷，马上来体验吧～"
                };
            } else {
                /**
                 * 用户前面放弃过申请物料，从客户端直接跳转进来
                 */
                var _props = this.props,
                    isblack = _props.isblack,
                    _isApply2 = _props.isApply;

                if (isblack == "0" && _isApply2 == "1") {
                    //用户不在黑名单并且 申请过红包码，申请红包码和收款码
                    param = {
                        picture: _commdity4.default,
                        introduce: "推荐使用收款和红包码物料，收款安全方便，<br/>赚取红包赏金，自主免费开通更便捷，马上体验吧~"
                    };
                } else if (isblack == "1" || _isApply2 == "0") {
                    param = {
                        picture: _commdity2.default,
                        introduce: "商户收款码贴纸可用于您的店铺收款，储蓄卡收款无需手续费，无需营业执照等相关手续，自主免费开通更便捷，马上来体验吧～"
                    };
                }
            }
            return _react2.default.createElement(_ApplyCommdity2.default, (0, _extends3.default)({}, this.props, { handleClick: this.handleClick }, param));
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
        isblack: state.getIn(["blackSt"]),
        isApply: state.getIn(["applySt"]),
        storeAddr: state.getIn(["storeAddr"]).toJS(),
        isAgree: state.getIn(["isAgreeReceivablesCodeAgreement"])
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

    reactHotLoader.register(ApplyCommdityContainer, 'ApplyCommdityContainer', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ApplyCommdity/ApplyCommdityContainer.js');
    reactHotLoader.register(mapstateToProps, 'mapstateToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ApplyCommdity/ApplyCommdityContainer.js');
    reactHotLoader.register(mapDispathToProps, 'mapDispathToProps', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ApplyCommdity/ApplyCommdityContainer.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/ApplyCommdity/ApplyCommdityContainer.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ })

}]);