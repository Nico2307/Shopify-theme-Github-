# 📧 Configuración de EmailJS para Formulario de Contacto

## 🎯 Objetivo
Los mensajes del formulario de contacto se enviarán automáticamente a **contacto@yunguer.com**

---

## 📋 Pasos para Configurar EmailJS

### 1. Crear Cuenta en EmailJS
1. Ve a **https://www.emailjs.com/**
2. Click en **"Sign Up"** (Registrarse)
3. Regístrate con tu email (puede ser contacto@yunguer.com)
4. Verifica tu email

### 2. Conectar tu Servicio de Email

1. En el dashboard, ve a **"Email Services"**
2. Click en **"Add New Service"**
3. Selecciona tu proveedor de email:
   - **Gmail** (si usas Gmail)
   - **Outlook** (si usas Outlook)
   - **Yahoo** (si usas Yahoo)
   - O cualquier otro proveedor SMTP

**Para Gmail:**
- Click en **"Gmail"**
- Click en **"Connect Account"**
- Autoriza el acceso con tu cuenta de Gmail
- Service ID sugerido: `service_yunguer`

### 3. Crear Template de Email

1. Ve a **"Email Templates"**
2. Click en **"Create New Template"**
3. Template ID sugerido: `template_contact`

**Configuración del Template:**

**Subject (Asunto):**
```
Nuevo mensaje de contacto - {{from_name}}
```

**Content (Contenido HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #f4f4f4;
        }
        .header {
            background: #000;
            color: #fff;
            padding: 20px;
            text-align: center;
        }
        .content {
            background: #fff;
            padding: 30px;
            margin-top: 20px;
        }
        .info-row {
            margin-bottom: 15px;
            padding: 10px;
            background: #f9f9f9;
            border-left: 4px solid #000;
        }
        .label {
            font-weight: bold;
            color: #000;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Nuevo Mensaje de Contacto</h1>
            <p>YunGuer Store</p>
        </div>
        
        <div class="content">
            <h2>Detalles del Mensaje</h2>
            
            <div class="info-row">
                <span class="label">👤 Nombre:</span><br>
                {{from_name}}
            </div>
            
            <div class="info-row">
                <span class="label">📧 Email:</span><br>
                {{from_email}}
            </div>
            
            <div class="info-row">
                <span class="label">💬 Mensaje:</span><br>
                {{message}}
            </div>
        </div>
        
        <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de yunguer.com</p>
            <p>Responde directamente a: {{from_email}}</p>
        </div>
    </div>
</body>
</html>
```

4. Click en **"Save"**

### 4. Obtener tu Public Key

1. Ve a **"Account"** → **"General"**
2. Copia tu **Public Key**
3. Reemplázala en el código de `index.html` (línea con `emailjs.init`)

**Actualmente está configurado con:** `eWb_T9gj1wcXVA6rH`

---

## ✅ Verificar Configuración

### IDs que debes tener:
- **Service ID**: `service_yunguer` (el que creaste en paso 2)
- **Template ID**: `template_contact` (el que creaste en paso 3)
- **Public Key**: Tu clave pública de EmailJS

### Estos IDs ya están en el código:
```javascript
emailjs.init("eWb_T9gj1wcXVA6rH"); // ← Reemplaza con tu Public Key
emailjs.send('service_yunguer', 'template_contact', templateParams)
```

---

## 🧪 Probar el Formulario

1. Ve a **https://yunguer.com/#contacto**
2. Completa el formulario con tus datos de prueba
3. Click en **"Enviar Mensaje"**
4. Deberías recibir el email en **contacto@yunguer.com**

---

## 📊 Límites Gratuitos de EmailJS

- ✅ **200 emails/mes** gratis
- ✅ Sin tarjeta de crédito requerida
- ✅ Suficiente para un sitio de comercio electrónico pequeño/mediano

Si necesitas más, puedes actualizar a plan de pago ($7/mes = 1000 emails)

---

## 🔧 Solución de Problemas

### Email no llega:
1. Verifica que el Service ID y Template ID sean correctos
2. Revisa la carpeta de Spam
3. Asegúrate de haber autorizado el servicio de email en EmailJS
4. Verifica en el dashboard de EmailJS los logs de emails enviados

### Error al enviar:
1. Verifica tu Public Key
2. Comprueba la consola del navegador (F12) para ver errores
3. Asegúrate de que todos los campos del formulario estén llenos

---

## 📝 Notas Importantes

1. El email llegará a: **contacto@yunguer.com**
2. El remitente será el servicio de email que conectaste (ej: tu Gmail)
3. Puedes responder directamente al email del cliente desde tu bandeja de entrada
4. Todos los mensajes quedan registrados en el dashboard de EmailJS

---

**¿Necesitas ayuda?** Consulta la documentación oficial: https://www.emailjs.com/docs/
