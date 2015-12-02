import * as gulp from 'gulp';
import * as loadPlugins from 'gulp-load-plugins';

let pck: any = require('./package.json'),
	karma: any = require('karma'),
	pl: any = loadPlugins();

var appName = '{APPNAME}';

var tsConfig = pl.typescript.createProject('tsconfig.json');

gulp.task('default', () => {
	pl.livereload.listen({ port: 12345 });
	pl.watch(
		['app/**/*.ts', '!app/**/*.tests.ts'],
		{ ignorePermissionErrors: true },
		buildDev
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

gulp.task('test', () => {
	var scripts = [
		// Vendors
		'node_modules/systemjs/dist/system.js',
    	'node_modules/angular2/bundles/angular2.dev.js',
    	'node_modules/angular2/bundles/router.js',
    	'node_modules/angular2/bundles/http.js',
    	'karma-shims.js',

		// App
		`static/js/**/*.js`,

		// Test files
		'app/**/*.tests.ts'
	]

	gulp.src(scripts)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'watch'
		}))
});


gulp.task('build.js', buildDev);
gulp.task('build.sass', buildSass);
gulp.task('build.dev', ['build.js', 'build.sass']);

function buildDev() {
	return gulp.src(['app/**/*.ts', '!app/**/*.tests.ts'])
		.pipe(pl.sourcemaps.init())
		.pipe(pl.typescript(tsConfig))
		.pipe(pl.sourcemaps.write())
		.pipe(gulp.dest('./static/js'))
		.pipe(pl.livereload());
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