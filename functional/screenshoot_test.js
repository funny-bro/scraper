Feature('screenshoot: Coupon Create');

Scenario(`screenshoot`, function* (I) {
  I.amOnPage('/')
  // I.loginCookie()


  const cookieName = process.env.COOKIE_NAME
  const cookieValue = process.env.COOKIE_VALUE
  const domain = process.env.LOGIN_ENTRY
  const cookieObj = {
    name: cookieName,
    value: cookieValue,
    domain,
    path: '/',
    httpOnly: true
  }
  I.setCookie(cookieObj)

  I.amOnPage('/Home')
  I.wait(3)
  I.saveScreenshot(`screenshoot_.png`)
});
