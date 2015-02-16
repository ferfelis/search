/*
gulp.task(nome, fn): registra uma tarefa com um nome.
gulp.run(tarefas): executa todas as tarefas sequenciamente
gulp.watch(tipo de arquivo, fn): fica vigiando o arquivo e roda a função caso ele se modifique
gulp.src(pasta ou arquivo): indica qual pasta ou arquivo será lido para a tarefa
gulp.dest(pasta): diz para onde o arquivo final precisa ir
*/

//packages
var gulp          = require('gulp'),
		plumber       = require('gulp-plumber'), //recebe erros e nao mata o gulp
		minifycss 	  = require('gulp-minify-css'), //minificador de css
		stylus        = require('gulp-stylus'), //compilador de stylus
    prefixer      = require('autoprefixer-stylus'),
    uglify        = require('gulp-uglify'), //minificador de JS
  	concat        = require('gulp-concat'), //concatenador de JS
  	imagemin      = require('gulp-imagemin'), //otimizador de imagens
  	cmq 				  = require('gulp-combine-media-queries');

//compila o stylus e minifica o css
gulp.task('stylus', function(){
	return gulp.src('./public/gulp/stylus/style.styl')
	.pipe(plumber())
	.pipe(stylus({
    use:[prefixer()]
  }))
  .pipe(concat('style.css'))
	.pipe(minifycss())
	.pipe(gulp.dest('./public/css/'))
});

//organiza os media-query no final do arquivo <3
gulp.task('cmq', function () {
	return gulp.src('./public/css/')
	.pipe(cmq({
		log: true
	}))
	.pipe(gulp.dest('dist'));
});

//concatena e minifica os JS
gulp.task('js', function(){
	return gulp.src('./public/gulp/js/**/*.js')
	.pipe(plumber())
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./public/js/'))
});

//otimiza imagens
gulp.task('imagemin', function() {
	return gulp.src('./public/gulp/img/**/*')
	.pipe(plumber())
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('./public/images/'))
});

//acompanha as mudanças e reexecuta as funcoes
gulp.task('watch', function () {
	gulp.watch('./public/gulp/stylus/**/*.styl', ['stylus']);
	gulp.watch('./public/gulp/js/**/*.js', ['js']);
	gulp.watch('./public/gulp/img/**/*.{jpg,png,gif}', ['imagemin']);
});

gulp.task('default', ['js', 'stylus', 'cmq', 'imagemin', 'watch']);