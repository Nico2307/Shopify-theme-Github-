# 🚀 SERVIDOR DE PAGOS CON MERCADO PAGO

## ¿Qué es esto?

Este servidor backend permite procesar pagos REALES con Mercado Pago, incluyendo formularios de tarjetas de crédito/débito.

---

## 📋 PASO 1: Iniciar el Servidor Backend

Abre una terminal PowerShell en esta carpeta y ejecuta:

```powershell
python server.py
```

Verás algo como:
```
============================================================
🚀 Servidor Backend de Mercado Pago
============================================================
✅ Servidor corriendo en http://localhost:3000
📝 Endpoint: http://localhost:3000/create-preference
💳 Listo para procesar pagos reales de Mercado Pago
============================================================
```

**⚠️ IMPORTANTE:** Deja esta terminal abierta mientras usas la tienda.

---

## 📋 PASO 2: Iniciar el Servidor Web (en otra terminal)

Abre OTRA terminal PowerShell y ejecuta:

```powershell
python -m http.server 8000
```

---

## 🛒 PASO 3: Usar la Tienda

1. Abre tu navegador en: `http://localhost:8000`
2. Agrega productos al carrito
3. Click en "Proceder al Pago"
4. Click en "💳 Pagar $XXX con Mercado Pago"
5. **Serás redirigido a Mercado Pago** donde:
   - Verás un formulario REAL de pago
   - Podrás ingresar datos de tarjeta
   - Seleccionar método de pago (tarjeta, PSE, Nequi, etc.)

---

## 💳 TARJETAS DE PRUEBA (Modo TEST)

Para probar sin gastar dinero real, usa estas tarjetas de prueba de Colombia:

### ✅ Pago Aprobado
- **Tarjeta:** 5031 7557 3453 0604
- **CVV:** 123
- **Fecha:** 11/25 (cualquier fecha futura)
- **Nombre:** APRO

### ⏳ Pago Pendiente  
- **Tarjeta:** 5031 4332 1540 6351
- **Nombre:** PEND

### ❌ Pago Rechazado
- **Tarjeta:** 5031 4358 8187 4248
- **Nombre:** OTHE

---

## 🌐 SUBIR A PRODUCCIÓN

Cuando subas tu página a un hosting (Vercel, Netlify, etc.):

1. **Sube el archivo `server.py` a tu hosting**
2. **Actualiza la URL en `js/mercadopago.js`:**
   ```javascript
   const backendUrl = 'https://tu-dominio.com/create-preference';
   ```
3. **Cambia a credenciales de PRODUCCIÓN** en `server.py`:
   - Ve a tu cuenta de Mercado Pago
   - Copia las credenciales de PRODUCCIÓN (no TEST)
   - Reemplaza el `ACCESS_TOKEN` en `server.py`

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Error: "No se pudo conectar con el servidor de pagos"
- Verifica que `python server.py` esté corriendo
- Debe decir: "Servidor corriendo en http://localhost:3000"

### Error: "Failed to fetch"
- Cierra el servidor backend (Ctrl+C)
- Vuelve a ejecutar: `python server.py`

### La página se queda en blanco después de pagar
- Normal: Mercado Pago te redirige de vuelta
- Revisa la consola del navegador (F12) para ver mensajes

---

## 📝 RESUMEN RÁPIDO

**Terminal 1:**
```powershell
python server.py
```
*(Servidor de pagos - puerto 3000)*

**Terminal 2:**
```powershell
python -m http.server 8000
```
*(Servidor web - puerto 8000)*

**Navegador:**
```
http://localhost:8000
```

---

## ✅ TODO FUNCIONA SI VES:

1. ✅ Servidor backend dice: "Listo para procesar pagos"
2. ✅ Servidor web dice: "Serving HTTP on..."
3. ✅ Al pagar, te redirige a una página de Mercado Pago
4. ✅ Ves un formulario para ingresar tarjeta

---

¿Dudas? Revisa la consola del navegador (F12) para ver mensajes de error detallados.
