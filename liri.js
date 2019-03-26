require('dotenv').config();
let Spotify = require('node-spotify-api');
let axios = require("axios");

let keys = require("./keys.js");
let input = process.argv;

function liri_spotify(track_name) {
    let spotify = new Spotify(keys.spotify);
    if (track_name === undefined) {
        spotify.search({ type: 'track', query: 'track:The+Sign+artist:Ace+of+Base', limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            let artists = data['tracks']["items"][0]['album']['artists'][0]['name'];
            let song_name = data['tracks']["items"][0]['name'];
            let preview_link = data['tracks']["items"][0]['external_urls']['spotify'];
            let album_name = data['tracks']["items"][0]['album']['name'];
            console.log(artists);
            console.log(song_name);
            console.log(preview_link);
            console.log(album_name);
        });
    }
    else {
        spotify.search({ type: 'track', query: track_name, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            let artists = data['tracks']["items"][0]['album']['artists'][0]['name'];
            let song_name = data['tracks']["items"][0]['name'];
            let preview_link = data['tracks']["items"][0]['external_urls']['spotify'];
            let album_name = data['tracks']["items"][0]['album']['name'];
            console.log(artists);
            console.log(song_name);
            console.log(preview_link);
            console.log(album_name);
        });
    }
    
}

function liri_concert(artist_name) {
    if (artist_name === undefined) {
        console.log("Please provide Artist field");
    }
    else {
        artist_name = artist_name.split(" ");
        let artist_name_query = "";
        for (var i = 0; i < artist_name.length; i++) {
            if (artist_name_query === "") {
                artist_name_query += artist_name[i];
            }
            else {
                artist_name_query += "%20" + artist_name[i];
            }
        }
        let queryUrl = "https://rest.bandsintown.com/artists/" + artist_name_query + "/events?app_id=codingbootcamp";
        console.log(queryUrl);
        axios.get(queryUrl).then(function(response) {
            for(var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name);
                let city = response.data[i].venue.city;
                let region = response.data[i].venue.region;
                let country = response.data[i].venue.country;
                console.log(city + ", " + region + ", " + country);
                console.log(response.data[i].datetime);
            }
        });
    }
}

function liri_movie(movie_name) {
    if (movie_name === undefined) {
        let queryUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(function(response){
            console.log("* Title: " + response.data.Title);
            console.log("* Year Released: " + response.data.Year);
            console.log("* IMDB Rating: " + response.data.imdbRating);
            console.log("* Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("* Country Produced: " + response.data.Country);
            console.log("* Movie Language: " + response.data.Language);
            console.log("* Movie Plot: " + response.data.Plot);
            console.log("* Actors: " + response.data.Actors);
        });
    }
    else {
        movie_name = movie_name.split(" ");
        let movie_name_query = "";
        for(var i = 0; i < movie_name.length; i++) {
            if (movie_name_query === "") {
                movie_name_query += movie_name[i];
            }
            else {
                movie_name_query += "+" + movie_name[i];
            }
            
        }
        let queryUrl = "http://www.omdbapi.com/?t=" + movie_name_query + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(function(response){
            console.log("* Title: " + response.data.Title);
            console.log("* Year Released: " + response.data.Year);
            console.log("* IMDB Rating: " + response.data.imdbRating);
            console.log("* Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("* Country Produced: " + response.data.Country);
            console.log("* Movie Language: " + response.data.Language);
            console.log("* Movie Plot: " + response.data.Plot);
            console.log("* Actors: " + response.data.Actors);
        });
    }
    
}

function liri_dotxt() {

}



/////switch case
switch(input[2]) {
    case 'spotify-this-song':
        liri_spotify(input[3]);
        break;
    case 'do-what-it-says':
        liri_dotxt;
        break;
    case 'concert-this':
        liri_concert(input[3]);
        break;
    case 'movie-this':
        liri_movie(input[3]);
        break;
    default:
        console.log('default case error');
}

