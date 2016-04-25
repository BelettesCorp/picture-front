// Include gulp
var gulp = require('gulp');

gulp.task('config', function(cb){

    global.target = {
        development:'./build',
        prod:'./build',
        test:'./build',
        staging:'./build'
    };

    // Syntax is either :
    // 1) {file:'module_name_or_path'} (relative to node_modules folder) => will means require('module_name_or_path')
    // 2) {file:'path_to_module/module_name', expose:'module_alias'} (relative to node_modules folder) => will means require('module_alias')
    // ie :
    // 1) {file:'react-router'}
    // 2) {file:'reflux/dist/reflux', expose:'reflux'}
    global.externalDeps = [
        {file:'history'},
        {file:'jquery'},
        {file:'lodash'},
        {file:'moment'},
        {file:'react-addons-linked-state-mixin'},
        {file:'react-addons-update'},
        {file:'react-router'},
        {file:'reflux'},
        {file:'aggregation/es6'}
    ];

    cb();
});


