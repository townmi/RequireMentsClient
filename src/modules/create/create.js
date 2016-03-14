/**
 * @Created by Administrator
 * @Date 2015/12/18.
 * @author [peili4@creditease.cn]
 */
define( [
    '../../app'
] , function ( controllers ) {
    controllers.controller( 'CreateController' , [
        '$scope', '$http', '$mdMedia', '$mdDialog',
        function ( $scope, $http, $mdMedia, $mdDialog) {

            $scope.formData = {reviewUser: null, token: window.sessionStorage.token};

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.priorities = [
                {
                    name: "普通",
                    value: 0
                },
                {
                    name: "重要",
                    value: 1
                },
                {
                    name: "严重",
                    value: 2
                },
                {
                    name: "紧急",
                    value: 3
                }
            ]
            $scope.submit = function() {

                $http.put(window.ajaxUrl+"task", $scope.formData).then(function (res) {
                    if(res.data.status === "success") {
                        alert(res.data.msg)
                    }
                    $mdDialog.hide();
                });
            };
            $http.post(window.ajaxUrl+"user/list", {
                "token": window.sessionStorage.token,
                "method": "review"
            }).then(function (res){
                 $scope.reviewList = res.data.data;
            });
        }

    ] );
} );