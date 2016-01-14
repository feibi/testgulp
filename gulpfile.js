/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
 */

/*
// 引入 gulp及组件
var gulp    = require('gulp'),                 		//基础库
    imagemin = require('gulp-imagemin'),       		//图片压缩
    sass = require('gulp-ruby-sass'),         	    //sass
    autoprefixer = require('gulp-autoprefixer'), 	//预编译
    minifycss = require('gulp-minify-css'),   	    //css压缩
    jshint = require('gulp-jshint'),          	    //js检查
    uglify  = require('gulp-uglify'),         	 	//js压缩
    rename = require('gulp-rename'),           		//重命名
    concat  = require('gulp-concat'),          		//合并文件
    clean = require('gulp-clean'),             		//清空文件夹
    notify = require('gulp-notify'),				//更动通知 
    cache = require('gulp-cache'),					//图片快取，只有更改过得图片会进行压缩
    livereload = require('gulp-livereload'),		//即时重整
    watch=require('gulp-watch'),
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    port = 8081;




    //图片处理
    gulp.task('images',function(){
        return gulp.src("src/images/!**!/!*")
            .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
            .pipe(gulp.dest("dist/images"))
            .pipe(notify({ message: 'Images task complete' }));
    });
    //css样式处理
    gulp.task("css",function(){
        return gulp.src("src/sass/!*.scss")
            .pipe(sass({style:'expanded'}))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest('dist/styles'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifycss())
            .pipe(gulp.dest('dist/styles'))
            .pipe(notify({ message: 'Styles task complete' }));
    });
    //js处理
    gulp.task('scripts',function(){
        return gulp.src('src/js/!**!/!*.js')
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat('main.js'))
            .pipe(gulp.dest('dist/scripts'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('dist/scripts'))
            .pipe(notify({ message: 'Scripts task complete' }));
    });
    // HTML处理
    gulp.task('html', function() {
/!*        var htmlSrc = './src/!*.html',
            htmlDst = './dist/';*!/

        gulp.src('src/!*.html')
            .pipe(gulp.dest('dist/'))
    });

    // 清空图片、样式、js
    gulp.task('clean', function() {
        gulp.src(['./dist/styles', './dist/scripts', './dist/images'], {read: false})
            .pipe(clean());
    });

    // 默认任务 清空图片、样式、js并重建 运行语句 gulp
    gulp.task('default', ['clean'], function(){
        gulp.start('html','css','images','scripts');
    });

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){

    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }

        // 监听html
        gulp.watch('./src/!*.html', function(event){
            gulp.run('html');
        });

        // 监听css
        gulp.watch('./src/sass/!*.scss', function(){
            gulp.run('styles');
        });

        // 监听images
        gulp.watch('./src/images/!**!/!*', function(){
            gulp.run('images');
        });

        // 监听js
        gulp.watch('./src/js/!*.js', function(){
            gulp.run('scripts');
        });

    });
});
*/
/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp    = require('gulp'),                 		//基础库
    imagemin = require('gulp-imagemin'),       		//图片压缩
    sass = require('gulp-ruby-sass'),         	    //sass
    autoprefixer = require('gulp-autoprefixer'), 	//预编译
    minifycss = require('gulp-minify-css'),   	    //css压缩
    jshint = require('gulp-jshint'),          	    //js检查
    uglify  = require('gulp-uglify'),         	 	//js压缩
    rename = require('gulp-rename'),           		//重命名
    concat  = require('gulp-concat'),          		//合并文件
    clean = require('gulp-clean'),             		//清空文件夹
    notify = require('gulp-notify'),				//更动通知
    cache = require('gulp-cache'),					//图片快取，只有更改过得图片会进行压缩
    livereload = require('gulp-livereload'),		//即时重整
    watch=require('gulp-watch'),
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    port = 8081;

// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst))
});

// 样式处理
gulp.task('css', function () {
    return sass('src/sass/*.scss',{ style: 'compressed' })
        .pipe(gulp.dest('src/styles/'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('src/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
    //编码风格 normal, compressed(压缩)
});

// 图片处理
gulp.task('images', function(){
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(livereload(server))
        .pipe(gulp.dest(imgDst));
});

// js处理
gulp.task('js', function () {
    var jsSrc = './src/js/*.js',
        jsDst ='./dist/js';

    gulp.src(jsSrc)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest(jsDst));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/styles', './dist/js', './dist/images'], {read: false})
        .pipe(clean({force: true}));
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('html','css','images','js');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){


    // 监听html
    gulp.watch('src/*.html',  ['html']);
    // 监听.scss档
    gulp.watch('src/sass/**/*.scss', ['css']);

    // 监听.js档
    gulp.watch('src/js/**/*.js', ['js']);

    // 监听图片档
    gulp.watch('src/images/', ['images']);

    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);


});
