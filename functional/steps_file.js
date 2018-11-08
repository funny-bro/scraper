'use strict';
// in this file you can append custom step methods to 'I' object

const cookieName = process.env.COOKIE_NAME
const cookieValue = process.env.COOKIE_VALUE

module.exports = function() {
  return actor({
    loginPassword: function(email, password) {
      within('#signinForm', () => {
        this.fillField('input[name="email"]', email);
        this.fillField('input[name="password"]', password);
        this.click('button');
      });
    },
    loginCookie: function() {
      this.amOnPage('/');
      this.setCookie({ name: cookieName, value: cookieValue, path: '/', http: true});
    }
  });
};
