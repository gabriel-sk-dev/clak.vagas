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
               url: '/vagaDetalhe/{id}',
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
                controller: "mainHomeController",
                controllerAs: "vm"
             }   
        );
        $stateProvider.state('admin',
            {
                url: '/admin',
                templateUrl: "app/admin/main.admin.view.html",
                controller: "mainAdminController",
                controllerAs: "vm"
            }
        );
        $stateProvider.state('listaCandidatos',
          {
              url: '/listaCandidatos/{id}',
              templateUrl: "app/lista_candidatos/main.listaCandidatos.view.html",
              controller: "mainlistaCandidatosController",
              controllerAs: "vm"
          }
         );
        $stateProvider.state('curriculoCandidato',
          {
              url: '/curriculoCandidato',
              templateUrl: "app/curriculo_candidatos/main.curriculoCandidato.view.html",
              controller: "maincurriculoCandidatoController",
              controllerAs: "vm"
          }
        );
        $stateProvider.state('curriculo',
       {
           url: '/curriculo',
           templateUrl: "app/curriculo/main.curriculo.view.html",
           controller: "mainCurriculoController",
           controllerAs: "vm"
       }
 );
    }
})();

