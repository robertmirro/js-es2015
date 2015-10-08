(function() {
    'use strict';

    angular
        .module('es2015')
        .component('subSectionsList', {
            templateUrl: 'subSectionsList.html',
            controller: subSectionsListController,
            bindings: {
                subSections: '='
            }
        });

    function subSectionsListController($state, sections) {
        this.section = sections.getSection($state);
        this.invokeFn = sections.invokeFn;
        this.invokeOptions = sections.invokeOptions;

        (this.subSections || []).forEach(function(subSection) {
            this[subSection.fn.name] = subSection.fnFormatted = sections.formatJsSource(subSection.fn.toString()); // set value on $scope.vm so hljs.source can be used
        }.bind(this));
    }
})();