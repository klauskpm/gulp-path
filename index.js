module.exports = function (opt) {
    var basePaths = {
        dest: opt.dest,
        src: opt.src
    };

    return {
        basePaths: basePaths,
        Asset: function (path, extension) {
            extension = (typeof extension === "undefined" ? "" : "." + extension);

            this.dest = basePaths.dest + path + "/";
            this.src = basePaths.src + path + "/**/*" + extension;
        }
    };
};