const jwt = require('jsonwebtoken');

const tokenKey = 'hlznishiwodeshijie';

module.exports = function (userinfo) {

    const token = jwt.sign({
        user: userinfo.user,
        id: userinfo.ID
    }, tokenKey, { expiresIn: '1h' });

    return token;

}