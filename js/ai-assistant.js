// ============================================
// AI ASSISTANT - OPENAI INTEGRATION
// Asistente IA para generación de productos
// ============================================

class AIProductAssistant {
    constructor() {
        // ⚠️ IMPORTANTE: Nunca expongas tu API Key en el frontend en producción
        // Esta es solo una demo. En producción, usa un backend/serverless function
        this.apiKey = ''; // Deja vacío para usar modo simulado
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
        this.model = 'gpt-4o-mini'; // Modelo más económico y rápido
    }

    /**
     * Generar producto completo usando IA real (OpenAI)
     * @param {string} briefInfo - Información breve del producto
     * @param {number} price - Precio de venta
     * @param {Array} images - Array de imágenes en base64
     * @returns {Object} - Datos del producto generados
     */
    async generateProduct(briefInfo, price, images) {
        if (!this.apiKey) {
            console.log('⚠️ API Key no configurada. Usando modo simulado.');
            return this.generateProductSimulated(briefInfo, price, images);
        }

        try {
            const prompt = this.buildPrompt(briefInfo, price);
            
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: 'system',
                            content: 'Eres un asistente experto en e-commerce que genera descripciones de productos profesionales y atractivas en español.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const generatedText = data.choices[0].message.content;
            
            return this.parseAIResponse(generatedText, briefInfo, price, images);

        } catch (error) {
            console.error('Error llamando a OpenAI API:', error);
            // Fallback a modo simulado
            return this.generateProductSimulated(briefInfo, price, images);
        }
    }

    /**
     * Construir prompt para la IA
     */
    buildPrompt(briefInfo, price) {
        return `Genera información completa para un producto de e-commerce basado en esta descripción:

"${briefInfo}"

Precio de venta: $${price.toLocaleString('es-CO')} COP

Genera un JSON con esta estructura exacta:
{
  "name": "Nombre atractivo del producto (máximo 60 caracteres)",
  "category": "una de: ropa, electronica, hogar, deportes, belleza, libros, juguetes, alimentos, tecnologia, otros",
  "description": "Descripción completa y profesional (mínimo 200 palabras)",
  "shortDescription": "Descripción corta (máximo 150 caracteres)",
  "features": ["característica 1", "característica 2", "característica 3", "característica 4", "característica 5"],
  "variants": {
    "colors": ["color1", "color2"],
    "sizes": ["talla1", "talla2"]
  },
  "tags": ["tag1", "tag2", "tag3"],
  "supplierPrice": precio estimado del proveedor (número)
}

IMPORTANTE: 
- La descripción debe ser profesional, persuasiva y en español
- Incluye beneficios y características del producto
- Los colores y tallas deben estar en minúsculas
- El supplierPrice debe ser aproximadamente 40-50% del precio de venta
- Responde SOLO con el JSON válido, sin texto adicional`;
    }

