(function () {
    angular
        .module('mainModule')
        .controller('mainlistaCandidatosController', mainlistaCandidatosController);

    function mainlistaCandidatosController(localStorageService, $http, $state, $stateParams, BASE_URL_API) {
        
        var vm = this;
        vm.VerCandidato = verCandidato;
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
                .get(BASE_URL_API+"vagas/admin/candidatos/" + $stateParams.id)
                .then(
                    function (result) {
                        vm.vagas = result.data;

                    },
                    function (error) {
                    }
            )
        }
        function verCandidato(vagaId) {
            console.log(vagaId);
            $state.go('curriculoCandidato', { id: vagaId });
        }

    }

})();