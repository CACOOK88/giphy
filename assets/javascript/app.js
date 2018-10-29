///////////////////////////////////////////////////

//              ARRAYS FOR GIPHY                 //

///////////////////////////////////////////////////
var topics = ['ford mustang', 'chevrolet corvette', 'chevrolet camaro', 'ford super snake', 'chevrolet z06', 'dodge challenger', 'dodge viper', 'audi r8', 'porsche 911', 'audi tt', 'nissan GTR', 'subaru WRX', 'BMW M3', 'BMW M5', 'jaguar f-type', 'acura nsx', 'lexus lc', 'lamborghini huracan', 'aston martin v12 vantage'];
var favorites = [];

///////////////////////////////////////////////////

//              FUNCTIONS                        //

///////////////////////////////////////////////////
// create buttons of giphy searches
function buttons() {
    // clear div of any existing buttons
    $('.button-div').empty();
    // loop through array to create buttons 
    for ( var i = 0; i < topics.length; i++ ) {
        // create variable to hold array index in all CAPS
        var text = topics[i].toUpperCase();
        // create a new button element with text from array
        var newButton = $('<button>').text(text);
        // add attribute to identify later and class 
        newButton.attr('data-search', topics[i]).addClass('giphy');
        // add new button to html
        $('.button-div').append(newButton);
    }
}

// display information on selected giphy
function displayGifs() {
    // grab data name
    var searchName = $(this).attr('data-search');
    // set URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&limit=10&api_key=QeY1YZllxF0mUC9JEYs9YbhEWVqaVdVG"

    // ajax call
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        // loop through array response from the API
        for ( var i = 0; i < response.data.length; i++ ) {
            // set variable to grab array
            var results = response.data;
            // create new div to add to html
            var gifDisplay = $('<div>');
            // add class to div for styling
            gifDisplay.addClass('gif-card');
            // create variables to hold rating, favorite heart
            var upperRating = results[i].rating.toUpperCase();
            var rating = $('<p>').text('Rating: ' + upperRating);
            var favorite = $('<i class="fas fa-heart no-fav"></i>');
            favorite.attr('data-fav', 'false').attr('data-id', results[i].id);
            // create image variable and add attributes for toggle function
            var image = $('<img>').addClass('gif');
            image.attr('src', results[i].images.fixed_width_still.url );
            image.attr('data-still', results[i].images.fixed_width_still.url );
            image.attr('data-animate', results[i].images.fixed_width.url );
            image.attr('data-state', 'still' );
            // add all variables to the new div 
            gifDisplay.append(image, rating, favorite);
            // add new div to html
            $('.giphy-display').prepend(gifDisplay);
        }
    })
}

// toggle function to play or stop the animated GIF
function animateToggle() {
    // grab and hold the clicked item's state
    var state = $(this).attr('data-state');
    // check if still, then switch to animate and swap src to animated url
    if ( state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        state = $(this).attr('data-state', 'animate')
    } else { // check if animate, then switch to still and swap src to still url
        $(this).attr('src', $(this).attr('data-still'));
        state = $(this).attr('data-state', 'still')
    }
}

// add to favorites section
function addToFavs() {
    // grab the data ID and add to favorites array
    favorites.push($(this).attr('data-id'));
    displayFavs();
}

// use data-id of clicked heart to make ajax call and add to html
function displayFavs() {
    // clear any existing elements
    $('.favorites').empty();
    // add section header for favorites
    $('.favorites').append('<hr><h2>Favorites</h2>');
    // loop through array of favorites
    for ( var i = 0; i < favorites.length; i++ ) {
        // set variable to the ID of each item in array
        var favID = favorites[i];
        // update API URL with ID
        var queryURL = "https://api.giphy.com/v1/gifs/" + favID + "?limit=1&api_key=QeY1YZllxF0mUC9JEYs9YbhEWVqaVdVG"

        // ajax call
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            // set variable to hold response info
            var results = response.data;
            // create new div
            var favDisplay = $('<div>');
            // add class for styling
            favDisplay.addClass('gif-card');
            // set variables for rating, heart
            var upperRating = results.rating.toUpperCase();
            var rating = $('<p>').text('Rating: ' + upperRating);
            var favorite = $('<i class="fas fa-heart fav"></i>');
            favorite.attr('data-fav', 'true');
            favorite.attr('data-id', results.id);
            // create new image and add attributes for toggling play
            var image = $('<img>').addClass('gif');
            image.attr('src', results.images.fixed_width_still.url );
            image.attr('data-still', results.images.fixed_width_still.url );
            image.attr('data-animate', results.images.fixed_width.url );
            image.attr('data-state', 'still' );
            // add image, rating and heart to the new div
            favDisplay.append(image, rating, favorite);
            // add new element to html
            $('.favorites').append(favDisplay);
        })
    }
    // check if favorites array is empty in case all are removed
    if (favorites.length == 0) {
        $('.favorites').empty();
    }
}

// when user clicks heart in favorite section
function removeFromFav() {
    // loop through favorites array
    for ( let i = 0; i < favorites.length ; i++) {
        // check if the id of clicked element is in favorites array
        if ($(this).attr('data-id') === favorites[i]) {
            // if so, remove that index from the array
            favorites.splice(i, 1)
        }
    }
    // re run display of favs with new updated favorites array
    displayFavs();

}

///////////////////////////////////////////////////

//       CLICK LISTENERS TO RUN FUNCTIONS        //

///////////////////////////////////////////////////

// when user clicks add new button
$('#add-giphy').on('click', function(e) {
    // prevent refresh on button press
    e.preventDefault();
    // setting variable to value from text input box
    var userSearch = $('#giphy-input').val().trim()
    // pushing item to topics array
    topics.push(userSearch);
    // run function to render all the buttons again
    buttons();
});
// click event on giphy buttons and run displayGifs function
$(document).on('click', '.giphy', displayGifs);
// click event on dynamically added gif to play or stop animation
$(document).on('click', '.gif', animateToggle);
// click event on clear button to clear gif display but hold favorites
$('#clear').on('click', function() {
    $('.giphy-display').empty();
})
// when white heart is clicked, add that GIF to favorites section
$('.giphy-display').on('click', '.no-fav', addToFavs);
// when red heart in fav section is clicked, remove that GIF from favorites section
$('.favorites').on('click', '.fav', removeFromFav);
// run buttons to render on initial screen load
buttons();