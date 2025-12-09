// ============================================
// DATA SYNC SYSTEM
// Sistema de sincronización de datos reales
// ============================================

class DataSync {
    constructor() {
        this.products = [];
        this.initPromise = this.initializeData();
    }

    // Inicializar datos
    async initializeData() {
        // Siempre cargar desde products.json para mantener sincronizado
        try {
            const response = await fetch('products.json');
            if (response.ok) {
                this.products = await response.json();
                // Guardar en localStorage para acceso rápido
                localStorage.setItem('YunGuer_products', JSON.stringify(this.products));
                console.log('Productos cargados desde products.json:', this.products.length);
            } else {
                console.error('Error cargando products.json, intentando localStorage');
                const localProducts = localStorage.getItem('YunGuer_products');
                if (localProducts) {
                    this.products = JSON.parse(localProducts);
                    console.log('Productos cargados desde localStorage:', this.products.length);
                } else {
                    this.products = this.getDefaultProducts();
                }
            }
        } catch (error) {
            console.error('Error fetching products.json:', error);
            const localProducts = localStorage.getItem('YunGuer_products');
            if (localProducts) {
                this.products = JSON.parse(localProducts);
                console.log('Productos cargados desde localStorage:', this.products.length);
            } else {
                this.products = this.getDefaultProducts();
            }
        }

        // Inicializar otros datos en localStorage
        if (!localStorage.getItem('YunGuer_orders')) {
            localStorage.setItem('YunGuer_orders', JSON.stringify([]));
        }

        if (!localStorage.getItem('YunGuer_stats')) {
            const stats = {
                totalSales: 0,
                salesHistory: [],
                visitorsToday: 0,
                visitorsHistory: []
            };
            localStorage.setItem('YunGuer_stats', JSON.stringify(stats));
        }

        if (!localStorage.getItem('YunGuer_visitors')) {
            localStorage.setItem('YunGuer_visitors', JSON.stringify([]));
        }

        if (!localStorage.getItem('YunGuer_product_codes')) {
            localStorage.setItem('YunGuer_product_codes', JSON.stringify([]));
        }

        if (!localStorage.getItem('YunGuer_warranties')) {
            localStorage.setItem('YunGuer_warranties', JSON.stringify([]));
        }

        if (!localStorage.getItem('YunGuer_cart')) {
            localStorage.setItem('YunGuer_cart', JSON.stringify([]));
        }
    }

