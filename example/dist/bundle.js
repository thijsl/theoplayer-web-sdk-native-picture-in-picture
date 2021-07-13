(function (THEOplayer) {
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

    class NativePictureInPictureTHEOplayer {
        constructor(THEOplayer, player, configuration) {
            this.THEOplayer = THEOplayer;
            this.player = player;
            this.configuration = configuration;
            this.supportsPiP = 'pictureInPictureEnabled' in document;

            const createDefaultUICSS = function() {
                const hasCSS = document.querySelector('style#pip-theo');
                if (!hasCSS) {
                    const css = document.createElement('style');
                    css.setAttribute('id', 'pip-theo');
                    css.innerText = `.theo-pip-native:before {
                       content: "\\f122";
                       font-family: "THEOplayer";
                     }
                    .theo-pip-native.active-pip:before {
                       content: "\\f123";
                       font-family: "THEOplayer";
                    }`;
                    document.head.appendChild(css);
                }
            };

            const updatePiPButton = function() {
                console.log("update button");
                const isPiP = !!document.pictureInPictureElement;
                const pipButton = player.element.parentNode.querySelector('.theo-pip-native');
                if (pipButton) {
                    pipButton.classList.remove('active-pip');
                    if (isPiP) {
                        console.log("is active pip");
                        pipButton.classList.add('active-pip');
                    }
                }
            };

            const createUIButton = function() {
                createDefaultUICSS();
                const Button = THEOplayer.videojs.getComponent("Button");
                const PiPButton = THEOplayer.videojs.extend(Button, {
                    constructor: function() {
                        Button.apply(this, arguments);
                        // add tooltip
                        var tooltipSpan = document.createElement("span");
                        tooltipSpan.className = "theo-button-tooltip vjs-hidden";
                        tooltipSpan.innerText = "Enter Picture-in-Picture";
                        function toggleTooltip() {
                            tooltipSpan.classList.toggle("vjs-hidden");
                        }
                        this.el().addEventListener("mouseover", toggleTooltip);
                        this.el().addEventListener("mouseout", toggleTooltip);
                        this.el().appendChild(tooltipSpan);
                    },
                    async handleClick() {
                        const video = player.element.querySelectorAll('video[src]')[0];
                        if (video) {
                            try {
                                if (video !== document.pictureInPictureElement) {
                                    await video.requestPictureInPicture();
                                } else {
                                    await document.exitPictureInPicture();
                                }
                            }
                            catch(error) {
                                // TODO: Show error message to user.
                            }
                            finally {
                                // updatePiPButton();
                            }
                        }
                    },
                    buildCSSClass: function() {
                        return "theo-pip-native theo-controlbar-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button"; // insert all class names here
                    }
                });
                THEOplayer.videojs.registerComponent("PiPButton", PiPButton);
                player.ui.getChild("controlBar").addChild("PiPButton", {});

                let videos = player.element.querySelectorAll('video');
                for (let i = 0; i < videos.length; i++) {
                    const videoElement = videos[i];
                    videoElement.addEventListener('enterpictureinpicture', function(event) {
                        updatePiPButton();
                    });

                    videoElement.addEventListener('leavepictureinpicture', function(event) {
                        updatePiPButton();
                    });
                }

            };

            if (this.supportsPiP) {
                if (configuration && configuration.defaultUI) {
                    createUIButton(this.player.element);
                }
            }

        }
    }


    // module.exports.NativePictureInPictureTHEOplayer = NativePictureInPictureTHEOplayer;

    const element = document.getElementById('my-player');
    const configuration = {
        license: 'sZP7IYe6T6PK3LXg3K0_0OziIDakFSatCL5-CSht06kK3KaiTuaz3QCoCo06FOPlUY3zWokgbgjNIOf9fKaZTux10LUlFDXgTSb-3QIg06k1IKhrFSBrISCo0QPeCo0i36fVfK4_bQgZCYxNWoryIQXzImf90SCc3lCo3lai0u5i0Oi6Io4pIYP1UQgqWgjeCYxgflEc3lBc3Sez3uRt0S5cFOPeWok1dDrLYtA1Ioh6TgV6UQ1gWtAVCYggb6rlWoz6FOPVWo31WQ1qbta6FOfJfgzVfKxqWDXNWG3ybojkbK3gflNWfGxEIDjiWQXrIYfpCoj-f6i6WQjlCDcEWt3zf6i6v6PUFOPLIQ-LflNWfK1zWDikfgzVfG3gWKxydDkibK4LbogqW6f9UwPkIYz',
        libraryLocation: './vendor/theoplayer/'
    };

    const player = new THEOplayer__namespace.Player(element, configuration);
    new NativePictureInPictureTHEOplayer(THEOplayer__namespace, player, {defaultUI: true});

    player.src = '//cdn.theoplayer.com/video/elephants-dream/playlist.m3u8';

}(THEOplayer));
