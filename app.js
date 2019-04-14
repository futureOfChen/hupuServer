const express = require('express');
const app = express();
const http = require('http');
const logger = require('morgan');
const path = require('path');
const ip = require('ip');
const host = ip.address();

app.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:8080')
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS")
    res.header("Access-Control-Max-Age",86400)
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER,Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With")
    //有时候为了防止网页被别人的网站iframe，我们可以通过在服务端设置HTTP头部中的X-Frame-Options信息。
    res.header("X-Frame-Options", "SAMEORIGIN")
    //cookie
    res.header("Access-Control-Allow-Credentials",true)
    res.header("withCredentials",true)
    var file = req.url.split('?')[0].split('/').join('_').replace('_','')
    file = '../mock/'+file+'.json';
    var ans = require(file);
    return res.jsonp(ans)
  })


/** 虎扑api接口 */
const hupuLoginRouter = require('./routerHupu/user/index');
const hupuGamesDataRouter = require('./routerHupu/gamesData/index');
const newsRouter = require('./routerHupu/news/index');
const groupRouter = require('./routerHupu/group/index');
// const hupuGetCodeRouter = require('./routerHupu/getCode/index');


/** 路由模块导入 */
const addressRouter = require('./router/adress/index');
const collectionCodeRouter = require('./router/collectionCode/index');
const mchntRouter = require('./router/mchnt/index');
const scanRouter = require('./router/scan/index');
const tranRouter = require('./router/tran');


/**
 * 日志中间件
 */
app.use(logger('dev'));

/**
 ************1.静态文件服务
 */ 
app.use(express.static(path.resolve(__dirname, 'xvsh')));

/**
 ************hupu_01.用户登录相关模块
 */
app.use('/user',hupuLoginRouter);
app.use('/gamesData',hupuGamesDataRouter);
app.use('/news',newsRouter);
app.use('/group',groupRouter);

/**
 ************2.收款码模块
 */ 
app.use('/collectionCode',collectionCodeRouter);

/**
 ************3. 查询状态模块
 */
app.use('/scan',scanRouter);

/**
 ***********4.地址模块 
 */
app.use('/address',addressRouter);

/**
 ***********5.店铺信息模块
 */
app.use('/mchnt',mchntRouter);
/**
 ***********6.交易信息模块
 */
app.use('/tran',tranRouter);

/**
 * Final，处理未被捕获的请求
 */
app.use((req, res) => {
    res.status(404);
    res.send('Sorry,found nothing')
})

http.createServer(app).listen({
    host: host,
    port: 3000
}, () => {
    console.log(`XVSH server is running on port http:${host}:3000 ,please take a seat right here`)
})