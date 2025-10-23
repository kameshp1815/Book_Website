/**
 * Reusable Loader Component
 * 
 * A flexible loading spinner component with customizable size and styling.
 * Used throughout the application for loading states.
 */

const Loader = ({ 
  size = 'md', 
  className = '', 
  fullScreen = false,
  text = 'Loading...',
  showText = false 
}) => {
  // Size configurations
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const spinnerSize = sizes[size] || sizes.md;

  const Spinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 ${spinnerSize} ${className}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      {showText && (
        <p className="mt-2 text-sm text-gray-600 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  // Full screen loader overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Spinner />
        </div>
      </div>
    );
  }

  return <Spinner />;
};

/**
 * Page Loader - For full page loading states
 */
export const PageLoader = ({ text = "Loading page..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <Loader size="lg" showText text={text} />
  </div>
);

/**
 * Button Loader - For button loading states
 */
export const ButtonLoader = () => (
  <Loader size="sm" className="border-white border-t-transparent" />
);

/**
 * Card Loader - For card/content loading states
 */
export const CardLoader = ({ text = "Loading content..." }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader size="md" showText text={text} />
  </div>
);

/**
 * Inline Loader - For inline loading states
 */
export const InlineLoader = ({ text = "Loading..." }) => (
  <div className="flex items-center space-x-2">
    <Loader size="sm" />
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

export default Loader;