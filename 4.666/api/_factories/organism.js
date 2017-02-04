const mongoose = require('mongoose')
const moleculesPath = './../modules/'
const organellesPath = './../_organelles/'

module.exports = (DNA, Molecule, db) => {

  const models = db.modelNames()
  // const models = ['Cat']
  // let Organism = {}
  
  const Organism = models.includes(DNA.name)
    ? mongoose.model(DNA.name)
    :  mongoose.model(DNA.name, Molecule) // deixar generico
  // console.log('Organism', Organism)
	const Organelles = require('./../_config/organism/organelles.default')

	let OrganellesCell = (Array.isArray(DNA.organelles))
		? DNA.organelles.concat(Organelles)
		: Organelles

	const createOrganelles = (acc, name) => 
		Object.assign(acc, {
			[name]: require(organellesPath+name)(Organism, DNA.populate)})


	return OrganellesCell.reduce(createOrganelles, {name: 'teste'})
}
