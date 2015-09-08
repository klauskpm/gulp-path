# gulp-path

Generates a path build based on the base paths setted.

## Getting Started
Install the module with: `npm install gulp-path`

Now pay attention to the following example, because it will be referenced all the way.  
```js
var gulp = require('gulp'),
    gulpPath = require('gulp-path');
    
var assets = gulpPath.Base({
        src: './assets/',
        dest: './resources/'
    }),
    public = gulpPath.Base('./public/'),
    app = gulpPath.Base();
    
var paths = {
        img: new assets.Path('img'),
        js: new assets.Path('js', 'js'),
        fonts: new public.Path('fonts'),
        controllers: new app.Path('controllers', 'js')
    };
    
gulp.task('default', function (done) {
    gulp.src(paths.js.files(['main', 'compiled'], 'min.js'))
        .pipe(gulp.dest(paths.js.dest))
        .on('end', done());
});
```

### Creating the base paths
After you require the gulp-path model (`var gulpPath = require('gulp-path')`),
you need to create your base paths.  
And for that, you have 3 ways to do it.

- Imperative mode (As an Object)
    - This is the only way you can choose different paths for your destination
     and source files;  
        Ex: `var assets = gulpPath.Base({ src: './assets/', dest: './resources/' });`
- Kinda-care mode (As a String)
    - Setting up as a string, will make your paths for destination and source
    files be the same;  
        Ex: `var public = gulpPath.Base('./public/');`
- I'm not even looking mode (Nothing, really)
    - Just calling it will make your paths for destination and source files to
    be the same, and will be setted as `'./'`;  
        Ex: `var app = gulpPath.Base();`
        
In every option above, it will return this very same Object:
```js
{
    basePaths: {
        src: './source/path',
        dest: './destination/path'
    },
    // Path class will be explained in the following
    Path: function (path [, extension]) {}
}
```

### Creating paths with Path Class
After the base paths had been created, you can now create your paths.  

It is required to set the path you want, but can also pass the files extension as optional.
```js
// Setting paths
var paths = {
        // img.dest = './resources/images/'
        // img.src = './assets/images/**/*'
        img: new assets.Path('images'),
        // js.dest = './resources/js/'
        // js.src = './assets/js/**/*.js'
        js: new assets.Path('js', 'js'),
        // fonts.dest = './public/fonts/'
        // fonts.src = './public/fonts/**/*'
        fonts: new public.Path('fonts'),
        // controllers.dest = './controllers/'
        // controllers.src = './controllers/**/*.js' 
        controllers: new app.Path('controllers', 'js')
    };
```

As response, you will recieve the Path Class with the following
structure:
```js
Path = function (path [, extension]) {
    this.dest = './destBasePath/filesPath/';
    this.src = './srcBasePath/filesPath/**/*[.extension]';
    // Return the files passed with the source path
    this.files = function (files [, filesExtension]) {};
}
```

### Generating files blob with Path's files function
So, now you already declared your paths, but still is a pain to write all the
paths like bellow right?
```js
gulp.task('default', function (done) {
    gulp.src(['./assets/js/main.min.js', './assets/js/compiled.min.js'])
        .pipe(gulp.dest(paths.js.dest))
        .on('end', done());
});
```

Those days are over. Now you just need to call `Path.files(files [, 
filesExtension]);`.  
```js
gulp.task('default', function (done) {
    gulp.src(paths.js.files(['main', 'compiled'], 'min.js'))
        .pipe(gulp.dest(paths.js.dest))
        .on('end', done());
});
```