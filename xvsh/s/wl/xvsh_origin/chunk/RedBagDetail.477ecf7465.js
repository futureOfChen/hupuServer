webpackJsonp([23],{

/***/ "14dc1f7ebd80d15bfd34":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("a6f620d47943704beb48");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "1679851be27b268ea24e":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("3e71833d67eff32178f6");
__webpack_require__("666e0b794582d53894ee");
module.exports = __webpack_require__("53b7d34817144b12b0aa");


/***/ }),

/***/ "21dfac28523ae37dac5b":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("3e71833d67eff32178f6");
__webpack_require__("666e0b794582d53894ee");
module.exports = __webpack_require__("6a442ab5bd9bd9294478");


/***/ }),

/***/ "251bc7afe8127e09149d":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("973cc8eefc59931de95e"), __esModule: true };

/***/ }),

/***/ "28cff86e1d51ebf21f7f":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "3c24d38ffcd0c38e3477":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("1679851be27b268ea24e"), __esModule: true };

/***/ }),

/***/ "53b7d34817144b12b0aa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e2cf04d7ed5fdb33fb87");
var get = __webpack_require__("058da6cfda39d4efd6de");
module.exports = __webpack_require__("91d9e3da5180694da5dd").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "5bfee372cde70ee97b16":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _toConsumableArray2 = __webpack_require__("fafba3d44052ea8dcdf4");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__("8a4a7a62a26b8f064358");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("acab2ae8d55fd58113d8");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("0bf817924258aa08734c");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("de6bd889b0c636aa995b");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("aa675f1299ad16c8424c");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("8af190b70a6bc55c6f1b");

var _react2 = _interopRequireDefault(_react);

var _reactPullload = __webpack_require__("ce495e77d9a8b6425efd");

var _reactPullload2 = _interopRequireDefault(_reactPullload);

var _config = __webpack_require__("8653d9474e130320c382");

var _config2 = _interopRequireDefault(_config);

var _request = __webpack_require__("76fb50331ac78bf18670");

__webpack_require__("d30d84d84eeb29f42139");

__webpack_require__("f4e45f76ba37a2e05eee");

var _RBrecord = __webpack_require__("af06bacf3e99dd956ffc");

