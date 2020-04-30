require('geckodriver');
// const {deleteMessage, getMessages} = require('../src/repository');
const {Builder, Key, By, until} = require('selenium-webdriver');
const expect = require('chai').expect;
const driver = new Builder().forBrowser('firefox').build();

describe('Login', function() {
  this.timeout(30000);

  before(function(done) {
    driver
        .navigate()
        .to('http://localhost:3000/')
        .then(() => done(), done);
  });

  context('Login Modal', function() {
    it('open login modal', function(done) {
      driver
          .wait(until.elementLocated(By.className('login')))
          .click()
          .then(() => driver.findElement(By.id('login')))
          .then(() => done(), done);
    });
  });

  //TODO not skip
  context.skip('Unsuccessful Login', function() {
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
  context('Navigate', function() {
    it('Navigate to Profile', function(done) {
      driver.wait(until.elementLocated(By.css('a[href="/user/profile"]')))
          .click()
          .then(() => done(), done);
    });
  });

  context('Open Settings', function() {
    describe('Messages', function() {
      it('View Messages', function(done) {
        driver.findElement(By.css('#leftBlock > ul > li:nth-child(1) > button'))
            .click()
            .then(() => done(), done);
      });

      it('Send Message', function(done) {
        const newMessage = {
          title  : 'I am a test',
          message: 'This is a test message',
        };

        // Create and submit new message
        driver.wait(until.elementLocated(By.css('#MessagesModal > button')))
            .click()
            .then(() => driver.wait(until.elementLocated(By.id('ann-modal-to')))
                .click())
            .then(() => driver.wait(until.elementLocated(By.css('#ann-modal-to > option:nth-child(2)')))
                .click())
            .then(() => driver.wait(
                until.elementLocated(By.id('ann-modal-title')))
                .sendKeys(newMessage.title))
            .then(() => driver.wait(
                until.elementLocated(By.id('ann-modal-message')))
                .sendKeys(newMessage.message))
            .then(() => driver.wait(
                until.elementLocated(
                    By.css('div.modal-footer > button:nth-child(2)')), 5000)
                .click())
            .then(() => {
              driver.wait(
                  until.elementLocated(By.className('swal2-content')),
                  7000)
                  .then(() =>
                      driver.findElement(By.className('swal2-confirm'))
                          .click(),
                  );
            })
            // Check if new message is shown in web page
            .then(() => {
              wait(2000);
              const newMessageTitle = driver.wait(until.elementLocated(By.css(
                  '#message-container > div > div:nth-child(1) > div.new-msg > div.msg-data > div.msg-header > h2.card-title')));
              const newMessageMessage = driver.wait(until.elementLocated(By.css(
                  '#message-container > div > div:nth-child(1) > div.new-msg > div.msg-data > div.msg-content > p.card-text')));
              expect(newMessage)
                  .to
                  .equal({
                    title  : newMessageTitle.getText(),
                    message: newMessageMessage.getText(),
                  });
            })
            // Check if new message is shown in database
            // .then(async() => {
            //   const currentMessages = await getMessages()
            //       .then(response => response.messages[0].sort(
            //           function(a, b) {
            //             // noinspection JSUnresolvedVariable
            //             return b.Message_ID
            //                    - a.Message_ID;
            //           }));
            //   await deleteMessage(currentMessages[0].Message_ID).then();
            //   expect(newMessage)
            //       .to
            //       .equal({
            //         title  : currentMessages[0].Title,
            //         message: currentMessages[0].Message,
            //       });
            // })
            .then(() => done(), done);
      });
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

    // afterEach(function(done) {
    //   this.timeout(5000);
    //   driver.wait(until.elementLocated(By.css('div.modal-footer > button')),
    //       5000)
    //       .sendKeys(Key.ESCAPE)
    //       .then(function() {
    //         wait(2000);
    //       })
    //       .then(() => done(), done);
    // });

    after(function(done) {
      // baseURL = null;
      // driver.close();
      driver.quit().then(() => done(), done);
    });
  });
});

function wait(ms) {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}
