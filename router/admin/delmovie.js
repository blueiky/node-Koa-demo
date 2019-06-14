module.exports = function (router){
    
    router.get('/del/:id', async ctx => {
        let { id } = ctx.params;
        let arrId = id.split(',');
    
        for (let i = 0, arrIdLen = arrId.length; i < arrIdLen; i++) {
            let id = arrId[i]
            let rows = await ctx.db.query(`SELECT * FROM movielist WHERE ID=?`, [id]);
            if (rows.length > 0) {
                let data = rows[0];
                let aPath = [];
                for (let item in data) {
                    aPath = aPath.concat(data[item].img)
                }
                await ctx.db.query(`DELETE FROM movielist WHERE ID=?`, [id]);
            } else {
                ctx.body = '找不到数据'
            }
        }
        ctx.body = { 
            state: 1,
            msg: '删除成功' 
        }
    });

}