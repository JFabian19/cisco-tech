import csv
import os
import requests
from bs4 import BeautifulSoup
import urllib.parse
import json
import time
import re

file_path = 'c:\\Users\\jfabi\\Desktop\\Tyma Solutions\\richard\\productos_actualizado.csv'

if not os.path.exists(file_path):
    print("El archivo no existe.")
    exit()

with open(file_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    headers = reader.fieldnames
    rows = list(reader)

headers_req = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.5'
}

def clean_query(name):
    # Remove anything after a hyphen, slash, or comma
    name = re.split(r'[-/,]', name)[0].strip()
    return name

print("Iniciando búsqueda de imágenes cortas solo para componentes...")

for row in rows:
    category = row.get('category', '').lower()
    # Skip laptops and servicios
    if 'laptop' in category or 'servicio' in category:
        continue
        
    name = row.get('name', '')
    if not name: continue
        
    print(f"Buscando imagen para: {name[:40]}...", end=" ")
    
    short_query = clean_query(name) + " png"
    query_url_encoded = urllib.parse.quote_plus(short_query)
    
    url = f"https://www.bing.com/images/search?q={query_url_encoded}&qft=+filterui:photo-photo"
    
    try:
        resp = requests.get(url, headers=headers_req, timeout=10)
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        # Find all a.iusc mapping to images
        img_tags = soup.find_all('a', class_='iusc')
        
        found = False
        for img_tag in img_tags:
            if img_tag and img_tag.get('m'):
                m_data = json.loads(img_tag.get('m'))
                img_url = m_data.get('murl', '')
                if img_url and 'corpmagicsystem.com' not in img_url: # Do not pick the competitor
                    row['imagenUrl'] = img_url
                    print(f"OK ({img_url[:30]}...)")
                    found = True
                    break
        if not found:
             print("No se encontraron resultados sin la tienda original.")
    except Exception as e:
         print("Error de conexión:", e)
         
    time.sleep(0.5)

with open(file_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers, quoting=csv.QUOTE_MINIMAL)
    writer.writeheader()
    for r in rows:
        writer.writerow(r)

print("Actualización completada solo en componentes!")
