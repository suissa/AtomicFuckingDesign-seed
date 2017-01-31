const Schema = require('mongoose').Schema
const CONFIG = require('./../_config/atoms')(__filename)
const DEFAULT = {
  ATOM_NAME: CONFIG.ATOM_NAME,
  VALIDATE: false,
  COMPOSE: false,
  ARRAY: true
}

const permission = {
  ATOM_NAME: 'permission',
  VALIDATE: false,
  COMPOSE: false,
  ARRAY: false,
  type: String,
  default: 'r'
}
const _id = {
  ATOM_NAME: '_id',
  VALIDATE: false,
  COMPOSE: false,
  ARRAY: false,
  type: Schema.Types.ObjectId,
  ref: 'User',
}
const PROPS = {
  // permission,
  // _id
  type: Schema.Types.ObjectId,
  ref: 'User',
}
// const PROPS = {
//   type: Schema.Types.ObjectId,
//   ref: 'User'
// }
const atomConfig = Object.assign({}, DEFAULT, PROPS)

module.exports = require('./../_factories/atom')(atomConfig)

