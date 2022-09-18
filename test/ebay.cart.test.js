require('chromedriver');
const { Builder } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
var assert = require('assert')
const { ebayHome } = require("../page_objects/ebayHome");
const { ebayProductDetails } = require("../page_objects/ebayProductDetails");
const { ebayCart } = require("../page_objects/ebayCart");
const { doesNotMatch } = require('assert');

// Description: This is an end to end test that goes through a number of pages in the purchase process. 
// It demonstrates advanced Selenium concepts such as: 
//  - switching tabs
//  - relative xpath selector to current element (eg., selectFirstItemInEachDropDown())
//  - adaptive scripts (ie., it still works even if product has multiple selection menus)
//  - using Selenium to run Javascript (eg., scrolling into view)
//  - clean Page Object Model (try-catch block handled at test level) 
//
// Performance improvement: to make this test run faster, we should use CSS selectors where possible.
// Usage: You only need to change the searchTerm, and the test should run to completion, even when there are additional selection components.
//
const sleep = ms => new Promise(r => setTimeout(r, ms))
const searchTerm = 'mug'

describe('Test E2E workflow to shopping cart', function () {
    it('Verify item in cart has the correct product Id', async function () {
        driver = await new Builder().forBrowser("chrome").build();
        try {
            driver.manage().setTimeouts({ implicit: 10000, pageLoad: 20000, script: 20000 });
            driver.manage().window().maximize();
            const ebay = new ebayHome(driver);
            const productDetails = new ebayProductDetails(driver);
            const cart = new ebayCart(driver);

            await ebay.goto("http://ebay.com.au");
            await ebay.enterSearch(searchTerm);

            // Note: I need to filter for Buy It Now results, as Auction items do not have AddToCart button. 
            await ebay.clickBuyItNowBtn();
            await ebay.clickSearchResult(1);

            // Since product details opens in a new tab, switch to latest tab
            const handles = await driver.getAllWindowHandles();
            await driver.switchTo().window(handles.at(-1));

            // Get the Item Number and store for later verification
            await productDetails.scrollIntoViewItemNumber()
            const storedItemNumber = await productDetails.returnItemNumber()
            console.log('------ storedItemNumber =', storedItemNumber)

            // Proceed to next screen, check first if there are any option selections (eg., colour), and select first option for each
            await productDetails.selectFirstItemInEachDropDown()
            await productDetails.clickAddToCartBtn()
            await productDetails.clickGotoCartBtn()

            // Click on product link in shopping cart to view its details
            await cart.clickItemLink()

            // Verify correct item by clicking on item in the cart and verifying that the Item number is the same as previously stored
            await productDetails.scrollIntoViewItemNumber()
            assert.equal(storedItemNumber, await productDetails.returnItemNumber())


        } catch (err) {
            console.error('SCRIPT ERROR - ', err)
            throw err
        } finally {
            await driver.quit()
        }
    }).timeout(30000);

});
