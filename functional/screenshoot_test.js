Feature('screenshoot: Coupon Create');

Scenario(`screenshoot`, async function (I) {
  I.amOnPage('/')
  I.loginCookie()

  I.amOnPage('/Home')

  // I.click('.expandable.lastExpandable .build_folder')
  // I.click('#rec_list ul li:nth-child(3) span')
  I.selectOptionByOrder('select.country', 3)
  // I.wait(3)
  // I.selectOptionByOrder('select.township', 2)
  // I.saveScreenshot(`screenshoot_0.png`)
  // I.wait(3)
  // I.selectOptionByOrder('select.section', 2)
  // I.wait(3)

  I.fillField('input.sectioncode', '1');
  I.saveScreenshot(`screenshoot_1.png`)

  I.checkOption('#RBUILD');
  I.saveScreenshot(`screenshoot_2.png`)

  I.fillField('#number', '2');
  I.saveScreenshot(`screenshoot_3.png`)

  // I.pressKey('Enter');
  // I.saveScreenshot(`screenshoot_4.png`)
  I.click('.d_btn.font01')
  I.acceptPopup()

  I.saveScreenshot(`screenshoot_.png`)
  I.saveScreenshot(`done.png`)
});
