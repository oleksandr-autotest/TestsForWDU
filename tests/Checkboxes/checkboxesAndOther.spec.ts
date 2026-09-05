import { test, expect } from '@playwright/test';
import { openNewPage } from "../../helpers/newPageHelper.ts";

test("Dropdown Menu(s), Checkboxe(s) & Radio Button(s)", async ({ page, context }) => {

    const checkboxesPage = await openNewPage(
        page,
        context,
        page.getByRole('link', { name: 'DROPDOWNS, CHECKBOXES & RADIOS' })
    );

    await expect(checkboxesPage.locator('#main-header')).toHaveText(`Dropdown Menu(s), Checkboxe(s) & Radio Button(s)`);


    await checkboxesPage.waitForSelector('.thumbnail h2', { timeout: 15000 });
    const titles = checkboxesPage.locator('.thumbnail h2');
    await expect(titles).toHaveCount(4);
    await expect(titles.nth(0)).toHaveText(`Dropdown Menu(s)`);
    await expect(titles.nth(1)).toHaveText(`Checkboxe(s)`);
    await expect(titles.nth(2)).toHaveText(`Radio Button(s)`);
    await expect(titles.nth(3)).toHaveText(`Selected & Disabled`);

    await checkboxesPage.getByLabel('Option 3').click(); // reset all checkboxes to 0

 


    console.log(`The \"Dropdown Menu(s), Checkboxe(s) & Radio Button(s)\" test is successful`);
})

// verify checkboxes

const combinations = Array.from({ length: 1 << 4 }, (_, mask) =>
  mask.toString(2).padStart(4, '0')
);

for (const combo of combinations) {
  test(`Test checkboxes combo ${combo}`, async ({ page, context }) => {
    const checkboxesPage = await openNewPage(
      page,
      context,
      page.getByRole('link', { name: 'DROPDOWNS, CHECKBOXES & RADIOS' })
    );

    const checkboxes = checkboxesPage.locator('input[type="checkbox"]');
    const count = await checkboxes.count();

    for (let i = 0; i < count; i++) {
      const cb = checkboxes.nth(i);
      const shouldCheck = combo[i] === '1';

      if (shouldCheck) {
        await cb.check();
      } else {
        await cb.uncheck();
      }

      await expect(cb).toBeChecked({ checked: shouldCheck });
    }
  });
}

test("Test radio buttons", async ({ page, context }) => {

    const checkboxesPage = await openNewPage(
        page,
        context,
        page.getByRole('link', { name: 'DROPDOWNS, CHECKBOXES & RADIOS' })
    );


    



})