# gulp-path
  
  Creates file's paths in a simple and organized way
  
## Install
`$ npm install --save-dev gulp-path`

## Basic usage
You can create simple paths, for input and output, as simple as this.

```js
'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var gp = require('gulp-path');
 
var app = new gp.Path('src', 'public');
var styles = app.generateAllPaths('styles', 'css', null, 'sass');
 
gulp.task('sass', function(){
    // ./src/styles/*.sass
    return gulp.src(styles.input)
        .pipe(sass())
        // ./public/css
        .pipe(styles.output);
});
```

You can also create simple blob paths
```js
'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var gp = require('gulp-path');
 
var input = gp.generateBlob('src', 'components', '*', 'sass');
var output = gp.generateBlob('public', 'components', null, null);

gulp.task('sass', function(){
    // ./src/styles/*.sass
    return gulp.src(input)
        .pipe(sass())
        // ./public/css
        .pipe(output);
});
```

## Documentation
### Path(input [, output = input, sub-path = null])
All parameters of Path are waiting a `string` or an `array`. In that way, you
can have a simple path, multiple paths, or a composed path.

#### input <String|Array>
A property with the input path(s)

#### output <String|Array>
A property with the output path(s)

#### #createSubPath(subPaths)
Creates a new `Path` instance based on the previous path.

#### #generateAllPaths(subPathsInput, subPathsOutput, files, extensions)
Generates all paths, an object that holds input and output only, based on the params and base path.

#### #generateInput(subPaths, files, extensions)
Generates all input paths based on the params and base path.

#### #generateOutput(subPaths)
Generates all output paths based on the params and the base path.

### generateBlob([bases = './', paths = '', files = '', extensions = ''])
Generates a blob of paths