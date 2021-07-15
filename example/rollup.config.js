import copy from 'rollup-plugin-copy';
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    input: './src/index.js',
    output: {
        file: './dist/bundle.js',
        format: 'iife',
        globals: {
            theoplayer: 'THEOplayer'
        }
    },
    external: [ 'theoplayer' ],
    plugins: [
        nodeResolve(),
        commonjs(),
        copy({
            targets: [
                { src: './node_modules/theoplayer/*.(js|css|html)' , dest: './dist/vendor/theoplayer' },
                { src: './src/index.html' , dest: './dist' }
            ]
        })
    ]
};
