(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6DefaultParameters', es6DefaultParameters);

    function es6DefaultParameters(sections) {
        this.subSections = [
            sections.subSection(es5ManualIndividual, 'ES5: Set individual default parameter values manually'),
            sections.subSection(es5ManualOptionsObject, 'ES5: Set default parameter values manually via options object'),
            sections.subSection(individualDefaultParams, 'Individual default parameter values'),
            sections.subSection(optionsObjectDefaultParams, 'Default parameter values via options object and <code>Object</code> destructuring'),
            sections.subSection(optionsObjectDefaultParamsRenamed, '<code>Object</code> destructuring and renaming default parameter values via options object'),
            sections.subSection(parameterDependency, 'Default parameter values can be based off of other parameter values'),
            sections.subSection(parameterFunctions, 'Using functions to populate default parameter values')
        ];

        var paramsLog = function(header, index, height, width, length) {
            console.log(`${header} [${index}]: height:(${height}) width:(${width}) length:(${length})`)
        };

        function es5ManualIndividual() {
            function individual(index, height, width, length) {
                index = index !== undefined ? index : 0;
                height = height !== undefined ? height : 1;
                width = width !== undefined ? width : 2;
                length = length !== undefined ? length : 3;

                paramsLog(`individual parameters`, index, height, width, length);
            }

            individual();
            individual(1);
            individual(2, 1);
            individual(3, 1, 2);
            individual(4, 1, 2, 3);
            individual(5, 2, 4, 6);
            individual(6, 4, undefined, 12);
            individual(7, null, 8, undefined);
        }

        function es5ManualOptionsObject() {
            function optionsObject(index, options) {
                index = index !== undefined ? index : 0;
                options = angular.isObject(options) ? options : {};
                options.height = options.height !== undefined ? options.height : 1;
                options.width = options.width !== undefined ? options.width : 2;
                options.length = options.length !== undefined ? options.length : 3;

                paramsLog(`options object parameters`, index, options.height, options.width, options.length);
            }

            optionsObject();
            optionsObject(1, {});
            optionsObject(2, {
                height: 1
            });
            optionsObject(3, {
                height: 1,
                width: 2
            });
            optionsObject(4, {
                height: 1,
                width: 2,
                length: 3
            });
            optionsObject(5, {
                height: 2,
                width: 4,
                length: 6
            });
            optionsObject(6, {
                height: 4,
                width: undefined,
                length: 12
            });
            optionsObject(7, {
                height: null,
                width: 8,
                length: undefined
            });
        }

        function individualDefaultParams() {
            function individual(index = 0, height = 1, width = 2, length = 3) {
                paramsLog(`individual default parameters`, index, height, width, length);
            }

            individual();
            individual(1, {});
            individual(2, 1);
            individual(3, 1, 2);
            individual(4, 1, 2, 3);
            individual(5, 2, 4, 6);
            individual(6, 4, undefined, 12);
            individual(7, null, 8, undefined);
        }

        function optionsObjectDefaultParams() {
            function optionsObject(index = 0, {
                height = 1,
                width = 2,
                length = 3
            } = {}) {
                paramsLog(`options object default parameters`, index, height, width, length);
            }

            optionsObject();
            optionsObject(1, {});
            optionsObject(2, {
                height: 1
            });
            optionsObject(3, {
                height: 1,
                width: 2
            });
            optionsObject(4, {
                height: 1,
                width: 2,
                length: 3
            });
            optionsObject(5, {
                height: 2,
                width: 4,
                length: 6
            });
            optionsObject(6, {
                height: 4,
                width: undefined,
                length: 12
            });
            optionsObject(7, {
                height: null,
                width: 8,
                length: undefined
            });
        }

        function optionsObjectDefaultParamsRenamed() {
            function optionsObject(index = 0, {
                height: h = 1,
                width: w = 2,
                length: l = 3
            } = {}) {
                paramsLog(`renamed options object default parameters`, index, h, w, l);
            }

            optionsObject();
            optionsObject(1, {});
            optionsObject(2, {
                height: 1
            });
            optionsObject(3, {
                height: 1,
                width: 2
            });
            optionsObject(4, {
                height: 1,
                width: 2,
                length: 3
            });
            optionsObject(5, {
                height: 2,
                width: 4,
                length: 6
            });
            optionsObject(6, {
                height: 4,
                width: undefined,
                length: 12
            });
            optionsObject(7, {
                height: null,
                width: 8,
                length: undefined
            });
        }

        function parameterDependency() {
            function dependency(index = 0, x = 1, y = x * 2, z = y + 4) {
                paramsLog(`dependency default parameters`, index, x, y, z);
            }

            dependency();
            dependency(1);
            dependency(2, 1);
            dependency(3, 1, 2);
            dependency(4, 1, 2, 6);
            dependency(5, 2, 4, 12);
            dependency(6, 4, undefined, 14);
            dependency(7, 13);
            dependency(8, null, 6, undefined);
            dependency(9, null, null);
            dependency(10, null);
        }

        function parameterFunctions() {
            let fnValue = value => value + 8;

            function parameterFn(index = 0, x = 1, y = x * 2, z = fnValue(y)) {
                paramsLog(`function value default parameter`, index, x, y, z);
            }

            parameterFn();
            parameterFn(1);
            parameterFn(2, 1);
            parameterFn(3, 1, 2);
            parameterFn(4, 1, 2, 6);
            parameterFn(5, 2, 4, 12);
            parameterFn(6, 4, undefined, 14);
            parameterFn(7, 13);
            parameterFn(8, null, 6, undefined);
            parameterFn(9, null, null);
            parameterFn(10, null);
        }
    }
})();