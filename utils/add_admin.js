const mysql = require('../libs/mysql');
const password = require('../libs/password');
const rl = require('../libs/rl');

(async () => {
    let db = await mysql;
    while (1) {
        let name = await rl.questionAsync('admin username: ');
        if(!name){
            break;
        }
        // 检查
        let rows = await db.query("SELECT * FROM admins WHERE username=?", [name]);

        if (rows.length > 0) {
            console.log(`管理员账户已存在：${name}`)
        } else {
            let pass = await rl.questionAsync('admin password: ');
            let limit = await rl.questionAsync('admin limit: ');
            await db.query("INSERT INTO admins(username,password,`limit`) VALUES (?,?,?)", [name, password(pass), limit]);
            console.log('管理员添加成功')
        }
    }
    rl.close();
})();