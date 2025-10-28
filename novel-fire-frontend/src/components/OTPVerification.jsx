import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';

const OTPVerification = ({ userId, email, onVerificationComplete }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  
  const { verifyOTP, resendOTP, loading, error } = useAuth();

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      return;
    }

    try {
      await verifyOTP(userId, otp);
      onVerificationComplete();
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  const handleResendOTP = async () => {
    if (timeLeft > 0) return;
    
    setIsResending(true);
    setResendMessage('');
    
    try {
      await resendOTP(userId);
      setTimeLeft(600); // Reset timer
      setResendMessage('New verification code sent!');
    } catch (err) {
      setResendMessage('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-50/40 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="card card-hover p-6 sm:p-8">
          <div className="text-center">
            {/* Brand logo */}
            <div className="inline-flex items-center justify-center space-x-2 mb-6">
              <FontAwesomeIcon icon={faBook} className="text-primary-600 text-2xl" />
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Novashelf</span>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We've sent a 6-digit verification code to
            </p>
            <div className="flex items-center justify-center space-x-2 mb-8">
              <FontAwesomeIcon icon={faEnvelope} className="text-primary-600" />
              <span className="font-medium text-gray-900 dark:text-gray-100">{email}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Enter Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="6"
                required
                className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-center text-2xl font-mono tracking-widest placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="000000"
                value={otp}
                onChange={handleOtpChange}
              />
            </div>

            {/* Timer */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <FontAwesomeIcon icon={faClock} />
                <span>
                  {timeLeft > 0 ? `Code expires in ${formatTime(timeLeft)}` : 'Code has expired'}
                </span>
              </div>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={timeLeft > 0 || isResending}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? 'Sending...' : 'Resend verification code'}
              </button>
            </div>

            {/* Resend message */}
            {resendMessage && (
              <div className={`text-center text-sm ${
                resendMessage.includes('sent') 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {resendMessage}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 p-3">
                <div className="text-sm text-red-800 dark:text-red-300">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
            </div>
          </form>

          {/* Help text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Didn't receive the code? Check your spam folder or{' '}
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={timeLeft > 0 || isResending}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium disabled:opacity-50"
              >
                resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
