# 📦 Instrucciones de Despliegue para Tu Socio

## 🎯 Resumen
Este backend envía emails de confirmación cuando alguien se registra en la app. Es súper simple de configurar.

## 📋 Requisitos en el Servidor
- Node.js instalado (versión 14 o superior)
- Una cuenta de email (Gmail es la más fácil)

## 🚀 Pasos para Desplegar

### 1. Subir los archivos
Sube la carpeta `backend` completa al servidor.

### 2. Instalar dependencias
Conecta por SSH al servidor y ejecuta:
```bash
cd backend
npm install
```

### 3. Configurar el email

#### Si usa Gmail (RECOMENDADO):

1. Ve a https://myaccount.google.com/apppasswords
2. Inicia sesión con la cuenta de Gmail
3. Crea una nueva "App Password" (necesitas tener 2FA activado)
4. Copia la contraseña generada (16 caracteres)

Luego crea el archivo `.env` en la carpeta backend:
```bash
nano .env
```

Y pega esto (reemplaza con tus datos):
```env
PORT=3000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tuemail@gmail.com
EMAIL_PASS=tu-app-password-de-16-caracteres
EMAIL_FROM_NAME=Nombre de tu Aplicación
```

Guarda con `Ctrl+X`, luego `Y`, luego `Enter`.

### 4. Probar que funciona
```bash
npm start
```

Deberías ver:
```
🚀 Servidor corriendo en el puerto 3000
✅ Servidor de email listo para enviar mensajes
```

Si ves esto, ¡está funcionando! Presiona `Ctrl+C` para detenerlo.

### 5. Hacer que se ejecute siempre (con PM2)

Instala PM2:
```bash
npm install -g pm2
```

Inicia el servidor con PM2:
```bash
pm2 start server.js --name "email-backend"
pm2 save
pm2 startup
```

Copia y ejecuta el comando que te muestre `pm2 startup`.

### 6. Verificar que está corriendo
```bash
pm2 status
```

Deberías ver algo como:
```
┌─────┬────────────────┬─────────┬─────────┬─────────┐
│ id  │ name           │ status  │ cpu     │ memory  │
├─────┼────────────────┼─────────┼─────────┼─────────┤
│ 0   │ email-backend  │ online  │ 0%      │ 50 MB   │
└─────┴────────────────┴─────────┴─────────┴─────────┘
```

### 7. Obtener la URL del servidor

Necesitas saber la IP o dominio de tu servidor. Por ejemplo:
- `http://123.45.67.89:3000` (si es una IP)
- `https://tudominio.com` (si tienes un dominio)

Esta URL se la darás a tu socio desarrollador para que la configure en la app.

## 🔧 Comandos útiles de PM2

Ver logs en tiempo real:
```bash
pm2 logs email-backend
```

Reiniciar el servidor:
```bash
pm2 restart email-backend
```

Detener el servidor:
```bash
pm2 stop email-backend
```

Ver estado:
```bash
pm2 status
```

## 🐛 Solución de Problemas

### El email no se envía
1. Verifica que el `.env` tenga los datos correctos
2. Para Gmail, asegúrate de usar una App Password, no tu contraseña normal
3. Revisa los logs: `pm2 logs email-backend`

### Error: "Invalid login"
- Usa una App Password de Gmail, no tu contraseña normal
- Asegúrate de que 2FA esté activado en Gmail

### El servidor no inicia
- Verifica que el puerto 3000 no esté siendo usado: `netstat -an | grep 3000`
- Cambia el puerto en el `.env` si es necesario

## 📞 URL que debe ir en la App

Después de configurar todo, proporciona esta URL a tu desarrollador:

**Si tienes dominio:**
```
https://tudominio.com/api/send-registration-email
```

**Si solo tienes IP:**
```
http://TU-IP:3000/api/send-registration-email
```

Esta URL debe reemplazar `https://TU-SERVIDOR.com/api/send-registration-email` en el archivo `App.js` línea 352.

## ✅ Checklist Final

- [ ] Node.js instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` creado y configurado
- [ ] App Password de Gmail creada (si usas Gmail)
- [ ] Servidor iniciado con PM2
- [ ] PM2 configurado para auto-iniciar
- [ ] URL del servidor compartida con el desarrollador
- [ ] Probado enviando un email de prueba

## 🎉 ¡Listo!

Una vez que todo esto esté configurado, cada vez que alguien se registre en la app, recibirá automáticamente un email de confirmación.