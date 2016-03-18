(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6ObjectLiterals', es6ObjectLiterals);

    function es6ObjectLiterals(sections) {
        this.subSections = [
            sections.subSection(es5ObjectLiteral, 'ES5: Creating an <code>Object</code> using object literal syntax'),
            sections.subSection(shorthandPropertyNames, 'Shorthand property names may be used when the property name matches the property value'),
            sections.subSection(shorthandMethodNames, '<code>function</code> may be omitted when using shorthand method names'),
            sections.subSection(computedPropertyNames, 'Computed property names are now possible but shorthand syntax can\'t be used'),
            sections.subSection(duplicatePropertyNames, 'Duplicate property names are now allowed in strict mode, but with a caveat'),
        ];


        var o, primitiveProperty, objectProperty, methodExternal, _valueGetterSetter, computedPropertyName;
        var initValues = function() {
            o = null;
            primitiveProperty = 'primitive property';
            objectProperty = {
                objectSubProperty: 'object sub property'
            };
            methodExternal = function() {
                return 'external method';
            };
            _valueGetterSetter = 'default getter/setter value';
            computedPropertyName = 'computed property name';
        };

        function es5ObjectLiteral() {
            initValues();
            o = {
                primitiveProperty: primitiveProperty,
                objectProperty: objectProperty,
                objectSubProperty: objectProperty.objectSubProperty,
                methodExternal: methodExternal,
                method: function() {
                    return 'method needs function keyword';
                },
                get valueGetterSetter() {
                    return _valueGetterSetter;
                },
                set valueGetterSetter(value) {
                    _valueGetterSetter = value;
                }
            };
            o[computedPropertyName] = computedPropertyName;

            console.log('object o:', o);
            console.log('o.methodExternal():', o.methodExternal());
            console.log('o.method():', o.method());
            console.log('o.valueGetterSetter:', o.valueGetterSetter);
            o.valueGetterSetter = 'new value';
            console.log('o.valueGetterSetter:', o.valueGetterSetter);
            console.log('o[computedPropertyName]:', o[computedPropertyName]);
        }

        function shorthandPropertyNames() {
            initValues();
            o = {
                primitiveProperty,
                objectProperty,
                objectSubProperty: objectProperty.objectSubProperty,
                methodExternal,
            };

            console.log('object o:', o);
            console.log('o.methodExternal():', o.methodExternal());
        }

        function shorthandMethodNames() {
            initValues();
            o = {
                method() {
                    return 'method function keyword not necessary, similar to getters/setters`';
                },
                get valueGetterSetter() {
                    return _valueGetterSetter;
                },
                set valueGetterSetter(value) {
                    _valueGetterSetter = value;
                }
            };

            console.log('object o:', o);
            console.log('o.method():', o.method());
            console.log('o.valueGetterSetter:', o.valueGetterSetter);
            o.valueGetterSetter = 'new value';
            console.log('o.valueGetterSetter:', o.valueGetterSetter);
        }

        function computedPropertyNames() {
            initValues();
            o = {
                primitiveProperty, [computedPropertyName]: computedPropertyName,
                [computedPropertyName + '_limitation']: computedPropertyName + `'s cannot use shorthand property names`
            };

            console.log('object o:', o);
            console.log('o[computedPropertyName]:', o[computedPropertyName]);
            console.log(`o[computedPropertyName + '_limitation']:`, o[computedPropertyName + `_limitation`]);
        }

        function duplicatePropertyNames() {
            initValues();
            o = {
                primitiveProperty,
                objectProperty,
                primitiveProperty: 'new property value overrides initial value above'
            };

            console.log('object o:', o);
            console.log('o.primitiveProperty:', o.primitiveProperty);

            initValues();
            o = {
                primitiveProperty,
                objectProperty,
                primitiveProperty: 'new property value overrides initial value above',
                ['primitiveProperty']: computedPropertyName + ' value overrides the overridden property value above'
            };

            console.log('object o:', o);
            console.log('o.primitiveProperty:', o.primitiveProperty);
        }
    }
})();