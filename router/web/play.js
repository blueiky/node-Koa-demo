module.exports = function (router){


    router.get('/play', async ctx => {

        ctx.redirect('/sort')

    });

    router.get('/play/:id', async ctx =>{
        let { id } = ctx.params;

        let data = await ctx.db.query(`SELECT mname,url FROM movielist WHERE ID=?`, [ id ]);

        await ctx.render('web/play', { data })
    });


}