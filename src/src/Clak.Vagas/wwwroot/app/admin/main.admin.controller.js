(function () {
    angular
       .module('mainModule')
       .controller('mainAdminController', mainAdminController);

    function mainAdminController(localStorageService, $state, $stateParams, $http, BASE_URL_API) {

        var vm = this;
        vm.VerCandidato = VerCandidato;
        vm.vagas = [
            {
                "id": 1,
                "titulo": "vaga1",
                "quantidade": 1
            }
        ]
        ativar();

        function ativar() {
            var tipo = localStorageService.get('tipo');
            var id = localStorageService.get('login');
            if (id === null) {
                $state.go('vagas');
                return;
            }
            if (tipo !== undefined && tipo !== "adm") {
                $state.go('login');
            }

            $http
                .get(BASE_URL_API+"vagas/admin")
                .then(
                    function (result) {

                        vm.vagas = result.data;

                    },
                    function (error) {

                    }
                )
        }
        function VerCandidato(vagaId) {
            console.log(vagaId);
            $state.go('listaCandidatos', { id: vagaId });

        }

        
    }

})();