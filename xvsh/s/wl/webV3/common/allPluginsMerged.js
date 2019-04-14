document.addEventListener('deviceready', function () {
    "use strict";
    var cordovaRef = window.cordova || window.PhoneGap || window.Cordova;

    window.plugins = window.plugins || {};

    // Contacts.js
    window.plugins.ContactsPlugin = {
        pickContact: function (successCB, errorCB) {
            cordovaRef.exec(successCB, errorCB, "Contacts", "pickContact", []);
        }
    };

    // UPWebAnalysis.js
    window.plugins.UPWebAnalysisPlugin = {
        logEvent: function (success, fail, params) {
            params = JSON.stringify(params);
            cordovaRef.exec(null, null, "UPWebAnalysis", "logEvent", [params]);
        },
        logPageBegin: function (success, fail, params) {
            params = JSON.stringify(params);
            cordovaRef.exec(null, null, "UPWebAnalysis", "logPageBegin", [params]);
        },
        logPageEnd: function (success, fail, params) {
            params = JSON.stringify(params);
            cordovaRef.exec(null, null, "UPWebAnalysis", "logPageEnd", [params]);
        }
    };

    // UPWebBankCard.js
    window.plugins.UPWebBankCardPlugin = {
        addBankCard: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebBankCard", "addBankCard", [params]);
        }

    };

    // UPWebBars.js
    var handlerForRight, handlerForBack, handlerForClose, handlerObj = {};
    window.plugins.UPWebBarsPlugin = {
        setBarStatus: function (params) {
            params = JSON.stringify(params);
            cordovaRef.exec(null, null, "UPWebBars", "setBarStatus", [params]);
        },
        setNavigationBarTitle: function (title) {
            cordovaRef.exec(null, null, "UPWebBars", "setNavigationBarTitle", [title]);
        },

        setNavigationBarStyle: function (params) {
            //    params = JSON.stringify(params);
            cordovaRef.exec(null, null, "UPWebBars", "setNavigationBarStyle", [params]);
        },

        refreshRightButton: function (params) {
            cordovaRef.exec(null, null, "UPWebBars", "refreshBtn", [params]);
            var clickHandler = params && params.handler;

            // 居然循环依赖UP.W.Cordova
            if (clickHandler) {
                if (UP && UP.W && UP.W.Cordova && UP.W.Cordova.evtHandler) {
                    // Remove it at first
                    UP.W.Cordova.evtHandler.removeListener(handlerObj['rightbtnclick' + params.index]);

                    // then add new one.
                    handlerObj['rightbtnclick' + params.index] = UP.W.Cordova.evtHandler.addListener(document, 'rightbtnclick' + params.index, function () {
                        clickHandler();
                    }, false);
                } else {
                    document.removeEventListener('rightbtnclick' + params.index, handlerObj['rightbtnclick' + params.index]);
                    handlerObj['rightbtnclick' + params.index] = clickHandler;
                    document.addEventListener('rightbtnclick' + params.index, handlerObj['rightbtnclick' + params.index], false);
                }
            }
        },

        setNavigationBarRightButtonArr: function (btnArr) { // frog设计，数组版
            cordovaRef.exec(null, null, "UPWebBars", "setNavigationBarRightButton", [btnArr]);

            var clickHandler;
            btnArr && btnArr.forEach(function (item) {
                clickHandler = item.handler;
                if (clickHandler) {
                    if (UP && UP.W && UP.W.Cordova && UP.W.Cordova.evtHandler) {
                        // Remove it at first
                        UP.W.Cordova.evtHandler.removeListener(handlerObj['rightbtnclick' + item.index]);

                        // then add new one.
                        handlerObj['rightbtnclick' + item.index] = UP.W.Cordova.evtHandler.addListener(document, 'rightbtnclick' + item.index, clickHandler, false);
                    } else {
                        document.removeEventListener('rightbtnclick' + item.index, handlerObj['rightbtnclick' + item.index]);
                        handlerObj['rightbtnclick' + item.index] = clickHandler;
                        document.addEventListener('rightbtnclick' + item.index, handlerObj['rightbtnclick' + item.index], false);
                    }
                }
            })
        },

        setNavigationBarRightButton: function (success, fail, params) {
            cordovaRef.exec(null, null, "UPWebBars", "setNavigationBarRightButton", [params]);

            var clickHandler = params && params.handler;

            // 居然循环依赖UP.W.Cordova
            if (clickHandler) {
                if (UP && UP.W && UP.W.Cordova && UP.W.Cordova.evtHandler) {
                    // Remove it at first
                    UP.W.Cordova.evtHandler.removeListener(handlerForRight);

                    // then add new one.
                    handlerForRight = UP.W.Cordova.evtHandler.addListener(document, 'rightbtnclick', function () {
                        clickHandler();
                    }, false);
                } else {
                    document.removeEventListener('rightbtnclick', handlerForRight);
                    handlerForRight = clickHandler;
                    document.addEventListener('rightbtnclick', handlerForRight, false);
                }
            }
        },

        setNavigationBarShareButton: function (success, fail, params) {
            params = params || {};
            params.title = '分享';

            var handler;
            if (params && params.handler) {
                // User has define custom handler, use custom ones.
                handler = params.handler;
            }
            else {
                // use default one.
                handler = function () {
                    window.plugins.UPWebBarsPlugin.showSharePanel();
                };
            }

            params.handler = handler;

            this.setNavigationBarRightButton(success, fail, params);
        },

        showSharePanel: function (success, fail, params) {
            params = JSON.stringify(params);

            /*
             分享成功或者失败都会调用我们的回调函数。
             */
            //cordovaRef.exec(success, fail, "UPWebShare", "share", [params]); // Native hasn't implemented it yet.
            cordovaRef.exec(success, fail, "UPWalletPlugin", "showSharePopup", [params]);
        },

        prefetchImage: function (params) {
            cordovaRef.exec(null, null, "UPWebBars", "prefetchImage", [params]);
        },

        setPageBackListener: function (success, fail, params) {
            cordovaRef.exec(null, null, "UPWebBars", "setPageBackListener", [params]);

            if (UP && UP.W && UP.W.Cordova && UP.W.Cordova.evtHandler) {
                // for navbar back button click.
                var nativeBackHandler = params && params.backHandler;
                if (nativeBackHandler && typeof (nativeBackHandler) === 'function') {
                    // Remove it at first
                    UP.W.Cordova.evtHandler.removeListener(handlerForBack);

                    // then add new one.
                    handlerForBack = UP.W.Cordova.evtHandler.addListener(document, 'UP.W.Bars.backbtnclick', nativeBackHandler, false);
                }

                // for navbar back button click.
                var nativeCloseHandler = params && params.closeHandler;
                if (nativeCloseHandler && typeof (nativeCloseHandler) === 'function') {
                    // Remove it at first
                    UP.W.Cordova.evtHandler.removeListener(handlerForClose);

                    // then add new one.
                    handlerForClose = UP.W.Cordova.evtHandler.addListener(document, 'UP.W.Bars.closebtnclick', nativeCloseHandler, false);
                }
            } else {
                if (params && params.backHandler) {
                    document.addEventListener('UP.W.Bars.backbtnclick', params.backHandler, false);
                }
                if (params && params.closeHandler) {
                    document.addEventListener('UP.W.Bars.backbtnclick', params.closeHandler, false);
                }
            }

        }
    };

    // UPWebBillHistory.js
    window.plugins.UPWebBillHistoryPlugin = {
        getHistory: function (successCB, errorCB, params) {
            cordovaRef.exec(successCB, errorCB, "UPWebBillHistory", "getHistory", [JSON.stringify(params)]);
        },
        addHistory: function (successCB, errorCB, params) {
            // {appid,mobile,amout}
            cordovaRef.exec(successCB, errorCB, "UPWebBillHistory", "addHistory", [JSON.stringify(params)]);
        }
    };

    // UPWebCallNative.js
    /*
     UPWWalletPlugin中新增插件webCallNative，用于web删除票券成功后、重新支付成功后、退货成功后等等通知native，native做相应处理。

     返回信息如下：
     operations：各种操作
     位图，string类型，第一位表示是否关闭页面，第二位表示是否刷新列表

     businessType：业务类型
     string类型，1表示删除票券成功，2表示从订单详情支付成功，3表示从订单详情退货成功


     删除票券返回信息如：{@“ operations”：@“11”，@“businessType”：@“1”}
     重新支付、退货成功返回信息：{@“ operations”：@“11”，@“businessType”：@“2”}
     */

    window.plugins.UPWebCallNativePlugin = {
        webCallNative: function (success, fail, params) {
            //params = JSON.stringify(params);
            cordovaRef.exec(success, fail, "UPWalletPlugin", "webCallNative", [params]);
        }
    };

    // UPWebClosePage.js
    window.plugins.UPWebClosePagePlugin = {
        closeWebApp: function (params) {
            cordovaRef.exec(null, null, "UPWebClosePage", "closeWebApp", [params]);
        },
        notify: function (params) {
            cordovaRef.exec(null, null, "UPWebClosePage", "notify", [params]);
        }
    };

    // UPWebKickout.js
    window.plugins.UPWebKickoutPlugin = {

        onKickout: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebKickout", "onKickout", [params]);
        }
    };

    // UPWebMessage.js
    window.plugins.UPWebMessagePlugin = {
        messageEnum: {
            MSG_TEST_NAME: 'test_msg_type'
        },
        listener: {},

        /**
         * 调用插件广播事件
         * @param params 事件参数
         * event：事件名称
         * data：数据
         */
        broadcastMessage: function (params) {
            params = JSON.stringify(params);
            cordovaRef.exec(null, null, "UPWebMessage", "broadcastMessage", [params]);
        },

        /**
         * 收到广播消息，调用listener进行处理
         * @param params 透传广播消息的参数
         */
        receiveMessage: function (params) {
            params = JSON.parse(params);
            var type = params.type;
            var listeners = this.listener[type];
            if (listeners) {
                for (var i = 0; i < listeners.length; i++) {
                    listeners[i](params.type, params.data);
                }
            }
        },

        /**
         * 添加消息监听
         * @param type 监听消息类型
         * @param handler 回调函数
         */
        addMessageListener: function (type, handler) {
            // 检查是否重复添加handler
            var listeners = this.listener[type] = this.listener[type] || [], find = false;
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i] === handler) {
                    find = true;
                    break;
                }
            }
            if (!find) {
                listeners.push(handler);
                return true;
            }
            return false;
        },

        /**
         * 移除事件监听 handler与addMessageListener必须为相同引用
         * @param type 移除监听的消息类型
         * @param handler 回调函数
         */
        removeMessageListener: function (type, handler) {
            var listeners = this.listener[type] = this.listener[type];
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i] === handler) {
                    listeners.splice(i, 1);
                    return true;
                }
            }
            return false;
        },

        /**
         * 清空所有绑定
         */
        reset: function () {
            this.listener = {};
        }
    };

    // UPWebNativeInfo.js
    window.plugins.UPWebNativeInfoPlugin = {
        getAppInfo: function (successCB, errorCB) {
            cordovaRef.exec(successCB, errorCB, "UPWebNativeInfo", "getAppInfo", []);
        },
        //用户首页选中的城市
        getUserLocation: function (successCB, errorCB) {
            cordovaRef.exec(successCB, errorCB, "UPWebNativeInfo", "getUserLocation", []);
        },
        //用户地理定位
        getCurrentLocationInfo: function (successCB, errorCB) {
            cordovaRef.exec(successCB, errorCB, "UPWebNativeInfo", "getCurrentLocationInfo", []);
        },
        // 获取请求头
        getReqHeaderInfo: function (successCB, errorCB) {
            cordovaRef.exec(successCB, errorCB, "UPWebNativeInfo", "getReqHeaderInfo", []);
        }
    };

    // UPWebNetwork.js
    window.plugins.UPWebNetworkPlugin = {
        // 给wallet域名服务器发请求
        sendMessage: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebNetwork", "sendMessage", [params]);
        },

        // 给youhui域名服务器发请求
        sendMessageForChsp: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebNetwork", "sendMessageForChsp", [params]);
        }
    };

    // UPWebNewPage.js
    var handler;
    window.plugins.UPWebNewPagePlugin = {
        createWebPage: function (params) {
            cordovaRef.exec(null, null, "UPWebNewPage", "createWebPage", [params]);

            // Page A opens B, callback works when B is closed and A will appear.
            var callback = params && params.callback;
            if (callback) {
                var evtHandler = UP.W.Cordova.evtHandler;
                if (handler) {
                    evtHandler.removeListener(handler);
                }
                // then add new one.
                handler = evtHandler.addListener(document, 'resume', function () {
                    callback();
                    // Remove the listener as it was invoked.
                    evtHandler.removeListener(document);
                }, false);
            }
        },

        openNativePage: function (params) {
            cordovaRef.exec(null, null, "UPWebNewPage", "openNativePage", [params]);
        },

        //新开客户端Tab页
        openNativeTabPage: function (params) {
            cordovaRef.exec(null, null, "UPWebNewPage", "openNativeTabPage", [params]);
        },
        //新开rn页面
        openRNPage: function (success, fail, params) {
            cordovaRef.exec(success, function (msg) {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else if (window.cordova.errorRetStatus == window.cordova.callbackStatus.INVALID_ACTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail(msg);
                }
            }, "UPWebNewPage", "openRNPage", [params]);
        }
    };

    // UPWebOldWallet.js
    window.plugins.UPWebOldWalletPlugin = {

        showMap: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWalletPlugin", "lookMap", [params]);
        },

        callPhone: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWalletPlugin", "callPhone", [params]);
        }
    };

    // UPWebPay.js
    window.plugins.UPWebPayPlugin = {
        pay: function (success, fail, params) {
            params = JSON.stringify(params);
            cordovaRef.exec(success, fail, "UPWebPay", "pay", [params]);
        }
    };

    // UPWebRemindDay.js
    window.plugins.UPWebRemindDayPlugin = {
        add: function (successCB, errorCB, params) {
            cordovaRef.exec(successCB, errorCB, "UPWebRemindDay", "add", [JSON.stringify(params)]);
        }
    };

    // UPWebScan.js
    window.plugins.UPWebScanPlugin = {
        /*
         Params {
         needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
         scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
         }
         */
        scanQRCode: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebUI", "scanQRCode", [params]);
        },
        scanCard: function (success, fail, params) {
            cordovaRef.exec(success, function (msg) {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else if (window.cordova.errorRetStatus == window.cordova.callbackStatus.INVALID_ACTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail(msg);
                }
            }, "UPWebUI", "scanCard", [params]);
        },
        savePicToLocal: function (success, fail, params) {
            cordovaRef.exec(success, function (msg) {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else if (window.cordova.errorRetStatus == window.cordova.callbackStatus.INVALID_ACTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail(msg);
                }
            }, "UPWebUI", "savePicToLocal", [params]);
        },
        savePdfToLocal: function (success, fail, params) {
            cordovaRef.exec(success, function (msg) {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else if (window.cordova.errorRetStatus == window.cordova.callbackStatus.INVALID_ACTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail(msg);
                }
            }, "UPWebUI", "savePdfToLocal", [params]);
        },
        openPdfByOtherApp: function (success, fail, params) {
            cordovaRef.exec(success, function (msg) {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else if (window.cordova.errorRetStatus == window.cordova.callbackStatus.INVALID_ACTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail(msg);
                }
            }, "UPWebUI", "openPdfByOtherApp", [params]);
        },
        // 扫一扫付款
        scanQRCodeNew: function () {
            var params = '';
            cordovaRef.exec(null, null, "UPWebUI", "scanQRCodeNew", [params]);
        },
        // 扫Logo
        scanLogo:function () {
            var params = '';
            cordovaRef.exec(null, null, "UPWebUI", "scanLogo", [params]);
        },
        // 出示付款码
        qrCodePay: function () {
            var params = '';
            cordovaRef.exec(null, null, "UPWebUI", "qrCodePay", [params]);
        }
    };

    // UPWebUI.js
    window.plugins.UPWebUIPlugin = {
        showLoadingView: function () {
            var params = '';
            cordovaRef.exec(null, null, "UPWebUI", "showLoadingView", [params]);
        },
        showWaitingView: function () {
            var params = '';
            cordovaRef.exec(null, null, "UPWebUI", "showWaitingView", [params]);
        },
        showFlashInfo: function (params) {
            cordovaRef.exec(null, null, "UPWebUI", "showFlashInfo", [params]);
        },
        showAlertView: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebUI", "showAlertView", [params]);
        },
        showSelectionView: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebUI", "showSelectionView", [params]);
        },
        dismiss: function () {
            var params = '';
            cordovaRef.exec(null, null, "UPWebUI", "dismiss", [params]);
        },
        /*
         选择图片，途径：从文件或者拍照
         */
        chooseImage: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebUI", "chooseImage", [params]);
        }
    };

    // UPWebUserDetail.js
    window.plugins.UPWebUserDetailPlugin = {

        getUserDetail: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebUserDetail", "getUserDetail", [params]);
        }
    };

    // UPWebUserInfo.js
    window.plugins.UPWebUserInfoPlugin = {

        mccStateChanged: function (params) {
            cordovaRef.exec(null, null, "UPWebUserInfo", "mccStateChanged", [params]);
        },

        getUserInfo: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebUserInfo", "getUserInfo", [params]);
        },
        clearLoginStatus: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebUserInfo", "clearLoginStatus", [params]);
        },

        // copy from coupon plugins, need to access cdhdUsrId to operate coupons & bills.
        /***
         * 获取本地数据
         * @param success(result)
         * @param fail(result)
         * @param options
         *      {
         *        type: 1 | 1-经纬度 | 2-优惠券 | 3-电子票 | 4-返利券' 获取的数据类型，默认获取当前item |
         *            5-userId | 6-uniIdentifier | 7-encryptUserId 加密的UserId | 8-秒杀字段加密
         *        params:  (for type-8) {"postMessageBody":postBody, "uniIdentifier":uniIdentifier}
         *      }
         */
        fetchNativeData: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWalletPlugin", "fetchNativeData", [params]);
        }
    };

    // UPWebUserLogin.js
    window.plugins.UPWebUserLoginPlugin = {
        login: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebUserLogin", "login", [params]);
        },

        forceLogin: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWalletPlugin", "openLoginPage", [params]);
        }

    };

    // 账户相关插件
    window.plugins.UPWebAccountPlugin = {
        // 进行实名认证
        doAutonymAuth: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebAccount", "doAutonymAuth", [params]);
        },
        // 获取实名认证状态
        getAutonymAuthStatus: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebAccount", "getAutonymAuthStatus", [params]);
        },
        // 身份认证 需要进行支付认证
        authentication: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebAccount", "authentication", [params]);
        },
        // 通过实名认证找回密码(未登录状态)
        verifyUserByBankCard: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebAccount", "verifyUserByBankCard", [params]);
        },
        //通过用户输入支付密码来验证用户身份
        verifyPayPwd: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebAccount", "verifyPayPwd", [params]);
        }
    };
    //记账插件
    window.plugins.UPWebNotesPlugin = {
        // 获取详情
        getNoteInfo: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPNotesInfoPlugin", "getNoteInfo", [params]);
        },
        // 退出刷新
        noteInfoChange: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPNotesInfoPlugin", "noteInfoChange", [params]);
        }
    };

    //applePay相关插件
    window.plugins.UPWebApplePayPlugin = {
        isSupportEnum: {
            SUPPORT: '1',
            IOSERR: '2',
            PHONEERR: '3',
            SYSERR: '4',
            NOCARD: '5'
        },
        isSupport: function (success, fail, params) {
            cordovaRef.exec(success, function () {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail();
                }
            }, "UPWebApplePayPlugin", "isSupportApplePay", [params]);
        },

        getCardList: function (success, fail, params) {
            cordovaRef.exec(success, function (msg) {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail(msg);
                }
            }, "UPWebApplePayPlugin", "getBothCardList", [params]);
        },

        getCardListNew: function (success, fail, params) {
            cordovaRef.exec(success, function (msg) {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else if (window.cordova.errorRetStatus == window.cordova.callbackStatus.INVALID_ACTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail(msg);
                }
            }, "UPWebApplePayPlugin", "getBothCardListNew", [params]);
        },

        openAppleWallet: function (success, fail, params) {
            cordovaRef.exec(success, function () {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail();
                }
            }, "UPWebApplePayPlugin", "openAppleWallet", [params]);
        },

        bindAppleWalletCard: function (success, fail, params) {
            cordovaRef.exec(success, function () {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail();
                }
            }, "UPWebApplePayPlugin", "openAppleWalletAndBindCard", [params]);
        },

        bindAppleWalletCard2UPWallet: function (success, fail, params) {
            cordovaRef.exec(success, function () {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail == "function" && fail();
                }
            }, "UPWebApplePayPlugin", "bindAppleWalletCard2UPWallet", [params]);
        }
    };

    // android tsm&hce 相关插件
    window.plugins.UPWebAndroidPayPlugin = {
        /**
         * 返回的参数为str
         * ‘1’ 支持tsm和hce
         * ‘2’ 仅支持tsm
         * ‘3’ 仅支持hce
         * ‘4’ 都不支持
         */
        isSupportPay: function (success, fail, params) {
            cordovaRef.exec(success, function () {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else if (window.cordova.errorRetStatus == window.cordova.callbackStatus.INVALID_ACTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail();
                }
            }, "UPWebAndroidPayPlugin", "isSupportPay", [params]);
        },

        /**
         * 1. 获得手机pay（tsm或hce）中的卡 和 云闪付app中的卡
         * 2. 手机pay部分，只支持手机pay时取tsm，只支持hce时取hce。都支持时也只取tsm。
         * @param success
         * @param fail
         * @param params
         */
        getBothCardList: function (success, fail, params) {
            cordovaRef.exec(success, function () {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else if (window.cordova.errorRetStatus == window.cordova.callbackStatus.INVALID_ACTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail();
                }
            }, "UPWebAndroidPayPlugin", "getBothCardList", [params]);
        }
    };
    //分享的相关插件
    window.plugins.UPSharePlugin = {
        showShareMorePanel:function (success, fail, params) {
            cordovaRef.exec(success, function (msg) {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else if (window.cordova.errorRetStatus == window.cordova.callbackStatus.INVALID_ACTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail(msg);
                }
            }, "UPSharePlugin", "showSharePopupNew", [params]);
        },
        shareSinglePlugin:function (success, fail, params) {
            cordovaRef.exec(success, function (msg) {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else if (window.cordova.errorRetStatus == window.cordova.callbackStatus.INVALID_ACTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail(msg);
                }
            }, "UPSharePlugin", "shareContent", [params]);
        }
    };

    //账单分期相关插件
    window.plugins.UPWebCardInfoPlugin = {
        // 获取卡号
        getCardNo: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebCardInfo", "getCardNo", [params]);
        },
        // 获取卡管家中的卡列表
        getFrogCardInfoArray: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebCardInfo", "getFrogCardInfoArray", [params]);
        }
    };

    //注册相关插件
    window.plugins.UPWebCloseRedirectPlugin = {
        // 关闭页面并跳转
        closeRedirect: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWebCloseRedirect", "closeRedirect", [params]);
        }
    };

    //通讯录
    window.plugins.UPWAddressBook = {
        // 打开通讯录
        openContacts: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWAddressBook", "configPhoneNum", [params]);
        },
        //根据手机号码获取通讯录对应信息
        getContactName: function (success, fail, params) {
            cordovaRef.exec(success, fail, "UPWAddressBook", "configConsumer", [params]);
        }
    };
    // 开放插件，该插件不做白名单限制
    window.plugins.UPWebOpenOtherPlugin = {
        //使用手机浏览器打开链接
        openBrowser: function (params, fail) {
            cordovaRef.exec(null, function (msg) {
                if (window.cordova.errorRetStatus == window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION) {
                    typeof fail == "function" && fail("update");
                } else if (window.cordova.errorRetStatus == window.cordova.callbackStatus.INVALID_ACTION) {
                    typeof fail == "function" && fail("update");
                } else {
                    typeof fail === "function" && fail(msg);
                }
            }, "UPWebOpenOther", "openBrowser", [params]);
        }
    };

    // 派发一个pluginready事件，后续为了确保业务调用插件时插件都已加载完毕，建议监听该事件，而不是deviceready事件
    setTimeout(function () {
        var event = document.createEvent('Events');
        event.initEvent('pluginready', false, false);
        document.dispatchEvent(event);
    }, 0);
}, false);