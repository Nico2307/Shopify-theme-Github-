# Carpeta de Imágenes

Esta carpeta contiene todas las imágenes del sitio web.

## Estructura recomendada:

```
images/
├── logo.png (o .svg)          # Logo de la empresa
├── about-us.jpg               # Imagen de la sección "Sobre Nosotros"
├── producto-1.jpg             # Imagen del producto 1
├── producto-2.jpg             # Imagen del producto 2
├── producto-3.jpg             # Imagen del producto 3
├── producto-4.jpg             # Imagen del producto 4
└── ...                        # Más productos
```

## Formatos recomendados:

- **Logotipos**: SVG o PNG con fondo transparente
- **Productos**: JPG o WebP (optimizados)
- **Ilustraciones**: SVG o PNG
- **Fotografías**: JPG o WebP

## Optimización:

Para mejor rendimiento, asegúrate de:
1. Comprimir las imágenes antes de subirlas
2. Usar WebP cuando sea posible
3. Mantener tamaños razonables (productos: 800x800px máximo)
4. Usar lazy loading (ya implementado en el HTML)

## Herramientas recomendadas:

- [TinyPNG](https://tinypng.com/) - Comprimir imágenes
- [Squoosh](https://squoosh.app/) - Convertir a WebP
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Optimizar SVG
