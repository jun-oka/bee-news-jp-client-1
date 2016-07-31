'use strict';

/**
 * Module dependencies.
 */

//var express = require('express');
var fs = require('fs');
var request = require('request');
var client = require('cheerio-httpcli');
var mongoose = require('mongoose');
var async = require('async');
var Eightchannel = mongoose.model('eightchannel');
var Nara = mongoose.model('nara');
//var forEach = require('async-foreach').forEach;



module.exports = function() {
  return {
    test: function(req, res) {

        // スクレイピング開始(サイト１)
        client.fetch('http://honeybee-club.com/cgi/clip/clip.cgi', {}, function (err, $) {
            if(!err) {


                var arry = new Object();
                var tmpName = '';
                var tmpNumber = '';
                var tmpTitle = '';

                //投稿内容
                //$('dd font').each(function () {
                //    if ($(this).parent().is('dd', 'p')) {
                //        //console.log($(this).text());
                //    } else if($(this).parent().is('dt')){
                //        //console.log($(this).text());
                //    }
                //});

                //名前取得
                $('dt b:nth-child(4)').each(function (i) {
                    arry[i] =  {title:'', name: '', number: '', };

                    if ($(this).children().is('.e')) {
                        tmpName = $(this).find('a').text();
                        //console.log($(this).find('a').text());
                    }else{
                        tmpName = $(this).text();
                        //console.log($(this).text());
                    }
                    arry[i].name = tmpName;
                });

                //投稿番号取得
                $('dt b:nth-child(2)').each(function (i) {
                    //console.log(arry);
                    tmpNumber = $(this).text();
                    arry[i].number = tmpNumber;
                });

                //投稿タイトル取得
                $('dt b:nth-child(1)').each(function (i) {
                    tmpTitle = $(this).text();
                    arry[i].title = tmpTitle;
                });

                //ドキュメント一時ALL消去
                Eightchannel.remove({}, function(err) {
                    console.error(err);
                });

                //DB挿入
                Object.keys(arry).forEach(function(key) {
                    var val = this[key];
                    var eightchannel = new Eightchannel();
                    eightchannel.title = val.title;
                    eightchannel.post_name = val.name;
                    eightchannel.post_number = val.number;
                    eightchannel.save(function(err,eightchannel){
                        if(err) {
                            console.error(err);
                        } else {
                            //res.status(200).json("eightchannelModel saved:" + eightchannel);
                            console.log("eightchannelModel saved:" + eightchannel)
                        }
                    });
                }, arry);

                console.log('でいたお');
                //日付取得→未完成
                //console.log($("dt:contains('投稿日：')").text() );
                //$('dt').each(function () {
                //    console.log($("").text() );
                //});
            }else{
                console.log('error');
            }
        });


        // スクレイピング開始(奈良スズメ)
        client.fetch('http://narasuzume.ryuon.org/protect_1/joyful003/joyful.cgi', {}, function (err, $) {
            if(!err) {

                console.log('そのまんま');
                //一旦最新のものだけとって来るようにします。
                //最新スレッドの始めの記事のスクレイピング
                //最新スレッドの始めの記事のタイトル

                var latestTitle = $('table').eq(0).find('b:nth-child(1)').text();

                //最新スレッドの始めの記事のタイトル
                var latestName = $('table').eq(0).find('b:nth-child(2)').eq(0).text();

                //最新スレッドの始めの記事番号
                var latestNumber= $('table').eq(0).find('b:nth-child(3)').eq(0).text();

                //最新スレッドの始めの記事の画像
                //var latesImg = $('table div img').eq(0).url();

                //最新スレッドの始めの記事の内容
                //var latesContents = $('table div span').eq(0).text();

                //DB挿入
                var nara = new Nara();
                nara.title = latestTitle;
                nara.post_name = latestName;
                nara.post_number = latestNumber;
                nara.save(function(err,nara){
                    if(err) {
                        console.error(err);
                    } else {
                        console.log("naraModel latest saved:" + nara);
                    }
                });

                console.log($('table div').eq(1).find('b').text());

                //最新スレッドの返信投稿一覧
                //ここにそもそもデータがあるかを書く
                var replyThread = $('table div').eq(1).find('b').text();

                if(replyThread != ''){
                    for (var i=0; i<$('table div').eq(1).find('b').length/2; i++) {
                        var replyTitle_1 = $('table div').eq(1).find('b').eq(i*2).text();
                        var replyName_1 = $('table div').eq(1).find('b').eq(i*2+1).text();
                        var replyNumber_1 = $('table div').eq(1).find('span').eq(i*2).text();
                        //console.log(replyTitle_1);
                        //console.log(replyName_1);
                        //console.log(replyNumber_1);

                        //ドキュメント一時ALL消去
                        Nara.remove({}, function(err) {
                            //console.error(err);
                        });

                        //DB挿入
                        var nara = new Nara();
                        nara.title = replyTitle_1;
                        nara.post_name = replyName_1;
                        nara.post_number = replyNumber_1;
                        nara.save(function(err,nara){
                            if(err) {
                                //console.error(err);
                            } else {
                                //res.status(200).json("naraModel saved:");
                            }
                        });
                    }
                }
                console.log('でいたお2');
            }else{
                console.log("naraModel saved:");
            }
        });
        res.status(200).json("Model saved:");
    },
    findAll: function(req, res) {
        async.parallel([
            function(cb){
                Eightchannel.find({}, cb);
            },
            function(cb){
                Nara.find({}, cb);
            }
        ], function(err, results){
            if(err){
                return res.status(400).json({
                    msg: 'error',
                });
            }else{
                return res.status(200).json(results);
            }
        });
    },
  };
}
