module.exports = grunt => {

    grunt.registerTask('todo', () => {
        console.log('todo~')
    })

    grunt.registerTask('default', 'hello default', () => {
        console.log('default and descrition')
    })

    grunt.registerTask('async', 'hello default', function() {
        const done = this.async()
        setTimeout(() => {
            console.log('default and descrition')
            done()
        })
    })

}
