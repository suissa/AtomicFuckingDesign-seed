const CONFIG = require('./config')
const ROUTER_PATH = './routes/'

const fs = require('fs')
const existsFile = (file) => fs.existsSync(file)
// const getRoutesConfig = () => existsFile('./routes.config.js')
//                                 ? require('./routes.config.js')
                                // : require('../../_config/routes/routes.config')
const getRoutesConfig = () => require('./routes.config.js')
                              
const ROUTES_CONFIG = getRoutesConfig()
const ROUTES = require('./config.module.routes')(ROUTES_CONFIG)
// console.log('ROUTES_CONFIG', ROUTES_CONFIG)
const ROUTER = require(ROUTER_PATH + CONFIG.ROUTER)
const MODULE_ROUTER = require(ROUTER_PATH + CONFIG.ROUTES)(ROUTES, ROUTER)

module.exports = MODULE_ROUTER
