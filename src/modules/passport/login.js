define( [
    '../../app',
    '../../services/StrEnc'
] , function ( controllers ) {
    controllers.controller( 'LoginController' , [
        '$scope' , 'UserLogin' , '$rootScope', '$urlRouter', 'StrEnc',
        function ( $scope , UserLogin, $rootScope, $urlRouter, StrEnc ) {
            $scope.title = "登录";
        }
    ] );
} );

