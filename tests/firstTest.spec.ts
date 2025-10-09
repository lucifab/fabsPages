
import { test, expect } from '@playwright/test'

test('Title of the page', async ({ page }) => {
    await page.goto('http://localhost:4200/blog');
    await expect(page).toHaveTitle(/FabsPage/);
});

test.describe('Writing Page', () => {
    test('if no content or title exists, warn information as missing', async ({ page }) => {
        await page.goto('http://localhost:4200/publish');
        await page.getByText('Preview').click();
        expect(page.getByText('Missing information: Title, Content'));
    })

})