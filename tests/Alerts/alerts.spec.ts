
import { expect, test } from '@playwright/test';

test("JavaScript Alert", async ({ page }) => {
    await page.goto('/Popup-Alerts/index.html');
    await expect(page.locator('#main-header')).toBeVisible();
    await expect(page.locator('#main-header')).toHaveText("Annoying Popup & Alerts!");

    await expect(page.locator('h2', { hasText: 'JavaScript Alert' })).toBeVisible();
    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe('I am an alert box!')
        await dialog.accept();

    });
    await page.locator('#button1').click();
})

test("JavaScript Confirm Box", async ({ page }) => {
    await page.goto('/Popup-Alerts/index.html');

    await expect(page.locator('h2', { hasText: 'JavaScript Confirm Box' })).toBeVisible();
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Press a button!')
        await dialog.accept();

    });
    await page.locator('#button4').click();
    await expect(page.locator('#confirm-alert-text')).toHaveText('You pressed OK!');
    // console.log(await page.locator('#confirm-alert-text').innerText());

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Press a button!')
        await dialog.dismiss();

    });
    await page.locator('#button4').click();
    await expect(page.locator('#confirm-alert-text')).toHaveText('You pressed Cancel!');
    // console.log(await page.locator('#confirm-alert-text').innerText());


})

test("Modal Popup", async ({ page }) => {
    await page.goto('/Popup-Alerts/index.html');
    await expect(page.locator('h2', { hasText: 'Modal Popup' })).toBeVisible();
   
    await page.locator('#button2').click();
    await expect(page.locator('.modal-content')).toBeVisible();
    await expect(page.locator('.modal-title')).toHaveText('It’s that Easy!! Well I think it is.....');
    await expect(page.locator('.modal-body')).toHaveText('We can inject and use JavaScript code if all else fails! Remember always try to use WebDriver Library method(s) first such as WebElement.click(). (The Selenium development team have spent allot of time developing WebDriver functions etc).');
    await expect(page.locator('.btn.btn-default', {hasText: 'Close'})).toBeVisible();
    await page.locator('.btn.btn-default', {hasText: 'Close'}).click();
    await expect(page.locator('.modal-content')).not.toBeVisible();
    

   
})

test("Ajax Loader", async ({ page }) => {
    await page.goto('/Popup-Alerts/index.html');
    await expect(page.locator('h2', { hasText: 'Ajax Loader' })).toBeVisible();
   
    await page.locator('#button3').click();
    await expect(page.locator('#loader')).toBeVisible();
    await page.waitForSelector('#loader', { state: 'hidden' });
    await expect(page.locator('#button1')).toHaveText('CLICK ME!');
    await expect(page.locator('#button1')).toBeVisible();
    await page.locator('#button1').click();
    await expect(page.locator('.modal-header', {hasText: 'Well Done For Waiting....!!!'})).toBeVisible();
    await expect(page.locator('.modal-body', {hasText: 'The waiting game can be a tricky one; this exercise will hopefully improve your understandings of the various types of waits.'})).toBeVisible();
    await page.locator('.btn.btn-default', {hasText: 'Close'}).click();
    await expect(page.locator('#button1')).toHaveClass('btn btn-default btn-lg dropdown-toggle clicked');

})