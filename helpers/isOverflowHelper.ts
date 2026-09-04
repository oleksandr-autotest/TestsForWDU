import { Locator, expect, Page } from "@playwright/test";

export async function expectNotOverflow(locator: Locator, page: Page) {
  // check vs conteiner
  const overflowInfo = await locator.evaluate(el => ({
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth,
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight
  }));

  if (overflowInfo.scrollWidth > overflowInfo.clientWidth || 
      overflowInfo.scrollHeight > overflowInfo.clientHeight) {
    console.log("⚠️ Overflow detected:", overflowInfo);
  }
  expect(overflowInfo.scrollWidth <= overflowInfo.clientWidth).toBeTruthy();
  expect(overflowInfo.scrollHeight <= overflowInfo.clientHeight).toBeTruthy();

  // check vs viewport
  const box = await locator.boundingBox();
  const viewport = page.viewportSize();

  if (box && viewport) {
    if (box.x + box.width > viewport.width || box.y + box.height > viewport.height) {
      console.log("⚠️ Element exceeds viewport:", { box, viewport });
    }
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
  }
}
