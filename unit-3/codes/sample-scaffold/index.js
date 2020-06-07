#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const inquirer = require('inquirer')

// 开发一个基础的脚手架工具, 提供基础的项目结构, 以及创建基础的文件格式

// 是否使用 typescript
// 版本号
// name

const cwd = process.cwd()

inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: '请输入项目名称',
    default: path.dirname(cwd)
}, {
    type: 'input',
    name: 'version',
    message: '请输入版本号',
    default: '1.0.0'
}, {
    type: 'confirm',
    name: 'typescript',
    message: '是否使用 typescript',
    default: true
}, {
    type: 'confirm',
    name: 'isCreateByCurrent',
    message: '是否在当前目录下创建项目',
    default: true
}])
.then((anwsers) => {
    const templateFilesPath = path.join(__dirname, './templates/struct')
    let targetPath = process.cwd()
    if (!anwsers.isCreateByCurrent) {
        targetPath = path.join(targetPath, anwsers.name)
        fs.mkdirSync(targetPath)
    }

    // TODO: 递归获取目录
    fs.readdir(templateFilesPath, (err, files) => {
        if (err) {
            throw err
        }

        files.forEach((file) => {
            // fs.
        })
    })
})


