const CONFIG = require('./../project')

module.exports = (acc, atom) => {
  // console.log('atom', atom)
  // console.log('acc', acc)
  let configAtom = require(CONFIG.ATOMS_PATH +  atom )
  // if
  acc[atom] = (configAtom.ARRAY) ? [configAtom] : configAtom
  // console.log('configAtom', configAtom)
  return Object.assign({}, acc)
}