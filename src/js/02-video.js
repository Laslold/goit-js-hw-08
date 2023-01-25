const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
import throttle from 'lodash.throttle';
const LOCALSTORAGE_KEY = 'videoplayer-current-time';
player.on(
  'timeupdate',
  throttle(function (time) {
    localStorage.setItem(LOCALSTORAGE_KEY, time.seconds);
  }, 1000)
);

player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY) || 0);
