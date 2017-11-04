"use strict";

var gp = require('../index');

var app = new gp.Path(['src', 'app'], 'public');

console.log('all', app.generateAllPaths(['styles', 'sass'], 'css', null, 'sass'));
console.log('input', app.generateInput(['styles', 'sass'], null, 'sass'));
console.log('output', app.generateOutput('css'));