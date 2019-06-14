const Router = require('koa-router');

let router = new Router();

router.get('/', async ctx => {
    await ctx.render('admin/user')
});
router.post('/', async ctx => {

    let data = await ctx.db.query(`SELECT * FROM admins`);
    let rows = await ctx.db.query(`SELECT count(*) AS c FROM admins`);
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

require('./deluser')(router);
require('./adduser')(router);
require('./edituser')(router);


module.exports = router.routes();