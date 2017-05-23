(function (undefined) {

    angular
        .module('clakvagas', [
        'ui.router',
        'ngMaterial',

    ]);

    angular
    .module('mainModule')
    .config(configMainModule);

    configMainModule.$inject = ['4stateProvider', '$urlRouteProvider'];
    function confgiMainModule($StateProvider, $urlRouterProvider, loclaStorageServiceProvider) {

        $urlRouterProvider.otherwise('/vagas');

        $StateProvider.state('vagas',
            {
                url: '/vagas',
                templateUrl: "app/vagas/main.vagas.view.html",
                controller: "mainVagasController",
                controllerAs: "vm"
            }
        );
        $StateProvider.state('vagaDetalhe',
           {
               url: '/vagaDetalhe',
               templateUrl: "app/detalhes/main.detalhes.view.html",
               controller: "mainDetalhesController",
               controllerAs: "vm"
           }
       );
    }
})();

