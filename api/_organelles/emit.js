module.exports = (Organism) => 
  (req, res) => {
    const query = {}
    // console.log('res.io', res.io)
    res.io.emit('message', 'RECEBI HEIN')
  }

