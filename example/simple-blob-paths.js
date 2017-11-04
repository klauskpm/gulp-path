"use strict";

var gp = require('../index');

console.log('input', gp.generateBlob('src', ['components', 'pages'], '*', 'js'));
console.log('output', gp.generateBlob('public', ['components', 'pages'], null, null));