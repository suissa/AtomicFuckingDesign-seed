const FACTORY_MODULE_PATH = './../_factories/module'


module.exports = (name, structure, routes, db) => {

  // console.log('\n\n\n db', db)
  // console.log('\n\n\n name', name)
  // console.log('\n\n\n structure', structure)
  // console.log('\n\n\n routes', routes)
// const name = require('./../../_config/module/get.name')(__filename)
// const structure = require('./molecular.structure')
const molecule = { structure }

const defineOrganelles = (route) => route.action
const getOrganelles = (routes) => routes.map(defineOrganelles)
  const organelles = getOrganelles(routes)
  const organism = { name, organelles }
  const DNA = { organism, molecule }
  const MODULE = require(FACTORY_MODULE_PATH)(DNA, db)
  const ROUTES = require('./../_god/routes')(routes, MODULE.organism)
  // console.log('routesMounted', routesMounted)
  // console.log('\n\n\n ROUTES', ROUTES)
  // console.log('\n\n\n MODULE', MODULE)
  return { ROUTES, MODULE }
}