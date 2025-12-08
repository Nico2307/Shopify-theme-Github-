// Admin Panel JavaScript
// Sistema de autenticación, gestión de productos, pedidos, análisis y más

// ============================================
// AUTHENTICATION
// ============================================

const loginForm = document.getElementById('loginForm');
const loginScreen = document.getElementById('loginScreen');
const adminDashboard = document.getElementById('adminDashboard');
const logoutBtn = document.getElementById('logoutBtn');

// Credenciales demo
const ADMIN_CREDENTIALS = {
    user: 'admin',
    pass: 'admin123'
};

// Check si ya está logueado
if (localStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;
    
    if (user === ADMIN_CREDENTIALS.user && pass === ADMIN_CREDENTIALS.pass) {
        localStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
        showNotification('¡Bienvenido al panel de administración!', 'success');
    } else {
        showNotification('Usuario o contraseña incorrectos', 'error');
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    location.reload();
});

function showDashboard() {
    loginScreen.style.display = 'none';
    adminDashboard.style.display = 'flex';
    initDashboard();
}

// ============================================
// NAVIGATION
// ============================================

const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.admin-section');
const sectionTitle = document.getElementById('sectionTitle');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Show corresponding section
        const sectionId = item.dataset.section;
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
        
        // Load section data
        if (sectionId === 'products') loadProducts();
        if (sectionId === 'orders') loadOrders();
        if (sectionId === 'analytics') loadAnalytics();
        if (sectionId === 'visitors') loadVisitors();
    });
});

// ============================================
// DASHBOARD STATS & CHARTS
// ============================================

function initDashboard() {
    updateDashboardStats();
    createSalesChart();
    createProductsChart();
    loadRecentOrders();
    startRealTimeUpdates();
}

function updateDashboardStats() {
    // Simular datos en tiempo real
    const stats = getSimulatedStats();
    
    document.getElementById('salesToday').textContent = `$${stats.salesToday.toLocaleString()}`;
    document.getElementById('pendingOrders').textContent = stats.pendingOrders;
    document.getElementById('onlineVisitors').textContent = stats.onlineVisitors;
    document.getElementById('totalVisits').textContent = stats.totalVisits.toLocaleString();
}

function getSimulatedStats() {
    return {
        salesToday: Math.floor(Math.random() * 10000) + 5000,
        pendingOrders: Math.floor(Math.random() * 20) + 5,
        onlineVisitors: Math.floor(Math.random() * 50) + 10,
        totalVisits: Math.floor(Math.random() * 5000) + 15000
    };
}

// Sales Chart
function createSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    // Destruir gráfica existente si existe
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    ctx.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Ventas 2025',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
                borderColor: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#ffffff' }
                }
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

// Products Chart
function createProductsChart() {
    const ctx = document.getElementById('productsChart');
    if (!ctx) return;
    
    // Destruir gráfica existente si existe
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4', 'Producto 5'],
            datasets: [{
                label: 'Ventas',
                data: [250, 180, 320, 150, 280],
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: '#ffffff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#ffffff' }
                }
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

// ============================================
// PRODUCTS MANAGEMENT
// ============================================

let products = JSON.parse(localStorage.getItem('adminProducts')) || [
    {
        id: 1,
        name: 'Producto Ejemplo 1',
        description: 'Descripción del producto',
        price: 99.99,
        stock: 50,
        image: 'https://via.placeholder.com/300'
    },
    {
        id: 2,
        name: 'Producto Ejemplo 2',
        description: 'Descripción del producto',
        price: 149.99,
        stock: 30,
        image: 'https://via.placeholder.com/300'
    }
];

const addProductBtn = document.getElementById('addProductBtn');
const addProductModal = document.getElementById('addProductModal');
const addProductForm = document.getElementById('addProductForm');

addProductBtn.addEventListener('click', () => {
    addProductModal.classList.add('active');
});

document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
        addProductModal.classList.remove('active');
    });
});

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newProduct = {
        id: Date.now(),
        name: formData.get('productName'),
        description: formData.get('productDescription'),
        price: parseFloat(formData.get('productPrice')),
        stock: parseInt(formData.get('productStock')),
        image: formData.get('productImage') || 'https://via.placeholder.com/300'
    };
    
    products.push(newProduct);
    localStorage.setItem('adminProducts', JSON.stringify(products));
    
    loadProducts();
    addProductModal.classList.remove('active');
    addProductForm.reset();
    showNotification('Producto agregado exitosamente', 'success');
});

