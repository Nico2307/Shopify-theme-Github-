# 🌎 Sistema de Conversión de Moneda - YunGuen

## 📌 Descripción General

El sistema de conversión de moneda permite a los usuarios ver los precios en su moneda local automáticamente. Los precios base están en **Pesos Colombianos (COP)** y se convierten dinámicamente según el país del usuario.

## 🌍 Países y Monedas Soportados

| País | Bandera | Moneda | Símbolo | Tasa de Conversión |
|------|---------|--------|---------|-------------------|
| Colombia | 🇨🇴 | Peso Colombiano | $ | 1.0 (Base) |
| Estados Unidos | 🇺🇸 | Dólar | $ | 0.00025 |
| México | 🇲🇽 | Peso Mexicano | $ | 0.0042 |
| Argentina | 🇦🇷 | Peso Argentino | $ | 0.24 |
| Brasil | 🇧🇷 | Real Brasileño | R$ | 0.0012 |
| Chile | 🇨🇱 | Peso Chileno | $ | 0.22 |
| Perú | 🇵🇪 | Sol Peruano | S/ | 0.00085 |
| Venezuela | 🇻🇪 | Bolívar | Bs | 0.01 |
| España | 🇪🇸 | Euro | € | 0.00023 |
| Reino Unido | 🇬🇧 | Libra Esterlina | £ | 0.00019 |

## ⚙️ Funcionalidades

### 1. Detección Automática de País
- Al cargar la página por primera vez, el sistema detecta automáticamente el país del usuario usando su dirección IP
- Utiliza la API gratuita de ipapi.co
- Si no puede detectar el país, usa Colombia como predeterminado

### 2. Selector Manual de País
- Los usuarios pueden cambiar manualmente su país desde:
  - **Página de Login**: Botón "🌎 Selecciona tu país" en el header
  - **Página de Registro**: Botón "🌎 Selecciona tu país" en el header
  - **Header Principal** (cuando está logueado): Opción "🌎 País/Moneda" en el menú de usuario

### 3. Conversión Automática de Precios
Los precios se convierten automáticamente en:
- ✅ Tarjetas de productos en el grid
- ✅ Modal de detalle de producto
- ✅ Items del carrito
- ✅ Total del carrito
- ✅ Modal de checkout

### 4. Persistencia de Configuración
- La selección de país/moneda se guarda en localStorage
- Al volver a visitar la página, se mantiene la configuración anterior
- Key de localStorage: `yunguen_currency_config`

## 📂 Archivos Modificados

### Nuevos Archivos
- `js/currency.js` - Sistema completo de gestión de moneda

### Archivos Actualizados
- `login.html` - Agregado selector de país y script de moneda
- `register.html` - Agregado selector de país y script de moneda
- `index.html` - Agregado script de moneda y opción en menú de usuario
- `js/utilities.js` - Actualizada función `renderProducts()` para conversión de precios
- `js/cart.js` - Actualizada función `renderCart()` y `openCheckoutModal()` para conversión de precios

## 🎨 Interfaz de Usuario

### Modal de Selección de País
- Diseño moderno con fondo blur y degradados
- Lista completa de países con banderas
- Indicador visual del país seleccionado
- Búsqueda rápida por scroll
- Responsive para móviles

### Notificaciones
- Notificación toast cuando se cambia de país
- Mensaje: "País cambiado a [País]. Precios en [Moneda]."
- Desaparece automáticamente después de 3 segundos
- Recarga automática de la página para actualizar todos los precios

## 🔧 Uso Técnico

### Instanciación Global
```javascript
window.currencySystem = new CurrencySystem();
```

### Métodos Principales

#### `formatPrice(priceInCOP)`
Convierte un precio de COP a la moneda actual y lo formatea
```javascript
const displayPrice = window.currencySystem.formatPrice(150000);
// Resultado: "$150,000" (Colombia), "$37" (USA), "€34" (España)
```

#### `convertPrice(priceInCOP)`
Solo convierte el precio sin formatear
```javascript
const convertedPrice = window.currencySystem.convertPrice(150000);
// Resultado: 150000 (Colombia), 37.5 (USA), 34.5 (España)
```

#### `getCurrencyInfo()`
Obtiene información completa de la configuración actual
```javascript
const info = window.currencySystem.getCurrencyInfo();
// {
//   country: { name: 'Colombia', currency: 'COP', flag: '🇨🇴' },
//   currency: { symbol: '$', name: 'Peso Colombiano', rate: 1 },
//   code: 'COP'
// }
```

#### `showCountrySelector()`
Muestra el modal de selección de país
```javascript
window.currencySystem.showCountrySelector();
```

#### `setCountry(countryCode)`
Cambia el país manualmente
```javascript
window.currencySystem.setCountry('US'); // Cambia a Estados Unidos
```

### Atributos data-price
Todos los precios en HTML tienen el atributo `data-price` con el valor original en COP:
```html
<span class="price-tag" data-price="150000">$150,000</span>
```

Esto permite actualizar todos los precios dinámicamente cuando se cambia de país usando:
```javascript
document.querySelectorAll('[data-price]').forEach(element => {
    const priceInCOP = parseInt(element.getAttribute('data-price'));
    element.textContent = window.currencySystem.formatPrice(priceInCOP);
});
```

## 🔄 Actualización de Tasas de Cambio

Las tasas de cambio están definidas en `js/currency.js` en el objeto `this.currencies`.

Para actualizar las tasas:
1. Abre `js/currency.js`
2. Modifica los valores en el constructor:
```javascript
this.currencies = {
    COP: { symbol: '$', name: 'Peso Colombiano', rate: 1 },
    USD: { symbol: '$', name: 'Dólar', rate: 0.00025 }, // Actualizar este valor
    // ...
};
```

**Nota**: Las tasas deben ser relativas a COP. Por ejemplo:
- Si 1 USD = 4000 COP, la tasa es: 1/4000 = 0.00025
- Si 1 EUR = 4348 COP, la tasa es: 1/4348 = 0.00023

## 📱 Responsive

El sistema es completamente responsive:
- Modal adaptable a pantallas pequeñas
- Scroll vertical en lista de países
- Botones táctiles optimizados
- Funciona en todos los dispositivos

## 🚀 Próximas Mejoras Posibles

1. **API de Tasas en Tiempo Real**: Integrar con API como exchangerate-api.com para tasas actualizadas
2. **Más Países**: Agregar más países latinoamericanos y europeos
3. **Preferencia de Usuario**: Guardar preferencia en la cuenta del usuario (no solo localStorage)
4. **Conversión Bidireccional**: Permitir ingresar precios en cualquier moneda
5. **Historial de Precios**: Mostrar cómo ha variado el precio con el tiempo

## 🐛 Troubleshooting

### Los precios no se actualizan
- Verificar que `js/currency.js` esté cargado correctamente
- Revisar que `window.currencySystem` exista en la consola
- Confirmar que los elementos tengan el atributo `data-price`

### El país no se detecta automáticamente
- La API ipapi.co puede tener límites de rate
- El navegador puede bloquear la petición
- En ese caso, se usará Colombia como predeterminado

### La página no recarga después de cambiar país
- Verificar que JavaScript esté habilitado
- Revisar la consola por errores
- Probar en modo incógnito para descartar extensiones

## 📞 Soporte

Para cualquier duda o sugerencia sobre el sistema de moneda, contactar al desarrollador del proyecto.
