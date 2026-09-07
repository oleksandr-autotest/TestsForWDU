

import { expect, test } from '@playwright/test';

test("To do list", async ({ page }) => {
    // ui verification
    await page.goto('/To-Do-List/index.html');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#plus-icon')).toBeVisible();
    await expect(page.getByPlaceholder('Add new todo')).toBeVisible();
    await page.locator('#plus-icon').click();
    await expect(page.getByPlaceholder('Add new todo')).not.toBeVisible();
    await page.locator('#plus-icon').click();
    await expect(page.getByPlaceholder('Add new todo')).toBeVisible();

    // other tests
    const inputField = page.getByPlaceholder('Add new todo');
    for (let i = 0; i < 3; i++) {
        await inputField.fill('text ' + i);
        await inputField.press("Enter");
    }

    const listItems = page.locator("li");
    let count = await listItems.count();


    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
        texts.push(await listItems.nth(i).innerText());
    }

    for (let i = 0; i < count; i++) {
        await listItems.nth(i).click();
        await expect(listItems.nth(i)).toHaveAttribute('class', /completed/);
        await listItems.nth(i).click();
        await expect(listItems.nth(i)).toHaveAttribute('class', "");

    }

    //delete item and verify
    //unfortunately it is impossible to verify the accuracy of the deletion untill the unique item ID provided
    while (count > 0) {
        const random = Math.floor(Math.random() * count);
        const item = listItems.nth(random);

        if (count % 2 === 0) {
            await item.click();
            await expect(item).toHaveAttribute('class', /completed/);
        }

        await item.hover();
        const trashButton = item.locator('.fa.fa-trash');
        await expect(trashButton).toBeVisible();
        await trashButton.click();

        await expect(listItems).toHaveCount(count - 1);
        count--;
    }
})