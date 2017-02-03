const CONFIG = require('./config')
const ROUTER_PATH = './routes/'

const fs = require('fs')
const existsFile = (file) => fs.existsSync(file)
const getRoutesConfig = () => require('./routes.config.js')
                              
const ROUTES_CONFIG = getRoutesConfig()
const ROUTES = require('./config.module.routes')(ROUTES_CONFIG)

const ROUTER = require(ROUTER_PATH + CONFIG.ROUTER)
const MODULE_ROUTER = require(ROUTER_PATH + CONFIG.ROUTES)(ROUTES, ROUTER)

// const io = 

module.exports = MODULE_ROUTER
