/**
 * @Created by Administrator
 * @Date 2015/12/18.
 * @author [peili4@creditease.cn]
 */
define( [
    '../../app'
] , function ( directives ) {
    directives.directive( 'header' , [ '$rootScope', function($rootScope) {
        return {
            restrict: 'A',
            templateUrl: 'directive/header/header.html',
            scope: false,
            compile:  function(element, attrs) {
                var type = attrs.type;
                var html = '';
                if(/login|reg/.test(type)){
                    html =' <md-button class="md-mini" aria-label="Account" ng-href="{{sref.url}}">'
                        + '<md-icon class="material-icons">account_circle</md-icon> {{sref.name}}'
                        + '</md-button>';
                } else if(/main/.test(type)) {
                    html = '<md-menu-bar><md-menu>'
                            + '<button class="md-icon-button" aria-label="Account" ng-click="$mdOpenMenu()">'
                            + '<md-icon class="material-icons">account_circle</md-icon>'
                            + '</button>'
                            + '<md-menu-content>'
                            + '<md-menu-item> <md-button">账号设置</md-button> </md-menu-item>'
                            + '<md-menu-item ng-if="isAdmin()"> <md-button href="index.html#/static/user">用户管理</md-button> </md-menu-item>'
                            + '<md-menu-divider></md-menu-divider>'
                            + '<md-menu-item><md-button ng-click="logout()">退出 </md-button> </md-menu-item>'
                            + '</md-menu-content>'
                            + '</md-menu></md-menu-bar>';
                }
                element.find('div').append(html);
                return this.link;
            },
            controller: function( ) {


            },
            link: function (scope, element, attrs) {
                var $scope = scope;
                var $attrs = attrs;
                var type = $attrs.type;
                var html = "";
                if(/reg/gi.test(type)) {
                    $scope.sref = {
                        name: "登录",
                        url: "index.html#/login"
                    };
                    $scope.title = "注册";
                } else if(/login/gi.test(type)) {
                    $scope.sref = {
                        name: "注册",
                        url: "index.html#/reg"
                    };
                    $scope.title = "登录";

                }
                $scope.isAdmin = function () {
                    return ($rootScope.user || {}).userid == '3';
                };
                $scope.toggleSidebar = function() {
                    var layout = angular.element(document.getElementById('layout'));
                    layout.children().eq(0).toggleClass('sidebar-hide');
                    layout.toggleClass('inner-wrap');
                }

            }
        };
    }]).directive('account-menu', function(){
        return {
            priority: 10,
            restrict: 'A',
            templateUrl: 'directive/header/header.html'
        }
    });

} );