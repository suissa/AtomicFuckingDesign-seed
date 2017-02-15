module.exports = (Organism) => 
  (req, res) => {
    const success = require('./ribosomes/success-200-json')(res)
    const error = require('./ribosomes/error-json')(res)

    // const query = {invokeId: parseInt(req.params.id)}
    const query = {crossRefId: req.params.id}
    const mod = {monitoring: false, invokeId: 0, crossRefId: []}
    console.log('\n setDeviceMonitorStop')
    console.log('\n query:', query)
    console.log('\n mod:', mod)
    console.log('\n\n')
    return Organism.update(query, mod)
                    .exec()
                    .then(success)
                    .catch(error)
  }

