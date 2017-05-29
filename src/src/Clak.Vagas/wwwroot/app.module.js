(function () {

    angular
        .module('mainModule', [
        'ui.router',
        'ngMaterial',
        'LocalStorageModule'

    ]);

    angular
    .module('mainModule')
    .config(configMainModule);

    function configMainModule($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/vagas');

        $stateProvider.state('vagas',
            {
                url: '/vagas',
                templateUrl: "app/vagas/main.vagas.view.html",
                controller: "mainVagasController",
                controllerAs: "vm"
            }
        );
        $stateProvider.state('vagaDetalhe',
           {
               url: '/vagaDetalhe',
               templateUrl: "app/detalhes/main.detalhes.view.html",
               controller: "mainDetalhesController",
               controllerAs: "vm"
           }
       );
        $stateProvider.state('login',
            {
                url: '/login',
                templateUrl: "app/login/main.login.view.html",
                controller: "mainLoginController",
                controllerAs: "vm"
            }
       );
        $stateProvider.state('home',
            {
                url: '/home',
                templateUrl: "app/home/main.home.view.html",
                controlle: "mainHomeController",
                controllerAs: "vm"
             }   
        );
    }
})();

