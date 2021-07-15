# theoplayer-web-sdk-native-picture-in-picture

The `NativePictureInPictureTHEOplayer` class facilitates the implementation of the [Picture in Picture API](https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API).
This is a community project and is not maintained by THEO Technologies.

## Usage

You can include this project through its NPM package at [https://www.npmjs.com/package/theoplayer-web-native-picture-in-picture](https://www.npmjs.com/package/theoplayer-web-native-picture-in-picture), as demonstrated by the [`example/`](example/).
You can also modify and integrate [`src/NativePictureInPictureTHEOplayer`](src/NativePictureInPictureTHEOplayer.js) in your project.

To use this project, you must create an instance of the `NativePictureInPictureTHEOplayer` class. E.g.:
```javascript
const pipPlayer = new NativePictureInPictureTHEOplayer(THEOplayer, player, {defaultUI: true});
```

When you set `defaultUI: true`, a Picture-in-Picture button will automatically be inserted in the control bar of the default THEOplayer UI.

### API

We have tried to imitate the Picture-in-Picture API at https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API as much as possible.

You can call the following methods for your instance:

* `requestPictureInPicture()`
* `exitPictureInPicture()`
* `addEventListener(<event>, <callback>)` (e.g. `addEventListener('enterpictureinpicture', console.log)`)
* `removeEventListener(<event>, <callback>)` (e.g. `removeEventListener('enterpictureinpicture', console.log)`)

You can call the following properties for your instance:

* `disablePictureInPicture`
* `autoPictureInPicture`
* `pictureInPictureEnabled`
* `pictureInPictureElement`

## Limitations

* This implementation is not compatible with client-side ad insertion (CSAI). 
This is because CSAI leverages multiple `<video>` element, and transitioning between multiple `<video>` elements does not guarantee a smooth viewing experience.

## Remarks

* We welcome pull requests.