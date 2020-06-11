// 实现这个项目的构建任务
const gulp = require('gulp')
const gulpClean = require('gulp-clean')
const { program } = require('commander')
const stylelint = require('gulp-stylelint')
const eslint = require('gulp-eslint')

program
  .option('--port', 'Specify service port')
  .option('--open', 'Open a browser', false)
  .option('--production', 'Production mode', false)
  .option('--prod', 'Production mode alias', 2080)

function clean() {
  return gulp.src(['temp', 'dist'], { allowEmpty: true }).pipe(gulpClean())
}

function csslint() {
  // return gulp.src(['src/**/*.scss']).pipe(
  //   stylelint({
  //     syntax: 'scss',
  //     reporters: [{ formatter: 'string', console: true }],
  //   })
  // )
}

function javascriptlint() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.formatEach('compact', process.stderr))
}

module.exports = {
  clean,
  lint: gulp.parallel([javascriptlint]),
  complie() {},
  serve() {},
  build() {},
  start() {},
  deploy() {},
}
