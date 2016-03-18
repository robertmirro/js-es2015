(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6TemplateLiterals', es6TemplateLiterals);

    function es6TemplateLiterals(sections) {
        this.subSections = [
            sections.subSection(es5Strings, 'ES5: String quoting, concatenation and multi-line support'),
            sections.subSection(quoting, 'Single (<code>\'</code>) and double (<code>"</code>) quotes are no longer problematic because back-ticks (<code>`</code>) are used'),
            sections.subSection(interpolation, 'Interpolation replaces concatenation when values are accessible via variables/expressions'),
            sections.subSection(multiLine, 'Multi-line strings can now be used without the need for concatenation or <code>Array.join</code>'),
            sections.subSection(tagged, 'Tagged template literals allow a function to process the final output')
        ];

        function es5Strings() {
            var singleQuoted, doubleQuoted, concatenation, multiLine, multiLineBug;

            singleQuoted = "'single quoted'";
            doubleQuoted = '"double quoted"';
            concatenation = 'is the primary';
            multiLine = 'Multi-line strings need to embed new line characters \n' +
                'and use concatenation to produce separate lines.';
            multiLineBug = 'There is a bug in JS that allows multi-line \
                if a backslash is included before each new line character \
                but the new line characters are not included in the output so this is all one line.';

            console.log('Quoted \'strings\' need to escape the outer quote when it is included as literal \"text\" inside the string');
            console.log('Outer quote escaping is unnecessary when concatenating with variables such as ' + singleQuoted + ' and ' + doubleQuoted);
            console.log('Concatenation ' + concatenation + ' method to build ' + typeof '' + ' values');
            console.log(['However,', 'Array.join', 'can', 'also', 'be', 'used'].join(' '));
            console.log(multiLine);
            console.log(multiLineBug.replace(/  /g, ''));
            console.log(['Array.join can also', 'be used to produce', 'multi-line output.'].join('\n'));
        }

        function quoting() {
            let templateLiteralType = typeof ``;

            console.log(`Template literal strings are treated as regular strings... I'm just a ` + templateLiteralType + `, I promise`);
            console.log(`'Single' and "double" quotes may be included in literal text without having to be concerned with escaping`);
        }

        function interpolation() {
            let greeting, name, title, companyName;

            greeting = `Hello`;
            name = {
                last: `Janus`,
                first: `Hugh`
            };
            title = (level) => `${level} Software Engineer`;

            console.log(`${greeting}, I'm ${name.first} ${name.last} and I've been a ${title('Sr.')} at ${companyName || 'Evolent Health'.toUpperCase()} for ${4 + 3.5} months.`);
        }

        function multiLine() {
            let multiLine, multiLineFormatted;

            multiLine = `Template literals make multi-line output easy to do
                by allowing strings to span multiple lines while also including new line characters in the output, but...
                indentation could ruin everything that is nice in this world.
                `;
            multiLineFormatted = `Formatting could help with the indention issue... See:
                ${multiLine}`;

            console.log(multiLine);
            console.log(multiLineFormatted.replace(/  /g, ''));
        }

        function tagged() {
            let value, taggedProcessed, taggedHardcoded;

            value = {
                name: `Tagged template literals`,
                one: `value 1`,
                2: `value two`
            };
            taggedProcessed = (strings, ...values) => {
                let value = (index) => index + 1 > values.length ? '' : values[index].toUpperCase();

                console.log('taggedProcessed strings:', strings);
                console.log('taggedProcessed values:', values);

                return strings.reduce((tagOutput, string, index) => {
                    return `${tagOutput}${string}${value(index)}`;
                }, '');
            };
            taggedHardcoded = (strings, ...values) => 'A tagged template literal can completely ignore the stings/values that are passed and return whatever it wants';

            console.log(taggedProcessed `${value.name} allow functions to process strings and values such as ${value.one} and ${value[2]}`);
            console.log(taggedHardcoded `${value.name} allow functions to process strings and values such as ${value.one} and ${value[2]}`);
        }
    }
})();