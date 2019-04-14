/**
 * producted bu yuanshenghui
 * UP calculator based on resize.js/zepto/jquery
 * params  option
 * input selecter array such as ['.input1','#input2']
 * fixed 0-9
 * absmax 1-9
 * useResize 750/640/userdefined
 */
;(function (win, $, UP) {
    "use strict";
    UP.W = UP.W || {};
    UP.W.Rem = UP.W.Rem || {};
    // 常量
    UP.W.Calc = UP.W.Calc || {};
    var calc = UP.W.Calc;
    calc.data = {};
    calc.util = {};
    var util = calc.util;
    calc.init = function (option) {
        var util = calc.util;
        if (!$('.up-calc')[0]) {
            if (option.useResize) {
                util.resize(win, UP, option.useResize);
            }
            createDom(option);
            bindKey();
        }
        bindInput(option);
        function bindInput(option) {
            var input = new Array();
            input = option.input;
            var length = input.length;
            calc.data.input = input;
            for(var i=0;i<length;i++){
                $('body').on('click', input[i], function () {
                    calc.data.input = this;
                    calc.data.max = option.max;
                    calc.data.fixed = option.fixed;
                    calc.data.arg1 = '';
                    calc.data.arg2 = '';
                    calc.data.status = 0;
                    calc.data.result = $(this).val();
                    $('.up-calc .result_area .sign').text('');
                    $('.up-calc .result_area .result').text(calc.data.result);
                    $('.up-calc').show();
                });
            }
        }

        function bindKey(option) {
            //蒙版消失
            $('.up-calc').on('click', '.mask', function () {
                $('.up-calc').hide();
            });
            //功能按键区
            $('.up-calc').on('click', '.sign_area .op_area div', function () {
                switch ($(this).attr('key')) {
                    case 'confirm':
                        if ($('.up-calc .result_area .result').text() === 'ERROR'||$('.up-calc .result_area .result').text()==='') {
                            $('.up-calc').hide();
                            return;
                        }
                        $(calc.data.input).val(parseFloat(calc.data.result).toFixed(calc.data.fixed));
                        $('.up-calc').hide();
                        break;
                    case 'c':
                        $('.up-calc .result_area .result').text('');
                        $('.up-calc .result_area .sign').text('');
                        calc.data.arg1 = '';
                        calc.data.arg2 = '';
                        calc.data.status = 0;
                        calc.data.result = '';
                        break;
                    case 'back':
                        var str = $('.up-calc .result_area .result').text();
                        if (str.length < 1) {
                            return;
                        }
                        if (calc.data.status === 0) {
                            calc.data.arg1 = calc.data.arg1.substring(0, calc.data.arg1.length - 1);
                            $('.up-calc .result_area .result').text(calc.data.arg1);
                        } else if (calc.data.status === 5) {
                            $('.up-calc .result_area .result').text('');
                            calc.data.arg1 = '';
                            calc.data.arg2 = '';
                            calc.data.status = 0;
                            calc.data.result = '';
                        } else {
                            calc.data.arg2 = calc.data.arg2.substring(0, calc.data.arg1.length - 1);
                            $('.up-calc .result_area .result').text(calc.data.arg2);
                        }
                        break;
                    case '=':
                        result();
                        $('.up-calc .big_btn2').hide();
                        $('.up-calc .big_btn').show();
                        break;
                    default:
                }
            });
            //计算符号
            $('.up-calc').on('click', '.pan .pan_area .sign_area .sum_area > div', function () {
                //计算之前的结算
                if (calc.data.arg2 !== '') {
                    result();
                }
                if (calc.data.arg1 === '') {
                    return;
                }
                switch ($(this).attr('key')) {
                    case '/':
                        calc.data.status = 4;
                        $('.up-calc .result_area .sign').text('÷');
                        break;
                    case '*':
                        calc.data.status = 3;
                        $('.up-calc .result_area .sign').text('×');
                        break;
                    case '-':
                        calc.data.status = 2;
                        $('.up-calc .result_area .sign').text('-');
                        break;
                    case '+':
                        calc.data.status = 1;
                        $('.up-calc .result_area .sign').text('+');
                        break;
                    default:
                }
                $('.up-calc .big_btn2').show();
                $('.up-calc .big_btn').hide();
            });
            //数字
            $('.up-calc').on('click', '.num_area div', function () {
                if (calc.data.status === 0) {
                    //小数点
                    if ($(this).attr('data-num') === '.' && (calc.data.arg1.indexOf('.') > 0 || calc.data.arg1 === '')) {
                        return;
                    }
                    if (ifFixed(calc.data.arg1 + $(this).attr('data-num'))) {
                        return;
                    }
                    calc.data.arg1 = calc.data.arg1 + $(this).attr('data-num');
                    calc.data.result = calc.data.arg1;
                    $('.up-calc .result_area .result').text(calc.data.arg1);
                } else if (calc.data.status === 5) {
                    //小数点
                    calc.data.arg1 = '';
                    calc.data.result = '';
                    if ($(this).attr('data-num') === '.' && (calc.data.arg1.indexOf('.') > 0 || calc.data.arg1 === '')) {
                        return;
                    }
                    if (ifFixed(calc.data.arg1 + $(this).attr('data-num'))) {
                        return;
                    }
                    calc.data.arg1 = calc.data.arg1 + $(this).attr('data-num');
                    calc.data.result = calc.data.arg1;
                    $('.up-calc .result_area .result').text(calc.data.arg1);
                } else {
                    //小数点
                    if ($(this).attr('data-num') === '.' && (calc.data.arg2.indexOf('.') > 0 || calc.data.arg2 === '')) {
                        return;
                    }
                    if (ifFixed(calc.data.arg2 + $(this).attr('data-num'))) {
                        return;
                    }
                    calc.data.arg2 = calc.data.arg2 + $(this).attr('data-num');
                    $('.up-calc .result_area .result').text(calc.data.arg2);
                }
            });

        }

        //数字位数控制
        function ifFixed(value) {
            if (value.replace('-', '').split('.')[0].length > calc.data.max) {
                return true;
            } else if (value.replace('-', '').split('.')[1] && value.split('.')[1].length > calc.data.fixed) {
                return true;
            }
            return false;
        }

        //计算结果
        function result() {
            var result = '';
            switch (calc.data.status) {
                case 1:
                    result = util.addFuc(calc.data.arg1, calc.data.arg2).toFixed(calc.data.fixed);
                    break;
                case 2:
                    result = util.minusFuc(calc.data.arg1, calc.data.arg2).toFixed(calc.data.fixed);
                    break;
                case 3:
                    result = util.plusFuc(calc.data.arg1, calc.data.arg2).toFixed(calc.data.fixed);
                    break;
                case 4:
                    result = util.divideFuc(calc.data.arg1, calc.data.arg2).toFixed(calc.data.fixed);
                    break;
                default:
            }
            //越界处理
            if (ifFixed(result)) {
                $('.up-calc .result_area .result').text('ERROR');
                $('.up-calc .result_area .sign').text('');
                calc.data.arg1 = '';
                calc.data.arg2 = '';
                calc.data.result = '';
                calc.data.status = 0;
                return;
            }
            calc.data.arg1 = result;
            $('.up-calc .result_area .result').text(result);
            calc.data.result = result;
            $('.up-calc .result_area .sign').text('');
            calc.data.arg2 = '';
            calc.data.status = 5;

        }

        //创建控件
        function createDom(option) {
            var str = '<div class="up-calc">' +
                '<div class="mid">' +
                '<div class="pan">' +
                '<div class="result_area">' +
                '<div class="sign"></div>' +
                '<div class="result"></div>' +
                '</div>' +
                '<div class="pan_area">' +
                '<div class="num_area">' +
                '<div data-num="7">7</div>' +
                '<div data-num="8">8</div>' +
                '<div data-num="9">9</div>' +
                '<div data-num="4">4</div>' +
                '<div data-num="5">5</div>' +
                '<div data-num="6">6</div>' +
                '<div data-num="1">1</div>' +
                '<div data-num="2">2</div>' +
                '<div data-num="3">3</div>' +
                '<div data-num="00">00</div>' +
                '<div data-num="0">0</div>' +
                '<div data-num=".">·</div>' +
                '</div>' +
                '<div class="sign_area">' +
                '<div class="sum_area">' +
                '<div key="/">÷</div>' +
                '<div key="*">×</div>' +
                '<div key="-">-</div>' +
                '<div key="+">+</div>' +
                '</div>' +
                '<div class="op_area">' +
                '<div key="back"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABJtJREFUaAXtmdtrVEcYwN3dXEwMCkp9MLY2eRBEwWISE6LBNIpUNAquAUEfQqv4B3S1xRfjg7d4eRbBkodYpNEHm4qCt5Vo7lEEpeBLgsZ9ULRQ0qS5bfx9sgdknTlnz9mTNcEZGObsXL7v+30z8805s3PmmGQ8YDxgPGA8YDxgPGA8YDxgPGA8YDxgPPCpBwKfVqVXU1paun1qaqoeKSXkb9KTlvLoGD2jOTk5hzo6Ol7ZjfINuLq6eu7Q0NAlYHfaKZzOtkAg8DY7O3u1HXSWHwaUl5fPB/ZPYDcg759gMHg8FApd6ezsHPBDvpOMsrKyr9F9gfzD2NhYI/336MakPcNVVVVfDQ8P30TBGjw8mJWVtRnQv3UKp6teoOPx+Avkx/r6+gp1eoK6hlTqKysrl42MjDygr8A+x8PrPges2NrT0/MyYfOSRKksPANXVFSsYPk8AHI5kh/l5eWtx7Pi4RmdPAETiddOTEy0AbuUmY2yjL9va2t7M6NJE8a5BmavbAL0DnkRsNcKCgq2dHV1/TsbYMVGV8DMbJjAcJ1xBeSmoqKicDQa/V8EzZaU8rHEzO4H9jxgQWb2HEEiQjnlBhQZ3yFjT35+fqPTFiAgLh4dHT3I8dbc3d39xEkPKy7AhDh1S22GS0pKfsHQCwJLOtzb2/uzW1ixBBl7KSJE9rtynEmdKgksAfEubRFxkKpPcl2q9jguaWBPI/wkOQ7sAWb2RLKyVH/n5uY2YtgzZmOVDtqCpc9K+j4l+ot+35IWuK6uLsQSuYimCHmMvBtYmWXPqb29/TXvuzU6aAVsjdPSd2uMErihoSHY399/GS//iMD/MHAbZ2yLW+Gq/jroTMCKPUrg1tbWI8DuAvQdfTayZ2+pjPdap4KWPfvRMvZ9Zi1blcA01ksHIuRWZrZLnv1OydCZgBUGHbDffDNGng64SSycnJy8TpQunw5rk/esLpD5rVsJXFtbexQDrrDMFqLwDtCb/VScDMvRU2MXvf3UrQQmSsd5bdwN9G8om0duBbrOD8UqWDl6kve07pxO1wYlsAhtaWmZJDr/xOMZcg75MufyAUrPSQdrCcwEtBbYMoIofZDnX8lBlvh5oA9bbW5L3o0POUVjBbTo9y05AosmoE9R7CfHMfgY0GcpXV8P8WrajIwzsmft3qAsaOnLmEuUjilVe1wZDWgYwb+jXZZ4U3Fx8T5Z+o7WZKgDcebD1xsTpOVKaYYte9nTV/H4Vn4Pket5/bwq17NW+2woXQELEB8Qt4neG8lvme0dXM/ekGva2QArNroGlkHMdDf3WFVADwJdzf3WPbvvWxkzU5InYDFermOBXQf0c36uketa9lCm/lrx7D/PwKKR4PBCrmd5fAT8cuAfyvWtZ2vSGCgX8YnhMTsxaQGLYDle5JoW2PtALx0fH3+I8gjg39op9rNNYNFtXU5E7WRrw7fdIFVb4s+0ZhSHVe2ZqMPp7/ikXc218aBOX0jX4LZ+YGBgIhaL/VFYWPgYxbmMl3fwBW7leOwfQ+dfwIbtYD3KNsOMB4wHjAeMB4wHjAeMB4wHjAeMB4wHvgAPvAewX1S44gPvogAAAABJRU5ErkJggg==" class="backpng"/></div>' +
                '<div key="c">c</div>' +
                '<div key="confirm" class="big_btn">确 认</div>' +
                '<div key="=" class="big_btn2">=</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="mask"></div>' +
                '</div>' +
                '</div>';
            $('body').append(str);
        }
    };
    //工具函数
    calc.util = {
        addFuc: function (arg1, arg2) {
            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m) / m;
        },
        minusFuc: function (arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m - arg2 * m) / m;
        },
        plusFuc: function (arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            }
            catch (e) {
            }
            try {
                m += s2.split(".")[1].length;
            }
            catch (e) {
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        divideFuc: function (arg1, arg2) {
            var t1 = 0, t2 = 0, r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
            }
            try {
                t2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
            }
            r1 = Number(arg1.toString().replace(".", ""));
            r2 = Number(arg2.toString().replace(".", ""));
            return (r1 / r2) * Math.pow(10, t2 - t1);
        },
        resize: function (win, UP, vW) {

            var timer = null;
            var rem = 12;
            var doc = win.document;
            var docEl = doc.documentElement;
            var visualWidth = vW || 640;

            /**
             * 刷新页面REM值
             */
            function refreshRem() {
                var width = docEl.getBoundingClientRect().width;
                width = width > 768 ? visualWidth : width;
                rem = width / (visualWidth / 100);
                docEl.style.fontSize = rem + 'px';
            }

            /**
             * 页面缩放或重载时刷新REM
             */
            win.addEventListener('resize', function () {
                clearTimeout(timer);
                timer = setTimeout(refreshRem, 300);
            }, false);
            win.addEventListener('pageshow', function (e) {
                if (e.persisted) {
                    clearTimeout(timer);
                    timer = setTimeout(refreshRem, 300);
                }
            }, false);

            // 解决font-size过大导致间距不正常，必须指定body字号为12px
            if (doc.readyState === 'complete') {
                doc.body.style.fontSize = '12px';
            } else {
                doc.addEventListener('DOMContentLoaded', function (e) {
                    doc.body.style.fontSize = '12px';
                }, false);
            }

            refreshRem();

            /**
             * rem to px
             * @param d
             * @returns {number}
             */
            UP.W.Rem.rem2px = function (d) {
                var val = parseFloat(d) * rem;
                if (typeof d === 'string' && d.match(/rem$/)) {
                    val += 'px';
                }
                return val;
            };

            /**
             * px to rem
             * @param d
             * @returns {number}
             */
            UP.W.Rem.px2rem = function (d) {
                var val = parseFloat(d) / rem;
                if (typeof d === 'string' && d.match(/px$/)) {
                    val += 'rem';
                }
                return val;
            };

        }
    };
})
(window, window.Zepto || window.jQuery, window.UP = window.UP || {});
