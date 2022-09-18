
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert')


class ebayProductDetails {
    constructor(driver) {
        this.driver = driver
    }

    async getItemNumberComponent() {
        return await this.driver.findElement(By.id("descItemNumber"))
    }

    async getAddToCartBtn() {
        return await this.driver.findElement(By.id("atcRedesignId_btn"))
    }

    async getListOfDropdownMenus() {
        const productOptionsPanel = await driver.findElement(By.className('nonActPanel'));
        return await productOptionsPanel.findElements(By.css("select"))
    }

    async getNumberOfDropdownMenus() {
        const productOptionsPanel = await driver.findElement(By.className('nonActPanel'));
        const list = await productOptionsPanel.findElements(By.xpath(".//select"))
        return list.length;
    }

    async getGotoCartBtn() {
        const dialog = await driver.findElement(By.xpath("//div[@role='dialog']"))
        return await dialog.findElement(By.xpath("//a[contains(@class, 'btn-scnd')]"))
    }

    async returnItemNumber() {
        return await (await this.getItemNumberComponent()).getText()
    }

    async selectFirstOption(dropDown) {
        const options = await dropDown.findElements(By.css('option'))  // dropdown is no longer valid?
        options.map(async (option) => {
            const text = await option.getText()
         })
        await options[1].click()
    }

    async selectFirstItemInEachDropDown() {
        const length = await this.getNumberOfDropdownMenus();
        const productOptionsPanel = await driver.findElement(By.className('nonActPanel'));

        for (var i=1; i<length+1; i++) {
            await this.selectFirstOption(await productOptionsPanel.findElement(By.xpath(`(.//select)[${i}]`)))
        }
    }

    async clickAddToCartBtn() {
        await (await this.getAddToCartBtn()).click()
    }

    async clickGotoCartBtn() {
        await (await this.getGotoCartBtn()).click()
    }

    async scrollIntoViewItemNumber() {
        const itemNum = await this.getItemNumberComponent()
        await this.driver.executeScript("arguments[0].scrollIntoView(false);", itemNum);
    }
}


module.exports = { ebayProductDetails }