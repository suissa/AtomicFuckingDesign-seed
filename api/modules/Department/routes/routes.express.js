module.exports = (Routes, router) => 
  Routes.map( (route, i) =>
    router[route.method](route.path, route.action) )
 // console.log('\t\t route', route.action) )