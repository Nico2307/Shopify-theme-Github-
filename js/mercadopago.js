// ============================================
// MERCADO PAGO INTEGRATION
// Sistema de pagos real con Mercado Pago
// ============================================

class MercadoPagoPayment {
    constructor() {
        this.publicKey = 'APP_USR-d7357d92-6534-48b5-9db1-8dc7f9b0598d';
        this.accessToken = 'APP_USR-6291427247779348-120815-07e4c93be761986234acf13c814f801b-1516215604';
        this.mp = null;
        this.initMercadoPago();
    }

    async initMercadoPago() {
        // Cargar SDK de Mercado Pago
        if (!window.MercadoPago) {
            await this.loadMercadoPagoSDK();
        }
        
        this.mp = new MercadoPago(this.publicKey, {
            locale: 'es-CO'
        });
        
        console.log('✅ Mercado Pago inicializado');
    }

    loadMercadoPagoSDK() {
        return new Promise((resolve, reject) => {
            if (document.getElementById('mercadopago-sdk')) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.id = 'mercadopago-sdk';
            script.src = 'https://sdk.mercadopago.com/js/v2';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async createPreference(orderData) {
        try {
            // Preparar items para Mercado Pago
            const items = orderData.items.map(item => ({
                title: item.name,
                quantity: item.quantity,
                unit_price: item.price,
                currency_id: 'COP',
                picture_url: item.image
            }));

            // Obtener URL base correcta
            const currentUrl = window.location.href.split('?')[0]; // URL sin parámetros
            const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
            
            const successUrl = baseUrl + 'index.html?payment=success';
            const failureUrl = baseUrl + 'index.html?payment=failure';
            const pendingUrl = baseUrl + 'index.html?payment=pending';

            // Crear preferencia de pago
            const preference = {
                items: items,
                payer: {
                    name: orderData.customerName,
                    email: orderData.customerEmail
                },
                back_urls: {
                    success: successUrl,
                    failure: failureUrl,
                    pending: pendingUrl
                },
                statement_descriptor: 'YunGuen Store',
                external_reference: `ORDER-${Date.now()}`
            };

            console.log('📤 Configuración de pago:', {
                success: successUrl,
                failure: failureUrl,
                pending: pendingUrl,
                items: items.length,
                email: orderData.customerEmail
            });

            // Llamar al backend para crear la preferencia
            const response = await this.createPreferenceBackend(preference);
            
            return response;
        } catch (error) {
            console.error('Error creando preferencia:', error);
            throw error;
        }
    }

    async createPreferenceBackend(preferenceData) {
        // Llamar directamente a la API de Mercado Pago
        const apiUrl = 'https://api.mercadopago.com/checkout/preferences';
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                },
                body: JSON.stringify(preferenceData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error de Mercado Pago:', errorData);
                throw new Error(errorData.message || 'Error al crear preferencia de pago');
            }

            const data = await response.json();
            console.log('✅ Preferencia creada exitosamente:', data.id);
            return data;
            
        } catch (error) {
            console.error('Error conectando con Mercado Pago:', error);
            throw new Error('No se pudo procesar el pago. Por favor intenta nuevamente.');
        }
    }

    async initiateCheckout(orderData) {
        try {
            // Crear preferencia de pago
            const preference = await this.createPreference(orderData);
            
            // Redirigir al checkout REAL de Mercado Pago
            if (preference.init_point) {
                console.log('🔗 Redirigiendo a Mercado Pago:', preference.init_point);
                window.location.href = preference.init_point;
            } else {
                throw new Error('No se pudo obtener la URL de pago de Mercado Pago');
            }
        } catch (error) {
            console.error('Error al iniciar checkout:', error);
            throw error;
        }
    }

    // Verificar estado del pago (después de que el usuario regrese)
    async checkPaymentStatus(paymentId) {
        try {
            const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al verificar el pago');
            }

            const payment = await response.json();
            return payment;
        } catch (error) {
            console.error('Error verificando pago:', error);
            throw error;
        }
    }
}

