module.exports = (Organism) => {
  return function(id, cb){
    const query = {_id: id};
    Organism.findOne(query, function(err, user, res){
      return cb(err, user, res);
    });
  }
};
