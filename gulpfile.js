// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require("gulp-minify-css");
var autoprefixer = require("gulp-autoprefixer");
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// watch files for changes and reload
gulp.task('serve', function () {
    browserSync({
        port: 3000,
        server: {
            baseDir: './',
        }
    });
    gulp.watch(['*.html', 'dist/css/**/*.css', 'dist/js/**/*.js'], {cwd: './'}, reload);
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src('js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
            .pipe(sass())
            .pipe(concat('global.css'))
            .pipe(gulp.dest('dist'))
            .pipe(minifyCSS())
            .pipe(rename('global.min.css'))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
            .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src('js/*.js')
            .pipe(concat('all.js'))
            .pipe(gulp.dest('dist'))
            .pipe(rename('all.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'));
});

gulp.task('imageminification', () =>
    gulp.src('images/**/**')
            .pipe(imagemin({
                optimizationLevel: 5,
                progessive: true,
                interlaced: true
            }))
            .pipe(gulp.dest('dist/images'))
);

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('images/*', ['imageminification']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'imageminification', 'watch']);