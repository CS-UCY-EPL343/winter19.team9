//in e2e/tests/autocomplete.js
// const webdriver = require("selenium-webdriver");
const {Builder, By, Key, until} = require('selenium-webdriver');
require("geckodriver");
const driver = new Builder().forBrowser("firefox").build();


describe("login form", function () {

    this.timeout(20000);

    before(function (done) {
        driver
            .navigate()
            .to("http://localhost:3000/")
            .then(() => done());
    });

    it("open login modal", function (done) {

        driver
            .wait(until.elementLocated(By.className("login")))
            .click()
            .then(() => driver.findElement(By.id("login")).then(() => done()));
    });
    describe("Unsuccessful Login", function () {
        it("Wrong Username ", function (done) {
            driver.findElement(By.css('input[name="username"]')).sendKeys("aloizo3");
            driver.findElement(By.css('input[name="password"]')).sendKeys("1234");
            driver.findElement(By.css('#login button')).click();
            driver.wait(until.elementLocated(By.className("swal2-content")), 7000)
                .then(() => {
                    driver.findElement(By.className('swal2-confirm')).click();
                    done();
                })
                .catch();

        });
        it("Wrong Password", function (done) {
            driver.findElement(By.css('input[name="username"]')).sendKeys("aloizo03");
            driver.findElement(By.css('input[name="password"]')).sendKeys("124");
            driver.findElement(By.css('#login button')).click();
            driver.wait(until.elementLocated(By.className("swal2-content")), 7000)
                .then(() => {
                    driver.findElement(By.className('swal2-confirm')).click();
                    done();
                })
                .catch();

        });
        it("Both Wrong", function (done) {
            driver.findElement(By.css('input[name="username"]')).sendKeys("alizo03");
            driver.findElement(By.css('input[name="password"]')).sendKeys("123");
            driver.findElement(By.css('#login button')).click();
            driver.wait(until.elementLocated(By.className("swal2-content")), 7000)
                .then(() => {
                    driver.findElement(By.className('swal2-confirm')).click();
                    done();
                })
                .catch();
        });
        afterEach(function(done){
            driver.findElement(By.css('input[name="username"]')).clear();
            driver.findElement(By.css('input[name="password"]')).clear();
            done()
        });
    });
    describe("Successful Login", function () {
        it("Successful Login", function (done) {
            driver.findElement(By.css('input[name="username"]')).sendKeys("aloizo03");
            driver.findElement(By.css('input[name="password"]')).sendKeys("1234");
            driver.findElement(By.css('#login button')).click()
                .then(() => {
                    driver.wait(until.elementLocated(By.css('a[href="/user/profile"]')), 7000);
                    done();
                });
        });
    });

    after(function (done) {
        // baseURL = null;
        // driver.close();
        driver.quit().then(() => done());
    });
});
// /**
//  * Dependency Modules
//  */
// // import {describe} from "mocha";
//
// let assert = require("assert").strict;
// let webdriver = require("selenium-webdriver");
// require("chromedriver");
//
// // Application Server
// const serverUri = "http://localhost:3000/";
// const appTitle = "Fitness Factory Nicosia";
//
// /**
//  * Config for Chrome browser
//  * @type {webdriver}
//  */
// let browser = new webdriver.Builder()
//     .usingServer()
//     .withCapabilities({ browserName: "chrome" })
//     .build();
//
// /**
//  * Config for Firefox browser (Comment Chrome config when you intent to test in Firefox)
//  * @type {webdriver}
//  */
// /*
// var browser = new webdriver.Builder()
// 	.usingServer()
// 	.withCapabilities({ browserName: "firefox" })
// 	.build();
//  */
//
// /**
//  * Function to get the title and resolve it it promise.
//  * @return {[type]} [description]
//  */
// function logTitle() {
//     return new Promise((resolve, reject) => {
//         browser.getTitle().then(function(title) {
//             resolve(title);
//         });
//     });
// }
//
// /**
//  * Sample test case
//  * To check whether the given value is present in array.
//  */
// describe("Array", function() {
//     describe("#indexOf()", function() {
//         it("should return -1 when the value is not present", function() {
//             assert.equal([1, 2, 3].indexOf(4), -1);
//         });
//     });
// });
//
// describe("Home Page", function() {
//
//     // it('should change timeout duration for session with long code duration', () => {
//     //     browser.setTimeout({
//     //         'pageLoad': 10000,
//     //         'script': 60000
//     //     });
//     //     // Execute code which takes a long time
//     //     browser.executeAsync((done) => {
//     //         console.log('Wake me up before you go!');
//     //         setTimeout(done, 59000);
//     //     });
//     // });
//
//     /**
//      * Test case to load our application and check the title.
//      */
//
//         return new Promise((resolve, reject) => {
//             browser
//                 .get(serverUri)
//                 .then(logTitle)
//                 .then(title => {
//                     assert.strictEqual(title, appTitle);
//                     resolve();
//                 })
//                 .catch(err => reject(err));
//         });
//     });
//
//     /**
//      * Test case to check whether the given element is loaded.
//      */
//     it("Should check whether the given element is loaded", function() {
//         return new Promise((resolve, reject) => {
//             browser
//                 .findElement({ id: "sel-button" })
//                 .then(elem => resolve())
//                 .catch(err => reject(err));
//         });
//     });
//
//     /**
//      * End of test cases use.
//      * Closing the browser and exit.
//      */
//     after(function() {
//         // End of test use this.
//         browser.quit();
//     });
// });