import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import cleancss from 'gulp-clean-css';
import concat from 'gulp-concat';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import gulpsass from 'gulp-sass';
import uglify from 'gulp-uglify';
import dartsass from 'sass';

const sass = gulpsass(dartsass);

// Paths
const paths = {
    styles: {
        src: './src/css/**/*.scss',
        dest: './dist/css/'
    },
    scripts: {
        src: ['./src/js/library/*.js','./src/js/*.js'],
        dest: './dist/js/'
    },
    htmls: {
        src: './src/*.html',
        dest: './'
    },
    images: {
        src: './src/images/*',
        dest: './dist/images/'
    }
};

// Tasks
gulp.task("styles", styles);
gulp.task("scripts", scripts);
gulp.task("htmls", htmls);
gulp.task("images", images);

gulp.task("default", watch);

// Styles
function styles() {
    return gulp.src(paths.styles.src)

    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(concat("default--dist.css"))
    .pipe(gulp.dest(paths.styles.dest));
  }

// Scripts
function scripts() {
    return gulp.src(paths.scripts.src,{sourcemaps: true})

    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('default--dist.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Html
function htmls() {
    return gulp.src(paths.htmls.src)

    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.htmls.dest));
}

// Images
function images() {
    return gulp.src(paths.images.src)

    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// Watch
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.htmls.src, htmls);
    gulp.watch(paths.images.src, images);
}