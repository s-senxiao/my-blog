const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true });
const db = mongoose.connection;
// const kittySchema = mongoose.Schema({
//   name: String
// })
// kittySchema.methods.speak = function () {
//   const greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name";
//   console.log(greeting);
// }

// const Kitten = mongoose.model('Kitten', kittySchema)
// const felyne = new Kitten({
//   name: 'Felyne'
// })
// const fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak()
// console.log(felyne.name)

// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak()
// })

// // Kitten.find(function (err, kittens) {
// //   if (err) return console.error(err);
// //   console.log(kittens);
// // })

db.on('err', () => {
  console.error.bind(console, 'connection error:')
})
db.once('open', () => {
  console.log('open------------')
})