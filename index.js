'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));

"use strict";

function generateBlob(bases, paths, files, extensions) {
    var blob = [];

    bases = typeof bases === 'undefined' || !bases ? ['./'] : bases;
    paths = typeof paths === 'undefined' || !paths ? [''] : paths;
    files = typeof files === 'undefined' || !files ? [''] : files;
    extensions = typeof extensions === 'undefined' || !extensions ? [''] : extensions;

    if (typeof bases === 'string') bases = [bases];

    if (typeof paths === 'string') paths = [paths];

    if (typeof files === 'string') files = [files];

    if (typeof extensions === 'string') extensions = [extensions];

    bases.forEach(function (base) {
        paths.forEach(function (src) {
            files.forEach(function (file) {
                extensions.forEach(function (ext) {
                    ext = ext ? '.' + ext : '';
                    blob.push(path.join(base, src, file + ext));
                });
            });
        });
    });

    return blob;
}

var blob = generateBlob;

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

'use strict';

var defaultBasePaths = ['./'];

var Path = function () {
    function Path(input, output, subPaths) {
        classCallCheck(this, Path);

        this._configureInputAndOutput(input, output);
        this._configureSubPaths(subPaths);
    }

    createClass(Path, [{
        key: '_configureInputAndOutput',
        value: function _configureInputAndOutput(input, output) {
            var inputIsUndefined = typeof input === "undefined" || !input;
            var outputIsUndefined = typeof output === "undefined" || !output;

            input = inputIsUndefined ? defaultBasePaths : Array.isArray(input) ? input : [input];
            output = outputIsUndefined ? input : Array.isArray(output) ? output : [output];

            this.input = input;
            this.output = output;
        }
    }, {
        key: '_configureSubPaths',
        value: function _configureSubPaths(subPaths) {
            var subPathsIsUndefined = typeof subPaths === "undefined" || !subPaths;

            if (subPathsIsUndefined) return;

            if (typeof subPaths === 'string') subPaths = [subPaths];

            this.input = this._addSubPathToPath(subPaths, this.input);
            this.output = this._addSubPathToPath(subPaths, this.output);
        }
    }, {
        key: '_addSubPathToPath',
        value: function _addSubPathToPath(subPaths, list) {
            var blob$$1 = [];

            list.forEach(function (src) {
                subPaths.forEach(function (subPath) {
                    blob$$1.push(path.join(src, subPath));
                });
            });

            return blob$$1;
        }
    }, {
        key: 'createSubPath',
        value: function createSubPath(subPaths) {
            return new Path(this.input, this.output, subPaths);
        }
    }, {
        key: 'generateAllPaths',
        value: function generateAllPaths(subPathsInput, subPathsOutput, files, extensions) {
            return {
                input: this.generateInput(subPathsInput, files, extensions),
                output: this.generateOutput(subPathsOutput || subPathsInput)
            };
        }
    }, {
        key: 'generateInput',
        value: function generateInput(subPaths, files, extensions) {
            files = files || '*';

            return blob(this.input, subPaths, files, extensions);
        }
    }, {
        key: 'generateOutput',
        value: function generateOutput(subPaths) {
            return blob(this.output, subPaths, '', '');
        }
    }]);
    return Path;
}();

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
