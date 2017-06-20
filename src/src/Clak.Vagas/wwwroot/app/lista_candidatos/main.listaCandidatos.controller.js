(function () {
    angular
        .module('mainModule')
        .controller('mainlistaCandidatosController', mainlistaCandidatosController);

    function mainlistaCandidatosController(localStorageService, $http, $state, $stateParams, BASE_URL_API) {
        
        var vm = this;
        vm.VerCandidato = verCandidato;
        vm.idVaga = $stateParams.id;
        ativar();

        function ativar() {
            var tipo = localStorageService.get('tipo');
            var id = localStorageService.get('login');
            if (id === null) {
                $state.go('admin');
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
                    })
                    .finally(function () {
                           vm.mostraLoad = false;
                     });
        }
        function verCandidato(curriculoId) {            
            $state.go('curriculoCandidato', { id: curriculoId, vagaId: vm.idVaga });
        }

    }

})();