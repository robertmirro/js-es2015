(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6DestructuringAssignment', es6DestructuringAssignment);

    function es6DestructuringAssignment(sections) {
        this.subSections = [
            sections.subSection(es5ExtractArrayData, 'ES5: Extracting data from an <code>Array</code> and variable swap'),
            sections.subSection(simpleArrayDestructure, 'Simple <code>Array</code> destructuring'),
            sections.subSection(arrayVariableDeclaration, '<code>Array</code> destructuring with/without variable declaration, variable swap without temporary variable'),
            sections.subSection(arrayMultiReturnValues, 'Handle multiple returns values separately or as an <code>Array</code>'),
            sections.subSection(es5ExtractObjectData, 'ES5: Extracting data from an <code>Object</code>'),
            sections.subSection(simpleObjectDestructure, 'Simple <code>Object</code> destructuring'),
            sections.subSection(objectVariableDeclaration, '<code>Object</code> destructuring with/without variable declaration')
        ];

        var arrayData, arrayDataFn, arrayLog, objectData, objectLog;

        arrayData = [1, 'two', true, ['a', 'b', 'c'], {
            four: '4'
        }];
        arrayDataFn = () => arrayData;
        arrayLog = function(header, one, two, truthy, b, four) {
            console.log('<%s>', header.toUpperCase());
            console.log('one:', one);
            console.log('two:', two);
            console.log('truthy', truthy);
            console.log('b:', b);
            console.log('four:', four);
            console.log('');
        };

        objectData = {
            one: 1,
            2: 'two',
            truthy: false,
            three: 333,
            letters: ['a', 'b', 'c'],
            four: {
                plusFour: '8'
            }
        };
        objectLog = function(header, one, two, truthy, c, fourPlusFour) {
            console.log('<%s>', header.toUpperCase());
            console.log('one:', one);
            console.log('two:', two);
            console.log('truthy', truthy);
            console.log('c:', c);
            console.log('fourPlusFour:', fourPlusFour);
            console.log('');
        };

        function es5ExtractArrayData() {
            var one, two, truthy, b, four, tempVar;

            one = arrayData[0];
            two = arrayData[1];
            truthy = arrayData[2];
            b = arrayData[3][1];
            four = arrayData[4].four;

            arrayLog('data extract', one, two, truthy, b, four);

            tempVar = one;
            one = two;
            two = tempVar;

            arrayLog('variable swap with temporary variable', one, two, truthy, b, four);
        }

        function simpleArrayDestructure() {
            let [one, , , , fourObject, nonExistent] = arrayData;

            console.log('one:', one);
            console.log('fourObject:', fourObject);
            console.log('nonExistent:', nonExistent);
        }

        function arrayVariableDeclaration() {
            {
                let [one, two, truthy, [, b], {
                    four
                }] = arrayData;

                arrayLog('with variable declaration', one, two, truthy, b, four);

                [one, two] = [two, one];

                arrayLog('variable swap without temporary variable', one, two, truthy, b, four);
            }

            {
                let one, two, truthy, b, four;
                [one, two, truthy, [, b], {
                    four
                }] = arrayData;

                arrayLog('without variable declaration', one, two, truthy, b, four);
            }
        }

        function arrayMultiReturnValues() {
            let [one, two, truthy, [, b], {
                four
            }] = arrayDataFn();

            arrayLog('multiple return values from function', one, two, truthy, b, four);

            let valueAsArray = arrayDataFn();
            console.log('mutiple return values as an array:', valueAsArray);
        }

        function es5ExtractObjectData() {
            var one, two, truthy, c, fourPlusFour;

            one = objectData.one;
            two = objectData[2];
            truthy = objectData.truthy;
            c = objectData.letters[2];
            fourPlusFour = objectData.four.plusFour;

            objectLog('data extract', one, two, truthy, c, fourPlusFour);
        }

        function simpleObjectDestructure() {
            let {
                one,
                three: three,
                letters: lettersArray,
                nonExistent
            } = objectData;

            console.log('one:', one);
            console.log('three:', three);
            console.log('lettersArray:', lettersArray);
            console.log('nonExistent:', nonExistent);
        }

        function objectVariableDeclaration() {
            {
                let {
                    one, ['2']: two,
                    truthy,
                    letters: [, , c],
                    four: {
                        plusFour: fourPlusFour
                    }
                } = objectData;

                objectLog('with variable declaration', one, two, truthy, c, fourPlusFour);
            }

            {
                let one, two, truthy, c, fourPlusFour, plusFour;
                ({
                    one, ['2']: two,
                    truthy,
                    letters: [, , c],
                    four: {
                        plusFour: fourPlusFour
                    }
                } = objectData);

                objectLog('without variable declaration', one, two, truthy, c, fourPlusFour);
            }
        }
    }
})();