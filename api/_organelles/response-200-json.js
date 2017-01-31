module.exports = (err, data, res) => {
  if (err) return console.log('Erro: ', err);

  res.writeHead(200, {'Content-Type': 'application/json'});
  // console.log('data:', data);
  return res.end(JSON.stringify(data));
};
