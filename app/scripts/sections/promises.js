(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6Promises', es6Promises);

    function es6Promises(sections) {
        this.subSections = [
            sections.subSection(es5MultipleParamsApply, 'ES5: Using <code>apply</code> to pass multiple parameters to a <code>function</code>'),
            sections.subSection(multipleParamsSpread, 'Passing multiple <code>function</code> parameters via the spread operator')
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

    }
})();