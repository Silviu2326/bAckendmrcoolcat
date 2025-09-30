const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🧪 Iniciando test de envío de email...\n');

// Configurar el transportador de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 465,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log('📋 Configuración cargada:');
console.log('  - Host:', process.env.EMAIL_HOST);
console.log('  - Port:', process.env.EMAIL_PORT);
console.log('  - Secure:', process.env.EMAIL_SECURE);
console.log('  - User:', process.env.EMAIL_USER);
console.log('  - Pass:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-3) : 'NO CONFIGURADO');
console.log('');

// Verificar conexión
console.log('🔌 Verificando conexión...');
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error en la configuración del email:', error);
    process.exit(1);
  } else {
    console.log('✅ Servidor de email conectado correctamente\n');

    // Enviar email de prueba
    console.log('📧 Enviando email de prueba a hastasilviu@gmail.com...\n');

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Test'}" <${process.env.EMAIL_USER}>`,
      to: 'hastasilviu@gmail.com',
      subject: '🧪 Test - Mr. Cool Cat Craft Beer',
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
            .footer {
              background-color: #2C2C2C;
              color: #ffffff;
              text-align: center;
              padding: 20px;
              font-size: 14px;
            }
            .success-icon {
              text-align: center;
              font-size: 50px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>🍺 Mr. Cool Cat Craft Beer</h1>
            </div>
            <div class="content">
              <div class="success-icon">✅</div>
              <h2>¡Email de Prueba Exitoso!</h2>
              <p>Este es un email de prueba para verificar que el backend de Mr. Cool Cat está funcionando correctamente.</p>

              <div class="info-box">
                <p><strong>Servidor SMTP:</strong> ${process.env.EMAIL_HOST}</p>
                <p><strong>Puerto:</strong> ${process.env.EMAIL_PORT}</p>
                <p><strong>Desde:</strong> ${process.env.EMAIL_USER}</p>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
              </div>

              <p>Si estás viendo este mensaje, significa que:</p>
              <ul>
                <li>✅ El servidor backend está configurado correctamente</li>
                <li>✅ Las credenciales SMTP son válidas</li>
                <li>✅ Los emails se están enviando exitosamente</li>
              </ul>

              <p><strong>¡Todo listo para enviar emails de registro!</strong></p>
            </div>
            <div class="footer">
              <p>Email de prueba enviado desde el backend de Mr. Cool Cat</p>
              <p>&copy; ${new Date().getFullYear()} Mr. Cool Cat Craft Beer</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        🧪 EMAIL DE PRUEBA - Mr. Cool Cat Craft Beer

        ¡Este es un email de prueba!

        Configuración:
        - Servidor: ${process.env.EMAIL_HOST}
        - Puerto: ${process.env.EMAIL_PORT}
        - Desde: ${process.env.EMAIL_USER}
        - Fecha: ${new Date().toLocaleString('es-ES')}

        Si ves este mensaje, el backend está funcionando correctamente.

        ✅ Todo listo para enviar emails de registro!
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Error al enviar el email:', error);
        console.error('\n📋 Detalles del error:');
        console.error('  - Mensaje:', error.message);
        console.error('  - Código:', error.code);
        process.exit(1);
      } else {
        console.log('✅ ¡Email enviado exitosamente!\n');
        console.log('📋 Información del envío:');
        console.log('  - Message ID:', info.messageId);
        console.log('  - Respuesta:', info.response);
        console.log('\n🎉 ¡Revisa la bandeja de entrada de hastasilviu@gmail.com!\n');
        console.log('💡 Si no lo ves, revisa la carpeta de spam.\n');
        process.exit(0);
      }
    });
  }
});
