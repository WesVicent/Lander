var pckg = require('./package.json');

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify');

var tsc = require('gulp-typescript'),
    tsProject = tsc.createProject('tsconfig.json'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    buffer = require('vinyl-buffer');

var sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer');

/////////////////////////////////////////////////////////////////////////////////
//                                VARIABLES                                    //
/////////////////////////////////////////////////////////////////////////////////
var names = {
    mainDistFile: 'core',
    mainSourceFile: 'main'
};

var paths = {
    dist: './dist/',
    scripts: {
        sourceTS: [
            './source/**/*.ts',
            './source/typings/**.d.ts/',
            './source/interfaces/interfaces.d.ts'
        ],
        sourceJS: './processed/js/',
    },
    scss: {
        sourceSASS: './sass/**/*.scss'
    },
    libs: [
        './node_modules/box2dweb/box2d.js',
        './node_modules/pixi.js/dist/pixi.js'
    ]
};

/////////////////////////////////////////////////////////////////////////////////
//                                   LIBS                                      //
/////////////////////////////////////////////////////////////////////////////////
gulp.task('bundle:libs', function () {
    gulp.src(paths.libs)
        .pipe(sourcemaps.init())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(paths.scripts.sourceJS))
        .pipe(rename('libs.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist)
        );
});

/////////////////////////////////////////////////////////////////////////////////
//                                   CORE                                      //
/////////////////////////////////////////////////////////////////////////////////
gulp.task('bundle:core', function () {
    var bundler = browserify({
        debug: true,
        standalone: names.mainDistFile
    });
    return gulp.src(paths.scripts.sourceTS)
        .pipe(tsProject())
        .on('error', swallowError)
        .js.pipe(gulp.dest(paths.scripts.sourceJS).on('end', function () {
            bundler.add(paths.scripts.sourceJS + names.mainSourceFile + '.js')
                .bundle()
                .pipe(source(names.mainDistFile + '.min.js'))
                .pipe(buffer())
                .pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(paths.dist));
        }));
});
gulp.task('watch:core', function () {
    gulp.watch(paths.scripts.sourceTS, ['bundle:core']);

    gulp.watch('./dist/core.min.js').on('change', function () {
        defaultNotification();
    });
});

/////////////////////////////////////////////////////////////////////////////////
//                                  SASS                                       //
/////////////////////////////////////////////////////////////////////////////////
gulp.task('bundle:sass', function () {
    return gulp.src(paths.scss.sourceSASS)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", swallowError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.dist))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist));
});
gulp.task('watch:sass', function () {
    gulp.watch(paths.scss.sourceSASS, ['bundle:sass']);

    gulp.watch("./dist/app.min.css").on('change', function () {
        defaultNotification();
    });
});

/////////////////////////////////////////////////////////////////////////////////
//                                  MISC                                       //
/////////////////////////////////////////////////////////////////////////////////

function swallowError(error) {
    // If you want details of the error in the console
    console.log(error.toString())
    this.emit('end')
}

function defaultNotification () {
    notify({
        title: pckg.name,
        message: 'By ' + pckg.author + '\nThanks for coming ♥' + '\nversion: ' + pckg.version
    }).write('');
}