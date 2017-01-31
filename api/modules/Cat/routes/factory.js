module.exports = (Organism) => 
  (route, i) => ({
    path: route.path,
    method: route.method,
    action: Organism[route.action]
  })