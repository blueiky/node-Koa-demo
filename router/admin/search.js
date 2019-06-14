module.exports = function (router) {

    router.get('/search', async ctx => {
        let { searchtype, searchkey, page, limit } = ctx.query;
        let datas;
        limit = parseInt(limit)
        let dataCount;
        // 获取总数据
        if (searchtype == 0) {
            if (typeof (searchkey) == "undefined") {
                dataCount = await ctx.db.query(`SELECT m.ID,m.mname,m.maker,m.url,m.img,m.playtimes,m.isrecommend,m.onlinetime,m.brief,m.tid,t.tname FROM movielist AS m,types AS t WHERE tid=t.ID`)
            } else {
                dataCount = await ctx.db.query(`SELECT m.ID,m.mname,m.maker,m.url,m.img,m.playtimes,m.isrecommend,m.onlinetime,m.brief,m.tid,t.tname FROM movielist AS m,types AS t WHERE tid=t.ID AND m.mname LIKE '%${searchkey}%'`)
            }
        } else {
            dataCount = await ctx.db.query(`SELECT m.ID,m.mname,m.maker,m.url,m.img,m.playtimes,m.isrecommend,m.onlinetime,m.brief,m.tid,t.tname FROM movielist AS m,types AS t WHERE tid=t.ID AND m.tid=? AND m.mname LIKE '%${searchkey}%'`, [searchtype])
        }

        if (searchtype == 0) {
            if (typeof (searchkey) == "undefined") {
                datas = await ctx.db.query(`SELECT m.ID,m.mname,m.maker,m.url,m.img,m.playtimes,m.isrecommend,m.onlinetime,m.brief,m.tid,t.tname FROM movielist AS m,types AS t WHERE tid=t.ID LIMIT ?,?`, [(page - 1) * limit, limit])
            } else {
                datas = await ctx.db.query(`SELECT m.ID,m.mname,m.maker,m.url,m.img,m.playtimes,m.isrecommend,m.onlinetime,m.brief,m.tid,t.tname FROM movielist AS m,types AS t WHERE tid=t.ID AND m.mname LIKE '%${searchkey}%' LIMIT ?,?`, [(page - 1) * limit, limit])
            }
        } else {
            datas = await ctx.db.query(`SELECT m.ID,m.mname,m.maker,m.url,m.img,m.playtimes,m.isrecommend,m.onlinetime,m.brief,m.tid,t.tname FROM movielist AS m,types AS t WHERE tid=t.ID AND m.tid=? AND m.mname LIKE '%${searchkey}%' LIMIT ?,?`, [searchtype, (page - 1) * limit, limit])
        }
        let dataLen = dataCount.length;
        let dataJson
        if (dataLen != 0) {
            dataJson = {
                "status": 200,
                "message": "",
                "total": dataLen,
                "rows": {
                    "item": datas
                }
            }
        } else {
            dataJson = {
                "status": 200,
                "message": "没有该类型的电影",
                "total": dataLen,
                "rows": {
                    "item": datas
                }
            }
        }
        ctx.body = JSON.stringify(dataJson)
    });
}