var topics = ['ford mustang', 'chevrolet corvette', 'chevrolet camaro', 'ford super snake', 'chevrolet z06', 'dodge challenger', 'dodge viper', 'audi r8', 'porsche 911', 'audi tt', 'nissan GTR', 'subaru WRX', 'BMW M3', 'BMW M5', 'jaguar f-type', 'acura nsx', 'lexus lc', 'lamborghini huracan', 'aston martin v12 vantage'];
var favorites = [];
// create buttons
function buttons() {
    // clear div of buttons
    $('.button-div').empty();
    // loop through array to create buttons 
    for ( var i = 0; i < topics.length; i++ ) {
        var text = topics[i].toUpperCase();
        var newButton = $('<button>').text(text);
        newButton.attr('data-search', topics[i]).addClass('giphy');
        $('.button-div').append(newButton);
    }
}

// display information on selected giphy
function displayGifs() {
    // grab data name
    var searchName = $(this).attr('data-search');
    // set URL
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchName + "&limit=10&api_key=QeY1YZllxF0mUC9JEYs9YbhEWVqaVdVG"

    // ajax call
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        for ( var i = 0; i < response.data.length; i++ ) {
            var results = response.data;
            var gifDisplay = $('<div>');
            gifDisplay.addClass('gif-card');
            var upperRating = results[i].rating.toUpperCase();
            var rating = $('<p>').text('Rating: ' + upperRating);
            var favorite = $('<i class="fas fa-heart no-fav"></i>');
            favorite.attr('data-fav', 'false').attr('data-id', results[i].id);
            var image = $('<img>').addClass('gif');
            image.attr('src', results[i].images.fixed_width_still.url );
            image.attr('data-still', results[i].images.fixed_width_still.url );
            image.attr('data-animate', results[i].images.fixed_width.url );
            image.attr('data-state', 'still' );
            gifDisplay.append(image, rating, favorite);
            $('.giphy-display').prepend(gifDisplay);
        }
    })
}

function animateToggle() {
    console.log(this);
    var state = $(this).attr('data-state');
    if ( state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        state = $(this).attr('data-state', 'animate')
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        state = $(this).attr('data-state', 'still')
    }
}

function addToFavs() {
    favorites.push($(this).attr('data-id'));
    displayFavs();
}

function removeFromFav() {
    for ( let i = 0; i < favorites.length ; i++) {
 
        if ($(this).attr('data-id') === favorites[i]) {
            console.log('splice')
            favorites.splice(i, 1)
        }
    }
    displayFavs();

}

function displayFavs() {
    $('.favorites').empty();
    $('.favorites').append('<hr><h2>Favorites</h2>');
    for ( var i = 0; i < favorites.length; i++ ) {
        var favID = favorites[i];
        var queryURL = "http://api.giphy.com/v1/gifs/" + favID + "?limit=1&api_key=QeY1YZllxF0mUC9JEYs9YbhEWVqaVdVG"

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            var results = response.data;
            var favDisplay = $('<div>');
            favDisplay.addClass('gif-card');
            var upperRating = results.rating.toUpperCase();
            var rating = $('<p>').text('Rating: ' + upperRating);
            var favorite = $('<i class="fas fa-heart fav"></i>');
            favorite.attr('data-fav', 'true');
            favorite.attr('data-id', results.id);
            var image = $('<img>').addClass('gif');
            image.attr('src', results.images.fixed_width_still.url );
            image.attr('data-still', results.images.fixed_width_still.url );
            image.attr('data-animate', results.images.fixed_width.url );
            image.attr('data-state', 'still' );
            favDisplay.append(image, rating, favorite);
            $('.favorites').append(favDisplay);
        })
    }
    if (favorites.length == 0) {
        $('.favorites').empty();
    }
}

// click event on submit button
$('#add-giphy').on('click', function(e) {
    e.preventDefault();
    var userSearch = $('#giphy-input').val().trim()
    topics.push(userSearch);
    buttons();
});

// click event on giphy buttons and run displayGifs function
$(document).on('click', '.giphy', displayGifs);
$(document).on('click', '.gif', animateToggle);
$('#clear').on('click', function() {
    $('.giphy-display').empty();
})
$('.giphy-display').on('click', '.no-fav', addToFavs);
$('.favorites').on('click', '.fav', removeFromFav);

buttons();