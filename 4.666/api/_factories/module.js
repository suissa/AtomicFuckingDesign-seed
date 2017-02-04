// const mongoose = require('mongoose')
const moleculesPath = './../modules/'
const FACTORY_ORGANISM = require('./organism')
const FACTORY_MOLECULE = require('./molecule')
const FACTORY_ATOM = require('./atom')

module.exports = (DNA, db) => {
  // console.log('\n\n\n Sou vagabundoo', DNA)
  // console.log('\n\n\t\t\t\tDNA', DNA)
  // console.log('\n\n\t\t\t\tdb', db)
  const molecule = FACTORY_MOLECULE(DNA.molecule.structure)
  const organism = FACTORY_ORGANISM(DNA.organism, molecule, db)

  const MODULE = {
    organism,
    molecule
  }
  // console.log('MODULE', MODULE)
	return MODULE
}
