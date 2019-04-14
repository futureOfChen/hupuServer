/**
 * 为了减少请求数，本文件手动同步commonUtil.js、commonApp.js和commonUI.js
 * 20170313：因为很少单独使用，且合并后commonAll.js也并不大，所以废除原有commonUtil.js、commonApp.js和commonUI.js，
 * commonUtil.js、commonApp.js和commonUI.js可以停止维护，减少维护成本。
 */

// commonUtil

/**
 * 注意：本文件不要与旧版common.js和cordova.js混用
 * wallet_web工具函数集
 */

/**
 * http://git.oschina.net/loonhxl/jbase64/blob/master/jbase64.js
 * BASE64 Encode and Decode By UTF-8 unicode
 * 可以和java的BASE64编码和解码互相转化
 */
(function () {
    var BASE64_MAPPING = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'
    ];

    /**
     *ascii convert to binary
     */
    var _toBinary = function (ascii) {
        var binary = new Array();
        while (ascii > 0) {
            var b = ascii % 2;
            ascii = Math.floor(ascii / 2);
            binary.push(b);
        }
        /*
         var len = binary.length;
         if(6-len > 0){
         for(var i = 6-len ; i > 0 ; --i){
         binary.push(0);
         }
         }*/
        binary.reverse();
        return binary;
    };

    /**
     *binary convert to decimal
     */
    var _toDecimal = function (binary) {
        var dec = 0;
        var p = 0;
        for (var i = binary.length - 1; i >= 0; --i) {
            var b = binary[i];
            if (b == 1) {
                dec += Math.pow(2, p);
            }
            ++p;
        }
        return dec;
    };

    /**
     *unicode convert to utf-8
     */
    var _toUTF8Binary = function (c, binaryArray) {
        var mustLen = (8 - (c + 1)) + ((c - 1) * 6);
        var fatLen = binaryArray.length;
        var diff = mustLen - fatLen;
        while (--diff >= 0) {
            binaryArray.unshift(0);
        }
        var binary = [];
        var _c = c;
        while (--_c >= 0) {
            binary.push(1);
        }
        binary.push(0);
        var i = 0, len = 8 - (c + 1);
        for (; i < len; ++i) {
            binary.push(binaryArray[i]);
        }

        for (var j = 0; j < c - 1; ++j) {
            binary.push(1);
            binary.push(0);
            var sum = 6;
            while (--sum >= 0) {
                binary.push(binaryArray[i++]);
            }
        }
        return binary;
    };

    var __BASE64 = {
        /**
         *BASE64 Encode
         */
        encoder: function (str) {
            var base64_Index = [];
            var binaryArray = [];
            for (var i = 0, len = str.length; i < len; ++i) {
                var unicode = str.charCodeAt(i);
                var _tmpBinary = _toBinary(unicode);
                if (unicode < 0x80) {
                    var _tmpdiff = 8 - _tmpBinary.length;
                    while (--_tmpdiff >= 0) {
                        _tmpBinary.unshift(0);
                    }
                    binaryArray = binaryArray.concat(_tmpBinary);
                } else if (unicode >= 0x80 && unicode <= 0x7FF) {
                    binaryArray = binaryArray.concat(_toUTF8Binary(2, _tmpBinary));
                } else if (unicode >= 0x800 && unicode <= 0xFFFF) {//UTF-8 3byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(3, _tmpBinary));
                } else if (unicode >= 0x10000 && unicode <= 0x1FFFFF) {//UTF-8 4byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(4, _tmpBinary));
                } else if (unicode >= 0x200000 && unicode <= 0x3FFFFFF) {//UTF-8 5byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(5, _tmpBinary));
                } else if (unicode >= 4000000 && unicode <= 0x7FFFFFFF) {//UTF-8 6byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(6, _tmpBinary));
                }
            }

            var extra_Zero_Count = 0;
            for (var i = 0, len = binaryArray.length; i < len; i += 6) {
                var diff = (i + 6) - len;
                if (diff == 2) {
                    extra_Zero_Count = 2;
                } else if (diff == 4) {
                    extra_Zero_Count = 4;
                }
                //if(extra_Zero_Count > 0){
                //	len += extra_Zero_Count+1;
                //}
                var _tmpExtra_Zero_Count = extra_Zero_Count;
                while (--_tmpExtra_Zero_Count >= 0) {
                    binaryArray.push(0);
                }
                base64_Index.push(_toDecimal(binaryArray.slice(i, i + 6)));
            }

            var base64 = '';
            for (var i = 0, len = base64_Index.length; i < len; ++i) {
                base64 += BASE64_MAPPING[base64_Index[i]];
            }

            for (var i = 0, len = extra_Zero_Count / 2; i < len; ++i) {
                base64 += '=';
            }
            return base64;
        },
        /**
         *BASE64  Decode for UTF-8
         */
        decoder: function (_base64Str) {
            var _len = _base64Str.length;
            var extra_Zero_Count = 0;
            /**
             *计算在进行BASE64编码的时候，补了几个0
             */
            if (_base64Str.charAt(_len - 1) == '=') {
                //alert(_base64Str.charAt(_len-1));
                //alert(_base64Str.charAt(_len-2));
                if (_base64Str.charAt(_len - 2) == '=') {//两个等号说明补了4个0
                    extra_Zero_Count = 4;
                    _base64Str = _base64Str.substring(0, _len - 2);
                } else {//一个等号说明补了2个0
                    extra_Zero_Count = 2;
                    _base64Str = _base64Str.substring(0, _len - 1);
                }
            }

            var binaryArray = [];
            for (var i = 0, len = _base64Str.length; i < len; ++i) {
                var c = _base64Str.charAt(i);
                for (var j = 0, size = BASE64_MAPPING.length; j < size; ++j) {
                    if (c == BASE64_MAPPING[j]) {
                        var _tmp = _toBinary(j);
                        /*不足6位的补0*/
                        var _tmpLen = _tmp.length;
                        if (6 - _tmpLen > 0) {
                            for (var k = 6 - _tmpLen; k > 0; --k) {
                                _tmp.unshift(0);
                            }
                        }
                        binaryArray = binaryArray.concat(_tmp);
                        break;
                    }
                }
            }

            if (extra_Zero_Count > 0) {
                binaryArray = binaryArray.slice(0, binaryArray.length - extra_Zero_Count);
            }

            var unicode = [];
            var unicodeBinary = [];
            for (var i = 0, len = binaryArray.length; i < len;) {
                if (binaryArray[i] == 0) {
                    unicode = unicode.concat(_toDecimal(binaryArray.slice(i, i + 8)));
                    i += 8;
                } else {
                    var sum = 0;
                    while (i < len) {
                        if (binaryArray[i] == 1) {
                            ++sum;
                        } else {
                            break;
                        }
                        ++i;
                    }
                    unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 1, i + 8 - sum));
                    i += 8 - sum;
                    while (sum > 1) {
                        unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 2, i + 8));
                        i += 8;
                        --sum;
                    }
                    unicode = unicode.concat(_toDecimal(unicodeBinary));
                    unicodeBinary = [];
                }
            }
            return unicode;
        }
    };

    window.BASE64 = __BASE64;
})();

