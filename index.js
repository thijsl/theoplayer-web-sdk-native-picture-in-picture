export class NativePictureInPictureTHEOplayer {
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
        }

        const updatePiPButton = function() {
            const isPiP = !!document.pictureInPictureElement;
            const pipButton = player.element.parentNode.querySelector('.theo-pip-native');
            if (pipButton) {
                pipButton.classList.remove('active-pip');
                if (isPiP) {
                    pipButton.classList.add('active-pip');
                }
            }
        }

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

        }

        if (this.supportsPiP) {
            if (configuration && configuration.defaultUI) {
                createUIButton(this.player.element)
            }
        }

    }
}


// module.exports.NativePictureInPictureTHEOplayer = NativePictureInPictureTHEOplayer;