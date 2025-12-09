// Utilidades JavaScript para el sitio web

// Variables globales para filtrado
let currentCategory = 'todos';
let currentSortType = 'default';
let allProducts = [];

// Función de inicialización
function init() {
  registerVisitor();
  setupMobileMenu();
  setupSmoothScroll();
  setupScrollReveal();
  setupFormValidation();
  setupCartFunctionality();
  loadProductsFromSync();
}

// Inicializar rueda de categorías
function initializeCategoryWheel() {
  const wheel = document.getElementById('categoryWheel');
  if (!wheel) return;
  
  // Marcar "Todos" como activo por defecto
  const todosItem = document.querySelector('.wheel-item[data-category="todos"]');
  if (todosItem) {
    todosItem.classList.add('active');
  }
  
  // Agregar efecto de entrada animada
  const wheelItems = document.querySelectorAll('.wheel-item');
  wheelItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = item.style.transform + ' scale(0)';
    setTimeout(() => {
      item.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      item.style.opacity = '1';
      item.style.transform = item.getAttribute('data-angle') 
        ? `rotate(${item.getAttribute('data-angle')}deg) translate(150px) rotate(-${item.getAttribute('data-angle')}deg) scale(1)`
        : 'scale(1)';
    }, index * 50);
  });
  
  // Inicializar partículas
  initializeParticles();
}

// Sistema de partículas flotantes
function initializeParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;
  
  // Configurar tamaño del canvas
  function resizeCanvas() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Crear partículas
  const particles = [];
  const particleCount = 30;
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.color = `rgba(59, 130, 246, ${this.opacity})`;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Rebotar en los bordes
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Efecto de brillo
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
    }
  }
  
  // Crear partículas
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Animar partículas
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0;
    
    // Dibujar conexiones entre partículas cercanas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Actualizar y dibujar partículas
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Registrar visitante
let visitorId = null;
function registerVisitor() {
  if (window.dataSync) {
    const visitor = {
      ip: 'Visitante ' + Math.floor(Math.random() * 1000),
      location: 'México', // Puedes usar una API de geolocalización
      page: 'Inicio',
      userAgent: navigator.userAgent.includes('Mobile') ? 'Móvil' : 'Escritorio'
    };
    
    window.dataSync.addVisitor(visitor);
    visitorId = Date.now();
    
    // Actualizar cada 30 segundos que el visitante está activo
    setInterval(() => {
      if (visitorId) {
        window.dataSync.updateVisitor(visitorId);
      }
    }, 30000);
    
    // Remover visitante al cerrar página
    window.addEventListener('beforeunload', () => {
      if (visitorId) {
        window.dataSync.removeVisitor(visitorId);
      }
    });
  }
}

// Cargar productos desde el sistema de sync
async function loadProductsFromSync() {
  if (!window.dataSync) return;
  
  allProducts = (await window.dataSync.getProducts()).filter(p => p.available);
  renderProducts(allProducts);
  updateProductsCount(allProducts.length, currentCategory);
}

// Renderizar productos en el grid
function renderProducts(products) {
  const productsGrid = document.getElementById('productsGrid');
  const noProductsMsg = document.getElementById('noProductsMessage');
  
  if (!productsGrid) return;
  
  if (products.length === 0) {
    productsGrid.innerHTML = '';
    if (noProductsMsg) noProductsMsg.style.display = 'block';
    return;
  }
  
  if (noProductsMsg) noProductsMsg.style.display = 'none';
  
  productsGrid.innerHTML = products.map(product => {
    // Convertir precio usando el sistema de moneda
    const displayPrice = window.currencySystem ? 
      window.currencySystem.formatPrice(product.price) : 
      `$${product.price.toLocaleString()}`;
    
    const displayOriginalPrice = product.originalPrice && window.currencySystem ? 
      window.currencySystem.formatPrice(product.originalPrice) : 
      (product.originalPrice ? `$${product.originalPrice.toLocaleString()}` : null);
    
    const discountPercent = product.originalPrice && product.originalPrice > product.price ?
      Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    return `
    <div class="product-card compact-card" data-product-id="${product.id}" onclick="showProductDetail(${product.id})">
        <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="badges-container">
          ${discountPercent > 0 ? `<span class="discount-badge-card">${discountPercent}% OFF</span>` : ''}
          ${product.freeShipping ? '<span class="free-shipping-badge-card">🚚 ENVÍO GRATIS</span>' : (product.shippingCost ? `<span class="shipping-cost-badge-card">🚚 Envío $${(product.shippingCost).toLocaleString()}</span>` : '')}
        </div>
        ${product.stock <= 5 && product.stock > 0 ? '<span class="stock-badge low-stock">¡Pocas!</span>' : ''}
        ${product.stock === 0 ? '<span class="stock-badge out-of-stock">Agotado</span>' : ''}
        
        <!-- Título que aparece al hacer hover -->
        <div class="product-title-hover">
          <h3>${product.name}</h3>
        </div>
      </div>
      
      <!-- Solo mostrar precio -->
      <div class="product-price-only">
        ${product.originalPrice && product.originalPrice > product.price ? `
          <span class="original-price-card" data-price="${product.originalPrice}">${displayOriginalPrice}</span>
        ` : ''}
        <span class="price-tag ${product.originalPrice && product.originalPrice > product.price ? 'discounted' : ''}" data-price="${product.price}">${displayPrice}</span>
      </div>
    </div>
    `;
  }).join('');
}

