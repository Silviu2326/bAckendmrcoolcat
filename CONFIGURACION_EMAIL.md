
### 1. **EMAIL_HOST** (Servidor SMTP)
**¿Qué es?** La dirección del servidor que enviará los emails.

**Ejemplos comunes:**
- Gmail: `smtp.gmail.com`
- Outlook/Hotmail: `smtp-mail.outlook.com`
- Yahoo: `smtp.mail.yahoo.com`
- Hosting cPanel: `mail.tudominio.com`
- Otros: Consulta con tu proveedor de email

**Para Mr. Cool Cat:**
Si usas el email `info@mrcoolcatcraftbeer.com`, debes:
1. Contactar a tu proveedor de hosting (donde está alojada la web mrcoolcatcraftbeer.com)
2. Preguntarles: "¿Cuál es el servidor SMTP para enviar emails?"
3. Te darán algo como: `mail.mrcoolcatcraftbeer.com` o `smtp.tuproveedor.com`

---

### 2. **EMAIL_PORT** (Puerto SMTP)
**¿Qué es?** El puerto de comunicación del servidor SMTP.

**Valores comunes:**
- **587** - Puerto estándar con STARTTLS (más común)
- **465** - Puerto con SSL/TLS
- **25** - Puerto sin cifrado (no recomendado)



### 3. **EMAIL_USER** (Dirección de correo)
**¿Qué es?** La dirección de email desde la cual se enviarán los correos.

**Para Mr. Cool Cat:**
EMAIL_USER=info@mrcoolcatcraftbeer.com


**Importante:**
- Debe ser un email real y activo
- Debe tener permisos para enviar emails desde SMTP
- Los usuarios recibirán emails "de" esta dirección

### 4. **EMAIL_PASS** (Contraseña del email)
**¿Qué es?** La contraseña para autenticarse en el servidor SMTP.

#### Si usas Gmail:
1. Ve a https://myaccount.google.com/apppasswords
2. Activa la autenticación de 2 factores (si no la tienes)
3. Genera una "App Password" con nombre "Mr Cool Cat App"
4. Te dará un código de 16 caracteres: `abcd efgh ijkl mnop`
5. Úsalo en `.env` sin espacios: `abcdefghijklmnop`

#### Si usas email de hosting (cPanel, Plesk, etc.):
1. **NO uses la contraseña del panel de control**
2. Usa la contraseña específica de la cuenta de email
3. Puede ser la misma que usas para acceder al webmail
4. Si no la sabes, contacta a tu proveedor de hosting

#### Si usas Outlook/Hotmail:
- Usa la contraseña normal de tu cuenta Microsoft
- Si tienes 2FA activado, necesitas una "App Password"

## 📋 Información que debes solicitar a tu proveedor

Si tu email está alojado en un hosting (como cPanel), contacta a soporte y pídeles:

### Pregunta exacta:
> "Hola, necesito configurar el envío de emails desde mi aplicación usando SMTP. Mi email es info@mrcoolcatcraftbeer.com. ¿Me pueden proporcionar los siguientes datos?"

### Datos que necesitas:

1. ✅ **Servidor SMTP (EMAIL_HOST)**
   - Ejemplo: `mail.mrcoolcatcraftbeer.com`

2. ✅ **Puerto SMTP (EMAIL_PORT)**
   - Ejemplo: `587` o `465`

3. ✅ **Tipo de cifrado (EMAIL_SECURE)**
   - ¿Usa SSL? (puerto 465) → `EMAIL_SECURE=true`
   - ¿Usa STARTTLS? (puerto 587) → `EMAIL_SECURE=false`

4. ✅ **Usuario SMTP (EMAIL_USER)**
   - Normalmente es: `info@mrcoolcatcraftbeer.com`

5. ✅ **Contraseña SMTP (EMAIL_PASS)**
   - La contraseña del email (la que usas en el webmail)

