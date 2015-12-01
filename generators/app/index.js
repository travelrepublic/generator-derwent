'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var appname;

function setAppName (content) {
  return content.toString().replace(/{APPNAME}/g, appname);
}

module.exports = yeoman.generators.Base.extend({
  
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      '"Have you hugged your pug today?" -Marty Moose'
    ));

    this.prompt({
      type: 'input',
      message: 'What is the block name?',
      name: 'app',
      default: 'bobo'
    }, function (answer) {
      appname = answer.app;
      done();
    }.bind(this));
  },

  writing: function () {
    this.directory('app','app');
    this.directory('static', 'static');
    this.directory('routes', 'routes');
    this.directory('bin', 'bin');
    this.directory('typings', 'typings');
    this.directory('c_typings', 'c_typings');
    
    this.copy('config.dev.js', 'config.dev.js');
    this.copy('config.pp.js', 'config.pp.js');
    this.copy('config.prod.js', 'config.prod.js');

    this.copy('karma.conf.js', 'karma.conf.js');
    this.copy('tsconfig.json', 'tsconfig.json');
    this.copy('tsd.json', 'tsd.json');

    this.copy('app.ts', 'app.ts');
    
    this.fs.copy(
      this.templatePath('gulpfile.ts'),
      this.destinationPath('gulpfile.ts'), 
      { process: setAppName });

    this.fs.copy(
      this.templatePath('package.json'), 
      this.destinationPath('package.json'), 
      { process: setAppName });

    this.fs.copy(
      this.templatePath('layout.jade'), 
      this.destinationPath('static/views/layout.jade'), 
      { process: setAppName }
    )

  },

  install: function () {
    this.npmInstall(undefined, undefined, () => this.spawnCommand('gulp', ['build.dev']));
  }
});
