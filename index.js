'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('src/path'));

var files = function (sourcePaths, filesList, filesExtensions) {
    if (typeof sourcePaths === "undefined" || !sourcePaths) {
        sourcePaths = ['./'];
    } else if (typeof sourcePaths === "string") {
        sourcePaths = [sourcePaths];
    }
    
    if (typeof filesList === "undefined" || !filesList) {
        filesList = ['*'];
    } else if (typeof filesList === "string") {
        filesList = [filesList];
    }
    
    if (typeof filesExtensions === 'undefined' || !filesExtensions) {
        filesExtensions =  [''];
    } else if (typeof filesExtensions === 'string') {
        filesExtensions = ['.' + filesExtensions];
    } else {
        filesExtensions = filesExtensions.map(function (extension) {
            return '.' + extension;
        });
    }
    
    var paths = [];
    sourcePaths.forEach(function (sourcePath) {
        filesList.forEach(function (file) {
            filesExtensions.forEach(function (fileExtension) {
                paths.push(path.join(sourcePath, file + fileExtension));
            });
        });
    });

    return paths;
};

'use strict';

const srcPath = Symbol('srcPath');
// opa




class Path {
    constructor(basePaths, path$$1, extension) {
        extension = (typeof extension === 'undefined') ? '' : '.' + extension;
        path$$1 = (typeof path$$1 === 'undefined') ? '' : path$$1;
        
        var self        = this;
        var src         = basePaths.src;
        var dest        = basePaths.dest;
        this[srcPath]   = [];
        
        // Handling src paths configuration
        if (typeof src === 'string') {
            src = [src];
        }
        
        this.src = src.map(function (source) {
            self[srcPath].push(source + path$$1);
            return path.join(source, path$$1, '**', '*' + extension);
        });
        
        // Handling dest paths configuration
        if (typeof dest === 'string') {
            dest = [dest];
        }
        
        this.dest = dest.map(function (destination) {
            return path.join(destination, path$$1);
        });
    }
    
    files (filesList, filesExtension) {
        return files(this[srcPath], filesList, filesExtension);
    }
}

var path$1 = Path;

'use strict';



class Base {
    constructor(opt) {
        if (typeof opt === "undefined" || !opt) {
            opt = {
                dest: "./",
                src: "./"
            };
        } else if (typeof opt === "string") {
            opt = {
                dest: opt,
                src: opt
            };
        }
        
        this.basePaths = {
            dest: opt.dest,
            src: opt.src
        };
    }
    
    Path (path$$1, extension) {
        return new path$1(this.basePaths, path$$1, extension);
    }
}
    
var base = Base;

'use strict';




var src = {
    Base: base,
    filesPaths: files
};

module.exports = src;
//# sourceMappingURL=index.js.map
