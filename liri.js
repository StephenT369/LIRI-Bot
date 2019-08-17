require('dotenv').config();
var keys = require('./keys.js');
//var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var command = process.argv[2];
var request = process.argv;
var requested = request.slice(3).join('%2B');

switch (command){
case 'concert-this':
    var artist = requested;
    bands();
break;

case 'spotify-this-song':

break;

case 'movie-this':

break;

case 'do-what-it-says':

break;
};

function bands (){
var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

axios.get(queryURL).then(
    function(band){

       var bandData = band.data;

       for (i = 0; i < bandData.length; i++ ){
        console.log('Name of the venue: ' + bandData[i].venue.name );
        console.log('Venue location: ' + bandData[i].venue.city +','+ bandData[i].venue.region);
        console.log('Date of the Event: ' + bandData[i].datetime);
       };
        
    }
);
};