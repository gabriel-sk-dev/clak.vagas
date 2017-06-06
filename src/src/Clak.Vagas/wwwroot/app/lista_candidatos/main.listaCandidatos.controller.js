(function () {
    angular
        .module('mainModule')
        .controller('mainlistaCandidatosController', mainlistaCandidatosController);

    function mainlistaCandidatosController(localStorageService, $http, $state, $stateParams) {

        var vm = this;
        ativar();

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
                .get("http://localhost:5000/api/vagas/admin/listacandidatos/" + $stateParams.id)
                .then(
                    function (result) {
                        console.log('resultado ', result);
                        vm.vagas = result.data;

                    },
                    function (error) {
                        console.log('deu merda');
                    }
            )
        }

    }

})();