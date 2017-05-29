
(function () {
    angular
    .module('appModule')
    .controller('appController', appController);

    function appController($mdSidenav, $http, $state, localStorageService) {
        var vm = this;

        vm.curriculo = {
            "nome": "",
            "sobrenome": ""
        };

        vm.title = "PDM";
        vm.openMenu = openMenu;
        vm.openLogin = openLogin;
        vm.goToState = goToState;
        vm.estouLogado = estouLogado;
        vm.login = login;
        vm.user = {};
        vm.exibeErro = false;
        vm.abreCadastro = abreCadastro;
        vm.abrirCurriculo = abrirCurriculo;
        vm.abrirVagas = abrirVagas;
        vm.abrirHome = abrirHome;
        vm.exibeCadastro = false;
        vm.exibeLogin = true;
        vm.logout = logout;
        vm.loginCurriculo = false;


        function openMenu() {
            $mdSidenav('left').toggle();
        }

        function openLogin() {
            $mdSidenav('right').toggle();
        }

        function abreCadastro() {
            vm.exibeLogin = false;
            vm.exibeCadastro = true;
        }

        function abrirCurriculo() {
            $state.go('curriculo');
        }

        function abrirVagas() {
            $state.go('vagas');
        }

        function abrirHome() {
            $state.go('home');
        }

        function estouLogado() {
            return localStorageService.get('loginId');
        }

        function login() {
            vm.exibeErro = false;
            $http
                .get("http://localhost:5000/api/Login/" + vm.user.login)
                .then(
                    function (result) {
                        console.log(result);
                        var usuario = result.data;

                        if (usuario.senha === vm.user.senha) {
                            localStorageService.set('loginId', usuario.id);
                            localStorageService.set('tipo_user', usuario.tipo_user);
                        }
                        else {
                            vm.mensagem = "Senha inválida!"
                            vm.exibeErro = true;
                        }
                    },
                    function (error) {
                        vm.mensagem = "Nome do usuário ou senha inválido!"
                        vm.exibeErro = true;
                    }
                );

        }

        function logout() {
            localStorageService.set('loginId', null);
            localStorageService.set('tipo_user', null);
            $state.go('home');
        }

        function goToState(state) {

        }
    }

})();