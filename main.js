var search = "bdw c7";
var imgCount = 8;
var activeImage;
var score = 0;


$(document).ready(function() {
  myApp.initialize();
});

myApp = {

  initialize: function() {
    this.getImages();
    this.bindToSearchBox();
  },

  bindToSearchBox: function() {
    var self = this;

    $('#searchButton').click(function() {
      var searchTerm = $('#searchField').val();

      $('#main').empty();
      self.getImages(searchTerm);
    });
  },

  getImages: function(searchTerm) {
    var self = this;
    var searchQuery = searchTerm || search;
    var url = "https://ajax.googleapis.com/ajax/services/search/images?q=" + searchQuery + "&v=1.0&callback=?&rsz=" + imgCount;

    $.getJSON(url).done(
      function(data){
        var results = data.responseData.results;

        self.parseImages(results);
        self.parseImages(results);

        self.randomizeImages();
        self.bindToClickEvents();
    });
  },

  randomizeImages: function() {
    var $container = $('#main');
    var elems = $container.children('.item');

    elems.sort(function() { return (Math.round(Math.random())); });

    $container.detach('.item');

    for(var i=0; i < elems.length; i++) {
      $container.append(elems[i]);
    }
  },

  bindToClickEvents: function() {
    $('.item').click(function() {
      var $elClicked = $(this);
      var flippedItems = $('.item.active').length;
      $elClicked.addClass("active");

      if ( flippedItems >= 1 ) {
        var $key1 = $('.item.active').eq(0).data('index');
        var $key2 = $('.item.active').eq(1).data('index');

        if ($key1 == $key2 ) {
          $('.item.active').addClass('matched');
          myApp.updateScore();
        }

        setTimeout(function() {
          $('.item.active').removeClass('active');
        }, 800);
      }
    });
  },

  updateScore: function() {
    score++;
    $('#score').html(score);
  },

  parseImages: function(results) {

    $.each(results, function(index, array) {
      var img = results[index].unescapedUrl;

      $('#main').append(
        '<div data-index="' + index + '" class="item col-sm-4">' +
          '<div class="flipper">' +
            '<div class="front"><span>Front</span></div>'+
            '<div class="back">' +
              '<img class="img-responsive" src="'+ img +'"/>'+
            '</div>' +
          '</div>' +
        '</div>'
        );
    });
  }
};

