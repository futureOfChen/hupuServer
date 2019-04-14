/**
 * Created by cup on 15/6/2.
 */

UPKVShareParams = null;
UPKVShareIsSDK = false;

function foo(data){
    console.log('data = ' + JSON.stringify(data));
}

function setSharePageData(params, isSDK,noBtn) {

    UPKVShareIsSDK = isSDK;

    if(UP.W.Cordova.isInsideWalletApp){
        //客户端
        UPKVShareParams = params;
        if(!UPKVShareIsSDK) {

            document.addEventListener('deviceready', function() {
                if(!window.plugins || (typeof window.plugins.UPWebBarsPlugin === 'undefined')) {
                    seajs.use([
                        'UPWebBars'
                    ], function () {
                        if(!noBtn){
                            setShareButton();
                        }
                    });
                }
                else {
                    if(!noBtn){
                        setShareButton();
                    }
                }
            });
        }
    }
    else if(UP.W.Cordova.isWX) {
        // page works inside WX env.
        shareOnWX();
    }

    function setShareButton() {
        // isSDK == true, call from SDK
        //分享
        window.plugins.UPWebBarsPlugin.setNavigationBarShareButton();
    }

    // page inside weixin, uses uses WX JS-SDK to compose share data.
    function shareOnWX () {

        console.log('shareOnWX');

        if(typeof wx === 'undefined') {
            seajs.use('https://res.wx.qq.com/open/js/jweixin-1.0.0.js', function(wx){
                fetchJsTicket(wx);
            });
        }
        else {
            fetchJsTicket(wx);
        }
    }

    function fetchJsTicket(wx) {
        // TODO: mock.
        // http://localhost:8080/src/webV3/402/page/help/qiang_quan.html?upenv=888
        var wxUrl = (window.location.host.indexOf('.95516.') > 0 ? 'https://wallet.95516.net' : 'http://www.uisheji.me') + '/upweixin/server/sdkConfig.php';

        //$.ajax({
        //    type: "GET",
        //    url: wxUrl,
        //    dataType: "json",
        //    //data: data,
        //    success: function (data) {
        //        var msg = 'data = ' + JSON.stringify(data);
        //        console.log(msg);
        //        //console.log(msg);
        //
        //        useJSSDK(data);
        //    },
        //    error: function (error) {
        //        var msg = 'err = ' + JSON.stringify(error);
        //        console.log(msg);
        //        console.log(msg);
        //    }
        //});

        $.getJSON( wxUrl, function (data, status){
            //console.log('data = ' + JSON.stringify(data));

            if(status == 'success') {
                // success
                var msg = 'data = ' + JSON.stringify(data);
                console.log(msg);
                //console.log(msg);

                useJSSDK(data, wx);
            }
            else {
                // fail
                var msg = 'data = ' + JSON.stringify(data);
                console.log(msg);
                //console.log(msg);
            }
        });
    }


    function useJSSDK(wxData, wx) {
        // config wx obj.
        var configParams = wxData;
        $.extend(configParams, {
            debug: UP.W.debugMode,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });

        wx.config(configParams);

        // wx is ready.
        wx.ready(function () {
            console.log('>> ready');
            console.log('>> ready');

            //var timeline = shareData;

            // bridge, params --> wx share data.

            /*
             var shareData = {
             title: '山海间 你放下 多少假面？',
             desc: '与人划界，我即是这样的阶级',
             link: url,
             imgUrl: 'http://www.inetgoes.com/hello/app/fakeface/images/thumb.jpg'
             };
             */

            var shareData = params;

            // for desc
            if(!shareData.desc) {
                if(shareData.title && shareData.title.length) {
                    shareData.desc = shareData.title;
                }
                else {
                    shareData.desc = '';
                }
            }

            // for share link
            if(!shareData.link) {
                if(shareData.detailUrl && shareData.detailUrl.length) {
                    shareData.link = shareData.detailUrl;
                }
                else {
                    shareData.link = window.location.href;
                }
            }

            // for share image.
            if(!shareData.imgUrl) {
                if(shareData.picUrl && shareData.picUrl.length) {
                    shareData.imgUrl = shareData.picUrl;
                }
                else {
                    // default is wallet icon.
                    shareData.imgUrl = 'https://wallet.95516.com/s/wl/webV3/402/images/common/logo.png';
                }
            }

            // mock
            //shareData = {
            //    title: '山海间 你放下 多少假面？',
            //    desc: '与人划界，我即是这样的阶级',
            //    link: 'http://www.baidu.com',
            //    imgUrl: 'http://www.inetgoes.com/hello/app/fakeface/images/thumb.jpg'
            //};

            shareData.success = function (data) {
                // 用户确认分享后执行的回调函数
                console.log('success');
                console.log('share success');
            };

            shareData.cancel = function (err) {
                // 用户取消分享后执行的回调函数
                console.log('cancel');
                console.log('share cancel');
            };

            /*
             wx.onMenuShareTimeline({
             title: '', // 分享标题
             link: '', // 分享链接
             imgUrl: '', // 分享图标
             success: function () {
             // 用户确认分享后执行的回调函数
             },
             cancel: function () {
             // 用户取消分享后执行的回调函数
             }
             });
             wx.onMenuShareAppMessage({
             title: '', // 分享标题
             desc: '', // 分享描述
             link: '', // 分享链接
             imgUrl: '', // 分享图标
             type: '', // 分享类型,music、video或link，不填默认为link
             dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
             success: function () {
             // 用户确认分享后执行的回调函数
             },
             cancel: function () {
             // 用户取消分享后执行的回调函数
             }
             });
             */

            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
        });

        wx.error(function (res) {
            console.log(res && res.errMsg);
        });
    }


}

