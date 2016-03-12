var connect = require('gulp-connect');
var del = require('del');
var jscs = require('gulp-jscs');
var jscsStylish = require('gulp-jscs-stylish');
var jshint = require('gulp-jshint');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');

var handleErrors = require('gulp/utils/handleErrors');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var bundleLogger = require('gulp/utils/bundleLogger');
var source = require('vinyl-source-stream');

var config = {
  names: {
    project: 'app',
    vendors: 'vendors'
  },
  distDir: 'dist',
  srcDir: 'src',
  testsDir: 'tests',
  bowerDir: 'bower_components',
  nodeDir: 'node_modules',
  browserify: {
    external: [
      { file: 'aggregation/es6' },
      { file: 'classnames' },
      { file: 'history' },
      { file: 'jquery' },
      { file: 'lodash' },
      { file: 'moment' },
      { file: 'react' },
      { file: 'react-addons-linked-state-mixin' },
      { file: 'react-addons-update' },
      { file: 'react-intl' },
      { file: 'react-router' },
      { file: 'reflux' }
    ]
  }
};

var runBrowserifyTask = function(options) {
  var appConfigFile = options.appConfigFile;
  var compress = options.compress;
  var debug = options.debug;
  var bundleMethod = browserify({
    // Specify the entry point of your app
    entries: [config.srcDir + '/js/app.js'],
    extensions: ['.jsx'],
    global: true,
    debug: debug,
    cache: {}, packageCache: {}, fullPaths: true
  })
  .transform('babelify')
  .external(config.browserify.external.map (function(dep){
    if(dep.expose) {
      return dep.expose;
    } else {
      return dep.file;
    }
  })
  ).external('AppConfig');
  var bundler = options.watch ? watchify(bundleMethod) : bundleMethod;
  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();
    return bundler
      .bundle()
      // Report compile errors
      .on('error', handleErrors)
      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specify the
      // desired output filename here.
      .pipe(source(config.name.project + '.js'))
      .pipe(gulpif(compress, streamify(uglify())))
      // Specify the output destination
      .pipe(gulp.dest(config.distDir + '/'))
      // Refresh browser(s)
      //.pipe(browserSync.reload({stream:true}))
      .pipe(connect.reload())
      // Log when bundling completes!
      .on('end', bundleLogger.end);
  };

  if(options.watch) {
    // Re bundle with watchify on changes.
    bundler.on('update', bundle);
  }

  var vendorBundler = browserify({
    debug: debug // We also add source mapping
    //transform: extraTransforms
  })
  .transform('babelify')
  .require(config.browserify.external)
  .require([{ file: appConfigFile }]);

  // Run the vendor bundle when the default Gulp task starts
  vendorBundler
    .bundle()
    .pipe(source(config.names.vendors + '.js'))
    .pipe(gulpif(compress, streamify(uglify())))
    .pipe(gulp.dest(config.distDir + '/'));

  return bundle();
};

gulp.task('clean', function() {
  del([config.distDir]);
});

gulp.task('lint', function() {
  gulp.src([
      config.srcDir + '/js/**/*.js',
      '!' + config.srcDir + '/js/**/*.js'
    ])
    .pipe(jshint())
    //.pipe(jscs())
    //.pipe(jscsStylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function () {
  return gulp.src(config.srcDir + '/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.distDir + '/css'));
});

gulp.task('html', function() {
  gulp.src(config.srcDir + '/**/*.html')
    .pipe(gulp.dest(config.distDir + '/'))
    .pipe(connect.reload());
});

gulp.task('fonts', function() {
  gulp.src(config.srcDir + '/fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest(config.distDir + '/fonts'));
});

gulp.task('img', function() {
  gulp.src(config.srcDir + '/images/**/*.{gif,png,jpg}')
    .pipe(gulp.dest(config.distDir + '/images'));
});

gulp.task('watch', ['watchify'], function() {
  gulp.watch([config.srcDir + '/js/**/*.js'], ['lint']);
  gulp.watch([config.srcDir + '/css/**/*.scss'], ['sass']);
  gulp.watch([config.srcDir + '/images/**/*.{gif,png,jpg}'], ['img']);
  gulp.watch(config.srcDir + '/*.html', ['html']);
});

gulp.task('serve', function() {
  connect.server({
    port: 8888,
    root: config.distDir,
    livereload: {
      port: 35777
    }
  });
});

gulp.task('test', function() {
});

gulp.task('watchify', function() {
  return runBrowserifyTask({
    appConfigFile: 'gulpfile-dev.js',
    debug:true,
    compress:false,
    watch:true
  });
});

gulp.task('default', function() {
  runSequence(
    'clean',
    'lint',
    ['sass', 'html', 'fonts', 'img'],
    'watch',
    'serve'
  );
});
