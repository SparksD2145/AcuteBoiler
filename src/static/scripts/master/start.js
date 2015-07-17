/**
 * @file Master initialization file for AcuteBoiler. Begins initialization of program.
 * @author Thomas Ibarra <sparksd2145.dev@gmail.com>
 */

/**
 * Global namespace for AcuteBoiler.
 * @namespace
 * @global
 */
var AcuteBoiler = {};

/** Initialization of AcuteBoiler */
(function initialize(){

    // Enumerate internal namespaces.
    var namespaces = {
        /**
         * Raw core, non-angular components of the AcuteBoiler.
         * @namespace
         */
        Components: {},
        /**
         * Core AngularJS Controllers of the AcuteBoiler.
         * @namespace
         */
        Controllers: {},
        /**
         * Core AngularJS Directives of the AcuteBoiler.
         * @namespace
         */
        Directives: {},
        /**
         * Pages of the AcuteBoiler.
         * @namespace
         */
        States: {},
        /**
         * Core AngularJS Services of the AcuteBoiler.
         * @namespace
         */
        Services: {},
        /**
         * Storage for Dependencies
         * @namespace AcuteBoiler.Dependencies
         */
        Dependencies: []
    };

    // Add non-angular dependencies to temporary structure.
    namespaces.Dependencies.push(
        new Dependency('underscore', '_', window._),
        new Dependency('momentJs', 'moment', window.moment)
    );

    // Merge all prior constructs to form finalized object.
    AcuteBoiler = _.extend(
        AcuteBoiler,
        namespaces,
        angular.module('AcuteBoiler', [
            'ngRoute', 'ngSanitize', 'ngAnimate', 'ngResource', 'ngAria', 'ngMaterial', // Core angular libraries.
            'ngStorage', // Third-party angular libraries.
            'underscore', 'momentJs' // Third-party libraries.
        ])
    );

    /**
     * Utilize passed functions as arguments for AcuteBoiler.config() method.
     * @type {Array}
     */
})();

/**
 * Dependency class
 * @class
 * @param name
 * @param ref
 * @param obj
 * @constructor
 */
function Dependency(name, ref, obj){
    if(!name || !ref || !obj) throw new Error('Could not create Dependency: required parameter missing.');
    if(name && typeof name != "string") throw new Error('Could not create Dependency: invalid name specified.');
    if(ref && typeof ref != "string") throw new Error('Could not create Dependency: invalid reference specified.');

    this.name = name;
    this.reference = ref;
    this['calls'] = obj;

    var internalObj = angular.module(name, []);
    internalObj.factory(ref, function(){
        return obj;
    });
}

/**
 * Application-wide configuration for routing based functionality.
 */
AcuteBoiler.config([
    '$locationProvider', '$routeProvider',
    function($locationProvider, $router) {

        $router.when('/', {
            templateUrl: '/partials/home.html'
        });

        //$router.otherwise('/');

        // Use Html5 mode, but use crunch-bang (#!) as routing for non-html5 compliant browsers.
        $locationProvider
            .html5Mode(true)
            .hashPrefix("!");
    }
]);
