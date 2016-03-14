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
    '../app'
] , function ( services ) {
    services.factory( 'UserToken' , [
        '$cookieStore', '$rootScope',
        function ( $cookieStore, $rootScope ) {

            var exports =  {
                writeToke : function (data) {
                    $cookieStore.put("token", data.token);
                    window.sessionStorage.token = data.token;
                    exports.writeUserInfo(data);
                    $rootScope.login = true;
                },
                clearToken : function() {
                    $cookieStore.put("token", "");
                    delete window.sessionStorage.token;
                    exports.clearUserInfo();
                    $rootScope.login = false;
                },
                validateToken: function () {
                    return !!window.sessionStorage.token;
                },

                getToken: function () {
                    return window.sessionStorage.token;
                },
                writeUserInfo : function (data) {
                    data = data || {};
                    $rootScope.user = {
                        'username': data.username,
                        'userid': data.id,
                        'userrole':data.userrole ,
                        'group':data.group,
                        'groupstr':data.groupstr
                    }
                },
                clearUserInfo : function () {
                   $rootScope.user = null;
                }
            };
            return exports;
        }
    ])
});


