'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

/**
 * User Schema
 */

var FeedSchema = new Schema({
  name: String,
  site_url: String,
  rss_url: String,
  items : [{title : String, url : String, desc : String, time : Number}],
});
mongoose.model('Feed', FeedSchema);
