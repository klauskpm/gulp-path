'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var path$1 = _interopDefault(require('src/path'));

"use strict";



function generateBlob(bases, paths, files, extensions) {
    let blob = [];
    bases = typeof bases === 'undefined' || !bases ? ['./'] : bases;
    paths = typeof paths === 'undefined' || !paths ? [''] : paths;
    files = typeof files === 'undefined' || !files ? ['*'] : files;
    extensions = typeof extensions === 'undefined' || !extensions ? [''] : extensions;

    if (typeof bases === 'string')
        bases = [bases];

    if (typeof paths === 'string')
        paths = [paths];

    if (typeof files === 'string')
        files = [files];

    if (typeof extensions === 'string')
        extensions = [extensions];


    bases.forEach(base => {
        paths.forEach(src => {
            files.forEach(file => {
                extensions.forEach(ext => {
                    ext = ext ? `.${ext}` : '';
                    blob.push(path.join(base, src, file + ext));
                });
            });
        });
    });

    return blob;
}

var files = generateBlob;

// module.exports = function (sourcePaths, filesList, filesExtensions) {
//     if (typeof sourcePaths === "undefined" || !sourcePaths) {
//         sourcePaths = ['./'];
//     } else if (typeof sourcePaths === "string") {
//         sourcePaths = [sourcePaths];
//     }
//
//     if (typeof filesList === "undefined" || !filesList) {
//         filesList = ['*'];
//     } else if (typeof filesList === "string") {
//         filesList = [filesList];
//     }
//
//     if (typeof filesExtensions === 'undefined' || !filesExtensions) {
//         filesExtensions =  [''];
//     } else if (typeof filesExtensions === 'string') {
//         filesExtensions = ['.' + filesExtensions];
//     } else {
//         filesExtensions = filesExtensions.map(function (extension) {
//             return '.' + extension;
//         })
//     }
//
//     var paths = [];
//     sourcePaths.forEach(function (sourcePath) {
//         filesList.forEach(function (file) {
//             filesExtensions.forEach(function (fileExtension) {
//                 paths.push(path.join(sourcePath, file + fileExtension));
//             })
//         });
//     });
//
//     return paths;
// }

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
            return path$1.join(source, path$$1, '**', '*' + extension);
        });
        
        // Handling dest paths configuration
        if (typeof dest === 'string') {
            dest = [dest];
        }
        
        this.dest = dest.map(function (destination) {
            return path$1.join(destination, path$$1);
        });
    }
    
    files (filesList, filesExtension) {
        return files(this[srcPath], filesList, filesExtension);
    }
}

var path$3 = Path;

'use strict';



const defaultBasePaths = {
    input: "./",
    output: "./"
};

class Base {
    constructor(basePaths) {
        basePaths = typeof basePaths === "undefined" || !basePaths ? defaultBasePaths : basePaths;

        if (typeof basePaths === "string") {
            basePaths = {
                input: basePaths,
                output: basePaths
            };
        }
        
        this.basePaths = basePaths;
    }

    createPath(path$$1) {
        return new path$3(this.basePaths, path$$1);
    }

    getFiles(paths, files$$1, extensions) {
        return {
            input: files(this.basePaths.input, paths, files$$1, extensions),
            output: files(this.basePaths.output, paths, files$$1, extensions)
        };
    }
    
    // Path (path, extension) {
    //     return new Path(this.basePaths, path, extension);
    // }
}
    
var base = Base;

'use strict';




var src = {
    Base: base,
    filesPaths: files
};

module.exports = src;
//# sourceMappingURL=index.js.map
