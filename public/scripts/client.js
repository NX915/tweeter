//escape string to prevent CSX attack
const escape =  function(str) {

  let div = document.createElement('div');

  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//async call to get tweets from server
const loadTweets = function() {
  $.ajax({url: '/tweets', method: 'get'})
    .then(function(res) {
      renderTweets(res);
    })
    .catch(function(e) {
      console.log('get error ', e);
    });
};
//check if user tweet is valid, if so, run callback
const checkFormIsValid = function(event, cb) {

  const inputData = $(event.target).find('textarea').val();
  const errorEle = $(event.target).find('.error');
  
  errorEle.slideUp(() => {//first slide error msg up if one is already shown
    if (inputData === null || inputData.length === 0) {//slide down new error if needed
      errorEle.html('⚠︎ Tweet cannot be empty! ⚠︎');
      errorEle.slideDown();
    } else if (inputData.length > 140) {
      errorEle.html('⚠︎ Tweet too long! ⚠︎');
      errorEle.slideDown();
    } else {
      cb();
    }
  });
};
//send post request to server if user tweet is validated
//the load new tweets if post request succeedes
const newTweet = function() {

  $('form').on('submit', function(event) {
    
    const inputData = $(event.target).find('textarea');
    
    event.preventDefault();
    checkFormIsValid(event, () => {
      $.ajax({url: `${event.target.action}`, method: 'post', dataType: 'text', data: $(event.target).serialize()})
        .then(function(res) {
          console.log('success ', res);
          $(inputData).val('');
          loadTweets();
        })
        .catch(function(e) {
          console.log('post error ', e);
        });
    });
  });
};
//take tweets array from server and append them in reverse order
const renderTweets = function(tweetArr) {

  $('#tweets-container').html('');
  
  for (let i = tweetArr.length - 1; i >= 0; i--) {
    const $tweet = createTweetElement(tweetArr[i]);
  
    $('#tweets-container').append($tweet);
  }
};

/*
return the in between time in the largest unit (up to years) without decimals
will add plural when appropriate
will add an additional time behind year to help specificity

time1 = any UTC milisecond time string
time2 = optional, any UTC milisecond time string, defaults to now
*/
const getTimeDiffString = function(time1, time2 = Date.now()) {
  let output = '';
  const timeUnit = {second: 1000};
  const timeDiff = Math.abs(time1 - time2);
  let currentUnit = 'second';
  let timeInCurrentUnit;
  timeUnit.minute = timeUnit.second * 60;
  timeUnit.hour = timeUnit.minute * 60;
  timeUnit.day = timeUnit.hour * 24;
  timeUnit.month = timeUnit.day * 30;
  timeUnit.year = timeUnit.month * 12;
  
  for (const unit in timeUnit) {
    if (timeDiff / timeUnit[unit] > 1 && timeUnit[unit] > timeUnit[currentUnit]) {
      currentUnit = unit;
    } else if (timeDiff / timeUnit[unit] < 1) {
      break;
    }
  }

  timeInCurrentUnit = Math.floor(timeDiff / timeUnit[currentUnit]);
  output = `${timeInCurrentUnit} ${currentUnit}`;

  if (timeInCurrentUnit > 1) {
    output += `s`;
  }

  if (currentUnit === 'year') {
    output += ` ${getTimeDiffString(0, timeDiff - timeUnit.year * timeInCurrentUnit)}`;
  }

  return output;
};
//generate html for individual tweet element
const createTweetElement = function(tweet) {

  const { user, content } = tweet;

  tweetHTML = $(`
    <article class="tweet">
      <header>
        <div>
          <img src="${user.avatars}">
          <div>
            ${escape(user.name)}
          </div>
        </div>
        <div class="handle">
          ${escape(user.handle)}
        </div>
      </header>
      <p>${escape(content.text)}</p>
      <footer>
        <time>${getTimeDiffString(tweet.created_at)} ago</time>
        <div class="icon">
          <a><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="flag" class="svg-inline--fa fa-flag fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M349.565 98.783C295.978 98.783 251.721 64 184.348 64c-24.955 0-47.309 4.384-68.045 12.013a55.947 55.947 0 0 0 3.586-23.562C118.117 24.015 94.806 1.206 66.338.048 34.345-1.254 8 24.296 8 56c0 19.026 9.497 35.825 24 45.945V488c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-94.4c28.311-12.064 63.582-22.122 114.435-22.122 53.588 0 97.844 34.783 165.217 34.783 48.169 0 86.667-16.294 122.505-40.858C506.84 359.452 512 349.571 512 339.045v-243.1c0-23.393-24.269-38.87-45.485-29.016-34.338 15.948-76.454 31.854-116.95 31.854z"></path></svg></a>
          <a><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="retweet" class="svg-inline--fa fa-retweet fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"></path></svg></a>
          <a><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg></a>
        </div>
      </footer>
    </article>
  `);
  return tweetHTML;
};

//driver code
$(document).ready(() => {
  loadTweets();
  newTweet();
});