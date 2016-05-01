'use strict';

angular.module('mean.system')
  .factory('RssClient', ['$rootScope', '$http',
      function($rootScope, $http) {
        return {
          getBlog: function(){
            $http.jsonp("http://api.bee-news.net/blog.php?callback=JSON_CALLBACK").then(function(json) {
              $rootScope.$emit('get-blog', json.data);
            });
          }
        }
      }
]);
