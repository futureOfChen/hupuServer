webpackJsonp([28],{

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

/***/ "4d35d6731e9573a30869":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"pageWrapper":"pageWrapper","container":"container","blank-placeholder":"blank-placeholder","activity-block":"activity-block","bg-kb":"bg-kb","activity-title":"activity-title","activity-invite-title":"activity-invite-title","activity-invite-block":"activity-invite-block","activity-body":"activity-body","gift-title":"gift-title","invite-color":"invite-color","invite-activity-title":"invite-activity-title","invite-list-title":"invite-list-title"};

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


/***/ }),

/***/ "fe4070c0040e3ca6803b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

__webpack_require__("4d35d6731e9573a30869");

var _request = __webpack_require__("76fb50331ac78bf18670");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActivityRule = function (_React$Component) {
    (0, _inherits3.default)(ActivityRule, _React$Component);

    function ActivityRule(props, context) {
        (0, _classCallCheck3.default)(this, ActivityRule);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ActivityRule.__proto__ || (0, _getPrototypeOf2.default)(ActivityRule)).call(this, props, context));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(ActivityRule, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            (0, _request.beforeEnterRouter)("天天领红包");
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "wrapper", id: "pageWrapper" },
                _react2.default.createElement(
                    "div",
                    { className: "page-container", id: "page_redPacketCodeRule" },
                    _react2.default.createElement(
                        "div",
                        { className: "container bg-kb" },
                        _react2.default.createElement("div", { className: "blank-placeholder" }),
                        _react2.default.createElement(
                            "div",
                            { className: "activity-block" },
                            _react2.default.createElement(
                                "div",
                                { className: "activity-title" },
                                "\u626B\u7801\u9886\u7EA2\u5305\u6D3B\u52A8\u89C4\u5219"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "activity-body" },
                                _react2.default.createElement(
                                    "h1",
                                    null,
                                    "\u25C6\xA0\u6D3B\u52A8\u65F6\u95F4"
                                ),
                                _react2.default.createElement(
                                    "p",
                                    { className: "activity-content" },
                                    "2018.05.15-2018.08.31"
                                ),
                                _react2.default.createElement(
                                    "h1",
                                    null,
                                    "\u25C6\xA0\u6D3B\u52A8\u89C4\u5219"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "1\u3001\u6D3B\u52A8\u671F\u95F4\uFF0C\u7528\u6237\u901A\u8FC7\u6D3B\u52A8\u9875\u9762\u83B7\u5F97\u7EA2\u5305\uFF0C\u6240\u5F97\u7EA2\u5305\u53EF\u5728\u4E3B\u626B\u3001\u88AB\u626B\u62B5\u6263\u6D88\u8D39\u91D1\u989D\u3002"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "2\u3001\u540C\u4E00\u7528\u6237\u6D3B\u52A8\u671F\u95F4\u6BCF\u5929\u67091\u6B21\u9886\u53D6\u673A\u4F1A(\u4E0D\u540C\u5546\u5BB6\u5171\u4EAB)\uFF0C\u7EA2\u5305\u5168\u90E8\u4F7F\u7528\u540E\u624D\u53EF\u83B7\u5F97\u4E0B\u4E00\u6B21\u9886\u53D6\u673A\u4F1A\uFF1B\u540C\u4E00\u8D26\u53F7\u3001\u624B\u673A\u53F7\u3001\u8EAB\u4EFD\u8BC1\u3001\u624B\u673A\u7EC8\u7AEF\uFF0C\u7B26\u5408\u4EE5\u4E0A\u4EFB\u4E00\u6761\u4EF6\u5747\u89C6\u4E3A\u540C\u4E00\u6237\u3002"
                                ),
                                _react2.default.createElement(
                                    "p",
                                    { className: "activity-content" },
                                    "3\u3001\u6D3B\u52A8\u671F\u95F4\u7EA2\u5305\u968F\u673A\u53D1\u9001\uFF0C\u53D1\u5B8C\u4E3A\u6B62\uFF1B\u7EA2\u5305\u9886\u53D6\u540E60\u65E5\u5185\u6709\u6548\uFF0C\u5DF2\u8FC7\u671F\u7EA2\u5305\u5C06\u4E0D\u5B9A\u671F\u6536\u56DE\u3002"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "4\u3001\u82E5\u4EAB\u53D7\u4F18\u60E0\u7684\u4EA4\u6613\u53D1\u751F\u9000\u6B3E\uFF0C\u4EC5\u9000\u8FD8\u5B9E\u9645\u652F\u4ED8\u7684\u91D1\u989D\uFF0C\u4E0D\u518D\u9000\u8FD8\u5DF2\u4EAB\u4F18\u60E0\u8D44\u683C\u3002"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "5\u3001\u7EA2\u5305\u53EF\u62C6\u5206\u591A\u6B21\u4F7F\u7528\uFF1B\u7528\u6237\u4E0D\u80FD\u540C\u65F6\u4EAB\u53D7\u7EA2\u5305\u3001\u7ACB\u51CF\u7B49\u4F18\u60E0\uFF0C\u4F18\u5148\u4EAB\u53D7\u7ACB\u51CF\u7B49\u4F18\u60E0\u3002"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "6\u3001\u5982\u7528\u6237\u51FA\u73B0\u8FDD\u89C4\u884C\u4E3A(\u5982\u865A\u5047\u4EA4\u6613\u3001\u4F5C\u5F0A\u3001\u6076\u610F\u5957\u53D6\u73B0\u91D1\u3001\u5237\u4FE1\u7B49)\uFF0C\u4E91\u95EA\u4ED8APP\u5C06\u64A4\u9500\u60A8\u7684\u6D3B\u52A8\u53C2\u4E0E\u8D44\u683C\uFF0C\u5E76\u6709\u6743\u64A4\u9500\u8FDD\u89C4\u4EA4\u6613\uFF0C\u56DE\u6536\u60A8\u5DF2\u7ECF\u83B7\u5F97\u7684\u4F18\u60E0\u91D1\u989D(\u5305\u62EC\u5DF2\u6D88\u8D39\u91D1\u989D)\u3002"
                                ),
                                _react2.default.createElement(
                                    "p",
                                    { className: "activity-content" },
                                    "7\u3001\u9650\u4F7F\u7528\u4E91\u95EA\u4ED8APP\u82F9\u679C\u5BA2\u6237\u7AEF5.0.6\u3001\u5B89\u5353\u5BA2\u6237\u7AEF5.0.9\u53CA\u4EE5\u4E0A\u7248\u672C\u53C2\u4E0E\u6D3B\u52A8\u3002"
                                ),
                                "  ",
                                _react2.default.createElement(
                                    "p",
                                    {
                                        className: "activity-content" },
                                    "8\u3001\u7EA2\u5305\u4EC5\u9650\u5728\u4E2D\u56FD\u5927\u9646\u5730\u533A\u4F7F\u7528\u3002"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return ActivityRule;
}(_react2.default.Component);

exports.default = ActivityRule;

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0FjdGl2aXR5UnVsZS9BY3Rpdml0eVJ1bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3V0aWwvY29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdXNlci1hZ2VudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0FjdGl2aXR5UnVsZS9BY3Rpdml0eVJ1bGUuanMiXSwibmFtZXMiOlsicmVxdWVzdCIsInNldFhpYW9XZWlQYXkiLCJVdGlsIiwid2luZG93IiwiVVAiLCJXIiwiQXBwIiwiRW52IiwicmVnUGhvbmUiLCJyZWdQYXlOdW0iLCJjb21vbVBhcmFtIiwidmVyc2lvbiIsInNvdXJjZSIsImJhc2VVcmwiLCJiYXNlVXJsMiIsImJhc2VVcmwzIiwibG9jYXRpb24iLCJob3N0bmFtZSIsImluZGV4T2YiLCJwcm90b2NvbCIsImdldFNlcnZVcmwiLCJ1cmwiLCJzZXJ2ZXJVcmwiLCJDT05GSUciLCJSRVNUIiwidXNlckluZm8iLCJzcGxpdCIsImdldENpdHkiLCJyZXNwb25zZUZvcm1hdHRlciIsImRhdGEiLCJyZXMiLCJzdGF0dXNDb2RlIiwicmVzcCIsInBhcmFtcyIsIm1zZyIsImRlbGV0ZVNsYXNoIiwiaG9zdCIsInJlcGxhY2UiLCJhZGRTbGFzaCIsInBhdGgiLCJ0ZXN0Iiwic2VwYXJhdGVQYXJhbXMiLCJwYXJhbXNMaW5lIiwiZm9yRWFjaCIsIml0ZW0iLCJrZXkiLCJ2YWx1ZSIsImNvbmZpZyIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwiZmluYWxVcmwiLCJyZXNvbHZlIiwicmVqZWN0Iiwib3B0aW9ucyIsInR5cGUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJlcnJvciIsIkVycm9yIiwiZGF0YVR5cGUiLCIkIiwiYWpheCIsImdldCIsInBhcmFtIiwicGFyYW1BbGwiLCJmb3JDaHNwIiwiZW5jcnlwdCIsImNhY2hlIiwiYnlBamF4IiwicG9zdCIsInB1dCIsImRlbCIsImdldFNlYXJjaFBhcmFtIiwic2VhcmNoIiwic3RyIiwic2xpY2UiLCJhcnJheSIsIm9iaiIsInN1YyIsImVyciIsImFwcCIsInNldFhpYW9XZWlBdWRpbyIsImdldFhpYW9XZWlBdWRpbyIsInRvYXN0IiwibXMiLCJUb2FzdCIsImluZm8iLCJiZWZvcmVFbnRlclJvdXRlciIsInRpdGxlIiwicmlnaHRCYXIiLCJyaWdodENhbGxiYWNrIiwicmlnaHRCYXJJbWciLCJkb2N1bWVudCIsIm9uUGx1Z2luUmVhZHkiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJzZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24iLCJtY2NTdGF0ZUNoYW5nZWQiLCJzZW5kUXJDb2RlIiwiZmFpbCIsInNjYW5RUkNvZGUiLCJjbG9zZVdlYlZpZXciLCJ2ZXJpZnlQYXlQd2QiLCJjcmVhdGVXZWJWaWV3IiwiaXNGaW5pc2giLCJnZXRVc2VyRGV0YWlsSW5mbyIsInNhdmVRY29kZSIsImNhbnZhcyIsInVpIiwiVUkiLCJwaWNVcmwiLCJ0b0RhdGFVUkwiLCJsb2dFdmVudCIsInNhdmVQaWNUb0xvY2FsIiwic3Vic3RyIiwic2hvd1RvYXN0V2l0aFBpYyIsInNob3dBbGVydCIsImVudiIsImlzSU9TIiwib3BlbkJyb3dzZXIiLCJzaG93VG9hc3QiLCJzaGFyZSIsImRlc2MiLCJpbWdVUkwiLCJwYWdlVVJsIiwic2hvd1NoYXJlUGFuZWwiLCJzaGFyZVVybCIsImdldEN1cnJlbnRMb2NhdGlvbkluZm8iLCJjYWxsYmFjazIiLCJzaG93TG9hZGluZyIsImNhbGxiYWNrIiwiZGlzbWlzcyIsInNlbmRNZXNzYWdlIiwiY21kIiwiY29uc29sZSIsImxvZyIsImZldGNoTmF0aXZlRGF0YSIsInhociIsImNpdHlDZCIsImNyZWF0ZVRleHRDYW52YXNlIiwidGV4dCIsImNvbG9yIiwibG9uZyIsInNob3QiLCJyZW0ycHgiLCJ2YWwiLCJjV2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsInNldEF0dHJpYnV0ZSIsIndpZHRoIiwicm90YXRlIiwiTWF0aCIsIlBJIiwiZmlsbFN0eWxlIiwidGV4dEFsaWduIiwiZm9udFNpemUiLCJmb250IiwibWVhc3VyZVRleHQiLCJmaWxsVGV4dCIsImNyZWF0ZUNvbnZhc0FuZFNhdmVQaG90byIsImNhbnZhc09iaiIsImJndXJsIiwicXJjb2RlVVJMIiwicXJjb2RlV2RBbmRIZyIsInhXaWR0aCIsInlIZWlnaHQiLCJ0ZXh0YmdVUkwiLCJ4VGV4dFdpZHRoIiwieVRleHRIZWlnaHQiLCJpbWciLCJJbWFnZSIsInNyYyIsIm9ubG9hZCIsImhlaWdodCIsImRyYXdJbWFnZSIsInRleHRVcmkiLCJ0ZXh0SW1nIiwicXJjb2RlV2lkdGhBbmRIZWlnaHQiLCJpbm5lckhUTUwiLCJxcmNvZGUiLCJRUkNvZGUiLCJjb3JyZWN0TGV2ZWwiLCJDb3JyZWN0TGV2ZWwiLCJMIiwicXJjb2RlSW1nIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJxcmNvZGVEeCIsInFyY29kZUR5IiwiYXBwbHlNY2MiLCJnZXRNY2NDYXJkTGlzdCIsImFwcGx5TWF0IiwiZ2V0TWNobnRBbmRBcmVhSW5mIiwidXBncmFkZU1jYyIsImdldEFkZHJMaXN0IiwiZGVsZXRlQWRkcmVzcyIsImVkaXRBZGRyZXNzIiwibmV3QWRkcmVzcyIsIm1jaG50T3BlciIsImdldExpbWl0QXRJbmZvIiwic2V0TWNjT25PZmYiLCJnZXRNY2hudERldGFpbCIsImdldFRvZGF5VHJhbnMiLCJnZXRUb2RheUluY29tZSIsImdldEhpc3RvcnlJbmNvbWUiLCJnZXRIaXN0b3J5VHJhbnMiLCJnZXRMb2dpc3RpY3NTdCIsImdldFRyYW5zRGV0aWxCeVZvdWNoZXJOdW0iLCJnZXRBdWRpdEluZm8iLCJ1cGRhdGVNY2NDYXJkIiwiZ2V0VXBncmFkZVN0IiwiZ2V0TWNjVHJhbnNOdW0iLCJnZXRNYXRlcmllbEluZm9MaXN0IiwiaXNCbGFjayIsImlzQXBwbHkiLCJzaGFyZUxpbmsiLCJyZWNtZFJlY29yZCIsImdldExvZ2lzdGljc0xpc3QiLCJnZXRSZXdhcmRMaXN0IiwiZ2V0UHJvdG9jb2xJbmZvIiwiZ2V0UXJVcmwiLCJTVEFUVVNDT0RFIiwiU1VDQ0VTUyIsIkNPTlNUX0RBVEEiLCJpbWdlU2l6ZSIsIkNBQ0hFS0VZIiwicm9sbEtleSIsInNlY29uZEtleSIsIlVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0IiwiQWN0aXZpdHlSdWxlIiwicHJvcHMiLCJjb250ZXh0Iiwic3RhdGUiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxXQUFXLG1CQUFPLENBQUMsc0JBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7O0FDTkEsbUJBQU8sQ0FBQyxzQkFBNkI7QUFDckMsbUJBQU8sQ0FBQyxzQkFBZ0M7QUFDeEMsaUJBQWlCLG1CQUFPLENBQUMsc0JBQThCOzs7Ozs7OztBQ0Z2RCxtQkFBTyxDQUFDLHNCQUE2QjtBQUNyQyxtQkFBTyxDQUFDLHNCQUFnQztBQUN4QyxpQkFBaUIsbUJBQU8sQ0FBQyxzQkFBNkI7Ozs7Ozs7O0FDRnRELGtCQUFrQixZQUFZLG1CQUFPLENBQUMsc0JBQTRCLHNCOzs7Ozs7O0FDQWxFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7QUNKQSxrQkFBa0IsWUFBWSxtQkFBTyxDQUFDLHNCQUFpQyxzQjs7Ozs7OztBQ0F2RTtBQUNBLGtCQUFrQixpYzs7Ozs7OztBQ0RsQixlQUFlLG1CQUFPLENBQUMsc0JBQWM7QUFDckMsVUFBVSxtQkFBTyxDQUFDLHNCQUE0QjtBQUM5QyxpQkFBaUIsbUJBQU8sQ0FBQyxzQkFBUztBQUNsQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNOQSxVQUFVLG1CQUFPLENBQUMsc0JBQVE7QUFDMUIsV0FBVyxtQkFBTyxDQUFDLHNCQUFjO0FBQ2pDLGtCQUFrQixtQkFBTyxDQUFDLHNCQUFrQjtBQUM1QyxlQUFlLG1CQUFPLENBQUMsc0JBQWM7QUFDckMsZUFBZSxtQkFBTyxDQUFDLHNCQUFjO0FBQ3JDLGdCQUFnQixtQkFBTyxDQUFDLHNCQUE0QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsaUJBQWlCLEVBQUU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxnQkFBZ0I7QUFDbkY7QUFDQTtBQUNBLEdBQUcsNENBQTRDLGdDQUFnQztBQUMvRTtB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QyxTOztrQkFBM0JMLFkiLCJmaWxlIjoiY2h1bmsvQWN0aXZpdHlSdWxlLjE2MjA0YzNjMzguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBpZiAoc2FmZSAmJiB0YXJnZXRba2V5XSkgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanNcbi8vIG1vZHVsZSBpZCA9IDE0ZGMxZjdlYmQ4MGQxNWJmZDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDE2Nzk4NTFiZTI3YjI2OGVhMjRlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMWRmYWMyODUyM2FlMzdkYWM1YlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNTFiYzdhZmU4MTI3ZTA5MTQ5ZFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhjZmY4NmUxZDUxZWJmMjFmN2Zcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDNjMjRkMzhmZmNkMGMzOGUzNDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcInBhZ2VXcmFwcGVyXCI6XCJwYWdlV3JhcHBlclwiLFwiY29udGFpbmVyXCI6XCJjb250YWluZXJcIixcImJsYW5rLXBsYWNlaG9sZGVyXCI6XCJibGFuay1wbGFjZWhvbGRlclwiLFwiYWN0aXZpdHktYmxvY2tcIjpcImFjdGl2aXR5LWJsb2NrXCIsXCJiZy1rYlwiOlwiYmcta2JcIixcImFjdGl2aXR5LXRpdGxlXCI6XCJhY3Rpdml0eS10aXRsZVwiLFwiYWN0aXZpdHktaW52aXRlLXRpdGxlXCI6XCJhY3Rpdml0eS1pbnZpdGUtdGl0bGVcIixcImFjdGl2aXR5LWludml0ZS1ibG9ja1wiOlwiYWN0aXZpdHktaW52aXRlLWJsb2NrXCIsXCJhY3Rpdml0eS1ib2R5XCI6XCJhY3Rpdml0eS1ib2R5XCIsXCJnaWZ0LXRpdGxlXCI6XCJnaWZ0LXRpdGxlXCIsXCJpbnZpdGUtY29sb3JcIjpcImludml0ZS1jb2xvclwiLFwiaW52aXRlLWFjdGl2aXR5LXRpdGxlXCI6XCJpbnZpdGUtYWN0aXZpdHktdGl0bGVcIixcImludml0ZS1saXN0LXRpdGxlXCI6XCJpbnZpdGUtbGlzdC10aXRsZVwifTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0FjdGl2aXR5UnVsZS9BY3Rpdml0eVJ1bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNGQzNWQ2NzMxZTk1NzNhMzA4Njlcbi8vIG1vZHVsZSBjaHVua3MgPSAyOCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1M2I3ZDM0ODE3MTQ0YjEyYjBhYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNWU1OWI3MWIzM2EzOGMzNjE4ZTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSkge1xuICB2YXIgQyA9IHR5cGVvZiBjb3JlW0tFWV0gPT0gJ2Z1bmN0aW9uJyA/IGNvcmVbS0VZXSA6IGdsb2JhbFtLRVldO1xuICBpZiAoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkgZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDVlNzQ5MWYxZjc5OTcxNWVhYzc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gNmE0NDJhYjViZDliZDkyOTQ0Nzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLypcclxuICAgQVBJIOaOpeWPo+mFjee9rlxyXG4gICBheGlvcyDlj4LogIPmlofmoaPvvJpodHRwczovL3d3dy5rYW5jbG91ZC5jbi95dW55ZS9heGlvcy8yMzQ4NDVcclxuXHJcbiovXHJcbi8vIGltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCBUb2FzdCBmcm9tICdhbnRkLW1vYmlsZS9saWIvdG9hc3QnO1xyXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuaW1wb3J0IENPTkZJRyBmcm9tIFwiLi9jb25maWdcIlxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qXHJcbiog5bi46YeP5a6a5LmJ5Yy6XHJcbipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZXhwb3J0IGNvbnN0IFV0aWwgPSB3aW5kb3cuVVAuVy5VdGlsO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwcCA9IFVQLlcuQXBwO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVudiA9IFVQLlcuRW52O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCByZWdQaG9uZSA9IC9eKDEzWzAtOV18MTRbNTc5XXwxNVswLTMsNS05XXwxNls2XXwxN1swMTM1Njc4XXwxOFswLTldfDE5Wzg5XSlcXGR7OH0kLztcclxuXHJcbmV4cG9ydCBjb25zdCByZWdQYXlOdW0gPSAvXlswLTldezIwfSQvO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbW9tUGFyYW0gPSB7XHJcbiAgICB2ZXJzaW9uOiBcIjIuMFwiLFxyXG4gICAgc291cmNlOiBcIjJcIlxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqXHJcbiAqIOivt+axguaguOW/g+WMuiDkuIvpnaLov5nlnZfljLrln5/kuK3nmoTku6PnoIHmlLnliqjor7fmhY7ph41cclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmxldCBiYXNlVXJsID0gXCJcIiwgYmFzZVVybDIgPSBcIlwiLCBiYXNlVXJsMyA9IFwiXCI7XHJcbmlmIChsb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCc5NTUxNi5jb20nKSAhPT0gLTEpIHsgLy/nlJ/kuqfnjq/looNcclxuICAgIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9zaGFuZ2h1Ljk1NTE2LmNvbS93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsMiA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL21hbGwuOTU1MTYuY29tL2NxcC1pbnQtbWFsbC13ZWIvcmVzdGxldC9cIjtcclxuICAgIGJhc2VVcmwzID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8veW91aHVpLjk1NTE2LmNvbS95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn0gZWxzZSBpZiAobG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignMTcyLjE4LjE3OS4xMCcpICE9PSAtMSkgeyAvL+a1i+ivleeOr+Wig1xyXG4gICAgLy8gYmFzZVVybD1cImh0dHA6Ly8xNzIuMjEuMTAxLjI1OjM2MDAwL3dsbXdlYi13ZWIvcmVzdGxldC9cIjsgLy/mtYvor5XlrqRhcGFjaGVcclxuICAgIC8vYmFzZVVybCA9IFwiaHR0cDovLzE3Mi4yMS4xMDEuOTU6MzYwMDAvd2xtd2ViLXdlYi9yZXN0bGV0L1wiOy8v5byA5Y+R546v5aKDYXBhY2hlXHJcbiAgICBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xNy93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjExL3lvdWh1aS13ZWIvcmVzdGxldC9cIjtcclxuICAgIC8vIGJhc2VVcmwzID0gXCJodHRwOi8vMTcyLjIxLjEzMy4yNTozNjAwMC95b3VodWktd2ViL3Jlc3RsZXQvXCI7XHJcbn0gZWxzZSB7XHJcbiAgICAvLyBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS45NTozNjAwMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICAvLyBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjIxLjEwMS4yNTozODIxMC93bG13ZWItd2ViL3Jlc3RsZXQvXCI7XHJcbiAgICBiYXNlVXJsID0gXCJodHRwOi8vMTcyLjE4LjE3OS4xNy93bG13ZWItd2ViL3Jlc3RsZXQvXCI7Ly/mtYvor5XlrqRmNSDpgJrov4dOZ2lueOi9rOWPkVxyXG4gICAgYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMTguMTc5LjExL3lvdWh1aS13ZWIvcmVzdGxldC9cIjsvL+a1i+ivleWupGY1IOmAmui/h05naW546L2s5Y+RXHJcbiAgICAvLyBiYXNlVXJsMyA9IFwiaHR0cDovLzE3Mi4yMS4xMzMuMjU6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG4gICAgLy8gYmFzZVVybDMgPSBcImh0dHA6Ly8xNzIuMjEuMzMuNTY6MzYwMDAveW91aHVpLXdlYi9yZXN0bGV0L1wiO1xyXG59XHJcbi8qKlxyXG4gKiDpgJrov4flkI7nvIDojrflj5bmnI3liqHlmajnmoTlhajlnLDlnYBcclxuICogQHBhcmFtIHVybFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldFNlcnZVcmwgPSAodXJsKSA9PiB7XHJcbiAgICBsZXQgc2VydmVyVXJsID0gXCJcIlxyXG4gICAgaWYgKHVybCA9PSBDT05GSUcuUkVTVC51c2VySW5mbykge1xyXG4gICAgICAgIHNlcnZlclVybCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICAvLyBlbHNlIGlmICh1cmwuc3BsaXQoXCIvXCIpWzBdID09IFwiYWRkcmVzc1wiKSB7XHJcbiAgICAvLyAgICAgc2VydmVyVXJsID0gYmFzZVVybDJcclxuICAgIC8vIH1cclxuICAgIGVsc2UgaWYgKHVybC5zcGxpdChcIi9cIilbMF0gPT0gXCJzY2FuXCIgfHwgdXJsID09IENPTkZJRy5SRVNULmdldENpdHkpIHtcclxuICAgICAgICBzZXJ2ZXJVcmwgPSBiYXNlVXJsM1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc2VydmVyVXJsID0gYmFzZVVybFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZXJ2ZXJVcmw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmoLzlvI/ljJbnu5Pmnpwg5bCG57uT5p6c5qC85byP5YyW5Li6XHJcbiAqIHtcclxuICogICAgIHN0YXR1c0NvZGUgICDlkI7lj7Dlk43lupTnoIFcclxuICogICAgIGRhdGEgICAgICAgICDlkI7lj7Dov5Tlm57nmoTmlbDmja5cclxuICogICAgIG1zZyAgICAgICAgICDlkI7lj7DnmoTmj5DnpLrkv6Hmga9cclxuICogfVxyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKiBAcmV0dXJucyB7e3N0YXR1c0NvZGU6IChzdHJpbmd8KiksIGRhdGE6ICosIG1zZzogKn19XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVzcG9uc2VGb3JtYXR0ZXIgPSAoZGF0YSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnJlc3AsXHJcbiAgICAgICAgZGF0YTogZGF0YS5wYXJhbXMsXHJcbiAgICAgICAgbXNnOiBkYXRhLm1zZ1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8vIOWIoOmZpOW6lemDqCAnLydcclxuZnVuY3Rpb24gZGVsZXRlU2xhc2goaG9zdCkge1xyXG4gICAgcmV0dXJuIGhvc3QucmVwbGFjZSgvXFwvJC8sICcnKTtcclxufVxyXG5cclxuLy8g5re75Yqg5aS06YOoICcvJ1xyXG5mdW5jdGlvbiBhZGRTbGFzaChwYXRoKSB7XHJcbiAgICByZXR1cm4gL15cXC8vLnRlc3QocGF0aCkgPyBwYXRoIDogYC8ke3BhdGh9YDtcclxufVxyXG5cclxuLy8g6Kej5p6Q5Y+C5pWwXHJcbmZ1bmN0aW9uIHNlcGFyYXRlUGFyYW1zKHVybCkge1xyXG4gICAgY29uc3QgW3BhdGggPSAnJywgcGFyYW1zTGluZSA9ICcnXSA9IHVybC5zcGxpdCgnPycpO1xyXG5cclxuICAgIGxldCBwYXJhbXMgPSB7fTtcclxuXHJcbiAgICBwYXJhbXNMaW5lLnNwbGl0KCcmJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBpdGVtLnNwbGl0KCc9Jyk7XHJcblxyXG4gICAgICAgIHBhcmFtc1trZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge3BhdGgsIHBhcmFtc307XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKXtcclxuICAgIGxldCB7bWV0aG9kLCB1cmwsIGRhdGEgPSB7fX0gPSBjb25maWc7XHJcbiAgICBtZXRob2QgPSAobWV0aG9kICYmIG1ldGhvZC50b1VwcGVyQ2FzZSgpKSB8fCAnR0VUJztcclxuXHJcbiAgICBsZXQgc2VydmVyVXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6MzAwMC8nO1xyXG4gICAgbGV0IGZpbmFsVXJsID0gc2VydmVyVXJsICsgdXJsO1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdXJsOmZpbmFsVXJsLFxyXG4gICAgICAgICAgICB0eXBlOm1ldGhvZCxcclxuICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09ICcyMDAnKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlRm9ybWF0dGVyKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjpmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCfor7fmsYLlpLHotKUnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICBpZiggbWV0aG9kID09PSAnUE9TVCcgKXtcclxuICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICAgb3B0aW9ucy5kYXRhVHlwZSA9ICdqc29uJ1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICQuYWpheChvcHRpb25zKTtcclxuICAgIH0pXHJcbiAgICBcclxufVxyXG5cclxuLy8g5Li76KaB6K+35rGC5pa55rOVXHJcbi8vIGV4cG9ydCAgZnVuY3Rpb24gcmVxdWVzdE9yaWdpbihjb25maWcpIHtcclxuXHJcbi8vICAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuLy8gICAgIGNvbnN0IHVpID0gVVAuVy5VSTtcclxuLy8gICAgIGNvbnN0IGVudiA9IFVQLlcuRW52O1xyXG5cclxuLy8gICAgIGxldCB7bWV0aG9kLCB1cmwsIGRhdGEgPSB7fSwgaGVhZGVycywgZm9yQ2hzcCwgZW5jcnlwdCwgYnlBamF4LCBjYWNoZSwgdXBkYXRlLCBzdG9yYWdlfSA9IGNvbmZpZztcclxuXHJcbi8vICAgICBtZXRob2QgPSAobWV0aG9kICYmIG1ldGhvZC50b1VwcGVyQ2FzZSgpKSB8fCAnR0VUJztcclxuXHJcbi8vICAgICBsZXQgc2VydmVyVXJsID0gZ2V0U2VydlVybCh1cmwpO1xyXG5cclxuLy8gICAgIC8vIGxldCBzZXJ2ZXJVcmwgPSBiYXNlVXJsIDtcclxuLy8gICAgIC8vIGlmICh0cnVlKSB7XHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOmAmui/h+aPkuS7tuWPkemAgeivt+axglxyXG4vLyAgICAgICovXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDlkJHmnI3liqHlmajlj5HpgIHor7fmsYJcclxuLy8gICAgICAqIEBwYXJhbSBwYXJhbXMg6K+35rGC5Y+C5pWwXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIHZlcnNpb27vvJrniYjmnKzvvIzpu5jorqTmmK8xLjBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgc291cmNl77ya5p2l5rqQ77yM6buY6K6k5qC55o2uQW5kcm9pZOOAgWlPU+iHquWKqOa3u+WKoFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBlbmNyeXB077ya5piv5ZCm5Yqg5a+G77yM6buY6K6k5Yqg5a+GXHJcbi8vICAgICAgKiAgICAgICAgICAgICAgICAgIG1ldGhvZO+8muivt+axguaWueazle+8jFBPU1TmiJZHRVRcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgY21k77ya6K+35rGC5ZG95Luk77yI5Lmf5Y+v6Ieq6KGM5bCGY21k57uE6KOF6IezdXJpW+S8mOaDoOWQjuWPsF3miJZwYXRoW+mSseWMheWQjuWPsF3vvIlcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdXJpL3BhdGjvvJror7fmsYLlnLDlnYDvvIzlu7rorq7ku4XloavlhYVjbWTvvIzkuI3lu7rorq7oh6rooYznu4Too4V1cmkvcGF0aFxyXG4vLyAgICAgICogICAgICAgICAgICAgICAgICBwYXJhbXPvvJrlj5HpgIHnu5nlkI7lj7DnmoTlj4LmlbBcclxuLy8gICAgICAqICAgICAgICAgICAgICAgICAgdmlk77ya5aaC5p6c6YCa6L+HQWpheOaWueW8j+WQkXdhbGxldOWQjuWPsOWPkemAgeivt+axgumcgOimgeaQuuW4pnZpZFxyXG4vLyAgICAgICogQHBhcmFtIGZvckNoc3Ag5piv5ZCm5ZCR5LyY5oOg5ZCO5Y+w5Y+R6YCB6K+35rGC77yI6buY6K6k5ZCR5omL5py65ZCO5Y+w5Y+R6YCB6K+35rGC77yJXHJcbi8vICAgICAgKiBAcGFyYW0gYnlBamF4IOaYr+WQpuS9v+eUqEFqYXjlj5HpgIHor7fmsYLvvIjpu5jorqTkvb/nlKjmjqfku7bvvIlcclxuLy8gICAgICAqIEBwYXJhbSBzdWNjZXNzIOaIkOWKn+Wbnuiwg1xyXG4vLyAgICAgICogQHBhcmFtIGVycm9yIOmUmeivr+Wbnuiwg++8iOS4muWKoemUmeivr++8iVxyXG4vLyAgICAgICogQHBhcmFtIGZhaWwg5aSx6LSl5Zue6LCD77yI6K+35rGC5aSx6LSl77yJXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbi8vICAgICAgICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG5cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBzdWNjZXNzQ2FsbGJhY2sgPSAoZGF0YSxmdWMpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIHVpLmRpc21pc3MoKTtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+U5Zue5oiQ5Yqf57uT5p6c77yaXCIpXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJlc3BvbnNlRm9ybWF0dGVyKGRhdGEpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWYoICEhZnVjICl7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVxLmZ1YyA9IGZ1YztcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIHJlc29sdmUocmVxKVxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgZXJyb3JDYWxsYmFjayA9IChlcnIpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+U5Zue5aSx6LSl57uT5p6c77yaXCIpXHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHVybCA9PSBDT05GSUcuUkVTVC5hcHBseU1jYyB8fCB1cmwgPT0gQ09ORklHLlJFU1QuYXBwbHlNYXQgfHwgdXJsID09IENPTkZJRy5SRVNULnRvZGF5TW9uZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBsZXQgcmVxID0gcmVzcG9uc2VGb3JtYXR0ZXIoZXJyKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcSlcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIFRvYXN0LmluZm8oZXJyLm1zZyB8fCAn5p+l6K+i5Lia5Yqh6KaB57Sg5Ye66ZSZ77yM6K+356iN5ZCO5YaN6K+V77yBJyk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBuZXR3b3JrQ2FsbGJhY2sgPSAoeGhyKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbi8vICAgICAgICAgICAgICAgICBUb2FzdC5pbmZvKHhoci5tc2cpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKHVybCAhPSBDT05GSUcuUkVTVC5nZXRUb2RheUluY29tZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdWkuc2hvd0xvYWRpbmcoKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKCFjYWNoZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVcmw6XCIgKyB1cmwpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBhcmFtOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coe1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBtZXRob2Q6IG1ldGhvZCxcclxuLy8gICAgICAgICAgICAgICAgIC8vICAgICBlbmNyeXB0OiBlbmNyeXB0LFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIGZvckNoc3A6IGZvckNoc3AsXHJcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgYnlBamF4OiBieUFqYXhcclxuLy8gICAgICAgICAgICAgICAgIC8vIH0pXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWPkemAgemdnue8k+WtmOivt+axglwiKVxyXG4vLyAgICAgICAgICAgICAgICAgYXBwLnNlbmRNZXNzYWdlKFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVyaTpzZXJ2ZXJVcmwgKyB1cmwsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZGF0YSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGVuY3J5cHRcclxuLy8gICAgICAgICAgICAgICAgICAgICB9LCBmb3JDaHNwLCBieUFqYXgsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgbmV0d29ya0NhbGxiYWNrKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2FjaGVVcmw6XCIgKyB1cmwpXHJcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN0b3JlYWdl562W55Wl5pivOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3RvcmFnZSlcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXBkYXRl5Ye95pWwOlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXBkYXRlKVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHnvJPlrZjor7fmsYJcIilcclxuLy8gICAgICAgICAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAgICAgICAgICog5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gcGFyYW1zIOivt+axguWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2ZXJzaW9u77ya54mI5pys77yM6buY6K6k5pivMS4wXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNvdXJjZe+8muadpea6kO+8jOm7mOiupOagueaNrkFuZHJvaWTjgIFpT1Poh6rliqjmt7vliqBcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgZW5jcnlwdO+8muaYr+WQpuWKoOWvhu+8jOm7mOiupOWKoOWvhlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBtZXRob2TvvJror7fmsYLmlrnms5XvvIxQT1NU5oiWR0VUXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGNtZO+8muivt+axguWRveS7pO+8iOS5n+WPr+iHquihjOWwhmNtZOe7hOijheiHs3VyaVvkvJjmg6DlkI7lj7Bd5oiWcGF0aFvpkrHljIXlkI7lj7Bd77yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHVyaS9wYXRo77ya6K+35rGC5Zyw5Z2A77yM5bu66K6u5LuF5aGr5YWFY21k77yM5LiN5bu66K6u6Ieq6KGM57uE6KOFdXJpL3BhdGhcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgcGFyYW1z77ya5Y+R6YCB57uZ5ZCO5Y+w55qE5Y+C5pWwXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHZpZO+8muWmguaenOmAmui/h0FqYXjmlrnlvI/lkJF3YWxsZXTlkI7lj7Dlj5HpgIHor7fmsYLpnIDopoHmkLrluKZ2aWRcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBmb3JDaHNwIOaYr+WQpuWQkeS8mOaDoOWQjuWPsOWPkemAgeivt+axgu+8iOm7mOiupOWQkeaJi+acuuWQjuWPsOWPkemAgeivt+axgu+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIGJ5QWpheCDmmK/lkKbkvb/nlKhBamF45Y+R6YCB6K+35rGC77yI6buY6K6k5L2/55So5o6n5Lu277yJXHJcbi8vICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gc3VjY2VzcyDmiJDlip/lm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBlcnJvciDplJnor6/lm57osIPvvIjkuJrliqHplJnor6/vvIlcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBmYWlsIOWksei0peWbnuiwg++8iOivt+axguWksei0pe+8iVxyXG4vLyAgICAgICAgICAgICAgICAgICogQHBhcmFtIHVwZGF0ZSDlvILmraXliLfmlrDlm57osIMg5aaC5p6c6K6+572uYXN5bmPkuLp0cnVl5ZCO5Y+v5Lul5re75YqgdXBkYXRl5Zue6LCDIOWmguaenOS4jeWhq+WGmem7mOiupOS7pXN1Y2Nlc3Pov5vooYzlpITnkIZcclxuLy8gICAgICAgICAgICAgICAgICAqIEBwYXJhbSBzdG9yYWdlIOe8k+WtmOWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBuZWVkU3cgICAgICAgICAgICAvL+m7mOiupGZhbHNl5aSn6YOo5YiG55So55qE5piv5o+S5Lu26ZyA6KaB55qE5omL5Yqo5Y675YqgXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHN0b3JhZ2VUeXBlICAgICAgLy/pu5jorqTkvb/nlKhsb2NhbHN0b3JhZ2VcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgYXN5bmMgICAgICAgICAgICAvL+m7mOiupOiOt+WPlue8k+WtmOWQjuS4jeWPkeivt+axgu+8jOaUueS4unRydWXlkI7kvJrlvILmraXljrvor7fmsYLlkI7lj7DlubbliLfmlrDmlbDmja5cclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgZW5kT2ZTeW5jRnVuYyAgICAvL3RvZG8g6YeN6KaB77yB77yB77yB77yB5Zue6LCD5Lit5aaC5p6c5a2Y5Zyo5byC5q2l77yI5o+S5Lu2562J77yJ6ZyA6KaB5qCH5piO5byC5q2l54q25oCB5Li6dHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICB2YWxpZGF0ZVRpbWUgICAgIC8v5pyJ5pWI5pyf6buY6K6k5peg6ZmQ5pyJ5pWI5pyfIOWNleS9jeavq+enklxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlV2l0aElkICAgICAgIC8v6buY6K6kdHJ1ZeS7peeUqOaIt2lk6L+b6KGM5a2Y5YKo5ZCm5YiZZmFsc2Xku6Vsb2NhbOWtmOWCqFxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzYXZlU3VjYyAgICAgICAgIC8v5L+d5a2Y5oiQ5Yqf5ZCO55qE5Zue6LCDXHJcbi8vICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHNhdmVFcnIgICAgICAgICAgLy/kv53lrZjlpLHotKXlkI7nmoTlm57osINcclxuLy8gICAgICAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgcm9sbEtleSAgICAgICAgICAvL+W8uuWItuiuvue9ruS4u+mUrlxyXG4vLyAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICBzZWNvbmRLZXkgICAgICAgIC8v5by65Yi26K6+572u5qyh6KaB6ZSu5YC8XHJcbi8vICAgICAgICAgICAgICAgICAgKiAgdG9kbyDph43opoHor7TmmI4g6LCD55So5byC5q2l5qih5byP77yIYXN5bmPorr7nva7kuLp0cnVl77yJ5ZCO5Y+v6IO95Zyoc3VjY2Vzc+Wbnuiwg+mHjOWtmOWcqOW8guatpeaTjeS9nO+8jOivpeaDheWGteS4i+WbnuWvvOiHtOe8k+WtmOeahOWbnuiwg+WPr+iDvVxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g5pyq5omn6KGM5a6M5oiQ77yM6K+35rGC55qE5Zue6LCD5Y+I5byA5aeL5omn6KGM5LqG55qE5oOF5Ya177yM5omA5Lul5oiR5Lus57uf5LiA5Zyoc3VjY2Vzc+Wbnuiwg+WSjHVwZGF0ZeWbnuiwg+eahOWFpeWPguWinuWKoOS6huesrOS6jOS4quWPguaVsFxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g55So5LqO5YW85a655Zue6LCD5YaF5YyF5ZCr5byC5q2l55qE54q25Ya177yM5L2/55So5pa55rOV5Li677ya6aaW5YWI6K6+572uZW5kT2ZTeW5jRnVuY+WPguaVsOS4unRydWUs5YW25qyhc3VjY2Vzc+WSjHVwZGF0ZeWbnlxyXG4vLyAgICAgICAgICAgICAgICAgICogIHRvZG8g6LCD5YaF5Lya5pyJMuS4quWFpeWPgu+8jHN1Y2Nlc3PvvIhyZXNw77yMZnVj77yJ77yM6K+35Zyo5Luj56CB6Zet5YyF5aSE5L2/55SoZnVjLmVuZE9mRnVuYygpXHJcbi8vICAgICAgICAgICAgICAgICAgKi9cclxuXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgcGFyYW0gPSB7fVxyXG5cclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoYnlBamF4KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFyYW0gPSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHNlcnZlclVybCArIHVybCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY21kOiBcImxpZmUvbGlmZVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFyYW0gPSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNtZDogc2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cmk6c2VydmVyVXJsICsgdXJsLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGFwcC5zZW5kTWVzc2FnZVdpdGhTdG9yYWdlKHBhcmFtLCBmb3JDaHNwLCBieUFqYXgsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgbmV0d29ya0NhbGxiYWNrLCBzdG9yYWdlLCB1cGRhdGUpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICB9KVxyXG5cclxuXHJcbi8vICAgICAvLyB9XHJcbi8vICAgICAvLyBlbHNlIHtcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOmAmui/h0FqYXgg5Y+R6YCB6K+35rGCXHJcbi8vICAgICAgKi9cclxuLy8gICAgIC8vIHJldHVybiBheGlvcyh7XHJcbi8vICAgICAvLyAgICAgdXJsOiBiYXNlVXJsICsgdXJsLFxyXG4vLyAgICAgLy8gICAgIG1ldGhvZCxcclxuLy8gICAgIC8vICAgICBoZWFkZXJzLFxyXG4vLyAgICAgLy8gICAgIGRhdGE6IG1ldGhvZCA9PT0gJ0dFVCcgPyB1bmRlZmluZWQgOiBkYXRhLFxyXG4vLyAgICAgLy8gICAgIHBhcmFtczogT2JqZWN0LmFzc2lnbihtZXRob2QgPT09ICdHRVQnID8gZGF0YSA6IHt9LCBwYXJhbXMpXHJcbi8vICAgICAvLyB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4vLyAgICAgLy9cclxuLy8gICAgIC8vICAgICBsZXQgcmVxID0ge1xyXG4vLyAgICAgLy8gICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5kYXRhLnJlc3AsXHJcbi8vICAgICAvLyAgICAgICAgIGRhdGE6IHJlc3BvbnNlLmRhdGEucGFyYW1zXHJcbi8vICAgICAvLyAgICAgfVxyXG4vLyAgICAgLy8gICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVxKVxyXG4vLyAgICAgLy8gfSkuY2F0Y2goZXJyID0+IHtcclxuLy8gICAgIC8vICAgICAvLyDor7fmsYLlh7rplJlcclxuLy8gICAgIC8vICAgICBUb2FzdC5pbmZvKCdyZXF1ZXN0IGVycm9yLCBIVFRQIENPREU6ICcgKyBlcnIucmVzcG9uc2Uuc3RhdHVzKTtcclxuLy8gICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcclxuLy8gICAgIC8vIH0pO1xyXG4vLyAgICAgLy8gfVxyXG5cclxuLy8gfVxyXG5cclxuLy8g5LiA5Lqb5bi455So55qE6K+35rGC5pa55rOVXHJcbmV4cG9ydCBjb25zdCBnZXQgPSAodXJsLCBkYXRhLCBwYXJhbSA9IHt9KSA9PiB7XHJcbiAgICBsZXQgcGFyYW1BbGwgPSBPYmplY3QuYXNzaWduKHtmb3JDaHNwOiB0cnVlLCBlbmNyeXB0OiB0cnVlLCBjYWNoZTogZmFsc2UsIGJ5QWpheDogZmFsc2V9LCBwYXJhbSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdChPYmplY3QuYXNzaWduKHt1cmwsIGRhdGF9LCBwYXJhbUFsbCkpXHJcbn07XHJcbmV4cG9ydCBjb25zdCBwb3N0ID0gKHVybCwgZGF0YSwgcGFyYW0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IHBhcmFtQWxsID0gT2JqZWN0LmFzc2lnbih7Zm9yQ2hzcDogdHJ1ZSwgZW5jcnlwdDogdHJ1ZSwgY2FjaGU6IGZhbHNlLCBieUFqYXg6IGZhbHNlfSwgcGFyYW0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QoT2JqZWN0LmFzc2lnbih7bWV0aG9kOiAnUE9TVCcsIHVybCwgZGF0YX0sIHBhcmFtQWxsKSlcclxufTtcclxuZXhwb3J0IGNvbnN0IHB1dCA9ICh1cmwsIGRhdGEpID0+IHJlcXVlc3Qoe21ldGhvZDogJ1BVVCcsIHVybCwgZGF0YX0pO1xyXG5leHBvcnQgY29uc3QgZGVsID0gKHVybCwgZGF0YSkgPT4gcmVxdWVzdCh7bWV0aG9kOiAnREVMRVRFJywgdXJsLCBkYXRhfSk7XHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICog5Yqf6IO95Ye95pWw5Yy6XHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICog5bCGVVJM5Lit55qEc2VhcmNoIOWtl+espuS4siDovazmjaLmiJAg5a+56LGhXHJcbiAqIEBwYXJhbSBzZWFyY2hcclxuICogQHJldHVybnMge3t9fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldFNlYXJjaFBhcmFtID0gKHNlYXJjaCkgPT4ge1xyXG4gICAgaWYgKCEhc2VhcmNoKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IHNlYXJjaC5zbGljZSgxKTtcclxuICAgICAgICBsZXQgYXJyYXkgPSBzdHIuc3BsaXQoXCImXCIpO1xyXG4gICAgICAgIGxldCBvYmogPSB7fTtcclxuICAgICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbSA9IGl0ZW0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICBvYmpbcGFyYW1bMF1dID0gcGFyYW1bMV07XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICogY29kb3ZhIOaPkuS7tuiwg+eUqOWMulxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcblxyXG4vLyDlkK/lgZzmlLbmrL7noIFcclxuZXhwb3J0IGZ1bmN0aW9uIHNldFhpYW9XZWlQYXkocGFyYW0sIHN1YywgZXJyKSB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5zZXRYaWFvV2VpUGF5KHBhcmFtLCBzdWMsIGVycik7XHJcbn1cclxuXHJcbi8v5bCP5b6uYXVkaW9cclxuZXhwb3J0IGNvbnN0IHNldFhpYW9XZWlBdWRpbyA9IChwYXJhbSwgc3VjLCBlcnIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLnNldFhpYW9XZWlBdWRpbyhwYXJhbSwgc3VjLCBlcnIpO1xyXG59XHJcbmV4cG9ydCBjb25zdCBnZXRYaWFvV2VpQXVkaW8gPSAoc3VjLCBlcnIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLmdldFhpYW9XZWlBdWRpbyhzdWMsIGVycik7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0b2FzdCA9IChtcykgPT4ge1xyXG4gICAgVG9hc3QuaW5mbyhtcywgMik7XHJcbn1cclxuLyoqXHJcbiAqIOiuvue9rumhtumDqGJhclxyXG4gKiBAcGFyYW0gdGl0bGUg6aG16Z2i5ZCN56ewXHJcbiAqIEBwYXJhbSByaWdodEJhciDlj7PkvqfmjInpkq7lkI3np7BcclxuICogQHBhcmFtIHJpZ2h0Q2FsbGJhY2sg5Y+z5L6n5oyJ6ZKu5Zue6LCDXHJcbiAqIEBwYXJhbSByaWdodEJhckltZyDlj7PkvqfmjInpkq7lm77niYdcclxuICovXHJcbmV4cG9ydCBjb25zdCBiZWZvcmVFbnRlclJvdXRlciA9ICh0aXRsZSA9IFwiXCIsIHJpZ2h0QmFyID0gXCJcIiwgcmlnaHRDYWxsYmFjayA9IG51bGwsIHJpZ2h0QmFySW1nID0gbnVsbCkgPT4ge1xyXG4gICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUodGl0bGUpXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u56qX5Y+j5Y+z5L6n5oyJ6ZKuXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlIOWbvuagh+agh+mimFxyXG4gICAgICAgICAqIEBwYXJhbSBpbWFnZSDlm77moIfmlofku7ZcclxuICAgICAgICAgKiBAcGFyYW0gaGFuZGxlciDngrnlh7vlm57osIPlh73mlbBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoISFyaWdodENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGFwcC5zZXROYXZpZ2F0aW9uQmFyUmlnaHRCdXR0b24ocmlnaHRCYXIsIHJpZ2h0QmFySW1nLCByaWdodENhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXBwLnNldE5hdmlnYXRpb25CYXJSaWdodEJ1dHRvbihcIlwiLCBudWxsLCBudWxsKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIOmAmuefpeWuouaIt+err+S/ruaUueeKtuaAgVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1jY1N0YXRlQ2hhbmdlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5tY2NTdGF0ZUNoYW5nZWQoKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNlbmRRckNvZGUgPSAocGFyYW1zLCBzdWNjZXNzLCBmYWlsKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KCgpID0+IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmiavmj4/mnaHnoIHlkozkuoznu7TnoIFcclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3NcclxuICAgICAgICAgKiBAcGFyYW0gZmFpbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcC5zY2FuUVJDb2RlKHBhcmFtcywgc3VjY2VzcywgZmFpbClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjbG9zZVdlYlZpZXcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5jbG9zZVdlYlZpZXcoKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHZlcmlmeVBheVB3ZCA9IChwYXJhbSwgc3VjY2VzcywgZmFpbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAudmVyaWZ5UGF5UHdkKHBhcmFtLCBzdWNjZXNzLCBmYWlsKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVdlYlZpZXcgPSAodXJsLCBwYXJhbXMgPSBudWxsLCB0aXRsZSA9ICcnLCBpc0ZpbmlzaCA9IFwiMVwiKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5jcmVhdGVXZWJWaWV3KHVybCwgcGFyYW1zLCB0aXRsZSwgaXNGaW5pc2gpXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFVzZXJEZXRhaWxJbmZvID0gKHN1Y2Nlc3MsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIGFwcC5nZXRVc2VyRGV0YWlsSW5mbyhzdWNjZXNzLCBmYWlsKVxyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog5bCGY2F2YXMg5L+d5a2Y5Yiw5pys5Zyw55u45YaMXHJcbiAqIEBwYXJhbSBjYW52YXNcclxuICovXHJcbmV4cG9ydCBjb25zdCBzYXZlUWNvZGUgPSAoY2FudmFzKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIHZhciB1aSA9IFVQLlcuVUkgfHwge307XHJcbiAgICB2YXIgcGljVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFwcC5sb2dFdmVudCgnc2F2ZVBpY3R1cmVfTmV3WWVhckFjdCcpO1xyXG4gICAgICAgIGFwcC5zYXZlUGljVG9Mb2NhbCh7XHJcbiAgICAgICAgICAgIHVybDogcGljVXJsICYmIHBpY1VybC5zdWJzdHIoMjIpXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB1aS5zaG93VG9hc3RXaXRoUGljKCflt7Lkv53lrZjliLDns7vnu5/nm7jlhownKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgIGlmIChtc2cgPT0gJ3VwZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dBbGVydCgn6K+35Y2H57qn5Yiw5pyA5paw5a6i5oi356uvJywgZnVuY3Rpb24gKCkgeyAvLyDljrvljYfnuqdcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ1llcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW52LmlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL2l0dW5lcy5hcHBsZS5jb20vY24vYXBwL2lkNjAwMjczOTI4P2NvZGU9bmV3WWVhckFjdGl2aXR5JztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b3VodWkuOTU1MTYuY29tL2FwcC9hcHAvc29mdHdhcmUvdW5pb25wYXktd2FsbGV0LXYyLmFwaz9jb2RlPW5ld1llYXJBY3Rpdml0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLm9wZW5Ccm93c2VyKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdObycpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ+mprOS4iuWNh+e6pycsICfnqI3lkI7lho3or7QnLCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93VG9hc3QobXNnIHx8ICfkv53lrZjlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2hhcmUgPSAodGl0bGUsIGRlc2MsIGltZ1VSTCwgcGFnZVVSbCkgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICB2YXIgZW52ID0gVVAuVy5FbnYgfHwge307XHJcblxyXG4gICAgYXBwLm9uUGx1Z2luUmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmmL7npLrliIbkuqvpnaLmnb9cclxuICAgICAgICAgKiDlpoLmnpzmiYDmnInmuKDpgZPkvb/nlKjnm7jlkIznmoTliIbkuqvlhoXlrrnliJnku4XloavlhplwYXJhbXPljbPlj6/vvIxcclxuICAgICAgICAgKiDlpoLmnpzpnIDopoHmoLnmja7kuI3lkIzmuKDpgZPlrprliLbliIbkuqvlhoXlrrnvvIzliJnlj69wYXJhbXPnlZnnqbrvvIzlnKhzaGFyZUNhbGxiYWNr5Lit6L+U5Zue5oyH5a6a5rig6YGT55qE5YiG5Lqr5YaF5a65XHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtcyDliIbkuqvlj4LmlbBcclxuICAgICAgICAgKiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgdGl0bGXvvJog5YiG5Lqr5qCH6aKYXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBkZXNjOiDliIbkuqvmkZjopoFcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIHBpY1VybO+8muWIhuS6q+Wbvuagh1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgc2hhcmVVcmzvvJror6bmg4XlnLDlnYBcclxuICAgICAgICAgKiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAqIEBwYXJhbSBzaGFyZUNhbGxiYWNrIOWIhuS6q+aXtuWbnuiwg1xyXG4gICAgICAgICAqICAgICAgICAgICAgICBjaGFubmVs77yae1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgMO+8muefreS/oVxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgMe+8muaWsOa1quW+ruWNmlxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgM++8muW+ruS/oeWlveWPi1xyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNO+8muW+ruS/oeaci+WPi+WciFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgNe+8mlFR5aW95Y+LXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICA277yaUVHnqbrpl7RcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDfvvJrlpI3liLbpk77mjqVcclxuICAgICAgICAgKiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAqICAgICAgICAgICAgICBkYXRhOiDpu5jorqTliIbkuqvmlbDmja5cclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuc2hvd1NoYXJlUGFuZWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIGRlc2M6IGRlc2MsXHJcbiAgICAgICAgICAgIHBpY1VybDogaW1nVVJMLFxyXG4gICAgICAgICAgICBzaGFyZVVybDogcGFnZVVSbCAgLy8gdG9kbyDmma7pgJrliIbkuqtcclxuICAgICAgICB9LCBudWxsKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfnmoTlrprkvY3vvIzpppblhYjpgJrov4dHUFMg5a6a5L2N77yM5aaC5p6c5a6a5L2N5aSx6LSl77yM6YCa6L+H5o6l5Y+jZ2V0Q2l0eSzliKnnlKhJUOWcsOWdgOi/m+ihjOWumuS9je+8jOWmguaenOi/mOaYr+Wksei0pe+8jOmAmui/h+aPkuS7tuiOt+WPluWuouaIt+err+W3puS4iuinkueahOWfjuW4guS/oeaBr++8jOS+neeEtuWksei0pem7mOiupOepv2NpdHlDZDozMTAwMDAg5Luj6KGo5LiK5rW35biCXHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRMb2NhdGlvbkluZm8gPSAoY2FsbGJhY2syKSA9PiB7XHJcbiAgICBjb25zdCB1aSA9IFVQLlcuVUk7XHJcbiAgICB1aS5zaG93TG9hZGluZygpO1xyXG4gICAgbGV0IGNhbGxiYWNrID0gKGRhdGEpID0+IHtcclxuICAgICAgICB1aS5kaXNtaXNzKCk7XHJcbiAgICAgICAgY2FsbGJhY2syKGRhdGEpXHJcbiAgICB9XHJcbiAgICBjb25zdCBhcHAgPSBVUC5XLkFwcDtcclxuICAgIGFwcC5vblBsdWdpblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhcHAuZ2V0Q3VycmVudExvY2F0aW9uSW5mbygoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBhbGVydChKU09OLnN0cmluZ2lmeShkYXRhKSlcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9LCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBhcHAuc2VuZE1lc3NhZ2UoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY21kOiBcIi9cIiArIENPTkZJRy5SRVNULmdldENpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGF0aDogXCJodHRwOi8vMTcyLjIxLjMzLjU2OjM2MDAwL3lvdWh1aS13ZWIvcmVzdGxldC9cIitDT05GSUcuUkVTVC5nZXRDaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcIjIuMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IFwiMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHRydWUsIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhLnBhcmFtcylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hOYXRpdmVEYXRhKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaE5hdGl2ZURhdGEoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoTmF0aXZlRGF0YSA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gVVAuVy5BcHA7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluWuouaIt+err+S/oeaBr1xyXG4gICAgICAgICAqIEBwYXJhbSBzdWNjZXNzXHJcbiAgICAgICAgICogQHBhcmFtIGZhaWxcclxuICAgICAgICAgKiBAcGFyYW0gdHlwZSAw77ya5Z+O5biC5L+h5oGvY2l0eUNk77ybMe+8mue7j+e6rOW6pu+8mzXvvJpVc2VySWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHAuZmV0Y2hOYXRpdmVEYXRhKDAsIChkYXRhID0ge30pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgICAgICAgIGNpdHlDZDogXCIzMTAwMDBcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcbmV4cG9ydCBjb25zdCBzYXZlUGljVG9Mb2NhbCA9IChjYW52YXMsIHJlc29sdmUpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IFVQLlcuQXBwO1xyXG4gICAgdmFyIHVpID0gVVAuVy5VSSB8fCB7fTtcclxuICAgIHZhciBwaWNVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICBhcHAub25QbHVnaW5SZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLnNhdmVQaWNUb0xvY2FsKHtcclxuICAgICAgICAgICAgdXJsOiBwaWNVcmwgJiYgcGljVXJsLnN1YnN0cigyMilcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8v5oiQ5YqfXHJcbiAgICAgICAgICAgICEhcmVzb2x2ZSAmJiByZXNvbHZlKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICB9LCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cgPT0gJ3VwZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNob3dBbGVydCgn6K+35Y2H57qn5Yiw5pyA5paw5a6i5oi356uvJywgZnVuY3Rpb24gKCkgeyAvLyDljrvljYfnuqdcclxuICAgICAgICAgICAgICAgICAgICBhcHAubG9nRXZlbnQoJ3VwZGF0ZV9zaWduQWN0JywgJ1llcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW52LmlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL2l0dW5lcy5hcHBsZS5jb20vY24vYXBwL2lkNjAwMjczOTI4P2NvZGU9bmV3WWVhckFjdGl2aXR5JztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b3VodWkuOTU1MTYuY29tL2FwcC9hcHAvc29mdHdhcmUvdW5pb25wYXktd2FsbGV0LXYyLmFwaz9jb2RlPW5ld1llYXJBY3Rpdml0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLm9wZW5Ccm93c2VyKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmxvZ0V2ZW50KCd1cGRhdGVfc2lnbkFjdCcsICdObycpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ+mprOS4iuWNh+e6pycsICfnqI3lkI7lho3or7QnLCAn5L+d5a2Y5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAhIXJlc29sdmUgJiYgcmVzb2x2ZShcImZhaWxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVUZXh0Q2FudmFzZSA9ICh0ZXh0LCBjb2xvciwgbG9uZyA9IDY4NCwgc2hvdCA9IDYwKSA9PiB7XHJcblxyXG4gICAgbGV0IHJlbTJweCA9ICh2YWwpID0+IHtcclxuICAgICAgICB2YXIgY1dpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcbiAgICAgICAgcmV0dXJuIHZhbCAqIGNXaWR0aCAvIDc1MFxyXG4gICAgfVxyXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Q2FudmFzJyk7XHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgLy/oqK3nva7nlavkvYjnmoTlr6zpq5hcclxuICAgIC8vIHZhciBiZ1dpZHRoID0gcmVtMnB4KGxvbmcpO1xyXG4gICAgLy8gdmFyIGJnSGVpZ2h0ID0gcmVtMnB4KHNob3QpO1xyXG5cclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgc2hvdCk7XHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBsb25nKTtcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBjdHgucm90YXRlKC05MCAqIE1hdGguUEkgLyAxODApO1xyXG4gICAgdmFyIHRleHQgPSB0ZXh0O1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcclxuICAgIGxldCBmb250U2l6ZSA9IHNob3Q7XHJcbiAgICBjdHguZm9udCA9IGZvbnRTaXplICsgJ3B4IEFpcmFsJztcclxuICAgIHdoaWxlIChjdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGggPiBsb25nKSB7XHJcbiAgICAgICAgZm9udFNpemUtLTtcclxuICAgICAgICBjdHguZm9udCA9IGZvbnRTaXplICsgJ3B4IEFpcmFsJztcclxuICAgIH1cclxuICAgIGN0eC5maWxsVGV4dCh0ZXh0LCAtbG9uZywgZm9udFNpemUpO1xyXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog55Sf5oiQ5Zu+54mH5bm25L+d5a2Y5Yiw55u45YaMXHJcbiAqIEBwYXJhbSBiZ3VybCDog4zmma/lm77niYfnmoTlnLDlnYBcclxuICogQHBhcmFtIHFyY29kZVVSTCDkuoznu7TnoIHnmoTlnLDlnYBcclxuICogQHBhcmFtIHFyY29kZVdkQW5kSGcg5LqM57u056CB55qE5a695bqmXHJcbiAqIEBwYXJhbSB4V2lkdGgg5LqM57u056CB6Led56a75bem5LiK6KeS55qEIOKGkiDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHlIZWlnaHQg5LqM57u056CB6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHRleHRiZ1VSTCDliqDlhaXnlLvluIPnmoTlm77niYfnmoRVUkxcclxuICogQHBhcmFtIHhUZXh0V2lkdGgg5Yqg5YWl55S75biD55qE5Zu+54mH6Led56a75bem5LiK6KeS55qEIOKGkyDmlrnlkJHnmoTlgY/np7vph49cclxuICogQHBhcmFtIHlUZXh0SGVpZ2h0IOWKoOWFpeeUu+W4g+eahOWbvueJh+i3neemu+W3puS4iuinkueahCDihpMg5pa55ZCR55qE5YGP56e76YePXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnZhc0FuZFNhdmVQaG90byA9IChjYW52YXNPYmosIHJlc29sdmUpID0+IHtcclxuICAgIGxldCB7Ymd1cmwsIHFyY29kZVVSTCwgcXJjb2RlV2RBbmRIZywgeFdpZHRoLCB5SGVpZ2h0LCB0ZXh0YmdVUkwsIHhUZXh0V2lkdGgsIHlUZXh0SGVpZ2h0fSA9IGNhbnZhc09iajtcclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbW9uQ2FudmFzV3JhcHBlcicpO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTnlLvluIPlhoXlrrlcclxuICAgICAqL1xyXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoXHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuc3JjID0gYmd1cmw7XHJcbiAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvL+ioree9rueVq+S9iOeahOWvrOmrmFxyXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgaW1nLndpZHRoKTtcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBpbWcuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy/lnKjnlavluIPkuIrnlavog4zmma/lnJZcclxuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XHJcblxyXG4gICAgICAgIGlmICghIXRleHRiZ1VSTCkge1xyXG4gICAgICAgICAgICBsZXQgdGV4dFVyaSA9IHRleHRiZ1VSTDtcclxuICAgICAgICAgICAgdmFyIHRleHRJbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgdGV4dEltZy5zcmMgPSB0ZXh0VXJpO1xyXG4gICAgICAgICAgICB0ZXh0SW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGV4dEltZywgeFRleHRXaWR0aCwgeVRleHRIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S6jOe2reeivOWclueJh+Wkp+Wwj1xyXG4gICAgICAgIHZhciBxcmNvZGVXaWR0aEFuZEhlaWdodCA9IHFyY29kZVdkQW5kSGc7XHJcbiAgICAgICAgLy/muIXpmaTkuoznu7TnoIFcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHZhciBxcmNvZGUgPSBuZXcgUVJDb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbW9uUXJjb2RlXCIpLCB7XHJcbiAgICAgICAgICAgIHRleHQ6IHFyY29kZVVSTCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBxcmNvZGVXaWR0aEFuZEhlaWdodCxcclxuICAgICAgICAgICAgd2lkdGg6IHFyY29kZVdpZHRoQW5kSGVpZ2h0LFxyXG4gICAgICAgICAgICBjb3JyZWN0TGV2ZWw6IFFSQ29kZS5Db3JyZWN0TGV2ZWwuTFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBxcmNvZGVJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1vblFyY29kZVwiKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF07XHJcbiAgICAgICAgcXJjb2RlSW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy/nlavkuozntq3norznmoTlnJbniYdcclxuICAgICAgICAgICAgbGV0IHFyY29kZUR4ID0geFdpZHRoLCBxcmNvZGVEeSA9IHlIZWlnaHQ7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UocXJjb2RlSW1nLCBxcmNvZGVEeCwgcXJjb2RlRHkpO1xyXG4gICAgICAgICAgICAvLyByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIHNhdmVQaWNUb0xvY2FsKGNhbnZhcywgcmVzb2x2ZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9yZXF1ZXN0LmpzIiwiY29uc3QgY29uZmlnID0ge1xyXG4gICAgUkVTVDoge1xyXG4gICAgICAgIGFwcGx5TWNjOiBcImNvbGxlY3Rpb25Db2RlL2FwcGx5TWNjXCIsIC8vMi40LjTnlLPor7fmlLbmrL7noIHmjqXlj6NcclxuICAgICAgICBnZXRNY2NDYXJkTGlzdDogXCJjb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiLCAvLzIuNC4y5ZWG5oi35pS25qy+56CB5Y2h5YiX6KGo5o6l5Y+jXHJcbiAgICAgICAgYXBwbHlNYXQ6IFwiY29sbGVjdGlvbkNvZGUvYXBwbHlNYXRcIiwgLy/nlLPor7fnianmlpnmjqXlj6NcclxuICAgICAgICBnZXRNY2hudEFuZEFyZWFJbmY6IFwibWNobnQvZ2V0TWNobnRBbmRBcmVhSW5mLnNqc29uXCIsIC8v5ZWG5oi357G75Z6L5Y+K5Zyw5Yy65YiX6KGo5p+l6K+iXHJcbiAgICAgICAgdXBncmFkZU1jYzogXCJjb2xsZWN0aW9uQ29kZS91cGdyYWRlTWNjXCIsIC8vMi40LjbljYfnuqfmlLbmrL7noIHmjqXlj6MsXHJcbiAgICAgICAgZ2V0QWRkckxpc3Q6IFwiYWRkcmVzcy9nZXRBZGRyTGlzdFwiICwgLy8yLjQuMTMg6I635Y+W5pS26LSn5Zyw5Z2A5YiX6KGoXHJcbiAgICAgICAgZGVsZXRlQWRkcmVzczogXCJhZGRyZXNzL2RlbGV0ZUFkZHJlc3NcIiAsIC8vMi40LjEyIOWIoOmZpOaUtui0p+WcsOWdgFxyXG4gICAgICAgIGVkaXRBZGRyZXNzOiBcImFkZHJlc3MvZWRpdEFkZHJlc3NcIiwgLy8yLjQuMTEg5L+u5pS55pS26LSn5Zyw5Z2ALFxyXG4gICAgICAgIG5ld0FkZHJlc3M6IFwiYWRkcmVzcy9uZXdBZGRyZXNzXCIsIC8vMi40LjEwIOaWsOWinuaUtui0p+WcsOWdgFxyXG4gICAgICAgIG1jaG50T3BlciA6XCJtY2hudC9tY2hudE9wZXJcIiwgLy8yLjIuMiDlupfpk7rkv6Hmga/mm7TmlrBcclxuICAgICAgICBnZXRMaW1pdEF0SW5mbzpcIm1jaG50L2dldExpbWl0QXRJbmZvXCIsIC8v6I635Y+W5pS25qy+6ZmQ6aKdXHJcbiAgICAgICAgc2V0TWNjT25PZmY6XCJjb2xsZWN0aW9uQ29kZS9zZXRNY2NPbk9mZlwiLCAvL+WBnOatouWSjOWQr+eUqOS7mOasvueggeWAn+WPo1xyXG4gICAgICAgIGdldE1jaG50RGV0YWlsOlwibWNobnQvbWNobnREZXRhaWxcIiwgLy8yLjIuMSDojrflj5blupfpk7ror6bmg4XpobXpnaJcclxuICAgICAgICAvLyB1cGdyYWRlTWNjOiBcImNvbGxlY3Rpb25Db2RlL3VwZ3JhZGVNY2NcIiwgLy8yLjQuNuWNh+e6p+aUtuasvueggeaOpeWPo1xyXG4gICAgICAgIGdldFRvZGF5VHJhbnM6XCJ0cmFuL2dldFRvZGF5VHJhbnNcIiwvLzIuMS4zLy/ku4rml6XorqLljZXmjqXlj6NcclxuICAgICAgICBnZXRUb2RheUluY29tZTpcInRyYW4vZ2V0VG9kYXlJbmNvbWVcIiwvLzIuMS4x5ZWG5oi35pyN5Yqh6aaW6aG15LuK5pel5pS25qy+5o6l5Y+jfn5+fn5+fn5cclxuICAgICAgICBnZXRIaXN0b3J5SW5jb21lOlwidHJhbi9nZXRIaXN0b3J5SW5jb21lXCIsLy8yLjEuMuWOhuWPsuaUtuasvuaOpeWPo1xyXG4gICAgICAgIGdldEhpc3RvcnlUcmFuczpcInRyYW4vZ2V0SGlzdG9yeVRyYW5zXCIsLy8yLjEuNOWOhuWPsuiuouWNleaOpeWPo1xyXG4gICAgICAgIGdldExvZ2lzdGljc1N0OlwibWF0ZXJpZWwvZ2V0TG9naXN0aWNzU3RcIiwvLzIuMy4z54mp5rWB6K+m5oOF5o6l5Y+j5p+l6K+iXHJcbiAgICAgICAgZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bTpcInRyYW4vZ2V0VHJhbnNEZXRpbEJ5Vm91Y2hlck51bVwiLC8vMi4xLjXljZXnrJTorqLljZXmn6Xor6LmjqXlj6NcclxuICAgICAgICBnZXRBdWRpdEluZm86XCJjb2xsZWN0aW9uQ29kZS9nZXRBdWRpdEluZm9cIiwvLzIuNC4xNOS/oeeUqOWNoeWNh+e6p+WuoeaguOe7k+aenOafpeivolxyXG4gICAgICAgIHVwZGF0ZU1jY0NhcmQ6XCJjb2xsZWN0aW9uQ29kZS91cGRhdGVNY2NDYXJkXCIsLy8yLjQuOeabtOaNouaUtuasvuWNoeaOpeWPo1xyXG4gICAgICAgIGdldFVwZ3JhZGVTdDpcIm1jaG50L2dldFVwZ3JhZGVTdFwiLC8v5p+l6K+i5ZWG5oi35piv5ZCm5Y2H57qn5L+h55So5Y2h5pS25qy+XHJcbiAgICAgICAgZ2V0TWNjVHJhbnNOdW06J2NvbGxlY3Rpb25Db2RlL2dldE1jY1RyYW5zTnVtJywvL+iOt+WPluiwg+WPluaUr+S7mOaOp+S7tueahFRO5Y+3XHJcbiAgICAgICAgZ2V0TWF0ZXJpZWxJbmZvTGlzdDpcImNvbGxlY3Rpb25Db2RlL2dldE1hdGVyaWVsSW5mb0xpc3RcIiwvLzIuNC4z54mp5paZ5L+h5oGv5YiX6KGo5o6l5Y+jXHJcbiAgICAgICAgdXNlckluZm86XCIvYXBwL2luQXBwL3VzZXIvZ2V0XCIsLy/ojrflj5bnlKjmiLfkv6Hmga9cclxuICAgICAgICBpc0JsYWNrOlwic2Nhbi9pc0JsYWNrXCIsLy8yLjEuNeaUtumTtuWRmOaYr+WQpuWcqOm7keWQjeWNlVxyXG4gICAgICAgIGlzQXBwbHk6XCJzY2FuL2lzQXBwbHlcIiwvLzIuMS405piv5ZCm5bey57uP55Sz6K+357qi5YyF56CBXHJcbiAgICAgICAgc2hhcmVMaW5rOlwic2Nhbi9zaGFyZUxpbmtcIiwvLzIuMS4255Sf5oiQ57qi5YyF56CB6ZO+5o6lXHJcbiAgICAgICAgcmVjbWRSZWNvcmQ6XCJzY2FuL3JlY21kUmVjb3JkXCIsLy/mjqjojZDlhbPns7vorrDlvZVcclxuICAgICAgICBnZXRMb2dpc3RpY3NMaXN0OlwibWF0ZXJpZWwvZ2V0TG9naXN0aWNzTGlzdFwiLC8v6I635Y+W54mp5paZ5Y6G5Y+y6K6i5Y2VXHJcbiAgICAgICAgZ2V0UmV3YXJkTGlzdDpcInNjYW4vZ2V0UmV3YXJkTGlzdFwiLC8vMi4xLjfmn6Xor6LmlLbpk7blkZjotY/ph5HmmI7nu4borrDlvZVcclxuICAgICAgICBnZXRQcm90b2NvbEluZm86XCJjb2xsZWN0aW9uQ29kZS9nZXRQcm90b2NvbEluZm9cIiwvL+WVhuaIt+WNh+e6p+afpeivouaYvuekuuWNj+iurueahOWQjeensOWSjOWNj+iurueahOWcsOWdgFxyXG4gICAgICAgIGdldENpdHk6XCJyZWdpb24vZ2V0Q2l0eVwiLC8v6YCa6L+HSVDlnLDlnYDojrflj5blnLDlnYDlrprkvY1cclxuICAgICAgICBnZXRRclVybDpcImNvbGxlY3Rpb25Db2RlL2dldFFySW5mb1wiLy8yLjEuMeiOt+WPlueUqOaIt+aUtuasvueggVVSTFxyXG4gICAgfSxcclxuICAgIFNUQVRVU0NPREU6IHtcclxuICAgICAgICBTVUNDRVNTOlwiMDBcIlxyXG4gICAgfSxcclxuICAgIENPTlNUX0RBVEE6e1xyXG4gICAgICAgIGltZ2VTaXplOlwiMzAwXCJcclxuICAgIH0sXHJcbiAgICBDQUNIRUtFWTp7XHJcbiAgICAgICAgZ2V0TWNjQ2FyZExpc3Q6e1xyXG4gICAgICAgICAgICByb2xsS2V5OlwieHZzaC1jb2xsZWN0aW9uQ29kZS9nZXRNY2NDYXJkTGlzdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLWNvbGxlY3Rpb25Db2RlL2dldE1jY0NhcmRMaXN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFVwZGF0ZUNyZWRpdENvbGxlY3RNb25leVN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtbWNobnQvZ2V0VXBncmFkZVN0XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtbWNobnQvZ2V0VXBncmFkZVN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE1jaG50RGV0YWlsOntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtbWNobnQvbWNobnREZXRhaWxcIixcclxuICAgICAgICAgICAgc2Vjb25kS2V5OlwieHZzaC1tY2hudC9tY2hudERldGFpbFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0FwcGx5OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtc2Nhbi9pc0FwcGx5XCIsXHJcbiAgICAgICAgICAgIHNlY29uZEtleTpcInh2c2gtc2Nhbi9pc0FwcGx5XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEFkZHJMaXN0OntcclxuICAgICAgICAgICAgcm9sbEtleTpcInh2c2gtYWRkcmVzcy9nZXRBZGRyTGlzdFwiLFxyXG4gICAgICAgICAgICBzZWNvbmRLZXk6XCJ4dnNoLWFkZHJlc3MvZ2V0QWRkckxpc3RcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvdXRpbC9jb25maWcuanMiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1Byb21pc2UnLCB7ICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgKHJlc3VsdC5lID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnYpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanNcbi8vIG1vZHVsZSBpZCA9IDhlMGMxZGIwMDA4NWM4YWQyNTVhXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UudHJ5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDk3M2NjOGVlZmM1OTkzMWRlOTVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBhYTk2M2I0YzI3MTQ0ZjA5NGNjYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIEQpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gYjUwZDgyNDU2ZTU0NWRjYzNkZDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgYXJncywgdGhhdCkge1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qc1xuLy8gbW9kdWxlIGlkID0gYjU4MGI5NGIxOTU4NDJjYmYyYjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIGlzTm9kZSA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChoZWFkKSBub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChpc05vZGUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgU2FmYXJpIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMzOVxuICB9IGVsc2UgaWYgKE9ic2VydmVyICYmICEoZ2xvYmFsLm5hdmlnYXRvciAmJiBnbG9iYWwubmF2aWdhdG9yLnN0YW5kYWxvbmUpKSB7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWU7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICAvLyBQcm9taXNlLnJlc29sdmUgd2l0aG91dCBhbiBhcmd1bWVudCB0aHJvd3MgYW4gZXJyb3IgaW4gTEcgV2ViT1MgMlxuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZiAoIWhlYWQpIHtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSBiZGUwZjU3ZTliNTc5Zjk0M2Y4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCIndXNlIHN0cmljdCc7XG4vLyAyNS40LjEuNSBOZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcblxuZnVuY3Rpb24gUHJvbWlzZUNhcGFiaWxpdHkoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gYzFiOTRlM2U5NWVkNDM1YWY1NDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS1maW5hbGx5XG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnUHJvbWlzZScsIHsgJ2ZpbmFsbHknOiBmdW5jdGlvbiAob25GaW5hbGx5KSB7XG4gIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIGNvcmUuUHJvbWlzZSB8fCBnbG9iYWwuUHJvbWlzZSk7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIG9uRmluYWxseSA9PSAnZnVuY3Rpb24nO1xuICByZXR1cm4gdGhpcy50aGVuKFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHg7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHksXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9KTtcbiAgICB9IDogb25GaW5hbGx5XG4gICk7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qc1xuLy8gbW9kdWxlIGlkID0gYzJlMzViYmZmODMzMDk1OTQzYzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGU6IGZhbHNlLCB2OiBleGVjKCkgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IGU6IHRydWUsIHY6IGUgfTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSBjYjc4Mzc1Mjk0NTQyYzI0YzViYVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IGQxODEwYWU1MzMyZTM2ZmZhM2M0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBuYXZpZ2F0b3IgPSBnbG9iYWwubmF2aWdhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50IHx8ICcnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanNcbi8vIG1vZHVsZSBpZCA9IGVjNmNiZTMxN2I5ODUwYjA1Y2U1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMSAyMiAyMyAyNCAyNSAyNiAyNyAyOCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSBlZjUxZDQ5ODlmMzA0NGIyZWIzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjgiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qc1xuLy8gbW9kdWxlIGlkID0gZjBkYmMxMGM2OGRkODE0MDE0ZTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4vX3VzZXItYWdlbnQnKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52OCB8fCAnJztcbnZhciAkUHJvbWlzZSA9IGdsb2JhbFtQUk9NSVNFXTtcbnZhciBpc05vZGUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbnZhciBlbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBJbnRlcm5hbCwgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBPd25Qcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIHZhciBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICAgIGV4ZWMoZW1wdHksIGVtcHR5KTtcbiAgICB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpXG4gICAgICAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2VcbiAgICAgIC8vIHY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTgzMDU2NVxuICAgICAgLy8gd2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgICAgICYmIHY4LmluZGV4T2YoJzYuNicpICE9PSAwXG4gICAgICAmJiB1c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lLzY2JykgPT09IC0xO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuLCBleGl0ZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7IC8vIG1heSB0aHJvd1xuICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgICAgICBleGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaSkgcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKSBvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIHVuaGFuZGxlZCA9IGlzVW5oYW5kbGVkKHByb21pc2UpO1xuICAgIHZhciByZXN1bHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYgKHVuaGFuZGxlZCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKSB7XG4gICAgICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodW5oYW5kbGVkICYmIHJlc3VsdC5lKSB0aHJvdyByZXN1bHQudjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgcmV0dXJuIHByb21pc2UuX2ggIT09IDEgJiYgKHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYykubGVuZ3RoID09PSAwO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gZmE5ODdkODExZTRlYjJkNDNkOWNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIxIDIyIDIzIDI0IDI1IDI2IDI3IDI4IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBcIi4vQWN0aXZpdHlSdWxlLnNjc3NcIlxyXG5pbXBvcnQge2JlZm9yZUVudGVyUm91dGVyfSBmcm9tIFwiLi4vLi4vYXNzZXRzL3V0aWwvcmVxdWVzdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aXZpdHlSdWxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGJlZm9yZUVudGVyUm91dGVyKFwi5aSp5aSp6aKG57qi5YyFXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid3JhcHBlclwiIGlkPVwicGFnZVdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZS1jb250YWluZXJcIiBpZD1cInBhZ2VfcmVkUGFja2V0Q29kZVJ1bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBiZy1rYlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsYW5rLXBsYWNlaG9sZGVyXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpdml0eS1ibG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpdml0eS10aXRsZVwiPuaJq+eggemihue6ouWMhea0u+WKqOinhOWImTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpdml0eS1ib2R5XCI+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDE+4peGJm5ic3A75rS75Yqo5pe26Ze0PC9oMT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWN0aXZpdHktY29udGVudFwiPjIwMTguMDUuMTUtMjAxOC4wOC4zMTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxPuKXhiZuYnNwO+a0u+WKqOinhOWImTwvaDE+ICA8cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFjdGl2aXR5LWNvbnRlbnRcIj4x44CB5rS75Yqo5pyf6Ze077yM55So5oi36YCa6L+H5rS75Yqo6aG16Z2i6I635b6X57qi5YyF77yM5omA5b6X57qi5YyF5Y+v5Zyo5Li75omr44CB6KKr5omr5oq15omj5raI6LS56YeR6aKd44CCPC9wPiAgPHBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhY3Rpdml0eS1jb250ZW50XCI+MuOAgeWQjOS4gOeUqOaIt+a0u+WKqOacn+mXtOavj+WkqeaciTHmrKHpooblj5bmnLrkvJoo5LiN5ZCM5ZWG5a625YWx5LqrKe+8jOe6ouWMheWFqOmDqOS9v+eUqOWQjuaJjeWPr+iOt+W+l+S4i+S4gOasoemihuWPluacuuS8mu+8m+WQjOS4gOi0puWPt+OAgeaJi+acuuWPt+OAgei6q+S7veivgeOAgeaJi+acuue7iOerr++8jOespuWQiOS7peS4iuS7u+S4gOadoeS7tuWdh+inhuS4uuWQjOS4gOaIt+OAgjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhY3Rpdml0eS1jb250ZW50XCI+M+OAgea0u+WKqOacn+mXtOe6ouWMhemaj+acuuWPkemAge+8jOWPkeWujOS4uuatou+8m+e6ouWMhemihuWPluWQjjYw5pel5YaF5pyJ5pWI77yM5bey6L+H5pyf57qi5YyF5bCG5LiN5a6a5pyf5pS25Zue44CCPC9wPiAgPHBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhY3Rpdml0eS1jb250ZW50XCI+NOOAgeiLpeS6q+WPl+S8mOaDoOeahOS6pOaYk+WPkeeUn+mAgOasvu+8jOS7hemAgOi/mOWunumZheaUr+S7mOeahOmHkemine+8jOS4jeWGjemAgOi/mOW3suS6q+S8mOaDoOi1hOagvOOAgjwvcD4gIDxwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWN0aXZpdHktY29udGVudFwiPjXjgIHnuqLljIXlj6/mi4bliIblpJrmrKHkvb/nlKjvvJvnlKjmiLfkuI3og73lkIzml7bkuqvlj5fnuqLljIXjgIHnq4vlh4/nrYnkvJjmg6DvvIzkvJjlhYjkuqvlj5fnq4vlh4/nrYnkvJjmg6DjgII8L3A+ICA8cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFjdGl2aXR5LWNvbnRlbnRcIj4244CB5aaC55So5oi35Ye6546w6L+d6KeE6KGM5Li6KOWmguiZmuWBh+S6pOaYk+OAgeS9nOW8iuOAgeaBtuaEj+Wll+WPlueOsOmHkeOAgeWIt+S/oeetiSnvvIzkupHpl6rku5hBUFDlsIbmkqTplIDmgqjnmoTmtLvliqjlj4LkuI7otYTmoLzvvIzlubbmnInmnYPmkqTplIDov53op4TkuqTmmJPvvIzlm57mlLbmgqjlt7Lnu4/ojrflvpfnmoTkvJjmg6Dph5Hpop0o5YyF5ous5bey5raI6LS56YeR6aKdKeOAgjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhY3Rpdml0eS1jb250ZW50XCI+N+OAgemZkOS9v+eUqOS6kemXquS7mEFQUOiLueaenOWuouaIt+errzUuMC4244CB5a6J5Y2T5a6i5oi356uvNS4wLjnlj4rku6XkuIrniYjmnKzlj4LkuI7mtLvliqjjgII8L3A+ICA8cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFjdGl2aXR5LWNvbnRlbnRcIj4444CB57qi5YyF5LuF6ZmQ5Zyo5Lit5Zu95aSn6ZmG5Zyw5Yy65L2/55So44CCPC9wPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvQWN0aXZpdHlSdWxlL0FjdGl2aXR5UnVsZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=