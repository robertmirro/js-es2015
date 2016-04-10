(function() {
    'use strict';

    angular
        .module('es2015')
        .provider('sections', sectionsProvider);

    function sectionsProvider(sectionDescriptor) {
        var sectionsList, linkMap, invokeOptions;

        sectionsList = [];
        linkMap = linkMapObject([
            ['mdn', 'MDN', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/'],
            ['mes6id', 'Mozilla Hacks - ES6 In Depth', 'https://hacks.mozilla.org/'],
            ['pfes6id', 'PonyFoo - ES6 In Depth', 'https://ponyfoo.com/articles/'],
            ['ejs', 'Exploring JS', 'http://exploringjs.com/es6/'],
            ['uecmas6', 'Understanding ECMAScript 6', 'https://leanpub.com/understandinges6/read/#leanpub-auto-'],
            ['ydkjs', 'You Dont Know JS', 'https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/'],
            ['es6cs', 'ES6 Cheat Sheet', 'https://github.com/DrkSephy/es6-cheatsheet'],
            ['drar', '②ality - Dr. Axel Rauschmayer', 'http://www.2ality.com/']
        ]);
        invokeOptions = {
            clearConsole: true,
            debugger: {
                launch: false,
                inject: false
            }
        };

        this.$get = function $get() {
            return {
                list: sectionsList,
                getSection: getSection,
                subSection: subSection,
                formatJsSource: formatJsSource,
                invokeFn: invokeFn,
                invokeOptions: invokeOptions
            };
        };

        this.buildSectionsList = function buildSectionsList() {
            if (sectionsList.length === 0) {
                section(
                    'es6Objects',
                    'Objects',
                    null,
                    'New <code>Object</code> methods introduced with ES2015.', [
                        sectionLink('ES6 Object Changes in Depth', 'es6-object-changes-in-depth', linkMap.pfes6id),
                        sectionLink('Object Methods', 'new-methods', linkMap.uecmas6),
                        sectionLink('Object', 'ch6.md#object', linkMap.ydkjs),
                        sectionLink('New methods of Object', 'ch_oop-besides-classes.html#_new-methods-of-object', linkMap.ejs)
                    ]
                );
                section(
                    'es6Arrays',
                    'Arrays',
                    null,
                    'New <code>Array</code> methods introduced with ES2015.', [
                        sectionLink('ES6 Array Extensions in Depth', 'es6-array-extensions-in-depth', linkMap.pfes6id),
                        sectionLink('Array Methods', 'arrays', linkMap.uecmas6),
                        sectionLink('Array', 'ch6.md#array', linkMap.ydkjs),
                        sectionLink('New Array features', 'ch_arrays.html#ch_arrays', linkMap.ejs)
                    ]
                );
                section(
                    'es6Numbers',
                    'Numbers',
                    null,
                    'New <code>Number</code> methods introduced with ES2015.', [
                        sectionLink('ES6 Number Improvements in Depth', 'es6-number-improvements-in-depth', linkMap.pfes6id),
                        sectionLink('Integer-Related Static Functions', 'ch6.md#integer-related-static-functions', linkMap.ydkjs),
                        sectionLink('New number and Math features', 'ch_numbers.html', linkMap.ejs)
                    ],
                    false
                );
                section(
                    'es6Strings',
                    'Strings',
                    null,
                    'New <code>String</code> methods introduced with ES2015.', [
                        sectionLink('ES6 Strings (and Unicode, ❤) in Depth', 'es6-strings-and-unicode-in-depth', linkMap.pfes6id),
                        sectionLink('Other String Changes', 'other-string-changes', linkMap.uecmas6),
                        sectionLink('String', 'ch6.md#string', linkMap.ydkjs),
                        sectionLink('New String features', 'ch_strings.html', linkMap.ejs),
                        sectionLink('Strings', '#strings', linkMap.es6cs)
                    ],
                    false
                );
                section(
                    'es6ObjectLiterals',
                    'Object Literals',
                    null,
                    'New <em>object literal</em> notation introduced with ES2015', [
                        sectionLink('Object initializer', 'Operators/Object_initializer', linkMap.mdn),
                        sectionLink('ES6 Object Literal Features in Depth', 'es6-object-literal-features-in-depth', linkMap.pfes6id),
                        sectionLink('Object Literal Syntax Extensions', 'object-literal-syntax-extensions', linkMap.uecmas6),
                        sectionLink('Object Literal Extensions', 'ch2.md#object-literal-extensions', linkMap.ydkjs),
                        sectionLink('New object literal features', 'ch_oop-besides-classes.html#_new-object-literal-features', linkMap.ejs)
                    ]
                );
                section(
                    'es6TemplateLiterals',
                    'Template Literals',
                    null,
                    '<em>Template literals</em> are string literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them. They were called "<em>template strings</em>" in prior editions of the ES2015 / ES6 specification.', [
                        sectionLink('Template literals', 'Template_literals', linkMap.mdn),
                        sectionLink('ES6 Template Literals in Depth', 'es6-template-strings-in-depth', linkMap.pfes6id),
                        sectionLink('Template Literals', 'template-literals', linkMap.uecmas6),
                        sectionLink('Template Literals', 'ch2.md#template-literals', linkMap.ydkjs),
                        sectionLink('New methods of Object', 'ch_oop-besides-classes.html#_new-methods-of-object', linkMap.ejs),
                        sectionLink('Template Literals', '#template-literals', linkMap.es6cs)
                    ]
                );
                section(
                    'es6BlockScoping',
                    'Block Scoping',
                    null,
                    'The <code>let</code> statement declares a block scope local variable, optionally initializing it to a value.<p>The <code>const</code> declaration creates a read-only reference to a value. It does not mean the value it holds is immutable, just that the variable identifier cannot be reassigned.</p>', [
                        sectionLink('let statement', 'Statements/let', linkMap.mdn),
                        sectionLink('const statement', 'Statements/const', linkMap.mdn),
                        sectionLink('let and const', '2015/07/es6-in-depth-let-and-const/', linkMap.mes6id),
                        sectionLink('ES6 Let, Const and the “Temporal Dead Zone” (TDZ) in Depth', 'es6-let-const-and-temporal-dead-zone-in-depth', linkMap.pfes6id),
                        sectionLink('Block bindings', 'block-bindings', linkMap.uecmas6),
                        sectionLink('Block-Level Functions', 'block-level-functions', linkMap.uecmas6),
                        sectionLink('Block-scoped declarations', 'ch2.md#block-scoped-declarations', linkMap.ydkjs),
                        sectionLink('Variables and scoping', 'ch_variables.html#ch_variables', linkMap.ejs),
                        sectionLink('var vs let/const', '#var-versus-let--const', linkMap.es6cs),
                        sectionLink('Temporal Dead Zone (TDZ) Demystified', 'http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified/')
                    ]
                );
                section(
                    'es6ArrowFunctions',
                    'Arrow Functions',
                    null,
                    'An <em>arrow function</em> expression (also known as <em>fat arrow function</em>) has a shorter syntax compared to function expressions and lexically binds the this value (does not bind its own this, arguments, super, or new.target). Arrow functions are always anonymous.', [
                        sectionLink('Arrow functions', 'Functions/Arrow_functions', linkMap.mdn),
                        sectionLink('Arrow functions', '2015/06/es6-in-depth-arrow-functions/', linkMap.mes6id),
                        sectionLink('ES6 Arrow Functions in Depth', 'es6-arrow-functions-in-depth', linkMap.pfes6id),
                        sectionLink('Arrow Functions', 'arrow-functions', linkMap.uecmas6),
                        sectionLink('Arrow Functions', 'ch2.md#arrow-functions', linkMap.ydkjs),
                        sectionLink('Arrow Functions', 'ch_arrow-functions.html#ch_arrow-functions', linkMap.ejs),
                        sectionLink('Arrow Functions', '#arrow-functions', linkMap.es6cs)
                    ]
                );
                section(
                    'es6DestructuringAssignment',
                    'Destructuring Assignment',
                    null,
                    'The <em>destructuring assignment</em> syntax is a JavaScript expression that makes it possible to extract data from arrays or objects using a syntax that mirrors the construction of array and object literals.', [
                        sectionLink('Destructuring assignment', 'Operators/Destructuring_assignment', linkMap.mdn),
                        sectionLink('Destructuring', '2015/05/es6-in-depth-destructuring/', linkMap.mes6id),
                        sectionLink('ES6 JavaScript Destructuring in Depth', 'es6-destructuring-in-depth', linkMap.pfes6id),
                        sectionLink('Destructuring for Easier Data Access', 'destructuring-for-easier-data-access', linkMap.uecmas6),
                        sectionLink('Destructuring', 'ch2.md#destructuring', linkMap.ydkjs),
                        sectionLink('Destructuring', 'ch_destructuring.html', linkMap.ejs),
                        sectionLink('Destructuring', '#destructuring', linkMap.es6cs),
                        sectionLink('The destructuring algorithm in ECMAScript 6', '2015/03/destructuring-algorithm.html', linkMap.drar),
                        sectionLink('Destructuring and parameter handling in ECMAScript 6', '2015/01/es6-destructuring.html', linkMap.drar),
                        sectionLink('Destructuring objects as function parameters in ES6', 'http://simonsmith.io/destructuring-objects-as-function-parameters-in-es6/')
                    ]
                );
                section(
                    'es6DefaultParameters',
                    'Default Parameters',
                    null,
                    '<em>Default function parameters</em> allow formal parameters to be initialized with default values if no value or undefined is passed.', [
                        sectionLink('Default parameters', 'Functions/Default_parameters', linkMap.mdn),
                        sectionLink('Default Operator', 'es6-spread-and-butter-in-depth#default-operator', linkMap.pfes6id),
                        sectionLink('Functions with Default Parameter Values', 'functions-with-default-parameter-values', linkMap.uecmas6),
                        sectionLink('Default Parameter Values', 'ch2.md#default-parameter-values', linkMap.ydkjs),
                        sectionLink('Parameter default values', 'ch_parameter-handling.html#sec_parameter-default-values', linkMap.ejs),
                        sectionLink('Default Parameters', '#default-parameters', linkMap.es6cs),
                        sectionLink('Destructuring and parameter handling in ECMAScript 6 - Parameter handling', '2015/01/es6-destructuring.html#parameter_handling', linkMap.drar),
                    ]
                );
                section(
                    'es6RestParameters',
                    'Rest Parameters',
                    null,
                    'The <em>rest parameter</em> syntax allows us to represent an indefinite number of arguments as an array.', [
                        sectionLink('Rest parameters', 'Functions/rest_parameters', linkMap.mdn),
                        sectionLink('Rest parameters and defaults', '2015/05/es6-in-depth-rest-parameters-and-defaults/', linkMap.mes6id),
                        sectionLink('Rest parameters', 'es6-spread-and-butter-in-depth#rest-parameters', linkMap.pfes6id),
                        sectionLink('Rest Parameters', 'rest-parameters', linkMap.uecmas6),
                        sectionLink('Spread/Rest', 'ch2.md#spreadrest', linkMap.ydkjs),
                        sectionLink('Rest parameters', 'ch_parameter-handling.html#sec_rest-parameters', linkMap.ejs),
                        sectionLink('Rest Parameters', '#rest-parameters', linkMap.es6cs),
                        sectionLink('Destructuring and parameter handling in ECMAScript 6 - Rest parameters', '2015/01/es6-destructuring.html#rest_parameters', linkMap.drar),
                    ]
                );
                section(
                    'es6SpreadOperator',
                    'Spread Operator',
                    null,
                    'The <em>spread operator</em> allows an expression to be expanded in places where multiple arguments (for function calls) or multiple elements (for array literals) are expected.', [
                        sectionLink('Spread operator', 'Operators/Spread_operator', linkMap.mdn),
                        sectionLink('Spread Operator', 'es6-spread-and-butter-in-depth#spread-operator', linkMap.pfes6id),
                        sectionLink('The Spread Operator', 'the-spread-operator', linkMap.uecmas6),
                        sectionLink('Spread/Rest', 'ch2.md#spreadrest', linkMap.ydkjs),
                        sectionLink('The spread operator (...)', 'ch_parameter-handling.html#sec_spread-operator', linkMap.ejs),
                        sectionLink('Spread Operator', '#spread-operator', linkMap.es6cs),
                        sectionLink('Destructuring and parameter handling in ECMAScript 6 - The spread operator (...)', '2015/01/es6-destructuring.html#the_spread_operator_%28...%29', linkMap.drar),
                    ]
                );
                section(
                    'es6Promises',
                    'Promises',
                    null,
                    'The <code>Promise</code> object is used for deferred and asynchronous computations. A Promise represents an operation that hasn\'t completed yet, but is expected in the future.', [
                        sectionLink('Promise', 'Global_Objects/Promise', linkMap.mdn),
                        sectionLink('ES6 Promises in Depth', 'es6-promises-in-depth', linkMap.pfes6id),
                        sectionLink('Promises', 'promises', linkMap.uecmas6),
                        sectionLink('Promises', 'ch4.md#promises', linkMap.ydkjs),
                        sectionLink('Promises for asynchronous programming', 'ch_promises.html', linkMap.ejs),
                        sectionLink('Promises', '#promises', linkMap.es6cs),
                        sectionLink('Promise-based functions should not throw exceptions', '2016/03/promise-rejections-vs-exceptions.html', linkMap.drar),
                        sectionLink('We have a problem with promises', 'https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html'),
                        sectionLink('Promise Patterns & Anti-Patterns', 'http://www.datchley.name/promise-patterns-anti-patterns/')
                    ]
                );
                section('es6Modules', 'Modules', null, '', [], false);
                section('es6Classes', 'Classes', null, '', [], false);
                section('es6Symbols', 'Symbols', null, '', [], false);
                section('es6Iterators', 'Iterators', null, '', [], false);
                section('es6Generators', 'Generators', null, '', [], false);
                section('es6MapsWeakMaps', 'Maps / Weak Maps', null, '', [], false);
                section('es6SetsWeakSets', 'Sets / Weak Sets', null, '', [], false);
                section('es6Proxies', 'Proxies', null, '', [], false);
                section('es6Reflection', 'Reflection', null, '', [], false);
            }

            return sectionsList;

            function section(controllerName, navigationLinkText, headerText, description, links, isEnabled) {
                sectionsList.push({
                    name: sectionDescriptor + '.' + controllerName,
                    url: '/' + controllerName,
                    controller: controllerName,
                    controllerAs: 'vm',
                    navigationLinkText: navigationLinkText,
                    headerText: headerText || navigationLinkText,
                    description: description,
                    links: links,
                    isEnabled: angular.isUndefined(isEnabled) ? true : !!isEnabled,
                    template: '<sub-sections-list sub-sections="vm.subSections"></sub-sections-list>'
                });
            }

            function sectionLink(linkText, linkUrl, linkMap) {
                return {
                    linkText: linkText,
                    linkUrl: linkUrl,
                    linkMap: linkMap
                };
            }
        };

        function linkMapObject(linkMapArray) {
            linkMap = {};
            (linkMapArray || []).forEach(function(link) {
                linkMap[link[0]] = {
                    linkText: link[1],
                    linkUrl: link[2]
                };
            });

            return linkMap;
        }

        function getSection($state) {
            var sectionObject;

            sectionsList.some(function(section) {
                return section.name === $state.current.name && (sectionObject = section);
            });

            return sectionObject || {};
        }

        function subSection(fn, title) {
            return {
                fn: fn,
                title: title
            };
        }

        function formatJsSource(source) {
            var baseIndentSpaces, baseIndent;

            baseIndentSpaces = /\n( *)}$/.exec(source) || []; // assume number of spaces before function closing bracket represents code indent
            if (baseIndentSpaces[1]) {
                baseIndent = new RegExp('\\n( {' + baseIndentSpaces[1].length + '})', 'g');
                source = source.replace(baseIndent, '\n');
            }

            return source;
        }

        function invokeFn(fn, fnFormatted) {
            (invokeOptions.clearConsole ? console.clear() : null);
            (invokeOptions.debugger.launch ? injectDebugger(fn, fnFormatted) : fn());

            function injectDebugger(fn, fnFormatted) {
                if (invokeOptions.debugger.inject) {
                    return (new Function('debugger;\n' + fnFormatted.match(/function[^{]+\{([\s\S]*)\}$/)[1]))();
                }

                console.log('%cChoose the debugger "Step Into" button twice (or choose "CTRL" + ";" twice) to step into fn().', 'color: #ffffff; background-color: #3b7fba; border: 1px solid #ffffff; padding: 10px; line-height: 40px; font-size: 1.1em;');
                debugger;
                fn();
            }
        }
    }
})();