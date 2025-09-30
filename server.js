const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Servir archivos estáticos (para el logo)
app.use('/images', express.static('public/images'));

// Configurar el transportador de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // ej: smtp.gmail.com
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER, // tu email
    pass: process.env.EMAIL_PASS, // tu contraseña o app password
  },
});

// Verificar conexión del transportador
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error en la configuración del email:', error);
  } else {
    console.log('✅ Servidor de email listo para enviar mensajes');
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Servidor de email funcionando correctamente' });
});

// Endpoint para enviar email de confirmación de registro
app.post('/api/send-registration-email', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, city, avatar } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!email || !first_name || !last_name) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: first_name, last_name, email',
      });
    }

    // Contenido del email
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Tu Aplicación'}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '¡Bienvenido! Confirmación de Pre-registro',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #1A1A1A, #2C2C2C);
              color: #ffffff;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              color: #FF6B35;
            }
            .content {
              padding: 30px;
              color: #333333;
            }
            .content h2 {
              color: #FF6B35;
              font-size: 24px;
              margin-top: 0;
            }
            .info-box {
              background-color: #f9f9f9;
              border-left: 4px solid #FF6B35;
              padding: 15px;
              margin: 20px 0;
            }
            .info-box p {
              margin: 8px 0;
              font-size: 16px;
            }
            .info-box strong {
              color: #FF6B35;
            }
            .footer {
              background-color: #2C2C2C;
              color: #ffffff;
              text-align: center;
              padding: 20px;
              font-size: 14px;
            }
            .footer p {
              margin: 5px 0;
            }
            .avatar-section {
              text-align: center;
              margin: 20px 0;
            }
            .avatar-section p {
              font-size: 18px;
              color: #FF6B35;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header" style="padding-top:24px;padding-bottom:8px;">
              <img src="https://backendmrcoolcat-production.up.railway.app/images/app-icon.png" alt="Mr. Cool Cat" style="height:80px;width:80px;border-radius:50%;margin-bottom:16px;">
              <h1>¡Bienvenido a Mr. Cool Cat Craft Beer!</h1>
            </div>
            <div class="content">
              <h2>Hola ${first_name} ${last_name},</h2>
              <p>¡Gracias por registrarte en nuestra aplicación! Estamos emocionados de tenerte con nosotros.</p>

              <div class="info-box">
                <p><strong>Nombre:</strong> ${first_name} ${last_name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
                ${city ? `<p><strong>Ciudad:</strong> ${city}</p>` : ''}
              </div>

              ${avatar ? `
              <div class="avatar-section">
                <p>Tu avatar seleccionado: ${avatar.toUpperCase()}</p>
              </div>
              ` : ''}

              <p>Tu registro ha sido completado exitosamente. Te mantendremos informado sobre las novedades y actualizaciones de nuestra aplicación.</p>

              <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>

              <p>¡Nos vemos pronto!</p>
            </div>
            <div class="footer">
              <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
              <p>&copy; ${new Date().getFullYear()} Mr. Cool Cat Craft Beer. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Hola ${first_name} ${last_name},

        ¡Gracias por registrarte en nuestra aplicación!

        Tus datos de registro:
        - Nombre: ${first_name} ${last_name}
        - Email: ${email}
        ${phone ? `- Teléfono: ${phone}` : ''}
        ${city ? `- Ciudad: ${city}` : ''}
        ${avatar ? `- Avatar: ${avatar}` : ''}

        Tu registro ha sido completado exitosamente.

        ¡Nos vemos pronto!
      `,
    };

    // Enviar el email
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email enviado:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Email enviado exitosamente',
      messageId: info.messageId,
    });

  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    res.status(500).json({
      success: false,
      message: 'Error al enviar el email',
      error: error.message,
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  console.log(`📧 Endpoint disponible: http://localhost:${PORT}/api/send-registration-email`);
});