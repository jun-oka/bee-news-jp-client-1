'use strict';

angular.module('mean.system')
  .factory('RssClient', ['$rootScope', '$http',
      function($rootScope, $http) {
        return {
          getBlog: function(){
            $http.jsonp("http://api.bee-news.net/blog.php?callback=JSON_CALLBACK&day=3").then(function(json) {
              $rootScope.$emit('get-blog', json.data);
            });
          },
          getQA: function(){
            $http.jsonp("http://api.bee-news.net/qa.php?callback=JSON_CALLBACK&day=3").then(function(json) {
              $rootScope.$emit('get-qa', json.data);
            });
          },
          getMap: function(){
            $http.jsonp("http://api.bee-news.net/map.php?callback=JSON_CALLBACK&day=3").then(function(json) {
              $rootScope.$emit('get-map', json.data);
            });
          },
          getBBS: function(){
            $http.jsonp("http://api.bee-news.net/bbs.php?callback=JSON_CALLBACK&day=3").then(function(json) {
              $rootScope.$emit('get-bbs', json.data);
            });
          }
        }
      }
]);