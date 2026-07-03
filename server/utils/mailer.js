const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  family: 4, // Force IPv4 to prevent ENETUNREACH on Render
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

/**
 * Send an email verification link to a newly registered user.
 * @param {string} toEmail  - Recipient email address
 * @param {string} name     - Recipient's name
 * @param {string} token    - Verification token
 */
const sendVerificationEmail = async (toEmail, name, token) => {
  console.log(`[Mailer] Preparing to send email from: "${process.env.GMAIL_USER}" to: "${toEmail}"`);
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

  const mailOptions = {
    from: `"Dream Beach Hotel 🏖️" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Verify Your Email — Dream Beach Hotel',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Email Verification</title>
      </head>
      <body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#0f4c81 0%,#1a7fd4 100%);padding:40px 40px 30px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">
                      🏖️ Dream Beach Hotel
                    </h1>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">
                      Your luxury escape awaits
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px;">
                    <h2 style="margin:0 0 12px;color:#1a202c;font-size:22px;font-weight:600;">
                      Hi ${name}! 👋
                    </h2>
                    <p style="margin:0 0 24px;color:#4a5568;font-size:15px;line-height:1.7;">
                      Thank you for creating an account with Dream Beach Hotel.
                      Please verify your email address to activate your account and start booking your perfect beach getaway.
                    </p>

                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding:8px 0 32px;">
                          <a href="${verifyUrl}"
                             style="display:inline-block;background:linear-gradient(135deg,#0f4c81,#1a7fd4);color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;padding:16px 40px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 4px 15px rgba(26,127,212,0.4);">
                            ✅ Verify My Email
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0 0 8px;color:#718096;font-size:13px;">
                      Or copy and paste this link into your browser:
                    </p>
                    <p style="margin:0 0 24px;word-break:break-all;">
                      <a href="${verifyUrl}" style="color:#1a7fd4;font-size:13px;">${verifyUrl}</a>
                    </p>

                    <div style="background:#fff8f0;border-left:4px solid #f6ad55;border-radius:4px;padding:12px 16px;margin-bottom:24px;">
                      <p style="margin:0;color:#744210;font-size:13px;">
                        ⏰ This link expires in <strong>24 hours</strong>. If you didn't create this account, you can safely ignore this email.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f7fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;color:#a0aec0;font-size:12px;">
                      © ${new Date().getFullYear()} Dream Beach Hotel. All rights reserved.<br/>
                      You received this email because you registered on our platform.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
