module.exports = (app) => (route) => //console.log(route, app)
  app.use(route.path, require(route.module))