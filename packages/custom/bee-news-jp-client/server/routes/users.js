'use strict';

var config = require('meanio').loadConfig();
var jwt = require('jsonwebtoken'); //https://npmjs.org/package/node-jsonwebtoken

module.exports = function(MeanStarter, app, auth, database, passport) {

  var user = require('../controllers/users')();
  app.route('/api/feed')
      .get(user.test);
      
};
