__karma__.loaded = function () {};

System.config({
  baseURL: '/base/',
  defaultJSExtensions: true,
  paths: {
    'angular2/*': 'node_modules/angular2/*.js',
    '@reactivex/rxjs/*': 'node_modules/@reactivex/rxjs/*.js'
  }
});

function onlyTestFiles (path) {
  return path.indexOf('.tests.') > -1;
}

function karmaFileToModule (fileName) {
  return fileName
    .replace(/^\/base\//, '')
    .replace('.js', '');
}

function importAllTests(moduleName) {
  return System.import(moduleName)
  .then(function (module) {
    if (module.hasOwnProperty('main')) {
      module.main();
    } else {
      throw new Error('Module ' + moduleName + ' does not implement main() method.');
    }
  });
}

System.import('angular2/src/core/dom/browser_adapter').then(function (browser_adapter) {
  browser_adapter.BrowserDomAdapter.makeCurrent();
}).then(function () {
  return Promise.all(
    Object.keys(window.__karma__.files)
      .filter(onlyTestFiles)
      .map(karmaFileToModule)
      .map(importAllTests))
}).then(
  function () { window.__karma__.start(); },
  function (error) { 
    console.error(error.stack || error);
    window.__karma__.start();
  })