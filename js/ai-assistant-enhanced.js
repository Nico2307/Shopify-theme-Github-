// ============================================
// AI ASSISTANT - ENHANCED VERSION
// Asistente IA mejorado con especificaciones técnicas
// ============================================

class AIProductAssistantEnhanced extends AIProductAssistant {
    /**
     * Generar producto completo con especificaciones y campos de categoría
     */
    async generateProduct(briefInfo, price, images) {
        console.log('🤖 Generando producto con IA mejorada...');
        return this.generateProductComplete(briefInfo, price, images);
    }

    /**
     * Generación completa del producto
     */
    generateProductComplete(info, price, images) {
        const lowerInfo = info.toLowerCase();
        
        // 1. Detectar categoría
        const category = this.detectCategory(lowerInfo);
        
        // 2. Extraer nombre del producto
        const productName = this.extractProductName(info);
        
        // 3. Generar descripción profesional completa
        const description = this.generateProfessionalDescription(productName, info, category);
        
        // 4. Detectar variantes (colores y tallas)
        const variants = this.detectVariants(lowerInfo, category);
        
        // 5. Generar especificaciones técnicas
        const specifications = this.generateSpecifications(info, category, productName);
        
        // 6. Generar campos específicos de categoría
        const categoryData = this.generateCategoryData(info, category, productName);
        
        // 7. Extraer precio de proveedor
        const supplierPrice = this.extractSupplierPrice(info, price);

        // 8. Calcular análisis financiero completo
        const financialAnalysis = this.calculateFinancialAnalysis(supplierPrice, price, category);

        // 9. Generar información adicional completa
        const additionalInfo = this.generateAdditionalInfo(productName, category, info);

        // 10. Generar URLs de video si es posible
        const videoUrl = this.generateVideoUrl(category, productName, info);

        // 11. Organizar y optimizar imágenes
        const optimizedImages = this.organizeImages(images, category);
        
        return {
            name: productName,
            category: category,
            price: price,
            originalPrice: Math.round(price * 1.5),
            image: optimizedImages.main,
            additionalImages: optimizedImages.gallery,
            description: description,
            shortDescription: this.generateShortDescription(productName, info),
            variants: variants,
            tags: this.generateTags(category, info),
            features: this.generateFeatures(info, category),
            specifications: specifications,
            categoryData: categoryData,
            additionalInfo: additionalInfo,
            videoUrl: videoUrl,
            images360: optimizedImages.view360,
            financialAnalysis: financialAnalysis,
            supplierInfo: {
                url: '',
                name: this.detectBrand(lowerInfo),
                price: supplierPrice,
                notes: info
            },
            freeShipping: price >= 50000,
            available: true,
            sold: 0,
            rating: 5,
            reviews: 0,
            sku: this.generateSKU(category, productName),
            barcode: this.generateBarcode(),
            weight: this.estimateWeight(category),
            dimensions: this.estimateDimensions(category)
        };
    }

    /**
     * Detectar categoría del producto
     */
    detectCategory(lowerInfo) {
        if (lowerInfo.match(/pantalón|camiseta|ropa|camisa|short|vestido|blusa|falda|jean|sudadera|chaqueta/)) {
            return 'ropa';
        } else if (lowerInfo.match(/celular|laptop|tablet|electrónica|audífono|cargador|mouse|teclado|cable/)) {
            return 'electronica';
        } else if (lowerInfo.match(/sofá|mesa|silla|lámpara|almohada|cojín|manta|cortina/)) {
            return 'hogar';
        } else if (lowerInfo.match(/balón|pesa|mancuerna|yoga|fitness|deportivo|running/)) {
            return 'deportes';
        } else if (lowerInfo.match(/crema|shampoo|maquillaje|perfume|loción|gel/)) {
            return 'belleza';
        } else if (lowerInfo.match(/libro|revista|cómic|novela/)) {
            return 'libros';
        } else if (lowerInfo.match(/juguete|muñeca|peluche|juego|lego/)) {
            return 'juguetes';
        } else if (lowerInfo.match(/comida|alimento|snack|bebida/)) {
            return 'alimentos';
        }
        return 'otros';
    }

