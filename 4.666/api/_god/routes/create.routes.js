module.exports = (app) => (acc, route) => {
  console.log('route', route)
  // console.log('route.module', route.module)
  // return app.use(route.path, require(route.module))
}