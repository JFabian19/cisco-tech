import csv
import os
import json

csv_file = 'c:\\Users\\jfabi\\Desktop\\Tyma Solutions\\richard\\productos.csv'
ts_file = 'c:\\Users\\jfabi\\Desktop\\Tyma Solutions\\richard\\src\\data.ts'

if not os.path.exists(csv_file):
    print("CSV no existe")
    exit()

def get_str(row, key):
    # Try different cases/names for the same field
    val = row.get(key)
    if val is None:
        if key == 'imagenUrl':
            val = row.get('Image', '')
        elif key == 'Image':
            val = row.get('imagenUrl', '')
    
    return val.strip() if val else ''

def get_num(row, key):
    val = get_str(row, key)
    try:
        return float(val) if val else 0
    except:
        return 0

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    products = []
    
    # Check headers
    headers = reader.fieldnames
    img_key = 'Image' if 'Image' in headers else 'imagenUrl'
    
    for row in reader:
        stock_str = get_str(row, 'enStock').lower()
        img_url = get_str(row, img_key)
        
        # Mapea placeholders si no hay imagen
        if not img_url:
            cat = get_str(row, 'category').lower()
            if 'laptop' in cat:
                img_url = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800'
            elif 'procesador' in cat:
                img_url = 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800'
            elif 'plac' in cat or 'madre' in cat:
                img_url = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
            elif 'disco' in cat or 'memoria' in cat:
                img_url = 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800'
            elif 'monitor' in cat:
                img_url = 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800'
            elif 'fuente' in cat:
                img_url = 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800'
            elif 'servici' in cat:
                img_url = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800'
            else:
                img_url = 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800'

        products.append({
            "id": get_str(row, 'id'),
            "name": get_str(row, 'name'),
            "description": get_str(row, 'description'),
            "price": get_num(row, 'price'),
            "category": get_str(row, 'category'),
            "condition": get_str(row, 'condition') or 'Nuevo',
            "enStock": True if stock_str in ['true', 'yes', 'si', '1'] else False,
            "imageUrl": img_url
        })

ts_content = "import { Product } from './types';\n\nexport const products: Product[] = [\n"
rows_str = []
for p in products:
    rows_str.append(f"  {json.dumps(p, ensure_ascii=False)},")

ts_content += "\n".join(rows_str)
ts_content += "\n];\n"

with open(ts_file, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("data.ts actualizado correctamente usando productos.csv.")
