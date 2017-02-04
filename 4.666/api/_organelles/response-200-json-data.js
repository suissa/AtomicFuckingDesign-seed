module.exports = (res) => (data) => {
  res.writeHead(200, {'Content-Type': 'application/json'})
  // console.log('data:', data);
  return res.end(JSON.stringify(data))
};
                              