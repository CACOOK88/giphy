var topics = ['ford mustang', 'chevrolet corvette', 'chevrolet camaro', 'ford super snake', 'chevrolet z06', 'dodge challenger', 'dodge viper', 'audi r8', 'porsche 911', 'audi tt', 'nissan GTR', 'subaru WRX', 'BMW M3', 'BMW M5', 'jaguar f-type', 'acura nsx', 'lexus lc', 'lamborghini huracan', 'aston martin v12 vantage'];

// create buttons
function buttons() {
    // clear div of buttons
    $('.button-div').empty();
    // loop through array to create buttons 
    for ( var i = 0; i < topics.length; i++ ) {
        var newButton = $('<button>').text(topics[i]);
        newButton.attr('data-search', topics[i]).addClass('giphy');
        $('.button-div').append(newButton);
    }
    // add class to add click function
    // add attribute for identifying in display function
}

// display information on selected giphy
function displayInfo() {
    // grab data name
    var searchName = $(this).attr('data-search');
    // set URL
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchName + "&limit=10&api_key=QeY1YZllxF0mUC9JEYs9YbhEWVqaVdVG"

    // ajax call
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        for ( var i = 0; i < response.data.length; i++ ) {
            var results = response.data;
            var gifDisplay = $('<div>');
            var upperRating = results[i].rating.toUpperCase();
            var rating = $('<p>').text('Rating: ' + upperRating);
            var image = $('<img>').addClass('gif');
            image.attr('src', results[i].images.fixed_width_still.url );
            image.attr('data-still', results[i].images.fixed_width_still.url );
            image.attr('data-animate', results[i].images.fixed_width.url );
            image.attr('data-state', 'still' );
            gifDisplay.append(image, rating);
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

// click event on submit button
$('#add-giphy').on('click', function(e) {
    e.preventDefault();
    var userSearch = $('#giphy-input').val().trim()
    topics.push(userSearch);
    buttons();
});

// click event on giphy buttons and run displayInfo function
$(document).on('click', '.giphy', displayInfo);
$(document).on('click', '.gif', animateToggle);
$('#clear').on('click', function() {
    $('.giphy-display').empty();
})
buttons();