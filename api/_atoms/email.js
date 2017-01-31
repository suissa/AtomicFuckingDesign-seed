const CONFIG = require('./../_config/atoms')(__filename)
const DEFAULT = {
  ATOM_NAME: CONFIG.ATOM_NAME,
  VALIDATE: false,
  // VALIDATE_FACTORY_PATH: CONFIG.VALIDATE_FACTORY_PATH
}
const PROPS = {
  type: String,
  lowercase: true,
  // unique: true,
}

const atomConfig = Object.assign({}, DEFAULT, PROPS)

module.exports = require('./../_factories/atom')(atomConfig)

