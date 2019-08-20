require('dotenv').config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var command = process.argv[2];
var request = process.argv;
var requested = request.slice(3).join(' ');
switch (command) {
  case 'concert-this':
    var artist = requested;
    bands();
    break;

  case 'spotify-this-song':
  var track = requested;
  spotifyThis();  
  break;

  case 'movie-this':
    break;

  case 'do-what-it-says':
    break;
};

function bands() {
  var queryURL =
    'https://rest.bandsintown.com/artists/' +
    artist +
    '/events?app_id=codingbootcamp';

  axios.get(queryURL).then(function(band) {
    var bandData = band.data;
    for (i = 0; i < bandData.length; i++) {
      console.log('\nName of the venue: ' + bandData[i].venue.name);
      console.log(
        'Venue location: ' +
          bandData[i].venue.city +
          ',' +
          bandData[i].venue.region
      );
      console.log(
        'Date of the Event: ' +
          moment(bandData[i].datetime).format('MM/DD/YYYY')
      );
    }
  });
};

function spotifyThis(){
spotify.search({ type: 'track', query: track})
.then(function(spotResponse) {
  var songInfo = spotResponse.tracks.items;
  for(i=0; i< songInfo.length; i++){
      
    var artistsInfo = songInfo[i].album.artists;
      
        for(a=0; a< artistsInfo.length; a++){
          console.log('Artist(s): ' + artistsInfo[a].name);
        };
    console.log('Song: ' + songInfo[i].name);
    console.log('Preview Link: ' + songInfo[i].preview_url);
    console.log('Album: ' + songInfo[i].album.name+'\r\n')
  };

  //console.log(spotResponse.tracks.items[0]);
})
.catch(function(err){
  console.log(err);
});
};