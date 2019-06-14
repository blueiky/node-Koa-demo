const body = require('koa-better-body');
const convert = require('koa-convert');
const config = require('../config');

module.exports = {
    // 处理post
    post(){
        return convert(body({
            multipart: false,
            buffer: false
        }));
    },

    // 处理上传文件
    upload(options){
        options = options || {};
        // 文件上传默认路径
        options.uploadDir = options.uploadDir || config.upload_dir;
        // 文件上传的大小限制 默认为 20 Mb
        options.maxFileSize = options.maxFileSize || 20 * 1024 * 1024;

        return [
            async (ctx, next) => {
                // 捕获异常
                try{
                    await next();
                }catch(e){
                    // 文件上传过大
                    if(e.message.startsWith('maxFileSize exceeded')){
                        if(options.sizeExceed){
                            await options.sizeExceed(ctx);
                        }else{
                            ctx.body = '文件过大'
                        }
                    }else{
                        if(options.error){
                            await options.error(ctx, e);
                        }else{
                            throw e;
                        }
                    }
                }
            },
            convert(body({
                uploadDir: options.uploadDir,
                maxFileSize: options.maxFileSize
            })),
        ];
    }
};