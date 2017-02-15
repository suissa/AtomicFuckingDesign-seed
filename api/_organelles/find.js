module.exports = (Organism) => 
  (req, res) => {
    const substrate = {}
    const enzyme = __filename.split(`_organelles/`)[1].split('.js')[0]
    const convertToProduct = require(`./ribosomes/success-200-json`)(res)
    const inhibitor = require(`./ribosomes/error-json`)(res)
    const catalyze = require(`./../_enzymes/${enzyme}`)

    return catalyze( Organism, substrate )
                                .then( convertToProduct )
                                .catch( inhibitor )
  }

