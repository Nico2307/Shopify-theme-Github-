// ============================================
// AUTHENTICATION
// ============================================

// Category-specific fields configuration
const categoryFields = {
    ropa: [
        { name: 'material', label: 'Material', type: 'text', placeholder: 'Ej: 100% Algodón, Poliéster' },
        { name: 'genero', label: 'Género', type: 'select', options: ['Hombre', 'Mujer', 'Unisex', 'Niño', 'Niña'] },
        { name: 'temporada', label: 'Temporada', type: 'select', options: ['Primavera', 'Verano', 'Otoño', 'Invierno', 'Todas'] },
        { name: 'tipoRopa', label: 'Tipo de Prenda', type: 'select', options: ['Camiseta', 'Pantalón', 'Vestido', 'Chaqueta', 'Sudadera', 'Falda', 'Shorts', 'Otro'] },
        { name: 'cuidado', label: 'Instrucciones de Cuidado', type: 'text', placeholder: 'Ej: Lavar a máquina 30°C' }
    ],
    electronica: [
        { name: 'marca', label: 'Marca', type: 'text', placeholder: 'Ej: Samsung, Apple, Sony' },
        { name: 'modelo', label: 'Modelo', type: 'text', placeholder: 'Número de modelo' },
        { name: 'garantia', label: 'Garantía (meses)', type: 'number', placeholder: '12' },
        { name: 'voltaje', label: 'Voltaje', type: 'select', options: ['110V', '220V', 'Universal', 'Batería'] },
        { name: 'conectividad', label: 'Conectividad', type: 'text', placeholder: 'Ej: Bluetooth, WiFi, USB' }
    ],
    hogar: [
        { name: 'material', label: 'Material', type: 'text', placeholder: 'Ej: Madera, Metal, Plástico' },
        { name: 'habitacion', label: 'Habitación', type: 'select', options: ['Sala', 'Cocina', 'Dormitorio', 'Baño', 'Comedor', 'Exterior', 'Todas'] },
        { name: 'estilo', label: 'Estilo', type: 'select', options: ['Moderno', 'Clásico', 'Rústico', 'Minimalista', 'Industrial', 'Vintage'] },
        { name: 'montaje', label: 'Requiere Montaje', type: 'select', options: ['Sí', 'No', 'Parcial'] },
        { name: 'capacidad', label: 'Capacidad', type: 'text', placeholder: 'Ej: 4 personas, 10 litros' }
    ],
    deportes: [
        { name: 'deporte', label: 'Deporte', type: 'select', options: ['Fútbol', 'Basketball', 'Tenis', 'Running', 'Gimnasio', 'Natación', 'Ciclismo', 'Yoga', 'Otro'] },
        { name: 'nivel', label: 'Nivel', type: 'select', options: ['Principiante', 'Intermedio', 'Avanzado', 'Profesional', 'Todos'] },
        { name: 'genero', label: 'Género', type: 'select', options: ['Hombre', 'Mujer', 'Unisex', 'Niño', 'Niña'] },
        { name: 'indoor', label: 'Uso', type: 'select', options: ['Interior', 'Exterior', 'Ambos'] },
        { name: 'certificacion', label: 'Certificación', type: 'text', placeholder: 'Ej: FIFA Approved, NBA Official' }
    ],
    belleza: [
        { name: 'marca', label: 'Marca', type: 'text', placeholder: 'Nombre de la marca' },
        { name: 'tipoPiel', label: 'Tipo de Piel', type: 'select', options: ['Todo tipo', 'Seca', 'Grasa', 'Mixta', 'Sensible', 'Normal'] },
        { name: 'genero', label: 'Género', type: 'select', options: ['Mujer', 'Hombre', 'Unisex'] },
        { name: 'ingredientes', label: 'Ingredientes Principales', type: 'text', placeholder: 'Ej: Ácido hialurónico, Vitamina C' },
        { name: 'volumen', label: 'Volumen/Cantidad', type: 'text', placeholder: 'Ej: 50ml, 100g' },
        { name: 'origen', label: 'País de Origen', type: 'text', placeholder: 'Ej: Francia, Corea del Sur' }
    ],
    libros: [
        { name: 'autor', label: 'Autor', type: 'text', placeholder: 'Nombre del autor' },
        { name: 'editorial', label: 'Editorial', type: 'text', placeholder: 'Casa editorial' },
        { name: 'idioma', label: 'Idioma', type: 'select', options: ['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Portugués', 'Otro'] },
        { name: 'paginas', label: 'Número de Páginas', type: 'number', placeholder: '350' },
        { name: 'isbn', label: 'ISBN', type: 'text', placeholder: '978-XXXXXXXXXX' },
        { name: 'formato', label: 'Formato', type: 'select', options: ['Tapa Dura', 'Tapa Blanda', 'Digital/eBook', 'Audiolibro'] },
        { name: 'generoLibro', label: 'Género Literario', type: 'select', options: ['Ficción', 'No Ficción', 'Novela', 'Poesía', 'Biografía', 'Historia', 'Ciencia', 'Arte', 'Infantil', 'Otro'] }
    ],
    juguetes: [
        { name: 'edadMinima', label: 'Edad Mínima', type: 'number', placeholder: '3' },
        { name: 'edadMaxima', label: 'Edad Máxima', type: 'number', placeholder: '10' },
        { name: 'genero', label: 'Género', type: 'select', options: ['Niño', 'Niña', 'Unisex'] },
        { name: 'tipoJuguete', label: 'Tipo de Juguete', type: 'select', options: ['Educativo', 'Electrónico', 'Peluche', 'Construcción', 'Vehículo', 'Muñeca', 'Juego de Mesa', 'Otro'] },
        { name: 'baterias', label: 'Requiere Baterías', type: 'select', options: ['No', 'Sí (incluidas)', 'Sí (no incluidas)'] },
        { name: 'seguridad', label: 'Certificación de Seguridad', type: 'text', placeholder: 'Ej: CE, ASTM F963' }
    ],
    alimentos: [
        { name: 'marca', label: 'Marca', type: 'text', placeholder: 'Nombre de la marca' },
        { name: 'peso', label: 'Peso/Contenido', type: 'text', placeholder: 'Ej: 500g, 1L' },
        { name: 'caducidad', label: 'Vida Útil', type: 'text', placeholder: 'Ej: 12 meses, 6 días' },
        { name: 'origen', label: 'País de Origen', type: 'text', placeholder: 'Ej: Colombia, México' },
        { name: 'vegano', label: 'Opciones Dietéticas', type: 'select', options: ['Ninguna', 'Vegano', 'Vegetariano', 'Sin Gluten', 'Sin Lactosa', 'Orgánico', 'Keto', 'Bajo en Azúcar'] },
        { name: 'refrigeracion', label: 'Almacenamiento', type: 'select', options: ['Ambiente', 'Refrigerado', 'Congelado'] }
    ],
    tecnologia: [
        { name: 'marca', label: 'Marca', type: 'text', placeholder: 'Ej: Apple, Samsung, Xiaomi' },
        { name: 'modelo', label: 'Modelo', type: 'text', placeholder: 'Número/nombre del modelo' },
        { name: 'sistemaOperativo', label: 'Sistema Operativo', type: 'select', options: ['Android', 'iOS', 'Windows', 'MacOS', 'Linux', 'Otro', 'N/A'] },
        { name: 'procesador', label: 'Procesador', type: 'text', placeholder: 'Ej: Snapdragon 888, A15 Bionic' },
        { name: 'ram', label: 'Memoria RAM', type: 'text', placeholder: 'Ej: 8GB, 16GB' },
        { name: 'almacenamiento', label: 'Almacenamiento', type: 'text', placeholder: 'Ej: 128GB, 256GB, 1TB' },
        { name: 'pantalla', label: 'Pantalla', type: 'text', placeholder: 'Ej: 6.7" AMOLED' },
        { name: 'bateria', label: 'Batería', type: 'text', placeholder: 'Ej: 5000mAh' },
        { name: 'garantia', label: 'Garantía (meses)', type: 'number', placeholder: '12' }
    ],
    otros: [
        { name: 'subcategoria', label: 'Subcategoría', type: 'text', placeholder: 'Especifica el tipo de producto' },
        { name: 'uso', label: 'Uso Principal', type: 'text', placeholder: 'Describe el uso del producto' },
        { name: 'caracteristica1', label: 'Característica 1', type: 'text', placeholder: 'Primera característica destacada' },
        { name: 'caracteristica2', label: 'Característica 2', type: 'text', placeholder: 'Segunda característica destacada' }
    ]
};

function showCategoryFields(category) {
    const container = document.getElementById('categoryFieldsContainer');
    const section = document.getElementById('categorySpecificFields');
    
    if (!category || !categoryFields[category]) {
        section.style.display = 'none';
        container.innerHTML = '';
        return;
    }
    
    section.style.display = 'block';
    const fields = categoryFields[category];
    
    let html = '<div class="form-row">';
    
    fields.forEach((field, index) => {
        if (field.type === 'select') {
            html += `
                <div class="form-group">
                    <label for="cat_${field.name}">${field.label}</label>
                    <select id="cat_${field.name}" data-category-field="${field.name}">
                        <option value="">Seleccionar...</option>
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
            `;
        } else {
            html += `
                <div class="form-group">
                    <label for="cat_${field.name}">${field.label}</label>
                    <input type="${field.type}" id="cat_${field.name}" data-category-field="${field.name}" placeholder="${field.placeholder || ''}" ${field.type === 'number' ? 'min="0"' : ''}>
                </div>
            `;
        }
        
        // Add row break every 2 fields
        if ((index + 1) % 2 === 0 && index < fields.length - 1) {
            html += '</div><div class="form-row">';
        }
    });
    
    html += '</div>';
    container.innerHTML = html;
}

