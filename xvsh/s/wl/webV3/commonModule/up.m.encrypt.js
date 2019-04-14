/**
 * Created by wangyuqiu on 9/23/14.
 */
//获取客户输入数字并加密
//是否打开过键盘

var _exponent = '10001';


var open_flag = false, bodyH = 0, open_k = false;

var password_gb_interval = null;
function encryptValue(obj) {


    //点击按钮变色
    $(obj).css('background-color', '#3f3f3f');

    //恢复按钮背景色
    var timer = setTimeout(function () {
        $(obj).css('background-color', '#2d2d2d');

        clearTimeout(timer);

    }, 300);


    //var visiablepan = document.getElementById("visiablepan").value;
    var visiablepan = window.visiablepan;


    if (!document.getElementById('password_text')) {
        complete();
        return;
    }

    //密码输入框内容
    var password_sp = $("#password_text").html();
    //加密后的密码
    var enc_password = document.getElementById('encpassword').value;
    //输入值
    var tip = $(obj).html();
    if (password_sp == "取款密码" || !open_flag) {
        password_sp = "";
        document.getElementById('encpassword').value = ""; // 初始化清空上次加密密码
        //document.getElementById('password_text').innerText="";
        $("#password_text").html("");
        //clearInterval(password_gb_interval);
    }
    if (tip == "完成") {
        //点击完成按钮
        complete();

    } else if (tip == "") {
        //点击删除按钮，删除输入密码一位以及加密密码值减少16位
        $(document.getElementById('password_text')).html(password_sp.slice(0, -1));
        var encword = document.getElementById('encpassword').value;
        document.getElementById('encpassword').value = encword.substring(0, encword.length - 16);
    } else {
        if (password_sp.length == 6) {
            return;
        }
        document.getElementById('password').className = "down-password";
        //密码输入框赋值“*”
        $(document.getElementById('password_text')).html(password_sp + "*");
        var encword = document.getElementById('encpassword').value;
        //对输入的密码进行加密，和之前的加密密码组合，赋值给encpassword
        //3DES
        document.getElementById('encpassword').value = encword + DesEncrypt(tip);
        open_flag = true;
    }
}
//点击页面document对象事件，隐藏键盘
$(document).click(function(e){
    var _val=$('#password_text').text();
    if(_val!=''){
        if($('#keybord:visible').length>0){
            $('.keyboard-cp').trigger('click');
        };
    }else{
        $('#encpassword').val(''); // 初始化清空上次加密密码
        $("#password").html('取款密码').attr('class','up-password password w6');
        clearInterval(password_gb_interval);
        open_flag = false;
        bodyH = 0;
        openresult_k = false;
        //$('body').css('height','auto');
        document.getElementById('keybord').style.display = "none";
    };
	 $('.formError').remove();
});

function complete() {
    open_k = false
    //
    try {
        document.getElementById('keybord').style.display = "none";

        clearInterval(password_gb_interval);

        $("#password_gb").hide();

        $(".pass-clear").addClass("hide");
        document.getElementById('password').className = "down-password";

        if ($(document.getElementById('password')).html() == "银行卡密码") {
            document.getElementById('password').className = "up-password password w6 backfontcolor";
        }
        document.getElementsByTagName("body")[0].style.height = bodyH + 'px'
        bodyH = 0;
        if (open_flag == false) {
            return;
        }


        //var visiablepan = document.getElementById("visiablepan").value;
        //银行卡号
        var visiablepan = $(".CardNumber").text().match(/\d+(\.\d+)?/g);
        var password_sp = $(document.getElementById('password')).html();
        var enc_password = document.getElementById('encpassword').value;
        open_flag = false;
        if (password_sp == "" || password_sp == "银行卡密码") {
            document.getElementById('password').className = "backfontcolor up-password";
            $(document.getElementById('password')).html("银行卡密码");
            document.getElementById('encpassword').value = "";
            return;
        }
        //获得加密密码
        var des_value = document.getElementById('encpassword').value;
        var password = "";
        for (var i = 0; i < des_value.length; i += 16) {
            password += DesDecrypt(des_value.substring(i, i + 16));
        }
        //密码
        document.getElementById('encpassword').value = formatToHex(password, visiablepan[0]);

    } catch (e) {
        console.log("#######error######", e);
    }


}
//设置滚动距离
function click_scroll() {
    var scroll_offset = $(".item-password").offset();  //输入框滚动

    var pass_offset = $("#keybord").height();
    $(".pass-clear").removeClass("hide");
    var scollheight = $(window).height();
//		  alert(scollheight+" "+pass_offset+" "+scroll_offset.top);
    var scroll_offsetTop = scroll_offset == undefined ? 0 : scroll_offset.top;
    var height = pass_offset + scroll_offsetTop - scollheight;
    height = height > 0 ? (height + 80) : 0;
//		  document.getElementsByTagName("body")[0].className="body-scoll";

    window.scrollTo(0, height);

}
function scoll_div() {

    var h3_height = $("#pin").offset().top;

    $(window).scroll(function () {
        var this_scrollTop = $(this).scrollTop();
        if (this_scrollTop > h3_height) {
            $("#pin").show();
        }
    });
}
function showKeybord(flag) {
    open_k = true
    var array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (flag == 0) {
        //初始化键盘数字值
        array.sort(function () {
            return Math.random() > 0.5 ? -1 : 1;
        });
        array.push("完成", "");
        //排列完成和回退按钮
        var temp = array[array.length - 3];
        array[array.length - 3] = array[array.length - 2];
        array[array.length - 2] = temp;

        var btns = [];
        var keybord1 = document.getElementById('keyboard-row1').getElementsByTagName("div");
        for (var i = 0; i < 3; i++) {
            btns.push(keybord1[i]);
        }

        var keybord2 = document.getElementById('keyboard-row2').getElementsByTagName("div");
        for (var i = 0; i < 3; i++) {
            btns.push(keybord2[i]);
        }

        var keybord3 = document.getElementById('keyboard-row3').getElementsByTagName("div");
        for (var i = 0; i < 3; i++) {
            btns.push(keybord3[i]);
        }

        var keybord4 = document.getElementById('keyboard-row4').getElementsByTagName("div");
        for (var i = 0; i < 3; i++) {
            btns.push(keybord4[i]);
        }


        for (var i = 0; i < array.length; i++) {
            //btns[i].innerText = array[i];
            $(btns[i]).html(array[i]);
        }
        document.getElementById('keybord').style.display = "";
        $('#password').html('<em id="password_text" style="font-size:18px;padding-top:5px;"></em><span id="password_gb" style="font-size:18px">|</span>');
        click_scroll();
        //模仿输入框光标闪烁
        password_gb_interval = setInterval(function () {
            $("#password_gb").toggleClass('dn');
        }, 500);


    } else {
        document.getElementById('keybord').style.display = "none";
        $(".pass-clear").addClass("hide");
        //var visiablepan = document.getElementById("visiablepan").value;
        var visiablepan = window.visiablepan;
        complete();


    }

    var Bodys = document.getElementsByTagName("body")[0], BodyHeight = Bodys.offsetHeight;
    if (bodyH == 0) {
        bodyH = BodyHeight
        Bodys.style.height = BodyHeight + 220 + 'px'
        return
    }


}


