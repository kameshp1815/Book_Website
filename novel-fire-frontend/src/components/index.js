/**
 * Components Index
 * 
 * Centralized export file for all reusable components.
 * Allows for clean imports throughout the application.
 * 
 * Usage:
 * import { Navbar, Footer, Loader } from '../components';
 */

// Layout Components
export { default as Layout } from './Layout';
export { default as Navbar } from './Navbar';
export { default as Footer } from './Footer';

// Auth Components
export { default as OTPVerification } from './OTPVerification';

// Utility Components
export { default as ProtectedRoute } from './ProtectedRoute';
export { 
  default as Loader,
  PageLoader,
  ButtonLoader,
  CardLoader,
  InlineLoader 
} from './Loader';

// Future components can be added here as they're created
// export { default as Modal } from './Modal';
// export { default as Tooltip } from './Tooltip';
// export { default as Button } from './Button';