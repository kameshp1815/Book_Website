import nodemailer from 'nodemailer';

// Create transporter (you'll need to configure this with your email service)
const createTransporter = async () => {
  // Prefer explicit SMTP settings if provided; fall back to service-based config (e.g., gmail)
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : undefined; // 'true' | 'false'

  const baseAuth = {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use app password for Gmail
  };

  let transportOptions;

  // Special Ethereal mode for testing (no real emails sent, provides preview URL)
  if ((process.env.EMAIL_SERVICE || '').toLowerCase() === 'ethereal') {
    let account;
    if (!baseAuth.user || !baseAuth.pass) {
      account = await nodemailer.createTestAccount();
    }
    const user = baseAuth.user || account.user;
    const pass = baseAuth.pass || account.pass;
    transportOptions = {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    };
  } else if (smtpHost) {
    transportOptions = {
      host: smtpHost,
      port: smtpPort ?? 587,
      secure: smtpSecure ?? false,
      auth: baseAuth,
      tls: process.env.SMTP_REJECT_UNAUTHORIZED === 'false' ? { rejectUnauthorized: false } : undefined,
    };
  } else {
    transportOptions = {
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: baseAuth,
      tls: process.env.SMTP_REJECT_UNAUTHORIZED === 'false' ? { rejectUnauthorized: false } : undefined,
    };
  }

  const transporter = nodemailer.createTransport(transportOptions)

  // Log a one-time verify to help diagnose issues in development
  if (process.env.NODE_ENV !== 'production') {
    const maskedUser = (process.env.EMAIL_USER || '').replace(/(^..).+(@.*$)/, '$1***$2');
    transporter.verify((err, success) => {
      if (err) {
        console.log('[Email] SMTP verify failed:', {
          host: transportOptions.host || transportOptions.service,
          port: transportOptions.port,
          secure: transportOptions.secure,
          user: maskedUser,
          error: err.message,
        });
      } else {
        console.log('[Email] SMTP ready:', {
          host: transportOptions.host || transportOptions.service,
          port: transportOptions.port,
          secure: transportOptions.secure,
          user: maskedUser,
          success,
        });
      }
    });
  }

  return transporter;
};

// Send OTP email
export const sendOTPEmail = async (email, otp, name) => {
  try {
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - Novashelf',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Novashelf</h1>
            <p style="color: #6b7280; margin: 5px 0;">Your Reading Journey Starts Here</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Welcome ${name}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Thank you for signing up for Novashelf. To complete your registration and start building your library, 
              please verify your email address using the OTP code below:
            </p>
            
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h3 style="color: #1f2937; margin: 0; font-size: 32px; letter-spacing: 5px; font-family: monospace;">${otp}</h3>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">
              This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; color: #9ca3af; font-size: 12px;">
            <p>© 2024 Novashelf. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    const previewUrl = nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(result) : undefined;
    console.log('OTP email sent successfully:', {
      messageId: result.messageId,
      previewUrl,
    });
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send verification email');
  }
};

// Send welcome email after successful verification
export const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Novashelf!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Novashelf</h1>
            <p style="color: #6b7280; margin: 5px 0;">Your Reading Journey Starts Here</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 30px; border-radius: 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">Welcome to Novashelf, ${name}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Your email has been successfully verified! You can now start exploring our platform and building your personal library.
            </p>
            
            <div style="margin: 30px 0;">
              <h3 style="color: #1f2937;">What you can do next:</h3>
              <ul style="color: #4b5563; line-height: 1.8;">
                <li>📚 Browse and discover new books</li>
                <li>📖 Add books to your personal library</li>
                <li>✍️ Start writing and publishing your own stories</li>
                <li>👥 Connect with other readers and authors</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" 
                 style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Get Started
              </a>
            </div>
          </div>
          
          <div style="text-align: center; color: #9ca3af; font-size: 12px;">
            <p>© 2024 Novashelf. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    const previewUrl = nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(result) : undefined;
    console.log('Welcome email sent successfully', {
      messageId: result.messageId,
      previewUrl,
    });
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error for welcome email as it's not critical
    return false;
  }
};
