const Koa = require('koa');
const config = require('./config');
const opn = require('opn');
const network = require('./libs/network');
const { post, upload } = require('./libs/body');
const fs = require('promise-fs');
const ejs = require('koa-ejs');
const path = require('path');

let server = new Koa();

(async () => {

    // 连接MySQL数据库
    server.context.db = await require('./libs/mysql');
    // 连接 redis
    server.context.redis = require('./libs/redis');

    // 异常处理
    let error_404 = '';
    try{
        error_404 = await fs.readFile(config.errors_404);
        error_404 = error_404.toString();
    }catch(e){
        console.log('read 404 file error');
    }

    let error_500 = '';
    try{
        error_500 = await fs.readFile(config.errors_500);
        error_500 = error_500.toString();
    }catch(e){
        console.log('read 500 file error');
    };

    // 全局异常处理
    server.use(async (ctx, next) => {
        try {
            await next();

            if(!ctx.body){
                ctx.status = 404;
                ctx.body = error_404 || 'Not Found';
            }

        }catch(e){
            ctx.status = 500;
            ctx.body = error_500 || 'Internal Server Error';
            
            // 打印报错信息方便调试
            console.log(e);
        }
    });

    // session
    await require('./libs/session')(server);

    // router路由
    server.use(require('./router'));

    // ejs 文件
    ejs(server, {
        root: path.resolve(__dirname, 'template'),
        layout: false,
        viewExt: 'ejs',
        cache: false,
        debug: false
    });

    // 启动服务
    server.listen(config.port);

    network.forEach(ip => {

        if(config.port == 80){
            console.log(`server running at http://${ip}`);
        }else{
            console.log(`server running at http://${ip}:${config.port}`);
        }

    });

    opn(`http://localhost:${config.port}`);

})();