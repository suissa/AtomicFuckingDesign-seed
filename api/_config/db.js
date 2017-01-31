const mongoose = require('mongoose')

const DB = 'db-ead-test'
mongoose.connect('mongodb://localhost/' + DB)
mongoose.Promise = require('bluebird')

const db = mongoose.connection

db.on('error', (err) => console.log('Erro de conexao.', err) )
db.on('open', () => console.log('Conexão aberta.') )
db.on('connected', (err) => console.log('Conectado na base: ', DB) )
db.on('disconnected', (err) => console.log('Desconectado') )

module.exports = db
