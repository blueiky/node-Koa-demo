const Router = require('koa-router');



// const { upload_dir } = require('../../config');

let router = new Router();

router.use(async (ctx, next) => {
    if (!ctx.session['adminID'] && ctx.url != '/admin/login') {
        ctx.redirect('/admin/login');
    } else {
        await next();
    }
});

router.get('/', async ctx => {
    // 获取到存储在session里面的用户名
    let user = ctx.session.user;
    await ctx.render('admin/index', { user });
});
router.get('/welcome', async ctx => {
    let user = ctx.session.user;
    await ctx.render('/admin/welcome', { user })
});

// 退出登录
router.get('/loginout', async ctx => {
    ctx.session['adminID'] = null;
    ctx.redirect('/admin')
});

// 用户
router.use('/user', require('./user'));

router.get('/user_add', async ctx => {
    await ctx.render('/admin/user_add');
});

// 类别
require('./types')(router)

// 全部电影
require('./all')(router)

// 添加
require('./add')(router);

// 删除电影，但未删除文件
require('./delmovie')(router);

// 修改
require('./movie_edit')(router)

// 搜索
require('./search')(router);

// 登录
require('./login')(router);


module.exports = router.routes();