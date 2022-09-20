let { series } = require('gulp');
let { parallel } = require('gulp');
let { src, dest, watch } = require('gulp');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let less = require('gulp-less');
let sass = require('gulp-sass')(require('sass'));
let stylus = require('gulp-stylus');
let autoprefixer = require('gulp-autoprefixer');
let csso = require('gulp-csso');
let rename = require('gulp-rename');
let concat = require('gulp-concat');
let del = require('del');

function Task1(cb) {
    let date = new Date()
    console.log(date.getDay)
    cb();
}

function Task2(cb) {
    let date = new Date()
    console.log(date.getMonth)
    cb();
}

function Task3(cb) {
    let date = new Date()
    console.log(date.getFullYear)
    cb();
}
// function defaultTask(cb) {
//     series(Task1, Task2, Task3)
//     cb()
// }



function Task4(cb) {
    console.log('for')
    cb();
}

function Task5(cb) {
    console.log('five')
    cb();
}

function Task6(cb) {
    console.log('six')
    cb();
}

// function result(cb) {
//     parallel(Task4, Task5, Task6)
//     cb()
// }
// exports.result = result

function copyCSS_1(cb) {
    return src('src/css/style1.css')
        .pipe(dest('dist'))
}
// exports.copyCSS_1 = copyCSS_1

function copyCSS_2(cb) {
    return src('src/css/style2.css')
        .pipe(dest('dist'))
}
// exports.copyCSS_2 = copyCSS_2

function copyCSS_3(cb) {
    return src('src/css/style3.css')
        .pipe(dest('dist'))
}

//-------------------------------------------//

function taskLess(cb) {
    return src('src/less/*.less')
        .pipe(less())
        .pipe(dest('dist'))
}

function taskSass(cb) {
    return src('src/sass/*.sass')
        .pipe(sass())
        .pipe(dest('dist'))
}

function taskStylus(cb) {
    return src('src/stylus/*.stylus')
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(dest('dist'))
}

function taskMinJs(cb) {
    return src('src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist'))
}

function taskMinCSS(cb) {
    return src('src/css/*.css')
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest('dist'))
}

function tackConcatJs(cb) {
    return src('src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(dest('dist'))
}

function taskConcatLess(cb) {
    return src('src/less/*.less')
        .pipe(concat('style00.less'))
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest('dist'))
}

function taskDel(cb) {
    return del('dist/*')
}

exports.default = function() {
        watch('src/js/*.js', taskMinJs)
        watch('src/css/*.css', taskMinCSS)
    }
    // exports.resultCSS = parallel(copyCSS_1, copyCSS_2, copyCSS_3)
exports.taskMinCSS = taskMinCSS
exports.taskLess = taskLess
exports.taskSass = taskSass
exports.taskStylus = taskStylus
exports.taskMinJs = series(taskDel, taskMinJs)
exports.tackConcatJs = tackConcatJs
exports.taskConcatLess = taskConcatLess
exports.taskMinJsMinCss = series(taskDel, parallel(taskMinJs, taskMinCSS))