// Native has ShareKit, for native part.

function appendShareData (data, channel) {

    var detailUrl = data['detailUrl'];
    if(detailUrl && detailUrl.length) {
        if(detailUrl.indexOf('?') < 0) {
            detailUrl += ('?channel=' + channel);
        }
        else {
            detailUrl += ('&channel=' + channel);
        }

        data['detailUrl']  = detailUrl;
    }



    // 兼容以前客户端与江俊定义好的协议。
    if(data['detailUrl'] && data['detailUrl'].length) {
        data['shareUrl'] = data['detailUrl'];
    }
    // share in wx app.
    else if(data['link'] && data['link'].length) {
        data['shareUrl'] = data['link'];
    }

    if(data['desc'].length) {
        data['content'] = data['desc'];
    }
    else if(data['title'].length) {
        data['content'] = data['title'];
    }

    // 将分享URL添加到分享内容里面去。
    if(UP.W.Cordova.isIos && data.detailUrl && data.detailUrl.length) {
        data.content = data.content + data.detailUrl;
    }
    /****新浪分享添加url在分享内容中去-gaoyu***/
    var isAndroid=navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;
    if(channel==1&&isAndroid){
        data.content = data.content + data.detailUrl;
    }
    /****新浪分享添加url在分享内容中去-gaoyu***/
    return data;
}

// android异步调用，支持回调cb
function getShareData(channel, cb) {

    var shareParams = {};
    $.extend(shareParams, UPKVShareParams);

    var title = shareParams['title'];
    if(!title || title ==='') {
        shareParams['title'] = '';
    }
    var desc = shareParams['desc'];
    if(!desc || desc === '') {
        // wallet logo
        shareParams['desc'] = shareParams['title'];
    }

    var picUrl = shareParams['picUrl'];
    if(!picUrl || picUrl === '') {
        // wallet logo

        // share in wx app.
        picUrl = shareParams['imgUrl'];
        if(!picUrl || picUrl === '') {
            shareParams['picUrl'] = 'https://wallet.95516.com/s/wl/webV3/402/images/common/logo.png';
        }
    }

    var detailUrl = shareParams['detailUrl'];
    if(!detailUrl || detailUrl === '') {
        // wallet logo
        shareParams['detailUrl'] = window.location.href;
    }

    // 微信分享使用SDK必须使用备案域名
    // shareParams['detailUrl'] = (shareParams['detailUrl']).replace('http://101.231.114.253', 'http://www.uisheji.me');

    $.extend(shareParams, {channel: channel});

    var allParams = appendShareData(shareParams, channel);

    // 每次点击分享渠道以后，上层可能要做一些额外处理。
    //sessionStorage.setItem('UPShareChannel', channel);
    //$(document).trigger('UPShareChannelClick');
    // -->
    if(!UPKVShareIsSDK) {
        UP.W.Cordova.evtHandler.trigger('UPShareChannelClick', {UPShareChannel: channel});
    }
    var allParamsStr = JSON.stringify(allParams);
    if (cb) {
        cb(allParamsStr);
    }
    else {
        return allParamsStr;
    }
}

// 给钱包IOS客户端提供JS方法
function unionpayWalletShareContent_iOS(channel){
    //debugger
    return getShareData(channel);
}

// 给钱包Android客户端提供JS方法
function unionpayWalletShareContent_Android(channel){
    getShareData(channel, function (paramsStr) {
        share_utils.setCommonTemplate(paramsStr);
    });
}



