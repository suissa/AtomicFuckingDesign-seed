module.exports = (routes, Organism) => {
  const createRouteConfig = require(factory + 'route.config')(Organism)
  return routes.map(createRouteConfig)
}

const factory = '../../../_factories/'

