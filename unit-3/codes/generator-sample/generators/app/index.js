const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    
    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'title',
            message: '输入你的项目名称',
            default: this.appname
        }])
        .then(answers => {
            this.answers = answers
        })
    }
    writing() {
        this.fs.write(
            this.destinationPath("temp.txt"),
            Math.random().toString()
        )
        this.templatePath("foo.txt")
        this.fs.copyTpl(this.templatePath('foo.txt'), this.destinationPath('foo.txt'), this.answers)
    }
}