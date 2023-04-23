import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.setCurrentTime(localStorage.getItem(STORAGE_KEY));

player.on('timeupdate', throttle(onVideoTimeupdate, 1000));

function onVideoTimeupdate(data) {
  localStorage.setItem(STORAGE_KEY, `${data.seconds}`);
}
