
define( [
  '../../app'
] , function ( controllers ) {
  controllers.controller( 'AppCtrl' , function($scope,$mdDialog) {

    $scope.people = [
      { name: '随心宝', img: 'resource/images/100-0.jpeg', newMessage: true ,url:'suiXinBao'},
      { name: '月盈宝', img: 'resource/images/100-1.jpeg', newMessage: false,url:'yueYingBao'},
      { name: '宜信宝', img: 'resource/images/100-2.jpeg', newMessage: false,url:'yiXinBao' }
    ];

});
    });