function loadProducts() {
    const productsList = document.getElementById('productsList');
    if (!productsList) return;
    
    productsList.innerHTML = products.map(product => `
        <div class="admin-product-card">
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p><strong>Precio:</strong> $${product.price}</p>
            <p><strong>Stock:</strong> ${product.stock} unidades</p>
            <div class="product-actions">
                <button class="btn-small btn-edit" onclick="editProduct(${product.id})">Editar</button>
                <button class="btn-small btn-delete" onclick="deleteProduct(${product.id})">Eliminar</button>
            </div>
        </div>
    `).join('');
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    // Aquí puedes implementar un modal de edición similar al de agregar
    showNotification('Función de edición - En desarrollo', 'info');
}

function deleteProduct(id) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('adminProducts', JSON.stringify(products));
        loadProducts();
        showNotification('Producto eliminado', 'success');
    }
}

// ============================================
// ORDERS MANAGEMENT
// ============================================

let orders = JSON.parse(localStorage.getItem('adminOrders')) || generateSampleOrders();

function generateSampleOrders() {
    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
    const customers = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Torres', 'Luis Martínez'];
    const sampleOrders = [];
    
    for (let i = 1; i <= 15; i++) {
        sampleOrders.push({
            id: 1000 + i,
            customer: customers[Math.floor(Math.random() * customers.length)],
            email: `cliente${i}@email.com`,
            product: `Producto ${Math.floor(Math.random() * 5) + 1}`,
            total: (Math.random() * 200 + 50).toFixed(2),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
        });
    }
    
    localStorage.setItem('adminOrders', JSON.stringify(sampleOrders));
    return sampleOrders;
}

function loadOrders(filter = 'all') {
    const ordersTable = document.getElementById('ordersTable');
    if (!ordersTable) return;
    
    let filteredOrders = orders;
    if (filter !== 'all') {
        filteredOrders = orders.filter(o => o.status === filter);
    }
    
    ordersTable.innerHTML = filteredOrders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.email}</td>
            <td>${order.product}</td>
            <td>$${order.total}</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>${order.date}</td>
            <td>
                <button class="btn-small btn-edit" onclick="viewOrder(${order.id})">Ver</button>
            </td>
        </tr>
    `).join('');
}

function loadRecentOrders() {
    const recentOrdersTable = document.getElementById('recentOrdersTable');
    if (!recentOrdersTable) return;
    
    const recent = orders.slice(0, 5);
    recentOrdersTable.innerHTML = recent.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>$${order.total}</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>${order.date}</td>
        </tr>
    `).join('');
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
    const order = orders.find(o => o.id === id);
    if (order) {
        showNotification(`Detalles del pedido #${id}`, 'info');
    }
}

// Order filter
const orderStatusFilter = document.getElementById('orderStatusFilter');
if (orderStatusFilter) {
    orderStatusFilter.addEventListener('change', (e) => {
        loadOrders(e.target.value);
    });
}

// ============================================
// ANALYTICS
// ============================================

function loadAnalytics() {
    createTrafficChart();
    createSourceChart();
    createDeviceChart();
}

