module.exports = (Organism) => 
  (req, res) => {
    console.log('\n\n\nONE')
    const substrate = {}
    const cofactors = { req, res }
    const enzyme = __filename.split(`_organelles/`)[1].split('.js')[0]
    const convertToProduct = require(`./ribossomos/success-200-json`)(res)
    const inhibitor = require(`./ribossomos/error-json`)(res)
    const catalyze = require(`./../_enzymes/${enzyme}`)

    return catalyze( Organism, substrate, cofactors )
                                .then( convertToProduct )
                                .catch( inhibitor )
  }