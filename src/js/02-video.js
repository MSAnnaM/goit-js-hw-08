import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
const keyLocalStorage = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const play = data => {
  localStorage.setItem(keyLocalStorage, data.seconds);
};
player.on('timeupdate', throttle(play, 1000));
const actualTime = +localStorage.getItem(keyLocalStorage);
player
  .setCurrentTime(actualTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
