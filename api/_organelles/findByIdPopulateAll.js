const filterToPopulate = require('./helpers/filterToPopulate')

module.exports = (Organism) => 
  (req, res) => {
    // Callbacks Promise
    const success = require('./ribosomes/success-200-json')(res)
    const error = require('./ribosomes/error-json')(res)

    const fieldsToPopulate = (req.query.entities)
                                ? req.query
                                    .entities
                                    .split(',')
                                    .filter(filterToPopulate)
                                : '' //depois pegar automatico

    const query = {_id: req.params.id}
    
    return Organism.find(query)
      .populate(fieldsToPopulate)
      .exec()
      .then(success)
      .catch(error)
  }

