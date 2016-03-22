(function() {
    'use strict';

    angular
        .module('es2015', [
            'ui.router',
            'ui.bootstrap',
            'ngAnimate',
            'ngSanitize',
            'hljs'
        ])
        .constant('sectionDescriptor', 'section')
        .config(appConfig)
        .controller('appController', appController)
        .filter('encodeURIComponent', encodeURIComponentFilter);

    function appConfig($urlRouterProvider, $stateProvider, sectionDescriptor, sectionsProvider, hljsServiceProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state({
                name: 'home',
                url: '/',
                templateUrl: 'home.html'
            })
            .state({
                name: 'links',
                url: '/links',
                templateUrl: 'links.html'
            })
            .state({
                name: sectionDescriptor,
                url: '/' + sectionDescriptor,
                template: '<ui-view></ui-view>',
                abstract: true
            });

        sectionsProvider
            .buildSectionsList()
            .forEach(function(section) {
                if (section.isEnabled) {
                    $stateProvider.state({
                        parent: sectionDescriptor,
                        name: section.name,
                        url: section.url,
                        template: section.template,
                        controller: section.controller,
                        controllerAs: section.controllerAs
                    });
                }
            });

        hljsServiceProvider.setOptions({
            tabReplace: '    '
        });
    }

    function appController(sections) {
        this.sectionsList = sections.list;
    }

    function encodeURIComponentFilter($window) {
        return $window.encodeURIComponent;
    }
})();