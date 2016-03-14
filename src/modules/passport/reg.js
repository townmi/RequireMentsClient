define( [
    '../../app',
    '../../service/StrEnc',
    '../../service/UserTokenService'
] , function ( controllers ) {
    controllers.controller( 'regController' , [
        '$q', '$scope', '$state', '$rootScope', 'StrEnc', '$http', 'UserToken',
        function ($q, $scope , $state, $rootScope, StrEnc, $http, UserToken) {
            $scope.sref = "reg";
            $scope.user = {};

            $scope.register = function () {
                $rootScope.ajaxRequesting = true;
                var tmpname = $scope.user.tmpname;
                var formData = {"tmpname": tmpname};
                formData.password = StrEnc.strEnc($scope.user.password, tmpname, tmpname, tmpname);
                formData.passwordrepeat = StrEnc.strEnc($scope.user.passwordrepeat, tmpname, tmpname, tmpname);
                
                $http.put(window.ajaxUrl+"user", formData).then(function (res) {
                    $rootScope.ajaxRequesting = false;
                    if(!!res.data && res.data.status === "success" && !!res.data.token) {
                        UserToken.writeToke(res.data);
                        $state.go( 'static.home' , {} , { location : true } );
                    } else {
                        $scope.regMsg = res.data.msg;
                    }
                })
                
            }
        }
    ] );
} );

