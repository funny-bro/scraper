(async function() {
  const fs = require('fs')
  const path = require('path')
  const UploaderDir = require('./lib/UploaderDir')

  const rootPath = path.join(__dirname, '../output/')
  const baseUrl = 'http://ec2-13-251-16-94.ap-southeast-1.compute.amazonaws.com:8080'

  const uploader = new UploaderDir(rootPath)
  await uploader.exec(rootPath)

  const timeStamp = uploader.timeFolderName
  const url = `${baseUrl}/${timeStamp}`
  const urlScreenshoot = `${baseUrl}/screenshoots/${timeStamp}`
  const urlImages = `${baseUrl}/images/${timeStamp}`
  const msg = `## E2E test report is uploaded to: 
- ${url}
- ${urlScreenshoot}
- ${urlImages}
- aws s3 sync s3://rrc-backstage-build/${uploader.timeFolderName} ./bucketOutput
`
  console.log(msg)

  try {
    const Codecommit = require('./lib/codecommit')
    await Codecommit.post(msg)
    console.log('Successfully uploaded package.', uploader.timeFolderName)
  }
  catch(err){
    console.log('Successfully uploaded package, not code commit', uploader.timeFolderName)
  }
})()