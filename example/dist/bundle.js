(function (THEOplayer, theoplayerWebNativePictureInPicture) {
    'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var THEOplayer__namespace = /*#__PURE__*/_interopNamespace(THEOplayer);

    const element = document.getElementById('my-player');
    const configuration = {
        license: 'your_license_string',
        libraryLocation: './vendor/theoplayer/'
    };

    const player = new THEOplayer__namespace.Player(element, configuration);
    const pipPlayer = new theoplayerWebNativePictureInPicture.NativePictureInPictureTHEOplayer(THEOplayer__namespace, player, {defaultUI: true});
    window.pipPlayer = pipPlayer;
    window.player = player;

    player.src = '//cdn.theoplayer.com/video/elephants-dream/playlist.m3u8';

}(THEOplayer, theoplayerWebNativePictureInPicture));