//DES加密算法
function DesEncrypt(value) {
    value = enString(value);
    return value;
}
//DES解密算法
function DesDecrypt(value) {
    value = deString(value);
    return value;
}
function formatToHex(pin, pan) {
    var phex1 = new Array(8);
    var phex2 = new Array(8);
    phex1[0] = "0x06";
    phex2[0] = "0x00";
    phex2[1] = "0x00";
    var phex_index1 = 1;
    var phex_index2 = 2;
    var v_pass = "";
    var result;
    for (var i = 0; i < pin.length; i += 2) {
        phex1[phex_index1++] = "0x" + pin.charAt(i) + pin.charAt(i + 1);
    }
    phex1[4] = "0xFF";
    phex1[5] = "0xFF";
    phex1[6] = "0xFF";
    phex1[7] = "0xFF";

    for (var i = pan.length - 13; i < pan.length - 1; i += 2) {
        phex2[phex_index2++] = "0x" + pan.charAt(i) + pan.charAt(i + 1);
    }
    for (var i = 0; i < 8; i++) {
        var temp = phex2[i] ^ phex1[i];
        v_pass += convertToHex(temp);
    }
    return do_encrypt(v_pass);
}


function l_encrypt(v_password) {
    var public_key =publicKey4Login();
    var rsa = new RSAKey();

    rsa.setPublic(public_key, _exponent);
    var res = rsa.login_encrypt(v_password);
    if (res) {
        return res;
        //  return linebrk(res, 64);
    } else {
        alert("加密失败");
        return;
    }
}

function PasswordConver(text) {
    var m = pkcs1pad2_bak(text, (this.n.bitLength() + 7) >> 3);
    if (m == null) return null;
    var c = this.doPublic(m);
    if (c == null) return null;
    var h = c.toString(16);
    if ((h.length & 1) == 0) return h; else return "0" + h;
}


function convertToHex(temp) {
    temp = temp.toString(16);
    if (temp.length == 1) {
        temp = "0" + temp;
    }
    temp = "0x" + temp.toUpperCase();
    return temp;
}


function do_encrypt(v_password) {
    var public_key =publicKey4Keyboard();
    var rsa = new RSAKey();

    rsa.setPublic(public_key, _exponent);
    var res = rsa.encrypt(v_password);
    if (res) {
        return res;
        //  return linebrk(res, 64);
    } else {
        alert("加密失败");
        return;
    }
}


// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary & 0xffffff) == 0xefcafe);

// (public) Constructor
function BigInteger(a, b, c) {
    if (a != null)
        if ("number" == typeof a) this.fromNumber(a, b, c);
        else if (b == null && "string" != typeof a) this.fromString(a, 256);
        else this.fromString(a, b);
}

// return new, unset BigInteger
function nbi() {
    return new BigInteger(null);
}

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
        var v = x * this[i++] + w[j] + c;
        c = Math.floor(v / 0x4000000);
        w[j++] = v & 0x3ffffff;
    }
    return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i, x, w, j, c, n) {
    var xl = x & 0x7fff, xh = x >> 15;
    while (--n >= 0) {
        var l = this[i] & 0x7fff;
        var h = this[i++] >> 15;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
        c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
        w[j++] = l & 0x3fffffff;
    }
    return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i, x, w, j, c, n) {
    var xl = x & 0x3fff, xh = x >> 14;
    while (--n >= 0) {
        var l = this[i] & 0x3fff;
        var h = this[i++] >> 14;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
        c = (l >> 28) + (m >> 14) + xh * h;
        w[j++] = l & 0xfffffff;
    }
    return c;
}
if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
}
else if (j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n) {
    return BI_RM.charAt(n);
}
function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c == null) ? -1 : c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
    for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
    this.t = 1;
    this.s = (x < 0) ? -1 : 0;
    if (x > 0) this[0] = x;
    else if (x < -1) this[0] = x + this.DV;
    else this.t = 0;
}

// return bigint initialized to value
function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r;
}

// (protected) set from string and radix
function bnpFromString(s, b) {
    var k;
    if (b == 16) k = 4;
    else if (b == 8) k = 3;
    else if (b == 256) k = 8; // byte array
    else if (b == 2) k = 1;
    else if (b == 32) k = 5;
    else if (b == 4) k = 2;
    else {
        this.fromRadix(s, b);
        return;
    }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while (--i >= 0) {
        var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
        if (x < 0) {
            if (s.charAt(i) == "-") mi = true;
            continue;
        }
        mi = false;
        if (sh == 0)
            this[this.t++] = x;
        else if (sh + k > this.DB) {
            this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
            this[this.t++] = (x >> (this.DB - sh));
        }
        else
            this[this.t - 1] |= x << sh;
        sh += k;
        if (sh >= this.DB) sh -= this.DB;
    }
    if (k == 8 && (s[0] & 0x80) != 0) {
        this.s = -1;
        if (sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
    }
    this.clamp();
    if (mi) BigInteger.ZERO.subTo(this, this);
}

// (protected) clamp off excess high words
function bnpClamp() {
    var c = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == c) --this.t;
}

// (public) return string representation in given radix
function bnToString(b) {
    if (this.s < 0) return "-" + this.negate().toString(b);
    var k;
    if (b == 16) k = 4;
    else if (b == 8) k = 3;
    else if (b == 2) k = 1;
    else if (b == 32) k = 5;
    else if (b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
    var p = this.DB - (i * this.DB) % k;
    if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) > 0) {
            m = true;
            r = int2char(d);
        }
        while (i >= 0) {
            if (p < k) {
                d = (this[i] & ((1 << p) - 1)) << (k - p);
                d |= this[--i] >> (p += this.DB - k);
            }
            else {
                d = (this[i] >> (p -= k)) & km;
                if (p <= 0) {
                    p += this.DB;
                    --i;
                }
            }
            if (d > 0) m = true;
            if (m) r += int2char(d);
        }
    }
    return m ? r : "0";
}

// (public) -this
function bnNegate() {
    var r = nbi();
    BigInteger.ZERO.subTo(this, r);
    return r;
}

// (public) |this|
function bnAbs() {
    return (this.s < 0) ? this.negate() : this;
}

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
    var r = this.s - a.s;
    if (r != 0) return r;
    var i = this.t;
    r = i - a.t;
    if (r != 0) return (this.s < 0) ? -r : r;
    while (--i >= 0) if ((r = this[i] - a[i]) != 0) return r;
    return 0;
}

