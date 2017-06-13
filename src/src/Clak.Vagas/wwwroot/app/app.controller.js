
(function () {
    angular
    .module('mainModule')
    .controller('appController', appController);

    function appController($mdSidenav, $http, $state, localStorageService, $rootScope, $stateParams, BASE_URL_API) {
        var vm = this;

        vm.curriculo = {
            "nome": "",
            "sobrenome": ""
        };

        vm.title = "Clak Vagas";
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
        vm.ativar = ativar;
        vm.nomeUsuario = "";


        ativar();
        function ativar() {
            $rootScope.$on('loginrealizado', function (event, data) {
                //console.log(data);
            });
        }
      
        function estouLogado() {
            vm.exibeLogin = true;
            var id = localStorageService.get('login');
            if (id == null)
                vm.exibeLogin = false;
            return vm.exibeLogin;
        }

        function openMenu() {
            $mdSidenav('left').toggle();
            //console.log('Teste');
        }

        function openLogin() {
            $mdSidenav('right').toggle();
            //console.log('Teste 1');
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

        function login() {
            vm.exibeErro = false;
            $http
                .get(BASE_URL_API+"Login/" + vm.user.login)
                .then(
                    function (result) {                        
                        var userBd = result.data;
                        if (userBd.senha === vm.user.senha) {
                            localStorageService.set('login', userBd.id);
                            localStorageService.set('tipo', userBd.tipo);
                            vm.nomeUsuario = userBd.userName;

                            console.log(result);

                            if (userBd.tipo === "adm") {
                                $rootScope.$broadcast('loginrealizado', 'asdasdasdasdasd');
                                vm.nomeUsuario = userBd.userName;
                                $state.go('admin');
                                return;
                            }
                            else {
                                //console.log($stateParams.vagaId);
                                if ($stateParams.vagaId > 0) {
                                    return $state.go('vagaDetalhe', { vagaId: $stateParams.vagaId });
                                }
                                return $state.go('vagas');
                            }
                        }
                    },
                    function (error) {
                        vm.mensagem = "Nome do usuário ou senha errado!"
                        vm.exibeErro = true;
                    }
                );

        }

        function logout() {
            localStorageService.set('login', null);
            localStorageService.set('tipo', null);
            $state.go('home');
        }

        function goToState(state) {

        }
    }

})();