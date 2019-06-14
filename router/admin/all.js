const { post } = require('../../libs/body');
 
module.exports = function (router){

    router.get('/all', async ctx => {
        let movieType = await ctx.db.query(`SELECT * FROM types`);
        await ctx.render('/admin/all', { movieType })
    });
    router.post('/all', post(), async ctx => {
        let { page, limit } = ctx.request.fields;
        limit = parseInt(limit)
        let data = await ctx.db.query(`SELECT m.ID,m.mname,m.maker,m.url,m.img,m.playtimes,m.isrecommend,m.onlinetime,m.brief,m.tid,t.tname FROM movielist AS m,types AS t WHERE m.tid = t.ID ORDER BY m.ID LIMIT ?,?`,[ (page - 1) * limit, limit ]);
        let rows = await ctx.db.query(`SELECT count(*) AS c FROM movielist`);
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

}