    /**
     * Parsear respuesta de la IA
     */
    parseAIResponse(aiText, briefInfo, price, images) {
        try {
            // Extraer JSON de la respuesta
            const jsonMatch = aiText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No se encontró JSON en la respuesta');
            }

            const aiData = JSON.parse(jsonMatch[0]);
            
            return {
                name: aiData.name || 'Producto Importado',
                category: aiData.category || 'otros',
                price: price,
                originalPrice: Math.round(price * 1.5),
                image: images[0],
                additionalImages: images.slice(1),
                description: aiData.description || briefInfo,
                shortDescription: aiData.shortDescription || briefInfo.substring(0, 150),
                variants: aiData.variants || { colors: [], sizes: [] },
                tags: aiData.tags || ['nuevo'],
                features: aiData.features || [
                    'Alta calidad',
                    'Diseño moderno',
                    'Materiales resistentes'
                ],
                supplierInfo: {
                    url: '',
                    name: 'Proveedor',
                    price: aiData.supplierPrice || Math.round(price * 0.45),
                    notes: briefInfo
                },
                freeShipping: price >= 50000,
                available: true,
                sold: 0,
                rating: 5,
                reviews: 0
            };

        } catch (error) {
            console.error('Error parseando respuesta IA:', error);
            // Fallback a generación simulada
            return this.generateProductSimulated(briefInfo, price, images);
        }
    }

    /**
     * Generación simulada (sin API real)
     * Usado cuando no hay API Key configurada
     */
    generateProductSimulated(info, price, images) {
        const lowerInfo = info.toLowerCase();
        
        // Detectar categoría
        let category = 'otros';
        if (lowerInfo.match(/pantalón|camiseta|ropa|camisa|short|vestido|blusa|falda|jean/)) {
            category = 'ropa';
        } else if (lowerInfo.match(/celular|laptop|tablet|electrónica|audífono|cargador/)) {
            category = 'electronica';
        } else if (lowerInfo.match(/zapato|tenis|sandalia|bota/)) {
            category = 'ropa';
        } else if (lowerInfo.match(/reloj|collar|anillo|pulsera|accesorio/)) {
            category = 'belleza';
        } else if (lowerInfo.match(/libro|revista|cómic/)) {
            category = 'libros';
        } else if (lowerInfo.match(/juguete|muñeca|peluche|juego/)) {
            category = 'juguetes';
        }
        
        // Extraer nombre del producto
        const words = info.split(/[,.]/).filter(w => w.trim().length > 0);
        let productName = 'Producto Importado';
        if (words.length > 0) {
            productName = words[0].trim().split(' ').slice(0, 6).join(' ');
            productName = productName.charAt(0).toUpperCase() + productName.slice(1);
        }
        
        // Generar descripción
        const description = `${productName}

${info}

Características destacadas:
• Producto de alta calidad importado
• Diseño moderno y versátil
• Perfecto para uso diario
• Materiales resistentes y duraderos
• Disponible en stock listo para envío

Detalles del producto:
Este ${productName.toLowerCase()} ha sido cuidadosamente seleccionado para ofrecer la mejor relación calidad-precio. Ideal para quienes buscan estilo, comodidad y durabilidad en un solo producto.

Especificaciones:
El producto cumple con los más altos estándares de calidad. Importado directamente para garantizar autenticidad y el mejor precio del mercado.

Garantía y soporte:
Ofrecemos garantía de satisfacción. Si no estás completamente satisfecho con tu compra, contáctanos y resolveremos cualquier inconveniente.`;

        // Detectar variantes
        const variants = {
            colors: [],
            sizes: []
        };
        
        const colorKeywords = ['negro', 'blanco', 'azul', 'rojo', 'verde', 'amarillo', 'gris', 'rosado', 'morado', 'beige', 'café', 'naranja'];
        colorKeywords.forEach(color => {
            if (lowerInfo.includes(color)) {
                variants.colors.push(color);
            }
        });
        
        const sizeKeywords = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];
        sizeKeywords.forEach(size => {
            if (lowerInfo.match(new RegExp(`\\b${size}\\b`))) {
                variants.sizes.push(size);
            }
        });
        
        // Variantes por defecto según categoría
        if (variants.sizes.length === 0 && category === 'ropa') {
            variants.sizes = ['s', 'm', 'l', 'xl'];
        }
        
        // Extraer precio de proveedor
        let supplierPrice = 0;
        const priceMatch = info.match(/(\d{1,3}(?:[.,]\d{3})*)/g);
        if (priceMatch && priceMatch.length > 0) {
            const foundPrice = parseInt(priceMatch[0].replace(/[.,]/g, ''));
            if (foundPrice < price) {
                supplierPrice = foundPrice;
            }
        }
        
        if (supplierPrice === 0) {
            supplierPrice = Math.round(price * 0.45); // 45% del precio de venta
        }
        
        return {
            name: productName,
            category: category,
            price: price,
            originalPrice: Math.round(price * 1.5),
            image: images[0],
            additionalImages: images.slice(1),
            description: description,
            shortDescription: `${productName} - ${info.substring(0, 100)}...`,
            variants: variants,
            tags: ['nuevo', 'importado'],
            features: [
                'Alta calidad garantizada',
                'Diseño moderno y versátil',
                'Materiales resistentes',
                'Producto importado',
                'Envío rápido disponible',
                'Garantía de satisfacción'
            ],
            supplierInfo: {
                url: '',
                name: 'Proveedor',
                price: supplierPrice,
                notes: info
            },
            freeShipping: price >= 50000,
            available: true,
            sold: 0,
            rating: 5,
            reviews: 0
        };
    }

    /**
     * Analizar imagen con GPT-4 Vision (requiere API Key)
     * @param {string} imageBase64 - Imagen en base64
     * @returns {string} - Descripción de la imagen
     */
    async analyzeImage(imageBase64) {
        if (!this.apiKey) {
            return 'Análisis de imagen no disponible sin API Key';
        }

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: 'Describe este producto en español. Incluye: tipo de producto, color, material visible, características notables. Sé breve (máximo 100 palabras).'
                                },
                                {
                                    type: 'image_url',
                                    image_url: {
                                        url: imageBase64
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens: 200
                })
            });

            const data = await response.json();
            return data.choices[0].message.content;

        } catch (error) {
            console.error('Error analizando imagen:', error);
            return '';
        }
    }
}

// Exportar instancia global
window.aiAssistant = new AIProductAssistant();
