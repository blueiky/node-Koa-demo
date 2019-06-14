
module.exports = function (router) {

    router.get('/deluser/:id', async ctx => {
        let { id } = ctx.params;
        let arrId = id.split(',');
        let datamsg;

        async function remsg(sta, message) {
            datamsg = { state: sta, msg: message }
            ctx.body = JSON.stringify(datamsg)
        }

        for (let i = 0, arrIdLen = arrId.length; i < arrIdLen; i++) {
            let id = arrId[i]
            let rows = await ctx.db.query(`SELECT * FROM admins WHERE ID=?`, [id]);

            for (let item in rows) {
                if (rows[item].limit !== 1) {
                    await remsg(0, '你的管理权限不够，请联系超级管理员')
                } else {
                    if (ctx.session['adminID'] !== rows[item].ID) {
                        await ctx.db.query(`DELETE FROM admins WHERE ID=?`, [id]);
                        await remsg(1, '删除成功')
                    } else {
                        await remsg(0, '你不能删除你自己');
                    }
                }
            }
        }

    });


}