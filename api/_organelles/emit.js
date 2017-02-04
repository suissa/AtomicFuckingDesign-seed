module.exports = (Organism) => 
  (req, res) => {
    const query = {}

    res.io.sockets.on('connection', function (socket) {
      console.log('connection no socket')
      // socket.emit('news', { hello: 'world' });
      // socket.on('my other event', function (data) {
      //   console.log(data);
      // });
        res.io.emit('message', 'RECEBI HEIN')
    });
    // console.log('res.io', res.io)
  //   console.log('entrei aqui')
  //   res.io.emit('message', 'RECEBI HEIN')
  //   res.json({msg: true})
  }

