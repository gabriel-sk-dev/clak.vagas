(function () {
    angular
    .module('mainModule')
    .controller('mainDetalhesController', mainDetalhesController);

    function mainDetalhesController($state, $http, $stateParams, localStorageService, $mdSidenav, BASE_URL_API) {
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
                .get(BASE_URL_API+"Vagas/" + $stateParams.id)
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
                    .post(BASE_URL_API+"Vagas/inscricao", vm.registro)
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