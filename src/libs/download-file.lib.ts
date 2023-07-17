import http from 'http'
import fs from 'fs'

export const downloadFile = (url: string, path: string) => {
  const file = fs.createWriteStream(path)

  return new Promise((resolve, reject) => {
    http.get(url, function (response) {
      response.pipe(file)

      file.on('finish', () => {
        file.close()

        return resolve('done')
      })

      file.on('error', (error) => {
        return reject(error)
      })
    })
  })
}
