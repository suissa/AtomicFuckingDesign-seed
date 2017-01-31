module.exports = (res) => 
  (err) => res.json(Object.assign({type: 'error'}, err))