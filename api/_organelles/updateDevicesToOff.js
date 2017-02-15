module.exports = (Organism) => 
  (req, res) => {
    const success = require('./ribosomes/success-200-json')(res)
    const error = require('./ribosomes/error-json')(res)

    const query = {}
    const mod = {invokeId: 0, crossRefId: [], monitoring: false}
    console.log('\n query:', query)
    console.log('\n mod:', mod)
    console.log('\n\n')
    return Organism.update(query, mod, {multi: true})
                    .exec()
                    .then(success)
                    .catch(error)
  }

