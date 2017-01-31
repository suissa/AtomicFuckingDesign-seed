module.exports = (Organism) => 
  (req, res) => {
    const query = {}
    const success = require('./ribossomos/success-200-json')(res)
    const error = require('./ribossomos/error-json')(res)
    
    return Organism.findOne(query)
      .exec()
      .then(success)
      .catch(error)
  }

