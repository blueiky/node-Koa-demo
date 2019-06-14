const session = require('koa-session');
const fs = require('promise-fs');
const config = require('../config');
const client = require('./redis');

module.exports = async server => {
    
    try {
        let buffer = await fs.readFile(config.key_path);
        server.keys = JSON.parse(buffer.toString());
    }catch(e){
        console.log('读取key文件失败，请重新生成');

        console.log(e);

        return;
    }

    let store = {
        async get(key, maxAge){
            let data = await client.getAsync(key);

            if(!data)return {};

            try{
                return JSON.parse(data);
            }catch(e){
                return {};
            }
        },
        async set(key, session, maxAge){
            await client.psetexAsync(key, maxAge, JSON.stringify(session));
        },
        async destroy(key){
            await client.delAsync(key);
        }
    };
    server.use(session({
        maxAge: config.maxAge,
        renew: true,
        store
    }, server));

}