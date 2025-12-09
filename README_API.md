API backend (Flask + SQLite)
=================================

This repository now includes a small development API server at `server_api.py`.

Quick start (Windows PowerShell):

1. Create a virtual environment and install dependencies

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. (Optional) Set an admin token for protected endpoints

```powershell
$env:YUNGUER_ADMIN_TOKEN = 'replace-with-a-secure-token'
```

3. Run the server

```powershell
python server_api.py
```

Server will listen on `http://0.0.0.0:3000` and exposes `/api/products` endpoints.

Notes:
- The server will seed the SQLite database `data.db` from `products.json` on first run if the products table is empty.
- Uploaded files (via `/api/uploads`) are stored in `uploads/` and served at `/uploads/<filename>`.
- This is a development server. Do not expose to the public without adding proper authentication and HTTPS.

Admin CLI
---------

You can now add products locally without the web admin by using `admin_cli.py`.

Example:

```powershell
python admin_cli.py --name "Cargador UGREEN GaN" --price 110000 --stock 10 --images "C:\path\to\img1.jpg,C:\path\to\img2.jpg" --video "https://youtu.be/xxxxx" --description "Descripción larga..."
```

Behavior:
- If `data.db` exists the script will insert the product into the SQLite DB used by the API.
- Otherwise it will append the product to `products.json`.
- Images passed with `--images` will be copied into `uploads/` and referenced as `/uploads/<filename>` in the product record.

