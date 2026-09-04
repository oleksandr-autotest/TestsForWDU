import { Page, BrowserContext, Locator } from "@playwright/test";

export async function openNewPage( page: Page, context: BrowserContext, locator: Locator) {
  await page.goto('/index.html');

  const [currentPage] = await Promise.all([
    context.waitForEvent('page'),
    locator.click()
  ]);

  await currentPage.waitForLoadState('domcontentloaded');
  return currentPage;
}
