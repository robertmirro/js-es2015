(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6Strings', es6Strings);

    function es6Strings(sections) {

        this.subSections = [
            sections.subSection(subSectionOne, 'subSectionOne title'),
            sections.subSection(subSectionTwo, 'subSectionTwo title')
        ];

        function subSectionOne() {

        }

        function subSectionTwo() {

        }
    }
})();