const loginScreen = document.getElementById('loginScreen');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');

// Check if already logged in
if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showAdminPanel();
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin123') {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
    } else {
        alert('❌ Credenciales incorrectas');
    }
});

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    loginScreen.style.display = 'flex';
    adminPanel.style.display = 'none';
});

function showAdminPanel() {
    loginScreen.style.display = 'none';
    adminPanel.style.display = 'flex';
    initApp();
}

// ============================================
// APP INITIALIZATION
// ============================================

// Función para migrar datos de comparePrice a originalPrice
function migrateProductData() {
    const products = JSON.parse(localStorage.getItem('YunGuer_products') || '[]');
    let updated = false;
    
    products.forEach(product => {
        // Si tiene comparePrice pero no originalPrice, migrar
        if (product.comparePrice && !product.originalPrice) {
            product.originalPrice = product.comparePrice;
            delete product.comparePrice;
            updated = true;
        }
    });
    
    if (updated) {
        localStorage.setItem('YunGuer_products', JSON.stringify(products));
        console.log('✅ Productos migrados de comparePrice a originalPrice');
    }
}

function initApp() {
    // Migrar datos de comparePrice a originalPrice
    migrateProductData();
    
    updateClock();
    setInterval(updateClock, 1000);
    setupNavigation();
    loadDashboard();
    
    // Inicializar sistema de drag & drop para imágenes
    setupDragAndDrop();
    
    // Escuchar eventos de sincronización para actualizar datos en tiempo real
    window.addEventListener('dataSync', (e) => {
        const activeSection = document.querySelector('.admin-section.active');
        if (!activeSection) return;
        
        const sectionId = activeSection.id.replace('Section', '');
        
        // Actualizar la sección activa cuando hay cambios
        switch(sectionId) {
            case 'dashboard':
                updateDashboardStats();
                loadRecentOrders();
                break;
            case 'products':
                loadProducts();
                break;
            case 'orders':
                loadOrders();
                break;
            case 'visitors':
                updateVisitorsList();
                break;
        }
    });
}

function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
    document.getElementById('currentTime').textContent = `${dateStr}, ${timeStr}`;
}

// ============================================
// NAVIGATION SYSTEM
// ============================================

const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.admin-section');
const sectionTitle = document.getElementById('sectionTitle');

// Chart instances storage
const charts = {
    sales: null,
    products: null,
    traffic: null,
    source: null,
    device: null
};

function setupNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const sectionId = item.dataset.section;
            
            // Update active nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(`${sectionId}Section`).classList.add('active');
            
            // Update title
            const titles = {
                dashboard: 'Dashboard',
                products: 'Gestión de Productos',
                orders: 'Gestión de Pedidos',
                analytics: 'Análisis y Estadísticas',
                visitors: 'Visitantes en Tiempo Real',
                settings: 'Configuración'
            };
            sectionTitle.textContent = titles[sectionId];
            
            // Load section content
            loadSection(sectionId);
        });
    });
}

function loadSection(sectionId) {
    // Destroy all charts before loading new section
    Object.keys(charts).forEach(key => {
        if (charts[key]) {
            charts[key].destroy();
            charts[key] = null;
        }
    });
    
    // Load section-specific content
    switch(sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'products':
            loadProducts();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'users':
            loadUsers();
            break;
        case 'analytics':
            loadAnalytics();
            break;
        case 'visitors':
            loadVisitors();
            break;
    }
}

// ============================================
// DASHBOARD
// ============================================

function loadDashboard() {
    updateDashboardStats();
    createSalesChart();
    createProductsChart();
    loadRecentOrders();
    startRealTimeUpdates();
}

function updateDashboardStats() {
    // Datos reales del sistema
    const salesToday = window.dataSync.getSalesToday();
    const pendingOrders = window.dataSync.getPendingOrders();
    const onlineVisitors = window.dataSync.getActiveVisitorsCount();
    const stats = window.dataSync.getStats();
    const visitorsToday = stats.visitorsToday || 0;
    
    document.getElementById('salesToday').textContent = `$${salesToday.toLocaleString()}`;
    document.getElementById('pendingOrders').textContent = pendingOrders;
    document.getElementById('onlineVisitors').textContent = onlineVisitors;
    document.getElementById('totalVisits').textContent = visitorsToday.toLocaleString();
}

function createSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    // Lazy load Chart.js si no está cargado
    if (typeof Chart === 'undefined') {
        if (!window.chartJsLoading) {
            window.chartJsLoading = true;
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => createSalesChart();
            document.head.appendChild(script);
        }
        return;
    }
    
    // Obtener historial de ventas de los últimos 7 días
    const stats = window.dataSync.getStats();
    const salesHistory = stats.salesHistory || [];
    
    const last7Days = [];
    const salesData = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayName = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][date.getDay()];
        
        last7Days.push(dayName);
        
        const daySales = salesHistory.find(s => s.date === dateStr);
        salesData.push(daySales ? daySales.amount : 0);
    }
    
    charts.sales = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days,
            datasets: [{
                label: 'Ventas ($)',
                data: salesData,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    ticks: { color: '#9b9b9b' },
                    grid: { color: '#1a1a1a' }
                },
                x: { 
                    ticks: { color: '#9b9b9b' },
                    grid: { color: '#1a1a1a' }
                }
            }
        }
    });
}

async function createProductsChart() {
    const ctx = document.getElementById('productsChart');
    if (!ctx) return;
    
    // Lazy load Chart.js si no está cargado
    if (typeof Chart === 'undefined') {
        if (!window.chartJsLoading) {
            window.chartJsLoading = true;
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => createProductsChart();
            document.head.appendChild(script);
        }
        return;
    }
    
    // Obtener productos más vendidos
    const products = await window.dataSync.getProducts();
    const topProducts = products
        .filter(p => p.sold > 0)
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 4);
    
    const labels = topProducts.length > 0 ? topProducts.map(p => p.name) : ['Sin ventas aún'];
    const data = topProducts.length > 0 ? topProducts.map(p => p.sold) : [0];
    const colors = [
        'rgba(59, 130, 246, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 191, 36, 0.8)'
    ];
    
    charts.products = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Unidades Vendidas',
                data: data,
                backgroundColor: colors.slice(0, labels.length)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    ticks: { color: '#9b9b9b', stepSize: 1 },
                    grid: { color: '#1a1a1a' }
                },
                x: { 
                    ticks: { color: '#9b9b9b' },
                    grid: { color: '#1a1a1a' }
                }
            }
        }
    });
}

function loadRecentOrders() {
    const recentOrders = getOrders().slice(0, 5);
    const tbody = document.getElementById('recentOrdersBody');
    
    if (recentOrders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #9b9b9b; padding: 20px;">No hay pedidos recientes</td></tr>';
        return;
    }
    
    tbody.innerHTML = recentOrders.map(order => {
        const orderDate = new Date(order.date);
        const dateStr = orderDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        
        return `
            <tr>
                <td>#${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.product}</td>
                <td>$${order.total}</td>
                <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            </tr>
        `;
    }).join('');
}

let realTimeInterval;
function startRealTimeUpdates() {
    clearInterval(realTimeInterval);
    realTimeInterval = setInterval(() => {
        if (document.getElementById('dashboardSection').classList.contains('active')) {
            updateDashboardStats();
        }
    }, 5000);
}

// ============================================
// PRODUCTS SECTION
// ============================================

