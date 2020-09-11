// counter that add and remove class to a counter element if user input goes over 140 characters
$(document).ready(function() {
  $(".new-tweet form").on('input', function() {
    const textInput = $(this).children("textarea").val();
    const counter = $(this).find("output");
    const count = 140 - textInput.length;

    if (count < 0) {
      $(counter).addClass("over-limit");
    } else {
      $(counter).removeClass("over-limit");
    }
    counter.html(count);
  });
});