(function ($, UP) {
    "use strict";

    UP.W = UP.W || {};
    // 环境变量
    UP.W.Env = UP.W.Env || {};
    // 工具函数
    UP.W.Util = UP.W.Util || {};


    /** ========== 工具函数相关 ========== **/
    var util = UP.W.Util;

    /**
     * 将URL查询参数转换为Object
     * @param str：可选参数，如果不传入默认解析当前页面查询参数
     * @returns {{object}}
     */
    util.urlQuery2Obj = function (str) {
        if (!str) {
            str = location.search;
        }

        if (str[0] === '?' || str[0] === '#') {
            str = str.substring(1);
        }
        var query = {};

        str.replace(/\b([^&=]*)=([^&]*)/g, function (m, a, d) {
            if (typeof query[a] !== 'undefined') {
                query[a] += ',' + decodeURIComponent(d);
            } else {
                query[a] = decodeURIComponent(d);
            }
        });

        return query;
    };

    /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：
     * formatDate(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * formatDate(new Date(), "yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     * @param date 日期对象
     * @param fmt 格式化字符串
     * @returns {*}
     */
    util.formatDate = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    /**
     * 格式化金额
     * @param money 原始金额（数字或字符串格式）
     * @param digit 小数点后位数
     * @param thousands 是否千分位格式化
     * @returns {*}
     */
    util.formatMoney = function (money, digit, thousands) {
        // 默认两位小数
        if (typeof digit !== 'number' || digit < 0 || digit > 20) {
            digit = 2;
        }
        // 小数处理
        money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(digit) + '';
        // 千分位处理
        if (thousands) {
            var l = money.split('.')[0].split('').reverse(),
                r = money.split('.')[1];
            var t = '';
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
            }
            return t.split('').reverse().join('') + "." + r;
        } else {
            return money;
        }
    };

    /**
     * 格式化卡账号
     * @param pan
     */
    util.formatPan = function (pan) {
        if (typeof pan === 'string') {
            // 消除空格和非数字，增加空格
            return pan.replace(/\s/g, '').replace(/(\S{4})(?=\S)/g, '$1 ');
        } else {
            return '';
        }
    };

    /**
     * 格式化手机号
     * @param mobile
     * @returns {*}
     */
    util.formatMobile = function (mobile) {
        if (typeof mobile === 'string') {
            // 消除空格和非数字，增加空格
            return mobile.replace(/\D/g, '').replace(new RegExp('(^\\d{3})(\\d{1,4})', 'g'), '$1 $2 ');
        } else {
            return '';
        }
    };

    /**
     * 对输入框内用户输入的卡账号进行格式化
     * 警告：不要在通过该函数格式化的输入框内监听用户输入时间对value进行修改，否则可能导致冲突
     * @param element
     * @param formatType
     * @param formatFunc
     */
    util.formatInput = function (element, formatType, formatFunc) {
        // 绑定或取消绑定事件
        $(element).bind('input', function (element, formatType, formatFunc) {
            return function (e) {
                if (!formatFunc) {
                    if (formatType === '344') {
                        formatFunc = function (str) {
                            return $.trim(str.replace(new RegExp('(^\\d{3})(\\d{1,4})', 'g'), '$1 $2 '));
                        };
                    } else {
                        formatFunc = function (str) {
                            return str.replace(new RegExp('(\\d{4})(?=\\d)', 'g'), '$1 ');
                        };
                    }
                }
                // 删除原有恢复光标位置的复杂方案，不再尝试恢复光标位置
                var $el = $(this);
                var cleanValue = $el.val().replace(/\D/g, '');
                var formatValue = formatFunc(cleanValue);
                $el.val(formatValue);
                // 1. 老版本WebView在设置value后光标会自动跳到最后，之前曾想办法恢复光标位置，但是在个别版本的三星系统上无法正确读取到
                // 已经输入的内容，所以光标位置会错误。
                // 2. Android 7开始，设置value后光标仍会停留在之前的位置，也就导致增加空格后光标在倒数第二个字符之后，加的空格越多光标
                // 偏移越多，所以每次强制将光标设置到最后
                setTimeout(function () {
                    $el[0].setSelectionRange(formatValue.length, formatValue.length);
                }, 1);

            };
        }(element, formatType, formatFunc));
    };

    /**
     * 对HTML进行转义
     * @param html 待转义的HTML字符串
     * @returns {*}
     */
    util.htmlEncode = function (html) {
        var temp = document.createElement("div");
        temp.textContent = html;
        var output = temp.innerHTML;
        temp = null;
        return output;
    };

    /**
     * 对HTML进行逆转义
     * @param html 待逆转义的HTML字符串
     * @returns {*}
     */
    util.htmlDecode = function (html) {
        var temp = document.createElement("div");
        temp.innerHTML = html;
        var output = temp.textContent;
        temp = null;
        return output;
    };

    /**
     * Base64编码
     * @param str
     * @returns {string}
     */
    util.base64Encode = function (str) {
        return BASE64.encoder(str);
    };

    /**
     * Base64解码
     * @param str
     * @returns {string}
     */
    util.base64Decode = function (str) {
        var unicode = BASE64.decoder(str);//返回会解码后的unicode码数组。
        str = [];
        for (var i = 0, len = unicode.length; i < len; ++i) {
            str.push(String.fromCharCode(unicode[i]));
        }
        return str.join('');
    };

    /**
     * 移植自underscore的模板
     * @param text 模板文本
     * @param data 数据（可选参数）
     * @returns {*}
     */
    util.template = function (text, data) {
        var render;
        var settings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var noMatch = /(.)^/;
        var matcher = new RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');
        var escapes = {
            "'": "'",
            '\\': '\\',
            '\r': 'r',
            '\n': 'n',
            '\t': 't',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };

        var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset)
                .replace(escaper, function (match) {
                    return '\\' + escapes[match];
                });

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.htmlEncode(__t))+\n'";
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "';\n";

        if (!settings.variable) {
            source = 'with(obj||{}){\n' + source + '}\n';
        }

        source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + "return __p;\n";
        try {
            render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        if (data) {
            return render(data, util);
        }
        var template = function (data) {
            return render.call(this, data, util);
        };

        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

        return template;
    };

    /**
     * 内部函数，动态加载脚本文件
     * @param url
     */
    util.loadScript = function (url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    /**
     * 小数字符串变成100倍的整数，如：1.98 ==> 198
     */
    util.getFenNumberFromYuanStr = function (_amountStr) {
        if ((typeof _amountStr) != "string") {
            return 0;
        }
        if (_amountStr == "") {
            return 0;
        }
        if (_amountStr.indexOf(".") < 0) {
            return parseInt(_amountStr, 10) * 100;
        }
        var _amountStrPrex = _amountStr.split(".")[0];
        var _amountStrNext = _amountStr.split(".")[1];
        if (_amountStrNext.length == 0) {
            return parseInt(_amountStrPrex, 10) * 100;
        } else if (_amountStrNext.length == 1) {
            return parseInt(_amountStrPrex, 10) * 100 + parseInt(_amountStrNext, 10) * 10;
        } else if (_amountStrNext.length == 2) {
            return parseInt(_amountStrPrex, 10) * 100 + parseInt(_amountStrNext, 10);
        } else {
            return 0;
        }
    };

    /**
     * 整数除以100，变成小数并显示，如：198 ==> 1.98
     * @param _amount
     * @returns {*}
     */
    util.getYuanStrFromFenNumber = function (_amount) {
        if ((typeof _amount) != "number") {
            return "0.00";
        }

        var num = Math.abs(_amount);
        var r_num;

        if (num < 10) {
            r_num = "0.0" + num;
        } else if (num < 100 && num >= 10) {
            r_num = "0." + num;
        } else {
            var _amountStr = num + "";
            r_num = _amountStr.substring(0, _amountStr.length - 2) + "." + _amountStr.substring(_amountStr.length - 2, _amountStr.length);
        }

        if (_amount < 0) {
            return "-" + r_num;
        } else {
            return r_num;
        }
    };

    /**
     * 向微信php后台发送请求
     * @param path
     * @param data
     * @param success
     * @param fail
     */
    util.sendMessageWeChat = function (path, data, success, fail) {
        $.ajax({
            type: "GET",
            url: env.pathWechatServer + path,
            dataType: "json",
            data: data,
            success: function (data) {
                if (success) {
                    success(data);
                }
            },
            error: function (err) {
                if (fail) {
                    fail(err);
                }
            }
        });
    };
    /**
     * IOS输入控件覆盖问题解决
     * @param ele 控制的input元素
     * @param isfixed input元素的父级/本身是否fixed
     */
    util.inputScrollTop = function (ele, parent, isfixed) {
        (function (_ele, _parent, _isfixed) {
            //当前元素
            var _this = $(_parent || _ele);
            if (UP.W.Env.isIOS && UP.W.Env.isInsideWalletApp) {
                _this.on('focus', _ele, function () {
                    //添加绑定事件
                    setTimeout(function () {
                        //当前body滚动标度
                        var parentEleScrollTop = document.body.scrollTop;
                        //需要滚动的实际标度
                        var scroll = $(_ele).offset().top + parseInt($(_ele).css('height')) - document.body.clientHeight + 318;
                        //元素高于输入框则不滚动
                        if (parentEleScrollTop >= scroll) {
                            return;
                        }
                        //是否fixed
                        if (_isfixed) {
                            scroll = document.body.scrollTop + 318;
                        }
                        document.body.scrollTop = scroll;
                    }, 300);
                });
            }
        })(ele, parent, isfixed);
    };

    /**
     * 字符串分转字符串元
     */
    util.fenStrToYuanStr = function (fenStr) {
        if (parseFloat(fenStr).toString() == 'NaN') { // 字符串为非数字
            return '';
        }
        var sumLen = fenStr && fenStr.length || 0;
        if (sumLen > 2) {
            return fenStr.substr(0, sumLen - 2) + '.' + fenStr.substr(sumLen - 2, 2);
        } else if (sumLen > 1) {
            return '0.' + fenStr;
        } else {
            return '0.0' + (fenStr || '0');
        }
    };

    /**
     *
     * @param url
     * @param type
     * @param params
     */
    util.openWalletApp = function (host, params) {
        if (!env.isInsideWalletApp) {
            // 微信进行特殊处理，引导用户在浏览器打开
            if (env.platform === "WeChat") {
                UP.W.UI.loadWxMask();
                return;
            }
            var hostMean = {
                1: "discount",//优惠
                2: "life",//生活
                3: "user",//我的
                4: "redenvelope"//红包
            };
            var url = "";
            //判断url是否为网址
            if (/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(host)) {
                //如是，则使用打开webView的schema
                url = host.replace(/(^https:\/\/)|(^http:\/\/)/, 'chsp://');
            } else {
                host = hostMean[host];
                host = typeof(host) === "undefined" ? '' : host;
                url = 'upwallet://' + host;
            }
            if (typeof(params) !== "undefined") {
                url += "?" + $.param(params);
            }
            window.location.href = url;
            //获取Url里面的code，进行埋点
            var code = util.urlQuery2Obj().code ? util.urlQuery2Obj().code : '';
            var waitTime = 2000;
            var start = Date.now();
            var timer = setTimeout(function () {
                if (document.hidden || document.webkitHidden) {
                    return;
                }
                if (Date.now() - start < waitTime + 200) {
                    if (env.appMode === '0') {
                        //生产环境
                        window.location.href = "https://youhui.95516.com/hybrid_v4/html/help/download.html?code=" + (code || 'sfj1');
                    } else {
                        // 测试环境
                        window.location.href = "http://172.18.179.11/hybrid_v4/html/help/download.html?code=" + (code || 'sfj1');
                    }
                }
            }, waitTime);
            document.addEventListener('visibilitychange', function () {
                if (document.hidden || document.webkitHidden) {
                    clearTimeout(timer);
                }
            });
            document.addEventListener('webkitvisibilitychange', function () {
                if (document.hidden || document.webkitHidden) {
                    clearTimeout(timer);
                }
            });
            window.addEventListener('pagehide', function () {
                clearTimeout(timer);
            });
        }
    };

    /**
     * 获取开发环境各组地址
     * @param cmd
     * @returns {*}
     */
    util.getDevelopServer = function (cmd) {
        var group = cmd && cmd.split("/")[1];
        return {
            'app': "http://172.18.64.187:12010",
            'acc': "http://172.21.35.24:12000",
            "life": "http://172.17.248.169:36080"
        }[group]
    };
    util.getCardList = function (success, error, fail) {
        function cardList() {
            var params = {
                method: 'POST',
                cmd: '/app/inApp/cardInfo/list',
                params: {}
            };
            UP.W.App.sendMessage(params, false, false,
                function (data) {
                    data = data.params;
                    var cardArr = [];
                    for (var i = 0, len = data.cardSets.length; i < len; i++) {
                        cardArr.push(data.cardSets[i].cardBasic);
                    }
                    success(cardArr);
                }, function (err) {
                    error(err)
                }, function (xhr) {
                    fail(xhr)
                });
        }

        if (UP.W.Env.isAndroid && UP.W.Env.appVer < 607) {
            cardList();
        } else {
            UP.W.App.onPluginReady(function () {
                UP.W.App.getFrogCardInfoArray(function (data) {
                    console.log(data);
                    var cardArr = data && data.cardArray && data.cardArray.map(function (item) {
                        return item.cardBasic;
                    });
                    success(cardArr);
                }, function (err) {
                    console.log(err);
                    cardList();
                })
            })
        }
    };
    /**
     *  序列化数组
     */
    util.serialJson = function(jsonData){
        var result = {};
        var arr = new Array();
        for(var key in jsonData){
            arr.push(key);
        }
        arr.sort();
        for(var i=0;i<arr.length;i++){
            result[arr[i]] = jsonData[arr[i]];
        }
        return result;
    };
    /**
     * 删除全量/指定单条storage
     * @param opt 参数
     *          needuserid 用户id存储/全局存储 默认用户
     *          storageType storage类型默认localstorage
     *          full 全局清空 默认false
     *          rollKey 主键
     *          secondKey 次要键
     * @param success 清理成功回调
     * @param error   清理失败回调
     */
    util.removeStorage = function (opt,success,error) {
        var opts = $.extend({
            needuserid:true,
            storageType:1,
            full:false
        },opt);
        var storage = opts.storageType==1?window.localStorage:window.sessionStorage;
        try {
            storage.removeItem('support');
            storage.setItem('support', '1');
            storage.getItem('support');
        } catch (error) {
            if (typeof error === 'function') {
                error({code: 'w01', msg: '当前设备不支持storage'});
            }
            return;
        }
        if(opts.full){
            storage.clear();
            return;
        }
        var mainkey = 'local';
        var key = '';
        if(opts.needuserid){
            if(window.plugins){
                window.UP.W.App.getUserInfo(function (data) {
                    mainkey = data.userid;
                    rmStorage();
                    if(typeof success == 'function'){
                        success();
                    }
                },function () {
                    if (typeof error === 'function') {
                        error({code: 'w03', msg: '用户信息获取失败'});
                    }
                });
            }
        }else{
            rmStorage();
            if(typeof success == 'function'){
                success();
            }
        }
        function rmStorage() {
            if(typeof opts.secondKey == 'object'){
                opts.secondKey = JSON.stringify(util.serialJson(opts.secondKey));
            }
            key = mainkey+'→'+opts.rollKey+'→'+opts.secondKey||'default';
            storage.removeItem(key);
        }
    };
    /**
     *
     * @param parm storage参数
     *              storageType 1 localstorage 2 sessionstorage
     *              validateTime 默认无限 单位毫秒INT
     *              saveWithId 默认通过用户id去存储
     *              secondKey 次要键值 默认为default
     *              rollKey 必填 主标示
     *              data 实际数据内容为json对象
     *              mainKey 强制不使用用户、local存储
     * @param success
     * @param error
     */
    util.saveToStorage = function (parm, success, error) {
        var saveParam = $.extend({
            storageType: 1,
            mainKey: 'local',
            saveWithId: true,
            secondKey: 'default',
            validateTime: 'infinite',
        }, parm);
        var _storageToSave = saveParam.storageType === 1 ? window.localStorage : window.sessionStorage;
        var isSupportStorage = true;
        try {
            _storageToSave.removeItem('support');
            _storageToSave.setItem('support', '1');
            _storageToSave.getItem('support');
        } catch (error) {
            isSupportStorage = false;
        }
        if (!isSupportStorage) { //不支持
            if (typeof error === 'function') {
                error({code: 'w01', msg: '当前设备不支持storage'});
            }
            return;
        }
        var mainKey = saveParam.mainKey;
        var deadLine = new Date().getTime();
        if (saveParam.validateTime === 'infinite') {
            deadLine = 'infinite';
        } else {
            deadLine = deadLine + saveParam.validateTime;
        }
        if (saveParam.saveWithId) {
            if (window.plugins) {
                UP.W.App.getUserInfo(function (resp) {
                    mainKey = resp.userid;
                    saveAsStorage();
                }, function (err) {
                    if (typeof error === 'function') {
                        error({code: 'w03', msg: '用户信息获取失败'});
                    }
                });
            } else {
                throw new Error('Plugin is not ready, please listen to "pluginready" event.');
            }
        } else {
            saveAsStorage();
        }

        function saveAsStorage() {
            if (!saveAsStorage.keyToPreventLoop) {
                saveAsStorage.keyToPreventLoop = 1;
            }
            if (saveAsStorage.keyToPreventLoop >= 3) { //防止出错后,重复调用进入死循环
                saveAsStorage.keyToPreventLoop = 1;
                return;
            }
            var key = mainKey + '→' + saveParam.rollKey + '→' + saveParam.secondKey;
            var data = {
                deadLine: deadLine,
                data: saveParam.data
            };
            try {
                _storageToSave.removeItem(key);
                _storageToSave.setItem(key, JSON.stringify(data));
                if (typeof success === 'function') {
                    success();
                }
            } catch (e) {
                saveAsStorage.keyToPreventLoop++;
                _storageToSave.clear();
                saveAsStorage();
            }
        }
    };

    /**
     *
     * @param parm 读取storage的条件
     *              storageType 1 localstorage 2 sessionstorage
     *              readWithId 默认true使用用户id去读取
     *              secondkey 使用次要条件
     *              rollKey 必填主要条件
     *              mainKey 强制不使用userid/local
     * @param success
     * @param error
     */
    util.getFromStorage = function (parm, success, error) {
        var readParam = $.extend({
            storageType: 1,
            readWithId: true,
            mainKey: 'local',
            secondKey: 'default',
        }, parm);
        var _storageToRead = readParam.storageType === 1 ? window.localStorage : window.sessionStorage;
        var isSupportStorage = true;
        try {
            _storageToRead.removeItem('support');
            _storageToRead.setItem('support', '1');
            _storageToRead.getItem('support');
        } catch (error) {
            isSupportStorage = false;
        }
        if (!isSupportStorage) { //不支持
            if (typeof error === 'function') {
                error({code: 'w01', msg: '当前设备不支持storage'});
            }
            return;
        }
        var mainKey = readParam.mainKey;
        if (readParam.readWithId) {
            if (window.plugins) {
                UP.W.App.getUserInfo(function (resp) {
                    mainKey = resp.userid;
                    readAsStorage();
                }, function (err) {
                    error({code: 'w03', msg: '获取用户信息失败'});
                });
            } else {
                throw new Error('Plugin is not ready, please listen to "pluginready" event.');
            }
        } else {
            readAsStorage();
        }

        function readAsStorage() {
            var key = mainKey + '→' + readParam.rollKey + '→' + readParam.secondKey;
            var time = new Date().getTime();
            var value = _storageToRead.getItem(key);
            if (value && value.length > 0) {
                value = JSON.parse(value);
            } else {
                if (typeof error === 'function') {
                    error({code: 'w04', msg: 'storage数据异常'});
                }
                return;
            }
            //有效性验证
            if (value.deadLine === 'infinite' || (value.deadLine && value.deadLine > time)) {
                //有效
                if (typeof success === 'function') {
                    success(value.data);
                }
            } else {
                _storageToRead.removeItem(key);
                if (typeof error === 'function') {
                    error({code: 'w05', msg: 'storage失效'});
                }
            }
        }
    };
    /**
     * 获取全部localstorage 不推荐使用
     * @param opt
     *          alter 0全量 非常影响效率慎用 1用户为标识的全量
     *          second 附加检索信息,类型为数组
     * @param callback 回调，如未查到返回空对象
     */
    util.getFullStorage = function (opt, callback) {
        var readParam = $.extend({
            alter: 0,
            second: []
        }, opt);
        var respData = {};
        var contain = true;
        var mainKey = 'local';
        var isSupportStorage = true;
        try {
            localStorage.removeItem('support');
            localStorage.setItem('support', '1');
            localStorage.getItem('support');
        } catch (error) {
            isSupportStorage = false;
        }
        if (!isSupportStorage) { //不支持
            if (typeof error === 'function') {
                error({code: 'w01', msg: '当前设备不支持storage'});
            }
            return;
        }
        if (readParam.alter !== 0) { // 通过用户ID 筛选，mainKey 设置为 ID
            if (window.plugins) {
                UP.W.App.getUserInfo(function (resp) {
                    mainKey = resp.userid;
                }, function (err) {
                    if (typeof callback === 'function') {
                        callback({code: 'w03', msg: '用户信息获取失败'});
                    }
                })
            } else {
                throw new Error('Plugin is not ready, please listen to "pluginready" event.');
                return;
            }
        }
        var secondLength = readParam.second.length;
        for (var item in window.localStorage) {
            if (window.localStorage.hasOwnProperty(item)) {
                for (var i = 0; i < secondLength; i++) {
                    if (item.indexOf(readParam.second[i]) < 0) {
                        contain = false;
                        break;
                    }
                }
                if (item.indexOf(mainKey) >= 0 && contain) {
                    respData[item] = localStorage.getItem(item);
                }
            }
        }
        if (typeof callback === 'function') {
            callback(respData);
        }

    };

    /**
     * 浏览器是否支持service worker
     * */
    util.isSupServiceWorker = function () {
        return 'serviceWorker' in navigator
    };

    /**
     * 浏览器是否支持BroadcastUpdate
     * 支持service worker的浏览器不一定支持BroadcastUpdate.
     * 所以使用BroadcastUpdate的场景，如："先读缓存，同步往后台发请求更新缓存，报文有更新时刷新页面"需先判断是否支持BroadcastUpdate，不支持的话使用localStorage
     * */
    util.isSupBroadcastUpdate = function () {
        return 'BroadcastChannel' in self
    };

    /**
     * @param channel 缓存更新通知的通道名称（在swConfig.js中配置）
     * @param url 匹配的接口路径
     * @param callback 回调函数
     * 适用于先读缓存，同步往后台发请求，拿到请求报文后更新缓存及页面。
     * BroadcastUpdate根据header里的某一个或多个字段来判断缓存是否更新，如'content-Length'、'date'、'etag'、'last-modified'等。
     */
    // util.getBroadcastUpdate = function (channel, url, callback) {
    //     const updatesChannel = new BroadcastChannel(channel);
    //     updatesChannel.addEventListener('message', async (event) => {
    //         const {cacheName, updatedUrl} = event.data.payload;
    //         if(updatedUrl.match(url)){
    //             // Do something with cacheName and updatedUrl.
    //             // For example, get the cached content and update
    //             // the content on the page.
    //             const cache = await caches.open(cacheName);
    //             const updatedResponse = await cache.match(updatedUrl);
    //             const updatedText = await updatedResponse.json();
    //             callback(updatedText);
    //         }
    //     });
    // };




    /** ========== 环境变量相关 ========== **/
    var env = UP.W.Env;
    var agent = navigator.userAgent.toLowerCase();
    // 是否在钱包客户端内
    env.isInsideWalletApp = (/com.unionpay.chsp/.test(agent)) || (/com.unionpay.mobilepay/.test(agent)) || (/(updebug)/.test(agent));
    // 是否运行在iOS内
    env.isIOS = /iphone|ipad|ipod/.test(agent);
    // 是否运行在Android内
    env.isAndroid = (/android/.test(agent));

    if (env.isInsideWalletApp) {
        // 设备运行模式
        // '0'：生产；'1'：新新新开发；'2'：开发 '3'：新开发环境
        env.appMode = /\(updebug\s(\d+)\)/g.exec(agent)[1];
        // 客户端版本号
        env.appVer = /\(version\s(\d+)\)/g.exec(agent)[1];
    } else {
        switch (location.hostname) {
            case 'youhui.95516.com':
            case 'wallet.95516.com':
                env.appMode = '0';
                break;
            case '172.18.64.187':
                env.appMode = '1';
                break;
            case '172.18.179.10':
            case '172.18.179.11':
                env.appMode = '2';
                break;
            case '172.17.249.30':
                env.appMode = '3';
                break;
            default:
                env.appMode = '888';
        }

        env.appVer = '';
    }
    // 允许强制通过URL参数指定appMode
    var urlQuery = util.urlQuery2Obj();
    if (typeof urlQuery.appMode === 'string') {
        env.appMode = urlQuery.appMode;
    }

    /**
     * 当前运行的社交平台
     * 'WeChat'：微信
     * 'QQ': QQ
     * 'Qzone': QQ空间
     * 'WeiBo'：新浪微博
     */
    env.platform = (function () {
        if (/micromessenger/.test(agent)) {
            return 'WeChat';
        } else if (/ qq\//.test(agent)) {
            return 'QQ';
        } else if (/ qzone\//.test(agent)) {
            return 'QZone';
        } else if (/ weibo/.test(agent)) {
            return 'WeiBo';
        } else {
            return 'Other';
        }
    })();

    /**
     * Wallet服务器地址
     */
    env.pathWalletHost = (function () {
        return {
            '0': location.protocol + '//wallet.95516.com',    //生产
            '1': 'http://172.18.64.187:12010',//新开发
            '2':  location.protocol + '//'+ window.location.host,      // 测试F5, sw需要https+域名
            '3': 'https://101.231.204.80:443',      // pm环境
            '888': 'http://localhost:3000'      //本地测试
        }[env.appMode];
    })();

    /**
     * Youhui服务器地址
     */
    env.pathYouhuiHost = (function () {
        return {
            '0': location.protocol + '//youhui.95516.com',     // 生产
            '1': 'http://172.21.33.56:36000',      // 新开发
            '2': location.protocol + '//youhui.95516.com',      // 测试F5, sw需要https+域名
            '3': 'http://172.21.33.56:36000',   // 开发内网, 无外网IP
            '888': 'http://localhost:3000'      // 本地测试
        }[env.appMode];
    })();
    /**
     * Pay服务器地址
     */
    env.pathPayHost = (function () {
        return {
            '0': location.protocol + '//pay.95516.com',     // 生产
            '1': 'http://172.17.248.176:50000',      // 新开发
            '2': 'http://172.18.179.24',      // 测试内网
            '3': 'http://172.21.33.56:36000',   // 开发内网, 无外网IP
            '888': 'http://localhost:3000'      // 本地测试
        }[env.appMode];
    })();
    /**
     * Content服务器地址
     */
    env.pathContentHost = (function () {
        return {
            '0': location.protocol + '//content.95516.com',     // 生产
            '1': 'http://172.18.64.187',      // 新开发
            '2': location.protocol + '//content.95516.com',      // 测试F5, sw需要https+域名
            '3': 'http://172.21.101.19:8088',   // 开发内网, 无外网IP
            '888': 'http://localhost:3000'      // 本地测试
        }[env.appMode];
    })();

    /**
     * 商城服务器地址
     */
    env.pathMallHost = (function () {
        return {
            '0': location.protocol + '//content.95516.com',     // 生产
            '1': 'http://172.21.101.59:8080',   // 测试内网, 无外网IP
            '2': 'http://172.21.101.59:8080'      // 测试内网
        }[env.appMode];
    })();

    /**
     * 微信服务器地址
     */
    env.pathWechatHost = (function () {
        return {
            '0': location.protocol + '//wallet.95516.net',     // 生产
            '1': 'http://172.18.64.187',      // 新开发
            '2': 'http://172.18.179.10',      // 测试外网
            '3': 'http://172.18.179.10',      // 开发内网, 无外网IP
            '888': 'http://172.18.179.10'     // 本地测试
        }[env.appMode];
    })();

    /**
     * Wallet服务器资源地址
     */
    env.pathWalletRes = (function () {
        return {
            '0': env.pathWalletHost + '/s/wl',          // 生产
            '1': env.pathWalletHost + '/s/wl',         // 新开发
            '2': env.pathWalletHost + '/s/wl',          // 测试外网
            '3': env.pathWalletHost + '/s/wl',          //pm环境
            '888': (urlQuery.notWallet ? env.pathWalletHost + '' : 'http://' + location.host)       // 本地测试
        }[env.appMode];
    })();

    /**
     * Wallet服务器请求地址
     */
    env.pathWalletServer = (function () {
        return {
            '0': env.pathWalletHost,          //生产
            '1': env.pathWalletHost,          // 新开发
            //'1': env.pathWalletHost,      //开发 外网
            '2': env.pathWalletHost,          // 测试外网
            '3': env.pathWalletHost,          //pm环境
            '888': 'http://172.20.6.219:3560'   // localhost 时，请求默认指向开发环境
        }[env.appMode];
    })();

    /**
     * Wallet服务器外部请求地址
     */
    env.pathWalletOutServer = (function () {
        return {
            '0': env.pathWalletHost + '/wl/entry/1.0/',          //生产
            '1': env.pathWalletHost + '/wl/entry/1.0/',        // 新开发
            //'1': env.pathWalletHost + '/wl/webentry/1.0/',      //开发 外网
            '2': env.pathWalletHost + '/wl/entry/1.0/',          // 测试外网
            '3': env.pathWalletHost + '/wl/entry/1.0/',            //pm环境
            '888': 'http://172.20.6.219:3560/web/entry/'   // localhost 时，请求默认指向开发环境
        }[env.appMode];
    })();
    /**
     * Youhui服务器请求地址
     */
    env.pathYouhuiServer = (function () {
        return {
            0: env.pathYouhuiHost + "/youhui-web/restlet",     //生产
            1: env.pathYouhuiHost + "/youhui-web/restlet",       // 新开发
            2: env.pathYouhuiHost + "/youhui-web/restlet",     // 测试外网
            3: env.pathYouhuiHost + "/youhui-web/restlet",   //开发内网, 无外网IP
            888: 'http://' + location.host + "/youhui-web/restlet" //本地测试
        }[env.appMode];
    }());

    /**
     * Pay服务器请求地址
     */
    env.pathPayServer = (function () {
        return {
            0: env.pathPayHost,     //生产
            1: env.pathPayHost,     //  新开发
            2: env.pathPayHost,     // 测试外网
            3: env.pathPayHost,    //开发内网, 无外网IP
            888: 'http://172.18.179.11' //本地测试
        }[env.appMode];
    }());
    /**
     * 微信服务器请求地址
     */
    env.pathWechatServer = (function () {
        return env.pathWechatHost + '/upweixin/server/';
    })();

    /**
     * 管理平台上传图标文件目录
     */
    env.pathIconForder = env.pathWalletHost + '/s/wl/icon/default/';

    /**
     * 当前页面路径
     */
    env.currentPath = (function () {
        var path = location.origin + location.pathname;
        return path.replace(/\/(\w)+(\.html)/g, '/');
    })();

})(window.Zepto || window.jQuery, window.UP = window.UP || {});

// commonApp
/**
 * 注意：
 * 1、本文件不要与旧版common.js和cordova.js、share.js混用
 * 2、如果单独引用了任何plugins，本文件将不会自动加载allPluginsMerged.js
 *
 * 本版本还原了官方Cordova的目录结构，cordova.js为Cordova核心代码、cordova_plugins.js为同目录下的插件列表（目前插件列表无实际用处）
 */
(function ($, UP) {
    "use strict";

    UP.W = UP.W || {};
    // 常量
    UP.W.App = UP.W.App || {};

    var app = UP.W.App;

    /**
     * 初始化Cordova和插件
     */
    var initPlugins = function () {
        // 未加载Cordova则加载Cordova
        if (typeof window.cordova === 'undefined') {
            var platform = UP.W.Env.isIOS ? 'ios' : 'android';
            var version = /\(cordova\s([\d\.]+)\)/g.exec(navigator.userAgent)[1];
            var cordovaPath = UP.W.Env.pathWalletRes + '/webV3/common/cordova/' + platform + '.' + version + '/cordova.js';
            UP.W.Util.loadScript(cordovaPath);
        }
        // 未加载插件则动态加载allPluginsMerged.js
        if (typeof window.plugins === 'undefined') {
            UP.W.Util.loadScript(UP.W.Env.pathWalletRes + '/webV3/common/allPluginsMerged.js');
        }
    };

    /** ========== 插件相关 ========== **/
    var isWaiting = false;

    /**
     * 运行插件前判断逻辑
     */
    var checkPlugins = function () {
        return true;
        if (!window.plugins) {
            throw new Error('Plugin is not ready, please listen to "pluginready" event.');
        }
    };

    /**
     * 插件是否准备完毕
     * @returns {boolean}
     */
    app.isPluginReady = function () {
        return !!window.plugins;
    };

    /**
     * 插件初始化完毕后回调
     * @param callback
     */
    app.onPluginReady = function (callback) {
        if (app.isPluginReady()) {
            callback();
        } else {
            document.addEventListener('pluginready', function () {
                callback();
            }, false);
        }
    };

    /** ========== 埋点 ========== **/

    /**
     * 埋点-事件
     * @param name 事件名称
     * @param label 事件标签
     * @param data 埋点数据
     */
    app.logEvent = function (name, label, data) {
        checkPlugins();
        if (data && typeof data !== 'object') {
            console.error('logEvent, data must be object.');
            return;
        }

        if (data && data.money) {
            data.money = parseFloat(data.money);
        }
        var params = {
            name: (name ? name : ''),
            label: (label ? label : ''),
            data: (data ? data : {})
        };

        window.plugins.UPWebAnalysisPlugin.logEvent(null, null, params);
    };

    /**
     * 埋点 - 页面开始
     * @param name 页面名称
     */
    app.logPageBegin = function (name) {
        checkPlugins();
        var params = {
            name: name
        };

        window.plugins.UPWebAnalysisPlugin.logPageBegin(null, null, params);
    };

    /**
     * 埋点 - 页面结束
     * @param name 页面名称
     */
    app.logPageEnd = function (name) {
        checkPlugins();
        var params = {
            name: name
        };

        window.plugins.UPWebAnalysisPlugin.logPageEnd(null, null, params);
    };

    /** ========== 加载动画/提示 ========== **/

    /**
     * 显示加载动画（阻塞）
     */
    app.showLoading = function () {
        checkPlugins();
        if (!isWaiting) {
            window.plugins.UPWebUIPlugin.showWaitingView();
            isWaiting = true;
        }
    };

    /**
     * 显示加载动画（非阻塞）
     */
    app.showWaiting = function () {
        checkPlugins();
        if (!isWaiting) {
            window.plugins.UPWebUIPlugin.showLoadingView();
            isWaiting = true;
        }
    };

    /**
     * 隐藏加载动画
     */
    app.dismiss = function () {
        checkPlugins();
        if (isWaiting) {
            window.plugins.UPWebUIPlugin.dismiss();
            isWaiting = false;
        }
    };

    /**
     * 消息提示Toast
     * @param msg 提示信息
     */
    app.showToast = function (msg) {
        checkPlugins();
        // fix server msg issue.
        msg = msg.replace('[]', '');

        window.plugins.UPWebUIPlugin.showFlashInfo(msg);
    };

    /**
     * 消息提示框
     * @param params {title: '标题', msg: '提示信息...', ok:'确定', cancel: '取消'}
     * @param okCallback 确定回调
     * @param cancelCallback 取消回调
     */
    app.showAlert = function (params, okCallback, cancelCallback) {
        checkPlugins();
        window.plugins.UPWebUIPlugin.showAlertView(okCallback, cancelCallback, JSON.stringify(params));
    };

    /**
     * 打开一个新的Native窗口加载指定页面
     * @param url 页面地址（如果不传全路径则基于当前路径查找）
     * @param params 页面参数（留空null或undefined）
     * @param title 窗口标题（默认标题使用undefined，iOS貌似不支持？）
     * @param isFinish 是否关闭当前的窗口
     */
    app.createWebView = function (url, params, title, isFinish) {
        checkPlugins();
        if (!url) {
            return;
        }

        // 相对路径，生成全路径
        if (!/:\/\//.test(url)) {
            var path = location.origin + location.pathname;
            url = path.replace(/\/(\w)+(\.html)/g, '/' + url);
        }
        // 生成参数
        if (params) {
            url += url.indexOf('?') > 0 ? ('&' + $.param(params)) : ('?' + $.param(params));
        }

        window.plugins.UPWebNewPagePlugin.createWebPage(JSON.stringify({
            title: title,
            url: url,
            loading: "yes",
            toolbar: "no",
            isFinish: isFinish || "0"
        }));
    };

    /**
     * 关闭当前Native窗口
     */
    app.closeWebView = function () {
        checkPlugins();
        window.plugins.UPWebClosePagePlugin.closeWebApp();
    };

    app.mccStateChanged = function () {
        checkPlugins();
        window.plugins.UPWebUserInfoPlugin.mccStateChanged();
    }

    /**
     * 使用手机浏览器打开链接
     */
    app.openBrowser = function (url, fail) {
        checkPlugins();
        url = url || window.location.href;
        window.plugins.UPWebOpenOtherPlugin.openBrowser({url: url}, fail);
    };

    /**
     * 获取用户信息（手机后台，注意Android和iOS返回信息不一致）
     * @param success
     * @param fail
     */
    app.getUserInfo = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebUserInfoPlugin.getUserInfo(success, fail, null);
    };

    /**
     * 获取用户信息
     * @param success
     * @param fail
     * certStatus 实名状态
     * eduStatus 学籍认证状态
     * maskCertId 掩码证件号
     * mobilephone 手机号
     * realName 真实姓名
     * userid 用户id
     * username 用户名
     */
    app.getUserDetailInfo = function (success, fail) {
        checkPlugins();
        if((UP.W.Env.isIOS && UP.W.Env.appVer>=602) || (UP.W.Env.isAndroid && UP.W.Env.appVer>=607)){
            window.plugins.UPWebUserDetailPlugin.getUserDetail(success, fail, null);
        }else{
            UP.W.UI.showLoading();
            var params = {
                cmd: "/app/inApp/user/get",
                method: "GET",
                params: {}
            };
            app.sendMessage(params,false,false,function(data){
                UP.W.UI.dismiss();
                data.params.username = data.params.loginName;
                data.params.mobilephone = data.params.loginMobile;
                data.params.userid = data.params.encryptCdhdUsrId;
                if (typeof success === 'function') {
                    success(data.params);
                }
            },function(err){
                UP.W.UI.dismiss();
                if (typeof fail === 'function') {
                    err.desc = err.msg;
                    fail(err);
                }
            },function(xhr){
                console.log(xhr);
                UP.W.UI.dismiss();
                UP.W.UI.showToast('获取用户信息失败！');
            })
        }
    };

    /**
     * 获取当前定位信息
     * @param success
     * @param fail
     */
    app.getCurrentLocationInfo = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebNativeInfoPlugin.getCurrentLocationInfo(success, fail, null);
    };

    /*
     * 获取请求头信息
     * @param success
     * @param fail
     * */
    app.getReqHeaderInfo = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebNativeInfoPlugin.getReqHeaderInfo(success, fail);
    };

    /**
     * 获取客户端信息
     * @param success
     * @param fail
     * @param type 0：版本号；1：经纬度；5：UserId
     */
    app.fetchNativeData = function (type, success, fail) {
        checkPlugins();
        var params = {type: type};
        // 该插件比较另类，返回JSON String
        var successCallback = function (data) {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            success(data);
        };
        window.plugins.UPWebUserInfoPlugin.fetchNativeData(successCallback, fail, params);
    };

    app.getUserLocation = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebNativeInfoPlugin.getUserLocation(success, fail);
    };

    /**
     * 设置窗口标题
     * @param title
     */
    app.setNavigationBarTitle = function (title) {
        checkPlugins();
        window.plugins.UPWebBarsPlugin.setNavigationBarTitle(title);
    };

    /**
     * 设置窗口标题样式
     *{
     * "transparent": "1",  //是否透明，1透明，0不透明
     * "merchantPic": "http://www.bejson.com",  //商户图片，返回该字段则展示图标，不返回不展示
     * "backgroundColor": "#000000",   //背景色，RGB形式字符串"scrollHeight": "100",                                                         //滑动高度，滑至多高开始不透明，单位像素
     * "textUp": {           //上排文字及文字大小，颜色
     *      "text": "苏宁",
     *      "font": "12",
     *      "color": "#FFFFFF"
     *  },
     * "textDown": {        //下排文字及文字大小，颜色
     *     "text": "苏宁",
     *     "font": "12",
     *     "color": "#FFFFFF"
     *  }
     *}
     */
    app.setNavigationBarStyle = function (params) {
        checkPlugins();
        window.plugins.UPWebBarsPlugin.setNavigationBarStyle(params);
    };

    /**
     * 修改窗口右侧按钮
     * @param title 图标标题
     * @param image 图标文件
     * @param handler 点击回调函数
     * @param index 右数第几个
     */
    app.refreshRightButton = function (params) {
        checkPlugins();
        window.plugins.UPWebBarsPlugin.refreshRightButton(params);
    };

    /**
     * 设置窗口右侧按钮（数组版，即右侧可以设置并列多个按钮）
     * [{
     *  "title":"分享", //若为文字，文字内容
     *  “color”：'#000000', // 文本颜色
     *  "image":"urlurlurl", //若为图片，图片下载链接
     *  "handler": 点击回调函数
     *  “index”:”1”  //右数第几个
     * },{}]
     */
    app.setNavigationBarRightButtonArr = function (btnArr) {
        checkPlugins();
        window.plugins.UPWebBarsPlugin.setNavigationBarRightButtonArr(btnArr);
    };

    /**
     * 设置窗口右侧按钮
     * @param title 图标标题
     * @param image 图标文件
     * @param handler 点击回调函数
     */
    app.setNavigationBarRightButton = function (title, image, handler) {
        checkPlugins();
        var params = {};
        if (title) {
            params.title = title;
        }
        if (image) {
            params.image = image;
        }

        if (handler) {
            params.handler = handler;
        }

        window.plugins.UPWebBarsPlugin.setNavigationBarRightButton(null, null, params);
    };

    /**
     * 登录
     * @param params
     * @param success
     * @param fail
     * 客户端返回的err.code：1用户已经登录；2用户取消登录；3程序已经登录，但是缺少username和userID字段
     */
    app.login = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebUserLoginPlugin.login(success, fail, params);
    };

    /**
     * 强制登录
     * @param params
     * @param success
     * @param fail
     */
    app.forceLogin = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebUserLoginPlugin.forceLogin(success, fail, params);
    };

    /**
     * 拉起绑卡控件
     * @params params:{scene:'场景号'}
     * @param success
     * @param fail
     */
    app.addBankCard = function (success, fail, params) {
        checkPlugins();
        window.plugins.UPWebBankCardPlugin.addBankCard(success, fail, params);
    };

    /**
     * 调用Native选择或拍摄图片
     * @param params {maxWidth: 最大宽度, maxHeight：最大高度, sourceType: '1'-仅拍照 ，'2'-从相册中选择， '3'- 两者皆有}
     * @param success
     * @param fail
     */
    app.chooseImage = function (params, success, fail) {
        checkPlugins();
        var successCallback = function (data) {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            success(data);
        };

        window.plugins.UPWebUIPlugin.chooseImage(successCallback, fail, params);
    };

    /**
     * 页面返回及关闭事件监听
     * @param pageBackCB
     * @param pageCloseCB
     */
    app.setPageBackListener = function (pageBackCB, pageCloseCB) {
        checkPlugins();
        var params = {};

        if (typeof pageBackCB === 'function') {
            params.backHandler = pageBackCB;
        }

        if (typeof pageCloseCB === 'function') {
            params.closeHandler = pageCloseCB;
        }

        window.plugins.UPWebBarsPlugin.setPageBackListener(null, null, params);
    };

    /**
     * 扫描条码和二维码
     * @param params
     * @param success
     * @param fail
     */
    app.scanQRCode = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebScanPlugin.scanQRCode(success, fail, params);
    };
    /**
     * 扫一扫付款
     */
    app.scanQRCodeNew = function () {
        checkPlugins();
        window.plugins.UPWebScanPlugin.scanQRCodeNew();
    };
    /**
     * 扫标识
     */
    app.scanLogo = function () {
        checkPlugins();
        window.plugins.UPWebScanPlugin.scanLogo();
    };
    /**
     * 出示付款码
     */
    app.qrCodePay = function () {
        checkPlugins();
        window.plugins.UPWebScanPlugin.qrCodePay();
    };

    /** 给银行卡拍照
     *
     */
    app.scanCard = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebScanPlugin.scanCard(success, fail, {});
    }

    /**
     *  保存base64图片到本地
     */
    app.savePicToLocal = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebScanPlugin.savePicToLocal(success, fail, params);
    }

    /**
     * pdf文件（base64形式）保存到本地（安卓插件）
     * params{
     *     name:''
     *     pdf:'base64'
     * }
     */
    app.savePdfToLocal = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebScanPlugin.savePdfToLocal(success, fail, params);
    };

    /**
     * pdf文件（base64形式）使用其它应用打开（ios插件）
     * params{
     *     name:''
     *     pdf:'base64'
     * }
     */
    app.openPdfByOtherApp = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebScanPlugin.openPdfByOtherApp(success, fail, params);
    };
    /**
     * 调起更多分享的插件，可配置分享面板上展示的方式{0：短信；1：微博；3：微信；4：朋友圈；5：QQ；6：QQ空间;7：链接}
     * 可选择1:链接分享 2：文字分享 3：图片分享
     * @params shareCallback 一般只是链接分享时传
     * @param params
     * @param success, 客户端只会返回shareChannel
     * @param fail
     */
    app.showShareMorePanel = function (params, shareCallback, success, fail) {
        checkPlugins();

        if (!params.title) {
            params.title = '';
        }
        if (!params.desc) {
            params.desc = '';
        }
        params.content = params.desc;
        if (!params.picUrl) {
            params.picUrl = 'https://wallet.95516.com/s/wl/webV3/402/images/common/logo.png';
        }
        params.imgUrl = params.picUrl;
        if (!params.shareUrl) {
            params.shareUrl = location.href;
        }
        if (!params.shareList){
            params.shareList = [{
                "shareId": "0",
                "shareType": "1",
                "shareData":{}
            }, {
                "shareId": "1",
                "shareType": "1",
                "shareData":{}
            }, {
                "shareId": "3",
                "shareType": "1",
                "shareData":{}
            }, {
                "shareId": "4",
                "shareType": "1",
                "shareData":{}
            }, {
                "shareId": "5",
                "shareType": "1",
                "shareData":{}
            }, {
                "shareId": "6",
                "shareType": "1",
                "shareData":{}
            }, {
                "shareId": "7",
                "shareType": "1",
                "shareData":{}
            }];
        }

        /**
         * 根据channel生成默认的分享内容
         * 由于Android和iOS每个分享渠道对应内容都不一样，只能单独一个函数根据渠道分别生成分享内容
         * @param channel
         */
        function getDefaultShareContent(channel) {
            // iOS和Android坑爹的不一致
            // iOS：
            // 微信、朋友圈、QQ、Qzone：title、desc、picUrl、shareUrl
            // 微博、短信：content
            // 拷贝：title + shareUrl
            // Android：
            // 微信、朋友圈、QQ、Qzone：title、content、imgUrl、shareUrl
            // 短信：content + shareUrl
            // 微博：content
            // 邮件：title、content + shareUrl
            // 拷贝：shareUrl

            // 原来单独将channel设置到defaultParams上，导致下面部分分支漏掉了channel
            params.shareUrl += (params.shareUrl.indexOf('?') < 0 ? '?channel=' + channel : '&channel=' + channel );

            // 默认返回对象
            var defaultParams = {
                title: params.title,
                content: params.desc,
                desc: params.desc,
                picUrl: params.picUrl,
                imgUrl: params.picUrl,
                shareUrl: params.shareUrl,
                channel: channel
            };
            switch (channel) {
                case 0: // 短信
                    if (UP.W.Env.isIOS) {
                        defaultParams.content = params.content + ' ' + params.shareUrl;
                    }
                    break;
                case 1: // 新浪微博
                    defaultParams.content = params.content + ' ' + params.shareUrl;
                    break;
                case 3: // 微信
                case 4: // 朋友圈
                case 5: // QQ
                case 6: // QZone
                    break;
                case 7: // 拷贝
                    if (UP.W.Env.isAndroid) {
                        defaultParams.shareUrl = params.title + ' ' + params.shareUrl;
                    }
                    break;
                default:

            }
            return defaultParams;
        }

        //每次重新生成函数，避免被share.js等影响
        // iOS分享回调
        window.unionpayWalletShareContent_iOS = function (channel) {
            var params = getDefaultShareContent(channel);
            if (typeof shareCallback === 'function') {
                params = shareCallback(channel, params);
            }
            return JSON.stringify(params);
        };
        // Android分享回调
        window.unionpayWalletShareContent_Android = function (channel) {
            var params = getDefaultShareContent(channel);
            if (typeof shareCallback === 'function') {
                params = shareCallback(channel, params);
            }
            if (share_utils && (typeof share_utils.setCommonTemplate === 'function')) {
                share_utils.setCommonTemplate(JSON.stringify(params));
            }
        };
        //调插件对象简化
        var object ={};
        object.shareList=params.shareList;
        // 客户端预加载图片
        window.plugins.UPWebBarsPlugin.prefetchImage({picUrl: params.picUrl});
        window.plugins.UPSharePlugin.showShareMorePanel(success, fail, object);
    };
    /**
     * 直接打开具体的分享方式{0：短信；1：微博；3：微信；4：朋友圈；5：QQ；6：QQ空间;7：链接}
     * 可选择1:链接分享 2：文字分享 3：图片分享
     * @param params
     * @param success
     * @param fail
     */
    app.shareSinglePlugin = function (params, shareCallback, success, fail) {
        checkPlugins();

        if (!params.title) {
            params.title = '';
        }
        if (!params.desc) {
            params.desc = '';
        }
        params.content = params.desc;
        if (!params.picUrl) {
            params.picUrl = 'https://wallet.95516.com/s/wl/webV3/402/images/common/logo.png';
        }
        params.imgUrl = params.picUrl;
        if (!params.shareUrl) {
            params.shareUrl = location.href;
        }
        //默认为微信
        if(!params.shareId){
            $.extend(params, {
                "shareId": "3",
                "shareType": "1",
                "shareData":{}
            });
        }

        /**
         * 根据channel生成默认的分享内容
         * 由于Android和iOS每个分享渠道对应内容都不一样，只能单独一个函数根据渠道分别生成分享内容
         * @param channel
         */
        function getDefaultShareContent(channel) {
            // iOS和Android坑爹的不一致
            // iOS：
            // 微信、朋友圈、QQ、Qzone：title、desc、picUrl、shareUrl
            // 微博、短信：content
            // 拷贝：title + shareUrl
            // Android：
            // 微信、朋友圈、QQ、Qzone：title、content、imgUrl、shareUrl
            // 短信：content + shareUrl
            // 微博：content
            // 邮件：title、content + shareUrl
            // 拷贝：shareUrl

            // 原来单独将channel设置到defaultParams上，导致下面部分分支漏掉了channel
            params.shareUrl += (params.shareUrl.indexOf('?') < 0 ? '?channel=' + channel : '&channel=' + channel );

            // 默认返回对象
            var defaultParams = {
                title: params.title,
                content: params.desc,
                desc: params.desc,
                picUrl: params.picUrl,
                imgUrl: params.picUrl,
                shareUrl: params.shareUrl,
                channel: channel
            };
            switch (channel) {
                case 0: // 短信
                    if (UP.W.Env.isIOS) {
                        defaultParams.content = params.content + ' ' + params.shareUrl;
                    }
                    break;
                case 1: // 新浪微博
                    defaultParams.content = params.content + ' ' + params.shareUrl;
                    break;
                case 3: // 微信
                case 4: // 朋友圈
                case 5: // QQ
                case 6: // QZone
                    break;
                case 7: // 拷贝
                    if (UP.W.Env.isAndroid) {
                        defaultParams.shareUrl = params.title + ' ' + params.shareUrl;
                    }
                    break;
                default:

            }
            return defaultParams;
        }

        //每次重新生成函数，避免被share.js等影响
        // iOS分享回调
        window.unionpayWalletShareContent_iOS = function (channel) {
            var params = getDefaultShareContent(channel);
            if (typeof shareCallback === 'function') {
                params = shareCallback(channel, params);
            }
            return JSON.stringify(params);
        };
        // Android分享回调
        window.unionpayWalletShareContent_Android = function (channel) {
            var params = getDefaultShareContent(channel);
            if (typeof shareCallback === 'function') {
                params = shareCallback(channel, params);
            }
            if (share_utils && (typeof share_utils.setCommonTemplate === 'function')) {
                share_utils.setCommonTemplate(JSON.stringify(params));
            }
        };
        //调插件对象简化
        var object ={};
        object.shareId = params.shareId;
        object.shareType = params.shareType;
        object.shareData = params.shareData;

        // 客户端预加载图片
        window.plugins.UPWebBarsPlugin.prefetchImage({picUrl: params.picUrl});
        window.plugins.UPSharePlugin.shareSinglePlugin(success, fail, object);
    };
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
    app.showSharePanel = function (params, shareCallback) {
        checkPlugins();

        if (!params.title) {
            params.title = '';
        }
        if (!params.desc) {
            params.desc = '';
        }
        params.content = params.desc;
        if (!params.picUrl) {
            params.picUrl = 'https://wallet.95516.com/s/wl/webV3/402/images/common/logo.png';
        }
        params.imgUrl = params.picUrl;
        if (!params.shareUrl) {
            params.shareUrl = location.href;
        }

        /**
         * 根据channel生成默认的分享内容
         * 由于Android和iOS每个分享渠道对应内容都不一样，只能单独一个函数根据渠道分别生成分享内容
         * @param channel
         */
        function getDefaultShareContent(channel) {
            // iOS和Android坑爹的不一致
            // iOS：
            // 微信、朋友圈、QQ、Qzone：title、desc、picUrl、shareUrl
            // 微博、短信：content
            // 拷贝：title + shareUrl
            // Android：
            // 微信、朋友圈、QQ、Qzone：title、content、imgUrl、shareUrl
            // 短信：content + shareUrl
            // 微博：content
            // 邮件：title、content + shareUrl
            // 拷贝：shareUrl

            // 原来单独将channel设置到defaultParams上，导致下面部分分支漏掉了channel
            params.shareUrl += (params.shareUrl.indexOf('?') < 0 ? '?channel=' + channel : '&channel=' + channel );

            // 默认返回对象
            var defaultParams = {
                title: params.title,
                content: params.desc,
                desc: params.desc,
                picUrl: params.picUrl,
                imgUrl: params.picUrl,
                shareUrl: params.shareUrl,
                channel: channel
            };
            switch (channel) {
                case 0: // 短信
                    if (UP.W.Env.isIOS) {
                        defaultParams.content = params.content + ' ' + params.shareUrl;
                    }
                    break;
                case 1: // 新浪微博
                    defaultParams.content = params.content + ' ' + params.shareUrl;
                    break;
                case 3: // 微信
                case 4: // 朋友圈
                case 5: // QQ
                case 6: // QZone
                    break;
                case 7: // 拷贝
                    if (UP.W.Env.isAndroid) {
                        defaultParams.shareUrl = params.title + ' ' + params.shareUrl;
                    }
                    break;
                default:

            }
            return defaultParams;
        }

        //每次重新生成函数，避免被share.js等影响
        // iOS分享回调
        window.unionpayWalletShareContent_iOS = function (channel) {
            var params = getDefaultShareContent(channel);
            if (typeof shareCallback === 'function') {
                params = shareCallback(channel, params);
            }
            return JSON.stringify(params);
        };
        // Android分享回调
        window.unionpayWalletShareContent_Android = function (channel) {
            var params = getDefaultShareContent(channel);
            if (typeof shareCallback === 'function') {
                params = shareCallback(channel, params);
            }
            if (share_utils && (typeof share_utils.setCommonTemplate === 'function')) {
                share_utils.setCommonTemplate(JSON.stringify(params));
            }
        };

        // 客户端预加载图片
        window.plugins.UPWebBarsPlugin.prefetchImage({picUrl: params.picUrl});
        window.plugins.UPWebBarsPlugin.showSharePanel(null, null, params);
    };


    /**
     * 执行队列中第一个下发请求任务
     * 由于插件无法支持并发调用，所以为了避免业务层并发调用导致回调异常，公共函数中对请求进行控制，
     * 同时下发多个请求会排到队列中，前一个请求执行完毕之后才会下发下一个请求，因此并发请求过多会导致后面请求响应很慢。
     */

        // 请求队列
    var requestQueue = [];
    // 是否正在下发请求
    var isRequesting = false;
    var doSendMessage = function () {
        // 正在执行请求或者请求队列为空，则直接返回
        if (isRequesting || requestQueue.length === 0) {
            return;
        }
        // 从队列头取出请求
        var request = requestQueue.shift();
        var params = request.params;
        var forChsp = request.forChsp;
        var byAjax = request.byAjax;
        var success = request.success;
        var error = request.error;
        var fail = request.fail;

        // 判断会话失效
        var checkInvalidSession = function (data, xhr) {
            // 会话失效
            //forChsp时客户端会判断code不是00则进失败回调，失败回调中判断是否失效会话取的是status，所以不会调起登录插件，这里做了个兼容
            if ((data && data.resp === '+9x9+' || xhr && xhr.resp === '+9x9+')) {
                if (!byAjax) {
                    app.dismiss();
                    if (UP.W.UI) {
                        UP.W.UI.dismiss();
                    }
                    setTimeout(function () {
                        app.showAlert({
                                title: '提示',
                                msg: (data && data.msg) || '系统发现您的账号异常，为了您的账号安全，请重新登录！',
                                ok: '重新登录'
                            },
                            function () {
                                app.forceLogin({'refreshPage': true});
                            });
                    }, 200);
                    return true;
                }
            }
            return false;
        };

        // 统一成功回调（可能包含业务错误）
        var successCallback = function (data) {
            if ((typeof data) === 'string') {
                data = JSON.parse(data);
            }

            // 无效会话统一处理，不继续执行
            if (checkInvalidSession(data)) {
                isRequesting = false;
                return;
            }

            if (data.resp === '00') {
                if (typeof success === 'function') {
                    success(data);
                }
            } else {
                if (typeof error === 'function') {
                    error(data);
                }
            }

            // 开始发送下一个请求
            isRequesting = false;
            doSendMessage();
        };

        // 统一失败回调（请求异常等）
        var failCallback = function (xhr) {
            // '499'状态码作特殊处理，ios放在resp中，andorid放在errorCode
            if (xhr.errorCode == '499') {
                xhr.resp = xhr.errorCode;
            }

            // XHR错误
            // 无效会话统一处理，不继续执行
            if (checkInvalidSession(null, xhr)) {
                isRequesting = false;
                return;
            }
            if (xhr.resp) {
                if (typeof error === 'function') {
                    error(xhr);
                }
            } else {
                if (typeof fail === 'function') {
                    fail(xhr);
                }
            }

            // 开始发送下一个请求
            isRequesting = false;
            doSendMessage();
        };

        isRequesting = true;
        if (byAjax) {
            var pureAjax = function (reqHeaderInfo) {
                if (forChsp) {
                    params.params.version = params.params.version || params.version;
                    params.params.source = params.params.source || params.source;
                    // 优惠后台POST参数需要stringify
                    var contentType = 'application/x-www-form-urlencoded';
                    if (params.method === 'POST') {
                        params.params = JSON.stringify(params.params);
                        contentType = 'application/json';
                    }
                    // 优惠后台
                    $.ajax({
                        type: params.method,
                        url: params.uri,
                        contentType: contentType,
                        dataType: "json",
                        data: params.params,
                        // 允许跨域cookie，钱包用的zepto版本不支持xhrFields，所以放到beforeSend中
                        beforeSend: function (req) {
                            req.withCredentials = true;
                            if (reqHeaderInfo) {
                                for (var i in reqHeaderInfo) {
                                    req.setRequestHeader(i, reqHeaderInfo[i]);
                                }
                            }

                        },
                        success: successCallback,
                        error: failCallback
                    });
                } else {
                    // 手机后台，需要增加额外的HTTP标头

                    //如果是往生活组发则不stringify params
                    var group = params.cmd && params.cmd.split("/")[1];
                    if(group !== "life"){
                        params.params = JSON.stringify(params.params);
                    }
                    $.ajax({
                        type: params.httpMethod,
                        url: params.path.replace("/entry/", "/webentry/"),
                        dataType: "json",
                        data: params.params,
                        headers: {
                            vid: params.vid || '',
                            decrypt: 0
                        },
                        // 允许跨域cookie，钱包用的zepto版本不支持xhrFields，所以放到beforeSend中
                        beforeSend: function (req) {
                            req.withCredentials = true;
                            if (reqHeaderInfo) {
                                for (var j in reqHeaderInfo) {
                                    req.setRequestHeader(j, reqHeaderInfo[j]);
                                }
                            }
                        },
                        success: successCallback,
                        error: failCallback
                    });
                }
            };
            // 通过Ajax下发请求
            // if (app.isPluginReady() && !forChsp && params.path.indexOf(UP.W.Env.pathContentHost)!== -1) {
            if (app.isPluginReady()) {
                app.getReqHeaderInfo(function (data) {
                        var reqHeaderInfo = {
                            sid: '',
                            urid: '',
                            dfpSessionId: '',
                            cityCd: '',
                            gray: ''
                        };
                        $.extend(reqHeaderInfo, data);
                        pureAjax(reqHeaderInfo);
                    },
                    function (err) {
                        pureAjax();
                    });
            } else {
                pureAjax();
            }
        } else {
            // 通过插件下发请求
            checkPlugins();
            console.log(params);
            if (forChsp) {
                // 优惠后台
                window.plugins.UPWebNetworkPlugin.sendMessageForChsp(successCallback, failCallback, params);
            } else {
                window.plugins.UPWebNetworkPlugin.sendMessage(successCallback, failCallback, params);
            }
        }
    };

    /**
     * 向服务器发送请求
     * @param params 请求参数
     *                  version：版本，默认是1.0
     *                  source：来源，默认根据Android、iOS自动添加
     *                  encrypt：是否加密，默认加密
     *                  method：请求方法，POST或GET
     *                  cmd：请求命令（也可自行将cmd组装至uri[优惠后台]或path[钱包后台]）
     *                  uri/path：请求地址，建议仅填充cmd，不建议自行组装uri/path
     *                  params：发送给后台的参数
     *                  vid：如果通过Ajax方式向wallet后台发送请求需要携带vid
     * @param forChsp 是否向优惠后台发送请求（默认向手机后台发送请求）
     * @param byAjax 是否使用Ajax发送请求（默认使用控件）
     * @param success 成功回调
     * @param error 错误回调（业务错误）
     * @param fail 失败回调（请求失败）
     */
    app.sendMessage = function (params, forChsp, byAjax, success, error, fail) {
        params = params || {};
        params.version = params.version || '1.0';
        params.source = params.source || (UP.W.Env.isiOS ? '2' : '3');
        // 注意：wallet的path是带有版本号的，youhui的uri不带有版本号
        if (forChsp) {
            params.encrypt = !(params.encrypt === false || params.encrypt === '0');
            params.method = params.method || 'POST';
            params.uri = params.uri || params.cmd;
            if (params.uri.indexOf("/pay-web/restlet/") !== -1 || params.uri.indexOf("/pay-status-web/restlet/") !== -1) {
                params.uri = UP.W.Env.pathPayServer + params.uri;
            } else if (params.uri.indexOf("/pay-web/restlet/") === -1 && params.uri.indexOf("/mac-web/restlet/") === -1 && byAjax) {
                params.uri = UP.W.Env.pathYouhuiServer + params.uri;
            } else if (params.uri.indexOf("/mac-web/restlet/") !== -1) {
                params.uri = UP.W.Env.pathYouhuiHost + params.uri;
            }
            params.params = params.params || {};
            params.params.version = params.params.version || '1.0';
            params.params.source = params.params.source || (UP.W.Env.isiOS ? '2' : '3');
        } else {
            params.encrypt = (params.encrypt === false || params.encrypt === '0') ? '0' : '1';
            params.httpMethod = params.httpMethod || params.method || 'POST';
            var server = UP.W.Env.pathWalletServer;
            if (UP.W.Env.appMode === '1') {
                //开发环境
                server = UP.W.Util.getDevelopServer(params.cmd);
            }
            server = params.cmd && (params.cmd.indexOf("/inApp/") === -1 ? UP.W.Env.pathWalletOutServer : server);
            params.path = params.path || (server + params.cmd);
            params.params = params.params || {};
        }
        // 将请求信息加入队列
        requestQueue.push({
            params: params,
            forChsp: forChsp,
            byAjax: byAjax,
            success: success,
            error: error,
            fail: fail
        });

        doSendMessage();
    };

    /**
     * 向服务器发送请求
     * @param params 请求参数
     *                  version：版本，默认是1.0
     *                  source：来源，默认根据Android、iOS自动添加
     *                  encrypt：是否加密，默认加密
     *                  method：请求方法，POST或GET
     *                  cmd：请求命令（也可自行将cmd组装至uri[优惠后台]或path[钱包后台]）
     *                  uri/path：请求地址，建议仅填充cmd，不建议自行组装uri/path
     *                  params：发送给后台的参数
     *                  vid：如果通过Ajax方式向wallet后台发送请求需要携带vid
     * @param forChsp 是否向优惠后台发送请求（默认向手机后台发送请求）
     * @param byAjax 是否使用Ajax发送请求（默认使用控件）
     * @param success 成功回调
     * @param error 错误回调（业务错误）
     * @param fail 失败回调（请求失败）
     * @param update 异步刷新回调 如果设置async为true后可以添加update回调 如果不填写默认以success进行处理
     * @param storage 缓存参数
     *                  needSw            //默认false大部分用的是插件需要的手动去加
     *                  storageType      //默认使用localstorage
     *                  async            //默认获取缓存后不发请求，改为true后会异步去请求后台并刷新数据
     *                  endOfSyncFunc    //todo 重要！！！！回调中如果存在异步（插件等）需要标明异步状态为false
     *                  validateTime     //有效期默认无限有效期 单位毫秒
     *                  saveWithId       //默认true以用户id进行存储否则false以local存储
     *                  saveSucc         //保存成功后的回调
     *                  saveErr          //保存失败后的回调
     *                  rollKey          //强制设置主键
     *                  secondKey        //强制设置次要键值
     todo 重要说明 调用异步模式（async设置为true）后可能在success回调里存在异步操作，该情况下回导致缓存的回调可能
     todo 未执行完成，请求的回调又开始执行了的情况，所以我们统一在success回调和update回调的入参增加了第二个参数
     todo 用于兼容回调内包含异步的状况，使用方法为：首先设置endOfSyncFunc参数为true,其次success和update回
     todo 调内会有2个入参，success（resp，fuc），请在代码闭包处使用fuc.endOfFunc()
     */
    app.sendMessageWithStorage = function (params, forChsp, byAjax, success, error, fail, storage ,update) {
        var fuc = {endWithSMG:false};
        var running = 0;
        var timeout = null;
        fuc.endOfFunc = function () {
            running = 1;
        };
        params.params = UP.W.Util.serialJson(params.params);
        var stOpt = $.extend({
            needSw: true,
            storageType: 1,
            async: false,
            endOfSyncFunc: true,
            validateTime: 'infinite',
            saveWithId: true,
            saveSucc: null,
            saveErr: null
        }, storage);
        //get请求的ajax 支持sw支持broad
        // if ((UP.W.Util.isSupBroadcastUpdate() || UP.W.Util.isSupServiceWorker()) && stOpt.needSw && byAjax && params.method.toLowerCase() === 'get') {
        if (false) {
            app.sendMessage(params, forChsp, byAjax, function (resp) {
                success(resp,fuc);
            }, function(err){
                error(err,fuc);
            }, function(xhr){
                fail(xhr,fuc);
            });
        } else {
            stOpt.rollKey = stOpt.rollKey || params.path || params.cmd || params.uri;
            stOpt.secondKey = stOpt.secondKey || JSON.stringify(params.params);
            stOpt.readWithId = stOpt.saveWithId;
            if (stOpt.async) {
                app.sendMessage(params, forChsp, byAjax, function (resp) {
                    fuc.endWithSMG = true;
                    if (running === 2||running === 1) {
                        clearTimeout(timeout);
                        updateValue(Object.create(resp));
                    } else {
                        running = 1;
                        if (typeof success === 'function') {
                            success(Object.create(resp),fuc);
                        }
                    }
                    stOpt.data = resp;
                    UP.W.Util.saveToStorage(stOpt, function(){
                        if(typeof stOpt.saveSucc === 'function'){
                            stOpt.saveSucc(resp);
                        }
                    },function(){
                        if(typeof stOpt.saveErr === 'function'){
                            stOpt.saveErr(resp);
                        }
                    });
                }, function(err){
                    fuc.endWithSMG = true;
                    if (running === 2||running === 1) {
                        // 缓存先执行情况下错误回调不执行
                        // clearTimeout(timeout);
                        // errorFuc(err,error);
                    } else {
                        running = 1;
                        if (typeof error === 'function') {
                            error(err,fuc);
                        }
                    }
                }, function(xhr){
                    fuc.endWithSMG = true;
                    if (running === 2||running === 1) {
                        // 缓存先执行情况下错误回调不执行
                        // clearTimeout(timeout);
                        // errorFuc(xhr,fail);
                    } else {
                        running = 1;
                        if (typeof fail === 'function') {
                            fail(xhr,fuc);
                        }
                    }
                });
            }
            UP.W.Util.getFromStorage(stOpt, function (resp) {
                //缓存先到执行否则不执行
                if (running === 0) {
                    running = 2;
                    if (typeof success === 'function') {
                        try {
                            success(Object.create(resp), fuc);
                            if (stOpt.endOfSyncFunc) {
                                running = 1;
                            }
                        }catch (e){
                            stOpt.needuserid = stOpt.saveWithId;
                            UP.W.Util.removeStorage(stOpt,null,function () {
                                localStorage.clear();
                            });
                            if(stOpt.async){
                                running = 1;
                                return;
                            }
                            app.sendMessage(params, forChsp, byAjax, function (resp) {
                                if (typeof success === 'function') {
                                    success(Object.create(resp),fuc);
                                }
                                stOpt.data = resp;
                                UP.W.Util.saveToStorage(stOpt, function(){
                                    if(typeof stOpt.saveSucc === 'function'){
                                        stOpt.saveSucc(resp);
                                    }
                                },function(){
                                    if(typeof stOpt.saveErr === 'function'){
                                        stOpt.saveErr(resp);
                                    }
                                });
                            }, error, fail);
                        }
                    }
                }
            }, function () {
                if(stOpt.async){
                    return;
                }
                app.sendMessage(params, forChsp, byAjax, function (resp) {
                    fuc.endWithSMG = true;
                    if (typeof success === 'function') {
                        success(Object.create(resp),fuc);
                    }
                    stOpt.data = resp;
                    UP.W.Util.saveToStorage(stOpt, function(){
                        if(typeof stOpt.saveSucc === 'function'){
                            stOpt.saveSucc(resp);
                        }
                    },function(){
                        if(typeof stOpt.saveErr === 'function'){
                            stOpt.saveErr(resp);
                        }
                    });
                }, error, fail);
            });
        }
        function errorFuc(err,func){
            timeout = setTimeout(function () {
                if (running === 1) {
                    clearTimeout(timeout);
                        if (typeof func === 'function') {
                            func(err, fuc);
                        }
                }else{
                    errorFuc(err,func);
                }
            }, 100);
        }
        function updateValue(resp){
            timeout = setTimeout(function () {
                if (running === 1) {
                    clearTimeout(timeout);
                    if (update !== null && typeof update === 'function') {
                        update(resp, fuc);
                    } else {
                        if (typeof success === 'function') {
                            success(resp, fuc);
                        }
                    }
                }else{
                    updateValue(resp);
                }
            }, 100);
        }
    };
    /**
     * 直接调用支付控件
     * @param params
     * @param success
     * @param fail
     */
    app.pay = function (params, success, fail) {
        window.plugins.UPWebPayPlugin.pay(success, fail, params);
    };

    /**
     * 支付订单，包含自动调用order.prehandle
     * @param params 参数
     *          tn: 订单号
     *          merchantId: 商户ID，如果希望使用Apple Pay等第三方支付需要传入
     *          title: 在支持第三方支付时，提示界面的标题（默认不传）
     *          cancelTitle: 在支持第三方支付时，提示界面的取消按钮文字
     * @param success 成功
     * @param fail 失败
     */
    app.payBill = function (params, success, fail) {
        // 检查tn号
        if (!params || !params.tn) {
            if (typeof fail === 'function') {
                fail({msg: '云闪付支付必须先生成TN号。'});
            }
            return;
        }

        // 2016.10.26 ↓ by YanTingyu 公缴prehandle不要了，直接调支付

        // 向手机后台下发order.prehandle，然后调用支付控件支付
        // app.showWaiting();
        // app.sendMessage({
        //         cmd: 'order.prehandle',
        //         method: 'POST',
        //         params: params
        //     },
        //     false,  // 发到手机后台
        //     false,  // 非Ajax
        //     function (data) {
        // prehandle成功，开始支付
        // app.dismiss();

        // 生产环境mode是'00'，否则是'02'
        app.pay({
                tn: params.tn,
                mode: UP.W.Env.appMode === '0' ? '00' : '02',
                merchantId: params.merchantId || '',
                title: params.title || '',
                msg: params.msg || '',
                upWalletPay: params.upWalletPay || '',
                cancel: params.cancel || ''
            },
            function (data) {
                if (typeof success === 'function') {
                    success(data);
                }
            },
            function (err) {
                err = (typeof err === 'string' ? {msg: err} : err);
                err.msg = err.msg || err.desc || '';
                if (typeof fail === 'function') {
                    fail(err);
                }
            });


        // },
        // function (err) {
        //     // prehandle失败
        //     app.dismiss();
        //     if (typeof fail === 'function') {
        //         fail(err);
        //     }
        // });

        // 2016.10.26 ↑
    };

    /**
     * 进行实名认证
     * @param success
     * @param fail
     */
    app.doAutonymAuth = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebAccountPlugin.doAutonymAuth(success, fail);
    };

    /**
     * 获取实名认证状态
     * @param success
     * @param fail
     */
    app.getAutonymAuthStatus = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebAccountPlugin.getAutonymAuthStatus(success, fail);
    };

    /**
     * 身份认证
     * @param success
     * @param fail
     */
    app.authentication = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebAccountPlugin.authentication(success, fail);
    };

    /* ========== apple pay 相关插件 ========*/
    /**
     * 是否支持ApplePay
     * @param success
     * @param fail
     * @param params
     */
    app.isSupportAP = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebApplePayPlugin.isSupport(success, fail, params);
    };

    /**
     * 获取ApplePay卡列表
     * @param success
     * @param fail
     * @param params
     */
    app.getAPCardList = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebApplePayPlugin.getCardList(success, fail, params);
    };

    /**
     * 1. 提供掩码卡号以及密文卡号；
     * 2. 已登录则返回ap卡和钱包卡，未登录则返回ap卡。
     * @param params
     * @param success
     * @param fail
     */
    app.getAPCardListNew = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebApplePayPlugin.getCardListNew(success, fail, params);
    };

    /**
     * 打开AppleWallet
     * @param success
     * @param fail
     * @param params
     */
    app.openAppleWallet = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebApplePayPlugin.openAppleWallet(success, fail, params);
    };

    /**
     * 绑定AppleWallet卡
     * @param success
     * @param fail
     * @param params
     */
    app.bindAPCard = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebApplePayPlugin.bindAppleWalletCard(success, fail, params);
    };

    /**
     * 绑定AppleWallet卡到钱包
     * @param success
     * @param fail
     */
    app.bindAppleWalletCard2UPWallet = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebApplePayPlugin.bindAppleWalletCard2UPWallet(success, fail);
    };

    /* ========== 安卓 pay 相关插件 begin ========*/
    /**
     * 返回的参数为str
     * ‘1’ 支持tsm和hce
     * ‘2’ 仅支持tsm
     * ‘3’ 仅支持hce
     * ‘4’ 都不支持
     */
    app.isSupportAndroidPay = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebAndroidPayPlugin.isSupportPay(success, fail);
    };

    /**
     * 安卓获取卡列表
     * 1. 获得手机pay（tsm或hce）中的卡 和 云闪付app中的卡
     * 2. 手机pay部分，只支持手机pay时取tsm，只支持hce时取hce。都支持时也只取tsm。
     * @param success
     * @param fail
     * @param params
     */
    app.getCardListForAndroid = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebAndroidPayPlugin.getBothCardList(success, fail);
    };
    /* ========== 安卓 pay 相关插件 end ========*/

    /**
     * 从客户端插件获取记账详情页面数据
     * @param params
     * @param success
     * @param fail
     */
    app.getNoteInfo = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebNotesPlugin.getNoteInfo(success, fail, params);
    };

    /**
     * 通知客户端记账数据已经变更，以便客户端重新计算对应时间区间的数据
     * @param params
     * @param success
     * @param fail
     */
    app.noteInfoChange = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebNotesPlugin.noteInfoChange(success, fail, params);
    };

    /**
     * 获取卡号
     * @param success
     * @param fail
     */
    app.getCardNo = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebCardInfoPlugin.getCardNo(success, fail);
    };

    /**
     *  获取卡管家中的卡列表
     */
    app.getFrogCardInfoArray = function (success, fail) {
        checkPlugins();
        window.plugins.UPWebCardInfoPlugin.getFrogCardInfoArray(success, fail);
    };

    /**
     * 注册流程关闭页面并跳转
     * @param params
     * @param success
     * @param fail
     */
    app.closeRedirect = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebCloseRedirectPlugin.closeRedirect(success, fail, params);
    };

    /**
     * 打开通讯录并允许用户选择一条通讯录
     * @param params
     * @param success
     * @param fail
     */
    app.openContacts = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWAddressBook.openContacts(success, fail, params);
    };

    /**
     * 通过手机号匹配通讯录中的名字
     * @param params
     * @param success
     * @param fail
     */
    app.getContactName = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWAddressBook.getContactName(success, fail, params);
    };

    /**
     * 新开客户端Tab页面
     * @param params
     */
    app.openNativeTabPage = function (params) {
        checkPlugins();
        window.plugins.UPWebNewPagePlugin.openNativeTabPage(params);
    };

    /**
     * 新开react native 页面
     * @param params
     */
    app.openRNPage = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebNewPagePlugin.openRNPage(success, fail, params);
    };

    app.verifyPayPwd = function (params, success, fail) {
        checkPlugins();
        window.plugins.UPWebAccountPlugin.verifyPayPwd(success, fail, params);
    };

    // 只有在钱包里才能初始化插件
    if (UP.W.Env.isInsideWalletApp) {
        initPlugins();
    }

    /**分享时获取用户推荐标识符
     * @mobile 用户手机号
     * @success 获取标识符成功回调
     * */
    app.getUserIdentifier = function (mobile, success) {
        var queries = {
            cmd: "/springMK/shareLink",
            method: "POST",
            params: {
                mobile: UP.W.Util.base64Encode(mobile)
            }
        };
        app.sendMessageWithStorage(queries, true, true,
            //成功回调
            function (resp) {
                if ((!!resp.params) && (!!resp.params.identifier)) {
                    if (typeof success === "function") {
                        success(resp.params.identifier);
                    }
                }
                else {
                    UP.W.UI.dismiss();
                    UP.W.UI.showAlert("获取推荐码失败，请稍后再试", null, null, "知道了");
                }
            },
            //错误回调
            function () {
                UP.W.UI.dismiss();
                UP.W.UI.showAlert("获取推荐码失败，请稍后再试", null, null, "知道了");
            },
            //失败回调
            function () {
                UP.W.UI.dismiss();
                UP.W.UI.showAlert("获取推荐码失败，请稍后再试", null, null, "知道了");
            },{needSw:false, validateTime: 2*60*60*1000, saveWithId:false});
    };

    /**
     * 获取用户加密标识，只用在客户端内，不需要上送手机号，后台根据客户端userid生成
     * @success 获取标识符成功回调
     * */
    app.getUserIdentifierInApp = function (success) {
        var queries = {
            cmd: "/scan/shareLink",
            method: "POST",
            params: {}
        };
        app.sendMessageWithStorage(queries, true, false,
            //成功回调
            function (resp) {
                if ((!!resp.params) && (!!resp.params.identifier)) {
                    if (typeof success === "function") {
                        success(resp.params.identifier);
                    }
                }
                else {
                    UP.W.UI.dismiss();
                    UP.W.UI.showAlert("获取用户标识失败，请稍后再试", null, null, "知道了");
                }
            },
            //错误回调
            function () {
                UP.W.UI.dismiss();
                UP.W.UI.showAlert("获取用户标识失败，请稍后再试", null, null, "知道了");
            },
            //失败回调
            function () {
                UP.W.UI.dismiss();
                UP.W.UI.showAlert("获取用户标识失败，请稍后再试", null, null, "知道了");
            },{needSw:false, validateTime: 2*60*60*1000});
    };

})(window.Zepto || window.jQuery, window.UP = window.UP || {});

