import { test, expect } from "@playwright/test"
import { openNewPage } from "../../helpers/newPageHelper.ts";


test("Verify CONTACT US page, negtive flow", async ({ page, context }) => {

    const contactPage = await openNewPage(page, context, page.locator('#contact-us'));
    const pageFields = [
        { selector: contactPage.getByPlaceholder("First Name"), value: "John" },
        { selector: contactPage.getByPlaceholder("Last Name"), value: "Doe" },
        { selector: contactPage.getByPlaceholder("Email Address"), value: "test@gmail.com" },
        { selector: contactPage.getByPlaceholder("Comments"), value: "This is a test comment" }
    ];

    for (let skipIndex = 0; skipIndex < pageFields.length; skipIndex++) {

        for (let i = 0; i < pageFields.length; i++) {
            if (i === skipIndex) continue;
            await pageFields[i].selector.fill(pageFields[i].value);
        }
        await contactPage.getByRole("button", { name: "SUBMIT" }).click();

        if (skipIndex === 2) {
            await expect(contactPage.locator('text="Error: all fields are required"')).toBeVisible();
            await expect(contactPage.locator('text="Error: Invalid email address"')).toBeVisible();

        } else {
            await expect(contactPage.locator('text="Error: all fields are required"')).toBeVisible();
        };
        await contactPage.locator(".eb.eb-retry").click();
        // console.log("Iteration #" + skipIndex + " is completed");
    }


    for (let i = 0; i < pageFields.length; i++) {
        await pageFields[i].selector.fill("");
    }
    await contactPage.getByRole("button", { name: "SUBMIT" }).click();
    await expect(contactPage.locator('text="Error: all fields are required"')).toBeVisible();
    await expect(contactPage.locator('text="Error: Invalid email address"')).toBeVisible();
    await contactPage.locator(".eb.eb-home").click();
    await expect(contactPage).toHaveURL('https://webdriveruniversity.com/index.html');

    await contactPage.close();
    await page.close();

    

})

test.afterAll(() => {
    console.log(`The \"Verify CONTACT US page, negtive flow\" test is successful`);
});

