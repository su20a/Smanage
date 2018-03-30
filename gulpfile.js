var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('copy',function(){
	gulp.src('src/index.html')
	.pipe(gulp.dest('dist'))
});


gulp.task('dist',function(){
	gulp.watch('src/styles/*.less',['style']);
});
//刷新css
gulp.task('style',function(){
	gulp.src('src/styles/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({
	       	  stream:true
	       }))
	;
});

//html去除多余空格
gulp.task('minify',function(){
	       gulp.src('src/*.html')
	       .pipe(htmlmin({collapseWhitespace:true}))
	       .pipe(gulp.dest('dist'))
	       .pipe(browserSync.reload({
	       	  stream:true
	       }));
});
//js合并 压缩混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({
    	stream:true
    }));
});

//复制照片
gulp.task('image',function(){
	gulp.src('src/imgs/*.*')
	  .pipe(gulp.dest('dist/imgs'))
	  .pipe(browserSync.reload({
	  	  stream:true
	  }));
});

gulp.task('serve',function(){
	browserSync.init({
		server:{
			baseDir : 'dist'
		}
	},function(err,bs){
		console.log(bs.options.getIn(['urls','local']));
	});
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/*.html',['minify']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/imgs/*.*',['image']);
});

gulp.task('hello',function(){
	console.log('hello');
});