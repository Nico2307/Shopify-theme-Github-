// Email Service usando EmailJS
// Configuración: https://www.emailjs.com/

const EmailService = {
    // Configuración de EmailJS (debes crear una cuenta en emailjs.com)
    SERVICE_ID: 'service_yunguen', // Reemplazar con tu Service ID
    TEMPLATE_ID: 'template_order_confirmation', // Reemplazar con tu Template ID
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Reemplazar con tu Public Key

    // Inicializar EmailJS
    init() {
        // Se cargará el script de EmailJS dinámicamente
        if (!window.emailjs) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                emailjs.init(this.PUBLIC_KEY);
                console.log('EmailJS inicializado');
            };
            document.head.appendChild(script);
        }
    },

    // Enviar email de confirmación de pedido
    async sendOrderConfirmation(orderData) {
        try {
            // Esperar a que EmailJS esté cargado
            if (!window.emailjs) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            const templateParams = {
                to_email: orderData.customerEmail,
                customer_name: orderData.customerName,
                order_id: orderData.orderId,
                order_date: new Date(orderData.orderDate).toLocaleDateString('es-CO'),
                order_items: this.formatOrderItems(orderData.items),
                order_total: `$${orderData.total.toLocaleString('es-CO')}`,
                order_status: 'Procesando',
                tracking_url: `${window.location.origin}/my-orders.html`
            };

            const response = await emailjs.send(
                this.SERVICE_ID,
                this.TEMPLATE_ID,
                templateParams
            );

            console.log('Email enviado exitosamente:', response);
            return { success: true, response };
        } catch (error) {
            console.error('Error al enviar email:', error);
            return { success: false, error };
        }
    },

    // Enviar email de actualización de estado
    async sendStatusUpdate(orderData, newStatus) {
        try {
            const statusMessages = {
                'processing': 'Tu pedido está siendo procesado',
                'shipped': 'Tu pedido ha sido enviado',
                'delivered': 'Tu pedido ha sido entregado',
                'cancelled': 'Tu pedido ha sido cancelado'
            };

            const templateParams = {
                to_email: orderData.customerEmail,
                customer_name: orderData.customerName,
                order_id: orderData.orderId,
                order_status: statusMessages[newStatus.toLowerCase()],
                status_message: this.getStatusMessage(newStatus),
                tracking_number: orderData.trackingNumber || 'No disponible',
                tracking_url: `${window.location.origin}/my-orders.html`
            };

            const response = await emailjs.send(
                this.SERVICE_ID,
                'template_status_update', // Template para actualizaciones de estado
                templateParams
            );

            console.log('Email de actualización enviado:', response);
            return { success: true, response };
        } catch (error) {
            console.error('Error al enviar email de actualización:', error);
            return { success: false, error };
        }
    },

    // Formatear items para el email
    formatOrderItems(items) {
        return items.map(item => 
            `${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CO')}`
        ).join('\n');
    },

    // Obtener mensaje según el estado
    getStatusMessage(status) {
        const messages = {
            'processing': 'Estamos preparando tu pedido. Te notificaremos cuando sea enviado.',
            'shipped': 'Tu pedido está en camino. Revisa el número de seguimiento para más detalles.',
            'delivered': '¡Tu pedido ha sido entregado! Esperamos que disfrutes tu compra.',
            'cancelled': 'Tu pedido ha sido cancelado. Si tienes dudas, contáctanos.'
        };
        return messages[status.toLowerCase()] || 'Estado actualizado';
    }
};

// Exportar para uso global
window.EmailService = EmailService;

// Inicializar automáticamente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => EmailService.init());
} else {
    EmailService.init();
}
