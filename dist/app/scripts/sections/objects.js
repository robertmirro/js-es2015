(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6Objects', es6Objects);

    function es6Objects(sections) {
        this.subSections = [
            sections.subSection(es5ManualAssignFor, 'ES5: Manually assign properties to an object using a <code>for</code> and <code>Object.keys</code>'),
            sections.subSection(objectAssignInPlace, 'Assign properties to target object in place using <code>Object.assign</code>'),
            sections.subSection(objectAssignNewCopy, 'Assign properties to a new copy of target object using <code>Object.assign</code>'),
            sections.subSection(objectAssignWithArrays, '<code>Object.assign</code> also works with arrays'),
            sections.subSection(objectAssignIsShallowCopy, '<code>Object.assign</code> does <strong>not</strong> deep copy properties'),
            sections.subSection(objectIsStrictEquality, '<code>Object.is</code> acts as programmatic strict equality (<code>===</code>) match'),
            sections.subSection(objectIsSpecialCases, '<code>Object.is</code> has special cases when testing <code>NaN</code> and <code>0</code>'),
            sections.subSection(es5ManipulateProto, 'ES5: Manipulate <code>__proto__</code> of an object created using a constructor function or <code>Object.create</code>'),
            sections.subSection(setPrototypeOfExistingObject, 'Manipulate prototype of an existing object using <code>Object.setPrototypeOf</code>'),
            sections.subSection(setPrototypeVsObjectCreate, '<code>Object.setPrototypeOf</code> is similar to <code>Object.create</code> when creating a new object')
        ];

        var before, after, equality, objectIs;

        before = log('target (before):');
        after = log('target (after):');
        equality = log('(%s) = %s');
        objectIs = log('Object.is(%s) = %s');

        function log(defaultMessage) {
            return console.log.bind(console, defaultMessage);
        }

        function values() {
            return [{
                a: 'a',
                b: 'b',
                c: 'c'
            }, {
                a: 'a',
                b: 'b2',
                d: 'd'
            }];
        }

        function es5ManualAssignFor() {
            var value, target, source;

            value = values();
            target = value[0];
            source = value[1];

            before(target);
            for (var property in source) {
                if (source.hasOwnProperty(property)) {
                    target[property] = source[property];
                }
            }
            after(target);

            value = values();
            target = value[0];
            source = value[1];

            before(target);
            Object.keys(source).forEach(function(property) {
                target[property] = source[property];
            });
            after(target);
        }

        function objectAssignInPlace() {
            let [target, source] = values();

            before(target);
            Object.assign(target, source);
            after(target);
        }

        function objectAssignNewCopy() {
            let [target, source] = values();
            let targetCopy;

            before(target);
            targetCopy = Object.assign({}, target, source);
            after(target);
            console.log('targetCopy:', targetCopy);
        }

        function objectAssignWithArrays() {
            let target = [1, 2, 3, 4];
            let source = [3, 2, 1];
            let targetCopy;

            before(target);
            targetCopy = Object.assign([], target, source);
            after(target);
            console.log('targetCopy:', targetCopy);
        }

        function objectAssignIsShallowCopy() {
            let [target, source] = values();
            target.b = {
                b1: 'b1',
                b2: 'b2'
            };
            source.b = {
                b3: 'b3'
            };

            before(target);
            Object.assign(target, source);
            after(target);
        }

        function objectIsStrictEquality() {
            equality(`'b' == 'b'`, 'b' == 'b');
            equality(`'b' === 'b'`, 'b' === 'b');
            objectIs(`'b', 'b'`, Object.is('b', 'b'));

            equality(`1 == '1'`, 1 == '1');
            equality(`1 === '1'`, 1 === '1');
            objectIs(`1, '1'`, Object.is(1, '1'));

            let o = {};
            equality(`o == o`, o == o);
            equality(`o === o`, o === o);
            objectIs(`o, o`, Object.is(o, o));

            equality(`{} == {}`, {} == {});
            equality(`{} === {}`, {} === {});
            objectIs(`{}, {}`, Object.is({}, {}));
        }

        function objectIsSpecialCases() {
            equality(`NaN == NaN`, NaN == NaN);
            equality(`NaN === NaN`, NaN === NaN);
            objectIs(`NaN, NaN`, Object.is(NaN, NaN));

            equality(`0 == -0`, 0 == -0);
            equality(`0 === -0`, 0 === -0);
            objectIs(`0, -0`, Object.is(0, -0));
        }

        function constructorObject() {
            function ConstructorFn() {
                this.a = 'a1';
            }
            ConstructorFn.prototype.b = function() {
                console.log('(constructorObject.b) a:', this.a);
            };
            return new ConstructorFn();
        }

        function createObject() {
            let prototype = {
                b() {
                    console.log('(createObject.b) a:', this.a);
                }
            };
            let property = {
                a: {
                    value: 'a2'
                }
            };
            return Object.create(prototype, property);
        }

        function newPrototype() {
            return {
                b() {
                    console.log('(new.b) a:', this.a);
                }
            };
        }

        function es5ManipulateProto() {
            var o;

            o = constructorObject();
            o.b();
            o.__proto__ = newPrototype();
            o.b();

            o = createObject();
            o.b();
            o.__proto__ = newPrototype();
            o.b();
        }

        function setPrototypeOfExistingObject() {
            let o;

            o = constructorObject();
            o.b();
            Object.setPrototypeOf(o, newPrototype());
            o.b();

            o = createObject();
            o.b();
            Object.setPrototypeOf(o, newPrototype());
            o.b();
        }

        function setPrototypeVsObjectCreate() {
            let o;

            o = Object.setPrototypeOf({
                a: 'a3'
            }, newPrototype());
            o.b();
        }
    }
})();