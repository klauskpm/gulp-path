"use strict";

var gp = require('../index');

var app = new gp.Path('src');

console.log('all', app.generateAllPaths('img', 'public', null, ['png', 'jpg']));
console.log('input', app.generateInput('img', null, ['png', 'jpg']));
console.log('output', app.generateOutput('public'));