# YunGuen - Tienda Online

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

## 📋 Descripción

Tienda online moderna con panel de administración inteligente y asistente AI para creación de productos. Sistema completo de e-commerce con carrito de compras, gestión de pedidos y múltiples métodos de pago.

**YunGuen** - Tu tienda de confianza desde 2020.

## 🚀 Características Principales

- 🎨 Diseño moderno y responsive
- 🤖 **Asistente AI** para crear productos automáticamente
- 📦 **Quick Import** - Importa productos en 30 segundos
- 💳 Integración con Mercado Pago
- 🛒 Carrito de compras inteligente
- 📱 Compatible con todos los dispositivos
- 🌐 Multi-idioma y multi-moneda
- 🔐 Sistema de autenticación de usuarios
- 📊 Panel de administración completo
- 💾 Persistencia con localStorage
- ✅ Sin dependencias de frameworks
- ⚡ 100% HTML, CSS y JavaScript vanilla

## 📁 Estructura del Proyecto

```
YunGuer - copia/
├── index.html              # Página principal
├── preview-design.html     # Vista previa del diseño original
├── README.md              # Este archivo
│
├── css/                   # Estilos
│   ├── base.css          # Estilos base y componentes
│   ├── tridot-animations.css  # Animaciones
│   └── tridot-custom.css     # Estilos personalizados
│
├── js/                    # Scripts
│   ├── main.js           # Script principal
│   ├── utilities.js      # Funciones utilitarias
│   └── tridot-enhancements.js  # Mejoras visuales
│
├── images/               # Imágenes del sitio
│   └── README.md        # Guía de imágenes
│
└── [carpetas antiguas]   # Archivos de Shopify (pueden eliminarse)
    ├── assets/          # Assets antiguos de Shopify
    ├── blocks/          # Bloques Liquid
    ├── config/          # Configuración de Shopify
    ├── layout/          # Layouts Liquid
    ├── locales/         # Traducciones
    ├── sections/        # Secciones Liquid
    ├── snippets/        # Snippets Liquid
    └── templates/       # Templates Liquid
```

## 🛠️ Instalación y Uso

### Opción 1: Abrir directamente
1. Abre el archivo `index.html` en tu navegador
2. ¡Listo! El sitio funcionará inmediatamente

### Opción 2: Servidor local (recomendado)

**Con Python:**
```bash
# Python 3
python -m http.server 8000

# Abre en: http://localhost:8000
```

**Con Node.js:**
```bash
npx http-server -p 8000

# Abre en: http://localhost:8000
```

**Con VS Code:**
- Instala la extensión "Live Server"
- Click derecho en `index.html` > "Open with Live Server"

## 🎨 Personalización

### Cambiar Colores
Edita las variables en `css/base.css`:
```css
:root {
  --color-background: #000000;
  --color-foreground: #ffffff;
  --color-primary: #ffffff;
  --color-secondary: #9b9b9b;
}
```

### Agregar Productos
Edita la sección de productos en `index.html`:
```html
<div class="product-card">
  <div class="product-image">
    <img src="images/tu-producto.jpg" alt="Producto">
  </div>
  <div class="product-info">
    <h3 class="product-title">Nombre del Producto</h3>
    <p class="product-description">Descripción</p>
    <p class="product-price">$99.99</p>
    <button class="button-add-cart">Agregar al Carrito</button>
  </div>
</div>
```

### Cambiar Información de Contacto
Actualiza los enlaces en el footer y la sección de contacto en `index.html`.

## 📸 Agregar Imágenes

1. Coloca tus imágenes en la carpeta `images/`
2. Actualiza las rutas en `index.html`:
   - `images/logo.png` - Tu logo
   - `images/producto-1.jpg` - Imágenes de productos
   - `images/about-us.jpg` - Imagen de "Sobre Nosotros"

3. Formatos recomendados:
   - Productos: 800x800px (JPG o WebP)
   - Logo: SVG o PNG con transparencia
   - Imágenes generales: JPG optimizado

## 🧹 Limpiar Archivos de Shopify

Para eliminar completamente los archivos de Shopify, ejecuta:

**Windows (PowerShell):**
```powershell
.\cleanup-shopify.ps1
```

**Manual:**
Elimina estas carpetas:
- `assets/`
- `blocks/`
- `config/`
- `layout/`
- `locales/`
- `sections/`
- `snippets/`
- `templates/`
- `auto-sync.ps1`

## 🌐 Despliegue

### GitHub Pages
1. Sube el proyecto a GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y carpeta `root`
4. ¡Tu sitio estará en línea!

### Netlify
1. Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. ¡Listo!

### Vercel
```bash
npm i -g vercel
vercel
```

## 📱 Responsive

El sitio es completamente responsive y se adapta a:
- 📱 Móviles (< 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Escritorio (> 1024px)

## ⚡ Rendimiento

- Lazy loading de imágenes
- CSS y JS optimizados
- Animaciones con GPU (transform, opacity)
- Sin dependencias externas
- Tamaño total mínimo

## 🎯 Funcionalidades

### Navegación
- Menú fijo con efecto de vidrio esmerilado
- Scroll suave a secciones
- Indicador de sección activa
- Menú móvil hamburguesa

### Productos
- Grid responsive
- Hover con efectos 3D
- Badges personalizables
- Sistema de carrito (localStorage)

### Formulario de Contacto
- Validación de campos
- Notificaciones visuales
- Responsive

### Animaciones
- Fade in al hacer scroll
- Gradientes animados
- Efectos de hover
- Contadores animados
- Partículas de fondo (opcional)

## 🔧 Tecnologías

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript ES6+ (Vanilla)
- No frameworks, no dependencias

## 📝 Personalización Avanzada

### Desactivar Efectos
En `js/tridot-enhancements.js`, comenta las líneas:
```javascript
// initParticles();        // Desactiva partículas
// enhanceProductCards();  // Desactiva efecto 3D
```

### Cambiar Animaciones
Edita `css/tridot-animations.css` para modificar velocidades y efectos.

## 🐛 Solución de Problemas

**Las imágenes no se ven:**
- Verifica que las rutas en `index.html` coincidan con los archivos en `images/`
- Asegúrate de usar rutas relativas correctas

**Las animaciones no funcionan:**
- Verifica que todos los archivos JS estén cargados
- Abre la consola del navegador (F12) para ver errores

**El menú móvil no funciona:**
- Asegúrate de que `utilities.js` esté cargado correctamente

## 📄 Licencia

Este proyecto es de código abierto y puede ser usado libremente.

## 🤝 Contribuciones

Las mejoras son bienvenidas. Siéntete libre de hacer fork y mejorar el diseño.

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, puedes:
1. Revisar este README
2. Consultar los comentarios en el código
3. Verificar la consola del navegador para errores

---

**¡Disfruta tu nuevo sitio web independiente!** 🚀✨