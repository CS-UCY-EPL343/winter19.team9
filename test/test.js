require('geckodriver');
require('mock-local-storage');
const {Builder, Key, By, until} = require('selenium-webdriver');
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

describe('Navigate to Pages', function() {
  this.timeout(30000);

  before(function(done) {
    driver
        .navigate()
        .to('http://localhost:3000/')
        .then(() => done(), done);
  });

  it('Navigate to Classes', function(done) {
    driver.wait(until.elementLocated(By.css('a[href="/classes"]')))
        .click()
        .then(() => done(), done);
  });

  it('Navigate to About Us', function(done) {
    driver.wait(until.elementLocated(By.css('a[href="/about"]')))
        .click()
        .then(() => done(), done);
  });

  it('Navigate to Home Page', function(done) {
    driver.wait(until.elementLocated(By.css('a[href="/"]')))
        .click()
        .then(() => done(), done);
  });
});

describe('Login', function() {
  this.timeout(30000);
  context('Login Modal', function() {
    it('open login modal', function(done) {
      driver
          .wait(until.elementLocated(By.className('login')))
          .click()
          .then(() => done(), done);
    });
  });

  context('Unsuccessful Login', function() {
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

  context('Successful Login', function() {
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
});

describe('Profile', function() {
  this.timeout(30000);
  context('Navigate', function() {
    it('Navigate to Profile', function(done) {
      driver.wait(until.elementLocated(By.css('a[href="/user/profile"]')))
          .click()
          .then(() => done(), done);
    });
  });

  context('Open Settings', function() {
    describe('Messages', function() {
      const newMessage = {
        title  : 'I am a test',
        message: 'This is a test message',
      };

      it('View Messages', function(done) {
        driver.findElement(By.css('#leftBlock > ul > li:nth-child(1) > button'))
            .click()
            .then(() => done(), done);
      });

      it('Open Send Message Modal', function(done) {
        // Create and submit new message
        driver.wait(until.elementLocated(By.css('#MessagesModal > button')),
            10000)
            .click()
            .then(() => done(), done);
      });

      it('Select recipient', function(done) {
        driver.wait(until.elementLocated(By.id('ann-modal-to')), 7000)
            .click()
            .then(() => driver.wait(until.elementLocated(
                By.css('#ann-modal-to > option:nth-child(2)')), 7000)
                .click())
            .then(() => done(), done);
      });

      it('Write title', function(done) {
        driver.wait(
            until.elementLocated(By.id('ann-modal-title')), 7000)
            .sendKeys(newMessage.title)
            .then(() => done(), done);
      });

      it('Write Message', function(done) {
        driver.wait(
            until.elementLocated(By.id('ann-modal-message')), 7000)
            .sendKeys(newMessage.message)
            .then(() => done(), done);
      });

      it('Submit Message', function(done) {
        driver.wait(until.elementLocated(
            By.css('div.modal-footer > button:nth-child(2)')), 5000).click()
            .then(() => {
              driver.wait(
                  until.elementLocated(By.className('swal2-content')), 7000)
                  .then(() => driver.wait(
                      until.elementLocated(By.className('swal2-confirm')), 7000)
                      .click())
                  .then(() => done(), done);
            });
      });

      it('Check for Message in Website', function(done) {
        // Check if new message is shown in web page
        wait(5000);
        let newMessageTitle;
        driver.findElement(By.css(
            '#message-container > div >div:nth-child(1) > div.new-msg > div.msg-data > div.msg-header >h2.card-title'))
            .getText()
            .then((messageTitle) => {
              newMessageTitle = messageTitle;
              driver.findElement(By.css(
                  '#message-container > div >div:nth-child(1) > div.new-msg > div.msg-data > div.msg-content >p.card-text'))
                  .getText()
                  .then((newMessageMessage) => expect(newMessage)
                      .to
                      .deep
                      .equal(
                          {title: newMessageTitle, message: newMessageMessage}))
                  .then(() => done(), done);
            });
      });

      // it('Check for Message in Website', function(done) {
      //   // Check if new message is shown in web page
      //   wait(5000);
      //   let newMessageTitle;
      //   // Refresh page and reopen modal
      //   driver.navigate().to(driver.getCurrentUrl())
      //       .then(() => driver.wait(
      //           until.elementLocated(
      //               By.css('#leftBlock > ul > li:nth-child(1) > button')),
      //           30000)
      //           .click()
      //           .then(() => driver.wait(until.elementLocated(By.css(
      //               '#message-container > div >div:nth-child(1) > div.new-msg > div.msg-data > div.msg-header > h2.card-title')),
      //               7000)
      //               .then(() => driver.findElement(By.css(
      //                   '#message-container > div >div:nth-child(1) > div.new-msg > div.msg-data > div.msg-header > h2.card-title'))
      //                   .getText()
      //                   .then((messageTitle) => {
      //                     newMessageTitle = messageTitle;
      //                     driver.findElement(By.css(
      //                         '#message-container > div >div:nth-child(1) > div.new-msg > div.msg-data > div.msg-content >p.card-text'))
      //                         .getText()
      //                         .then((newMessageMessage) => expect(newMessage)
      //                             .to
      //                             .deep
      //                             .equal(
      //                                 {
      //                                   title  : newMessageTitle,
      //                                   message: newMessageMessage,
      //                                 }),
      //                         )
      //                         .then(() => done(), done);
      //                   }),
      //               ),
      //           ),
      //       );
      // });

      // it('Check for Message in Database', function(done) {
      //   console.log(localStorage.getItem('x-access-token'));
      //   chai.request('http://localhost:5000')
      //       .post('/api/messages/get')
      //       .send({'x-access-token':
      // window.localStorage.getItem('x-access-token')}) .then(function(res) {
      // expect(res).to.have.status(200); }) .then(() => done(), done); //
      // Check if new message is shown in database // const currentMessages =
      // getMessages() //     .then(response => response.messages[0].sort( //
      //       function(a, b) { //           // noinspection
      // JSUnresolvedVariable //           return b.Message_ID //
      //    - a.Message_ID; //         })); //
      // deleteMessage(currentMessages[0].Message_ID).then(); //
      // expect(newMessage) //     .to //     .deep //     .equal({ //
      // title  : currentMessages[0].Title, //       message:
      // currentMessages[0].Message, //     }); });
    });

    describe.skip('Membership', function() {
      it('View Membership', function(done) {
        driver.findElement(
            By.css('#leftBlock > ul > li:nth-child(2) > button'))
            .click()
            .then(() => done(), done);
      });
    });

    describe.skip('Events', function() {
      it('View Events', function(done) {
        driver.findElement(
            By.css('#leftBlock > ul > li:nth-child(3) > button'))
            .click()
            .then(() => done(), done);
      });
    });

    describe.skip('Announcements', function() {
      it('View Announcements', function(done) {
        driver.findElement(
            By.css('#leftBlock > ul > li:nth-child(4) > button'))
            .click()
            .then(() => done(), done);
      });
    });

    describe.skip('Edit Account', function() {
      it('View Edit Account', function(done) {
        driver.findElement(
            By.css('#leftBlock > ul > li:nth-child(5) > button'))
            .click()
            .then(() => done(), done);
      });
    });

    after(function(done) {
      driver.wait(until.elementLocated(By.css('div.modal-footer > button')),
          5000)
          .sendKeys(Key.ESCAPE)
          .then(function() {
            wait(2000);
          })
          .then(() => done(), done);
    });
  });
});

describe('Logout', function() {

  it('Logout', function(done) {
    driver
        .wait(until.elementLocated(By.className('logout')))
        .click()
        .then(() => done(), done);
  });

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
