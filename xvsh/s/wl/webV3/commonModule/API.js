/**
 * Created by jhyu on 15/4/21.
 */

UPServerEnv = UP.W.Cordova.env;

function publicKey4Login () {
    var KEY1="A2CD8DEFAD55B7213D80F36777BED8AF8AE318";
    var KEY2="2381161562DFEF5B6D78FDD3F054F420D908FF9F9F9566C320258A2";
    var KEY3="A658C410D26ABAF0B42BAE3E181428EAEF21F1C56395466BCB1C368FA1A557E2B6C5010C1FDB1D612672D5F5BFEC8B6E5AEBF6E2D479D5CFF0B751749687BFA5AF22CBACC3A659BE278B1CAF83591D279FDAFF1CF6E12095E0E9EA5AB13688DD06B49EB5496776166D967326E782AE2BF0A53907072ED1FE593DD326F2EF996B55352F9206C3DC0CADD002A5DC8C6CEDAE68B6D31F26CFB0E95AE935877D462AB073B9EC64991A8A9AD0C97AE0D4EC1E259C1B602380D11F8E1A77E37D4F33D17E77DB90336500CE9C55CF88C63A95D7F47";
    var public_key = KEY1+KEY2+KEY3;
    return public_key;
};

function publicKey4Keyboard(){
    var public_key = '';
    if(UP.W.Cordova.isProductionEnv) {
        // prod env
        var PROKEY1="ddc1b17fe4c89d81461d885b81b261f16ce20e5170810f87319fa34233b437a";
        var PROKEY2="a33c71fc111aa9256af607b997c51ba5cf6f537fa75ad7425c32049e9443082756e002c966bdf8";
        var PROKEY3="2a9febae17369faf215c7d82baa8afd973ac92ba8d33eb779ec024dba1a451805b47510237c5e5901da59e7a818896160a76cd32171a35e8034307a9828118c318745499dc491186c2748f225e6817a9d959ac143b4e0e5896d17e53f9c4a03e7d7ecf3947c2ed6cbe6058c61dd9a44637844c11f0a4308dae5de5bd24519e5e09ea60f4ec81f32f8ae8fe55c4237c607c15b17158cf5ae91268c6a76a8e6ced80fafc8969a09db41dc07a9a6c18bc060885d0fede70ca33aa1";
        public_key = PROKEY1+PROKEY2+PROKEY3;
    }
    else {
        // dev & test env
        var TESTKEY1="b530618a6a5176720c0bb4817e5df1792251f1717426a7fd5c8b6ba0b3287dfc723";
        var TESTKEY2="5f4419212867fcee82c36867d96bab3ffaf72dda292d1cd31c8d2f203269418ff4635df940744564790";
        var TESTKEY3="01f4a264537c067f6ad78f9d117b556efae8b1a14799f4e61d672130c797309960f4ae9a90cfa557098f8cb7d3e1b70393aed55540b2e2e2e3c5ed1882b0457ea031723e3fbe51c074a63ede7fa479443d3eb051b985d07068176811069619c2248ae75679d97515124f7aadea251452eeffdab22fbebbfefda2cdde58b8df62ee8497370d600d870b9c0bb0c3a57a0549ca2aae0a506e87dcbcf75b25db11acbbd9fd76039a671d60e32c43b0276486d5554c2cdf";
        public_key = TESTKEY1+TESTKEY2+TESTKEY3;
    }

    return public_key;
};

