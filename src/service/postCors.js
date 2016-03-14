/**
 * @Created by Administrator
 * @Date 2016/1/14.
 * @author [haixiangtang@creditease.cn]
 */
define( [
    '../app'
] , function ( services ) {
    services.factory( 'PostCors' , [
        '$q', '$rootScope',
        function ( $q, $rootScope ) {


            return function (conf) {

                var settings = {
                    "ele": null,
                    "action": '',
                    onStart: function() { },
                    onComplete: function(response) {},
                    onCancel: function() { }
                };

                var uploading_file = false;

                if ( conf ) {
                    angular.extend(settings, conf);
                }

                if(!settings.ele || !settings.action) return console.log("error: application");

                $element = document.getElementById(settings.ele);

                // if($element.data('ajaxUploader-setup') === true) return;

                var handleResponse = function(loadedFrame, element) {

                    var response, responseStr = $(loadedFrame).contents().find('body').text();

                    try {
                        //response = $.parseJSON($.trim(responseStr));
                        response = JSON.parse(responseStr);
                    } catch(e) {
                        response = responseStr;
                    }

                    uploading_file = false;

                    // ·µ»Ø»Øµô
                    settings.onComplete.apply(loadedFrame, [response, settings.params]);
                };


                var wrapElement = function(element) {

                    var frame_id = 'PostCors-iframe-' + Math.round(new Date().getTime() / 1000);

                    if(document.getElementsByTagName("iframe").length && /ajaxUploader-iframe/g.test(angular.element(document.getElementsByTagName("iframe")).attr("id"))){
                        frame_id = angular.element(document.getElementsByTagName("iframe")).attr("id");
                    }else{
                        $('body').after('<iframe width="0" height="0" style="display:none;" name="'+frame_id+'" id="'+frame_id+'"/>');
                    }

                    document.getElementById(frame_id).onload = function() {
                        handleResponse(this, element);
                    };

                    $element.attr({"target": frame_id, "action": settings.action, "method": "POST", "enctype": "multipart/form-data"});
                }


                var upload_file = function() {

                    uploading_file = true;

                    wrapElement($element);

                    var ret = settings.onStart.apply($element, [settings.params]);

                    if(ret !== false) {
                        $element.submit(function(e) {
                            if(e.stopPropagation){
                                e.stopPropagation();
                            }
                            e.cancelBubble = true;
                            e.returnValue = false;
                        }).submit();
                    }
                };

                if (!uploading_file) {
                    upload_file();
                }

                return $q(function(resolve, reject) {

                })
            };

        }
    ])
});