    /**
     * Extraer nombre del producto
     */
    extractProductName(info) {
        const words = info.split(/[,.]/).filter(w => w.trim().length > 0);
        if (words.length > 0) {
            let name = words[0].trim().split(' ').slice(0, 7).join(' ');
            name = name.replace(/precio.*$/i, '').trim();
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
        return 'Producto Importado';
    }

    /**
     * Generar descripción profesional y completa
     */
    generateProfessionalDescription(productName, info, category) {
        const categoryIntros = {
            ropa: `Descubre este excepcional ${productName.toLowerCase()}, una prenda que combina estilo, comodidad y calidad en perfecta armonía.`,
            electronica: `Presentamos este innovador ${productName.toLowerCase()}, diseñado con tecnología de vanguardia para mejorar tu experiencia digital.`,
            hogar: `Transforma tu espacio con este elegante ${productName.toLowerCase()}, perfecto para añadir funcionalidad y estilo a tu hogar.`,
            deportes: `Alcanza tus metas fitness con este ${productName.toLowerCase()}, diseñado para maximizar tu rendimiento y comodidad.`,
            belleza: `Realza tu belleza natural con este ${productName.toLowerCase()}, formulado con ingredientes de primera calidad.`,
            otros: `Descubre este versátil ${productName.toLowerCase()}, diseñado para satisfacer tus necesidades diarias con calidad superior.`
        };

        const intro = categoryIntros[category] || categoryIntros.otros;

        return `${productName}

${intro}

📋 INFORMACIÓN DEL PRODUCTO

${info}

🌟 CARACTERÍSTICAS DESTACADAS

Este ${productName.toLowerCase()} destaca por:

• **Calidad Premium**: Fabricado con materiales de primera clase que garantizan durabilidad excepcional y resistencia al uso cotidiano.

• **Diseño Innovador**: Estética moderna y contemporánea que se adapta perfectamente a las últimas tendencias y estilos actuales.

• **Versatilidad Máxima**: Ideal para múltiples ocasiones y usos, adaptándose sin esfuerzo a tu estilo de vida dinámico.

• **Comodidad Garantizada**: Diseñado ergonómicamente pensando en tu confort, proporcionando la mejor experiencia posible de uso.

• **Acabados Perfectos**: Atención meticulosa a cada detalle, desde la selección de materiales hasta el acabado final del producto.

💎 DETALLES Y ESPECIFICACIONES

${this.getCategoryDetails(category, productName)}

✨ POR QUÉ ELEGIR ESTE PRODUCTO

Al seleccionar este ${productName.toLowerCase()}, obtienes:

✓ **Excelente Relación Calidad-Precio**: Máxima calidad al mejor precio del mercado
✓ **Producto Verificado**: Cada artículo pasa rigurosos controles de calidad
✓ **Uso Versátil**: Perfecto para uso diario, ocasiones especiales o regalos
✓ **Fácil Mantenimiento**: Diseñado para ser práctico y duradero con mínimo cuidado
✓ **Satisfacción Garantizada**: Compromiso total con tu experiencia de compra

📦 INFORMACIÓN ADICIONAL

**Origen**: Producto importado directamente para asegurar autenticidad y calidad
**Control de Calidad**: Rigurosas inspecciones en cada etapa del proceso
**Empaque**: Protección óptima para garantizar llegada en perfectas condiciones
**Disponibilidad**: En stock y listo para envío inmediato

⭐ GARANTÍA Y SOPORTE

Estamos comprometidos al 100% con tu satisfacción. Nuestro equipo de soporte está disponible para resolver cualquier duda o inquietud. Compra con total confianza sabiendo que respaldamos cada producto que ofrecemos.

🚚 ENVÍO Y ENTREGA

Stock disponible para envío inmediato. Procesa tu pedido hoy y recibe este increíble ${productName.toLowerCase()} directamente en la comodidad de tu hogar.

Nota: Este producto ha sido cuidadosamente seleccionado por nuestro equipo de expertos para garantizar que cumple con los más altos estándares de calidad y satisfacción del cliente.`;
    }

    /**
     * Obtener detalles específicos de categoría
     */
    getCategoryDetails(category, productName) {
        const details = {
            ropa: `Esta prenda representa el equilibrio perfecto entre moda y funcionalidad. Cada pieza ha sido confeccionada con técnicas profesionales de costura, utilizando materiales cuidadosamente seleccionados que aseguran un ajuste perfecto y una caída impecable. El diseño considera aspectos como el corte anatómico, la transpirabilidad del tejido y la durabilidad de las costuras, garantizando que te veas y sientas increíble en cada uso.

El proceso de manufactura incluye múltiples etapas de control de calidad, desde la selección del material hasta el acabado final, asegurando que cada ${productName.toLowerCase()} cumpla con nuestros estrictos estándares. Ya sea para uso casual, profesional o deportivo, esta prenda se adaptará perfectamente a tus necesidades.`,

            electronica: `Este dispositivo incorpora tecnología de última generación, cuidadosamente diseñado para ofrecer rendimiento óptimo, eficiencia energética superior y una experiencia de usuario intuitiva. Cada componente ha sido seleccionado meticulosamente para garantizar compatibilidad perfecta, durabilidad a largo plazo y funcionamiento confiable.

Las especificaciones técnicas incluyen circuitería avanzada, materiales de alta calidad y diseño ergonómico que facilita el uso diario. Compatible con los últimos estándares de la industria, este ${productName.toLowerCase()} está preparado para satisfacer las demandas tecnológicas actuales y futuras.`,

            hogar: `Este artículo transformará tu espacio vital, añadiendo tanto funcionalidad práctica como elegancia estética a tu hogar. Diseñado con materiales de calidad superior y acabados profesionales, es resistente, duradero y fácil de mantener. Perfecto para el uso diario, conservando su aspecto original incluso después de años de uso continuo.

La combinación de diseño atemporal y construcción robusta asegura que este ${productName.toLowerCase()} no solo cumple con su función práctica, sino que también complementa y realza la decoración de cualquier ambiente.`,

            deportes: `Diseñado específicamente para optimizar tu rendimiento deportivo, este producto combina ciencia del deporte, tecnología avanzada y ergonomía superior. Ya seas principiante comenzando tu jornada fitness o atleta experimentado buscando mejorar tus marcas, este ${productName.toLowerCase()} te ayudará a alcanzar tus objetivos con mayor comodidad y eficiencia.

Los materiales deportivos de alta resistencia soportan entrenamientos intensos, mientras que el diseño ergonómico reduce la fatiga y previene lesiones, permitiéndote concentrarte en mejorar tu rendimiento.`,

            belleza: `Formulado con ingredientes cuidadosamente seleccionados que nutren y protegen. Este ${productName.toLowerCase()} ha sido desarrollado considerando las necesidades específicas de cuidado y belleza, ofreciendo resultados visibles y duraderos con un uso regular. La fórmula avanzada combina eficacia con suavidad, siendo apta para uso diario.

Testado dermatológicamente y libre de componentes agresivos, proporciona los beneficios que esperas mientras respeta y cuida tu piel.`,

            otros: `Este producto destaca por su excepcional versatilidad y utilidad práctica. Ha sido desarrollado con atención meticulosa a cada detalle, combinando funcionalidad superior con un diseño atractivo y moderno que complementará perfectamente tu día a día.

La calidad de construcción y los materiales seleccionados aseguran un rendimiento confiable y duradero, convirtiendo este ${productName.toLowerCase()} en una inversión inteligente que disfrutarás por mucho tiempo.`
        };

        return details[category] || details.otros;
    }

    /**
     * Generar descripción corta optimizada
     */
    generateShortDescription(productName, info) {
        const cleanInfo = info
            .replace(/precio.*$/i, '')
            .replace(/proveedor.*$/i, '')
            .trim()
            .substring(0, 120);
        return `${productName} - ${cleanInfo}${cleanInfo.length >= 120 ? '...' : ''}`;
    }

    /**
     * Detectar variantes (colores y tallas)
     */
    detectVariants(lowerInfo, category) {
        const variants = {
            colors: [],
            sizes: []
        };
        
        // Detectar colores
        const colorKeywords = [
            'negro', 'blanco', 'azul', 'rojo', 'verde', 'amarillo', 'gris', 
            'rosado', 'morado', 'beige', 'café', 'naranja', 'violeta', 
            'turquesa', 'plateado', 'dorado', 'rosa', 'crema', 'marino'
        ];
        
        colorKeywords.forEach(color => {
            if (lowerInfo.includes(color)) {
                variants.colors.push(color);
            }
        });
        
        // Detectar tallas
        const sizePatterns = [
            /\bxs\b/, /\bs\b/, /\bm\b/, /\bl\b/, /\bxl\b/, /\bxxl\b/, /\bxxxl\b/,
            /talla\s+única/i, /unitalla/i
        ];
        
        sizePatterns.forEach((pattern, index) => {
            if (pattern.test(lowerInfo)) {
                const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'única'];
                if (!variants.sizes.includes(sizes[index])) {
                    variants.sizes.push(sizes[index]);
                }
            }
        });
        
        // Tallas por defecto para ropa
        if (variants.sizes.length === 0 && category === 'ropa') {
            variants.sizes = ['s', 'm', 'l', 'xl'];
        }
        
        return variants;
    }

    /**
     * Generar tabla de especificaciones técnicas completa
     */
    generateSpecifications(info, category, productName) {
        const specs = [];
        const lowerInfo = info.toLowerCase();

        // Especificaciones generales
        specs.push({ label: 'Nombre del Producto', value: productName });
        specs.push({ label: 'Categoría', value: this.getCategoryDisplayName(category) });
        specs.push({ label: 'Condición', value: 'Nuevo' });
        specs.push({ label: 'Disponibilidad', value: 'En Stock' });

        // Especificaciones por categoría
        switch(category) {
            case 'ropa':
                this.addClothingSpecs(specs, lowerInfo);
                break;
            case 'electronica':
                this.addElectronicsSpecs(specs, lowerInfo);
                break;
            case 'hogar':
                this.addHomeSpecs(specs, lowerInfo);
                break;
            case 'deportes':
                this.addSportsSpecs(specs, lowerInfo);
                break;
            case 'belleza':
                this.addBeautySpecs(specs, lowerInfo);
                break;
            default:
                this.addGeneralSpecs(specs, lowerInfo);
        }

        // Especificaciones finales comunes
        specs.push({ label: 'Garantía', value: 'Garantía de satisfacción 30 días' });
        specs.push({ label: 'Origen', value: 'Importado' });
        specs.push({ label: 'Certificación de Calidad', value: 'Aprobado' });

        return specs;
    }

