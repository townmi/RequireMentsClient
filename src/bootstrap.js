/**
 * @Created by Administrator
 * @Date 2015/12/17.
 * @author [haixiangtang@creditease.cn]
 */
require.config( {
    paths : {
        "angular" : 'vendor/angular/angular.min',
    } ,
    shim : {
        angular : {
            exports : 'angular' ,
            init : function () {
                var _module = angular.module;
                angular.module = function () {
                    var newModule = _module.apply( angular , arguments );
                    if ( arguments.length >= 2 ) {
                        newModule.config( [
                            '$controllerProvider' ,
                            '$compileProvider' ,
                            '$filterProvider' ,
                            '$provide' ,
                            function ( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
                                newModule.controller = function () {
                                    $controllerProvider.register.apply( this , arguments );
                                    return this;
                                };
                                newModule.directive = function () {
                                    $compileProvider.directive.apply( this , arguments );
                                    return this;
                                };
                                newModule.filter = function () {
                                    $filterProvider.register.apply( this , arguments );
                                    return this;
                                };
                                newModule.factory = function () {
                                    $provide.factory.apply( this , arguments );
                                    return this;
                                };
                                newModule.service = function () {
                                    $provide.service.apply( this , arguments );
                                    return this;
                                };
                                newModule.provider = function () {
                                    $provide.provider.apply( this , arguments );
                                    return this;
                                };
                                newModule.value = function () {
                                    $provide.value.apply( this , arguments );
                                    return this;
                                };
                                newModule.constant = function () {
                                    $provide.constant.apply( this , arguments );
                                    return this;
                                };
                                newModule.decorator = function () {
                                    $provide.decorator.apply( this , arguments );
                                    return this;
                                };
                            }
                        ] );
                    }
                    return newModule;
                };
            }
        } ,
        'vendor/angular/angular-ui-router' : [ 'angular' ] ,
        'vendor/angular/angular-cookies.min' : [ 'angular' ] ,
        'vendor/angular/ui-bootstrap-custom-tpls-0.13.4.min' : [ 'angular' ] ,
        'vendor/angular/angular-animate' : [ 'angular' ]
    } ,
    map : {
        '*' : {
            css : 'vendor/require/css' ,
            text : 'vendor/require/text'
        }
    } ,
    urlArgs: "bust=" +  (new Date()).getTime()
} );

require( [
    'angular' ,
    'vendor/angular/angular-ui-router',
    'vendor/angular/angular-cookies.min',
    'vendor/angular/angular-animate',
    'vendor/angular/ui-bootstrap-custom-tpls-0.13.4.min',
    './app'
] , function ( angular ) {
    angular.module( 'all' , ['ui.router', "ui.bootstrap", "ngCookies", "ngAnimate", 'application' ] );
    angular.module( 'boot' , [ 'all' ] );
    angular.bootstrap( document , [ 'boot' ] );
} );