var _RBrecord2 = _interopRequireDefault(_RBrecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedBagDetail = function (_React$Component) {
    (0, _inherits3.default)(RedBagDetail, _React$Component);

    function RedBagDetail(props, context) {
        (0, _classCallCheck3.default)(this, RedBagDetail);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RedBagDetail.__proto__ || (0, _getPrototypeOf2.default)(RedBagDetail)).call(this, props, context));

        _this.getRecordData = function (currentPage) {
            return (0, _request.post)(_config2.default.REST.getRewardList, {
                awardSt: "1",
                currentPage: currentPage,
                pageSize: "15"
            });
        };

        _this.handleAction = function (action) {
            console.info(action, _this.state.action, action === _this.state.action);
            //new action must do not equel to old action
            if (action === _this.state.action) {
                return false;
            }

            if (action === _reactPullload.STATS.refreshing) {
                //刷新
                _this.handRefreshing();
            } else if (action === _reactPullload.STATS.loading) {
                //加载更多
                _this.handLoadMore();
            } else {
                //DO NOT modify below code
                _this.setState({
                    action: action
                });
            }
        };

        _this.handRefreshing = function () {
            if (_reactPullload.STATS.refreshing === _this.state.action) {
                return false;
            }

            setTimeout(function () {
                //refreshing complete
                _this.setState({
                    data: cData.params,
                    hasMore: true,
                    action: _reactPullload.STATS.refreshed,
                    index: cData.totalPage - 1
                });
            }, 500);

            _this.getRecordData(1).then(function (response) {
                _this.setState({
                    currentPage: response.currentPage,
                    data: response.params,
                    hasMore: true,
                    action: _reactPullload.STATS.refreshed,
                    index: response.totalPage - response.currentPage,
                    totalNum: response.totalNum,
                    totalPointAt: response.totalPointAt
                });
            });

            _this.setState({
                action: _reactPullload.STATS.refreshing
            });
        };

        _this.handLoadMore = function () {
            if (_reactPullload.STATS.loading === _this.state.action) {
                return false;
            }
            //无更多内容则不执行后面逻辑
            if (!_this.state.hasMore) {
                return;
            }

            setTimeout(function () {
                if (_this.state.index === 0) {
                    _this.setState({
                        action: _reactPullload.STATS.reset,
                        hasMore: false
                    });
                } else {

                    _this.setState({
                        data: [].concat((0, _toConsumableArray3.default)(_this.state.data), [cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0]]),
                        action: _reactPullload.STATS.reset,
                        index: _this.state.index - 1
                    });
                }
            }, 500);

            _this.getRecordData(_this.state.currentPage + 1).then(function (response) {
                var arr = [].concat((0, _toConsumableArray3.default)(_this.state.data), (0, _toConsumableArray3.default)(response.params));
                var index = response.totalPage - response.currentPage;
                if (_this.state.index === 0) {
                    _this.setState({
                        action: _reactPullload.STATS.reset,
                        hasMore: false
                    });
                } else {

                    _this.setState({
                        data: arr,
                        hasMore: true,
                        action: _reactPullload.STATS.reset,
                        index: index,
                        totalNum: response.totalNum,
                        totalPointAt: response.totalPointAt
                    });
                }
            });

            _this.setState({
                action: _reactPullload.STATS.loading
            });
        };

        _this.getMony = function (money) {
            money += "";
            if (money.length == 0) {
                return;
            }
            money = money.trim();
            if (money.length >= 3) {
                var str1 = money.slice(0, money.length - 2);
                var str2 = money.slice(money.length - 2);
                return str1 + "." + str2;
            } else if (money.length == 2) {
                return "0." + money;
            } else {
                return "0.0" + money;
            }
        };

        _this.state = {
            currentPage: 1,
            data: [],
            hasMore: true,
            action: _reactPullload.STATS.init,
            index: 100,
            totalNum: 0,
            totalPointAt: 0
        };
        return _this;
    }

    (0, _createClass3.default)(RedBagDetail, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            (0, _request.beforeEnterRouter)("赏金奖励");

            this.getRecordData(1).then(function (response) {
                _this2.setState({
                    currentPage: response.currentPage,
                    data: response.params,
                    hasMore: true,
                    action: _reactPullload.STATS.refreshed,
                    index: parseInt(response.totalPage) - parseInt(response.currentPage),
                    totalNum: response.totalNum,
                    totalPointAt: response.totalPointAt
                });
            });

            this.setState({
                currentPage: 1,
                data: cData.params,
                hasMore: true,
                action: _reactPullload.STATS.init,
                index: 5 - 1,
                totalNum: 100,
                totalPointAt: 180
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                data = _state.data,
                hasMore = _state.hasMore,
                totalNum = _state.totalNum,
                totalPointAt = _state.totalPointAt;


            return _react2.default.createElement(
                "div",
                { id: "rbd" },
                _react2.default.createElement(
                    _reactPullload2.default
                    // downEnough={150}
                    ,
                    { action: this.state.action,
                        handleAction: this.handleAction,
                        hasMore: hasMore,
                        distanceBottom: 1000
                    },
                    _react2.default.createElement(
                        "ul",
                        { className: "test-ul" },
                        _react2.default.createElement(
                            "div",
                            { className: "head white  item-border-redus" },
                            _react2.default.createElement(
                                "span",
                                null,
                                totalNum,
                                "\u4EFD\u63A8\u8350\u7EA2\u5305"
                            ),
                            _react2.default.createElement(
                                "span",
                                null,
                                "\u5171 ",
                                this.getMony(totalPointAt),
                                "\u5143"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "content white item-border-redus" },
                            data.length != 0 ? data.map(function (str, index) {
                                return _react2.default.createElement(
                                    "li",
                                    { className: "item", key: index },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "left" },
                                        _react2.default.createElement(
                                            "span",
                                            null,
                                            str.mobile
                                        ),
                                        _react2.default.createElement("br", null),
                                        _react2.default.createElement(
                                            "label",
                                            null,
                                            "\u60A8\u7684\u8D4F\u91D1\u5DF2\u5B58\u5165\u7EA2\u5305"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "right" },
                                        "\xA5",
                                        _this3.getMony(str.pointAt)
                                    )
                                );
                            }) : _react2.default.createElement(
                                "div",
                                { className: "imgWarp" },
                                _react2.default.createElement("img", { src: _RBrecord2.default, alt: "" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "tips" },
                                    "\u672C\u5217\u8868\u4EC5\u5C55\u793A\u8FD1\u4E09\u4E2A\u6708\u7684\u8D4F\u91D1\u8BB0\u5F55"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return RedBagDetail;
}(_react2.default.Component);

exports.default = RedBagDetail;

/***/ }),

/***/ "5e59b71b33a38c3618e7":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("e9bd0ce2843722ddc7e3");
var call = __webpack_require__("3d8b92ce0865fd975233");
var isArrayIter = __webpack_require__("16d5e004271702f1eb9e");
var anObject = __webpack_require__("e2cf04d7ed5fdb33fb87");
var toLength = __webpack_require__("09b84769b8f44671e2b5");
var getIterFn = __webpack_require__("058da6cfda39d4efd6de");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "5e7491f1f799715eac75":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("e044a82d1d9b0444627b");
var core = __webpack_require__("91d9e3da5180694da5dd");
var dP = __webpack_require__("c085b2899129a5955b7e");
var DESCRIPTORS = __webpack_require__("d5b766fc471c53cb9e69");
var SPECIES = __webpack_require__("4a88bf6bd245e3166736")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "6a442ab5bd9bd9294478":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("468b0a4631cfd44380cf");
var ITERATOR = __webpack_require__("4a88bf6bd245e3166736")('iterator');
var Iterators = __webpack_require__("eacf80a9f87676689dc1");
module.exports = __webpack_require__("91d9e3da5180694da5dd").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "76fb50331ac78bf18670":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createConvasAndSavePhoto = exports.createTextCanvase = exports.savePicToLocal = exports.fetchNativeData = exports.getCurrentLocationInfo = exports.share = exports.saveQcode = exports.getUserDetailInfo = exports.createWebView = exports.verifyPayPwd = exports.closeWebView = exports.sendQrCode = exports.mccStateChanged = exports.beforeEnterRouter = exports.toast = exports.getXiaoWeiAudio = exports.setXiaoWeiAudio = exports.getSearchParam = exports.del = exports.put = exports.post = exports.get = exports.responseFormatter = exports.getServUrl = exports.comomParam = exports.regPayNum = exports.regPhone = exports.Env = exports.App = exports.Util = undefined;

var _assign = __webpack_require__("b365af20d4e02cb0aa22");

var _assign2 = _interopRequireDefault(_assign);

var _stringify = __webpack_require__("8e994c8287bafcdbd431");

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__("251bc7afe8127e09149d");

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = __webpack_require__("ef51d4989f3044b2eb33");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = request;
exports.setXiaoWeiPay = setXiaoWeiPay;

var _toast = __webpack_require__("c2e05f9935ecf0b033a4");

var _toast2 = _interopRequireDefault(_toast);

var _jquery = __webpack_require__("802cdb4f0b591dfd1229");

var _jquery2 = _interopRequireDefault(_jquery);

var _config = __webpack_require__("8653d9474e130320c382");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***********************************************************************************************
*
* 常量定义区
*
************************************************************************************************/

var Util = exports.Util = window.UP.W.Util; /*
                                               API 接口配置
                                               axios 参考文档：https://www.kancloud.cn/yunye/axios/234845
                                            
                                            */
// import axios from 'axios';
var App = exports.App = UP.W.App;

var Env = exports.Env = UP.W.Env;

var regPhone = exports.regPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

var regPayNum = exports.regPayNum = /^[0-9]{20}$/;

var comomParam = exports.comomParam = {
    version: "2.0",
    source: "2"

    /***********************************************************************************************
     *
     * 请求核心区 下面这块区域中的代码改动请慎重
     *
     ************************************************************************************************/

};var baseUrl = "",
    baseUrl2 = "",
    baseUrl3 = "";
if (location.hostname.indexOf('95516.com') !== -1) {
    //生产环境
    baseUrl = location.protocol + "//shanghu.95516.com/wlmweb-web/restlet/";
    // baseUrl2 = location.protocol + "//mall.95516.com/cqp-int-mall-web/restlet/";
    baseUrl3 = location.protocol + "//youhui.95516.com/youhui-web/restlet/";
} else if (location.hostname.indexOf('172.18.179.10') !== -1) {
    //测试环境
    // baseUrl="http://172.21.101.25:36000/wlmweb-web/restlet/"; //测试室apache
    //baseUrl = "http://172.21.101.95:36000/wlmweb-web/restlet/";//开发环境apache
    baseUrl = "http://172.18.179.17/wlmweb-web/restlet/"; //测试室f5 通过Nginx转发
    baseUrl3 = "http://172.18.179.11/youhui-web/restlet/";
    // baseUrl3 = "http://172.21.133.25:36000/youhui-web/restlet/";
} else {
    // baseUrl = "http://172.21.101.95:36000/wlmweb-web/restlet/";
    // baseUrl = "http://172.21.101.25:38210/wlmweb-web/restlet/";
    baseUrl = "http://172.18.179.17/wlmweb-web/restlet/"; //测试室f5 通过Nginx转发
    baseUrl3 = "http://172.18.179.11/youhui-web/restlet/"; //测试室f5 通过Nginx转发
    // baseUrl3 = "http://172.21.133.25:36000/youhui-web/restlet/";
    // baseUrl3 = "http://172.21.33.56:36000/youhui-web/restlet/";
}
/**
 * 通过后缀获取服务器的全地址
 * @param url
 * @returns {string}
 */
var getServUrl = exports.getServUrl = function getServUrl(url) {
    var serverUrl = "";
    if (url == _config2.default.REST.userInfo) {
        serverUrl = "";
    }
    // else if (url.split("/")[0] == "address") {
    //     serverUrl = baseUrl2
    // }
    else if (url.split("/")[0] == "scan" || url == _config2.default.REST.getCity) {
            serverUrl = baseUrl3;
        } else {
            serverUrl = baseUrl;
        }

    return serverUrl;
};

/**
 * 格式化结果 将结果格式化为
 * {
 *     statusCode   后台响应码
 *     data         后台返回的数据
 *     msg          后台的提示信息
 * }
 * @param data
 * @returns {{statusCode: (string|*), data: *, msg: *}}
 */
var responseFormatter = exports.responseFormatter = function responseFormatter(data) {
    var res = {
        statusCode: data.resp,
        data: data.params,
        msg: data.msg
    };

    return res;
};

// 删除底部 '/'
function deleteSlash(host) {
    return host.replace(/\/$/, '');
}

// 添加头部 '/'
function addSlash(path) {
    return (/^\//.test(path) ? path : '/' + path
    );
}

// 解析参数
function separateParams(url) {
    var _url$split = url.split('?'),
        _url$split2 = (0, _slicedToArray3.default)(_url$split, 2),
        _url$split2$ = _url$split2[0],
        path = _url$split2$ === undefined ? '' : _url$split2$,
        _url$split2$2 = _url$split2[1],
        paramsLine = _url$split2$2 === undefined ? '' : _url$split2$2;

    var params = {};

    paramsLine.split('&').forEach(function (item) {
        var _item$split = item.split('='),
            _item$split2 = (0, _slicedToArray3.default)(_item$split, 2),
            key = _item$split2[0],
            value = _item$split2[1];

        params[key] = value;
    });

    return { path: path, params: params };
}

function request(config) {
    var method = config.method,
        url = config.url,
        _config$data = config.data,
        data = _config$data === undefined ? {} : _config$data;

    method = method && method.toUpperCase() || 'GET';

    var serverUrl = 'http://127.0.0.1:3000/';
    var finalUrl = serverUrl + url;

    return new _promise2.default(function (resolve, reject) {

        var options = {
            url: finalUrl,
            type: method,
            success: function success(response) {
                if (response.statusCode == '200') {
                    var _data = responseFormatter(response);
                    resolve(_data);
                }
            },
            error: function error(response) {
                reject(new Error('请求失败'));
            }
        };
        if (method === 'POST') {
            options.data = (0, _stringify2.default)(data);
            options.dataType = 'json';
        }

        _jquery2.default.ajax(options);
    });
}

// 主要请求方法
// export  function requestOrigin(config) {

//     const app = UP.W.App;
//     const ui = UP.W.UI;
//     const env = UP.W.Env;

//     let {method, url, data = {}, headers, forChsp, encrypt, byAjax, cache, update, storage} = config;

//     method = (method && method.toUpperCase()) || 'GET';

//     let serverUrl = getServUrl(url);

//     // let serverUrl = baseUrl ;
//     // if (true) {
//     /**
//      * 通过插件发送请求
//      */

//     /**
//      * 向服务器发送请求
//      * @param params 请求参数
//      *                  version：版本，默认是1.0
//      *                  source：来源，默认根据Android、iOS自动添加
//      *                  encrypt：是否加密，默认加密
//      *                  method：请求方法，POST或GET
//      *                  cmd：请求命令（也可自行将cmd组装至uri[优惠后台]或path[钱包后台]）
//      *                  uri/path：请求地址，建议仅填充cmd，不建议自行组装uri/path
//      *                  params：发送给后台的参数
//      *                  vid：如果通过Ajax方式向wallet后台发送请求需要携带vid
//      * @param forChsp 是否向优惠后台发送请求（默认向手机后台发送请求）
//      * @param byAjax 是否使用Ajax发送请求（默认使用控件）
//      * @param success 成功回调
//      * @param error 错误回调（业务错误）
//      * @param fail 失败回调（请求失败）
//      */
//     return new Promise((resolve, reject) => {
//         app.onPluginReady(() => {


//             let successCallback = (data,fuc) => {
//                 ui.dismiss();
//                 console.log("返回成功结果：")
//                 console.log(data)
//                 let req = responseFormatter(data);
//                 if( !!fuc ){
//                     req.fuc = fuc;
//                 }
//                 resolve(req)
//             }

//             let errorCallback = (err) => {
//                 console.log("返回失败结果：")
//                 ui.dismiss();
//                 console.log(err)

//                 if (url == CONFIG.REST.applyMcc || url == CONFIG.REST.applyMat || url == CONFIG.REST.todayMoney) {
//                     let req = responseFormatter(err);
//                     resolve(req)
//                 }
//                 else {
//                     Toast.info(err.msg || '查询业务要素出错，请稍后再试！');
//                 }
//             }

//             let networkCallback = (xhr) => {
//                 ui.dismiss();
//                 Toast.info(xhr.msg);
//             }


//             if (url != CONFIG.REST.getTodayIncome) {
//                 ui.showLoading();
//             }

//             if (!cache) {
//                 // console.log("Url:" + url)
//                 // console.log("Param:")
//                 // console.log({
//                 //     cmd: serverUrl + url,
//                 //     params: data,
//                 //     method: method,
//                 //     encrypt: encrypt,
//                 //     forChsp: forChsp,
//                 //     byAjax: byAjax
//                 // })
//                 console.log("发送非缓存请求")
//                 app.sendMessage(
//                     {
//                         cmd: serverUrl + url,
//                         // uri:serverUrl + url,
//                         params: data,
//                         method: method,
//                         encrypt: encrypt
//                     }, forChsp, byAjax, successCallback, errorCallback, networkCallback);
//             }
//             else {
//                 // console.log("CacheUrl:" + url)
//                 // console.log("storeage策略是:")
//                 // console.log(storage)
//                 // console.log("update函数:")
//                 // console.log(update)
//                 console.log("发送缓存请求")
//                 /**
//                  * 向服务器发送请求
//                  * @param params 请求参数
//                  *                  version：版本，默认是1.0
//                  *                  source：来源，默认根据Android、iOS自动添加
//                  *                  encrypt：是否加密，默认加密
//                  *                  method：请求方法，POST或GET
//                  *                  cmd：请求命令（也可自行将cmd组装至uri[优惠后台]或path[钱包后台]）
//                  *                  uri/path：请求地址，建议仅填充cmd，不建议自行组装uri/path
//                  *                  params：发送给后台的参数
//                  *                  vid：如果通过Ajax方式向wallet后台发送请求需要携带vid
//                  * @param forChsp 是否向优惠后台发送请求（默认向手机后台发送请求）
//                  * @param byAjax 是否使用Ajax发送请求（默认使用控件）
//                  * @param success 成功回调
//                  * @param error 错误回调（业务错误）
//                  * @param fail 失败回调（请求失败）
//                  * @param update 异步刷新回调 如果设置async为true后可以添加update回调 如果不填写默认以success进行处理
//                  * @param storage 缓存参数
//                  *                  needSw            //默认false大部分用的是插件需要的手动去加
//                  *                  storageType      //默认使用localstorage
//                  *                  async            //默认获取缓存后不发请求，改为true后会异步去请求后台并刷新数据
//                  *                  endOfSyncFunc    //todo 重要！！！！回调中如果存在异步（插件等）需要标明异步状态为true
//                  *                  validateTime     //有效期默认无限有效期 单位毫秒
//                  *                  saveWithId       //默认true以用户id进行存储否则false以local存储
//                  *                  saveSucc         //保存成功后的回调
//                  *                  saveErr          //保存失败后的回调
//                  *                  rollKey          //强制设置主键
//                  *                  secondKey        //强制设置次要键值
//                  *  todo 重要说明 调用异步模式（async设置为true）后可能在success回调里存在异步操作，该情况下回导致缓存的回调可能
//                  *  todo 未执行完成，请求的回调又开始执行了的情况，所以我们统一在success回调和update回调的入参增加了第二个参数
//                  *  todo 用于兼容回调内包含异步的状况，使用方法为：首先设置endOfSyncFunc参数为true,其次success和update回
//                  *  todo 调内会有2个入参，success（resp，fuc），请在代码闭包处使用fuc.endOfFunc()
//                  */

//                 let param = {}


//                 if (byAjax) {
//                     param = {
//                         path: serverUrl + url,
//                         cmd: "life/life",
//                         params: data,
//                         method: method,
//                         encrypt: encrypt
//                     }
//                 }
//                 else {
//                     param = {
//                         cmd: serverUrl + url,
//                         // uri:serverUrl + url,
//                         params: data,
//                         method: method,
//                         encrypt: encrypt
//                     }
//                 }

//                 app.sendMessageWithStorage(param, forChsp, byAjax, successCallback, errorCallback, networkCallback, storage, update);
//             }

//         })
//     })


//     // }
//     // else {

//     /**
//      * 通过Ajax 发送请求
//      */
//     // return axios({
//     //     url: baseUrl + url,
//     //     method,
//     //     headers,
//     //     data: method === 'GET' ? undefined : data,
//     //     params: Object.assign(method === 'GET' ? data : {}, params)
//     // }).then((response) => {
//     //
//     //     let req = {
//     //         statusCode: response.data.resp,
//     //         data: response.data.params
//     //     }
//     //     return Promise.resolve(req)
//     // }).catch(err => {
//     //     // 请求出错
//     //     Toast.info('request error, HTTP CODE: ' + err.response.status);
//     //     return Promise.reject(err);
//     // });
//     // }

// }

// 一些常用的请求方法
var get = exports.get = function get(url, data) {
    var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var paramAll = (0, _assign2.default)({ forChsp: true, encrypt: true, cache: false, byAjax: false }, param);
    return request((0, _assign2.default)({ url: url, data: data }, paramAll));
};
var post = exports.post = function post(url, data) {
    var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var paramAll = (0, _assign2.default)({ forChsp: true, encrypt: true, cache: false, byAjax: false }, param);
    return request((0, _assign2.default)({ method: 'POST', url: url, data: data }, paramAll));
};
var put = exports.put = function put(url, data) {
    return request({ method: 'PUT', url: url, data: data });
};
var del = exports.del = function del(url, data) {
    return request({ method: 'DELETE', url: url, data: data });
};

/***********************************************************************************************
 *
 * 功能函数区
 *
 ************************************************************************************************/

/**
 * 将URL中的search 字符串 转换成 对象
 * @param search
 * @returns {{}}
 */
var getSearchParam = exports.getSearchParam = function getSearchParam(search) {
    if (!!search) {
        var str = search.slice(1);
        var array = str.split("&");
        var obj = {};
        array.forEach(function (item) {
            var param = item.split("=");
            obj[param[0]] = param[1];
        });
        return obj;
    } else {
        return {};
    }
};

/***********************************************************************************************
 *
 * codova 插件调用区
 *
 ************************************************************************************************/

// 启停收款码
function setXiaoWeiPay(param, suc, err) {
    var app = UP.W.App;
    app.setXiaoWeiPay(param, suc, err);
}

//小微audio
var setXiaoWeiAudio = exports.setXiaoWeiAudio = function setXiaoWeiAudio(param, suc, err) {
    var app = UP.W.App;
    app.setXiaoWeiAudio(param, suc, err);
};
var getXiaoWeiAudio = exports.getXiaoWeiAudio = function getXiaoWeiAudio(suc, err) {
    var app = UP.W.App;
    app.getXiaoWeiAudio(suc, err);
};

var toast = exports.toast = function toast(ms) {
    _toast2.default.info(ms, 2);
};
/**
 * 设置顶部bar
 * @param title 页面名称
 * @param rightBar 右侧按钮名称
 * @param rightCallback 右侧按钮回调
 * @param rightBarImg 右侧按钮图片
 */
var beforeEnterRouter = exports.beforeEnterRouter = function beforeEnterRouter() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var rightBar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var rightCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var rightBarImg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    document.title = title;
    var app = UP.W.App;
    app.onPluginReady(function () {
        app.setNavigationBarTitle(title);
        /**
         * 设置窗口右侧按钮
         * @param title 图标标题
         * @param image 图标文件
         * @param handler 点击回调函数
         */
        if (!!rightCallback) {
            app.setNavigationBarRightButton(rightBar, rightBarImg, rightCallback);
        } else {
            app.setNavigationBarRightButton("", null, null);
        }
    });
};

/**
 * 通知客户端修改状态
 */
var mccStateChanged = exports.mccStateChanged = function mccStateChanged() {
    var app = UP.W.App;
    app.onPluginReady(function () {
        app.mccStateChanged();
    });
};

var sendQrCode = exports.sendQrCode = function sendQrCode(params, success, fail) {
    var app = UP.W.App;
    app.onPluginReady(function () {
        /**
         * 扫描条码和二维码
         * @param params
         * @param success
         * @param fail
         */
        app.scanQRCode(params, success, fail);
    });
};

var closeWebView = exports.closeWebView = function closeWebView() {
    var app = UP.W.App;
    app.closeWebView();
};

var verifyPayPwd = exports.verifyPayPwd = function verifyPayPwd(param, success, fail) {
    var app = UP.W.App;
    app.verifyPayPwd(param, success, fail);
};

var createWebView = exports.createWebView = function createWebView(url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var isFinish = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "1";

    var app = UP.W.App;
    app.createWebView(url, params, title, isFinish);
};

var getUserDetailInfo = exports.getUserDetailInfo = function getUserDetailInfo(success, fail) {
    var app = UP.W.App;
    app.onPluginReady(function () {
        app.getUserDetailInfo(success, fail);
    });
};
/**
 * 将cavas 保存到本地相册
 * @param canvas
 */
var saveQcode = exports.saveQcode = function saveQcode(canvas) {
    var app = UP.W.App;
    var ui = UP.W.UI || {};
    var picUrl = canvas.toDataURL();
    app.onPluginReady(function () {
        app.logEvent('savePicture_NewYearAct');
        app.savePicToLocal({
            url: picUrl && picUrl.substr(22)
        }, function () {
            ui.showToastWithPic('已保存到系统相册');
        }, function (msg) {
            if (msg == 'update') {
                ui.showAlert('请升级到最新客户端', function () {
                    // 去升级
                    app.logEvent('update_signAct', 'Yes');
                    var url = '';
                    if (env.isIOS) {
                        url = 'https://itunes.apple.com/cn/app/id600273928?code=newYearActivity';
                    } else {
                        url = 'https://youhui.95516.com/app/app/software/unionpay-wallet-v2.apk?code=newYearActivit';
                    }
                    app.openBrowser(url);
                }, function () {
                    app.logEvent('update_signAct', 'No');
                }, '马上升级', '稍后再说', '保存失败');
            } else {
                ui.showToast(msg || '保存失败');
            }
        });
    });
};

var share = exports.share = function share(title, desc, imgURL, pageURl) {
    var app = UP.W.App;
    var env = UP.W.Env || {};

    app.onPluginReady(function () {

        /**
         * 显示分享面板
         * 如果所有渠道使用相同的分享内容则仅填写params即可，
         * 如果需要根据不同渠道定制分享内容，则可params留空，在shareCallback中返回指定渠道的分享内容
         * @param params 分享参数
         *              {
         *                  title： 分享标题
         *                  desc: 分享摘要
         *                  picUrl：分享图标
         *                  shareUrl：详情地址
         *              }
         * @param shareCallback 分享时回调
         *              channel：{
         *                  0：短信
         *                  1：新浪微博
         *                  3：微信好友
         *                  4：微信朋友圈
         *                  5：QQ好友
         *                  6：QQ空间
         *                  7：复制链接
         *              }
         *              data: 默认分享数据
         */
        app.showSharePanel({
            title: title,
            desc: desc,
            picUrl: imgURL,
            shareUrl: pageURl // todo 普通分享
        }, null);
    });
};

/**
 * 获取用户的定位，首先通过GPS 定位，如果定位失败，通过接口getCity,利用IP地址进行定位，如果还是失败，通过插件获取客户端左上角的城市信息，依然失败默认穿cityCd:310000 代表上海市
 * @param callback
 */
var getCurrentLocationInfo = exports.getCurrentLocationInfo = function getCurrentLocationInfo(callback2) {
    var ui = UP.W.UI;
    ui.showLoading();
    var callback = function callback(data) {
        ui.dismiss();
        callback2(data);
    };
    var app = UP.W.App;
    app.onPluginReady(function () {
        app.getCurrentLocationInfo(function (data) {
            // alert(JSON.stringify(data))
            callback(data);
        }, function () {

            app.sendMessage({
                cmd: "/" + _config2.default.REST.getCity,
                // path: "http://172.21.33.56:36000/youhui-web/restlet/"+CONFIG.REST.getCity,
                params: {
                    version: "2.0",
                    source: "2"
                },
                method: "GET",
                encrypt: false
            }, true, false, function (data) {
                console.log(data.params);
                callback(data.params);
            }, function (err) {
                fetchNativeData(callback);
            }, function (xhr) {
                fetchNativeData(callback);
            });
        });
    });
};

var fetchNativeData = exports.fetchNativeData = function fetchNativeData(callback) {
    var app = UP.W.App;
    app.onPluginReady(function () {

        /**
         * 获取客户端信息
         * @param success
         * @param fail
         * @param type 0：城市信息cityCd；1：经纬度；5：UserId
         */
        app.fetchNativeData(0, function () {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            console.log(data);
            callback(data);
        }, function () {
            callback({
                cityCd: "310000"
            });
        });
    });
};
var savePicToLocal = exports.savePicToLocal = function savePicToLocal(canvas, resolve) {
    var app = UP.W.App;
    var ui = UP.W.UI || {};
    var picUrl = canvas.toDataURL();
    app.onPluginReady(function () {
        app.savePicToLocal({
            url: picUrl && picUrl.substr(22)
        }, function () {
            //成功
            !!resolve && resolve("success");
        }, function (msg) {
            if (msg == 'update') {
                ui.showAlert('请升级到最新客户端', function () {
                    // 去升级
                    app.logEvent('update_signAct', 'Yes');
                    var url = '';
                    if (env.isIOS) {
                        url = 'https://itunes.apple.com/cn/app/id600273928?code=newYearActivity';
                    } else {
                        url = 'https://youhui.95516.com/app/app/software/unionpay-wallet-v2.apk?code=newYearActivit';
                    }
                    app.openBrowser(url);
                }, function () {
                    app.logEvent('update_signAct', 'No');
                }, '马上升级', '稍后再说', '保存失败');
            } else {
                !!resolve && resolve("fail");
            }
        });
    });
};

var createTextCanvase = exports.createTextCanvase = function createTextCanvase(text, color) {
    var long = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 684;
    var shot = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 60;


    var rem2px = function rem2px(val) {
        var cWidth = document.documentElement.clientWidth;
        return val * cWidth / 750;
    };
    var canvas = document.getElementById('textCanvas');
    var ctx = canvas.getContext('2d');

    //設置畫佈的寬高
    // var bgWidth = rem2px(long);
    // var bgHeight = rem2px(shot);

    canvas.setAttribute('width', shot);
    canvas.setAttribute('height', long);

    canvas.width = canvas.width;
    ctx.rotate(-90 * Math.PI / 180);
    var text = text;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    var fontSize = shot;
    ctx.font = fontSize + 'px Airal';
    while (ctx.measureText(text).width > long) {
        fontSize--;
        ctx.font = fontSize + 'px Airal';
    }
    ctx.fillText(text, -long, fontSize);
    return canvas.toDataURL("image/png");
};

/**
 * 生成图片并保存到相册
 * @param bgurl 背景图片的地址
 * @param qrcodeURL 二维码的地址
 * @param qrcodeWdAndHg 二维码的宽度
 * @param xWidth 二维码距离左上角的 → 方向的偏移量
 * @param yHeight 二维码距离左上角的 ↓ 方向的偏移量
 * @param textbgURL 加入画布的图片的URL
 * @param xTextWidth 加入画布的图片距离左上角的 ↓ 方向的偏移量
 * @param yTextHeight 加入画布的图片距离左上角的 ↓ 方向的偏移量
 */

var createConvasAndSavePhoto = exports.createConvasAndSavePhoto = function createConvasAndSavePhoto(canvasObj, resolve) {
    var bgurl = canvasObj.bgurl,
        qrcodeURL = canvasObj.qrcodeURL,
        qrcodeWdAndHg = canvasObj.qrcodeWdAndHg,
        xWidth = canvasObj.xWidth,
        yHeight = canvasObj.yHeight,
        textbgURL = canvasObj.textbgURL,
        xTextWidth = canvasObj.xTextWidth,
        yTextHeight = canvasObj.yTextHeight;

    var canvas = document.getElementById('commonCanvasWrapper');
    /**
     * 清除画布内容
     */
    canvas.width = canvas.width;
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = bgurl;
    img.onload = function () {

        //設置畫佈的寬高
        canvas.setAttribute('width', img.width);
        canvas.setAttribute('height', img.height);

        //在畫布上畫背景圖
        ctx.drawImage(img, 0, 0);

        if (!!textbgURL) {
            var textUri = textbgURL;
            var textImg = new Image();
            textImg.src = textUri;
            textImg.onload = function () {
                ctx.drawImage(textImg, xTextWidth, yTextHeight);
            };
        }

        //二維碼圖片大小
        var qrcodeWidthAndHeight = qrcodeWdAndHg;
        //清除二维码
        document.getElementById("commonQrcode").innerHTML = "";
        var qrcode = new QRCode(document.getElementById("commonQrcode"), {
            text: qrcodeURL,
            height: qrcodeWidthAndHeight,
            width: qrcodeWidthAndHeight,
            correctLevel: QRCode.CorrectLevel.L
        });
        var qrcodeImg = document.getElementById("commonQrcode").getElementsByTagName('img')[0];
        qrcodeImg.onload = function () {
            //畫二維碼的圖片
            var qrcodeDx = xWidth,
                qrcodeDy = yHeight;
            ctx.drawImage(qrcodeImg, qrcodeDx, qrcodeDy);
            // resolve();
            savePicToLocal(canvas, resolve);
        };
    };
};

/***/ }),

/***/ "8653d9474e130320c382":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    REST: {
        applyMcc: "collectionCode/applyMcc", //2.4.4申请收款码接口
        getMccCardList: "collectionCode/getMccCardList", //2.4.2商户收款码卡列表接口
        applyMat: "collectionCode/applyMat", //申请物料接口
        getMchntAndAreaInf: "mchnt/getMchntAndAreaInf.sjson", //商户类型及地区列表查询
        upgradeMcc: "collectionCode/upgradeMcc", //2.4.6升级收款码接口,
        getAddrList: "address/getAddrList", //2.4.13 获取收货地址列表
        deleteAddress: "address/deleteAddress", //2.4.12 删除收货地址
        editAddress: "address/editAddress", //2.4.11 修改收货地址,
        newAddress: "address/newAddress", //2.4.10 新增收货地址
        mchntOper: "mchnt/mchntOper", //2.2.2 店铺信息更新
        getLimitAtInfo: "mchnt/getLimitAtInfo", //获取收款限额
        setMccOnOff: "collectionCode/setMccOnOff", //停止和启用付款码借口
        getMchntDetail: "mchnt/mchntDetail", //2.2.1 获取店铺详情页面
        // upgradeMcc: "collectionCode/upgradeMcc", //2.4.6升级收款码接口
        getTodayTrans: "tran/getTodayTrans", //2.1.3//今日订单接口
        getTodayIncome: "tran/getTodayIncome", //2.1.1商户服务首页今日收款接口~~~~~~~~
        getHistoryIncome: "tran/getHistoryIncome", //2.1.2历史收款接口
        getHistoryTrans: "tran/getHistoryTrans", //2.1.4历史订单接口
        getLogisticsSt: "materiel/getLogisticsSt", //2.3.3物流详情接口查询
        getTransDetilByVoucherNum: "tran/getTransDetilByVoucherNum", //2.1.5单笔订单查询接口
        getAuditInfo: "collectionCode/getAuditInfo", //2.4.14信用卡升级审核结果查询
        updateMccCard: "collectionCode/updateMccCard", //2.4.9更换收款卡接口
        getUpgradeSt: "mchnt/getUpgradeSt", //查询商户是否升级信用卡收款
        getMccTransNum: 'collectionCode/getMccTransNum', //获取调取支付控件的TN号
        getMaterielInfoList: "collectionCode/getMaterielInfoList", //2.4.3物料信息列表接口
        userInfo: "/app/inApp/user/get", //获取用户信息
        isBlack: "scan/isBlack", //2.1.5收银员是否在黑名单
        isApply: "scan/isApply", //2.1.4是否已经申请红包码
        shareLink: "scan/shareLink", //2.1.6生成红包码链接
        recmdRecord: "scan/recmdRecord", //推荐关系记录
        getLogisticsList: "materiel/getLogisticsList", //获取物料历史订单
        getRewardList: "scan/getRewardList", //2.1.7查询收银员赏金明细记录
        getProtocolInfo: "collectionCode/getProtocolInfo", //商户升级查询显示协议的名称和协议的地址
        getCity: "region/getCity", //通过IP地址获取地址定位
        getQrUrl: "collectionCode/getQrInfo" //2.1.1获取用户收款码URL
    },
    STATUSCODE: {
        SUCCESS: "00"
    },
    CONST_DATA: {
        imgeSize: "300"
    },
    CACHEKEY: {
        getMccCardList: {
            rollKey: "xvsh-collectionCode/getMccCardList",
            secondKey: "xvsh-collectionCode/getMccCardList"
        },
        UpdateCreditCollectMoneySt: {
            rollKey: "xvsh-mchnt/getUpgradeSt",
            secondKey: "xvsh-mchnt/getUpgradeSt"
        },
        getMchntDetail: {
            rollKey: "xvsh-mchnt/mchntDetail",
            secondKey: "xvsh-mchnt/mchntDetail"
        },
        isApply: {
            rollKey: "xvsh-scan/isApply",
            secondKey: "xvsh-scan/isApply"
        },
        getAddrList: {
            rollKey: "xvsh-address/getAddrList",
            secondKey: "xvsh-address/getAddrList"
        }
    }
};
exports.default = config;

/***/ }),

/***/ "8e0c1db00085c8ad255a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("5d1068788c8158502382");
var newPromiseCapability = __webpack_require__("c1b94e3e95ed435af540");
var perform = __webpack_require__("cb78375294542c24c5ba");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "973cc8eefc59931de95e":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("31f0b6437ca2ac6622fe");
__webpack_require__("666e0b794582d53894ee");
__webpack_require__("3e71833d67eff32178f6");
__webpack_require__("fa987d811e4eb2d43d9c");
__webpack_require__("c2e35bbff833095943c1");
__webpack_require__("8e0c1db00085c8ad255a");
module.exports = __webpack_require__("91d9e3da5180694da5dd").Promise;


/***/ }),

/***/ "aa963b4c27144f094cca":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("e9bd0ce2843722ddc7e3");
var invoke = __webpack_require__("b580b94b195842cbf2b0");
var html = __webpack_require__("eaa87696d1f8c297f1b4");
var cel = __webpack_require__("116d56d8ce15b7350b04");
var global = __webpack_require__("e044a82d1d9b0444627b");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("0de572c53e7bf26f2ba2")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "af06bacf3e99dd956ffc":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "b50d82456e545dcc3dd3":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("e2cf04d7ed5fdb33fb87");
var aFunction = __webpack_require__("a49e09eeb3d95ed6b805");
var SPECIES = __webpack_require__("4a88bf6bd245e3166736")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "b580b94b195842cbf2b0":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "bde0f57e9b579f943f84":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e044a82d1d9b0444627b");
var macrotask = __webpack_require__("aa963b4c27144f094cca").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("0de572c53e7bf26f2ba2")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "c1b94e3e95ed435af540":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("a49e09eeb3d95ed6b805");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "c2e35bbff833095943c1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("5d1068788c8158502382");
var core = __webpack_require__("91d9e3da5180694da5dd");
var global = __webpack_require__("e044a82d1d9b0444627b");
var speciesConstructor = __webpack_require__("b50d82456e545dcc3dd3");
var promiseResolve = __webpack_require__("f0dbc10c68dd814014e7");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "cb78375294542c24c5ba":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "d1810ae5332e36ffa3c4":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("21dfac28523ae37dac5b"), __esModule: true };

