const Router = require('koa-router');
const static = require('../../libs/contentStatic');

let router = new Router();

router.get('/', async ctx => {
    let data = await ctx.db.query(`SELECT * FROM types`);

    // 热播
    let displayList = await ctx.db.query(`SELECT ID,mname,maker,img,onlinetime,brief FROM movielist order by playtimes desc LIMIT 4`)

    // 连轴看
    let recommendList = await ctx.db.query(`SELECT ID,mname,maker,img,onlinetime,playtimes,brief FROM movielist WHERE isrecommend=1 LIMIT 4`)

    // 最新上线
    let newList = await ctx.db.query(`SELECT ID,mname,maker,img,onlinetime,playtimes,brief FROM movielist ORDER BY onlinetime DESC LIMIT 4`)

    let bannerData = await ctx.db.query(`SELECT ID,mname,img,brief FROM movielist WHERE isrecommend=1`);

    await ctx.render('web/index', { data, displayList, recommendList, newList, bannerData })
});

require('./sort')(router);
require('./play')(router);

module.exports = router.routes();