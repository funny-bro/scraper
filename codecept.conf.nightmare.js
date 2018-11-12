const {LOGIN_ENTRY} = process.env

exports.config = {
  output: './output',
  helpers: {
    "Nightmare": {
      url: `https://${LOGIN_ENTRY}`,
      "show": true,
      "restart": false
    }
  },
  include: {
    I: './functional/steps_file.js'
  },
  bootstrap: function(done) {
    console.log(' -=-=-=-= bootstrap');
    done();
  },
  teardown: function(done) {
    console.log(' -=-=-=-= teardown');
    try {
      const Codecommit = require('./script/lib/codecommit')
      const {stats} = require('./output/mochawesome.json')
      const {passes, failures} = stats
      const msg = (failures >0) ? '## [X] e2e test Fail' : '## [Good] e2e test success'
  
      Codecommit.post(`${msg}
         - passes: ${passes} ,
         - failures:${failures}
      `).then(()=>{
        process.exit(1);
        done();
      }, ()=>{
        console.error('Codecommit failed ...')
        process.exit(1);
        done();
      })
    }
    catch(err){
      console.error('Not saving report on S3 ')
      process.exit(1);
      done();
    }
  },
  hooks: [],
  gherkin: {},
  tests: './functional/**/**_test.js',
  timeout: 1000,
  name: 'rrcBackstage',
  mocha: {
    reporterOptions: {
      reportDir: 'output'
    }
  }
};
