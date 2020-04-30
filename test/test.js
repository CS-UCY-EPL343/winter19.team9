//in e2e/tests/autocomplete.js
// const webdriver = require("selenium-webdriver");
const {Builder, By, Key, until} = require('selenium-webdriver');
require('geckodriver');
const driver = new Builder().forBrowser('firefox').build();

describe('Login', function() {
  this.timeout(30000);

  before(function(done) {
    driver
        .navigate()
        .to('http://localhost:3000/')
        .then(() => done(), done);
  });

  describe('Login Modal', function() {
    it('open login modal', function(done) {
      driver
          .wait(until.elementLocated(By.className('login')))
          .click()
          .then(() => driver.findElement(By.id('login')))
          .then(() => done(), done);
    });
  });

  describe('Unsuccessful Login', function() {
    it('Wrong Username ', function(done) {
      driver.findElement(By.css('input[name="username"]'))
          .sendKeys('aloizo3')
          .then(() => driver.findElement(By.css('input[name="password"]'))
              .sendKeys('1234')
              .then(() => driver.findElement(By.css('#login button')).click()
                  .then(() => {
                    driver.wait(
                        until.elementLocated(By.className('swal2-content')),
                        7000)
                        .then(() => {
                          driver.findElement(By.className('swal2-confirm'))
                              .click();
                        })
                        .then(() => done(), done);
                  }),
              ));
    });

    it('Wrong Password', function(done) {
      driver.findElement(By.css('input[name="username"]'))
          .sendKeys('aloizo03')
          .then(() => driver.findElement(By.css('input[name="password"]'))
              .sendKeys('124')
              .then(() => driver.findElement(By.css('#login button')).click()
                  .then(() => {
                    driver.wait(
                        until.elementLocated(By.className('swal2-content')),
                        7000)
                        .then(() => {
                          driver.findElement(By.className('swal2-confirm'))
                              .click();
                        })
                        .then(() => done(), done);
                  }),
              ));
    });

    it('Both Wrong', function(done) {
      driver.findElement(By.css('input[name="username"]'))
          .sendKeys('aloizo3')
          .then(() => driver.findElement(By.css('input[name="password"]'))
              .sendKeys('124')
              .then(() => driver.findElement(By.css('#login button')).click()
                  .then(() => {
                    driver.wait(
                        until.elementLocated(By.className('swal2-content')),
                        7000)
                        .then(() => {
                          driver.findElement(By.className('swal2-confirm'))
                              .click();
                        })
                        .then(() => done(), done);
                  }),
              ));
    });

    afterEach(function(done) {
      driver.findElement(By.css('input[name="username"]'))
          .clear()
          .then(() => driver.findElement(By.css('input[name="password"]'))
              .clear())
          .then(() => done(), done);

    });
  });

  describe('Successful Login', function() {
    it('Successful Login', function(done) {
      driver.findElement(By.css('input[name="username"]'))
          .sendKeys('aloizo03')
          .then(() => driver.findElement(By.css('input[name="password"]'))
              .sendKeys('1234')
              .then(() => driver.findElement(By.css('#login button')).click()
                  .then(() => {
                    driver.wait(
                        until.elementLocated(By.css('a[href="/user/profile"]')),
                        7000);
                  })
                  .then(() => done(), done)));
    });
  });

  after(function(done) {
    // baseURL = null;
    // driver.close();
    driver.quit().then(() => done(), done);
  });
});