    getDefaultProducts() {
        return [
            {
                id: 1733706001000,
                name: 'Pantalón Cargo para Hombre - Cintura Elástica',
                category: 'ropa',
                price: 100000,
                originalPrice: 150000,
                stock: 25,
                available: true,
                freeShipping: true,
                image: 'https://img.ltwebstatic.com/images3_pi/2024/10/09/1f/1728447867aa0738f8bff42b9f6ad4d056f654d6f3_thumbnail_720x.jpg',
                additionalImages: [
                    'https://img.ltwebstatic.com/images3_pi/2024/10/09/b8/1728447868f69dccb0aeeb1f22c8ab3dd0ccbc06d8_thumbnail_720x.jpg',
                    'https://img.ltwebstatic.com/images3_pi/2024/10/09/f1/172844786824d3f84e4dfe84b3f30f5a69d5e6baa0_thumbnail_720x.jpg',
                    'https://img.ltwebstatic.com/images3_pi/2024/10/09/e5/1728447868e05878f3a9f64b97e3aef7a2fe39f7e6_thumbnail_720x.jpg'
                ],
                description: 'Pantalones cargo de moda para hombre con pierna recta y cintura elástica. Diseño de ajuste holgado en color sólido con logo bordado en un solo lado. Perfectos para el otoño y el uso casual diario.\n\nCaracterísticas:\n• Cintura elástica para máxima comodidad\n• Diseño de pierna recta\n• Múltiples bolsillos tipo cargo\n• Logo bordado de alta calidad\n• Material resistente y duradero\n• Ajuste holgado y cómodo\n• Ideal para uso casual y urbano\n\nEstilo versátil que combina con cualquier outfit casual. Material de alta calidad que garantiza durabilidad y comodidad durante todo el día.',
                shortDescription: 'Pantalón cargo masculino con cintura elástica, diseño holgado y logo bordado. Perfecto para estilo casual urbano.',
                variants: {
                    colors: ['negro', 'verde', 'gris', 'azul'],
                    sizes: ['s', 'm', 'l', 'xl', 'xxl']
                },
                tags: ['nuevo', 'popular'],
                features: [
                    'Cintura elástica ajustable',
                    'Pierna recta para look moderno',
                    'Múltiples bolsillos cargo funcionales',
                    'Logo bordado de calidad premium',
                    'Tela resistente y duradera',
                    'Ajuste holgado cómodo',
                    'Perfecto para otoño e invierno'
                ],
                categoryData: {
                    material: 'Algodón mezcla premium',
                    genero: 'Hombre',
                    temporada: 'Otoño/Invierno',
                    tipoRopa: 'Pantalón Cargo',
                    cuidado: 'Lavado a máquina agua fría'
                },
                supplierInfo: {
                    url: 'https://www.shein.com.co/Men-s-Fashion-Cargo-Pants-Straight-Leg-Elastic-Waist-Loose-Fit-Solid-Color-Single-Side-Embroidered-Logo-Long-Pants-Fall-p-153524474.html',
                    name: 'SHEIN',
                    price: 45000,
                    notes: 'Producto de SHEIN. Verificar tallas disponibles antes de ordenar. Tiempo de envío estimado: 15-25 días.'
                },
                sold: 0,
                rating: 5,
                reviews: 0
            },
            { 
                id: 2, 
                name: 'Producto Premium 2', 
                price: 399,
                originalPrice: 599,
                stock: 8, 
                available: true,
                freeShipping: false,
                image: 'https://via.placeholder.com/300x300/ef4444/ffffff?text=Producto+2', 
                description: 'Descripción del producto premium 2',
                sold: 0
            },
            { 
                id: 3, 
                name: 'Producto Premium 3', 
                price: 499,
                originalPrice: 699,
                stock: 3, 
                available: true,
                freeShipping: true,
                image: 'https://via.placeholder.com/300x300/22c55e/ffffff?text=Producto+3', 
                description: 'Descripción del producto premium 3',
                sold: 0
            }
        ];
    }

    // PRODUCTOS
    async getProducts() {
        await this.initPromise;
        return this.products;
    }

    saveProducts(products) {
        this.products = products;
        localStorage.setItem('YunGuer_products', JSON.stringify(products));
        this.triggerSync('products');
    }

    async addProduct(product) {
        const products = await this.getProducts();
        product.id = Date.now();
        product.sold = 0;
        
        console.log('💾 data-sync.js - Guardando producto:', product);
        console.log('💾 data-sync.js - Specifications:', product.specifications);
        
        products.push(product);
        this.saveProducts(products);
        return product;
    }

