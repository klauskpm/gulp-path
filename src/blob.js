"use strict";

const path = require('path');

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
                    blob.push(path.join(base, src, file + ext))
                });
            })
        });
    });

    return blob;
}

module.exports = generateBlob;

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