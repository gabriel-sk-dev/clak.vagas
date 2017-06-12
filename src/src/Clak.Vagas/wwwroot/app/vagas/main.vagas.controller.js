(function () {
    angular
    .module('mainModule')
    .controller('mainVagasController', mainVagasController);

    function mainVagasController($state, $http, BASE_URL_API) {
        var vm = this;
        vm.vagas = [];
        vm.abrirVaga = abrirVaga;

        ativar();

        function ativar() {
            $http
                .get(BASE_URL_API+"Vagas")
                .then(
                    function (result) {
                        vm.vagas = result.data;
                    },
                    function (error) { }
                );

        }
        function abrirVaga(id) {            
            $state.go('vagaDetalhe', { id: id });
        }
    }
})();