// returns bit length of the integer x
function nbits(x) {
    var r = 1, t;
    if ((t = x >>> 16) != 0) {
        x = t;
        r += 16;
    }
    if ((t = x >> 8) != 0) {
        x = t;
        r += 8;
    }
    if ((t = x >> 4) != 0) {
        x = t;
        r += 4;
    }
    if ((t = x >> 2) != 0) {
        x = t;
        r += 2;
    }
    if ((t = x >> 1) != 0) {
        x = t;
        r += 1;
    }
    return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
    if (this.t <= 0) return 0;
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n, r) {
    var i;
    for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
    for (i = n - 1; i >= 0; --i) r[i] = 0;
    r.t = this.t + n;
    r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n, r) {
    for (var i = n; i < this.t; ++i) r[i - n] = this[i];
    r.t = Math.max(this.t - n, 0);
    r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n, r) {
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / this.DB), c = (this.s << bs) & this.DM, i;
    for (i = this.t - 1; i >= 0; --i) {
        r[i + ds + 1] = (this[i] >> cbs) | c;
        c = (this[i] & bm) << bs;
    }
    for (i = ds - 1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n, r) {
    r.s = this.s;
    var ds = Math.floor(n / this.DB);
    if (ds >= this.t) {
        r.t = 0;
        return;
    }
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = this[ds] >> bs;
    for (var i = ds + 1; i < this.t; ++i) {
        r[i - ds - 1] |= (this[i] & bm) << cbs;
        r[i - ds] = this[i] >> bs;
    }
    if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
    r.t = this.t - ds;
    r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a, r) {
    var i = 0, c = 0, m = Math.min(a.t, this.t);
    while (i < m) {
        c += this[i] - a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
    }
    if (a.t < this.t) {
        c -= a.s;
        while (i < this.t) {
            c += this[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        c += this.s;
    }
    else {
        c += this.s;
        while (i < a.t) {
            c -= a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        c -= a.s;
    }
    r.s = (c < 0) ? -1 : 0;
    if (c < -1) r[i++] = this.DV + c;
    else if (c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a, r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0) r[i] = 0;
    for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
    r.s = 0;
    r.clamp();
    if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2 * x.t;
    while (--i >= 0) r[i] = 0;
    for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x[i], r, 2 * i, 0, 1);
        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
            r[i + x.t] -= x.DV;
            r[i + x.t + 1] = 1;
        }
    }
    if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
    r.s = 0;
    r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m, q, r) {
    var pm = m.abs();
    if (pm.t <= 0) return;
    var pt = this.abs();
    if (pt.t < pm.t) {
        if (q != null) q.fromInt(0);
        if (r != null) this.copyTo(r);
        return;
    }
    if (r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB - nbits(pm[pm.t - 1]);	// normalize modulus
    if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
    }
    else {
        pm.copyTo(y);
        pt.copyTo(r);
    }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 == 0) return;
    var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
    var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
    var i = r.t, j = i - ys, t = (q == null) ? nbi() : q;
    y.dlShiftTo(j, t);
    if (r.compareTo(t) >= 0) {
        r[r.t++] = 1;
        r.subTo(t, r);
    }
    BigInteger.ONE.dlShiftTo(ys, t);
    t.subTo(y, y);	// "negative" y so we can replace sub with am later
    while (y.t < ys) y[y.t++] = 0;
    while (--j >= 0) {
        // Estimate quotient digit
        var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {	// Try it out
            y.dlShiftTo(j, t);
            r.subTo(t, r);
            while (r[i] < --qd) r.subTo(t, r);
        }
    }
    if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms) BigInteger.ZERO.subTo(q, q);
    }
    r.t = ys;
    r.clamp();
    if (nsh > 0) r.rShiftTo(nsh, r);	// Denormalize remainder
    if (ts < 0) BigInteger.ZERO.subTo(r, r);
}

// (public) this mod a
function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
    return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) {
    this.m = m;
}
function cConvert(x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
}
function cRevert(x) {
    return x;
}
function cReduce(x) {
    x.divRemTo(this.m, null, x);
}
function cMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
}
function cSqrTo(x, r) {
    x.squareTo(r);
    this.reduce(r);
}

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
    if (this.t < 1) return 0;
    var x = this[0];
    if ((x & 1) == 0) return 0;
    var y = x & 3;		// y == 1/x mod 2^2
    y = (y * (2 - (x & 0xf) * y)) & 0xf;	// y == 1/x mod 2^4
    y = (y * (2 - (x & 0xff) * y)) & 0xff;	// y == 1/x mod 2^8
    y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y * (2 - x * y % this.DV)) % this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y > 0) ? this.DV - y : -y;
}

// Montgomery reduction
function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp & 0x7fff;
    this.mph = this.mp >> 15;
    this.um = (1 << (m.DB - 15)) - 1;
    this.mt2 = 2 * m.t;
}

// xR mod m
function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t, r);
    r.divRemTo(this.m, null, r);
    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
    return r;
}

// x/R mod m
function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
    while (x.t <= this.mt2)	// pad x so am has enough room later
        x[x.t++] = 0;
    for (var i = 0; i < this.m.t; ++i) {
        // faster way of calculating u0 = x[i]*mp mod DV
        var j = x[i] & 0x7fff;
        var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
        // use am to combine the multiply-shift-add into one call
        j = i + this.m.t;
        x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
        // propagate carry
        while (x[j] >= x.DV) {
            x[j] -= x.DV;
            x[++j]++;
        }
    }
    x.clamp();
    x.drShiftTo(this.m.t, x);
    if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x, r) {
    x.squareTo(r);
    this.reduce(r);
}

// r = "xy/R mod m"; x,y != r
function montMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
}

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() {
    return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
}

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e, z) {
    if (e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
    g.copyTo(r);
    while (--i >= 0) {
        z.sqrTo(r, r2);
        if ((e & (1 << i)) > 0) z.mulTo(r2, g, r);
        else {
            var t = r;
            r = r2;
            r2 = t;
        }
    }
    return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e, m) {
    var z;
    if (e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e, z);
}

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;

// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);


// prng4.js - uses Arcfour as a PRNG

function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Array();
}

// Initialize arcfour context from key, an array of ints, each from [0..255]
function ARC4init(key) {
    var i, j, t;
    for (i = 0; i < 256; ++i)
        this.S[i] = i;
    j = 0;
    for (i = 0; i < 256; ++i) {
        j = (j + this.S[i] + key[i % key.length]) & 255;
        t = this.S[i];
        this.S[i] = this.S[j];
        this.S[j] = t;
    }
    this.i = 0;
    this.j = 0;
}

function ARC4next() {
    var t;
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.S[this.i]) & 255;
    t = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = t;
    return this.S[(t + this.S[this.i]) & 255];
}

Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

// Plug in your RNG constructor here
function prng_newstate() {
    return new Arcfour();
}

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = 256;


// Random number generator - requires a PRNG backend, e.g. prng4.js

// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.

var rng_state;
var rng_pool;
var rng_pptr;

// Mix in a 32-bit integer into the pool
function rng_seed_int(x) {
    rng_pool[rng_pptr++] ^= x & 255;
    rng_pool[rng_pptr++] ^= (x >> 8) & 255;
    rng_pool[rng_pptr++] ^= (x >> 16) & 255;
    rng_pool[rng_pptr++] ^= (x >> 24) & 255;
    if (rng_pptr >= rng_psize) rng_pptr -= rng_psize;
}

// Mix in the current time (w/milliseconds) into the pool
function rng_seed_time() {
    rng_seed_int(new Date().getTime());
}