// Crear instancia global
window.mercadoPagoPayment = new MercadoPagoPayment();

// Verificar si el usuario regresó de un pago
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    const paymentId = urlParams.get('payment_id');
    const collectionId = urlParams.get('collection_id');
    const collectionStatus = urlParams.get('collection_status');

    if (paymentStatus) {
        handlePaymentReturn(paymentStatus, paymentId || collectionId, collectionStatus);
    }
});

function handlePaymentReturn(status, paymentId, collectionStatus) {
    // Limpiar URL
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);

    let message, icon, title;

    switch(status) {
        case 'success':
            title = '¡Pago Exitoso!';
            icon = '✅';
            message = 'Tu pago ha sido procesado correctamente. Recibirás un email con los detalles de tu compra.';
            
            // Guardar pedido en localStorage
            saveOrderToHistory(paymentId);
            
            // Enviar email de confirmación
            sendOrderConfirmationEmail(paymentId);
            
            // Limpiar carrito
            if (window.dataSync) {
                window.dataSync.clearCart();
                if (typeof updateCartCount === 'function') {
                    updateCartCount();
                }
            }
            break;
        case 'pending':
            title = 'Pago Pendiente';
            icon = '⏳';
            message = 'Tu pago está siendo procesado. Te notificaremos cuando se confirme.';
            saveOrderToHistory(paymentId, 'pending');
            break;
        case 'failure':
            title = 'Pago Rechazado';
            icon = '❌';
            message = 'No se pudo procesar tu pago. Por favor intenta nuevamente o usa otro método de pago.';
            break;
    }

    // Mostrar modal de resultado
    showPaymentResultModal(title, icon, message, paymentId);
}

function saveOrderToHistory(paymentId, status = 'processing') {
    try {
        const currentUser = window.authSystem?.currentUser;
        if (!currentUser) return;

        const cart = JSON.parse(localStorage.getItem('yunguen_cart') || '[]');
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const order = {
            id: paymentId || `ORDER-${Date.now()}`,
            userEmail: currentUser.email,
            customerName: currentUser.name || currentUser.email,
            date: new Date().toISOString(),
            items: cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            total: total,
            status: status,
            paymentId: paymentId,
            trackingNumber: null
        };

        // Guardar en historial de pedidos
        const orders = JSON.parse(localStorage.getItem('yunguen_orders') || '[]');
        orders.unshift(order); // Agregar al principio
        localStorage.setItem('yunguen_orders', JSON.stringify(orders));

        console.log('✅ Pedido guardado:', order.id);
    } catch (error) {
        console.error('Error guardando pedido:', error);
    }
}

async function sendOrderConfirmationEmail(paymentId) {
    try {
        if (!window.EmailService) {
            console.log('EmailService no disponible');
            return;
        }

        const currentUser = window.authSystem?.currentUser;
        if (!currentUser) return;

        const orders = JSON.parse(localStorage.getItem('yunguen_orders') || '[]');
        const order = orders.find(o => o.id === paymentId);
        
        if (!order) return;

        const orderData = {
            customerEmail: currentUser.email,
            customerName: currentUser.name || currentUser.email,
            orderId: order.id,
            orderDate: order.date,
            items: order.items,
            total: order.total
        };

        await window.EmailService.sendOrderConfirmation(orderData);
        console.log('✅ Email de confirmación enviado');
    } catch (error) {
        console.error('Error enviando email:', error);
    }
}

function showPaymentResultModal(title, icon, message, paymentId) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="payment-result-modal">
            <div class="result-icon">${icon}</div>
            <h2>${title}</h2>
            <p>${message}</p>
            ${paymentId ? `<p class="payment-id">ID de pago: ${paymentId}</p>` : ''}
            <button class="btn-primary" onclick="this.closest('.modal-overlay').remove()">
                Continuar
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}
