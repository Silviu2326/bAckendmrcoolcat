# 🚀 Desplegar Backend en Railway

## Pasos para desplegar el backend de Mr. Cool Cat en Railway

### 1. Preparar el repositorio Git

```bash
cd backend
git init
git add .
git commit -m "Backend Mr Cool Cat - listo para deploy"
```

### 2. Subir a GitHub (opcional pero recomendado)

1. Ve a https://github.com/new
2. Crea un nuevo repositorio llamado `mrcoolcat-backend`
3. **NO inicialices con README**
4. Copia los comandos que te da GitHub:

```bash
git remote add origin https://github.com/TU_USUARIO/mrcoolcat-backend.git
git branch -M main
git push -u origin main
```

### 3. Crear proyecto en Railway

1. Ve a https://railway.app/
2. Haz clic en **"Start a New Project"**
3. Selecciona **"Deploy from GitHub repo"** (o "Empty Project" si no usas GitHub)
4. Autoriza Railway para acceder a GitHub
5. Selecciona el repositorio `mrcoolcat-backend`

### 4. Configurar variables de entorno

Una vez creado el proyecto:

1. Ve a la pestaña **"Variables"**
2. Añade estas variables (⚠️ **MUY IMPORTANTE**):

```
EMAIL_HOST=mail.mrcoolcatcraftbeer.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=experiencies@mrcoolcatcraftbeer.com
EMAIL_PASS=SJ6*mkS8}
EMAIL_FROM_NAME=Mr. Cool Cat Craft Beer
PORT=3000
```

3. Haz clic en **"Add Variable"** para cada una

### 5. Railway desplegará automáticamente

- Railway detecta que es un proyecto Node.js
- Ejecuta `npm install` automáticamente
- Ejecuta `npm start` para iniciar el servidor
- En 1-2 minutos estará listo

### 6. Obtener la URL pública

1. Ve a la pestaña **"Settings"**
2. En **"Networking"** haz clic en **"Generate Domain"**
3. Railway te dará una URL tipo: `https://mrcoolcat-backend-production.up.railway.app`
4. **Copia esta URL**, la necesitarás para:
   - Actualizar la app móvil para enviar emails
   - Cambiar la URL del logo en los emails

### 7. Actualizar URL del logo en server.js

Una vez tengas la URL de Railway, actualiza el `server.js`:

```javascript
// Cambiar en el template HTML:
// De: http://localhost:3000/images/app-icon.png
// A:   https://TU-APP.up.railway.app/images/app-icon.png
```

**Nota:** Railway reconstruirá automáticamente cuando hagas push a GitHub.

### 8. Probar el backend

```bash
# Cambiar TU-APP por tu dominio de Railway
curl https://TU-APP.up.railway.app/

# Deberías ver:
{"message":"Servidor de email funcionando correctamente"}
```

### 9. Conectar la app con el backend

En tu `App.js`, actualiza la URL del backend:

```javascript
const emailResponse = await fetch('https://TU-APP.up.railway.app/api/send-registration-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    phone: formData.phone,
    city: formData.city,
    avatar: formData.avatar,
  }),
});
```

---

## 💰 Costos de Railway

- **$5 USD de crédito gratis al mes** (Hobby Plan)
- Suficiente para ~500,000 requests/mes
- Si necesitas más: $5 USD/mes adicionales

---

## 🔧 Comandos útiles

### Ver logs en Railway
1. Ve a tu proyecto en Railway
2. Pestaña **"Deployments"**
3. Haz clic en el último deployment
4. Ver logs en tiempo real

### Redeploy manual
1. Ve a **"Deployments"**
2. Haz clic en los 3 puntos
3. Selecciona **"Redeploy"**

### Actualizar el código
```bash
# Hacer cambios en tu código
git add .
git commit -m "Actualización del backend"
git push

# Railway redesplegará automáticamente
```

---

## ⚠️ Checklist antes de deploy

- [ ] `.env` está en el `.gitignore` (NO subir credenciales)
- [ ] Variables de entorno configuradas en Railway
- [ ] `package.json` tiene el script `start`
- [ ] Puerto configurado como variable de entorno `PORT`
- [ ] Carpeta `public/images` contiene el logo
- [ ] Express sirve archivos estáticos (`express.static`)

---

## 🆘 Solución de problemas

### El servidor no inicia
- Revisa los logs en Railway
- Verifica que las variables de entorno estén configuradas
- Asegúrate que `npm start` funciona localmente

### Los emails no se envían
- Verifica las credenciales SMTP en las variables de Railway
- Revisa los logs para ver errores específicos
- Prueba las credenciales localmente primero

### El logo no se ve en los emails
- Verifica que la carpeta `public/images` se haya subido
- Confirma que la URL del logo sea correcta (dominio de Railway)
- Prueba acceder directamente: `https://TU-APP.up.railway.app/images/app-icon.png`

---

## 🎯 Alternativas a Railway

Si Railway no funciona o prefieres otra opción:

- **Render.com** - Similar a Railway, también gratis
- **Fly.io** - Más técnico pero muy potente
- **Heroku** - Ya no tiene plan gratis
- **DigitalOcean App Platform** - $5/mes mínimo
- **Vercel** - Solo para funciones serverless (necesitarías adaptar el código)

---

## 📚 Documentación útil

- Railway Docs: https://docs.railway.app/
- Nodemailer: https://nodemailer.com/
- Express.js: https://expressjs.com/