// Initialize the pool with junk if needed.
if (rng_pool == null) {
    rng_pool = new Array();
    rng_pptr = 0;
    var t;
    if (window.crypto && window.crypto.getRandomValues) {
        // Use webcrypto if available
        var ua = new Uint8Array(32);
        window.crypto.getRandomValues(ua);
        for (t = 0; t < 32; ++t)
            rng_pool[rng_pptr++] = ua[t];
    }
    if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
        // Extract entropy (256 bits) from NS4 RNG if available
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t)
            rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
    }
    while (rng_pptr < rng_psize) {  // extract some randomness from Math.random()
        t = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = t >>> 8;
        rng_pool[rng_pptr++] = t & 255;
    }
    rng_pptr = 0;
    rng_seed_time();
    //rng_seed_int(window.screenX);
    //rng_seed_int(window.screenY);
}

function rng_get_byte() {
    if (rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
            rng_pool[rng_pptr] = 0;
        rng_pptr = 0;
        //rng_pool = null;
    }
    // TODO: allow reseeding after first request
    return rng_state.next();
}

function rng_get_bytes(ba) {
    var i;
    for (i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
}

function SecureRandom() {
}

SecureRandom.prototype.nextBytes = rng_get_bytes;


// Depends on jsbn.js and rng.js

// Version 1.1: support utf-8 encoding in pkcs1pad2

// convert a (hex) string to a bignum object
function parseBigInt(str, r) {
    return new BigInteger(str, r);
}

function linebrk(s, n) {
    var ret = "";
    var i = 0;
    while (i + n < s.length) {
        ret += s.substring(i, i + n) + "\n";
        i += n;
    }
    return ret + s.substring(i, s.length);
}

function byte2Hex(b) {
    if (b < 0x10)
        return "0" + b.toString(16);
    else
        return b.toString(16);
}

function pkcs1pad2(s, n) {
    var ba = new Array();
    var index = 248;
    for (var i = 0; i < s.length; i += 4) {
        ba[index++] = parseInt(s.substring(i, i + 4));
    }
    n = 248;
    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = new Array();
    while (n > 2) { // random non-zero pad
        x[0] = 0;
        while (x[0] == 0) rng.nextBytes(x);
        ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;

    return new BigInteger(ba);
}


// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2_bak(s, n) {
    if (n < s.length + 11) { // TODO: fix for utf-8
        alert("Message too long for RSA");
        return null;
    }

    var ba = new Array();

    var i = s.length - 1;
    while (i >= 0 && n > 0) {
        var c = s.charCodeAt(i--);
        if (c < 128) { // encode using utf-8
            ba[--n] = c;
        }
        else if ((c > 127) && (c < 2048)) {
            ba[--n] = (c & 63) | 128;
            ba[--n] = (c >> 6) | 192;
        }
        else {
            ba[--n] = (c & 63) | 128;
            ba[--n] = ((c >> 6) & 63) | 128;
            ba[--n] = (c >> 12) | 224;
        }
    }

    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = new Array();
    while (n > 2) { // random non-zero pad
        x[0] = 0;
        while (x[0] == 0) rng.nextBytes(x);
        ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
}

// "empty" RSA key constructor
function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
}

// Set the public key fields N and e from hex strings
function RSASetPublic(N, E) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
    }
    else
        alert("Invalid RSA public key");
}

// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
    return x.modPowInt(this.e, this.n);
}

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
function RSAEncrypt(text) {
    var m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);
    if (m == null) return null;
    var c = this.doPublic(m);
    if (c == null) return null;
    var h = c.toString(16);
    if ((h.length & 1) == 0) return h; else return "0" + h;
}

// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
//function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
//}

// protected
RSAKey.prototype.doPublic = RSADoPublic;

// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
RSAKey.prototype.login_encrypt = PasswordConver;
//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;


var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64padchar = "=";

