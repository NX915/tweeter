// counter that add and remove class to a counter element if user input goes over 140 characters
const charCounter = function() {
  const textInput = $('form').children("textarea").val();
  const counter = $('form').find("output");
  const count = 140 - textInput.length;

  if (count < 0) {
    $(counter).addClass("over-limit");
  } else {
    $(counter).removeClass("over-limit");
  }
  counter.html(count);
};

$(document).ready(function() {
  $(".new-tweet form").on('input', function() {
    charCounter();
  });
  $("form").on('success', function(event) {
    event.stopPropagation();
    charCounter();
  });
});