const router = require('express').Router()

module.exports = (Routes) => {//console.log('Routes e router', Routes, router)
  // router
  // console.log('Routes chegou', Routes)
  // router['get']('/', (req, res, next) => console.log('rota'))
  return Routes.map( (route, i) => //console.log('route', route) )
    router[route.method](route.path, route.action) )
}