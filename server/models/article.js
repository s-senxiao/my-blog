const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MongooseDao = require('mongoosedao')

const ArticleSchema = new Schema({
  title: String,
  content: String,
  category: String,
  tag: String
});

const Article = mongoose.model('Article', ArticleSchema);
// var UserDao = new MongooseDao(User);

module.exports = Article;