const fs = require('fs')
const path = require('path')
const ROUTER_PATH = './_god/routes/'
const CONFIG = require('./config')

const getProjects = (MODULES_PATH) => 
    fs.readdirSync(MODULES_PATH)
      .filter( (file) => (file.startsWith('_') || file.startsWith('.'))
                          ? false
                          : path.join(MODULES_PATH, file) )

const projects = getProjects('./project/')
                            .map( file => require('./project/'+file ))


module.exports = (app, db) => {

  const models =  db.modelNames()

  const toAtomicFuckingModule  = ( project ) => {
    const ROUTES_CONFIG = project.routes
    const { ROUTES, MODULE} = require('./_god/config.module.routes')(project.name, 
      project.fields, 
      ROUTES_CONFIG, db)
    const ROUTER = require(ROUTER_PATH + CONFIG.ROUTER)
    const MODULE_ROUTER = require('./_god/routes/routesExpress')(ROUTES)
  }

  projects.map( toAtomicFuckingModule )

  return app

}

