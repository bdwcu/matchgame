var search = "bdw c7";
var imgCount = 8;
var activeImage;

myApp = {
  initialize: function() {
    this.getImages();
  },

  getImages: function() {
    var self = this;
    var url = "https://ajax.googleapis.com/ajax/services/search/images?q=" + search + "&v=1.0&callback=?&rsz=" + imgCount;
    console.log(this);

    $.getJSON(url).done(function(data){
      var results = data.responseData.results;

      self.parseImages(results);
      self.parseImages(results);
      self.bindToClickEvents();
    });
  },

  bindToClickEvents: function() {
    $('.item').click(function() {
      var $elClicked = $(this);
      var currentImage = $elClicked.data('index');
      var flippedImages = $('.item.active').length;

      if (activeImage === currentImage) {
        // Add class Matched to both
      }

      if (flippedImages > 1) {
        $('.item.active').removeClass('active');
      } else {
        $elClicked.addClass('active');
      }

      activeImage = currentImage
    });
  },

  parseImages: function(results) {

    $.each(results, function(index, array) {
      var img = results[index].unescapedUrl;
      $('#main').append(
        '<div data-index="' + index + '" class="item col-md-4">' +
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

$(document).ready(function() {
  myApp.initialize();
});
