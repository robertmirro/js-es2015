(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6RestParameters', es6RestParameters);

    function es6RestParameters(sections) {
        this.subSections = [
            sections.subSection(es5ArgumentsObject, 'ES5: Dynamically handling the <code>arguments</code> array-like object'),
            sections.subSection(restParameterSyntax, 'Using rest parameter syntax to create a variadic function'),
            sections.subSection(restParameterIncludedValues, 'Only non-named passed parameters are included as rest parameters'),
            sections.subSection(restParameterIsArray, 'The rest parameters object is an instance of <code>Array</code>')
        ];

        var _typeof, convertToArray, parameters;

        _typeof = Function.call.bind(Object.prototype.toString);
        convertToArray = Function.call.bind(Array.prototype.slice);
        parameters = [1, 2, 3, 4];

        function es5ArgumentsObject() {
            function argsFn(one, two) {
                console.log('named parameters passed: one:(%s) two:(%s)', one, two);
                console.log('arguments object contains all parameters passed, including named parameters:', arguments);

                console.log('named parameters must be manually excluded when iterating non-named parameters that are passed');
                for (var i = argsFn.length; i < arguments.length; i++) {
                    console.log('arguments: parameter:(%s)', arguments[i]);
                }

                console.log('arguments object type (%s) is instance of Array:', _typeof(arguments), arguments instanceof Array);
                try {
                    arguments.forEach(function(parameter) {
                        console.log('arguments: parameter:(%s)', parameter);
                    });
                } catch (e) {
                    console.error('Array methods may not be used directly on the arguments object');
                }

                console.log('arguments object must be converted to an array in order to use Array methods on it');
                convertToArray(arguments).forEach(function(parameter) {
                    console.log('arguments converted to array: parameter:(%s)', parameter);
                });
            }

            argsFn.apply(null, parameters);
        }

        function restParameterSyntax() {
            function restParamsFn(one, two, ...restParams) {
                console.log(`rest parameters are defined as a named function parameter and prefixed with '...', ex: ...restParams`);
                console.log('there can only be a maximum of one (1) rest parameter defined per function and it must be the last parameter');
            }

            restParamsFn(...parameters);
        }

        function restParameterIncludedValues() {
            function restParamsFn(one, two, ...restParams) {
                console.log('named parameters passed: one:(%s) two:(%s)', one, two);
                console.log('arguments object contains all parameters passed, including named parameters:', arguments);
                console.log('rest parameters object contains all (only) non-named parameters that are passed:', restParams);
            }

            restParamsFn(...parameters);
        }

        function restParameterIsArray() {
            function restParamsFn(one, two, ...restParams) {
                console.log('rest parameters object type (%s) is instance of Array:', _typeof(restParams), restParams instanceof Array);
                restParams.forEach(function(parameter) {
                    console.log('rest parameters: parameter:(%s)', parameter);
                });
            }

            restParamsFn(...parameters);

            console.log('rest parameters object will be an emptry array if no non-named parameters are passed');
            restParamsFn('one', 'two');
        }
    }
})();