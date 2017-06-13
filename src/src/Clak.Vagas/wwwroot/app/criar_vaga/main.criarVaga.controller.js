(function () {
    angular
    .module('mainModule')
    .controller('maincriarVagaoController', maincriarVagaController);

    (function maincriarVagaController(localStorageService, $state, $stateParams, $http, BASE_URL_API) {
        var vm = this;
        active();
        vm.enviarVaga = enviarVaga;

        vm.curriculo = {

            "userName": "",
            "senha": "",
            "nome": "",
            "dataNascimento": "",
            "endereco": "",
            "genero": "",
            "telefone": "",
            "email": "",
            "cpf": "",
            "formacao": "",
            "experiencia": ""
        };

        (function active() {
            var tipo = localStorageService.get('tipo');
            var id = localStorageService.get('login');
            if (id === null) {
                $state.go('vagas');
                return;
            }
            if (tipo !== undefined && tipo !== "adm") {
                $state.go('login');
            }


            (function enviarVaga() {

                $http
              .post(BASE_URL_API + "curriculos", vm.curriculo)
              .then(
                  function (result) {
                      alert("Vaga Criada com Sucesso!");
                  },
                  function (error) {
                      alert("Algo inesperado aconteceu. Tente novamente!");
                  }
              );


            })();
           
        })();
    })();
})();