async function loadProducts() {
    const products = await getProducts();
    const grid = document.getElementById('productsGrid');
    
    grid.innerHTML = products.map(product => {
        const hasDiscount = product.comparePrice && product.comparePrice > product.price;
        const discountPercent = hasDiscount ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;
        
        return `
        <div class="product-card-admin">
            <div class="product-admin-image-wrapper">
                <img src="${product.image}" alt="${product.name}">
                ${product.tags && product.tags.length > 0 ? `
                    <div class="product-admin-tags">
                        ${product.tags.map(tag => {
                            const tagIcons = {
                                nuevo: '🆕',
                                oferta: '🔥',
                                popular: '⭐',
                                limitado: '⏰',
                                envioGratis: '🚚'
                            };
                            return `<span class="tag-${tag}">${tagIcons[tag] || ''}</span>`;
                        }).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="product-header">
                <h3>${product.name}</h3>
                ${product.category ? `<span class="product-category">${product.category}</span>` : ''}
                <div class="product-badges">
                    <span class="badge-status ${product.available ? 'badge-available' : 'badge-unavailable'}">
                        ${product.available ? '✓ Disponible' : '✕ No disponible'}
                    </span>
                    <span class="badge-stock ${product.stock <= 5 ? 'badge-low-stock' : ''}">
                        Stock: ${product.stock}
                    </span>
                </div>
            </div>
            <div class="product-price-section">
                ${hasDiscount ? `
                    <div class="price-with-discount">
                        <span class="price-old">$${product.comparePrice}</span>
                        <span class="price">$${product.price}</span>
                        <span class="discount-badge">-${discountPercent}%</span>
                    </div>
                ` : `<p class="price">$${product.price}</p>`}
            </div>
            <p class="description">${product.shortDescription || product.description}</p>
            ${product.colors && product.colors.length > 0 ? `
                <div class="product-colors-mini">
                    ${product.colors.slice(0, 5).map(color => {
                        const colorMap = {
                            negro: '#000000',
                            blanco: '#FFFFFF',
                            rojo: '#EF4444',
                            azul: '#3B82F6',
                            verde: '#22C55E',
                            amarillo: '#FBBF24',
                            rosa: '#EC4899',
                            gris: '#6B7280'
                        };
                        return `<span class="color-dot" style="background: ${colorMap[color] || '#999'}; ${color === 'blanco' ? 'border: 1px solid #3a3a3a;' : ''}"></span>`;
                    }).join('')}
                    ${product.colors.length > 5 ? `<span class="color-more">+${product.colors.length - 5}</span>` : ''}
                </div>
            ` : ''}
            <div class="product-admin-actions">
                <button class="btn-view" onclick="viewProductDetail(${product.id})">Ver Detalles</button>
                <button class="btn-edit" onclick="editProduct(${product.id})">✏️ Editar</button>
                <button class="btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
            </div>
        </div>
    `;
    }).join('');
}

async function getProducts() {
    return await window.dataSync.getProducts();
}

// Helper functions for video embeds
function getYouTubeEmbedUrl(url) {
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    return `https://www.youtube.com/embed/${videoId}`;
}

function getVimeoEmbedUrl(url) {
    const videoId = url.split('vimeo.com/')[1].split('/')[0].split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
}

async function viewProductDetail(id) {
    const products = await getProducts();
    const product = products.find(p => p.id === id);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="product-detail-admin-modal">
            <div class="modal-header">
                <h2>Detalles del Producto</h2>
                <button class="btn-close" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="product-detail-content">
                <div class="detail-section">
                    <h3>Información Básica</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <strong>Nombre:</strong> ${product.name}
                        </div>
                        <div class="detail-item">
                            <strong>Categoría:</strong> ${product.category || 'No especificada'}
                        </div>
                        <div class="detail-item">
                            <strong>SKU:</strong> ${product.sku || 'No especificado'}
                        </div>
                        <div class="detail-item full-width">
                            <strong>Descripción:</strong> ${product.description}
                        </div>
                        ${product.shortDescription ? `
                            <div class="detail-item full-width">
                                <strong>Descripción Corta:</strong> ${product.shortDescription}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Precio e Inventario</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <strong>Precio:</strong> $${product.price}
                        </div>
                        ${product.comparePrice ? `
                            <div class="detail-item">
                                <strong>Precio Original:</strong> $${product.comparePrice}
                            </div>
                        ` : ''}
                        <div class="detail-item">
                            <strong>Stock:</strong> ${product.stock}
                        </div>
                        <div class="detail-item">
                            <strong>Estado:</strong> ${product.available ? 'Disponible' : 'No disponible'}
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Imágenes</h3>
                    <div class="detail-images">
                        <img src="${product.image}" alt="${product.name}" class="main-image">
                        ${product.additionalImages && product.additionalImages.length > 0 ? `
                            <div class="additional-images">
                                ${product.additionalImages.map(img => `
                                    <img src="${img}" alt="${product.name}">
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>

                ${product.videoUrl ? `
                    <div class="detail-section">
                        <h3>Video del Producto</h3>
                        ${product.videoUrl.startsWith('data:video') ? `
                            <video controls style="width: 100%; max-height: 400px; border-radius: 8px; background: #000;">
                                <source src="${product.videoUrl}">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        ` : product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? `
                            <div class="video-embed">
                                <iframe width="100%" height="400" src="${getYouTubeEmbedUrl(product.videoUrl)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius: 8px;"></iframe>
                            </div>
                        ` : product.videoUrl.includes('vimeo.com') ? `
                            <div class="video-embed">
                                <iframe src="${getVimeoEmbedUrl(product.videoUrl)}" width="100%" height="400" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="border-radius: 8px;"></iframe>
                            </div>
                        ` : `
                            <div class="detail-item">
                                <strong>Enlace:</strong> <a href="${product.videoUrl}" target="_blank">${product.videoUrl}</a>
                            </div>
                        `}
                    </div>
                ` : ''}

                ${product.colors && product.colors.length > 0 ? `
                    <div class="detail-section">
                        <h3>Colores Disponibles</h3>
                        <div class="colors-display">
                            ${product.colors.map(color => {
                                const colorMap = {
                                    negro: '#000000',
                                    blanco: '#FFFFFF',
                                    rojo: '#EF4444',
                                    azul: '#3B82F6',
                                    verde: '#22C55E',
                                    amarillo: '#FBBF24',
                                    rosa: '#EC4899',
                                    gris: '#6B7280'
                                };
                                return `
                                    <div class="color-display-item">
                                        <span class="color-box-large" style="background: ${colorMap[color] || '#999'}; ${color === 'blanco' ? 'border: 2px solid #3a3a3a;' : ''}"></span>
                                        <span>${color.charAt(0).toUpperCase() + color.slice(1)}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}

                ${product.sizes && product.sizes.length > 0 ? `
                    <div class="detail-section">
                        <h3>Tallas Disponibles</h3>
                        <div class="sizes-display">
                            ${product.sizes.map(size => `
                                <span class="size-badge">${size.toUpperCase()}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${product.tags && product.tags.length > 0 ? `
                    <div class="detail-section">
                        <h3>Etiquetas</h3>
                        <div class="tags-display">
                            ${product.tags.map(tag => {
                                const tagNames = {
                                    nuevo: 'Nuevo',
                                    oferta: 'Oferta',
                                    popular: 'Popular',
                                    limitado: 'Limitado',
                                    envioGratis: 'Envío Gratis'
                                };
                                return `<span class="tag-badge tag-${tag}">${tagNames[tag]}</span>`;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}

                ${product.features && product.features.length > 0 ? `
                    <div class="detail-section">
                        <h3>Características</h3>
                        <ul class="features-list">
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                ${product.customFields && Object.keys(product.customFields).length > 0 ? `
                    <div class="detail-section">
                        <h3>Campos Personalizados</h3>
                        <div class="detail-grid">
                            ${Object.entries(product.customFields).map(([key, value]) => `
                                <div class="detail-item">
                                    <strong>${key}:</strong> ${value}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${product.categoryData && Object.keys(product.categoryData).length > 0 ? `
                    <div class="detail-section">
                        <h3>Información Específica de Categoría</h3>
                        <div class="detail-grid">
                            ${Object.entries(product.categoryData).map(([key, value]) => {
                                // Format field names to be more readable
                                const fieldLabels = {
                                    material: 'Material',
                                    genero: 'Género',
                                    temporada: 'Temporada',
                                    tipoRopa: 'Tipo de Prenda',
                                    cuidado: 'Cuidado',
                                    marca: 'Marca',
                                    modelo: 'Modelo',
                                    garantia: 'Garantía',
                                    voltaje: 'Voltaje',
                                    conectividad: 'Conectividad',
                                    habitacion: 'Habitación',
                                    estilo: 'Estilo',
                                    montaje: 'Requiere Montaje',
                                    capacidad: 'Capacidad',
                                    deporte: 'Deporte',
                                    nivel: 'Nivel',
                                    indoor: 'Uso',
                                    certificacion: 'Certificación',
                                    tipoPiel: 'Tipo de Piel',
                                    ingredientes: 'Ingredientes',
                                    volumen: 'Volumen',
                                    origen: 'Origen',
                                    autor: 'Autor',
                                    editorial: 'Editorial',
                                    idioma: 'Idioma',
                                    paginas: 'Páginas',
                                    isbn: 'ISBN',
                                    formato: 'Formato',
                                    generoLibro: 'Género Literario',
                                    edadMinima: 'Edad Mínima',
                                    edadMaxima: 'Edad Máxima',
                                    tipoJuguete: 'Tipo de Juguete',
                                    baterias: 'Baterías',
                                    seguridad: 'Seguridad',
                                    peso: 'Peso/Contenido',
                                    caducidad: 'Vida Útil',
                                    vegano: 'Opciones Dietéticas',
                                    refrigeracion: 'Almacenamiento',
                                    sistemaOperativo: 'Sistema Operativo',
                                    procesador: 'Procesador',
                                    ram: 'RAM',
                                    almacenamiento: 'Almacenamiento',
                                    pantalla: 'Pantalla',
                                    bateria: 'Batería',
                                    subcategoria: 'Subcategoría',
                                    uso: 'Uso Principal',
                                    caracteristica1: 'Característica 1',
                                    caracteristica2: 'Característica 2'
                                };
                                const label = fieldLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
                                return `
                                    <div class="detail-item">
                                        <strong>${label}:</strong> ${value}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}

                ${product.weight || product.length || product.width || product.height || product.freeShipping ? `
                    <div class="detail-section">
                        <h3>Envío</h3>
                        <div class="detail-grid">
                            ${product.weight ? `<div class="detail-item"><strong>Peso:</strong> ${product.weight} kg</div>` : ''}
                            ${product.length ? `<div class="detail-item"><strong>Largo:</strong> ${product.length} cm</div>` : ''}
                            ${product.width ? `<div class="detail-item"><strong>Ancho:</strong> ${product.width} cm</div>` : ''}
                            ${product.height ? `<div class="detail-item"><strong>Alto:</strong> ${product.height} cm</div>` : ''}
                            ${product.freeShipping ? `<div class="detail-item"><strong>Envío Gratis:</strong> ✓</div>` : ''}
                        </div>
                    </div>
                ` : ''}

                ${product.supplierInfo && (product.supplierInfo.url || product.supplierInfo.name || product.supplierInfo.price || product.supplierInfo.notes) ? `
                    <div class="detail-section" style="background: rgba(239, 68, 68, 0.05); border: 2px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 20px;">
                        <h3 style="color: #ef4444;">🔒 Información Privada del Proveedor</h3>
                        <p style="color: #9b9b9b; font-size: 0.85rem; margin-bottom: 16px;">
                            Esta información solo es visible para ti
                        </p>
                        <div class="detail-grid">
                            ${product.supplierInfo.name ? `
                                <div class="detail-item">
                                    <strong style="color: #ef4444;">🏪 Proveedor:</strong> ${product.supplierInfo.name}
                                </div>
                            ` : ''}
                            ${product.supplierInfo.price ? `
                                <div class="detail-item">
                                    <strong style="color: #ef4444;">💵 Precio de Compra:</strong> $${product.supplierInfo.price.toLocaleString('es-CO')}
                                </div>
                            ` : ''}
                            ${product.supplierInfo.price && product.price ? `
                                <div class="detail-item">
                                    <strong style="color: #4caf50;">📊 Ganancia:</strong> 
                                    <span style="color: #4caf50; font-weight: 600;">
                                        $${(product.price - product.supplierInfo.price).toLocaleString('es-CO')}
                                    </span>
                                </div>
                            ` : ''}
                            ${product.supplierInfo.url ? `
                                <div class="detail-item full-width">
                                    <strong style="color: #ef4444;">🔗 URL del Proveedor:</strong><br>
                                    <a href="${product.supplierInfo.url}" target="_blank" style="color: #3b82f6; word-break: break-all;">
                                        ${product.supplierInfo.url}
                                    </a>
                                    <button onclick="window.open('${product.supplierInfo.url}', '_blank')" 
                                            style="margin-left: 10px; padding: 6px 12px; background: #3b82f6; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
                                        Abrir 🔗
                                    </button>
                                </div>
                            ` : ''}
                            ${product.supplierInfo.notes ? `
                                <div class="detail-item full-width">
                                    <strong style="color: #ef4444;">📝 Notas:</strong><br>
                                    <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px; margin-top: 8px; white-space: pre-wrap;">
                                        ${product.supplierInfo.notes}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function deleteProduct(id) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        await window.dataSync.deleteProduct(id);
        loadProducts();
        showNotification('Producto eliminado correctamente', 'success');
    }
}

// Editar Producto
async function editProduct(id) {
    const products = await getProducts();
    const product = products.find(p => p.id === id);
    if (!product) {
        showNotification('Producto no encontrado', 'error');
        return;
    }
    
    // Abrir el modal de agregar producto
    addProductModal.style.display = 'flex';
    
    // Cambiar el título del modal
    const modalTitle = addProductModal.querySelector('h2');
    const originalTitle = modalTitle.textContent;
    modalTitle.textContent = '✏️ Editar Producto';
    
    // Cambiar el texto del botón de submit
    const submitBtn = addProductForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '✓ Guardar Cambios';
    
    // Llenar el formulario con los datos del producto
    document.getElementById('productName').value = product.name || '';
    document.getElementById('productCategory').value = product.category || '';
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productShortDesc').value = product.shortDescription || '';
    document.getElementById('productPrice').value = product.price || '';
    document.getElementById('productComparePrice').value = product.originalPrice || product.comparePrice || '';
    document.getElementById('productStock').value = product.stock || 0;
    document.getElementById('productSKU').value = product.sku || '';
    document.getElementById('productAvailable').checked = product.available !== false;
    document.getElementById('productFreeShipping').checked = product.freeShipping || false;
    
    // Imagen principal
    if (product.image) {
        if (product.image.startsWith('data:')) {
            // Es base64, usar modo upload
            document.querySelector('[onclick="switchUploadMode(\'upload\')"]').click();
            document.getElementById('productImage').value = product.image;
            displayMainImage(product.image, 'product-image');
        } else {
            // Es URL
            document.querySelector('[onclick="switchUploadMode(\'url\')"]').click();
            document.getElementById('productImageURL').value = product.image;
        }
    }
    
    // Imágenes adicionales
    if (product.additionalImages && product.additionalImages.length > 0) {
        uploadedAdditionalImages = [...product.additionalImages];
        refreshAdditionalImagesDisplay();
    }
    
    // Colores
    if (product.colors && product.colors.length > 0) {
        product.colors.forEach(color => {
            const checkbox = document.querySelector(`input[name="colors"][value="${color}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    // Tallas
    if (product.sizes && product.sizes.length > 0) {
        product.sizes.forEach(size => {
            const checkbox = document.querySelector(`input[name="sizes"][value="${size}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    // Etiquetas
    if (product.tags && product.tags.length > 0) {
        product.tags.forEach(tag => {
            const checkbox = document.querySelector(`input[name="tags"][value="${tag}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    // Características
    if (product.features && product.features.length > 0) {
        document.getElementById('productFeatures').value = product.features.join('\n');
    }
    
    // Campos personalizados
    if (product.customFields) {
        const customFieldsText = Object.entries(product.customFields)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        document.getElementById('productCustomFields').value = customFieldsText;
    }
    
    // Envío
    document.getElementById('productWeight').value = product.weight || '';
    document.getElementById('productDimensions').value = product.dimensions || '';
    document.getElementById('productFreeShipping').checked = product.freeShipping || false;
    
    // Información del proveedor
    if (product.supplierInfo) {
        document.getElementById('productSupplierUrl').value = product.supplierInfo.url || '';
        document.getElementById('productSupplierName').value = product.supplierInfo.name || '';
        document.getElementById('productSupplierPrice').value = product.supplierInfo.price || '';
        document.getElementById('productNotes').value = product.supplierInfo.notes || '';
        
        // Calcular ganancia
        if (product.supplierInfo.price && product.price) {
            const profit = product.price - product.supplierInfo.price;
            document.getElementById('productProfit').value = `$${profit.toLocaleString('es-CO')}`;
        }
    }
    
    // Cargar variantes (colores y tallas)
    if (product.variants) {
        if (product.variants.colors && product.variants.colors.length > 0) {
            window.colorVariants = product.variants.colors;
            if (typeof window.renderColorVariants === 'function') {
                window.renderColorVariants();
            }
        }
        if (product.variants.sizes && product.variants.sizes.length > 0) {
            window.sizeVariants = product.variants.sizes;
            if (typeof window.renderSizeVariants === 'function') {
                window.renderSizeVariants();
            }
        }
    }
    
    // Tabla de especificaciones
    if (product.specifications && product.specifications.length > 0) {
        const enableSpecsCheckbox = document.getElementById('enableSpecsTable');
        if (enableSpecsCheckbox) {
            enableSpecsCheckbox.checked = true;
            toggleSpecsTable();
            
            // Esperar a que se creen los campos y luego llenarlos
            setTimeout(() => {
                // Limpiar filas existentes completamente
                const specsContainer = document.getElementById('specsRowsContainer');
                if (specsContainer) {
                    specsContainer.innerHTML = '';
                }
                window.specRowCount = 0;
                
                // Agregar cada especificación
                product.specifications.forEach(spec => {
                    addSpecRow();
                    const rows = document.querySelectorAll('.spec-row');
                    const lastRow = rows[rows.length - 1];
                    if (lastRow) {
                        const labelInput = lastRow.querySelector('.spec-label');
                        const valueInput = lastRow.querySelector('.spec-value');
                        if (labelInput) labelInput.value = spec.label || '';
                        if (valueInput) valueInput.value = spec.value || '';
                    }
                });
                
                updateSpecsPreview();
            }, 150);
        }
    } else {
        // Desmarcar y ocultar si no hay especificaciones
        const enableSpecsCheckbox = document.getElementById('enableSpecsTable');
        if (enableSpecsCheckbox) {
            enableSpecsCheckbox.checked = false;
            const container = document.getElementById('specsTableContainer');
            if (container) container.style.display = 'none';
            const specsContainer = document.getElementById('specsRowsContainer');
            if (specsContainer) specsContainer.innerHTML = '';
            window.specRowCount = 0;
        }
    }
    
    // Mostrar campos específicos de categoría si existen
    if (product.category && categoryFields[product.category]) {
        showCategoryFields(product.category);
        
        // Llenar datos específicos de categoría
        if (product.categoryData) {
            setTimeout(() => {
                Object.entries(product.categoryData).forEach(([key, value]) => {
                    const input = document.querySelector(`[data-category-field="${key}"]`);
                    if (input) input.value = value;
                });
            }, 100);
        }
    }
    
    // Remover el listener de agregar producto
    addProductForm.removeEventListener('submit', handleAddProductSubmit);
    
    // Modificar el evento de submit para actualizar en lugar de crear
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Verificar que dataSync esté disponible
            if (!window.dataSync) {
                console.error('❌ dataSync no está disponible');
                showNotification('❌ Error: Sistema de datos no disponible', 'error');
                return;
            }
            
            // Check which upload mode is active
            const uploadModeActive = document.getElementById('uploadMode').classList.contains('active');
            
            // Recopilar imágenes adicionales
            let additionalImages = [];
            
            if (uploadModeActive) {
                additionalImages = uploadedAdditionalImages;
            } else {
                additionalImages = Array.from(document.querySelectorAll('.additional-image'))
                    .map(input => input.value)
                    .filter(url => url.trim() !== '');
            }
            
            // Get main image
            let mainImage = '';
            if (uploadModeActive) {
                mainImage = document.getElementById('productImage').value;
            } else {
                mainImage = document.getElementById('productImageURL').value;
            }
            
            // Validar que haya una imagen
            if (!mainImage || mainImage.trim() === '') {
                showNotification('⚠️ Por favor agrega una imagen principal', 'error');
                return;
            }
            
            // Get video
            const videoUploadActive = document.getElementById('videoUploadMode').classList.contains('active');
            let videoData = null;
            
            if (videoUploadActive) {
                videoData = uploadedVideoData;
            } else {
                videoData = document.getElementById('productVideo').value || null;
            }
            
            // Recopilar colores seleccionados
            const colors = window.colorVariants || [];
            
            // Recopilar tallas seleccionadas
            const sizes = window.sizeVariants || [];
            
            // Recopilar etiquetas
            const tags = Array.from(document.querySelectorAll('input[name="tags"]:checked'))
                .map(cb => cb.value);
            
            // Recopilar características
            const featuresText = document.getElementById('productFeatures').value;
            const features = featuresText ? featuresText.split('\n').filter(f => f.trim() !== '') : [];
            
            // Procesar campos personalizados
            const customFieldsText = document.getElementById('productCustomFields').value;
            const customFields = {};
            if (customFieldsText) {
                customFieldsText.split(',').forEach(field => {
                    const [key, value] = field.split(':').map(s => s.trim());
                    if (key && value) customFields[key] = value;
                });
            }
            
            // Recopilar campos específicos de categoría
            const categorySpecificData = {};
            const categoryFieldInputs = document.querySelectorAll('[data-category-field]');
            categoryFieldInputs.forEach(input => {
                const fieldName = input.dataset.categoryField;
                const value = input.value;
                if (value && value.trim() !== '') {
                    categorySpecificData[fieldName] = value;
                }
            });
            
            // Recopilar tabla de especificaciones (si está habilitada)
            let specsTable = null;
            const enableSpecsTable = document.getElementById('enableSpecsTable');
            if (enableSpecsTable && enableSpecsTable.checked) {
                if (typeof window.getSpecsTableData === 'function') {
                    specsTable = window.getSpecsTableData();
                    console.log('📊 Tabla de especificaciones para actualizar producto:', specsTable);
                } else {
                    console.warn('⚠️ getSpecsTableData no está disponible');
                }
            }
            
            const updatedProduct = {
                // Básico
                name: document.getElementById('productName').value,
                category: document.getElementById('productCategory').value,
                description: document.getElementById('productDescription').value,
                shortDescription: document.getElementById('productShortDesc').value || document.getElementById('productDescription').value.substring(0, 100),
                
                // Precios e inventario
                price: parseFloat(document.getElementById('productPrice').value),
                originalPrice: parseFloat(document.getElementById('productComparePrice').value) || null,
                stock: parseInt(document.getElementById('productStock').value),
                sku: document.getElementById('productSKU').value || product.sku,
                available: document.getElementById('productAvailable').checked,
                freeShipping: document.getElementById('productFreeShipping').checked,
                
                // Imágenes y videos
                image: mainImage,
                additionalImages: additionalImages,
                videoUrl: videoData,
                
                // Variantes
                variants: {
                    colors: colors.length > 0 ? colors : [],
                    sizes: sizes.length > 0 ? sizes : []
                },
                customFields: Object.keys(customFields).length > 0 ? customFields : null,
                
                // Características
                tags: tags,
                features: features,
                
                // Envío
                weight: parseFloat(document.getElementById('productWeight').value) || null,
                dimensions: document.getElementById('productDimensions')?.value || null,
                freeShipping: document.getElementById('productFreeShipping').checked,
                
                // Campos específicos de categoría
                categoryData: Object.keys(categorySpecificData).length > 0 ? categorySpecificData : null,
                
                // Tabla de especificaciones técnicas
                specifications: specsTable && specsTable.length > 0 ? specsTable : null,
                
                // Mantener datos existentes
                rating: product.rating || 5,
                reviews: product.reviews || 0,
                sold: product.sold || 0
            };
            
            console.log('📝 Actualizando producto:', updatedProduct);
            
            // Actualizar producto
            const result = await window.dataSync.updateProduct(id, updatedProduct);
            console.log('✅ Producto actualizado exitosamente:', result);
            
            // Restaurar modal y formulario
            modalTitle.textContent = originalTitle;
            submitBtn.innerHTML = originalBtnText;
            
            // Cerrar modal y limpiar formulario
            closeAddProductModal();
            addProductForm.reset();
            document.getElementById('categorySpecificFields').style.display = 'none';
            uploadedAdditionalImages = [];
            uploadedVideoData = null;
            
            // Limpiar tabla de especificaciones
            const enableSpecsCheckbox = document.getElementById('enableSpecsTable');
            if (enableSpecsCheckbox) {
                enableSpecsCheckbox.checked = false;
                const container = document.getElementById('specsTableContainer');
                if (container) container.style.display = 'none';
                const specsContainer = document.getElementById('specsRowsContainer');
                if (specsContainer) specsContainer.innerHTML = '';
                window.specRowCount = 0;
            }
            
            // Recargar productos
            loadProducts();
            
            // Mostrar notificación
            showNotification('✓ Producto actualizado correctamente', 'success');
            
            // Remover el listener temporal y restaurar el original
            addProductForm.removeEventListener('submit', handleEditSubmit);
            addProductForm.addEventListener('submit', handleAddProductSubmit);
            
        } catch (error) {
            console.error('❌ Error al actualizar producto:', error);
            showNotification('❌ Error al actualizar producto: ' + error.message, 'error');
        }
    };
    
    // Agregar el listener de edición
    addProductForm.addEventListener('submit', handleEditSubmit, { once: true });
    
    // Restaurar estado original al cerrar
    const originalCloseFunction = window.closeAddProductModal;
    window.closeAddProductModal = function() {
        modalTitle.textContent = originalTitle;
        submitBtn.innerHTML = originalBtnText;
        addProductForm.removeEventListener('submit', handleEditSubmit);
        addProductForm.addEventListener('submit', handleAddProductSubmit);
        window.closeAddProductModal = originalCloseFunction;
        originalCloseFunction();
    };
}

// Add Product Modal
const addProductBtn = document.getElementById('addProductBtn');
const addProductModal = document.getElementById('addProductModal');
const closeModal = document.querySelector('.close-modal');
const addProductForm = document.getElementById('addProductForm');

const exportProductsBtn = document.getElementById('exportProductsBtn');

addProductBtn.addEventListener('click', () => {
    addProductModal.style.display = 'flex';
});

exportProductsBtn.addEventListener('click', async () => {
    try {
        const products = await window.dataSync.exportProducts();
        const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'products.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Productos exportados correctamente', 'success');
    } catch (error) {
        console.error('Error exportando productos:', error);
        showNotification('Error al exportar productos', 'error');
    }
});

closeModal.addEventListener('click', () => {
    closeAddProductModal();
});

window.addEventListener('click', (e) => {
    if (e.target === addProductModal) {
        closeAddProductModal();
    }
});

function closeAddProductModal() {
    addProductModal.style.display = 'none';
    addProductForm.reset();
    // Reset image upload states
    resetImageUploads();
}

// Reset image upload states
function resetImageUploads() {
    const mainPreview = document.getElementById('mainImagePreview');
    const additionalPreview = document.getElementById('additionalImagesPreview');
    const videoPreview = document.getElementById('videoPreview');
    
    if (mainPreview) mainPreview.style.display = 'none';
    if (additionalPreview) additionalPreview.innerHTML = '';
    if (videoPreview) {
        videoPreview.style.display = 'none';
        videoPreview.querySelector('video').src = '';
    }
    
    document.getElementById('productImage').value = '';
    uploadedAdditionalImages = [];
    uploadedVideoData = null;
}

// Función para agregar más campos de imágenes
function addImageField() {
    const container = document.getElementById('additionalImagesContainer');
    const newInput = document.createElement('input');
    newInput.type = 'url';
    newInput.className = 'additional-image';
    newInput.placeholder = 'https://ejemplo.com/imagen.jpg';
    container.appendChild(newInput);
}

// ============================================
// IMAGE UPLOAD SYSTEM
// ============================================

let uploadedAdditionalImages = [];

// Switch between upload modes (file upload or URL)
function switchUploadMode(mode) {
    const uploadMode = document.getElementById('uploadMode');
    const urlMode = document.getElementById('urlMode');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    if (mode === 'upload') {
        uploadMode.classList.add('active');
        urlMode.classList.remove('active');
        // Required field switch
        document.getElementById('productImage').required = true;
        document.getElementById('productImageURL').required = false;
    } else {
        uploadMode.classList.remove('active');
        urlMode.classList.add('active');
        // Required field switch
        document.getElementById('productImage').required = false;
        document.getElementById('productImageURL').required = true;
    }
}

// Handle file selection
function handleFileSelect(event, type) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    if (type === 'main') {
        const file = files[0];
        if (validateImage(file)) {
            convertToBase64(file, (base64) => {
                displayMainImage(base64, file.name);
                document.getElementById('productImage').value = base64;
            });
        }
    } else if (type === 'additional') {
        Array.from(files).forEach(file => {
            if (validateImage(file)) {
                convertToBase64(file, (base64) => {
                    uploadedAdditionalImages.push(base64);
                    displayAdditionalImage(base64, file.name);
                });
            }
        });
    }
}

// Validate image file
function validateImage(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    // Validar primero por extensión (más confiable)
    const fileName = file.name.toLowerCase();
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
    
    // Validar por tipo MIME como backup
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
    const hasValidType = validTypes.includes(file.type);
    
    // Aceptar si cumple al menos una de las dos validaciones
    if (!hasValidExtension && !hasValidType) {
        console.log('Tipo detectado:', file.type, 'Nombre:', file.name);
        alert('⚠️ Solo se permiten imágenes JPG, PNG, GIF, WebP o AVIF\nTipo detectado: ' + file.type);
        return false;
    }
    
    if (file.size > maxSize) {
        alert('⚠️ La imagen no puede superar los 5MB');
        return false;
    }
    
    return true;
}

// Convert image to Base64
function convertToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.onerror = function() {
        alert('❌ Error al leer el archivo');
    };
    reader.readAsDataURL(file);
}

// Display main image preview
function displayMainImage(base64, fileName) {
    const dropZone = document.getElementById('mainImageDropZone').querySelector('.drop-zone-content');
    const preview = document.getElementById('mainImagePreview');
    
    preview.querySelector('img').src = base64;
    preview.querySelector('.image-name').textContent = fileName;
    
    dropZone.style.display = 'none';
    preview.style.display = 'block';
}

// Display additional image preview
function displayAdditionalImage(base64, fileName) {
    const container = document.getElementById('additionalImagesPreview');
    const index = uploadedAdditionalImages.length - 1;
    
    const imageItem = document.createElement('div');
    imageItem.className = 'additional-image-item';
    imageItem.innerHTML = `
        <img src="${base64}" alt="${fileName}">
        <button type="button" class="btn-remove-image" onclick="removeAdditionalImage(${index})">✕</button>
        <div class="image-name">${fileName}</div>
    `;
    
    container.appendChild(imageItem);
}

// Remove main image
function removeImage(type) {
    if (type === 'main') {
        const dropZone = document.getElementById('mainImageDropZone').querySelector('.drop-zone-content');
        const preview = document.getElementById('mainImagePreview');
        
        dropZone.style.display = 'block';
        preview.style.display = 'none';
        document.getElementById('productImage').value = '';
        document.getElementById('mainImageFile').value = '';
    }
}

// Remove additional image
function removeAdditionalImage(index) {
    uploadedAdditionalImages.splice(index, 1);
    refreshAdditionalImagesDisplay();
}

// Refresh additional images display
function refreshAdditionalImagesDisplay() {
    const container = document.getElementById('additionalImagesPreview');
    container.innerHTML = '';
    
    uploadedAdditionalImages.forEach((base64, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'additional-image-item';
        imageItem.innerHTML = `
            <img src="${base64}" alt="Imagen ${index + 1}">
            <button type="button" class="btn-remove-image" onclick="removeAdditionalImage(${index})">✕</button>
            <div class="image-name">Imagen ${index + 1}</div>
        `;
        container.appendChild(imageItem);
    });
}

// Setup drag and drop
function setupDragAndDrop() {
    const mainDropZone = document.getElementById('mainImageDropZone');
    const additionalDropZone = document.getElementById('additionalImagesDropZone');
    const videoDropZone = document.getElementById('videoDropZone');
    
    if (mainDropZone) {
        setupDropZone(mainDropZone, 'main');
    }
    
    if (additionalDropZone) {
        setupDropZone(additionalDropZone, 'additional');
    }
    
    if (videoDropZone) {
        setupVideoDropZone(videoDropZone);
    }
}

function setupDropZone(element, type) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        element.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        element.addEventListener(eventName, () => {
            element.classList.add('dragover');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        element.addEventListener(eventName, () => {
            element.classList.remove('dragover');
        }, false);
    });
    
    element.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            if (type === 'main') {
                const file = files[0];
                if (validateImage(file)) {
                    convertToBase64(file, (base64) => {
                        displayMainImage(base64, file.name);
                        document.getElementById('productImage').value = base64;
                    });
                }
            } else if (type === 'additional') {
                Array.from(files).forEach(file => {
                    if (validateImage(file)) {
                        convertToBase64(file, (base64) => {
                            uploadedAdditionalImages.push(base64);
                            displayAdditionalImage(base64, file.name);
                        });
                    }
                });
            }
        }
    }, false);
}

// ============================================
// VIDEO UPLOAD SYSTEM
// ============================================

let uploadedVideoData = null;

// Switch between video upload modes
function switchVideoMode(mode) {
    const uploadMode = document.getElementById('videoUploadMode');
    const urlMode = document.getElementById('videoUrlMode');
    const tabs = document.querySelectorAll('.tab-btn-video');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    if (mode === 'upload') {
        uploadMode.classList.add('active');
        urlMode.classList.remove('active');
    } else {
        uploadMode.classList.remove('active');
        urlMode.classList.add('active');
    }
}

// Handle video file selection
function handleVideoSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (validateVideo(file)) {
        convertToBase64(file, (base64) => {
            displayVideoPreview(base64, file.name, file.size);
            uploadedVideoData = base64;
            document.getElementById('productVideoData').value = base64;
        });
    }
}

// Validate video file
function validateVideo(file) {
    const validTypes = ['video/mp4', 'video/webm', 'video/avi', 'video/quicktime', 'video/x-msvideo'];
    const maxSize = 50 * 1024 * 1024; // 50MB
    
    if (!validTypes.includes(file.type)) {
        alert('⚠️ Solo se permiten videos MP4, WebM, AVI o MOV');
        return false;
    }
    
    if (file.size > maxSize) {
        alert('⚠️ El video no puede superar los 50MB');
        return false;
    }
    
    return true;
}

// Display video preview
function displayVideoPreview(base64, fileName, fileSize) {
    const dropZone = document.getElementById('videoDropZone').querySelector('.drop-zone-content');
    const preview = document.getElementById('videoPreview');
    
    preview.querySelector('video').src = base64;
    preview.querySelector('.video-name').textContent = fileName;
    preview.querySelector('.video-size').textContent = formatFileSize(fileSize);
    
    dropZone.style.display = 'none';
    preview.style.display = 'block';
}

// Remove video
function removeVideo() {
    const dropZone = document.getElementById('videoDropZone').querySelector('.drop-zone-content');
    const preview = document.getElementById('videoPreview');
    
    dropZone.style.display = 'block';
    preview.style.display = 'none';
    preview.querySelector('video').src = '';
    document.getElementById('productVideoData').value = '';
    document.getElementById('videoFile').value = '';
    uploadedVideoData = null;
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Setup video drop zone
function setupVideoDropZone(element) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        element.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        element.addEventListener(eventName, () => {
            element.classList.add('dragover');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        element.addEventListener(eventName, () => {
            element.classList.remove('dragover');
        }, false);
    });
    
    element.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (validateVideo(file)) {
                convertToBase64(file, (base64) => {
                    displayVideoPreview(base64, file.name, file.size);
                    uploadedVideoData = base64;
                    document.getElementById('productVideoData').value = base64;
                });
            }
        }
    }, false);
}

// Función para manejar el submit de agregar producto
async function handleAddProductSubmit(e) {
    e.preventDefault();
    
    try {
        // Verificar que dataSync esté disponible
        if (!window.dataSync) {
            console.error('❌ dataSync no está disponible');
            showNotification('❌ Error: Sistema de datos no disponible', 'error');
            return;
        }
        
        // Check which upload mode is active
        const uploadModeActive = document.getElementById('uploadMode').classList.contains('active');
        
        // Recopilar imágenes adicionales
        let additionalImages = [];
        
        if (uploadModeActive) {
            // Use uploaded images (Base64)
            additionalImages = uploadedAdditionalImages;
        } else {
            // Use URL images
            additionalImages = Array.from(document.querySelectorAll('.additional-image'))
                .map(input => input.value)
                .filter(url => url.trim() !== '');
        }
        
        // Get main image
        let mainImage = '';
        if (uploadModeActive) {
            mainImage = document.getElementById('productImage').value;
        } else {
            mainImage = document.getElementById('productImageURL').value;
        }
        
        // Validar que haya una imagen
        if (!mainImage || mainImage.trim() === '') {
            showNotification('⚠️ Por favor agrega una imagen principal', 'error');
            return;
        }
        
        // Get video
        const videoUploadActive = document.getElementById('videoUploadMode').classList.contains('active');
        let videoData = null;
        
        if (videoUploadActive) {
            // Use uploaded video (Base64)
            videoData = uploadedVideoData;
        } else {
            // Use URL video
            videoData = document.getElementById('productVideo').value || null;
        }
        
        // Recopilar colores seleccionados
        const colors = Array.from(document.querySelectorAll('input[name="colors"]:checked'))
            .map(cb => cb.value);
        
        // Recopilar tallas seleccionadas
        const sizes = Array.from(document.querySelectorAll('input[name="sizes"]:checked'))
            .map(cb => cb.value);
        
        // Recopilar etiquetas
        const tags = Array.from(document.querySelectorAll('input[name="tags"]:checked'))
            .map(cb => cb.value);
        
        // Recopilar características
        const featuresText = document.getElementById('productFeatures').value;
        const features = featuresText ? featuresText.split('\n').filter(f => f.trim() !== '') : [];
        
        // Procesar campos personalizados
        const customFieldsText = document.getElementById('productCustomFields').value;
        const customFields = {};
        if (customFieldsText) {
            customFieldsText.split(',').forEach(field => {
                const [key, value] = field.split(':').map(s => s.trim());
                if (key && value) customFields[key] = value;
            });
        }
        
        // Recopilar campos específicos de categoría
        const categorySpecificData = {};
        const categoryFieldInputs = document.querySelectorAll('[data-category-field]');
        categoryFieldInputs.forEach(input => {
            const fieldName = input.dataset.categoryField;
            const value = input.value;
            if (value && value.trim() !== '') {
                categorySpecificData[fieldName] = value;
            }
        });
        
        // Recopilar tabla de especificaciones (si está habilitada)
        let specsTable = null;
        const enableSpecsTable = document.getElementById('enableSpecsTable');
        if (enableSpecsTable && enableSpecsTable.checked) {
            if (typeof window.getSpecsTableData === 'function') {
                specsTable = window.getSpecsTableData();
                console.log('📊 Tabla de especificaciones para nuevo producto:', specsTable);
            } else {
                console.warn('⚠️ getSpecsTableData no está disponible');
            }
        }
        
        const newProduct = {
            // Básico
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            description: document.getElementById('productDescription').value,
            shortDescription: document.getElementById('productShortDesc').value || document.getElementById('productDescription').value.substring(0, 100),
            
            // Precios e inventario
            price: parseFloat(document.getElementById('productPrice').value),
            originalPrice: parseFloat(document.getElementById('productComparePrice').value) || null,
            stock: parseInt(document.getElementById('productStock').value),
            sku: document.getElementById('productSKU').value || `PRD-${Date.now()}`,
            available: document.getElementById('productAvailable').checked,
            freeShipping: document.getElementById('productFreeShipping').checked,
            
            // Imágenes y videos
            image: mainImage,
            additionalImages: additionalImages,
            videoUrl: videoData,
            
            // Variantes
            variants: {
                colors: colors.length > 0 ? colors : [],
                sizes: sizes.length > 0 ? sizes : []
            },
            customFields: Object.keys(customFields).length > 0 ? customFields : null,
            
            // Características
            tags: tags,
            features: features,
            
            // Envío
            weight: parseFloat(document.getElementById('productWeight').value) || null,
            dimensions: document.getElementById('productDimensions')?.value || null,
            freeShipping: document.getElementById('productFreeShipping').checked,
            
            // Campos específicos de categoría
            categoryData: Object.keys(categorySpecificData).length > 0 ? categorySpecificData : null,
            
            // Tabla de especificaciones técnicas
            specifications: specsTable && specsTable.length > 0 ? specsTable : null,
            
            // Información privada del proveedor (solo admin)
            supplierInfo: {
                url: document.getElementById('productSupplierUrl')?.value || null,
                name: document.getElementById('productSupplierName')?.value || null,
                price: parseFloat(document.getElementById('productSupplierPrice')?.value) || null,
                notes: document.getElementById('productNotes')?.value || null
            },
            
            // Metadata
            rating: 5,
            reviews: 0,
            sold: 0
        };
        
        console.log('📦 Intentando agregar producto:', newProduct);
        console.log('📊 Especificaciones en newProduct:', newProduct.specifications);
        console.log('🔒 Información del proveedor:', newProduct.supplierInfo);
        
        // Agregar producto
        const addedProduct = await window.dataSync.addProduct(newProduct);
        console.log('✅ Producto agregado exitosamente:', addedProduct);
        
        // Cerrar modal y limpiar formulario
        closeAddProductModal();
        addProductForm.reset();
        document.getElementById('categorySpecificFields').style.display = 'none';
        uploadedAdditionalImages = [];
        uploadedVideoData = null;
        
        // Limpiar tabla de especificaciones
        const enableSpecsCheckbox = document.getElementById('enableSpecsTable');
        if (enableSpecsCheckbox) {
            enableSpecsCheckbox.checked = false;
            const container = document.getElementById('specsTableContainer');
            if (container) container.style.display = 'none';
            const specsContainer = document.getElementById('specsRowsContainer');
            if (specsContainer) specsContainer.innerHTML = '';
            window.specRowCount = 0;
        }
        
        // Recargar productos
        loadProducts();
        
        // Mostrar notificación
        showNotification('✓ Producto agregado correctamente', 'success');
        
    } catch (error) {
        console.error('❌ Error al agregar producto:', error);
        showNotification('❌ Error al agregar producto: ' + error.message, 'error');
    }
}

// Agregar listener inicial
addProductForm.addEventListener('submit', handleAddProductSubmit);

// ============================================
// ORDERS SECTION
// ============================================

function loadOrders(filter = 'all') {
    let orders = getOrders();
    
    if (filter !== 'all') {
        orders = orders.filter(order => order.status === filter);
    }
    
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.email}</td>
            <td>${order.product}</td>
            <td>$${order.total}</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>${order.date}</td>
            <td><button class="btn-view" onclick="viewOrder(${order.id})">Ver</button></td>
        </tr>
    `).join('');
}

function getOrders() {
    return window.dataSync.getOrders();
}

function getStatusText(status) {
    const texts = {
        pending: 'Pendiente',
        processing: 'En Proceso',
        shipped: 'Enviado',
        delivered: 'Entregado'
    };
    return texts[status] || status;
}

function viewOrder(id) {
    const order = getOrders().find(o => o.id === id);
    if (order) {
        alert(`Pedido #${id}\nCliente: ${order.customer}\nProducto: ${order.product}\nTotal: $${order.total}\nEstado: ${getStatusText(order.status)}`);
    }
}

// Order Filter
document.getElementById('orderStatusFilter').addEventListener('change', (e) => {
    loadOrders(e.target.value);
});

// ============================================
// ANALYTICS SECTION
// ============================================

function loadAnalytics() {
    createTrafficChart();
    createSourceChart();
    createDeviceChart();
}

function createTrafficChart() {
    const ctx = document.getElementById('trafficChart');
    if (!ctx) return;
    
    // Lazy load Chart.js si no está cargado
    if (typeof Chart === 'undefined') {
        if (!window.chartJsLoading) {
            window.chartJsLoading = true;
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => createTrafficChart();
            document.head.appendChild(script);
        }
        return;
    }
    
    const days = Array.from({length: 30}, (_, i) => `Día ${i + 1}`);
    const data = Array.from({length: 30}, () => Math.floor(Math.random() * 500) + 200);
    
    charts.traffic = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Visitantes',
                data: data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#9b9b9b' },
                    grid: { color: '#1a1a1a' }
                },
                x: {
                    ticks: { 
                        color: '#9b9b9b',
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 10
                    },
                    grid: { color: '#1a1a1a' }
                }
            }
        }
    });
}

function createSourceChart() {
    const ctx = document.getElementById('sourceChart');
    if (!ctx) return;
    
    // Lazy load Chart.js si no está cargado
    if (typeof Chart === 'undefined') {
        if (!window.chartJsLoading) {
            window.chartJsLoading = true;
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => createSourceChart();
            document.head.appendChild(script);
        }
        return;
    }
    
    charts.source = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Directo', 'Google', 'Redes Sociales', 'Referidos', 'Otros'],
            datasets: [{
                data: [35, 30, 20, 10, 5],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } }
            }
        }
    });
}

function createDeviceChart() {
    const ctx = document.getElementById('deviceChart');
    if (!ctx) return;
    
    // Lazy load Chart.js si no está cargado
    if (typeof Chart === 'undefined') {
        if (!window.chartJsLoading) {
            window.chartJsLoading = true;
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => createDeviceChart();
            document.head.appendChild(script);
        }
        return;
    }
    
    charts.device = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Móvil', 'Escritorio', 'Tablet'],
            datasets: [{
                data: [55, 35, 10],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(251, 191, 36, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } }
            }
        }
    });
}

