// ============================================
// WEB SCRAPER AI - SIMPLIFIED VERSION
// Importación simplificada desde URLs
// ============================================

class WebScraperAI {
    constructor() {
        this.apiEndpoint = 'https://api.allorigins.win/get?url=';
    }

    /**
     * Extraer información completa del producto desde una URL
     */
    async scrapeProductFromURL(url, supplierPrice = null, sellingPrice = null) {
        console.log('🌐 Iniciando importación de:', url);
        
        try {
            const siteType = this.detectSiteType(url);
            
            // Extraer metadata básica
            const productData = await this.extractMetadata(url, siteType);
            
            // Aplicar precios
            if (supplierPrice) {
                productData.supplierPrice = parseFloat(supplierPrice);
            }
            if (sellingPrice) {
                productData.price = parseFloat(sellingPrice);
            } else if (productData.supplierPrice) {
                productData.price = Math.round(productData.supplierPrice * 1.4);
            } else {
                // Si no hay precio, usar uno por defecto
                productData.supplierPrice = 50000;
                productData.price = 70000;
            }
            
            // Mejorar con IA
            const enhanced = await this.enhanceWithAI(productData);
            
            return enhanced;
            
        } catch (error) {
            console.error('❌ Error:', error);
            throw new Error('No se pudo importar el producto. Usa el modo manual para ingresar los datos.');
        }
    }

    /**
     * Extraer metadata de la página
     */
    async extractMetadata(url, siteType) {
        const productData = {
            sourceUrl: url,
            siteType: siteType,
            name: '',
            description: '',
            price: 0,
            supplierPrice: 0,
            images: [],
            category: 'otros',
            specifications: {},
            brand: this.getSiteName(siteType)
        };

        try {
            const response = await fetch(this.apiEndpoint + encodeURIComponent(url));
            const data = await response.json();
            
            if (data && data.contents) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.contents, 'text/html');
                
                // Extraer título
                productData.name = this.getMetaTag(doc, 'og:title') ||
                                  this.getMetaTag(doc, 'twitter:title') ||
                                  doc.querySelector('title')?.textContent?.trim() ||
                                  'Producto Importado';
                
                // Limpiar nombre
                productData.name = productData.name.substring(0, 100).trim();
                
                // Extraer descripción
                productData.description = this.getMetaTag(doc, 'og:description') ||
                                         this.getMetaTag(doc, 'description') ||
                                         'Producto importado desde ' + this.getSiteName(siteType);
                
                // Extraer imagen principal
                const imageUrl = this.getMetaTag(doc, 'og:image') ||
                               this.getMetaTag(doc, 'twitter:image');
                if (imageUrl) {
                    productData.images.push(imageUrl);
                }
                
                // Extraer precio si está disponible
                const priceTag = this.getMetaTag(doc, 'og:price:amount') ||
                               this.getMetaTag(doc, 'product:price:amount');
                if (priceTag) {
                    const price = parseFloat(priceTag.replace(/[^\d.]/g, ''));
                    if (price > 0 && price < 10000000) {
                        productData.supplierPrice = Math.round(price);
                    }
                }
                
                console.log('✅ Metadata extraída:', {
                    nombre: productData.name,
                    precio: productData.supplierPrice,
                    imagenes: productData.images.length
                });
            }
        } catch (error) {
            console.warn('⚠️ Error extrayendo metadata:', error.message);
            // Continuar con datos básicos
            productData.name = 'Producto desde ' + this.getSiteName(siteType);
            productData.description = 'Importado desde ' + url;
        }

        return productData;
    }

    /**
     * Obtener meta tag
     */
    getMetaTag(doc, property) {
        const meta = doc.querySelector(`meta[property="${property}"]`) ||
                    doc.querySelector(`meta[name="${property}"]`);
        return meta ? meta.getAttribute('content') : null;
    }

    /**
     * Detectar tipo de sitio
     */
    detectSiteType(url) {
        const urlLower = url.toLowerCase();
        
        if (urlLower.includes('mercadolibre')) return 'mercadolibre';
        if (urlLower.includes('amazon')) return 'amazon';
        if (urlLower.includes('aliexpress')) return 'aliexpress';
        if (urlLower.includes('ebay')) return 'ebay';
        if (urlLower.includes('shein')) return 'shein';
        if (urlLower.includes('linio')) return 'linio';
        if (urlLower.includes('falabella')) return 'falabella';
        if (urlLower.includes('exito')) return 'exito';
        
        return 'generic';
    }

    /**
     * Mejorar con IA
     */
    async enhanceWithAI(productData) {
        if (!window.AIProductAssistantEnhanced) {
            throw new Error('AI Assistant no está disponible');
        }

        const aiAssistant = new AIProductAssistantEnhanced();
        
        // Crear descripción breve con los datos extraídos
        const briefInfo = `${productData.name}\n` +
                         `Descripción: ${productData.description}\n` +
                         `Marca: ${productData.brand}\n` +
                         `URL: ${productData.sourceUrl}`;

        // Generar producto completo
        const enhanced = aiAssistant.generateProductComplete(
            briefInfo,
            productData.price,
            productData.images
        );

        // Combinar datos
        return {
            ...enhanced,
            sourceUrl: productData.sourceUrl,
            siteType: productData.siteType,
            supplierInfo: {
                url: productData.sourceUrl,
                name: productData.brand,
                price: productData.supplierPrice,
                notes: `Importado desde ${productData.brand}`
            },
            image: productData.images[0] || enhanced.image,
            additionalImages: productData.images.slice(1).concat(enhanced.additionalImages || [])
        };
    }

    /**
     * Obtener nombre del sitio
     */
    getSiteName(siteType) {
        const names = {
            'mercadolibre': 'MercadoLibre',
            'amazon': 'Amazon',
            'aliexpress': 'AliExpress',
            'ebay': 'eBay',
            'shein': 'SHEIN',
            'linio': 'Linio',
            'falabella': 'Falabella',
            'exito': 'Éxito',
            'generic': 'Tienda Online'
        };
        return names[siteType] || 'Proveedor';
    }

    /**
     * Validar URL
     */
    isValidURL(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    }
}

// Instancia global
window.webScraperAI = new WebScraperAI();
