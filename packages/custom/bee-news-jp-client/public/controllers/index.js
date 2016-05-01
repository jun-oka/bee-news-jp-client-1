'use strict';

angular.module('mean.system')
  .controller('IndexController', ['$rootScope', '$scope', 'Global', 'RssClient',
    function($rootScope, $scope, Global, RssClient) {
      $scope.global = Global;
      $scope.moment = require('moment');

      $rootScope.$on('get-blog', function(event, obj){
        $scope.blogs = obj;
      });

      $rootScope.$on('get-qa', function(event, obj){
        $scope.qa = obj;
      });

      $rootScope.$on('get-bbs', function(event, obj){
        $scope.bbss= obj;
      });

      $rootScope.$on('get-map', function(event, obj){
        $scope.map = obj;
      });

      RssClient.getBlog();
      RssClient.getQA();
      RssClient.getBBS();
      RssClient.getMap();
    }
]);
