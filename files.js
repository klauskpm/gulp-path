var path = require('path');

module.exports = function (sourcePaths, filesList, filesExtensions) {
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
        })
    }
    
    var paths = [];
    sourcePaths.forEach(function (sourcePath) {
        filesList.forEach(function (file) {
            filesExtensions.forEach(function (fileExtension) {
                paths.push(path.join(sourcePath, file + fileExtension));
            })
        });
    });

    return paths;
}