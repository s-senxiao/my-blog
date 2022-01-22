const mysqlDb = require('mysql');
const config = require('./config');

class mysql {
  constructor () {
    this.connect = mysqlDb.createConnection(config);
    this.connect.connect();
  }

  query (sql) {
    return new Promise((resolve, reject) => {
      this.connect.query(sql, (err, result) => {
        console.log('result---', result)
        result = JSON.stringify(result);
        console.log('result1111---', result)
        result = JSON.parse(result);
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    })
  }

  insert (sql, params) {
    return new Promise((resolve, reject) => {
      this.connect.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          success: true,
          msg: null,
          data: null
        });
      })
    })
  }


  destroy () {
    this.connect.destroy();
  }
}

module.exports = mysql;
