const { model } = require("../models/article");

module.exports = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'blog'
}

// CREATE TABLE admin_list
// (
// user_id int NOT NULL,
// username char(50) NOT NULL,
// password char(50) NOT NULL,
// create_date date NOT NULL
// ) ENGINE=InnoDB;