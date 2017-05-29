var Twit = require('twit');
var config = require('./config');
var bot = new Twit(config);

var retweetFrequency = 5;

var retweet = function(){
    //set search params
    var params = {
        q: '#nasa, #NASA',
        result_type: 'recent',
        lang: 'en'
    }
    //search for tweets based on params
    bot.get('search/tweets',params,function(err,data){
        if(!err){
            //get Id of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            //post method for retweeting
            bot.post('statuses/retweet/:id',{id: retweetId},function(err,response){
                if(response){
                    console.log('Retweeted!!!');
                }
                //if error
                if(err){
                    console.log('Retweeting failed...');
                }
            });
        }
        //if unable to search tweet
        else{
            console.log('SEARCH Failed...');
        }
    });
}

//grab & retweet
retweet();
setInterval(retweet, 3000000);