    async updateProduct(id, updates) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            this.saveProducts(products);
            return products[index];
        }
        return null;
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        this.saveProducts(products.filter(p => p.id !== id));
    }

    // ÓRDENES
    getOrders() {
        return JSON.parse(localStorage.getItem('YunGuer_orders') || '[]');
    }

    saveOrders(orders) {
        localStorage.setItem('YunGuer_orders', JSON.stringify(orders));
        this.triggerSync('orders');
    }

    addOrder(order) {
        const orders = this.getOrders();
        order.id = Date.now();
        order.date = new Date().toISOString();
        order.status = 'pending';
        orders.unshift(order);
        this.saveOrders(orders);
        
        // Actualizar producto (reducir stock, incrementar vendidos)
        if (order.productId) {
            const products = this.getProducts();
            const product = products.find(p => p.id === order.productId);
            if (product) {
                product.stock = Math.max(0, product.stock - (order.quantity || 1));
                product.sold = (product.sold || 0) + (order.quantity || 1);
                this.saveProducts(products);
            }
        }

        // Actualizar estadísticas de ventas
        this.updateSalesStats(order.total);
        
        return order;
    }

    updateOrderStatus(id, status) {
        const orders = this.getOrders();
        const order = orders.find(o => o.id === id);
        if (order) {
            order.status = status;
            this.saveOrders(orders);
        }
    }

    // ESTADÍSTICAS
    getStats() {
        return JSON.parse(localStorage.getItem('YunGuer_stats') || '{}');
    }

    saveStats(stats) {
        localStorage.setItem('YunGuer_stats', JSON.stringify(stats));
        this.triggerSync('stats');
    }

    updateSalesStats(amount) {
        const stats = this.getStats();
        stats.totalSales = (stats.totalSales || 0) + amount;
        
        const today = new Date().toISOString().split('T')[0];
        if (!stats.salesHistory) stats.salesHistory = [];
        
        const todayEntry = stats.salesHistory.find(s => s.date === today);
        if (todayEntry) {
            todayEntry.amount += amount;
        } else {
            stats.salesHistory.push({ date: today, amount });
        }
        
        // Mantener solo últimos 30 días
        stats.salesHistory = stats.salesHistory.slice(-30);
        this.saveStats(stats);
    }

    getSalesToday() {
        const stats = this.getStats();
        const today = new Date().toISOString().split('T')[0];
        const todayEntry = stats.salesHistory?.find(s => s.date === today);
        return todayEntry?.amount || 0;
    }

    getPendingOrders() {
        return this.getOrders().filter(o => o.status === 'pending').length;
    }

    // VISITANTES
    getVisitors() {
        return JSON.parse(localStorage.getItem('YunGuer_visitors') || '[]');
    }

    addVisitor(visitor) {
        const visitors = this.getVisitors();
        visitor.id = Date.now();
        visitor.timestamp = new Date().toISOString();
        visitor.active = true;
        visitors.push(visitor);
        
        // Limpiar visitantes inactivos (más de 5 minutos)
        const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
        const activeVisitors = visitors.filter(v => {
            const visitorTime = new Date(v.timestamp).getTime();
            return visitorTime > fiveMinutesAgo;
        });
        
        localStorage.setItem('YunGuer_visitors', JSON.stringify(activeVisitors));
        this.updateVisitorStats();
        this.triggerSync('visitors');
    }

    updateVisitor(id) {
        const visitors = this.getVisitors();
        const visitor = visitors.find(v => v.id === id);
        if (visitor) {
            visitor.timestamp = new Date().toISOString();
            localStorage.setItem('YunGuer_visitors', JSON.stringify(visitors));
        }
    }

    removeVisitor(id) {
        const visitors = this.getVisitors().filter(v => v.id !== id);
        localStorage.setItem('YunGuer_visitors', JSON.stringify(visitors));
        this.triggerSync('visitors');
    }

    getActiveVisitorsCount() {
        const visitors = this.getVisitors();
        const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
        return visitors.filter(v => {
            const visitorTime = new Date(v.timestamp).getTime();
            return visitorTime > fiveMinutesAgo;
        }).length;
    }

    updateVisitorStats() {
        const stats = this.getStats();
        const today = new Date().toISOString().split('T')[0];
        
        if (!stats.visitorsHistory) stats.visitorsHistory = [];
        
        const todayEntry = stats.visitorsHistory.find(v => v.date === today);
        const currentCount = this.getActiveVisitorsCount();
        
        if (todayEntry) {
            todayEntry.count = Math.max(todayEntry.count, currentCount);
        } else {
            stats.visitorsHistory.push({ date: today, count: currentCount });
        }
        
        stats.visitorsToday = currentCount;
        stats.visitorsHistory = stats.visitorsHistory.slice(-30);
        this.saveStats(stats);
    }

    // SINCRONIZACIÓN EN TIEMPO REAL
    triggerSync(type) {
        // Disparar evento personalizado para sincronización
        window.dispatchEvent(new CustomEvent('dataSync', { 
            detail: { type, timestamp: Date.now() } 
        }));
    }

    // Limpiar datos antiguos
    cleanup() {
        const orders = this.getOrders();
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        
        const recentOrders = orders.filter(o => {
            const orderTime = new Date(o.date).getTime();
            return orderTime > thirtyDaysAgo;
        });
        
        this.saveOrders(recentOrders);
    }

    // ============================================
    // CÓDIGOS DE PRODUCTO Y GARANTÍAS
    // ============================================

    // Generar código único de producto
    generateProductCode(orderId, productId, productName) {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const code = `YG-${timestamp.toString().slice(-6)}-${random}`;
        
        const productCode = {
            code: code,
            orderId: orderId,
            productId: productId,
            productName: productName,
            purchaseDate: new Date().toISOString(),
            status: 'activo', // activo, en_garantia, garantia_completada
            warrantyExpiry: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)).toISOString(), // 1 año
            customerName: '',
            customerEmail: '',
            customerPhone: ''
        };

        const codes = this.getProductCodes();
        codes.push(productCode);
        localStorage.setItem('YunGuer_product_codes', JSON.stringify(codes));
        
        return productCode;
    }

    // Obtener todos los códigos de productos
    getProductCodes() {
        return JSON.parse(localStorage.getItem('YunGuer_product_codes') || '[]');
    }

    // Buscar producto por código
    findProductByCode(code) {
        const codes = this.getProductCodes();
        return codes.find(c => c.code === code);
    }

    // Actualizar código de producto
    updateProductCode(code, updates) {
        const codes = this.getProductCodes();
        const index = codes.findIndex(c => c.code === code);
        if (index !== -1) {
            codes[index] = { ...codes[index], ...updates };
            localStorage.setItem('YunGuer_product_codes', JSON.stringify(codes));
            return codes[index];
        }
        return null;
    }

    // Solicitar garantía
    requestWarranty(warrantyData) {
        const warranty = {
            id: Date.now(),
            productCode: warrantyData.productCode,
            productName: warrantyData.productName,
            issueDescription: warrantyData.issueDescription,
            customerName: warrantyData.customerName,
            customerEmail: warrantyData.customerEmail,
            customerPhone: warrantyData.customerPhone,
            requestDate: new Date().toISOString(),
            status: 'pendiente', // pendiente, en_proceso, aprobada, rechazada, completada
            response: '',
            photos: warrantyData.photos || []
        };

        const warranties = this.getWarranties();
        warranties.push(warranty);
        localStorage.setItem('YunGuer_warranties', JSON.stringify(warranties));

        // Actualizar estado del código de producto
        this.updateProductCode(warrantyData.productCode, {
            status: 'en_garantia'
        });

        return warranty;
    }

    // Obtener todas las garantías
    getWarranties() {
        return JSON.parse(localStorage.getItem('YunGuer_warranties') || '[]');
    }

    // Obtener garantías por código de producto
    getWarrantiesByCode(code) {
        const warranties = this.getWarranties();
        return warranties.filter(w => w.productCode === code);
    }

    // Actualizar estado de garantía (para admin)
    updateWarrantyStatus(id, status, response = '') {
        const warranties = this.getWarranties();
        const index = warranties.findIndex(w => w.id === id);
        if (index !== -1) {
            warranties[index].status = status;
            warranties[index].response = response;
            warranties[index].updateDate = new Date().toISOString();
            localStorage.setItem('YunGuer_warranties', JSON.stringify(warranties));
            
            // Si la garantía se completa, actualizar el código del producto
            if (status === 'completada') {
                this.updateProductCode(warranties[index].productCode, {
                    status: 'garantia_completada'
                });
            }
            
            return warranties[index];
        }
        return null;
    }

    // ============================================
    // CARRITO DE COMPRAS
    // ============================================

    getCart() {
        return JSON.parse(localStorage.getItem('YunGuer_cart') || '[]');
    }

    saveCart(cart) {
        localStorage.setItem('YunGuer_cart', JSON.stringify(cart));
        this.triggerSync('cart');
    }

    addToCart(product, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
            if (existingItem.quantity > product.stock) {
                existingItem.quantity = product.stock;
                return { success: false, message: 'No hay suficiente stock disponible' };
            }
        } else {
            if (quantity > product.stock) {
                return { success: false, message: 'No hay suficiente stock disponible' };
            }
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity,
                maxStock: product.stock
            });
        }

        this.saveCart(cart);
        return { success: true, message: 'Producto agregado al carrito' };
    }

    removeFromCart(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        this.saveCart(cart);
        return { success: true };
    }

    updateCartItemQuantity(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(i => i.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                return this.removeFromCart(productId);
            }
            
            if (quantity > item.maxStock) {
                return { success: false, message: 'Cantidad excede el stock disponible' };
            }
            
            item.quantity = quantity;
            this.saveCart(cart);
            return { success: true };
        }
        
        return { success: false, message: 'Producto no encontrado en el carrito' };
    }

    clearCart() {
        this.saveCart([]);
        return { success: true };
    }

    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Exportar productos para actualizar products.json
    async exportProducts() {
        await this.initPromise;
        console.log('Productos actuales (copia esto a products.json):', JSON.stringify(this.products, null, 2));
        return this.products;
    }
}

// Instancia global
window.dataSync = new DataSync();

// Limpiar datos antiguos al cargar
window.addEventListener('load', () => {
    window.dataSync.cleanup();
});

