export default {
    input: './src/index.js',
    output: [{
        file: './dist/theoplayer-web-native-picture-in-picture.js',
        format: 'umd',
        name: 'THEOplayerNativePictureInPicture'
    }, {
        file: './dist/theoplayer-web-native-picture-in-picture.mjs',
        format: 'es'
    }]
};
