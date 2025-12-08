# 📦 Ejemplo: Cómo Importar un Producto con Imágenes

## ✅ Pasos para Importar Correctamente

### 1. **Obtener las URLs de las Imágenes**

#### Desde SHEIN:
1. Abre el producto en SHEIN
2. Haz clic derecho en cada imagen del producto
3. Selecciona "Copiar dirección de imagen"
4. Repite para cada imagen que quieras agregar

**Ejemplo de URLs de SHEIN:**
```
https://img.ltwebstatic.com/images3_pi/2024/10/09/1f/1728447867aa0738f8bff42b9f6ad4d056f654d6f3_thumbnail_720x.jpg
https://img.ltwebstatic.com/images3_pi/2024/10/09/b8/1728447868f69dccb0aeeb1f22c8ab3dd0ccbc06d8_thumbnail_720x.jpg
https://img.ltwebstatic.com/images3_pi/2024/10/09/f1/172844786824d3f84e4dfe84b3f30f5a69d5e6baa0_thumbnail_720x.jpg
```

#### Desde Amazon:
1. Abre el producto
2. Clic derecho en las imágenes
3. "Copiar dirección de imagen"

**Ejemplo de URLs de Amazon:**
```
https://m.media-amazon.com/images/I/71abc123def.jpg
https://m.media-amazon.com/images/I/71xyz456ghi.jpg
```

### 2. **Importar en el Admin Panel**

1. Ve a `admin-new.html` (panel de administración)
2. Haz clic en el botón **"⚡ Importar Rápido"** (arriba del listado de productos)
3. Completa el formulario:

   ```
   🔗 URL del Producto:
   https://www.shein.com/es/producto-ejemplo-p-12345678.html

   🖼️ URLs de Imágenes (una por línea):
   https://img.ltwebstatic.com/imagen1.jpg
   https://img.ltwebstatic.com/imagen2.jpg
   https://img.ltwebstatic.com/imagen3.jpg
   https://img.ltwebstatic.com/imagen4.jpg

   💰 Precio de Venta:
   100000

   💵 Precio de Compra:
   45000

   📦 Stock Inicial:
   25
   ```

4. Haz clic en **"⚡ Importar Producto"**
5. ¡Listo! El producto se creará con todas las imágenes

### 3. **Verificar el Producto**

1. El producto aparecerá en el listado de productos del admin
2. En la tienda, haz clic en el producto
3. Deberías ver:
   - ✅ Imagen principal (primera URL que pusiste)
   - ✅ Galería de miniaturas abajo con todas las imágenes
   - ✅ Al hacer clic en las miniaturas, cambia la imagen principal

## 🔍 Formato de Imágenes

### ✅ CORRECTO - URLs Completas:
```
https://img.ltwebstatic.com/images/imagen.jpg
https://m.media-amazon.com/images/I/imagen.jpg
http://http2.mlstatic.com/imagen.jpg
```

### ❌ INCORRECTO - URLs Relativas o Incompletas:
```
/images/imagen.jpg
imagen.jpg
www.ejemplo.com/imagen.jpg (sin http/https)
```

## 📊 Resultado Final

El producto tendrá:
- **Nombre:** Extraído automáticamente de la URL
- **Imagen Principal:** Primera URL de la lista
- **Galería:** Resto de imágenes como miniaturas
- **Precio de Venta:** El que ingresaste
- **Ganancia Automática:** (Precio de venta - Precio de compra)
- **Info de Proveedor:** Guardada solo para ti en el admin

## 💡 Consejos

1. **Imágenes de Alta Calidad:** Usa URLs de imágenes grandes (720x o superior)
2. **Múltiples Ángulos:** Agrega 3-5 imágenes mostrando diferentes vistas
3. **Verificar URLs:** Pega cada URL en el navegador para verificar que cargue
4. **Una por Línea:** Cada URL debe estar en una línea separada
5. **Sin Espacios Extras:** No dejes líneas vacías entre URLs

## 🐛 Solución de Problemas

### "No se ven las imágenes en la tienda"
- ✅ Verifica que las URLs empiecen con `http://` o `https://`
- ✅ Pega la URL en el navegador para ver si carga
- ✅ Asegúrate de poner una URL por línea (sin comas ni espacios extra)

### "Solo veo la imagen principal"
- ✅ Debes agregar mínimo 2 URLs para ver la galería
- ✅ Primera URL = Imagen principal
- ✅ URLs 2, 3, 4... = Galería de miniaturas

### "Las imágenes no cambian al hacer clic"
- ✅ Recarga la página con Ctrl + Shift + R
- ✅ Verifica que las URLs sean correctas

## 🎯 Ejemplo Completo Real

**Producto:** Pantalón Cargo Negro SHEIN

```
🔗 URL: https://www.shein.com/es/Pantalon-Cargo-para-Hombre-Cintura-Elastica-p-35817652.html

🖼️ Imágenes:
https://img.ltwebstatic.com/images3_pi/2024/10/09/1f/1728447867aa0738f8bff42b9f6ad4d056f654d6f3_thumbnail_720x.jpg
https://img.ltwebstatic.com/images3_pi/2024/10/09/b8/1728447868f69dccb0aeeb1f22c8ab3dd0ccbc06d8_thumbnail_720x.jpg
https://img.ltwebstatic.com/images3_pi/2024/10/09/f1/172844786824d3f84e4dfe84b3f30f5a69d5e6baa0_thumbnail_720x.jpg

💰 Precio: 100000
💵 Costo: 45000
📦 Stock: 25
```

**Resultado:**
- Ganancia: $55,000 COP por unidad
- 3 imágenes en galería
- Categoría: Ropa (auto-detectada)
- Proveedor: SHEIN (auto-detectado)
