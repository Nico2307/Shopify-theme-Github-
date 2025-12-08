# Configuración de EmailJS para YunGuer

## Paso 1: Crear cuenta en EmailJS

1. Ve a https://www.emailjs.com/
2. Crea una cuenta gratuita (permite hasta 200 emails/mes)
3. Verifica tu email

## Paso 2: Configurar servicio de email

1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail recomendado)
4. Conecta tu cuenta de Gmail
5. Copia el **Service ID** (ejemplo: `service_abc123`)

## Paso 3: Crear plantillas de email

### Plantilla 1: Confirmación de Pedido
1. Ve a "Email Templates"
2. Crea una nueva plantilla
3. Usa este contenido:

**Subject:** 
```
Confirmación de Pedido #{{order_id}} - YunGuer
```

**Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
    <div style="background: #000; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #fff; margin: 0;">YunGuer</h1>
        <p style="color: #9b9b9b; margin: 10px 0 0;">Tu Tienda de Confianza</p>
    </div>
    
    <div style="background: #fff; padding: 30px; border-radius: 0 0 12px 12px;">
        <h2 style="color: #000; margin-top: 0;">¡Gracias por tu compra, {{customer_name}}!</h2>
        
        <p style="color: #666; font-size: 16px;">Tu pedido ha sido confirmado y está siendo procesado.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #000;">Detalles del Pedido</h3>
            <p style="margin: 5px 0;"><strong>ID del Pedido:</strong> {{order_id}}</p>
            <p style="margin: 5px 0;"><strong>Fecha:</strong> {{order_date}}</p>
            <p style="margin: 5px 0;"><strong>Estado:</strong> {{order_status}}</p>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #000;">Productos</h3>
            <pre style="white-space: pre-wrap; font-family: Arial; color: #333;">{{order_items}}</pre>
        </div>
        
        <div style="background: #000; color: #fff; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="margin: 0; font-size: 18px;"><strong>Total: {{order_total}}</strong></p>
        </div>
        
        <p style="color: #666;">Puedes revisar el estado de tu pedido en cualquier momento:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{tracking_url}}" style="background: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                Ver Mi Pedido
            </a>
        </div>
        
        <p style="color: #999; font-size: 14px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            Si tienes alguna pregunta, no dudes en contactarnos.<br>
            Este es un correo automático, por favor no respondas a este mensaje.
        </p>
    </div>
</div>
```

4. Guarda la plantilla
5. Copia el **Template ID** (ejemplo: `template_xyz789`)

### Plantilla 2: Actualización de Estado
1. Crea otra plantilla nueva
2. Usa este contenido:

**Subject:**
```
Actualización de tu Pedido #{{order_id}} - YunGuer
```

**Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
    <div style="background: #000; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #fff; margin: 0;">YunGuer</h1>
        <p style="color: #9b9b9b; margin: 10px 0 0;">Actualización de tu Pedido</p>
    </div>
    
    <div style="background: #fff; padding: 30px; border-radius: 0 0 12px 12px;">
        <h2 style="color: #000; margin-top: 0;">Hola {{customer_name}},</h2>
        
        <p style="color: #666; font-size: 16px;">Tenemos una actualización sobre tu pedido:</p>
        
        <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
            <h3 style="margin-top: 0; color: #2e7d32;">{{order_status}}</h3>
            <p style="margin: 5px 0; color: #666;">{{status_message}}</p>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #000;">Detalles</h3>
            <p style="margin: 5px 0;"><strong>ID del Pedido:</strong> {{order_id}}</p>
            <p style="margin: 5px 0;"><strong>Número de Seguimiento:</strong> {{tracking_number}}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{tracking_url}}" style="background: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                Rastrear Mi Pedido
            </a>
        </div>
        
        <p style="color: #999; font-size: 14px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            Gracias por tu compra en YunGuer.<br>
            Este es un correo automático, por favor no respondas a este mensaje.
        </p>
    </div>
</div>
```

3. Guarda la plantilla
4. Copia el **Template ID** (ejemplo: `template_status123`)

## Paso 4: Obtener Public Key

1. Ve a "Account" → "General"
2. Copia tu **Public Key** (ejemplo: `user_abc123xyz`)

## Paso 5: Actualizar el código

Abre el archivo `js/email-service.js` y actualiza estas líneas:

```javascript
SERVICE_ID: 'service_YunGuer', // ← Reemplaza con tu Service ID
TEMPLATE_ID: 'template_order_confirmation', // ← Reemplaza con tu Template ID de confirmación
PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // ← Reemplaza con tu Public Key
```

En el método `sendStatusUpdate`, actualiza:
```javascript
'template_status_update', // ← Reemplaza con tu Template ID de actualización de estado
```

## Paso 6: Probar

1. Realiza una compra de prueba en tu tienda
2. Verifica que llegue el email de confirmación
3. En el admin panel, cambia el estado del pedido
4. Verifica que llegue el email de actualización

## Límites del plan gratuito

- **200 emails/mes gratis**
- Si necesitas más, considera:
  - Plan Personal: $7/mes (1000 emails)
  - Plan Professional: $19/mes (10,000 emails)

## Solución de problemas

### Email no llega
- Verifica que las credenciales estén correctas
- Revisa la carpeta de spam
- Verifica que el Service esté conectado

### Error 400 (Bad Request)
- Verifica que los Template IDs sean correctos
- Asegúrate de que los nombres de variables coincidan

### Error 403 (Forbidden)
- Verifica tu Public Key
- Asegúrate de que el servicio esté activo

## Alternativas

Si prefieres otro servicio:

1. **SendGrid** (100 emails/día gratis)
   - Más profesional
   - Requiere backend en Node.js

2. **Resend** (3000 emails/mes gratis)
   - Moderno y fácil de usar
   - API simple

3. **Mailgun** (5000 emails/mes gratis primeros 3 meses)
   - Muy potente
   - Requiere configuración DNS

## Soporte

Para más ayuda con EmailJS: https://www.emailjs.com/docs/
