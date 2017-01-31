const CONFIG = require('./../_config/project')
const MOLECULE_CONFIG_PATH = './../_config/molecule/'
const CREATE = 'create Molecular Formula'.split(/\s/g)
                                          .map(el => el.toLowerCase())
                                          .join('.')
// console.log('CREATE', CREATE)
const Factory = (MolecularStructure) => {

  const createMolecularFormula = require(MOLECULE_CONFIG_PATH + CREATE)
  const Formula = MolecularStructure.reduce(createMolecularFormula, {})

  return Formula
}

module.exports = Factory

const MolecularStructure = [
  'name', 
  'deviceType',
  'created_at'
]

const schema = Factory(MolecularStructure)

console.log('schema', schema)