// commonUI
(function ($, UP) {
    "use strict";

    UP.W = UP.W || {};
    // H5UI组件
    UP.W.UI = UP.W.UI || {};

    var ui = UP.W.UI;

    /**
     * 显示H5加载动画
     * @param msg
     */
    ui.showLoading = function (msg) {
        clearTimeout(ui.dismissTimer);
        if ($('#commonUILoading').length === 0) {
            //将commonUI-mask和commonUI-loading并行放置，共同放置到 commonUILoading内[Android4.4.4黑条bug]
            var html = '<div id="commonUILoading"><div class="commonUI-loading-mask"></div>';
            html += '<div class="commonUI-loading">';
            html += '<div class="commonUI-loadingPic">';
            html += '</div>';
            html += '<div class="commonUI-loadingText">加载中...</div>';
            html += '</div>';
            html += '</div>';
            $('body').append(html);
        }
        var $el = $('#commonUILoading');
        $el.find('.commonUI-loadingText').text(msg || '加载中...');
        $('body').addClass('commonUI-overflow');
        $el.show();
    };

    /**
     * 隐藏H5加载动画
     */
    ui.dismiss = function () {
        $('#commonUILoading').hide();
        $('body').removeClass('commonUI-overflow');
    };

    /**
     * 延迟隐藏动画
     * @param delay
     */
    ui.dismissTimer = 0;
    ui.dismissDelay = function (delay) {
        if (!delay || delay > 1000) {
            delay = 300;
        }
        ui.dismissTimer = setTimeout(function () {
            UP.W.UI.dismiss();
        }, delay);
    };

    /**
     * 显示H5 Toast提示
     * @param msg
     */
    var toastTimer = null;
    ui.showToast = function (msg, time) {
        msg = msg.replace(/\n/g, "<br />");
        time = time || 3000;
        if ($('#commonUIToast').length === 0) {
            var html = '<div id="commonUIToast" class="commonUI-toast">';
            html += '<div class="commonUI-toast-wrapper">';
            html += '<span></span>';
            html += '</div>';
            html += '</div>';
            $('body').append(html);
        }
        var $el = $('#commonUIToast');
        $el.find('span').html(msg);
        // 动画渐显
        $el.show();
        $el.removeClass('fadeOut');
        $el.addClass('fadeIn');
        clearTimeout(toastTimer);
        // 动画渐隐
        toastTimer = setTimeout(function () {
            $el.removeClass('fadeIn');
            $el.addClass('fadeOut');
            setTimeout(function () {
                $el.hide();
            }, 800);
        }, time);
    };

    /**
     * 显示H5 Toast提示，带打钩图片
     */
    var toastTimerWithPic = null;
    ui.showToastWithPic = function (msg, time) {
        time = time || 3000;
        if ($('#commonUIToastWithPic').length === 0) {
            var html = '<div id="commonUIToastWithPic" class="commonUI-toast">';
            html += '<div class="commonUI-toast-wrapper">';
            html += '<div class="commonUI-toast-wrapper-pic">';
            html += '<div class="commonUI-toast-correctIcon"></div>';
            html += '<div class="commonUI-toast-text"></div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            $('body').append(html);
        }
        var $el = $('#commonUIToastWithPic');
        $el.find('.commonUI-toast-text').text(msg);
        // 动画渐显
        $el.show();
        $el.removeClass('fadeOut');
        $el.addClass('fadeIn');
        clearTimeout(toastTimerWithPic);
        // 动画渐隐
        toastTimerWithPic = setTimeout(function () {
            $el.removeClass('fadeIn');
            $el.addClass('fadeOut');
            setTimeout(function () {
                $el.hide();
            }, 800);
        }, time);
    };

    /**
     * 提示/确认对话框
     * @param message 提示消息
     * @param okCallback “确定/知道了”回调
     * @param cancelCallback “取消”回调
     * @param okText “确定/知道了”按钮自定义文本
     * @param cancelText “取消”按钮自定义文本
     * @param titleText “提示” 标题 文本
     */
    ui.showAlert = function (message, okCallback, cancelCallback, okText, cancelText, titleText, actNm, actCallback) {
        message = message.replace(/\n/g, "<br />");
        setTimeout(function () {
            if ($('#commonUIAlert').length === 0) {
                var html = '<div id="commonUIAlert" class="commonUI-mask">';
                html += '<div class="commonUI-alert">';
                //头部
                html += '<div class="commonUI-alertTitle">';
                html += '<p>提示</p>';
                html += '</div>';
                // 上部
                html += '<div class="commonUI-alertTop">';
                html += '<p></p>';
                html += '</div>';
                // 下部
                html += '<div class="commonUI-alertBottom">';
                html += '<button class="commonUI-alertButton" data-btn="Yes">确定</button>';
                html += '<button class="commonUI-alertButton" data-btn="No">取消</button>';
                html += '<button class="commonUI-alertButton" data-btn="OK">知道了</button>';
                html += '</div>';

                html += '</div>';
                html += '</div>';
                $('body').append(html);
            }

            $('.commonUI-alertButton').unbind().bind('click', function () {
                $el.hide();
                $('body').removeClass('commonUI-overflow');
                // 确定点击了哪个按钮，调用对应的回调
                var type = $(this).attr('data-btn');
                if (type === 'Yes' || type === 'OK') {
                    if (typeof okCallback === 'function') {
                        okCallback();
                    }
                } else if (type === 'No') {
                    if (typeof cancelCallback === 'function') {
                        cancelCallback();
                    }
                }
            });

            var $el = $('#commonUIAlert');
            // 如果定义了cancelCallback或cancelText则是confirm
            if (cancelCallback || cancelText) {
                $el.find('.commonUI-alertButton[data-btn="Yes"]').text(okText || '确定').show();
                $el.find('.commonUI-alertButton[data-btn="No"]').text(cancelText || '取消').show();
                $el.find('.commonUI-alertButton[data-btn="OK"]').hide();
            } else {
                $el.find('.commonUI-alertButton[data-btn="Yes"]').hide();
                $el.find('.commonUI-alertButton[data-btn="No"]').hide();
                $el.find('.commonUI-alertButton[data-btn="OK"]').text(okText || '知道了').show();
            }
            $el.find('.commonUI-alertTop p').html(message);
            if (message) {
                $el.find('.commonUI-alertTop').show();
            } else {
                $el.find('.commonUI-alertTop').hide();
            }
            if (actNm && actCallback) {
                $el.find('.commonUI-alertTop p').append('<a class="commonUI-actButton">' + actNm + '</a>');
                $('.commonUI-actButton').unbind().bind('click', function () {
                    actCallback();
                });
            }
            //头部提示，允许为空串
            if (typeof titleText !== 'undefined') {
                $el.find('.commonUI-alertTitle p').html(titleText);
            } else if (cancelCallback || cancelText) {
                $el.find('.commonUI-alertTitle p').text("确认");
            } else {
                $el.find('.commonUI-alertTitle p').text("提示");
            }

            $('body').addClass('commonUI-overflow');
            $el.show();
        }, 200)
    };

    /**
     * 提示/确认对话框（含输入框）
     * @param message 提示消息
     * @param okCallback “确定/知道了”回调
     * @param cancelCallback “取消”回调
     * @param okText “确定/知道了”按钮自定义文本
     * @param cancelText “取消”按钮自定义文本
     * @param titleText “提示” 标题 文本
     */
    ui.showAlertWithInput = function (message, okCallback, cancelCallback, okText, cancelText, titleText, placeText) {
        setTimeout(function () {
            if ($('#commonUIAlertWithInput').length === 0) {
                var html = '<div id="commonUIAlertWithInput" class="commonUI-mask">';
                html += '<div class="commonUI-alert">';
                //头部
                html += '<div class="commonUI-alertTitleWithInput">';
                html += '<p>提示</p>';
                html += '</div>';
                // 上部
                html += '<div class="commonUI-alertTopWithInput">';
                html += '<p></p>';
                html += '</div>';
                // 输入框
                html += '<input type="text" placeholder="" class="commonUI-alertInput" maxlength="20">';
                // 下部
                html += '<div class="commonUI-alertBottom">';
                html += '<button class="commonUI-alertButton" data-btn="Yes">确定</button>';
                html += '<button class="commonUI-alertButton" data-btn="No">取消</button>';
                html += '</div>';

                html += '</div>';
                html += '</div>';
                $('body').append(html);
            }

            var $el = $('#commonUIAlertWithInput');

            $('#commonUIAlertWithInput .commonUI-alertButton').unbind().bind('click', function () {
                var type = $(this).attr('data-btn');
                var value = $el.find('.commonUI-alertInput').val().trim();
                if (type === 'Yes' && value.length == 0) {
                    return;
                }
                $el.hide();
                $('body').removeClass('commonUI-overflow');
                // 确定点击了哪个按钮，调用对应的回调
                if (type === 'Yes') {
                    if (typeof okCallback === 'function') {
                        okCallback(value);
                    }
                } else if (type === 'No') {
                    if (typeof cancelCallback === 'function') {
                        cancelCallback();
                    }
                }
            });

            $('.commonUI-alertInput').unbind().bind('input', function () {
                if ($el.find('.commonUI-alertInput').val().trim().length == 0) {
                    $el.find('.commonUI-alertButton[data-btn="Yes"]').addClass('disableYesBtn');
                    return;
                } else {
                    $el.find('.commonUI-alertButton[data-btn="Yes"]').removeClass('disableYesBtn');
                }
            });

            $el.find('.commonUI-alertButton[data-btn="Yes"]').text(okText || '确定').show();
            $el.find('.commonUI-alertButton[data-btn="No"]').text(cancelText || '取消').show();
            if ($el.find('.commonUI-alertInput').val().trim().length == 0) {
                $el.find('.commonUI-alertButton[data-btn="Yes"]').addClass('disableYesBtn');
            }

            $el.find('.commonUI-alertTopWithInput p').html(message);
            if (message) {
                $el.find('.commonUI-alertTopWithInput').show();
            } else {
                $el.find('.commonUI-alertTopWithInput').hide();
            }
            //头部提示，允许为空串
            if (typeof titleText !== 'undefined') {
                $el.find('.commonUI-alertTitleWithInput p').text(titleText);
            } else if (cancelCallback || cancelText) {
                $el.find('.commonUI-alertTitleWithInput p').text("确认");
            } else {
                $el.find('.commonUI-alertTitleWithInput p').text("提示");
            }

            if (placeText) {
                $el.find('.commonUI-alertInput').attr('placeholder', placeText);
            }

            $('body').addClass('commonUI-overflow');
            $el.show();
        }, 200)
    };

    /**
     * 显示缴费成功等提示等待画面
     * @param message1
     * @param message2
     * @param callback
     * @param buttonText
     */
    ui.showWaitingDialog = function (message1, message2, callback, buttonText) {
        if ($('#commonUIWaiting').length === 0) {
            var html = '<div id="commonUIWaiting" class="commonUI-mask">';
            html += '<div class="commonUI-waiting">';
            // 上部
            html += '<div class="commonUI-waitingTop">';
            html += '<div class="commonUI-waitingInner">';
            html += '<p class="commonUI-waiting-text1">缴费已经成功提交</p>';
            html += '<p class="commonUI-waiting-text2">预计10分钟后缴费成功，详情请稍后查看“我的消息”</p>';
            html += '</div>';
            html += '</div>';
            // 下部
            html += '<div class="commonUI-waitingBottom">';
            html += '<button class="commonUI-waitingButton" data-btn="OK">知道了</button>';
            html += '</div>';

            html += '</div>';
            html += '</div>';
            $('body').append(html);

            $('.commonUI-waitingButton').bind('click', function () {
                $('#commonUIWaiting').hide();
                $('body').removeClass('commonUI-overflow');
                if (typeof callback === 'function') {
                    callback();
                }
            });
        }

        var $el = $('#commonUIWaiting');
        $el.find('.commonUI-waiting-text1').text(message1 || '缴费已经成功提交');
        $el.find('.commonUI-waiting-text2').text(message2 || '预计10分钟后缴费成功，详情请稍后查看“我的消息”');
        $el.find('.commonUI-waitingButton').text(buttonText || '知道了');
        $('body').addClass('commonUI-overflow');
        $el.show();
    };


    ui.loadWxMask = function () {
        var dom = document.getElementsByTagName("body")[0];
        var container = document.createElement("div");
        container.id = "wx-mask";
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'absolute';
        container.style.zIndex = '2999';
        container.style.top = '0';
        container.style.backgroundColor = '#000';
        container.style.opacity = '0.8';
        dom.appendChild(container);

        var tips = document.createElement("div");
        tips.style.height = '100%';
        tips.style.padding = '0';
        tips.style.background = 'url("https://youhui.95516.com/hybrid_v4/img/download/mask-ios.png") no-repeat';
        tips.style.backgroundSize = 'auto 100%';
        tips.style.backgroundPosition = 'right';
        container.appendChild(tips);
    }

})(window.Zepto || window.jQuery, window.UP = window.UP || {});