function hex2b64(h) {
    var i;
    var c;
    var ret = "";
    for (i = 0; i + 3 <= h.length; i += 3) {
        c = parseInt(h.substring(i, i + 3), 16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if (i + 1 == h.length) {
        c = parseInt(h.substring(i, i + 1), 16);
        ret += b64map.charAt(c << 2);
    }
    else if (i + 2 == h.length) {
        c = parseInt(h.substring(i, i + 2), 16);
        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }
    while ((ret.length & 3) > 0) ret += b64padchar;
    return ret;
}

// convert a base64 string to hex
function b64tohex(s) {
    var ret = ""
    var i;
    var k = 0; // b64 state, 0-3
    var slop;
    for (i = 0; i < s.length; ++i) {
        if (s.charAt(i) == b64padchar) break;
        v = b64map.indexOf(s.charAt(i));
        if (v < 0) continue;
        if (k == 0) {
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 1;
        }
        else if (k == 1) {
            ret += int2char((slop << 2) | (v >> 4));
            slop = v & 0xf;
            k = 2;
        }
        else if (k == 2) {
            ret += int2char(slop);
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 3;
        }
        else {
            ret += int2char((slop << 2) | (v >> 4));
            ret += int2char(v & 0xf);
            k = 0;
        }
    }
    if (k == 1)
        ret += int2char(slop << 2);
    return ret;
}

// convert a base64 string to a byte/number array
function b64toBA(s) {
    //piggyback on b64tohex for now, optimize later
    var h = b64tohex(s);
    var i;
    var a = new Array();
    for (i = 0; 2 * i < h.length; ++i) {
        a[i] = parseInt(h.substring(2 * i, 2 * i + 2), 16);
    }
    return a;
}

var key1 = "";
var key2 = "";
var key3 = "";
var array = ["1", "2", "3", "4", "5", "6", "7", "8"];
array.sort(function () {
    return Math.random() > 0.5 ? -1 : 1;
});
key1 = array[0] + array[1] + array[2] + array[3] + array[4] + array[5] + array[6] + array[7];
key2 = array[1] + array[2] + array[3] + array[4] + array[5] + array[6] + array[7] + array[0];
key3 = array[2] + array[3] + array[4] + array[5] + array[6] + array[7] + array[0] + array[1];
function enString(data) {
    var enchex = strEnc(data, key1, key2, key3);
    return enchex;
}
function deString(data) {
    var dechex = strDec(data, key1, key2, key3);
    return dechex;
}

/**
 * DES加密/解密
 * @Copyright Copyright (c) 2006
 * @author Guapo
 * @see DESCore
 */

/*
 * encrypt the string to string made up of hex
 * return the encrypted string
 */
function strEnc(data, firstKey, secondKey, thirdKey) {

    var leng = data.length;
    var encData = "";
    var firstKeyBt, secondKeyBt, thirdKeyBt, firstLength, secondLength, thirdLength;
    if (firstKey != null && firstKey != "") {
        firstKeyBt = getKeyBytes(firstKey);
        firstLength = firstKeyBt.length;
    }
    if (secondKey != null && secondKey != "") {
        secondKeyBt = getKeyBytes(secondKey);
        secondLength = secondKeyBt.length;
    }
    if (thirdKey != null && thirdKey != "") {
        thirdKeyBt = getKeyBytes(thirdKey);
        thirdLength = thirdKeyBt.length;
    }

    if (leng > 0) {
        if (leng < 4) {
            var bt = strToBt(data);
            var encByte;
            if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
                var tempBt;
                var x, y, z;
                tempBt = bt;
                for (x = 0; x < firstLength; x++) {
                    tempBt = enc(tempBt, firstKeyBt[x]);
                }
                for (y = 0; y < secondLength; y++) {
                    tempBt = enc(tempBt, secondKeyBt[y]);
                }
                for (z = 0; z < thirdLength; z++) {
                    tempBt = enc(tempBt, thirdKeyBt[z]);
                }
                encByte = tempBt;
            } else {
                if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
                    var tempBt;
                    var x, y;
                    tempBt = bt;
                    for (x = 0; x < firstLength; x++) {
                        tempBt = enc(tempBt, firstKeyBt[x]);
                    }
                    for (y = 0; y < secondLength; y++) {
                        tempBt = enc(tempBt, secondKeyBt[y]);
                    }
                    encByte = tempBt;
                } else {
                    if (firstKey != null && firstKey != "") {
                        var tempBt;
                        var x = 0;
                        tempBt = bt;
                        for (x = 0; x < firstLength; x++) {
                            tempBt = enc(tempBt, firstKeyBt[x]);
                        }
                        encByte = tempBt;
                    }
                }
            }
            encData = bt64ToHex(encByte);
        } else {
            var iterator = parseInt(leng / 4);
            var remainder = leng % 4;
            var i = 0;
            for (i = 0; i < iterator; i++) {
                var tempData = data.substring(i * 4 + 0, i * 4 + 4);
                var tempByte = strToBt(tempData);
                var encByte;
                if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
                    var tempBt;
                    var x, y, z;
                    tempBt = tempByte;
                    for (x = 0; x < firstLength; x++) {
                        tempBt = enc(tempBt, firstKeyBt[x]);
                    }
                    for (y = 0; y < secondLength; y++) {
                        tempBt = enc(tempBt, secondKeyBt[y]);
                    }
                    for (z = 0; z < thirdLength; z++) {
                        tempBt = enc(tempBt, thirdKeyBt[z]);
                    }
                    encByte = tempBt;
                } else {
                    if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
                        var tempBt;
                        var x, y;
                        tempBt = tempByte;
                        for (x = 0; x < firstLength; x++) {
                            tempBt = enc(tempBt, firstKeyBt[x]);
                        }
                        for (y = 0; y < secondLength; y++) {
                            tempBt = enc(tempBt, secondKeyBt[y]);
                        }
                        encByte = tempBt;
                    } else {
                        if (firstKey != null && firstKey != "") {
                            var tempBt;
                            var x;
                            tempBt = tempByte;
                            for (x = 0; x < firstLength; x++) {
                                tempBt = enc(tempBt, firstKeyBt[x]);
                            }
                            encByte = tempBt;
                        }
                    }
                }
                encData += bt64ToHex(encByte);
            }
            if (remainder > 0) {
                var remainderData = data.substring(iterator * 4 + 0, leng);
                var tempByte = strToBt(remainderData);
                var encByte;
                if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
                    var tempBt;
                    var x, y, z;
                    tempBt = tempByte;
                    for (x = 0; x < firstLength; x++) {
                        tempBt = enc(tempBt, firstKeyBt[x]);
                    }
                    for (y = 0; y < secondLength; y++) {
                        tempBt = enc(tempBt, secondKeyBt[y]);
                    }
                    for (z = 0; z < thirdLength; z++) {
                        tempBt = enc(tempBt, thirdKeyBt[z]);
                    }
                    encByte = tempBt;
                } else {
                    if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
                        var tempBt;
                        var x, y;
                        tempBt = tempByte;
                        for (x = 0; x < firstLength; x++) {
                            tempBt = enc(tempBt, firstKeyBt[x]);
                        }
                        for (y = 0; y < secondLength; y++) {
                            tempBt = enc(tempBt, secondKeyBt[y]);
                        }
                        encByte = tempBt;
                    } else {
                        if (firstKey != null && firstKey != "") {
                            var tempBt;
                            var x;
                            tempBt = tempByte;
                            for (x = 0; x < firstLength; x++) {
                                tempBt = enc(tempBt, firstKeyBt[x]);
                            }
                            encByte = tempBt;
                        }
                    }
                }
                encData += bt64ToHex(encByte);
            }
        }
    }
    return encData;
}

/*
 * decrypt the encrypted string to the original string
 *
 * return  the original string
 */
function strDec(data, firstKey, secondKey, thirdKey) {
    var leng = data.length;
    var decStr = "";
    var firstKeyBt, secondKeyBt, thirdKeyBt, firstLength, secondLength, thirdLength;
    if (firstKey != null && firstKey != "") {
        firstKeyBt = getKeyBytes(firstKey);
        firstLength = firstKeyBt.length;
    }
    if (secondKey != null && secondKey != "") {
        secondKeyBt = getKeyBytes(secondKey);
        secondLength = secondKeyBt.length;
    }
    if (thirdKey != null && thirdKey != "") {
        thirdKeyBt = getKeyBytes(thirdKey);
        thirdLength = thirdKeyBt.length;
    }

    var iterator = parseInt(leng / 16);
    var i = 0;
    for (i = 0; i < iterator; i++) {
        var tempData = data.substring(i * 16 + 0, i * 16 + 16);
        var strByte = hexToBt64(tempData);
        var intByte = new Array(64);
        var j = 0;
        for (j = 0; j < 64; j++) {
            intByte[j] = parseInt(strByte.substring(j, j + 1));
        }
        var decByte;
        if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
            var tempBt;
            var x, y, z;
            tempBt = intByte;
            for (x = thirdLength - 1; x >= 0; x--) {
                tempBt = dec(tempBt, thirdKeyBt[x]);
            }
            for (y = secondLength - 1; y >= 0; y--) {
                tempBt = dec(tempBt, secondKeyBt[y]);
            }
            for (z = firstLength - 1; z >= 0; z--) {
                tempBt = dec(tempBt, firstKeyBt[z]);
            }
            decByte = tempBt;
        } else {
            if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
                var tempBt;
                var x, y, z;
                tempBt = intByte;
                for (x = secondLength - 1; x >= 0; x--) {
                    tempBt = dec(tempBt, secondKeyBt[x]);
                }
                for (y = firstLength - 1; y >= 0; y--) {
                    tempBt = dec(tempBt, firstKeyBt[y]);
                }
                decByte = tempBt;
            } else {
                if (firstKey != null && firstKey != "") {
                    var tempBt;
                    var x, y, z;
                    tempBt = intByte;
                    for (x = firstLength - 1; x >= 0; x--) {
                        tempBt = dec(tempBt, firstKeyBt[x]);
                    }
                    decByte = tempBt;
                }
            }
        }
        decStr += byteToString(decByte);
    }
    return decStr;
}
/*
 * chang the string into the bit array
 *
 * return bit array(it's length % 64 = 0)
 */
