module.exports = (Organism) => 
  (req, res) => {
    const query = {}
    // console.log('res.io', res.io)
    console.log('entrei aqui')
    res.io.emit('message', 'RECEBI HEIN')
    res.json({msg: true})
  }

