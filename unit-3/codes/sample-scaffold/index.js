#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const inquirer = require('inquirer')
const del = require('del')
const execSync = require('child_process').execSync
const util = require('./util')

const cwd = process.cwd()
const questions = [
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
]

;(async function () {
  const anwsers = await inquirer.prompt(questions)
  const tempDir = path.join(__dirname, './templates/struct')

  // 创建目录
  let targetPath = cwd
  if (!anwsers.isCreateByCurrent) {
    targetPath = path.join(targetPath, anwsers.name)
    await del(targetPath)
    try {
      await fs.promises.mkdir(targetPath)
    } catch (error) {}
  }

  // 获取所有子文件路径
  const files = await util.mapDirectory(tempDir)

  // 执行任务
  const task = files.map((filepath) => {
    let outputPath = path.join(targetPath, filepath.substr(tempDir.length))
    const ext = path.extname(filepath)
    const filename = path.basename(filepath)

    try {
      fs.mkdirSync(path.dirname(outputPath))
    } catch (error) {}

    // 如果是图片则直接拷贝
    if (/\.[jpg|gif|png|webp|icon]$/.test(ext)) {
      return fs.promises.copyFile(filepath, outputPath)
    }

    if (filename === 'jsconfig.json' && anwsers.typescript) {
      return fs.promises.copyFile(
        filepath,
        outputPath.replace('jsconfig', 'tsconfig')
      )
    }

    if (ext === '.js' && anwsers.typescript) {
      outputPath = outputPath.replace(/.js$/, '.ts')
    }

    return ejs
      .renderFile(filepath, anwsers)
      .then((content) => fs.promises.writeFile(outputPath, content))
  })

  await Promise.all(task).catch(console.error)

  if (!shouldUseYarn()) {
    console.log('success~')
    return
  }

  execSync('yarn --cwd ' + targetPath, { stdio: 'inherit' })
})()

function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}