// ============================================
// VISITORS SECTION
// ============================================

let visitorsInterval;

function loadVisitors() {
    updateVisitorsList();
    clearInterval(visitorsInterval);
    visitorsInterval = setInterval(() => {
        if (document.getElementById('visitorsSection').classList.contains('active')) {
            updateVisitorsList();
        }
    }, 3000);
}

function updateVisitorsList() {
    const visitors = window.dataSync.getVisitors();
    const activeCount = window.dataSync.getActiveVisitorsCount();
    
    document.getElementById('activeVisitorsCount').textContent = activeCount;
    
    const list = document.getElementById('visitorsList');
    
    if (visitors.length === 0) {
        list.innerHTML = '<p style="color: #9b9b9b; text-align: center; padding: 40px;">No hay visitantes activos en este momento</p>';
        return;
    }
    
    list.innerHTML = visitors.map(visitor => {
        const timestamp = new Date(visitor.timestamp);
        const now = new Date();
        const secondsAgo = Math.floor((now - timestamp) / 1000);
        const timeStr = secondsAgo < 60 ? `${secondsAgo}s` : `${Math.floor(secondsAgo / 60)}m`;
        
        return `
            <div class="visitor-item">
                <div class="visitor-info">
                    <span class="visitor-ip">🌐 ${visitor.ip}</span>
                    <span class="visitor-location">📍 ${visitor.location}</span>
                    <span class="visitor-page">📄 ${visitor.page}</span>
                    <span class="visitor-device">📱 ${visitor.userAgent}</span>
                </div>
                <span class="visitor-time">${timeStr}</span>
            </div>
        `;
    }).join('');
}

