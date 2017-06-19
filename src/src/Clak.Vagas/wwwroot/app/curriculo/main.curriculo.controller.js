(function () {
    angular
    .module('mainModule')
    .controller('mainCurriculoController', mainCurriculoController);

    function mainCurriculoController($http, BASE_URL_API) {
        var vm = this;
        vm.enviarCurriculo = enviarCurriculo;
        vm.mostraLoad = true;
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
            "formacao":"",
            "experiencia": ""
        };

        function enviarCurriculo() {
            $http
               .post(BASE_URL_API+"curriculos", vm.curriculo)
               .then(
                   function (result) {
                       toastr["success"]("Currículo cadastrado com sucesso", "Sucesso");
                       $state.go('vagas');
                   },
                   function (error) {
                       toastr["error"]("Não foi possível incluir o currículo", "Falha");
                   })
                   .finally(function () {
                        vm.mostraLoad = false;
                    });
            }
    }
})();