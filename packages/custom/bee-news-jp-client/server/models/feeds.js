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

//スキーマを宣言
var EightchannelSchema = new mongoose.Schema({
    title: String,
    post_name: String,
    post_number: String
});

var NaraSchema = new mongoose.Schema({
    title: String,
    post_name: String,
    post_number: String
});

//スキーマからモデルを生成。
mongoose.model('Feed', FeedSchema);
mongoose.model('eightchannel',EightchannelSchema);
mongoose.model('nara',NaraSchema);
