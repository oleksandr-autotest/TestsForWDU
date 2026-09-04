import { test, expect } from "@playwright/test"
import { openNewPage } from "../../helpers/newPageHelper.ts";

const negativeCases = [
    { id: 1, name: 'Empty fields', username: '', password: '' },
    { id: 2, name: 'Wrong cred', username: 'wrong', password: 'wrong' },
    { id: 3, name: 'Empty username', username: '', password: 'webdriver123' },
    { id: 4, name: 'Empty password', username: 'webdriver', password: '' },
    { id: 5, name: 'Special chars', username: '#$%^', password: '!@#$%^&*' },
    { id: 6, name: 'Very long text', username: 'sdfsdfsdfsdfsdfsdfsdsdfsdfsdfsdfsdfsdfsdfdfgdfgfdgfdgdfgdgdfgfdgdfgdfgfsdfsdfsdfsdfsdfsdfsdfdfgdfgfdgfdgdfgdgdfgfdgdfgdfgfsdfsdfsdfsdfsdfsdfsdfdfgdfgfdgfdgdfgdgdfgfdgdfgdfgffdfgdfgfdgfdgdfgdgdfgfdgdfgdfgf', password: 'sdfsdfsdfsdfsdfsdfsdfdfgdfgfdgfdgdfgdgdfgfdgdfgdfgfsdfsdfsdfsdfsdfsdfsdfdfgdfgfdgfdgdfgdgdfgfdgdfgdfgfsdfsdfsdfsdfsdfsdfsdfdfgdfgfdgfdgdfgdgdfgfdgdfgdfgfsdfsdfsdfsdfsdfsdfsdfdfgdfgfdgfdgdfgdgdfgfdgdfgdfgfsdfsdfsdfsdfsdfsdfsdfdfgdfgfdgfdgdfgdgdfgfdgdfgdfgfsdfsdfsdfsdfsdfsdfsdfdfgdfgfdgfdgdfgdgdfgfdgdfgdfgf' },
    { id: 7, name: 'Case sensitivity', username: 'WebDriver', password: 'WebDriver123' },
    { id: 8, name: 'Spaces', username: ' ', password: ' ' },

];

test.describe('Login nagative flow', () => {
    for (const TC of negativeCases) {
        test(TC.name, async ({ page, context }) => {
            const loginPage = await openNewPage(page, context, page.locator('#login-portal'));

            await loginPage.locator('#text').fill(TC.username);
            await loginPage.locator('#password').fill(TC.password);


            // alert validation
            let dialogMessage: string | null = null;
            loginPage.once('dialog', async dialog => {
                dialogMessage = dialog.message();
                await dialog.dismiss();
            });
            await loginPage.locator('#login-button').click();
            expect(dialogMessage).toBe('validation failed');


            // console.log(`dialogMessage is #${dialogMessage}`);
            console.log(`The 'Login nagative flow' #${TC.id} test is successful`);
        })
    }
    
})


// ********************************************************* // 
test("Login positive flow", async ({ page, context }) => {

    const loginPage = await openNewPage(page, context, page.locator('#login-portal'));

    await loginPage.locator('#text').fill('webdriver');
    await loginPage.locator('#password').fill('webdriver123');

    // alert validation
    let dialogMessage: string | null = null;
    loginPage.once('dialog', async dialog => {
        dialogMessage = dialog.message();
        await dialog.dismiss();
    });
    await loginPage.locator('#login-button').click();
    expect(dialogMessage).toBe('validation succeeded');

    // console.log(`dialogMessage is #${dialogMessage}`);

    await expect(loginPage.locator('#home-link')).toBeVisible();
    // console.log("Button text is: ", await loginPage.locator('#home-link').textContent());
    await loginPage.locator('#home-link').click();
    await expect(loginPage).toHaveURL('https://webdriveruniversity.com/index.html');

    console.log(`The \"Login positive flow\" test is successful`);


})