var API = {
    //保存父窗口的event对象
    eventStates: "",

    // web服务器地址
    UPServer: (function () {

        var env = UPServerEnv;
        return UP.W.Cordova.walletWebServerPrefix;
    })(),

    ajax: function (type, method, data) {
        var url = API.UPServer + '/' + method;
        if (!data) {
            data = {};
        }
        return $.ajax({
            url: url,
            type: type,
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).success(function (result) {
        }).error(function (err) {
        }).always(function () {
            });
    },
    /**
     * 登录超时返回登录页面,否则显示正常提示
     * @param result
     */
    loginCheck:function(result){
        if (result && (result.msg.indexOf('[40000013]') > -1) || (result.resp === '+9x9+')) {
            common_ui.showPopBox(result.msg,"确定",function(){
                var targetUrl=location.pathname.split("/").pop();
                location.href=location.href.replace(targetUrl,"login.html");
            });
        }else{
            common_ui.showPopBox(result.msg);
        }
    },
    post: function (subUri, data) {
        return API.ajax('POST', subUri, data);
    },

    get: function (subUri, data) {
        return API.ajax('GET', subUri, data);
    },

    setupInputValidateEngine: function (formClassName) {
        if (!formClassName) {
            formClassName = ".sendFrom";
        }

        $(formClassName).validationEngine('attach', {
            promptPosition: 'bottomLeft',
            validationEventTrigger: "",
            autoPositionUpdate: true,
            autoHidePrompt: true,
            autoHideDelay: 2000,
            addPromptClass: 'formError-small'
        });
    },

    setupSMSEngine: function (formClassName) {
        // 发送短信验证码
        $(".sendFrom").on("click", ".getCode", function () {

            var _this = $(this), t = 60, timer = null;

            var $info = $(this).parents("#bindCardInfo");
            var cards = $info.children(".CardNumber").text();
            var pan = cards.match(/\d+(\.\d+)?/g);
            if (!_this.hasClass('gray')) {
                if (pan) {
                    var m = $info.find("input[s_type='mobile']").val();
                    if (!m) {
                        common_ui.showPopBox("请输入手机号", "确定");
                        return false
                    }
                    if($(this).parents('p').siblings('.mobile')[0] !== undefined) {
                        API.setupInputValidateEngine('.mobile');
                        if (!$(this).parents('p').siblings('.mobile').validationEngine('validate'))return false;
                    }

                    API.post('1.0/activity.web.card.sms', {
                        "mobile": m,
                        "pan": pan[0]
                    }).success(function (result) {
                        if (result.msg == '') {
                            _getTime();
                        } else {
                            //alert(result.msg);
                            common_ui.showPopBox(result.msg,'确定');
                        }
                    });

                } else {
                    var s = $("#sendM").val();
                    if (!s) {
                        common_ui.showPopBox("请输入手机号", "确定");
                        return false
                    }

                    API.post('1.0/activity.web.user.sendSms', {
                        "mobilePhone": "" + $("#sendM").val() + "",
                        "smsType": "1"
                    }).success(function (result) {
                        if (result.msg == '') {
                            _getTime();
                        } else {
                            //alert(result.msg);
                            common_ui.showPopBox(result.msg,'确定');
                        }
                    });
                }

                /*return false;*/
                function _getTime() {
                    _this.addClass("gray").html("(" + t + ") 秒");
                    clearInterval(timer);
                    timer = setInterval(function () {
                        t--;
                        _this.html("(" + t + ") 秒");
                        if (t <= 0) {
                            t = 0;
                            _this.html("获取验证码").removeClass("gray");
                            clearInterval(timer)
                        }
                    }, 1000);
                }
            }
        })
    },

    //数据清除
    clearInput: function (container) {
        container.find("input").each(function () {
            $(this).val('');
        });
    },
    /**
	此函数可以达到输入字符串4位一分组的目的，也可以把移动端页面上连续输入光标不在末尾的BUG规避掉，但是只要使用这个函数，手机输入法大多数兼容，只有谷歌输入法有严重的不兼容现象“输入的过程中会出现数字键盘和用户默认键盘来回切换的现象，所以这种方式不能够使用”。解决这个不兼容现象，大多数APP的做法是自制键盘，回避现在输入法种类繁多的方式。
	**/
    registerInputObserver: function ($inputdom, type) {
        var oldText = '';

        // ~ http://stackoverflow.com/questions/6458840/on-input-change-event

        $inputdom.bind('input', function(e) {
            /*
             19位的银联卡其中1-6位代表发卡行，7-10位代表发卡地区，第11位代表卡种类，第12-18位为发卡顺序号，第19位为校验位.
             */

            var value = $(this).val(); // get the current value of the input field.
            console.log('>> value = ' + value);

            if(value.length < oldText.length) {
                // del key pressed, let system ctrl, not care for app logic.
                oldText = value;
                return;
            }

            var lastChar = value.length && (lastChar = value.charAt(value.length - 1));

            console.log('.... lastChar = ' + lastChar);

            if( (lastChar >= '0' && lastChar <= '9')) {
                // only support numbers input
                if(type === 'card') {
                    // 6234 5678 1234
                    if((value.length==4)||(value.replace(/\s/g, '').length % 4 === 0 && value.length >4)) {
                        // 输入第5个时自动填空格。
                        var addSpace=value.substr(0, value.length) +" ";
                        $(this).val("");
                        $(this).val(addSpace);
                        $(this).focus();
                    }
                }
                else if(type === 'phone') {
                    var len = value.length;
                    if(len === 3 && len === 7) {
                        // 136 1234 5678
                        var addSpace=value.substr(0, value.length) +" ";
                        $(this).val("");
                        $(this).val(addSpace);
                        $(this).focus();
                    }
                }
            }
            else {
                // ignore
                $(this).val(value.substr(0, value.length - 1));
            }

           oldText = $(this).val();
        });
    },
    /*
     * 页面添加back键
     * @cancleCB:回调
     * @PageID:页面id
     */
    addPageBackBtn: function(pageID, cancelCB) {
        var targetBack = document.createElement("div");
        targetBack.style.position = "absolute";
        targetBack.style.top = "0";
        targetBack.style.left = "0";
        targetBack.style.width = "40px";
        targetBack.style.height = "40px";
        targetBack.innerHTML = '<img src="../img/back.png" style="width: 25px;height: 25px;margin: 15px 0 0 15px;" />';
        targetBack.setAttribute("class", "backImg");
        var sdkPage = document.getElementById(pageID);
        sdkPage.appendChild(targetBack);
        $('.backImg').unbind('click').bind('click', function(){
            if(pageID == 'logins'||this.parentElement.id == 'regStep1'){
                API.postMessage2ParentWindow({'close':'close'});
            }else if(this.parentElement.id == 'regStep2'){
                $('#regStep2').css('display','none');
                $('#regStep1').css('display','block');
            }else{
                window.history.go(-1);
            }
            if(typeof cancleCB == "function"){
                cancelCB();
            }
        });
    },

    /*
     *各页面调用的监听方法
     */
    postRequest: function(uri, data){
        API.post(uri, data).success(function (result) {
            if (result.params && result.params.result == 'true') {
                result = $.extend({
                    status:'success',
                    'close':'close'
                },result);
                API.postMessage2ParentWindow(result);
            } else if(result.params && result.params.result == 'false'){
                API.postMessage2ParentWindow({'status':'err','close': 'close'});
            }
            //登陆超时
            else if(result.resp == '+9x9+'){
                localStorage.removeItem('islogin');
                common_ui.showPopBox(result.msg,'确定',function(){
                    API.postMessage2ParentWindow({'status':'tipOut'});
                });
            }
            else if(result.msg != ''){
                common_ui.showPopBox(result.msg,'确定',function(){
                    API.postMessage2ParentWindow(result,{"close": "close"});
                });
                return false;
            }
        }).error(function (err) {
            err = $.extend({
                status: 'err',
                close: "close"
            }, err);
            API.postMessage2ParentWindow(err);
        });
    },

    /*
     *各页面调用的监听方法
     */
    addPostMessageEventListener: function() {
        window.addEventListener('message', function(e){

            if(e.source != window.parent) return;
            API.eventStates =  e;
            var params = e.data;
            if((typeof params) == 'string') {
                params = JSON.parse(params);
            }
            //other request  eg.checkbind
            if(params && params.type !== "" && params.type !== undefined){
                switch(params.type){
                    case 1:
                        API.postRequest('1.0/activity.web.card.checkBind');
                        break;
                    case 2:
                        API.postRequest('1.0/activity.web.user.cardList',params.data);
                        break;
                    case 4:
                        localStorage.setItem('customizeCss', JSON.stringify(params.customizeCss));
                        API.postMessage2ParentWindow({"close": "close"});
                        break;
                    default :
                }
            }
        }, false);

    },
    /***
     * 从url中获取所有参数
     * @str如果str不传，则是当前url
     * ***/
    query2Obj:function (str) {
    if (!str) {
        str = location.search;
    }

    if (str[0] === '?' || str[0] === '#') {
        str = str.substring(1);
    }
    var query = {};

    str.replace(/\b([^&=]*)=([^&=]*)/g, function (m, a, d) {
        if (typeof query[a] !== 'undefined') {
            query[a] += ',' + decodeURIComponent(d);
        } else {
            query[a] = decodeURIComponent(d);
        }
    });

    return query;
    },
    /*
    * 向父窗口post消息
    * @params:参数
    */
    postMessage2ParentWindow: function(params) {
        if(API.eventStates) {
            var e = API.eventStates;
            if ((typeof params) == 'string') {
                params = JSON.parse(params);
            }
            window.parent.postMessage(params, e.origin);
        }else{return false;}
    }

};