// Filtrar por categoría
function filterByCategory(category) {
  currentCategory = category;
  
  // Actualizar botones activos
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (event && event.target) {
    event.target.classList.add('active');
  }
  
  // Aplicar filtros
  applyFilters();
}

// Filtrar por búsqueda
function filterProducts() {
  applyFilters();
}

// Ordenar productos
function sortProducts(sortType) {
  currentSortType = sortType || document.getElementById('sortProducts')?.value || 'default';
  applyFilters();
}

// Aplicar todos los filtros y ordenamiento
function applyFilters() {
  let filteredProducts = [...allProducts];
  
  // Filtro de categoría
  if (currentCategory !== 'todos') {
    filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
  }
  
  // Filtro de búsqueda
  const searchTerm = document.getElementById('searchProducts')?.value?.toLowerCase() || '';
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }
  
  // Ordenamiento
  switch (currentSortType) {
    case 'name-asc':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => (b.id || 0) - (a.id || 0));
      break;
    case 'popular':
      filteredProducts.sort((a, b) => (b.sold || 0) - (a.sold || 0));
      break;
    default:
      // default - sin ordenar
      break;
  }
  
  renderProducts(filteredProducts);
  updateProductsCount(filteredProducts.length, currentCategory);
}

// Actualizar contador de productos
function updateProductsCount(count, category) {
  const countText = document.getElementById('productsCountText');
  if (!countText) return;
  
  const categoryNames = {
    'todos': 'todos los productos',
    'ropa': 'ropa',
    'electronica': 'electrónica',
    'hogar': 'hogar',
    'deportes': 'deportes',
    'belleza': 'belleza',
    'libros': 'libros',
    'juguetes': 'juguetes',
    'alimentos': 'alimentos',
    'tecnologia': 'tecnología',
    'otros': 'otros'
  };
  
  const categoryName = categoryNames[category] || 'productos';
  countText.textContent = `${count} ${count === 1 ? 'producto' : 'productos'} ${category !== 'todos' ? 'en ' + categoryName : ''}`;
}

