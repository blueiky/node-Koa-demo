const Router = require('koa-router');

let router = new Router();

router.get('/banner', async ctx => {

    let data = await ctx.db.query(`SELECT ID,mname,img,brief FROM movielist WHERE isrecommend=1`);
    ctx.body = JSON.stringify(data);

});


module.exports = router.routes();