// ============================================
// UTILITIES
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    clearInterval(realTimeInterval);
    clearInterval(visitorsInterval);
    Object.keys(charts).forEach(key => {
        if (charts[key]) charts[key].destroy();
    });
});

// ============================================
// OCR Y PROCESAMIENTO DE IMÁGENES
// ============================================

// Preview de imagen cuando se selecciona
document.getElementById('productImageUploadOCR')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('imagePreviewOCR');
            const container = document.getElementById('imagePreviewContainerOCR');
            preview.src = event.target.result;
            container.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Procesar imagen con OCR
async function processImageTextNew() {
    const imagePreview = document.getElementById('imagePreviewOCR');
    const progressDiv = document.getElementById('ocrProgressNew');
    const descriptionTextarea = document.getElementById('productDescription');
    
    if (!imagePreview.src) {
        showNotification('Por favor selecciona una imagen primero', 'error');
        return;
    }
    
    progressDiv.style.display = 'block';
    
    try {
        // Usar Tesseract.js para OCR
        const { data: { text } } = await Tesseract.recognize(
            imagePreview.src,
            'spa', // Español
            {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        const progress = Math.round(m.progress * 100);
                        progressDiv.querySelector('p').textContent = `Procesando imagen... ${progress}%`;
                    }
                }
            }
        );
        
        if (text.trim()) {
            // Formatear el texto extraído
            const formattedText = formatExtractedTextNew(text);
            descriptionTextarea.value = formattedText;
            
            // Mostrar notificación de éxito
            showNotification('✅ Texto extraído y formateado correctamente', 'success');
            
            // Resaltar el textarea
            descriptionTextarea.style.background = 'rgba(34, 197, 94, 0.1)';
            descriptionTextarea.style.borderColor = 'rgba(34, 197, 94, 0.3)';
            setTimeout(() => {
                descriptionTextarea.style.background = '';
                descriptionTextarea.style.borderColor = '';
            }, 2000);
        } else {
            showNotification('No se pudo detectar texto en la imagen', 'error');
        }
        
    } catch (error) {
        console.error('Error en OCR:', error);
        showNotification('Error al procesar la imagen. Intenta con otra imagen.', 'error');
    } finally {
        progressDiv.style.display = 'none';
    }
}

