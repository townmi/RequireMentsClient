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
    controllers.controller( 'OrganizationController' , [
        '$scope', '$http', '$mdMedia', '$mdDialog',
        function ( $scope, $http, $mdMedia, $mdDialog) {
            // for header
            $scope.title = "组织";
            $scope.accordion = {};
            $scope.staff = {
                "leader": "项目主管",
                "product": "产品经理",
                "frontend":"前端人员",
                "developer": "开发人员",
                "tester": "测试人员"
            }
            $scope.current = '';
            $scope.accordionNavigation = function(target, $event) {
                var element = angular.element(document.getElementById(target));
                if($scope.current == target) {
                    element.toggleClass('organization-pop-content');
                    element.children().eq(2).toggleClass('hide');
                } else {
                    var current = angular.element(document.getElementById($scope.current));
                    current.removeClass('organization-pop-content');
                    current.children().eq(2).addClass('hide');
                    element.addClass('organization-pop-content')
                    element.children().eq(2).removeClass('hide');
                }
                $scope.current = target;

            };

            $http.post(window.ajaxUrl+'user/list', {
                "token": window.sessionStorage.token
            }).then(function(res){
                $scope.dataList = res.data.data;
            });


        }


    ] );
} );