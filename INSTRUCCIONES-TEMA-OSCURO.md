# 🎨 INSTRUCCIONES PARA ACTIVAR EL TEMA OSCURO EN SHOPIFY

## ⚠️ PROBLEMA COMÚN: El tema no se ve oscuro en Shopify

Si tu tema sigue viéndose con los colores del tema base de Shopify, necesitas hacer estos ajustes:

---

## ✅ PASO 1: Verificar que los archivos CSS están cargados

### 1.1 Ir a `layout/theme.liquid`
Busca estas líneas (deberían estar alrededor de la línea 210):

```liquid
<!-- TriDot Custom Styles -->
{{ 'tridot-custom.css' | asset_url | stylesheet_tag }}
{{ 'tridot-animations.css' | asset_url | stylesheet_tag }}
```

**IMPORTANTE:** Estas líneas deben estar **DESPUÉS** del `base.css` para sobrescribir los estilos base.

### 1.2 Verificar el JavaScript (línea ~277):
```liquid
<!-- TriDot Custom JavaScript -->
<script src="{{ 'tridot-enhancements.js' | asset_url }}" defer></script>
```

---

## ✅ PASO 2: Cambiar el esquema de color del tema

### 2.1 Ir al editor de temas:
1. **Shopify Admin** → **Tienda en línea** → **Temas**
2. Click en **Personalizar** en tu tema

### 2.2 Configurar colores oscuros:
1. Click en **Configuración del tema** (ícono de pincel arriba a la izquierda)
2. Ir a **Colors** o **Colores**
3. Configura estos colores:

```
Background: #000000 (negro)
Text: #FFFFFF (blanco)
Button background: #FFFFFF (blanco)
Button text: #000000 (negro)
Accent colors: #FFFFFF (blanco)
```

---

## ✅ PASO 3: Ajustar secciones individuales

Cada sección de Shopify puede tener su propio esquema de color. Para cada sección:

1. Click en la sección (ej: Header, Announcement bar, etc.)
2. Busca **Color scheme** o **Esquema de color**
3. Si existe una opción "Scheme 1" o "Background 1", selecciona la más oscura
4. Si puedes editar colores directamente, usa:
   - **Background:** `#000000`
   - **Text:** `#FFFFFF`

---

## ✅ PASO 4: Agregar las secciones personalizadas

Las secciones que creamos (`hero-principal.liquid`, `about-company.liquid`, `stats-section.liquid`) ya tienen estilos en línea con fondo negro.

### Para agregar una sección:
1. En el editor de temas, ve a la página donde quieres agregarla
2. Click en **Add section** / **Agregar sección**
3. Busca:
   - **Hero principal** (para el encabezado con logo)
   - **About company** (información de la empresa)
   - **Stats section** (estadísticas)
4. Click **Add** / **Agregar**

---

## ✅ PASO 5: Verificar caché del navegador

A veces los cambios de CSS no se ven porque el navegador tiene versiones antiguas en caché:

### Solución:
1. **Ctrl + F5** (Windows) o **Cmd + Shift + R** (Mac) para forzar recarga
2. O abrir en modo incógnito: **Ctrl + Shift + N**

---

## ✅ PASO 6: Verificar en modo de vista previa

Si aún no se ve:

1. En el editor de temas, busca la URL de vista previa (arriba)
2. La URL se ve algo como: `https://urbandrop-9.myshopify.com/?preview_theme_id=...`
3. Copia esa URL y ábrela en una nueva pestaña en modo incógnito
4. Esto te mostrará exactamente cómo se ve el tema SIN caché

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ El fondo sigue siendo blanco
**Causa:** El tema base tiene colores configurados en el customizer
**Solución:** Ve a Paso 2 y cambia TODOS los colores a negro/blanco

### ❌ Los botones no son blancos
**Causa:** Shopify Payment Button tiene estilos propios
**Solución:** En `tridot-custom.css` ya tenemos:
```css
.shopify-payment-button__button {
  background: #ffffff !important;
  color: #000000 !important;
}
```

### ❌ El header no es transparente oscuro
**Causa:** La sección del header tiene su propio esquema de color
**Solución:**
1. Click en la sección **Header**
2. Cambiar **Color scheme** a la opción más oscura
3. O ir a Settings → Header → Background color → `#000000`

### ❌ Las tarjetas de producto son blancas
**Causa:** El CSS no se está aplicando correctamente
**Solución:**
1. Verificar que `tridot-custom.css` está en `assets/`
2. Verificar que está cargado en `theme.liquid`
3. Hacer hard refresh: **Ctrl + F5**

---

## 📝 NOTAS IMPORTANTES

1. **Prioridad del CSS:** Nuestros archivos usan `!important` para sobrescribir TODO
2. **Variables CSS:** Sobrescribimos las variables de Shopify con valores oscuros
3. **Selectores específicos:** Usamos selectores muy específicos para máxima prioridad
4. **Testing:** Siempre prueba en modo incógnito para evitar problemas de caché

---

## 🎯 RESULTADO ESPERADO

Cuando todo esté configurado correctamente, deberías ver:

✅ Fondo completamente negro (#000000)  
✅ Texto blanco (#FFFFFF)  
✅ Header transparente oscuro con blur  
✅ Botones blancos con hover negro  
✅ Tarjetas de producto con fondo #0a0a0a  
✅ Animaciones de gradiente en títulos  
✅ Efectos hover en todos los elementos  

---

## 🚀 ¿Necesitas ayuda?

Si después de seguir todos estos pasos el tema sigue sin verse oscuro:

1. Comparte una captura de pantalla de cómo se ve
2. Verifica la consola del navegador (F12) por errores
3. Comparte la URL de vista previa de tu tienda

---

**Última actualización:** Diciembre 7, 2025  
**Archivos modificados:** 
- `assets/tridot-custom.css` (commit: 26da6fc)
- `layout/theme.liquid`
- `sections/hero-principal.liquid`
- `sections/about-company.liquid`
- `sections/stats-section.liquid`
