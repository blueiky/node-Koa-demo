const { post, upload } = require('../../libs/body');
const fs = require('promise-fs');
const path = require('path');

module.exports = function (router) {

    router.get('/mod_data/:id', async ctx => {
        let user = ctx.session.user;
        let { id } = ctx.params;
        let data = await ctx.db.query(`SELECT m.ID,m.mname,m.maker,m.url,m.img,m.playtimes,m.isrecommend,m.onlinetime,m.brief,m.tid,t.tname FROM movielist AS m,types AS t WHERE tid=t.ID AND m.ID=?`, [id]);
        for (let item in data) {
            var ID = data[item].ID;
            var mname = data[item].mname;
            var maker = data[item].maker;
            var url = data[item].url;
            var img = data[item].img;
            var playtimes = data[item].playtimes;
            var isrecommend = data[item].isrecommend;
            var onlinetime = data[item].onlinetime;
            var brief = data[item].brief;
            var tid = data[item].tid;
            var tname = data[item].tname;
        }
        await ctx.render('/admin/mod_data', { user, data, ID, mname, maker, url, img, playtimes, isrecommend, onlinetime, brief, tid, tname });
    });
    // 修改
    router.post('/mod_data', ...upload({
        maxFileSize: 10 * 1024 * 1024
    }), async ctx => {
        // let { mname, maker, url, img, playtimes, isrecommend, onlinetime, brief, tid } = ctx.request.fields;
        // await ctx.db.query(`UPDATE movielist SET mname=?,maker=?,url=?,img=?,playtimes=?,isrecommend=?,onlinetime=?,brief=?,tid=? WHERE ID=?`,
        // [
        //     mname, maker, url, img, playtimes, isrecommend, onlinetime, brief, tid
        // ]);
    });
}