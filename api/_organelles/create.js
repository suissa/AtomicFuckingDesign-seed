module.exports = (Organism) => 
  (req, res) => {
    const query = req.body
    const success = require('./ribossomos/success-200-json')(res)
    const error = require('./ribossomos/error-json')(res)
    
    return Organism.create(query)
                    .then(success)
                    .catch(error)
  }

