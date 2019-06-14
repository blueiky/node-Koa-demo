const { post, upload } = require('../../libs/body');
const fs = require('promise-fs');
const path = require('path');

module.exports = function (router) {


    router.get('/add', async ctx => {
        let movieType = await ctx.db.query(`SELECT * FROM types`);
        await ctx.render('admin/add', { movieType })
    });
    router.post('/add', ...upload({
        maxFileSize: 20 * 1024 * 1024
    }), async ctx => {
        let user = ctx.session.user
        // let data = ctx.request.fields;


        let { moviename, maker, movietype, img, video, onlinetime, playtimes, rec, desc } = ctx.request.fields;
        let rows = await ctx.db.query(`SELECT * FROM admins WHERE ID=?`, [ctx.session['adminID']])

        async function remsg(sta, message) {
            datamsg = { state: sta, msg: message }
            ctx.body = JSON.stringify(datamsg)
        }

        // img = path.basename(img)
        // console.log(data)
        img = path.basename(img[0].path);
        video = path.basename(video[0].path);
        if (rows[0].limit === 1) {
            await ctx.db.query(`INSERT INTO movielist (mname,maker,url,img,playtimes,isrecommend,onlinetime,brief,tid) VALUES (?,?,?,?,?,?,?,?,?)`, [moviename, maker, img, video, playtimes, rec, onlinetime, desc, movietype]);
            // ctx.redirect('/admin/all');
            // await ctx.render('/admin/index', { user })
            await remsg(1, '上传成功')
        }else{
            await remsg(0, '你的管理权限不够，请联系超级管理员')
        }

    });

}