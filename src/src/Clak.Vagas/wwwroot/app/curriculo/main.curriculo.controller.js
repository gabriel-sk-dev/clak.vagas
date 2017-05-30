(function () {
    angular
    .module('mainModule')
    .controller('mainCurriculoController', mainCurriculoController);

    function mainCurriculoController($http) {
        var vm = this;

        vm.enviarCurriculo = enviarCurriculo;

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
               .post("http://localhost:5000/api/curriculos", vm.curriculo)
               .then(
                   function (result) {
                       alert("Currículo enviado!");
                   },
                   function (error) {
                       alert("Algo inesperado aconteceu. Tente novamente!");
                   }
               );

            console.log(vm.curriculo);
        }
    }
})();