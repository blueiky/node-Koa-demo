module.exports = function (router) {


    router.get('/sort', async ctx => {
        let data = await ctx.db.query(`SELECT * FROM types`);
        let movieData = await ctx.db.query(`SELECT m.ID,m.mname,m.maker,m.url,m.img,m.playtimes,m.isrecommend,m.onlinetime,m.brief,m.tid,t.tname FROM movielist AS m,types AS t WHERE m.tid = t.ID`);
        let typeName = null;
    let bannerData = await ctx.db.query(`SELECT ID,mname,img,brief FROM movielist WHERE isrecommend=1`);

        await ctx.render('web/sort', { data, movieData, typeName, bannerData });
    });

    router.get('/sort/:id', async ctx => {
        let { id } = ctx.params;
        // console.log(id)
        let reg = /^[1-6]+$/
        if (!reg.test(id)) {
            ctx.redirect('/sort');
        } else {
            let data = await ctx.db.query(`SELECT * FROM types`);
            // id = parseInt(id)
            let typeName = await ctx.db.query(`SELECT tname FROM types WHERE ID=?`, [id])
            let movieData = await ctx.db.query(`SELECT m.ID,m.mname,m.maker,m.url,m.img,m.playtimes,m.isrecommend,m.onlinetime,m.brief,m.tid,t.tname FROM movielist AS m,types AS t WHERE m.tid=t.ID AND m.tid=?`, [id]);
            let bannerData = await ctx.db.query(`SELECT ID,mname,img,brief FROM movielist WHERE isrecommend=1`);

            // console.log(movieData)
            await ctx.render('web/sort', { data, movieData, typeName, bannerData });
        }
    });

}