require('geckodriver');
require('mock-local-storage');
const {Builder, By, until} = require('selenium-webdriver');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
// const chaiHttp = require('chai-http');
const expect = chai.expect;
// const assert = chai.assert;
const driver = new Builder().forBrowser('firefox').build();

chai.use(chaiAsPromised);
// chai.use(chaiHttp);

// global.window = {};
// window.localStorage = global.localStorage;

// noinspection NodeModulesDependencies,ES6ModulesDependencies
describe('Login', function() {
  this.timeout(30000);

  // noinspection JSUnresolvedFunction
  before(function(done) {
    driver
        .navigate()
        .to('http://localhost:3000/')
        .then(() => done(), done);
  });

  context('Login Modal', function() {
    // noinspection JSUnresolvedFunction
    it('open login modal', function(done) {
      // noinspection JSUnresolvedFunction
      driver
          .wait(until.elementLocated(By.className('login')))
          .click()
          .then(() => done(), done);
    });
  });

  context('Unsuccessful Login', function() {
    // noinspection JSUnresolvedFunction
    it('Wrong Username ', function(done) {
      driver.findElement(By.css('input[name="username"]'))
          .sendKeys('elana')
          .then(() => driver.findElement(By.css('input[name="password"]'))
              .sendKeys('1234')
              .then(() => driver.findElement(By.css('#login button')).click()
                  .then(() => {
                    // noinspection JSUnresolvedFunction
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
    // noinspection JSUnresolvedFunction
    it('Wrong Password', function(done) {
      driver.findElement(By.css('input[name="username"]'))
          .sendKeys('elena')
          .then(() => driver.findElement(By.css('input[name="password"]'))
              .sendKeys('124')
              .then(() => driver.findElement(By.css('#login button')).click()
                  .then(() => {
                    // noinspection JSUnresolvedFunction
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
    // noinspection JSUnresolvedFunction
    it('Both Wrong', function(done) {
      driver.findElement(By.css('input[name="username"]'))
          .sendKeys('elana')
          .then(() => driver.findElement(By.css('input[name="password"]'))
              .sendKeys('124')
              .then(() => driver.findElement(By.css('#login button')).click()
                  .then(() => {
                    // noinspection JSUnresolvedFunction
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
    // noinspection JSUnresolvedFunction
    afterEach(function(done) {
      driver.findElement(By.css('input[name="username"]'))
          .clear()
          .then(() => driver.findElement(By.css('input[name="password"]'))
              .clear())
          .then(() => done(), done);

    });
  });

  context('Successful Login', function() {
    // noinspection JSUnresolvedFunction
    it('Successful Login', function(done) {
      driver.findElement(By.css('input[name="username"]'))
          .sendKeys('elena')
          .then(() => driver.findElement(By.css('input[name="password"]'))
              .sendKeys('qwertY1234')
              .then(() => driver.findElement(By.css('#login button')).click()
                  .then(() => {
                    // noinspection JSUnresolvedFunction
                    driver.wait(
                        until.elementLocated(
                            By.css('a[href="/admin/profile"]')),
                        7000);
                  })
                  .then(() => done(), done)));
    });
  });
});
// noinspection NodeModulesDependencies,ES6ModulesDependencies
describe('Public Announcements', function() {
  this.timeout(30000);

  // noinspection JSUnresolvedFunction
  before(function(done) {
    wait(2000);
    driver.executeScript('window.scrollTo(0, document.body.scrollHeight)')
        .then(() => wait(2000))
        .then(() => driver.executeScript(
            'window.scrollTo(0, document.body.scrollHeight)'))
        .then(() => done(), done);
  });

  it('Navigate to Home', function(done) {
    // noinspection JSUnresolvedFunction
    driver.wait(until.elementLocated(By.css('a[href="/"]')))
        .click()
        .then(() => done(), done);
  });

  // noinspection JSUnresolvedFunction
  context('Add Announcement', function() {
    let len = 0, newLen = 0;
    const newAnnouncement = {
      title  : 'I am a test',
      message: 'This is a test message',
    };

    // noinspection JSUnresolvedFunction
    before(function(done) {
      // noinspection JSUnresolvedFunction
      driver.wait(until.elementsLocated(By.css(
          'div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide')),
          7000)
          .then(() => driver.findElements(By.css(
              'div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide')))
          .then(elements => {
            len = 0;
            for (let i = 1; i <= elements.length; i++) {
              driver.findElements(By.css(
                  `div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide:nth-child(${ i }) div.ann-card i.fa-minus-circle`))
                  .then((element) => {
                    if (element.length > 0) {
                      len++;
                    }
                  });
            }
          })
          .then(() => done(), done);
    });
    // noinspection JSUnresolvedFunction
    it('Open Add Announcement Modal', function(done) {
      // noinspection JSUnresolvedFunction
      driver.wait(until.elementLocated(By.css(
          'div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide:last-child')),
          7000)
          .click()
          .then(() => done(), done);
    });
    // noinspection JSUnresolvedFunction
    it('Write title', function(done) {
      // noinspection JSUnresolvedFunction
      driver.wait(
          until.elementLocated(By.id('ann-modal-title')), 7000)
          .sendKeys(newAnnouncement.title)
          .then(() => done(), done);
    });
    // noinspection JSUnresolvedFunction
    it('Write Message', function(done) {
      // noinspection JSUnresolvedFunction
      driver.wait(
          until.elementLocated(By.id('ann-modal-message')), 7000)
          .sendKeys(newAnnouncement.message)
          .then(() => done(), done);
    });
    // noinspection JSUnresolvedFunction
    it('Submit Announcement', function(done) {
      // noinspection JSUnresolvedFunction
      driver.wait(until.elementLocated(
          By.css('div.modal-footer > button:nth-child(2)')), 5000).click()
          .then(() => {
            // noinspection JSUnresolvedFunction
            driver.wait(
                until.elementLocated(By.className('swal2-content')), 7000)
                .then(() => driver.wait(
                    until.elementLocated(By.className('swal2-confirm')), 7000)
                    .click())
                .then(() => done(), done);
          });
    });
    // noinspection JSUnresolvedFunction
    it('Check for Announcement in Website', function(done) {
      driver.findElements(By.css(
          'div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide'))
          .then(async newElements => {
            newLen = 0;
            for (let i = 1; i <= newElements.length; i++) {
              await driver.findElements(By.css(
                  `div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide:nth-child(${ i }) div.ann-card i.fa-minus-circle`))
                  .then((element) => {
                    if (element.length > 0) {
                      newLen++;
                    }
                  });
            }
          })
          .then(() => wait(5000))
          .then(() => expect(newLen).to.equal(len + 1))
          .then(() => done(), done);
    });
  });

  // noinspection JSUnresolvedFunction
  context('Remove Announcement', function() {
    // noinspection JSUnresolvedFunction
    it('Remove Announcement', function(done) {
      let len = 0, newLen = 0;
      // noinspection JSUnresolvedFunction
      driver.wait(until.elementsLocated(By.css(
          'div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide')),
          7000)
          .then(() => driver.findElements(By.css(
              'div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide')))
          .then(elements => {
            len = 0;
            for (let i = 1; i <= elements.length; i++) {
              driver.findElements(By.css(
                  `div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide:nth-child(${ i }) div.ann-card i.fa-minus-circle`))
                  .then((element) => {
                    if (element.length > 0) {
                      len++;
                    }
                  });
            }
            driver.findElement(By.css(
                'div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide:nth-child(1) div.ann-data'))
                .click()
                .then(() => {
                  // noinspection JSUnresolvedFunction
                  driver.wait(
                      until.elementLocated(By.className('swal2-content')),
                      7000)
                      .then(() => {
                        driver.findElement(By.className('swal2-confirm'))
                            .click();
                      })
                      .then(() => {
                        // noinspection JSUnresolvedFunction
                        driver.wait(
                            until.elementLocated(By.className('swal2-content')),
                            7000)
                            .then(() => wait(2000))
                            .then(() => {
                              // noinspection JSUnresolvedFunction
                              driver.wait(until.elementLocated(
                                  By.className('swal2-confirm')), 7000)
                                  .click();
                            })
                            .then(() => wait(2000))
                            .then(() => driver.findElements(By.css(
                                'div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide')))
                            .then(async newElements => {
                              newLen = 0;
                              for (let i = 1; i <= newElements.length; i++) {
                                await driver.findElements(By.css(
                                    `div#ann-container div.ann-cards div.slick-slider div.slick-track div.slick-slide:nth-child(${ i }) div.ann-card i.fa-minus-circle`))
                                    .then((element) => {
                                      if (element.length > 0) {
                                        newLen++;
                                      }
                                    });
                              }
                            })
                            .then(() => wait(5000))
                            .then(() => expect(newLen).to.equal(len - 1))
                            .then(() => done(), done);
                      });
                });
          });
    });
  });
});
// noinspection NodeModulesDependencies,ES6ModulesDependencies
describe('Navigate', function() {
  this.timeout(30000);
  // noinspection JSUnresolvedFunction
  context('Profile', function() {
    // noinspection JSUnresolvedFunction
    it('Navigate to Profile', function(done) {
      // noinspection JSUnresolvedFunction
      driver.wait(until.elementLocated(By.css('a[href="/admin/profile"]')))
          .click()
          .then(() => done(), done);
    });
    // noinspection JSUnresolvedFunction
    it('Write Search Query', function(done) {
      // noinspection JSUnresolvedFunction
      driver.wait(until.elementLocated(By.id('searchClient')))
          .sendKeys('Antonis')
          .then(() => done(), done);
    });
    // noinspection JSUnresolvedFunction
    it('Search for Client', function(done) {
      // noinspection JSUnresolvedFunction
      driver.wait(until.elementLocated(By.css('button.loading-button')))
          .click()
          .then(() => done(), done);
    });
    // noinspection JSUnresolvedFunction
    it('Select Client', function(done) {
      // noinspection JSUnresolvedFunction
      driver.wait(until.elementLocated(By.id('userList')), 7000)
          .click()
          .then(() => driver.wait(until.elementLocated(
              By.css('#userList > option:nth-child(2)')), 15000)
              .click())
          .then(() => done(), done);
    });
    // noinspection JSUnresolvedFunction
    it('Check for Client Data', function(done) {
      // Check if new message is shown in web page
      wait(5000);
      let data, newData = [];
      driver.findElement(By.css('#userList > option:nth-child(2)')).getText()
          .then((query) => {
            data = query.split(' ');
            driver.findElement(By.css('input#nameInput')).getAttribute('value')
                .then((name) => {
                  newData.push(name);
                  driver.findElement(By.id('surnameInput'))
                      .getAttribute('value')
                      .then((surname) => {
                        newData.push(surname);
                        driver.findElement(By.id('usernameIn'))
                            .getAttribute('value')
                            .then((username) => {
                              newData.push(username);
                              expect(data).to.deep.equal(newData);
                            })
                            .then(() => done(), done);
                      });
                });
          });
    });
  });
  // noinspection JSUnresolvedFunction
  context('Dashboard', function() {
    // noinspection JSUnresolvedFunction
    it('Navigate to Dashboard', function(done) {
      // noinspection JSUnresolvedFunction
      driver.wait(until.elementLocated(By.css('a[href="/admin/dashboard"]')))
          .click()
          .then(() => done(), done);
    });
  });
});
// noinspection NodeModulesDependencies,ES6ModulesDependencies
describe('Logout', function() {
  // noinspection JSUnresolvedFunction
  it('Logout', function(done) {
    // noinspection JSUnresolvedFunction
    driver
        .wait(until.elementLocated(By.className('logout')))
        .click()
        .then(() => done(), done);
  });
  // noinspection JSUnresolvedFunction
  after(function(done) {
    // baseURL = null;
    // driver.close();
    driver.quit().then(() => done(), done);
  });
});

function wait(ms) {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}
