/**
 * Created by Administrator on 2016/1/25.
 */
/**
 * @Created by Administrator
 * @Date 2015/12/18.
 * @author [peili4@creditease.cn]
 */
define( [
    '../../app',
    'vendor/angular/angular-material.min'
] , function ( directives ) {
    directives.directive( 'calendar' , function() {
        return {
            restrict: 'A',
            templateUrl: 'directive/calendar/calendar.html',
            scope: {
                date: '=',
                time: '='
            },
            compile:  function(element, attrs) {
                return this.link;
            },
            controller: 'CanlendarController',

            link: function (scope, element, attrs) {
            }
        };
    }).controller('CanlendarController',['$scope', '$element', '$attrs',function( $scope, $element, $attrs) {
        $scope.dateLabel = $attrs.dateLabel;
        $scope.timeLabel = $attrs.timeLabel;
        var date = new Date();
        $scope.minDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate());
        var timePanel = '<div class="ui-timepicker-panel md-whiteframe-1dp md-whiteframe-z1">'
            + '<div class="ui-timepicker-content">'
            + '<md-button class="md-button" data-time="9:30">10:30</md-button>'
            + '<md-button class="md-button" data-time="9:30">11:00</md-button>'
            + '<md-button class="md-button" data-time="9:30">13:00</md-button>'
            + '<md-button class="md-button" data-time="9:30">13:30</md-button>'
            + '<md-button class="md-button" data-time="9:30">14:00</md-button>'
            + '<md-button class="md-button" data-time="9:30">14:30</md-button>'
            + '<md-button class="md-button" data-time="9:30">15:00</md-button>'
            + '<md-button class="md-button" data-time="9:30">15:30</md-button>'
            + '<md-button class="md-button" data-time="9:30">16:00</md-button>'
            + '<md-button class="md-button" data-time="9:30">16:30</md-button>'
            + '<md-button class="md-button" data-time="9:30">17:00</md-button>'
            + '<md-button class="md-button" data-time="9:30">17:30</md-button>'
            + '</div>'
            + '</div>';

        $scope.showTimePanel = function(event) {
            event.stopPropagation();
            var button = event.target;
            var elPanel = document.body.querySelector('.ui-timepicker-panel');
            if(elPanel){
                angular.element(elPanel).off('click',selectTime );
                elPanel.parentNode.removeChild(elPanel);
                angular.element(document.body).off('click', clickOutside);
            } else {
                elPanel = angular.element(timePanel);
                elPanel.css({'left': getOffsetLeft($element[0]) + 'px', 'top': getOffsetTop($element[0]) + 40 + 'px'});
                elPanel.on('click', selectTime);
                angular.element(document.body).append(elPanel);
                angular.element(document.body).on('click', clickOutside);
            }
            function selectTime(event){
                event.stopPropagation();
                var target = angular.element(event.target);
                var buttons = elPanel.find('md-button');
                if(target.hasClass('md-button')) {
                    $scope.time = target.text();
                }
                button.click();
            }

            function clickOutside(event){
                var elPanel = document.body.querySelector('.ui-timepicker-panel');
                if(elPanel && (event.currentTarget != elPanel)) {
                    console.log('outside');
                    angular.element(elPanel).off('click',selectTime );
                    elPanel.parentNode.removeChild(elPanel);
                    angular.element(document.body).off('click', clickOutside);
                }
            }
        };

        function getOffsetLeft(el){
            var left=0;
            var offsetParent = el;
            while (offsetParent != null && offsetParent != document.body) {
                left += offsetParent.offsetLeft;
                offsetParent = offsetParent.offsetParent;
            }
            return left;
        }
        function getOffsetTop(el){
            var top=0;
            var offsetParent = el;
            while (offsetParent != null && offsetParent != document.body) {
                top += offsetParent.offsetTop;
                offsetParent = offsetParent.offsetParent;
            }
            return top;
        }
    }]);
} );