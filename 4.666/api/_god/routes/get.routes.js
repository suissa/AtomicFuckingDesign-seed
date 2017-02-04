const MODULES_PATH = './modules/'

module.exports = (MODULE_ROUTER) => (module, i) => {
  console.log('module i MODULE_ROUTER', module, i, MODULE_ROUTER)
  let path = '/api/' + module.toLowerCase()
  if (!path.endsWith('s')) path += 's'
  
  // console.log('return', { 
  //   path, 
  //   module: MODULE_ROUTER 
  // })
  return { 
    path, 
    module: MODULE_ROUTER 
  }
}