// Formatear texto extraído para mejor presentación
function formatExtractedTextNew(rawText) {
    // Limpiar texto
    let text = rawText.trim();
    
    // Eliminar líneas vacías múltiples
    text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    // Detectar si hay estructura de tabla (buscar patrones)
    const hasTableStructure = detectTableStructureNew(text);
    
    if (hasTableStructure) {
        return formatAsTableNew(text);
    } else {
        return formatAsDescriptionNew(text);
    }
}

// Detectar si el texto tiene estructura de tabla
function detectTableStructureNew(text) {
    const lines = text.split('\n');
    
    // Buscar patrones comunes en tablas
    const tableIndicators = [
        /\|/g,  // Pipes
        /\t/g,  // Tabs
        /:\s*$/gm,  // Dos puntos al final
        /^\s*[-•]\s+/gm,  // Bullets
    ];
    
    let score = 0;
    tableIndicators.forEach(pattern => {
        if (pattern.test(text)) score++;
    });
    
    // Si tiene al menos 2 indicadores o más de 3 líneas con estructura
    return score >= 2 || lines.filter(l => l.includes(':') || l.includes('|')).length >= 3;
}

// Formatear como tabla HTML/Markdown
function formatAsTableNew(text) {
    const lines = text.split('\n').filter(l => l.trim());
    let formatted = '📋 ESPECIFICACIONES:\n\n';
    
    lines.forEach(line => {
        line = line.trim();
        
        // Si tiene formato "Clave: Valor"
        if (line.includes(':')) {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();
            formatted += `✓ ${key.trim()}: ${value}\n`;
        }
        // Si tiene pipes o tabs
        else if (line.includes('|') || line.includes('\t')) {
            const parts = line.split(/[|\t]/).map(p => p.trim()).filter(p => p);
            if (parts.length >= 2) {
                formatted += `✓ ${parts[0]}: ${parts.slice(1).join(' - ')}\n`;
            }
        }
        // Si tiene bullets
        else if (/^[-•]\s+/.test(line)) {
            formatted += `✓ ${line.replace(/^[-•]\s+/, '')}\n`;
        }
        // Línea normal
        else if (line.length > 3) {
            formatted += `• ${line}\n`;
        }
    });
    
    return formatted;
}

