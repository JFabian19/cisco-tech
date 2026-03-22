import { Product } from '../types';

export function parseCSV(text: string): string[][] {
    const result: string[][] = [];
    let row: string[] = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        const nextC = text[i + 1];

        if (inQuotes) {
            if (c === '"' && nextC === '"') {
                cell += '"';
                i++; // skip next quote
            } else if (c === '"') {
                inQuotes = false;
            } else {
                cell += c;
            }
        } else {
            if (c === '"') {
                inQuotes = true;
            } else if (c === ',') {
                row.push(cell);
                cell = '';
            } else if (c === '\n' || c === '\r') {
                if (c === '\r' && nextC === '\n') {
                    i++;
                }
                row.push(cell);
                result.push(row);
                row = [];
                cell = '';
            } else {
                cell += c;
            }
        }
    }

    // push last row if not empty
    if (cell !== '' || row.length > 0) {
        row.push(cell);
        result.push(row);
    }
    return result;
}

export async function fetchProductsFromSheet(csvUrl: string): Promise<Product[]> {
    try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }
        const csvText = await response.text();
        const rows = parseCSV(csvText);

        if (rows.length < 2) return [];

        const headers = rows[0].map(h => h.toLowerCase().trim());

        // Map headers to indices
        const indices = {
            id: headers.findIndex(h => h === 'id'),
            titulo: headers.findIndex(h => h.includes('titulo') || h.includes('título') || h.includes('name')),
            descripcion: headers.findIndex(h => h.includes('descripcion') || h.includes('descripción') || h.includes('description')),
            precio: headers.findIndex(h => h.includes('precio') || h.includes('price')),
            enStock: headers.findIndex(h => h.includes('en stock') || h.includes('stock')),
            condicion: headers.findIndex(h => h.includes('usado o nuevo') || h.includes('condicion') || h.includes('condición') || h.includes('condition')),
            categoria: headers.findIndex(h => h.includes('categoria') || h.includes('categoría') || h.includes('category')),
            imagenUrl: headers.findIndex(h => h.includes('imagen') || h.includes('url') || h.includes('image')),
        };

        const products: Product[] = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            
            const isPromo = indices.categoria >= 0 && row[indices.categoria]?.toLowerCase().includes('promo');
            
            if (!row || row.length === 0 || (!row[indices.titulo] && !row[indices.precio] && !isPromo)) continue;

            const titulo = indices.titulo >= 0 ? row[indices.titulo]?.trim() : '';
            const descripcion = indices.descripcion >= 0 ? row[indices.descripcion]?.trim() : '';
            const precioStr = indices.precio >= 0 ? row[indices.precio]?.replace(/[^0-9.]/g, '') : '0';
            const precio = parseFloat(precioStr) || 0;

            const enStockRaw = indices.enStock >= 0 ? row[indices.enStock]?.trim().toLowerCase() : '';
            const enStock = !enStockRaw ? true : (enStockRaw === 'true' || enStockRaw === 'sí' || enStockRaw === 'si' || enStockRaw === '1');

            const condicion = indices.condicion >= 0 ? row[indices.condicion]?.trim() : 'Usado';

            let categoryStr = 'laptops-usadas';
            if (indices.categoria >= 0 && row[indices.categoria]) {
                categoryStr = row[indices.categoria].trim().toLowerCase();
            } else {
                // Infer from condition if missing entirely (optional fallback)
                if (condicion.toLowerCase().includes('nuevo') || condicion.toLowerCase().includes('nueva')) {
                    categoryStr = 'laptops-nuevas';
                }
            }
            
            // Map empty images based on category
            let imageUrl = indices.imagenUrl >= 0 ? row[indices.imagenUrl]?.trim() : '';
            if (!imageUrl) {
                if (categoryStr.includes('laptop')) {
                    imageUrl = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800';
                } else if (categoryStr.includes('procesador')) {
                    imageUrl = 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800';
                } else if (categoryStr.includes('plac') || categoryStr.includes('madre')) {
                    imageUrl = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800';
                } else if (categoryStr.includes('disco') || categoryStr.includes('memoria')) {
                    imageUrl = 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800';
                } else if (categoryStr.includes('monitor')) {
                    imageUrl = 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800';
                } else if (categoryStr.includes('fuente')) {
                    imageUrl = 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800';
                } else if (categoryStr.includes('servici')) {
                    imageUrl = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800';
                } else {
                    imageUrl = 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800';
                }
            }

            const customId = indices.id >= 0 ? row[indices.id]?.trim() : '';

            products.push({
                id: customId || `sheet-${i}`,
                name: titulo,
                description: descripcion,
                price: precio,
                category: categoryStr,
                imageUrl: imageUrl,
                condition: condicion,
                enStock: enStock
            });
        }

        return products;
    } catch (error) {
        console.error('Error fetching/parsing products sheet:', error);
        return [];
    }
}
