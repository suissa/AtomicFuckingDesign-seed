const VALIDATE_TYPE = 'Mongoose'
const VALIDATE_FACTORY = 'factory' +VALIDATE_TYPE+ 'Validate'
const VALIDATE_FACTORY_PATH = './../_hadrons/' + VALIDATE_FACTORY

module.exports = (_file) => {
  const ATOM_NAME = _file
                      .toLowerCase()
                    
  return {
    ATOM_NAME,
    VALIDATE_FACTORY_PATH
  }
}