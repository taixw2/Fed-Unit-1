const fs = require('fs')
const path = require('path')
const _ = require('lodash')

exports.mapDirectory = async function mapDirectory(dir) {
  const files = await fs.promises.readdir(dir, { encoding: 'buffer' })
  const filesTask = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file.toString('utf8'))
      const stat = await fs.promises.stat(filePath)
      if (stat.isDirectory()) {
        return mapDirectory(filePath)
      }
      return [filePath]
    }),
  )
  return _.flattenDeep(filesTask)
}
