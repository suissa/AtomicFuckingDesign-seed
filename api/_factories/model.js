const mongoose = require('mongoose')
const moleculesPath = './../modules/'

module.exports = (DNA, Molecule) => mongoose.model(DNA.name, Molecule) 