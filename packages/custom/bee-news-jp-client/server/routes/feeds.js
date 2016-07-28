(function () {
    'use strict';

    var config = require('meanio').loadConfig();
    var jwt = require('jsonwebtoken'); //https://npmjs.org/package/node-jsonwebtoken

    module.exports = function(MeanStarter, app, auth, database, passport) {

    var feed = require('../controllers/feeds')();

    app.route('/api/feed')
        .get(feed.test);
    };
})();




