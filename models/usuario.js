module.exports = function (app) {
  var Schema = require('mongoose').Schema;

  var Contato = new Schema({
    nome: String,
    email: String
  });

  var Usuario = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    contatos: [Contato]
  });

  return db.model('Usuario', Usuario);
};