/***/ }),

/***/ "d30d84d84eeb29f42139":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"pull-load":"pull-load","pull-load-head":"pull-load-head","state-refreshing":"state-refreshing","state-refreshed":"state-refreshed","pull-load-body":"pull-load-body","state-reset":"state-reset","pull-load-head-default":"pull-load-head-default","state-pulling":"state-pulling","enough":"enough","circle":"circle","pull-load-footer-default":"pull-load-footer-default","state-loading":"state-loading","nomore":"nomore"};

/***/ }),

/***/ "ec6cbe317b9850b05ce5":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e044a82d1d9b0444627b");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "ef51d4989f3044b2eb33":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__("d1810ae5332e36ffa3c4");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__("3c24d38ffcd0c38e3477");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),

/***/ "f0dbc10c68dd814014e7":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e2cf04d7ed5fdb33fb87");
var isObject = __webpack_require__("dea1d98bceb46441c38b");
var newPromiseCapability = __webpack_require__("c1b94e3e95ed435af540");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "f4e45f76ba37a2e05eee":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"rbd":"rbd","test-ul":"test-ul","head":"head","white":"white","item-border-redus":"item-border-redus","content":"content","imgWarp":"imgWarp","tips":"tips","item":"item","left":"left"};

/***/ }),

/***/ "fa987d811e4eb2d43d9c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("23bb3cc0c2767e99d794");
var global = __webpack_require__("e044a82d1d9b0444627b");
var ctx = __webpack_require__("e9bd0ce2843722ddc7e3");
var classof = __webpack_require__("468b0a4631cfd44380cf");
var $export = __webpack_require__("5d1068788c8158502382");
var isObject = __webpack_require__("dea1d98bceb46441c38b");
var aFunction = __webpack_require__("a49e09eeb3d95ed6b805");
var anInstance = __webpack_require__("28cff86e1d51ebf21f7f");
var forOf = __webpack_require__("5e59b71b33a38c3618e7");
var speciesConstructor = __webpack_require__("b50d82456e545dcc3dd3");
var task = __webpack_require__("aa963b4c27144f094cca").set;
var microtask = __webpack_require__("bde0f57e9b579f943f84")();
var newPromiseCapabilityModule = __webpack_require__("c1b94e3e95ed435af540");
var perform = __webpack_require__("cb78375294542c24c5ba");
var userAgent = __webpack_require__("ec6cbe317b9850b05ce5");
var promiseResolve = __webpack_require__("f0dbc10c68dd814014e7");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("4a88bf6bd245e3166736")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("14dc1f7ebd80d15bfd34")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("7aa97d4ddcfdcfbfd21a")($Promise, PROMISE);
__webpack_require__("5e7491f1f799715eac75")(PROMISE);
Wrapper = __webpack_require__("91d9e3da5180694da5dd")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("bbe63ac6275d7c004207")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZWRCYWdEZXRhaWwvUmVkQmFnRGV0YWlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy91dGlsL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWdzL1JCcmVjb3JkLnBuZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1JlZEJhZ0RldGFpbC9SZWFjdFB1bGxMb2FkLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191c2VyLWFnZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZWRCYWdEZXRhaWwvUmVkQmFnRGV0YWlsLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIl0sIm5hbWVzIjpbIlJlZEJhZ0RldGFpbCIsInByb3BzIiwiY29udGV4dCIsImdldFJlY29yZERhdGEiLCJjdXJyZW50UGFnZSIsIkNPTkZJRyIsIlJFU1QiLCJnZXRSZXdhcmRMaXN0IiwiYXdhcmRTdCIsInBhZ2VTaXplIiwiaGFuZGxlQWN0aW9uIiwiYWN0aW9uIiwiY29uc29sZSIsImluZm8iLCJzdGF0ZSIsIlNUQVRTIiwicmVmcmVzaGluZyIsImhhbmRSZWZyZXNoaW5nIiwibG9hZGluZyIsImhhbmRMb2FkTW9yZSIsInNldFN0YXRlIiwic2V0VGltZW91dCIsImRhdGEiLCJjRGF0YSIsInBhcmFtcyIsImhhc01vcmUiLCJyZWZyZXNoZWQiLCJpbmRleCIsInRvdGFsUGFnZSIsInRoZW4iLCJyZXNwb25zZSIsInRvdGFsTnVtIiwidG90YWxQb2ludEF0IiwicmVzZXQiLCJhcnIiLCJnZXRNb255IiwibW9uZXkiLCJsZW5ndGgiLCJ0cmltIiwic3RyMSIsInNsaWNlIiwic3RyMiIsImluaXQiLCJwYXJzZUludCIsIm1hcCIsInN0ciIsIm1vYmlsZSIsInBvaW50QXQiLCJyYnJlY29yZCIsIlJlYWN0IiwiQ29tcG9uZW50IiwicmVxdWVzdCIsInNldFhpYW9XZWlQYXkiLCJVdGlsIiwid2luZG93IiwiVVAiLCJXIiwiQXBwIiwiRW52IiwicmVnUGhvbmUiLCJyZWdQYXlOdW0iLCJjb21vbVBhcmFtIiwidmVyc2lvbiIsInNvdXJjZSIsImJhc2VVcmwiLCJiYXNlVXJsMiIsImJhc2VVcmwzIiwibG9jYXRpb24iLCJob3N0bmFtZSIsImluZGV4T2YiLCJwcm90b2NvbCIsImdldFNlcnZVcmwiLCJ1cmwiLCJzZXJ2ZXJVcmwiLCJ1c2VySW5mbyIsInNwbGl0IiwiZ2V0Q2l0eSIsInJlc3BvbnNlRm9ybWF0dGVyIiwicmVzIiwic3RhdHVzQ29kZSIsInJlc3AiLCJtc2ciLCJkZWxldGVTbGFzaCIsImhvc3QiLCJyZXBsYWNlIiwiYWRkU2xhc2giLCJwYXRoIiwidGVzdCIsInNlcGFyYXRlUGFyYW1zIiwicGFyYW1zTGluZSIsImZvckVhY2giLCJpdGVtIiwia2V5IiwidmFsdWUiLCJjb25maWciLCJtZXRob2QiLCJ0b1VwcGVyQ2FzZSIsImZpbmFsVXJsIiwicmVzb2x2ZSIsInJlamVjdCIsIm9wdGlvbnMiLCJ0eXBlIiwic3VjY2VzcyIsImVycm9yIiwiRXJyb3IiLCJkYXRhVHlwZSIsIiQiLCJhamF4IiwiZ2V0IiwicGFyYW0iLCJwYXJhbUFsbCIsImZvckNoc3AiLCJlbmNyeXB0IiwiY2FjaGUiLCJieUFqYXgiLCJwb3N0IiwicHV0IiwiZGVsIiwiZ2V0U2VhcmNoUGFyYW0iLCJzZWFyY2giLCJhcnJheSIsIm9iaiIsInN1YyIsImVyciIsImFwcCIsInNldFhpYW9XZWlBdWRpbyIsImdldFhpYW9XZWlBdWRpbyIsInRvYXN0IiwibXMiLCJUb2FzdCIsImJlZm9yZUVudGVyUm91dGVyIiwidGl0bGUiLCJyaWdodEJhciIsInJpZ2h0Q2FsbGJhY2siLCJyaWdodEJhckltZyIsImRvY3VtZW50Iiwib25QbHVnaW5SZWFkeSIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInNldE5hdmlnYXRpb25CYXJSaWdodEJ1dHRvbiIsIm1jY1N0YXRlQ2hhbmdlZCIsInNlbmRRckNvZGUiLCJmYWlsIiwic2NhblFSQ29kZSIsImNsb3NlV2ViVmlldyIsInZlcmlmeVBheVB3ZCIsImNyZWF0ZVdlYlZpZXciLCJpc0ZpbmlzaCIsImdldFVzZXJEZXRhaWxJbmZvIiwic2F2ZVFjb2RlIiwiY2FudmFzIiwidWkiLCJVSSIsInBpY1VybCIsInRvRGF0YVVSTCIsImxvZ0V2ZW50Iiwic2F2ZVBpY1RvTG9jYWwiLCJzdWJzdHIiLCJzaG93VG9hc3RXaXRoUGljIiwic2hvd0FsZXJ0IiwiZW52IiwiaXNJT1MiLCJvcGVuQnJvd3NlciIsInNob3dUb2FzdCIsInNoYXJlIiwiZGVzYyIsImltZ1VSTCIsInBhZ2VVUmwiLCJzaG93U2hhcmVQYW5lbCIsInNoYXJlVXJsIiwiZ2V0Q3VycmVudExvY2F0aW9uSW5mbyIsImNhbGxiYWNrMiIsInNob3dMb2FkaW5nIiwiY2FsbGJhY2siLCJkaXNtaXNzIiwic2VuZE1lc3NhZ2UiLCJjbWQiLCJsb2ciLCJmZXRjaE5hdGl2ZURhdGEiLCJ4aHIiLCJjaXR5Q2QiLCJjcmVhdGVUZXh0Q2FudmFzZSIsInRleHQiLCJjb2xvciIsImxvbmciLCJzaG90IiwicmVtMnB4IiwidmFsIiwiY1dpZHRoIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJzZXRBdHRyaWJ1dGUiLCJ3aWR0aCIsInJvdGF0ZSIsIk1hdGgiLCJQSSIsImZpbGxTdHlsZSIsInRleHRBbGlnbiIsImZvbnRTaXplIiwiZm9udCIsIm1lYXN1cmVUZXh0IiwiZmlsbFRleHQiLCJjcmVhdGVDb252YXNBbmRTYXZlUGhvdG8iLCJjYW52YXNPYmoiLCJiZ3VybCIsInFyY29kZVVSTCIsInFyY29kZVdkQW5kSGciLCJ4V2lkdGgiLCJ5SGVpZ2h0IiwidGV4dGJnVVJMIiwieFRleHRXaWR0aCIsInlUZXh0SGVpZ2h0IiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJvbmxvYWQiLCJoZWlnaHQiLCJkcmF3SW1hZ2UiLCJ0ZXh0VXJpIiwidGV4dEltZyIsInFyY29kZVdpZHRoQW5kSGVpZ2h0IiwiaW5uZXJIVE1MIiwicXJjb2RlIiwiUVJDb2RlIiwiY29ycmVjdExldmVsIiwiQ29ycmVjdExldmVsIiwiTCIsInFyY29kZUltZyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicXJjb2RlRHgiLCJxcmNvZGVEeSIsImFwcGx5TWNjIiwiZ2V0TWNjQ2FyZExpc3QiLCJhcHBseU1hdCIsImdldE1jaG50QW5kQXJlYUluZiIsInVwZ3JhZGVNY2MiLCJnZXRBZGRyTGlzdCIsImRlbGV0ZUFkZHJlc3MiLCJlZGl0QWRkcmVzcyIsIm5ld0FkZHJlc3MiLCJtY2hudE9wZXIiLCJnZXRMaW1pdEF0SW5mbyIsInNldE1jY09uT2ZmIiwiZ2V0TWNobnREZXRhaWwiLCJnZXRUb2RheVRyYW5zIiwiZ2V0VG9kYXlJbmNvbWUiLCJnZXRIaXN0b3J5SW5jb21lIiwiZ2V0SGlzdG9yeVRyYW5zIiwiZ2V0TG9naXN0aWNzU3QiLCJnZXRUcmFuc0RldGlsQnlWb3VjaGVyTnVtIiwiZ2V0QXVkaXRJbmZvIiwidXBkYXRlTWNjQ2FyZCIsImdldFVwZ3JhZGVTdCIsImdldE1jY1RyYW5zTnVtIiwiZ2V0TWF0ZXJpZWxJbmZvTGlzdCIsImlzQmxhY2siLCJpc0FwcGx5Iiwic2hhcmVMaW5rIiwicmVjbWRSZWNvcmQiLCJnZXRMb2dpc3RpY3NMaXN0IiwiZ2V0UHJvdG9jb2xJbmZvIiwiZ2V0UXJVcmwiLCJTVEFUVVNDT0RFIiwiU1VDQ0VTUyIsIkNPTlNUX0RBVEEiLCJpbWdlU2l6ZSIsIkNBQ0hFS0VZIiwicm9sbEtleSIsInNlY29uZEtleSIsIlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFdBQVcsbUJBQU8sQ0FBQyxzQkFBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7QUNOQSxtQkFBTyxDQUFDLHNCQUE2QjtBQUNyQyxtQkFBTyxDQUFDLHNCQUFnQztBQUN4QyxpQkFBaUIsbUJBQU8sQ0FBQyxzQkFBOEI7Ozs7Ozs7O0FDRnZELG1CQUFPLENBQUMsc0JBQTZCO0FBQ3JDLG1CQUFPLENBQUMsc0JBQWdDO0FBQ3hDLGlCQUFpQixtQkFBTyxDQUFDLHNCQUE2Qjs7Ozs7Ozs7QUNGdEQsa0JBQWtCLFlBQVksbUJBQU8sQ0FBQyxzQkFBNEIsc0I7Ozs7Ozs7QUNBbEU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7OztBQ0pBLGtCQUFrQixZQUFZLG1C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O0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiY2h1bmsvUmVkQmFnRGV0YWlsLjQ3N2VjZjc0NjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBpZiAoc2FmZSAmJiB0YXJnZXRba2V5XSkgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanNcbi8vIG1vZHVsZSBpZCA9IDE0ZGMxZjdlYmQ4MGQxNWJmZDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDE2Nzk4NTFiZTI3YjI2OGVhMjRlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMWRmYWMyODUyM2FlMzdkYWM1YlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNTFiYzdhZmU4MTI3ZTA5MTQ5ZFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhjZmY4NmUxZDUxZWJmMjFmN2Zcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDNjMjRkMzhmZmNkMGMzOGUzNDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1M2I3ZDM0ODE3MTQ0YjEyYjBhYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0UHVsbExvYWQsIHtTVEFUU30gZnJvbSAncmVhY3QtcHVsbGxvYWQnXHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4uLy4uL2Fzc2V0cy91dGlsL2NvbmZpZ1wiXHJcbmltcG9ydCB7YmVmb3JlRW50ZXJSb3V0ZXIsIHBvc3R9IGZyb20gXCIuLi8uLi9hc3NldHMvdXRpbC9yZXF1ZXN0XCI7XHJcbmltcG9ydCAnLi9SZWFjdFB1bGxMb2FkLnNjc3MnXHJcbmltcG9ydCBcIi4vUmVkQmFnRGV0YWlsLnNjc3NcIlxyXG5pbXBvcnQgcmJyZWNvcmQgZnJvbSBcIi4uLy4uL2Fzc2V0cy9pbWdzL1JCcmVjb3JkLnBuZ1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRCYWdEZXRhaWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGdldFJlY29yZERhdGEgPSAoY3VycmVudFBhZ2UsKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHBvc3QoQ09ORklHLlJFU1QuZ2V0UmV3YXJkTGlzdCx7XHJcbiAgICAgICAgICAgIGF3YXJkU3Q6IFwiMVwiLFxyXG4gICAgICAgICAgICBjdXJyZW50UGFnZTogY3VycmVudFBhZ2UsXHJcbiAgICAgICAgICAgIHBhZ2VTaXplOiBcIjE1XCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVBY3Rpb24gPSAoYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKGFjdGlvbiwgdGhpcy5zdGF0ZS5hY3Rpb24sIGFjdGlvbiA9PT0gdGhpcy5zdGF0ZS5hY3Rpb24pO1xyXG4gICAgICAgIC8vbmV3IGFjdGlvbiBtdXN0IGRvIG5vdCBlcXVlbCB0byBvbGQgYWN0aW9uXHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5zdGF0ZS5hY3Rpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uID09PSBTVEFUUy5yZWZyZXNoaW5nKSB7Ly/liLfmlrBcclxuICAgICAgICAgICAgdGhpcy5oYW5kUmVmcmVzaGluZygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSBTVEFUUy5sb2FkaW5nKSB7Ly/liqDovb3mm7TlpJpcclxuICAgICAgICAgICAgdGhpcy5oYW5kTG9hZE1vcmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL0RPIE5PVCBtb2RpZnkgYmVsb3cgY29kZVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaGFuZFJlZnJlc2hpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKFNUQVRTLnJlZnJlc2hpbmcgPT09IHRoaXMuc3RhdGUuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vcmVmcmVzaGluZyBjb21wbGV0ZVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IGNEYXRhLnBhcmFtcyxcclxuICAgICAgICAgICAgICAgIGhhc01vcmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IFNUQVRTLnJlZnJlc2hlZCxcclxuICAgICAgICAgICAgICAgIGluZGV4OiBjRGF0YS50b3RhbFBhZ2UgLSAxXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUwMClcclxuXHJcbiAgICAgICAgdGhpcy5nZXRSZWNvcmREYXRhKDEpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IHJlc3BvbnNlLmN1cnJlbnRQYWdlLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcmVzcG9uc2UucGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgaGFzTW9yZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogU1RBVFMucmVmcmVzaGVkLFxyXG4gICAgICAgICAgICAgICAgaW5kZXg6IHJlc3BvbnNlLnRvdGFsUGFnZSAtIHJlc3BvbnNlLmN1cnJlbnRQYWdlLFxyXG4gICAgICAgICAgICAgICAgdG90YWxOdW06IHJlc3BvbnNlLnRvdGFsTnVtLFxyXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludEF0OiByZXNwb25zZS50b3RhbFBvaW50QXRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGFjdGlvbjogU1RBVFMucmVmcmVzaGluZ1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBoYW5kTG9hZE1vcmUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKFNUQVRTLmxvYWRpbmcgPT09IHRoaXMuc3RhdGUuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aXoOabtOWkmuWGheWuueWImeS4jeaJp+ihjOWQjumdoumAu+i+kVxyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5oYXNNb3JlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogU1RBVFMucmVzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzTW9yZTogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFsuLi50aGlzLnN0YXRlLmRhdGEsIGNEYXRhLnBhcmFtc1swXSwgY0RhdGEucGFyYW1zWzBdLCBjRGF0YS5wYXJhbXNbMF0sIGNEYXRhLnBhcmFtc1swXSwgY0RhdGEucGFyYW1zWzBdLCBjRGF0YS5wYXJhbXNbMF0sIGNEYXRhLnBhcmFtc1swXSwgY0RhdGEucGFyYW1zWzBdLCBjRGF0YS5wYXJhbXNbMF0sIGNEYXRhLnBhcmFtc1swXSwgY0RhdGEucGFyYW1zWzBdXSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFNUQVRTLnJlc2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLnN0YXRlLmluZGV4IC0gMVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgNTAwKVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmdldFJlY29yZERhdGEodGhpcy5zdGF0ZS5jdXJyZW50UGFnZSArIDEpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gWy4uLnRoaXMuc3RhdGUuZGF0YSwgLi4ucmVzcG9uc2UucGFyYW1zXTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleD1yZXNwb25zZS50b3RhbFBhZ2UgLSByZXNwb25zZS5jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogU1RBVFMucmVzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc01vcmU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogYXJyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNNb3JlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFNUQVRTLnJlc2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsTnVtOiByZXNwb25zZS50b3RhbE51bSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxQb2ludEF0OiByZXNwb25zZS50b3RhbFBvaW50QXRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGFjdGlvbjogU1RBVFMubG9hZGluZ1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRNb255ID0gKG1vbmV5KSA9PiB7XHJcbiAgICAgICAgbW9uZXkgKz0gXCJcIlxyXG4gICAgICAgIGlmIChtb25leS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbW9uZXkgPSBtb25leS50cmltKCk7XHJcbiAgICAgICAgaWYgKG1vbmV5Lmxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgIGxldCBzdHIxID0gbW9uZXkuc2xpY2UoMCwgbW9uZXkubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgICAgIGxldCBzdHIyID0gbW9uZXkuc2xpY2UobW9uZXkubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHIxICsgXCIuXCIgKyBzdHIyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1vbmV5Lmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjAuXCIgKyBtb25leVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiMC4wXCIgKyBtb25leVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxyXG4gICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgaGFzTW9yZTogdHJ1ZSxcclxuICAgICAgICAgICAgYWN0aW9uOiBTVEFUUy5pbml0LFxyXG4gICAgICAgICAgICBpbmRleDogMTAwLFxyXG4gICAgICAgICAgICB0b3RhbE51bTogMCxcclxuICAgICAgICAgICAgdG90YWxQb2ludEF0OiAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGJlZm9yZUVudGVyUm91dGVyKFwi6LWP6YeR5aWW5YqxXCIpXHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkRGF0YSgxKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiByZXNwb25zZS5jdXJyZW50UGFnZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3BvbnNlLnBhcmFtcyxcclxuICAgICAgICAgICAgICAgIGhhc01vcmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IFNUQVRTLnJlZnJlc2hlZCxcclxuICAgICAgICAgICAgICAgIGluZGV4OiBwYXJzZUludChyZXNwb25zZS50b3RhbFBhZ2UpIC0gcGFyc2VJbnQocmVzcG9uc2UuY3VycmVudFBhZ2UpLFxyXG4gICAgICAgICAgICAgICAgdG90YWxOdW06IHJlc3BvbnNlLnRvdGFsTnVtLFxyXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludEF0OiByZXNwb25zZS50b3RhbFBvaW50QXRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxyXG4gICAgICAgICAgICBkYXRhOiBjRGF0YS5wYXJhbXMsXHJcbiAgICAgICAgICAgIGhhc01vcmU6IHRydWUsXHJcbiAgICAgICAgICAgIGFjdGlvbjogU1RBVFMuaW5pdCxcclxuICAgICAgICAgICAgaW5kZXg6IDUgLSAxLFxyXG4gICAgICAgICAgICB0b3RhbE51bTogMTAwLFxyXG4gICAgICAgICAgICB0b3RhbFBvaW50QXQ6IDE4MFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2RhdGEsIGhhc01vcmUsIHRvdGFsTnVtLCB0b3RhbFBvaW50QXR9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD17XCJyYmRcIn0+XHJcbiAgICAgICAgICAgICAgICB7Lyo8ZGl2IHN0eWxlPXtmaXhIZWFkZXJTdHlsZX0+Ki99XHJcbiAgICAgICAgICAgICAgICB7LypmaXhlZCBoZWFkZXIqL31cclxuICAgICAgICAgICAgICAgIHsvKjwvZGl2PiovfVxyXG4gICAgICAgICAgICAgICAgPFJlYWN0UHVsbExvYWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb3duRW5vdWdoPXsxNTB9XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uPXt0aGlzLnN0YXRlLmFjdGlvbn1cclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVBY3Rpb249e3RoaXMuaGFuZGxlQWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgIGhhc01vcmU9e2hhc01vcmV9XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VCb3R0b209ezEwMDB9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInRlc3QtdWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaGVhZCB3aGl0ZSAgaXRlbS1ib3JkZXItcmVkdXNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dG90YWxOdW195Lu95o6o6I2Q57qi5YyFPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+5YWxIHt0aGlzLmdldE1vbnkodG90YWxQb2ludEF0KX3lhYM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjb250ZW50IHdoaXRlIGl0ZW0tYm9yZGVyLXJlZHVzXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVuZ3RoICE9IDAgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm1hcCgoc3RyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtcIml0ZW1cIn0ga2V5PXtpbmRleH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImxlZnRcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57c3RyLm1vYmlsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPuaCqOeahOi1j+mHkeW3suWtmOWFpee6ouWMhTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJyaWdodFwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIMKle3RoaXMuZ2V0TW9ueShzdHIucG9pbnRBdCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW1nV2FycFwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17cmJyZWNvcmR9IGFsdD1cIlwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0aXBzXCJ9PuacrOWIl+ihqOS7heWxleekuui/keS4ieS4quaciOeahOi1j+mHkeiusOW9lTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICA8L1JlYWN0UHVsbExvYWQ+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9SZWRCYWdEZXRhaWwvUmVkQmFnRGV0YWlsLmpzIiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDVlNTliNzFiMzNhMzhjMzYxOGU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1ZTc0OTFmMWY3OTk3MTVlYWM3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDZhNDQyYWI1YmQ5YmQ5Mjk0NDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8qXHJcbiAgIEFQSSDmjqXlj6PphY3nva5cclxuICAgYXhpb3Mg5Y+C6ICD5paH5qGj77yaaHR0cHM6Ly93d3cua2FuY2xvdWQuY24veXVueWUvYXhpb3MvMjM0ODQ1XHJcblxyXG4qL1xyXG4vLyBpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnYW50ZC1tb2JpbGUvbGliL3RvYXN0JztcclxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnXCJcclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKlxyXG4qIOW4uOmHj+WumuS5ieWMulxyXG4qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBjb25zdCBVdGlsID0gd2luZG93LlVQLlcuVXRpbDtcclxuXHJcbmV4cG9ydCBjb25zdCBBcHAgPSBVUC5XLkFwcDtcclxuXHJcbmV4cG9ydCBjb25zdCBFbnYgPSBVUC5XLkVudjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGhvbmUgPSAvXigxM1swLTldfDE0WzU3OV18MTVbMC0zLDUtOV18MTZbNl18MTdbMDEzNTY3OF18MThbMC05XXwxOVs4OV0pXFxkezh9JC87XHJcblxyXG5leHBvcnQgY29uc3QgcmVnUGF5TnVtID0gL15bMC05XXsyMH0kLztcclxuXHJcbmV4cG9ydCBjb25zdCBjb21vbVBhcmFtID0ge1xyXG4gICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgIHNvdXJjZTogXCIyXCJcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiDor7fmsYLmoLjlv4PljLog5LiL6Z2i6L+Z5Z2X5Yy65Z+f5Lit55qE5Luj56CB5pS55Yqo6K+35oWO6YeNXHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5sZXQgYmFzZVVybCA9IFwiXCIsIGJhc2VVcmwyID0gXCJcIiwgYmFzZVVybDMgPSBcIlwiO1xyXG5pZiAobG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignOTU1MTYuY29tJykgIT09IC0xKSB7IC8v55Sf5Lqn546v5aKDXHJcbiAgICBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vc2hhbmdodS45NTUxNi5jb20vd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDIgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9tYWxsLjk1NTE2LmNvbS9jcXAtaW50LW1hbGwtd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICBiYXNlVXJsMyA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL3lvdWh1aS45NTUxNi5jb20veW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2UgaWYgKGxvY2F0aW9uLmhvc3RuYW1lLmluZGV4T2YoJzE3Mi4xOC4xNzkuMTAnKSAhPT0gLTEpIHsgLy/mtYvor5Xnjq/looNcclxuICAgIC8vIGJhc2VVcmw9XCJodHRwOi8vMTcyLjIxLjEwMS4yNTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7IC8v5rWL6K+V5a6kYXBhY2hlXHJcbiAgICAvL2Jhc2VVcmwgPSBcImh0dHA6Ly8xNzIuMjEuMTAxLjk1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjsvL+W8gOWPkeeOr+Wig2FwYWNoZVxyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4xMzMuMjU6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59IGVsc2Uge1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuOTU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuMjU6MzgyMTAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4xOC4xNzkuMTcvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5rWL6K+V5a6kZjUg6YCa6L+HTmdpbnjovazlj5FcclxuICAgIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xMS95b3VodWktd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMTMzLjI1OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjMzLjU2OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxufVxyXG4vKipcclxuICog6YCa6L+H5ZCO57yA6I635Y+W5pyN5Yqh5Zmo55qE5YWo5Zyw5Z2AXHJcbiAqIEBwYXJhbSB1cmxcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZXJ2VXJsID0gKHVybCkgPT4ge1xyXG4gICAgbGV0IHNlcnZlclVybCA9IFwiXCJcclxuICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QudXNlckluZm8pIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgLy8gZWxzZSBpZiAodXJsLnNwbGl0KFwiL1wiKVswXSA9PSBcImFkZHJlc3NcIikge1xyXG4gICAgLy8gICAgIHNlcnZlclVybCA9IGJhc2VVcmwyXHJcbiAgICAvLyB9XHJcbiAgICBlbHNlIGlmICh1cmwuc3BsaXQoXCIvXCIpWzBdID09IFwic2NhblwiIHx8IHVybCA9PSBDT05GSUcuUkVTVC5nZXRDaXR5KSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gYmFzZVVybDNcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHNlcnZlclVybCA9IGJhc2VVcmxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VydmVyVXJsO1xyXG59XHJcblxyXG4vKipcclxuICog5qC85byP5YyW57uT5p6cIOWwhue7k+aenOagvOW8j+WMluS4ulxyXG4gKiB7XHJcbiAqICAgICBzdGF0dXNDb2RlICAg5ZCO5Y+w5ZON5bqU56CBXHJcbiAqICAgICBkYXRhICAgICAgICAg5ZCO5Y+w6L+U5Zue55qE5pWw5o2uXHJcbiAqICAgICBtc2cgICAgICAgICAg5ZCO5Y+w55qE5o+Q56S65L+h5oGvXHJcbiAqIH1cclxuICogQHBhcmFtIGRhdGFcclxuICogQHJldHVybnMge3tzdGF0dXNDb2RlOiAoc3RyaW5nfCopLCBkYXRhOiAqLCBtc2c6ICp9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlRm9ybWF0dGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCByZXMgPSB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5yZXNwLFxyXG4gICAgICAgIGRhdGE6IGRhdGEucGFyYW1zLFxyXG4gICAgICAgIG1zZzogZGF0YS5tc2dcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vLyDliKDpmaTlupXpg6ggJy8nXHJcbmZ1bmN0aW9uIGRlbGV0ZVNsYXNoKGhvc3QpIHtcclxuICAgIHJldHVybiBob3N0LnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbn1cclxuXHJcbi8vIOa3u+WKoOWktOmDqCAnLydcclxuZnVuY3Rpb24gYWRkU2xhc2gocGF0aCkge1xyXG4gICAgcmV0dXJuIC9eXFwvLy50ZXN0KHBhdGgpID8gcGF0aCA6IGAvJHtwYXRofWA7XHJcbn1cclxuXHJcbi8vIOino+aekOWPguaVsFxyXG5mdW5jdGlvbiBzZXBhcmF0ZVBhcmFtcyh1cmwpIHtcclxuICAgIGNvbnN0IFtwYXRoID0gJycsIHBhcmFtc0xpbmUgPSAnJ10gPSB1cmwuc3BsaXQoJz8nKTtcclxuXHJcbiAgICBsZXQgcGFyYW1zID0ge307XHJcblxyXG4gICAgcGFyYW1zTGluZS5zcGxpdCgnJicpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gaXRlbS5zcGxpdCgnPScpO1xyXG5cclxuICAgICAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtwYXRoLCBwYXJhbXN9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZyl7XHJcbiAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge319ID0gY29uZmlnO1xyXG4gICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4gICAgbGV0IHNlcnZlclVybCA9ICdodHRwOi8vMTI3LjAuMC4xOjMwMDAvJztcclxuICAgIGxldCBmaW5hbFVybCA9IHNlcnZlclVybCArIHVybDtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHVybDpmaW5hbFVybCxcclxuICAgICAgICAgICAgdHlwZTptZXRob2QsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAnMjAwJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZUZvcm1hdHRlcihyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcign6K+35rGC5aSx6LSlJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYoIG1ldGhvZCA9PT0gJ1BPU1QnICl7XHJcbiAgICAgICAgICAgICBvcHRpb25zLmRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgIG9wdGlvbnMuZGF0YVR5cGUgPSAnanNvbidcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgob3B0aW9ucyk7XHJcbiAgICB9KVxyXG4gICAgXHJcbn1cclxuXHJcbi8vIOS4u+imgeivt+axguaWueazlVxyXG4vLyBleHBvcnQgIGZ1bmN0aW9uIHJlcXVlc3RPcmlnaW4oY29uZmlnKSB7XHJcblxyXG4vLyAgICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbi8vICAgICBjb25zdCB1aSA9IFVQLlcuVUk7XHJcbi8vICAgICBjb25zdCBlbnYgPSBVUC5XLkVudjtcclxuXHJcbi8vICAgICBsZXQge21ldGhvZCwgdXJsLCBkYXRhID0ge30sIGhlYWRlcnMsIGZvckNoc3AsIGVuY3J5cHQsIGJ5QWpheCwgY2FjaGUsIHVwZGF0ZSwgc3RvcmFnZX0gPSBjb25maWc7XHJcblxyXG4vLyAgICAgbWV0aG9kID0gKG1ldGhvZCAmJiBtZXRob2QudG9VcHBlckNhc2UoKSkgfHwgJ0dFVCc7XHJcblxyXG4vLyAgICAgbGV0IHNlcnZlclVybCA9IGdldFNlcnZVcmwodXJsKTtcclxuXHJcbi8vICAgICAvLyBsZXQgc2VydmVyVXJsID0gYmFzZVVybCA7XHJcbi8vICAgICAvLyBpZiAodHJ1ZSkge1xyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4fmj5Lku7blj5HpgIHor7fmsYJcclxuLy8gICAgICAqL1xyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKiBAcGFyYW0gcGFyYW1zIOivt+axguWPguaVsFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICB2ZXJzaW9u77ya54mI5pys77yM6buY6K6k5pivMS4wXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHNvdXJjZe+8muadpea6kO+8jOm7mOiupOagueaNrkFuZHJvaWTjgIFpT1Poh6rliqjmt7vliqBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgZW5jcnlwdO+8muaYr+WQpuWKoOWvhu+8jOm7mOiupOWKoOWvhlxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBtZXRob2TvvJror7fmsYLmlrnms5XvvIxQT1NU5oiWR0VUXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIGNtZO+8muivt+axguWRveS7pO+8iOS5n+WPr+iHquihjOWwhmNtZOe7hOijheiHs3VyaVvkvJjmg6DlkI7lj7Bd5oiWcGF0aFvpkrHljIXlkI7lj7Bd77yJXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHVyaS9wYXRo77ya6K+35rGC5Zyw5Z2A77yM5bu66K6u5LuF5aGr5YWFY21k77yM5LiN5bu66K6u6Ieq6KGM57uE6KOFdXJpL3BhdGhcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgcGFyYW1z77ya5Y+R6YCB57uZ5ZCO5Y+w55qE5Y+C5pWwXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHZpZO+8muWmguaenOmAmui/h0FqYXjmlrnlvI/lkJF3YWxsZXTlkI7lj7Dlj5HpgIHor7fmsYLpnIDopoHmkLrluKZ2aWRcclxuLy8gICAgICAqIEBwYXJhbSBmb3JDaHNwIOaYr+WQpuWQkeS8mOaDoOWQjuWPsOWPkemAgeivt+axgu+8iOm7mOiupOWQkeaJi+acuuWQjuWPsOWPkemAgeivt+axgu+8iVxyXG4vLyAgICAgICogQHBhcmFtIGJ5QWpheCDmmK/lkKbkvb/nlKhBamF45Y+R6YCB6K+35rGC77yI6buY6K6k5L2/55So5o6n5Lu277yJXHJcbi8vICAgICAgKiBAcGFyYW0gc3VjY2VzcyDmiJDlip/lm57osINcclxuLy8gICAgICAqIEBwYXJhbSBlcnJvciDplJnor6/lm57osIPvvIjkuJrliqHplJnor6/vvIlcclxuLy8gICAgICAqIEBwYXJhbSBmYWlsIOWksei0peWbnuiwg++8iOivt+axguWksei0pe+8iVxyXG4vLyAgICAgICovXHJcbi8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4vLyAgICAgICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuXHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgc3VjY2Vzc0NhbGxiYWNrID0gKGRhdGEsZnVjKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuaIkOWKn+e7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuLy8gICAgICAgICAgICAgICAgIGxldCByZXEgPSByZXNwb25zZUZvcm1hdHRlcihkYXRhKTtcclxuLy8gICAgICAgICAgICAgICAgIGlmKCAhIWZ1YyApe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlcS5mdWMgPSBmdWM7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcSlcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGVycm9yQ2FsbGJhY2sgPSAoZXJyKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/lOWbnuWksei0pee7k+aenO+8mlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICh1cmwgPT0gQ09ORklHLlJFU1QuYXBwbHlNY2MgfHwgdXJsID09IENPTkZJRy5SRVNULmFwcGx5TWF0IHx8IHVybCA9PSBDT05GSUcuUkVTVC50b2RheU1vbmV5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJlc3BvbnNlRm9ybWF0dGVyKGVycik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXEpXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBUb2FzdC5pbmZvKGVyci5tc2cgfHwgJ+afpeivouS4muWKoeimgee0oOWHuumUme+8jOivt+eojeWQjuWGjeivle+8gScpO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgbmV0d29ya0NhbGxiYWNrID0gKHhocikgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4vLyAgICAgICAgICAgICAgICAgVG9hc3QuaW5mbyh4aHIubXNnKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuXHJcbi8vICAgICAgICAgICAgIGlmICh1cmwgIT0gQ09ORklHLlJFU1QuZ2V0VG9kYXlJbmNvbWUpIHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLnNob3dMb2FkaW5nKCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGlmICghY2FjaGUpIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJQYXJhbTpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHtcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgZW5jcnlwdDogZW5jcnlwdCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBmb3JDaHNwOiBmb3JDaHNwLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGJ5QWpheDogYnlBamF4XHJcbi8vICAgICAgICAgICAgICAgICAvLyB9KVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHpnZ7nvJPlrZjor7fmsYJcIilcclxuLy8gICAgICAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZShcclxuLy8gICAgICAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cmk6c2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjayk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNhY2hlVXJsOlwiICsgdXJsKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdG9yZWFnZeetlueVpeaYrzpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2UpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInVwZGF0ZeWHveaVsDpcIilcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVwZGF0ZSlcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB57yT5a2Y6K+35rGCXCIpXHJcbi8vICAgICAgICAgICAgICAgICAvKipcclxuLy8gICAgICAgICAgICAgICAgICAqIOWQkeacjeWKoeWZqOWPkemAgeivt+axglxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHBhcmFtcyDor7fmsYLlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmVyc2lvbu+8mueJiOacrO+8jOm7mOiupOaYrzEuMFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzb3VyY2XvvJrmnaXmupDvvIzpu5jorqTmoLnmja5BbmRyb2lk44CBaU9T6Ieq5Yqo5re75YqgXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuY3J5cHTvvJrmmK/lkKbliqDlr4bvvIzpu5jorqTliqDlr4ZcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbWV0aG9k77ya6K+35rGC5pa55rOV77yMUE9TVOaIlkdFVFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBjbWTvvJror7fmsYLlkb3ku6TvvIjkuZ/lj6/oh6rooYzlsIZjbWTnu4Too4Xoh7N1cmlb5LyY5oOg5ZCO5Y+wXeaIlnBhdGhb6ZKx5YyF5ZCO5Y+wXe+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB1cmkvcGF0aO+8muivt+axguWcsOWdgO+8jOW7uuiuruS7heWhq+WFhWNtZO+8jOS4jeW7uuiuruiHquihjOe7hOijhXVyaS9wYXRoXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHBhcmFtc++8muWPkemAgee7meWQjuWPsOeahOWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2aWTvvJrlpoLmnpzpgJrov4dBamF45pa55byP5ZCRd2FsbGV05ZCO5Y+w5Y+R6YCB6K+35rGC6ZyA6KaB5pC65bimdmlkXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZm9yQ2hzcCDmmK/lkKblkJHkvJjmg6DlkI7lj7Dlj5HpgIHor7fmsYLvvIjpu5jorqTlkJHmiYvmnLrlkI7lj7Dlj5HpgIHor7fmsYLvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBieUFqYXgg5piv5ZCm5L2/55SoQWpheOWPkemAgeivt+axgu+8iOm7mOiupOS9v+eUqOaOp+S7tu+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3Mg5oiQ5Yqf5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZXJyb3Ig6ZSZ6K+v5Zue6LCD77yI5Lia5Yqh6ZSZ6K+v77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZmFpbCDlpLHotKXlm57osIPvvIjor7fmsYLlpLHotKXvvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSB1cGRhdGUg5byC5q2l5Yi35paw5Zue6LCDIOWmguaenOiuvue9rmFzeW5j5Li6dHJ1ZeWQjuWPr+S7pea3u+WKoHVwZGF0ZeWbnuiwgyDlpoLmnpzkuI3loavlhpnpu5jorqTku6VzdWNjZXNz6L+b6KGM5aSE55CGXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gc3RvcmFnZSDnvJPlrZjlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgbmVlZFN3ICAgICAgICAgICAgLy/pu5jorqRmYWxzZeWkp+mDqOWIhueUqOeahOaYr+aPkuS7tumcgOimgeeahOaJi+WKqOWOu+WKoFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzdG9yYWdlVHlwZSAgICAgIC8v6buY6K6k5L2/55SobG9jYWxzdG9yYWdlXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGFzeW5jICAgICAgICAgICAgLy/pu5jorqTojrflj5bnvJPlrZjlkI7kuI3lj5Hor7fmsYLvvIzmlLnkuLp0cnVl5ZCO5Lya5byC5q2l5Y676K+35rGC5ZCO5Y+w5bm25Yi35paw5pWw5o2uXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGVuZE9mU3luY0Z1bmMgICAgLy90b2RvIOmHjeimge+8ge+8ge+8ge+8geWbnuiwg+S4reWmguaenOWtmOWcqOW8guatpe+8iOaPkuS7tuetie+8iemcgOimgeagh+aYjuW8guatpeeKtuaAgeS4unRydWVcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgdmFsaWRhdGVUaW1lICAgICAvL+acieaViOacn+m7mOiupOaXoOmZkOacieaViOacnyDljZXkvY3mr6vnp5JcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVdpdGhJZCAgICAgICAvL+m7mOiupHRydWXku6XnlKjmiLdpZOi/m+ihjOWtmOWCqOWQpuWImWZhbHNl5LulbG9jYWzlrZjlgqhcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2F2ZVN1Y2MgICAgICAgICAvL+S/neWtmOaIkOWKn+WQjueahOWbnuiwg1xyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlRXJyICAgICAgICAgIC8v5L+d5a2Y5aSx6LSl5ZCO55qE5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHJvbGxLZXkgICAgICAgICAgLy/lvLrliLborr7nva7kuLvplK5cclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgc2Vjb25kS2V5ICAgICAgICAvL+W8uuWItuiuvue9ruasoeimgemUruWAvFxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g6YeN6KaB6K+05piOIOiwg+eUqOW8guatpeaooeW8j++8iGFzeW5j6K6+572u5Li6dHJ1Ze+8ieWQjuWPr+iDveWcqHN1Y2Nlc3Plm57osIPph4zlrZjlnKjlvILmraXmk43kvZzvvIzor6Xmg4XlhrXkuIvlm57lr7zoh7TnvJPlrZjnmoTlm57osIPlj6/og71cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOacquaJp+ihjOWujOaIkO+8jOivt+axgueahOWbnuiwg+WPiOW8gOWni+aJp+ihjOS6hueahOaDheWGte+8jOaJgOS7peaIkeS7rOe7n+S4gOWcqHN1Y2Nlc3Plm57osIPlkox1cGRhdGXlm57osIPnmoTlhaXlj4Llop7liqDkuobnrKzkuozkuKrlj4LmlbBcclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOeUqOS6juWFvOWuueWbnuiwg+WGheWMheWQq+W8guatpeeahOeKtuWGte+8jOS9v+eUqOaWueazleS4uu+8mummluWFiOiuvue9rmVuZE9mU3luY0Z1bmPlj4LmlbDkuLp0cnVlLOWFtuasoXN1Y2Nlc3Plkox1cGRhdGXlm55cclxuLy8gICAgICAgICAgICAgICAgICAqICB0b2RvIOiwg+WGheS8muaciTLkuKrlhaXlj4LvvIxzdWNjZXNz77yIcmVzcO+8jGZ1Y++8ie+8jOivt+WcqOS7o+eggemXreWMheWkhOS9v+eUqGZ1Yy5lbmRPZkZ1bmMoKVxyXG4vLyAgICAgICAgICAgICAgICAgICovXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHBhcmFtID0ge31cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGJ5QWpheCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogXCJsaWZlL2xpZmVcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcmFtID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbWQ6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXJpOnNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZW5jcnlwdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2VXaXRoU3RvcmFnZShwYXJhbSwgZm9yQ2hzcCwgYnlBamF4LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG5ldHdvcmtDYWxsYmFjaywgc3RvcmFnZSwgdXBkYXRlKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICB9KVxyXG4vLyAgICAgfSlcclxuXHJcblxyXG4vLyAgICAgLy8gfVxyXG4vLyAgICAgLy8gZWxzZSB7XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDpgJrov4dBamF4IOWPkemAgeivt+axglxyXG4vLyAgICAgICovXHJcbi8vICAgICAvLyByZXR1cm4gYXhpb3Moe1xyXG4vLyAgICAgLy8gICAgIHVybDogYmFzZVVybCArIHVybCxcclxuLy8gICAgIC8vICAgICBtZXRob2QsXHJcbi8vICAgICAvLyAgICAgaGVhZGVycyxcclxuLy8gICAgIC8vICAgICBkYXRhOiBtZXRob2QgPT09ICdHRVQnID8gdW5kZWZpbmVkIDogZGF0YSxcclxuLy8gICAgIC8vICAgICBwYXJhbXM6IE9iamVjdC5hc3NpZ24obWV0aG9kID09PSAnR0VUJyA/IGRhdGEgOiB7fSwgcGFyYW1zKVxyXG4vLyAgICAgLy8gfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gICAgIC8vXHJcbi8vICAgICAvLyAgICAgbGV0IHJlcSA9IHtcclxuLy8gICAgIC8vICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2UuZGF0YS5yZXNwLFxyXG4vLyAgICAgLy8gICAgICAgICBkYXRhOiByZXNwb25zZS5kYXRhLnBhcmFtc1xyXG4vLyAgICAgLy8gICAgIH1cclxuLy8gICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcSlcclxuLy8gICAgIC8vIH0pLmNhdGNoKGVyciA9PiB7XHJcbi8vICAgICAvLyAgICAgLy8g6K+35rGC5Ye66ZSZXHJcbi8vICAgICAvLyAgICAgVG9hc3QuaW5mbygncmVxdWVzdCBlcnJvciwgSFRUUCBDT0RFOiAnICsgZXJyLnJlc3BvbnNlLnN0YXR1cyk7XHJcbi8vICAgICAvLyAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XHJcbi8vICAgICAvLyB9KTtcclxuLy8gICAgIC8vIH1cclxuXHJcbi8vIH1cclxuXHJcbi8vIOS4gOS6m+W4uOeUqOeahOivt+axguaWueazlVxyXG5leHBvcnQgY29uc3QgZ2V0ID0gKHVybCwgZGF0YSwgcGFyYW0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IHBhcmFtQWxsID0gT2JqZWN0LmFzc2lnbih7Zm9yQ2hzcDogdHJ1ZSwgZW5jcnlwdDogdHJ1ZSwgY2FjaGU6IGZhbHNlLCBieUFqYXg6IGZhbHNlfSwgcGFyYW0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QoT2JqZWN0LmFzc2lnbih7dXJsLCBkYXRhfSwgcGFyYW1BbGwpKVxyXG59O1xyXG5leHBvcnQgY29uc3QgcG9zdCA9ICh1cmwsIGRhdGEsIHBhcmFtID0ge30pID0+IHtcclxuICAgIGxldCBwYXJhbUFsbCA9IE9iamVjdC5hc3NpZ24oe2ZvckNoc3A6IHRydWUsIGVuY3J5cHQ6IHRydWUsIGNhY2hlOiBmYWxzZSwgYnlBamF4OiBmYWxzZX0sIHBhcmFtKTtcclxuICAgIHJldHVybiByZXF1ZXN0KE9iamVjdC5hc3NpZ24oe21ldGhvZDogJ1BPU1QnLCB1cmwsIGRhdGF9LCBwYXJhbUFsbCkpXHJcbn07XHJcbmV4cG9ydCBjb25zdCBwdXQgPSAodXJsLCBkYXRhKSA9PiByZXF1ZXN0KHttZXRob2Q6ICdQVVQnLCB1cmwsIGRhdGF9KTtcclxuZXhwb3J0IGNvbnN0IGRlbCA9ICh1cmwsIGRhdGEpID0+IHJlcXVlc3Qoe21ldGhvZDogJ0RFTEVURScsIHVybCwgZGF0YX0pO1xyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIOWKn+iDveWHveaVsOWMulxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIOWwhlVSTOS4reeahHNlYXJjaCDlrZfnrKbkuLIg6L2s5o2i5oiQIOWvueixoVxyXG4gKiBAcGFyYW0gc2VhcmNoXHJcbiAqIEByZXR1cm5zIHt7fX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTZWFyY2hQYXJhbSA9IChzZWFyY2gpID0+IHtcclxuICAgIGlmICghIXNlYXJjaCkge1xyXG4gICAgICAgIGxldCBzdHIgPSBzZWFyY2guc2xpY2UoMSk7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gc3RyLnNwbGl0KFwiJlwiKTtcclxuICAgICAgICBsZXQgb2JqID0ge307XHJcbiAgICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW0gPSBpdGVtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgb2JqW3BhcmFtWzBdXSA9IHBhcmFtWzFdO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIGNvZG92YSDmj5Lku7bosIPnlKjljLpcclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5cclxuLy8g5ZCv5YGc5pS25qy+56CBXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRYaWFvV2VpUGF5KHBhcmFtLCBzdWMsIGVycikge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuc2V0WGlhb1dlaVBheShwYXJhbSwgc3VjLCBlcnIpO1xyXG59XHJcblxyXG4vL+Wwj+W+rmF1ZGlvXHJcbmV4cG9ydCBjb25zdCBzZXRYaWFvV2VpQXVkaW8gPSAocGFyYW0sIHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5zZXRYaWFvV2VpQXVkaW8ocGFyYW0sIHN1YywgZXJyKTtcclxufVxyXG5leHBvcnQgY29uc3QgZ2V0WGlhb1dlaUF1ZGlvID0gKHN1YywgZXJyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5nZXRYaWFvV2VpQXVkaW8oc3VjLCBlcnIpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdG9hc3QgPSAobXMpID0+IHtcclxuICAgIFRvYXN0LmluZm8obXMsIDIpO1xyXG59XHJcbi8qKlxyXG4gKiDorr7nva7pobbpg6hiYXJcclxuICogQHBhcmFtIHRpdGxlIOmhtemdouWQjeensFxyXG4gKiBAcGFyYW0gcmlnaHRCYXIg5Y+z5L6n5oyJ6ZKu5ZCN56ewXHJcbiAqIEBwYXJhbSByaWdodENhbGxiYWNrIOWPs+S+p+aMiemSruWbnuiwg1xyXG4gKiBAcGFyYW0gcmlnaHRCYXJJbWcg5Y+z5L6n5oyJ6ZKu5Zu+54mHXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYmVmb3JlRW50ZXJSb3V0ZXIgPSAodGl0bGUgPSBcIlwiLCByaWdodEJhciA9IFwiXCIsIHJpZ2h0Q2FsbGJhY2sgPSBudWxsLCByaWdodEJhckltZyA9IG51bGwpID0+IHtcclxuICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHRpdGxlKVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueql+WPo+WPs+S+p+aMiemSrlxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZSDlm77moIfmoIfpophcclxuICAgICAgICAgKiBAcGFyYW0gaW1hZ2Ug5Zu+5qCH5paH5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIGhhbmRsZXIg54K55Ye75Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKCEhcmlnaHRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICBhcHAuc2V0TmF2aWdhdGlvbkJhclJpZ2h0QnV0dG9uKHJpZ2h0QmFyLCByaWdodEJhckltZywgcmlnaHRDYWxsYmFjaylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24oXCJcIiwgbnVsbCwgbnVsbClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDpgJrnn6XlrqLmiLfnq6/kv67mlLnnirbmgIFcclxuICovXHJcbmV4cG9ydCBjb25zdCBtY2NTdGF0ZUNoYW5nZWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAubWNjU3RhdGVDaGFuZ2VkKClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kUXJDb2RlID0gKHBhcmFtcywgc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5omr5o+P5p2h56CB5ZKM5LqM57u056CBXHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAgICAgICAqIEBwYXJhbSBzdWNjZXNzXHJcbiAgICAgICAgICogQHBhcmFtIGZhaWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuc2NhblFSQ29kZShwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VXZWJWaWV3ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY2xvc2VXZWJWaWV3KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2ZXJpZnlQYXlQd2QgPSAocGFyYW0sIHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnZlcmlmeVBheVB3ZChwYXJhbSwgc3VjY2VzcywgZmFpbClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVXZWJWaWV3ID0gKHVybCwgcGFyYW1zID0gbnVsbCwgdGl0bGUgPSAnJywgaXNGaW5pc2ggPSBcIjFcIikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAuY3JlYXRlV2ViVmlldyh1cmwsIHBhcmFtcywgdGl0bGUsIGlzRmluaXNoKVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRVc2VyRGV0YWlsSW5mbyA9IChzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICBhcHAuZ2V0VXNlckRldGFpbEluZm8oc3VjY2VzcywgZmFpbClcclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOWwhmNhdmFzIOS/neWtmOWIsOacrOWcsOebuOWGjFxyXG4gKiBAcGFyYW0gY2FudmFzXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2F2ZVFjb2RlID0gKGNhbnZhcykgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgdWkgPSBVUC5XLlVJIHx8IHt9O1xyXG4gICAgdmFyIHBpY1VybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhcHAubG9nRXZlbnQoJ3NhdmVQaWN0dXJlX05ld1llYXJBY3QnKTtcclxuICAgICAgICBhcHAuc2F2ZVBpY1RvTG9jYWwoe1xyXG4gICAgICAgICAgICB1cmw6IHBpY1VybCAmJiBwaWNVcmwuc3Vic3RyKDIyKVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdWkuc2hvd1RvYXN0V2l0aFBpYygn5bey5L+d5a2Y5Yiw57O757uf55u45YaMJyk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd1RvYXN0KG1zZyB8fCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoYXJlID0gKHRpdGxlLCBkZXNjLCBpbWdVUkwsIHBhZ2VVUmwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIGVudiA9IFVQLlcuRW52IHx8IHt9O1xyXG5cclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pi+56S65YiG5Lqr6Z2i5p2/XHJcbiAgICAgICAgICog5aaC5p6c5omA5pyJ5rig6YGT5L2/55So55u45ZCM55qE5YiG5Lqr5YaF5a655YiZ5LuF5aGr5YaZcGFyYW1z5Y2z5Y+v77yMXHJcbiAgICAgICAgICog5aaC5p6c6ZyA6KaB5qC55o2u5LiN5ZCM5rig6YGT5a6a5Yi25YiG5Lqr5YaF5a6577yM5YiZ5Y+vcGFyYW1z55WZ56m677yM5Zyoc2hhcmVDYWxsYmFja+S4rei/lOWbnuaMh+Wumua4oOmBk+eahOWIhuS6q+WGheWuuVxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXMg5YiG5Lqr5Y+C5pWwXHJcbiAgICAgICAgICogICAgICAgICAgICAgIHtcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHRpdGxl77yaIOWIhuS6q+agh+mimFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgZGVzYzog5YiG5Lqr5pGY6KaBXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBwaWNVcmzvvJrliIbkuqvlm77moIdcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNoYXJlVXJs77ya6K+m5oOF5Zyw5Z2AXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiBAcGFyYW0gc2hhcmVDYWxsYmFjayDliIbkuqvml7blm57osINcclxuICAgICAgICAgKiAgICAgICAgICAgICAgY2hhbm5lbO+8mntcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDDvvJrnn63kv6FcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDHvvJrmlrDmtarlvq7ljZpcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDPvvJrlvq7kv6Hlpb3lj4tcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDTvvJrlvq7kv6HmnIvlj4vlnIhcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDXvvJpRUeWlveWPi1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNu+8mlFR56m66Ze0XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA377ya5aSN5Yi26ZO+5o6lXHJcbiAgICAgICAgICogICAgICAgICAgICAgIH1cclxuICAgICAgICAgKiAgICAgICAgICAgICAgZGF0YTog6buY6K6k5YiG5Lqr5pWw5o2uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLnNob3dTaGFyZVBhbmVsKHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBkZXNjOiBkZXNjLFxyXG4gICAgICAgICAgICBwaWNVcmw6IGltZ1VSTCxcclxuICAgICAgICAgICAgc2hhcmVVcmw6IHBhZ2VVUmwgIC8vIHRvZG8g5pmu6YCa5YiG5LqrXHJcbiAgICAgICAgfSwgbnVsbClcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi355qE5a6a5L2N77yM6aaW5YWI6YCa6L+HR1BTIOWumuS9je+8jOWmguaenOWumuS9jeWksei0pe+8jOmAmui/h+aOpeWPo2dldENpdHks5Yip55SoSVDlnLDlnYDov5vooYzlrprkvY3vvIzlpoLmnpzov5jmmK/lpLHotKXvvIzpgJrov4fmj5Lku7bojrflj5blrqLmiLfnq6/lt6bkuIrop5LnmoTln47luILkv6Hmga/vvIzkvp3nhLblpLHotKXpu5jorqTnqb9jaXR5Q2Q6MzEwMDAwIOS7o+ihqOS4iua1t+W4glxyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50TG9jYXRpb25JbmZvID0gKGNhbGxiYWNrMikgPT4ge1xyXG4gICAgY29uc3QgdWkgPSBVUC5XLlVJO1xyXG4gICAgdWkuc2hvd0xvYWRpbmcoKTtcclxuICAgIGxldCBjYWxsYmFjayA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgdWkuZGlzbWlzcygpO1xyXG4gICAgICAgIGNhbGxiYWNrMihkYXRhKVxyXG4gICAgfVxyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYXBwLmdldEN1cnJlbnRMb2NhdGlvbkluZm8oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNtZDogXCIvXCIgKyBDT05GSUcuUkVTVC5nZXRDaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhdGg6IFwiaHR0cDovLzE3Mi4yMS4zMy41NjozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCIrQ09ORklHLlJFU1QuZ2V0Q2l0eSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogXCIyLjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBcIjJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCB0cnVlLCBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YS5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoTmF0aXZlRGF0YShjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hOYXRpdmVEYXRhKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaE5hdGl2ZURhdGEgPSAoY2FsbGJhY2spID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5blrqLmiLfnq6/kv6Hmga9cclxuICAgICAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICAgICAqIEBwYXJhbSBmYWlsXHJcbiAgICAgICAgICogQHBhcmFtIHR5cGUgMO+8muWfjuW4guS/oeaBr2NpdHlDZO+8mzHvvJrnu4/nuqzluqbvvJs177yaVXNlcklkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwLmZldGNoTmF0aXZlRGF0YSgwLCAoZGF0YSA9IHt9KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICBjaXR5Q2Q6IFwiMzEwMDAwXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgY29uc3Qgc2F2ZVBpY1RvTG9jYWwgPSAoY2FudmFzLCByZXNvbHZlKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciB1aSA9IFVQLlcuVUkgfHwge307XHJcbiAgICB2YXIgcGljVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zYXZlUGljVG9Mb2NhbCh7XHJcbiAgICAgICAgICAgIHVybDogcGljVXJsICYmIHBpY1VybC5zdWJzdHIoMjIpXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+aIkOWKn1xyXG4gICAgICAgICAgICAhIXJlc29sdmUgJiYgcmVzb2x2ZShcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgfSwgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoJ+ivt+WNh+e6p+WIsOacgOaWsOWuouaIt+errycsIGZ1bmN0aW9uICgpIHsgLy8g5Y675Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdZZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2NuL2FwcC9pZDYwMDI3MzkyOD9jb2RlPW5ld1llYXJBY3Rpdml0eSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW91aHVpLjk1NTE2LmNvbS9hcHAvYXBwL3NvZnR3YXJlL3VuaW9ucGF5LXdhbGxldC12Mi5hcGs/Y29kZT1uZXdZZWFyQWN0aXZpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5vcGVuQnJvd3Nlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5sb2dFdmVudCgndXBkYXRlX3NpZ25BY3QnLCAnTm8nKTtcclxuICAgICAgICAgICAgICAgIH0sICfpqazkuIrljYfnuqcnLCAn56iN5ZCO5YaN6K+0JywgJ+S/neWtmOWksei0pScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgISFyZXNvbHZlICYmIHJlc29sdmUoXCJmYWlsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlVGV4dENhbnZhc2UgPSAodGV4dCwgY29sb3IsIGxvbmcgPSA2ODQsIHNob3QgPSA2MCkgPT4ge1xyXG5cclxuICAgIGxldCByZW0ycHggPSAodmFsKSA9PiB7XHJcbiAgICAgICAgdmFyIGNXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgICAgIHJldHVybiB2YWwgKiBjV2lkdGggLyA3NTBcclxuICAgIH1cclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dENhbnZhcycpO1xyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIC8v6Kit572u55Wr5L2I55qE5a+s6auYXHJcbiAgICAvLyB2YXIgYmdXaWR0aCA9IHJlbTJweChsb25nKTtcclxuICAgIC8vIHZhciBiZ0hlaWdodCA9IHJlbTJweChzaG90KTtcclxuXHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHNob3QpO1xyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbG9uZyk7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgY3R4LnJvdGF0ZSgtOTAgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgIHZhciB0ZXh0ID0gdGV4dDtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XHJcbiAgICBsZXQgZm9udFNpemUgPSBzaG90O1xyXG4gICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB3aGlsZSAoY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoID4gbG9uZykge1xyXG4gICAgICAgIGZvbnRTaXplLS07XHJcbiAgICAgICAgY3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBBaXJhbCc7XHJcbiAgICB9XHJcbiAgICBjdHguZmlsbFRleHQodGV4dCwgLWxvbmcsIGZvbnRTaXplKTtcclxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOeUn+aIkOWbvueJh+W5tuS/neWtmOWIsOebuOWGjFxyXG4gKiBAcGFyYW0gYmd1cmwg6IOM5pmv5Zu+54mH55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVVUkwg5LqM57u056CB55qE5Zyw5Z2AXHJcbiAqIEBwYXJhbSBxcmNvZGVXZEFuZEhnIOS6jOe7tOeggeeahOWuveW6plxyXG4gKiBAcGFyYW0geFdpZHRoIOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpIg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5SGVpZ2h0IOS6jOe7tOeggei3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB0ZXh0YmdVUkwg5Yqg5YWl55S75biD55qE5Zu+54mH55qEVVJMXHJcbiAqIEBwYXJhbSB4VGV4dFdpZHRoIOWKoOWFpeeUu+W4g+eahOWbvueJh+i3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqIEBwYXJhbSB5VGV4dEhlaWdodCDliqDlhaXnlLvluIPnmoTlm77niYfot53nprvlt6bkuIrop5LnmoQg4oaTIOaWueWQkeeahOWBj+enu+mHj1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVDb252YXNBbmRTYXZlUGhvdG8gPSAoY2FudmFzT2JqLCByZXNvbHZlKSA9PiB7XHJcbiAgICBsZXQge2JndXJsLCBxcmNvZGVVUkwsIHFyY29kZVdkQW5kSGcsIHhXaWR0aCwgeUhlaWdodCwgdGV4dGJnVVJMLCB4VGV4dFdpZHRoLCB5VGV4dEhlaWdodH0gPSBjYW52YXNPYmo7XHJcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1vbkNhbnZhc1dyYXBwZXInKTtcclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk55S75biD5YaF5a65XHJcbiAgICAgKi9cclxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aFxyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLnNyYyA9IGJndXJsO1xyXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy/oqK3nva7nlavkvYjnmoTlr6zpq5hcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGltZy53aWR0aCk7XHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaW1nLmhlaWdodCk7XHJcblxyXG4gICAgICAgIC8v5Zyo55Wr5biD5LiK55Wr6IOM5pmv5ZyWXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG5cclxuICAgICAgICBpZiAoISF0ZXh0YmdVUkwpIHtcclxuICAgICAgICAgICAgbGV0IHRleHRVcmkgPSB0ZXh0YmdVUkw7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0SW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIHRleHRJbWcuc3JjID0gdGV4dFVyaTtcclxuICAgICAgICAgICAgdGV4dEltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRleHRJbWcsIHhUZXh0V2lkdGgsIHlUZXh0SGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuozntq3norzlnJbniYflpKflsI9cclxuICAgICAgICB2YXIgcXJjb2RlV2lkdGhBbmRIZWlnaHQgPSBxcmNvZGVXZEFuZEhnO1xyXG4gICAgICAgIC8v5riF6Zmk5LqM57u056CBXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB2YXIgcXJjb2RlID0gbmV3IFFSQ29kZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKSwge1xyXG4gICAgICAgICAgICB0ZXh0OiBxcmNvZGVVUkwsXHJcbiAgICAgICAgICAgIGhlaWdodDogcXJjb2RlV2lkdGhBbmRIZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoOiBxcmNvZGVXaWR0aEFuZEhlaWdodCxcclxuICAgICAgICAgICAgY29ycmVjdExldmVsOiBRUkNvZGUuQ29ycmVjdExldmVsLkxcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcXJjb2RlSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tb25RcmNvZGVcIikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xyXG4gICAgICAgIHFyY29kZUltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8v55Wr5LqM57at56K855qE5ZyW54mHXHJcbiAgICAgICAgICAgIGxldCBxcmNvZGVEeCA9IHhXaWR0aCwgcXJjb2RlRHkgPSB5SGVpZ2h0O1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHFyY29kZUltZywgcXJjb2RlRHgsIHFyY29kZUR5KTtcclxuICAgICAgICAgICAgLy8gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICBzYXZlUGljVG9Mb2NhbChjYW52YXMsIHJlc29sdmUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdC5qcyIsImNvbnN0IGNvbmZpZyA9IHtcclxuICAgIFJFU1Q6IHtcclxuICAgICAgICBhcHBseU1jYzogXCJjb2xsZWN0aW9uQ29kZS9hcHBseU1jY1wiLCAvLzIuNC4055Sz6K+35pS25qy+56CB5o6l5Y+jXHJcbiAgICAgICAgZ2V0TWNjQ2FyZExpc3Q6IFwiY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIiwgLy8yLjQuMuWVhuaIt+aUtuasvueggeWNoeWIl+ihqOaOpeWPo1xyXG4gICAgICAgIGFwcGx5TWF0OiBcImNvbGxlY3Rpb25Db2RlL2FwcGx5TWF0XCIsIC8v55Sz6K+354mp5paZ5o6l5Y+jXHJcbiAgICAgICAgZ2V0TWNobnRBbmRBcmVhSW5mOiBcIm1jaG50L2dldE1jaG50QW5kQXJlYUluZi5zanNvblwiLCAvL+WVhuaIt+exu+Wei+WPiuWcsOWMuuWIl+ihqOafpeivolxyXG4gICAgICAgIHVwZ3JhZGVNY2M6IFwiY29sbGVjdGlvbkNvZGUvdXBncmFkZU1jY1wiLCAvLzIuNC425Y2H57qn5pS25qy+56CB5o6l5Y+jLFxyXG4gICAgICAgIGdldEFkZHJMaXN0OiBcImFkZHJlc3MvZ2V0QWRkckxpc3RcIiAsIC8vMi40LjEzIOiOt+WPluaUtui0p+WcsOWdgOWIl+ihqFxyXG4gICAgICAgIGRlbGV0ZUFkZHJlc3M6IFwiYWRkcmVzcy9kZWxldGVBZGRyZXNzXCIgLCAvLzIuNC4xMiDliKDpmaTmlLbotKflnLDlnYBcclxuICAgICAgICBlZGl0QWRkcmVzczogXCJhZGRyZXNzL2VkaXRBZGRyZXNzXCIsIC8vMi40LjExIOS/ruaUueaUtui0p+WcsOWdgCxcclxuICAgICAgICBuZXdBZGRyZXNzOiBcImFkZHJlc3MvbmV3QWRkcmVzc1wiLCAvLzIuNC4xMCDmlrDlop7mlLbotKflnLDlnYBcclxuICAgICAgICBtY2hudE9wZXIgOlwibWNobnQvbWNobnRPcGVyXCIsIC8vMi4yLjIg5bqX6ZO65L+h5oGv5pu05pawXHJcbiAgICAgICAgZ2V0TGltaXRBdEluZm86XCJtY2hudC9nZXRMaW1pdEF0SW5mb1wiLCAvL+iOt+WPluaUtuasvumZkOminVxyXG4gICAgICAgIHNldE1jY09uT2ZmOlwiY29sbGVjdGlvbkNvZGUvc2V0TWNjT25PZmZcIiwgLy/lgZzmraLlkozlkK/nlKjku5jmrL7noIHlgJ/lj6NcclxuICAgICAgICBnZXRNY2hudERldGFpbDpcIm1jaG50L21jaG50RGV0YWlsXCIsIC8vMi4yLjEg6I635Y+W5bqX6ZO66K+m5oOF6aG16Z2iXHJcbiAgICAgICAgLy8gdXBncmFkZU1jYzogXCJjb2xsZWN0aW9uQ29kZS91cGdyYWRlTWNjXCIsIC8vMi40LjbljYfnuqfmlLbmrL7noIHmjqXlj6NcclxuICAgICAgICBnZXRUb2RheVRyYW5zOlwidHJhbi9nZXRUb2RheVRyYW5zXCIsLy8yLjEuMy8v5LuK5pel6K6i5Y2V5o6l5Y+jXHJcbiAgICAgICAgZ2V0VG9kYXlJbmNvbWU6XCJ0cmFuL2dldFRvZGF5SW5jb21lXCIsLy8yLjEuMeWVhuaIt+acjeWKoemmlumhteS7iuaXpeaUtuasvuaOpeWPo35+fn5+fn5+XHJcbiAgICAgICAgZ2V0SGlzdG9yeUluY29tZTpcInRyYW4vZ2V0SGlzdG9yeUluY29tZVwiLC8vMi4xLjLljoblj7LmlLbmrL7mjqXlj6NcclxuICAgICAgICBnZXRIaXN0b3J5VHJhbnM6XCJ0cmFuL2dldEhpc3RvcnlUcmFuc1wiLC8vMi4xLjTljoblj7LorqLljZXmjqXlj6NcclxuICAgICAgICBnZXRMb2dpc3RpY3NTdDpcIm1hdGVyaWVsL2dldExvZ2lzdGljc1N0XCIsLy8yLjMuM+eJqea1geivpuaDheaOpeWPo+afpeivolxyXG4gICAgICAgIGdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW06XCJ0cmFuL2dldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW1cIiwvLzIuMS415Y2V56yU6K6i5Y2V5p+l6K+i5o6l5Y+jXHJcbiAgICAgICAgZ2V0QXVkaXRJbmZvOlwiY29sbGVjdGlvbkNvZGUvZ2V0QXVkaXRJbmZvXCIsLy8yLjQuMTTkv6HnlKjljaHljYfnuqflrqHmoLjnu5Pmnpzmn6Xor6JcclxuICAgICAgICB1cGRhdGVNY2NDYXJkOlwiY29sbGVjdGlvbkNvZGUvdXBkYXRlTWNjQ2FyZFwiLC8vMi40Ljnmm7TmjaLmlLbmrL7ljaHmjqXlj6NcclxuICAgICAgICBnZXRVcGdyYWRlU3Q6XCJtY2hudC9nZXRVcGdyYWRlU3RcIiwvL+afpeivouWVhuaIt+aYr+WQpuWNh+e6p+S/oeeUqOWNoeaUtuasvlxyXG4gICAgICAgIGdldE1jY1RyYW5zTnVtOidjb2xsZWN0aW9uQ29kZS9nZXRNY2NUcmFuc051bScsLy/ojrflj5bosIPlj5bmlK/ku5jmjqfku7bnmoRUTuWPt1xyXG4gICAgICAgIGdldE1hdGVyaWVsSW5mb0xpc3Q6XCJjb2xsZWN0aW9uQ29kZS9nZXRNYXRlcmllbEluZm9MaXN0XCIsLy8yLjQuM+eJqeaWmeS/oeaBr+WIl+ihqOaOpeWPo1xyXG4gICAgICAgIHVzZXJJbmZvOlwiL2FwcC9pbkFwcC91c2VyL2dldFwiLC8v6I635Y+W55So5oi35L+h5oGvXHJcbiAgICAgICAgaXNCbGFjazpcInNjYW4vaXNCbGFja1wiLC8vMi4xLjXmlLbpk7blkZjmmK/lkKblnKjpu5HlkI3ljZVcclxuICAgICAgICBpc0FwcGx5Olwic2Nhbi9pc0FwcGx5XCIsLy8yLjEuNOaYr+WQpuW3sue7j+eUs+ivt+e6ouWMheeggVxyXG4gICAgICAgIHNoYXJlTGluazpcInNjYW4vc2hhcmVMaW5rXCIsLy8yLjEuNueUn+aIkOe6ouWMheeggemTvuaOpVxyXG4gICAgICAgIHJlY21kUmVjb3JkOlwic2Nhbi9yZWNtZFJlY29yZFwiLC8v5o6o6I2Q5YWz57O76K6w5b2VXHJcbiAgICAgICAgZ2V0TG9naXN0aWNzTGlzdDpcIm1hdGVyaWVsL2dldExvZ2lzdGljc0xpc3RcIiwvL+iOt+WPlueJqeaWmeWOhuWPsuiuouWNlVxyXG4gICAgICAgIGdldFJld2FyZExpc3Q6XCJzY2FuL2dldFJld2FyZExpc3RcIiwvLzIuMS435p+l6K+i5pS26ZO25ZGY6LWP6YeR5piO57uG6K6w5b2VXHJcbiAgICAgICAgZ2V0UHJvdG9jb2xJbmZvOlwiY29sbGVjdGlvbkNvZGUvZ2V0UHJvdG9jb2xJbmZvXCIsLy/llYbmiLfljYfnuqfmn6Xor6LmmL7npLrljY/orq7nmoTlkI3np7DlkozljY/orq7nmoTlnLDlnYBcclxuICAgICAgICBnZXRDaXR5OlwicmVnaW9uL2dldENpdHlcIiwvL+mAmui/h0lQ5Zyw5Z2A6I635Y+W5Zyw5Z2A5a6a5L2NXHJcbiAgICAgICAgZ2V0UXJVcmw6XCJjb2xsZWN0aW9uQ29kZS9nZXRRckluZm9cIi8vMi4xLjHojrflj5bnlKjmiLfmlLbmrL7noIFVUkxcclxuICAgIH0sXHJcbiAgICBTVEFUVVNDT0RFOiB7XHJcbiAgICAgICAgU1VDQ0VTUzpcIjAwXCJcclxuICAgIH0sXHJcbiAgICBDT05TVF9EQVRBOntcclxuICAgICAgICBpbWdlU2l6ZTpcIjMwMFwiXHJcbiAgICB9LFxyXG4gICAgQ0FDSEVLRVk6e1xyXG4gICAgICAgIGdldE1jY0NhcmRMaXN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtY29sbGVjdGlvbkNvZGUvZ2V0TWNjQ2FyZExpc3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1jb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBVcGRhdGVDcmVkaXRDb2xsZWN0TW9uZXlTdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLW1jaG50L2dldFVwZ3JhZGVTdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLW1jaG50L2dldFVwZ3JhZGVTdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRNY2hudERldGFpbDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLW1jaG50L21jaG50RGV0YWlsXCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtbWNobnQvbWNobnREZXRhaWxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNBcHBseTp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLXNjYW4vaXNBcHBseVwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLXNjYW4vaXNBcHBseVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRBZGRyTGlzdDp7XHJcbiAgICAgICAgICAgIHJvbGxLZXk6XCJ4dnNoLWFkZHJlc3MvZ2V0QWRkckxpc3RcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1hZGRyZXNzL2dldEFkZHJMaXN0XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3V0aWwvY29uZmlnLmpzIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS10cnlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdQcm9taXNlJywgeyAndHJ5JzogZnVuY3Rpb24gKGNhbGxiYWNrZm4pIHtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZih0aGlzKTtcbiAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oY2FsbGJhY2tmbik7XG4gIChyZXN1bHQuZSA/IHByb21pc2VDYXBhYmlsaXR5LnJlamVjdCA6IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmUpKHJlc3VsdC52KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA4ZTBjMWRiMDAwODVjOGFkMjU1YVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA5NzNjYzhlZWZjNTk5MzFkZTk1ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaW52b2tlID0gcmVxdWlyZSgnLi9faW52b2tlJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4vX2h0bWwnKTtcbnZhciBjZWwgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHNldFRhc2sgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xudmFyIGNsZWFyVGFzayA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBNZXNzYWdlQ2hhbm5lbCA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbDtcbnZhciBEaXNwYXRjaCA9IGdsb2JhbC5EaXNwYXRjaDtcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgaWYgKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spIHtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCkge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gYWE5NjNiNGMyNzE0NGYwOTRjY2Fcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBZ29BQUFJS0NBTUFBQUIxSDVkbkFBQUMrbEJNVkVVQUFBRGo0K1BpNHVMaTR1TC8vLy9wNmVueDhmSHQ3ZTNuNStmcDZlbmIyOXZ3OFBEczdPeTB0TFRpNHVMbTV1Ymk0dUxuNStmbDVlWG01dWJtNXVibjUrZTd1N3Q0ZUhpMHRMVGg0ZUhuNStmbTV1Ym01dWJuNStmbjUrZm82T2h4Y1hIQXdNRGg0ZUhuNStlMHRMVGk0dUxsNWVYbjUrZm01dWJuNStmcDZlbmk0dUxoNGVIbjUrZmw1ZVZ3Y0hEaDRlSGg0ZUhuNStmbjUrZm41K2ZuNStmbjUrZTB0TFMydHJibTV1Ym41K2ZuNStlMHRMVGk0dUxuNStmaTR1SzB0TFMxdGJYbjUrZDBkSFRoNGVHMHRMVFIwZEhoNGVHMXRiWGw1ZVcydHJhMXRiWG82T2kxdGJWdWJtN3A2ZW5uNStmbjUrZmk0dUswdExUaTR1TFYxZFcwdExUbjUrZmg0ZUcwdExTMXRiWG82T2kwdExTM3Q3ZTZ1cnE2dXJyWDE5ZTB0TFMwdExTMHRMUzB0TFM0dUxpM3Q3ZTZ1cnJWMWRXMHRMVG41K2ZtNXVhMHRMVGk0dUxpNHVMbjUrZmk0dUswdExTMXRiWG41K2UxdGJXMXRiWG01dWFibTV1S2lvcnI2K3UwdExUbjUrZm01dWJuNStmaTR1TFcxdGEwdExUT3pzN2k0dUxpNHVMUjBkSG41K2ZpNHVLMHRMVGk0dUxuNStlMXRiWHA2ZW5sNWVYbzZPalgxOWZuNStmUzB0TG01dWEwdExUVjFkWGMzTnpiMjl2aDRlSGEydHEwdExTMHRMVGk0dUxuNStlMHRMVGk0dUswdExTMHRMVHE2dXExdGJXMHRMVG01dWEzdDdkeWNuTEt5c3JKeWNubjUrZkt5c3JtNXVibjUrZm01dWJMeTh2WDE5ZmQzZDNtNXViaTR1S3pzN1BVMU5UaTR1TGk0dUxEdzhPMHRMVFQwOVBpNHVLM3Q3ZnI2K3UxdGJYVzF0Yk16TXkwdExUTXpNelEwTkRIeDhmSHg4Zms1T1MzdDdmVTFOVGEydHJNek16SnljbS92Ny9vNk9pbHBhWEp5Y25JeU1pMnRyYVltSmpsNWVYSnljbnY3Ky9oNGVIbTV1YlB6OC9iMjl2TnpjM1UxTlRXMXRhenM3UEp5Y25YMTlmMTlmWFMwdEszdDdmZTN0N2s1T1RhMnRyZzRPRFoyZG5GeGNXNnVycmQzZDIwdExUS3lzcS92Ny95OHZMVDA5UHM3T3puNStmcDZlblIwZEgwOVBUcjYrdnU3dTd4OGZHMnRyYkJ3Y0c5dmIyNXVibm82T2pIeDhlOHZMeSt2cjdKUGJTeUFBQUEwM1JTVGxNQUNmY0JCZ1FLRC9JVkJRSU4rdTFXL0hwZWRXWmlEd24xOFlWQytheEpIaE1NenNlbWNFMDVOQ2tZOU9TS1BnWG8zOEcwbVpCL2FrUWwrK2JleEtPZmlsUkZIL3Jtd2IyZ2wwNUtNQzhiRXYzZzJ0UEp4OFc2dFoxeWJVQTZIUmJyMTd1dld5Y2pFK1hhMTgvQXNhbWRnMzUzY1c1Z1dpOG1HKzdjMmRQUnpzbkh1cmV4c0thWWxHcGxUeXdqKy9yNTcrdmQydGpYMXMyMXJLaVRpb0o2UERZcUlSb08vZmYyN3V6cTQrTGczZHJUMGI2UWZtcnc3Y0F6SmgvMjE5RFBwWVYxVWlIejBKQnhXVkkzZlhjNEd2dE1qMFYrd2dBQUlDOUpSRUZVZU5yczNidHFLbEVVQnVBVmdzMkVhWWRwQmQvQktTeTBFQ1JpSlFpS0Y3eEZCQnZGTkZaMkFjdFVDaEpSOGdRMmdVTWdWZXJ6QVA4VCtCWW4zdmNrT1NFSkV6TzYvNitkVHJaeldmdGZhd3NSRVJFUkVSRVJFUkVSRVJFUkVSRVJFUkVSRVJFUkVSRVJFUkVSRVJFUjBWcmpPdXdJVVRGaEFwZy9DdW5OaXRwWWFWcENHak02UFd3TmhQUlY3R012SktTdkRMZ1VhTW1CS2l5a3JSd1VrVE1oYllXeFZ5NEs2YXVPcmR1dUlhU0g4M295VnBUWHhsaXg3NEpDT21nazcwWTlBR2JJRURjamFnTG1UVWxJQjZrcWRrYnlXaVB2OEhWUkUzOGVvUGdycEswTVZHMGhYVDNENVU1SVZ6TzRKSVZPWHpCMlU2M1dBdUxXTUtGSUI0Uk9YRDFYTWJGVXNjUXRoTDMwdmRCcFN6NWhaeXh1alNGV0Z1WHM1Ym5RYWF0QllWcmlGZ3kzTXRXSnc0eVNCaG8yVkhVaFhkWGc4aXlrcXk1VVF5RnRYVUpoVDRXMFpUU3hreWtJYWF4d2l5V3oxVWtKYWNOeVpvYTg5aGdkWnJJeGZpN3FwRkFCRUxrVTBwelR3bHBlU0dkT0JsdE5JWDBGb2xBd3FLNnhNRlF6SVczRm9iRFp0S0F2aTdFMFdndWEyRXZ3cHFDekZyYm1MQ3ZvTFdWanBjOG9rdmJ5YVdEUlltS1pSQUl6aDcyTlJFUzZNeDQ1VUpOZUdKTmJJTzJJOTR5cmFmSTZGMjNIREhucnZqYnB4Z3JQN0xIM2ovc01sc3hMOGRoVjFjWkdPU1d2ZGJjWGUxVldMdnpoYnh4cmtZQjRLdFhEWHNRU3R4Z3IyMzR6TUxGVkVFKzFQcHpTbUlhS3VlbmZOLzZ4RHZnU1hFSWZYazBJL2JJYzloWkYrWmFBTTI3YThadUd1S1hnY2lNdVozQ3BDUDB1dzhiZVNMN0JTR1p2c1JLNWY3TzVxUnFJV3htYzkrd25lZXlsTGZteTg4RXRkckxpRnZwdzZNWWxWSmZpRnNqMWU1a09wenNlVGdFN0kwdStyZzJGZVNFdVZoazdsWks4VnJQL3Y0b0NMU3pGdzB4S0hJYmFIeCs5a0srN2drdEozTTQ2cmZKVEpUUnVEK3J5RGl0Mmx4MDl4V0Uyd3dGeG0yQWpVdU1lK1lIY1ljV09lWkNGN1JueUhSZnkxaHc3OHo5Q1Awdk51R2RtOGkwVHFHN0VNeWIySHRpaGV5RDFjTTZSYjRwQk1RK0taOHBROUlWOFQybXZqM2ZPeER0dHFLNkVmRzhheDFJa1dqZ1hMeGw5S1BpMmNBeEtuVkdvblJMUEdWRVRXMlpEeUZkU3VVRktEcWVZWUNYU242WjlBSXVRSVljenEySnB5SkVlZmxMS0xuNWpCekUxemxUQ1REbjVTQ0Qzd1BaNmVsRWFZdTlhU0Z0R0U0cWFrTGF1b1RCWjdqa2h3V2pjakxlRDhsa0pLTEpDSjhQcVk2bDFKcDhVd2w2VytZRVQwc1phNStzUGlDYjdxazlLSEd0cCthUmdFeXNQSGQ0U1Rrb0pHM0g1ckdJYWdKbmdPVkFuSm8rTnNuemF1ZE1OKzJFaFhPV25qTGQ1cDRhTnFoeVpZaFZBaERPR3ZhOFMzTWh4Q2M2eFpISXRlQ1dNamJFY2x5N1dNa0xlL3FLSXluR3A4Tmd5aitXd01aSGpVdUdHbU1jY2JNVGtQNmJkc0IvUEFVcXc5dTB4STRLVmVGRGUxYWppUmNKLzNZbzViS1NGdkZHdzhjSk95cnVDUTcvKzlmTFlzQytFdkZGTXBDT0p1cnpMcVBqMmVHRUxXeHdtZHdEbkNSK25sU0xnU1ZhSEUvVnpXaW5FRHBuREdXQm40YnNIeEs1ay9zQXcvSSt6ZW9DUHk5TEJNbGJhUWovdEdqdEQvMzFNL21Qdi9sL2FPT000Z0QvR3FJZ2xEYTRkQkdFeW1iWitvZWh2SzB4a1JTWmpIUVZ4SVB0cCsyRmp2eWl5amNMMlE4ZGE2R1JzSUZ1clRDajdvV05qUDZ4anRJWHVsMjJNc2YwQmZuanVMaytDQ1luUk16Z0lqRVRSd1hhNXUvZ2thbnpPM0QzUHhUd3ZKZHpqbFZicU8vZDg3dms4aVFpOS9XdHhsVlRlUUhqdmEySjd3Wi92L3QvOHl1dnZ5MjIyUEx4SUxGL0kvKzhHOS9RWDFocU9MTkViM3ZQRkY3Si9LTy9iSmZUV2MyKys4SW1jSFJwZWM1TjBpQ0JxS0FQblo2ZUd3aUFkSm5TckM1MStyNzc0eXJPbytld1VTRlhkTyswYnJiLzV5cmhkK0wwSHBPUDBvbFBOZmhlMFRaQ09Fem5kRmNPbmhNZ3NzRHJkNWNKelJHYUIyVm5rQngvMExrOUd4a00zeHE2M2VoUUZvb0xrKzZ0Q1I5OEVOV1BOdHlQM3ZFdjJyWUpVVFVoNHJkRFdPd2xsSXVlUmErN25TVWtpQ2Y2Mm9XbEpFS2NUaVhYNVVRUU9HSE1ybndPTGNaMlVhT0JuNll4T1NGNEZVZWFSVUYwemNLaGJyUzRsQVVEVDY2TmFTQmZFZnBNdk55TnhXcy85QkVjWmJVTzFheS8rL1pwZUYxZUZYWkhUbU5na2ROOExRUlUzQmx4S0FwV0ZkUjhYQ3ptUjA1alFKRnlZRFVOMWsvZHJUNEpsSzA5TUdmQ3J1QzQwQ21PaWtoRHNaR2tKRFBmWG5BVGJOakhsd2FlUzY4U21LOENadUNRTVBCNEdKcUdMdFNUaEJwU2tkV0pKZ3o5bFNFa0d1QnZyUUNKY0hCc0hWb05kNktTdVVVbUFLTEhvNEU4S0tkbEpBbCtDa3RCeWRoU2NDUHpoUmhKQUpaWnQ4Q2VOMlBRMTRFdE1FcTQ5TlFRT2hUdFA5aS8xQUMxRGZGNDJSb2t0QjN3SlNjSm5Md2ZnQkhxUmMyMDlVR2I3c0RXbTVHWW1zK3FUMmlHcEU5TXU4TVU3Q1hURHlibTVtcE1BT3JIRW9VUkxrUDhsVkg4c05XQlNsT1VlemRzdGlLdTIzaEU0dWZubTJwS3dId1U5Q1RZbFFVejVUVitFQWVlTitTc0pYSEZQd3VWSGd6eS8zN1lwcUxST1RGa29VVW1KN292V1JETE92U3ZKT1FuTlY2YWhadE5OTlNVQk1ERmhLQ2tZWTc5WGsxNmI1WmlFMW5PTDRJYlJ0bHFTQU9uTWdaLzRMcUZGb1JGeFNBTGRjSEpKVDd2ekpOQnloZTJDQnBRdFF0dUZCc1F2Q1plV3crQ2V5VzdHSkxBcUVFb0IrRW9ySU53eWh5UlFEU2NYRFRFMHA4Nk1BclAwTGhHMEF6YU5zenJSTTBrUWlGc1MycWlHazJ0Q1YxMUlBaTJWMFFVMEErT1pQQ25hVG9OQXkwSEVRK2N3ZUNGeXlZMGswSlJkdlppRUhCeVFTaVhCQTlxZVB6Ymp6L0JKd2h4NEpORG5TaEpvRzJwMk81T0NTcmtkWTg5VFpuVUQzS1VTU2hhRTRKaUVwOEF6NGV2b1NLMmo0QnBNYk91YmJxWWhwUlBLRHZER09RbjNBK0NoM2lPVDhETzRKcDBnK3hJcGNNMG1vUldBTTg1SlFMUGdxY2ZlSndFMFFsc0hsNWpOY3ZHdnlwam1sSVNtUWZEV28yYXZrd0NyNUppbHlKU214WTh1SzVQUm5McWJ5V1l6Y1NoalhoV0V2NXlYVnhMUUZmRGFXTXZCL0UyQW14UlNCa081dFgrSktaL0ZjSUJTT1BJbE9IU3RrSTJDR0xlQ2lKUHo0TG1ab0JkSm9HVUpiUXZLYkNTcTNRVW9pV3B6Z0dyVkg1c0tpTUExQ2FnWHZEZHhwandKTjhGbHlUMXk5SXR1TTRTbVFybE05Y3BReStaM0Nob0ljN01KY2RNSkhFeGQ4eUlKTkp6TkU1TytDdVYyQ0cwUHl1VXJTazUvNFprRTFBODhMSDVBSjhFYmNiV1FJR1JiZ3pLVlVkQ2hUSm9VK1hTSE5kY2tvSTVoNEdIa01qSUZid0dyVkNhUktNVEJpV1FhRHNoV2VkNmJHNmI4c2JaODBNU3hTYWkvWXVGL3cxZWRKaUdhZDJkM2VaVFFZbEJPSlpROVgyeWJGSlVFMURRQ1hFUXVPRXNDckx2MW1oTlZwMmFBSkpTaDZrYnhmZWh5RTYySXQvNEljQkY0QmdXbmdWblV2ZmxiVVF2WnZaMDhJWWxZR2c3UWpOV2xtTG9WOTFVUTRPZFd4TjhsVGxrWXZ6NGJZTGRBYkdyQUpZT0Ira0ZkRTNpNk9nd2NERDc4QlRzUW96YTc0MGJ6WkNuUWk0VDRmQVM4OXVQRDcyT2IySWs4c2Ezanh2Smw4Y2N4aDRRWXVBRmVDci8yOGJleG1NTW9aRWpKTG00Y0Mwc2hNTTEzSUJIYVJzRXp3dzkvaUJWdFlrZTJpVzBQTjRvbmQ4YWg1SFlRaWRBMEE5NzQ2Nlh2WWdiblVkaS9DZHpCamVITElTaHpxd21KMERJRzdodDgrRnRzM3laMkp0TlFWNFdGcFVHb05OcUdSR2krQnk0YmVlbjdHRzBUTzdST1RCbDg2cjN6WXhnT2N2NFdpSDdjOEJyK3lDZ1ZhNHVDbWlDR2JYemFMUTNERVNhN2tSQ2RZWEJKeUM0Vm5VZUJwbVoxUFpFNTVlc0tmOTROd05HRytwRVFmUUZ3dzEyN1ZLeU1nblRBZ3hHb0xuUVJDWEVoQkxVS3ZHYVVpaklLVEpZaURMVjNGeExpczJFWFNrVVpCUVBUSWdLTFFCOFM0djRrbkZ5eFZKUlJNTEFzSXJBS2R5SWgybnRxS2hWbEZERHpJZ0s3WGlSRTI4U0pTMFVaQlNaUHFFVUVCZ0tiVThGbDU2WGlMN0ZZVEVhQnlkMFFPQ0cyT2RYeE1qZ3haSlNLbktLZ0ZoTDZUaDJ2TkN6Y0NZQVR3cHRUYUE2WS9XV1Vpcnlpb0s0VFE2Sk9sNkxmR1lHVG0yNUNRdlFDazhoTFZLbklJUXBaWWxtdnY5a21kemNDVHZpbE9ZV3VqOE94N254TWxZcGNvcEFuSmYvVzF5enhwMUVxMXFpbkhRbHhaUkNxR3FkS1JXNVJJSlNkT3NyQ2d5Rnd3bS9OcVFzaGhsS1IrMVdCa3NYMVllSHVJRGpodytaVS81RlIvdXMzcWxUa1d5dFFkRndQbm95RXdRR2ZOcWU2RitFUWtkZW9VcEZ6Rk5RZFFxbURHZUpCQ053VkVkU2N1amJGV0NyeVcxZkkxdEZWWVlIcU43SHdkWE9xOVdiRjFpU3FWT1FZQmRybU9ySDhpMzN0alNGd3d2Zk5xZUFzVmJOOC9IK3BLRHdLR0Z0dnRadnc5Znp3SUFKTzFFTnpxbU1lVEV0R3FlaUxLR0Mxc0tNbnNqNU9ndE5GaERwcFRxSEhwVkxSTDFId3VYZUd3V3Z6elVpSWN6OGFwYUtNQXBQVk93SGc0SFlMRWlBNEF4S3IxQnJ3SUtZNUZad0dpVlZjVmVQQWc0am1WTk5Oa0ZocFdGVnhGSGpnMzV4cW5RQ0pqWlVFVmRXQUI5N05xVE9qSUxIYU1wT0FWUzBOWEF4OWpyaHBtd0tKVVhKTHhhb0piM0hLd3VRWnhNbTFIcEFZSlhQWUNBRldqUTgxeHlrTFR5RSsybStBeENpSlZUTUUxaHl4bWdRZWVoQVhBeitCeE1SS2dwVUc4eWpISlF1RGlJZUJSWkFZYmRnWEJPTURtd2VZUnhaQ2lJUHVTWkFZYlpqWEJDc0VLallQOEFaNGJnWjU3LzRJU0l3VUt3bDJuV0FvemhZS2VLMExlZTd6SVpBWXBWUXJCWmo2Tk1kZVorRVI4bHovTUVpTTRxcFZNdG9YQlhxY0FnOUZlbEUxdm5pL2pVWVNwOHBGNjRNZXI0RlhSdDdqMEkrNkdnS0pVZFFxRSt3UXFKWGpPSGppNXo5YWtQY3V5aVN3U210Mm1XQS9ZR3BzUG5pUWhjRFlWY1REaFFoSWJOSWFmUkV3aml2SHhvTUc3aHArektrN2ZXa1FKRGJKVmJza3NPNFpyQkU5VnJITGpjcXBzMEhFUjVkTUFxdGt6dmloMDFQRG9XTTNHNVhqdHk4aVhxNEVRR0pCSjRFdUZDdkcxdWRXRWx3UW1odEF4L0xadTdrMkFyTVZTWDhZWStwcjFMRXJqY3FlemlEaTU0OXhrTmhzMkhWaHFUVnRIQjQ5cnJFNUZWNitoSGc2R3dhSmpXSS82YWtHbFAwVmVteDlFZGZXbkFyZDYwWnNmUGUrNzZlZXNsOFhHby8yRWFidUlUSDFXTnQxWWZGY0srTHJ2RXdDcXpWVnJkeWZZRjhRMHBvOXBzb0k2N3dDSnpCOXBSbHhkZzRrUm5HOFh4bFdMREVtVnhTTkdsUG5UNVNGd2ZuTGlGMTkvWmJ5MHlDdVZzd0I5dGhJd29xaVJQZkg5SG5qSUFWT2pQUzJJUWY4K0x1Q1RyZW85ZU8xeXdScWY4TEdpaEVGSllvcnp1K1AxNERaUkY4SEV1QXhTR3pTbXIzQVREMzNyUU5seFl5Q0VyZVhHdW56NWxFYzJLeDlob1NZQTRsTmVndXJCcnN1cEt2RzFJcEJNYk5RZWQ0Y00yWWhHY2NZQ1hFUEpEYnBWZFc4NWxQM0RQWXljM3lsU0xHelFKK245ek5FNFJnYnhjNDNFdUVSU0d6U09WeXhQMkYvSFArSGpvS1NzZ053Y0QrREJsV2tVem56anlJVzhwb2doUDFhT1BvcHZuL1hHRFdTWUZBc3FWenBQSjBKNDJHcjJzeGczM0lnL3ZwQVlrMkNXckUvWVgrcy9iMWlVV3lwVmVvOHZaL2h5S2IxaGxhYWVVVFVDczN5OVE3L3NYTUdPMjdDUUJpbTkzMkdYbnZydy9SQitySVR6VytRRU5vUXBGeG9nOUpUVDVVM01qc2VqTEY2Q0k3TVJ4VDhhOE8vMG1vVUkrYmZTUVIrbkZuZURJaEtJSHdTempPc05Tb3h6djc3ZkN0OE94MGtBWmsvVUhtRThSZk5RREF1UGovWEE5UXRRc3VlZjNJcEhNK2JuNFJ1UmVyamNlcnU5QWtrdGNvdmlFeERmUlZiVDhORysxZHBIQStjbjAxdlZENUI2T2xPQW5qVTh2UDJKWFRYNHYxeXVsemIwZmZiYTRQNGVqcllaakNxQVNYL2cvNUdFdmcwYzBPSy9meUNYVWsvbzRxbWVqcHZSM0FwcmUyZzV5YzQzZDNJQTRxV2RYN0JtU2cvbFcrb0Vqa2VPaitSeXlpNkRmeXhFcWZmNUFOTkt6dldZaUg4aFArT0cwVDE1WmkzRkFlVG01ZXd6Q2NzSzRFUXFBVy9lb3pXUWY5cUI5Nk9hYTBScmlPYjFmd0Jtek5wc0dTWUd4RmlUeEE2NkYvdHd2ZWZQNDQ3aGlYdlZ6VHp2QVQ3dHN3Zm5Ha0JBZ3dxdjJCWFFnZjlxenh4cGVvcXRrUXRkM1MzT05NU2hPZzdZOXoxT3U4UTlzKzNGSFIvdmtCdFYvN1BUeFFBWVRydmVyUHRYK1dKVWYzNVE5dkZoVUpnaFZGY3oxdisrVzRRTEpvdjdpaE5zNTZzOGs1QnNFYnRyamR1c2U2ZjhRYkJ4cWorUEJlbVhmUEFhUWFGUWFRV25LYzl4LzJ6L1ZaUTh3SzRSTTIrQnEyQVdDMmsvNzVzN3hXTW5oOVFsbWJEU3ZlMEJpTFU4L1ZSLzV6dkZYUi92a0J0UEQzUUtvalJSdngzenlza29lY0ZGS2hsY29uYlA3UUtvclNyL3Z2bkZaTFE4d0tLMUhiOTBMRktJTVFaV09jWHducXE4a1RQQ3loTnM0d2gyU0JqQkd6V1FqaS9JTFVaVzFSNVl1VDhBTHN1VEJ1Wko0aFhBbUc3RmxUNlJma2JIZ2NnMjFKUUEydkwwakpkWW15a05RbzI2VjBKQlAyNTZZRjhTMEhQQ3loVGY3eVBkNHFEYmZyTzgyZmhQN1VBY2k0RjNVOHZUN3ZxNk82MEFWTG9ndk1adUI2QTNFdEJ6d3NvVUgrY3BodHRnU1RxMlg5dVdYY05nUHhMUWZ4eDdMbEEvWkEzMmdScE5LTGRZUDJuRm5pTlV0RHh6dkswZmYybGJaQklQNG9iaG5vQVhxUVUyTWluNUZ5ZVpoRnVqb05rK21hMHZsUGQ5c0NybElLTTNMaWpQSDJtRlBBL3ZFNHAvR1BuamxVWWhtRW9pdjcvOTcxUTBrTGVVRG9LUWgyOEZ6ZEtoMmJMcW5zbmF6K1RMVHpmenUvMTVlYW5vTUMrd2poT2dnTDdDbU9lQkFYMkZjWWw0Q29vMU41WHlPT3lDUXExOXhWMkRJOVZna0kyLy8wSFVHWiszNWZYSmtIaGx3Z0tVSUFDRktBQUJTaEFBUXBRZ0FJVUpDaEFJWU1DRkRJb1FDR0RBaFF5S0VBaGd3SVVyaFpRb0cvZEhRbzBhbTVRSUVuZGRvY0NTYzEyZ3dJcFBBb29VUE9vUWFGODRiMkFRdlY4QklYaWhZOENDaDkyN202M1VSZ0l3L0JLZS85WFo2OElTQjRJaFJBcHc0OEFuM0MwcW9UYTFMR3JCbEE3bGIvbkFqSW5yd2kyZ2JqUk82UVFOYVozakJSaVJ2ZVFRc1NZN2pGU2lOZEk5MGFrRUMybWp4Z3B4SXBjU0NGU1RDNkxGT0kwa210RUNuR2lSMGdoU2t5UEdDbnNwRSszcHJtZHRBb1NPSTU4a01JdS9hVllYWG9WSUc4Y2t3OGpoUjEwVTd4cHRQS1RONDc4a01KMmZWUGNhWHJsSlc2Y0pUK0xGRGE3RkI5Y2xKZTRjVXgrakJTMjBvVkRLeDl4NHlnRUtXeDFLaHduNVNOdG5LVVFpeFEydWhXT20vS1JObzRwaEpIQ1JrM2hhSlNQdEhFamhZeElBU2tnQlJsWDdHOGVSMkZJSWE3YlJsd1ZzSmpFYlNPMm1KQUNOcDZ4cjREaktPdzI0cEFhWnhCNGRHWC9HbUxFSVhWOExQbFlwQkFoUE51SUZNSXRNSjU0anBSMTNwbTBlRHNxWHZpK0FsSjRZNWxIR3BrdHZzVUUrUEk3SUFXa2dCU1FBbEpBQ2tnQktTQUZwSUFVa0lKU1NBRXBySkFDVWxnaEJhU3dRZ3BJWVlVVWZrMEtVMS9xYzFLYkxFdmJObS9UekpnNk9ldHltWlJNU09GNFhhK3ZwczNEVEtMN1RrbURGSTQxbEVtYWYwbWFsSU9TQkNrY1p3cG5FTTVCenQ4RlVqaElwMDIraWRGQ2FrQUtQOUtCVzRPRU93ZWtzTisvbDl3ak5hL3JoWDZZcG02ZTFkeDF3N0M4cmlsTW1udlVwWG9XVWhDV1FsZGx1YU0xMTA5WENOMmlyK1l4bmFwVFQwSUtnbElZRWplRHVscG05UVh6VXRYdWdqTVoxRk9RZ3BnVTNCRFNzeStEc0xrL08xZUhsNmRpUUFwQ1VuQkN5S3BoMDY5VW1aQXJRM0tRdjM5RStzL08yWU0yRlVWeC9JZ3hKaGdvZmhRaE5pb0tXZ1VWakJWc29LQ0NvSWpXUVJSRTZGanM0Q0JvUmNXbERzVXZSSnpjQkVGVXhFSGNITlRGYjlTWFE3a1g3cENrZ1M2MmdwMmNURjVlYWp3bWVlOGw3K09tUFQ5RDliOTB5WTk3ejczM2p3YkJMeEZFN21jYnZ5b25kSkRCS3hYMnIxK3RuUTN4N3JUaEU5TzVmOGYvV2FNOXNGajcrNmFjRFpDYXFuRGd5d1c5Yk5pNjZrUS9vdUVQZWVIQmdrQ1hocG9oVWpnN1d1cXBnaFMzRHJ6VnhvYjRxWjJEV01id2c1L0tseVBnZExaR01PWEFMMjFWa0VJVEc2TG4wLzFvWWZqQXpJKy9JbVNudmIyanFGa1pjb1lkbXFvZ1RCY3FOaHg1dUFQQ1lzbmFnUmdpK3FtQzh2RlNhRFlyWExpZ3FRb2xwSkJsSFY2TmZkaC81R0VvUzhPTnZnd2krcXlDOEdtNG93T3BNT3pRVXdVcGxCVG1ueEppK04zcDBrWUJ3Ukx0M29nVXd3Y0tsYzM4dCtFVFAxVm5xMkJ1RCthUHl0L3krUHZSUURlSzNsMHh4RUJVK0NYOUdmSHBBV1hTc0VOUEZhUVFTaWdocEt4c0U2WFBxOWVIOXE4UFJvYm9xaEdzaStFSHN6TXpzNGF2VE9lRTZOaXhVVXBSK1pRcC84djhlZlhsL2lQK0h5Z3VKaDlqQXd3bWxBM0NSRW1oTEJmS0RMM3orMEN4K1g0L0lxdWdrUXBDS3ZNek56Rkl5NGhYWXo3dUU4dTZ5cU1pcTZDVkNrcFVyaFlxaTRLc3lWSWNmK21QREpIdTU0aXNnbTRxaU1xQ1lLMEtrdVM3NzcyWElUSitESkZWMEU4RlpYM3Y1VVdoSEdweldZWm5iNzJWSWJveWc4Z3E2S2lDVU5YdHdQeVFYRUlPZnhuMVRJWWw0eGxFVmtGUEZaUTVKbGpmdnBKMTgvRG4wZlhMb0gwV2R6MUhaQlYwVmNHNlZGRFdvdEFnRDcvYzMvN3J4SnFOaUt5Q3RpcFk5ODZxZXRXbzZtY3BqaDg2c2hyYVlVOGFrVlV3REkxVmtIK25BaWxGNHl6SFByVWhRelRaZzZ4Q0dXMVZxTHhLbWc4UjV2ZmRPRXY1NnQzbytoWjNpVTNIRUZrRkUzMVZxUFlWclBOajB5eUhYN2EwTUt4TEk3SUtGdHFxTU5kWFVOWjJZSlBITHJoZkdMcGp5Q3JNb2EwS3RLOWdtNGZjTGd4YjA0aXN3bCswVllIMkZaUk5sc0xsd3REMUdGbUZXdlJWZ2ZRVmJIUHBaMmxoMkFIT2lBNGdzZ3Ivb0swS3RLL2dMTDhlZGJaSjdMbUNyQUpCWHhWSVg4RlpsbGMvT2Rra050MUJWb0dpcndxa3IrQTBEMzJ3M1NTVzdSNUVWdUUvOUZXQjlCVWM1MXR2YkZ5SXBCQlpoZi9SVndYU1YzQ2U1VmpUZ1NGeEFsbUZldWlyQXVrcnVNbkhtN2dRSDBGV29TNzZxa0Q2Q2E3eTFRdU5YRmgzR1ZtRit1aXJBdWtudU10M1A5VjNJZjRjV1lVR2FLdENrNzZDZlM2NVVIZGRTSXdncTlBSWpWVWcvUVEzV1FseGRYUUhVQ0k3a1ZWb2lMWXEwSDZDeTZ4S3MrTmkybUJNSWF2UUdIMVZJUDBFOTNsc1BWRmhKYklLVGRCV0JkcEhjSi9sbTRkUXkrYmJyRUl6dEZXQjloRmF5TGYyMW82T1I0OGhxOUFNYlZXdzdTdllaem4wb0daY1NDR3IwQlI5VlNCOWhKYnkyRU9vc2c5WmhlYm9xa0tCOWhGYXl4K3FKOG9sVjFnRkczUlZvVWo3Q0szbFoxK2h3aml5Q2pib3FvSVNrdllSV3NwdktzdEM0akdyWUlldUt0QStRcXQ1cUxJc3JFSld3UTVOVmFCOWhOYnpaL01RTWNJcTJLS25Da1VoYUIraHhTeUdWd1BBWm1RVmJORlNoWUtRdEkvUWV2NE9BR2RaQlh0MFZFSFIva0U3V2I1ZURQQ1VWYkJIT3hXSzVzTWk3U08wa1lkV3cwMWtGZXpSUzRXQ2tyUi8wSDQrRGQyc2dnTTBVcUZnRG91UzlnL2F6dS9oTEt2Z0FGMVVLQ2hKK3daZTVkZHdnbFZ3Z0JZcUZKVDVmekhTL29FM1dWNkZFVmJCQVJxb1VKUzBiK0JwbG5maEthc1FCdTRQRE9VTm5mWU52TXhEME1NcWhJR2JmYUZnZWlBazdSdDRtMjlCakZVSUEvY1hDRkpJMmpmd01zdGJjSWxWQ0FQbkJ3WXBhYi9Bbnp3RUcxbUZNSEIyWUpEU3BvL2dZYjRIYVZZaERPdzlvUDBDdi9OSlNMSUtZZURnSW9uMkMzek9MMkF0cXhBbzlpb29KVXFRZm9IL3VRc1MvYXhDQ0RRK01KamZDKzBUK0o4bnRnSnNaQlZDd01ZRDBpZndQOHNOQUxDY1ZRaUJlaGRKb29Ta2ZZS0FzbHdPQVBFZTlJaFpnM0hJZEozMWdQUUhnczI1bTFEaVBuckV0TUU0NU9kL0YwbEMwajVCa0ZtbW9NeDI5SWhmQnVPUWZJMEh0RDhRUnM0ZEJwT2Q2QTB6QnVPUXFhb0hOdjJEZ0xKTVFZWGVRVjRXZ21YRzhvRDJCOExLdWNOZ2NaYW5oVUQ1WlEyS3REOFFWaTZrb01yV21GZGJCTHZneElTcG9xSjlnVEN6eXNSaGpsWElvMk5Rek9aTkR5VHRENFNYYzllaGhnSDBpcG1mMDN5LzBKRHAzOW1pVGY4ZzhEeHhGbXBKUEVkdnllZnoyZXprNUdRdVo1WDNpMHBKV2JGdzdzZkN6bFpmSU94Y3ZKU0FmempjZ3o1Q0RjbFZEQ2tVeXZVTVJkL1BPUWVZVmF3WENGMkRHQWJVa0trcHE4Q2o2SHM2WnoreS9MWVcvbU1jdGNNMEpHc2FVdlpqb3FoSXg2djhVWnpieVBrVlVJZmQyQ0hrSzRxVUJLa29ZZzRpOVAyZHM1T2NYUWwxNmNPT1pzNlFzaUNtSVVvcCtqN1B1U2JMYkI4MFlCdk9ReXhESmlldE9jUTh5OUQzK2dXWlZUNEpEVms1aUF1RmZNMWhwb3k1aHREMy9IbWRpLzJub0FrcituRmhVelZrY202YlVVVkozL2ZuUlo3bzZZS21iSW9oWTNlWXNZNjcxcVdkRG4wRDkza3F0aDFzMkhJWkdaZUdaSzBMa1lJNWlLancrd2UyV1UxZXVnRzJKRkxJZUxXR1RKVU5xUjVtaE5DbG4xREkzMThLVGxpNTBBY0dndC9IM2NEN0NSTTk0K0NRTmNlUUNZNzgzMFdrNWpEald6OUJaUzhkQnNjc1BZdE0yT1RSTXFSNjNEVkgxYmI3Q1JQNSt3bHd3L1VueU9nSnZSQXBxS0tTVHZzSktwdjVDQzZKOC9UWVVlU1J2TjJaMnd6dFMrUUdkeTBGOTJ6aWlXRWU4TTl4TjM5NU83UkVOTm1EekR6aWRqSUNyYkxuQkRMemh2UVdhSWVQZlBrNFR6aXpGdHBreWFvTU1oM1BrMU5Mb0gyaXkvbUpxc09KTFUrQU44VDdIaUhUc1R6YWRoUzhZK3MyWGhrNmxOaTJPSGpMMGQxM2tPazRZc2s0ZUU5aU9WOUdkeGlaNVV2Qkh4YXR1b0pNeDNDbE93SStzaSs5Y0pxd0hjMWdldTFpOEptYmZUeEJhazhtdVE2Q1lPbjRDRElhczdNckFvSFJ1NHVYQmsyNTA3Y0ZnaVhhdlJFWjdkallIWVVRMkpMa1JvTldYTjU5RThKaThmWmRmUEdrQ1ptK1hnaVh5UFVVRjF4Q0p6YXdid2xvd05JVjEvaTVLa1I2MHVlam9BMkpyaFFmS1VMaHprQlhBalFqZW4yQWJRaVlwd2YzUlVCTEltdTJjZjh0TUs0a2V4ZUR6dXc1ZDRMSHlEL3MzRDFyNm1BVUIvQkExU2dWd3BPWEphOUR3T2lGWklqSkExSEk0QllRcWxPR2ZJTTRPQVNFWUIwekZIdTVkSFlKZExsb2grNVo3M2JuZkovTDNUcmMzcmEydG5uTStYMkd3L21mYzN6TXljazI1MUVFNlA1YVBwVGdaR0szVjZFeDhVVkZsTUhrY0FMN25hQlJ4R2thMlA1UmdnOU1CZFMvcEVqVlZVVWR5dUZEeWtCVVNVcUZmMnRKMklZVDFEdTBoeWl2Nk01NGhFYU9odnNTdk5sWWlhYmtoc0t6UERaWXdMZDlYbTIwY0FRaU5zWWp0U3hPZ1gvZXZXUjI3VWNHK2FQQkszeFRjUWFYaDJmTUZVNmlxVnJwcUVpQnB5OVB6ZFlLVmp0VVRkSDVqYVBETGFyYzJ5NWZqMFQ0djR2N0xkckZOVDAveUF1ZlUxTUtQTkVZL0VaK25UckVuZTRqWmxDSngwZlZsRTZpSUp5ZjljNHB4NWtwNUxVZEN0Nm9VYWlSTzd3K3M5Q1FIME1uVVQxb0JFZG8zazk0MGJkSmJ4THlPblFRYTZUVmZtbENocVptc1hnWnhvUk5FbmZ4M3hMSW9RUk9vVlZJTE9jcStyekMwZEdPYmQ5TW1QdzdMSWVmNHVKcVlER1I2R1Q2dWdxdFluU0k3Y3dSazVYbFFRRjhvWlkybFJnZW1jdk0zb3gvbHA5ajFoN0hlclkwT1dGckZGY1FBVlhVcE5OQlgrcXQrQVNiZ2ErRSttWjllR2Q5ak5xSGg4ZU5QdHc1Sms0RVJqVnVOZm9NZnptdWgwczZMYVo5STVjbWFtL0xyRmlCNTZPRVF3aUxwdWtHamhNRXJtdWFvb2d4UWh5WFJEZTh3R3duVnYvVzB6cGRXUDRBQUFBQUFBQUFmOXFEQXhJQUFBQUFRZjlmOXlOVUFBQUFBQUFBQUFBQUFBQUFBT0FrVVQxT05DVEd5S2tBQUFBQVNVVk9SSzVDWUlJPVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXNzZXRzL2ltZ3MvUkJyZWNvcmQucG5nXG4vLyBtb2R1bGUgaWQgPSBhZjA2YmFjZjNlOTlkZDk1NmZmY1xuLy8gbW9kdWxlIGNodW5rcyA9IDIzIiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanNcbi8vIG1vZHVsZSBpZCA9IGI1MGQ4MjQ1NmU1NDVkY2MzZGQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIGFyZ3MsIHRoYXQpIHtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanNcbi8vIG1vZHVsZSBpZCA9IGI1ODBiOTRiMTk1ODQyY2JmMmIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIE9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbnZhciBpc05vZGUgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZiAoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAoaXNOb2RlKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyLCBleGNlcHQgaU9TIFNhZmFyaSAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMzlcbiAgfSBlbHNlIGlmIChPYnNlcnZlciAmJiAhKGdsb2JhbC5uYXZpZ2F0b3IgJiYgZ2xvYmFsLm5hdmlnYXRvci5zdGFuZGFsb25lKSkge1xuICAgIHZhciB0b2dnbGUgPSB0cnVlO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlIHdpdGhvdXQgYW4gYXJndW1lbnQgdGhyb3dzIGFuIGVycm9yIGluIExHIFdlYk9TIDJcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gICAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYgKCFoZWFkKSB7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gYmRlMGY1N2U5YjU3OWY5NDNmODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjUuNC4xLjUgTmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5cbmZ1bmN0aW9uIFByb21pc2VDYXBhYmlsaXR5KEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIChDKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanNcbi8vIG1vZHVsZSBpZCA9IGMxYjk0ZTNlOTVlZDQzNWFmNTQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtZmluYWxseVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1Byb21pc2UnLCB7ICdmaW5hbGx5JzogZnVuY3Rpb24gKG9uRmluYWxseSkge1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBjb3JlLlByb21pc2UgfHwgZ2xvYmFsLlByb21pc2UpO1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBvbkZpbmFsbHkgPT0gJ2Z1bmN0aW9uJztcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB4OyB9KTtcbiAgICB9IDogb25GaW5hbGx5LFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSk7XG4gICAgfSA6IG9uRmluYWxseVxuICApO1xufSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanNcbi8vIG1vZHVsZSBpZCA9IGMyZTM1YmJmZjgzMzA5NTk0M2MxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4geyBlOiBmYWxzZSwgdjogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBlOiB0cnVlLCB2OiBlIH07XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gY2I3ODM3NTI5NDU0MmMyNGM1YmFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSBkMTgxMGFlNTMzMmUzNmZmYTNjNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJwdWxsLWxvYWRcIjpcInB1bGwtbG9hZFwiLFwicHVsbC1sb2FkLWhlYWRcIjpcInB1bGwtbG9hZC1oZWFkXCIsXCJzdGF0ZS1yZWZyZXNoaW5nXCI6XCJzdGF0ZS1yZWZyZXNoaW5nXCIsXCJzdGF0ZS1yZWZyZXNoZWRcIjpcInN0YXRlLXJlZnJlc2hlZFwiLFwicHVsbC1sb2FkLWJvZHlcIjpcInB1bGwtbG9hZC1ib2R5XCIsXCJzdGF0ZS1yZXNldFwiOlwic3RhdGUtcmVzZXRcIixcInB1bGwtbG9hZC1oZWFkLWRlZmF1bHRcIjpcInB1bGwtbG9hZC1oZWFkLWRlZmF1bHRcIixcInN0YXRlLXB1bGxpbmdcIjpcInN0YXRlLXB1bGxpbmdcIixcImVub3VnaFwiOlwiZW5vdWdoXCIsXCJjaXJjbGVcIjpcImNpcmNsZVwiLFwicHVsbC1sb2FkLWZvb3Rlci1kZWZhdWx0XCI6XCJwdWxsLWxvYWQtZm9vdGVyLWRlZmF1bHRcIixcInN0YXRlLWxvYWRpbmdcIjpcInN0YXRlLWxvYWRpbmdcIixcIm5vbW9yZVwiOlwibm9tb3JlXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvUmVkQmFnRGV0YWlsL1JlYWN0UHVsbExvYWQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gZDMwZDg0ZDg0ZWViMjlmNDIxMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAyMyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBuYXZpZ2F0b3IgPSBnbG9iYWwubmF2aWdhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50IHx8ICcnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanNcbi8vIG1vZHVsZSBpZCA9IGVjNmNiZTMxN2I5ODUwYjA1Y2U1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSBlZjUxZDQ5ODlmMzA0NGIyZWIzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qc1xuLy8gbW9kdWxlIGlkID0gZjBkYmMxMGM2OGRkODE0MDE0ZTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wicmJkXCI6XCJyYmRcIixcInRlc3QtdWxcIjpcInRlc3QtdWxcIixcImhlYWRcIjpcImhlYWRcIixcIndoaXRlXCI6XCJ3aGl0ZVwiLFwiaXRlbS1ib3JkZXItcmVkdXNcIjpcIml0ZW0tYm9yZGVyLXJlZHVzXCIsXCJjb250ZW50XCI6XCJjb250ZW50XCIsXCJpbWdXYXJwXCI6XCJpbWdXYXJwXCIsXCJ0aXBzXCI6XCJ0aXBzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJsZWZ0XCI6XCJsZWZ0XCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvUmVkQmFnRGV0YWlsL1JlZEJhZ0RldGFpbC5zY3NzXG4vLyBtb2R1bGUgaWQgPSBmNGU0NWY3NmJhMzdhMmUwNWVlZVxuLy8gbW9kdWxlIGNodW5rcyA9IDIzIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4vX3VzZXItYWdlbnQnKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52OCB8fCAnJztcbnZhciAkUHJvbWlzZSA9IGdsb2JhbFtQUk9NSVNFXTtcbnZhciBpc05vZGUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbnZhciBlbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBJbnRlcm5hbCwgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBPd25Qcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIHZhciBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICAgIGV4ZWMoZW1wdHksIGVtcHR5KTtcbiAgICB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpXG4gICAgICAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2VcbiAgICAgIC8vIHY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTgzMDU2NVxuICAgICAgLy8gd2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgICAgICYmIHY4LmluZGV4T2YoJzYuNicpICE9PSAwXG4gICAgICAmJiB1c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lLzY2JykgPT09IC0xO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuLCBleGl0ZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7IC8vIG1heSB0aHJvd1xuICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgICAgICBleGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaSkgcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKSBvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIHVuaGFuZGxlZCA9IGlzVW5oYW5kbGVkKHByb21pc2UpO1xuICAgIHZhciByZXN1bHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYgKHVuaGFuZGxlZCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKSB7XG4gICAgICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodW5oYW5kbGVkICYmIHJlc3VsdC5lKSB0aHJvdyByZXN1bHQudjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgcmV0dXJuIHByb21pc2UuX2ggIT09IDEgJiYgKHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYykubGVuZ3RoID09PSAwO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gZmE5ODdkODExZTRlYjJkNDNkOWNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4Il0sInNvdXJjZVJvb3QiOiIifQ==