function getKeyBytes(key) {
    var keyBytes = new Array();
    var leng = key.length;
    var iterator = parseInt(leng / 4);
    var remainder = leng % 4;
    var i = 0;
    for (i = 0; i < iterator; i++) {
        keyBytes[i] = strToBt(key.substring(i * 4 + 0, i * 4 + 4));
    }
    if (remainder > 0) {
        keyBytes[i] = strToBt(key.substring(i * 4 + 0, leng));
    }
    return keyBytes;
}

/*
 * chang the string(it's length <= 4) into the bit array
 *
 * return bit array(it's length = 64)
 */
function strToBt(str) {
    var leng = str.length;
    var bt = new Array(64);
    if (leng < 4) {
        var i = 0, j = 0, p = 0, q = 0;
        for (i = 0; i < leng; i++) {
            var k = str.charCodeAt(i);
            for (j = 0; j < 16; j++) {
                var pow = 1, m = 0;
                for (m = 15; m > j; m--) {
                    pow *= 2;
                }
                bt[16 * i + j] = parseInt(k / pow) % 2;
            }
        }
        for (p = leng; p < 4; p++) {
            var k = 0;
            for (q = 0; q < 16; q++) {
                var pow = 1, m = 0;
                for (m = 15; m > q; m--) {
                    pow *= 2;
                }
                bt[16 * p + q] = parseInt(k / pow) % 2;
            }
        }
    } else {
        for (i = 0; i < 4; i++) {
            var k = str.charCodeAt(i);
            for (j = 0; j < 16; j++) {
                var pow = 1;
                for (m = 15; m > j; m--) {
                    pow *= 2;
                }
                bt[16 * i + j] = parseInt(k / pow) % 2;
            }
        }
    }
    return bt;
}

/*
 * chang the bit(it's length = 4) into the hex
 *
 * return hex
 */
function bt4ToHex(binary) {
    var hex;
    switch (binary) {
        case "0000" :
            hex = "0";
            break;
        case "0001" :
            hex = "1";
            break;
        case "0010" :
            hex = "2";
            break;
        case "0011" :
            hex = "3";
            break;
        case "0100" :
            hex = "4";
            break;
        case "0101" :
            hex = "5";
            break;
        case "0110" :
            hex = "6";
            break;
        case "0111" :
            hex = "7";
            break;
        case "1000" :
            hex = "8";
            break;
        case "1001" :
            hex = "9";
            break;
        case "1010" :
            hex = "A";
            break;
        case "1011" :
            hex = "B";
            break;
        case "1100" :
            hex = "C";
            break;
        case "1101" :
            hex = "D";
            break;
        case "1110" :
            hex = "E";
            break;
        case "1111" :
            hex = "F";
            break;
    }
    return hex;
}

/*
 * chang the hex into the bit(it's length = 4)
 *
 * return the bit(it's length = 4)
 */
function hexToBt4(hex) {
    var binary;
    switch (hex) {
        case "0" :
            binary = "0000";
            break;
        case "1" :
            binary = "0001";
            break;
        case "2" :
            binary = "0010";
            break;
        case "3" :
            binary = "0011";
            break;
        case "4" :
            binary = "0100";
            break;
        case "5" :
            binary = "0101";
            break;
        case "6" :
            binary = "0110";
            break;
        case "7" :
            binary = "0111";
            break;
        case "8" :
            binary = "1000";
            break;
        case "9" :
            binary = "1001";
            break;
        case "A" :
            binary = "1010";
            break;
        case "B" :
            binary = "1011";
            break;
        case "C" :
            binary = "1100";
            break;
        case "D" :
            binary = "1101";
            break;
        case "E" :
            binary = "1110";
            break;
        case "F" :
            binary = "1111";
            break;
    }
    return binary;
}

/*
 * chang the bit(it's length = 64) into the string
 *
 * return string
 */
function byteToString(byteData) {
    var str = "";
    for (i = 0; i < 4; i++) {
        var count = 0;
        for (j = 0; j < 16; j++) {
            var pow = 1;
            for (m = 15; m > j; m--) {
                pow *= 2;
            }
            count += byteData[16 * i + j] * pow;
        }
        if (count != 0) {
            str += String.fromCharCode(count);
        }
    }
    return str;
}

function bt64ToHex(byteData) {
    var hex = "";
    for (i = 0; i < 16; i++) {
        var bt = "";
        for (j = 0; j < 4; j++) {
            bt += byteData[i * 4 + j];
        }
        hex += bt4ToHex(bt);
    }
    return hex;
}

function hexToBt64(hex) {
    var binary = "";
    for (i = 0; i < 16; i++) {
        binary += hexToBt4(hex.substring(i, i + 1));
    }
    return binary;
}

/*
 * the 64 bit des core arithmetic
 */

function enc(dataByte, keyByte) {
    var keys = generateKeys(keyByte);
    var ipByte = initPermute(dataByte);
    var ipLeft = new Array(32);
    var ipRight = new Array(32);
    var tempLeft = new Array(32);
    var i = 0, j = 0, k = 0, m = 0, n = 0;
    for (k = 0; k < 32; k++) {
        ipLeft[k] = ipByte[k];
        ipRight[k] = ipByte[32 + k];
    }
    for (i = 0; i < 16; i++) {
        for (j = 0; j < 32; j++) {
            tempLeft[j] = ipLeft[j];
            ipLeft[j] = ipRight[j];
        }
        var key = new Array(48);
        for (m = 0; m < 48; m++) {
            key[m] = keys[i][m];
        }
        var tempRight = xor(pPermute(sBoxPermute(xor(expandPermute(ipRight), key))), tempLeft);
        for (n = 0; n < 32; n++) {
            ipRight[n] = tempRight[n];
        }

    }


    var finalData = new Array(64);
    for (i = 0; i < 32; i++) {
        finalData[i] = ipRight[i];
        finalData[32 + i] = ipLeft[i];
    }
    return finallyPermute(finalData);
}

function dec(dataByte, keyByte) {
    var keys = generateKeys(keyByte);
    var ipByte = initPermute(dataByte);
    var ipLeft = new Array(32);
    var ipRight = new Array(32);
    var tempLeft = new Array(32);
    var i = 0, j = 0, k = 0, m = 0, n = 0;
    for (k = 0; k < 32; k++) {
        ipLeft[k] = ipByte[k];
        ipRight[k] = ipByte[32 + k];
    }
    for (i = 15; i >= 0; i--) {
        for (j = 0; j < 32; j++) {
            tempLeft[j] = ipLeft[j];
            ipLeft[j] = ipRight[j];
        }
        var key = new Array(48);
        for (m = 0; m < 48; m++) {
            key[m] = keys[i][m];
        }

        var tempRight = xor(pPermute(sBoxPermute(xor(expandPermute(ipRight), key))), tempLeft);
        for (n = 0; n < 32; n++) {
            ipRight[n] = tempRight[n];
        }
    }


    var finalData = new Array(64);
    for (i = 0; i < 32; i++) {
        finalData[i] = ipRight[i];
        finalData[32 + i] = ipLeft[i];
    }
    return finallyPermute(finalData);
}

