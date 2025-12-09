#!/usr/bin/env python3
"""
admin_cli.py

Simple local admin CLI to add products when you provide images, video, description and price.

Behavior:
- Copies provided image files into `uploads/` and returns URLs like `/uploads/<filename>`.
- If `data.db` exists, inserts the product into the SQLite `products` table and prints the inserted id.
- Otherwise, appends the product to `products.json` (creating the file if needed).

Usage examples:
  python admin_cli.py --name "Cargador UGREEN" --price 110000 --stock 10 --images "./myimg1.jpg,./myimg2.jpg" --video "https://youtu.be/XXX" --description "Descripción..."

This script is intended for local use. It does not expose any network services.
"""

import argparse
import json
import os
import shutil
import sqlite3
import time
from pathlib import Path

BASE = Path(__file__).resolve().parent
DB_PATH = BASE / 'data.db'
PRODUCTS_JSON = BASE / 'products.json'
UPLOADS = BASE / 'uploads'
UPLOADS.mkdir(exist_ok=True)


def copy_images(image_paths):
    urls = []
    for p in image_paths:
        p = Path(p).expanduser()
        if not p.exists():
            print(f'Warning: image not found: {p}')
            continue
        dest_name = f"{int(time.time())}_{p.name}"
        dest = UPLOADS / dest_name
        shutil.copy2(p, dest)
        urls.append(f"/uploads/{dest_name}")
    return urls


def insert_into_db(data):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    now = int(time.time())
    cur.execute('''INSERT INTO products (name,category,price,originalPrice,stock,available,freeShipping,image,additionalImages,description,shortDescription,variants,tags,features,categoryData,supplierInfo,sold,rating,reviews,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)''', (
        data.get('name'),
        data.get('category'),
        data.get('price'),
        data.get('originalPrice'),
        data.get('stock', 0),
        1 if data.get('available', True) else 0,
        1 if data.get('freeShipping', False) else 0,
        data.get('image'),
        json.dumps(data.get('additionalImages') or []),
        data.get('description'),
        data.get('shortDescription'),
        json.dumps(data.get('variants') or {}),
        json.dumps(data.get('tags') or []),
        json.dumps(data.get('features') or []),
        json.dumps(data.get('categoryData') or {}),
        json.dumps(data.get('supplierInfo') or {}),
        data.get('sold', 0),
        data.get('rating', 5),
        data.get('reviews', 0),
        now
    ))
    conn.commit()
    last = cur.lastrowid
    conn.close()
    return last


def append_to_products_json(data):
    items = []
    if PRODUCTS_JSON.exists():
        try:
            items = json.loads(PRODUCTS_JSON.read_text(encoding='utf-8'))
        except Exception:
            items = []
    # generate id as ms timestamp to avoid collisions
    data['id'] = int(time.time() * 1000)
    items.append(data)
    PRODUCTS_JSON.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding='utf-8')
    return data['id']


def build_product(args, image_urls):
    product = {
        'name': args.name,
        'category': args.category or 'sin-categoria',
        'price': args.price,
        'originalPrice': args.originalPrice or args.price,
        'stock': args.stock,
        'available': True if args.available else True,
        'freeShipping': True if args.freeShipping else False,
        'image': image_urls[0] if image_urls else None,
        'additionalImages': image_urls[1:] if len(image_urls) > 1 else [],
        'description': args.description or '',
        'shortDescription': args.shortDescription or (args.description[:160] if args.description else ''),
        'variants': {},
        'tags': args.tags.split(',') if args.tags else [],
        'features': args.features.split('|') if args.features else [],
        'categoryData': {},
        'supplierInfo': {
            'name': args.supplier_name or '',
            'url': args.supplier_url or '',
            'price': args.supplier_price or None,
            'notes': args.supplier_notes or ''
        },
        'sold': 0,
        'rating': args.rating or 5,
        'reviews': 0
    }
    # add video url if present
    if args.video:
        product['videoUrl'] = args.video
    return product


def parse_args():
    parser = argparse.ArgumentParser(description='Admin CLI: add products locally')
    parser.add_argument('--name', required=True)
    parser.add_argument('--category')
    parser.add_argument('--price', type=float, required=True)
    parser.add_argument('--originalPrice', type=float)
    parser.add_argument('--stock', type=int, default=10)
    parser.add_argument('--images', help='Comma-separated image file paths')
    parser.add_argument('--video', help='Video URL (YouTube/Vimeo)')
    parser.add_argument('--description', help='Long description')
    parser.add_argument('--shortDescription', help='Short description')
    parser.add_argument('--tags', help='Comma-separated tags')
    parser.add_argument('--features', help='Pipe-separated features (use |)')
    parser.add_argument('--supplier-url')
    parser.add_argument('--supplier-name')
    parser.add_argument('--supplier-price', type=float)
    parser.add_argument('--supplier-notes')
    parser.add_argument('--freeShipping', action='store_true')
    parser.add_argument('--available', action='store_true')
    parser.add_argument('--rating', type=float)
    return parser.parse_args()


def main():
    args = parse_args()
    image_list = []
    if args.images:
        image_list = [p.strip() for p in args.images.split(',') if p.strip()]

    image_urls = copy_images(image_list)
    product = build_product(args, image_urls)

    if DB_PATH.exists():
        try:
            pid = insert_into_db(product)
            print(f'Inserted product into DB with id {pid}')
            product['id'] = pid
        except Exception as e:
            print('Failed to insert into DB, falling back to products.json. Error:', e)
            pid = append_to_products_json(product)
            print(f'Appended product to products.json with id {pid}')
            product['id'] = pid
    else:
        pid = append_to_products_json(product)
        print(f'Appended product to products.json with id {pid}')
        product['id'] = pid

    print('\nProduct created:')
    print(json.dumps(product, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
