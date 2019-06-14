const { post } = require('../../../libs/body');

module.exports = function (router) {

    router.get('/user_edit/:id', async ctx => {
        let { id } = ctx.params;
        id = parseInt(id);
        let data;
        let rows = await ctx.db.query(`SELECT * FROM admins WHERE ID=?`, [ctx.session['adminID']]);

        if (rows[0].limit === 1) {
            data = await ctx.db.query(`SELECT * FROM admins WHERE ID=?`, [id]);
            await ctx.render('admin/user_edit', { data });
        } else {
            ctx.body = '你的权限不够'
        }


    });

    router.post('/user_edit', post(), async ctx => {
        let data = ctx.request.fields;
        let username = data.username
        let limit = data.limit;
        // limit = parseInt(limit);
        let rows = await ctx.db.query(`SELECT * FROM admins WHERE ID=?`, [ctx.session['adminID']]);
        let upuser = await ctx.db.query(`SELECT * FROM admins WHERE username=?`, [username]);
        let upuserID = upuser[0].ID;

        async function remsg(sta, message) {
            datamsg = { state: sta, msg: message }
            ctx.body = JSON.stringify(datamsg)
        }

        if (rows[0].limit === 1) {
            await ctx.db.query("UPDATE admins SET username=?,`limit`=? WHERE ID=?", [username, limit, upuserID]);
            await remsg(1, '修改成功')
        } else {
            await remsg(0, '你的权限不够')
        }

    });

}