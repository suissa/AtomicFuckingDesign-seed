const MODULES_PATH = './../../modules/'

module.exports = (module, i) => {
  
  let path = '/api/' + module.toLowerCase()
  if (!path.endsWith('s')) path += 's'
  
  console.log('return', { 
    path, 
    module: MODULES_PATH + module 
  })  
  return { 
    path, 
    module: MODULES_PATH + module 
  }
}