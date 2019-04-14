// const fs = require('fs');
// const Stream = require('stream');
// let nameList = require('./test_to_del.json');

// let itemToAdd = {
//     name:'huck_Zhang',
//     age:'28'
// }

// nameList.push(itemToAdd);

// fs.writeFile('./test_to_del.json',JSON.stringify(nameList),(err)=>{
//     if(err){
//         console.log('Some error occur')
//     }
//     console.log('文件写入完毕');
// })

// let rdSt = fs.createReadStream(Buffer.from(JSON.stringify(nameList)));
// console.log( Buffer.from(JSON.stringify(nameList)) );
// let buf =  Buffer.from(JSON.stringify(nameList));
// console.log(buf);
// console.log( Buffer.isBuffer(buf) )
// let bufStream = new Stream.PassThrough();
// bufStream.end(buf);

// let wtSt = fs.createWriteStream('./test_to_del.json');

// bufStream.pipe(wtSt);

// fs.createReadStream(buf)
// let rdSt = fs.createReadStream(buf);
// let wtSt = fs.createWriteStream(buf);
// wtSt.write();

// rdSt.close();
// let wtSt = fs.createWriteStream('./test_to_del.json');

// rdSt.pipe(wtSt);


// console.log(nameList);
// console.log( Object.prototype.toString.call(nameList) );
// console.log(nameList.length)
// console.log( JSON.parse(nameList) );

/**  path： 路徑 */
// const chalk = require('chalk');
// const path = require('path');

// console.log(process.env)

// console.log(chalk`{red.bold.bgBlue ${process.env}}`)

// console.log( path.join(__dirname,'../') );

// const ip = require('ip');

// console.log(ip);    

// console.log(__dirname)

// console.log(path.resolve(__dirname));
// console.log(path.join(__dirname));

// console.log( path.resolve('c/mine') )
// console.log( path.resolve('c','d','e') );

/**
    对于弱者来说，那所谓的自由，不过是被愚蠢，无知和人性中懒惰，贪图享乐的特性所支配的幻想而已。
    真正的自由，需要强大作为前提，这强大，来自于对于世界与人的理性认知，来自于自身内心的理性与坚韧，
    物质条件索取的节制与满足。
    当处于脆弱境地之时，应少谈自由。

 */
// const fs = require('fs');

//  console.log( process.cwd() );
//  let pathReal = fs.realpathSync(process.cwd());
//  console.log(pathReal)

// for( let key in process.env ){
//     console.log(key)
// }
// process.env.PUBLIC_URL = 'public_url'
// console.log( process.env.PUBLIC_URL )

// const ip = require('ip');
// console.log(ip.address());
const fs = require('fs');
const axios = require('axios');

const url = 'http://172.18.179.17/wlmweb-web/restlet/mchnt/getMchntAndAreaInf.sjson';

axios.get(url,{
    // params:{
    //     version: "2.0",
    //     source: "2"
    // }
}).then((resp)=>{
    // console.log('请求成功')
    console.log(resp.data)
    // fs.writeFile('./areaAndType.json',JSON.stringify(resp.data.params,null,'\t'),()=>{
    //     console.log('写入成功')
    // })
}).catch( (err)=>{
    console.log('请求失败');
    
} )