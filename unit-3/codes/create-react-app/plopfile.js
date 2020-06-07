module.exports = plop => {

    plop.setGenerator('co', {
        description: 'create a component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'component name',
            default: 'Component'
        }],
        actions: [
            {
                type: 'add',
                path: 'src/components/{{name}}/{{name}}.js',
                templateFile: 'plop-templates/index.js'
            }
        ]
    })

}