(function () {

    angular
        .module('appModule', [
        'ui.router',
        'ngMaterial'
        ]);

    angular
    .module('appModule')
    .config(configAppModule)

    configAppModule.$inject = ['$stateProvider', '$urlRouterProvider'];
    function configAppModule($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home',
            {
                url: '/home',
                templateUrl: "app/home/main.home.view.html",
                controller: "mainHomeController",
                controllerAs: "vm"
            }
        );

    }

})();