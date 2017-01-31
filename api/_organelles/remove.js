module.exports = (Organism) => 
  (req, res) => {
    const query = {_id: req.params.id}
    const success = require('./ribossomos/success-200-json')(res)
    const error = require('./ribossomos/error-json')(res)
    
    return Organism.remove(query)
                    .exec()
                    .then(success)
                    .catch(error)
  }

