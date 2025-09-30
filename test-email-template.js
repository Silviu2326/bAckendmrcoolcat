const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🧪 Iniciando test de email con template completo...\n');

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
console.log('  - User:', process.env.EMAIL_USER);
console.log('');

// Datos de ejemplo para el template
const testData = {
  NOMBRE: 'Juan',
  EMAIL: 'hastasilviu@gmail.com',
  POSICION: '25',
  PREMIO_TIPO: 'camiseta',
  QR_URL: 'https://mrcoolcatcraftbeer.com/qr/CCT-25-JU',
  QR_ID: 'CCT-25-JU',
  LISTADO_BARES_URL: 'https://mrcoolcatcraftbeer.com/bares',
  TIENDA_URL: 'https://mrcoolcatcraftbeer.com/tienda',
  COUPON_CODE: 'COOLCAT15',
  COUPON_EXP_DATE: '31/12/2025',
  CANJE_DEADLINE: '30 días',
  SOPORTE_EMAIL: 'experiencies@mrcoolcatcraftbeer.com',
  EMPRESA_LEGAL: 'Mr. Cool Cat Craft Beer S.L.',
  TU_CDN: 'mrcoolcatcraftbeer.com',
  TU_DOMINIO: 'mrcoolcatcraftbeer.com'
};

// Determinar si es premio físico o descuento
const esPremioFisico = ['camiseta', 'gorra', 'llavero', 'abrebotellas'].includes(testData.PREMIO_TIPO);
const esPremioDescuento = testData.PREMIO_TIPO === '-15%';

// Texto según el premio (voz del Gato)
const mensajesPremio = {
  'camiseta': 'Soy el Gato y lo confirmo: llegar primero tiene estilo. Tu camiseta oficial te espera.',
  'gorra': 'Cabeza fría, caza rápida. Tu gorra oficial ya es tuya.',
  'llavero': 'Desde hoy me llevas contigo. Este llavero abre puertas… y conversaciones.',
  'abrebotellas': 'Cuando suene el tintineo, yo abro camino. Pásate y canjéalo.',
  '-15%': 'Yo pongo el 15% para que pruebes lo que suena en el Mediterráneo. Aprovecha tu cupón.'
};

const mensajeGato = mensajesPremio[testData.PREMIO_TIPO] || '';

// Generar el HTML del email
const htmlContent = `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#f7f7f8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f8;">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#222;">
            <tr>
              <td style="padding:24px 24px 8px;text-align:center;">
                <img src="http://localhost:3000/images/app-icon.png" alt="Mr. Cool Cat" style="height:80px;width:80px;border-radius:50%;">
              </td>
            </tr>

            <tr>
              <td style="padding:0 24px 8px;">
                <h1 style="margin:0;font-size:22px;line-height:28px;">¡Enhorabuena, ${testData.NOMBRE}!</h1>
                <p style="margin:8px 0 0;font-size:14px;color:#555;">Eres el <strong>#${testData.POSICION}</strong> del prerregistro.</p>
              </td>
            </tr>

            ${esPremioFisico ? `
            <!-- Bloque premio físico -->
            <tr>
              <td style="padding:8px 24px 0;">
                <p style="margin:0 0 12px;font-size:16px;">
                  Te corresponde: <strong>${testData.PREMIO_TIPO}</strong>.
                </p>
                <p style="margin:0 0 16px;font-size:14px;color:#444;font-style:italic;background:#f9f9f9;padding:12px;border-radius:8px;">
                  ${mensajeGato}
                </p>
                <p style="margin:0 0 16px;font-size:14px;color:#444;">
                  Escanea tu <strong>código QR</strong> en uno de los <a href="${testData.LISTADO_BARES_URL}" style="color:#0b5bd3;">bares participantes</a> para canjear tu premio.
                  Llévate un documento identificativo. Válido durante ${testData.CANJE_DEADLINE}.
                </p>
                <div style="text-align:center;margin:16px 0 4px;">
                  <a href="${testData.QR_URL}" style="display:inline-block;padding:12px 18px;background:#FF6B35;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">Ver mi QR</a>
                </div>
                <p style="margin:8px 0 0;text-align:center;font-size:12px;color:#777;">Código: <strong>${testData.QR_ID}</strong> · Intransferible</p>
              </td>
            </tr>
            ` : ''}

            ${esPremioDescuento ? `
            <!-- Bloque descuento -->
            <tr>
              <td style="padding:8px 24px 0;">
                <p style="margin:0 0 12px;font-size:16px;">
                  Te llevas <strong>-15% en la tienda online</strong>.
                </p>
                <p style="margin:0 0 16px;font-size:14px;color:#444;font-style:italic;background:#f9f9f9;padding:12px;border-radius:8px;">
                  ${mensajeGato}
                </p>
                <p style="margin:0 0 16px;font-size:14px;color:#444;">
                  Usa este cupón al pagar en <a href="${testData.TIENDA_URL}" style="color:#0b5bd3;">la tienda</a>. No acumulable. Válido hasta <strong>${testData.COUPON_EXP_DATE}</strong>.
                </p>
                <div style="text-align:center;margin:16px 0 4px;">
                  <div style="display:inline-block;padding:10px 16px;border:2px dashed #FF6B35;border-radius:8px;font-weight:bold;font-size:18px;letter-spacing:1px;">
                    ${testData.COUPON_CODE}
                  </div>
                </div>
                <div style="text-align:center;margin:12px 0 0;">
                  <a href="${testData.TIENDA_URL}" style="display:inline-block;padding:12px 18px;background:#FF6B35;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">Ir a la tienda</a>
                </div>
              </td>
            </tr>
            ` : ''}

            <!-- Botón principal -->
            <tr>
              <td style="padding:16px 24px 8px;text-align:center;">
                <a href="https://mrcoolcatcraftbeer.com/" style="display:inline-block;padding:14px 28px;background:#111;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;">Visitar Mr. Cool Cat</a>
              </td>
            </tr>

            <!-- Ayuda y enlaces -->
            <tr>
              <td style="padding:16px 24px 8px;">
                <p style="margin:0 0 8px;font-size:14px;color:#444;">
                  ¿Dudas o problemas con el canje? Escríbenos: <a href="mailto:${testData.SOPORTE_EMAIL}" style="color:#0b5bd3;">${testData.SOPORTE_EMAIL}</a>
                </p>
                <p style="margin:0 0 0;font-size:12px;color:#777;">
                  Promo válida en España. Solo mayores de 18 años. Bebe con moderación.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 24px 24px;background:#fafafa;border-top:1px solid #eee;">
                <p style="margin:0;font-size:11px;color:#888;line-height:16px;">
                  ${testData.EMPRESA_LEGAL} · Este correo contiene información para el canje de tu premio.<br>
                  Política de privacidad y condiciones: <a href="https://${testData.TU_DOMINIO}/legal" style="color:#0b5bd3;">ver aquí</a>.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

// Generar la versión de texto plano
const textContent = `
¡Enhorabuena, ${testData.NOMBRE}!

