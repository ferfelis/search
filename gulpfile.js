/*
gulp.task(nome, fn): registra uma tarefa com um nome.
gulp.run(tarefas): executa todas as tarefas sequenciamente
gulp.watch(tipo de arquivo, fn): fica vigiando o arquivo e roda a função caso ele se modifique
gulp.src(pasta ou arquivo): indica qual pasta ou arquivo será lido para a tarefa
gulp.dest(pasta): diz para onde o arquivo final precisa ir
*/

//packages
var gulp        = require('gulp'),
		plumber     = require('gulp-plumber'), //recebe erros e nao mata o gulp
		minifycss 	= require('gulp-minify-css'), //minificador de css
		stylus      = require('gulp-stylus'), //compilador de stylus
		uglify      = require('gulp-uglify'), //minificador de JS
		concat      = require('gulp-concat'), //concatenador de JS
		imagemin    = require('gulp-imagemin'); //otimizador de imagens
//compila o stylus e minifica o css
gulp.task('stylus', function(){
	gulp.src('./public/gulp/stylus/**/*.styl')
	.pipe(plumber())
	.pipe(stylus())
	.pipe(minifycss())
	.pipe(gulp.dest('./public/css/'))
});
//concatena e minifica os JS
gulp.task('js', function(){
	return gulp.src('./public/gulp/js/**/*.js')
	.pipe(plumber())
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./public/js/'))
});

gulp.task('imagemin', function() {
	return gulp.src('./public/gulp/img/**/*')
	.pipe(plumber())
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('./public/images/'))
});

gulp.task('watch', function () {
	gulp.watch('./public/gulp/stylus/**/*.styl', ['stylus']);
	gulp.watch('./public/gulp/js/**/*.js', ['js']);
	gulp.watch('./public/gulp/img/**/*.{jpg,png,gif}', ['imagemin']);
});

gulp.task('default', ['js', 'stylus', 'imagemin', 'watch']);