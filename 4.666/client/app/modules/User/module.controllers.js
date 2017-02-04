'use strict';

(function () {
  const MODULE_NAME = `User`
  const error = (err) => console.log(`Erro: `, err);

  angular
    .module(`app.${MODULE_NAME}`)
    .controller(`${MODULE_NAME}ListController`, ListController)
    .controller(`${MODULE_NAME}GetController`, GetController)
    .controller(`${MODULE_NAME}CreateController`, CreateController)
    .controller(`${MODULE_NAME}EditController`, EditController);

  function ListController(Service) {
    let vm = this;
    vm.list = true
    vm.MODULE_NAME = MODULE_NAME;
    vm.PATH = MODULE_NAME.toLowerCase();

    const successSchema = caught => vm.SCHEMA = caught.data;
    const success = (list) => {
      vm.list = list.data
      // vm.gridOptions = list.data
      vm.gridOptions = {
        data: vm.list,
        excludeProperties: '__v created_at $$hashKey' };
      // console.log('vm.gridOptions', vm.gridOptions.data)
    }
    
    Service
      .getSchema()
      .then(successSchema)
      .catch(error)

    Service
      .list()
      .then(success)
      .catch(error)
  }
  ListController.$inject = [`${MODULE_NAME}Service`];

  function GetController(Service, $stateParams) {
    let vm = this;
    vm.MODULE_NAME = MODULE_NAME
    vm.PATH = MODULE_NAME.toLowerCase()
    vm.list = []
    vm.entity = {}

    const error = err => console.log(`Erro: `, err);
    const success = entity => vm.entity = entity.data

    Service
      .get($stateParams.id)
      .then(success)
      .catch(error)
  }
  GetController.$inject = [`${MODULE_NAME}Service`, `$stateParams`];

  function CreateController(Service, $stateParams, $state, $http) {
    var vm = this;
    vm.MODULE_NAME = MODULE_NAME
    vm.PATH = MODULE_NAME.toLowerCase()
    vm.form = {}
    vm.toPopulate = ['nada']
    vm.title = "Cadastrar"

    vm.limpar = () =>  vm.form = {};
    vm.voltar = () => $state.go(`${MODULE_NAME}-list`);

    const successSchema = (caught) => {
      console.log('SCHEMA', caught)
      vm.SCHEMA = caught.data;

      const BASE_URL = `http://localhost:8000/api`;

      const populateSelects = ( field => 
        $http({ 
            method: 'GET',
            url: `${BASE_URL}/${field.name}s`
          }).then( list => vm.toPopulate = list.data ) )

      const toPopulate = vm.SCHEMA
                                      .filter( field => ( field.element === 'select' ))
                                      .map( populateSelects)
    }
    Service
      .getSchema()
      .then(successSchema)
      .catch(error)

    vm.salvar = () => {
      Service
        .create(vm.form)
        .then((r) => console.log(`${MODULE_NAME} cadastrado com sucesso :D`))
        .catch((e) => console.log(`Erro: ` + e))
    }

  }
  CreateController.$inject = [`${MODULE_NAME}Service`, '$stateParams', '$state', '$http'];

  function EditController(Service, $stateParams, $state) {
    var vm = this;
    vm.MODULE_NAME = MODULE_NAME;
    vm.PATH = MODULE_NAME.toLowerCase();
    vm.form = {};
    vm.title = "Alterar";

    vm.limpar = () =>  vm.form = {};
    vm.voltar = () => $state.go(`${MODULE_NAME}-list`);


    vm.salvar = () => 
      Service
        .update(vm.form)
        .then( entity => console.log(`${MODULE_NAME} alterado com sucesso :D`))
        .catch( e => console.log(`Erro: ` + e))

    const successSchema = caught => vm.SCHEMA = caught.data;

    Service
      .getSchema()
      .then(successSchema)
      .catch(error)

    Service
      .get($stateParams.id)
      .then( entity => vm.form = entity.data )
      .catch( e => console.log(`Erro: ` + e));


  }
  EditController.$inject = [`${MODULE_NAME}Service`, `$stateParams`, `$state`]
})()
