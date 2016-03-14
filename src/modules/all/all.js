/**
 * @Created by Administrator
 * @Date 2016/1/11.
 * @author [haixiangtang@creditease.cn]
 */
define( [
    '../../app'
] , function ( controllers ) {
    controllers.controller( 'AllController' , [
        '$scope', '$http', '$mdMedia', '$mdDialog',
        function ( $scope, $http, $mdMedia, $mdDialog) {
            // for header
            $scope.title = "汇总";
            $http.post(window.ajaxUrl+'task/all', {
                "token": window.sessionStorage.token
            }).then(function(res){
                $scope.dataList = res.data.data;
            });
        }
    ] );
} );