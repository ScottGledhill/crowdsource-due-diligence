// Karma configuration
// Generated on Thu Mar 03 2016 16:48:41 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      "./app/bower_components/angular/angular.js",
      "./app/bower_components/angular-sanitize/angular-sanitize.js",
      "./app/bower_components/angular-mocks/angular-mocks.js",
      './app/bower_components/angular-resource/angular-resource.js',
      './app/bower_components/angular-route/angular-route.js',
      './app/bower_components/angular-local-storage/dist/angular-local-storage.js',
      './app/bower_components/jquery/dist/jquery.js',
      './app/bower_components/Chart.js/Chart.min.js',
      './app/bower_components/angular-chart.js/dist/angular-chart.min.js',
      './app/bower_components/angular-animate/angular-animate.js',
      'http://cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.9.0/loading-bar.min.js',
      './app/js/**/*.js',
      'spec/unit/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
       './app/js/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'lcov',
      dir : 'spec/unit/coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
