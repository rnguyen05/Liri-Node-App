
//Required config 
require("dotenv").config();

//Variable Declarations and Initializations
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require('request');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var action = process.argv;
var title;
var randomFile = 'random.txt';

//User action cases
switch (action[2]) {
    case 'my-tweets':
        getTweets();
    break;
    case 'spotify-this-song':
        if (action[3] === undefined) {
            title = 'The%20Sign%20Ace%20of%20Base';
            getSong(title);
        }
        else {
            title = action[3].split(' ').join('%20');
            getSong(title);
        };
    break;
    case 'movie-this':
        if (action[3] === undefined) {
            title = 'Mr.+Nobody';
            getMovie(title);
        }
        else {
            title = action[3].split(' ').join('+');
            getMovie(title);
        };
    break;
    case 'do-what-it-says':
        doWhatItSays();
    break;
    default:
        var notRecognized = "\n============= PLEASE USE BELOW COMMANDS =============\n"
                            + "node liri.js my-tweets\n"
                            + "node liri.js spotify-this-song 'song-title'\n"
                            + "node liri.js movie 'movie-title'\n"
                            + "node liri.js do-what-it-says\n\n";
        console.log(notRecognized);
        logToFile('err', 'default-commands', notRecognized);
}//End switch case

/************************** Log to File ************************/
function logToFile (data, fromFunction, errDetails) {
    if (data === 'err') {
        if (fromFunction === 'default-commands') {
            var logIt = "\n############# ERROR " + fromFunction + " ############"
            + "\nUser input command is NOT RECOGNIZED.\n"
            + errDetails
            + "\n\n";
        }
        else if (fromFunction === 'do-what-it-says') {
            var logIt = "\n############# ERROR " + fromFunction + " ############"
            + "\nThere is an error with random.tx file.\nPlease fix the file and try again.\n"
            + errDetails
            + "\n\n";
        }
        
        fs.appendFile("log.txt", logIt, function (err) {
            if (err) {
            return console.log(fromFunction + " data was not appended to the log.txt file.");
            }
        });
    }
    else {
        fs.appendFile("log.txt", fromFunction, function (err) {
            if (err) {
                return console.log(fromFunction + " data was not appended to the log.txt file.");
            }
        });
    }
}//End logToFile

/************************ Do What It Says **********************/
function doWhatItSays () {
   //Read data from random.txt
   fs.readFile(randomFile, 'utf8', readMe);

   //readMe callback function
   function readMe (err, data) {
       //Read multiple lines from input file
        if (err) {
            logToFile('err', 'do-what-it-says', err);
            return console.log('Error Reading File random.txt: ' + err);
        }
        else {
            var lines = data.split('\n');
            for (var i = 0; i < lines.length; i++) {
                if (err) {
                    logToFile('err', 'do-what-it-says', err);
                    return console.log('Error occurred: ' + err);
                }
                var readData = lines[i].split(',');
                action = readData[0];
                title = readData[1];
                if (action === 'spotify-this-song') {
                    getSong(title);
                }
                else if (action === 'movie-this') {
                    getMovie(title);
                }   
            }//End for loop
        }
   }//End of readMe
}//End of doWhatEver

/************************ Get Movie Information **********************/
function getMovie (title) {
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    //OMDB request 
    request(queryUrl, getMovieInfo);
    //getMovieInfo callback function
    function getMovieInfo (err, response, body) {
        if (err) {
            logToFile('err','movie-this');
            return console.log('Error occurred: ' + err);
        }
        var data = JSON.parse(body);
        var displayMovieInfo = "\n\n++++++++++++++ OMDB Movie Info +++++++++++++"
                            + "\nTitle: " + data.Title
                            + "\nRelease Year: " + data.Year
                            + "\nIMDB Rating: " + data.imdbRating
                            + "\nRotten Tomatoes Rating: " + data.Ratings[2].Value
                            + "\nCountry Movie Produced in: " + data.Country
                            + "\nLanguage: " + data.Language
                            + "\nPlot: " + data.Plot
                            + "\nActors: " + data.Actors 
                            + "\n";
        console.log(displayMovieInfo);
        logToFile('noerr', displayMovieInfo);
    }//End of getMovieInfo
}//getMovie

/************************ Get Spotify Song Information **********************/
function getSong (title) {
    var params = {
        type: 'track',
        query: title,
        limit: 1
    }
    //Spotify search query
    spotify.search (params, getSongInfo);
    //getSongInfo callback function
    function getSongInfo (err, data) {
        if (err) {
            logToFile('err','spotify-this-song', err);
            return console.log('Error occurred: ' + err);
        }
        var songInfo = data.tracks.items; 
        var displaySongInfo = "\n\n++++++++++++++ Spotify Song Info +++++++++++++"
                            + "\nArtist: " + songInfo[0].artists[0].name
                            + "\nSong Title: " + songInfo[0].name
                            + "\nPreview Link: " + songInfo[0].external_urls.spotify
                            + "\nAlbum Name: " + songInfo[0].album.name
                            + "\n";
        console.log(displaySongInfo);
        logToFile('noerr', displaySongInfo);
    }//End of getSongInfo
}//End of getMySong
    
/********************* getMyTweets function ********************/
function getTweets () {
    //Grab last 20 tweets
    var params = {
        q: 'tweets',
        count: 20
    };
    //Get Tweet Data
    client.get('statuses/user_timeline', params, gotTweetData);
    console.log("\n");
    //Function to console log tweet data
    function gotTweetData(err, data, response) {
        if (err) {
            logToFile('err', 'my-tweets');
            return console.log('Error occurred: ' + err);
        }
        console.log("\n------------- My Latest Tweets -------------\n");
        for (var i = 0; i < data.length; i++){
            var displayMyTweets = i+1+". Created on: " + data[i].created_at
                        + "\nTweet: " + data[i].text
                        + "\n---------------------------------------------\n";
            console.log(displayMyTweets);
            logToFile('noErr', displayMyTweets);
        }
        console.log("\n");
    }//End of getTweetData
}//End of getMyTweets

