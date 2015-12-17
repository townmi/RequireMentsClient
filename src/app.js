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
        '$stateProvider', '$urlRouterProvider', '$httpProvider', '$rootScopeProvider',
        //'$urlRouterProvider' ,
        function ( $stateProvider, $urlRouterProvider, $httpProvider, $rootScopeProvider ) {

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
             * 加载依赖的辅助函数
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
            } );

            // index
            $stateProvider.state( 'index' , {
                url : '/index' ,
                templateUrl : 'modules/index/index.html' ,
                controller : 'IndexController' ,
                resolve : {
                    load : loadDeps( [
                        'modules/index/index'
                    ] )
                }
            } );

            // 不能使用下面这句代码：
            $urlRouterProvider.otherwise( '/' );
            // 见 http://stackoverflow.com/questions/25065699/why-does-angularjs-with-ui-router-keep-firing-the-statechangestart-event

        }
    ]);
} );

