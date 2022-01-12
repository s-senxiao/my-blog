const router = require('koa-router')();
const crypto = require('crypto');
const { user } = require('../config/config');
const mysql = require('../config/db')

const genRandomString = function(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /**转成十六进制*/
    .slice(0,length);/**返回指定长度字符串*/
}

const sha512 = function (password, salt) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
}

router.get('/article/list', async (ctx, next) => {
  const sql = 'SELECT * FROM article_list';
  const db = new mysql();
  const result = await db.query(sql);
  db.destroy();
  ctx.body = {
    success: true,
    msg: null,
    data: result
  };
})

router.get('/article/detail', async (ctx, next) => {
  const id = ctx.request.query.id;
  const sql = `SELECT * FROM article_list WHERE id=${id}`;
  const db = new mysql();
  let result = await db.query(sql);
  db.destroy();
  ctx.body = {
    success: true,
    msg: null,
    data: result[0]
  };
})

router.post('/admin/publish', async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.body = {
      success: false,
      msg: 'no permission',
      data: null
    };
    return
  }
  const { title, abstract, content, category, tag } = ctx.request.body;
  const create_date = new Date();
  const modify_date = create_date;
  const sql = `INSERT INTO article_list(title, abstract, content, category, tag, create_date, modify_date) VALUES 
  (?, ?, ?, ?, ?, ?, ?)`;
  const params = [title, abstract, content, category, JSON.stringify(tag), create_date, modify_date];
  const db = new mysql();
  const result = await db.insert(sql, params);
  db.destroy();
  ctx.body = result;
})

router.get('/admin/list', async (ctx, next) => {
  const sql = `SELECT * from article_list`
  const db = new mysql();
  const result = await db.query(sql);
  db.destroy();
  ctx.body = {
    success: true,
    msg: null,
    data: result
  };
})

router.post('/admin/delete', async (ctx, next) => {
  const { id } = ctx.request.body
  console.log('id----------', id)
  const sql = `DELETE FROM article_list WHERE id=${id}`
  const db = new mysql();
  await db.query(sql);
  db.destroy();
  ctx.body = {
    success: true,
    msg: '成功删除该条数据',
    data: null
  };
})

router.post('/admin/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  let res;
  if (!username || !password) {
    res = {
      success: false,
      msg: '用户名和密码不能为空',
      data: null
    }
  } else {
    const sql = `SELECT * FROM admin_list WHERE username='${username}'`;
    const db = new mysql();
    const result = await db.query(sql);
    db.destroy();

    if (result.length > 0) {
      const user = result[0];
      const { salt, password: encryptedPassword } = user;
      if (sha512(password, salt) === encryptedPassword) {
        ctx.session.user = username
        res = {
          success: true,
          msg: null,
          data: null
        }
      } else {
        res = {
          success: false,
          msg: 'username or password is incorrect',
          data: null
        }
      }
    } else {
      res = {
        success: false,
        msg: 'username or password is incorrect',
        data: null
      }
    }
  }
  ctx.body = res;
})

router.post('/admin/register', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  let res;
  if (!username || !password) {
    res = {
      success: false,
      msg: '用户名和密码不能为空',
      data: null
    }
  } else {
    const salt = genRandomString(16);
    const encryptedPassword = sha512(password, salt);
    const sql = `INSERT INTO admin_list(username, password, salt) VALUES
    (?, ?, ?)`;
    const params = [username, encryptedPassword, salt]
    const db = new mysql();
    await db.insert(sql, params);
    db.destroy();
    res = {
      success: true,
      msg: '注册成功',
      data: null
    }
  }
  ctx.body = res;
})

module.exports = router

// INSERT INTO admin_list(username, password, salt) VALUES('a07f2b4fab547d9696e41351f27b5f86', 'sen.xiao', '1992124xx018');

// CREATE TABLE admin_list (
//   username char(50) NOT NULL,
//   password char(255) NOT NULL,
//   salt char(50) NOT NULL) ENGINE=InnoDB;
