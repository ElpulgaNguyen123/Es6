var gulp = require('gulp');
const { series, task } = require('gulp');
var sass = require('gulp-sass');
var { watch } = require('gulp');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel')

function style() {
    return gulp.src(['./src/css/*.scss',])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream())
}

function js() {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/owl.carousel/dist/owl.carousel.min.js',
        './bower_components/animate-js/animate.js',
        './src/js/*.js'])
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream()) // tự động refresh lại trang
}

function complierEs6() { 
    return gulp.src(['./src/js/es6/*.js']).pipe(babel())
    .pipe(gulp.dest('./build/js/dest'));
 }

task('build', function (cb) {
    console.log('Loha')
});


function watchSystem() {
    browserSync.init({
        server: {
            baseDir: ["./build", "./src"]
        }
    });
    watch('./src/css/**/*.scss', style).on('change', browserSync.reload);
    watch('./build/*.html').on('change', browserSync.reload)
    watch('./src/js/**/*.js').on('change', browserSync.reload)
}
//exports.build = series('build');
exports.build = series(style, js, complierEs6, watchSystem);
