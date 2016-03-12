var connect      = require('gulp-connect'),
    gulp         = require('gulp'),
    handleErrors = require('../utils/handleErrors'),
    sass         = require('gulp-ruby-sass');

require('../config');

gulp.task('sass', ['config'], function () {
    return gulp.src('./src/css/main.scss')
        .pipe(sass().on('error', handleErrors))
        .pipe(gulp.dest('./build/css/'))
        .pipe(connect.reload());
});
