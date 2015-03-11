var search = "potatoes";
var imgCount = 8;

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
      self.parseImages();
    });
  },

  parseImages: function() {
    $('#main').append('<img src="http://t2.gstatic.com/images?q=tbn:ANd9GcRVqizIOId0ABApma0lOiEf6Nwy99Bm2RUNec7NEeJayll2weAAQgOTlTS6" />');
  }

};

$(document).ready(function() {
  myApp.initialize();
});
