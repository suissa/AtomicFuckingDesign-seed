const CONFIG = require('./../_config/atoms')(__filename)
const DEFAULT = {
  ATOM_NAME: CONFIG.ATOM_NAME,
  VALIDATE: false,
  labels: {
    'pt-br': 'nome',
    'en': 'name',
  }
}

const _get = (v) => v.toLowerCase();
const _set = (v) => v.toLowerCase();

const PROPS = {
  type: String,
  get: _get
  // set: lowerCase,

  // required: true
}

const atomConfig = Object.assign({}, DEFAULT, PROPS)

const Atom = require('./../_factories/atom')(atomConfig)
// console.log('atomConfig', atomConfig)
module.exports = Atom
