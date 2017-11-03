'use strict';

var Path = require('./path');

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
    
    Path (path, extension) {
        return new Path(this.basePaths, path, extension);
    }
}
    
module.exports = Base;