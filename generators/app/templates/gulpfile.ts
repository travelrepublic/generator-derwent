import * as gulp from 'gulp';
import * as loadPlugins from 'gulp-load-plugins';

let pck: any = require('./package.json'),
	karma: any = require('karma').Server,
	pl: any = loadPlugins();

var appName = '{APPNAME}';


var tsConfig = pl.typescript.createProject('tsconfig.json');

gulp.task('default', () => {
	pl.livereload.listen({ port: 12345 });
	pl.watch(
		['app/**/*.ts', '!app/**/*.tests.ts'],
		{ ignorePermissionErrors: true },
		buildJs
	);

	pl.watch(
		['app/**/*.tests.ts', '!app/**/ *.ts'],
		{ ignorePermissionErrors: true },
		buildTests
	);

	pl.watch(
		'static/views/*.jade',
		{ ignorePermissionErrors: true },
		() => pl.livereload.reload()
	);

	pl.watch(
		'app/**/*.jade',
		{ ignorePermissionErrors: true },
		() => pl.livereload.reload()
	);

	pl.watch(
		'app/**/*.scss',
		{ ignorePermissionErrors: true },
		buildSass
	);
});

gulp.task('test', done => {
	new karma({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('build.js', buildJs);
gulp.task('build.sass', buildSass);
gulp.task('build.tests', buildTests);
gulp.task('build.dev', ['build.js', 'build.sass', 'build.tests']);

function buildJs() {
	return gulp.src(['app/**/*.ts', '!app/**/*.tests.ts'])
		.pipe(pl.sourcemaps.init())
		.pipe(pl.inlineNg2Template({ base: '/app', jade: true }))
		.pipe(pl.typescript(tsConfig))
		.pipe(pl.sourcemaps.write())
		.pipe(gulp.dest('./static/js'))
		.pipe(pl.livereload());
}

function buildTests() {
	return gulp.src(['app/**/*.tests.ts', '!app/**/ *.ts'])
		.pipe(pl.sourcemaps.init())
		.pipe(pl.typescript(tsConfig))
		.pipe(pl.sourcemaps.write())
		.pipe(gulp.dest('./static/js'))
		.on('end', () => console.log('Tests built'));
}

function buildSass() {
	return gulp.src('app/**/*.scss')
		.pipe(pl.sourcemaps.init())
		.pipe(pl.sass())
		.pipe(pl.concat(`${appName}.css`))
		.pipe(pl.sourcemaps.write())
		.pipe(gulp.dest('./static/css'))
		.pipe(pl.livereload());
}