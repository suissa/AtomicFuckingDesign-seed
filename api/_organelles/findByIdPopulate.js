const toPopulate = require('./helpers/toPopulate')

module.exports = (Organism) => 
  (req, res) => {
    const success = require('./ribossomos/success-200-json')(res)
    const error = require('./ribossomos/error-json')(res)

    const filterFields = (field) => !(field.includes('_'))
    const testFields = (field) => ( Organism.schema.paths[field].instance == 'ObjectID'
                                  || Organism.schema.paths[field].instance == 'Array' )

    const fields = (req.query.entities)
                    ? req.query.entities.split(',')
                    : Object
                        .keys(Organism.schema.paths)
                        .filter( filterFields )
                        .filter( testFields )
                    
    const query = {_id: req.params.id}
    const fieldsToPopulate = fields.reduce(toPopulate, [])

    return Organism.findOne(query)
      .populate(fieldsToPopulate)
      .exec()
      .then(success)
      .catch(error)
  }

