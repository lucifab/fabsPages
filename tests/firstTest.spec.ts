
import { test, expect, Locator } from '@playwright/test'

//This is a hook. Prevents repetitive code from being placed into the script
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
})

test('Title of the page', async ({ page }) => {
    await expect(page).toHaveTitle(/FabsPage/);
});

test.describe('Writing Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('write').click();

        const editor = await page.locator('.tox-editor-container');

        await expect(editor).toBeVisible();
    })
    test('if no content or title exists, warn information as missing', async ({ page }) => {
        await page.getByRole('button', { name: 'Preview' }).click();

        await expect(page.getByText('Missing information: Title, Content')).toBeVisible();
        // await page.locator('#myId');
    });
    test('typing on the editor',async ({page}) => {
        const text = "Testing information";
        const input =  page.locator('input.tox');
        await input.fill(text);
        await expect(input).toHaveValue(text);
    })
})