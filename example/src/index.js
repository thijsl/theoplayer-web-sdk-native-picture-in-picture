import * as THEOplayer from 'theoplayer';
import {NativePictureInPictureTHEOplayer} from "theoplayer-web-native-picture-in-picture";

const element = document.getElementById('my-player');
const configuration = {
    license: 'your_license_string',
    libraryLocation: './vendor/theoplayer/'
};

const player = new THEOplayer.Player(element, configuration);
const pipPlayer = new NativePictureInPictureTHEOplayer(THEOplayer, player, {defaultUI: true});
window.pipPlayer = pipPlayer;
window.player = player;

player.src = '//cdn.theoplayer.com/video/elephants-dream/playlist.m3u8';