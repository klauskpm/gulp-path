'use strict';

var Base = require('./base');
var filesPaths = require('./files');

var assets = new Base({
        src: './assets/',
        dest: './resources/'
    }),
    views = new Base('./views/'),
    root = new Base(),
    app = new Base({
        src: [
            './app/',
            './js/'
        ],
        dest: [
            './dest/',
            './concat/'
        ]
    });

var paths = {
        img: assets.Path('img'),
        js: assets.Path('js', 'js'),
        fonts: views.Path('fonts'),
        controllers: root.Path('controllers', 'js'),
        data: app.Path()
    };

console.log(paths);

console.log(
    paths.img.files(null, ['png', 'jpg', 'gif']),
    paths.img.files(),
    paths.js.files(['compiled', 'main'], 'min.js'),
    paths.fonts.files(['Roboto', 'glyphicons-halflings-regular'], ['eot', 'ttf', 'svg', 'woff', 'woff2']),
    paths.controllers.files('homeController', ['min.js', 'js']),
    paths.data.files(['main', 'sub-service'], ['min.js', 'js']),
    filesPaths(['./app/', './resource/**/'], null, ['scss', 'css']),
    filesPaths()
);

module.exports = {
    Base: Base,
    filesPaths: filesPaths
};