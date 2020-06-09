const grunt = require('grunt')
const del = require('del')
const styleLint = require('stylelint')

module.exports = function () {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    lint: {
      src: ['src/**/*.scss'],
    },
  })

  grunt.registerTask('clean', function () {
    del.sync('temp')
    del.sync('dist')
  })

  grunt.registerMultiTask('lint', function () {
    const done = this.async()
    styleLint
      .lint({
        files: this.filesSrc,
        syntax: 'scss',
        configFile: require.resolve('./.stylelintrc.json'),
      })
      .then((res) => {
        console.log('res', res)
        done()
      })
      .catch(done)
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
