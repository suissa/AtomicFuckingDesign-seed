module.exports = (app) => (app, route) => //console.log('app route', app, route)
  app.use(route.path, require(route.module))