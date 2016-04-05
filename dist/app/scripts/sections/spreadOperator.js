(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6SpreadOperator', es6SpreadOperator);

    function es6SpreadOperator(sections) {
        this.subSections = [
            sections.subSection(es5MultipleParamsApply, 'ES5: Using <code>apply</code> to pass multiple parameters to a <code>function</code>'),
            sections.subSection(multipleParamsSpread, 'Passing multiple <code>function</code> parameters via the spread operator'),
            sections.subSection(es5ArrayInPlacePush, 'ES5: Using <code>push</code> and <code>apply</code> to push values in place to an <code>Array</code>'),
            sections.subSection(arrayInPlaceSpread, 'The spread operator allows more flexibility in pushing an iterable object of values to an <code>Array</code>'),
            sections.subSection(arrayLiteralSpread, 'The <code>Array</code> literal is more powerful thanks to the spread operator'),
            sections.subSection(es5NewApply, 'ES5: <code>apply</code> cannot be used with <code>new</code> to pass an <code>Array</code> of values to a Constructor function'),
            sections.subSection(es5NewBindApply, 'ES5: <code>apply</code> may be used with <code>new</code> when <code>bind</code> is involved'),
            sections.subSection(newApplySpread, 'The spread operator allows a Constructor function to instantiate a <code>new</code> object with an <code>Array</code> of values')
        ];

        var parameters = [1, 2, 3, 4];
        var otherParmeters = [44, 88];
        var copyParameters = Function.call.bind(Array.prototype.slice, parameters);

        function paramsFn(one, two, three, four) {
            console.log('paramsFn arguments:', arguments);
            console.log('paramsFn: one:(%s) two:(%s) three:(%s) four:(%s)\n\n', one, two, three, four);
        }

        function es5MultipleParamsApply() {
            console.log('Function.prototype.apply() can be used to generically pass an array of values as separate params to a function');
            paramsFn.apply(null, parameters);

            console.log('however, only a single array of values may be specified and no other named parameters can be passed simultaneously');
            paramsFn.apply(null, parameters, [5, 6], 7, 8);

            console.log('apply() can also be used to pass the arguments array-like object as separate params to a function');
            argsFn.apply(null, parameters);

            function argsFn() {
                paramsFn.apply(null, arguments);
            }
        }

        function multipleParamsSpread() {
            console.log('the spread operator makes it easier to generically pass an iterable object of values as separate params to a function');
            paramsFn(...parameters);

            console.log('multiple spread operators may be used, as well as passing other named parameters simultaneously');
            paramsFn(...parameters, 5, ...[6, 7], 8, ...parameters.map(i => (i + 8) * 2), 'sweet!', ...parameters, ...['cool!']);

            console.log('it is easy to pass the arguments array-like object as separate params to a function with spread');
            argsFn(...parameters);

            function argsFn() {
                paramsFn(...arguments);
            }
        }

        function es5ArrayInPlacePush() {
            var parameters = copyParameters();

            console.log('apply() can also be used push() a single array of values to an array in place');

            console.log('parameters: before:', parameters);
            Array.prototype.push.apply(parameters, otherParmeters, 5, [6, 7], otherParmeters);
            console.log('parameters: after:', parameters);
        }

        function arrayInPlaceSpread() {
            var parameters = copyParameters();

            console.log('the spread operator allows push() to be called directly while passing multiple iterable objects of values');

            console.log('parameters: before:', parameters);
            parameters.push(...otherParmeters, 5, ...[6, 7], 'awesome!', ...parameters);
            console.log('parameters: after:', parameters);
        }

        function arrayLiteralSpread() {
            var arrayLiteral = [...parameters, 5, ...[6, 7], ...otherParmeters, ...[`that's hot...`, ...parameters, 'literally!!!'], 999];
            console.log('array literal:', arrayLiteral);
        }

        function Controller() {
            [...arguments].forEach((argument, index) => this[`property${index}`] = argument);
        }
        Controller.prototype.listProperties = function(label) {
            Object
                .keys(this)
                .forEach(property => console.log('%s: %s:', label, property, this[property]));
        };

        function es5NewApply() {
            var o = New(Controller, parameters);
            o.listProperties('new/apply');

            function New(fn, array) {
                var Constructor, instance;

                Constructor = function() {};
                Constructor.prototype = fn.prototype;
                fn.apply(instance = new Constructor(), array);
                return instance;
            }
        }

        function es5NewBindApply() {
            var o = new (Function.bind.apply(Controller, [null].concat(parameters)))();
            o.listProperties('new/bind/apply');
        }

        function newApplySpread() {
            var o = new Controller(...parameters, 5, ...[6, 7], ...otherParmeters);
            o.listProperties('new/spread');
        }
    }
})();