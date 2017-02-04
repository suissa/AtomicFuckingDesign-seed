const fs = require('fs')
const CONFIG = require('../../_config/project.js')
const ATOMS = '/_atoms/atom-'
const PATH = __filename.split(CONFIG.PROJECT_NAME + '/')[0] + CONFIG.PROJECT_NAME + ATOMS

const existsFile = (file) => fs.existsSync(file)

const toPopulate = (acc, cur) => {
  let atomConfig = PATH + cur.trim() + '-config.js'

  if ( existsFile(atomConfig) ) {
    let populate = { path: cur.trim(), model: require(atomConfig)['ref'] }
    acc.push(populate)
    return acc
  }
  else return acc
}

module.exports = toPopulate