function initPermute(originalData) {
    var ipByte = new Array(64);
    for (i = 0, m = 1, n = 0; i < 4; i++, m += 2, n += 2) {
        for (j = 7, k = 0; j >= 0; j--, k++) {
            ipByte[i * 8 + k] = originalData[j * 8 + m];
            ipByte[i * 8 + k + 32] = originalData[j * 8 + n];
        }
    }
    return ipByte;
}

function expandPermute(rightData) {
    var epByte = new Array(48);
    for (i = 0; i < 8; i++) {
        if (i == 0) {
            epByte[i * 6 + 0] = rightData[31];
        } else {
            epByte[i * 6 + 0] = rightData[i * 4 - 1];
        }
        epByte[i * 6 + 1] = rightData[i * 4 + 0];
        epByte[i * 6 + 2] = rightData[i * 4 + 1];
        epByte[i * 6 + 3] = rightData[i * 4 + 2];
        epByte[i * 6 + 4] = rightData[i * 4 + 3];
        if (i == 7) {
            epByte[i * 6 + 5] = rightData[0];
        } else {
            epByte[i * 6 + 5] = rightData[i * 4 + 4];
        }
    }
    return epByte;
}

function xor(byteOne, byteTwo) {
    var xorByte = new Array(byteOne.length);
    for (i = 0; i < byteOne.length; i++) {
        xorByte[i] = byteOne[i] ^ byteTwo[i];
    }
    return xorByte;
}

