(function() {
    'use strict';

    angular
        .module('es2015')
        .component('sectionLink', {
            template: '<a href="{{$ctrl.link.url}}" target="_blank"><span class="glyphicon glyphicon-link pull-left"></span> {{$ctrl.link.text}} <span class="linkMapText" ng-if="$ctrl.link.mapText">{{$ctrl.link.mapText}}</span></a>',
            controller: sectionLinkController,
            bindings: {
                linkText: '@',
                linkUrl: '@',
                linkMap: '=?'
            }
        });

    function sectionLinkController() {
        this.linkMap = this.linkMap || {};
        this.link = {
            text: this.linkText,
            url: (this.linkMap.linkUrl ? this.linkMap.linkUrl : '') + this.linkUrl,
            mapText: this.linkMap.linkText ? ' (' + this.linkMap.linkText + ')' : ''
        };
    }
})();