// Formatear como descripción de párrafos
function formatAsDescriptionNew(text) {
    const lines = text.split('\n').filter(l => l.trim());
    let formatted = '';
    
    // Agrupar líneas en párrafos
    let currentParagraph = '';
    
    lines.forEach(line => {
        line = line.trim();
        
        // Si es una línea corta (probable título o ítem)
        if (line.length < 50 && /^[A-ZÁ-Ú]/.test(line)) {
            if (currentParagraph) {
                formatted += currentParagraph + '\n\n';
                currentParagraph = '';
            }
            formatted += `🔹 ${line}\n`;
        }
        // Si es continuación de párrafo
        else if (line.length > 0) {
            currentParagraph += (currentParagraph ? ' ' : '') + line;
            
            // Si termina con punto, es fin de párrafo
            if (line.endsWith('.') || line.endsWith('!') || line.endsWith('?')) {
                formatted += currentParagraph + '\n\n';
                currentParagraph = '';
            }
        }
    });
    
    // Agregar último párrafo si existe
    if (currentParagraph) {
        formatted += currentParagraph + '\n';
    }
    
    return formatted.trim();
}

// Hacer la función global para que sea accesible desde el HTML
window.processImageTextNew = processImageTextNew;

// ============================================
// USERS MANAGEMENT SECTION
// ============================================

