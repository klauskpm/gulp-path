# gulp-path
  
  Creates file's paths in a simple and organized way
  
## Installation
`$ npm install gulp-path`

## Usage Example
```js
var gulpPath = require('gulp-path');
    
var assets = new gulpPath.Base({
        src: './assets/',
        dest: './resources/'
    }),
    views = new gulpPath.Base('./views/'),
    root = new gulpPath.Base(),
    app = new gulpPath.Base({
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
    
console.log(
    paths.img.files(null, ['png', 'jpg', 'gif']),
    paths.img.files(),
    paths.js.files(['compiled', 'main'], 'min.js'),
    paths.fonts.files(['Roboto', 'glyphicons-halflings-regular'], ['eot', 'ttf', 'svg', 'woff', 'woff2']),
    paths.controllers.files('homeController', ['min.js', 'js']),
    paths.data.files(['main', 'sub-service'], ['min.js', 'js']),
    gulpPath.filesPaths(['./app/', './resource/**/'], null, ['scss', 'css'])
);
```

### Creating base paths
After you require the gulp-path model (`var gulpPath = require('gulp-path')`),
you need to create your base paths.  
And for that, you have 3 ways to do it.

- Imperative mode (As an Object)
    - This is the only way you can choose different paths for your destination
     and source files;  
        Ex: `var assets = new gulpPath.Base({ src: './assets/', dest: './resources/' });`
    - You also could set multiple base paths for source and destination files;  
        Ex: `var assets = new gulpPath.Base({ src: ['./assets/', './app/'], dest: ['./resources/', './views/'] });`
- Kinda-care mode (As a String)
    - Setting up as a string, will make your paths for destination and source
    files be the same;  
        Ex: `var public = new gulpPath.Base('./public/');`
- I'm not even looking mode (Nothing, really)
    - Just calling it will make your paths for destination and source files to
    be the same, and will be setted as `'./'`;  
        Ex: `var app = new gulpPath.Base();`
        
In every option above, it will return this very same Object:
```js
{
    basePaths: {
        src: './source/path',
        dest: './destination/path'
    },
    // Path class will be explained in the following
    Path: function ([paths , extensions]) {},
    // filesPath method will be explained in the following
    filesPath: function([paths, files, extensions])
}
```

### Creating paths with Path Class
After the base paths had been created, you can now create your paths.  

After **v3.0.0**, the first parameter(paths) is optional as the second parameter(extensions)
```js
// Setting paths
var paths = {
        // img.src          = [ './assets/img/**/*' ]
        // img.dest         = [ './resources/img/' ]
        img: assets.Path('img'),
        // js.src           = [ './assets/js/**/*.js' ]
        // js.dest          = [ './resources/js/' ]
        js: assets.Path('js', 'js'),
        // fonts.src        = [ './views/fonts/**/*' ]
        // fonts.dest       = [ './views/fonts/' ]
        fonts: views.Path('fonts'),
        // controllers.src  = [ './controllers/**/*.js' ]
        // controllers.dest = [ './controllers/' ]
        controllers: root.Path('controllers', 'js'),
        // data.src         = [ './app/**/*', './js/**/*' ]
        // data.dest        = [ './dest/', './concat/' ]
        data: app.Path()
    };
```

As response, you will recieve the Path Class with the following
structure:
```js
Path = function ([path , extension]) {
    this.dest = ['./destBasePath[/filesPath]/'];
    this.src = ['./srcBasePath[/filesPath]/**/*[.extension]'];
    // Return the files passed with the source path
    this.files = function ([files , filesExtension]) {};
}
```

### Generating files blob with **files paths** function
So, now you already declared your paths, but still is a pain to write all the
paths like bellow right?
```js
var paths = {
    js: [
        './assets/js/main.min.js',
        './assets/js/compiled.min.js',
        './assets/js/rocks.min.js',
        './assets/js/html5-parser.min.js',
    ]
};
```

Those days are over. Now you just need to call `Path.files([files , 
filesExtension]);` or `filesPaths([paths, files, extensions])`.  
```js
paths.js.files(['main', 'compiled', 'rocks', 'html5-parser'], 'min.js');
// or
filesPaths('./assets/', ['main', 'compiled', 'rocks', 'html5-parser'], 'min.js');
```