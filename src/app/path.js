'use strict';

const path = require('path');
const generateBlob = require('./blob');

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
        var blob = [];

        list.forEach((src) => {
            subPaths.forEach(subPath => {
                blob.push(path.join(src, subPath));
            });
        });

        return blob;
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

        return generateBlob(this.input, subPaths, files, extensions);
    }

    generateOutput(subPaths) {
        return generateBlob(this.output, subPaths, '', '');
    }
}

module.exports = Path;