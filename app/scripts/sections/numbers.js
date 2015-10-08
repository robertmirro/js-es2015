(function() {
    'use strict';

    angular
        .module('es2015')
        .controller('es6Numbers', es6Numbers);

    function es6Numbers(sections) {

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