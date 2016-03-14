define( [
    '../../app',
    '../../service/StrEnc'
] , function ( controllers ) {
    controllers.controller( 'LoginController' , [
        '$scope' , 'UserLogin' , '$rootScope', '$urlRouter', 'StrEnc', '$state',
        function ( $scope , UserLogin, $rootScope, $urlRouter, StrEnc, $state ) {
            $scope.login = function () {
                $scope.sref="login";
                $rootScope.ajaxRequesting = true;
                UserLogin.login($scope.user).then(function () {
                    $rootScope.ajaxRequesting = false;
                    if($rootScope.login) {
                        $state.go( 'static.home' , {} , { location : true } );
                    } else {
                        $scope.loginMsg = $rootScope.loginMsg;
                    }
                });
            }
        }
    ] );
} );

