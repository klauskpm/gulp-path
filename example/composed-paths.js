"use strict";

var gp = require('../index');

var app = new gp.Path('src', 'public', ['components', 'pages']);

console.log('all', app.generateAllPaths('**', 'scripts', null, 'js'));
console.log('input', app.generateInput('**', null, 'js'));
console.log('output', app.generateOutput('scripts'));