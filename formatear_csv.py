import csv
import os
import re

def fix_text(text):
    if not text:
        return text
    # Remove literal double quotes and convert commas to dots or spaces
    text = text.replace('"', '').replace(',', ' -')
    
    # Check if it's mostly uppercase
    if sum(1 for c in text if c.isupper()) > len(text) / 3:
        # Convert to Title Case
        text = text.title()
        # Fix common tech words
        tech_words = {'Amd': 'AMD', 'Intel': 'Intel', 'Hp': 'HP', 'Ssd': 'SSD', 'Hdd': 'HDD', 
                      'Ram': 'RAM', 'Ddr3': 'DDR3', 'Ddr4': 'DDR4', 'Ddr5': 'DDR5',
                      'Lg': 'LG', 'Usb': 'USB', 'Fhd': 'FHD', 'Hd': 'HD', 'Pc': 'PC',
                      'M.2': 'M.2', 'Wuxi': 'WUXGA', 'Oled': 'OLED', 'Ghz': 'GHz', 'Mhz': 'MHz',
                      'Sata': 'SATA', 'Nvm': 'NVMe', 'Nvme': 'NVMe', 'I3': 'i3', 'I5': 'i5', 'I7': 'i7'}
        words = text.split()
        for i, w in enumerate(words):
            if w in tech_words:
                words[i] = tech_words[w]
            elif w.upper() in [x.upper() for x in tech_words.values()]:
                match = [v for k, v in tech_words.items() if v.upper() == w.upper()]
                if match: words[i] = match[0]
        text = " ".join(words)
    return text

file_path = 'c:\\Users\\jfabi\\Desktop\\Tyma Solutions\\richard\\productos_actualizado.csv'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames
        rows = list(reader)

    # Modify rows Let's remove quotes, commas and fix case
    for row in rows:
        row['name'] = fix_text(row.get('name', ''))
        row['description'] = fix_text(row.get('description', ''))
        row['category'] = row.get('category', '').lower()

    # Sort by category Let's do it alphabetically
    rows.sort(key=lambda x: x.get('category', ''))

    # Write back
    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        # writer without quotes if not strictly necessary
        writer = csv.DictWriter(f, fieldnames=headers, quoting=csv.QUOTE_MINIMAL)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)
    print("El archivo ha sido modificado y agrupado por categoria.")
else:
    print("No se encontro el archivo")
