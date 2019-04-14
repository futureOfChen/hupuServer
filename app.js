const express = require('express');
const app = express();
const http = require('http');
const logger = require('morgan');
const path = require('path');
const ip = require('ip');
const host = ip.address();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });


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
    port: 8000
}, () => {
    console.log(`XVSH server is running on port http:${host}:8000 ,please take a seat right here`)
})