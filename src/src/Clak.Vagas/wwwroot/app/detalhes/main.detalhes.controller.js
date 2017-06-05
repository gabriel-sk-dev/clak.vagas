(function () {
    angular
    .module('mainModule')
    .controller('mainDetalhesController', mainDetalhesController);

    function mainDetalhesController($state, $http, $stateParams, localStorageService, $mdSidenav) {
        var vm = this;
        vm.abrirCurriculo = abrirCurriculo;
        vm.vaga = {};
        vm.registro = {
            "id_curriculos": "",
            "id_vagas": ""
        }
        ativar();
        function ativar() {
            $http
                .get("http://localhost:5000/api/Vagas/" + $stateParams.id)
                .then(
                    function (result) {
                        vm.vaga = result.data;
                    },
                    function (error) { }
                );
        }
        function abrirCurriculo() {
            var loginId = localStorageService.get('loginId');
            //console.log(loginId);
            if (loginId === null)
                $mdSidenav('right').toggle();
            else {
                vm.registro.id_curriculos = loginId;
                vm.registro.id_vagas = $stateParams.id;
                $http
                    .post("http://localhost:5000/api/Vagas/inscricao", vm.registro)
                    .then(
                        function (result) {
                            alert("Currículo enviado!");
                            vm.registro = result.data;
                            $state.go('vagas');
                        },
                        function (error) {
                            //console.log(error);
                            alert("Algo inesperado aconteceu. Tente novamente!");
                        }
                    );
            }

        }
    }
})();