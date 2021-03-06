const gulp = require("gulp");
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require("watchify");
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require("gulp-util");
const buffer = require('vinyl-buffer');

const watchedBrowserify = watchify(browserify({
	basedir: '.',
	debug: true,
	entries: ['src/index.ts'],
	cache: {},
	packageCache: {}
})
	.plugin(tsify)
	.transform('babelify', {
		presets: ['es2015'],
		extensions: ['.ts']
	})
	// .bundle()
	// .pipe(source('bundle.js'))
	// .pipe(buffer())
	// .pipe(sourcemaps.init({ loadMaps: true }))
	// .pipe(uglify())
	// .pipe(sourcemaps.write('./'))
	// .pipe(gulp.dest('dist'))
);

function bundle() {
	return watchedBrowserify
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest("dist"));
}

gulp.task("default", bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
