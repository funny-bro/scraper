(async function(){
  const fs = require('fs')
  const apis = require('./apis/fetch')

  const cityCode = 'A', townCode = 'A15', sectCode = '0841', landBuild = 20
  const res = (await apis.cmd(cityCode, townCode, sectCode, landBuild))
  const {W, filePath} = JSON.parse(res)

  const res2 = await apis.getResult(W, filePath)
  const html = await res2.text()

  console.log(html)
})()
