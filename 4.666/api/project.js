module.exports = {
  name: 'Atomic Design seed',
  modules: [
    {
      name: 'Cat',
      fields: [
        'name', 'age', 'color', 'weight'
      ],
      routes: [
        { path: '/', method: 'GET', method: 'GET', action: 'list' },
        { path: '/',  method: 'POST',action: 'create' },
        { path: '/', method: 'PUT', action: 'update' },
        { path: '/', method: 'DELETE', action: 'remove' },
      ]
    }
  ]
}