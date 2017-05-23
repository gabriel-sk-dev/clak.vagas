(function (undefined) {

    angular
        .module('maiModule', [
        'ui.router',
        'ngMaterial',

    ]);

    angular
    .module('mainModule')
    .config(configMainModule);

    function confgiMainModule($StateProvider, $urlRouterProvider) {

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
    }
})();

