/**
 * @Created by Administrator
 * @Date 2015/12/22.
 * @author [haixiangtang@creditease.cn]
 */
/**
 * 一个用户登录服务。
 * 每次切换状态（state）时都会检查用户是否已登录，
 * 若没有则跳到登录界面。
 */
define( [
    '../app',
    '../service/StrEnc',
    '../service/UserTokenService'
] , function ( services ) {
    services.factory( 'UserLogin' , [
        '$q' , '$state' , '$http' , '$rootScope', 'StrEnc', '$cookieStore', 'UserToken',
        function ( $q , $state , $http , $rootScope, StrEnc, $cookieStore, UserToken ) {
            var loginDef;
            return {
                handleLogin : function () {
                    var loginDef = $q.defer();
                    $state.go( 'login' , {} , { location : true } );
                    return loginDef.promise;
                } ,
                inspector : function (name) {
                    var loginDef = $q.defer();
                    $state.go( name , {} , { location : true } );
                    return loginDef.promise;
                } ,
                needCheck : function ( state ) {
                    return /static/gi.test(state.name);
                } ,
                login : function ( formData ) {
                    var def = $q.defer();
                    var promise = def.promise;
                    var data = {
                        "tmpname": formData.tmpname,
                        "password": StrEnc.strEnc(formData.password, formData.tmpname, formData.tmpname, formData.tmpname),
                    };
                    return $http.post(window.ajaxUrl+"user", data).then(
                        function (res) {
                            data = res.data;
                            if(data.status === "success"){
                                UserToken.writeToke(data)
                            } else {
                                UserToken.clearToken();
                                $rootScope.loginMsg = data.msg;
                            }
                            def.resolve();
                            loginDef = def;
                            return promise;
                        },
                        function (error) {
                            UserToken.clearToken();
                            $rootScope.loginMsg = "网路服务异常，请重新再试。";
                            def.resolve();
                            loginDef = def;
                            return promise;
                        }
                    );

                }
            };
        }
    ] ).run( [
        '$rootScope' , '$urlRouter' , 'UserLogin' , '$state', '$stateParams', 'UserToken', '$http',
        function ( $rootScope , $urlRouter , UserLogin , $state, $stateParams, UserToken, $http ) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on( '$stateChangeStart' , function ( e , toState, toParams, fromState, fromParams ) {
                if ( UserLogin.needCheck( toState ) && !UserToken.validateToken()) {
                    e.preventDefault();
                    UserLogin.handleLogin();
                }else if( UserToken.validateToken() &&  /login|reg/gi.test(toState.name)){
                    e.preventDefault();
                    UserLogin.inspector(fromState.name || 'home');
                }
            } );
            $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
                console.log(error)
                if (error === 401) {
                    $state.go('login')
                }
            });


            $rootScope.logout = function () {
                UserToken.clearToken();
                UserLogin.inspector('login');
            }

        }
    ] );
} );


