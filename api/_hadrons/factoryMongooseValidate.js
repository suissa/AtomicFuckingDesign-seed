const QUARK_PATH = './../_quarks/'
const LANG = 'pt-br'

module.exports = (ATOM_NAME) => ({
  validator: require(QUARK_PATH + 'is'+ATOM_NAME.toUpperCase())
, message: require(QUARK_PATH + 'is'+ATOM_NAME.toUpperCase()+'-message')(LANG)
})
