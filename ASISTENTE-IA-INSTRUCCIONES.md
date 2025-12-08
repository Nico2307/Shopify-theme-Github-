# 🤖 Asistente IA para Productos - Configuración

## 📋 Descripción

El Asistente IA te permite crear productos automáticamente con solo:
1. **Subir imágenes** del producto
2. **Escribir información breve** (2-3 líneas)
3. **Hacer clic en "Generar con IA"**

La IA automáticamente generará:
- ✅ Nombre del producto optimizado
- ✅ Categoría correcta
- ✅ Descripción completa y profesional
- ✅ Características destacadas
- ✅ Variantes (colores, tallas)
- ✅ Precio estimado del proveedor
- ✅ Tags relevantes

## 🎯 Modos de Funcionamiento

### 1. **Modo Simulado (ACTUAL - GRATIS)**

El sistema actualmente funciona en **modo simulado** que:
- ✅ Analiza tu texto y extrae información
- ✅ Detecta categorías automáticamente
- ✅ Genera descripciones profesionales
- ✅ Detecta colores y tallas mencionadas
- ✅ Calcula precio de proveedor sugerido
- ✅ **Completamente GRATIS - No requiere API**

**Ventajas:**
- No necesita configuración
- No tiene costos
- Funciona offline
- Procesamiento instantáneo

**Limitaciones:**
- Descripción basada en texto que proporcionas
- No analiza imágenes con IA
- Generación basada en patrones

### 2. **Modo OpenAI (OPCIONAL - PAGO)**

Si quieres usar IA real de OpenAI (GPT-4):
- ✅ Análisis de imágenes con GPT-4 Vision
- ✅ Descripciones más creativas y naturales
- ✅ Mejor detección de características
- ✅ Análisis contextual avanzado

**Costo aproximado:**
- ~$0.01 - $0.03 USD por producto (muy económico)
- Modelo: GPT-4o-mini (el más barato y rápido)

## 🚀 Cómo Usar (Modo Simulado Actual)

### Paso 1: Activar Asistente IA
1. Abre el **Panel de Administración** (`admin-new.html`)
2. Haz clic en **"Agregar Producto"**
3. Activa el switch **"🤖 Asistente IA"** (arriba)

### Paso 2: Subir Imágenes
1. Haz clic en la zona de **"📸 Haz clic o arrastra imágenes aquí"**
2. Selecciona todas las imágenes del producto (3-5 recomendado)
3. Verás las miniaturas aparecer

### Paso 3: Escribir Información Breve
En el campo **"💬 Información Breve del Producto"**, escribe algo como:

```
Pantalón cargo negro para hombre, tallas S M L XL XXL, 
material algodón premium, estilo urbano moderno, 
marca SHEIN, precio proveedor $45.000
```

O:

```
Camiseta blanca básica unisex, talla única, 100% algodón, 
manga corta, cuello redondo, precio proveedor $15.000
```

**Tips para mejor resultado:**
- ✅ Menciona tipo de producto
- ✅ Menciona colores disponibles
- ✅ Menciona tallas/tamaños
- ✅ Menciona material
- ✅ Menciona precio del proveedor (si lo sabes)

### Paso 4: Ingresar Precio y Stock
- **💰 Precio de Venta:** Precio al que venderás (ej: 100000)
- **📦 Stock Inicial:** Cantidad disponible (ej: 25)

### Paso 5: Generar
1. Haz clic en **"✨ Generar Producto con IA"**
2. Espera 3-5 segundos mientras procesa
3. ¡Listo! El producto se crea automáticamente

## 📊 Ejemplo Completo

**Entrada:**
- **Imágenes:** 4 fotos de un pantalón cargo
- **Info:** "Pantalón cargo verde militar para hombre, tallas M L XL, múltiples bolsillos, material resistente, precio proveedor $50.000"
- **Precio:** 120000
- **Stock:** 30

**Resultado Automático:**
```
Nombre: Pantalón Cargo Verde Militar Para Hombre
Categoría: Ropa
Precio: $120.000
Precio Proveedor: $50.000 (ganancia $70.000)
Stock: 30

Descripción:
Pantalón Cargo Verde Militar Para Hombre

Pantalón cargo verde militar para hombre, tallas M L XL, 
múltiples bolsillos, material resistente, precio proveedor $50.000

Características destacadas:
• Producto de alta calidad importado
• Diseño moderno y versátil
• Perfecto para uso diario
• Materiales resistentes y duraderos
• Disponible en stock listo para envío
...

Variantes:
- Colores: verde
- Tallas: m, l, xl

Características:
- Alta calidad garantizada
- Diseño moderno y versátil
- Materiales resistentes
- Producto importado
- Envío rápido disponible
- Garantía de satisfacción
```

## 🔧 Configuración OpenAI (OPCIONAL)

Si en el futuro quieres usar IA real de OpenAI:

### Paso 1: Obtener API Key
1. Crea cuenta en https://platform.openai.com
2. Ve a **API Keys** → **Create new secret key**
3. Copia tu clave (empieza con `sk-...`)

### Paso 2: Agregar Créditos
1. Ve a **Billing** → **Add payment method**
2. Agrega $5-10 USD (suficiente para 500+ productos)

### Paso 3: Configurar en el Código
Abre `js/ai-assistant.js` y en la línea 10:

```javascript
this.apiKey = ''; // Pega aquí tu API Key
```

Cambia a:

```javascript
this.apiKey = 'sk-proj-tu-api-key-aqui';
```

### ⚠️ IMPORTANTE - Seguridad

**NUNCA** expongas tu API Key en código frontend en producción. La configuración actual es solo para desarrollo/demo local.

**En producción, usa:**
- Backend/API intermediaria (Node.js, Python Flask, etc.)
- Serverless functions (Vercel, Netlify, AWS Lambda)
- Variables de entorno seguras

## 💰 Costos OpenAI (Si decides usarlo)

**GPT-4o-mini (recomendado):**
- Input: $0.15 por 1M tokens
- Output: $0.60 por 1M tokens
- **Costo por producto:** ~$0.01-0.03 USD

**Cálculo ejemplo:**
- 100 productos = ~$2 USD
- 500 productos = ~$10 USD
- 1000 productos = ~$20 USD

## 🎯 Recomendación

**Para empezar:** Usa el **modo simulado gratuito** que ya está funcionando. Es muy efectivo y no tiene costos.

**Considera OpenAI si:**
- Subes más de 50 productos por día
- Quieres análisis automático de imágenes
- Necesitas descripciones super creativas
- Tienes presupuesto para herramientas ($10-20/mes)

## 🐛 Solución de Problemas

### "No veo el botón Asistente IA"
- ✅ Recarga con Ctrl+Shift+R
- ✅ Verifica que estés en admin-new.html

### "No se generan variantes"
- ✅ Menciona colores y tallas en el texto
- ✅ Ejemplo: "negro, blanco, tallas S M L"

### "Precio proveedor incorrecto"
- ✅ Menciona el precio en el texto
- ✅ Ejemplo: "precio proveedor $45.000"

### "Categoría incorrecta"
- ✅ Usa palabras clave claras
- ✅ Ejemplo: "pantalón", "camiseta", "laptop", etc.

## 📞 Soporte

El modo simulado funciona completamente offline y gratis. Cualquier duda sobre el funcionamiento, solo pregunta!
