#!/usr/bin/env python3
"""
Simple backend API for product management (Flask + SQLite)

Endpoints:
 - GET  /api/products
 - GET  /api/products/<id>
 - POST /api/products        (requires X-Admin-Token)
 - PUT  /api/products/<id>   (requires X-Admin-Token)
 - DELETE /api/products/<id> (requires X-Admin-Token)
 - POST /api/uploads        (multipart form, requires X-Admin-Token)

Run: python server_api.py
"""

from flask import Flask, request, jsonify, send_from_directory, g
import sqlite3
import os
import json
import time
from werkzeug.utils import secure_filename

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'data.db')
UPLOADS_DIR = os.path.join(BASE_DIR, 'uploads')
PRODUCTS_SEED = os.path.join(BASE_DIR, 'products.json')

# Simple admin token (change this before deploying)
ADMIN_TOKEN = os.environ.get('YUNGUER_ADMIN_TOKEN', 'changeme')

os.makedirs(UPLOADS_DIR, exist_ok=True)

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB_PATH)
        db.row_factory = sqlite3.Row
    return db

def init_db():
    db = get_db()
    cur = db.cursor()
    cur.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        category TEXT,
        price REAL,
        originalPrice REAL,
        stock INTEGER,
        available INTEGER,
        freeShipping INTEGER,
        image TEXT,
        additionalImages TEXT,
        description TEXT,
        shortDescription TEXT,
        variants TEXT,
        tags TEXT,
        features TEXT,
        categoryData TEXT,
        supplierInfo TEXT,
        sold INTEGER,
        rating REAL,
        reviews INTEGER,
        created_at INTEGER
    )
    ''')
    db.commit()

    # Seed from products.json if table empty
    cur.execute('SELECT COUNT(1) as c FROM products')
    if cur.fetchone()['c'] == 0 and os.path.exists(PRODUCTS_SEED):
        try:
            with open(PRODUCTS_SEED, 'r', encoding='utf-8') as f:
                items = json.load(f)
            for p in items:
                insert_product(p)
            print('Seeded products from products.json')
        except Exception as e:
            print('Failed to seed products:', e)

def row_to_product(row):
    if row is None:
        return None
    p = dict(row)
    # parse JSON columns
    for key in ['additionalImages','variants','tags','features','categoryData','supplierInfo']:
        if p.get(key):
            try:
                p[key] = json.loads(p[key])
            except Exception:
                p[key] = p[key]
        else:
            p[key] = None
    # booleans
    p['available'] = bool(p.get('available'))
    p['freeShipping'] = bool(p.get('freeShipping'))
    return p

def insert_product(data):
    db = get_db()
    cur = db.cursor()
    now = int(time.time())
    cur.execute('''INSERT INTO products (name,category,price,originalPrice,stock,available,freeShipping,image,additionalImages,description,shortDescription,variants,tags,features,categoryData,supplierInfo,sold,rating,reviews,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)''', (
        data.get('name'),
        data.get('category'),
        data.get('price'),
        data.get('originalPrice'),
        data.get('stock',0),
        1 if data.get('available',True) else 0,
        1 if data.get('freeShipping',False) else 0,
        data.get('image'),
        json.dumps(data.get('additionalImages') or []),
        data.get('description'),
        data.get('shortDescription'),
        json.dumps(data.get('variants') or {}),
        json.dumps(data.get('tags') or []),
        json.dumps(data.get('features') or []),
        json.dumps(data.get('categoryData') or {}),
        json.dumps(data.get('supplierInfo') or {}),
        data.get('sold',0),
        data.get('rating',5),
        data.get('reviews',0),
        now
    ))
    db.commit()
    return cur.lastrowid

def require_token():
    token = request.headers.get('X-Admin-Token')
    if not token or token != ADMIN_TOKEN:
        return False
    return True

@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, X-Admin-Token'
    resp.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    return resp

@app.route('/api/products', methods=['GET','POST','OPTIONS'])
def products_route():
    if request.method == 'OPTIONS':
        return jsonify({'ok':True})
    if request.method == 'GET':
        db = get_db()
        cur = db.cursor()
        cur.execute('SELECT * FROM products ORDER BY created_at DESC')
        rows = cur.fetchall()
        return jsonify([row_to_product(r) for r in rows])

    # POST -> create product (protected)
    if not require_token():
        return jsonify({'error':'unauthorized'}), 401
    data = request.get_json() or {}
    new_id = insert_product(data)
    return jsonify({'id': new_id}), 201

@app.route('/api/products/<int:pid>', methods=['GET','PUT','DELETE','OPTIONS'])
def product_detail(pid):
    db = get_db()
    cur = db.cursor()
    if request.method == 'GET':
        cur.execute('SELECT * FROM products WHERE id=?', (pid,))
        row = cur.fetchone()
        p = row_to_product(row)
        if not p:
            return jsonify({'error':'not found'}), 404
        return jsonify(p)

    if not require_token():
        return jsonify({'error':'unauthorized'}), 401

    if request.method == 'DELETE':
        cur.execute('DELETE FROM products WHERE id=?', (pid,))
        db.commit()
        return jsonify({'ok':True})

    if request.method == 'PUT':
        data = request.get_json() or {}
        # Build update
        fields = []
        values = []
        for k in ['name','category','price','originalPrice','stock','available','freeShipping','image','additionalImages','description','shortDescription','variants','tags','features','categoryData','supplierInfo','sold','rating','reviews']:
            if k in data:
                val = data[k]
                if k in ['additionalImages','variants','tags','features','categoryData','supplierInfo']:
                    val = json.dumps(val or {})
                if k in ['available','freeShipping']:
                    val = 1 if val else 0
                fields.append(f"{k}=?")
                values.append(val)
        if fields:
            values.append(pid)
            cur.execute(f"UPDATE products SET {', '.join(fields)} WHERE id=?", tuple(values))
            db.commit()
        cur.execute('SELECT * FROM products WHERE id=?', (pid,))
        return jsonify(row_to_product(cur.fetchone()))

@app.route('/api/uploads', methods=['POST','OPTIONS'])
def uploads():
    if request.method == 'OPTIONS':
        return jsonify({'ok':True})
    if not require_token():
        return jsonify({'error':'unauthorized'}), 401
    if 'file' not in request.files:
        return jsonify({'error':'no file'}), 400
    f = request.files['file']
    filename = secure_filename(f.filename)
    target = os.path.join(UPLOADS_DIR, filename)
    f.save(target)
    return jsonify({'url': f'/uploads/{filename}'})

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOADS_DIR, filename)

@app.teardown_appcontext
def close_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

if __name__ == '__main__':
    with app.app_context():
        init_db()
    print('Starting API server on http://0.0.0.0:3000 (admin token in env YUNGUER_ADMIN_TOKEN)')
    app.run(host='0.0.0.0', port=3000, debug=True)
