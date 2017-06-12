(function () {
    'use strict';
    if (window.location.hostname === "localhost") {
        angular
            .module('mainModule')
            .constant('BASE_URL_API', 'http://localhost:5000/api/');
    }
    else {
        angular
            .module('mainModule')
            .constant('BASE_URL_API', window.location.origin + '/api/');
    }
})();