const fs = require('fs')
const path = require('path')

exports.eachDirectory = async function eachDirectory(dir) {
  const files = await fs.promises.readdir(dir, { encoding: 'buffer' })

  const filesTask = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file.toString('utf8'))

      console.log('filePath', filePath)

      const stat = await fs.promises.stat(filePath)
      if (stat.isDirectory()) {
        const result = await eachDirectory(filePath)
        // console.log('filePath===', result)
        return []
      }

      return [filePath]
    }),
  )

  console.log('filesTask', filesTask)

  return filesTask
  //   try {
  //     if (fs.statSync(dir).isFile()) {
  //       cb(null, dir)
  //       return
  //     }
  //   } catch (error) {
  //     cb(error)
  //     return
  //   }
  //   fs.readdir(dir, (err, files) => {
  //     if (err) {
  //       cb(err)
  //       return
  //     }
  //     files.forEach((file) => {
  //       try {
  //         const filePath = path.join(dir, file)
  //         if (fs.statSync(filePath).isDirectory()) {
  //           eachDirectory(filePath, cb)
  //           return
  //         }
  //         cb(null, filePath)
  //       } catch (error) {
  //         cb(error)
  //       }
  //     })
  //   })
}
