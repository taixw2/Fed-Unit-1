#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const inquirer = require('inquirer')
const util = require('./util')

// 开发一个基础的脚手架工具, 提供基础的项目结构, 以及创建基础的文件格式

// 是否使用 typescript
// 版本号
// name

const cwd = process.cwd()

;(async function () {
  const anwsers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '请输入项目名称',
      default: path.parse(cwd).name,
    },
    {
      type: 'input',
      name: 'version',
      message: '请输入版本号',
      default: '1.0.0',
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: '是否使用 typescript',
      default: true,
    },
    {
      type: 'confirm',
      name: 'isCreateByCurrent',
      message: '是否在当前目录下创建项目',
      default: true,
    },
  ])

  const templateFilesPath = path.join(__dirname, './templates/struct')

  let targetPath = process.cwd()
  if (!anwsers.isCreateByCurrent) {
    targetPath = path.join(targetPath, anwsers.name)

    try {
      await fs.promises.mkdir(targetPath)
    } catch (error) {}
  }

  const files = await util.eachDirectory(
    templateFilesPath,
    async (err, filepath) => {
      if (err) throw err

      let outputPath = path.join(
        targetPath,
        filepath.substr(templateFilesPath.length),
      )

      try {
        await fs.promises.mkdir(path.dirname(outputPath), { recursive: true })
      } catch (error) {}

      if (/\.[jpg|gif|png|webp|icon]$/.test(path.extname(filepath))) {
        fs.promises.copyFile(filepath, outputPath)
        return
      }

      if (outputPath.endsWith('.js') && anwsers.typescript) {
        outputPath = outputPath.replace(/.js$/, '.ts')
      }
      const content = await ejs.renderFile(filepath, anwsers)
      fs.promises.writeFile(outputPath, content)
    },
  )

  console.log('files', await fs.promises.access(files[0]))
})()
