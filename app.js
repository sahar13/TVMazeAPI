//create an empty object to hold the data and functionality of the app
var app = {};

//create an init method that holds the code that runs upon initializing the app
app.init = function(){
  app.getShow('girls'); //will use 'girls' as query in app.getShow by default
  //create an event listener on select element that runs every time a new menu item is selected
  $('#keyword').on('change', function(){
    //store value of menu item selected
    var keyword = $(this).val();
    //empy #shows div so that previous queries get deleted and replaced by new queries
    $('#shows').empty();
    //pass keyword with stored menu item into getShow method
    app.getShow(keyword);
  });
};

//getShow method will make the Ajax request to the API
app.getShow = function(query){ //uses query from data object below as paramater
  $.ajax({
    url: 'http://api.tvmaze.com/search/shows',
    method: 'GET',
    data: {
      q: query
    }, //anything written in this data object will be appended to the url
    success: function(result){
      //console.log(result);
      //pass result of Ajax request into displayShow method
      app.displayShow(result);
    },
    error: function(error){
      console.log('Oops! Something went wrong.')
    }
  });
};

//displayShow method is called in getShow method if the Ajax request is successful
app.displayShow = function(showArray){
  //forEach is how you loop in jQuery
  showArray.forEach(function(showExample){
    console.log(showExample.show);
    //create elements for each piece of data
    var title = $('<h2>').text(showExample.show.name);
    var summary = $('<p>').append(showExample.show.summary);
    var image = $('<img>').attr('src',showExample.show.image.medium);
    //add all elements into one div
    var showHTML = $('<div>').addClass('show-example').append(title, summary, image);
    //append entire div to webpage
    $('#shows').append(showHTML);
  });
};

$(function(){
  app.init(); //start the app!
});
