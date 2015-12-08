// Karma configuration
// Generated on Tue Sep 08 2015 11:41:30 GMT+0100 (GMT Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    files: [
        { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false },
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/traceur/bin/traceur-runtime.js', 
        'node_modules/traceur/bin/traceur.js',
        'node_modules/systemjs/dist/system.js',
        { pattern: 'node_modules/angular2/**/*.js', included: false, watched: false },
        { pattern: 'node_modules/@reactivex/rxjs/dist/**/*.js', included: false, watched: false },
        { pattern: 'app/**/*.jade', included: false, serve: true },
        { pattern: 'static/js/**/*.js', included: false, serve: true },
        'karma-shims.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'clear-screen'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS2'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
