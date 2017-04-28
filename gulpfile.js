'use strict';
// Dependencies
process.title = "idyllic_gulp"; // Do Not Delete this line
var gulp         = require('gulp'),
	nodemon      = require('gulp-nodemon'),
	notify       = require('gulp-notify'),
	livereload   = require('gulp-livereload'),
	changed      = require('gulp-changed'),
	del          = require('del'),
	gutil        = require('gulp-util'),
    concat       = require('gulp-concat'),
	plumber      = require('gulp-plumber'),
	imagemin     = require('gulp-imagemin'),
    cleanCSS     = require('gulp-clean-css'),
	htmlmin      = require('gulp-htmlmin'),
	rev          = require('gulp-rev'),
    jshint       = require('gulp-jshint'),
    imagemin     = require('gulp-imagemin'),
    revCollector = require('gulp-rev-collector'),
    uglify       = require('gulp-uglify'),
	sass         = require('gulp-sass');


var paths = {
	fontsSrc: 'src/fonts/',
	jsonSrc: 'src/json/',
    htmlSrc:  'src/views/',
    sassSrc:  'src/sass/',
    jsSrc:    'src/js/',
    imgSrc:   'src/images/',

    buildDir: 'build/',
    revDir:   'build/rev/',
    distDir:  'dist/'
};

var onError = function (err) {
    gutil.beep();
    gutil.log(gutil.colors.green(err));
},
    nodemonServerInit = function(){
        livereload.listen();
        nodemon({
            script: 'app.js',
            ext: 'js'
        }).on('restart', function(){
            gulp.src('app.js')
                .pipe(livereload())
                .pipe(notify('Reloading page, please wait...'));
        })
};

if(process.env.NODE_ENV === 'prod'){
	gulp.task('default', ['dist']);
}else {
	gulp.task('default', ['build', 'watch']);
}

gulp.task('clean', function(cb) {
    del([paths.buildDir, paths.distDir], cb);
});

gulp.task('build', ['build-html', 'build-css', 'build-js', 'build-images', 'build-favicon', 'build-fonts', 'build-json', 'build-xml'], function (cb) {
    nodemonServerInit();
});

gulp.task('dist', ['dist-html', 'dist-js', 'dist-css', 'dist-images', 'dist-favicon', 'dist-fonts', 'dist-json', 'dist-xml'], function (cb) {
    nodemonServerInit();
});

/*
HTML Tasks
*/
gulp.task('build-html', function() {
    return gulp.src(paths.htmlSrc + '**/*.html')
        .pipe(gulp.dest(paths.buildDir + 'views/'))
        .pipe(livereload());
});

gulp.task('dist-html', ['build-html', 'dist-js', 'dist-css', 'dist-images'], function() {
    return gulp.src([
            paths.revDir + "**/*.json",
            paths.buildDir + 'views/' + "**/*.html"
        ])
        .pipe(revCollector())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.distDir + 'views'));
});

/*
	CSS tasks
*/
gulp.task('build-css', ['sass']);

gulp.task('sass', function () {
    return gulp.src(paths.sassSrc + '**/*.scss')
        .pipe(sass({
            includePaths: require('node-neat').includePaths,
            style: 'nested',
            onError: function(){
            	console.log("Error in scss");
            }
        }))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(gulp.dest(paths.buildDir + 'css/'))
        .pipe(livereload());
});

gulp.task('dist-css', ['build-css', 'dist-images'], function() {
    return gulp.src([
            paths.buildDir + 'css/*',
            paths.revDir + "images/*.json"
        ])
        .pipe(revCollector())
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest(paths.distDir + 'css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(paths.revDir + 'css'));
});

gulp.task('build-fonts', [], function() {
     return gulp.src(paths.fontsSrc + '**/*.*')
        .pipe(gulp.dest(paths.buildDir + 'fonts/'))
        .pipe(livereload());
});

gulp.task('dist-fonts', ['build-fonts'], function() {
  return gulp.src('build/fonts/' + '**/*.*')
  .pipe(gulp.dest(paths.distDir + "/fonts/"));
});

gulp.task('build-xml', [], function() {
    return gulp.src('src/' + '**/*.xml')
        .pipe(gulp.dest(paths.buildDir))
        .pipe(livereload());
});

gulp.task('dist-xml', ['build-xml'], function() {
    return gulp.src('build/' + '**/*.xml')
        .pipe(gulp.dest(paths.distDir));
});

/*
JS Tasks
*/
gulp.task('build-js', ['js', 'js-plugins']);

gulp.task('js', function() {
    return gulp.src(paths.jsSrc + '*.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(changed(paths.buildDir + 'js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(paths.buildDir + 'js'))
        .pipe(livereload());
});

gulp.task('js-plugins', [], function() {
    return gulp.src([
            'src/lib/*.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.buildDir + 'js/'))
        .pipe(livereload());
});

gulp.task('dist-js', ['build-js'], function() {
    return gulp.src(paths.buildDir + 'js/*')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(paths.distDir + 'js'))

        .pipe(rev.manifest())
        .pipe(gulp.dest(paths.revDir + 'js'));
});

gulp.task('build-json', [], function() {
     return gulp.src(paths.jsonSrc + '*.json')
        .pipe(gulp.dest(paths.buildDir + 'json/'))
        .pipe(livereload());
});

gulp.task('dist-json', ['build-json', 'dist-images'], function() {
  return gulp.src([
          paths.buildDir + 'json/*',
          paths.revDir + "images/*.json"
      ])
      .pipe(revCollector())
  .pipe(gulp.dest(paths.distDir + "/json/"));
});

/*
Image Tasks
*/
gulp.task('build-images', function() {
    return gulp.src(paths.imgSrc + '**/*.+(png|jpeg|jpg|gif|svg|eps)')
        .pipe(changed(paths.buildDir + 'images'))
        .pipe(gulp.dest(paths.buildDir + 'images'))
        .pipe(livereload());
});

gulp.task('dist-images', ['build-images'], function() {
    return gulp.src(paths.buildDir + 'images/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(rev())
        .pipe(gulp.dest(paths.distDir + 'images'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(paths.revDir + 'images'));
});

gulp.task('build-favicon', function() {
    return gulp.src('src/favicon.ico')
        .pipe(changed(paths.buildDir))
        .pipe(gulp.dest(paths.buildDir))
        .pipe(livereload());
});

gulp.task('dist-favicon', ['build-favicon'], function() {
    return gulp.src(paths.buildDir + 'favicon.ico')
        .pipe(changed(paths.distDir))
        .pipe(gulp.dest(paths.distDir));
});

gulp.task('watch', function () {
	gulp.watch(['src/views/**/*.html'], ['build-html']);
    gulp.watch('src/sass/**', ['sass']);
    gulp.watch('src/json/**', ['build-json']);
    gulp.watch(paths.jsSrc + '**/*.js', ['js']);
    gulp.watch('src/lib/**' + '**/*.js', ['js-plugins']);
    gulp.watch(paths.imgSrc + '**/*.+(png|jpeg|jpg|gif|svg)', ['build-images']);
});


