import { Product, Category } from '../types';

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
            titulo: headers.findIndex(h => h.includes('titulo') || h.includes('título') || h.includes('name')),
            descripcion: headers.findIndex(h => h.includes('descripcion') || h.includes('descripción')),
            precio: headers.findIndex(h => h.includes('precio')),
            enStock: headers.findIndex(h => h.includes('en stock') || h.includes('stock')),
            condicion: headers.findIndex(h => h.includes('usado o nuevo') || h.includes('condicion') || h.includes('condición')),
            categoria: headers.findIndex(h => h.includes('categoria') || h.includes('categoría')),
            imagenUrl: headers.findIndex(h => h.includes('imagen') || h.includes('url')),
        };

        const products: Product[] = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length === 0 || (!row[indices.titulo] && !row[indices.precio])) continue;

            const titulo = indices.titulo >= 0 ? row[indices.titulo]?.trim() : '';
            const descripcion = indices.descripcion >= 0 ? row[indices.descripcion]?.trim() : '';
            const precioStr = indices.precio >= 0 ? row[indices.precio]?.replace(/[^0-9.]/g, '') : '0';
            const precio = parseFloat(precioStr) || 0;

            const enStockStr = indices.enStock >= 0 ? row[indices.enStock]?.toLowerCase().trim() : 'true';
            const enStock = enStockStr === 'true' || enStockStr === 'sí' || enStockStr === 'si' || enStockStr === '1';

            const condicion = indices.condicion >= 0 ? row[indices.condicion]?.trim() : 'Usado';

            let category: Category = 'laptops-usadas';
            if (indices.categoria >= 0 && row[indices.categoria]) {
                const catStr = row[indices.categoria].toLowerCase();
                if (catStr.includes('nueva') || catStr.includes('nuevo')) category = 'laptops-nuevas';
                else if (catStr.includes('comp')) category = 'componentes';
                else if (catStr.includes('serv')) category = 'servicios';
            } else {
                // Infer from condition
                if (condicion.toLowerCase().includes('nuevo') || condicion.toLowerCase().includes('nueva')) {
                    category = 'laptops-nuevas';
                }
            }

            const imageUrl = indices.imagenUrl >= 0 ? row[indices.imagenUrl]?.trim() : '';

            products.push({
                id: `sheet-${i}`,
                name: titulo,
                description: descripcion,
                price: precio,
                category: category,
                imageUrl: imageUrl || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800',
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
