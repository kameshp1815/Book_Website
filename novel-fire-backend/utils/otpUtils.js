const crypto = require('crypto');

// Generate a 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Generate OTP with expiration time (default 10 minutes)
const generateOTPWithExpiry = (expiryMinutes = 10) => {
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);
  
  return {
    otp,
    expiresAt,
  };
};

// Check if OTP is expired
const isOTPExpired = (expiresAt) => {
  return new Date() > new Date(expiresAt);
};

// Validate OTP
const validateOTP = (providedOTP, storedOTP, expiresAt) => {
  if (!providedOTP || !storedOTP || !expiresAt) {
    return false;
  }
  
  if (isOTPExpired(expiresAt)) {
    return false;
  }
  
  return providedOTP === storedOTP;
};

module.exports = {
  generateOTP,
  generateOTPWithExpiry,
  isOTPExpired,
  validateOTP,
};
