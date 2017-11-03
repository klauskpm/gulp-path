'use strict';

const generateBlob = require('./files');
const Path = require('./path');
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

    createPath(path) {
        return new Path(this.basePaths, path);
    }

    getFiles(paths, files, extensions) {
        return {
            input: generateBlob(this.basePaths.input, paths, files, extensions),
            output: generateBlob(this.basePaths.output, paths, files, extensions)
        };
    }
    
    // Path (path, extension) {
    //     return new Path(this.basePaths, path, extension);
    // }
}
    
module.exports = Base;