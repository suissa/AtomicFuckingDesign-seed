(function () {
  `use strict`;
  // só precisa mudar o valor de MODULE_NAME
  const MODULE_NAME = `User`;
  const API = MODULE_NAME.toLowerCase() + 's/';

  angular
    .module(`app.${MODULE_NAME}`)
    .service(`${MODULE_NAME}Service`, service);

  function service($http) {
    const BASE_URL = `http://localhost:8000/api/${API}`;
    let vm = this;

    vm.list = () =>
      $http({
        url: BASE_URL,
        method: `GET`
      })

    vm.get = (id) =>
      $http({
        url: BASE_URL + id,
        method: `GET`
      })

    vm.getSchema = () =>
      $http({
        url: BASE_URL + 'schema',
        method: `GET`
      })

    vm.create = (Form) =>
      $http({
        url: BASE_URL,
        method: `POST`,
        data: Form
      })


    vm.update = (Form) =>
      $http({
        url: BASE_URL + Form._id,
        method: `PUT`,
        data: Form
      })

    vm.remove = (entity) =>
      $http({
        url: BASE_URL + entity._id,
        method: `DELETE`
      })
  }
  service.$inject = [`$http`];

})()
