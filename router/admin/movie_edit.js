const { post, upload } = require('../../libs/body');
const fs = require('promise-fs');
const path = require('path');

module.exports = function (router) {

    router.get('/movie_edit/:id', async ctx => {
        let { id } = ctx.params;
        let data = await ctx.db.query(`SELECT m.ID,m.mname,m.maker,m.url,m.img,m.playtimes,m.isrecommend,m.onlinetime,m.brief,m.tid,t.tname FROM movielist AS m,types AS t WHERE tid=t.ID AND m.ID=?`, [id]);
        let movieType = await ctx.db.query(`SELECT * FROM types`);
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
        await ctx.render('/admin/movie_edit', { movieType, data, ID, mname, maker, url, img, playtimes, isrecommend, onlinetime, brief, tid, tname });
    });
    router.post('/movie_edit/:id', ...upload({
        maxFileSize: 20 * 1024 * 1024
    }), async ctx => {
        let user = ctx.session.user
        // let data = ctx.request.fields;
        let { id } = ctx.params;
        id = parseInt(id)
        let { moviename, maker, movietype, img, video, onlinetime, playtimes, rec, desc } = ctx.request.fields;
        // console.log(id)
        let rows = await ctx.db.query(`SELECT * FROM admins WHERE ID=?`, [ctx.session['adminID']])
        // let oldnameID =  await ctx.db.query(`SELECT * FROM movielist WHERE mname=?`, [oldname]);
        // console.log(oldnameID)

        async function remsg(sta, message) {
            datamsg = { state: sta, msg: message }
            ctx.body = JSON.stringify(datamsg)
        }

        // img = path.basename(img)
        // console.log(data)
        img = path.basename(img[0].path);
        video = path.basename(video[0].path);
        if (rows[0].limit === 1) {
            await ctx.db.query(`UPDATE movielist SET mname=?,maker=?,url=?,img=?,playtimes=?,isrecommend=?,onlinetime=?,brief=?,tid=? WHERE ID=?`, [moviename, maker, img, video, playtimes, rec, onlinetime, desc, movietype, id ]);
            // ctx.redirect('/admin/all');
            // await ctx.render('/admin/index', { user })
            await remsg(1, '修改成功')
        }else{
            await remsg(0, '你的管理权限不够，请联系超级管理员')
        }
    });
}