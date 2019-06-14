const path = require('path');

module.exports = {

    // 服务端
    port: 8080,
    md5_key: 'SDfdfg5aO*&$O%ohlkuIYIUOR$LUI$HR(&*FHULI$HRGSDLKJFHSDILUY$*OOY$IUHILUFH*O$&TIGRgrdrgd大概多少风格士大夫敢死队风格让他如果士大夫敢死队发)',

    // 数据库
    db_host: 'localhost',
    db_port: 3306,
    db_user: 'root',
    db_pass: '123456',
    db_name: 'moviehome',

    // redis
    redis_host: 'localhost',
    redis_port: 6379,

    // 上传文件路径
    upload_dir: path.resolve(__dirname, 'upload'),

    // session 失效时间  一天
    maxAge: 86400 * 1000,

    // key
    key_count: 1024,
    key_len: 1024,
    key_path: path.resolve(__dirname, '.keys'),

    // static 静态资源
    static_path: path.resolve(__dirname, 'static'),

    //errors  异常
    errors_404: path.resolve(__dirname, 'errors/404.html'),
    errors_500: path.resolve(__dirname, 'errors/500.html'),

};