const { post } = require('../../libs/body');

module.exports = function (router) {

    router.get('/types', async ctx => {
        await ctx.render('admin/types');
    });
    router.post('/types', async ctx => {
        let data = await ctx.db.query(`SELECT * FROM types`);
        let rows = await ctx.db.query(`SELECT count(*) AS c FROM types`);
        let count = rows[0].c;
        let dataJson = {
            "status": 200,
            "message": "",
            "total": count,
            "rows": {
                "item": data
            }
        }
        ctx.body = JSON.stringify(dataJson)
    });

    router.get('/deltype/:id', async ctx => {
        let { id } = ctx.params;
        let arrId = id.split(',');
        let datamsg;

        async function remsg(sta, message) {
            datamsg = { state: sta, msg: message }
            ctx.body = JSON.stringify(datamsg)
        }

        for (let i = 0, arrIdLen = arrId.length; i < arrIdLen; i++) {
            let id = arrId[i]
            let rows = await ctx.db.query(`SELECT * FROM types WHERE ID=?`, [id]);
            let movierows = await ctx.db.query(`SELECT * FROM movielist AS m,types AS t WHERE m.tid=t.ID=?`, [id]);
            if (rows.length > 0 ) {
                if(movierows.length > 0){
                    await remsg(0, '未删除该类型的所有电影')
                }else{
                    await ctx.db.query(`DELETE FROM types WHERE ID=?`, [id]);
                    await remsg(1, '删除成功')
                }
                
            } else {
                await remsg(0, '未找到数据')
            }
        }

    });

    router.get('/types_add', async ctx => {
        await ctx.render('/admin/types_add')
    });
    router.post('/types_add', post(), async ctx => {
        let typedata = ctx.request.fields;

        let typename = typedata.typename;

        let userows = await ctx.db.query(`SELECT * FROM admins WHERE ID=?`, [ ctx.session['adminID'] ]);

        async function remsg(sta, message) {
            datamsg = { state: sta, msg: message }
            ctx.body = JSON.stringify(datamsg)
        }
        if (userows[0].limit !== 1) {
            await remsg(0, '你的权限不够')
        } else {
            await ctx.db.query("INSERT INTO types (tname) VALUES (?)", [typename]);
            await remsg(1, '添加成功');
        }

    });

    router.get('/types_edit/:id', async ctx => {
        let { id } = ctx.params;
        let data = await ctx.db.query(`SELECT * FROM types WHERE ID=?`, [id])
        await ctx.render('/admin/types_edit', { data })
    });
    router.post('/types_edit', post(), async ctx => {
        let typedata = ctx.request.fields;

        let typename = typedata.typename;
        let retypename = typedata.retypename;

        let userows = await ctx.db.query(`SELECT * FROM admins WHERE ID=?`, [ctx.session['adminID']]);
        let typeID = await ctx.db.query(`SELECT * FROM types WHERE tname=?`, [ typename ])

        async function remsg(sta, message) {
            datamsg = { state: sta, msg: message }
            ctx.body = JSON.stringify(datamsg)
        }
        if (userows[0].limit === 1) {
            await ctx.db.query("UPDATE types SET tname=? WHERE ID=?", [retypename, typeID[0].ID]);
            await remsg(1, '修改成功');
        } else {
            await remsg(0, '你的权限不够')
        }

    });

}