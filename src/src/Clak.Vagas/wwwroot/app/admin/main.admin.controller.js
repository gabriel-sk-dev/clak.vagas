(function () {
    angular
       .module('mainModule')
       .controller('mainAdminController', mainAdminController);

    function mainAdminController(localStorageService, $state, $stateParams, $http) {

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
                $state.go('vagas', { vagaId: $stateParams.vagaId });
                return;
            }
            if (tipo !== undefined && tipo !== "adm") {
                $state.go('login');
            }

            $http
                .get("http://localhost:5000/api/vagas/admin")
                .then(
                    function (result) {

                        vm.vagas = result.data;

                    },
                    function (error) {

                    }
                )
        }
        function VerCandidato() {
            $state.go('curriculos')
        }
    }

})();