import csv
import os

def clean_category(cat):
    cat = cat.replace('chevron_right', '').strip()
    return cat.lower().replace(' ', '-')

# Read the original CSV
original_file = 'c:\\Users\\jfabi\\Desktop\\Tyma Solutions\\richard\\productos_actualizado.csv'
extracted_file = 'c:\\Users\\jfabi\\Desktop\\Tyma Solutions\\richard\\productos_extraidos.csv'

original_data = []

if os.path.exists(original_file):
    with open(original_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Check for formatting issues (extra commas in actualizados.csv)
            if None in row:
                # the last value was pushed to None key
                if isinstance(row[None], list) and row[None]:
                    row['imagenUrl'] = row[None][-1]
                del row[None]
            
            # We filter out the old "componentes" category
            if row.get('category') != 'componentes':
                original_data.append(row)

# Read the extracted CSV
extracted_data = []
if os.path.exists(extracted_file):
    with open(extracted_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        idx = 1
        for row in reader:
             cat = clean_category(row.get('category', ''))
             new_row = {
                 'id': f'e_{idx}',
                 'name': row.get('name', ''),
                 'price': '', # No price as requested
                 'category': cat,
                 'condition': 'Nuevo',
                 'enStock': 'TRUE',
                 'description': row.get('descripcion', ''),
                 'imagenUrl': row.get('imagen', '')
             }
             extracted_data.append(new_row)
             idx += 1

# Combine
combined_data = original_data + extracted_data

# Write back to productos_actualizado.csv
headers = ['id', 'name', 'price', 'category', 'condition', 'enStock', 'description', 'imagenUrl']

with open(original_file, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    for r in combined_data:
        writer.writerow(r)

print(f"Merge successful! Total combined items: {len(combined_data)}")
