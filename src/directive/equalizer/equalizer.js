/**
 * @Created by Administrator
 * @Date 2015/12/18.
 * @author [peili4@creditease.cn]
 */
define( [
    '../../app'
] , function ( directives ) {
    directives.directive( 'equalizerTo' , function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                otherModelValue: '=equalizerTo'
            },
            link: function (scope, element, attrs, ctrl) {
                ctrl.$validators.equalizerTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };
                scope.$watch("otherModelValue", function() {
                    ctrl.$validate();
                });

            }
        };
    });
} );