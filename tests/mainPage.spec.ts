import { test, expect } from '@playwright/test';

test('Verify main page', async ({ page }) => {
    await page.goto('/index.html');

    //check header
    await expect(page.locator('.navbar-brand')).toBeVisible();
    await expect(page.locator('.navbar-brand')).toHaveText('WebdriverUniversity.com');
    await expect(page.locator('.navbar-brand')).toHaveAttribute('href', 'index.html');
    console.log("Header text is: " + await page.locator('.navbar-brand').textContent());
    console.log("Header href is: " + await page.locator('.navbar-brand').getAttribute('href'));


    // check first title
    await expect(page.locator('.hero-eyebrow')).toBeVisible();
    await expect(page.locator('.hero-eyebrow')).toHaveText('A New Approach to Learning');
    console.log("1 title text is: " + await page.locator('.hero-eyebrow').textContent());

    //check second title
    const h1Locator = page
        .getByRole('heading', { level: 1 }).first()
        .filter({ hasText: 'Practise Test Automation on a Real Site' });
    await expect(h1Locator).toBeVisible();
    console.log("2 title text is: " + await h1Locator.textContent());

    //check third title
    await expect(page.locator('.hero-tagline')).toBeVisible();
    await expect(page.locator('.hero-tagline')).toHaveText('A free practice playground for Selenium, Playwright, Cypress and modern AI-assisted automation. Used by thousands of testers worldwide.');
    console.log("3 title text is: " + await page.locator('.hero-tagline').textContent());

    //check fourth title
    await expect(page.locator('.sales-flag')).toBeVisible();
    await expect(page.locator('.sales-flag')).toHaveText('Mega Sale · Up to 89% Off');
    console.log("4 title text is: " + await page.locator('.sales-flag').textContent());

    //check fifth title
    await expect(page.locator('.sales-headline')).toBeVisible();
    await expect(page.locator('.sales-headline')).toHaveText('🚀 Unlock Your Potential: Mega Sale – Up to 89% Off 🚀');
    console.log("5 title text is: " + await page.locator('.sales-headline').textContent());

    //check sixth title
    await expect(page.locator('.sales-subhead')).toBeVisible();
    await expect(page.locator('.sales-subhead')).toHaveText('⏰ Limited-time offer — Grab your course before it expires!');
    console.log("6 title text is: " + await page.locator('.sales-subhead').textContent());

    //check seventh title
    await expect(page.locator('.sales-trust')).toBeVisible();
    await expect(page.locator('.sales-trust')).toHaveText('👨‍🏫 102,000+ students • 12,500+ reviews • Learn from a Senior SDET');
    console.log("7 title text is: " + await page.locator('.sales-trust').textContent());

    //sales block start 

    //saeles block end


    //check eighth title
    const h2Locator = page
        .getByRole('heading', { level: 2 })
        .filter({ hasText: 'Test Automation Challenges' });
    await expect(h2Locator).toBeVisible();
    console.log("8 title text is: " + await h2Locator.textContent());

    //check ninth title
    await expect(page.locator('.section-header').locator('p')).toBeVisible();
    await expect(page.locator('.section-header').locator('p')).toHaveText('Pick a challenge below. Each opens in a new tab so your tests can keep running.');
    console.log("9 title text is: " + await page.locator('.section-header').locator('p').textContent());

    //chellenges block start

    //chellenges block end

    //footer
    await expect(page.locator('footer').locator('p')).toBeVisible();
    await expect(page.locator('footer').locator('p')).toHaveText('© WebDriverUniversity.com·Automationteststore');
    console.log("Footer text is: " + await page.locator('footer').locator('p').textContent());

    await expect(page.getByRole('link', { name: 'Automationteststore' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Automationteststore' })).toHaveAttribute('href', 'https://automationteststore.com/');
    console.log("Footer link text is: " + await page.getByRole('link', { name: 'Automationteststore' }).textContent());
    console.log("Footer link href is: " + await page.getByRole('link', { name: 'Automationteststore' }).getAttribute('href'));
    
});