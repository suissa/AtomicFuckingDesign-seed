const CONFIG = require('./../_config/project')
const MOLECULE_CONFIG_PATH = './../_config/molecule/'
const FILE = 'create.molecular.formula'

module.exports = (MolecularStructure) => {

  const createMolecularFormula = require(MOLECULE_CONFIG_PATH + FILE)
  const Formula = MolecularStructure.reduce(createMolecularFormula, {})

  const MoleculeFactory = require(CONFIG.MOLECULE_FACTORY)
  const Molecule = MoleculeFactory(Formula)

  return Molecule
}