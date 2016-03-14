/**
 * Created by Administrator on 2015/12/21.
 */
/**
 * @Created by Administrator
 * @Date 2015/12/18.
 * @author [peili4@creditease.cn]
 */
define( [
    '../../app'
] , function ( controllers ) {
    controllers.controller( 'HomeController' , [
        '$scope', '$http', '$mdMedia', '$mdDialog',
        function ( $scope, $http, $mdMedia, $mdDialog) {
            $scope.title = "首页";
            console.log(ajaxUrl);
            $scope.priorityNames = ['普通', '重要', '严重', '紧急'];

            $http.post(window.ajaxUrl+'task/', {
                "token": window.sessionStorage.token,
                "method": "home"
            }).then(function(res){
                $scope.dataList = res.data.data;
                $scope.user = res.data.user;
            });

            $scope.createItemDialog = function (ev){

                $mdDialog.show({
                    controller: 'CreateController',
                    templateUrl: '../src/modules/create/create.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
            }
        }

    ] );
} );