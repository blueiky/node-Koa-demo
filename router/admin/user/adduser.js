const { post } = require('../../../libs/body');
const passwordMd = require('../../../libs/password');

module.exports = function (router) {

    router.get('/user_add', async ctx => {
        await ctx.render('admin/user_add');
    });
    router.post('/user_add', post(), async ctx => {
        let userdata = ctx.request.fields;

        let username = userdata.username;
        let password = userdata.password;
        let limit = userdata.limit;
        let rows = await ctx.db.query(`SELECT * FROM admins WHERE ID=?`, [ctx.session['adminID']])
        async function remsg(sta, message) {
            datamsg = { state: sta, msg: message }
            ctx.body = JSON.stringify(datamsg)
        }

        if (rows[0].limit !== 1) {
            await remsg(0, '你的权限不够')
        } else {
            let rows = await ctx.db.query("SELECT * FROM admins WHERE username=?", [username]);

            if (rows.length > 0) {
                await remsg(0, '该用户名已存在')
            } else {
                await ctx.db.query("INSERT INTO admins(username,password,`limit`) VALUES (?,?,?)", [username, passwordMd(password), limit]);
                await remsg(1, '管理员添加成功')
            }
        }

    });


}