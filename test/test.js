require('chromedriver');
const { Builder, webdriver } = require("selenium-webdriver");
var assert = require('assert')
const { ebayHome } = require("../page_objects/ebayHome");
const { doesNotMatch } = require('assert');



describe('eBay test suite', function () {
    describe('assert if BuyItNow button exists', function () {

        it('BuyItNow button should be present on eBay home page', async function () {

            driver = await new Builder().forBrowser("chrome").build();

            try {
                driver.manage().setTimeouts({ implicit: 2000, pageLoad: 20000, script: 20000 });
                const ebay = new ebayHome(driver);
                await ebay.goto("http://ebay.com.au");
                await ebay.enterSearch("Bike");
                await ebay.getBuyItNowBtn().then(async result => {
                    assert.ok(true);
                }, async result => {
                    assert.fail('Buy It Now button not found')
                })

            } catch (err) {
                console.error('SCRIPT ERROR - ', err) 
                throw err          
            } finally {
                await driver.close()
            }
           
        }).timeout(30000);

        it('Auction button should be present on eBay home page', async function () {
            
            driver = await new Builder().forBrowser("chrome").build();

            var options = webdriver.ChromeOptions();
            options.add_experimental_option('excludeSwitches', ['enable-logging'])

            try {
                driver.manage().setTimeouts({ implicit: 2000, pageLoad: 20000, script: 20000 });
                const ebay = new ebayHome(driver);
                await ebay.goto("http://ebay.com.au");
                await ebay.enterSearch("Bike");
                await ebay.getAuctionBtn().then(async result => {
                    assert.ok(true);
                }, async result => {
                    assert.fail('Auction button not found')
                })

            } catch (err) {
                console.error('SCRIPT ERROR - ', err) 
                throw err          
            } finally {
                await driver.close()
            }
           
        }).timeout(30000);
    });
});