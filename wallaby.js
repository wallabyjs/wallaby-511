var wallabify = require('wallabify');
var _ = require('lodash');
var ngHtml2Js = require('browserify-ng-html2js');

var wallabyPostprocessor = wallabify({
    entryPatterns: [
      'tests/client/**/*.js'
    ],
    postFilter: function(id, file, pkg) {
      if (pkg && pkg.browserify && pkg.browserify.transform) {
        _.pull(pkg.browserify.transform, 'coffeeify');
      }
      return true;
    }
  },
  function(b) {
    b.transform(ngHtml2Js, {ext: '.html', global: true});
  }
);

module.exports = function() {
  return {
    files: [
      {pattern: 'node_modules/@points/pts-fixtures/storefront/**/*.json', load: false, instrumented: false},
      {pattern: 'node_modules/@points/**/*.coffee', load: false, instrumented: false},
      {pattern: 'node_modules/@points/**/*.html', load: false, instrumented: false},
      {pattern: 'src/scripts/**/*.coffee', load: false},
      {pattern: 'src/scripts/**/*.js', load: false, instrumented: false},
      {pattern: 'src/scripts/**/*.html', load: false},
      {pattern: 'tests/selectors/**/*.coffee', load: false},
      {pattern: 'tests/defaultFormValues.coffee', load: false},
      {pattern: 'tests/generators.coffee', load: false}
    ],
    tests: [
      {pattern: 'tests/client/**/*.coffee', load: false}
    ],
    testFramework: 'mocha',
    postprocessor: wallabyPostprocessor,
    bootstrap: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
