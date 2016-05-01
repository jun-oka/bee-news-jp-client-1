'use strict';

angular.module('mean.system')
  .controller('IndexController', ['$rootScope', '$scope', 'Global', 'RssClient',
    function($rootScope, $scope, Global, RssClient) {
      $scope.global = Global;
      $scope.message = 'Global';

      $rootScope.$on('get-blog', function(event, obj){
        $scope.blogs = obj;
      });

      RssClient.getBlog();
    }
]);
