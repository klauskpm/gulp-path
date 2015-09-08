# gulp-path

Generates a path build based on the base paths setted.

## Getting Started
Install the module with: `npm install gulp-path`

```js
var gulp = require('gulp'),
    gulpPath = require('gulp-path');
    
var assets = gulpPath.Base({
        src: './assets/',
        dest: './resources/'
    }),
    public = gulpPath.Base("./public/"),
    app = gulpPath.Base();
    
var paths = {
        /**
         * img.src = './assets/img/'
         * img.dest = './resources/img/**/*'
         */
        img: new assets.Path("img"),
        /**
         * js.src = './assets/js/'
         * js.dest = './resources/js/**/*.js'
         */
        js: new assets.Path("js", "js"),
        /**
         * fonts.src = './public/fonts/'
         * fonts.dest = './public/fonts/**/*'
         */
        fonts: new public.Path("fonts"),
        /**
         * controllers.src = './controllers/'
         * controllers.dest = './controllers/**/*.js'
         */
        controllers: new app.Path("controllers", "js")
    };
```