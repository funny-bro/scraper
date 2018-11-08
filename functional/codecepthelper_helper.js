class CodeceptHelper extends Helper {
  // before/after hooks
  _before() {
    // remove if not used
  }

  _after() {
    // remove if not used
  }

  seeElement(locator) {
    if(this.helpers.Nightmare)
      this.helpers['Nightmare'].browser.visible(locator);
  }
  setCookie(cookieObj) {
    console.log('setCookie: -=-=-= ')

    if(this.helpers.webdriver)
    console.log('webdriver: -=-=-= ')
      // this.helpers['Nightmare'].browser.visible(locator);
  }
}

module.exports = CodeceptHelper;
