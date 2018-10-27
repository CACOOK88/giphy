var giphys = [];

// create buttons
function buttons() {
    // clear div of buttons
    $('.buttons').empty();
    // loop through array to create buttons 
    // add class to add click function
    // add attribute for identifying in display function
}

// display information on selected giphy
function displayInfo() {
    // grab data name
    // set URL
    // "http://api.giphy.com/v1/gifs/search?q=" + GIPHY SEARCH GOES HERE + "&api_key=QeY1YZllxF0mUC9JEYs9YbhEWVqaVdVG&limit=5"
    // 
    // ajax call

}

// click event on submit button
$('.add-giphy').on('click', function(e) {
    e.preventDefault();
    var userSearch = $('#giphy-input').val().trim()
    console.log(userSearch);
    giphys.push(userSearch);
    buttons();
});

// click event on giphy buttons and run displayInfo function
$('.buttons').on('click', '.giphy', displayInfo)