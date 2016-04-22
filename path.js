'use strict';

const srcPath = Symbol('srcPath');

var files = require('./files');
var gpath = require('path');

class Path {
    constructor(basePaths, path, extension) {
        extension = (typeof extension === 'undefined') ? '' : '.' + extension;
        path = (typeof path === 'undefined') ? '' : path;
        
        var self        = this;
        var src         = basePaths.src;
        var dest        = basePaths.dest;
        this[srcPath]   = [];
        
        // Handling src paths configuration
        if (typeof src === 'string') {
            src = [src];
        }
        
        this.src = src.map(function (source) {
            self[srcPath].push(source + path);
            return gpath.join(source, path, '**', '*' + extension);
        });
        
        // Handling dest paths configuration
        if (typeof dest === 'string') {
            dest = [dest];
        }
        
        this.dest = dest.map(function (destination) {
            return gpath.join(destination, path);
        });
    }
    
    files (filesList, filesExtension) {
        return files(this[srcPath], filesList, filesExtension);
    }
}

module.exports = Path;