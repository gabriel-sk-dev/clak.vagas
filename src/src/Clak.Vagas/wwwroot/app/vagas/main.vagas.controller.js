(function () {
    angular
    .module('mainModule')
    .controller('mainVagasController', mainVagasController);

    function mainVagasController($state, $http){
        var vm = this;
        vm.vagas = [];
        vm.abrirVaga = abrirVaga;
        ativar();
        function ativar() {
            $http
                .get("http://localhost:5000/api/Vagas")
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