'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));

"use strict";



function generateBlob(bases, paths, files, extensions) {
    let blob = [];
    bases = typeof bases === 'undefined' || !bases ? ['./'] : bases;
    paths = typeof paths === 'undefined' || !paths ? [''] : paths;
    files = typeof files === 'undefined' || !files ? [''] : files;
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

var blob = generateBlob;

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




const defaultBasePaths = ['./'];

class Path {
    constructor(input, output, subPaths) {
        this._configureInputAndOutput(input, output);
        this._configureSubPaths(subPaths);
    }

    _configureInputAndOutput(input, output) {
        const inputIsUndefined = typeof input === "undefined" || !input;
        const outputIsUndefined = typeof output === "undefined" || !output;

        input = inputIsUndefined ? defaultBasePaths : (Array.isArray(input) ? input : [input]);
        output = outputIsUndefined ? input : (Array.isArray(output) ? output : [output]);

        this.input = input;
        this.output = output;
    }

    _configureSubPaths(subPaths) {
        const subPathsIsUndefined = typeof subPaths === "undefined" || !subPaths;

        if (subPathsIsUndefined)
            return;

        if (typeof subPaths === 'string')
            subPaths = [subPaths];

        this.input = this._addSubPathToPath(subPaths, this.input);
        this.output = this._addSubPathToPath(subPaths, this.output);
    }

    _addSubPathToPath(subPaths, list) {
        let blob$$1 = [];

        list.forEach((src) => {
            subPaths.forEach(subPath => {
                blob$$1.push(path.join(src, subPath));
            });
        });

        return blob$$1;
    }

    createSubPath(subPaths) {
        return new Path(this.input, this.output, subPaths);
    }

    generateAllPaths(subPathsInput, subPathsOutput, files, extensions) {
        return {
            input: this.generateInput(subPathsInput, files, extensions),
            output: this.generateOutput(subPathsOutput || subPathsInput)
        };
    }

    generateInput(subPaths, files, extensions) {
        files = files || '*';

        return blob(this.input, subPaths, files, extensions);
    }

    generateOutput(subPaths) {
        return blob(this.output, subPaths, '', '');
    }
    
    // Path (path, extension) {
    //     return new Path(this.basePaths, path, extension);
    // }
}

// let app = new Path('./development', './production', ['public', 'admin']);
// let subApp = app.createSubPath('sub');
//
// console.log('input', app.generateInput('sass'));
// console.log('output', app.generateOutput('css'));
// console.log('all', app.getAllFiles('sass', 'css', ['index', 'main'], ['js', 'min.js']));
// console.log('subPath', subApp.getAllFiles('sass', 'css', null, ['js', 'min.js']));

var path_1 = Path;

'use strict';




var src = {
    Path: path_1,
    generateBlob: blob
};

module.exports = src;
//# sourceMappingURL=index.js.map
