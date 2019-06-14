const passwordLib = require('../../libs/password');
const { post } = require('../../libs/body');
const { admin } = require('../../libs/regs');
const userToken = require('../../libs/jwt');

module.exports = function (router) {

    router.get('/login', async ctx => {
        await ctx.render('admin/login');
    });

    router.post('/login', post(), async ctx => {
        let { username, password, remlogin, autologin } = ctx.request.fields;
        username = username.toLowerCase();

        async function reterrmsg(userdata, isOK, msg, adminuser) {
            let msgData = { userdata: userdata, user: adminuser, islogin: isOK, error: msg }
            let data = JSON.stringify(msgData)
            ctx.body = data
        }

        if (!admin.username.test(username)) {
            await reterrmsg('false', '用户名格式不对，请输入3-32个数字、字符')
            // dataMsg = { error: '用户名格式不对，请输入3-32个数字、字符' };
        } else if (!admin.password.test(password)) {
            await reterrmsg('false', '密码格式不对，请输入4-32个字符')
            // dataMsg = { error: '密码格式不对，请输入4-32个字符' };
        } else {
            let rows = await ctx.db.query("SELECT * FROM admins WHERE username=?", [username]);

            if (rows.length == 0) {
                await reterrmsg('false', '该管理员不存在，请联系超级管理员')
            } else {

                if (rows[0].password == passwordLib(password)) {

                    if (autologin == 'on') {
                        // 自动登录
                        ctx.session.user = username;
                        ctx.session['adminID'] = rows[0].ID;
                        await reterrmsg('true')

                    } else if (remlogin == 'on') {
                        // 记住账户
                        let tk = userToken({ username, ID: rows[0].ID });
                        // console.log(tk)
                        await reterrmsg(tk, 'ok', '登录成功', username)

                    } else if (autologin == 'on' && remlogin == 'on') {
                        let tk = userToken({ username, ID: rows[0].ID });
                        console.log(username)
                        // console.log(tk)
                        await reterrmsg(tk, 'ok', '登录成功', username)
                        
                    } else { }



                } else {
                    await reterrmsg('false', '你的用户名或者密码不对，请重新输入')
                }

            }
        }

    });





}