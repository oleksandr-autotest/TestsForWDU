import { test, expect } from "@playwright/test"


test("Verify CONTACT US page", async ({ page, context }) => {

    await page.goto('/index.html');
    const pagePromise = context.waitForEvent('page');
    await page.locator('#contact-us').click();
    const contactPage = await pagePromise;
    await contactPage.waitForLoadState('networkidle');
    
    const pageFields = [
        { selector: contactPage.getByPlaceholder("First Name"), value: "John"}
        { selector: contactPage.getByPlaceholder("Last Name"), value: "Doe"}
        { selector: contactPage.getByPlaceholder("Email Address"), value: "test@gmail.com"}
        { selector: contactPage.getByPlaceholder("Comments"), value: "This is a test comment"}
    ];


    await contactPage.getByPlaceholder("First Name").fill("John");
    await contactPage.getByPlaceholder("Last Name").fill("Doe");
    await contactPage.getByPlaceholder("Email Address").fill("test@gmail.com");
    await contactPage.getByPlaceholder("Comments").fill("This is a test comment.");
    await contactPage.getByRole("button", { name: "SUBMIT" }).click();
    await expect(contactPage.locator('text="Thank You for your Message!"')).toBeVisible();

})
