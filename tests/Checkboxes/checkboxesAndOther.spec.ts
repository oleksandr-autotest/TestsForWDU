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


test("Test Radio Button(s)", async ({ page, context }) => {

  const checkboxesPage = await openNewPage(
    page,
    context,
    page.getByRole('link', { name: 'DROPDOWNS, CHECKBOXES & RADIOS' })
  );

  const radioButtons = [
    { locator: checkboxesPage.locator('input[type=radio][value="green"]'), value: "green" },
    { locator: checkboxesPage.locator('input[type=radio][value="blue"]'), value: "blue" },
    { locator: checkboxesPage.locator('input[type=radio][value="yellow"]'), value: "yellow" },
    { locator: checkboxesPage.locator('input[type=radio][value="orange"]'), value: "orange" },
    { locator: checkboxesPage.locator('input[type=radio][value="purple"]'), value: "purple" },
  ];

  for (let i = 0; i < radioButtons.length; i++) {
    const current = radioButtons[i];
    await current.locator.check();
    await expect(current.locator).toBeChecked();

    for (let j = 0; j < radioButtons.length; j++) {
      if (i === j) continue;
      await expect(radioButtons[j].locator).not.toBeChecked();
    }
  }
})


test("Test Dropdown Menu(s)", async ({ page, context }) => {

  const checkboxesPage = await openNewPage(
    page,
    context,
    page.getByRole('link', { name: 'DROPDOWNS, CHECKBOXES & RADIOS' })
  );

  const fruits = [
    { parent: checkboxesPage.locator('#dropdowm-menu-1'), children: ["JAVA", "C#", "Python", "SQL"], text: [""] },
    { parent: checkboxesPage.locator('#dropdowm-menu-2'), children: ["Eclipse", "Maven", "TestNG", "JUnit"] },
    { parent: checkboxesPage.locator('#dropdowm-menu-3'), children: ["HTML", "CSS", "JavaScript", "JQuery"] },
  ];

  for (let i = 0; i < fruits.length; i++) {
    const options = fruits[i].parent.locator('option');
    await expect(options).toHaveCount(fruits[i].children.length);

    for (let j = 0; j < fruits[i].children.length; j++) {
      const dropDownOption = fruits[i].children[j];
      fruits[i].parent.selectOption({label: dropDownOption})
      await expect (fruits[i].parent).toHaveValue(dropDownOption.toLocaleLowerCase());
    }
  }
})


test("Test Selected & Disabled - radio buttons", async ({ page, context }) => {

  const checkboxesPage = await openNewPage(
    page,
    context,
    page.getByRole('link', { name: 'DROPDOWNS, CHECKBOXES & RADIOS' })
  );

  const radioButtons = [
    { locator: checkboxesPage.locator('input[type=radio][value="lettuce"]') },
    { locator: checkboxesPage.locator('input[type=radio][value="cabbage"]') },
    { locator: checkboxesPage.locator('input[type=radio][value="pumpkin"]') },
  ];

  for (let i = 0; i < radioButtons.length; i++) {
    const current = radioButtons[i];

    if (await current.locator.isDisabled()) {
      await expect(current.locator).not.toBeChecked();
    } else {
      await current.locator.check();
      await expect(current.locator).toBeChecked();

      for (let j = 0; j < radioButtons.length; j++) {
        if (i === j) continue;
        await expect(radioButtons[j].locator).not.toBeChecked();
      }
    }
  }
})


test("Test Selected & Disabled - dropdowns", async ({ page, context }) => {

  const checkboxesPage = await openNewPage(
    page,
    context,
    page.getByRole('link', { name: 'DROPDOWNS, CHECKBOXES & RADIOS' })
  );

  const fruits = ["Apple", "Orange", "Pear", "Grape"];
  const drpDwn = checkboxesPage.locator('#fruit-selects');
  await expect(drpDwn.locator('option')).toHaveCount(fruits.length);

  const disabledOption = drpDwn.locator('option[value="orange"]')
  await expect(disabledOption).toBeDisabled();

  let defaultFruit = "Grape";

  for (const fruit of fruits) {
    if (fruit === 'Orange') {
      await expect(drpDwn).toHaveValue(defaultFruit.toLocaleLowerCase());
    } else {
      await drpDwn.selectOption({ label: fruit });
      await expect(drpDwn).toHaveValue(fruit.toLocaleLowerCase());
      defaultFruit = fruit;
    }
  }
})


test.afterAll(async ({}, testInfo) => {
  if (testInfo.workerIndex === 0) {
    console.log('All \"Dropdown Menu(s), Checkboxe(s) & Radio Button(s)\" tests are finished');
  }
});