function createTrafficChart() {
    const ctx = document.getElementById('trafficChart');
    if (!ctx) return;
    
    // Destruir gráfica existente si existe
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    const days = Array.from({length: 30}, (_, i) => `Día ${i + 1}`);
    const data = Array.from({length: 30}, () => Math.floor(Math.random() * 500) + 200);
    
    ctx.chart = new Chart(ctx, {
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
    
    // Destruir gráfica existente si existe
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    ctx.chart = new Chart(ctx, {
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
    
    // Destruir gráfica existente si existe
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    ctx.chart = new Chart(ctx, {
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
// VISITORS TRACKING
// ============================================

function loadVisitors() {
    updateVisitorStats();
    loadActivityLog();
}

function updateVisitorStats() {
    document.getElementById('currentOnline').textContent = Math.floor(Math.random() * 50) + 10;
    document.getElementById('visitorsToday').textContent = Math.floor(Math.random() * 500) + 200;
    document.getElementById('visitorsWeek').textContent = Math.floor(Math.random() * 3000) + 1500;
    document.getElementById('visitorsMonth').textContent = Math.floor(Math.random() * 15000) + 8000;
}

function loadActivityLog() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const activities = [
        '👤 Usuario nuevo visitó la página principal',
        '🛒 Se agregó un producto al carrito',
        '💳 Nueva compra realizada - $149.99',
        '📄 Usuario visitó página de productos',
        '❤️ Producto agregado a favoritos',
        '🔍 Búsqueda realizada: "zapatos deportivos"',
        '📧 Suscripción al newsletter',
        '👁️ Producto visto: Producto Ejemplo 1'
    ];
    
    activityList.innerHTML = activities.map((activity, i) => `
        <div class="activity-item">
            <strong>Hace ${i + 1} minuto${i > 0 ? 's' : ''}</strong> - ${activity}
        </div>
    `).join('');
}

// ============================================
// REAL TIME UPDATES
// ============================================

function startRealTimeUpdates() {
    // Actualizar stats cada 5 segundos
    setInterval(() => {
        if (document.getElementById('dashboardSection').classList.contains('active')) {
            updateDashboardStats();
        }
        if (document.getElementById('visitorsSection').classList.contains('active')) {
            updateVisitorStats();
        }
    }, 5000);
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// SETTINGS
// ============================================

const siteSettingsForm = document.getElementById('siteSettingsForm');
if (siteSettingsForm) {
    siteSettingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Configuración guardada exitosamente', 'success');
    });
}

// Animaciones CSS necesarias
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .spinner {
        border: 3px solid rgba(59, 130, 246, 0.1);
        border-top: 3px solid #3B82F6;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .image-upload-container {
        background: rgba(59, 130, 246, 0.05);
        border: 2px dashed rgba(59, 130, 246, 0.3);
        border-radius: 12px;
        padding: 20px;
        text-align: center;
    }
    
    .formatted-description {
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        border-radius: 8px;
        padding: 16px;
        margin-top: 12px;
    }
`;
document.head.appendChild(style);

// ============================================
// OCR Y PROCESAMIENTO DE IMÁGENES
// ============================================

// Preview de imagen cuando se selecciona
document.getElementById('productImageUpload')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('imagePreview');
            const container = document.getElementById('imagePreviewContainer');
            preview.src = event.target.result;
            container.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Procesar imagen con OCR
async function processImageText() {
    const imagePreview = document.getElementById('imagePreview');
    const progressDiv = document.getElementById('ocrProgress');
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
            const formattedText = formatExtractedText(text);
            descriptionTextarea.value = formattedText;
            
            // Mostrar notificación de éxito
            showNotification('✅ Texto extraído y formateado correctamente', 'success');
            
            // Resaltar el textarea
            descriptionTextarea.classList.add('formatted-description');
            setTimeout(() => {
                descriptionTextarea.classList.remove('formatted-description');
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
function formatExtractedText(rawText) {
    // Limpiar texto
    let text = rawText.trim();
    
    // Eliminar líneas vacías múltiples
    text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    // Detectar si hay estructura de tabla (buscar patrones)
    const hasTableStructure = detectTableStructure(text);
    
    if (hasTableStructure) {
        return formatAsTable(text);
    } else {
        return formatAsDescription(text);
    }
}

// Detectar si el texto tiene estructura de tabla
function detectTableStructure(text) {
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
function formatAsTable(text) {
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
function formatAsDescription(text) {
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
window.processImageText = processImageText;
