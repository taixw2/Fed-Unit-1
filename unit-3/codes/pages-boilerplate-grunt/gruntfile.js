const grunt = require('grunt')
const del = require('del')
const styleLint = require('stylelint')

module.exports = function () {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    stylelint: {
      options: {
        configFile: '.stylelintrc.json',
        failOnError: true,
        syntax: 'scss',
      },
      src: ['src/**/*.scss'],
    },
    eslint: {
      src: ['src/**/*.js'],
    },
  })

  grunt.registerTask('clean', function () {
    del.sync('temp')
    del.sync('dist')
  })

  grunt.registerTask('lint', function () {
    const done = this.async()
    parallel(['stylelint', 'eslint']).then(() => done())
  })

  grunt.registerTask('serve', function () {
    console.log('clean')
  })
  grunt.registerTask('build', function () {
    console.log('clean')
  })
  grunt.registerTask('strat', function () {
    console.log('clean')
  })
  grunt.registerTask('deploy', function () {
    console.log('clean')
  })
}

function spawnify(task) {
  return new Promise((resolve, reject) => {
    grunt.util.spawn(
      {
        grunt: true,
        args: task,
      },
      (err, result) => {
        grunt.log.writeln('\n' + result.stdout)
        resolve()
      },
    )
  })
}

function parallel(tasks) {
  return Promise.all(tasks.map(spawnify))
}
