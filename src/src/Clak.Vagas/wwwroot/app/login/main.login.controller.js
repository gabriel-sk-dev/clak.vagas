(function () {
    angular
        .module('mainModule')
        .controller('mainLoginController', mainLoginController);

    function mainLoginController($http, $state, localStorageService, $rootScope, $stateParams) {
        var vm = this;
        vm.user = {};
        vm.validateAccount = validateAccount;
        vm.goToCadastrar = goToCadastrar;

        activate();

        function validateAccount() {
            vm.error = "";
            $http
                .get("http://localhost:5000/api/login/" + vm.user.userName)
                .then(

                    function (result) {
                        var userBd = result.data;
                        if (userBd.senha === vm.user.senha) {
                            localStorageService.set('login', userBd.id);
                            localStorageService.set('tipo', userBd.tipo);
                            if (userBd.tipo === "adm") {
                                $rootScope.$broadcast('loginrealizado', 'asdasdasdasdasd');
                                $state.go('admin');
                                return;
                            } else {
                                console.log($stateParams.vagaId);
                                if ($stateParams.vagaId > 0) {
                                    return $state.go('vagaDetalhe', { vagaId: $stateParams.vagaId });
                                }
                                return $state.go('vagas');
                            }
                        }
                        vm.error = "User/senha inválidos";
                    },

                    function (error) {

                        console.log("deu merda");
                    }
                );
            console.log('depois de chamar o http;');
        }

        function activate() {

        }

        function goToCadastrar() {
            $state.go('vagas')
        }

    }

})();