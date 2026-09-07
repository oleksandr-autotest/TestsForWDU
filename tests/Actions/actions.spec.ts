import { test, expect } from '@playwright/test';

test("Drag and drop", async ({ page }) => {
    await page.goto('/Actions/index.html');

    // test drag and drop

    const dragObject = page.locator('#draggable');
    let objectBox = await dragObject.boundingBox();
    const target = page.locator('#droppable');
    let targetBox = await target.boundingBox();

    if (!targetBox || !objectBox) throw new Error("no boxes!!! >_<");

    // sad flow

    await page.mouse.move(
        objectBox.x + objectBox.width / 2,
        objectBox.y + objectBox.height / 2
    );
    await page.mouse.down();

    const failBoxX = (targetBox.x - objectBox.width / 2) + objectBox.width * 0.45;
    const failBoxY = targetBox.y + targetBox.height / 2;

    await page.mouse.move(failBoxX, failBoxY);
    await page.mouse.up();
    await expect(target).toHaveText("DROP HERE!");

    // happy flow
    objectBox = await dragObject.boundingBox();
    targetBox = await target.boundingBox();
    if (!targetBox || !objectBox) throw new Error("no boxes!!! >_<");

    await page.mouse.move(
        objectBox.x + objectBox.width / 2,
        objectBox.y + objectBox.height / 2
    );
    await page.mouse.down();

    const randomBoxX = targetBox.x + (objectBox.width / 2) + Math.random() * (targetBox.width - objectBox.width / 2);
    const randomBoxY = targetBox.y + (objectBox.height / 2) + Math.random() * (targetBox.height - objectBox.height / 2);

    await page.mouse.move(randomBoxX, randomBoxY);
    await page.mouse.up();

    await expect(target).toHaveText("Dropped!");
})

test("Double click", async ({ page }) => {
    await page.goto('/Actions/index.html');

    const doubleClickArea = page.locator('#double-click');
    await expect(doubleClickArea).toHaveClass('div-double-click');
    doubleClickArea.dblclick();
    await expect(doubleClickArea).toHaveClass('div-double-click double');

})

test("Click and hold", async ({ page }) => {
    await page.goto('/Actions/index.html');
    const clickAndHoldArea = page.locator('#click-box');
    const box = await clickAndHoldArea.boundingBox();
    if (!box) throw new Error("no box!!! >_<");

    await expect(clickAndHoldArea).toHaveText('Click and Hold!');

    const randomX = box.x + Math.random() * box.width;
    const randomY = box.y + Math.random() * box.height;
    await page.mouse.move(randomX, randomY);
    await page.mouse.down();
    await expect(clickAndHoldArea).toHaveText('Well done! keep holding that click now.....');
    await page.waitForTimeout(3000);
    await expect(clickAndHoldArea).toHaveText('Well done! keep holding that click now.....');
    await page.mouse.up();
    await expect(clickAndHoldArea).toHaveText('Dont release me!!!');

})

test("Hover over element", async ({ page }) => {
    await page.goto('/Actions/index.html');

    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe("Well done you clicked on the link!");
        await dialog.accept();
    });

    //first
    const dropDownMenu1 = page.locator('.dropbtn', { hasText: 'Hover Over Me First!' });
    const box = await dropDownMenu1.boundingBox();
    if (!box) throw new Error("no box!!! >_<");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);


    const dropDownContent1 = page.getByText('Link 1').nth(0);
    await expect(dropDownContent1).toBeVisible();

    

    await dropDownContent1.click();


    //second
    const dropDownMenu2 = page.locator('.dropbtn', { hasText: 'Hover Over Me Second!' });

    const box2 = await dropDownMenu2.boundingBox();
    if (!box2) throw new Error("no box!!! >_<");
    await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2);


    const dropDownContent2 = page.getByText('Link 1').nth(1);
    await expect(dropDownContent2).toBeVisible();


    await dropDownContent2.click();


    //third\
    const dropDownMenu3 = page.locator('.dropbtn', { hasText: 'Hover Over Me Third!' });
    const box3 = await dropDownMenu3.boundingBox();
    if (!box3) throw new Error("no box!!! >_<");
    const dropDownContent3 = page.getByText('Link 1').nth(2);
    const dropDownContent4 = page.getByText('Link 2').nth(0);

    await page.mouse.move(box3.x + box3.width / 2, box3.y + box3.height / 2);
    await expect(dropDownContent3).toBeVisible();
    await expect(dropDownContent4).toBeVisible();
    await dropDownContent3.click();
    
    await page.mouse.move(box3.x + box3.width / 2, box3.y + box3.height / 2);
    await expect(dropDownContent3).toBeVisible();
    await expect(dropDownContent4).toBeVisible();
    await dropDownContent4.click();

})