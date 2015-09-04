module.exports = {
    Base: function (opt) {

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

        var basePaths = {
            dest: opt.dest,
            src: opt.src
        };

        return {
            basePaths: basePaths,
            Path: function (path, extension) {
                extension = (typeof extension === "undefined" ? "" : "." + extension);
                fullPath = basePaths.dest + path + "/";

                this.dest = fullPath;
                this.src = fullPath + "**/*" + extension;
                this.files = function (files, filesExtension) {
                    filesExtension = (typeof filesExtension === "undefined" ? "" : "." + filesExtension);
                    if (typeof files === "undefined") {
                        return false;
                    } else if (typeof files === "string") {
                        files = [files];
                    }

                    var paths = [];
                    files.forEach( function (file) {
                        paths.push(fullPath + file + filesExtension);
                    });

                    return paths;
                }
            }
        };
    }
};