function loadUsers(searchTerm = '', statusFilter = 'all') {
    let users = window.authSystem.getUsers();
    
    // Filtrar por búsqueda
    if (searchTerm) {
        users = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Filtrar por estado
    if (statusFilter !== 'all') {
        users = users.filter(user => {
            if (statusFilter === 'active') return user.active !== false;
            if (statusFilter === 'inactive') return user.active === false;
            return true;
        });
    }
    
    // Actualizar estadísticas
    updateUserStats(users);
    
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = users.map(user => {
        const orderCount = user.orders ? user.orders.length : 0;
        const totalSpent = user.orders ? user.orders.reduce((sum, order) => sum + (order.total || 0), 0) : 0;
        const registrationDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';
        const isActive = user.active !== false;
        
        return `
            <tr>
                <td>#${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone || 'N/A'}</td>
                <td>${orderCount}</td>
                <td>$${totalSpent.toLocaleString()}</td>
                <td>${registrationDate}</td>
                <td>
                    <span class="status-badge ${isActive ? 'status-active' : 'status-inactive'}">
                        ${isActive ? 'Activo' : 'Inactivo'}
                    </span>
                </td>
                <td>
                    <button class="btn-view" onclick="viewUserDetails(${user.id})" title="Ver detalles">👁️</button>
                    <button class="btn-edit" onclick="toggleUserStatus(${user.id})" title="${isActive ? 'Desactivar' : 'Activar'}">
                        ${isActive ? '🚫' : '✅'}
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function updateUserStats(users) {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.active !== false).length;
    
    // Usuarios nuevos este mes
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newUsers = users.filter(u => {
        if (!u.createdAt) return false;
        return new Date(u.createdAt) >= startOfMonth;
    }).length;
    
    document.getElementById('totalUsersCount').textContent = totalUsers;
    document.getElementById('activeUsersCount').textContent = activeUsers;
    document.getElementById('newUsersCount').textContent = newUsers;
}

function viewUserDetails(userId) {
    const users = window.authSystem.getUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        alert('Usuario no encontrado');
        return;
    }
    
    const orderCount = user.orders ? user.orders.length : 0;
    const totalSpent = user.orders ? user.orders.reduce((sum, order) => sum + (order.total || 0), 0) : 0;
    const ordersHTML = user.orders && user.orders.length > 0 
        ? user.orders.map(order => 
            `- Pedido #${order.id}: $${order.total.toLocaleString()} (${order.status})`
          ).join('\n')
        : 'Sin pedidos';
    
    alert(`
👤 Detalles del Usuario

ID: ${user.id}
Nombre: ${user.name}
Email: ${user.email}
Teléfono: ${user.phone || 'N/A'}
Dirección: ${user.address || 'N/A'}
Estado: ${user.active !== false ? 'Activo' : 'Inactivo'}
Registro: ${user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}

📦 Pedidos: ${orderCount}
💰 Total Gastado: $${totalSpent.toLocaleString()}

Historial de Pedidos:
${ordersHTML}
    `);
}

function toggleUserStatus(userId) {
    const users = window.authSystem.getUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        alert('Usuario no encontrado');
        return;
    }
    
    const newStatus = !(user.active !== false);
    const action = newStatus ? 'activar' : 'desactivar';
    
    if (!confirm(`¿Estás seguro de que deseas ${action} a ${user.name}?`)) {
        return;
    }
    
    user.active = newStatus;
    window.authSystem.saveUsers(users);
    
    // Recargar tabla
    const searchTerm = document.getElementById('userSearch')?.value || '';
    const statusFilter = document.getElementById('userStatusFilter')?.value || 'all';
    loadUsers(searchTerm, statusFilter);
    
    showNotification(`Usuario ${newStatus ? 'activado' : 'desactivado'} exitosamente`, 'success');
}

// Event listeners para filtros de usuarios
document.addEventListener('DOMContentLoaded', () => {
    const userSearch = document.getElementById('userSearch');
    const userStatusFilter = document.getElementById('userStatusFilter');
    
    if (userSearch) {
        userSearch.addEventListener('input', (e) => {
            const statusFilter = userStatusFilter?.value || 'all';
            loadUsers(e.target.value, statusFilter);
        });
    }
    
    if (userStatusFilter) {
        userStatusFilter.addEventListener('change', (e) => {
            const searchTerm = userSearch?.value || '';
            loadUsers(searchTerm, e.target.value);
        });
    }
});

// Hacer la función global para que sea accesible desde el HTML
window.processImageTextNew = processImageTextNew;

// Agregar estilos de animación para el spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Debug: Verificar que dataSync esté disponible
console.log('🔧 Admin Panel JS cargado');
console.log('📊 DataSync disponible:', typeof window.dataSync !== 'undefined');
if (window.dataSync) {
    console.log('✅ DataSync está listo');
    window.dataSync.getProducts().then(products => {
        console.log('📦 Productos actuales:', products.length);
    });
} else {
    console.warn('⚠️ DataSync NO está disponible todavía');
}
