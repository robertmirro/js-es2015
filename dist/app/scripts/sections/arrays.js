(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6Arrays', es6Arrays);

    function es6Arrays(sections) {
        this.subSections = [
            sections.subSection(es5ConvertArrayLike, 'ES5: Convert an array-like object to an <code>Array</code>'),
            sections.subSection(arrayFromArrayLike, 'Use <code>Array.from</code> to convert an array-like object to an <code>Array</code>'),
            sections.subSection(es5CopyArray, 'ES5: Shallow copy an <code>Array</code>'),
            sections.subSection(arrayFromCopyArray, 'Use <code>Array.from</code> to shallow copy an array'),
            sections.subSection(arrayFromMap, '<code>Array.from</code> accepts an option map function similar to <code>Array.map</code>'),
            sections.subSection(es5ArrayConstructor, 'ES5: <code>Array</code> constructor single integer argument overload is counterintuitive'),
            sections.subSection(arrayOfConsistent, '<code>Array.of</code> creates an <code>Array</code> more consistently than using the constructor'),
            sections.subSection(es5ArrayPopulate, 'ES5: create an array pre-populated with values'),
            sections.subSection(arrayFillPopulate, '<code>Array.fill</code> populates array with the same value'),
            sections.subSection(es5ArrayFindValue, 'ES5: finding an entry in an array and returning its value'),
            sections.subSection(arrayFind, '<code>Array.find</code> can find a value similar to <code>Array.some</code> and return it'),
            sections.subSection(arrayFindIndex, '<code>Array.findIndex</code> functions exactly as <code>Array.find</code> except it returns the value\'s index')
        ];

        var _typeof, convertToArray, copyArray, values, findValues;

        _typeof = Function.call.bind(Object.prototype.toString);
        convertToArray = copyArray = Function.call.bind(Array.prototype.slice);
        values = [1, 'two', true, {
            4: '4'
        }];
        findValues = [{
            shape: 'circle',
            points: 0
        }, {
            shape: 'square',
            points: 4
        }, {
            shape: 'triangle',
            points: 3
        }];

        function es5ConvertArrayLike() {
            convertArgumentsToArray.apply(null, values);

            function convertArgumentsToArray() {
                var forLoop, arrayConstructor, arraySlice;

                console.log('arguments (%s):', _typeof(arguments), arguments);

                forLoop = [];
                for (var i = 0, l = arguments.length; i < l; i++) {
                    forLoop.push(arguments[i]);
                }
                console.log('For loop (%s):', _typeof(forLoop), forLoop);

                arrayConstructor = Array.apply(null, arguments);
                console.log('Array constructor (%s):', _typeof(arrayConstructor), arrayConstructor);

                arraySlice = convertToArray(arguments);
                console.log('Array.slice (%s):', _typeof(arraySlice), arraySlice);
            }
        }

        function arrayFromArrayLike() {
            convertArgumentsToArray(...values);

            function convertArgumentsToArray() {
                let arrayFrom;

                console.log('arguments (%s):', _typeof(arguments), arguments);

                arrayFrom = Array.from(arguments);
                console.log('Array.from (%s):', _typeof(arrayFrom), arrayFrom);
            }
        }

        function es5CopyArray() {
            var forLoop, arrayConstructor, arraySlice, arrayConcat;

            console.log('values (before):', values);

            forLoop = [];
            for (var i = 0, l = values.length; i < l; i++) {
                forLoop.push(values[i]);
            }
            console.log('For loop (before):', forLoop);
            forLoop[0] = 222;
            console.log('For loop (after):', forLoop);

            arrayConstructor = Array.apply(null, values);
            console.log('Array constructor (before):', arrayConstructor);
            arrayConstructor[1] = 'three';
            console.log('Array constructor (after):', arrayConstructor);

            arraySlice = copyArray(values);
            console.log('Array.slice (before):', arraySlice);
            arraySlice[2] = false;
            console.log('Array.slice (after):', arraySlice);

            arrayConcat = [].concat(values);
            console.log('Array.concat (before):', arrayConcat);
            arrayConcat[3][4] = 'uh oh, values array changed too';
            console.log('Array.concat (after):', arrayConcat);

            console.log('values (after):', values);
        }

        function arrayFromCopyArray() {
            let arrayFrom;

            console.log('values (before):', values);

            arrayFrom = Array.from(values);
            console.log('Array.from (before):', arrayFrom);
            arrayFrom[0] = 222;
            console.log('Array.from (after):', arrayFrom);

            console.log('values (after):', values);
        }

        function arrayFromMap() {
            let arrayFrom, map;

            map = (value, index, array) => value * value;
            arrayFrom = Array.from([1, 2, 3, 4], map);
            console.log('Array.from:', arrayFrom);
        }

        function es5ArrayConstructor() {
            console.log('new Array(4, 8):', new Array(4, 8));

            let a = new Array(4);
            console.log('new Array(4) (length: %s):', a.length, a);

            console.log('new Array(-4):', new Array(-4));
        }

        function arrayOfConsistent() {
            console.log('Array.of(4, 8):', Array.of(4, 8));

            let a = Array.of(4);
            console.log('Array.of(4) (length: %s):', a.length, a);

            console.log('Array.of(-4):', Array.of(-4));
        }

        function es5ArrayPopulate() {
            function populateFor(length) {
                var a = [];
                for (var i = 0; i < length; i++) {
                    a[i] = i + 1;
                }
                return a;
            }
            console.log('for loop:', populateFor(4));

            function arrayApply(length) {
                return Array.apply(null, Array(length)).map(function(value, index) {
                    return (index + 1) * (index + 1);
                });
            }
            console.log('Array.apply:', arrayApply(4));
        }

        function arrayFillPopulate() {
            let arrayFill = length => Array(length).fill(8);
            console.log('Array.fill:', arrayFill(4));

            let arrayFillPortion = [1, 2, 3, 4, 5, 6, 7, 8];
            console.log('Array.fill portion:', arrayFillPortion.fill({}, 2, 6));
        }

        function es5ArrayFindValue() {
            console.log('values:', findValues);

            function findFor(findProperty, findValue) {
                for (var i = 0, l = findValues.length; i < l; i++) {
                    if (findValues[i][findProperty] === findValue) {
                        return findValues[i];
                    }
                }
            }
            console.log("for loop('shape', 'square'):", findFor('shape', 'square'));
            console.log("for loop('shape', 'octagon'):", findFor('shape', 'octagon'));
            console.log("for loop('points', 3):", findFor('points', 3));
            console.log("for loop('points', 44):", findFor('points', 44));

            function findArraySome(findProperty, findValue) {
                var valueFound;

                findValues.some(function(value) {
                    return value[findProperty] === findValue ? (valueFound = value) : false;
                });

                return valueFound;
            }
            console.log("Array.some('shape', 'square'):", findArraySome('shape', 'square'));
            console.log("Array.some('shape', 'octagon'):", findArraySome('shape', 'octagon'));
            console.log("Array.some('points', 3):", findArraySome('points', 3));
            console.log("Array.some('points', 44):", findArraySome('points', 44));
        }

        function arrayFind() {
            console.log('values:', findValues);

            function findArrayFind(findProperty, findValue) {
                return findValues.find(value => value[findProperty] === findValue);
            }
            console.log(`Array.find('shape', 'square'):`, findArrayFind('shape', 'square'));
            console.log(`Array.find('shape', 'octagon'):`, findArrayFind('shape', 'octagon'));
            console.log(`Array.find('points', 3):`, findArrayFind('points', 3));
            console.log(`Array.find('points', 44):`, findArrayFind('points', 44));
        }

        function arrayFindIndex() {
            console.log('values:', findValues);

            function findArrayFindIndex(findProperty, findValue) {
                return findValues.findIndex(value => value[findProperty] === findValue);
            }
            console.log(`Array.findIndex('shape', 'square'):`, findArrayFindIndex('shape', 'square'));
            console.log(`Array.findIndex('shape', 'octagon'):`, findArrayFindIndex('shape', 'octagon'));
            console.log(`Array.findIndex('points', 3):`, findArrayFindIndex('points', 3));
            console.log(`Array.findIndex('points', 44):`, findArrayFindIndex('points', 44));
        }
    }
})();