
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert')


class ebayCart {
    constructor(driver) {
        this.driver = driver
    }

    async getItemLink() {
        return await driver.findElement(By.xpath("//a[@data-test-id='cart-item-link']"))
    }

    async clickItemLink() {
        await (await this.getItemLink()).click()
    }
}


module.exports = { ebayCart }