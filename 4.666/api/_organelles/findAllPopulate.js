const filterToPopulate = require('./helpers/filterToPopulate')

module.exports = (Organism) => 
  (req, res) => {
    // Callbacks Promise
    const success = require('./ribossomos/success-200-json')(res)
    const error = require('./ribossomos/error-json')(res)

    const fields = Object
                    .keys(Organism.schema.paths)
                    .filter(field => !(field.includes('_')))
                    .filter(field => (Organism.schema.paths[field].instance == 'ObjectID'))
                    
    const fieldsToPopulate = !(req.query.entities)
                                ? fields
                                : req.query
                                    .entities
                                    .split(',')
                                    .filter(filterToPopulate)

    const query = {_id: req.params.id}

    return Organism.findOne(query)
      .populate(fieldsToPopulate)
      .exec()
      .then(success)
      .catch(error)
  }

