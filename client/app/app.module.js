(function () {
  'use strict';

  angular.module('app', [
    'app.core',
    'btford.socket-io',
    'app.User',
    'app.Course',
    ])

  .config(config)
  .controller('appCtrl', appCtrl)
  

  function config($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "app/home.html"
    });
    $urlRouterProvider.otherwise("/home");
  }
  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appCtrl($mdSidenav) {
    
   
    let vm = this;
    vm.appName = 'MonitorCall';
    vm.menus = [{
      label: 'Cadastro',
      active: true,
      path: '',
      itens: [{
        label: 'Usuários',
        active: true,
        path: 'users',
        itens: []
      }]
    }];

    vm.setMostrar = (esse) => {
      vm.mostar = esse
    };
    vm.getMostrar = () => vm.mostar;

    vm.showMobileMainHeader = true;
    vm.openSideNavPanel = function () {
      $mdSidenav('left').open();
    };
    vm.closeSideNavPanel = function () {
      $mdSidenav('left').close();
    };

    vm.menu = [{
      title: 'Dashboard',
      ref: "home",
      icon: "home"
    }
    , {
      title: 'Users',
      ref: "User-list",
      icon: "user"
    }
    , {
      title: 'Departments',
      ref: "Department-list",
      icon: "group"
    }
    , {
      title: 'Devices',
      ref: "Device-list",
      icon: "phone"
    }
    , {
      title: 'Pabx',
      ref: "Pabx-list",
      icon: "headphones"
    }
    , {
      title: 'Operation',
      ref: "Operation-list",
      icon: "cogs"
    }
      //         , {
      //   title: 'User Types',
      //   ref: "UserType-list",
      //   icon: "bolt"
      // }
      ];
    };
    appCtrl.$inject = ['$mdSidenav'];
  })();
