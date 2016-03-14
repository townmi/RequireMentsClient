define( [
    '../../app'
] , function ( controllers ) {
    controllers.controller( 'UserManager' , function($scope,$mdDialog,$mdMedia,$http) {
        $http.get("/git/src/mock/user.json").success(//取数据
            function(respones){
                $scope.people=respones;
            }
        );
        $scope.title='用户管理';
        $scope.tableTitle = [//定义tabletitle
            { name: '用户名', img: 'resource/images/100-0.jpeg', newMessage: true ,url:'suiXinBao',group:'所在组',product:'负责需求',something:'操作'},
        ];
        $scope.showConfirm = function(ev) {//删除弹框
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete your debt?')
                .textContent('All of the banks have agreed to forgive you your debts.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Please do it!')
                .cancel('Sounds like a scam');
            $mdDialog.show(confirm).then(function() {
                $scope.status = 'You decided to get rid of your debt.';
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };

        $scope.showTabDialog = function(ev,people) {//修改弹框
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'modules/test/tabDialog.'+ people+'.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
    });
});
