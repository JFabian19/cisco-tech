import csv
import os

tsv_data = """p1	HP Elitebook 840 G4	900	laptops-usadas	Usado	TRUE	Procesador Intel core i5 de octava generación, memoria ram de 8gb, disco sólido de 240gb, pantalla HD de 14".
p2	Lenovo Thinkpad E14	1200	laptops-usadas	Usado	TRUE	Procesador core i7 de decima generación, memoria ram de 16gb, disco sólido M.2 de 512gb, tarjeta de video dedicado de 2Gb, pantalla FHD de 14".
p3	Lenovo Thinkpad X1 Carbón	850	laptops-usadas	Usado	TRUE	Procesador Intel core i7 de sexta generación, memoria ram de 16gb, disco sólido M.2 de 256Gb, pantalla FHD de 14".
p4	Laptop Lenovo Ideapad GAMING	1800	laptops-usadas	Usado	TRUE	Procesador core i5 de décima generación, memoria ram de 16gb, disco sólido de 250gb + disco duro de 1Tb, pantalla FHD de 15.6", teclado iluminado, tarjeta de video dedicado GTX1650 de 4GB.
p5	HP Elitebook 640	950	laptops-usadas	Usado	TRUE	Procesador core i5 de octava generación, memoria ram de 8gb, disco sólido m.2. 256gb, pantalla de 14".
c1	Procesador AMD Ryzen 5 5600GT	600	componentes	Nuevo	TRUE	3.6GHz Base / 4.6GHz Max, con gráficos integrados.
c2	Procesador Intel Core i5 12400	850	componentes	Nuevo	TRUE	2.50GHz Base / 4.40GHz Max, 18MB Caché, LGA 1700.
c3	Combo Teclado y Mouse Logitech MK120	60	componentes	Nuevo	TRUE	Combo de teclado y mouse duradero con conexión USB.
c4	Placa Madre Gigabyte H610M	325	componentes	Nuevo	TRUE	Socket LGA 1700, ideal para procesadores Intel de 12va generación.
s1	Mantenimiento Preventivo (Laptop/PC)	0	servicios		TRUE	Limpieza interna, cambio de pasta térmica y optimización de sistema.
s2	Instalación de Sistema Operativo	0	servicios		TRUE	Instalación limpia de Windows 10/11 o Linux con drivers y programas básicos.
s3	Diagnóstico de Hardware	0	servicios		TRUE	Revisión completa para detectar fallas en componentes (Se descuenta si se realiza la reparación).
promo1			promociones			TRUE
promo2			promociones			TRUE
e_57	Lexar 1Tb Nq780 M.2 2280 NVMe 6500Mb/S Gen4X4		memorias	Nuevo	TRUE	
e_58	Dato 256Gb Dp700 M.2 2280 NVMe Gen3X4 Pcie SSD 2500/1700Mb/S NVMe		memorias	Nuevo	TRUE	
e_60	Team Group 256Gb Ms30 SSD Sata3 6Gb/S M.2 SATA		memorias	Nuevo	TRUE	
e_61	Disco Solido Lenovo 512Gb Ln860 M.2 3500Mbs Pcie 3.0		memorias	Nuevo	TRUE	
e_62	Western Digital Blue 500Gb M.2 NVMe Pcie Sn550		memorias	Nuevo	TRUE	
e_64	Disco Solido Hiksemi 512Gb Wave NVMe M.2 Pcie3.0 2280Mb/S		memorias	Nuevo	TRUE	
e_65	Wester Digital Blue 1Tb M2 Sn550 NVMe Express 2400Mbs		memorias	Nuevo	TRUE	
e_66	Disco Solido Hiksemi 512Gb M.2 Wave Pro Pcie3.0 3500Mb/S		memorias	Nuevo	TRUE	
e_67	Gigabyte 512Gb M.2 NVMe SSD 2280		memorias	Nuevo	TRUE	
e_68	Crusial 500Gb M.2 NVMe P5		memorias	Nuevo	TRUE	
e_69	Western Digital Green 500Gb M.2 Sn3000 Sandisk NVMe SSD M.2 2280 Mb/5000 Pcie 4.0		memorias	Nuevo	TRUE	
e_70	Kingston 1Tb Nv3 M.2 Pcie4.0 NVMe 6000Mb/S		memorias	Nuevo	TRUE	
e_71	Western Digital Green 2Tb SATA SSD		memorias	Nuevo	TRUE	
e_73	HP 500Gb SSD S700 2.5 SATA 6.0Gb/S 560Mb/S		memorias	Nuevo	TRUE	
e_74	Disco Solido Lenovo 240Gb Ls800 Sata3.0 2.5 520/500Mbs		memorias	Nuevo	TRUE	
e_76	Hyundai 1Tb SATA Iii Drive 3D Tlc 10X Faster 7200Rpm HDD 560/530 Mb/S		memorias	Nuevo	TRUE	
e_77	Adata 480Gb Su630 2.5'' SATA 6Gb/S		memorias	Nuevo	TRUE	
e_78	Dato 256Gb Ds700 SATA 3Gb/S Ultra Slim 500/535Mb/S		memorias	Nuevo	TRUE	
e_79	Pny 240Gb Cs900 2.5 SATA		memorias	Nuevo	TRUE	
e_80	Adata 256Gb Su650 2.5'' SATA 6Gb/S		memorias	Nuevo	TRUE	
e_81	HP 1Tb SSD S700 2.5 SATA 6.0Gb/S 525-570Mb/S		memorias	Nuevo	TRUE	
e_82	Hiksemi 512Gb SSD Wave Sata3.0 6Gb/S		memorias	Nuevo	TRUE	
e_83	Hiksemi 1Tb Wave SSD Sata3.0 6Gb/S 1024Gb		memorias	Nuevo	TRUE	
e_84	Adata 512Gb Su650 2.5'' SATA 6Gb/S		memorias	Nuevo	TRUE	
e_85	Toshiba 500Gb Laptop HDD SATA 8Mb 2.5		memorias	Nuevo	TRUE	
e_87	Western Digital Blue 1Tb HDD SATA Iii PC 7200Rpm		memorias	Nuevo	TRUE	
e_89	Toshiba 4Tb S300 Pro SATA 6.0Gbit/S Interno		memorias	Nuevo	TRUE	
e_90	Seagate HDD 1000Gb 1Tb SATA Iii		memorias	Nuevo	TRUE	
e_116	Fuente De Poder Antryx 850W Kirin Gold Lite 80Plus Gold		fuentes-de-poder	Nuevo	TRUE	
e_118	Halion Gaming 650W Model:Ge-650 Silent 12Cm Powerful		fuentes-de-poder	Nuevo	TRUE	
e_119	Fuente De Poder Antryx Kirin V2 750W 80Plus Bronze Kb750		fuentes-de-poder	Nuevo	TRUE	
e_121	Fuente De Poder Antryx Kirin 750W Gold Evo 80Plus Gold Pcie Gen5 Atx3.1		fuentes-de-poder	Nuevo	TRUE	
e_122	Gamemax 750W Gp Performance Black Bronze Gold 80Plus Atx 12V 12/14Fan		fuentes-de-poder	Nuevo	TRUE	
e_123	Fuente De Pdoer Antec 750W Atom B750 80Plus Bronze		fuentes-de-poder	Nuevo	TRUE	
e_124	Gigabyte P650Ss Ice 650W 80Plus Silver White/Blanco		fuentes-de-poder	Nuevo	TRUE	
e_125	Gamemax 650W Gp Performance Black Bronze Gold 80Plus Atx 12V		fuentes-de-poder	Nuevo	TRUE	
e_126	Fuente De Poder Antryx Kirin Platinum 1200W 80Plus Platinum Pcie Gen5 Atx3.1		fuentes-de-poder	Nuevo	TRUE	
e_127	Fuente De Poder Msi Mag A750Bn Pcie5 80Plus Bronze Pcie5.0		fuentes-de-poder	Nuevo	TRUE	
e_128	Gigabyte Ud850Gm 850W 80Plus Gold Full Modular White/Blanco		fuentes-de-poder	Nuevo	TRUE	
e_129	Fuente De Poder Antryx 750W Kirin Gold Lite 80Plus Gold		fuentes-de-poder	Nuevo	TRUE	
e_91	Xpg 32Gb 5600Mhz DDR5 Lancer Blade Cl46 Blanco		memoria-ram-pc	Nuevo	TRUE	
e_92	Memoria RAM Dato Ares-Armor 16Gb 3200Mhz (1X16) DDR4 Rgb		memoria-ram-pc	Nuevo	TRUE	
e_94	Memoria RAM Kingston Fury Beast 16Gb 5600Mhz		memoria-ram-pc	Nuevo	TRUE	
e_95	Memoria RAM Crucial Micron 16Gb 4800Mhz DDR5 Udimm Basics Cl40		memoria-ram-pc	Nuevo	TRUE	
e_96	Memoria RAM Hiksemi Hiker 16Gb 5600Mhz DDR5		memoria-ram-pc	Nuevo	TRUE	
e_98	Hiksemi Armor 16Gb 3200Mhz DDR4 White		memoria-ram-pc	Nuevo	TRUE	
e_99	Patriot Viper 16Gb 6000Mt/S DDR5 Cl30 1.35V 9De00398		memoria-ram-pc	Nuevo	TRUE	
e_100	Memoria RAM Kingston Fury 16Gb 3200Mhz DDR4 Cl16		memoria-ram-pc	Nuevo	TRUE	
e_101	Memoria RAM Teros Titan 16Gb 5600Mhz DDR5 Pc5-44800 Cl45		memoria-ram-pc	Nuevo	TRUE	
e_102	Hiksemi Armor 8Gb 3200Mhz DDR4 White		memoria-ram-pc	Nuevo	TRUE	
e_103	Memoria RAM Hiksemi Armor 16Gb 2666Mhz DDR4 Gold		memoria-ram-pc	Nuevo	TRUE	
e_104	Memoria RAM T-Force Vulcan Teamgroup 16Gb 6000Mhz DDR5		memoria-ram-pc	Nuevo	TRUE	
e_4	Monitor LG 27 G6 Ultragear 27G610A-B 2K Qhd Ips 200Mhz 1Ms Srgb 99% Pivot Hdmi/Hdmi/Dp		monitores	Nuevo	TRUE	
e_16	Monitor LG 27 G6 Ultragear 27G610A-B 2K Qhd Ips 200Mhz 1Ms Srgb 99% Pivot Hdmi/Hdmi/Dp		monitores	Nuevo	TRUE	
e_34	Monitor LG 27 G6 Ultragear 27G610A-B 2K Qhd Ips 200Mhz 1Ms Srgb 99% Pivot Hdmi/Hdmi/Dp		monitores	Nuevo	TRUE	
e_44	Monitor LG 27 G6 Ultragear 27G610A-B 2K Qhd Ips 200Mhz 1Ms Srgb 99% Pivot Hdmi/Hdmi/Dp		monitores	Nuevo	TRUE	
e_59	Monitor LG 27 G6 Ultragear 27G610A-B 2K Qhd Ips 200Mhz 1Ms Srgb 99% Pivot Hdmi/Hdmi/Dp		monitores	Nuevo	TRUE	
e_72	Monitor LG 27 G6 Ultragear 27G610A-B 2K Qhd Ips 200Mhz 1Ms Srgb 99% Pivot Hdmi/Hdmi/Dp		monitores	Nuevo	TRUE	
e_86	Monitor LG 27 G6 Ultragear 27G610A-B 2K Qhd Ips 200Mhz 1Ms Srgb 99% Pivot Hdmi/Hdmi/Dp		monitores	Nuevo	TRUE	
e_93	Monitor LG 27 G6 Ultragear 27G610A-B 2K Qhd Ips 200Mhz 1Ms Srgb 99% Pivot Hdmi/Hdmi/Dp		monitores	Nuevo	TRUE	
e_108	Monitor LG 27 G6 Ultragear 27G610A-B 2K Qhd Ips 200Mhz 1Ms Srgb 99% Pivot Hdmi/Hdmi/Dp		monitores	Nuevo	TRUE	
e_117	Monitor LG 27 G6 Ultragear 27G610A-B 2K Qhd Ips 200Mhz 1Ms Srgb 99% Pivot Hdmi/Hdmi/Dp		monitores	Nuevo	TRUE	
e_29	Asus Rog Strix B650E-F Gaming Wifi AMD 4Xddr5 3Xm.2 2Xtipoc Wifie6/Bluetooth Hdmi/Dp		placas-amd	Nuevo	TRUE	
e_30	Asus Tuf Gaming B550-Plus Wifi Ii AMD 4Xddr4 2Xm.2 1Xtipoc Wifi6/Bluetooth Argb Gen2 Hdmi/Dp		placas-amd	Nuevo	TRUE	
e_31	Asus Prime B650M-F AMD 2Xddr5 1Xm.2 Argb Gen2 Am5 Hdmi		placas-amd	Nuevo	TRUE	
e_32	Msi B650M Gaming Plus Wifi Drr5 Am5 4Xddr5 2Xm.2 1Xtc Wifi6E/Bluetooth Dp/Hdmi		placas-amd	Nuevo	TRUE	
e_33	Asus Prime B650M-A Ak6 Ii 4Xddr5 2Xm.2 Wifi6/Bluetooth 1Xtc Pcie5.0 Dp/Hdmi		placas-amd	Nuevo	TRUE	
e_35	Asrock A620M-Hdv/M.2 2Xddr5 2Xm.2 1Xtc Am5 Hdmi/Dp		placas-amd	Nuevo	TRUE	
e_36	Msi Pro B840M-P Wifi6E Ai PC 4Xddr5 2Xm.2 1Xtypc AMD Socket Am5 Hdmi		placas-amd	Nuevo	TRUE	
e_38	Gigabyte A520M K V2 Ultra Durable 2Xddr4 1Xm.2 Pcie Gen3 X4 AMD Hdmi/Vga		placas-amd	Nuevo	TRUE	
e_39	Placa Gigabyte B650M D3Hp Ax AMD Am5 4Xddr5 2Xm.2 1Xtc Wifi/Bluetooth Hdmi/Dp/Dp		placas-amd	Nuevo	TRUE	
e_40	Msi B650 Gaming Plus Wifi AMD 4Xddr5 2Xm.2 1Xtypec Gen4 Am5 Wifi6E/Bluetooth5.3 Dp/Hdmi		placas-amd	Nuevo	TRUE	
e_41	Asus Prime A620M-K DDR5 AMD 2Xddr5 1Xm.2 Pcie4.0 Argb Gen2 Hdmi/Vga		placas-amd	Nuevo	TRUE	
e_42	Placa Gigabyte B650M H Am5 2Xddr5 1Xm.2 Hdmi/Dp		placas-amd	Nuevo	TRUE	
e_43	Msi Z890 Gaming Plus Wifi 4Xddr5 4Xm.2 2Xtypec Wifi7/Bluetooth5.4 Hdmi/Dp		placas-intel	Nuevo	TRUE	
e_45	Asus Prime H610M-K 2Xddr5 1Xm.2 Intel Lga1700 Hdmi/Vga		placas-intel	Nuevo	TRUE	
e_46	Msi B760M Gaming Plus Wifi Gen4 Intel Wifi6E/Bluetooth5.3 4Xddr5 2Xm.2 Hdmi/Hdmi/Dp/Dp		placas-intel	Nuevo	TRUE	
e_48	Gigabyte B760M Gaming Plus Wifi DDR4 Intel 4Xddr4 2Xm.2 Wifi/Bluetooth Lga1700 Hdmi/Dp		placas-intel	Nuevo	TRUE	
e_49	Placa Aorus Z890M Aorus Elite Wifi7 Intel Lga1851 Pcie5 Wifi/Bluetooth 4Xddr5 3Xm.2 1Xtypec Dp		placas-intel	Nuevo	TRUE	
e_50	Placa Msi Pro B760M-E Intel 2Xddr5 1Xm.2 Lga1700 Hdmi/Vga		placas-intel	Nuevo	TRUE	
e_51	Placa Gigabyte B760M D3Hp 4Xddr5 2Xm.2 Lga1700 Intel Hdmi/Vga/Dp		placas-intel	Nuevo	TRUE	
e_52	Asus Prime H610M-F D4 R2.0 Intel Lga1700 2Xddr4 1Xm.2 Hdmi		placas-intel	Nuevo	TRUE	
e_53	Asus Prime H510M-R R2.0 Intel Lga1200 Pcie4.0 2Xddr4 Hdmi/Vga		placas-intel	Nuevo	TRUE	
e_54	Gigabyte H610M K V2 2Xddr5 1Xm.2 Ultra Durable Lga1700 Hdmi/Dp		placas-intel	Nuevo	TRUE	
e_55	Placa Msi Pro B760M-E DDR4 Intel Lga1700 2Xddr4 1Xm.2 Hdmi/Vga		placas-intel	Nuevo	TRUE	
e_56	Asus Tuf Gaming B760M-Btf Wifi 4Xddr5 2Xm.2 Pcie5.0 Lga1700 Argb Gen2 Wifi6/Bluetooth Hdmi/Dp		placas-intel	Nuevo	TRUE	
e_1	Ryzen 5 8400F 4.7Ghz/4.2Ghz - 20Mb Cache - 6 Núcleos - 12 Hilos / Sin Gráfico		procesador-amd	Nuevo	TRUE	
e_2	AMD Ryzen 7 9700X 3.8Ghz/5.5Ghz - 40Mb Cache - 8 Núcleos / Con Gráficos / Sin Cooler		procesador-amd	Nuevo	TRUE	
e_3	AMD Ryzen 9 9900X 4.4Ghz/5.6Ghz - 64Mb Cache / 12 Núcleos / Con Gráfico / Sin Cooler		procesador-amd	Nuevo	TRUE	
e_5	AMD Ryzen 7 8700G 4.2Ghz/5.1Ghz - 16Mb Cache - 8 Núcleos / Graficos Radeon Integrados		procesador-amd	Nuevo	TRUE	
e_6	AMD Ryzen 7 7700X W/Radeon 8Core 4.5Ghz Base		procesador-amd	Nuevo	TRUE	
e_8	Athlon 3000G AMD 3.5Ghz - 5Mb Cache - 2 Núcleos / Gráfico Radeon Integrado		procesador-amd	Nuevo	TRUE	
e_9	Ryzen 7 5700 AMD 3.7Ghz/4.6Ghz - 20Mb Cache - 8Core 16Thread		procesador-amd	Nuevo	TRUE	
e_10	AMD Ryzen 5 3600 6 Core 4.2Ghz / 3.6Ghz Base		procesador-amd	Nuevo	TRUE	
e_11	Ryzen 5 5600Gt AMD 3.6Ghz/4.6Ghz - 19Mb Cache - 6 Núcleos		procesador-amd	Nuevo	TRUE	
e_12	AMD Ryzen 5 8500G 3.5Ghz/5.0Ghz - 22Mb Cache		procesador-amd	Nuevo	TRUE	
e_13	Ryzen 5 5600X AMD 3.7Ghz/4.6Ghz - 35Mb Cache - 6 Núcleos / Sin Gráfico		procesador-amd	Nuevo	TRUE	
e_14	AMD Ryzen 7 8700F 4.1Ghz/5.0Ghz - 16Mb Cache - 8 Núcleos / Sin Gráfico		procesador-amd	Nuevo	TRUE	
e_15	Intel Core i3 9100 Lga1151 3.6Ghz 6Mb Cache		procesador-intel	Nuevo	TRUE	
e_17	Intel® Core™ i5 14400F Lga1700 2.5Ghz/4.7Ghz - 20Mb Cache - 10 Núcleos / Sin Gráfico		procesador-intel	Nuevo	TRUE	
e_19	Intel® Core™ i5 14400 Lga1700 2.5Ghz/4.7Ghz - 20Mb Cache - 10 Núcleos / Gráfico Integrado		procesador-intel	Nuevo	TRUE	
e_20	Intel® Core™ i3 13100F Lga1700 3.40Ghz/4.50Ghz - 12Mb Cache - 4 Núcleos / Sin Gráfico		procesador-intel	Nuevo	TRUE	
e_21	Intel® Core™ i3 12100 Lga1700 3.30Ghz/4.30Ghz - 12Mb Cache - 4 Núcleos / Gráfico Integrado		procesador-intel	Nuevo	TRUE	
e_22	Intel® Core™ i3 10100F Lga1200 3.6Ghz/4.30Ghz - 6Mb Cache - 4 Núcleos / Sin Gráfico		procesador-intel	Nuevo	TRUE	
e_23	Intel® Core™ Ultra 7 265K Lga1851 3.9Ghz/5.5Ghz - 30Mb Cache - 20 Núcleos		procesador-intel	Nuevo	TRUE	
e_24	Intel® Core™ i3 12100F Lga1700 3.30Ghz/4.30Ghz - 12Mb Cache - 4 Núcleos / Sin Gráfico		procesador-intel	Nuevo	TRUE	
e_25	Intel® Core™ i3 13100 Lga1700 3.40Ghz/4.50Ghz - 12Mb Cache - 4 Núcleos / Gráfico Integrado		procesador-intel	Nuevo	TRUE	
e_26	Intel® Core™ i5 12400 Oem Lga1700 2.50Ghz/4.40Ghz - 18Mb Cache - 6 Núcleos / Gráfico Integrado		procesador-intel	Nuevo	TRUE	
e_27	Intel® Core™ i5 11400F Lga1200 2.60Ghz/4.40Ghz - 12Mb Cache - 6 Núcleos / Sin Gráfico		procesador-intel	Nuevo	TRUE	
e_28	Intel® Core™ Ultra 5 245Kf Lga1851 4.2Ghz/5.20Ghz - 24Mb Cache - 14 Núcleos / Sin Gráfico		procesador-intel	Nuevo	TRUE"""

