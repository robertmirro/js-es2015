(function() {
    'use strict';

    angular
        .module('es2015')
        .directive('subSectionScrollIntoView', subSectionScrollIntoViewDirective);

    function subSectionScrollIntoViewDirective() {
        return {
            restrict: 'A',
            link: function($scope, $element, $attributes) {
                $element.on('transitionend', function(){
                    if ($scope.$eval($attributes.subSectionScrollIntoView)) {  // if subsection is expanded...
                        $element[0].scrollIntoViewIfNeeded(false);
                    }
                });
            }
        };
    }
})();