# Liri-Node-App
Make LIRI (Language Interpretation and Recognition Interface) command line node app that gets user requests and responds back data from Spotify, Twitter, IMDB using Spotify API, Twitter API, IMDB API respectively.

File liri.js can be executed by following commands:

1.  `my-tweets`

2.  `spotify-this-song`

3.  `movie-this`

4.  `do-what-it-says`

What Each Command Should Do

1. node liri.js my-tweets

    This will show the last 20 tweets and created dates in your terminal/bash window and also write them to log.txt

    Twitter API Package Used - https://www.npmjs.com/package/twitter

    Example data below:
    
        ------------- My Latest Tweets -------------

        1. Created on: Fri Apr 27 00:50:22 +0000 2018
        Tweet: Amazon (AMZN) said Thursday it made $1.6 billion in profit during the first three months of 2018, more than double… https://t.co/sjtGjznLbe
        ---------------------------------------------

        2. Created on: Fri Apr 27 00:49:19 +0000 2018
        Tweet: The Marvel Cinematic Universe is more than just action-packed fighting, cool super suits and memorable one-liners.… https://t.co/CFrvI4CVvs
        ---------------------------------------------

        3. Created on: Fri Apr 27 00:48:18 +0000 2018
        Tweet: NFL Draft 2018 Results: Round 1 Live Updates, Reaction and Analysis on Day 1
        https://t.co/YMDUVccdk0
        ---------------------------------------------

        4. Created on: Fri Apr 27 00:47:20 +0000 2018
        Tweet: North and South Korean leaders hold historic meeting.
        https://t.co/mHRMuru5uV
        ---------------------------------------------

2. node liri.js spotify-this-song '<song name here>'

    This will show the following information about the song in your terminal/bash window and write query song details to log.txt

    API used: node-spotify-api package in order to retrieve song information from the Spotify API.

    ** If no song is provided then your program will default to "The Sign" by Ace of Base.

    Artist(s):
    The Song's Title:
    A preview link of the song from Spotify:
    The album that the song is from:

    Example data below:

        ++++++++++++++ Spotify Song Info +++++++++++++
        Artist: Backstreet Boys
        Song Title: I Want It That Way
        Preview Link: https://open.spotify.com/track/6e40mgJiCid5HRAGrbpGA6
        Album Name: The Hits--Chapter One


3. node liri.js movie-this '<movie name here>'

    This will show the following information to your terminal/bash window and log to log.txt file:

    API used: The request package to retrieve data from the OMDB API.

    ** If no movie title provided then the app will output data from the movie 'Mr. Nobody.'

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.

    Example data below:

        ++++++++++++++ OMDB Movie Info +++++++++++++
        Title: Face/Off
        Release Year: 1997
        IMDB Rating: 7.3
        Rotten Tomatoes Rating: 82/100
        Country Movie Produced in: USA
        Language: English, Latin
        Plot: In order to foil an extortion plot, an FBI agent undergoes a facial transplant surgery and assumes the identity and physical appearance of a terrorist, but the plan turns from bad to worse when the same terrorist impersonates the FBI agent.
        Actors: John Travolta, Nicolas Cage, Joan Allen, Alessandro Nivola


4. node liri.js do-what-it-says

    This will invoke readFile command using fs Node Package and read data from the random.txt. The app will execute commands in the file and show results in the terminal/bash windows and save to log.txt file.

    ** This App can read and execute multiple lines from the file.

    Example data below:

    1. random.txt
    
        spotify-this-song,I Want it That Way
        movie-this,Face/Off
    
    2. result
    
            ++++++++++++++ OMDB Movie Info +++++++++++++
            Title: Face/Off
            Release Year: 1997
            IMDB Rating: 7.3
            Rotten Tomatoes Rating: 82/100
            Country Movie Produced in: USA
            Language: English, Latin
            Plot: In order to foil an extortion plot, an FBI agent undergoes a facial transplant surgery and assumes the identity and physical appearance of a terrorist, but the plan turns from bad to worse when the same terrorist impersonates the FBI agent.
            Actors: John Travolta, Nicolas Cage, Joan Allen, Alessandro Nivola


            ++++++++++++++ Spotify Song Info +++++++++++++
            Artist: Backstreet Boys
            Song Title: I Want It That Way
            Preview Link: https://open.spotify.com/track/6e40mgJiCid5HRAGrbpGA6
            Album Name: The Hits--Chapter One

        

