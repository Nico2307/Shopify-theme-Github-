# 🔐 Configuración de Google OAuth para YunGuer

## Pasos para activar Google Sign-In REAL

### 1️⃣ Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombre del proyecto: "YunGuer Store" (o el que prefieras)

### 2️⃣ Habilitar Google Sign-In API

1. En el menú lateral, ve a **APIs & Services** > **Library**
2. Busca "Google Identity"
3. Habilita **Google Sign-In API**

### 3️⃣ Configurar OAuth Consent Screen

1. Ve a **APIs & Services** > **OAuth consent screen**
2. Selecciona **External** (para cualquier usuario de Google)
3. Llena la información básica:
   - **App name**: YunGuer Store
   - **User support email**: tu email
   - **Developer contact information**: tu email
4. Click en **Save and Continue**
5. **Scopes**: Deja los valores por defecto (email, profile)
6. Click en **Save and Continue**
7. **Test users**: Agrega tu email de Google para pruebas
8. Click en **Save and Continue**

### 4️⃣ Crear OAuth 2.0 Client ID

1. Ve a **APIs & Services** > **Credentials**
2. Click en **+ CREATE CREDENTIALS** > **OAuth client ID**
3. Tipo de aplicación: **Web application**
4. Nombre: "YunGuer Web Client"
5. **Authorized JavaScript origins**:
   - `http://localhost`
   - `http://127.0.0.1`
   - Tu dominio de producción (ej: `https://YunGuer.com`)
6. **Authorized redirect URIs** (opcional para Sign-In):
   - `http://localhost/login.html`
   - Tu dominio (ej: `https://YunGuer.com/login.html`)
7. Click en **CREATE**

### 5️⃣ Copiar tu Client ID

Después de crear, verás una ventana con:
- **Client ID**: algo como `123456789-abcdefg.apps.googleusercontent.com`
- **Client Secret**: NO lo necesitas para el frontend

**COPIA EL CLIENT ID** - lo necesitarás en el siguiente paso.

### 6️⃣ Configurar en tu código

Abre `login.html` y `register.html`, busca esta línea:

```html
data-client_id="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
```

Reemplaza `YOUR_GOOGLE_CLIENT_ID` con tu Client ID real:

```html
data-client_id="123456789-abcdefg.apps.googleusercontent.com"
```

### 7️⃣ Probar localmente

Para que funcione en localhost:

1. **Opción 1 - Live Server (recomendado)**:
   - Instala la extensión "Live Server" en VS Code
   - Click derecho en `index.html` > "Open with Live Server"
   - Esto abrirá en `http://127.0.0.1:5500`

2. **Opción 2 - Servidor HTTP con Python**:
   ```powershell
   python -m http.server 8000
   ```
   - Abre `http://localhost:8000`

3. **Opción 3 - Node.js http-server**:
   ```powershell
   npx http-server
   ```

⚠️ **IMPORTANTE**: El botón de Google NO funcionará si abres el archivo directamente (`file:///`). Necesitas un servidor HTTP.

### 8️⃣ ¡Listo! 🎉

Ahora cuando hagas click en "Continuar con Google":
1. Se abrirá la ventana oficial de Google
2. Muestra tus cuentas reales de Google
3. Seleccionas una cuenta
4. Google autoriza y envía los datos
5. Tu aplicación los recibe y registra/loguea al usuario

---

## 📋 Resumen de archivos modificados

✅ `login.html` - Botón oficial de Google + callback
✅ `register.html` - Botón oficial de Google + callback

## 🔒 Datos que recibes de Google

Cuando el usuario se autentica, recibes:
```javascript
{
  sub: "1234567890",           // Google ID único
  name: "Juan Pérez",          // Nombre completo
  email: "juan@gmail.com",     // Email verificado
  picture: "https://...",      // Foto de perfil
  email_verified: true         // Email verificado por Google
}
```

## 🚀 Para Producción

Cuando subas tu sitio a un servidor:

1. Agrega tu dominio en Google Cloud Console:
   - **Authorized JavaScript origins**: `https://tudominio.com`
   - **Authorized redirect URIs**: `https://tudominio.com/login.html`

2. El mismo Client ID funciona para localhost Y producción

---

## ❓ Solución de problemas

**Error: "redirect_uri_mismatch"**
- Verifica que hayas agregado `http://localhost` en Authorized JavaScript origins

**El botón no aparece**
- Asegúrate de estar usando un servidor HTTP (no `file:///`)
- Verifica que el SDK se haya cargado: `<script src="https://accounts.google.com/gsi/client">`

**Error: "Invalid client ID"**
- Verifica que copiaste el Client ID correctamente
- Debe terminar en `.apps.googleusercontent.com`

---

¿Necesitas ayuda? Los archivos ya están configurados, solo falta tu Client ID de Google Cloud Console.