// Mostrar detalles del producto en modal
async function showProductDetail(productId) {
  const products = await window.dataSync.getProducts();
  const product = products.find(p => p.id === productId);
  
  if (!product) return;
  
  console.log('🔍 Mostrando detalle de producto:', product);
  console.log('📊 Especificaciones del producto:', product.specifications);
  
  const modalHTML = `
    <div id="productDetailModal" class="modal active" onclick="if(event.target === this) closeProductDetail()">
      <div class="modal-content product-detail-modal">
        <span class="close-modal" onclick="closeProductDetail()">&times;</span>
        
        <div class="product-detail-grid">
          <div class="product-detail-left">
            <div class="product-detail-image">
              <div id="mainProductMediaContainer">
                <img src="${product.image}" alt="${product.name}" id="mainProductImage">
              </div>
              ${product.stock <= 5 && product.stock > 0 ? '<span class="stock-badge low-stock">¡Pocas unidades!</span>' : ''}
              ${product.stock === 0 ? '<span class="stock-badge out-of-stock">Agotado</span>' : ''}
            </div>
            
            <!-- Galería de imágenes y videos -->
            ${(() => {
                const additionalImgs = product.additionalImages || (product.images && product.images.length > 1 ? product.images.slice(1) : []);
                return (additionalImgs.length > 0) || product.videoUrl ? `
              <div class="product-gallery-thumbnails">
                <div class="thumbnail-item active" onclick="changeMainMedia('${product.image}', 'image', this)">
                  <img src="${product.image}" alt="${product.name}">
                </div>
                ${additionalImgs.map((img, index) => `
                  <div class="thumbnail-item" onclick="changeMainMedia('${img}', 'image', this)">
                    <img src="${img}" alt="${product.name} ${index + 2}">
                  </div>
                `).join('')}
                ${product.videoUrl ? `
                  <div class="thumbnail-item thumbnail-video" onclick="changeMainMedia('${product.videoUrl}', 'video', this)" data-video-url="${product.videoUrl}">
                    <div class="video-play-icon">▶</div>
                    <img src="${product.image}" alt="Video ${product.name}">
                  </div>
                ` : ''}
              </div>`
            : '';
            })()}
            
            <!-- Sección de Reseñas -->
            <div class="product-reviews-section">
              <div class="reviews-header">
                <h3>⭐ Reseñas de Clientes</h3>
                <div class="reviews-summary">
                  <span class="reviews-rating">4.8</span>
                  <div class="reviews-stars">★★★★★</div>
                  <span class="reviews-count">(${Math.floor(Math.random() * 50) + 20} reseñas)</span>
                </div>
              </div>
              
              <div class="reviews-list" id="reviewsList">
                <!-- Reseñas existentes -->
                <div class="review-item">
                  <div class="review-header">
                    <div class="review-author">
                      <div class="author-avatar">JD</div>
                      <div class="author-info">
                        <span class="author-name">Juan Díaz</span>
                        <span class="review-date">Hace 2 días</span>
                      </div>
                    </div>
                    <div class="review-rating">★★★★★</div>
                  </div>
                  <p class="review-text">Excelente producto, llegó en perfectas condiciones y justo como lo esperaba. La calidad es increíble.</p>
                </div>
                
                <div class="review-item">
                  <div class="review-header">
                    <div class="review-author">
                      <div class="author-avatar">MG</div>
                      <div class="author-info">
                        <span class="author-name">María García</span>
                        <span class="review-date">Hace 1 semana</span>
                      </div>
                    </div>
                    <div class="review-rating">★★★★☆</div>
                  </div>
                  <p class="review-text">Muy buena relación calidad-precio. El envío fue rápido y el empaquetado cuidadoso.</p>
                </div>
                
                <div class="review-item">
                  <div class="review-header">
                    <div class="review-author">
                      <div class="author-avatar">CR</div>
                      <div class="author-info">
                        <span class="author-name">Carlos Rodríguez</span>
                        <span class="review-date">Hace 2 semanas</span>
                      </div>
                    </div>
                    <div class="review-rating">★★★★★</div>
                  </div>
                  <p class="review-text">100% recomendado. Superó mis expectativas, definitivamente volveré a comprar.</p>
                </div>
              </div>
              
              <!-- Formulario para agregar reseña -->
              <div class="add-review-section">
                <button class="btn-add-review" onclick="toggleReviewForm()">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  Escribir una Reseña
                </button>
                
                <div class="review-form" id="reviewForm" style="display: none;">
                  <h4>Tu Opinión Importa</h4>
                  
                  <div class="form-group">
                    <label>Calificación:</label>
                    <div class="star-rating" id="starRating">
                      <span class="star" data-rating="1">★</span>
                      <span class="star" data-rating="2">★</span>
                      <span class="star" data-rating="3">★</span>
                      <span class="star" data-rating="4">★</span>
                      <span class="star" data-rating="5">★</span>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="reviewName">Tu Nombre:</label>
                    <input type="text" id="reviewName" placeholder="Ej: Juan Pérez" required>
                  </div>
                  
                  <div class="form-group">
                    <label for="reviewText">Tu Reseña:</label>
                    <textarea id="reviewText" rows="4" placeholder="Cuéntanos tu experiencia con este producto..." required></textarea>
                  </div>
                  
                  <div class="form-actions">
                    <button class="btn-submit-review" onclick="submitReview(${product.id})">Publicar Reseña</button>
                    <button class="btn-cancel-review" onclick="toggleReviewForm()">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="product-detail-info">
            <div class="product-title-wrapper">
              <h2 class="product-detail-title ${product.name.length > 50 ? 'truncated' : ''}" id="productTitle">
                ${product.name}
              </h2>
              ${product.name.length > 50 ? `
                <button class="title-expand-btn" onclick="toggleProductTitle()">
                  <span class="expand-text">...ver más</span>
                  <span class="collapse-text" style="display: none;">ver menos</span>
                </button>
              ` : ''}
            </div>
            
            <div class="product-rating">
              <span class="stars">★★★★★</span>
              <span class="rating-text">(${Math.floor(Math.random() * 50) + 20} reseñas)</span>
            </div>
            
            <div class="product-price-section">
              ${product.originalPrice && product.originalPrice > product.price ? `
                <div class="price-with-discount">
                  <div class="price-group">
                    <span class="original-price" data-price="${product.originalPrice}">${window.currencySystem ? window.currencySystem.formatPrice(product.originalPrice) : `$${product.originalPrice.toLocaleString()}`}</span>
                    <span class="discount-badge">${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</span>
                    ${product.freeShipping ? '<span class="free-shipping-badge">🚚 ENVÍO GRATIS</span>' : ''}
                  </div>
                  <span class="product-detail-price discounted" data-price="${product.price}">${window.currencySystem ? window.currencySystem.formatPrice(product.price) : `$${product.price.toLocaleString()}`}</span>
                  <span class="savings-text">¡Ahorras ${window.currencySystem ? window.currencySystem.formatPrice(product.originalPrice - product.price) : `$${(product.originalPrice - product.price).toLocaleString()}`}!</span>
                </div>
              ` : `
                <span class="product-detail-price" data-price="${product.price}">${window.currencySystem ? window.currencySystem.formatPrice(product.price) : `$${product.price.toLocaleString()}`}</span>
              `}
              ${product.stock > 0 ? 
                `<span class="stock-status available">✓ En Stock (${product.stock} disponibles)</span>` :
                `<span class="stock-status unavailable">✗ Sin Stock</span>`
              }
            </div>
            
            ${product.variants && product.variants.colors && product.variants.colors.length > 0 ? `
              <div class="product-variants-section">
                <div class="variant-group">
                  <label class="variant-label">Color: <span id="selectedColorName">${product.variants.colors[0].name}</span></label>
                  <div class="color-options">
                    ${product.variants.colors.map((color, index) => `
                      <button class="color-option ${index === 0 ? 'active' : ''}" 
                              style="background-color: ${color.hex};"
                              onclick="selectColor('${color.name}', '${color.hex}', this)"
                              title="${color.name}">
                        ${color.isHot ? '<span class="hot-badge">HOT</span>' : ''}
                      </button>
                    `).join('')}
                  </div>
                </div>
              </div>
            ` : ''}
            
            ${product.variants && product.variants.sizes && product.variants.sizes.length > 0 ? `
              <div class="product-variants-section">
                <div class="variant-group">
                  <label class="variant-label">Talla: <span id="selectedSizeName">${product.variants.sizes[0]}</span></label>
                  <div class="size-options">
                    ${product.variants.sizes.map((size, index) => `
                      <button class="size-option ${index === 0 ? 'active' : ''}" 
                              onclick="selectSize('${size}', this)">
                        ${size}
                      </button>
                    `).join('')}
                  </div>
                </div>
              </div>
            ` : ''}
            
            ${product.stock > 0 ? `
              <div class="product-quantity-selector">
                <label for="productQuantity">Cantidad:</label>
                <div class="quantity-controls">
                  <button class="qty-btn" onclick="changeQuantity(-1)">-</button>
                  <input type="number" id="productQuantity" value="1" min="1" max="${product.stock}" readonly>
                  <button class="qty-btn" onclick="changeQuantity(1)">+</button>
                </div>
              </div>
              
              <div class="product-actions">
                <button class="btn-primary btn-full" onclick="addToCartFromDetail(${product.id}, '${product.name}', ${product.price})">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Agregar al Carrito
                  <span style="margin-left: auto; font-weight: 800;">$${product.price.toLocaleString()}</span>
                </button>
                <button class="btn-secondary btn-full" onclick="buyNowFromDetail(${product.id}, '${product.name}', ${product.price})">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>
                  Comprar Ahora
                </button>
              </div>
            ` : `
              <div class="product-actions">
                <button class="btn-primary btn-full" disabled>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                  Sin Stock Disponible
                </button>
              </div>
            `}
            
            <div class="product-trust-badges">
              <div class="trust-badge-item">
                <span>🔒</span>
                <span>Pago Seguro</span>
              </div>
              <div class="trust-badge-item">
                <span>🚚</span>
                <span>Envío Rápido</span>
              </div>
              <div class="trust-badge-item">
                <span>↩️</span>
                <span>Devolución Fácil</span>
              </div>
            </div>
            
            <div class="product-description-full">
              <h3>Descripción del Producto</h3>
              <p>${product.description}</p>
            </div>
            
            <div class="product-features">
              <h3>Características</h3>
              <ul>
                <li>✓ Calidad premium garantizada</li>
                <li>✓ Envío gratis en compras superiores a $500</li>
                <li>✓ Garantía de satisfacción 30 días</li>
                <li>✓ Soporte al cliente 24/7</li>
              </ul>
            </div>
            
            <!-- Tabla de Especificaciones Técnicas -->
            ${product.specifications && product.specifications.length > 0 ? `
              <div class="product-specifications-section">
                <h3>📋 Especificaciones Técnicas</h3>
                <table class="specifications-table">
                  <thead>
                    <tr>
                      <th>Característica</th>
                      <th>Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${product.specifications.map(spec => `
                      <tr>
                        <td class="spec-label">${spec.label}</td>
                        <td class="spec-value">${spec.value}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
  const modal = document.getElementById('productDetailModal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
  }
}

function toggleProductTitle() {
  const titleElement = document.getElementById('productTitle');
  const expandBtn = document.querySelector('.title-expand-btn');
  const expandText = expandBtn.querySelector('.expand-text');
  const collapseText = expandBtn.querySelector('.collapse-text');
  
  if (titleElement.classList.contains('truncated')) {
    titleElement.classList.remove('truncated');
    expandText.style.display = 'none';
    collapseText.style.display = 'inline';
  } else {
    titleElement.classList.add('truncated');
    expandText.style.display = 'inline';
    collapseText.style.display = 'none';
  }
}

function changeMainMedia(mediaSrc, mediaType, thumbnailElement) {
  const container = document.getElementById('mainProductMediaContainer');
  if (!container) return;
  
  // Fade out
  container.style.opacity = '0';
  
  setTimeout(() => {
    if (mediaType === 'video') {
      // Determinar el tipo de video
      if (mediaSrc.startsWith('data:video')) {
        // Video subido
        container.innerHTML = `
          <video controls autoplay style="width: 100%; height: auto; border-radius: 12px; background: #000;">
            <source src="${mediaSrc}">
            Tu navegador no soporta la reproducción de video.
          </video>
        `;
      } else if (mediaSrc.includes('youtube.com') || mediaSrc.includes('youtu.be')) {
        // YouTube
        const videoId = mediaSrc.includes('youtube.com') 
          ? mediaSrc.split('v=')[1]?.split('&')[0] 
          : mediaSrc.split('youtu.be/')[1]?.split('?')[0];
        container.innerHTML = `
          <div class="video-embed" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px;" 
              src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        `;
      } else if (mediaSrc.includes('vimeo.com')) {
        // Vimeo
        const videoId = mediaSrc.split('vimeo.com/')[1]?.split('/')[0]?.split('?')[0];
        container.innerHTML = `
          <div class="video-embed" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px;" 
              src="https://player.vimeo.com/video/${videoId}?autoplay=1" 
              frameborder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        `;
      }
    } else {
      // Imagen
      container.innerHTML = `<img src="${mediaSrc}" alt="Producto" id="mainProductImage">`;
    }
    
    // Fade in
    container.style.opacity = '1';
  }, 200);
  
  // Actualizar clase active en las miniaturas
  document.querySelectorAll('.thumbnail-item').forEach(thumb => {
    thumb.classList.remove('active');
  });
  
  if (thumbnailElement) {
    thumbnailElement.classList.add('active');
  }
}

function changeQuantity(delta) {
  const input = document.getElementById('productQuantity');
  if (!input) return;
  
  const currentValue = parseInt(input.value) || 1;
  const newValue = currentValue + delta;
  const max = parseInt(input.max);
  
  if (newValue >= 1 && newValue <= max) {
    input.value = newValue;
  }
}

// Función para seleccionar color
function selectColor(colorName, colorHex, element) {
  // Remover active de todos los colores
  document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
  
  // Agregar active al seleccionado
  element.classList.add('active');
  
  // Actualizar el nombre del color seleccionado
  const colorNameSpan = document.getElementById('selectedColorName');
  if (colorNameSpan) {
    colorNameSpan.textContent = colorName;
  }
}

// Función para seleccionar talla
function selectSize(size, element) {
  // Remover active de todas las tallas
  document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
  
  // Agregar active al seleccionado
  element.classList.add('active');
  
  // Actualizar el nombre de la talla seleccionada
  const sizeNameSpan = document.getElementById('selectedSizeName');
  if (sizeNameSpan) {
    sizeNameSpan.textContent = size;
  }
}

function addToCartFromDetail(productId, productName, productPrice) {
  const quantity = parseInt(document.getElementById('productQuantity')?.value) || 1;
  closeProductDetail();
  
  setTimeout(() => {
    addToCart(productId, productName, productPrice);
  }, 300);
}

function buyNowFromDetail(productId, productName, productPrice) {
  closeProductDetail();
  
  setTimeout(() => {
    addToCart(productId, productName, productPrice);
  }, 300);
}

// ============================================
// SISTEMA DE RESEÑAS
// ============================================

let selectedRating = 0;

function toggleReviewForm() {
  const form = document.getElementById('reviewForm');
  const isVisible = form.style.display !== 'none';
  form.style.display = isVisible ? 'none' : 'block';
  
  if (!isVisible) {
    // Inicializar sistema de calificación con estrellas
    initStarRating();
  }
}

function initStarRating() {
  const stars = document.querySelectorAll('.star-rating .star');
  
  stars.forEach(star => {
    star.addEventListener('click', function() {
      selectedRating = parseInt(this.dataset.rating);
      updateStarDisplay(selectedRating);
    });
    
    star.addEventListener('mouseenter', function() {
      const rating = parseInt(this.dataset.rating);
      updateStarDisplay(rating);
    });
  });
  
  const starRating = document.getElementById('starRating');
  starRating.addEventListener('mouseleave', function() {
    updateStarDisplay(selectedRating);
  });
}

function updateStarDisplay(rating) {
  const stars = document.querySelectorAll('.star-rating .star');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function submitReview(productId) {
  const name = document.getElementById('reviewName').value.trim();
  const text = document.getElementById('reviewText').value.trim();
  
  if (!name || !text) {
    showNotification('⚠️ Por favor completa todos los campos', 'error');
    return;
  }
  
  if (selectedRating === 0) {
    showNotification('⚠️ Por favor selecciona una calificación', 'error');
    return;
  }
  
  // Crear la reseña
  const review = {
    id: Date.now(),
    productId: productId,
    name: name,
    rating: selectedRating,
    text: text,
    date: new Date().toISOString()
  };
  
  // Guardar en localStorage
  const reviews = JSON.parse(localStorage.getItem('product_reviews') || '[]');
  reviews.unshift(review);
  localStorage.setItem('product_reviews', JSON.stringify(reviews));
  
  // Agregar a la lista visual
  addReviewToList(review);
  
  // Limpiar formulario
  document.getElementById('reviewName').value = '';
  document.getElementById('reviewText').value = '';
  selectedRating = 0;
  updateStarDisplay(0);
  toggleReviewForm();
  
  showNotification('✅ ¡Gracias por tu reseña!', 'success');
}

function addReviewToList(review) {
  const reviewsList = document.getElementById('reviewsList');
  const initials = review.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  
  const reviewHTML = `
    <div class="review-item new-review">
      <div class="review-header">
        <div class="review-author">
          <div class="author-avatar">${initials}</div>
          <div class="author-info">
            <span class="author-name">${review.name}</span>
            <span class="review-date">Ahora</span>
          </div>
        </div>
        <div class="review-rating">${stars}</div>
      </div>
      <p class="review-text">${review.text}</p>
    </div>
  `;
  
  reviewsList.insertAdjacentHTML('afterbegin', reviewHTML);
  
  // Animación de entrada
  setTimeout(() => {
    reviewsList.querySelector('.new-review').classList.remove('new-review');
  }, 100);
}

// Menú móvil
function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
}

// Scroll suave
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Animaciones al hacer scroll
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1
  });
  
  revealElements.forEach(el => observer.observe(el));
}

// Validación de formulario
function setupFormValidation() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Validación básica
      if (!data.name || !data.email || !data.message) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
      }
      
      if (!isValidEmail(data.email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
      }
      
      // Aquí puedes enviar el formulario a tu backend
      console.log('Formulario enviado:', data);
      showNotification('Mensaje enviado con éxito', 'success');
      form.reset();
    });
  }
}

// Validar email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#4a9eff' : type === 'error' ? '#ff4a4a' : '#ffffff'};
    color: ${type === 'info' ? '#000000' : '#ffffff'};
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Función global para agregar al carrito (llamada desde los botones)
async function addToCart(productId, productName, productPrice) {
  const products = await window.dataSync.getProducts();
  const product = products.find(p => p.id === productId);
  
  if (!product || product.stock === 0) {
    showNotification('Producto sin stock disponible', 'error');
    return;
  }
  
  // Agregar directamente al carrito (cantidad 1)
  // Pasar el producto completo para que data-sync lo maneje correctamente
  window.dataSync.addToCart(product, 1);
  showNotification(`✅ ${product.name} agregado al carrito`, 'success');
  
  // Actualizar contador del carrito
  if (typeof updateCartCount === 'function') {
    updateCartCount();
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Código copiado al portapapeles', 'success');
  }).catch(() => {
    showNotification('Error al copiar código', 'error');
  });
}

// Verificar código de garantía
function checkWarrantyCode() {
  const input = document.getElementById('warrantyCodeInput');
  const resultDiv = document.getElementById('warrantyResult');
  const code = input.value.trim().toUpperCase();
  
  if (!code) {
    showNotification('Por favor ingresa un código', 'error');
    return;
  }
  
  // Buscar producto por código
  const productData = window.dataSync.findProductByCode(code);
  
  if (!productData) {
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
      <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 24px; text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 12px;">❌</div>
        <h4 style="color: #EF4444; margin: 0 0 8px 0;">Código no encontrado</h4>
        <p style="color: #9b9b9b; margin: 0;">El código <strong>${code}</strong> no existe en nuestra base de datos.</p>
      </div>
    `;
    return;
  }
  
  // Calcular tiempo restante de garantía
  const now = Date.now();
  const warranty = productData.warrantyExpiry;
  const isWarrantyValid = now < warranty;
  const daysRemaining = Math.ceil((warranty - now) / (1000 * 60 * 60 * 24));
  
  // Obtener garantías activas para este código
  const warranties = window.dataSync.getWarrantiesByCode(code);
  
  // Construir HTML del resultado
  let html = `
    <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 12px; padding: 28px;">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
        <div style="font-size: 3rem;">✅</div>
        <div>
          <h4 style="color: #22C55E; margin: 0 0 4px 0;">Producto Registrado</h4>
          <p style="color: #9b9b9b; margin: 0; font-size: 0.9rem;">Código: <strong>${code}</strong></p>
        </div>
      </div>
      
      <div style="background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div>
            <p style="color: #6b7280; margin: 0 0 4px 0; font-size: 0.85rem;">Producto</p>
            <p style="color: white; margin: 0; font-weight: 500;">${productData.productName}</p>
          </div>
          <div>
            <p style="color: #6b7280; margin: 0 0 4px 0; font-size: 0.85rem;">Fecha de Compra</p>
            <p style="color: white; margin: 0; font-weight: 500;">${new Date(productData.purchaseDate).toLocaleDateString('es-ES')}</p>
          </div>
          <div>
            <p style="color: #6b7280; margin: 0 0 4px 0; font-size: 0.85rem;">Cliente</p>
            <p style="color: white; margin: 0; font-weight: 500;">${productData.customerName}</p>
          </div>
          <div>
            <p style="color: #6b7280; margin: 0 0 4px 0; font-size: 0.85rem;">Estado</p>
            <p style="color: ${isWarrantyValid ? '#22C55E' : '#EF4444'}; margin: 0; font-weight: 500;">${productData.status === 'activo' ? 'Activo' : productData.status}</p>
          </div>
        </div>
      </div>
      
      <div style="background: ${isWarrantyValid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; border: 1px solid ${isWarrantyValid ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 2rem;">${isWarrantyValid ? '🛡️' : '⏰'}</span>
          <div>
            <p style="color: ${isWarrantyValid ? '#22C55E' : '#EF4444'}; margin: 0; font-weight: 600;">
              ${isWarrantyValid ? `Garantía Vigente - ${daysRemaining} días restantes` : 'Garantía Vencida'}
            </p>
            <p style="color: #9b9b9b; margin: 4px 0 0 0; font-size: 0.85rem;">
              Vence: ${new Date(warranty).toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
  `;
  
  // Mostrar garantías solicitadas
  if (warranties.length > 0) {
    html += `
      <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <h5 style="color: #3B82F6; margin: 0 0 12px 0;">📋 Garantías Solicitadas</h5>
    `;
    
    warranties.forEach(w => {
      const statusColors = {
        'pendiente': '#F59E0B',
        'en_proceso': '#3B82F6',
        'aprobada': '#22C55E',
        'rechazada': '#EF4444',
        'completada': '#6B7280'
      };
      const statusLabels = {
        'pendiente': 'Pendiente',
        'en_proceso': 'En Proceso',
        'aprobada': 'Aprobada',
        'rechazada': 'Rechazada',
        'completada': 'Completada'
      };
      
      html += `
        <div style="background: rgba(0, 0, 0, 0.3); border-radius: 6px; padding: 12px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="color: ${statusColors[w.status]}; font-weight: 600; font-size: 0.9rem;">${statusLabels[w.status]}</span>
            <span style="color: #6b7280; font-size: 0.85rem;">${new Date(w.requestDate).toLocaleDateString('es-ES')}</span>
          </div>
          <p style="color: #d1d5db; margin: 0; font-size: 0.9rem;">${w.issue}</p>
          ${w.adminResponse ? `<p style="color: #9b9b9b; margin: 8px 0 0 0; font-size: 0.85rem; font-style: italic;">Respuesta: ${w.adminResponse}</p>` : ''}
        </div>
      `;
    });
    
    html += `</div>`;
  }
  
  // Botón para solicitar garantía (solo si está vigente y no tiene una garantía pendiente/en proceso)
  const hasPendingWarranty = warranties.some(w => w.status === 'pendiente' || w.status === 'en_proceso');
  
  if (isWarrantyValid && !hasPendingWarranty) {
    html += `
      <button onclick="openWarrantyRequestModal('${code}')" style="width: 100%; padding: 14px; background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
        🔧 Solicitar Garantía
      </button>
    `;
  } else if (hasPendingWarranty) {
    html += `
      <p style="text-align: center; color: #F59E0B; margin: 0; font-size: 0.9rem;">
        ⏳ Ya tienes una solicitud de garantía en proceso para este producto
      </p>
    `;
  }
  
  html += `</div>`;
  
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = html;
  
  // Scroll suave al resultado
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Abrir modal de solicitud de garantía
function openWarrantyRequestModal(code) {
  const modal = document.createElement('div');
  modal.id = 'warrantyRequestModal';
  modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.85); display: flex; align-items: center; justify-content: center; z-index: 10000; backdrop-filter: blur(8px);';
  
  modal.innerHTML = `
    <div style="background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 20px; padding: 40px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h3 style="color: white; margin: 0;">🔧 Solicitar Garantía</h3>
        <button onclick="closeWarrantyRequestModal()" style="background: none; border: none; color: #9b9b9b; font-size: 1.5rem; cursor: pointer; padding: 0; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">&times;</button>
      </div>
      
      <form id="warrantyRequestForm" onsubmit="submitWarrantyRequest(event, '${code}')">
        <div style="margin-bottom: 20px;">
          <label style="display: block; color: #d1d5db; margin-bottom: 8px; font-weight: 500;">¿Cuál es el problema?</label>
          <textarea id="warrantyIssue" required style="width: 100%; min-height: 120px; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; font-family: inherit; font-size: 1rem; resize: vertical;" placeholder="Describe el problema con el producto..."></textarea>
        </div>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; color: #d1d5db; margin-bottom: 8px; font-weight: 500;">Tu Email</label>
          <input type="email" id="warrantyEmail" required style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; font-size: 1rem;" placeholder="tu@email.com">
        </div>
        
        <div style="margin-bottom: 24px;">
          <label style="display: block; color: #d1d5db; margin-bottom: 8px; font-weight: 500;">Teléfono</label>
          <input type="tel" id="warrantyPhone" required style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; font-size: 1rem;" placeholder="+57 321 479 8399">
        </div>
        
        <div style="display: flex; gap: 12px;">
          <button type="button" onclick="closeWarrantyRequestModal()" style="flex: 1; padding: 14px; background: rgba(255, 255, 255, 0.05); color: white; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; font-size: 1rem; cursor: pointer;">Cancelar</button>
          <button type="submit" style="flex: 1; padding: 14px; background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Enviar Solicitud</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
}

function closeWarrantyRequestModal() {
  const modal = document.getElementById('warrantyRequestModal');
  if (modal) {
    modal.remove();
  }
}

function submitWarrantyRequest(event, code) {
  event.preventDefault();
  
  const issue = document.getElementById('warrantyIssue').value;
  const email = document.getElementById('warrantyEmail').value;
  const phone = document.getElementById('warrantyPhone').value;
  
  const warrantyData = {
    productCode: code,
    issue: issue,
    customerEmail: email,
    customerPhone: phone
  };
  
  const result = window.dataSync.requestWarranty(warrantyData);
  
  if (result.success) {
    closeWarrantyRequestModal();
    showNotification('Solicitud de garantía enviada correctamente. Te contactaremos pronto.', 'success');
    
    // Actualizar la vista del código para mostrar la nueva garantía
    checkWarrantyCode();
  } else {
    showNotification(result.message || 'Error al enviar la solicitud', 'error');
  }
}

// Funcionalidad del carrito (simulada) - Mantener para compatibilidad
function setupCartFunctionality() {
  // Ya no es necesario, pero mantener para no romper código existente
  updateCartCount();
}

// Actualizar contador del carrito
function updateCartCount() {
  const orders = window.dataSync ? window.dataSync.getOrders() : [];
  const cartCount = document.querySelector('.cart-count');
  
  if (cartCount) {
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    cartCount.textContent = pendingOrders;
    cartCount.style.display = pendingOrders > 0 ? 'block' : 'none';
  }
}

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Lazy loading de imágenes
function setupLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback para navegadores antiguos
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }
}

// Detección de modo oscuro del sistema
function detectDarkMode() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
  }
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });
}

// Exportar funciones
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    showNotification,
    debounce,
    throttle,
    isValidEmail
  };
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
