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

      $rootScope.$on('get-youtube', function(event, obj){
        $scope.youtube = obj;
      });

      $rootScope.$on('get-chiebukuro', function(event, obj){
        $scope.chiebukuro = obj;
      });

      $rootScope.$on('get-news', function(event, obj){
        $scope.news = obj;
      });

      RssClient.getBlog();
      RssClient.getQA();
      RssClient.getBBS();
      RssClient.getMap();
      RssClient.getYouTube();
      RssClient.getChiebukuro();
      RssClient.getNews();
    }
]);
