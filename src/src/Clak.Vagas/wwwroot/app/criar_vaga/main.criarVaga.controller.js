(function () {
    angular
    .module('mainModule')
    .controller('mainCriarVagaController', mainCriarVagaController);

    function mainCriarVagaController(localStorageService, $state, $stateParams, $http, BASE_URL_API) {
        var vm = this;
        active();
        vm.enviarVaga = enviarVaga;
        vm.mostraLoad = t
        vm.criarVaga = {
            "titulo": "",
            "detalhes": "",
            "requisitos": "",
            "salario": "",
            "cargaHoraria": "",
            "tipoContratacao": "",
            "status": "Aberta"
        };

        function active() {
            var tipo = localStorageService.get('tipo');
            var id = localStorageService.get('login');
            if (id === null) {
                $state.go('vagas');
                return;
            }
            if (tipo !== undefined && tipo !== "adm") {
                $state.go('login');
            }
        }


        function enviarVaga() {
             $http
                  .post(BASE_URL_API + "vagas", vm.criarVaga)
                  .then(
                      function (result) {
                          toastr["success"]("Currículo cadastrado com sucesso", "Sucesso");;
                      },
                      function (error) {
                          toastr["error"]("Não foi possível criar a vaga", "Erro");
                      })
                      .finally(function () {
                          vm.mostraLoad = false;
                      });
             console.log(vm.criarVaga);
        }
    }
})();