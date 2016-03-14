/**
 * @Created by Administrator
 * @Date 2015/12/18.
 * @author [peili4@creditease.cn]
 */
define( [
    '../../app'
] , function ( directives ) {
    directives.directive( 'sidebar' , function() {
        return {
            restrict: 'A',
            templateUrl: 'directive/sidebar/sidebar.html',
            scope: false
        };
    });
} );