import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.js',
    output: {
        file: 'index.js',
        format: 'cjs', // immediately-invoked function expression — suitable for <script> tags
    },
    plugins: [
        resolve(), // tells Rollup how to find date-fns in node_modules
        commonjs(), // converts date-fns to ES modules
        babel({
            exclude: 'node_modules/**'
        }),
        production && uglify() // minify, but only in production
    ],
    sourcemap: true
};