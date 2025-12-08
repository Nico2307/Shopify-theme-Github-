// ============================================
// SISTEMA DE CARRITO DE COMPRAS
// ============================================

// Abrir/Cerrar carrito
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderCart();
    }
}

// Renderizar items del carrito
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    const cart = window.dataSync.getCart();
    const total = window.dataSync.getCartTotal();
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Tu carrito está vacío</p>
                <small>Agrega productos para comenzar tu compra</small>
            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => {
            const itemPrice = window.currencySystem ? 
                window.currencySystem.formatPrice(item.price) : 
                `$${item.price.toLocaleString()}`;
            
            const itemSubtotal = window.currencySystem ? 
                window.currencySystem.formatPrice(item.price * item.quantity) : 
                `$${(item.price * item.quantity).toLocaleString()}`;
            
            return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price" data-price="${item.price}">${itemPrice}</p>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="qty-btn">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="qty-btn">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <p class="cart-item-subtotal" data-price="${item.price * item.quantity}">${itemSubtotal}</p>
                    <button onclick="removeFromCart(${item.id})" class="remove-btn" title="Eliminar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
            `;
        }).join('');
        checkoutBtn.disabled = false;
    }
    
    const totalDisplay = window.currencySystem ? 
        window.currencySystem.formatPrice(total) : 
        `$${total.toLocaleString()}`;
    
    cartTotalElement.textContent = totalDisplay;
    cartTotalElement.setAttribute('data-price', total);
    updateCartCount();
}

// Actualizar cantidad de un producto
function updateQuantity(productId, newQuantity) {
    const result = window.dataSync.updateCartItemQuantity(productId, newQuantity);
    if (result.success) {
        renderCart();
    } else {
        showNotification(result.message, 'error');
    }
}

// Remover producto del carrito
function removeFromCart(productId) {
    window.dataSync.removeFromCart(productId);
    renderCart();
    showNotification('Producto eliminado del carrito', 'info');
}

// Actualizar contador del carrito
function updateCartCount() {
    const count = window.dataSync.getCartItemCount();
    const countElement = document.getElementById('cartCount');
    if (countElement) {
        countElement.textContent = count;
        countElement.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Agregar al carrito desde la tarjeta de producto
function addToCartFromCard(productId) {
    const products = window.dataSync.getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showNotification('Producto no encontrado', 'error');
        return;
    }
    
    if (!product.available || product.stock <= 0) {
        showNotification('Producto no disponible', 'error');
        return;
    }
    
    const result = window.dataSync.addToCart(product, 1);
    
    if (result.success) {
        showNotification('✅ Producto agregado al carrito', 'success');
        updateCartCount();
        
        // Animación del botón
        const btn = event.target.closest('.add-to-cart-btn');
        if (btn) {
            btn.classList.add('added');
            setTimeout(() => btn.classList.remove('added'), 1000);
        }
    } else {
        showNotification(result.message, 'error');
    }
}

// Proceder al checkout
function proceedToCheckout() {
    // Verificar autenticación
    if (!window.authSystem.isAuthenticated()) {
        showNotification('Debes iniciar sesión para comprar', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    const cart = window.dataSync.getCart();
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    toggleCart();
    openCheckoutModal();
}

// Abrir modal de checkout
function openCheckoutModal() {
    const cart = window.dataSync.getCart();
    const total = window.dataSync.getCartTotal();
    
    // Obtener datos del usuario si está autenticado
    const currentUser = window.authSystem.getCurrentUser();
    
    const modal = document.createElement('div');
    modal.id = 'checkoutModal';
    modal.className = 'modal-overlay active';
    
    const itemsHTML = cart.map(item => {
        const itemPrice = window.currencySystem ? 
            window.currencySystem.formatPrice(item.price) : 
            `$${item.price.toLocaleString()}`;
        
        const itemTotal = window.currencySystem ? 
            window.currencySystem.formatPrice(item.price * item.quantity) : 
            `$${(item.price * item.quantity).toLocaleString()}`;
        
        return `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="checkout-item-details">
                <h5>${item.name}</h5>
                <p>${item.quantity} x ${itemPrice}</p>
            </div>
            <p class="checkout-item-total">${itemTotal}</p>
        </div>
        `;
    }).join('');
    
    const totalDisplay = window.currencySystem ? 
        window.currencySystem.formatPrice(total) : 
        `$${total.toLocaleString()}`;
    
    modal.innerHTML = `
        <div class="checkout-modal">
            <div class="checkout-header">
                <h3>💳 Confirmar Compra</h3>
                <button onclick="closeCheckoutModal()" class="close-modal">&times;</button>
            </div>
            
            <div class="checkout-content">
                <!-- Resumen de productos -->
                <div class="checkout-section">
                    <h4>📦 Resumen del Pedido</h4>
                    <div class="checkout-items">
                        ${itemsHTML}
                    </div>
                    <div class="checkout-total">
                        <span>Total a Pagar:</span>
                        <span class="total-amount">${totalDisplay}</span>
                    </div>
                </div>
                
                <!-- Información del cliente (solo visualización) -->
                <div class="checkout-section">
                    <h4>👤 Información de Entrega</h4>
                    <div class="user-info-display">
                        <div class="info-item">
                            <span class="info-label">📛 Nombre:</span>
                            <span class="info-value">${currentUser ? currentUser.name : 'No disponible'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">📧 Email:</span>
                            <span class="info-value">${currentUser ? currentUser.email : 'No disponible'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">📱 Teléfono:</span>
                            <span class="info-value">${currentUser && currentUser.phone ? currentUser.phone : 'No registrado'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">📍 Dirección:</span>
                            <span class="info-value">${currentUser && currentUser.address ? currentUser.address : 'No registrada'}</span>
                        </div>
                    </div>
                    <a href="profile.html" class="btn-edit-info" target="_blank">✏️ Editar información</a>
                    
                    <form id="checkoutForm">
                        <input type="hidden" id="customerName" value="${currentUser ? currentUser.name : ''}">
                        <input type="hidden" id="customerEmail" value="${currentUser ? currentUser.email : ''}">
                        <input type="hidden" id="customerPhone" value="${currentUser && currentUser.phone ? currentUser.phone : ''}">
                        <input type="hidden" id="customerAddress" value="${currentUser && currentUser.address ? currentUser.address : ''}">
                        
                        <div class="form-group" style="margin-top: 20px;">
                            <label for="orderNotes">📝 Notas del Pedido (Opcional)</label>
                            <textarea id="orderNotes" placeholder="Instrucciones especiales: color, talla, detalles de entrega, etc."></textarea>
                        </div>
                        
                        <button type="submit" class="submit-order-btn mercadopago-btn">
                            💳 Pagar ${totalDisplay} con Mercado Pago
                        </button>
                        <p class="payment-security-note">🔒 Pago seguro procesado por Mercado Pago</p>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listener para el formulario
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
}

// Cerrar modal de checkout
function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.remove();
    }
}

// Manejar envío del formulario de checkout
async function handleCheckoutSubmit(event) {
    event.preventDefault();
    
    const cart = window.dataSync.getCart();
    const total = window.dataSync.getCartTotal();
    
    // Obtener usuario actual
    const currentUser = window.authSystem.getCurrentUser();
    
    const orderData = {
        userId: currentUser ? currentUser.id : null,
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById('customerEmail').value,
        customerPhone: document.getElementById('customerPhone').value,
        customerAddress: document.getElementById('customerAddress').value,
        paymentMethod: 'mercadopago',
        notes: document.getElementById('orderNotes').value,
        items: cart,
        total: total,
        status: 'pending',
        date: new Date().toISOString()
    };
    
    // Cerrar modal de checkout
    closeCheckoutModal();
    
    // Usar Mercado Pago para pagos reales
    if (window.mercadoPagoPayment) {
        try {
            // Mostrar mensaje de procesamiento
            showNotification('Redirigiendo a Mercado Pago...', 'info');
            
            // Iniciar checkout con Mercado Pago
            await window.mercadoPagoPayment.initiateCheckout(orderData);
        } catch (error) {
            console.error('Error al procesar pago:', error);
            showNotification('Error al procesar el pago. Intenta nuevamente.', 'error');
        }
    } else {
        // Fallback al sistema antiguo si Mercado Pago no está disponible
        showPaymentProcessing(orderData, cart, total, 'mercadopago');
    }
}

// Pantalla de procesamiento de pago
function showPaymentProcessing(orderData, cart, total, paymentMethod) {
    const processingModal = document.createElement('div');
    processingModal.id = 'paymentProcessingModal';
    processingModal.className = 'modal-overlay active';
    processingModal.innerHTML = `
        <div class="payment-processing-modal">
            <div class="processing-animation">
                <div class="spinner"></div>
                <div class="processing-icon">💳</div>
            </div>
            <h2 id="processingTitle">Procesando pago...</h2>
            <p id="processingMessage">Por favor espera mientras verificamos tu pago</p>
            <div class="processing-steps">
                <div class="step active" id="step1">
                    <div class="step-icon">✓</div>
                    <span>Verificando datos</span>
                </div>
                <div class="step" id="step2">
                    <div class="step-icon">○</div>
                    <span>Procesando pago</span>
                </div>
                <div class="step" id="step3">
                    <div class="step-icon">○</div>
                    <span>Confirmando orden</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(processingModal);
    
    // Simular proceso de pago con pasos
    setTimeout(() => {
        // Paso 1 completado
        document.getElementById('step1').querySelector('.step-icon').textContent = '✓';
        document.getElementById('step2').classList.add('active');
        document.getElementById('step2').querySelector('.step-icon').textContent = '⟳';
        document.getElementById('processingMessage').textContent = 'Validando información de pago...';
    }, 1500);
    
    setTimeout(() => {
        // Paso 2 completado
        document.getElementById('step2').querySelector('.step-icon').textContent = '✓';
        document.getElementById('step3').classList.add('active');
        document.getElementById('step3').querySelector('.step-icon').textContent = '⟳';
        document.getElementById('processingMessage').textContent = 'Generando orden de compra...';
    }, 3000);
    
    setTimeout(() => {
        // Paso 3 completado
        document.getElementById('step3').querySelector('.step-icon').textContent = '✓';
        document.getElementById('processingTitle').textContent = '¡Pago exitoso!';
        document.getElementById('processingMessage').textContent = 'Tu orden ha sido confirmada';
        
        setTimeout(() => {
            // Procesar la orden
            finalizeOrder(orderData, cart, total, paymentMethod);
            processingModal.remove();
        }, 1500);
    }, 4500);
}

// Finalizar orden (mover lógica aquí)
function finalizeOrder(orderData, cart, total, paymentMethod) {
    // Crear la orden
    const order = window.dataSync.addOrder(orderData);
    
    // Actualizar stock de productos
    cart.forEach(item => {
        const products = window.dataSync.getProducts();
        const product = products.find(p => p.id === item.id);
        if (product) {
            window.dataSync.updateProduct(product.id, {
                stock: product.stock - item.quantity,
                sold: (product.sold || 0) + item.quantity
            });
        }
    });
    
    // Generar códigos de producto para cada item
    const allCodes = [];
    cart.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
            const code = window.dataSync.generateProductCode(order.id, item.id, item.name);
            const productCode = window.dataSync.saveProductCode({
                code: code,
                orderId: order.id,
                productId: item.id,
                productName: item.name,
                customerName: orderData.customerName,
                customerEmail: orderData.customerEmail,
                purchaseDate: Date.now(),
                warrantyExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000), // 1 año
                status: 'activo'
            });
            allCodes.push(productCode);
        }
    });
    
    // Agregar pedido al usuario si está autenticado
    const currentUser = window.authSystem.getCurrentUser();
    if (currentUser) {
        window.authSystem.addOrderToUser(order.id, {
            id: order.id,
            date: order.date,
            total: order.total,
            status: order.status,
            items: order.items,
            paymentMethod: order.paymentMethod
        });
    }
    
    // Limpiar carrito
    window.dataSync.clearCart();
    updateCartCount();
    
    // Mostrar confirmación
    showOrderConfirmation(order, allCodes, paymentMethod);
}

// Mostrar confirmación de pedido
function showOrderConfirmation(order, codes, paymentMethod) {
    const modal = document.createElement('div');
    modal.id = 'orderConfirmationModal';
    modal.className = 'modal-overlay active';
    
    const paymentInstructions = {
        'tarjeta': {
            icon: '💳',
            title: 'Pago con Tarjeta',
            message: '¡Pago procesado exitosamente! Tu pedido ha sido confirmado y será procesado de inmediato. Recibirás un correo con los detalles de tu compra.'
        },
        'transferencia': {
            icon: '🏦',
            title: 'Transferencia Bancaria',
            message: 'Realiza la transferencia a los datos bancarios proporcionados y envía el comprobante a nuestro WhatsApp: +57 321 479 8399'
        },
        'nequi': {
            icon: '📱',
            title: 'Nequi / Daviplata',
            message: 'Realiza el pago a través de Nequi o Daviplata al número +57 321 479 8399 y envía el comprobante por WhatsApp.'
        }
    };
    
    const payment = paymentInstructions[paymentMethod];
    
    const codesHTML = codes.map(code => `
        <div class="product-code-item">
            <span class="code-text">${code.code}</span>
            <button onclick="copyToClipboard('${code.code}')" class="copy-code-btn">📋 Copiar</button>
        </div>
    `).join('');
    
    modal.innerHTML = `
        <div class="confirmation-modal">
            <div class="confirmation-icon">✅</div>
            <h2>¡Pedido Realizado con Éxito!</h2>
            <p class="order-number">Pedido #${order.id}</p>
            
            <div class="confirmation-section">
                <h3>${payment.icon} ${payment.title}</h3>
                <p>${payment.message}</p>
                ${paymentMethod === 'tarjeta' && order.cardLast4 ? `
                    <div class="card-info-confirmation">
                        <p><strong>Tarjeta:</strong> ${order.cardType} •••• ${order.cardLast4}</p>
                        <p style="color: #22C55E;">✅ Pago procesado exitosamente</p>
                    </div>
                ` : ''}
            </div>
            
            <div class="confirmation-section">
                <h3>📋 Códigos de Garantía</h3>
                <p>Guarda estos códigos para hacer uso de tu garantía:</p>
                <div class="product-codes-list">
                    ${codesHTML}
                </div>
                <p class="codes-note">También hemos enviado estos códigos a tu correo: ${order.customerEmail}</p>
            </div>
            
            <div class="confirmation-section">
                <h3>📦 Información del Pedido</h3>
                <div class="order-summary">
                    <p><strong>Total Pagado:</strong> $${order.total.toLocaleString()}</p>
                    <p><strong>Dirección:</strong> ${order.customerAddress}</p>
                    <p><strong>Teléfono:</strong> ${order.customerPhone}</p>
                </div>
            </div>
            
            <div class="confirmation-actions">
                <button onclick="closeOrderConfirmation()" class="primary-btn">Entendido</button>
                <a href="https://wa.me/573214798399?text=Hola,%20realicé%20el%20pedido%20%23${order.id}" target="_blank" class="whatsapp-btn">
                    💬 Contactar por WhatsApp
                </a>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeOrderConfirmation() {
    const modal = document.getElementById('orderConfirmationModal');
    if (modal) {
        modal.remove();
    }
}

// Detectar tipo de tarjeta basado en el número
function detectCardType(cardNumber) {
    const patterns = {
        'Visa': /^4/,
        'Mastercard': /^5[1-5]/,
        'American Express': /^3[47]/,
        'Diners Club': /^3(?:0[0-5]|[68])/,
        'Discover': /^6(?:011|5)/
    };
    
    for (const [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(cardNumber)) {
            return type;
        }
    }
    
    return 'Desconocida';
}

// Inicializar contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
