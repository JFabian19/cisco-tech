import csv
import os
import requests
from bs4 import BeautifulSoup
import re
import urllib.parse
import json
import time

file_path = 'c:\\Users\\jfabi\\Desktop\\Tyma Solutions\\richard\\productos_actualizado.csv'

if not os.path.exists(file_path):
    print("El archivo no existe.")
    exit()

with open(file_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    headers = reader.fieldnames
    rows = list(reader)

def get_category_order(cat):
    cat = cat.lower()
    if 'laptop' in cat.lower():
        return (0, cat)
    elif 'servicio' in cat.lower():
        return (1, cat)
    else:
         return (2, cat)

rows.sort(key=lambda x: get_category_order(x.get('category', '')))

headers_req = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
}

for row in rows:
    if row.get('id', '').startswith('e_'):
        name = row.get('name', '')
        print(f"Buscando imagen para: {name} ...", end=" ")
        
        query = urllib.parse.quote_plus(name + " png")
        url = f"https://www.bing.com/images/search?q={query}&qft=+filterui:photo-photo"
        
        try:
            resp = requests.get(url, headers=headers_req, timeout=10)
            soup = BeautifulSoup(resp.text, 'html.parser')
            img_tag = soup.find('a', class_='iusc')
            if img_tag and img_tag.get('m'):
                m_data = json.loads(img_tag.get('m'))
                img_url = m_data.get('murl')
                row['imagenUrl'] = img_url
                print("OK")
            else:
                row['imagenUrl'] = ''
                print("Not found")
        except Exception as e:
             row['imagenUrl'] = ''
             print("Error:", e)
             
        time.sleep(0.5)

with open(file_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers, quoting=csv.QUOTE_MINIMAL)
    writer.writeheader()
    for r in rows:
        writer.writerow(r)

print("Actualización completada!")
