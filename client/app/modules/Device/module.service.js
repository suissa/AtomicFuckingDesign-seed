(function () {
  `use strict`;
  // só precisa mudar o valor de MODULE_NAME
  const MODULE_NAME = `Device`;
  const API = MODULE_NAME.toLowerCase() + 's';

  // const IP = '10.255.255.181'
  const IP = '127.0.0.1'
  const PORT = '8000'

  angular
    .module(`app.${MODULE_NAME}`)
    .service(`${MODULE_NAME}Service`, service);

  function service($http) {
    const BASE_URL = `http://${IP}:${PORT}/api/${API}`;
    let vm = this;

    vm.list = () =>
      $http({
        url: BASE_URL,
        method: `GET`
      })

    vm.get = (id) =>
      $http({
        url: BASE_URL +'/'+id,
        method: `GET`
      })
    vm.getByDeviceId = (id) =>
      $http({
        url: BASE_URL +'/filter?deviceId='+id,
        method: `GET`
      })

    vm.getSchema = () =>
      $http({
        url: BASE_URL + '/schema',
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
        url: `${BASE_URL}/${Form._id}`,
        method: `PUT`,
        data: Form
      })


    vm.updateDevicesToOff = () =>
      $http({
        url: `${BASE_URL}/setCSTATranslateOffline`,
        method: `POST`
      })

    vm.setDeviceMonitorStop = (crossRefId) =>
      $http({
        url: `${BASE_URL}/setDeviceMonitorStop/${crossRefId}`,
        method: `PUT`
      })

    vm.updateByDeviceId = (id, Form) =>
      $http({
        url: `${BASE_URL}/byDeviceId/${id}`,
        method: `PUT`,
        data: Form
      })

    vm.updateByInvokeId = (id, Form) =>
      $http({
        url: `${BASE_URL}/byInvokeId/${id}`,
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