Eres el #${testData.POSICION} del prerregistro de Mr. Cool Cat Craft Beer.

${esPremioFisico ? `
Premio: ${testData.PREMIO_TIPO}

${mensajeGato}

Para canjear tu premio:
1. Visita uno de los bares participantes: ${testData.LISTADO_BARES_URL}
2. Muestra tu código QR: ${testData.QR_URL}
3. Código de verificación: ${testData.QR_ID}
4. Lleva tu documento identificativo
5. Válido durante ${testData.CANJE_DEADLINE}
` : ''}

${esPremioDescuento ? `
Premio: -15% en la tienda online

${mensajeGato}

Tu cupón de descuento: ${testData.COUPON_CODE}
Válido hasta: ${testData.COUPON_EXP_DATE}

Usa tu cupón en: ${testData.TIENDA_URL}
` : ''}

Visita Mr. Cool Cat: https://mrcoolcatcraftbeer.com/

¿Necesitas ayuda?
Contacto: ${testData.SOPORTE_EMAIL}

---
${testData.EMPRESA_LEGAL}
Promo válida en España. Solo mayores de 18 años. Bebe con moderación.
Política de privacidad: https://${testData.TU_DOMINIO}/legal
`;

// Verificar conexión y enviar
console.log('🔌 Verificando conexión...');
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error en la configuración del email:', error);
    process.exit(1);
  } else {
    console.log('✅ Servidor de email conectado correctamente\n');

    // Enviar email
    console.log('📧 Enviando email con template a Info@sprintmarkt.com...\n');

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Mr. Cool Cat'}" <${process.env.EMAIL_USER}>`,
      to: 'Info@sprintmarkt.com',
      subject: `¡Listo, ${testData.NOMBRE}! Tu ${testData.PREMIO_TIPO} te espera con este QR`,
      headers: {
        'X-Preview-Text': 'Guarda tu QR y consulta los bares participantes. 18+'
      },
      html: htmlContent,
      text: textContent,
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
        console.log('  - Destinatario:', 'Info@sprintmarkt.com');
        console.log('  - Asunto:', mailOptions.subject);
        console.log('  - Message ID:', info.messageId);
        console.log('  - Tipo de premio:', testData.PREMIO_TIPO);
        console.log('  - Posición:', '#' + testData.POSICION);
        console.log('\n🎉 ¡Revisa la bandeja de entrada de Info@sprintmarkt.com!\n');
        console.log('💡 Si no lo ves, revisa la carpeta de spam.\n');
        process.exit(0);
      }
    });
  }
});
