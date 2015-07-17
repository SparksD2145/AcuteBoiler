/**
 * @file Master initialization file for Application. Begins initialization of program.
 * @author Thomas Ibarra <sparksd2145.dev@gmail.com>
 */

/**
 * Global namespace for Application.
 * @namespace
 * @global
 */
var Application = {};

/** Initialization of application */
(function initialize(){

    // Enumerate internal namespaces.
    var namespaces = {
        /**
         * Raw core, non-angular components of the application.
         * @namespace
         */
        Components: {},
        /**
         * Core AngularJS Controllers of the application.
         * @namespace
         */
        Controllers: {},
        /**
         * Core AngularJS Directives of the application.
         * @namespace
         */
        Directives: {},
        /**
         * Pages of the application.
         * @namespace
         */
        States: {},
        /**
         * Core AngularJS Services of the application.
         * @namespace
         */
        Services: {},
        /**
         * Storage for Dependencies
         * @namespace Application.Dependencies
         */
        Dependencies: []
    };

    // Add non-angular dependencies to temporary structure.
    namespaces.Dependencies.push(
        new Dependency('underscore', '_', window._),
        new Dependency('momentJs', 'moment', window.moment)
    );

    // Merge all prior constructs to form finalized object.
    Application = _.extend(
        Application,
        namespaces,
        angular.module('Application', [
            'ngRoute', 'ngSanitize', 'ngAnimate', 'ngResource', 'ngAria', 'ngMaterial', // Core angular libraries.
            'ngStorage', // Third-party angular libraries.
            'underscore', 'momentJs' // Third-party libraries.
        ])
    );

    /**
     * Utilize passed functions as arguments for Application.config() method.
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
Application.config([
    '$locationProvider', '$routeProvider',
    function($locationProvider, $router) {
        $router.when('/', {
            templateUrl: '/home.jade'
        });

        $router.otherwise('/');

        // Use Html5 mode, but use crunch-bang (#!) as routing for non-html5 compliant browsers.
        $locationProvider
            .html5Mode(true)
            .hashPrefix("!");
    }
]);
