const Router = require('koa-router');
const static = require('./static');

let router = new Router();

router.use('/admin', require('./admin'));
router.use('', require('./web'));
router.use('/api', require('./api'));

static(router);

module.exports = router.routes();