    /**
     * Especificaciones para ropa
     */
    addClothingSpecs(specs, info) {
        // Material
        const materials = [
            { key: 'algodón', value: '100% Algodón Premium' },
            { key: 'poliéster', value: 'Poliéster de Alta Calidad' },
            { key: 'lino', value: 'Lino Natural' },
            { key: 'jean', value: 'Mezclilla/Denim Resistente' },
            { key: 'cuero', value: 'Cuero Genuino' },
            { key: 'seda', value: 'Seda Natural' }
        ];

        let materialFound = false;
        for (const mat of materials) {
            if (info.includes(mat.key)) {
                specs.push({ label: 'Material Principal', value: mat.value });
                materialFound = true;
                break;
            }
        }
        if (!materialFound) {
            specs.push({ label: 'Material Principal', value: 'Materiales Premium de Alta Calidad' });
        }

        // Composición
        specs.push({ label: 'Composición', value: 'Tejido resistente y duradero' });

        // Género
        if (info.includes('hombre') || info.includes('masculino')) {
            specs.push({ label: 'Género', value: 'Hombre' });
        } else if (info.includes('mujer') || info.includes('femenino')) {
            specs.push({ label: 'Género', value: 'Mujer' });
        } else if (info.includes('niño') || info.includes('niña') || info.includes('infantil')) {
            specs.push({ label: 'Género', value: 'Niños' });
        } else {
            specs.push({ label: 'Género', value: 'Unisex' });
        }

        // Tipo de prenda
        const types = [
            { key: 'pantalón', value: 'Pantalón' },
            { key: 'camiseta', value: 'Camiseta' },
            { key: 'camisa', value: 'Camisa' },
            { key: 'vestido', value: 'Vestido' },
            { key: 'short', value: 'Short/Bermuda' },
            { key: 'sudadera', value: 'Sudadera' },
            { key: 'chaqueta', value: 'Chaqueta' },
            { key: 'blusa', value: 'Blusa' }
        ];

        for (const type of types) {
            if (info.includes(type.key)) {
                specs.push({ label: 'Tipo de Prenda', value: type.value });
                break;
            }
        }

        // Tallas
        const sizes = [];
        ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'].forEach(size => {
            if (info.match(new RegExp(`\\b${size}\\b`))) {
                sizes.push(size.toUpperCase());
            }
        });
        specs.push({ 
            label: 'Tallas Disponibles', 
            value: sizes.length > 0 ? sizes.join(', ') : 'S, M, L, XL'
        });

        // Ajuste
        if (info.includes('slim') || info.includes('ajustado')) {
            specs.push({ label: 'Tipo de Ajuste', value: 'Ajustado/Slim Fit' });
        } else if (info.includes('holgado') || info.includes('oversize')) {
            specs.push({ label: 'Tipo de Ajuste', value: 'Holgado/Oversize' });
        } else {
            specs.push({ label: 'Tipo de Ajuste', value: 'Regular/Cómodo' });
        }

        // Temporada
        if (info.includes('verano')) {
            specs.push({ label: 'Temporada', value: 'Verano/Primavera' });
        } else if (info.includes('invierno')) {
            specs.push({ label: 'Temporada', value: 'Otoño/Invierno' });
        } else {
            specs.push({ label: 'Temporada', value: 'Todo el Año' });
        }

        // Cuidado y mantenimiento
        specs.push({ label: 'Instrucciones de Lavado', value: 'Lavar a máquina con agua fría (30°C)' });
        specs.push({ label: 'Secado', value: 'Secar al aire, no usar secadora' });
        specs.push({ label: 'Planchado', value: 'Planchar a temperatura media si es necesario' });
        specs.push({ label: 'Uso de Lejía', value: 'No usar lejía ni blanqueadores' });
    }

    /**
     * Especificaciones para electrónica
     */
    addElectronicsSpecs(specs, info) {
        // Tipo de dispositivo
        const deviceTypes = [
            { key: 'audífono', value: 'Audífonos' },
            { key: 'cargador', value: 'Cargador' },
            { key: 'mouse', value: 'Mouse/Ratón' },
            { key: 'teclado', value: 'Teclado' },
            { key: 'cable', value: 'Cable/Accesorio' },
            { key: 'laptop', value: 'Laptop/Portátil' },
            { key: 'tablet', value: 'Tablet' }
        ];

        for (const device of deviceTypes) {
            if (info.includes(device.key)) {
                specs.push({ label: 'Tipo de Dispositivo', value: device.value });
                break;
            }
        }

        // Conectividad
        if (info.includes('bluetooth')) {
            specs.push({ label: 'Conectividad', value: 'Bluetooth/Inalámbrico' });
            specs.push({ label: 'Versión Bluetooth', value: '5.0 o superior' });
        } else if (info.includes('inalámbrico') || info.includes('wireless')) {
            specs.push({ label: 'Conectividad', value: 'Inalámbrico' });
        } else {
            specs.push({ label: 'Conectividad', value: 'Con Cable/USB' });
        }

        // Batería
        const batteryMatch = info.match(/(\d+)\s*(hora|horas|h)/i);
        if (batteryMatch) {
            specs.push({ label: 'Duración de Batería', value: `${batteryMatch[1]} horas de uso continuo` });
            specs.push({ label: 'Tiempo de Carga', value: '2-3 horas aproximadamente' });
            specs.push({ label: 'Tipo de Batería', value: 'Litio recargable' });
        }

        // Características adicionales
        if (info.includes('micrófono')) {
            specs.push({ label: 'Micrófono', value: 'Micrófono integrado con reducción de ruido' });
        }

        if (info.includes('recargable')) {
            specs.push({ label: 'Recargable', value: 'Sí, vía USB' });
        }

        // Compatibilidad
        specs.push({ label: 'Compatibilidad', value: 'Universal - Compatible con la mayoría de dispositivos' });
        specs.push({ label: 'Sistemas Operativos', value: 'Windows, Mac, Android, iOS' });

        // Contenido del paquete
        specs.push({ label: 'Incluye en el Paquete', value: 'Producto, cable de carga USB, manual de usuario' });
        specs.push({ label: 'Certificaciones', value: 'CE, FCC, RoHS' });
    }

    /**
     * Especificaciones para hogar
     */
    addHomeSpecs(specs, info) {
        specs.push({ label: 'Uso Recomendado', value: 'Interior/Hogar' });
        
        // Material
        const materials = [
            { key: 'algodón', value: 'Algodón 100%' },
            { key: 'poliéster', value: 'Poliéster de Alta Calidad' },
            { key: 'madera', value: 'Madera Natural' },
            { key: 'metal', value: 'Metal Resistente' },
            { key: 'plástico', value: 'Plástico Duradero' }
        ];

        for (const mat of materials) {
            if (info.includes(mat.key)) {
                specs.push({ label: 'Material', value: mat.value });
                break;
            }
        }

        specs.push({ label: 'Mantenimiento', value: 'Fácil limpieza y mantenimiento' });
        specs.push({ label: 'Durabilidad', value: 'Alta resistencia al uso diario' });
        specs.push({ label: 'Estilo', value: 'Moderno/Contemporáneo' });
        specs.push({ label: 'Instalación', value: 'No requiere instalación compleja' });
    }

    /**
     * Especificaciones para deportes
     */
    addSportsSpecs(specs, info) {
        specs.push({ label: 'Categoría Deportiva', value: 'Fitness y Entrenamiento' });
        specs.push({ label: 'Nivel de Usuario', value: 'Principiante a Avanzado' });
        
        // Actividad específica
        const activities = [
            { key: 'yoga', value: 'Yoga y Pilates' },
            { key: 'running', value: 'Running/Carrera' },
            { key: 'gym', value: 'Gimnasio/Musculación' },
            { key: 'fútbol', value: 'Fútbol' },
            { key: 'ciclismo', value: 'Ciclismo' }
        ];

        for (const activity of activities) {
            if (info.includes(activity.key)) {
                specs.push({ label: 'Actividad Principal', value: activity.value });
                break;
            }
        }

        specs.push({ label: 'Material', value: 'Materiales deportivos de alta resistencia' });
        specs.push({ label: 'Características Especiales', value: 'Antideslizante, ergonómico, duradero' });
        specs.push({ label: 'Cuidado', value: 'Limpiar con paño húmedo después de cada uso' });
    }

    /**
     * Especificaciones para belleza
     */
    addBeautySpecs(specs, info) {
        specs.push({ label: 'Tipo de Producto', value: 'Cuidado Personal y Belleza' });
        specs.push({ label: 'Aplicación', value: 'Fácil aplicación, resultados visibles' });
        specs.push({ label: 'Apto Para', value: 'Todo tipo de piel' });
        specs.push({ label: 'Testado', value: 'Dermatológicamente testado' });
        specs.push({ label: 'Ingredientes', value: 'Fórmula con ingredientes de calidad' });
        specs.push({ label: 'Libre de', value: 'Parabenos, sulfatos agresivos' });
        specs.push({ label: 'Modo de Uso', value: 'Aplicar según instrucciones del empaque' });
    }

    /**
     * Especificaciones generales
     */
    addGeneralSpecs(specs, info) {
        specs.push({ label: 'Tipo de Producto', value: 'Artículo de uso general' });
        specs.push({ label: 'Calidad', value: 'Premium' });
        specs.push({ label: 'Uso', value: 'Versátil y multifuncional' });
        specs.push({ label: 'Mantenimiento', value: 'Fácil cuidado' });
    }

    /**
     * Nombre de categoría para mostrar
     */
    getCategoryDisplayName(category) {
        const names = {
            ropa: 'Ropa y Accesorios',
            electronica: 'Electrónica y Tecnología',
            hogar: 'Hogar y Decoración',
            deportes: 'Deportes y Fitness',
            belleza: 'Belleza y Cuidado Personal',
            libros: 'Libros y Medios',
            juguetes: 'Juguetes y Entretenimiento',
            alimentos: 'Alimentos y Bebidas',
            otros: 'Otros Productos'
        };
        return names[category] || 'Producto';
    }

    /**
     * Generar campos específicos de categoría
     */
    generateCategoryData(info, category, productName) {
        const lowerInfo = info.toLowerCase();
        const data = {};

        switch(category) {
            case 'ropa':
                data.material = this.extractMaterial(lowerInfo);
                data.genero = this.extractGender(lowerInfo);
                data.temporada = this.extractSeason(lowerInfo);
                data.tipoRopa = this.extractClothingType(lowerInfo);
                data.ajuste = lowerInfo.includes('slim') ? 'Ajustado' : 'Regular';
                data.cuidado = 'Lavar a máquina, no usar lejía';
                break;

            case 'electronica':
                data.marca = this.detectBrand(lowerInfo);
                data.conectividad = lowerInfo.match(/bluetooth|inalámbrico/) ? 'Inalámbrica' : 'Con cable';
                data.garantia = '30 días garantía de satisfacción';
                const batteryMatch = lowerInfo.match(/(\d+)\s*(hora|horas|h)/);
                if (batteryMatch) {
                    data.bateria = `${batteryMatch[1]} horas`;
                }
                data.certificacion = 'CE, FCC, RoHS';
                break;

            case 'hogar':
                data.material = this.extractMaterial(lowerInfo) || 'Materiales de calidad premium';
                data.uso = 'Interior';
                data.mantenimiento = 'Fácil limpieza y cuidado';
                data.estilo = 'Moderno';
                break;

            case 'deportes':
                data.actividad = this.extractActivity(lowerInfo);
                data.nivel = 'Todos los niveles';
                data.material = 'Materiales deportivos resistentes';
                data.caracteristicas = 'Antideslizante, ergonómico';
                break;

            case 'belleza':
                data.tipoProducto = 'Cuidado personal';
                data.aplicacion = 'Fácil aplicación';
                data.aptoPara = 'Todo tipo de piel';
                data.testado = 'Dermatológicamente testado';
                break;
        }

        return data;
    }

    // Métodos auxiliares
    extractMaterial(info) {
        const materials = {
            'algodón': 'Algodón 100%',
            'poliéster': 'Poliéster Premium',
            'lino': 'Lino Natural',
            'jean': 'Mezclilla/Denim',
            'cuero': 'Cuero Genuino',
            'seda': 'Seda Natural',
            'madera': 'Madera Natural',
            'metal': 'Metal',
            'plástico': 'Plástico de Alta Calidad'
        };

        for (const [key, value] of Object.entries(materials)) {
            if (info.includes(key)) return value;
        }
        return 'Materiales Premium de Alta Calidad';
    }

    extractGender(info) {
        if (info.includes('hombre') || info.includes('masculino')) return 'Hombre';
        if (info.includes('mujer') || info.includes('femenino')) return 'Mujer';
        if (info.includes('niño') || info.includes('niña')) return 'Niños';
        return 'Unisex';
    }

    extractSeason(info) {
        if (info.includes('verano')) return 'Verano';
        if (info.includes('invierno')) return 'Invierno';
        if (info.includes('otoño')) return 'Otoño';
        if (info.includes('primavera')) return 'Primavera';
        return 'Todo el Año';
    }

    extractClothingType(info) {
        const types = {
            'pantalón': 'Pantalón',
            'camiseta': 'Camiseta',
            'camisa': 'Camisa',
            'vestido': 'Vestido',
            'short': 'Short',
            'sudadera': 'Sudadera',
            'chaqueta': 'Chaqueta'
        };

        for (const [key, value] of Object.entries(types)) {
            if (info.includes(key)) return value;
        }
        return 'Prenda de Vestir';
    }

    detectBrand(info) {
        const brands = ['shein', 'amazon', 'samsung', 'apple', 'xiaomi', 'huawei', 'sony', 'lg', 'nike', 'adidas', 'puma', 'reebok'];
        for (const brand of brands) {
            if (info.includes(brand)) {
                return brand.charAt(0).toUpperCase() + brand.slice(1);
            }
        }
        return 'Marca Premium';
    }

    extractActivity(info) {
        const activities = {
            'yoga': 'Yoga',
            'running': 'Running',
            'correr': 'Running',
            'gym': 'Gimnasio',
            'gimnasio': 'Gimnasio',
            'fútbol': 'Fútbol',
            'natación': 'Natación'
        };

        for (const [key, value] of Object.entries(activities)) {
            if (info.includes(key)) return value;
        }
        return 'Fitness General';
    }

    /**
     * Generar características destacadas
     */
    generateFeatures(info, category) {
        const baseFeatures = [
            'Alta calidad garantizada',
            'Diseño moderno y versátil',
            'Materiales resistentes y duraderos'
        ];

        const categoryFeatures = {
            ropa: [
                'Ajuste cómodo y favorecedor',
                'Fácil de lavar y mantener',
                'Perfecto para múltiples ocasiones'
            ],
            electronica: [
                'Tecnología de última generación',
                'Fácil de usar y configurar',
                'Bajo consumo energético'
            ],
            hogar: [
                'Se integra perfectamente con cualquier decoración',
                'Resistente al uso diario intensivo',
                'Fácil mantenimiento y limpieza'
            ],
            deportes: [
                'Mejora significativa del rendimiento deportivo',
                'Diseño ergonómico y cómodo',
                'Ideal para principiantes y profesionales'
            ],
            belleza: [
                'Resultados visibles y duraderos',
                'Fórmula segura y efectiva',
                'Apto para uso diario'
            ]
        };

        const specificFeatures = categoryFeatures[category] || [
            'Producto importado de calidad',
            'Excelente relación calidad-precio',
            'Garantía de satisfacción total'
        ];

        return [...baseFeatures, ...specificFeatures];
    }

    /**
     * Generar tags relevantes
     */
    generateTags(category, info) {
        const tags = ['nuevo', 'importado', 'calidad'];
        const lowerInfo = info.toLowerCase();

        const categoryTags = {
            ropa: ['moda', 'estilo'],
            electronica: ['tech', 'gadget'],
            hogar: ['decoración', 'hogar'],
            deportes: ['fitness', 'deporte'],
            belleza: ['belleza', 'cuidado'],
            libros: ['lectura', 'libro'],
            juguetes: ['diversión', 'juego']
        };

        if (categoryTags[category]) {
            tags.push(...categoryTags[category]);
        }

        // Tags adicionales del texto
        if (lowerInfo.includes('premium')) tags.push('premium');
        if (lowerInfo.includes('unisex')) tags.push('unisex');
        if (lowerInfo.includes('ecológico') || lowerInfo.includes('eco')) tags.push('eco-friendly');

        return [...new Set(tags)].slice(0, 6);
    }

    /**
     * Extraer precio de proveedor
     */
    extractSupplierPrice(info, price) {
        const priceMatches = info.match(/(\d{1,3}(?:[.,]\d{3})*(?:\.\d{2})?)/g);
        if (priceMatches) {
            for (const match of priceMatches) {
                const foundPrice = parseInt(match.replace(/[.,]/g, ''));
                if (foundPrice > 0 && foundPrice < price) {
                    return foundPrice;
                }
            }
        }
        return Math.round(price * 0.45); // 45% por defecto
    }

    /**
     * Calcular análisis financiero completo del producto
     */
    calculateFinancialAnalysis(supplierPrice, currentPrice, category) {
        // Costos fijos y variables
        const costs = {
            shipping: this.estimateShippingCost(supplierPrice, category),
            packaging: this.estimatePackagingCost(category),
            transaction: Math.round(currentPrice * 0.04), // 4% comisión MercadoPago/tarjetas
            platform: Math.round(currentPrice * 0.02), // 2% plataforma
            marketing: Math.round(currentPrice * 0.05), // 5% marketing estimado
            storage: 1000, // Costo almacenamiento por producto
            handling: 2000 // Costo manejo/empaque
        };

        // Costo total
        const totalCosts = supplierPrice + 
                          costs.shipping + 
                          costs.packaging + 
                          costs.transaction + 
                          costs.platform + 
                          costs.marketing + 
                          costs.storage + 
                          costs.handling;

        // Ganancia bruta actual
        const currentProfit = currentPrice - totalCosts;
        const currentMargin = ((currentProfit / currentPrice) * 100).toFixed(1);

        // Calcular precio recomendado
        const recommendedPrice = this.calculateRecommendedPrice(supplierPrice, category, costs);
        const recommendedCosts = this.recalculateCosts(costs, recommendedPrice, currentPrice);
        const recommendedTotalCosts = supplierPrice + 
                                     Object.values(recommendedCosts).reduce((a, b) => a + b, 0);
        const recommendedProfit = recommendedPrice - recommendedTotalCosts;
        const recommendedMargin = ((recommendedProfit / recommendedPrice) * 100).toFixed(1);

        // Análisis de rentabilidad
        const isProfitable = currentProfit > 0;
        const profitabilityLevel = this.getProfitabilityLevel(parseFloat(currentMargin));
        const recommendations = this.generatePriceRecommendations(
            currentPrice, 
            recommendedPrice, 
            currentMargin, 
            profitabilityLevel,
            category
        );

        // Punto de equilibrio
        const monthlyFixedCosts = 50000; // Costos fijos mensuales estimados
        const breakEvenUnits = Math.ceil(monthlyFixedCosts / currentProfit);

        // Comparación con competencia
        const marketComparison = this.getMarketComparison(currentPrice, category);

        return {
            // Precio y costos actuales
            currentPrice: currentPrice,
            supplierPrice: supplierPrice,
            costs: {
                breakdown: costs,
                total: Math.round(totalCosts)
            },
            
            // Ganancia actual
            currentProfit: Math.round(currentProfit),
            currentMargin: parseFloat(currentMargin),
            currentMarkup: (((currentPrice - supplierPrice) / supplierPrice) * 100).toFixed(1),
            
            // Precio recomendado
            recommendedPrice: recommendedPrice,
            recommendedCosts: {
                breakdown: recommendedCosts,
                total: Math.round(recommendedTotalCosts)
            },
            recommendedProfit: Math.round(recommendedProfit),
            recommendedMargin: parseFloat(recommendedMargin),
            
            // Análisis
            isProfitable: isProfitable,
            profitabilityLevel: profitabilityLevel,
            recommendations: recommendations,
            
            // Métricas adicionales
            breakEvenUnits: breakEvenUnits,
            potentialMonthlyRevenue: this.estimateMonthlyRevenue(currentPrice, category),
            competitiveness: marketComparison.level,
            marketPosition: marketComparison.position,
            
            // Resumen visual
            summary: this.generateFinancialSummary(
                currentPrice,
                supplierPrice,
                currentProfit,
                currentMargin,
                isProfitable,
                profitabilityLevel
            )
        };
    }

    /**
     * Estimar costo de envío desde proveedor
     */
    estimateShippingCost(supplierPrice, category) {
        // Basado en categoría y precio
        const baseShipping = {
            ropa: 5000,
            electronica: 8000,
            hogar: 12000,
            deportes: 7000,
            belleza: 4000,
            otros: 6000
        };

        const shipping = baseShipping[category] || 6000;
        
        // Ajustar según precio (productos más caros pueden tener envío incluido)
        if (supplierPrice > 100000) {
            return Math.round(shipping * 0.5);
        }
        
        return shipping;
    }

    /**
     * Estimar costo de empaque
     */
    estimatePackagingCost(category) {
        const packaging = {
            ropa: 1500,
            electronica: 2500,
            hogar: 3000,
            deportes: 2000,
            belleza: 1000,
            otros: 1500
        };

        return packaging[category] || 1500;
    }

    /**
     * Calcular precio recomendado
     */
    calculateRecommendedPrice(supplierPrice, category, currentCosts) {
        // Margen objetivo según categoría
        const targetMargins = {
            ropa: 0.40,        // 40% margen
            electronica: 0.35, // 35% margen
            hogar: 0.38,       // 38% margen
            deportes: 0.37,    // 37% margen
            belleza: 0.42,     // 42% margen
            otros: 0.35        // 35% margen
        };

        const targetMargin = targetMargins[category] || 0.35;

        // Estimar costos totales
        const estimatedCosts = supplierPrice + 
                             (currentCosts.shipping || 0) +
                             (currentCosts.packaging || 0) +
                             (currentCosts.storage || 0) +
                             (currentCosts.handling || 0);

        // Precio con margen objetivo
        // Precio = Costos / (1 - Margen - % Comisiones)
        const commissionRate = 0.06; // 6% comisiones + marketing
        const recommendedPrice = Math.ceil(estimatedCosts / (1 - targetMargin - commissionRate));

        // Redondear a miles
        return Math.ceil(recommendedPrice / 1000) * 1000;
    }

    /**
     * Recalcular costos con nuevo precio
     */
    recalculateCosts(originalCosts, newPrice, oldPrice) {
        const ratio = newPrice / oldPrice;
        
        return {
            shipping: originalCosts.shipping, // Fijo
            packaging: originalCosts.packaging, // Fijo
            transaction: Math.round(newPrice * 0.04),
            platform: Math.round(newPrice * 0.02),
            marketing: Math.round(newPrice * 0.05),
            storage: originalCosts.storage, // Fijo
            handling: originalCosts.handling // Fijo
        };
    }

    /**
     * Nivel de rentabilidad
     */
    getProfitabilityLevel(margin) {
        if (margin < 0) return 'NO RENTABLE ❌';
        if (margin < 15) return 'BAJA RENTABILIDAD ⚠️';
        if (margin < 25) return 'RENTABILIDAD MODERADA ⚡';
        if (margin < 35) return 'BUENA RENTABILIDAD ✅';
        if (margin < 45) return 'EXCELENTE RENTABILIDAD 🌟';
        return 'RENTABILIDAD EXCEPCIONAL 💎';
    }

    /**
     * Generar recomendaciones de precio
     */
    generatePriceRecommendations(currentPrice, recommendedPrice, margin, level, category) {
        const recommendations = [];

        // Análisis del precio actual
        if (margin < 0) {
            recommendations.push({
                type: 'CRÍTICO',
                icon: '🚨',
                title: 'Producto NO RENTABLE',
                message: `Estás perdiendo $${Math.abs(Math.round(currentPrice - recommendedPrice))} por venta. DEBES aumentar el precio.`,
                action: `Precio mínimo recomendado: $${recommendedPrice.toLocaleString()}`
            });
        } else if (margin < 15) {
            recommendations.push({
                type: 'ADVERTENCIA',
                icon: '⚠️',
                title: 'Margen muy bajo',
                message: `Solo ganas ${margin}% por venta. Es difícil cubrir imprevistos.`,
                action: `Considera aumentar a $${recommendedPrice.toLocaleString()} para mejor margen`
            });
        } else if (margin < 25) {
            recommendations.push({
                type: 'MEJORA',
                icon: '📊',
                title: 'Margen moderado',
                message: `Margen del ${margin}% es aceptable pero puede mejorar.`,
                action: `Precio óptimo: $${recommendedPrice.toLocaleString()} (${((recommendedPrice - currentPrice) / currentPrice * 100).toFixed(1)}% más)`
            });
        } else if (margin > 50) {
            recommendations.push({
                type: 'OPORTUNIDAD',
                icon: '💰',
                title: 'Margen muy alto',
                message: `Margen del ${margin}% podría hacer el producto menos competitivo.`,
                action: `Podrías reducir precio ligeramente para vender más volumen`
            });
        } else {
            recommendations.push({
                type: 'ÉXITO',
                icon: '✅',
                title: 'Precio bien establecido',
                message: `Margen del ${margin}% es excelente para ${category}.`,
                action: `Mantén este rango de precio`
            });
        }

        // Consejo de competitividad
        const priceDiff = recommendedPrice - currentPrice;
        if (Math.abs(priceDiff) > 5000) {
            if (priceDiff > 0) {
                recommendations.push({
                    type: 'SUGERENCIA',
                    icon: '💡',
                    title: 'Optimizar ganancia',
                    message: `Puedes ganar $${Math.abs(priceDiff).toLocaleString()} más por unidad.`,
                    action: `Sube gradualmente el precio para maximizar rentabilidad`
                });
            } else {
                recommendations.push({
                    type: 'SUGERENCIA',
                    icon: '💡',
                    title: 'Ventaja competitiva',
                    message: `Tu precio está $${Math.abs(priceDiff).toLocaleString()} por debajo del óptimo.`,
                    action: `Mantén este precio para atraer más clientes`
                });
            }
        }

        // Consejo de envío gratis
        if (currentPrice < 50000 && currentPrice > 40000) {
            recommendations.push({
                type: 'TIP',
                icon: '🚚',
                title: 'Casi envío gratis',
                message: `Estás a $${(50000 - currentPrice).toLocaleString()} del umbral de envío gratis.`,
                action: `Considera ajustar a $50.000+ para ofrecer envío gratis`
            });
        }

        return recommendations;
    }

    /**
     * Comparación con mercado
     */
    getMarketComparison(price, category) {
        // Rangos de precio promedio por categoría
        const marketRanges = {
            ropa: { low: 30000, mid: 65000, high: 120000 },
            electronica: { low: 50000, mid: 120000, high: 300000 },
            hogar: { low: 40000, mid: 90000, high: 200000 },
            deportes: { low: 35000, mid: 80000, high: 180000 },
            belleza: { low: 20000, mid: 50000, high: 100000 },
            otros: { low: 25000, mid: 60000, high: 150000 }
        };

        const range = marketRanges[category] || marketRanges.otros;

        let level, position;
        if (price < range.low) {
            level = 'MUY COMPETITIVO';
            position = 'Precio bajo - atrae clientes sensibles al precio';
        } else if (price < range.mid) {
            level = 'COMPETITIVO';
            position = 'Precio medio - equilibrio entre valor y accesibilidad';
        } else if (price < range.high) {
            level = 'PREMIUM';
            position = 'Precio alto - posicionamiento de calidad';
        } else {
            level = 'ULTRA PREMIUM';
            position = 'Precio muy alto - mercado exclusivo';
        }

        return { level, position };
    }

    /**
     * Estimar ingresos mensuales potenciales
     */
    estimateMonthlyRevenue(price, category) {
        // Ventas estimadas por categoría (mensual)
        const avgMonthlySales = {
            ropa: 15,
            electronica: 10,
            hogar: 8,
            deportes: 12,
            belleza: 18,
            otros: 10
        };

        const sales = avgMonthlySales[category] || 10;
        return price * sales;
    }

    /**
     * Generar resumen financiero
     */
    generateFinancialSummary(currentPrice, supplierPrice, profit, margin, isProfitable, level) {
        const emoji = isProfitable ? 
            (margin >= 30 ? '🌟' : margin >= 20 ? '✅' : '⚡') : 
            '❌';

        return `${emoji} ${level}

💰 Precio Venta: $${currentPrice.toLocaleString()}
🏷️ Costo Proveedor: $${supplierPrice.toLocaleString()}
📊 Ganancia: $${profit.toLocaleString()} (${margin}%)
${isProfitable ? '✅ Producto RENTABLE' : '❌ Producto NO RENTABLE'}`;
    }

    /**
     * Generar información adicional completa del producto
     */
    generateAdditionalInfo(productName, category, info) {
        const additionalInfo = {
            usageInstructions: this.generateUsageInstructions(category, productName),
            careInstructions: this.generateCareInstructions(category),
            warranty: this.generateWarrantyInfo(category),
            shipping: this.generateShippingInfo(category),
            returns: this.generateReturnPolicy(),
            faqs: this.generateFAQs(category, productName),
            relatedProducts: this.generateRelatedProductsSuggestions(category),
            sizeGuide: this.generateSizeGuide(category),
            materials: this.generateMaterialsInfo(category, info),
            certifications: this.generateCertifications(category),
            sustainability: this.generateSustainabilityInfo(category),
            packaging: this.generatePackagingInfo(category)
        };

        return additionalInfo;
    }

    /**
     * Instrucciones de uso
     */
    generateUsageInstructions(category, productName) {
        const instructions = {
            ropa: `**Cómo usar tu ${productName}:**

1. **Primera vez**: Lavar antes del primer uso para eliminar posibles residuos del proceso de fabricación
2. **Ajuste**: Verificar la talla según nuestra guía de medidas para un ajuste perfecto
3. **Combinaciones**: Esta prenda combina perfectamente con jeans, pantalones casuales o deportivos
4. **Ocasiones**: Ideal para uso diario, actividades deportivas, reuniones casuales
5. **Cuidado diario**: Evitar contacto prolongado con superficies ásperas que puedan dañar el tejido`,

            electronica: `**Configuración y Uso de tu ${productName}:**

1. **Desempaquetado**: Verificar que todos los componentes estén incluidos
2. **Carga inicial**: Cargar completamente el dispositivo antes del primer uso (si aplica)
3. **Configuración**: Seguir las instrucciones del manual para configuración inicial
4. **Conexión**: Emparejar con tus dispositivos mediante Bluetooth o cable USB
5. **Uso óptimo**: Mantener el firmware actualizado para mejor rendimiento
6. **Almacenamiento**: Guardar en lugar seco, alejado de temperaturas extremas`,

            hogar: `**Instalación y Uso de tu ${productName}:**

1. **Ubicación**: Elegir el espacio ideal según las dimensiones del producto
2. **Montaje**: Seguir instrucciones de ensamblaje (si requiere)
3. **Limpieza inicial**: Limpiar con paño húmedo antes del primer uso
4. **Uso diario**: Utilizar según diseño, evitando sobrecargar o uso indebido
5. **Mantenimiento**: Limpieza regular para prolongar la vida útil`,

            deportes: `**Cómo usar tu ${productName} para Máximo Rendimiento:**

1. **Preparación**: Realizar calentamiento antes de usar el equipo
2. **Ajuste**: Configurar según tu nivel de experiencia y objetivos
3. **Técnica**: Usar forma correcta para evitar lesiones
4. **Progresión**: Incrementar intensidad gradualmente
5. **Limpieza post-uso**: Limpiar después de cada sesión para higiene
6. **Almacenamiento**: Guardar en lugar seco y ventilado`,

            belleza: `**Aplicación de tu ${productName}:**

1. **Preparación**: Limpiar y secar el área de aplicación
2. **Cantidad**: Usar cantidad moderada según necesidad
3. **Aplicación**: Aplicar con movimientos suaves y uniformes
4. **Frecuencia**: Usar según recomendaciones (diario, semanal, etc.)
5. **Resultados**: Esperar tiempo indicado para ver efectos completos
6. **Precauciones**: Evitar contacto con ojos, suspender si hay irritación`
        };

        return instructions[category] || `**Instrucciones de uso de tu ${productName}:**\n\nUsar según indicaciones del producto. Leer manual incluido. Seguir recomendaciones del fabricante para mejor experiencia.`;
    }

    /**
     * Instrucciones de cuidado
     */
    generateCareInstructions(category) {
        const care = {
            ropa: `**Cuidado y Mantenimiento:**
- Lavar a máquina en ciclo suave con agua fría (máx 30°C)
- Usar detergente suave, evitar blanqueadores
- Lavar colores oscuros separados de claros
- Secar al aire libre, evitar secadora
- Planchar a temperatura baja-media si necesario
- No usar limpieza en seco a menos que sea necesario
- Guardar doblado en lugar seco y ventilado`,

            electronica: `**Mantenimiento y Cuidado:**
- Limpiar con paño suave y seco regularmente
- No exponer a líquidos o humedad excesiva
- Evitar temperaturas extremas (calor/frío)
- Usar solo accesorios originales o certificados
- Desconectar cuando no esté en uso prolongado
- Actualizar firmware cuando esté disponible
- No desmontar, acudir a técnico certificado si hay problemas`,

            hogar: `**Mantenimiento:**
- Limpiar regularmente con paño húmedo
- Usar productos de limpieza apropiados al material
- Evitar productos químicos abrasivos
- Proteger de luz solar directa prolongada
- Revisar periódicamente tornillos y conexiones
- Reparar daños menores inmediatamente`,

            deportes: `**Cuidado del Equipo:**
- Limpiar después de cada uso
- Secar completamente antes de guardar
- Almacenar en lugar fresco y seco
- Revisar desgaste regularmente
- Reemplazar si muestra signos de deterioro
- No dejar expuesto al sol o humedad`,

            belleza: `**Conservación del Producto:**
- Cerrar bien después de cada uso
- Almacenar en lugar fresco y seco
- Evitar exposición directa al sol
- No compartir con otras personas
- Verificar fecha de caducidad
- Suspender uso si cambia olor/textura`
        };

        return care[category] || 'Seguir instrucciones del fabricante para cuidado óptimo.';
    }

    /**
     * Información de garantía
     */
    generateWarrantyInfo(category) {
        return `**Garantía del Producto:**

✓ **30 días de garantía de satisfacción**
- Si no estás completamente satisfecho, puedes devolver el producto dentro de los primeros 30 días

✓ **Garantía contra defectos de fabricación**
- Cubrimos cualquier defecto de fábrica durante los primeros 90 días

✓ **Qué cubre:**
- Defectos de materiales
- Problemas de fabricación
- Fallas en funcionamiento normal

✓ **Qué NO cubre:**
- Daño por mal uso o negligencia
- Desgaste normal por el uso
- Modificaciones no autorizadas
- Daños durante el transporte (reportar inmediatamente)

**Para hacer válida la garantía:** Contactar a servicio al cliente con número de orden y fotos del producto.`;
    }

    /**
     * Información de envío
     */
    generateShippingInfo(category) {
        return `**Información de Envío:**

🚚 **Tiempos de Entrega:**
- Ciudades principales: 3-5 días hábiles
- Otras ciudades: 5-8 días hábiles
- Zonas rurales: 8-12 días hábiles

📦 **Opciones de Envío:**
- Envío estándar: $8.000 COP
- Envío express: $15.000 COP (2-3 días)
- **Envío GRATIS** en compras superiores a $50.000

✓ **Seguimiento:**
- Recibirás número de rastreo por email
- Rastrea tu pedido en tiempo real

📍 **Cobertura:**
- Envíos a todo el país
- Entrega a domicilio o punto de recogida

⚠️ **Importante:**
- Verificar dirección de envío antes de finalizar compra
- Alguien debe estar disponible para recibir el paquete`;
    }

    /**
     * Política de devoluciones
     */
    generateReturnPolicy() {
        return `**Política de Devoluciones:**

✓ **30 días para devoluciones**
- Acepto devoluciones dentro de 30 días desde la recepción

✓ **Condiciones:**
- Producto sin usar, con etiquetas originales
- En empaque original y en perfectas condiciones
- Incluir todos los accesorios y manuales

✓ **Proceso de Devolución:**
1. Contactar servicio al cliente
2. Recibir autorización de devolución
3. Enviar producto (costos de envío a cargo del cliente)
4. Reembolso procesado en 5-7 días hábiles tras recepción

✓ **Reembolso:**
- Mismo método de pago original
- Se descuentan costos de envío inicial (si aplica)

❌ **No se aceptan devoluciones:**
- Productos personalizados
- Artículos de higiene personal abiertos
- Productos dañados por mal uso`;
    }

    /**
     * Preguntas frecuentes
     */
    generateFAQs(category, productName) {
        const faqs = {
            ropa: [
                {
                    q: '¿Cómo sé qué talla elegir?',
                    a: 'Consulta nuestra guía de tallas detallada en la sección de especificaciones. Si estás entre dos tallas, recomendamos elegir la mayor para mayor comodidad.'
                },
                {
                    q: '¿El color es exacto a las fotos?',
                    a: 'Las fotos son referenciales. Pueden existir ligeras variaciones por calibración de pantallas. Nos esforzamos por mostrar colores lo más fieles posible.'
                },
                {
                    q: '¿Se encoge al lavar?',
                    a: 'Si sigues las instrucciones de lavado (agua fría, no secadora), el producto mantendrá su forma y tamaño originales.'
                }
            ],
            electronica: [
                {
                    q: '¿Es compatible con mi dispositivo?',
                    a: 'Este producto es compatible con la mayoría de dispositivos modernos. Verifica las especificaciones técnicas para confirmar compatibilidad específica.'
                },
                {
                    q: '¿Incluye garantía?',
                    a: 'Sí, incluye 90 días de garantía contra defectos de fabricación más 30 días de satisfacción garantizada.'
                },
                {
                    q: '¿Necesito descargar alguna app?',
                    a: 'En la mayoría de casos no. El producto funciona plug-and-play. Si requiere configuración, el manual incluye instrucciones claras.'
                }
            ],
            hogar: [
                {
                    q: '¿Requiere ensamblaje?',
                    a: 'Algunos productos pueden requerir ensamblaje simple. Incluimos todas las herramientas e instrucciones necesarias.'
                },
                {
                    q: '¿Cuáles son las dimensiones exactas?',
                    a: 'Consulta la sección de especificaciones para medidas detalladas y asegúrate de que se ajuste a tu espacio.'
                },
                {
                    q: '¿Es resistente para uso diario?',
                    a: 'Sí, todos nuestros productos están diseñados para uso intensivo diario y fabricados con materiales duraderos.'
                }
            ]
        };

        const categoryFAQs = faqs[category] || [
            {
                q: '¿Cuánto tarda el envío?',
                a: '3-5 días hábiles a ciudades principales, 5-8 días a otras ciudades.'
            },
            {
                q: '¿Puedo devolver el producto?',
                a: 'Sí, tienes 30 días para devoluciones si el producto no cumple tus expectativas.'
            },
            {
                q: '¿Es producto original?',
                a: 'Sí, todos nuestros productos son 100% originales e importados directamente.'
            }
        ];

        return categoryFAQs;
    }

    /**
     * Sugerencias de productos relacionados
     */
    generateRelatedProductsSuggestions(category) {
        const suggestions = {
            ropa: ['Otros estilos de la misma categoría', 'Accesorios complementarios', 'Calzado a juego', 'Ropa interior apropiada'],
            electronica: ['Accesorios compatibles', 'Fundas protectoras', 'Cables adicionales', 'Cargadores de repuesto'],
            hogar: ['Elementos decorativos complementarios', 'Organizadores', 'Artículos de limpieza', 'Accesorios del mismo estilo'],
            deportes: ['Ropa deportiva', 'Accesorios de entrenamiento', 'Suplementos', 'Equipamiento complementario'],
            belleza: ['Productos de la misma línea', 'Complementos de cuidado', 'Accesorios de aplicación', 'Sets de regalo']
        };

        return suggestions[category] || ['Explora otros productos en la misma categoría', 'Ofertas especiales', 'Productos más vendidos'];
    }

    /**
     * Guía de tallas
     */
    generateSizeGuide(category) {
        if (category !== 'ropa') return null;

        return `**Guía de Tallas:**

| Talla | Pecho (cm) | Cintura (cm) | Cadera (cm) | Largo (cm) |
|-------|------------|--------------|-------------|------------|
| XS    | 86-89      | 66-69        | 91-94       | 68-70      |
| S     | 90-93      | 70-73        | 95-98       | 70-72      |
| M     | 94-97      | 74-77        | 99-102      | 72-74      |
| L     | 98-102     | 78-82        | 103-107     | 74-76      |
| XL    | 103-107    | 83-87        | 108-112     | 76-78      |
| XXL   | 108-113    | 88-93        | 113-118     | 78-80      |

**Cómo medir correctamente:**
1. Pecho: Medir alrededor de la parte más amplia
2. Cintura: Medir en la parte más estrecha
3. Cadera: Medir alrededor de la parte más amplia
4. Largo: Desde el hombro hasta el bajo deseado

**Consejos:**
- Medir sobre ropa interior
- Mantener la cinta métrica ajustada pero no apretada
- Si estás entre tallas, elige la mayor`;
    }

    /**
     * Información de materiales
     */
    generateMaterialsInfo(category, info) {
        const lowerInfo = info.toLowerCase();
        const material = this.extractMaterial(lowerInfo);

        const materialDetails = {
            'Algodón 100%': '**Algodón Premium:** Natural, transpirable, suave al tacto. Hipoalergénico y cómodo para uso prolongado.',
            'Poliéster Premium': '**Poliéster de Alta Calidad:** Resistente, mantiene forma, secado rápido, fácil cuidado.',
            'Mezclilla/Denim': '**Denim Resistente:** Durable, versátil, mejora con el uso, estilo clásico.',
            'default': `**Material de Calidad:** ${material} - Seleccionado por durabilidad, comodidad y rendimiento óptimo.`
        };

        return materialDetails[material] || materialDetails.default;
    }

    /**
     * Certificaciones
     */
    generateCertifications(category) {
        const certs = {
            ropa: ['Oeko-Tex Standard 100', 'Materiales seguros', 'Sin sustancias nocivas'],
            electronica: ['CE Certified', 'FCC Approved', 'RoHS Compliant', 'ISO 9001'],
            hogar: ['Control de Calidad', 'Materiales Seguros', 'Uso Doméstico Aprobado'],
            deportes: ['Testado para uso deportivo', 'Materiales de alta resistencia', 'Seguridad certificada'],
            belleza: ['Dermatológicamente testado', 'Sin parabenos', 'Cruelty-free']
        };

        return certs[category] || ['Control de calidad aprobado', 'Producto certificado'];
    }

    /**
     * Información de sostenibilidad
     */
    generateSustainabilityInfo(category) {
        return `**Compromiso con la Sostenibilidad:**

🌱 **Materiales:** Priorizamos materiales de calidad y duraderos
♻️ **Empaque:** Utilizamos materiales reciclables cuando es posible
🌍 **Responsabilidad:** Trabajamos con proveedores que respetan estándares éticos
📦 **Reducción de residuos:** Empaque mínimo pero protector

Nos esforzamos continuamente por mejorar nuestras prácticas sostenibles.`;
    }

    /**
     * Información de empaque
     */
    generatePackagingInfo(category) {
        return `**Empaque del Producto:**

📦 El producto viene en empaque protector original
✓ Incluye todos los accesorios necesarios
✓ Manual de usuario e instrucciones
✓ Protección adicional para transporte seguro
✓ Presentación lista para regalo (opcional)

**Contenido del paquete verificado antes de envío.**`;
    }

    /**
     * Generar o sugerir URL de video del producto
     */
    generateVideoUrl(category, productName, info) {
        const lowerInfo = info.toLowerCase();
        
        // Detectar si el usuario proporcionó un enlace de video
        const youtubeMatch = info.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        if (youtubeMatch) {
            return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
        }

        const vimeoMatch = info.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) {
            return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        }

        // Generar sugerencia de video basada en categoría
        const videoSuggestions = {
            ropa: `https://www.youtube.com/embed/dQw4w9WgXcQ?si=suggestion`, // Placeholder - usuario debe reemplazar
            electronica: `https://www.youtube.com/embed/dQw4w9WgXcQ?si=suggestion`,
            hogar: `https://www.youtube.com/embed/dQw4w9WgXcQ?si=suggestion`,
            deportes: `https://www.youtube.com/embed/dQw4w9WgXcQ?si=suggestion`
        };

        // Retornar null si no hay video - el usuario puede agregarlo después
        return null;
    }

    /**
     * Organizar y optimizar imágenes
     */
    organizeImages(images, category) {
        if (!images || images.length === 0) {
            return {
                main: 'assets/placeholder.jpg',
                gallery: [],
                view360: []
            };
        }

        // Imagen principal (primera)
        const mainImage = images[0];

        // Imágenes de galería (resto)
        const galleryImages = images.slice(1);

        // Sugerir orden óptimo de imágenes según categoría
        const optimizedGallery = this.optimizeImageOrder(galleryImages, category);

        return {
            main: mainImage,
            gallery: optimizedGallery,
            view360: [] // Puede agregarse vista 360 si se tienen las imágenes
        };
    }

    /**
     * Optimizar orden de imágenes
     */
    optimizeImageOrder(images, category) {
        // El orden ideal depende de la categoría
        // Ropa: frontal, posterior, detalles, modelo usándolo
        // Electrónica: producto, ángulos, detalles, en uso
        // Hogar: vista general, detalles, en contexto

        // Por ahora retornamos las imágenes en el orden recibido
        // En futuro se puede implementar detección de tipo de imagen
        return images;
    }

    /**
     * Generar SKU único
     */
    generateSKU(category, productName) {
        const categoryCode = {
            ropa: 'CL',
            electronica: 'EL',
            hogar: 'HG',
            deportes: 'DP',
            belleza: 'BZ',
            libros: 'LB',
            juguetes: 'JG',
            alimentos: 'AL',
            otros: 'OT'
        };

        const code = categoryCode[category] || 'PR';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        return `${code}-${timestamp}-${random}`;
    }

    /**
     * Generar código de barras simulado
     */
    generateBarcode() {
        // Generar código EAN-13 simulado
        const random = Math.floor(Math.random() * 1000000000000);
        return random.toString().padStart(13, '0');
    }

    /**
     * Estimar peso del producto
     */
    estimateWeight(category) {
        const weights = {
            ropa: '200-300g',
            electronica: '150-500g',
            hogar: '500g-2kg',
            deportes: '300g-5kg',
            belleza: '50-200g',
            libros: '200-800g',
            juguetes: '100-500g'
        };

        return weights[category] || '200-500g';
    }

    /**
     * Estimar dimensiones del producto
     */
    estimateDimensions(category) {
        const dimensions = {
            ropa: '30x25x5 cm',
            electronica: '15x10x5 cm',
            hogar: '40x30x20 cm',
            deportes: '50x30x15 cm',
            belleza: '15x8x5 cm',
            libros: '23x15x3 cm',
            juguetes: '25x20x10 cm'
        };

        return dimensions[category] || '25x20x10 cm';
    }
}

// Reemplazar la instancia global
window.aiAssistant = new AIProductAssistantEnhanced();
console.log('✅ Asistente IA mejorado cargado con éxito');
