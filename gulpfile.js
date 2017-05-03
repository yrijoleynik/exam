var gulp = require('gulp'),
	concat = require('gulp-concat'),
    sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	spritesmith = require('gulp.spritesmith');
	
gulp.task('scss-concat', function() {
  return gulp.src('src/sass/*.scss') 
    .pipe(concat('style.scss')) 
    .pipe(gulp.dest('public/sass')); 
});

gulp.task('sass', function(){ 
    return gulp.src('public/sass/*.scss') 
        .pipe(sass())
        .pipe(gulp.dest('public/css')) 
});

gulp.task('autoprefixer', function(){
		gulp.src('public/css/style.css')
		.pipe(autoprefixer({
			browsers: ['last 30 versions']
			}))
			.pipe(gulp.dest('public/css/'));
});

gulp.task('css-min', function() {
    return gulp.src('public/css/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('public/css'));
});

gulp.task('js-concat', function() {
  return gulp.src('src/js/*.js') 
    .pipe(concat('script.js'))  
    .pipe(gulp.dest('public/js')); 
});

gulp.task('images', function() {
  return gulp.src('img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('public/img'));
});

imagemin(['images/*.png'], 'build/images', {use: [imageminPngquant()]}).then(() => {
    console.log('Images optimized');
});

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('img/srcsprites/*.png') 
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
            }));

    spriteData.img.pipe(gulp.dest('public/img')); 
    spriteData.css.pipe(gulp.dest('css')); 
});

gulp.task('default', ['scss-concat', 'sass', 'autoprefixer', 'css-min', 'images', 'sprite']);
