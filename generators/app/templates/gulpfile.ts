import * as gulp from "gulp";
import * as loadPlugins from 'gulp-load-plugins';

let pck: any = require('./package.json'),
	pl: any = loadPlugins();

var appName = 'bobo';

var tsConfig = pl.typescript.createProject('tsconfig.json');

gulp.task('default', () => {
	pl.livereload.listen({ port: 12345 });
	pl.watch(['app/**/*.ts', '!app/**/*.tests.ts'], { ignorePermissionErrors: true }, buildDev);

	pl.watch('views/**/*.jade', { ignorePermissionErrors: true }, () => {
		pl.livereload.reload();
	});

	pl.watch('app/**/*.jade', { ignorePermissionErrors: true }, () => {
		pl.livereload.reload();
	});

	pl.watch('app/**/*.sass', { ignorePermissionErrors: true }, () => {
		return gulp.src('app/**/*.sass')
			.pipe(pl.sourcemaps.init())
			.pipe(pl.sass())
			.pipe(pl.sourcemaps.write())
			.pipe(gulp.dest('./static/css'))
			.pipe(pl.livereload());
	});
});

gulp.task('build.dev', buildDev);

function buildDev () {
	return gulp.src(['app/**/*.ts', '!app/**/*.tests.ts'])
		.pipe(pl.sourcemaps.init())
		.pipe(pl.typescript(tsConfig))
		.pipe(pl.sourcemaps.write())
		.pipe(gulp.dest('./static/js'))
		.pipe(pl.livereload());
}