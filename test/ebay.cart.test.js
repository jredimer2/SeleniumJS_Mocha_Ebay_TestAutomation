require('chromedriver');
const { Builder } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
var assert = require('assert')
const { ebayHome } = require("../page_objects/ebayHome");
const { doesNotMatch } = require('assert');




describe('Test E2E workflow to shopping cart', function () {
    it('Verify item in cart has the correct product Id', async function () {
        driver = await new Builder().forBrowser("chrome").build();
        try {
            driver.manage().setTimeouts({ implicit: 2000, pageLoad: 20000, script: 20000 });
            const ebay = new ebayHome(driver);
            await ebay.goto("http://ebay.com.au");
            await ebay.enterSearch("Bike");

            // Note: I need to filter for Buy It Now results, as Auction items do not have AddToCart button. 
            await ebay.clickBuyItNowBtn();
            await ebay.clickSearchResult(1);


        } catch (err) {
            console.error('SCRIPT ERROR - ', err)
            throw err
        } finally {
            await driver.close()
        }
    }).timeout(30000);

});
