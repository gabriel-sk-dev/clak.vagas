(function () {
    angular
        .module('mainModule')
        .controller('maincurriculoCandidatoController', maincurriculoCandidatoController);

    function maincurriculoCandidatoController(localStorageService, $http, $state, $stateParams, BASE_URL_API) {
        var vm = this;
        vm.ImprimirCurriculo = ImprimirCurriculo;
        active();

        function active() {
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
                .get(BASE_URL_API+"vagas/admin/candidatos/curriculo/" + $stateParams.id)
                .then(
                    function (result) {
                        console.log('resultado ', result);
                        vm.curriculo = result.data;

                    },
                    function (error) {
                        console.log('deu merda');
                    })
                    .finally(function () {
                         vm.mostraLoad = false;
                    });
        }
    }
    function ImprimirCurriculo() {
        window.print();
    }

})();