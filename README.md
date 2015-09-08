# gulp-path

Generates a path build based on the base paths setted.

## Getting Started
Install the module with: `npm install gulp-path`

Now pay attention to the following example, bacause it will be referenced all the way.  
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
        src: "./source/path",
        dest: "./destination/path"
    },
    Path: function () {} // Path class will be explained in the following 
}
```

### Creating paths with Patch Class
After the base paths had been created, you can now create your paths.  
