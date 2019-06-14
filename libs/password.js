const md5 = require('./md5');
const { md5_key } = require('../config');

// 二次签名密码
module.exports = function (data){
    return md5(md5(data) + md5_key );
}