const CONFIG = require('./../project')

module.exports = (_file) =>
  _file
    .split(CONFIG.PROJECT_NAME)[1]
    .split('modules')[1]
    .split('organism.js')[0]
    .replace(/\//g, '')
    .replace(/\\/g, '')

