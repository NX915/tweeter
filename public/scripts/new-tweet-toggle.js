//will toggle the new tweet form and bring the user to the form after clicking
const newTweetToggle = function() {
  $('#tweet-toggle').on('click', function(event) {
      
    const tweetDiv = $('.new-tweet');
    const icon = $('.tweet-toggle svg');
  
    event.preventDefault();
    if (tweetDiv.hasClass('hidden')) {
      tweetDiv.slideDown();
      tweetDiv.removeClass('hidden');
      icon.removeClass('hidden');
      $('#tweet-text').focus();
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    } else {
      tweetDiv.slideUp();
      tweetDiv.addClass('hidden');
      icon.addClass('hidden');
    }
  });
};

$(document).ready(() => {
  newTweetToggle();
});