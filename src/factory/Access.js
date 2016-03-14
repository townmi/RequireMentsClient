/**
 * @Created by Administrator
 * @Date 2015/12/18.
 * @author [peili4@creditease.cn]
 */
define( [
    '../app',
    '../service/UserTokenService'
] , function ( factories, $q, UserToken ) {
    factories.factory( 'Access' , ['$q', '$http', 'UserToken', function($q, $http, UserToken) {
        var Access = {
            OK: 200,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            isAuthenticated: function() {
                console.log('start authenticated');
                var deferred = $q.defer();
                if(UserToken.validateToken()) { //http://10.106.88.87:3000/user/info
                    //mock/userinfo.json
                    $http.post(window.ajaxUrl+"user/info", {token: UserToken.getToken()}).then(
                        function (data) {
                            data = data.data;
                            if(data.status === "success"){
                                UserToken.writeUserInfo(data.data);
                                deferred.resolve(Access.OK);
                            } else {
                                UserToken.clearToken();
                                UserToken.clearUserInfo();
                                deferred.reject(Access.UNAUTHORIZED);
                            }
                        },
                        function (error) {
                            UserToken.clearToken();
                            UserToken.clearUserInfo();
                            deferred.reject(Access.UNAUTHORIZED);
                        }
                    );

                }

                return deferred.promise;
            }
        };
        return Access;
    } ]);
} );