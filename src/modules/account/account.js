/**
 * @Created by Administrator
 * @Date 2016/1/11.
 * @author [haixiangtang@creditease.cn]
 */
define( [
    '../../app'
] , function ( controllers ) {
    controllers.controller( 'AccountController' , [
        '$scope', '$http', '$mdMedia', '$mdDialog',
        function ( $scope, $http, $mdMedia, $mdDialog) {
            $scope.title = "个人资料";
            $scope.user = {"token": window.sessionStorage.token};
            $http.post(window.ajaxUrl+"user/info", {"token": window.sessionStorage.token}).then(function (res) {
                if(!!res.data && !!res.data.data) {
                    $scope.user.nickname = res.data.data.nickname;
                    $scope.user.mobile = res.data.data.mobile;
                    $scope.user.email = res.data.data.email;
                    $scope.user.userrole = res.data.data.userrole;
                    $scope.user.username = res.data.data.username;
                    $scope.user.group = res.data.data.group;
                }
            });
            $scope.dialogModifyInfo = function ( ev ) {
                 $mdDialog.show({
                        controller: 'ModifyController',
                        templateUrl: 'modules/account/editUserinfo.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        openFrom: {
                            top: -90,
                            width: 30,
                            height: 80
                        },
                        locals: {
                            user: $scope.user
                        }
                    });
            }

        }

    ] ).controller( 'ModifyController' , [
        '$scope', '$http', '$mdMedia', '$mdDialog', '$state', 'user',
        function ( $scope, $http, $mdMedia, $mdDialog, $state, user) {
            $scope.user = user;
            $scope.groupList = [
                {"name": "产品经理", "group": "PM"},
                {"name": "UI设计师", "group": "UI"},
                {"name": "前端工程师", "group": "FE"},
                {"name": "APP工程师", "group": "APP"},
                {"name": "后端工程师", "group": "DEV"},
                {"name": "测试工程师", "group": "TEST"}
            ];
            $scope.cancel = function () {
                $mdDialog.hide();
            };
            $scope.submit = function () {
                $http.put(window.ajaxUrl+"user/info", $scope.user).then(function (res){
                    if(res.data.status === "success") {
                        delete window.sessionStorage.token;
                        return $state.go( 'login' , {} , { location : true } );
                    }
                });
            };
        }

    ] );
} );