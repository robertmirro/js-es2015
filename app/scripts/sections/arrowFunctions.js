(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6ArrowFunctions', es6ArrowFunctions);

    function es6ArrowFunctions(sections, $timeout) {
        this.subSections = [
            sections.subSection(es5FunctionReview, 'ES5: Review of <code>function</code> declarations vs <code>function</code> expressions'),
            sections.subSection(shorterFnExpressionSyntax, 'Arrow functions are similar to <code>function</code> expressions, only with a shorter syntax'),
            sections.subSection(arrowFnSyntax, 'Some syntax is optional depending on the components involved'),
            sections.subSection(arrowFnAnonymousSyntax, 'All syntax rules still apply when an arrow function is used as an anonymous callback'),
            sections.subSection(es5FunctionThisIssues, 'ES5: Functions used as callbacks have issues with <code>this</code>'),
            sections.subSection(lexicalThis, 'Lexical <code>this</code>: Arrow functions do not have their own <code>this</code>, it is inherited from the enclosing scope')
        ];

        function es5FunctionReview() {
            console.log('%s (before definition):', fnDeclaration.name, fnDeclaration());
            try {
                fnExpression();
            } catch (e) {
                console.error('fnExpression (before definition):', e);
            }

            function fnDeclaration() {
                return 'function declarations are hoisted, function name is mandatory';
            }

            var fnExpression = function fnExp() {
                return 'function expressions are not hoisted, function name is optional';
            };
            var fnExpressionAnonymous = function() {
                return 'unnamed function expressions now assume the name of the declared variable';
            };

            console.log('%s (after definition):', fnDeclaration.name, fnDeclaration());
            console.log('%s (after definition):', fnExpression.name, fnExpression());
            console.log('%s (after definition):', fnExpressionAnonymous.name, fnExpressionAnonymous());
        }

        function shorterFnExpressionSyntax() {
            try {
                arrowFn();
            } catch (e) {
                console.error('arrowFn (before definition):', e);
            }

            let arrowFn = () => 'arrow functions are not hoised, are always anonymous and have a shorter syntax than function expressions';
            console.log('%s (after definition):', arrowFn.name, arrowFn());
        }

        function arrowFnSyntax() {
            let requiredParensZeroParams = () => 'Parenthesis (or an underscore: _) are required when there are zero parameters: ()';
            let requiredParensMoreThanOneParam = (x, y) => `Parenthesis are required when there are more than one parameter: (${x}, ${y})`;
            let optionalParensOneParam = x => `Parenthesis are optional when there is only one parameter: (${x})`;

            let requireBracketsMultiStatements = () => {
                let bracketNotation = `Bracket notation is required (i.e., block body) when there is more than one statement/expression`;
                let explicitReturn = `an explicit return must be used`;
                return `${bracketNotation}, ${explicitReturn}`;
            };
            let optionalBracketsSingleStatement = () => `Bracket notation is optional (i.e., concise body) when there is a single statement/expression, return is implied`;

            // returning an object literal from a concise body requires that the object be wrapped in parenthesis to avoid a syntax error
            let returnObjectLiteral = () => ({
                property: 'value'
            });

            console.log('%s:', requiredParensZeroParams.name, requiredParensZeroParams());
            console.log('%s:', requiredParensMoreThanOneParam.name, requiredParensMoreThanOneParam(4, 8));
            console.log('%s: %s\n\n', optionalParensOneParam.name, optionalParensOneParam(44));

            console.log('%s:', requireBracketsMultiStatements.name, requireBracketsMultiStatements());
            console.log('%s: %s\n\n', optionalBracketsSingleStatement.name, optionalBracketsSingleStatement());

            console.log('%s:', returnObjectLiteral.name, returnObjectLiteral());
        }

        function arrowFnAnonymousSyntax() {
            console.log('Anonymous callback (concise):', [1, 2, 3, 4].map(value => value * value));
            console.log('Anonymous callback (block):', [1, 2, 3, 4].map((value, index) => {
                let total = value * index;
                return total;
            }));
        }

        function es5FunctionThisIssues() {
            function O() {
                var self = this;

                this.name = 'Ben Dover';
                this.standardThis = function() {
                    return this ? this.name : undefined;
                };
                this.boundThis = function() {
                    return this.name;
                }.bind(this);
                this.asyncThis = function(reference, blankLine) {
                    $timeout(function() {
                        console.log('asyncThis (%s reference) name: %s%s',
                            reference,
                            this ? this.name : undefined,
                            blankLine ? '\n\n' : ''
                        );
                    });
                };
                this.asyncSelfThis = function(reference, blankLine) {
                    $timeout(function() {
                        console.log('asyncSelfThis (%s reference) name: %s%s',
                            reference,
                            self ? self.name : undefined,
                            blankLine ? '\n\n' : ''
                        );
                    });
                };
            }

            var o = new O();
            var standardThis = o.standardThis;
            var boundThis = o.boundThis;
            var asyncThis = o.asyncThis;
            var asyncSelfThis = o.asyncSelfThis;

            console.log('standardThis (object.fn reference) name:', o.standardThis());
            console.log('standardThis (only fn reference) name:', standardThis());
            console.log('standardThis (only fn reference and fn.call/apply) name:', standardThis.call(o));
            console.log('standardThis (only fn reference and fn.bind) name: %s\n\n', standardThis.bind(o)());

            console.log('boundThis (object.fn reference) name:', o.boundThis());
            console.log('boundThis (only fn reference) name: %s', boundThis());
            console.log('boundThis (only fn reference) name: %s\n\n', boundThis.call({
                name: 'Hugh Janus'
            }));

            o.asyncThis('object.fn');
            asyncThis('only fn', true);

            o.asyncSelfThis('object.fn');
            asyncSelfThis('only fn', true);
        }

        function lexicalThis() {
            function O() {
                this.name = 'Ilene Dover';
                this.standardThis = () => this.name;
                this.asyncThisArrow = (reference, blankLine) => {
                    $timeout(() => {
                        console.log('asyncThisArrow (%s reference) name: %s%s',
                            reference,
                            this ? this.name : undefined,
                            blankLine ? '\n\n' : ''
                        );
                    });
                };
                this.asyncThisFn = function(reference, blankLine) {
                    $timeout(() => {
                        console.log('asyncThisFn (%s reference) name: %s%s',
                            reference,
                            this ? this.name : undefined,
                            blankLine ? '\n\n' : ''
                        );
                    });
                };
            }

            var o = new O();
            var standardThis = o.standardThis;
            var asyncThisArrow = o.asyncThisArrow;
            var asyncThisFn = o.asyncThisFn;

            console.log('standardThis (object.fn reference) name:', o.standardThis());
            console.log('standardThis (only fn reference) name: %s\n\n', standardThis());

            o.asyncThisArrow('object.fn');
            asyncThisArrow('only fn', true);

            o.asyncThisFn('object.fn');
            asyncThisFn('only fn', true);
        }
    }
})();