var gulp = require('gulp')
, minifyHtml = require("gulp-minify-html")
, uglify = require("gulp-uglify")
, minifyCss = require("gulp-minify-css")
, concat = require("gulp-concat")
, gulpUtil = require('gulp-util')
, clean = require('gulp-clean')
, compressor = require('gulp-yuicompressor')
, templateCache = require('gulp-angular-templatecache')
, ngAnnotate = require('gulp-ng-annotate')
, replace = require('gulp-replace')
, preprocess = require('gulp-preprocess');


gulp.task('build', ['angular-cache'], function () {

    // minify-html
    gulp.src('./index.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('../release/'));

    gulp.src('./views/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('../release/views/'));

    // gulp.src('./template/*.html')
    // .pipe(minifyHtml())
    // .pipe(gulp.dest('../release/template/'));

    //concat all css files and minify
    gulp.src(["./css/app.min.1.css","./css/app.min.2.css","./css/demo.css"])
    .pipe(concat('min.css'))
    .pipe(gulp.dest('../release/'))
    .pipe(minifyCss().on('error', gulpUtil.log))
    .pipe(gulp.dest('../release/'));

    //concat all javascript files and minify
    gulp.src(["js/app.js","js/config.js","js/controllers/main.js","js/services.js","js/templates.js","js/controllers/ui-bootstrap.js","js/controllers/table.js","js/modules/template.js","js/modules/ui.js","js/modules/charts/flot.js","js/modules/charts/other-charts.js","js/modules/form.js","js/modules/media.js","js/modules/components.js","js/modules/calendar.js","js/modules/demo.js"])
    .pipe(concat('min.js'))
    .pipe(gulp.dest('../release/'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('../release/'))
    .pipe(uglify({hoist_funs:false}).on('error', gulpUtil.log))
    .pipe(gulp.dest('../release/'));

    //Copy all required assets
    gulp.src('./data/**/*').pipe(gulp.dest('../release/data/'));
    gulp.src('./fonts/**/*').pipe(gulp.dest('../release/fonts/'));
    gulp.src('./img/**/*').pipe(gulp.dest('../release/img/'));
    gulp.src('./media/**/*').pipe(gulp.dest('../release/media/'));

    gulp.src([""],{base:'.'}).pipe(gulp.dest('../release/'));
});

gulp.task('build-assets',function(){
    gulp.src('./data/**/*').pipe(gulp.dest('../release/data/'));
    gulp.src('./fonts/**/*').pipe(gulp.dest('../release/fonts/'));
    gulp.src('./img/**/*').pipe(gulp.dest('../release/img/'));
    gulp.src('./media/**/*').pipe(gulp.dest('../release/media/'));
    // gulp.src('./vendors/**/*').pipe(gulp.dest('../release/vendors/'));

    gulp.src([""],{base:'.'}).pipe(gulp.dest('../release/'));
})

gulp.task('clean',function(){
    //Clean Directory
    gulp.src('../release/**/*')
    .pipe(clean({force:true}));
})

gulp.task('build-html',function(){
    gulp.src('./index.html') // path to your files
    .pipe(minifyHtml())
    .pipe(gulp.dest('../release/'));

    gulp.src('./views/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('../release/views/'));
})

gulp.task('build-js',['angular-cache'],function(){
    //concat all javascript files and minify
    // gulp.src(['./**/*.js','!./node_modules/**', '!./vendors/bower_components/**/src/**'])
    gulp.src(["js/app.js","js/config.js","js/controllers/main.js","js/services.js","js/templates.js","js/controllers/ui-bootstrap.js","js/controllers/table.js","js/modules/template.js","js/modules/ui.js","js/modules/charts/flot.js","js/modules/charts/other-charts.js","js/modules/form.js","js/modules/media.js","js/modules/components.js","js/modules/calendar.js","js/modules/demo.js"])
    .pipe(concat('min.js'))
    .pipe(gulp.dest('../release/'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('../release/'))
    .pipe(uglify({hoist_funs:false}).on('error', gulpUtil.log))
    .pipe(gulp.dest('../release/'));
})

gulp.task('build-css',function(){
    //concat all css files and minify
    gulp.src(["./css/app.min.1.css","./css/app.min.2.css","./css/demo.css"])
    .pipe(concat('min.css'))
    .pipe(gulp.dest('../release/'))
    .pipe(minifyCss().on('error', gulpUtil.log))
    .pipe(gulp.dest('../release/'));
})

gulp.task('angular-cache',function(){
    //Cache Angular templates
    gulp.src('./template/**/*.html')
    .pipe(templateCache())
    .pipe(replace('angular.module("templates")','angular.module("materialAdmin")'))
    .pipe(replace('$templateCache.put("','$templateCache.put("template/'))
    .pipe(gulp.dest('./js/'));
})



