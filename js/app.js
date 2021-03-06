$(document).ready(function() {


 $('form').submit(function (evt) {
    // highlight the button
    // not AJAX, just cool looking
   evt.preventDefault();
   
   var $searchField = $('#search');
   var $submitButton = $('#submit');
   
   var searchTerm = $searchField.val();
   
   $searchField.prop("disabled", true);
   $submitButton.prop("disabled", true).val('Searching...');

    // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    
    var flickrOptions = {
      tags: searchTerm,
      format: "json"
    };
    
   function displayPhotos(data) {
      var photoHTML = '<ul>';
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a target= "blank" href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      $searchField.prop('disabled', false);
      $submitButton.prop('disabled', false).val('Search');
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end click

}); // end ready