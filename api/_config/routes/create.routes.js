module.exports = (app) => (app, route) => 
  app.use(route.path, require(route.module))