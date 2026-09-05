import { test, expect } from "@playwright/test"
import { openNewPage } from "../../helpers/newPageHelper.ts";
import { expectNotOverflow } from "../../helpers/isOverflowHelper.ts";

test("Verify ACCORDION & TEXT EFFECTS page", async ({ page, context }) => {
    const accordionPage = await openNewPage(
        page,
        context,
        page.getByRole('link', { name: 'ACCORDION & TEXT EFFECTS' })
    );

    // const startDate = Date.now();

    await expect(accordionPage.locator('#text-appear-box')).toHaveText(`LOADING.. PLEASE WAIT..`);


    const accordionArray = [
        { accordionSelector: accordionPage.locator('#manual-testing-accordion'), accordionSelectorP: accordionPage.locator('#manual-testing-description'), accordionTitle: "Manual Testing", accordionContent: "Manual testing has for some time been the most popular way to test code. For this method, the tester plays an important role of end user and verifies that all the features of the application work correctly. Manual testing however is on the decline. Companies and developers have realised the efficiency, accuracy and cost savings that is possible by adopting the use of automation testing." },
        { accordionSelector: accordionPage.locator('#cucumber-accordion'), accordionSelectorP: accordionPage.locator('#cucumber-testing-description'), accordionTitle: "Cucumber BDD", accordionContent: "Cucumber (BDD) simplifies the requirement capturing process. Requirements can be captured, broken down and simplified effortlessly; making the captured requirements readable to anyone within the organisation and in turn providing the required details and backbone to develop accurate test cases also known as ‘Feature Files’." },
        { accordionSelector: accordionPage.locator('#automation-accordion'), accordionSelectorP: accordionPage.locator('#automation-testing-description'), accordionTitle: "Automation Testing", accordionContent: "Automation testing has been steadily grown in popularity these past few years thanks to the time/ cost savings and efficiency that it offers. Companies throughout the world have or plan to use automation testing to rapidly speed up their test capabilities. Automation test engineers are in great demand and offer an average salary of £45,000+ (2018). Now is a great time to learn about automation test engineering and this course has been carefully developed to slowly introduce you from the basics, all the way to building advanced frameworks." },
    ];

    for (let i = 0; i < accordionArray.length; i++) {
        const accordionButtonLocator = accordionArray[i].accordionSelector;

        await expect(accordionButtonLocator).toHaveText(accordionArray[i].accordionTitle);
        await expect(accordionButtonLocator).toHaveClass(/accordion/);
        await accordionButtonLocator.click();

        await expect(accordionArray[i].accordionSelectorP).toHaveText(accordionArray[i].accordionContent);
        // await expectNotOverflow(accordionArray[i].accordionSelectorP, accordionPage);

        await expect(accordionButtonLocator).toHaveClass(/accordion active/);
        await accordionButtonLocator.click();
        await expect(accordionButtonLocator).toHaveClass(/accordion/);
        // console.log("Iteration #" + i + " is completed");
    };


    // check last element
    await expect(accordionPage.locator('#click-accordion')).toHaveText(`Keep Clicking! - Text will Appear After 5 Seconds!`);
    const clickAccordion = accordionPage.locator('#click-accordion');
    await clickAccordion.click();
    await expect(await accordionPage.locator('#timeout')).toHaveText(``);
    await clickAccordion.click();
    await expect(accordionPage.locator('#text-appear-box')).toHaveText(`LOADING COMPLETE.`, { timeout: 20000 });
    // const endDate = Date.now();
    // const elapsed = endDate - startDate;
    // console.log(`Time passed: ${elapsed} ms`);
    await expect(clickAccordion).toHaveClass(/accordion/);
    await clickAccordion.click();
    await expect(clickAccordion).toHaveClass(/accordion active/);
    await expect(await accordionPage.locator('#timeout')).toHaveText(`This text has appeared after 5 seconds!`);

    console.log(`The \"Verify ACCORDION & TEXT EFFECTS page\" test is successful`);
})