/**
 * @Created by Administrator
 * @Date 2015/12/18.
 * @author [peili4@creditease.cn]
 */
define( [
    '../../app'
] , function ( controllers ) {
    controllers.controller( 'InfoController' , [
        '$scope', '$http','$animate', '$timeout','$state', '$rootScope', '$mdDialog', 'UserToken',
        function ( $scope, $http, $animate, $timeout, $state, $rootScope ,$mdDialog, UserToken) {
            // for header
            $scope.title = "详情";
            function init() {
                $timeout(function(){
                    var li =  angular.element(document).find('main').find('ol').children();
                    var div = li.eq(li.length - 1).find('section').eq(1).children().eq(0);
                    if(div.length > 0)
                        div.css({'height': div[0].clientHeight + 'px'});
                }, 1000);
                $scope.priorityNames = ['普通', '重要', '严重', '紧急'];
                judgeOperationMenu();
                $scope.demo = {};
                $scope.demo.show = $scope.operations.length > 0;
            }

            function judgeEditOperation(operations){
                if($scope.data.creatorid == $scope.data.user.id) { // 当需求的创建者是登录用户时，在process=1的情况下，用户有编辑+删除的操作
                    operations.push({
                        'name': '编辑',
                        'icon': 'mode_edit',
                        'type': 'process_1_edit'
                    })
                }
            }

            function judgeUploadFileOperation(operations) {
                if($scope.data.creatorid == $scope.data.user.id && ( $scope.data.taskstatus >= 1 && $scope.data.taskstatus < 9)) {
                    operations.push({
                        'name': '准备材料',
                        'icon': 'add',
                        'type': 'process_2_pass'
                    })
                }
            }

            function judgeOperationMenu() {
                var operations = [];
                switch ($scope.data.taskstatus) {
                    case 0:
                        judgeEditOperation(operations);
                        if($scope.data.reviewid == $scope.data.user.id) { // 当需求的审核者是登录用户时，在process=1的情况下，用户有通过和退回该需求的操作
                            operations.push({
                                'name': '通过',
                                'icon': 'thumb_up',
                                'type': 'process_1_agree'
                            });
                            operations.push({
                                'name': '退回',
                                'icon': 'thumb_down',
                                'type': 'process_1_disagree'
                            });
                        }
                        break;
                    case 1:
                        if(true) {
                            judgeEditOperation(operations);
                        }
                        break;
                    case 2:
                        judgeEditOperation(operations);
                        if($scope.data.creatorid == $scope.data.user.id) {
                            operations.push({
                                'name': '提交',
                                'icon': 'check',
                                'type': 'process_3_submit'
                            })
                        }
                        break;
                    case 3:
                        judgeEditOperation(operations);
                        if(!!$scope.data.teams && !!$scope.data.teams.length && $rootScope.user.userrole === "header") {
                            for(var i = 0; i < $scope.data.teams.length; i++) {
                                if($rootScope.user.group === $scope.data.teams[i].group) {
                                    operations.push({
                                        'name': '分派人员',
                                        'icon': 'supervisor_account',
                                        'type': 'process_4_arrange'
                                    })
                                }
                            }
                        }
                        if($scope.data.creatorid == $scope.data.user.id) {
                            operations.push({
                                'name': '提交',
                                'icon': 'check',
                                'type': 'process_4_submit'
                            })
                        }
                        break;
                    case 4:
                        if(!$scope.data.islocked) {
                            judgeEditOperation(operations);
                            if(!!$scope.data.teams && !!$scope.data.teams.length && $rootScope.user.userrole === "header") {
                                for(var i = 0; i < $scope.data.teams.length; i++) {
                                    if($rootScope.user.group === $scope.data.teams[i].group) {
                                        operations.push({
                                            'name': '分派人员',
                                            'icon': 'supervisor_account',
                                            'type': 'process_4_arrange'
                                        })
                                    }
                                }
                            }
                            if($scope.data.creatorid == $scope.data.user.id) {
                                operations.push({
                                    'name': '提交',
                                    'icon': 'check',
                                    'type': 'process_5_submit'
                                })
                            }
                        }
                        break;
                    case 5:
                        judgeEditOperation(operations);
                        if(!!$scope.data.teams && !!$scope.data.teams.length && $rootScope.user.userrole === "header") {
                            for(var i = 0; i < $scope.data.teams.length; i++) {
                                if($rootScope.user.group === $scope.data.teams[i].group) {
                                    operations.push({
                                        'name': '分派人员',
                                        'icon': 'supervisor_account',
                                        'type': 'process_4_arrange'
                                    });
                                    operations.push({
                                        'name': 'DeadLine',
                                        'icon': 'access_time',
                                        'type': 'process_6_deadline'
                                    });
                                }
                            }
                        }
                        if($scope.data.creatorid == $scope.data.user.id) {
                            operations.push({
                                'name': '提交',
                                'icon': 'check',
                                'type': 'process_6_submit'
                            });
                        }
                        break;
                    case 6:
                        judgeEditOperation(operations);
                        if($rootScope.user.group == 'DEV'){
                            operations.push({
                                'name': '提交',
                                'icon': 'check',
                                'type': 'process_7_submit'
                            });
                        }
                        break;
                    case 7:
                        judgeEditOperation(operations);
                        if($rootScope.user.organization == 'TEST_Leader'){
                            operations.push({
                                'name': '提交',
                                'icon': 'check',
                                'type': 'process_8_submit'
                            });
                        }
                        break;
                    case 8:
                        judgeEditOperation(operations);
                        if($scope.data.creatorid == $scope.data.user.id) {
                            operations.push({
                                'name': '提交',
                                'icon': 'check',
                                'type': 'process_9_submit'
                            });
                        }
                        break;


                }
                judgeUploadFileOperation(operations);
                $scope.operations = operations;
            }

            $scope.openDialog = function($event, type, data) {
                switch(type) {
                    case 'process_1_edit':
                        $mdDialog.show({
                            controller: 'ProcessEditInfoController' ,
                            templateUrl: 'modules/info/processOneEdit.tmpl.html',
                            parent: angular.element(document.body),
                            targetEvent: $event,
                            clickOutsideToClose:true,
                            locals: {
                                data: angular.copy($scope.data)
                            }
                        });
                        break;
                    case 'process_1_agree':
                        $mdDialog.show({
                            controller: 'ProcessAgreeRequirementController',
                            template: '<md-dialog aria-label="审核通过">'
                                    + ' <md-dialog-content class="md-dialog-content" style="width: 500px;">'
                                    + '<h2 class="md-title">审核通过</h2>'
                                    + '<div class="md-dialog-content-body">'
                                    + ' <md-input-container class="md-block" >'
                                    + '<label>评语</label>'
                                    + '<input ng-model="data.comment">'
                                    + '</md-input-container>'
                                    + '</div>'
                                    + '</md-dialog-content>'
                                    + '<md-dialog-actions >'
                                    + '<md-button ng-click="cancel()">取消</md-button>'
                                    + '<md-button  class="md-primary" ng-click="agree()">确定</md-button>'
                                    + '</md-dialog-actions>'
                                    + '</md-dialog>',
                            parent: angular.element(document.body),
                            targetEvent: $event,
                            locals: {
                                taskInfo: $scope.data
                            },
                            clickOutsideToClose: true
                        });
                        break;
                    case 'process_1_disagree':
                        $mdDialog.show({
                            controller: 'ProcessDisagreeRequirementController',
                            template: '<md-dialog aria-label="审核通过">'
                                    + ' <md-dialog-content class="md-dialog-content" style="width: 500px;">'
                                    + '<h2 class="md-title">审核退回</h2>'
                                    + '<div class="md-dialog-content-body">'
                                    + ' <md-input-container class="md-block" >'
                                    + '<label>原因</label>'
                                    + '<input ng-model="status_1_data.comment">'
                                    + '</md-input-container>'
                                    + '</div>'
                                    + '</md-dialog-content>'
                                    + '<md-dialog-actions >'
                                    + '<md-button ng-click="cancel()">取消</md-button>'
                                    + '<md-button  class="md-primary" ng-click="disAgree()">确定</md-button>'
                                    + '</md-dialog-actions>'
                                    + '</md-dialog>',
                            parent: angular.element(document.body),
                            targetEvent: $event,
                            locals: {
                                taskInfo: $scope.data
                            },
                            clickOutsideToClose:true
                        });
                        break;
                    case 'process_2_pass':
                        $mdDialog.show({
                            controller: 'ProcessUploadFilesController',
                            templateUrl: 'modules/info/processUploadFiles.tmpl.html',
                            parent: angular.element(document.body),
                            targetEvent: $event,
                            locals: {
                                taskInfo: $scope.data
                            },
                            clickOutsideToClose:true
                        });
                        break;
                    case 'process_3_submit':
                        $mdDialog.show({
                            controller: 'ProcessChooseTeamController',
                            template: '<md-dialog aria-label="策划方案" >'
                                + ' <md-dialog-content class="md-dialog-content" style="width: 500px;">'
                                + '<h2 class="md-title">人员分派</h2>'
                                + '<div class="md-dialog-content-body">'
                                + '<p>请选择需要进行人员分派的组织：</p>'
                                + '<md-checkbox  ng-checked="exists(item.group, selected)" ng-click="toggle(item.group, selected)" ng-repeat="item in checktypes">'
                                + '{{ item.groupstr }}'
                                + '</md-checkbox>'
                                + '</div>'
                                + '</md-dialog-content>'
                                + '<md-dialog-actions >'
                                + '<md-button ng-click="cancel()">取消</md-button>'
                                + '<md-button  class="md-primary" ng-click="submit()">确定</md-button>'
                                + '</md-dialog-actions>'
                                + '</md-dialog>',
                            parent: angular.element(document.body),
                            targetEvent: $event,
                            locals: {
                                taskInfo: $scope.data
                            },
                            clickOutsideToClose:true
                        });
                        break;
                    case 'process_4_arrange':
                        $mdDialog.show({
                            controller: 'ProcessArrangeStaffController' ,
                            templateUrl: 'modules/info/processArrangeStaff.tmpl.html',
                            parent: angular.element(document.body),
                            targetEvent: $event,
                            locals: {
                                taskInfo: $scope.data
                            },
                            clickOutsideToClose:true
                        });
                        break;
                    case 'process_4_submit':
                        var confirm = $mdDialog.confirm()
                            .title('请您确定人员配置是否合格，如果不能满足，请联系各个开发的小组长？')
                            .textContent('提交后本需求将锁定24小时，如果该需求非常紧急请联系您的主管！')
                            .ariaLabel('需求分派')
                            .targetEvent($event)
                            .ok('确定')
                            .cancel('取消');
                        $mdDialog.show(confirm).then(function() {
                            $http.put(window.ajaxUrl+"task/info", {
                                "taskid": $scope.data.taskid,
                                "token": UserToken.getToken()
                            }).then(function (res) {
                                console.log(res.data);
                            });
                        }, function() {
                            $mdDialog.cancel();
                        });
                        break;
                    case 'process_5_submit':
                        $mdDialog.show({
                            controller: 'ProcessSubmitMeetingController',
                            templateUrl: 'modules/info/processSubmitMeeting.tmpl.html',
                            parent: angular.element(document.body),
                            targetEvent: $event,
                            locals: {
                                taskInfo: $scope.data
                            },
                            clickOutsideToClose:true
                        });
                        break;
                    case 'process_6_deadline':
                        $mdDialog.show({
                            controller: 'ProcessSubmitDeadlineController',
                            templateUrl: 'modules/info/processDeadline.tmpl.html',
                            parent: angular.element(document.body),
                            targetEvent: $event,
                            locals: {
                                "taskInfo" : $scope.data,
                                "token": UserToken.getToken()
                            },
                            clickOutsideToClose:true
                        });
                        break;
                    case 'process_6_submit':
                        var confirm = $mdDialog.confirm()
                            .title('您确定接受三方的日期期限么？')
                            .textContent('如果您接受，需求将进入开发阶段！')
                            .ariaLabel('三方审核')
                            .targetEvent($event)
                            .ok('确定')
                            .cancel('取消');
                        $mdDialog.show(confirm).then(function() {
                            $http.put(window.ajaxUrl+"task/info", {
                                "token": window.sessionStorage.token,
                                "taskid": $scope.data.taskid,
                                "taskstatus": $scope.data.taskstatus
                            }).then(function (res) {
                                console.log(res.data);
                            });
                        }, function() {
                            $mdDialog.hide();
                        });
                        break;
                    case 'process_7_submit':
                        var confirm = $mdDialog.confirm()
                            .title('确定提测吗？')
                            .textContent('提交后本需求进入测试阶段！')
                            .ariaLabel('开发阶段')
                            .targetEvent($event)
                            .ok('确定')
                            .cancel('取消');
                        $mdDialog.show(confirm).then(function() {
                            $scope.status = 'You decided to get rid of your debt.';
                        }, function() {
                            $scope.status = 'You decided to keep your debt.';
                        });
                        break;
                    case 'process_8_submit':
                        var confirm = $mdDialog.confirm()
                            .title('确定申请上线吗？')
                            .textContent('提交后本需求进入上线阶段！')
                            .ariaLabel('测试阶段')
                            .targetEvent($event)
                            .ok('确定')
                            .cancel('取消');
                        $mdDialog.show(confirm).then(function() {
                            $scope.status = 'You decided to get rid of your debt.';
                        }, function() {
                            $scope.status = 'You decided to keep your debt.';
                        });
                        break;
                    case 'process_9_submit':
                        var confirm = $mdDialog.confirm()
                            .title('确定关闭吗？')
                            .textContent('提交后关闭本需求！')
                            .ariaLabel('上线阶段')
                            .targetEvent($event)
                            .ok('确定')
                            .cancel('取消');
                        $mdDialog.show(confirm).then(function() {
                            $scope.status = 'You decided to get rid of your debt.';
                        }, function() {
                            $scope.status = 'You decided to keep your debt.';
                        });
                        break;
                }
            }
            // http://10.106.88.87:3000/task/info
            //mock/info1.json
            $http.post(window.ajaxUrl+'task/info', {taskid: $state.params.itemId, token: UserToken.getToken()}).then(function(res){
                $scope.data = res.data.data;
                init();
            });
            $scope.toggle = function( $event) {
                var element = angular.element($event.currentTarget);
                var content = element.parent().next().find('md-content').eq(0);
                var div = element.parent().next().children().eq(0);
                if(content.hasClass('visible-hide')) {
                    div.removeClass('ui-content-no-height');
                    div.css({'height': content[0].clientHeight + 'px'});
                    content.removeClass('visible-hide');
                    element.text('收起详情');
                } else {
                    div.css({'height': '0'});
                    content.addClass('visible-hide');
                    element.text('展开详情');
                }
            }

        }
    ]).controller('ProcessEditInfoController', ['$scope', '$mdDialog', '$http', 'data', function($scope, $mdDialog, $http, data ){
        $scope.checktypes = [
            {
                title: '设计',
                value: 0
            },
            {
                title: '前端',
                value: 1
            },
            {
                title: 'APP',
                value: 2
            },
            {
                title: '后端开发',
                value: 3
            },
            {
                title: '测试',
                value: 4
            }
        ];
        $scope.selected = [];
        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            idx > -1 ?  list.splice(idx, 1): list.push(item);
        };
        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        $http.get(window.ajaxUrl+"user/reviewlist").then(function (res){

            $scope.reviewerList = res.data.data;
        });
        $scope.data = data;
        $scope.priorities = [
            {
                'name': '普通',
                'value': '1'
            },
            {
                'name': '重要',
                'value': '2'
            },
            {
                'name': '严重',
                'value': '3'
            },
            {
                'name': '紧急',
                'value': '4'
            }
        ]
    }]).controller('ProcessAgreeRequirementController', ['$scope', '$mdDialog', '$http', 'UserToken', 'taskInfo', function($scope, $mdDialog, $http, UserToken, taskInfo) {
        $scope.data = {"audit": "success", "taskid": taskInfo.taskid, "token": UserToken.getToken()};
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.agree = function () {
            $http.put(window.ajaxUrl+"task/info", $scope.data).then(function (res) {
                console.log(res.data);
            });

            $mdDialog.hide();
        }
    }]).controller('ProcessDisagreeRequirementController', ['$scope', '$mdDialog', '$http', 'UserToken', 'taskInfo', function($scope, $mdDialog, $http, UserToken, taskInfo) {
        $scope.status_1_data = {"audit": "fail", "taskid": taskInfo.taskid, "token": UserToken.getToken()};
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.disAgree = function() {
            $mdDialog.hide();
        };
    }]).controller('ProcessUploadFilesController', ['$scope', '$mdDialog', '$http', 'UserToken', 'taskInfo', function($scope, $mdDialog, $http, UserToken, taskInfo) {
        $scope.taskid = taskInfo.taskid;
        $scope.token = UserToken.getToken();
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.submit = function() {
            //var postData = new FormData();
            //var postData = new FormData(document.getElementById('js_upload_file'));
            //postData.append("token", window.sessionStorage.token);
            //postData.append("taskid", taskInfo.taskid);
            //console.log(postData);
            //$http.post("http://10.106.88.87:3000/task/modify", postData).then(function (res) {
            //    $mdDialog.hide();
            //});

            document.getElementById('js_upload_file').submit();

        };

    }]).controller('ProcessChooseTeamController', ['$scope', '$mdDialog', '$http', 'UserToken', 'taskInfo', function($scope, $mdDialog, $http, UserToken, taskInfo) {
        $scope.checktypes = [];
        $http.post(window.ajaxUrl+"user/list", {
            "token": UserToken.getToken(),
            "method": "getGroup"
        }).then(function (res) {
            if(res.data.status === "success") {
                for(var i = 0; i < res.data.data.length; i++) {
                    $scope.checktypes.push(res.data.data[i]);
                }
            }
        });

        $scope.selected = [];

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            idx > -1 ?  list.splice(idx, 1): list.push(item);
        };
        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.submit = function() {
            var sendData = {
                "token": UserToken.getToken(),
                "taskid": taskInfo.taskid,
                "need": $scope.selected
            };

            $http.put(window.ajaxUrl+"task/team", sendData).then(function (res) {
                if(res.data.status === "success") {
                    alert(res.data.msg);
                }
                $mdDialog.hide();
            });
        };

    }]).controller('ProcessArrangeStaffController', ['$scope', '$mdDialog', '$http', 'UserToken', 'taskInfo', function($scope, $mdDialog, $http, UserToken, taskInfo) {
        $scope.selected = [];
        var token = UserToken.getToken();
        $http.post(window.ajaxUrl+"task/user", {
            "token": token,
            "taskid": taskInfo.taskid,
            "taskstatus": taskInfo.taskstatus
        }).then(function (res) {
            $scope.groupuser = res.data.data.user;
            $scope.__group = res.data.data.group;
            if(!!res.data.data.parter && !!res.data.data.parter.length) {
                for(var i = 0; i < res.data.data.parter.length; i++) {
                    var key = res.data.data.parter[i].userid;
                    console.log(key, typeof key);
                    for(var j = 0; j < $scope.groupuser.length; j++) {
                        console.log($scope.groupuser[j].userid, typeof $scope.groupuser[j].userid);
                        if(key == $scope.groupuser[j].userid) {
                            $scope.selected.push($scope.groupuser[j]);
                        }
                    }
                }
                console.log($scope.selected);
            }
        });
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.submit = function() {
            console.log($scope.selected);
            $http.put(window.ajaxUrl+"task/user", {
                "token": window.sessionStorage.token,
                "taskid": taskInfo.taskid,
                "parter": $scope.selected,
                "group": $scope.__group
            }).then(function (res) {
            });
            $mdDialog.hide();
        };
        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
        };
        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };
    }]).controller('ProcessSubmitMeetingController', ['$scope', '$mdDialog', '$http', 'UserToken', 'taskInfo', function($scope, $mdDialog, $http, UserToken, taskInfo) {
        var token = UserToken.getToken();
        $scope.meet = {
            "token": token,
            "taskid": taskInfo.taskid,
            "date": new Date()
        };

        $scope.workDate = function(date) {
            var day = date.getDay();
            return day != 0 || day != 6;
        };
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function() {

            $scope.meet.time = $scope.meet.date.getTime();
            $http.put(window.ajaxUrl+"task/info", $scope.meet).then(function (res) {
                console.log(res.data);
            });
        };

    }]).controller('ProcessSubmitDeadlineController', ['$scope', '$mdDialog', '$http', 'UserToken', 'taskInfo','$rootScope', function($scope, $mdDialog, $http, UserToken, taskInfo, $rootScope) {
        var token = UserToken.getToken();
        $scope.staff = $rootScope.user.groupstr;

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.submit = function() {
            var sendData = {
                "token": token,
                "taskid": taskInfo.taskid,
                "startDate": new Date($scope.startDate).getTime(),
                "endDate":  new Date($scope.endDate).getTime(),
                "group": $rootScope.user.group
            };
            $http.put(window.ajaxUrl+"task/team", sendData).then(function (res) {
                if(res.data.status === "success") {
                    alert(res.data.msg);
                } else {

                }
                $mdDialog.hide();
            });
        };

    }]).controller('bb', ['$scope', '$mdDialog', '$http', 'UserToken', 'taskInfo', function($scope, $mdDialog, $http, UserToken, taskInfo) {

    }]).controller('dd', ['$scope', '$mdDialog', '$http', 'UserToken', 'taskInfo', function($scope, $mdDialog, $http, UserToken, taskInfo) {

    }]).controller('ee', ['$scope', '$mdDialog', '$http', 'UserToken', 'taskInfo', function($scope, $mdDialog, $http, UserToken, taskInfo) {

    }]);
});