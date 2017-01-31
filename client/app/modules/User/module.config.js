(function () {
  `use strict`;
  const MODULE_NAME = `User`;
  const MODULE_PATH = `app/modules`;
  const CONTROLLERAS = `vm`;
  const PATH = MODULE_NAME.toLowerCase();

  angular
    .module(`app.${MODULE_NAME}`, [])
    .config(config);


  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      // .state(`${MODULE_NAME}-list`, {
      //   url: `/${PATH}`,
      //   templateUrl: `${MODULE_PATH}/${MODULE_NAME}/views/data.html`,
      //   controller: `${MODULE_NAME}ListController`,
      //   controllerAs: CONTROLLERAS
      // })
      .state(`${MODULE_NAME}-list`, {
        url: `/${PATH}/`,
        templateUrl: `${MODULE_PATH}/${MODULE_NAME}/views/data.html`,
        controller: `${MODULE_NAME}ListController`,
        controllerAs: CONTROLLERAS
      })
      .state(`${MODULE_NAME}-create`, {
        url: `/${PATH}/create`,
        templateUrl: `${MODULE_PATH}/${MODULE_NAME}/views/form.html`,
        controller: `${MODULE_NAME}CreateController`,
        controllerAs: CONTROLLERAS
      })
      .state(`${MODULE_NAME}-get`, {
        url: `/${PATH}/:id`,
        templateUrl: `${MODULE_PATH}/${MODULE_NAME}/views/data.html`,
        controller: `${MODULE_NAME}GetController`,
        controllerAs: CONTROLLERAS
      })
      .state(`${MODULE_NAME}-edit`, {
        url: `/${PATH}/:id/edit`,
        templateUrl: `${MODULE_PATH}/${MODULE_NAME}/views/form.html`,
        controller: `${MODULE_NAME}EditController`,
        controllerAs: CONTROLLERAS
      });
  }
  config.$inject = ['$stateProvider', '$urlRouterProvider'];
})()
