module.exports = (Routes, router) => 
  Routes.map( (route, i) => 
    router[route.method](route.path, route.action) )
