# OTP Email Verification Setup

## Backend Email Configuration

To enable OTP email verification, you need to configure email settings in your backend environment variables.

### Required Environment Variables

Add these variables to your `.env` file in the backend directory:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
FRONTEND_URL=http://localhost:3000
```

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password (not your regular Gmail password) in `EMAIL_PASS`

### Alternative Email Services

You can also use other email services by changing the `EMAIL_SERVICE` and SMTP settings in `utils/emailService.js`:

- **Outlook/Hotmail**: `service: 'hotmail'`
- **Yahoo**: `service: 'yahoo'`
- **Custom SMTP**: Configure with host, port, secure settings

### Testing Email Setup

1. Start your backend server
2. Try registering a new user
3. Check your email for the OTP code
4. Verify the code to complete registration

### Troubleshooting

- **"Invalid login"**: Check your email credentials and app password
- **"Connection timeout"**: Verify your internet connection and email service settings
- **"OTP not received"**: Check spam folder, verify email address is correct

## Features Implemented

✅ **Backend OTP System**:
- OTP generation with 10-minute expiry
- Email sending with beautiful HTML templates
- OTP verification endpoint
- Resend OTP functionality
- Email verification requirement for login

✅ **Frontend OTP UI**:
- Two-step registration process
- OTP verification screen with countdown timer
- Resend OTP functionality
- Error handling and user feedback
- Responsive design

✅ **Security Features**:
- OTP expires after 10 minutes
- Users must verify email before login
- Secure OTP generation using crypto
- Input validation and sanitization

## API Endpoints

- `POST /api/auth/register` - Register user and send OTP
- `POST /api/auth/verify-otp` - Verify OTP and complete registration
- `POST /api/auth/resend-otp` - Resend OTP code
- `POST /api/auth/login` - Login (requires verified email)

## User Flow

1. User fills registration form
2. System creates user account (unverified)
3. OTP sent to user's email
4. User enters OTP on verification screen
5. Account verified and user logged in
6. Welcome email sent
