import { test, expect } from "@playwright/test"


test("Verify CONTACT US page", async ({ page, context }) => {

    await page.goto('/index.html');
    await expect(page.locator('#contact-us')).toBeVisible();

    const pagePromise = context.waitForEvent('page');
    await page.locator('#contact-us').click();
    const contactPage = await pagePromise;

    await contactPage.waitForLoadState('networkidle');

    //check header
    // wait for the page to load
    // const headerLocator = contactPage.locator('#nav-title');
    // await expect(headerLocator).toHaveScreenshot('header-desktop.png', {
    //     maxDiffPixels: 100
    // });

    console.log("Header text is: " + await contactPage.locator('.navbar-brand').textContent());
    console.log("Header href is: " + await contactPage.locator('.navbar-brand').getAttribute('href'));

    // Contact US
    const contactHeader = contactPage.getByRole('heading', { name: 'CONTACT US' });
    await expect(contactHeader).toBeVisible();
    console.log('Title text is: ', await contactHeader.textContent());

    //Fill the form
    await contactPage.getByPlaceholder("First Name").fill("John");
    await contactPage.getByPlaceholder("Last Name").fill("Doe");
    await contactPage.getByPlaceholder("Email Address").fill("test@gmail.com");
    await contactPage.getByPlaceholder("Comments").fill("This is a test comment.");
    await contactPage.getByRole("button", { name: "SUBMIT" }).click();
    await expect(contactPage.locator('text="Thank You for your Message!"')).toBeVisible();
    await expect(contactPage.locator('.home-btn')).toBeVisible();
    console.log("Button text is: ", await contactPage.locator('.home-btn').textContent());
    await contactPage.locator('.home-btn').click();
    await expect(contactPage).toHaveURL('https://webdriveruniversity.com/index.html')

})