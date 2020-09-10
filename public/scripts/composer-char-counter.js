$(document).ready(function() {
  // --- our code goes here ---
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