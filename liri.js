//Stephen Thompson \^/
require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var command = process.argv[2];
var request = process.argv;
var requested = request.slice(3).join(" ");
var track;

switch (command) {
  case "concert-this":
    var artist = requested;
    bands();
    break;

  case "spotify-this-song":
    var track = requested;
    if (!track) {
      track = "The Sign";
    }
    spotifyThis();
    break;

  case "movie-this":
    var movieName = requested;
    if (!movieName) {
      movieName = "Mr. Nobody";
    }
    omdb();
    break;

  case "do-what-it-says":
    fs.readFile("random.txt", "utf8", function(error, data) {
      var fileInput = data.split(",");
      if (error) {
        return console.log(error);
      }
      switch (fileInput[0]) {
        case "concert-this":
          artist = fileInput[1];
          bands();
          break;

        case "spotify-this-song":
          track = fileInput[1];
          spotifyThis();
          break;

        case "movie-this":
          movieName = fileInput[1];
          omdb();
          break;
      }
    });
    break;
}

function bands() {
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(function(band) {
    var bandData = band.data;
    for (i = 0; i < bandData.length; i++) {
      console.log("\nName of the venue: " + bandData[i].venue.name);
      console.log(
        "Venue location: " +
          bandData[i].venue.city +
          "," +
          bandData[i].venue.region
      );
      console.log(
        "Date of the Event: " +
          moment(bandData[i].datetime).format("MM/DD/YYYY")
      );
    }
  });
}

function spotifyThis() {
  spotify
    .search({ type: "track", query: track })
    .then(function(spotResponse) {
      var songInfo = spotResponse.tracks.items;
      for (i = 0; i < songInfo.length; i++) {
        var artistsInfo = songInfo[i].album.artists;

        for (a = 0; a < artistsInfo.length; a++) {
          console.log("Artist(s): " + artistsInfo[a].name);
        }
        console.log("Song: " + songInfo[i].name);
        console.log("Preview Link: " + songInfo[i].preview_url);
        console.log("Album: " + songInfo[i].album.name + "\r\n");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

function omdb() {
  var queryURL =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=8ab629cd";

  axios.get(queryURL).then(function(movie) {
    console.log("\nTitle: " + movie.data.Title + "\r\n");
    console.log(
      "Release Year: " + movie.data.Released.substring(7, 11) + "\r\n"
    );
    console.log("IMDB Rating: " + movie.data.imdbRating + "\r\n");
    console.log("Rotten Tomatoes Rating: " + movie.data.Ratings[1].Value + "\r\n");
    console.log("Language: " + movie.data.Language + "\r\n");
    console.log("Plot : " + movie.data.Plot + "\r\n");
    console.log("Actors: " + movie.data.Actors + "\r\n");
  });
}