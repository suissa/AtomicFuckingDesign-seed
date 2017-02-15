
module.exports = (Organism) => 
  (req, res) => {
    const substrate = {_id: req.params.id}
    const enzyme = __filename.split(`_organelles/`)[1].split('.js')[0]
    const convertToProduct = require(`./ribossomos/success-200-json`)(res)
    const inhibitor = require(`./ribossomos/error-json`)(res)
    const catalyze = require(`./../_enzymes/${enzyme}`)

    return catalyze( Organism, substrate )
                                .then( convertToProduct )
                                .catch( inhibitor )
  }
