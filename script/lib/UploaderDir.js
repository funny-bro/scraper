const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const BUCKET = 'rrc-backstage-build'
const signatureVersion = 'v4'
AWS.config.region = 'ap-southeast-1'
const S3 = new AWS.S3({ signatureVersion })

const fillZero = (num) => {
  if (num < 10) return `0${num}`
  return num
}
const getFileName = (filePath) => {
  const pathArray = filePath.split('/')
  return pathArray[pathArray.length - 1]
}
const timeDirectoryName = (isIncludedTime) => {
  const _d = new Date()
  const month = _d.getUTCMonth() + 1
  const day = _d.getUTCDate()
  const year = _d.getUTCFullYear()
  const hour = _d.getUTCHours()
  const min = _d.getUTCMinutes()

  if (isIncludedTime) return `${year}-${month}-${day}-${fillZero(hour)}:${fillZero(min)}`

  return `${year}-${month}-${day}`
}

class UploaderDir {
  constructor(rootPath) {
    this.timeFolderName = timeDirectoryName(true)
    this.rootPath = rootPath
  }
  async upload(filePath) {
    if (fs.lstatSync(filePath).isDirectory()) {
      const msg = 'skip: when filePath is a directory'
      console.error(msg)
      return msg
    }

    const data = fs.readFileSync(filePath)
    const base64data = new Buffer(data, 'binary')
    const fileName = filePath.replace(this.rootPath, '')
    const { timeFolderName } = this

    console.log('fileName: ', fileName)

    const payload = {
      Body: base64data,
      Bucket: BUCKET,
      Key: `${timeFolderName}/${fileName}`
    }
    return S3.putObject(payload).promise()
  }

  async uploadFileOfDirectary(dirPath) {
    const fileList = fs.readdirSync(dirPath)
    const MAX = fileList.length

    for (let i = 0; i < MAX; i++) {
      const fileName = fileList[i]
      const filePath = path.join(`${dirPath}/${fileName}`)

      if (fs.lstatSync(filePath).isDirectory()) {
        await this.uploadFileOfDirectary(filePath)
      }

      await this.upload(filePath)
      console.log(`Uploaded ${i + 1}/${MAX}: `, filePath)
    }
  }

  async exec() {
    await this.uploadFileOfDirectary(this.rootPath)
    console.log(`File is uploaded to : ${this.timeFolderName}`)
  }
}

module.exports = UploaderDir

