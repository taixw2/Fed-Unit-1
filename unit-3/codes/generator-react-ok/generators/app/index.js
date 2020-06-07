const Generator = require('yeoman-generator')

module.exports = class extends Generator {

    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: '请输入名词',
                default: this.appname
            }
        ])
        .then((anwsers) => {
            this.anwsers = anwsers
        })
    }

    writing() {

        const files = [
            '.gitignore',
            'package.json',
            'README.md',
            'public/index.html'
        ]

        files.forEach(file => {
            this.fs.copyTpl(
                this.templatePath(file),
                this.destinationPath(file),
                this.anwsers
            )
        })
    }
}