(function () {
    angular
        .module('mainModule')
        .controller('mainlistaCandidatosController', mainlistaCandidatosController);

    function mainlistaCandidatosController() {

        function ativar() {
            var tipo = localStorageService.get('tipo');
            var id = localStorageService.get('login');
            if (id === null) {
                $state.go('vagas', { vagaId: $stateParams.vagaId });
                return;
            }
            if (tipo !== undefined && tipo !== "adm") {
                $state.go('login');
            }

            $http
                .get("http://localhost:5000/api/listaCandidatos/admin")
                .then(
                    function (result) {

                        vm.vagas = result.data;

                    },
                    function (error) {

                    }
                )
        }

    }

})();