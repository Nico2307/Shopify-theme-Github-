// diagnostic.js - Diagnóstico para problemas de productos en diferentes dispositivos

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 === DIAGNÓSTICO DE PRODUCTOS ===');

    // Verificar localStorage
    const products = JSON.parse(localStorage.getItem('YunGuer_products') || '[]');
    console.log('📦 Total productos en localStorage:', products.length);

    // Contar productos disponibles y no disponibles
    const availableProducts = products.filter(p => p.available !== false);
    const unavailableProducts = products.filter(p => p.available === false);

    console.log('✅ Productos disponibles:', availableProducts.length);
    console.log('❌ Productos NO disponibles:', unavailableProducts.length);

    // Mostrar detalles de productos no disponibles
    if (unavailableProducts.length > 0) {
        console.log('🚫 Productos marcados como NO disponibles:');
        unavailableProducts.forEach(product => {
            console.log(`  - ${product.name} (ID: ${product.id})`);
        });
    }

    // Verificar si hay productos sin propiedad available
    const productsWithoutAvailable = products.filter(p => p.available === undefined);
    if (productsWithoutAvailable.length > 0) {
        console.log('⚠️ Productos sin propiedad "available":', productsWithoutAvailable.length);
        productsWithoutAvailable.forEach(product => {
            console.log(`  - ${product.name} (ID: ${product.id})`);
        });
    }

    // Verificar dataSync
    if (window.dataSync) {
        const dataSyncProducts = window.dataSync.getProducts();
        console.log('🔄 Productos desde dataSync.getProducts():', dataSyncProducts.length);

        const dataSyncAvailable = dataSyncProducts.filter(p => p.available !== false);
        console.log('🔄 Productos disponibles desde dataSync:', dataSyncAvailable.length);
    }

    // Verificar utilities
    if (window.allProducts) {
        console.log('🔧 Productos en window.allProducts:', window.allProducts.length);
    }

    // Información del dispositivo
    console.log('📱 Dispositivo detectado:', {
        userAgent: navigator.userAgent.substring(0, 50) + '...',
        isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        touchSupport: 'ontouchstart' in window
    });

    console.log('🔍 === FIN DIAGNÓSTICO ===');

    // Crear función global para debugging
    window.diagnoseProducts = function() {
        console.log('🔍 Diagnóstico manual de productos:');
        const prods = JSON.parse(localStorage.getItem('YunGuer_products') || '[]');
        console.table(prods.map(p => ({
            id: p.id,
            name: p.name,
            available: p.available,
            price: p.price,
            category: p.category
        })));
    };

    console.log('💡 Ejecuta diagnoseProducts() en la consola para ver tabla detallada');
});

// Función para resetear disponibilidad de productos
window.resetProductAvailability = function() {
    const products = JSON.parse(localStorage.getItem('YunGuer_products') || '[]');
    const updatedProducts = products.map(product => ({
        ...product,
        available: true
    }));

    localStorage.setItem('YunGuer_products', JSON.stringify(updatedProducts));

    console.log('✅ Todos los productos marcados como disponibles');
    console.log('🔄 Recarga la página para ver los cambios');

    // Recargar productos si existe la función
    if (typeof loadProductsFromSync === 'function') {
        loadProductsFromSync();
    }
};