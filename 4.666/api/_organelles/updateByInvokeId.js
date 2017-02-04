module.exports = (Organism) => 
  (req, res) => {
    const success = require('./ribossomos/success-200-json')(res)
    const error = require('./ribossomos/error-json')(res)

    const query = {invokeId: req.params.id}
    const mod = Object.assign({}, req.body, {monitoring: true}) 
    console.log('\n query:', query)
    console.log('\n mod:', mod)
    console.log('\n\n')
    return Organism.update(query, mod)
                    .exec()
                    .then(success)
                    .catch(error)
  }

