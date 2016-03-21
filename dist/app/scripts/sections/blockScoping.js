(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6BlockScoping', es6BlockScoping);

    function es6BlockScoping(sections, $window, $timeout) {
        this.subSections = [
            sections.subSection(es5VarScoping, 'ES5: <code>var</code> can only be scoped to a <code>function</code> block or to the global object'),
            sections.subSection(blockScoping, 'Block scoping is now possible via <code>let</code> and <code>const</code>'),
            sections.subSection(functionBlockScoping, '<code>function</code> declarations are also block scoped in strict mode'),
            sections.subSection(es5VarScopingProblem, 'ES5: A common problem with <code>var</code> scoping'),
            sections.subSection(es5VarScopingSolutions, 'ES5: Some possible solutions to deal with <code>var</code> scoping'),
            sections.subSection(letScopingSolution, '<code>let</code> scoping provides a simple solution to the common ES5 problem'),
            sections.subSection(constMutable, '<code>const</code> prevents variable reassignment but is <strong>&lt;&gt;</strong> immutability')
        ];

        function es5VarScoping() {
            var outerFunctionVar = 'outer function scoped var value';

            // var variables are scoped globally if they are not defined within a function
            // scripts/globalVarVsLetConst.js defines a global var:
            console.log('globalVar:', globalVar);

            // globally scoped var variables are created as properties on the global object ("window" when running JS in a browser)
            console.log('globalVar === window.globalVar:', globalVar === $window.globalVar);

            console.log('outerFunctionVar: %s\n\n', outerFunctionVar);

            function varFunctionScope() {
                // var variables (but not their values) are hoisted to the top of their scope and may be referenced before their definition
                console.log('innerFunctionVar (hoisted): %s\n\n', innerFunctionVar);

                var globalVar = 'globally scoped var redefined as function scoped var value';
                var outerFunctionVar = 'outer function scoped var redefined as inner function scoped var value';
                var innerFunctionVar = 'soley inner function scoped var value';

                // var variables defined within a function scope their values to that function block regardless of same-named var variables defined in the outer context
                console.log('globalVar:', globalVar);
                console.log('outerFunctionVar:', outerFunctionVar);
                console.log('innerFunctionVar:', innerFunctionVar);

                // var variables can be redefined within their same scope even in strict mode (need linting to catch this)
                var innerFunctionVar = 'a newly redefined inner function scoped var value';
                console.log('innerFunctionVar (redefined): %s\n\n', innerFunctionVar);
            }
            varFunctionScope();

            // outer scoped var variables are not overwritten by inner function scoped variables of the same name
            console.log('globalVar:', globalVar);
            console.log('outerFunctionVar:', outerFunctionVar);

            // var variables defined soley in a function block are not available outside of that context
            console.log('innerFunctionVar:', typeof innerFunctionVar);
        }

        function blockScoping() {
            let outerFunctionLet = 'outer function scoped let value';

            // let/const variables are scoped globally if they are not defined within a function
            // scripts/globalVarVsLetConst.js defines a global let/const:
            console.log('globalLet:', globalLet);
            console.log('globalConst: %s\n\n', globalConst);

            // NOTE: let/const variables share the same var variable scoping rules as described above except:
            //
            // 1. global let/const variables are not assigned as properties to the global object
            console.log('window.globalLet:', $window.globalLet);
            console.log('window.globalConst: %s\n\n', $window.globalConst);

            //
            // 2. let/const variables cannot be redefined within their same scope, this can't be tested here because:
            //    a. an error is thrown BEFORE blockScoping() is executed regardless of strict mode
            //    b. wrapping it in a try/catch scopes the variable to that inner block and avoids the error
            // let outerFunctionLet = 'cannot even attempt to redefine this variable in the same scope';

            //
            // 3. The Temporal Dead Zone (TDZ): Where let/const variables go to die
            //
            //    let/const variables are also hoisted to the top of their scope
            //    however, an error is thrown if they are referenced before their definition
            try {
                console.log('hoistedLet (TDZ)');
                console.log('hoistedLet:', hoistedLet);
            } catch (e) {
                console.error('hoistedLet (catch):', e);
            }
            let hoistedLet = 'hoisted let value';
            console.log('hoistedLet: %s\n\n', hoistedLet);

            //
            // 4. let/const add an additional level of scoping that extends to all blocks (not just function blocks)
            {
                // variables defined and populated at outer level
                let letValue = 'outer';
                const constValue = 'outer';
                console.log('let (outer):', letValue);
                console.log('const (outer):', constValue);

                if (true) {
                    // variables redefined and populated at inner level
                    let letValue = 'inner';
                    const constValue = 'inner';
                    console.log('\tlet (inner):', letValue);
                    console.log('\tconst (inner):', constValue);

                    do {
                        let letAnotherValue = 'an inner, inner block';

                        // don't redefine let variable, only repopulate it at deep inner level (cannot reassign/repopulate a const variable)
                        letValue = 'deep inner';
                        console.log('\t\tlet (deep inner):', letValue);
                    } while (false);

                    console.log('\tlet (inner - uh oh):', letValue);
                    console.log('\tconst (inner):', constValue);
                }

                console.log('let (outer):', letValue);
                console.log('const (outer):', constValue);
            }
        }

        function functionBlockScoping() {
            {
                function blockScoped(context) {
                    console.log('blockScoped context:', context);
                }
                blockScoped('inner');
            }

            try {
                blockScoped('outer');
            } catch (e) {
                console.error('blockScoped (catch):', e);
            }
        }

        var _delay = 0;
        var delay = {
            get milliseconds() {
                return (_delay += 500);
            },
            set milliseconds(milliseconds) {
                _delay = milliseconds || 0;
            }
        };

        function es5VarScopingProblem() {
            delay.milliseconds = 0;
            for (var i = 1; i < 5; i++) {
                $timeout(function() {
                    console.log('var (for loop) i:', i);
                }, delay.milliseconds);
            }
            console.log('var (after for loop) i:', i);
        }

        function es5VarScopingSolutions() {
            delay.milliseconds = 0;

            function createExternalFnClosure(i) {
                return function() {
                    console.log('var (external fn closure) i:', i);
                };
            }
            for (var i = 1; i < 5; i++) {
                $timeout(createExternalFnClosure(i), delay.milliseconds);
            }

            for (var j = 1; j < 5; j++) {
                $timeout((function(i) {
                    return function() {
                        console.log('var (iife closure) i:', i);
                    };
                })(j), delay.milliseconds);
            }

            for (var k = 1; k < 5; k++) {
                $timeout(function(i) {
                    console.log('var (bind default parameter) i:', i);
                }.bind(null, k), delay.milliseconds);
            }
        }

        function letScopingSolution() {
            delay.milliseconds = 0;
            for (let i = 1; i < 5; i++) {
                $timeout(function() {
                    console.log('let (for loop) i:', i);
                }, delay.milliseconds);
            }
            console.log('let (after for loop) i:', typeof i);
        }

        function constMutable() {
            const person = {
                name: 'Robert'
            };
            console.log('person:', person);

            try {
                person = 'Mr. Mirro';
            } catch (e) {
                console.error('person.name (catch):', e);
            }

            person.name = 'El Bobbio';
            console.log('person (uh oh):', person);
        }
    }
})();