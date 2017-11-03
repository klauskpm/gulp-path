"use strict";

const gulpPath = require('../index');

// Path and SubPath
let app = new gulpPath.Path('./development', './production', ['public', 'admin']);
let subApp = app.createSubPath('sub');

console.log('input', app.generateInput('sass', null, 'sass'));
console.log('output', app.generateOutput('css'));
console.log('all', app.generateAllPaths('sass', 'css', null, 'sass'));
console.log('subPath', subApp.generateAllPaths('js', null, null, ['js', 'min.js']));

// Blob
console.log('Input', gulpPath.generateBlob(['development', 'production'], ['public', 'admin'], '*', 'sass'));
console.log('Output', gulpPath.generateBlob(['development', 'production'], ['public', 'admin']));