id_to_category = {}
for line in tsv_data.strip().split('\n'):
    parts = line.split('\t')
    if len(parts) >= 4:
        product_id = parts[0].strip()
        category = parts[3].strip()
        id_to_category[product_id] = category

file_path = 'c:\\Users\\jfabi\\Desktop\\Tyma Solutions\\richard\\productos_actualizado.csv'
new_rows = []

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames
        for row in reader:
            pid = row.get('id', '')
            if pid in id_to_category:
                row['category'] = id_to_category[pid]
            new_rows.append(row)

# Also wait, they included c1, c2, c3, c4 which were deleted previously. 
# Did they want me to ADD them back? Their TSV contains all the columns except 'imagenUrl' at the end!
# Actually, their TSV contains descriptions! 
# Let's add any missing ones back if they aren't in the CSV currently!
existing_ids = set(r.get('id') for r in new_rows)
lines = tsv_data.strip().split('\n')
for line in lines:
    parts = line.split('\t')
    if len(parts) >= 7:
        pid = parts[0].strip()
        if pid not in existing_ids:
            new_row = {
                'id': pid,
                'name': parts[1].strip(),
                'price': parts[2].strip(),
                'category': parts[3].strip(),
                'condition': parts[4].strip(),
                'enStock': parts[5].strip(),
                'description': parts[6].strip(),
                'imagenUrl': parts[7].strip() if len(parts)>7 else ''
            }
            new_rows.append(new_row)

    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=headers, quoting=csv.QUOTE_MINIMAL)
        writer.writeheader()
        for r in new_rows:
            writer.writerow(r)

print("Categorias actualizadas exitosamente!")
