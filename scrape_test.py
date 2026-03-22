import asyncio
from playwright.async_api import async_playwright
import csv

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        # Visit first category
        await page.goto('https://corpmagicsystem.com/3743-procesador-amd')
        await page.wait_for_timeout(3000)
        content = await page.content()
        with open('category_html.txt', 'w', encoding='utf-8') as f:
            f.write(content)
        
        # We assume there's a specific product class, let's just get the first link that has /producto/ or just some link that is deep
        # To find an example product link, let's get all links
        links = await page.evaluate('''() => {
            return Array.from(document.querySelectorAll('a')).map(a => a.href).filter(href => href.includes('corpmagicsystem.com') && href.length > 40);
        }''')
        links = list(set([l for l in links if "page" not in l and "order=" not in l and "category=" not in l]))
        if links:
            # Let's say the first product link is the first one with a large length
            test_product = links[0]
            for l in links:
                if "procesador" in l and ".html" in l:
                    test_product = l
                    break
            
            await page.goto(test_product)
            await page.wait_for_timeout(3000)
            p_content = await page.content()
            with open('product_html.txt', 'w', encoding='utf-8') as f:
                f.write(p_content)
            print("Successfully saved html for testing. Product URL tested:", test_product)
        else:
            print("No links found!")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
