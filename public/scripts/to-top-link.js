//show a shortcut to top of page if user has began scrolling down
//will scroll page smoothly to top if user clicks on link
$(document).ready(function() {
  $(document).on('scroll', function(event) {
    const pos = $(document).scrollTop();
    const $link = $('#to-top');
    const linkHTML = `
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-double-up" class="svg-inline--fa fa-angle-double-up fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z"></path></svg>
    `;

    if (pos > 0) {
      $link.html(linkHTML);
    } else {
      $link.html('');
    }
  });

  $('#to-top').on('click', function(event) {
    event.preventDefault();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  });
});