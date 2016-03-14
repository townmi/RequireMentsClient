/**
 * @Created by Administrator
 * @Date 2015/12/18.
 * @author [peili4@creditease.cn]
 */
define( [
    '../../app'
] , function ( directives,$scope ) {
    directives.directive( 'process' , function() {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                var num = attrs.number;
                var html = [];
                var i = num;
                while(i-- > 0) {
                    if( num >= 9) {
                        html.push( '<span class="active-success"></span>');
                    } else if ( num >= 6 ) {
                        html.push( '<span class="active-primary"></span>');
                    } else if (num >= 3) {
                        html.push( '<span class="active-info"></span>');
                    } else {
                        html.push( '<span class="active-warn"></span>');
                    }

                }
                while(html.length < 9){
                    html.push( '<span></span>');
                }
                html = html.join('');
                element.append(html);

            }
        };
    });

} );