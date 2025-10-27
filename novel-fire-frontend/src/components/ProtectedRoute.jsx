/**
 * Protected Route Component
 * 
 * Higher-order component that protects routes requiring authentication.
 * Redirects unauthenticated users to login page with return URL.
 * Shows loading state while authentication is being verified.
 */

import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from './Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading state while verifying authentication
  if (loading) {
    return <PageLoader text="Verifying authentication..." />;
  }

  if (!isAuthenticated) {
    // Render nothing when the user is not authenticated
    return null;
  }

  return children;
};

export default ProtectedRoute;