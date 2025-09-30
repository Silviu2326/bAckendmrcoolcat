# Backend para Envío de Emails de Registro

Este backend maneja el envío de emails de confirmación cuando un usuario se registra en la aplicación.

## 📋 Requisitos

- Node.js (versión 14 o superior)
- npm o yarn
- Una cuenta de email (Gmail, Outlook, etc.)

## 🚀 Instalación

1. Navega a la carpeta backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` copiando el ejemplo:
```bash
copy .env.example .env
```

4. Edita el archivo `.env` con tus credenciales:

### Para Gmail:
- Ve a https://myaccount.google.com/apppasswords
- Genera una "App Password" (necesitas tener 2FA activado)
- Usa esa contraseña en `EMAIL_PASS`

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-generado
EMAIL_FROM_NAME=Tu Aplicación
```

### Para Outlook/Hotmail:
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@outlook.com
EMAIL_PASS=tu-contraseña
EMAIL_FROM_NAME=Tu Aplicación
```

## 🏃‍♂️ Ejecutar el servidor

### Desarrollo (con auto-reload):
```bash
npm run dev
```

### Producción:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000` (o el puerto que configures en `.env`)

## 📡 API Endpoints

### POST /api/send-registration-email

Envía un email de confirmación de registro.

**Body (JSON):**
```json
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan@example.com",
  "phone": "1234567890",
  "city": "Caracas",
  "avatar": "buck"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Email enviado exitosamente",
  "messageId": "..."
}
```

**Respuesta de error:**
```json
{
  "success": false,
  "message": "Error al enviar el email",
  "error": "..."
}
```

## 🌐 Desplegar en servidor

1. Sube la carpeta `backend` a tu servidor
2. Instala las dependencias: `npm install --production`
3. Configura el archivo `.env` con tus credenciales
4. Inicia el servidor: `npm start`
5. Opcional: Usa PM2 para mantener el servidor corriendo:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "email-backend"
   pm2 save
   pm2 startup
   ```

## 🔒 Seguridad

- **NUNCA** subas el archivo `.env` a GitHub
- Usa variables de entorno en producción
- Considera agregar rate limiting para prevenir spam
- Valida y sanitiza todos los inputs

## 🐛 Troubleshooting

### Error: "Invalid login"
- Verifica que el email y contraseña sean correctos
- Para Gmail, asegúrate de usar una App Password, no tu contraseña normal
- Verifica que 2FA esté activado en Gmail

### Error: "Connection refused"
- Verifica que el host y puerto sean correctos
- Algunos proveedores de hosting bloquean el puerto 587, intenta con 465 y `EMAIL_SECURE=true`

### El email llega a spam
- Configura SPF, DKIM y DMARC en tu dominio
- Usa un servicio profesional como SendGrid o Mailgun para producción