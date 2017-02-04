module.exports = (Organism) => 
  (req, res) => {
    const success = require('./ribossomos/success-200-json')(res)
    const error = require('./ribossomos/error-json')(res)

    const reduceToMod = (acc, cur) => 
      ( Array.isArray(req.body[cur]) ) 
        ? Object.assign(acc, { '$addToSet': { [cur]: { '$each': req.body[cur] } } })
        : Object.assign(acc, { [cur]: req.body[cur] })

    const query = {_id: req.params.id}
    const mod = Object
                  .keys(req.body)
                  .reduce(reduceToMod, {})
    console.log('\n mod:', mod)
    console.log('\n\n')
    return Organism.update(query, mod)
                    .exec()
                    .then(success)
                    .catch(error)
  }