function sBoxPermute(expandByte) {

    var sBoxByte = new Array(32);
    var binary = "";
    var s1 = [
        [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
        [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
        [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
        [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]];

    /* Table - s2 */
    var s2 = [
        [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
        [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
        [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
        [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]];

    /* Table - s3 */
    var s3 = [
        [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
        [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
        [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
        [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]];
    /* Table - s4 */
    var s4 = [
        [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
        [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
        [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
        [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]];

    /* Table - s5 */
    var s5 = [
        [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
        [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
        [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
        [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]];

    /* Table - s6 */
    var s6 = [
        [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
        [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
        [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
        [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]];

    /* Table - s7 */
    var s7 = [
        [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
        [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
        [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
        [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]];

    /* Table - s8 */
    var s8 = [
        [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
        [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
        [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
        [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]];

    for (m = 0; m < 8; m++) {
        var i = 0, j = 0;
        i = expandByte[m * 6 + 0] * 2 + expandByte[m * 6 + 5];
        j = expandByte[m * 6 + 1] * 2 * 2 * 2
        + expandByte[m * 6 + 2] * 2 * 2
        + expandByte[m * 6 + 3] * 2
        + expandByte[m * 6 + 4];
        switch (m) {
            case 0 :
                binary = getBoxBinary(s1[i][j]);
                break;
            case 1 :
                binary = getBoxBinary(s2[i][j]);
                break;
            case 2 :
                binary = getBoxBinary(s3[i][j]);
                break;
            case 3 :
                binary = getBoxBinary(s4[i][j]);
                break;
            case 4 :
                binary = getBoxBinary(s5[i][j]);
                break;
            case 5 :
                binary = getBoxBinary(s6[i][j]);
                break;
            case 6 :
                binary = getBoxBinary(s7[i][j]);
                break;
            case 7 :
                binary = getBoxBinary(s8[i][j]);
                break;
        }
        sBoxByte[m * 4 + 0] = parseInt(binary.substring(0, 1));
        sBoxByte[m * 4 + 1] = parseInt(binary.substring(1, 2));
        sBoxByte[m * 4 + 2] = parseInt(binary.substring(2, 3));
        sBoxByte[m * 4 + 3] = parseInt(binary.substring(3, 4));
    }
    return sBoxByte;
}

function pPermute(sBoxByte) {
    var pBoxPermute = new Array(32);
    pBoxPermute[0] = sBoxByte[15];
    pBoxPermute[1] = sBoxByte[6];
    pBoxPermute[2] = sBoxByte[19];
    pBoxPermute[3] = sBoxByte[20];
    pBoxPermute[4] = sBoxByte[28];
    pBoxPermute[5] = sBoxByte[11];
    pBoxPermute[6] = sBoxByte[27];
    pBoxPermute[7] = sBoxByte[16];
    pBoxPermute[8] = sBoxByte[0];
    pBoxPermute[9] = sBoxByte[14];
    pBoxPermute[10] = sBoxByte[22];
    pBoxPermute[11] = sBoxByte[25];
    pBoxPermute[12] = sBoxByte[4];
    pBoxPermute[13] = sBoxByte[17];
    pBoxPermute[14] = sBoxByte[30];
    pBoxPermute[15] = sBoxByte[9];
    pBoxPermute[16] = sBoxByte[1];
    pBoxPermute[17] = sBoxByte[7];
    pBoxPermute[18] = sBoxByte[23];
    pBoxPermute[19] = sBoxByte[13];
    pBoxPermute[20] = sBoxByte[31];
    pBoxPermute[21] = sBoxByte[26];
    pBoxPermute[22] = sBoxByte[2];
    pBoxPermute[23] = sBoxByte[8];
    pBoxPermute[24] = sBoxByte[18];
    pBoxPermute[25] = sBoxByte[12];
    pBoxPermute[26] = sBoxByte[29];
    pBoxPermute[27] = sBoxByte[5];
    pBoxPermute[28] = sBoxByte[21];
    pBoxPermute[29] = sBoxByte[10];
    pBoxPermute[30] = sBoxByte[3];
    pBoxPermute[31] = sBoxByte[24];
    return pBoxPermute;
}

function finallyPermute(endByte) {
    var fpByte = new Array(64);
    fpByte[0] = endByte[39];
    fpByte[1] = endByte[7];
    fpByte[2] = endByte[47];
    fpByte[3] = endByte[15];
    fpByte[4] = endByte[55];
    fpByte[5] = endByte[23];
    fpByte[6] = endByte[63];
    fpByte[7] = endByte[31];
    fpByte[8] = endByte[38];
    fpByte[9] = endByte[6];
    fpByte[10] = endByte[46];
    fpByte[11] = endByte[14];
    fpByte[12] = endByte[54];
    fpByte[13] = endByte[22];
    fpByte[14] = endByte[62];
    fpByte[15] = endByte[30];
    fpByte[16] = endByte[37];
    fpByte[17] = endByte[5];
    fpByte[18] = endByte[45];
    fpByte[19] = endByte[13];
    fpByte[20] = endByte[53];
    fpByte[21] = endByte[21];
    fpByte[22] = endByte[61];
    fpByte[23] = endByte[29];
    fpByte[24] = endByte[36];
    fpByte[25] = endByte[4];
    fpByte[26] = endByte[44];
    fpByte[27] = endByte[12];
    fpByte[28] = endByte[52];
    fpByte[29] = endByte[20];
    fpByte[30] = endByte[60];
    fpByte[31] = endByte[28];
    fpByte[32] = endByte[35];
    fpByte[33] = endByte[3];
    fpByte[34] = endByte[43];
    fpByte[35] = endByte[11];
    fpByte[36] = endByte[51];
    fpByte[37] = endByte[19];
    fpByte[38] = endByte[59];
    fpByte[39] = endByte[27];
    fpByte[40] = endByte[34];
    fpByte[41] = endByte[2];
    fpByte[42] = endByte[42];
    fpByte[43] = endByte[10];
    fpByte[44] = endByte[50];
    fpByte[45] = endByte[18];
    fpByte[46] = endByte[58];
    fpByte[47] = endByte[26];
    fpByte[48] = endByte[33];
    fpByte[49] = endByte[1];
    fpByte[50] = endByte[41];
    fpByte[51] = endByte[9];
    fpByte[52] = endByte[49];
    fpByte[53] = endByte[17];
    fpByte[54] = endByte[57];
    fpByte[55] = endByte[25];
    fpByte[56] = endByte[32];
    fpByte[57] = endByte[0];
    fpByte[58] = endByte[40];
    fpByte[59] = endByte[8];
    fpByte[60] = endByte[48];
    fpByte[61] = endByte[16];
    fpByte[62] = endByte[56];
    fpByte[63] = endByte[24];
    return fpByte;
}

function getBoxBinary(i) {
    var binary = "";
    switch (i) {
        case 0 :
            binary = "0000";
            break;
        case 1 :
            binary = "0001";
            break;
        case 2 :
            binary = "0010";
            break;
        case 3 :
            binary = "0011";
            break;
        case 4 :
            binary = "0100";
            break;
        case 5 :
            binary = "0101";
            break;
        case 6 :
            binary = "0110";
            break;
        case 7 :
            binary = "0111";
            break;
        case 8 :
            binary = "1000";
            break;
        case 9 :
            binary = "1001";
            break;
        case 10 :
            binary = "1010";
            break;
        case 11 :
            binary = "1011";
            break;
        case 12 :
            binary = "1100";
            break;
        case 13 :
            binary = "1101";
            break;
        case 14 :
            binary = "1110";
            break;
        case 15 :
            binary = "1111";
            break;
    }
    return binary;
}
/*
 * generate 16 keys for xor
 *
 */
function generateKeys(keyByte) {
    var key = new Array(56);
    var keys = new Array();

    keys[0] = new Array();
    keys[1] = new Array();
    keys[2] = new Array();
    keys[3] = new Array();
    keys[4] = new Array();
    keys[5] = new Array();
    keys[6] = new Array();
    keys[7] = new Array();
    keys[8] = new Array();
    keys[9] = new Array();
    keys[10] = new Array();
    keys[11] = new Array();
    keys[12] = new Array();
    keys[13] = new Array();
    keys[14] = new Array();
    keys[15] = new Array();
    var loop = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

    for (i = 0; i < 7; i++) {
        for (j = 0, k = 7; j < 8; j++, k--) {
            key[i * 8 + j] = keyByte[8 * k + i];
        }
    }

    var i = 0;
    for (i = 0; i < 16; i++) {
        var tempLeft = 0;
        var tempRight = 0;
        for (j = 0; j < loop[i]; j++) {
            tempLeft = key[0];
            tempRight = key[28];
            for (k = 0; k < 27; k++) {
                key[k] = key[k + 1];
                key[28 + k] = key[29 + k];
            }
            key[27] = tempLeft;
            key[55] = tempRight;
        }
        var tempKey = new Array(48);
        tempKey[0] = key[13];
        tempKey[1] = key[16];
        tempKey[2] = key[10];
        tempKey[3] = key[23];
        tempKey[4] = key[0];
        tempKey[5] = key[4];
        tempKey[6] = key[2];
        tempKey[7] = key[27];
        tempKey[8] = key[14];
        tempKey[9] = key[5];
        tempKey[10] = key[20];
        tempKey[11] = key[9];
        tempKey[12] = key[22];
        tempKey[13] = key[18];
        tempKey[14] = key[11];
        tempKey[15] = key[3];
        tempKey[16] = key[25];
        tempKey[17] = key[7];
        tempKey[18] = key[15];
        tempKey[19] = key[6];
        tempKey[20] = key[26];
        tempKey[21] = key[19];
        tempKey[22] = key[12];
        tempKey[23] = key[1];
        tempKey[24] = key[40];
        tempKey[25] = key[51];
        tempKey[26] = key[30];
        tempKey[27] = key[36];
        tempKey[28] = key[46];
        tempKey[29] = key[54];
        tempKey[30] = key[29];
        tempKey[31] = key[39];
        tempKey[32] = key[50];
        tempKey[33] = key[44];
        tempKey[34] = key[32];
        tempKey[35] = key[47];
        tempKey[36] = key[43];
        tempKey[37] = key[48];
        tempKey[38] = key[38];
        tempKey[39] = key[55];
        tempKey[40] = key[33];
        tempKey[41] = key[52];
        tempKey[42] = key[45];
        tempKey[43] = key[41];
        tempKey[44] = key[49];
        tempKey[45] = key[35];
        tempKey[46] = key[28];
        tempKey[47] = key[31];
        switch (i) {
            case 0:
                for (m = 0; m < 48; m++) {
                    keys[0][m] = tempKey[m];
                }
                break;
            case 1:
                for (m = 0; m < 48; m++) {
                    keys[1][m] = tempKey[m];
                }
                break;
            case 2:
                for (m = 0; m < 48; m++) {
                    keys[2][m] = tempKey[m];
                }
                break;
            case 3:
                for (m = 0; m < 48; m++) {
                    keys[3][m] = tempKey[m];
                }
                break;
            case 4:
                for (m = 0; m < 48; m++) {
                    keys[4][m] = tempKey[m];
                }
                break;
            case 5:
                for (m = 0; m < 48; m++) {
                    keys[5][m] = tempKey[m];
                }
                break;
            case 6:
                for (m = 0; m < 48; m++) {
                    keys[6][m] = tempKey[m];
                }
                break;
            case 7:
                for (m = 0; m < 48; m++) {
                    keys[7][m] = tempKey[m];
                }
                break;
            case 8:
                for (m = 0; m < 48; m++) {
                    keys[8][m] = tempKey[m];
                }
                break;
            case 9:
                for (m = 0; m < 48; m++) {
                    keys[9][m] = tempKey[m];
                }
                break;
            case 10:
                for (m = 0; m < 48; m++) {
                    keys[10][m] = tempKey[m];
                }
                break;
            case 11:
                for (m = 0; m < 48; m++) {
                    keys[11][m] = tempKey[m];
                }
                break;
            case 12:
                for (m = 0; m < 48; m++) {
                    keys[12][m] = tempKey[m];
                }
                break;
            case 13:
                for (m = 0; m < 48; m++) {
                    keys[13][m] = tempKey[m];
                }
                break;
            case 14:
                for (m = 0; m < 48; m++) {
                    keys[14][m] = tempKey[m];
                }
                break;
            case 15:
                for (m = 0; m < 48; m++) {
                    keys[15][m] = tempKey[m];
                }
                break;
        }
    }
    return keys;
}