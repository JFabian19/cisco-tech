from bs4 import BeautifulSoup
import sys

def test_category():
    with open('category_html.txt', 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    prod_links = []
    
    # Try common PrestaShop/WooCommerce product classes
    for a in soup.find_all('a'):
        href = a.get('href', '')
        if 'product' in str(a.get('class', [])):
            prod_links.append(href)
    
    # Or just look for products
    products = soup.select('.product-title a, .product-miniature a.thumbnail')
    if not products:
        products = soup.select('.elementor-widget-theme-archive-title ~ div a')
        
    print("Found category products:", len(products))
    if products:
        print("First 3:", [p.get('href') for p in products[:3]])
    else:
        # Just find any a that looks like a product URL
        links = set()
        for a in soup.find_all('a'):
            href = a.get('href', '')
            if 'html' in href and 'corpmagicsystem' in href:
                links.add(href)
        print("All html links (potential products):", len(links))

def test_product():
    with open('product_html.txt', 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    name = soup.select_one('h1')
    print("h1 name:", name.text.strip() if name else "None")
    
    desc = soup.select_one('#description, .product-description, div[itemprop="description"]')
    print("desc length:", len(desc.text.strip()) if desc else 0)
    
    img = soup.select_one('meta[property="og:image"]')
    if not img:
         img = soup.select_one('.product-cover img, #bigpic')
    print("img:", img.get('content') if img and img.name == 'meta' else (img.get('src', '') if img else "None"))

if __name__ == '__main__':
    test_category()
    test_product()
