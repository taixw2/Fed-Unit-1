// 实现这个项目的构建任务
const gulp = require('gulp')
const gulpClean = require('gulp-clean')
const { program } = require('commander')

program
  .option('--port', 'Specify service port')
  .option('--open', 'Open a browser', false)
  .option('--production', 'Production mode', false)
  .option('--prod', 'Production mode alias', 2080)

function clean() {
  return gulp
    .src(['temp', 'dist'], { allowEmpty: true })
    .pipe(gulpClean())
}

module.exports = {
  clean,
  lint() {},
  complie() {},
  serve() {},
  build() {},
  start() {},
  deploy() {},
}
