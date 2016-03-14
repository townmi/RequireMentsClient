/**
 * @Created by Administrator
 * @Date 2015/12/17.
 * @author [haixiangtang@creditease.cn]
 */
define( [
    'angular'
] , function ( angular ) {
    return angular.module('application' , [] )
    .config( [
        '$stateProvider', '$urlRouterProvider', '$httpProvider', '$mdIconProvider', '$rootScopeProvider',
        //'$urlRouterProvider' ,
        function ( $stateProvider, $urlRouterProvider, $httpProvider, $mdIconProvider, $rootScopeProvider ) {

            $mdIconProvider.defaultIconSet('img/icons/sets/core-icons.svg', 24);

            // $rootScopeProvider.digestTtl(15);

            $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

            // Override $http service's default transformRequest
            $httpProvider.defaults.transformRequest = [function(data) {
                /**
                 * The workhorse; converts an object to x-www-form-urlencoded serialization.
                 * @param {Object} obj
                 * @return {String}
                 */
                var param = function(obj) {
                    var query = '';
                    var name, value, fullSubName, subName, subValue, innerObj, i;

                    for (name in obj) {
                        value = obj[name];

                        if (value instanceof Array) {
                            for (i = 0; i < value.length; ++i) {
                                subValue = value[i];
                                fullSubName = name + '[' + i + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value instanceof Object) {
                            for (subName in value) {
                                subValue = value[subName];
                                fullSubName = name + '[' + subName + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value !== undefined && value !== null) {
                            query += encodeURIComponent(name) + '='
                                + encodeURIComponent(value) + '&';
                        }
                    }

                    return query.length ? query.substr(0, query.length - 1) : query;
                };

                return angular.isObject(data) && String(data) !== '[object File]'
                    ? param(data)
                    : data;
            }];


            /**
             * 加载依赖
             * @param deps
             * @returns {*[]}
             */
            function loadDeps( deps ) {
                return [
                    '$q' , function ( $q ) {
                        var def = $q.defer();
                        require( deps , function () {
                            def.resolve();
                        } );
                        return def.promise;
                    }
                ];
            }

            /**
             * [router site]
             * @type {String}
             */



            // reg
            $stateProvider.state( 'reg' , {
                url : '/reg' ,
                templateUrl : 'modules/passport/reg.html' ,
                controller : 'regController' ,
                resolve : {
                    load : loadDeps( [
                        './modules/passport/reg'
                    ] )
                }
            });

            // login
            $stateProvider.state( 'login' , {
                url : '/login' ,
                templateUrl : 'modules/passport/login.html' ,
                controller : 'LoginController' ,
                resolve : {
                    load : loadDeps( [
                        './modules/passport/login'
                    ] )
                }
            } );
            //test
            $stateProvider.state( 'static.test' , {
                url : '/test' ,
                templateUrl : 'modules/test/test.html' ,
                controller : 'AppCtrl' ,
                resolve : {
                    load : loadDeps( [
                        'modules/test/test'
                    ] )
                }
            } );
            //user
            $stateProvider.state( 'static.user' , {
                url : '/user' ,
                templateUrl : 'modules/user/user.html' ,
                controller : 'UserManager' ,
                resolve : {
                    load : loadDeps( [
                        'modules/user/user'
                    ] )
                }
            });

            $stateProvider.state('static', {
                url: '/static',
                templateUrl : 'modules/index/index.html' ,
                absolute: true
            });

            $stateProvider.state('static.home', {
                url: '/home',
                templateUrl: 'modules/home/home.html',
                controller: 'HomeController',
                resolve: {
                    load : loadDeps( [
                        'modules/home/home',
                        'modules/create/create'
                    ] ),
                    access: ['Access', function(Access) {
                        return Access.isAuthenticated();
                    }]
                }
            } );

            $stateProvider.state('static.info', {
                url: '/info/{itemId:[0-9|a-z|A-Z]+}',
                templateUrl: 'modules/info/info.html',
                controller: 'InfoController',
                resolve: {
                    load : loadDeps( [
                        'modules/info/info'
                    ] ),
                    access: ['Access', function(Access) {
                        return Access.isAuthenticated();
                    }]
                }
            });


            $stateProvider.state('static.organization', {
                url: '/organization',
                templateUrl: 'modules/organization/organization.html',
                controller: 'OrganizationController',
                resolve: {
                    load : loadDeps( [
                        'modules/organization/organization'
                    ] )
                }
            });

            $stateProvider.state('static.all', {
                url: '/all',
                templateUrl: 'modules/all/all.html',
                controller: 'AllController',
                resolve: {
                    load : loadDeps( [
                        'modules/all/all'
                    ] )
                }
            } );

            $stateProvider.state('static.account', {
                url: '/account',
                templateUrl: 'modules/account/account.html',
                controller: 'AccountController',
                resolve: {
                    load : loadDeps( [
                        'modules/account/account'
                    ] )
                }
            } );


            // otherwise
            //$urlRouterProvider.otherwise( 'static.home' );
            $urlRouterProvider.otherwise( function($injector, $location) {
                var $state = $injector.get("$state");
                $state.go("static.home");
            });

        }
    ]);

    /*.filter('keyboardShortcut', function($window) {
        return function(str) {
            if (!str) return;
            var keys = str.split('-');
            var isOSX = /Mac OS X/.test($window.navigator.userAgent);
            var seperator = (!isOSX || keys.length > 2) ? '+' : '';
            var abbreviations = {
                M: isOSX ? '?' : 'Ctrl',
                A: isOSX ? 'Option' : 'Alt',
                S: 'Shift'
            };
            return keys.map(function(key, index) {
                var last = index == keys.length - 1;
                return last ? key : abbreviations[key];
            }).join(seperator);
        };
    });
     /*.config(function($mdIconProvider) {
        $mdIconProvider
            .defaultIconSet('img/icons/sets/core-icons.svg', 24);
    });*/
} );

