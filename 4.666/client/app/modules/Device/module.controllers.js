'use strict';

(function () {
  const MODULE_NAME = `Device`
  const MODULE_NOME = 'Dispositivos'
  const error = (err) => console.log(`Erro: `, err);

  angular
    .module(`app.${MODULE_NAME}`)
    .controller(`${MODULE_NAME}ListController`, ListController)
    .controller(`${MODULE_NAME}GetController`, GetController)
    .controller(`${MODULE_NAME}CreateController`, CreateController)
    .controller(`${MODULE_NAME}EditController`, EditController);

  function ListController(Service, MonitorSocket) {
    let vm = this;
    vm.MODULE_NAME = MODULE_NAME;
    vm.PATH = MODULE_NAME.toLowerCase();
    vm.dataChart = []


    vm.startMonitoring = (monitoring, deviceId) => {
      console.log('monitoring', monitoring)
      console.log('deviceId', deviceId)

      if (monitoring) return vm.sendCommand(deviceId)
      return Service.getByDeviceId(deviceId)
        // .then(deviceList => console.log('deviceList', deviceList))
        .then(deviceList => sendMonitorStop(deviceList.data[0]))
    }
    const success = (list) => {
      console.log(`${MODULE_NAME}ListControlleryyy`, list)
      vm.list = list.data

      vm.labels = ['MONITORANDO', 'NAO MONITORANDO']
      const ok = list.data.reduce((acc, cur) => (cur.crossRefId.length) ? acc + 1 : acc, 0)
      const total = list.data.length
      console.log('ok', ok)
      vm.dataChart.push(ok, total - ok)
      console.log('vm.labels', vm.labels)
      console.log('vm.total', vm.total)

      vm.series = ['devices monitorando'];
      vm.onClick = function (points, evt) {
        console.log(points, evt);
      };


      // vm.gridOptions = list.data
      // vm.gridOptions = {
      //   data: vm.list,
      //   excludeProperties: '__v created_at $$hashKey' };
      // console.log('vm.gridOptions', vm.gridOptions.data)
    }
    const successSchema = (caught) => {
      console.log('SCHEMAyyy', caught)
      vm.SCHEMA = caught.data;
    }
    Service
      .getSchema()
      .then(successSchema)
      .catch(error)

    vm.list = true
    Service
      .list()
      .then(success)
      .catch(error)

    const sendMonitorStop = (device) => {
      console.log('\n\n\nsendMonitorStop device:', device)
      if (!device) return alert('Selecione um DEVICE!')

      const command = '73'
      const crossRefId = device.crossRefId

      // if (command) {
        let commadToSend = `${command}`
        if (crossRefId) commadToSend += `,${crossRefId}`
        console.log('sendMonitorStop', commadToSend)
      //setDeviceMonitorStop
        MonitorSocket.emit('sendCommand', commadToSend)

      // }
    }
    vm.sendCommand = (deviceId) => {

      if (!deviceId) return alert('Selecione um DEVICE!')

      const command = '71'
      const caller = deviceId

      if (command) {
        let commadToSend = `${command}`
        if (caller) commadToSend += `,${caller}`
        console.log('commadToSend', commadToSend)

        MonitorSocket.emit('sendCommand', commadToSend)

      }
    }

    MonitorSocket.on('message', (msg) => {
      // vm.list.push(msg)
      const log = JSON.parse(msg)
      console.log('message: ', msg)

      // testa se eh req e pega o invokeId
      const isReq = (op) => (op.type === 'req')
      const isRes = (op) => (op.type === 'res')

      const request = log.filter(isReq)
      // const response = log.filter(isReq)
      // console.log('request response: ', request, response)

      if (request.length && log[0].invokeId !== 0) {
        //manda salvaro invokeId
        const invokeId = request[0].invokeId
        console.log('request: ', request)
        console.log('crossRefId: ', request[0].crossRefId)

        if (request[0].deviceId && request[0].op !== 'MonitorStop')
          Service
            .updateByDeviceId(request[0].deviceId, {invokeId})
        if (request[0].crossRefId && request[0].op === 'MonitorStop'){
          console.log('MonitorStop crossRefId: ', request[0].crossRefId)
                  Service
                    .setDeviceMonitorStop(request[0].crossRefId)}
      }

      // criar regrar apenas qnd eh um res sem erro
      if (log[0].type ==='res' && log[0].op === 'MonitorStop') {
        console.log('MonitorStop: ', log)
        return Service
                .setDeviceMonitorStop(log[0].crossRefId)
                .then(res => { --vm.dataChart[0]; ++vm.dataChart[1]})
      }

      if (log[0].type ==='res' && 
          log[0].invokeId && 
          log[0].op != 'systemStatus') {
        //manda salvaro invokeId
        // const invokeId = 0
        const crossRefId = log[0].crossRefId
        console.log('log[0]: ', log[0], {crossRefId})
        if (log[0].invokeId)
          Service
            .updateByInvokeId(log[0].invokeId, {crossRefId})
              .then(res => { ++vm.dataChart[0]; --vm.dataChart[1]})
      }

      // console.log('log: ', log, request)

    })



  }
  ListController.$inject = [`${MODULE_NAME}Service`, `MonitorSocket`];

  function GetController(Service, $stateParams) {
    let vm = this;
    vm.MODULE_NOME = MODULE_NOME
    vm.PATH = MODULE_NAME.toLowerCase()
    vm.list = []
    vm.entity = {}

    const error = (err) => console.log(`Erro: `, err);
    const success = (entity) => {
      console.log('getcontroller', entity)
      vm.entity = entity.data
    }

    Service
      .get($stateParams.id)
      .then(success)
      .catch(error)
  }
  GetController.$inject = [`${MODULE_NAME}Service`, `$stateParams`];

  function CreateController(Service, $stateParams, $state) {
    var vm = this;
    vm.MODULE_NOME = MODULE_NOME
    vm.PATH = MODULE_NAME.toLowerCase()
    vm.form = {}

    vm.title = "Cadastrar"

    const successSchema = (caught) => {
      console.log('SCHEMAyyy', caught)
      vm.SCHEMA = caught.data;
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

    vm.limpar = () => {
      vm.form = {};
    };

    vm.voltar = () => {
      $state.go(`${MODULE_NAME}-list`)
    };

  }
  CreateController.$inject = [`${MODULE_NAME}Service`, '$stateParams', '$state'];

  function EditController(Service, $stateParams, $state) {
    var vm = this;
    vm.MODULE_NOME = MODULE_NOME;
    vm.PATH = MODULE_NAME.toLowerCase();
    vm.form = {};
    vm.title = "Alterar";



    const successSchema = (caught) => {
      console.log('SCHEMAyyy', caught)
      vm.SCHEMA = caught.data;
    }
    Service
    .getSchema()
    .then(successSchema)
    .catch(error)


    Service
      .get($stateParams.id)
      .then((r) => {
        vm.form = r.data
      })
      .catch((e) => console.log(`Erro: ` + e));

    vm.salvar = () => {
      Service
        .update(vm.form)
        .then((r) => console.log(`${MODULE_NAME} alterado com sucesso :D`))
        .catch((e) => console.log(`Erro: ` + e))
    }

    vm.limpar = () => {
      vm.form = {};
    };

    vm.voltar = () => {
      $state.go(`${MODULE_NAME}-list`)
    };
  }
  EditController.$inject = [`${MODULE_NAME}Service`, `$stateParams`, `$state`]
})()
