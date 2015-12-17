define( [
    '../../app',
    '../../services/StrEnc'
] , function ( controllers ) {
    controllers.controller( 'regController' , [
            '$scope', '$state', '$rootScope', 'StrEnc', 'timeout', '$http',
            function ($scope , $state, $rootScope, $StrEnc, $timeout, $http) {
                $scope.title = "注册";
                $scope.formData = {};
            }
        ] );
} );

