const FACTORY_MODULE_PATH = './../../_factories/module'

const name = require('./../../_config/module/get.name')(__filename)
const structure = require('./molecular.structure')
const molecule = { structure }

const defineOrganelles = (route) => route.action
const getOrganelles = (routes) => routes.map(defineOrganelles)

module.exports = (routes) => {

  const organelles = getOrganelles(routes)
  const organism = { name, organelles }
  const DNA = { organism, molecule }
  const MODULE = require(FACTORY_MODULE_PATH)(DNA)
  const routesMounted = require('./routes')(routes, MODULE.organism)
  
  return routesMounted
}