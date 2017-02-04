const CONFIG = require('./../_config/atoms')(__filename)
const DEFAULT = {
  ATOM_NAME: CONFIG.ATOM_NAME,
  VALIDATE: false,
  labels: {
    'pt-br': 'nome',
    'en': 'name',
  }
}
const PROPS = {
  type: String,
}

const atomConfig = Object.assign({}, DEFAULT, PROPS)

const Atom = require('./../_factories/atom')(atomConfig)

module.exports = Atom
