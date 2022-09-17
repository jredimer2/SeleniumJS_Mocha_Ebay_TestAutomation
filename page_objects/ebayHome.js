
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert')


class ebayHome {
    constructor(driver) {
        this.driver = driver
    }

    async goto(url) {
        await this.driver.get(url)
    }

    async getMyEbay() {
        return await this.driver.findElement(By.xpath("//a[contains(@href,'https://my.ebay.com')]"))
    }

    async getSearchBar() {
        return await driver.findElement(By.id("gh-ac"))
    }

    async getBuyItNowBtn() {
        return await driver.findElement(By.xpath("//span[@class='srp-format-tabs-h2' and contains(text(),'Buy')]"))
    }

    async getAuctionBtn() {
        return await driver.findElement(By.xpath("//span[@class='srp-format-tabs-h2' and contains(text(),'Auction')]"))
    }

    // index starts with 1 for the first search result
    async getSearchResult(index) {
        const linkItem = await driver.findElement(By.xpath(`//li[contains(@class,'s-item')][${index}]`))
        const anchor = await linkItem.findElement(By.xpath("//a[contains(@class,'item__link')]"))
        return anchor
    }

    async clickMyEbay() {
        await (await this.getMyEbay()).click()
    }

    async enterSearch(str) {
        await (await this.getSearchBar()).sendKeys("Bike", Key.RETURN)
    }

    async clickBuyItNowBtn() {
        await (await this.getBuyItNowBtn()).click()
    }

    // index starts with 1 for the first search result
    async clickSearchResult(index) {
        await (await this.getSearchResult(index)).click()
    }
}


module.exports = { ebayHome }