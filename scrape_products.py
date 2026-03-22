import asyncio
from playwright.async_api import async_playwright
import csv
from bs4 import BeautifulSoup
import re
import os

urls = [
    "https://corpmagicsystem.com/3743-procesador-amd",
    "https://corpmagicsystem.com/6445-procesador-intel",
    "https://corpmagicsystem.com/4218-placas-amd",
    "https://corpmagicsystem.com/4217-placas-intel",
    "https://corpmagicsystem.com/3787-disco-solido-m2",
    "https://corpmagicsystem.com/3738-disco-solido-sata",
    "https://corpmagicsystem.com/3751-discos-duros",
    "https://corpmagicsystem.com/3739-memoria-ram-pc",
    "https://corpmagicsystem.com/3753-memoria-ram-laptop",
    "https://corpmagicsystem.com/3744-fuentes-de-poder"
]

def clean_text(text):
    if not text: return ""
    return re.sub(r'\s+', ' ', text).strip()

async def main():
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context()
            page = await context.new_page()

            results = []
            
            for url in urls:
                category_name = url.split('-')[1:]
                category_name = " ".join(category_name).capitalize()
                print(f"Scraping category: {url}")
                await page.goto(url)
                await page.wait_for_timeout(3000)
                
                product_links = set()
                page_idx = 1
                while True:
                    content = await page.content()
                    soup = BeautifulSoup(content, 'html.parser')
                    
                    # Products usually have thumbnail class or are within the product list
                    for a in soup.select('div.products a.thumbnail, h2.product-title a, article.product-miniature a.thumbnail'):
                        href = a.get('href')
                        if href and href.endswith('.html'):
                            product_links.add(href)
                            
                    # Fallback if selectors fail just find any link that looks like product (id-name.html format)
                    if not product_links:
                        for a in soup.find_all('a'):
                            href = a.get('href', '')
                            if href.startswith('https://corpmagicsystem.com/') and href.endswith('.html'):
                                if '?' not in href and 'page=' not in href and 'controller=' not in href:
                                    product_links.add(href)
                    
                    # Check for next page
                    next_btn = soup.select_one('a.next.js-search-link')
                    if not next_btn:
                        next_btn = soup.select_one('.pagination a.next, a[rel="next"]')
                    
                    if next_btn and 'href' in next_btn.attrs and page_idx < 10:
                        page_idx += 1
                        print(f" -> Going to page {page_idx}")
                        await page.goto(next_btn['href'])
                        await page.wait_for_timeout(3000)
                    else:
                        break
                
                print(f"Found {len(product_links)} products in {url}")
                
                for p_url in product_links:
                    try:
                        await page.goto(p_url)
                        await page.wait_for_timeout(2000)
                        p_content = await page.content()
                        p_soup = BeautifulSoup(p_content, 'html.parser')
                        
                        name_el = p_soup.select_one('h1')
                        name = clean_text(name_el.text) if name_el else "Unknown"
                        
                        desc_el = p_soup.select_one('#description, .product-description, div[itemprop="description"], .tabs .tab-content')
                        desc = clean_text(desc_el.text) if desc_el else ""
                        
                        img_el = p_soup.select_one('meta[property="og:image"]')
                        if not img_el:
                            img_el = p_soup.select_one('.product-cover img, #bigpic')
                        
                        img = ""
                        if img_el:
                            if img_el.name == 'meta':
                                img = img_el.get('content', '')
                            else:
                                img = img_el.get('src', '')
                        
                        # Get better category from breadcrumbs
                        breadcrumbs = p_soup.select('ol.breadcrumb li')
                        cat = clean_text(breadcrumbs[-2].text) if len(breadcrumbs) >= 2 else category_name
                        
                        results.append({
                            'name': name,
                            'category': cat,
                            'descripcion': desc,
                            'imagen': img
                        })
                        print(f"  Scraped: {name}")
                    except Exception as e:
                        print(f"  Error on {p_url}: {e}")

            # Write to CSV
            output_path = os.path.join('c:\\Users\\jfabi\\Desktop\\Tyma Solutions\\richard', 'productos_extraidos.csv')
            with open(output_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=['name', 'category', 'descripcion', 'imagen'])
                writer.writeheader()
                for r in results:
                    writer.writerow(r)
            
            await browser.close()
            print("Done! Scraped completely.")
    except Exception as e:
        print("Fatal error:", e)

if __name__ == '__main__':
    asyncio.run(main())
